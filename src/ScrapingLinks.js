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
}

async function scrapeClubs() { // Find out what clubs a lad played for in the 80's (January 1st, 1980 - December 31st, 1989).
    let i = 1;
    let j = 1;

    // let url = jsonData["Michel Platini"]['wiki'];
    let url = jsonData["Marco Tardelli"]['wiki']
    // let url = jsonData["Grzegorz Lato"]['wiki']

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    var [seniorCareer] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[1]');

    var txt = await seniorCareer.getProperty('textContent');
    var rawTxt = await txt.jsonValue();

    while (true) { // This is for the normal cases.
        await j++;

        [seniorCareer] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[' + j + ']');

        if (seniorCareer == null) {
            break;
        }

        var txt = await seniorCareer.getProperty('textContent');
        var rawTxt = await txt.jsonValue();

        await console.log(rawTxt);
    }

    while (!(rawTxt.replace(/[^a-zA-Z ]/g, "").toLowerCase().includes("senior career"))) { // Remove all special characters, and make it lowercase.
        [seniorCareer] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[' + i + "]");   

        var txt = await seniorCareer.getProperty('textContent');
        var rawTxt = await txt.jsonValue();

        var splitLines = rawTxt.split('\n'); // Certain players with political careers have non-straightforward table xpaths, e.g. Platini & Lato.

        console.log(i + ": " + rawTxt)
            
        if ((splitLines.length > 1) && ((rawTxt.replace(/[^a-zA-Z ]/g, "").toLowerCase().includes("senior career")))) {
            console.log(i);
            var [team] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[' + i + "]" + "/td/table/tbody/tr[" + j + "]");   

            while (true) {
                await j++;

                [team] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[' + i + "]" + "/td/table/tbody/tr[" + j + "]");   

                if (team == null) {
                    break;
                }

                var teamTxt = await team.getProperty('textContent');
                var rawTeamTxt = await teamTxt.jsonValue();

                if (rawTeamTxt.split("\n").length === 4 && (!(rawTeamTxt.split("\n").includes("Years")) && (!(rawTeamTxt.split("\n").includes("Total"))))) {
                    console.log(rawTeamTxt.split("\n")[0] + ": " + rawTeamTxt.split("\n")[1]);
                }
            }
        }

        await i++
    }

    await browser.close();
}

scrapeClubs();