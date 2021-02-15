import 'core-js/modules/es.number.constructor.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.split.js';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _Array$from2 from '@babel/runtime-corejs3/core-js-stable/array/from';
import _bindInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/bind';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import 'core-js/modules/es.array.join.js';
import 'core-js/modules/es.string.replace.js';
import _Object$entries from '@babel/runtime-corejs3/core-js-stable/object/entries';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _sortInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/sort';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import _Object$create from '@babel/runtime-corejs3/core-js-stable/object/create';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _Date$now from '@babel/runtime-corejs3/core-js-stable/date/now';

var Animation = /*#__PURE__*/function () {
  function Animation(el) {
    _classCallCheck(this, Animation);

    _defineProperty(this, "run", 0);

    this.el = el;
  }

  _createClass(Animation, [{
    key: "animate",
    value: function animate() {
      var _options$x,
          _options$y,
          _options$scale,
          _options$easing,
          _options$duration,
          _context,
          _context2,
          _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var x = (_options$x = options.x) !== null && _options$x !== void 0 ? _options$x : 0;
      var y = (_options$y = options.y) !== null && _options$y !== void 0 ? _options$y : 0;
      var scale = (_options$scale = options.scale) !== null && _options$scale !== void 0 ? _options$scale : 1;
      var easing = (_options$easing = options.easing) !== null && _options$easing !== void 0 ? _options$easing : 'ease-out';
      var duration = (_options$duration = options.duration) !== null && _options$duration !== void 0 ? _options$duration : 0;
      var run = ++this.run;

      var transform = _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = "translateX(".concat(x, ") translateY(")).call(_context2, y, ") scale(")).call(_context, scale, ")");

      if (this.el.style.transform === transform) {
        callback();
      } else if (duration > 0) {
        var _context3;

        var transitionEnd = function transitionEnd() {
          if (run !== _this.run) {
            return;
          }

          _this.el.removeEventListener('transitionend', transitionEnd);

          _this.el.style.transition = 'none';
          callback();
        };

        this.el.addEventListener('transitionend', transitionEnd, false);
        this.el.style.transition = _concatInstanceProperty(_context3 = "transform ".concat(easing, " ")).call(_context3, duration, "ms");
        this.el.style.transform = transform;
      } else {
        this.el.style.transition = 'none';
        this.el.style.transform = transform;
        callback();
      }

      return this;
    }
  }]);

  return Animation;
}();

var PageSpread = /*#__PURE__*/function () {
  function PageSpread(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PageSpread);

    _defineProperty(this, "visibility", 'gone');

    _defineProperty(this, "positioned", false);

    _defineProperty(this, "active", false);

    this.el = el;
    this.options = options;
    this.id = this.options.id;
    this.type = this.options.type;
    this.pageIds = this.options.pageIds;
    this.width = this.options.width;
    this.left = this.options.left;
    this.maxZoomScale = this.options.maxZoomScale;
  }

  _createClass(PageSpread, [{
    key: "isZoomable",
    value: function isZoomable() {
      return this.getMaxZoomScale() > 1 && this.getEl().getAttribute('data-zoomable') !== 'false';
    }
  }, {
    key: "isScrollable",
    value: function isScrollable() {
      return this.getEl().classList.contains('verso--scrollable');
    }
  }, {
    key: "getEl",
    value: function getEl() {
      return this.el;
    }
  }, {
    key: "getOverlayEls",
    value: function getOverlayEls() {
      return this.getEl().querySelectorAll('.verso__overlay');
    }
  }, {
    key: "getPageEls",
    value: function getPageEls() {
      return this.getEl().querySelectorAll('.verso__page');
    }
  }, {
    key: "getRect",
    value: function getRect() {
      return this.getEl().getBoundingClientRect();
    }
  }, {
    key: "getContentRect",
    value: function getContentRect() {
      var _rect$top, _rect$left, _rect$right, _rect$bottom;

      var rect = {
        top: null,
        left: null,
        right: null,
        bottom: null,
        width: null,
        height: null
      };

      for (var _i = 0, _Array$from = _Array$from2(this.getPageEls()); _i < _Array$from.length; _i++) {
        var pageEl = _Array$from[_i];
        var pageRect = pageEl.getBoundingClientRect();

        if (pageRect.top < rect.top || rect.top == null) {
          rect.top = pageRect.top;
        }

        if (pageRect.left < rect.left || rect.left == null) {
          rect.left = pageRect.left;
        }

        if (pageRect.right > rect.right || rect.right == null) {
          rect.right = pageRect.right;
        }

        if (pageRect.bottom > rect.bottom || rect.bottom == null) {
          rect.bottom = pageRect.bottom;
        }
      }

      rect.top = (_rect$top = rect.top) !== null && _rect$top !== void 0 ? _rect$top : 0;
      rect.left = (_rect$left = rect.left) !== null && _rect$left !== void 0 ? _rect$left : 0;
      rect.right = (_rect$right = rect.right) !== null && _rect$right !== void 0 ? _rect$right : 0;
      rect.bottom = (_rect$bottom = rect.bottom) !== null && _rect$bottom !== void 0 ? _rect$bottom : 0;
      rect.width = rect.right - rect.left;
      rect.height = rect.bottom - rect.top;
      return rect;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.type;
    }
  }, {
    key: "getPageIds",
    value: function getPageIds() {
      return this.pageIds;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: "getLeft",
    value: function getLeft() {
      return this.left;
    }
  }, {
    key: "getMaxZoomScale",
    value: function getMaxZoomScale() {
      return this.maxZoomScale;
    }
  }, {
    key: "getVisibility",
    value: function getVisibility() {
      return this.visibility;
    }
  }, {
    key: "setVisibility",
    value: function setVisibility(visibility) {
      if (this.visibility !== visibility) {
        this.getEl().style.display = visibility === 'visible' ? 'block' : 'none';
        this.visibility = visibility;
      }

      return this;
    }
  }, {
    key: "position",
    value: function position() {
      if (this.positioned === false) {
        this.getEl().style.left = "".concat(this.getLeft(), "%");
        this.positioned = true;
      }

      return this;
    }
  }, {
    key: "activate",
    value: function activate() {
      this.active = true;
      this.getEl().setAttribute('data-active', this.active);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.active = false;
      this.getEl().setAttribute('data-active', this.active);
    }
  }]);

  return PageSpread;
}();

