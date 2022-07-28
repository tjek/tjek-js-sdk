'use strict';

var _Object$keys = require('@babel/runtime-corejs3/core-js-stable/object/keys');
var _Object$getOwnPropertySymbols = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var _Object$getOwnPropertyDescriptor = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor');
var _Object$getOwnPropertyDescriptors = require('@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors');
var _defineProperty = require('@babel/runtime-corejs3/helpers/defineProperty');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _assertThisInitialized = require('@babel/runtime-corejs3/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime-corejs3/helpers/inherits');
var _classPrivateFieldGet = require('@babel/runtime-corejs3/helpers/classPrivateFieldGet');
require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/web.dom-collections.iterator.js');
require('core-js/modules/web.dom-collections.for-each.js');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _includesInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/includes');
var _keysInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/keys');
var _WeakMap = require('@babel/runtime-corejs3/core-js-stable/weak-map');
var MicroEvent = require('microevent');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
var _spliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/splice');
require('core-js/modules/es.string.match.js');
var _asyncToGenerator = require('@babel/runtime-corejs3/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime-corejs3/regenerator');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
var _URL = require('@babel/runtime-corejs3/core-js-stable/url');
var fetch = require('cross-fetch');
var _toConsumableArray = require('@babel/runtime-corejs3/helpers/toConsumableArray');
var _findInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/find');
var _mapInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/map');
var _Object$values = require('@babel/runtime-corejs3/core-js-stable/object/values');
var _Promise = require('@babel/runtime-corejs3/core-js-stable/promise');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.promise.js');
require('core-js/modules/es.string.iterator.js');
require('core-js/modules/es.string.split.js');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');
var _trimInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/trim');
require('core-js/modules/es.array.join.js');
require('core-js/modules/es.string.link.js');
var Mustache = require('mustache');
var _slicedToArray = require('@babel/runtime-corejs3/helpers/slicedToArray');
var _Object$entries = require('@babel/runtime-corejs3/core-js-stable/object/entries');
require('core-js/modules/es.number.constructor.js');
var _Array$from = require('@babel/runtime-corejs3/core-js-stable/array/from');
var _findIndexInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/find-index');
var _Object$assign = require('@babel/runtime-corejs3/core-js-stable/object/assign');
var md5 = require('md5');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _Object$keys__default = /*#__PURE__*/_interopDefaultLegacy(_Object$keys);
var _Object$getOwnPropertySymbols__default = /*#__PURE__*/_interopDefaultLegacy(_Object$getOwnPropertySymbols);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var _Object$getOwnPropertyDescriptor__default = /*#__PURE__*/_interopDefaultLegacy(_Object$getOwnPropertyDescriptor);
var _Object$getOwnPropertyDescriptors__default = /*#__PURE__*/_interopDefaultLegacy(_Object$getOwnPropertyDescriptors);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _classPrivateFieldGet__default = /*#__PURE__*/_interopDefaultLegacy(_classPrivateFieldGet);
var _concatInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_concatInstanceProperty);
var _includesInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_includesInstanceProperty);
var _keysInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_keysInstanceProperty);
var _WeakMap__default = /*#__PURE__*/_interopDefaultLegacy(_WeakMap);
var MicroEvent__default = /*#__PURE__*/_interopDefaultLegacy(MicroEvent);
var _spliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_spliceInstanceProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _JSON$stringify__default = /*#__PURE__*/_interopDefaultLegacy(_JSON$stringify);
var _URL__default = /*#__PURE__*/_interopDefaultLegacy(_URL);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _findInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_findInstanceProperty);
var _mapInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_mapInstanceProperty);
var _Object$values__default = /*#__PURE__*/_interopDefaultLegacy(_Object$values);
var _Promise__default = /*#__PURE__*/_interopDefaultLegacy(_Promise);
var _sliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_sliceInstanceProperty);
var _trimInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_trimInstanceProperty);
var Mustache__default = /*#__PURE__*/_interopDefaultLegacy(Mustache);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _Object$entries__default = /*#__PURE__*/_interopDefaultLegacy(_Object$entries);
var _Array$from__default = /*#__PURE__*/_interopDefaultLegacy(_Array$from);
var _findIndexInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_findIndexInstanceProperty);
var _Object$assign__default = /*#__PURE__*/_interopDefaultLegacy(_Object$assign);
var md5__default = /*#__PURE__*/_interopDefaultLegacy(md5);

var coreUrl = 'https://squid-api.tjek.com';
var eventsTrackUrl = 'https://wolf-api.tjek.com/sync';

var configDefaults = /*#__PURE__*/Object.freeze({
    __proto__: null,
    coreUrl: coreUrl,
    eventsTrackUrl: eventsTrackUrl
});

function ownKeys$9(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var _attrs = /*#__PURE__*/new _WeakMap__default["default"]();

var Config = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](Config, _MicroEvent);

  function Config() {
    var _context;

    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _MicroEvent.call.apply(_MicroEvent, _concatInstanceProperty__default["default"](_context = [this]).call(_context, args)) || this;
    _this.keys = ['apiKey', 'eventTracker', 'coreUrl', 'eventsTrackUrl'];

    _classPrivateFieldInitSpec(_assertThisInitialized__default["default"](_this), _attrs, {
      writable: true,
      value: _objectSpread$9({}, configDefaults)
    });

    return _this;
  }

  var _proto = Config.prototype;

  _proto.set = function set(config) {
    var changedAttributes = {};

    for (var key in config) {
      var _context2;

      if (key === 'appKey') key = 'apiKey';

      if (_includesInstanceProperty__default["default"](_context2 = _keysInstanceProperty__default["default"](this)).call(_context2, key)) {
        _classPrivateFieldGet__default["default"](this, _attrs)[key] = config[key];
        changedAttributes[key] = config[key];
      }
    }

    this.trigger('change', changedAttributes);
  };

  _proto.get = function get(option) {
    if (option === 'appKey') option = 'apiKey';
    return _classPrivateFieldGet__default["default"](this, _attrs)[option];
  };

  _proto.shadow = function shadow(optionsObject) {
    var _this2 = this;

    var optionsWithConfig = _objectSpread$9({}, optionsObject);

    _keysInstanceProperty__default["default"](this).forEach(function (key) {
      var get = function get() {
        return (optionsObject == null ? void 0 : optionsObject[key]) || _this2.get(key);
      };

      Object.defineProperty(optionsWithConfig, key, {
        get: get
      });
    });

    return optionsWithConfig;
  };

  return _createClass__default["default"](Config);
}(MicroEvent__default["default"]);

var _getMatcher = function _getMatcher(element) {
  return element.matches || element.webkitMatchesSelector || // @ts-expect-error
  element.mozMatchesSelector || // @ts-expect-error
  element.msMatchesSelector || // @ts-expect-error
  element.oMatchesSelector || Function.prototype;
};

var _level = 0;

function _matchesSelector(element, selector, boundElement) {
  if (element === boundElement) return;
  if (_getMatcher(element).call(element, selector)) return element;

  if (element.parentElement) {
    _level++;
    return _matchesSelector(element.parentElement, selector, boundElement);
  }
}

var handlersBySelectorByTypeByInstance = {};

function _bind(events, selector, callback, remove) {
  var _this = this;

  if (!(events instanceof Array)) events = [events];
  var id = this.id;
  var handlersBySelectorByType = handlersBySelectorByTypeByInstance[this.id];

  var _loop = function _loop(k) {
    var type = events[k];

    if (remove) {
      // if there are no events tied to this element at all
      // then don't do anything
      if (!handlersBySelectorByType) return {
        v: void 0
      }; // if there is no event type specified then remove all events
      // example: Gator(element).off()

      if (!type) {
        _Object$keys__default["default"](handlersBySelectorByType).forEach(function (handleType) {
          handlersBySelectorByType[handleType] = {};
        });

        return {
          v: void 0
        };
      } // if no callback or selector is specified remove all events of this type
      // example: Gator(element).off('click')


      if (!callback && !selector) {
        handlersBySelectorByType[type] = {};
        return {
          v: void 0
        };
      } // if a selector is specified but no callback remove all events
      // for this selector
      // example: Gator(element).off('click', '.sub-element')


      if (!callback) {
        delete handlersBySelectorByType[type][selector];
        return {
          v: void 0
        };
      } // if we have specified an event type, selector, and callback then we
      // need to make sure there are callbacks tied to this selector to
      // begin with.  if there aren't then we can stop here


      if (!handlersBySelectorByType[type][selector]) return {
        v: void 0
      }; // if there are then loop through all the callbacks and if we find
      // one that matches remove it from the array

      for (var i = 0; i < handlersBySelectorByType[type][selector].length; i++) {
        var handlers = handlersBySelectorByType[type][selector];

        if (handlers[i] === callback) {
          _spliceInstanceProperty__default["default"](handlers).call(handlers, i, 1);

          break;
        }
      }

      return "continue";
    }

    if (!handlersBySelectorByType || !handlersBySelectorByType[type]) _this.element.addEventListener(type, function (e) {
      var handlersBySelector = handlersBySelectorByType[type];
      if (!handlersBySelector) return;
      var target = e.target;
      var matches = {}; // find all events that match

      _level = 0;

      _Object$keys__default["default"](handlersBySelector).forEach(function (handlerSelector) {
        if (target instanceof HTMLElement) {
          var match = _matchesSelector(target, handlerSelector, instances[id].element);

          if (match) {
            _level++;
            handlersBySelector[handlerSelector].match = match;
            matches[_level] = handlersBySelector[handlerSelector];
          }
        }
      }); // stopPropagation() fails to set cancelBubble to true in Webkit
      // @see http://code.google.com/p/chromium/issues/detail?id=162270


      e.stopPropagation = function () {
        e.cancelBubble = true;
      };

      for (var _i = 0; _i <= _level; _i++) {
        if (matches[_i]) {
          for (var j = 0; j < matches[_i].length; j++) {
            if (matches[_i][j].call(matches[_i].match, e) === false) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }

            if (e.cancelBubble) return;
          }
        }
      }
    }, type == 'blur' || type == 'focus');

    if (!handlersBySelectorByType) {
      handlersBySelectorByTypeByInstance[id] = {};
      handlersBySelectorByType = handlersBySelectorByTypeByInstance[id];
    }

    if (!handlersBySelectorByType[type]) {
      handlersBySelectorByType[type] = {};
    }

    if (!handlersBySelectorByType[type][selector]) handlersBySelectorByType[type][selector] = [];
    handlersBySelectorByType[type][selector].push(callback);
  };

  for (var k = 0; k < events.length; k++) {
    var _ret = _loop(k);

    if (_ret === "continue") continue;
    if (typeof _ret === "object") return _ret.v;
  }
}

var _id = 0;
var instances = {};

function Gator(element, id) {
  // called as function
  if (!(this instanceof Gator)) {
    // only keep one Gator instance per node to make sure that
    // we don't create a ton of new objects if you want to delegate
    // multiple events from the same node
    //
    // for example: Gator(document).on(...
    for (var key in instances) {
      if (instances[key].element === element) return instances[key];
    }

    _id++;
    return instances[_id] = new Gator(element, _id);
  }

  this.element = element;
  this.id = id;
}

Gator.prototype.on = function (events, selector, callback) {
  _bind.call(this, events, selector, callback);
};

Gator.prototype.off = function (events, selector, callback) {
  _bind.call(this, events, selector, callback, true);
};

var isBrowser = function isBrowser() {
  return typeof window === 'object' && typeof document === 'object';
};
var isNode = function isNode() {
  return typeof process === 'object';
};
function error(err, options) {
  err.message = err.message;

  if (typeof options === 'string') {
    err.message = options;
  } else if (typeof options === 'object' && options) {
    for (var key in options) {
      err[key] = options[key];
    }

    if (options.message) err.message = options.message;

    if (options.code || options.message) {
      err.code = options.code || options.name;
    }

    if (options.stack) err.stack = options.stack;
    if (options.statusCode) err.statusCode = options.statusCode;
  }

  err.name = (options == null ? void 0 : options.name) || err.name || err.code || 'Error';
  err.time = new Date();
  return err;
}
function getQueryParam(field, url) {
  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  var string = reg.exec(url || window.location.href);
  return string ? string[1] : undefined;
}
function throttle(fn, threshold, scope) {
  if (threshold === void 0) {
    threshold = 250;
  }

  var last;
  var deferTimer;
  return function () {
    var context = scope || this;
    var now = new Date().getTime();
    var args = arguments;

    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
var on = function on(el, events, selector, callback) {
  return (//@ts-expect-error
    Gator(el).on(events, selector, callback)
  );
};
var off = function off(el, events, selector, callback) {
  return (//@ts-expect-error
    Gator(el).off(events, selector, callback)
  );
};

var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isBrowser: isBrowser,
    isNode: isNode,
    error: error,
    getQueryParam: getQueryParam,
    throttle: throttle,
    on: on,
    off: off
});

var prefixKey = 'sgn-';
var storage;

function ensureStorage() {
  if (storage) return;

  try {
    storage = window.localStorage;
    storage[prefixKey + 'test-storage'] = 'foobar';
    delete storage[prefixKey + 'test-storage'];
  } catch (error) {
    storage = {};
  }
}

function get(key) {
  ensureStorage();

  try {
    return JSON.parse(storage[prefixKey + key]);
  } catch (error) {}
}
function set(key, value) {
  ensureStorage();

  try {
    storage[prefixKey + key] = _JSON$stringify__default["default"](value);
  } catch (error) {}
}
function remove(key) {
  ensureStorage();
  delete storage[prefixKey + key];
}
function setWithEvent(key, value, eventName) {
  try {
    set(key, value);
    var event = new Event(eventName);
    window.dispatchEvent(event);
  } catch (error) {}
}

var clientLocal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    set: set,
    remove: remove,
    setWithEvent: setWithEvent
});

function ownKeys$8(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }

function request(_x, _x2) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref, callback) {
    var coreUrl, _ref$url, rawUrl, apiKey, qs, _ref$method, method, headers, body, url, key, response, json;

    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            coreUrl = _ref.coreUrl, _ref$url = _ref.url, rawUrl = _ref$url === void 0 ? '' : _ref$url, apiKey = _ref.apiKey, qs = _ref.qs, _ref$method = _ref.method, method = _ref$method === void 0 ? 'get' : _ref$method, headers = _ref.headers, body = _ref.body;
            _context.prev = 1;
            url = new _URL__default["default"](rawUrl, coreUrl);

            if (apiKey) {
              _context.next = 5;
              break;
            }

            throw new Error('`apiKey` needs to be configured, please see README');

          case 5:
            // @ts-expect-error
            for (key in qs) {
              url.searchParams.append(key, qs[key]);
            }

            _context.next = 8;
            return fetch__default["default"](String(url), {
              method: method,
              body: body,
              headers: _objectSpread$8({
                Accept: 'application/json'
              }, headers, {
                'X-Api-Key': apiKey
              }),
              credentials: 'same-origin'
            });

          case 8:
            response = _context.sent;

            if (!(response.status >= 200 && response.status < 300 || response.status === 304)) {
              _context.next = 15;
              break;
            }

            _context.next = 12;
            return response.json();

          case 12:
            json = _context.sent;
            callback == null ? void 0 : callback(null, json);
            return _context.abrupt("return", json);

          case 15:
            throw error(new Error('Core API error'), {
              code: 'CoreAPIError',
              statusCode: response.status
            });

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](1);
            callback == null ? void 0 : callback(_context.t0);
            throw _context.t0;

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 18]]);
  }));
  return _request.apply(this, arguments);
}

var Controls = /*#__PURE__*/_createClass__default["default"](function Controls(viewer) {
  var _this = this;

  this.viewer = void 0;
  this.progressEl = void 0;

  this.destroy = function () {
    window.removeEventListener('scroll', _this.scroll, false);
  };

  this.scroll = function () {
    var progress = Math.round(window.pageYOffset / (document.body.scrollHeight - window.innerHeight) * 100);
    _this.progressEl.textContent = "".concat(progress, " %");

    _this.viewer.trigger('progress', {
      progress: progress
    });
  };

  this.viewer = viewer;
  this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');

  if (this.progressEl) {
    this.scroll();
    window.addEventListener('scroll', this.scroll, false);
  }
});

function formatUnit(unit) {
  if (!unit) return 0;
  if (typeof unit === 'number') return unit + 'px';
  if (typeof unit === 'string') return unit.replace('dp', 'px');
  return 0;
}

function escapeAttrValue(value) {
  return typeof value === 'string' ? value.replace(/"/g, '&quot;') : value;
}

function isDefinedStr(value) {
  return typeof value === 'string' && value.length > 0;
}

function escapeHTML(unsafe) {
  return unsafe ? unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : '';
}

function formatSpans(text, spans) {
  var result = [];

  if (spans.length === 0) {
    result.push({
      text: text
    });
  } else if (spans[0].start > 0) {
    result.push({
      text: _sliceInstanceProperty__default["default"](text).call(text, 0, spans[0].start)
    });
  }

  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var endIndex = span.end;
    result.push({
      text: _sliceInstanceProperty__default["default"](text).call(text, span.start, endIndex),
      span: span
    });

    if (i === spans.length - 1) {
      if (endIndex < text.length) {
        result.push({
          text: _sliceInstanceProperty__default["default"](text).call(text, endIndex, text.length)
        });
      }
    } else if (endIndex < spans[i + 1].start) {
      result.push({
        text: _sliceInstanceProperty__default["default"](text).call(text, endIndex, spans[i + 1].start)
      });
    }
  }

  return result.reduce(function (memo, item) {
    var _item$span;

    var escapedText = escapeHTML(item.text || '');

    if ((_item$span = item.span) != null && _item$span.name) {
      if (item.span.name === 'link' && item.span.url) {
        return memo + '<a href="' + encodeURI(item.span.url) + '" rel="external" target="_blank">' + escapedText + '</a>';
      }

      return memo + '<span data-name="' + item.span.name + '">' + escapedText + '</span>';
    }

    return memo + escapedText;
  }, '');
}

var matches = typeof Element !== 'undefined' && (Element.prototype.matches || // @ts-expect-error
Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);

function closest(el, s) {
  do {
    // @ts-expect-error
    if (matches.call(el, s)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);

  return null;
}

var flexAlignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
var flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
var flexDirectionModes = ['row', 'column'];
var backgroundTileModes = ['repeat_x', 'repeat_y', 'repeat'];
var strokeStyles = ['solid', 'dotted', 'dashed'];

function renderView(view, canLazyload) {
  var tagName = 'div';
  var contents;
  var classNames = ['incito__view'];
  var styles = {};
  var attrs = {};

  switch (view.view_name) {
    case 'TextView':
      {
        tagName = 'p';
        classNames.push('incito__text-view');
        var textStyles = (view.text_style || '').split('|');
        var text = view.text;
        text = Array.isArray(view.spans) && view.spans.length > 0 ? formatSpans(text, view.spans) : escapeHTML(text);

        if (view.text_prevent_widow) {
          text = text.replace(/&nbsp;([^\s]+)$/, ' $1').replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
        }

        contents = text.replace(/\n/g, '<br>');

        if (Array.isArray(view.font_family) && view.font_family.length > 0) {
          styles['font-family'] = view.font_family.join(', ');
        }

        if (view.text_size != null) {
          styles['font-size'] = "".concat(view.text_size, "px");
        }

        if (view.line_spacing_multiplier != null) {
          styles['line-height'] = view.line_spacing_multiplier;
        }

        if (view.text_color) {
          styles.color = view.text_color;
        }

        if (textStyles.indexOf('bold') !== -1) {
          styles['font-weight'] = 'bold';
        }

        if (textStyles.indexOf('italic') !== -1) {
          styles['font-style'] = 'italic';
        }

        if (Array.isArray(view.text_decoration_line)) {
          styles['text-decoration-line'] = view.text_decoration_line.join(' ');
        }

        if (isDefinedStr(view.text_shadow)) {
          styles['text-shadow'] = view.text_shadow;
        } else if (isDefinedStr(view.text_shadow_color)) {
          var dx = typeof view.text_shadow_dx === 'number' ? view.text_shadow_dx : 0;
          var dy = typeof view.text_shadow_dy === 'number' ? view.text_shadow_dy : 0;
          var radius = typeof view.text_shadow_radius === 'number' ? view.text_shadow_radius : 0;
          var color = view.text_shadow_color;
          styles['text-shadow'] = [dx, dy, radius, color].join('px ');
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

        break;
      }

    case 'ImageView':
      {
        tagName = 'img';
        classNames.push('incito__image-view');
        attrs.onerror = "this.style.display='none'";
        var src = String(new _URL__default["default"](view.src));

        if (isDefinedStr(view.src)) {
          if (canLazyload) {
            classNames.push('incito--lazy');
            attrs['data-src'] = src;
          } else {
            attrs.src = src;
          }
        }

        if (isDefinedStr(view.label)) attrs['alt'] = view.label;
        break;
      }

    case 'VideoView':
      {
        tagName = 'video';
        classNames.push('incito__video-view');
        attrs.muted = '';
        attrs.playsinline = '';
        attrs.preload = 'none';
        attrs.poster = 'noposter';

        var _src = String(new _URL__default["default"](view.src));

        if (canLazyload) {
          attrs['data-src'] = _src;
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
          attrs.src = _src;
          attrs.controls = '';
        }

        if (canLazyload) classNames.push('incito--lazy');
        break;
      }

    case 'HTMLView':
      {
        if (isDefinedStr(view.style)) {
          var _context;

          _trimInstanceProperty__default["default"](_context = view.style).call(_context).split(';').forEach(function (style) {
            var _style$trim$split = _trimInstanceProperty__default["default"](style).call(style).split(':'),
                key = _style$trim$split[0],
                value = _style$trim$split[1];

            styles[key] = value;
          });
        }

        break;
      }

    case 'VideoEmbedView':
    case 'HTMLEmbedView':
      {
        tagName = 'iframe';
        classNames.push('incito__html-embed-view');
        attrs.sandbox = 'allow-scripts allow-same-origin';
        attrs.allowfullscreen = '';

        var _src2 = String(new _URL__default["default"](view.src));

        if (canLazyload) {
          classNames.push('incito--lazy');
          attrs['data-src'] = _src2;
        } else {
          attrs.src = _src2;
        }

        break;
      }

    case 'IncitoEmbedView':
      {
        classNames.push('incito__incito-embed-view');

        if (canLazyload) {
          classNames.push('incito--lazy');
          attrs['data-src'] = String(new _URL__default["default"](view.src));

          if (view.method === 'get' || view.method === 'post') {
            attrs['data-method'] = view.method;
          }

          if (view.body) {
            attrs['data-body'] = encodeURIComponent(_JSON$stringify__default["default"](view.body));
          }
        }

        break;
      }

    case 'AbsoluteLayout':
      {
        classNames.push('incito__absolute-layout-view');
        break;
      }

    case 'FlexLayout':
      {
        classNames.push('incito__flex-layout-view');
        styles.display = 'flex';

        if (flexAlignItemModes.indexOf(view.layout_flex_align_items) !== -1) {
          styles['align-items'] = styles['ms-align-items'] = view.layout_flex_align_items;
        }

        if (flexJustifyModes.indexOf(view.layout_flex_justify_content) !== -1) {
          styles['justify-content'] = styles['ms-flex-pack'] = view.layout_flex_justify_content;
        }

        if (flexDirectionModes.indexOf(view.layout_flex_direction) !== -1) {
          styles['flex-direction'] = styles['ms-flex-direction'] = view.layout_flex_direction;
        }

        break;
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

  if (Array.isArray(view.feature_labels)) {
    var _context2;

    var featureLabels = _filterInstanceProperty__default["default"](_context2 = view.feature_labels).call(_context2, function (featureLabel) {
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
    if (canLazyload) {
      classNames.push('incito--lazy');
      attrs['data-bg'] = view.background_image;
    } else {
      styles['background-image'] = "url(".concat(view.background_image, ")");
    }
  }

  if (backgroundTileModes.indexOf(view.background_tile_mode) !== -1) {
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

  if (isDefinedStr(view.shadow_color)) {
    var _dx = typeof view.shadow_dx === 'number' ? view.shadow_dx : 0;

    var _dy = typeof view.shadow_dy === 'number' ? view.shadow_dy : 0;

    var _radius = typeof view.shadow_radius === 'number' ? view.shadow_radius : 0;

    var _color = view.shadow_color;
    styles['box-shadow'] = [_dx, _dy, _radius, _color].join('px ');
  }

  if (view.stroke_width != null) {
    styles['border-width'] = formatUnit(view.stroke_width);
  }

  if (view.stroke_color) {
    styles['border-color'] = view.stroke_color;
  }

  if (strokeStyles.indexOf(view.stroke_style) !== -1) {
    styles['border-style'] = view.stroke_style;
  }

  if (view.stroke_top_width != null) {
    styles['border-top-width'] = formatUnit(view.stroke_top_width);
  }

  if (view.stroke_top_color) {
    styles['border-top-color'] = view.stroke_top_color;
  }

  if (view.stroke_left_width != null) {
    styles['border-left-width'] = formatUnit(view.stroke_left_width);
  }

  if (view.stroke_left_color) {
    styles['border-left-color'] = view.stroke_left_color;
  }

  if (view.stroke_right_width != null) {
    styles['border-right-width'] = formatUnit(view.stroke_right_width);
  }

  if (view.stroke_right_color) {
    styles['border-right-color'] = view.stroke_right_color;
  }

  if (view.stroke_bottom_width != null) {
    styles['border-bottom-width'] = formatUnit(view.stroke_bottom_width);
  }

  if (view.stroke_bottom_color) {
    styles['border-bottom-color'] = view.stroke_bottom_color;
  }

  if (typeof view.layout_flex_shrink === 'number') {
    styles['flex-shrink'] = styles['ms-flex-shrink'] = view.layout_flex_shrink;
  }

  if (typeof view.layout_flex_grow === 'number') {
    styles['flex-grow'] = styles['ms-flex-grow'] = view.layout_flex_grow;
  }

  if (view.layout_flex_basis != null) {
    styles['flex-basis'] = styles['ms-flex-basis'] = formatUnit(view.layout_flex_basis);
  }

  var transforms = [];
  var translateX = formatUnit(view.transform_translate_x);
  var translateY = formatUnit(view.transform_translate_y);
  if (translateX !== 0) transforms.push("translateX(".concat(translateX, ")"));
  if (translateY !== 0) transforms.push("translateY(".concat(translateY, ")"));

  if (typeof view.transform_rotate === 'number' && view.transform_rotate !== 0) {
    transforms.push("rotate(".concat(view.transform_rotate, "deg)"));
  }

  if (typeof view.transform_scale === 'number' && view.transform_scale !== 1) {
    transforms.push("scale(".concat(view.transform_scale, ")"));
  }

  if (transforms.length > 0) styles.transform = transforms.join(' '); // Transform origin.

  if (Array.isArray(view.transform_origin) && view.transform_origin.length === 2) {
    styles['transform-origin'] = formatUnit(view.transform_origin[0]) + ' ' + formatUnit(view.transform_origin[1]);
  }

  attrs.style = '';

  for (var key in styles) {
    attrs.style += key + ':' + styles[key] + ';';
  }

  attrs.class = classNames.join(' ');
  return {
    tagName: tagName,
    contents: contents,
    attrs: attrs
  };
}

var Incito = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](Incito, _MicroEvent);

  //@ts-expect-error
  function Incito(containerEl, _temp) {
    var _this;

    var _ref = _temp === void 0 ? {} : _temp,
        incito = _ref.incito;

    _this = _MicroEvent.call(this) || this;
    _this.containerEl = void 0;
    _this.incito = void 0;
    _this.el = void 0;
    _this.ids = void 0;
    _this.sections = void 0;
    _this.canLazyload = void 0;
    _this.styleEl = void 0;
    _this.lazyObserver = void 0;
    _this.videoObserver = void 0;
    _this.containerEl = containerEl;
    _this.incito = incito;
    _this.el = document.createElement('div');
    _this.ids = {};
    _this.sections = [];
    _this.canLazyload = 'IntersectionObserver' in window;

    _this.render();

    return _this;
  }

  var _proto = Incito.prototype;

  _proto.render = function render() {
    var theme = this.incito.theme || {};

    if (this.incito.font_assets) {
      var styleEl = document.createElement('style');

      for (var key in this.incito.font_assets) {
        var _context3;

        var src = this.incito.font_assets[key].src;

        var urls = _mapInstanceProperty__default["default"](src).call(src, function (item) {
          return "url(\"".concat(item[1], "\")");
        }).join(', ');

        var rule = _concatInstanceProperty__default["default"](_context3 = "@font-face { font-family: \"".concat(key, "\"; font-display: swap; src: ")).call(_context3, urls, "; }");

        styleEl.appendChild(document.createTextNode(rule));
      }

      document.head.appendChild(styleEl);
    }

    this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
    this.el.className = 'incito';

    if (Array.isArray(theme.font_family)) {
      this.el.style.fontFamily = theme.font_family.join(', ');
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
      //@ts-expect-error
      this.el.style.lineHeight = theme.line_spacing_multiplier;
    } // By setting the language we help the browser with stuff like hyphenation.


    if (this.incito.locale) {
      this.el.setAttribute('lang', this.incito.locale);
    }

    this.el.innerHTML = this.renderHtml(this.incito.root_view);
    this.containerEl.appendChild(this.el);
    if (this.canLazyload) this.enableLazyloading();
  };

  _proto.start = function start() {
    this.el.addEventListener('click', function (e) {
      var el = closest(e.target, '.incito__view [data-link]');
      var link = el ? el.dataset.link : null;
      if (isDefinedStr(link)) window.open(link, '_blank');
    });
    if (this.canLazyload) this.observeElements(this.el);
    this.trigger('started', 'a', 'b', 'c');
  };

  _proto.destroy = function destroy() {
    if (this.lazyObserver) this.lazyObserver.disconnect();
    if (this.videoObserver) this.videoObserver.disconnect();
    this.containerEl.removeChild(this.el);
    if (this.styleEl) this.styleEl.parentNode.removeChild(this.styleEl);
    this.trigger('destroyed');
  };

  _proto.observeElements = function observeElements(el) {
    var _this2 = this;

    el.querySelectorAll('.incito--lazy').forEach(function (el) {
      _this2.lazyObserver.observe(el);
    });
    el.querySelectorAll('.incito__video-view[data-autoplay=true]').forEach(function (el) {
      _this2.videoObserver.observe(el);
    });
  };

  _proto.loadEl = function loadEl(el) {
    var _this3 = this;

    if (el.tagName.toLowerCase() === 'video' && !el.dataset.isLazyloaded) {
      var sourceEl = document.createElement('source');
      sourceEl.setAttribute('src', el.dataset.src);
      sourceEl.setAttribute('type', el.dataset.mime);
      el.appendChild(sourceEl);
      el.load();
      el.dataset.isLazyloaded = true;
    } else if (el.classList.contains('incito__incito-embed-view')) {
      var _el$dataset = el.dataset,
          url = _el$dataset.src,
          _el$dataset$method = _el$dataset.method,
          method = _el$dataset$method === void 0 ? 'get' : _el$dataset$method,
          body = _el$dataset.body;
      fetch__default["default"](url, {
        method: method,
        body: body ? JSON.parse(decodeURIComponent(body)) : null
      }).then(function (res) {
        if (res.status === 200) return res.json();
      }).then(function (res) {
        el.innerHTML = _this3.renderHtml(res);

        _this3.observeElements(el);
      });
    } else if (el.dataset.bg) {
      el.style.backgroundImage = "url(".concat(el.dataset.bg, ")");
    } else if (el.dataset.src) {
      el.src = el.dataset.src;
    }
  };

  _proto.enableLazyloading = function enableLazyloading() {
    var _this4 = this;

    this.lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          _this4.loadEl(entry.target);

          _this4.lazyObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '500px 0px'
    });
    this.videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var autoplayState = // @ts-expect-error
          entry.target.dataset.autoplayState;

          _this4.loadEl(entry.target);

          _this4.lazyObserver.unobserve(entry.target);

          if (!autoplayState || autoplayState === 'paused') {
            // @ts-expect-error
            entry.target.dataset.autoplayState = 'playing'; // @ts-expect-error

            entry.target.play();
          } // @ts-expect-error

        } else if (!entry.target.paused) {
          // @ts-expect-error
          entry.target.dataset.autoplayState = 'paused'; // @ts-expect-error

          entry.target.pause();
        }
      });
    }, {
      threshold: 0.25
    });
  };

  _proto.renderHtml = function renderHtml(view) {
    var html = '';

    try {
      var _renderView = renderView(view, this.canLazyload),
          tagName = _renderView.tagName,
          contents = _renderView.contents,
          attrs = _renderView.attrs;

      var id = view.id,
          child_views = view.child_views,
          meta = view.meta,
          role = view.role;
      if (id != null && typeof meta === 'object') this.ids[id] = meta;
      if (role === 'section') this.sections.push({
        id: id,
        meta: meta
      });
      html += '<' + tagName;

      for (var key in attrs) {
        html += ' ' + key + '="' + attrs[key] + '"';
      }

      html += '>';

      if (Array.isArray(child_views)) {
        for (var i = 0; i < child_views.length; i++) {
          html += this.renderHtml(child_views[i]);
        }
      }

      if (contents) html += contents;
      html += '</' + tagName + '>';
    } catch (_unused) {}

    return html;
  };

  return _createClass__default["default"](Incito);
}(MicroEvent__default["default"]);

