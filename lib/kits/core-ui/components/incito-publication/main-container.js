import Mustache from 'mustache';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn_loader-container">
        <div class="sgn_loader"></div>
    </div>
    <div class="sgn__incito" data-component-template="true" tabindex="-1" data-component-template-disable-header="{{disableHeader}}">
        <div class="sgn__header-container"></div>
        {{#disableHeader}}
        <div class="sgn-incito__scroll-progress">
            <div class="sgn-incito__scroll-progress-bar"></div>
            <span class="sgn-incito__scroll-progress-text"></span>
        </div>
        {{/disableHeader}}
    </div>\
`;

const MainContainer = ({template, el, scriptEls}) => {
    template = template?.innerHTML || defaultTemplate;

    const setCustomStyles = () => {
        const sgnIncito = el.querySelector('.sgn__incito');
        sgnIncito.classList.add(`sgn__theme-${scriptEls.theme || 'light'}`);
    };

    const render = () => {
        el.innerHTML = Mustache.render(template, {
            disableHeader: scriptEls.disableHeader,
            disableShoppingList:
                scriptEls.disableShoppingList ||
                scriptEls.offerClickBehavior !== 'shopping_list',
            disableMenu: scriptEls.disableMenu,
            disableClose: scriptEls.disableClose
        });

        el.querySelector('.sgn__incito')?.focus();

        setCustomStyles();
    };

    return {render};
};

export default MainContainer;
