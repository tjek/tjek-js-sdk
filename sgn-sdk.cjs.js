'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es6.promise');
require('core-js/modules/es6.regexp.constructor');
require('core-js/modules/es6.regexp.to-string');
require('core-js/modules/es6.object.to-string');
require('core-js/modules/es6.regexp.replace');
require('core-js/modules/es6.function.name');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
var microevent = _interopDefault(require('microevent'));
var mustache = _interopDefault(require('mustache'));
require('core-js/modules/es6.regexp.split');
require('core-js/modules/es6.object.assign');
var crossFetch = _interopDefault(require('cross-fetch'));
var md5$1 = _interopDefault(require('md5'));
require('core-js/modules/es6.object.keys');
var sha256$1 = _interopDefault(require('sha256'));
require('core-js/modules/es6.array.find');
var versoBrowser = _interopDefault(require('verso-browser'));
var incitoBrowser = _interopDefault(require('incito-browser'));
require('core-js/modules/es7.object.values');
require('core-js/modules/es6.regexp.match');

var util;
util = {
  isBrowser: function isBrowser() {
    return typeof window === 'object' && typeof document === 'object';
  },
  isNode: function isNode() {
    return typeof process === 'object';
  },
  error: function error(err, options) {
    var key, value;
    err.message = err.message || null;

    if (typeof options === 'string') {
      err.message = options;
    } else if (typeof options === 'object' && options != null) {
      for (key in options) {
        value = options[key];
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

    err.name = options && options.name || err.name || err.code || 'Error';
    err.time = new Date();
    return err;
  },
  uuid: function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  getQueryParam: function getQueryParam(field, url) {
    var href, reg, string;
    href = url ? url : window.location.href;
    reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    string = reg.exec(href);

    if (string) {
      return string[1];
    } else {
      return void 0;
    }
  },
  getRandomNumberBetween: function getRandomNumberBetween(from, to) {
    return Math.floor(Math.random() * to) + from;
  },
  getOS: function getOS() {
    var name, ua;
    name = null;
    ua = window.navigator.userAgent;

    if (ua.indexOf('Windows') > -1) {
      name = 'Windows';
    } else if (ua.indexOf('Mac') > -1) {
      name = 'macOS';
    } else if (ua.indexOf('X11') > -1) {
      name = 'unix';
    } else if (ua.indexOf('Linux') > -1) {
      name = 'Linux';
    } else if (ua.indexOf('iOS') > -1) {
      name = 'iOS';
    } else if (ua.indexOf('Android') > -1) {
      name = 'Android';
    }

    return name;
  },
  getDeviceCategory: function getDeviceCategory() {
    var deviceCategory;
    deviceCategory = 'desktop';

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
  },
  getPointer: function getPointer() {
    var pointer;
    pointer = 'fine';

    if (matchMedia('(pointer:coarse)').matches) {
      pointer = 'coarse';
    }

    return pointer;
  },
  getOrientation: function getOrientation(width, height) {
    if (width === height) {
      return 'quadratic';
    } else if (width > height) {
      return 'horizontal';
    } else {
      return 'vertical';
    }
  },
  getScreenDimensions: function getScreenDimensions() {
    var density, logical, physical, ref;
    density = (ref = window.devicePixelRatio) != null ? ref : 1;
    logical = {
      width: window.screen.width,
      height: window.screen.height
    };
    physical = {
      width: Math.round(logical.width * density),
      height: Math.round(logical.height * density)
    };
    return {
      density: density,
      logical: logical,
      physical: physical
    };
  },
  getUtcOffsetSeconds: function getUtcOffsetSeconds() {
    var jan1, jan2, now, stdTimeOffset, tmp;
    now = new Date();
    jan1 = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    tmp = jan1.toGMTString();
    jan2 = new Date(tmp.substring(0, tmp.lastIndexOf(' ') - 1));
    stdTimeOffset = (jan1 - jan2) / 1000;
    return stdTimeOffset;
  },
  getUtcDstOffsetSeconds: function getUtcDstOffsetSeconds() {
    return new Date().getTimezoneOffset() * 60 * -1;
  },
  getColorBrightness: function getColorBrightness(color) {
    var hex, rgb, s, sum, x;
    color = color.replace('#', '');
    hex = parseInt((hex + '').replace(/[^a-f0-9]/gi, ''), 16);
    rgb = [];
    sum = 0;
    x = 0;

    while (x < 3) {
      s = parseInt(color.substring(2 * x, 2), 16);
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
  },
  btoa: function (_btoa) {
    function btoa(_x) {
      return _btoa.apply(this, arguments);
    }

    btoa.toString = function () {
      return _btoa.toString();
    };

    return btoa;
  }(function (str) {
    var buffer;

    if (util.isBrowser()) {
      return btoa(str);
    } else {
      buffer = null;

      if (str instanceof Buffer) {
        buffer = str;
      } else {
        buffer = new Buffer(str.toString(), 'binary');
      }

      return buffer.toString('base64');
    }
  }),
  chunk: function chunk(arr, size) {
    var results;
    results = [];

    while (arr.length) {
      results.push(arr.splice(0, size));
    }

    return results;
  },
  throttle: function throttle(fn) {
    var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
    var scope = arguments.length > 2 ? arguments[2] : undefined;
    var deferTimer, last;
    last = void 0;
    deferTimer = void 0;
    return function () {
      var args, context, now;
      context = scope || this;
      now = new Date().getTime();
      args = arguments;

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
  },
  loadImage: function loadImage(src, callback) {
    var img;
    img = new Image();

    img.onload = function () {
      return callback(null, img.width, img.height);
    };

    img.onerror = function () {
      return callback(new Error());
    };

    img.src = src;
    return img;
  },
  distance: function distance(lat1, lng1, lat2, lng2) {
    var dist, radlat1, radlat2, radtheta, theta;
    radlat1 = Math.PI * lat1 / 180;
    radlat2 = Math.PI * lat2 / 180;
    theta = lng1 - lng2;
    radtheta = Math.PI * theta / 180;
    dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344 * 1000;
    return dist;
  },
  async: {
    parallel: function parallel(asyncCalls, sharedCallback) {
      var allResults, counter, k, makeCallback;
      counter = asyncCalls.length;
      allResults = [];
      k = 0;

      makeCallback = function makeCallback(index) {
        return function () {
          var i, results;
          results = [];
          i = 0;
          counter--;

          while (i < arguments.length) {
            results.push(arguments[i]);
            i++;
          }

          allResults[index] = results;

          if (counter === 0) {
            sharedCallback(allResults);
          }
        };
      };

      while (k < asyncCalls.length) {
        asyncCalls[k](makeCallback(k));
        k++;
      }
    }
  },
  // Method for wrapping a function that takes a callback in any position
  // to return promises if no callback is given in a call.
  // The second argument, cbParameterIndex, is the position of the callback in the original functions parameter list.
  // CoffeeScript optional parameters messes with this function arity detection,
  // not sure what to do about that, other than always setting cbParameterIndex at callsites.
  promiseCallbackInterop: function promiseCallbackInterop(fun) {
    var cbParameterIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fun.length - 1;
    var makePromise; // This is the function that actually wraps and calls a method to return a promise.

    makePromise = function makePromise(fun, cbParameterIndex, parameters) {
      return new Promise(function (resolve, reject) {
        var callParameters, i, j, neoCallback, ref;

        neoCallback = function neoCallback(error, result) {
          if (error) {
            return reject(error);
          } else {
            return resolve(result);
          }
        };

        callParameters = [];

        for (i = j = 0, ref = Math.max(parameters.length, cbParameterIndex) + 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          callParameters.push(i === cbParameterIndex ? neoCallback : parameters[i]);
        }

        return fun.apply(this, callParameters);
      });
    }; // Wrapper function that decides what to do per-call.


    return function () {
      for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
        parameters[_key] = arguments[_key];
      }

      if (typeof parameters[cbParameterIndex] === 'function') {
        // Callback given, do a regular old call.
        return fun.apply(null, parameters);
      } else if (typeof Promise === 'function') {
        // No callback given, and we have promise support, use makePromise to wrap the call.
        return makePromise(fun, cbParameterIndex, parameters);
      } else {
        // Ain't got callback, ain't got promise support; we gotta tell the developer.
        throw new Error("To be able to use this asynchronous method you should:\nSupply a callback function as argument #".concat(1 + cbParameterIndex, ".\nThis callback function will be called with the method call response.\nAlternatively, when supported, it can return a Promise if no callback function is given."));
      }
    };
  }
};
var util_1 = util;

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) {
  if (!REACT_ELEMENT_TYPE) {
    REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
  }

  var defaultProps = type && type.defaultProps;
  var childrenLength = arguments.length - 3;

  if (!props && childrenLength !== 0) {
    props = {
      children: void 0
    };
  }

  if (props && defaultProps) {
    for (var propName in defaultProps) {
      if (props[propName] === void 0) {
        props[propName] = defaultProps[propName];
      }
    }
  } else if (!props) {
    props = defaultProps || {};
  }

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = new Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 3];
    }

    props.children = childArray;
  }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key === undefined ? null : '' + key,
    ref: null,
    props: props,
    _owner: null
  };
}

function _asyncIterator(iterable) {
  var method;

  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      method = iterable[Symbol.iterator];
      if (method != null) return method.call(iterable);
    }
  }

  throw new TypeError("Object is not async iterable");
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator(fn.apply(this, arguments));
  };
}

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}

function _asyncGeneratorDelegate(inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  ;

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      return pump("return", value);
    };
  }

  return iter;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  if (Object.getOwnPropertySymbols) {
    var objectSymbols = Object.getOwnPropertySymbols(descs);

    for (var i = 0; i < objectSymbols.length; i++) {
      var sym = objectSymbols[i];
      var desc = descs[sym];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, sym, desc);
    }
  }

  return obj;
}

function _defaults(obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      var base = _superPropBase(target, property);

      var desc;

      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }

      desc = Object.getOwnPropertyDescriptor(receiver, property);

      if (desc) {
        if (!desc.writable) {
          return false;
        }

        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        _defineProperty(receiver, property, value);
      }

      return true;
    };
  }

  return set(target, property, value, receiver);
}

function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);

  if (!s && isStrict) {
    throw new Error('failed to set property');
  }

  return value;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _temporalRef(val, name) {
  if (val === _temporalUndefined) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
}

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

function _classNameTDZError(name) {
  throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
}

var _temporalUndefined = {};

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _slicedToArrayLoose(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _iterableToArrayLimitLoose(arr, i) {
  var _arr = [];

  for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    _arr.push(_step.value);

    if (i && _arr.length === i) break;
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _skipFirstGeneratorNext(fn) {
  return function () {
    var it = fn.apply(this, arguments);
    it.next();
    return it;
  };
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.');
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

var id = 0;

function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}

function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }

  return receiver;
}

function _classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  var descriptor = privateMap.get(receiver);

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  var descriptor = privateMap.get(receiver);

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }

  return descriptor.value;
}

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }

  if (!descriptor.writable) {
    throw new TypeError("attempted to set read only private field");
  }

  descriptor.value = value;
  return value;
}

function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }

  return method;
}

function _classStaticPrivateMethodSet() {
  throw new TypeError("attempted to set read only static private field");
}

function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();

  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      api = mixins[i](api);
    }
  }

  var r = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r.F, decorated.elements);
  return api.runClassFinishers(r.F, decorated.finishers);
}

