// Fetch recent commits from the GitHub API
async function fetchCommits() {
    console.log("Fetching commits...");
    const owner = "IanUmney";
    const repo = "IanUmney.github.io";
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/events`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const events = await response.json();
        const commitList = document.getElementById("commit-list");

        // Filter only "PushEvent" events (which contain commits)
        const pushEvents = events.filter(event => event.type === "PushEvent");

        // Limit to the 5 most recent push events
        pushEvents.slice(0, 5).forEach(event => {
            event.payload.commits.forEach(commit => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>${commit.message}</strong>
                    <br>
                    <small>On ${new Date(event.created_at).toLocaleDateString()}</small>
                `;
                commitList.appendChild(listItem);
            });
        });
    } catch (error) {
        console.error("Error fetching commits:", error);
        const commitList = document.getElementById("commit-list");
        commitList.innerHTML = "<li>Unable to load recent updates.</li>";
    }
}

// Call the function on page load
window.onload = fetchCommits;