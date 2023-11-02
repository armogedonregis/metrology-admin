import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';
import { ICompany } from './type/type';

let items: ICompany[] = []
let number: number = 0;
let id = 0;

export default function ParserFunc(url: string, path: string) {
    (async () => {
        const browser = await puppeteer.launch({ headless: 'new' })
        const page = await browser.newPage();
        await page.goto(url);
        const mapsHandles = await page.$$('body > div.siteContent > div.mainRating > div > table > tbody > tr');

        for (const mapshandle of mapsHandles) {
            let title = "";
            let finalRating = "";
            let email = "";
            let img = "";
            let goodRating = "";
            let fastRating = "";
            let lowRating = "";
            let oficialPrice = "";
            let peoplePrice = "";
            let ratingPrice = "";
            let attestat = "";
            let dateSend = "";
            let review = "";
            let requestCount = "";
            try {
                img = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbLogo > a > img").getAttribute("data-basicimg"), mapshandle
                );

            } catch (error) { }
            try {
                title = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbName > a").textContent, mapshandle
                );

                id += 1;

                const titleUrl = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbName > a").href, mapshandle
                );
                const pages = await browser.newPage();
                await pages.goto(titleUrl, { waitUntil: 'load' });

                const searchEmail = await pages.$$('body > div.siteContent > div.aboutCompany > div > div.aboutCompanyInfo > div.aboutCompanyData');

                try {
                    email = await pages.evaluate(
                        (el: any) => el.querySelector('.mail').href, searchEmail[0]
                    );
                    number += 1;
                    console.log(number, title, email);

                } catch (error) { }

            } catch (error) { }
            try {
                finalRating = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbRate1 > span").textContent, mapshandle
                );
            } catch (error) { }
            try {
                goodRating = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbRate2").textContent, mapshandle
                );
            } catch (error) { }
            try {
                fastRating = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbRate3").textContent, mapshandle
                );
            } catch (error) { }
            try {
                lowRating = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbRate4").textContent, mapshandle
                );
            } catch (error) { }
            try {
                oficialPrice = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbPrice1").textContent, mapshandle
                );
            } catch (error) { }
            try {
                peoplePrice = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbPrice2").textContent, mapshandle
                );
            } catch (error) { }
            try {
                ratingPrice = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbPrice3").textContent, mapshandle
                );
            } catch (error) { }
            try {
                attestat = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbAttest").textContent, mapshandle
                );
            } catch (error) { }
            try {
                dateSend = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbDate").textContent, mapshandle
                );
            } catch (error) { }

            try {
                review = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbReview > span").textContent, mapshandle
                );
            } catch (error) { }

            try {
                requestCount = await page.evaluate(
                    (el: any) => el.querySelector("tr > td.tbRequestCount").textContent, mapshandle
                );
            } catch (error) { }

            items.push({ id, img, email, title, finalRating, goodRating, fastRating, lowRating, oficialPrice, peoplePrice, ratingPrice, attestat, dateSend, review, requestCount });
        }
        fs.mkdir(`src/data/${path}`, async () => {
            fs.writeFile(`src/data/${path}/output.json`, JSON.stringify(items), async (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("File saved successfully");
    
                    // const imgList: any = fs.readFileSync('output.json');
                    fs.mkdir(`src/files/${path}`, async () => {
    
                        try {
                            items.map(async (item) => {
    
                                https.get(`${url}/${item.img}`, res => {
                                    const stream = fs.createWriteStream(`src/files/${path}/${item.img.substring(item.img.lastIndexOf('/') + 1)}`)
                                    res.pipe(stream);
                                    stream.on('finish', () => {
                                        stream.close()
                                    })
                                })
    
                            })
                        } catch (err) {
                            console.log(err)
                        }
                    });
                }
            })
        })
        await browser.close();
    })()
}