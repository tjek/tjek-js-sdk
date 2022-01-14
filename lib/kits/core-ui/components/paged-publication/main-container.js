import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn__pp" data-layout-absolute="true">
        <div class="sgn__header">
            <div class="sgn__nav-logo" style="display:none;">
            {{#logoSrc}}
                <img src="{{logoSrc}}" alt="logo" height="30px">
            {{/logoSrc}}
            </div>
            <div class="sgn__nav">
                <button class="sgn__offer-shopping">
                    <svg
                        aria-hidden="true"
                        class="sgn-header-icon-svg"
                        role="img"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="currentColor"
                            d="M48 368a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 24H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z"
                        >
                        </path>
                    </svg>
                    <div class="sgn__offer-shopping-count"><div>
                </button>
                <button class="sgn__nav-menu-btn">
                    <svg
                        aria-hidden="true"
                        class="sgn-header-icon-svg"
                        role="img"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="currentColor"
                            d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
                        >
                        </path>
                    </svg>
                </button>
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
    <span class="sgn__offer-shopping-counter">{{shoppingCount}}<span>
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
