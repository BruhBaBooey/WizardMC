const rankCards = document.querySelectorAll(".rank-card");

/* =========================
   YOUR UPI ID
========================= */

const upiId =
"gareebjeetpatil@fam";

/* =========================
   CURRENT SELECTED RANK
========================= */

let currentRank = null;

/* =========================
   GLOBAL CART
========================= */

const CART_STORAGE_KEY =
"wizardmc_cart";

let cart =
JSON.parse(
localStorage.getItem(CART_STORAGE_KEY)
) || [];

/* =========================
   RANK DATA
========================= */

const ranks = [
    {
        name: "Dragon",
        price: 220
    },
    {
        name: "Arcane",
        price: 50
    },
    {
        name: "Warlord",
        price: 80
    },
    {
        name: "Celestial",
        price: 120
    },
    {
        name: "Immortal",
        price: 160
    }
];

/* =========================
   CART BUTTONS
========================= */

const addButtons =
document.querySelectorAll(".add-button");

const quantityControls =
document.querySelectorAll(".quantity-controls");

const minusButtons =
document.querySelectorAll(".minus-btn");

const plusButtons =
document.querySelectorAll(".plus-btn");

const quantityTexts =
document.querySelectorAll(".quantity-text");

/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

}

/* =========================
   TOGGLE SIDEBAR
========================= */

function toggleCart() {

    document
    .getElementById("cartSidebar")
    .classList.toggle("active");

}

/* =========================
   CHECKOUT
========================= */

function checkout() {

    if (cart.length <= 0) {

        showToast("Your cart is empty!");

        return;

    }

    let total = 0;

    let message =
    "Wizard MC Order:%0A%0A";

    cart.forEach((item) => {

        total += item.total;

        message +=
        `${item.name} x${item.quantity} = ₹${item.total}%0A`;

    });

    message +=
    `%0ATotal = ₹${total}`;

    const upiLink =
    `upi://pay?pa=wizardmc@upi&pn=WizardMC&tn=Wizard MC Purchase&am=${total}&cu=INR`;

    window.location.href =
    upiLink;

}

/* =========================
   UPDATE CART UI
========================= */

function updateCartUI() {

    const cartItems =
    document.getElementById("cartItems");

    const cartTotal =
    document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    /* =========================
       EMPTY CART
    ========================= */

    if (cart.length <= 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                Your cart is empty

            </div>

        `;

    }

    cart.forEach((item, index) => {

        total += item.total;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-top">

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        ₹${item.total}
                    </div>

                </div>

                <div class="cart-item-bottom">

                    <div class="cart-item-type">
                        ${item.type}
                    </div>

                <div class="cart-quantity">

                    ${
                        item.type === "rank"
                        ?

                        `<button
                            onclick="removeRank(${index})"
                        >
                            -
                        </button>`

                        :

                        `
                        <button
                            onclick="decreaseCartQuantity(${index})"
                        >
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseCartQuantity(${index})"
                        >
                            +
                        </button>
                        `
                    }

                </div>

                </div>

            </div>

        `;

    });

    cartTotal.innerText =
    `₹${total}`;

    saveCart();

    syncPageControls();

}

/* =========================
   INCREASE
========================= */

function increaseCartQuantity(index) {

    /*
        NO MULTIPLE RANKS
    */

    if (cart[index].type === "rank") {

        return;

    }

    cart[index].quantity++;

    cart[index].total =
    cart[index].quantity *
    cart[index].price;

    updateCartUI();

}

/* =========================
   DECREASE
========================= */

function decreaseCartQuantity(index) {

    /*
        REMOVE RANK DIRECTLY
    */

    if (cart[index].type === "rank") {

        cart.splice(index, 1);

        updateCartUI();

        return;

    }

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    else {

        cart[index].total =
        cart[index].quantity *
        cart[index].price;

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

    ranks.forEach((item, index) => {

        const itemId =
        item.name
        .toLowerCase()
        .replace(/\s+/g, "-");

        const cartItem =
        findCartItem(itemId);

        /* =========================
           RANKS
        ========================= */

        if (itemType === "rank") {

            if (cartItem) {

                addButtons[index]
                .innerText = "ADDED";

                addButtons[index]
                .classList.add("added");

                addButtons[index]
                .disabled = true;

            }

            else {

                addButtons[index]
                .innerText = "ADD";

                addButtons[index]
                .classList.remove("added");

                addButtons[index]
                .disabled = false;

            }

        }

        /* =========================
           KEYS / KITS
        ========================= */

        else {

            if (cartItem) {

                addButtons[index]
                .style.display = "none";

                quantityControls[index]
                .classList.add("active");

                quantityTexts[index]
                .innerText =
                cartItem.quantity;

            }

            else {

                addButtons[index]
                .style.display = "block";

                quantityControls[index]
                .classList.remove("active");

            }

        }

    });

}

/* =========================
   ITEM TYPE
========================= */

const itemType = "rank";

/* =========================
   FIND CART ITEM
========================= */

function findCartItem(itemId) {

    return cart.find(
        item => item.id === itemId
    );

}

/* =========================
   ADD BUTTON LOGIC
========================= */

addButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const item = ranks[index];

        /* =========================
           RANKS
        ========================= */

        if (itemType === "rank") {

            cart.push({
                id:
                item.name.toLowerCase().replace(/\s+/g, "-"),

                name:
                `${item.name} Rank`,

                type:
                "rank",

                price:
                item.price,

                quantity:
                1,

                total:
                item.price
            });

            updateCartUI();

            button.innerText =
            "ADDED";

            button.classList.add("added");

            button.disabled = true;

        }

        /* =========================
           KEYS / KITS
        ========================= */

        else {

            button.style.display =
            "none";

            quantityControls[index]
            .classList.add("active");

            quantityTexts[index]
            .innerText = 1;

            cart.push({
                id:
                item.name.toLowerCase().replace(/\s+/g, "-"),

                name:
                item.name,

                type:
                itemType,

                price:
                item.price,

                quantity:
                1,

                total:
                item.price
            });

        }

        console.log(cart);

        updateCartUI();

    });

});

