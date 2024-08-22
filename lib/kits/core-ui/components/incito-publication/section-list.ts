import Mustache from 'mustache';
import {destroyModal} from '../helpers/component';
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
    const regex = new RegExp(/tjek_audience=[^#&;+]+/);
    const match = regex.exec(location.href) || [];
    let sectionList: {title: string; view_id: string}[] = [];
    let feature;

    if (match.length > 0) {
        feature =
            match[0] !== undefined
                ? match[0].replace('tjek_audience=', '').split(',')
                : ['none'];
    } else if (localStorage.getItem('tjek_audience') !== null) {
        feature = localStorage.getItem('tjek_audience')?.split(',') || ['none'];
    } else {
        const cookie = regex.exec(document.cookie) || [];
        feature =
            cookie[0] !== undefined
                ? cookie[0].replace('tjek_audience=', '').split(',')
                : ['none'];
    }

    if (feature.includes('all'))
        sectionList = sgnData?.incito?.table_of_contents;
    else
        sgnData?.incito?.table_of_contents.forEach((section) => {
            if (feature.includes('none')) {
                if (
                    !section.feature_labels.includes(feature) &&
                    section.feature_labels.length === 0
                )
                    sectionList.push(section);
            } else if (
                feature.some(
                    (element) =>
                        section.feature_labels.includes(element) ||
                        section.feature_labels.length === 0
                )
            )
                sectionList.push(section);
        });

    template = template?.innerHTML || defaultTemplate;

    const render = async () => {
        container = document.createElement('div');
        container.className = 'sgn-sections-container';
        container.innerHTML = Mustache.render(template, {
            sections: sectionList
        });

        addSectionClickListener();
        addSectionScrollListener();

        return container;
    };

    const addSectionScrollListener = () => {
        const mainContainerEl = document.querySelector(
            scriptEls.listPublicationsContainer || scriptEls.mainContainer
        );

        mainContainerEl.addEventListener('section:show', (e) => {
            const {view_id} = e.detail;

            const listItem = container?.querySelector(
                `.sgn-sections-list-item-container[data-section-id="${view_id}"]`
            );

            container
                ?.querySelectorAll('.sgn-sections-list-item-container')
                ?.forEach((itemEl) => {
                    itemEl.classList.remove('sgn-sections-list-item-active');
                });

            listItem?.classList.add('sgn-sections-list-item-active');
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
