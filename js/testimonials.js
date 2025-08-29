import { useMockData } from './config.js';

// Mock testimonials data
const mockTestimonials = [
  {
    id: 1,
    content: "I had an amazing experience with RentWheels. The car was clean and well-maintained, and the pickup process was smooth. Will definitely use their service again!",
    author: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    content: "Excellent service and very competitive pricing. The car was delivered on time and the return process was hassle-free. Highly recommended!",
    author: "Rahul Mehta",
    location: "Mumbai",
    rating: 4,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    content: "The booking process was so simple and user-friendly. I got exactly the car I wanted, and the customer service was exceptional throughout my rental period.",
    author: "Ananya Patel",
    location: "Bangalore",
    rating: 5,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    content: "Great cars and professional service. Had a minor issue during my trip but their customer service resolved it promptly. Would definitely rent again.",
    author: "Vikram Singh",
    location: "Hyderabad",
    rating: 4,
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// Load testimonials
export async function loadTestimonials() {
  const testimonialsSlider = document.getElementById('testimonials-slider');
  
  if (!testimonialsSlider) return;
  
  try {
    // In a real app, we would fetch data from the server
    let testimonials;
    
    if (useMockData) {
      // Use mock data for development
      testimonials = mockTestimonials;
    } else {
      // Fetch from API
      const response = await fetch(`${apiUrl}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      testimonials = await response.json();
    }
    
    // Render testimonials
    renderTestimonials(testimonials, testimonialsSlider);
    
  } catch (error) {
    console.error('Error loading testimonials:', error);
    testimonialsSlider.innerHTML = '<p>Failed to load testimonials.</p>';
  }
}

// Render testimonials
function renderTestimonials(testimonials, container) {
  if (!testimonials || !testimonials.length) {
    container.innerHTML = '<p>No testimonials available.</p>';
    return;
  }
  
  container.innerHTML = '';
  
  testimonials.forEach(testimonial => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card';
    
    // Generate star rating HTML
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= testimonial.rating) {
        starsHtml += '<i class="fas fa-star"></i>';
      } else {
        starsHtml += '<i class="far fa-star"></i>';
      }
    }
    
    testimonialCard.innerHTML = `
      <div class="testimonial-content">
        <p>${testimonial.content}</p>
      </div>
      <div class="testimonial-author">
        <img src="${testimonial.image}" alt="${testimonial.author}" class="author-image">
        <div class="author-info">
          <h4>${testimonial.author}</h4>
          <p>${testimonial.location}</p>
          <div class="rating">
            ${starsHtml}
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(testimonialCard);
  });
  
  // Initialize a simple slider
  initializeSimpleSlider(container);
}

// Simple slider implementation
function initializeSimpleSlider(container) {
  const testimonialCards = container.querySelectorAll('.testimonial-card');
  let currentIndex = 0;
  
  // Create slider controls
  const sliderControls = document.createElement('div');
  sliderControls.className = 'slider-controls';
  
  sliderControls.innerHTML = `
    <button class="slider-control prev" aria-label="Previous testimonial">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="slider-dots"></div>
    <button class="slider-control next" aria-label="Next testimonial">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
  
  container.parentNode.appendChild(sliderControls);
  
  // Create dots
  const dotsContainer = sliderControls.querySelector('.slider-dots');
  for (let i = 0; i < testimonialCards.length; i++) {
    const dot = document.createElement('button');
    dot.className = i === 0 ? 'slider-dot active' : 'slider-dot';
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
  
  // Show only the current testimonial
  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      if (i === index) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    currentIndex = index;
  }
  
  // Initial display
  showTestimonial(0);
  
  // Event listeners for controls
  const prevButton = sliderControls.querySelector('.prev');
  const nextButton = sliderControls.querySelector('.next');
  
  prevButton.addEventListener('click', () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = testimonialCards.length - 1;
    }
    showTestimonial(newIndex);
  });
  
  nextButton.addEventListener('click', () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonialCards.length) {
      newIndex = 0;
    }
    showTestimonial(newIndex);
  });
  
  // Dot navigation
  const dots = dotsContainer.querySelectorAll('.slider-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      showTestimonial(index);
    });
  });
  
  // Auto-advance slider every 5 seconds
  setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonialCards.length) {
      newIndex = 0;
    }
    showTestimonial(newIndex);
  }, 5000);
}