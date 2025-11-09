// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Donation button click handler
    const donationButtons = document.querySelectorAll('.donate-button');
    donationButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const item = this.dataset.item;
            alert(`Donating for: ${item}`); // Replace with actual donation processing
        });
    });

    // Volunteer form submission handler
    const volunteerForm = document.getElementById('volunteer-form');
    volunteerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const skills = document.getElementById('skills').value;

        // Basic validation
        if (!name || !email) {
            alert("Please fill in all required fields.");
            return;
        }

        // You would typically send this data to a server
        console.log("Volunteer Form Data:", { name, email, skills });
        alert("Thank you for registering to volunteer!");

        // Reset the form
        volunteerForm.reset();
    });

    // Newsletter form submission handler
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const email = document.getElementById('email').value;

        // Basic validation
        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        // You would typically send this data to a server
        console.log("Newsletter Subscription Email:", email);
        alert("Thank you for subscribing to our newsletter!");

        // Reset the form
        newsletterForm.reset();
    });
});
