async function loadFooter() {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        try {
            const response = await fetch("/trustaid/foot.html");
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

async function loadHeader() {
    const headElement = document.querySelector("header");
    if (headElement) {
        try {
            const response = await fetch("/trustaid/head.html");
            if (!response.ok) {
                throw new Error(`Failed to load footer: ${response.status}`);
            }
            const headHTML = await response.text();
            headElement.innerHTML = headHTML;
        } catch (error) {
            console.error(error);
        }
    }
}

function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navbar');
    const closeBtn = document.getElementById('closeBtn');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking the close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        }

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

function setupForms() {
    // Generate unique ID for form
    const generateA1B2Code = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const digits = "0123456789";
        return (
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            digits.charAt(Math.floor(Math.random() * digits.length)) +
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            digits.charAt(Math.floor(Math.random() * digits.length))
        );
    };
    
    // Set form IDs and dates
    const idInput = document.getElementById("id");
    if (idInput) {
        idInput.value = generateA1B2Code();
    }
    
    const dateInput = document.getElementById("date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
    }
    
    // Enable/disable buttons based on checkbox
    const reqcheck = document.getElementById("reqcheck");
    const petcheck = document.getElementById("petcheck");
    const reqbutton = document.getElementById("submit-request-btn");
    const petbutton = document.getElementById("submit-petition-btn");
    
    if (reqcheck && reqbutton) {
        reqcheck.addEventListener("change", function () {
            reqbutton.disabled = !reqcheck.checked;
            reqbutton.style.backgroundColor = reqcheck.checked ? "#0058a3" : "";
        });
    }
    
    if (petcheck && petbutton) {
        petcheck.addEventListener("change", function () {
            petbutton.disabled = !petcheck.checked;
            petbutton.style.backgroundColor = petcheck.checked ? "#0058a3" : "";
        });
    }
    
    const form = document.getElementById("reqform");
    const form2 = document.getElementById("petform");
    
    // Setup form submission handlers
    if (form) {
        // Success message
        const message1 = document.createElement("div");
        message1.innerHTML = "<p class='green'>Thank you for your request submission! It has been sent.</p>";
        message1.style.display = "none";
        form.appendChild(message1);
        
        // Disable form function
        const disableRequestForm = () => {
            const inputs = form.querySelectorAll("input, textarea, button");
            inputs.forEach((input) => {
                input.disabled = true;
            });
        };
        
        // Handle form submission
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                if (response.ok) {
                    sessionStorage.setItem("reqform", "true");
                    disableRequestForm();
                    message1.style.display = "block";
                } else {
                    alert("There was a problem submitting your form. Please try again.");
                }
            })
            .catch(() => {
                alert("Submission failed. Please check your connection.");
            });
        });
    }
    
    if (form2) {
        // Success message
        const message2 = document.createElement("div");
        message2.innerHTML = "<p class='green'>Thank you for signing the petition!</p>";
        message2.style.display = "none";
        form2.appendChild(message2);
        
        // Disable form function
        const disablePetitionForm = () => {
            const inputs = form2.querySelectorAll("input, textarea, button");
            inputs.forEach((input) => {
                input.disabled = true;
            });
        };
        
        // Handle form submission
        form2.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const formData = new FormData(form2);
            fetch(form2.action, {
                method: form2.method,
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                if (response.ok) {
                    sessionStorage.setItem("petform", "true");
                    disablePetitionForm();
                    message2.style.display = "block";
                } else {
                    alert("There was a problem submitting your petition. Please try again.");
                }
            })
            .catch(() => {
                alert("Submission failed. Please check your connection.");
            });
        });
    }
}

function updateFine() {

  const requests = [
    { name: "Ian Umney", startDate: "2025-04-25" },
    { name: "V7P7", startDate: "2025-05-09" },
    { name: "O3I5", startDate: "2025-05-09" },
    { name: "J4H5(1)", startDate: "2025-05-09" },
    { name: "J4H5(2)", startDate: "2025-05-09" },
    { name: "A7L7", startDate: "2025-05-09" },
    { name: "T8Y6", startDate: "2025-05-09" },
    { name: "N0Y9", startDate: "2025-05-09" },
    { name: "J2R0", startDate: "2025-05-10" },
    { name: "T4A6", startDate: "2025-05-10" },
    { name: "M3C1", startDate: "2025-05-11" },
    { name: "T4A6(2)", startDate: "2025-05-11" },
    { name: "K5E0", startDate: "2025-05-12" },
    { name: "D4D6", startDate: "2025-05-13" },
    { name: "B9O2", startDate: "2025-05-13" } // Under grace
  ];

  const finePerDay = 20;
  const today = new Date();
  let totalFine = 0;

  const tableBody = document.querySelector("#fineTable tbody");

  requests.forEach(request => {
    const requestDate = new Date(request.startDate);
    const graceEnd = new Date(requestDate);
    graceEnd.setDate(graceEnd.getDate() + 30);

    let finedDays = 0;
    if (today > graceEnd) {
      const diffMs = today - graceEnd;
      finedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }

    const fine = finedDays * finePerDay;
    totalFine += fine;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${request.name}</td>
      <td>${requestDate.toLocaleDateString()}</td>
      <td>${graceEnd.toLocaleDateString()}</td>
      <td>${finedDays}</td>
      <td>$${fine.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById("totalFine").textContent = `💰 Total Fine Accrued: $${totalFine.toLocaleString()}`;
}

// Main initialization function
async function initializePage() {
    setupForms();
    await loadFooter();
    await loadHeader();
    setupHamburgerMenu();
    await updateFine();

}

// Call the initialization on page load
document.addEventListener("DOMContentLoaded", initializePage);



