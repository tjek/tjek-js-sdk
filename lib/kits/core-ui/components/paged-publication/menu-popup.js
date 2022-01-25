import Mustache from 'mustache';
import {PageList, OfferList, PublicationDownload} from './';
import {ComponentHelper, translate} from '../helpers';
import './menu-popup.styl';

const defaultTemplate = `\
    <div class="sgn-popup-container sgn-menu-popup">
        <div class="sgn-menu-popup-labels">
            <div class="sgn-menu-label">
                <span>{{label}}</span>
            </div>
            <div class="sgn-menu-till">
                <span>{{translations.untilLabel}} {{till}}</span>
            </div>
        </div>
        <div class="sgn-menu-download">
            <button class="sgn__offer-download">{{translations.downloadButton}}</button>
        </div>
        <div class="sgn-clearfix"></div>
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
    </div>\
`;

const menuPopup = ({configs, sgnData, viewer, templates}) => {
    const _configs = configs;
    const _sgnData = sgnData;
    const _viewer = viewer;
    const _templates = templates;
    const _headNav = document.querySelector('.sgn__nav');
    let _container = null;

    const _translations = {
        localeCode: translate('locale_code'),
        untilLabel: translate('paged_publication_viewer_until_label'),
        pagesButton: translate('paged_publication_viewer_pages_button'),
        offersButton: translate('paged_publication_viewer_offers_button'),
        downloadButton: translate('paged_publication_viewer_download_button')
    };

    const render = async () => {
        _container = document.createElement('div');
        _container.className = 'sgn-menu-popup-container';
        ComponentHelper.insertAfter(_headNav, _container);

        _container.innerHTML = Mustache.render(
            _templates.menuContainer?.innerHTML || defaultTemplate,
            {
                translations: _translations,
                label: _sgnData?.details?.label,
                from: ComponentHelper.formatDate(
                    _sgnData?.details?.run_from,
                    _translations.localeCode,
                    {
                        dateStyle: 'full',
                        timeStyle: 'medium'
                    }
                ),
                till: ComponentHelper.formatDate(
                    _sgnData?.details?.run_till,
                    _translations.localeCode,
                    {
                        dateStyle: 'full',
                        timeStyle: 'medium'
                    }
                )
            }
        );
        renderPageList();
        renderOfferList();
        addTabClickListener();
        renderDownload();
        ComponentHelper.addBlockerListenerTo(_container);
    };

    const addTabClickListener = () => {
        const tabBtnItems = _container.querySelectorAll('.sgn-menu-tab-btn');
        const tabContentItems = _container.querySelectorAll(
            '.sgn-menu-tab-content'
        );

        tabBtnItems.forEach((itemEl, index) =>
            itemEl.addEventListener(
                'click',
                (e) => {
                    hideTabContents();
                    if (tabContentItems[index]) {
                        e.currentTarget.classList.add(
                            'sgn-menu-tab-btn-active'
                        );
                        tabContentItems[index].classList.add(
                            'sgn-menu-tab-content-active'
                        );
                    }
                },
                false
            )
        );
    };

    const hideTabContents = () => {
        const tabBtnItems = _container.querySelectorAll('.sgn-menu-tab-btn');
        const tabContentItems = _container.querySelectorAll(
            '.sgn-menu-tab-content'
        );

        tabBtnItems.forEach((itemEl) => {
            itemEl.classList.remove('sgn-menu-tab-btn-active');
        });

        tabContentItems.forEach((itemEl) => {
            itemEl.classList.remove('sgn-menu-tab-content-active');
        });
    };

    const renderPageList = async () => {
        let pageListContainer = _container.querySelector(
            '.sgn-menu-tab-content-pages'
        );
        const pageList = await PageList({
            configs: _configs,
            sgnData: _sgnData,
            viewer: _viewer,
            template: _templates.pageList
        }).render();

        ComponentHelper.insertInside(pageListContainer, pageList);
    };

    const renderOfferList = async () => {
        let offerListContainer = _container.querySelector(
            '.sgn-menu-tab-content-offers'
        );
        const offerList = await OfferList({
            configs: _configs,
            viewer: _viewer,
            template: _templates.offerList
        }).render();

        ComponentHelper.insertInside(offerListContainer, offerList);
    };

    const renderDownload = () => {
        PublicationDownload({
            configs: _configs
        }).render();
    };

    return {render};
};

export default menuPopup;
