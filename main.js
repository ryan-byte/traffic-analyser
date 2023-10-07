const getWebsiteData = require("./lib/getWebsiteData.js");
const {readFile} = require("./lib/utils.js")

async function main(){
    let websiteArr = await getWebsiteList(); 

    // Scrape each website Data
    for (let i = 0; i < websiteArr.length; i++){
        let data = await getWebsiteData(websiteArr[i])
        console.log(data);
    }
}

async function getWebsiteList(){
    let websiteFileData = await readFile("websites.txt");
    return websiteFileData.split("\n")
}


main();