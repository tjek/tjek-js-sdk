const path = require('path');
page.setDefaultTimeout(2000);

const PPPath = `file:${path.join(
    __dirname,
    '..',
    '..',
    'dist',
    'paged-publication.html'
)}`;
const getPPPage = async () => {
    const page = await browser.newPage();
    await page.goto(PPPath);
    return page;
};

describe('Chrome: Paged Publication', () => {
    it('Should display "Make your PDF alive with ShopGun." text on page', async () => {
        const page = await getPPPage();
        await expect(page).toMatch('Make your PDF alive with ShopGun.');
    });

    it('Should load with the intro active', async () => {
        const page = await getPPPage();
        await expect(page).toMatchElement('#intro[data-active="true"]');
    });

    it('Should go to next page when clicking the next page thingie', async () => {
        const page = await getPPPage();
        await expect(page).toMatchElement('#intro[data-active="true"]');
        await expect(page).toClick('.sgn-pp__control[data-direction="next"]');
        await expect(page).not.toMatchElement('#intro[data-active="true"]');
        await expect(page).toMatchElement(
            '[data-active="true"][data-id="double-0"]'
        );
    });
});
