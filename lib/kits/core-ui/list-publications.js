import * as ListPublicationsComponents from './components/list-publications';
import PagedPublication from './paged-publication';
import SGN from '../../sgn-sdk';

const listPublications = (scriptEl, mainContainer = '') => {
    const scriptEls = {
        mainContainer:
            scriptEl.getAttribute(
                'data-component-list-publications-container'
            ) || mainContainer,
        orderBy: scriptEl.getAttribute(
            'data-component-list-publications-orderby'
        )
    };

    const customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-list-publications-template'
        ),
        publicationModal: document.getElementById(
            'sgn-sdk-list-publications-modal-template'
        )
    };

    const orderBys = {
        newest: '-publication_date',
        oldest: 'publication_date'
    };

    const options = {
        el: document.querySelector('.sgn__pp'),
        eventTracker: SGN.config.get('eventTracker'),
        dealerId: SGN.config.get('businessId'),
        orderBy: scriptEls.orderBy
            ? orderBys[scriptEls.orderBy]
            : orderBys.newest
    };

    const renderPublicationModal = (e) => {
        options.id = e.target.dataset?.id;
        const publicationModalContainer =
            new ListPublicationsComponents.PublicationModalContainer({
                configs: options,
                template: customTemplates.publicationModal
            });
        publicationModalContainer.render();

        const pagedPublication = new PagedPublication(
            scriptEl,
            '#sgn-paged-publication-modal-container'
        );
        pagedPublication.setOptions({id: options.id});
        pagedPublication.render();
    };

    const addPublicationListener = () => {
        const pubItems = document.querySelectorAll('.publications__item');

        pubItems.forEach((itemEl) =>
            itemEl.addEventListener('click', renderPublicationModal, false)
        );
    };

    const render = async () => {
        const mainContainerEl = document.querySelector(scriptEls.mainContainer);
        const mainContainer = new ListPublicationsComponents.MainContainer({
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