function _getDecoratorsApi() {
  _getDecoratorsApi = function () {
    return api;
  };

  var api = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function (O, elements) {
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    },
    initializeClassElements: function (F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          var placement = element.placement;

          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    },
    defineClassElement: function (receiver, element) {
      var descriptor = element.descriptor;

      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
          enumerable: descriptor.enumerable,
          writable: descriptor.writable,
          configurable: descriptor.configurable,
          value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
      }

      Object.defineProperty(receiver, element.key, descriptor);
    },
    decorateClass: function (elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = {
        static: [],
        prototype: [],
        own: []
      };
      elements.forEach(function (element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function (element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);

      if (!decorators) {
        return {
          elements: newElements,
          finishers: finishers
        };
      }

      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    },
    addElementPlacement: function (element, placements, silent) {
      var keys = placements[element.placement];

      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }

      keys.push(element.key);
    },
    decorateElement: function (element, placements) {
      var extras = [];
      var finishers = [];

      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);

        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }

        var newExtras = elementFinisherExtras.extras;

        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }

          extras.push.apply(extras, newExtras);
        }
      }

      return {
        element: element,
        finishers: finishers,
        extras: extras
      };
    },
    decorateConstructor: function (elements, decorators) {
      var finishers = [];

      for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

        if (elementsAndFinisher.finisher !== undefined) {
          finishers.push(elementsAndFinisher.finisher);
        }

        if (elementsAndFinisher.elements !== undefined) {
          elements = elementsAndFinisher.elements;

          for (var j = 0; j < elements.length - 1; j++) {
            for (var k = j + 1; k < elements.length; k++) {
              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }

      return {
        elements: elements,
        finishers: finishers
      };
    },
    fromElementDescriptor: function (element) {
      var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field") obj.initializer = element.initializer;
      return obj;
    },
    toElementDescriptors: function (elementObjects) {
      if (elementObjects === undefined) return;
      return _toArray(elementObjects).map(function (elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    },
    toElementDescriptor: function (elementObject) {
      var kind = String(elementObject.kind);

      if (kind !== "method" && kind !== "field") {
        throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
      }

      var key = _toPropertyKey(elementObject.key);

      var placement = String(elementObject.placement);

      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
      }

      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({}, descriptor)
      };

      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }

      return element;
    },
    toElementFinisherExtras: function (elementObject) {
      var element = this.toElementDescriptor(elementObject);

      var finisher = _optionalCallableProperty(elementObject, "finisher");

      var extras = this.toElementDescriptors(elementObject.extras);
      return {
        element: element,
        finisher: finisher,
        extras: extras
      };
    },
    fromClassDescriptor: function (elements) {
      var obj = {
        kind: "class",
        elements: elements.map(this.fromElementDescriptor, this)
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    },
    toClassDescriptor: function (obj) {
      var kind = String(obj.kind);

      if (kind !== "class") {
        throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
      }

      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");

      var finisher = _optionalCallableProperty(obj, "finisher");

      var elements = this.toElementDescriptors(obj.elements);
      return {
        elements: elements,
        finisher: finisher
      };
    },
    runClassFinishers: function (constructor, finishers) {
      for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);

        if (newConstructor !== undefined) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }

          constructor = newConstructor;
        }
      }

      return constructor;
    },
    disallowProperty: function (obj, name, objectType) {
      if (obj[name] !== undefined) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    }
  };
  return api;
}

function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);

  var descriptor;

  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }

  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key: key,
    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor: descriptor
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;
  return element;
}

function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

function _coalesceClassElements(elements) {
  var newElements = [];

  var isSameElement = function (other) {
    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
  };

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var other;

    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }

        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
          }

          other.decorators = element.decorators;
        }

        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}

function _optionalCallableProperty(obj, name) {
  var value = obj[name];

  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }

  return value;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

function _classPrivateMethodSet() {
  throw new TypeError("attempted to reassign private method");
}

function _wrapRegExp(re, groups) {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, groups);
  };

  var _RegExp = _wrapNativeSuper(RegExp);

  var _super = RegExp.prototype;

  var _groups = new WeakMap();

  function BabelRegExp(re, groups) {
    var _this = _RegExp.call(this, re);

    _groups.set(_this, groups);

    return _this;
  }

  _inherits(BabelRegExp, _RegExp);

  BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    if (result) result.groups = buildGroups(result, this);
    return result;
  };

  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if (typeof substitution === "string") {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    } else if (typeof substitution === "function") {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = [];
        args.push.apply(args, arguments);

        if (typeof args[args.length - 1] !== "object") {
          args.push(buildGroups(args, _this));
        }

        return substitution.apply(this, args);
      });
    } else {
      return _super[Symbol.replace].call(this, str, substitution);
    }
  };

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      groups[name] = result[g[name]];
      return groups;
    }, Object.create(null));
  }

  return _wrapRegExp.apply(this, arguments);
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

var Config,
    MicroEvent,
    indexOf = [].indexOf;
MicroEvent = microevent;

Config = Config = function () {
  var Config =
  /*#__PURE__*/
  function () {
    function Config() {
      _classCallCheck(this, Config);

      this.attrs = {};
      return;
    }

    _createClass(Config, [{
      key: "set",
      value: function set() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var changedAttributes, key, value;
        changedAttributes = {};

        for (key in config) {
          value = config[key];

          if (indexOf.call(this.keys, key) >= 0) {
            this.attrs[key] = value;
            changedAttributes[key] = value;
          }
        }

        this.trigger('change', changedAttributes);
      }
    }, {
      key: "get",
      value: function get(option) {
        return this.attrs[option];
      }
    }]);

    return Config;
  }();

  ;
  Config.prototype.keys = ['appVersion', 'appKey', 'appSecret', 'authToken', 'eventTracker', 'locale', 'coreSessionToken', 'coreSessionClientId', 'coreUrl', 'graphUrl', 'eventsTrackUrl', 'eventsPulseUrl', 'assetsFileUploadUrl'];
  return Config;
}.call(commonjsGlobal);

MicroEvent.mixin(Config);
var config = Config;

var Mustache, pairs;
Mustache = mustache;
pairs = {
  'paged_publication.hotspot_picker.header': 'Which offer did you mean?',
  'incito_publication.product_picker.header': 'Which product?'
};
var translations = {
  t: function t(key, view) {
    var ref, template;
    template = (ref = pairs[key]) != null ? ref : '';
    return Mustache.render(template, view);
  },
  update: function update(translations) {
    var key, value;

    for (key in translations) {
      value = translations[key];
      pairs[key] = value;
    }
  }
};
var translations_1 = translations.t;
var translations_2 = translations.update;

var Config$1, config$1, translations$1, util$1;
Config$1 = config;
translations$1 = translations;
util$1 = util_1;
config$1 = new Config$1(); // Set default values.

config$1.set({
  locale: 'en_US',
  coreUrl: 'https://api.etilbudsavis.dk',
  graphUrl: 'https://graph.service.shopgun.com',
  eventsTrackUrl: 'https://events.service.shopgun.com/sync',
  eventsPulseUrl: 'wss://events.service.shopgun.com/pulse',
  assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'
});
var core = {
  config: config$1,
  translations: translations$1,
  util: util$1
};
var core_1 = core.config;
var core_2 = core.translations;
var core_3 = core.util;

var sgn = core;

var SGN$1, prefixKey;
SGN$1 = sgn;
prefixKey = 'sgn-';
var clientLocal = {
  key: 'sgn-',
  storage: function () {
    var storage;

    try {
      storage = window.localStorage;
      storage["".concat(prefixKey, "test-storage")] = 'foobar';
      delete storage["".concat(prefixKey, "test-storage")];
      return storage;
    } catch (error) {
      return {};
    }
  }(),
  get: function get(key) {
    try {
      return JSON.parse(this.storage["".concat(prefixKey).concat(key)]);
    } catch (error) {}
  },
  set: function set(key, value) {
    try {
      this.storage["".concat(prefixKey).concat(key)] = JSON.stringify(value);
    } catch (error) {}

    return this;
  }
};
var clientLocal_1 = clientLocal.key;
var clientLocal_2 = clientLocal.storage;
var clientLocal_3 = clientLocal.get;
var clientLocal_4 = clientLocal.set;

var SGN$2, prefixKey$1;
SGN$2 = sgn;
prefixKey$1 = 'sgn-';
var clientSession = {
  key: 'sgn-',
  storage: function () {
    var storage;

    try {
      storage = window.sessionStorage;
      storage["".concat(prefixKey$1, "test-storage")] = 'foobar';
      delete storage["".concat(prefixKey$1, "test-storage")];
      return storage;
    } catch (error) {
      return {};
    }
  }(),
  get: function get(key) {
    try {
      return JSON.parse(this.storage["".concat(prefixKey$1).concat(key)]);
    } catch (error) {}
  },
  set: function set(key, value) {
    try {
      this.storage["".concat(prefixKey$1).concat(key)] = JSON.stringify(value);
    } catch (error) {}

    return this;
  }
};
var clientSession_1 = clientSession.key;
var clientSession_2 = clientSession.storage;
var clientSession_3 = clientSession.get;
var clientSession_4 = clientSession.set;

var SGN$3, prefixKey$2;
SGN$3 = sgn;
prefixKey$2 = 'sgn-';
var clientCookie = {
  get: function get(key) {
    var c, ca, ct, err, i, len, name, value;

    if (SGN$3.util.isNode()) {
      return;
    }

    try {
      name = "".concat(prefixKey$2).concat(key, "=");
      ca = document.cookie.split(';');

      for (i = 0, len = ca.length; i < len; i++) {
        c = ca[i];
        ct = c.trim();

        if (ct.indexOf(name) === 0) {
          value = ct.substring(name.length, ct.length);
        }
      }

      value = JSON.parse(value);
    } catch (error) {
      err = error;
      value = {};
    }

    return value;
  },
  set: function set(key, value) {
    var date, days, err, str;

    if (SGN$3.util.isNode()) {
      return;
    }

    try {
      days = 365;
      date = new Date();
      str = JSON.stringify(value);
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = "".concat(prefixKey$2).concat(key, "=").concat(str, ";expires=").concat(date.toUTCString(), ";path=/");
    } catch (error) {
      err = error;
    }
  }
};
var clientCookie_1 = clientCookie.get;
var clientCookie_2 = clientCookie.set;

var SGN$4;
SGN$4 = sgn;

var fileUpload = function fileUpload() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var progressCallback = arguments.length > 2 ? arguments[2] : undefined;
  var formData, http, timeout, url;

  if (options.file == null) {
    throw new Error('File is not defined');
  }

  url = SGN$4.config.get('assetsFileUploadUrl');
  timeout = 1000 * 60 * 60;
  formData = new FormData();
  http = new XMLHttpRequest();
  formData.append('file', options.file);

  http.onload = function () {
    if (http.status === 200) {
      callback(null, JSON.parse(http.response));
    } else {
      callback(SGN$4.util.error(new Error('Request error'), {
        code: 'RequestError',
        statusCode: data.statusCode
      }));
    }
  };

  http.upload.onprogress = function (e) {
    if (typeof progressCallback === 'function' && e.lengthComputable) {
      progressCallback({
        progress: e.loaded / e.total,
        loaded: e.loaded,
        total: e.total
      });
    }
  };

  http.open('post', url);
  http.timeout = timeout;
  http.setRequestHeader('Accept', 'application/json');
  http.send(formData);
};

var assets = {
  fileUpload: fileUpload
};
var assets_1 = assets.fileUpload;

var SGN$5, Tracker, _dispatch, clientLocalStorage, dispatch, dispatchLimit, dispatching, fetch, getPool, md5, pool, ship;

fetch = crossFetch;
md5 = md5$1;
SGN$5 = sgn;
clientLocalStorage = clientLocal;

getPool = function getPool() {
  var data;
  data = clientLocalStorage.get('event-tracker-pool');

  if (Array.isArray(data) === false) {
    data = [];
  }

  data = data.filter(function (evt) {
    return typeof evt._i === 'string';
  });
  return data;
};

pool = getPool();

