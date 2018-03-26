puppeteer = require('puppeteer')
path = require('path')

describe 'Chrome: Paged Publication', ->
    beforeAll ->
        await page.goto "file:#{path.join __dirname, '..', '..', '..', 'dist', 'paged-publication.html'}"

    it 'should display "Make your PDF alive with ShopGun." text on page', ->
        await expect(page).toMatch 'Make your PDF alive with ShopGun.'

    it 'should load with the intro active', ->
        await expect(page).toMatchElement('#intro[data-active="true"]')

    it 'should go to next page when clicking the next page thingie', ->
        await expect(page).toClick '.sgn-pp__control[data-direction="next"]'
        await expect(page).not.toMatchElement '#intro[data-active="true"]'
        await expect(page).toMatchElement '[data-active="true"][data-id="double-0"]'
