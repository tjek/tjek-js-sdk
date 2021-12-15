const path = require('path');

const sgnPath = `file:${path.join(__dirname, './sgn.test-chrome.html')}`;

describe('Chrome: SGN singleton behavior', () => {
    let page;
    beforeEach(async () => {
        page = await browser.newPage();
        page.on('console', (consoleObj) =>
            console.log('console:', consoleObj.text())
        );
        page.on('pageerror', (err) =>
            console.log('Page error:', err.toString())
        );
        page.on('error', (err) => console.log('Error:', err.toString()));
        await page.goto(sgnPath);
    });
    it('Magic API key config from script tag', async () => {
        const srcAppKey = await page.evaluate(
            () => document.querySelector('[data-api-key]').dataset.apiKey
        );
        const cfgAppKey = await page.evaluate(() =>
            window.SGN.config.get('appKey')
        );
        expect(srcAppKey).toMatch(cfgAppKey);
    });
    it('Magic EventTracker creation & config from script tag', async () => {
        const srcTrackId = await page.evaluate(
            () => document.querySelector('[data-track-id]').dataset.trackId
        );
        const cfgTrackId = await page.evaluate(
            () => window.SGN.config.get('eventTracker').trackId
        );

        expect(srcTrackId).toMatch(cfgTrackId);
    });
});
