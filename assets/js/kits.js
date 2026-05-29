/* =========================
   CONFIG - KITS PAGE
========================= */

const upiId = "gareebjeetpatil@fam";
const discordLink = "https://discord.gg/UeTj2xv6s";

const products = [
    { name: "Dragon Kit", price: 219 },
    { name: "Arcane Kit", price: 39 },
    { name: "Warlord Kit", price: 79 },
    { name: "Celestial Kit", price: 119 },
    { name: "Immortal Kit", price: 169 }
];

const itemType = "kit";

/* =========================
   INITIALIZE SHARED FUNCTIONS
========================= */

if (typeof updateCartUI === "function") {
    updateCartUI();
}