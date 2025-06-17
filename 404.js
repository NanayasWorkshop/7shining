// 404 Page JavaScript

// Fun facts about gold and 7Shining
const funFacts = [
    "Gold wird seit über 4000 Jahren als Wertaufbewahrungsmittel verwendet!",
    "Ein Würfel aus reinem Gold mit einer Kantenlänge von 37cm wiegt etwa 1 Tonne.",
    "Gold ist so dehnbar, dass aus einer Unze ein 80 Kilometer langer Draht gezogen werden kann.",
    "Die größte Goldmine der Welt liegt in Südafrika und ist über 4 Kilometer tief.",
    "7Shining wurde gegründet, um Menschen beim Aufbau ihrer finanziellen Zukunft zu helfen.",
    "Gold rostet nicht, läuft nicht an und verliert nie seinen Glanz - genau wie wahre Freundschaften.",
    "Die Schweiz, wo 7Shining seinen Sitz hat, ist bekannt für ihre Präzision und Qualität.",
    "Ein Gramm Gold kann zu einem Blatt von einem Quadratmeter ausgehämmert werden!",
    "Gold leitet Elektrizität besser als Kupfer - deshalb wird es in Elektronik verwendet.",
    "7Shining's Quartalslieferungen sorgen dafür, dass Sie kontinuierlich Ihr Gold-Portfolio aufbauen."
];

let currentFactIndex = 0;

// Go back function
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// New fun fact function
function newFunFact() {
    const funFactText = document.getElementById('funFactText');
    const button = document.querySelector('.fun-fact-btn');
    
    if (funFactText && button) {
        // Add loading state
        button.textContent = '...';
        button.disabled = true;
        
        // Fade out current fact
        funFactText.style.opacity = '0';
        
        setTimeout(() => {
            // Get next fact
            currentFactIndex = (currentFactIndex + 1) % funFacts.length;
            funFactText.textContent = funFacts[currentFactIndex];
            
            // Fade in new fact
            funFactText.style.opacity = '1';
            
            // Reset button
            button.textContent = 'Neuer Fakt';
            button.disabled = false;
        }, 300);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial fun fact
    const funFactText = document.getElementById('funFactText');
    if (funFactText) {
        funFactText.style.transition = 'opacity 0.3s ease';
        // Start with a random fact
        currentFactIndex = Math.floor(Math.random() * funFacts.length);
        funFactText.textContent = funFacts[currentFactIndex];
    }
    
    // Add entrance animations
    animateElements();
    
    // Track 404 error (for analytics purposes)
    trackError();
    
    // Auto-cycle fun facts every 10 seconds
    setInterval(() => {
        if (document.visibilityState === 'visible') {
            newFunFact();
        }
    }, 10000);
});

function animateElements() {
    // Animate suggestions with stagger effect
    const suggestions = document.querySelectorAll('.suggestion-item');
    suggestions.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

function trackError() {
    // Log 404 error for debugging
    console.log('404 Error:', {
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
    
    // In a real application, you might send this to an analytics service
    // Example: sendToAnalytics('404_error', { url: window.location.href });
}