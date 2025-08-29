import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['hatchback', 'sedan', 'suv', 'muv', 'luxury', 'electric'],
    index: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  priceUnit: {
    type: String,
    default: 'day',
    enum: ['hour', 'day', 'week', 'month']
  },
  image: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic']
  },
  fuel: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid']
  },
  seats: {
    type: Number,
    required: true,
    min: 2,
    max: 12
  },
  mileage: {
    type: String,
    required: true
  },
  airConditioned: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    required: true,
    index: true
  },
  available: {
    type: Boolean,
    default: true,
    index: true
  },
  features: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    trim: true
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  registrationNumber: {
    type: String,
    unique: true,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  year: {
    type: Number
  },
  brand: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

// Add text index for searching
carSchema.index({ name: 'text', description: 'text', brand: 'text' });

const Car = mongoose.model('Car', carSchema);

export default Car;