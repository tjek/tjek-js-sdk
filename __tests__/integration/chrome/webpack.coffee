webpackCompiler = require './webpack-compiler'


describe 'Chrome + Webpack', ->
    it 'Webpack compiles it and chrome runs it', ->
        inputCode = "var SGN = require('./dist/sgn-sdk.js'); console.log(SGN);"
        bundleCode = await webpackCompiler(inputCode)
        await page.evaluate(bundleCode)

