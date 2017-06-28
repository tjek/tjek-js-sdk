attrs = {}
keys = [
    'appVersion',
    'appKey',
    'appSecret',
    'authToken',
    'eventTracker',
    'locale'
]

module.exports =
    set: (config = {}) ->
        for key, value of config
            attrs[key] = value if key in keys

        return

    get: (option) ->
        attrs[option]
