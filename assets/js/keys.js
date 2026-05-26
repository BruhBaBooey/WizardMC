/* =========================
   CART STORAGE
========================= */

let cart = [];

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
   ITEM TYPE
========================= */

const itemType = "key";

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