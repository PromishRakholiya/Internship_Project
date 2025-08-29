import { showNotification } from './app.js';
import { isAuthenticated } from './auth.js';
import { useMockData } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  if (!isAuthenticated()) {
    // Show login required message
    const bookingsContainer = document.querySelector('.bookings-container');
    if (bookingsContainer) {
      bookingsContainer.innerHTML = `
        <div class="auth-required">
          <h2>Login Required</h2>
          <p>Please login to view your bookings.</p>
          <div class="auth-buttons">
            <button id="login-redirect" class="btn btn-primary">Login</button>
            <button id="signup-redirect" class="btn btn-outline">Sign Up</button>
          </div>
        </div>
      `;
      
      // Add event listeners to redirect buttons
      const loginRedirect = document.getElementById('login-redirect');
      const signupRedirect = document.getElementById('signup-redirect');
      
      if (loginRedirect) {
        loginRedirect.addEventListener('click', () => {
          // Store the current URL to redirect back after login
          localStorage.setItem('redirectAfterLogin', window.location.href);
          // Open login modal
          const loginBtn = document.getElementById('login-btn');
          if (loginBtn) {
            loginBtn.click();
          }
        });
      }
      
      if (signupRedirect) {
        signupRedirect.addEventListener('click', () => {
          // Store the current URL to redirect back after signup
          localStorage.setItem('redirectAfterLogin', window.location.href);
          // Open signup modal
          const signupBtn = document.getElementById('signup-btn');
          if (signupBtn) {
            signupBtn.click();
          }
        });
      }
    }
    return;
  }
  
  // Setup filter tabs
  setupFilterTabs();
  
  // Load bookings (default: all)
  loadBookings('all');
});

// Setup filter tabs
function setupFilterTabs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Load bookings with selected filter
      const status = tab.dataset.status;
      loadBookings(status);
    });
  });
}

// Load bookings
async function loadBookings(status = 'all') {
  const bookingsList = document.getElementById('bookings-list');
  
  if (!bookingsList) return;
  
  try {
    // Show loading state
    bookingsList.innerHTML = '<div class="loading">Loading your bookings...</div>';
    
    // In a real app, we would fetch data from the server
    let bookings;
    
    if (useMockData) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock bookings data
      bookings = generateMockBookings();
      
      // Filter bookings based on status
      if (status !== 'all') {
        bookings = bookings.filter(booking => {
          if (status === 'upcoming') {
            return booking.status === 'confirmed' && new Date(booking.pickupDate) > new Date();
          } else if (status === 'active') {
            const now = new Date();
            return booking.status === 'confirmed' && 
                   new Date(booking.pickupDate) <= now && 
                   new Date(booking.returnDate) >= now;
          } else if (status === 'completed') {
            return booking.status === 'completed';
          } else if (status === 'cancelled') {
            return booking.status === 'cancelled';
          }
          return false;
        });
      }
    } else {
      // Fetch from API
      const response = await fetch(`/api/bookings/user?status=${status}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      bookings = await response.json();
    }
    
    // Render bookings
    renderBookings(bookings, bookingsList);
    
  } catch (error) {
    console.error('Error loading bookings:', error);
    bookingsList.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <p>Failed to load bookings. Please try again later.</p>
      </div>
    `;
  }
}

// Generate mock bookings data for development
function generateMockBookings() {
  // Cars data
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
    },
    {
      id: 3,
      name: 'Toyota Innova',
      category: 'muv',
      price: 2500,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/9612/1697698611076/front-left-side-47.jpg?tr=w-664'
    },
    {
      id: 4,
      name: 'Honda City',
      category: 'sedan',
      price: 1800,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/City/9421/1739862184352/front-left-side-47.jpg?tr=w-664'
    }
  ];
  
  // Locations
  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];
  
  // Generate random bookings
  const bookings = [];
  
  // Upcoming booking (confirmed, future pickup date)
  const upcomingDate = new Date();
  upcomingDate.setDate(upcomingDate.getDate() + 5); // 5 days from now
  const upcomingReturnDate = new Date(upcomingDate);
  upcomingReturnDate.setDate(upcomingReturnDate.getDate() + 3); // 3 days rental
  
  bookings.push({
    id: '1001',
    car: cars[0],
    pickupDate: upcomingDate.toISOString().split('T')[0],
    returnDate: upcomingReturnDate.toISOString().split('T')[0],
    location: locations[0],
    status: 'confirmed',
    totalPrice: cars[0].price * 3,
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  });
  
  // Active booking (confirmed, current dates)
  const activeDate = new Date();
  activeDate.setDate(activeDate.getDate() - 1); // Started yesterday
  const activeReturnDate = new Date();
  activeReturnDate.setDate(activeReturnDate.getDate() + 2); // Ends in 2 days
  
  bookings.push({
    id: '1002',
    car: cars[1],
    pickupDate: activeDate.toISOString().split('T')[0],
    returnDate: activeReturnDate.toISOString().split('T')[0],
    location: locations[1],
    status: 'confirmed',
    totalPrice: cars[1].price * 3,
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  });
  
  // Completed booking
  const completedDate = new Date();
  completedDate.setDate(completedDate.getDate() - 10); // 10 days ago
  const completedReturnDate = new Date();
  completedReturnDate.setDate(completedReturnDate.getDate() - 7); // Ended 7 days ago
  
  bookings.push({
    id: '1003',
    car: cars[2],
    pickupDate: completedDate.toISOString().split('T')[0],
    returnDate: completedReturnDate.toISOString().split('T')[0],
    location: locations[2],
    status: 'completed',
    totalPrice: cars[2].price * 3,
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days ago
  });
  
  // Cancelled booking
  const cancelledDate = new Date();
  cancelledDate.setDate(cancelledDate.getDate() - 5); // Would have started 5 days ago
  const cancelledReturnDate = new Date();
  cancelledReturnDate.setDate(cancelledReturnDate.getDate() - 2); // Would have ended 2 days ago
  
  bookings.push({
    id: '1004',
    car: cars[3],
    pickupDate: cancelledDate.toISOString().split('T')[0],
    returnDate: cancelledReturnDate.toISOString().split('T')[0],
    location: locations[3],
    status: 'cancelled',
    totalPrice: cars[3].price * 3,
    paymentStatus: 'refunded',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    cancelledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Cancelled 7 days ago
  });
  
  return bookings;
}

