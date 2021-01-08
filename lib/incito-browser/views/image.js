import {isDefinedStr} from '../utils';
import './image.styl';
import View from './view';

class Image extends View {
    render() {
        if (isDefinedStr(this.attrs.src)) {
            this.el.setAttribute('data-src', this.attrs.src);
        }

        if (isDefinedStr(this.attrs.label)) {
            this.el.setAttribute('alt', this.attrs.label);
        } else {
            this.el.setAttribute('alt', '');
        }

        return this;
    }
}
Image.prototype.tagName = 'img';
Image.prototype.className = 'incito__image-view';
Image.prototype.lazyload = true;
export default Image;
