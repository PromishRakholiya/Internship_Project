import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// Get all cars with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      location,
      transmission,
      fuel,
      seats,
      minPrice,
      maxPrice,
      sort = 'price-asc',
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = { available: true };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (location) {
      filter.location = location;
    }

    if (transmission && transmission !== 'all') {
      filter.transmission = transmission;
    }

    if (fuel && fuel !== 'all') {
      filter.fuel = fuel;
    }

    if (seats && seats !== 'all') {
      filter.seats = { $gte: parseInt(seats) };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'price-asc':
        sortObj = { price: 1 };
        break;
      case 'price-desc':
        sortObj = { price: -1 };
        break;
      case 'popularity':
        sortObj = { rating: -1, reviewCount: -1 };
        break;
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      default:
        sortObj = { price: 1 };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const cars = await Car.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Car.countDocuments(filter);

    res.json({
      cars,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });

  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
});

// Get featured cars
router.get('/featured', async (req, res) => {
  try {
    const cars = await Car.find({ available: true, isFeatured: true })
      .sort({ rating: -1 })
      .limit(8);

    res.json(cars);
  } catch (error) {
    console.error('Error fetching featured cars:', error);
    res.status(500).json({ message: 'Error fetching featured cars', error: error.message });
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Error fetching car', error: error.message });
  }
});

// Get cars by category
router.get('/category/:category', async (req, res) => {
  try {
    const cars = await Car.find({ 
      category: req.params.category, 
      available: true 
    }).sort({ price: 1 });

    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars by category:', error);
    res.status(500).json({ message: 'Error fetching cars by category', error: error.message });
  }
});

export default router;