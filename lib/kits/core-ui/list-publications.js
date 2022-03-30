import MainContainer from './components/list-publications/main-container';
import IncitoPublication from './incito-publication';
import PagedPublication from './paged-publication';
import {transformScriptData} from './components/helpers/transformers';
import {getQueryParam} from '../../util';

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

    const clickPublicationItem = (e) => {
        const {id, types} = e.currentTarget.dataset || {};

        if (scriptEls.displayQueryParams) {
            const urlParams = new URLSearchParams(window.location.search);

            urlParams.set(scriptEls.publicationIdParam, id);
            urlParams.set(scriptEls.publicationTypesParam, types);

            if (history.pushState) {
                const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams}`;
                window.history.pushState({path: newUrl}, '', newUrl);
            }
        }

        dispatchPublicationClickEvent({id, types});
        renderPublicationViewer({id, types});
    };

    const renderPublicationViewer = ({id, types}) => {
        if (
            scriptEls.publicationsListClickBehavior ===
            'open_publication_viewer'
        ) {
            if (
                (scriptEls.preferredViewer === 'incito' &&
                    types.includes('incito')) ||
                types === 'incito'
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
        window.dispatchEvent(
            new CustomEvent('tjek-publication-list-item-clicked', {
                detail
            })
        );
    };

    const render = async () => {
        await MainContainer({
            configs: options,
            template: customTemplates.mainContainer,
            el: document.querySelector(scriptEls.mainContainer)
        }).render();
        addPublicationListener();

        if (
            getQueryParam(scriptEls.publicationIdParam) &&
            getQueryParam(scriptEls.publicationTypesParam)
        ) {
            renderPublicationViewer({
                id: getQueryParam(scriptEls.publicationIdParam),
                types: getQueryParam(scriptEls.publicationTypesParam)
            });
        }
    };

    return {render};
};

export default ListPublications;
