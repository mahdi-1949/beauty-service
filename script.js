const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}

if (header) {
  window.addEventListener('scroll', () => header.classList.toggle('fixed', window.scrollY > 124));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const toast = document.querySelector('.toast');
document.querySelectorAll('#consultationForm, #contactForm').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    if (toast) {
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 4500);
    }
  });
});
