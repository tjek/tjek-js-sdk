import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _bindInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/bind';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import _keysInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/keys';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import MicroEvent from 'microevent';
import Mustache from 'mustache';
import 'core-js/modules/es.function.name.js';
import 'core-js/modules/es.regexp.constructor.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.string.replace.js';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _parseInt from '@babel/runtime-corejs3/core-js-stable/parse-int';
import _lastIndexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/last-index-of';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import 'core-js/modules/es.array.join.js';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import fetch from 'cross-fetch';
import sha256 from 'sha256';
import 'core-js/modules/es.string.split.js';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import 'core-js/modules/es.string.match.js';
import _setInterval from '@babel/runtime-corejs3/core-js-stable/set-interval';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import md5 from 'md5';
import Incito from 'incito-browser';
import _getIterator from '@babel/runtime-corejs3/core-js/get-iterator';
import _getIteratorMethod from '@babel/runtime-corejs3/core-js/get-iterator-method';
import _Symbol from '@babel/runtime-corejs3/core-js-stable/symbol';
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from';
import _Object$values from '@babel/runtime-corejs3/core-js-stable/object/values';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import Verso from 'verso-browser';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import 'core-js/modules/es.promise.js';
import 'core-js/modules/es.string.iterator.js';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import 'regenerator-runtime/runtime.js';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';

