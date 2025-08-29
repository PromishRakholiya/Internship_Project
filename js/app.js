// Import modules
import { setupTheme } from './theme.js';
import { setupAuth } from './auth.js';
import { loadFeaturedCars } from './cars.js';
import { setupBookingForm } from './booking.js';
import { loadTestimonials } from './testimonials.js';
import { initializeWishlist, setupWishlistButtons } from './wishlist.js';

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  setupTheme();
  setupAuth();
  setupMobileMenu();
  loadFeaturedCars();
  setupBookingForm();
  loadTestimonials();
  setupNewsletterForm();
  initializeWishlist();
  setupWishlistButtons();
});

// Setup mobile menu toggle
function setupMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      
      // Update aria-expanded attribute for accessibility
      const isExpanded = mainNav.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      
      // Toggle menu icon
      if (isExpanded) {
        mobileMenuToggle.classList.add('active');
      } else {
        mobileMenuToggle.classList.remove('active');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.mobile-menu-toggle') && 
          !event.target.closest('.main-nav') && 
          mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', false);
      }
    });
  }
}

// Setup newsletter form
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // In a real application, this would send data to the server
        // For now, we'll just show a success message
        
        // Clear the input
        emailInput.value = '';
        
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
      }
    });
  }
}

// Show notification
export function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <p>${message}</p>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add to the DOM
  document.body.appendChild(notification);
  
  // Show notification with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Setup close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// Add global event listeners
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Handle date inputs to ensure return date is after pickup date
const pickupDateInput = document.getElementById('pickup-date');
const returnDateInput = document.getElementById('return-date');

if (pickupDateInput && returnDateInput) {
  // Set minimum dates to today
  const today = new Date().toISOString().split('T')[0];
  pickupDateInput.min = today;
  returnDateInput.min = today;
  
  // Update return date min value when pickup date changes
  pickupDateInput.addEventListener('change', () => {
    returnDateInput.min = pickupDateInput.value;
    
    // If return date is before pickup date, update it
    if (returnDateInput.value && returnDateInput.value < pickupDateInput.value) {
      returnDateInput.value = pickupDateInput.value;
    }
  });
}

//DeepSeek JS

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Observe steps
document.querySelectorAll('.step').forEach(step => {
  observer.observe(step);
});

// Back to top button
const backToTopButton = document.createElement('div');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// For GIF
// Add this to your app.js file
function resetGif() {
  const hero = document.querySelector('.hero');
  const bgImage = hero.style.backgroundImage;
  hero.style.backgroundImage = 'none';
  setTimeout(() => {
    hero.style.backgroundImage = bgImage;
  }, 50);
}

// Reset the GIF every 2 minutes to ensure smooth looping
setInterval(resetGif, 120000);