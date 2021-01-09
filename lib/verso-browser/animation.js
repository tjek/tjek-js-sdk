export default class Animation {
    run = 0;
    constructor(el) {
        this.el = el;
    }

    animate(options = {}, callback = () => {}) {
        const x = options.x ?? 0;
        const y = options.y ?? 0;
        const scale = options.scale ?? 1;
        const easing = options.easing ?? 'ease-out';
        const duration = options.duration ?? 0;
        const run = ++this.run;
        const transform = `translateX(${x}) translateY(${y}) scale(${scale})`;

        if (this.el.style.transform === transform) {
            callback();
        } else if (duration > 0) {
            var transitionEnd = () => {
                if (run !== this.run) {
                    return;
                }

                this.el.removeEventListener('transitionend', transitionEnd);
                this.el.style.transition = 'none';

                callback();
            };

            this.el.addEventListener('transitionend', transitionEnd, false);

            this.el.style.transition = `transform ${easing} ${duration}ms`;
            this.el.style.transform = transform;
        } else {
            this.el.style.transition = 'none';
            this.el.style.transform = transform;

            callback();
        }

        return this;
    }
}
