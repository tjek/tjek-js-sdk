Config = require './config'
translations = require './translations'
util = require './util'
config = new Config()

# Set default values.
config.set
    locale: 'en_US'
    coreUrl: 'https://squid-api.tjek.com'
    eventsTrackUrl: 'https://wolf-api.tjek.com/sync'

module.exports =
    config: config

    translations: translations

    util: util
