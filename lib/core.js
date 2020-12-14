const Config = require('./config');
const translations = require('./translations');
const util = require('./util');
const config = new Config();

// Set default values.
config.set({
    locale: 'en_US',
    coreUrl: 'https://squid-api.tjek.com',
    eventsTrackUrl: 'https://wolf-api.tjek.com/sync'
});

module.exports = {
    config,

    translations,

    util
};
