import MicroEvent from 'microevent';
import * as configDefaults from './config-defaults';

class Config extends MicroEvent {
    #attrs = {...configDefaults};

    set(config) {
        const changedAttributes = {};

        for (let key in config) {
            if (key === 'appKey') key = 'apiKey';
            if (this.keys.includes(key)) {
                this.#attrs[key] = config[key];
                changedAttributes[key] = config[key];
            }
        }

        this.trigger('change', changedAttributes);
    }

    get(option) {
        if (option === 'appKey') option = 'apiKey';
        return this.#attrs[option];
    }

    shadow(optionsObject) {
        const optionsWithConfig = {...optionsObject};
        this.keys.forEach((key) => {
            const get = () => optionsObject?.[key] || this.get(key);
            Object.defineProperty(optionsWithConfig, key, {get});
        });

        return optionsWithConfig;
    }
}
Config.prototype.keys = ['apiKey', 'eventTracker', 'coreUrl', 'eventsTrackUrl'];

export default Config;
