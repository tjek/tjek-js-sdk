SGN = require '../dist/sgn-sdk.js'

test 'isBrowser works right', ->
    expect(SGN.util.isBrowser()).toBeTruthy()
    expect(SGN.util.isNode()).toBeFalsy()

    return