var IncitoPublicationEventTracking = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](IncitoPublicationEventTracking, _MicroEvent);

  function IncitoPublicationEventTracking(eventTracker, details) {
    var _this;

    _this = _MicroEvent.call(this) || this;
    _this.eventTracker = void 0;
    _this.details = void 0;
    _this.eventTracker = eventTracker;
    _this.details = details;
    return _this;
  }

  var _proto = IncitoPublicationEventTracking.prototype;

  _proto.trackOpened = function trackOpened() {
    if (!this.eventTracker || !this.details) return this;
    this.eventTracker.trackIncitoPublicationOpened({
      'ip.paged': this.details.types.indexOf('paged') > -1,
      'ip.id': this.details.id,
      vt: this.eventTracker.createViewToken(this.details.id)
    });
    return this;
  };

  return _createClass__default["default"](IncitoPublicationEventTracking);
}(MicroEvent__default["default"]);

var Viewer$1 = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](Viewer, _MicroEvent);

  // @ts-expect-error
  function Viewer(el, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _MicroEvent.call(this) || this;
    _this.el = void 0;
    _this.options = void 0;
    _this.incito = void 0;
    _this._eventTracking = void 0;
    _this.el = el;
    _this.options = options;
    _this.incito = new Incito(_this.el, {
      incito: _this.options.incito
    });
    _this._eventTracking = new IncitoPublicationEventTracking(_this.options.eventTracker, _this.options.details);
    return _this;
  }

  var _proto = Viewer.prototype;

  _proto.start = function start() {
    this.incito.start();
    this.el.classList.add('sgn-incito--started');

    this._eventTracking.trackOpened();

    return this;
  };

  _proto.destroy = function destroy() {
    this.incito.destroy();
  };

  return _createClass__default["default"](Viewer);
}(MicroEvent__default["default"]);

Viewer$1.Incito = Incito;

function getDeviceCategory() {
  if (navigator.platform === 'iPod' || navigator.platform === 'iPhone') return 'mobile';
  if (navigator.platform === 'iPad') return 'tablet';

  if (navigator.platform === 'Android' || /android/gi.test(navigator.userAgent)) {
    if (/tablet/gi.test(navigator.userAgent)) return 'tablet';
    return 'mobile';
  }

  return 'desktop';
}

function getLocale() {
  var localeChain = [];

  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    localeChain.push.apply(localeChain, _toConsumableArray__default["default"](navigator.languages));
  } else if (typeof navigator.language === 'string' && navigator.language) {
    localeChain.push(navigator.language);
  } else if ( // @ts-expect-error
  typeof navigator.browserLanguage === 'string' && // @ts-expect-error
  navigator.browserLanguage) {
    // @ts-expect-error
    localeChain.push(navigator.browserLanguage);
  }

  localeChain.push('en_US');
  return _findInstanceProperty__default["default"](localeChain).call(localeChain, function (prefLocale) {
    if (!prefLocale) return;
    prefLocale = prefLocale.replace('-', '_');
    if (/[a-z][a-z]_[A-Z][A-Z]/g.test(prefLocale)) return prefLocale;
  });
}

var Bootstrapper$1 = /*#__PURE__*/function () {
  // @ts-expect-error
  function Bootstrapper(options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    this.deviceCategory = getDeviceCategory();
    this.pixelRatio = window.devicePixelRatio || 1;
    this.pointer = matchMedia('(pointer:coarse)').matches ? 'coarse' : 'fine';
    this.orientation = screen.width >= screen.height ? 'horizontal' : 'vertical';
    this.time = new Date().toISOString();
    this.locale = getLocale();
    this.featureLabels = this.getFeatureLabels();
    this.versionsSupported = ['1.0.0'];
    this.options = void 0;
    this.maxWidth = void 0;

    this.fetchDetails = function (id, callback) {
      return request({
        apiKey: _this.options.apiKey,
        coreUrl: _this.options.coreUrl,
        url: "/v2/catalogs/".concat(id)
      }, callback);
    };

    this.fetchIncito = function (id, callback) {
      return request({
        apiKey: _this.options.apiKey,
        coreUrl: _this.options.coreUrl,
        url: '/v4/rpc/generate_incito_from_publication',
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: _JSON$stringify__default["default"]({
          id: id,
          device_category: _this.deviceCategory,
          pointer: _this.pointer,
          orientation: _this.orientation,
          pixel_ratio: _this.pixelRatio,
          max_width: _this.maxWidth,
          versions_supported: _this.versionsSupported,
          locale_code: _this.locale,
          time: _this.time,
          feature_labels: _this.anonymizeFeatureLabels( // @ts-expect-error
          _this.featureLabels)
        })
      }, callback);
    };

    this.options = options;
    this.maxWidth = Math.abs(window.orientation) === 90 ? Math.min(this.options.el.offsetWidth, screen.width) : this.options.el.offsetWidth;
  }

  var _proto = Bootstrapper.prototype;

  _proto.getFeatureLabels = function getFeatureLabels() {
    var featureLabels = get('incito-feature-labels');
    return Array.isArray(featureLabels) ? featureLabels : [];
  };

  _proto.anonymizeFeatureLabels = function anonymizeFeatureLabels() {
    var _context;

    var count = this.featureLabels.length;
    var vector = this.featureLabels.reduce(function (acc, cur) {
      if (!acc[cur]) acc[cur] = {
        key: cur,
        value: 0
      };
      acc[cur].value++;
      return acc;
    }, {});
    return _mapInstanceProperty__default["default"](_context = _Object$values__default["default"](vector)).call(_context, function (featureLabel) {
      return {
        key: featureLabel.key,
        value: Math.round(featureLabel.value / count * 100) / 100
      };
    });
  };

  _proto.fetch = /*#__PURE__*/function () {
    var _fetch = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(callback) {
      var _yield$Promise$all, details, incito, data;

      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _Promise__default["default"].all([this.fetchDetails(this.options.id), this.fetchIncito(this.options.id)]);

            case 3:
              _yield$Promise$all = _context2.sent;
              details = _yield$Promise$all[0];
              incito = _yield$Promise$all[1];
              data = {
                details: details,
                incito: incito
              };
              if (typeof callback === 'function') callback(null, data);
              return _context2.abrupt("return", data);

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);

              if (!(typeof callback === 'function')) {
                _context2.next = 17;
                break;
              }

              callback(_context2.t0);
              _context2.next = 18;
              break;

            case 17:
              throw _context2.t0;

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this, [[0, 11]]);
    }));

    function fetch(_x) {
      return _fetch.apply(this, arguments);
    }

    return fetch;
  }();

  _proto.createViewer = function createViewer(_ref) {
    var details = _ref.details,
        incito = _ref.incito;
    var self = this;

    if (!incito) {
      throw error(new Error('You need to supply a valid Incito to create a viewer'));
    }

    var viewer = new Viewer$1(this.options.el, {
      id: this.options.id,
      details: details,
      incito: incito,
      eventTracker: this.options.eventTracker
    });
    var controls = new Controls(viewer);
    viewer.incito.bind('destroy', controls.destroy); // Persist clicks on feature labels for later anonymization.

    on(viewer.el, 'click', '.incito__view[data-feature-labels]', function () {
      var _context3;

      var featureLabels = this.dataset.featureLabels.split(',');
      self.featureLabels = _concatInstanceProperty__default["default"](_context3 = self.featureLabels).call(_context3, featureLabels);

      while (self.featureLabels.length > 1000) {
        self.featureLabels.shift();
      }

      set('incito-feature-labels', self.featureLabels);
    });
    return viewer;
  };

  return _createClass__default["default"](Bootstrapper);
}();

var ESC = 27;
var ARROW_RIGHT = 39;
var ARROW_LEFT = 37;
var SPACE = 32;
var NUMBER_ONE = 49;

var da_DK = {
  locale_code: 'da_DK',
  publication_viewer_shopping_list_label: 'Indkøbsliste',
  publication_viewer_shopping_list_clear_button: 'Ryd indkøbsliste',
  publication_viewer_delete_crossed_out_button: 'Slet overstregede varer',
  publication_viewer_print_button: 'Print',
  publication_viewer_download_button: 'Hent',
  publication_viewer_until_label: 'Til og med',
  publication_viewer_offer_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_menu_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_expires_in_days_label: '(Udløber om {{days}} dage)',
  publication_viewer_valid_in_days_label: '(Gælder om {{days}} dage)',
  publication_viewer_expired_label: '(Udløb)',
  publication_viewer_pages_button: 'Sider',
  publication_viewer_offers_button: 'Tilbud',
  publication_viewer_search_text: 'Søg',
  publication_viewer_currency: 'DKK',
  publication_viewer_hotspot_picker_header: 'Hvilket tilbud mente du?',
  publication_viewer_overview_button: 'Oversigt',
  publication_viewer_close_label: 'Tilbage',
  publication_viewer_add_to_shopping_list: 'Tilføj til indkøbsliste',
  publication_viewer_visit_webshop_link: 'Besøg webshoplink'
};

var en_US = {
  locale_code: 'en_US',
  publication_viewer_shopping_list_label: 'Shopping List',
  publication_viewer_shopping_list_clear_button: 'Clear list',
  publication_viewer_delete_crossed_out_button: 'Delete crossed out items',
  publication_viewer_print_button: 'Print',
  publication_viewer_download_button: 'Download PDF',
  publication_viewer_until_label: 'Through',
  publication_viewer_offer_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_menu_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_expires_in_days_label: '(Expires in {{days}} days)',
  publication_viewer_valid_in_days_label: '(Valid in {{days}} days)',
  publication_viewer_expired_label: '(Expired)',
  publication_viewer_pages_button: 'Pages',
  publication_viewer_offers_button: 'Offers',
  publication_viewer_search_text: 'Search',
  publication_viewer_currency: 'USD',
  publication_viewer_hotspot_picker_header: 'Which offer did you mean?',
  publication_viewer_overview_button: 'Overview',
  publication_viewer_close_label: 'Close',
  publication_viewer_add_to_shopping_list: 'Add to Shopping List',
  publication_viewer_visit_webshop_link: 'Visit Webshop Link'
};

var sv_SE = {
  locale_code: 'sv_SE',
  publication_viewer_shopping_list_label: 'Inköpslista',
  publication_viewer_shopping_list_clear_button: 'Tydlig lista',
  publication_viewer_delete_crossed_out_button: 'Ta bort överstrukna objekt',
  publication_viewer_print_button: 'Skriva ut',
  publication_viewer_download_button: 'Ladda ner',
  publication_viewer_until_label: 'Till slut',
  publication_viewer_offer_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_menu_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_expires_in_days_label: '(Går ut om {{days}} dagar)',
  publication_viewer_valid_in_days_label: '(Gäller in {{days}} days)',
  publication_viewer_expired_label: '(Utgånget)',
  publication_viewer_pages_button: 'Sidor',
  publication_viewer_offers_button: 'Erbjudanden',
  publication_viewer_search_text: 'Sök',
  publication_viewer_currency: 'SEK',
  publication_viewer_hotspot_picker_header: 'Vilket erbjudande menade du?',
  publication_viewer_overview_button: 'Översikt',
  publication_viewer_close_label: 'Tillbaka',
  publication_viewer_add_to_shopping_list: 'Lägg till inköpslista',
  publication_viewer_visit_webshop_link: 'Besök webbshoplänk'
};

var nb_NO = {
  locale_code: 'nb_NO',
  publication_viewer_shopping_list_label: 'Handleliste',
  publication_viewer_shopping_list_clear_button: 'Klar liste',
  publication_viewer_delete_crossed_out_button: 'Slett overstrekede elementer',
  publication_viewer_print_button: 'Skrive ut',
  publication_viewer_download_button: 'nedlasting',
  publication_viewer_until_label: 'Igjennom',
  publication_viewer_offer_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_menu_date_range: '{{{from}}} - {{{till}}}',
  publication_viewer_expires_in_days_label: '(Utløper in {{days}} dager)',
  publication_viewer_valid_in_days_label: '(Gyldig om {{days}} dager)',
  publication_viewer_expired_label: '(Utløpt)',
  publication_viewer_pages_button: 'Sider',
  publication_viewer_offers_button: 'Tilbud',
  publication_viewer_search_text: 'Søk',
  publication_viewer_currency: 'NOK',
  publication_viewer_hotspot_picker_header: 'Hvilket tilbud mente du?',
  publication_viewer_overview_button: 'oversikt',
  publication_viewer_close_label: 'Tilbake',
  publication_viewer_add_to_shopping_list: 'Legg til handleliste',
  publication_viewer_visit_webshop_link: 'Besøk nettbutikklink'
};

var locales = /*#__PURE__*/Object.freeze({
    __proto__: null,
    da_dk: da_DK,
    en_us: en_US,
    sv_se: sv_SE,
    nb_no: nb_NO
});

var destroyModal = function destroyModal() {
  var pubContainer = document.querySelector('.sgn__pp') || document.querySelector('.sgn__incito');
  var modalContainer = document.querySelector('.sgn-modal-container');
  modalContainer == null ? void 0 : modalContainer.classList.add('sgn-modal-container-on-destroy');
  pubContainer == null ? void 0 : pubContainer.focus();
  window.setTimeout(function () {
    var _modalContainer$paren;

    modalContainer == null ? void 0 : (_modalContainer$paren = modalContainer.parentNode) == null ? void 0 : _modalContainer$paren.removeChild(modalContainer);
  }, 300);
};
var createModal = function createModal(container, destroyCallback) {
  if (!document.querySelector('.sgn-modal-container')) {
    var pubContainer = document.querySelector('.sgn__pp') || document.querySelector('.sgn__incito');
    var modalContainer = document.createElement('div');
    var blocker = document.createElement('div');
    blocker.className = 'sgn-blocker';
    pubContainer == null ? void 0 : pubContainer.appendChild(modalContainer);
    modalContainer.className = 'sgn-modal-container';
    modalContainer.tabIndex = -1;
    modalContainer.appendChild(blocker);
    modalContainer.appendChild(container);
    modalContainer.focus();

    var destroy = function destroy(e) {
      e.stopPropagation();
      destroyModal();

      if (typeof destroyCallback === 'function') {
        destroyCallback(e);
      }
    };

    blocker.addEventListener('click', destroy, false);
    modalContainer.addEventListener('keyup', function (e) {
      if (e.keyCode === ESC) {
        destroy(e);
      }
    });
  }
};
var formatPrice = function formatPrice(price, localeCode, currency) {
  if (localeCode === void 0) {
    localeCode = 'en_US';
  }

  if (currency === void 0) {
    currency = 'USD';
  }

  return new Intl.NumberFormat(localeCode.replace('_', '-'), {
    style: 'currency',
    currency: currency
  }).format(price);
};
var parseDateStr = function parseDateStr(dateStr) {
  var parts = dateStr.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/);

  if (parts) {
    return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4] - (+parts[9] || 0) * (parts[8] == '-' ? -1 : 1), +parts[5] - (+parts[10] || 0) * (parts[8] == '-' ? -1 : 1), +parts[6], +((parts[7] || '0') + '00').substring(0, 3)));
  }

  return new Date(NaN);
};
var formatDate = function formatDate(dateStr, options) {
  var scriptEl = document.getElementById('sgn-sdk');
  var dataset = scriptEl == null ? void 0 : scriptEl.dataset;
  var browserLocale = navigator.language || 'en-US';
  var locale = dataset != null && dataset.localeCode ? dataset == null ? void 0 : dataset.localeCode.replace('_', '-') : browserLocale;
  var date = parseDateStr(dateStr);
  return new Intl.DateTimeFormat(locale, options).format(date);
};
var getDateRange = function getDateRange(fromDateStr, tillDateStr, templateKey) {
  var from = formatDate(fromDateStr, {
    day: '2-digit',
    month: '2-digit'
  });
  var till = formatDate(tillDateStr, {
    day: '2-digit',
    month: '2-digit'
  });
  return translate(templateKey, {
    from: from,
    till: till
  });
};
var getPubState = function getPubState(fromDateStr, tillDateStr) {
  var fromDate = parseDateStr(fromDateStr).valueOf();
  var tillDate = parseDateStr(tillDateStr).valueOf();
  var todayDate = new Date().valueOf();

  if (todayDate >= fromDate && todayDate < tillDate) {
    return 'active';
  } else if (todayDate > tillDate) {
    return 'expired';
  } else if (todayDate < fromDate) {
    return 'inactive';
  }

  return null;
};
var getPubStateMessage = function getPubStateMessage(fromDateStr, tillDateStr) {
  var oneDay = 24 * 60 * 60 * 1000;
  var fromDate = parseDateStr(fromDateStr).valueOf();
  var tillDate = parseDateStr(tillDateStr).valueOf();
  var todayDate = new Date().valueOf();
  var status = getPubState(fromDateStr, tillDateStr);

  if (status === 'active') {
    var diffDays = Math.ceil(Math.abs((tillDate - todayDate) / oneDay));
    return translate('publication_viewer_expires_in_days_label', {
      days: diffDays
    });
  } else if (status === 'inactive') {
    var _diffDays = Math.ceil(Math.abs((fromDate - todayDate) / oneDay));

    return translate('publication_viewer_valid_in_days_label', {
      days: _diffDays
    });
  } else if (status === 'expired') {
    return translate('publication_viewer_expired_label');
  }

  return null;
};

var getTranslationOverride = function getTranslationOverride(dataset) {
  if (dataset === void 0) {
    dataset = {};
  }

  return _Object$entries__default["default"](dataset).reduce(function (translationsKeyVal, _ref) {
    var key = _ref[0],
        value = _ref[1];

    if (_includesInstanceProperty__default["default"](key).call(key, 'translationKeys-')) {
      var newKey = key.replace('translationKeys-', '').replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : "_".concat(word.toLowerCase());
      });
      translationsKeyVal[newKey] = value;
    }

    return translationsKeyVal;
  }, {});
};

var translate = function translate(key, view) {
  var _navigator$language, _navigator$language$r, _locales$locale, _locales$locale2, _locales$en_us;

  if (key === void 0) {
    key = '';
  }

  if (view === void 0) {
    view = {};
  }

  var scriptEl = document.getElementById('sgn-sdk');
  var dataset = scriptEl == null ? void 0 : scriptEl.dataset;
  var browserLocale = ((_navigator$language = navigator.language) == null ? void 0 : (_navigator$language$r = _navigator$language.replace('-', '_')) == null ? void 0 : _navigator$language$r.toLocaleLowerCase()) || 'en_us';
  var locale = dataset != null && dataset.localeCode ? dataset.localeCode.replace('-', '_').toLowerCase() : browserLocale;
  var translationOverride = getTranslationOverride(dataset);
  var localeTranslation = typeof ((_locales$locale = locales[locale]) == null ? void 0 : _locales$locale[key]) !== 'undefined' ? (_locales$locale2 = locales[locale]) == null ? void 0 : _locales$locale2[key] : (_locales$en_us = en_US) == null ? void 0 : _locales$en_us[key];
  var template = (translationOverride == null ? void 0 : translationOverride[key]) || localeTranslation || '';
  return Mustache__default["default"].render(template, view);
};
var transformFilter = function transformFilter(filter) {
  var _ref2;

  return (_ref2 = filter || '') == null ? void 0 : _ref2.split(',').reduce(function (queries, filter) {
    var _filter$split = filter.split(':'),
        key = _filter$split[0],
        val = _filter$split[1];

    if (key) {
      queries[key] = val === 'true' ? true : val === 'false' ? false : val;
    }

    return queries;
  }, {});
};
var getColorBrightness$1 = function getColorBrightness(color) {
  color = color.replace('#', '');
  var sum = 0;
  var x = 0;

  while (x < 3) {
    sum += parseInt(color.substring(2 * x, 2), 16) || 0;
    ++x;
  }

  return sum <= 381 ? 'dark' : 'light';
};
var pushQueryParam = function pushQueryParam(queryParams) {
  if (queryParams === void 0) {
    queryParams = {};
  }

  var newUrl = new _URL__default["default"](window.location.href);

  _Object$entries__default["default"](queryParams).forEach(function (_ref3) {
    var _ref4 = _slicedToArray__default["default"](_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    newUrl.searchParams[val ? 'set' : 'delete'](key, String(val));
  });

  window.history.pushState({
    path: String(newUrl)
  }, '', newUrl);
};
var getHashFragments = function getHashFragments(hashParam) {
  var _location$hash$match, _location$hash$match$;

  var hashReg = new RegExp("".concat(hashParam, "/(.*)"));

  var _ref5 = ((_location$hash$match = location.hash.match(hashReg)) == null ? void 0 : (_location$hash$match$ = _location$hash$match[1]) == null ? void 0 : _location$hash$match$.split('/')) || [],
      _ref6 = _slicedToArray__default["default"](_ref5, 2),
      publicationId = _ref6[0],
      pageNum = _ref6[1];

  return {
    publicationId: publicationId,
    pageNum: pageNum
  };
};

var defaultTemplate$a = "{{^disableHeader}}\n    <div class=\"sgn__header\">\n        <div class=\"sgn__nav\">\n            <div class=\"sgn__nav-content\" data-show-labels=\"{{showHeaderLabels}}\">\n            {{^disableClose}}\n                <button class=\"sgn__close-publication\">\n                    <svg\n                        aria-hidden=\"true\"\n                        class=\"sgn-header-icon-svg sgn-header-icon-svg-close\"\n                        role=\"img\" viewBox=\"0 0 320 512\"\n                        xmlns=\"http://www.w3.org/2000/svg\"\n                    >\n                        <path\n                            fill=\"currentColor\"\n                            d=\"M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z\"\n                        >\n                        </path>\n                    </svg>\n                    <div class=\"sgn__nav-label\">\n                        <span>{{translations.close}}</span>\n                    </div>\n                </button>\n            {{/disableClose}}\n            {{^disableShoppingList}}\n                <button class=\"sgn__offer-shopping\">\n                    <svg\n                        aria-hidden=\"true\"\n                        class=\"sgn-header-icon-svg\"\n                        role=\"img\"\n                        viewBox=\"0 0 512 512\"\n                        xmlns=\"http://www.w3.org/2000/svg\"\n                    >\n                        <path\n                            fill=\"currentColor\"\n                            d=\"M48 368a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0-160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 24H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16z\"\n                        >\n                        </path>\n                    </svg>\n                    <div class=\"sgn__offer-shopping-list-count\"></div>\n                    <div class=\"sgn__nav-label\">\n                        <span>{{translations.shoppingList}}</span>\n                    </div>\n                </button>\n            {{/disableShoppingList}}\n            {{^disableMenu}}\n                <button class=\"sgn__nav-menu-btn\">\n                    <svg\n                        aria-hidden=\"true\"\n                        class=\"sgn-header-icon-svg\"\n                        role=\"img\"\n                        viewBox=\"0 0 512 512\"\n                        xmlns=\"http://www.w3.org/2000/svg\"\n                    >\n                        <path\n                            fill=\"currentColor\"\n                            d=\"M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z\"\n                        >\n                        </path>\n                    </svg>\n                    <div class=\"sgn__nav-label\">\n                        <span>{{translations.overview}}</span>\n                    </div>\n                </button>\n            {{/disableMenu}}\n            </div>\n            {{#isIncito}}\n            <div class=\"sgn-incito__scroll-progress\">\n                <div class=\"sgn-incito__scroll-progress-bar\"></div>\n                <span class=\"sgn-incito__scroll-progress-text\"></span>\n            </div>\n            {{/isIncito}}\n            {{^isIncito}}\n            <div class=\"sgn-pp__progress\">\n                <div class=\"sgn-pp-progress__bar\"></div>\n                <div class=\"sgn-pp__progress-label\"></div>\n            </div>\n            {{/isIncito}}\n        </div>\n    </div>\n{{/disableHeader}}";
var defaultShoppingListCounterTemplate = "{{#shoppingListCount}}\n    <div class=\"sgn__offer-shopping-list-counter\">\n        <span>{{shoppingListCount}}</span>\n    </div>\n{{/shoppingListCount}}";

var Header = function Header(_ref) {
  var publicationType = _ref.publicationType,
      template = _ref.template,
      shoppingListCounterTemplate = _ref.shoppingListCounterTemplate,
      el = _ref.el,
      scriptEls = _ref.scriptEls;
  var container = null;
  publicationType = publicationType || 'paged';
  var translations = {
    close: translate('publication_viewer_close_label'),
    shoppingList: translate('publication_viewer_shopping_list_label'),
    overview: translate('publication_viewer_overview_button')
  };

  var renderShoppingListCounter = function renderShoppingListCounter() {
    var _container;

    var shoppingListCountEl = (_container = container) == null ? void 0 : _container.querySelector('.sgn__offer-shopping-list-count');

    if (shoppingListCountEl) {
      var storedPublicationOffers = get('publication-saved-offers');
      shoppingListCountEl.innerHTML = Mustache__default["default"].render((shoppingListCounterTemplate == null ? void 0 : shoppingListCounterTemplate.innerHTML) || defaultShoppingListCounterTemplate, {
        shoppingListCount: storedPublicationOffers == null ? void 0 : storedPublicationOffers.length
      });
    }
  };

  var setNavColor = function setNavColor(color) {
    var _container2;

    var sgnNav = (_container2 = container) == null ? void 0 : _container2.querySelector('.sgn__nav');

    if (sgnNav) {
      sgnNav.style.backgroundColor = color || 'transparent';
      sgnNav.style.color = getColorBrightness$1(color) === 'dark' ? '#ffffff' : '#000000';
    }
  };

  var show = function show(data) {
    var _data, _data$details, _data$details$brandin, _container3, _container3$querySele;

    if (data === void 0) {
      data = {};
    }

    setNavColor("#".concat(((_data = data) == null ? void 0 : (_data$details = _data.details) == null ? void 0 : (_data$details$brandin = _data$details.branding) == null ? void 0 : _data$details$brandin.color) || '2c2c2e'));
    (_container3 = container) == null ? void 0 : (_container3$querySele = _container3.querySelector('.sgn__header')) == null ? void 0 : _container3$querySele.classList.add('sgn-animate-header');
  };

  var addClosePubListener = function addClosePubListener() {
    var _container4;

    var sgnContainer = publicationType === 'incito' ? el == null ? void 0 : el.querySelector('.sgn__incito') : el == null ? void 0 : el.querySelector('.sgn__pp');
    var closeBtn = (_container4 = container) == null ? void 0 : _container4.querySelector('.sgn__close-publication');
    closeBtn == null ? void 0 : closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      destroyPublication(sgnContainer);
    });
    sgnContainer == null ? void 0 : sgnContainer.addEventListener('keyup', function (e) {
      if (e.keyCode === ESC && closeBtn) {
        destroyPublication(sgnContainer);
      }
    }, false);
  };

  var destroyPublication = function destroyPublication(sgnContainer) {
    var _sgnContainer$parentN, _pushQueryParam;

    sgnContainer == null ? void 0 : (_sgnContainer$parentN = sgnContainer.parentNode) == null ? void 0 : _sgnContainer$parentN.removeChild(sgnContainer);
    removeHtmlClass();
    pushQueryParam((_pushQueryParam = {}, _defineProperty__default["default"](_pushQueryParam, scriptEls.publicationIdParam, null), _defineProperty__default["default"](_pushQueryParam, scriptEls.pageIdParam, null), _pushQueryParam));
    location.hash = '';
  };

  var removeHtmlClass = function removeHtmlClass() {
    if (scriptEls.disableGlobalScrollbar) {
      var htmlEl = document.querySelector('html');
      htmlEl == null ? void 0 : htmlEl.classList.remove('sgn-paged-publication--open');
      htmlEl == null ? void 0 : htmlEl.classList.remove('sgn-incito-publication--open');
    }
  };

  var addStorageListener = function addStorageListener() {
    window.addEventListener('tjek_shopping_list_update', renderShoppingListCounter, false);
  };

  var render = function render() {
    container = document.createElement('div');
    container.className = 'sgn__header-content';
    container.innerHTML = Mustache__default["default"].render((template == null ? void 0 : template.innerHTML) || defaultTemplate$a, {
      translations: translations,
      disableHeader: scriptEls.disableHeader,
      disableShoppingList: scriptEls.disableShoppingList || scriptEls.offerClickBehavior === 'open_webshop_link_in_tab' || scriptEls.offerClickBehavior === 'redirect_to_webshop_link',
      disableMenu: scriptEls.disableMenu,
      disableClose: scriptEls.disableClose,
      showHeaderLabels: scriptEls.showHeaderLabels,
      isIncito: publicationType === 'incito'
    });
    renderShoppingListCounter();
    addStorageListener();
    addClosePubListener();
    return container;
  };

  return {
    render: render,
    show: show
  };
};

var defaultTemplate$9 = "    <div class=\"sgn-sections-content\">\n        <ol class=\"sgn-sections-list-items-container\">\n            {{#sections}}\n            <li class=\"sgn-sections-list-item-container\" data-section-id=\"{{view_id}}\">\n                <div class=\"sgn-sections-content-container\">\n                    <div class=\"sgn-sections-list-item-container-div-text\">\n                        <div>\n                            <span>{{title}}</span>\n                        </div>\n                    </div>\n                </div>\n            </li>\n            {{/sections}}\n        </ol>\n    </div>";

var SectionList = function SectionList(_ref) {
  var _template;

  var sgnData = _ref.sgnData,
      template = _ref.template;
  var container = null;
  template = ((_template = template) == null ? void 0 : _template.innerHTML) || defaultTemplate$9;

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var _sgnData$incito;

      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              container = document.createElement('div');
              container.className = 'sgn-sections-container';
              container.innerHTML = Mustache__default["default"].render(template, {
                sections: sgnData == null ? void 0 : (_sgnData$incito = sgnData.incito) == null ? void 0 : _sgnData$incito.table_of_contents
              });
              addSectionClickListener();
              return _context.abrupt("return", container);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var addSectionClickListener = function addSectionClickListener() {
    var _container;

    (_container = container) == null ? void 0 : _container.querySelectorAll('.sgn-sections-list-item-container').forEach(function (itemEl) {
      itemEl.addEventListener('click', scrollToSection, false);
    });
  };

  var scrollToSection = function scrollToSection(e) {
    var _e$currentTarget$data;

    var sectionId = (_e$currentTarget$data = e.currentTarget.dataset) == null ? void 0 : _e$currentTarget$data.sectionId;
    var sectionCell = document.querySelector("[data-id=\"".concat(sectionId, "\"][data-role=\"section\"]"));
    var incitoEl = document.querySelector('.sgn__incito'); // @ts-expect-error

    var sectionOffset = sectionCell.offsetTop - 76 || 0;
    destroyModal();
    incitoEl == null ? void 0 : incitoEl.scrollTo({
      top: sectionOffset,
      behavior: 'smooth'
    });
  };

  return {
    render: render
  };
};

function ownKeys$7(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }
var defaultTemplate$8 = "    <div class=\"sgn-pages-content\">\n        <ol class=\"sgn-pages-list-items-container\">\n            {{#pages}}\n            <li class=\"sgn-pages-list-item-container\">\n                <div class=\"sgn-pages-content-container\">\n                    <a href=\"#\" class=\"sgn-page-item\" data-page-id=\"{{pageId}}\" data-page-num=\"{{pageNum}}\">\n                        <div class=\"sgn-pages-list-item-container-div-text\">\n                            <div class=\"sgn-pages-img-container\">\n                                <img src=\"{{thumb}}\" loading=\"lazy\">\n                            </div>\n                            <div>\n                                <span>{{pageNum}}</span>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </li>\n            {{/pages}}\n        </ol>\n    </div>";

