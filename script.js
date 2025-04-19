// This script loads the header and footer HTML files into the respective elements on the page.

async function loadHeader() {
    const headerElement = document.querySelector("header");
    if (headerElement) {
        try {
            const response = await fetch("/header.html");
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
            const response = await fetch("/footer.html");
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

// Fetch recent commits from the GitHub API
async function fetchCommits() {
    console.log("Fetching commits...");
    const owner = "IanUmney";
    const repo = "IanUmney.github.io";
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const commits = await response.json();
        const commitList = document.getElementById("commit-list");

        commits.forEach(commit => {
            const listItem = document.createElement("li");


            const commitDate = new Date(commit.commit.author.date);
            const day = String(commitDate.getDate()).padStart(2, '0');
            const month = String(commitDate.getMonth() + 1).padStart(2, '0');
            const year = commitDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

            listItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="https://raw.githubusercontent.com/primer/octicons/863af9507f27e8e99f13237873c0a1897eaf5640/icons/git-commit-24.svg">
                    <strong>${commit.commit.message}</strong>
                </div>
                <small>By ${commit.commit.author.name} on ${formattedDate}</small>
            `;
            commitList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching commits:", error);
        const commitList = document.getElementById("commit-list");
        commitList.innerHTML = "<li>Unable to load recent updates.</li>";
    }
}

// Call the functions on page load
document.addEventListener("DOMContentLoaded", async () => {
    await loadHeader();
    await loadFooter();
});
};