document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const footer = document.querySelector("footer");

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            body.classList.add("dark-theme");
            footer.classList.add("dark-theme");
        } else {
            body.classList.remove("dark-theme");
            footer.classList.remove("dark-theme");
        }
    });
});
