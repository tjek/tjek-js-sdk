'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.object.keys');
require('core-js/modules/es6.regexp.constructor');
require('core-js/modules/es6.regexp.to-string');
require('core-js/modules/es6.regexp.replace');
require('core-js/modules/es6.function.name');
var require$$0 = _interopDefault(require('microevent'));
var mustache = _interopDefault(require('mustache'));
require('core-js/modules/es6.regexp.split');
var xmlhttprequest = _interopDefault(require('xmlhttprequest'));
var md5 = _interopDefault(require('md5'));
require('core-js/modules/es6.object.assign');
var sha256 = _interopDefault(require('sha256'));
require('core-js/modules/es6.array.find');
var versoBrowser = _interopDefault(require('verso-browser'));
var incitoBrowser = _interopDefault(require('incito-browser'));
require('core-js/modules/es6.regexp.match');

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

var util;
util = {
  isBrowser: function isBrowser() {
    return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object';
  },
  isNode: function isNode() {
    return (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object';
  },
  error: function error(err, options) {
    var key, value;
    err.message = err.message || null;

    if (typeof options === 'string') {
      err.message = options;
    } else if (_typeof(options) === 'object' && options != null) {
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
  formatQueryParams: function formatQueryParams() {
    var queryParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.keys(queryParams).map(function (key) {
      return key + '=' + encodeURIComponent(queryParams[key]);
    }).join('&');
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
  }
};
var util_1 = util;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var Config,
    MicroEvent,
    indexOf = [].indexOf;
MicroEvent = require$$0;

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

var sgn = core;

var prefixKey;
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

var prefixKey$1;
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

var SGN$3, prefixKey$2;
SGN$3 = sgn;
prefixKey$2 = 'sgn-';
var clientCookie = {
  get: function get(key) {
    var c, ca, ct, i, len, name, value;

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
      value = {};
    }

    return value;
  },
  set: function set(key, value) {
    var date, days, str;

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
    }
  }
};

var SGN$4, XMLHttpRequest$1, isBrowser, ref;
SGN$4 = sgn;
isBrowser = util_1.isBrowser;
XMLHttpRequest$1 = isBrowser() ? window.XMLHttpRequest : (ref = xmlhttprequest) != null ? ref.XMLHttpRequest : void 0;

var request = function request() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var progressCallback = arguments.length > 2 ? arguments[2] : undefined;
  var formData, header, headers, http, key, method, queryParams, ref1, ref2, ref3, ref4, url, value;
  http = new XMLHttpRequest$1();
  method = (ref1 = options.method) != null ? ref1 : 'get';
  url = options.url;
  headers = (ref2 = options.headers) != null ? ref2 : {};

  if (options.qs != null) {
    queryParams = SGN$4.util.formatQueryParams(options.qs);

    if (url.indexOf('?') === -1) {
      url += '?' + queryParams;
    } else {
      url += '&' + queryParams;
    }
  }

  http.open(method.toUpperCase(), url);

  if (options.timeout != null) {
    http.timeout = options.timeout;
  }

  if (options.useCookies === true) {
    http.withCredentials = true;
  }

  if (options.json === true) {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
  }

  ref3 = options.headers;

  for (header in ref3) {
    value = ref3[header];

    if (value != null) {
      http.setRequestHeader(header, value);
    }
  }

  http.addEventListener('load', function () {
    var body;
    headers = http.getAllResponseHeaders().split('\r\n');
    headers = headers.reduce(function (acc, current, i) {
      var parts;
      parts = current.split(': ');
      acc[parts[0].toLowerCase()] = parts[1];
      return acc;
    }, {});
    body = http.responseText;

    if (options.json === true) {
      body = JSON.parse(body);
    }

    callback(null, {
      statusCode: http.status,
      headers: headers,
      body: body
    });
  });
  http.addEventListener('error', function () {
    callback(new Error());
  });
  http.addEventListener('timeout', function () {
    callback(new Error());
  });
  http.addEventListener('progress', function (e) {
    if (e.lengthComputable && typeof progressCallback === 'function') {
      progressCallback(e.loaded, e.total);
    }
  });

  if (options.formData != null) {
    formData = new FormData();
    ref4 = options.formData;

    for (key in ref4) {
      value = ref4[key];
      formData.append(key, value);
    }

    http.send(formData);
  } else if (options.body != null) {
    if (options.json === true) {
      http.send(JSON.stringify(options.body));
    } else {
      http.send(options.body);
    }
  } else {
    http.send();
  }
};

