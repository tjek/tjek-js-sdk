import {join} from 'path';
import type {EventTracker} from '../../lib/tjek-sdk';

declare global {
    interface Window {
        SGN: typeof import('./../../lib/sgn-sdk');
    }
}

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
        await page.goto(`file:${join(__dirname, './sgn.test-chrome.html')}`);
    });
    it('Magic API key config from script tag', async () => {
        const srcAppKey = await page.evaluate(
            () =>
                document.querySelector<HTMLElement>('[data-api-key]')?.dataset
                    .apiKey
        );
        const cfgAppKey = await page.evaluate(() =>
            window.SGN.config.get('appKey')
        );
        expect(srcAppKey).toMatch(cfgAppKey);
    });
    it('Magic EventTracker creation & config from script tag', async () => {
        const srcTrackId = await page.evaluate(
            () =>
                document.querySelector<HTMLElement>('[data-track-id]')?.dataset
                    .trackId
        );
        const cfgTrackId = await page.evaluate(
            () => window.SGN.config.get<EventTracker>('eventTracker')?.trackId
        );

        expect(srcTrackId).toMatch(cfgTrackId);
    });
});
