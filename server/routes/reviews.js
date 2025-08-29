import express from 'express';
import Review from '../models/Review.js';
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

// Get all approved testimonials
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      isTestimonial: true, 
      isApproved: true 
    })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .limit(10);

    // Transform for frontend
    const testimonials = reviews.map(review => ({
      id: review._id,
      content: review.content,
      author: review.user.name,
      location: review.location,
      rating: review.rating,
      image: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=600`
    }));

    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Create a new review
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { carId, bookingId, rating, content, location } = req.body;

    const review = new Review({
      user: req.user.userId,
      car: carId,
      booking: bookingId,
      rating,
      content,
      location,
      isApproved: false
    });

    await review.save();

    res.status(201).json({
      message: 'Review submitted successfully',
      reviewId: review._id
    });

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

export default router;