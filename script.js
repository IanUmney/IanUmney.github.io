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

// Function to populate the cookie table
function populateCookieTable() {
    const cookieTableBody = document.querySelector("#cookie-table tbody");
    if (cookieTableBody) {
        // Clear existing rows
        cookieTableBody.innerHTML = "";

        // Get cookies and populate rows
        const cookies = document.cookie.split("; ");
        cookies.forEach(cookie => {
            const [name, value] = cookie.split("=");
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = name || "N/A";
            row.appendChild(nameCell);

            const valueCell = document.createElement("td");
            valueCell.textContent = value || "N/A";
            row.appendChild(valueCell);

            const expiryCell = document.createElement("td");
            expiryCell.textContent = "7 days"; // Expiry is not accessible via `document.cookie`
            row.appendChild(expiryCell);

            cookieTableBody.appendChild(row);
        });
    }
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert(`The cookie "${name}" has been deleted.`);
    populateCookieTable(); // Refresh the table after deleting the cookie
}

// Attach event listener to the delete button
window.onload = function () {
    const visited = getCookie("fuckputin");

    if (!visited) {
        // Show the alert if the cookie doesn't exist
        alert("Welcome to the site. It's fully coded and deployed by yours truly so things may seem off :) This site uses a cookie as described in the Cookie Policy.");
        setCookie("fuckputin", "true", 7); // Cookie expires in 7 days
    }

    const deleteButton = document.getElementById("remove-cookie-btn");
    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            deleteCookie("fuckputin");
        });
    }

    // Populate the table on page load
    populateCookieTable();
};



