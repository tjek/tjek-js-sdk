import Mustache from 'mustache';
import {request} from '../../../core';
import PagedPublication from '../../paged-publication';
import ComponentHelpers from '../component-helpers';
import './page-list.styl';

const defaultTemplate = `\
    <div class="sgn-popup-contents sgn-pages-popup">
        <span>Pages</span>
        <ol class="sgn-pages-ol">
            {{#pages}}
            <li class="sgn-page-li">
                <div class="sgn-page-li-flex-container">
                    <a href="#" class="sgn-page-item" data-id="{{pageId}}">
                        <div class="sgn-page-li-div-text">
                            <div class="sgn-pages-img-container">
                                <img src="{{thumb}}">
                            </div>
                            <div>
                                <span>Page: {{pageNum}}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </li>
            {{/pages}}
        </ol>
    </div>\
`;

export default class PageList extends ComponentHelpers {
    constructor({configs = {}, template, scriptEl, mainContainer}) {
        super();
        this.configs = configs;
        this.template = template?.innerHTML || defaultTemplate;
        this.scriptEl = scriptEl;
        this.mainContainer = mainContainer;
        this.pageListBtn = document.querySelector('.sgn__offer-pages');
        this.pages = [];
    }

    render() {
        this.pageListBtn?.addEventListener(
            'click',
            this.showPageList.bind(this),
            false
        );
    }

    async showPageList() {
        this.pages = await this.fetchPages();
        this.container = document.createElement('div');
        this.container.className = 'sgn-pages-container';
        this.insertAfter(this.headNav, this.container);

        this.container.innerHTML = Mustache.render(this.template, {
            pages: this.pages
        });

        this.addPageClickListener();
        this.addBlockerListener();
    }

    fetchPages() {
        return new Promise((resolve) => {
            request(
                {url: `/v2/catalogs/${this.configs.id}/pages`},
                (err, pages) => {
                    if (!err) {
                        console.log(pages);
                        resolve(pages);
                    }
                }
            );
        }).then((pages) => this.transformPages(pages));
    }

    addPageClickListener() {
        const pageItems = this.container.querySelectorAll('.sgn-page-item');

        pageItems.forEach((itemEl) =>
            itemEl.addEventListener(
                'click',
                this.reRenderPagedPublication.bind(this),
                false
            )
        );
    }

    reRenderPagedPublication(e) {
        this.configs.pageId = e.currentTarget.dataset?.id;

        const pagedPublication = new PagedPublication(
            this.scriptEl,
            this.mainContainer
        );
        pagedPublication.setOptions(this.configs);

        pagedPublication.render();
    }

    transformPages(pages) {
        const transformedPages = [];
        pages.forEach((page, index) => {
            transformedPages.push({
                ...page,
                pageId: `page${index + 1}`,
                pageNum: index + 1,
                index
            });
        });
        return transformedPages;
    }
}
