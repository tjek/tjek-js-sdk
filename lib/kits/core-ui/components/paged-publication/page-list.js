import Mustache from 'mustache';
import {request} from '../../../core';
import {destroyModal} from '../helpers/component';
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

const pageList = ({configs = {}, sgnData = {}, sgnViewer, template}) => {
    let container = null;
    let pagesList = [];

    template = template?.innerHTML || defaultTemplate;

    const render = async () => {
        Object.keys(sgnData).length > 0;
        pagesList =
            sgnData?.pages?.length > 0
                ? transformPages(sgnData.pages)
                : await fetchPages();
        container = document.createElement('div');
        container.className = 'sgn-pages-container';
        container.innerHTML = Mustache.render(template, {
            pages: pagesList
        });

        addPageClickListener();

        return container;
    };

    const fetchPages = async () => {
        const pages = await request({url: `/v2/catalogs/${configs.id}/pages`});

        return transformPages(pages);
    };

    const addPageClickListener = () => {
        const pageItems = container.querySelectorAll('.sgn-page-item');

        pageItems.forEach((itemEl) =>
            itemEl.addEventListener('click', reRenderPagedPublication, false)
        );
    };

    const reRenderPagedPublication = (e) => {
        destroyModal('sgn-menu-popup-container');
        sgnViewer.navigateToPageId(e.currentTarget.dataset?.id);
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
