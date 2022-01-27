import * as locales from '../../../../../locales';

const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const insertInside = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
};

const destroyModal = (container) => {
    const blocker = document.querySelector('.sgn-blocker');

    if (typeof container === 'string') {
        container = document.querySelector(`.${container}`);
    }

    blocker?.parentNode?.removeChild(blocker);
    container?.parentNode?.removeChild(container);
};

const addBlockerListenerTo = (container, destroyCallback) => {
    const headNav = document.querySelector('.sgn__nav');
    const blocker = document.createElement('div');

    blocker.className = 'sgn-blocker';
    insertAfter(headNav, blocker);

    blocker.addEventListener(
        'click',
        (e) => {
            e.stopPropagation();

            destroyModal(container);

            if (typeof destroyCallback === 'function') {
                destroyCallback(e);
            }
        },
        false
    );
};

const formatPrice = (price, localeCode = 'en_US', currency = 'USD') => {
    return new Intl.NumberFormat(localeCode.replace('_', '-'), {
        style: 'currency',
        currency
    }).format(price);
};

const formatDate = (dateStr, localeCode = 'en_US', options = {}) => {
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

const translate = (key = '') => {
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

    return translationOverride?.[key] || localeTranslation || '';
};

export {
    insertAfter,
    insertInside,
    destroyModal,
    addBlockerListenerTo,
    formatPrice,
    formatDate,
    translate
};
