// News Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons and articles
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');
    const featuredArticle = document.querySelector('.featured-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const newsletterForm = document.getElementById('newsletter-form');
    
    let currentCategory = 'all';
    let articlesPerPage = 6;
    let currentlyShown = articlesPerPage;

    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter articles
            filterArticles(category);
            currentCategory = category;
            
            // Reset pagination
            currentlyShown = articlesPerPage;
            updateLoadMoreButton();
        });
    });

    function filterArticles(category) {
        let visibleCount = 0;
        
        // Handle featured article
        if (featuredArticle) {
            const featuredCategory = featuredArticle.getAttribute('data-category');
            if (category === 'all' || featuredCategory === category) {
                featuredArticle.style.display = 'block';
            } else {
                featuredArticle.style.display = 'none';
            }
        }
        
        // Handle regular articles
        articles.forEach((article, index) => {
            const articleCategory = article.getAttribute('data-category');
            
            if (category === 'all' || articleCategory === category) {
                if (visibleCount < currentlyShown) {
                    article.classList.remove('hidden');
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
                visibleCount++;
            } else {
                article.classList.add('hidden');
                article.style.display = 'none';
            }
        });

        updateLoadMoreButton();
    }

    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        const totalFilteredArticles = Array.from(articles).filter(article => {
            const articleCategory = article.getAttribute('data-category');
            return currentCategory === 'all' || articleCategory === currentCategory;
        }).length;
        
        if (currentlyShown >= totalFilteredArticles) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentlyShown += articlesPerPage;
            filterArticles(currentCategory);
            
            // Add loading state
            const originalText = loadMoreBtn.textContent;
            loadMoreBtn.textContent = 'Wird geladen...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                loadMoreBtn.textContent = originalText;
                loadMoreBtn.disabled = false;
            }, 500);
        });
    }

    // Newsletter form handling
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value;
            const submitButton = this.querySelector('.cta-button');
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Simulate form submission
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Wird verarbeitet...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Vielen Dank! Sie haben sich erfolgreich für unseren Newsletter angemeldet.');
                emailInput.value = '';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Smooth scrolling for read more links (if they were internal)
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            // Since we don't have actual article pages, we'll just show a placeholder
            e.preventDefault();
            
            // Add a subtle animation to indicate the click
            this.style.transform = 'translateX(5px)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 200);
            
            // In a real application, this would navigate to the full article
            console.log('Navigate to full article:', this.closest('.article-card, .featured-card'));
        });
    });

    // Add reading progress for long articles (placeholder functionality)
    function addReadingProgress() {
        const articles = document.querySelectorAll('.article-card, .featured-card');
        
        articles.forEach(article => {
            article.addEventListener('mouseenter', function() {
                // Simulate reading progress
                const readingTime = Math.floor(Math.random() * 5) + 2; // 2-6 minutes
                const readingIndicator = document.createElement('div');
                readingIndicator.className = 'reading-time';
                readingIndicator.innerHTML = `📖 ${readingTime} Min. Lesezeit`;
                readingIndicator.style.cssText = `
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(0, 122, 255, 0.9);
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    z-index: 10;
                `;
                
                // Make sure the article is positioned relatively
                this.style.position = 'relative';
                
                // Remove existing reading time if present
                const existing = this.querySelector('.reading-time');
                if (existing) existing.remove();
                
                this.appendChild(readingIndicator);
            });
            
            article.addEventListener('mouseleave', function() {
                const readingTime = this.querySelector('.reading-time');
                if (readingTime) {
                    readingTime.remove();
                }
            });
        });
    }

    // Initialize reading progress
    addReadingProgress();

    // Add share functionality (placeholder)
    function addShareButtons() {
        const articles = document.querySelectorAll('.article-card, .featured-card');
        
        articles.forEach(article => {
            const title = article.querySelector('h2, h3').textContent;
            
            // Add share button on double click
            article.addEventListener('dblclick', function() {
                if (navigator.share) {
                    navigator.share({
                        title: '7Shining News: ' + title,
                        text: 'Interessanter Artikel von 7Shining',
                        url: window.location.href
                    });
                } else {
                    // Fallback - copy to clipboard
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        // Show temporary notification
                        const notification = document.createElement('div');
                        notification.textContent = 'Link kopiert!';
                        notification.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: #007aff;
                            color: white;
                            padding: 1rem 2rem;
                            border-radius: 8px;
                            z-index: 1000;
                            font-weight: 600;
                        `;
                        
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                            notification.remove();
                        }, 2000);
                    });
                }
            });
        });
    }

    // Initialize share functionality
    addShareButtons();

    // Initialize with all articles shown
    filterArticles('all');
    
    // Add smooth entrance animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe articles for animation
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(article);
    });
});