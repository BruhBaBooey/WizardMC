// LANDING PAGE JS

console.log("Wizard MC Landing Page Loaded");

/* =========================
   COPY TO CLIPBOARD
========================= */

const copyTexts = document.querySelectorAll(".copy-text");

copyTexts.forEach(text => {
    text.addEventListener("click", async () => {
        const value = text.getAttribute("data-copy");
        try {
            await navigator.clipboard.writeText(value);
            const originalText = text.innerHTML;
            text.innerHTML = "Copied!";
            setTimeout(() => {
                text.innerHTML = originalText;
            }, 1200);
        }
        catch (error) {
            console.error("Copy failed:", error);
        }
    });
});

/* =========================
   CUSTOM DROPDOWN
========================= */

function getVersion() {
    const selected = document.querySelector(".custom-select-option.selected");
    return selected ? selected.dataset.value : "java";
}

const customSelect = document.getElementById("versionSelect");
if (customSelect) {
    const trigger = customSelect.querySelector(".custom-select-trigger");
    const options = customSelect.querySelectorAll(".custom-select-option");
    
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        customSelect.classList.toggle("active");
    });
    
    options.forEach(option => {
        option.addEventListener("click", () => {
            trigger.textContent = option.textContent;
            options.forEach(o => o.classList.remove("selected"));
            option.classList.add("selected");
            customSelect.classList.remove("active");
        });
    });
    
    document.addEventListener("click", () => {
        customSelect.classList.remove("active");
    });
}

/* =========================
   LOGIN/LOGOUT FUNCTIONS
========================= */

function showLogin() {
    const savedLogin = localStorage.getItem("wizardmc_login");
    
    if (savedLogin) {
        const logoutModal = document.getElementById("logoutModal");
        if (logoutModal) logoutModal.classList.add("active");
    } else {
        const loginModal = document.getElementById("loginModal");
        if (loginModal) loginModal.classList.add("active");
    }
}

// Handle Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("wizardmc_login");
        
        const loginBtn = document.getElementById("loginBtn");
        if (loginBtn) {
            loginBtn.textContent = "LOGIN";
            loginBtn.classList.remove("logged-in");
        }
        
        const logoutModal = document.getElementById("logoutModal");
        if (logoutModal) logoutModal.classList.remove("active");
        
        const toast = document.getElementById("toast");
        if (toast) {
            toast.textContent = "Logged out!";
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2500);
        }
    });
}

// Handle Cancel
const logoutCancelBtn = document.getElementById("logoutCancelBtn");
if (logoutCancelBtn) {
    logoutCancelBtn.addEventListener("click", () => {
        const logoutModal = document.getElementById("logoutModal");
        if (logoutModal) logoutModal.classList.remove("active");
    });
}

// Close logout modal on outside click
const logoutModal = document.getElementById("logoutModal");
if (logoutModal) {
    logoutModal.addEventListener("click", (e) => {
        if (e.target === logoutModal) logoutModal.classList.remove("active");
    });
}

// Check if already logged in on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedLogin = localStorage.getItem("wizardmc_login");
    if (savedLogin) {
        const loginData = JSON.parse(savedLogin);
        const loginBtn = document.getElementById("loginBtn");
        if (loginBtn) {
            loginBtn.textContent = loginData.ign;
            loginBtn.classList.add("logged-in");
        }
        
        const versionTrigger = document.querySelector(".custom-select-trigger");
        const versionOptions = document.querySelectorAll(".custom-select-option");
        if (versionTrigger && versionOptions) {
            versionOptions.forEach(option => {
                if (option.dataset.value === loginData.version) {
                    versionTrigger.textContent = option.textContent;
                    versionOptions.forEach(o => o.classList.remove("selected"));
                    option.classList.add("selected");
                }
            });
        }
    }
});

const signinBtn = document.getElementById("signinBtn");
if (signinBtn) {
    signinBtn.addEventListener("click", () => {
        const ignInput = document.getElementById("ignInput");
        const discordInput = document.getElementById("discordInput");
        
        if (!ignInput || !ignInput.value.trim()) {
            const toast = document.getElementById("toast");
            if (toast) {
                toast.textContent = "Enter your MC username!";
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 2500);
            }
            return;
        }
        
        const loginData = {
            ign: ignInput.value.trim(),
            version: getVersion(),
            discord: discordInput ? discordInput.value.trim() : ""
        };
        
        localStorage.setItem("wizardmc_login", JSON.stringify(loginData));
        
        const loginBtn = document.getElementById("loginBtn");
        if (loginBtn) {
            loginBtn.textContent = loginData.ign;
            loginBtn.classList.add("logged-in");
        }
        
        const loginModal = document.getElementById("loginModal");
        if (loginModal) loginModal.classList.remove("active");
        
        const toast = document.getElementById("toast");
        if (toast) {
            toast.textContent = `Welcome, ${loginData.ign}!`;
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2500);
        }
    });
}

// Close modal on outside click
const loginModal = document.getElementById("loginModal");
if (loginModal) {
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) loginModal.classList.remove("active");
    });
}

/* =========================
   ESCAPE KEY HANDLER
========================= */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const loginModal = document.getElementById("loginModal");
        const logoutModal = document.getElementById("logoutModal");
        
        if (loginModal && loginModal.classList.contains("active")) {
            loginModal.classList.remove("active");
        }
        
        if (logoutModal && logoutModal.classList.contains("active")) {
            logoutModal.classList.remove("active");
        }
    }
});

/* =========================
   TOAST
========================= */

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText = "position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:rgba(20,10,35,0.96);color:white;padding:14px 22px;border-radius:12px;border:1px solid rgba(192,132,252,0.35);font-size:0.9rem;z-index:10000;opacity:0;pointer-events:none;transition:0.35s ease;";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}