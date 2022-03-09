import Mustache from 'mustache';
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
        <a
            class="sgn-pp__control"
            href="#"
            role="button"
            data-direction="prev"
        >
            &lsaquo;
        </a>
        <a
            class="sgn-pp__control"
            href="#"
            role="button"
            data-direction="next"
        >
            &rsaquo;
        </a>
    </div>\
`;

const MainContainer = ({template, el, scriptEls}) => {
    template = template?.innerHTML || defaultTemplate;

    const setCustomStyles = () => {
        const sgnPp = el.querySelector('.sgn__pp');
        sgnPp.classList.add(`sgn__theme-${scriptEls.theme || 'light'}`);
    };

    const render = () => {
        el.innerHTML = Mustache.render(template, {
            disableHeader: scriptEls.disableHeader
        });

        setCustomStyles();
    };

    return {render};
};

export default MainContainer;
