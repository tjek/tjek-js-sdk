import {getScrollContainer} from '../../util';
import Viewer from './viewer';

export default class Controls {
    viewer: Viewer;
    progressEl: HTMLElement | null;
    scrollContainerEl: HTMLElement | null;
    constructor(viewer: Viewer) {
        this.viewer = viewer;
        this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');

        if (this.progressEl) {
            this.scrollContainerEl = getScrollContainer(this.viewer.el);

            this.scroll();
            this.scrollContainerEl?.addEventListener(
                'scroll',
                this.scroll,
                false
            );
        }
    }

    destroy = () => {
        this.scrollContainerEl?.removeEventListener(
            'scroll',
            this.scroll,
            false
        );
    };

    scroll = () => {
        if (!this.scrollContainerEl) return;

        const progress = Math.round(
            (this.scrollContainerEl.scrollTop /
                (this.scrollContainerEl.scrollHeight -
                    this.scrollContainerEl.clientHeight)) *
                100
        );

        this.progressEl!.textContent = `${progress} %`;

        this.viewer.trigger('progress', {progress});
    };
}
