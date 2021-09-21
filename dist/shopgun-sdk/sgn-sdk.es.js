import _bindInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/bind';
import _Reflect$construct from '@babel/runtime-corejs3/core-js-stable/reflect/construct';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _assertThisInitialized from '@babel/runtime-corejs3/helpers/assertThisInitialized';
import _inherits from '@babel/runtime-corejs3/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime-corejs3/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime-corejs3/helpers/getPrototypeOf';
import _classPrivateFieldGet from '@babel/runtime-corejs3/helpers/classPrivateFieldGet';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _keysInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/keys';
import _WeakMap from '@babel/runtime-corejs3/core-js-stable/weak-map';
import MicroEvent from 'microevent';
import 'core-js/modules/es.string.search.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.to-string.js';
import _URL from '@babel/runtime-corejs3/core-js-stable/url';
import _URLSearchParams from '@babel/runtime-corejs3/core-js-stable/url-search-params';
import fetch from 'cross-fetch';
import 'core-js/modules/es.string.match.js';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import Mustache from 'mustache';
import 'core-js/modules/es.array.join.js';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import _setInterval from '@babel/runtime-corejs3/core-js-stable/set-interval';
import md5 from 'md5';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _lastIndexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/last-index-of';
import _parseInt from '@babel/runtime-corejs3/core-js-stable/parse-int';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.string.replace.js';
import 'core-js/modules/es.regexp.constructor.js';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.string.link.js';
import 'core-js/modules/es.string.split.js';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from';
import _Symbol from '@babel/runtime-corejs3/core-js-stable/symbol';
import _getIteratorMethod from '@babel/runtime-corejs3/core-js/get-iterator-method';
import _getIterator from '@babel/runtime-corejs3/core-js/get-iterator';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import _Object$values from '@babel/runtime-corejs3/core-js-stable/object/values';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import 'core-js/modules/es.number.constructor.js';
import _Date$now from '@babel/runtime-corejs3/core-js-stable/date/now';
import _Object$create from '@babel/runtime-corejs3/core-js-stable/object/create';
import _sortInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/sort';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _Object$entries from '@babel/runtime-corejs3/core-js-stable/object/entries';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.string.iterator.js';

var coreUrl = 'https://squid-api.tjek.com';
var eventsTrackUrl = 'https://wolf-api.tjek.com/sync';

var configDefaults = /*#__PURE__*/Object.freeze({
    __proto__: null,
    coreUrl: coreUrl,
    eventsTrackUrl: eventsTrackUrl
});

function ownKeys$2(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context3; _forEachInstanceProperty(_context3 = ownKeys$2(Object(source), true)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context4; _forEachInstanceProperty(_context4 = ownKeys$2(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _attrs = new _WeakMap();

var Config = /*#__PURE__*/function (_MicroEvent) {
  _inherits(Config, _MicroEvent);

  var _super = _createSuper$b(Config);

  function Config() {
    var _context;

    var _this;

    _classCallCheck(this, Config);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, _concatInstanceProperty(_context = [this]).call(_context, args));

    _attrs.set(_assertThisInitialized(_this), {
      writable: true,
      value: _objectSpread$2({}, configDefaults)
    });

    return _this;
  }

  _createClass(Config, [{
    key: "set",
    value: function set() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var changedAttributes = {};

      for (var key in config) {
        var _context2;

        if (key === 'appKey') key = 'apiKey';
        var value = config[key];

        if (_includesInstanceProperty(_context2 = _keysInstanceProperty(this)).call(_context2, key)) {
          _classPrivateFieldGet(this, _attrs)[key] = value;
          changedAttributes[key] = value;
        }
      }

      this.trigger('change', changedAttributes);
    }
  }, {
    key: "get",
    value: function get(option) {
      if (option === 'appKey') option = 'apiKey';
      return _classPrivateFieldGet(this, _attrs)[option];
    }
  }]);

  return Config;
}(MicroEvent);

Config.prototype.keys = ['appVersion', 'apiKey', 'authToken', 'eventTracker', 'coreUrl', 'eventsTrackUrl'];

function isBrowser() {
  return typeof window === 'object' && typeof document === 'object';
}
function isNode() {
  return typeof process === 'object';
}
function error(err, options) {
  err.message = err.message || null;

  if (typeof options === 'string') {
    err.message = options;
  } else if (typeof options === 'object' && options != null) {
    for (var key in options) {
      var value = options[key];
      err[key] = value;
    }

    if (options.message != null) {
      err.message = options.message;
    }

    if (options.code != null || options.message != null) {
      err.code = options.code || options.name;
    }

    if (options.stack != null) {
      err.stack = options.stack;
    }
  }

  err.name = (options === null || options === void 0 ? void 0 : options.name) || err.name || err.code || 'Error';
  err.time = new Date();
  return err;
}
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
function getQueryParam(field, url) {
  var href = url || window.location.href;
  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  var string = reg.exec(href);

  if (string) {
    return string[1];
  }

  return undefined;
}
function getRandomNumberBetween(from, to) {
  return Math.floor(Math.random() * to) + from;
}
function getOS() {
  var name = null;
  var ua = window.navigator.userAgent;

  if (_indexOfInstanceProperty(ua).call(ua, 'Windows') > -1) {
    name = 'Windows';
  } else if (_indexOfInstanceProperty(ua).call(ua, 'Mac') > -1) {
    name = 'macOS';
  } else if (_indexOfInstanceProperty(ua).call(ua, 'X11') > -1) {
    name = 'unix';
  } else if (_indexOfInstanceProperty(ua).call(ua, 'Linux') > -1) {
    name = 'Linux';
  } else if (_indexOfInstanceProperty(ua).call(ua, 'iOS') > -1) {
    name = 'iOS';
  } else if (_indexOfInstanceProperty(ua).call(ua, 'Android') > -1) {
    name = 'Android';
  }

  return name;
}
function getDeviceCategory() {
  var deviceCategory = 'desktop';

  if (navigator.platform === 'iPod' || navigator.platform === 'iPhone') {
    deviceCategory = 'mobile';
  } else if (navigator.platform === 'iPad') {
    deviceCategory = 'tablet';
  } else if (navigator.platform === 'Android' || /android/gi.test(navigator.userAgent)) {
    if (/tablet/gi.test(navigator.userAgent)) {
      deviceCategory = 'tablet';
    } else {
      deviceCategory = 'mobile';
    }
  }

  return deviceCategory;
}
function getPointer() {
  var pointer = 'fine';

  if (matchMedia('(pointer:coarse)').matches) {
    pointer = 'coarse';
  }

  return pointer;
}
function getOrientation(width, height) {
  if (width === height) {
    return 'quadratic';
  } else if (width > height) {
    return 'horizontal';
  } else {
    return 'vertical';
  }
}
function getScreenDimensions() {
  var _window$devicePixelRa;

  var density = (_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1;
  var logical = {
    width: window.screen.width,
    height: window.screen.height
  };
  var physical = {
    width: Math.round(logical.width * density),
    height: Math.round(logical.height * density)
  };
  return {
    density: density,
    logical: logical,
    physical: physical
  };
}
function getUtcOffsetSeconds() {
  var now = new Date();
  var jan1 = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  var tmp = jan1.toGMTString();
  var jan2 = new Date(tmp.substring(0, _lastIndexOfInstanceProperty(tmp).call(tmp, ' ') - 1));
  var stdTimeOffset = (jan1 - jan2) / 1000;
  return stdTimeOffset;
}
function getUtcDstOffsetSeconds() {
  return new Date().getTimezoneOffset() * 60 * -1;
}
function getColorBrightness(color) {
  color = color.replace('#', '');

  var hex = _parseInt((hex + '').replace(/[^a-f0-9]/gi, ''), 16);

  var rgb = [];
  var sum = 0;
  var x = 0;

  while (x < 3) {
    var s = _parseInt(color.substring(2 * x, 2), 16);

    rgb[x] = s;

    if (s > 0) {
      sum += s;
    }

    ++x;
  }

  if (sum <= 381) {
    return 'dark';
  } else {
    return 'light';
  }
}
function btoa(str) {
  if (isBrowser()) {
    return window.btoa(str);
  } else {
    var buffer = null;

    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
  }
}
function chunk(arr, size) {
  var results = [];

  while (arr.length) {
    results.push(_spliceInstanceProperty(arr).call(arr, 0, size));
  }

  return results;
}
function throttle(fn) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var scope = arguments.length > 2 ? arguments[2] : undefined;
  var last = undefined;
  var deferTimer = undefined;
  return function () {
    var context = scope || this;
    var now = new Date().getTime();
    var args = arguments;

    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = _setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
function loadImage(src, callback) {
  var img = new Image();

  img.onload = function () {
    return callback(null, img.width, img.height);
  };

  img.onerror = function () {
    return callback(new Error());
  };

  img.src = src;
  return img;
}
function distance(lat1, lng1, lat2, lng2) {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var theta = lng1 - lng2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344 * 1000;
  return dist;
}
function closest(el, s) {
  var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

  do {
    if (matches.call(el, s)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);

  return null;
}
// to return promises if no callback is given in a call.
// The second argument, cbParameterIndex, is the position of the callback in the original functions parameter list.
// CoffeeScript optional parameters messes with this function arity detection,
// not sure what to do about that, other than always setting cbParameterIndex at callsites.

function promiseCallbackInterop(fun) {
  var _this = this;

  var cbParameterIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fun.length - 1;

  // This is the function that actually wraps and calls a method to return a promise.
  var makePromise = function makePromise(fun, cbParameterIndex, parameters) {
    return new _Promise(function (resolve, reject) {
      var neoCallback = function neoCallback(error, result) {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      };

      var callParameters = [];

      for (var i = 0, end = Math.max(parameters.length, cbParameterIndex) + 1, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        callParameters.push(i === cbParameterIndex ? neoCallback : parameters[i]);
      }

      return fun.apply(_this, callParameters);
    });
  }; // Wrapper function that decides what to do per-call.


  return function () {
    for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
      parameters[_key] = arguments[_key];
    }

    if (typeof parameters[cbParameterIndex] === 'function') {
      // Callback given, do a regular old call.
      return fun.apply(null, parameters);
    } else if (typeof _Promise === 'function') {
      // No callback given, and we have promise support, use makePromise to wrap the call.
      return makePromise(fun, cbParameterIndex, parameters);
    } else {
      // Ain't got callback, ain't got promise support; we gotta tell the developer.
      throw new Error("To be able to use this asynchronous method you should:\nSupply a callback function as argument #".concat(1 + cbParameterIndex, ".\nThis callback function will be called with the method call response.\nAlternatively, when supported, it can return a Promise if no callback function is given."));
    }
  };
}

var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isBrowser: isBrowser,
    isNode: isNode,
    error: error,
    uuid: uuid,
    getQueryParam: getQueryParam,
    getRandomNumberBetween: getRandomNumberBetween,
    getOS: getOS,
    getDeviceCategory: getDeviceCategory,
    getPointer: getPointer,
    getOrientation: getOrientation,
    getScreenDimensions: getScreenDimensions,
    getUtcOffsetSeconds: getUtcOffsetSeconds,
    getUtcDstOffsetSeconds: getUtcDstOffsetSeconds,
    getColorBrightness: getColorBrightness,
    btoa: btoa,
    chunk: chunk,
    throttle: throttle,
    loadImage: loadImage,
    distance: distance,
    closest: closest,
    promiseCallbackInterop: promiseCallbackInterop
});

function request() {
  var _options$url, _options$headers;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var url = SGN.config.get('coreUrl') + ((_options$url = options.url) !== null && _options$url !== void 0 ? _options$url : '');
  var method = options.method || 'get';
  var headers = (_options$headers = options.headers) !== null && _options$headers !== void 0 ? _options$headers : {};
  var apiKey = SGN.config.get('apiKey');
  var clientVersion = SGN.config.get('clientVersion');
  var body = options.body;

  if (!apiKey) {
    callback(new Error('`apiKey` needs to be configured, please see README'));
    return;
  }

  headers['X-Api-Key'] = apiKey;

  if (!headers['Accept']) {
    headers['Accept'] = 'application/json';
  }

  if (clientVersion != null) {
    headers['X-Client-Version'] = clientVersion;
  }

  if (options.qs) {
    var url2 = new _URL(url);
    var searchParams = new _URLSearchParams(url2.search);

    for (var key in options.qs) {
      searchParams.append(key, options.qs[key]);
    }

    url = url2.origin + url2.pathname + '?' + searchParams.toString();
  }

  fetch(url, {
    method: method,
    body: body,
    headers: headers,
    credentials: 'same-origin'
  }).then(function (response) {
    if (response.status >= 200 && response.status < 300 || response.status === 304) {
      response.json().then(function (json) {
        callback(null, json);
      }).catch(callback);
    } else {
      callback(error(new Error('Core API error'), {
        code: 'CoreAPIError',
        statusCode: response.status
      }), response.text());
    }
  }).catch(callback);
}

var request$1 = promiseCallbackInterop(request, 1);

var CoreKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    request: request$1
});

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var gator = createCommonjsModule(function (module) {
  var _matcher,
      _level = 0,
      _id = 0,
      _handlers = {},
      _gatorInstances = {};

  function _addEvent(gator, type, callback) {
    // blur and focus do not bubble up but if you use event capturing
    // then you will get them
    var useCapture = type == "blur" || type == "focus";
    gator.element.addEventListener(type, callback, useCapture);
  }

  function _cancel(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  /**
       * returns function to use for determining if an element
       * matches a query selector
       *
       * @returns {Function}
       */


  function _getMatcher(element) {
    if (_matcher) {
      return _matcher;
    }

    if (element.matches) {
      _matcher = element.matches;
      return _matcher;
    }

    if (element.webkitMatchesSelector) {
      _matcher = element.webkitMatchesSelector;
      return _matcher;
    }

    if (element.mozMatchesSelector) {
      _matcher = element.mozMatchesSelector;
      return _matcher;
    }

    if (element.msMatchesSelector) {
      _matcher = element.msMatchesSelector;
      return _matcher;
    }

    if (element.oMatchesSelector) {
      _matcher = element.oMatchesSelector;
      return _matcher;
    } // if it doesn't match a native browser method
    // fall back to the gator function


    _matcher = Gator.matchesSelector;
    return _matcher;
  }
  /**
       * determines if the specified element matches a given selector
       *
       * @param {Node} element - the element to compare against the selector
       * @param {string} selector
       * @param {Node} boundElement - the element the listener was attached to
       * @returns {void|Node}
       */


  function _matchesSelector(element, selector, boundElement) {
    // no selector means this event was bound directly to this element
    if (selector == "_root") {
      return boundElement;
    } // if we have moved up to the element you bound the event to
    // then we have come too far


    if (element === boundElement) {
      return;
    } // if this is a match then we are done!


    if (_getMatcher(element).call(element, selector)) {
      return element;
    } // if this element did not match but has a parent we should try
    // going up the tree to see if any of the parent elements match
    // for example if you are looking for a click on an <a> tag but there
    // is a <span> inside of the a tag that it is the target,
    // it should still work


    if (element.parentNode) {
      _level++;
      return _matchesSelector(element.parentNode, selector, boundElement);
    }
  }

  function _addHandler(gator, event, selector, callback) {
    if (!_handlers[gator.id]) {
      _handlers[gator.id] = {};
    }

    if (!_handlers[gator.id][event]) {
      _handlers[gator.id][event] = {};
    }

    if (!_handlers[gator.id][event][selector]) {
      _handlers[gator.id][event][selector] = [];
    }

    _handlers[gator.id][event][selector].push(callback);
  }

  function _removeHandler(gator, event, selector, callback) {
    // if there are no events tied to this element at all
    // then don't do anything
    if (!_handlers[gator.id]) {
      return;
    } // if there is no event type specified then remove all events
    // example: Gator(element).off()


    if (!event) {
      for (var type in _handlers[gator.id]) {
        if (_handlers[gator.id].hasOwnProperty(type)) {
          _handlers[gator.id][type] = {};
        }
      }

      return;
    } // if no callback or selector is specified remove all events of this type
    // example: Gator(element).off('click')


    if (!callback && !selector) {
      _handlers[gator.id][event] = {};
      return;
    } // if a selector is specified but no callback remove all events
    // for this selector
    // example: Gator(element).off('click', '.sub-element')


    if (!callback) {
      delete _handlers[gator.id][event][selector];
      return;
    } // if we have specified an event type, selector, and callback then we
    // need to make sure there are callbacks tied to this selector to
    // begin with.  if there aren't then we can stop here


    if (!_handlers[gator.id][event][selector]) {
      return;
    } // if there are then loop through all the callbacks and if we find
    // one that matches remove it from the array


    for (var i = 0; i < _handlers[gator.id][event][selector].length; i++) {
      if (_handlers[gator.id][event][selector][i] === callback) {
        var _context;

        _spliceInstanceProperty(_context = _handlers[gator.id][event][selector]).call(_context, i, 1);

        break;
      }
    }
  }

  function _handleEvent(id, e, type) {
    if (!_handlers[id][type]) {
      return;
    }

    var target = e.target || e.srcElement,
        selector,
        match,
        matches = {},
        i = 0,
        j = 0; // find all events that match

    _level = 0;

    for (selector in _handlers[id][type]) {
      if (_handlers[id][type].hasOwnProperty(selector)) {
        match = _matchesSelector(target, selector, _gatorInstances[id].element);

        if (match && Gator.matchesEvent(type, _gatorInstances[id].element, match, selector == "_root", e)) {
          _level++;
          _handlers[id][type][selector].match = match;
          matches[_level] = _handlers[id][type][selector];
        }
      }
    } // stopPropagation() fails to set cancelBubble to true in Webkit
    // @see http://code.google.com/p/chromium/issues/detail?id=162270


    e.stopPropagation = function () {
      e.cancelBubble = true;
    };

    for (i = 0; i <= _level; i++) {
      if (matches[i]) {
        for (j = 0; j < matches[i].length; j++) {
          if (matches[i][j].call(matches[i].match, e) === false) {
            Gator.cancel(e);
            return;
          }

          if (e.cancelBubble) {
            return;
          }
        }
      }
    }
  }
  /**
       * binds the specified events to the element
       *
       * @param {string|Array} events
       * @param {string} selector
       * @param {Function} callback
       * @param {boolean=} remove
       * @returns {Object}
       */


  function _bind(events, selector, callback, remove) {
    // fail silently if you pass null or undefined as an alement
    // in the Gator constructor
    if (!this.element) {
      return;
    }

    if (!(events instanceof Array)) {
      events = [events];
    }

    if (!callback && typeof selector == "function") {
      callback = selector;
      selector = "_root";
    }

    var id = this.id,
        i;

    function _getGlobalCallback(type) {
      return function (e) {
        _handleEvent(id, e, type);
      };
    }

    for (i = 0; i < events.length; i++) {
      if (remove) {
        _removeHandler(this, events[i], selector, callback);

        continue;
      }

      if (!_handlers[id] || !_handlers[id][events[i]]) {
        Gator.addEvent(this, events[i], _getGlobalCallback(events[i]));
      }

      _addHandler(this, events[i], selector, callback);
    }

    return this;
  }
  /**
       * Gator object constructor
       *
       * @param {Node} element
       */


  function Gator(element, id) {
    // called as function
    if (!(this instanceof Gator)) {
      // only keep one Gator instance per node to make sure that
      // we don't create a ton of new objects if you want to delegate
      // multiple events from the same node
      //
      // for example: Gator(document).on(...
      for (var key in _gatorInstances) {
        if (_gatorInstances[key].element === element) {
          return _gatorInstances[key];
        }
      }

      _id++;
      _gatorInstances[_id] = new Gator(element, _id);
      return _gatorInstances[_id];
    }

    this.element = element;
    this.id = id;
  }
  /**
       * adds an event
       *
       * @param {string|Array} events
       * @param {string} selector
       * @param {Function} callback
       * @returns {Object}
       */


  Gator.prototype.on = function (events, selector, callback) {
    return _bind.call(this, events, selector, callback);
  };
  /**
       * removes an event
       *
       * @param {string|Array} events
       * @param {string} selector
       * @param {Function} callback
       * @returns {Object}
       */


  Gator.prototype.off = function (events, selector, callback) {
    return _bind.call(this, events, selector, callback, true);
  };

  Gator.matchesSelector = function () {};

  Gator.cancel = _cancel;
  Gator.addEvent = _addEvent;

  Gator.matchesEvent = function () {
    return true;
  };

  if (module.exports) {
    module.exports = Gator;
  }

  if (typeof window !== "undefined" && window.exports) {
    window.Gator = Gator;
  }
});

var OfferDetails = /*#__PURE__*/function () {
  function OfferDetails(_ref) {
    var _context;

    var _ref$minWidth = _ref.minWidth,
        minWidth = _ref$minWidth === void 0 ? 300 : _ref$minWidth,
        _ref$maxWidth = _ref.maxWidth,
        maxWidth = _ref$maxWidth === void 0 ? '100vw' : _ref$maxWidth,
        anchorEl = _ref.anchorEl,
        contentEl = _ref.contentEl;

    _classCallCheck(this, OfferDetails);

    this.resize = _bindInstanceProperty(_context = this.resize).call(_context, this);
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;
    this.anchorEl = anchorEl;
    this.contentEl = contentEl;
    this.elInner = document.createElement('div');
    this.elInner.className = 'sgn-offer-details-inner';
    this.el = document.createElement('div');
    this.el.className = 'sgn-offer-details';
    this.el.setAttribute('tabindex', -1);
    this.el.appendChild(this.elInner);
    this.el.appendChild(this.contentEl);
    this.position();
  }

  _createClass(OfferDetails, [{
    key: "appendTo",
    value: function appendTo(el) {
      el.appendChild(this.el);
      this.el.offsetWidth;
      this.show();
      return this;
    }
  }, {
    key: "show",
    value: function show() {
      this.el.className += ' in';
      window.addEventListener('resize', this.resize, false);
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('resize', this.resize, false);
      this.el.parentNode.removeChild(this.el);
    }
  }, {
    key: "position",
    value: function position() {
      var rect = this.anchorEl.getBoundingClientRect();
      var top = window.pageYOffset + rect.top + this.anchorEl.offsetHeight;
      var left = window.pageXOffset + rect.left;
      var width = this.anchorEl.offsetWidth;
      this.el.style.top = top + 'px';
      var rightAligned = rect.left >= window.outerWidth / 2;
      left = window.pageXOffset + rect.left;
      var right = window.pageXOffset + (window.outerWidth - rect.right);

      if (rightAligned) {
        this.el.style.left = 'auto';
        this.el.style.right = right + 'px';
        this.elInner.style.left = 'auto';
        this.elInner.style.right = 0;
      } else {
        this.el.style.left = left + 'px';
        this.el.style.right = 'auto';
        this.elInner.style.left = 0;
        this.elInner.style.right = 'auto';
      }

      this.el.style.minWidth = typeof this.minWidth === 'number' ? Math.max(width, this.minWidth) + 'px' : this.minWidth;
      this.el.style.maxWidth = this.maxWidth;
      this.elInner.style.width = width - 8 + 'px';
    }
  }, {
    key: "resize",
    value: function resize() {
      this.position();
    }
  }]);

  return OfferDetails;
}();

var ESC = 27;
var ARROW_RIGHT = 39;
var ARROW_LEFT = 37;
var SPACE = 32;
var NUMBER_ONE = 49;

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var defaultTemplate = "<div class=\"sgn-popover__background\" data-close></div>\n<div class=\"sgn-popover__menu\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#singleChoiceItems}}\n                <li data-index=\"{{index}}\">\n                    <p class=\"sgn-popover-item__title\">{{item.title}}</p>\n                    {{#item.subtitle}}\n                        <p class=\"sgn-popover-item__subtitle\">{{item.subtitle}}</p>\n                    {{/item.subtitle}}\n                </li>\n            {{/singleChoiceItems}}\n        </ul>\n    </div>\n</div>";

var Popover = /*#__PURE__*/function (_MicroEvent) {
  _inherits(Popover, _MicroEvent);

  var _super = _createSuper$a(Popover);

  function Popover() {
    var _context, _context2, _context3;

    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Popover);

    _this = _super.call(this);
    _this.keyUp = _bindInstanceProperty(_context = _this.keyUp).call(_context, _assertThisInitialized(_this));
    _this.resize = _bindInstanceProperty(_context2 = _this.resize).call(_context2, _assertThisInitialized(_this));
    _this.scroll = _bindInstanceProperty(_context3 = _this.scroll).call(_context3, _assertThisInitialized(_this));
    _this.options = options;
    _this.el = document.createElement('div');
    _this.backgroundEl = document.createElement('div');
    return _this;
  }

  _createClass(Popover, [{
    key: "render",
    value: function render() {
      var _this$options = this.options,
          header = _this$options.header,
          singleChoiceItems = _this$options.singleChoiceItems,
          _this$options$templat = _this$options.template,
          template = _this$options$templat === void 0 ? defaultTemplate : _this$options$templat;
      var view = {
        header: header,
        singleChoiceItems: singleChoiceItems === null || singleChoiceItems === void 0 ? void 0 : _mapInstanceProperty(singleChoiceItems).call(singleChoiceItems, function (item, index) {
          return {
            item: item,
            index: index
          };
        })
      };
      this.el.className = 'sgn-popover';
      this.el.setAttribute('tabindex', -1);
      this.el.innerHTML = Mustache.render(template, view);
      this.position();
      this.addEventListeners();
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      gator(this.el).off();
      window.removeEventListener('resize', this.resize, false);
      window.removeEventListener('scroll', this.scroll, false);

      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        this.trigger('destroyed');
      }
    }
  }, {
    key: "position",
    value: function position() {
      var top = this.options.y;
      var left = this.options.x;
      var menuEl = this.el.querySelector('.sgn-popover__menu');
      var width = menuEl.offsetWidth;
      var height = menuEl.offsetHeight;
      var parentWidth = this.el.parentNode.offsetWidth;
      var parentHeight = this.el.parentNode.offsetHeight;
      var boundingRect = this.el.parentNode.getBoundingClientRect();
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
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _context4,
          _this2 = this;

      var trigger = _bindInstanceProperty(_context4 = this.trigger).call(_context4, this);

      this.el.addEventListener('keyup', this.keyUp);
      gator(this.el).on('click', '[data-index]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        trigger('selected', {
          index: +this.getAttribute('data-index')
        });
      });
      gator(this.el).on('click', '[data-close]', function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this2.destroy();
      });
      gator(this.el).on('click', '.sgn-popover__menu', function (e) {
        e.stopPropagation();
      });
      window.addEventListener('resize', this.resize, false);
      window.addEventListener('scroll', this.scroll, false);
    }
  }, {
    key: "keyUp",
    value: function keyUp(e) {
      if (e.keyCode === ESC) {
        this.destroy();
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      this.destroy();
    }
  }, {
    key: "scroll",
    value: function scroll() {
      this.destroy();
    }
  }]);

  return Popover;
}(MicroEvent);