var PageList = function PageList(_ref) {
  var scriptEls = _ref.scriptEls,
      configs = _ref.configs,
      sgnData = _ref.sgnData,
      sgnViewer = _ref.sgnViewer,
      template = _ref.template;
  var container = null;

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var _sgnData$pages;

      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              container = document.createElement('div');
              container.className = 'sgn-pages-container';
              _context.t0 = Mustache__default["default"];
              _context.t1 = (template == null ? void 0 : template.innerHTML) || defaultTemplate$8;
              _context.t2 = transformPages;

              if (!(sgnData != null && (_sgnData$pages = sgnData.pages) != null && _sgnData$pages.length)) {
                _context.next = 9;
                break;
              }

              _context.t3 = sgnData.pages;
              _context.next = 12;
              break;

            case 9:
              _context.next = 11;
              return request({
                apiKey: configs.apiKey,
                coreUrl: configs.coreUrl,
                url: "/v2/catalogs/".concat(configs.id, "/pages")
              });

            case 11:
              _context.t3 = _context.sent;

            case 12:
              _context.t4 = _context.t3;
              _context.t5 = (0, _context.t2)(_context.t4);
              _context.t6 = {
                pages: _context.t5
              };
              container.innerHTML = _context.t0.render.call(_context.t0, _context.t1, _context.t6);
              addPageClickListener();
              return _context.abrupt("return", container);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var addPageClickListener = function addPageClickListener() {
    var _container;

    (_container = container) == null ? void 0 : _container.querySelectorAll('.sgn-page-item').forEach(function (itemEl) {
      itemEl.addEventListener('click', navigateToPage, false);
    });
  };

  var navigateToPage = function navigateToPage(e) {
    var _scriptEls$displayUrl, _scriptEls$displayUrl2;

    e.preventDefault();
    var _e$currentTarget$data = e.currentTarget.dataset,
        pageId = _e$currentTarget$data.pageId,
        pageNum = _e$currentTarget$data.pageNum;
    destroyModal();
    sgnViewer == null ? void 0 : sgnViewer.navigateToPageId(pageId);

    if (((_scriptEls$displayUrl = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl.toLowerCase()) === 'query') {
      var _pushQueryParam;

      pushQueryParam((_pushQueryParam = {}, _defineProperty__default["default"](_pushQueryParam, scriptEls.publicationIdParam, configs.id), _defineProperty__default["default"](_pushQueryParam, scriptEls.pageIdParam, pageNum), _pushQueryParam));
    } else if (((_scriptEls$displayUrl2 = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl2.toLowerCase()) === 'hash') {
      var _context2, _context3;

      location.hash = _concatInstanceProperty__default["default"](_context2 = _concatInstanceProperty__default["default"](_context3 = "".concat(scriptEls.publicationHash, "/")).call(_context3, configs.id, "/")).call(_context2, pageNum);
    }
  };

  var transformPages = function transformPages(pages) {
    return _mapInstanceProperty__default["default"](pages).call(pages, function (page, index) {
      return _objectSpread$7({}, page, {
        pageId: "page".concat(index + 1),
        pageNum: index + 1,
        index: index
      });
    });
  };

  return {
    render: render
  };
};

function ownKeys$6(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }
var defaultTemplate$7 = "    <div class=\"sgn-offers-content\">\n        <div class=\"sgn-offers-search-container\">\n            <input type=\"text\" id=\"sgn-offers-search-text\" class=\"sgn-offers-search-text\" name=\"sgn-offers-search-text\" placeholder=\"{{translations.searchText}}...\">\n        </div>\n        <ol class=\"sgn-offers-list-items-container\">\n            {{#offers}}\n            <li class=\"sgn-offers-list-item-container\">\n                <div class=\"sgn-offers-content-container\" data-page-id=\"{{pageId}}\" data-page-num=\"{{catalog_page}}\" data-view-id=\"{{catalog_view_id}}\">\n                    <div class=\"sgn-offers-content-img\">\n                        <img src=\"{{images.view}}\" alt=\"{{heading}}\">\n                    </div>\n                    <div class=\"sgn-offers-content-text\">\n                        <div class=\"sgn-offers-content-heading\">\n                            <span>{{heading}}</span>\n                        </div>\n                        <div class=\"sgn-offers-content-description\">\n                            <span>{{description}}&nbsp;</span>\n                        </div>\n                        <div class=\"sgn-offers-content-price\">\n                            <span>{{price}}</span>\n                        </div>\n                    </div>\n                    <div class=\"sgn-clearfix\"></div>\n                </div>\n            </li>\n            {{/offers}}\n        </ol>\n    </div>";

var OfferList = function OfferList(_ref) {
  var _match;

  var scriptEls = _ref.scriptEls,
      publicationType = _ref.publicationType,
      configs = _ref.configs,
      sgnViewer = _ref.sgnViewer,
      template = _ref.template;
  publicationType = publicationType || 'paged';
  var offerTemplate = (_match = ((template == null ? void 0 : template.innerHTML) || defaultTemplate$7).match(/(?=\{\{#offers\}\})[\s\S]*(\{\{\/offers\}\})/g)) == null ? void 0 : _match[0];
  var container = null;
  var offersList = [];
  var offset = 0;
  var limit = 24;
  var searchKey = '';
  var translations = {
    localeCode: translate('locale_code'),
    currency: translate('publication_viewer_currency'),
    searchText: translate('publication_viewer_search_text')
  };

  var fetchSearch = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(query) {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (query === void 0) {
                query = '';
              }

              if (!query) {
                _context.next = 9;
                break;
              }

              _context.t1 = transformOffers;
              _context.next = 5;
              return request({
                url: '/v2/offers/search',
                apiKey: configs.apiKey,
                coreUrl: configs.coreUrl,
                qs: {
                  dealer_id: configs.businessId,
                  catalog_id: configs.id,
                  types: publicationType,
                  limit: limit,
                  query: query
                }
              });

            case 5:
              _context.t2 = _context.sent;
              _context.t0 = (0, _context.t1)(_context.t2);
              _context.next = 10;
              break;

            case 9:
              _context.t0 = offersList;

            case 10:
              return _context.abrupt("return", _context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fetchSearch(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var fetchOffers = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(offset, limit) {
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (offset === void 0) {
                offset = 0;
              }

              if (limit === void 0) {
                limit = 24;
              }

              _context2.t0 = transformOffers;
              _context2.next = 5;
              return request({
                apiKey: configs.apiKey,
                coreUrl: configs.coreUrl,
                url: '/v2/offers',
                qs: {
                  dealer_id: configs.businessId,
                  catalog_id: configs.id,
                  types: publicationType,
                  order_by: 'page',
                  offset: offset,
                  limit: limit
                }
              });

            case 5:
              _context2.t1 = _context2.sent;
              return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function fetchOffers(_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var transformOffers = function transformOffers(offers) {
    var _context3;

    var localeCode = translations.localeCode,
        currency = translations.currency;
    return _mapInstanceProperty__default["default"](_context3 = offers || []).call(_context3, function (offer) {
      var _offer$pricing, _offer$pricing2;

      return _objectSpread$6({}, offer, {
        price: formatPrice(offer == null ? void 0 : (_offer$pricing = offer.pricing) == null ? void 0 : _offer$pricing.price, localeCode, (offer == null ? void 0 : (_offer$pricing2 = offer.pricing) == null ? void 0 : _offer$pricing2.currency) || currency),
        pageId: "page".concat(offer.catalog_page || 1)
      });
    });
  };

  var fetchOnScrollEnd = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(e) {
      var offerOl, offers;
      return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              offerOl = e.target;

              if (!(offerOl.scrollHeight - offerOl.scrollTop === offerOl.clientHeight && !searchKey)) {
                _context4.next = 8;
                break;
              }

              _context4.next = 4;
              return fetchOffers(offset += limit, limit);

            case 4:
              offers = _context4.sent;
              offersList = _concatInstanceProperty__default["default"](offersList).call(offersList, offers);
              if (offerTemplate) offerOl.innerHTML += Mustache__default["default"].render(offerTemplate, {
                translations: translations,
                offers: offers
              });
              addOfferClickListener();

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3);
    }));

    return function fetchOnScrollEnd(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var fetchOnSearch = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4(e) {
      var _container;

      var offerOl;
      return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              searchKey = e.target.value || '';
              offerOl = (_container = container) == null ? void 0 : _container.querySelector('.sgn-offers-list-items-container');

              if (!(offerOl && offerTemplate)) {
                _context5.next = 16;
                break;
              }

              _context5.t0 = Mustache__default["default"];
              _context5.t1 = offerTemplate;
              _context5.t2 = translations;

              if (!searchKey) {
                _context5.next = 12;
                break;
              }

              _context5.next = 9;
              return fetchSearch(searchKey);

            case 9:
              _context5.t3 = _context5.sent;
              _context5.next = 13;
              break;

            case 12:
              _context5.t3 = offersList;

            case 13:
              _context5.t4 = _context5.t3;
              _context5.t5 = {
                translations: _context5.t2,
                offers: _context5.t4
              };
              offerOl.innerHTML = _context5.t0.render.call(_context5.t0, _context5.t1, _context5.t5);

            case 16:
              addOfferClickListener();

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4);
    }));

    return function fetchOnSearch(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  var addScrollListener = function addScrollListener() {
    var _container2, _container2$querySele;

    (_container2 = container) == null ? void 0 : (_container2$querySele = _container2.querySelector('.sgn-offers-list-items-container')) == null ? void 0 : _container2$querySele.addEventListener('scroll', fetchOnScrollEnd);
  };

  var addSearchListener = function addSearchListener() {
    var _container3, _container3$querySele;

    (_container3 = container) == null ? void 0 : (_container3$querySele = _container3.querySelector('.sgn-offers-search-text')) == null ? void 0 : _container3$querySele.addEventListener('input', fetchOnSearch);
  };

  var addOfferClickListener = function addOfferClickListener() {
    var _container4;

    (_container4 = container) == null ? void 0 : _container4.querySelectorAll('.sgn-offers-content-container').forEach(function (itemEl) {
      itemEl.addEventListener('click', publicationType === 'incito' ? scrollToOffer : navigateToPage, false);
    });
  };

  var navigateToPage = function navigateToPage(e) {
    var _scriptEls$displayUrl, _scriptEls$displayUrl2;

    e.preventDefault();
    var _e$currentTarget$data = e.currentTarget.dataset,
        pageId = _e$currentTarget$data.pageId,
        pageNum = _e$currentTarget$data.pageNum;
    destroyModal();
    sgnViewer == null ? void 0 : sgnViewer.navigateToPageId(pageId);

    if (((_scriptEls$displayUrl = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl.toLowerCase()) === 'query') {
      var _pushQueryParam;

      pushQueryParam((_pushQueryParam = {}, _defineProperty__default["default"](_pushQueryParam, scriptEls.publicationIdParam, configs.id), _defineProperty__default["default"](_pushQueryParam, scriptEls.pageIdParam, pageNum), _pushQueryParam));
    } else if (((_scriptEls$displayUrl2 = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl2.toLowerCase()) === 'hash') {
      var _context6, _context7;

      location.hash = _concatInstanceProperty__default["default"](_context6 = _concatInstanceProperty__default["default"](_context7 = "".concat(scriptEls.publicationHash, "/")).call(_context7, configs.id, "/")).call(_context6, pageNum);
    }
  };

  var scrollToOffer = function scrollToOffer(e) {
    var _e$currentTarget$data2;

    var viewid = (_e$currentTarget$data2 = e.currentTarget.dataset) == null ? void 0 : _e$currentTarget$data2.viewId;
    var offerCell = document.querySelector("[data-id=\"".concat(viewid, "\"][data-role=\"offer\"]"));
    destroyModal();
    offerCell == null ? void 0 : offerCell.scrollIntoView({
      behavior: 'smooth'
    });
  };

  var render = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee5() {
      return _regeneratorRuntime__default["default"].wrap(function _callee5$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return fetchOffers(0, 24);

            case 2:
              offersList = _context8.sent;
              container = document.createElement('div');
              container.className = 'sgn-offers-container';
              container.innerHTML = Mustache__default["default"].render((template == null ? void 0 : template.innerHTML) || defaultTemplate$7, {
                translations: translations,
                offers: offersList
              });
              addSearchListener();
              addScrollListener();
              addOfferClickListener();
              return _context8.abrupt("return", container);

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee5);
    }));

    return function render() {
      return _ref6.apply(this, arguments);
    };
  }();

  return {
    render: render
  };
};

var PublicationDownload = function PublicationDownload(_ref) {
  var configs = _ref.configs;
  return {
    render: function render() {
      var _document$querySelect;

      (_document$querySelect = document.querySelector('.sgn__offer-download')) == null ? void 0 : _document$querySelect.addEventListener('click', /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
        var _yield$request;

        var pdf_url;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return request({
                  apiKey: configs.apiKey,
                  coreUrl: configs.coreUrl,
                  url: "/v2/catalogs/".concat(configs == null ? void 0 : configs.id, "/download")
                });

              case 2:
                _context.t0 = _yield$request = _context.sent;

                if (!(_context.t0 == null)) {
                  _context.next = 7;
                  break;
                }

                _context.t1 = void 0;
                _context.next = 8;
                break;

              case 7:
                _context.t1 = _yield$request.pdf_url;

              case 8:
                pdf_url = _context.t1;
                if (pdf_url) location.href = pdf_url;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), false);
    }
  };
};

var defaultTemplate$6 = "    <div class=\"sgn-popup-container sgn-menu-popup\">\n        <div class=\"sgn-menu-popup-labels\">\n            <div class=\"sgn-menu-label\">\n                <span>{{label}}</span>\n            </div>\n            <div class=\"sgn-menu-date\">\n                <span data-validity-state=\"{{status}}\">{{dateRange}}</span>\n            </div>\n        </div>\n        {{^disableDownload}}\n            <div class=\"sgn-menu-download\">\n                <button class=\"sgn__offer-download\">{{translations.downloadButton}}</button>\n            </div>\n        {{/disableDownload}}\n        <div class=\"sgn-clearfix\"></div>\n        {{#isIncito}}\n            {{#hasSections}}\n            <div class=\"sgn-menu-tab\">\n                <button class=\"sgn-menu-tab-btn sgn-menu-tab-btn-active\">{{translations.overviewButton}}</button>\n                <button class=\"sgn-menu-tab-btn\">{{translations.offersButton}}</button>\n            </div>\n            <div class=\"sgn-menu-tab-content-container\">\n                <div class=\"sgn-menu-tab-content sgn-menu-tab-content-active\">\n                    <div class=\"sgn-menu-tab-content-sections\"></div>\n                </div>\n                <div class=\"sgn-menu-tab-content\">\n                    <div class=\"sgn-menu-tab-content-offers\"></div>\n                </div>\n            </div>\n            {{/hasSections}}\n            {{^hasSections}}\n            <div class=\"sgn-menu-tab-content-container\">\n                <div class=\"sgn-menu-tab-content sgn-menu-tab-content-active\">\n                    <div class=\"sgn-menu-tab-content-offers\"></div>\n                </div>\n            </div>\n            {{/hasSections}}\n        {{/isIncito}}\n        {{^isIncito}}\n            <div class=\"sgn-menu-tab\">\n                <button class=\"sgn-menu-tab-btn sgn-menu-tab-btn-active\">{{translations.pagesButton}}</button>\n                <button class=\"sgn-menu-tab-btn\">{{translations.offersButton}}</button>\n            </div>\n            <div class=\"sgn-menu-tab-content-container\">\n                <div class=\"sgn-menu-tab-content sgn-menu-tab-content-active\">\n                    <div class=\"sgn-menu-tab-content-pages\"></div>\n                </div>\n                <div class=\"sgn-menu-tab-content\">\n                    <div class=\"sgn-menu-tab-content-offers\"></div>\n                </div>\n        </div>\n        {{/isIncito}}\n    </div>";

var MenuPopup = function MenuPopup(_ref) {
  var publicationType = _ref.publicationType,
      configs = _ref.configs,
      sgnData = _ref.sgnData,
      sgnViewer = _ref.sgnViewer,
      templates = _ref.templates,
      scriptEls = _ref.scriptEls;
  publicationType = publicationType || 'paged';
  var translations = {
    localeCode: translate('locale_code'),
    pagesButton: translate('publication_viewer_pages_button'),
    overviewButton: translate('publication_viewer_overview_button'),
    offersButton: translate('publication_viewer_offers_button'),
    downloadButton: translate('publication_viewer_download_button')
  };
  var container = null;

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var _templates$menuContai, _sgnData$details, _sgnData$details2, _sgnData$details3, _sgnData$details4, _sgnData$details5, _sgnData$details6, _sgnData$details7, _sgnData$details8, _sgnData$incito, _sgnData$incito$table;

      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              container = document.createElement('div');
              container.className = 'sgn-menu-popup-container';
              container.innerHTML = Mustache__default["default"].render(((_templates$menuContai = templates.menuContainer) == null ? void 0 : _templates$menuContai.innerHTML) || defaultTemplate$6, {
                translations: translations,
                label: sgnData == null ? void 0 : (_sgnData$details = sgnData.details) == null ? void 0 : _sgnData$details.label,
                dateRange: getDateRange(sgnData == null ? void 0 : (_sgnData$details2 = sgnData.details) == null ? void 0 : _sgnData$details2.run_from, sgnData == null ? void 0 : (_sgnData$details3 = sgnData.details) == null ? void 0 : _sgnData$details3.run_till, 'publication_viewer_menu_date_range'),
                status: getPubState(sgnData == null ? void 0 : (_sgnData$details4 = sgnData.details) == null ? void 0 : _sgnData$details4.run_from, sgnData == null ? void 0 : (_sgnData$details5 = sgnData.details) == null ? void 0 : _sgnData$details5.run_till),
                statusMessage: getPubStateMessage(sgnData == null ? void 0 : (_sgnData$details6 = sgnData.details) == null ? void 0 : _sgnData$details6.run_from, sgnData == null ? void 0 : (_sgnData$details7 = sgnData.details) == null ? void 0 : _sgnData$details7.run_till),
                disableDownload: sgnData != null && (_sgnData$details8 = sgnData.details) != null && _sgnData$details8.pdf_url ? scriptEls.disableDownload : true,
                isIncito: publicationType === 'incito',
                hasSections: (sgnData == null ? void 0 : (_sgnData$incito = sgnData.incito) == null ? void 0 : (_sgnData$incito$table = _sgnData$incito.table_of_contents) == null ? void 0 : _sgnData$incito$table.length) > 0
              });
              createModal(container);
              renderPageList();
              renderSectionList();
              renderOfferList();
              addTabClickListener();
              renderDownload();

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var addTabClickListener = function addTabClickListener() {
    var _container, _container2;

    var tabContentItems = (_container = container) == null ? void 0 : _container.querySelectorAll('.sgn-menu-tab-content');
    (_container2 = container) == null ? void 0 : _container2.querySelectorAll('.sgn-menu-tab-btn').forEach(function (itemEl, index) {
      itemEl.addEventListener('click', function (e) {
        hideTabContents();

        if (tabContentItems != null && tabContentItems[index]) {
          var _e$currentTarget;

          (_e$currentTarget = e.currentTarget) == null ? void 0 : _e$currentTarget.classList.add('sgn-menu-tab-btn-active');
          tabContentItems[index].classList.add('sgn-menu-tab-content-active');
        }
      }, false);
    });
  };

  var hideTabContents = function hideTabContents() {
    var _container3, _container4;

    (_container3 = container) == null ? void 0 : _container3.querySelectorAll('.sgn-menu-tab-btn').forEach(function (itemEl) {
      itemEl.classList.remove('sgn-menu-tab-btn-active');
    });
    (_container4 = container) == null ? void 0 : _container4.querySelectorAll('.sgn-menu-tab-content').forEach(function (itemEl) {
      itemEl.classList.remove('sgn-menu-tab-content-active');
    });
  };

  var renderPageList = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
      var _container5, _container5$querySele;

      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!((_container5 = container) == null)) {
                _context2.next = 4;
                break;
              }

              _context2.t0 = void 0;
              _context2.next = 14;
              break;

            case 4:
              if (!((_container5$querySele = _container5.querySelector('.sgn-menu-tab-content-pages')) == null)) {
                _context2.next = 8;
                break;
              }

              _context2.t1 = void 0;
              _context2.next = 13;
              break;

            case 8:
              _context2.t2 = _container5$querySele;
              _context2.next = 11;
              return PageList({
                scriptEls: scriptEls,
                configs: configs,
                sgnData: sgnData,
                sgnViewer: sgnViewer,
                template: templates.pageList
              }).render();

            case 11:
              _context2.t3 = _context2.sent;
              _context2.t1 = _context2.t2.appendChild.call(_context2.t2, _context2.t3);

            case 13:
              _context2.t0 = _context2.t1;

            case 14:
              return _context2.abrupt("return", _context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function renderPageList() {
      return _ref3.apply(this, arguments);
    };
  }();

  var renderSectionList = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3() {
      var _container6, _container6$querySele;

      return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!((_container6 = container) == null)) {
                _context3.next = 4;
                break;
              }

              _context3.t0 = void 0;
              _context3.next = 14;
              break;

            case 4:
              if (!((_container6$querySele = _container6.querySelector('.sgn-menu-tab-content-sections')) == null)) {
                _context3.next = 8;
                break;
              }

              _context3.t1 = void 0;
              _context3.next = 13;
              break;

            case 8:
              _context3.t2 = _container6$querySele;
              _context3.next = 11;
              return SectionList({
                sgnData: sgnData,
                template: templates.sectionList
              }).render();

            case 11:
              _context3.t3 = _context3.sent;
              _context3.t1 = _context3.t2.appendChild.call(_context3.t2, _context3.t3);

            case 13:
              _context3.t0 = _context3.t1;

            case 14:
              return _context3.abrupt("return", _context3.t0);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function renderSectionList() {
      return _ref4.apply(this, arguments);
    };
  }();

  var renderOfferList = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4() {
      var _container7, _container7$querySele;

      return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!((_container7 = container) == null)) {
                _context4.next = 4;
                break;
              }

              _context4.t0 = void 0;
              _context4.next = 14;
              break;

            case 4:
              if (!((_container7$querySele = _container7.querySelector('.sgn-menu-tab-content-offers')) == null)) {
                _context4.next = 8;
                break;
              }

              _context4.t1 = void 0;
              _context4.next = 13;
              break;

            case 8:
              _context4.t2 = _container7$querySele;
              _context4.next = 11;
              return OfferList({
                scriptEls: scriptEls,
                publicationType: publicationType,
                configs: configs,
                sgnViewer: sgnViewer,
                template: templates.offerList
              }).render();

            case 11:
              _context4.t3 = _context4.sent;
              _context4.t1 = _context4.t2.appendChild.call(_context4.t2, _context4.t3);

            case 13:
              _context4.t0 = _context4.t1;

            case 14:
              return _context4.abrupt("return", _context4.t0);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function renderOfferList() {
      return _ref5.apply(this, arguments);
    };
  }();

  var renderDownload = function renderDownload() {
    PublicationDownload({
      configs: configs
    }).render();
  };

  return {
    render: render
  };
};

function ownKeys$5(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }
var defaultTemplate$5 = "    <div class=\"sgn-offer-overview-popup\">\n        {{#offer}}\n        <div class=\"sgn-popup-header\">\n            <div class=\"sgn-menu-popup-labels\">\n                <div class=\"sgn-menu-label\">\n                    <span>{{label}}</span>\n                </div>\n                <div class=\"sgn-menu-date\">\n                    <span data-validity-state=\"{{status}}\">{{dateRange}}</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"sgn-popup-content\">\n            <div class=\"sgn-popup-offer-container\">\n                <div class=\"sgn-offer-img\">\n                    <img src=\"{{images.zoom}}\" alt=\"{{heading}}\">\n                </div>\n                <div class=\"sgn-offer-texts-container\">\n                    <div class=\"sgn-offer-heading\">\n                        <span>{{heading}}</span>\n                    </div>\n                    <div class=\"sgn-offer-description\">\n                        <span>{{description}}&nbsp;</span>\n                    </div>\n                    <div class=\"sgn-offer-price\">\n                        <span>{{price}}</span>\n                    </div>\n                </div>  \n                <div class=\"sgn-offer-buttons-container\">\n                    {{^disableShoppingList}}\n                    <button class=\"sgn-shopping-add-to-list-btn\">{{translations.addToShoppingList}}</button>\n                    {{/disableShoppingList}}\n                    {{#webshop_link}}\n                    <button class=\"sgn-shopping-open-webshop-btn\">{{translations.visitWebshopLink}}</button>\n                    {{/webshop_link}}\n                </div>\n            </div>\n        </div>\n        {{/offer}} \n    </div>";
var loaderTemplate = "    <div class=\"sgn-offer-overview-popup\">\n        <div class=\"sgn-popup-header\">\n            <div class=\"sgn-menu-popup-labels\">\n                <div class=\"sgn-menu-label\">\n                    <span>&nbsp;</span>\n                </div>\n                <div class=\"sgn-menu-date\">\n                    <span>&nbsp;</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"sgn-popup-content\">\n            <div class=\"sgn-popup-offer-container\">\n                <div class=\"sgn-offer-img\">\n                    <div class=\"sgn_modal_loader\"></div>\n                </div>\n                <div class=\"sgn-offer-texts-container\">\n                    <div class=\"sgn-offer-heading\">\n                        <span>&nbsp;</span>\n                    </div>\n                    <div class=\"sgn-offer-description\">\n                        <span>&nbsp;</span>\n                    </div>\n                    <div class=\"sgn-offer-price\">\n                        <span>&nbsp;</span>\n                    </div>\n                </div>  \n                <div class=\"sgn-offer-buttons-container\">\n                    <span>&nbsp;</span>\n                </div>\n            </div>\n        </div>\n    </div>";

var OfferOverview = function OfferOverview(_ref) {
  var _template;

  var template = _ref.template,
      configs = _ref.configs,
      scriptEls = _ref.scriptEls,
      sgnData = _ref.sgnData,
      offer = _ref.offer,
      type = _ref.type,
      addToShoppingList = _ref.addToShoppingList;
  template = ((_template = template) == null ? void 0 : _template.innerHTML) || defaultTemplate$5;
  var container = null;
  var translations = {
    localeCode: translate('locale_code'),
    currency: translate('publication_viewer_currency'),
    addToShoppingList: translate('publication_viewer_add_to_shopping_list'),
    visitWebshopLink: translate('publication_viewer_visit_webshop_link')
  };

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var _sgnData$details;

      var transformedOffer;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              container = document.createElement('div');
              container.className = 'sgn-offer-overview-container';
              createModal(container);
              container.innerHTML = Mustache__default["default"].render(loaderTemplate, {});

              if (!(type === 'paged')) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return fetchOffer(offer.id);

            case 7:
              _context.t0 = _context.sent;
              _context.next = 11;
              break;

            case 10:
              _context.t0 = transformIncitoOffer(offer);

            case 11:
              transformedOffer = _context.t0;
              container.innerHTML = Mustache__default["default"].render(template, {
                translations: translations,
                label: sgnData == null ? void 0 : (_sgnData$details = sgnData.details) == null ? void 0 : _sgnData$details.label,
                disableShoppingList: document.querySelector('.sgn__offer-shopping') ? false : true,
                offer: transformedOffer
              });
              dispatchOfferClickEvent(transformedOffer);
              addEventListeners();

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var transformIncitoOffer = function transformIncitoOffer(offer) {
    var _offer$images, _offer$images$, _offer$validity, _offer$validity2, _offer$validity3, _offer$validity4, _offer$validity5, _offer$validity6;

    var localeCode = translations.localeCode,
        currency = translations.currency;
    return _objectSpread$5({}, offer, {
      heading: offer.name,
      price: formatPrice(offer == null ? void 0 : offer.price, localeCode, (offer == null ? void 0 : offer.currency_code) || currency),
      images: {
        zoom: offer == null ? void 0 : (_offer$images = offer.images) == null ? void 0 : (_offer$images$ = _offer$images[0]) == null ? void 0 : _offer$images$.url
      },
      dateRange: getDateRange(offer == null ? void 0 : (_offer$validity = offer.validity) == null ? void 0 : _offer$validity.from, offer == null ? void 0 : (_offer$validity2 = offer.validity) == null ? void 0 : _offer$validity2.to, 'publication_viewer_offer_date_range'),
      status: getPubState(offer == null ? void 0 : (_offer$validity3 = offer.validity) == null ? void 0 : _offer$validity3.from, offer == null ? void 0 : (_offer$validity4 = offer.validity) == null ? void 0 : _offer$validity4.to),
      statusMessage: getPubStateMessage(offer == null ? void 0 : (_offer$validity5 = offer.validity) == null ? void 0 : _offer$validity5.from, offer == null ? void 0 : (_offer$validity6 = offer.validity) == null ? void 0 : _offer$validity6.to)
    });
  };

  var addOpenWebshopListener = function addOpenWebshopListener() {
    var _container, _container$querySelec;

    (_container = container) == null ? void 0 : (_container$querySelec = _container.querySelector('.sgn-shopping-open-webshop-btn')) == null ? void 0 : _container$querySelec.addEventListener('click', function () {
      window.open(offer.webshop_link);
    });
  };

  var addShoppingListListener = function addShoppingListListener() {
    var _container2, _container2$querySele;

    (_container2 = container) == null ? void 0 : (_container2$querySele = _container2.querySelector('.sgn-shopping-add-to-list-btn')) == null ? void 0 : _container2$querySele.addEventListener('click', function () {
      addToShoppingList(offer);
      destroyModal();
    });
  };

  var fetchOffer = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(id) {
      var _offer$pricing, _offer$pricing2;

      var localeCode, currency, offer;
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              localeCode = translations.localeCode, currency = translations.currency;
              _context2.next = 3;
              return request({
                apiKey: configs.apiKey,
                coreUrl: configs.coreUrl,
                url: "/v2/offers/".concat(id)
              });

            case 3:
              offer = _context2.sent;
              return _context2.abrupt("return", _objectSpread$5({}, offer, {
                price: formatPrice(offer == null ? void 0 : (_offer$pricing = offer.pricing) == null ? void 0 : _offer$pricing.price, localeCode, (offer == null ? void 0 : (_offer$pricing2 = offer.pricing) == null ? void 0 : _offer$pricing2.currency) || currency),
                dateRange: getDateRange(offer == null ? void 0 : offer.run_from, offer == null ? void 0 : offer.run_till, 'publication_viewer_offer_date_range'),
                status: getPubState(offer == null ? void 0 : offer.run_from, offer == null ? void 0 : offer.run_till),
                statusMessage: getPubStateMessage(offer == null ? void 0 : offer.run_from, offer == null ? void 0 : offer.run_till)
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function fetchOffer(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var dispatchOfferClickEvent = function dispatchOfferClickEvent(detail) {
    var mainContainerEl = document.querySelector(scriptEls.listPublicationsContainer || scriptEls.mainContainer);
    mainContainerEl == null ? void 0 : mainContainerEl.dispatchEvent(new CustomEvent('publication:offer_modal_rendered', {
      detail: detail
    }));
  };

  var addEventListeners = function addEventListeners() {
    var _document$querySelect;

    (_document$querySelect = document.querySelector('.sgn-modal-container')) == null ? void 0 : _document$querySelect.focus();
    addOpenWebshopListener();
    addShoppingListListener();
  };

  return {
    render: render
  };
};

function ownKeys$4(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }
var defaultTemplate$4 = "    <div class=\"sgn-shopping-popup sgn-show-print-section\">\n        <div class=\"sgn-popup-header\">\n            <div class=\"sgn-popup-header-label\">\n                <span>{{translations.shoppingListLabel}}</span>\n            </div>            \n            <div class=\"sgn-menu-share\">\n                <button class=\"sgn-shopping-share-list-btn sgn-hide-print\">\n                    <svg \n                        aria-hidden=\"true\"\n                        class=\"sgn-share-icon-svg\"\n                        role=\"img\"\n                        viewBox=\"0 0 640 512\"\n                        xmlns=\"http://www.w3.org/2000/svg\"\n                    >\n                        <path \n                            fill=\"currentColor\" \n                            d=\"M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z\"\n                        >\n                        </path>\n                    </svg>\n                </button>\n            </div>\n            <div class=\"sgn-clearfix\"></div>\n        </div>\n        <ol class=\"sgn-shopping-list-items-container\">\n            {{#offers}}\n            <li class=\"sgn-shopping-list-item-container\" data-id=\"{{index}}\">\n                <div class=\"sgn-shopping-list-content-container\">\n                    <div class=\"sgn-shopping-list-content\">\n                        <div class=\"sgn-shopping-list-content-heading sgn-truncate-elipsis\">\n                            <span>{{#price}}{{price}} - {{/price}}{{name}}</span><br/>\n                        </div>\n                    </div>\n                </div>\n            </li>\n            {{/offers}}\n            {{#tickedOffers}}\n            <li class=\"sgn-shopping-list-item-container sgn-shopping-list-item-container-ticked\" data-id=\"{{index}}\">\n                <div class=\"sgn-shopping-list-content-container\">\n                    <div class=\"sgn-shopping-list-content\">\n                        <div class=\"sgn-shopping-list-content-heading sgn-truncate-elipsis\">\n                            <span>{{#price}}{{price}} - {{/price}}{{name}}</span><br/>\n                        </div>\n                    </div>\n                </div>\n            </li>\n            {{/tickedOffers}}\n            {{#hasTicked}}\n            <li class=\"sgn-shopping-list-item-container-crossed sgn-hide-print\">\n                <button class=\"sgn-shopping-clear-ticked-list-btn sgn-hide-print\">{{translations.deleteCrossedOutButton}}</button>\n            </li>\n            {{/hasTicked}}\n        </ol>\n        <div>\n            <button class=\"sgn-shopping-clear-list-btn sgn-hide-print\">{{translations.clearListButton}}</button>\n            <button class=\"sgn-shopping-print-list-btn sgn-hide-print\">{{translations.printButton}}</button>\n        </div>\n    </div>";

var ShoppingList = function ShoppingList(_ref) {
  var _template;

  var template = _ref.template;
  template = ((_template = template) == null ? void 0 : _template.innerHTML) || defaultTemplate$4;
  var shoppingListBtn = document.querySelector('.sgn__offer-shopping');
  var container = null;
  var translations = {
    localeCode: translate('locale_code'),
    shoppingListLabel: translate('publication_viewer_shopping_list_label'),
    currency: translate('publication_viewer_currency'),
    deleteCrossedOutButton: translate('publication_viewer_delete_crossed_out_button'),
    clearListButton: translate('publication_viewer_shopping_list_clear_button'),
    printButton: translate('publication_viewer_print_button')
  };

  var render = function render() {
    shoppingListBtn == null ? void 0 : shoppingListBtn.addEventListener('click', showShoppingList, false);
  };

  var showShoppingList = function showShoppingList() {
    var _transformSavedOffers, _transformSavedOffers2, _transformSavedOffers3;

    var storedPublicationOffers = get('publication-saved-offers');
    container = document.createElement('div');
    container.className = 'sgn-shopping-list-container';
    container.innerHTML = Mustache__default["default"].render(template, {
      translations: translations,
      offers: (_transformSavedOffers = transformSavedOffers(storedPublicationOffers)) == null ? void 0 : _filterInstanceProperty__default["default"](_transformSavedOffers).call(_transformSavedOffers, function (offer) {
        return !offer.is_ticked;
      }),
      tickedOffers: (_transformSavedOffers2 = transformSavedOffers(storedPublicationOffers)) == null ? void 0 : _filterInstanceProperty__default["default"](_transformSavedOffers2).call(_transformSavedOffers2, function (offer) {
        return offer.is_ticked;
      }),
      hasTicked: ((_transformSavedOffers3 = transformSavedOffers(storedPublicationOffers)) == null ? void 0 : _filterInstanceProperty__default["default"](_transformSavedOffers3).call(_transformSavedOffers3, function (offer) {
        return offer.is_ticked;
      }).length) > 0
    });
    createModal(container);
    addEventListeners();
  };

  var transformSavedOffers = function transformSavedOffers(savedOffers) {
    var _context;

    var localeCode = translations.localeCode,
        currency = translations.currency;
    return _mapInstanceProperty__default["default"](_context = savedOffers || []).call(_context, function (offer, index) {
      var _offer$pricing, _offer$pricing2, _offer$pricing3;

      return _objectSpread$4({
        index: index
      }, offer, {
        price: offer != null && (_offer$pricing = offer.pricing) != null && _offer$pricing.price ? formatPrice(offer == null ? void 0 : (_offer$pricing2 = offer.pricing) == null ? void 0 : _offer$pricing2.price, localeCode, (offer == null ? void 0 : (_offer$pricing3 = offer.pricing) == null ? void 0 : _offer$pricing3.currency) || currency) : null
      });
    });
  };

  var addTickerListener = function addTickerListener() {
    var _container;

    (_container = container) == null ? void 0 : _container.querySelectorAll('.sgn-shopping-list-item-container').forEach(function (itemEl) {
      itemEl.addEventListener('click', tickOffer, false);
    });
  };

  var tickOffer = function tickOffer(e) {
    var _e$currentTarget$data, _transformSavedOffers4, _transformSavedOffers5, _transformSavedOffers6;

    var storedPublicationOffers = get('publication-saved-offers');
    var index = (_e$currentTarget$data = e.currentTarget.dataset) == null ? void 0 : _e$currentTarget$data.id;
    storedPublicationOffers[index].is_ticked = !storedPublicationOffers[index].is_ticked;
    setWithEvent('publication-saved-offers', storedPublicationOffers, 'tjek_shopping_list_update');
    if (container) container.innerHTML = Mustache__default["default"].render(template, {
      translations: translations,
      offers: (_transformSavedOffers4 = transformSavedOffers(storedPublicationOffers)) == null ? void 0 : _filterInstanceProperty__default["default"](_transformSavedOffers4).call(_transformSavedOffers4, function (offer) {
        return !offer.is_ticked;
      }),
      tickedOffers: (_transformSavedOffers5 = transformSavedOffers(storedPublicationOffers)) == null ? void 0 : _filterInstanceProperty__default["default"](_transformSavedOffers5).call(_transformSavedOffers5, function (offer) {
        return offer.is_ticked;
      }),
      hasTicked: ((_transformSavedOffers6 = transformSavedOffers(storedPublicationOffers)) == null ? void 0 : _filterInstanceProperty__default["default"](_transformSavedOffers6).call(_transformSavedOffers6, function (offer) {
        return offer.is_ticked;
      }).length) > 0
    });
    addEventListeners();
    e.stopPropagation();
  };

  var addClearListListener = function addClearListListener() {
    var _container2, _container2$querySele;

    (_container2 = container) == null ? void 0 : (_container2$querySele = _container2.querySelector('.sgn-shopping-clear-list-btn')) == null ? void 0 : _container2$querySele.addEventListener('click', function (e) {
      e.stopPropagation();
      setWithEvent('publication-saved-offers', [], 'tjek_shopping_list_update');
      if (container) container.innerHTML = Mustache__default["default"].render(template, {
        translations: translations,
        offers: []
      });
      addEventListeners();
    });
  };

  var addClearTickedListListener = function addClearTickedListListener() {
    var _container3;

    var clearTickedBtn = (_container3 = container) == null ? void 0 : _container3.querySelector('.sgn-shopping-clear-ticked-list-btn');
    var storedPublicationOffers = get('publication-saved-offers');
    var validOffers = storedPublicationOffers == null ? void 0 : _filterInstanceProperty__default["default"](storedPublicationOffers).call(storedPublicationOffers, function (offer) {
      return !offer.is_ticked;
    });
    clearTickedBtn == null ? void 0 : clearTickedBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setWithEvent('publication-saved-offers', validOffers, 'tjek_shopping_list_update');
      if (container) container.innerHTML = Mustache__default["default"].render(template, {
        translations: translations,
        offers: transformSavedOffers(validOffers)
      });
      addEventListeners();
    });
  };

  var addPrintListener = function addPrintListener() {
    var _container4, _container4$querySele;

    (_container4 = container) == null ? void 0 : (_container4$querySele = _container4.querySelector('.sgn-shopping-print-list-btn')) == null ? void 0 : _container4$querySele.addEventListener('click', function () {
      window.print();
    });
  };

  var addShareListener = function addShareListener() {
    var _container5, _container5$querySele;

    (_container5 = container) == null ? void 0 : (_container5$querySele = _container5.querySelector('.sgn-shopping-share-list-btn')) == null ? void 0 : _container5$querySele.addEventListener('click', /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var shareData, _context2, shareEmailData, queryString;

      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              shareData = {
                title: translations.shoppingListLabel,
                text: formatListToShare(transformSavedOffers(get('publication-saved-offers'))),
                url: document.location.href
              };
              _context3.next = 4;
              return navigator.share(shareData);

            case 4:
              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);

              if ((_context3.t0 == null ? void 0 : _context3.t0.toString()) === 'TypeError: navigator.share is not a function') {
                shareEmailData = {
                  subject: translations.shoppingListLabel,
                  body: formatListToShare(transformSavedOffers(get('publication-saved-offers')), '%0d%0a')
                };
                queryString = _mapInstanceProperty__default["default"](_context2 = _Object$keys__default["default"](shareEmailData)).call(_context2, function (key) {
                  return key + '=' + shareEmailData[key];
                }).join('&');
                window.location.href = "mailto:?".concat(queryString);
              } else {
                console.log(_context3.t0);
              }

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    })));
  };

  var formatListToShare = function formatListToShare(data, newLineDelimiter) {
    if (newLineDelimiter === void 0) {
      newLineDelimiter = "\n";
    }

    var offerStr = '';
    data == null ? void 0 : data.forEach(function (offer) {
      if (!offer.is_ticked) {
        var _context4;

        offerStr += offer.price ? _concatInstanceProperty__default["default"](_context4 = "".concat(offer.price, " - ")).call(_context4, offer.name) : "".concat(offer.name);
        offerStr += newLineDelimiter;
      }
    });
    return offerStr;
  };

  var addEventListeners = function addEventListeners() {
    var _document$querySelect;

    (_document$querySelect = document.querySelector('.sgn-modal-container')) == null ? void 0 : _document$querySelect.focus();
    addTickerListener();
    addClearTickedListListener();
    addClearListListener();
    addPrintListener();
    addShareListener();
  };

  return {
    render: render
  };
};

var transformScriptData = function transformScriptData(scriptEl, mainContainer) {
  var dataset = scriptEl.dataset;
  return {
    businessId: dataset.businessId,
    mainContainer: dataset.componentPublicationContainer || mainContainer,
    listPublicationsContainer: dataset.componentListPublicationsContainer || mainContainer,
    publicationId: dataset.componentPublicationId,
    publicationIdParam: dataset.publicationIdQueryParam || 'publicationid',
    pageIdParam: dataset.publicationPageQueryParam || 'publicationpage',
    publicationHash: dataset.publicationHash || 'publication',
    displayUrlParams: dataset.componentPublicationDisplayUrlParams,
    localeCode: dataset.localeCode,
    translationKeys: dataset.translationKeyIncito_publication_viewer,
    theme: dataset.componentTheme,
    publicationsListClickBehavior: dataset.componentPublicationsListItemClickBehavior || 'open_publication_viewer',
    offerClickBehavior: dataset.componentPublicationViewerOfferClickBehavior || 'shopping_list',
    disableShoppingList: dataset.componentPublicationDisableShoppingList === 'true',
    disableClose: dataset.componentPublicationDisableClose === 'true',
    disableMenu: dataset.componentPublicationDisableMenu === 'true',
    disableDownload: dataset.componentPublicationDisableDownload === 'true',
    disableHeader: dataset.componentPublicationDisableHeader === 'true',
    disableGlobalScrollbar: dataset.componentPublicationDisableGlobalScrollbar === 'true',
    showHeaderLabels: dataset.componentPublicationShowHeaderLabels === 'true'
  };
};

var defaultTemplate$3 = "    <div class=\"sgn_loader-container\">\n        <div class=\"sgn_loader\"></div>\n    </div>\n    <div class=\"sgn__incito\" data-component-template=\"true\" tabindex=\"-1\" data-component-template-disable-header=\"{{disableHeader}}\">\n        <div class=\"sgn__header-container\"></div>\n        {{#disableHeader}}\n        <div class=\"sgn-incito__scroll-progress\">\n            <div class=\"sgn-incito__scroll-progress-bar\"></div>\n            <span class=\"sgn-incito__scroll-progress-text\"></span>\n        </div>\n        {{/disableHeader}}\n    </div>";

var MainContainer$2 = function MainContainer(_ref) {
  var template = _ref.template,
      el = _ref.el,
      scriptEls = _ref.scriptEls;

  var setCustomStyles = function setCustomStyles() {
    var sgnIncito = el == null ? void 0 : el.querySelector('.sgn__incito');
    sgnIncito == null ? void 0 : sgnIncito.classList.add("sgn__theme-".concat(scriptEls.theme || 'light'));
  };

  var render = function render() {
    var _el$querySelector;

    if (!el) return;
    el.innerHTML = Mustache__default["default"].render((template == null ? void 0 : template.innerHTML) || defaultTemplate$3, {
      disableHeader: scriptEls.disableHeader,
      disableShoppingList: scriptEls.disableShoppingList || scriptEls.offerClickBehavior !== 'shopping_list',
      disableMenu: scriptEls.disableMenu,
      disableClose: scriptEls.disableClose
    });
    (_el$querySelector = el.querySelector('.sgn__incito')) == null ? void 0 : _el$querySelector.focus();
    setCustomStyles();
  };

  return {
    render: render
  };
};

var IncitoPublication = function IncitoPublication(scriptEl, _ref) {
  var _document$querySelect;

  var _ref$mainContainer = _ref.mainContainer,
      mainContainer = _ref$mainContainer === void 0 ? '' : _ref$mainContainer,
      apiKey = _ref.apiKey,
      coreUrl = _ref.coreUrl,
      eventTracker = _ref.eventTracker;
  var options;
  var sgnData;
  var sgnViewer;
  var bootstrapper;
  var scriptEls = transformScriptData(scriptEl, mainContainer);
  var customTemplates = {
    mainContainer: document.getElementById('sgn-sdk-incito-publication-viewer-template'),
    headerContainer: document.getElementById('sgn-sdk-incito-publication-viewer-header-template'),
    offerList: document.getElementById('sgn-sdk-incito-publication-viewer-offer-list-template'),
    shoppingList: document.getElementById('sgn-sdk-incito-publication-viewer-shopping-list-template'),
    shoppingListCounter: document.getElementById('sgn-sdk-incito-publication-viewer-shopping-list-counter-template'),
    sectionList: document.getElementById('sgn-sdk-incito-publication-viewer-section-list-template'),
    offerOverview: document.getElementById('sgn-sdk-incito-publication-viewer-offer-overview-template'),
    menuContainer: document.getElementById('sgn-sdk-incito-publication-viewer-menu-container-template')
  };
  MainContainer$2({
    template: customTemplates.mainContainer,
    el: document.querySelector(scriptEls.mainContainer),
    scriptEls: scriptEls
  }).render();
  var header = Header({
    publicationType: 'incito',
    template: customTemplates.headerContainer,
    shoppingListCounterTemplate: customTemplates.shoppingListCounter,
    el: document.querySelector(scriptEls.mainContainer),
    scriptEls: scriptEls
  });
  (_document$querySelect = document.querySelector('.sgn__header-container')) == null ? void 0 : _document$querySelect.appendChild(header.render());

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_Object$keys__default["default"](options || {}).length === 0)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return setOptions();

            case 3:
              _context.next = 5;
              return start();

            case 5:
              addScrollListener();
              renderShoppingList();
              renderMenuPopup();
              dispatchPublicationData();
              return _context.abrupt("return", sgnData);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var renderShoppingList = function renderShoppingList() {
    return ShoppingList({
      template: customTemplates.shoppingList
    }).render();
  };

  var renderMenuPopup = function renderMenuPopup() {
    var _document$querySelect2;

    return (_document$querySelect2 = document.querySelector('.sgn__nav-menu-btn')) == null ? void 0 : _document$querySelect2.addEventListener('click', function (e) {
      e.preventDefault();
      MenuPopup({
        publicationType: 'incito',
        configs: options,
        sgnData: sgnData,
        templates: customTemplates,
        scriptEls: scriptEls
      }).render();
    });
  };

  var animateShoppingListCounter = function animateShoppingListCounter() {
    var shoppingListCounter = document.querySelector('.sgn__offer-shopping-list-counter');
    shoppingListCounter == null ? void 0 : shoppingListCounter.classList.remove('sgn-animate-bounce');
    shoppingListCounter == null ? void 0 : shoppingListCounter.classList.add('sgn-animate-bounce');
  };

  var setOptions = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(opts) {
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = document.querySelector('.sgn__incito');
              _context2.t1 = apiKey;
              _context2.t2 = coreUrl;
              _context2.t3 = eventTracker;
              _context2.t4 = (opts == null ? void 0 : opts.pageId) || "page".concat(getQueryParam(scriptEls.pageIdParam) || 1);
              _context2.t5 = (opts == null ? void 0 : opts.id) || getQueryParam(scriptEls.publicationIdParam) || scriptEls.publicationId;

              if (_context2.t5) {
                _context2.next = 10;
                break;
              }

              _context2.next = 9;
              return fetchLatestPublicationId();

            case 9:
              _context2.t5 = _context2.sent;

            case 10:
              _context2.t6 = _context2.t5;
              _context2.t7 = (opts == null ? void 0 : opts.businessId) || scriptEls.businessId;
              options = {
                el: _context2.t0,
                apiKey: _context2.t1,
                coreUrl: _context2.t2,
                eventTracker: _context2.t3,
                pageId: _context2.t4,
                id: _context2.t6,
                businessId: _context2.t7
              };

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function setOptions(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var start = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4() {
      var _options, _sgnLoader$parentNode;

      var sgnLoader, data, _document$querySelect3;

      return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              sgnLoader = document.querySelector('.sgn_loader-container'); // @ts-expect-error

              bootstrapper = new Bootstrapper$1(options);
              _context4.next = 4;
              return bootstrapper.fetch();

            case 4:
              data = _context4.sent;
              sgnData = data; // @ts-expect-error

              sgnViewer = bootstrapper.createViewer(data);
              header.show(sgnData);
              if ((_options = options) != null && _options.el) on(options.el, 'click', '.incito__view[data-role="offer"]', /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(e) {
                var viewId, publicationId;
                return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        e.preventDefault();
                        viewId = this.dataset.id;
                        publicationId = options.id;
                        clickOfferCell(viewId, publicationId);

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              })));
              sgnViewer.start();

              if (scriptEls.disableGlobalScrollbar) {
                (_document$querySelect3 = document.querySelector('html')) == null ? void 0 : _document$querySelect3.classList.add('sgn-incito-publication--open');
              }

              sgnLoader == null ? void 0 : (_sgnLoader$parentNode = sgnLoader.parentNode) == null ? void 0 : _sgnLoader$parentNode.removeChild(sgnLoader);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function start() {
      return _ref4.apply(this, arguments);
    };
  }();

  var dispatchOfferClickEvent = function dispatchOfferClickEvent(detail) {
    var mainContainerEl = document.querySelector(scriptEls.listPublicationsContainer || scriptEls.mainContainer);
    mainContainerEl == null ? void 0 : mainContainerEl.dispatchEvent(new CustomEvent('publication:offer_clicked', {
      detail: detail
    }));
  };

  var dispatchPublicationData = function dispatchPublicationData() {
    var mainContainerEl = document.querySelector(scriptEls.listPublicationsContainer || scriptEls.mainContainer);
    mainContainerEl == null ? void 0 : mainContainerEl.dispatchEvent(new CustomEvent('publication:rendered', {
      detail: sgnData
    }));
  };

  var clickOfferCell = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee5(viewId, publicationId) {
      var _options$el;

      var shoppingBtn, _yield$fetchOffer, offer, newWindowRef, _yield$fetchOffer2, _offer, _yield$fetchOffer3, _offer2, _yield$fetchOffer4, _offer3;

      return _regeneratorRuntime__default["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dispatchOfferClickEvent({
                fetchOffer: fetchOffer,
                viewId: viewId,
                publicationId: publicationId
              });
              shoppingBtn = (_options$el = options.el) == null ? void 0 : _options$el.querySelector('.sgn__offer-shopping');

              if (!(scriptEls.offerClickBehavior === 'overview_modal')) {
                _context5.next = 10;
                break;
              }

              _context5.next = 5;
              return fetchOffer({
                viewId: viewId,
                publicationId: publicationId
              });

            case 5:
              _yield$fetchOffer = _context5.sent;
              offer = _yield$fetchOffer.offer;
              OfferOverview({
                template: customTemplates.offerOverview,
                configs: options,
                scriptEls: scriptEls,
                sgnData: sgnData,
                offer: offer,
                type: 'incito',
                addToShoppingList: addToShoppingList
              }).render();
              _context5.next = 33;
              break;

            case 10:
              if (!(scriptEls.offerClickBehavior === 'open_webshop_link_in_tab')) {
                _context5.next = 19;
                break;
              }

              newWindowRef = window.open();
              _context5.next = 14;
              return fetchOffer({
                viewId: viewId,
                publicationId: publicationId
              });

            case 14:
              _yield$fetchOffer2 = _context5.sent;
              _offer = _yield$fetchOffer2.offer;

              if (newWindowRef) {
                if (_offer.webshop_link) {
                  newWindowRef.location = _offer.webshop_link;
                } else {
                  newWindowRef.close();
                }
              }

              _context5.next = 33;
              break;

            case 19:
              if (!(scriptEls.offerClickBehavior === 'redirect_to_webshop_link')) {
                _context5.next = 27;
                break;
              }

              _context5.next = 22;
              return fetchOffer({
                viewId: viewId,
                publicationId: publicationId
              });

            case 22:
              _yield$fetchOffer3 = _context5.sent;
              _offer2 = _yield$fetchOffer3.offer;

              if (_offer2.webshop_link) {
                location.href = _offer2.webshop_link;
              }

              _context5.next = 33;
              break;

            case 27:
              if (!shoppingBtn) {
                _context5.next = 33;
                break;
              }

              _context5.next = 30;
              return fetchOffer({
                viewId: viewId,
                publicationId: publicationId
              });

            case 30:
              _yield$fetchOffer4 = _context5.sent;
              _offer3 = _yield$fetchOffer4.offer;
              addToShoppingList(_offer3);

            case 33:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function clickOfferCell(_x3, _x4) {
      return _ref6.apply(this, arguments);
    };
  }();

  var addToShoppingList = function addToShoppingList(offer) {
    var storedPublicationOffers = get('publication-saved-offers');
    var shopListOffer = {
      name: offer.name,
      pricing: {
        price: offer.price,
        currency: offer.currency_code
      },
      is_ticked: false
    };

    if (!storedPublicationOffers) {
      setWithEvent('publication-saved-offers', [shopListOffer], 'tjek_shopping_list_update');
    } else {
      storedPublicationOffers.push(shopListOffer);
      setWithEvent('publication-saved-offers', storedPublicationOffers, 'tjek_shopping_list_update');
    }

    animateShoppingListCounter();
  };

  var addScrollListener = function addScrollListener() {
    if (!options.el) return;
    var isContainerFixed = window.getComputedStyle(options.el).position === 'fixed';
    var progressContainer = options.el.querySelector('.sgn-incito__scroll-progress');
    var progressBar = options.el.querySelector('.sgn-incito__scroll-progress-bar');
    var progressText = options.el.querySelector('.sgn-incito__scroll-progress-text');

    if (progressText && isContainerFixed) {
      progressText.innerHTML = '0%';
      options.el.addEventListener('scroll', function () {
        var scrollValue = getContainerScrollValue();

        if (scrollValue) {
          if (progressBar) progressBar.style.transform = "scaleX(".concat(scrollValue / 100, ")");
          progressText.innerHTML = "".concat(Math.round(scrollValue), "%");
        }
      });
    } else {
      var _progressContainer$pa;

      progressContainer == null ? void 0 : (_progressContainer$pa = progressContainer.parentNode) == null ? void 0 : _progressContainer$pa.removeChild(progressContainer);
    }
  };

  var getContainerScrollValue = function getContainerScrollValue() {
    return options.el && 100 * options.el.scrollTop / (options.el.scrollHeight - options.el.clientHeight);
  };

  var fetchLatestPublicationId = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee6() {
      var _yield$request, _yield$request$;

      return _regeneratorRuntime__default["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return request({
                apiKey: apiKey,
                coreUrl: coreUrl,
                url: '/v2/catalogs',
                qs: {
                  dealer_id: scriptEls.businessId,
                  order_by: '-publication_date',
                  types: 'incito',
                  limit: 1
                }
              });

            case 2:
              _context6.t0 = _yield$request = _context6.sent;

              if (!(_context6.t0 == null)) {
                _context6.next = 7;
                break;
              }

              _context6.t1 = void 0;
              _context6.next = 8;
              break;

            case 7:
              _context6.t1 = (_yield$request$ = _yield$request[0]) == null ? void 0 : _yield$request$.id;

            case 8:
              return _context6.abrupt("return", _context6.t1);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function fetchLatestPublicationId() {
      return _ref7.apply(this, arguments);
    };
  }();

  var fetchOffer = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee7(_ref8) {
      var viewId, publicationId, res;
      return _regeneratorRuntime__default["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              viewId = _ref8.viewId, publicationId = _ref8.publicationId;
              _context7.next = 3;
              return request({
                apiKey: apiKey,
                coreUrl: coreUrl,
                url: '/v4/rpc/get_offer_from_incito_publication_view',
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: _JSON$stringify__default["default"]({
                  view_id: viewId,
                  publication_id: publicationId
                })
              });

            case 3:
              res = _context7.sent;

              if (res) {
                _context7.next = 6;
                break;
              }

              throw new Error();

            case 6:
              if (res.offer.id) {
                eventTracker == null ? void 0 : eventTracker.trackOfferOpened({
                  'of.id': res.offer.id,
                  vt: eventTracker.createViewToken(res.offer.id)
                });
              }

              return _context7.abrupt("return", res);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function fetchOffer(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  return {
    render: render,
    setOptions: setOptions
  };
};

var defaultTemplate$2 = "<div class=\"sgn__publications\">\n    <ul class=\"sgn-publications-list-items-container\">\n        {{#publications}}\n        <li class=\"sgn-publications-li\">\n            <div class=\"publications__item\" data-id=\"{{id}}\">\n                <div class=\"sgn-publications-list-content-img\">\n                    <img data-id=\"{{id}}\" src=\"{{images.view}}\" alt=\"{{label}}\">\n                </div>\n                <div class=\"sgn-publications-list-content-text\">\n                    <div class=\"sgn-publications-list-content-heading\">\n                        <span>{{label}}</span>\n                    </div>\n                    <div class=\"sgn-publications-list-content-date\">\n                        <span>{{dateFrom}}-{{dateTill}}</span>\n                    </div>\n                </div>\n            </div>\n        </li>\n        {{/publications}}\n    </u;>\n</div>\n<div id=\"sgn-publication-viewer-container\"></div>\n";

var MainContainer$1 = function MainContainer(_ref) {
  var publications = _ref.publications,
      template = _ref.template,
      el = _ref.el;

  var render = function render() {
    el.innerHTML = Mustache__default["default"].render((template == null ? void 0 : template.innerHTML) || defaultTemplate$2, {
      publications: publications
    });
  };

  return {
    render: render
  };
};

var pairs = {
  'paged_publication.hotspot_picker.header': 'Which offer did you mean?',
  'incito_publication.product_picker.header': 'Which product?'
};
function t(key, view) {
  var _pairs$key;

  var template = (_pairs$key = pairs[key]) != null ? _pairs$key : '';
  return Mustache__default["default"].render(template, view);
}
function update(translations) {
  for (var key in translations) {
    pairs[key] = translations[key];
  }
}

var translations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    t: t,
    update: update
});

