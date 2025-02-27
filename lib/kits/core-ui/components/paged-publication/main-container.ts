import Mustache from 'mustache';
import {transformScriptData} from '../helpers/transformers';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn__pp" data-layout-fixed="true" data-component-template="true" data-component-template-disable-header="{{disableHeader}}" data-component-template-enable-sidebar="{{enableSidebar}}" data-component-template-sidebar-position="{{sidebarPosition}}">
        
        <div class="verso">
            <div class="verso__scroller">
                <div class="sgn-pp__pages"></div>
            </div>
        </div>
        
        
        <button
            class="sgn-pp__control"
            data-direction="next"
            aria-label="Next page"
        >
            &rsaquo;
        </button>
        <button
            class="sgn-pp__control sgn-pp--hidden"
            data-direction="last"
            aria-label="Last page"
        >
            &raquo;
        </button>   
        <button
            class="sgn-pp__control"
            data-direction="prev"
            aria-label="Previous page"
        >
            &lsaquo;
        </button>
        <button
            class="sgn-pp__control sgn-pp--hidden"
            data-direction="first"
            aria-label="First page"
        >
            &laquo;
        </button>
        <div class="sgn-page_decorations"></div>
        <div class="sgn__header-container"></div>
        
        {{#enableSidebar}}
        <div class="sgn__menu-sidebar-container"></div>
        {{/enableSidebar}}

        {{#disableHeader}}
            <div class="sgn-pp__progress">
                <div class="sgn-pp-progress__bar"></div>
            </div>
            <div class="sgn-pp__progress-label"></div>
        {{/disableHeader}}
    </div>\
`;

const MainContainer = ({
    template,
    el,
    scriptEls
}: {
    template: Element | null;
    el: Element | null;
    scriptEls: ReturnType<typeof transformScriptData>;
}) => {
    const setCustomStyles = () => {
        // @ts-expect-error
        const sgnPp = el.querySelector('.sgn__pp');
        sgnPp?.classList.add(`sgn__theme-${scriptEls.theme || 'light'}`);
    };

    const render = () => {
        // @ts-expect-error
        el.innerHTML = Mustache.render(template?.innerHTML || defaultTemplate, {
            disableHeader: scriptEls.disableHeader,
            enableSidebar: scriptEls.enableSidebar,
            sidebarPosition: scriptEls.sidebarPosition
        });

        setCustomStyles();
    };

    return {render};
};

export default MainContainer;