var tracker = Tracker = function () {
  var Tracker =
  /*#__PURE__*/
  function () {
    function Tracker() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Tracker);

      var key, ref, value;
      ref = this.defaultOptions;

      for (key in ref) {
        value = ref[key];
        this[key] = options[key] || value;
      }

      this.location = {
        geohash: null,
        time: null,
        country: null
      };
      this.dispatching = false;
      dispatch();
      return;
    }

    _createClass(Tracker, [{
      key: "trackEvent",
      value: function trackEvent(type) {
        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
        var evt, now;

        if (typeof type !== 'number') {
          throw SGN$5.util.error(new Error('Event type is required'));
        }

        if (this.trackId == null) {
          return;
        }

        if (SGN$5.config.get('appKey') === this.trackId) {
          // coffeelint: disable=max_line_length
          throw SGN$5.util.error(new Error('Track identifier must not be identical to app key. Go to https://shopgun.com/developers/apps to get a track identifier for your app'));
        }

        now = new Date().getTime();
        evt = Object.assign({}, properties, {
          '_e': type,
          '_v': version,
          '_i': SGN$5.util.uuid(),
          '_t': Math.round(new Date().getTime() / 1000),
          '_a': this.trackId
        });

        if (this.location.geohash != null) {
          evt['l.h'] = this.location.geohash;
        }

        if (this.location.time != null) {
          evt['l.ht'] = this.location.time;
        }

        if (this.location.country != null) {
          evt['l.c'] = this.location.country;
        }

        pool.push(evt);

        while (pool.length > this.poolLimit) {
          pool.shift();
        }

        dispatch();
        return this;
      }
    }, {
      key: "setLocation",
      value: function setLocation() {
        var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var key, value;

        for (key in location) {
          value = location[key];

          if (this.location.hasOwnProperty(key)) {
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
      key: "trackClientSessionOpened",
      value: function trackClientSessionOpened(properties, version) {
        return this.trackEvent(4, properties, version);
      }
    }, {
      key: "trackSearched",
      value: function trackSearched(properties, version) {
        return this.trackEvent(5, properties, version);
      }
    }, {
      key: "trackIncitoPublicationOpened",
      value: function trackIncitoPublicationOpened(properties, version) {
        return this.trackEvent(8, properties, version);
      }
    }, {
      key: "createViewToken",
      value: function createViewToken() {
        var str, viewToken;

        for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
          parts[_key] = arguments[_key];
        }

        str = [SGN$5.client.id].concat(parts).join('');
        viewToken = SGN$5.util.btoa(String.fromCharCode.apply(null, md5(str, {
          asBytes: true
        }).slice(0, 8)));
        return viewToken;
      }
    }]);

    return Tracker;
  }();

  ;
  Tracker.prototype.defaultOptions = {
    trackId: null,
    poolLimit: 1000
  };
  return Tracker;
}.call(commonjsGlobal);

dispatching = false;
dispatchLimit = 100;

ship = function ship() {
  var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var req;
  req = fetch(SGN$5.config.get('eventsTrackUrl'), {
    method: 'post',
    timeout: 1000 * 20,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      events: events
    })
  });
  return req.then(function (response) {
    return response.json();
  });
};

_dispatch = function _dispatch() {
  var events, nacks;

  if (dispatching === true || pool.length === 0) {
    return;
  }

  events = pool.slice(0, dispatchLimit);
  nacks = 0;
  dispatching = true;
  ship(events).then(function (response) {
    dispatching = false;
    response.events.forEach(function (resEvent) {
      if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
        pool = pool.filter(function (poolEvent) {
          return poolEvent._i !== resEvent.id;
        });
      } else if ('nack') {
        nacks++;
      }
    });

    if (pool.length >= dispatchLimit && nacks === 0) {
      // Keep dispatching until the pool size reaches a sane level.
      dispatch();
    }
  }).catch(function (err) {
    dispatching = false;
    throw err;
  });
};

dispatch = SGN$5.util.throttle(_dispatch, 4000);
clientLocalStorage.set('event-tracker-pool', []);

try {
  window.addEventListener('beforeunload', function (e) {
    pool = pool.concat(getPool());
    clientLocalStorage.set('event-tracker-pool', pool);
  }, false);
} catch (error) {}

var MicroEvent$1, Pulse;
MicroEvent$1 = microevent;

Pulse =
/*#__PURE__*/
function () {
  function Pulse() {
    _classCallCheck(this, Pulse);

    this.destroyed = false;
    this.connection = this.connect();
    return;
  }

  _createClass(Pulse, [{
    key: "destroy",
    value: function destroy() {
      this.destroyed = true;
      this.connection.close();
      return this;
    }
  }, {
    key: "connect",
    value: function connect() {
      var connection;
      connection = new WebSocket(SGN.config.get('eventsPulseUrl'));
      connection.onopen = this.onOpen.bind(this);
      connection.onmessage = this.onMessage.bind(this);
      connection.onerror = this.onError.bind(this);
      connection.onclose = this.onClose.bind(this);
      return connection;
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      this.trigger('open');
    }
  }, {
    key: "onMessage",
    value: function onMessage(e) {
      try {
        this.trigger('event', JSON.parse(e.data));
      } catch (error) {}
    }
  }, {
    key: "onError",
    value: function onError() {}
  }, {
    key: "onClose",
    value: function onClose() {
      var _this = this;

      if (this.destroyed === false) {
        setTimeout(function () {
          _this.connection = _this.connect();
        }, 2000);
      }
    }
  }]);

  return Pulse;
}();

MicroEvent$1.mixin(Pulse);
var pulse = Pulse;

var events = {
  Tracker: tracker,
  Pulse: pulse
};
var events_1 = events.Tracker;
var events_2 = events.Pulse;

var SGN$6, fetch$1, parseCookies, promiseCallbackInterop, request;
fetch$1 = crossFetch;
SGN$6 = sgn;
promiseCallbackInterop = util_1.promiseCallbackInterop;

parseCookies = function parseCookies() {
  var cookies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var parsedCookies;
  parsedCookies = {};
  cookies.map(function (cookie) {
    var key, keyValuePair, parts, value;
    parts = cookie.split('; ');
    keyValuePair = parts[0].split('=');
    key = keyValuePair[0];
    value = keyValuePair[1];
    parsedCookies[key] = value;
  });
  return parsedCookies;
};

request = function request() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var appKey, authToken, authTokenCookieName, timeout, url;
  url = SGN$6.config.get('graphUrl');
  timeout = 1000 * 12;
  appKey = SGN$6.config.get('appKey');
  authToken = SGN$6.config.get('authToken');
  authTokenCookieName = 'shopgun-auth-token';
  options = {
    method: 'post',
    timeout: timeout,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      query: options.query,
      operationName: options.operationName,
      variables: options.variables
    })
  }; // Set cookies manually in node.js.

  if (SGN$6.util.isNode() && authToken != null) {
    options.cookies = [{
      key: authTokenCookieName,
      value: authToken,
      url: url
    }];
  } else if (SGN$6.util.isBrowser()) {
    options.credentials = 'include';
  }

  fetch$1(url, options).then(function (response) {
    return response.json().then(function (json) {
      var authCookie, cookies, ref; // Update auth token as it might have changed.

      if (SGN$6.util.isNode()) {
        cookies = parseCookies((ref = response.headers) != null ? ref['set-cookie'] : void 0);
        authCookie = cookies[authTokenCookieName];

        if (SGN$6.config.get('authToken') !== authCookie) {
          SGN$6.config.set('authToken', authCookie);
        }
      }

      if (response.status !== 200) {
        return callback(SGN$6.util.error(new Error('Graph API error'), {
          code: 'GraphAPIError',
          statusCode: data.statusCode
        }));
      } else {
        return callback(null, json);
      }
    });
  }).catch(callback);
};

var request_1 = promiseCallbackInterop(request, 1);

var graph = {
  request: request_1
};
var graph_1 = graph.request;

var SGN$7, fetch$2, promiseCallbackInterop$1, _request;

fetch$2 = crossFetch;
SGN$7 = sgn;
promiseCallbackInterop$1 = util_1.promiseCallbackInterop;

_request = function request() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var secondTime = arguments.length > 2 ? arguments[2] : undefined;
  SGN$7.CoreKit.session.ensure(function (err) {
    var appSecret, appVersion, body, geo, headers, json, locale, qs, ref, ref1, ref2, req, token, url;

    if (err != null) {
      return callback(err);
    }

    url = SGN$7.config.get('coreUrl') + ((ref = options.url) != null ? ref : '');
    headers = (ref1 = options.headers) != null ? ref1 : {};
    json = typeof options.json === 'boolean' ? options.json : true;
    token = SGN$7.config.get('coreSessionToken');
    appVersion = SGN$7.config.get('appVersion');
    appSecret = SGN$7.config.get('appSecret');
    locale = SGN$7.config.get('locale');
    qs = (ref2 = options.qs) != null ? ref2 : {};
    geo = options.geolocation;
    body = options.body;
    headers['X-Token'] = token;

    if (appSecret != null) {
      headers['X-Signature'] = SGN$7.CoreKit.session.sign(appSecret, token);
    }

    if (json) {
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';

      if (body) {
        body = JSON.stringify(body);
      }
    }

    if (locale != null) {
      qs.r_locale = locale;
    }

    if (appVersion != null) {
      qs.api_av = appVersion;
    }

    if (geo != null) {
      if (geo.latitude != null && qs.r_lat == null) {
        qs.r_lat = geo.latitude;
      }

      if (geo.longitude != null && qs.r_lng == null) {
        qs.r_lng = geo.longitude;
      }

      if (geo.radius != null && qs.r_radius == null) {
        qs.r_radius = geo.radius;
      }

      if (geo.sensor != null && qs.r_sensor == null) {
        qs.r_sensor = geo.sensor;
      }
    }

    if (Object.keys(qs).length) {
      url += '?' + Object.keys(qs).map(function (k) {
        if (Array.isArray(k)) {
          return qs[k].map(function (val) {
            return "".concat(encodeURIComponent(k), "[]=").concat(encodeURIComponent(val));
          }).join('&');
        }

        return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(qs[k]));
      }).join('&');
    }

    req = fetch$2(url, {
      method: options.method,
      body: body,
      headers: headers
    });
    return req.then(function (response) {
      return response.json().then(function (json) {
        var ref3, responseToken;
        token = SGN$7.config.get('coreSessionToken');
        responseToken = response.headers.get('x-token');

        if (responseToken && token !== responseToken) {
          SGN$7.CoreKit.session.saveToken(responseToken);
        }

        if (response.status >= 200 && response.status < 300 || response.status === 304) {
          callback(null, json);
        } else {
          if (secondTime !== true && ((ref3 = json != null ? json.code : void 0) === 1101 || ref3 === 1107 || ref3 === 1108)) {
            SGN$7.config.set({
              coreSessionToken: void 0
            });

            _request(options, callback, true);
          } else {
            callback(SGN$7.util.error(new Error('Core API error'), {
              code: 'CoreAPIError',
              statusCode: response.status
            }), json);
          }
        }
      });
    }).catch(callback);
  });
};

var request_1$1 = promiseCallbackInterop$1(_request, 1);

