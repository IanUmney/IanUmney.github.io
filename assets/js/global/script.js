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

async function scrollToTop() {
    // Create the button element
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.id = "scrollToTopBtn";
scrollToTopBtn.innerHTML = "↑"; // You can replace this with an icon or SVG
scrollToTopBtn.title = "Go to top";

// Style the button with JS
scrollToTopBtn.style.display = "none";
scrollToTopBtn.style.position = "fixed";
scrollToTopBtn.style.bottom = "30px";
scrollToTopBtn.style.right = "30px";
scrollToTopBtn.style.zIndex = "99";
scrollToTopBtn.style.fontSize = "24px";
scrollToTopBtn.style.border = "none";
scrollToTopBtn.style.outline = "none";
scrollToTopBtn.style.backgroundColor = "#333";
scrollToTopBtn.style.color = "white";
scrollToTopBtn.style.cursor = "pointer";
scrollToTopBtn.style.padding = "10px 15px";
scrollToTopBtn.style.borderRadius = "50%";
scrollToTopBtn.style.transition = "opacity 0.3s ease";

// Add hover effect
scrollToTopBtn.addEventListener("mouseover", () => {
  scrollToTopBtn.style.backgroundColor = "#555";
});
scrollToTopBtn.addEventListener("mouseout", () => {
  scrollToTopBtn.style.backgroundColor = "#333";
});

// Add the button to the page
document.body.appendChild(scrollToTopBtn);

// Show button when scrolling down 100px
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Scroll smoothly to top when clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
}


// Call the functions on page load
document.addEventListener("DOMContentLoaded", async () => {
    await loadHeader();
    await loadFooter();
    await scrollToTop();
});
