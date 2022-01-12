import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn__pp" data-layout-absolute="true">
        <div class="sgn__header">
            <div class="sgn__nav-logo">
            {{#logoSrc}}
                <img src="{{logoSrc}}" alt="logo" height="30px">
            {{/logoSrc}}
            </div>
            <div class="sgn__nav">
                <button class="sgn__offer-shopping">
                    Shopping List
                    <span class="sgn__offer-shopping-count"><span>
                </button>
                <button class="sgn__nav-menu-btn">Menu</button>
            </div>
        </div>
        <div class="verso">
            <div class="verso__scroller">
                <div class="sgn-pp__pages"></div>
            </div>
        </div>
        <div class="sgn-pp__progress">
            <div class="sgn-pp-progress__bar"></div>
        </div>
        <div class="sgn-pp__progress-label"></div>
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

const defaultShoppingCountTemplate = `\
{{#shoppingCount}}
    <span class="sgn__offer-shopping-counter">({{shoppingCount}})<span>
{{/shoppingCount}}\
`;

const mainContainer = ({template, shoppingCounterTemplate, el, scriptEls}) => {
    const _template = template?.innerHTML || defaultTemplate;
    const _shoppingCounterTemplate = shoppingCounterTemplate;
    const _el = el;
    const _scriptEls = scriptEls;

    _el.innerHTML = Mustache.render(_template, {
        logoSrc: _scriptEls.logoSrc
    });

    const setCustomStyles = () => {
        const sgnPp = _el.querySelector('.sgn__pp');
        sgnPp.classList.add(`sgn__theme-${_scriptEls.theme || 'light'}`);

        if (_scriptEls.headerBackground) {
            const header = _el.querySelector('.sgn__header');
            header.style.backgroundColor = _scriptEls.headerBackground;
        }
    };

    const removeComponents = () => {
        const componentClassNames = _scriptEls.removedComponents;

        if (componentClassNames) {
            componentClassNames
                .replace(/ /g, '')
                .split(',')
                .filter((name) => name)
                .forEach((name) => {
                    const element = _el.querySelector(`.${name}`);
                    if (element) {
                        element.parentNode.removeChild(element);
                    }
                });
        }
    };

    const renderShoppingCount = () => {
        const template =
            _shoppingCounterTemplate?.innerHTML || defaultShoppingCountTemplate;
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        const shoppingCountEl = _el.querySelector('.sgn__offer-shopping-count');

        if (shoppingCountEl) {
            shoppingCountEl.innerHTML = Mustache.render(template, {
                shoppingCount: clientStorage?.length
            });
        }
    };

    const addStorageListener = () => {
        window.addEventListener('storageUpdate', renderShoppingCount, false);
    };

    const render = () => {
        setCustomStyles();
        removeComponents();
        renderShoppingCount();
        addStorageListener();
    };

    return {render};
};

export default mainContainer;
