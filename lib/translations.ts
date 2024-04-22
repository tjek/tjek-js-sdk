import Mustache from 'mustache';
const pairs = {
    'paged_publication.hotspot_picker.header': 'Which offer did you mean?',
    'paged_publication.hotspot_picker.pagedecoration.link': 'Read more',
    'incito_publication.product_picker.header': 'Which product?'
};

export function t(key: string, view?: any) {
    const template = pairs[key] ?? '';

    return Mustache.render(template, view);
}

export function update(translations: Record<string, string>) {
    for (const key in translations) pairs[key] = translations[key];
}
