/* =========================
   CONFIG - MONEY PAGE
========================= */

const upiId = "gareebjeetpatil@fam";
const discordLink = "https://discord.gg/UeTj2xv6s";

const products = [
    { name: "Dragon Money", price: 220 },
    { name: "Arcane Money", price: 50 },
    { name: "Warlord Money", price: 80 },
    { name: "Celestial Money", price: 120 },
    { name: "Immortal Money", price: 160 }
];

const itemType = "money";

/* =========================
   INITIALIZE SHARED FUNCTIONS
========================= */

if (typeof updateCartUI === "function") {
    updateCartUI();
}