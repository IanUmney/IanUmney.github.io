const cookies = document.cookie; // Returns all cookies as a string
document.cookie = "username=JaneDoe; expires=Thu, 30 Mar 2025 12:00:00 UTC; path=/; secure";
console.log(`Cookies: ${cookies}`);