var Config = /*#__PURE__*/function () {
  function Config() {
    _classCallCheck(this, Config);

    _defineProperty(this, "attrs", {});
  }

  _createClass(Config, [{
    key: "set",
    value: function set() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var changedAttributes = {};

      for (var key in config) {
        var _context;

        var value = config[key];

        if (_includesInstanceProperty(_context = _keysInstanceProperty(this)).call(_context, key)) {
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

Config.prototype.keys = ['appVersion', 'appKey', 'appSecret', 'authToken', 'eventTracker', 'locale', 'coreSessionToken', 'coreSessionClientId', 'coreUrl', 'eventsTrackUrl'];
MicroEvent.mixin(Config);

var locale = 'en_US';
var coreUrl = 'https://squid-api.tjek.com';
var eventsTrackUrl = 'https://wolf-api.tjek.com/sync';

var configDefaults = /*#__PURE__*/Object.freeze({
    __proto__: null,
    locale: locale,
    coreUrl: coreUrl,
    eventsTrackUrl: eventsTrackUrl
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
} // Method for wrapping a function that takes a callback in any position
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
    promiseCallbackInterop: promiseCallbackInterop
});

var config = new Config(); // Set default values.

config.set(configDefaults);

var Core = /*#__PURE__*/Object.freeze({
    __proto__: null,
    translations: translations,
    util: util,
    config: config
});

var prefixKey = 'sgn-';
function get(key) {
  var value;

  if (isNode()) {
    return;
  }

  try {
    var _context;

    var name = _concatInstanceProperty(_context = "".concat(prefixKey)).call(_context, key, "=");

    var ca = document.cookie.split(';');

    _forEachInstanceProperty(ca).call(ca, function (c) {
      var ct = _trimInstanceProperty(c).call(c);

      if (_indexOfInstanceProperty(ct).call(ct, name) === 0) {
        value = ct.substring(name.length, ct.length);
      }
    });

    value = JSON.parse(value);
  } catch (err) {
    value = {};
  }

  return value;
}
function set(key, value) {
  if (isNode()) {
    return;
  }

  try {
    var _context2, _context3, _context4;

    var days = 365;
    var date = new Date();

    var str = _JSON$stringify(value);

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = _concatInstanceProperty(_context2 = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = "".concat(prefixKey)).call(_context4, key, "=")).call(_context3, str, ";expires=")).call(_context2, date.toUTCString(), ";path=/");
  } catch (err) {}
}

var clientCookie = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    set: set
});

var callbackQueue = [];
var renewed = false;
var ttl = 1 * 60 * 60 * 24 * 60;
function saveToken(token) {
  if (!token) {
    throw new Error('No token provided for saving');
  }

  config.set({
    coreSessionToken: token
  });
  saveCookie();
}
function saveClientId(clientId) {
  config.set({
    coreSessionClientId: clientId
  });
  saveCookie();
}
function saveCookie() {
  set('session', {
    token: config.get('coreSessionToken'),
    client_id: config.get('coreSessionClientId')
  });
}
function create(callback) {
  var _context;

  var key = config.get('appKey');
  var req = fetch(config.get('coreUrl') + _concatInstanceProperty(_context = "/v2/sessions?api_key=".concat(key, "&token_ttl=")).call(_context, ttl), {
    method: 'post'
  });
  req.then(function (response) {
    return response.json().then(function (json) {
      if (response.status === 201) {
        saveToken(json.token);
        saveClientId(json.client_id);
        callback(null, json);
      } else {
        callback(new Error('Could not create session'));
      }
    });
  }).catch(function (err) {
    callback(err);
  });
}
function update$1(callback) {
  var headers = {};
  var token = config.get('coreSessionToken');
  var appSecret = config.get('appSecret');
  headers['X-Token'] = token;

  if (appSecret != null) {
    headers['X-Signature'] = sign(appSecret, token);
  }

  var req = fetch(config.get('coreUrl') + '/v2/sessions', {
    method: 'put',
    headers: headers
  });
  req.then(function (response) {
    return response.json().then(function (json) {
      if (response.status === 200) {
        saveToken(json.token);
        saveClientId(json.client_id);
        callback(null, json);
      } else {
        callback(new Error('Could not update session'));
      }
    });
  }).catch(function (err) {
    callback(err);
  });
}
function renew(callback) {
  var headers = {};
  var token = config.get('coreSessionToken');
  var appSecret = config.get('appSecret');
  headers['X-Token'] = token;

  if (appSecret) {
    headers['X-Signature'] = sign(appSecret, token);
  }

  var req = fetch(config.get('coreUrl') + '/v2/sessions', {
    method: 'put',
    headers: headers
  });
  req.then(function (response) {
    return response.json().then(function (json) {
      if (response.status === 200) {
        saveToken(json.token);
        saveClientId(json.client_id);
        callback(null, json);
      } else {
        callback(new Error('Could not renew session'));
      }
    });
  }).catch(function (err) {
    callback(err);
  });
}
function ensure(callback) {
  var queueCount = callbackQueue.length;

  var complete = function complete(err) {
    callbackQueue = _filterInstanceProperty(callbackQueue).call(callbackQueue, function (fn) {
      fn(err);
      return false;
    });
  };

  callbackQueue.push(callback);

  if (queueCount === 0) {
    if (config.get('coreSessionToken') == null) {
      create(complete);
    } else if (renewed === false) {
      renewed = true;
      renew(function (err) {
        if (err != null) {
          create(complete);
        } else {
          complete();
        }
      });
    } else {
      complete();
    }
  }
}
function sign(appSecret, token) {
  return sha256([appSecret, token].join(''));
}

var session = /*#__PURE__*/Object.freeze({
    __proto__: null,
    saveToken: saveToken,
    saveClientId: saveClientId,
    saveCookie: saveCookie,
    create: create,
    update: update$1,
    renew: renew,
    ensure: ensure,
    sign: sign
});

function request() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var secondTime = arguments.length > 2 ? arguments[2] : undefined;
  ensure(function (err) {
    var _options$url, _options$headers, _options$qs;

    if (err != null) {
      return callback(err);
    }

    var url = config.get('coreUrl') + ((_options$url = options.url) !== null && _options$url !== void 0 ? _options$url : '');
    var headers = (_options$headers = options.headers) !== null && _options$headers !== void 0 ? _options$headers : {};
    var json = typeof options.json === 'boolean' ? options.json : true;
    var token = config.get('coreSessionToken');
    var appKey = config.get('appKey');
    var appVersion = config.get('appVersion');
    var appSecret = config.get('appSecret');
    var locale = config.get('locale');
    var qs = (_options$qs = options.qs) !== null && _options$qs !== void 0 ? _options$qs : {};
    var geo = options.geolocation;
    var body = options.body;
    headers['X-Api-Key'] = appKey;
    headers['X-Token'] = token;

    if (appSecret != null) {
      headers['X-Signature'] = sign(appSecret, token);
    }

    if (json) {
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';

      if (body) {
        body = _JSON$stringify(body);
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

    if (_Object$keys(qs).length) {
      var _context;

      var params = _mapInstanceProperty(_context = _Object$keys(qs)).call(_context, function (k) {
        var _context4;

        if (_Array$isArray(k)) {
          var _context2;

          return _mapInstanceProperty(_context2 = qs[k]).call(_context2, function (val) {
            var _context3;

            return _concatInstanceProperty(_context3 = "".concat(encodeURIComponent(k), "[]=")).call(_context3, encodeURIComponent(val));
          }).join('&');
        }

        return _concatInstanceProperty(_context4 = "".concat(encodeURIComponent(k), "=")).call(_context4, encodeURIComponent(qs[k]));
      }).join('&');

      url += '?' + params;
    }

    var req = fetch(url, {
      method: options.method,
      body: body,
      headers: headers
    });
    return req.then(function (response) {
      return response.json().then(function (json) {
        token = config.get('coreSessionToken');
        var responseToken = response.headers.get('x-token');

        if (responseToken && token !== responseToken) {
          saveToken(responseToken);
        }

        if (response.status >= 200 && response.status < 300 || response.status === 304) {
          callback(null, json);
        } else {
          var _context5;

          if (secondTime !== true && _includesInstanceProperty(_context5 = [1101, 1107, 1108]).call(_context5, json === null || json === void 0 ? void 0 : json.code)) {
            config.set({
              coreSessionToken: undefined
            });
            request(options, callback, true);
          } else {
            callback(error(new Error('Core API error'), {
              code: 'CoreAPIError',
              statusCode: response.status
            }), json);
          }
        }
      });
    }).catch(callback);
  });
}

var request$1 = promiseCallbackInterop(request, 1);

var CoreKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    session: session,
    request: request$1
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

function commonjsRequire (target) {
	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
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

  if ('object' !== "undefined" && module.exports) {
    module.exports = Gator;
  }

  if (typeof window !== "undefined" && window.exports) {
    window.Gator = Gator;
  }
});

var offerDetails = /*#__PURE__*/function () {
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

var defaultTemplate = "<div class=\"sgn-popover__background\" data-close></div>\n<div class=\"sgn-popover__menu\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#singleChoiceItems}}\n                <li data-index=\"{{index}}\">\n                    <p class=\"sgn-popover-item__title\">{{item.title}}</p>\n                    {{#item.subtitle}}\n                        <p class=\"sgn-popover-item__subtitle\">{{item.subtitle}}</p>\n                    {{/item.subtitle}}\n                </li>\n            {{/singleChoiceItems}}\n        </ul>\n    </div>\n</div>";

var Popover = /*#__PURE__*/function () {
  function Popover() {
    var _context, _context2, _context3;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Popover);

    this.keyUp = _bindInstanceProperty(_context = this.keyUp).call(_context, this);
    this.resize = _bindInstanceProperty(_context2 = this.resize).call(_context2, this);
    this.scroll = _bindInstanceProperty(_context3 = this.scroll).call(_context3, this);
    this.options = options;
    this.el = document.createElement('div');
    this.backgroundEl = document.createElement('div');
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
          _this = this;

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

        _this.destroy();
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
}();

MicroEvent.mixin(Popover);

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
    OfferDetails: offerDetails,
    Popover: Popover,
    singleChoicePopover: singleChoicePopover
});

