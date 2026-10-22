// Header Toggles & Search Box Functionality
const searchIcon = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#search-box');
const cartIcon = document.querySelector('.cart-icon');
const cartItemsContainer = document.querySelector('.cart-items-container');
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

// Search Icon Click Event
searchIcon?.addEventListener("click", () => {
    searchForm.classList.toggle("active");
    cartItemsContainer.classList.remove("active");
    navbar.classList.remove("active");
    if (searchForm.classList.contains("active")) {
        searchInput?.focus();
    }
});

// Real-Time Search Filter Functionality
searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const allCards = document.querySelectorAll('.cake-card, .pastries-card, .Beverages-card, .merch-card');

    allCards.forEach(card => {
        const title = card.getAttribute('data-name')?.toLowerCase() || card.querySelector('h3')?.textContent.toLowerCase();
        if (title.includes(query)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

// Cart Icon Click Event
cartIcon?.addEventListener("click", () => {
    cartItemsContainer.classList.toggle("active");
    searchForm.classList.remove("active");
    navbar.classList.remove("active");
});

// Mobile Menu Icon Click Event
menuIcon?.addEventListener("click", () => {
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    cartItemsContainer.classList.remove("active");
});

// Close open panels on scroll
window.onscroll = () => {
    searchForm?.classList.remove("active");
    cartItemsContainer?.classList.remove("active");
    navbar?.classList.remove("active");
};

// Shopping Cart Real-Time Logic
let cart = [];

const cartList = document.querySelector('.cart-list');
const cartBadge = document.querySelector('.cart-badge');
const cartTotalPrice = document.querySelector('.cart-total-price');
const checkoutBtn = document.querySelector('.checkout-btn');

function updateCartUI() {
    cartList.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            itemCount += item.quantity;

            const cartItemHTML = `
                <div class="cart-item">
                    <span class="fas fa-times remove-item" data-index="${index}"></span>
                    <img src="${item.image}" alt="${item.title}">
                    <div class="content">
                        <h3>${item.title}</h3>
                        <div class="price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                </div>
            `;
            cartList.insertAdjacentHTML('beforeend', cartItemHTML);
        });
    }

    if (cartBadge) cartBadge.textContent = itemCount;
    if (cartTotalPrice) cartTotalPrice.textContent = `$${total.toFixed(2)}`;

    // Remove Item Click Event Listener
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCartUI();
        });
    });
}

// Add to Cart Real-Time Event Listener
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        
        let card = e.target.closest('.cake-card, .pastries-card, .Beverages-card, .merch-card');
        if (!card) return;

        let title = card.getAttribute('data-name') || card.querySelector('h3').textContent.trim();
        let price = parseFloat(card.getAttribute('data-price')) || 0;
        let image = card.querySelector('img').getAttribute('src');

        let existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ title, price, image, quantity: 1 });
        }

        updateCartUI();
        cartItemsContainer.classList.add('active');
    }
});

// Checkout Event Listener
checkoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (cart.length === 0) {
        alert('Your cart is empty! Add items before checking out.');
    } else {
        alert('Demo checkout complete. No payment was processed.');
        cart = [];
        updateCartUI();
        cartItemsContainer.classList.remove('active');
    }
});

// Contact form demonstration
const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! This demonstration form does not send data yet.');
    contactForm.reset();
});

// Sorting Filter Logic (Low-High, High-Low, A-Z, Z-A)
const filterSelects = document.querySelectorAll('.filter-select');

filterSelects.forEach(select => {
    select.addEventListener('change', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const value = e.target.value;
        const section = document.getElementById(targetId);
        const wrapper = section.querySelector('.wrapper');
        const cards = Array.from(wrapper.children);

        cards.sort((a, b) => {
            let nameA = a.getAttribute('data-name')?.toLowerCase() || a.querySelector('h3')?.textContent.toLowerCase() || '';
            let nameB = b.getAttribute('data-name')?.toLowerCase() || b.querySelector('h3')?.textContent.toLowerCase() || '';
            let priceA = parseFloat(a.getAttribute('data-price')) || 0;
            let priceB = parseFloat(b.getAttribute('data-price')) || 0;

            if (value === 'low-high') return priceA - priceB;
            if (value === 'high-low') return priceB - priceA;
            if (value === 'a-z') return nameA.localeCompare(nameB);
            if (value === 'z-a') return nameB.localeCompare(nameA);
            return 0;
        });

        cards.forEach(card => wrapper.appendChild(card));
    });
});

// Initialize Cart View
updateCartUI();
