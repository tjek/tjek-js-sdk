const MicroEvent = require('microevent');

class Config {
    constructor() {
        this.attrs = {};
    }

    set(config = {}) {
        const changedAttributes = {};

        for (let key in config) {
            const value = config[key];
            if (this.keys.includes(key)) {
                this.attrs[key] = value;
                changedAttributes[key] = value;
            }
        }

        this.trigger('change', changedAttributes);
    }

    get(option) {
        return this.attrs[option];
    }
}
Config.prototype.keys = [
    'appVersion',
    'appKey',
    'appSecret',
    'authToken',
    'eventTracker',
    'locale',
    'coreSessionToken',
    'coreSessionClientId',
    'coreUrl',
    'eventsTrackUrl'
];

MicroEvent.mixin(Config);

module.exports = Config;
