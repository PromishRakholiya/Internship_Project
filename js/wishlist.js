import { showNotification } from './app.js';
import { isAuthenticated } from './auth.js';

// Wishlist management
let wishlist = [];

// Initialize wishlist
export function initializeWishlist() {
  loadWishlistFromStorage();
  updateWishlistCount();
  
  // If we're on the wishlist page, load the wishlist
  if (window.location.pathname === '/wishlist.html') {
    loadWishlistPage();
  }
}

// Load wishlist from localStorage
function loadWishlistFromStorage() {
  const savedWishlist = localStorage.getItem('wishlist');
  if (savedWishlist) {
    try {
      wishlist = JSON.parse(savedWishlist);
    } catch (error) {
      console.error('Error parsing wishlist from localStorage:', error);
      wishlist = [];
    }
  }
}

// Save wishlist to localStorage
function saveWishlistToStorage() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Add car to wishlist
export function addToWishlist(car) {
  // Check if car is already in wishlist
  const existingIndex = wishlist.findIndex(item => item.id === car.id);
  
  if (existingIndex === -1) {
    // Add to wishlist
    wishlist.push({
      id: car.id,
      name: car.name,
      category: car.category,
      price: car.price,
      priceUnit: car.priceUnit || 'day',
      image: car.image,
      transmission: car.transmission,
      fuel: car.fuel,
      seats: car.seats,
      location: car.location,
      addedAt: new Date().toISOString()
    });
    
    saveWishlistToStorage();
    updateWishlistCount();
    showNotification(`${car.name} added to wishlist!`, 'success');
    
    // Update wishlist button state
    updateWishlistButtons();
    
    return true;
  } else {
    showNotification(`${car.name} is already in your wishlist!`, 'info');
    return false;
  }
}

// Remove car from wishlist
export function removeFromWishlist(carId) {
  const existingIndex = wishlist.findIndex(item => item.id === carId);
  
  if (existingIndex !== -1) {
    const removedCar = wishlist[existingIndex];
    wishlist.splice(existingIndex, 1);
    
    saveWishlistToStorage();
    updateWishlistCount();
    showNotification(`${removedCar.name} removed from wishlist!`, 'success');
    
    // Update wishlist button state
    updateWishlistButtons();
    
    return true;
  }
  
  return false;
}

// Check if car is in wishlist
export function isInWishlist(carId) {
  return wishlist.some(item => item.id === carId);
}

// Get wishlist items
export function getWishlist() {
  return [...wishlist];
}

// Clear entire wishlist
export function clearWishlist() {
  wishlist = [];
  saveWishlistToStorage();
  updateWishlistCount();
  showNotification('Wishlist cleared!', 'success');
  
  // Update wishlist button state
  updateWishlistButtons();
}

// Update wishlist count in header
function updateWishlistCount() {
  const wishlistCountElement = document.getElementById('wishlist-count');
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlist.length;
    
    // Show/hide count badge
    if (wishlist.length > 0) {
      wishlistCountElement.style.display = 'flex';
    } else {
      wishlistCountElement.style.display = 'none';
    }
  }
}

// Update wishlist button states on all car cards
function updateWishlistButtons() {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn-card');
  
  wishlistButtons.forEach(button => {
    const carId = button.dataset.carId;
    const icon = button.querySelector('i');
    
    if (isInWishlist(carId)) {
      button.classList.add('active');
      if (icon) {
        icon.className = 'fas fa-heart';
      }
      button.setAttribute('aria-label', 'Remove from wishlist');
    } else {
      button.classList.remove('active');
      if (icon) {
        icon.className = 'far fa-heart';
      }
      button.setAttribute('aria-label', 'Add to wishlist');
    }
  });
}