function singleChoicePopover(ctx, callback) {
  var items = ctx.items;
  var popover = null;

  if (items.length === 1) {
    callback(items[0]);
  } else if (items.length > 1) {
    popover = new Popover({
      header: ctx.header,
      x: ctx.x,
      y: ctx.y,
      singleChoiceItems: items
    });

    _bindInstanceProperty(popover).call(popover, 'selected', function (e) {
      callback(items[e.index]);
      popover.destroy();
    });

    _bindInstanceProperty(popover).call(popover, 'destroyed', function () {
      ctx.el.focus();
    });

    ctx.el.appendChild(popover.el);
    popover.render().el.focus();
  }

  return {
    destroy: function destroy() {
      var _popover;

      (_popover = popover) === null || _popover === void 0 ? void 0 : _popover.destroy();
    }
  };
}

var on = function on(el, events, selector, callback) {
  return gator(el).on(events, selector, callback);
};
var off = function off(el, events, selector, callback) {
  return gator(el).off(events, selector, callback);
};

var CoreUIKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    on: on,
    off: off,
    OfferDetails: OfferDetails,
    Popover: Popover,
    singleChoicePopover: singleChoicePopover
});

var prefixKey = 'sgn-';

var storage = function () {
  try {
    var _storage = window.localStorage;
    _storage["".concat(prefixKey, "test-storage")] = 'foobar';
    delete _storage["".concat(prefixKey, "test-storage")];
    return _storage;
  } catch (error) {
    return {};
  }
}();

function get(key) {
  try {
    return JSON.parse(storage["".concat(prefixKey).concat(key)]);
  } catch (error) {}
}
function set(key, value) {
  try {
    storage["".concat(prefixKey).concat(key)] = _JSON$stringify(value);
  } catch (error) {}
}

var clientLocal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    set: set
});

var createTrackerClient = function createTrackerClient() {
  var _id;

  var id = get('client-id');

  if ((_id = id) !== null && _id !== void 0 && _id.data) {
    id = id.data;
  }

  if (id == null) {
    id = uuid();
    set('client-id', id);
  }

  return {
    id: id
  };
};

function getPool() {
  var data = get('event-tracker-pool');
  return _Array$isArray(data) ? _filterInstanceProperty(data).call(data, function (evt) {
    return typeof evt._i === 'string';
  }) : [];
}

var unloadHandler = function unloadHandler() {
  return set('event-tracker-pool', _concatInstanceProperty(pool).call(pool, getPool()));
};

var pool;

var Tracker = /*#__PURE__*/function () {
  function Tracker() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tracker);

    if (!pool) {
      pool = getPool();
      set('event-tracker-pool', []);

      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', unloadHandler, false);
      }
    }

    for (var key in this.defaultOptions) {
      var value = this.defaultOptions[key];
      this[key] = options[key] || value;
    }

    this.client = options.client || createTrackerClient();
    this.eventsTrackUrl = options.eventsTrackUrl || eventsTrackUrl;
    this.location = {
      geohash: null,
      time: null,
      country: null
    };
    this.dispatching = false;
    this.hasMadeInitialDispatch = false;

    if (this.eventsTrackUrl) {
      dispatch(this.eventsTrackUrl);
      this.hasMadeInitialDispatch = true;
    }
  }

  _createClass(Tracker, [{
    key: "setEventsTrackUrl",
    value: function setEventsTrackUrl(eventsTrackUrl) {
      this.eventsTrackUrl = eventsTrackUrl;

      if (!this.hasMadeInitialDispatch) {
        dispatch(this.eventsTrackUrl);
        this.hasMadeInitialDispatch = true;
      }
    }
  }, {
    key: "trackEvent",
    value: function trackEvent(type) {
      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      if (typeof type !== 'number') {
        throw error(new Error('Event type is required'));
      }

      if (this.trackId == null) {
        return;
      }

      var evt = _Object$assign({}, properties, {
        _e: type,
        _v: version,
        _i: uuid(),
        _t: Math.round(new Date().getTime() / 1000),
        _a: this.trackId
      });

      if (this.location.geohash) {
        evt['l.h'] = this.location.geohash;
      }

      if (this.location.time) {
        evt['l.ht'] = this.location.time;
      }

      if (this.location.country) {
        evt['l.c'] = this.location.country;
      }

      pool.push(evt);

      while (pool.length > this.poolLimit) {
        pool.shift();
      }

      dispatch(this.eventsTrackUrl);
      return this;
    }
  }, {
    key: "setLocation",
    value: function setLocation(location) {
      for (var key in location) {
        var value = location[key];

        if (Object.prototype.hasOwnProperty.call(this.location, key)) {
          this.location[key] = value;
        }
      }

      return this;
    }
  }, {
    key: "trackPagedPublicationOpened",
    value: function trackPagedPublicationOpened(properties, version) {
      return this.trackEvent(1, properties, version);
    }
  }, {
    key: "trackPagedPublicationPageDisappeared",
    value: function trackPagedPublicationPageDisappeared(properties, version) {
      return this.trackEvent(2, properties, version);
    }
  }, {
    key: "trackOfferOpened",
    value: function trackOfferOpened(properties, version) {
      return this.trackEvent(3, properties, version);
    }
  }, {
    key: "trackSearched",
    value: function trackSearched(properties, version) {
      return this.trackEvent(5, properties, version);
    }
  }, {
    key: "trackIncitoPublicationOpened",
    value: function trackIncitoPublicationOpened(properties, version) {
      return this.trackEvent(11, properties, version);
    }
  }, {
    key: "createViewToken",
    value: function createViewToken() {
      var _context, _context2;

      for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
        parts[_key] = arguments[_key];
      }

      return btoa(String.fromCharCode.apply(null, _sliceInstanceProperty(_context = md5(_concatInstanceProperty(_context2 = [this.client.id]).call(_context2, parts).join(''), {
        asBytes: true
      })).call(_context, 0, 8)));
    }
  }]);

  return Tracker;
}();

