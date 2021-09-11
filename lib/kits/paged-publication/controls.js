import MicroEvent from 'microevent';
import * as keyCodes from '../../key-codes';
import {throttle} from '../../util';

class PagedPublicationControls extends MicroEvent {
    constructor(el, options = {}) {
        super();
        this.destroy = this.destroy.bind(this);
        this.beforeNavigation = this.beforeNavigation.bind(this);
        this.prevClicked = this.prevClicked.bind(this);
        this.nextClicked = this.nextClicked.bind(this);
        this.closeClicked = this.closeClicked.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.options = options;
        this.els = {
            root: el,
            progress: el.querySelector('.tjek-pp__progress'),
            progressBar: el.querySelector('.tjek-pp-progress__bar'),
            progressLabel: el.querySelector('.tjek-pp__progress-label'),
            prevControl: el.querySelector(
                '.tjek-pp__control[data-direction=prev]'
            ),
            nextControl: el.querySelector(
                '.tjek-pp__control[data-direction=next]'
            ),
            close: el.querySelector('.tjek-pp--close')
        };

        this.keyDownHandler = throttle(this.keyDown, 150, this);
        if (this.options.keyboard === true) {
            this.els.root.addEventListener(
                'keydown',
                this.keyDownHandler,
                false
            );
        }
        this.els.prevControl?.addEventListener(
            'mousedown',
            this.prevClicked,
            false
        );
        this.els.nextControl?.addEventListener(
            'mousedown',
            this.nextClicked,
            false
        );
        this.els.close?.addEventListener('mousedown', this.closeClicked, false);

        this.bind('beforeNavigation', this.beforeNavigation);
        this.bind('destroyed', this.destroy);
    }

    destroy() {
        if (this.options.keyboard === true) {
            this.els.root.removeEventListener(
                'keydown',
                this.keyDownHandler,
                false
            );
        }
        this.els.prevControl?.removeEventListener(
            'mousedown',
            this.prevClicked,
            false
        );

        this.els.nextControl?.removeEventListener(
            'mousedown',
            this.nextClicked,
            false
        );

        this.els.close?.removeEventListener(
            'mousedown',
            this.closeClicked,
            false
        );
    }

    beforeNavigation(e) {
        const showProgress =
            typeof e.progressLabel === 'string' && e.progressLabel.length > 0;
        const visibilityClassName = 'tjek-pp--hidden';

        if (this.els.progress && this.els.progressBar) {
            this.els.progressBar.style.width = `${e.progress}%`;

            if (showProgress === true) {
                this.els.progress.classList.remove(visibilityClassName);
            } else {
                this.els.progress.classList.add(visibilityClassName);
            }
        }

        if (this.els.progressLabel) {
            if (showProgress === true) {
                this.els.progressLabel.textContent = e.progressLabel;
                this.els.progressLabel.classList.remove(visibilityClassName);
            } else {
                this.els.progressLabel.classList.add(visibilityClassName);
            }
        }

        if (this.els.prevControl) {
            if (e.verso.newPosition === 0) {
                this.els.prevControl.classList.add(visibilityClassName);
            } else {
                this.els.prevControl.classList.remove(visibilityClassName);
            }
        }

        if (this.els.nextControl) {
            if (e.verso.newPosition === e.pageSpreadCount - 1) {
                this.els.nextControl.classList.add(visibilityClassName);
            } else {
                this.els.nextControl.classList.remove(visibilityClassName);
            }
        }
    }

    prevClicked(e) {
        e.preventDefault();

        this.trigger('prev');
    }

    nextClicked(e) {
        e.preventDefault();

        this.trigger('next');
    }

    closeClicked(e) {
        e.preventDefault();

        this.trigger('close');
    }

    keyDown(e) {
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
    }
}

export default PagedPublicationControls;
