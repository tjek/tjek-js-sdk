import MicroEvent from 'microevent';
import * as configDefaults from './configDefaults';

class Config extends MicroEvent {
    attrs = {...configDefaults};

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

export default Config;