var prefixKey$1 = 'sgn-';

var storage = function () {
  try {
    var _storage = window.localStorage;
    _storage["".concat(prefixKey$1, "test-storage")] = 'foobar';
    delete _storage["".concat(prefixKey$1, "test-storage")];
    return _storage;
  } catch (error) {
    return {};
  }
}();

function get$1(key) {
  try {
    var _context;

    return JSON.parse(storage[_concatInstanceProperty(_context = "".concat(prefixKey$1)).call(_context, key)]);
  } catch (error) {}
}
function set$1(key, value) {
  try {
    var _context2;

    storage[_concatInstanceProperty(_context2 = "".concat(prefixKey$1)).call(_context2, key)] = _JSON$stringify(value);
  } catch (error) {}
}

var clientLocal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get$1,
    set: set$1
});

var createTrackerClient = function createTrackerClient() {
  var _id;

  var id = get$1('client-id');

  if ((_id = id) !== null && _id !== void 0 && _id.data) {
    id = id.data;
  }

  if (id == null) {
    id = uuid();
    set$1('client-id', id);
  }

  return {
    id: id
  };
};

function getPool() {
  var data = get$1('event-tracker-pool');

  if (_Array$isArray(data) === false) {
    data = [];
  }

  data = _filterInstanceProperty(data).call(data, function (evt) {
    return typeof evt._i === 'string';
  });
  return data;
}

var pool = getPool();

var Tracker = /*#__PURE__*/function () {
  function Tracker() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tracker);

    for (var key in this.defaultOptions) {
      var value = this.defaultOptions[key];
      this[key] = options[key] || value;
    }

    this.client = (options === null || options === void 0 ? void 0 : options.client) || createTrackerClient();
    this.eventsTrackUrl = (options === null || options === void 0 ? void 0 : options.eventsTrackUrl) || eventsTrackUrl;
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
    value: function setLocation() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

      var str = _concatInstanceProperty(_context = [this.client.id]).call(_context, parts).join('');

      var viewToken = btoa(String.fromCharCode.apply(null, _sliceInstanceProperty(_context2 = md5(str, {
        asBytes: true
      })).call(_context2, 0, 8)));
      return viewToken;
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

function ship() {
  var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var eventsTrackUrl = arguments.length > 1 ? arguments[1] : undefined;
  return fetch(eventsTrackUrl, {
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
  });
}

var dispatchRetryInterval = null;

function _dispatch(eventsTrackUrl) {
  if (dispatching === true || pool.length === 0) {
    return;
  }

  var events = _sliceInstanceProperty(pool).call(pool, 0, dispatchLimit);

  var nacks = 0;
  dispatching = true;
  ship(events, eventsTrackUrl).then(function (response) {
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
}

var dispatch = throttle(_dispatch, 4000);
set$1('event-tracker-pool', []);

try {
  window.addEventListener('beforeunload', function () {
    pool = _concatInstanceProperty(pool).call(pool, getPool());
    set$1('event-tracker-pool', pool);
  }, false);
} catch (error) {}

var EventsKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Tracker: Tracker
});

