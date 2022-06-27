import Mustache from 'mustache';
import {request, V2Page} from '../../../core';
import {Viewer} from '../../../paged-publication';
import {destroyModal, pushQueryParam} from '../helpers/component';
import {transformScriptData} from '../helpers/transformers';
import './page-list.styl';

const defaultTemplate = `\
    <div class="sgn-pages-content">
        <ol class="sgn-pages-list-items-container">
            {{#pages}}
            <li class="sgn-pages-list-item-container">
                <div class="sgn-pages-content-container">
                    <a href="#" class="sgn-page-item" data-page-id="{{pageId}}" data-page-num="{{pageNum}}">
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

const PageList = ({
    scriptEls,
    configs,
    sgnData,
    sgnViewer,
    template
}: {
    scriptEls: ReturnType<typeof transformScriptData>;
    configs: {apiKey: string; coreUrl: string; id?: string};
    sgnData?: {pages?: V2Page[]};
    sgnViewer?: Viewer;
    template?: HTMLElement | null;
}) => {
    let container: HTMLDivElement | null = null;

    const render = async () => {
        container = document.createElement('div');
        container.className = 'sgn-pages-container';
        container.innerHTML = Mustache.render(
            template?.innerHTML || defaultTemplate,
            {
                pages: transformPages(
                    sgnData?.pages?.length
                        ? sgnData.pages
                        : await request<V2Page[]>({
                              apiKey: configs.apiKey,
                              coreUrl: configs.coreUrl,
                              url: `/v2/catalogs/${configs.id}/pages`
                          })
                )
            }
        );

        addPageClickListener();

        return container;
    };

    const addPageClickListener = () => {
        container?.querySelectorAll('.sgn-page-item').forEach((itemEl) => {
            itemEl.addEventListener('click', navigateToPage, false);
        });
    };

    const navigateToPage = (e) => {
        e.preventDefault();
        const {pageId, pageNum} = e.currentTarget.dataset;

        destroyModal();
        sgnViewer?.navigateToPageId(pageId);

        if (scriptEls.displayUrlParams?.toLowerCase() === 'query') {
            pushQueryParam({
                [scriptEls.publicationIdParam]: configs.id,
                [scriptEls.pageIdParam]: pageNum
            });
        } else if (scriptEls.displayUrlParams?.toLowerCase() === 'hash') {
            location.hash = `${scriptEls.publicationHash}/${configs.id}/${pageNum}`;
        }
    };

    const transformPages = (pages) =>
        pages.map((page, index) => ({
            ...page,
            pageId: `page${index + 1}`,
            pageNum: index + 1,
            index
        }));

    return {render};
};

export default PageList;
