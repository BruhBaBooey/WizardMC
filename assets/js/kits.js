/* =========================
   CART STORAGE
========================= */

const CART_STORAGE_KEY =
"wizardmc_cart";

let cart =
JSON.parse(
localStorage.getItem(CART_STORAGE_KEY)
) || [];

/* =========================
   YOUR UPI ID
========================= */

const upiId =
"gareebjeetpatil@fam";

/* =========================
   ITEM DATA
========================= */

const ranks = [
    {
        name: "Arcane Kit",
        price: 50
    },
    {
        name: "Warlord Kit",
        price: 80
    },
    {
        name: "Celestial Kit",
        price: 120
    },
    {
        name: "Immortal Kit",
        price: 160
    },
    {
        name: "Dragon Kit",
        price: 220
    }
];

/* =========================
   ITEM TYPE
========================= */

const itemType = "kit";

/* =========================
   CART BUTTONS
========================= */

const addButtons =
document.querySelectorAll(".add-button");

const quantityControls =
document.querySelectorAll(".quantity-controls");

const plusButtons =
document.querySelectorAll(".plus-btn");

const minusButtons =
document.querySelectorAll(".minus-btn");

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

    cart.forEach((item) => {

        total += item.total;

    });

    const upiLink =
    `upi://pay?pa=${upiId}&pn=WizardMC&tn=Wizard MC Purchase&am=${total}&cu=INR`;

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
   SYNC PAGE BUTTONS
========================= */

function syncPageControls() {

    addButtons.forEach((button, index) => {

        const item =
        ranks[index];

        const existingItem =
        cart.find(cartItem =>
            cartItem.id ===
            item.name
            .toLowerCase()
            .replace(/\s+/g, "-")
        );

        if (existingItem) {

            button.style.display =
            "none";

            quantityControls[index]
            .classList.add("active");

            quantityTexts[index]
            .textContent =
            existingItem.quantity;

        }

        else {

            button.style.display =
            "block";

            quantityControls[index]
            .classList.remove("active");

        }

    });

}

/* =========================
   INCREASE CART
========================= */

function increaseCartQuantity(index) {

    cart[index].quantity++;

    cart[index].total =
    cart[index].quantity *
    cart[index].price;

    updateCartUI();

}

/* =========================
   DECREASE CART
========================= */

function decreaseCartQuantity(index) {

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
   ADD BUTTON CLICK
========================= */

addButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const item =
        ranks[index];

        cart.push({

            id:
            item.name
            .toLowerCase()
            .replace(/\s+/g, "-"),

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

        updateCartUI();

    });

});

/* =========================
   PLUS BUTTON
========================= */

plusButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const item =
        ranks[index];

        const cartItem =
        cart.find(cartEntry =>
            cartEntry.id ===
            item.name
            .toLowerCase()
            .replace(/\s+/g, "-")
        );

        if (!cartItem) return;

        cartItem.quantity++;

        cartItem.total =
        cartItem.quantity *
        cartItem.price;

        updateCartUI();

    });

});

/* =========================
   MINUS BUTTON
========================= */

minusButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const item =
        ranks[index];

        const itemId =
        item.name
        .toLowerCase()
        .replace(/\s+/g, "-");

        const cartItemIndex =
        cart.findIndex(cartEntry =>
            cartEntry.id === itemId
        );

        if (cartItemIndex === -1) return;

        cart[cartItemIndex]
        .quantity--;

        if (
            cart[cartItemIndex]
            .quantity <= 0
        ) {

            cart.splice(
                cartItemIndex,
                1
            );

        }

        else {

            cart[cartItemIndex]
            .total =
            cart[cartItemIndex]
            .quantity *
            cart[cartItemIndex]
            .price;

        }

        updateCartUI();

    });

});

/* =========================
   INITIAL LOAD
========================= */

updateCartUI();

/* =========================
   PAYMENT MODAL ELEMENTS
========================= */

const paymentModal =
document.getElementById("paymentModal");

const upiModal =
document.getElementById("upiModal");

const closeModal =
document.getElementById("closeModal");

const closeUpiModal =
document.getElementById("closeUpiModal");

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
   CLOSE UPI MODAL BUTTON
========================= */

closeUpiModal.addEventListener("click", () => {

    upiModal.classList.remove("active");

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