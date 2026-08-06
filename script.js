/* ============================================
   UPISTEPS - PREMIUM WEBSITE JAVASCRIPT
   ============================================ */

// ============================================
// 1. PREMIUM MENU FUNCTIONALITY
// ============================================

const menuButton = document.querySelector('.premium-menu-button');
const sidebar = document.querySelector('.premium-sidebar-menu');
const menuClose = document.querySelector('.menu-close');
const menuLinks = document.querySelectorAll('.menu-link');

// Open menu
menuButton.addEventListener('click', () => {
  sidebar.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Close menu
menuClose.addEventListener('click', () => {
  sidebar.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close menu when clicking links
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
    sidebar.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// ============================================
// 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// 3. FAQ ACCORDION ANIMATION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  
  question.addEventListener('click', () => {
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
    
    // Smooth height animation
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0';
    }
  });
});

// ============================================
// 4. SCROLL ANIMATIONS & INTERSECTION OBSERVER
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll(
  '.service-card, .blog-card, .review-card, .feature-item, .pricing-card'
).forEach(element => {
  observer.observe(element);
});

// ============================================
// 5. HERO TITLE ANIMATION ON LOAD
// ============================================

window.addEventListener('load', () => {
  const titleWords = document.querySelectorAll('.title-word');
  titleWords.forEach((word, index) => {
    setTimeout(() => {
      word.style.animation = 'slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    }, index * 100);
  });
});

// ============================================
// 6. FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const phone = contactForm.querySelector('input[type="tel"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();
    
    // Validation
    if (!name || !email || !phone || !message) {
      showNotification('Please fill all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter valid email', 'error');
      return;
    }
    
    if (!isValidPhone(phone)) {
      showNotification('Please enter valid phone number', 'error');
      return;
    }
    
    // Show success message
    showNotification('Message sent successfully! We will contact you soon.', 'success');
    contactForm.reset();
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 30px;
    right: 30px;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 10000;
    animation: slideInRight 0.4s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// ============================================
// 7. NEWSLETTER SUBSCRIPTION
// ============================================

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
  const submitBtn = form.querySelector('button');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
      showNotification('Please enter your email', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter valid email', 'error');
      return;
    }
    
    showNotification('Successfully subscribed to our newsletter!', 'success');
    emailInput.value = '';
  });
});

// ============================================
// 8. SCROLL EFFECT - NAVBAR HIDE/SHOW
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('.premium-menu-button');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > lastScrollTop && currentScroll > 500) {
    // Scrolling down
    header.style.transform = 'translateY(100px)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ============================================
// 9. ACTIVE NAVIGATION INDICATOR
// ============================================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============================================
// 10. PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
  const blobs = document.querySelectorAll('.gradient-blob');
  const scrolled = window.pageYOffset;
  
  blobs.forEach((blob, index) => {
    blob.style.transform = `translateY(${scrolled * (0.5 + index * 0.1)}px)`;
  });
});

// ============================================
// 11. BUTTON RIPPLE EFFECT
// ============================================

function createRipple(event) {
  const button = event.currentTarget;
  
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = diameter + 'px';
  circle.style.left = (event.clientX - button.offsetLeft - radius) + 'px';
  circle.style.top = (event.clientY - button.offsetTop - radius) + 'px';
  circle.classList.add('ripple');
  
  const ripple = button.querySelector('.ripple');
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', createRipple);
});

// ============================================
// 12. IMAGE LAZY LOADING
// ============================================

const images = document.querySelectorAll('.placeholder-image, .placeholder-large, .placeholder-image-medium');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.animation = 'fadeIn 0.6s ease';
      imageObserver.unobserve(img);
    }
  });
}, { threshold: 0.1 });

images.forEach(img => imageObserver.observe(img));

// ============================================
// 13. DYNAMIC COUNTER ANIMATION
// ============================================

const counters = document.querySelectorAll('.stat-item h3');
const speed = 200;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.textContent);
      
      const increment = target / speed;
      
      const updateCount = () => {
        const count = parseInt(counter.textContent);
        
        if (count < target) {
          counter.textContent = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCount();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ============================================
// 14. REVIEW CAROUSEL (Optional)
// ============================================

function initReviewCarousel() {
  const reviewCards = document.querySelectorAll('.review-card');
  let currentIndex = 0;
  
  // Add stagger animation
  reviewCards.forEach((card, index) => {
    card.style.animation = `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both`;
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

initReviewCarousel();

// ============================================
// 15. BLOG CARD HOVER EFFECTS
// ============================================

const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const image = card.querySelector('.placeholder-image');
    if (image) {
      image.style.transform = 'scale(1.05) rotate(1deg)';
      image.style.filter = 'brightness(1.1)';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    const image = card.querySelector('.placeholder-image');
    if (image) {
      image.style.transform = 'scale(1) rotate(0deg)';
      image.style.filter = 'brightness(1)';
    }
  });
});

// ============================================
// 16. SERVICE CARD INTERACTIVE
// ============================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
    const icon = card.querySelector('.placeholder-large');
    if (icon) {
      icon.style.transform = 'scale(1.15)';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
    const icon = card.querySelector('.placeholder-large');
    if (icon) {
      icon.style.transform = 'scale(1)';
    }
  });
});

