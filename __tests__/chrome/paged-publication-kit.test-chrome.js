const PPPath = `file:${__dirname}/../../examples/paged-publication.html`;

const newIncognitoPage = async (route) => {
    const page = await (await browser.newContext()).newPage();
    await page.goto(route);
    return page;
};

describe('Chrome: Paged Publication', () => {
    it('Should display "Make your PDF alive with ShopGun." text on page', async () => {
        const page = await newIncognitoPage(PPPath);

        expect(
            await page.$eval('body', (el) =>
                /Make your PDF alive with ShopGun./.test(el.innerText)
            )
        ).toBe(true);
    });

    it('Should load with the intro active', async () => {
        const page = await newIncognitoPage(PPPath);

        await expect(page).toHaveSelector('#intro[data-active="true"]');
    });

    it('Should go to next page when clicking the next page thingie', async () => {
        const page = await newIncognitoPage(PPPath);

        await expect(page).toHaveSelector('#intro[data-active="true"]');
        await page.click('.sgn-pp__control[data-direction="next"]');
        await expect(page).not.toHaveSelector('#intro[data-active="true"]');
        await expect(page).toHaveSelector(
            '[data-active="true"][data-id="double-0"]'
        );
    });
});
