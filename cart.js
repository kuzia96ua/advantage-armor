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
                    ${item.deviceModel ? `<p>Модель: ${item.deviceModel}</p>` : ''}
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
    const deviceModel = document.querySelector('#deviceForm input').value;

    if (!deviceModel) {
        alert('Будь ласка, спочатку введіть модель вашого пристрою');
        document.querySelector('#deviceForm input').focus();
        return;
    }

    const existingItemIndex = cart.findIndex(item => item.name === name && item.deviceModel === deviceModel);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ name, price, quantity, deviceModel });
    }

    updateCartDisplay();
    quantityInput.value = 1;

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
    
    document.querySelector('#cartOrderForm input').focus();
}

document.getElementById('cartOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Додайте товари в кошик перед оформленням замовлення');
        return;
    }

    const formData = new FormData(e.target);
    const orderData = {
        customerName: formData.get('ПІБ'),
        phone: formData.get('Номер телефону'),
        deviceModel: formData.get('Модель пристрою'),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    console.log('Замовлення:', orderData);
    
    cart = [];
    updateCartDisplay();
    e.target.reset();
    toggleCart();
    
    alert('Дякуємо за замовлення! Ми зв\'яжемося з вами найближчим часом.');
});

document.getElementById('deviceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const deviceModel = e.target.querySelector('input').value;
    alert(`Модель пристрою "${deviceModel}" збережено!`);
});

document.addEventListener('click', (e) => {
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
        cartModal.style.display = 'none';
    }
});

updateCartDisplay();