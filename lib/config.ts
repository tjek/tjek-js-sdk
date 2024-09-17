import MicroEvent from '../vendor/microevent';
import * as configDefaults from './config-defaults';

class Config extends MicroEvent<{change: [Record<string, any>]}> {
    keys = ['apiKey', 'eventTracker', 'coreUrl', 'eventsTrackUrl'] as const;
    _attrs = {...configDefaults};

    set(config: Record<string, any>) {
        const changedAttributes = {};

        for (let key in config) {
            if (key === 'appKey') key = 'apiKey';
            if (this.keys.includes(key as (typeof this.keys)[number])) {
                this._attrs[key] = config[key];
                changedAttributes[key] = config[key];
            }
        }

        this.trigger('change', changedAttributes);
    }

    get<T>(option: string): T {
        if (option === 'appKey') option = 'apiKey';
        return this._attrs[option];
    }

    shadow<T extends Record<string, any> = Record<string, any>>(
        optionsObject?: T
    ): T & Record<(typeof this.keys)[number], string> {
        const optionsWithConfig = {...optionsObject};
        this.keys.forEach((key) => {
            const get = () => optionsObject?.[key] || this.get(key);
            Object.defineProperty(optionsWithConfig, key, {get});
        });

        return optionsWithConfig as T &
            Record<(typeof this.keys)[number], string>;
    }
}

export default Config;
