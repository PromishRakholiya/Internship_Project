import { showNotification } from './app.js';
import { isAuthenticated } from './auth.js';
import { endpoints, useMockData } from './config.js';
import { mockCars } from './cars.js';

// Setup booking form
export function setupBookingForm() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    setupSearchForm(searchForm);
  }
  
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    setupDetailedBookingForm(bookingForm);
  }
}

// Setup the search form on the home page
function setupSearchForm(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = document.getElementById('location').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const returnDate = document.getElementById('return-date').value;
    
    // Validate dates
    if (new Date(pickupDate) > new Date(returnDate)) {
      showNotification('Return date must be after pickup date', 'error');
      return;
    }
    
    // Redirect to cars page with search parameters
    const searchParams = new URLSearchParams();
    if (location) searchParams.append('location', location);
    if (pickupDate) searchParams.append('pickup_date', pickupDate);
    if (returnDate) searchParams.append('return_date', returnDate);
    
    window.location.href = `/cars.html?${searchParams.toString()}`;
  });
  
  // Set min dates for date inputs
  const pickupDateInput = document.getElementById('pickup-date');
  const returnDateInput = document.getElementById('return-date');
  
  if (pickupDateInput && returnDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.min = today;
    returnDateInput.min = today;
    
    // Set default dates (today and tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    if (!pickupDateInput.value) {
      pickupDateInput.value = today;
    }
    
    if (!returnDateInput.value) {
      returnDateInput.value = tomorrowString;
    }
    
    // Update return date min value when pickup date changes
    pickupDateInput.addEventListener('change', () => {
      const pickupValue = pickupDateInput.value;
      returnDateInput.min = pickupValue;
      
      // If return date is before pickup date, update it
      if (returnDateInput.value && new Date(returnDateInput.value) < new Date(pickupValue)) {
        // Set return date to the day after pickup date
        const newReturnDate = new Date(pickupValue);
        newReturnDate.setDate(newReturnDate.getDate() + 1);
        returnDateInput.value = newReturnDate.toISOString().split('T')[0];
      }
    });
  }
}

