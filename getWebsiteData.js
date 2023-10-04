// get website traffic from this www.similarweb.com
const { firefox } = require('playwright');

async function getWebsiteTrafficData(websiteDomain){
    // Launch a firefox browser
    console.log("Launching browser");
    const browser = await firefox.launch({headless: false});

    // Create a new page
    const page = await browser.newPage();

    // Navigate to a website
    console.log(`Getting ${websiteDomain} traffic data`);
    await page.goto(`https://www.similarweb.com/website/${websiteDomain}`);

    // Wait for the page to fully loads
    console.log("Waiting for the page to load");
    await page.waitForSelector("p.wa-overview__title");
    await page.waitForLoadState('load');

    // Scrape traffic data from the page
    console.log("Scraping data");
    let data = await scrapeData(page);

    // Close the browser
    await browser.close();

    // Returning scraped data
    return data;
}

async function scrapeData(page){
    const TrafficData = await page.evaluate(() => {
        const totalVisitsParent = document.querySelector('[data-test="total-visits"]').parentElement;
        const totalVisits = totalVisitsParent.querySelector('.engagement-list__item-value').textContent;

        const pagePerVisitParent = document.querySelector('[data-test="pages-per-visit"]').parentElement;
        const pagePerVisit = pagePerVisitParent.querySelector('.engagement-list__item-value').textContent;

        const avgVisitDurationParent = document.querySelector('[data-test="avg-visit-duration"]').parentElement;
        const avgVisitDuration = avgVisitDurationParent.querySelector('.engagement-list__item-value').textContent;

        return {totalVisits, pagePerVisit, avgVisitDuration}
    });

    return TrafficData;
}

getWebsiteTrafficData("nend.io")