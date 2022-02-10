import Mustache from 'mustache';
import * as locales from '../../../../../locales';
import {ESC as EscKey} from '../../../../key-codes';

export const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export const destroyModal = () => {
    const sgnPp = document.querySelector('.sgn__pp');
    const modalContainer = document.querySelector('.sgn-modal-container');

    sgnPp.focus();
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

export const transformFilter = (filter) =>
    (filter || '')?.split(',').reduce((queries, filter) => {
        const [key, val] = filter.split(':');
        if (key)
            queries[key] =
                val === 'true' ? true : val === 'false' ? false : val;

        return queries;
    }, {});