// Setup wishlist functionality for car cards
export function setupWishlistButtons() {
  // Add event listeners to wishlist buttons using event delegation
  document.addEventListener('click', (e) => {
    if (e.target.closest('.wishlist-btn-card')) {
      e.preventDefault();
      e.stopPropagation();
      
      const button = e.target.closest('.wishlist-btn-card');
      const carId = button.dataset.carId;
      
      if (!carId) {
        console.error('Car ID not found on wishlist button');
        return;
      }
      
      // Get car data from the card or create basic car data
      const carCard = button.closest('.car-card');
      let carData;
      
      if (carCard) {
        carData = extractCarDataFromCard(carCard, carId);
      } else {
        // For car details page, extract from page content
        carData = extractCarDataFromDetailsPage(carId);
      }
      
      if (isInWishlist(carId)) {
        removeFromWishlist(carId);
      } else {
        addToWishlist(carData);
      }
    }
  });
}

// Extract car data from car card element
function extractCarDataFromCard(carCard, carId) {
  const nameElement = carCard.querySelector('.car-name');
  const priceElement = carCard.querySelector('.car-price');
  const imageElement = carCard.querySelector('.car-image');
  const categoryAttr = carCard.dataset.category;
  
  const name = nameElement ? nameElement.textContent.trim() : 'Unknown Car';
  const priceText = priceElement ? priceElement.textContent : '₹0/day';
  const priceMatch = priceText.match(/₹(\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;
  const image = imageElement ? imageElement.src : '';
  const category = categoryAttr || 'unknown';
  
  // Extract features from the card
  const features = carCard.querySelectorAll('.car-feature');
  let transmission = 'Manual';
  let fuel = 'Petrol';
  let seats = 5;
  let location = 'Delhi';
  
  features.forEach(feature => {
    const text = feature.textContent.toLowerCase();
    if (text.includes('automatic')) {
      transmission = 'Automatic';
    } else if (text.includes('manual')) {
      transmission = 'Manual';
    }
    
    if (text.includes('petrol')) {
      fuel = 'Petrol';
    } else if (text.includes('diesel')) {
      fuel = 'Diesel';
    } else if (text.includes('electric')) {
      fuel = 'Electric';
    }
    
    const seatMatch = text.match(/(\d+)\s*seat/i);
    if (seatMatch) {
      seats = parseInt(seatMatch[1]);
    }
    
    // Extract location if present
    const locationMatch = text.match(/delhi|mumbai|bangalore|hyderabad|chennai|kolkata|pune|ahmedabad/i);
    if (locationMatch) {
      location = locationMatch[0].charAt(0).toUpperCase() + locationMatch[0].slice(1).toLowerCase();
    }
  });
  
  return {
    id: carId,
    name,
    category,
    price,
    priceUnit: 'day',
    image,
    transmission,
    fuel,
    seats,
    location
  };
}

// Extract car data from car details page
function extractCarDataFromDetailsPage(carId) {
  const nameElement = document.querySelector('.car-detail-header h1');
  const priceElement = document.querySelector('.car-detail-price h2');
  const imageElement = document.querySelector('.car-detail-image');
  const categoryElement = document.querySelector('.car-category');
  
  const name = nameElement ? nameElement.textContent.trim() : 'Unknown Car';
  const priceText = priceElement ? priceElement.textContent : '₹0/day';
  const priceMatch = priceText.match(/₹(\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;
  const image = imageElement ? imageElement.src : '';
  const category = categoryElement ? categoryElement.textContent.toLowerCase() : 'unknown';
  
  // Extract specs from the specs list
  const specsList = document.querySelectorAll('.specs-list li');
  let transmission = 'Manual';
  let fuel = 'Petrol';
  let seats = 5;
  let location = 'Delhi';
  
  specsList.forEach(spec => {
    const text = spec.textContent.toLowerCase();
    if (text.includes('transmission')) {
      if (text.includes('automatic')) {
        transmission = 'Automatic';
      } else if (text.includes('manual')) {
        transmission = 'Manual';
      }
    }
    
    if (text.includes('fuel')) {
      if (text.includes('petrol')) {
        fuel = 'Petrol';
      } else if (text.includes('diesel')) {
        fuel = 'Diesel';
      } else if (text.includes('electric')) {
        fuel = 'Electric';
      }
    }
    
    if (text.includes('seating')) {
      const seatMatch = text.match(/(\d+)/);
      if (seatMatch) {
        seats = parseInt(seatMatch[1]);
      }
    }
    
    if (text.includes('location')) {
      const locationMatch = text.match(/delhi|mumbai|bangalore|hyderabad|chennai|kolkata|pune|ahmedabad/i);
      if (locationMatch) {
        location = locationMatch[0].charAt(0).toUpperCase() + locationMatch[0].slice(1).toLowerCase();
      }
    }
  });
  
  return {
    id: carId,
    name,
    category,
    price,
    priceUnit: 'day',
    image,
    transmission,
    fuel,
    seats,
    location
  };
}

// Load wishlist page content
function loadWishlistPage() {
  const wishlistItems = document.getElementById('wishlist-items');
  const wishlistTotal = document.getElementById('wishlist-total');
  const clearWishlistBtn = document.getElementById('clear-wishlist');
  
  if (!wishlistItems) return;
  
  // Update total count
  if (wishlistTotal) {
    const count = wishlist.length;
    wishlistTotal.textContent = `${count} car${count !== 1 ? 's' : ''}`;
  }
  
  // Setup clear wishlist button
  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener('click', () => {
      if (wishlist.length === 0) {
        showNotification('Your wishlist is already empty!', 'info');
        return;
      }
      
      if (confirm('Are you sure you want to clear your entire wishlist?')) {
        clearWishlist();
        loadWishlistPage(); // Reload the page content
      }
    });
  }
  
  // Display wishlist items
  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
      <div class="empty-wishlist">
        <i class="fas fa-heart-broken"></i>
        <h3>Your wishlist is empty</h3>
        <p>Start adding cars to your wishlist to see them here</p>
        <a href="/cars.html" class="btn btn-primary">Browse Cars</a>
      </div>
    `;
  } else {
    renderWishlistItems(wishlistItems);
  }
}

// Render wishlist items
function renderWishlistItems(container) {
  let itemsHTML = '';
  
  // Sort by most recently added
  const sortedWishlist = [...wishlist].sort((a, b) => 
    new Date(b.addedAt) - new Date(a.addedAt)
  );
  
  sortedWishlist.forEach(car => {
    const addedDate = new Date(car.addedAt).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    itemsHTML += `
      <div class="wishlist-item" data-car-id="${car.id}">
        <div class="wishlist-item-image">
          <img src="${car.image}" alt="${car.name}" loading="lazy">
        </div>
        
        <div class="wishlist-item-details">
          <div class="wishlist-item-header">
            <h3 class="car-name">${car.name}</h3>
            <button class="remove-from-wishlist" data-car-id="${car.id}" aria-label="Remove from wishlist">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="car-category">${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</div>
          
          <div class="car-features">
            <span class="car-feature">
              <i class="fas fa-cog"></i>
              ${car.transmission}
            </span>
            <span class="car-feature">
              <i class="fas fa-gas-pump"></i>
              ${car.fuel}
            </span>
            <span class="car-feature">
              <i class="fas fa-users"></i>
              ${car.seats} Seats
            </span>
            <span class="car-feature">
              <i class="fas fa-map-marker-alt"></i>
              ${car.location}
            </span>
          </div>
          
          <div class="wishlist-item-meta">
            <span class="added-date">Added on ${addedDate}</span>
          </div>
        </div>
        
        <div class="wishlist-item-price">
          <div class="price">₹${car.price}/${car.priceUnit}</div>
        </div>
        
        <div class="wishlist-item-actions">
          <a href="/car-details.html?id=${car.id}" class="btn btn-outline btn-sm">View Details</a>
          <a href="/booking.html?car=${car.id}" class="btn btn-primary btn-sm">Book Now</a>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = itemsHTML;
  
  // Add event listeners for remove buttons
  const removeButtons = container.querySelectorAll('.remove-from-wishlist');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const carId = button.dataset.carId;
      
      if (removeFromWishlist(carId)) {
        // Remove the item from DOM with animation
        const wishlistItem = button.closest('.wishlist-item');
        wishlistItem.style.opacity = '0';
        wishlistItem.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          loadWishlistPage(); // Reload the page content
        }, 300);
      }
    });
  });
}

// Export functions for use in other modules
export { updateWishlistCount, updateWishlistButtons };