var SGN$5;
SGN$5 = sgn;

var fileUpload = function fileUpload() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var progressCallback = arguments.length > 2 ? arguments[2] : undefined;
  var timeout, url;

  if (options.file == null) {
    throw new Error('File is not defined');
  }

  url = SGN$5.config.get('assetsFileUploadUrl');
  timeout = 1000 * 60 * 60;
  SGN$5.request({
    method: 'post',
    url: url,
    headers: {
      'Accept': 'application/json'
    },
    formData: {
      file: options.file
    },
    timeout: timeout
  }, function (err, data) {
    if (err != null) {
      callback(SGN$5.util.error(new Error('Request error'), {
        code: 'RequestError'
      }));
    } else {
      if (data.statusCode === 200) {
        callback(null, JSON.parse(data.body));
      } else {
        callback(SGN$5.util.error(new Error('Request error'), {
          code: 'RequestError',
          statusCode: data.statusCode
        }));
      }
    }
  }, function (loaded, total) {
    if (typeof progressCallback === 'function') {
      progressCallback({
        progress: loaded / total,
        loaded: loaded,
        total: total
      });
    }
  });
};

var assets = {
  fileUpload: fileUpload
};

var SGN$6, Tracker, clientLocalStorage, getPool, isBrowser$1, md5$1, pool;
SGN$6 = sgn;
md5$1 = md5;
isBrowser$1 = util_1.isBrowser;
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
clientLocalStorage.set('event-tracker-pool', []);

try {
  window.addEventListener('unload', function () {
    pool = pool.concat(getPool());
    clientLocalStorage.set('event-tracker-pool', pool);
  }, false);
} catch (error) {}

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

      if (isBrowser$1()) {
        // Dispatch events periodically.
        this.interval = setInterval(this.dispatch.bind(this), this.dispatchInterval);
      }

      return;
    }

    _createClass(Tracker, [{
      key: "trackEvent",
      value: function trackEvent(type) {
        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
        var evt;

        if (typeof type !== 'number') {
          throw SGN$6.util.error(new Error('Event type is required'));
        }

        if (this.trackId == null) {
          return;
        }

        if (SGN$6.config.get('appKey') === this.trackId) {
          // coffeelint: disable=max_line_length
          throw SGN$6.util.error(new Error('Track identifier must not be identical to app key. Go to https://business.shopgun.com/developers/apps to get a track identifier for your app'));
        }

        evt = Object.assign({}, properties, {
          '_e': type,
          '_v': version,
          '_i': SGN$6.util.uuid(),
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

        while (this.getPoolSize() > this.poolLimit) {
          pool.shift();
        }

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
      key: "getPoolSize",
      value: function getPoolSize() {
        return pool.length;
      }
    }, {
      key: "dispatch",
      value: function dispatch() {
        var _this = this;

        var events, nacks;

        if (this.dispatching === true || this.getPoolSize() === 0) {
          return;
        }

        if (this.dryRun === true) {
          return pool.splice(0, this.dispatchLimit);
        }

        events = pool.slice(0, this.dispatchLimit);
        nacks = 0;
        this.dispatching = true;
        this.ship(events, function (err, response) {
          _this.dispatching = false;

          if (err == null) {
            response.events.forEach(function (resEvent) {
              if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
                pool = pool.filter(function (poolEvent) {
                  return poolEvent._i !== resEvent.id;
                });
              } else {
                nacks++;
              }
            });

            if (_this.getPoolSize() >= _this.dispatchLimit && nacks === 0) {
              // Keep dispatching until the pool size reaches a sane level.
              _this.dispatch();
            }
          }
        });
        return this;
      }
    }, {
      key: "ship",
      value: function ship() {
        var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var callback = arguments.length > 1 ? arguments[1] : undefined;
        var http, url;
        http = new XMLHttpRequest();
        url = SGN$6.config.get('eventsTrackUrl');
        http.open('POST', url);
        http.setRequestHeader('Content-Type', 'application/json');
        http.setRequestHeader('Accept', 'application/json');
        http.timeout = 1000 * 20;

        http.onload = function () {

          if (http.status === 200) {
            try {
              callback(null, JSON.parse(http.responseText));
            } catch (error) {
              callback(SGN$6.util.error(new Error('Could not parse JSON')));
            }
          } else {
            callback(SGN$6.util.error(new Error('Server did not accept request')));
          }
        };

        http.onerror = function () {
          callback(SGN$6.util.error(new Error('Could not perform network request')));
        };

        http.send(JSON.stringify({
          events: events
        }));
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
      key: "createViewToken",
      value: function createViewToken() {
        var str, viewToken;

        for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
          parts[_key] = arguments[_key];
        }

        str = [SGN$6.client.id].concat(parts).join('');
        viewToken = SGN$6.util.btoa(String.fromCharCode.apply(null, md5$1(str, {
          asBytes: true
        }).slice(0, 8)));
        return viewToken;
      }
    }]);

    return Tracker;
  }();
  Tracker.prototype.defaultOptions = {
    trackId: null,
    dispatchInterval: 3000,
    dispatchLimit: 100,
    poolLimit: 1000,
    dryRun: false
  };
  return Tracker;
}.call(commonjsGlobal);

