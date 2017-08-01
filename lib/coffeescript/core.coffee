config = require './config'
util = require './util'

# Set default values.
config.set
    locale: 'en_US'
    coreUrl: 'https://api.etilbudsavis.dk'
    graphUrl: 'https://graph.service.shopgun.com'
    eventsTrackUrl: 'https://events.service.shopgun.com/track'
    eventsPulseUrl: 'wss://events.service-staging.shopgun.com/pulse'
    assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'

module.exports =
    config: config

    util: util
