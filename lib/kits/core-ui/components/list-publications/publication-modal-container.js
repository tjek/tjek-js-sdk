import Mustache from 'mustache';
import ComponentHelpers from '../component-helpers';
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

export default class PublicationModalContainer extends ComponentHelpers {
    constructor({configs, template}) {
        super();
        this.configs = configs;
        this.template = template;
        this.pubListContainer = document.querySelector('.sgn__publications');
        this.container = null;
    }

    render() {
        const template = this.template?.innerHTML || defaultTemplate;
        this.container = document.createElement('div');
        this.container.className = 'sgn-publication-modal-container';
        this.insertAfter(this.pubListContainer, this.container);
        this.container.innerHTML = Mustache.render(template, {});

        this.pubListContainer.classList.add('sgn-hide');
        this.addCloseModalListener();

        return this;
    }

    addCloseModalListener() {
        const closeModalBtn = document.querySelector(
            '#sgn-publication-modal__close'
        );
        closeModalBtn.addEventListener('click', this.destroy.bind(this), false);
    }

    destroy(e) {
        e.stopPropagation();
        this.pubListContainer.classList.remove('sgn-hide');
        this.container?.parentNode?.removeChild(this.container);
    }
}
