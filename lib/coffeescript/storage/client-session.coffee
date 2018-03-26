SGN = require '../sgn'
prefixKey = 'sgn-'

module.exports =
    key: 'sgn-'

    storage: do ->
        try
            storage = window.sessionStorage

            storage["#{prefixKey}test-storage"] = 'foobar'
            delete storage["#{prefixKey}test-storage"]

            storage
        catch
            {}

    get: (key) ->
        try
            JSON.parse @storage["#{prefixKey}#{key}"]

    set: (key, value) ->
        try
            @storage["#{prefixKey}#{key}"] = JSON.stringify value

        @
