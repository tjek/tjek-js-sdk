export default class Controls {
    constructor(viewer) {
        this.scroll = this.scroll.bind(this);
        this.viewer = viewer;
        this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');

        if (this.progressEl) {
            this.progressEl.textContent = '0 %';

            window.addEventListener('scroll', this.scroll, false);
        }
    }

    destroy() {
        window.removeEventListener('scroll', this.scroll, false);
    }

    scroll() {
        const winHeight = window.innerHeight;
        const rect = this.viewer.el.getBoundingClientRect();
        const progress = Math.min(
            100,
            Math.round((Math.abs(rect.top - winHeight) / rect.height) * 100)
        );

        this.progressEl.textContent = `${progress} %`;
        this.viewer.trigger('progress', {progress});
    }
}
