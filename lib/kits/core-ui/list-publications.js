import * as ListPublicationsComponents from './components/list-publications';
import PagedPublication from './paged-publication';
import SGN from '../../sgn-sdk';

export default class ListPublications {
    constructor(scriptEl, mainContainer = '') {
        this.options = {};
        this.scriptEl = scriptEl;
        this.scriptEls = {
            mainContainer:
                scriptEl.getAttribute(
                    'data-component-list-publications-viewer-container'
                ) || mainContainer,
            orderBy: scriptEl.getAttribute(
                'data-component-list-publications-viewer-orderby'
            )
        };
        this.orderBys = {
            newest: '-publication_date',
            oldest: 'publication_date'
        };
    }

    async render() {
        this.setOptions();
        this.renderMainContainer();
    }

    async renderMainContainer() {
        const mainContainerEl = document.querySelector(
            this.scriptEls.mainContainer
        );
        const customTemplate = document.getElementById(
            'sgn-sdk-list-publications-viewer-template'
        );
        const mainContainer = new ListPublicationsComponents.MainContainer({
            configs: this.options,
            template: customTemplate,
            el: mainContainerEl
        });
        await mainContainer.render();

        this.addPublicationListener();
    }

    addPublicationListener() {
        const pubItems = document.querySelectorAll('.publications__item');

        pubItems.forEach((itemEl) =>
            itemEl.addEventListener(
                'click',
                this.renderPublicationModal.bind(this),
                false
            )
        );
    }

    async renderPublicationModal(e) {
        this.options.id = e.target.dataset?.id;
        const customTemplate = document.getElementById(
            'sgn-sdk-list-publications-modal-viewer-template'
        );
        const publicationModalContainer =
            new ListPublicationsComponents.PublicationModalContainer({
                configs: this.options,
                template: customTemplate
            });

        await publicationModalContainer.render();

        const pagedPublication = new PagedPublication(
            this.scriptEl,
            '#sgn-paged-publication-container'
        );
        pagedPublication.setOptions(this.options.id);

        pagedPublication.render();
    }

    setOptions() {
        this.options = {
            el: document.querySelector('.sgn__pp'),
            eventTracker: SGN.config.get('eventTracker'),
            dealerId: SGN.config.get('businessId'),
            orderBy: this.scriptEls.orderBy
                ? this.orderBys[this.scriptEls.orderBy]
                : this.orderBys.newest
        };
    }
}
