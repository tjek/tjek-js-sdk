import Mustache from 'mustache';
import {request} from '../../../core';
import PagedPublication from '../../paged-publication';
import {ComponentHelper} from '../helpers';
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

const pageList = ({configs = {}, template, scriptEl, mainContainer}) => {
    const _configs = configs;
    const _template = template?.innerHTML || defaultTemplate;
    const _scriptEl = scriptEl;
    const _mainContainer = mainContainer;
    const _headNav = document.querySelector('.sgn__nav');
    const _pageListBtn = document.querySelector('.sgn__offer-pages');
    let _container = null;
    let _pages = [];

    const render = () => {
        _pageListBtn?.addEventListener('click', showPageList, false);
    };

    const showPageList = async () => {
        _pages = await fetchPages();
        _container = document.createElement('div');
        _container.className = 'sgn-pages-container';
        ComponentHelper.insertAfter(_headNav, _container);

        _container.innerHTML = Mustache.render(_template, {
            pages: _pages
        });

        addPageClickListener();
        ComponentHelper.addBlockerListenerTo(_container);
    };

    const fetchPages = () => {
        return new Promise((resolve) => {
            request(
                {url: `/v2/catalogs/${_configs.id}/pages`},
                (err, pages) => {
                    if (!err) {
                        resolve(pages);
                    }
                }
            );
        }).then((pages) => transformPages(pages));
    };

    const addPageClickListener = () => {
        const pageItems = _container.querySelectorAll('.sgn-page-item');

        pageItems.forEach((itemEl) =>
            itemEl.addEventListener('click', reRenderPagedPublication, false)
        );
    };

    const reRenderPagedPublication = (e) => {
        _configs.pageId = e.currentTarget.dataset?.id;

        const pagedPublication = PagedPublication(_scriptEl, _mainContainer);
        pagedPublication.setOptions(_configs);
        pagedPublication.render();
    };

    const transformPages = (pages) => {
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
    };

    return {render};
};

export default pageList;
