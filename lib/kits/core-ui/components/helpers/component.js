import Mustache from 'mustache';
import * as locales from '../../../../../locales';
import {ESC as EscKey} from '../../../../key-codes';

export const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export const insertInside = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
};

export const destroyModal = (container) => {
    const blocker = document.querySelector('.sgn-blocker');

    if (typeof container === 'string') {
        container = document.querySelector(`.${container}`);
    }

    blocker?.parentNode?.removeChild(blocker);
    container?.parentNode?.removeChild(container);
};

export const addBlockerListenerTo = (container, destroyCallback) => {
    const sgnPp = document.querySelector('.sgn__pp');
    const headNav = document.querySelector('.sgn__nav');
    const blocker = document.createElement('div');

    blocker.className = 'sgn-blocker';
    insertAfter(headNav, blocker);

    const destroy = (e) => {
        e.stopPropagation();

        sgnPp.removeEventListener('keyup', destroyOnEsc);
        destroyModal(container);

        if (typeof destroyCallback === 'function') {
            destroyCallback(e);
        }
    };

    const destroyOnEsc = (e) => {
        e.stopPropagation();

        if (e.keyCode === EscKey) {
            destroy(e);
        }
    };

    blocker.addEventListener('click', destroy, false);
    sgnPp.addEventListener('keyup', destroyOnEsc);
};

export const formatPrice = (price, localeCode = 'en_US', currency = 'USD') => {
    return new Intl.NumberFormat(localeCode.replace('_', '-'), {
        style: 'currency',
        currency
    }).format(price);
};

export const formatDate = (dateStr, localeCode = 'en_US', options = {}) => {
    const date = new Date(dateStr);

    return new Intl.DateTimeFormat(
        localeCode.replace('_', '-'),
        options
    ).format(date);
};

const getTranslationOverride = (dataset = {}) =>
    Object.entries(dataset).reduce((translationsKeyVal, [key, value]) => {
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
