webpackCompiler = require('./webpack-compiler')


describe 'Chrome + Webpack', ->
    it 'Webpack compiles it and chrome runs it', ->
        inputCode = "var SGN = require('./dist/sgn-sdk.js'); console.log(SGN);"
        bundledCode = await webpackCompiler(inputCode)
        a = await page.evaluate(bundledCode)
