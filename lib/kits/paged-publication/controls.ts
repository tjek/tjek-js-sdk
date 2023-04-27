import MicroEvent from '../../../vendor/microevent';
import * as keyCodes from '../../key-codes';
import {throttle} from '../../util';

const visibilityClassName = 'sgn-pp--hidden';
interface PagedPublicationControlsInit {
    keyboard: 'disabled' | 'enabled' | 'global';
}
class PagedPublicationControls extends MicroEvent {
    options: PagedPublicationControlsInit;
    root: HTMLElement;
    progress: HTMLElement | null;
    progressBar: HTMLElement | null;
    progressLabel: HTMLElement | null;
    prevControl: HTMLElement | null;
    nextControl: HTMLElement | null;
    close: HTMLElement | null;
    keyDownHandler: typeof this.keyDown;
    // @ts-expect-error
    constructor(el: HTMLElement, options: PagedPublicationControlsInit = {}) {
        super();
        this.options = options;
        this.root = el;
        this.progress = el.querySelector('.sgn-pp__progress');
        this.progressBar = el.querySelector('.sgn-pp-progress__bar');
        this.progressLabel = el.querySelector('.sgn-pp__progress-label');
        this.prevControl = el.querySelector(
            '.sgn-pp__control[data-direction=prev]'
        );
        this.nextControl = el.querySelector(
            '.sgn-pp__control[data-direction=next]'
        );
        this.close = el.querySelector('.sgn-pp--close');

        this.keyDownHandler = throttle(this.keyDown, 150, this);
        if (this.options.keyboard === 'enabled') {
            this.root.addEventListener('keydown', this.keyDownHandler, false);
        } else if (this.options.keyboard === 'global') {
            window.addEventListener('keydown', this.keyDownHandler, false);
        }

        this.prevControl?.addEventListener(
            'mousedown',
            this.prevClicked,
            false
        );
        this.nextControl?.addEventListener(
            'mousedown',
            this.nextClicked,
            false
        );
        this.close?.addEventListener('mousedown', this.closeClicked, false);

        this.bind('beforeNavigation', this.beforeNavigation);
        this.bind('destroyed', this.destroy);
    }

    destroy = () => {
        if (this.options.keyboard === 'enabled') {
            this.root.removeEventListener(
                'keydown',
                this.keyDownHandler,
                false
            );
        } else if (this.options.keyboard === 'global') {
            window.removeEventListener('keydown', this.keyDownHandler, false);
        }

        this.prevControl?.removeEventListener(
            'mousedown',
            this.prevClicked,
            false
        );

        this.nextControl?.removeEventListener(
            'mousedown',
            this.nextClicked,
            false
        );

        this.close?.removeEventListener('mousedown', this.closeClicked, false);
    };

    beforeNavigation = (e) => {
        const showProgress =
            typeof e.progressLabel === 'string' && e.progressLabel.length > 0;

        if (this.progress && this.progressBar) {
            this.progressBar.style.width = `${e.progress}%`;

            if (showProgress) {
                this.progress.classList.remove(visibilityClassName);
            } else {
                this.progress.classList.add(visibilityClassName);
            }
        }

        if (this.progressLabel) {
            if (showProgress) {
                this.progressLabel.textContent = e.progressLabel;
                this.progressLabel.classList.remove(visibilityClassName);
            } else {
                this.progressLabel.classList.add(visibilityClassName);
            }
        }

        if (this.prevControl) {
            if (e.verso.newPosition === 0) {
                this.prevControl.classList.add(visibilityClassName);
            } else {
                this.prevControl.classList.remove(visibilityClassName);
            }
        }

        if (this.nextControl) {
            if (e.verso.newPosition === e.pageSpreadCount - 1) {
                this.nextControl.classList.add(visibilityClassName);
            } else {
                this.nextControl.classList.remove(visibilityClassName);
            }
        }
    };

    prevClicked = (e: MouseEvent) => {
        e.preventDefault();

        this.trigger('prev');
    };

    nextClicked = (e: MouseEvent) => {
        e.preventDefault();

        this.trigger('next');
    };

    closeClicked = (e: MouseEvent) => {
        e.preventDefault();

        this.trigger('close');
    };

    keyDown = (e: KeyboardEvent) => {
        const {keyCode} = e;

        if (keyCodes.ARROW_LEFT === keyCode) {
            this.trigger('prev', {duration: 0});
        } else if (
            keyCodes.ARROW_RIGHT === keyCode ||
            keyCodes.SPACE === keyCode
        ) {
            this.trigger('next', {duration: 0});
        } else if (keyCodes.NUMBER_ONE === keyCode) {
            this.trigger('first', {duration: 0});
        }
    };
}

export default PagedPublicationControls;
