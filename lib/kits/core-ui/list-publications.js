import * as ListPublicationsComponents from './components/list-publications';
import {PagedPublication} from './';
import SGN from '../../sgn-sdk';

const listPublications = (scriptEl, mainContainer = '') => {
    const _scriptEls = {
        businessId: scriptEl.getAttribute('data-business-id'),
        mainContainer:
            scriptEl.getAttribute(
                'data-component-list-paged-publications-container'
            ) || mainContainer,
        orderBy: scriptEl.getAttribute(
            'data-component-list-paged-publications-orderby'
        )
    };

    const _customTemplates = {
        mainContainer: document.getElementById(
            'sgn-sdk-list-paged-publications-template'
        )
    };

    const _orderBys = {
        newest: '-publication_date',
        oldest: 'publication_date'
    };

    const _options = {
        el: document.querySelector('.sgn__pp'),
        eventTracker: SGN.config.get('eventTracker'),
        dealerId: _scriptEls.businessId,
        orderBy: _scriptEls.orderBy
            ? _orderBys[_scriptEls.orderBy]
            : _orderBys.newest
    };

    const renderPublicationViewer = (e) => {
        _options.id = e.currentTarget.dataset?.id;
        const pagedPublication = PagedPublication(
            scriptEl,
            '#sgn-paged-publication-container'
        );
        pagedPublication.setOptions({id: _options.id});
        pagedPublication.render();
    };

    const addPublicationListener = () => {
        const pubItems = document.querySelectorAll('.publications__item');

        pubItems.forEach((itemEl) =>
            itemEl.addEventListener('click', renderPublicationViewer, false)
        );
    };

    const render = async () => {
        const mainContainerEl = document.querySelector(
            _scriptEls.mainContainer
        );
        const mainContainer = ListPublicationsComponents.MainContainer({
            configs: _options,
            template: _customTemplates.mainContainer,
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
