const rankCards = document.querySelectorAll(".rank-card");

/* =========================
   YOUR UPI ID
========================= */

const upiId =
"wizardmc@upi";

/* =========================
   CURRENT SELECTED RANK
========================= */

let currentRank = null;

/* =========================
   GLOBAL CART
========================= */

let cart = [];

/* =========================
   RANK DATA
========================= */

const ranks = [
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
    },
    {
        name: "Dragon",
        price: 220
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
   ITEM TYPE
========================= */

const itemType = "rank";

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

        console.log(cart);

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

        }

        console.log(cart);

    });

});