var defaultTemplate$1 = "<div class=\"sgn-popover__background\" data-close></div>\n<div class=\"sgn-popover__menu\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#singleChoiceItems}}\n                <li data-index=\"{{index}}\">\n                    <p class=\"sgn-popover-item__title\">{{item.title}}</p>\n                    {{#item.subtitle}}\n                        <p class=\"sgn-popover-item__subtitle\">{{item.subtitle}}</p>\n                    {{/item.subtitle}}\n                </li>\n            {{/singleChoiceItems}}\n        </ul>\n    </div>\n</div>";

var Popover = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](Popover, _MicroEvent);

  function Popover(options) {
    var _this;

    _this = _MicroEvent.call(this) || this;
    _this.el = document.createElement('div');
    _this.backgroundEl = document.createElement('div');
    _this.options = void 0;

    _this.keyUp = function (e) {
      if (e.keyCode === ESC) _this.destroy();
    };

    _this.resize = function () {
      _this.destroy();
    };

    _this.scroll = function () {
      _this.destroy();
    };

    _this.options = options;
    return _this;
  }

  var _proto = Popover.prototype;

  _proto.render = function render() {
    var _this$options = this.options,
        header = _this$options.header,
        singleChoiceItems = _this$options.singleChoiceItems,
        template = _this$options.template;
    this.el.className = 'sgn-popover';
    this.el.setAttribute('tabindex', '-1');
    this.el.innerHTML = Mustache__default["default"].render(template || defaultTemplate$1, {
      header: header,
      singleChoiceItems: singleChoiceItems == null ? void 0 : _mapInstanceProperty__default["default"](singleChoiceItems).call(singleChoiceItems, function (item, index) {
        return {
          item: item,
          index: index
        };
      })
    });
    this.position();
    this.addEventListeners();
    return this;
  };

  _proto.destroy = function destroy() {
    off(this.el);
    window.removeEventListener('resize', this.resize, false);
    window.removeEventListener('scroll', this.scroll, false);

    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      this.trigger('destroyed');
    }
  };

  _proto.position = function position() {
    var top = this.options.y;
    var left = this.options.x;
    var menuEl = this.el.querySelector('.sgn-popover__menu');

    if (menuEl && this.el.parentElement) {
      var width = menuEl.offsetWidth;
      var height = menuEl.offsetHeight;
      var parentWidth = this.el.parentElement.offsetWidth;
      var parentHeight = this.el.parentElement.offsetHeight;
      var boundingRect = this.el.parentElement.getBoundingClientRect();
      top -= boundingRect.top;
      left -= boundingRect.left;
      top -= window.pageYOffset;
      left -= window.pageXOffset;
      menuEl.style.top = top + height > parentHeight ? parentHeight - height + 'px' : top + 'px';
      menuEl.style.left = left + width > parentWidth ? parentWidth - width + 'px' : left + 'px';
    }
  };

  _proto.addEventListeners = function addEventListeners() {
    var _this2 = this;

    var trigger = this.trigger.bind(this);
    this.el.addEventListener('keyup', this.keyUp);
    on(this.el, 'click', '[data-index]', function (e) {
      e.preventDefault();
      e.stopPropagation();
      trigger('selected', {
        index: this.dataset.index
      });
    });
    on(this.el, 'click', '[data-close]', function (e) {
      e.preventDefault();
      e.stopPropagation();

      _this2.destroy();
    });
    on(this.el, 'click', '.sgn-popover__menu', function (e) {
      e.stopPropagation();
    });
    window.addEventListener('resize', this.resize, false);
    window.addEventListener('scroll', this.scroll, false);
  };

  return _createClass__default["default"](Popover);
}(MicroEvent__default["default"]);

function singleChoicePopover(_ref, callback) {
  var items = _ref.items,
      el = _ref.el,
      header = _ref.header,
      x = _ref.x,
      y = _ref.y;
  var popover;

  if (items.length === 1) {
    callback(items[0]);
  } else if (items.length > 1) {
    popover = new Popover({
      header: header,
      x: x,
      y: y,
      singleChoiceItems: items
    });
    popover.bind('selected', function (e) {
      var _popover;

      callback(items[e.index]);
      (_popover = popover) == null ? void 0 : _popover.destroy();
    });
    popover.bind('destroyed', function () {
      el.focus();
    });
    el.appendChild(popover.el);
    popover.render().el.focus();
  }

  return {
    destroy: function destroy() {
      var _popover2;

      (_popover2 = popover) == null ? void 0 : _popover2.destroy();
    }
  };
}

var visibilityClassName = 'sgn-pp--hidden';

