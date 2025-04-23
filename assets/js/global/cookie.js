function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
    const expires = date.toUTCString(); // Get the expiration date as a string
    const cookieValue = `${value}|${expires}`; // Include the expiry in the value
    document.cookie = `${name}=${cookieValue}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split("=");
        if (cookieName === name) {
            const [value, expiry] = cookieValue.split("|"); // Split the value and expiry
            return { value, expiry };
        }
    }
    return null;
}

function populateCookieTable() {
    const cookieTableBody = document.querySelector("#cookie-table tbody");
    if (cookieTableBody) {
        // Clear existing rows
        cookieTableBody.innerHTML = "";

        // Get cookies and populate rows
        const cookies = document.cookie.split("; ");
        cookies.forEach(cookie => {
            const [name, valueWithExpiry] = cookie.split("=");
            const [value, expiry] = valueWithExpiry.split("|"); // Extract value and expiry

            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = name || "N/A";
            row.appendChild(nameCell);

            const valueCell = document.createElement("td");
            valueCell.textContent = value || "N/A";
            row.appendChild(valueCell);

            const expiryCell = document.createElement("td");
            expiryCell.textContent = expiry || "N/A"; // Show expiry if available
            row.appendChild(expiryCell);

            cookieTableBody.appendChild(row);
        });
    }
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert(`The cookie "${name}" has been deleted.`);
    // populateCookieTable(); // Refresh the table after deleting the cookie
    window.location.href = "/pages/idgaf.html";

}

// Attach event listener to the delete button
window.onload = function () {
    const visited = getCookie("fuckputin");

    if (!visited) {
        // Show the alert if the cookie doesn't exist
        alert("Welcome to the site. It's fully coded and deployed by yours truly so things may seem off :) This site uses a cookie as described in the Cookie Policy.");
        setCookie("fuckputin", "true", 7);
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



