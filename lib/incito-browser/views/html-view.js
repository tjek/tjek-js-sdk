import {isDefinedStr} from '../utils';
import './html-view.styl';
import View from './view';

class HTMLView extends View {
    render() {
        if (isDefinedStr(this.attrs.style)) {
            this.el.style = this.attrs.style;
        }

        return this;
    }
}

HTMLView.prototype.tagName = 'div';
HTMLView.prototype.className = 'incito__html-view';
export default HTMLView;