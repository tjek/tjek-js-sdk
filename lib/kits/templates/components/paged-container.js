import Mustache from 'mustache';
import './paged-container.styl';

const defaultTemplate = `\
    <div class="sgn__pp" data-layout-absolute="true">
        <div class="sgn__header">
            <div class="sgn__nav-logo"></div>
            <div class="sgn__nav">
                <button class="sgn__offer-list">Offers</button>
                <button class="sgn__offer-cart">List</button>
                <button class="sgn__offer-pages">Pages</button>
                <button class="sgn__offer-download">Download</button>
            </div>
        </div>
        <div class="verso">
            <div class="verso__scroller">
                <div class="sgn-pp__pages"></div>
            </div>
        </div>
        <div class="sgn-pp__progress">
            <div class="sgn-pp-progress__bar"></div>
        </div>
        <div class="sgn-pp__progress-label"></div>
        <a
            class="sgn-pp__control"
            href="#"
            role="button"
            data-direction="prev"
            >&lsaquo;</a
        >
        <a
            class="sgn-pp__control"
            href="#"
            role="button"
            data-direction="next"
            >&rsaquo;</a
        >
    </div>\
`;

export default class PagedContainer {
    constructor({template, el}) {
        this.template = template;
        this.el = el;
    }

    render() {
        const template = this.template?.innerHTML || defaultTemplate;
        const data = {};
        this.el.innerHTML = Mustache.render(template, data);
        return this;
    }
}
