const backToTopBtn = document.getElementById('backToTopBtn');
const nav = document.getElementById('mainNav');
const hero = document.getElementById('hero');

window.addEventListener('scroll', function () {
  // Troca a cor do nav ao rolar
  const heroHeight = hero.offsetHeight;
  if (window.scrollY > heroHeight - nav.offsetHeight) {
    nav.classList.remove('bg-transparent');
    nav.classList.add('bg-light', 'shadow');
  } else {
    nav.classList.add('bg-transparent');
    nav.classList.remove('bg-light', 'shadow');
  }
  
  // Botão de voltar ao topo
  if (window.scrollY > heroHeight - nav.offsetHeight) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.pointerEvents = 'auto';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
  }
});

backToTopBtn.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