var MicroEvent$1, Pulse;
MicroEvent$1 = require$$0;

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

var SGN$7, parseCookies;
SGN$7 = sgn;

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

var request$1 = function request() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var appKey, authToken, authTokenCookieName, timeout, url;
  url = SGN$7.config.get('graphUrl');
  timeout = 1000 * 12;
  appKey = SGN$7.config.get('appKey');
  authToken = SGN$7.config.get('authToken');
  authTokenCookieName = 'shopgun-auth-token';
  options = {
    method: 'post',
    url: url,
    timeout: timeout,
    json: true,
    headers: {},
    body: {
      query: options.query,
      operationName: options.operationName,
      variables: options.variables
    }
  };

  if (appKey != null) {
    // Apply authorization header when app key is provided to avoid rate limiting.
    options.headers.Authorization = 'Basic ' + SGN$7.util.btoa("app-key:".concat(appKey));
  } // Set cookies manually in node.js.


  if (SGN$7.util.isNode() && authToken != null) {
    options.cookies = [{
      key: authTokenCookieName,
      value: authToken,
      url: url
    }];
  } else if (SGN$7.util.isBrowser()) {
    options.useCookies = true;
  }

  SGN$7.request(options, function (err, data) {
    var authCookie, cookies, ref;

    if (err != null) {
      callback(SGN$7.util.error(new Error('Graph request error'), {
        code: 'GraphRequestError'
      }));
    } else {
      // Update auth token as it might have changed.
      if (SGN$7.util.isNode()) {
        cookies = parseCookies((ref = data.headers) != null ? ref['set-cookie'] : void 0);
        authCookie = cookies[authTokenCookieName];

        if (SGN$7.config.get('authToken') !== authCookie) {
          SGN$7.config.set('authToken', authCookie);
        }
      }

      if (data.statusCode === 200) {
        callback(null, data.body);
      } else {
        callback(SGN$7.util.error(new Error('Graph API error'), {
          code: 'GraphAPIError',
          statusCode: data.statusCode
        }));
      }
    }
  });
};

var graph = {
  request: request$1
};

var SGN$8, _request;

SGN$8 = sgn;

_request = function request() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var runs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  SGN$8.CoreKit.session.ensure(function (err) {
    var appSecret, appVersion, clientId, geo, headers, json, locale, qs, ref, ref1, ref2, token, url;

    if (err != null) {
      return callback(err);
    }

    url = (ref = options.url) != null ? ref : '';
    headers = (ref1 = options.headers) != null ? ref1 : {};
    json = typeof options.json === 'boolean' ? options.json : true;
    token = SGN$8.config.get('coreSessionToken');
    clientId = SGN$8.config.get('coreSessionClientId');
    appVersion = SGN$8.config.get('appVersion');
    appSecret = SGN$8.config.get('appSecret');
    locale = SGN$8.config.get('locale');
    qs = (ref2 = options.qs) != null ? ref2 : {};
    geo = options.geolocation;
    headers['X-Token'] = token;

    if (appSecret != null) {
      headers['X-Signature'] = SGN$8.CoreKit.session.sign(appSecret, token);
    }

    if (locale != null) {
      qs.r_locale = locale;
    }

    if (appVersion != null) {
      qs.api_av = appVersion;
    }

    if (clientId != null) {
      qs.client_id = clientId;
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

    return SGN$8.request({
      method: options.method,
      url: SGN$8.config.get('coreUrl') + url,
      qs: qs,
      body: options.body,
      formData: options.formData,
      headers: headers,
      json: json,
      useCookies: false
    }, function (err, data) {
      var ref3, responseToken;

      if (err != null) {
        callback(SGN$8.util.error(new Error('Core request error'), {
          code: 'CoreRequestError'
        }));
      } else {
        token = SGN$8.config.get('coreSessionToken');
        responseToken = data.headers['x-token'];

        if (responseToken && token !== responseToken) {
          SGN$8.CoreKit.session.saveToken(responseToken);
        }

        if (data.statusCode >= 200 && data.statusCode < 300 || data.statusCode === 304) {
          callback(null, data.body);
        } else {
          if (runs === 0 && data.body != null && ((ref3 = data.body.code) === 1101 || ref3 === 1107 || ref3 === 1108)) {
            SGN$8.config.set({
              coreSessionToken: void 0
            });

            _request(options, callback, ++runs);
          } else {
            callback(SGN$8.util.error(new Error('Core API error'), {
              code: 'CoreAPIError',
              statusCode: data.statusCode
            }), data.body);
          }
        }
      }
    });
  });
};

