import Mustache from 'mustache';
import {destroyModal, pushQueryParam} from '../helpers/component';
import './section-list.styl';

const defaultTemplate = `\
    <div class="sgn-sections-content">
        <ol class="sgn-sections-list-items-container">
            {{#sections}}
            <li class="sgn-sections-list-item-container" data-section-id="{{view_id}}">
                <div class="sgn-sections-content-container">
                    <div class="sgn-sections-list-item-container-div-text">
                        <div>
                            <span>{{title}}</span>
                        </div>
                    </div>
                </div>
            </li>
            {{/sections}}
        </ol>
    </div>\
`;

const SectionList = ({sgnData, template, scriptEls}) => {
    let container: HTMLDivElement | null = null;

    template = template?.innerHTML || defaultTemplate;

    const render = async () => {
        container = document.createElement('div');
        container.className = 'sgn-sections-container';
        container.innerHTML = Mustache.render(template, {
            sections: sgnData?.incito?.table_of_contents
        });

        addSectionClickListener();
        addSectionScrollListener();

        return container;
    };

    const addSectionScrollListener = () => {
        const toc = sgnData?.incito?.table_of_contents;
        const scrollContainer = document.querySelector('.incito');

        toc.forEach(({view_id}) => {
            scrollContainer?.addEventListener('scroll', () => {
                const sectionEl = document.querySelector(
                    `[data-id="${view_id}"][data-role="section"]`
                );
                const listItem = container?.querySelector(
                    `.sgn-sections-list-item-container[data-section-id="${view_id}"]`
                );

                const rect = sectionEl?.getBoundingClientRect();
                const viewportHeight =
                    window.innerHeight || document.documentElement.clientHeight;

                if (
                    (rect?.top || 0) <= viewportHeight / 2 &&
                    (rect?.bottom || 0) >= viewportHeight / 2
                ) {
                    container
                        ?.querySelectorAll('.sgn-sections-list-item-container')
                        ?.forEach((itemEl) => {
                            itemEl.classList.remove(
                                'sgn-sections-list-item-active'
                            );
                        });
                    listItem?.classList.add('sgn-sections-list-item-active');

                    if (scriptEls.displayUrlParams?.toLowerCase() === 'query') {
                        pushQueryParam({
                            [scriptEls.sectionIdParam]: view_id
                        });
                    } else if (
                        scriptEls.displayUrlParams?.toLowerCase() === 'hash'
                    ) {
                        location.hash = `${scriptEls.publicationHash}/${
                            sgnData.details.id
                        }/${encodeURIComponent(view_id)}`;
                    }
                }
            });
        });
    };

    const addSectionClickListener = () => {
        container
            ?.querySelectorAll('.sgn-sections-list-item-container')
            .forEach((itemEl) => {
                itemEl.addEventListener('click', scrollToSection, false);
            });
    };

    const scrollToSection = (e) => {
        const sectionId = e.currentTarget.dataset?.sectionId;
        const sectionCell = document.querySelector(
            `[data-id="${sectionId}"][data-role="section"]`
        );
        const incitoEl = scriptEls.enableSidebar
            ? document.querySelector('.incito')
            : document.querySelector('.sgn__incito');
        const headerOffset = document.querySelector('.sgn__header') ? 76 : 0;
        // @ts-expect-error
        const sectionOffset = sectionCell.offsetTop - headerOffset || 0;

        destroyModal();

        incitoEl?.scrollTo({top: sectionOffset, behavior: 'smooth'});
    };

    return {render};
};

export default SectionList;