// Render bookings
function renderBookings(bookings, container) {
  if (!bookings || bookings.length === 0) {
    container.innerHTML = `
      <div class="no-bookings">
        <i class="fas fa-calendar-times"></i>
        <h3>No Bookings Found</h3>
        <p>You don't have any bookings matching the selected filter.</p>
        <a href="/cars.html" class="btn btn-primary">Browse Cars</a>
      </div>
    `;
    return;
  }
  
  // Sort bookings by date (newest first)
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  let bookingsHTML = '';
  
  bookings.forEach(booking => {
    // Format dates
    const pickupDate = new Date(booking.pickupDate).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    const returnDate = new Date(booking.returnDate).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Calculate booking status class and text
    let statusClass = '';
    let statusText = '';
    
    switch (booking.status) {
      case 'confirmed':
        const now = new Date();
        if (new Date(booking.pickupDate) > now) {
          statusClass = 'upcoming';
          statusText = 'Upcoming';
        } else if (new Date(booking.returnDate) >= now) {
          statusClass = 'active';
          statusText = 'Active';
        }
        break;
      case 'completed':
        statusClass = 'completed';
        statusText = 'Completed';
        break;
      case 'cancelled':
        statusClass = 'cancelled';
        statusText = 'Cancelled';
        break;
      default:
        statusClass = 'pending';
        statusText = 'Pending';
    }
    
    bookingsHTML += `
      <div class="booking-card">
        <div class="booking-status ${statusClass}">
          <span>${statusText}</span>
        </div>
        
        <div class="booking-content">
          <div class="booking-car">
            <img src="${booking.car.image}" alt="${booking.car.name}" class="booking-car-image">
            <div class="booking-car-details">
              <h3>${booking.car.name}</h3>
              <p class="car-category">${booking.car.category.charAt(0).toUpperCase() + booking.car.category.slice(1)}</p>
            </div>
          </div>
          
          <div class="booking-details">
            <div class="booking-detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>${booking.location}</span>
            </div>
            <div class="booking-detail">
              <i class="fas fa-calendar-alt"></i>
              <span>${pickupDate} - ${returnDate}</span>
            </div>
            <div class="booking-detail">
              <i class="fas fa-rupee-sign"></i>
              <span>₹${booking.totalPrice}</span>
            </div>
            <div class="booking-detail">
              <i class="fas fa-credit-card"></i>
              <span>${booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}</span>
            </div>
          </div>
          
          <div class="booking-actions">
            <a href="/booking-confirmation.html?id=${booking.id}" class="btn btn-outline btn-sm">View Details</a>
            ${statusClass === 'upcoming' ? 
              `<button class="btn btn-primary btn-sm cancel-booking-btn" data-booking-id="${booking.id}">Cancel Booking</button>` : 
              ''
            }
            ${statusClass === 'completed' ? 
              `<button class="btn btn-primary btn-sm write-review-btn" data-booking-id="${booking.id}">Write Review</button>` : 
              ''
            }
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = bookingsHTML;
  
  // Add event listeners to buttons
  const cancelButtons = container.querySelectorAll('.cancel-booking-btn');
  cancelButtons.forEach(button => {
    button.addEventListener('click', () => {
      const bookingId = button.dataset.bookingId;
      confirmCancelBooking(bookingId);
    });
  });
  
  const reviewButtons = container.querySelectorAll('.write-review-btn');
  reviewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const bookingId = button.dataset.bookingId;
      // In a real app, this would open a review form or redirect to a review page
      showNotification('Review feature coming soon!', 'info');
    });
  });
}

// Confirm booking cancellation
function confirmCancelBooking(bookingId) {
  if (confirm('Are you sure you want to cancel this booking? Cancellation fees may apply.')) {
    cancelBooking(bookingId);
  }
}

// Cancel booking
async function cancelBooking(bookingId) {
  try {
    // In a real app, we would send a request to the server
    if (useMockData) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      showNotification('Booking cancelled successfully. A refund will be processed within 5-7 business days.', 'success');
      
      // Reload bookings to reflect the change
      const activeTab = document.querySelector('.filter-tab.active');
      loadBookings(activeTab.dataset.status);
    } else {
      // Send cancellation request to API
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      
      // Show success message
      showNotification('Booking cancelled successfully. A refund will be processed within 5-7 business days.', 'success');
      
      // Reload bookings to reflect the change
      const activeTab = document.querySelector('.filter-tab.active');
      loadBookings(activeTab.dataset.status);
    }
  } catch (error) {
    console.error('Error cancelling booking:', error);
    showNotification('Failed to cancel booking. Please try again later.', 'error');
  }
}