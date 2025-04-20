// This script loads the header and footer HTML files into the respective elements on the page.

async function loadHeader() {
    const headerElement = document.querySelector("header");
    if (headerElement) {
        try {
            const response = await fetch("/components/header.html");
            if (!response.ok) {
                throw new Error(`Failed to load header: ${response.status}`);
            }
            const headerHTML = await response.text();
            headerElement.innerHTML = headerHTML;
        } catch (error) {
            console.error(error);
        }
    }
}

async function loadFooter() {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        try {
            const response = await fetch("/components/footer.html");
            if (!response.ok) {
                throw new Error(`Failed to load footer: ${response.status}`);
            }
            const footerHTML = await response.text();
            footerElement.innerHTML = footerHTML;
        } catch (error) {
            console.error(error);
        }
    }
}
// Call the functions on page load
document.addEventListener("DOMContentLoaded", async () => {
    await loadHeader();
    await loadFooter();
});