// ============================================
// 17. PRICING PLAN SELECTION
// ============================================

const pricingButtons = document.querySelectorAll('.pricing-btn');

pricingButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    const plan = button.closest('.pricing-card').querySelector('.pricing-title').textContent;
    showNotification(`Selected ${plan} plan. Redirecting to checkout...`, 'success');
    
    // Simulate checkout redirect
    setTimeout(() => {
      // window.location.href = '/checkout';
      console.log(`Redirecting to checkout for ${plan} plan`);
    }, 1500);
  });
});

// ============================================
// 18. DARK MODE / THEME TOGGLE (Optional)
// ============================================

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
  // Apply dark theme if user prefers it
  // You can add dark mode CSS class if needed
}

// ============================================
// 19. PERFORMANCE OPTIMIZATION - Debounce
// ============================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// 20. SCROLL POSITION MEMORY
// ============================================

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollPos', window.pageYOffset);
});

window.addEventListener('load', () => {
  const scrollPos = sessionStorage.getItem('scrollPos');
  if (scrollPos) {
    window.scrollTo(0, parseInt(scrollPos));
  }
});

// ============================================
// 21. FEATURE CARD STAGGER ANIMATION
// ============================================

const featureItems = document.querySelectorAll('.feature-item');

const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both`;
      entry.target.style.animationDelay = `${index * 0.1}s`;
      featureObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

featureItems.forEach(item => featureObserver.observe(item));

// ============================================
// 22. TYPING ANIMATION (Optional)
// ============================================

function typeWriter(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';
  
  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  };
  
  type();
}

// ============================================
// 23. FORM FIELD FOCUS EFFECTS
// ============================================

const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.style.borderColor = '#667eea';
    input.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.1)';
  });
  
  input.addEventListener('blur', () => {
    input.parentElement.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    input.style.boxShadow = 'none';
  });
});

// ============================================
// 24. CLICK TRACKING & ANALYTICS (Optional)
// ============================================

function trackClick(elementId, eventName) {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener('click', () => {
      console.log(`Event: ${eventName}`);
      // Send to analytics service
    });
  }
}

// ============================================
// 25. MOBILE MENU GESTURE SUPPORT
// ============================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  const diff = touchStartX - touchEndX;
  
  // Swiped left - open menu
  if (diff > threshold) {
    sidebar.classList.add('active');
  }
  
  // Swiped right - close menu
  if (diff < -threshold) {
    sidebar.classList.remove('active');
  }
}

// ============================================
// 26. SERVICE CARD CLICK HANDLER
// ============================================

const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const serviceTitle = link.closest('.service-card').querySelector('.service-title').textContent;
    showNotification(`Exploring ${serviceTitle}...`, 'info');
  });
});

// ============================================
// 27. READ MORE LINK HANDLER
// ============================================

const readMoreLinks = document.querySelectorAll('.read-more');

readMoreLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const blogTitle = link.closest('.blog-card').querySelector('.blog-title').textContent;
    showNotification(`Opening article: "${blogTitle}"`, 'info');
  });
});

// ============================================
// 28. RESPONSIVE IMAGE LOADING
// ============================================

function loadResponsiveImages() {
  const imageContainers = document.querySelectorAll('.image-frame');
  
  imageContainers.forEach(container => {
    const computedStyle = window.getComputedStyle(container);
    // Adjust image quality based on screen size
    if (window.innerWidth < 768) {
      container.style.maxWidth = '100%';
    }
  });
}

window.addEventListener('resize', debounce(loadResponsiveImages, 250));
loadResponsiveImages();

// ============================================
// 29. ACCESSIBILITY IMPROVEMENTS
// ============================================

// Keyboard navigation for buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
    }
  });
});

// ============================================
// 30. PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page load time: ' + pageLoadTime + 'ms');
  });
}

// ============================================
// 31. SMOOTH PAGE SCROLL TO TOP
// ============================================

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add scroll to top button functionality
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  display: none;
  z-index: 998;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', scrollToTop);
scrollTopBtn.addEventListener('mouseenter', () => {
  scrollTopBtn.style.transform = 'scale(1.1)';
});
scrollTopBtn.addEventListener('mouseleave', () => {
  scrollTopBtn.style.transform = 'scale(1)';
});

// ============================================
// 32. LOADING ANIMATION
// ============================================

const showLoadingAnimation = () => {
  const loader = document.createElement('div');
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
  `;
  
  loader.innerHTML = `
    <div style="
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    "></div>
  `;
  
  document.body.appendChild(loader);
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  return loader;
};

