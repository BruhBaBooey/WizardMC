/* =========================
   CONFIG - KITS PAGE
========================= */

const upiId = "gareebjeetpatil@fam";
const discordLink = "https://discord.gg/UeTj2xv6s";

const products = [
    { name: "Dragon Kit", price: 220 },
    { name: "Arcane Kit", price: 50 },
    { name: "Warlord Kit", price: 80 },
    { name: "Celestial Kit", price: 120 },
    { name: "Immortal Kit", price: 160 }
];

const itemType = "kit";

/* =========================
   INITIALIZE SHARED FUNCTIONS
========================= */

if (typeof updateCartUI === "function") {
    updateCartUI();
}