Config = require './config'
translations = require './translations'
util = require './util'
config = new Config()

# Set default values.
config.set
    locale: 'en_US'
    coreUrl: 'https://api.etilbudsavis.dk'
    graphUrl: 'https://graph.service.shopgun.com'
    eventsTrackUrl: 'https://events.service.shopgun.com/sync'
    eventsPulseUrl: 'wss://events.service.shopgun.com/pulse'
    assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'

module.exports =
    config: config

    translations: translations

    util: util