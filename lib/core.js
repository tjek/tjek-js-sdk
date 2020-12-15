const Config = require('./config');
const configDefaults = require('./configDefaults');
const translations = require('./translations');
const util = require('./util');
const config = new Config();

// Set default values.
config.set(configDefaults);

module.exports = {
    config,

    translations,

    util
};
