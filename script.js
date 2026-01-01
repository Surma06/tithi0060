// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const categoryCards = document.querySelectorAll('.category-card');
const ctaButtons = document.querySelectorAll('.cta-button');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Add hover effect to category cards
categoryCards.forEach(card => {
    // Set random background images for category cards (replace with actual images in production)
    const categoryImages = [
        ''
    ];
    
    const randomIndex = Math.floor(Math.random() * categoryImages.length);
    const categoryImage = card.querySelector('.category-img');
    categoryImage.style.backgroundImage = `url(${categoryImages[randomIndex]})`;
    
    // Add click event to category cards
    card.addEventListener('click', () => {
        // In a real application, this would navigate to the category page
        console.log(`Navigating to ${card.querySelector('h3').textContent} category`);
    });
});

// Add smooth scroll to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.category-card, .product-grid > *');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.category-card, .product-grid > *');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 300);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Add to cart functionality (simplified for demo)
const cartCount = document.querySelector('.cart-count');
let itemCount = 0;

// Simulate adding items to cart
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.closest('.product-details')) {
            e.preventDefault();
            itemCount++;
            cartCount.textContent = itemCount;
            
            // Add animation
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
            
            // Show added to cart message
            const addedToCart = document.createElement('div');
            addedToCart.className = 'added-to-cart';
            addedToCart.textContent = 'Added to cart!';
            document.body.appendChild(addedToCart);
            
            // Position the message
            const buttonRect = e.target.getBoundingClientRect();
            addedToCart.style.top = `${buttonRect.top - 40}px`;
            addedToCart.style.left = `${buttonRect.left}px`;
            
            // Remove message after animation
            setTimeout(() => {
                addedToCart.style.opacity = '0';
                addedToCart.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    document.body.removeChild(addedToCart);
                }, 300);
            }, 1500);
        }
    });
});

// Add search functionality (simplified for demo)
const searchIcon = document.querySelector('.search-icon');
const searchOverlay = document.createElement('div');
searchOverlay.className = 'search-overlay';
searchOverlay.innerHTML = `
    <div class="search-container">
        <input type="text" placeholder="Search for gadgets...">
        <button class="search-close">×</button>
    </div>
`;
document.body.appendChild(searchOverlay);

searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchOverlay.classList.add('active');
    searchOverlay.querySelector('input').focus();
});

searchOverlay.querySelector('.search-close').addEventListener('click', () => {
    searchOverlay.classList.remove('active');
});

// Close search when clicking outside
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
    }
});

// Add styles for search overlay
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .search-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .search-container {
            width: 90%;
            max-width: 600px;
            position: relative;
        }
        
        .search-container input {
            width: 100%;
            padding: 20px 60px 20px 20px;
            font-size: 1.2rem;
            border: none;
            border-radius: 50px;
            outline: none;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .search-close {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #333;
            font-size: 2rem;
            cursor: pointer;
            line-height: 1;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .search-close:hover {
            background-color: #f0f0f0;
        }
        
        .added-to-cart {
            position: fixed;
            background-color: var(--accent-color);
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    </style>
`);