var PagedPublicationControls = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](PagedPublicationControls, _MicroEvent);

  // @ts-expect-error
  function PagedPublicationControls(el, options) {
    var _this$prevControl2, _this$nextControl2, _this$close2;

    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _MicroEvent.call(this) || this;
    _this.options = void 0;
    _this.root = void 0;
    _this.progress = void 0;
    _this.progressBar = void 0;
    _this.progressLabel = void 0;
    _this.prevControl = void 0;
    _this.nextControl = void 0;
    _this.close = void 0;
    _this.keyDownHandler = void 0;

    _this.destroy = function () {
      var _this$prevControl, _this$nextControl, _this$close;

      if (_this.options.keyboard === true) {
        _this.root.removeEventListener('keydown', _this.keyDownHandler, false);
      }

      (_this$prevControl = _this.prevControl) == null ? void 0 : _this$prevControl.removeEventListener('mousedown', _this.prevClicked, false);
      (_this$nextControl = _this.nextControl) == null ? void 0 : _this$nextControl.removeEventListener('mousedown', _this.nextClicked, false);
      (_this$close = _this.close) == null ? void 0 : _this$close.removeEventListener('mousedown', _this.closeClicked, false);
    };

    _this.beforeNavigation = function (e) {
      var showProgress = typeof e.progressLabel === 'string' && e.progressLabel.length > 0;

      if (_this.progress && _this.progressBar) {
        _this.progressBar.style.width = "".concat(e.progress, "%");

        if (showProgress) {
          _this.progress.classList.remove(visibilityClassName);
        } else {
          _this.progress.classList.add(visibilityClassName);
        }
      }

      if (_this.progressLabel) {
        if (showProgress) {
          _this.progressLabel.textContent = e.progressLabel;

          _this.progressLabel.classList.remove(visibilityClassName);
        } else {
          _this.progressLabel.classList.add(visibilityClassName);
        }
      }

      if (_this.prevControl) {
        if (e.verso.newPosition === 0) {
          _this.prevControl.classList.add(visibilityClassName);
        } else {
          _this.prevControl.classList.remove(visibilityClassName);
        }
      }

      if (_this.nextControl) {
        if (e.verso.newPosition === e.pageSpreadCount - 1) {
          _this.nextControl.classList.add(visibilityClassName);
        } else {
          _this.nextControl.classList.remove(visibilityClassName);
        }
      }
    };

    _this.prevClicked = function (e) {
      e.preventDefault();

      _this.trigger('prev');
    };

    _this.nextClicked = function (e) {
      e.preventDefault();

      _this.trigger('next');
    };

    _this.closeClicked = function (e) {
      e.preventDefault();

      _this.trigger('close');
    };

    _this.keyDown = function (e) {
      var keyCode = e.keyCode;

      if (ARROW_LEFT === keyCode) {
        _this.trigger('prev', {
          duration: 0
        });
      } else if (ARROW_RIGHT === keyCode || SPACE === keyCode) {
        _this.trigger('next', {
          duration: 0
        });
      } else if (NUMBER_ONE === keyCode) {
        _this.trigger('first', {
          duration: 0
        });
      }
    };

    _this.options = options;
    _this.root = el;
    _this.progress = el.querySelector('.sgn-pp__progress');
    _this.progressBar = el.querySelector('.sgn-pp-progress__bar');
    _this.progressLabel = el.querySelector('.sgn-pp__progress-label');
    _this.prevControl = el.querySelector('.sgn-pp__control[data-direction=prev]');
    _this.nextControl = el.querySelector('.sgn-pp__control[data-direction=next]');
    _this.close = el.querySelector('.sgn-pp--close');
    _this.keyDownHandler = throttle(_this.keyDown, 150, _assertThisInitialized__default["default"](_this));

    if (_this.options.keyboard === true) {
      _this.root.addEventListener('keydown', _this.keyDownHandler, false);
    }

    (_this$prevControl2 = _this.prevControl) == null ? void 0 : _this$prevControl2.addEventListener('mousedown', _this.prevClicked, false);
    (_this$nextControl2 = _this.nextControl) == null ? void 0 : _this$nextControl2.addEventListener('mousedown', _this.nextClicked, false);
    (_this$close2 = _this.close) == null ? void 0 : _this$close2.addEventListener('mousedown', _this.closeClicked, false);

    _this.bind('beforeNavigation', _this.beforeNavigation);

    _this.bind('destroyed', _this.destroy);

    return _this;
  }

  return _createClass__default["default"](PagedPublicationControls);
}(MicroEvent__default["default"]);

var Animation = /*#__PURE__*/function () {
  function Animation(el) {
    this.run = 0;
    this.el = void 0;
    this.el = el;
  }

  var _proto = Animation.prototype;

  _proto.animate = function animate( // @ts-expect-error
  _temp, callback) {
    var _context,
        _context2,
        _this = this;

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        _ref$scale = _ref.scale,
        scale = _ref$scale === void 0 ? 1 : _ref$scale,
        _ref$easing = _ref.easing,
        easing = _ref$easing === void 0 ? 'ease-out' : _ref$easing,
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 0 : _ref$duration;

    var run = ++this.run;

    var transform = _concatInstanceProperty__default["default"](_context = _concatInstanceProperty__default["default"](_context2 = "translateX(".concat(x, ") translateY(")).call(_context2, y, ") scale(")).call(_context, scale, ")");

    if (this.el.style.transform === transform) {
      callback == null ? void 0 : callback();
    } else if (duration > 0) {
      var _context3;

      var transitionEnd = function transitionEnd() {
        if (run !== _this.run) return;

        _this.el.removeEventListener('transitionend', transitionEnd);

        _this.el.style.transition = 'none';
        callback == null ? void 0 : callback();
      };

      this.el.addEventListener('transitionend', transitionEnd, false);
      this.el.style.transition = _concatInstanceProperty__default["default"](_context3 = "transform ".concat(easing, " ")).call(_context3, duration, "ms");
      this.el.style.transform = transform;
    } else {
      this.el.style.transition = 'none';
      this.el.style.transform = transform;
      callback == null ? void 0 : callback();
    }

    return this;
  };

  return _createClass__default["default"](Animation);
}();

var PageSpread = /*#__PURE__*/function () {
  // @ts-expect-error
  function PageSpread(el, options) {
    if (options === void 0) {
      options = {};
    }

    this.visibility = 'gone';
    this.positioned = false;
    this.active = false;
    this.el = void 0;
    this.options = void 0;
    this.id = void 0;
    this.type = void 0;
    this.pageIds = void 0;
    this.width = void 0;
    this.left = void 0;
    this.maxZoomScale = void 0;
    this.el = el;
    this.options = options;
    this.id = this.options.id;
    this.type = this.options.type;
    this.pageIds = this.options.pageIds;
    this.width = this.options.width;
    this.left = this.options.left;
    this.maxZoomScale = this.options.maxZoomScale;
  }

  var _proto = PageSpread.prototype;

  _proto.isZoomable = function isZoomable() {
    return this.getMaxZoomScale() > 1 && this.getEl().dataset.zoomable !== 'false';
  };

  _proto.isScrollable = function isScrollable() {
    return this.getEl().classList.contains('verso--scrollable');
  };

  _proto.getEl = function getEl() {
    return this.el;
  };

  _proto.getOverlayEls = function getOverlayEls() {
    return this.getEl().querySelectorAll('.verso__overlay');
  };

  _proto.getPageEls = function getPageEls() {
    return this.getEl().querySelectorAll('.verso__page');
  };

  _proto.getRect = function getRect() {
    return this.getEl().getBoundingClientRect();
  };

  _proto.getContentRect = function getContentRect() {
    var _rect$top, _rect$left, _rect$right, _rect$bottom;

    var rect = {
      top: null,
      left: null,
      right: null,
      bottom: null,
      width: null,
      height: null
    };
    var pageEls = this.getPageEls();

    for (var idx = 0; idx < pageEls.length; idx++) {
      var pageEl = pageEls[idx];
      var pageRect = pageEl.getBoundingClientRect();

      if (rect.top == null || pageRect.top < rect.top) {
        rect.top = pageRect.top;
      }

      if (rect.left == null || pageRect.left < rect.left) {
        rect.left = pageRect.left;
      }

      if (rect.right == null || pageRect.right > rect.right) {
        rect.right = pageRect.right;
      }

      if (rect.bottom == null || pageRect.bottom > rect.bottom) {
        rect.bottom = pageRect.bottom;
      }
    }

    rect.top = (_rect$top = rect.top) != null ? _rect$top : 0;
    rect.left = (_rect$left = rect.left) != null ? _rect$left : 0;
    rect.right = (_rect$right = rect.right) != null ? _rect$right : 0;
    rect.bottom = (_rect$bottom = rect.bottom) != null ? _rect$bottom : 0;
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    return rect;
  };

  _proto.getId = function getId() {
    return this.id;
  };

  _proto.getType = function getType() {
    return this.type;
  };

  _proto.getPageIds = function getPageIds() {
    return this.pageIds;
  };

  _proto.getWidth = function getWidth() {
    return this.width;
  };

  _proto.getLeft = function getLeft() {
    return this.left;
  };

  _proto.getMaxZoomScale = function getMaxZoomScale() {
    return this.maxZoomScale;
  };

  _proto.getVisibility = function getVisibility() {
    return this.visibility;
  };

  _proto.setVisibility = function setVisibility(visibility) {
    if (this.visibility !== visibility) {
      this.getEl().style.display = visibility === 'visible' ? 'block' : 'none';
      this.visibility = visibility;
    }

    return this;
  };

  _proto.position = function position() {
    if (!this.positioned) {
      this.getEl().style.left = "".concat(this.getLeft(), "%");
      this.positioned = true;
    }

    return this;
  };

  _proto.activate = function activate() {
    this.active = true; // @ts-expect-error

    this.getEl().dataset.active = this.active;
  };

  _proto.deactivate = function deactivate() {
    this.active = false; // @ts-expect-error

    this.getEl().dataset.active = this.active;
  };

  return _createClass__default["default"](PageSpread);
}();

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_MOUSE = 'mouse';
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
var TOUCH_INPUT_MAP = {
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

function getDistance(p1, p2, props) {
  if (props === void 0) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.sqrt(x * x + y * y);
}
/**
 * @private
 * direction cons to string
 * @param {constant} direction
 * @returns {String}
 */

function directionStr(direction) {
  if (direction === DIRECTION_DOWN) return 'down';
  if (direction === DIRECTION_UP) return 'up';
  if (direction === DIRECTION_LEFT) return 'left';
  if (direction === DIRECTION_RIGHT) return 'right';
  return '';
}

function getAngle(p1, p2, props) {
  if (props === void 0) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.atan2(y, x) * 180 / Math.PI;
}

function getCenter(pointers) {
  var x = 0;
  var y = 0;
  pointers.forEach(function (pointer) {
    x += pointer.clientX;
    y += pointer.clientY;
  });
  return {
    x: Math.round(x / pointers.length),
    y: Math.round(y / pointers.length)
  };
}

var getRotation = function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
};

var getScale = function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
};

var getDirection = function getDirection(x, y) {
  return x === y ? DIRECTION_NONE : Math.abs(x) >= Math.abs(y) ? x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
};

var getVelocity = function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
};
/**
 * @private
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */


function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input;
  var deltaTime = input.timeStamp - last.timeStamp;
  var velocity;
  var velocityX;
  var velocityY;
  var direction;

  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = input.deltaX - last.deltaX;
    var deltaY = input.deltaY - last.deltaY;
    var v = getVelocity(deltaTime, deltaX, deltaY);
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
  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
  // jscs throwing error on defalut destructured values and without defaults tests fail

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
 * @private
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */


function simpleCloneInputData(input) {
  var _context;

  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = _mapInstanceProperty__default["default"](_context = input.pointers).call(_context, function (_ref) {
    var clientX = _ref.clientX,
        clientY = _ref.clientY;
    return {
      clientX: Math.round(clientX),
      clientY: Math.round(clientY)
    };
  });

  return {
    timeStamp: Date.now(),
    pointers: pointers,
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
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

  if (!session.firstInput) session.firstInput = simpleCloneInputData(input); // to compute scale and rotation we need to store the multiple touches

  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput,
      firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  input.center = getCenter(pointers);
  input.timeStamp = Date.now();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getAngle(offsetCenter, input.center);
  input.distance = getDistance(offsetCenter, input.center);
  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = Math.abs(overallVelocity.x) > Math.abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  computeIntervalInputData(session, input); // find the correct target

  input.target = manager.element.contains(input.srcEvent.target) ? input.srcEvent.target : manager.element;
}
/**
 * @private
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
  input.isFirst = Boolean(isFirst);
  input.isFinal = Boolean(isFinal);
  if (isFirst) manager.session = {}; // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'

  input.eventType = eventType; // compute scale, rotation etc

  computeInputData(manager, input);
  manager.recognize(input);
  manager.session.prevInput = input;
}

var addEventListeners = function addEventListeners(target, types, handler) {
  return _trimInstanceProperty__default["default"](types).call(types).split(/\s+/g).forEach(function (type) {
    target.addEventListener(type, handler, false);
  });
};

var removeEventListeners = function removeEventListeners(target, types, handler) {
  return _trimInstanceProperty__default["default"](types).call(types).split(/\s+/g).forEach(function (type) {
    target.removeEventListener(type, handler, false);
  });
};
/**
 * @private
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */


function getWindowForElement(element) {
  var _ref2 = element.ownerDocument || element,
      defaultView = _ref2.defaultView,
      parentWindow = _ref2.parentWindow;

  return defaultView || parentWindow || typeof window !== 'undefined' && window;
}
/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */


var Input = /*#__PURE__*/function () {
  function Input(manager) {
    var _this = this;

    this.manager = manager;
    this.callback = inputHandler;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (manager.options.enable) _this.handler(ev);
    };
  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */


  var _proto = Input.prototype;

  _proto.handler = function handler() {}
  /**
   * @private
   * bind the events
   */
  ;

  _proto.init = function init() {
    var element = this.element,
        evEl = this.evEl,
        evTarget = this.evTarget,
        evWin = this.evWin,
        domHandler = this.domHandler,
        target = this.target;
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
  ;

  _proto.destroy = function destroy() {
    var element = this.element,
        evEl = this.evEl,
        evTarget = this.evTarget,
        evWin = this.evWin,
        domHandler = this.domHandler,
        target = this.target;
    if (evEl) removeEventListeners(element, evEl, domHandler);
    if (evTarget) removeEventListeners(target, evTarget, domHandler);

    if (evWin) {
      removeEventListeners(getWindowForElement(element), evWin, domHandler);
    }
  };

  return _createClass__default["default"](Input);
}();

/**
 * @private
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */

var TouchInput = /*#__PURE__*/function (_Input) {
  _inherits__default["default"](TouchInput, _Input);

  function TouchInput() {
    var _this;

    _this = _Input.apply(this, arguments) || this;
    _this.evTarget = 'touchstart touchmove touchend touchcancel';
    _this.targetIds = {};

    _this.init();

    return _this;
  }

  var _proto = TouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = this.getTouches(ev, type);
    if (!touches) return;
    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  _proto.getTouches = function getTouches(ev, type) {
    var _this2 = this,
        _context;

    var allTouches = _Array$from__default["default"](ev.touches);

    var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0].identifier] = true;
      return [allTouches, allTouches];
    } // get target touches from touches


    var targetTouches = _filterInstanceProperty__default["default"](allTouches).call(allTouches, function (touch) {
      return _this2.target.contains(touch.target);
    }); // collect touches


    if (type === INPUT_START) {
      targetTouches.forEach(function (targetTouch) {
        targetIds[targetTouch.identifier] = true;
      });
    } // filter changed touches to only contain touches that exist in the collected target ids


    var changedTargetTouches = [];

    _Array$from__default["default"](ev.changedTouches).forEach(function (changedTouch) {
      if (targetIds[changedTouch.identifier]) {
        changedTargetTouches.push(changedTouch);
      } // cleanup removed touches


      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouch.identifier];
      }
    });

    if (!changedTargetTouches.length) return;
    return [_filterInstanceProperty__default["default"](_context = _concatInstanceProperty__default["default"](targetTouches).call(targetTouches, changedTargetTouches)).call(_context, function (item, i, list) {
      return _findIndexInstanceProperty__default["default"](list).call(list, function (_ref) {
        var identifier = _ref.identifier;
        return identifier === item.identifier;
      }) === i;
    }), changedTargetTouches];
  };

  return _createClass__default["default"](TouchInput);
}(Input);

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
/**
 * @private
 * Mouse events input
 * @constructor
 * @extends Input
 */

var MouseInput = /*#__PURE__*/function (_Input) {
  _inherits__default["default"](MouseInput, _Input);

  // mousedown state
  function MouseInput() {
    var _this;

    _this = _Input.apply(this, arguments) || this;
    _this.evEl = MOUSE_ELEMENT_EVENTS;
    _this.evWin = MOUSE_WINDOW_EVENTS;
    _this.pressed = false;

    _this.init();

    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = MouseInput.prototype;

  _proto.handler = function handler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

    if (eventType & INPUT_START && ev.button === 0) this.pressed = true;
    if (eventType & INPUT_MOVE && ev.which !== 1) eventType = INPUT_END; // mouse must be down

    if (!this.pressed) return;
    if (eventType & INPUT_END) this.pressed = false;
    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  };

  return _createClass__default["default"](MouseInput);
}(Input);

var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
};
var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
/**
 * @private
 * Pointer events input
 * @constructor
 * @extends Input
 */

var PointerEventInput = /*#__PURE__*/function (_Input) {
  _inherits__default["default"](PointerEventInput, _Input);

  function PointerEventInput() {
    var _this;

    _this = _Input.apply(this, arguments) || this;
    _this.evEl = POINTER_ELEMENT_EVENTS;
    _this.evWin = POINTER_WINDOW_EVENTS;
    _this.store = _this.manager.session.pointerEvents = [];

    _this.init();

    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = PointerEventInput.prototype;

  _proto.handler = function handler(ev) {
    var store = this.store;
    var removePointer = false;
    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = ev.pointerType;
    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

    var storeIndex = _findIndexInstanceProperty__default["default"](store).call(store, function (_ref) {
      var pointerId = _ref.pointerId;
      return pointerId === ev.pointerId;
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

    if (removePointer) _spliceInstanceProperty__default["default"](store).call(store, storeIndex, 1);
  };

  return _createClass__default["default"](PointerEventInput);
}(Input);

/**
 * @private
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

var TouchMouseInput = /*#__PURE__*/function (_Input) {
  _inherits__default["default"](TouchMouseInput, _Input);

  function TouchMouseInput() {
    var _this;

    _this = _Input.apply(this, arguments) || this;
    _this.primaryTouch = null;
    _this.lastTouches = [];

    _this.handler = function (manager, inputEvent, inputData) {
      var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
      var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

      if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
        return;
      } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


      if (isTouch) {
        if (inputEvent & INPUT_START) {
          _this.primaryTouch = inputData.changedPointers[0].identifier;

          _this.setLastTouch(inputData);
        } else if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
          _this.setLastTouch(inputData);
        }
      } else if (isMouse && _this.isSyntheticEvent(inputData)) {
        return;
      }

      _this.callback(manager, inputEvent, inputData);
    };

    _this.touch = new TouchInput(_this.manager, _this.handler);
    _this.mouse = new MouseInput(_this.manager, _this.handler);

    _this.init();

    return _this;
  }
  /**
   * @private
   * handle mouse and touch events
   * @param {Hammer} manager
   * @param {String} inputEvent
   * @param {Object} inputData
   */


  var _proto = TouchMouseInput.prototype;

  /**
   * @private
   * remove the event listeners
   */
  _proto.destroy = function destroy() {
    this.touch.destroy();
    this.mouse.destroy();
  };

  _proto.isSyntheticEvent = function isSyntheticEvent(_ref) {
    var _ref$srcEvent = _ref.srcEvent,
        clientX = _ref$srcEvent.clientX,
        clientY = _ref$srcEvent.clientY;
    return this.lastTouches.some(function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      return Math.abs(clientX - x) <= DEDUP_DISTANCE && Math.abs(clientY - y) <= DEDUP_DISTANCE;
    });
  };

  _proto.setLastTouch = function setLastTouch(_ref3) {
    var _ref3$changedPointers = _slicedToArray__default["default"](_ref3.changedPointers, 1),
        _ref3$changedPointers2 = _ref3$changedPointers[0],
        identifier = _ref3$changedPointers2.identifier,
        clientX = _ref3$changedPointers2.clientX,
        clientY = _ref3$changedPointers2.clientY;

    if (identifier === this.primaryTouch) {
      var lastTouch = {
        x: clientX,
        y: clientY
      };
      this.lastTouches.push(lastTouch);
      var lts = this.lastTouches;
      setTimeout(function () {
        var i = lts.indexOf(lastTouch);
        if (i > -1) _spliceInstanceProperty__default["default"](lts).call(lts, i, 1);
      }, DEDUP_TIMEOUT);
    }
  };

  return _createClass__default["default"](TouchMouseInput);
}(Input);

function ownKeys$3(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }

var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

function stateStr(state) {
  if (state & STATE_CANCELLED) return 'cancel';
  if (state & STATE_ENDED) return 'end';
  if (state & STATE_CHANGED) return 'move';
  if (state & STATE_BEGAN) return 'start';
  return '';
}
/**
 * @private
 * get a unique id
 * @returns {number} uniqueId
 */


var _uniqueId = 1;

var uniqueId = function uniqueId() {
  return _uniqueId++;
};
/**
 * @private
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

/**
 * @private
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */


var Recognizer = /*#__PURE__*/function () {
  function Recognizer(options) {
    var _this$options$enable;

    this.id = uniqueId();
    this.manager = null;
    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.options = _objectSpread$3({}, this.defaults, options);
    this.options.enable = (_this$options$enable = this.options.enable) != null ? _this$options$enable : true;
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */


  var _proto = Recognizer.prototype;

  _proto.set = function set(options) {
    _Object$assign__default["default"](this.options, options); // also update the touchAction, in case something changed about the directions/enabled state


    if (this.manager) this.manager.touchAction.update();
    return this;
  }
  /**
   * @private
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */
  ;

  _proto.emit = function emit(input) {
    var manager = this.manager,
        options = this.options,
        state = this.state;

    var emit = function emit(event) {
      return manager.emit(event, input);
    }; // 'panstart' and 'panmove'


    if (state < STATE_ENDED) emit(options.event + stateStr(state));
    emit(this.options.event); // simple 'eventName' events
    // additional event(panleft, panright, pinchin, pinchout...)

    if (input.additionalEvent) emit(input.additionalEvent); // panend and pancancel

    if (state >= STATE_ENDED) emit(options.event + stateStr(state));
  }
  /**
   * @private
   * update the recognizer
   * @param {Object} inputData
   */
  ;

  _proto.recognize = function recognize(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    // is is enabled and allow recognizing?
    if (!this.options.enable) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    } // reset when we've reached the end


    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    var inputDataClone = _objectSpread$3({}, inputData);

    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
    // so trigger an event

    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.emit(inputDataClone);
    }
  }
  /**
   * @private
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {constant} STATE
   */

  /* jshint ignore:start */
  ;

  _proto.process = function process() {}
  /* jshint ignore:end */

  /**
   * @private
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */
  ;

  _proto.getTouchAction = function getTouchAction() {}
  /**
   * @private
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */
  ;

  _proto.reset = function reset() {};

  return _createClass__default["default"](Recognizer);
}();

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
/**
 * @private
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */

function prefixed(obj, property) {
  var camelProp = property[0].toUpperCase() + _sliceInstanceProperty__default["default"](property).call(property, 1);

  return _findInstanceProperty__default["default"](VENDOR_PREFIXES).call(VENDOR_PREFIXES, function (prefix) {
    return (prefix ? prefix + camelProp : property) in obj;
  });
}

var _window$CSS;
var PREFIXED_TOUCH_ACTION = typeof document !== 'undefined' && prefixed(document.createElement('div').style, 'touchAction'); // magical touchAction value

var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_NONE = 'none';
var actions = ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'];
var cssSupports = typeof window !== 'undefined' && ((_window$CSS = window.CSS) == null ? void 0 : _window$CSS.supports);
var TOUCH_ACTION_MAP = PREFIXED_TOUCH_ACTION && actions.reduce(function (touchMap, val) {
  // If css.supports is not supported but there is native touch-action assume it supports
  // all values. This is the case for IE 10 and 11.
  touchMap[val] = cssSupports ? cssSupports('touch-action', val) : true;
  return touchMap;
}, {});

function cleanTouchActions(actions) {
  // none
  if (_includesInstanceProperty__default["default"](actions).call(actions, TOUCH_ACTION_NONE)) return TOUCH_ACTION_NONE;

  var hasPanX = _includesInstanceProperty__default["default"](actions).call(actions, TOUCH_ACTION_PAN_X);

  var hasPanY = _includesInstanceProperty__default["default"](actions).call(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
  // for different directions, e.g. horizontal pan but vertical swipe?)
  // we need none (as otherwise with pan-x pan-y combined none of these
  // recognizers will work, since the browser would handle all panning


  if (hasPanX && hasPanY) return TOUCH_ACTION_NONE; // pan-x OR pan-y

  if (hasPanX) return TOUCH_ACTION_PAN_X;
  if (hasPanY) return TOUCH_ACTION_PAN_Y; // manipulation

  var hasManipulation = _includesInstanceProperty__default["default"](actions).call(actions, TOUCH_ACTION_MANIPULATION);

  if (hasManipulation) return TOUCH_ACTION_MANIPULATION;
  return TOUCH_ACTION_AUTO;
}
/**
 * @private
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */


var TouchAction = /*#__PURE__*/function () {
  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }
  /**
   * @private
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */


  var _proto = TouchAction.prototype;

  _proto.set = function set(value) {
    var _context;

    // find out the touch-action by the event handlers
    if (value === TOUCH_ACTION_COMPUTE) value = this.compute();

    if (PREFIXED_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
    }

    this.actions = _trimInstanceProperty__default["default"](_context = value.toLowerCase()).call(_context);
  }
  /**
   * @private
   * just re-set the touchAction value
   */
  ;

  _proto.update = function update() {
    this.set(this.manager.options.touchAction);
  }
  /**
   * @private
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */
  ;

  _proto.compute = function compute() {
    return cleanTouchActions(this.manager.recognizers.reduce(function (actions, recognizer) {
      return recognizer.options.enable ? _concatInstanceProperty__default["default"](actions).call(actions, recognizer.getTouchAction()) : actions;
    }, []).join(' '));
  }
  /**
   * @private
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */
  ;

  _proto.preventDefaults = function preventDefaults(_ref) {
    var _context2, _context3, _context4;

    var srcEvent = _ref.srcEvent,
        pointers = _ref.pointers,
        distance = _ref.distance,
        deltaTime = _ref.deltaTime,
        offsetDirection = _ref.offsetDirection;
    // if the touch action did prevented once this session
    if (this.manager.session.prevented) return srcEvent.preventDefault();
    var hasNone = _includesInstanceProperty__default["default"](_context2 = this.actions).call(_context2, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE]; // do not prevent defaults if this is a tap gesture

    if (hasNone && pointers.length === 1 && distance < 2 && deltaTime < 250) return;
    var hasPanY = _includesInstanceProperty__default["default"](_context3 = this.actions).call(_context3, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
    var hasPanX = _includesInstanceProperty__default["default"](_context4 = this.actions).call(_context4, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X]; // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent

    if (hasPanX && hasPanY) return;

    if (hasNone || hasPanY && offsetDirection & DIRECTION_HORIZONTAL || hasPanX && offsetDirection & DIRECTION_VERTICAL) {
      this.manager.session.prevented = true;
      srcEvent.preventDefault();
    }
  };

  return _createClass__default["default"](TouchAction);
}();

function ownKeys$2(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }
var SUPPORT_TOUCH = typeof window !== 'undefined' && 'ontouchstart' in window;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent);
var SUPPORT_POINTER_EVENTS = typeof window !== 'undefined' && Boolean(prefixed(window, 'PointerEvent'));
/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */

function createInputInstance(manager) {
  var inputClass = manager.options.inputClass;
  if (inputClass) return new inputClass(manager);
  if (SUPPORT_POINTER_EVENTS) return new PointerEventInput(manager);
  if (SUPPORT_ONLY_TOUCH) return new TouchInput(manager);
  if (!SUPPORT_TOUCH) return new MouseInput(manager);
  return new TouchMouseInput(manager);
}

