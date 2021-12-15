import Mustache from 'mustache';
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
    <div id="sgn-paged-publication-container"></div>
</div>\
`;

export default class PublicationModalContainer {
    constructor({configs, template}) {
        this.configs = configs;
        this.template = template;
        this.container = null;
    }

    render() {
        const template = this.template?.innerHTML || defaultTemplate;
        const listContainer = document.querySelector('.sgn__publications');
        this.container = document.createElement('div');
        this.container.className = 'sgn-publication-modal-container';
        this.insertAfter(listContainer, this.container);
        this.container.innerHTML = Mustache.render(template, {});

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
        this.container?.parentNode?.removeChild(this.container);
    }

    insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    }
}
