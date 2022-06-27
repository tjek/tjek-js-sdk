import MicroEvent from 'microevent';
import Mustache from 'mustache';
import * as keyCodes from '../../key-codes';
import {off, on} from '../../util';
import './popover.styl';

const defaultTemplate = `\
<div class="sgn-popover__background" data-close></div>
<div class="sgn-popover__menu">
    {{#header}}
        <div class="sgn-popover__header">{{header}}</div>
    {{/header}}
    <div class="sgn-popover__content">
        <ul>
            {{#singleChoiceItems}}
                <li data-index="{{index}}">
                    <p class="sgn-popover-item__title">{{item.title}}</p>
                    {{#item.subtitle}}
                        <p class="sgn-popover-item__subtitle">{{item.subtitle}}</p>
                    {{/item.subtitle}}
                </li>
            {{/singleChoiceItems}}
        </ul>
    </div>
</div>\
`;

interface PopoverOptions {
    header?: string;
    singleChoiceItems?: any;
    template?: string;
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
        const {header, singleChoiceItems, template} = this.options;

        this.el.className = 'sgn-popover';
        this.el.setAttribute('tabindex', '-1');
        this.el.innerHTML = Mustache.render(template || defaultTemplate, {
            header,
            singleChoiceItems: singleChoiceItems?.map((item, index) => ({
                item,
                index
            }))
        });

        this.position();
        this.addEventListeners();

        return this;
    }

    destroy() {
        off(this.el);

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
        const trigger = this.trigger.bind(this);

        this.el.addEventListener('keyup', this.keyUp);

        on(this.el, 'click', '[data-index]', function (e) {
            e.preventDefault();
            e.stopPropagation();

            trigger('selected', {index: this.dataset.index});
        });

        on(this.el, 'click', '[data-close]', (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.destroy();
        });

        on(this.el, 'click', '.sgn-popover__menu', (e) => {
            e.stopPropagation();
        });

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
