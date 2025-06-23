// Mitglied werden Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
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

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.membership-card, .benefit-item, .value-circle'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to membership cards
    const membershipCards = document.querySelectorAll('.membership-card');
    
    membershipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle pulse effect to icon
            const icon = this.querySelector('.membership-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.membership-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Track button clicks for analytics
    const membershipButtons = document.querySelectorAll('.membership-button, .final-cta-buttons .cta-button');
    
    membershipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const membershipType = this.textContent.includes('Aktiv') ? 'active' : 'standard';
            
            // Console log for tracking (in a real app, this would go to analytics)
            console.log('Membership registration clicked:', {
                type: membershipType,
                buttonText: this.textContent.trim(),
                timestamp: new Date().toISOString()
            });
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Smooth scrolling for internal links
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

    // Add dynamic text effect to the hero quote
    const heroQuote = document.querySelector('.cta-highlight');
    if (heroQuote) {
        // Add typewriter effect on load
        const originalText = heroQuote.textContent;
        heroQuote.textContent = '';
        heroQuote.style.borderRight = '2px solid #D4AF37';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroQuote.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroQuote.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to benefit icons
    const benefitIcons = document.querySelectorAll('.benefit-icon, .value-icon');
    
    benefitIcons.forEach((icon, index) => {
        // Stagger the animation start
        setTimeout(() => {
            icon.style.animation = `float 3s ease-in-out infinite`;
            icon.style.animationDelay = `${index * 0.2}s`;
        }, index * 100);
    });

    // Add pulse effect to the community circle
    const communityCircle = document.querySelector('.community-circle');
    if (communityCircle) {
        // Add click interaction
        communityCircle.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite, pulse-ring 2s ease-out infinite';
            }, 10);
        });
    }

    // Progressive enhancement for the growth diagram
    const growthSteps = document.querySelectorAll('.growth-step');
    
    // Trigger the animation when the element is in view
    const growthObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    growthSteps.forEach(step => {
        growthObserver.observe(step);
    });

    // Add parallax effect to hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.membership-hero');
        
        if (hero && scrolled < window.innerHeight) {
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    });

    // Enhanced hover effects for value circles
    const valueCircles = document.querySelectorAll('.value-circle');
    
    valueCircles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: 100px;
                height: 100px;
                left: 50%;
                top: 50%;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add CSS for ripple animation if not already defined
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
