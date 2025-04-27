// Product Data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "images/product1.jpg"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "images/product2.jpg"
    },
    {
        id: 3,
        title: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "images/product3.jpg"
    },
    {
        id: 4,
        title: "Coffee Maker",
        price: 49.99,
        category: "home",
        image: "images/product4.jpg"
    },
    {
        id: 5,
        title: "Running Shoes",
        price: 79.99,
        category: "clothing",
        image: "images/product5.jpg"
    },
    {
        id: 6,
        title: "Bluetooth Speaker",
        price: 59.99,
        category: "electronics",
        image: "images/product6.jpg"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cartCount = document.querySelector('.cart-count');
const productsGrid = document.querySelector('.products-grid');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Load products based on current page
    if (window.location.pathname.includes('products.html')) {
        loadAllProducts();
        setupFilters();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProducts();
    }

    // Update cart count
    updateCartCount();
});

// Load all products for products page
function loadAllProducts() {
    renderProducts(products);
}

// Load featured products for home page
function loadFeaturedProducts() {
    const featured = products.slice(0, 4); // First 4 as featured
    renderProducts(featured);
}

// Render products to the grid
function renderProducts(productsToRender) {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    
    // Show feedback
    e.target.textContent = 'Added!';
    setTimeout(() => {
        e.target.textContent = 'Add to Cart';
    }, 1000);
}

// Update cart count display
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Setup filter and sort functionality
function setupFilters() {
    categoryFilter.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);
}

// Filter and sort products
function filterProducts() {
    const category = categoryFilter.value;
    const sortOption = sortBy.value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    if (sortOption === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    renderProducts(filteredProducts);
}

// Mobile menu toggle (add to existing DOMContentLoaded event)
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // ... rest of your existing code ...
});