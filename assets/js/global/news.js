let newsData = [];

async function fetchRSSFeed(onNewItems) {
    try {
        const rssFeeds = [
            "https://kyivindependent.com/news-archive/feed",
            "https://blogs.prio.org/category/ukraine-war/feed/",
            "https://www.atlanticcouncil.org/issue/conflict/feed/",
            "https://uavarta.org/en/category/news-en/feed/",
            "https://www.ft.com/war-in-ukraine?format=rss",
            "https://www.rferl.org/api/zbgvmtl-vomx-tpeq_kmr",
            "https://www.rferl.org/api/zqiimql-vomx-tpeigmmo",
            "https://www.rferl.org/api/zviipl-vomx-tpeugmm",
            "https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/news-event/ukraine-russia/rss.xml",
            "https://euromaidanpress.com/feed/",
            "https://feeds.bbci.co.uk/news/world/rss.xml",
            "https://feeds.skynews.com/feeds/rss/world.xml",
            "https://www.gbnews.com/feeds/news.rss",
            "https://www.independent.co.uk/news/world/rss",
            "https://metro.co.uk/news/world/feed/",
        ];

        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        for (const feed of rssFeeds) {
            try {
                const response = await fetch(`https://api.rss2json.com/v1/api.json?api_key=l44lexdlqbkdrpm4hhyhxn7djiomb4vywtus80lj&rss_url=${encodeURIComponent(feed)}`);
                const feedData = await response.json();

                if (feedData.status === 'ok') {
                    let items = feedData.items;

                    // Filter sources with open RSS feeds
                    if (feedData.feed.url.includes('feeds.bbci.co.uk') ||
                        feedData.feed.url.includes('skynews.com') ||
                        feedData.feed.url.includes('gbnews.com') ||
                        feedData.feed.url.includes('independent.co.uk') ||
                        feedData.feed.url.includes('metro.co.uk')) {
                        items = items.filter(item =>
                            item.title.toLowerCase().includes('ukraine') ||
                            item.title.toLowerCase().includes('russia') ||
                            item.title.toLowerCase().includes('putin') ||
                            item.title.toLowerCase().includes('zelensky'));
                    }

                    // Filter articles from the last 14 days
                    items = items.filter(item => new Date(item.pubDate) >= fourteenDaysAgo);

                    // Remove duplicates
                    const uniqueTitles = new Set(newsData.map(item => item.title));
                    items = items.filter(item => !uniqueTitles.has(item.title));

                    newsData.push(...items);
                    newsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

                    // Render new items incrementally
                    onNewItems(items);
                }
            } catch (error) {
                console.error(`Error fetching feed: ${feed}`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching RSS feeds:', error);
    }
}

function extractDomain(url) {
    try {
        const domain = new URL(url).hostname;
        return domain.replace('www.', '');
    } catch (error) {
        console.error('Invalid URL:', url);
        return 'Unknown';
    }
}

function renderTable(data) {
    if (document.getElementById('news-brief-log') !== null) {
        const newsList = document.getElementById("news-brief-log");
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a class="visited-link" href="${item.link}" target="_blank">${item.title}</a></td>
            `;
            newsList.appendChild(row);
        });
    }
}

window.fetchRSSFeed = fetchRSSFeed;