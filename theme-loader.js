// Dynamic Navigation & Footer Loader for Beyond Green & Nature
document.addEventListener('DOMContentLoaded', () => {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // Load Shared Header
  if (headerPlaceholder) {
    fetch('header.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load header');
        return response.text();
      })
      .then(html => {
        headerPlaceholder.innerHTML = html;
        initializeHeader();
      })
      .catch(error => {
        console.error('Error fetching header:', error);
      });
  }

  // Load Shared Footer
  if (footerPlaceholder) {
    fetch('footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load footer');
        return response.text();
      })
      .then(html => {
        footerPlaceholder.innerHTML = html;
        initializeFooter();
      })
      .catch(error => {
        console.error('Error fetching footer:', error);
      });
  }
});

// Initialize Header Navigation Logic
function initializeHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileDropdown = document.getElementById('mobileDropdown');

  // Scroll Header transition
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  // Trigger immediately in case page is already scrolled
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  }

  // Toggle drawer functions
  window.toggleMenu = function() {
    if (menuToggle && mobileNav) {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  };

  window.toggleMobileDropdown = function(event) {
    event.preventDefault();
    if (mobileDropdown) {
      mobileDropdown.classList.toggle('active');
    }
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Active navigation link highlighting based on pathname
  const path = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-nav .nav-link');
  
  // Clear any default active classes
  navLinks.forEach(link => link.classList.remove('active'));

  let pageName = 'home';
  if (path.includes('about.html')) {
    pageName = 'about';
  } else if (path.includes('contactus.html')) {
    pageName = 'contact';
  } else if (path.includes('service.html')) {
    pageName = 'services';
  } else if (path.includes('project.html')) {
    pageName = 'projects';
  }

  // Set active link
  if (pageName === 'about') {
    const aboutLinks = document.querySelectorAll('#nav-about, #mob-nav-about');
    aboutLinks.forEach(link => link.classList.add('active'));
  } else if (pageName === 'contact') {
    const contactLinks = document.querySelectorAll('#nav-contact, #mob-nav-contact');
    contactLinks.forEach(link => link.classList.add('active'));
  } else if (pageName === 'services') {
    const servicesLinks = document.querySelectorAll('#nav-services, #mob-nav-services');
    servicesLinks.forEach(link => link.classList.add('active'));
  } else if (pageName === 'projects') {
    const projectsLinks = document.querySelectorAll('#nav-projects, #mob-nav-projects');
    projectsLinks.forEach(link => link.classList.add('active'));
  } else {
    // We are on home page, highlight Home by default
    const homeLinks = document.querySelectorAll('#nav-home, #mob-nav-home');
    homeLinks.forEach(link => link.classList.add('active'));
  }

  // Setup homepage active scroll section highlighting
  if (pageName === 'home') {
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      let scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          const matchedLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);
          if (matchedLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            matchedLink.classList.add('active');
          }
        }
      });
    });
  }

  // Bind custom cursor trail expand hover effects
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  if (cursor && follower) {
    const hoverables = headerPlaceholder.querySelectorAll('a, button');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('hovered');
        cursor.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('hovered');
        cursor.classList.remove('hovered');
      });
    });
  }
}

// Initialize Footer logic (hover bindings)
function initializeFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (cursor && follower && footerPlaceholder) {
    const hoverables = footerPlaceholder.querySelectorAll('a, button');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('hovered');
        cursor.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('hovered');
        cursor.classList.remove('hovered');
      });
    });
  }
}
