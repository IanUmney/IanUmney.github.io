let newsData = [];

    async function fetchRSSFeed() {
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

            const responses = await Promise.all(rssFeeds.map(feed => 
                fetch(`https://api.rss2json.com/v1/api.json?api_key=l44lexdlqbkdrpm4hhyhxn7djiomb4vywtus80lj&rss_url=${encodeURIComponent(feed)}`)
            ));

            const data = await Promise.all(responses.map(response => response.json()));

            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

            data.forEach(feedData => {
                if (feedData.status === 'ok') {
                    let items = feedData.items;

                    // Filter sources which have open RSS feeds
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

                    newsData.push(...items);
                } else {
                    console.error('Failed to fetch RSS feed:', feedData.message);
                }
            });

            newsData.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            const uniqueTitles = new Set();
            newsData = newsData.filter(item => {
                if (uniqueTitles.has(item.title)) {
                    return false;
                } else {
                    uniqueTitles.add(item.title);
                    return true;
                }
            });

            renderTable(newsData);

        } catch (error) {
            console.error('Error fetching RSS feed:', error);
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
        if (document.getElementById('news-brief-log') === null) {
            const newsLsit = document.getElementById("news-brief-log");
            newsLsit.innerHTML = ''; // Clear existing rows
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a class="visited-link" href="${item.link}" target="_blank">${item.title}</a></td>
                `;
                newsLsit.appendChild(row);
            });

        } else if (document.getElementById('newsTable')) {
            const newsTable = document.getElementById('newsTable');
            newsTable.innerHTML = ''; // Clear existing rows
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>- <a class="visited-link" href="${item.link}" target="_blank">${item.title}</a></td>
                    <td>${new Date(item.pubDate).toLocaleDateString('en-GB')}</td>
                    <td>${extractDomain(item.link)}</td>
                `;
                newsTable.appendChild(row);
            });

        }
    }
        fetchRSSFeed();