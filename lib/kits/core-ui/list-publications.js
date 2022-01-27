import {MainContainer} from './components/list-publications';
import {PagedPublication} from './';
import SGN from '../../sgn-sdk';

const listPublications = (scriptEl, mainContainer = '') => {
    const scriptEls = {
        businessId: scriptEl.getAttribute('data-business-id'),
        mainContainer:
            scriptEl.getAttribute(
                'data-component-list-paged-publications-container'
            ) || mainContainer,
        orderBy: scriptEl.getAttribute(
            'data-component-list-paged-publications-order-by'
        )
    };

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-list-paged-publications-template'
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
            : orderBys.newest
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

export default listPublications;