/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
//(function(window, document, exportName, undefined) {
'use strict';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context20; _forEachInstanceProperty(_context20 = ownKeys(Object(source), true)).call(_context20, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context21; _forEachInstanceProperty(_context21 = ownKeys(Object(source))).call(_context21, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];

var TEST_ELEMENT = function TEST_ELEMENT() {
  return typeof document != 'undefined' && document.createElement('div');
};

var TYPE_FUNCTION = 'function';
var round = Math.round;
var abs = Math.abs;
var now = _Date$now;
/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */

function invokeArrayArg(arg, fn, context) {
  if (_Array$isArray(arg)) {
    each(arg, context[fn], context);
    return true;
  }

  return false;
}
/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */


function each(obj, iterator, context) {
  var i;
  if (!obj) return;

  if (_forEachInstanceProperty(obj)) {
    _forEachInstanceProperty(obj).call(obj, iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;

    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (i in obj) {
      if (Object.hasOwnProperty.call(obj, i)) {
        iterator.call(context, obj[i], i, obj);
      }
    }
  }
}
/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */


function inherit(child, base, properties) {
  var baseP = base.prototype,
      childP;
  childP = child.prototype = _Object$create(baseP);
  childP.constructor = child;
  childP._super = baseP;
  if (properties) _Object$assign(childP, properties);
}
/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */


function boolOrFn(val, args) {
  if (typeof val == TYPE_FUNCTION) {
    return val.apply(args ? args[0] || undefined : undefined, args);
  }

  return val;
}
/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */


function ifUndefined(val1, val2) {
  return val1 === undefined ? val2 : val1;
}
/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */


function addEventListeners(target, types, handler) {
  var _context;

  _forEachInstanceProperty(_context = splitStr(types)).call(_context, function (type) {
    return target.addEventListener(type, handler, false);
  });
}
/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */


function removeEventListeners(target, types, handler) {
  var _context2;

  _forEachInstanceProperty(_context2 = splitStr(types)).call(_context2, function (type) {
    return target.removeEventListener(type, handler, false);
  });
}
/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */


function hasParent(node, parent) {
  while (node) {
    if (node == parent) return true;
    node = node.parentNode;
  }

  return false;
}
/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */


function inStr(str, find) {
  return _indexOfInstanceProperty(str).call(str, find) > -1;
}
/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */


function splitStr(str) {
  return _trimInstanceProperty(str).call(str).split(/\s+/g);
}
/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */


var toArray = function toArray(obj) {
  return _sliceInstanceProperty(Array.prototype).call(obj, 0);
};
/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */


function uniqueArray(array, key, sort) {
  var results = [];
  var values = [];

  _forEachInstanceProperty(array).call(array, function (item, i) {
    var val = key ? item[key] : item;
    if (_indexOfInstanceProperty(values).call(values, val) < 0) results.push(item);
    values[i] = val;
  });

  if (sort) _sortInstanceProperty(results).call(results, !key ? undefined : function (a, b) {
    return a[key] > b[key];
  });
  return results;
}
/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */


function prefixed(obj, property) {
  var camelProp = property[0].toUpperCase() + _sliceInstanceProperty(property).call(property, 1);

  return _findInstanceProperty(VENDOR_PREFIXES).call(VENDOR_PREFIXES, function (prefix) {
    return (prefix ? prefix + camelProp : property) in obj;
  });
}
/**
 * get a unique id
 * @returns {number} uniqueId
 */


var _uniqueId = 1;

var uniqueId = function uniqueId() {
  return _uniqueId++;
};
/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */


function getWindowForElement(element) {
  var doc = element.ownerDocument || element;
  return doc.defaultView || doc.parentWindow || typeof window !== 'undefined' && window;
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = function SUPPORT_TOUCH() {
  return typeof window !== 'undefined' && 'ontouchstart' in window;
};

var SUPPORT_POINTER_EVENTS = function SUPPORT_POINTER_EVENTS() {
  return typeof window !== 'undefined' && prefixed(window, 'PointerEvent') !== undefined;
};

var SUPPORT_ONLY_TOUCH = function SUPPORT_ONLY_TOUCH() {
  return SUPPORT_TOUCH() && MOBILE_REGEX.test(navigator.userAgent);
};

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';
var COMPUTE_INTERVAL = 25;
var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;
var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];
/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */

function Input(manager, callback) {
  var self = this;
  this.manager = manager;
  this.callback = callback;
  this.element = manager.element;
  this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
  // so when disabled the input events are completely bypassed.

  this.domHandler = function (ev) {
    if (boolOrFn(manager.options.enable, [manager])) {
      self.handler(ev);
    }
  };

  this.init();
}

Input.prototype = {
  /**
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */
  handler: function handler() {},

  /**
   * bind the events
   */
  init: function init() {
    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  },

  /**
   * unbind the events
   */
  destroy: function destroy() {
    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  }
};
/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */

function createInputInstance(manager) {
  var inputClass = manager.options.inputClass;
  var Type;

  if (inputClass) {
    Type = inputClass;
  } else if (SUPPORT_POINTER_EVENTS()) {
    Type = PointerEventInput;
  } else if (SUPPORT_ONLY_TOUCH()) {
    Type = TouchInput;
  } else if (!SUPPORT_TOUCH()) {
    Type = MouseInput;
  } else {
    Type = TouchMouseInput;
  }

  return new Type(manager, inputHandler);
}
/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */


function inputHandler(manager, eventType, input) {
  var pointersLen = input.pointers.length;
  var changedPointersLen = input.changedPointers.length;
  var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
  var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
  input.isFirst = !!isFirst;
  input.isFinal = !!isFinal;
  if (isFirst) manager.session = {}; // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'

  input.eventType = eventType; // compute scale, rotation etc

  computeInputData(manager, input); // emit secret event

  manager.emit('hammer.input', input);
  manager.recognize(input);
  manager.session.prevInput = input;
}
/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */


function computeInputData(manager, input) {
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

  if (!session.firstInput) session.firstInput = simpleCloneInputData(input); // to compute scale and rotation we need to store the multiple touches

  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput;
  var firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  var center = input.center = getCenter(pointers);
  input.timeStamp = now();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getAngle(offsetCenter, center);
  input.distance = getDistance(offsetCenter, center);
  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  computeIntervalInputData(session, input); // find the correct target

  var target = manager.element;
  if (hasParent(input.srcEvent.target, target)) target = input.srcEvent.target;
  input.target = target;
}

function computeDeltaXY(session, input) {
  var center = input.center;
  var offset = session.offsetDelta || {};
  var prevDelta = session.prevDelta || {};
  var prevInput = session.prevInput || {};

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
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */


function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input,
      deltaTime = input.timeStamp - last.timeStamp,
      velocity,
      velocityX,
      velocityY,
      direction;

  if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = input.deltaX - last.deltaX;
    var deltaY = input.deltaY - last.deltaY;
    var v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
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
/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */


function simpleCloneInputData(input) {
  var _context3;

  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = _mapInstanceProperty(_context3 = input.pointers).call(_context3, function (pointer) {
    return {
      clientX: round(pointer.clientX),
      clientY: round(pointer.clientY)
    };
  });

  return {
    timeStamp: now(),
    pointers: pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}
/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */


function getCenter(pointers) {
  var pointersLength = pointers.length; // no need to loop when only one touch

  if (pointersLength === 1) {
    return {
      x: round(pointers[0].clientX),
      y: round(pointers[0].clientY)
    };
  }

  var x = 0;
  var y = 0;

  _forEachInstanceProperty(pointers).call(pointers, function (_ref) {
    var clientX = _ref.clientX,
        clientY = _ref.clientY;
    x += clientX;
    y += clientY;
  });

  return {
    x: round(x / pointersLength),
    y: round(y / pointersLength)
  };
}
/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */


var getVelocity = function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
};
/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */


function getDirection(x, y) {
  if (x === y) return DIRECTION_NONE;
  if (abs(x) >= abs(y)) return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}
/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */


var getDistance = function getDistance(p1, p2) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PROPS_XY,
      _ref3 = _slicedToArray(_ref2, 2),
      xKey = _ref3[0],
      yKey = _ref3[1];

  return Math.sqrt(Math.pow(p2[xKey] - p1[xKey], 2) + Math.pow(p2[yKey] - p1[yKey], 2));
};
/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */


var getAngle = function getAngle(p1, p2) {
  var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PROPS_XY,
      _ref5 = _slicedToArray(_ref4, 2),
      xKey = _ref5[0],
      yKey = _ref5[1];

  return Math.atan2(p2[yKey] - p1[yKey], p2[xKey] - p1[xKey]) * 180 / Math.PI;
};
/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */


var getRotation = function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
};
/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */


var getScale = function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
};

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
/**
 * Mouse events input
 * @constructor
 * @extends Input
 */

function MouseInput() {
  this.evEl = MOUSE_ELEMENT_EVENTS;
  this.evWin = MOUSE_WINDOW_EVENTS;
  this.pressed = false; // mousedown state

  Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
  /**
   * handle mouse events
   * @param {Object} ev
   */
  handler: function handler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    } // mouse must be down


    if (!this.pressed) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  }
});
var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
}; // in IE10 the pointer types is defined as an enum

var IE10_POINTER_TYPE_ENUM = {
  2: INPUT_TYPE_TOUCH,
  3: INPUT_TYPE_PEN,
  4: INPUT_TYPE_MOUSE,
  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

};
var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

if (typeof window !== 'undefined' && window.MSPointerEvent && !window.PointerEvent) {
  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}
/**
 * Pointer events input
 * @constructor
 * @extends Input
 */


function PointerEventInput() {
  this.evEl = POINTER_ELEMENT_EVENTS;
  this.evWin = POINTER_WINDOW_EVENTS;
  Input.apply(this, arguments);
  this.store = this.manager.session.pointerEvents = [];
}

inherit(PointerEventInput, Input, {
  /**
   * handle mouse events
   * @param {Object} ev
   */
  handler: function handler(ev) {
    var store = this.store;
    var removePointer = false;
    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
    var isTouch = pointerType == INPUT_TYPE_TOUCH; // get index of the event in the store

    var storeIndex = _findIndexInstanceProperty(store).call(store, function (item) {
      return item.pointerId == ev.pointerId;
    }); // start and mouse must be down


    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      removePointer = true;
    } // it not found, so the pointer hasn't been down (so it's probably a hover)


    if (storeIndex < 0) return; // update the event in the store

    store[storeIndex] = ev;
    this.callback(this.manager, eventType, {
      pointers: store,
      changedPointers: [ev],
      pointerType: pointerType,
      srcEvent: ev
    }); // remove from the store

    if (removePointer) _spliceInstanceProperty(store).call(store, storeIndex, 1);
  }
});
var SINGLE_TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * Touch events input
 * @constructor
 * @extends Input
 */

function SingleTouchInput() {
  this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
  this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
  this.started = false;
  Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
  handler: function handler(srcEvent) {
    var type = SINGLE_TOUCH_INPUT_MAP[srcEvent.type]; // should we handle the touch events?

    if (type === INPUT_START) this.started = true;
    if (!this.started) return;

    var _normalizeSingleTouch = normalizeSingleTouches(srcEvent, type),
        _normalizeSingleTouch2 = _slicedToArray(_normalizeSingleTouch, 2),
        pointers = _normalizeSingleTouch2[0],
        changedPointers = _normalizeSingleTouch2[1]; // when done, reset the started state


    if (type & (INPUT_END | INPUT_CANCEL) && pointers.length - changedPointers.length === 0) {
      this.started = false;
    }

    this.callback(this.manager, type, {
      pointers: pointers,
      changedPointers: changedPointers,
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: srcEvent
    });
  }
});
/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */

function normalizeSingleTouches(ev, type) {
  var all = toArray(ev.touches);
  var changed = toArray(ev.changedTouches);

  if (type & (INPUT_END | INPUT_CANCEL)) {
    all = uniqueArray(_concatInstanceProperty(all).call(all, changed), 'identifier', true);
  }

  return [all, changed];
}

var TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */

function TouchInput() {
  this.evTarget = TOUCH_TARGET_EVENTS;
  this.targetIds = {};
  Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
  handler: function handler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = getTouches.call(this, ev, type);
    if (!touches) return;
    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  }
});
/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */

function getTouches(ev, type) {
  var allTouches = toArray(ev.touches);
  var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
    targetIds[allTouches[0].identifier] = true;
    return [allTouches, allTouches];
  }

  var targetTouches,
      changedTouches = toArray(ev.changedTouches),
      changedTargetTouches = [],
      target = this.target; // get target touches from touches

  targetTouches = _filterInstanceProperty(allTouches).call(allTouches, function (touch) {
    return hasParent(touch.target, target);
  }); // collect touches

  if (type === INPUT_START) {
    _forEachInstanceProperty(targetTouches).call(targetTouches, function (targetTouch) {
      targetIds[targetTouch.identifier] = true;
    });
  } // filter changed touches to only contain touches that exist in the collected target ids


  _forEachInstanceProperty(changedTouches).call(changedTouches, function (changedTouch) {
    if (targetIds[changedTouch.identifier]) changedTargetTouches.push(changedTouch); // cleanup removed touches

    if (type & (INPUT_END | INPUT_CANCEL)) delete targetIds[changedTouch.identifier];
  });

  if (!changedTargetTouches.length) return;
  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
  uniqueArray(_concatInstanceProperty(targetTouches).call(targetTouches, changedTargetTouches), 'identifier', true), changedTargetTouches];
}
/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */


var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
  var _context4;

  Input.apply(this, arguments);

  var handler = _bindInstanceProperty(_context4 = this.handler).call(_context4, this);

  this.touch = new TouchInput(this.manager, handler);
  this.mouse = new MouseInput(this.manager, handler);
  this.primaryTouch = null;
  this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
  /**
   * handle mouse and touch events
   * @param {Hammer} manager
   * @param {String} inputEvent
   * @param {Object} inputData
   */
  handler: function handler(manager, inputEvent, inputData) {
    var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
        isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

    if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
      return;
    } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


    if (isTouch) {
      recordTouches.call(this, inputEvent, inputData);
    } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
      return;
    }

    this.callback(manager, inputEvent, inputData);
  },

  /**
   * remove the event listeners
   */
  destroy: function destroy() {
    this.touch.destroy();
    this.mouse.destroy();
  }
});

function recordTouches(eventType, eventData) {
  if (eventType & INPUT_START) {
    this.primaryTouch = eventData.changedPointers[0].identifier;
    setLastTouch.call(this, eventData);
  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
    setLastTouch.call(this, eventData);
  }
}

function setLastTouch(eventData) {
  var touch = eventData.changedPointers[0];

  if (touch.identifier === this.primaryTouch) {
    var lastTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    this.lastTouches.push(lastTouch);
    var lts = this.lastTouches;

    var removeLastTouch = function removeLastTouch() {
      var i = _indexOfInstanceProperty(lts).call(lts, lastTouch);

      if (i > -1) {
        _spliceInstanceProperty(lts).call(lts, i, 1);
      }
    };

    _setTimeout(removeLastTouch, DEDUP_TIMEOUT);
  }
}

function isSyntheticEvent(_ref6) {
  var _context5;

  var _ref6$srcEvent = _ref6.srcEvent,
      clientX = _ref6$srcEvent.clientX,
      clientY = _ref6$srcEvent.clientY;
  return !!_findInstanceProperty(_context5 = this.lastTouches).call(_context5, function (lastTouch) {
    return Math.abs(clientX - lastTouch.x) <= DEDUP_DISTANCE && Math.abs(clientY - lastTouch.y) <= DEDUP_DISTANCE;
  });
}

var PREFIXED_TOUCH_ACTION = function PREFIXED_TOUCH_ACTION() {
  var te = TEST_ELEMENT();
  if (te) return prefixed(te.style, 'touchAction');
};

var NATIVE_TOUCH_ACTION = function NATIVE_TOUCH_ACTION() {
  return PREFIXED_TOUCH_ACTION() !== undefined;
}; // magical touchAction value


var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */

function TouchAction(manager, value) {
  this.manager = manager;
  this.set(value);
}

TouchAction.prototype = {
  /**
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */
  set: function set(value) {
    var _context6;

    // find out the touch-action by the event handlers
    if (value == TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }

    var TOUCH_ACTION_MAP = getTouchActionProps();

    if (NATIVE_TOUCH_ACTION() && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION()] = value;
    }

    this.actions = _trimInstanceProperty(_context6 = value.toLowerCase()).call(_context6);
  },

  /**
   * just re-set the touchAction value
   */
  update: function update() {
    this.set(this.manager.options.touchAction);
  },

  /**
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */
  compute: function compute() {
    var _context7;

    var actions = [];

    _forEachInstanceProperty(_context7 = this.manager.recognizers).call(_context7, function (recognizer) {
      if (boolOrFn(recognizer.options.enable, [recognizer])) {
        actions = _concatInstanceProperty(actions).call(actions, recognizer.getTouchAction());
      }
    });

    return cleanTouchActions(actions.join(' '));
  },

  /**
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */
  preventDefaults: function preventDefaults(input) {
    var srcEvent = input.srcEvent;
    var direction = input.offsetDirection; // if the touch action did prevented once this session

    if (this.manager.session.prevented) {
      srcEvent.preventDefault();
      return;
    }

    var actions = this.actions;
    var TOUCH_ACTION_MAP = getTouchActionProps();
    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

    if (hasNone) {
      //do not prevent defaults if this is a tap gesture
      var isTapPointer = input.pointers.length === 1;
      var isTapMovement = input.distance < 2;
      var isTapTouchTime = input.deltaTime < 250;

      if (isTapPointer && isTapMovement && isTapTouchTime) {
        return;
      }
    }

    if (hasPanX && hasPanY) {
      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
      return;
    }

    if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
      return this.preventSrc(srcEvent);
    }
  },

  /**
   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
   * @param {Object} srcEvent
   */
  preventSrc: function preventSrc(srcEvent) {
    this.manager.session.prevented = true;
    srcEvent.preventDefault();
  }
};
/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */

function cleanTouchActions(actions) {
  // none
  if (inStr(actions, TOUCH_ACTION_NONE)) return TOUCH_ACTION_NONE;
  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
  // for different directions, e.g. horizontal pan but vertical swipe?)
  // we need none (as otherwise with pan-x pan-y combined none of these
  // recognizers will work, since the browser would handle all panning

  if (hasPanX && hasPanY) return TOUCH_ACTION_NONE; // pan-x OR pan-y

  if (hasPanX || hasPanY) return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y; // manipulation

  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) return TOUCH_ACTION_MANIPULATION;
  return TOUCH_ACTION_AUTO;
}

var touchVals = ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'];

function getTouchActionProps() {
  if (!NATIVE_TOUCH_ACTION()) return false;
  var cssSupports = typeof window !== 'undefined' && window.CSS && window.CSS.supports;
  return _reduceInstanceProperty(touchVals).call(touchVals, function (touchMap, val) {
    // If css.supports is not supported but there is native touch-action assume it supports
    // all values. This is the case for IE 10 and 11.
    touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    return touchMap;
  }, {});
}
/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */


var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;
/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */

function Recognizer(options) {
  this.options = _objectSpread(_objectSpread({}, this.defaults), options);
  this.id = uniqueId();
  this.manager = null; // default is enable true

  this.options.enable = ifUndefined(this.options.enable, true);
  this.state = STATE_POSSIBLE;
  this.simultaneous = {};
  this.requireFail = [];
}

