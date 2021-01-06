import MicroEvent from 'microevent';
import Mustache from 'mustache';
import Gator from '../../../vendor/gator';
import * as keyCodes from '../../key-codes';

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

class Popover {
    constructor(options = {}) {
        this.keyUp = this.keyUp.bind(this);
        this.resize = this.resize.bind(this);
        this.scroll = this.scroll.bind(this);
        this.options = options;
        this.el = document.createElement('div');
        this.backgroundEl = document.createElement('div');
    }

    render() {
        const {
            header,
            singleChoiceItems,
            template = defaultTemplate
        } = this.options;

        const view = {
            header,
            singleChoiceItems: singleChoiceItems?.map((item, index) => ({
                item,
                index
            }))
        };

        this.el.className = 'sgn-popover';
        this.el.setAttribute('tabindex', -1);
        this.el.innerHTML = Mustache.render(template, view);

        this.position();
        this.addEventListeners();

        return this;
    }

    destroy() {
        Gator(this.el).off();

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

        const menuEl = this.el.querySelector('.sgn-popover__menu');

        const width = menuEl.offsetWidth;
        const height = menuEl.offsetHeight;
        const parentWidth = this.el.parentNode.offsetWidth;
        const parentHeight = this.el.parentNode.offsetHeight;
        const boundingRect = this.el.parentNode.getBoundingClientRect();

        top -= boundingRect.top;
        left -= boundingRect.left;

        top -= window.pageYOffset;
        left -= window.pageXOffset;

        if (top + height > parentHeight) {
            menuEl.style.top = parentHeight - height + 'px';
        } else {
            menuEl.style.top = top + 'px';
        }

        if (left + width > parentWidth) {
            menuEl.style.left = parentWidth - width + 'px';
        } else {
            menuEl.style.left = left + 'px';
        }
    }

    addEventListeners() {
        const trigger = this.trigger.bind(this);

        this.el.addEventListener('keyup', this.keyUp);

        Gator(this.el).on('click', '[data-index]', function (e) {
            e.preventDefault();
            e.stopPropagation();

            trigger('selected', {index: +this.getAttribute('data-index')});
        });

        Gator(this.el).on('click', '[data-close]', (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.destroy();
        });

        Gator(this.el).on('click', '.sgn-popover__menu', (e) => {
            e.stopPropagation();
        });

        window.addEventListener('resize', this.resize, false);
        window.addEventListener('scroll', this.scroll, false);
    }

    keyUp(e) {
        if (e.keyCode === keyCodes.ESC) {
            this.destroy();
        }
    }

    resize() {
        this.destroy();
    }

    scroll() {
        this.destroy();
    }
}

MicroEvent.mixin(Popover);

export default Popover;
