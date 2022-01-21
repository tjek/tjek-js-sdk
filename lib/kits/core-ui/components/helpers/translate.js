import * as locales from '../../../../../locales';

const getTranslationOverride = (dataset = {}) => {
    const keys = Object.keys(dataset);
    const translationsKeyVal = {};
    keys.filter((key) => key.includes('translationKeys-')).map((key) => {
        const value = dataset[key];
        const newKey = key
            .replace('translationKeys-', '')
            ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0
                    ? word.toLowerCase()
                    : `_${word.toLowerCase()}`;
            });

        translationsKeyVal[newKey] = value;
    });

    return translationsKeyVal;
};

export default (key = '') => {
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
