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

// Call the functions on page load
document.addEventListener("DOMContentLoaded", async () => {
    // await loadHeader();
    await loadFooter();
});



    //   document.addEventListener("DOMContentLoaded", function () {
    //     // Generate unique ID
    //     const generateA1B2Code = () => {
    //       const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //       const digits = "0123456789";
    //       return (
    //         letters.charAt(Math.floor(Math.random() * letters.length)) +
    //         digits.charAt(Math.floor(Math.random() * digits.length)) +
    //         letters.charAt(Math.floor(Math.random() * letters.length)) +
    //         digits.charAt(Math.floor(Math.random() * digits.length))
    //       );
    //     };
    //     document.getElementById("id").value = generateA1B2Code();
    
    //     // Set today's date
    //     const dateInput = document.getElementById("date");
    //     const today = new Date().toISOString().split("T")[0];
    //     dateInput.value = today;
    
    //     // Enable/disable buttons based on checkbox
    //     const reqcheck = document.getElementById("reqcheck");
    //     const petcheck = document.getElementById("petcheck");
    //     const reqbutton = document.getElementById("submit-request-btn");
    //     const petbutton = document.getElementById("submit-petition-btn");
    
    //     reqcheck.addEventListener("change", function () {
    //       reqbutton.disabled = !reqcheck.checked;
    //       reqbutton.style.backgroundColor = reqcheck.checked ? "#0058a3" : "";
    //     });
    
    //     petcheck.addEventListener("change", function () {
    //       petbutton.disabled = !petcheck.checked;
    //       petbutton.style.backgroundColor = petcheck.checked ? "#0058a3" : "";
    //     });
    
    //     const form = document.getElementById("reqform");
    //     const form2 = document.getElementById("petform");
    
    //     // Success messages
    //     const message1 = document.createElement("div");
    //     message1.innerHTML = "<p class='green'>Thank you for your request submission! It has been sent.</p>";
    //     message1.style.display = "none";
    //     form.appendChild(message1);
    
    //     const message2 = document.createElement("div");
    //     message2.innerHTML = "<p class='green'>Thank you for signing the petition!</p>";
    //     message2.style.display = "none";
    //     form2.appendChild(message2);
    
    //     // Disable individual forms
    //     const disableRequestForm = () => {
    //       const inputs = form.querySelectorAll("input, textarea, button");
    //       inputs.forEach((input) => {
    //         input.disabled = true;
    //       });
    //     };
    
    //     const disablePetitionForm = () => {
    //       const inputs = form2.querySelectorAll("input, textarea, button");
    //       inputs.forEach((input) => {
    //         input.disabled = true;
    //       });
    //     };
    
    //     // Handle form 1 submission
    //     form.addEventListener("submit", function (e) {
    //       e.preventDefault();
    
    //       const formData = new FormData(form);
    //       fetch(form.action, {
    //         method: form.method,
    //         body: formData,
    //         headers: {
    //           Accept: "application/json",
    //         },
    //       })
    //         .then((response) => {
    //           if (response.ok) {
    //             sessionStorage.setItem("reqform", "true");
    //             disableRequestForm();
    //             message1.style.display = "block";
    //           } else {
    //             alert("There was a problem submitting your form. Please try again.");
    //           }
    //         })
    //         .catch(() => {
    //           alert("Submission failed. Please check your connection.");
    //         });
    //     });
    
    //     // Handle form 2 submission
    //     form2.addEventListener("submit", function (e) {
    //       e.preventDefault();
    
    //       const formData = new FormData(form2);
    //       fetch(form2.action, {
    //         method: form2.method,
    //         body: formData,
    //         headers: {
    //           Accept: "application/json",
    //         },
    //       })
    //         .then((response) => {
    //           if (response.ok) {
    //             sessionStorage.setItem("petform", "true");
    //             disablePetitionForm();
    //             message2.style.display = "block";
    //           } else {
    //             alert("There was a problem submitting your petition. Please try again.");
    //           }
    //         })
    //         .catch(() => {
    //           alert("Submission failed. Please check your connection.");
    //         });
    //     });
    //   });
