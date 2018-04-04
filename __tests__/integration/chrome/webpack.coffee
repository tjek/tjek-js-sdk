webpackCompiler = require './webpack-compiler'


describe 'Chrome + Webpack', ->
    it 'Webpack compiles it in development mode and chrome runs it', ->
        inputCode = "var SGN = require('./dist/sgn-sdk.js'); console.log(SGN);"
        bundleCode = await webpackCompiler(inputCode, { mode: 'development' })
        await page.evaluate(bundleCode)
