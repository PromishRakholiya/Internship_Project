import { showNotification } from './app.js';
import { isAuthenticated } from './auth.js';
import { useMockData } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    window.location.href = '/';
    return;
  }
  
  // Get booking ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get('id');
  
  if (!bookingId) {
    showNotification('Booking ID not found', 'error');
    // Redirect to bookings page after a delay
    setTimeout(() => {
      window.location.href = '/bookings.html';
    }, 3000);
    return;
  }
  
  // Load booking details
  loadBookingDetails(bookingId);
});

// Load booking details
async function loadBookingDetails(bookingId) {
  const bookingDetailsContainer = document.getElementById('booking-details');
  
  if (!bookingDetailsContainer) return;
  
  try {
    // In a real app, we would fetch data from the server
    let bookingData;
    
    if (useMockData) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock booking data
      bookingData = generateMockBookingData(bookingId);
    } else {
      // Fetch from API
      const response = await fetch(`/api/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }
      
      bookingData = await response.json();
    }
    
    // Render booking details
    renderBookingDetails(bookingData, bookingDetailsContainer);
    
  } catch (error) {
    console.error('Error loading booking details:', error);
    bookingDetailsContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <p>Failed to load booking details. Please try again later.</p>
      </div>
    `;
  }
}

// Generate mock booking data for development
function generateMockBookingData(bookingId) {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Demo User', email: 'user@example.com', phone: '9876543210' };
  
  // Random car selection
  const cars = [
    {
      id: 1,
      name: 'Maruti Swift',
      category: 'hatchback',
      price: 1200,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/10903/1697697308167/front-left-side-47.jpg?tr=w-664'
    },
    {
      id: 2,
      name: 'Hyundai Creta',
      category: 'suv',
      price: 2000,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/8667/1744607863052/front-left-side-47.jpg?tr=w-664'
    }
  ];
  
  const randomCar = cars[Math.floor(Math.random() * cars.length)];
  
  // Random location
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  
  // Random dates (pickup: today, return: 3 days later)
  const today = new Date();
  const pickupDate = new Date(today);
  const returnDate = new Date(today);
  returnDate.setDate(returnDate.getDate() + 3);
  
  // Calculate total price
  const days = 3;
  const rentalPrice = randomCar.price * days;
  const insurancePrice = 300 * days;
  const gst = Math.round(0.18 * (rentalPrice + insurancePrice));
  const totalPrice = rentalPrice + insurancePrice + gst;
  
  return {
    id: bookingId,
    car: randomCar,
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    pickupDate: pickupDate.toISOString().split('T')[0],
    returnDate: returnDate.toISOString().split('T')[0],
    location: randomLocation,
    status: 'confirmed',
    totalPrice: totalPrice,
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    createdAt: new Date().toISOString()
  };
}

// Render booking details
function renderBookingDetails(booking, container) {
  // Format dates
  const pickupDate = new Date(booking.pickupDate).toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const returnDate = new Date(booking.returnDate).toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Format booking date
  const bookingDate = new Date(booking.createdAt).toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Calculate rental duration
  const pickupDateObj = new Date(booking.pickupDate);
  const returnDateObj = new Date(booking.returnDate);
  const diffTime = Math.abs(returnDateObj - pickupDateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  container.innerHTML = `
    <div class="booking-reference">
      <p>Booking Reference: <strong>${booking.id}</strong></p>
      <p>Booked on: ${bookingDate}</p>
    </div>
    
    <div class="booking-summary-card">
      <div class="booking-car">
        <img src="${booking.car.image}" alt="${booking.car.name}" class="booking-car-image">
        <div class="booking-car-details">
          <h3>${booking.car.name}</h3>
          <p class="car-category">${booking.car.category.charAt(0).toUpperCase() + booking.car.category.slice(1)}</p>
        </div>
      </div>
      
      <div class="booking-info-grid">
        <div class="booking-info-item">
          <h4>Pickup Date</h4>
          <p>${pickupDate}</p>
        </div>
        <div class="booking-info-item">
          <h4>Return Date</h4>
          <p>${returnDate}</p>
        </div>
        <div class="booking-info-item">
          <h4>Duration</h4>
          <p>${diffDays} day${diffDays > 1 ? 's' : ''}</p>
        </div>
        <div class="booking-info-item">
          <h4>Location</h4>
          <p>${booking.location}</p>
        </div>
      </div>
      
      <div class="booking-price-details">
        <h3>Price Details</h3>
        <div class="price-item">
          <span>Car Rental (${diffDays} days)</span>
          <span>₹${booking.car.price} × ${diffDays} = ₹${booking.car.price * diffDays}</span>
        </div>
        <div class="price-item">
          <span>Insurance</span>
          <span>₹${300 * diffDays}</span>
        </div>
        <div class="price-item">
          <span>GST (18%)</span>
          <span>₹${Math.round(0.18 * ((booking.car.price * diffDays) + (300 * diffDays)))}</span>
        </div>
        <div class="price-item total">
          <span>Total Amount</span>
          <span>₹${booking.totalPrice}</span>
        </div>
        <div class="payment-status ${booking.paymentStatus === 'paid' ? 'paid' : 'pending'}">
          <i class="fas ${booking.paymentStatus === 'paid' ? 'fa-check-circle' : 'fa-clock'}"></i>
          <span>Payment ${booking.paymentStatus === 'paid' ? 'Completed' : 'Pending'}</span>
        </div>
      </div>
    </div>
    
    <div class="contact-details">
      <h3>Contact Details</h3>
      <p><strong>Name:</strong> ${booking.user.name}</p>
      <p><strong>Email:</strong> ${booking.user.email}</p>
      <p><strong>Phone:</strong> ${booking.user.phone}</p>
    </div>
  `;
}