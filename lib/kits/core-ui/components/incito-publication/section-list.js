import Mustache from 'mustache';
import {destroyModal} from '../helpers/component';
import './section-list.styl';

const defaultTemplate = `\
    <div class="sgn-sections-content">
        <ol class="sgn-sections-list-items-container">
            {{#sections}}
            <li class="sgn-sections-list-item-container">
                <div class="sgn-sections-content-container">
                    <a href="#" class="sgn-section-item" data-section-id="{{view_id}}">
                        <div class="sgn-sections-list-item-container-div-text">
                            <div>
                                <span>{{title}}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </li>
            {{/sections}}
        </ol>
    </div>\
`;

const SectionList = ({sgnData = {}, template}) => {
    let container = null;

    template = template?.innerHTML || defaultTemplate;

    const render = async () => {
        container = document.createElement('div');
        container.className = 'sgn-sections-container';
        container.innerHTML = Mustache.render(template, {
            sections: sgnData?.incito?.table_of_contents
        });

        addSectionClickListener();

        return container;
    };

    const addSectionClickListener = () => {
        container.querySelectorAll('.sgn-section-item').forEach((itemEl) => {
            itemEl.addEventListener('click', scrollToSection, false);
        });
    };

    const scrollToSection = (e) => {
        e.preventDefault();

        const sectionId = e.currentTarget.dataset?.sectionId;
        const sectionCell = document.querySelector(
            `[data-id="${sectionId}"][data-role="section"]`
        );

        destroyModal();
        sectionCell?.scrollIntoView({behavior: 'smooth'});
    };

    return {render};
};

export default SectionList;