var defaults = {
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

var Manager = /*#__PURE__*/function () {
  function Manager(element, options) {
    var _this = this;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.options = _objectSpread$2({}, defaults, options);
    this.options.inputTarget = this.options.inputTarget || element;
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    this.toggleCssProps(true);
    this.options.recognizers.forEach(function (_ref) {
      var ctor = _ref[0],
          opts = _ref[1];

      _this.add(new ctor(opts));
    }, this);
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @returns {Manager}
   */


  var _proto = Manager.prototype;

  _proto.set = function set(options) {
    _Object$assign__default["default"](this.options, options); // Options that need a little more setup


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
  ;

  _proto.recognize = function recognize(inputData) {
    var session = this.session; // run the touch-action polyfill

    this.touchAction.preventDefaults(inputData); // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`

    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
    // or when we're in a new session

    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
      curRecognizer = session.curRecognizer = null;
    }

    this.recognizers.forEach(function (recognizer) {
      // find out if we are allowed try to recognize the input for this one.
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      if (!curRecognizer || recognizer === curRecognizer) {
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer


      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
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
  ;

  _proto.get = function get(recognizer) {
    var _context;

    return recognizer instanceof Recognizer ? recognizer : _findInstanceProperty__default["default"](_context = this.recognizers).call(_context, function (recogger) {
      return recogger.options.event === recognizer;
    });
  }
  /**
   * @private add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */
  ;

  _proto.add = function add(recognizer) {
    // remove existing
    var existing = this.get(recognizer.options.event);
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
  ;

  _proto.remove = function remove(recognizer) {
    recognizer = this.get(recognizer); // let's make sure this recognizer exists

    if (recognizer) {
      var index = this.recognizers.indexOf(recognizer);

      if (index !== -1) {
        var _context2;

        _spliceInstanceProperty__default["default"](_context2 = this.recognizers).call(_context2, index, 1);

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
  ;

  _proto.on = function on(events, handler) {
    if (events === undefined || handler === undefined) return;
    var handlers = this.handlers;

    _trimInstanceProperty__default["default"](events).call(events).split(/\s+/g).forEach(function (event) {
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
  ;

  _proto.off = function off(events, handler) {
    var _this2 = this;

    if (events === undefined) return;

    _trimInstanceProperty__default["default"](events).call(events).split(/\s+/g).forEach(function (event) {
      if (!handler) {
        delete _this2.handlers[event];
      } else if (_this2.handlers[event]) {
        var _context3;

        _spliceInstanceProperty__default["default"](_context3 = _this2.handlers[event]).call(_context3, _this2.handlers[event].indexOf(handler), 1);
      }
    });

    return this;
  }
  /**
   * @private emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */
  ;

  _proto.emit = function emit(event, data) {
    var _context4;

    // we also want to trigger dom events
    if (this.options.domEvents) triggerDomEvent(event, data); // no handlers, so skip it all

    var handlers = this.handlers[event] && _sliceInstanceProperty__default["default"](_context4 = this.handlers[event]).call(_context4);

    if (!handlers || !handlers.length) return;
    data.type = event;

    data.preventDefault = function () {
      data.srcEvent.preventDefault();
    };

    handlers.forEach(function (handler) {
      handler(data);
    });
  }
  /**
   * @private
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */
  ;

  _proto.destroy = function destroy() {
    if (this.element) this.toggleCssProps(false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  };

  _proto.toggleCssProps = function toggleCssProps(add) {
    var _this3 = this;

    var element = this.element;
    if (!element.style) return;

    _Object$entries__default["default"](this.options.cssProps).forEach(function (_ref2) {
      var value = _ref2[0],
          name = _ref2[1];
      var prop = prefixed(element.style, name);

      if (add) {
        _this3.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = _this3.oldCssProps[prop] || '';
      }
    });

    if (!add) this.oldCssProps = {};
  };

  return _createClass__default["default"](Manager);
}();

function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent('Event');
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}

/**
 * @private
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */

var AttrRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inherits__default["default"](AttrRecognizer, _Recognizer);

  function AttrRecognizer() {
    return _Recognizer.apply(this, arguments) || this;
  }

  var _proto = AttrRecognizer.prototype;

  /**
   * @private
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */
  _proto.attrTest = function attrTest(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  }
  /**
   * @private
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */
  ;

  _proto.process = function process(input) {
    var state = this.state;
    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

    if (isRecognized && (input.eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    }

    if (isRecognized || isValid) {
      if (input.eventType & INPUT_END) return state | STATE_ENDED;
      if (!(state & STATE_BEGAN)) return STATE_BEGAN;
      return state | STATE_CHANGED;
    }

    return STATE_FAILED;
  };

  return _createClass__default["default"](AttrRecognizer);
}(Recognizer);
AttrRecognizer.prototype.defaults = {
  /**
   * @private
   * @type {Number}
   * @default 1
   */
  pointers: 1
};

/**
 * @private
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

var PanRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inherits__default["default"](PanRecognizer, _AttrRecognizer);

  function PanRecognizer() {
    var _context;

    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _AttrRecognizer.call.apply(_AttrRecognizer, _concatInstanceProperty__default["default"](_context = [this]).call(_context, args)) || this;
    _this.pX = null;
    _this.pY = null;
    return _this;
  }

  var _proto = PanRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    var direction = this.options.direction;
    var actions = [];
    if (direction & DIRECTION_HORIZONTAL) actions.push(TOUCH_ACTION_PAN_Y);
    if (direction & DIRECTION_VERTICAL) actions.push(TOUCH_ACTION_PAN_X);
    return actions;
  };

  _proto.directionTest = function directionTest(input) {
    var options = this.options;
    var deltaX = input.deltaX,
        deltaY = input.deltaY;
    var distance = input.distance; // lock to axis?

    var hasMoved = true;

    if (!(input.direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        input.direction = deltaX === 0 ? DIRECTION_NONE : deltaX < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = deltaX !== this.pX;
        distance = Math.abs(deltaX);
      } else {
        input.direction = deltaY === 0 ? DIRECTION_NONE : deltaY < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = deltaY !== this.pY;
        distance = Math.abs(deltaY);
      }
    }

    return hasMoved && distance > options.threshold && input.direction & options.direction;
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
  };

  _proto.emit = function emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    var direction = directionStr(input.direction);
    if (direction) input.additionalEvent = this.options.event + direction;

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return _createClass__default["default"](PanRecognizer);
}(AttrRecognizer);
PanRecognizer.prototype.defaults = {
  event: 'pan',
  threshold: 10,
  pointers: 1,
  direction: DIRECTION_ALL
};

/**
 * @private
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */

var PinchRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inherits__default["default"](PinchRecognizer, _AttrRecognizer);

  function PinchRecognizer() {
    return _AttrRecognizer.apply(this, arguments) || this;
  }

  var _proto = PinchRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  };

  _proto.emit = function emit(input) {
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      input.additionalEvent = this.options.event + inOut;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return _createClass__default["default"](PinchRecognizer);
}(AttrRecognizer);
PinchRecognizer.prototype.defaults = {
  event: 'pinch',
  threshold: 0,
  pointers: 2
};

/**
 * @private
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */

var PressRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inherits__default["default"](PressRecognizer, _Recognizer);

  function PressRecognizer() {
    var _context;

    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Recognizer.call.apply(_Recognizer, _concatInstanceProperty__default["default"](_context = [this]).call(_context, args)) || this;
    _this._timer = null;
    _this._input = null;
    return _this;
  }

  var _proto = PressRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  };

  _proto.process = function process(input) {
    var _this2 = this;

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
      this._timer = setTimeout(function () {
        _this2.state = STATE_RECOGNIZED;

        _this2.tryEmit();
      }, options.time);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit(input) {
    if (this.state !== STATE_RECOGNIZED) return;

    if (input && input.eventType & INPUT_END) {
      this.manager.emit("".concat(this.options.event, "up"), input);
    } else {
      this._input.timeStamp = Date.now();
      this.manager.emit(this.options.event, this._input);
    }
  }
  /**
   * @private
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */
  ;

  _proto.tryEmit = function tryEmit(input) {
    if (this.canEmit()) return this.emit(input); // it's failing anyway

    this.state = STATE_FAILED;
  }
  /**
   * @private
   * can we emit?
   * @returns {boolean}
   */
  ;

  _proto.canEmit = function canEmit() {
    var i = 0;

    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) return false;
      i++;
    }

    return true;
  };

  return _createClass__default["default"](PressRecognizer);
}(Recognizer);
PressRecognizer.prototype.defaults = {
  event: 'press',
  pointers: 1,
  time: 251,
  // minimal time of the pointer to be pressed
  threshold: 9 // a minimal movement is ok, but keep it low

};

/**
 * @private
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */

var TapRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inherits__default["default"](TapRecognizer, _Recognizer);

  function TapRecognizer() {
    var _context;

    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Recognizer.call.apply(_Recognizer, _concatInstanceProperty__default["default"](_context = [this]).call(_context, args)) || this;
    _this.pTime = false;
    _this.pCenter = false;
    _this._timer = null;
    _this._input = null;
    _this.count = 0;
    return _this;
  }

  var _proto = TapRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  };

  _proto.process = function process(input) {
    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;
    this.reset();

    if (input.eventType & INPUT_START && this.count === 0) {
      return this.failTimeout();
    } // we only allow little movement
    // and we've reached an end event, so a tap is possible


    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== INPUT_END) return this.failTimeout();
      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;
      this.count = !validMultiTap || !validInterval ? 1 : this.count + 1;
      this._input = input; // if tap count matches we have recognized it,
      // else it has began recognizing...

      if (this.count % options.taps === 0) return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  };

  _proto.failTimeout = function failTimeout() {
    var _this2 = this;

    this._timer = setTimeout(function () {
      _this2.state = STATE_FAILED;
    }, this.options.interval);
    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit() {
    if (this.state === STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  };

  return _createClass__default["default"](TapRecognizer);
}(Recognizer);
TapRecognizer.prototype.defaults = {
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

};

var getHammerInputClass = function getHammerInputClass() {
  return typeof window !== 'undefined' && 'ontouchstart' in window && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent) ? TouchInput : null;
};

var buildPageIds = function buildPageIds(pageSpreads) {
  return pageSpreads.reduce(function (pageIds, pageSpread) {
    pageSpread.options.pageIds.forEach(function (pageId) {
      pageIds[pageId] = pageSpread;
    });
    return pageIds;
  }, {});
};

var clipCoordinate = function clipCoordinate(coordinate, scale, size, offset) {
  return size * scale < 100 ? offset * -scale + 50 - size * scale / 2 : Math.max(Math.min(coordinate, offset * -scale), offset * -scale - size * scale + 100);
};

function getPageSpreadBounds(pageSpread) {
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

function isCoordinateInsideElement(x, y, el) {
  var _el$getBoundingClient = el.getBoundingClientRect(),
      left = _el$getBoundingClient.left,
      right = _el$getBoundingClient.right,
      top = _el$getBoundingClient.top,
      bottom = _el$getBoundingClient.bottom;

  return x >= left && x <= right && y >= top && y <= bottom;
}

function traversePageSpreads(els) {
  var pageSpreads = [];
  var left = 0;

  for (var i = 0; i < els.length; i++) {
    var _el$dataset$width, _el$dataset$pageIds, _el$dataset$maxZoomSc;

    var el = els[i];
    var width = Number((_el$dataset$width = el.dataset.width) != null ? _el$dataset$width : 100);
    var pageSpread = new PageSpread(el, {
      id: el.dataset.id,
      type: el.dataset.type,
      pageIds: ((_el$dataset$pageIds = el.dataset.pageIds) == null ? void 0 : _el$dataset$pageIds.split(',')) || [],
      maxZoomScale: Number((_el$dataset$maxZoomSc = el.dataset.maxZoomScale) != null ? _el$dataset$maxZoomSc : 1),
      width: width,
      left: left
    });
    left += width;
    pageSpreads.push(pageSpread);
  }

  return pageSpreads;
}

var Verso = /*#__PURE__*/function () {
  function Verso(el, _options) {
    var _this = this,
        _this$options$swipeVe,
        _this$options$swipeTh,
        _this$options$navigat,
        _this$options$navigat2,
        _this$options$zoomDur,
        _this$options$doubleT;

    if (_options === void 0) {
      _options = {};
    }

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
    this.started = false;
    this.destroyed = false;
    this._events = {};
    this.el = void 0;
    this.scrollerEl = void 0;
    this.pageSpreadEls = void 0;
    this.pageSpreads = void 0;
    this.pageIds = void 0;
    this.options = void 0;
    this.swipeVelocity = void 0;
    this.swipeThreshold = void 0;
    this.navigationDuration = void 0;
    this.navigationPanDuration = void 0;
    this.zoomDuration = void 0;
    this.tap = void 0;
    this.animation = void 0;
    this.hammer = void 0;

    this.onPanStart = function (e) {
      // Only allow panning if zoomed in or doing a horizontal pan.
      // This ensures vertical scrolling works for scrollable page spreads.
      if (_this.transform.scale > 1 || e.direction === DIRECTION_LEFT || e.direction === DIRECTION_RIGHT) {
        var x = e.center.x;
        var edgeThreshold = 30;
        var width = _this.scrollerEl.offsetWidth; // Prevent panning when edge-swiping on iOS.

        if (x > edgeThreshold && x < width - edgeThreshold) {
          _this.startTransform.left = _this.transform.left;
          _this.startTransform.top = _this.transform.top;
          _this.panning = true;

          _this.trigger('panStart');
        }
      }
    };

    this.onPanMove = function (e) {
      if (_this.pinching || !_this.panning) return;
      var scale = _this.transform.scale;

      if (scale > 1) {
        var activePageSpread = _this.getActivePageSpread();

        var carouselOffset = activePageSpread.getLeft();
        var carouselScaledOffset = carouselOffset * scale;

        var _getPageSpreadBounds = getPageSpreadBounds(activePageSpread),
            width = _getPageSpreadBounds.width,
            height = _getPageSpreadBounds.height,
            left = _getPageSpreadBounds.left,
            top = _getPageSpreadBounds.top;

        var x = _this.startTransform.left + carouselScaledOffset + e.deltaX / _this.scrollerEl.offsetWidth * 100;
        x = clipCoordinate(x, scale, width, left) - carouselScaledOffset;
        var y = _this.startTransform.top + e.deltaY / _this.scrollerEl.offsetHeight * 100;
        y = clipCoordinate(y, scale, height, top);
        _this.transform.left = x;
        _this.transform.top = y;

        _this.animation.animate({
          x: x + '%',
          y: y + '%',
          scale: scale,
          easing: 'linear'
        });
      } else {
        _this.animation.animate({
          x: _this.transform.left + e.deltaX / _this.scrollerEl.offsetWidth * 100 + '%',
          easing: 'linear'
        });
      }
    };

    this.onPanEnd = function (e) {
      if (!_this.panning) return;
      _this.panning = false;

      _this.trigger('panEnd');

      if (_this.transform.scale === 1 && !_this.pinching) {
        var position = _this.getPosition();

        var velocity = e.overallVelocityX;

        if (Math.abs(velocity) >= _this.swipeVelocity && Math.abs(e.deltaX) >= _this.swipeThreshold) {
          var options = {
            velocity: velocity,
            duration: _this.navigationPanDuration
          };

          if (e.offsetDirection === DIRECTION_LEFT) {
            _this.next(options);
          } else if (e.offsetDirection === DIRECTION_RIGHT) {
            _this.prev(options);
          }
        }

        if (position === _this.getPosition()) {
          _this.animation.animate({
            x: _this.transform.left + '%',
            duration: _this.navigationPanDuration
          });

          _this.trigger('attemptedNavigation', {
            position: _this.getPosition()
          });
        }
      }
    };

    this.onPinchStart = function () {
      if (!_this.getActivePageSpread().isZoomable()) return;
      _this.pinching = true; // @ts-expect-error

      _this.el.dataset.pinching = true;
      _this.startTransform.scale = _this.transform.scale;
    };

    this.onPinchMove = function (e) {
      if (!_this.pinching) return;

      _this.zoomTo({
        x: e.center.x,
        y: e.center.y,
        scale: _this.startTransform.scale * e.scale,
        bounds: false,
        easing: 'linear'
      });
    };

    this.onPinchEnd = function (e) {
      if (!_this.pinching) return;

      var activePageSpread = _this.getActivePageSpread();

      var maxZoomScale = activePageSpread.getMaxZoomScale();
      var scale = Math.max(1, Math.min(_this.transform.scale, maxZoomScale));

      var position = _this.getPosition();

      if (_this.startTransform.scale === 1 && scale > 1) {
        _this.trigger('zoomedIn', {
          position: position
        });
      } else if (_this.startTransform.scale > 1 && scale === 1) {
        _this.trigger('zoomedOut', {
          position: position
        });
      }

      _this.zoomTo({
        x: e.center.x,
        y: e.center.y,
        scale: scale,
        duration: _this.zoomDuration
      }, function () {
        _this.pinching = false; // @ts-expect-error

        _this.el.dataset.pinching = false;
      });
    };

    this.onPress = function (e) {
      _this.trigger('pressed', _this.getCoordinateInfo(e.center.x, e.center.y, _this.getActivePageSpread()));
    };

    this.onContextmenu = function (e) {
      e.preventDefault();

      _this.trigger('contextmenu', _this.getCoordinateInfo(e.clientX, e.clientY, _this.getActivePageSpread()));

      return false;
    };

    this.onWheel = function (e) {
      var activePageSpread = _this.getActivePageSpread();

      if (!activePageSpread.isZoomable()) return; // see https://stackoverflow.com/a/23668035

      var deltaY = e.deltaY;
      if (e.webkitDirectionInvertedFromDevice) deltaY = -deltaY;

      var position = _this.getPosition();

      if (deltaY > 0 && _this.transform.scale === 1) {
        _this.zoomTo({
          x: e.clientX,
          y: e.clientY,
          scale: activePageSpread.getMaxZoomScale(),
          duration: _this.zoomDuration
        }, function () {
          _this.trigger('zoomedIn', {
            position: position
          });
        });
      } else if (deltaY < 0 && _this.transform.scale > 1) {
        _this.zoomTo({
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          duration: _this.zoomDuration
        }, function () {
          _this.trigger('zoomedOut', {
            position: position
          });
        });
      }
    };

    this.onSingletap = function (e) {
      var activePageSpread = _this.getActivePageSpread();

      var coordinateInfo = _this.getCoordinateInfo(e.center.x, e.center.y, activePageSpread);

      _this.trigger('pointerdown', coordinateInfo);

      clearTimeout(_this.tap.timeout);

      if (_this.tap.count === 1) {
        _this.tap.count = 0;

        _this.trigger('doubleClicked', coordinateInfo);

        if (activePageSpread.isZoomable()) {
          var maxZoomScale = activePageSpread.getMaxZoomScale();
          var zoomedIn = _this.transform.scale > 1;
          var scale = zoomedIn ? 1 : maxZoomScale;
          var zoomEvent = zoomedIn ? 'zoomedOut' : 'zoomedIn';

          var position = _this.getPosition();

          _this.zoomTo({
            x: e.center.x,
            y: e.center.y,
            scale: scale,
            duration: _this.zoomDuration
          }, function () {
            _this.trigger(zoomEvent, {
              position: position
            });
          });
        }
      } else {
        _this.tap.count++;
        _this.tap.timeout = setTimeout(function () {
          _this.tap.count = 0;

          _this.trigger('clicked', coordinateInfo);
        }, _this.tap.delay);
      }
    };

    this.onTouchStart = function (e) {
      if (!_this.getActivePageSpread().isScrollable()) e.preventDefault();
    };

    this.onTouchEnd = function (e) {
      if (!_this.getActivePageSpread().isScrollable()) e.preventDefault();
    };

    this.onResize = function () {
      if (_this.transform.scale > 1) {
        var position = _this.getPosition();

        _this.transform.left = _this.getLeftTransformFromPageSpread(position, _this.getActivePageSpread());
        _this.transform.top = 0;
        _this.transform.scale = 1;

        _this.zoomTo({
          x: _this.transform.left,
          y: _this.transform.top,
          scale: _this.transform.scale,
          duration: 0
        });

        _this.trigger('zoomedOut', {
          position: position
        });
      }
    };

    this.el = el;
    this.options = _options;
    this.swipeVelocity = (_this$options$swipeVe = this.options.swipeVelocity) != null ? _this$options$swipeVe : 0.3;
    this.swipeThreshold = (_this$options$swipeTh = this.options.swipeThreshold) != null ? _this$options$swipeTh : 10;
    this.navigationDuration = (_this$options$navigat = this.options.navigationDuration) != null ? _this$options$navigat : 240;
    this.navigationPanDuration = (_this$options$navigat2 = this.options.navigationPanDuration) != null ? _this$options$navigat2 : 200;
    this.zoomDuration = (_this$options$zoomDur = this.options.zoomDuration) != null ? _this$options$zoomDur : 200;
    this.tap = {
      count: 0,
      delay: (_this$options$doubleT = this.options.doubleTapDelay) != null ? _this$options$doubleT : 300,
      timeout: undefined
    };
  }

  var _proto = Verso.prototype;

  _proto.bind = function bind(event, fn) {
    this._events[event] = this._events[event] || [];
    return this._events[event].push(fn);
  };

  _proto.unbind = function unbind(event, fn) {
    if (this._events[event]) {
      var _context;

      return _spliceInstanceProperty__default["default"](_context = this._events[event]).call(_context, this._events[event].indexOf(fn), 1);
    }
  };

  _proto.trigger = function trigger(event) {
    var _this$_events$event,
        _this2 = this;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_this$_events$event = this._events[event]) == null ? void 0 : _this$_events$event.forEach(function (e) {
      e.apply(_this2, args);
    });
  };

  _proto.start = function start() {
    var _this$getPageSpreadPo;

    this.scrollerEl = this.el.querySelector('.verso__scroller');
    this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
    this.pageSpreads = traversePageSpreads(this.pageSpreadEls);
    this.pageIds = buildPageIds(this.pageSpreads);
    this.animation = new Animation(this.scrollerEl);
    this.hammer = new Manager(this.scrollerEl, {
      touchAction: 'none',
      enable: false,
      inputClass: getHammerInputClass(),
      recognizers: [[PanRecognizer, {
        threshold: 5,
        direction: DIRECTION_ALL
      }], [TapRecognizer, {
        event: 'singletap',
        interval: 0
      }], [PinchRecognizer], [PressRecognizer, {
        time: 500
      }]]
    }); //@ts-expect-error

    this.hammer.on('panstart', this.onPanStart); //@ts-expect-error

    this.hammer.on('panmove', this.onPanMove); //@ts-expect-error

    this.hammer.on('panend', this.onPanEnd); //@ts-expect-error

    this.hammer.on('pancancel', this.onPanEnd); //@ts-expect-error

    this.hammer.on('singletap', this.onSingletap); //@ts-expect-error

    this.hammer.on('pinchstart', this.onPinchStart); //@ts-expect-error

    this.hammer.on('pinchmove', this.onPinchMove); //@ts-expect-error

    this.hammer.on('pinchend', this.onPinchEnd); //@ts-expect-error

    this.hammer.on('pinchcancel', this.onPinchEnd); //@ts-expect-error

    this.hammer.on('press', this.onPress);
    this.scrollerEl.addEventListener('contextmenu', this.onContextmenu, false);
    this.scrollerEl.addEventListener('wheel', this.onWheel, false);
    var pageId = (_this$getPageSpreadPo = this.getPageSpreadPositionFromPageId(this.options.pageId)) != null ? _this$getPageSpreadPo : 0; //@ts-expect-error

    this.hammer.set({
      enable: true
    });
    this.started = true;
    this.destroyed = false;
    this.navigateTo(pageId, {
      duration: 0
    });
    this.el.addEventListener('touchstart', this.onTouchStart, false);
    this.el.addEventListener('touchend', this.onTouchEnd, false);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize, false);
    }

    return this;
  };

  _proto.destroy = function destroy() {
    if (!this.started) {
      return console.warn("You've called .destroy() on a viewer that was not started yet, this is a no-op.");
    }

    if (this.destroyed) {
      return console.warn("You've called .destroy() on a viewer that has already been destroyed and not restarted, this is a no-op.");
    }

    this.scrollerEl.removeEventListener('contextmenu', this.onContextmenu);
    this.scrollerEl.removeEventListener('wheel', this.onWheel); //@ts-expect-error

    this.hammer.destroy();
    this.el.removeEventListener('touchstart', this.onTouchStart);
    this.el.removeEventListener('touchend', this.onTouchEnd);

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }

    this.started = false;
    this.destroyed = true;
    return this;
  };

  _proto.first = function first(options) {
    return this.navigateTo(0, options);
  };

  _proto.prev = function prev(options) {
    return this.navigateTo(this.getPosition() - 1, options);
  };

  _proto.next = function next(options) {
    return this.navigateTo(this.getPosition() + 1, options);
  };

  _proto.last = function last(options) {
    return this.navigateTo(this.getPageSpreadCount() - 1, options);
  };

  _proto.navigateTo = function navigateTo(newPosition, options) {
    var _options$velocity,
        _options$duration,
        _this3 = this;

    if (this.destroyed) {
      return console.warn(" \nYou've called a navigation method on a viewer that was previously destroyed, this is a no-op.\nPlease call viewer.start() again, if you want to reuse this Viewer instance.\n\nYou might have forgotten to remove an event handler that\ncalls first/prev/next/last/navigateTo on the viewer.");
    }

    if (!this.started) {
      return console.warn("\nYou've called a navigation method on a viewer that hasn't been started yet, this is a no-op.\nPlease call viewer.start() first.\n\nYou might have forgotten to remove an event handler that\ncalls .first()/.prev()/.next()/.last()/.navigateTo() on the viewer.\n");
    }

    if (newPosition < 0 || newPosition > this.getPageSpreadCount() - 1) {
      return;
    }

    var currentPosition = this.getPosition();
    var currentPageSpread = this.getPageSpreadFromPosition(currentPosition);
    var activePageSpread = this.getPageSpreadFromPosition(newPosition);
    var carousel = this.getCarouselFromPageSpread(activePageSpread);
    var velocity = (_options$velocity = options == null ? void 0 : options.velocity) != null ? _options$velocity : 1;
    var duration = (_options$duration = options == null ? void 0 : options.duration) != null ? _options$duration : this.navigationDuration;
    duration = duration / Math.abs(velocity);
    var touchAction = activePageSpread.isScrollable() ? 'pan-y' : 'none';
    currentPageSpread == null ? void 0 : currentPageSpread.deactivate();
    activePageSpread.activate();
    carousel.visible.forEach(function (pageSpread) {
      pageSpread.position().setVisibility('visible');
    }); //@ts-expect-error

    this.hammer.set({
      touchAction: touchAction
    });
    this.transform.left = this.getLeftTransformFromPageSpread(newPosition, activePageSpread);
    this.setPosition(newPosition);

    if (this.transform.scale > 1) {
      this.transform.top = 0;
      this.transform.scale = 1;
      this.trigger('zoomedOut', {
        position: currentPosition
      });
    }

    this.trigger('beforeNavigation', {
      currentPosition: currentPosition,
      newPosition: newPosition
    });
    this.animation.animate({
      x: this.transform.left + '%',
      duration: duration
    }, function () {
      carousel = _this3.getCarouselFromPageSpread(_this3.getActivePageSpread());
      carousel.gone.forEach(function (pageSpread) {
        pageSpread.setVisibility('gone');
      });

      _this3.trigger('afterNavigation', {
        newPosition: _this3.getPosition(),
        previousPosition: currentPosition
      });
    });
  };

  _proto.getPosition = function getPosition() {
    return this.position;
  };

  _proto.setPosition = function setPosition(position) {
    this.position = position;
    return this;
  };

  _proto.getLeftTransformFromPageSpread = function getLeftTransformFromPageSpread(position, pageSpread) {
    if (position === this.getPageSpreadCount() - 1) {
      return 100 - pageSpread.getWidth() - pageSpread.getLeft();
    }

    if (position > 0) {
      return (100 - pageSpread.getWidth()) / 2 - pageSpread.getLeft();
    }

    return 0;
  };

  _proto.getCarouselFromPageSpread = function getCarouselFromPageSpread(pageSpreadSubject) {
    var carousel = {
      visible: [],
      gone: []
    }; // Identify the page spreads that should be a part of the carousel.

    this.pageSpreads.forEach(function (pageSpread) {
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

      if (visible) {
        carousel.visible.push(pageSpread);
      } else {
        carousel.gone.push(pageSpread);
      }
    });
    return carousel;
  };

  _proto.getCoordinateInfo = function getCoordinateInfo(x, y, pageSpread) {
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
    var overlayEls = pageSpread.getOverlayEls();

    for (var idx = 0; idx < overlayEls.length; idx++) {
      var overlayEl = overlayEls[idx];

      if (isCoordinateInsideElement(x, y, overlayEl)) {
        info.overlayEls.push(overlayEl);
      }
    }

    var pageEls = pageSpread.getPageEls();

    for (var _idx = 0; _idx < pageEls.length; _idx++) {
      var pageEl = pageEls[_idx];

      if (isCoordinateInsideElement(x, y, pageEl)) {
        info.pageEl = pageEl;
        break;
      }
    }

    var contentRect = pageSpread.getContentRect();
    info.contentX = (x - contentRect.left) / Math.max(1, contentRect.width);
    info.contentY = (y - contentRect.top) / Math.max(1, contentRect.height);

    if (info.pageEl) {
      info.isInsideContentX = info.contentX >= 0 && info.contentX <= 1;
      info.isInsideContentY = info.contentY >= 0 && info.contentY <= 1;
      info.isInsideContent = info.isInsideContentX && info.isInsideContentY;
    }

    return info;
  };

  _proto.getPageSpreadCount = function getPageSpreadCount() {
    return this.pageSpreads.length;
  };

  _proto.getActivePageSpread = function getActivePageSpread() {
    return this.getPageSpreadFromPosition(this.getPosition());
  };

  _proto.getPageSpreadFromPosition = function getPageSpreadFromPosition(position) {
    return this.pageSpreads[position];
  };

  _proto.getPageSpreadPositionFromPageId = function getPageSpreadPositionFromPageId(pageId) {
    for (var idx = 0; idx < this.pageSpreads.length; idx++) {
      var pageSpread = this.pageSpreads[idx];
      if (pageSpread.options.pageIds.indexOf(pageId) > -1) return idx;
    }
  };

  _proto.zoomTo = function zoomTo( //@ts-expect-error
  _temp, callback) {
    var _ref = _temp === void 0 ? {} : _temp,
        duration = _ref.duration,
        easing = _ref.easing,
        scale = _ref.scale,
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        bounds = _ref.bounds;

    var curScale = this.transform.scale;
    var activePageSpread = this.getActivePageSpread();

    var _getPageSpreadBounds2 = getPageSpreadBounds(activePageSpread),
        left = _getPageSpreadBounds2.left,
        top = _getPageSpreadBounds2.top,
        width = _getPageSpreadBounds2.width,
        height = _getPageSpreadBounds2.height,
        pageSpreadRect = _getPageSpreadBounds2.pageSpreadRect;

    var carouselOffset = activePageSpread.getLeft();
    var carouselScaledOffset = carouselOffset * curScale;

    if (scale !== 1) {
      x -= pageSpreadRect.left;
      y -= pageSpreadRect.top;
      x = x / (pageSpreadRect.width / curScale) * 100;
      y = y / (pageSpreadRect.height / curScale) * 100;
      x = this.transform.left + carouselScaledOffset + x - x * scale / curScale;
      y = this.transform.top + y - y * scale / curScale; // Make sure the animation doesn't exceed the content bounds.

      if (bounds !== false && scale > 1) {
        x = clipCoordinate(x, scale, width, left);
        y = clipCoordinate(y, scale, height, top);
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
      x: x + '%',
      y: y + '%',
      scale: scale,
      easing: easing,
      duration: duration
    }, callback);
  };

  _proto.refresh = function refresh() {
    this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
    this.pageSpreads = traversePageSpreads(this.pageSpreadEls);
    this.pageIds = buildPageIds(this.pageSpreads);
    return this;
  } //#############

  /* Events */
  //#############
  ;

  return _createClass__default["default"](Verso);
}();

var loadImage = function loadImage(src, callback) {
  return _Object$assign__default["default"](new Image(), {
    onload: function onload(_ref) {
      var target = _ref.target;
      callback(null, target);
    },
    onerror: function onerror() {
      callback(new Error());
    },
    src: src
  });
};

var PagedPublicationPageSpread = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](PagedPublicationPageSpread, _MicroEvent);

  // @ts-expect-error
  function PagedPublicationPageSpread(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _MicroEvent.call(this) || this;
    _this.contentsRendered = false;
    _this.hotspotsRendered = false;
    _this.el = void 0;
    _this.options = void 0;
    _this.options = options;
    _this.el = _this.renderEl();
    return _this;
  }

  var _proto = PagedPublicationPageSpread.prototype;

  _proto.getId = function getId() {
    return this.options.id;
  };

  _proto.getEl = function getEl() {
    return this.el;
  };

  _proto.getPages = function getPages() {
    return this.options.pages;
  };

  _proto.renderEl = function renderEl() {
    var _context;

    var el = document.createElement('div');

    var pageIds = _mapInstanceProperty__default["default"](_context = this.getPages()).call(_context, function (page) {
      return page.id;
    });

    el.className = 'verso__page-spread sgn-pp__page-spread';
    el.dataset.id = this.getId();
    el.dataset.type = 'page';
    el.dataset.width = String(this.options.width);
    el.dataset.pageIds = pageIds.join(',');
    el.dataset.maxZoomScale = String(this.options.maxZoomScale);
    el.dataset.zoomable = String(false);
    return el;
  };

  _proto.renderContents = function renderContents() {
    var _this2 = this;

    var pageSpreadId = this.getId();
    var el = this.getEl();
    var pages = this.getPages();
    var pageCount = pages.length;
    var imageLoads = 0;
    var maxPageWidth = el.clientWidth * (window.devicePixelRatio || 1);
    if (this.options.pageMode === 'double') maxPageWidth = maxPageWidth / 2;
    var useLargeImage = maxPageWidth > 700;
    pages.forEach(function (page, i) {
      var image = useLargeImage ? page.images.large : page.images.medium;
      var pageEl = document.createElement('div');
      var loaderEl = document.createElement('div');
      pageEl.className = 'sgn-pp__page verso__page';
      if (page.id) pageEl.dataset.id = page.id;

      if (pageCount === 2) {
        pageEl.className += i === 0 ? ' verso-page--verso' : ' verso-page--recto';
      }

      pageEl.appendChild(loaderEl);
      el.appendChild(pageEl);
      loaderEl.className = 'sgn-pp-page__loader';
      loaderEl.innerHTML = "<span>".concat(page.label, "</span>");
      loadImage(image, function (err, img) {
        if (err) {
          loaderEl.innerHTML = '<span>!</span>';
          return console.error(err);
        }

        var isComplete = ++imageLoads === pageCount;
        pageEl.style.backgroundImage = "url(".concat(image, ")");
        pageEl.dataset.width = img.width;
        pageEl.dataset.height = img.height;
        pageEl.innerHTML = '&nbsp;';
        if (isComplete) el.dataset.zoomable = String(true);

        _this2.trigger('pageLoaded', {
          pageSpreadId: pageSpreadId,
          page: page
        });

        if (isComplete) {
          _this2.trigger('pagesLoaded', {
            pageSpreadId: pageSpreadId,
            pages: pages
          });
        }
      });
    });
    this.contentsRendered = true;
    return this;
  };

  _proto.clearContents = function clearContents() {
    this.el.innerHTML = '';
    this.contentsRendered = false;
    return this;
  };

  _proto.zoomIn = function zoomIn() {
    var _this3 = this;

    var pages = this.getPages();
    this.el.querySelectorAll('.sgn-pp__page').forEach(function (pageEl) {
      var id = pageEl.dataset.id;

      var image = _findInstanceProperty__default["default"](pages).call(pages, function (page) {
        return page.id === id;
      }).images.large;

      loadImage(image, function (err) {
        if (err) return console.error(err);

        if (_this3.el.dataset.active === 'true') {
          pageEl.dataset.image = pageEl.style.backgroundImage;
          pageEl.style.backgroundImage = "url(".concat(image, ")");
        }
      });
    });
  };

  _proto.zoomOut = function zoomOut() {
    this.el.querySelectorAll('.sgn-pp__page[data-image]').forEach(function (pageEl) {
      pageEl.style.backgroundImage = pageEl.dataset.image;
      delete pageEl.dataset.image;
    });
  };

  return _createClass__default["default"](PagedPublicationPageSpread);
}(MicroEvent__default["default"]);

function chunk(arr, size) {
  var results = [];

  while (arr.length) {
    results.push(_spliceInstanceProperty__default["default"](arr).call(arr, 0, size));
  }

  return results;
}

var PagedPublicationPageSpreads = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](PagedPublicationPageSpreads, _MicroEvent);

  function PagedPublicationPageSpreads(options) {
    var _this;

    _this = _MicroEvent.call(this) || this;
    _this.collection = [];
    _this.ids = {};
    _this.options = void 0;
    _this.options = options;
    return _this;
  }

  var _proto = PagedPublicationPageSpreads.prototype;

  _proto.get = function get(id) {
    return this.ids[id];
  };

  _proto.getFrag = function getFrag() {
    var frag = document.createDocumentFragment();
    this.collection.forEach(function (pageSpread) {
      frag.appendChild(pageSpread.el);
    });
    return frag;
  };

  _proto.update = function update(pageMode) {
    var _context,
        _this2 = this;

    if (pageMode === void 0) {
      pageMode = 'single';
    }

    var pageSpreads = [];
    var ids = {};

    var pages = _sliceInstanceProperty__default["default"](_context = this.options.pages).call(_context);

    var _this$options = this.options,
        width = _this$options.width,
        maxZoomScale = _this$options.maxZoomScale;

    if (pageMode === 'single') {
      pages.forEach(function (page) {
        pageSpreads.push([page]);
      });
    } else {
      var firstPage = pages.shift();
      var lastPage = pages.length % 2 === 1 ? pages.pop() : null;
      var midstPageSpreads = chunk(pages, 2);
      if (firstPage) pageSpreads.push([firstPage]);
      midstPageSpreads.forEach(function (midstPages) {
        pageSpreads.push(midstPages);
      });
      if (lastPage) pageSpreads.push([lastPage]);
    }

    this.collection = _mapInstanceProperty__default["default"](pageSpreads).call(pageSpreads, function (pages, i) {
      var _context2;

      var id = _concatInstanceProperty__default["default"](_context2 = "".concat(pageMode, "-")).call(_context2, i);

      var pageSpread = new PagedPublicationPageSpread({
        width: width,
        pageMode: pageMode,
        maxZoomScale: maxZoomScale,
        pages: pages,
        id: id
      });
      pageSpread.bind('pageLoaded', function (e) {
        _this2.trigger('pageLoaded', e);
      });
      pageSpread.bind('pagesLoaded', function (e) {
        _this2.trigger('pagesLoaded', e);
      });
      ids[id] = pageSpread;
      return pageSpread;
    });
    this.ids = ids;
    return this;
  };

  return _createClass__default["default"](PagedPublicationPageSpreads);
}(MicroEvent__default["default"]);

