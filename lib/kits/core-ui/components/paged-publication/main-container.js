import Mustache from 'mustache';
import './main-container.styl';

const defaultTemplate = `\
    <div class="sgn__pp" data-layout-absolute="true">
        <div class="sgn__header"
        {{#headerBackground}}
            style="background-color:{{headerBackground}}";
        {{/headerBackground}}
        >
            <div class="sgn__nav-logo">
            {{#logoSrc}}
                <img src="{{logoSrc}}" alt="logo" height="30px">
            {{/logoSrc}}
            </div>
            <div class="sgn__nav">
                <button class="sgn__offer-list">Offers</button>
                <button class="sgn__offer-shopping">Shopping List</button>
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

export default class MainContainer {
    constructor({template, el, scriptEls}) {
        this.template = template;
        this.el = el;
        this.scriptEls = scriptEls;
    }

    render() {
        console.log(this.scriptEls.logoSrc);
        const template = this.template?.innerHTML || defaultTemplate;
        const data = {
            logoSrc: this.scriptEls.logoSrc,
            headerBackground: this.scriptEls.headerBackground
        };
        this.el.innerHTML = Mustache.render(template, data);
        return this;
    }
}
