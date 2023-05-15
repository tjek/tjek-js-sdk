import Mustache from 'mustache';
import {ESC as EscKey} from '../../../../key-codes';
import * as clientLocalStorage from '../../../../storage/client-local';
import type {V2Catalog} from '../../../core';
import {
    getColorBrightness,
    pushQueryParam,
    translate
} from '../helpers/component';
import {transformScriptData} from '../helpers/transformers';
import './header.styl';
import './sidebar.styl';

const defaultTemplate = `\
{{^disableHeader}}
    <div class="sgn__header">
        <div class="sgn__nav">
            <div class="sgn__nav-content" data-show-labels="{{showHeaderLabels}}">
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
                    <div class="sgn__nav-label">
                        <span>{{translations.close}}</span>
                    </div>
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
                    <div class="sgn__offer-shopping-list-count"></div>
                    <div class="sgn__nav-label">
                        <span>{{translations.shoppingList}}</span>
                    </div>
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
                    <div class="sgn__nav-label">
                        <span>{{translations.overview}}</span>
                    </div>
                </button>
            {{/disableMenu}}
            </div>
            {{#isIncito}}
            <div class="sgn-incito__scroll-progress">
                <div class="sgn-incito__scroll-progress-bar"></div>
                <span class="sgn-incito__scroll-progress-text"></span>
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

const sidebarTemplate = `\
{{#enableSidebar}}
    <div class="sgn__sidebar sgn__sidebar--open">
        {{^disableHeader}}
        <div class="sgn__nav">
            <div class="sgn__nav-content" data-show-labels="{{showHeaderLabels}}">
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
                    <div class="sgn__nav-label">
                        <span>{{translations.close}}</span>
                    </div>
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
                    <div class="sgn__offer-shopping-list-count"></div>
                    <div class="sgn__nav-label">
                        <span>{{translations.shoppingList}}</span>
                    </div>
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
                    <div class="sgn__nav-label">
                        <span>{{translations.overview}}</span>
                    </div>
                </button>
            {{/disableMenu}}
            </div>
        </div>
        {{/disableHeader}}
        <div class="sgn__sidebar-content-container"></div>
    
    </div>
    <div class="sgn__sidebar-control">
        <div class="sgn__sidebar-control-bars">
            <div class="sgn__sidebar-control-bar1"></div>
            <div class="sgn__sidebar-control-bar2"></div>
            <div class="sgn__sidebar-control-bar3"></div>
        </div>
    </div>
{{/enableSidebar}}\
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
}: {
    publicationType?: 'incito' | 'paged';
    template?: Element | null;
    shoppingListCounterTemplate?: Element | null;
    el: Element | null;
    scriptEls: ReturnType<typeof transformScriptData>;
}) => {
    let container: HTMLDivElement | null = null;
    publicationType = publicationType || 'paged';

    const translations = {
        close: translate('publication_viewer_close_label'),
        shoppingList: translate('publication_viewer_shopping_list_label'),
        overview: translate('publication_viewer_overview_button')
    };

    const renderShoppingListCounter = () => {
        const shoppingListCountEl = container?.querySelector(
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

    const toggleSidebar = () => {
        if (scriptEls.enableSidebar) {
            const sidebarControl = container?.querySelector<HTMLDivElement>(
                '.sgn__sidebar-control'
            );
            const sgnContainer =
                publicationType === 'incito'
                    ? el?.querySelector('.sgn__incito')
                    : el?.querySelector('.sgn__pp');
            const matchedMedia = window.matchMedia('(max-width: 840px)');

            const toggleClasslist = ({matches}) => {
                if (matches) {
                    sgnContainer?.classList.add('sgn__sidebar--close');
                } else {
                    sgnContainer?.classList.remove('sgn__sidebar--close');
                }
            };
            toggleClasslist(matchedMedia);

            if (matchedMedia.addEventListener) {
                matchedMedia.addEventListener('change', toggleClasslist);
            } else if (matchedMedia.addListener) {
                matchedMedia.addListener(toggleClasslist);
            }

            sidebarControl?.addEventListener('click', (e) => {
                sgnContainer?.classList.toggle('sgn__sidebar--close');
                sgnContainer?.classList.toggle('sgn__sidebar--open');
                sidebarControl?.classList.toggle('sgn__sidebar-control-open');
            });
        }
    };

    const setNavColor = (color) => {
        const sgnNav = container?.querySelector<HTMLDivElement>('.sgn__nav');

        if (sgnNav) {
            sgnNav.style.backgroundColor = color || 'transparent';
            sgnNav.style.color =
                getColorBrightness(color) === 'dark' ? '#ffffff' : '#000000';
        }

        if (scriptEls.enableSidebar) {
            const sidebar = container?.querySelector<HTMLDivElement>(
                '.sgn__sidebar-content-container'
            );
            if (sidebar) {
                sidebar.style.backgroundColor = color || 'transparent';
                sidebar.style.color =
                    getColorBrightness(color) === 'dark'
                        ? '#ffffff'
                        : '#000000';
            }
        }
    };

    const show = (data: {details?: V2Catalog} = {}) => {
        setNavColor(`#${data?.details?.branding?.color || '2c2c2e'}`);

        if (scriptEls.enableSidebar) {
            container
                ?.querySelector('.sgn__sidebar')
                ?.classList.add(
                    `sgn-animate-sidebar-${scriptEls.sidebarPosition}`
                );
        } else {
            container
                ?.querySelector('.sgn__header')
                ?.classList.add('sgn-animate-header');
        }
    };

    const addClosePubListener = () => {
        const sgnContainer =
            publicationType === 'incito'
                ? el?.querySelector('.sgn__incito')
                : el?.querySelector('.sgn__pp');
        const closeBtn = container?.querySelector('.sgn__close-publication');

        closeBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            destroyPublication(sgnContainer);
        });

        sgnContainer?.addEventListener(
            'keyup',
            (e: KeyboardEvent) => {
                if (e.keyCode === EscKey && closeBtn) {
                    destroyPublication(sgnContainer);
                }
            },
            false
        );
    };

    const destroyPublication = (sgnContainer) => {
        sgnContainer?.parentNode?.removeChild(sgnContainer);
        removeHtmlClass();

        pushQueryParam({
            [scriptEls.publicationIdParam]: null,
            [scriptEls.pageIdParam]: null,
            [scriptEls.sectionIdParam]: null
        });
        location.hash = '';
    };

    const removeHtmlClass = () => {
        if (scriptEls.disableGlobalScrollbar) {
            const htmlEl = document.querySelector('html');

            htmlEl?.classList.remove('sgn-paged-publication--open');
            htmlEl?.classList.remove('sgn-incito-publication--open');
        }
    };

    const addStorageListener = () => {
        window.addEventListener(
            'tjek_shopping_list_update',
            renderShoppingListCounter,
            false
        );
    };

    const render = () => {
        container = document.createElement('div');
        container.className = scriptEls.enableSidebar
            ? 'sidebar-content'
            : 'sgn__header-content';
        container.innerHTML = Mustache.render(
            template?.innerHTML ||
                (scriptEls.enableSidebar ? sidebarTemplate : defaultTemplate),
            {
                enableSidebar: scriptEls.enableSidebar,
                translations,
                disableHeader: scriptEls.disableHeader,
                disableShoppingList:
                    scriptEls.disableShoppingList ||
                    scriptEls.offerClickBehavior ===
                        'open_webshop_link_in_tab' ||
                    scriptEls.offerClickBehavior === 'redirect_to_webshop_link',
                disableMenu: scriptEls.disableMenu,
                disableClose: scriptEls.disableClose,
                showHeaderLabels: scriptEls.showHeaderLabels,
                isIncito: publicationType === 'incito'
            }
        );

        renderShoppingListCounter();
        addStorageListener();
        addClosePubListener();
        toggleSidebar();

        return container;
    };

    return {render, show};
};

export default Header;
