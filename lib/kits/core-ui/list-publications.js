import MainContainer from './components/list-publications/main-container';
import PagedPublication from './paged-publication';

const ListPublications = (
    scriptEl,
    {mainContainer = '', eventTracker} = {}
) => {
    const scriptEls = {
        businessId: scriptEl.getAttribute('data-business-id'),
        mainContainer:
            scriptEl.getAttribute(
                'data-component-list-publications-container'
            ) || mainContainer,
        orderBy: scriptEl.getAttribute(
            'data-component-list-publications-order-by'
        ),
        requestFilter: scriptEl.getAttribute(
            'data-component-list-publications-request-filter'
        ),
        clientFilter: scriptEl.getAttribute(
            'data-component-list-publications-client-filter'
        )
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
        const pagedPublication = PagedPublication(scriptEl, {
            mainContainer: '#sgn-paged-publication-container',
            eventTracker
        });

        pagedPublication.setOptions({id: publicationId});
        pagedPublication.render();
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
