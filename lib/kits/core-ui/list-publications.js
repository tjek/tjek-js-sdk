import MainContainer from './components/list-publications/main-container';
import PagedPublication from './paged-publication';
import IncitoPublication from './incito-publication';

const ListPublications = (
    scriptEl,
    {mainContainer = '', apiKey, coreUrl, eventTracker} = {}
) => {
    const scriptEls = {
        businessId: scriptEl.dataset.businessId,
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

    const renderPublicationViewer = (e) => {
        const publicationId = e.currentTarget.dataset?.id;
        console.log('viewer', scriptEls.preferredViewer);
        if (scriptEls.preferredViewer === 'incito') {
            const incitoPublication = IncitoPublication(scriptEl, {
                mainContainer: '#sgn-incito-publication-container',
                apiKey,
                coreUrl,
                eventTracker
            });

            incitoPublication.setOptions({id: publicationId});
            incitoPublication.render();
        } else {
            const pagedPublication = PagedPublication(scriptEl, {
                mainContainer: '#sgn-paged-publication-container',
                apiKey,
                coreUrl,
                eventTracker
            });

            pagedPublication.setOptions({id: publicationId});
            pagedPublication.render();
        }
    };

    const addPublicationListener = () =>
        document.querySelectorAll('.publications__item').forEach((itemEl) => {
            itemEl.addEventListener('click', renderPublicationViewer, false);
        });

    const render = async () => {
        await MainContainer({
            configs: options,
            template: customTemplates.mainContainer,
            el: document.querySelector(scriptEls.mainContainer)
        }).render();
        addPublicationListener();
    };

    return {render};
};

export default ListPublications;
