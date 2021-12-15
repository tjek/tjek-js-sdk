import Mustache from 'mustache';
import './publication-modal-container.styl';
import {request} from '../../../core';

const defaultTemplate = `\
<div class="sgn__publication-modal">
    <header class="sgn-pp__header sgn__navbar">
        <section class="sgn-navbar__section">
            <a id="publication-modal__close" class="sgn__btn sgn-btn--fab" href="#">
                ×
            </a>
        </section>
        <section class="sgn-navbar__section"></section>
    </header>
    <div id="paged-publication"></div>
</div>\
`;

export default class PublicationModalContainer {
    constructor({configs, template, el}) {
        this.configs = configs;
        this.template = template;
        this.el = el;
    }

    async render() {
        const template = this.template?.innerHTML || defaultTemplate;
        this.el.innerHTML = Mustache.render(template, {});
        return this;
    }
}
