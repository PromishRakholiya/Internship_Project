import express from 'express';
import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      carId,
      pickupDate,
      returnDate,
      location,
      contactInfo,
      notes
    } = req.body;

    // Validate car exists and is available
    const car = await Car.findById(carId);
    if (!car || !car.available) {
      return res.status(400).json({ message: 'Car not available' });
    }

    // Calculate total price
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    const rentalPrice = car.price * days;
    const insurancePrice = 300 * days;
    const gst = Math.round(0.18 * (rentalPrice + insurancePrice));
    const totalPrice = rentalPrice + insurancePrice + gst;

    // Create booking
    const booking = new Booking({
      user: req.user.userId,
      car: carId,
      pickupDate,
      returnDate,
      location,
      totalPrice,
      contactInfo,
      notes,
      status: 'confirmed',
      paymentStatus: 'paid'
    });

    await booking.save();

    res.status(201).json({
      bookingId: booking._id,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get user bookings
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const { status } = req.query;
    
    let filter = { user: req.user.userId };
    
    if (status && status !== 'all') {
      if (status === 'upcoming') {
        filter.status = 'confirmed';
        filter.pickupDate = { $gt: new Date() };
      } else if (status === 'active') {
        filter.status = 'confirmed';
        filter.pickupDate = { $lte: new Date() };
        filter.returnDate = { $gte: new Date() };
      } else {
        filter.status = status;
      }
    }

    const bookings = await Booking.find(filter)
      .populate('car')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId
    }).populate('car');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
});

// Cancel booking
router.post('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
});

export default router;