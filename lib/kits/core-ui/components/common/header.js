import Mustache from 'mustache';
import {ESC as EscKey} from '../../../../key-codes';
import * as clientLocalStorage from '../../../../storage/client-local';
import {getColorBrightness} from '../helpers/component';
import './header.styl';

const defaultTemplate = `\
{{^disableHeader}}
    <div class="sgn__header">
        <div class="sgn__nav">
            <div class="sgn__nav-content">
            {{^disableClose}}
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
            {{/disableClose}}
            {{^disableShoppingList}}
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
            {{/disableShoppingList}}
            {{^disableMenu}}
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
            {{/disableMenu}}
            </div>
            {{#isIncito}}
            <div class="sgn-incito__scroll-progress">
                <span class="sgn-incito__scroll-progress-text"></span>
                <div class="sgn-incito__scroll-progress-bar"></div>
            </div>
            {{/isIncito}}
            {{^isIncito}}
            <div class="sgn-pp__progress">
                <div class="sgn-pp-progress__bar"></div>
                <div class="sgn-pp__progress-label"></div>
            </div>
            {{/isIncito}}
        </div>
    </div>
{{/disableHeader}}\
`;

const defaultShoppingListCounterTemplate = `\
{{#shoppingListCount}}
    <div class="sgn__offer-shopping-list-counter">
        <span>{{shoppingListCount}}</span>
    </div>
{{/shoppingListCount}}\
`;

const Header = ({
    publicationType,
    template,
    shoppingListCounterTemplate,
    el,
    scriptEls
}) => {
    let container = null;
    publicationType = publicationType || 'paged';
    template = template?.innerHTML || defaultTemplate;

    const renderShoppingListCounter = () => {
        const shoppingListCountEl = container.querySelector(
            '.sgn__offer-shopping-list-count'
        );

        if (shoppingListCountEl) {
            const storedPublicationOffers = clientLocalStorage.get(
                'publication-saved-offers'
            );

            shoppingListCountEl.innerHTML = Mustache.render(
                shoppingListCounterTemplate?.innerHTML ||
                    defaultShoppingListCounterTemplate,
                {shoppingListCount: storedPublicationOffers?.length}
            );
        }
    };

    const setNavColor = (color) => {
        const sgnNav = container.querySelector('.sgn__nav');

        if (sgnNav) {
            sgnNav.style.backgroundColor = color || 'transparent';
            sgnNav.style.color =
                getColorBrightness(color) === 'dark' ? '#ffffff' : '#000000';
        }
    };

    const show = (data = {}) => {
        const brandColor = data?.details?.branding?.color
            ? `#${data?.details?.branding?.color}`
            : '#2c2c2e';

        setNavColor(brandColor);

        container
            .querySelector('.sgn__header')
            ?.classList.add('sgn-animate-header');
    };

    const addClosePubListener = () => {
        const sgnContainer =
            publicationType === 'incito'
                ? el.querySelector('.sgn__incito')
                : el.querySelector('.sgn__pp');
        const closeBtn = container.querySelector('.sgn__close-publication');

        closeBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            sgnContainer?.parentNode?.removeChild(sgnContainer);
        });

        sgnContainer.addEventListener(
            'keyup',
            (e) => {
                if (e.keyCode === EscKey && closeBtn) {
                    sgnContainer?.parentNode?.removeChild(sgnContainer);
                }
            },
            false
        );
    };

    const addStorageListener = () => {
        window.addEventListener(
            'tjek_shopping_list_update',
            renderShoppingListCounter,
            false
        );
    };

    const addScrollListener = () => {
        const progressBar = container.querySelector(
            '.sgn-incito__scroll-progress-bar'
        );
        const progressText = container.querySelector(
            '.sgn-incito__scroll-progress-text'
        );

        if (progressText) {
            progressText.innerHTML = '0%';

            window.addEventListener('scroll', () => {
                const scrollValue = getScrollValue();

                progressBar.style.transform = `scaleX(${scrollValue})`;
                progressText.innerHTML = `${Math.round(scrollValue * 100)}%`;
            });
        }
    };

    const getScrollValue = () => {
        const rootElement = document.documentElement;
        const bodyElement = document.body;
        const exactVal =
            (rootElement['scrollTop'] || bodyElement['scrollTop']) /
            ((rootElement['scrollHeight'] || bodyElement['scrollHeight']) -
                rootElement.clientHeight);

        return exactVal;
    };

    const render = () => {
        container = document.createElement('div');
        container.className = 'sgn__header-content';
        container.innerHTML = Mustache.render(template, {
            disableHeader: scriptEls.disableHeader,
            disableShoppingList:
                scriptEls.disableShoppingList ||
                scriptEls.offerClickBehavior !== 'shopping_list',
            disableMenu: scriptEls.disableMenu,
            disableClose: scriptEls.disableClose,
            isIncito: publicationType === 'incito'
        });

        if (publicationType === 'incito') {
            addScrollListener();
        }

        renderShoppingListCounter();
        addStorageListener();
        addClosePubListener();

        return container;
    };

    return {render, show};
};

export default Header;
