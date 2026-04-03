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
