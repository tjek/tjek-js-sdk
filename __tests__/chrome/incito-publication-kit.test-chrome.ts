import fetch from 'cross-fetch';

const IPPath = `file:${__dirname}/../../examples/incito-publication.html`;

const newIncognitoPage = async (route) => {
    const page = await (await browser.newContext()).newPage();
    await page.goto(route);
    return page;
};

describe('Chrome: Incito Publication', () => {
    let id;
    beforeAll(async () => {
        const response = await fetch(
            'https://squid-api.tjek.com/v2/catalogs?limit=1&types=incito'
        );
        id = (await response.json())?.[0]?.id;
    });
    it('Example html loads', async () => {
        const page = newIncognitoPage(`${IPPath}?id=${id}`);

        await expect(page).toHaveSelector('.sgn__incito');
    });
    it('Viewer mounts', async () => {
        const page = newIncognitoPage(`${IPPath}?id=${id}`);

        await expect(page).toHaveSelector('.incito__view');
    }, 10000);
});
