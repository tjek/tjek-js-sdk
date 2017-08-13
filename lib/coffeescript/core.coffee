Config = require './config'
i18n = require './i18n'
util = require './util'
config = new Config()

# Set default values.
config.set
    locale: 'en_US'
    coreUrl: 'https://api.etilbudsavis.dk'
    graphUrl: 'https://graph.service.shopgun.com'
    eventsTrackUrl: 'https://events.service.shopgun.com/track'
    eventsPulseUrl: 'wss://events.service.shopgun.com/pulse'
    assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'

module.exports =
    config: config

    i18n: i18n

    util: util
