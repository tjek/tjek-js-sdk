import hasParent from './utils/has-parent';

export const INPUT_TYPE_TOUCH = 'touch';
export const INPUT_TYPE_MOUSE = 'mouse';

const COMPUTE_INTERVAL = 25;

export const INPUT_START = 1;
export const INPUT_MOVE = 2;
export const INPUT_END = 4;
export const INPUT_CANCEL = 8;

export const DIRECTION_NONE = 1;
export const DIRECTION_LEFT = 2;
export const DIRECTION_RIGHT = 4;
export const DIRECTION_UP = 8;
export const DIRECTION_DOWN = 16;

export const DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
export const DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
export const DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

const PROPS_XY = ['x', 'y'];
const PROPS_CLIENT_XY = ['clientX', 'clientY'];

export const TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

/**
 * @private
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
export function getDistance(p1, p2, props = PROPS_XY) {
    const x = p2[props[0]] - p1[props[0]];
    const y = p2[props[1]] - p1[props[1]];

    return Math.sqrt(x * x + y * y);
}

/**
 * @private
 * direction cons to string
 * @param {constant} direction
 * @returns {String}
 */
export function directionStr(direction) {
    if (direction === DIRECTION_DOWN) return 'down';

    if (direction === DIRECTION_UP) return 'up';

    if (direction === DIRECTION_LEFT) return 'left';

    if (direction === DIRECTION_RIGHT) return 'right';

    return '';
}

function getAngle(p1, p2, props = PROPS_XY) {
    const x = p2[props[0]] - p1[props[0]];
    const y = p2[props[1]] - p1[props[1]];
    return (Math.atan2(y, x) * 180) / Math.PI;
}

function getCenter(pointers) {
    const pointersLength = pointers.length;

    let x = 0;
    let y = 0;
    let i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: Math.round(x / pointersLength),
        y: Math.round(y / pointersLength)
    };
}

const getRotation = (start, end) =>
    getAngle(end[1], end[0], PROPS_CLIENT_XY) +
    getAngle(start[1], start[0], PROPS_CLIENT_XY);

const getScale = (start, end) =>
    getDistance(end[0], end[1], PROPS_CLIENT_XY) /
    getDistance(start[0], start[1], PROPS_CLIENT_XY);

const getDirection = (x, y) =>
    x === y
        ? DIRECTION_NONE
        : Math.abs(x) >= Math.abs(y)
        ? x < 0
            ? DIRECTION_LEFT
            : DIRECTION_RIGHT
        : y < 0
        ? DIRECTION_UP
        : DIRECTION_DOWN;

const getVelocity = (deltaTime, x, y) => ({
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
});

/**
 * @private
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    const last = session.lastInterval || input;
    const deltaTime = input.timeStamp - last.timeStamp;
    let velocity;
    let velocityX;
    let velocityY;
    let direction;

    if (
        input.eventType !== INPUT_CANCEL &&
        (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)
    ) {
        const deltaX = input.deltaX - last.deltaX;
        const deltaY = input.deltaY - last.deltaY;

        const v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = Math.abs(v.x) > Math.abs(v.y) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

function computeDeltaXY(session, input) {
    const {center} = input;
    // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
    // jscs throwing error on defalut destructured values and without defaults tests fail
    let offset = session.offsetDelta || {};
    let prevDelta = session.prevDelta || {};
    const prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * @private
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    const pointers = [];
    let i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: Math.round(input.pointers[i].clientX),
            clientY: Math.round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: Date.now(),
        pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * @private
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    const {session} = manager;
    const {pointers} = input;
    const {length: pointersLength} = pointers;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) session.firstInput = simpleCloneInputData(input);

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    const {firstInput, firstMultiple} = session;
    const offsetCenter = firstMultiple
        ? firstMultiple.center
        : firstInput.center;

    const center = (input.center = getCenter(pointers));
    input.timeStamp = Date.now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    const overallVelocity = getVelocity(
        input.deltaTime,
        input.deltaX,
        input.deltaY
    );
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity =
        Math.abs(overallVelocity.x) > Math.abs(overallVelocity.y)
            ? overallVelocity.x
            : overallVelocity.y;

    input.scale = firstMultiple
        ? getScale(firstMultiple.pointers, pointers)
        : 1;
    input.rotation = firstMultiple
        ? getRotation(firstMultiple.pointers, pointers)
        : 0;

    input.maxPointers = !session.prevInput
        ? input.pointers.length
        : input.pointers.length > session.prevInput.maxPointers
        ? input.pointers.length
        : session.prevInput.maxPointers;

    computeIntervalInputData(session, input);

    // find the correct target
    const target = hasParent(input.srcEvent.target, manager.element)
        ? input.srcEvent.target
        : manager.element;

    input.target = target;
}

/**
 * @private
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    const pointersLen = input.pointers.length;
    const changedPointersLen = input.changedPointers.length;
    const isFirst =
        eventType & INPUT_START && pointersLen - changedPointersLen === 0;
    const isFinal =
        eventType & (INPUT_END | INPUT_CANCEL) &&
        pointersLen - changedPointersLen === 0;

    input.isFirst = Boolean(isFirst);
    input.isFinal = Boolean(isFinal);

    if (isFirst) manager.session = {};

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

const addEventListeners = (target, types, handler) =>
    types
        .trim()
        .split(/\s+/g)
        .forEach((type) => {
            target.addEventListener(type, handler, false);
        });

const removeEventListeners = (target, types, handler) =>
    types
        .trim()
        .split(/\s+/g)
        .forEach((type) => {
            target.removeEventListener(type, handler, false);
        });

/**
 * @private
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    const doc = element.ownerDocument || element;
    return (
        doc.defaultView ||
        doc.parentWindow ||
        (typeof window !== 'undefined' && window)
    );
}

/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
export default class Input {
    constructor(manager) {
        this.manager = manager;
        this.callback = inputHandler;
        this.element = manager.element;
        this.target = manager.options.inputTarget;

        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.
        this.domHandler = (ev) => {
            if (manager.options.enable) this.handler(ev);
        };
    }
    /**
     * @private
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler() {}

    /**
     * @private
     * bind the events
     */
    init() {
        const {element, evEl, evTarget, evWin, domHandler, target} = this;

        if (evEl) addEventListeners(element, evEl, domHandler);

        if (evTarget) addEventListeners(target, evTarget, domHandler);

        if (evWin) {
            addEventListeners(getWindowForElement(element), evWin, domHandler);
        }
    }

    /**
     * @private
     * unbind the events
     */
    destroy() {
        const {element, evEl, evTarget, evWin, domHandler, target} = this;

        if (evEl) removeEventListeners(element, evEl, domHandler);

        if (evTarget) removeEventListeners(target, evTarget, domHandler);

        if (evWin) {
            removeEventListeners(
                getWindowForElement(element),
                evWin,
                domHandler
            );
        }
    }
}
