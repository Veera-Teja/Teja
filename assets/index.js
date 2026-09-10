/**
 * Komali Veerateja Portfolio Script
 * Provides smooth scrolling, responsive hamburger menu,
 * dynamic testimonials carousel, and direct query handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking navigation anchor items
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Active Anchor Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const handleScrollActiveLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollActiveLink);

  // Testimonial Carousel Mechanics
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlideIndex = 0;
  let carouselTimer = null;

  const renderSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlideIndex = index;
  };

  const nextSlide = () => {
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    renderSlide(nextIndex);
  };

  const prevSlide = () => {
    let prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    renderSlide(prevIndex);
  };

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
        renderSlide(targetIndex);
        resetAutoplay();
      });
    });

    // Auto-advance every 6 seconds
    const startAutoplay = () => {
      carouselTimer = setInterval(nextSlide, 6000);
    };

    const resetAutoplay = () => {
      clearInterval(carouselTimer);
      startAutoplay();
    };

    startAutoplay();
  }

  // Interactive Contact Payload Execution (Simulation)
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');

  if (contactForm && formResponse) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = document.getElementById('senderName').value;

      formResponse.className = 'form-response success';
      formResponse.textContent = `> Packet acknowledged from "${sender}". Transmission logged!`;

      contactForm.reset();

      setTimeout(() => {
        formResponse.textContent = '';
      }, 5000);
    });
  }
});