Recognizer.prototype = {
  /**
   * @virtual
   * @type {Object}
   */
  defaults: {},

  /**
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */
  set: function set(options) {
    _Object$assign(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state


    this.manager && this.manager.touchAction.update();
    return this;
  },

  /**
   * recognize simultaneous with an other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  recognizeWith: function recognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) return this;
    var simultaneous = this.simultaneous;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }

    return this;
  },

  /**
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) return this;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    delete this.simultaneous[otherRecognizer.id];
    return this;
  },

  /**
   * recognizer can only run when an other is failing
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  requireFailure: function requireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) return this;
    var requireFail = this.requireFail;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (_indexOfInstanceProperty(requireFail).call(requireFail, otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }

    return this;
  },

  /**
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  dropRequireFailure: function dropRequireFailure(otherRecognizer) {
    var _context8, _context9;

    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) return this;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    var index = _indexOfInstanceProperty(_context8 = this.requireFail).call(_context8, otherRecognizer);

    if (index > -1) _spliceInstanceProperty(_context9 = this.requireFail).call(_context9, index, 1);
    return this;
  },

  /**
   * has require failures boolean
   * @returns {boolean}
   */
  hasRequireFailures: function hasRequireFailures() {
    return this.requireFail.length > 0;
  },

  /**
   * if the recognizer can recognize simultaneous with an other recognizer
   * @param {Recognizer} otherRecognizer
   * @returns {Boolean}
   */
  canRecognizeWith: function canRecognizeWith(otherRecognizer) {
    return !!this.simultaneous[otherRecognizer.id];
  },

  /**
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */
  emit: function emit(input) {
    var self = this;
    var state = this.state;

    function emit(event) {
      self.manager.emit(event, input);
    } // 'panstart' and 'panmove'


    if (state < STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }

    emit(self.options.event); // simple 'eventName' events

    if (input.additionalEvent) {
      // additional event(panleft, panright, pinchin, pinchout...)
      emit(input.additionalEvent);
    } // panend and pancancel


    if (state >= STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }
  },

  /**
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */
  tryEmit: function tryEmit(input) {
    if (this.canEmit()) return this.emit(input); // it's failing anyway

    this.state = STATE_FAILED;
  },

  /**
   * can we emit?
   * @returns {boolean}
   */
  canEmit: function canEmit() {
    var i = 0;

    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
        return false;
      }

      i++;
    }

    return true;
  },

  /**
   * update the recognizer
   * @param {Object} inputData
   */
  recognize: function recognize(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    var inputDataClone = _objectSpread({}, inputData); // is is enabled and allow recognizing?


    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    } // reset when we've reached the end


    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
    // so trigger an event

    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.tryEmit(inputDataClone);
    }
  },

  /**
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {Const} STATE
   */
  process: function process() {},
  // jshint ignore:line

  /**
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */
  getTouchAction: function getTouchAction() {},

  /**
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */
  reset: function reset() {}
};
/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */

function stateStr(state) {
  if (state & STATE_CANCELLED) {
    return 'cancel';
  } else if (state & STATE_ENDED) {
    return 'end';
  } else if (state & STATE_CHANGED) {
    return 'move';
  } else if (state & STATE_BEGAN) {
    return 'start';
  }

  return '';
}
/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */


function directionStr(direction) {
  if (direction == DIRECTION_DOWN) {
    return 'down';
  } else if (direction == DIRECTION_UP) {
    return 'up';
  } else if (direction == DIRECTION_LEFT) {
    return 'left';
  } else if (direction == DIRECTION_RIGHT) {
    return 'right';
  }

  return '';
}
/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */


var getRecognizerByNameIfManager = function getRecognizerByNameIfManager(otherRecognizer, _ref7) {
  var manager = _ref7.manager;
  return manager ? manager.get(otherRecognizer) : otherRecognizer;
};
/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */


function AttrRecognizer() {
  Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
  /**
   * @namespace
   * @memberof AttrRecognizer
   */
  defaults: {
    /**
     * @type {Number}
     * @default 1
     */
    pointers: 1
  },

  /**
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */
  attrTest: function attrTest(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  },

  /**
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */
  process: function process(input) {
    var state = this.state;
    var eventType = input.eventType;
    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    } else if (isRecognized || isValid) {
      if (eventType & INPUT_END) {
        return state | STATE_ENDED;
      } else if (!(state & STATE_BEGAN)) {
        return STATE_BEGAN;
      }

      return state | STATE_CHANGED;
    }

    return STATE_FAILED;
  }
});
/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

function PanRecognizer() {
  AttrRecognizer.apply(this, arguments);
  this.pX = null;
  this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof PanRecognizer
   */
  defaults: {
    event: 'pan',
    threshold: 10,
    pointers: 1,
    direction: DIRECTION_ALL
  },
  getTouchAction: function getTouchAction() {
    var direction = this.options.direction;
    var actions = [];
    if (direction & DIRECTION_HORIZONTAL) actions.push(TOUCH_ACTION_PAN_Y);
    if (direction & DIRECTION_VERTICAL) actions.push(TOUCH_ACTION_PAN_X);
    return actions;
  },
  directionTest: function directionTest(input) {
    var options = this.options;
    var hasMoved = true;
    var distance = input.distance;
    var direction = input.direction;
    var x = input.deltaX;
    var y = input.deltaY; // lock to axis?

    if (!(direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = x != this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = y != this.pY;
        distance = Math.abs(input.deltaY);
      }
    }

    input.direction = direction;
    return hasMoved && distance > options.threshold && direction & options.direction;
  },
  attrTest: function attrTest(input) {
    return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
  },
  emit: function emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    var direction = directionStr(input.direction);
    if (direction) input.additionalEvent = this.options.event + direction;

    this._super.emit.call(this, input);
  }
});
/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */

function PinchRecognizer() {
  AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof PinchRecognizer
   */
  defaults: {
    event: 'pinch',
    threshold: 0,
    pointers: 2
  },
  getTouchAction: function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  },
  attrTest: function attrTest(input) {
    return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  },
  emit: function emit(input) {
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      input.additionalEvent = this.options.event + inOut;
    }

    this._super.emit.call(this, input);
  }
});
/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */

function PressRecognizer() {
  Recognizer.apply(this, arguments);
  this._timer = null;
  this._input = null;
}

inherit(PressRecognizer, Recognizer, {
  /**
   * @namespace
   * @memberof PressRecognizer
   */
  defaults: {
    event: 'press',
    pointers: 1,
    time: 251,
    // minimal time of the pointer to be pressed
    threshold: 9 // a minimal movement is ok, but keep it low

  },
  getTouchAction: function getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  },
  process: function process(input) {
    var _this = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTime = input.deltaTime > options.time;
    this._input = input; // we only allow little movement
    // and we've reached an end event, so a tap is possible

    if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
      this.reset();
    } else if (input.eventType & INPUT_START) {
      this.reset();
      this._timer = _setTimeout(function () {
        _this.state = STATE_RECOGNIZED;

        _this.tryEmit();
      }, options.time);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  },
  reset: function reset() {
    clearTimeout(this._timer);
  },
  emit: function emit(input) {
    if (this.state !== STATE_RECOGNIZED) {
      return;
    }

    if (input && input.eventType & INPUT_END) {
      this.manager.emit(this.options.event + 'up', input);
    } else {
      this._input.timeStamp = now();
      this.manager.emit(this.options.event, this._input);
    }
  }
});
/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */

function RotateRecognizer() {
  AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof RotateRecognizer
   */
  defaults: {
    event: 'rotate',
    threshold: 0,
    pointers: 2
  },
  getTouchAction: function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  },
  attrTest: function attrTest(input) {
    return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
  }
});
/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

function SwipeRecognizer() {
  AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof SwipeRecognizer
   */
  defaults: {
    event: 'swipe',
    threshold: 10,
    velocity: 0.3,
    direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
    pointers: 1
  },
  getTouchAction: function getTouchAction() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  },
  attrTest: function attrTest(input) {
    var direction = this.options.direction;
    var velocity;

    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
      velocity = input.overallVelocity;
    } else if (direction & DIRECTION_HORIZONTAL) {
      velocity = input.overallVelocityX;
    } else if (direction & DIRECTION_VERTICAL) {
      velocity = input.overallVelocityY;
    }

    return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
  },
  emit: function emit(input) {
    var direction = directionStr(input.offsetDirection);
    if (direction) this.manager.emit(this.options.event + direction, input);
    this.manager.emit(this.options.event, input);
  }
});
/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */

function TapRecognizer() {
  Recognizer.apply(this, arguments); // previous time and center,
  // used for tap counting

  this.pTime = false;
  this.pCenter = false;
  this._timer = null;
  this._input = null;
  this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
  /**
   * @namespace
   * @memberof PinchRecognizer
   */
  defaults: {
    event: 'tap',
    pointers: 1,
    taps: 1,
    interval: 300,
    // max time between the multi-tap taps
    time: 250,
    // max time of the pointer to be down (like finger on the screen)
    threshold: 9,
    // a minimal movement is ok, but keep it low
    posThreshold: 10 // a multi-tap can be a bit off the initial position

  },
  getTouchAction: function getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  },
  process: function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;
    this.reset();
    if (input.eventType & INPUT_START && this.count === 0) return this.failTimeout(); // we only allow little movement
    // and we've reached an end event, so a tap is possible

    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType != INPUT_END) return this.failTimeout();
      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input; // if tap count matches we have recognized it,
      // else it has began recognizing...

      var tapCount = this.count % options.taps;

      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = _setTimeout(function () {
            _this2.state = STATE_RECOGNIZED;

            _this2.tryEmit();
          }, options.interval);
          return STATE_BEGAN;
        }
      }
    }

    return STATE_FAILED;
  },
  failTimeout: function failTimeout() {
    var _this3 = this;

    this._timer = _setTimeout(function () {
      _this3.state = STATE_FAILED;
    }, this.options.interval);
    return STATE_FAILED;
  },
  reset: function reset() {
    clearTimeout(this._timer);
  },
  emit: function emit() {
    if (this.state == STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  }
});
/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */

function Hammer(element, options) {
  options = options || {};
  options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
  return new Manager(element, options);
}
/**
 * @const {string}
 */


Hammer.VERSION = '2.0.7';
/**
 * default settings
 * @namespace
 */

