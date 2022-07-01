import Mustache from 'mustache';
import * as locales from '../../../../../locales';
import {ESC as EscKey} from '../../../../key-codes';

export const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

export const destroyModal = () => {
    const pubContainer =
        document.querySelector<HTMLDivElement>('.sgn__pp') ||
        document.querySelector<HTMLDivElement>('.sgn__incito');
    const modalContainer = document.querySelector('.sgn-modal-container');
    modalContainer?.classList.add('sgn-modal-container-on-destroy');

    pubContainer?.focus();

    window.setTimeout(() => {
        modalContainer?.parentNode?.removeChild(modalContainer);
    }, 300);
};

export const createModal = (
    container: HTMLElement,
    destroyCallback?: (event: any) => void
) => {
    if (!document.querySelector('.sgn-modal-container')) {
        const pubContainer =
            document.querySelector('.sgn__pp') ||
            document.querySelector('.sgn__incito');
        const modalContainer = document.createElement('div');
        const blocker = document.createElement('div');

        blocker.className = 'sgn-blocker';
        pubContainer?.appendChild(modalContainer);
        modalContainer.className = 'sgn-modal-container';
        modalContainer.tabIndex = -1;
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
    }
};

export const formatPrice = (price, localeCode = 'en_US', currency = 'USD') => {
    return new Intl.NumberFormat(localeCode.replace('_', '-'), {
        style: 'currency',
        currency
    }).format(price);
};

export const parseDateStr = (dateStr: string) => {
    const parts = dateStr.match(
        /(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/
    );
    if (parts) {
        return new Date(
            Date.UTC(
                +parts[1],
                +parts[2] - 1,
                +parts[3],
                +parts[4] - (+parts[9] || 0) * (parts[8] == '-' ? -1 : 1),
                +parts[5] - (+parts[10] || 0) * (parts[8] == '-' ? -1 : 1),
                +parts[6],
                +((parts[7] || '0') + '00').substring(0, 3)
            )
        );
    }
    return new Date(NaN);
};

export const formatDate = (
    dateStr: string,
    localeCode: string = 'en_US',
    options?: Intl.DateTimeFormatOptions
) => {
    const date = parseDateStr(dateStr);

    return new Intl.DateTimeFormat(
        localeCode.replace('_', '-'),
        options
    ).format(date);
};

export const getDateRange = (fromDateStr, tillDateStr) => {
    const scriptEl = document.getElementById('sgn-sdk');
    const dataset = scriptEl?.dataset;
    const browserLocale = navigator.language || 'en-US';
    const locale = dataset?.localeCode
        ? dataset.localeCode.replace('_', '-')
        : browserLocale;
    const from = parseDateStr(fromDateStr).toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit'
    });
    const till = parseDateStr(tillDateStr).toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit'
    });

    return translate('publication_viewer_date_range', {from, till});
};

export const getPubState = (fromDateStr, tillDateStr) => {
    const fromDate = parseDateStr(fromDateStr).valueOf();
    const tillDate = parseDateStr(tillDateStr).valueOf();
    const timeOffset = new Date().getTimezoneOffset() * 1000 * 60;
    const todayDate = new Date().valueOf() + timeOffset;

    if (todayDate >= fromDate && todayDate < tillDate) {
        return 'active';
    } else if (todayDate > tillDate) {
        return 'expired';
    } else if (todayDate < fromDate) {
        return 'inactive';
    }

    return null;
};

export const getPubStateMessage = (fromDateStr, tillDateStr) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const fromDate = parseDateStr(fromDateStr).valueOf();
    const tillDate = parseDateStr(tillDateStr).valueOf();
    const timeOffset = new Date().getTimezoneOffset() * 1000 * 60;
    const todayDate = new Date().valueOf() + timeOffset;
    const status = getPubState(fromDateStr, tillDateStr);

    if (status === 'active') {
        const diffDays = Math.round(Math.abs((tillDate - todayDate) / oneDay));

        return translate('publication_viewer_expires_in_days_label', {
            days: diffDays
        });
    } else if (status === 'inactive') {
        const diffDays = Math.round(Math.abs((fromDate - todayDate) / oneDay));

        return translate('publication_viewer_valid_in_days_label', {
            days: diffDays
        });
    } else if (status === 'expired') {
        return translate('publication_viewer_expired_label');
    }

    return null;
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

export const translate = (key = '', view = {}) => {
    const scriptEl = document.getElementById('sgn-sdk');
    const dataset = scriptEl?.dataset;
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

export const pushQueryParam = (queryParams = {}) => {
    const newUrl = new URL(window.location.href);

    Object.entries(queryParams).forEach(([key, val]) => {
        newUrl.searchParams[val ? 'set' : 'delete'](key, String(val));
    });

    window.history.pushState({path: String(newUrl)}, '', newUrl);
};

export const getHashFragments = (hashParam) => {
    const hashReg = new RegExp(`${hashParam}/(.*)`);
    const [publicationId, pageNum] =
        location.hash.match(hashReg)?.[1]?.split('/') || [];

    return {publicationId, pageNum};
};
