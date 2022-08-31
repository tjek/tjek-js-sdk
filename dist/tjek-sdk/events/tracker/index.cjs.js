'use strict';

var _asyncToGenerator = require('@babel/runtime-corejs3/helpers/asyncToGenerator');
var _createClass = require('@babel/runtime-corejs3/helpers/createClass');
var _regeneratorRuntime = require('@babel/runtime-corejs3/regenerator');
var _filterInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/filter');
var _concatInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/concat');
var _Object$assign = require('@babel/runtime-corejs3/core-js-stable/object/assign');
var _sliceInstanceProperty = require('@babel/runtime-corejs3/core-js-stable/instance/slice');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.array.join.js');
var fetch = require('cross-fetch');
var md5 = require('md5');
require('core-js/modules/es.function.name.js');
require('core-js/modules/es.regexp.constructor.js');
require('@babel/runtime-corejs3/core-js-stable/object/keys');
require('@babel/runtime-corejs3/core-js-stable/instance/splice');
require('core-js/modules/web.dom-collections.for-each.js');
require('core-js/modules/es.string.match.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _filterInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_filterInstanceProperty);
var _concatInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_concatInstanceProperty);
var _Object$assign__default = /*#__PURE__*/_interopDefaultLegacy(_Object$assign);
var _sliceInstanceProperty__default = /*#__PURE__*/_interopDefaultLegacy(_sliceInstanceProperty);
var _JSON$stringify__default = /*#__PURE__*/_interopDefaultLegacy(_JSON$stringify);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var md5__default = /*#__PURE__*/_interopDefaultLegacy(md5);

var eventsTrackUrl = 'https://wolf-api.tjek.com/sync';

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

var isBrowser = function isBrowser() {
  return typeof window === 'object' && typeof document === 'object';
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

  _proto.trackPagedPublicationPageOpened = function trackPagedPublicationPageOpened(properties, version) {
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

module.exports = Tracker;
//# sourceMappingURL=index.cjs.js.map
