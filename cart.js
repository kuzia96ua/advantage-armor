let cart = [];

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <p>${item.name}</p>
                    <p>Кількість: ${item.quantity}</p>
                </div>
                <div>
                    <p>${itemTotal} грн</p>
                    <button onclick="removeFromCart(${index})">Видалити</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total;
    updateCartCount();
}

function addToCart(name, price, button) {
    const quantityInput = button.parentElement.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);

    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    updateCartDisplay();
    quantityInput.value = 1;

    // Show confirmation
    const confirmation = document.createElement('div');
    confirmation.textContent = 'Додано до кошика!';
    confirmation.style.position = 'fixed';
    confirmation.style.top = '20px';
    confirmation.style.right = '20px';
    confirmation.style.background = '#4CAF50';
    confirmation.style.color = 'white';
    confirmation.style.padding = '1rem';
    confirmation.style.borderRadius = '4px';
    confirmation.style.zIndex = '1000';

    document.body.appendChild(confirmation);
    setTimeout(() => confirmation.remove(), 2000);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function incrementQuantity(button) {
    const input = button.parentElement.querySelector('.quantity-input');
    input.value = parseInt(input.value) + 1;
}

function decrementQuantity(button) {
    const input = button.parentElement.querySelector('.quantity-input');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Кошик порожній');
        return;
    }

    const orderForm = document.querySelector('.order-form form');
    orderForm.scrollIntoView({ behavior: 'smooth' });
    toggleCart();
}

// Close cart modal when clicking outside
document.addEventListener('click', (e) => {
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
        cartModal.style.display = 'none';
    }
});

// Initialize cart display
updateCartDisplay();