import * as locales from '../../../../../locales';

const getTranslationOverride = () => {
    const scriptEl = document.getElementById('sgn-sdk');
    const {dataset} = scriptEl;
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

export default (locale = 'en_us', key = '') => {
    locale = locale.toLocaleLowerCase();
    const translationOverride = getTranslationOverride();
    const localeTranslation =
        typeof locales[locale]?.[key] !== 'undefined'
            ? locales[locale]?.[key]
            : locales['en_us']?.[key];

    return translationOverride?.[key] || localeTranslation || '';
};
