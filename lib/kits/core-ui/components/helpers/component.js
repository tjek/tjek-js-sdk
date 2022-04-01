import Mustache from 'mustache';
import * as locales from '../../../../../locales';
import {ESC as EscKey} from '../../../../key-codes';

export const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export const destroyModal = () => {
    const pubContainer =
        document.querySelector('.sgn__pp') ||
        document.querySelector('.sgn__incito');
    const modalContainer = document.querySelector('.sgn-modal-container');

    pubContainer.focus();
    modalContainer?.parentNode?.removeChild(modalContainer);
};

export const createModal = (container, destroyCallback) => {
    const headNav = document.querySelector('.sgn__nav');
    const modalContainer = document.createElement('div');
    const blocker = document.createElement('div');

    blocker.className = 'sgn-blocker';
    insertAfter(headNav, modalContainer);
    modalContainer.className = 'sgn-modal-container';
    modalContainer.tabIndex = '-1';
    modalContainer.appendChild(blocker);
    modalContainer.appendChild(container);
    modalContainer.focus();

    const destroy = (e) => {
        e.stopPropagation();

        destroyModal();

        if (typeof destroyCallback === 'function') {
            destroyCallback(e);
        }
    };

    blocker.addEventListener('click', destroy, false);
    modalContainer.addEventListener('keyup', (e) => {
        if (e.keyCode === EscKey) {
            destroy(e);
        }
    });
};

export const formatPrice = (price, localeCode = 'en_US', currency = 'USD') => {
    return new Intl.NumberFormat(localeCode.replace('_', '-'), {
        style: 'currency',
        currency
    }).format(price);
};

export const formatDate = (dateStr, localeCode = 'en_US', options) => {
    const date = new Date(dateStr);

    return new Intl.DateTimeFormat(
        localeCode.replace('_', '-'),
        options
    ).format(date);
};

const getTranslationOverride = (dataset = {}) =>
    Object.entries(dataset).reduce((translationsKeyVal, {0: key, 1: value}) => {
        if (key.includes('translationKeys-')) {
            const newKey = key
                .replace('translationKeys-', '')
                .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                    index === 0 ? word.toLowerCase() : `_${word.toLowerCase()}`
                );

            translationsKeyVal[newKey] = value;
        }

        return translationsKeyVal;
    }, {});

export const translate = (key = '', view) => {
    const scriptEl = document.getElementById('sgn-sdk');
    const {dataset} = scriptEl;
    const browserLocale =
        navigator.language?.replace('-', '_')?.toLocaleLowerCase() || 'en_us';
    const locale = dataset?.localeCode
        ? dataset.localeCode.replace('-', '_').toLowerCase()
        : browserLocale;
    const translationOverride = getTranslationOverride(dataset);

    const localeTranslation =
        typeof locales[locale]?.[key] !== 'undefined'
            ? locales[locale]?.[key]
            : locales['en_us']?.[key];

    const template = translationOverride?.[key] || localeTranslation || '';

    return Mustache.render(template, view);
};

export const transformFilter = (filter) =>
    (filter || '')?.split(',').reduce((queries, filter) => {
        const {0: key, 1: val} = filter.split(':');

        if (key) {
            queries[key] =
                val === 'true' ? true : val === 'false' ? false : val;
        }

        return queries;
    }, {});

export const getColorBrightness = (color) => {
    color = color.replace('#', '');
    let sum = 0;
    let x = 0;

    while (x < 3) {
        sum += parseInt(color.substring(2 * x, 2), 16) || 0;

        ++x;
    }

    return sum <= 381 ? 'dark' : 'light';
};

export const pushQueryParam = (queryParams = [], action = 'set') => {
    let urlParams = new URLSearchParams(window.location.search);

    queryParams?.forEach(({name, val}) => {
        urlParams[action](name, val);
    });

    if (history.pushState) {
        urlParams = urlParams.toString() === '' ? '' : `?${urlParams}`;
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${urlParams}`;
        window.history.pushState({path: newUrl}, '', newUrl);
    }
};

export const getHashFragments = (hashParam) => {
    const hashReg = new RegExp(`${hashParam}/(.*)`);
    const [publicationId, pageNum] =
        location.hash.match(hashReg)?.[1]?.split('/') || [];

    return {publicationId, pageNum};
};