var IncitoPublicationEventTracking = /*#__PURE__*/function () {
  function IncitoPublicationEventTracking(eventTracker, details) {
    _classCallCheck(this, IncitoPublicationEventTracking);

    this.eventTracker = eventTracker;
    this.details = details;
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
}();

MicroEvent.mixin(IncitoPublicationEventTracking);

var Viewer = /*#__PURE__*/function () {
  function Viewer(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    this.el = el;
    this.options = options;
    this.incito = new Incito(this.el, {
      incito: this.options.incito,
      renderLaziness: this.options.renderLaziness
    });
    this._eventTracking = new IncitoPublicationEventTracking(this.options.eventTracker, this.options.details);
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

Viewer.Incito = Incito;
MicroEvent.mixin(Viewer);

var controls = /*#__PURE__*/function () {
  function Controls(viewer) {
    var _context,
        _this = this;

    _classCallCheck(this, Controls);

    this.scroll = _bindInstanceProperty(_context = this.scroll).call(_context, this);
    this.viewer = viewer;
    this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');
    this.isScrolling = false;

    if (this.progressEl) {
      var _context2;

      this.progressEl.textContent = '0 %';
      window.addEventListener('scroll', this.scroll, false);

      _bindInstanceProperty(_context2 = this.viewer).call(_context2, 'destroyed', function () {
        window.removeEventListener('scroll', _this.scroll, false);
      });
    }
  }

  _createClass(Controls, [{
    key: "scroll",
    value: function scroll() {
      var _this2 = this;

      var winHeight = window.innerHeight;
      var rect = this.viewer.el.getBoundingClientRect();
      var progress = Math.min(100, Math.round(Math.abs(rect.top - winHeight) / rect.height * 100));
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = _setTimeout(function () {
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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context5; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context5 = Object.prototype.toString.call(o)).call(_context5, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Bootstrapper = /*#__PURE__*/function () {
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

      var _iterator = _createForOfIteratorHelper(localeChain),
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
      var featureLabels = get$1('incito-feature-labels');

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
        url: "/v2/catalogs/".concat(this.options.id)
      }, callback);
    }
  }, {
    key: "fetchIncito",
    value: function fetchIncito(id, callback) {
      var res = fetch(config.get('coreUrl') + '/v4/rpc/generate_incito_from_publication', {
        method: 'post',
        headers: {
          'X-Api-Key': config.get('appKey'),
          'Content-Type': 'application/json',
          Accept: 'application/json'
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
      });
      res.then(function (response) {
        return response.json();
      }).then(function (incito) {
        return callback(null, incito);
      }).catch(function (err) {
        return callback(err);
      });
    }
  }, {
    key: "createViewer",
    value: function createViewer(data) {
      if (data.incito == null) {
        throw error(new Error(), 'You need to supply valid Incito to create a viewer');
      }

      var viewer = new Viewer(this.options.el, {
        id: this.options.id,
        details: data.details,
        incito: data.incito,
        eventTracker: this.options.eventTracker
      }); // Awfully this Controls instance is destroyed implicitly
      // via the `destroyed` event of Viewer.

      new controls(viewer);
      var self = this; // Persist clicks on feature labels for later anonymization.

      gator(viewer.el).on('click', '.incito__view[data-feature-labels]', function () {
        var _context4;

        var featureLabels = this.getAttribute('data-feature-labels').split(',');
        self.featureLabels = _concatInstanceProperty(_context4 = self.featureLabels).call(_context4, featureLabels);

        while (self.featureLabels.length > 1000) {
          self.featureLabels.shift();
        }

        set$1('incito-feature-labels', self.featureLabels);
      });
      return viewer;
    }
  }]);

  return Bootstrapper;
}();

var IncitoPublicationKit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Viewer: Viewer,
    Bootstrapper: Bootstrapper
});

var PagedPublicationControls = /*#__PURE__*/function () {
  function PagedPublicationControls(el) {
    var _context, _context2, _context3, _context4, _context5, _context6, _this$els$prevControl, _this$els$nextControl, _this$els$close, _context7, _context8;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PagedPublicationControls);

    this.destroy = _bindInstanceProperty(_context = this.destroy).call(_context, this);
    this.beforeNavigation = _bindInstanceProperty(_context2 = this.beforeNavigation).call(_context2, this);
    this.prevClicked = _bindInstanceProperty(_context3 = this.prevClicked).call(_context3, this);
    this.nextClicked = _bindInstanceProperty(_context4 = this.nextClicked).call(_context4, this);
    this.closeClicked = _bindInstanceProperty(_context5 = this.closeClicked).call(_context5, this);
    this.keyDown = _bindInstanceProperty(_context6 = this.keyDown).call(_context6, this);
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
    this.keyDownHandler = throttle(this.keyDown, 150, this);

    if (this.options.keyboard === true) {
      this.els.root.addEventListener('keydown', this.keyDownHandler, false);
    }

    (_this$els$prevControl = this.els.prevControl) === null || _this$els$prevControl === void 0 ? void 0 : _this$els$prevControl.addEventListener('mousedown', this.prevClicked, false);
    (_this$els$nextControl = this.els.nextControl) === null || _this$els$nextControl === void 0 ? void 0 : _this$els$nextControl.addEventListener('mousedown', this.nextClicked, false);
    (_this$els$close = this.els.close) === null || _this$els$close === void 0 ? void 0 : _this$els$close.addEventListener('mousedown', this.closeClicked, false);

    _bindInstanceProperty(_context7 = this).call(_context7, 'beforeNavigation', this.beforeNavigation);

    _bindInstanceProperty(_context8 = this).call(_context8, 'destroyed', this.destroy);
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
}();

MicroEvent.mixin(PagedPublicationControls);

var PagedPublicationPageSpread = /*#__PURE__*/function () {
  function PagedPublicationPageSpread() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PagedPublicationPageSpread);

    this.options = options;
    this.contentsRendered = false;
    this.hotspotsRendered = false;
    this.el = this.renderEl();
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
      var _this = this;

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
    value: function clearContents() {
      this.el.innerHTML = '';
      this.contentsRendered = false;
      return this;
    }
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      var _this2 = this;

      var pageEls = _sliceInstanceProperty([]).call(this.el.querySelectorAll('.sgn-pp__page'));

      var pages = this.getPages();

      _forEachInstanceProperty(pageEls).call(pageEls, function (pageEl) {
        var id = pageEl.getAttribute('data-id');

        var page = _findInstanceProperty(pages).call(pages, function (page) {
          return page.id === id;
        });

        var image = page.images.large;
        loadImage(image, function (err) {
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
      var pageEls = _Array$from(this.el.querySelectorAll('.sgn-pp__page[data-image]'));

      _forEachInstanceProperty(pageEls).call(pageEls, function (pageEl) {
        pageEl.style.backgroundImage = pageEl.getAttribute('data-image');
        pageEl.removeAttribute('data-image');
      });
    }
  }]);

  return PagedPublicationPageSpread;
}();

MicroEvent.mixin(PagedPublicationPageSpread);

var PagedPublicationPageSpreads = /*#__PURE__*/function () {
  function PagedPublicationPageSpreads(options) {
    _classCallCheck(this, PagedPublicationPageSpreads);

    this.options = options;
    this.collection = [];
    this.ids = {};
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
          _this = this;

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
          return _this.trigger('pageLoaded', e);
        });

        _bindInstanceProperty(pageSpread).call(pageSpread, 'pagesLoaded', function (e) {
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

MicroEvent.mixin(PagedPublicationPageSpreads);

var PagedPublicationCore = /*#__PURE__*/function () {
  function PagedPublicationCore(el) {
    var _context, _context2, _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _context15, _context16, _context17, _context18, _context19, _context20, _context21;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PagedPublicationCore);

    this.beforeNavigation = _bindInstanceProperty(_context = this.beforeNavigation).call(_context, this);
    this.afterNavigation = _bindInstanceProperty(_context2 = this.afterNavigation).call(_context2, this);
    this.attemptedNavigation = _bindInstanceProperty(_context3 = this.attemptedNavigation).call(_context3, this);
    this.clicked = _bindInstanceProperty(_context4 = this.clicked).call(_context4, this);
    this.doubleClicked = _bindInstanceProperty(_context5 = this.doubleClicked).call(_context5, this);
    this.pressed = _bindInstanceProperty(_context6 = this.pressed).call(_context6, this);
    this.contextmenu = _bindInstanceProperty(_context7 = this.contextmenu).call(_context7, this);
    this.panStart = _bindInstanceProperty(_context8 = this.panStart).call(_context8, this);
    this.panEnd = _bindInstanceProperty(_context9 = this.panEnd).call(_context9, this);
    this.zoomedIn = _bindInstanceProperty(_context10 = this.zoomedIn).call(_context10, this);
    this.zoomedOut = _bindInstanceProperty(_context11 = this.zoomedOut).call(_context11, this);
    this.resize = _bindInstanceProperty(_context12 = this.resize).call(_context12, this);
    this.unload = _bindInstanceProperty(_context13 = this.unload).call(_context13, this);
    this.options = this.makeOptions(options, this.defaults);
    this.pageId = this.getOption('pageId');
    this.els = {
      root: el,
      pages: el.querySelector('.sgn-pp__pages'),
      verso: el.querySelector('.verso')
    };
    this.pageMode = this.getPageMode();
    this.pageSpreads = new PagedPublicationPageSpreads({
      pages: this.getOption('pages'),
      maxZoomScale: this.getOption('pageSpreadMaxZoomScale'),
      width: this.getOption('pageSpreadWidth')
    });

    _bindInstanceProperty(_context14 = this.pageSpreads).call(_context14, 'pageLoaded', _bindInstanceProperty(_context15 = this.pageLoaded).call(_context15, this));

    _bindInstanceProperty(_context16 = this.pageSpreads).call(_context16, 'pagesLoaded', _bindInstanceProperty(_context17 = this.pagesLoaded).call(_context17, this));

    this.setColor(this.getOption('color')); // It's important to insert the page spreads before instantiating Verso.

    this.els.pages.parentNode.insertBefore(this.pageSpreads.update(this.pageMode).getFrag(), this.els.pages);
    this.verso = this.createVerso();

    _bindInstanceProperty(_context18 = this).call(_context18, 'started', _bindInstanceProperty(_context19 = this.start).call(_context19, this));

    _bindInstanceProperty(_context20 = this).call(_context20, 'destroyed', _bindInstanceProperty(_context21 = this.destroy).call(_context21, this));
  }

  _createClass(PagedPublicationCore, [{
    key: "start",
    value: function start() {
      var _context22, _context23;

      var verso = this.getVerso();
      verso.start();

      _forEachInstanceProperty(_context22 = verso.pageSpreads).call(_context22, _bindInstanceProperty(_context23 = this.overridePageSpreadContentRect).call(_context23, this));

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
      var _context24;

      var verso = this.getVerso();
      var pageSpreadEls = verso.el.querySelectorAll('.sgn-pp__page-spread');
      this.els.root.removeAttribute('data-started');
      this.els.root.removeAttribute('data-idle');
      this.els.root.removeAttribute('data-navigating');
      this.els.root.removeAttribute('data-color-brightness');
      this.els.root.removeAttribute('data-zoomed-in');
      this.els.root.style.backgroundColor = '#ffffff';

      _forEachInstanceProperty(_context24 = _Array$from(pageSpreadEls)).call(_context24, function (pageSpreadEl) {
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
      var _context25,
          _this = this;

      _forEachInstanceProperty(_context25 = this.getVerso().pageSpreads).call(_context25, function (pageSpread) {
        var visibility = pageSpread.getVisibility();

        var match = _this.pageSpreads.get(pageSpread.getId());

        if (match) {
          if (visibility === 'visible' && match.contentsRendered === false) {
            var _context26;

            _setTimeout(_bindInstanceProperty(_context26 = match.renderContents).call(_context26, match), 0);
          }

          if (visibility === 'gone' && match.contentsRendered === true) {
            var _context27;

            _setTimeout(_bindInstanceProperty(_context27 = match.clearContents).call(_context27, match), 0);
          }
        }
      });

      return this;
    }
  }, {
    key: "findPage",
    value: function findPage(pageId) {
      var _context28;

      return _findInstanceProperty(_context28 = this.getOption('pages')).call(_context28, function (page) {
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
      var _this2 = this;

      this.idleTimeout = _setTimeout(function () {
        _this2.els.root.setAttribute('data-idle', true);
      }, this.getOption('idleDelay'));
      return this;
    }
  }, {
    key: "switchPageMode",
    value: function switchPageMode(pageMode) {
      var _context29, _context30, _context31;

      if (this.pageMode === pageMode) {
        return this;
      }

      var verso = this.getVerso();
      var pageIds = verso.getPageSpreadFromPosition(verso.getPosition()).getPageIds();
      var pageSpreadEls = this.getVerso().el.querySelectorAll('.sgn-pp__page-spread');
      this.pageMode = pageMode;
      this.pageSpreads.update(this.pageMode);

      _forEachInstanceProperty(_context29 = _Array$from(pageSpreadEls)).call(_context29, function (pageSpreadEl) {
        pageSpreadEl.parentNode.removeChild(pageSpreadEl);
      });

      this.els.pages.parentNode.insertBefore(this.pageSpreads.getFrag(), this.els.pages);
      verso.refresh();
      verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0]), {
        duration: 0
      });

      _forEachInstanceProperty(_context30 = verso.pageSpreads).call(_context30, _bindInstanceProperty(_context31 = this.overridePageSpreadContentRect).call(_context31, this));

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
}();

PagedPublicationCore.prototype.defaults = {
  pages: [],
  pageSpreadWidth: 100,
  pageSpreadMaxZoomScale: 2.3,
  idleDelay: 1000,
  resizeDelay: 400,
  color: '#ffffff'
};
MicroEvent.mixin(PagedPublicationCore);

var PagedPublicationEventTracking = /*#__PURE__*/function () {
  function PagedPublicationEventTracking(eventTracker, id) {
    var _context, _context2, _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14;

    _classCallCheck(this, PagedPublicationEventTracking);

    this.eventTracker = eventTracker;
    this.id = id;
    this.hidden = true;
    this.pageSpread = null;

    _bindInstanceProperty(_context = this).call(_context, 'appeared', _bindInstanceProperty(_context2 = this.appeared).call(_context2, this));

    _bindInstanceProperty(_context3 = this).call(_context3, 'disappeared', _bindInstanceProperty(_context4 = this.disappeared).call(_context4, this));

    _bindInstanceProperty(_context5 = this).call(_context5, 'beforeNavigation', _bindInstanceProperty(_context6 = this.beforeNavigation).call(_context6, this));

    _bindInstanceProperty(_context7 = this).call(_context7, 'afterNavigation', _bindInstanceProperty(_context8 = this.afterNavigation).call(_context8, this));

    _bindInstanceProperty(_context9 = this).call(_context9, 'attemptedNavigation', _bindInstanceProperty(_context10 = this.attemptedNavigation).call(_context10, this));

    _bindInstanceProperty(_context11 = this).call(_context11, 'panStart', _bindInstanceProperty(_context12 = this.panStart).call(_context12, this));

    _bindInstanceProperty(_context13 = this).call(_context13, 'destroyed', _bindInstanceProperty(_context14 = this.destroy).call(_context14, this));
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
      var _this = this;

      if (this.eventTracker == null) {
        return this;
      }

      _forEachInstanceProperty(pageNumbers).call(pageNumbers, function (pageNumber) {
        _this.eventTracker.trackPagedPublicationPageDisappeared({
          'pp.id': _this.id,
          'ppp.n': pageNumber,
          vt: _this.eventTracker.createViewToken(_this.id, pageNumber)
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
        var _context15;

        this.trackPageSpreadDisappeared(_mapInstanceProperty(_context15 = this.pageSpread.getPages()).call(_context15, function (page) {
          return page.pageNumber;
        }));
        this.hidden = true;
        this.pageSpread = null;
      }
    }
  }]);

  return PagedPublicationEventTracking;
}();

MicroEvent.mixin(PagedPublicationEventTracking);

var PagedPublicationHotspots = /*#__PURE__*/function () {
  function PagedPublicationHotspots() {
    var _context, _context2, _context3, _context4, _context5, _context6, _context7, _context8;

    _classCallCheck(this, PagedPublicationHotspots);

    this.currentPageSpreadId = null;
    this.pageSpreadsLoaded = {};
    this.cache = {};

    _bindInstanceProperty(_context = this).call(_context, 'hotspotsReceived', _bindInstanceProperty(_context2 = this.hotspotsReceived).call(_context2, this));

    _bindInstanceProperty(_context3 = this).call(_context3, 'afterNavigation', _bindInstanceProperty(_context4 = this.afterNavigation).call(_context4, this));

    _bindInstanceProperty(_context5 = this).call(_context5, 'pagesLoaded', _bindInstanceProperty(_context6 = this.pagesLoaded).call(_context6, this));

    _bindInstanceProperty(_context7 = this).call(_context7, 'resized', _bindInstanceProperty(_context8 = this.resized).call(_context8, this));
  }

  _createClass(PagedPublicationHotspots, [{
    key: "renderHotspots",
    value: function renderHotspots(data) {
      var _context9;

      var frag = document.createDocumentFragment();
      var contentRect = data.versoPageSpread.getContentRect();
      var pageSpreadEl = data.pageSpread.getEl();
      var hotspotEls = pageSpreadEl.querySelectorAll('.sgn-pp__hotspot');
      var boundingRect = pageSpreadEl.getBoundingClientRect();

      _forEachInstanceProperty(_context9 = _Array$from(hotspotEls)).call(_context9, function (hotspotEl) {
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
        var _context10;

        if (_indexOfInstanceProperty(pageNumbers).call(pageNumbers, +pageNumber) === -1) {
          continue;
        }

        _forEachInstanceProperty(_context10 = hotspot.locations[pageNumber]).call(_context10, function (coords) {
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
}();

MicroEvent.mixin(PagedPublicationHotspots);

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { var _context36; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = _sliceInstanceProperty(_context36 = Object.prototype.toString.call(o)).call(_context36, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Viewer$1 = /*#__PURE__*/function () {
  function Viewer(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    this.el = el;
    this.options = options;
    this._core = new PagedPublicationCore(this.el, {
      id: this.options.id,
      pages: this.options.pages,
      pageSpreadWidth: this.options.pageSpreadWidth,
      pageSpreadMaxZoomScale: this.options.pageSpreadMaxZoomScale,
      pageId: this.options.pageId,
      idleDelay: this.options.idleDelay,
      resizeDelay: this.options.resizeDelay,
      color: this.options.color
    });
    this._hotspots = new PagedPublicationHotspots();
    this._controls = new PagedPublicationControls(this.el, {
      keyboard: this.options.keyboard
    });
    this._eventTracking = new PagedPublicationEventTracking(this.options.eventTracker, this.options.id);
    this.viewSession = uuid();
    this.hotspots = null;
    this.hotspotQueue = [];
    this.popover = null;

    this._setupEventListeners();
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
          _this = this,
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
        _this.prev(e);
      });

      _bindInstanceProperty(_context3 = this._controls).call(_context3, 'next', function (e) {
        _this.next(e);
      });

      _bindInstanceProperty(_context4 = this._controls).call(_context4, 'first', function (e) {
        _this.first(e);
      });

      _bindInstanceProperty(_context5 = this._controls).call(_context5, 'last', function (e) {
        _this.last(e);
      });

      _bindInstanceProperty(_context6 = this._controls).call(_context6, 'close', function (e) {
        _this.destroy(e);
      });

      _bindInstanceProperty(_context7 = this._hotspots).call(_context7, 'hotspotsRequested', function (e) {
        _this.trigger('hotspotsRequested', e);
      });

      _bindInstanceProperty(_context8 = this._core).call(_context8, 'appeared', function (e) {
        _this._eventTracking.trigger('appeared', e);

        _this.trigger('appeared', e);
      });

      _bindInstanceProperty(_context9 = this._core).call(_context9, 'disappeared', function (e) {
        _this._eventTracking.trigger('disappeared', e);

        _this.trigger('disappeared', e);
      });

      _bindInstanceProperty(_context10 = this._core).call(_context10, 'beforeNavigation', function (e) {
        _this._eventTracking.trigger('beforeNavigation', e);

        _this._controls.trigger('beforeNavigation', e);

        _this.trigger('beforeNavigation', e);
      });

      _bindInstanceProperty(_context11 = this._core).call(_context11, 'afterNavigation', function (e) {
        _this._eventTracking.trigger('afterNavigation', e);

        _this._hotspots.trigger('afterNavigation', e);

        _this.trigger('afterNavigation', e);
      });

      _bindInstanceProperty(_context12 = this._core).call(_context12, 'attemptedNavigation', function (e) {
        _this._eventTracking.trigger('attemptedNavigation', e);

        _this.trigger('attemptedNavigation', e);
      });

      _bindInstanceProperty(_context13 = this._core).call(_context13, 'clicked', function (e) {
        _this._eventTracking.trigger('clicked', e);

        _this.trigger('clicked', e);
      });

      _bindInstanceProperty(_context14 = this._core).call(_context14, 'doubleClicked', function (e) {
        _this._eventTracking.trigger('doubleClicked', e);

        _this.trigger('doubleClicked', e);
      });

      _bindInstanceProperty(_context15 = this._core).call(_context15, 'contextmenu', function (e) {
        _this.trigger('contextmenu', e);
      });

      _bindInstanceProperty(_context16 = this._core).call(_context16, 'pressed', function (e) {
        _this._eventTracking.trigger('pressed', e);

        _this.trigger('pressed', e);
      });

      _bindInstanceProperty(_context17 = this._core).call(_context17, 'panStart', function (e) {
        _this._eventTracking.trigger('panStart', e);

        _this.trigger('panStart', e);
      });

      _bindInstanceProperty(_context18 = this._core).call(_context18, 'zoomedIn', function (e) {
        _this._eventTracking.trigger('zoomedIn', e);

        _this.trigger('zoomedIn', e);
      });

      _bindInstanceProperty(_context19 = this._core).call(_context19, 'zoomedOut', function (e) {
        _this._eventTracking.trigger('zoomedOut', e);

        _this.trigger('zoomedOut', e);
      });

      _bindInstanceProperty(_context20 = this._core).call(_context20, 'pageLoaded', function (e) {
        _this._eventTracking.trigger('pageLoaded', e);

        _this.trigger('pageLoaded', e);
      });

      _bindInstanceProperty(_context21 = this._core).call(_context21, 'pagesLoaded', function (e) {
        _this._hotspots.trigger('pagesLoaded', e);

        _this.trigger('pagesLoaded', e);
      });

      _bindInstanceProperty(_context22 = this._core).call(_context22, 'resized', function (e) {
        _this._hotspots.trigger('resized');

        _this.trigger('resized', e);
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
          _this2 = this;

      if (this.hotspots == null) {
        return;
      }

      if (this.popover != null) {
        var _this$popover$destroy, _this$popover;

        (_this$popover$destroy = (_this$popover = this.popover).destroy) === null || _this$popover$destroy === void 0 ? void 0 : _this$popover$destroy.call(_this$popover);
        this.popover = null;
      }

      var hotspots = _mapInstanceProperty(_context33 = e.verso.overlayEls).call(_context33, function (overlayEl) {
        return _this2.hotspots[overlayEl.getAttribute('data-id')];
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
          _this3 = this;

      if (this.hotspots == null) {
        return;
      }

      this.hotspotQueue = _filterInstanceProperty(_context34 = this.hotspotQueue).call(_context34, function (hotspotRequest) {
        var _context35;

        var id;
        var hotspots = {};

        var versoPageSpread = _findInstanceProperty(_context35 = _this3._core.getVerso().pageSpreads).call(_context35, function (pageSpread) {
          return pageSpread.getId() === hotspotRequest.id;
        });

        for (id in _this3.hotspots) {
          var hotspot = _this3.hotspots[id];

          if (hotspots[id]) {
            continue;
          }

          var _iterator = _createForOfIteratorHelper$1(hotspotRequest.pages),
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
      var _this$popover2, _this$popover2$destro;

      (_this$popover2 = this.popover) === null || _this$popover2 === void 0 ? void 0 : (_this$popover2$destro = _this$popover2.destroy) === null || _this$popover2$destro === void 0 ? void 0 : _this$popover2$destro.call(_this$popover2);
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

MicroEvent.mixin(Viewer$1);

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source), true)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context3; _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Bootstrapper$1 = /*#__PURE__*/function () {
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
      return new Viewer$1(this.options.el, _objectSpread({
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
    Viewer: Viewer$1,
    Bootstrapper: Bootstrapper$1
});

var prefixKey$2 = 'sgn-';

var storage$1 = function () {
  try {
    var _storage = window.sessionStorage;
    _storage["".concat(prefixKey$2, "test-storage")] = 'foobar';
    delete _storage["".concat(prefixKey$2, "test-storage")];
    return _storage;
  } catch (error) {
    return {};
  }
}();

function get$2(key) {
  try {
    var _context;

    return JSON.parse(storage$1[_concatInstanceProperty(_context = "".concat(prefixKey$2)).call(_context, key)]);
  } catch (error) {}
}
function set$2(key, value) {
  try {
    var _context2;

    storage$1[_concatInstanceProperty(_context2 = "".concat(prefixKey$2)).call(_context2, key)] = _JSON$stringify(value);
  } catch (error) {}
}

var clientSession = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get$2,
    set: set$2
});

var _context;

function ownKeys$1(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; _forEachInstanceProperty(_context2 = ownKeys$1(Object(source), true)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context3; _forEachInstanceProperty(_context3 = ownKeys$1(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SGN = _objectSpread$1({}, Core); // Expose storage backends.


SGN.storage = {
  local: clientLocal,
  session: clientSession,
  cookie: clientCookie
}; // Expose the different kits.

SGN.EventsKit = EventsKit;
SGN.CoreKit = CoreKit;
SGN.PagedPublicationKit = PagedPublicationKit;
SGN.IncitoPublicationKit = IncitoPublicationKit;
SGN.CoreUIKit = CoreUIKit; // Set the core session from the cookie store if possible.

var session$1 = SGN.storage.cookie.get('session');

if (typeof session$1 === 'object') {
  SGN.config.set({
    coreSessionToken: session$1.token,
    coreSessionClientId: session$1.client_id
  });
}

_bindInstanceProperty(_context = SGN.config).call(_context, 'change', function (changedAttributes) {
  var _ref;

  var newEventTracker = changedAttributes.eventTracker;
  var newAppKey = changedAttributes.appKey;

  if ((newAppKey || newEventTracker) && ((_ref = newEventTracker || SGN.config.get('eventTracker')) === null || _ref === void 0 ? void 0 : _ref.trackId) === (newAppKey || SGN.config.get('appKey'))) {
    throw error(new Error('Track identifier must not be identical to app key. Go to https://shopgun.com/developers/apps to get a track identifier for your app'));
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
    var appKey = scriptEl.getAttribute('data-app-key');
    var trackId = scriptEl.getAttribute('data-track-id');
    var config$1 = {};

    if (appKey) {
      config$1.appKey = appKey;
    }

    if (trackId) {
      config$1.eventTracker = new SGN.EventsKit.Tracker({
        trackId: trackId
      });
    }

    SGN.config.set(config$1);
  }
}

export default SGN;
//# sourceMappingURL=sgn-sdk.es.js.map
