/* =========================
   CART STORAGE
========================= */

const CART_STORAGE_KEY = "wizardmc_cart";
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

/* =========================
   CART BUTTONS
========================= */

const addButtons = document.querySelectorAll(".add-button");
const quantityControls = document.querySelectorAll(".quantity-controls");
const plusButtons = document.querySelectorAll(".plus-btn");
const minusButtons = document.querySelectorAll(".minus-btn");
const quantityTexts = document.querySelectorAll(".quantity-text");

/* =========================
   SAVE CART
========================= */

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/* =========================
   TOGGLE SIDEBAR
========================= */

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("active");
}

/* =========================
   UPDATE CART UI
========================= */

function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length <= 0) {
        cartItems.innerHTML = `<div class="empty-cart">Your cart is empty</div>`;
    }

    cart.forEach((item, index) => {
        total += item.total;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-top">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.total}</div>
                </div>
                <div class="cart-item-bottom">
                    <div class="cart-item-type">${item.type}</div>
                    <div class="cart-quantity">
                        ${item.type === "rank" 
                            ? `<button onclick="removeRank(${index})">-</button>`
                            : `<button onclick="decreaseCartQuantity(${index})">-</button>
                               <span>${item.quantity}</span>
                               <button onclick="increaseCartQuantity(${index})">+</button>`
                        }
                    </div>
                </div>
            </div>`;
    });

    cartTotal.innerText = `₹${total}`;
    saveCart();
    syncPageControls();
}

/* =========================
   INCREASE CART
========================= */

function increaseCartQuantity(index) {
    if (cart[index].type === "rank") return;
    cart[index].quantity++;
    cart[index].total = cart[index].quantity * cart[index].price;
    updateCartUI();
}

/* =========================
   DECREASE CART
========================= */

function decreaseCartQuantity(index) {
    if (cart[index].type === "rank") {
        cart.splice(index, 1);
        updateCartUI();
        return;
    }
    cart[index].quantity--;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].total = cart[index].quantity * cart[index].price;
    }
    updateCartUI();
}

/* =========================
   REMOVE RANK
========================= */

function removeRank(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/* =========================
   SYNC PAGE CONTROLS
========================= */

function syncPageControls() {
    products.forEach((item, index) => {
        const itemId = item.name.toLowerCase().replace(/\s+/g, "-");
        const cartItem = cart.find(c => c.id === itemId);
        
        if (itemType === "rank") {
            if (cartItem) {
                addButtons[index].innerText = "ADDED";
                addButtons[index].classList.add("added");
                addButtons[index].disabled = true;
            } else {
                addButtons[index].innerText = "ADD";
                addButtons[index].classList.remove("added");
                addButtons[index].disabled = false;
            }
        } else {
            if (cartItem) {
                addButtons[index].style.display = "none";
                quantityControls[index].classList.add("active");
                quantityTexts[index].textContent = cartItem.quantity;
            } else {
                addButtons[index].style.display = "block";
                quantityControls[index].classList.remove("active");
            }
        }
    });
}

/* =========================
   ADD BUTTON CLICK
========================= */

addButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const item = products[index];
        
        if (itemType === "rank") {
            cart.push({
                id: item.name.toLowerCase().replace(/\s+/g, "-"),
                name: item.name,
                type: itemType,
                price: item.price,
                quantity: 1,
                total: item.price
            });
            button.innerText = "ADDED";
            button.classList.add("added");
            button.disabled = true;
        } else {
            button.style.display = "none";
            quantityControls[index].classList.add("active");
            quantityTexts[index].textContent = 1;
            cart.push({
                id: item.name.toLowerCase().replace(/\s+/g, "-"),
                name: item.name,
                type: itemType,
                price: item.price,
                quantity: 1,
                total: item.price
            });
        }
        updateCartUI();
    });
});

/* =========================
   PLUS BUTTON
========================= */

plusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let quantity = Number(quantityTexts[index].textContent);
        quantity++;
        quantityTexts[index].textContent = quantity;
        
        const item = products[index];
        const cartItem = cart.find(c => c.id === item.name.toLowerCase().replace(/\s+/g, "-"));
        if (cartItem) {
            cartItem.quantity = quantity;
            cartItem.total = quantity * cartItem.price;
        }
        updateCartUI();
    });
});

/* =========================
   MINUS BUTTON
========================= */

minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let quantity = Number(quantityTexts[index].textContent);
        quantity--;
        
        const item = products[index];
        const cartItem = cart.find(c => c.id === item.name.toLowerCase().replace(/\s+/g, "-"));
        
        if (quantity <= 0) {
            quantityControls[index].classList.remove("active");
            addButtons[index].style.display = "block";
            if (cartItem) {
                const cartIndex = cart.indexOf(cartItem);
                cart.splice(cartIndex, 1);
            }
        } else {
            quantityTexts[index].textContent = quantity;
            if (cartItem) {
                cartItem.quantity = quantity;
                cartItem.total = quantity * cartItem.price;
            }
        }
        updateCartUI();
    });
});

updateCartUI();

/* =========================
   LIVE PAGE SYNC
========================= */

window.addEventListener("storage", () => {
    cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    updateCartUI();
});

/* =========================
   MODAL ELEMENTS
========================= */

const paymentModal = document.getElementById("paymentModal");
const closeModal = document.getElementById("closeModal");
const upiQrImage = document.getElementById("upiQrImage");
const upiAmount = document.getElementById("upiAmount");
const upiIdText = document.getElementById("upiIdText");

/* =========================
   CHECKOUT - DIRECT TO QR
========================= */

function checkout() {
    if (cart.length <= 0) {
        showToast("Your cart is empty!");
        return;
    }
    
    let total = 0;
    cart.forEach(item => total += item.total);
    
    if (paymentModal) {
        paymentModal.classList.add("active");
        upiAmount.textContent = `₹${total}`;
        upiIdText.textContent = upiId;
        
        let itemNames = "";
        cart.forEach(item => itemNames += `${item.quantity}x ${item.name}, `);
        itemNames = itemNames.slice(0, -2);
        
        const upiLink = `upi://pay?pa=${upiId}&pn=WizardMC&am=${total}&cu=INR&tn=${encodeURIComponent(itemNames)}`;
        upiQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;
    }
}

/* =========================
   CLOSE MODALS
========================= */

if (closeModal) {
    closeModal.addEventListener("click", () => {
        if (paymentModal) paymentModal.classList.remove("active");
    });
}

if (paymentModal) {
    paymentModal.addEventListener("click", (e) => {
        if (e.target === paymentModal) paymentModal.classList.remove("active");
    });
}

/* =========================
   CART CLOSE EVENTS
========================= */

// Close cart on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const sidebar = document.getElementById("cartSidebar");
        
        if (sidebar && sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
        }
        if (paymentModal && paymentModal.classList.contains("active")) {
            paymentModal.classList.remove("active");
        }
    }
});

// Close cart sidebar on outside click
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("cartSidebar");
    const cartToggle = document.querySelector(".cart-toggle");
    
    if (sidebar && sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !cartToggle.contains(e.target)) {
            sidebar.classList.remove("active");
        }
    }
});

/* =========================
   TOAST
========================= */

function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    }
}