var request_1 = _request;

var SGN$9, callbackQueue, clientCookieStorage, renewed, session, sha256$1;
SGN$9 = sgn;
sha256$1 = sha256;
clientCookieStorage = clientCookie;
callbackQueue = [];
renewed = false;
session = {
  ttl: 1 * 60 * 60 * 24 * 60,
  saveToken: function saveToken(token) {
    if (!token) {
      throw new Error('No token provided for saving');
    }

    SGN$9.config.set({
      coreSessionToken: token
    });
    session.saveCookie();
  },
  saveClientId: function saveClientId(clientId) {
    SGN$9.config.set({
      coreSessionClientId: clientId
    });
    session.saveCookie();
  },
  saveCookie: function saveCookie() {
    clientCookieStorage.set('session', {
      token: SGN$9.config.get('coreSessionToken'),
      client_id: SGN$9.config.get('coreSessionClientId')
    });
  },
  create: function create(callback) {
    SGN$9.request({
      method: 'post',
      url: SGN$9.config.get('coreUrl') + '/v2/sessions',
      json: true,
      qs: {
        api_key: SGN$9.config.get('appKey'),
        token_ttl: session.ttl
      }
    }, function (err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 201) {
        session.saveToken(data.body.token);
        session.saveClientId(data.body.client_id);
        callback(err, data.body);
      } else {
        callback(new Error('Could not create session'));
      }
    });
  },
  update: function update(callback) {
    var appSecret, headers, token;
    headers = {};
    token = SGN$9.config.get('coreSessionToken');
    appSecret = SGN$9.config.get('appSecret');
    headers['X-Token'] = token;

    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }

    SGN$9.request({
      url: SGN$9.config.get('coreUrl') + '/v2/sessions',
      headers: headers,
      json: true
    }, function (err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 200) {
        session.saveToken(data.body.token);
        session.saveClientId(data.body.client_id);
        callback(err, data.body);
      } else {
        callback(new Error('Could not update session'));
      }
    });
  },
  renew: function renew(callback) {
    var appSecret, headers, token;
    headers = {};
    token = SGN$9.config.get('coreSessionToken');
    appSecret = SGN$9.config.get('appSecret');
    headers['X-Token'] = token;

    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }

    SGN$9.request({
      method: 'put',
      url: SGN$9.config.get('coreUrl') + '/v2/sessions',
      headers: headers,
      json: true
    }, function (err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 200) {
        session.saveToken(data.body.token);
        session.saveClientId(data.body.client_id);
        callback(err, data.body);
      } else {
        callback(new Error('Could not renew session'));
      }
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
      if (SGN$9.config.get('coreSessionToken') == null) {
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
    return sha256$1([appSecret, token].join(''));
  }
};
var session_1 = session;

var request$2, session$1;
request$2 = request_1;
session$1 = session_1;
var core$1 = {
  request: request$2,
  session: session$1
};

