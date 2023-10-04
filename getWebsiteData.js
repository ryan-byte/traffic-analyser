// get website traffic from this www.similarweb.com
const { firefox } = require('playwright');

async function getWebsiteTrafficData(websiteDomain){
    // Launch a firefox browser
    console.log("Launching browser");
    const browser = await firefox.launch({headless: false});

    // Create a new page
    const page = await browser.newPage();

    // Navigate to a website
    console.log(`Accessing website (${websiteDomain}) traffic data`);
    await page.goto(`https://www.similarweb.com/website/${websiteDomain}`);

    // Wait for the page to fully loads
    console.log("Waiting for the page to load");
    await page.waitForSelector("p.wa-overview__title");
    await page.waitForLoadState('load');

    // Scrape traffic data from the page

    // Close the browser
    await browser.close();
}

getWebsiteTrafficData("nend.io")