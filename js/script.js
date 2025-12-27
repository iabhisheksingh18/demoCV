// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Typing Animation for Hero Section
// ===================================
const typedTextElement = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

const textArray = [
    'Computer Engineering Student',
    'Software Developer',
    'Problem Solver',
    'Cloud Enthusiast',
    'AI/ML Explorer'
];

let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let deletingDelay = 50;
let newTextDelay = 2000;

function type() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = deletingDelay;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typingDelay = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ===================================
// Scroll Reveal Animation
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
function addRevealClass() {
    const elementsToReveal = document.querySelectorAll(`
        .about-content,
        .stat-item,
        .timeline-item,
        .skill-category,
        .project-card,
        .certification-card,
        .contact-card
    `);
    
    elementsToReveal.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize reveal animations
addRevealClass();
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// Skill Progress Bars Animation
// ===================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Initial check

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Animated Counter for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
function startCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-stats');
    
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100 && !statsSection.classList.contains('counted')) {
        statsSection.classList.add('counted');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace('+', ''));
            stat.textContent = '0+';
            animateCounter(stat, number);
        });
    }
}

window.addEventListener('scroll', startCounterAnimation);
startCounterAnimation(); // Initial check

// ===================================
// Project Card Tilt Effect (Optional Enhancement)
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease-out';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.3s ease-out';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Certification Card Hover Effect
// ===================================
const certCards = document.querySelectorAll('.certification-card');

certCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.cert-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.6s ease-out';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.cert-icon i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ===================================
// Interest Tags Interaction
// ===================================
const interestTags = document.querySelectorAll('.interest-tag');

interestTags.forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.animation = 'pulse 0.5s ease-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Contact Card Click to Copy
// ===================================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    const link = card.querySelector('.contact-link');
    if (link && (link.href.startsWith('tel:') || link.href.startsWith('mailto:'))) {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the actual link
            if (e.target.tagName !== 'A') {
                link.click();
            }
        });
    }
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Console Message (Easter Egg)
// ===================================
console.log('%c👨‍💻 Abhishek Singh', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c🎓 Computer Engineering Student', 'color: #8b5cf6; font-size: 16px;');
console.log('%c📧 imabhisheksingh29@gmail.com', 'color: #ec4899; font-size: 14px;');
console.log('%c💼 Looking for collaboration opportunities!', 'color: #10b981; font-size: 14px;');

// ===================================
// Prevent Right Click on Images (Optional)
// ===================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/

// ===================================
// Performance Monitoring
// ===================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

// ===================================
// Accessibility Enhancements
// ===================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Focus management for mobile menu
menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        const firstLink = navMenu.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    }
});

// ===================================
// Theme Preference Detection (Future Enhancement)
// ===================================
// Check if user prefers dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Future: Add dark mode support
    console.log('🌙 Dark mode preference detected');
}

// ===================================
// Smooth Scroll Polyfill for Older Browsers
// ===================================
if (!('scrollBehavior' in document.documentElement.style)) {
    // Load smooth scroll polyfill if needed
    console.log('📜 Smooth scroll not natively supported');
}

// ===================================
// Print Stylesheet Detection
// ===================================
window.addEventListener('beforeprint', () => {
    console.log('🖨️ Preparing page for printing...');
});

// ===================================
// Online/Offline Status Detection
// ===================================
window.addEventListener('online', () => {
    console.log('✅ Back online');
});

window.addEventListener('offline', () => {
    console.log('❌ Connection lost');
});

// ===================================
// Initialize All Functions
// ===================================
function init() {
    highlightNavigation();
    revealOnScroll();
    animateSkillBars();
    startCounterAnimation();
    console.log('✨ Portfolio initialized successfully!');
}

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}