Tracker.prototype.defaultOptions = {
  trackId: null,
  poolLimit: 1000
};
var dispatching = false;
var dispatchLimit = 100;
var dispatchRetryInterval = null;
var dispatch = throttle(function (eventsTrackUrl) {
  if (!pool) {
    console.warn('Tracker: dispatch called with no active event pool.');
    return;
  }

  if (dispatching === true || pool.length === 0) {
    return;
  }

  var events = _sliceInstanceProperty(pool).call(pool, 0, dispatchLimit);

  var nacks = 0;
  dispatching = true;
  fetch(eventsTrackUrl, {
    method: 'post',
    timeout: 1000 * 20,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: _JSON$stringify({
      events: events
    })
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    var _context3;

    dispatching = false;

    if (dispatchRetryInterval) {
      clearInterval(dispatchRetryInterval);
      dispatchRetryInterval = null;
    }

    _forEachInstanceProperty(_context3 = response.events).call(_context3, function (resEvent) {
      if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
        pool = _filterInstanceProperty(pool).call(pool, function (poolEvent) {
          return poolEvent._i !== resEvent.id;
        });
      } else {
        nacks++;
      }
    }); // Keep dispatching until the pool size reaches a sane level.


    if (pool.length >= dispatchLimit && nacks === 0) {
      dispatch(eventsTrackUrl);
    }
  }).catch(function (err) {
    dispatching = false; // Try dispatching again in 20 seconds, if we aren't already trying

    if (!dispatchRetryInterval) {
      console.warn("We're gonna keep trying, but there was an error while dispatching events:", err);
      dispatchRetryInterval = _setInterval(function () {
        return dispatch(eventsTrackUrl);
      }, 20000);
    }
  });
}, 4000);

var EventsKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Tracker: Tracker
});

