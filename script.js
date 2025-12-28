// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initTypeformEmbed();
    initScrollAnimations();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Typeform Embed
function initTypeformEmbed() {
    // Replace 'YOUR_TYPEFORM_ID' with your actual Typeform ID
    // You can find this in your Typeform embed URL
    // Example: https://form.typeform.com/to/YOUR_TYPEFORM_ID
    const typeformId = 'YOUR_TYPEFORM_ID';
    
    // You can also use a full URL if preferred
    const typeformUrl = ''; // Example: 'https://form.typeform.com/to/your-form-id'
    
    const embedContainer = document.getElementById('typeform-embed');
    
    if (!embedContainer) return;
    
    // Check if typeformId or typeformUrl is provided
    if (typeformId && typeformId !== 'YOUR_TYPEFORM_ID') {
        // Create iframe with Typeform embed
        const iframe = document.createElement('iframe');
        iframe.src = `https://form.typeform.com/to/${01KDJRWJ1FM42RWNR2C0G3321K}`
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'microphone; camera';
        iframe.style.minHeight = '600px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        
        // Remove loading text and add iframe
        embedContainer.innerHTML = '';
        embedContainer.appendChild(iframe);
    } else if (typeformUrl) {
        // Use full URL if provided
        const iframe = document.createElement('iframe');
        iframe.src = typeformUrl;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'microphone; camera';
        iframe.style.minHeight = '600px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        
        embedContainer.innerHTML = '';
        embedContainer.appendChild(iframe);
    } else {
        // Show instructions if no Typeform ID is set
        embedContainer.innerHTML = `
            <div style="padding: 3rem; text-align: center; color: #cccccc;">
                <p style="margin-bottom: 1rem;">To embed your Typeform:</p>
                <p style="margin-bottom: 1rem; font-size: 0.875rem;">1. Get your Typeform embed URL (e.g., https://form.typeform.com/to/YOUR_FORM_ID)</p>
                <p style="margin-bottom: 1rem; font-size: 0.875rem;">2. Open script.js</p>
                <p style="margin-bottom: 1rem; font-size: 0.875rem;">3. Replace 'YOUR_TYPEFORM_ID' with your actual Typeform ID, or set the typeformUrl variable</p>
            </div>
        `;
    }
}

// Scroll animations
function initScrollAnimations() {
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .clients-headline, .section-title, .results-headline, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}


// Optional: Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', initScrollProgress);

