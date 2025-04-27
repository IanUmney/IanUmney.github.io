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
                <img src="https://raw.githubusercontent.com/primer/octicons/863af9507f27e8e99f13237873c0a1897eaf5640/icons/git-commit-24.svg">
                <strong>${commit.commit.message}</strong>
                <br>
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

document.addEventListener("DOMContentLoaded", async () => {
    await fetchCommits();
});