Hammer.defaults = {
  /**
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: false,

  /**
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: TOUCH_ACTION_COMPUTE,

  /**
   * @type {Boolean}
   * @default true
   */
  enable: true,

  /**
   * EXPERIMENTAL FEATURE -- can be removed/changed
   * Change the parent input target element.
   * If Null, then it is being set the to main element.
   * @type {Null|EventTarget}
   * @default null
   */
  inputTarget: null,

  /**
   * force an input class
   * @type {Null|Function}
   * @default null
   */
  inputClass: null,

  /**
   * Default recognizer setup when calling `Hammer()`
   * When creating a new Manager these will be skipped.
   * @type {Array}
   */
  preset: [// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
  [RotateRecognizer, {
    enable: false
  }], [PinchRecognizer, {
    enable: false
  }, ['rotate']], [SwipeRecognizer, {
    direction: DIRECTION_HORIZONTAL
  }], [PanRecognizer, {
    direction: DIRECTION_HORIZONTAL
  }, ['swipe']], [TapRecognizer], [TapRecognizer, {
    event: 'doubletap',
    taps: 2
  }, ['tap']], [PressRecognizer]],

  /**
   * Some CSS properties can be used to improve the working of Hammer.
   * Add them to this method and they will be set when creating a new Manager.
   * @namespace
   */
  cssProps: {
    /**
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userSelect: 'none',

    /**
     * Disable the Windows Phone grippers when pressing an element.
     * @type {String}
     * @default 'none'
     */
    touchSelect: 'none',

    /**
     * Disables the default callout shown when you touch and hold a touch target.
     * On iOS, when you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     * @type {String}
     * @default 'none'
     */
    touchCallout: 'none',

    /**
     * Specifies whether zooming is enabled. Used by IE10>
     * @type {String}
     * @default 'none'
     */
    contentZooming: 'none',

    /**
     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userDrag: 'none',

    /**
     * Overrides the highlight color shown when the user taps a link or a JavaScript
     * clickable element in iOS. This property obeys the alpha value, if specified.
     * @type {String}
     * @default 'rgba(0,0,0,0)'
     */
    tapHighlightColor: 'rgba(0,0,0,0)'
  }
};
var STOP = 1;
var FORCED_STOP = 2;
/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */

function Manager(element, options) {
  var _this4 = this;

  this.options = _objectSpread(_objectSpread({}, Hammer.defaults), options);
  this.options.inputTarget = this.options.inputTarget || element;
  this.handlers = {};
  this.session = {};
  this.recognizers = [];
  this.oldCssProps = {};
  this.element = element;
  this.input = createInputInstance(this);
  this.touchAction = new TouchAction(this, this.options.touchAction);
  toggleCssProps(this, true);

  if (this.options.recognizers) {
    var _context10;

    _forEachInstanceProperty(_context10 = this.options.recognizers).call(_context10, function (item) {
      var recognizer = _this4.add(new item[0](item[1]));

      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    });
  }
}

