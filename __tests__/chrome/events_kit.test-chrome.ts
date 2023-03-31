/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />

describe('SGN.EventsKit', () => {
    test('Dispatched Paged Publication Opened events become /sync requests eventually', async () => {
        const eventsSent: any[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (
                interceptedRequest.url().endsWith('/sync') &&
                interceptedRequest.method() === 'POST'
            ) {
                eventsSent.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(
            `file:${__dirname}/../../examples/paged-publication.html`
        );

        await page.waitForLoadState('load');
        await page.waitForTimeout(8000);

        expect(eventsSent.length).toBeGreaterThan(0);
        expect(eventsSent.filter(({_e}) => _e === 1).length).toBe(1);
    });
    test('Dispatched Incito Publication Opened events become /sync requests eventually', async () => {
        const response = await fetch(
            'https://squid-api.tjek.com/v2/catalogs?limit=1&types=incito'
        );
        const id = (await response.json())?.[0]?.id;

        const eventsSent: any[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (interceptedRequest.url().endsWith('/sync')) {
                eventsSent.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(
            `file:${__dirname}/../../examples/incito-publication.html?id=${id}`
        );

        await page.waitForLoadState('load');
        await page.waitForTimeout(8000);

        expect(eventsSent.length).toBeGreaterThan(0);
        expect(eventsSent.filter(({_e}) => _e === 11).length).toBe(1);
    });
    test('Dispatched Paged Publication Opened events become /sync requests on page close', async () => {
        const eventsSent: any[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (interceptedRequest.url().endsWith('/sync')) {
                eventsSent.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(
            `file:${__dirname}/../../examples/paged-publication.html`
        );
        await page.waitForLoadState('load');
        await page.waitForTimeout(1000);
        await page.close({runBeforeUnload: true});
        await new Promise((y) => setTimeout(y, 1000));

        expect(eventsSent.length).toBeGreaterThan(0);
        expect(eventsSent.filter(({_e}) => _e === 1).length).toBe(1);
    });
    test('Dispatched Incito Publication Opened events become /sync requests on page close', async () => {
        const response = await fetch(
            'https://squid-api.tjek.com/v2/catalogs?limit=1&types=incito'
        );
        const id = (await response.json())?.[0]?.id;

        const eventsSent: any[] = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (interceptedRequest.url().endsWith('/sync')) {
                eventsSent.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(
            `file:${__dirname}/../../examples/incito-publication.html?id=${id}`
        );
        await page.waitForLoadState('load');
        await page.waitForTimeout(1000);
        await page.close({runBeforeUnload: true});
        await new Promise((y) => setTimeout(y, 1000));

        expect(eventsSent.length).toBeGreaterThan(0);
        expect(eventsSent.filter(({_e}) => _e === 11).length).toBe(1);
    });
});
