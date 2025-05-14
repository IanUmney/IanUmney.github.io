// ...existing code...

function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navbar');
    
    if (hamburger && navLinks) {
        // Toggle menu visibility on hamburger click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinksItems = document.querySelectorAll('#navbar a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Initialize the hamburger menu on page load
document.addEventListener("DOMContentLoaded", setupHamburgerMenu);
