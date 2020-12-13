const Mustache = require('mustache');
const pairs = {
    'paged_publication.hotspot_picker.header': 'Which offer did you mean?',
    'incito_publication.product_picker.header': 'Which product?'
};

module.exports = {
    t(key, view) {
        const template = pairs[key] ?? '';

        return Mustache.render(template, view);
    },

    update(translations) {
        for (let key in translations) {
            const value = translations[key];
            pairs[key] = value;
        }
    }
};