function getColorBrightness(color) {
  color = color.replace('#', '');
  var sum = 0;
  var x = 0;

  while (x < 3) {
    sum += parseInt(color.substring(2 * x, 2), 16) || 0;
    ++x;
  }

  return sum <= 381 ? 'dark' : 'light';
}

var PagedPublicationCore = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](PagedPublicationCore, _MicroEvent);

  function PagedPublicationCore(el, options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _MicroEvent.call(this) || this;
    _this.defaults = {
      pages: [],
      pageSpreadWidth: 100,
      pageSpreadMaxZoomScale: 2.3,
      idleDelay: 1000,
      resizeDelay: 400,
      color: '#ffffff'
    };
    _this.rootEl = void 0;
    _this.pagesEl = void 0;
    _this.options = void 0;
    _this.pageId = void 0;
    _this.verso = void 0;
    _this.pageMode = void 0;
    _this.idleTimeout = void 0;
    _this.pageSpreads = void 0;
    _this.resizeListener = void 0;

    _this.start = function () {
      var verso = _this.getVerso();

      verso.start();
      verso.pageSpreads.forEach(_this.overridePageSpreadContentRect);
      _this.resizeListener = throttle(_this.resize, _this.getOption('resizeDelay'));
      window.addEventListener('resize', _this.resizeListener, false);
      window.addEventListener('beforeunload', _this.unload, false);
      _this.rootEl.dataset.started = '';

      _this.rootEl.setAttribute('tabindex', '-1');

      _this.rootEl.focus();
    };

    _this.destroy = function () {
      var verso = _this.getVerso();

      delete _this.rootEl.dataset.started;
      delete _this.rootEl.dataset.idle;
      delete _this.rootEl.dataset.navigating;
      delete _this.rootEl.dataset.colorBrightness;
      delete _this.rootEl.dataset.zoomedIn;
      _this.rootEl.style.backgroundColor = '#ffffff';
      verso.el.querySelectorAll('.sgn-pp__page-spread').forEach(function (pageSpreadEl) {
        pageSpreadEl.parentNode.removeChild(pageSpreadEl);
      });
      verso.destroy();
      window.removeEventListener('resize', _this.resizeListener, false);
      window.removeEventListener('beforeunload', _this.unload, false);
    };

    _this.pageLoaded = function (e) {
      _this.trigger('pageLoaded', e);
    };

    _this.pagesLoaded = function (e) {
      _this.trigger('pagesLoaded', e);
    };

    _this.beforeNavigation = function (e) {
      var position = e.newPosition;

      var theVerso = _this.getVerso();

      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);

      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

      var pageSpreadCount = theVerso.getPageSpreadCount();
      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
      var progress = position / (pageSpreadCount - 1) * 100;

      var progressLabel = _this.formatProgressLabel(pageSpread);

      _this.rootEl.dataset.navigating = String(true);

      _this.renderPageSpreads();

      _this.resetIdleTimer();

      _this.startIdleTimer();

      _this.trigger('beforeNavigation', {
        verso: e,
        pageSpread: pageSpread,
        newSpreadEl: newSpreadEl,
        progress: progress,
        progressLabel: progressLabel,
        pageSpreadCount: pageSpreadCount,
        newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
      });
    };

    _this.afterNavigation = function (e) {
      var position = e.newPosition;

      var theVerso = _this.getVerso();

      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);

      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

      var pageSpreadCount = theVerso.getPageSpreadCount();
      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
      _this.rootEl.dataset.navigating = String(false);

      _this.trigger('afterNavigation', {
        verso: e,
        pageSpread: pageSpread,
        pageSpreadCount: pageSpreadCount,
        newSpreadEl: newSpreadEl,
        newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
      });
    };

    _this.attemptedNavigation = function (e) {
      _this.trigger('attemptedNavigation', {
        verso: e
      });
    };

    _this.pointerdown = function (e) {
      if (e.isInsideContent) {
        var page = _this.findPage(e.pageEl.dataset.id);

        _this.trigger('pointerdown', {
          verso: e,
          page: page
        });
      }
    };

    _this.clicked = function (e) {
      if (e.isInsideContent) {
        var page = _this.findPage(e.pageEl.dataset.id);

        _this.trigger('clicked', {
          verso: e,
          page: page
        });
      }
    };

    _this.doubleClicked = function (e) {
      if (e.isInsideContent) {
        var page = _this.findPage(e.pageEl.dataset.id);

        _this.trigger('doubleClicked', {
          verso: e,
          page: page
        });
      }
    };

    _this.pressed = function (e) {
      if (e.isInsideContent) {
        var page = _this.findPage(e.pageEl.dataset.id);

        _this.trigger('pressed', {
          verso: e,
          page: page
        });
      }
    };

    _this.contextmenu = function (e) {
      if (e.isInsideContent) {
        var page = _this.findPage(e.pageEl.dataset.id);

        _this.trigger('contextmenu', {
          verso: e,
          page: page
        });
      }
    };

    _this.panStart = function () {
      _this.resetIdleTimer();

      _this.trigger('panStart', {
        scale: _this.getVerso().transform.scale
      });
    };

    _this.panEnd = function () {
      _this.startIdleTimer();

      _this.trigger('panEnd');
    };

    _this.zoomedIn = function (e) {
      var position = e.position;

      var versoPageSpread = _this.getVerso().getPageSpreadFromPosition(position);

      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

      pageSpread == null ? void 0 : pageSpread.zoomIn();
      _this.rootEl.dataset.zoomedIn = String(true);

      _this.trigger('zoomedIn', {
        verso: e,
        pageSpread: pageSpread
      });
    };

    _this.zoomedOut = function (e) {
      var position = e.position;

      var versoPageSpread = _this.getVerso().getPageSpreadFromPosition(position);

      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

      pageSpread == null ? void 0 : pageSpread.zoomOut();
      _this.rootEl.dataset.zoomedIn = String(false);

      _this.trigger('zoomedOut', {
        verso: e,
        pageSpread: pageSpread
      });
    };

    _this.overridePageSpreadContentRect = function (pageSpread) {
      if (pageSpread.getType() === 'page') {
        return pageSpread.getContentRect = function () {
          return _this.getContentRect(pageSpread);
        };
      }
    };

    _this.resize = function () {
      var pageMode = _this.getPageMode();

      if (!_this.getOption('pageMode') && pageMode !== _this.pageMode) {
        _this.switchPageMode(pageMode);
      } else {
        _this.trigger('resized');
      }
    };

    _this.unload = function () {
      _this.trigger('disappeared');
    };

    _this.options = _this.makeOptions(options, _this.defaults);
    _this.pageId = _this.getOption('pageId');
    _this.rootEl = el;
    _this.pagesEl = el.querySelector('.sgn-pp__pages');
    _this.pageMode = _this.getPageMode();
    _this.pageSpreads = new PagedPublicationPageSpreads({
      pages: _this.getOption('pages'),
      maxZoomScale: _this.getOption('pageSpreadMaxZoomScale'),
      width: _this.getOption('pageSpreadWidth')
    });

    _this.pageSpreads.bind('pageLoaded', _this.pageLoaded);

    _this.pageSpreads.bind('pagesLoaded', _this.pagesLoaded);

    _this.setColor(_this.getOption('color')); // It's important to insert the page spreads before instantiating Verso.


    _this.pagesEl.parentNode.insertBefore(_this.pageSpreads.update(_this.pageMode).getFrag(), _this.pagesEl);

    _this.verso = _this.createVerso();

    _this.bind('started', _this.start);

    _this.bind('destroyed', _this.destroy);

    return _this;
  }

  var _proto = PagedPublicationCore.prototype;

  _proto.makeOptions = function makeOptions(options, defaults) {
    var opts = {};

    for (var key in options) {
      var _options$key;

      opts[key] = (_options$key = options[key]) != null ? _options$key : defaults[key];
    }

    return opts;
  };

  _proto.getOption = function getOption(key) {
    return this.options[key];
  };

  _proto.setColor = function setColor(color) {
    this.rootEl.dataset.colorBrightness = getColorBrightness(color);
    this.rootEl.style.backgroundColor = color;
  };

  _proto.createVerso = function createVerso() {
    var verso = new Verso(this.rootEl.querySelector('.verso'), {
      pageId: this.pageId
    });
    verso.bind('beforeNavigation', this.beforeNavigation);
    verso.bind('afterNavigation', this.afterNavigation);
    verso.bind('attemptedNavigation', this.attemptedNavigation);
    verso.bind('pointerdown', this.pointerdown);
    verso.bind('clicked', this.clicked);
    verso.bind('doubleClicked', this.doubleClicked);
    verso.bind('pressed', this.pressed);
    verso.bind('contextmenu', this.contextmenu);
    verso.bind('panStart', this.panStart);
    verso.bind('panEnd', this.panEnd);
    verso.bind('zoomedIn', this.zoomedIn);
    verso.bind('zoomedOut', this.zoomedOut);
    return verso;
  };

  _proto.getVerso = function getVerso() {
    return this.verso;
  };

  _proto.getContentRect = function getContentRect(pageSpread) {
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
    if (!pageCount) return rect;
    var scale = this.getVerso().transform.scale;
    var pageWidth = pageEl.offsetWidth * pageCount * scale;
    var pageHeight = pageEl.offsetHeight * scale;
    var imageRatio = Number(pageEl.dataset.height) / (Number(pageEl.dataset.width) * pageCount);
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
  };

  _proto.formatProgressLabel = function formatProgressLabel(pageSpread) {
    var pages = (pageSpread == null ? void 0 : pageSpread.options.pages) || [];

    var pageLabels = _mapInstanceProperty__default["default"](pages).call(pages, function (_ref) {
      var label = _ref.label;
      return label;
    });

    return pages.length > 0 ? pageLabels.join('-') + ' / ' + this.getOption('pages').length : null;
  };

  _proto.renderPageSpreads = function renderPageSpreads() {
    var _this2 = this;

    this.getVerso().pageSpreads.forEach(function (pageSpread) {
      var visibility = pageSpread.getVisibility();

      var match = _this2.pageSpreads.get(pageSpread.getId());

      if (visibility === 'visible' && (match == null ? void 0 : match.contentsRendered) === false) {
        setTimeout(match.renderContents.bind(match), 0);
      }

      if (visibility === 'gone' && (match == null ? void 0 : match.contentsRendered) === true) {
        setTimeout(match.clearContents.bind(match), 0);
      }
    });
    return this;
  };

  _proto.findPage = function findPage(pageId) {
    var _context;

    return _findInstanceProperty__default["default"](_context = this.getOption('pages')).call(_context, function (page) {
      return page.id === pageId;
    });
  };

  _proto.getPageMode = function getPageMode() {
    return this.getOption('pageMode') || (this.rootEl.offsetHeight / this.rootEl.offsetWidth < 0.8 ? 'double' : 'single');
  };

  _proto.resetIdleTimer = function resetIdleTimer() {
    clearTimeout(this.idleTimeout);
    this.rootEl.dataset.idle = String(false);
    return this;
  };

  _proto.startIdleTimer = function startIdleTimer() {
    var _this3 = this;

    this.idleTimeout = setTimeout(function () {
      _this3.rootEl.dataset.idle = String(true);
    }, this.getOption('idleDelay'));
    return this;
  };

  _proto.switchPageMode = function switchPageMode(pageMode) {
    if (this.pageMode === pageMode) return this;
    var verso = this.getVerso();
    var pageIds = verso.getPageSpreadFromPosition(verso.getPosition()).getPageIds();
    this.pageMode = pageMode;
    this.pageSpreads.update(this.pageMode);
    this.getVerso().el.querySelectorAll('.sgn-pp__page-spread').forEach(function (pageSpreadEl) {
      pageSpreadEl.parentNode.removeChild(pageSpreadEl);
    });
    this.pagesEl.parentNode.insertBefore(this.pageSpreads.getFrag(), this.pagesEl);
    verso.refresh();
    verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0]), {
      duration: 0
    });
    verso.pageSpreads.forEach(this.overridePageSpreadContentRect);
    return this;
  };

  return _createClass__default["default"](PagedPublicationCore);
}(MicroEvent__default["default"]);

var PagedPublicationEventTracking = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](PagedPublicationEventTracking, _MicroEvent);

  function PagedPublicationEventTracking(eventTracker, id) {
    var _this;

    _this = _MicroEvent.call(this) || this;
    _this.hidden = true;
    _this.pageSpread = null;
    _this.eventTracker = void 0;
    _this.id = void 0;

    _this.destroy = function () {
      _this.pageSpreadDisappeared();
    };

    _this.appeared = function (e) {
      _this.pageSpreadAppeared(e.pageSpread);
    };

    _this.disappeared = function () {
      _this.pageSpreadDisappeared();
    };

    _this.beforeNavigation = function () {
      _this.pageSpreadDisappeared();
    };

    _this.afterNavigation = function (e) {
      _this.pageSpreadAppeared(e.pageSpread);
    };

    _this.attemptedNavigation = function (e) {
      _this.pageSpreadAppeared(e.pageSpread);
    };

    _this.panStart = function (e) {
      if (e.scale === 1) _this.pageSpreadDisappeared();
    };

    _this.eventTracker = eventTracker;
    _this.id = id;

    _this.bind('appeared', _this.appeared);

    _this.bind('disappeared', _this.disappeared);

    _this.bind('beforeNavigation', _this.beforeNavigation);

    _this.bind('afterNavigation', _this.afterNavigation);

    _this.bind('attemptedNavigation', _this.attemptedNavigation);

    _this.bind('panStart', _this.panStart);

    _this.bind('destroyed', _this.destroy);

    return _this;
  }

  var _proto = PagedPublicationEventTracking.prototype;

  _proto.trackOpened = function trackOpened() {
    if (!this.eventTracker) return this;
    this.eventTracker.trackPagedPublicationOpened({
      'pp.id': this.id,
      vt: this.eventTracker.createViewToken(this.id)
    });
    return this;
  };

  _proto.trackPageSpreadDisappeared = function trackPageSpreadDisappeared(pageNumbers) {
    var _this2 = this;

    if (!this.eventTracker) return this;
    pageNumbers.forEach(function (pageNumber) {
      _this2.eventTracker.trackPagedPublicationPageDisappeared({
        'pp.id': _this2.id,
        'ppp.n': pageNumber,
        vt: _this2.eventTracker.createViewToken(_this2.id, pageNumber)
      });
    });
    return this;
  };

  _proto.pageSpreadAppeared = function pageSpreadAppeared(pageSpread) {
    if (pageSpread && this.hidden) {
      this.pageSpread = pageSpread;
      this.hidden = false;
    }
  };

  _proto.pageSpreadDisappeared = function pageSpreadDisappeared() {
    if (this.pageSpread && !this.hidden) {
      var _context;

      this.trackPageSpreadDisappeared(_mapInstanceProperty__default["default"](_context = this.pageSpread.getPages()).call(_context, function (page) {
        return page.pageNumber;
      }));
      this.hidden = true;
      this.pageSpread = null;
    }
  };

  return _createClass__default["default"](PagedPublicationEventTracking);
}(MicroEvent__default["default"]);

function getPosition(pages, ratio, hotspot) {
  var minX = null;
  var minY = null;
  var maxX = null;
  var maxY = null;

  var pageNumbers = _mapInstanceProperty__default["default"](pages).call(pages, function (page) {
    return page.pageNumber;
  });

  var _loop = function _loop(pageNumber) {
    if (pageNumbers.indexOf(Number(pageNumber)) === -1) return "continue";
    hotspot.locations[pageNumber].forEach(function (_ref) {
      var x = _ref[0],
          y = _ref[1];
      if (pages[1] && pageNumbers[1] === Number(pageNumber)) x += 1;
      x /= pages.length;

      if (minX == null) {
        minX = maxX = x;
        minY = maxY = y;
      }

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });
  };

  for (var pageNumber in hotspot.locations) {
    var _ret = _loop(pageNumber);

    if (_ret === "continue") continue;
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

function renderHotspot(hotspot, position, contentRect, boundingRect) {
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
  if (hotspot.id) el.dataset.id = hotspot.id;
  if (hotspot.type) el.dataset.type = hotspot.type;
  el.innerHTML = Mustache__default["default"].render('', hotspot);
  el.style.top = "".concat(top, "px");
  el.style.left = "".concat(left, "px");
  el.style.width = "".concat(width, "px");
  el.style.height = "".concat(height, "px");
  return el;
}

var PagedPublicationHotspots = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](PagedPublicationHotspots, _MicroEvent);

  function PagedPublicationHotspots() {
    var _this;

    _this = _MicroEvent.call(this) || this;
    _this.currentPageSpreadId = null;
    _this.pageSpreadsLoaded = {};
    _this.cache = {};

    _this.hotspotsReceived = function (e) {
      _this.setCache(e.pageSpread.getId(), e);

      _this.renderHotspots(e);
    };

    _this.afterNavigation = function (e) {
      if (!e.pageSpread) return;
      var id = e.pageSpread.getId();
      _this.currentPageSpreadId = id;

      if (_this.pageSpreadsLoaded[id]) {
        _this.requestHotspots(id, e.pageSpread.getPages());
      }
    };

    _this.pagesLoaded = function (e) {
      _this.pageSpreadsLoaded[e.pageSpreadId] = true;

      if (_this.currentPageSpreadId === e.pageSpreadId) {
        _this.requestHotspots(e.pageSpreadId, e.pages);
      }
    };

    _this.resized = function () {
      var data = _this.getCache(_this.currentPageSpreadId);

      if (data) _this.renderHotspots(data);
    };

    _this.bind('hotspotsReceived', _this.hotspotsReceived);

    _this.bind('afterNavigation', _this.afterNavigation);

    _this.bind('pagesLoaded', _this.pagesLoaded);

    _this.bind('resized', _this.resized);

    return _this;
  }

  var _proto = PagedPublicationHotspots.prototype;

  _proto.renderHotspots = function renderHotspots(_ref2) {
    var versoPageSpread = _ref2.versoPageSpread,
        pageSpread = _ref2.pageSpread,
        hotspots = _ref2.hotspots,
        pages = _ref2.pages,
        ratio = _ref2.ratio;
    var contentRect = versoPageSpread.getContentRect();
    var pageSpreadEl = pageSpread.getEl();
    var boundingRect = pageSpreadEl.getBoundingClientRect();
    pageSpreadEl.querySelectorAll('.sgn-pp__hotspot').forEach(function (hotspotEl) {
      hotspotEl.parentNode.removeChild(hotspotEl);
    });
    var frag = document.createDocumentFragment();

    for (var id in hotspots) {
      var hotspot = hotspots[id];
      var position = getPosition(pages, ratio, hotspot);
      var el = renderHotspot(hotspot, position, contentRect, boundingRect);
      frag.appendChild(el);
    }

    pageSpreadEl.appendChild(frag);
    return this;
  };

  _proto.requestHotspots = function requestHotspots(id, pages) {
    this.trigger('hotspotsRequested', {
      id: id,
      pages: pages
    });
  };

  _proto.getCache = function getCache(pageSpreadId) {
    return this.cache[pageSpreadId];
  };

  _proto.setCache = function setCache(pageSpreadId, data) {
    this.cache[pageSpreadId] = data;
    return this;
  };

  return _createClass__default["default"](PagedPublicationHotspots);
}(MicroEvent__default["default"]);

function defaultPickHotspot(hotspots, e, el, callback) {
  var _context;

  var popover = singleChoicePopover({
    el: el,
    header: t('paged_publication.hotspot_picker.header'),
    x: e.verso.x,
    y: e.verso.y,
    items: _mapInstanceProperty__default["default"](_context = _filterInstanceProperty__default["default"](hotspots).call(hotspots, function (hotspot) {
      return hotspot.type === 'offer';
    })).call(_context, function (hotspot) {
      return {
        id: hotspot.id,
        title: hotspot.offer.heading,
        subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price
      };
    })
  }, function (picked) {
    callback(_findInstanceProperty__default["default"](hotspots).call(hotspots, function (hotspot) {
      return hotspot.id === picked.id;
    }));
  });
  return popover.destroy;
}

var Viewer = /*#__PURE__*/function (_MicroEvent) {
  _inherits__default["default"](Viewer, _MicroEvent);

  // @ts-expect-error
  function Viewer(el, _options) {
    var _this;

    if (_options === void 0) {
      _options = {};
    }

    _this = _MicroEvent.call(this) || this;
    _this._hotspots = new PagedPublicationHotspots();
    _this.hotspots = null;
    _this.hotspotQueue = [];
    _this.popover = null;
    _this.el = void 0;
    _this._core = void 0;
    _this._controls = void 0;
    _this._eventTracking = void 0;
    _this.options = void 0;

    _this.destroy = function () {
      _this._core.trigger('destroyed');

      _this._hotspots.trigger('destroyed');

      _this._controls.trigger('destroyed');

      _this._eventTracking.trigger('destroyed');

      _this.trigger('destroyed');

      return _assertThisInitialized__default["default"](_this);
    };

    _this.first = function (options) {
      _this._core.getVerso().first(options);

      return _assertThisInitialized__default["default"](_this);
    };

    _this.prev = function (options) {
      _this._core.getVerso().prev(options);

      return _assertThisInitialized__default["default"](_this);
    };

    _this.next = function (options) {
      _this._core.getVerso().next(options);

      return _assertThisInitialized__default["default"](_this);
    };

    _this.last = function (options) {
      _this._core.getVerso().last(options);

      return _assertThisInitialized__default["default"](_this);
    };

    _this.hotspotsRequested = function (e) {
      _this.hotspotQueue.push(e);

      _this.processHotspotQueue();
    };

    _this.beforeNavigation = function () {
      var _this$popover;

      (_this$popover = _this.popover) == null ? void 0 : _this$popover.destroy == null ? void 0 : _this$popover.destroy();
    };

    _this.clicked = function (e) {
      _this.pickHotspot(e, function (hotspot) {
        _this.trigger('hotspotClicked', hotspot);
      });
    };

    _this.pointerdown = function (e) {
      var hotspots = _this.getPointerEventHotspots(e);

      if (hotspots.length > 0) _this.trigger('hotspotsPointerdown', hotspots);
    };

    _this.contextmenu = function (e) {
      _this.pickHotspot(e, function (hotspot) {
        _this.trigger('hotspotContextmenu', hotspot);
      });
    };

    _this.pressed = function (e) {
      _this.pickHotspot(e, function (hotspot) {
        _this.trigger('hotspotPressed', hotspot);
      });
    };

    _this.el = el;
    _this.options = _options;
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
    _this._controls = new PagedPublicationControls(_this.el, {
      keyboard: _this.options.keyboard
    });
    _this._eventTracking = new PagedPublicationEventTracking(_this.options.eventTracker, _this.options.id);

    _this._controls.bind('prev', _this.prev);

    _this._controls.bind('next', _this.next);

    _this._controls.bind('first', _this.first);

    _this._controls.bind('last', _this.last);

    _this._controls.bind('close', _this.destroy);

    _this._hotspots.bind('hotspotsRequested', function (e) {
      _this.trigger('hotspotsRequested', e);
    });

    _this._core.bind('appeared', function (e) {
      _this._eventTracking.trigger('appeared', e);

      _this.trigger('appeared', e);
    });

    _this._core.bind('disappeared', function (e) {
      _this._eventTracking.trigger('disappeared', e);

      _this.trigger('disappeared', e);
    });

    _this._core.bind('beforeNavigation', function (e) {
      _this._eventTracking.trigger('beforeNavigation', e);

      _this._controls.trigger('beforeNavigation', e);

      _this.trigger('beforeNavigation', e);
    });

    _this._core.bind('afterNavigation', function (e) {
      _this._eventTracking.trigger('afterNavigation', e);

      _this._hotspots.trigger('afterNavigation', e);

      _this.trigger('afterNavigation', e);
    });

    _this._core.bind('attemptedNavigation', function (e) {
      _this._eventTracking.trigger('attemptedNavigation', e);

      _this.trigger('attemptedNavigation', e);
    });

    _this._core.bind('pointerdown', function (e) {
      _this._eventTracking.trigger('pointerdown', e);

      _this.trigger('pointerdown', e);
    });

    _this._core.bind('clicked', function (e) {
      _this._eventTracking.trigger('clicked', e);

      _this.trigger('clicked', e);
    });

    _this._core.bind('doubleClicked', function (e) {
      _this._eventTracking.trigger('doubleClicked', e);

      _this.trigger('doubleClicked', e);
    });

    _this._core.bind('contextmenu', function (e) {
      _this.trigger('contextmenu', e);
    });

    _this._core.bind('pressed', function (e) {
      _this._eventTracking.trigger('pressed', e);

      _this.trigger('pressed', e);
    });

    _this._core.bind('panStart', function (e) {
      _this._eventTracking.trigger('panStart', e);

      _this.trigger('panStart', e);
    });

    _this._core.bind('zoomedIn', function (e) {
      _this._eventTracking.trigger('zoomedIn', e);

      _this.trigger('zoomedIn', e);
    });

    _this._core.bind('zoomedOut', function (e) {
      _this._eventTracking.trigger('zoomedOut', e);

      _this.trigger('zoomedOut', e);
    });

    _this._core.bind('pageLoaded', function (e) {
      _this._eventTracking.trigger('pageLoaded', e);

      _this.trigger('pageLoaded', e);
    });

    _this._core.bind('pagesLoaded', function (e) {
      _this._hotspots.trigger('pagesLoaded', e);

      _this.trigger('pagesLoaded', e);
    });

    _this._core.bind('resized', function (e) {
      _this._hotspots.trigger('resized');

      _this.trigger('resized', e);
    });

    _this.bind('hotspotsRequested', _this.hotspotsRequested);

    _this.bind('beforeNavigation', _this.beforeNavigation);

    _this.bind('clicked', _this.clicked);

    _this.bind('pointerdown', _this.pointerdown);

    _this.bind('contextmenu', _this.contextmenu);

    _this.bind('pressed', _this.pressed);

    return _this;
  }

  var _proto = Viewer.prototype;

  _proto.start = function start() {
    this._eventTracking.trackOpened();

    this._core.trigger('started');

    return this;
  };

  _proto.navigateTo = function navigateTo(position, options) {
    return this.navigateToIndex(position, options);
  };

  _proto.navigateToIndex = function navigateToIndex(position, options) {
    this._core.getVerso().navigateTo(position, options);

    return this;
  };

  _proto.navigateToPageId = function navigateToPageId(pageId, options) {
    var verso = this._core.getVerso();

    var newPosition = verso.getPageSpreadPositionFromPageId(pageId);
    verso.navigateTo(newPosition, options);
    return this;
  };

  _proto.getPointerEventHotspots = function getPointerEventHotspots(e) {
    var _context2;

    var hotspots = this.hotspots;
    if (!hotspots) return [];
    return _mapInstanceProperty__default["default"](_context2 = e.verso.overlayEls).call(_context2, function (el) {
      return hotspots[el.dataset.id];
    });
  };

  _proto.pickHotspot = function pickHotspot(e, callback) {
    if (this.popover) {
      var _this$popover$destroy, _this$popover2;

      (_this$popover$destroy = (_this$popover2 = this.popover).destroy) == null ? void 0 : _this$popover$destroy.call(_this$popover2);
      this.popover = null;
    }

    var hotspots = this.getPointerEventHotspots(e);

    if (hotspots.length === 1) {
      callback(hotspots[0]);
    } else if (hotspots.length > 1) {
      this.popover = {
        destroy: (this.options.pickHotspot || defaultPickHotspot)(hotspots, e, this.el, callback)
      };
    }
  };

  _proto.processHotspotQueue = function processHotspotQueue() {
    var _context3,
        _this2 = this;

    if (!this.hotspots) return;
    this.hotspotQueue = _filterInstanceProperty__default["default"](_context3 = this.hotspotQueue).call(_context3, function (hotspotRequest) {
      var _context4;

      var hotspots = {};

      for (var hotspotId in _this2.hotspots) {
        if (hotspots[hotspotId]) continue;
        var _this2$hotspots$hotsp = _this2.hotspots[hotspotId],
            id = _this2$hotspots$hotsp.id,
            type = _this2$hotspots$hotsp.type,
            locations = _this2$hotspots$hotsp.locations;

        for (var idx = 0; idx < hotspotRequest.pages.length; idx++) {
          var pageNumber = hotspotRequest.pages[idx].pageNumber;

          if (locations[pageNumber]) {
            hotspots[hotspotId] = {
              type: type,
              id: id,
              locations: locations
            };
            break;
          }
        }
      }

      var versoPageSpread = _findInstanceProperty__default["default"](_context4 = _this2._core.getVerso().pageSpreads).call(_context4, function (pageSpread) {
        return pageSpread.getId() === hotspotRequest.id;
      });

      _this2._hotspots.trigger('hotspotsReceived', {
        pageSpread: _this2._core.pageSpreads.get(hotspotRequest.id),
        versoPageSpread: versoPageSpread,
        ratio: _this2.options.hotspotRatio,
        pages: hotspotRequest.pages,
        hotspots: hotspots
      });

      return false;
    });
  };

  _proto.applyHotspots = function applyHotspots(hotspots) {
    this.hotspots = hotspots;
    this.processHotspotQueue();
  };

  return _createClass__default["default"](Viewer);
}(MicroEvent__default["default"]);

function ownKeys$1(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }

var Bootstrapper = /*#__PURE__*/function () {
  function Bootstrapper(options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    this.options = void 0;

    this.fetchDetails = function (callback) {
      return request({
        apiKey: _this.options.apiKey,
        coreUrl: _this.options.coreUrl,
        url: "/v2/catalogs/".concat(_this.options.id)
      }, callback);
    };

    this.fetchPages = function (callback) {
      return request({
        apiKey: _this.options.apiKey,
        coreUrl: _this.options.coreUrl,
        url: "/v2/catalogs/".concat(_this.options.id, "/pages")
      }, callback);
    };

    this.fetchHotspots = function (callback) {
      return request({
        apiKey: _this.options.apiKey,
        coreUrl: _this.options.coreUrl,
        url: "/v2/catalogs/".concat(_this.options.id, "/hotspots")
      }, callback);
    };

    //@ts-expect-error
    this.options = options;
  }

  var _proto = Bootstrapper.prototype;

  _proto.createViewer = function createViewer(data, viewerOptions) {
    var _context;

    return new Viewer(this.options.el, _objectSpread$1({
      id: this.options.id,
      ownedBy: data.details.dealer_id,
      color: '#' + data.details.branding.pageflip.color,
      hotspotRatio: data.details.dimensions.height,
      keyboard: true,
      pageId: this.options.pageId,
      eventTracker: this.options.eventTracker,
      pages: _mapInstanceProperty__default["default"](_context = data.pages).call(_context, function (_ref, i) {
        var view = _ref.view,
            zoom = _ref.zoom;
        var pageNumber = i + 1;
        return {
          id: 'page' + pageNumber,
          label: String(pageNumber),
          pageNumber: pageNumber,
          images: {
            medium: view,
            large: zoom
          }
        };
      })
    }, viewerOptions));
  };

  _proto.applyHotspots = function applyHotspots(viewer, hotspots) {
    viewer.applyHotspots(hotspots.reduce(function (obj, hotspot) {
      obj[hotspot.id] = hotspot;
      return obj;
    }, {}));
  };

  _proto.fetch = /*#__PURE__*/function () {
    var _fetch = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(callback) {
      var _yield$Promise$all, details, pages, data;

      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _Promise__default["default"].all([this.fetchDetails(), this.fetchPages()]);

            case 3:
              _yield$Promise$all = _context2.sent;
              details = _yield$Promise$all[0];
              pages = _yield$Promise$all[1];

              if (!(!details || !pages)) {
                _context2.next = 8;
                break;
              }

              throw new Error();

            case 8:
              data = {
                details: details,
                pages: pages
              };
              if (typeof callback === 'function') callback(null, data);
              return _context2.abrupt("return", data);

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);

              if (!(typeof callback === 'function')) {
                _context2.next = 19;
                break;
              }

              callback(_context2.t0);
              _context2.next = 20;
              break;

            case 19:
              throw _context2.t0;

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this, [[0, 13]]);
    }));

    function fetch(_x) {
      return _fetch.apply(this, arguments);
    }

    return fetch;
  }();

  return _createClass__default["default"](Bootstrapper);
}();

