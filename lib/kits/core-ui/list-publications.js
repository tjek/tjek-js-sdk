import MainContainer from './components/list-publications/main-container';
import IncitoPublication from './incito-publication';
import PagedPublication from './paged-publication';
import {transformScriptData} from './components/helpers/transformers';
import {getQueryParam} from '../../util';
import {request} from '../core';
import {
    pushQueryParam,
    formatDate,
    transformFilter,
    translate,
    getHashFragments
} from './components/helpers/component';

const ListPublications = (
    scriptEl,
    {mainContainer = '', apiKey, coreUrl, eventTracker} = {}
) => {
    const scriptEls = {
        ...transformScriptData(scriptEl, mainContainer),
        mainContainer:
            scriptEl.dataset.componentListPublicationsContainer ||
            mainContainer,
        orderBy: scriptEl.dataset.componentListPublicationsOrderBy,
        requestFilter: scriptEl.dataset.componentListPublicationsRequestFilter,
        clientFilter: scriptEl.dataset.componentListPublicationsClientFilter,
        preferredViewer:
            scriptEl.dataset.componentPublicationsViewerPreferredType
    };

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-list-publications-template'
        )
    };

    const orderBys = {
        newest: '-publication_date',
        oldest: 'publication_date'
    };

    const options = {
        el: document.querySelector('.sgn__pp'),
        apiKey,
        coreUrl,
        eventTracker,
        businessId: scriptEls.businessId,
        orderBy: scriptEls.orderBy
            ? orderBys[scriptEls.orderBy]
            : orderBys.newest,
        requestFilter: scriptEls.requestFilter,
        clientFilter: scriptEls.clientFilter
    };

    let publications = [];

    const clickPublicationItem = (e) => {
        const {id} = e.currentTarget.dataset || {};
        const publication = findPublicationById(id);

        if (scriptEls.displayUrlParams?.toLowerCase() === 'query') {
            pushQueryParam({[scriptEls.publicationIdParam]: id});
        } else if (scriptEls.displayUrlParams?.toLowerCase() === 'hash') {
            location.hash = `${scriptEls.publicationHash}/${id}`;
        }

        dispatchPublicationClickEvent(publication);
        renderPublicationViewer(publication);
    };

    const findPublicationById = (id) =>
        publications?.find((publication) => publication.id === id);

    const renderPublicationViewer = (publication) => {
        const {id, types} = publication;

        if (
            scriptEls.publicationsListClickBehavior ===
            'open_publication_viewer'
        ) {
            if (
                (scriptEls.preferredViewer === 'incito' &&
                    types.includes('incito')) ||
                !types.includes('paged')
            ) {
                const incitoPublication = IncitoPublication(scriptEl, {
                    mainContainer: '#sgn-publication-viewer-container',
                    apiKey,
                    coreUrl,
                    eventTracker
                });

                incitoPublication.setOptions({id});
                incitoPublication.render();
            } else {
                const pagedPublication = PagedPublication(scriptEl, {
                    mainContainer: '#sgn-publication-viewer-container',
                    apiKey,
                    coreUrl,
                    eventTracker
                });

                pagedPublication.setOptions({id});
                pagedPublication.render();
            }
        }
    };

    const addPublicationListener = () =>
        document.querySelectorAll('.publications__item').forEach((itemEl) => {
            itemEl.addEventListener('click', clickPublicationItem, false);
        });

    const dispatchPublicationClickEvent = (detail) => {
        document.querySelector(scriptEls.mainContainer)?.dispatchEvent(
            new CustomEvent('publication_list:clicked', {
                detail
            })
        );
    };

    const fetchPublications = async () =>
        transformPublications(
            await request({
                apiKey: options.apiKey,
                coreUrl: options.coreUrl,
                url: `/v2/catalogs`,
                qs: {
                    dealer_id: options.businessId,
                    order_by: options.orderBy,
                    offset: 0,
                    limit: 24,
                    types: 'paged,incito',
                    ...transformFilter(options.requestFilter)
                }
            })
        );

    const transformPublications = (publications) => {
        const localeCode = translate('locale_code');
        const filters = transformFilter(options.clientFilter);

        return publications
            .filter((publication) =>
                Object.entries(filters).reduce(
                    (prev, {0: key, 1: value}) =>
                        publication[key] === value && prev,
                    {}
                )
            )
            .map((publication) => ({
                ...publication,
                dateFrom: formatDate(publication?.run_from, localeCode),
                dateTill: formatDate(publication?.run_till, localeCode)
            }));
    };

    const render = async () => {
        publications = await fetchPublications();

        MainContainer({
            publications,
            template: customTemplates.mainContainer,
            el: document.querySelector(scriptEls.mainContainer)
        }).render();

        addPublicationListener();

        if (getQueryParam(scriptEls.publicationIdParam)) {
            renderPublicationViewer(
                findPublicationById(getQueryParam(scriptEls.publicationIdParam))
            );
        } else if (getHashFragments(scriptEls.publicationHash)?.publicationId) {
            renderPublicationViewer(
                findPublicationById(
                    getHashFragments(scriptEls.publicationHash).publicationId
                )
            );
        }
    };

    return {render};
};

export default ListPublications;
