import Mustache from 'mustache';
import {transformScriptData} from '../helpers/transformers';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn__pp" data-layout-fixed="true" data-component-template="true" {{#disableHeader}}data-component-template-disable-header="true"{{/disableHeader}}>
        <div class="sgn__header-container"></div>

        <div class="verso">
            <div class="verso__scroller">
                <div class="sgn-pp__pages"></div>
            </div>
        </div>

        {{#disableHeader}}
            <div class="sgn-pp__progress">
                <div class="sgn-pp-progress__bar"></div>
            </div>
            <div class="sgn-pp__progress-label"></div>
        {{/disableHeader}}
        <button
            class="sgn-pp__control"
            data-direction="prev"
        >
            &lsaquo;
        </button>
        <button
            class="sgn-pp__control"
            data-direction="next"
        >
            &rsaquo;
        </button>
        <button
            class="sgn-pp__control sgn-pp--hidden"
            data-direction="first"
        >
            &laquo;
        </button>
        <button
            class="sgn-pp__control sgn-pp--hidden"
            data-direction="last"
        >
            &raquo;
        </button>
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
            disableHeader: scriptEls.disableHeader
        });

        setCustomStyles();
    };

    return {render};
};

export default MainContainer;
