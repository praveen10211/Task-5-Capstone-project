// E-commerce Website JavaScript
class ECommerceApp {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.currentPage = this.getCurrentPage();
        
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.routeToPage();
    }

    // Get current page from URL
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('products.html')) return 'products';
        if (path.includes('product.html')) return 'product';
        if (path.includes('cart.html')) return 'cart';
        return 'home';
    }

    // Load products from JSON file
    async loadProducts() {
        try {
            const response = await fetch('data/products.json');
            this.products = await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback products data
            this.products = this.getFallbackProducts();
        }
    }

    // Fallback products data
    getFallbackProducts() {
        return [
            {
                id: 1,
                name: "iPhone 15 Pro",
                category: "smartphones",
                price: 999,
                image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600",
                    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "The most advanced iPhone ever with cutting-edge technology and premium design.",
                rating: 4.8,
                reviews: 324,
                inStock: true,
                featured: true,
                specifications: {
                    "Display": "6.1-inch Super Retina XDR",
                    "Processor": "A17 Pro chip",
                    "Storage": "128GB",
                    "Camera": "48MP Main + 12MP Ultra Wide",
                    "Battery": "Up to 23 hours video playback"
                }
            },
            {
                id: 2,
                name: "MacBook Pro 14\"",
                category: "laptops",
                price: 1999,
                image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
                    "https://images.pexels.com/photos/17663/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "Supercharged by M3 Pro chip for incredible performance and all-day battery life.",
                rating: 4.9,
                reviews: 189,
                inStock: true,
                featured: true,
                specifications: {
                    "Display": "14.2-inch Liquid Retina XDR",
                    "Processor": "Apple M3 Pro chip",
                    "Memory": "18GB unified memory",
                    "Storage": "512GB SSD",
                    "Battery": "Up to 18 hours"
                }
            },
            {
                id: 3,
                name: "AirPods Pro",
                category: "headphones",
                price: 249,
                image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
                    "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "Active Noise Cancellation and Spatial Audio for an immersive listening experience.",
                rating: 4.7,
                reviews: 892,
                inStock: true,
                featured: true,
                specifications: {
                    "Driver": "Custom high-excursion Apple driver",
                    "Noise Cancellation": "Active Noise Cancellation",
                    "Battery": "Up to 6 hours listening time",
                    "Connectivity": "Bluetooth 5.3",
                    "Features": "Spatial Audio, Adaptive Transparency"
                }
            },
            {
                id: 4,
                name: "Samsung Galaxy S24 Ultra",
                category: "smartphones",
                price: 1199,
                image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "Ultimate flagship smartphone with AI-powered features and professional photography.",
                rating: 4.6,
                reviews: 567,
                inStock: true,
                featured: false,
                specifications: {
                    "Display": "6.8-inch Dynamic AMOLED 2X",
                    "Processor": "Snapdragon 8 Gen 3",
                    "Storage": "256GB",
                    "Camera": "200MP Main + Ultra Wide + Telephoto",
                    "Battery": "5000mAh"
                }
            },
            {
                id: 5,
                name: "Dell XPS 13",
                category: "laptops",
                price: 1299,
                image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "Premium ultrabook with stunning display and exceptional build quality.",
                rating: 4.5,
                reviews: 234,
                inStock: true,
                featured: false,
                specifications: {
                    "Display": "13.4-inch InfinityEdge",
                    "Processor": "Intel Core i7-13th Gen",
                    "Memory": "16GB LPDDR5",
                    "Storage": "512GB SSD",
                    "Weight": "2.64 lbs"
                }
            },
            {
                id: 6,
                name: "Sony WH-1000XM5",
                category: "headphones",
                price: 399,
                image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "Industry-leading noise canceling headphones with exceptional sound quality.",
                rating: 4.8,
                reviews: 1205,
                inStock: true,
                featured: false,
                specifications: {
                    "Driver": "30mm dynamic drivers",
                    "Noise Cancellation": "V1 + V2 processor",
                    "Battery": "Up to 30 hours",
                    "Connectivity": "Bluetooth 5.2, NFC",
                    "Weight": "250g"
                }
            },
            {
                id: 7,
                name: "iPad Pro 12.9\"",
                category: "accessories",
                price: 1099,
                image: "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "The ultimate iPad experience with M2 chip and stunning Liquid Retina XDR display.",
                rating: 4.7,
                reviews: 445,
                inStock: true,
                featured: true,
                specifications: {
                    "Display": "12.9-inch Liquid Retina XDR",
                    "Processor": "Apple M2 chip",
                    "Storage": "128GB",
                    "Camera": "12MP Wide + 10MP Ultra Wide",
                    "Connectivity": "Wi-Fi 6E, 5G available"
                }
            },
            {
                id: 8,
                name: "Apple Watch Series 9",
                category: "accessories",
                price: 399,
                image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=600",
                images: [
                    "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=600"
                ],
                description: "Advanced health monitoring and fitness tracking with the brightest Apple Watch display.",
                rating: 4.6,
                reviews: 678,
                inStock: true,
                featured: false,
                specifications: {
                    "Display": "45mm Retina LTPO OLED",
                    "Processor": "S9 SiP",
                    "Battery": "Up to 18 hours",
                    "Health": "ECG, Blood Oxygen, Heart Rate",
                    "Connectivity": "GPS, Cellular available"
                }
            }
        ];
    }

    // Setup event listeners
    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        }

        // Filter and sort functionality
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortSelect = document.getElementById('sort-select');

        if (categoryFilter) categoryFilter.addEventListener('change', this.handleFilter.bind(this));
        if (priceFilter) priceFilter.addEventListener('change', this.handleFilter.bind(this));
        if (sortSelect) sortSelect.addEventListener('change', this.handleFilter.bind(this));

        // Quantity controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-btn')) {
                this.handleQuantityChange(e);
            }
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', this.handleCheckout.bind(this));
        }
    }

    // Route to appropriate page handler
    routeToPage() {
        switch (this.currentPage) {
            case 'products':
                this.initProductsPage();
                break;
            case 'product':
                this.initProductPage();
                break;
            case 'cart':
                this.initCartPage();
                break;
            default:
                this.initHomePage();
        }
    }

    // Initialize home page
    initHomePage() {
        this.renderFeaturedProducts();
    }

    // Initialize products page
    initProductsPage() {
        this.renderAllProducts();
        this.handleUrlParams();
    }

    // Initialize product page
    initProductPage() {
        this.renderProductDetails();
    }

    // Initialize cart page
    initCartPage() {
        this.renderCart();
    }

    // Handle URL parameters for filtering
    handleUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter) {
                categoryFilter.value = category;
                this.handleFilter();
            }
        }
    }

    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    // Render featured products on home page
    renderFeaturedProducts() {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const featuredProducts = this.products.filter(product => product.featured).slice(0, 4);
        container.innerHTML = featuredProducts.map(product => this.createProductCard(product)).join('');
    }

    // Render all products on products page
    renderAllProducts() {
        const container = document.getElementById('products-grid');
        const loadingState = document.getElementById('loading-state');
        const emptyState = document.getElementById('empty-state');
        
        if (!container) return;

        // Show loading state
        if (loadingState) loadingState.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';

        // Simulate loading delay
        setTimeout(() => {
            container.innerHTML = this.products.map(product => this.createProductCard(product)).join('');
            if (loadingState) loadingState.style.display = 'none';
            
            // Show empty state if no products
            if (this.products.length === 0 && emptyState) {
                emptyState.style.display = 'block';
            }
        }, 500);
    }

    // Create product card HTML
    createProductCard(product) {
        const stars = this.generateStars(product.rating);
        const badge = product.featured ? '<div class="product-badge">Featured</div>' : '';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    ${badge}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="rating-stars">${stars}</div>
                        <span class="rating-text">(${product.reviews})</span>
                    </div>
                    <div class="product-footer">
                        <div class="product-price">$${product.price}</div>
                        <div class="product-actions">
                            <a href="product.html?id=${product.id}" class="btn btn-primary">View</a>
                            <button class="btn btn-outline btn-icon" onclick="app.addToCart(${product.id})" aria-label="Add to cart">
                                🛒
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate star rating HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<span class="star">★</span>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<span class="star">☆</span>';
            } else {
                stars += '<span class="star empty">☆</span>';
            }
        }

        return stars;
    }

    // Handle search functionality
    handleSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        this.renderFilteredProducts(filteredProducts);
    }

    // Handle filter and sort functionality
    handleFilter() {
        const categoryFilter = document.getElementById('category-filter')?.value || '';
        const priceFilter = document.getElementById('price-filter')?.value || '';
        const sortOption = document.getElementById('sort-select')?.value || 'name';
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';

        let filteredProducts = [...this.products];

        // Apply search filter
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
        }

        // Apply price filter
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(p => p.replace('+', ''));
            filteredProducts = filteredProducts.filter(product => {
                if (max) {
                    return product.price >= parseInt(min) && product.price <= parseInt(max);
                } else {
                    return product.price >= parseInt(min);
                }
            });
        }

        // Apply sorting
        filteredProducts.sort((a, b) => {
            switch (sortOption) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        this.renderFilteredProducts(filteredProducts);
    }

    // Render filtered products
    renderFilteredProducts(products) {
        const container = document.getElementById('products-grid');
        const emptyState = document.getElementById('empty-state');
        
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
        } else {
            container.innerHTML = products.map(product => this.createProductCard(product)).join('');
            if (emptyState) emptyState.style.display = 'none';
        }
    }

    // Render product details page
    renderProductDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = this.products.find(p => p.id === productId);

        if (!product) {
            window.location.href = 'products.html';
            return;
        }

        // Update page title and breadcrumb
        document.getElementById('product-title').textContent = `${product.name} - TechStore`;
        document.getElementById('breadcrumb-product').textContent = product.name;

        const container = document.getElementById('product-details');
        if (!container) return;

        const images = product.images || [product.image];
        const thumbnails = images.map((img, index) => 
            `<div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="app.changeMainImage('${img}', this)">
                <img src="${img}" alt="${product.name}">
            </div>`
        ).join('');

        const specs = Object.entries(product.specifications || {})
            .map(([key, value]) => `<li><span>${key}:</span><span>${value}</span></li>`)
            .join('');

        container.innerHTML = `
            <div class="product-images">
                <div class="main-image">
                    <img src="${images[0]}" alt="${product.name}" id="main-product-image">
                </div>
                <div class="thumbnail-images">
                    ${thumbnails}
                </div>
            </div>
            <div class="product-content">
                <div class="product-meta">
                    <div class="product-category">${product.category}</div>
                    <h1 class="product-title">${product.name}</h1>
                    <div class="product-rating">
                        <div class="rating-stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <p class="product-description">${product.description}</p>
                </div>
                
                <div class="product-specs">
                    <h3 class="specs-title">Specifications</h3>
                    <ul class="specs-list">
                        ${specs}
                    </ul>
                </div>
                
                <div class="product-actions">
                    <div class="quantity-selector">
                        <label>Quantity:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-action="decrease">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="10" id="product-quantity">
                            <button class="quantity-btn" data-action="increase">+</button>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="app.addToCartFromProduct(${product.id})">
                        Add to Cart - $${product.price}
                    </button>
                </div>
            </div>
        `;

        // Render related products
        this.renderRelatedProducts(product);
    }

    // Change main product image
    changeMainImage(imageSrc, thumbnailElement) {
        const mainImage = document.getElementById('main-product-image');
        if (mainImage) {
            mainImage.src = imageSrc;
        }

        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        thumbnailElement.classList.add('active');
    }

    // Render related products
    renderRelatedProducts(currentProduct) {
        const container = document.getElementById('related-products');
        if (!container) return;

        const relatedProducts = this.products
            .filter(product => product.category === currentProduct.category && product.id !== currentProduct.id)
            .slice(0, 4);

        container.innerHTML = relatedProducts.map(product => this.createProductCard(product)).join('');
    }

    // Handle quantity change
    handleQuantityChange(event) {
        const action = event.target.dataset.action;
        const input = event.target.parentElement.querySelector('.quantity-input');
        let value = parseInt(input.value);

        if (action === 'increase' && value < 10) {
            input.value = value + 1;
        } else if (action === 'decrease' && value > 1) {
            input.value = value - 1;
        }
    }

    // Add product to cart
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showAddToCartModal(product);
    }

    // Add to cart from product page
    addToCartFromProduct(productId) {
        const quantityInput = document.getElementById('product-quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        this.addToCart(productId, quantity);
    }

    // Show add to cart modal
    showAddToCartModal(product) {
        const modal = document.getElementById('add-to-cart-modal');
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    }

    // Close modal
    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
            modal.style.display = 'none';
        });
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Update cart count in navigation
    updateCartCount() {
        const cartCounts = document.querySelectorAll('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartCounts.forEach(element => {
            element.textContent = totalItems;
        });
    }

    // Render cart page
    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        const emptyCart = document.getElementById('empty-cart');

        if (this.cart.length === 0) {
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            return;
        }

        if (cartItemsContainer) cartItemsContainer.style.display = 'flex';
        if (cartSummary) cartSummary.style.display = 'block';
        if (emptyCart) emptyCart.style.display = 'none';

        // Render cart items
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = this.cart.map(item => this.createCartItemHTML(item)).join('');
        }

        // Update cart summary
        this.updateCartSummary();
    }

    // Create cart item HTML
    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-category">${item.category}</div>
                </div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="app.removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }

    // Update cart item quantity
    updateCartQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.saveCart();
            this.updateCartCount();
            this.renderCart();
        }
    }

    // Remove item from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    // Update cart summary
    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;

        const subtotalElement = document.getElementById('cart-subtotal');
        const shippingElement = document.getElementById('cart-shipping');
        const taxElement = document.getElementById('cart-tax');
        const totalElement = document.getElementById('cart-total');

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free';
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Handle checkout
    handleCheckout() {
        if (this.cart.length === 0) return;

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = total > 100 ? 0 : 10;
        const tax = total * 0.08;
        const finalTotal = total + shipping + tax;

        // Show checkout modal
        const modal = document.getElementById('checkout-modal');
        const orderTotal = document.getElementById('order-total');
        
        if (orderTotal) orderTotal.textContent = `$${finalTotal.toFixed(2)}`;
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    }

    // Complete checkout
    completeCheckout() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.closeModal();
        window.location.href = 'index.html';
    }
}

// Global functions for event handlers
window.closeModal = function() {
    app.closeModal();
};

window.completeCheckout = function() {
    app.completeCheckout();
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ECommerceApp();
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh cart count when page becomes visible
        if (window.app) {
            window.app.updateCartCount();
        }
    }
});

// Service Worker registration for performance
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}