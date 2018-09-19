webpackCompiler = require './webpack-compiler'

jest.setTimeout 30000 # this could take a while

describe 'Chrome + Webpack', ->
    it 'Webpack compiles it in development mode and chrome runs it', ->
        inputCode = "var SGN = require('./dist/sgn-sdk.js'); console.log(SGN);"
        bundleCode = await webpackCompiler(inputCode, { mode: 'development' })
        await page.evaluate(bundleCode)
        
    it 'Webpack compiles it in production mode and chrome runs it', ->
        inputCode = "var SGN = require('./dist/sgn-sdk.js'); console.log(SGN);"
        bundleCode = await webpackCompiler(inputCode, { mode: 'production' })
        await page.evaluate(bundleCode)
