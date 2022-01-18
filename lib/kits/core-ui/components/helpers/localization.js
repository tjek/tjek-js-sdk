import * as locales from '../../../../../locales';

const localizationHelper = {
    getLocaleTranslations: (dataset = {}) => {
        const {localeCode} = dataset;
        const {translationKeys} =
            localizationHelper.parseNestedDataset(dataset);

        return {
            pagedPublication: {
                ...locales[localeCode || 'en_US']?.pagedPublication,
                ...translationKeys?.pagedPublication
            },
            listPublications: {
                ...locales[localeCode || 'en_US']?.listPublications,
                ...translationKeys?.listPublications
            }
        };
    },

    parseNestedDataset: (dataset) => {
        const keys = Object.keys(dataset);
        let data = {};
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = dataset[key];
            const splat = key.split('-');

            data = localizationHelper.parseNestedDatasetKey(splat, value, data);
        }

        return data;
    },

    parseNestedDatasetKey: (keys, value, data) => {
        data = data || {};
        let key = localizationHelper.convertToCamelCase(keys[0]);

        if (!data[key]) {
            data[key] = {};
        }

        if (keys.length > 1) {
            keys.splice(0, 1);
            data[key] = localizationHelper.parseNestedDatasetKey(
                keys,
                value,
                data[key]
            );
        } else {
            data[key] = value;
        }

        return data;
    },

    convertToCamelCase: (str) => {
        return str
            ?.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, '');
    }
};

export default localizationHelper;
