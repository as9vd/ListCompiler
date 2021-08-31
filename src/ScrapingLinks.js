const puppeteer = require('puppeteer');
var jsonData = require("/Users/asadbekshamsiev/Desktop/JavaScraping/WorldFootball.json");
const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs')
var userAgent = require('user-agents');

process.setMaxListeners(0);
let wikiLinks = [];
let playerNames =[];
let wfLinks = [];
let teamYearsFormat = [{
    "clubs": [
        {
            "team":"Team A",
            "years":"19xx-19xx",
        }
    ]
}];

async function scrapeLinksWiki() {
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
        console.log(jsonData[data]["wiki"]);

        await i++
    }
}

async function scrapeLinksWF() {
    puppeteerExtra.use(pluginStealth());

    let counter = await 0;

    for (var data in jsonData) {
        let url = await "https://www.google.com/search?q=" + data + " WorldFootball.net";

        if (data === "Oleksiy Mykhaylychenko") { // Miko is a special case.
            url = await "https://www.google.com/search?q=Aleksey Mikhaylichenko WorldFootball.net";
        }
            
        var browser = await puppeteer.launch({
            executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            headless: false
        });
        var page = await browser.newPage();
        // await page.setUserAgent( "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36");
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

        if (!(rawTxt.includes("worldfootball.net"))) {
            [link] = await page.$x('//*[@id="rso"]/div[1]/div/div/div[1]/a');
        }

        if (!(rawTxt.includes("worldfootball.net"))) {
            [link] = await page.$x('//*[@id="rso"]/div[1]/div/div/div/div/div/div[1]/a');
        }

        if (!(rawTxt.includes("worldfootball.net"))) {
            [link] = await page.$x('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div/div[1]/a');
        }

        if (!(rawTxt.includes("worldfootball.net"))) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[1]/div/div/div/div/div/div/div/div[1]/a');
        }
        
        if (!(rawTxt.includes("worldfootball.net"))) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[2]/div/div/div/div/div/div/div/div[1]/a');
        }

        if (!(rawTxt.includes("worldfootball.net"))) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[2]/div/div/div/div/div/div/div/div/div/div/div[1]/a');
        }

        if (!(rawTxt.includes("worldfootball.net"))) {
            [link] = await page.$x('//*[@id="kp-wp-tab-overview"]/div[3]/div/div/div/div/div/div/div/div[1]/a');
        }

        txt = await link.getProperty('href');
        rawTxt = await txt.jsonValue();

        await wfLinks.push(rawTxt);
        await playerNames.push(data);

        console.log(data);

        if (counter > 0 && counter % 2 == 0) {
            console.log(wfLinks[counter]);
            for (let x = counter - 2; x < counter; await x++) {
                await fs.appendFile('../SavedLinks.txt', wfLinks[x] + " - " + playerNames[x] + "\n", (err) => { // Add the name of the footballer to this shyt.
                    if (err) throw err;
                })
            }
        }

        await browser.close();

        await counter++;
    }

    let i = await 0;

    for (var data in jsonData) {
        jsonData[data]["wf"] = await wfLinks[i];
        console.log(jsonData[data]["wf"]);

        await i++
    }
}

async function scrapeClubsWiki() { // Find out what clubs a lad played for in the 80's (January 1st, 1980 - December 31st, 1989).
    let x = 1;
    let i = 1;
    let j = 1;

    let url = jsonData["Michel Platini"]['wiki'];
    // let url = jsonData["Igor Belanov"]['wiki'];

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    var [tableRow] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[1]'); 

    var txt = await tableRow.getProperty('textContent');
    var rawTxt = await txt.jsonValue()
    rawTxt = rawTxt.replace(/[^a-zA-Z ]/g, "").toLowerCase(); // Removing any special characters and making it lowercase.

    // Platini/Lato pages = one big table, and that table has a table row with the body containing clubs/etc. It contains the senior character shit.
    while (!(rawTxt.includes("senior career"))) {
        var [embeddedTable] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[' + i + "]"); // Done to loop through the xpath and find the "senior career".

        if (embeddedTable === null) {
            break;
        }

        txt = await embeddedTable.getProperty('textContent');
        rawTxt = await txt.jsonValue();

        // console.log(i + ": " + rawTxt);
        // rawTxt = rawTxt.replace(/[^a-zA-Z ]/g, "").toLowerCase();

        var splitLines = rawTxt.split('\n');

        console.log(splitLines);

        // if ((splitLines.length > 1) && ((rawTxt.includes("senior career")))) { // If the table row has the body we're looking for, then we can loop through that body.
        //     console.log("included");
        //     while (true) {
        //         var [tableRow] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[' + i + "]" + "/td/table/tbody/tr[" + j + "]"); // Going through the individual rows in the 2nd half of the table.

        //         if (tableRow == null) { // If we've looped through the embedded table and cannot find anything (e.g. it's a normal case).
        //             while (true) {
        //                 [tableRow] = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[' + x + ']');

        //                 console.log(tableRow);
        
        //                 // if (tableRow == null) {
        //                 //     break;
        //                 // }
        
        //                 txt = await tableRow.getProperty('textContent');
        //                 rawTxt = await txt.jsonValue();

        //                 console.log(rawTxt);
        
        //                 if (rawTxt.split("\n").length === 4 && (!(rawTxt.split("\n").includes("Years")) && (!(rawTxt.split("\n").includes("Total"))))) {
        //                     console.log(rawTxt.split("\n")[0] + ": " + rawTxt.split("\n")[1]);
        //                 }

        //                 await x++;
        //             }
        //         }

        //         await j++;
        //     }
        // } 
            
        await i++
    } 

    await browser.close();
}

scrapeLinksWF();