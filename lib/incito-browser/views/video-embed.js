import {isDefinedStr} from '../utils';
import './video-embed.styl';
import View from './view';

const allowedHostnames = ['.youtube.com', '.vimeo.com', '.twentythree.net'];
class FlexLayout extends View {
    render() {
        if (!isDefinedStr(this.attrs.src)) {
            return this;
        }

        const {src} = this.attrs;
        const linkEl = document.createElement('a');

        linkEl.setAttribute('href', src);

        const isSupported = allowedHostnames.find(
            (hostname) => linkEl.hostname.slice(-hostname.length) === hostname
        );

        if (isSupported) {
            this.el.setAttribute('data-src', src);
            this.lazyload = true;
        }

        return this;
    }
}
FlexLayout.prototype.className = 'incito__video-embed-view';
FlexLayout.prototype.lazyload = false;
export default FlexLayout;
