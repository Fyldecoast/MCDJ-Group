/* ============================================
   MCDJ GROUP - SCRIPT.JS
   Vanilla JavaScript for interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" 
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(function(otherItem) {
          otherItem.classList.remove('active');
          const otherQuestion = otherItem.querySelector('.faq-question');
          if (otherQuestion) {
            otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ============================================
  // REVEAL ON SCROLL (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after revealing
          // observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(function(element) {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    revealElements.forEach(function(element) {
      element.classList.add('visible');
    });
  }

  // ============================================
  // CONTACT FORM HANDLING
  // Note: This is a placeholder for form submission.
  // To enable actual form handling:
  // 1. Use Formspree: Add action="https://formspree.io/f/YOUR_FORM_ID"
  // 2. Use Netlify: Add netlify attribute to form tag
  // 3. Connect to your own backend API endpoint
  // ============================================
  const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch("https://formspree.io/f/mreykewo", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you! Your enquiry has been sent to MCDJ Group. We will be in touch soon.');
        contactForm.reset();
      } else {
        alert('Oops! There was a problem with the server. Please try again.');
      }
    } catch (error) {
      alert('There was a connection error. Please check your internet and try again.');
    } finally {
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
document.addEventListener('DOMContentLoaded', function() {
   // ... all your code goes here ...
   window.addEventListener('scroll', highlightNavOnScroll);
   // ... etc ...
});
  window.addEventListener('scroll', highlightNavOnScroll);

  // ============================================
  // PROPERTY CARD HOVER EFFECT
  // (Additional visual feedback)
  // ============================================
  const propertyCards = document.querySelectorAll('.property-card');

  propertyCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });
  
  

  

});
