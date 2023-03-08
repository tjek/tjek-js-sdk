import Mustache from 'mustache';
import {V2PageDecoration} from '../../../core';
import {Viewer} from '../../../paged-publication';
import {destroyModal, pushQueryParam} from '../helpers/component';
import {transformScriptData} from '../helpers/transformers';
import './page-decoration-list.styl';

const defaultTemplate = `\
    <div class="sgn-page-decoration-content">
        <ol class="sgn-page-decoration-list-items-container">
            {{#pageDecorations}}
            <li class="sgn-page-decoration-list-item-container">
                <div class="sgn-page-decoration-content-container">
                    <a href="#" class="sgn-page-item" data-page-id="page{{page_number}}" data-page-num="{{page_number}}">
                        <div class="sgn-pages-list-item-container-div-text">
                            <span>{{title}}</span>
                        </div>
                    </a>
                </div>
            </li>
            {{/pageDecorations}}
        </ol>
    </div>\
`;

const PageDecorationList = ({
    scriptEls,
    configs,
    sgnPageDecorations,
    sgnViewer,
    template
}: {
    scriptEls: ReturnType<typeof transformScriptData>;
    configs: {apiKey: string; coreUrl: string; id?: string};
    sgnPageDecorations?: V2PageDecoration[];
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
                pageDecorations: sgnPageDecorations
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

    return {render};
};

export default PageDecorationList;
