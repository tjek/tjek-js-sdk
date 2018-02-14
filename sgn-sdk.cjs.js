'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var microevent = _interopDefault(require('microevent'));
var mustache = _interopDefault(require('mustache'));
var process = _interopDefault(require('process'));
var request = _interopDefault(require('request'));
var sha256 = _interopDefault(require('sha256'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Config;
var MicroEvent;
var indexOf = [].indexOf;

MicroEvent = microevent;

Config = Config = function () {
  var Config = function () {
    function Config() {
      classCallCheck(this, Config);

      this.attrs = {};
      return;
    }

    createClass(Config, [{
      key: 'set',
      value: function set$$1() {
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
      key: 'get',
      value: function get$$1(option) {
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

var Mustache;
var pairs;

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

var process$1;
var util;

process$1 = process;

util = {
  isBrowser: function isBrowser() {
    return typeof process$1 !== 'undefined' && process$1.browser;
  },
  isNode: function isNode() {
    return !util.isBrowser();
  },
  error: function error(err, options) {
    var key, value;
    err.message = err.message || null;
    if (typeof options === 'string') {
      err.message = options;
    } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options != null) {
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
    function btoa(_x2) {
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
  find: function find(arr, fn) {
    var item, j, len;
    for (j = 0, len = arr.length; j < len; j++) {
      item = arr[j];
      if (fn(item) === true) {
        return item;
      }
    }
  },
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
    var scope = arguments[2];

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

var Config$1;
var config$2;
var translations$2;
var util$1;

Config$1 = config;

translations$2 = translations;

util$1 = util_1;

config$2 = new Config$1();

// Set default values.
config$2.set({
  locale: 'en_US',
  coreUrl: 'https://api.etilbudsavis.dk',
  graphUrl: 'https://graph.service.shopgun.com',
  eventsTrackUrl: 'https://events.service.shopgun.com/track',
  eventsPulseUrl: 'wss://events.service.shopgun.com/pulse',
  assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'
});

var core = {
  config: config$2,
  translations: translations$2,
  util: util$1
};

var sgn = core;

var request$1;

request$1 = request;

var node = function node() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];

  var jar, requestOptions;
  requestOptions = {
    method: options.method,
    url: options.url,
    headers: options.headers,
    timeout: options.timeout,
    json: options.json,
    body: options.body,
    formData: options.formData,
    forever: true,
    qs: options.qs
  };
  if (Array.isArray(options.cookies)) {
    jar = request$1.jar();
    options.cookies.forEach(function (cookie) {
      jar.setCookie(request$1.cookie(cookie.key + '=' + cookie.value), cookie.url);
    });
    requestOptions.jar = jar;
  }
  request$1(requestOptions, function (err, response, body) {
    if (err != null) {
      callback(new Error());
    } else {
      callback(null, {
        statusCode: response.statusCode,
        headers: response.headers,
        body: body
      });
    }
  });
};

var SGN$1;
var parseCookies;

SGN$1 = sgn;

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

var request$2 = function request$$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];

  var appKey, authToken, authTokenCookieName, timeout, url;
  url = SGN$1.config.get('graphUrl');
  timeout = 1000 * 12;
  appKey = SGN$1.config.get('appKey');
  authToken = SGN$1.config.get('authToken');
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
    options.headers.Authorization = 'Basic ' + SGN$1.util.btoa('app-key:' + appKey);
  }
  // Set cookies manually in node.js.
  if (SGN$1.util.isNode() && authToken != null) {
    options.cookies = [{
      key: authTokenCookieName,
      value: authToken,
      url: url
    }];
  } else if (SGN$1.util.isBrowser()) {
    options.useCookies = true;
  }
  SGN$1.request(options, function (err, data) {
    var authCookie, cookies, ref;
    if (err != null) {
      callback(SGN$1.util.error(new Error('Graph request error'), {
        code: 'GraphRequestError'
      }));
    } else {
      // Update auth token as it might have changed.
      if (SGN$1.util.isNode()) {
        cookies = parseCookies((ref = data.headers) != null ? ref['set-cookie'] : void 0);
        authCookie = cookies[authTokenCookieName];
        if (SGN$1.config.get('authToken') !== authCookie) {
          SGN$1.config.set('authToken', authCookie);
        }
      }
      if (data.statusCode === 200) {
        callback(null, data.body);
      } else {
        callback(SGN$1.util.error(new Error('Graph API error'), {
          code: 'GraphAPIError',
          statusCode: data.statusCode
        }));
      }
    }
  });
};

var graph = {
  request: request$2
};

var SGN$2;
var _request;

SGN$2 = sgn;

_request = function request$$1() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var runs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  SGN$2.CoreKit.session.ensure(function (err) {
    var appSecret, appVersion, clientId, geo, headers, locale, qs, ref, ref1, ref2, token, url;
    if (err != null) {
      return callback(err);
    }
    url = (ref = options.url) != null ? ref : '';
    headers = (ref1 = options.headers) != null ? ref1 : {};
    token = SGN$2.config.get('coreSessionToken');
    clientId = SGN$2.config.get('coreSessionClientId');
    appVersion = SGN$2.config.get('appVersion');
    appSecret = SGN$2.config.get('appSecret');
    locale = SGN$2.config.get('locale');
    qs = (ref2 = options.qs) != null ? ref2 : {};
    geo = options.geolocation;
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = SGN$2.CoreKit.session.sign(appSecret, token);
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
    return SGN$2.request({
      method: options.method,
      url: SGN$2.config.get('coreUrl') + url,
      qs: qs,
      body: options.body,
      formData: options.formData,
      headers: headers,
      json: true,
      useCookies: false
    }, function (err, data) {
      var ref3, responseToken;
      if (err != null) {
        callback(SGN$2.util.error(new Error('Core request error'), {
          code: 'CoreRequestError'
        }));
      } else {
        token = SGN$2.config.get('coreSessionToken');
        responseToken = data.headers['x-token'];
        if (responseToken && token !== responseToken) {
          SGN$2.CoreKit.session.saveToken(responseToken);
        }
        if (data.statusCode >= 200 && data.statusCode < 300 || data.statusCode === 304) {
          callback(null, data.body);
        } else {
          if (runs === 0 && data.body != null && ((ref3 = data.body.code) === 1101 || ref3 === 1107 || ref3 === 1108)) {
            SGN$2.config.set({
              coreSessionToken: void 0
            });
            _request(options, callback, ++runs);
          } else {
            callback(SGN$2.util.error(new Error('Core API error'), {
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

var SGN$3;
var prefixKey;

SGN$3 = sgn;

prefixKey = 'sgn-';

var clientCookie = {
  get: function get(key) {
    var c, ca, ct, err, i, len, name, value;
    if (SGN$3.util.isNode()) {
      return;
    }
    try {
      name = '' + prefixKey + key + '=';
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
    var date, days, err, str;
    if (SGN$3.util.isNode()) {
      return;
    }
    try {
      days = 365;
      date = new Date();
      str = JSON.stringify(value);
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = '' + prefixKey + key + '=' + str + ';expires=' + date.toUTCString() + ';path=/';
    } catch (error) {
      
    }
  }
};

var SGN$4;
var callbackQueue;
var clientCookieStorage;
var renewed;
var session;
var sha256$1;

SGN$4 = sgn;

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
    SGN$4.config.set({
      coreSessionToken: token
    });
    session.saveCookie();
  },
  saveClientId: function saveClientId(clientId) {
    SGN$4.config.set({
      coreSessionClientId: clientId
    });
    session.saveCookie();
  },
  saveCookie: function saveCookie() {
    clientCookieStorage.set('session', {
      token: SGN$4.config.get('coreSessionToken'),
      client_id: SGN$4.config.get('coreSessionClientId')
    });
  },
  create: function create(callback) {
    SGN$4.request({
      method: 'post',
      url: SGN$4.config.get('coreUrl') + '/v2/sessions',
      json: true,
      qs: {
        api_key: SGN$4.config.get('appKey'),
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
    token = SGN$4.config.get('coreSessionToken');
    appSecret = SGN$4.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }
    SGN$4.request({
      url: SGN$4.config.get('coreUrl') + '/v2/sessions',
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
    token = SGN$4.config.get('coreSessionToken');
    appSecret = SGN$4.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }
    SGN$4.request({
      method: 'put',
      url: SGN$4.config.get('coreUrl') + '/v2/sessions',
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
      if (SGN$4.config.get('coreSessionToken') == null) {
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

var request$4;
var session$1;

request$4 = request_1;

session$1 = session_1;

var core$2 = {
  request: request$4,
  session: session$1
};

var SGN$6;

SGN$6 = sgn;

var fileUpload = function fileUpload() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];
  var progressCallback = arguments[2];

  var formData, timeout, url;
  if (options.file == null) {
    throw new Error('File is not defined');
  }
  url = SGN$6.config.get('assetsFileUploadUrl');
  formData = {
    file: options.file
  };
  if (options.contentType != null) {
    formData = {
      file: {
        value: options.file,
        options: {
          contentType: options.contentType
        }
      }
    };
  }
  timeout = 1000 * 60 * 60;
  SGN$6.request({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': options.contentType,
      'Accept': 'application/json'
    },
    formData: formData,
    timeout: timeout
  }, function (err, data) {
    if (err != null) {
      callback(SGN$6.util.error(new Error('Request error'), {
        code: 'RequestError'
      }));
    } else {
      if (data.statusCode === 200) {
        callback(null, JSON.parse(data.body));
      } else {
        callback(SGN$6.util.error(new Error('Request error'), {
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

var SGN$7;

SGN$7 = sgn;

SGN$7.request = node;

// Expose the different kits.
SGN$7.GraphKit = graph;

SGN$7.CoreKit = core$2;

SGN$7.AssetsKit = assets;

var node$2 = SGN$7;

module.exports = node$2;
//# sourceMappingURL=sgn-sdk.cjs.js.map
