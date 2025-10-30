// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Create mobile menu toggle button if it doesn't exist
if (!mobileMenuToggle) {
    const nav = document.querySelector('nav');
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(toggleBtn);
}

// Toggle menu function
function toggleMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const links = document.querySelector('.nav-links');
    
    toggle.classList.toggle('active');
    links.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (links.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Add click event to toggle button
document.addEventListener('click', function(e) {
    if (e.target.closest('.mobile-menu-toggle')) {
        toggleMenu();
    }
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const links = document.querySelector('.nav-links');
        
        if (links.classList.contains('active')) {
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const links = document.querySelector('.nav-links');
    
    if (links.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu-toggle')) {
        toggle.classList.remove('active');
        links.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// FIXED: Keep header dark when scrolling - removed the problematic scroll effect
// The CSS already handles the header styling, so we don't need JavaScript to change it
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    // Only add a subtle shadow effect on scroll, keep the dark background from CSS
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
    } else {
        header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
    }
});

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});