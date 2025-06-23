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

    // ===== COLLAPSIBLE IFRAME FUNCTIONALITY =====
    
    // Get DOM elements
    const toggleButton = document.getElementById('toggleRegistrationBtn');
    const activeMembershipBtn = document.getElementById('activeMembershipBtn');
    const registrationContainer = document.getElementById('registrationFormContainer');
    const registrationSection = document.getElementById('registration-form');
    
    // State management
    let isExpanded = false;
    let isAnimating = false;

    // Toggle function
    function toggleRegistrationForm() {
        if (isAnimating) return;
        
        isAnimating = true;
        toggleButton.classList.add('loading');
        
        if (!isExpanded) {
            // Expand the form
            expandForm();
        } else {
            // Collapse the form
            collapseForm();
        }
    }

    // Expand form function
    function expandForm() {
        // Update button state
        const toggleIcon = toggleButton.querySelector('.toggle-icon');
        const toggleText = toggleButton.querySelector('.toggle-text');
        
        toggleIcon.textContent = '▲';
        toggleText.textContent = 'Anmeldeformular schließen';
        toggleButton.classList.add('active');
        
        // Expand container
        registrationContainer.classList.add('expanding');
        
        setTimeout(() => {
            registrationContainer.classList.add('expanded');
            
            setTimeout(() => {
                isExpanded = true;
                isAnimating = false;
                toggleButton.classList.remove('loading');
            }, 300);
        }, 50);
    }

    // Collapse form function
    function collapseForm() {
        // Update button state
        const toggleIcon = toggleButton.querySelector('.toggle-icon');
        const toggleText = toggleButton.querySelector('.toggle-text');
        
        toggleIcon.textContent = '▼';
        toggleText.textContent = 'Anmeldeformular öffnen';
        toggleButton.classList.remove('active');
        
        // Collapse container
        registrationContainer.classList.remove('expanded');
        
        setTimeout(() => {
            registrationContainer.classList.remove('expanding');
            isExpanded = false;
            isAnimating = false;
            toggleButton.classList.remove('loading');
        }, 500);
    }

    // Smooth scroll to registration section
    function scrollToRegistration() {
        const offset = 100; // Offset for fixed header
        const elementPosition = registrationSection.offsetTop;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Event listeners
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleRegistrationForm);
    }

    if (activeMembershipBtn) {
        activeMembershipBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to registration section
            scrollToRegistration();
            
            // Wait for scroll to complete, then expand form if not already expanded
            setTimeout(() => {
                if (!isExpanded && !isAnimating) {
                    toggleRegistrationForm();
                }
            }, 800); // Delay to allow smooth scroll to complete
        });
    }

    // Auto-expand if URL has hash #registration-form
    if (window.location.hash === '#registration-form') {
        setTimeout(() => {
            scrollToRegistration();
            setTimeout(() => {
                if (!isExpanded && !isAnimating) {
                    toggleRegistrationForm();
                }
            }, 500);
        }, 100);
    }

    // Handle browser back/forward with hash
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#registration-form') {
            scrollToRegistration();
            if (!isExpanded && !isAnimating) {
                setTimeout(() => {
                    toggleRegistrationForm();
                }, 300);
            }
        }
    });

    // Add smooth entrance animation for the toggle button
    if (toggleButton) {
        const toggleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    toggleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        toggleObserver.observe(toggleButton);
    }

    // Enhanced click tracking for iframe-related actions
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            console.log('Registration form toggle clicked:', {
                action: isExpanded ? 'collapse' : 'expand',
                timestamp: new Date().toISOString(),
                scrollPosition: window.pageYOffset
            });
        });
    }

    if (activeMembershipBtn) {
        activeMembershipBtn.addEventListener('click', function() {
            console.log('Active membership clicked with auto-scroll:', {
                action: 'scroll_and_expand',
                timestamp: new Date().toISOString(),
                currentScrollPosition: window.pageYOffset
            });
        });
    }

    // Add keyboard accessibility
    if (toggleButton) {
        toggleButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleRegistrationForm();
            }
        });
    }

    // Add focus management for accessibility
    function manageFocus() {
        if (isExpanded) {
            // Focus on the first interactive element in the iframe container
            const firstFocusable = registrationContainer.querySelector('input, button, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
        }
    }

    // Enhanced toggle function with focus management
    const originalToggleFunction = toggleRegistrationForm;
    toggleRegistrationForm = function() {
        originalToggleFunction();
        setTimeout(manageFocus, 400);
    };

    // Add visual feedback when iframe is loading
    function addLoadingIndicator() {
        if (registrationContainer && !document.querySelector('.iframe-loading')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'iframe-loading';
            loadingDiv.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    color: #D4AF37;
                    font-size: 1.1rem;
                ">
                    <div style="
                        width: 20px;
                        height: 20px;
                        border: 2px solid #e0e0e0;
                        border-top: 2px solid #D4AF37;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin-right: 1rem;
                    "></div>
                    Formular wird geladen...
                </div>
            `;
            
            // Add spinner animation CSS if not exists
            if (!document.querySelector('#spinner-style')) {
                const spinnerStyle = document.createElement('style');
                spinnerStyle.id = 'spinner-style';
                spinnerStyle.textContent = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(spinnerStyle);
            }
        }
    }

    // Initialize loading indicator
    addLoadingIndicator();
});