Manager.prototype = {
  /**
   * set options
   * @param {Object} options
   * @returns {Manager}
   */
  set: function set(options) {
    _Object$assign(this.options, options); // Options that need a little more setup


    if (options.touchAction) this.touchAction.update();

    if (options.inputTarget) {
      // Clean up existing event listeners and reinitialize
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }

    return this;
  },

  /**
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   * @param {Boolean} [force]
   */
  stop: function stop(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  },

  /**
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   * @param {Object} inputData
   */
  recognize: function recognize(inputData) {
    var session = this.session;
    if (session.stopped) return; // run the touch-action polyfill

    this.touchAction.preventDefaults(inputData);
    var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`

    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
    // or when we're in a new session

    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
      curRecognizer = session.curRecognizer = null;
    }

    _forEachInstanceProperty(recognizers).call(recognizers, function (recognizer) {
      // find out if we are allowed try to recognize the input for this one.
      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
      //      this can be setup with the `recognizeWith()` method on the recognizer.
      if (session.stopped !== FORCED_STOP && ( // 1
      !curRecognizer || recognizer == curRecognizer || // 2
      recognizer.canRecognizeWith(curRecognizer))) {
        // 3
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer


      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
        curRecognizer = session.curRecognizer = recognizer;
      }
    });
  },

  /**
   * get a recognizer by its event name.
   * @param {Recognizer|String} recognizer
   * @returns {Recognizer|Null}
   */
  get: function get(recognizer) {
    var _context11;

    if (recognizer instanceof Recognizer) return recognizer;
    return _findInstanceProperty(_context11 = this.recognizers).call(_context11, function (_ref8) {
      var options = _ref8.options;
      return options.event == recognizer;
    }) || null;
  },

  /**
   * add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */
  add: function add(recognizer) {
    if (invokeArrayArg(recognizer, 'add', this)) return this; // remove existing

    var existing = this.get(recognizer.options.event);
    if (existing) this.remove(existing);
    this.recognizers.push(recognizer);
    recognizer.manager = this;
    this.touchAction.update();
    return recognizer;
  },

  /**
   * remove a recognizer by name or instance
   * @param {Recognizer|String} recognizer
   * @returns {Manager}
   */
  remove: function remove(recognizer) {
    if (invokeArrayArg(recognizer, 'remove', this)) return this;
    recognizer = this.get(recognizer); // let's make sure this recognizer exists

    if (recognizer) {
      var _context12;

      var index = _indexOfInstanceProperty(_context12 = this.recognizers).call(_context12, recognizer);

      if (index !== -1) {
        var _context13;

        _spliceInstanceProperty(_context13 = this.recognizers).call(_context13, index, 1);

        this.touchAction.update();
      }
    }

    return this;
  },

  /**
   * bind event
   * @param {String} events
   * @param {Function} handler
   * @returns {EventEmitter} this
   */
  on: function on(events, handler) {
    var _context14;

    if (events === undefined || handler === undefined) return;
    var handlers = this.handlers;

    _forEachInstanceProperty(_context14 = splitStr(events)).call(_context14, function (event) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    });

    return this;
  },

  /**
   * unbind event, leave emit blank to remove all handlers
   * @param {String} events
   * @param {Function} [handler]
   * @returns {EventEmitter} this
   */
  off: function off(events, handler) {
    var _context15;

    if (events === undefined) return;
    var handlers = this.handlers;

    _forEachInstanceProperty(_context15 = splitStr(events)).call(_context15, function (event) {
      if (!handler) {
        delete handlers[event];
      } else if (handlers[event]) {
        var _context16, _context17;

        _spliceInstanceProperty(_context16 = handlers[event]).call(_context16, _indexOfInstanceProperty(_context17 = handlers[event]).call(_context17, handler), 1);
      }
    });

    return this;
  },

  /**
   * emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */
  emit: function emit(event, data) {
    var _context18;

    // we also want to trigger dom events
    if (this.options.domEvents) triggerDomEvent(event, data);

    var handlers = this.handlers[event] && _sliceInstanceProperty(_context18 = this.handlers[event]).call(_context18); // no handlers, so skip it all


    if (!handlers || !handlers.length) return;
    data.type = event;

    data.preventDefault = function () {
      data.srcEvent.preventDefault();
    };

    _forEachInstanceProperty(handlers).call(handlers, function (handler) {
      return handler(data);
    });
  },

  /**
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */
  destroy: function destroy() {
    this.element && toggleCssProps(this, false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  }
};
/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */

function toggleCssProps(manager, add) {
  var _context19;

  var element = manager.element;
  if (!element.style) return;
  var prop;

  _forEachInstanceProperty(_context19 = _Object$entries(manager.options.cssProps)).call(_context19, function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        value = _ref10[0],
        name = _ref10[1];

    prop = prefixed(element.style, name);

    if (add) {
      manager.oldCssProps[prop] = element.style[prop];
      element.style[prop] = value;
    } else {
      element.style[prop] = manager.oldCssProps[prop] || '';
    }
  });

  if (!add) manager.oldCssProps = {};
}
/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */


function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent('Event');
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}

_Object$assign(Hammer, {
  INPUT_START: INPUT_START,
  INPUT_MOVE: INPUT_MOVE,
  INPUT_END: INPUT_END,
  INPUT_CANCEL: INPUT_CANCEL,
  STATE_POSSIBLE: STATE_POSSIBLE,
  STATE_BEGAN: STATE_BEGAN,
  STATE_CHANGED: STATE_CHANGED,
  STATE_ENDED: STATE_ENDED,
  STATE_RECOGNIZED: STATE_RECOGNIZED,
  STATE_CANCELLED: STATE_CANCELLED,
  STATE_FAILED: STATE_FAILED,
  DIRECTION_NONE: DIRECTION_NONE,
  DIRECTION_LEFT: DIRECTION_LEFT,
  DIRECTION_RIGHT: DIRECTION_RIGHT,
  DIRECTION_UP: DIRECTION_UP,
  DIRECTION_DOWN: DIRECTION_DOWN,
  DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL: DIRECTION_VERTICAL,
  DIRECTION_ALL: DIRECTION_ALL,
  Manager: Manager,
  Input: Input,
  TouchAction: TouchAction,
  TouchInput: TouchInput,
  MouseInput: MouseInput,
  PointerEventInput: PointerEventInput,
  TouchMouseInput: TouchMouseInput,
  SingleTouchInput: SingleTouchInput,
  Recognizer: Recognizer,
  AttrRecognizer: AttrRecognizer,
  Tap: TapRecognizer,
  Pan: PanRecognizer,
  Swipe: SwipeRecognizer,
  Pinch: PinchRecognizer,
  Rotate: RotateRecognizer,
  Press: PressRecognizer,
  on: addEventListeners,
  off: removeEventListeners,
  each: each,
  inherit: inherit,
  prefixed: prefixed
});

var hammer = Hammer;

var Verso = /*#__PURE__*/function () {
  function Verso(el) {
    var _this$options$swipeVe, _this$options$swipeTh, _this$options$navigat, _this$options$navigat2, _this$options$zoomDur, _this$options$doubleT;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Verso);

    this.el = el;
    this.options = options;
    this.swipeVelocity = (_this$options$swipeVe = this.options.swipeVelocity) !== null && _this$options$swipeVe !== void 0 ? _this$options$swipeVe : 0.3;
    this.swipeThreshold = (_this$options$swipeTh = this.options.swipeThreshold) !== null && _this$options$swipeTh !== void 0 ? _this$options$swipeTh : 10;
    this.navigationDuration = (_this$options$navigat = this.options.navigationDuration) !== null && _this$options$navigat !== void 0 ? _this$options$navigat : 240;
    this.navigationPanDuration = (_this$options$navigat2 = this.options.navigationPanDuration) !== null && _this$options$navigat2 !== void 0 ? _this$options$navigat2 : 200;
    this.zoomDuration = (_this$options$zoomDur = this.options.zoomDuration) !== null && _this$options$zoomDur !== void 0 ? _this$options$zoomDur : 200;
    this.doubleTapDelay = (_this$options$doubleT = this.options.doubleTapDelay) !== null && _this$options$doubleT !== void 0 ? _this$options$doubleT : 300;
    this.position = -1;
    this.pinching = false;
    this.panning = false;
    this.transform = {
      left: 0,
      top: 0,
      scale: 1
    };
    this.startTransform = {
      left: 0,
      top: 0,
      scale: 1
    };
    this.tap = {
      count: 0,
      delay: this.doubleTapDelay
    };
    this.started = false;
    this.destroyed = false;
    this._events = {};
  }

  _createClass(Verso, [{
    key: "bind",
    value: function bind(event, fn) {
      this._events[event] = this._events[event] || [];
      return this._events[event].push(fn);
    }
  }, {
    key: "unbind",
    value: function unbind(event, fn) {
      if (this._events[event]) {
        var _context, _context2;

        return _spliceInstanceProperty(_context = this._events[event]).call(_context, _indexOfInstanceProperty(_context2 = this._events[event]).call(_context2, fn), 1);
      }
    }
  }, {
    key: "trigger",
    value: function trigger(event) {
      var _this$_events$event,
          _this = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$_events$event = this._events[event]) === null || _this$_events$event === void 0 ? void 0 : _forEachInstanceProperty(_this$_events$event).call(_this$_events$event, function (e) {
        return e.apply(_this, args);
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _this$getPageSpreadPo, _context15, _context16, _context17;

      this.scrollerEl = this.el.querySelector('.verso__scroller');
      this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
      this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
      this.pageIds = this.buildPageIds(this.pageSpreads);
      this.animation = new Animation(this.scrollerEl);
      this.hammer = new hammer.Manager(this.scrollerEl, {
        touchAction: 'none',
        enable: false,
        inputClass: this.getHammerInputClass()
      });
      this.hammer.add(new hammer.Pan({
        threshold: 5,
        direction: hammer.DIRECTION_ALL
      }));
      this.hammer.add(new hammer.Tap({
        event: 'singletap',
        interval: 0
      }));
      this.hammer.add(new hammer.Pinch());
      this.hammer.add(new hammer.Press({
        time: 500
      }));
      this.hammer.on('panstart', _bindInstanceProperty(_context3 = this.onPanStart).call(_context3, this));
      this.hammer.on('panmove', _bindInstanceProperty(_context4 = this.onPanMove).call(_context4, this));
      this.hammer.on('panend', _bindInstanceProperty(_context5 = this.onPanEnd).call(_context5, this));
      this.hammer.on('pancancel', _bindInstanceProperty(_context6 = this.onPanEnd).call(_context6, this));
      this.hammer.on('singletap', _bindInstanceProperty(_context7 = this.onSingletap).call(_context7, this));
      this.hammer.on('pinchstart', _bindInstanceProperty(_context8 = this.onPinchStart).call(_context8, this));
      this.hammer.on('pinchmove', _bindInstanceProperty(_context9 = this.onPinchMove).call(_context9, this));
      this.hammer.on('pinchend', _bindInstanceProperty(_context10 = this.onPinchEnd).call(_context10, this));
      this.hammer.on('pinchcancel', _bindInstanceProperty(_context11 = this.onPinchEnd).call(_context11, this));
      this.hammer.on('press', _bindInstanceProperty(_context12 = this.onPress).call(_context12, this));
      this.scrollerEl.addEventListener('contextmenu', _bindInstanceProperty(_context13 = this.onContextmenu).call(_context13, this), false);
      this.scrollerEl.addEventListener('wheel', _bindInstanceProperty(_context14 = this.onWheel).call(_context14, this), false);
      var pageId = (_this$getPageSpreadPo = this.getPageSpreadPositionFromPageId(this.options.pageId)) !== null && _this$getPageSpreadPo !== void 0 ? _this$getPageSpreadPo : 0;
      this.hammer.set({
        enable: true
      });
      this.started = true;
      this.destroyed = false;
      this.navigateTo(pageId, {
        duration: 0
      });
      this.resizeListener = _bindInstanceProperty(_context15 = this.onResize).call(_context15, this);
      this.touchStartListener = _bindInstanceProperty(_context16 = this.onTouchStart).call(_context16, this);
      this.touchEndListener = _bindInstanceProperty(_context17 = this.onTouchEnd).call(_context17, this);
      this.el.addEventListener('touchstart', this.touchStartListener, false);
      this.el.addEventListener('touchend', this.touchEndListener, false);

      if (typeof window !== 'undefined' && window !== null) {
        window.addEventListener('resize', this.resizeListener, false);
      }

      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _context18, _context19;

      if (!this.started) {
        return console.warn("You've called .destroy() on a viewer that was not started yet, this is a no-op.");
      }

      if (this.destroyed) {
        return console.warn("You've called .destroy() on a viewer that has already been destroyed and not restarted, this is a no-op.");
      }

      this.scrollerEl.removeEventListener('contextmenu', _bindInstanceProperty(_context18 = this.onContextmenu).call(_context18, this));
      this.scrollerEl.removeEventListener('wheel', _bindInstanceProperty(_context19 = this.onWheel).call(_context19, this));
      this.hammer.destroy();
      this.el.removeEventListener('touchstart', this.touchStartListener);
      this.el.removeEventListener('touchend', this.touchEndListener);
      window.removeEventListener('resize', this.resizeListener);
      this.started = false;
      this.destroyed = true;
      return this;
    }
  }, {
    key: "first",
    value: function first(options) {
      return this.navigateTo(0, options);
    }
  }, {
    key: "prev",
    value: function prev(options) {
      return this.navigateTo(this.getPosition() - 1, options);
    }
  }, {
    key: "next",
    value: function next(options) {
      return this.navigateTo(this.getPosition() + 1, options);
    }
  }, {
    key: "last",
    value: function last(options) {
      return this.navigateTo(this.getPageSpreadCount() - 1, options);
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(position) {
      var _options$velocity,
          _options$duration,
          _context20,
          _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.destroyed) {
        return console.warn("You've called a navigation method on a viewer that was previously destroyed, this is a no-op.\nPlease call viewer.start() again, if you want to reuse this Viewer instance.\n\nYou might have forgotten to remove an event handler that\ncalls first/prev/next/last/navigateTo on the viewer.");
      }

      if (!this.started) {
        return console.warn("\nYou've called a navigation method on a viewer that hasn't been started yet, this is a no-op.\nPlease call viewer.start() first.\n\nYou might have forgotten to remove an event handler that\ncalls .first()/.prev()/.next()/.last()/.navigateTo() on the viewer.\n");
      }

      if (position < 0 || position > this.getPageSpreadCount() - 1) {
        return;
      }

      var currentPosition = this.getPosition();
      var currentPageSpread = this.getPageSpreadFromPosition(currentPosition);
      var activePageSpread = this.getPageSpreadFromPosition(position);
      var carousel = this.getCarouselFromPageSpread(activePageSpread);
      var velocity = (_options$velocity = options.velocity) !== null && _options$velocity !== void 0 ? _options$velocity : 1;
      var duration = (_options$duration = options.duration) !== null && _options$duration !== void 0 ? _options$duration : this.navigationDuration;
      duration = duration / Math.abs(velocity);
      var touchAction = activePageSpread.isScrollable() ? 'pan-y' : 'none';
      currentPageSpread === null || currentPageSpread === void 0 ? void 0 : currentPageSpread.deactivate();
      activePageSpread.activate();

      _forEachInstanceProperty(_context20 = carousel.visible).call(_context20, function (pageSpread) {
        return pageSpread.position().setVisibility('visible');
      });

      this.hammer.set({
        touchAction: touchAction
      });
      this.transform.left = this.getLeftTransformFromPageSpread(position, activePageSpread);
      this.setPosition(position);

      if (this.transform.scale > 1) {
        this.transform.top = 0;
        this.transform.scale = 1;
        this.trigger('zoomedOut', {
          position: currentPosition
        });
      }

      this.trigger('beforeNavigation', {
        currentPosition: currentPosition,
        newPosition: position
      });
      this.animation.animate({
        x: "".concat(this.transform.left, "%"),
        duration: duration
      }, function () {
        var _context21;

        carousel = _this2.getCarouselFromPageSpread(_this2.getActivePageSpread());

        _forEachInstanceProperty(_context21 = carousel.gone).call(_context21, function (pageSpread) {
          return pageSpread.setVisibility('gone');
        });

        _this2.trigger('afterNavigation', {
          newPosition: _this2.getPosition(),
          previousPosition: currentPosition
        });
      });
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: "setPosition",
    value: function setPosition(position) {
      this.position = position;
      return this;
    }
  }, {
    key: "getLeftTransformFromPageSpread",
    value: function getLeftTransformFromPageSpread(position, pageSpread) {
      var left = 0;

      if (position === this.getPageSpreadCount() - 1) {
        left = 100 - pageSpread.getWidth() - pageSpread.getLeft();
      } else if (position > 0) {
        left = (100 - pageSpread.getWidth()) / 2 - pageSpread.getLeft();
      }

      return left;
    }
  }, {
    key: "getCarouselFromPageSpread",
    value: function getCarouselFromPageSpread(pageSpreadSubject) {
      var _context22;

      var carousel = {
        visible: [],
        gone: []
      }; // Identify the page spreads that should be a part of the carousel.

      _forEachInstanceProperty(_context22 = this.pageSpreads).call(_context22, function (pageSpread) {
        var visible = false;

        if (pageSpread.getLeft() <= pageSpreadSubject.getLeft()) {
          if (pageSpread.getLeft() + pageSpread.getWidth() > pageSpreadSubject.getLeft() - 100) {
            visible = true;
          }
        } else {
          if (pageSpread.getLeft() - pageSpread.getWidth() < pageSpreadSubject.getLeft() + 100) {
            visible = true;
          }
        }

        if (visible === true) {
          carousel.visible.push(pageSpread);
        } else {
          carousel.gone.push(pageSpread);
        }
      });

      return carousel;
    }
  }, {
    key: "traversePageSpreads",
    value: function traversePageSpreads(els) {
      var pageSpreads = [];
      var left = 0;

      for (var _i = 0, _Array$from = _Array$from2(els); _i < _Array$from.length; _i++) {
        var _el$getAttribute, _el$getAttribute2, _el$getAttribute3;

        var el = _Array$from[_i];
        var id = el.getAttribute('data-id');
        var type = el.getAttribute('data-type');
        var pageIds = ((_el$getAttribute = el.getAttribute('data-page-ids')) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.split(',')) || [];
        var maxZoomScale = Number((_el$getAttribute2 = el.getAttribute('data-max-zoom-scale')) !== null && _el$getAttribute2 !== void 0 ? _el$getAttribute2 : 1);
        var width = Number((_el$getAttribute3 = el.getAttribute('data-width')) !== null && _el$getAttribute3 !== void 0 ? _el$getAttribute3 : 100);
        var pageSpread = new PageSpread(el, {
          id: id,
          type: type,
          pageIds: pageIds,
          maxZoomScale: maxZoomScale,
          width: width,
          left: left
        });
        left += width;
        pageSpreads.push(pageSpread);
      }

      return pageSpreads;
    }
  }, {
    key: "buildPageIds",
    value: function buildPageIds(pageSpreads) {
      var pageIds = {};

      _forEachInstanceProperty(pageSpreads).call(pageSpreads, function (pageSpread) {
        var _context23;

        _forEachInstanceProperty(_context23 = pageSpread.options.pageIds).call(_context23, function (pageId) {
          pageIds[pageId] = pageSpread;
        });
      });

      return pageIds;
    }
  }, {
    key: "isCoordinateInsideElement",
    value: function isCoordinateInsideElement(x, y, el) {
      var rect = el.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }
  }, {
    key: "getCoordinateInfo",
    value: function getCoordinateInfo(x, y, pageSpread) {
      var pageEl;
      x -= this.el.offsetLeft;
      y -= this.el.offsetTop;
      var info = {
        x: x,
        y: y,
        contentX: 0,
        contentY: 0,
        pageX: 0,
        pageY: 0,
        overlayEls: [],
        pageEl: null,
        isInsideContentX: false,
        isInsideContentY: false,
        isInsideContent: false
      };
      var contentRect = pageSpread.getContentRect();
      var overlayEls = pageSpread.getOverlayEls();
      var pageEls = pageSpread.getPageEls();

      for (var _i2 = 0, _Array$from3 = _Array$from2(overlayEls); _i2 < _Array$from3.length; _i2++) {
        var overlayEl = _Array$from3[_i2];

        if (this.isCoordinateInsideElement(x, y, overlayEl)) {
          info.overlayEls.push(overlayEl);
        }
      }

      for (var _i3 = 0, _Array$from4 = _Array$from2(pageEls); _i3 < _Array$from4.length; _i3++) {
        pageEl = _Array$from4[_i3];

        if (this.isCoordinateInsideElement(x, y, pageEl)) {
          info.pageEl = pageEl;
          break;
        }
      }

      info.contentX = (x - contentRect.left) / Math.max(1, contentRect.width);
      info.contentY = (y - contentRect.top) / Math.max(1, contentRect.height);

      if (info.pageEl) {
        info.isInsideContentX = info.contentX >= 0 && info.contentX <= 1;
        info.isInsideContentY = info.contentY >= 0 && info.contentY <= 1;
        info.isInsideContent = info.isInsideContentX && info.isInsideContentY;
      }

      return info;
    }
  }, {
    key: "getPageSpreadCount",
    value: function getPageSpreadCount() {
      return this.pageSpreads.length;
    }
  }, {
    key: "getActivePageSpread",
    value: function getActivePageSpread() {
      return this.getPageSpreadFromPosition(this.getPosition());
    }
  }, {
    key: "getPageSpreadFromPosition",
    value: function getPageSpreadFromPosition(position) {
      return this.pageSpreads[position];
    }
  }, {
    key: "getPageSpreadPositionFromPageId",
    value: function getPageSpreadPositionFromPageId(pageId) {
      for (var idx = 0; idx < this.pageSpreads.length; idx++) {
        var _context24;

        var pageSpread = this.pageSpreads[idx];

        if (_indexOfInstanceProperty(_context24 = pageSpread.options.pageIds).call(_context24, pageId) > -1) {
          return idx;
        }
      }
    }
  }, {
    key: "getPageSpreadBounds",
    value: function getPageSpreadBounds(pageSpread) {
      var pageSpreadRect = pageSpread.getRect();
      var pageSpreadContentRect = pageSpread.getContentRect();
      return {
        left: (pageSpreadContentRect.left - pageSpreadRect.left) / pageSpreadRect.width * 100,
        top: (pageSpreadContentRect.top - pageSpreadRect.top) / pageSpreadRect.height * 100,
        width: pageSpreadContentRect.width / pageSpreadRect.width * 100,
        height: pageSpreadContentRect.height / pageSpreadRect.height * 100,
        pageSpreadRect: pageSpreadRect,
        pageSpreadContentRect: pageSpreadContentRect
      };
    }
  }, {
    key: "clipCoordinate",
    value: function clipCoordinate(coordinate, scale, size, offset) {
      if (size * scale < 100) {
        coordinate = offset * -scale + 50 - size * scale / 2;
      } else {
        coordinate = Math.min(coordinate, offset * -scale);
        coordinate = Math.max(coordinate, offset * -scale - size * scale + 100);
      }

      return coordinate;
    }
  }, {
    key: "zoomTo",
    value: function zoomTo() {
      var _options$x, _options$y;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      var scale = options.scale;
      var curScale = this.transform.scale;
      var activePageSpread = this.getActivePageSpread();
      var pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
      var carouselOffset = activePageSpread.getLeft();
      var carouselScaledOffset = carouselOffset * curScale;
      var x = (_options$x = options.x) !== null && _options$x !== void 0 ? _options$x : 0;
      var y = (_options$y = options.y) !== null && _options$y !== void 0 ? _options$y : 0;

      if (scale !== 1) {
        x -= pageSpreadBounds.pageSpreadRect.left;
        y -= pageSpreadBounds.pageSpreadRect.top;
        x = x / (pageSpreadBounds.pageSpreadRect.width / curScale) * 100;
        y = y / (pageSpreadBounds.pageSpreadRect.height / curScale) * 100;
        x = this.transform.left + carouselScaledOffset + x - x * scale / curScale;
        y = this.transform.top + y - y * scale / curScale; // Make sure the animation doesn't exceed the content bounds.

        if (options.bounds !== false && scale > 1) {
          x = this.clipCoordinate(x, scale, pageSpreadBounds.width, pageSpreadBounds.left);
          y = this.clipCoordinate(y, scale, pageSpreadBounds.height, pageSpreadBounds.top);
        }
      } else {
        x = 0;
        y = 0;
      } // Account for the page spreads left of the active one.


      x -= carouselOffset * scale;
      this.transform.left = x;
      this.transform.top = y;
      this.transform.scale = scale;
      this.animation.animate({
        x: "".concat(x, "%"),
        y: "".concat(y, "%"),
        scale: scale,
        easing: options.easing,
        duration: options.duration
      }, callback);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
      this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
      this.pageIds = this.buildPageIds(this.pageSpreads);
      return this;
    }
  }, {
    key: "getHammerInputClass",
    value: function getHammerInputClass() {
      var mobileRegex = /mobile|tablet|ip(ad|hone|od)|android/i;
      var supportTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

      if (supportTouch && mobileRegex.test(navigator.userAgent)) {
        return hammer.TouchInput;
      } else {
        return null;
      }
    } //#############

    /* Events */
    //#############

  }, {
    key: "onPanStart",
    value: function onPanStart(e) {
      // Only allow panning if zoomed in or doing a horizontal pan.
      // This ensures vertical scrolling works for scrollable page spreads.
      if (this.transform.scale > 1 || e.direction === hammer.DIRECTION_LEFT || e.direction === hammer.DIRECTION_RIGHT) {
        var x = e.center.x;
        var edgeThreshold = 30;
        var width = this.scrollerEl.offsetWidth; // Prevent panning when edge-swiping on iOS.

        if (x > edgeThreshold && x < width - edgeThreshold) {
          this.startTransform.left = this.transform.left;
          this.startTransform.top = this.transform.top;
          this.panning = true;
          this.trigger('panStart');
        }
      }
    }
  }, {
    key: "onPanMove",
    value: function onPanMove(e) {
      var x;

      if (this.pinching === true || this.panning === false) {
        return;
      }

      if (this.transform.scale > 1) {
        var activePageSpread = this.getActivePageSpread();
        var carouselOffset = activePageSpread.getLeft();
        var carouselScaledOffset = carouselOffset * this.transform.scale;
        var pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
        var scale = this.transform.scale;
        x = this.startTransform.left + carouselScaledOffset + e.deltaX / this.scrollerEl.offsetWidth * 100;
        var y = this.startTransform.top + e.deltaY / this.scrollerEl.offsetHeight * 100;
        x = this.clipCoordinate(x, scale, pageSpreadBounds.width, pageSpreadBounds.left);
        y = this.clipCoordinate(y, scale, pageSpreadBounds.height, pageSpreadBounds.top);
        x -= carouselScaledOffset;
        this.transform.left = x;
        this.transform.top = y;
        this.animation.animate({
          x: "".concat(x, "%"),
          y: "".concat(y, "%"),
          scale: scale,
          easing: 'linear'
        });
      } else {
        x = this.transform.left + e.deltaX / this.scrollerEl.offsetWidth * 100;
        this.animation.animate({
          x: "".concat(x, "%"),
          easing: 'linear'
        });
      }
    }
  }, {
    key: "onPanEnd",
    value: function onPanEnd(e) {
      if (this.panning === false) {
        return;
      }

      this.panning = false;
      this.trigger('panEnd');

      if (this.transform.scale === 1 && this.pinching === false) {
        var position = this.getPosition();
        var velocity = e.overallVelocityX;

        if (Math.abs(velocity) >= this.swipeVelocity) {
          if (Math.abs(e.deltaX) >= this.swipeThreshold) {
            if (e.offsetDirection === hammer.DIRECTION_LEFT) {
              this.next({
                velocity: velocity,
                duration: this.navigationPanDuration
              });
            } else if (e.offsetDirection === hammer.DIRECTION_RIGHT) {
              this.prev({
                velocity: velocity,
                duration: this.navigationPanDuration
              });
            }
          }
        }

        if (position === this.getPosition()) {
          this.animation.animate({
            x: "".concat(this.transform.left, "%"),
            duration: this.navigationPanDuration
          });
          this.trigger('attemptedNavigation', {
            position: this.getPosition()
          });
        }
      }
    }
  }, {
    key: "onPinchStart",
    value: function onPinchStart() {
      if (!this.getActivePageSpread().isZoomable()) {
        return;
      }

      this.pinching = true;
      this.el.setAttribute('data-pinching', true);
      this.startTransform.scale = this.transform.scale;
    }
  }, {
    key: "onPinchMove",
    value: function onPinchMove(e) {
      if (this.pinching === false) {
        return;
      }

      this.zoomTo({
        x: e.center.x,
        y: e.center.y,
        scale: this.startTransform.scale * e.scale,
        bounds: false,
        easing: 'linear'
      });
    }
  }, {
    key: "onPinchEnd",
    value: function onPinchEnd(e) {
      var _this3 = this;

      if (this.pinching === false) {
        return;
      }

      var activePageSpread = this.getActivePageSpread();
      var maxZoomScale = activePageSpread.getMaxZoomScale();
      var scale = Math.max(1, Math.min(this.transform.scale, maxZoomScale));
      var position = this.getPosition();

      if (this.startTransform.scale === 1 && scale > 1) {
        this.trigger('zoomedIn', {
          position: position
        });
      } else if (this.startTransform.scale > 1 && scale === 1) {
        this.trigger('zoomedOut', {
          position: position
        });
      }

      this.zoomTo({
        x: e.center.x,
        y: e.center.y,
        scale: scale,
        duration: this.zoomDuration
      }, function () {
        _this3.pinching = false;

        _this3.el.setAttribute('data-pinching', false);
      });
    }
  }, {
    key: "onPress",
    value: function onPress(e) {
      this.trigger('pressed', this.getCoordinateInfo(e.center.x, e.center.y, this.getActivePageSpread()));
    }
  }, {
    key: "onContextmenu",
    value: function onContextmenu(e) {
      e.preventDefault();
      this.trigger('contextmenu', this.getCoordinateInfo(e.clientX, e.clientY, this.getActivePageSpread()));
      return false;
    }
  }, {
    key: "onWheel",
    value: function onWheel(e) {
      var _this4 = this;

      var position, scale;
      var activePageSpread = this.getActivePageSpread();

      if (activePageSpread.isZoomable() === false) {
        return;
      } // see https://stackoverflow.com/a/23668035


      var deltaY = e.deltaY;

      if (event.webkitDirectionInvertedFromDevice) {
        deltaY = -deltaY;
      }

      if (deltaY > 0 && this.transform.scale === 1) {
        scale = activePageSpread.getMaxZoomScale();
        position = this.getPosition();
        this.zoomTo({
          x: e.clientX,
          y: e.clientY,
          scale: scale,
          duration: this.zoomDuration
        }, function () {
          _this4.trigger('zoomedIn', {
            position: position
          });
        });
      } else if (deltaY < 0 && this.transform.scale > 1) {
        position = this.getPosition();
        this.zoomTo({
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          duration: this.zoomDuration
        }, function () {
          _this4.trigger('zoomedOut', {
            position: position
          });
        });
      }
    }
  }, {
    key: "onSingletap",
    value: function onSingletap(e) {
      var _this5 = this;

      var activePageSpread = this.getActivePageSpread();
      var coordinateInfo = this.getCoordinateInfo(e.center.x, e.center.y, activePageSpread);
      clearTimeout(this.tap.timeout);

      if (this.tap.count === 1) {
        this.tap.count = 0;
        this.trigger('doubleClicked', coordinateInfo);

        if (activePageSpread.isZoomable()) {
          var maxZoomScale = activePageSpread.getMaxZoomScale();
          var zoomedIn = this.transform.scale > 1;
          var scale = zoomedIn ? 1 : maxZoomScale;
          var zoomEvent = zoomedIn ? 'zoomedOut' : 'zoomedIn';
          var position = this.getPosition();
          this.zoomTo({
            x: e.center.x,
            y: e.center.y,
            scale: scale,
            duration: this.zoomDuration
          }, function () {
            _this5.trigger(zoomEvent, {
              position: position
            });
          });
        }
      } else {
        this.tap.count++;
        this.tap.timeout = _setTimeout(function () {
          _this5.tap.count = 0;

          _this5.trigger('clicked', coordinateInfo);
        }, this.tap.delay);
      }
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      if (!this.getActivePageSpread().isScrollable()) {
        e.preventDefault();
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      if (!this.getActivePageSpread().isScrollable()) {
        e.preventDefault();
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      if (this.transform.scale > 1) {
        var position = this.getPosition();
        var activePageSpread = this.getActivePageSpread();
        this.transform.left = this.getLeftTransformFromPageSpread(position, activePageSpread);
        this.transform.top = 0;
        this.transform.scale = 1;
        this.zoomTo({
          x: this.transform.left,
          y: this.transform.top,
          scale: this.transform.scale,
          duration: 0
        });
        this.trigger('zoomedOut', {
          position: position
        });
      }
    }
  }]);

  return Verso;
}();

export default Verso;
//# sourceMappingURL=verso.es.js.map
