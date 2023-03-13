const PPPath = `file:${__dirname}/../../examples/paged-publication.html`;
const IPPath = `file:${__dirname}/../../examples/incito-publication.html`;

describe('SGN.EventsKit', () => {
    test('Dispatched Paged Publication Opened events become /sync requests', async () => {
        const eventsSent = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (
                interceptedRequest.url().endsWith('/sync') &&
                interceptedRequest.method() === 'POST'
            ) {
                eventsSent.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(PPPath);

        await page.waitForTimeout(9000);

        expect(eventsSent.length).toBeGreaterThan(0);
        expect(eventsSent.filter(({_e}) => _e === 1).length).toBe(1);
    });
    test('Dispatched Incito Publication Opened events become /sync requests', async () => {
        const response = await fetch(
            'https://squid-api.tjek.com/v2/catalogs?limit=1&types=incito'
        );
        const id = (await response.json())?.[0]?.id;

        const eventsSent = [];
        const page = await (await browser.newContext()).newPage();
        page.on('request', (interceptedRequest) => {
            if (
                interceptedRequest.url().endsWith('/sync') &&
                interceptedRequest.method() === 'POST'
            ) {
                eventsSent.push(...interceptedRequest.postDataJSON().events);
            }
        });
        await page.goto(`${IPPath}?id=${id}`);

        await page.waitForTimeout(9000);

        expect(eventsSent.length).toBeGreaterThan(0);
        expect(eventsSent.filter(({_e}) => _e === 11).length).toBe(1);
    });
});
