{ promiseCallbackInterop } = require '../lib/coffeescript/util'
testResult = { results: ['a result'] }
testError = { error: 'messed up' }
testFun1 = (callback) ->
    setTimeout(->
        callback(undefined, testResult)
    )
testFun1Error = (callback) ->
    setTimeout(->
        callback(testError)
    )
testFun2 = (shouldError, callback) ->
    setTimeout(->
        if shouldError
        then callback(testError)
        else callback(undefined, testResult)
    )
testFun3 = (shouldError, callback, somethingElseWeWontUse) ->
    setTimeout(->
        if shouldError
        then callback(testError)
        else callback(undefined, testResult)
    )
testFun4 = (shouldError, derp, callback, somethingElseWeWontUse) ->
    setTimeout(->
        if shouldError
        then callback(testError)
        else callback(undefined, testResult)
    )

describe 'util: promiseCallbackInterOp', ->
    test 'works with a simple callback-only function', ->
        interopedFun = promiseCallbackInterop(testFun1)
        expect(interopedFun()).resolves.toEqual(testResult)

    test 'works with a simple callback-only function that errors', ->
        interopedFunThatErrors = promiseCallbackInterop(testFun1Error)
        expect(interopedFunThatErrors()).rejects.toEqual(testError)

    test 'works with a function that takes an option and callback', ->
        interopedFun = promiseCallbackInterop(testFun2)
        expect(interopedFun(false)).resolves.toEqual(testResult)

    test 'works with a function that takes an option and callback that errors', ->
        interopedFunThatErrors = promiseCallbackInterop(testFun2)
        expect(interopedFunThatErrors(true)).rejects.toEqual(testError)

    test 'accepts a callback position for functions that take options and a callback and options', ->
        interopedFun = promiseCallbackInterop(testFun3, 1)
        expect(interopedFun(false)).resolves.toEqual(testResult)

    test 'accepts a callback position for functions that take options and a callback and options that errors', ->
        interopedFunThatErrors = promiseCallbackInterop(testFun3, 1)
        expect(interopedFunThatErrors(true)).rejects.toEqual(testError)

    test 'accepts another callback position for functions that take options and a callback and options', ->
        interopedFun = promiseCallbackInterop(testFun4, 2)
        expect(interopedFun(false)).resolves.toEqual(testResult)

    test 'accepts another callback position for functions that take options and a callback and options that errors', ->
        interopedFunThatErrors = promiseCallbackInterop(testFun4, 2)
        expect(interopedFunThatErrors(true)).rejects.toEqual(testError)

    test 'cb: works with a simple callback-only function', (done) ->
        interopedFun = promiseCallbackInterop(testFun1)
        interopedFun((err, res) ->
            expect(res).toEqual(testResult)
            done()
        )

    test 'cb: works with a simple callback-only function that errors', (done) ->
        interopedFun = promiseCallbackInterop(testFun1Error)
        interopedFun((err, res) ->
            expect(err).toEqual(testError)
            done()
        )

    test 'cb: orks with a function that takes an option and callback',
        (done) ->
            interopedFun = promiseCallbackInterop(testFun2)
            interopedFun(false, (err, res) ->
                expect(res).toEqual(testResult)
                done()
            )

    test 'cb: works with a function that takes an option and callback that errors',
        (done) ->
            interopedFunThatErrors = promiseCallbackInterop(testFun2)
            interopedFunThatErrors(true, (err, res) ->
                expect(err).toEqual(testError)
                done()
            )

    test 'cb: accepts a callback position for functions that take options and a callback and options',
        (done) ->
            interopedFun = promiseCallbackInterop(testFun3, 1)
            interopedFun(false, (err, res) ->
                expect(res).toEqual(testResult)
                done()
            )

    test 'cb: accepts a callback position for functions that take options and a callback and options that errors',
        (done) ->
            interopedFunThatErrors = promiseCallbackInterop(testFun3, 1)
            interopedFunThatErrors(true, (err, res) ->
                expect(err).toEqual(testError)
                done()
            )

    test 'cb: accepts another callback position for functions that take options and a callback and options',
        (done) ->
            interopedFun = promiseCallbackInterop(testFun4, 2)
            interopedFun(false, undefined, (err, res) ->
                expect(res).toEqual(testResult)
                done()
            )

    test 'cb: accepts another callback position for functions that take options and a callback and options that errors',
        (done) ->
            interopedFunThatErrors = promiseCallbackInterop(testFun4, 2)
            interopedFunThatErrors(true, undefined, (err, res) ->
                expect(err).toEqual(testError)
                done()
            )
