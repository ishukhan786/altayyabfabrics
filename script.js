document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Reveal Animations on Scroll
    revealOnScroll();
  });

  // Mobile Menu Toggle
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    hamburger.classList.toggle('active');
    
    // Animate Hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Initial Animation Trigger
  setTimeout(() => {
    const animates = document.querySelectorAll('.animate-fade-up');
    animates.forEach(el => el.classList.add('active'));
  }, 100);

  // Reveal Function
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .cat-card, .why-card, .testi-card');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (revealTop < windowHeight - revealPoint) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.8s ease';
      }
    });
  }

  // Pre-style reveal elements
  const reveals = document.querySelectorAll('.reveal, .why-card, .testi-card');
  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
  });

  // Initial check for visible elements
  revealOnScroll();

  // Smooth Scroll for local anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        navLinks.classList.remove('mobile-active');
        hamburger.classList.remove('active');
      }
    });
  });

  // FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Reviews Slider Logic
  const slider = document.getElementById('reviewsSlider');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;

  if (slider && dots.length > 0) {
    function goToSlide(index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      currentSlide = index;
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto-play
    setInterval(() => {
      currentSlide = (currentSlide + 1) % dots.length;
      goToSlide(currentSlide);
    }, 5000);
  }
});
