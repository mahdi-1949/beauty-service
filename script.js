['/beauty-service/minimal.css', '/beauty-service/footer.css'].forEach((href) => {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  }
});

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

const currentFooter = document.querySelector('footer');
if (currentFooter) {
  currentFooter.outerHTML = `
    <footer class="site-footer">
      <div class="footer-intro">
        <div class="footer-brand">
          <span class="monogram">A</span>
          <div><strong>ARISA</strong><small>MEDICAL AESTHETICS</small></div>
          <p>Thoughtful, personalized care for results that still feel like you.</p>
        </div>
        <a class="footer-action" href="/beauty-service/contact/">Book a private consultation →</a>
      </div>
      <div class="footer-map">
        <div class="footer-column">
          <b>Explore</b>
          <a href="/beauty-service/">Home</a>
          <a href="/beauty-service/treatments/">Treatments</a>
          <a href="/beauty-service/about/">About</a>
          <a href="/beauty-service/provider/">Provider</a>
          <a href="/beauty-service/contact/">Contact</a>
        </div>
        <div class="footer-column">
          <b>Treatments</b>
          <a href="/beauty-service/treatments/skin/">Skin Rejuvenation</a>
          <a href="/beauty-service/treatments/injectables/">Injectables</a>
          <a href="/beauty-service/treatments/laser-body/">Laser &amp; Body</a>
          <a href="/beauty-service/treatments/hair-restoration/">Hair Restoration</a>
        </div>
        <div class="footer-column">
          <b>Contact</b>
          <a href="tel:+13105550148">+1 310 555 0148</a>
          <a href="mailto:hello@arisaaesthetics.com">hello@arisaaesthetics.com</a>
          <p>California, United States</p>
          <p>Monday–Saturday · By appointment</p>
        </div>
      </div>
      <div class="footer-legal"><span>© 2026 Arisa Aesthetics</span><span>Privacy · Terms</span><span>California, USA</span></div>
    </footer>`;
}

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
