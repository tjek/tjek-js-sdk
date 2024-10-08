import {IIncito} from '../../incito-browser/types';
import * as clientLocalStorage from '../../storage/client-local';
import {error, on} from '../../util';
import {V2Catalog} from '../core';
import request from '../core/request';
import {Tracker} from '../events';
import Controls from './controls';
import Viewer from './viewer';

function getDeviceCategory() {
    if (navigator.platform === 'iPod' || navigator.platform === 'iPhone')
        return 'mobile';

    if (navigator.platform === 'iPad') return 'tablet';

    if (
        navigator.platform === 'Android' ||
        /android/gi.test(navigator.userAgent)
    ) {
        if (/tablet/gi.test(navigator.userAgent)) return 'tablet';

        return 'mobile';
    }

    return 'desktop';
}
function getLocale() {
    const localeChain: string[] = [];

    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
        localeChain.push(...navigator.languages);
    } else if (typeof navigator.language === 'string' && navigator.language) {
        localeChain.push(navigator.language);
    } else if (
        // @ts-expect-error
        typeof navigator.browserLanguage === 'string' && // @ts-expect-error
        navigator.browserLanguage
    ) {
        // @ts-expect-error
        localeChain.push(navigator.browserLanguage);
    }

    localeChain.push('en_US');

    return localeChain.find((prefLocale) => {
        if (!prefLocale) return;

        prefLocale = prefLocale.replace('-', '_');

        if (/[a-z][a-z]_[A-Z][A-Z]/g.test(prefLocale)) return prefLocale;
    });
}

interface BootstrapperInit {
    el: HTMLElement;
    id?: string;
    apiKey?: string;
    coreUrl?: string;
    eventTracker?: Tracker;
}
export default class Bootstrapper {
    deviceCategory = getDeviceCategory();
    pixelRatio = window.devicePixelRatio || 1;
    pointer = matchMedia('(pointer:coarse)').matches ? 'coarse' : 'fine';
    orientation = screen.width >= screen.height ? 'horizontal' : 'vertical';
    time = new Date().toISOString();
    locale = getLocale();
    featureLabels = this.getFeatureLabels();
    versionsSupported = ['1.0.0'];
    enableLazyLoading = false;
    scrollableContainer: string;
    options: BootstrapperInit;
    maxWidth: number;
    // @ts-expect-error
    constructor(options: BootstrapperInit = {}) {
        this.options = options;
        this.maxWidth =
            Math.abs(window.orientation) === 90
                ? Math.min(this.options.el.offsetWidth, screen.width)
                : this.options.el.offsetWidth;
    }

    getFeatureLabels() {
        const regex = new RegExp(/tjek_audience=[^#&;+]+/);
        const match = regex.exec(location.href) || [];
        let feature: string[];

        if (match.length > 0) {
            feature =
                match[0] !== undefined
                    ? match[0].replace('tjek_audience=', '').split(',')
                    : ['none'];
        } else if (localStorage.getItem('tjek_audience') !== null) {
            feature = localStorage.getItem('tjek_audience')?.split(',') || [
                'none'
            ];
        } else {
            const cookie = regex.exec(document.cookie) || [];
            feature =
                cookie[0] !== undefined
                    ? cookie[0].replace('tjek_audience=', '').split(',')
                    : ['none'];
        }

        return feature;
    }

    anonymizeFeatureLabels() {
        const count = this.featureLabels.length;
        const vector = this.featureLabels.reduce((acc, cur) => {
            if (!acc[cur]) acc[cur] = {key: cur, value: 0};

            acc[cur].value++;

            return acc;
        }, {});

        return Object.values(vector).map((featureLabel: any) => ({
            key: featureLabel.key,
            value: Math.round((featureLabel.value / count) * 100) / 100
        }));
    }

    async fetch(
        callback?: (
            err: any,
            res?: {details: V2Catalog; incito: IIncito}
        ) => void
    ) {
        try {
            if (!this.options.id) {
                throw new Error(
                    'You need to supply a valid id to use Bootstrapper#fetch'
                );
            }

            const {0: details, 1: incito} = await Promise.all([
                this.fetchDetails(this.options.id),
                this.fetchIncito(this.options.id)
            ]);

            const data = {details, incito};

            if (typeof callback === 'function') callback(null, data);

            return data;
        } catch (err) {
            if (typeof callback === 'function') {
                callback(err);
            } else {
                throw err;
            }
        }
    }

    fetchDetails = (
        id: string,
        callback?: (error: Error | null, result?: V2Catalog) => void
    ) =>
        request<V2Catalog>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: `/v2/catalogs/${id}`
            },
            callback
        );

    fetchIncito = (
        id: string,
        callback?: (error: Error | null, result?: IIncito) => void
    ) =>
        request<IIncito>(
            {
                apiKey: this.options.apiKey,
                coreUrl: this.options.coreUrl,
                url: '/v4/rpc/generate_incito_from_publication',
                method: 'post',
                headers: {'Content-Type': 'application/json'},
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
                        // @ts-expect-error
                        this.featureLabels
                    ),
                    enable_lazy_loading: this.enableLazyLoading
                })
            },
            callback
        );

    createViewer({details, incito}: {details?: V2Catalog; incito: IIncito}) {
        const self = this;

        if (!incito) {
            throw error(
                new Error(
                    'You need to supply a valid Incito to create a viewer'
                )
            );
        }

        const viewer = new Viewer(
            this.options.el,
            {
                details,
                incito,
                eventTracker: this.options.eventTracker
            },
            this.scrollableContainer
        );
        const controls = new Controls(viewer);

        viewer.incito.bind('destroyed', controls.destroy);

        // Persist clicks on feature labels for later anonymization.
        on(
            viewer.el,
            'click',
            '.incito__view[data-feature-labels]',
            function () {
                const featureLabels = this.dataset.featureLabels.split(',');

                self.featureLabels = self.featureLabels.concat(featureLabels);

                while (self.featureLabels.length > 1000)
                    self.featureLabels.shift();

                clientLocalStorage.set(
                    'incito-feature-labels',
                    self.featureLabels
                );
            }
        );

        return viewer;
    }
}