/* =========================
   PLUS BUTTON
========================= */

plusButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        let quantity =
        Number(quantityTexts[index].innerText);

        quantity++;

        quantityTexts[index].innerText =
        quantity;

        const cartItem =
        cart[index];

        cartItem.quantity =
        quantity;

        cartItem.total =
        quantity * cartItem.price;

        updateCartUI();

        console.log(cart);

        updateCartUI();

    });

});

/* =========================
   MINUS BUTTON
========================= */

minusButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        let quantity =
        Number(quantityTexts[index].innerText);

        quantity--;

        /* =========================
           REMOVE ITEM
        ========================= */

        if (quantity <= 0) {

            quantityControls[index]
            .classList.remove("active");

            addButtons[index]
            .style.display = "block";

            cart.splice(index, 1);

            updateCartUI();

        }

        else {

            quantityTexts[index]
            .innerText = quantity;

            const cartItem =
            cart[index];

            cartItem.quantity =
            quantity;

            cartItem.total =
            quantity * cartItem.price;

            updateCartUI();

        }

        console.log(cart);

        updateCartUI();

    });

});

/* =========================
   INITIAL LOAD
========================= */

updateCartUI();

/* =========================
   LIVE PAGE SYNC
========================= */

window.addEventListener(
    "storage",
    () => {

        cart =
        JSON.parse(
            localStorage.getItem(
                CART_STORAGE_KEY
            )
        ) || [];

        updateCartUI();

    }
);

/* =========================
   PAYMENT MODAL ELEMENTS
========================= */

const paymentModal =
document.getElementById("paymentModal");

const closeModal =
document.getElementById("closeModal");

const upiQrImage =
document.getElementById("upiQrImage");

const upiAmount =
document.getElementById("upiAmount");

const upiIdText =
document.getElementById("upiIdText");

/* =========================
   CHECKOUT FUNCTION
========================= */

function checkout() {

    /*
        EMPTY CART
    */

    if (cart.length <= 0) {

        showToast("Your cart is empty");

        return;

    }

    /*
        CALCULATE TOTAL
    */

    let total = 0;

    cart.forEach((item) => {

        total += item.total;

    });

    /*
        OPEN PAYMENT MODAL
    */

    paymentModal.classList.add("active");

    /*
        SET TOTAL
    */

    upiAmount.textContent =
    `₹${total}`;

    /*
        SHOW UPI ID
    */

    upiIdText.textContent =
    upiId;

    /*
        CREATE PRODUCT LIST
    */

    let itemNames = "";

    cart.forEach((item) => {

        itemNames +=
        `${item.quantity}x ${item.name}, `;

    });

    /*
        REMOVE LAST COMMA
    */

    itemNames =
    itemNames.slice(0, -2);

    /*
        CREATE UPI LINK
    */

    const upiLink =
    `upi://pay?pa=${upiId}&pn=WizardMC&am=${total}&cu=INR&tn=${encodeURIComponent(itemNames)}`;

    /*
        GENERATE QR
    */

    upiQrImage.src =
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

}

/* =========================
   CLOSE PAYMENT MODAL
========================= */

closeModal.addEventListener("click", () => {

    paymentModal.classList.remove("active");

});

/* =========================
   CLOSE ON OUTSIDE CLICK
========================= */

paymentModal.addEventListener("click", (e) => {

    if (e.target === paymentModal) {

        paymentModal.classList.remove("active");

    }

});

/* =========================
   TOAST MESSAGE
========================= */

function showToast(message) {

    const toast =
    document.getElementById("toast");

    toast.textContent =
    message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}