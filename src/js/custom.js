// Header scroll behavior
const header = document.querySelector('.header');
const main = document.querySelector('main');

if (header && main) {
  window.addEventListener('scroll', () => {
    const mainTop = main.getBoundingClientRect().top;

    if (mainTop + 200 <= 0) {
      header.classList.add('header--fixed');
    } else {
      header.classList.remove('header--fixed');
    }
  });
}

// Hero scroll snap behavior
const hero = document.querySelector('.hero');
if (hero && main) {
  let isScrolling = false;
  let scrollTimeout;

  window.addEventListener('wheel', (e) => {
    // Check if we're in the hero section
    const heroRect = hero.getBoundingClientRect();
    // const mainRect = main.getBoundingClientRect();

    // If hero is visible and user scrolls down
    if (heroRect.bottom > 0 && e.deltaY > 0 && !isScrolling) {
      e.preventDefault();
      isScrolling = true;
      const targetY = window.scrollY + heroRect.bottom;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      // Reset flag after animation
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }, { passive: false });

  // Handle touch scroll for mobile
  let touchStart = 0;
  window.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const heroRect = hero.getBoundingClientRect();
    const mainRect = main.getBoundingClientRect();
    const touchEnd = e.touches[0].clientY;
    const touchDelta = touchStart - touchEnd;

    // If hero is visible and user swipes up (scroll down)
    if (heroRect.bottom > 0 && mainRect.top > 100 && touchDelta > 30 && !isScrolling) {
      isScrolling = true;

      // Smooth scroll to main
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }, { passive: true });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.header__menu-toggle');
const menu = document.querySelector('.header__menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('header__menu--active');
    menuToggle.classList.toggle('header__menu-toggle--active');
  });

  // Mobile dropdown toggle
  const dropdownLink = document.querySelector('.header__menu-link--dropdown');
  const dropdown = document.querySelector('.header__dropdown');

  if (dropdownLink && dropdown) {
    dropdownLink.addEventListener('click', (e) => {
      // Only toggle on mobile (when menu toggle is visible)
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  }

  // Close menu when clicking on a menu link (except dropdown parent)
  const menuLinks = menu.querySelectorAll('.header__menu-link:not(.header__menu-link--dropdown)');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('header__menu--active');
      menuToggle.classList.remove('header__menu-toggle--active');
    });
  });

  // Close menu when clicking on dropdown links
  const dropdownLinks = menu.querySelectorAll('.header__dropdown-link');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('header__menu--active');
      menuToggle.classList.remove('header__menu-toggle--active');
      if (dropdown) {
        dropdown.classList.remove('active');
      }
    });
  });
}
