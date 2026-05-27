/* =========================
   CONFIG - KEYS PAGE
========================= */

const upiId = "gareebjeetpatil@fam";
const discordLink = "https://discord.gg/UeTj2xv6s";

const products = [
    { name: "Dragon Key", price: 220 },
    { name: "Arcane Key", price: 50 },
    { name: "Warlord Key", price: 80 },
    { name: "Celestial Key", price: 120 },
    { name: "Immortal Key", price: 160 }
];

const itemType = "key";

/* =========================
   INITIALIZE SHARED FUNCTIONS
========================= */

if (typeof updateCartUI === "function") {
    updateCartUI();
}