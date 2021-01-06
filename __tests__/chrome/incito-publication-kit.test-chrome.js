require('expect-puppeteer').setDefaultOptions({timeout: 2000});
const fetch = require('cross-fetch');

const PPPath = `file:${__dirname}/../../examples/incito-publication.html`;

describe('Chrome: Incito Publication', () => {
    let id, page;
    beforeAll(async () => {
        const response = await fetch(
            'https://squid-api.tjek.com/v2/catalogs?limit=1&types=incito'
        );
        id = (await response.json())?.[0]?.id;
    });
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(`${PPPath}?id=${id}`);
    });
    it('Example html loads', async () => {
        await expect(page).toMatchElement('.sgn__incito');
    });
    it('Viewer mounts', async () => {
        await expect(page).toMatchElement('.incito__view');
    });
    it('Offer details opens on offer view click', async () => {
        await expect(page).not.toMatchElement('.sgn-offer-details');
        await expect(page).toClick('[data-role="offer"]');
        await expect(page).toMatchElement('.sgn-offer-details');
    });
});
