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
                <button class="sgn__close-publication" aria-label="{{translations.close}}">
                    <svg
                        aria-hidden="true"
                        class="sgn-header-icon-svg sgn-header-icon-svg-close"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            fill="currentColor"
                            d="M272.5 5.7c9-7.6 22.1-7.6 31.1 0l264 224c10.1 8.6 11.4 23.7 2.8 33.8s-23.7 11.3-33.8 2.8L512 245.5V432c0 44.2-35.8 80-80 80H144c-44.2 0-80-35.8-80-80V245.5L39.5 266.3c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l264-224zM288 55.5L112 204.8V432c0 17.7 14.3 32 32 32h48V312c0-22.1 17.9-40 40-40H344c22.1 0 40 17.9 40 40V464h48c17.7 0 32-14.3 32-32V204.8L288 55.5zM240 464h96V320H240V464z"
                        />
                    </svg>
                    <div class="sgn__nav-label">
                        <span>{{translations.close}}</span>
                    </div>
                </button>
            {{/disableClose}}
            {{^disableShoppingList}}
                <button class="sgn__offer-shopping" aria-label="{{translations.shoppingList}}">
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
                <button class="sgn__nav-menu-btn" aria-label="{{translations.overview}}">
                    <svg
                        aria-hidden="true"
                        class="sgn-header-icon-svg sgn-header-icon-svg-close"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
                        />
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
    {{^disableHeader}}
    {{^disableClose}}
    <div class="sgn__nav-content-mobile" data-show-labels="{{showHeaderLabels}}">
        <button class="sgn__close-publication">
            <svg
                aria-hidden="true"
                class="sgn-header-icon-svg sgn-header-icon-svg-close"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
            >
                <path
                    fill="currentColor"
                    d="M272.5 5.7c9-7.6 22.1-7.6 31.1 0l264 224c10.1 8.6 11.4 23.7 2.8 33.8s-23.7 11.3-33.8 2.8L512 245.5V432c0 44.2-35.8 80-80 80H144c-44.2 0-80-35.8-80-80V245.5L39.5 266.3c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l264-224zM288 55.5L112 204.8V432c0 17.7 14.3 32 32 32h48V312c0-22.1 17.9-40 40-40H344c22.1 0 40 17.9 40 40V464h48c17.7 0 32-14.3 32-32V204.8L288 55.5zM240 464h96V320H240V464z"
                />
            </svg>
        </button>
    </div>
    {{/disableClose}}
    {{/disableHeader}}
    <div class="sgn__sidebar sgn__sidebar--open">
        {{^disableHeader}}
        <div class="sgn__nav">
            <div class="sgn__nav-content" data-show-labels="{{showHeaderLabels}}">
            {{^disableClose}}
                <button class="sgn__close-publication" aria-label="{{translations.close}}">
                    <svg
                        aria-hidden="true"
                        class="sgn-header-icon-svg sgn-header-icon-svg-close"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            fill="currentColor"
                            d="M272.5 5.7c9-7.6 22.1-7.6 31.1 0l264 224c10.1 8.6 11.4 23.7 2.8 33.8s-23.7 11.3-33.8 2.8L512 245.5V432c0 44.2-35.8 80-80 80H144c-44.2 0-80-35.8-80-80V245.5L39.5 266.3c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l264-224zM288 55.5L112 204.8V432c0 17.7 14.3 32 32 32h48V312c0-22.1 17.9-40 40-40H344c22.1 0 40 17.9 40 40V464h48c17.7 0 32-14.3 32-32V204.8L288 55.5zM240 464h96V320H240V464z"
                        />
                    </svg>
                    <div class="sgn__nav-label">
                        <span>{{translations.close}}</span>
                    </div>
                </button>
            {{/disableClose}}
            {{^disableShoppingList}}
                <button class="sgn__offer-shopping" aria-label="{{translations.shoppingList}}">
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
                <button class="sgn__nav-menu-btn" aria-label="{{translations.overview}}">
                    <svg
                        aria-hidden="true"
                        class="sgn-header-icon-svg sgn-header-icon-svg-close"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
                        />
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
            const matchedMedia = window.matchMedia('(max-width: 1200px)');

            const toggleClasslist = ({matches}) => {
                if (matches) {
                    sgnContainer?.classList.add('sgn__sidebar--close');
                    sidebarControl?.classList.remove(
                        'sgn__sidebar-control-open'
                    );
                } else {
                    sgnContainer?.classList.remove('sgn__sidebar--close');
                    sgnContainer?.classList.remove('sgn__sidebar--open');
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
        if (scriptEls.enableSidebar) {
            const sidebar =
                container?.querySelector<HTMLDivElement>('.sgn__sidebar');
            if (sidebar) {
                sidebar.style.backgroundColor = color || 'transparent';
                sidebar.style.color =
                    getColorBrightness(color) === 'dark'
                        ? '#ffffff'
                        : '#000000';
            }
        } else {
            const sgnNav =
                container?.querySelector<HTMLDivElement>('.sgn__nav');

            if (sgnNav) {
                sgnNav.style.backgroundColor = color || 'transparent';
                sgnNav.style.color =
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

            container
                ?.querySelector('.sgn__close-publication')
                ?.classList.add(`sgn-animate-home-close`);

            container
                ?.querySelector('.sgn__sidebar-control-bars')
                ?.classList.add(`sgn-animate-sidebar-controls`);
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
        const closeBtns = container?.querySelectorAll(
            '.sgn__close-publication'
        );

        closeBtns?.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                destroyPublication(sgnContainer);
            });
        });

        sgnContainer?.addEventListener(
            'keyup',
            (e: KeyboardEvent) => {
                if (e.keyCode === EscKey && closeBtns?.length) {
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
