SGN = require '../sgn'

module.exports =
    key: 'sgn-'

    storage: do ->
        try
            storage = window.localStorage

            storage["#{@key}test-storage"] = 'foobar'
            delete storage["#{@key}test-storage"]

            storage
        catch
            {}

    get: (key) ->
        try
            JSON.parse @storage["#{@key}#{key}"]

    set: (key, value) ->
        try
            @storage["#{@key}#{key}"] = JSON.stringify value

        @