// Setup the detailed booking form on the booking page
function setupDetailedBookingForm(form) {
  // Check if user is logged in
  if (!isAuthenticated()) {
    const bookingContainer = form.closest('.booking-container');
    if (bookingContainer) {
      bookingContainer.innerHTML = `
        <div class="auth-required">
          <h2>Login Required</h2>
          <p>Please login to continue with your booking.</p>
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
          } else {
            window.location.href = '/';
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
          } else {
            window.location.href = '/';
          }
        });
      }
      
      return;
    }
  }
  
  // Get car ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('car');
  
  if (!carId) {
    showNotification('No car selected for booking', 'error');
    return;
  }
  
  // Load car details
  loadCarForBooking(carId);
  
  // Initialize form with default values from URL params
  const pickupDate = urlParams.get('pickup_date');
  const returnDate = urlParams.get('return_date');
  const location = urlParams.get('location');
  
  const pickupDateInput = document.getElementById('booking-pickup-date');
  const returnDateInput = document.getElementById('booking-return-date');
  const locationSelect = document.getElementById('booking-location');
  
  if (pickupDateInput && pickupDate) {
    pickupDateInput.value = pickupDate;
  }
  
  if (returnDateInput && returnDate) {
    returnDateInput.value = returnDate;
  }
  
  if (locationSelect && location) {
    locationSelect.value = location;
  }
  
  // Setup date validation
  if (pickupDateInput && returnDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.min = today;
    returnDateInput.min = today;
    
    // Set default dates if not provided
    if (!pickupDateInput.value) {
      pickupDateInput.value = today;
    }
    
    if (!returnDateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      returnDateInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Update return date min value when pickup date changes
    pickupDateInput.addEventListener('change', () => {
      returnDateInput.min = pickupDateInput.value;
      
      // If return date is before pickup date, update it
      if (new Date(returnDateInput.value) < new Date(pickupDateInput.value)) {
        // Set return date to the day after pickup date
        const newReturnDate = new Date(pickupDateInput.value);
        newReturnDate.setDate(newReturnDate.getDate() + 1);
        returnDateInput.value = newReturnDate.toISOString().split('T')[0];
      }
      
      // Recalculate total price
      updateBookingSummary();
    });
    
    // Update total price when return date changes
    returnDateInput.addEventListener('change', () => {
      // Recalculate total price
      updateBookingSummary();
    });
  }
  
  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    const pickupDate = document.getElementById('booking-pickup-date').value;
    const returnDate = document.getElementById('booking-return-date').value;
    const location = document.getElementById('booking-location').value;
    const fullName = document.getElementById('booking-name').value;
    const email = document.getElementById('booking-email').value;
    const phone = document.getElementById('booking-phone').value;
    
    if (!pickupDate || !returnDate || !location || !fullName || !email || !phone) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Validate dates
    if (new Date(pickupDate) >= new Date(returnDate)) {
      showNotification('Return date must be after pickup date', 'error');
      return;
    }
    
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      showNotification('Please enter a valid 10-digit phone number', 'error');
      return;
    }
    
    try {
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = 'Processing... <i class="fas fa-spinner fa-spin"></i>';
      
      // In a real app, we would send the booking data to the server
      if (!useMockData) {
        const response = await fetch(endpoints.bookings.create, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            carId,
            pickupDate,
            returnDate,
            location,
            contactInfo: {
              fullName,
              email,
              phone
            }
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to create booking');
        }
        
        const data = await response.json();
        
        // Redirect to booking confirmation page
        window.location.href = `/booking-confirmation.html?id=${data.bookingId}`;
      } else {
        // Simulate API call delay for mock data
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate a random booking ID
        const bookingId = Math.floor(Math.random() * 10000000);
        
        // Redirect to booking confirmation page
        window.location.href = `/booking-confirmation.html?id=${bookingId}`;
      }
      
    } catch (error) {
      console.error('Error creating booking:', error);
      showNotification('Failed to process your booking. Please try again.', 'error');
      
      // Reset button state
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// Load car details for booking
async function loadCarForBooking(carId) {
  const carDetailsContainer = document.getElementById('booking-car-details');
  
  if (!carDetailsContainer) return;
  
  try {
    // Show loading state
    carDetailsContainer.innerHTML = '<div class="loading">Loading car details...</div>';
    
    // In a real app, we would fetch data from the server
    let car;
    
    if (useMockData) {
      // Simulate API call delay for mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find car in mock data (this is simplified - in a real app we'd have a proper API call)
      const mockCars1 = [
        {
          id: '1',
          name: 'Maruti Swift',
          category: 'hatchback',
          price: 1200,
          priceUnit: 'day',
          image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Swift/10903/1697697308167/front-left-side-47.jpg?tr=w-664',
          transmission: 'Manual',
          fuel: 'Petrol',
          seats: 5,
          mileage: '21 km/l',
          airConditioned: true,
          location: 'Delhi',
          available: true
        },
        {
          id: '2',
          name: 'Hyundai Creta',
          category: 'suv',
          price: 2000,
          priceUnit: 'day',
          image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/8667/1744607863052/front-left-side-47.jpg?tr=w-664',
          transmission: 'Automatic',
          fuel: 'Diesel',
          seats: 5,
          mileage: '18 km/l',
          airConditioned: true,
          location: 'Mumbai',
          available: true
        }
      ];
      
      car = mockCars.find(c => c.id === carId);
      
      if (!car) {
        throw new Error('Car not found');
      }
    } else {
      // Fetch from API
      const response = await fetch(endpoints.cars.byId(carId));
      if (!response.ok) throw new Error('Failed to fetch car details');
      car = await response.json();
    }
    
    // Render car details
    renderCarDetailsForBooking(car, carDetailsContainer);
    
    // Store car data for price calculation
    window.bookingCarData = car;
    
    // Update booking summary
    updateBookingSummary();
    
  } catch (error) {
    console.error('Error loading car for booking:', error);
    carDetailsContainer.innerHTML = '<div class="error">Failed to load car details. Please try again.</div>';
  }
}

// Render car details for booking
function renderCarDetailsForBooking(car, container) {
  container.innerHTML = `
    <div class="booking-car-card">
      <img src="${car.image}" alt="${car.name}" class="booking-car-image">
      <div class="booking-car-info">
        <h3>${car.name}</h3>
        <p class="booking-car-price">₹${car.price}/${car.priceUnit}</p>
        <div class="booking-car-features">
          <span><i class="fas fa-car"></i> ${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</span>
          <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
          <span><i class="fas fa-cog"></i> ${car.transmission}</span>
          <span><i class="fas fa-users"></i> ${car.seats} Seats</span>
        </div>
      </div>
    </div>
  `;
}

// Update booking summary with price calculation
function updateBookingSummary() {
  const summaryContainer = document.getElementById('booking-summary');
  if (!summaryContainer || !window.bookingCarData) return;
  
  const car = window.bookingCarData;
  const pickupDate = new Date(document.getElementById('booking-pickup-date').value);
  const returnDate = new Date(document.getElementById('booking-return-date').value);
  
  // Calculate number of days
  const differenceInTime = returnDate.getTime() - pickupDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
  // Calculate prices
  const rentalPrice = car.price * differenceInDays;
  const insurancePrice = 300 * differenceInDays; // Flat rate per day
  const gst = Math.round(0.18 * (rentalPrice + insurancePrice)); // 18% GST
  const totalPrice = rentalPrice + insurancePrice + gst;
  
  // Update summary
  summaryContainer.innerHTML = `
    <h3>Booking Summary</h3>
    <div class="summary-item">
      <span>Rental Period:</span>
      <span>${differenceInDays} days</span>
    </div>
    <div class="summary-item">
      <span>Car Rental:</span>
      <span>₹${rentalPrice}</span>
    </div>
    <div class="summary-item">
      <span>Insurance:</span>
      <span>₹${insurancePrice}</span>
    </div>
    <div class="summary-item">
      <span>GST (18%):</span>
      <span>₹${gst}</span>
    </div>
    <div class="summary-item total">
      <span>Total:</span>
      <span>₹${totalPrice}</span>
    </div>
    
    <div class="booking-policies">
      <h4>Booking Policies</h4>
      <p><i class="fas fa-info-circle"></i> Free cancellation up to 24 hours before pickup</p>
      <p><i class="fas fa-info-circle"></i> Security deposit of ₹5000 required at pickup</p>
      <p><i class="fas fa-info-circle"></i> Fuel policy: Return with same fuel level</p>
    </div>
  `;
  
  // Update hidden field with total price
  const totalPriceInput = document.getElementById('total-price');
  if (totalPriceInput) {
    totalPriceInput.value = totalPrice;
  }
}