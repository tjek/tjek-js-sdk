import MouseInput from './input/mouse';
import PointerEventInput from './input/pointerevent';
import TouchInput from './input/touch';
import TouchMouseInput from './input/touchmouse';
import Recognizer, {
    STATE_BEGAN,
    STATE_CHANGED,
    STATE_ENDED,
    STATE_RECOGNIZED
} from './Recognizer';
import TouchAction, {TOUCH_ACTION_COMPUTE} from './TouchAction';
import prefixed from './utils/prefixed';

const SUPPORT_TOUCH = typeof window !== 'undefined' && 'ontouchstart' in window;
const SUPPORT_ONLY_TOUCH =
    SUPPORT_TOUCH &&
    /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent);
const SUPPORT_POINTER_EVENTS =
    typeof window !== 'undefined' && Boolean(prefixed(window, 'PointerEvent'));

/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    const {inputClass} = manager.options;

    if (inputClass) return new inputClass(manager);

    if (SUPPORT_POINTER_EVENTS) return new PointerEventInput(manager);

    if (SUPPORT_ONLY_TOUCH) return new TouchInput(manager);

    if (!SUPPORT_TOUCH) return new MouseInput(manager);

    return new TouchMouseInput(manager);
}

const defaults = {
    /**
     * @private
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * @private
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @private
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * @private
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * @private
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * @private
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * @private
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * @private
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * @private
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * @private
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * @private
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

/**
 * @private
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
export default class Manager {
    handlers = {};
    session = {};
    recognizers = [];
    oldCssProps = {};
    constructor(element, options) {
        this.options = {...defaults, ...options};
        this.options.inputTarget = this.options.inputTarget || element;

        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);

        this.toggleCssProps(true);

        this.options.recognizers.forEach(({0: ctor, 1: opts}) => {
            this.add(new ctor(opts));
        }, this);
    }

    /**
     * @private
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set(options) {
        Object.assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) this.touchAction.update();

        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }

        return this;
    }

    /**
     * @private
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize(inputData) {
        const {session} = this;

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        let {curRecognizer} = session;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (
            !curRecognizer ||
            (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)
        ) {
            curRecognizer = session.curRecognizer = null;
        }

        this.recognizers.forEach((recognizer) => {
            // find out if we are allowed try to recognize the input for this one.
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            if (!curRecognizer || recognizer === curRecognizer) {
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (
                !curRecognizer &&
                recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)
            ) {
                curRecognizer = session.curRecognizer = recognizer;
            }
        });
    }

    /**
     * @private
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|undefined}
     */
    get(recognizer) {
        return recognizer instanceof Recognizer
            ? recognizer
            : this.recognizers.find(
                  (recogger) => recogger.options.event === recognizer
              );
    }

    /**
     * @private add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add(recognizer) {
        // remove existing
        const existing = this.get(recognizer.options.event);
        if (existing) this.remove(existing);

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();

        return recognizer;
    }

    /**
     * @private
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove(recognizer) {
        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            const index = this.recognizers.indexOf(recognizer);

            if (index !== -1) {
                this.recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    }

    /**
     * @private
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on(events, handler) {
        if (events === undefined || handler === undefined) return;

        const {handlers} = this;
        events
            .trim()
            .split(/\s+/g)
            .forEach((event) => {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            });

        return this;
    }

    /**
     * @private unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off(events, handler) {
        if (events === undefined) return;

        events
            .trim()
            .split(/\s+/g)
            .forEach((event) => {
                if (!handler) {
                    delete this.handlers[event];
                } else if (this.handlers[event]) {
                    this.handlers[event].splice(
                        this.handlers[event].indexOf(handler),
                        1
                    );
                }
            });

        return this;
    }

    /**
     * @private emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) triggerDomEvent(event, data);

        // no handlers, so skip it all
        const handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) return;

        data.type = event;
        data.preventDefault = () => {
            data.srcEvent.preventDefault();
        };

        handlers.forEach((handler) => {
            handler(data);
        });
    }

    /**
     * @private
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy() {
        if (this.element) this.toggleCssProps(false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
    toggleCssProps(add) {
        const {element} = this;
        if (!element.style) return;

        Object.entries(this.options.cssProps).forEach(({0: value, 1: name}) => {
            const prop = prefixed(element.style, name);
            if (add) {
                this.oldCssProps[prop] = element.style[prop];
                element.style[prop] = value;
            } else {
                element.style[prop] = this.oldCssProps[prop] || '';
            }
        });
        if (!add) this.oldCssProps = {};
    }
}

/**
 * @private
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    const gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}
