import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  isTestimonial: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Add indexes for common queries
reviewSchema.index({ car: 1 });
reviewSchema.index({ isTestimonial: 1, isApproved: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;