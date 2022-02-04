import {MainContainer} from './components/list-publications';
import {PagedPublication} from './';
import SGN from '../../sgn-sdk';

const ListPublications = (scriptEl, mainContainer = '') => {
    const scriptEls = {
        businessId: scriptEl.getAttribute('data-business-id'),
        mainContainer:
            scriptEl.getAttribute(
                'data-component-list-publications-container'
            ) || mainContainer,
        orderBy: scriptEl.getAttribute(
            'data-component-list-publications-order-by'
        ),
        filter: scriptEl.getAttribute('data-component-list-publications-filter')
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
        eventTracker: SGN.config.get('eventTracker'),
        businessId: scriptEls.businessId,
        orderBy: scriptEls.orderBy
            ? orderBys[scriptEls.orderBy]
            : orderBys.newest,
        filter: scriptEls.filter
    };

    const renderPublicationViewer = (e) => {
        const publicationId = e.currentTarget.dataset?.id;
        const pagedPublication = PagedPublication(
            scriptEl,
            '#sgn-paged-publication-container'
        );

        pagedPublication.setOptions({id: publicationId});
        pagedPublication.render();
    };

    const addPublicationListener = () => {
        const pubItems = document.querySelectorAll('.publications__item');

        pubItems.forEach((itemEl) =>
            itemEl.addEventListener('click', renderPublicationViewer, false)
        );
    };

    const render = async () => {
        const mainContainerEl = document.querySelector(scriptEls.mainContainer);
        const mainContainer = MainContainer({
            configs: options,
            template: customTemplates.mainContainer,
            el: mainContainerEl
        });

        await mainContainer.render();
        addPublicationListener();
    };

    return {
        render
    };
};

export default ListPublications;
