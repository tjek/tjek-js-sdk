import Config from './config'

config = new Config()

# Set default values.
config.set
    locale: 'en_US'
    coreUrl: 'https://api.etilbudsavis.dk'
    graphUrl: 'https://graph.service.shopgun.com'
    eventsTrackUrl: 'https://events.service.shopgun.com/track'
    eventsPulseUrl: 'wss://events.service.shopgun.com/pulse'
    assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'

export config = config

export default
    config: config
