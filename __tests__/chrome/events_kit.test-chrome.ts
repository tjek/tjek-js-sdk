/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />

import {coreUrl} from '../../lib/config-defaults';
import {BaseEvent, WolfEvent} from '../../lib/kits/events/tracker';

const ipHtmlUrl = `file:${__dirname}/../../examples/incito-publication.html`;
const ppHtmlUrl = `file:${__dirname}/../../examples/paged-publication.html`;

describe('SGN.EventsKit', () => {
    test('Dispatched Paged Publication Opened events become /sync requests eventually', async () => {
        const events: (BaseEvent & WolfEvent)[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (request) => {
            if (request.url().endsWith('/sync')) {
                events.push(...request.postDataJSON().events);
            }
        });
        await page.goto(ppHtmlUrl);

        await page.waitForLoadState('load');
        await page.waitForTimeout(8000);

        expect(events.length).toBeGreaterThan(0);
        expect(events.filter((e) => e._e === 1).length).toBe(1);
    });
    test('Dispatched Incito Publication Opened events become /sync requests eventually', async () => {
        const response = await fetch(
            coreUrl + '/v2/catalogs?limit=1&types=incito'
        );
        const id = (await response.json())?.[0]?.id;

        const events: (BaseEvent & WolfEvent)[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (req) => {
            if (req.url().endsWith('/sync')) {
                events.push(...req.postDataJSON().events);
            }
        });
        await page.goto(`${ipHtmlUrl}?id=${id}`);

        await page.waitForLoadState('load');
        await page.waitForTimeout(8000);

        expect(events.length).toBeGreaterThan(0);
        expect(events.filter(({_e}) => _e === 11).length).toBe(1);
    });
    test('Dispatched Paged Publication Opened events become /sync requests on page close', async () => {
        const events: (BaseEvent & WolfEvent)[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (interceptedRequest.url().endsWith('/sync')) {
                events.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(ppHtmlUrl);
        await page.waitForLoadState('load');
        await page.waitForTimeout(1000);
        await page.close({runBeforeUnload: true});
        await new Promise((y) => setTimeout(y, 1000));

        expect(events.length).toBeGreaterThan(0);
        expect(events.filter(({_e}) => _e === 1).length).toBe(1);
    });
    test('Dispatched Incito Publication Opened events become /sync requests on page close', async () => {
        const response = await fetch(
            coreUrl + '/v2/catalogs?limit=1&types=incito'
        );
        const id = (await response.json())?.[0]?.id;

        const eventsSent: (BaseEvent & WolfEvent)[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (interceptedRequest.url().endsWith('/sync')) {
                eventsSent.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(`${ipHtmlUrl}?id=${id}`);
        await page.waitForLoadState('load');
        await page.waitForTimeout(1000);
        await page.close({runBeforeUnload: true});
        await new Promise((y) => setTimeout(y, 1000));

        expect(eventsSent.length).toBeGreaterThan(0);
        expect(eventsSent.filter(({_e}) => _e === 11).length).toBe(1);
    });
});