// ============================================
// 33. ALERT DIALOG SYSTEM
// ============================================

function showAlert(title, message, buttons = []) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9998;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: white;
    padding: 40px;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: scaleIn 0.3s ease;
  `;
  
  dialog.innerHTML = `
    <h2 style="margin-bottom: 15px; color: #1a1a1a;">${title}</h2>
    <p style="margin-bottom: 30px; color: #555555;">${message}</p>
    <div style="display: flex; gap: 10px; justify-content: flex-end;"></div>
  `;
  
  const buttonsContainer = dialog.querySelector('div:last-child');
  
  if (buttons.length === 0) {
    buttons = [{ text: 'OK', type: 'primary', onClick: () => closeDialog() }];
  }
  
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn.text;
    button.style.cssText = `
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      ${btn.type === 'primary' 
        ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;' 
        : 'background: #f0f0f0; color: #1a1a1a;'}
      transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', btn.onClick);
    button.addEventListener('mouseenter', () => button.style.transform = 'translateY(-2px)');
    button.addEventListener('mouseleave', () => button.style.transform = 'translateY(0)');
    
    buttonsContainer.appendChild(button);
  });
  
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  
  const closeDialog = () => {
    overlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => overlay.remove(), 300);
  };
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDialog();
  });
  
  return closeDialog;
}

// ============================================
// 34. FILTER & SEARCH FUNCTIONALITY
// ============================================

function initializeFilters() {
  // Blog filter example
  const blogCards = document.querySelectorAll('.blog-card');
  const blogTags = new Set();
  
  blogCards.forEach(card => {
    const tag = card.querySelector('.blog-tag');
    if (tag) blogTags.add(tag.textContent);
  });
  
  console.log('Available blog tags:', Array.from(blogTags));
  
  // You can add filter UI based on tags
}

initializeFilters();

// ============================================
// 35. EXPORT PAGE DATA (Optional)
// ============================================

function exportPageData() {
  const data = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    title: document.title,
    sections: []
  };
  
  document.querySelectorAll('section').forEach(section => {
    data.sections.push({
      id: section.id,
      title: section.querySelector('h2')?.textContent || 'Untitled'
    });
  });
  
  return JSON.stringify(data, null, 2);
}

// ============================================
// 36. INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('UPISTEPS Website Loaded Successfully! 🚀');
  
  // Initialize all components
  initReviewCarousel();
  initializeFilters();
  loadResponsiveImages();
  
  // Add page analytics tracking
  console.log('Page exports data:', exportPageData());
});

// ============================================
// 37. WINDOW RESIZE HANDLER
// ============================================

window.addEventListener('resize', debounce(() => {
  console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
  loadResponsiveImages();
}, 250));

// ============================================
// 38. KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to open menu
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    sidebar.classList.toggle('active');
  }
  
  // Escape to close menu
  if (e.key === 'Escape') {
    sidebar.classList.remove('active');
  }
});

// ============================================
// 39. SERVICE CARD ANIMATION ON SCROLL
// ============================================

const serviceCardsAnimated = document.querySelectorAll('.service-card');

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both`;
      entry.target.style.animationDelay = `${index * 0.15}s`;
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

serviceCardsAnimated.forEach(card => serviceObserver.observe(card));

// ============================================
// 40. FINAL INITIALIZATION & LOGGING
// ============================================

console.log(`
╔═══════════════════════════════════════╗
║   UPISTEPS - Premium Website Ready   ║
║   Version: 1.0.0                     ║
║   Features: 40+ Interactive Elements ║
╚═══════════════════════════════════════╝
`);

// Register service worker for PWA (optional)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(err => {
    console.log('Service Worker registration failed:', err);
  });
}

// Export functions for external use
window.UPISTEPS = {
  showNotification,
  showAlert,
  scrollToTop,
  exportPageData,
  typeWriter
};