var formatUnit = function formatUnit(unit) {
  if (unit == null) {
    return 0;
  } else if (typeof unit === 'number') {
    return unit + 'px';
  } else if (typeof unit === 'string') {
    return unit.replace('dp', 'px');
  } else {
    return 0;
  }
};
var escapeAttrValue = function escapeAttrValue(value) {
  if (typeof value === 'string') {
    return value.replace(/"/g, '&quot;');
  }

  return value;
};
var isDefinedStr = function isDefinedStr(value) {
  return typeof value === 'string' && value.length > 0;
};
var escapeHTML = function escapeHTML() {
  var unsafe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};
var getShadow = function getShadow(view) {
  if (isDefinedStr(view.shadow_color)) {
    var dx = typeof view.shadow_dx === 'number' ? view.shadow_dx : 0;
    var dy = typeof view.shadow_dy === 'number' ? view.shadow_dy : 0;
    var radius = typeof view.shadow_radius === 'number' ? view.shadow_radius : 0;
    var color = view.shadow_color;
    return {
      dx: dx,
      dy: dy,
      radius: radius,
      color: color
    };
  }
};
var getTransforms = function getTransforms(view) {
  var transforms = [];
  var translateX = formatUnit(view.transform_translate_x);
  var translateY = formatUnit(view.transform_translate_y);

  if (translateX !== 0) {
    transforms.push("translateX(".concat(translateX, ")"));
  }

  if (translateY !== 0) {
    transforms.push("translateY(".concat(translateY, ")"));
  }

  if (typeof view.transform_rotate === 'number' && view.transform_rotate !== 0) {
    transforms.push("rotate(".concat(view.transform_rotate, "deg)"));
  }

  if (typeof view.transform_scale === 'number' && view.transform_scale !== 1) {
    transforms.push("scale(".concat(view.transform_scale, ")"));
  }

  return transforms;
};
var parseSpans = function parseSpans(text) {
  var spans = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var result = [];

  if (spans.length === 0) {
    result.push({
      text: text
    });
  } else if (spans[0].start > 0) {
    result.push({
      text: _sliceInstanceProperty(text).call(text, 0, spans[0].start)
    });
  }

  _forEachInstanceProperty(spans).call(spans, function (span, i) {
    var startIndex = span.start;
    var endIndex = span.end;
    result.push({
      text: _sliceInstanceProperty(text).call(text, startIndex, endIndex),
      span: span
    });

    if (i === spans.length - 1) {
      if (endIndex < text.length) {
        result.push({
          text: _sliceInstanceProperty(text).call(text, endIndex, text.length)
        });
      }
    } else if (endIndex < spans[i + 1].start) {
      result.push({
        text: _sliceInstanceProperty(text).call(text, endIndex, spans[i + 1].start)
      });
    }
  });

  return result;
};
var getTextShadow = function getTextShadow(view) {
  if (isDefinedStr(view.text_shadow_color)) {
    var dx = typeof view.text_shadow_dx === 'number' ? view.text_shadow_dx : 0;
    var dy = typeof view.text_shadow_dy === 'number' ? view.text_shadow_dy : 0;
    var radius = typeof view.text_shadow_radius === 'number' ? view.text_shadow_radius : 0;
    var color = view.text_shadow_color;
    return {
      dx: dx,
      dy: dy,
      radius: radius,
      color: color
    };
  }
};
var loadFonts = function loadFonts() {
  var fontAssets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var styleEl = document.createElement('style');

  for (var key in fontAssets) {
    var _context, _context2;

    var value = fontAssets[key];

    var urls = _mapInstanceProperty(_context = value.src).call(_context, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          url = _ref2[1];

      return "url('".concat(url, "')");
    }).join(', ');

    styleEl.appendChild(document.createTextNode(_concatInstanceProperty(_context2 = "@font-face { font-family: '".concat(key, "'; font-display: swap; src: ")).call(_context2, urls, "; }")));
  }

  document.head.appendChild(styleEl);
};

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Incito = /*#__PURE__*/function (_MicroEvent) {
  _inherits(Incito, _MicroEvent);

  var _super = _createSuper$9(Incito);

  function Incito(containerEl, _ref) {
    var _this;

    var _ref$incito = _ref.incito,
        incito = _ref$incito === void 0 ? {} : _ref$incito;

    _classCallCheck(this, Incito);

    _this = _super.call(this);
    _this.containerEl = containerEl;
    _this.incito = incito;
    _this.el = document.createElement('div');
    _this.ids = {};
    _this.sections = [];
    _this.canLazyload = 'IntersectionObserver' in window;

    _this.render();

    return _this;
  }

  _createClass(Incito, [{
    key: "render",
    value: function render() {
      var theme = this.incito.theme || {};
      loadFonts(this.incito.font_assets);
      this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
      this.el.className = 'incito';

      if (_Array$isArray(theme.font_family)) {
        var _context;

        this.el.style.fontFamily = _filterInstanceProperty(_context = theme.font_family).call(_context, function (v, i, a) {
          return _indexOfInstanceProperty(a).call(a, v) === i;
        }).join(', ');
      }

      if (isDefinedStr(theme.background_color)) {
        this.el.style.backgroundColor = theme.background_color;
      }

      if (isDefinedStr(theme.text_color)) {
        this.el.style.color = theme.text_color;
      }

      if (isDefinedStr(theme.style)) {
        this.styleEl = document.createElement('style');
        this.styleEl.innerText = theme.style;
        document.head.appendChild(this.styleEl);
      }

      if (typeof theme.line_spacing_multiplier === 'number') {
        this.el.style.lineHeight = theme.line_spacing_multiplier;
      } // By setting the language we help the browser with stuff like hyphenation.


      if (this.incito.locale != null) {
        this.el.setAttribute('lang', this.incito.locale);
      }

      this.el.innerHTML = this.renderHtml(this.incito.root_view);
      this.containerEl.appendChild(this.el);

      if (this.canLazyload) {
        this.enableLazyloading();
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.el.addEventListener('click', function (e) {
        var el = closest(e.target, '.incito__view [data-link]');
        var link = el ? el.dataset.link : null;

        if (isDefinedStr(link)) {
          window.open(link, '_blank');
        }
      });

      if (this.canLazyload) {
        this.observeElements(this.el);
      }

      this.trigger('started');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.lazyObserver) {
        this.lazyObserver.disconnect();
      }

      if (this.videoObserver) {
        this.videoObserver.disconnect();
      }

      this.containerEl.removeChild(this.el);

      if (this.styleEl) {
        this.styleEl.parentNode.removeChild(this.styleEl);
      }

      this.trigger('destroyed');
    }
  }, {
    key: "observeElements",
    value: function observeElements(el) {
      var _context2,
          _this2 = this,
          _context3;

      _forEachInstanceProperty(_context2 = el.querySelectorAll('.incito--lazy')).call(_context2, function (el) {
        _this2.lazyObserver.observe(el);
      });

      _forEachInstanceProperty(_context3 = el.querySelectorAll('.incito__video-view[data-autoplay=true]')).call(_context3, function (el) {
        _this2.videoObserver.observe(el);
      });
    }
  }, {
    key: "loadEl",
    value: function loadEl(el) {
      var _this3 = this;

      if (el.tagName.toLowerCase() === 'video' && !el.dataset.isLazyloaded) {
        var sourceEl = document.createElement('source');
        sourceEl.setAttribute('src', el.dataset.src);
        sourceEl.setAttribute('type', el.dataset.mime);
        el.appendChild(sourceEl);
        el.load();
        el.dataset.isLazyloaded = true;
      } else if (el.classList.contains('incito__incito-embed-view')) {
        var url = el.dataset.src;
        var method = el.dataset.method;
        var body = el.dataset.body;
        fetch(url, {
          method: method || 'get',
          body: body ? JSON.parse(unescape(body)) : null
        }).then(function (res) {
          if (res.status === 200) {
            return res.json();
          }
        }).then(function (res) {
          el.innerHTML = _this3.renderHtml(res);

          _this3.observeElements(el);
        });
      } else if (el.dataset.bg) {
        el.style.backgroundImage = "url(".concat(el.dataset.bg, ")");
      } else if (el.dataset.src) {
        el.src = el.dataset.src;
      }
    }
  }, {
    key: "enableLazyloading",
    value: function enableLazyloading() {
      var _this4 = this;

      this.lazyObserver = new IntersectionObserver(function (entries) {
        _forEachInstanceProperty(entries).call(entries, function (entry) {
          if (entry.isIntersecting) {
            _this4.loadEl(entry.target);

            _this4.lazyObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '500px 0px'
      });
      this.videoObserver = new IntersectionObserver(function (entries) {
        _forEachInstanceProperty(entries).call(entries, function (entry) {
          if (entry.isIntersecting) {
            var autoplayState = entry.target.dataset.autoplayState;

            _this4.loadEl(entry.target);

            _this4.lazyObserver.unobserve(entry.target);

            if (!autoplayState || autoplayState === 'paused') {
              entry.target.dataset.autoplayState = 'playing';
              entry.target.play();
            }
          } else if (!entry.target.paused) {
            entry.target.dataset.autoplayState = 'paused';
            entry.target.pause();
          }
        });
      }, {
        threshold: 0.25
      });
    }
  }, {
    key: "renderView",
    value: function renderView(view) {
      var _context12;

      var tagName = 'div';
      var contents;
      var classNames = ['incito__view'];
      var styles = {};
      var attrs = {};

      if (view.view_name === 'TextView') {
        tagName = 'p';
        classNames.push('incito__text-view');
        var textStyles = (view.text_style || '').split('|');
        var text = view.text;

        if (_Array$isArray(view.spans) && view.spans.length > 0) {
          var parsedText = parseSpans(text, view.spans);
          text = _mapInstanceProperty(parsedText).call(parsedText, function (item) {
            var _item$span, _item$span2;

            var escapedText = escapeHTML(item.text || '');

            if (((_item$span = item.span) === null || _item$span === void 0 ? void 0 : _item$span.name) === 'link' && item.span.url != null) {
              var _context4;

              return _concatInstanceProperty(_context4 = "<a href=\"".concat(encodeURI(item.span.url), "\" rel=\"external\" target=\"_blank\">")).call(_context4, escapedText, "</a>");
            }

            if (((_item$span2 = item.span) === null || _item$span2 === void 0 ? void 0 : _item$span2.name) != null) {
              var _context5;

              var spanName = item.span.name;
              return _concatInstanceProperty(_context5 = "<span data-name=\"".concat(spanName, "\">")).call(_context5, escapedText, "</span>");
            }

            return escapedText;
          });
          text = text.join('');
        } else {
          text = escapeHTML(text);
        }

        if (view.text_prevent_widow) {
          text = text.replace(/&nbsp;([^\s]+)$/, ' $1').replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
        }

        contents = text.replace(/\n/g, '<br>');

        if (_Array$isArray(view.font_family) && view.font_family.length > 0) {
          styles['font-family'] = view.font_family.join(', ');
        }

        if (view.text_size != null) {
          styles['font-size'] = "".concat(view.text_size, "px");
        }

        if (view.line_spacing_multiplier != null) {
          styles['line-height'] = view.line_spacing_multiplier;
        }

        if (view.text_color != null) {
          styles.color = view.text_color;
        }

        if (_indexOfInstanceProperty(textStyles).call(textStyles, 'bold') !== -1) {
          styles['font-weight'] = 'bold';
        }

        if (_indexOfInstanceProperty(textStyles).call(textStyles, 'italic') !== -1) {
          styles['font-style'] = 'italic';
        }

        if (_Array$isArray(view.text_decoration_line)) {
          styles['text-decoration-line'] = view.text_decoration_line.join(' ');
        }

        var textShadow = getTextShadow(view);

        if (isDefinedStr(view.text_shadow)) {
          styles['text-shadow'] = view.text_shadow;
        } else if (textShadow != null) {
          var _context6, _context7, _context8;

          styles['text-shadow'] = _concatInstanceProperty(_context6 = _concatInstanceProperty(_context7 = _concatInstanceProperty(_context8 = "".concat(textShadow.dx, "px ")).call(_context8, textShadow.dy, "px ")).call(_context7, textShadow.radius, "px ")).call(_context6, textShadow.color);
        }

        if (view.text_alignment === 'left') {
          styles['text-align'] = 'left';
        } else if (view.text_alignment === 'center') {
          styles['text-align'] = 'center';
        } else if (view.text_alignment === 'right') {
          styles['text-align'] = 'right';
        }

        if (view.single_line === true || view.max_lines === 1) {
          attrs['data-single-line'] = true;
        } else if (typeof view.max_lines === 'number') {
          styles.display = '-webkit-box';
          styles['-webkit-line-clamp'] = view.max_lines;
          styles['-webkit-box-orient'] = 'vertical';
        }

        if (view.text_all_caps === true) {
          styles['text-transform'] = 'uppercase';
        }
      } else if (view.view_name === 'ImageView') {
        tagName = 'img';
        classNames.push('incito__image-view');
        attrs.onerror = "this.style.display='none'";

        if (isDefinedStr(view.src)) {
          if (this.canLazyload) {
            classNames.push('incito--lazy');
            attrs['data-src'] = view.src;
          } else {
            attrs.src = view.src;
          }
        }

        if (isDefinedStr(view.label)) {
          attrs['alt'] = view.label;
        }
      } else if (view.view_name === 'VideoView') {
        tagName = 'video';
        classNames.push('incito__video-view');
        attrs.muted = '';
        attrs.playsinline = '';
        attrs.preload = 'none';
        attrs.poster = 'noposter';

        if (this.canLazyload) {
          attrs['data-src'] = view.src;
          attrs['data-mime'] = view.mime;

          if (view.autoplay === true) {
            attrs['data-autoplay'] = true;
          }

          if (view.controls === true) {
            attrs['controls'] = '';
          }

          if (view.loop === true) {
            attrs['loop'] = '';
          }
        } else {
          attrs.src = view.src;
          attrs.controls = '';
        }

        if (this.canLazyload) {
          classNames.push('incito--lazy');
        }
      } else if (view.view_name === 'HTMLView') {
        if (isDefinedStr(view.style)) {
          var _context9, _context10;

          _forEachInstanceProperty(_context9 = _trimInstanceProperty(_context10 = view.style).call(_context10).split(';')).call(_context9, function (style) {
            var _style$trim$split = _trimInstanceProperty(style).call(style).split(':'),
                _style$trim$split2 = _slicedToArray(_style$trim$split, 2),
                key = _style$trim$split2[0],
                value = _style$trim$split2[1];

            styles[key] = value;
          });
        }
      } else if (view.view_name === 'VideoEmbedView' || view.view_name === 'HTMLEmbedView') {
        tagName = 'iframe';
        classNames.push('incito__html-embed-view');
        attrs.sandbox = 'allow-scripts allow-same-origin';
        attrs.allowfullscreen = '';

        if (this.canLazyload) {
          classNames.push('incito--lazy');
          attrs['data-src'] = view.src;
        } else {
          attrs.src = view.src;
        }
      } else if (view.view_name === 'IncitoEmbedView') {
        classNames.push('incito__incito-embed-view');

        if (this.canLazyload) {
          classNames.push('incito--lazy');
          attrs['data-src'] = view.src;

          if (view.method === 'get' || view.method === 'post') {
            attrs['data-method'] = view.method;
          }

          if (view.body) {
            attrs['data-body'] = escape(_JSON$stringify(view.body));
          }
        }
      } else if (view.view_name === 'AbsoluteLayout') {
        classNames.push('incito__absolute-layout-view');
      } else if (view.view_name === 'FlexLayout') {
        var flexAlignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
        var flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
        var flexDirectionModes = ['row', 'column'];
        classNames.push('incito__flex-layout-view');
        styles.display = 'flex';

        if (_indexOfInstanceProperty(flexAlignItemModes).call(flexAlignItemModes, view.layout_flex_align_items) !== -1) {
          styles['align-items'] = view.layout_flex_align_items;
          styles['ms-align-items'] = view.layout_flex_align_items;
        }

        if (_indexOfInstanceProperty(flexJustifyModes).call(flexJustifyModes, view.layout_flex_justify_content) !== -1) {
          styles['justify-content'] = view.layout_flex_justify_content;
          styles['ms-flex-pack'] = view.layout_flex_justify_content;
        }

        if (_indexOfInstanceProperty(flexDirectionModes).call(flexDirectionModes, view.layout_flex_direction) !== -1) {
          styles['flex-direction'] = view.layout_flex_direction;
          styles['ms-flex-direction'] = view.layout_flex_direction;
        }
      }

      if (isDefinedStr(view.id)) {
        attrs['data-id'] = escapeAttrValue(view.id);
      }

      if (isDefinedStr(view.role)) {
        attrs['data-role'] = escapeAttrValue(view.role);
      }

      if (isDefinedStr(view.accessibility_label)) {
        attrs['aria-label'] = escapeAttrValue(view.accessibility_label);
      }

      if (view.accessibility_hidden === true) {
        attrs['aria-hidden'] = true;
      }

      if (_Array$isArray(view.feature_labels)) {
        var _context11;

        var featureLabels = _filterInstanceProperty(_context11 = view.feature_labels).call(_context11, function (featureLabel) {
          return /^[a-z_-]{1,14}$/.test(featureLabel);
        });

        if (featureLabels.length) {
          attrs['data-feature-labels'] = featureLabels.join(',');
        }
      }

      if (isDefinedStr(view.title)) {
        attrs['title'] = escapeAttrValue(view.title);
      }

      if (view.gravity) {
        attrs['data-gravity'] = view.gravity;
      }

      if (isDefinedStr(view.link)) {
        attrs['data-link'] = view.link;
      }

      if (view.layout_width === 'match_parent') {
        styles.width = '100%';
      } else if (view.layout_width === 'wrap_content') {
        styles.display = 'inline-block';
      } else if (view.layout_width != null) {
        styles.width = formatUnit(view.layout_width);
      }

      if (view.layout_height === 'match_parent') {
        styles.height = '100%';
      } else if (view.layout_height === 'wrap_content') {
        styles.height = 'auto';
      } else if (view.layout_height != null) {
        styles.height = formatUnit(view.layout_height);
      }

      if (view.min_width != null) {
        styles['min-width'] = formatUnit(view.min_width);
      }

      if (view.max_width != null) {
        styles['max-width'] = formatUnit(view.max_width);
      }

      if (view.min_height != null) {
        styles['min-height'] = formatUnit(view.min_height);
      }

      if (view.max_height != null) {
        styles['max-height'] = formatUnit(view.max_height);
      }

      if (view.layout_top != null) {
        styles.top = formatUnit(view.layout_top);
      }

      if (view.layout_left != null) {
        styles.left = formatUnit(view.layout_left);
      }

      if (view.layout_right != null) {
        styles.right = formatUnit(view.layout_right);
      }

      if (view.layout_bottom != null) {
        styles.bottom = formatUnit(view.layout_bottom);
      }

      if (view.background_color) {
        styles['background-color'] = view.background_color;
      }

      if (isDefinedStr(view.background_image)) {
        if (this.canLazyload) {
          classNames.push('incito--lazy');
          attrs['data-bg'] = view.background_image;
        } else {
          styles['background-image'] = "url(".concat(view.background_image, ")");
        }
      }

      if (_indexOfInstanceProperty(_context12 = ['repeat_x', 'repeat_y', 'repeat']).call(_context12, view.background_tile_mode) !== -1) {
        styles['background-repeat'] = view.background_tile_mode.replace('_', '-');
      }

      if (isDefinedStr(view.background_image_position)) {
        styles['background-position'] = view.background_image_position.replace('_', ' ');
      }

      if (view.background_image_scale_type === 'center_crop') {
        styles['background-size'] = 'cover';
      } else if (view.background_image_scale_type === 'center_inside') {
        styles['background-size'] = 'contain';
      }

      if (view.layout_margin != null) {
        styles.margin = formatUnit(view.layout_margin);
      }

      if (view.layout_margin_top != null) {
        styles['margin-top'] = formatUnit(view.layout_margin_top);
      }

      if (view.layout_margin_left != null) {
        styles['margin-left'] = formatUnit(view.layout_margin_left);
      }

      if (view.layout_margin_right != null) {
        styles['margin-right'] = formatUnit(view.layout_margin_right);
      }

      if (view.layout_margin_bottom != null) {
        styles['margin-bottom'] = formatUnit(view.layout_margin_bottom);
      }

      if (view.padding != null) {
        styles.padding = formatUnit(view.padding);
      }

      if (view.padding_top != null) {
        styles['padding-top'] = formatUnit(view.padding_top);
      }

      if (view.padding_left != null) {
        styles['padding-left'] = formatUnit(view.padding_left);
      }

      if (view.padding_right != null) {
        styles['padding-right'] = formatUnit(view.padding_right);
      }

      if (view.padding_bottom != null) {
        styles['padding-bottom'] = formatUnit(view.padding_bottom);
      }

      if (view.corner_radius != null) {
        styles['border-radius'] = formatUnit(view.corner_radius);
      }

      if (view.corner_top_left_radius != null) {
        styles['border-top-left-radius'] = formatUnit(view.corner_top_left_radius);
      }

      if (view.corner_top_right_radius != null) {
        styles['border-top-right-radius'] = formatUnit(view.corner_top_right_radius);
      }

      if (view.corner_bottom_left_radius != null) {
        styles['border-bottom-left-radius'] = formatUnit(view.corner_bottom_left_radius);
      }

      if (view.corner_bottom_right_radius != null) {
        styles['border-bottom-right-radius'] = formatUnit(view.corner_bottom_right_radius);
      } // Clip children.


      if (view.clip_children === false) {
        styles['overflow'] = 'visible';
      }

      var shadow = getShadow(view);

      if (shadow != null) {
        var _context13, _context14, _context15;

        styles['box-shadow'] = _concatInstanceProperty(_context13 = _concatInstanceProperty(_context14 = _concatInstanceProperty(_context15 = "".concat(shadow.dx, "px ")).call(_context15, shadow.dy, "px ")).call(_context14, shadow.radius, "px ")).call(_context13, shadow.color);
      }

      var strokeStyles = ['solid', 'dotted', 'dashed'];

      if (view.stroke_width != null) {
        styles['border-width'] = formatUnit(view.stroke_width);
      }

      if (view.stroke_color != null) {
        styles['border-color'] = view.stroke_color;
      }

      if (_indexOfInstanceProperty(strokeStyles).call(strokeStyles, view.stroke_style) !== -1) {
        styles['border-style'] = view.stroke_style;
      }

      if (view.stroke_top_width != null) {
        styles['border-top-width'] = formatUnit(view.stroke_top_width);
      }

      if (view.stroke_top_color != null) {
        styles['border-top-color'] = view.stroke_top_color;
      }

      if (view.stroke_left_width != null) {
        styles['border-left-width'] = formatUnit(view.stroke_left_width);
      }

      if (view.stroke_left_color != null) {
        styles['border-left-color'] = view.stroke_left_color;
      }

      if (view.stroke_right_width != null) {
        styles['border-right-width'] = formatUnit(view.stroke_right_width);
      }

      if (view.stroke_right_color != null) {
        styles['border-right-color'] = view.stroke_right_color;
      }

      if (view.stroke_bottom_width != null) {
        styles['border-bottom-width'] = formatUnit(view.stroke_bottom_width);
      }

      if (view.stroke_bottom_color != null) {
        styles['border-bottom-color'] = view.stroke_bottom_color;
      }

      if (typeof view.layout_flex_shrink === 'number') {
        styles['flex-shrink'] = view.layout_flex_shrink;
        styles['ms-flex-shrink'] = view.layout_flex_shrink;
      }

      if (typeof view.layout_flex_grow === 'number') {
        styles['flex-grow'] = view.layout_flex_grow;
        styles['ms-flex-grow'] = view.layout_flex_grow;
      }

      if (view.layout_flex_basis != null) {
        styles['flex-basis'] = formatUnit(view.layout_flex_basis);
        styles['ms-flex-basis'] = formatUnit(view.layout_flex_basis);
      }

      var transforms = getTransforms(view);

      if (transforms.length > 0) {
        styles.transform = transforms.join(' ');
      } // Transform origin.


      if (_Array$isArray(view.transform_origin) && view.transform_origin.length === 2) {
        styles['transform-origin'] = [formatUnit(view.transform_origin[0]), formatUnit(view.transform_origin[1])].join(' ');
      }

      return {
        tagName: tagName,
        contents: contents,
        classNames: classNames,
        styles: styles,
        attrs: attrs
      };
    }
  }, {
    key: "renderHtml",
    value: function renderHtml(rootView) {
      var _this5 = this;

      var html = '';

      var iter = function iter(view) {
        try {
          var _this5$renderView = _this5.renderView(view),
              tagName = _this5$renderView.tagName,
              contents = _this5$renderView.contents,
              classNames = _this5$renderView.classNames,
              styles = _this5$renderView.styles,
              attrs = _this5$renderView.attrs;

          if (view.id != null && typeof view.meta === 'object') {
            _this5.ids[view.id] = view.meta;
          }

          if (view.role === 'section') {
            _this5.sections.push({
              id: view.id,
              meta: view.meta
            });
          }

          html += "<".concat(tagName);
          html += " class=\"".concat(classNames.join(' '), "\"");

          for (var key in attrs) {
            var _context16;

            var value = attrs[key];
            html += _concatInstanceProperty(_context16 = " ".concat(key, "=\"")).call(_context16, value, "\"");
          }

          html += ' style="';

          for (var _key in styles) {
            var _context17;

            var _value = styles[_key];
            html += _concatInstanceProperty(_context17 = "".concat(_key, ":")).call(_context17, _value, "; ");
          }

          html += '"';

          for (var _key2 in attrs) {
            var _context18;

            var _value2 = attrs[_key2];
            html += _concatInstanceProperty(_context18 = " ".concat(_key2, "=\"")).call(_context18, _value2, "\"");
          }

          html += '>';

          if (_Array$isArray(view.child_views)) {
            var _context19;

            _forEachInstanceProperty(_context19 = view.child_views).call(_context19, function (childView) {
              iter(childView);
            });
          }

          if (contents) {
            html += contents;
          }

          html += "</".concat(tagName, ">");
        } catch (error) {}
      };

      iter(rootView);
      return html;
    }
  }]);

  return Incito;
}(MicroEvent);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var IncitoPublicationEventTracking = /*#__PURE__*/function (_MicroEvent) {
  _inherits(IncitoPublicationEventTracking, _MicroEvent);

  var _super = _createSuper$8(IncitoPublicationEventTracking);

  function IncitoPublicationEventTracking(eventTracker, details) {
    var _this;

    _classCallCheck(this, IncitoPublicationEventTracking);

    _this = _super.call(this);
    _this.eventTracker = eventTracker;
    _this.details = details;
    return _this;
  }

  _createClass(IncitoPublicationEventTracking, [{
    key: "trackOpened",
    value: function trackOpened() {
      var _context;

      if (this.eventTracker == null || this.details == null) {
        return this;
      }

      this.eventTracker.trackIncitoPublicationOpened({
        'ip.paged': _indexOfInstanceProperty(_context = this.details.types).call(_context, 'paged') > -1,
        'ip.id': this.details.id,
        vt: this.eventTracker.createViewToken(this.details.id)
      });
      return this;
    }
  }]);

  return IncitoPublicationEventTracking;
}(MicroEvent);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Viewer$1 = /*#__PURE__*/function (_MicroEvent) {
  _inherits(Viewer, _MicroEvent);

  var _super = _createSuper$7(Viewer);

  function Viewer(el) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    _this = _super.call(this);
    _this.el = el;
    _this.options = options;
    _this.incito = new Incito(_this.el, {
      incito: _this.options.incito
    });
    _this._eventTracking = new IncitoPublicationEventTracking(_this.options.eventTracker, _this.options.details);
    return _this;
  }

  _createClass(Viewer, [{
    key: "start",
    value: function start() {
      this.incito.start();
      this.el.classList.add('sgn-incito--started');

      this._eventTracking.trackOpened();

      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.incito.destroy();
    }
  }]);

  return Viewer;
}(MicroEvent);

_defineProperty(Viewer$1, "Incito", Incito);

var Controls = /*#__PURE__*/function () {
  function Controls(viewer) {
    var _context;

    _classCallCheck(this, Controls);

    this.scroll = _bindInstanceProperty(_context = this.scroll).call(_context, this);
    this.viewer = viewer;
    this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');

    if (this.progressEl) {
      this.scroll();
      window.addEventListener('scroll', this.scroll, false);
    }
  }

  _createClass(Controls, [{
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('scroll', this.scroll, false);
    }
  }, {
    key: "scroll",
    value: function scroll() {
      var progress = Math.round(window.pageYOffset / (document.body.scrollHeight - window.innerHeight) * 100);
      this.progressEl.textContent = "".concat(progress, " %");
      this.viewer.trigger('progress', {
        progress: progress
      });
    }
  }]);

  return Controls;
}();

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { var _context6; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = _sliceInstanceProperty(_context6 = Object.prototype.toString.call(o)).call(_context6, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Bootstrapper$1 = /*#__PURE__*/function () {
  function Bootstrapper() {
    var _context;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Bootstrapper);

    this.fetchDetails = _bindInstanceProperty(_context = this.fetchDetails).call(_context, this);
    this.options = options;
    this.deviceCategory = this.getDeviceCategory();
    this.pixelRatio = this.getPixelRatio();
    this.pointer = this.getPointer();
    this.orientation = this.getOrientation();
    this.time = this.getTime();
    this.locale = this.getLocale();
    this.maxWidth = this.getMaxWidth();
    this.featureLabels = this.getFeatureLabels();
    this.versionsSupported = ['1.0.0'];
  }

  _createClass(Bootstrapper, [{
    key: "getDeviceCategory",
    value: function getDeviceCategory$1() {
      return getDeviceCategory();
    }
  }, {
    key: "getPixelRatio",
    value: function getPixelRatio() {
      return window.devicePixelRatio || 1;
    }
  }, {
    key: "getPointer",
    value: function getPointer$1() {
      return getPointer();
    }
  }, {
    key: "getOrientation",
    value: function getOrientation$1() {
      var orientation = getOrientation(screen.width, screen.height);

      if (orientation === 'quadratic') {
        orientation = 'horizontal';
      }

      return orientation;
    }
  }, {
    key: "getTime",
    value: function getTime() {
      return new Date().toISOString();
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      var localeChain = [];
      var locale = null;

      if (_Array$isArray(navigator.languages) && navigator.languages.length > 0) {
        localeChain = _concatInstanceProperty(localeChain).call(localeChain, navigator.languages);
      } else if (typeof navigator.language === 'string' && navigator.language.length > 0) {
        localeChain.push(navigator.language);
      } else if (typeof navigator.browserLanguage === 'string' && navigator.browserLanguage.length > 0) {
        localeChain.push(navigator.browserLanguage);
      }

      localeChain.push('en_US');

      var _iterator = _createForOfIteratorHelper$1(localeChain),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var prefLocale = _step.value;

          if (prefLocale == null) {
            continue;
          }

          prefLocale = prefLocale.replace('-', '_');

          if (/[a-z][a-z]_[A-Z][A-Z]/g.test(prefLocale)) {
            locale = prefLocale;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return locale;
    }
  }, {
    key: "getMaxWidth",
    value: function getMaxWidth() {
      if (Math.abs(window.orientation) === 90) {
        return Math.min(this.options.el.offsetWidth, screen.width);
      } else {
        return this.options.el.offsetWidth;
      }
    }
  }, {
    key: "getFeatureLabels",
    value: function getFeatureLabels() {
      var featureLabels = get('incito-feature-labels');

      if (_Array$isArray(featureLabels) === false) {
        featureLabels = [];
      }

      return featureLabels;
    }
  }, {
    key: "anonymizeFeatureLabels",
    value: function anonymizeFeatureLabels() {
      var _context2, _context3;

      var count = this.featureLabels.length;

      var vector = _reduceInstanceProperty(_context2 = this.featureLabels).call(_context2, function (acc, cur) {
        if (!acc[cur]) {
          acc[cur] = {
            key: cur,
            value: 0
          };
        }

        acc[cur].value++;
        return acc;
      }, {});

      return _mapInstanceProperty(_context3 = _Object$values(vector)).call(_context3, function (featureLabel) {
        return {
          key: featureLabel.key,
          value: Math.round(featureLabel.value / count * 100) / 100
        };
      });
    }
  }, {
    key: "fetch",
    value: function fetch(callback) {
      var _this = this;

      this.fetchDetails(this.options.id, function (err, details) {
        if (err != null) {
          return callback(err);
        }

        _this.fetchIncito(details.incito_publication_id, function (err1, incito) {
          if (err1 != null) {
            return callback(err1);
          }

          callback(null, {
            details: details,
            incito: incito
          });
        });
      });
    }
  }, {
    key: "fetchDetails",
    value: function fetchDetails(id, callback) {
      request$1({
        url: "/v2/catalogs/".concat(id)
      }, callback);
    }
  }, {
    key: "fetchIncito",
    value: function fetchIncito(id, callback) {
      request$1({
        url: '/v4/rpc/generate_incito_from_publication',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: _JSON$stringify({
          id: id,
          device_category: this.deviceCategory,
          pointer: this.pointer,
          orientation: this.orientation,
          pixel_ratio: this.pixelRatio,
          max_width: this.maxWidth,
          versions_supported: this.versionsSupported,
          locale_code: this.locale,
          time: this.time,
          feature_labels: this.anonymizeFeatureLabels(this.featureLabels)
        })
      }, callback);
    }
  }, {
    key: "createViewer",
    value: function createViewer(data) {
      var _context4;

      var self = this;

      if (data.incito == null) {
        throw error(new Error(), 'You need to supply valid Incito to create a viewer');
      }

      var viewer = new Viewer$1(this.options.el, {
        id: this.options.id,
        details: data.details,
        incito: data.incito,
        eventTracker: this.options.eventTracker
      });
      var controls = new Controls(viewer);

      _bindInstanceProperty(_context4 = viewer.incito).call(_context4, 'destroy', function () {
        controls.destroy();
      }); // Persist clicks on feature labels for later anonymization.


      gator(viewer.el).on('click', '.incito__view[data-feature-labels]', function () {
        var _context5;

        var featureLabels = this.getAttribute('data-feature-labels').split(',');
        self.featureLabels = _concatInstanceProperty(_context5 = self.featureLabels).call(_context5, featureLabels);

        while (self.featureLabels.length > 1000) {
          self.featureLabels.shift();
        }

        set('incito-feature-labels', self.featureLabels);
      });
      return viewer;
    }
  }]);

  return Bootstrapper;
}();

var IncitoPublicationKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Viewer: Viewer$1,
    Bootstrapper: Bootstrapper$1
});

var pairs = {
  'paged_publication.hotspot_picker.header': 'Which offer did you mean?',
  'incito_publication.product_picker.header': 'Which product?'
};
function t(key, view) {
  var _pairs$key;

  var template = (_pairs$key = pairs[key]) !== null && _pairs$key !== void 0 ? _pairs$key : '';
  return Mustache.render(template, view);
}
function update(translations) {
  for (var key in translations) {
    var value = translations[key];
    pairs[key] = value;
  }
}

var translations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    t: t,
    update: update
});

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PagedPublicationControls = /*#__PURE__*/function (_MicroEvent) {
  _inherits(PagedPublicationControls, _MicroEvent);

  var _super = _createSuper$6(PagedPublicationControls);

  function PagedPublicationControls(el) {
    var _context, _context2, _context3, _context4, _context5, _context6, _this$els$prevControl, _this$els$nextControl, _this$els$close;

    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PagedPublicationControls);

    _this = _super.call(this);
    _this.destroy = _bindInstanceProperty(_context = _this.destroy).call(_context, _assertThisInitialized(_this));
    _this.beforeNavigation = _bindInstanceProperty(_context2 = _this.beforeNavigation).call(_context2, _assertThisInitialized(_this));
    _this.prevClicked = _bindInstanceProperty(_context3 = _this.prevClicked).call(_context3, _assertThisInitialized(_this));
    _this.nextClicked = _bindInstanceProperty(_context4 = _this.nextClicked).call(_context4, _assertThisInitialized(_this));
    _this.closeClicked = _bindInstanceProperty(_context5 = _this.closeClicked).call(_context5, _assertThisInitialized(_this));
    _this.keyDown = _bindInstanceProperty(_context6 = _this.keyDown).call(_context6, _assertThisInitialized(_this));
    _this.options = options;
    _this.els = {
      root: el,
      progress: el.querySelector('.sgn-pp__progress'),
      progressBar: el.querySelector('.sgn-pp-progress__bar'),
      progressLabel: el.querySelector('.sgn-pp__progress-label'),
      prevControl: el.querySelector('.sgn-pp__control[data-direction=prev]'),
      nextControl: el.querySelector('.sgn-pp__control[data-direction=next]'),
      close: el.querySelector('.sgn-pp--close')
    };
    _this.keyDownHandler = throttle(_this.keyDown, 150, _assertThisInitialized(_this));

    if (_this.options.keyboard === true) {
      _this.els.root.addEventListener('keydown', _this.keyDownHandler, false);
    }

    (_this$els$prevControl = _this.els.prevControl) === null || _this$els$prevControl === void 0 ? void 0 : _this$els$prevControl.addEventListener('mousedown', _this.prevClicked, false);
    (_this$els$nextControl = _this.els.nextControl) === null || _this$els$nextControl === void 0 ? void 0 : _this$els$nextControl.addEventListener('mousedown', _this.nextClicked, false);
    (_this$els$close = _this.els.close) === null || _this$els$close === void 0 ? void 0 : _this$els$close.addEventListener('mousedown', _this.closeClicked, false);

    _bindInstanceProperty(_this).call(_this, 'beforeNavigation', _this.beforeNavigation);

    _bindInstanceProperty(_this).call(_this, 'destroyed', _this.destroy);

    return _this;
  }

  _createClass(PagedPublicationControls, [{
    key: "destroy",
    value: function destroy() {
      var _this$els$prevControl2, _this$els$nextControl2, _this$els$close2;

      if (this.options.keyboard === true) {
        this.els.root.removeEventListener('keydown', this.keyDownHandler, false);
      }

      (_this$els$prevControl2 = this.els.prevControl) === null || _this$els$prevControl2 === void 0 ? void 0 : _this$els$prevControl2.removeEventListener('mousedown', this.prevClicked, false);
      (_this$els$nextControl2 = this.els.nextControl) === null || _this$els$nextControl2 === void 0 ? void 0 : _this$els$nextControl2.removeEventListener('mousedown', this.nextClicked, false);
      (_this$els$close2 = this.els.close) === null || _this$els$close2 === void 0 ? void 0 : _this$els$close2.removeEventListener('mousedown', this.closeClicked, false);
    }
  }, {
    key: "beforeNavigation",
    value: function beforeNavigation(e) {
      var showProgress = typeof e.progressLabel === 'string' && e.progressLabel.length > 0;
      var visibilityClassName = 'sgn-pp--hidden';

      if (this.els.progress && this.els.progressBar) {
        this.els.progressBar.style.width = "".concat(e.progress, "%");

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
  }, {
    key: "prevClicked",
    value: function prevClicked(e) {
      e.preventDefault();
      this.trigger('prev');
    }
  }, {
    key: "nextClicked",
    value: function nextClicked(e) {
      e.preventDefault();
      this.trigger('next');
    }
  }, {
    key: "closeClicked",
    value: function closeClicked(e) {
      e.preventDefault();
      this.trigger('close');
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      var keyCode = e.keyCode;

      if (ARROW_LEFT === keyCode) {
        this.trigger('prev', {
          duration: 0
        });
      } else if (ARROW_RIGHT === keyCode || SPACE === keyCode) {
        this.trigger('next', {
          duration: 0
        });
      } else if (NUMBER_ONE === keyCode) {
        this.trigger('first', {
          duration: 0
        });
      }
    }
  }]);

  return PagedPublicationControls;
}(MicroEvent);

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

      for (var _i = 0, _Array$from$1 = _Array$from(this.getPageEls()); _i < _Array$from$1.length; _i++) {
        var pageEl = _Array$from$1[_i];
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

function ownKeys$1(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context20; _forEachInstanceProperty(_context20 = ownKeys$1(Object(source), true)).call(_context20, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context21; _forEachInstanceProperty(_context21 = ownKeys$1(Object(source))).call(_context21, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
  this.options = _objectSpread$1(_objectSpread$1({}, this.defaults), options);
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
    var inputDataClone = _objectSpread$1({}, inputData); // is is enabled and allow recognizing?


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

  this.options = _objectSpread$1(_objectSpread$1({}, Hammer.defaults), options);
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

      for (var _i = 0, _Array$from$1 = _Array$from(els); _i < _Array$from$1.length; _i++) {
        var _el$getAttribute, _el$getAttribute2, _el$getAttribute3;

        var el = _Array$from$1[_i];
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

      for (var _i2 = 0, _Array$from3 = _Array$from(overlayEls); _i2 < _Array$from3.length; _i2++) {
        var overlayEl = _Array$from3[_i2];

        if (this.isCoordinateInsideElement(x, y, overlayEl)) {
          info.overlayEls.push(overlayEl);
        }
      }

      for (var _i3 = 0, _Array$from4 = _Array$from(pageEls); _i3 < _Array$from4.length; _i3++) {
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

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PagedPublicationPageSpread = /*#__PURE__*/function (_MicroEvent) {
  _inherits(PagedPublicationPageSpread, _MicroEvent);

  var _super = _createSuper$5(PagedPublicationPageSpread);

  function PagedPublicationPageSpread() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PagedPublicationPageSpread);

    _this = _super.call(this);
    _this.options = options;
    _this.contentsRendered = false;
    _this.hotspotsRendered = false;
    _this.el = _this.renderEl();
    return _this;
  }

  _createClass(PagedPublicationPageSpread, [{
    key: "getId",
    value: function getId() {
      return this.options.id;
    }
  }, {
    key: "getEl",
    value: function getEl() {
      return this.el;
    }
  }, {
    key: "getPages",
    value: function getPages() {
      return this.options.pages;
    }
  }, {
    key: "renderEl",
    value: function renderEl() {
      var _context;

      var el = document.createElement('div');

      var pageIds = _mapInstanceProperty(_context = this.getPages()).call(_context, function (page) {
        return page.id;
      });

      el.className = 'verso__page-spread sgn-pp__page-spread';
      el.setAttribute('data-id', this.getId());
      el.setAttribute('data-type', 'page');
      el.setAttribute('data-width', this.options.width);
      el.setAttribute('data-page-ids', pageIds.join(','));
      el.setAttribute('data-max-zoom-scale', this.options.maxZoomScale);
      el.setAttribute('data-zoomable', false);
      return el;
    }
  }, {
    key: "renderContents",
    value: function renderContents() {
      var _this2 = this;

      var id = this.getId();
      var el = this.getEl();
      var pages = this.getPages();
      var pageCount = pages.length;
      var imageLoads = 0;
      var maxPageWidth = el.clientWidth * (window.devicePixelRatio || 1);

      if (this.options.pageMode === 'double') {
        maxPageWidth = maxPageWidth / 2;
      }

      var useLargeImage = maxPageWidth > 700;

      _forEachInstanceProperty(pages).call(pages, function (page, i) {
        var image = page.images.medium;

        if (useLargeImage) {
          image = page.images.large;
        }

        var pageEl = document.createElement('div');
        var loaderEl = document.createElement('div');
        pageEl.className = 'sgn-pp__page verso__page';

        if (page.id != null) {
          pageEl.setAttribute('data-id', page.id);
        }

        if (pageCount === 2) {
          pageEl.className += i === 0 ? ' verso-page--verso' : ' verso-page--recto';
        }

        pageEl.appendChild(loaderEl);
        el.appendChild(pageEl);
        loaderEl.className = 'sgn-pp-page__loader';
        loaderEl.innerHTML = "<span>".concat(page.label, "</span>");
        loadImage(image, function (err, width, height) {
          if (err == null) {
            var isComplete = ++imageLoads === pageCount;
            pageEl.style.backgroundImage = "url(".concat(image, ")");
            pageEl.setAttribute('data-width', width);
            pageEl.setAttribute('data-height', height);
            pageEl.innerHTML = '&nbsp;';

            if (isComplete) {
              el.setAttribute('data-zoomable', true);
            }

            _this2.trigger('pageLoaded', {
              pageSpreadId: id,
              page: page
            });

            if (isComplete) {
              _this2.trigger('pagesLoaded', {
                pageSpreadId: id,
                pages: pages
              });
            }
          } else {
            loaderEl.innerHTML = '<span>!</span>';
          }
        });
      });

      this.contentsRendered = true;
      return this;
    }
  }, {
    key: "clearContents",
    value: function clearContents() {
      this.el.innerHTML = '';
      this.contentsRendered = false;
      return this;
    }
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      var _this3 = this;

      var pageEls = _sliceInstanceProperty([]).call(this.el.querySelectorAll('.sgn-pp__page'));

      var pages = this.getPages();

      _forEachInstanceProperty(pageEls).call(pageEls, function (pageEl) {
        var id = pageEl.getAttribute('data-id');

        var page = _findInstanceProperty(pages).call(pages, function (page) {
          return page.id === id;
        });

        var image = page.images.large;
        loadImage(image, function (err) {
          if (err == null && _this3.el.getAttribute('data-active') === 'true') {
            pageEl.setAttribute('data-image', pageEl.style.backgroundImage);
            pageEl.style.backgroundImage = "url(".concat(image, ")");
          }
        });
      });
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      var pageEls = _Array$from(this.el.querySelectorAll('.sgn-pp__page[data-image]'));

      _forEachInstanceProperty(pageEls).call(pageEls, function (pageEl) {
        pageEl.style.backgroundImage = pageEl.getAttribute('data-image');
        pageEl.removeAttribute('data-image');
      });
    }
  }]);

  return PagedPublicationPageSpread;
}(MicroEvent);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PagedPublicationPageSpreads = /*#__PURE__*/function (_MicroEvent) {
  _inherits(PagedPublicationPageSpreads, _MicroEvent);

  var _super = _createSuper$4(PagedPublicationPageSpreads);

  function PagedPublicationPageSpreads(options) {
    var _this;

    _classCallCheck(this, PagedPublicationPageSpreads);

    _this = _super.call(this);
    _this.options = options;
    _this.collection = [];
    _this.ids = {};
    return _this;
  }

  _createClass(PagedPublicationPageSpreads, [{
    key: "get",
    value: function get(id) {
      return this.ids[id];
    }
  }, {
    key: "getFrag",
    value: function getFrag() {
      var _context;

      var frag = document.createDocumentFragment();

      _forEachInstanceProperty(_context = this.collection).call(_context, function (pageSpread) {
        return frag.appendChild(pageSpread.el);
      });

      return frag;
    }
  }, {
    key: "update",
    value: function update() {
      var _context2,
          _this2 = this;

      var pageMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'single';
      var pageSpreads = [];
      var ids = {};

      var pages = _sliceInstanceProperty(_context2 = this.options.pages).call(_context2);

      var _this$options = this.options,
          width = _this$options.width,
          maxZoomScale = _this$options.maxZoomScale;

      if (pageMode === 'single') {
        _forEachInstanceProperty(pages).call(pages, function (page) {
          return pageSpreads.push([page]);
        });
      } else {
        var firstPage = pages.shift();
        var lastPage = pages.length % 2 === 1 ? pages.pop() : null;
        var midstPageSpreads = chunk(pages, 2);

        if (firstPage) {
          pageSpreads.push([firstPage]);
        }

        _forEachInstanceProperty(midstPageSpreads).call(midstPageSpreads, function (midstPages) {
          return pageSpreads.push(_mapInstanceProperty(midstPages).call(midstPages, function (page) {
            return page;
          }));
        });

        if (lastPage) {
          pageSpreads.push([lastPage]);
        }
      }

      this.collection = _mapInstanceProperty(pageSpreads).call(pageSpreads, function (pages, i) {
        var _context3;

        var id = _concatInstanceProperty(_context3 = "".concat(pageMode, "-")).call(_context3, i);

        var pageSpread = new PagedPublicationPageSpread({
          width: width,
          pageMode: pageMode,
          maxZoomScale: maxZoomScale,
          pages: pages,
          id: id
        });

        _bindInstanceProperty(pageSpread).call(pageSpread, 'pageLoaded', function (e) {
          return _this2.trigger('pageLoaded', e);
        });

        _bindInstanceProperty(pageSpread).call(pageSpread, 'pagesLoaded', function (e) {
          return _this2.trigger('pagesLoaded', e);
        });

        ids[id] = pageSpread;
        return pageSpread;
      });
      this.ids = ids;
      return this;
    }
  }]);

  return PagedPublicationPageSpreads;
}(MicroEvent);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PagedPublicationCore = /*#__PURE__*/function (_MicroEvent) {
  _inherits(PagedPublicationCore, _MicroEvent);

  var _super = _createSuper$3(PagedPublicationCore);

  function PagedPublicationCore(el) {
    var _context, _context2, _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _context15, _context16, _context17, _context18, _context19;

    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PagedPublicationCore);

    _this = _super.call(this);
    _this.beforeNavigation = _bindInstanceProperty(_context = _this.beforeNavigation).call(_context, _assertThisInitialized(_this));
    _this.afterNavigation = _bindInstanceProperty(_context2 = _this.afterNavigation).call(_context2, _assertThisInitialized(_this));
    _this.attemptedNavigation = _bindInstanceProperty(_context3 = _this.attemptedNavigation).call(_context3, _assertThisInitialized(_this));
    _this.clicked = _bindInstanceProperty(_context4 = _this.clicked).call(_context4, _assertThisInitialized(_this));
    _this.doubleClicked = _bindInstanceProperty(_context5 = _this.doubleClicked).call(_context5, _assertThisInitialized(_this));
    _this.pressed = _bindInstanceProperty(_context6 = _this.pressed).call(_context6, _assertThisInitialized(_this));
    _this.contextmenu = _bindInstanceProperty(_context7 = _this.contextmenu).call(_context7, _assertThisInitialized(_this));
    _this.panStart = _bindInstanceProperty(_context8 = _this.panStart).call(_context8, _assertThisInitialized(_this));
    _this.panEnd = _bindInstanceProperty(_context9 = _this.panEnd).call(_context9, _assertThisInitialized(_this));
    _this.zoomedIn = _bindInstanceProperty(_context10 = _this.zoomedIn).call(_context10, _assertThisInitialized(_this));
    _this.zoomedOut = _bindInstanceProperty(_context11 = _this.zoomedOut).call(_context11, _assertThisInitialized(_this));
    _this.resize = _bindInstanceProperty(_context12 = _this.resize).call(_context12, _assertThisInitialized(_this));
    _this.unload = _bindInstanceProperty(_context13 = _this.unload).call(_context13, _assertThisInitialized(_this));
    _this.options = _this.makeOptions(options, _this.defaults);
    _this.pageId = _this.getOption('pageId');
    _this.els = {
      root: el,
      pages: el.querySelector('.sgn-pp__pages'),
      verso: el.querySelector('.verso')
    };
    _this.pageMode = _this.getPageMode();
    _this.pageSpreads = new PagedPublicationPageSpreads({
      pages: _this.getOption('pages'),
      maxZoomScale: _this.getOption('pageSpreadMaxZoomScale'),
      width: _this.getOption('pageSpreadWidth')
    });

    _bindInstanceProperty(_context14 = _this.pageSpreads).call(_context14, 'pageLoaded', _bindInstanceProperty(_context15 = _this.pageLoaded).call(_context15, _assertThisInitialized(_this)));

    _bindInstanceProperty(_context16 = _this.pageSpreads).call(_context16, 'pagesLoaded', _bindInstanceProperty(_context17 = _this.pagesLoaded).call(_context17, _assertThisInitialized(_this)));

    _this.setColor(_this.getOption('color')); // It's important to insert the page spreads before instantiating Verso.


    _this.els.pages.parentNode.insertBefore(_this.pageSpreads.update(_this.pageMode).getFrag(), _this.els.pages);

    _this.verso = _this.createVerso();

    _bindInstanceProperty(_this).call(_this, 'started', _bindInstanceProperty(_context18 = _this.start).call(_context18, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'destroyed', _bindInstanceProperty(_context19 = _this.destroy).call(_context19, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PagedPublicationCore, [{
    key: "start",
    value: function start() {
      var _context20, _context21;

      var verso = this.getVerso();
      verso.start();

      _forEachInstanceProperty(_context20 = verso.pageSpreads).call(_context20, _bindInstanceProperty(_context21 = this.overridePageSpreadContentRect).call(_context21, this));

      this.resizeListener = throttle(this.resize, this.getOption('resizeDelay'));
      window.addEventListener('resize', this.resizeListener, false);
      window.addEventListener('beforeunload', this.unload, false);
      this.els.root.setAttribute('data-started', '');
      this.els.root.setAttribute('tabindex', '-1');
      this.els.root.focus();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _context22;

      var verso = this.getVerso();
      var pageSpreadEls = verso.el.querySelectorAll('.sgn-pp__page-spread');
      this.els.root.removeAttribute('data-started');
      this.els.root.removeAttribute('data-idle');
      this.els.root.removeAttribute('data-navigating');
      this.els.root.removeAttribute('data-color-brightness');
      this.els.root.removeAttribute('data-zoomed-in');
      this.els.root.style.backgroundColor = '#ffffff';

      _forEachInstanceProperty(_context22 = _Array$from(pageSpreadEls)).call(_context22, function (pageSpreadEl) {
        pageSpreadEl.parentNode.removeChild(pageSpreadEl);
      });

      verso.destroy();
      window.removeEventListener('resize', this.resizeListener, false);
      window.removeEventListener('beforeunload', this.unload, false);
    }
  }, {
    key: "makeOptions",
    value: function makeOptions(options, defaults) {
      var opts = {};

      for (var key in options) {
        var _options$key;

        opts[key] = (_options$key = options[key]) !== null && _options$key !== void 0 ? _options$key : defaults[key];
      }

      return opts;
    }
  }, {
    key: "getOption",
    value: function getOption(key) {
      return this.options[key];
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.els.root.setAttribute('data-color-brightness', getColorBrightness(color));
      this.els.root.style.backgroundColor = color;
    }
  }, {
    key: "createVerso",
    value: function createVerso() {
      var verso = new Verso(this.els.verso, {
        pageId: this.pageId
      });

      _bindInstanceProperty(verso).call(verso, 'beforeNavigation', this.beforeNavigation);

      _bindInstanceProperty(verso).call(verso, 'afterNavigation', this.afterNavigation);

      _bindInstanceProperty(verso).call(verso, 'attemptedNavigation', this.attemptedNavigation);

      _bindInstanceProperty(verso).call(verso, 'clicked', this.clicked);

      _bindInstanceProperty(verso).call(verso, 'doubleClicked', this.doubleClicked);

      _bindInstanceProperty(verso).call(verso, 'pressed', this.pressed);

      _bindInstanceProperty(verso).call(verso, 'contextmenu', this.contextmenu);

      _bindInstanceProperty(verso).call(verso, 'panStart', this.panStart);

      _bindInstanceProperty(verso).call(verso, 'panEnd', this.panEnd);

      _bindInstanceProperty(verso).call(verso, 'zoomedIn', this.zoomedIn);

      _bindInstanceProperty(verso).call(verso, 'zoomedOut', this.zoomedOut);

      return verso;
    }
  }, {
    key: "getVerso",
    value: function getVerso() {
      return this.verso;
    }
  }, {
    key: "getContentRect",
    value: function getContentRect(pageSpread) {
      var rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0
      };
      var pageEls = pageSpread.getPageEls();
      var pageEl = pageEls[0];
      var pageCount = pageEls.length;

      if (!pageCount) {
        return rect;
      }

      var scale = this.getVerso().transform.scale;
      var pageWidth = pageEl.offsetWidth * pageCount * scale;
      var pageHeight = pageEl.offsetHeight * scale;
      var imageRatio = +pageEl.getAttribute('data-height') / (+pageEl.getAttribute('data-width') * pageCount);
      var actualHeight = pageHeight;
      var actualWidth = actualHeight / imageRatio;
      actualWidth = Math.min(pageWidth, actualWidth);
      actualHeight = actualWidth * imageRatio;
      var clientRect = pageEl.getBoundingClientRect();
      rect.width = actualWidth;
      rect.height = actualHeight;
      rect.top = clientRect.top + (pageHeight - actualHeight) / 2;
      rect.left = clientRect.left + (pageWidth - actualWidth) / 2;
      rect.right = rect.width + rect.left;
      rect.bottom = rect.height + rect.top;
      return rect;
    }
  }, {
    key: "formatProgressLabel",
    value: function formatProgressLabel(pageSpread) {
      var _pageSpread$options$p;

      var pages = (_pageSpread$options$p = pageSpread === null || pageSpread === void 0 ? void 0 : pageSpread.options.pages) !== null && _pageSpread$options$p !== void 0 ? _pageSpread$options$p : [];

      var pageIds = _mapInstanceProperty(pages).call(pages, function (page) {
        return page.id;
      });

      var pageLabels = _mapInstanceProperty(pages).call(pages, function (page) {
        return page.label;
      });

      var pageCount = this.getOption('pages').length;
      var label = pageIds.length > 0 ? pageLabels.join('-') + ' / ' + pageCount : null;
      return label;
    }
  }, {
    key: "renderPageSpreads",
    value: function renderPageSpreads() {
      var _context23,
          _this2 = this;

      _forEachInstanceProperty(_context23 = this.getVerso().pageSpreads).call(_context23, function (pageSpread) {
        var visibility = pageSpread.getVisibility();

        var match = _this2.pageSpreads.get(pageSpread.getId());

        if (match) {
          if (visibility === 'visible' && match.contentsRendered === false) {
            var _context24;

            _setTimeout(_bindInstanceProperty(_context24 = match.renderContents).call(_context24, match), 0);
          }

          if (visibility === 'gone' && match.contentsRendered === true) {
            var _context25;

            _setTimeout(_bindInstanceProperty(_context25 = match.clearContents).call(_context25, match), 0);
          }
        }
      });

      return this;
    }
  }, {
    key: "findPage",
    value: function findPage(pageId) {
      var _context26;

      return _findInstanceProperty(_context26 = this.getOption('pages')).call(_context26, function (page) {
        return page.id === pageId;
      });
    }
  }, {
    key: "pageLoaded",
    value: function pageLoaded(e) {
      this.trigger('pageLoaded', e);
    }
  }, {
    key: "pagesLoaded",
    value: function pagesLoaded(e) {
      this.trigger('pagesLoaded', e);
    }
  }, {
    key: "beforeNavigation",
    value: function beforeNavigation(e) {
      var position = e.newPosition;
      var theVerso = this.getVerso();
      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);
      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
      var pageSpreadCount = theVerso.getPageSpreadCount();
      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
      var progress = position / (pageSpreadCount - 1) * 100;
      var progressLabel = this.formatProgressLabel(pageSpread);
      this.els.root.setAttribute('data-navigating', true);
      this.renderPageSpreads();
      this.resetIdleTimer();
      this.startIdleTimer();
      this.trigger('beforeNavigation', {
        verso: e,
        pageSpread: pageSpread,
        newSpreadEl: newSpreadEl,
        progress: progress,
        progressLabel: progressLabel,
        pageSpreadCount: pageSpreadCount,
        newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
      });
    }
  }, {
    key: "afterNavigation",
    value: function afterNavigation(e) {
      var position = e.newPosition;
      var theVerso = this.getVerso();
      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);
      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
      var pageSpreadCount = theVerso.getPageSpreadCount();
      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
      this.els.root.setAttribute('data-navigating', false);
      this.trigger('afterNavigation', {
        verso: e,
        pageSpread: pageSpread,
        pageSpreadCount: pageSpreadCount,
        newSpreadEl: newSpreadEl,
        newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
      });
    }
  }, {
    key: "attemptedNavigation",
    value: function attemptedNavigation(e) {
      this.trigger('attemptedNavigation', {
        verso: e
      });
    }
  }, {
    key: "clicked",
    value: function clicked(e) {
      if (e.isInsideContent) {
        var pageId = e.pageEl.getAttribute('data-id');
        var page = this.findPage(pageId);
        this.trigger('clicked', {
          verso: e,
          page: page
        });
      }
    }
  }, {
    key: "doubleClicked",
    value: function doubleClicked(e) {
      if (e.isInsideContent) {
        var pageId = e.pageEl.getAttribute('data-id');
        var page = this.findPage(pageId);
        this.trigger('doubleClicked', {
          verso: e,
          page: page
        });
      }
    }
  }, {
    key: "pressed",
    value: function pressed(e) {
      if (e.isInsideContent) {
        var pageId = e.pageEl.getAttribute('data-id');
        var page = this.findPage(pageId);
        this.trigger('pressed', {
          verso: e,
          page: page
        });
      }
    }
  }, {
    key: "contextmenu",
    value: function contextmenu(e) {
      if (e.isInsideContent) {
        var pageId = e.pageEl.getAttribute('data-id');
        var page = this.findPage(pageId);
        this.trigger('contextmenu', {
          verso: e,
          page: page
        });
      }
    }
  }, {
    key: "panStart",
    value: function panStart() {
      this.resetIdleTimer();
      this.trigger('panStart', {
        scale: this.getVerso().transform.scale
      });
    }
  }, {
    key: "panEnd",
    value: function panEnd() {
      this.startIdleTimer();
      this.trigger('panEnd');
    }
  }, {
    key: "zoomedIn",
    value: function zoomedIn(e) {
      var position = e.position;
      var versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
      pageSpread === null || pageSpread === void 0 ? void 0 : pageSpread.zoomIn();
      this.els.root.setAttribute('data-zoomed-in', true);
      this.trigger('zoomedIn', {
        verso: e,
        pageSpread: pageSpread
      });
    }
  }, {
    key: "zoomedOut",
    value: function zoomedOut(e) {
      var position = e.position;
      var versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
      pageSpread === null || pageSpread === void 0 ? void 0 : pageSpread.zoomOut();
      this.els.root.setAttribute('data-zoomed-in', false);
      this.trigger('zoomedOut', {
        verso: e,
        pageSpread: pageSpread
      });
    }
  }, {
    key: "getPageMode",
    value: function getPageMode() {
      var pageMode = this.getOption('pageMode');

      if (pageMode == null) {
        var width = this.els.root.offsetWidth;
        var height = this.els.root.offsetHeight;
        pageMode = height / width < 0.8 ? 'double' : 'single';
      }

      return pageMode;
    }
  }, {
    key: "resetIdleTimer",
    value: function resetIdleTimer() {
      clearTimeout(this.idleTimeout);
      this.els.root.setAttribute('data-idle', false);
      return this;
    }
  }, {
    key: "startIdleTimer",
    value: function startIdleTimer() {
      var _this3 = this;

      this.idleTimeout = _setTimeout(function () {
        _this3.els.root.setAttribute('data-idle', true);
      }, this.getOption('idleDelay'));
      return this;
    }
  }, {
    key: "switchPageMode",
    value: function switchPageMode(pageMode) {
      var _context27, _context28, _context29;

      if (this.pageMode === pageMode) {
        return this;
      }

      var verso = this.getVerso();
      var pageIds = verso.getPageSpreadFromPosition(verso.getPosition()).getPageIds();
      var pageSpreadEls = this.getVerso().el.querySelectorAll('.sgn-pp__page-spread');
      this.pageMode = pageMode;
      this.pageSpreads.update(this.pageMode);

      _forEachInstanceProperty(_context27 = _Array$from(pageSpreadEls)).call(_context27, function (pageSpreadEl) {
        pageSpreadEl.parentNode.removeChild(pageSpreadEl);
      });

      this.els.pages.parentNode.insertBefore(this.pageSpreads.getFrag(), this.els.pages);
      verso.refresh();
      verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0]), {
        duration: 0
      });

      _forEachInstanceProperty(_context28 = verso.pageSpreads).call(_context28, _bindInstanceProperty(_context29 = this.overridePageSpreadContentRect).call(_context29, this));

      return this;
    }
  }, {
    key: "overridePageSpreadContentRect",
    value: function overridePageSpreadContentRect(pageSpread) {
      var _this4 = this;

      if (pageSpread.getType() === 'page') {
        return pageSpread.getContentRect = function () {
          return _this4.getContentRect(pageSpread);
        };
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var pageMode = this.getPageMode();

      if (this.getOption('pageMode') == null && pageMode !== this.pageMode) {
        this.switchPageMode(pageMode);
      } else {
        this.trigger('resized');
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      this.trigger('disappeared');
    }
  }]);

  return PagedPublicationCore;
}(MicroEvent);

PagedPublicationCore.prototype.defaults = {
  pages: [],
  pageSpreadWidth: 100,
  pageSpreadMaxZoomScale: 2.3,
  idleDelay: 1000,
  resizeDelay: 400,
  color: '#ffffff'
};

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PagedPublicationEventTracking = /*#__PURE__*/function (_MicroEvent) {
  _inherits(PagedPublicationEventTracking, _MicroEvent);

  var _super = _createSuper$2(PagedPublicationEventTracking);

  function PagedPublicationEventTracking(eventTracker, id) {
    var _context, _context2, _context3, _context4, _context5, _context6, _context7;

    var _this;

    _classCallCheck(this, PagedPublicationEventTracking);

    _this = _super.call(this);
    _this.eventTracker = eventTracker;
    _this.id = id;
    _this.hidden = true;
    _this.pageSpread = null;

    _bindInstanceProperty(_this).call(_this, 'appeared', _bindInstanceProperty(_context = _this.appeared).call(_context, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'disappeared', _bindInstanceProperty(_context2 = _this.disappeared).call(_context2, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'beforeNavigation', _bindInstanceProperty(_context3 = _this.beforeNavigation).call(_context3, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'afterNavigation', _bindInstanceProperty(_context4 = _this.afterNavigation).call(_context4, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'attemptedNavigation', _bindInstanceProperty(_context5 = _this.attemptedNavigation).call(_context5, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'panStart', _bindInstanceProperty(_context6 = _this.panStart).call(_context6, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'destroyed', _bindInstanceProperty(_context7 = _this.destroy).call(_context7, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PagedPublicationEventTracking, [{
    key: "destroy",
    value: function destroy() {
      this.pageSpreadDisappeared();
    }
  }, {
    key: "trackOpened",
    value: function trackOpened() {
      if (this.eventTracker == null) {
        return this;
      }

      this.eventTracker.trackPagedPublicationOpened({
        'pp.id': this.id,
        vt: this.eventTracker.createViewToken(this.id)
      });
      return this;
    }
  }, {
    key: "trackPageSpreadDisappeared",
    value: function trackPageSpreadDisappeared(pageNumbers) {
      var _this2 = this;

      if (this.eventTracker == null) {
        return this;
      }

      _forEachInstanceProperty(pageNumbers).call(pageNumbers, function (pageNumber) {
        _this2.eventTracker.trackPagedPublicationPageDisappeared({
          'pp.id': _this2.id,
          'ppp.n': pageNumber,
          vt: _this2.eventTracker.createViewToken(_this2.id, pageNumber)
        });
      });

      return this;
    }
  }, {
    key: "appeared",
    value: function appeared(e) {
      this.pageSpreadAppeared(e.pageSpread);
    }
  }, {
    key: "disappeared",
    value: function disappeared() {
      this.pageSpreadDisappeared();
    }
  }, {
    key: "beforeNavigation",
    value: function beforeNavigation() {
      this.pageSpreadDisappeared();
    }
  }, {
    key: "afterNavigation",
    value: function afterNavigation(e) {
      this.pageSpreadAppeared(e.pageSpread);
    }
  }, {
    key: "attemptedNavigation",
    value: function attemptedNavigation(e) {
      this.pageSpreadAppeared(e.pageSpread);
    }
  }, {
    key: "panStart",
    value: function panStart(e) {
      if (e.scale === 1) {
        this.pageSpreadDisappeared();
      }
    }
  }, {
    key: "pageSpreadAppeared",
    value: function pageSpreadAppeared(pageSpread) {
      if (pageSpread && this.hidden === true) {
        this.pageSpread = pageSpread;
        this.hidden = false;
      }
    }
  }, {
    key: "pageSpreadDisappeared",
    value: function pageSpreadDisappeared() {
      if (this.pageSpread && this.hidden === false) {
        var _context8;

        this.trackPageSpreadDisappeared(_mapInstanceProperty(_context8 = this.pageSpread.getPages()).call(_context8, function (page) {
          return page.pageNumber;
        }));
        this.hidden = true;
        this.pageSpread = null;
      }
    }
  }]);

  return PagedPublicationEventTracking;
}(MicroEvent);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PagedPublicationHotspots = /*#__PURE__*/function (_MicroEvent) {
  _inherits(PagedPublicationHotspots, _MicroEvent);

  var _super = _createSuper$1(PagedPublicationHotspots);

  function PagedPublicationHotspots() {
    var _context, _context2, _context3, _context4;

    var _this;

    _classCallCheck(this, PagedPublicationHotspots);

    _this = _super.call(this);
    _this.currentPageSpreadId = null;
    _this.pageSpreadsLoaded = {};
    _this.cache = {};

    _bindInstanceProperty(_this).call(_this, 'hotspotsReceived', _bindInstanceProperty(_context = _this.hotspotsReceived).call(_context, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'afterNavigation', _bindInstanceProperty(_context2 = _this.afterNavigation).call(_context2, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'pagesLoaded', _bindInstanceProperty(_context3 = _this.pagesLoaded).call(_context3, _assertThisInitialized(_this)));

    _bindInstanceProperty(_this).call(_this, 'resized', _bindInstanceProperty(_context4 = _this.resized).call(_context4, _assertThisInitialized(_this)));

    return _this;
  }

  _createClass(PagedPublicationHotspots, [{
    key: "renderHotspots",
    value: function renderHotspots(data) {
      var _context5;

      var frag = document.createDocumentFragment();
      var contentRect = data.versoPageSpread.getContentRect();
      var pageSpreadEl = data.pageSpread.getEl();
      var hotspotEls = pageSpreadEl.querySelectorAll('.sgn-pp__hotspot');
      var boundingRect = pageSpreadEl.getBoundingClientRect();

      _forEachInstanceProperty(_context5 = _Array$from(hotspotEls)).call(_context5, function (hotspotEl) {
        hotspotEl.parentNode.removeChild(hotspotEl);
      });

      for (var id in data.hotspots) {
        var hotspot = data.hotspots[id];
        var position = this.getPosition(data.pages, data.ratio, hotspot);
        var el = this.renderHotspot(hotspot, position, contentRect, boundingRect);
        frag.appendChild(el);
      }

      pageSpreadEl.appendChild(frag);
      return this;
    }
  }, {
    key: "renderHotspot",
    value: function renderHotspot(hotspot, position, contentRect, boundingRect) {
      var el = document.createElement('div');
      var top = Math.round(contentRect.height / 100 * position.top);
      var left = Math.round(contentRect.width / 100 * position.left);
      var width = Math.round(contentRect.width / 100 * position.width);
      var height = Math.round(contentRect.height / 100 * position.height);
      top += Math.round(contentRect.top);
      left += Math.round(contentRect.left);
      top -= boundingRect.top;
      left -= boundingRect.left;
      el.className = 'sgn-pp__hotspot verso__overlay';

      if (hotspot.id != null) {
        el.setAttribute('data-id', hotspot.id);
      }

      if (hotspot.type != null) {
        el.setAttribute('data-type', hotspot.type);
      }

      el.innerHTML = Mustache.render('', hotspot);
      el.style.top = "".concat(top, "px");
      el.style.left = "".concat(left, "px");
      el.style.width = "".concat(width, "px");
      el.style.height = "".concat(height, "px");
      return el;
    }
  }, {
    key: "getPosition",
    value: function getPosition(pages, ratio, hotspot) {
      var minX = null;
      var minY = null;
      var maxX = null;
      var maxY = null;

      var pageNumbers = _mapInstanceProperty(pages).call(pages, function (page) {
        return page.pageNumber;
      });

      for (var pageNumber in hotspot.locations) {
        var _context6;

        if (_indexOfInstanceProperty(pageNumbers).call(pageNumbers, +pageNumber) === -1) {
          continue;
        }

        _forEachInstanceProperty(_context6 = hotspot.locations[pageNumber]).call(_context6, function (coords) {
          var _coords = _slicedToArray(coords, 2),
              x = _coords[0],
              y = _coords[1];

          if (pages[1] && pageNumbers[1] === +pageNumber) {
            x += 1;
          }

          x /= pages.length;

          if (minX == null) {
            minX = maxX = x;
            minY = maxY = y;
          }

          if (x < minX) {
            minX = x;
          }

          if (x > maxX) {
            maxX = x;
          }

          if (y < minY) {
            minY = y;
          }

          if (y > maxY) {
            return maxY = y;
          }
        });
      }

      var width = maxX - minX;
      var height = maxY - minY;
      return {
        top: minY / ratio * 100,
        left: minX * 100,
        width: width * 100,
        height: height / ratio * 100
      };
    }
  }, {
    key: "requestHotspots",
    value: function requestHotspots(pageSpreadId, pages) {
      this.trigger('hotspotsRequested', {
        id: pageSpreadId,
        pages: pages
      });
    }
  }, {
    key: "hotspotsReceived",
    value: function hotspotsReceived(e) {
      var pageSpreadId = e.pageSpread.getId();
      this.setCache(pageSpreadId, e);
      this.renderHotspots(e);
    }
  }, {
    key: "getCache",
    value: function getCache(pageSpreadId) {
      return this.cache[pageSpreadId];
    }
  }, {
    key: "setCache",
    value: function setCache(pageSpreadId, data) {
      this.cache[pageSpreadId] = data;
      return this;
    }
  }, {
    key: "afterNavigation",
    value: function afterNavigation(e) {
      if (e.pageSpread == null) {
        return;
      }

      var id = e.pageSpread.getId();
      this.currentPageSpreadId = id;

      if (this.pageSpreadsLoaded[id]) {
        this.requestHotspots(id, e.pageSpread.getPages());
      }
    }
  }, {
    key: "pagesLoaded",
    value: function pagesLoaded(e) {
      this.pageSpreadsLoaded[e.pageSpreadId] = true;

      if (this.currentPageSpreadId === e.pageSpreadId) {
        this.requestHotspots(e.pageSpreadId, e.pages);
      }
    }
  }, {
    key: "resized",
    value: function resized() {
      var data = this.getCache(this.currentPageSpreadId);

      if (data) {
        this.renderHotspots(data);
      }
    }
  }]);

  return PagedPublicationHotspots;
}(MicroEvent);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context36; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context36 = Object.prototype.toString.call(o)).call(_context36, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function defaultPickHotspot(hotspots, e, el, callback) {
  var _context;

  var popover = singleChoicePopover({
    el: el,
    header: t('paged_publication.hotspot_picker.header'),
    x: e.verso.x,
    y: e.verso.y,
    items: _mapInstanceProperty(_context = _filterInstanceProperty(hotspots).call(hotspots, function (hotspot) {
      return hotspot.type === 'offer';
    })).call(_context, function (hotspot) {
      return {
        id: hotspot.id,
        title: hotspot.offer.heading,
        subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price
      };
    })
  }, function (picked) {
    return callback(_findInstanceProperty(hotspots).call(hotspots, function (hotspot) {
      return hotspot.id === picked.id;
    }));
  });
  return popover.destroy;
}

var Viewer = /*#__PURE__*/function (_MicroEvent) {
  _inherits(Viewer, _MicroEvent);

  var _super = _createSuper(Viewer);

  function Viewer(el) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    _this = _super.call(this);
    _this.el = el;
    _this.options = options;
    _this._core = new PagedPublicationCore(_this.el, {
      id: _this.options.id,
      pages: _this.options.pages,
      pageSpreadWidth: _this.options.pageSpreadWidth,
      pageSpreadMaxZoomScale: _this.options.pageSpreadMaxZoomScale,
      pageId: _this.options.pageId,
      idleDelay: _this.options.idleDelay,
      resizeDelay: _this.options.resizeDelay,
      color: _this.options.color
    });
    _this._hotspots = new PagedPublicationHotspots();
    _this._controls = new PagedPublicationControls(_this.el, {
      keyboard: _this.options.keyboard
    });
    _this._eventTracking = new PagedPublicationEventTracking(_this.options.eventTracker, _this.options.id);
    _this.hotspots = null;
    _this.hotspotQueue = [];
    _this.popover = null;

    _this._setupEventListeners();

    return _this;
  }

  _createClass(Viewer, [{
    key: "start",
    value: function start() {
      this._eventTracking.trackOpened();

      this._core.trigger('started');

      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._core.trigger('destroyed');

      this._hotspots.trigger('destroyed');

      this._controls.trigger('destroyed');

      this._eventTracking.trigger('destroyed');

      this.trigger('destroyed');
      return this;
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(position, options) {
      this.navigateToIndex(position, options);
      return this;
    }
  }, {
    key: "navigateToIndex",
    value: function navigateToIndex(position, options) {
      this._core.getVerso().navigateTo(position, options);

      return this;
    }
  }, {
    key: "navigateToPageId",
    value: function navigateToPageId(pageId, options) {
      var position = this._core.getVerso().getPageSpreadPositionFromPageId(pageId);

      return this._core.getVerso().navigateTo(position, options);
    }
  }, {
    key: "first",
    value: function first(options) {
      this._core.getVerso().first(options);

      return this;
    }
  }, {
    key: "prev",
    value: function prev(options) {
      this._core.getVerso().prev(options);

      return this;
    }
  }, {
    key: "next",
    value: function next(options) {
      this._core.getVerso().next(options);

      return this;
    }
  }, {
    key: "last",
    value: function last(options) {
      this._core.getVerso().last(options);

      return this;
    }
  }, {
    key: "_setupEventListeners",
    value: function _setupEventListeners() {
      var _context2,
          _this2 = this,
          _context3,
          _context4,
          _context5,
          _context6,
          _context7,
          _context8,
          _context9,
          _context10,
          _context11,
          _context12,
          _context13,
          _context14,
          _context15,
          _context16,
          _context17,
          _context18,
          _context19,
          _context20,
          _context21,
          _context22,
          _context23,
          _context24,
          _context25,
          _context26,
          _context27,
          _context28,
          _context29,
          _context30,
          _context31,
          _context32;

      _bindInstanceProperty(_context2 = this._controls).call(_context2, 'prev', function (e) {
        _this2.prev(e);
      });

      _bindInstanceProperty(_context3 = this._controls).call(_context3, 'next', function (e) {
        _this2.next(e);
      });

      _bindInstanceProperty(_context4 = this._controls).call(_context4, 'first', function (e) {
        _this2.first(e);
      });

      _bindInstanceProperty(_context5 = this._controls).call(_context5, 'last', function (e) {
        _this2.last(e);
      });

      _bindInstanceProperty(_context6 = this._controls).call(_context6, 'close', function (e) {
        _this2.destroy(e);
      });

      _bindInstanceProperty(_context7 = this._hotspots).call(_context7, 'hotspotsRequested', function (e) {
        _this2.trigger('hotspotsRequested', e);
      });

      _bindInstanceProperty(_context8 = this._core).call(_context8, 'appeared', function (e) {
        _this2._eventTracking.trigger('appeared', e);

        _this2.trigger('appeared', e);
      });

      _bindInstanceProperty(_context9 = this._core).call(_context9, 'disappeared', function (e) {
        _this2._eventTracking.trigger('disappeared', e);

        _this2.trigger('disappeared', e);
      });

      _bindInstanceProperty(_context10 = this._core).call(_context10, 'beforeNavigation', function (e) {
        _this2._eventTracking.trigger('beforeNavigation', e);

        _this2._controls.trigger('beforeNavigation', e);

        _this2.trigger('beforeNavigation', e);
      });

      _bindInstanceProperty(_context11 = this._core).call(_context11, 'afterNavigation', function (e) {
        _this2._eventTracking.trigger('afterNavigation', e);

        _this2._hotspots.trigger('afterNavigation', e);

        _this2.trigger('afterNavigation', e);
      });

      _bindInstanceProperty(_context12 = this._core).call(_context12, 'attemptedNavigation', function (e) {
        _this2._eventTracking.trigger('attemptedNavigation', e);

        _this2.trigger('attemptedNavigation', e);
      });

      _bindInstanceProperty(_context13 = this._core).call(_context13, 'clicked', function (e) {
        _this2._eventTracking.trigger('clicked', e);

        _this2.trigger('clicked', e);
      });

      _bindInstanceProperty(_context14 = this._core).call(_context14, 'doubleClicked', function (e) {
        _this2._eventTracking.trigger('doubleClicked', e);

        _this2.trigger('doubleClicked', e);
      });

      _bindInstanceProperty(_context15 = this._core).call(_context15, 'contextmenu', function (e) {
        _this2.trigger('contextmenu', e);
      });

      _bindInstanceProperty(_context16 = this._core).call(_context16, 'pressed', function (e) {
        _this2._eventTracking.trigger('pressed', e);

        _this2.trigger('pressed', e);
      });

      _bindInstanceProperty(_context17 = this._core).call(_context17, 'panStart', function (e) {
        _this2._eventTracking.trigger('panStart', e);

        _this2.trigger('panStart', e);
      });

      _bindInstanceProperty(_context18 = this._core).call(_context18, 'zoomedIn', function (e) {
        _this2._eventTracking.trigger('zoomedIn', e);

        _this2.trigger('zoomedIn', e);
      });

      _bindInstanceProperty(_context19 = this._core).call(_context19, 'zoomedOut', function (e) {
        _this2._eventTracking.trigger('zoomedOut', e);

        _this2.trigger('zoomedOut', e);
      });

      _bindInstanceProperty(_context20 = this._core).call(_context20, 'pageLoaded', function (e) {
        _this2._eventTracking.trigger('pageLoaded', e);

        _this2.trigger('pageLoaded', e);
      });

      _bindInstanceProperty(_context21 = this._core).call(_context21, 'pagesLoaded', function (e) {
        _this2._hotspots.trigger('pagesLoaded', e);

        _this2.trigger('pagesLoaded', e);
      });

      _bindInstanceProperty(_context22 = this._core).call(_context22, 'resized', function (e) {
        _this2._hotspots.trigger('resized');

        _this2.trigger('resized', e);
      });

      _bindInstanceProperty(_context23 = this).call(_context23, 'hotspotsRequested', _bindInstanceProperty(_context24 = this.hotspotsRequested).call(_context24, this));

      _bindInstanceProperty(_context25 = this).call(_context25, 'beforeNavigation', _bindInstanceProperty(_context26 = this.beforeNavigation).call(_context26, this));

      _bindInstanceProperty(_context27 = this).call(_context27, 'clicked', _bindInstanceProperty(_context28 = this.clicked).call(_context28, this));

      _bindInstanceProperty(_context29 = this).call(_context29, 'contextmenu', _bindInstanceProperty(_context30 = this.contextmenu).call(_context30, this));

      _bindInstanceProperty(_context31 = this).call(_context31, 'pressed', _bindInstanceProperty(_context32 = this.pressed).call(_context32, this));
    }
  }, {
    key: "pickHotspot",
    value: function pickHotspot(e, callback) {
      var _context33,
          _this3 = this;

      if (this.hotspots == null) {
        return;
      }

      if (this.popover != null) {
        var _this$popover$destroy, _this$popover;

        (_this$popover$destroy = (_this$popover = this.popover).destroy) === null || _this$popover$destroy === void 0 ? void 0 : _this$popover$destroy.call(_this$popover);
        this.popover = null;
      }

      var hotspots = _mapInstanceProperty(_context33 = e.verso.overlayEls).call(_context33, function (overlayEl) {
        return _this3.hotspots[overlayEl.getAttribute('data-id')];
      });

      if (hotspots.length === 1) {
        callback(hotspots[0]);
      } else if (hotspots.length > 1) {
        this.popover = {
          destroy: (this.options.pickHotspot || defaultPickHotspot)(hotspots, e, this.el, callback)
        };
      }
    }
  }, {
    key: "processHotspotQueue",
    value: function processHotspotQueue() {
      var _context34,
          _this4 = this;

      if (this.hotspots == null) {
        return;
      }

      this.hotspotQueue = _filterInstanceProperty(_context34 = this.hotspotQueue).call(_context34, function (hotspotRequest) {
        var _context35;

        var id;
        var hotspots = {};

        var versoPageSpread = _findInstanceProperty(_context35 = _this4._core.getVerso().pageSpreads).call(_context35, function (pageSpread) {
          return pageSpread.getId() === hotspotRequest.id;
        });

        for (id in _this4.hotspots) {
          var hotspot = _this4.hotspots[id];

          if (hotspots[id]) {
            continue;
          }

          var _iterator = _createForOfIteratorHelper(hotspotRequest.pages),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var page = _step.value;

              if (hotspot.locations[page.pageNumber]) {
                hotspots[id] = {
                  type: hotspot.type,
                  id: hotspot.id,
                  locations: hotspot.locations
                };
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        _this4._hotspots.trigger('hotspotsReceived', {
          pageSpread: _this4._core.pageSpreads.get(hotspotRequest.id),
          versoPageSpread: versoPageSpread,
          ratio: _this4.options.hotspotRatio,
          pages: hotspotRequest.pages,
          hotspots: hotspots
        });

        return false;
      });
    }
  }, {
    key: "hotspotsRequested",
    value: function hotspotsRequested(e) {
      this.hotspotQueue.push(e);
      this.processHotspotQueue();
    }
  }, {
    key: "applyHotspots",
    value: function applyHotspots() {
      var hotspots = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.hotspots = hotspots;
      this.processHotspotQueue();
    }
  }, {
    key: "beforeNavigation",
    value: function beforeNavigation() {
      var _this$popover2, _this$popover2$destro;

      (_this$popover2 = this.popover) === null || _this$popover2 === void 0 ? void 0 : (_this$popover2$destro = _this$popover2.destroy) === null || _this$popover2$destro === void 0 ? void 0 : _this$popover2$destro.call(_this$popover2);
    }
  }, {
    key: "clicked",
    value: function clicked(e) {
      var _this5 = this;

      this.pickHotspot(e, function (hotspot) {
        _this5.trigger('hotspotClicked', hotspot);
      });
    }
  }, {
    key: "contextmenu",
    value: function contextmenu(e) {
      var _this6 = this;

      this.pickHotspot(e, function (hotspot) {
        _this6.trigger('hotspotContextmenu', hotspot);
      });
    }
  }, {
    key: "pressed",
    value: function pressed(e) {
      var _this7 = this;

      this.pickHotspot(e, function (hotspot) {
        _this7.trigger('hotspotPressed', hotspot);
      });
    }
  }]);

  return Viewer;
}(MicroEvent);

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source), true)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context3; _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Bootstrapper = /*#__PURE__*/function () {
  function Bootstrapper() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Bootstrapper);

    _defineProperty(this, "fetchDetails", function (callback) {
      return request$1({
        url: "/v2/catalogs/".concat(_this.options.id)
      }, callback);
    });

    _defineProperty(this, "fetchPages", function (callback) {
      return request$1({
        url: "/v2/catalogs/".concat(_this.options.id, "/pages")
      }, callback);
    });

    _defineProperty(this, "fetchHotspots", function (callback) {
      return request$1({
        url: "/v2/catalogs/".concat(_this.options.id, "/hotspots")
      }, callback);
    });

    this.options = options;
  }

  _createClass(Bootstrapper, [{
    key: "createViewer",
    value: function createViewer(data, viewerOptions) {
      return new Viewer(this.options.el, _objectSpread({
        id: this.options.id,
        ownedBy: data.details.dealer_id,
        color: '#' + data.details.branding.pageflip.color,
        hotspotRatio: data.details.dimensions.height,
        keyboard: true,
        pageId: this.options.pageId,
        eventTracker: this.options.eventTracker,
        pages: this.transformPages(data.pages)
      }, viewerOptions));
    }
  }, {
    key: "transformPages",
    value: function transformPages(pages) {
      return _mapInstanceProperty(pages).call(pages, function (page, i) {
        var pageNumber = i + 1;
        return {
          id: 'page' + pageNumber,
          label: pageNumber + '',
          pageNumber: pageNumber,
          images: {
            medium: page.view,
            large: page.zoom
          }
        };
      });
    }
  }, {
    key: "applyHotspots",
    value: function applyHotspots(viewer, hotspots) {
      var obj = {};

      _forEachInstanceProperty(hotspots).call(hotspots, function (hotspot) {
        return obj[hotspot.id] = hotspot;
      });

      viewer.applyHotspots(obj);
    }
  }, {
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(callback) {
        var _yield$Promise$all, _yield$Promise$all2, details, pages;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Promise.all([this.fetchDetails(), this.fetchPages()]);

              case 3:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                details = _yield$Promise$all2[0];
                pages = _yield$Promise$all2[1];

                if (!(details && pages)) {
                  _context.next = 11;
                  break;
                }

                callback(null, {
                  details: details,
                  pages: pages
                });
                _context.next = 12;
                break;

              case 11:
                throw new Error();

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                callback(_context.t0);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 14]]);
      }));

      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }]);

  return Bootstrapper;
}();

var PagedPublicationKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Viewer: Viewer,
    Bootstrapper: Bootstrapper
});

var _context;
var config = new Config();
var SGN = {
  config: config,
  util: util,
  translations: translations
}; // Expose storage backends.

SGN.storage = {
  local: clientLocal
}; // Expose the different kits.

SGN.EventsKit = EventsKit;
SGN.CoreKit = CoreKit;
SGN.PagedPublicationKit = PagedPublicationKit;
SGN.IncitoPublicationKit = IncitoPublicationKit;
SGN.CoreUIKit = CoreUIKit;

_bindInstanceProperty(_context = SGN.config).call(_context, 'change', function (changedAttributes) {
  var _ref;

  var newEventTracker = changedAttributes.eventTracker;
  var newApiKey = changedAttributes.apiKey;

  if ((newApiKey || newEventTracker) && ((_ref = newEventTracker || SGN.config.get('eventTracker')) === null || _ref === void 0 ? void 0 : _ref.trackId) === (newApiKey || SGN.config.get('apiKey'))) {
    throw error(new Error('Track identifier must not be identical to app key. Go to https://etilbudsavis.dk/developers/apps to get a track identifier for your app'));
  }

  if (newEventTracker != null) {
    // default eventsTrackUrl
    if (!newEventTracker.eventsTrackUrl) {
      newEventTracker.setEventsTrackUrl(SGN.config.get('eventsTrackUrl'));
    }
  }

  var newEventsTrackUrl = changedAttributes.eventsTrackUrl;

  if (newEventsTrackUrl && SGN.config.get('eventTracker')) {
    SGN.config.get('eventTracker').setEventsTrackUrl(newEventsTrackUrl);
  }
});

if (isBrowser()) {
  // Autoconfigure the SDK.
  var scriptEl = document.getElementById('sgn-sdk');

  if (scriptEl) {
    var apiKey = scriptEl.getAttribute('data-api-key') || scriptEl.getAttribute('data-app-key');
    var trackId = scriptEl.getAttribute('data-track-id');
    var _config = {};

    if (apiKey) {
      _config.apiKey = apiKey;
    }

    if (trackId) {
      _config.eventTracker = new SGN.EventsKit.Tracker({
        trackId: trackId
      });
    }

    SGN.config.set(_config);
  }
}

export default SGN;
//# sourceMappingURL=sgn-sdk.es.js.map
