import Config from './config'
import * as translations from './translations'
import * as util from './util'

config = new Config()

# Set default values.
config.set
    locale: 'en_US'
    coreUrl: 'https://api.etilbudsavis.dk'
    graphUrl: 'https://graph.service.shopgun.com'
    eventsTrackUrl: 'https://events.service.shopgun.com/sync'
    eventsPulseUrl: 'wss://events.service.shopgun.com/pulse'
    assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'

export default
    config: config

    translations: translations

    util: util