var SGN$8, callbackQueue, clientCookieStorage, fetch$3, renewed, session, sha256;
fetch$3 = crossFetch;
sha256 = sha256$1;
SGN$8 = sgn;
clientCookieStorage = clientCookie;
callbackQueue = [];
renewed = false;
session = {
  ttl: 1 * 60 * 60 * 24 * 60,
  saveToken: function saveToken(token) {
    if (!token) {
      throw new Error('No token provided for saving');
    }

    SGN$8.config.set({
      coreSessionToken: token
    });
    session.saveCookie();
  },
  saveClientId: function saveClientId(clientId) {
    SGN$8.config.set({
      coreSessionClientId: clientId
    });
    session.saveCookie();
  },
  saveCookie: function saveCookie() {
    clientCookieStorage.set('session', {
      token: SGN$8.config.get('coreSessionToken'),
      client_id: SGN$8.config.get('coreSessionClientId')
    });
  },
  create: function create(callback) {
    var key, req, ttl;
    key = SGN$8.config.get('appKey');
    ttl = session.ttl;
    req = fetch$3(SGN$8.config.get('coreUrl') + "/v2/sessions?api_key=".concat(key, "&token_ttl=").concat(ttl), {
      method: 'post'
    });
    req.then(function (response) {
      return response.json().then(function (json) {
        if (response.status === 201) {
          session.saveToken(json.token);
          session.saveClientId(json.client_id);
          callback(null, json);
        } else {
          callback(new Error('Could not create session'));
        }
      });
    }).catch(function (err) {
      callback(err);
    });
  },
  update: function update(callback) {
    var appSecret, headers, req, token;
    headers = {};
    token = SGN$8.config.get('coreSessionToken');
    appSecret = SGN$8.config.get('appSecret');
    headers['X-Token'] = token;

    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }

    req = fetch$3(SGN$8.config.get('coreUrl') + '/v2/sessions', {
      method: 'put',
      headers: headers
    });
    req.then(function (response) {
      return response.json().then(function (json) {
        if (response.status === 200) {
          session.saveToken(json.token);
          session.saveClientId(json.client_id);
          callback(null, json);
        } else {
          callback(new Error('Could not update session'));
        }
      });
    }).catch(function (err) {
      callback(err);
    });
  },
  renew: function renew(callback) {
    var appSecret, headers, req, token;
    headers = {};
    token = SGN$8.config.get('coreSessionToken');
    appSecret = SGN$8.config.get('appSecret');
    headers['X-Token'] = token;

    if (appSecret) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }

    req = fetch$3(SGN$8.config.get('coreUrl') + '/v2/sessions', {
      method: 'put',
      headers: headers
    });
    req.then(function (response) {
      return response.json().then(function (json) {
        if (response.status === 200) {
          session.saveToken(json.token);
          session.saveClientId(json.client_id);
          callback(null, json);
        } else {
          callback(new Error('Could not renew session'));
        }
      });
    }).catch(function (err) {
      callback(err);
    });
  },
  ensure: function ensure(callback) {
    var complete, queueCount;
    queueCount = callbackQueue.length;

    complete = function complete(err) {
      callbackQueue = callbackQueue.filter(function (fn) {
        fn(err);
        return false;
      });
    };

    callbackQueue.push(callback);

    if (queueCount === 0) {
      if (SGN$8.config.get('coreSessionToken') == null) {
        session.create(complete);
      } else if (renewed === false) {
        renewed = true;
        session.renew(function (err) {
          if (err != null) {
            session.create(complete);
          } else {
            complete();
          }
        });
      } else {
        complete();
      }
    }
  },
  sign: function sign(appSecret, token) {
    return sha256([appSecret, token].join(''));
  }
};
var session_1 = session;

var SGN$9, request$1, session$1;
SGN$9 = sgn;
request$1 = request_1$1;
session$1 = session_1;
var core$1 = {
  request: request$1,
  session: session$1
};
var core_1$1 = core$1.request;
var core_2$1 = core$1.session;

var MicroEvent$2, PagedPublicationPageSpread, SGN$a;
MicroEvent$2 = microevent;
SGN$a = sgn;

