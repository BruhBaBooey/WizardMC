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
   ITEM DATA
========================= */

const ranks = [
    {
        name: "Arcane Key",
        price: 50
    },
    {
        name: "Warlord Key",
        price: 80
    },
    {
        name: "Celestial Key",
        price: 120
    },
    {
        name: "Immortal Key",
        price: 160
    },
    {
        name: "Dragon Key",
        price: 220
    }
];


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

                    </div>

                </div>

            </div>

        `;

    });

    cartTotal.innerText =
    `₹${total}`;

    saveCart();

}

/* =========================
   INCREASE
========================= */

function increaseCartQuantity(index) {

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
   ITEM TYPE
========================= */

const itemType = "money";

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
   ADD BUTTON CLICK
========================= */

addButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const item = ranks[index];

        /*
            HIDE ADD BUTTON
        */

        button.style.display =
        "none";

        /*
            SHOW - 1 +
        */

        quantityControls[index]
        .classList.add("active");

        quantityTexts[index]
        .textContent = 1;

        /*
            ADD TO CART
        */

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

        console.log(cart);

    });

});

/* =========================
   PLUS BUTTON
========================= */

plusButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        let amount =
        parseInt(quantityTexts[index].textContent);

        amount++;

        quantityTexts[index]
        .textContent = amount;

        /*
            UPDATE CART
        */

        cart[index].quantity =
        amount;

        cart[index].total =
        amount * cart[index].price;

        console.log(cart);

    });

});

/* =========================
   MINUS BUTTON
========================= */

minusButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        let amount =
        parseInt(quantityTexts[index].textContent);

        amount--;

        /*
            REMOVE ITEM
        */

        if (amount <= 0) {

            quantityControls[index]
            .classList.remove("active");

            addButtons[index]
            .style.display = "block";

            cart.splice(index, 1);

        }

        else {

            quantityTexts[index]
            .textContent = amount;

            cart[index].quantity =
            amount;

            cart[index].total =
            amount * cart[index].price;

        }

        console.log(cart);

    });

});