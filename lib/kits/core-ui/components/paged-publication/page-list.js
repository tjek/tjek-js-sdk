import Mustache from 'mustache';
import {request} from '../../../core';
import './page-list.styl';

const defaultTemplate = `\
    <div class="sgn-popup-contents sgn-pages-popup">
        <span>Pages</span>
        <ol class="sgn-pages-ol">
            {{#pages}}
            <li class="sgn-page-li">
                    <div class="sgn-page-li-flex-container">
                        <a href="?page={{pageNum}}">
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

export default class PageList {
    constructor({configs = {}, template}) {
        this.configs = configs;
        this.template = template?.innerHTML || defaultTemplate;
        this.pageListBtn = document.querySelector('.sgn__offer-pages');
        this.headNav = document.querySelector('.sgn__nav');
        this.container = null;
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

        this.addWindowListener();
    }

    fetchPages() {
        return new Promise((resolve) => {
            request(
                {url: `/v2/catalogs/${this.configs.id}/pages`},
                (err, pages) => {
                    if (!err) {
                        resolve(pages);
                    }
                }
            );
        }).then((pages) => this.transformPages(pages));
    }

    transformPages(pages) {
        const transformedPages = [];
        pages.forEach((page, index) => {
            transformedPages.push({
                ...page,
                pageNum: index + 1,
                index
            });
        });
        return transformedPages;
    }

    addWindowListener() {
        this.windowListener = this.processWindowClick.bind(this);
        window.addEventListener('click', this.windowListener, false);
    }

    processWindowClick(e) {
        e.stopPropagation();
        if (!this.container.contains(e.target)) {
            this.destroy();
        }
    }

    destroy() {
        window.removeEventListener('click', this.windowListener, false);
        this.container?.parentNode?.removeChild(this.container);
    }

    insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    }
}
