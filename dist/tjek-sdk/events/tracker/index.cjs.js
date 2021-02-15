'use strict';

require('core-js/modules/es.array.join.js');
var _setInterval = require('@babel/runtime-corejs3/core-js-stable/set-interval');
var _forEachInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/for-each');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _Object$assign = require('@babel/runtime-corejs3/core-js-stable/object/assign');
var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var _Array$isArray = require('@babel/runtime-corejs3/core-js-stable/array/is-array');
var fetch = require('cross-fetch');
var md5 = require('md5');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.constructor.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.string.replace.js');
var _Promise = require('@babel/runtime-corejs3/core-js-stable/promise');
var _setTimeout = require('@babel/runtime-corejs3/core-js-stable/set-timeout');
var _spliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/splice');
var _parseInt = require('@babel/runtime-corejs3/core-js-stable/parse-int');
var _lastIndexOfInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/last-index-of');
var _indexOfInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/index-of');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _setInterval__default = /*#__PURE__*/_interopDefaultLegacy(_setInterval);
var _forEachInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_forEachInstanceProperty);
var _JSON$stringify__default = /*#__PURE__*/_interopDefaultLegacy(_JSON$stringify);
var _sliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_sliceInstanceProperty);
var _concatInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_concatInstanceProperty);
var _Object$assign__default = /*#__PURE__*/_interopDefaultLegacy(_Object$assign);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var _Array$isArray__default = /*#__PURE__*/_interopDefaultLegacy(_Array$isArray);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var md5__default = /*#__PURE__*/_interopDefaultLegacy(md5);
var _Promise__default = /*#__PURE__*/_interopDefaultLegacy(_Promise);
var _setTimeout__default = /*#__PURE__*/_interopDefaultLegacy(_setTimeout);
var _spliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_spliceInstanceProperty);
var _parseInt__default = /*#__PURE__*/_interopDefaultLegacy(_parseInt);
var _lastIndexOfInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_lastIndexOfInstanceProperty);
var _indexOfInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_indexOfInstanceProperty);

var locale = 'en_US';
var coreUrl = 'https://squid-api.tjek.com';
var eventsTrackUrl = 'https://wolf-api.tjek.com/sync';

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
    var _context;

    return JSON.parse(storage[_concatInstanceProperty__default['default'](_context = "".concat(prefixKey)).call(_context, key)]);
  } catch (error) {}
}
function set(key, value) {
  try {
    var _context2;

    storage[_concatInstanceProperty__default['default'](_context2 = "".concat(prefixKey)).call(_context2, key)] = _JSON$stringify__default['default'](value);
  } catch (error) {}
}

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

  if (_indexOfInstanceProperty__default['default'](ua).call(ua, 'Windows') > -1) {
    name = 'Windows';
  } else if (_indexOfInstanceProperty__default['default'](ua).call(ua, 'Mac') > -1) {
    name = 'macOS';
  } else if (_indexOfInstanceProperty__default['default'](ua).call(ua, 'X11') > -1) {
    name = 'unix';
  } else if (_indexOfInstanceProperty__default['default'](ua).call(ua, 'Linux') > -1) {
    name = 'Linux';
  } else if (_indexOfInstanceProperty__default['default'](ua).call(ua, 'iOS') > -1) {
    name = 'iOS';
  } else if (_indexOfInstanceProperty__default['default'](ua).call(ua, 'Android') > -1) {
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
  var jan2 = new Date(tmp.substring(0, _lastIndexOfInstanceProperty__default['default'](tmp).call(tmp, ' ') - 1));
  var stdTimeOffset = (jan1 - jan2) / 1000;
  return stdTimeOffset;
}
function getUtcDstOffsetSeconds() {
  return new Date().getTimezoneOffset() * 60 * -1;
}
function getColorBrightness(color) {
  color = color.replace('#', '');

  var hex = _parseInt__default['default']((hex + '').replace(/[^a-f0-9]/gi, ''), 16);

  var rgb = [];
  var sum = 0;
  var x = 0;

  while (x < 3) {
    var s = _parseInt__default['default'](color.substring(2 * x, 2), 16);

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
    results.push(_spliceInstanceProperty__default['default'](arr).call(arr, 0, size));
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
      deferTimer = _setTimeout__default['default'](function () {
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
    return new _Promise__default['default'](function (resolve, reject) {
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
    } else if (typeof _Promise__default['default'] === 'function') {
      // No callback given, and we have promise support, use makePromise to wrap the call.
      return makePromise(fun, cbParameterIndex, parameters);
    } else {
      // Ain't got callback, ain't got promise support; we gotta tell the developer.
      throw new Error("To be able to use this asynchronous method you should:\nSupply a callback function as argument #".concat(1 + cbParameterIndex, ".\nThis callback function will be called with the method call response.\nAlternatively, when supported, it can return a Promise if no callback function is given."));
    }
  };
}

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

  if (_Array$isArray__default['default'](data) === false) {
    data = [];
  }

  data = _filterInstanceProperty__default['default'](data).call(data, function (evt) {
    return typeof evt._i === 'string';
  });
  return data;
}

var pool = getPool();

var Tracker = /*#__PURE__*/function () {
  function Tracker() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck__default['default'](this, Tracker);

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

  _createClass__default['default'](Tracker, [{
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

      var evt = _Object$assign__default['default']({}, properties, {
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

      var str = _concatInstanceProperty__default['default'](_context = [this.client.id]).call(_context, parts).join('');

      var viewToken = btoa(String.fromCharCode.apply(null, _sliceInstanceProperty__default['default'](_context2 = md5__default['default'](str, {
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
  return fetch__default['default'](eventsTrackUrl, {
    method: 'post',
    timeout: 1000 * 20,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: _JSON$stringify__default['default']({
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

  var events = _sliceInstanceProperty__default['default'](pool).call(pool, 0, dispatchLimit);

  var nacks = 0;
  dispatching = true;
  ship(events, eventsTrackUrl).then(function (response) {
    var _context3;

    dispatching = false;

    if (dispatchRetryInterval) {
      clearInterval(dispatchRetryInterval);
      dispatchRetryInterval = null;
    }

    _forEachInstanceProperty__default['default'](_context3 = response.events).call(_context3, function (resEvent) {
      if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
        pool = _filterInstanceProperty__default['default'](pool).call(pool, function (poolEvent) {
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
      dispatchRetryInterval = _setInterval__default['default'](function () {
        return dispatch(eventsTrackUrl);
      }, 20000);
    }
  });
}

var dispatch = throttle(_dispatch, 4000);
set('event-tracker-pool', []);

try {
  window.addEventListener('beforeunload', function () {
    pool = _concatInstanceProperty__default['default'](pool).call(pool, getPool());
    set('event-tracker-pool', pool);
  }, false);
} catch (error) {}

module.exports = Tracker;
//# sourceMappingURL=index.cjs.js.map
