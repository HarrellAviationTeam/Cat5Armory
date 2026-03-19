// Cat-5 Armory - Main JavaScript

// Age Verification
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already verified age
    const ageVerified = sessionStorage.getItem('ageVerified');

    if (!ageVerified) {
        showAgeVerification();
    }
});

function showAgeVerification() {
    // Prevent scrolling
    document.body.classList.add('no-scroll');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'age-verification-overlay';
    overlay.id = 'ageVerificationOverlay';

    // Create modal
    overlay.innerHTML = `
        <div class="age-verification-modal">
            <div class="age-verification-icon">🔫</div>
            <h2>Age Verification Required</h2>
            <p>You must be 21 years of age or older to enter this website.</p>
            <p>By entering, you certify that you are of legal age to purchase firearms and ammunition.</p>
            <div class="age-verification-buttons">
                <button class="age-verify-btn yes" onclick="verifyAge(true)">I AM 21 OR OLDER</button>
                <button class="age-verify-btn no" onclick="verifyAge(false)">I AM UNDER 21</button>
            </div>
            <div class="age-verification-warning">
                <p>⚠️ WARNING: You must be 21+ to purchase firearms and ammunition</p>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function verifyAge(isOfAge) {
    const overlay = document.getElementById('ageVerificationOverlay');

    if (isOfAge) {
        // Store verification in session storage
        sessionStorage.setItem('ageVerified', 'true');

        // Fade out and remove overlay
        overlay.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            overlay.remove();
            document.body.classList.remove('no-scroll');
        }, 500);
    } else {
        // Redirect to a safe page or show message
        alert('You must be 21 years or older to access this website.');
        window.location.href = 'https://www.google.com';
    }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // In a real implementation, you would send this data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will contact you soon.\n\nNote: This is a demo form. In production, this would send your message to Cat-5 Armory.');
        
        // Reset form
        contactForm.reset();
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .category-card, .news-card, .service-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

