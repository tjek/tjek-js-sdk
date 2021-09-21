'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
require('core-js/modules/es.array.join.js');
var _Array$isArray = require('@babel/runtime-corejs3/core-js-stable/array/is-array');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _Object$assign = require('@babel/runtime-corejs3/core-js-stable/object/assign');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
var _forEachInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/for-each');
var _setInterval = require('@babel/runtime-corejs3/core-js-stable/set-interval');
var fetch = require('cross-fetch');
var md5 = require('md5');
require('@babel/runtime-corejs3/core-js-stable/instance/index-of');
require('@babel/runtime-corejs3/core-js-stable/instance/last-index-of');
require('@babel/runtime-corejs3/core-js-stable/parse-int');
require('@babel/runtime-corejs3/core-js-stable/instance/splice');
var _setTimeout = require('@babel/runtime-corejs3/core-js-stable/set-timeout');
require('@babel/runtime-corejs3/core-js-stable/promise');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.regexp.constructor.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _Array$isArray__default = /*#__PURE__*/_interopDefaultLegacy(_Array$isArray);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var _concatInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_concatInstanceProperty);
var _Object$assign__default = /*#__PURE__*/_interopDefaultLegacy(_Object$assign);
var _sliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_sliceInstanceProperty);
var _JSON$stringify__default = /*#__PURE__*/_interopDefaultLegacy(_JSON$stringify);
var _forEachInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_forEachInstanceProperty);
var _setInterval__default = /*#__PURE__*/_interopDefaultLegacy(_setInterval);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var md5__default = /*#__PURE__*/_interopDefaultLegacy(md5);
var _setTimeout__default = /*#__PURE__*/_interopDefaultLegacy(_setTimeout);

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
    return JSON.parse(storage["".concat(prefixKey).concat(key)]);
  } catch (error) {}
}
function set(key, value) {
  try {
    storage["".concat(prefixKey).concat(key)] = _JSON$stringify__default['default'](value);
  } catch (error) {}
}

function isBrowser() {
  return typeof window === 'object' && typeof document === 'object';
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
  return _Array$isArray__default['default'](data) ? _filterInstanceProperty__default['default'](data).call(data, function (evt) {
    return typeof evt._i === 'string';
  }) : [];
}

var unloadHandler = function unloadHandler() {
  return set('event-tracker-pool', _concatInstanceProperty__default['default'](pool).call(pool, getPool()));
};

var pool;

var Tracker = /*#__PURE__*/function () {
  function Tracker() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck__default['default'](this, Tracker);

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

      return btoa(String.fromCharCode.apply(null, _sliceInstanceProperty__default['default'](_context = md5__default['default'](_concatInstanceProperty__default['default'](_context2 = [this.client.id]).call(_context2, parts).join(''), {
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

  var events = _sliceInstanceProperty__default['default'](pool).call(pool, 0, dispatchLimit);

  var nacks = 0;
  dispatching = true;
  fetch__default['default'](eventsTrackUrl, {
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
  }).then(function (response) {
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
}, 4000);

exports.Tracker = Tracker;
//# sourceMappingURL=index.cjs.js.map
