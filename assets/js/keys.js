/* =========================
   CONFIG - KEYS PAGE
========================= */

const upiId = "gareebjeetpatil@fam";
const discordLink = "https://discord.gg/UeTj2xv6s";

const products = [
    { name: "Dragon Key", price: 69 },
    { name: "Arcane Key", price: 19 },
    { name: "Warlord Key", price: 29 },
    { name: "Celestial Key", price: 39 },
    { name: "Immortal Key", price: 49 }
];

const itemType = "key";

/* =========================
   INITIALIZE SHARED FUNCTIONS
========================= */

if (typeof updateCartUI === "function") {
    updateCartUI();
}