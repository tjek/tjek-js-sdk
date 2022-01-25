import Mustache from 'mustache';
import {request} from '../../../core';
import {ComponentHelper} from '../helpers';
import './page-list.styl';

const defaultTemplate = `\
    <div class="sgn-pages-content">
        <ol class="sgn-pages-list-items-container">
            {{#pages}}
            <li class="sgn-pages-list-item-container">
                <div class="sgn-pages-content-container">
                    <a href="#" class="sgn-page-item" data-id="{{pageId}}">
                        <div class="sgn-pages-list-item-container-div-text">
                            <div class="sgn-pages-img-container">
                                <img src="{{thumb}}" loading="lazy">
                            </div>
                            <div>
                                <span>{{pageNum}}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </li>
            {{/pages}}
        </ol>
    </div>\
`;

const pageList = ({configs = {}, sgnData = {}, viewer, template}) => {
    const _configs = configs;
    const _sgnData = sgnData;
    const _viewer = viewer;
    const _template = template?.innerHTML || defaultTemplate;
    let _container = null;
    let _pages = [];

    const render = async () => {
        Object.keys(_sgnData).length > 0;
        _pages =
            _sgnData?.pages?.length > 0
                ? transformPages(_sgnData.pages)
                : await fetchPages();
        _container = document.createElement('div');
        _container.className = 'sgn-pages-container';
        _container.innerHTML = Mustache.render(_template, {
            pages: _pages
        });

        addPageClickListener();

        return _container;
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
        ComponentHelper.destroyModal('sgn-menu-popup-container');
        _viewer.navigateToPageId(e.currentTarget.dataset?.id);
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
