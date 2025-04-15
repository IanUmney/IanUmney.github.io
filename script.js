// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

// Check if the "visited" cookie exists
window.onload = function () {
    const visited = getCookie("visited");

    if (!visited) {
        // Show the alert if the cookie doesn't exist
        alert("Welcome to Ian Umney's website! This page is under construction.");

        // Set the "visited" cookie to prevent future alerts
        setCookie("visited", "true", 7); // Cookie expires in 7 days
    }
};