module.exports = class Controls {
    constructor(viewer) {
        this.scroll = this.scroll.bind(this);
        this.viewer = viewer;
        this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');
        this.isScrolling = false;

        if (this.progressEl) {
            this.progressEl.textContent = '0 %';

            window.addEventListener('scroll', this.scroll, false);

            this.viewer.bind('destroyed', () => {
                window.removeEventListener('scroll', this.scroll, false);
            });
        }
    }

    scroll() {
        const winHeight = window.innerHeight;
        const rect = this.viewer.el.getBoundingClientRect();
        const progress = Math.min(
            100,
            Math.round((Math.abs(rect.top - winHeight) / rect.height) * 100)
        );

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;

            this.viewer.el.classList.remove('sgn-incito--scrolling');
        }, 1000);

        if (this.isScrolling === false) {
            this.viewer.el.classList.add('sgn-incito--scrolling');

            this.isScrolling = true;
        }

        this.progressEl.textContent = `${progress} %`;
        this.viewer.trigger('progress', {progress});
    }
};
