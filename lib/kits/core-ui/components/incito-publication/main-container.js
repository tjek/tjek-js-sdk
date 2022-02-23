import Mustache from 'mustache';
import {ESC as EscKey} from '../../../../key-codes';
import * as clientLocalStorage from '../../../../storage/client-local';
import './main-container.styl';
import Header from '../common/header';

const defaultTemplate = `\
    <div class="sgn_loader-container">
        <div class="sgn_loader"></div>
    </div>
    <div class="sgn__incito" data-component-template="true" tabindex="-1" {{#disableHeader}}data-component-template-disable-header="true"{{/disableHeader}}>
        <div class="sgn__header-container"></div>
    </div>\
`;

const defaultShoppingListCounterTemplate = `\
{{#shoppingListCount}}
    <div class="sgn__offer-shopping-list-counter">
        <span>{{shoppingListCount}}</span>
    </div>
{{/shoppingListCount}}\
`;

const MainContainer = ({
    template,
    shoppingListCounterTemplate,
    el,
    scriptEls
}) => {
    template = template?.innerHTML || defaultTemplate;

    const setCustomStyles = () => {
        const sgnIncito = el.querySelector('.sgn__incito');
        sgnIncito.classList.add(`sgn__theme-${scriptEls.theme || 'light'}`);
    };

    const setHeader = () => {
        el.querySelector('.sgn__header-container')?.appendChild(
            Header({
                type: 'incito',
                template: '',
                shoppingListCounterTemplate,
                el,
                scriptEls
            }).render()
        );
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

        setHeader();
        setCustomStyles();

        // addScrollListener();
    };

    return {render};
};

export default MainContainer;
