export default class Controls {
    constructor(viewer) {
        this.viewer = viewer;
        this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');

        if (this.progressEl) {
            this.scroll();
            window.addEventListener('scroll', this.scroll, false);
        }
    }

    destroy = () => {
        window.removeEventListener('scroll', this.scroll, false);
    };

    scroll = () => {
        const progress = Math.round(
            (window.pageYOffset /
                (document.body.scrollHeight - window.innerHeight)) *
                100
        );

        this.progressEl.textContent = `${progress} %`;

        this.viewer.trigger('progress', {progress});
    };
}
