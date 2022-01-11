import Mustache from 'mustache';
import {PageList, OfferList, PublicationDownload} from './';
import {ComponentHelper} from '../helpers';
import './menu-popup.styl';

const defaultTemplate = `\
    <div class="sgn-popup-container sgn-menu-popup">
        <div class="sgn-menu-popup-labels">
            <div class="sgn-menu-download">
                <span class="sgn__offer-download">Download</span>
            </div>
            <div class="sgn-menu-label">
                <span>{{label}}</span>
            </div>
            <div class="sgn-menu-till">
                <span>Til og med {{till}}</span>
            </div>
        </div>
        <div class="sgn-menu-tab">
            <button class="sgn-menu-tab-btn sgn-menu-tab-btn-active">Pages</button>
            <button class="sgn-menu-tab-btn">Offers</button>
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

const menuPopup = ({configs, sgnData, templates, scriptEl, scriptEls}) => {
    const _configs = configs;
    const _sgnData = sgnData;
    const _templates = templates;
    const _scriptEl = scriptEl;
    const _scriptEls = scriptEls;
    const _headNav = document.querySelector('.sgn__nav');
    let _container = null;

    const render = async () => {
        console.log('sgnData', _sgnData);
        _container = document.createElement('div');
        _container.className = 'sgn-menu-popup-container';
        ComponentHelper.insertAfter(_headNav, _container);

        const dateFrom = new Date(_sgnData?.details?.run_from);
        const dateTill = new Date(_sgnData?.details?.run_till);

        _container.innerHTML = Mustache.render(
            _templates.menuContainer?.innerHTML || defaultTemplate,
            {
                label: _sgnData?.details?.label,
                from: dateFrom.toDateString(),
                till: dateTill.toDateString()
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
            template: _templates.pageList,
            scriptEl: _scriptEl,
            mainContainer: _scriptEls.mainContainer
        }).render();

        ComponentHelper.insertInside(pageListContainer, pageList);
    };

    const renderOfferList = async () => {
        let offerListContainer = _container.querySelector(
            '.sgn-menu-tab-content-offers'
        );
        const offerList = await OfferList({
            configs: _configs,
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
