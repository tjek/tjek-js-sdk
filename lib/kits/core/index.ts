export {default as request} from './request';

export type V2App = {id: number; name: string};

export type V2Currency = 'DKK' | 'EUR' | 'NOK' | 'PLN' | 'SEK' | 'ISK' | 'RON';

export type V2CountryCode =
    | 'DE'
    | 'DK'
    | 'GL'
    | 'NL'
    | 'NO'
    | 'PL'
    | 'SE'
    | 'FI'
    | 'SJ'
    | 'IS'
    | 'RO';

export interface V2Branding {
    name: string;
    website?: string;
    description?: string;
    color: string;
    logo: string;
    pageflip: {color: string; logo: string};
}
interface V2Images {
    thumb: string;
    view: string;
    zoom: string;
}
interface V2Pricing {
    pre_price: number | null;
    price: number;
    currency: V2Currency;
}
interface V2Quantity {
    pieces: {from: number; to: number};
    size: {from: number; to: number};
    unit: {si: {factor: number; symbol: string}; symbol: string} | null;
}

export interface V2Offer {
    branding: V2Branding;
    id: string;
    heading: string;
    description: string;
    catalog_page: number | null;
    catalog_id: string | null;
    dealer_id: string;
    dealer: V2Dealer;
    images: V2Images;
    links: {webshop: string | null};
    pricing: V2Pricing;
    publish: Date;
    run_from: Date;
    run_till: Date;
    quantity: V2Quantity;
    /** @deprecated */
    store_id?: null;
}

type DayOfWeek =
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';
export interface V2Store {
    id: string;
    ern: string;
    graph_id: string;
    street: string;
    city: string;
    zip_code: string;
    country: {unsubscribe_print_url?: string; id: V2CountryCode};
    openingHours?: (
        | {opens: string; closes: string; day_of_week: DayOfWeek}
        | {
              opens: string;
              closes: string;
              valid_from: string;
              valid_until: string;
          }
        | {valid_from: string; valid_until: string}
        | {day_of_week: DayOfWeek}
    )[];
    latitude: number;
    longitude: number;
    dealer_url: string;
    dealer_id: string;
    dealer: V2Dealer;
    branding: V2Branding;
    category_ids: string[];
    /** @deprecated */
    facebook_page_id?: null;
    /** @deprecated */
    twitter_handle?: null;
    /** @deprecated */
    youtube_user_id?: null;
    /** @deprecated */
    contact?: null;
}

export interface V2Catalog {
    id: string;
    ern: string;
    run_from: Date;
    store_id: string | null;
    store_url: null;
    images: V2Images;
    types: ('incito' | 'paged')[];
    incito_publication_id: string | null;
    all_stores: boolean;
    dealer_url: string;
    branding: V2Branding;
    pdf_url: string;
    label: string;
    run_till: Date;
    /** @deprecated */
    pages?: {view: []; thumb: []; zoom: []};
    background: string;
    category_ids: [];
    offer_count: number;
    page_count: number;
    dealer_id: string;
    dealer: V2Dealer;
    dimensions: {width: 1; height: number};
}
export interface V2Page {
    view: string;
    thumb: string;
    zoom: string;
}
export interface V2Dealer {
    id: string;
    ern: string;
    markets: {slug: string; country_code: V2CountryCode}[];
    /** @deprecated */
    graph_id?: null;
    name: string;
    website: string;
    description: string;
    logo: string;
    color: string;
    pageflip: {logo: string; color: string};
    country: {
        id: V2CountryCode;
        /** @deprecated */
        unsubscribe_print_url: null;
    };
    description_markdown: string;
    favorite_count: number;
    is_incito_supported: boolean;
    locale: string;
    category_ids: number[];
    is_content_public: boolean;
}

export interface V2Hotspot {
    type: string;
    locations: Record<number, number[][]>;
    id: string;
    run_from: number;
    run_till: number;
    heading: string;
    webshop?: any;
    offer: {
        id: string;
        ern: string;
        heading: string;
        pricing: V2Pricing;
        quantity: V2Quantity;
        run_from: Date;
        run_till: Date;
        publish: Date;
    };
    id_collection: {type: 'id'; provider: 'shopgun-core'; value: string}[];
}

export interface V2Dealerfront {
    catalogs: V2Catalog[];
    dealer: V2Dealer;
}
