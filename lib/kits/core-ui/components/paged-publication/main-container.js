import Mustache from 'mustache';
import * as clientLocalStorage from '../../../../storage/client-local';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn__pp" data-layout-fixed="true">
        <div class="sgn__header">
            <div class="sgn__nav-logo" style="display:none;">
            {{#logoSrc}}
                <img src="{{logoSrc}}" alt="logo" height="30px">
            {{/logoSrc}}
            </div>
            <div class="sgn__nav">
                <button class="sgn__close-publication">
                    <svg
                        aria-hidden="true"
                        class="sgn-header-icon-svg sgn-header-icon-svg-close"
                        role="img" viewBox="0 0 320 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="currentColor"
                            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                        >
                        </path>
                    </svg>
                </button>
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
                    <div class="sgn__offer-shopping-list-count"><div>
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

const defaultShoppingListCounterTemplate = `\
{{#shoppingListCount}}
    <div class="sgn__offer-shopping-list-counter">
        <span>{{shoppingListCount}}</span>
    </div>
{{/shoppingListCount}}\
`;

const mainContainer = ({
    template,
    shoppingListCounterTemplate,
    el,
    scriptEls
}) => {
    const _template = template?.innerHTML || defaultTemplate;
    const _shoppingListCounterTemplate = shoppingListCounterTemplate;
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

    const renderShoppingListCounter = () => {
        const template =
            _shoppingListCounterTemplate?.innerHTML ||
            defaultShoppingListCounterTemplate;
        const clientStorage = clientLocalStorage.get(
            'paged-publication-saved-offers'
        );
        const shoppingListCountEl = _el.querySelector(
            '.sgn__offer-shopping-list-count'
        );

        if (shoppingListCountEl) {
            shoppingListCountEl.innerHTML = Mustache.render(template, {
                shoppingListCount: clientStorage?.length
            });
        }
    };

    const addClosePubListener = () => {
        const sgnPp = _el.querySelector('.sgn__pp');
        const closeBtn = _el.querySelector('.sgn__close-publication');

        closeBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            sgnPp?.parentNode?.removeChild(sgnPp);
        });
    };

    const addStorageListener = () => {
        window.addEventListener(
            'tjek_shopping_list_update',
            renderShoppingListCounter,
            false
        );
    };

    const render = () => {
        setCustomStyles();
        removeComponents();
        renderShoppingListCounter();
        addStorageListener();
        addClosePubListener();
    };

    return {render};
};

export default mainContainer;