var MicroEvent$2, PagedPublicationPageSpread, SGN$b;
MicroEvent$2 = require$$0;
SGN$b = sgn;

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
        SGN$b.util.loadImage(image, function (err, width, height) {
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
        SGN$b.util.loadImage(image, function (err) {
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

var MicroEvent$3, PageSpread, PagedPublicationPageSpreads, SGN$c;
MicroEvent$3 = require$$0;
PageSpread = pageSpread;
SGN$c = sgn;

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
      this.collection.forEach(function (pageSpread$$1) {
        return frag.appendChild(pageSpread$$1.el);
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
        midstPageSpreads = SGN$c.util.chunk(pages, 2);

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
        var id, pageSpread$$1;
        id = "".concat(pageMode, "-").concat(i);
        pageSpread$$1 = new PageSpread({
          width: width,
          maxZoomScale: maxZoomScale,
          pages: pages,
          id: id
        });
        pageSpread$$1.bind('pageLoaded', function (e) {
          return _this.trigger('pageLoaded', e);
        });
        pageSpread$$1.bind('pagesLoaded', function (e) {
          return _this.trigger('pagesLoaded', e);
        });
        ids[id] = pageSpread$$1;
        return pageSpread$$1;
      });
      this.ids = ids;
      return this;
    }
  }]);

  return PagedPublicationPageSpreads;
}();

MicroEvent$3.mixin(PagedPublicationPageSpreads);
var pageSpreads = PagedPublicationPageSpreads;

