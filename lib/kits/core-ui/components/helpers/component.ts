import Mustache from 'mustache';
import * as locales from '../../../../../locales';
import {ESC as EscKey} from '../../../../key-codes';
import * as clientLocalStorage from '../../../../storage/client-local';

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
    })
        .format(price)
        .replace(currency, '')
        .replace('kr.', '')
        .replace('kr', '')
        .trim();
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
    options?: Intl.DateTimeFormatOptions
) => {
    const scriptEl = document.getElementById('sgn-sdk');
    const dataset = scriptEl?.dataset;
    const browserLocale = navigator.language || 'en-US';
    const locale = dataset?.localeCode
        ? dataset?.localeCode.replace('_', '-')
        : browserLocale;
    const date = parseDateStr(dateStr);

    return new Intl.DateTimeFormat(locale, options).format(date);
};

export const getDateRange = (fromDateStr, tillDateStr, templateKey) => {
    const from = formatDate(fromDateStr, {
        day: '2-digit',
        month: '2-digit'
    });
    const till = formatDate(tillDateStr, {
        day: '2-digit',
        month: '2-digit'
    });

    return translate(templateKey, {from, till});
};

export const getPubState = (fromDateStr, tillDateStr) => {
    const fromDate = parseDateStr(fromDateStr).valueOf();
    const tillDate = parseDateStr(tillDateStr).valueOf();
    const todayDate = new Date().valueOf();

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
    const todayDate = new Date().valueOf();
    const status = getPubState(fromDateStr, tillDateStr);

    if (status === 'active') {
        const diffDays = Math.ceil(Math.abs((tillDate - todayDate) / oneDay));

        return translate('publication_viewer_expires_in_days_label', {
            days: diffDays
        });
    } else if (status === 'inactive') {
        const diffDays = Math.ceil(Math.abs((fromDate - todayDate) / oneDay));

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

export const transformFilter = (filter) => {
    const delimiter = filter?.includes(';') ? ';' : ',';

    return (filter || '')?.split(delimiter).reduce((queries, filter) => {
        const {0: key, 1: val} = filter.split(':');

        if (key) {
            queries[key] =
                val === 'true' ? true : val === 'false' ? false : val;
        }

        return queries;
    }, {});
};

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
    // Don't push query params if in iframe
    if (window.self !== window.top) return null;

    const newUrl = new URL(window.location.href);

    Object.entries(queryParams).forEach(([key, val]) => {
        if (val) {
            newUrl.searchParams.set(key, String(val));
        } else {
            newUrl.searchParams.delete(key);
        }
    });

    window.history.pushState({path: String(newUrl)}, '', newUrl);
};

export const getHashFragments = (hashParam) => {
    const hashReg = new RegExp(`${hashParam}/(.*)`);
    const [publicationId, pageNum] =
        location.hash.match(hashReg)?.[1]?.split('/') || [];

    return {publicationId, pageNum};
};

const updateQueryParam = (url, paramName, newValue) => {
    const urlObject = new URL(url);
    const queryParams = urlObject.searchParams;
    queryParams.set(paramName, newValue);

    return urlObject.toString();
};

export const transformWebshopLink = (url) => {
    const scriptEl = document.getElementById('sgn-sdk');
    const dataset = scriptEl?.dataset;

    if (url) {
        const newUrl = new URL(url);

        if (dataset?.componentPublicationUtmSource) {
            newUrl.searchParams.set(
                'utm_source',
                dataset.componentPublicationUtmSource
            );
        }
        if (dataset?.componentPublicationUtmMedium) {
            newUrl.searchParams.set(
                'utm_medium',
                dataset.componentPublicationUtmMedium
            );
        }
        if (dataset?.componentPublicationDisableUtm === 'true') {
            newUrl.searchParams.delete('utm_source');
            newUrl.searchParams.delete('utm_medium');
        }

        return newUrl.toString();
    }

    return url;
};

export const dispatchProductClickEvent = (detail) => {
    const scriptEl = document.getElementById('sgn-sdk');
    const dataset = scriptEl?.dataset;
    const mainContainer =
        dataset?.componentListPublicationsContainer ||
        dataset?.componentPublicationContainer ||
        '';
    const mainContainerEl = document.querySelector(mainContainer);

    mainContainerEl?.dispatchEvent(
        new CustomEvent('publication:product_clicked', {
            detail
        })
    );
};

export const animateShoppingListCounter = () => {
    const shoppingListCounter = document.querySelector(
        '.sgn__offer-shopping-list-counter'
    );

    shoppingListCounter?.classList.remove('sgn-animate-bounce');
    shoppingListCounter?.classList.add('sgn-animate-bounce');
};

export const updateShoppingList = (offer, action: 'plus' | 'minus') => {
    const storedPublicationOffers =
        clientLocalStorage.get('publication-saved-offers') || [];

    let isNew = false;

    const currency = offer.currency_code || offer.pricing.currency;

    let shopListOffer = {
        offerId: offer.id,
        id: offer.id,
        name: offer.name,
        pieceCount: offer.piece_count,
        savings: offer.savings,
        pricing: {
            price: offer.price,
            currency
        },
        quantity: 1,
        is_ticked: false
    };

    const allPricesAreTheSame = offer.products?.every(
        (product, index, array) => product.price === array[0].price
    );

    const useOfferPrice =
        allPricesAreTheSame && offer.price !== offer.products[0].price;

    if (offer.basket?.productId) {
        const product = offer.products?.find(
            ({id}) => id == offer.basket?.productId
        );
        if (product) {
            shopListOffer = {
                offerId: offer.id,
                id: product.id,
                name: product.title,
                pieceCount: offer.piece_count,
                savings: offer.savings,
                pricing: {
                    price: useOfferPrice
                        ? offer.price || offer.pricing.price
                        : product?.price,
                    currency
                },
                quantity: 1,
                is_ticked: false
            };
        }
    }

    const isOfferInList = storedPublicationOffers.some(
        (storedOffer) => storedOffer.id === shopListOffer.id
    );

    if (!isOfferInList && action !== 'minus') {
        storedPublicationOffers.push(shopListOffer);
        isNew = true;
        dispatchProductClickEvent({product: shopListOffer});
    } else {
        const updatedOffers = storedPublicationOffers
            .map((storedOffer) => {
                if (storedOffer.id === shopListOffer.id) {
                    if (action === 'plus') {
                        storedOffer.quantity += 1;
                    } else if (action === 'minus') {
                        storedOffer.quantity -= 1;
                    }

                    dispatchProductClickEvent({product: storedOffer});

                    if (storedOffer.quantity <= 0) {
                        return null;
                    }
                }

                return storedOffer;
            })
            .filter(Boolean);

        storedPublicationOffers.splice(0, storedPublicationOffers.length);
        storedPublicationOffers.push(...updatedOffers);
    }

    clientLocalStorage.setWithEvent(
        'publication-saved-offers',
        storedPublicationOffers,
        'tjek_shopping_list_update'
    );

    if (isNew) {
        animateShoppingListCounter();
    }
};

export const closeSidebar = () => {
    const sidebarControl = document?.querySelector<HTMLDivElement>(
        '.sgn__sidebar-control'
    );

    if (sidebarControl) {
        const matchedMedia = window.matchMedia('(max-width: 1200px)');

        if (matchedMedia.matches) {
            sidebarControl?.click();
        }
    }
};

export const displayOfferMessage = (viewId, message) => {
    if (!message) return;

    const offerContainer = document.querySelector(`[data-id="${viewId}"]`);
    const existingOverlayEl = offerContainer?.querySelector(
        '.sgn-offer-link-overlay'
    );

    if (!existingOverlayEl) {
        const overlay = document.createElement('div');

        overlay.className = 'sgn-offer-link-overlay';
        overlay.innerHTML = `<span>${message}</span>`;

        offerContainer?.appendChild(overlay);

        setTimeout(function () {
            offerContainer?.removeChild(overlay);
        }, 1500);
    }
};

export const getLocaleCode = (countryId: string): string => {
    if (!countryId) {
        return '';
    }

    const countryLocaleMap: {[key: string]: string} = {
        US: 'en_US',
        DK: 'da_DK',
        SE: 'sv_SE',
        NO: 'nb_NO'
    };

    return countryLocaleMap[countryId] || '';
};

export const calculateProductPrice = (offer, totalQuantityByOffer = 1) => {
    let productPrice = 0;
    const offerPrice = offer.pricing.price; // Individual price per piece

    for (let i = offer?.quantity || 1; i >= 1; i--) {
        if (offer.pieceCount?.from > 1) {
            if (i % offer.pieceCount?.from === 0) {
                productPrice += offerPrice;
                i -= offer.pieceCount.from - 1;
            } else if (totalQuantityByOffer % offer.pieceCount?.from === 0) {
                productPrice += offerPrice / offer.pieceCount.from;
            } else {
                productPrice +=
                    (offerPrice + offer.savings) / offer.pieceCount.from;
            }
        } else {
            productPrice += offerPrice;
        }
    }

    return productPrice;
};

export const getTotalQuantityByOffer = (savedOffers, offerId) => {
    return (savedOffers || []).reduce((totalQuantity, offer) => {
        if (offer.offerId === offerId) {
            totalQuantity += offer.quantity || 1;
        }
        return totalQuantity;
    }, 0);
};
