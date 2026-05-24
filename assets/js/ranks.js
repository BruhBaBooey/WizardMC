const rankCards = document.querySelectorAll(".rank-card");

const modal =
document.getElementById("paymentModal");

const closeModal =
document.getElementById("closeModal");

const modalRankName =
document.getElementById("modalRankName");

const modalRankPrice =
document.getElementById("modalRankPrice");

const discordButton =
document.getElementById("discordButton");

const upiButton =
document.getElementById("upiButton");

/* =========================
   UPI MODAL ELEMENTS
========================= */

const upiModal =
document.getElementById("upiModal");

const closeUpiModal =
document.getElementById("closeUpiModal");

const upiQrImage =
document.getElementById("upiQrImage");

const upiAmount =
document.getElementById("upiAmount");

const upiIdText =
document.getElementById("upiIdText");

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
   OPEN PAYMENT MODAL
========================= */

rankCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        const rank = ranks[index];

        currentRank = rank;

        modal.classList.add("active");

        modalRankName.textContent =
        rank.name;

        modalRankPrice.textContent =
        `₹${rank.price}`;

        /* =========================
           DISCORD LINK
        ========================= */

        const message =
        encodeURIComponent(
            `Hello, I would like to buy the ${rank.name} rank for ₹${rank.price}.`
        );

        discordButton.href =
        `https://discord.gg/UeTj2xv6s`;

    });

});

/* =========================
   CLOSE PAYMENT MODAL
========================= */

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});

/* =========================
   CLICK OUTSIDE CLOSE
========================= */

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});

/* =========================
   OPEN UPI MODAL
========================= */

upiButton.addEventListener("click", () => {

    if (!currentRank) return;

    /*
        CLOSE FIRST MODAL
    */
    modal.classList.remove("active");

    /*
        SHOW SECOND MODAL
    */
    upiModal.classList.add("active");

    /*
        SET AMOUNT TEXT
    */
    upiAmount.textContent =
    `₹${currentRank.price}`;

    /*
        SHOW UPI ID
    */
    upiIdText.textContent =
    upiId;

    /*
        CREATE UPI LINK
    */
    const upiLink =
    `upi://pay?pa=${upiId}&pn=WizardMC&am=${currentRank.price}&cu=INR`;

    /*
        GENERATE QR
    */
    upiQrImage.src =
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;

});

/* =========================
   CLOSE UPI MODAL BUTTON
========================= */

closeUpiModal.addEventListener("click", () => {

    upiModal.classList.remove("active");

});

/* =========================
   CLOSE UPI MODAL OUTSIDE
========================= */

upiModal.addEventListener("click", (e) => {

    if (e.target === upiModal) {

        upiModal.classList.remove("active");

    }

});

