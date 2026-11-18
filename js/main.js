// Initialize Lucide Icons
lucide.createIcons();

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Navigation Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('nav-scrolled');
    } else {
        header.classList.remove('nav-scrolled');
    }
});

// Mobile Menu Logic
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isActive = mobileMenu.classList.contains('active');
        
        // Toggle icon manually
        menuToggle.setAttribute('aria-expanded', String(isActive));
        menuToggle.setAttribute('aria-label', isActive ? 'Close menu' : 'Open menu');
        menuToggle.innerHTML = isActive 
            ? '<i data-lucide="x"></i>' 
            : '<i data-lucide="menu"></i>';
        lucide.createIcons();
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
}

// GSAP Premium Animations
// Reveal animations for sections
gsap.utils.toArray('.reveal').forEach((elem) => {
    gsap.to(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2
    });
});

// Hero Section Entrance
window.addEventListener('load', () => {
    gsap.to('.hero-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "expo.out",
        delay: 0.5
    });
});

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min((scrollTop / docHeight) * 100, 100);
        scrollProgress.style.width = progress + '%';
    });
}

// Smooth Anchor Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Set Current Year
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Contact Form Simulation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = "Sending...";
        btn.disabled = true;

        setTimeout(() => {
            alert("Thank you for reaching out to iMpande. We will respond to your enquiry shortly.");
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1800);
    });
}

// Active nav link (desktop + mobile), based on current page
(function () {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const alias = { 'workshops.html': 'support.html' };
    const current = alias[file] || file;
    document.querySelectorAll('header nav a:not(.btn-premium), #mobile-menu a:not(.btn-premium)').forEach(a => {
        const href = (a.getAttribute('href') || '').split('#')[0].split('?')[0].toLowerCase();
        const active = href === current;
        a.classList.toggle('text-green-900', active);
        if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
})();

// Enquiry links: mailto does nothing on many browsers/computers, so offer Gmail, email app or copy.
(function () {
    const links = document.querySelectorAll('a[href^="mailto:"]');
    if (!links.length) return;
    const style = document.createElement('style');
    style.textContent = '#enq-modal{position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;background:rgba(10,30,20,.55);padding:1.5rem}#enq-modal.open{display:flex}#enq-modal .box{background:#fff;border-radius:2rem;max-width:26rem;width:100%;padding:2.5rem;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.3)}#enq-modal h3{font-family:"Crimson Pro",serif;font-size:1.9rem;color:#052e16;margin-bottom:.5rem}#enq-modal p{color:#78716c;font-size:.9rem;margin-bottom:1.5rem}#enq-modal a,#enq-modal button.act{display:block;width:100%;padding:.9rem 1rem;border-radius:999px;font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;font-weight:600;margin-top:.7rem;cursor:pointer;border:1px solid #14532d;color:#14532d;background:#fff;transition:all .2s}#enq-modal a.primary{background:#14532d;color:#fff}#enq-modal a:hover,#enq-modal button.act:hover{background:#052e16;color:#fff}#enq-modal .close{margin-top:1.2rem;background:none;border:0;color:#a8a29e;font-size:.8rem;cursor:pointer}';
    document.head.appendChild(style);
    const modal = document.createElement('div');
    modal.id = 'enq-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = '<div class="box"><h3>Send us an email</h3><p id="enq-addr"></p><a id="enq-gmail" class="primary" target="_blank" rel="noopener">Open in Gmail</a><a id="enq-app">Open in email app</a><button type="button" class="act" id="enq-copy">Copy email address</button><button type="button" class="close" id="enq-close">Close</button></div>';
    document.body.appendChild(modal);
    const close = () => modal.classList.remove('open');
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.getElementById('enq-close').addEventListener('click', close);
    links.forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const url = new URL(a.getAttribute('href'));
            const to = decodeURIComponent(url.pathname);
            const su = url.searchParams.get('subject') || '';
            document.getElementById('enq-addr').textContent = to + (su ? ' · ' + su : '');
            document.getElementById('enq-gmail').href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + encodeURIComponent(su);
            document.getElementById('enq-app').href = a.getAttribute('href');
            const copy = document.getElementById('enq-copy');
            copy.textContent = 'Copy email address';
            copy.onclick = () => { (navigator.clipboard ? navigator.clipboard.writeText(to) : Promise.reject()).then(() => copy.textContent = 'Copied ✓').catch(() => copy.textContent = to); };
            modal.classList.add('open');
        });
    });
})();
