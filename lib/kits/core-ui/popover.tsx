import {Fragment, h, render} from 'preact';
import MicroEvent from '../../../vendor/microevent';
import * as keyCodes from '../../key-codes';
import './popover.styl';

interface PopoverOptions {
    header?: string;
    singleChoiceItems?: any;
    x: number;
    y: number;
}
class Popover extends MicroEvent {
    el = document.createElement('div');
    backgroundEl = document.createElement('div');
    options: PopoverOptions;
    constructor(options: PopoverOptions) {
        super();
        this.options = options;
    }

    render() {
        const {header, singleChoiceItems} = this.options;

        this.el.className = 'sgn-popover';
        this.el.setAttribute('tabindex', '-1');

        render(
            <>
                <div
                    class="sgn-popover__background"
                    onClick={() => this.destroy()}
                ></div>
                <div class="sgn-popover__menu">
                    {header && <div class="sgn-popover__header">{header}</div>}
                    <div class="sgn-popover__content">
                        <ul>
                            {singleChoiceItems.map((item, index) => (
                                <li
                                    onClick={() =>
                                        this.trigger('selected', {index})
                                    }
                                >
                                    <p class="sgn-popover-item__title">
                                        {item.title}
                                    </p>
                                    {item.subtitle && (
                                        <p class="sgn-popover-item__subtitle">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>,
            this.el
        );

        this.position();
        this.addEventListeners();

        return this;
    }

    destroy() {
        window.removeEventListener('resize', this.resize, false);
        window.removeEventListener('scroll', this.scroll, false);

        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);

            this.trigger('destroyed');
        }
    }

    position() {
        let top = this.options.y;
        let left = this.options.x;

        const menuEl =
            this.el.querySelector<HTMLDivElement>('.sgn-popover__menu');

        if (menuEl && this.el.parentElement) {
            const width = menuEl.offsetWidth;
            const height = menuEl.offsetHeight;
            const parentWidth = this.el.parentElement.offsetWidth;
            const parentHeight = this.el.parentElement.offsetHeight;
            const boundingRect = this.el.parentElement.getBoundingClientRect();

            top -= boundingRect.top;
            left -= boundingRect.left;

            top -= window.pageYOffset;
            left -= window.pageXOffset;

            menuEl.style.top =
                top + height > parentHeight
                    ? parentHeight - height + 'px'
                    : top + 'px';

            menuEl.style.left =
                left + width > parentWidth
                    ? parentWidth - width + 'px'
                    : left + 'px';
        }
    }

    addEventListeners() {
        this.el.addEventListener('keyup', this.keyUp);

        window.addEventListener('resize', this.resize, false);
        window.addEventListener('scroll', this.scroll, false);
    }

    keyUp = (e) => {
        if (e.keyCode === keyCodes.ESC) this.destroy();
    };

    resize = () => {
        this.destroy();
    };

    scroll = () => {
        this.destroy();
    };
}

export default Popover;
