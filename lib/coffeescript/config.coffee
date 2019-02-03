import MicroEvent from 'microevent'

Config = class Config
    keys: [
        'appVersion',
        'appKey',
        'appSecret',
        'authToken',
        'eventTracker',
        'locale',
        'coreSessionToken',
        'coreSessionClientId',
        'coreUrl',
        'graphUrl',
        'eventsTrackUrl',
        'eventsPulseUrl',
        'assetsFileUploadUrl'
    ]

    constructor: ->
        @attrs = {}

        return

    set: (config = {}) ->
        changedAttributes = {}

        for key, value of config
            if key in @keys
                @attrs[key] = value
                changedAttributes[key] = value

        @trigger 'change', changedAttributes

        return

    get: (option) ->
        @attrs[option]

MicroEvent.mixin Config

export default Config
