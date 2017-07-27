config = require './config'
util = require './util'

# Set default values.
config.set
    locale: 'en_US'
    coreUrl: 'https://api.etilbudsavis.dk'
    graphUrl: 'https://graph.service.shopgun.com'
    eventsTrackUrl: 'https://events.service.shopgun.com/track'
    assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'

module.exports =
    config: config

    util: util
