// API Configuration

// Base API URL - Change this to your actual API URL in production
export const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';

// API Endpoints
export const endpoints = {
  // Auth endpoints
  auth: {
    login: `${apiUrl}/auth/login`,
    signup: `${apiUrl}/auth/signup`,
    logout: `${apiUrl}/auth/logout`,
    verify: `${apiUrl}/auth/verify`,
  },
  
  // Cars endpoints
  cars: {
    all: `${apiUrl}/cars`,
    featured: `${apiUrl}/cars/featured`,
    byId: (id) => `${apiUrl}/cars/${id}`,
    byCategory: (category) => `${apiUrl}/cars/category/${category}`,
    search: `${apiUrl}/cars/search`,
  },
  
  // Locations endpoints
  locations: {
    all: `${apiUrl}/locations`,
    byId: (id) => `${apiUrl}/locations/${id}`,
  },
  
  // Bookings endpoints
  bookings: {
    create: `${apiUrl}/bookings`,
    userBookings: `${apiUrl}/bookings/user`,
    byId: (id) => `${apiUrl}/bookings/${id}`,
    cancel: (id) => `${apiUrl}/bookings/${id}/cancel`,
  },
  
  // User endpoints
  user: {
    profile: `${apiUrl}/users/profile`,
    update: `${apiUrl}/users/profile`,
  },
  
  // Reviews/Testimonials endpoints
  reviews: {
    all: `${apiUrl}/reviews`,
    create: `${apiUrl}/reviews`,
    byId: (id) => `${apiUrl}/reviews/${id}`,
  },
};

// Pagination defaults
export const paginationDefaults = {
  limit: 12,
  page: 1,
};

// Car categories
export const carCategories = [
  { id: 'hatchback', name: 'Hatchback' },
  { id: 'sedan', name: 'Sedan' },
  { id: 'suv', name: 'SUV' },
  { id: 'muv', name: 'MUV' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'electric', name: 'Electric' },
];

// Locations
export const majorCities = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Kochi',
  'Chandigarh',
];

// Mock data for development (will be replaced by API calls)
export const useMockData = true; // Set to false when backend is ready