var defaultTemplate = "    <div class=\"sgn__pp\" data-layout-fixed=\"true\" data-component-template=\"true\" {{#disableHeader}}data-component-template-disable-header=\"true\"{{/disableHeader}}>\n        <div class=\"sgn__header-container\"></div>\n\n        <div class=\"verso\">\n            <div class=\"verso__scroller\">\n                <div class=\"sgn-pp__pages\"></div>\n            </div>\n        </div>\n\n        {{#disableHeader}}\n            <div class=\"sgn-pp__progress\">\n                <div class=\"sgn-pp-progress__bar\"></div>\n            </div>\n            <div class=\"sgn-pp__progress-label\"></div>\n        {{/disableHeader}}\n        <button\n            class=\"sgn-pp__control\"\n            data-direction=\"prev\"\n        >\n            &lsaquo;\n        </button>\n        <button\n            class=\"sgn-pp__control\"\n            data-direction=\"next\"\n        >\n            &rsaquo;\n        </button>\n        <button\n            class=\"sgn-pp__control sgn-pp--hidden\"\n            data-direction=\"first\"\n        >\n            &laquo;\n        </button>\n        <button\n            class=\"sgn-pp__control sgn-pp--hidden\"\n            data-direction=\"last\"\n        >\n            &raquo;\n        </button>\n    </div>";

var MainContainer = function MainContainer(_ref) {
  var template = _ref.template,
      el = _ref.el,
      scriptEls = _ref.scriptEls;

  var setCustomStyles = function setCustomStyles() {
    // @ts-expect-error
    var sgnPp = el.querySelector('.sgn__pp');
    sgnPp == null ? void 0 : sgnPp.classList.add("sgn__theme-".concat(scriptEls.theme || 'light'));
  };

  var render = function render() {
    // @ts-expect-error
    el.innerHTML = Mustache__default["default"].render((template == null ? void 0 : template.innerHTML) || defaultTemplate, {
      disableHeader: scriptEls.disableHeader
    });
    setCustomStyles();
  };

  return {
    render: render
  };
};

var PagedPublication = function PagedPublication(scriptEl, _ref) {
  var _document$querySelect;

  var _ref$mainContainer = _ref.mainContainer,
      mainContainer = _ref$mainContainer === void 0 ? '' : _ref$mainContainer,
      apiKey = _ref.apiKey,
      coreUrl = _ref.coreUrl,
      eventTracker = _ref.eventTracker;
  var options;
  var sgnData = {};
  var sgnViewer;
  var scriptEls = transformScriptData(scriptEl, mainContainer);
  var customTemplates = {
    mainContainer: document.getElementById('sgn-sdk-paged-publication-viewer-template'),
    headerContainer: document.getElementById('sgn-sdk-paged-publication-viewer-header-template'),
    offerList: document.getElementById('sgn-sdk-paged-publication-viewer-offer-list-template'),
    shoppingList: document.getElementById('sgn-sdk-paged-publication-viewer-shopping-list-template'),
    shoppingListCounter: document.getElementById('sgn-sdk-paged-publication-viewer-shopping-list-counter-template'),
    pageList: document.getElementById('sgn-sdk-paged-publication-viewer-page-list-template'),
    offerOverview: document.getElementById('sgn-sdk-paged-publication-viewer-offer-overview-template'),
    menuContainer: document.getElementById('sgn-sdk-paged-publication-viewer-menu-container-template')
  };
  MainContainer({
    template: customTemplates.mainContainer,
    el: document.querySelector(scriptEls.mainContainer),
    scriptEls: scriptEls
  }).render();
  var header = Header({
    publicationType: 'paged',
    template: customTemplates.headerContainer,
    shoppingListCounterTemplate: customTemplates.shoppingListCounter,
    el: document.querySelector(scriptEls.mainContainer),
    scriptEls: scriptEls
  });
  (_document$querySelect = document.querySelector('.sgn__header-container')) == null ? void 0 : _document$querySelect.appendChild(header.render());

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_Object$keys__default["default"](options || {}).length === 0)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return setOptions();

            case 3:
              _context.next = 5;
              return start();

            case 5:
              renderShoppingList();
              renderMenuPopup();
              dispatchPublicationData();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var renderShoppingList = function renderShoppingList() {
    return ShoppingList({
      template: customTemplates.shoppingList
    }).render();
  };

  var renderMenuPopup = function renderMenuPopup() {
    var _document$querySelect2;

    return (_document$querySelect2 = document.querySelector('.sgn__nav-menu-btn')) == null ? void 0 : _document$querySelect2.addEventListener('click', function (e) {
      e.preventDefault();
      MenuPopup({
        publicationType: 'paged',
        configs: options,
        sgnData: sgnData,
        sgnViewer: sgnViewer,
        templates: customTemplates,
        scriptEls: scriptEls
      }).render();
    });
  };

  var animateShoppingListCounter = function animateShoppingListCounter() {
    var shoppingListCounter = document.querySelector('.sgn__offer-shopping-list-counter');
    shoppingListCounter == null ? void 0 : shoppingListCounter.classList.remove('sgn-animate-bounce');
    shoppingListCounter == null ? void 0 : shoppingListCounter.classList.add('sgn-animate-bounce');
  };

  var setOptions = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(opts) {
      var _getHashFragments, _getHashFragments2;

      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = document.querySelector('.sgn__pp');
              _context2.t1 = apiKey;
              _context2.t2 = coreUrl;
              _context2.t3 = eventTracker;
              _context2.t4 = (opts == null ? void 0 : opts.pageId) || "page".concat(getQueryParam(scriptEls.pageIdParam) || ((_getHashFragments = getHashFragments(scriptEls.publicationHash)) == null ? void 0 : _getHashFragments.pageNum) || 1);
              _context2.t5 = (opts == null ? void 0 : opts.id) || getQueryParam(scriptEls.publicationIdParam) || ((_getHashFragments2 = getHashFragments(scriptEls.publicationHash)) == null ? void 0 : _getHashFragments2.publicationId) || scriptEls.publicationId;

              if (_context2.t5) {
                _context2.next = 10;
                break;
              }

              _context2.next = 9;
              return fetchLatestPublicationId();

            case 9:
              _context2.t5 = _context2.sent;

            case 10:
              _context2.t6 = _context2.t5;
              _context2.t7 = (opts == null ? void 0 : opts.businessId) || scriptEls.businessId;
              options = {
                el: _context2.t0,
                apiKey: _context2.t1,
                coreUrl: _context2.t2,
                eventTracker: _context2.t3,
                pageId: _context2.t4,
                id: _context2.t6,
                businessId: _context2.t7
              };

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function setOptions(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var start = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3() {
      var bootstrapper, data, _document$querySelect3, hotspots;

      return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              bootstrapper = new Bootstrapper(options);
              _context3.next = 3;
              return bootstrapper.fetch();

            case 3:
              data = _context3.sent;
              sgnData = data; // @ts-expect-error

              sgnViewer = bootstrapper.createViewer(data);
              update({
                'paged_publication.hotspot_picker.header': translate('paged_publication_viewer_hotspot_picker_header')
              });
              header.show(sgnData);
              sgnViewer.bind('hotspotClicked', function (hotspot) {
                clickHotspot(hotspot);
              });
              sgnViewer.start();

              if (scriptEls.disableGlobalScrollbar) {
                (_document$querySelect3 = document.querySelector('html')) == null ? void 0 : _document$querySelect3.classList.add('sgn-paged-publication--open');
              }

              _context3.next = 13;
              return bootstrapper.fetchHotspots();

            case 13:
              hotspots = _context3.sent;
              bootstrapper.applyHotspots(sgnViewer, hotspots);
              displayUrlParams();
              addFirstLastControlListener();

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function start() {
      return _ref4.apply(this, arguments);
    };
  }();

  var addFirstLastControlListener = function addFirstLastControlListener() {
    var firstControl = options.el.querySelector('.sgn-pp__control[data-direction=first]');
    var lastControl = options.el.querySelector('.sgn-pp__control[data-direction=last]');
    var prevBtn = options.el.querySelector('.sgn-pp__control[data-direction=prev]');
    var nextBtn = options.el.querySelector('.sgn-pp__control[data-direction=next]');
    var controlDirectionObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes') {
          var element = mutation.target;

          if (element.dataset.direction === 'prev') {
            element.classList.contains('sgn-pp--hidden') ? firstControl.classList.add('sgn-pp--hidden') : firstControl.classList.remove('sgn-pp--hidden');
          }

          if (element.dataset.direction === 'next') {
            element.classList.contains('sgn-pp--hidden') ? lastControl.classList.add('sgn-pp--hidden') : lastControl.classList.remove('sgn-pp--hidden');
          }
        }
      });
    });
    prevBtn != null && prevBtn.classList.contains('sgn-pp--hidden') ? firstControl.classList.add('sgn-pp--hidden') : firstControl.classList.remove('sgn-pp--hidden');
    nextBtn != null && nextBtn.classList.contains('sgn-pp--hidden') ? lastControl.classList.add('sgn-pp--hidden') : lastControl.classList.remove('sgn-pp--hidden');
    firstControl == null ? void 0 : firstControl.addEventListener('click', function () {
      var _sgnViewer;

      (_sgnViewer = sgnViewer) == null ? void 0 : _sgnViewer.first();
    });
    lastControl == null ? void 0 : lastControl.addEventListener('click', function () {
      var _sgnViewer2;

      (_sgnViewer2 = sgnViewer) == null ? void 0 : _sgnViewer2.last();
    });
    controlDirectionObserver.observe(prevBtn, {
      attributes: true
    });
    controlDirectionObserver.observe(nextBtn, {
      attributes: true
    });
  };

  var displayUrlParams = function displayUrlParams() {
    var _scriptEls$displayUrl, _scriptEls$displayUrl2;

    if (((_scriptEls$displayUrl = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl.toLowerCase()) === 'query' || ((_scriptEls$displayUrl2 = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl2.toLowerCase()) === 'hash') {
      var progressLabel = options.el.querySelector('.sgn-pp__progress-label');
      progressLabel == null ? void 0 : progressLabel.addEventListener('DOMSubtreeModified', function (e) {
        var _e$target$innerHTML, _e$target$innerHTML$s, _e$target$innerHTML$s2, _e$target$innerHTML$s3, _scriptEls$displayUrl3, _pushQueryParam, _context4, _context5;

        var pageNum = (_e$target$innerHTML = e.target.innerHTML) == null ? void 0 : (_e$target$innerHTML$s = _e$target$innerHTML.split(' ')) == null ? void 0 : (_e$target$innerHTML$s2 = _e$target$innerHTML$s[0]) == null ? void 0 : (_e$target$innerHTML$s3 = _e$target$innerHTML$s2.split('-')) == null ? void 0 : _e$target$innerHTML$s3[0];
        ((_scriptEls$displayUrl3 = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl3.toLowerCase()) === 'query' ? pushQueryParam((_pushQueryParam = {}, _defineProperty__default["default"](_pushQueryParam, scriptEls.publicationIdParam, options.id), _defineProperty__default["default"](_pushQueryParam, scriptEls.pageIdParam, pageNum), _pushQueryParam)) : location.hash = _concatInstanceProperty__default["default"](_context4 = _concatInstanceProperty__default["default"](_context5 = "".concat(scriptEls.publicationHash, "/")).call(_context5, options.id, "/")).call(_context4, pageNum);
      });
    }
  };

  var clickHotspot = function clickHotspot(hotspot) {
    var shoppingBtn = options.el.querySelector('.sgn__offer-shopping');

    if (scriptEls.offerClickBehavior === 'overview_modal') {
      OfferOverview({
        template: customTemplates.offerOverview,
        configs: options,
        scriptEls: scriptEls,
        sgnData: sgnData,
        offer: hotspot,
        type: 'paged',
        addToShoppingList: addToShoppingList
      }).render();
    } else if (scriptEls.offerClickBehavior === 'open_webshop_link_in_tab' && hotspot != null && hotspot.webshop) {
      window.open(hotspot.webshop);
    } else if (scriptEls.offerClickBehavior === 'redirect_to_webshop_link' && hotspot != null && hotspot.webshop) {
      location.href = hotspot.webshop;
    } else if (shoppingBtn) {
      addToShoppingList(hotspot);
    }
  };

  var addToShoppingList = function addToShoppingList(hotspot) {
    var _hotspot$offer;

    var storedPublicationOffers = get('publication-saved-offers');
    var shopListOffer = {
      name: hotspot.heading,
      pricing: (_hotspot$offer = hotspot.offer) == null ? void 0 : _hotspot$offer.pricing,
      is_ticked: false
    };

    if (!storedPublicationOffers) {
      setWithEvent('publication-saved-offers', [shopListOffer], 'tjek_shopping_list_update');
    } else {
      storedPublicationOffers.push(shopListOffer);
      setWithEvent('publication-saved-offers', storedPublicationOffers, 'tjek_shopping_list_update');
    }

    animateShoppingListCounter();
  };

  var fetchLatestPublicationId = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4() {
      var _yield$request, _yield$request$;

      return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = scriptEls.businessId;

              if (!_context6.t0) {
                _context6.next = 11;
                break;
              }

              _context6.next = 4;
              return request({
                apiKey: apiKey,
                coreUrl: coreUrl,
                url: '/v2/catalogs',
                qs: {
                  dealer_id: scriptEls.businessId,
                  order_by: '-publication_date',
                  limit: 1
                }
              });

            case 4:
              _context6.t1 = _yield$request = _context6.sent;

              if (!(_context6.t1 == null)) {
                _context6.next = 9;
                break;
              }

              _context6.t2 = void 0;
              _context6.next = 10;
              break;

            case 9:
              _context6.t2 = (_yield$request$ = _yield$request[0]) == null ? void 0 : _yield$request$.id;

            case 10:
              _context6.t0 = _context6.t2;

            case 11:
              return _context6.abrupt("return", _context6.t0);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee4);
    }));

    return function fetchLatestPublicationId() {
      return _ref5.apply(this, arguments);
    };
  }();

  var dispatchPublicationData = function dispatchPublicationData() {
    var mainContainerEl = document.querySelector(scriptEls.listPublicationsContainer || scriptEls.mainContainer);
    mainContainerEl == null ? void 0 : mainContainerEl.dispatchEvent(new CustomEvent('publication:rendered', {
      detail: sgnData
    }));
  };

  return {
    render: render,
    setOptions: setOptions
  };
};

function ownKeys(object, enumerableOnly) { var keys = _Object$keys__default["default"](object); if (_Object$getOwnPropertySymbols__default["default"]) { var symbols = _Object$getOwnPropertySymbols__default["default"](object); enumerableOnly && (symbols = _filterInstanceProperty__default["default"](symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor__default["default"](object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : _Object$getOwnPropertyDescriptors__default["default"] ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors__default["default"](source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor__default["default"](source, key)); }); } return target; }

var ListPublications = function ListPublications(scriptEl, _ref) {
  var _ref$mainContainer = _ref.mainContainer,
      mainContainer = _ref$mainContainer === void 0 ? '' : _ref$mainContainer,
      apiKey = _ref.apiKey,
      coreUrl = _ref.coreUrl,
      eventTracker = _ref.eventTracker;

  var scriptEls = _objectSpread({}, transformScriptData(scriptEl, mainContainer), {
    mainContainer: scriptEl.dataset.componentListPublicationsContainer || mainContainer,
    orderBy: scriptEl.dataset.componentListPublicationsOrderBy,
    requestFilter: scriptEl.dataset.componentListPublicationsRequestFilter,
    clientFilter: scriptEl.dataset.componentListPublicationsClientFilter,
    preferredViewer: scriptEl.dataset.componentPublicationsViewerPreferredType
  });

  var customTemplates = {
    mainContainer: document.getElementById('sgn-sdk-list-publications-template')
  };
  var orderBys = {
    newest: '-publication_date',
    oldest: 'publication_date'
  };
  var options = {
    el: document.querySelector('.sgn__pp'),
    apiKey: apiKey,
    coreUrl: coreUrl,
    eventTracker: eventTracker,
    businessId: scriptEls.businessId,
    orderBy: scriptEls.orderBy ? orderBys[scriptEls.orderBy] : orderBys.newest,
    requestFilter: scriptEls.requestFilter,
    clientFilter: scriptEls.clientFilter
  };
  var publications = [];

  var clickPublicationItem = function clickPublicationItem(e) {
    var _ref2 = e.currentTarget.dataset || {},
        id = _ref2.id;

    var publication = findPublicationById(id);

    if (publication) {
      var _scriptEls$displayUrl, _scriptEls$displayUrl2;

      if (((_scriptEls$displayUrl = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl.toLowerCase()) === 'query') {
        pushQueryParam(_defineProperty__default["default"]({}, scriptEls.publicationIdParam, id));
      } else if (((_scriptEls$displayUrl2 = scriptEls.displayUrlParams) == null ? void 0 : _scriptEls$displayUrl2.toLowerCase()) === 'hash') {
        var _context;

        location.hash = _concatInstanceProperty__default["default"](_context = "".concat(scriptEls.publicationHash, "/")).call(_context, id);
      }

      dispatchPublicationClickEvent(publication);
      renderPublicationViewer(publication);
    }
  };

  var findPublicationById = function findPublicationById(id) {
    var _publications;

    return (_publications = publications) == null ? void 0 : _findInstanceProperty__default["default"](_publications).call(_publications, function (publication) {
      return publication.id === id;
    });
  };

  var renderPublicationViewer = function renderPublicationViewer(publication) {
    var id = publication.id,
        types = publication.types;

    if (scriptEls.publicationsListClickBehavior === 'open_publication_viewer') {
      if (scriptEls.preferredViewer === 'incito' && _includesInstanceProperty__default["default"](types).call(types, 'incito') || !_includesInstanceProperty__default["default"](types).call(types, 'paged')) {
        var incitoPublication = IncitoPublication(scriptEl, {
          mainContainer: '#sgn-publication-viewer-container',
          apiKey: apiKey,
          coreUrl: coreUrl,
          eventTracker: eventTracker
        });
        incitoPublication.setOptions({
          id: id
        });
        incitoPublication.render();
      } else {
        var pagedPublication = PagedPublication(scriptEl, {
          mainContainer: '#sgn-publication-viewer-container',
          apiKey: apiKey,
          coreUrl: coreUrl,
          eventTracker: eventTracker
        });
        pagedPublication.setOptions({
          id: id
        });
        pagedPublication.render();
      }
    }
  };

  var addPublicationListener = function addPublicationListener() {
    return document.querySelectorAll('.publications__item').forEach(function (itemEl) {
      itemEl.addEventListener('click', clickPublicationItem, false);
    });
  };

  var dispatchPublicationClickEvent = function dispatchPublicationClickEvent(detail) {
    var _document$querySelect;

    (_document$querySelect = document.querySelector(scriptEls.mainContainer)) == null ? void 0 : _document$querySelect.dispatchEvent(new CustomEvent('publication:clicked', {
      detail: detail
    }));
  };

  var fetchPublications = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = transformPublications;
              _context2.next = 3;
              return request({
                apiKey: options.apiKey,
                coreUrl: options.coreUrl,
                url: "/v2/catalogs",
                qs: _objectSpread({
                  dealer_id: options.businessId,
                  order_by: options.orderBy,
                  offset: 0,
                  limit: 24,
                  types: 'paged,incito'
                }, transformFilter(options.requestFilter))
              });

            case 3:
              _context2.t1 = _context2.sent;
              return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    return function fetchPublications() {
      return _ref3.apply(this, arguments);
    };
  }();

  var transformPublications = function transformPublications(publications) {
    var _context3, _context4;

    var filters = transformFilter(options.clientFilter);
    return _mapInstanceProperty__default["default"](_context3 = _filterInstanceProperty__default["default"](_context4 = publications || []).call(_context4, function (publication) {
      return _Object$entries__default["default"](filters).reduce(function (prev, _ref4) {
        var key = _ref4[0],
            value = _ref4[1];
        return publication[key] === value && prev;
      }, {});
    })).call(_context3, function (publication) {
      return _objectSpread({}, publication, {
        dateFrom: formatDate(publication == null ? void 0 : publication.run_from),
        dateTill: formatDate(publication == null ? void 0 : publication.run_till)
      });
    });
  };

  var render = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
      var _getHashFragments;

      var paramPublicationId, hashPulicationId, publication;
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return fetchPublications();

            case 2:
              publications = _context5.sent;
              MainContainer$1({
                publications: publications,
                template: customTemplates.mainContainer,
                el: document.querySelector(scriptEls.mainContainer)
              }).render();
              addPublicationListener();
              paramPublicationId = getQueryParam(scriptEls.publicationIdParam);
              hashPulicationId = (_getHashFragments = getHashFragments(scriptEls.publicationHash)) == null ? void 0 : _getHashFragments.publicationId;

              if (paramPublicationId) {
                publication = findPublicationById(paramPublicationId);
              } else if (hashPulicationId) {
                publication = findPublicationById(hashPulicationId);
              }

              if (publication) renderPublicationViewer(publication);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee2);
    }));

    return function render() {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    render: render
  };
};

var OfferDetails = /*#__PURE__*/function () {
  function OfferDetails(_ref) {
    var _this = this;

    var _ref$minWidth = _ref.minWidth,
        minWidth = _ref$minWidth === void 0 ? 300 : _ref$minWidth,
        _ref$maxWidth = _ref.maxWidth,
        maxWidth = _ref$maxWidth === void 0 ? '100vw' : _ref$maxWidth,
        anchorEl = _ref.anchorEl,
        contentEl = _ref.contentEl;
    this.el = void 0;
    this.elInner = void 0;
    this.contentEl = void 0;
    this.anchorEl = void 0;
    this.minWidth = void 0;
    this.maxWidth = void 0;

    this.resize = function () {
      _this.position();
    };

    this.minWidth = minWidth;
    this.maxWidth = maxWidth;
    this.anchorEl = anchorEl;
    this.contentEl = contentEl;
    this.elInner = document.createElement('div');
    this.elInner.className = 'sgn-offer-details-inner';
    this.el = document.createElement('div');
    this.el.className = 'sgn-offer-details';
    this.el.setAttribute('tabindex', '-1');
    this.el.appendChild(this.elInner);
    this.el.appendChild(this.contentEl);
    this.position();
  }

  var _proto = OfferDetails.prototype;

  _proto.appendTo = function appendTo(el) {
    el.appendChild(this.el);
    this.el.offsetWidth;
    this.show();
    return this;
  };

  _proto.show = function show() {
    this.el.className += ' in';
    window.addEventListener('resize', this.resize, false);
    return this;
  };

  _proto.destroy = function destroy() {
    var _this$el$parentNode;

    window.removeEventListener('resize', this.resize, false);
    (_this$el$parentNode = this.el.parentNode) == null ? void 0 : _this$el$parentNode.removeChild(this.el);
  };

  _proto.position = function position() {
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
      this.elInner.style.right = '0';
    } else {
      this.el.style.left = left + 'px';
      this.el.style.right = 'auto';
      this.elInner.style.left = '0';
      this.elInner.style.right = 'auto';
    }

    this.el.style.minWidth = typeof this.minWidth === 'number' ? Math.max(width, this.minWidth) + 'px' : this.minWidth;
    this.el.style.maxWidth = String(this.maxWidth);
    this.elInner.style.width = width - 8 + 'px';
  };

  return _createClass__default["default"](OfferDetails);
}();

var CoreUIKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    off: off,
    on: on,
    IncitoPublication: IncitoPublication,
    ListPublications: ListPublications,
    OfferDetails: OfferDetails,
    PagedPublication: PagedPublication,
    Popover: Popover,
    singleChoicePopover: singleChoicePopover
});

var uuid = function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
};

var btoa = function btoa(str) {
  return isBrowser() ? window.btoa(str) : Buffer.from(str.toString(), 'binary').toString('base64');
};

var createTrackerClient = function createTrackerClient() {
  var _id;

  var id = get('client-id');
  if ((_id = id) != null && _id.data) id = id.data;
  if (!id) id = uuid();
  set('client-id', id);
  return {
    id: id
  };
};

function getPool() {
  var data = get('event-tracker-pool');
  return Array.isArray(data) ? _filterInstanceProperty__default["default"](data).call(data, function (_ref) {
    var _i = _ref._i;
    return typeof _i === 'string';
  }) : [];
}

var unloadHandler = function unloadHandler() {
  set('event-tracker-pool', _concatInstanceProperty__default["default"](pool).call(pool, getPool()));
};

var pool;

var Tracker = /*#__PURE__*/function () {
  function Tracker(options) {
    this.hasMadeInitialDispatch = false;
    this.location = {
      geohash: null,
      time: null,
      country: null
    };
    this.trackId = null;
    this.poolLimit = 1000;
    this.client = void 0;
    this.eventsTrackUrl = void 0;

    if (!pool) {
      pool = getPool();
      set('event-tracker-pool', []);

      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', unloadHandler, false);
      }
    }

    this.trackId = (options == null ? void 0 : options.trackId) || this.trackId;
    this.poolLimit = (options == null ? void 0 : options.poolLimit) || this.poolLimit;
    this.client = (options == null ? void 0 : options.client) || createTrackerClient();
    this.eventsTrackUrl = (options == null ? void 0 : options.eventsTrackUrl) || eventsTrackUrl;

    if (this.eventsTrackUrl) {
      dispatch(this.eventsTrackUrl);
      this.hasMadeInitialDispatch = true;
    }
  }

  var _proto = Tracker.prototype;

  _proto.setEventsTrackUrl = function setEventsTrackUrl(eventsTrackUrl) {
    this.eventsTrackUrl = eventsTrackUrl;

    if (!this.hasMadeInitialDispatch) {
      dispatch(this.eventsTrackUrl);
      this.hasMadeInitialDispatch = true;
    }
  };

  _proto.trackEvent = function trackEvent(type, properties, version) {
    if (version === void 0) {
      version = 2;
    }

    if (typeof type !== 'number') throw error(new Error('Event type is required'));
    if (!this.trackId) return;

    var evt = _Object$assign__default["default"]({}, properties, {
      _e: type,
      _v: version,
      _i: uuid(),
      _t: Math.round(new Date().getTime() / 1000),
      _a: this.trackId
    });

    if (this.location.geohash) evt['l.h'] = this.location.geohash;
    if (this.location.time) evt['l.ht'] = this.location.time;
    if (this.location.country) evt['l.c'] = this.location.country;
    pool.push(evt);

    while (pool.length > this.poolLimit) {
      pool.shift();
    }

    dispatch(this.eventsTrackUrl);
    return this;
  };

  _proto.setLocation = function setLocation(location) {
    for (var key in location) {
      this.location[key] = location[key];
    }

    return this;
  };

  _proto.trackPagedPublicationOpened = function trackPagedPublicationOpened(properties, version) {
    return this.trackEvent(1, properties, version);
  };

  _proto.trackPagedPublicationPageDisappeared = function trackPagedPublicationPageDisappeared(properties, version) {
    return this.trackEvent(2, properties, version);
  };

  _proto.trackOfferOpened = function trackOfferOpened(properties, version) {
    return this.trackEvent(3, properties, version);
  };

  _proto.trackSearched = function trackSearched(properties, version) {
    return this.trackEvent(5, properties, version);
  };

  _proto.trackIncitoPublicationOpened = function trackIncitoPublicationOpened(properties, version) {
    return this.trackEvent(11, properties, version);
  };

  _proto.createViewToken = function createViewToken() {
    var _context, _context2;

    for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
      parts[_key] = arguments[_key];
    }

    return btoa(String.fromCharCode.apply(null, _sliceInstanceProperty__default["default"](_context = md5__default["default"](_concatInstanceProperty__default["default"](_context2 = [this.client.id]).call(_context2, parts).join(''), {
      asBytes: true
    })).call(_context, 0, 8)));
  };

  return _createClass__default["default"](Tracker);
}();
var dispatching = false;
var dispatchLimit = 100;
var dispatchRetryInterval = null;
var dispatch = throttle( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(eventsTrackUrl) {
  var _pool;

  var events, nacks, response, json, _loop, i;

  return _regeneratorRuntime__default["default"].wrap(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (pool) {
            _context3.next = 3;
            break;
          }

          console.warn('Tracker: dispatch called with no active event pool.');
          return _context3.abrupt("return");

        case 3:
          if (!(dispatching || !((_pool = pool) != null && _pool.length))) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return");

        case 5:
          events = _sliceInstanceProperty__default["default"](pool).call(pool, 0, dispatchLimit);
          nacks = 0;
          dispatching = true;
          _context3.prev = 8;
          _context3.next = 11;
          return fetch__default["default"](eventsTrackUrl, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: _JSON$stringify__default["default"]({
              events: events
            })
          });

        case 11:
          response = _context3.sent;
          _context3.next = 14;
          return response.json();

        case 14:
          json = _context3.sent;

          if (dispatchRetryInterval) {
            dispatchRetryInterval = clearInterval(dispatchRetryInterval);
          }

          _loop = function _loop(i) {
            var _json$events$i = json.events[i],
                status = _json$events$i.status,
                id = _json$events$i.id;

            if (status === 'validation_error' || status === 'ack') {
              pool = _filterInstanceProperty__default["default"](pool).call(pool, function (_ref3) {
                var _i = _ref3._i;
                return _i !== id;
              });
            } else {
              nacks++;
            }
          };

          for (i = 0; i < json.events.length; i++) {
            _loop(i);
          } // Keep dispatching until the pool size reaches a sane level.


          if (pool.length >= dispatchLimit && !nacks) dispatch(eventsTrackUrl);
          _context3.next = 24;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](8);

          // Try dispatching again in 20 seconds, if we aren't already trying
          if (!dispatchRetryInterval) {
            console.warn("We're gonna keep trying, but there was an error while dispatching events:", _context3.t0);
            dispatchRetryInterval = setInterval(function () {
              dispatch(eventsTrackUrl);
            }, 20000);
          }

        case 24:
          _context3.prev = 24;
          dispatching = false;
          return _context3.finish(24);

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee, null, [[8, 21, 24, 27]]);
})), 4000);

var EventsKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Tracker: Tracker
});

var config = new Config();
var SGN = {
  config: config,
  util: util,
  translations: translations,
  // Expose storage backends.
  storage: {
    local: clientLocal
  },
  // Expose the different kits.
  EventsKit: EventsKit,
  CoreKit: {
    request: function request$1(options, callback) {
      return request(config.shadow(options), callback);
    }
  },
  PagedPublicationKit: {
    Bootstrapper: function Bootstrapper$1(options) {
      return new Bootstrapper(config.shadow(options));
    },
    Viewer: Viewer
  },
  IncitoPublicationKit: {
    Bootstrapper: function Bootstrapper(options) {
      return new Bootstrapper$1(config.shadow(options));
    },
    Viewer: Viewer$1
  },
  CoreUIKit: CoreUIKit
};
config.bind('change', function (changedAttributes) {
  var _ref;

  var newEventTracker = changedAttributes.eventTracker;
  var newApiKey = changedAttributes.apiKey;

  if ((newApiKey || newEventTracker) && ((_ref = newEventTracker || config.get('eventTracker')) == null ? void 0 : _ref.trackId) === (newApiKey || config.get('apiKey'))) {
    throw error(new Error('Track identifier must not be identical to app key. Go to https://etilbudsavis.dk/developers/apps to get a track identifier for your app'));
  } // default eventsTrackUrl


  if (newEventTracker && !newEventTracker.eventsTrackUrl) {
    newEventTracker.setEventsTrackUrl(config.get('eventsTrackUrl'));
  }

  var newEventsTrackUrl = changedAttributes.eventsTrackUrl;

  if (newEventsTrackUrl && config.get('eventTracker')) {
    config.get('eventTracker').setEventsTrackUrl(newEventsTrackUrl);
  }
});

if (isBrowser()) {
  // Autoconfigure the SDK.
  var scriptEl = document.getElementById('sgn-sdk');

  if (scriptEl) {
    var apiKey = scriptEl.dataset.apiKey || scriptEl.dataset.appKey;
    var trackId = scriptEl.dataset.trackId;
    var component = scriptEl.dataset.component;
    var scriptConfig = {};
    if (apiKey) scriptConfig.apiKey = apiKey;
    if (trackId) scriptConfig.eventTracker = new Tracker({
      trackId: trackId
    });
    config.set(scriptConfig);

    if (component === 'paged-publication-viewer') {
      PagedPublication(scriptEl, config.shadow()).render();
    }

    if (component === 'incito-publication-viewer') {
      IncitoPublication(scriptEl, config.shadow()).render();
    }

    if (component === 'list-publications') {
      ListPublications(scriptEl, config.shadow()).render();
    }
  }
}

module.exports = SGN;
//# sourceMappingURL=sgn-sdk.cjs.js.map
