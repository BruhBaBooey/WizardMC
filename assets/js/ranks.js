/* =========================
   CONFIG - RANKS PAGE
========================= */

const upiId = "gareebjeetpatil@fam";
const discordLink = "https://discord.gg/UeTj2xv6s";

const products = [
    { name: "Dragon", price: 349 },
    { name: "Arcane", price: 79 },
    { name: "Warlord", price: 149 },
    { name: "Celestial", price: 219 },
    { name: "Immortal", price: 299 }
];

const itemType = "rank";

/* =========================
   INITIALIZE SHARED FUNCTIONS
========================= */

if (typeof updateCartUI === "function") {
    updateCartUI();
}