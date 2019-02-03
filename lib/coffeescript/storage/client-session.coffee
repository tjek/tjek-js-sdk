prefixKey = 'sgn-'

storage = do ->
    try
        storage = window.sessionStorage

        storage["#{prefixKey}test-storage"] = 'foobar'
        delete storage["#{prefixKey}test-storage"]

        storage
    catch
        # Would be nice to have getter/setters on this object to console.warn
        # when failing to use sessionStorage.
        {}

export get = (key) ->
    try
        JSON.parse storage["#{prefixKey}#{key}"]

export set = (key, value) ->
    try
        storage["#{prefixKey}#{key}"] = JSON.stringify value
