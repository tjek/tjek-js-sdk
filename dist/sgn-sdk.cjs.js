'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var microevent = _interopDefault(require('microevent'));
var mustache = _interopDefault(require('mustache'));
var request = _interopDefault(require('request'));
var sha256 = _interopDefault(require('sha256'));

var Config$1;
var MicroEvent;
var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

MicroEvent = microevent;

Config$1 = Config$1 = (function() {
  Config.prototype.keys = ['appVersion', 'appKey', 'appSecret', 'authToken', 'eventTracker', 'locale', 'coreSessionToken', 'coreSessionClientId', 'coreUrl', 'graphUrl', 'eventsTrackUrl', 'eventsPulseUrl', 'assetsFileUploadUrl'];

  function Config() {
    this.attrs = {};
    return;
  }

  Config.prototype.set = function(config) {
    var changedAttributes, key, value;
    if (config == null) {
      config = {};
    }
    changedAttributes = {};
    for (key in config) {
      value = config[key];
      if (indexOf.call(this.keys, key) >= 0) {
        this.attrs[key] = value;
        changedAttributes[key] = value;
      }
    }
    this.trigger('change', changedAttributes);
  };

  Config.prototype.get = function(option) {
    return this.attrs[option];
  };

  return Config;

})();

MicroEvent.mixin(Config$1);

var config$1 = Config$1;

var Mustache;

Mustache = mustache;

var i18n$1 = {
  t: function(key, view) {
    return Mustache.render(this.translations[key], view);
  },
  addTranslations: function(translations) {
    var key, value;
    for (key in translations) {
      value = translations[key];
      this.translations[key] = value;
    }
  },
  translations: {
    'paged_publication.hotspot_picker.header': 'Which offer did you mean?'
  }
};

var util$1;

