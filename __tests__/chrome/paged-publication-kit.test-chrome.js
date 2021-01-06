const path = require('path');

describe('Chrome: Paged Publication', function () {
    beforeAll(
        async () =>
            await page.goto(
                `file:${path.join(
                    __dirname,
                    '..',
                    '..',
                    'dist',
                    'paged-publication.html'
                )}`
            )
    );

    it('Should display "Make your PDF alive with ShopGun." text on page', async function () {
        await expect(page).toMatch('Make your PDF alive with ShopGun.');
    });

    it('Should load with the intro active', async function () {
        await expect(page).toMatchElement('#intro[data-active="true"]');
    });

    it('Should go to next page when clicking the next page thingie', async function () {
        await expect(page).toClick('.sgn-pp__control[data-direction="next"]');
        await expect(page).not.toMatchElement('#intro[data-active="true"]');
        await expect(page).toMatchElement(
            '[data-active="true"][data-id="double-0"]'
        );
    });
});
