import {isDefinedStr} from '../utils';
import View from './view';

class Video extends View {
    render() {
        if (!isDefinedStr(this.attrs.src)) {
            return this;
        }

        this.el.muted = true;
        this.el.preload = 'metadata';
        this.el.setAttribute('muted', '');
        this.el.setAttribute('playsinline', 'true');
        this.el.setAttribute('webkit-playsinline', 'true');
        this.el.setAttribute('data-src', this.attrs.src);
        this.el.setAttribute('data-mime', this.attrs.mime);

        if (this.attrs.autoplay === true) {
            this.el.autoplay = true;
        }

        if (this.attrs.loop === true) {
            this.el.loop = true;
        }

        if (this.attrs.controls === true) {
            this.el.controls = true;
        }

        return this;
    }
}
Video.prototype.className = 'incito__video-view';
Video.prototype.tagName = 'video';
Video.prototype.lazyload = true;
export default Video;
