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
    button.addEventListener("click", (e) => {
        e.stopPropagation();
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
    button.addEventListener("click", (e) => {
        e.stopPropagation();
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
   CHECKOUT - SHOW QR ONLY
========================= */

function checkout() {
    // Check if logged in first
    const savedLogin = localStorage.getItem("wizardmc_login");
    
    if (!savedLogin) {
        showToast("Please log in to continue");
        const loginModal = document.getElementById("loginModal");
        if (loginModal) loginModal.classList.add("active");
        return;
    }
    
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
    
    // DO NOT clear cart here! Cart clears only after "I HAVE PAID"
}

/* =========================
   SEND ORDER TO DISCORD
========================= */

function sendOrderToDiscord(orderDetails) {
    const webhookUrl = "https://discord.com/api/webhooks/1509789348948611144/vIEdhlkiUhBwJ73qh0kAQJ6CFiXUMQ8tBbCX1EHFvpin9_SfalFZoEumJZMPsY0w8P6k";
    
    const embed = {
        embeds: [{
            title: "🛒 New Order",
            color: 0x9b5cff,
            fields: [
                {
                    name: "👤 Minecraft Username",
                    value: orderDetails.ign,
                    inline: true
                },
                {
                    name: "📌 Discord",
                    value: orderDetails.discord || "Not provided",
                    inline: true
                },
                {
                    name: "🎮 Version",
                    value: orderDetails.version === "java" ? "Java Edition" : "Bedrock/PE",
                    inline: true
                },
                {
                    name: "🛍️ Products",
                    value: orderDetails.items,
                    inline: false
                },
                {
                    name: "💰 Total",
                    value: `₹${orderDetails.total}`,
                    inline: true
                }
            ],
            timestamp: new Date().toISOString()
        }]
    };
    
    fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed)
    }).catch(error => console.error("Webhook error:", error));
}

/* =========================
   PAYMENT BUTTONS
========================= */

function confirmPayment() {
    if (paymentModal) paymentModal.classList.remove("active");
    
    // Send to Discord only after payment confirmation
    const savedLogin = localStorage.getItem("wizardmc_login");
    if (savedLogin && cart.length > 0) {
        let total = 0;
        let itemList = "";
        
        cart.forEach(item => {
            total += item.total;
            // Format: [Type] quantityx Name ₹Price
            let typeLabel = item.type.charAt(0).toUpperCase() + item.type.slice(1);
            itemList += `[${typeLabel}] ${item.quantity}x ${item.name} ₹${item.total}\n`;
        });
        
        const loginData = JSON.parse(savedLogin);
        sendOrderToDiscord({
            ign: loginData.ign,
            discord: loginData.discord,
            version: loginData.version,
            items: itemList,
            total: total
        });
    }
    
    // Clear cart after confirming payment
    cart = [];
    saveCart();
    updateCartUI();
    
    // Show "Order placed!" toast HERE
    showToast("Order placed!");
}

function closePaymentCancel() {
    if (paymentModal) paymentModal.classList.remove("active");
    showToast("Cart saved! Complete payment to order.");
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

/* =========================
   LOGIN/LOGOUT FUNCTIONS
========================= */

function showLogin() {
    const savedLogin = localStorage.getItem("wizardmc_login");
    
    if (savedLogin) {
        const logoutModal = document.getElementById("logoutModal");
        if (logoutModal) logoutModal.classList.add("active");
    } else {
        const loginModal = document.getElementById("loginModal");
        if (loginModal) loginModal.classList.add("active");
    }
}

// Check if logged in on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedLogin = localStorage.getItem("wizardmc_login");
    if (savedLogin) {
        const loginData = JSON.parse(savedLogin);
        const loginBtn = document.getElementById("loginBtn");
        if (loginBtn) {
            loginBtn.textContent = loginData.ign;
            loginBtn.classList.add("logged-in");
        }
    }
});

/* =========================
   CUSTOM DROPDOWN (LOGIN)
========================= */

function getVersion() {
    const selected = document.querySelector(".custom-select-option.selected");
    return selected ? selected.dataset.value : "java";
}

const customSelect = document.getElementById("versionSelect");
if (customSelect) {
    const trigger = customSelect.querySelector(".custom-select-trigger");
    const options = customSelect.querySelectorAll(".custom-select-option");
    
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        customSelect.classList.toggle("active");
    });
    
    options.forEach(option => {
        option.addEventListener("click", () => {
            trigger.textContent = option.textContent;
            options.forEach(o => o.classList.remove("selected"));
            option.classList.add("selected");
            customSelect.classList.remove("active");
        });
    });
    
    document.addEventListener("click", () => {
        customSelect.classList.remove("active");
    });
}

/* =========================
   SIGN IN HANDLER
========================= */

const signinBtn = document.getElementById("signinBtn");
if (signinBtn) {
    signinBtn.addEventListener("click", () => {
        const ignInput = document.getElementById("ignInput");
        const discordInput = document.getElementById("discordInput");
        
        if (!ignInput || !ignInput.value.trim()) {
            showToast("Enter your MC username!");
            return;
        }
        
        const loginData = {
            ign: ignInput.value.trim(),
            version: getVersion(),
            discord: discordInput ? discordInput.value.trim() : ""
        };
        
        localStorage.setItem("wizardmc_login", JSON.stringify(loginData));
        
        const loginBtn = document.getElementById("loginBtn");
        if (loginBtn) {
            loginBtn.textContent = loginData.ign;
            loginBtn.classList.add("logged-in");
        }
        
        const loginModal = document.getElementById("loginModal");
        if (loginModal) loginModal.classList.remove("active");
        
        showToast(`Welcome, ${loginData.ign}!`);
        
        // Auto checkout after login if cart has items
        setTimeout(() => {
            if (cart.length > 0) {
                checkout();
            }
        }, 250);
    });
}

/* =========================
   LOGOUT HANDLER
========================= */

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("wizardmc_login");
        const loginBtn = document.getElementById("loginBtn");
        if (loginBtn) {
            loginBtn.textContent = "LOGIN";
            loginBtn.classList.remove("logged-in");
        }
        const logoutModal = document.getElementById("logoutModal");
        if (logoutModal) logoutModal.classList.remove("active");
    });
}

const logoutCancelBtn = document.getElementById("logoutCancelBtn");
if (logoutCancelBtn) {
    logoutCancelBtn.addEventListener("click", () => {
        const logoutModal = document.getElementById("logoutModal");
        if (logoutModal) logoutModal.classList.remove("active");
    });
}

const logoutModal = document.getElementById("logoutModal");
if (logoutModal) {
    logoutModal.addEventListener("click", (e) => {
        if (e.target === logoutModal) logoutModal.classList.remove("active");
    });
}

const loginModal = document.getElementById("loginModal");
if (loginModal) {
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) loginModal.classList.remove("active");
    });
}

/* =========================
   ESCAPE KEY HANDLER
========================= */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const sidebar = document.getElementById("cartSidebar");
        const paymentModal = document.getElementById("paymentModal");
        const loginModal = document.getElementById("loginModal");
        const logoutModal = document.getElementById("logoutModal");
        
        if (sidebar && sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
        }
        if (paymentModal && paymentModal.classList.contains("active")) {
            paymentModal.classList.remove("active");
        }
        if (loginModal && loginModal.classList.contains("active")) {
            loginModal.classList.remove("active");
        }
        if (logoutModal && logoutModal.classList.contains("active")) {
            logoutModal.classList.remove("active");
        }
    }
});