import Config from './config'
import * as translations from './translations'
import * as util from './util'
import * as configDefaults from './configDefaults'

config = new Config()

# Set default values.
config.set configDefaults

export default
    config: config

    translations: translations

    util: util
