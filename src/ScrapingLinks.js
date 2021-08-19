const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
var jsonData = require("/Users/asadbekshamsiev/Desktop/JavaScraping/TestFile.json");

process.setMaxListeners(0);

let wikiLinks = [];

async function scrapeLinks() {
    for (var data in jsonData) {
        let url = await "https://www.google.com/search?q=" + data + " Wikipedia";

        if (data === "Terry McDermott") { // McDermott is a special case.
            url = await "https://www.google.com/search?q=" + data + " footballer";
        }

        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url);

        var [link] = await page.$x('//*[@id="rso"]/div[1]/div/div/div/div[1]/a');

        if (link == null) {
            [link] = await page.$x('//*[@id="rso"]/div[1]/div/div/div[1]/a');
        }

        if (link == null) {
            [link] = await page.$x('//*[@id="rso"]/div[1]/div/div/div/div/div/div[1]/a');
        }

        if (link == null) {
            [link] = await page.$x('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div/div[1]/a');
        }

        if (link == null) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[1]/div/div/div/div/div/div/div/div[1]/a');
        }
        
        if (link == null) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[2]/div/div/div/div/div/div/div/div[1]/a');
        }

        if (link == null) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[2]/div/div/div/div/div/div/div/div/div/div/div[1]/a');
        }

        if (link == null) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[3]/div/div/div/div/div/div/div/div[1]/a');
        }

        var txt = await link.getProperty('href');
        var rawTxt = await txt.jsonValue();

        await wikiLinks.push(rawTxt);

        await browser.close();
    }

    let i = await 0;

    for (var data in jsonData) {
        jsonData[data]["wiki"] = await wikiLinks[i];

        await i++
    }

    console.log(jsonData);
}

scrapeLinks();