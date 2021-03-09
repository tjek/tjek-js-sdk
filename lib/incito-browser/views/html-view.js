import {isDefinedStr} from '../utils';
import './html-view.styl';
import View from './view';


class HTMLView extends View {
    render() {
        if (isDefinedStr(this.attrs.style)) {
            this.el.style = this.attrs.style;
        }

        if (isDefinedStr(this.attrs.text)) {
            this.el.innerText = this.attrs.text;
        }

        if (isDefinedStr(this.attrs.src)) {
            this.el.src = this.attrs.src;
        }

        if (this.attrs.dataset) {
            for (const id in this.attrs.dataset) {
                this.el.setAttribute(`data-${id}`, this.attrs.dataset[id]);
            }
        }

        if (isDefinedStr(this.attrs.class)) {
            this.el.className += ' ' + this.attrs.class;
        }

        return this;
    }

    createElement() {
        let tagName = 'div';

        if (isDefinedStr(this.attrs.tag_name)) {
            tagName = this.attrs.tag_name;
        } else if (isDefinedStr(this.attrs.text)) {
            tagName = 'p';
        } else if (isDefinedStr(this.attrs.src)) {
            tagName = 'img';
        }

        const el = document.createElement(tagName);

        el.className = 'incito__view incito__html-view';

        return el;
    }

}

export default HTMLView;