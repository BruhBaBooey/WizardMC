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

            /*
                TEMPORARY COPIED MESSAGE
            */
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