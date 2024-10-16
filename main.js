const getWebsiteData = require("./lib/getWebsiteData.js");
const {readFile} = require("./lib/utils.js")
const ConvertWebsitesDataToExcel = require("./lib/convertTrafficToExcel.js")

async function main(){
    let websiteArr = await getWebsiteList(); 
    console.log("\x1b[33m" + "Script launched." + "\x1b[0m \n");

    // Scrape each website Data
    let scrapedData = []
    for (let i = 0; i < websiteArr.length; i++){
        let websiteDomain = websiteArr[i];
        let data = await getWebsiteData(websiteDomain);
        let cleanData = {
            websiteDomain,
            data
        };
        
        scrapedData.push(cleanData);
    }
    console.log("\x1b[33m" + "Putting all scraped data into an Excel Sheet." + "\x1b[0m \n");

    ConvertWebsitesDataToExcel(scrapedData);
}

async function getWebsiteList(){
    let websiteFileData = await readFile("websites.txt");
    let websiteArr = websiteFileData.split("\n");
    let outputArr = [];
    websiteArr.forEach(website => {
        if (website !== "") outputArr.push(website);
    });
    console.log(outputArr);
    return outputArr;
}


main();