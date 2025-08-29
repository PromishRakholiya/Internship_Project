import { showNotification } from './app.js';
import { useMockData } from './config.js';

// Mock locations data
const mockLocations = [
  {
    id: 1,
    name: 'Delhi',
    region: 'north',
    state: 'Delhi',
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'India\'s capital city with rich history and modern infrastructure',
    pickupPoints: [
      'Indira Gandhi International Airport',
      'New Delhi Railway Station',
      'Connaught Place',
      'Karol Bagh',
      'Dwarka Sector 21'
    ],
    carCount: 150,
    popularCars: ['Maruti Swift', 'Hyundai Creta', 'Honda City'],
    contact: {
      phone: '+91 98765 43210',
      email: 'delhi@rentwheels.in',
      address: '123 Connaught Place, New Delhi - 110001'
    },
    operatingHours: '24/7',
    features: ['Airport Pickup', '24/7 Support', 'Luxury Cars', 'Economy Cars']
  },
  {
    id: 2,
    name: 'Mumbai',
    region: 'west',
    state: 'Maharashtra',
    image: 'https://images.pexels.com/photos/32261174/pexels-photo-32261174/free-photo-of-flora-fountain-in-mumbai-s-historic-district.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Financial capital of India with bustling city life',
    pickupPoints: [
      'Chhatrapati Shivaji International Airport',
      'Mumbai Central Railway Station',
      'Bandra Kurla Complex',
      'Andheri East',
      'Powai'
    ],
    carCount: 200,
    popularCars: ['Toyota Innova', 'Maruti Swift', 'BMW 3 Series'],
    contact: {
      phone: '+91 98765 43211',
      email: 'mumbai@rentwheels.in',
      address: '456 Bandra West, Mumbai - 400050'
    },
    operatingHours: '24/7',
    features: ['Airport Pickup', '24/7 Support', 'Luxury Cars', 'Business Cars']
  },
  {
    id: 3,
    name: 'Bangalore',
    region: 'south',
    state: 'Karnataka',
    image: 'https://images.pexels.com/photos/14845309/pexels-photo-14845309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Silicon Valley of India with pleasant weather',
    pickupPoints: [
      'Kempegowda International Airport',
      'Bangalore City Railway Station',
      'Electronic City',
      'Whitefield',
      'Koramangala'
    ],
    carCount: 180,
    popularCars: ['Hyundai Creta', 'Honda City', 'Tata Nexon'],
    contact: {
      phone: '+91 98765 43212',
      email: 'bangalore@rentwheels.in',
      address: '789 MG Road, Bangalore - 560001'
    },
    operatingHours: '24/7',
    features: ['Airport Pickup', 'Tech Hub Access', 'Electric Cars', 'Economy Cars']
  },
  {
    id: 4,
    name: 'Hyderabad',
    region: 'south',
    state: 'Telangana',
    image: 'https://images.pexels.com/photos/29152603/pexels-photo-29152603/free-photo-of-majestic-architecture-with-flying-birds-in-hyderabad.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'City of Nizams with modern IT infrastructure',
    pickupPoints: [
      'Rajiv Gandhi International Airport',
      'Secunderabad Railway Station',
      'HITEC City',
      'Gachibowli',
      'Banjara Hills'
    ],
    carCount: 120,
    popularCars: ['Maruti Swift', 'Hyundai Verna', 'Toyota Innova'],
    contact: {
      phone: '+91 98765 43213',
      email: 'hyderabad@rentwheels.in',
      address: '321 Banjara Hills, Hyderabad - 500034'
    },
    operatingHours: '24/7',
    features: ['Airport Pickup', 'IT Hub Access', 'Luxury Cars', 'Family Cars']
  },
  {
    id: 5,
    name: 'Chennai',
    region: 'south',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1637080618498-b4a1cad84ae0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Gateway to South India with rich cultural heritage',
    pickupPoints: [
      'Chennai International Airport',
      'Chennai Central Railway Station',
      'OMR (IT Corridor)',
      'T. Nagar',
      'Anna Nagar'
    ],
    carCount: 140,
    popularCars: ['Honda City', 'Hyundai Creta', 'Maruti Baleno'],
    contact: {
      phone: '+91 98765 43214',
      email: 'chennai@rentwheels.in',
      address: '654 Anna Nagar, Chennai - 600040'
    },
    operatingHours: '24/7',
    features: ['Airport Pickup', 'Beach Access', 'Cultural Tours', 'Economy Cars']
  },
  {
    id: 6,
    name: 'Kolkata',
    region: 'east',
    state: 'West Bengal',
    image: 'https://plus.unsplash.com/premium_photo-1697730497487-7bda47e4baff?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Cultural capital of India with colonial architecture',
    pickupPoints: [
      'Netaji Subhas Chandra Bose International Airport',
      'Howrah Railway Station',
      'Park Street',
      'Salt Lake City',
      'New Town'
    ],
    carCount: 100,
    popularCars: ['Maruti Swift', 'Tata Nexon', 'Honda City'],
    contact: {
      phone: '+91 98765 43215',
      email: 'kolkata@rentwheels.in',
      address: '987 Park Street, Kolkata - 700016'
    },
    operatingHours: '24/7',
    features: ['Airport Pickup', 'Heritage Tours', 'Cultural Access', 'Economy Cars']
  },
  {
    id: 7,
    name: 'Pune',
    region: 'west',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1713761525604-45384322feae?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UHVuZSUyMGNpdHl8ZW58MHx8MHx8fDA%3D',
    description: 'Oxford of the East with vibrant student life',
    pickupPoints: [
      'Pune Airport',
      'Pune Railway Station',
      'Hinjewadi IT Park',
      'Koregaon Park',
      'Viman Nagar'
    ],
    carCount: 90,
    popularCars: ['Maruti Swift', 'Hyundai Creta', 'Volkswagen Polo'],
    contact: {
      phone: '+91 98765 43216',
      email: 'pune@rentwheels.in',
      address: '147 FC Road, Pune - 411005'
    },
    operatingHours: '24/7',
    features: ['IT Park Access', 'Student Discounts', 'Weekend Trips', 'Economy Cars']
  },
  {
    id: 8,
    name: 'Ahmedabad',
    region: 'west',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1713260443292-ec016608ca42?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWhtZWRhYmFkJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Commercial hub of Gujarat with rich heritage',
    pickupPoints: [
      'Sardar Vallabhbhai Patel International Airport',
      'Ahmedabad Railway Station',
      'SG Highway',
      'Satellite',
      'Maninagar'
    ],
    carCount: 85,
    popularCars: ['Maruti Swift', 'Hyundai Verna', 'Tata Nexon'],
    contact: {
      phone: '+91 98765 43217',
      email: 'ahmedabad@rentwheels.in',
      address: '258 SG Highway, Ahmedabad - 380015'
    },
    operatingHours: '24/7',
    features: ['Airport Pickup', 'Business Travel', 'Heritage Tours', 'Economy Cars']
  },
  {
    id: 9,
    name: 'Jaipur',
    region: 'north',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Pink City with magnificent palaces and forts',
    pickupPoints: [
      'Jaipur International Airport',
      'Jaipur Railway Station',
      'Pink City',
      'Malviya Nagar',
      'Vaishali Nagar'
    ],
    carCount: 75,
    popularCars: ['Maruti Swift', 'Honda City', 'Mahindra Thar'],
    contact: {
      phone: '+91 98765 43218',
      email: 'jaipur@rentwheels.in',
      address: '369 MI Road, Jaipur - 302001'
    },
    operatingHours: '24/7',
    features: ['Heritage Tours', 'Desert Safari', 'Palace Visits', 'Tourist Cars']
  },
  {
    id: 10,
    name: 'Chandigarh',
    region: 'north',
    state: 'Chandigarh',
    image: 'https://images.unsplash.com/photo-1588669494151-f4c6df6f715b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hhbmRpZ2FyaHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Beautiful planned city with modern architecture',
    pickupPoints: [
      'Chandigarh Airport',
      'Chandigarh Railway Station',
      'Sector 17',
      'Sector 35',
      'Mohali'
    ],
    carCount: 60,
    popularCars: ['Maruti Swift', 'Hyundai Creta', 'Honda City'],
    contact: {
      phone: '+91 98765 43219',
      email: 'chandigarh@rentwheels.in',
      address: '741 Sector 17, Chandigarh - 160017'
    },
    operatingHours: '24/7',
    features: ['Hill Station Access', 'Clean City', 'Modern Infrastructure', 'Economy Cars']
  },
  {
    id: 11,
    name: 'Lucknow',
    region: 'north',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1601752874509-0e350467dc7b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8THVja25vd3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'City of Nawabs with rich cultural heritage',
    pickupPoints: [
      'Chaudhary Charan Singh Airport',
      'Lucknow Railway Station',
      'Hazratganj',
      'Gomti Nagar',
      'Indira Nagar'
    ],
    carCount: 70,
    popularCars: ['Maruti Swift', 'Honda City', 'Hyundai Verna'],
    contact: {
      phone: '+91 98765 43220',
      email: 'lucknow@rentwheels.in',
      address: '852 Hazratganj, Lucknow - 226001'
    },
    operatingHours: '24/7',
    features: ['Heritage Tours', 'Cultural Access', 'Food Tours', 'Economy Cars']
  },
  {
    id: 12,
    name: 'Kochi',
    region: 'south',
    state: 'Kerala',
    image: 'https://plus.unsplash.com/premium_photo-1697729597066-7b3d09b6dab7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S29jaGl8ZW58MHx8MHx8fDA%3D',
    description: 'Queen of Arabian Sea with beautiful backwaters',
    pickupPoints: [
      'Cochin International Airport',
      'Ernakulam Railway Station',
      'Marine Drive',
      'Kakkanad',
      'Fort Kochi'
    ],
    carCount: 65,
    popularCars: ['Maruti Swift', 'Toyota Innova', 'Honda City'],
    contact: {
      phone: '+91 98765 43221',
      email: 'kochi@rentwheels.in',
      address: '963 Marine Drive, Kochi - 682031'
    },
    operatingHours: '24/7',
    features: ['Backwater Tours', 'Beach Access', 'Spice Tours', 'Tourist Cars']
  },
  {
    id: 13,
    name: 'Bhubaneswar',
    region: 'east',
    state: 'Odisha',
    image: 'https://images.unsplash.com/photo-1617217139357-b77ae58ad4b2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qmh1YmFuZXN3YXJ8ZW58MHx8MHx8fDA%3D',
    description: 'Temple city with modern planned infrastructure',
    pickupPoints: [
      'Biju Patnaik International Airport',
      'Bhubaneswar Railway Station',
      'Patia',
      'Saheed Nagar',
      'Kalinga Nagar'
    ],
    carCount: 50,
    popularCars: ['Maruti Swift', 'Hyundai Creta', 'Tata Nexon'],
    contact: {
      phone: '+91 98765 43222',
      email: 'bhubaneswar@rentwheels.in',
      address: '159 Saheed Nagar, Bhubaneswar - 751007'
    },
    operatingHours: '24/7',
    features: ['Temple Tours', 'Cultural Heritage', 'Modern City', 'Economy Cars']
  },
  {
    id: 14,
    name: 'Guwahati',
    region: 'east',
    state: 'Assam',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAr7tR-4Kho62Q5gCwS9d5QVsuI_Xqy2ujKA&s',
    description: 'Gateway to Northeast India with natural beauty',
    pickupPoints: [
      'Lokpriya Gopinath Bordoloi International Airport',
      'Guwahati Railway Station',
      'Paltan Bazaar',
      'Six Mile',
      'Dispur'
    ],
    carCount: 45,
    popularCars: ['Maruti Swift', 'Hyundai Creta', 'Toyota Innova'],
    contact: {
      phone: '+91 98765 43223',
      email: 'guwahati@rentwheels.in',
      address: '357 Paltan Bazaar, Guwahati - 781008'
    },
    operatingHours: '24/7',
    features: ['Northeast Access', 'Nature Tours', 'River Cruises', 'Adventure Cars']
  },
  {
    id: 15,
    name: 'Surat',
    region: 'west',
    state: 'Gujarat',
    image: 'https://media.istockphoto.com/id/1197779908/photo/panoramic-silhouette-of-surat-city-while-sun-rising-near-ongc-bridge.webp?a=1&b=1&s=612x612&w=0&k=20&c=sebK4MFI_4O_9wpT5ThzJzNBxB3seRL_g65WOOsiDQM=',
    description: 'Diamond city with thriving textile industry',
    pickupPoints: [
      'Surat Airport',
      'Surat Railway Station',
      'Adajan',
      'Vesu',
      'Citylight'
    ],
    carCount: 55,
    popularCars: ['Maruti Swift', 'Hyundai Verna', 'Honda City'],
    contact: {
      phone: '+91 98765 43224',
      email: 'surat@rentwheels.in',
      address: '468 Ring Road, Surat - 395002'
    },
    operatingHours: '24/7',
    features: ['Business Travel', 'Industrial Access', 'Beach Nearby', 'Economy Cars']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  loadLocations();
  setupLocationSearch();
  setupRegionFilters();
});

