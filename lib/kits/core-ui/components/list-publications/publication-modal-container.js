import Mustache from 'mustache';
import {ComponentHelper} from '../helpers';
import './publication-modal-container.styl';

const defaultTemplate = `\
<div class="sgn__publication-modal">
    <header class="sgn-pp__header sgn__navbar">
        <section class="sgn-navbar__section">
            <a id="sgn-publication-modal__close" class="sgn__btn sgn-btn--fab" href="#">
                ×
            </a>
        </section>
        <section class="sgn-navbar__section"></section>
    </header>
    <div id="sgn-paged-publication-modal-container"></div>
</div>\
`;

const publicationModalContainer = ({template}) => {
    const _pubListContainer = document.querySelector('.sgn__publications');
    const _template = template?.innerHTML || defaultTemplate;
    let _container = null;

    const destroy = (e) => {
        e.stopPropagation();
        _pubListContainer.classList.remove('sgn-hide');
        _container?.parentNode?.removeChild(_container);
    };

    const addCloseModalListener = () => {
        const closeModalBtn = document.querySelector(
            '#sgn-publication-modal__close'
        );
        closeModalBtn.addEventListener('click', destroy, false);
    };

    const render = () => {
        _container = document.createElement('div');
        _container.className = 'sgn-publication-modal-container';
        ComponentHelper.insertAfter(_pubListContainer, _container);
        _container.innerHTML = Mustache.render(_template, {});

        _pubListContainer.classList.add('sgn-hide');
        addCloseModalListener();
    };

    return {render};
};

export default publicationModalContainer;
