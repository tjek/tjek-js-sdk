import Mustache from 'mustache';
import {transformScriptData} from '../helpers/transformers';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn_loader-container">
        <div class="sgn_loader"></div>
    </div>
    <div class="sgn__incito" data-component-template="true" tabindex="-1" data-component-template-disable-header="{{disableHeader}}" data-offer-clickable="{{isOfferClickable}}" data-component-template-enable-sidebar="{{enableSidebar}}" data-component-template-sidebar-position="{{sidebarPosition}}">
        <div class="sgn__header-container"></div>
        {{#enableSidebar}}
        <div class="sgn__menu-sidebar-container"></div>
        {{/enableSidebar}}
        {{#displayBottomScrollProgress}}
        <div class="sgn-incito__scroll-progress">
            <div class="sgn-incito__scroll-progress-bar"></div>
            <span class="sgn-incito__scroll-progress-text"></span>
        </div>
        {{/displayBottomScrollProgress}}
    </div>\
`;

const MainContainer = ({
    template,
    el,
    scriptEls
}: {
    template?: Element | null;
    el: Element | null;
    scriptEls: ReturnType<typeof transformScriptData>;
}) => {
    const setCustomStyles = () => {
        const sgnIncito = el?.querySelector('.sgn__incito');
        sgnIncito?.classList.add(`sgn__theme-${scriptEls.theme || 'light'}`);
    };

    const render = () => {
        if (!el) return;

        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            disableHeader: scriptEls.disableHeader,
            disableShoppingList:
                scriptEls.disableShoppingList ||
                scriptEls.offerClickBehavior !== 'shopping_list',
            disableMenu: scriptEls.disableMenu,
            disableClose: scriptEls.disableClose,
            enableSidebar: scriptEls.enableSidebar,
            sidebarPosition: scriptEls.sidebarPosition,
            displayBottomScrollProgress:
                scriptEls.disableHeader || scriptEls.enableSidebar,
            isOfferClickable:
                (!scriptEls.disableShoppingList ||
                    scriptEls.offerClickBehavior !== 'shopping_list') &&
                (!scriptEls.disableHeader ||
                    scriptEls.offerClickBehavior !== 'shopping_list')
        });

        el.querySelector<HTMLDivElement>('.sgn__incito')?.focus();

        setCustomStyles();
    };

    return {render};
};

export default MainContainer;