PagedPublicationPageSpread =
/*#__PURE__*/
function () {
  function PagedPublicationPageSpread() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PagedPublicationPageSpread);

    this.options = options;
    this.contentsRendered = false;
    this.hotspotsRendered = false;
    this.el = this.renderEl();
    return;
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
      var el, pageIds;
      el = document.createElement('div');
      pageIds = this.getPages().map(function (page) {
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
      var _this = this;

      var el, id, imageLoads, pageCount, pages;
      id = this.getId();
      el = this.getEl();
      pages = this.getPages();
      pageCount = pages.length;
      imageLoads = 0;
      pages.forEach(function (page, i) {
        var image, loaderEl, pageEl;
        image = page.images.medium;
        pageEl = document.createElement('div');
        loaderEl = document.createElement('div');
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
        SGN$a.util.loadImage(image, function (err, width, height) {
          var isComplete;

          if (err == null) {
            isComplete = ++imageLoads === pageCount;
            pageEl.style.backgroundImage = "url(".concat(image, ")");
            pageEl.setAttribute('data-width', width);
            pageEl.setAttribute('data-height', height);
            pageEl.innerHTML = '&nbsp;';

            if (isComplete) {
              el.setAttribute('data-zoomable', true);
            }

            _this.trigger('pageLoaded', {
              pageSpreadId: id,
              page: page
            });

            if (isComplete) {
              _this.trigger('pagesLoaded', {
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
    value: function clearContents(pageSpread, versoPageSpread) {
      this.el.innerHTML = '';
      this.contentsRendered = false;
      return this;
    }
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      var _this2 = this;

      var pageEls, pages;
      pageEls = [].slice.call(this.el.querySelectorAll('.sgn-pp__page'));
      pages = this.getPages();
      pageEls.forEach(function (pageEl) {
        var id, image, page;
        id = pageEl.getAttribute('data-id');
        page = pages.find(function (page) {
          return page.id === id;
        });
        image = page.images.large;
        SGN$a.util.loadImage(image, function (err) {
          if (err == null && _this2.el.getAttribute('data-active') === 'true') {
            pageEl.setAttribute('data-image', pageEl.style.backgroundImage);
            pageEl.style.backgroundImage = "url(".concat(image, ")");
          }
        });
      });
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      var pageEls;
      pageEls = [].slice.call(this.el.querySelectorAll('.sgn-pp__page[data-image]'));
      pageEls.forEach(function (pageEl) {
        pageEl.style.backgroundImage = pageEl.getAttribute('data-image');
        pageEl.removeAttribute('data-image');
      });
    }
  }]);

  return PagedPublicationPageSpread;
}();

MicroEvent$2.mixin(PagedPublicationPageSpread);
var pageSpread = PagedPublicationPageSpread;

var MicroEvent$3, PageSpread, PagedPublicationPageSpreads, SGN$b;
MicroEvent$3 = microevent;
PageSpread = pageSpread;
SGN$b = sgn;

PagedPublicationPageSpreads =
/*#__PURE__*/
function () {
  function PagedPublicationPageSpreads(options) {
    _classCallCheck(this, PagedPublicationPageSpreads);

    this.options = options;
    this.collection = [];
    this.ids = {};
    return;
  }

  _createClass(PagedPublicationPageSpreads, [{
    key: "get",
    value: function get(id) {
      return this.ids[id];
    }
  }, {
    key: "getFrag",
    value: function getFrag() {
      var frag;
      frag = document.createDocumentFragment();
      this.collection.forEach(function (pageSpread) {
        return frag.appendChild(pageSpread.el);
      });
      return frag;
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      var pageMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'single';
      var firstPage, ids, lastPage, maxZoomScale, midstPageSpreads, pageSpreads, pages, width;
      pageSpreads = [];
      ids = {};
      pages = this.options.pages.slice();
      width = this.options.width;
      maxZoomScale = this.options.maxZoomScale;

      if (pageMode === 'single') {
        pages.forEach(function (page) {
          return pageSpreads.push([page]);
        });
      } else {
        firstPage = pages.shift();
        lastPage = pages.length % 2 === 1 ? pages.pop() : null;
        midstPageSpreads = SGN$b.util.chunk(pages, 2);

        if (firstPage != null) {
          pageSpreads.push([firstPage]);
        }

        midstPageSpreads.forEach(function (midstPages) {
          return pageSpreads.push(midstPages.map(function (page) {
            return page;
          }));
        });

        if (lastPage != null) {
          pageSpreads.push([lastPage]);
        }
      }

      this.collection = pageSpreads.map(function (pages, i) {
        var id, pageSpread;
        id = "".concat(pageMode, "-").concat(i);
        pageSpread = new PageSpread({
          width: width,
          maxZoomScale: maxZoomScale,
          pages: pages,
          id: id
        });
        pageSpread.bind('pageLoaded', function (e) {
          return _this.trigger('pageLoaded', e);
        });
        pageSpread.bind('pagesLoaded', function (e) {
          return _this.trigger('pagesLoaded', e);
        });
        ids[id] = pageSpread;
        return pageSpread;
      });
      this.ids = ids;
      return this;
    }
  }]);

  return PagedPublicationPageSpreads;
}();

MicroEvent$3.mixin(PagedPublicationPageSpreads);
var pageSpreads = PagedPublicationPageSpreads;

var MicroEvent$4, PageSpreads, PagedPublicationCore, SGN$c, Verso, clientLocalStorage$1;
MicroEvent$4 = microevent;
Verso = versoBrowser;
PageSpreads = pageSpreads;
clientLocalStorage$1 = clientLocal;
SGN$c = sgn;

PagedPublicationCore = function () {
  var PagedPublicationCore =
  /*#__PURE__*/
  function () {
    function PagedPublicationCore(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, PagedPublicationCore);

      this.options = this.makeOptions(options, this.defaults);
      this.pageId = this.getOption('pageId');
      this.els = {
        root: el,
        pages: el.querySelector('.sgn-pp__pages'),
        verso: el.querySelector('.verso')
      };
      this.pageMode = this.getPageMode();
      this.pageSpreads = new PageSpreads({
        pages: this.getOption('pages'),
        maxZoomScale: this.getOption('pageSpreadMaxZoomScale'),
        width: this.getOption('pageSpreadWidth')
      });
      this.pageSpreads.bind('pageLoaded', this.pageLoaded.bind(this));
      this.pageSpreads.bind('pagesLoaded', this.pagesLoaded.bind(this));
      this.setColor(this.getOption('color')); // It's important to insert the page spreads before instantiating Verso.

      this.els.pages.parentNode.insertBefore(this.pageSpreads.update(this.pageMode).getFrag(), this.els.pages);
      this.verso = this.createVerso();
      this.bind('started', this.start.bind(this));
      this.bind('destroyed', this.destroy.bind(this));
      return;
    }

    _createClass(PagedPublicationCore, [{
      key: "start",
      value: function start() {
        this.getVerso().start();
        this.resizeListener = SGN$c.util.throttle(this.resize, this.getOption('resizeDelay'), this);
        this.unloadListener = this.unload.bind(this);
        window.addEventListener('resize', this.resizeListener, false);
        window.addEventListener('beforeunload', this.unloadListener, false);
        this.els.root.setAttribute('data-started', '');
        this.els.root.setAttribute('tabindex', '-1');
        this.els.root.focus();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var i, len, pageSpreadEl, pageSpreadEls, verso;
        verso = this.getVerso();
        pageSpreadEls = verso.el.querySelectorAll('.sgn-pp__page-spread');
        this.els.root.removeAttribute('data-started');
        this.els.root.removeAttribute('data-idle');
        this.els.root.removeAttribute('data-navigating');
        this.els.root.removeAttribute('data-color-brightness');
        this.els.root.removeAttribute('data-zoomed-in');
        this.els.root.style.backgroundColor = '#ffffff';

        for (i = 0, len = pageSpreadEls.length; i < len; i++) {
          pageSpreadEl = pageSpreadEls[i];
          pageSpreadEl.parentNode.removeChild(pageSpreadEl);
        }

        verso.destroy();
        window.removeEventListener('resize', this.resizeListener, false);
        window.removeEventListener('beforeunload', this.unloadListener, false);
      }
    }, {
      key: "makeOptions",
      value: function makeOptions(options, defaults) {
        var key, opts, ref, value;
        opts = {};

        for (key in options) {
          value = options[key];
          opts[key] = (ref = options[key]) != null ? ref : defaults[key];
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
        this.els.root.setAttribute('data-color-brightness', SGN$c.util.getColorBrightness(color));
        this.els.root.style.backgroundColor = color;
      }
    }, {
      key: "createVerso",
      value: function createVerso() {
        var verso;
        verso = new Verso(this.els.verso, {
          pageId: this.pageId
        });
        verso.pageSpreads.forEach(this.overridePageSpreadContentRect.bind(this));
        verso.bind('beforeNavigation', this.beforeNavigation.bind(this));
        verso.bind('afterNavigation', this.afterNavigation.bind(this));
        verso.bind('attemptedNavigation', this.attemptedNavigation.bind(this));
        verso.bind('clicked', this.clicked.bind(this));
        verso.bind('doubleClicked', this.doubleClicked.bind(this));
        verso.bind('pressed', this.pressed.bind(this));
        verso.bind('contextmenu', this.contextmenu.bind(this));
        verso.bind('panStart', this.panStart.bind(this));
        verso.bind('panEnd', this.panEnd.bind(this));
        verso.bind('zoomedIn', this.zoomedIn.bind(this));
        verso.bind('zoomedOut', this.zoomedOut.bind(this));
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
        var actualHeight, actualWidth, clientRect, imageRatio, pageCount, pageEl, pageEls, pageHeight, pageWidth, rect, scale;
        rect = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0
        };
        pageEls = pageSpread.getPageEls();
        pageEl = pageEls[0];
        pageCount = pageEls.length;

        if (!pageCount) {
          return rect;
        }

        scale = this.getVerso().transform.scale;
        pageWidth = pageEl.offsetWidth * pageCount * scale;
        pageHeight = pageEl.offsetHeight * scale;
        imageRatio = +pageEl.getAttribute('data-height') / (+pageEl.getAttribute('data-width') * pageCount);
        actualHeight = pageHeight;
        actualWidth = actualHeight / imageRatio;
        actualWidth = Math.min(pageWidth, actualWidth);
        actualHeight = actualWidth * imageRatio;
        clientRect = pageEl.getBoundingClientRect();
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
        var label, pageCount, pageIds, pageLabels, pages, ref;
        pages = (ref = pageSpread != null ? pageSpread.options.pages : void 0) != null ? ref : [];
        pageIds = pages.map(function (page) {
          return page.id;
        });
        pageLabels = pages.map(function (page) {
          return page.label;
        });
        pageCount = this.getOption('pages').length;
        label = pageIds.length > 0 ? pageLabels.join('-') + ' / ' + pageCount : null;
        return label;
      }
    }, {
      key: "renderPageSpreads",
      value: function renderPageSpreads() {
        var _this = this;

        this.getVerso().pageSpreads.forEach(function (pageSpread) {
          var match, visibility;
          visibility = pageSpread.getVisibility();
          match = _this.pageSpreads.get(pageSpread.getId());

          if (match != null) {
            if (visibility === 'visible' && match.contentsRendered === false) {
              setTimeout(match.renderContents.bind(match), 0);
            }

            if (visibility === 'gone' && match.contentsRendered === true) {
              setTimeout(match.clearContents.bind(match), 0);
            }
          }
        });
        return this;
      }
    }, {
      key: "findPage",
      value: function findPage(pageId) {
        return this.getOption('pages').find(function (page) {
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
        var newSpreadEl, pageSpread, pageSpreadCount, position, progress, progressLabel, theVerso, versoPageSpread;
        position = e.newPosition;
        theVerso = this.getVerso();
        versoPageSpread = theVerso.getPageSpreadFromPosition(position);
        pageSpread = this.pageSpreads.get(versoPageSpread.getId());
        pageSpreadCount = theVerso.getPageSpreadCount();
        newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
        progress = position / (pageSpreadCount - 1) * 100;
        progressLabel = this.formatProgressLabel(pageSpread);
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
        var newSpreadEl, pageSpread, pageSpreadCount, position, theVerso, versoPageSpread;
        position = e.newPosition;
        theVerso = this.getVerso();
        versoPageSpread = theVerso.getPageSpreadFromPosition(position);
        pageSpread = this.pageSpreads.get(versoPageSpread.getId());
        pageSpreadCount = theVerso.getPageSpreadCount();
        newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
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
        var page, pageId;

        if (e.isInsideContent) {
          pageId = e.pageEl.getAttribute('data-id');
          page = this.findPage(pageId);
          this.trigger('clicked', {
            verso: e,
            page: page
          });
        }
      }
    }, {
      key: "doubleClicked",
      value: function doubleClicked(e) {
        var page, pageId;

        if (e.isInsideContent) {
          pageId = e.pageEl.getAttribute('data-id');
          page = this.findPage(pageId);
          this.trigger('doubleClicked', {
            verso: e,
            page: page
          });
        }
      }
    }, {
      key: "pressed",
      value: function pressed(e) {
        var page, pageId;

        if (e.isInsideContent) {
          pageId = e.pageEl.getAttribute('data-id');
          page = this.findPage(pageId);
          this.trigger('pressed', {
            verso: e,
            page: page
          });
        }
      }
    }, {
      key: "contextmenu",
      value: function contextmenu(e) {
        var page, pageId;

        if (e.isInsideContent) {
          pageId = e.pageEl.getAttribute('data-id');
          page = this.findPage(pageId);
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
        var pageSpread, position, versoPageSpread;
        position = e.position;
        versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
        pageSpread = this.pageSpreads.get(versoPageSpread.getId());

        if (pageSpread != null) {
          pageSpread.zoomIn();
        }

        this.els.root.setAttribute('data-zoomed-in', true);
        this.trigger('zoomedIn', {
          verso: e,
          pageSpread: pageSpread
        });
      }
    }, {
      key: "zoomedOut",
      value: function zoomedOut(e) {
        var pageSpread, position, versoPageSpread;
        position = e.position;
        versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
        pageSpread = this.pageSpreads.get(versoPageSpread.getId());

        if (pageSpread != null) {
          pageSpread.zoomOut();
        }

        this.els.root.setAttribute('data-zoomed-in', false);
        this.trigger('zoomedOut', {
          verso: e,
          pageSpread: pageSpread
        });
      }
    }, {
      key: "getPageMode",
      value: function getPageMode() {
        var height, pageMode, width;
        pageMode = this.getOption('pageMode');

        if (pageMode == null) {
          width = this.els.root.offsetWidth;
          height = this.els.root.offsetHeight;
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
        var _this2 = this;

        this.idleTimeout = setTimeout(function () {
          _this2.els.root.setAttribute('data-idle', true);
        }, this.getOption('idleDelay'));
        return this;
      }
    }, {
      key: "switchPageMode",
      value: function switchPageMode(pageMode) {
        var i, len, pageIds, pageSpreadEl, pageSpreadEls, verso;

        if (this.pageMode === pageMode) {
          return this;
        }

        verso = this.getVerso();
        pageIds = verso.getPageSpreadFromPosition(verso.getPosition()).getPageIds();
        pageSpreadEls = this.getVerso().el.querySelectorAll('.sgn-pp__page-spread');
        this.pageMode = pageMode;
        this.pageSpreads.update(this.pageMode);

        for (i = 0, len = pageSpreadEls.length; i < len; i++) {
          pageSpreadEl = pageSpreadEls[i];
          pageSpreadEl.parentNode.removeChild(pageSpreadEl);
        }

        this.els.pages.parentNode.insertBefore(this.pageSpreads.getFrag(), this.els.pages);
        verso.refresh();
        verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0]), {
          duration: 0
        });
        verso.pageSpreads.forEach(this.overridePageSpreadContentRect.bind(this));
        return this;
      }
    }, {
      key: "overridePageSpreadContentRect",
      value: function overridePageSpreadContentRect(pageSpread) {
        var _this3 = this;

        if (pageSpread.getType() === 'page') {
          return pageSpread.getContentRect = function () {
            return _this3.getContentRect(pageSpread);
          };
        }
      }
    }, {
      key: "resize",
      value: function resize() {
        var pageMode;
        pageMode = this.getPageMode();

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
  }();

  ;
  PagedPublicationCore.prototype.defaults = {
    pages: [],
    pageSpreadWidth: 100,
    pageSpreadMaxZoomScale: 2.3,
    idleDelay: 1000,
    resizeDelay: 400,
    color: '#ffffff'
  };
  return PagedPublicationCore;
}.call(commonjsGlobal);

MicroEvent$4.mixin(PagedPublicationCore);
var core$2 = PagedPublicationCore;

var MicroEvent$5, Mustache$1, PagedPublicationHotspots;
MicroEvent$5 = microevent;
Mustache$1 = mustache;

PagedPublicationHotspots =
/*#__PURE__*/
function () {
  function PagedPublicationHotspots() {
    _classCallCheck(this, PagedPublicationHotspots);

    this.currentPageSpreadId = null;
    this.pageSpreadsLoaded = {};
    this.cache = {};
    this.bind('hotspotsReceived', this.hotspotsReceived.bind(this));
    this.bind('afterNavigation', this.afterNavigation.bind(this));
    this.bind('pagesLoaded', this.pagesLoaded.bind(this));
    this.bind('resized', this.resized.bind(this));
    return;
  }

  _createClass(PagedPublicationHotspots, [{
    key: "renderHotspots",
    value: function renderHotspots(data) {
      var boundingRect, contentRect, el, frag, hotspot, hotspotEl, hotspotEls, i, id, len, pageSpreadEl, position, ref;
      frag = document.createDocumentFragment();
      contentRect = data.versoPageSpread.getContentRect();
      pageSpreadEl = data.pageSpread.getEl();
      hotspotEls = pageSpreadEl.querySelectorAll('.sgn-pp__hotspot');
      boundingRect = pageSpreadEl.getBoundingClientRect();

      for (i = 0, len = hotspotEls.length; i < len; i++) {
        hotspotEl = hotspotEls[i];
        hotspotEl.parentNode.removeChild(hotspotEl);
      }

      ref = data.hotspots;

      for (id in ref) {
        hotspot = ref[id];
        position = this.getPosition(data.pages, data.ratio, hotspot);
        el = this.renderHotspot(hotspot, position, contentRect, boundingRect);
        frag.appendChild(el);
      }

      pageSpreadEl.appendChild(frag);
      return this;
    }
  }, {
    key: "renderHotspot",
    value: function renderHotspot(hotspot, position, contentRect, boundingRect) {
      var el, height, left, top, width;
      el = document.createElement('div');
      top = Math.round(contentRect.height / 100 * position.top);
      left = Math.round(contentRect.width / 100 * position.left);
      width = Math.round(contentRect.width / 100 * position.width);
      height = Math.round(contentRect.height / 100 * position.height);
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

      el.innerHTML = Mustache$1.render('', hotspot);
      el.style.top = "".concat(top, "px");
      el.style.left = "".concat(left, "px");
      el.style.width = "".concat(width, "px");
      el.style.height = "".concat(height, "px");
      return el;
    }
  }, {
    key: "getPosition",
    value: function getPosition(pages, ratio, hotspot) {
      var height, maxX, maxY, minX, minY, pageNumber, pageNumbers, width;
      minX = null;
      minY = null;
      maxX = null;
      maxY = null;
      pageNumbers = pages.map(function (page) {
        return page.pageNumber;
      });

      for (pageNumber in hotspot.locations) {
        if (pageNumbers.indexOf(+pageNumber) === -1) {
          continue;
        }

        hotspot.locations[pageNumber].forEach(function (coords) {
          var x, y;
          x = coords[0];
          y = coords[1];

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

      width = maxX - minX;
      height = maxY - minY;
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
      var pageSpreadId;
      pageSpreadId = e.pageSpread.getId();
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
      var id;

      if (e.pageSpread == null) {
        return;
      }

      id = e.pageSpread.getId();
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
    value: function resized(e) {
      var data;
      data = this.getCache(this.currentPageSpreadId);

      if (data != null) {
        this.renderHotspots(data);
      }
    }
  }]);

  return PagedPublicationHotspots;
}();

MicroEvent$5.mixin(PagedPublicationHotspots);
var hotspots = PagedPublicationHotspots;

var keyCodes = {
  ESC: 27,
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  SPACE: 32,
  NUMBER_ONE: 49
};
var keyCodes_1 = keyCodes.ESC;
var keyCodes_2 = keyCodes.ARROW_RIGHT;
var keyCodes_3 = keyCodes.ARROW_LEFT;
var keyCodes_4 = keyCodes.SPACE;
var keyCodes_5 = keyCodes.NUMBER_ONE;

var MicroEvent$6, PagedPublicationControls, SGN$d, keyCodes$1;
MicroEvent$6 = microevent;
SGN$d = sgn;
keyCodes$1 = keyCodes;

PagedPublicationControls =
/*#__PURE__*/
function () {
  function PagedPublicationControls(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PagedPublicationControls);

    this.options = options;
    this.els = {
      root: el,
      progress: el.querySelector('.sgn-pp__progress'),
      progressBar: el.querySelector('.sgn-pp-progress__bar'),
      progressLabel: el.querySelector('.sgn-pp__progress-label'),
      prevControl: el.querySelector('.sgn-pp__control[data-direction=prev]'),
      nextControl: el.querySelector('.sgn-pp__control[data-direction=next]'),
      close: el.querySelector('.sgn-pp--close')
    };
    this.keyDownListener = SGN$d.util.throttle(this.keyDown, 150, this);

    if (this.options.keyboard === true) {
      this.els.root.addEventListener('keydown', this.keyDownListener, false);
    }

    if (this.els.prevControl != null) {
      this.els.prevControl.addEventListener('mousedown', this.prevClicked.bind(this), false);
    }

    if (this.els.nextControl != null) {
      this.els.nextControl.addEventListener('mousedown', this.nextClicked.bind(this), false);
    }

    if (this.els.close != null) {
      this.els.close.addEventListener('mousedown', this.closeClicked.bind(this), false);
    }

    this.bind('beforeNavigation', this.beforeNavigation.bind(this));
    return;
  }

  _createClass(PagedPublicationControls, [{
    key: "destroy",
    value: function destroy() {
      this.els.root.removeEventListener('keydown', this.keyDownListener);
    }
  }, {
    key: "beforeNavigation",
    value: function beforeNavigation(e) {
      var showProgress, visibilityClassName;
      showProgress = typeof e.progressLabel === 'string' && e.progressLabel.length > 0;
      visibilityClassName = 'sgn-pp--hidden';

      if (this.els.progress != null && this.els.progressBar != null) {
        this.els.progressBar.style.width = "".concat(e.progress, "%");

        if (showProgress === true) {
          this.els.progress.classList.remove(visibilityClassName);
        } else {
          this.els.progress.classList.add(visibilityClassName);
        }
      }

      if (this.els.progressLabel != null) {
        if (showProgress === true) {
          this.els.progressLabel.textContent = e.progressLabel;
          this.els.progressLabel.classList.remove(visibilityClassName);
        } else {
          this.els.progressLabel.classList.add(visibilityClassName);
        }
      }

      if (this.els.prevControl != null) {
        if (e.verso.newPosition === 0) {
          this.els.prevControl.classList.add(visibilityClassName);
        } else {
          this.els.prevControl.classList.remove(visibilityClassName);
        }
      }

      if (this.els.nextControl != null) {
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
      var keyCode;
      keyCode = e.keyCode;

      if (keyCodes$1.ARROW_LEFT === keyCode) {
        this.trigger('prev', {
          duration: 0
        });
      } else if (keyCodes$1.ARROW_RIGHT === keyCode || keyCodes$1.SPACE === keyCode) {
        this.trigger('next', {
          duration: 0
        });
      } else if (keyCodes$1.NUMBER_ONE === keyCode) {
        this.trigger('first', {
          duration: 0
        });
      }
    }
  }]);

  return PagedPublicationControls;
}();

MicroEvent$6.mixin(PagedPublicationControls);
var controls = PagedPublicationControls;

var MicroEvent$7, PagedPublicationEventTracking;
MicroEvent$7 = microevent;

PagedPublicationEventTracking =
/*#__PURE__*/
function () {
  function PagedPublicationEventTracking(eventTracker, id) {
    _classCallCheck(this, PagedPublicationEventTracking);

    this.eventTracker = eventTracker;
    this.id = id;
    this.hidden = true;
    this.pageSpread = null;
    this.bind('appeared', this.appeared.bind(this));
    this.bind('disappeared', this.disappeared.bind(this));
    this.bind('beforeNavigation', this.beforeNavigation.bind(this));
    this.bind('afterNavigation', this.afterNavigation.bind(this));
    this.bind('attemptedNavigation', this.attemptedNavigation.bind(this));
    this.bind('panStart', this.panStart.bind(this));
    this.bind('destroyed', this.destroy.bind(this));
    return;
  }

  _createClass(PagedPublicationEventTracking, [{
    key: "destroy",
    value: function destroy() {
      this.pageSpreadDisappeared();
    }
  }, {
    key: "trackOpened",
    value: function trackOpened(properties) {
      if (this.eventTracker == null) {
        return this;
      }

      this.eventTracker.trackPagedPublicationOpened({
        'pp.id': this.id,
        'vt': this.eventTracker.createViewToken(this.id)
      });
      return this;
    }
  }, {
    key: "trackPageSpreadDisappeared",
    value: function trackPageSpreadDisappeared(pageNumbers) {
      var _this = this;

      if (this.eventTracker == null) {
        return this;
      }

      pageNumbers.forEach(function (pageNumber) {
        _this.eventTracker.trackPagedPublicationPageDisappeared({
          'pp.id': _this.id,
          'ppp.n': pageNumber,
          'vt': _this.eventTracker.createViewToken(_this.id, pageNumber)
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
      if (pageSpread != null && this.hidden === true) {
        this.pageSpread = pageSpread;
        this.hidden = false;
      }
    }
  }, {
    key: "pageSpreadDisappeared",
    value: function pageSpreadDisappeared() {
      if (this.pageSpread != null && this.hidden === false) {
        this.trackPageSpreadDisappeared(this.pageSpread.getPages().map(function (page) {
          return page.pageNumber;
        }));
        this.hidden = true;
        this.pageSpread = null;
      }
    }
  }]);

  return PagedPublicationEventTracking;
}();

MicroEvent$7.mixin(PagedPublicationEventTracking);
var eventTracking = PagedPublicationEventTracking;

var Controls, Core, EventTracking, Hotspots, MicroEvent$8, SGN$e, Viewer;
MicroEvent$8 = microevent;
SGN$e = sgn;
Core = core$2;
Hotspots = hotspots;
Controls = controls;
EventTracking = eventTracking;

Viewer =
/*#__PURE__*/
function () {
  function Viewer(el) {
    var options1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    this.el = el;
    this.options = options1;
    this._core = new Core(this.el, {
      id: this.options.id,
      pages: this.options.pages,
      pageSpreadWidth: this.options.pageSpreadWidth,
      pageSpreadMaxZoomScale: this.options.pageSpreadMaxZoomScale,
      pageId: this.options.pageId,
      idleDelay: this.options.idleDelay,
      resizeDelay: this.options.resizeDelay,
      color: this.options.color
    });
    this._hotspots = new Hotspots();
    this._controls = new Controls(this.el, {
      keyboard: this.options.keyboard
    });
    this._eventTracking = new EventTracking(this.options.eventTracker, this.options.id);
    this.viewSession = SGN$e.util.uuid();
    this.hotspots = null;
    this.hotspotQueue = [];
    this.popover = null;

    this._setupEventListeners();

    return;
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
      var position;
      position = this._core.getVerso().getPageSpreadPositionFromPageId(pageId);
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
      var _this = this;

      this._controls.bind('prev', function (e) {
        _this.prev(e);
      });

      this._controls.bind('next', function (e) {
        _this.next(e);
      });

      this._controls.bind('first', function (e) {
        _this.first(e);
      });

      this._controls.bind('last', function (e) {
        _this.last(e);
      });

      this._controls.bind('close', function (e) {
        _this.destroy(e);
      });

      this._hotspots.bind('hotspotsRequested', function (e) {
        _this.trigger('hotspotsRequested', e);
      });

      this._core.bind('appeared', function (e) {
        _this._eventTracking.trigger('appeared', e);

        _this.trigger('appeared', e);
      });

      this._core.bind('disappeared', function (e) {
        _this._eventTracking.trigger('disappeared', e);

        _this.trigger('disappeared', e);
      });

      this._core.bind('beforeNavigation', function (e) {
        _this._eventTracking.trigger('beforeNavigation', e);

        _this._controls.trigger('beforeNavigation', e);

        _this.trigger('beforeNavigation', e);
      });

      this._core.bind('afterNavigation', function (e) {
        _this._eventTracking.trigger('afterNavigation', e);

        _this._hotspots.trigger('afterNavigation', e);

        _this.trigger('afterNavigation', e);
      });

      this._core.bind('attemptedNavigation', function (e) {
        _this._eventTracking.trigger('attemptedNavigation', e);

        _this.trigger('attemptedNavigation', e);
      });

      this._core.bind('clicked', function (e) {
        _this._eventTracking.trigger('clicked', e);

        _this.trigger('clicked', e);
      });

      this._core.bind('doubleClicked', function (e) {
        _this._eventTracking.trigger('doubleClicked', e);

        _this.trigger('doubleClicked', e);
      });

      this._core.bind('contextmenu', function (e) {
        _this.trigger('contextmenu', e);
      });

      this._core.bind('pressed', function (e) {
        _this._eventTracking.trigger('pressed', e);

        _this.trigger('pressed', e);
      });

      this._core.bind('panStart', function (e) {
        _this._eventTracking.trigger('panStart', e);

        _this.trigger('panStart', e);
      });

      this._core.bind('zoomedIn', function (e) {
        _this._eventTracking.trigger('zoomedIn', e);

        _this.trigger('zoomedIn', e);
      });

      this._core.bind('zoomedOut', function (e) {
        _this._eventTracking.trigger('zoomedOut', e);

        _this.trigger('zoomedOut', e);
      });

      this._core.bind('pageLoaded', function (e) {
        _this._eventTracking.trigger('pageLoaded', e);

        _this.trigger('pageLoaded', e);
      });

      this._core.bind('pagesLoaded', function (e) {
        _this._hotspots.trigger('pagesLoaded', e);

        _this.trigger('pagesLoaded', e);
      });

      this._core.bind('resized', function (e) {
        _this._hotspots.trigger('resized');

        _this.trigger('resized', e);
      });

      this.bind('hotspotsRequested', this.hotspotsRequested.bind(this));
      this.bind('beforeNavigation', this.beforeNavigation.bind(this));
      this.bind('clicked', this.clicked.bind(this));
      this.bind('contextmenu', this.contextmenu.bind(this));
      this.bind('pressed', this.pressed.bind(this));
    }
  }, {
    key: "pickHotspot",
    value: function pickHotspot(e, callback) {
      var _this2 = this;

      var hotspots;

      if (this.hotspots == null) {
        return;
      }

      if (this.popover != null) {
        this.popover.destroy();
        this.popover = null;
      }

      hotspots = e.verso.overlayEls.map(function (overlayEl) {
        return _this2.hotspots[overlayEl.getAttribute('data-id')];
      });

      if (hotspots.length === 1) {
        callback(hotspots[0]);
      } else if (hotspots.length > 1) {
        this.popover = SGN$e.CoreUIKit.singleChoicePopover({
          el: this.el,
          header: SGN$e.translations.t('paged_publication.hotspot_picker.header'),
          x: e.verso.x,
          y: e.verso.y,
          items: hotspots.filter(function (hotspot) {
            return hotspot.type === 'offer';
          }).map(function (hotspot) {
            return {
              id: hotspot.id,
              title: hotspot.offer.heading,
              subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price
            };
          })
        }, function (e) {
          callback(_this2.hotspots[e.id]);
        });
      }
    }
  }, {
    key: "processHotspotQueue",
    value: function processHotspotQueue() {
      var _this3 = this;

      if (this.hotspots == null) {
        return;
      }

      this.hotspotQueue = this.hotspotQueue.filter(function (hotspotRequest) {
        var hotspot, hotspots, i, id, len, page, ref, ref1, versoPageSpread;
        hotspots = {};
        versoPageSpread = _this3._core.getVerso().pageSpreads.find(function (pageSpread) {
          return pageSpread.getId() === hotspotRequest.id;
        });
        ref = _this3.hotspots;

        for (id in ref) {
          hotspot = ref[id];

          if (hotspots[id] != null) {
            continue;
          }

          ref1 = hotspotRequest.pages;

          for (i = 0, len = ref1.length; i < len; i++) {
            page = ref1[i];

            if (hotspot.locations[page.pageNumber] != null) {
              hotspots[id] = {
                type: hotspot.type,
                id: hotspot.id,
                locations: hotspot.locations
              };
              break;
            }
          }
        }

        _this3._hotspots.trigger('hotspotsReceived', {
          pageSpread: _this3._core.pageSpreads.get(hotspotRequest.id),
          versoPageSpread: versoPageSpread,
          ratio: _this3.options.hotspotRatio,
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
      if (this.popover != null) {
        this.popover.destroy();
      }
    }
  }, {
    key: "clicked",
    value: function clicked(e) {
      var _this4 = this;

      this.pickHotspot(e, function (hotspot) {
        _this4.trigger('hotspotClicked', hotspot);
      });
    }
  }, {
    key: "contextmenu",
    value: function contextmenu(e) {
      var _this5 = this;

      this.pickHotspot(e, function (hotspot) {
        _this5.trigger('hotspotContextmenu', hotspot);
      });
    }
  }, {
    key: "pressed",
    value: function pressed(e) {
      var _this6 = this;

      this.pickHotspot(e, function (hotspot) {
        _this6.trigger('hotspotPressed', hotspot);
      });
    }
  }]);

  return Viewer;
}();

MicroEvent$8.mixin(Viewer);
var viewer = Viewer;

var Bootstrapper, MicroEvent$9, SGN$f;
MicroEvent$9 = microevent;
SGN$f = core;

var bootstrapper = Bootstrapper =
/*#__PURE__*/
function () {
  function Bootstrapper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Bootstrapper);

    this.options = options;
    return;
  }

  _createClass(Bootstrapper, [{
    key: "createViewer",
    value: function createViewer(data) {
      return new SGN$f.PagedPublicationKit.Viewer(this.options.el, {
        id: this.options.id,
        ownedBy: data.details.dealer_id,
        color: '#' + data.details.branding.pageflip.color,
        hotspotRatio: data.details.dimensions.height,
        keyboard: true,
        pageId: this.options.pageId,
        eventTracker: this.options.eventTracker,
        pages: this.transformPages(data.pages)
      });
    }
  }, {
    key: "transformPages",
    value: function transformPages(pages) {
      return pages.map(function (page, i) {
        var pageNumber;
        pageNumber = i + 1;
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
      var obj;
      obj = {};
      hotspots.forEach(function (hotspot) {
        return obj[hotspot.id] = hotspot;
      });
      viewer.applyHotspots(obj);
    }
  }, {
    key: "fetch",
    value: function fetch(callback) {
      callback = callback.bind(this);
      SGN$f.util.async.parallel([this.fetchDetails.bind(this), this.fetchPages.bind(this)], function (result) {
        var data;
        data = {
          details: result[0][1],
          pages: result[1][1]
        };

        if (result[0][0] != null) {
          callback(result[0][0]);
        } else if (result[1][0] != null) {
          callback(result[1][0]);
        } else if (data.details != null && data.pages != null) {
          callback(null, data);
        } else {
          callback(new Error());
        }
      });
    }
  }, {
    key: "fetchDetails",
    value: function fetchDetails(callback) {
      SGN$f.CoreKit.request({
        url: "/v2/catalogs/".concat(this.options.id)
      }, callback);
    }
  }, {
    key: "fetchPages",
    value: function fetchPages(callback) {
      SGN$f.CoreKit.request({
        url: "/v2/catalogs/".concat(this.options.id, "/pages")
      }, callback);
    }
  }, {
    key: "fetchHotspots",
    value: function fetchHotspots(callback) {
      SGN$f.CoreKit.request({
        url: "/v2/catalogs/".concat(this.options.id, "/hotspots")
      }, callback);
    }
  }]);

  return Bootstrapper;
}();

var pagedPublication = {
  Viewer: viewer,
  Bootstrapper: bootstrapper
};
var pagedPublication_1 = pagedPublication.Viewer;
var pagedPublication_2 = pagedPublication.Bootstrapper;

var IncitoPublicationEventTracking, MicroEvent$a;
MicroEvent$a = microevent;

IncitoPublicationEventTracking =
/*#__PURE__*/
function () {
  function IncitoPublicationEventTracking(eventTracker, id, _ref) {
    var pagedPublicationId = _ref.pagedPublicationId;

    _classCallCheck(this, IncitoPublicationEventTracking);

    this.eventTracker = eventTracker;
    this.id = id;
    this.pagedPublicationId = pagedPublicationId;
    return;
  }

  _createClass(IncitoPublicationEventTracking, [{
    key: "trackOpened",
    value: function trackOpened(properties) {
      if (this.eventTracker == null) {
        return this;
      }

      this.eventTracker.trackIncitoPublicationOpened({
        'ip.id': this.id,
        'pp.vt': this.pagedPublicationId ? this.eventTracker.createViewToken(this.pagedPublicationId) : void 0,
        'vt': this.eventTracker.createViewToken(this.id)
      });
      return this;
    }
  }]);

  return IncitoPublicationEventTracking;
}();

MicroEvent$a.mixin(IncitoPublicationEventTracking);
var eventTracking$1 = IncitoPublicationEventTracking;

var EventTracking$1, Incito, MicroEvent$b, Viewer$1;
Incito = incitoBrowser;
MicroEvent$b = microevent;
EventTracking$1 = eventTracking$1;

Viewer$1 = function () {
  var Viewer =
  /*#__PURE__*/
  function () {
    function Viewer(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Viewer);

      this.el = el;
      this.options = options;
      this.incito = new Incito(this.el, {
        incito: this.options.incito,
        renderLaziness: this.options.renderLaziness
      });
      this._eventTracking = new EventTracking$1(this.options.eventTracker, this.options.id, {
        pagedPublicationId: this.options.pagedPublicationId
      });
      return;
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
  }();

  ;
  Viewer.Incito = Incito;
  return Viewer;
}.call(commonjsGlobal);

MicroEvent$b.mixin(Viewer$1);
var viewer$1 = Viewer$1;

var Controls$1;

var controls$1 = Controls$1 =
/*#__PURE__*/
function () {
  function Controls(viewer) {
    var _this = this;

    _classCallCheck(this, Controls);

    this.viewer = viewer;
    this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');
    this.scrollListener = this.scroll.bind(this);
    this.isScrolling = false;

    if (this.progressEl != null) {
      this.progressEl.textContent = "0 %";
      window.addEventListener('scroll', this.scrollListener, false);
      this.viewer.bind('destroyed', function () {
        window.removeEventListener('scroll', _this.scrollListener);
      });
    }

    return;
  }

  _createClass(Controls, [{
    key: "scroll",
    value: function scroll() {
      var _this2 = this;

      var progress, rect, winHeight;
      winHeight = window.innerHeight;
      rect = this.viewer.el.getBoundingClientRect();
      progress = Math.min(100, Math.round(Math.abs(rect.top - winHeight) / rect.height * 100));
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(function () {
        _this2.isScrolling = false;

        _this2.viewer.el.classList.remove('sgn-incito--scrolling');
      }, 1000);

      if (this.isScrolling === false) {
        this.viewer.el.classList.add('sgn-incito--scrolling');
        this.isScrolling = true;
      }

      this.progressEl.textContent = "".concat(progress, " %");
      this.viewer.trigger('progress', {
        progress: progress
      });
    }
  }]);

  return Controls;
}();

var incito = "query GetIncitoPublication($id: ID!, $deviceCategory: DeviceCategory!, $orientation: Orientation!, $pixelRatio: Float!, $pointer: Pointer!, $maxWidth: Int!, $versionsSupported: [String!]!, $locale: LocaleCode, $time: DateTime, $featureLabels: [IncitoFeatureLabelInput!]) {\n  node(id: $id) {\n    ... on IncitoPublication {\n      id\n      incito(deviceCategory: $deviceCategory, orientation: $orientation, pixelRatio: $pixelRatio, pointer: $pointer, maxWidth: $maxWidth, versionsSupported: $versionsSupported, locale: $locale, time: $time, featureLabels: $featureLabels)\n    }\n  }\n}";

var incito$1 = /*#__PURE__*/Object.freeze({
    default: incito
});

var require$$4 = getCjsExportFromNamespace(incito$1);

var Bootstrapper$1, Controls$2, SGN$g, clientLocalStorage$2, schema, util$2;
util$2 = util_1;
SGN$g = core;
Controls$2 = controls$1;
clientLocalStorage$2 = clientLocal;
schema = require$$4;

var bootstrapper$1 = Bootstrapper$1 =
/*#__PURE__*/
function () {
  function Bootstrapper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Bootstrapper);

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
    this.storageKey = "incito-".concat(this.options.id);
    return;
  }

  _createClass(Bootstrapper, [{
    key: "getDeviceCategory",
    value: function getDeviceCategory() {
      return util$2.getDeviceCategory();
    }
  }, {
    key: "getPixelRatio",
    value: function getPixelRatio() {
      return window.devicePixelRatio || 1;
    }
  }, {
    key: "getPointer",
    value: function getPointer() {
      return util$2.getPointer();
    }
  }, {
    key: "getOrientation",
    value: function getOrientation() {
      var orientation;
      orientation = util$2.getOrientation(screen.width, screen.height);

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
      var i, len, locale, localeChain, prefLocale;
      localeChain = [];
      locale = null;

      if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
        localeChain = localeChain.concat(navigator.languages);
      } else if (typeof navigator.language === 'string' && navigator.language.length > 0) {
        localeChain.push(navigator.language);
      } else if (typeof navigator.browserLanguage === 'string' && navigator.browserLanguage.length > 0) {
        localeChain.push(navigator.browserLanguage);
      }

      localeChain.push('en_US');

      for (i = 0, len = localeChain.length; i < len; i++) {
        prefLocale = localeChain[i];

        if (prefLocale == null) {
          continue;
        }

        prefLocale = prefLocale.replace('-', '_');

        if (/[a-z][a-z]_[A-Z][A-Z]/g.test(prefLocale)) {
          locale = prefLocale;
          break;
        }
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
      var featureLabels;
      featureLabels = clientLocalStorage$2.get('incito-feature-labels');

      if (Array.isArray(featureLabels) === false) {
        featureLabels = [];
      }

      return featureLabels;
    }
  }, {
    key: "anonymizeFeatureLabels",
    value: function anonymizeFeatureLabels() {
      var count, vector;
      count = this.featureLabels.length;
      vector = this.featureLabels.reduce(function (acc, cur) {
        if (!acc[cur]) {
          acc[cur] = {
            key: cur,
            value: 0
          };
        }

        acc[cur].value++;
        return acc;
      }, {});
      return Object.values(vector).map(function (featureLabel) {
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

      var data;
      callback = callback.bind(this);
      data = SGN$g.storage.session.get(this.storageKey);

      if (data != null && data.response != null && data.width === this.maxWidth) {
        return callback(null, data.response);
      }

      SGN$g.GraphKit.request({
        query: schema,
        operationName: 'GetIncitoPublication',
        variables: {
          id: this.options.id,
          deviceCategory: 'DEVICE_CATEGORY_' + this.deviceCategory.toUpperCase(),
          pixelRatio: this.pixelRatio,
          pointer: 'POINTER_' + this.pointer.toUpperCase(),
          orientation: 'ORIENTATION_' + this.orientation.toUpperCase(),
          time: this.time,
          locale: this.locale,
          maxWidth: this.maxWidth,
          versionsSupported: this.versionsSupported,
          featureLabels: this.anonymizeFeatureLabels(this.featureLabels)
        }
      }, function (err, res) {
        if (err != null) {
          callback(err);
        } else if (res.errors && res.errors.length > 0) {
          callback(util$2.error(new Error(), 'graph request contained errors'));
        } else {
          callback(null, res);
          SGN$g.storage.session.set(_this.storageKey, {
            width: _this.maxWidth,
            response: res
          });
        }
      });
    }
  }, {
    key: "createViewer",
    value: function createViewer(data) {
      var controls, self, viewer;

      if (data.incito == null) {
        throw util$2.error(new Error(), 'you need to supply valid Incito to create a viewer');
      }

      viewer = new SGN$g.IncitoPublicationKit.Viewer(this.options.el, {
        id: this.options.id,
        pagedPublicationId: this.options.pagedPublicationId,
        incito: data.incito,
        eventTracker: this.options.eventTracker
      });
      controls = new Controls$2(viewer);
      self = this; // Persist clicks on feature labels for later anonymization.

      SGN$g.CoreUIKit.on(viewer.el, 'click', '.incito__view[data-feature-labels]', function () {
        var featureLabels;
        featureLabels = this.getAttribute('data-feature-labels').split(',');
        self.featureLabels = self.featureLabels.concat(featureLabels);

        while (self.featureLabels.length > 1000) {
          self.featureLabels.shift();
        }

        clientLocalStorage$2.set('incito-feature-labels', self.featureLabels);
      });
      return viewer;
    }
  }]);

  return Bootstrapper;
}();

var incitoPublication = {
  Viewer: viewer$1,
  Bootstrapper: bootstrapper$1
};
var incitoPublication_1 = incitoPublication.Viewer;
var incitoPublication_2 = incitoPublication.Bootstrapper;

var gator = createCommonjsModule(function (module) {
  /**
   * Copyright 2014 Craig Campbell
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * GATOR.JS
   * Simple Event Delegation
   *
   * @version 1.2.4
   *
   * Compatible with IE 9+, FF 3.6+, Safari 5+, Chrome
   *
   * Include legacy.js for compatibility with older browsers
   *
   *             .-._   _ _ _ _ _ _ _ _
   *  .-''-.__.-'00  '-' ' ' ' ' ' ' ' '-.
   * '.___ '    .   .--_'-' '-' '-' _'-' '._
   *  V: V 'vv-'   '_   '.       .'  _..' '.'.
   *    '=.____.=_.--'   :_.__.__:_   '.   : :
   *            (((____.-'        '-.  /   : :
   *                              (((-'\ .' /
   *                            _____..'  .'
   *                           '-._____.-'
   */
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
        _handlers[gator.id][event][selector].splice(i, 1);

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

  if ('object' !== "undefined" && module.exports) {
    module.exports = Gator;
  }

  if (typeof window !== "undefined" && window.exports) {
    window.Gator = Gator;
  }
});

var OfferDetails;

var offerDetails = OfferDetails =
/*#__PURE__*/
function () {
  function OfferDetails() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OfferDetails);

    this.options = options;
    this.el = document.createElement('div');
    this.el.className = 'sgn-offer-details';
    this.el.setAttribute('tabindex', -1);
    this.el.appendChild(this.options.contentEl);
    this.resizeListener = this.resize.bind(this);
    this.position();
    return;
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
      window.addEventListener('resize', this.resizeListener, false);
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('resize', this.resizeListener);
      this.el.parentNode.removeChild(this.el);
    }
  }, {
    key: "position",
    value: function position() {
      var left, rect, top, width;
      rect = this.options.anchorEl.getBoundingClientRect();
      top = window.pageYOffset + rect.top + this.options.anchorEl.offsetHeight;
      left = window.pageXOffset + rect.left;
      width = this.options.anchorEl.offsetWidth;
      this.el.style.top = top + 'px';
      this.el.style.left = left + 'px';
      this.el.style.width = width + 'px';
    }
  }, {
    key: "resize",
    value: function resize() {
      this.position();
    }
  }]);

  return OfferDetails;
}();

var Gator, MicroEvent$c, Mustache$2, Popover, keyCodes$2, template;
MicroEvent$c = microevent;
Gator = gator;
Mustache$2 = mustache;
keyCodes$2 = keyCodes;
template = "<div class=\"sgn-popover__background\" data-close></div>\n<div class=\"sgn-popover__menu\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#singleChoiceItems}}\n                <li data-index=\"{{index}}\">\n                    <p class=\"sgn-popover-item__title\">{{item.title}}</p>\n                    {{#item.subtitle}}\n                        <p class=\"sgn-popover-item__subtitle\">{{item.subtitle}}</p>\n                    {{/item.subtitle}}\n                </li>\n            {{/singleChoiceItems}}\n        </ul>\n    </div>\n</div>";

Popover =
/*#__PURE__*/
function () {
  function Popover() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Popover);

    this.options = options;
    this.el = document.createElement('div');
    this.backgroundEl = document.createElement('div');
    this.resizeListener = this.resize.bind(this);
    this.scrollListener = this.scroll.bind(this);
    return;
  }

  _createClass(Popover, [{
    key: "render",
    value: function render() {
      var header, ref, ref1, trigger, view, width;
      width = (ref = this.options.width) != null ? ref : 100;
      header = this.options.header;

      if (this.options.template != null) {
        template = this.options.template;
      }

      trigger = this.trigger.bind(this);
      view = {
        header: header,
        singleChoiceItems: (ref1 = this.options.singleChoiceItems) != null ? ref1.map(function (item, i) {
          return {
            item: item,
            index: i
          };
        }) : void 0
      };
      this.el.className = 'sgn-popover';
      this.el.setAttribute('tabindex', -1);
      this.el.innerHTML = Mustache$2.render(template, view);
      this.position();
      this.addEventListeners();
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      Gator(this.el).off();
      window.removeEventListener('resize', this.resizeListener);
      window.removeEventListener('scroll', this.scrollListener);

      if (this.el.parentNode != null) {
        this.el.parentNode.removeChild(this.el);
        this.trigger('destroyed');
      }
    }
  }, {
    key: "position",
    value: function position() {
      var boundingRect, height, left, menuEl, parentHeight, parentWidth, top, width;
      top = this.options.y;
      left = this.options.x;
      menuEl = this.el.querySelector('.sgn-popover__menu');
      width = menuEl.offsetWidth;
      height = menuEl.offsetHeight;
      parentWidth = this.el.parentNode.offsetWidth;
      parentHeight = this.el.parentNode.offsetHeight;
      boundingRect = this.el.parentNode.getBoundingClientRect();
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
      var _this = this;

      var trigger;
      trigger = this.trigger.bind(this);
      this.el.addEventListener('keyup', this.keyUp.bind(this));
      Gator(this.el).on('click', '[data-index]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        trigger('selected', {
          index: +this.getAttribute('data-index')
        });
      });
      Gator(this.el).on('click', '[data-close]', function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this.destroy();
      });
      Gator(this.el).on('click', '.sgn-popover__menu', function (e) {
        e.stopPropagation();
      });
      window.addEventListener('resize', this.resizeListener, false);
      window.addEventListener('scroll', this.scrollListener, false);
    }
  }, {
    key: "keyUp",
    value: function keyUp(e) {
      if (e.keyCode === keyCodes$2.ESC) {
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
}();

MicroEvent$c.mixin(Popover);
var popover = Popover;

var Popover$1;
Popover$1 = popover;

var singleChoicePopover = function singleChoicePopover(ctx, callback) {
  var items, popover;
  items = ctx.items;
  popover = null;

  if (items.length === 1) {
    callback(items[0]);
  } else if (items.length > 1) {
    popover = new Popover$1({
      header: ctx.header,
      x: ctx.x,
      y: ctx.y,
      singleChoiceItems: items
    });
    popover.bind('selected', function (e) {
      callback(items[e.index]);
      popover.destroy();
    });
    popover.bind('destroyed', function () {
      ctx.el.focus();
    });
    ctx.el.appendChild(popover.el);
    popover.render().el.focus();
  }

  return {
    destroy: function destroy() {
      if (popover != null) {
        popover.destroy();
      }
    }
  };
};

var Gator$1;
Gator$1 = gator;
var coreUi = {
  OfferDetails: offerDetails,
  Popover: popover,
  singleChoicePopover: singleChoicePopover,
  on: function on(el, events, selector, callback) {
    return Gator$1(el).on(events, selector, callback);
  },
  off: function off(el, events, selector, callback) {
    return Gator$1(el).off(events, selector, callback);
  }
};
var coreUi_1 = coreUi.OfferDetails;
var coreUi_2 = coreUi.Popover;
var coreUi_3 = coreUi.singleChoicePopover;
var coreUi_4 = coreUi.on;
var coreUi_5 = coreUi.off;

var SGN$h, appKey, config$2, isBrowser, scriptEl, session$2, trackId;
isBrowser = util_1.isBrowser;
SGN$h = core; // Expose storage backends.

SGN$h.storage = {
  local: clientLocal,
  session: clientSession,
  cookie: clientCookie
}; // Expose the different kits.

SGN$h.AssetsKit = assets;
SGN$h.EventsKit = events;
SGN$h.GraphKit = graph;
SGN$h.CoreKit = core$1;
SGN$h.PagedPublicationKit = pagedPublication;
SGN$h.IncitoPublicationKit = incitoPublication;
SGN$h.CoreUIKit = coreUi; // Set the core session from the cookie store if possible.

session$2 = SGN$h.storage.cookie.get('session');

if (typeof session$2 === 'object') {
  SGN$h.config.set({
    coreSessionToken: session$2.token,
    coreSessionClientId: session$2.client_id
  });
}

SGN$h.client = function () {
  var id;
  id = SGN$h.storage.local.get('client-id');

  if (id != null ? id.data : void 0) {
    id = id.data;
  }

  if (id == null) {
    id = SGN$h.util.uuid();
    SGN$h.storage.local.set('client-id', id);
  }

  return {
    id: id
  };
}(); // Listen for changes in the config.


SGN$h.config.bind('change', function (changedAttributes) {
  var eventTracker;
  eventTracker = changedAttributes.eventTracker;

  if (eventTracker != null) {
    eventTracker.trackClientSessionOpened();
  }
});

if (isBrowser()) {
  // Autoconfigure the SDK.
  scriptEl = document.getElementById('sgn-sdk');

  if (scriptEl != null) {
    appKey = scriptEl.getAttribute('data-app-key');
    trackId = scriptEl.getAttribute('data-track-id');
    config$2 = {};

    if (appKey != null) {
      config$2.appKey = appKey;
    }

    if (trackId != null) {
      config$2.eventTracker = new SGN$h.EventsKit.Tracker({
        trackId: trackId
      });
    }

    SGN$h.config.set(config$2);
  }
}

var coffeescript = SGN$h;

module.exports = coffeescript;
//# sourceMappingURL=sgn-sdk.cjs.js.map
