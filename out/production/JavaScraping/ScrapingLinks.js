// const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
var jsonData = require("/Users/asadbekshamsiev/Desktop/BallonDorWebScraping/TestFile.json");

process.setMaxListeners(0);

let wikiLinks = [];

// Option A: //*[@id="kp-wp-tab-overview"]/div[2]/div/div/div/div/div/div/div/div[1]/a
// Option B: //*[@id="rso"]/div[1]/div/div/div[1]/a

async function scrapeLinks(name) {
    let url = "https://www.google.com/search?q=" + name;

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    var [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[2]/div/div/div/div/div/div/div/div[1]/a/h3');

    var txt = await link.getProperty('textContent');
    var rawTxt = await txt.jsonValue();

    await console.log(rawTxt);

    await browser.close();
}

function addLinks() {
    // scrapeLinks(); <- Loop through JSON and add relevant names in parameter area to get links.

}

// scrapeLinks("Jimmy Johnstone");

// console.log(jsonData);

for (var data in jsonData) {
    console.log(data[2].name);
}

// for (let i = 0; i < 163; i++) {
//     console.log(jsonData[0]);
// }

// axios
//     .get("/Users/asadbekshamsiev/Desktop/JavaScraping/TestFile.json")
//     .then((response) => response.data)
//     .then((data) => {
//         const names = data.data.map(o => o.name);
//         // const imageTxt = data.data.map(o => o.srcTxt);

//         names.forEach(element => {
//             console.log(element);
//         });

//     }
// );