util$1 = {
  isBrowser: function() {
    return typeof process !== 'undefined' && process.browser;
  },
  isNode: function() {
    return !util$1.isBrowser();
  },
  error: function(err, options) {
    var key, value;
    err.message = err.message || null;
    if (typeof options === 'string') {
      err.message = options;
    } else if (typeof options === 'object' && (options != null)) {
      for (key in options) {
        value = options[key];
        err[key] = value;
      }
      if (options.message != null) {
        err.message = options.message;
      }
      if ((options.code != null) || (options.message != null)) {
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
  uuid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  getQueryParam: function(field, url) {
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
  formatQueryParams: function(queryParams) {
    if (queryParams == null) {
      queryParams = {};
    }
    return Object.keys(queryParams).map(function(key) {
      return key + '=' + encodeURIComponent(queryParams[key]);
    }).join('&');
  },
  getRandomNumberBetween: function(from, to) {
    return Math.floor(Math.random() * to) + from;
  },
  getOS: function() {
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
  btoa: function(str) {
    var buffer;
    if (util$1.isBrowser()) {
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
  },
  getScreenDimensions: function() {
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
  getUtcOffsetSeconds: function() {
    var jan1, jan2, now, stdTimeOffset, tmp;
    now = new Date();
    jan1 = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    tmp = jan1.toGMTString();
    jan2 = new Date(tmp.substring(0, tmp.lastIndexOf(' ') - 1));
    stdTimeOffset = (jan1 - jan2) / 1000;
    return stdTimeOffset;
  },
  getUtcDstOffsetSeconds: function() {
    return new Date().getTimezoneOffset() * 60 * -1;
  },
  getColorBrightness: function(color) {
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
  find: function(arr, fn) {
    var item, j, len;
    for (j = 0, len = arr.length; j < len; j++) {
      item = arr[j];
      if (fn(item) === true) {
        return item;
      }
    }
  },
  chunk: function(arr, size) {
    var results;
    results = [];
    while (arr.length) {
      results.push(arr.splice(0, size));
    }
    return results;
  },
  throttle: function(fn, threshold, scope) {
    var deferTimer, last;
    if (threshold == null) {
      threshold = 250;
    }
    last = void 0;
    deferTimer = void 0;
    return function() {
      var args, context, now;
      context = scope || this;
      now = new Date().getTime();
      args = arguments;
      if (last && now < last + threshold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  },
  loadImage: function(src, callback) {
    var img;
    img = new Image();
    img.onload = function() {
      return callback(null, img.width, img.height);
    };
    img.onerror = function() {
      return callback(new Error());
    };
    img.src = src;
    return img;
  },
  distance: function(lat1, lng1, lat2, lng2) {
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
    parallel: function(asyncCalls, sharedCallback) {
      var allResults, counter, k, makeCallback;
      counter = asyncCalls.length;
      allResults = [];
      k = 0;
      makeCallback = function(index) {
        return function() {
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

var util_1 = util$1;

var Config;
var config;
var i18n;
var util;

Config = config$1;

i18n = i18n$1;

util = util_1;

config = new Config();

config.set({
  locale: 'en_US',
  coreUrl: 'https://api.etilbudsavis.dk',
  graphUrl: 'https://graph.service.shopgun.com',
  eventsTrackUrl: 'https://events.service.shopgun.com/track',
  eventsPulseUrl: 'wss://events.service.shopgun.com/pulse',
  assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'
});

var core = {
  config: config,
  i18n: i18n,
  util: util
};

var sgn = core;

var request$1;

request$1 = request;

var node$2 = function(options, callback) {
  var jar, requestOptions;
  if (options == null) {
    options = {};
  }
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
    options.cookies.forEach(function(cookie) {
      jar.setCookie(request$1.cookie(cookie.key + "=" + cookie.value), cookie.url);
    });
    requestOptions.jar = jar;
  }
  request$1(requestOptions, function(err, response, body) {
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

var SGN$2;
var parseCookies;

SGN$2 = sgn;

parseCookies = function(cookies) {
  var parsedCookies;
  if (cookies == null) {
    cookies = [];
  }
  parsedCookies = {};
  cookies.map(function(cookie) {
    var key, keyValuePair, parts, value;
    parts = cookie.split('; ');
    keyValuePair = parts[0].split('=');
    key = keyValuePair[0];
    value = keyValuePair[1];
    parsedCookies[key] = value;
  });
  return parsedCookies;
};

var request$2 = function(options, callback) {
  var appKey, authToken, authTokenCookieName, timeout, url;
  if (options == null) {
    options = {};
  }
  url = SGN$2.config.get('graphUrl');
  timeout = 1000 * 12;
  appKey = SGN$2.config.get('appKey');
  authToken = SGN$2.config.get('authToken');
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
    options.headers.Authorization = 'Basic ' + SGN$2.util.btoa("app-key:" + appKey);
  }
  if (SGN$2.util.isNode() && (authToken != null)) {
    options.cookies = [
      {
        key: authTokenCookieName,
        value: authToken,
        url: url
      }
    ];
  } else if (SGN$2.util.isBrowser()) {
    options.useCookies = true;
  }
  SGN$2.request(options, function(err, data) {
    var authCookie, cookies, ref;
    if (err != null) {
      callback(SGN$2.util.error(new Error('Graph request error'), {
        code: 'GraphRequestError'
      }));
    } else {
      if (SGN$2.util.isNode()) {
        cookies = parseCookies((ref = data.headers) != null ? ref['set-cookie'] : void 0);
        authCookie = cookies[authTokenCookieName];
        if (SGN$2.config.get('authToken') !== authCookie) {
          SGN$2.config.set('authToken', authCookie);
        }
      }
      if (data.statusCode === 200) {
        callback(null, data.body);
      } else {
        callback(SGN$2.util.error(new Error('Graph API error'), {
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

var SGN$4;

SGN$4 = sgn;

var request$5 = function(options, callback) {
  if (options == null) {
    options = {};
  }
  if (callback == null) {
    callback = function() {};
  }
  SGN$4.CoreKit.session.ensure(function(err) {
    var appSecret, appVersion, clientId, geo, headers, locale, qs, ref, ref1, ref2, token, url;
    if (err != null) {
      return callback(err);
    }
    url = (ref = options.url) != null ? ref : '';
    headers = (ref1 = options.headers) != null ? ref1 : {};
    token = SGN$4.config.get('coreSessionToken');
    clientId = SGN$4.config.get('coreSessionClientId');
    appVersion = SGN$4.config.get('appVersion');
    appSecret = SGN$4.config.get('appSecret');
    locale = SGN$4.config.get('locale');
    qs = (ref2 = options.qs) != null ? ref2 : {};
    geo = options.geolocation;
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = SGN$4.CoreKit.session.sign(appSecret, token);
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
      if ((geo.latitude != null) && (qs.r_lat == null)) {
        qs.r_lat = geo.latitude;
      }
      if ((geo.longitude != null) && (qs.r_lng == null)) {
        qs.r_lng = geo.longitude;
      }
      if ((geo.radius != null) && (qs.r_radius == null)) {
        qs.r_radius = geo.radius;
      }
      if ((geo.sensor != null) && (qs.r_sensor == null)) {
        qs.r_sensor = geo.sensor;
      }
    }
    return SGN$4.request({
      method: options.method,
      url: SGN$4.config.get('coreUrl') + url,
      qs: qs,
      body: options.body,
      formData: options.formData,
      headers: headers,
      json: true,
      useCookies: false
    }, function(err, data) {
      var responseToken;
      if (err != null) {
        callback(SGN$4.util.error(new Error('Core request error'), {
          code: 'CoreRequestError'
        }));
      } else {
        token = SGN$4.config.get('coreSessionToken');
        responseToken = data.headers['x-token'];
        if (token !== responseToken) {
          SGN$4.CoreKit.session.saveToken(responseToken);
        }
        if (data.statusCode >= 200 && data.statusCode < 300 || data.statusCode === 304) {
          callback(null, data.body);
        } else {
          callback(SGN$4.util.error(new Error('Core API error'), {
            code: 'CoreAPIError',
            statusCode: data.statusCode
          }), data.body);
        }
      }
    });
  });
};

var SGN$6;

SGN$6 = sgn;

var clientCookie = {
  key: 'sgn-',
  get: function(key) {
    var c, ca, ct, err, i, len, name, value;
    if (SGN$6.util.isNode()) {
      return;
    }
    try {
      name = "" + this.key + key + "=";
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
  set: function(key, value) {
    var date, days, err, str;
    if (SGN$6.util.isNode()) {
      return;
    }
    try {
      days = 365;
      date = new Date();
      str = JSON.stringify(value);
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = "" + this.key + key + "=" + str + ";expires=" + (date.toUTCString()) + ";path=/";
    } catch (error) {
      
    }
  }
};

var SGN$5;
var callbackQueue;
var clientCookieStorage;
var session$1;
var sha256$1;

SGN$5 = sgn;

sha256$1 = sha256;

clientCookieStorage = clientCookie;

callbackQueue = [];

session$1 = {
  ttl: 1 * 60 * 60 * 24 * 60,
  saveToken: function(token) {
    SGN$5.config.set({
      coreSessionToken: token
    });
    session$1.saveCookie();
  },
  saveClientId: function(clientId) {
    SGN$5.config.set({
      coreSessionClientId: clientId
    });
    session$1.saveCookie();
  },
  saveCookie: function() {
    clientCookieStorage.set('session', {
      token: SGN$5.config.get('coreSessionToken'),
      client_id: SGN$5.config.get('coreSessionClientId')
    });
  },
  create: function(callback) {
    SGN$5.request({
      method: 'post',
      url: SGN$5.config.get('coreUrl') + '/v2/sessions',
      json: true,
      qs: {
        api_key: SGN$5.config.get('appKey'),
        token_ttl: session$1.ttl
      }
    }, function(err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 201) {
        session$1.saveToken(data.body.token);
        session$1.saveClientId(data.body.client_id);
        callback(err, data.body);
      } else {
        callback(new Error('Could not create session'));
      }
    });
  },
  update: function(callback) {
    var appSecret, headers, token;
    headers = {};
    token = SGN$5.config.get('coreSessionToken');
    appSecret = SGN$5.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session$1.sign(appSecret, token);
    }
    SGN$5.request({
      url: SGN$5.config.get('coreUrl') + '/v2/sessions',
      headers: headers,
      json: true
    }, function(err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 200) {
        session$1.saveToken(data.body.token);
        session$1.saveClientId(data.body.client_id);
        callback(err, data.body);
      } else {
        callback(new Error('Could not update session'));
      }
    });
  },
  renew: function(callback) {
    var appSecret, headers, token;
    headers = {};
    token = SGN$5.config.get('coreSessionToken');
    appSecret = SGN$5.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session$1.sign(appSecret, token);
    }
    SGN$5.request({
      method: 'put',
      url: SGN$5.config.get('coreUrl') + '/v2/sessions',
      headers: headers,
      json: true
    }, function(err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 200) {
        session$1.saveToken(data.body.token);
        session$1.saveClientId(data.body.client_id);
        callback(err, data.body);
      } else {
        callback(new Error('Could not renew session'));
      }
    });
  },
  ensure: function(callback) {
    var complete, queueCount;
    queueCount = callbackQueue.length;
    complete = function(err) {
      callbackQueue = callbackQueue.filter(function(fn) {
        fn(err);
        return false;
      });
    };
    callbackQueue.push(callback);
    if (queueCount === 0) {
      if (SGN$5.config.get('coreSessionToken') == null) {
        session$1.create(complete);
      } else {
        complete();
      }
    }
  },
  sign: function(appSecret, token) {
    return sha256$1([appSecret, token].join(''));
  }
};

var session_1 = session$1;

var request$4;
var session;

request$4 = request$5;

session = session_1;

var core$2 = {
  request: request$4,
  session: session
};

var SGN;

SGN = sgn;

SGN.request = node$2;

SGN.GraphKit = graph;

SGN.CoreKit = core$2;

var node = SGN;

module.exports = node;
