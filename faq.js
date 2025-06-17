// FAQ Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const tabButtons = document.querySelectorAll('.tab-button');
    const searchInput = document.getElementById('faq-search');
    const noResults = document.getElementById('no-results');

    // FAQ Accordion toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Category filtering
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter FAQ items
            filterFAQs(category);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchFAQs(searchTerm);
        });
    }

    function filterFAQs(category) {
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
                item.classList.remove('active'); // Close if hidden
            }
        });

        // Show/hide no results message
        toggleNoResults(visibleCount === 0);
    }

    function searchFAQs(searchTerm) {
        let visibleCount = 0;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (searchTerm === '' || question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.classList.remove('hidden');
                visibleCount++;
                
                // Highlight search term if searching
                if (searchTerm !== '') {
                    highlightSearchTerm(item, searchTerm);
                } else {
                    removeHighlight(item);
                }
            } else {
                item.classList.add('hidden');
                item.classList.remove('active'); // Close if hidden
            }
        });

        // Reset category filter when searching
        if (searchTerm !== '') {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.tab-button[data-category="all"]').classList.add('active');
        }

        // Show/hide no results message
        toggleNoResults(visibleCount === 0 && searchTerm !== '');
    }

    function highlightSearchTerm(item, searchTerm) {
        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer');
        
        // Simple highlight - in a real app you'd want more sophisticated highlighting
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        // Store original text if not already stored
        if (!question.dataset.originalText) {
            question.dataset.originalText = question.textContent;
        }
        if (!answer.dataset.originalText) {
            answer.dataset.originalText = answer.innerHTML;
        }
        
        // Apply highlighting
        question.innerHTML = question.dataset.originalText.replace(regex, '<mark style="background: #007aff; color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>');
        answer.innerHTML = answer.dataset.originalText.replace(regex, '<mark style="background: #007aff; color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>');
    }

    function removeHighlight(item) {
        const question = item.querySelector('.faq-question h3');
        const answer = item.querySelector('.faq-answer');
        
        if (question.dataset.originalText) {
            question.innerHTML = question.dataset.originalText;
        }
        if (answer.dataset.originalText) {
            answer.innerHTML = answer.dataset.originalText;
        }
    }

    function toggleNoResults(show) {
        if (noResults) {
            noResults.style.display = show ? 'block' : 'none';
        }
    }

    // Smooth scrolling for anchor links within FAQ
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

    // Auto-expand FAQ if coming from direct link with hash
    function handleHashLink() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement && targetElement.classList.contains('faq-item')) {
                setTimeout(() => {
                    targetElement.classList.add('active');
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        }
    }

    // Handle hash links on page load and hash change
    handleHashLink();
    window.addEventListener('hashchange', handleHashLink);

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all open FAQs
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Clear search
            if (searchInput) {
                searchInput.value = '';
                searchFAQs('');
            }
        }
    });

    // Add focus management for accessibility
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        // Make FAQ questions keyboard accessible
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Update aria-expanded when FAQ is toggled
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = item.classList.contains('active');
                    question.setAttribute('aria-expanded', isActive.toString());
                }
            });
        });
        
        observer.observe(item, { attributes: true });
    });
});