var MicroEvent$4, PageSpreads, PagedPublicationCore, SGN$d, Verso;
MicroEvent$4 = require$$0;
Verso = versoBrowser;
PageSpreads = pageSpreads;
SGN$d = sgn;

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
        this.visibilityChangeListener = this.visibilityChange.bind(this);
        this.resizeListener = SGN$d.util.throttle(this.resize, this.getOption('resizeDelay'), this);
        this.unloadListener = this.unload.bind(this);
        document.addEventListener('visibilitychange', this.visibilityChangeListener, false);
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
        document.removeEventListener('visibilitychange', this.visibilityChangeListener, false);
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
        this.els.root.setAttribute('data-color-brightness', SGN$d.util.getColorBrightness(color));
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
      key: "visibilityChange",
      value: function visibilityChange() {
        var eventName, pageSpread;
        pageSpread = this.getVerso().getPageSpreadFromPosition(this.getVerso().getPosition());
        eventName = document.hidden === true ? 'disappeared' : 'appeared';
        this.trigger(eventName, {
          pageSpread: this.pageSpreads.get(pageSpread.id)
        });
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
MicroEvent$5 = require$$0;
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
      var el, height, left, ref, top, width;
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

      el.innerHTML = Mustache$1.render((ref = hotspot.template) != null ? ref : '', hotspot);
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

var MicroEvent$6, PagedPublicationControls, SGN$e, keyCodes$1;
MicroEvent$6 = require$$0;
SGN$e = sgn;
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
    this.keyDownListener = SGN$e.util.throttle(this.keyDown, 150, this);

    if (this.options.keyboard === true) {
      this.els.root.addEventListener('keydown', this.keyDownListener, false);
    }

    if (this.els.prevControl != null) {
      this.els.prevControl.addEventListener('click', this.prevClicked.bind(this), false);
    }

    if (this.els.nextControl != null) {
      this.els.nextControl.addEventListener('click', this.nextClicked.bind(this), false);
    }

    if (this.els.close != null) {
      this.els.close.addEventListener('click', this.closeClicked.bind(this), false);
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
MicroEvent$7 = require$$0;

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

var Controls, Core, EventTracking, Hotspots, MicroEvent$8, SGN$f, Viewer;
MicroEvent$8 = require$$0;
SGN$f = sgn;
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
    this.viewSession = SGN$f.util.uuid();
    this.hotspots = null;
    this.hotspotQueue = [];
    this.popover = null;

    this._setupEventListeners();

    return;
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

      var hotspots$$1;

      if (this.hotspots == null) {
        return;
      }

      if (this.popover != null) {
        this.popover.destroy();
        this.popover = null;
      }

      hotspots$$1 = e.verso.overlayEls.map(function (overlayEl) {
        return _this2.hotspots[overlayEl.getAttribute('data-id')];
      });

      if (hotspots$$1.length === 1) {
        callback(hotspots$$1[0]);
      } else if (hotspots$$1.length > 1) {
        this.popover = SGN$f.CoreUIKit.singleChoicePopover({
          el: this.el,
          header: SGN$f.translations.t('paged_publication.hotspot_picker.header'),
          x: e.verso.x,
          y: e.verso.y,
          items: hotspots$$1.filter(function (hotspot) {
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
        var hotspot, hotspots$$1, i, id, len, page, ref, ref1, versoPageSpread;
        hotspots$$1 = {};
        versoPageSpread = _this3._core.getVerso().pageSpreads.find(function (pageSpread) {
          return pageSpread.getId() === hotspotRequest.id;
        });
        ref = _this3.hotspots;

        for (id in ref) {
          hotspot = ref[id];

          if (hotspots$$1[id] != null) {
            continue;
          }

          ref1 = hotspotRequest.pages;

          for (i = 0, len = ref1.length; i < len; i++) {
            page = ref1[i];

            if (hotspot.locations[page.pageNumber] != null) {
              hotspots$$1[id] = {
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
          hotspots: hotspots$$1
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
      var hotspots$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.hotspots = hotspots$$1;
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

var Bootstrapper, SGN$g;
SGN$g = core;

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
      return new SGN$g.PagedPublicationKit.Viewer(this.options.el, {
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
      SGN$g.util.async.parallel([this.fetchDetails.bind(this), this.fetchPages.bind(this)], function (result) {
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
      SGN$g.CoreKit.request({
        url: "/v2/catalogs/".concat(this.options.id)
      }, callback);
    }
  }, {
    key: "fetchPages",
    value: function fetchPages(callback) {
      SGN$g.CoreKit.request({
        url: "/v2/catalogs/".concat(this.options.id, "/pages")
      }, callback);
    }
  }, {
    key: "fetchHotspots",
    value: function fetchHotspots(callback) {
      SGN$g.CoreKit.request({
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

var Incito, MicroEvent$a, Viewer$1;
Incito = incitoBrowser;
MicroEvent$a = require$$0;

Viewer$1 =
/*#__PURE__*/
function () {
  function Viewer(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Viewer);

    this.el = el;
    this.options = options;
    this.incito = new Incito(this.el, {
      incito: this.options.incito
    });
    return;
  }

  _createClass(Viewer, [{
    key: "start",
    value: function start() {
      this.incito.start();
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

MicroEvent$a.mixin(Viewer$1);
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

    if (this.progressEl != null) {
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
      var docHeight, progress, scrollTop, winHeight;
      scrollTop = window.scrollY;
      winHeight = window.innerHeight;
      docHeight = document.body.clientHeight;
      progress = Math.round((scrollTop + winHeight) / docHeight * 100);

      if (scrollTop < 300) {
        this.progressEl.style.opacity = 0;
      } else if (scrollTop >= docHeight - winHeight) {
        this.progressEl.textContent = '100%';
        this.progressEl.style.opacity = 1;
      } else {
        this.progressEl.textContent = "".concat(progress, " %");
        this.progressEl.style.opacity = 1;
      }
    }
  }]);

  return Controls;
}();

var incito = "query GetIncitoPublication($id: ID!, $deviceCategory: DeviceCategory!, $orientation: Orientation!, $pixelRatio: Float!, $pointer: Pointer!, $maxWidth: Int!, $versionsSupported: [String!]!) {\n  node(id: $id) {\n    ... on IncitoPublication {\n      id\n      incito(deviceCategory: $deviceCategory, orientation: $orientation, pixelRatio: $pixelRatio, pointer: $pointer, maxWidth: $maxWidth, versionsSupported: $versionsSupported)\n    }\n  }\n}";

var incito$1 = /*#__PURE__*/Object.freeze({
  default: incito
});

var require$$3 = ( incito$1 && incito ) || incito$1;

var Bootstrapper$1, Controls$2, SGN$h, schema, util$2;
util$2 = util_1;
SGN$h = core;
Controls$2 = controls$1;
schema = require$$3;

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
    this.maxWidth = this.getMaxWidth();
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
    key: "getMaxWidth",
    value: function getMaxWidth() {
      if (Math.abs(window.orientation) === 90) {
        return Math.min(this.options.el.offsetWidth, screen.width);
      } else {
        return this.options.el.offsetWidth;
      }
    }
  }, {
    key: "fetch",
    value: function fetch(callback) {
      var _this = this;

      var data;
      data = SGN$h.storage.session.get(this.storageKey);

      if (data != null && data.response != null && data.width === this.maxWidth) {
        return callback(null, data.response);
      }

      SGN$h.GraphKit.request({
        query: schema,
        operationName: 'GetIncitoPublication',
        variables: {
          id: this.options.id,
          deviceCategory: 'DEVICE_CATEGORY_' + this.deviceCategory.toUpperCase(),
          pixelRatio: this.pixelRatio,
          pointer: 'POINTER_' + this.pointer.toUpperCase(),
          orientation: 'ORIENTATION_' + this.orientation.toUpperCase(),
          maxWidth: this.maxWidth,
          versionsSupported: this.versionsSupported
        }
      }, function (err, res) {
        if (err != null) {
          callback(err);
        } else if (res.errors && res.errors.length > 0) {
          callback(util$2.error(new Error(), 'graph request contained errors'));
        } else {
          callback(null, res);
          SGN$h.storage.session.set(_this.storageKey, {
            width: _this.maxWidth,
            response: res
          });
        }
      });
    }
  }, {
    key: "createViewer",
    value: function createViewer(data) {
      var controls, viewer;

      if (data.incito == null) {
        throw util$2.error(new Error(), 'you need to supply valid Incito to create a viewer');
      }

      viewer = new SGN$h.IncitoPublicationKit.Viewer(this.options.el, {
        id: this.options.id,
        incito: data.incito,
        eventTracker: this.options.eventTracker
      });
      controls = new Controls$2(viewer);
      return viewer;
    }
  }]);

  return Bootstrapper;
}();

var incitoPublication = {
  Viewer: viewer$1,
  Bootstrapper: bootstrapper$1
};

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

  if (module.exports) {
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

var Gator, MicroEvent$b, Mustache$2, Popover, keyCodes$2, template;
MicroEvent$b = require$$0;
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

MicroEvent$b.mixin(Popover);
var popover = Popover;

var Popover$1;
Popover$1 = popover;

var singleChoicePopover = function singleChoicePopover(ctx, callback) {
  var items, popover$$1;
  items = ctx.items;
  popover$$1 = null;

  if (items.length === 1) {
    callback(items[0]);
  } else if (items.length > 1) {
    popover$$1 = new Popover$1({
      header: ctx.header,
      x: ctx.x,
      y: ctx.y,
      singleChoiceItems: items
    });
    popover$$1.bind('selected', function (e) {
      callback(items[e.index]);
      popover$$1.destroy();
    });
    popover$$1.bind('destroyed', function () {
      ctx.el.focus();
    });
    ctx.el.appendChild(popover$$1.el);
    popover$$1.render().el.focus();
  }

  return {
    destroy: function destroy() {
      if (popover$$1 != null) {
        popover$$1.destroy();
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

var SGN$i, appKey, config$2, isBrowser$2, scriptEl, session$2, trackId;
isBrowser$2 = util_1.isBrowser;
SGN$i = core; // Expose storage backends.

SGN$i.storage = {
  local: clientLocal,
  session: clientSession,
  cookie: clientCookie
}; // Expose request handler.

SGN$i.request = request; // Expose the different kits.

SGN$i.AssetsKit = assets;
SGN$i.EventsKit = events;
SGN$i.GraphKit = graph;
SGN$i.CoreKit = core$1;
SGN$i.PagedPublicationKit = pagedPublication;
SGN$i.IncitoPublicationKit = incitoPublication;
SGN$i.CoreUIKit = coreUi; // Set the core session from the cookie store if possible.

session$2 = SGN$i.storage.cookie.get('session');

if (_typeof(session$2) === 'object') {
  SGN$i.config.set({
    coreSessionToken: session$2.token,
    coreSessionClientId: session$2.client_id
  });
}

SGN$i.client = function () {
  var id;
  id = SGN$i.storage.local.get('client-id');

  if (id != null ? id.data : void 0) {
    id = id.data;
  }

  if (id == null) {
    id = SGN$i.util.uuid();
    SGN$i.storage.local.set('client-id', id);
  }

  return {
    id: id
  };
}(); // Listen for changes in the config.


SGN$i.config.bind('change', function (changedAttributes) {
  var eventTracker;
  eventTracker = changedAttributes.eventTracker;

  if (eventTracker != null) {
    eventTracker.trackClientSessionOpened();
  }
});

if (isBrowser$2()) {
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
      config$2.eventTracker = new SGN$i.EventsKit.Tracker({
        trackId: trackId
      });
    }

    SGN$i.config.set(config$2);
  }
}

var coffeescript = SGN$i;

module.exports = coffeescript;
//# sourceMappingURL=sgn-sdk.cjs.js.map
