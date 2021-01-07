import fetch from 'cross-fetch';
import Gator from '../../../vendor/gator';
import SGN from '../../sgn-sdk';
import * as clientLocalStorage from '../../storage/client-local';
import {error, getDeviceCategory, getOrientation, getPointer} from '../../util';
import request from '../core/request';
import Controls from './controls';
import Viewer from './viewer';

export default class Bootstrapper {
    constructor(options = {}) {
        this.fetchDetails = this.fetchDetails.bind(this);
        this.options = options;
        this.deviceCategory = this.getDeviceCategory();
        this.pixelRatio = this.getPixelRatio();
        this.pointer = this.getPointer();
        this.orientation = this.getOrientation();
        this.time = this.getTime();
        this.locale = this.getLocale();
        this.maxWidth = this.getMaxWidth();
        this.featureLabels = this.getFeatureLabels();
        this.versionsSupported = ['1.0.0'];
    }

    getDeviceCategory() {
        return getDeviceCategory();
    }

    getPixelRatio() {
        return window.devicePixelRatio || 1;
    }

    getPointer() {
        return getPointer();
    }

    getOrientation() {
        let orientation = getOrientation(screen.width, screen.height);
        if (orientation === 'quadratic') {
            orientation = 'horizontal';
        }

        return orientation;
    }

    getTime() {
        return new Date().toISOString();
    }

    getLocale() {
        let localeChain = [];
        let locale = null;

        if (
            Array.isArray(navigator.languages) &&
            navigator.languages.length > 0
        ) {
            localeChain = localeChain.concat(navigator.languages);
        } else if (
            typeof navigator.language === 'string' &&
            navigator.language.length > 0
        ) {
            localeChain.push(navigator.language);
        } else if (
            typeof navigator.browserLanguage === 'string' &&
            navigator.browserLanguage.length > 0
        ) {
            localeChain.push(navigator.browserLanguage);
        }

        localeChain.push('en_US');

        for (let prefLocale of localeChain) {
            if (prefLocale == null) {
                continue;
            }

            prefLocale = prefLocale.replace('-', '_');

            if (/[a-z][a-z]_[A-Z][A-Z]/g.test(prefLocale)) {
                locale = prefLocale;

                break;
            }
        }

        return locale;
    }

    getMaxWidth() {
        if (Math.abs(window.orientation) === 90) {
            return Math.min(this.options.el.offsetWidth, screen.width);
        } else {
            return this.options.el.offsetWidth;
        }
    }

    getFeatureLabels() {
        let featureLabels = clientLocalStorage.get('incito-feature-labels');
        if (Array.isArray(featureLabels) === false) {
            featureLabels = [];
        }

        return featureLabels;
    }

    anonymizeFeatureLabels() {
        const count = this.featureLabels.length;
        const vector = this.featureLabels.reduce((acc, cur) => {
            if (!acc[cur]) {
                acc[cur] = {
                    key: cur,
                    value: 0
                };
            }

            acc[cur].value++;

            return acc;
        }, {});

        return Object.values(vector).map((featureLabel) => ({
            key: featureLabel.key,
            value: Math.round((featureLabel.value / count) * 100) / 100
        }));
    }

    fetch(callback) {
        this.fetchDetails(this.options.id, (err, details) => {
            if (err != null) {
                return callback(err);
            }
            this.fetchIncito(details.incito_publication_id, (err1, incito) => {
                if (err1 != null) {
                    return callback(err1);
                }
                callback(null, {
                    details,
                    incito
                });
            });
        });
    }

    fetchDetails(id, callback) {
        request({url: `/v2/catalogs/${this.options.id}`}, callback);
    }

    fetchIncito(id, callback) {
        const res = fetch(
            SGN.config.get('coreUrl') +
                '/v4/rpc/generate_incito_from_publication',
            {
                method: 'post',
                headers: {
                    'X-Api-Key': SGN.config.get('appKey'),
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    id,
                    device_category: this.deviceCategory,
                    pointer: this.pointer,
                    orientation: this.orientation,
                    pixel_ratio: this.pixelRatio,
                    max_width: this.maxWidth,
                    versions_supported: this.versionsSupported,
                    locale_code: this.locale,
                    time: this.time,
                    feature_labels: this.anonymizeFeatureLabels(
                        this.featureLabels
                    )
                })
            }
        );

        res.then((response) => response.json())
            .then((incito) => callback(null, incito))
            .catch((err) => callback(err));
    }

    createViewer(data) {
        if (data.incito == null) {
            throw error(
                new Error(),
                'You need to supply valid Incito to create a viewer'
            );
        }

        const viewer = new Viewer(this.options.el, {
            id: this.options.id,
            details: data.details,
            incito: data.incito,
            eventTracker: this.options.eventTracker
        });
        // Awfully this Controls instance is destroyed implicitly
        // via the `destroyed` event of Viewer.
        new Controls(viewer);
        const self = this;

        // Persist clicks on feature labels for later anonymization.
        Gator(viewer.el).on(
            'click',
            '.incito__view[data-feature-labels]',
            function () {
                const featureLabels = this.getAttribute(
                    'data-feature-labels'
                ).split(',');

                self.featureLabels = self.featureLabels.concat(featureLabels);

                while (self.featureLabels.length > 1000) {
                    self.featureLabels.shift();
                }

                clientLocalStorage.set(
                    'incito-feature-labels',
                    self.featureLabels
                );
            }
        );

        return viewer;
    }
}
