const webpackCompiler = require('../../__tests_utils__/webpack-compiler');

jest.setTimeout(30000); // this could take a while

describe('Chrome + Webpack', () => {
    it('Webpack compiles it in development mode and chrome runs it', async () => {
        const inputCode =
            "var SGN = require('./dist/sgn-sdk.js'); console.log(SGN);";
        const bundleCode = await webpackCompiler(inputCode, {
            mode: 'development'
        });
        return await page.evaluate(bundleCode);
    });

    it('Webpack compiles it in production mode and chrome runs it', async () => {
        const inputCode =
            "var SGN = require('./dist/sgn-sdk.js'); console.log(SGN);";
        const bundleCode = await webpackCompiler(inputCode, {
            mode: 'production'
        });
        return await page.evaluate(bundleCode);
    });
});
