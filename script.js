document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Initialize Screenshot Carousel
    initCarousel();
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Animate on scroll
    const elementsToAnimate = document.querySelectorAll('.feature-card, .screenshot, .testimonial-card');
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Screenshot Carousel Functionality
function initCarousel() {
    const screenshotsWrapper = document.querySelector('.screenshots-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const screenshots = document.querySelectorAll('.screenshot');
    
    // Create scroll indicators
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    const carousel = document.querySelector('.carousel');
    
    screenshots.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        if (index === 0) dot.classList.add('active');
        scrollIndicator.appendChild(dot);
    });
    
    carousel.appendChild(scrollIndicator);
    
    // Scroll to next/previous screenshot
    nextBtn.addEventListener('click', () => {
        const scrollAmount = screenshotsWrapper.offsetWidth / 2;
        screenshotsWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
        const scrollAmount = screenshotsWrapper.offsetWidth / 2;
        screenshotsWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    // Update scroll indicators
    const updateScrollIndicators = () => {
        const scrollPosition = screenshotsWrapper.scrollLeft;
        const totalWidth = screenshotsWrapper.scrollWidth - screenshotsWrapper.offsetWidth;
        const progress = scrollPosition / totalWidth;
        
        const dots = scrollIndicator.querySelectorAll('.scroll-dot');
        const activeDotIndex = Math.round(progress * (dots.length - 1));
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    };
    
    screenshotsWrapper.addEventListener('scroll', updateScrollIndicators);
    
    // Touch scroll handling
    let touchStartX = 0;
    let touchEndX = 0;
    
    screenshotsWrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    screenshotsWrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                nextBtn.click();
            } else {
                // Swipe right
                prevBtn.click();
            }
        }
    }
    
    // Auto-advance the carousel
    let autoplayInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 5000);
    });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        const newVisibleCount = getVisibleScreenshotsCount();
        const newMaxIndex = screenshots.length - newVisibleCount;
        
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        
        goToSlide(currentIndex);
    });
}

// Helper function to determine how many screenshots are visible based on viewport width
function getVisibleScreenshotsCount() {
    const width = window.innerWidth;
    
    if (width < 576) {
        return 1;
    } else if (width < 768) {
        return 2;
    } else if (width < 992) {
        return 3;
    } else {
        return 4;
    }
}

// Add animation classes once CSS is loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add animation to hero elements with delay
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animated');
        }, 300);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('animated');
        }, 600);
    }
}); 