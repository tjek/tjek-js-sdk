import Mustache from 'mustache';
import {Viewer} from '../../../paged-publication';
import {
    createModal,
    getDateRange,
    getPubState,
    getPubStateMessage,
    translate
} from '../helpers/component';
import {transformScriptData} from '../helpers/transformers';
import SectionList from '../incito-publication/section-list';
import PageList from '../paged-publication/page-list';
import './menu-popup.styl';
import OfferList from './offer-list';
import PublicationDownload from './publication-download';

const defaultTemplate = `\
    <div class="sgn-popup-container sgn-menu-popup">
        <div class="sgn-menu-popup-labels">
            <div class="sgn-menu-label">
                <span>{{label}}</span>
            </div>
            <div class="sgn-menu-date">
                <span data-validity-state="{{status}}">{{dateRange}}</span>
            </div>
        </div>
        {{^disableDownload}}
            <div class="sgn-menu-download">
                <button class="sgn__offer-download">{{translations.downloadButton}}</button>
            </div>
        {{/disableDownload}}
        <div class="sgn-clearfix"></div>
        {{#isIncito}}
            {{#hasSections}}
            <div class="sgn-menu-tab">
                <button class="sgn-menu-tab-btn sgn-menu-tab-btn-active">{{translations.overviewButton}}</button>
                <button class="sgn-menu-tab-btn">{{translations.offersButton}}</button>
            </div>
            <div class="sgn-menu-tab-content-container">
                <div class="sgn-menu-tab-content sgn-menu-tab-content-active">
                    <div class="sgn-menu-tab-content-sections"></div>
                </div>
                <div class="sgn-menu-tab-content">
                    <div class="sgn-menu-tab-content-offers"></div>
                </div>
            </div>
            {{/hasSections}}
            {{^hasSections}}
            <div class="sgn-menu-tab-content-container">
                <div class="sgn-menu-tab-content sgn-menu-tab-content-active">
                    <div class="sgn-menu-tab-content-offers"></div>
                </div>
            </div>
            {{/hasSections}}
        {{/isIncito}}
        {{^isIncito}}
            <div class="sgn-menu-tab">
                <button class="sgn-menu-tab-btn sgn-menu-tab-btn-active">{{translations.pagesButton}}</button>
                <button class="sgn-menu-tab-btn">{{translations.offersButton}}</button>
            </div>
            <div class="sgn-menu-tab-content-container">
                <div class="sgn-menu-tab-content sgn-menu-tab-content-active">
                    <div class="sgn-menu-tab-content-pages"></div>
                </div>
                <div class="sgn-menu-tab-content">
                    <div class="sgn-menu-tab-content-offers"></div>
                </div>
        </div>
        {{/isIncito}}
    </div>\
`;

const MenuPopup = ({
    publicationType,
    configs,
    sgnData,
    sgnViewer,
    templates,
    scriptEls
}: {
    publicationType?: string;
    configs: {
        apiKey: string;
        coreUrl: string;
        id?: string;
        businessId?: string;
    };
    sgnData;
    sgnViewer?: Viewer;
    templates: {
        mainContainer: HTMLElement | null;
        headerContainer: HTMLElement | null;
        offerList: HTMLElement | null;
        shoppingList: HTMLElement | null;
        shoppingListCounter: HTMLElement | null;
        sectionList?: HTMLElement | null;
        pageList?: HTMLElement | null;
        offerOverview: HTMLElement | null;
        menuContainer: HTMLElement | null;
    };
    scriptEls: ReturnType<typeof transformScriptData>;
}) => {
    publicationType = publicationType || 'paged';

    const translations = {
        localeCode: translate('locale_code'),
        pagesButton: translate('publication_viewer_pages_button'),
        overviewButton: translate('publication_viewer_overview_button'),
        offersButton: translate('publication_viewer_offers_button'),
        downloadButton: translate('publication_viewer_download_button')
    };

    let container: HTMLDivElement | null = null;
    const render = async () => {
        container = document.createElement('div');
        container.className = 'sgn-menu-popup-container';

        container.innerHTML = Mustache.render(
            templates.menuContainer?.innerHTML || defaultTemplate,
            {
                translations,
                label: sgnData?.details?.label,

                dateRange: getDateRange(
                    sgnData?.details?.run_from,
                    sgnData?.details?.run_till
                ),
                status: getPubState(
                    sgnData?.details?.run_from,
                    sgnData?.details?.run_till
                ),
                statusMessage: getPubStateMessage(
                    sgnData?.details?.run_from,
                    sgnData?.details?.run_till
                ),
                disableDownload: sgnData?.details?.pdf_url
                    ? scriptEls.disableDownload
                    : true,
                isIncito: publicationType === 'incito',
                hasSections: sgnData?.incito?.table_of_contents?.length > 0
            }
        );

        createModal(container);
        renderPageList();
        renderSectionList();
        renderOfferList();
        addTabClickListener();
        renderDownload();
    };

    const addTabClickListener = () => {
        const tabContentItems = container?.querySelectorAll(
            '.sgn-menu-tab-content'
        );

        container
            ?.querySelectorAll('.sgn-menu-tab-btn')
            .forEach((itemEl, index) => {
                itemEl.addEventListener(
                    'click',
                    (e) => {
                        hideTabContents();
                        if (tabContentItems?.[index]) {
                            (
                                e.currentTarget as HTMLButtonElement | null
                            )?.classList.add('sgn-menu-tab-btn-active');

                            tabContentItems[index].classList.add(
                                'sgn-menu-tab-content-active'
                            );
                        }
                    },
                    false
                );
            });
    };

    const hideTabContents = () => {
        container?.querySelectorAll('.sgn-menu-tab-btn').forEach((itemEl) => {
            itemEl.classList.remove('sgn-menu-tab-btn-active');
        });

        container
            ?.querySelectorAll('.sgn-menu-tab-content')
            .forEach((itemEl) => {
                itemEl.classList.remove('sgn-menu-tab-content-active');
            });
    };

    const renderPageList = async () =>
        container?.querySelector('.sgn-menu-tab-content-pages')?.appendChild(
            await PageList({
                scriptEls,
                configs,
                sgnData,
                sgnViewer,
                template: templates.pageList
            }).render()
        );

    const renderSectionList = async () =>
        container?.querySelector('.sgn-menu-tab-content-sections')?.appendChild(
            await SectionList({
                sgnData,
                template: templates.sectionList
            }).render()
        );

    const renderOfferList = async () =>
        container?.querySelector('.sgn-menu-tab-content-offers')?.appendChild(
            await OfferList({
                scriptEls,
                publicationType,
                configs,
                sgnViewer,
                template: templates.offerList
            }).render()
        );

    const renderDownload = () => {
        PublicationDownload({configs}).render();
    };

    return {render};
};

export default MenuPopup;
