// Menu Toggle Functionality
const toggleNavBtn = document.querySelector('.toogle-nav');
const navbar = document.querySelector('[data-navbar="navbar"]');
const navLinks = document.querySelectorAll('.nav-link');

if (toggleNavBtn && navbar) {
  toggleNavBtn.addEventListener('click', function () {
    const isExpanded = toggleNavBtn.getAttribute('aria-expanded') === 'true';
    toggleNavBtn.setAttribute('aria-expanded', !isExpanded);
    navbar.classList.toggle('show');
  });

  // Close menu when clicking on a link (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth < 992) {
        navbar.classList.remove('show');
        toggleNavBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (window.innerWidth < 992) {
      if (!navbar.contains(e.target) && !toggleNavBtn.contains(e.target)) {
        navbar.classList.remove('show');
        toggleNavBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const faqButtons = document.querySelectorAll('.faq-question');

  function closeOtherItems(currentItem) {
    faqButtons.forEach(otherBtn => {
      const otherItem = otherBtn.closest('.faq-item');
      const otherAnswer = otherItem.querySelector('.faq-answer');

      if (otherItem !== currentItem && otherItem.classList.contains('open')) {
        otherItem.classList.remove('open');
        otherBtn.setAttribute('aria-expanded', 'false');
        otherAnswer.style.maxHeight = null;
      }
    });
  }

  faqButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = !item.classList.contains('open');

      closeOtherItems(item);

      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0px';
      }
    });
  });
});

// Back to Top Button
const backToTopBtn = document.querySelector('[data-btn="back-to-top"]');

const hero = document.querySelector('.hero-section');

if (backToTopBtn) {
  window.addEventListener('scroll', function () {
    if (hero) {
      const heroHeight = hero.offsetHeight;
      if (window.scrollY > heroHeight) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  });

  backToTopBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
