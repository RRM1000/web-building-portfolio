// example5.js
// Separating JavaScript from HTML for modularity and maintainability

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initTiltEffect();
  initMobileNav();
  initAmbientParallax();
});

/**
 * Initializes IntersectionObserver to animate elements as they enter the viewport.
 * This is much more performant than listening to the 'scroll' event.
 */
function initScrollReveal() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  
  // Skip animation for users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    animatedElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Adds a 3D tilt effect to specified cards/images using mouse movement.
 * Effect is disabled on touch devices via CSS hover constraints (implicitly).
 */
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.tilt-element');
  
  // Detect if device supports hover (typically non-touch)
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      // Calculate mouse position relative to the element center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation based on mouse position
      const multiplier = 20; // Maximum rotation in degrees
      const xRotation = (-y / rect.height) * multiplier;
      const yRotation = (x / rect.width) * multiplier;
      
      // Apply the transformation smoothly via inline styles
      element.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    element.addEventListener('mouseleave', () => {
      // Reset smoothly when mouse leaves
      element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      element.style.transition = 'transform 0.5s ease';
    });
    
    element.addEventListener('mouseenter', () => {
      // Remove transition for immediate tracking while hovered
      element.style.transition = 'none';
    });
  });
}

/**
 * Simple toggle for the mobile navigation menu.
 * Uses ARIA attributes for accessibility.
 */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileToggle || !navLinks) return;
  
  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    
    // Quick inline logic to show/hide the menu (in a real app, use class toggles)
    if (!isExpanded) {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'var(--bg-primary)';
      navLinks.style.padding = '2rem';
      navLinks.style.borderBottom = '1px solid var(--glass-border)';
    } else {
      navLinks.style.display = 'none';
    }
  });

  // Reset styles on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = '';
      navLinks.style.position = '';
      navLinks.style.padding = '';
      navLinks.style.background = '';
      mobileToggle.setAttribute('aria-expanded', 'false');
    } else {
      navLinks.style.display = 'none';
    }
  });
}

/**
 * Subtle parallax effect for ambient background orbs.
 * Listens to window scroll and applies slight movement opposite to scroll direction.
 */
function initAmbientParallax() {
  const orbs = document.querySelectorAll('.ambient-orb');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion || orbs.length === 0) return;

  // Use requestAnimationFrame for smooth scrolling performance
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
          // Different speed for each orb
          const speedFactor = (index + 1) * 0.15;
          const yPos = -(scrolled * speedFactor);
          // Only transform Y coordinate for performance
          orb.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  });
}
