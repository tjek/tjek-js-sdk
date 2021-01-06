import Config from './config';
import * as configDefaults from './configDefaults';
export * as translations from './translations';
export * as util from './util';
export const config = new Config();

// Set default values.
config.set(configDefaults);
