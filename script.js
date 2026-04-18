// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on overlay
menuOverlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#22c55e';
            contactForm.reset();
        }, 2000);
    });
}
