import { showNotification } from './app.js';

// User state
let currentUser = null;

// Function to setup authentication
export function setupAuth() {
  // Check if user is already logged in
  checkAuth();
  
  // Setup login and signup buttons
  setupLoginButton();
  setupSignupButton();
  
  // Setup modal switching
  setupModalSwitching();
  
  // Setup logout button
  setupLogoutButton();
  
  // Setup form submissions
  setupLoginForm();
  setupSignupForm();
}

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    // In a real app, we would validate the token with the server
    try {
      // For demo purposes, we'll just parse the stored user info
      currentUser = JSON.parse(localStorage.getItem('user'));
      updateUIForAuthenticatedUser();
    } catch (error) {
      console.error('Error parsing user data', error);
      logout();
    }
  }
}

// Update UI for authenticated user
function updateUIForAuthenticatedUser() {
  if (!currentUser) return;
  
  const authButtons = document.querySelector('.auth-buttons');
  const userProfile = document.querySelector('.user-profile');
  const userName = document.querySelector('.user-name');
  
  if (authButtons && userProfile && userName) {
    authButtons.classList.add('hidden');
    userProfile.classList.remove('hidden');
    userName.textContent = currentUser.name;
  }
}

// Update UI for non-authenticated user
function updateUIForNonAuthenticatedUser() {
  const authButtons = document.querySelector('.auth-buttons');
  const userProfile = document.querySelector('.user-profile');
  
  if (authButtons && userProfile) {
    authButtons.classList.remove('hidden');
    userProfile.classList.add('hidden');
  }
}

// Setup login button
function setupLoginButton() {
  const loginBtn = document.getElementById('login-btn');
  const loginModal = document.getElementById('login-modal');
  
  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
      openModal(loginModal);
    });
  }
}

// Setup signup button
function setupSignupButton() {
  const signupBtn = document.getElementById('signup-btn');
  const signupModal = document.getElementById('signup-modal');
  
  if (signupBtn && signupModal) {
    signupBtn.addEventListener('click', () => {
      openModal(signupModal);
    });
  }
}

// Setup modal switching
function setupModalSwitching() {
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  const loginModal = document.getElementById('login-modal');
  const signupModal = document.getElementById('signup-modal');
  
  if (switchToSignup && loginModal && signupModal) {
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      openModal(signupModal);
    });
  }
  
  if (switchToLogin && loginModal && signupModal) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(signupModal);
      openModal(loginModal);
    });
  }
  
  // Setup close buttons
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal.active');
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
}

// Open modal
function openModal(modal) {
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close modal
function closeModal(modal) {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Setup login form
function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      
      try {
        // In a real application, this would send data to the server
        // For this demo, we'll simulate a successful login
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login for demo purposes
        const userData = {
          id: '12345',
          name: 'Demo User',
          email: email
        };
        
        // Save auth data
        localStorage.setItem('authToken', 'demo-token-12345');
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update current user
        currentUser = userData;
        
        // Update UI
        updateUIForAuthenticatedUser();
        
        // Check for redirect URL
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          window.location.href = redirectUrl;
          return;
        }
        
        // Close modal
        const loginModal = document.getElementById('login-modal');
        closeModal(loginModal);
        
        // Show success message
        showNotification('You have successfully logged in!', 'success');
        
        // Clear form
        loginForm.reset();
        
      } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please check your credentials.', 'error');
      }
    });
  }
}

// Setup signup form
function setupSignupForm() {
  const signupForm = document.getElementById('signup-form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const phone = document.getElementById('signup-phone').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      
      // Validate passwords match
      if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
      }
      
      try {
        // In a real application, this would send data to the server
        // For this demo, we'll simulate a successful registration
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful registration for demo purposes
        const userData = {
          id: '12345',
          name: name,
          email: email,
          phone: phone
        };
        
        // Save auth data
        localStorage.setItem('authToken', 'demo-token-12345');
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update current user
        currentUser = userData;
        
        // Update UI
        updateUIForAuthenticatedUser();
        
        // Check for redirect URL
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          window.location.href = redirectUrl;
          return;
        }
        
        // Close modal
        const signupModal = document.getElementById('signup-modal');
        closeModal(signupModal);
        
        // Show success message
        showNotification('Your account has been created successfully!', 'success');
        
        // Clear form
        signupForm.reset();
        
      } catch (error) {
        console.error('Signup error:', error);
        showNotification('Registration failed. Please try again.', 'error');
      }
    });
  }
}

// Setup logout button
function setupLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
}

// Logout function
function logout() {
  // Clear auth data
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  // Reset current user
  currentUser = null;
  
  // Update UI
  updateUIForNonAuthenticatedUser();
  
  // Show message
  showNotification('You have been logged out successfully', 'info');
}

// Get current user
export function getCurrentUser() {
  return currentUser;
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!currentUser;
}