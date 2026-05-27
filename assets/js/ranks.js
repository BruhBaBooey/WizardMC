/* =========================
   CONFIG - RANKS PAGE
========================= */

const upiId = "gareebjeetpatil@fam";
const discordLink = "https://discord.gg/UeTj2xv6s";

const products = [
    { name: "Dragon", price: 220 },
    { name: "Arcane", price: 50 },
    { name: "Warlord", price: 80 },
    { name: "Celestial", price: 120 },
    { name: "Immortal", price: 160 }
];

const itemType = "rank";

/* =========================
   INITIALIZE SHARED FUNCTIONS
========================= */

if (typeof updateCartUI === "function") {
    updateCartUI();
}