// Load all locations
async function loadLocations(filteredLocations = null) {
  const locationsGrid = document.getElementById('locations-grid');
  
  if (!locationsGrid) return;
  
  try {
    // Show loading state
    locationsGrid.innerHTML = '<div class="loading">Loading locations...</div>';
    
    // Use filtered locations or all locations
    const locations = filteredLocations || mockLocations;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Render locations
    renderLocations(locations, locationsGrid);
    
  } catch (error) {
    console.error('Error loading locations:', error);
    locationsGrid.innerHTML = '<div class="error">Failed to load locations. Please try again later.</div>';
  }
}

// Render locations grid
function renderLocations(locations, container) {
  if (!locations || locations.length === 0) {
    container.innerHTML = '<div class="no-results">No locations found matching your criteria.</div>';
    return;
  }
  
  let locationsHTML = '';
  
  locations.forEach(location => {
    locationsHTML += `
      <div class="location-card" data-region="${location.region}">
        <div class="location-image">
          <img src="${location.image}" alt="${location.name}" loading="lazy">
          <div class="location-overlay">
            <div class="location-stats">
              <span class="car-count">${location.carCount}+ Cars</span>
              <span class="pickup-points">${location.pickupPoints.length} Pickup Points</span>
            </div>
          </div>
        </div>
        
        <div class="location-content">
          <div class="location-header">
            <h3 class="location-name">${location.name}</h3>
            <span class="location-state">${location.state}</span>
          </div>
          
          <p class="location-description">${location.description}</p>
          
          <div class="location-features">
            ${location.features.slice(0, 3).map(feature => `
              <span class="feature-tag">${feature}</span>
            `).join('')}
          </div>
          
          <div class="location-popular-cars">
            <h4>Popular Cars:</h4>
            <p>${location.popularCars.join(', ')}</p>
          </div>
          
          <div class="location-contact">
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <span>${location.contact.phone}</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-clock"></i>
              <span>${location.operatingHours}</span>
            </div>
          </div>
          
          <div class="location-actions">
            <button class="btn btn-outline btn-sm view-details-btn" data-location-id="${location.id}">
              View Details
            </button>
            <a href="/cars.html?location=${location.name}" class="btn btn-primary btn-sm">
              Browse Cars
            </a>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = locationsHTML;
  
  // Add event listeners for view details buttons
  const viewDetailsButtons = container.querySelectorAll('.view-details-btn');
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
      const locationId = parseInt(button.dataset.locationId);
      showLocationDetails(locationId);
    });
  });
}

// Setup location search functionality
function setupLocationSearch() {
  const searchInput = document.getElementById('location-search');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Show all locations
      loadLocations();
    } else {
      // Filter locations based on search term
      const filteredLocations = mockLocations.filter(location => 
        location.name.toLowerCase().includes(searchTerm) ||
        location.state.toLowerCase().includes(searchTerm) ||
        location.description.toLowerCase().includes(searchTerm)
      );
      
      loadLocations(filteredLocations);
    }
  });
}

// Setup region filter buttons
function setupRegionFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get selected region
      const selectedRegion = button.dataset.region;
      
      // Filter locations
      if (selectedRegion === 'all') {
        loadLocations();
      } else {
        const filteredLocations = mockLocations.filter(location => 
          location.region === selectedRegion
        );
        loadLocations(filteredLocations);
      }
      
      // Clear search input
      const searchInput = document.getElementById('location-search');
      if (searchInput) {
        searchInput.value = '';
      }
    });
  });
}

// Show location details in a modal or expanded view
function showLocationDetails(locationId) {
  const location = mockLocations.find(loc => loc.id === locationId);
  
  if (!location) {
    showNotification('Location details not found', 'error');
    return;
  }
  
  // Create modal content
  const modalContent = `
    <div class="location-details-modal">
      <div class="modal-header">
        <h2>${location.name}, ${location.state}</h2>
        <button class="close-modal">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="location-detail-image">
          <img src="${location.image}" alt="${location.name}">
        </div>
        
        <div class="location-detail-info">
          <p class="location-detail-description">${location.description}</p>
          
          <div class="detail-section">
            <h3>Pickup Points</h3>
            <ul class="pickup-points-list">
              ${location.pickupPoints.map(point => `<li><i class="fas fa-map-marker-alt"></i> ${point}</li>`).join('')}
            </ul>
          </div>
          
          <div class="detail-section">
            <h3>Available Features</h3>
            <div class="features-grid">
              ${location.features.map(feature => `<span class="feature-badge">${feature}</span>`).join('')}
            </div>
          </div>
          
          <div class="detail-section">
            <h3>Contact Information</h3>
            <div class="contact-details">
              <div class="contact-row">
                <i class="fas fa-phone"></i>
                <span>${location.contact.phone}</span>
              </div>
              <div class="contact-row">
                <i class="fas fa-envelope"></i>
                <span>${location.contact.email}</span>
              </div>
              <div class="contact-row">
                <i class="fas fa-map-marker-alt"></i>
                <span>${location.contact.address}</span>
              </div>
              <div class="contact-row">
                <i class="fas fa-clock"></i>
                <span>Operating Hours: ${location.operatingHours}</span>
              </div>
            </div>
          </div>
          
          <div class="detail-section">
            <h3>Fleet Information</h3>
            <p><strong>Total Cars Available:</strong> ${location.carCount}+</p>
            <p><strong>Popular Models:</strong> ${location.popularCars.join(', ')}</p>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <a href="/cars.html?location=${location.name}" class="btn btn-primary">Browse Cars in ${location.name}</a>
      </div>
    </div>
  `;
  
  // Create and show modal
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `<div class="modal-content location-modal">${modalContent}</div>`;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Setup close functionality
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = '';
  });
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  });
  
  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    }
  };
  
  document.addEventListener('keydown', handleEscape);
}

// Export functions for use in other modules
export { loadLocations, mockLocations };