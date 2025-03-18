const puppeteer = require('puppeteer');

describe('Mi primer test en puppeteer', () => {
    it('Debe abrir y cerrar el navegador', async () => {
        const browser = await puppeteer.launch({
            headless: false, //Reveals or not the browser to see the test
            slowMo: 0, //Allows to run the tests slower
            devtools: false, //Runs the tests with the dev tools open
            //Allows to show the tab with the desired size
            // defaultViewport: {
            //     width: 2100,
            //     height: 1080,
            // }, 
            // args: ['--window-size=1920,1080'],
            defaultViewport: null,
            executablePath: '/usr/bin/google-chrome'
        });

        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector('img');

        //Reloads page
        await page.reload();
        await page.waitForSelector('img');

        //Navigation
        await page.goto('https://platzi.com');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector('body > main > header > div > figure > a > svg > g > path:nth-child(2)');

        //Navigation backwards and forward
        await page.goBack();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector('img');
        await page.goForward();
        await new Promise(resolve => setTimeout(resolve, 1000));

        //Open a new page
        const page2 = await browser.newPage()
        await page2.goto('https://github.com/')
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page2.waitForSelector('body > div.logged-out.env-production.page-responsive.header-overlay.header-overlay-fixed.js-header-overlay-fixed > div.position-relative.header-wrapper.js-header-wrapper > header > div > div.d-flex.flex-justify-between.flex-items-center.width-full.width-lg-auto > a > svg');

        await browser.close();
    }, 10000);
});
