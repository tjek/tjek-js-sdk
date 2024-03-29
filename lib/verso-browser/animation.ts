export default class Animation {
    run = 0;
    el: HTMLElement;
    constructor(el: HTMLElement) {
        this.el = el;
    }

    animate(
        // @ts-expect-error
        {
            x = 0,
            y = 0,
            scale = 1,
            easing = 'ease-out',
            duration = 0
        }: {
            x: string | number;
            y?: string | number;
            scale?: number;
            easing?: string;
            duration?: number;
        } = {},
        callback?: () => void
    ) {
        const run = ++this.run;
        const transform = `translateX(${x}) translateY(${y}) scale(${scale})`;

        if (this.el.style.transform === transform) {
            callback?.();
        } else if (duration > 0) {
            const transitionEnd = () => {
                if (run !== this.run) return;

                this.el.removeEventListener('transitionend', transitionEnd);
                this.el.style.transition = 'none';

                callback?.();
            };

            this.el.addEventListener('transitionend', transitionEnd, false);

            this.el.style.transition = `transform ${easing} ${duration}ms`;
            this.el.style.transform = transform;
        } else {
            this.el.style.transition = 'none';
            this.el.style.transform = transform;

            callback?.();
        }

        return this;
    }
}
