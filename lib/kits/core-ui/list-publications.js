import * as ListPublicationsComponents from './components/list-publications';
import SGN from '../../sgn-sdk';

export default class ListPublications {
    constructor(scriptEl) {
        this.options = {};
        this.scriptEl = scriptEl;
        this.scriptEls = {
            mainContainer: scriptEl.getAttribute(
                'data-component-list-publications-viewer-container'
            ),
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

    renderMainContainer() {
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
        mainContainer.render();
    }

    setOptions() {
        this.options = {
            el: document.querySelector('.sgn__pp'),
            eventTracker: SGN.config.get('eventTracker'),
            pageId: `page${SGN.util.getQueryParam('page') || 1}`,
            id: SGN.util.getQueryParam('publicationid')
                ? SGN.util.getQueryParam('publicationid')
                : SGN.config.get('publicationId')
                ? SGN.config.get('publicationId')
                : '',
            dealerId: SGN.config.get('businessId'),
            orderBy: this.scriptEls.orderBy
                ? this.orderBys[this.scriptEls.orderBy]
                : this.orderBys.newest
        };
    }
}
