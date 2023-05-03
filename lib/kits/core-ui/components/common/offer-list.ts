import Mustache from 'mustache';
import {request, V2Offer} from '../../../core';
import {Viewer} from '../../../paged-publication';
import {
    destroyModal,
    formatPrice,
    pushQueryParam,
    translate
} from '../helpers/component';
import {transformScriptData} from '../helpers/transformers';
import './offer-list.styl';

const defaultTemplate = `\
    <div class="sgn-offers-content">
        <div class="sgn-offers-search-container">
            <input type="text" id="sgn-offers-search-text" class="sgn-offers-search-text" name="sgn-offers-search-text" placeholder="{{translations.searchText}}...">
        </div>
        <ol class="sgn-offers-list-items-container">
            {{#offers}}
            <li class="sgn-offers-list-item-container">
                <div class="sgn-offers-content-container" data-page-id="{{pageId}}" data-page-num="{{catalog_page}}" data-view-id="{{catalog_view_id}}">
                    <div class="sgn-offers-content-img">
                        <img src="{{images.view}}" alt="{{heading}}">
                    </div>
                    <div class="sgn-offers-content-text">
                        <div class="sgn-offers-content-heading">
                            <span>{{heading}}</span>
                        </div>
                        <div class="sgn-offers-content-description">
                            <span>{{description}}&nbsp;</span>
                        </div>
                        <div class="sgn-offers-content-price">
                            <span>{{price}}</span>
                        </div>
                    </div>
                    <div class="sgn-clearfix"></div>
                </div>
            </li>
            {{/offers}}
        </ol>
    </div>\
`;

const OfferList = ({
    scriptEls,
    publicationType,
    configs,
    sgnViewer,
    template
}: {
    scriptEls: ReturnType<typeof transformScriptData>;
    publicationType?: string;
    configs: {
        apiKey: string;
        coreUrl: string;
        id?: string;
        businessId?: string;
    };
    sgnViewer?: Viewer;
    template?: Element | null;
}) => {
    publicationType = publicationType || 'paged';

    const offerTemplate = (template?.innerHTML || defaultTemplate).match(
        /(?={{#offers}}).*({{\/offers}})/gs
    )?.[0];
    let container: HTMLDivElement | null = null;
    let offersList: ReturnType<typeof transformOffers> = [];
    let offset = 0;
    const limit = 24;
    let searchKey = '';

    const translations = {
        localeCode: translate('locale_code'),
        currency: translate('publication_viewer_currency'),
        searchText: translate('publication_viewer_search_text')
    };

    const fetchSearch = async (query = '') =>
        query
            ? transformOffers(
                  await request<V2Offer[]>({
                      url: '/v2/offers/search',
                      apiKey: configs.apiKey,
                      coreUrl: configs.coreUrl,
                      qs: {
                          dealer_id: configs.businessId,
                          catalog_id: configs.id,
                          types: publicationType,
                          limit,
                          query
                      }
                  })
              )
            : offersList;

    const fetchOffers = async (offset = 0, limit = 24) =>
        transformOffers(
            await request<V2Offer[]>({
                apiKey: configs.apiKey,
                coreUrl: configs.coreUrl,
                url: '/v2/offers',
                qs: {
                    dealer_id: configs.businessId,
                    catalog_id: configs.id,
                    types: publicationType,
                    order_by: 'page',
                    offset,
                    limit
                }
            })
        );

    const transformOffers = (offers?: V2Offer[]) => {
        const {localeCode, currency} = translations;

        return (offers || []).map((offer) => ({
            ...offer,
            price: formatPrice(
                offer?.pricing?.price,
                localeCode,
                offer?.pricing?.currency || currency
            ),
            pageId: `page${offer.catalog_page || 1}`
        }));
    };

    const fetchOnScrollEnd = async (e) => {
        const offerOl = e.target;

        if (
            offerOl.scrollHeight - offerOl.scrollTop === offerOl.clientHeight &&
            !searchKey
        ) {
            const offers = await fetchOffers((offset += limit), limit);

            offersList = offersList.concat(offers);

            if (offerTemplate)
                offerOl.innerHTML += Mustache.render(offerTemplate, {
                    translations,
                    offers
                });

            addOfferClickListener();
        }
    };

    const fetchOnSearch = async (e) => {
        searchKey = e.target.value || '';
        const offerOl = container?.querySelector(
            '.sgn-offers-list-items-container'
        );

        if (offerOl && offerTemplate)
            offerOl.innerHTML = Mustache.render(offerTemplate, {
                translations,
                offers: searchKey ? await fetchSearch(searchKey) : offersList
            });

        addOfferClickListener();
    };

    const addScrollListener = () => {
        container
            ?.querySelector('.sgn-offers-list-items-container')
            ?.addEventListener('scroll', fetchOnScrollEnd);
    };

    const addSearchListener = () => {
        container
            ?.querySelector('.sgn-offers-search-text')
            ?.addEventListener('input', fetchOnSearch);
    };

    const addOfferClickListener = () => {
        container
            ?.querySelectorAll('.sgn-offers-content-container')
            .forEach((itemEl) => {
                itemEl.addEventListener(
                    'click',
                    publicationType === 'incito'
                        ? scrollToOffer
                        : navigateToPage,
                    false
                );
            });
    };

    const navigateToPage = (e) => {
        e.preventDefault();
        const {pageId, pageNum} = e.currentTarget.dataset;

        destroyModal();
        sgnViewer?.navigateToPageId(pageId);

        if (scriptEls.displayUrlParams?.toLowerCase() === 'query') {
            pushQueryParam({
                [scriptEls.publicationIdParam]: configs.id,
                [scriptEls.pageIdParam]: pageNum
            });
        } else if (scriptEls.displayUrlParams?.toLowerCase() === 'hash') {
            location.hash = `${scriptEls.publicationHash}/${configs.id}/${pageNum}`;
        }
    };

    const scrollToOffer = (e) => {
        const viewid = e.currentTarget.dataset?.viewId;
        const offerCell = document.querySelector(
            `[data-id="${viewid}"][data-role="offer"]`
        );

        destroyModal();
        offerCell?.scrollIntoView({behavior: 'smooth'});
    };

    const render = async () => {
        offersList = await fetchOffers(0, 24);
        container = document.createElement('div');
        container.className = 'sgn-offers-container';
        container.innerHTML = Mustache.render(
            template?.innerHTML || defaultTemplate,
            {translations, offers: offersList}
        );

        addSearchListener();
        addScrollListener();
        addOfferClickListener();

        return container;
    };

    return {render};
};

export default OfferList;
