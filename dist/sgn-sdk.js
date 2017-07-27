(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SGN = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var SGN, process;

if (typeof process === 'undefined') {
  process = {
    browser: true
  };
}

SGN = _dereq_('./sgn');

SGN.request = _dereq_('./request/browser');

SGN.AuthKit = _dereq_('./kits/auth');

SGN.AssetsKit = _dereq_('./kits/assets');

SGN.EventsKit = _dereq_('./kits/events');

SGN.GraphKit = _dereq_('./kits/graph');

SGN.CoreKit = _dereq_('./kits/core');

SGN.PagedPublicationKit = _dereq_('./kits/paged_publication');

SGN.storage = {
  local: _dereq_('./storage/client_local'),
  cookie: _dereq_('./storage/client_cookie')
};

SGN.client = (function() {
  var firstOpen, id;
  id = SGN.storage.local.get('client-id');
  firstOpen = id == null;
  if (firstOpen) {
    id = SGN.util.uuid();
    SGN.storage.local.set('client-id', id);
  }
  return {
    firstOpen: firstOpen,
    id: id
  };
})();

SGN.startSession = function() {
  var eventTracker;
  eventTracker = SGN.config.get('eventTracker');
  if (eventTracker != null) {
    if (SGN.client.firstOpen === true) {
      eventTracker.trackEvent('first-client-session-opened', {}, '1.0.0');
    }
    eventTracker.trackEvent('client-session-opened', {}, '1.0.0');
  }
};

module.exports = SGN;


},{"./kits/assets":6,"./kits/auth":7,"./kits/core":8,"./kits/events":11,"./kits/graph":13,"./kits/paged_publication":20,"./request/browser":27,"./sgn":28,"./storage/client_cookie":29,"./storage/client_local":30}],2:[function(_dereq_,module,exports){
var attrs, keys,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

attrs = {};

keys = ['appVersion', 'appKey', 'appSecret', 'authToken', 'eventTracker', 'locale'];

module.exports = {
  set: function(config) {
    var key, value;
    if (config == null) {
      config = {};
    }
    for (key in config) {
      value = config[key];
      if (indexOf.call(keys, key) >= 0) {
        attrs[key] = value;
      }
    }
  },
  get: function(option) {
    return attrs[option];
  }
};


},{}],3:[function(_dereq_,module,exports){
var config, util;

config = _dereq_('./config');

util = _dereq_('./util');

module.exports = {
  config: config,
  util: util
};


},{"./config":2,"./util":31}],4:[function(_dereq_,module,exports){
module.exports = {
  ESC: 27,
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  SPACE: 32,
  NUMBER_ONE: 49
};


},{}],5:[function(_dereq_,module,exports){
var SGN;

SGN = _dereq_('../../sgn');

module.exports = function(options, callback, progressCallback) {
  var body, timeout, url;
  if (options == null) {
    options = {};
  }
  if (options.file == null) {
    throw new Error('File is not defined');
  }
  url = 'https://assets.service.shopgun.com/upload';
  body = new FormData();
  timeout = 1000 * 60 * 60;
  body.append('file', options.file);
  SGN.request({
    method: 'post',
    url: url,
    body: body,
    timeout: timeout,
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, data) {
    if (err != null) {
      callback(SGN.util.error(new Error('Request error'), {
        code: 'RequestError'
      }));
    } else {
      if (data.statusCode === 200) {
        callback(null, JSON.parse(data.body));
      } else {
        callback(SGN.util.error(new Error('Request error'), {
          code: 'RequestError',
          statusCode: data.statusCode
        }));
      }
    }
  }, function(loaded, total) {
    if (typeof progressCallback === 'function') {
      progressCallback({
        progress: loaded / total,
        loaded: loaded,
        total: total
      });
    }
  });
};


},{"../../sgn":28}],6:[function(_dereq_,module,exports){
module.exports = {
  fileUpload: _dereq_('./file_upload')
};


},{"./file_upload":5}],7:[function(_dereq_,module,exports){
module.exports = {};


},{}],8:[function(_dereq_,module,exports){
var SGN, request, session;

SGN = _dereq_('../../sgn');

request = _dereq_('./request');

session = _dereq_('./session');

module.exports = {
  baseUrl: 'https://api.etilbudsavis.dk',
  request: request,
  session: session
};


},{"../../sgn":28,"./request":9,"./session":10}],9:[function(_dereq_,module,exports){
var SGN;

SGN = _dereq_('../../sgn');

module.exports = function(options, callback) {
  if (options == null) {
    options = {};
  }
  if (callback == null) {
    callback = function() {};
  }
  SGN.CoreKit.session.ensure(function(err) {
    var appSecret, appVersion, clientId, geo, headers, locale, qs, ref, ref1, token;
    if (err != null) {
      return callback(err);
    }
    headers = (ref = options.headers) != null ? ref : {};
    token = SGN.CoreKit.session.get('token');
    clientId = SGN.CoreKit.session.get('client_id');
    appVersion = SGN.config.get('appVersion');
    appSecret = SGN.config.get('appSecret');
    locale = SGN.config.get('locale');
    qs = (ref1 = options.qs) != null ? ref1 : {};
    geo = options.geolocation;
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = SGN.CoreKit.session.sign(appSecret, token);
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
    return SGN.request({
      method: options.method,
      url: SGN.CoreKit.baseUrl + options.url,
      qs: qs,
      body: options.body,
      headers: headers,
      useCookies: false
    }, function(err, data) {
      var responseToken;
      if (err != null) {
        callback(SGN.util.error(new Error('Core request error'), {
          code: 'CoreRequestError'
        }));
      } else {
        token = SGN.CoreKit.session.get('token');
        responseToken = data.headers['x-token'];
        if (token !== responseToken) {
          SGN.CoreKit.session.set('token', responseToken);
        }
        if (data.statusCode >= 200 && data.statusCode < 300 || data.statusCode === 304) {
          callback(null, JSON.parse(data.body));
        } else {
          callback(SGN.util.error(new Error('Core API error'), {
            code: 'CoreAPIError',
            statusCode: data.statusCode
          }));
        }
      }
    });
  });
};


},{"../../sgn":28}],10:[function(_dereq_,module,exports){
var SGN, clientCookieStorage, session, sha256;

SGN = _dereq_('../../sgn');

sha256 = _dereq_('sha256');

clientCookieStorage = _dereq_('../../storage/client_cookie');

session = {
  tokenTTL: 1 * 60 * 60 * 24 * 60,
  attrs: (function() {
    var ref;
    return (ref = clientCookieStorage.get('sessions')) != null ? ref : {};
  })(),
  callbackQueue: [],
  getUrl: function() {
    return SGN.CoreKit.baseUrl + '/v2/sessions';
  },
  get: function(key) {
    var appKey, ref, ref1;
    appKey = SGN.config.get('appKey');
    if (key != null) {
      return (ref = session.attrs[appKey]) != null ? ref[key] : void 0;
    } else {
      return (ref1 = session.attrs[appKey]) != null ? ref1 : {};
    }
  },
  set: function(key, value) {
    var appKey, attrs, sessions;
    attrs = null;
    if (typeof key === 'object') {
      attrs = key;
    } else if (typeof key === 'string' && (value != null)) {
      attrs = session.attrs;
      attrs[key] = value;
    }
    appKey = SGN.config.get('appKey');
    sessions = clientCookieStorage.get('sessions');
    if (sessions == null) {
      sessions = {};
    }
    sessions[appKey] = attrs;
    clientCookieStorage.set('sessions', sessions);
    session.attrs = sessions;
  },
  create: function(callback) {
    SGN.request({
      method: 'post',
      url: session.getUrl(),
      headers: {
        'Accept': 'application/json'
      },
      qs: {
        api_key: SGN.config.get('appKey'),
        token_ttl: session.tokenTTL
      }
    }, function(err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 201) {
        session.set(JSON.parse(data.body));
        callback(err, session.get());
      } else {
        callback(new Error('Could not create session'));
      }
    });
  },
  update: function(callback) {
    var appSecret, headers, token;
    headers = {};
    token = session.get('token');
    appSecret = SGN.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }
    headers['Accept'] = 'application/json';
    SGN.request({
      url: session.getUrl(),
      headers: headers
    }, function(err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 200) {
        session.set(JSON.parse(data.body));
        callback(err, session.get());
      } else {
        callback(new Error('Could not update session'));
      }
    });
  },
  renew: function(callback) {
    var appSecret, headers, token;
    headers = {};
    token = session.get('token');
    appSecret = SGN.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }
    headers['Accept'] = 'application/json';
    SGN.request({
      method: 'put',
      url: session.getUrl(),
      headers: headers
    }, function(err, data) {
      if (err != null) {
        callback(err);
      } else if (data.statusCode === 200) {
        session.set(JSON.parse(data.body));
        callback(err, session.get());
      } else {
        callback(new Error('Could not renew session'));
      }
    });
  },
  ensure: function(callback) {
    var complete, queueCount;
    queueCount = session.callbackQueue.length;
    complete = function(err) {
      session.callbackQueue = session.callbackQueue.filter(function(fn) {
        fn(err);
        return false;
      });
    };
    session.callbackQueue.push(callback);
    if (queueCount === 0) {
      if (session.get('token') == null) {
        session.create(complete);
      } else if (session.willExpireSoon(session.get('expires'))) {
        session.renew(complete);
      } else {
        complete();
      }
    }
  },
  willExpireSoon: function(expires) {
    return Date.now() >= Date.parse(expires) - 1000 * 60 * 60 * 24;
  },
  sign: function(appSecret, token) {
    return sha256([appSecret, token].join(''));
  }
};

module.exports = session;


},{"../../sgn":28,"../../storage/client_cookie":29,"sha256":41}],11:[function(_dereq_,module,exports){
module.exports = {
  Tracker: _dereq_('./tracker')
};


},{"./tracker":12}],12:[function(_dereq_,module,exports){
var SGN, Tracker, clientLocalStorage, getPool, pool;

SGN = _dereq_('../../sgn');

clientLocalStorage = _dereq_('../../storage/client_local');

getPool = function() {
  var data;
  data = clientLocalStorage.get('event-tracker-pool');
  if (Array.isArray(data) === false) {
    data = [];
  }
  return data;
};

pool = getPool();

clientLocalStorage.set('event-tracker-pool', []);

try {
  window.addEventListener('unload', function() {
    pool = pool.concat(getPool());
    clientLocalStorage.set('event-tracker-pool', pool);
  }, false);
} catch (error) {}

module.exports = Tracker = (function() {
  Tracker.prototype.defaultOptions = {
    baseUrl: 'https://events.service.shopgun.com',
    trackId: null,
    dispatchInterval: 3000,
    dispatchLimit: 100,
    poolLimit: 1000,
    dryRun: false
  };

  function Tracker(options) {
    var key, ref, value;
    if (options == null) {
      options = {};
    }
    ref = this.defaultOptions;
    for (key in ref) {
      value = ref[key];
      this[key] = options[key] || value;
    }
    this.dispatching = false;
    this.session = {
      id: SGN.util.uuid()
    };
    this.client = {
      trackId: this.trackId,
      id: SGN.client.id
    };
    this.view = {
      path: [],
      previousPath: [],
      uri: null
    };
    this.location = {};
    this.application = {};
    this.identity = {};
    this.interval = setInterval(this.dispatch.bind(this), this.dispatchInterval);
    return;
  }

  Tracker.prototype.trackEvent = function(type, properties, version) {
    if (properties == null) {
      properties = {};
    }
    if (version == null) {
      version = '1.0.0';
    }
    if (typeof type !== 'string') {
      throw SGN.util.error(new Error('Event type is required'));
    }
    if (this.trackId == null) {
      return;
    }
    pool.push({
      id: SGN.util.uuid(),
      type: type,
      version: version,
      recordedAt: new Date().toISOString(),
      sentAt: null,
      client: {
        id: this.client.id,
        trackId: this.client.trackId
      },
      context: this.getContext(),
      properties: properties
    });
    while (this.getPoolSize() > this.poolLimit) {
      pool.shift();
    }
    return this;
  };

  Tracker.prototype.identify = function(id) {
    this.identity.id = id;
    return this;
  };

  Tracker.prototype.setLocation = function(location) {
    var ref, ref1;
    if (location == null) {
      location = {};
    }
    this.location.determinedAt = new Date(location.timestamp).toISOString();
    this.location.latitude = location.latitude;
    this.location.longitude = location.longitude;
    this.location.altitude = location.altitude;
    this.location.accuracy = {
      horizontal: (ref = location.accuracy) != null ? ref.horizontal : void 0,
      vertical: (ref1 = location.accuracy) != null ? ref1.vertical : void 0
    };
    this.location.speed = location.speed;
    this.location.floor = location.floor;
    return this;
  };

  Tracker.prototype.setApplication = function(application) {
    if (application == null) {
      application = {};
    }
    this.application.name = application.name;
    this.application.version = application.version;
    this.application.build = application.build;
    return this;
  };

  Tracker.prototype.setView = function(path) {
    this.view.previousPath = this.view.path;
    if (Array.isArray(path) === true) {
      this.view.path = path;
    }
    this.view.uri = window.location.href;
    return this;
  };

  Tracker.prototype.getView = function() {
    var view;
    view = {};
    if (this.view.path.length > 0) {
      view.path = this.view.path;
    }
    if (this.view.previousPath.length > 0) {
      view.previousPath = this.view.previousPath;
    }
    if (this.view.uri != null) {
      view.uri = this.view.uri;
    }
    return view;
  };

  Tracker.prototype.getContext = function() {
    var application, campaign, context, loc, os, ref, ref1, screenDimensions;
    screenDimensions = SGN.util.getScreenDimensions();
    os = SGN.util.getOS();
    context = {
      userAgent: window.navigator.userAgent,
      locale: navigator.language,
      timeZone: {
        utcOffsetSeconds: SGN.util.getUtcOffsetSeconds(),
        utcDstOffsetSeconds: SGN.util.getUtcDstOffsetSeconds()
      },
      device: {
        screen: {
          width: screenDimensions.physical.width,
          height: screenDimensions.physical.height,
          density: screenDimensions.density
        }
      },
      session: {
        id: this.session.id
      },
      view: this.getView()
    };
    application = {
      name: this.application.name,
      version: this.application.version,
      build: this.application.build
    };
    campaign = {
      source: SGN.util.getQueryParam('utm_source'),
      medium: SGN.util.getQueryParam('utm_medium'),
      name: SGN.util.getQueryParam('utm_campaign'),
      term: SGN.util.getQueryParam('utm_term'),
      content: SGN.util.getQueryParam('utm_content')
    };
    loc = {
      determinedAt: this.location.determinedAt,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      altitude: this.location.altitude,
      speed: this.location.speed,
      floor: this.location.floor,
      accuracy: {
        horizontal: (ref = this.location.accuracy) != null ? ref.horizontal : void 0,
        vertical: (ref1 = this.location.accuracy) != null ? ref1.vertical : void 0
      }
    };
    if (os != null) {
      context.os = {
        name: os
      };
    }
    if (document.referrer.length > 0) {
      context.session.referrer = document.referrer;
    }
    ['name', 'version', 'build'].forEach(function(key) {
      if (typeof application[key] !== 'string' || application[key].length === 0) {
        delete application[key];
      }
    });
    if (Object.keys(application).length > 0) {
      context.application = application;
    }
    ['source', 'medium', 'name', 'term', 'content'].forEach(function(key) {
      if (typeof campaign[key] !== 'string' || campaign[key].length === 0) {
        delete campaign[key];
      }
    });
    if (Object.keys(campaign).length > 0) {
      context.campaign = campaign;
    }
    ['latitude', 'longitude', 'altitude', 'speed', 'floor'].forEach(function(key) {
      if (typeof loc[key] !== 'number') {
        delete loc[key];
      }
    });
    if (typeof loc.accuracy.horizontal !== 'number') {
      delete loc.accuracy.horizontal;
    }
    if (typeof loc.accuracy.vertical !== 'number') {
      delete loc.accuracy.vertical;
    }
    if (Object.keys(loc.accuracy).length === 0) {
      delete loc.accuracy;
    }
    if (typeof loc.determinedAt !== 'string' || loc.determinedAt.length === 0) {
      delete loc.determinedAt;
    }
    if (Object.keys(loc).length > 0) {
      context.location = loc;
    }
    if (this.identity.id != null) {
      context.personId = this.identity.id;
    }
    return context;
  };

  Tracker.prototype.getPoolSize = function() {
    return pool.length;
  };

  Tracker.prototype.dispatch = function() {
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
    this.ship(events, (function(_this) {
      return function(err, response) {
        _this.dispatching = false;
        if (err == null) {
          response.events.forEach(function(resEvent) {
            if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
              pool = pool.filter(function(poolEvent) {
                return poolEvent.id !== resEvent.id;
              });
            } else if ('nack') {
              nacks++;
            }
          });
          if (_this.getPoolSize() >= _this.dispatchLimit && nacks === 0) {
            _this.dispatch();
          }
        }
      };
    })(this));
    return this;
  };

  Tracker.prototype.ship = function(events, callback) {
    var http, payload, url;
    if (events == null) {
      events = [];
    }
    http = new XMLHttpRequest();
    url = this.baseUrl + '/track';
    payload = {
      events: events.map(function(event) {
        event.sentAt = new Date().toISOString();
        return event;
      })
    };
    http.open('POST', url);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('Accept', 'application/json');
    http.timeout = 1000 * 20;
    http.onload = function() {
      var err;
      if (http.status === 200) {
        try {
          callback(null, JSON.parse(http.responseText));
        } catch (error) {
          err = error;
          callback(SGN.util.error(new Error('Could not parse JSON')));
        }
      } else {
        callback(SGN.util.error(new Error('Server did not accept request')));
      }
    };
    http.onerror = function() {
      callback(SGN.util.error(new Error('Could not perform network request')));
    };
    http.send(JSON.stringify(payload));
    return this;
  };

  return Tracker;

})();


},{"../../sgn":28,"../../storage/client_local":30}],13:[function(_dereq_,module,exports){
module.exports = {
  baseUrl: 'https://graph.service.shopgun.com',
  request: _dereq_('./request')
};


},{"./request":14}],14:[function(_dereq_,module,exports){
var SGN, parseCookies;

SGN = _dereq_('../../sgn');

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

module.exports = function(options, callback) {
  var appKey, authToken, authTokenCookieName, timeout, url;
  if (options == null) {
    options = {};
  }
  url = SGN.GraphKit.baseUrl;
  timeout = 1000 * 12;
  appKey = SGN.config.get('appKey');
  authToken = SGN.config.get('authToken');
  authTokenCookieName = 'shopgun-auth-token';
  options = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: timeout,
    body: JSON.stringify({
      query: options.query,
      operationName: options.operationName,
      variables: options.variables
    })
  };
  if (appKey != null) {
    options.headers.Authorization = 'Basic ' + SGN.util.btoa("app-key:" + appKey);
  }
  if (SGN.util.isNode() && (authToken != null)) {
    options.cookies = [
      {
        key: authTokenCookieName,
        value: authToken,
        url: url
      }
    ];
  } else if (SGN.util.isBrowser()) {
    options.useCookies = true;
  }
  SGN.request(options, function(err, data) {
    var authCookie, cookies, ref;
    if (err != null) {
      callback(SGN.util.error(new Error('Graph request error'), {
        code: 'GraphRequestError'
      }));
    } else {
      if (SGN.util.isNode()) {
        cookies = parseCookies((ref = data.headers) != null ? ref['set-cookie'] : void 0);
        authCookie = cookies[authTokenCookieName];
        if (SGN.config.get('authToken') !== authCookie) {
          SGN.config.set('authToken', authCookie);
        }
      }
      if (data.statusCode === 200) {
        callback(null, JSON.parse(data.body));
      } else {
        callback(SGN.util.error(new Error('Graph API error'), {
          code: 'GraphAPIError',
          statusCode: data.statusCode
        }));
      }
    }
  });
};


},{"../../sgn":28}],15:[function(_dereq_,module,exports){
var MicroEvent, PagedPublicationControls, SGN, keyCodes;

MicroEvent = _dereq_('microevent');

SGN = _dereq_('../../sgn');

keyCodes = _dereq_('../../key_codes');

PagedPublicationControls = (function() {
  function PagedPublicationControls(el, options) {
    this.options = options != null ? options : {};
    this.els = {
      root: el,
      progress: el.querySelector('.sgn-pp__progress'),
      progressBar: el.querySelector('.sgn-pp-progress__bar'),
      progressLabel: el.querySelector('.sgn-pp__progress-label'),
      prevControl: el.querySelector('.sgn-pp__control[data-direction=prev]'),
      nextControl: el.querySelector('.sgn-pp__control[data-direction=next]')
    };
    this.keyDownListener = SGN.util.throttle(this.keyDown, 150, this);
    this.mouseMoveListener = SGN.util.throttle(this.mouseMove, 50, this);
    if (this.options.keyboard === true) {
      this.els.root.addEventListener('keydown', this.keyDownListener, false);
    }
    this.els.root.addEventListener('mousemove', this.mouseMoveListener, false);
    if (this.els.prevControl != null) {
      this.els.prevControl.addEventListener('click', this.prevClicked.bind(this), false);
    }
    if (this.els.nextControl != null) {
      this.els.nextControl.addEventListener('click', this.nextClicked.bind(this), false);
    }
    this.bind('beforeNavigation', this.beforeNavigation.bind(this));
    return;
  }

  PagedPublicationControls.prototype.destroy = function() {
    this.els.root.removeEventListener('keydown', this.keyDownListener);
    this.els.root.removeEventListener('mousemove', this.mouseMoveListener);
  };

  PagedPublicationControls.prototype.beforeNavigation = function(e) {
    var showProgress, visibilityClassName;
    showProgress = typeof e.progressLabel === 'string' && e.progressLabel.length > 0;
    visibilityClassName = 'sgn-pp--hidden';
    if ((this.els.progress != null) && (this.els.progressBar != null)) {
      this.els.progressBar.style.width = e.progress + "%";
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
  };

  PagedPublicationControls.prototype.prevClicked = function(e) {
    e.preventDefault();
    this.trigger('prev');
  };

  PagedPublicationControls.prototype.nextClicked = function(e) {
    e.preventDefault();
    this.trigger('next');
  };

  PagedPublicationControls.prototype.keyDown = function(e) {
    var keyCode;
    keyCode = e.keyCode;
    if (keyCodes.ARROW_LEFT === keyCode) {
      this.trigger('prev', {
        duration: 0
      });
    } else if (keyCodes.ARROW_RIGHT === keyCode || keyCodes.SPACE === keyCode) {
      this.trigger('next', {
        duration: 0
      });
    } else if (keyCodes.NUMBER_ONE === keyCode) {
      this.trigger('first', {
        duration: 0
      });
    }
  };

  PagedPublicationControls.prototype.mouseMove = function() {
    this.els.root.dataset.mouseMoving = true;
    clearTimeout(this.mouseMoveTimeout);
    this.mouseMoveTimeout = setTimeout((function(_this) {
      return function() {
        _this.els.root.dataset.mouseMoving = false;
      };
    })(this), 4000);
  };

  return PagedPublicationControls;

})();

MicroEvent.mixin(PagedPublicationControls);

module.exports = PagedPublicationControls;


},{"../../key_codes":4,"../../sgn":28,"microevent":38}],16:[function(_dereq_,module,exports){
var MicroEvent, PageSpreads, PagedPublicationCore, SGN, clientLocalStorage;

MicroEvent = _dereq_('microevent');

PageSpreads = _dereq_('./page_spreads');

clientLocalStorage = _dereq_('../../storage/client_local');

SGN = _dereq_('../../sgn');

PagedPublicationCore = (function() {
  PagedPublicationCore.prototype.defaults = {
    pages: [],
    pageSpreadWidth: 100,
    pageSpreadMaxZoomScale: 4,
    idleDelay: 1000,
    resizeDelay: 400,
    color: '#ffffff'
  };

  function PagedPublicationCore(el, options) {
    if (options == null) {
      options = {};
    }
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
    this.setColor(this.getOption('color'));
    this.els.pages.parentNode.insertBefore(this.pageSpreads.update(this.pageMode).getFrag(), this.els.pages);
    this.verso = this.createVerso();
    this.bind('started', this.start.bind(this));
    this.bind('destroyed', this.destroy.bind(this));
    return;
  }

  PagedPublicationCore.prototype.start = function() {
    this.getVerso().start();
    this.visibilityChangeListener = this.visibilityChange.bind(this);
    this.resizeListener = SGN.util.throttle(this.resize, this.getOption('resizeDelay'), this);
    this.unloadListener = this.unload.bind(this);
    document.addEventListener('visibilitychange', this.visibilityChangeListener, false);
    window.addEventListener('resize', this.resizeListener, false);
    window.addEventListener('beforeunload', this.unloadListener, false);
    this.els.root.setAttribute('data-started', '');
    this.els.root.setAttribute('tabindex', '-1');
    this.els.root.focus();
  };

  PagedPublicationCore.prototype.destroy = function() {
    this.getVerso().destroy();
    document.removeEventListener('visibilitychange', this.visibilityChangeListener, false);
    window.removeEventListener('resize', this.resizeListener, false);
  };

  PagedPublicationCore.prototype.makeOptions = function(options, defaults) {
    var key, opts, ref, value;
    opts = {};
    for (key in options) {
      value = options[key];
      opts[key] = (ref = options[key]) != null ? ref : defaults[key];
    }
    return opts;
  };

  PagedPublicationCore.prototype.getOption = function(key) {
    return this.options[key];
  };

  PagedPublicationCore.prototype.setColor = function(color) {
    this.els.root.dataset.colorBrightness = SGN.util.getColorBrightness(color);
    this.els.root.style.backgroundColor = color;
  };

  PagedPublicationCore.prototype.createVerso = function() {
    var Verso, verso;
    Verso = _dereq_('verso-browser');
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
    verso.bind('panStart', this.panStart.bind(this));
    verso.bind('panEnd', this.panEnd.bind(this));
    verso.bind('zoomedIn', this.zoomedIn.bind(this));
    verso.bind('zoomedOut', this.zoomedOut.bind(this));
    return verso;
  };

  PagedPublicationCore.prototype.getVerso = function() {
    return this.verso;
  };

  PagedPublicationCore.prototype.getContentRect = function(pageSpread) {
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
    scale = this.getVerso().transform.scale;
    pageWidth = pageEl.offsetWidth * pageCount * scale;
    pageHeight = pageEl.offsetHeight * scale;
    imageRatio = +pageEl.dataset.height / (+pageEl.dataset.width * pageCount);
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
  };

  PagedPublicationCore.prototype.formatProgressLabel = function(pageSpread) {
    var label, pageCount, pageIds, pageLabels, pages, ref;
    pages = (ref = pageSpread != null ? pageSpread.options.pages : void 0) != null ? ref : [];
    pageIds = pages.map(function(page) {
      return page.id;
    });
    pageLabels = pages.map(function(page) {
      return page.label;
    });
    pageCount = this.getOption('pages').length;
    label = pageIds.length > 0 ? pageLabels.join('-') + ' / ' + pageCount : null;
    return label;
  };

  PagedPublicationCore.prototype.renderPageSpreads = function() {
    this.getVerso().pageSpreads.forEach((function(_this) {
      return function(pageSpread) {
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
      };
    })(this));
    return this;
  };

  PagedPublicationCore.prototype.findPage = function(pageId) {
    return this.getOption('pages').find(function(page) {
      return page.id === pageId;
    });
  };

  PagedPublicationCore.prototype.pageLoaded = function(e) {
    this.trigger('pageLoaded', e);
  };

  PagedPublicationCore.prototype.pagesLoaded = function(e) {
    this.trigger('pagesLoaded', e);
  };

  PagedPublicationCore.prototype.beforeNavigation = function(e) {
    var pageSpread, pageSpreadCount, position, progress, progressLabel, versoPageSpread;
    position = e.newPosition;
    versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
    pageSpread = this.pageSpreads.get(versoPageSpread.getId());
    pageSpreadCount = this.getVerso().getPageSpreadCount();
    progress = (position + 1) / pageSpreadCount * 100;
    progressLabel = this.formatProgressLabel(pageSpread);
    this.renderPageSpreads();
    this.resetIdleTimer();
    this.startIdleTimer();
    this.trigger('beforeNavigation', {
      verso: e,
      pageSpread: pageSpread,
      progress: progress,
      progressLabel: progressLabel,
      pageSpreadCount: pageSpreadCount
    });
  };

  PagedPublicationCore.prototype.afterNavigation = function(e) {
    var pageSpread, position, versoPageSpread;
    position = e.newPosition;
    versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
    pageSpread = this.pageSpreads.get(versoPageSpread.getId());
    this.trigger('afterNavigation', {
      verso: e,
      pageSpread: pageSpread
    });
  };

  PagedPublicationCore.prototype.attemptedNavigation = function(e) {
    this.trigger('attemptedNavigation', {
      verso: e
    });
  };

  PagedPublicationCore.prototype.clicked = function(e) {
    var page, pageId;
    if (e.isInsideContent) {
      pageId = e.pageEl.dataset.id;
      page = this.findPage(pageId);
      this.trigger('clicked', {
        verso: e,
        page: page
      });
    }
  };

  PagedPublicationCore.prototype.doubleClicked = function(e) {
    var page, pageId;
    if (e.isInsideContent) {
      pageId = e.pageEl.dataset.id;
      page = this.findPage(pageId);
      this.trigger('doubleClicked', {
        verso: e,
        page: page
      });
    }
  };

  PagedPublicationCore.prototype.pressed = function(e) {
    var page, pageId;
    if (e.isInsideContent) {
      pageId = e.pageEl.dataset.id;
      page = this.findPage(pageId);
      this.trigger('pressed', {
        verso: e,
        page: page
      });
    }
  };

  PagedPublicationCore.prototype.panStart = function() {
    this.resetIdleTimer();
    this.trigger('panStart', {
      scale: this.getVerso().transform.scale
    });
  };

  PagedPublicationCore.prototype.panEnd = function() {
    this.startIdleTimer();
    this.trigger('panEnd');
  };

  PagedPublicationCore.prototype.zoomedIn = function(e) {
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
  };

  PagedPublicationCore.prototype.zoomedOut = function(e) {
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
  };

  PagedPublicationCore.prototype.getPageMode = function() {
    var height, pageMode, width;
    pageMode = this.getOption('pageMode');
    if (pageMode == null) {
      width = this.els.root.offsetWidth;
      height = this.els.root.offsetHeight;
      pageMode = height >= width ? 'single' : 'double';
    }
    return pageMode;
  };

  PagedPublicationCore.prototype.resetIdleTimer = function() {
    clearTimeout(this.idleTimeout);
    this.els.root.setAttribute('data-idle', false);
    return this;
  };

  PagedPublicationCore.prototype.startIdleTimer = function() {
    this.idleTimeout = setTimeout((function(_this) {
      return function() {
        _this.els.root.setAttribute('data-idle', true);
      };
    })(this), this.getOption('idleDelay'));
    return this;
  };

  PagedPublicationCore.prototype.switchPageMode = function(pageMode) {
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
  };

  PagedPublicationCore.prototype.overridePageSpreadContentRect = function(pageSpread) {
    if (pageSpread.getType() === 'page') {
      return pageSpread.getContentRect = (function(_this) {
        return function() {
          return _this.getContentRect(pageSpread);
        };
      })(this);
    }
  };

  PagedPublicationCore.prototype.visibilityChange = function() {
    var eventName, pageSpread;
    pageSpread = this.getVerso().getPageSpreadFromPosition(this.getVerso().getPosition());
    eventName = document.hidden === true ? 'disappeared' : 'appeared';
    this.trigger(eventName, {
      pageSpread: this.pageSpreads.get(pageSpread.id)
    });
  };

  PagedPublicationCore.prototype.resize = function() {
    var pageMode;
    pageMode = this.getPageMode();
    if ((this.getOption('pageMode') == null) && pageMode !== this.pageMode) {
      this.switchPageMode(pageMode);
    } else {
      this.trigger('resized');
    }
  };

  PagedPublicationCore.prototype.unload = function() {
    this.trigger('disappeared');
  };

  return PagedPublicationCore;

})();

MicroEvent.mixin(PagedPublicationCore);

module.exports = PagedPublicationCore;


},{"../../sgn":28,"../../storage/client_local":30,"./page_spreads":23,"microevent":38,"verso-browser":42}],17:[function(_dereq_,module,exports){
var MicroEvent, PagedPublicationEventTracking,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MicroEvent = _dereq_('microevent');

PagedPublicationEventTracking = (function() {
  function PagedPublicationEventTracking() {
    this.doubleClicked = bind(this.doubleClicked, this);
    this.hidden = true;
    this.pageSpread = null;
    this.bind('appeared', this.appeared.bind(this));
    this.bind('disappeared', this.disappeared.bind(this));
    this.bind('beforeNavigation', this.beforeNavigation.bind(this));
    this.bind('afterNavigation', this.afterNavigation.bind(this));
    this.bind('attemptedNavigation', this.attemptedNavigation.bind(this));
    this.bind('clicked', this.clicked.bind(this));
    this.bind('doubleClicked', this.doubleClicked.bind(this));
    this.bind('pressed', this.pressed.bind(this));
    this.bind('panStart', this.panStart.bind(this));
    this.bind('zoomedIn', this.zoomedIn.bind(this));
    this.bind('zoomedOut', this.zoomedOut.bind(this));
    this.bind('destroyed', this.destroy.bind(this));
    this.trackOpened();
    this.trackAppeared();
    return;
  }

  PagedPublicationEventTracking.prototype.destroy = function() {
    this.pageSpreadDisappeared();
    this.trackDisappeared();
  };

  PagedPublicationEventTracking.prototype.trackEvent = function(type, properties) {
    if (properties == null) {
      properties = {};
    }
    this.trigger('trackEvent', {
      type: type,
      properties: properties
    });
  };

  PagedPublicationEventTracking.prototype.trackOpened = function(properties) {
    this.trackEvent('paged-publication-opened', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackAppeared = function(properties) {
    this.trackEvent('paged-publication-appeared', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackDisappeared = function(properties) {
    this.trackEvent('paged-publication-disappeared', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageClicked = function(properties) {
    this.trackEvent('paged-publication-page-clicked', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageDoubleClicked = function(properties) {
    this.trackEvent('paged-publication-page-double-clicked', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageLongPressed = function(properties) {
    this.trackEvent('paged-publication-page-long-pressed', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageHotspotsClicked = function(properties) {
    this.trackEvent('paged-publication-page-hotspots-clicked', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageSpreadAppeared = function(properties) {
    this.trackEvent('paged-publication-page-spread-appeared', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageSpreadDisappeared = function(properties) {
    this.trackEvent('paged-publication-page-spread-disappeared', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageSpreadZoomedIn = function(properties) {
    this.trackEvent('paged-publication-page-spread-zoomed-in', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.trackPageSpreadZoomedOut = function(properties) {
    this.trackEvent('paged-publication-page-spread-zoomed-out', properties);
    return this;
  };

  PagedPublicationEventTracking.prototype.appeared = function(e) {
    this.trackAppeared();
    this.pageSpreadAppeared(e.pageSpread);
  };

  PagedPublicationEventTracking.prototype.disappeared = function() {
    this.pageSpreadDisappeared();
    this.trackDisappeared();
  };

  PagedPublicationEventTracking.prototype.beforeNavigation = function() {
    this.pageSpreadDisappeared();
  };

  PagedPublicationEventTracking.prototype.afterNavigation = function(e) {
    this.pageSpreadAppeared(e.pageSpread);
  };

  PagedPublicationEventTracking.prototype.attemptedNavigation = function(e) {
    this.pageSpreadAppeared(e.pageSpread);
  };

  PagedPublicationEventTracking.prototype.clicked = function(e) {
    var properties;
    if (e.page != null) {
      properties = {
        pageNumber: e.page.pageNumber,
        x: e.verso.pageX,
        y: e.verso.pageY
      };
      this.trackPageClicked({
        pagedPublicationPage: properties
      });
      if (e.verso.overlayEls.length > 0) {
        this.trackPageHotspotsClicked({
          pagedPublicationPage: properties
        });
      }
    }
  };

  PagedPublicationEventTracking.prototype.doubleClicked = function(e) {
    if (e.page != null) {
      this.trackPageDoubleClicked({
        pagedPublicationPage: {
          pageNumber: e.page.pageNumber,
          x: e.verso.pageX,
          y: e.verso.pageY
        }
      });
    }
  };

  PagedPublicationEventTracking.prototype.pressed = function(e) {
    if (e.page != null) {
      this.trackPageLongPressed({
        pagedPublicationPage: {
          pageNumber: e.page.pageNumber,
          x: e.verso.pageX,
          y: e.verso.pageY
        }
      });
    }
  };

  PagedPublicationEventTracking.prototype.panStart = function(e) {
    if (e.scale === 1) {
      this.pageSpreadDisappeared();
    }
  };

  PagedPublicationEventTracking.prototype.zoomedIn = function(e) {
    if (e.pageSpread != null) {
      this.trackPageSpreadZoomedIn({
        pagedPublicationPageSpread: {
          pageNumbers: e.pageSpread.getPages().map(function(page) {
            return page.pageNumber;
          })
        }
      });
    }
  };

  PagedPublicationEventTracking.prototype.zoomedOut = function(e) {
    if (e.pageSpread != null) {
      this.trackPageSpreadZoomedOut({
        pagedPublicationPageSpread: {
          pageNumbers: e.pageSpread.getPages().map(function(page) {
            return page.pageNumber;
          })
        }
      });
    }
  };

  PagedPublicationEventTracking.prototype.pageSpreadAppeared = function(pageSpread) {
    if ((pageSpread != null) && this.hidden === true) {
      this.pageSpread = pageSpread;
      this.trackPageSpreadAppeared({
        pagedPublicationPageSpread: {
          pageNumbers: pageSpread.getPages().map(function(page) {
            return page.pageNumber;
          })
        }
      });
      this.hidden = false;
    }
  };

  PagedPublicationEventTracking.prototype.pageSpreadDisappeared = function() {
    if ((this.pageSpread != null) && this.hidden === false) {
      this.trackPageSpreadDisappeared({
        pagedPublicationPageSpread: {
          pageNumbers: this.pageSpread.getPages().map(function(page) {
            return page.pageNumber;
          })
        }
      });
      this.hidden = true;
      this.pageSpread = null;
    }
  };

  return PagedPublicationEventTracking;

})();

MicroEvent.mixin(PagedPublicationEventTracking);

module.exports = PagedPublicationEventTracking;


},{"microevent":38}],18:[function(_dereq_,module,exports){
var Gator, MicroEvent, Mustache, PagedPublicationHotspotPicker, keyCodes, template;

MicroEvent = _dereq_('microevent');

Gator = _dereq_('gator');

Mustache = _dereq_('mustache');

template = _dereq_('./templates/hotspot_picker');

keyCodes = _dereq_('../../key_codes');

PagedPublicationHotspotPicker = (function() {
  function PagedPublicationHotspotPicker(options) {
    this.options = options != null ? options : {};
    this.el = document.createElement('div');
    this.resizeListener = this.resize.bind(this);
    return;
  }

  PagedPublicationHotspotPicker.prototype.render = function() {
    var header, height, parentHeight, parentWidth, popoverEl, ref, trigger, view, width;
    width = (ref = this.options.width) != null ? ref : 100;
    header = this.options.header;
    if (this.options.template != null) {
      template = this.options.template;
    }
    trigger = this.trigger.bind(this);
    view = {
      header: header,
      hotspots: this.options.hotspots,
      top: this.options.y,
      left: this.options.x
    };
    this.el.className = 'sgn-pp__hotspot-picker';
    this.el.setAttribute('tabindex', -1);
    this.el.innerHTML = Mustache.render(template, view);
    popoverEl = this.el.querySelector('.sgn__popover');
    width = popoverEl.offsetWidth;
    height = popoverEl.offsetHeight;
    parentWidth = this.el.parentNode.offsetWidth;
    parentHeight = this.el.parentNode.offsetHeight;
    if (view.top + height > parentHeight) {
      popoverEl.style.top = parentHeight - height + 'px';
    }
    if (view.left + width > parentWidth) {
      popoverEl.style.left = parentWidth - width + 'px';
    }
    this.el.addEventListener('keyup', this.keyUp.bind(this));
    Gator(this.el).on('click', '[data-id]', function() {
      trigger('selected', {
        id: this.getAttribute('data-id')
      });
    });
    Gator(this.el).on('click', '[data-close]', this.destroy.bind(this));
    window.addEventListener('resize', this.resizeListener, false);
    return this;
  };

  PagedPublicationHotspotPicker.prototype.destroy = function() {
    this.el.parentNode.removeChild(this.el);
    this.trigger('destroyed');
  };

  PagedPublicationHotspotPicker.prototype.keyUp = function(e) {
    if (e.keyCode === keyCodes.ESC) {
      this.destroy();
    }
  };

  PagedPublicationHotspotPicker.prototype.resize = function() {
    window.removeEventListener('resize', this.resizeListener);
    this.destroy();
  };

  return PagedPublicationHotspotPicker;

})();

MicroEvent.mixin(PagedPublicationHotspotPicker);

module.exports = PagedPublicationHotspotPicker;


},{"../../key_codes":4,"./templates/hotspot_picker":25,"gator":36,"microevent":38,"mustache":39}],19:[function(_dereq_,module,exports){
var MicroEvent, Mustache, PagedPublicationHotspots, template;

MicroEvent = _dereq_('microevent');

Mustache = _dereq_('mustache');

template = _dereq_('./templates/hotspot');

PagedPublicationHotspots = (function() {
  function PagedPublicationHotspots() {
    this.currentPageSpreadId = null;
    this.pageSpreadsLoaded = {};
    this.cache = {};
    this.bind('hotspotsReceived', this.hotspotsReceived.bind(this));
    this.bind('afterNavigation', this.afterNavigation.bind(this));
    this.bind('pagesLoaded', this.pagesLoaded.bind(this));
    this.bind('resized', this.resized.bind(this));
    return;
  }

  PagedPublicationHotspots.prototype.renderHotspots = function(data) {
    var contentRect, el, frag, hotspot, hotspotEl, hotspotEls, i, id, len, pageSpreadEl, position, ref;
    frag = document.createDocumentFragment();
    contentRect = data.versoPageSpread.getContentRect();
    pageSpreadEl = data.pageSpread.getEl();
    hotspotEls = pageSpreadEl.querySelectorAll('.sgn-pp__hotspot');
    for (i = 0, len = hotspotEls.length; i < len; i++) {
      hotspotEl = hotspotEls[i];
      hotspotEl.parentNode.removeChild(hotspotEl);
    }
    ref = data.hotspots;
    for (id in ref) {
      hotspot = ref[id];
      position = this.getPosition(data.pages, data.ratio, hotspot);
      el = this.renderHotspot(hotspot, position, contentRect);
      frag.appendChild(el);
    }
    pageSpreadEl.appendChild(frag);
    return this;
  };

  PagedPublicationHotspots.prototype.renderHotspot = function(hotspot, position, contentRect) {
    var el, height, left, ref, top, width;
    el = document.createElement('div');
    top = Math.round(contentRect.height / 100 * position.top);
    left = Math.round(contentRect.width / 100 * position.left);
    width = Math.round(contentRect.width / 100 * position.width);
    height = Math.round(contentRect.height / 100 * position.height);
    top += Math.round(contentRect.top);
    left += Math.round(contentRect.left);
    el.className = 'sgn-pp__hotspot verso__overlay';
    if (hotspot.id != null) {
      el.setAttribute('data-id', hotspot.id);
    }
    if (hotspot.type != null) {
      el.setAttribute('data-type', hotspot.type);
    }
    el.innerHTML = Mustache.render((ref = hotspot.template) != null ? ref : template, hotspot);
    el.style.top = top + "px";
    el.style.left = left + "px";
    el.style.width = width + "px";
    el.style.height = height + "px";
    return el;
  };

  PagedPublicationHotspots.prototype.getPosition = function(pages, ratio, hotspot) {
    var height, maxX, maxY, minX, minY, pageNumber, pageNumbers, width;
    minX = null;
    minY = null;
    maxX = null;
    maxY = null;
    pageNumbers = pages.map(function(page) {
      return page.pageNumber;
    });
    for (pageNumber in hotspot.locations) {
      if (pageNumbers.indexOf(+pageNumber) === -1) {
        continue;
      }
      hotspot.locations[pageNumber].forEach(function(coords) {
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
  };

  PagedPublicationHotspots.prototype.requestHotspots = function(pageSpreadId, pages) {
    this.trigger('hotspotsRequested', {
      id: pageSpreadId,
      pages: pages
    });
  };

  PagedPublicationHotspots.prototype.hotspotsReceived = function(e) {
    var pageSpreadId;
    pageSpreadId = e.pageSpread.getId();
    this.setCache(pageSpreadId, e);
    this.renderHotspots(e);
  };

  PagedPublicationHotspots.prototype.getCache = function(pageSpreadId) {
    return this.cache[pageSpreadId];
  };

  PagedPublicationHotspots.prototype.setCache = function(pageSpreadId, data) {
    this.cache[pageSpreadId] = data;
    return this;
  };

  PagedPublicationHotspots.prototype.afterNavigation = function(e) {
    var id;
    if (e.pageSpread == null) {
      return;
    }
    id = e.pageSpread.getId();
    this.currentPageSpreadId = id;
    if (this.pageSpreadsLoaded[id]) {
      this.requestHotspots(id, e.pageSpread.getPages());
    }
  };

  PagedPublicationHotspots.prototype.pagesLoaded = function(e) {
    this.pageSpreadsLoaded[e.pageSpreadId] = true;
    if (this.currentPageSpreadId === e.pageSpreadId) {
      this.requestHotspots(e.pageSpreadId, e.pages);
    }
  };

  PagedPublicationHotspots.prototype.resized = function(e) {
    var data;
    data = this.getCache(this.currentPageSpreadId);
    if (data != null) {
      this.renderHotspots(data);
    }
  };

  return PagedPublicationHotspots;

})();

MicroEvent.mixin(PagedPublicationHotspots);

module.exports = PagedPublicationHotspots;


},{"./templates/hotspot":24,"microevent":38,"mustache":39}],20:[function(_dereq_,module,exports){
module.exports = {
  Viewer: _dereq_('./viewer'),
  HotspotPicker: _dereq_('./hotspot_picker')
};


},{"./hotspot_picker":18,"./viewer":26}],21:[function(_dereq_,module,exports){
var MicroEvent, PagedPublicationLegacyEventTracking;

MicroEvent = _dereq_('microevent');

PagedPublicationLegacyEventTracking = (function() {
  function PagedPublicationLegacyEventTracking() {
    this.bind('eventTracked', this.eventTracked.bind(this));
    this.zoomedIn = false;
    this.appearedAt = null;
    return;
  }

  PagedPublicationLegacyEventTracking.prototype.trackEvent = function(e) {
    this.trigger('trackEvent', e);
  };

  PagedPublicationLegacyEventTracking.prototype.eventTracked = function(e) {
    if (e.type === 'paged-publication-page-spread-appeared') {
      this.appearedAt = Date.now();
    }
    if (e.type === 'paged-publication-page-spread-disappeared') {
      this.trigger('trackEvent', {
        type: this.zoomedIn ? 'zoom' : 'view',
        ms: Date.now() - this.appearedAt,
        orientation: this.getOrientation(),
        pages: e.properties.pagedPublicationPageSpread.pageNumbers
      });
    } else if (e.type === 'paged-publication-page-spread-zoomed-in') {
      this.trigger('trackEvent', {
        type: 'view',
        ms: this.getDuration(),
        orientation: this.getOrientation(),
        pages: e.properties.pagedPublicationPageSpread.pageNumbers
      });
      this.zoomedIn = true;
      this.appearedAt = Date.now();
    } else if (e.type === 'paged-publication-page-spread-zoomed-out') {
      this.trigger('trackEvent', {
        type: 'zoom',
        ms: this.getDuration(),
        orientation: this.getOrientation(),
        pages: e.properties.pagedPublicationPageSpread.pageNumbers
      });
      this.zoomedIn = false;
      this.appearedAt = Date.now();
    }
  };

  PagedPublicationLegacyEventTracking.prototype.getOrientation = function() {
    if (window.innerWidth >= window.innerHeight) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  };

  PagedPublicationLegacyEventTracking.prototype.getDuration = function() {
    return Date.now() - this.appearedAt;
  };

  return PagedPublicationLegacyEventTracking;

})();

MicroEvent.mixin(PagedPublicationLegacyEventTracking);

module.exports = PagedPublicationLegacyEventTracking;


},{"microevent":38}],22:[function(_dereq_,module,exports){
var MicroEvent, PagedPublicationPageSpread, SGN;

MicroEvent = _dereq_('microevent');

SGN = _dereq_('../../sgn');

PagedPublicationPageSpread = (function() {
  function PagedPublicationPageSpread(options) {
    this.options = options != null ? options : {};
    this.contentsRendered = false;
    this.hotspotsRendered = false;
    this.el = this.renderEl();
    return;
  }

  PagedPublicationPageSpread.prototype.getId = function() {
    return this.options.id;
  };

  PagedPublicationPageSpread.prototype.getEl = function() {
    return this.el;
  };

  PagedPublicationPageSpread.prototype.getPages = function() {
    return this.options.pages;
  };

  PagedPublicationPageSpread.prototype.renderEl = function() {
    var el, pageIds;
    el = document.createElement('div');
    pageIds = this.getPages().map(function(page) {
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
  };

  PagedPublicationPageSpread.prototype.renderContents = function() {
    var el, id, imageLoads, pageCount, pages;
    id = this.getId();
    el = this.getEl();
    pages = this.getPages();
    pageCount = pages.length;
    imageLoads = 0;
    pages.forEach((function(_this) {
      return function(page, i) {
        var image, loaderEl, pageEl;
        image = page.images.medium;
        pageEl = document.createElement('div');
        loaderEl = document.createElement('div');
        pageEl.className = 'sgn-pp__page verso__page';
        if (page.id != null) {
          pageEl.dataset.id = page.id;
        }
        if (pageCount === 2) {
          pageEl.className += i === 0 ? ' verso-page--verso' : ' verso-page--recto';
        }
        pageEl.appendChild(loaderEl);
        el.appendChild(pageEl);
        loaderEl.className = 'sgn-pp-page__loader';
        loaderEl.innerHTML = "<span>" + page.label + "</span>";
        SGN.util.loadImage(image, function(err, width, height) {
          var isComplete;
          if (err == null) {
            isComplete = ++imageLoads === pageCount;
            pageEl.style.backgroundImage = "url(" + image + ")";
            pageEl.dataset.width = width;
            pageEl.dataset.height = height;
            pageEl.innerHTML = '&nbsp;';
            if (isComplete) {
              el.dataset.zoomable = true;
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
      };
    })(this));
    this.contentsRendered = true;
    return this;
  };

  PagedPublicationPageSpread.prototype.clearContents = function(pageSpread, versoPageSpread) {
    this.el.innerHTML = '';
    this.contentsRendered = false;
    return this;
  };

  PagedPublicationPageSpread.prototype.zoomIn = function() {
    var pageEls, pages;
    pageEls = [].slice.call(this.el.querySelectorAll('.sgn-pp__page'));
    pages = this.getPages();
    pageEls.forEach((function(_this) {
      return function(pageEl) {
        var id, image, page;
        id = pageEl.dataset.id;
        page = pages.find(function(page) {
          return page.id === id;
        });
        image = page.images.large;
        SGN.util.loadImage(image, function(err) {
          if ((err == null) && _this.el.dataset.active === 'true') {
            pageEl.dataset.image = pageEl.style.backgroundImage;
            pageEl.style.backgroundImage = "url(" + image + ")";
          }
        });
      };
    })(this));
  };

  PagedPublicationPageSpread.prototype.zoomOut = function() {
    var pageEls;
    pageEls = [].slice.call(this.el.querySelectorAll('.sgn-pp__page[data-image]'));
    pageEls.forEach(function(pageEl) {
      pageEl.style.backgroundImage = pageEl.dataset.image;
      delete pageEl.dataset.image;
    });
  };

  return PagedPublicationPageSpread;

})();

MicroEvent.mixin(PagedPublicationPageSpread);

module.exports = PagedPublicationPageSpread;


},{"../../sgn":28,"microevent":38}],23:[function(_dereq_,module,exports){
var MicroEvent, PageSpread, PagedPublicationPageSpreads, SGN;

MicroEvent = _dereq_('microevent');

PageSpread = _dereq_('./page_spread');

SGN = _dereq_('../../sgn');

PagedPublicationPageSpreads = (function() {
  function PagedPublicationPageSpreads(options) {
    this.options = options;
    this.collection = [];
    this.ids = {};
    return;
  }

  PagedPublicationPageSpreads.prototype.get = function(id) {
    return this.ids[id];
  };

  PagedPublicationPageSpreads.prototype.getFrag = function() {
    var frag;
    frag = document.createDocumentFragment();
    this.collection.forEach(function(pageSpread) {
      return frag.appendChild(pageSpread.el);
    });
    return frag;
  };

  PagedPublicationPageSpreads.prototype.update = function(pageMode) {
    var firstPage, ids, lastPage, maxZoomScale, midstPageSpreads, pageSpreads, pages, width;
    if (pageMode == null) {
      pageMode = 'single';
    }
    pageSpreads = [];
    ids = {};
    pages = this.options.pages.slice();
    width = this.options.width;
    maxZoomScale = this.options.maxZoomScale;
    if (pageMode === 'single') {
      pages.forEach(function(page) {
        return pageSpreads.push([page]);
      });
    } else {
      firstPage = pages.shift();
      lastPage = pages.length % 2 === 1 ? pages.pop() : null;
      midstPageSpreads = SGN.util.chunk(pages, 2);
      if (firstPage != null) {
        pageSpreads.push([firstPage]);
      }
      midstPageSpreads.forEach(function(midstPages) {
        return pageSpreads.push(midstPages.map(function(page) {
          return page;
        }));
      });
      if (lastPage != null) {
        pageSpreads.push([lastPage]);
      }
    }
    this.collection = pageSpreads.map((function(_this) {
      return function(pages, i) {
        var id, pageSpread;
        id = pageMode + "-" + i;
        pageSpread = new PageSpread({
          width: width,
          maxZoomScale: maxZoomScale,
          pages: pages,
          id: id
        });
        pageSpread.bind('pageLoaded', function(e) {
          return _this.trigger('pageLoaded', e);
        });
        pageSpread.bind('pagesLoaded', function(e) {
          return _this.trigger('pagesLoaded', e);
        });
        ids[id] = pageSpread;
        return pageSpread;
      };
    })(this));
    this.ids = ids;
    return this;
  };

  return PagedPublicationPageSpreads;

})();

MicroEvent.mixin(PagedPublicationPageSpreads);

module.exports = PagedPublicationPageSpreads;


},{"../../sgn":28,"./page_spread":22,"microevent":38}],24:[function(_dereq_,module,exports){
module.exports = "";


},{}],25:[function(_dereq_,module,exports){
module.exports = "<div class=\"sgn-pp-hotspot-picker__background\" data-close></div>\n<div class=\"sgn__popover\" style=\"top: {{top}}px; left: {{left}}px;\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#hotspots}}\n                <li data-id=\"{{id}}\">\n                    <p>{{title}}</p>\n                    <p>{{subtitle}}</p>\n                </li>\n            {{/hotspots}}\n        </ul>\n    </div>\n</div>";


},{}],26:[function(_dereq_,module,exports){
var Controls, Core, EventTracking, Hotspots, LegacyEventTracking, MicroEvent, SGN, Viewer;

MicroEvent = _dereq_('microevent');

SGN = _dereq_('../../core');

Core = _dereq_('./core');

Hotspots = _dereq_('./hotspots');

Controls = _dereq_('./controls');

EventTracking = _dereq_('./event_tracking');

LegacyEventTracking = _dereq_('./legacy_event_tracking');

Viewer = (function() {
  function Viewer(el, options1) {
    this.el = el;
    this.options = options1 != null ? options1 : {};
    this._core = new Core(this.el, {
      id: this.options.id,
      pages: this.options.pages,
      pageSpreadWidth: this.options.pageSpreadWidth,
      pageSpreadMaxZoomScale: this.options.pageSpreadMaxZoomScale,
      idleDelay: this.options.idleDelay,
      resizeDelay: this.options.resizeDelay,
      color: this.options.color
    });
    this._hotspots = new Hotspots();
    this._controls = new Controls(this.el, {
      keyboard: this.options.keyboard
    });
    this._eventTracking = new EventTracking();
    this._legacyEventTracking = new LegacyEventTracking();
    this.viewSession = SGN.util.uuid();
    this._setupEventListeners();
    return;
  }

  Viewer.prototype.start = function() {
    this._core.trigger('started');
    return this;
  };

  Viewer.prototype.destroy = function() {
    this._core.trigger('destroyed');
    this._hotspots.trigger('destroyed');
    this._controls.trigger('destroyed');
    this._eventTracking.trigger('destroyed');
    this.el.parentNode.removeChild(this.el);
    return this;
  };

  Viewer.prototype.navigateTo = function(position, options) {
    this._core.getVerso().navigateTo(position, options);
    return this;
  };

  Viewer.prototype.first = function(options) {
    this._core.getVerso().first(options);
    return this;
  };

  Viewer.prototype.prev = function(options) {
    this._core.getVerso().prev(options);
    return this;
  };

  Viewer.prototype.next = function(options) {
    this._core.getVerso().next(options);
    return this;
  };

  Viewer.prototype.last = function(options) {
    this._core.getVerso().last(options);
    return this;
  };

  Viewer.prototype._trackEvent = function(e) {
    var eventTracker, idType, key, properties, ref, type, value;
    type = e.type;
    idType = 'legacy';
    properties = {
      pagedPublication: {
        id: [idType, this.options.id],
        ownedBy: [idType, this.options.ownedBy]
      }
    };
    eventTracker = this.options.eventTracker;
    ref = e.properties;
    for (key in ref) {
      value = ref[key];
      properties[key] = value;
    }
    if (eventTracker != null) {
      eventTracker.trackEvent(type, properties);
    }
  };

  Viewer.prototype._trackLegacyEvent = function(e) {
    var eventTracker, geolocation;
    eventTracker = this.options.eventTracker;
    geolocation = {};
    if (eventTracker != null) {
      geolocation.latitude = eventTracker.location.latitude;
      geolocation.longitude = eventTracker.location.longitude;
      if (geolocation.latitude != null) {
        geolocation.sensor = true;
      }
      SGN.CoreKit.request({
        geolocation: geolocation,
        method: 'post',
        url: "/v2/catalogs/" + this.options.id + "/collect",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: e.type,
          ms: e.ms,
          orientation: e.orientation,
          pages: e.pages.join(','),
          view_session: this.viewSession
        })
      });
    }
  };

  Viewer.prototype._setupEventListeners = function() {
    this._eventTracking.bind('trackEvent', (function(_this) {
      return function(e) {
        _this._trackEvent(e);
        _this._legacyEventTracking.trigger('eventTracked', e);
      };
    })(this));
    this._legacyEventTracking.bind('trackEvent', (function(_this) {
      return function(e) {
        _this._trackLegacyEvent(e);
      };
    })(this));
    this._controls.bind('prev', (function(_this) {
      return function(e) {
        _this.prev(e);
      };
    })(this));
    this._controls.bind('next', (function(_this) {
      return function(e) {
        _this.next(e);
      };
    })(this));
    this._controls.bind('first', (function(_this) {
      return function(e) {
        _this.first(e);
      };
    })(this));
    this._controls.bind('last', (function(_this) {
      return function(e) {
        _this.last();
      };
    })(this));
    this._hotspots.bind('hotspotsRequested', (function(_this) {
      return function(e) {
        _this.trigger('hotspotsRequested', e);
      };
    })(this));
    this._core.bind('appeared', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('appeared', e);
        _this.trigger('appeared', e);
      };
    })(this));
    this._core.bind('disappeared', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('disappeared', e);
        _this.trigger('disappeared', e);
      };
    })(this));
    this._core.bind('beforeNavigation', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('beforeNavigation', e);
        _this._controls.trigger('beforeNavigation', e);
        _this.trigger('beforeNavigation', e);
      };
    })(this));
    this._core.bind('afterNavigation', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('afterNavigation', e);
        _this.trigger('afterNavigation', e);
      };
    })(this));
    this._core.bind('attemptedNavigation', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('attemptedNavigation', e);
        _this.trigger('attemptedNavigation', e);
      };
    })(this));
    this._core.bind('clicked', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('clicked', e);
        _this.trigger('clicked', e);
      };
    })(this));
    this._core.bind('doubleClicked', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('doubleClicked', e);
        _this.trigger('doubleClicked', e);
      };
    })(this));
    this._core.bind('pressed', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('pressed', e);
        _this.trigger('pressed', e);
      };
    })(this));
    this._core.bind('panStart', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('panStart', e);
        _this.trigger('panStart', e);
      };
    })(this));
    this._core.bind('zoomedIn', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('zoomedIn', e);
        _this.trigger('zoomedIn', e);
      };
    })(this));
    this._core.bind('zoomedOut', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('zoomedOut', e);
        _this.trigger('zoomedOut', e);
      };
    })(this));
    this._core.bind('pageLoaded', (function(_this) {
      return function(e) {
        _this._eventTracking.trigger('pageLoaded', e);
        _this.trigger('pageLoaded', e);
      };
    })(this));
    this._core.bind('afterNavigation', (function(_this) {
      return function(e) {
        _this._hotspots.trigger('afterNavigation', e);
        _this.trigger('afterNavigation', e);
      };
    })(this));
    this._core.bind('pagesLoaded', (function(_this) {
      return function(e) {
        _this._hotspots.trigger('pagesLoaded', e);
        _this.trigger('pagesLoaded', e);
      };
    })(this));
    this._core.bind('resized', (function(_this) {
      return function(e) {
        _this._hotspots.trigger('resized');
        _this.trigger('resized', e);
      };
    })(this));
    this.bind('hotspotsReceived', (function(_this) {
      return function(e) {
        _this._hotspots.trigger('hotspotsReceived', {
          pageSpread: _this._core.pageSpreads.get(e.id),
          versoPageSpread: _this._core.getVerso().pageSpreads.find(function(pageSpread) {
            return pageSpread.getId() === e.id;
          }),
          ratio: e.ratio,
          pages: e.pages,
          hotspots: e.hotspots
        });
      };
    })(this));
  };

  return Viewer;

})();

MicroEvent.mixin(Viewer);

module.exports = Viewer;


},{"../../core":3,"./controls":15,"./core":16,"./event_tracking":17,"./hotspots":19,"./legacy_event_tracking":21,"microevent":38}],27:[function(_dereq_,module,exports){
var SGN;

SGN = _dereq_('../sgn');

module.exports = function(options, callback, progressCallback) {
  var header, http, method, queryParams, ref, ref1, url, value;
  if (options == null) {
    options = {};
  }
  http = new XMLHttpRequest();
  method = (ref = options.method) != null ? ref : 'get';
  url = options.url;
  if (options.qs != null) {
    queryParams = SGN.util.formatQueryParams(options.qs);
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
  if (options.headers != null) {
    ref1 = options.headers;
    for (header in ref1) {
      value = ref1[header];
      http.setRequestHeader(header, value);
    }
  }
  http.addEventListener('load', function() {
    var headers;
    headers = http.getAllResponseHeaders().split('\r\n');
    headers = headers.reduce(function(acc, current, i) {
      var parts;
      parts = current.split(': ');
      acc[parts[0].toLowerCase()] = parts[1];
      return acc;
    }, {});
    callback(null, {
      statusCode: http.status,
      headers: headers,
      body: http.responseText
    });
  });
  http.addEventListener('error', function() {
    callback(new Error());
  });
  http.addEventListener('timeout', function() {
    callback(new Error());
  });
  http.addEventListener('progress', function(e) {
    if (e.lengthComputable && typeof progressCallback === 'function') {
      progressCallback(e.loaded, e.total);
    }
  });
  http.send(options.body);
};


},{"../sgn":28}],28:[function(_dereq_,module,exports){
module.exports = _dereq_('./core');


},{"./core":3}],29:[function(_dereq_,module,exports){
var SGN;

SGN = _dereq_('../sgn');

module.exports = {
  key: 'sgn-',
  get: function(key) {
    var c, ca, ct, err, i, len, name, value;
    if (SGN.util.isNode()) {
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
      err = error;
      value = {};
    }
    return value;
  },
  set: function(key, value) {
    var date, days, err, str;
    if (SGN.util.isNode()) {
      return;
    }
    try {
      days = 365;
      date = new Date();
      str = JSON.stringify(value);
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = "" + this.key + key + "=" + str + ";expires=" + (date.toUTCString()) + ";path=/";
    } catch (error) {
      err = error;
    }
  }
};


},{"../sgn":28}],30:[function(_dereq_,module,exports){
var SGN;

SGN = _dereq_('../sgn');

module.exports = {
  key: 'sgn-',
  storage: (function() {
    var storage;
    try {
      storage = window.localStorage;
      storage[this.key + "test-storage"] = 'foobar';
      delete storage[this.key + "test-storage"];
      return storage;
    } catch (error) {
      return {};
    }
  })(),
  get: function(key) {
    try {
      return JSON.parse(this.storage["" + this.key + key]);
    } catch (error) {}
  },
  set: function(key, value) {
    try {
      this.storage["" + this.key + key] = JSON.stringify(value);
    } catch (error) {}
    return this;
  }
};


},{"../sgn":28}],31:[function(_dereq_,module,exports){
(function (process,Buffer){
var util;

util = {
  isBrowser: function() {
    return typeof process !== 'undefined' && process.browser;
  },
  isNode: function() {
    return !util.isBrowser();
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

module.exports = util;


}).call(this,_dereq_('_process'),_dereq_("buffer").Buffer)

},{"_process":40,"buffer":33}],32:[function(_dereq_,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],33:[function(_dereq_,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = _dereq_('base64-js')
var ieee754 = _dereq_('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (value instanceof ArrayBuffer) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || string instanceof ArrayBuffer) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":32,"ieee754":37}],34:[function(_dereq_,module,exports){
!function(globals) {
'use strict'

var convertHex = {
  bytesToHex: function(bytes) {
    /*if (typeof bytes.byteLength != 'undefined') {
      var newBytes = []

      if (typeof bytes.buffer != 'undefined')
        bytes = new DataView(bytes.buffer)
      else
        bytes = new DataView(bytes)

      for (var i = 0; i < bytes.byteLength; ++i) {
        newBytes.push(bytes.getUint8(i))
      }
      bytes = newBytes
    }*/
    return arrBytesToHex(bytes)
  },
  hexToBytes: function(hex) {
    if (hex.length % 2 === 1) throw new Error("hexToBytes can't have a string with an odd number of characters.")
    if (hex.indexOf('0x') === 0) hex = hex.slice(2)
    return hex.match(/../g).map(function(x) { return parseInt(x,16) })
  }
}


// PRIVATE

function arrBytesToHex(bytes) {
  return bytes.map(function(x) { return padLeft(x.toString(16),2) }).join('')
}

function padLeft(orig, len) {
  if (orig.length > len) return orig
  return Array(len - orig.length + 1).join('0') + orig
}


if (typeof module !== 'undefined' && module.exports) { //CommonJS
  module.exports = convertHex
} else {
  globals.convertHex = convertHex
}

}(this);
},{}],35:[function(_dereq_,module,exports){
!function(globals) {
'use strict'

var convertString = {
  bytesToString: function(bytes) {
    return bytes.map(function(x){ return String.fromCharCode(x) }).join('')
  },
  stringToBytes: function(str) {
    return str.split('').map(function(x) { return x.charCodeAt(0) })
  }
}

//http://hossa.in/2012/07/20/utf-8-in-javascript.html
convertString.UTF8 = {
   bytesToString: function(bytes) {
    return decodeURIComponent(escape(convertString.bytesToString(bytes)))
  },
  stringToBytes: function(str) {
   return convertString.stringToBytes(unescape(encodeURIComponent(str)))
  }
}

if (typeof module !== 'undefined' && module.exports) { //CommonJS
  module.exports = convertString
} else {
  globals.convertString = convertString
}

}(this);
},{}],36:[function(_dereq_,module,exports){
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
(function() {
    var _matcher,
        _level = 0,
        _id = 0,
        _handlers = {},
        _gatorInstances = {};

    function _addEvent(gator, type, callback) {

        // blur and focus do not bubble up but if you use event capturing
        // then you will get them
        var useCapture = type == 'blur' || type == 'focus';
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
        }

        // if it doesn't match a native browser method
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
        if (selector == '_root') {
            return boundElement;
        }

        // if we have moved up to the element you bound the event to
        // then we have come too far
        if (element === boundElement) {
            return;
        }

        // if this is a match then we are done!
        if (_getMatcher(element).call(element, selector)) {
            return element;
        }

        // if this element did not match but has a parent we should try
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
        }

        // if there is no event type specified then remove all events
        // example: Gator(element).off()
        if (!event) {
            for (var type in _handlers[gator.id]) {
                if (_handlers[gator.id].hasOwnProperty(type)) {
                    _handlers[gator.id][type] = {};
                }
            }
            return;
        }

        // if no callback or selector is specified remove all events of this type
        // example: Gator(element).off('click')
        if (!callback && !selector) {
            _handlers[gator.id][event] = {};
            return;
        }

        // if a selector is specified but no callback remove all events
        // for this selector
        // example: Gator(element).off('click', '.sub-element')
        if (!callback) {
            delete _handlers[gator.id][event][selector];
            return;
        }

        // if we have specified an event type, selector, and callback then we
        // need to make sure there are callbacks tied to this selector to
        // begin with.  if there aren't then we can stop here
        if (!_handlers[gator.id][event][selector]) {
            return;
        }

        // if there are then loop through all the callbacks and if we find
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
            j = 0;

        // find all events that match
        _level = 0;
        for (selector in _handlers[id][type]) {
            if (_handlers[id][type].hasOwnProperty(selector)) {
                match = _matchesSelector(target, selector, _gatorInstances[id].element);

                if (match && Gator.matchesEvent(type, _gatorInstances[id].element, match, selector == '_root', e)) {
                    _level++;
                    _handlers[id][type][selector].match = match;
                    matches[_level] = _handlers[id][type][selector];
                }
            }
        }

        // stopPropagation() fails to set cancelBubble to true in Webkit
        // @see http://code.google.com/p/chromium/issues/detail?id=162270
        e.stopPropagation = function() {
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

        if (!callback && typeof(selector) == 'function') {
            callback = selector;
            selector = '_root';
        }

        var id = this.id,
            i;

        function _getGlobalCallback(type) {
            return function(e) {
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
    Gator.prototype.on = function(events, selector, callback) {
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
    Gator.prototype.off = function(events, selector, callback) {
        return _bind.call(this, events, selector, callback, true);
    };

    Gator.matchesSelector = function() {};
    Gator.cancel = _cancel;
    Gator.addEvent = _addEvent;
    Gator.matchesEvent = function() {
        return true;
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Gator;
    }

    window.Gator = Gator;
}) ();

},{}],37:[function(_dereq_,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],38:[function(_dereq_,module,exports){
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){}
MicroEvent.prototype	= {
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
	}
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent
}

},{}],39:[function(_dereq_,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Mustache = {};
    factory(global.Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.3.0';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;
}));

},{}],40:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],41:[function(_dereq_,module,exports){
!function(globals) {
'use strict'

var _imports = {}

if (typeof module !== 'undefined' && module.exports) { //CommonJS
  _imports.bytesToHex = _dereq_('convert-hex').bytesToHex
  _imports.convertString = _dereq_('convert-string')
  module.exports = sha256
} else {
  _imports.bytesToHex = globals.convertHex.bytesToHex
  _imports.convertString = globals.convertString
  globals.sha256 = sha256
}

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

// Initialization round constants tables
var K = []

// Compute constants
!function () {
  function isPrime(n) {
    var sqrtN = Math.sqrt(n);
    for (var factor = 2; factor <= sqrtN; factor++) {
      if (!(n % factor)) return false
    }

    return true
  }

  function getFractionalBits(n) {
    return ((n - (n | 0)) * 0x100000000) | 0
  }

  var n = 2
  var nPrime = 0
  while (nPrime < 64) {
    if (isPrime(n)) {
      K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3))
      nPrime++
    }

    n++
  }
}()

var bytesToWords = function (bytes) {
  var words = []
  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
    words[b >>> 5] |= bytes[i] << (24 - b % 32)
  }
  return words
}

var wordsToBytes = function (words) {
  var bytes = []
  for (var b = 0; b < words.length * 32; b += 8) {
    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF)
  }
  return bytes
}

// Reusable object
var W = []

var processBlock = function (H, M, offset) {
  // Working variables
  var a = H[0], b = H[1], c = H[2], d = H[3]
  var e = H[4], f = H[5], g = H[6], h = H[7]

    // Computation
  for (var i = 0; i < 64; i++) {
    if (i < 16) {
      W[i] = M[offset + i] | 0
    } else {
      var gamma0x = W[i - 15]
      var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
                    ((gamma0x << 14) | (gamma0x >>> 18)) ^
                    (gamma0x >>> 3)

      var gamma1x = W[i - 2];
      var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                    ((gamma1x << 13) | (gamma1x >>> 19)) ^
                    (gamma1x >>> 10)

      W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
    }

    var ch  = (e & f) ^ (~e & g);
    var maj = (a & b) ^ (a & c) ^ (b & c);

    var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
    var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

    var t1 = h + sigma1 + ch + K[i] + W[i];
    var t2 = sigma0 + maj;

    h = g;
    g = f;
    f = e;
    e = (d + t1) | 0;
    d = c;
    c = b;
    b = a;
    a = (t1 + t2) | 0;
  }

  // Intermediate hash value
  H[0] = (H[0] + a) | 0;
  H[1] = (H[1] + b) | 0;
  H[2] = (H[2] + c) | 0;
  H[3] = (H[3] + d) | 0;
  H[4] = (H[4] + e) | 0;
  H[5] = (H[5] + f) | 0;
  H[6] = (H[6] + g) | 0;
  H[7] = (H[7] + h) | 0;
}

function sha256(message, options) {;
  if (message.constructor === String) {
    message = _imports.convertString.UTF8.stringToBytes(message);
  }

  var H =[ 0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
           0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19 ];

  var m = bytesToWords(message);
  var l = message.length * 8;

  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;

  for (var i=0 ; i<m.length; i += 16) {
    processBlock(H, m, i);
  }

  var digestbytes = wordsToBytes(H);
  return options && options.asBytes ? digestbytes :
         options && options.asString ? _imports.convertString.bytesToString(digestbytes) :
         _imports.bytesToHex(digestbytes)
}

sha256.x2 = function(message, options) {
  return sha256(sha256(message, { asBytes:true }), options)
}

}(this);

},{"convert-hex":34,"convert-string":35}],42:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Verso = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Animation;

module.exports = Animation = (function() {
  function Animation(el) {
    this.el = el;
    this.run = 0;
    return;
  }

  Animation.prototype.animate = function(options, callback) {
    var duration, easing, ref, ref1, ref2, ref3, ref4, run, scale, transform, transitionEnd, x, y;
    if (options == null) {
      options = {};
    }
    if (callback == null) {
      callback = function() {};
    }
    x = (ref = options.x) != null ? ref : 0;
    y = (ref1 = options.y) != null ? ref1 : 0;
    scale = (ref2 = options.scale) != null ? ref2 : 1;
    easing = (ref3 = options.easing) != null ? ref3 : 'ease-out';
    duration = (ref4 = options.duration) != null ? ref4 : 0;
    run = ++this.run;
    transform = "translate3d(" + x + ", " + y + ", 0px) scale3d(" + scale + ", " + scale + ", 1)";
    if (this.el.style.transform === transform) {
      callback();
    } else if (duration > 0) {
      transitionEnd = (function(_this) {
        return function() {
          if (run !== _this.run) {
            return;
          }
          _this.el.removeEventListener('transitionend', transitionEnd);
          _this.el.style.transition = 'none';
          callback();
        };
      })(this);
      this.el.addEventListener('transitionend', transitionEnd, false);
      this.el.style.transition = "transform " + easing + " " + duration + "ms";
      this.el.style.transform = transform;
    } else {
      this.el.style.transition = 'none';
      this.el.style.transform = transform;
      callback();
    }
    return this;
  };

  return Animation;

})();


},{}],2:[function(_dereq_,module,exports){
var PageSpread;

module.exports = PageSpread = (function() {
  function PageSpread(el, options) {
    this.el = el;
    this.options = options != null ? options : {};
    this.visibility = 'gone';
    this.positioned = false;
    this.active = false;
    this.id = this.options.id;
    this.type = this.options.type;
    this.pageIds = this.options.pageIds;
    this.width = this.options.width;
    this.left = this.options.left;
    this.maxZoomScale = this.options.maxZoomScale;
    return;
  }

  PageSpread.prototype.isZoomable = function() {
    return this.getMaxZoomScale() > 1 && this.getEl().getAttribute('data-zoomable') !== 'false';
  };

  PageSpread.prototype.getEl = function() {
    return this.el;
  };

  PageSpread.prototype.getOverlayEls = function() {
    return this.getEl().querySelectorAll('.verso__overlay');
  };

  PageSpread.prototype.getPageEls = function() {
    return this.getEl().querySelectorAll('.verso__page');
  };

  PageSpread.prototype.getRect = function() {
    return this.getEl().getBoundingClientRect();
  };

  PageSpread.prototype.getContentRect = function() {
    var i, len, pageEl, pageRect, rect, ref, ref1, ref2, ref3, ref4;
    rect = {
      top: null,
      left: null,
      right: null,
      bottom: null,
      width: null,
      height: null
    };
    ref = this.getPageEls();
    for (i = 0, len = ref.length; i < len; i++) {
      pageEl = ref[i];
      pageRect = pageEl.getBoundingClientRect();
      if (pageRect.top < rect.top || (rect.top == null)) {
        rect.top = pageRect.top;
      }
      if (pageRect.left < rect.left || (rect.left == null)) {
        rect.left = pageRect.left;
      }
      if (pageRect.right > rect.right || (rect.right == null)) {
        rect.right = pageRect.right;
      }
      if (pageRect.bottom > rect.bottom || (rect.bottom == null)) {
        rect.bottom = pageRect.bottom;
      }
    }
    rect.top = (ref1 = rect.top) != null ? ref1 : 0;
    rect.left = (ref2 = rect.left) != null ? ref2 : 0;
    rect.right = (ref3 = rect.right) != null ? ref3 : 0;
    rect.bottom = (ref4 = rect.bottom) != null ? ref4 : 0;
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    return rect;
  };

  PageSpread.prototype.getId = function() {
    return this.id;
  };

  PageSpread.prototype.getType = function() {
    return this.type;
  };

  PageSpread.prototype.getPageIds = function() {
    return this.pageIds;
  };

  PageSpread.prototype.getWidth = function() {
    return this.width;
  };

  PageSpread.prototype.getLeft = function() {
    return this.left;
  };

  PageSpread.prototype.getMaxZoomScale = function() {
    return this.maxZoomScale;
  };

  PageSpread.prototype.getVisibility = function() {
    return this.visibility;
  };

  PageSpread.prototype.setVisibility = function(visibility) {
    if (this.visibility !== visibility) {
      this.getEl().style.display = visibility === 'visible' ? 'block' : 'none';
      this.visibility = visibility;
    }
    return this;
  };

  PageSpread.prototype.position = function() {
    if (this.positioned === false) {
      this.getEl().style.left = (this.getLeft()) + "%";
      this.positioned = true;
    }
    return this;
  };

  PageSpread.prototype.activate = function() {
    this.active = true;
    this.getEl().setAttribute('data-active', this.active);
  };

  PageSpread.prototype.deactivate = function() {
    this.active = false;
    this.getEl().setAttribute('data-active', this.active);
  };

  return PageSpread;

})();


},{}],3:[function(_dereq_,module,exports){
var Animation, Hammer, MicroEvent, PageSpread, Verso;

Hammer = _dereq_('hammerjs');

MicroEvent = _dereq_('microevent');

PageSpread = _dereq_('./page_spread');

Animation = _dereq_('./animation');

Verso = (function() {
  function Verso(el1, options1) {
    var ref, ref1, ref2, ref3, ref4;
    this.el = el1;
    this.options = options1 != null ? options1 : {};
    this.swipeVelocity = (ref = this.options.swipeVelocity) != null ? ref : 0.3;
    this.swipeThreshold = (ref1 = this.options.swipeThreshold) != null ? ref1 : 10;
    this.navigationDuration = (ref2 = this.options.navigationDuration) != null ? ref2 : 240;
    this.navigationPanDuration = (ref3 = this.options.navigationPanDuration) != null ? ref3 : 200;
    this.zoomDuration = (ref4 = this.options.zoomDuration) != null ? ref4 : 200;
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
      delay: 250,
      timeout: null
    };
    this.scrollerEl = this.el.querySelector('.verso__scroller');
    this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
    this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
    this.pageIds = this.buildPageIds(this.pageSpreads);
    this.animation = new Animation(this.scrollerEl);
    this.hammer = new Hammer.Manager(this.scrollerEl, {
      touchAction: 'auto',
      enable: false,
      inputClass: 'ontouchstart' in window ? Hammer.TouchInput : null
    });
    this.hammer.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL
    }));
    this.hammer.add(new Hammer.Tap({
      event: 'singletap',
      interval: 0
    }));
    this.hammer.add(new Hammer.Pinch());
    this.hammer.add(new Hammer.Press({
      time: 500
    }));
    this.hammer.on('panstart', this.panStart.bind(this));
    this.hammer.on('panmove', this.panMove.bind(this));
    this.hammer.on('panend', this.panEnd.bind(this));
    this.hammer.on('pancancel', this.panEnd.bind(this));
    this.hammer.on('singletap', this.singletap.bind(this));
    this.hammer.on('pinchstart', this.pinchStart.bind(this));
    this.hammer.on('pinchmove', this.pinchMove.bind(this));
    this.hammer.on('pinchend', this.pinchEnd.bind(this));
    this.hammer.on('pinchcancel', this.pinchEnd.bind(this));
    this.hammer.on('press', this.press.bind(this));
    return;
  }

  Verso.prototype.start = function() {
    var pageId, ref;
    pageId = (ref = this.getPageSpreadPositionFromPageId(this.options.pageId)) != null ? ref : 0;
    this.hammer.set({
      enable: true
    });
    this.navigateTo(pageId, {
      duration: 0
    });
    this.resizeListener = this.resize.bind(this);
    window.addEventListener('resize', this.resizeListener, false);
    return this;
  };

  Verso.prototype.destroy = function() {
    this.hammer.destroy();
    window.removeEventListener('resize', this.resizeListener);
    return this;
  };

  Verso.prototype.first = function(options) {
    return this.navigateTo(0, options);
  };

  Verso.prototype.prev = function(options) {
    return this.navigateTo(this.getPosition() - 1, options);
  };

  Verso.prototype.next = function(options) {
    return this.navigateTo(this.getPosition() + 1, options);
  };

  Verso.prototype.last = function(options) {
    return this.navigateTo(this.getPageSpreadCount() - 1, options);
  };

  Verso.prototype.navigateTo = function(position, options) {
    var activePageSpread, carousel, currentPageSpread, currentPosition, duration, ref, ref1, velocity;
    if (options == null) {
      options = {};
    }
    if (position < 0 || position > this.getPageSpreadCount() - 1) {
      return;
    }
    currentPosition = this.getPosition();
    currentPageSpread = this.getPageSpreadFromPosition(currentPosition);
    activePageSpread = this.getPageSpreadFromPosition(position);
    carousel = this.getCarouselFromPageSpread(activePageSpread);
    velocity = (ref = options.velocity) != null ? ref : 1;
    duration = (ref1 = options.duration) != null ? ref1 : this.navigationDuration;
    duration = duration / Math.abs(velocity);
    if (currentPageSpread != null) {
      currentPageSpread.deactivate();
    }
    activePageSpread.activate();
    carousel.visible.forEach(function(pageSpread) {
      return pageSpread.position().setVisibility('visible');
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
      x: this.transform.left + "%",
      duration: duration
    }, (function(_this) {
      return function() {
        carousel = _this.getCarouselFromPageSpread(_this.getActivePageSpread());
        carousel.gone.forEach(function(pageSpread) {
          return pageSpread.setVisibility('gone');
        });
        _this.trigger('afterNavigation', {
          newPosition: _this.getPosition(),
          previousPosition: currentPosition
        });
      };
    })(this));
  };

  Verso.prototype.getPosition = function() {
    return this.position;
  };

  Verso.prototype.setPosition = function(position) {
    this.position = position;
    return this;
  };

  Verso.prototype.getLeftTransformFromPageSpread = function(position, pageSpread) {
    var left;
    left = 0;
    if (position === this.getPageSpreadCount() - 1) {
      left = (100 - pageSpread.getWidth()) - pageSpread.getLeft();
    } else if (position > 0) {
      left = (100 - pageSpread.getWidth()) / 2 - pageSpread.getLeft();
    }
    return left;
  };

  Verso.prototype.getCarouselFromPageSpread = function(pageSpreadSubject) {
    var carousel;
    carousel = {
      visible: [],
      gone: []
    };
    this.pageSpreads.forEach(function(pageSpread) {
      var visible;
      visible = false;
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
  };

  Verso.prototype.traversePageSpreads = function(els) {
    var el, id, j, left, len, maxZoomScale, pageIds, pageSpread, pageSpreads, type, width;
    pageSpreads = [];
    left = 0;
    for (j = 0, len = els.length; j < len; j++) {
      el = els[j];
      id = el.getAttribute('data-id');
      type = el.getAttribute('data-type');
      pageIds = el.getAttribute('data-page-ids');
      pageIds = pageIds != null ? pageIds.split(',').map(function(i) {
        return i;
      }) : [];
      maxZoomScale = el.getAttribute('data-max-zoom-scale');
      maxZoomScale = maxZoomScale != null ? +maxZoomScale : 1;
      width = el.getAttribute('data-width');
      width = width != null ? +width : 100;
      pageSpread = new PageSpread(el, {
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
  };

  Verso.prototype.buildPageIds = function(pageSpreads) {
    var pageIds;
    pageIds = {};
    pageSpreads.forEach(function(pageSpread, i) {
      pageSpread.options.pageIds.forEach(function(pageId) {
        pageIds[pageId] = pageSpread;
      });
    });
    return pageIds;
  };

  Verso.prototype.isCoordinateInsideElement = function(x, y, el) {
    var rect;
    rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  Verso.prototype.getCoordinateInfo = function(x, y, pageSpread) {
    var contentRect, info, j, k, len, len1, overlayEl, overlayEls, pageEl, pageEls;
    info = {
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
    contentRect = pageSpread.getContentRect();
    overlayEls = pageSpread.getOverlayEls();
    pageEls = pageSpread.getPageEls();
    for (j = 0, len = overlayEls.length; j < len; j++) {
      overlayEl = overlayEls[j];
      if (this.isCoordinateInsideElement(x, y, overlayEl)) {
        info.overlayEls.push(overlayEl);
      }
    }
    for (k = 0, len1 = pageEls.length; k < len1; k++) {
      pageEl = pageEls[k];
      if (this.isCoordinateInsideElement(x, y, pageEl)) {
        info.pageEl = pageEl;
        break;
      }
    }
    info.contentX = (x - contentRect.left) / contentRect.width;
    info.contentY = (y - contentRect.top) / contentRect.height;
    if (info.pageEl != null) {
      info.isInsideContentX = info.contentX >= 0 && info.contentX <= 1;
      info.isInsideContentY = info.contentY >= 0 && info.contentY <= 1;
      info.isInsideContent = info.isInsideContentX && info.isInsideContentY;
    }
    return info;
  };

  Verso.prototype.getPageSpreadCount = function() {
    return this.pageSpreads.length;
  };

  Verso.prototype.getActivePageSpread = function() {
    return this.getPageSpreadFromPosition(this.getPosition());
  };

  Verso.prototype.getPageSpreadFromPosition = function(position) {
    return this.pageSpreads[position];
  };

  Verso.prototype.getPageSpreadPositionFromPageId = function(pageId) {
    var idx, j, len, pageSpread, ref;
    ref = this.pageSpreads;
    for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
      pageSpread = ref[idx];
      if (pageSpread.options.pageIds.indexOf(pageId) > -1) {
        return idx;
      }
    }
  };

  Verso.prototype.getPageSpreadBounds = function(pageSpread) {
    var pageSpreadContentRect, pageSpreadRect;
    pageSpreadRect = pageSpread.getRect();
    pageSpreadContentRect = pageSpread.getContentRect();
    return {
      left: (pageSpreadContentRect.left - pageSpreadRect.left) / pageSpreadRect.width * 100,
      top: (pageSpreadContentRect.top - pageSpreadRect.top) / pageSpreadRect.height * 100,
      width: pageSpreadContentRect.width / pageSpreadRect.width * 100,
      height: pageSpreadContentRect.height / pageSpreadRect.height * 100,
      pageSpreadRect: pageSpreadRect,
      pageSpreadContentRect: pageSpreadContentRect
    };
  };

  Verso.prototype.clipCoordinate = function(coordinate, scale, size, offset) {
    if (size * scale < 100) {
      coordinate = offset * -scale + 50 - (size * scale / 2);
    } else {
      coordinate = Math.min(coordinate, offset * -scale);
      coordinate = Math.max(coordinate, offset * -scale - size * scale + 100);
    }
    return coordinate;
  };

  Verso.prototype.zoomTo = function(options, callback) {
    var activePageSpread, carouselOffset, carouselScaledOffset, pageSpreadBounds, ref, ref1, scale, x, y;
    if (options == null) {
      options = {};
    }
    scale = options.scale;
    activePageSpread = this.getActivePageSpread();
    pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
    carouselOffset = activePageSpread.getLeft();
    carouselScaledOffset = carouselOffset * this.transform.scale;
    x = (ref = options.x) != null ? ref : 0;
    y = (ref1 = options.y) != null ? ref1 : 0;
    if (scale !== 1) {
      x -= pageSpreadBounds.pageSpreadRect.left;
      y -= pageSpreadBounds.pageSpreadRect.top;
      x = x / (pageSpreadBounds.pageSpreadRect.width / this.transform.scale) * 100;
      y = y / (pageSpreadBounds.pageSpreadRect.height / this.transform.scale) * 100;
      x = this.transform.left + carouselScaledOffset + x - (x * scale / this.transform.scale);
      y = this.transform.top + y - (y * scale / this.transform.scale);
      if (options.bounds !== false && scale > 1) {
        x = this.clipCoordinate(x, scale, pageSpreadBounds.width, pageSpreadBounds.left);
        y = this.clipCoordinate(y, scale, pageSpreadBounds.height, pageSpreadBounds.top);
      }
    } else {
      x = 0;
      y = 0;
    }
    x -= carouselOffset * scale;
    this.transform.left = x;
    this.transform.top = y;
    this.transform.scale = scale;
    this.animation.animate({
      x: x + "%",
      y: y + "%",
      scale: scale,
      easing: options.easing,
      duration: options.duration
    }, callback);
  };

  Verso.prototype.refresh = function() {
    this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
    this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
    this.pageIds = this.buildPageIds(this.pageSpreads);
    return this;
  };

  Verso.prototype.panStart = function(e) {
    var edgeThreshold, width, x;
    x = e.center.x;
    edgeThreshold = 30;
    width = this.scrollerEl.offsetWidth;
    if (x > edgeThreshold && x < width - edgeThreshold) {
      this.startTransform.left = this.transform.left;
      this.startTransform.top = this.transform.top;
      this.panning = true;
      this.trigger('panStart');
    }
  };

  Verso.prototype.panMove = function(e) {
    var activePageSpread, carouselOffset, carouselScaledOffset, pageSpreadBounds, scale, x, y;
    if (this.pinching === true || this.panning === false) {
      return;
    }
    if (this.transform.scale > 1) {
      activePageSpread = this.getActivePageSpread();
      carouselOffset = activePageSpread.getLeft();
      carouselScaledOffset = carouselOffset * this.transform.scale;
      pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
      scale = this.transform.scale;
      x = this.startTransform.left + carouselScaledOffset + e.deltaX / this.scrollerEl.offsetWidth * 100;
      y = this.startTransform.top + e.deltaY / this.scrollerEl.offsetHeight * 100;
      x = this.clipCoordinate(x, scale, pageSpreadBounds.width, pageSpreadBounds.left);
      y = this.clipCoordinate(y, scale, pageSpreadBounds.height, pageSpreadBounds.top);
      x -= carouselScaledOffset;
      this.transform.left = x;
      this.transform.top = y;
      this.animation.animate({
        x: x + "%",
        y: y + "%",
        scale: scale,
        easing: 'linear'
      });
    } else {
      x = this.transform.left + e.deltaX / this.scrollerEl.offsetWidth * 100;
      this.animation.animate({
        x: x + "%",
        easing: 'linear'
      });
    }
  };

  Verso.prototype.panEnd = function(e) {
    var position, velocity;
    if (this.panning === false) {
      return;
    }
    this.panning = false;
    this.trigger('panEnd');
    if (this.transform.scale === 1 && this.pinching === false) {
      position = this.getPosition();
      velocity = e.overallVelocityX;
      if (Math.abs(velocity) >= this.swipeVelocity) {
        if (Math.abs(e.deltaX) >= this.swipeThreshold) {
          if (e.offsetDirection === Hammer.DIRECTION_LEFT) {
            this.next({
              velocity: velocity,
              duration: this.navigationPanDuration
            });
          } else if (e.offsetDirection === Hammer.DIRECTION_RIGHT) {
            this.prev({
              velocity: velocity,
              duration: this.navigationPanDuration
            });
          }
        }
      }
      if (position === this.getPosition()) {
        this.animation.animate({
          x: this.transform.left + "%",
          duration: this.navigationPanDuration
        });
        this.trigger('attemptedNavigation', {
          position: this.getPosition()
        });
      }
    }
  };

  Verso.prototype.pinchStart = function(e) {
    if (!this.getActivePageSpread().isZoomable()) {
      return;
    }
    this.pinching = true;
    this.el.setAttribute('data-pinching', true);
    this.startTransform.scale = this.transform.scale;
  };

  Verso.prototype.pinchMove = function(e) {
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
  };

  Verso.prototype.pinchEnd = function(e) {
    var activePageSpread, maxZoomScale, position, scale;
    if (this.pinching === false) {
      return;
    }
    activePageSpread = this.getActivePageSpread();
    maxZoomScale = activePageSpread.getMaxZoomScale();
    scale = Math.max(1, Math.min(this.transform.scale, maxZoomScale));
    position = this.getPosition();
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
    }, (function(_this) {
      return function() {
        _this.pinching = false;
        _this.el.setAttribute('data-pinching', false);
      };
    })(this));
  };

  Verso.prototype.press = function(e) {
    this.trigger('pressed', this.getCoordinateInfo(e.center.x, e.center.y, this.getActivePageSpread()));
  };

  Verso.prototype.singletap = function(e) {
    var activePageSpread, coordinateInfo, isDoubleTap, maxZoomScale, position, scale, zoomEvent, zoomedIn;
    activePageSpread = this.getActivePageSpread();
    coordinateInfo = this.getCoordinateInfo(e.center.x, e.center.y, activePageSpread);
    isDoubleTap = this.tap.count === 1;
    clearTimeout(this.tap.timeout);
    if (isDoubleTap) {
      this.tap.count = 0;
      this.trigger('doubleClicked', coordinateInfo);
      if (activePageSpread.isZoomable()) {
        maxZoomScale = activePageSpread.getMaxZoomScale();
        zoomedIn = this.transform.scale > 1;
        scale = zoomedIn ? 1 : maxZoomScale;
        zoomEvent = zoomedIn ? 'zoomedOut' : 'zoomedIn';
        position = this.getPosition();
        this.zoomTo({
          x: e.center.x,
          y: e.center.y,
          scale: scale,
          duration: this.zoomDuration
        }, (function(_this) {
          return function() {
            _this.trigger(zoomEvent, {
              position: position
            });
          };
        })(this));
      }
    } else {
      this.tap.count++;
      this.tap.timeout = setTimeout((function(_this) {
        return function() {
          _this.tap.count = 0;
          _this.trigger('clicked', coordinateInfo);
        };
      })(this), this.tap.delay);
    }
  };

  Verso.prototype.resize = function() {
    var activePageSpread, position;
    if (this.transform.scale > 1) {
      position = this.getPosition();
      activePageSpread = this.getActivePageSpread();
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
  };

  return Verso;

})();

MicroEvent.mixin(Verso);

module.exports = Verso;


},{"./animation":1,"./page_spread":2,"hammerjs":4,"microevent":5}],4:[function(_dereq_,module,exports){
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

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
    if (Array.isArray(arg)) {
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

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
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
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
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
        if (node == parent) {
            return true;
        }
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
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

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
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
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
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
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
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
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
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
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
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
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
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
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
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
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
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

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
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

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
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

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
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
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
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
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

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
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
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

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
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
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
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

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
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
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
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
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
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
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
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

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
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
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

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
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
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
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
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
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
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

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
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
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
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
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
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
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
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
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
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
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
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

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
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
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

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
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

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
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
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
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

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
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

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

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
    Recognizer.apply(this, arguments);

    // previous time and center,
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
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
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
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

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
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
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
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

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
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
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
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
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
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
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
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
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

assign(Hammer, {
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
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (typeof define === 'function' && define.amd) {
    define(function() {
        return Hammer;
    });
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');

},{}],5:[function(_dereq_,module,exports){
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){}
MicroEvent.prototype	= {
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
	}
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent
}

},{}]},{},[3])(3)
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY29mZmVlc2NyaXB0L2Jyb3dzZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb25maWcuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb3JlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2V5X2NvZGVzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9hc3NldHMvZmlsZV91cGxvYWQuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2Fzc2V0cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvYXV0aC9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9yZXF1ZXN0LmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9jb3JlL3Nlc3Npb24uY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2V2ZW50cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvZXZlbnRzL3RyYWNrZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2dyYXBoL2luZGV4LmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9ncmFwaC9yZXF1ZXN0LmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9jb250cm9scy5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vY29yZS5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vZXZlbnRfdHJhY2tpbmcuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL2hvdHNwb3RfcGlja2VyLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9ob3RzcG90cy5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vaW5kZXguY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL2xlZ2FjeV9ldmVudF90cmFja2luZy5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vcGFnZV9zcHJlYWQuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL3BhZ2Vfc3ByZWFkcy5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vdGVtcGxhdGVzL2hvdHNwb3QuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL3RlbXBsYXRlcy9ob3RzcG90X3BpY2tlci5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vdmlld2VyLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQvcmVxdWVzdC9icm93c2VyLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQvc2duLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQvc3RvcmFnZS9jbGllbnRfY29va2llLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQvc3RvcmFnZS9jbGllbnRfbG9jYWwuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC91dGlsLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvbnZlcnQtaGV4L2NvbnZlcnQtaGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvbnZlcnQtc3RyaW5nL2NvbnZlcnQtc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2dhdG9yL2dhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWljcm9ldmVudC9taWNyb2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL211c3RhY2hlL211c3RhY2hlLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaGEyNTYvbGliL3NoYTI1Ni5qcyIsIm5vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3Qvbm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L2xpYi9jb2ZmZWVzY3JpcHQvYW5pbWF0aW9uLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3Qvbm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9saWIvY29mZmVlc2NyaXB0L3BhZ2Vfc3ByZWFkLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3Qvbm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9saWIvY29mZmVlc2NyaXB0L3ZlcnNvLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3Qvbm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvaGFtbWVyanMvaGFtbWVyLmpzIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy9taWNyb2V2ZW50L21pY3JvZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNDQSxJQUFBOztBQUFBLElBQTJCLE9BQU8sT0FBUCxLQUFrQixXQUE3QztFQUFBLE9BQUEsR0FBVTtJQUFBLE9BQUEsRUFBUyxJQUFUO0lBQVY7OztBQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7QUFF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QUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdG5CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmxGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBNYWtlIHN1cmUgd2UgZGVmaW5lIHdlJ3JlIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC5cbnByb2Nlc3MgPSBicm93c2VyOiB0cnVlIGlmIHR5cGVvZiBwcm9jZXNzIGlzICd1bmRlZmluZWQnXG5cblNHTiA9IHJlcXVpcmUgJy4vc2duJ1xuXG5TR04ucmVxdWVzdCA9IHJlcXVpcmUgJy4vcmVxdWVzdC9icm93c2VyJ1xuXG4jIEV4cG9zZSB0aGUgZGlmZmVyZW50IGtpdHMuXG5TR04uQXV0aEtpdCA9IHJlcXVpcmUgJy4va2l0cy9hdXRoJ1xuU0dOLkFzc2V0c0tpdCA9IHJlcXVpcmUgJy4va2l0cy9hc3NldHMnXG5TR04uRXZlbnRzS2l0ID0gcmVxdWlyZSAnLi9raXRzL2V2ZW50cydcblNHTi5HcmFwaEtpdCA9IHJlcXVpcmUgJy4va2l0cy9ncmFwaCdcblNHTi5Db3JlS2l0ID0gcmVxdWlyZSAnLi9raXRzL2NvcmUnXG5TR04uUGFnZWRQdWJsaWNhdGlvbktpdCA9IHJlcXVpcmUgJy4va2l0cy9wYWdlZF9wdWJsaWNhdGlvbidcblxuIyBFeHBvc2Ugc3RvcmFnZSBiYWNrZW5kcy5cblNHTi5zdG9yYWdlID1cbiAgICBsb2NhbDogcmVxdWlyZSAnLi9zdG9yYWdlL2NsaWVudF9sb2NhbCdcbiAgICBjb29raWU6IHJlcXVpcmUgJy4vc3RvcmFnZS9jbGllbnRfY29va2llJ1xuXG5TR04uY2xpZW50ID0gZG8gLT5cbiAgICBpZCA9IFNHTi5zdG9yYWdlLmxvY2FsLmdldCAnY2xpZW50LWlkJ1xuICAgIGZpcnN0T3BlbiA9IG5vdCBpZD9cblxuICAgIGlmIGZpcnN0T3BlblxuICAgICAgICBpZCA9IFNHTi51dGlsLnV1aWQoKVxuICAgICAgICBcbiAgICAgICAgU0dOLnN0b3JhZ2UubG9jYWwuc2V0ICdjbGllbnQtaWQnLCBpZFxuXG4gICAgZmlyc3RPcGVuOiBmaXJzdE9wZW5cbiAgICBpZDogaWRcblxuIyBPcHRpb25hbCBzdGFydCBmdW5jdGlvbiB0byBpbnZva2Ugc2Vzc2lvbiB0cmFja2luZy5cblNHTi5zdGFydFNlc3Npb24gPSAtPlxuICAgICMgRW1pdCBzZXNzaW9uIGV2ZW50cyBpZiBhIHRyYWNrZXIgaXMgYXZhaWxhYmxlLlxuICAgIGV2ZW50VHJhY2tlciA9IFNHTi5jb25maWcuZ2V0ICdldmVudFRyYWNrZXInXG5cbiAgICBpZiBldmVudFRyYWNrZXI/XG4gICAgICAgIGV2ZW50VHJhY2tlci50cmFja0V2ZW50ICdmaXJzdC1jbGllbnQtc2Vzc2lvbi1vcGVuZWQnLCB7fSwgJzEuMC4wJyBpZiBTR04uY2xpZW50LmZpcnN0T3BlbiBpcyB0cnVlXG4gICAgICAgIGV2ZW50VHJhY2tlci50cmFja0V2ZW50ICdjbGllbnQtc2Vzc2lvbi1vcGVuZWQnLCB7fSwgJzEuMC4wJ1xuXG4gICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU0dOXG4iLCJhdHRycyA9IHt9XG5rZXlzID0gW1xuICAgICdhcHBWZXJzaW9uJyxcbiAgICAnYXBwS2V5JyxcbiAgICAnYXBwU2VjcmV0JyxcbiAgICAnYXV0aFRva2VuJyxcbiAgICAnZXZlbnRUcmFja2VyJyxcbiAgICAnbG9jYWxlJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgc2V0OiAoY29uZmlnID0ge30pIC0+XG4gICAgICAgIGZvciBrZXksIHZhbHVlIG9mIGNvbmZpZ1xuICAgICAgICAgICAgYXR0cnNba2V5XSA9IHZhbHVlIGlmIGtleSBpbiBrZXlzXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXQ6IChvcHRpb24pIC0+XG4gICAgICAgIGF0dHJzW29wdGlvbl1cbiIsImNvbmZpZyA9IHJlcXVpcmUgJy4vY29uZmlnJ1xudXRpbCA9IHJlcXVpcmUgJy4vdXRpbCdcblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIGNvbmZpZzogY29uZmlnXG5cbiAgICB1dGlsOiB1dGlsXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgRVNDOiAyN1xuICAgIEFSUk9XX1JJR0hUOiAzOVxuICAgIEFSUk9XX0xFRlQ6IDM3XG4gICAgU1BBQ0U6IDMyXG4gICAgTlVNQkVSX09ORTogNDlcbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucyA9IHt9LCBjYWxsYmFjaywgcHJvZ3Jlc3NDYWxsYmFjaykgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgaXMgbm90IGRlZmluZWQnKSBpZiBub3Qgb3B0aW9ucy5maWxlP1xuXG4gICAgdXJsID0gJ2h0dHBzOi8vYXNzZXRzLnNlcnZpY2Uuc2hvcGd1bi5jb20vdXBsb2FkJ1xuICAgIGJvZHkgPSBuZXcgRm9ybURhdGEoKVxuICAgIHRpbWVvdXQgPSAxMDAwICogNjAgKiA2MFxuXG4gICAgYm9keS5hcHBlbmQgJ2ZpbGUnLCBvcHRpb25zLmZpbGVcblxuICAgIFNHTi5yZXF1ZXN0XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgICAgIHVybDogdXJsXG4gICAgICAgIGJvZHk6IGJvZHlcbiAgICAgICAgdGltZW91dDogdGltZW91dFxuICAgICAgICBoZWFkZXJzOlxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdSZXF1ZXN0IGVycm9yJyksXG4gICAgICAgICAgICAgICAgY29kZTogJ1JlcXVlc3RFcnJvcidcbiAgICAgICAgICAgIClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgZGF0YS5zdGF0dXNDb2RlIGlzIDIwMFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGwsIEpTT04ucGFyc2UoZGF0YS5ib2R5KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignUmVxdWVzdCBlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBjb2RlOiAnUmVxdWVzdEVycm9yJ1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnN0YXR1c0NvZGVcbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgcmV0dXJuXG4gICAgLCAobG9hZGVkLCB0b3RhbCkgLT5cbiAgICAgICAgaWYgdHlwZW9mIHByb2dyZXNzQ2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFja1xuICAgICAgICAgICAgICAgIHByb2dyZXNzOiBsb2FkZWQgLyB0b3RhbFxuICAgICAgICAgICAgICAgIGxvYWRlZDogbG9hZGVkXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXR1cm5cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBmaWxlVXBsb2FkOiByZXF1aXJlICcuL2ZpbGVfdXBsb2FkJ1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fVxuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xucmVxdWVzdCA9IHJlcXVpcmUgJy4vcmVxdWVzdCdcbnNlc3Npb24gPSByZXF1aXJlICcuL3Nlc3Npb24nXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgICBiYXNlVXJsOiAnaHR0cHM6Ly9hcGkuZXRpbGJ1ZHNhdmlzLmRrJ1xuXG4gICAgcmVxdWVzdDogcmVxdWVzdFxuXG4gICAgc2Vzc2lvbjogc2Vzc2lvblxuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRpb25zID0ge30sIGNhbGxiYWNrID0gLT4pIC0+XG4gICAgU0dOLkNvcmVLaXQuc2Vzc2lvbi5lbnN1cmUgKGVycikgLT5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrIGVyciBpZiBlcnI/XG5cbiAgICAgICAgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyA/IHt9XG4gICAgICAgIHRva2VuID0gU0dOLkNvcmVLaXQuc2Vzc2lvbi5nZXQgJ3Rva2VuJ1xuICAgICAgICBjbGllbnRJZCA9IFNHTi5Db3JlS2l0LnNlc3Npb24uZ2V0ICdjbGllbnRfaWQnXG4gICAgICAgIGFwcFZlcnNpb24gPSBTR04uY29uZmlnLmdldCAnYXBwVmVyc2lvbidcbiAgICAgICAgYXBwU2VjcmV0ID0gU0dOLmNvbmZpZy5nZXQgJ2FwcFNlY3JldCdcbiAgICAgICAgbG9jYWxlID0gU0dOLmNvbmZpZy5nZXQgJ2xvY2FsZSdcbiAgICAgICAgcXMgPSBvcHRpb25zLnFzID8ge31cbiAgICAgICAgZ2VvID0gb3B0aW9ucy5nZW9sb2NhdGlvblxuXG4gICAgICAgIGhlYWRlcnNbJ1gtVG9rZW4nXSA9IHRva2VuXG4gICAgICAgIGhlYWRlcnNbJ1gtU2lnbmF0dXJlJ10gPSBTR04uQ29yZUtpdC5zZXNzaW9uLnNpZ24gYXBwU2VjcmV0LCB0b2tlbiBpZiBhcHBTZWNyZXQ/XG5cbiAgICAgICAgcXMucl9sb2NhbGUgPSBsb2NhbGUgaWYgbG9jYWxlP1xuICAgICAgICBxcy5hcGlfYXYgPSBhcHBWZXJzaW9uIGlmIGFwcFZlcnNpb24/XG4gICAgICAgIHFzLmNsaWVudF9pZCA9IGNsaWVudElkIGlmIGNsaWVudElkP1xuXG4gICAgICAgIGlmIGdlbz9cbiAgICAgICAgICAgIHFzLnJfbGF0ID0gZ2VvLmxhdGl0dWRlIGlmIGdlby5sYXRpdHVkZT8gYW5kIG5vdCBxcy5yX2xhdD9cbiAgICAgICAgICAgIHFzLnJfbG5nID0gZ2VvLmxvbmdpdHVkZSBpZiBnZW8ubG9uZ2l0dWRlPyBhbmQgbm90IHFzLnJfbG5nP1xuICAgICAgICAgICAgcXMucl9yYWRpdXMgPSBnZW8ucmFkaXVzIGlmIGdlby5yYWRpdXM/IGFuZCBub3QgcXMucl9yYWRpdXM/XG4gICAgICAgICAgICBxcy5yX3NlbnNvciA9IGdlby5zZW5zb3IgaWYgZ2VvLnNlbnNvcj8gYW5kIG5vdCBxcy5yX3NlbnNvcj9cblxuICAgICAgICBTR04ucmVxdWVzdFxuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZFxuICAgICAgICAgICAgdXJsOiBTR04uQ29yZUtpdC5iYXNlVXJsICsgb3B0aW9ucy51cmxcbiAgICAgICAgICAgIHFzOiBxc1xuICAgICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5XG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICB1c2VDb29raWVzOiBmYWxzZVxuICAgICAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdDb3JlIHJlcXVlc3QgZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogJ0NvcmVSZXF1ZXN0RXJyb3InXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRva2VuID0gU0dOLkNvcmVLaXQuc2Vzc2lvbi5nZXQgJ3Rva2VuJ1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlVG9rZW4gPSBkYXRhLmhlYWRlcnNbJ3gtdG9rZW4nXVxuXG4gICAgICAgICAgICAgICAgU0dOLkNvcmVLaXQuc2Vzc2lvbi5zZXQgJ3Rva2VuJywgcmVzcG9uc2VUb2tlbiBpZiB0b2tlbiBpc250IHJlc3BvbnNlVG9rZW5cblxuICAgICAgICAgICAgICAgIGlmIGRhdGEuc3RhdHVzQ29kZSA+PSAyMDAgYW5kIGRhdGEuc3RhdHVzQ29kZSA8IDMwMCBvciBkYXRhLnN0YXR1c0NvZGUgaXMgMzA0XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGwsIEpTT04ucGFyc2UoZGF0YS5ib2R5KVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdDb3JlIEFQSSBlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogJ0NvcmVBUElFcnJvcidcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGRhdGEuc3RhdHVzQ29kZVxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgcmV0dXJuXG4iLCJTR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5zaGEyNTYgPSByZXF1aXJlICdzaGEyNTYnXG5jbGllbnRDb29raWVTdG9yYWdlID0gcmVxdWlyZSAnLi4vLi4vc3RvcmFnZS9jbGllbnRfY29va2llJ1xuXG5zZXNzaW9uID1cbiAgICB0b2tlblRUTDogMSAqIDYwICogNjAgKiAyNCAqIDYwXG5cbiAgICBhdHRyczogZG8gLT5cbiAgICAgICAgY2xpZW50Q29va2llU3RvcmFnZS5nZXQoJ3Nlc3Npb25zJykgPyB7fVxuXG4gICAgY2FsbGJhY2tRdWV1ZTogW11cblxuICAgIGdldFVybDogLT5cbiAgICAgICAgU0dOLkNvcmVLaXQuYmFzZVVybCArICcvdjIvc2Vzc2lvbnMnXG5cbiAgICBnZXQ6IChrZXkpIC0+XG4gICAgICAgIGFwcEtleSA9IFNHTi5jb25maWcuZ2V0ICdhcHBLZXknXG5cbiAgICAgICAgaWYga2V5P1xuICAgICAgICAgICAgc2Vzc2lvbi5hdHRyc1thcHBLZXldP1trZXldXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uYXR0cnNbYXBwS2V5XSA/IHt9XG5cbiAgICBzZXQ6IChrZXksIHZhbHVlKSAtPlxuICAgICAgICBhdHRycyA9IG51bGxcblxuICAgICAgICBpZiB0eXBlb2Yga2V5IGlzICdvYmplY3QnXG4gICAgICAgICAgICBhdHRycyA9IGtleVxuICAgICAgICBlbHNlIGlmIHR5cGVvZiBrZXkgaXMgJ3N0cmluZycgYW5kIHZhbHVlP1xuICAgICAgICAgICAgYXR0cnMgPSBzZXNzaW9uLmF0dHJzXG4gICAgICAgICAgICBhdHRyc1trZXldID0gdmFsdWVcbiAgICAgICAgICAgIFxuICAgICAgICBhcHBLZXkgPSBTR04uY29uZmlnLmdldCAnYXBwS2V5J1xuICAgICAgICBzZXNzaW9ucyA9IGNsaWVudENvb2tpZVN0b3JhZ2UuZ2V0ICdzZXNzaW9ucydcblxuICAgICAgICBzZXNzaW9ucyA9IHt9IGlmIG5vdCBzZXNzaW9ucz9cbiAgICAgICAgc2Vzc2lvbnNbYXBwS2V5XSA9IGF0dHJzXG5cbiAgICAgICAgY2xpZW50Q29va2llU3RvcmFnZS5zZXQgJ3Nlc3Npb25zJywgc2Vzc2lvbnNcblxuICAgICAgICBzZXNzaW9uLmF0dHJzID0gc2Vzc2lvbnNcblxuICAgICAgICByZXR1cm5cblxuICAgIGNyZWF0ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgICBTR04ucmVxdWVzdFxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICAgICAgICAgIHVybDogc2Vzc2lvbi5nZXRVcmwoKVxuICAgICAgICAgICAgaGVhZGVyczpcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICBxczpcbiAgICAgICAgICAgICAgICBhcGlfa2V5OiBTR04uY29uZmlnLmdldCAnYXBwS2V5J1xuICAgICAgICAgICAgICAgIHRva2VuX3R0bDogc2Vzc2lvbi50b2tlblRUTFxuICAgICAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyXG4gICAgICAgICAgICBlbHNlIGlmIGRhdGEuc3RhdHVzQ29kZSBpcyAyMDFcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNldCBKU09OLnBhcnNlKGRhdGEuYm9keSlcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyciwgc2Vzc2lvbi5nZXQoKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG5ldyBFcnJvcignQ291bGQgbm90IGNyZWF0ZSBzZXNzaW9uJylcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG4gICAgXG4gICAgdXBkYXRlOiAoY2FsbGJhY2spIC0+XG4gICAgICAgIGhlYWRlcnMgPSB7fVxuICAgICAgICB0b2tlbiA9IHNlc3Npb24uZ2V0ICd0b2tlbidcbiAgICAgICAgYXBwU2VjcmV0ID0gU0dOLmNvbmZpZy5nZXQgJ2FwcFNlY3JldCdcblxuICAgICAgICBoZWFkZXJzWydYLVRva2VuJ10gPSB0b2tlblxuICAgICAgICBoZWFkZXJzWydYLVNpZ25hdHVyZSddID0gc2Vzc2lvbi5zaWduIGFwcFNlY3JldCwgdG9rZW4gaWYgYXBwU2VjcmV0P1xuICAgICAgICBoZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xuXG4gICAgICAgIFNHTi5yZXF1ZXN0XG4gICAgICAgICAgICB1cmw6IHNlc3Npb24uZ2V0VXJsKClcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyclxuICAgICAgICAgICAgZWxzZSBpZiBkYXRhLnN0YXR1c0NvZGUgaXMgMjAwXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zZXQgSlNPTi5wYXJzZShkYXRhLmJvZHkpXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBlcnIsIHNlc3Npb24uZ2V0KClcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBuZXcgRXJyb3IoJ0NvdWxkIG5vdCB1cGRhdGUgc2Vzc2lvbicpXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVuZXc6IChjYWxsYmFjaykgLT5cbiAgICAgICAgaGVhZGVycyA9IHt9XG4gICAgICAgIHRva2VuID0gc2Vzc2lvbi5nZXQgJ3Rva2VuJ1xuICAgICAgICBhcHBTZWNyZXQgPSBTR04uY29uZmlnLmdldCAnYXBwU2VjcmV0J1xuXG4gICAgICAgIGhlYWRlcnNbJ1gtVG9rZW4nXSA9IHRva2VuXG4gICAgICAgIGhlYWRlcnNbJ1gtU2lnbmF0dXJlJ10gPSBzZXNzaW9uLnNpZ24gYXBwU2VjcmV0LCB0b2tlbiBpZiBhcHBTZWNyZXQ/XG4gICAgICAgIGhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL2pzb24nXG5cbiAgICAgICAgU0dOLnJlcXVlc3RcbiAgICAgICAgICAgIG1ldGhvZDogJ3B1dCdcbiAgICAgICAgICAgIHVybDogc2Vzc2lvbi5nZXRVcmwoKVxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyXG4gICAgICAgICAgICBlbHNlIGlmIGRhdGEuc3RhdHVzQ29kZSBpcyAyMDBcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNldCBKU09OLnBhcnNlKGRhdGEuYm9keSlcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyciwgc2Vzc2lvbi5nZXQoKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG5ldyBFcnJvcignQ291bGQgbm90IHJlbmV3IHNlc3Npb24nKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIGVuc3VyZTogKGNhbGxiYWNrKSAtPlxuICAgICAgICBxdWV1ZUNvdW50ID0gc2Vzc2lvbi5jYWxsYmFja1F1ZXVlLmxlbmd0aFxuICAgICAgICBjb21wbGV0ZSA9IChlcnIpIC0+XG4gICAgICAgICAgICBzZXNzaW9uLmNhbGxiYWNrUXVldWUgPSBzZXNzaW9uLmNhbGxiYWNrUXVldWUuZmlsdGVyIChmbikgLT5cbiAgICAgICAgICAgICAgICBmbiBlcnJcblxuICAgICAgICAgICAgICAgIGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHNlc3Npb24uY2FsbGJhY2tRdWV1ZS5wdXNoIGNhbGxiYWNrXG5cbiAgICAgICAgaWYgcXVldWVDb3VudCBpcyAwXG4gICAgICAgICAgICBpZiBub3Qgc2Vzc2lvbi5nZXQoJ3Rva2VuJyk/XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5jcmVhdGUgY29tcGxldGVcbiAgICAgICAgICAgIGVsc2UgaWYgc2Vzc2lvbi53aWxsRXhwaXJlU29vbihzZXNzaW9uLmdldCgnZXhwaXJlcycpKVxuICAgICAgICAgICAgICAgIHNlc3Npb24ucmVuZXcgY29tcGxldGVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB3aWxsRXhwaXJlU29vbjogKGV4cGlyZXMpIC0+XG4gICAgICAgIERhdGUubm93KCkgPj0gRGF0ZS5wYXJzZShleHBpcmVzKSAtIDEwMDAgKiA2MCAqIDYwICogMjRcblxuICAgIHNpZ246IChhcHBTZWNyZXQsIHRva2VuKSAtPlxuICAgICAgICBzaGEyNTYgW2FwcFNlY3JldCwgdG9rZW5dLmpvaW4oJycpXG5cbm1vZHVsZS5leHBvcnRzID0gc2Vzc2lvblxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIFRyYWNrZXI6IHJlcXVpcmUgJy4vdHJhY2tlcidcbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcbmNsaWVudExvY2FsU3RvcmFnZSA9IHJlcXVpcmUgJy4uLy4uL3N0b3JhZ2UvY2xpZW50X2xvY2FsJ1xuZ2V0UG9vbCA9IC0+XG4gICAgZGF0YSA9IGNsaWVudExvY2FsU3RvcmFnZS5nZXQgJ2V2ZW50LXRyYWNrZXItcG9vbCdcbiAgICBkYXRhID0gW10gaWYgQXJyYXkuaXNBcnJheShkYXRhKSBpcyBmYWxzZVxuXG4gICAgZGF0YVxucG9vbCA9IGdldFBvb2woKVxuXG5jbGllbnRMb2NhbFN0b3JhZ2Uuc2V0ICdldmVudC10cmFja2VyLXBvb2wnLCBbXVxuXG50cnlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAndW5sb2FkJywgLT5cbiAgICAgICAgcG9vbCA9IHBvb2wuY29uY2F0IGdldFBvb2woKVxuXG4gICAgICAgIGNsaWVudExvY2FsU3RvcmFnZS5zZXQgJ2V2ZW50LXRyYWNrZXItcG9vbCcsIHBvb2xcblxuICAgICAgICByZXR1cm5cbiAgICAsIGZhbHNlXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVHJhY2tlclxuICAgIGRlZmF1bHRPcHRpb25zOlxuICAgICAgICBiYXNlVXJsOiAnaHR0cHM6Ly9ldmVudHMuc2VydmljZS5zaG9wZ3VuLmNvbSdcbiAgICAgICAgdHJhY2tJZDogbnVsbFxuICAgICAgICBkaXNwYXRjaEludGVydmFsOiAzMDAwXG4gICAgICAgIGRpc3BhdGNoTGltaXQ6IDEwMFxuICAgICAgICBwb29sTGltaXQ6IDEwMDBcbiAgICAgICAgZHJ5UnVuOiBmYWxzZVxuXG4gICAgY29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG4gICAgICAgIGZvciBrZXksIHZhbHVlIG9mIEBkZWZhdWx0T3B0aW9uc1xuICAgICAgICAgICAgQFtrZXldID0gb3B0aW9uc1trZXldIG9yIHZhbHVlXG5cbiAgICAgICAgQGRpc3BhdGNoaW5nID0gZmFsc2VcbiAgICAgICAgQHNlc3Npb24gPVxuICAgICAgICAgICAgaWQ6IFNHTi51dGlsLnV1aWQoKVxuICAgICAgICBAY2xpZW50ID1cbiAgICAgICAgICAgIHRyYWNrSWQ6IEB0cmFja0lkXG4gICAgICAgICAgICBpZDogU0dOLmNsaWVudC5pZFxuICAgICAgICBAdmlldyA9XG4gICAgICAgICAgICBwYXRoOiBbXVxuICAgICAgICAgICAgcHJldmlvdXNQYXRoOiBbXVxuICAgICAgICAgICAgdXJpOiBudWxsXG4gICAgICAgIEBsb2NhdGlvbiA9IHt9XG4gICAgICAgIEBhcHBsaWNhdGlvbiA9IHt9XG4gICAgICAgIEBpZGVudGl0eSA9IHt9XG5cbiAgICAgICAgIyBEaXNwYXRjaCBldmVudHMgcGVyaW9kaWNhbGx5LlxuICAgICAgICBAaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCBAZGlzcGF0Y2guYmluZChAKSwgQGRpc3BhdGNoSW50ZXJ2YWxcblxuICAgICAgICByZXR1cm5cblxuICAgIHRyYWNrRXZlbnQ6ICh0eXBlLCBwcm9wZXJ0aWVzID0ge30sIHZlcnNpb24gPSAnMS4wLjAnKSAtPlxuICAgICAgICB0aHJvdyBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0V2ZW50IHR5cGUgaXMgcmVxdWlyZWQnKSkgaWYgdHlwZW9mIHR5cGUgaXNudCAnc3RyaW5nJ1xuICAgICAgICByZXR1cm4gaWYgbm90IEB0cmFja0lkP1xuXG4gICAgICAgIHBvb2wucHVzaFxuICAgICAgICAgICAgaWQ6IFNHTi51dGlsLnV1aWQoKVxuICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICAgICAgcmVjb3JkZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICBzZW50QXQ6IG51bGxcbiAgICAgICAgICAgIGNsaWVudDpcbiAgICAgICAgICAgICAgICBpZDogQGNsaWVudC5pZFxuICAgICAgICAgICAgICAgIHRyYWNrSWQ6IEBjbGllbnQudHJhY2tJZFxuICAgICAgICAgICAgY29udGV4dDogQGdldENvbnRleHQoKVxuICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllc1xuXG4gICAgICAgIHBvb2wuc2hpZnQoKSB3aGlsZSBAZ2V0UG9vbFNpemUoKSA+IEBwb29sTGltaXRcblxuICAgICAgICBAXG5cbiAgICBpZGVudGlmeTogKGlkKSAtPlxuICAgICAgICBAaWRlbnRpdHkuaWQgPSBpZFxuXG4gICAgICAgIEBcblxuICAgIHNldExvY2F0aW9uOiAobG9jYXRpb24gPSB7fSkgLT5cbiAgICAgICAgQGxvY2F0aW9uLmRldGVybWluZWRBdCA9IG5ldyBEYXRlKGxvY2F0aW9uLnRpbWVzdGFtcCkudG9JU09TdHJpbmcoKVxuICAgICAgICBAbG9jYXRpb24ubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZVxuICAgICAgICBAbG9jYXRpb24ubG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlXG4gICAgICAgIEBsb2NhdGlvbi5hbHRpdHVkZSA9IGxvY2F0aW9uLmFsdGl0dWRlXG4gICAgICAgIEBsb2NhdGlvbi5hY2N1cmFjeSA9XG4gICAgICAgICAgICBob3Jpem9udGFsOiBsb2NhdGlvbi5hY2N1cmFjeT8uaG9yaXpvbnRhbFxuICAgICAgICAgICAgdmVydGljYWw6IGxvY2F0aW9uLmFjY3VyYWN5Py52ZXJ0aWNhbFxuICAgICAgICBAbG9jYXRpb24uc3BlZWQgPSBsb2NhdGlvbi5zcGVlZFxuICAgICAgICBAbG9jYXRpb24uZmxvb3IgPSBsb2NhdGlvbi5mbG9vclxuXG4gICAgICAgIEBcblxuICAgIHNldEFwcGxpY2F0aW9uOiAoYXBwbGljYXRpb24gPSB7fSkgLT5cbiAgICAgICAgQGFwcGxpY2F0aW9uLm5hbWUgPSBhcHBsaWNhdGlvbi5uYW1lXG4gICAgICAgIEBhcHBsaWNhdGlvbi52ZXJzaW9uID0gYXBwbGljYXRpb24udmVyc2lvblxuICAgICAgICBAYXBwbGljYXRpb24uYnVpbGQgPSBhcHBsaWNhdGlvbi5idWlsZFxuXG4gICAgICAgIEBcblxuICAgIHNldFZpZXc6IChwYXRoKSAtPlxuICAgICAgICBAdmlldy5wcmV2aW91c1BhdGggPSBAdmlldy5wYXRoXG4gICAgICAgIEB2aWV3LnBhdGggPSBwYXRoIGlmIEFycmF5LmlzQXJyYXkocGF0aCkgaXMgdHJ1ZVxuICAgICAgICBAdmlldy51cmkgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgICAgIEBcblxuICAgIGdldFZpZXc6IC0+XG4gICAgICAgIHZpZXcgPSB7fVxuXG4gICAgICAgIHZpZXcucGF0aCA9IEB2aWV3LnBhdGggaWYgQHZpZXcucGF0aC5sZW5ndGggPiAwXG4gICAgICAgIHZpZXcucHJldmlvdXNQYXRoID0gQHZpZXcucHJldmlvdXNQYXRoIGlmIEB2aWV3LnByZXZpb3VzUGF0aC5sZW5ndGggPiAwXG4gICAgICAgIHZpZXcudXJpID0gQHZpZXcudXJpIGlmIEB2aWV3LnVyaT9cblxuICAgICAgICB2aWV3XG5cbiAgICBnZXRDb250ZXh0OiAtPlxuICAgICAgICBzY3JlZW5EaW1lbnNpb25zID0gU0dOLnV0aWwuZ2V0U2NyZWVuRGltZW5zaW9ucygpXG4gICAgICAgIG9zID0gU0dOLnV0aWwuZ2V0T1MoKVxuICAgICAgICBjb250ZXh0ID1cbiAgICAgICAgICAgIHVzZXJBZ2VudDogd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgICAgIGxvY2FsZTogbmF2aWdhdG9yLmxhbmd1YWdlXG4gICAgICAgICAgICB0aW1lWm9uZTpcbiAgICAgICAgICAgICAgICB1dGNPZmZzZXRTZWNvbmRzOiBTR04udXRpbC5nZXRVdGNPZmZzZXRTZWNvbmRzKClcbiAgICAgICAgICAgICAgICB1dGNEc3RPZmZzZXRTZWNvbmRzOiBTR04udXRpbC5nZXRVdGNEc3RPZmZzZXRTZWNvbmRzKClcbiAgICAgICAgICAgIGRldmljZTpcbiAgICAgICAgICAgICAgICBzY3JlZW46XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzY3JlZW5EaW1lbnNpb25zLnBoeXNpY2FsLndpZHRoXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc2NyZWVuRGltZW5zaW9ucy5waHlzaWNhbC5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgZGVuc2l0eTogc2NyZWVuRGltZW5zaW9ucy5kZW5zaXR5XG4gICAgICAgICAgICBzZXNzaW9uOlxuICAgICAgICAgICAgICAgIGlkOiBAc2Vzc2lvbi5pZFxuICAgICAgICAgICAgdmlldzogQGdldFZpZXcoKVxuICAgICAgICBhcHBsaWNhdGlvbiA9XG4gICAgICAgICAgICBuYW1lOiBAYXBwbGljYXRpb24ubmFtZVxuICAgICAgICAgICAgdmVyc2lvbjogQGFwcGxpY2F0aW9uLnZlcnNpb25cbiAgICAgICAgICAgIGJ1aWxkOiBAYXBwbGljYXRpb24uYnVpbGRcbiAgICAgICAgY2FtcGFpZ24gPVxuICAgICAgICAgICAgc291cmNlOiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fc291cmNlJ1xuICAgICAgICAgICAgbWVkaXVtOiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fbWVkaXVtJ1xuICAgICAgICAgICAgbmFtZTogU0dOLnV0aWwuZ2V0UXVlcnlQYXJhbSAndXRtX2NhbXBhaWduJ1xuICAgICAgICAgICAgdGVybTogU0dOLnV0aWwuZ2V0UXVlcnlQYXJhbSAndXRtX3Rlcm0nXG4gICAgICAgICAgICBjb250ZW50OiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fY29udGVudCdcbiAgICAgICAgbG9jID1cbiAgICAgICAgICAgIGRldGVybWluZWRBdDogQGxvY2F0aW9uLmRldGVybWluZWRBdFxuICAgICAgICAgICAgbGF0aXR1ZGU6IEBsb2NhdGlvbi5sYXRpdHVkZVxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBAbG9jYXRpb24ubG9uZ2l0dWRlXG4gICAgICAgICAgICBhbHRpdHVkZTogQGxvY2F0aW9uLmFsdGl0dWRlXG4gICAgICAgICAgICBzcGVlZDogQGxvY2F0aW9uLnNwZWVkXG4gICAgICAgICAgICBmbG9vcjogQGxvY2F0aW9uLmZsb29yXG4gICAgICAgICAgICBhY2N1cmFjeTpcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsOiBAbG9jYXRpb24uYWNjdXJhY3k/Lmhvcml6b250YWxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogQGxvY2F0aW9uLmFjY3VyYWN5Py52ZXJ0aWNhbFxuXG4gICAgICAgICMgT3BlcmF0aW5nIHN5c3RlbS5cbiAgICAgICAgY29udGV4dC5vcyA9IG5hbWU6IG9zIGlmIG9zP1xuXG4gICAgICAgICMgU2Vzc2lvbiByZWZlcnJlci5cbiAgICAgICAgY29udGV4dC5zZXNzaW9uLnJlZmVycmVyID0gZG9jdW1lbnQucmVmZXJyZXIgaWYgZG9jdW1lbnQucmVmZXJyZXIubGVuZ3RoID4gMFxuXG4gICAgICAgICMgQXBwbGljYXRpb24uXG4gICAgICAgIFsnbmFtZScsICd2ZXJzaW9uJywgJ2J1aWxkJ10uZm9yRWFjaCAoa2V5KSAtPlxuICAgICAgICAgICAgZGVsZXRlIGFwcGxpY2F0aW9uW2tleV0gaWYgdHlwZW9mIGFwcGxpY2F0aW9uW2tleV0gaXNudCAnc3RyaW5nJyBvciBhcHBsaWNhdGlvbltrZXldLmxlbmd0aCBpcyAwXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgY29udGV4dC5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uIGlmIE9iamVjdC5rZXlzKGFwcGxpY2F0aW9uKS5sZW5ndGggPiAwXG5cbiAgICAgICAgIyBDYW1wYWlnbi5cbiAgICAgICAgWydzb3VyY2UnLCAnbWVkaXVtJywgJ25hbWUnLCAndGVybScsICdjb250ZW50J10uZm9yRWFjaCAoa2V5KSAtPlxuICAgICAgICAgICAgZGVsZXRlIGNhbXBhaWduW2tleV0gaWYgdHlwZW9mIGNhbXBhaWduW2tleV0gaXNudCAnc3RyaW5nJyBvciBjYW1wYWlnbltrZXldLmxlbmd0aCBpcyAwXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgY29udGV4dC5jYW1wYWlnbiA9IGNhbXBhaWduIGlmIE9iamVjdC5rZXlzKGNhbXBhaWduKS5sZW5ndGggPiAwXG5cbiAgICAgICAgIyBMb2NhdGlvbi5cbiAgICAgICAgWydsYXRpdHVkZScsICdsb25naXR1ZGUnLCAnYWx0aXR1ZGUnLCAnc3BlZWQnLCAnZmxvb3InXS5mb3JFYWNoIChrZXkpIC0+XG4gICAgICAgICAgICBkZWxldGUgbG9jW2tleV0gaWYgdHlwZW9mIGxvY1trZXldIGlzbnQgJ251bWJlcidcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBkZWxldGUgbG9jLmFjY3VyYWN5Lmhvcml6b250YWwgaWYgdHlwZW9mIGxvYy5hY2N1cmFjeS5ob3Jpem9udGFsIGlzbnQgJ251bWJlcidcbiAgICAgICAgZGVsZXRlIGxvYy5hY2N1cmFjeS52ZXJ0aWNhbCBpZiB0eXBlb2YgbG9jLmFjY3VyYWN5LnZlcnRpY2FsIGlzbnQgJ251bWJlcidcbiAgICAgICAgZGVsZXRlIGxvYy5hY2N1cmFjeSBpZiBPYmplY3Qua2V5cyhsb2MuYWNjdXJhY3kpLmxlbmd0aCBpcyAwXG4gICAgICAgIGRlbGV0ZSBsb2MuZGV0ZXJtaW5lZEF0IGlmIHR5cGVvZiBsb2MuZGV0ZXJtaW5lZEF0IGlzbnQgJ3N0cmluZycgb3IgbG9jLmRldGVybWluZWRBdC5sZW5ndGggaXMgMFxuICAgICAgICBjb250ZXh0LmxvY2F0aW9uID0gbG9jIGlmIE9iamVjdC5rZXlzKGxvYykubGVuZ3RoID4gMFxuXG4gICAgICAgICMgUGVyc29uIGlkZW50aWZpZXIuXG4gICAgICAgIGNvbnRleHQucGVyc29uSWQgPSBAaWRlbnRpdHkuaWQgaWYgQGlkZW50aXR5LmlkP1xuXG4gICAgICAgIGNvbnRleHRcblxuICAgIGdldFBvb2xTaXplOiAtPlxuICAgICAgICBwb29sLmxlbmd0aFxuXG4gICAgZGlzcGF0Y2g6IC0+XG4gICAgICAgIHJldHVybiBpZiBAZGlzcGF0Y2hpbmcgaXMgdHJ1ZSBvciBAZ2V0UG9vbFNpemUoKSBpcyAwXG4gICAgICAgIHJldHVybiBwb29sLnNwbGljZSgwLCBAZGlzcGF0Y2hMaW1pdCkgaWYgQGRyeVJ1biBpcyB0cnVlXG5cbiAgICAgICAgZXZlbnRzID0gcG9vbC5zbGljZSAwLCBAZGlzcGF0Y2hMaW1pdFxuICAgICAgICBuYWNrcyA9IDBcblxuICAgICAgICBAZGlzcGF0Y2hpbmcgPSB0cnVlXG5cbiAgICAgICAgQHNoaXAgZXZlbnRzLCAoZXJyLCByZXNwb25zZSkgPT5cbiAgICAgICAgICAgIEBkaXNwYXRjaGluZyA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIG5vdCBlcnI/XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZXZlbnRzLmZvckVhY2ggKHJlc0V2ZW50KSAtPlxuICAgICAgICAgICAgICAgICAgICBpZiByZXNFdmVudC5zdGF0dXMgaXMgJ3ZhbGlkYXRpb25fZXJyb3InIG9yIHJlc0V2ZW50LnN0YXR1cyBpcyAnYWNrJ1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHBvb2wuZmlsdGVyIChwb29sRXZlbnQpIC0+IHBvb2xFdmVudC5pZCBpc250IHJlc0V2ZW50LmlkXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgJ25hY2snXG4gICAgICAgICAgICAgICAgICAgICAgICBuYWNrcysrXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICAjIEtlZXAgZGlzcGF0Y2hpbmcgdW50aWwgdGhlIHBvb2wgc2l6ZSByZWFjaGVzIGEgc2FuZSBsZXZlbC5cbiAgICAgICAgICAgICAgICBAZGlzcGF0Y2goKSBpZiBAZ2V0UG9vbFNpemUoKSA+PSBAZGlzcGF0Y2hMaW1pdCBhbmQgbmFja3MgaXMgMFxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAXG5cbiAgICBzaGlwOiAoZXZlbnRzID0gW10sIGNhbGxiYWNrKSAtPlxuICAgICAgICBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgdXJsID0gQGJhc2VVcmwgKyAnL3RyYWNrJ1xuICAgICAgICBwYXlsb2FkID0gZXZlbnRzOiBldmVudHMubWFwIChldmVudCkgLT5cbiAgICAgICAgICAgIGV2ZW50LnNlbnRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuXG4gICAgICAgICAgICBldmVudFxuXG4gICAgICAgIGh0dHAub3BlbiAnUE9TVCcsIHVybFxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIgJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIgJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBodHRwLnRpbWVvdXQgPSAxMDAwICogMjBcbiAgICAgICAgaHR0cC5vbmxvYWQgPSAtPlxuICAgICAgICAgICAgaWYgaHR0cC5zdGF0dXMgaXMgMjAwXG4gICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGwsIEpTT04ucGFyc2UoaHR0cC5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgY2F0Y2ggZXJyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIEpTT04nKSlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ1NlcnZlciBkaWQgbm90IGFjY2VwdCByZXF1ZXN0JykpXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBodHRwLm9uZXJyb3IgPSAtPlxuICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdDb3VsZCBub3QgcGVyZm9ybSBuZXR3b3JrIHJlcXVlc3QnKSlcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGh0dHAuc2VuZCBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuXG4gICAgICAgIEBcbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBiYXNlVXJsOiAnaHR0cHM6Ly9ncmFwaC5zZXJ2aWNlLnNob3BndW4uY29tJ1xuXG4gICAgcmVxdWVzdDogcmVxdWlyZSAnLi9yZXF1ZXN0J1xuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuXG5wYXJzZUNvb2tpZXMgPSAoY29va2llcyA9IFtdKSAtPlxuICAgIHBhcnNlZENvb2tpZXMgPSB7fVxuXG4gICAgY29va2llcy5tYXAgKGNvb2tpZSkgLT5cbiAgICAgICAgcGFydHMgPSBjb29raWUuc3BsaXQgJzsgJ1xuICAgICAgICBrZXlWYWx1ZVBhaXIgPSBwYXJ0c1swXS5zcGxpdCAnPSdcbiAgICAgICAga2V5ID0ga2V5VmFsdWVQYWlyWzBdXG4gICAgICAgIHZhbHVlID0ga2V5VmFsdWVQYWlyWzFdXG5cbiAgICAgICAgcGFyc2VkQ29va2llc1trZXldID0gdmFsdWVcblxuICAgICAgICByZXR1cm5cbiAgICBcbiAgICBwYXJzZWRDb29raWVzXG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2spIC0+XG4gICAgdXJsID0gU0dOLkdyYXBoS2l0LmJhc2VVcmxcbiAgICB0aW1lb3V0ID0gMTAwMCAqIDEyXG4gICAgYXBwS2V5ID0gU0dOLmNvbmZpZy5nZXQgJ2FwcEtleSdcbiAgICBhdXRoVG9rZW4gPSBTR04uY29uZmlnLmdldCAnYXV0aFRva2VuJ1xuICAgIGF1dGhUb2tlbkNvb2tpZU5hbWUgPSAnc2hvcGd1bi1hdXRoLXRva2VuJ1xuICAgIG9wdGlvbnMgPVxuICAgICAgICBtZXRob2Q6ICdwb3N0J1xuICAgICAgICB1cmw6IHVybFxuICAgICAgICBoZWFkZXJzOlxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5XG4gICAgICAgICAgICBxdWVyeTogb3B0aW9ucy5xdWVyeVxuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogb3B0aW9ucy5vcGVyYXRpb25OYW1lXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG9wdGlvbnMudmFyaWFibGVzXG5cbiAgICAjIEFwcGx5IGF1dGhvcml6YXRpb24gaGVhZGVyIHdoZW4gYXBwIGtleSBpcyBwcm92aWRlZCB0byBhdm9pZCByYXRlIGxpbWl0aW5nLlxuICAgIG9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBTR04udXRpbC5idG9hKFwiYXBwLWtleToje2FwcEtleX1cIikgaWYgYXBwS2V5P1xuXG4gICAgIyBTZXQgY29va2llcyBtYW51YWxseSBpbiBub2RlLmpzLlxuICAgIGlmIFNHTi51dGlsLmlzTm9kZSgpIGFuZCBhdXRoVG9rZW4/XG4gICAgICAgIG9wdGlvbnMuY29va2llcyA9IFtcbiAgICAgICAgICAgIGtleTogYXV0aFRva2VuQ29va2llTmFtZVxuICAgICAgICAgICAgdmFsdWU6IGF1dGhUb2tlblxuICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgXVxuICAgIGVsc2UgaWYgU0dOLnV0aWwuaXNCcm93c2VyKClcbiAgICAgICAgb3B0aW9ucy51c2VDb29raWVzID0gdHJ1ZVxuXG4gICAgU0dOLnJlcXVlc3Qgb3B0aW9ucywgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdHcmFwaCByZXF1ZXN0IGVycm9yJyksXG4gICAgICAgICAgICAgICAgY29kZTogJ0dyYXBoUmVxdWVzdEVycm9yJ1xuICAgICAgICAgICAgKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIFVwZGF0ZSBhdXRoIHRva2VuIGFzIGl0IG1pZ2h0IGhhdmUgY2hhbmdlZC5cbiAgICAgICAgICAgIGlmIFNHTi51dGlsLmlzTm9kZSgpXG4gICAgICAgICAgICAgICAgY29va2llcyA9IHBhcnNlQ29va2llcyBkYXRhLmhlYWRlcnM/WydzZXQtY29va2llJ11cbiAgICAgICAgICAgICAgICBhdXRoQ29va2llID0gY29va2llc1thdXRoVG9rZW5Db29raWVOYW1lXVxuXG4gICAgICAgICAgICAgICAgaWYgU0dOLmNvbmZpZy5nZXQoJ2F1dGhUb2tlbicpIGlzbnQgYXV0aENvb2tpZVxuICAgICAgICAgICAgICAgICAgICBTR04uY29uZmlnLnNldCAnYXV0aFRva2VuJywgYXV0aENvb2tpZVxuXG4gICAgICAgICAgICBpZiBkYXRhLnN0YXR1c0NvZGUgaXMgMjAwXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgbnVsbCwgSlNPTi5wYXJzZShkYXRhLmJvZHkpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdHcmFwaCBBUEkgZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogJ0dyYXBoQVBJRXJyb3InXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGRhdGEuc3RhdHVzQ29kZVxuICAgICAgICAgICAgICAgIClcblxuICAgICAgICByZXR1cm5cblxuICAgIHJldHVyblxuXG5cbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xua2V5Q29kZXMgPSByZXF1aXJlICcuLi8uLi9rZXlfY29kZXMnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25Db250cm9sc1xuICAgIGNvbnN0cnVjdG9yOiAoZWwsIEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBlbHMgPVxuICAgICAgICAgICAgcm9vdDogZWxcbiAgICAgICAgICAgIHByb2dyZXNzOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19wcm9ncmVzcydcbiAgICAgICAgICAgIHByb2dyZXNzQmFyOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwLXByb2dyZXNzX19iYXInXG4gICAgICAgICAgICBwcm9ncmVzc0xhYmVsOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19wcm9ncmVzcy1sYWJlbCdcbiAgICAgICAgICAgIHByZXZDb250cm9sOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19jb250cm9sW2RhdGEtZGlyZWN0aW9uPXByZXZdJ1xuICAgICAgICAgICAgbmV4dENvbnRyb2w6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHBfX2NvbnRyb2xbZGF0YS1kaXJlY3Rpb249bmV4dF0nXG5cbiAgICAgICAgQGtleURvd25MaXN0ZW5lciA9IFNHTi51dGlsLnRocm90dGxlIEBrZXlEb3duLCAxNTAsIEBcbiAgICAgICAgQG1vdXNlTW92ZUxpc3RlbmVyID0gU0dOLnV0aWwudGhyb3R0bGUgQG1vdXNlTW92ZSwgNTAsIEBcblxuICAgICAgICBAZWxzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lciAna2V5ZG93bicsIEBrZXlEb3duTGlzdGVuZXIsIGZhbHNlIGlmIEBvcHRpb25zLmtleWJvYXJkIGlzIHRydWVcbiAgICAgICAgQGVscy5yb290LmFkZEV2ZW50TGlzdGVuZXIgJ21vdXNlbW92ZScsIEBtb3VzZU1vdmVMaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgQGVscy5wcmV2Q29udHJvbC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIEBwcmV2Q2xpY2tlZC5iaW5kKEApLCBmYWxzZSBpZiBAZWxzLnByZXZDb250cm9sP1xuICAgICAgICBAZWxzLm5leHRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgQG5leHRDbGlja2VkLmJpbmQoQCksIGZhbHNlIGlmIEBlbHMubmV4dENvbnRyb2w/XG5cbiAgICAgICAgQGJpbmQgJ2JlZm9yZU5hdmlnYXRpb24nLCBAYmVmb3JlTmF2aWdhdGlvbi5iaW5kKEApXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAZWxzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lciAna2V5ZG93bicsIEBrZXlEb3duTGlzdGVuZXJcbiAgICAgICAgQGVscy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ21vdXNlbW92ZScsIEBtb3VzZU1vdmVMaXN0ZW5lclxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYmVmb3JlTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHNob3dQcm9ncmVzcyA9IHR5cGVvZiBlLnByb2dyZXNzTGFiZWwgaXMgJ3N0cmluZycgYW5kIGUucHJvZ3Jlc3NMYWJlbC5sZW5ndGggPiAwXG4gICAgICAgIHZpc2liaWxpdHlDbGFzc05hbWUgPSAnc2duLXBwLS1oaWRkZW4nXG5cbiAgICAgICAgaWYgQGVscy5wcm9ncmVzcz8gYW5kIEBlbHMucHJvZ3Jlc3NCYXI/XG4gICAgICAgICAgICBAZWxzLnByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gXCIje2UucHJvZ3Jlc3N9JVwiXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIHNob3dQcm9ncmVzcyBpcyB0cnVlXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzcy5jbGFzc0xpc3QucmVtb3ZlIHZpc2liaWxpdHlDbGFzc05hbWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAZWxzLnByb2dyZXNzLmNsYXNzTGlzdC5hZGQgdmlzaWJpbGl0eUNsYXNzTmFtZVxuXG4gICAgICAgIGlmIEBlbHMucHJvZ3Jlc3NMYWJlbD9cbiAgICAgICAgICAgIGlmIHNob3dQcm9ncmVzcyBpcyB0cnVlXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzc0xhYmVsLnRleHRDb250ZW50ID0gZS5wcm9ncmVzc0xhYmVsXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzc0xhYmVsLmNsYXNzTGlzdC5yZW1vdmUgdmlzaWJpbGl0eUNsYXNzTmFtZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEBlbHMucHJvZ3Jlc3NMYWJlbC5jbGFzc0xpc3QuYWRkIHZpc2liaWxpdHlDbGFzc05hbWVcblxuICAgICAgICBpZiBAZWxzLnByZXZDb250cm9sP1xuICAgICAgICAgICAgaWYgZS52ZXJzby5uZXdQb3NpdGlvbiBpcyAwXG4gICAgICAgICAgICAgICAgQGVscy5wcmV2Q29udHJvbC5jbGFzc0xpc3QuYWRkIHZpc2liaWxpdHlDbGFzc05hbWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAZWxzLnByZXZDb250cm9sLmNsYXNzTGlzdC5yZW1vdmUgdmlzaWJpbGl0eUNsYXNzTmFtZVxuXG4gICAgICAgIGlmIEBlbHMubmV4dENvbnRyb2w/XG4gICAgICAgICAgICBpZiBlLnZlcnNvLm5ld1Bvc2l0aW9uIGlzIGUucGFnZVNwcmVhZENvdW50IC0gMVxuICAgICAgICAgICAgICAgIEBlbHMubmV4dENvbnRyb2wuY2xhc3NMaXN0LmFkZCB2aXNpYmlsaXR5Q2xhc3NOYW1lXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQGVscy5uZXh0Q29udHJvbC5jbGFzc0xpc3QucmVtb3ZlIHZpc2liaWxpdHlDbGFzc05hbWVcblxuICAgICAgICByZXR1cm5cblxuICAgIHByZXZDbGlja2VkOiAoZSkgLT5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgQHRyaWdnZXIgJ3ByZXYnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBuZXh0Q2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIEB0cmlnZ2VyICduZXh0J1xuXG4gICAgICAgIHJldHVyblxuXG4gICAga2V5RG93bjogKGUpIC0+XG4gICAgICAgIGtleUNvZGUgPSBlLmtleUNvZGVcblxuICAgICAgICBpZiBrZXlDb2Rlcy5BUlJPV19MRUZUIGlzIGtleUNvZGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdwcmV2JywgZHVyYXRpb246IDBcbiAgICAgICAgZWxzZSBpZiBrZXlDb2Rlcy5BUlJPV19SSUdIVCBpcyBrZXlDb2RlIG9yIGtleUNvZGVzLlNQQUNFIGlzIGtleUNvZGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICduZXh0JywgZHVyYXRpb246IDBcbiAgICAgICAgZWxzZSBpZiBrZXlDb2Rlcy5OVU1CRVJfT05FIGlzIGtleUNvZGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdmaXJzdCcsIGR1cmF0aW9uOiAwXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBtb3VzZU1vdmU6IC0+XG4gICAgICAgIEBlbHMucm9vdC5kYXRhc2V0Lm1vdXNlTW92aW5nID0gdHJ1ZVxuXG4gICAgICAgIGNsZWFyVGltZW91dCBAbW91c2VNb3ZlVGltZW91dFxuXG4gICAgICAgIEBtb3VzZU1vdmVUaW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgQGVscy5yb290LmRhdGFzZXQubW91c2VNb3ZpbmcgPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgLCA0MDAwXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkNvbnRyb2xzXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkNvbnRyb2xzXG4iLCJNaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblBhZ2VTcHJlYWRzID0gcmVxdWlyZSAnLi9wYWdlX3NwcmVhZHMnXG5jbGllbnRMb2NhbFN0b3JhZ2UgPSByZXF1aXJlICcuLi8uLi9zdG9yYWdlL2NsaWVudF9sb2NhbCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvbkNvcmVcbiAgICBkZWZhdWx0czpcbiAgICAgICAgcGFnZXM6IFtdXG4gICAgICAgIHBhZ2VTcHJlYWRXaWR0aDogMTAwXG4gICAgICAgIHBhZ2VTcHJlYWRNYXhab29tU2NhbGU6IDRcbiAgICAgICAgaWRsZURlbGF5OiAxMDAwXG4gICAgICAgIHJlc2l6ZURlbGF5OiA0MDBcbiAgICAgICAgY29sb3I6ICcjZmZmZmZmJ1xuXG4gICAgY29uc3RydWN0b3I6IChlbCwgb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAb3B0aW9ucyA9IEBtYWtlT3B0aW9ucyBvcHRpb25zLCBAZGVmYXVsdHNcbiAgICAgICAgQHBhZ2VJZCA9IEBnZXRPcHRpb24gJ3BhZ2VJZCdcbiAgICAgICAgQGVscyA9XG4gICAgICAgICAgICByb290OiBlbFxuICAgICAgICAgICAgcGFnZXM6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHBfX3BhZ2VzJ1xuICAgICAgICAgICAgdmVyc286IGVsLnF1ZXJ5U2VsZWN0b3IgJy52ZXJzbydcbiAgICAgICAgQHBhZ2VNb2RlID0gQGdldFBhZ2VNb2RlKClcbiAgICAgICAgQHBhZ2VTcHJlYWRzID0gbmV3IFBhZ2VTcHJlYWRzXG4gICAgICAgICAgICBwYWdlczogQGdldE9wdGlvbiAncGFnZXMnXG4gICAgICAgICAgICBtYXhab29tU2NhbGU6IEBnZXRPcHRpb24gJ3BhZ2VTcHJlYWRNYXhab29tU2NhbGUnXG4gICAgICAgICAgICB3aWR0aDogQGdldE9wdGlvbiAncGFnZVNwcmVhZFdpZHRoJ1xuXG4gICAgICAgIEBwYWdlU3ByZWFkcy5iaW5kICdwYWdlTG9hZGVkJywgQHBhZ2VMb2FkZWQuYmluZChAKVxuICAgICAgICBAcGFnZVNwcmVhZHMuYmluZCAncGFnZXNMb2FkZWQnLCBAcGFnZXNMb2FkZWQuYmluZChAKVxuXG4gICAgICAgIEBzZXRDb2xvciBAZ2V0T3B0aW9uKCdjb2xvcicpXG5cbiAgICAgICAgIyBJdCdzIGltcG9ydGFudCB0byBpbnNlcnQgdGhlIHBhZ2Ugc3ByZWFkcyBiZWZvcmUgaW5zdGFudGlhdGluZyBWZXJzby5cbiAgICAgICAgQGVscy5wYWdlcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSBAcGFnZVNwcmVhZHMudXBkYXRlKEBwYWdlTW9kZSkuZ2V0RnJhZygpLCBAZWxzLnBhZ2VzXG5cbiAgICAgICAgQHZlcnNvID0gQGNyZWF0ZVZlcnNvKClcblxuICAgICAgICBAYmluZCAnc3RhcnRlZCcsIEBzdGFydC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkZXN0cm95ZWQnLCBAZGVzdHJveS5iaW5kKEApXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQGdldFZlcnNvKCkuc3RhcnQoKVxuXG4gICAgICAgIEB2aXNpYmlsaXR5Q2hhbmdlTGlzdGVuZXIgPSBAdmlzaWJpbGl0eUNoYW5nZS5iaW5kIEBcbiAgICAgICAgQHJlc2l6ZUxpc3RlbmVyID0gU0dOLnV0aWwudGhyb3R0bGUgQHJlc2l6ZSwgQGdldE9wdGlvbigncmVzaXplRGVsYXknKSwgQFxuICAgICAgICBAdW5sb2FkTGlzdGVuZXIgPSBAdW5sb2FkLmJpbmQgQFxuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ3Zpc2liaWxpdHljaGFuZ2UnLCBAdmlzaWJpbGl0eUNoYW5nZUxpc3RlbmVyLCBmYWxzZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyLCBmYWxzZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnYmVmb3JldW5sb2FkJywgQHVubG9hZExpc3RlbmVyLCBmYWxzZVxuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtc3RhcnRlZCcsICcnXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ3RhYmluZGV4JywgJy0xJ1xuICAgICAgICBAZWxzLnJvb3QuZm9jdXMoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQGdldFZlcnNvKCkuZGVzdHJveSgpXG5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciAndmlzaWJpbGl0eWNoYW5nZScsIEB2aXNpYmlsaXR5Q2hhbmdlTGlzdGVuZXIsIGZhbHNlXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXIsIGZhbHNlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBtYWtlT3B0aW9uczogKG9wdGlvbnMsIGRlZmF1bHRzKSAtPlxuICAgICAgICBvcHRzID0ge31cblxuICAgICAgICBvcHRzW2tleV0gPSBvcHRpb25zW2tleV0gPyBkZWZhdWx0c1trZXldIGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblxuICAgICAgICBvcHRzXG5cbiAgICBnZXRPcHRpb246IChrZXkpIC0+XG4gICAgICAgIEBvcHRpb25zW2tleV1cblxuICAgIHNldENvbG9yOiAoY29sb3IpIC0+XG4gICAgICAgIEBlbHMucm9vdC5kYXRhc2V0LmNvbG9yQnJpZ2h0bmVzcyA9IFNHTi51dGlsLmdldENvbG9yQnJpZ2h0bmVzcyBjb2xvclxuICAgICAgICBAZWxzLnJvb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JcblxuICAgICAgICByZXR1cm5cblxuICAgIGNyZWF0ZVZlcnNvOiAtPlxuICAgICAgICBWZXJzbyA9IHJlcXVpcmUgJ3ZlcnNvLWJyb3dzZXInXG4gICAgICAgIHZlcnNvID0gbmV3IFZlcnNvIEBlbHMudmVyc28sIHBhZ2VJZDogQHBhZ2VJZFxuXG4gICAgICAgIHZlcnNvLnBhZ2VTcHJlYWRzLmZvckVhY2ggQG92ZXJyaWRlUGFnZVNwcmVhZENvbnRlbnRSZWN0LmJpbmQoQClcblxuICAgICAgICB2ZXJzby5iaW5kICdiZWZvcmVOYXZpZ2F0aW9uJywgQGJlZm9yZU5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdhZnRlck5hdmlnYXRpb24nLCBAYWZ0ZXJOYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIEBhdHRlbXB0ZWROYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnY2xpY2tlZCcsIEBjbGlja2VkLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnZG91YmxlQ2xpY2tlZCcsIEBkb3VibGVDbGlja2VkLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAncHJlc3NlZCcsIEBwcmVzc2VkLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAncGFuU3RhcnQnLCBAcGFuU3RhcnQuYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdwYW5FbmQnLCBAcGFuRW5kLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnem9vbWVkSW4nLCBAem9vbWVkSW4uYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICd6b29tZWRPdXQnLCBAem9vbWVkT3V0LmJpbmQoQClcblxuICAgICAgICB2ZXJzb1xuXG4gICAgZ2V0VmVyc286IC0+XG4gICAgICAgIEB2ZXJzb1xuXG4gICAgZ2V0Q29udGVudFJlY3Q6IChwYWdlU3ByZWFkKSAtPlxuICAgICAgICByZWN0ID1cbiAgICAgICAgICAgIHRvcDogMFxuICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICAgICAgcmlnaHQ6IDBcbiAgICAgICAgICAgIGJvdHRvbTogMFxuICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICBwYWdlRWxzID0gcGFnZVNwcmVhZC5nZXRQYWdlRWxzKClcbiAgICAgICAgcGFnZUVsID0gcGFnZUVsc1swXVxuICAgICAgICBwYWdlQ291bnQgPSBwYWdlRWxzLmxlbmd0aFxuICAgICAgICBzY2FsZSA9IEBnZXRWZXJzbygpLnRyYW5zZm9ybS5zY2FsZVxuICAgICAgICBwYWdlV2lkdGggPSBwYWdlRWwub2Zmc2V0V2lkdGggKiBwYWdlQ291bnQgKiBzY2FsZVxuICAgICAgICBwYWdlSGVpZ2h0ID0gcGFnZUVsLm9mZnNldEhlaWdodCAqIHNjYWxlXG4gICAgICAgIGltYWdlUmF0aW8gPSArcGFnZUVsLmRhdGFzZXQuaGVpZ2h0IC8gKCtwYWdlRWwuZGF0YXNldC53aWR0aCAqIHBhZ2VDb3VudClcbiAgICAgICAgYWN0dWFsSGVpZ2h0ID0gcGFnZUhlaWdodFxuICAgICAgICBhY3R1YWxXaWR0aCA9IGFjdHVhbEhlaWdodCAvIGltYWdlUmF0aW9cbiAgICAgICAgYWN0dWFsV2lkdGggPSBNYXRoLm1pbiBwYWdlV2lkdGgsIGFjdHVhbFdpZHRoXG4gICAgICAgIGFjdHVhbEhlaWdodCA9IGFjdHVhbFdpZHRoICogaW1hZ2VSYXRpb1xuICAgICAgICBjbGllbnRSZWN0ID0gcGFnZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgcmVjdC53aWR0aCA9IGFjdHVhbFdpZHRoXG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gYWN0dWFsSGVpZ2h0XG4gICAgICAgIHJlY3QudG9wID0gY2xpZW50UmVjdC50b3AgKyAocGFnZUhlaWdodCAtIGFjdHVhbEhlaWdodCkgLyAyXG4gICAgICAgIHJlY3QubGVmdCA9IGNsaWVudFJlY3QubGVmdCArIChwYWdlV2lkdGggLSBhY3R1YWxXaWR0aCkgLyAyXG4gICAgICAgIHJlY3QucmlnaHQgPSByZWN0LndpZHRoICsgcmVjdC5sZWZ0XG4gICAgICAgIHJlY3QuYm90dG9tID0gcmVjdC5oZWlnaHQgKyByZWN0LnRvcFxuXG4gICAgICAgIHJlY3RcblxuICAgIGZvcm1hdFByb2dyZXNzTGFiZWw6IChwYWdlU3ByZWFkKSAtPlxuICAgICAgICBwYWdlcyA9IHBhZ2VTcHJlYWQ/Lm9wdGlvbnMucGFnZXMgPyBbXVxuICAgICAgICBwYWdlSWRzID0gcGFnZXMubWFwIChwYWdlKSAtPiBwYWdlLmlkXG4gICAgICAgIHBhZ2VMYWJlbHMgPSBwYWdlcy5tYXAgKHBhZ2UpIC0+IHBhZ2UubGFiZWxcbiAgICAgICAgcGFnZUNvdW50ID0gQGdldE9wdGlvbigncGFnZXMnKS5sZW5ndGhcbiAgICAgICAgbGFiZWwgPSBpZiBwYWdlSWRzLmxlbmd0aCA+IDAgdGhlbiBwYWdlTGFiZWxzLmpvaW4oJy0nKSArICcgLyAnICsgcGFnZUNvdW50IGVsc2UgbnVsbFxuXG4gICAgICAgIGxhYmVsXG5cbiAgICByZW5kZXJQYWdlU3ByZWFkczogLT5cbiAgICAgICAgQGdldFZlcnNvKCkucGFnZVNwcmVhZHMuZm9yRWFjaCAocGFnZVNwcmVhZCkgPT5cbiAgICAgICAgICAgIHZpc2liaWxpdHkgPSBwYWdlU3ByZWFkLmdldFZpc2liaWxpdHkoKVxuICAgICAgICAgICAgbWF0Y2ggPSBAcGFnZVNwcmVhZHMuZ2V0IHBhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgICAgICBpZiBtYXRjaD9cbiAgICAgICAgICAgICAgICBpZiB2aXNpYmlsaXR5IGlzICd2aXNpYmxlJyBhbmQgbWF0Y2guY29udGVudHNSZW5kZXJlZCBpcyBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0IG1hdGNoLnJlbmRlckNvbnRlbnRzLmJpbmQobWF0Y2gpLCAwXG4gICAgICAgICAgICAgICAgaWYgdmlzaWJpbGl0eSBpcyAnZ29uZScgYW5kIG1hdGNoLmNvbnRlbnRzUmVuZGVyZWQgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0IG1hdGNoLmNsZWFyQ29udGVudHMuYmluZChtYXRjaCksIDBcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQFxuXG4gICAgZmluZFBhZ2U6IChwYWdlSWQpIC0+XG4gICAgICAgIEBnZXRPcHRpb24oJ3BhZ2VzJykuZmluZCAocGFnZSkgLT4gcGFnZS5pZCBpcyBwYWdlSWRcblxuICAgIHBhZ2VMb2FkZWQ6IChlKSAtPlxuICAgICAgICBAdHJpZ2dlciAncGFnZUxvYWRlZCcsIGVcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VzTG9hZGVkOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3BhZ2VzTG9hZGVkJywgZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYmVmb3JlTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHBvc2l0aW9uID0gZS5uZXdQb3NpdGlvblxuICAgICAgICB2ZXJzb1BhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIHBvc2l0aW9uXG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAcGFnZVNwcmVhZHMuZ2V0IHZlcnNvUGFnZVNwcmVhZC5nZXRJZCgpXG4gICAgICAgIHBhZ2VTcHJlYWRDb3VudCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRDb3VudCgpXG4gICAgICAgIHByb2dyZXNzID0gKHBvc2l0aW9uICsgMSkgLyBwYWdlU3ByZWFkQ291bnQgKiAxMDBcbiAgICAgICAgcHJvZ3Jlc3NMYWJlbCA9IEBmb3JtYXRQcm9ncmVzc0xhYmVsIHBhZ2VTcHJlYWRcblxuICAgICAgICBAcmVuZGVyUGFnZVNwcmVhZHMoKVxuICAgICAgICBAcmVzZXRJZGxlVGltZXIoKVxuICAgICAgICBAc3RhcnRJZGxlVGltZXIoKVxuICAgICAgICBAdHJpZ2dlciAnYmVmb3JlTmF2aWdhdGlvbicsXG4gICAgICAgICAgICB2ZXJzbzogZVxuICAgICAgICAgICAgcGFnZVNwcmVhZDogcGFnZVNwcmVhZFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzXG4gICAgICAgICAgICBwcm9ncmVzc0xhYmVsOiBwcm9ncmVzc0xhYmVsXG4gICAgICAgICAgICBwYWdlU3ByZWFkQ291bnQ6IHBhZ2VTcHJlYWRDb3VudFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYWZ0ZXJOYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgcG9zaXRpb24gPSBlLm5ld1Bvc2l0aW9uXG4gICAgICAgIHZlcnNvUGFnZVNwcmVhZCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgcGFnZVNwcmVhZCA9IEBwYWdlU3ByZWFkcy5nZXQgdmVyc29QYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBAdHJpZ2dlciAnYWZ0ZXJOYXZpZ2F0aW9uJyxcbiAgICAgICAgICAgIHZlcnNvOiBlXG4gICAgICAgICAgICBwYWdlU3ByZWFkOiBwYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhdHRlbXB0ZWROYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ2F0dGVtcHRlZE5hdmlnYXRpb24nLCB2ZXJzbzogZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgY2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGlmIGUuaXNJbnNpZGVDb250ZW50XG4gICAgICAgICAgICBwYWdlSWQgPSBlLnBhZ2VFbC5kYXRhc2V0LmlkXG4gICAgICAgICAgICBwYWdlID0gQGZpbmRQYWdlIHBhZ2VJZFxuXG4gICAgICAgICAgICBAdHJpZ2dlciAnY2xpY2tlZCcsIHZlcnNvOiBlLCBwYWdlOiBwYWdlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkb3VibGVDbGlja2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS5pc0luc2lkZUNvbnRlbnRcbiAgICAgICAgICAgIHBhZ2VJZCA9IGUucGFnZUVsLmRhdGFzZXQuaWRcbiAgICAgICAgICAgIHBhZ2UgPSBAZmluZFBhZ2UgcGFnZUlkXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdkb3VibGVDbGlja2VkJywgdmVyc286IGUsIHBhZ2U6IHBhZ2VcblxuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLmlzSW5zaWRlQ29udGVudFxuICAgICAgICAgICAgcGFnZUlkID0gZS5wYWdlRWwuZGF0YXNldC5pZFxuICAgICAgICAgICAgcGFnZSA9IEBmaW5kUGFnZSBwYWdlSWRcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ3ByZXNzZWQnLCB2ZXJzbzogZSwgcGFnZTogcGFnZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuU3RhcnQ6IC0+XG4gICAgICAgIEByZXNldElkbGVUaW1lcigpXG4gICAgICAgIEB0cmlnZ2VyICdwYW5TdGFydCcsIHNjYWxlOiBAZ2V0VmVyc28oKS50cmFuc2Zvcm0uc2NhbGVcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhbkVuZDogLT5cbiAgICAgICAgQHN0YXJ0SWRsZVRpbWVyKClcbiAgICAgICAgQHRyaWdnZXIgJ3BhbkVuZCdcblxuICAgICAgICByZXR1cm5cblxuICAgIHpvb21lZEluOiAoZSkgLT5cbiAgICAgICAgcG9zaXRpb24gPSBlLnBvc2l0aW9uXG4gICAgICAgIHZlcnNvUGFnZVNwcmVhZCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgcGFnZVNwcmVhZCA9IEBwYWdlU3ByZWFkcy5nZXQgdmVyc29QYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBwYWdlU3ByZWFkLnpvb21JbigpIGlmIHBhZ2VTcHJlYWQ/XG5cbiAgICAgICAgQGVscy5yb290LnNldEF0dHJpYnV0ZSAnZGF0YS16b29tZWQtaW4nLCB0cnVlXG4gICAgICAgIEB0cmlnZ2VyICd6b29tZWRJbicsIHZlcnNvOiBlLCBwYWdlU3ByZWFkOiBwYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB6b29tZWRPdXQ6IChlKSAtPlxuICAgICAgICBwb3NpdGlvbiA9IGUucG9zaXRpb25cbiAgICAgICAgdmVyc29QYWdlU3ByZWFkID0gQGdldFZlcnNvKCkuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBwb3NpdGlvblxuICAgICAgICBwYWdlU3ByZWFkID0gQHBhZ2VTcHJlYWRzLmdldCB2ZXJzb1BhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgIHBhZ2VTcHJlYWQuem9vbU91dCgpIGlmIHBhZ2VTcHJlYWQ/XG5cbiAgICAgICAgQGVscy5yb290LnNldEF0dHJpYnV0ZSAnZGF0YS16b29tZWQtaW4nLCBmYWxzZVxuICAgICAgICBAdHJpZ2dlciAnem9vbWVkT3V0JywgdmVyc286IGUsIHBhZ2VTcHJlYWQ6IHBhZ2VTcHJlYWRcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldFBhZ2VNb2RlOiAtPlxuICAgICAgICBwYWdlTW9kZSA9IEBnZXRPcHRpb24gJ3BhZ2VNb2RlJ1xuXG4gICAgICAgIGlmIG5vdCBwYWdlTW9kZT9cbiAgICAgICAgICAgIHdpZHRoID0gQGVscy5yb290Lm9mZnNldFdpZHRoXG4gICAgICAgICAgICBoZWlnaHQgPSBAZWxzLnJvb3Qub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgICAgIHBhZ2VNb2RlID0gaWYgaGVpZ2h0ID49IHdpZHRoIHRoZW4gJ3NpbmdsZScgZWxzZSAnZG91YmxlJ1xuXG4gICAgICAgIHBhZ2VNb2RlXG5cbiAgICByZXNldElkbGVUaW1lcjogLT5cbiAgICAgICAgY2xlYXJUaW1lb3V0IEBpZGxlVGltZW91dFxuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWRsZScsIGZhbHNlXG5cbiAgICAgICAgQFxuXG4gICAgc3RhcnRJZGxlVGltZXI6IC0+XG4gICAgICAgIEBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQgPT5cbiAgICAgICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWRsZScsIHRydWVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICwgQGdldE9wdGlvbignaWRsZURlbGF5JylcblxuICAgICAgICBAXG5cbiAgICBzd2l0Y2hQYWdlTW9kZTogKHBhZ2VNb2RlKSAtPlxuICAgICAgICByZXR1cm4gQCBpZiBAcGFnZU1vZGUgaXMgcGFnZU1vZGVcblxuICAgICAgICB2ZXJzbyA9IEBnZXRWZXJzbygpXG4gICAgICAgIHBhZ2VJZHMgPSB2ZXJzby5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uKHZlcnNvLmdldFBvc2l0aW9uKCkpLmdldFBhZ2VJZHMoKVxuICAgICAgICBwYWdlU3ByZWFkRWxzID0gQGdldFZlcnNvKCkuZWwucXVlcnlTZWxlY3RvckFsbCAnLnNnbi1wcF9fcGFnZS1zcHJlYWQnXG5cbiAgICAgICAgQHBhZ2VNb2RlID0gcGFnZU1vZGVcblxuICAgICAgICBAcGFnZVNwcmVhZHMudXBkYXRlIEBwYWdlTW9kZVxuXG4gICAgICAgIHBhZ2VTcHJlYWRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIHBhZ2VTcHJlYWRFbCBmb3IgcGFnZVNwcmVhZEVsIGluIHBhZ2VTcHJlYWRFbHNcbiAgICAgICAgQGVscy5wYWdlcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSBAcGFnZVNwcmVhZHMuZ2V0RnJhZygpLCBAZWxzLnBhZ2VzXG5cbiAgICAgICAgdmVyc28ucmVmcmVzaCgpXG4gICAgICAgIHZlcnNvLm5hdmlnYXRlVG8gdmVyc28uZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZChwYWdlSWRzWzBdKSwgZHVyYXRpb246IDBcbiAgICAgICAgdmVyc28ucGFnZVNwcmVhZHMuZm9yRWFjaCBAb3ZlcnJpZGVQYWdlU3ByZWFkQ29udGVudFJlY3QuYmluZChAKVxuXG4gICAgICAgIEBcblxuICAgIG92ZXJyaWRlUGFnZVNwcmVhZENvbnRlbnRSZWN0OiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgaWYgcGFnZVNwcmVhZC5nZXRUeXBlKCkgaXMgJ3BhZ2UnXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmdldENvbnRlbnRSZWN0ID0gPT4gQGdldENvbnRlbnRSZWN0IHBhZ2VTcHJlYWRcblxuICAgIHZpc2liaWxpdHlDaGFuZ2U6IC0+XG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIEBnZXRWZXJzbygpLmdldFBvc2l0aW9uKClcbiAgICAgICAgZXZlbnROYW1lID0gaWYgZG9jdW1lbnQuaGlkZGVuIGlzIHRydWUgdGhlbiAnZGlzYXBwZWFyZWQnIGVsc2UgJ2FwcGVhcmVkJ1xuXG4gICAgICAgIEB0cmlnZ2VyIGV2ZW50TmFtZSwgcGFnZVNwcmVhZDogQHBhZ2VTcHJlYWRzLmdldChwYWdlU3ByZWFkLmlkKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplOiAtPlxuICAgICAgICBwYWdlTW9kZSA9IEBnZXRQYWdlTW9kZSgpXG5cbiAgICAgICAgaWYgbm90IEBnZXRPcHRpb24oJ3BhZ2VNb2RlJyk/IGFuZCBwYWdlTW9kZSBpc250IEBwYWdlTW9kZVxuICAgICAgICAgICAgQHN3aXRjaFBhZ2VNb2RlIHBhZ2VNb2RlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0cmlnZ2VyICdyZXNpemVkJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgdW5sb2FkOiAtPlxuICAgICAgICBAdHJpZ2dlciAnZGlzYXBwZWFyZWQnXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkNvcmVcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uQ29yZVxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25FdmVudFRyYWNraW5nXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBoaWRkZW4gPSB0cnVlXG4gICAgICAgIEBwYWdlU3ByZWFkID0gbnVsbFxuXG4gICAgICAgIEBiaW5kICdhcHBlYXJlZCcsIEBhcHBlYXJlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkaXNhcHBlYXJlZCcsIEBkaXNhcHBlYXJlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdiZWZvcmVOYXZpZ2F0aW9uJywgQGJlZm9yZU5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICBAYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgQGFmdGVyTmF2aWdhdGlvbi5iaW5kKEApXG4gICAgICAgIEBiaW5kICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgQGF0dGVtcHRlZE5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICBAYmluZCAnY2xpY2tlZCcsIEBjbGlja2VkLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ2RvdWJsZUNsaWNrZWQnLCBAZG91YmxlQ2xpY2tlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdwcmVzc2VkJywgQHByZXNzZWQuYmluZChAKVxuICAgICAgICBAYmluZCAncGFuU3RhcnQnLCBAcGFuU3RhcnQuYmluZChAKVxuICAgICAgICBAYmluZCAnem9vbWVkSW4nLCBAem9vbWVkSW4uYmluZChAKVxuICAgICAgICBAYmluZCAnem9vbWVkT3V0JywgQHpvb21lZE91dC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkZXN0cm95ZWQnLCBAZGVzdHJveS5iaW5kKEApXG5cbiAgICAgICAgQHRyYWNrT3BlbmVkKClcbiAgICAgICAgQHRyYWNrQXBwZWFyZWQoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQHBhZ2VTcHJlYWREaXNhcHBlYXJlZCgpXG4gICAgICAgIEB0cmFja0Rpc2FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIHRyYWNrRXZlbnQ6ICh0eXBlLCBwcm9wZXJ0aWVzID0ge30pIC0+XG4gICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JywgdHlwZTogdHlwZSwgcHJvcGVydGllczogcHJvcGVydGllc1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgdHJhY2tPcGVuZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tb3BlbmVkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrQXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tEaXNhcHBlYXJlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1kaXNhcHBlYXJlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VDbGlja2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtY2xpY2tlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VEb3VibGVDbGlja2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtZG91YmxlLWNsaWNrZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlTG9uZ1ByZXNzZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1sb25nLXByZXNzZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlSG90c3BvdHNDbGlja2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtaG90c3BvdHMtY2xpY2tlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VTcHJlYWRBcHBlYXJlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC1hcHBlYXJlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VTcHJlYWREaXNhcHBlYXJlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC1kaXNhcHBlYXJlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VTcHJlYWRab29tZWRJbjogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC16b29tZWQtaW4nLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkWm9vbWVkT3V0OiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLXpvb21lZC1vdXQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgYXBwZWFyZWQ6IChlKSAtPlxuICAgICAgICBAdHJhY2tBcHBlYXJlZCgpXG4gICAgICAgIEBwYWdlU3ByZWFkQXBwZWFyZWQgZS5wYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkaXNhcHBlYXJlZDogLT5cbiAgICAgICAgQHBhZ2VTcHJlYWREaXNhcHBlYXJlZCgpXG4gICAgICAgIEB0cmFja0Rpc2FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGJlZm9yZU5hdmlnYXRpb246IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYWZ0ZXJOYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRBcHBlYXJlZCBlLnBhZ2VTcHJlYWRcblxuICAgICAgICByZXR1cm5cblxuICAgIGF0dGVtcHRlZE5hdmlnYXRpb246IChlKSAtPlxuICAgICAgICBAcGFnZVNwcmVhZEFwcGVhcmVkIGUucGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgY2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGlmIGUucGFnZT9cbiAgICAgICAgICAgIHByb3BlcnRpZXMgPVxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXI6IGUucGFnZS5wYWdlTnVtYmVyXG4gICAgICAgICAgICAgICAgeDogZS52ZXJzby5wYWdlWFxuICAgICAgICAgICAgICAgIHk6IGUudmVyc28ucGFnZVlcblxuICAgICAgICAgICAgQHRyYWNrUGFnZUNsaWNrZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2U6IHByb3BlcnRpZXNcbiAgICAgICAgICAgIEB0cmFja1BhZ2VIb3RzcG90c0NsaWNrZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2U6IHByb3BlcnRpZXMgaWYgZS52ZXJzby5vdmVybGF5RWxzLmxlbmd0aCA+IDBcblxuICAgICAgICByZXR1cm5cblxuICAgIGRvdWJsZUNsaWNrZWQ6IChlKSA9PlxuICAgICAgICBpZiBlLnBhZ2U/XG4gICAgICAgICAgICBAdHJhY2tQYWdlRG91YmxlQ2xpY2tlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZTpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyOiBlLnBhZ2UucGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHg6IGUudmVyc28ucGFnZVhcbiAgICAgICAgICAgICAgICB5OiBlLnZlcnNvLnBhZ2VZXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzc2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS5wYWdlP1xuICAgICAgICAgICAgQHRyYWNrUGFnZUxvbmdQcmVzc2VkIHBhZ2VkUHVibGljYXRpb25QYWdlOlxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXI6IGUucGFnZS5wYWdlTnVtYmVyXG4gICAgICAgICAgICAgICAgeDogZS52ZXJzby5wYWdlWFxuICAgICAgICAgICAgICAgIHk6IGUudmVyc28ucGFnZVlcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhblN0YXJ0OiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWREaXNhcHBlYXJlZCgpIGlmIGUuc2NhbGUgaXMgMVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgem9vbWVkSW46IChlKSAtPlxuICAgICAgICBpZiBlLnBhZ2VTcHJlYWQ/XG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkWm9vbWVkSW4gcGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQ6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcnM6IGUucGFnZVNwcmVhZC5nZXRQYWdlcygpLm1hcCAocGFnZSkgLT4gcGFnZS5wYWdlTnVtYmVyXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB6b29tZWRPdXQ6IChlKSAtPlxuICAgICAgICBpZiBlLnBhZ2VTcHJlYWQ/XG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkWm9vbWVkT3V0IHBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkOlxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXJzOiBlLnBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFnZVNwcmVhZEFwcGVhcmVkOiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgaWYgcGFnZVNwcmVhZD8gYW5kIEBoaWRkZW4gaXMgdHJ1ZVxuICAgICAgICAgICAgQHBhZ2VTcHJlYWQgPSBwYWdlU3ByZWFkXG5cbiAgICAgICAgICAgIEB0cmFja1BhZ2VTcHJlYWRBcHBlYXJlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZDpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyczogcGFnZVNwcmVhZC5nZXRQYWdlcygpLm1hcCAocGFnZSkgLT4gcGFnZS5wYWdlTnVtYmVyXG5cbiAgICAgICAgICAgIEBoaWRkZW4gPSBmYWxzZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFnZVNwcmVhZERpc2FwcGVhcmVkOiAtPlxuICAgICAgICBpZiBAcGFnZVNwcmVhZD8gYW5kIEBoaWRkZW4gaXMgZmFsc2VcbiAgICAgICAgICAgIEB0cmFja1BhZ2VTcHJlYWREaXNhcHBlYXJlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZDpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyczogQHBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgICAgICBAaGlkZGVuID0gdHJ1ZVxuICAgICAgICAgICAgQHBhZ2VTcHJlYWQgPSBudWxsXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkV2ZW50VHJhY2tpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uRXZlbnRUcmFja2luZ1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5HYXRvciA9IHJlcXVpcmUgJ2dhdG9yJ1xuTXVzdGFjaGUgPSByZXF1aXJlICdtdXN0YWNoZSdcbnRlbXBsYXRlID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaG90c3BvdF9waWNrZXInXG5rZXlDb2RlcyA9IHJlcXVpcmUgJy4uLy4uL2tleV9jb2RlcydcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RQaWNrZXJcbiAgICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgQHJlc2l6ZUxpc3RlbmVyID0gQHJlc2l6ZS5iaW5kIEBcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgd2lkdGggPSBAb3B0aW9ucy53aWR0aCA/IDEwMFxuICAgICAgICBoZWFkZXIgPSBAb3B0aW9ucy5oZWFkZXJcbiAgICAgICAgdGVtcGxhdGUgPSBAb3B0aW9ucy50ZW1wbGF0ZSBpZiBAb3B0aW9ucy50ZW1wbGF0ZT9cbiAgICAgICAgdHJpZ2dlciA9IEB0cmlnZ2VyLmJpbmQgQFxuICAgICAgICB2aWV3ID1cbiAgICAgICAgICAgIGhlYWRlcjogaGVhZGVyXG4gICAgICAgICAgICBob3RzcG90czogQG9wdGlvbnMuaG90c3BvdHNcbiAgICAgICAgICAgIHRvcDogQG9wdGlvbnMueVxuICAgICAgICAgICAgbGVmdDogQG9wdGlvbnMueFxuXG4gICAgICAgIEBlbC5jbGFzc05hbWUgPSAnc2duLXBwX19ob3RzcG90LXBpY2tlcidcbiAgICAgICAgQGVsLnNldEF0dHJpYnV0ZSAndGFiaW5kZXgnLCAtMVxuICAgICAgICBAZWwuaW5uZXJIVE1MID0gTXVzdGFjaGUucmVuZGVyIHRlbXBsYXRlLCB2aWV3XG5cbiAgICAgICAgcG9wb3ZlckVsID0gQGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ25fX3BvcG92ZXInXG4gICAgICAgIHdpZHRoID0gcG9wb3ZlckVsLm9mZnNldFdpZHRoXG4gICAgICAgIGhlaWdodCA9IHBvcG92ZXJFbC5vZmZzZXRIZWlnaHRcbiAgICAgICAgcGFyZW50V2lkdGggPSBAZWwucGFyZW50Tm9kZS5vZmZzZXRXaWR0aFxuICAgICAgICBwYXJlbnRIZWlnaHQgPSBAZWwucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHRcblxuICAgICAgICBpZiB2aWV3LnRvcCArIGhlaWdodCA+IHBhcmVudEhlaWdodFxuICAgICAgICAgICAgcG9wb3ZlckVsLnN0eWxlLnRvcCA9IHBhcmVudEhlaWdodCAtIGhlaWdodCArICdweCdcblxuICAgICAgICBpZiB2aWV3LmxlZnQgKyB3aWR0aCA+IHBhcmVudFdpZHRoXG4gICAgICAgICAgICBwb3BvdmVyRWwuc3R5bGUubGVmdCA9IHBhcmVudFdpZHRoIC0gd2lkdGggKyAncHgnXG5cbiAgICAgICAgQGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2tleXVwJywgQGtleVVwLmJpbmQoQClcblxuICAgICAgICBHYXRvcihAZWwpLm9uICdjbGljaycsICdbZGF0YS1pZF0nLCAtPlxuICAgICAgICAgICAgdHJpZ2dlciAnc2VsZWN0ZWQnLCBpZDogQGdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEdhdG9yKEBlbCkub24gJ2NsaWNrJywgJ1tkYXRhLWNsb3NlXScsIEBkZXN0cm95LmJpbmQoQClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyLCBmYWxzZVxuXG4gICAgICAgIEBcblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIEBlbFxuXG4gICAgICAgIEB0cmlnZ2VyICdkZXN0cm95ZWQnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBrZXlVcDogKGUpIC0+XG4gICAgICAgIEBkZXN0cm95KCkgaWYgZS5rZXlDb2RlIGlzIGtleUNvZGVzLkVTQ1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXNpemU6IC0+XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXJcblxuICAgICAgICBAZGVzdHJveSgpXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RQaWNrZXJcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uSG90c3BvdFBpY2tlclxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5NdXN0YWNoZSA9IHJlcXVpcmUgJ211c3RhY2hlJ1xudGVtcGxhdGUgPSByZXF1aXJlICcuL3RlbXBsYXRlcy9ob3RzcG90J1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uSG90c3BvdHNcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGN1cnJlbnRQYWdlU3ByZWFkSWQgPSBudWxsXG4gICAgICAgIEBwYWdlU3ByZWFkc0xvYWRlZCA9IHt9XG4gICAgICAgIEBjYWNoZSA9IHt9XG5cbiAgICAgICAgQGJpbmQgJ2hvdHNwb3RzUmVjZWl2ZWQnLCBAaG90c3BvdHNSZWNlaXZlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdhZnRlck5hdmlnYXRpb24nLCBAYWZ0ZXJOYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3BhZ2VzTG9hZGVkJywgQHBhZ2VzTG9hZGVkLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3Jlc2l6ZWQnLCBAcmVzaXplZC5iaW5kKEApXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZW5kZXJIb3RzcG90czogKGRhdGEpIC0+XG4gICAgICAgIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgY29udGVudFJlY3QgPSBkYXRhLnZlcnNvUGFnZVNwcmVhZC5nZXRDb250ZW50UmVjdCgpXG4gICAgICAgIHBhZ2VTcHJlYWRFbCA9IGRhdGEucGFnZVNwcmVhZC5nZXRFbCgpXG4gICAgICAgIGhvdHNwb3RFbHMgPSBwYWdlU3ByZWFkRWwucXVlcnlTZWxlY3RvckFsbCAnLnNnbi1wcF9faG90c3BvdCdcblxuICAgICAgICBob3RzcG90RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBob3RzcG90RWwgZm9yIGhvdHNwb3RFbCBpbiBob3RzcG90RWxzXG5cbiAgICAgICAgZm9yIGlkLCBob3RzcG90IG9mIGRhdGEuaG90c3BvdHNcbiAgICAgICAgICAgIHBvc2l0aW9uID0gQGdldFBvc2l0aW9uIGRhdGEucGFnZXMsIGRhdGEucmF0aW8sIGhvdHNwb3RcbiAgICAgICAgICAgIGVsID0gQHJlbmRlckhvdHNwb3QgaG90c3BvdCwgcG9zaXRpb24sIGNvbnRlbnRSZWN0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQgZWxcblxuICAgICAgICBwYWdlU3ByZWFkRWwuYXBwZW5kQ2hpbGQgZnJhZ1xuXG4gICAgICAgIEBcblxuICAgIHJlbmRlckhvdHNwb3Q6IChob3RzcG90LCBwb3NpdGlvbiwgY29udGVudFJlY3QpIC0+XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgICB0b3AgPSBNYXRoLnJvdW5kIGNvbnRlbnRSZWN0LmhlaWdodCAvIDEwMCAqIHBvc2l0aW9uLnRvcFxuICAgICAgICBsZWZ0ID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC53aWR0aCAvIDEwMCAqIHBvc2l0aW9uLmxlZnRcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kIGNvbnRlbnRSZWN0LndpZHRoIC8gMTAwICogcG9zaXRpb24ud2lkdGhcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC5oZWlnaHQgLyAxMDAgKiBwb3NpdGlvbi5oZWlnaHRcblxuICAgICAgICB0b3AgKz0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC50b3BcbiAgICAgICAgbGVmdCArPSBNYXRoLnJvdW5kIGNvbnRlbnRSZWN0LmxlZnRcblxuICAgICAgICBlbC5jbGFzc05hbWUgPSAnc2duLXBwX19ob3RzcG90IHZlcnNvX19vdmVybGF5J1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWQnLCBob3RzcG90LmlkIGlmIGhvdHNwb3QuaWQ/XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSAnZGF0YS10eXBlJywgaG90c3BvdC50eXBlIGlmIGhvdHNwb3QudHlwZT9cbiAgICAgICAgZWwuaW5uZXJIVE1MID0gTXVzdGFjaGUucmVuZGVyIGhvdHNwb3QudGVtcGxhdGUgPyB0ZW1wbGF0ZSwgaG90c3BvdFxuXG4gICAgICAgIGVsLnN0eWxlLnRvcCA9IFwiI3t0b3B9cHhcIlxuICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gXCIje2xlZnR9cHhcIlxuICAgICAgICBlbC5zdHlsZS53aWR0aCA9IFwiI3t3aWR0aH1weFwiXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IFwiI3toZWlnaHR9cHhcIlxuXG4gICAgICAgIGVsXG5cbiAgICBnZXRQb3NpdGlvbjogKHBhZ2VzLCByYXRpbywgaG90c3BvdCkgLT5cbiAgICAgICAgbWluWCA9IG51bGxcbiAgICAgICAgbWluWSA9IG51bGxcbiAgICAgICAgbWF4WCA9IG51bGxcbiAgICAgICAgbWF4WSA9IG51bGxcbiAgICAgICAgcGFnZU51bWJlcnMgPSBwYWdlcy5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgIGZvciBwYWdlTnVtYmVyIG9mIGhvdHNwb3QubG9jYXRpb25zXG4gICAgICAgICAgICBjb250aW51ZSBpZiBwYWdlTnVtYmVycy5pbmRleE9mKCtwYWdlTnVtYmVyKSBpcyAtMVxuXG4gICAgICAgICAgICBob3RzcG90LmxvY2F0aW9uc1twYWdlTnVtYmVyXS5mb3JFYWNoIChjb29yZHMpIC0+XG4gICAgICAgICAgICAgICAgeCA9IGNvb3Jkc1swXVxuICAgICAgICAgICAgICAgIHkgPSBjb29yZHNbMV1cblxuICAgICAgICAgICAgICAgIHggKz0xIGlmIHBhZ2VzWzFdIGFuZCBwYWdlTnVtYmVyc1sxXSBpcyArcGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHggLz0gcGFnZXMubGVuZ3RoXG5cbiAgICAgICAgICAgICAgICBpZiBub3QgbWluWD9cbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IG1heFggPSB4XG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSBtYXhZID0geVxuXG4gICAgICAgICAgICAgICAgbWluWCA9IHggaWYgeCA8IG1pblhcbiAgICAgICAgICAgICAgICBtYXhYID0geCBpZiB4ID4gbWF4WFxuICAgICAgICAgICAgICAgIG1pblkgPSB5IGlmIHkgPCBtaW5ZXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgaWYgeSA+IG1heFlcblxuICAgICAgICB3aWR0aCA9IG1heFggLSBtaW5YXG4gICAgICAgIGhlaWdodCA9IG1heFkgLSBtaW5ZXG5cbiAgICAgICAgdG9wOiBtaW5ZIC8gcmF0aW8gKiAxMDBcbiAgICAgICAgbGVmdDogbWluWCAqIDEwMFxuICAgICAgICB3aWR0aDogd2lkdGggKiAxMDBcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgLyByYXRpbyAqIDEwMFxuXG4gICAgcmVxdWVzdEhvdHNwb3RzOiAocGFnZVNwcmVhZElkLCBwYWdlcykgLT5cbiAgICAgICAgQHRyaWdnZXIgJ2hvdHNwb3RzUmVxdWVzdGVkJyxcbiAgICAgICAgICAgIGlkOiBwYWdlU3ByZWFkSWRcbiAgICAgICAgICAgIHBhZ2VzOiBwYWdlc1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgaG90c3BvdHNSZWNlaXZlZDogKGUpIC0+XG4gICAgICAgIHBhZ2VTcHJlYWRJZCA9IGUucGFnZVNwcmVhZC5nZXRJZCgpXG5cbiAgICAgICAgQHNldENhY2hlIHBhZ2VTcHJlYWRJZCwgZVxuICAgICAgICBAcmVuZGVySG90c3BvdHMgZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0Q2FjaGU6IChwYWdlU3ByZWFkSWQpIC0+XG4gICAgICAgIEBjYWNoZVtwYWdlU3ByZWFkSWRdXG5cbiAgICBzZXRDYWNoZTogKHBhZ2VTcHJlYWRJZCwgZGF0YSkgLT5cbiAgICAgICAgQGNhY2hlW3BhZ2VTcHJlYWRJZF0gPSBkYXRhXG5cbiAgICAgICAgQFxuXG4gICAgYWZ0ZXJOYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBlLnBhZ2VTcHJlYWQ/XG5cbiAgICAgICAgaWQgPSBlLnBhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgIEBjdXJyZW50UGFnZVNwcmVhZElkID0gaWRcbiAgICAgICAgQHJlcXVlc3RIb3RzcG90cyBpZCwgZS5wYWdlU3ByZWFkLmdldFBhZ2VzKCkgaWYgQHBhZ2VTcHJlYWRzTG9hZGVkW2lkXVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFnZXNMb2FkZWQ6IChlKSAtPlxuICAgICAgICBAcGFnZVNwcmVhZHNMb2FkZWRbZS5wYWdlU3ByZWFkSWRdID0gdHJ1ZVxuICAgICAgICBAcmVxdWVzdEhvdHNwb3RzIGUucGFnZVNwcmVhZElkLCBlLnBhZ2VzIGlmIEBjdXJyZW50UGFnZVNwcmVhZElkIGlzIGUucGFnZVNwcmVhZElkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXNpemVkOiAoZSkgLT5cbiAgICAgICAgZGF0YSA9IEBnZXRDYWNoZSBAY3VycmVudFBhZ2VTcHJlYWRJZFxuXG4gICAgICAgIEByZW5kZXJIb3RzcG90cyBkYXRhIGlmIGRhdGE/XG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RzXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RzXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIFZpZXdlcjogcmVxdWlyZSAnLi92aWV3ZXInXG5cbiAgICBIb3RzcG90UGlja2VyOiByZXF1aXJlICcuL2hvdHNwb3RfcGlja2VyJ1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25MZWdhY3lFdmVudFRyYWNraW5nXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBiaW5kICdldmVudFRyYWNrZWQnLCBAZXZlbnRUcmFja2VkLmJpbmQoQClcbiAgICAgICAgQHpvb21lZEluID0gZmFsc2VcbiAgICAgICAgQGFwcGVhcmVkQXQgPSBudWxsXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB0cmFja0V2ZW50OiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3RyYWNrRXZlbnQnLCBlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBldmVudFRyYWNrZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLWFwcGVhcmVkJ1xuICAgICAgICAgICAgQGFwcGVhcmVkQXQgPSBEYXRlLm5vdygpXG4gICAgICAgIGlmIGUudHlwZSBpcyAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtZGlzYXBwZWFyZWQnXG4gICAgICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgdHlwZTogaWYgQHpvb21lZEluIHRoZW4gJ3pvb20nIGVsc2UgJ3ZpZXcnXG4gICAgICAgICAgICAgICAgbXM6IERhdGUubm93KCkgLSBAYXBwZWFyZWRBdFxuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBAZ2V0T3JpZW50YXRpb24oKVxuICAgICAgICAgICAgICAgIHBhZ2VzOiBlLnByb3BlcnRpZXMucGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQucGFnZU51bWJlcnNcbiAgICAgICAgZWxzZSBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLXpvb21lZC1pbidcbiAgICAgICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAndmlldydcbiAgICAgICAgICAgICAgICBtczogQGdldER1cmF0aW9uKClcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogQGdldE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgICAgICBwYWdlczogZS5wcm9wZXJ0aWVzLnBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkLnBhZ2VOdW1iZXJzXG5cbiAgICAgICAgICAgIEB6b29tZWRJbiA9IHRydWVcbiAgICAgICAgICAgIEBhcHBlYXJlZEF0ID0gRGF0ZS5ub3coKVxuICAgICAgICBlbHNlIGlmIGUudHlwZSBpcyAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtem9vbWVkLW91dCdcbiAgICAgICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnem9vbSdcbiAgICAgICAgICAgICAgICBtczogQGdldER1cmF0aW9uKClcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogQGdldE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgICAgICBwYWdlczogZS5wcm9wZXJ0aWVzLnBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkLnBhZ2VOdW1iZXJzXG5cbiAgICAgICAgICAgIEB6b29tZWRJbiA9IGZhbHNlXG4gICAgICAgICAgICBAYXBwZWFyZWRBdCA9IERhdGUubm93KClcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldE9yaWVudGF0aW9uOiAtPlxuICAgICAgICBpZiB3aW5kb3cuaW5uZXJXaWR0aCA+PSB3aW5kb3cuaW5uZXJIZWlnaHQgdGhlbiAnbGFuZHNjYXBlJyBlbHNlICdwb3J0cmFpdCdcblxuICAgIGdldER1cmF0aW9uOiAtPlxuICAgICAgICBEYXRlLm5vdygpIC0gQGFwcGVhcmVkQXRcblxuTWljcm9FdmVudC5taXhpbiBQYWdlZFB1YmxpY2F0aW9uTGVnYWN5RXZlbnRUcmFja2luZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25MZWdhY3lFdmVudFRyYWNraW5nXG4iLCJNaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRcbiAgICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBjb250ZW50c1JlbmRlcmVkID0gZmFsc2VcbiAgICAgICAgQGhvdHNwb3RzUmVuZGVyZWQgPSBmYWxzZVxuICAgICAgICBAZWwgPSBAcmVuZGVyRWwoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0SWQ6IC0+XG4gICAgICAgIEBvcHRpb25zLmlkXG5cbiAgICBnZXRFbDogLT5cbiAgICAgICAgQGVsXG5cbiAgICBnZXRQYWdlczogLT5cbiAgICAgICAgQG9wdGlvbnMucGFnZXNcblxuICAgIHJlbmRlckVsOiAtPlxuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgcGFnZUlkcyA9IEBnZXRQYWdlcygpLm1hcCAocGFnZSkgLT4gcGFnZS5pZFxuXG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICd2ZXJzb19fcGFnZS1zcHJlYWQgc2duLXBwX19wYWdlLXNwcmVhZCdcblxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWQnLCBAZ2V0SWQoKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtdHlwZScsICdwYWdlJ1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtd2lkdGgnLCBAb3B0aW9ucy53aWR0aFxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtcGFnZS1pZHMnLCBwYWdlSWRzLmpvaW4oJywnKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtbWF4LXpvb20tc2NhbGUnLCBAb3B0aW9ucy5tYXhab29tU2NhbGVcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLXpvb21hYmxlJywgZmFsc2VcblxuICAgICAgICBlbFxuXG4gICAgcmVuZGVyQ29udGVudHM6IC0+XG4gICAgICAgIGlkID0gQGdldElkKClcbiAgICAgICAgZWwgPSBAZ2V0RWwoKVxuICAgICAgICBwYWdlcyA9IEBnZXRQYWdlcygpXG4gICAgICAgIHBhZ2VDb3VudCA9IHBhZ2VzLmxlbmd0aFxuICAgICAgICBpbWFnZUxvYWRzID0gMFxuXG4gICAgICAgIHBhZ2VzLmZvckVhY2ggKHBhZ2UsIGkpID0+XG4gICAgICAgICAgICBpbWFnZSA9IHBhZ2UuaW1hZ2VzLm1lZGl1bVxuICAgICAgICAgICAgcGFnZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgICAgICAgbG9hZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG5cbiAgICAgICAgICAgIHBhZ2VFbC5jbGFzc05hbWUgPSAnc2duLXBwX19wYWdlIHZlcnNvX19wYWdlJ1xuICAgICAgICAgICAgcGFnZUVsLmRhdGFzZXQuaWQgPSBwYWdlLmlkIGlmIHBhZ2UuaWQ/XG5cbiAgICAgICAgICAgIGlmIHBhZ2VDb3VudCBpcyAyXG4gICAgICAgICAgICAgICAgcGFnZUVsLmNsYXNzTmFtZSArPSBpZiBpIGlzIDAgdGhlbiAnIHZlcnNvLXBhZ2UtLXZlcnNvJyBlbHNlICcgdmVyc28tcGFnZS0tcmVjdG8nXG5cbiAgICAgICAgICAgIHBhZ2VFbC5hcHBlbmRDaGlsZCBsb2FkZXJFbFxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQgcGFnZUVsXG5cbiAgICAgICAgICAgIGxvYWRlckVsLmNsYXNzTmFtZSA9ICdzZ24tcHAtcGFnZV9fbG9hZGVyJ1xuICAgICAgICAgICAgbG9hZGVyRWwuaW5uZXJIVE1MID0gXCI8c3Bhbj4je3BhZ2UubGFiZWx9PC9zcGFuPlwiXG5cbiAgICAgICAgICAgIFNHTi51dGlsLmxvYWRJbWFnZSBpbWFnZSwgKGVyciwgd2lkdGgsIGhlaWdodCkgPT5cbiAgICAgICAgICAgICAgICBpZiBub3QgZXJyP1xuICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlID0gKytpbWFnZUxvYWRzIGlzIHBhZ2VDb3VudFxuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgje2ltYWdlfSlcIlxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuZGF0YXNldC53aWR0aCA9IHdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5kYXRhc2V0LmhlaWdodCA9IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuaW5uZXJIVE1MID0gJyZuYnNwOydcblxuICAgICAgICAgICAgICAgICAgICBlbC5kYXRhc2V0Lnpvb21hYmxlID0gdHJ1ZSBpZiBpc0NvbXBsZXRlXG5cbiAgICAgICAgICAgICAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBwYWdlU3ByZWFkSWQ6IGlkLCBwYWdlOiBwYWdlXG4gICAgICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIHBhZ2VTcHJlYWRJZDogaWQsIHBhZ2VzOiBwYWdlcyBpZiBpc0NvbXBsZXRlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsb2FkZXJFbC5pbm5lckhUTUwgPSAnPHNwYW4+ITwvc3Bhbj4nXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGNvbnRlbnRzUmVuZGVyZWQgPSB0cnVlXG5cbiAgICAgICAgQFxuXG4gICAgY2xlYXJDb250ZW50czogKHBhZ2VTcHJlYWQsIHZlcnNvUGFnZVNwcmVhZCkgLT5cbiAgICAgICAgQGVsLmlubmVySFRNTCA9ICcnXG4gICAgICAgIEBjb250ZW50c1JlbmRlcmVkID0gZmFsc2VcblxuICAgICAgICBAXG5cbiAgICB6b29tSW46IC0+XG4gICAgICAgIHBhZ2VFbHMgPSBbXS5zbGljZS5jYWxsIEBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2duLXBwX19wYWdlJylcbiAgICAgICAgcGFnZXMgPSBAZ2V0UGFnZXMoKVxuXG4gICAgICAgIHBhZ2VFbHMuZm9yRWFjaCAocGFnZUVsKSA9PlxuICAgICAgICAgICAgaWQgPSBwYWdlRWwuZGF0YXNldC5pZFxuICAgICAgICAgICAgcGFnZSA9IHBhZ2VzLmZpbmQgKHBhZ2UpIC0+IHBhZ2UuaWQgaXMgaWRcbiAgICAgICAgICAgIGltYWdlID0gcGFnZS5pbWFnZXMubGFyZ2VcblxuICAgICAgICAgICAgU0dOLnV0aWwubG9hZEltYWdlIGltYWdlLCAoZXJyKSA9PlxuICAgICAgICAgICAgICAgIGlmIG5vdCBlcnI/IGFuZCBAZWwuZGF0YXNldC5hY3RpdmUgaXMgJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5kYXRhc2V0LmltYWdlID0gcGFnZUVsLnN0eWxlLmJhY2tncm91bmRJbWFnZVxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoI3tpbWFnZX0pXCJcblxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIHpvb21PdXQ6IC0+XG4gICAgICAgIHBhZ2VFbHMgPSBbXS5zbGljZS5jYWxsIEBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2duLXBwX19wYWdlW2RhdGEtaW1hZ2VdJylcblxuICAgICAgICBwYWdlRWxzLmZvckVhY2ggKHBhZ2VFbCkgLT5cbiAgICAgICAgICAgIHBhZ2VFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBwYWdlRWwuZGF0YXNldC5pbWFnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWxldGUgcGFnZUVsLmRhdGFzZXQuaW1hZ2VcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZFxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5QYWdlU3ByZWFkID0gcmVxdWlyZSAnLi9wYWdlX3NwcmVhZCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRzXG4gICAgY29uc3RydWN0b3I6IChAb3B0aW9ucykgLT5cbiAgICAgICAgQGNvbGxlY3Rpb24gPSBbXVxuICAgICAgICBAaWRzID0ge31cblxuICAgICAgICByZXR1cm5cblxuICAgIGdldDogKGlkKSAtPlxuICAgICAgICBAaWRzW2lkXVxuXG4gICAgZ2V0RnJhZzogLT5cbiAgICAgICAgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXG4gICAgICAgIEBjb2xsZWN0aW9uLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+IGZyYWcuYXBwZW5kQ2hpbGQgcGFnZVNwcmVhZC5lbFxuXG4gICAgICAgIGZyYWdcblxuICAgIHVwZGF0ZTogKHBhZ2VNb2RlID0gJ3NpbmdsZScpIC0+XG4gICAgICAgIHBhZ2VTcHJlYWRzID0gW11cbiAgICAgICAgaWRzID0ge31cbiAgICAgICAgcGFnZXMgPSBAb3B0aW9ucy5wYWdlcy5zbGljZSgpXG4gICAgICAgIHdpZHRoID0gQG9wdGlvbnMud2lkdGhcbiAgICAgICAgbWF4Wm9vbVNjYWxlID0gQG9wdGlvbnMubWF4Wm9vbVNjYWxlXG5cbiAgICAgICAgaWYgcGFnZU1vZGUgaXMgJ3NpbmdsZSdcbiAgICAgICAgICAgIHBhZ2VzLmZvckVhY2ggKHBhZ2UpIC0+IHBhZ2VTcHJlYWRzLnB1c2ggW3BhZ2VdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZpcnN0UGFnZSA9IHBhZ2VzLnNoaWZ0KClcbiAgICAgICAgICAgIGxhc3RQYWdlID0gaWYgcGFnZXMubGVuZ3RoICUgMiBpcyAxIHRoZW4gcGFnZXMucG9wKCkgZWxzZSBudWxsXG4gICAgICAgICAgICBtaWRzdFBhZ2VTcHJlYWRzID0gU0dOLnV0aWwuY2h1bmsgcGFnZXMsIDJcblxuICAgICAgICAgICAgcGFnZVNwcmVhZHMucHVzaCBbZmlyc3RQYWdlXSBpZiBmaXJzdFBhZ2U/XG4gICAgICAgICAgICBtaWRzdFBhZ2VTcHJlYWRzLmZvckVhY2ggKG1pZHN0UGFnZXMpIC0+IHBhZ2VTcHJlYWRzLnB1c2ggbWlkc3RQYWdlcy5tYXAgKHBhZ2UpIC0+IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRzLnB1c2ggW2xhc3RQYWdlXSBpZiBsYXN0UGFnZT9cblxuICAgICAgICBAY29sbGVjdGlvbiA9IHBhZ2VTcHJlYWRzLm1hcCAocGFnZXMsIGkpID0+XG4gICAgICAgICAgICBpZCA9IFwiI3twYWdlTW9kZX0tI3tpfVwiXG4gICAgICAgICAgICBwYWdlU3ByZWFkID0gbmV3IFBhZ2VTcHJlYWRcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGU6IG1heFpvb21TY2FsZVxuICAgICAgICAgICAgICAgIHBhZ2VzOiBwYWdlc1xuICAgICAgICAgICAgICAgIGlkOiBpZFxuXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmJpbmQgJ3BhZ2VMb2FkZWQnLCAoZSkgPT4gQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmJpbmQgJ3BhZ2VzTG9hZGVkJywgKGUpID0+IEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIGVcblxuICAgICAgICAgICAgaWRzW2lkXSA9IHBhZ2VTcHJlYWRcblxuICAgICAgICAgICAgcGFnZVNwcmVhZFxuICAgICAgICBAaWRzID0gaWRzXG5cbiAgICAgICAgQFxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkc1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkc1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXCJcblwiXCJcIlxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXCJcbjxkaXYgY2xhc3M9XCJzZ24tcHAtaG90c3BvdC1waWNrZXJfX2JhY2tncm91bmRcIiBkYXRhLWNsb3NlPjwvZGl2PlxuPGRpdiBjbGFzcz1cInNnbl9fcG9wb3ZlclwiIHN0eWxlPVwidG9wOiB7e3RvcH19cHg7IGxlZnQ6IHt7bGVmdH19cHg7XCI+XG4gICAge3sjaGVhZGVyfX1cbiAgICAgICAgPGRpdiBjbGFzcz1cInNnbi1wb3BvdmVyX19oZWFkZXJcIj57e2hlYWRlcn19PC9kaXY+XG4gICAge3svaGVhZGVyfX1cbiAgICA8ZGl2IGNsYXNzPVwic2duLXBvcG92ZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgICAge3sjaG90c3BvdHN9fVxuICAgICAgICAgICAgICAgIDxsaSBkYXRhLWlkPVwie3tpZH19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt7dGl0bGV9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3tzdWJ0aXRsZX19PC9wPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7ey9ob3RzcG90c319XG4gICAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblwiXCJcIlxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5TR04gPSByZXF1aXJlICcuLi8uLi9jb3JlJ1xuQ29yZSA9IHJlcXVpcmUgJy4vY29yZSdcbkhvdHNwb3RzID0gcmVxdWlyZSAnLi9ob3RzcG90cydcbkNvbnRyb2xzID0gcmVxdWlyZSAnLi9jb250cm9scydcbkV2ZW50VHJhY2tpbmcgPSByZXF1aXJlICcuL2V2ZW50X3RyYWNraW5nJ1xuTGVnYWN5RXZlbnRUcmFja2luZyA9IHJlcXVpcmUgJy4vbGVnYWN5X2V2ZW50X3RyYWNraW5nJ1xuXG5jbGFzcyBWaWV3ZXJcbiAgICBjb25zdHJ1Y3RvcjogKEBlbCwgQG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgQF9jb3JlID0gbmV3IENvcmUgQGVsLFxuICAgICAgICAgICAgaWQ6IEBvcHRpb25zLmlkXG4gICAgICAgICAgICBwYWdlczogQG9wdGlvbnMucGFnZXNcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRXaWR0aDogQG9wdGlvbnMucGFnZVNwcmVhZFdpZHRoXG4gICAgICAgICAgICBwYWdlU3ByZWFkTWF4Wm9vbVNjYWxlOiBAb3B0aW9ucy5wYWdlU3ByZWFkTWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICBpZGxlRGVsYXk6IEBvcHRpb25zLmlkbGVEZWxheVxuICAgICAgICAgICAgcmVzaXplRGVsYXk6IEBvcHRpb25zLnJlc2l6ZURlbGF5XG4gICAgICAgICAgICBjb2xvcjogQG9wdGlvbnMuY29sb3JcbiAgICAgICAgQF9ob3RzcG90cyA9IG5ldyBIb3RzcG90cygpXG4gICAgICAgIEBfY29udHJvbHMgPSBuZXcgQ29udHJvbHMgQGVsLCBrZXlib2FyZDogQG9wdGlvbnMua2V5Ym9hcmRcbiAgICAgICAgQF9ldmVudFRyYWNraW5nID0gbmV3IEV2ZW50VHJhY2tpbmcoKVxuICAgICAgICBAX2xlZ2FjeUV2ZW50VHJhY2tpbmcgPSBuZXcgTGVnYWN5RXZlbnRUcmFja2luZygpXG4gICAgICAgIEB2aWV3U2Vzc2lvbiA9IFNHTi51dGlsLnV1aWQoKVxuXG4gICAgICAgIEBfc2V0dXBFdmVudExpc3RlbmVycygpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQF9jb3JlLnRyaWdnZXIgJ3N0YXJ0ZWQnXG5cbiAgICAgICAgQFxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQF9jb3JlLnRyaWdnZXIgJ2Rlc3Ryb3llZCdcbiAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdkZXN0cm95ZWQnXG4gICAgICAgIEBfY29udHJvbHMudHJpZ2dlciAnZGVzdHJveWVkJ1xuICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnZGVzdHJveWVkJ1xuXG4gICAgICAgIEBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIEBlbFxuXG4gICAgICAgIEBcblxuICAgIG5hdmlnYXRlVG86IChwb3NpdGlvbiwgb3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkubmF2aWdhdGVUbyBwb3NpdGlvbiwgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIGZpcnN0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkuZmlyc3Qgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIHByZXY6IChvcHRpb25zKSAtPlxuICAgICAgICBAX2NvcmUuZ2V0VmVyc28oKS5wcmV2IG9wdGlvbnNcblxuICAgICAgICBAXG5cbiAgICBuZXh0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkubmV4dCBvcHRpb25zXG5cbiAgICAgICAgQFxuXG4gICAgbGFzdDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBfY29yZS5nZXRWZXJzbygpLmxhc3Qgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIF90cmFja0V2ZW50OiAoZSkgLT5cbiAgICAgICAgdHlwZSA9IGUudHlwZVxuICAgICAgICBpZFR5cGUgPSAnbGVnYWN5J1xuICAgICAgICBwcm9wZXJ0aWVzID0gcGFnZWRQdWJsaWNhdGlvbjpcbiAgICAgICAgICAgIGlkOiBbaWRUeXBlLCBAb3B0aW9ucy5pZF1cbiAgICAgICAgICAgIG93bmVkQnk6IFtpZFR5cGUsIEBvcHRpb25zLm93bmVkQnldXG4gICAgICAgIGV2ZW50VHJhY2tlciA9IEBvcHRpb25zLmV2ZW50VHJhY2tlclxuXG4gICAgICAgIHByb3BlcnRpZXNba2V5XSA9IHZhbHVlIGZvciBrZXksIHZhbHVlIG9mIGUucHJvcGVydGllc1xuXG4gICAgICAgIGV2ZW50VHJhY2tlci50cmFja0V2ZW50IHR5cGUsIHByb3BlcnRpZXMgaWYgZXZlbnRUcmFja2VyP1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgX3RyYWNrTGVnYWN5RXZlbnQ6IChlKSAtPlxuICAgICAgICBldmVudFRyYWNrZXIgPSBAb3B0aW9ucy5ldmVudFRyYWNrZXJcbiAgICAgICAgZ2VvbG9jYXRpb24gPSB7fVxuXG4gICAgICAgIGlmIGV2ZW50VHJhY2tlcj9cbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmxhdGl0dWRlID0gZXZlbnRUcmFja2VyLmxvY2F0aW9uLmxhdGl0dWRlXG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5sb25naXR1ZGUgPSBldmVudFRyYWNrZXIubG9jYXRpb24ubG9uZ2l0dWRlXG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5zZW5zb3IgPSB0cnVlIGlmIGdlb2xvY2F0aW9uLmxhdGl0dWRlP1xuXG4gICAgICAgICAgICBTR04uQ29yZUtpdC5yZXF1ZXN0XG4gICAgICAgICAgICAgICAgZ2VvbG9jYXRpb246IGdlb2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3YyL2NhdGFsb2dzLyN7QG9wdGlvbnMuaWR9L2NvbGxlY3RcIlxuICAgICAgICAgICAgICAgIGhlYWRlcnM6XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeVxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgbXM6IGUubXNcbiAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb246IGUub3JpZW50YXRpb25cbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IGUucGFnZXMuam9pbiAnLCdcbiAgICAgICAgICAgICAgICAgICAgdmlld19zZXNzaW9uOiBAdmlld1Nlc3Npb25cbiAgICAgICAgXG4gICAgICAgIHJldHVyblxuXG4gICAgX3NldHVwRXZlbnRMaXN0ZW5lcnM6IC0+XG4gICAgICAgIEBfZXZlbnRUcmFja2luZy5iaW5kICd0cmFja0V2ZW50JywgKGUpID0+XG4gICAgICAgICAgICBAX3RyYWNrRXZlbnQgZVxuICAgICAgICAgICAgQF9sZWdhY3lFdmVudFRyYWNraW5nLnRyaWdnZXIgJ2V2ZW50VHJhY2tlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQF9sZWdhY3lFdmVudFRyYWNraW5nLmJpbmQgJ3RyYWNrRXZlbnQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfdHJhY2tMZWdhY3lFdmVudCBlXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAX2NvbnRyb2xzLmJpbmQgJ3ByZXYnLCAoZSkgPT5cbiAgICAgICAgICAgIEBwcmV2IGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29udHJvbHMuYmluZCAnbmV4dCcsIChlKSA9PlxuICAgICAgICAgICAgQG5leHQgZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb250cm9scy5iaW5kICdmaXJzdCcsIChlKSA9PlxuICAgICAgICAgICAgQGZpcnN0IGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29udHJvbHMuYmluZCAnbGFzdCcsIChlKSA9PlxuICAgICAgICAgICAgQGxhc3QoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9ob3RzcG90cy5iaW5kICdob3RzcG90c1JlcXVlc3RlZCcsIChlKSA9PlxuICAgICAgICAgICAgQHRyaWdnZXIgJ2hvdHNwb3RzUmVxdWVzdGVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAX2NvcmUuYmluZCAnYXBwZWFyZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdhcHBlYXJlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhcHBlYXJlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdkaXNhcHBlYXJlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2Rpc2FwcGVhcmVkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2Rpc2FwcGVhcmVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2JlZm9yZU5hdmlnYXRpb24nLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdiZWZvcmVOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQF9jb250cm9scy50cmlnZ2VyICdiZWZvcmVOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2JlZm9yZU5hdmlnYXRpb24nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYWZ0ZXJOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2NsaWNrZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdjbGlja2VkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2NsaWNrZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnZG91YmxlQ2xpY2tlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2RvdWJsZUNsaWNrZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnZG91YmxlQ2xpY2tlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdwcmVzc2VkJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAncHJlc3NlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdwcmVzc2VkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3BhblN0YXJ0JywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAncGFuU3RhcnQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAncGFuU3RhcnQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnem9vbWVkSW4nLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICd6b29tZWRJbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRJbicsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICd6b29tZWRPdXQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICd6b29tZWRPdXQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnem9vbWVkT3V0JywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3BhZ2VMb2FkZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdwYWdlTG9hZGVkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2hvdHNwb3RzLnRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhZnRlck5hdmlnYXRpb24nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAncGFnZXNMb2FkZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfaG90c3BvdHMudHJpZ2dlciAncGFnZXNMb2FkZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAncGFnZXNMb2FkZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAncmVzaXplZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdyZXNpemVkJ1xuICAgICAgICAgICAgQHRyaWdnZXIgJ3Jlc2l6ZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBiaW5kICdob3RzcG90c1JlY2VpdmVkJywgKGUpID0+XG4gICAgICAgICAgICBAX2hvdHNwb3RzLnRyaWdnZXIgJ2hvdHNwb3RzUmVjZWl2ZWQnLFxuICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWQ6IEBfY29yZS5wYWdlU3ByZWFkcy5nZXQgZS5pZFxuICAgICAgICAgICAgICAgIHZlcnNvUGFnZVNwcmVhZDogQF9jb3JlLmdldFZlcnNvKCkucGFnZVNwcmVhZHMuZmluZCAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZC5nZXRJZCgpIGlzIGUuaWRcbiAgICAgICAgICAgICAgICByYXRpbzogZS5yYXRpb1xuICAgICAgICAgICAgICAgIHBhZ2VzOiBlLnBhZ2VzXG4gICAgICAgICAgICAgICAgaG90c3BvdHM6IGUuaG90c3BvdHNcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gVmlld2VyXG5cbm1vZHVsZS5leHBvcnRzID0gVmlld2VyXG4iLCJTR04gPSByZXF1aXJlICcuLi9zZ24nXG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spIC0+XG4gICAgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgPyAnZ2V0J1xuICAgIHVybCA9IG9wdGlvbnMudXJsXG5cbiAgICBpZiBvcHRpb25zLnFzP1xuICAgICAgICBxdWVyeVBhcmFtcyA9IFNHTi51dGlsLmZvcm1hdFF1ZXJ5UGFyYW1zIG9wdGlvbnMucXNcblxuICAgICAgICBpZiB1cmwuaW5kZXhPZignPycpIGlzIC0xXG4gICAgICAgICAgICB1cmwgKz0gJz8nICsgcXVlcnlQYXJhbXNcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdXJsICs9ICcmJyArIHF1ZXJ5UGFyYW1zXG5cbiAgICBodHRwLm9wZW4gbWV0aG9kLnRvVXBwZXJDYXNlKCksIHVybFxuICAgIGh0dHAudGltZW91dCA9IG9wdGlvbnMudGltZW91dCBpZiBvcHRpb25zLnRpbWVvdXQ/XG4gICAgaHR0cC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlIGlmIG9wdGlvbnMudXNlQ29va2llcyBpcyB0cnVlXG5cbiAgICBpZiBvcHRpb25zLmhlYWRlcnM/XG4gICAgICAgIGZvciBoZWFkZXIsIHZhbHVlIG9mIG9wdGlvbnMuaGVhZGVyc1xuICAgICAgICAgICAgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyIGhlYWRlciwgdmFsdWVcblxuICAgIGh0dHAuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcsIC0+XG4gICAgICAgIGhlYWRlcnMgPSBodHRwLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnNwbGl0ICdcXHJcXG4nXG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnJlZHVjZSAoYWNjLCBjdXJyZW50LCBpKSAtPlxuICAgICAgICAgICAgcGFydHMgPSBjdXJyZW50LnNwbGl0ICc6ICdcblxuICAgICAgICAgICAgYWNjW3BhcnRzWzBdLnRvTG93ZXJDYXNlKCldID0gcGFydHNbMV1cblxuICAgICAgICAgICAgYWNjXG4gICAgICAgICwge31cblxuICAgICAgICBjYWxsYmFjayBudWxsLFxuICAgICAgICAgICAgc3RhdHVzQ29kZTogaHR0cC5zdGF0dXNcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIGJvZHk6IGh0dHAucmVzcG9uc2VUZXh0XG5cbiAgICAgICAgcmV0dXJuXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyICdlcnJvcicsIC0+XG4gICAgICAgIGNhbGxiYWNrIG5ldyBFcnJvcigpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyICd0aW1lb3V0JywgLT5cbiAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKClcblxuICAgICAgICByZXR1cm5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgIGlmIGUubGVuZ3RoQ29tcHV0YWJsZSBhbmQgdHlwZW9mIHByb2dyZXNzQ2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjayBlLmxvYWRlZCwgZS50b3RhbFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgaHR0cC5zZW5kIG9wdGlvbnMuYm9keVxuXG4gICAgcmV0dXJuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUgJy4vY29yZSdcbiIsIlNHTiA9IHJlcXVpcmUgJy4uL3NnbidcblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIGtleTogJ3Nnbi0nXG5cbiAgICBnZXQ6IChrZXkpIC0+XG4gICAgICAgIHJldHVybiBpZiBTR04udXRpbC5pc05vZGUoKVxuXG4gICAgICAgIHRyeVxuICAgICAgICAgICAgbmFtZSA9IFwiI3tAa2V5fSN7a2V5fT1cIlxuICAgICAgICAgICAgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQgJzsnXG5cbiAgICAgICAgICAgIGZvciBjIGluIGNhXG4gICAgICAgICAgICAgICAgY3QgPSBjLnRyaW0oKVxuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjdC5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGN0Lmxlbmd0aCkgaWYgY3QuaW5kZXhPZihuYW1lKSBpcyAwXG5cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZSB2YWx1ZVxuICAgICAgICBjYXRjaCBlcnJcbiAgICAgICAgICAgIHZhbHVlID0ge31cblxuICAgICAgICB2YWx1ZVxuXG4gICAgc2V0OiAoa2V5LCB2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIFNHTi51dGlsLmlzTm9kZSgpXG5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBkYXlzID0gMzY1XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgc3RyID0gSlNPTi5zdHJpbmdpZnkgdmFsdWVcblxuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lIGRhdGUuZ2V0VGltZSgpICsgZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDBcblxuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gXCIje0BrZXl9I3trZXl9PSN7c3RyfTtleHBpcmVzPSN7ZGF0ZS50b1VUQ1N0cmluZygpfTtwYXRoPS9cIlxuICAgICAgICBjYXRjaCBlcnJcblxuICAgICAgICByZXR1cm5cblxuXG4iLCJTR04gPSByZXF1aXJlICcuLi9zZ24nXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgICBrZXk6ICdzZ24tJ1xuXG4gICAgc3RvcmFnZTogZG8gLT5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZVxuXG4gICAgICAgICAgICBzdG9yYWdlW1wiI3tAa2V5fXRlc3Qtc3RvcmFnZVwiXSA9ICdmb29iYXInXG4gICAgICAgICAgICBkZWxldGUgc3RvcmFnZVtcIiN7QGtleX10ZXN0LXN0b3JhZ2VcIl1cblxuICAgICAgICAgICAgc3RvcmFnZVxuICAgICAgICBjYXRjaFxuICAgICAgICAgICAge31cblxuICAgIGdldDogKGtleSkgLT5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBKU09OLnBhcnNlIEBzdG9yYWdlW1wiI3tAa2V5fSN7a2V5fVwiXVxuXG4gICAgc2V0OiAoa2V5LCB2YWx1ZSkgLT5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBAc3RvcmFnZVtcIiN7QGtleX0je2tleX1cIl0gPSBKU09OLnN0cmluZ2lmeSB2YWx1ZVxuXG4gICAgICAgIEBcbiIsInV0aWwgPVxuICAgIGlzQnJvd3NlcjogLT5cbiAgICAgICAgdHlwZW9mIHByb2Nlc3MgaXNudCAndW5kZWZpbmVkJyBhbmQgcHJvY2Vzcy5icm93c2VyXG5cbiAgICBpc05vZGU6IC0+XG4gICAgICAgIG5vdCB1dGlsLmlzQnJvd3NlcigpXG5cbiAgICBlcnJvcjogKGVyciwgb3B0aW9ucykgLT5cbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZSBvciBudWxsXG5cbiAgICAgICAgaWYgdHlwZW9mIG9wdGlvbnMgaXMgJ3N0cmluZydcbiAgICAgICAgICAgIGVyci5tZXNzYWdlID0gb3B0aW9uc1xuICAgICAgICBlbHNlIGlmIHR5cGVvZiBvcHRpb25zIGlzICdvYmplY3QnIGFuZCBvcHRpb25zP1xuICAgICAgICAgICAgZm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuICAgICAgICAgICAgICAgIGVycltrZXldID0gdmFsdWVcblxuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UgaWYgb3B0aW9ucy5tZXNzYWdlP1xuICAgICAgICAgICAgZXJyLmNvZGUgPSBvcHRpb25zLmNvZGUgb3Igb3B0aW9ucy5uYW1lIGlmIG9wdGlvbnMuY29kZT8gb3Igb3B0aW9ucy5tZXNzYWdlP1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gb3B0aW9ucy5zdGFjayBpZiBvcHRpb25zLnN0YWNrP1xuXG4gICAgICAgIGVyci5uYW1lID0gb3B0aW9ucyBhbmQgb3B0aW9ucy5uYW1lIG9yIGVyci5uYW1lIG9yIGVyci5jb2RlIG9yICdFcnJvcidcbiAgICAgICAgZXJyLnRpbWUgPSBuZXcgRGF0ZSgpXG5cbiAgICAgICAgZXJyXG5cbiAgICB1dWlkOiAtPlxuICAgICAgICAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlIC9beHldL2csIChjKSAtPlxuICAgICAgICAgICAgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDBcbiAgICAgICAgICAgIHYgPSBpZiBjIGlzICd4JyB0aGVuIHIgZWxzZSAociAmIDB4M3wweDgpXG5cbiAgICAgICAgICAgIHYudG9TdHJpbmcgMTZcblxuICAgIGdldFF1ZXJ5UGFyYW06IChmaWVsZCwgdXJsKSAtPlxuICAgICAgICBocmVmID0gaWYgdXJsIHRoZW4gdXJsIGVsc2Ugd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgICAgcmVnID0gbmV3IFJlZ0V4cCAnWz8mXScgKyBmaWVsZCArICc9KFteJiNdKiknLCAnaSdcbiAgICAgICAgc3RyaW5nID0gcmVnLmV4ZWMgaHJlZlxuXG4gICAgICAgIGlmIHN0cmluZyB0aGVuIHN0cmluZ1sxXSBlbHNlIHVuZGVmaW5lZFxuXG4gICAgZm9ybWF0UXVlcnlQYXJhbXM6IChxdWVyeVBhcmFtcyA9IHt9KSAtPlxuICAgICAgICBPYmplY3RcbiAgICAgICAgICAgIC5rZXlzIHF1ZXJ5UGFyYW1zXG4gICAgICAgICAgICAubWFwIChrZXkpIC0+IGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeVBhcmFtc1trZXldKVxuICAgICAgICAgICAgLmpvaW4gJyYnXG5cbiAgICBnZXRPUzogLT5cbiAgICAgICAgbmFtZSA9IG51bGxcbiAgICAgICAgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuXG4gICAgICAgIGlmIHVhLmluZGV4T2YoJ1dpbmRvd3MnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ1dpbmRvd3MnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignTWFjJykgPiAtMVxuICAgICAgICAgICAgbmFtZSA9ICdtYWNPUydcbiAgICAgICAgZWxzZSBpZiB1YS5pbmRleE9mKCdYMTEnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ3VuaXgnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignTGludXgnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ0xpbnV4J1xuICAgICAgICBlbHNlIGlmIHVhLmluZGV4T2YoJ2lPUycpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnaU9TJ1xuICAgICAgICBlbHNlIGlmIHVhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ0FuZHJvaWQnXG5cbiAgICAgICAgbmFtZVxuXG4gICAgYnRvYTogKHN0cikgLT5cbiAgICAgICAgaWYgdXRpbC5pc0Jyb3dzZXIoKVxuICAgICAgICAgICAgYnRvYSBzdHJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnVmZmVyID0gbnVsbFxuXG4gICAgICAgICAgICBpZiBzdHIgaW5zdGFuY2VvZiBCdWZmZXJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBzdHJcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBuZXcgQnVmZmVyIHN0ci50b1N0cmluZygpLCAnYmluYXJ5J1xuXG4gICAgICAgICAgICBidWZmZXIudG9TdHJpbmcgJ2Jhc2U2NCdcblxuICAgIGdldFNjcmVlbkRpbWVuc2lvbnM6IC0+XG4gICAgICAgIGRlbnNpdHkgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA/IDFcbiAgICAgICAgbG9naWNhbCA9XG4gICAgICAgICAgICB3aWR0aDogd2luZG93LnNjcmVlbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodFxuICAgICAgICBwaHlzaWNhbCA9XG4gICAgICAgICAgICB3aWR0aDogTWF0aC5yb3VuZCBsb2dpY2FsLndpZHRoICogZGVuc2l0eVxuICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kIGxvZ2ljYWwuaGVpZ2h0ICogZGVuc2l0eVxuXG4gICAgICAgIGRlbnNpdHk6IGRlbnNpdHlcbiAgICAgICAgbG9naWNhbDogbG9naWNhbFxuICAgICAgICBwaHlzaWNhbDogcGh5c2ljYWxcblxuICAgIGdldFV0Y09mZnNldFNlY29uZHM6IC0+XG4gICAgICAgIG5vdyA9IG5ldyBEYXRlKClcbiAgICAgICAgamFuMSA9IG5ldyBEYXRlIG5vdy5nZXRGdWxsWWVhcigpLCAwLCAxLCAwLCAwLCAwLCAwXG4gICAgICAgIHRtcCA9IGphbjEudG9HTVRTdHJpbmcoKVxuICAgICAgICBqYW4yID0gbmV3IERhdGUgdG1wLnN1YnN0cmluZygwLCB0bXAubGFzdEluZGV4T2YoJyAnKSAtIDEpXG4gICAgICAgIHN0ZFRpbWVPZmZzZXQgPSAoamFuMSAtIGphbjIpIC8gMTAwMFxuXG4gICAgICAgIHN0ZFRpbWVPZmZzZXRcblxuICAgIGdldFV0Y0RzdE9mZnNldFNlY29uZHM6IC0+XG4gICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogLTFcblxuICAgIGdldENvbG9yQnJpZ2h0bmVzczogKGNvbG9yKSAtPlxuICAgICAgICBjb2xvciA9IGNvbG9yLnJlcGxhY2UgJyMnLCAnJ1xuICAgICAgICBoZXggPSBwYXJzZUludCAoaGV4ICsgJycpLnJlcGxhY2UoL1teYS1mMC05XS9naSwgJycpLCAxNlxuICAgICAgICByZ2IgPSBbXVxuICAgICAgICBzdW0gPSAwXG4gICAgICAgIHggPSAwXG5cbiAgICAgICAgd2hpbGUgeCA8IDNcbiAgICAgICAgICAgIHMgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMiAqIHgsIDIpLCAxNilcbiAgICAgICAgICAgIHJnYlt4XSA9IHNcblxuICAgICAgICAgICAgc3VtICs9IHMgaWYgcyA+IDBcblxuICAgICAgICAgICAgKyt4XG5cbiAgICAgICAgaWYgc3VtIDw9IDM4MSB0aGVuICdkYXJrJyBlbHNlICdsaWdodCdcblxuICAgIGNodW5rOiAoYXJyLCBzaXplKSAtPlxuICAgICAgICByZXN1bHRzID0gW11cblxuICAgICAgICB3aGlsZSBhcnIubGVuZ3RoXG4gICAgICAgICAgICByZXN1bHRzLnB1c2ggYXJyLnNwbGljZSgwLCBzaXplKVxuXG4gICAgICAgIHJlc3VsdHNcblxuICAgIHRocm90dGxlOiAoZm4sIHRocmVzaG9sZCA9IDI1MCwgc2NvcGUpIC0+XG4gICAgICAgIGxhc3QgPSB1bmRlZmluZWRcbiAgICAgICAgZGVmZXJUaW1lciA9IHVuZGVmaW5lZFxuXG4gICAgICAgIC0+XG4gICAgICAgICAgICBjb250ZXh0ID0gc2NvcGUgb3IgQFxuICAgICAgICAgICAgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcblxuICAgICAgICAgICAgaWYgbGFzdCBhbmQgbm93IDwgbGFzdCArIHRocmVzaG9sZFxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCBkZWZlclRpbWVyXG5cbiAgICAgICAgICAgICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dCAtPlxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbm93XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseSBjb250ZXh0LCBhcmdzXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICwgdGhyZXNob2xkXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbGFzdCA9IG5vd1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5IGNvbnRleHQsIGFyZ3NcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICBsb2FkSW1hZ2U6IChzcmMsIGNhbGxiYWNrKSAtPlxuICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKVxuXG4gICAgICAgIGltZy5vbmxvYWQgPSAtPiBjYWxsYmFjayBudWxsLCBpbWcud2lkdGgsIGltZy5oZWlnaHRcbiAgICAgICAgaW1nLm9uZXJyb3IgPSAtPiBjYWxsYmFjayBuZXcgRXJyb3IoKVxuICAgICAgICBpbWcuc3JjID0gc3JjXG5cbiAgICAgICAgaW1nXG5cbiAgICBkaXN0YW5jZTogKGxhdDEsIGxuZzEsIGxhdDIsIGxuZzIpIC0+XG4gICAgICAgIHJhZGxhdDEgPSBNYXRoLlBJICogbGF0MSAvIDE4MFxuICAgICAgICByYWRsYXQyID0gTWF0aC5QSSAqIGxhdDIgLyAxODBcbiAgICAgICAgdGhldGEgPSBsbmcxIC0gbG5nMlxuICAgICAgICByYWR0aGV0YSA9IE1hdGguUEkgKiB0aGV0YSAvIDE4MFxuICAgICAgICBkaXN0ID0gTWF0aC5zaW4ocmFkbGF0MSkgKiBNYXRoLnNpbihyYWRsYXQyKSArIE1hdGguY29zKHJhZGxhdDEpICogTWF0aC5jb3MocmFkbGF0MikgKiBNYXRoLmNvcyhyYWR0aGV0YSlcbiAgICAgICAgZGlzdCA9IE1hdGguYWNvcyhkaXN0KVxuICAgICAgICBkaXN0ID0gZGlzdCAqIDE4MCAvIE1hdGguUElcbiAgICAgICAgZGlzdCA9IGRpc3QgKiA2MCAqIDEuMTUxNVxuICAgICAgICBkaXN0ID0gZGlzdCAqIDEuNjA5MzQ0ICogMTAwMFxuXG4gICAgICAgIGRpc3RcblxuICAgIGFzeW5jOlxuICAgICAgICBwYXJhbGxlbDogKGFzeW5jQ2FsbHMsIHNoYXJlZENhbGxiYWNrKSAtPlxuICAgICAgICAgICAgY291bnRlciA9IGFzeW5jQ2FsbHMubGVuZ3RoXG4gICAgICAgICAgICBhbGxSZXN1bHRzID0gW11cbiAgICAgICAgICAgIGsgPSAwXG5cbiAgICAgICAgICAgIG1ha2VDYWxsYmFjayA9IChpbmRleCkgLT5cbiAgICAgICAgICAgICAgICAtPlxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgICAgICAgICAgaSA9IDBcblxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyLS1cblxuICAgICAgICAgICAgICAgICAgICB3aGlsZSBpIDwgYXJndW1lbnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGFyZ3VtZW50c1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgICAgICAgICAgICAgYWxsUmVzdWx0c1tpbmRleF0gPSByZXN1bHRzXG5cbiAgICAgICAgICAgICAgICAgICAgc2hhcmVkQ2FsbGJhY2sgYWxsUmVzdWx0cyBpZiBjb3VudGVyIGlzIDBcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgd2hpbGUgayA8IGFzeW5jQ2FsbHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgYXN5bmNDYWxsc1trXSBtYWtlQ2FsbGJhY2soaylcbiAgICAgICAgICAgICAgICBrKytcblxuICAgICAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gKGI2NC5sZW5ndGggKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIoKGxlbiAqIDMgLyA0KSAtIHBsYWNlSG9sZGVycylcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gbGVuIC0gNCA6IGxlblxuXG4gIHZhciBMID0gMFxuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICsgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxudmFyIEtfTUFYX0xFTkdUSCA9IDB4N2ZmZmZmZmZcbmV4cG9ydHMua01heExlbmd0aCA9IEtfTUFYX0xFTkdUSFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBQcmludCB3YXJuaW5nIGFuZCByZWNvbW1lbmQgdXNpbmcgYGJ1ZmZlcmAgdjQueCB3aGljaCBoYXMgYW4gT2JqZWN0XG4gKiAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBXZSByZXBvcnQgdGhhdCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBpZiB0aGUgYXJlIG5vdCBzdWJjbGFzc2FibGVcbiAqIHVzaW5nIF9fcHJvdG9fXy4gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWBcbiAqIChTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOCkuIElFIDEwIGxhY2tzIHN1cHBvcnRcbiAqIGZvciBfX3Byb3RvX18gYW5kIGhhcyBhIGJ1Z2d5IHR5cGVkIGFycmF5IGltcGxlbWVudGF0aW9uLlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdUaGlzIGJyb3dzZXIgbGFja3MgdHlwZWQgYXJyYXkgKFVpbnQ4QXJyYXkpIHN1cHBvcnQgd2hpY2ggaXMgcmVxdWlyZWQgYnkgJyArXG4gICAgJ2BidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuJ1xuICApXG59XG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgLy8gQ2FuIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkP1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICBidWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYnVmXG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIE5vdGU6IENoYW5nZSBwcm90b3R5cGUgKmFmdGVyKiBCdWZmZXIuZnJvbSBpcyBkZWZpbmVkIHRvIHdvcmthcm91bmQgQ2hyb21lIGJ1Zzpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvMTQ4XG5CdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG5CdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAoc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdmFyIGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IGJ1Zi53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgYnVmID0gYnVmLnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgdmFyIGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgYnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0IChvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdmFyIGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoaXNBcnJheUJ1ZmZlclZpZXcob2JqKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgbnVtYmVySXNOYU4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcigwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWVcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKGlzQXJyYXlCdWZmZXJWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAobnVtYmVySXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKG51bWJlcklzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgKGJ5dGVzW2kgKyAxXSAqIDI1NikpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDApIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiBuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teKy8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gTm9kZSAwLjEwIHN1cHBvcnRzIGBBcnJheUJ1ZmZlcmAgYnV0IGxhY2tzIGBBcnJheUJ1ZmZlci5pc1ZpZXdgXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyAob2JqKSB7XG4gIHJldHVybiAodHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJykgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KG9iailcbn1cblxuZnVuY3Rpb24gbnVtYmVySXNOYU4gKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsIiFmdW5jdGlvbihnbG9iYWxzKSB7XG4ndXNlIHN0cmljdCdcblxudmFyIGNvbnZlcnRIZXggPSB7XG4gIGJ5dGVzVG9IZXg6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgLyppZiAodHlwZW9mIGJ5dGVzLmJ5dGVMZW5ndGggIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBuZXdCeXRlcyA9IFtdXG5cbiAgICAgIGlmICh0eXBlb2YgYnl0ZXMuYnVmZmVyICE9ICd1bmRlZmluZWQnKVxuICAgICAgICBieXRlcyA9IG5ldyBEYXRhVmlldyhieXRlcy5idWZmZXIpXG4gICAgICBlbHNlXG4gICAgICAgIGJ5dGVzID0gbmV3IERhdGFWaWV3KGJ5dGVzKVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmJ5dGVMZW5ndGg7ICsraSkge1xuICAgICAgICBuZXdCeXRlcy5wdXNoKGJ5dGVzLmdldFVpbnQ4KGkpKVxuICAgICAgfVxuICAgICAgYnl0ZXMgPSBuZXdCeXRlc1xuICAgIH0qL1xuICAgIHJldHVybiBhcnJCeXRlc1RvSGV4KGJ5dGVzKVxuICB9LFxuICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICBpZiAoaGV4Lmxlbmd0aCAlIDIgPT09IDEpIHRocm93IG5ldyBFcnJvcihcImhleFRvQnl0ZXMgY2FuJ3QgaGF2ZSBhIHN0cmluZyB3aXRoIGFuIG9kZCBudW1iZXIgb2YgY2hhcmFjdGVycy5cIilcbiAgICBpZiAoaGV4LmluZGV4T2YoJzB4JykgPT09IDApIGhleCA9IGhleC5zbGljZSgyKVxuICAgIHJldHVybiBoZXgubWF0Y2goLy4uL2cpLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiBwYXJzZUludCh4LDE2KSB9KVxuICB9XG59XG5cblxuLy8gUFJJVkFURVxuXG5mdW5jdGlvbiBhcnJCeXRlc1RvSGV4KGJ5dGVzKSB7XG4gIHJldHVybiBieXRlcy5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4gcGFkTGVmdCh4LnRvU3RyaW5nKDE2KSwyKSB9KS5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBwYWRMZWZ0KG9yaWcsIGxlbikge1xuICBpZiAob3JpZy5sZW5ndGggPiBsZW4pIHJldHVybiBvcmlnXG4gIHJldHVybiBBcnJheShsZW4gLSBvcmlnLmxlbmd0aCArIDEpLmpvaW4oJzAnKSArIG9yaWdcbn1cblxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHsgLy9Db21tb25KU1xuICBtb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnRIZXhcbn0gZWxzZSB7XG4gIGdsb2JhbHMuY29udmVydEhleCA9IGNvbnZlcnRIZXhcbn1cblxufSh0aGlzKTsiLCIhZnVuY3Rpb24oZ2xvYmFscykge1xuJ3VzZSBzdHJpY3QnXG5cbnZhciBjb252ZXJ0U3RyaW5nID0ge1xuICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgIHJldHVybiBieXRlcy5tYXAoZnVuY3Rpb24oeCl7IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHgpIH0pLmpvaW4oJycpXG4gIH0sXG4gIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiB4LmNoYXJDb2RlQXQoMCkgfSlcbiAgfVxufVxuXG4vL2h0dHA6Ly9ob3NzYS5pbi8yMDEyLzA3LzIwL3V0Zi04LWluLWphdmFzY3JpcHQuaHRtbFxuY29udmVydFN0cmluZy5VVEY4ID0ge1xuICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShjb252ZXJ0U3RyaW5nLmJ5dGVzVG9TdHJpbmcoYnl0ZXMpKSlcbiAgfSxcbiAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICByZXR1cm4gY29udmVydFN0cmluZy5zdHJpbmdUb0J5dGVzKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSlcbiAgfVxufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHsgLy9Db21tb25KU1xuICBtb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnRTdHJpbmdcbn0gZWxzZSB7XG4gIGdsb2JhbHMuY29udmVydFN0cmluZyA9IGNvbnZlcnRTdHJpbmdcbn1cblxufSh0aGlzKTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0IENyYWlnIENhbXBiZWxsXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogR0FUT1IuSlNcbiAqIFNpbXBsZSBFdmVudCBEZWxlZ2F0aW9uXG4gKlxuICogQHZlcnNpb24gMS4yLjRcbiAqXG4gKiBDb21wYXRpYmxlIHdpdGggSUUgOSssIEZGIDMuNissIFNhZmFyaSA1KywgQ2hyb21lXG4gKlxuICogSW5jbHVkZSBsZWdhY3kuanMgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciBicm93c2Vyc1xuICpcbiAqICAgICAgICAgICAgIC4tLl8gICBfIF8gXyBfIF8gXyBfIF9cbiAqICAuLScnLS5fXy4tJzAwICAnLScgJyAnICcgJyAnICcgJyAnLS5cbiAqICcuX19fICcgICAgLiAgIC4tLV8nLScgJy0nICctJyBfJy0nICcuX1xuICogIFY6IFYgJ3Z2LScgICAnXyAgICcuICAgICAgIC4nICBfLi4nICcuJy5cbiAqICAgICc9Ll9fX18uPV8uLS0nICAgOl8uX18uX186XyAgICcuICAgOiA6XG4gKiAgICAgICAgICAgICgoKF9fX18uLScgICAgICAgICctLiAgLyAgIDogOlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCgtJ1xcIC4nIC9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fX19fLi4nICAuJ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAnLS5fX19fXy4tJ1xuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9tYXRjaGVyLFxuICAgICAgICBfbGV2ZWwgPSAwLFxuICAgICAgICBfaWQgPSAwLFxuICAgICAgICBfaGFuZGxlcnMgPSB7fSxcbiAgICAgICAgX2dhdG9ySW5zdGFuY2VzID0ge307XG5cbiAgICBmdW5jdGlvbiBfYWRkRXZlbnQoZ2F0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgLy8gYmx1ciBhbmQgZm9jdXMgZG8gbm90IGJ1YmJsZSB1cCBidXQgaWYgeW91IHVzZSBldmVudCBjYXB0dXJpbmdcbiAgICAgICAgLy8gdGhlbiB5b3Ugd2lsbCBnZXQgdGhlbVxuICAgICAgICB2YXIgdXNlQ2FwdHVyZSA9IHR5cGUgPT0gJ2JsdXInIHx8IHR5cGUgPT0gJ2ZvY3VzJztcbiAgICAgICAgZ2F0b3IuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfY2FuY2VsKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgZnVuY3Rpb24gdG8gdXNlIGZvciBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50XG4gICAgICogbWF0Y2hlcyBhIHF1ZXJ5IHNlbGVjdG9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldE1hdGNoZXIoZWxlbWVudCkge1xuICAgICAgICBpZiAoX21hdGNoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfbWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm1hdGNoZXMpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5tYXRjaGVzO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICBfbWF0Y2hlciA9IGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICBfbWF0Y2hlciA9IGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICAgICAgICAgIHJldHVybiBfbWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgZG9lc24ndCBtYXRjaCBhIG5hdGl2ZSBicm93c2VyIG1ldGhvZFxuICAgICAgICAvLyBmYWxsIGJhY2sgdG8gdGhlIGdhdG9yIGZ1bmN0aW9uXG4gICAgICAgIF9tYXRjaGVyID0gR2F0b3IubWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGV0ZXJtaW5lcyBpZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgbWF0Y2hlcyBhIGdpdmVuIHNlbGVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byBjb21wYXJlIGFnYWluc3QgdGhlIHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtOb2RlfSBib3VuZEVsZW1lbnQgLSB0aGUgZWxlbWVudCB0aGUgbGlzdGVuZXIgd2FzIGF0dGFjaGVkIHRvXG4gICAgICogQHJldHVybnMge3ZvaWR8Tm9kZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yLCBib3VuZEVsZW1lbnQpIHtcblxuICAgICAgICAvLyBubyBzZWxlY3RvciBtZWFucyB0aGlzIGV2ZW50IHdhcyBib3VuZCBkaXJlY3RseSB0byB0aGlzIGVsZW1lbnRcbiAgICAgICAgaWYgKHNlbGVjdG9yID09ICdfcm9vdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBib3VuZEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIG1vdmVkIHVwIHRvIHRoZSBlbGVtZW50IHlvdSBib3VuZCB0aGUgZXZlbnQgdG9cbiAgICAgICAgLy8gdGhlbiB3ZSBoYXZlIGNvbWUgdG9vIGZhclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gYm91bmRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGlzIGlzIGEgbWF0Y2ggdGhlbiB3ZSBhcmUgZG9uZSFcbiAgICAgICAgaWYgKF9nZXRNYXRjaGVyKGVsZW1lbnQpLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoaXMgZWxlbWVudCBkaWQgbm90IG1hdGNoIGJ1dCBoYXMgYSBwYXJlbnQgd2Ugc2hvdWxkIHRyeVxuICAgICAgICAvLyBnb2luZyB1cCB0aGUgdHJlZSB0byBzZWUgaWYgYW55IG9mIHRoZSBwYXJlbnQgZWxlbWVudHMgbWF0Y2hcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgeW91IGFyZSBsb29raW5nIGZvciBhIGNsaWNrIG9uIGFuIDxhPiB0YWcgYnV0IHRoZXJlXG4gICAgICAgIC8vIGlzIGEgPHNwYW4+IGluc2lkZSBvZiB0aGUgYSB0YWcgdGhhdCBpdCBpcyB0aGUgdGFyZ2V0LFxuICAgICAgICAvLyBpdCBzaG91bGQgc3RpbGwgd29ya1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBfbGV2ZWwrKztcbiAgICAgICAgICAgIHJldHVybiBfbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQucGFyZW50Tm9kZSwgc2VsZWN0b3IsIGJvdW5kRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfYWRkSGFuZGxlcihnYXRvciwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoIV9oYW5kbGVyc1tnYXRvci5pZF0pIHtcbiAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF0pIHtcbiAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3JlbW92ZUhhbmRsZXIoZ2F0b3IsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHRpZWQgdG8gdGhpcyBlbGVtZW50IGF0IGFsbFxuICAgICAgICAvLyB0aGVuIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gZXZlbnQgdHlwZSBzcGVjaWZpZWQgdGhlbiByZW1vdmUgYWxsIGV2ZW50c1xuICAgICAgICAvLyBleGFtcGxlOiBHYXRvcihlbGVtZW50KS5vZmYoKVxuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKHZhciB0eXBlIGluIF9oYW5kbGVyc1tnYXRvci5pZF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoX2hhbmRsZXJzW2dhdG9yLmlkXS5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW3R5cGVdID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm8gY2FsbGJhY2sgb3Igc2VsZWN0b3IgaXMgc3BlY2lmaWVkIHJlbW92ZSBhbGwgZXZlbnRzIG9mIHRoaXMgdHlwZVxuICAgICAgICAvLyBleGFtcGxlOiBHYXRvcihlbGVtZW50KS5vZmYoJ2NsaWNrJylcbiAgICAgICAgaWYgKCFjYWxsYmFjayAmJiAhc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdID0ge307XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBhIHNlbGVjdG9yIGlzIHNwZWNpZmllZCBidXQgbm8gY2FsbGJhY2sgcmVtb3ZlIGFsbCBldmVudHNcbiAgICAgICAgLy8gZm9yIHRoaXMgc2VsZWN0b3JcbiAgICAgICAgLy8gZXhhbXBsZTogR2F0b3IoZWxlbWVudCkub2ZmKCdjbGljaycsICcuc3ViLWVsZW1lbnQnKVxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICBkZWxldGUgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBzcGVjaWZpZWQgYW4gZXZlbnQgdHlwZSwgc2VsZWN0b3IsIGFuZCBjYWxsYmFjayB0aGVuIHdlXG4gICAgICAgIC8vIG5lZWQgdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBjYWxsYmFja3MgdGllZCB0byB0aGlzIHNlbGVjdG9yIHRvXG4gICAgICAgIC8vIGJlZ2luIHdpdGguICBpZiB0aGVyZSBhcmVuJ3QgdGhlbiB3ZSBjYW4gc3RvcCBoZXJlXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgdGhlbiBsb29wIHRocm91Z2ggYWxsIHRoZSBjYWxsYmFja3MgYW5kIGlmIHdlIGZpbmRcbiAgICAgICAgLy8gb25lIHRoYXQgbWF0Y2hlcyByZW1vdmUgaXQgZnJvbSB0aGUgYXJyYXlcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl1baV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9oYW5kbGVFdmVudChpZCwgZSwgdHlwZSkge1xuICAgICAgICBpZiAoIV9oYW5kbGVyc1tpZF1bdHlwZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsXG4gICAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgICAgbWF0Y2hlcyA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMDtcblxuICAgICAgICAvLyBmaW5kIGFsbCBldmVudHMgdGhhdCBtYXRjaFxuICAgICAgICBfbGV2ZWwgPSAwO1xuICAgICAgICBmb3IgKHNlbGVjdG9yIGluIF9oYW5kbGVyc1tpZF1bdHlwZV0pIHtcbiAgICAgICAgICAgIGlmIChfaGFuZGxlcnNbaWRdW3R5cGVdLmhhc093blByb3BlcnR5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gX21hdGNoZXNTZWxlY3Rvcih0YXJnZXQsIHNlbGVjdG9yLCBfZ2F0b3JJbnN0YW5jZXNbaWRdLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIEdhdG9yLm1hdGNoZXNFdmVudCh0eXBlLCBfZ2F0b3JJbnN0YW5jZXNbaWRdLmVsZW1lbnQsIG1hdGNoLCBzZWxlY3RvciA9PSAnX3Jvb3QnLCBlKSkge1xuICAgICAgICAgICAgICAgICAgICBfbGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgX2hhbmRsZXJzW2lkXVt0eXBlXVtzZWxlY3Rvcl0ubWF0Y2ggPSBtYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlc1tfbGV2ZWxdID0gX2hhbmRsZXJzW2lkXVt0eXBlXVtzZWxlY3Rvcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcFByb3BhZ2F0aW9uKCkgZmFpbHMgdG8gc2V0IGNhbmNlbEJ1YmJsZSB0byB0cnVlIGluIFdlYmtpdFxuICAgICAgICAvLyBAc2VlIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE2MjI3MFxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPD0gX2xldmVsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG1hdGNoZXNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNbaV1bal0uY2FsbChtYXRjaGVzW2ldLm1hdGNoLCBlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhdG9yLmNhbmNlbChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmNhbmNlbEJ1YmJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZHMgdGhlIHNwZWNpZmllZCBldmVudHMgdG8gdGhlIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IHJlbW92ZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2JpbmQoZXZlbnRzLCBzZWxlY3RvciwgY2FsbGJhY2ssIHJlbW92ZSkge1xuXG4gICAgICAgIC8vIGZhaWwgc2lsZW50bHkgaWYgeW91IHBhc3MgbnVsbCBvciB1bmRlZmluZWQgYXMgYW4gYWxlbWVudFxuICAgICAgICAvLyBpbiB0aGUgR2F0b3IgY29uc3RydWN0b3JcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGV2ZW50cyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZXZlbnRzID0gW2V2ZW50c107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZihzZWxlY3RvcikgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gJ19yb290JztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQsXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRHbG9iYWxDYWxsYmFjayh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIF9oYW5kbGVFdmVudChpZCwgZSwgdHlwZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgICAgIF9yZW1vdmVIYW5kbGVyKHRoaXMsIGV2ZW50c1tpXSwgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFfaGFuZGxlcnNbaWRdIHx8ICFfaGFuZGxlcnNbaWRdW2V2ZW50c1tpXV0pIHtcbiAgICAgICAgICAgICAgICBHYXRvci5hZGRFdmVudCh0aGlzLCBldmVudHNbaV0sIF9nZXRHbG9iYWxDYWxsYmFjayhldmVudHNbaV0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2FkZEhhbmRsZXIodGhpcywgZXZlbnRzW2ldLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2F0b3Igb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBHYXRvcihlbGVtZW50LCBpZCkge1xuXG4gICAgICAgIC8vIGNhbGxlZCBhcyBmdW5jdGlvblxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgR2F0b3IpKSB7XG4gICAgICAgICAgICAvLyBvbmx5IGtlZXAgb25lIEdhdG9yIGluc3RhbmNlIHBlciBub2RlIHRvIG1ha2Ugc3VyZSB0aGF0XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBjcmVhdGUgYSB0b24gb2YgbmV3IG9iamVjdHMgaWYgeW91IHdhbnQgdG8gZGVsZWdhdGVcbiAgICAgICAgICAgIC8vIG11bHRpcGxlIGV2ZW50cyBmcm9tIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBmb3IgZXhhbXBsZTogR2F0b3IoZG9jdW1lbnQpLm9uKC4uLlxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIF9nYXRvckluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgIGlmIChfZ2F0b3JJbnN0YW5jZXNba2V5XS5lbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZ2F0b3JJbnN0YW5jZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9pZCsrO1xuICAgICAgICAgICAgX2dhdG9ySW5zdGFuY2VzW19pZF0gPSBuZXcgR2F0b3IoZWxlbWVudCwgX2lkKTtcblxuICAgICAgICAgICAgcmV0dXJuIF9nYXRvckluc3RhbmNlc1tfaWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZHMgYW4gZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgR2F0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnRzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIF9iaW5kLmNhbGwodGhpcywgZXZlbnRzLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVzIGFuIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gZXZlbnRzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIEdhdG9yLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gX2JpbmQuY2FsbCh0aGlzLCBldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgfTtcblxuICAgIEdhdG9yLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCkge307XG4gICAgR2F0b3IuY2FuY2VsID0gX2NhbmNlbDtcbiAgICBHYXRvci5hZGRFdmVudCA9IF9hZGRFdmVudDtcbiAgICBHYXRvci5tYXRjaGVzRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IEdhdG9yO1xuICAgIH1cblxuICAgIHdpbmRvdy5HYXRvciA9IEdhdG9yO1xufSkgKCk7XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsIi8qKlxuICogTWljcm9FdmVudCAtIHRvIG1ha2UgYW55IGpzIG9iamVjdCBhbiBldmVudCBlbWl0dGVyIChzZXJ2ZXIgb3IgYnJvd3NlcilcbiAqIFxuICogLSBwdXJlIGphdmFzY3JpcHQgLSBzZXJ2ZXIgY29tcGF0aWJsZSwgYnJvd3NlciBjb21wYXRpYmxlXG4gKiAtIGRvbnQgcmVseSBvbiB0aGUgYnJvd3NlciBkb21zXG4gKiAtIHN1cGVyIHNpbXBsZSAtIHlvdSBnZXQgaXQgaW1tZWRpYXRseSwgbm8gbWlzdGVyeSwgbm8gbWFnaWMgaW52b2x2ZWRcbiAqXG4gKiAtIGNyZWF0ZSBhIE1pY3JvRXZlbnREZWJ1ZyB3aXRoIGdvb2RpZXMgdG8gZGVidWdcbiAqICAgLSBtYWtlIGl0IHNhZmVyIHRvIHVzZVxuKi9cblxudmFyIE1pY3JvRXZlbnRcdD0gZnVuY3Rpb24oKXt9XG5NaWNyb0V2ZW50LnByb3RvdHlwZVx0PSB7XG5cdGJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0gPSB0aGlzLl9ldmVudHNbZXZlbnRdXHR8fCBbXTtcblx0XHR0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2goZmN0KTtcblx0fSxcblx0dW5iaW5kXHQ6IGZ1bmN0aW9uKGV2ZW50LCBmY3Qpe1xuXHRcdHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcblx0XHRpZiggZXZlbnQgaW4gdGhpcy5fZXZlbnRzID09PSBmYWxzZSAgKVx0cmV0dXJuO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0uc3BsaWNlKHRoaXMuX2V2ZW50c1tldmVudF0uaW5kZXhPZihmY3QpLCAxKTtcblx0fSxcblx0dHJpZ2dlclx0OiBmdW5jdGlvbihldmVudCAvKiAsIGFyZ3MuLi4gKi8pe1xuXHRcdHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcblx0XHRpZiggZXZlbnQgaW4gdGhpcy5fZXZlbnRzID09PSBmYWxzZSAgKVx0cmV0dXJuO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHNbZXZlbnRdLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudF1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogbWl4aW4gd2lsbCBkZWxlZ2F0ZSBhbGwgTWljcm9FdmVudC5qcyBmdW5jdGlvbiBpbiB0aGUgZGVzdGluYXRpb24gb2JqZWN0XG4gKlxuICogLSByZXF1aXJlKCdNaWNyb0V2ZW50JykubWl4aW4oRm9vYmFyKSB3aWxsIG1ha2UgRm9vYmFyIGFibGUgdG8gdXNlIE1pY3JvRXZlbnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdGhlIG9iamVjdCB3aGljaCB3aWxsIHN1cHBvcnQgTWljcm9FdmVudFxuKi9cbk1pY3JvRXZlbnQubWl4aW5cdD0gZnVuY3Rpb24oZGVzdE9iamVjdCl7XG5cdHZhciBwcm9wc1x0PSBbJ2JpbmQnLCAndW5iaW5kJywgJ3RyaWdnZXInXTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArKyl7XG5cdFx0ZGVzdE9iamVjdC5wcm90b3R5cGVbcHJvcHNbaV1dXHQ9IE1pY3JvRXZlbnQucHJvdG90eXBlW3Byb3BzW2ldXTtcblx0fVxufVxuXG4vLyBleHBvcnQgaW4gY29tbW9uIGpzXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAoJ2V4cG9ydHMnIGluIG1vZHVsZSkpe1xuXHRtb2R1bGUuZXhwb3J0c1x0PSBNaWNyb0V2ZW50XG59XG4iLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICovXG5cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UgTXVzdGFjaGU6IHRydWUqL1xuXG4oZnVuY3Rpb24gZGVmaW5lTXVzdGFjaGUgKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgdHlwZW9mIGV4cG9ydHMubm9kZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgZmFjdG9yeShleHBvcnRzKTsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpOyAvLyBBTURcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWwuTXVzdGFjaGUgPSB7fTtcbiAgICBmYWN0b3J5KGdsb2JhbC5NdXN0YWNoZSk7IC8vIHNjcmlwdCwgd3NoLCBhc3BcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiBtdXN0YWNoZUZhY3RvcnkgKG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbCAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3JlIGNvcnJlY3QgdHlwZW9mIHN0cmluZyBoYW5kbGluZyBhcnJheVxuICAgKiB3aGljaCBub3JtYWxseSByZXR1cm5zIHR5cGVvZiAnb2JqZWN0J1xuICAgKi9cbiAgZnVuY3Rpb24gdHlwZVN0ciAob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwIChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkgKG9iaiwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKHByb3BOYW1lIGluIG9iaik7XG4gIH1cblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciByZWdFeHBUZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuICBmdW5jdGlvbiB0ZXN0UmVnRXhwIChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZSAoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnLFxuICAgICdgJzogJyYjeDYwOycsXG4gICAgJz0nOiAnJiN4M0Q7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwgKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAgKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSAoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aClcbiAgICAgICAgICBkZWxldGUgdG9rZW5zW3NwYWNlcy5wb3AoKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3MgKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbICd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxIF0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdDdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGN1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgICB0eXBlID0gJyYnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFsgdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvcyBdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIENoZWNrIHNlY3Rpb24gbmVzdGluZy5cbiAgICAgICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgICAgICBpZiAoIW9wZW5TZWN0aW9uKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5vcGVuZWQgc2VjdGlvbiBcIicgKyB2YWx1ZSArICdcIiBhdCAnICsgc3RhcnQpO1xuXG4gICAgICAgIGlmIChvcGVuU2VjdGlvblsxXSAhPT0gdmFsdWUpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzdGFydCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2VucyAodG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnMgKHRva2Vucykge1xuICAgIHZhciBuZXN0ZWRUb2tlbnMgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gbmVzdGVkVG9rZW5zO1xuICAgIHZhciBzZWN0aW9ucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBzZWN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgIGNhc2UgJyMnOlxuICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgY29sbGVjdG9yID0gdG9rZW5bNF0gPSBbXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSBzZWN0aW9ucy5sZW5ndGggPiAwID8gc2VjdGlvbnNbc2VjdGlvbnMubGVuZ3RoIC0gMV1bNF0gOiBuZXN0ZWRUb2tlbnM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXN0ZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogQSBzaW1wbGUgc3RyaW5nIHNjYW5uZXIgdGhhdCBpcyB1c2VkIGJ5IHRoZSB0ZW1wbGF0ZSBwYXJzZXIgdG8gZmluZFxuICAgKiB0b2tlbnMgaW4gdGVtcGxhdGUgc3RyaW5ncy5cbiAgICovXG4gIGZ1bmN0aW9uIFNjYW5uZXIgKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zICgpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbiAocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnRhaWwubWF0Y2gocmUpO1xuXG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCAhPT0gMClcbiAgICAgIHJldHVybiAnJztcblxuICAgIHZhciBzdHJpbmcgPSBtYXRjaFswXTtcblxuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCk7XG4gICAgdGhpcy5wb3MgKz0gc3RyaW5nLmxlbmd0aDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNraXBzIGFsbCB0ZXh0IHVudGlsIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gY2FuIGJlIG1hdGNoZWQuIFJldHVybnNcbiAgICogdGhlIHNraXBwZWQgc3RyaW5nLCB3aGljaCBpcyB0aGUgZW50aXJlIHRhaWwgaWYgbm8gbWF0Y2ggY2FuIGJlIG1hZGUuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuVW50aWwgPSBmdW5jdGlvbiBzY2FuVW50aWwgKHJlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICAgIHRoaXMudGFpbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbWF0Y2ggPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxuICAgKiBtYWludGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBDb250ZXh0ICh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0geyAnLic6IHRoaXMudmlldyB9O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Q29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNvbnRleHQgdXNpbmcgdGhlIGdpdmVuIHZpZXcgd2l0aCB0aGlzIGNvbnRleHRcbiAgICogYXMgdGhlIHBhcmVudC5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoICh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBDb250ZXh0KHZpZXcsIHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcbiAgICogdXAgdGhlIGNvbnRleHQgaGllcmFyY2h5IGlmIHRoZSB2YWx1ZSBpcyBhYnNlbnQgaW4gdGhpcyBjb250ZXh0J3Mgdmlldy5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cCAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIG5hbWVzLCBpbmRleCwgbG9va3VwSGl0ID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlldztcbiAgICAgICAgICBuYW1lcyA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBVc2luZyB0aGUgZG90IG5vdGlvbiBwYXRoIGluIGBuYW1lYCwgd2UgZGVzY2VuZCB0aHJvdWdoIHRoZVxuICAgICAgICAgICAqIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVG8gYmUgY2VydGFpbiB0aGF0IHRoZSBsb29rdXAgaGFzIGJlZW4gc3VjY2Vzc2Z1bCwgd2UgaGF2ZSB0b1xuICAgICAgICAgICAqIGNoZWNrIGlmIHRoZSBsYXN0IG9iamVjdCBpbiB0aGUgcGF0aCBhY3R1YWxseSBoYXMgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICogd2UgYXJlIGxvb2tpbmcgZm9yLiBXZSBzdG9yZSB0aGUgcmVzdWx0IGluIGBsb29rdXBIaXRgLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVGhpcyBpcyBzcGVjaWFsbHkgbmVjZXNzYXJ5IGZvciB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXQgdG9cbiAgICAgICAgICAgKiBgdW5kZWZpbmVkYCBhbmQgd2Ugd2FudCB0byBhdm9pZCBsb29raW5nIHVwIHBhcmVudCBjb250ZXh0cy5cbiAgICAgICAgICAgKiovXG4gICAgICAgICAgd2hpbGUgKHZhbHVlICE9IG51bGwgJiYgaW5kZXggPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbmFtZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkodmFsdWUsIG5hbWVzW2luZGV4XSk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbbmFtZXNbaW5kZXgrK11dO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcbiAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eShjb250ZXh0LnZpZXcsIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvb2t1cEhpdClcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGNhY2hlW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKVxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKHRoaXMudmlldyk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgV3JpdGVyIGtub3dzIGhvdyB0byB0YWtlIGEgc3RyZWFtIG9mIHRva2VucyBhbmQgcmVuZGVyIHRoZW0gdG8gYVxuICAgKiBzdHJpbmcsIGdpdmVuIGEgY29udGV4dC4gSXQgYWxzbyBtYWludGFpbnMgYSBjYWNoZSBvZiB0ZW1wbGF0ZXMgdG9cbiAgICogYXZvaWQgdGhlIG5lZWQgdG8gcGFyc2UgdGhlIHNhbWUgdGVtcGxhdGUgdHdpY2UuXG4gICAqL1xuICBmdW5jdGlvbiBXcml0ZXIgKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlICgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICB2YXIgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdO1xuXG4gICAgaWYgKHRva2VucyA9PSBudWxsKVxuICAgICAgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncyk7XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdoLWxldmVsIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHdpdGhcbiAgICogdGhlIGdpdmVuIGB2aWV3YC5cbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIGBwYXJ0aWFsc2AgYXJndW1lbnQgbWF5IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuICAgKiBuYW1lcyBhbmQgdGVtcGxhdGVzIG9mIHBhcnRpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLiBJdCBtYXlcbiAgICogYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBsb2FkIHBhcnRpYWwgdGVtcGxhdGVzIG9uIHRoZSBmbHlcbiAgICogdGhhdCB0YWtlcyBhIHNpbmdsZSBhcmd1bWVudDogdGhlIG5hbWUgb2YgdGhlIHBhcnRpYWwuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UodGVtcGxhdGUpO1xuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zICh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgdmFyIHRva2VuLCBzeW1ib2wsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzeW1ib2wgPSB0b2tlblswXTtcblxuICAgICAgaWYgKHN5bWJvbCA9PT0gJyMnKSB2YWx1ZSA9IHRoaXMucmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICcmJykgdmFsdWUgPSB0aGlzLnVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ25hbWUnKSB2YWx1ZSA9IHRoaXMuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbiAodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVuZGVyIGFuIGFyYml0cmFyeSB0ZW1wbGF0ZVxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlciAodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMpO1xuICAgIH1cblxuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBqIDwgdmFsdWVMZW5ndGg7ICsraikge1xuICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVySW52ZXJ0ZWQgPSBmdW5jdGlvbiByZW5kZXJJbnZlcnRlZCAodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclBhcnRpYWwgPSBmdW5jdGlvbiByZW5kZXJQYXJ0aWFsICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUgKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gZXNjYXBlZFZhbHVlICh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSAodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4zLjAnO1xuICBtdXN0YWNoZS50YWdzID0gWyAne3snLCAnfX0nIF07XG5cbiAgLy8gQWxsIGhpZ2gtbGV2ZWwgbXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlICgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBgdGVtcGxhdGVgIHdpdGggdGhlIGdpdmVuIGB2aWV3YCBhbmQgYHBhcnRpYWxzYCB1c2luZyB0aGVcbiAgICogZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguLFxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiB0b19odG1sICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcblxuICAvLyBFeHBvcnQgdGhlc2UgbWFpbmx5IGZvciB0ZXN0aW5nLCBidXQgYWxzbyBmb3IgYWR2YW5jZWQgdXNhZ2UuXG4gIG11c3RhY2hlLlNjYW5uZXIgPSBTY2FubmVyO1xuICBtdXN0YWNoZS5Db250ZXh0ID0gQ29udGV4dDtcbiAgbXVzdGFjaGUuV3JpdGVyID0gV3JpdGVyO1xuXG4gIHJldHVybiBtdXN0YWNoZTtcbn0pKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIhZnVuY3Rpb24oZ2xvYmFscykge1xuJ3VzZSBzdHJpY3QnXG5cbnZhciBfaW1wb3J0cyA9IHt9XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvL0NvbW1vbkpTXG4gIF9pbXBvcnRzLmJ5dGVzVG9IZXggPSByZXF1aXJlKCdjb252ZXJ0LWhleCcpLmJ5dGVzVG9IZXhcbiAgX2ltcG9ydHMuY29udmVydFN0cmluZyA9IHJlcXVpcmUoJ2NvbnZlcnQtc3RyaW5nJylcbiAgbW9kdWxlLmV4cG9ydHMgPSBzaGEyNTZcbn0gZWxzZSB7XG4gIF9pbXBvcnRzLmJ5dGVzVG9IZXggPSBnbG9iYWxzLmNvbnZlcnRIZXguYnl0ZXNUb0hleFxuICBfaW1wb3J0cy5jb252ZXJ0U3RyaW5nID0gZ2xvYmFscy5jb252ZXJ0U3RyaW5nXG4gIGdsb2JhbHMuc2hhMjU2ID0gc2hhMjU2XG59XG5cbi8qXG5DcnlwdG9KUyB2My4xLjJcbmNvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qc1xuKGMpIDIwMDktMjAxMyBieSBKZWZmIE1vdHQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5jb2RlLmdvb2dsZS5jb20vcC9jcnlwdG8tanMvd2lraS9MaWNlbnNlXG4qL1xuXG4vLyBJbml0aWFsaXphdGlvbiByb3VuZCBjb25zdGFudHMgdGFibGVzXG52YXIgSyA9IFtdXG5cbi8vIENvbXB1dGUgY29uc3RhbnRzXG4hZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcbiAgICB2YXIgc3FydE4gPSBNYXRoLnNxcnQobik7XG4gICAgZm9yICh2YXIgZmFjdG9yID0gMjsgZmFjdG9yIDw9IHNxcnROOyBmYWN0b3IrKykge1xuICAgICAgaWYgKCEobiAlIGZhY3RvcikpIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRGcmFjdGlvbmFsQml0cyhuKSB7XG4gICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMFxuICB9XG5cbiAgdmFyIG4gPSAyXG4gIHZhciBuUHJpbWUgPSAwXG4gIHdoaWxlIChuUHJpbWUgPCA2NCkge1xuICAgIGlmIChpc1ByaW1lKG4pKSB7XG4gICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpXG4gICAgICBuUHJpbWUrK1xuICAgIH1cblxuICAgIG4rK1xuICB9XG59KClcblxudmFyIGJ5dGVzVG9Xb3JkcyA9IGZ1bmN0aW9uIChieXRlcykge1xuICB2YXIgd29yZHMgPSBbXVxuICBmb3IgKHZhciBpID0gMCwgYiA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKywgYiArPSA4KSB7XG4gICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKVxuICB9XG4gIHJldHVybiB3b3Jkc1xufVxuXG52YXIgd29yZHNUb0J5dGVzID0gZnVuY3Rpb24gKHdvcmRzKSB7XG4gIHZhciBieXRlcyA9IFtdXG4gIGZvciAodmFyIGIgPSAwOyBiIDwgd29yZHMubGVuZ3RoICogMzI7IGIgKz0gOCkge1xuICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbi8vIFJldXNhYmxlIG9iamVjdFxudmFyIFcgPSBbXVxuXG52YXIgcHJvY2Vzc0Jsb2NrID0gZnVuY3Rpb24gKEgsIE0sIG9mZnNldCkge1xuICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuICB2YXIgYSA9IEhbMF0sIGIgPSBIWzFdLCBjID0gSFsyXSwgZCA9IEhbM11cbiAgdmFyIGUgPSBIWzRdLCBmID0gSFs1XSwgZyA9IEhbNl0sIGggPSBIWzddXG5cbiAgICAvLyBDb21wdXRhdGlvblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICBpZiAoaSA8IDE2KSB7XG4gICAgICBXW2ldID0gTVtvZmZzZXQgKyBpXSB8IDBcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV1cbiAgICAgIHZhciBnYW1tYTAgID0gKChnYW1tYTB4IDw8IDI1KSB8IChnYW1tYTB4ID4+PiA3KSkgIF5cbiAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cbiAgICAgICAgICAgICAgICAgICAgKGdhbW1hMHggPj4+IDMpXG5cbiAgICAgIHZhciBnYW1tYTF4ID0gV1tpIC0gMl07XG4gICAgICB2YXIgZ2FtbWExICA9ICgoZ2FtbWExeCA8PCAxNSkgfCAoZ2FtbWExeCA+Pj4gMTcpKSBeXG4gICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG4gICAgICAgICAgICAgICAgICAgIChnYW1tYTF4ID4+PiAxMClcblxuICAgICAgV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdO1xuICAgIH1cblxuICAgIHZhciBjaCAgPSAoZSAmIGYpIF4gKH5lICYgZyk7XG4gICAgdmFyIG1haiA9IChhICYgYikgXiAoYSAmIGMpIF4gKGIgJiBjKTtcblxuICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcbiAgICB2YXIgc2lnbWExID0gKChlIDw8IDI2KSB8IChlID4+PiA2KSkgXiAoKGUgPDwgMjEpIHwgKGUgPj4+IDExKSkgXiAoKGUgPDwgNykgIHwgKGUgPj4+IDI1KSk7XG5cbiAgICB2YXIgdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXTtcbiAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cbiAgICBoID0gZztcbiAgICBnID0gZjtcbiAgICBmID0gZTtcbiAgICBlID0gKGQgKyB0MSkgfCAwO1xuICAgIGQgPSBjO1xuICAgIGMgPSBiO1xuICAgIGIgPSBhO1xuICAgIGEgPSAodDEgKyB0MikgfCAwO1xuICB9XG5cbiAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcbiAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG4gIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcbiAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG4gIEhbNV0gPSAoSFs1XSArIGYpIHwgMDtcbiAgSFs2XSA9IChIWzZdICsgZykgfCAwO1xuICBIWzddID0gKEhbN10gKyBoKSB8IDA7XG59XG5cbmZ1bmN0aW9uIHNoYTI1NihtZXNzYWdlLCBvcHRpb25zKSB7O1xuICBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSB7XG4gICAgbWVzc2FnZSA9IF9pbXBvcnRzLmNvbnZlcnRTdHJpbmcuVVRGOC5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xuICB9XG5cbiAgdmFyIEggPVsgMHg2QTA5RTY2NywgMHhCQjY3QUU4NSwgMHgzQzZFRjM3MiwgMHhBNTRGRjUzQSxcbiAgICAgICAgICAgMHg1MTBFNTI3RiwgMHg5QjA1Njg4QywgMHgxRjgzRDlBQiwgMHg1QkUwQ0QxOSBdO1xuXG4gIHZhciBtID0gYnl0ZXNUb1dvcmRzKG1lc3NhZ2UpO1xuICB2YXIgbCA9IG1lc3NhZ2UubGVuZ3RoICogODtcblxuICBtW2wgPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsICUgMzIpO1xuICBtWygobCArIDY0ID4+IDkpIDw8IDQpICsgMTVdID0gbDtcblxuICBmb3IgKHZhciBpPTAgOyBpPG0ubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgcHJvY2Vzc0Jsb2NrKEgsIG0sIGkpO1xuICB9XG5cbiAgdmFyIGRpZ2VzdGJ5dGVzID0gd29yZHNUb0J5dGVzKEgpO1xuICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLmFzQnl0ZXMgPyBkaWdlc3RieXRlcyA6XG4gICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBfaW1wb3J0cy5jb252ZXJ0U3RyaW5nLmJ5dGVzVG9TdHJpbmcoZGlnZXN0Ynl0ZXMpIDpcbiAgICAgICAgIF9pbXBvcnRzLmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpXG59XG5cbnNoYTI1Ni54MiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHNoYTI1NihzaGEyNTYobWVzc2FnZSwgeyBhc0J5dGVzOnRydWUgfSksIG9wdGlvbnMpXG59XG5cbn0odGhpcyk7XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQW5pbWF0aW9uXG4gICAgY29uc3RydWN0b3I6IChAZWwpIC0+XG4gICAgICAgIEBydW4gPSAwXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhbmltYXRlOiAob3B0aW9ucyA9IHt9LCBjYWxsYmFjayA9IC0+KSAtPlxuICAgICAgICB4ID0gb3B0aW9ucy54ID8gMFxuICAgICAgICB5ID0gb3B0aW9ucy55ID8gMFxuICAgICAgICBzY2FsZSA9IG9wdGlvbnMuc2NhbGUgPyAxXG4gICAgICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nID8gJ2Vhc2Utb3V0J1xuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gPyAwXG4gICAgICAgIHJ1biA9ICsrQHJ1blxuICAgICAgICB0cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKCN7eH0sICN7eX0sIDBweCkgc2NhbGUzZCgje3NjYWxlfSwgI3tzY2FsZX0sIDEpXCJcblxuICAgICAgICBpZiBAZWwuc3R5bGUudHJhbnNmb3JtIGlzIHRyYW5zZm9ybVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICBlbHNlIGlmIGR1cmF0aW9uID4gMFxuICAgICAgICAgICAgdHJhbnNpdGlvbkVuZCA9ID0+XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlmIHJ1biBpc250IEBydW5cblxuICAgICAgICAgICAgICAgIEBlbC5yZW1vdmVFdmVudExpc3RlbmVyICd0cmFuc2l0aW9uZW5kJywgdHJhbnNpdGlvbkVuZFxuICAgICAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgQGVsLmFkZEV2ZW50TGlzdGVuZXIgJ3RyYW5zaXRpb25lbmQnLCB0cmFuc2l0aW9uRW5kLCBmYWxzZVxuXG4gICAgICAgICAgICBAZWwuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtICN7ZWFzaW5nfSAje2R1cmF0aW9ufW1zXCJcbiAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cblxuICAgICAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgICAgIEBcbiIsIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUGFnZVNwcmVhZFxuICAgIGNvbnN0cnVjdG9yOiAoQGVsLCBAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAdmlzaWJpbGl0eSA9ICdnb25lJ1xuICAgICAgICBAcG9zaXRpb25lZCA9IGZhbHNlXG4gICAgICAgIEBhY3RpdmUgPSBmYWxzZVxuICAgICAgICBAaWQgPSBAb3B0aW9ucy5pZFxuICAgICAgICBAdHlwZSA9IEBvcHRpb25zLnR5cGVcbiAgICAgICAgQHBhZ2VJZHMgPSBAb3B0aW9ucy5wYWdlSWRzXG4gICAgICAgIEB3aWR0aCA9IEBvcHRpb25zLndpZHRoXG4gICAgICAgIEBsZWZ0ID0gQG9wdGlvbnMubGVmdFxuICAgICAgICBAbWF4Wm9vbVNjYWxlID0gQG9wdGlvbnMubWF4Wm9vbVNjYWxlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1pvb21hYmxlOiAtPlxuICAgICAgICBAZ2V0TWF4Wm9vbVNjYWxlKCkgPiAxIGFuZCBAZ2V0RWwoKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtem9vbWFibGUnKSBpc250ICdmYWxzZSdcblxuICAgIGdldEVsOiAtPlxuICAgICAgICBAZWxcblxuICAgIGdldE92ZXJsYXlFbHM6IC0+XG4gICAgICAgIEBnZXRFbCgpLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fb3ZlcmxheSdcblxuICAgIGdldFBhZ2VFbHM6IC0+XG4gICAgICAgIEBnZXRFbCgpLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fcGFnZSdcblxuICAgIGdldFJlY3Q6IC0+XG4gICAgICAgIEBnZXRFbCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBnZXRDb250ZW50UmVjdDogLT5cbiAgICAgICAgcmVjdCA9XG4gICAgICAgICAgICB0b3A6IG51bGxcbiAgICAgICAgICAgIGxlZnQ6IG51bGxcbiAgICAgICAgICAgIHJpZ2h0OiBudWxsXG4gICAgICAgICAgICBib3R0b206IG51bGxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGxcbiAgICAgICAgICAgIFxuICAgICAgICBmb3IgcGFnZUVsIGluIEBnZXRQYWdlRWxzKClcbiAgICAgICAgICAgIHBhZ2VSZWN0ID0gcGFnZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgICAgIHJlY3QudG9wID0gcGFnZVJlY3QudG9wIGlmIHBhZ2VSZWN0LnRvcCA8IHJlY3QudG9wIG9yIG5vdCByZWN0LnRvcD9cbiAgICAgICAgICAgIHJlY3QubGVmdCA9IHBhZ2VSZWN0LmxlZnQgaWYgcGFnZVJlY3QubGVmdCA8IHJlY3QubGVmdCBvciBub3QgcmVjdC5sZWZ0P1xuICAgICAgICAgICAgcmVjdC5yaWdodCA9IHBhZ2VSZWN0LnJpZ2h0IGlmIHBhZ2VSZWN0LnJpZ2h0ID4gcmVjdC5yaWdodCBvciBub3QgcmVjdC5yaWdodD9cbiAgICAgICAgICAgIHJlY3QuYm90dG9tID0gcGFnZVJlY3QuYm90dG9tIGlmIHBhZ2VSZWN0LmJvdHRvbSA+IHJlY3QuYm90dG9tIG9yIG5vdCByZWN0LmJvdHRvbT9cblxuICAgICAgICByZWN0LnRvcCA9IHJlY3QudG9wID8gMFxuICAgICAgICByZWN0LmxlZnQgPSByZWN0LmxlZnQgPyAwXG4gICAgICAgIHJlY3QucmlnaHQgPSByZWN0LnJpZ2h0ID8gMFxuICAgICAgICByZWN0LmJvdHRvbSA9IHJlY3QuYm90dG9tID8gMFxuICAgICAgICByZWN0LndpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdFxuICAgICAgICByZWN0LmhlaWdodCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcblxuICAgICAgICByZWN0XG5cbiAgICBnZXRJZDogLT5cbiAgICAgICAgQGlkXG5cbiAgICBnZXRUeXBlOiAtPlxuICAgICAgICBAdHlwZVxuXG4gICAgZ2V0UGFnZUlkczogLT5cbiAgICAgICAgQHBhZ2VJZHNcblxuICAgIGdldFdpZHRoOiAtPlxuICAgICAgICBAd2lkdGhcblxuICAgIGdldExlZnQ6IC0+XG4gICAgICAgIEBsZWZ0XG5cbiAgICBnZXRNYXhab29tU2NhbGU6IC0+XG4gICAgICAgIEBtYXhab29tU2NhbGVcblxuICAgIGdldFZpc2liaWxpdHk6IC0+XG4gICAgICAgIEB2aXNpYmlsaXR5XG5cbiAgICBzZXRWaXNpYmlsaXR5OiAodmlzaWJpbGl0eSkgLT5cbiAgICAgICAgaWYgQHZpc2liaWxpdHkgaXNudCB2aXNpYmlsaXR5XG4gICAgICAgICAgICBAZ2V0RWwoKS5zdHlsZS5kaXNwbGF5ID0gaWYgdmlzaWJpbGl0eSBpcyAndmlzaWJsZScgdGhlbiAnYmxvY2snIGVsc2UgJ25vbmUnXG5cbiAgICAgICAgICAgIEB2aXNpYmlsaXR5ID0gdmlzaWJpbGl0eVxuXG4gICAgICAgIEBcblxuICAgIHBvc2l0aW9uOiAtPlxuICAgICAgICBpZiBAcG9zaXRpb25lZCBpcyBmYWxzZVxuICAgICAgICAgICAgQGdldEVsKCkuc3R5bGUubGVmdCA9IFwiI3tAZ2V0TGVmdCgpfSVcIlxuXG4gICAgICAgICAgICBAcG9zaXRpb25lZCA9IHRydWVcblxuICAgICAgICBAXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgQGFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGdldEVsKCkuc2V0QXR0cmlidXRlICdkYXRhLWFjdGl2ZScsIEBhY3RpdmVcblxuICAgICAgICByZXR1cm5cblxuICAgIGRlYWN0aXZhdGU6IC0+XG4gICAgICAgIEBhY3RpdmUgPSBmYWxzZVxuICAgICAgICBAZ2V0RWwoKS5zZXRBdHRyaWJ1dGUgJ2RhdGEtYWN0aXZlJywgQGFjdGl2ZVxuXG4gICAgICAgIHJldHVyblxuIiwiSGFtbWVyID0gcmVxdWlyZSAnaGFtbWVyanMnXG5NaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblBhZ2VTcHJlYWQgPSByZXF1aXJlICcuL3BhZ2Vfc3ByZWFkJ1xuQW5pbWF0aW9uID0gcmVxdWlyZSAnLi9hbmltYXRpb24nXG5cbmNsYXNzIFZlcnNvXG4gICAgY29uc3RydWN0b3I6IChAZWwsIEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBzd2lwZVZlbG9jaXR5ID0gQG9wdGlvbnMuc3dpcGVWZWxvY2l0eSA/IDAuM1xuICAgICAgICBAc3dpcGVUaHJlc2hvbGQgPSBAb3B0aW9ucy5zd2lwZVRocmVzaG9sZCA/IDEwXG4gICAgICAgIEBuYXZpZ2F0aW9uRHVyYXRpb24gPSBAb3B0aW9ucy5uYXZpZ2F0aW9uRHVyYXRpb24gPyAyNDBcbiAgICAgICAgQG5hdmlnYXRpb25QYW5EdXJhdGlvbiA9IEBvcHRpb25zLm5hdmlnYXRpb25QYW5EdXJhdGlvbiA/IDIwMFxuICAgICAgICBAem9vbUR1cmF0aW9uID0gQG9wdGlvbnMuem9vbUR1cmF0aW9uID8gMjAwXG5cbiAgICAgICAgQHBvc2l0aW9uID0gLTFcbiAgICAgICAgQHBpbmNoaW5nID0gZmFsc2VcbiAgICAgICAgQHBhbm5pbmcgPSBmYWxzZVxuICAgICAgICBAdHJhbnNmb3JtID0gbGVmdDogMCwgdG9wOiAwLCBzY2FsZTogMVxuICAgICAgICBAc3RhcnRUcmFuc2Zvcm0gPSBsZWZ0OiAwLCB0b3A6IDAsIHNjYWxlOiAxXG4gICAgICAgIEB0YXAgPVxuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgICAgIGRlbGF5OiAyNTBcbiAgICAgICAgICAgIHRpbWVvdXQ6IG51bGxcblxuICAgICAgICBAc2Nyb2xsZXJFbCA9IEBlbC5xdWVyeVNlbGVjdG9yICcudmVyc29fX3Njcm9sbGVyJ1xuICAgICAgICBAcGFnZVNwcmVhZEVscyA9IEBlbC5xdWVyeVNlbGVjdG9yQWxsICcudmVyc29fX3BhZ2Utc3ByZWFkJ1xuICAgICAgICBAcGFnZVNwcmVhZHMgPSBAdHJhdmVyc2VQYWdlU3ByZWFkcyBAcGFnZVNwcmVhZEVsc1xuICAgICAgICBAcGFnZUlkcyA9IEBidWlsZFBhZ2VJZHMgQHBhZ2VTcHJlYWRzXG4gICAgICAgIEBhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uIEBzY3JvbGxlckVsXG4gICAgICAgIEBoYW1tZXIgPSBuZXcgSGFtbWVyLk1hbmFnZXIgQHNjcm9sbGVyRWwsXG4gICAgICAgICAgICB0b3VjaEFjdGlvbjogJ2F1dG8nXG4gICAgICAgICAgICBlbmFibGU6IGZhbHNlXG4gICAgICAgICAgICAjIFByZWZlciB0b3VjaCBpbnB1dCBpZiBwb3NzaWJsZSBzaW5jZSBBbmRyb2lkIGFjdHMgd2VpcmQgd2hlbiB1c2luZyBwb2ludGVyIGV2ZW50cy5cbiAgICAgICAgICAgIGlucHV0Q2xhc3M6IGlmICdvbnRvdWNoc3RhcnQnIG9mIHdpbmRvdyB0aGVuIEhhbW1lci5Ub3VjaElucHV0IGVsc2UgbnVsbFxuXG4gICAgICAgIEBoYW1tZXIuYWRkIG5ldyBIYW1tZXIuUGFuIGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTExcbiAgICAgICAgQGhhbW1lci5hZGQgbmV3IEhhbW1lci5UYXAgZXZlbnQ6ICdzaW5nbGV0YXAnLCBpbnRlcnZhbDogMFxuICAgICAgICBAaGFtbWVyLmFkZCBuZXcgSGFtbWVyLlBpbmNoKClcbiAgICAgICAgQGhhbW1lci5hZGQgbmV3IEhhbW1lci5QcmVzcyB0aW1lOiA1MDBcbiAgICAgICAgQGhhbW1lci5vbiAncGFuc3RhcnQnLCBAcGFuU3RhcnQuYmluZCBAXG4gICAgICAgIEBoYW1tZXIub24gJ3Bhbm1vdmUnLCBAcGFuTW92ZS5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncGFuZW5kJywgQHBhbkVuZC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncGFuY2FuY2VsJywgQHBhbkVuZC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAnc2luZ2xldGFwJywgQHNpbmdsZXRhcC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncGluY2hzdGFydCcsIEBwaW5jaFN0YXJ0LmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaG1vdmUnLCBAcGluY2hNb3ZlLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaGVuZCcsIEBwaW5jaEVuZC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncGluY2hjYW5jZWwnLCBAcGluY2hFbmQuYmluZCBAXG4gICAgICAgIEBoYW1tZXIub24gJ3ByZXNzJywgQHByZXNzLmJpbmQgQFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIHBhZ2VJZCA9IEBnZXRQYWdlU3ByZWFkUG9zaXRpb25Gcm9tUGFnZUlkKEBvcHRpb25zLnBhZ2VJZCkgPyAwXG5cbiAgICAgICAgQGhhbW1lci5zZXQgZW5hYmxlOiB0cnVlXG4gICAgICAgIEBuYXZpZ2F0ZVRvIHBhZ2VJZCwgZHVyYXRpb246IDBcblxuICAgICAgICBAcmVzaXplTGlzdGVuZXIgPSBAcmVzaXplLmJpbmQgQFxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXIsIGZhbHNlXG5cbiAgICAgICAgQFxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQGhhbW1lci5kZXN0cm95KClcblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyXG5cbiAgICAgICAgQFxuXG4gICAgZmlyc3Q6IChvcHRpb25zKSAtPlxuICAgICAgICBAbmF2aWdhdGVUbyAwLCBvcHRpb25zXG5cbiAgICBwcmV2OiAob3B0aW9ucykgLT5cbiAgICAgICAgQG5hdmlnYXRlVG8gQGdldFBvc2l0aW9uKCkgLSAxLCBvcHRpb25zXG5cbiAgICBuZXh0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQG5hdmlnYXRlVG8gQGdldFBvc2l0aW9uKCkgKyAxLCBvcHRpb25zXG5cbiAgICBsYXN0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQG5hdmlnYXRlVG8gQGdldFBhZ2VTcHJlYWRDb3VudCgpIC0gMSwgb3B0aW9uc1xuXG4gICAgbmF2aWdhdGVUbzogKHBvc2l0aW9uLCBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIHJldHVybiBpZiBwb3NpdGlvbiA8IDAgb3IgcG9zaXRpb24gPiBAZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxXG5cbiAgICAgICAgY3VycmVudFBvc2l0aW9uID0gQGdldFBvc2l0aW9uKClcbiAgICAgICAgY3VycmVudFBhZ2VTcHJlYWQgPSBAZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgYWN0aXZlUGFnZVNwcmVhZCA9IEBnZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIHBvc2l0aW9uXG4gICAgICAgIGNhcm91c2VsID0gQGdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICB2ZWxvY2l0eSA9IG9wdGlvbnMudmVsb2NpdHkgPyAxXG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiA/IEBuYXZpZ2F0aW9uRHVyYXRpb25cbiAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiAvIE1hdGguYWJzKHZlbG9jaXR5KVxuXG4gICAgICAgIGN1cnJlbnRQYWdlU3ByZWFkLmRlYWN0aXZhdGUoKSBpZiBjdXJyZW50UGFnZVNwcmVhZD9cbiAgICAgICAgYWN0aXZlUGFnZVNwcmVhZC5hY3RpdmF0ZSgpXG5cbiAgICAgICAgY2Fyb3VzZWwudmlzaWJsZS5mb3JFYWNoIChwYWdlU3ByZWFkKSAtPiBwYWdlU3ByZWFkLnBvc2l0aW9uKCkuc2V0VmlzaWJpbGl0eSAndmlzaWJsZSdcblxuICAgICAgICBAdHJhbnNmb3JtLmxlZnQgPSBAZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkIHBvc2l0aW9uLCBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgIEBzZXRQb3NpdGlvbiBwb3NpdGlvblxuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgPiAxXG4gICAgICAgICAgICBAdHJhbnNmb3JtLnRvcCA9IDBcbiAgICAgICAgICAgIEB0cmFuc2Zvcm0uc2NhbGUgPSAxXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRPdXQnLCBwb3NpdGlvbjogY3VycmVudFBvc2l0aW9uXG5cbiAgICAgICAgQHRyaWdnZXIgJ2JlZm9yZU5hdmlnYXRpb24nLFxuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uOiBwb3NpdGlvblxuXG4gICAgICAgIEBhbmltYXRpb24uYW5pbWF0ZVxuICAgICAgICAgICAgeDogXCIje0B0cmFuc2Zvcm0ubGVmdH0lXCJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAsID0+XG4gICAgICAgICAgICBjYXJvdXNlbCA9IEBnZXRDYXJvdXNlbEZyb21QYWdlU3ByZWFkIEBnZXRBY3RpdmVQYWdlU3ByZWFkKClcblxuICAgICAgICAgICAgY2Fyb3VzZWwuZ29uZS5mb3JFYWNoIChwYWdlU3ByZWFkKSAtPiBwYWdlU3ByZWFkLnNldFZpc2liaWxpdHkgJ2dvbmUnXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdhZnRlck5hdmlnYXRpb24nLFxuICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uOiBAZ2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IGN1cnJlbnRQb3NpdGlvblxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIGdldFBvc2l0aW9uOiAtPlxuICAgICAgICBAcG9zaXRpb25cblxuICAgIHNldFBvc2l0aW9uOiAocG9zaXRpb24pIC0+XG4gICAgICAgIEBwb3NpdGlvbiA9IHBvc2l0aW9uXG5cbiAgICAgICAgQFxuXG4gICAgZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkOiAocG9zaXRpb24sIHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGxlZnQgPSAwXG5cbiAgICAgICAgaWYgcG9zaXRpb24gaXMgQGdldFBhZ2VTcHJlYWRDb3VudCgpIC0gMVxuICAgICAgICAgICAgbGVmdCA9ICgxMDAgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkpIC0gcGFnZVNwcmVhZC5nZXRMZWZ0KClcbiAgICAgICAgZWxzZSBpZiBwb3NpdGlvbiA+IDBcbiAgICAgICAgICAgIGxlZnQgPSAoMTAwIC0gcGFnZVNwcmVhZC5nZXRXaWR0aCgpKSAvIDIgLSBwYWdlU3ByZWFkLmdldExlZnQoKVxuXG4gICAgICAgIGxlZnRcblxuICAgIGdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQ6IChwYWdlU3ByZWFkU3ViamVjdCkgLT5cbiAgICAgICAgY2Fyb3VzZWwgPVxuICAgICAgICAgICAgdmlzaWJsZTogW11cbiAgICAgICAgICAgIGdvbmU6IFtdXG5cbiAgICAgICAgIyBJZGVudGlmeSB0aGUgcGFnZSBzcHJlYWRzIHRoYXQgc2hvdWxkIGJlIGEgcGFydCBvZiB0aGUgY2Fyb3VzZWwuXG4gICAgICAgIEBwYWdlU3ByZWFkcy5mb3JFYWNoIChwYWdlU3ByZWFkKSAtPlxuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpIDw9IHBhZ2VTcHJlYWRTdWJqZWN0LmdldExlZnQoKVxuICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlIGlmIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpICsgcGFnZVNwcmVhZC5nZXRXaWR0aCgpID4gcGFnZVNwcmVhZFN1YmplY3QuZ2V0TGVmdCgpIC0gMTAwXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWUgaWYgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkgPCBwYWdlU3ByZWFkU3ViamVjdC5nZXRMZWZ0KCkgKyAxMDBcblxuICAgICAgICAgICAgaWYgdmlzaWJsZSBpcyB0cnVlXG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwudmlzaWJsZS5wdXNoIHBhZ2VTcHJlYWRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5nb25lLnB1c2ggcGFnZVNwcmVhZFxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBjYXJvdXNlbFxuXG4gICAgdHJhdmVyc2VQYWdlU3ByZWFkczogKGVscykgLT5cbiAgICAgICAgcGFnZVNwcmVhZHMgPSBbXVxuICAgICAgICBsZWZ0ID0gMFxuXG4gICAgICAgIGZvciBlbCBpbiBlbHNcbiAgICAgICAgICAgIGlkID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLWlkJ1xuICAgICAgICAgICAgdHlwZSA9IGVsLmdldEF0dHJpYnV0ZSAnZGF0YS10eXBlJ1xuICAgICAgICAgICAgcGFnZUlkcyA9IGVsLmdldEF0dHJpYnV0ZSAnZGF0YS1wYWdlLWlkcydcbiAgICAgICAgICAgIHBhZ2VJZHMgPSBpZiBwYWdlSWRzPyB0aGVuIHBhZ2VJZHMuc3BsaXQoJywnKS5tYXAgKGkpIC0+IGkgZWxzZSBbXVxuICAgICAgICAgICAgbWF4Wm9vbVNjYWxlID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLW1heC16b29tLXNjYWxlJ1xuICAgICAgICAgICAgbWF4Wm9vbVNjYWxlID0gaWYgbWF4Wm9vbVNjYWxlPyB0aGVuICttYXhab29tU2NhbGUgZWxzZSAxXG4gICAgICAgICAgICB3aWR0aCA9IGVsLmdldEF0dHJpYnV0ZSAnZGF0YS13aWR0aCdcbiAgICAgICAgICAgIHdpZHRoID0gaWYgd2lkdGg/IHRoZW4gK3dpZHRoIGVsc2UgMTAwXG4gICAgICAgICAgICBwYWdlU3ByZWFkID0gbmV3IFBhZ2VTcHJlYWQgZWwsXG4gICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgICAgICAgIHBhZ2VJZHM6IHBhZ2VJZHNcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGU6IG1heFpvb21TY2FsZVxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnRcblxuICAgICAgICAgICAgbGVmdCArPSB3aWR0aFxuXG4gICAgICAgICAgICBwYWdlU3ByZWFkcy5wdXNoIHBhZ2VTcHJlYWRcblxuICAgICAgICBwYWdlU3ByZWFkc1xuXG4gICAgYnVpbGRQYWdlSWRzOiAocGFnZVNwcmVhZHMpIC0+XG4gICAgICAgIHBhZ2VJZHMgPSB7fVxuXG4gICAgICAgIHBhZ2VTcHJlYWRzLmZvckVhY2ggKHBhZ2VTcHJlYWQsIGkpIC0+XG4gICAgICAgICAgICBwYWdlU3ByZWFkLm9wdGlvbnMucGFnZUlkcy5mb3JFYWNoIChwYWdlSWQpIC0+XG4gICAgICAgICAgICAgICAgcGFnZUlkc1twYWdlSWRdID0gcGFnZVNwcmVhZFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHBhZ2VJZHNcblxuICAgIGlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQ6ICh4LCB5LCBlbCkgLT5cbiAgICAgICAgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgeCA+PSByZWN0LmxlZnQgYW5kIHggPD0gcmVjdC5yaWdodCBhbmQgeSA+PSByZWN0LnRvcCBhbmQgeSA8PSByZWN0LmJvdHRvbVxuXG4gICAgZ2V0Q29vcmRpbmF0ZUluZm86ICh4LCB5LCBwYWdlU3ByZWFkKSAtPlxuICAgICAgICBpbmZvID1cbiAgICAgICAgICAgIHg6IHhcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIGNvbnRlbnRYOiAwXG4gICAgICAgICAgICBjb250ZW50WTogMFxuICAgICAgICAgICAgcGFnZVg6IDBcbiAgICAgICAgICAgIHBhZ2VZOiAwXG4gICAgICAgICAgICBvdmVybGF5RWxzOiBbXVxuICAgICAgICAgICAgcGFnZUVsOiBudWxsXG4gICAgICAgICAgICBpc0luc2lkZUNvbnRlbnRYOiBmYWxzZVxuICAgICAgICAgICAgaXNJbnNpZGVDb250ZW50WTogZmFsc2VcbiAgICAgICAgICAgIGlzSW5zaWRlQ29udGVudDogZmFsc2VcbiAgICAgICAgY29udGVudFJlY3QgPSBwYWdlU3ByZWFkLmdldENvbnRlbnRSZWN0KClcbiAgICAgICAgb3ZlcmxheUVscyA9IHBhZ2VTcHJlYWQuZ2V0T3ZlcmxheUVscygpXG4gICAgICAgIHBhZ2VFbHMgPSBwYWdlU3ByZWFkLmdldFBhZ2VFbHMoKVxuXG4gICAgICAgIGZvciBvdmVybGF5RWwgaW4gb3ZlcmxheUVsc1xuICAgICAgICAgICAgaW5mby5vdmVybGF5RWxzLnB1c2ggb3ZlcmxheUVsIGlmIEBpc0Nvb3JkaW5hdGVJbnNpZGVFbGVtZW50KHgsIHksIG92ZXJsYXlFbClcblxuICAgICAgICBmb3IgcGFnZUVsIGluIHBhZ2VFbHNcbiAgICAgICAgICAgIGlmIEBpc0Nvb3JkaW5hdGVJbnNpZGVFbGVtZW50KHgsIHksIHBhZ2VFbClcbiAgICAgICAgICAgICAgICBpbmZvLnBhZ2VFbCA9IHBhZ2VFbFxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgaW5mby5jb250ZW50WCA9ICh4IC0gY29udGVudFJlY3QubGVmdCkgLyBjb250ZW50UmVjdC53aWR0aFxuICAgICAgICBpbmZvLmNvbnRlbnRZID0gKHkgLSBjb250ZW50UmVjdC50b3ApIC8gY29udGVudFJlY3QuaGVpZ2h0XG5cbiAgICAgICAgaWYgaW5mby5wYWdlRWw/XG4gICAgICAgICAgICBpbmZvLmlzSW5zaWRlQ29udGVudFggPSBpbmZvLmNvbnRlbnRYID49IDAgYW5kIGluZm8uY29udGVudFggPD0gMVxuICAgICAgICAgICAgaW5mby5pc0luc2lkZUNvbnRlbnRZID0gaW5mby5jb250ZW50WSA+PSAwIGFuZCBpbmZvLmNvbnRlbnRZIDw9IDFcbiAgICAgICAgICAgIGluZm8uaXNJbnNpZGVDb250ZW50ID0gaW5mby5pc0luc2lkZUNvbnRlbnRYIGFuZCBpbmZvLmlzSW5zaWRlQ29udGVudFlcblxuICAgICAgICBpbmZvXG5cbiAgICBnZXRQYWdlU3ByZWFkQ291bnQ6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkcy5sZW5ndGhcblxuICAgIGdldEFjdGl2ZVBhZ2VTcHJlYWQ6IC0+XG4gICAgICAgIEBnZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIEBnZXRQb3NpdGlvbigpXG5cbiAgICBnZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uOiAocG9zaXRpb24pIC0+XG4gICAgICAgIEBwYWdlU3ByZWFkc1twb3NpdGlvbl1cblxuICAgIGdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQ6IChwYWdlSWQpIC0+XG4gICAgICAgIGZvciBwYWdlU3ByZWFkLCBpZHggaW4gQHBhZ2VTcHJlYWRzXG4gICAgICAgICAgICByZXR1cm4gaWR4IGlmIHBhZ2VTcHJlYWQub3B0aW9ucy5wYWdlSWRzLmluZGV4T2YocGFnZUlkKSA+IC0xXG5cbiAgICBnZXRQYWdlU3ByZWFkQm91bmRzOiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgcGFnZVNwcmVhZFJlY3QgPSBwYWdlU3ByZWFkLmdldFJlY3QoKVxuICAgICAgICBwYWdlU3ByZWFkQ29udGVudFJlY3QgPSBwYWdlU3ByZWFkLmdldENvbnRlbnRSZWN0KClcblxuICAgICAgICBsZWZ0OiAocGFnZVNwcmVhZENvbnRlbnRSZWN0LmxlZnQgLSBwYWdlU3ByZWFkUmVjdC5sZWZ0KSAvIHBhZ2VTcHJlYWRSZWN0LndpZHRoICogMTAwXG4gICAgICAgIHRvcDogKHBhZ2VTcHJlYWRDb250ZW50UmVjdC50b3AgLSBwYWdlU3ByZWFkUmVjdC50b3ApIC8gcGFnZVNwcmVhZFJlY3QuaGVpZ2h0ICogMTAwXG4gICAgICAgIHdpZHRoOiBwYWdlU3ByZWFkQ29udGVudFJlY3Qud2lkdGggLyBwYWdlU3ByZWFkUmVjdC53aWR0aCAqIDEwMFxuICAgICAgICBoZWlnaHQ6IHBhZ2VTcHJlYWRDb250ZW50UmVjdC5oZWlnaHQgLyBwYWdlU3ByZWFkUmVjdC5oZWlnaHQgKiAxMDBcbiAgICAgICAgcGFnZVNwcmVhZFJlY3Q6IHBhZ2VTcHJlYWRSZWN0XG4gICAgICAgIHBhZ2VTcHJlYWRDb250ZW50UmVjdDogcGFnZVNwcmVhZENvbnRlbnRSZWN0XG5cbiAgICBjbGlwQ29vcmRpbmF0ZTogKGNvb3JkaW5hdGUsIHNjYWxlLCBzaXplLCBvZmZzZXQpIC0+XG4gICAgICAgIGlmIHNpemUgKiBzY2FsZSA8IDEwMFxuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IG9mZnNldCAqIC1zY2FsZSArIDUwIC0gKHNpemUgKiBzY2FsZSAvIDIpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvb3JkaW5hdGUgPSBNYXRoLm1pbiBjb29yZGluYXRlLCBvZmZzZXQgKiAtc2NhbGVcbiAgICAgICAgICAgIGNvb3JkaW5hdGUgPSBNYXRoLm1heCBjb29yZGluYXRlLCBvZmZzZXQgKiAtc2NhbGUgLSBzaXplICogc2NhbGUgKyAxMDBcblxuICAgICAgICBjb29yZGluYXRlXG5cbiAgICB6b29tVG86IChvcHRpb25zID0ge30sIGNhbGxiYWNrKSAtPlxuICAgICAgICBzY2FsZSA9IG9wdGlvbnMuc2NhbGVcbiAgICAgICAgYWN0aXZlUGFnZVNwcmVhZCA9IEBnZXRBY3RpdmVQYWdlU3ByZWFkKClcbiAgICAgICAgcGFnZVNwcmVhZEJvdW5kcyA9IEBnZXRQYWdlU3ByZWFkQm91bmRzIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgY2Fyb3VzZWxPZmZzZXQgPSBhY3RpdmVQYWdlU3ByZWFkLmdldExlZnQoKVxuICAgICAgICBjYXJvdXNlbFNjYWxlZE9mZnNldCA9IGNhcm91c2VsT2Zmc2V0ICogQHRyYW5zZm9ybS5zY2FsZVxuICAgICAgICB4ID0gb3B0aW9ucy54ID8gMFxuICAgICAgICB5ID0gb3B0aW9ucy55ID8gMFxuXG4gICAgICAgIGlmIHNjYWxlIGlzbnQgMVxuICAgICAgICAgICAgeCAtPSBwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LmxlZnRcbiAgICAgICAgICAgIHkgLT0gcGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC50b3BcbiAgICAgICAgICAgIHggPSB4IC8gKHBhZ2VTcHJlYWRCb3VuZHMucGFnZVNwcmVhZFJlY3Qud2lkdGggLyBAdHJhbnNmb3JtLnNjYWxlKSAqIDEwMFxuICAgICAgICAgICAgeSA9IHkgLyAocGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC5oZWlnaHQgLyBAdHJhbnNmb3JtLnNjYWxlKSAqIDEwMFxuICAgICAgICAgICAgeCA9IEB0cmFuc2Zvcm0ubGVmdCArIGNhcm91c2VsU2NhbGVkT2Zmc2V0ICsgeCAtICh4ICogc2NhbGUgLyBAdHJhbnNmb3JtLnNjYWxlKVxuICAgICAgICAgICAgeSA9IEB0cmFuc2Zvcm0udG9wICsgeSAtICh5ICogc2NhbGUgLyBAdHJhbnNmb3JtLnNjYWxlKVxuXG4gICAgICAgICAgICAjIE1ha2Ugc3VyZSB0aGUgYW5pbWF0aW9uIGRvZXNuJ3QgZXhjZWVkIHRoZSBjb250ZW50IGJvdW5kcy5cbiAgICAgICAgICAgIGlmIG9wdGlvbnMuYm91bmRzIGlzbnQgZmFsc2UgYW5kIHNjYWxlID4gMVxuICAgICAgICAgICAgICAgIHggPSBAY2xpcENvb3JkaW5hdGUgeCwgc2NhbGUsIHBhZ2VTcHJlYWRCb3VuZHMud2lkdGgsIHBhZ2VTcHJlYWRCb3VuZHMubGVmdFxuICAgICAgICAgICAgICAgIHkgPSBAY2xpcENvb3JkaW5hdGUgeSwgc2NhbGUsIHBhZ2VTcHJlYWRCb3VuZHMuaGVpZ2h0LCBwYWdlU3ByZWFkQm91bmRzLnRvcFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB4ID0gMFxuICAgICAgICAgICAgeSA9IDBcblxuICAgICAgICAjIEFjY291bnQgZm9yIHRoZSBwYWdlIHNwcmVhZHMgbGVmdCBvZiB0aGUgYWN0aXZlIG9uZS5cbiAgICAgICAgeCAtPSBjYXJvdXNlbE9mZnNldCAqIHNjYWxlXG5cbiAgICAgICAgQHRyYW5zZm9ybS5sZWZ0ID0geFxuICAgICAgICBAdHJhbnNmb3JtLnRvcCA9IHlcbiAgICAgICAgQHRyYW5zZm9ybS5zY2FsZSA9IHNjYWxlXG5cbiAgICAgICAgQGFuaW1hdGlvbi5hbmltYXRlXG4gICAgICAgICAgICB4OiBcIiN7eH0lXCJcbiAgICAgICAgICAgIHk6IFwiI3t5fSVcIlxuICAgICAgICAgICAgc2NhbGU6IHNjYWxlXG4gICAgICAgICAgICBlYXNpbmc6IG9wdGlvbnMuZWFzaW5nXG4gICAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvblxuICAgICAgICAsIGNhbGxiYWNrXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZWZyZXNoOiAtPlxuICAgICAgICBAcGFnZVNwcmVhZEVscyA9IEBlbC5xdWVyeVNlbGVjdG9yQWxsICcudmVyc29fX3BhZ2Utc3ByZWFkJ1xuICAgICAgICBAcGFnZVNwcmVhZHMgPSBAdHJhdmVyc2VQYWdlU3ByZWFkcyBAcGFnZVNwcmVhZEVsc1xuICAgICAgICBAcGFnZUlkcyA9IEBidWlsZFBhZ2VJZHMgQHBhZ2VTcHJlYWRzXG5cbiAgICAgICAgQFxuXG4gICAgcGFuU3RhcnQ6IChlKSAtPlxuICAgICAgICB4ID0gZS5jZW50ZXIueFxuICAgICAgICBlZGdlVGhyZXNob2xkID0gMzBcbiAgICAgICAgd2lkdGggPSBAc2Nyb2xsZXJFbC5vZmZzZXRXaWR0aFxuXG4gICAgICAgICMgUHJldmVudCBwYW5uaW5nIHdoZW4gZWRnZS1zd2lwaW5nIG9uIGlPUy5cbiAgICAgICAgaWYgeCA+IGVkZ2VUaHJlc2hvbGQgYW5kIHggPCB3aWR0aCAtIGVkZ2VUaHJlc2hvbGRcbiAgICAgICAgICAgIEBzdGFydFRyYW5zZm9ybS5sZWZ0ID0gQHRyYW5zZm9ybS5sZWZ0XG4gICAgICAgICAgICBAc3RhcnRUcmFuc2Zvcm0udG9wID0gQHRyYW5zZm9ybS50b3BcblxuICAgICAgICAgICAgQHBhbm5pbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdwYW5TdGFydCdcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhbk1vdmU6IChlKSAtPlxuICAgICAgICByZXR1cm4gaWYgQHBpbmNoaW5nIGlzIHRydWUgb3IgQHBhbm5pbmcgaXMgZmFsc2VcblxuICAgICAgICBpZiBAdHJhbnNmb3JtLnNjYWxlID4gMVxuICAgICAgICAgICAgYWN0aXZlUGFnZVNwcmVhZCA9IEBnZXRBY3RpdmVQYWdlU3ByZWFkKClcbiAgICAgICAgICAgIGNhcm91c2VsT2Zmc2V0ID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRMZWZ0KClcbiAgICAgICAgICAgIGNhcm91c2VsU2NhbGVkT2Zmc2V0ID0gY2Fyb3VzZWxPZmZzZXQgKiBAdHJhbnNmb3JtLnNjYWxlXG4gICAgICAgICAgICBwYWdlU3ByZWFkQm91bmRzID0gQGdldFBhZ2VTcHJlYWRCb3VuZHMgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICAgICAgc2NhbGUgPSBAdHJhbnNmb3JtLnNjYWxlXG4gICAgICAgICAgICB4ID0gQHN0YXJ0VHJhbnNmb3JtLmxlZnQgKyBjYXJvdXNlbFNjYWxlZE9mZnNldCArIGUuZGVsdGFYIC8gQHNjcm9sbGVyRWwub2Zmc2V0V2lkdGggKiAxMDBcbiAgICAgICAgICAgIHkgPSBAc3RhcnRUcmFuc2Zvcm0udG9wICsgZS5kZWx0YVkgLyBAc2Nyb2xsZXJFbC5vZmZzZXRIZWlnaHQgKiAxMDBcbiAgICAgICAgICAgIHggPSBAY2xpcENvb3JkaW5hdGUgeCwgc2NhbGUsIHBhZ2VTcHJlYWRCb3VuZHMud2lkdGgsIHBhZ2VTcHJlYWRCb3VuZHMubGVmdFxuICAgICAgICAgICAgeSA9IEBjbGlwQ29vcmRpbmF0ZSB5LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy5oZWlnaHQsIHBhZ2VTcHJlYWRCb3VuZHMudG9wXG4gICAgICAgICAgICB4IC09IGNhcm91c2VsU2NhbGVkT2Zmc2V0XG5cbiAgICAgICAgICAgIEB0cmFuc2Zvcm0ubGVmdCA9IHhcbiAgICAgICAgICAgIEB0cmFuc2Zvcm0udG9wID0geVxuXG4gICAgICAgICAgICBAYW5pbWF0aW9uLmFuaW1hdGVcbiAgICAgICAgICAgICAgICB4OiBcIiN7eH0lXCJcbiAgICAgICAgICAgICAgICB5OiBcIiN7eX0lXCJcbiAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHggPSBAdHJhbnNmb3JtLmxlZnQgKyBlLmRlbHRhWCAvIEBzY3JvbGxlckVsLm9mZnNldFdpZHRoICogMTAwXG5cbiAgICAgICAgICAgIEBhbmltYXRpb24uYW5pbWF0ZVxuICAgICAgICAgICAgICAgIHg6IFwiI3t4fSVcIlxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcidcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhbkVuZDogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGFubmluZyBpcyBmYWxzZVxuXG4gICAgICAgIEBwYW5uaW5nID0gZmFsc2VcbiAgICAgICAgQHRyaWdnZXIgJ3BhbkVuZCdcblxuICAgICAgICBpZiBAdHJhbnNmb3JtLnNjYWxlIGlzIDEgYW5kIEBwaW5jaGluZyBpcyBmYWxzZVxuICAgICAgICAgICAgcG9zaXRpb24gPSBAZ2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgdmVsb2NpdHkgPSBlLm92ZXJhbGxWZWxvY2l0eVhcblxuICAgICAgICAgICAgaWYgTWF0aC5hYnModmVsb2NpdHkpID49IEBzd2lwZVZlbG9jaXR5XG4gICAgICAgICAgICAgICAgaWYgTWF0aC5hYnMoZS5kZWx0YVgpID49IEBzd2lwZVRocmVzaG9sZFxuICAgICAgICAgICAgICAgICAgICBpZiBlLm9mZnNldERpcmVjdGlvbiBpcyBIYW1tZXIuRElSRUNUSU9OX0xFRlRcbiAgICAgICAgICAgICAgICAgICAgICAgIEBuZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEBuYXZpZ2F0aW9uUGFuRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBlLm9mZnNldERpcmVjdGlvbiBpcyBIYW1tZXIuRElSRUNUSU9OX1JJR0hUXG4gICAgICAgICAgICAgICAgICAgICAgICBAcHJldlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlbG9jaXR5OiB2ZWxvY2l0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBAbmF2aWdhdGlvblBhbkR1cmF0aW9uXG5cbiAgICAgICAgICAgIGlmIHBvc2l0aW9uIGlzIEBnZXRQb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgQGFuaW1hdGlvbi5hbmltYXRlXG4gICAgICAgICAgICAgICAgICAgIHg6IFwiI3tAdHJhbnNmb3JtLmxlZnR9JVwiXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBAbmF2aWdhdGlvblBhbkR1cmF0aW9uXG5cbiAgICAgICAgICAgICAgICBAdHJpZ2dlciAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIHBvc2l0aW9uOiBAZ2V0UG9zaXRpb24oKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGluY2hTdGFydDogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBub3QgQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKS5pc1pvb21hYmxlKClcblxuICAgICAgICBAcGluY2hpbmcgPSB0cnVlXG4gICAgICAgIEBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtcGluY2hpbmcnLCB0cnVlXG4gICAgICAgIEBzdGFydFRyYW5zZm9ybS5zY2FsZSA9IEB0cmFuc2Zvcm0uc2NhbGVcblxuICAgICAgICByZXR1cm5cblxuICAgIHBpbmNoTW92ZTogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGluY2hpbmcgaXMgZmFsc2VcblxuICAgICAgICBAem9vbVRvXG4gICAgICAgICAgICB4OiBlLmNlbnRlci54XG4gICAgICAgICAgICB5OiBlLmNlbnRlci55XG4gICAgICAgICAgICBzY2FsZTogQHN0YXJ0VHJhbnNmb3JtLnNjYWxlICogZS5zY2FsZVxuICAgICAgICAgICAgYm91bmRzOiBmYWxzZVxuICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGluY2hFbmQ6IChlKSAtPlxuICAgICAgICByZXR1cm4gaWYgQHBpbmNoaW5nIGlzIGZhbHNlXG5cbiAgICAgICAgYWN0aXZlUGFnZVNwcmVhZCA9IEBnZXRBY3RpdmVQYWdlU3ByZWFkKClcbiAgICAgICAgbWF4Wm9vbVNjYWxlID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRNYXhab29tU2NhbGUoKVxuICAgICAgICBzY2FsZSA9IE1hdGgubWF4IDEsIE1hdGgubWluKEB0cmFuc2Zvcm0uc2NhbGUsIG1heFpvb21TY2FsZSlcbiAgICAgICAgcG9zaXRpb24gPSBAZ2V0UG9zaXRpb24oKVxuXG4gICAgICAgIGlmIEBzdGFydFRyYW5zZm9ybS5zY2FsZSBpcyAxIGFuZCBzY2FsZSA+IDFcbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRJbicsIHBvc2l0aW9uOiBwb3NpdGlvblxuICAgICAgICBlbHNlIGlmIEBzdGFydFRyYW5zZm9ybS5zY2FsZSA+IDEgYW5kIHNjYWxlIGlzIDFcbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRPdXQnLCBwb3NpdGlvbjogcG9zaXRpb25cblxuICAgICAgICBAem9vbVRvXG4gICAgICAgICAgICB4OiBlLmNlbnRlci54XG4gICAgICAgICAgICB5OiBlLmNlbnRlci55XG4gICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgIGR1cmF0aW9uOiBAem9vbUR1cmF0aW9uXG4gICAgICAgICwgPT5cbiAgICAgICAgICAgIEBwaW5jaGluZyA9IGZhbHNlXG4gICAgICAgICAgICBAZWwuc2V0QXR0cmlidXRlICdkYXRhLXBpbmNoaW5nJywgZmFsc2VcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzczogKGUpIC0+XG4gICAgICAgIEB0cmlnZ2VyICdwcmVzc2VkJywgQGdldENvb3JkaW5hdGVJbmZvKGUuY2VudGVyLngsIGUuY2VudGVyLnksIEBnZXRBY3RpdmVQYWdlU3ByZWFkKCkpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzaW5nbGV0YXA6IChlKSAtPlxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICBjb29yZGluYXRlSW5mbyA9IEBnZXRDb29yZGluYXRlSW5mbyBlLmNlbnRlci54LCBlLmNlbnRlci55LCBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgIGlzRG91YmxlVGFwID0gQHRhcC5jb3VudCBpcyAxXG5cbiAgICAgICAgY2xlYXJUaW1lb3V0IEB0YXAudGltZW91dFxuXG4gICAgICAgIGlmIGlzRG91YmxlVGFwXG4gICAgICAgICAgICBAdGFwLmNvdW50ID0gMFxuXG4gICAgICAgICAgICBAdHJpZ2dlciAnZG91YmxlQ2xpY2tlZCcsIGNvb3JkaW5hdGVJbmZvXG5cbiAgICAgICAgICAgIGlmIGFjdGl2ZVBhZ2VTcHJlYWQuaXNab29tYWJsZSgpXG4gICAgICAgICAgICAgICAgbWF4Wm9vbVNjYWxlID0gYWN0aXZlUGFnZVNwcmVhZC5nZXRNYXhab29tU2NhbGUoKVxuICAgICAgICAgICAgICAgIHpvb21lZEluID0gQHRyYW5zZm9ybS5zY2FsZSA+IDFcbiAgICAgICAgICAgICAgICBzY2FsZSA9IGlmIHpvb21lZEluIHRoZW4gMSBlbHNlIG1heFpvb21TY2FsZVxuICAgICAgICAgICAgICAgIHpvb21FdmVudCA9IGlmIHpvb21lZEluIHRoZW4gJ3pvb21lZE91dCcgZWxzZSAnem9vbWVkSW4nXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBAZ2V0UG9zaXRpb24oKVxuXG4gICAgICAgICAgICAgICAgQHpvb21Ub1xuICAgICAgICAgICAgICAgICAgICB4OiBlLmNlbnRlci54XG4gICAgICAgICAgICAgICAgICAgIHk6IGUuY2VudGVyLnlcbiAgICAgICAgICAgICAgICAgICAgc2NhbGU6IHNjYWxlXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBAem9vbUR1cmF0aW9uXG4gICAgICAgICAgICAgICAgLCA9PlxuICAgICAgICAgICAgICAgICAgICBAdHJpZ2dlciB6b29tRXZlbnQsIHBvc2l0aW9uOiBwb3NpdGlvblxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAdGFwLmNvdW50KytcbiAgICAgICAgICAgIEB0YXAudGltZW91dCA9IHNldFRpbWVvdXQgPT5cbiAgICAgICAgICAgICAgICBAdGFwLmNvdW50ID0gMFxuXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgJ2NsaWNrZWQnLCBjb29yZGluYXRlSW5mb1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAsIEB0YXAuZGVsYXlcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlc2l6ZTogLT5cbiAgICAgICAgaWYgQHRyYW5zZm9ybS5zY2FsZSA+IDFcbiAgICAgICAgICAgIHBvc2l0aW9uID0gQGdldFBvc2l0aW9uKClcbiAgICAgICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWQgPSBAZ2V0QWN0aXZlUGFnZVNwcmVhZCgpXG5cbiAgICAgICAgICAgIEB0cmFuc2Zvcm0ubGVmdCA9IEBnZXRMZWZ0VHJhbnNmb3JtRnJvbVBhZ2VTcHJlYWQgcG9zaXRpb24sIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgICAgIEB0cmFuc2Zvcm0udG9wID0gMFxuICAgICAgICAgICAgQHRyYW5zZm9ybS5zY2FsZSA9IDFcblxuICAgICAgICAgICAgQHpvb21Ub1xuICAgICAgICAgICAgICAgIHg6IEB0cmFuc2Zvcm0ubGVmdFxuICAgICAgICAgICAgICAgIHk6IEB0cmFuc2Zvcm0udG9wXG4gICAgICAgICAgICAgICAgc2NhbGU6IEB0cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMFxuXG4gICAgICAgICAgICBAdHJpZ2dlciAnem9vbWVkT3V0JywgcG9zaXRpb246IHBvc2l0aW9uXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gVmVyc29cblxubW9kdWxlLmV4cG9ydHMgPSBWZXJzb1xuIiwiLyohIEhhbW1lci5KUyAtIHYyLjAuNyAtIDIwMTYtMDQtMjJcbiAqIGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE2IEpvcmlrIFRhbmdlbGRlcjtcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIGV4cG9ydE5hbWUsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbnZhciBWRU5ET1JfUFJFRklYRVMgPSBbJycsICd3ZWJraXQnLCAnTW96JywgJ01TJywgJ21zJywgJ28nXTtcbnZhciBURVNUX0VMRU1FTlQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxudmFyIFRZUEVfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xuXG52YXIgcm91bmQgPSBNYXRoLnJvdW5kO1xudmFyIGFicyA9IE1hdGguYWJzO1xudmFyIG5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIHNldCBhIHRpbWVvdXQgd2l0aCBhIGdpdmVuIHNjb3BlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBzZXRUaW1lb3V0Q29udGV4dChmbiwgdGltZW91dCwgY29udGV4dCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGJpbmRGbihmbiwgY29udGV4dCksIHRpbWVvdXQpO1xufVxuXG4vKipcbiAqIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSwgd2Ugd2FudCB0byBleGVjdXRlIHRoZSBmbiBvbiBlYWNoIGVudHJ5XG4gKiBpZiBpdCBhaW50IGFuIGFycmF5IHdlIGRvbid0IHdhbnQgdG8gZG8gYSB0aGluZy5cbiAqIHRoaXMgaXMgdXNlZCBieSBhbGwgdGhlIG1ldGhvZHMgdGhhdCBhY2NlcHQgYSBzaW5nbGUgYW5kIGFycmF5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfEFycmF5fSBhcmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBmblxuICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0XVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGludm9rZUFycmF5QXJnKGFyZywgZm4sIGNvbnRleHQpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgIGVhY2goYXJnLCBjb250ZXh0W2ZuXSwgY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogd2FsayBvYmplY3RzIGFuZCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICovXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgaTtcblxuICAgIGlmICghb2JqKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAob2JqLmZvckVhY2gpIHtcbiAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG9iai5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpIGluIG9iaikge1xuICAgICAgICAgICAgb2JqLmhhc093blByb3BlcnR5KGkpICYmIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIHdyYXAgYSBtZXRob2Qgd2l0aCBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgYW5kIHN0YWNrIHRyYWNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyB0aGUgc3VwcGxpZWQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBkZXByZWNhdGUobWV0aG9kLCBuYW1lLCBtZXNzYWdlKSB7XG4gICAgdmFyIGRlcHJlY2F0aW9uTWVzc2FnZSA9ICdERVBSRUNBVEVEIE1FVEhPRDogJyArIG5hbWUgKyAnXFxuJyArIG1lc3NhZ2UgKyAnIEFUIFxcbic7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcignZ2V0LXN0YWNrLXRyYWNlJyk7XG4gICAgICAgIHZhciBzdGFjayA9IGUgJiYgZS5zdGFjayA/IGUuc3RhY2sucmVwbGFjZSgvXlteXFwoXSs/W1xcbiRdL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzK2F0XFxzKy9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXk9iamVjdC48YW5vbnltb3VzPlxccypcXCgvZ20sICd7YW5vbnltb3VzfSgpQCcpIDogJ1Vua25vd24gU3RhY2sgVHJhY2UnO1xuXG4gICAgICAgIHZhciBsb2cgPSB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUud2FybiB8fCB3aW5kb3cuY29uc29sZS5sb2cpO1xuICAgICAgICBpZiAobG9nKSB7XG4gICAgICAgICAgICBsb2cuY2FsbCh3aW5kb3cuY29uc29sZSwgZGVwcmVjYXRpb25NZXNzYWdlLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHsuLi5PYmplY3R9IG9iamVjdHNfdG9fYXNzaWduXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0YXJnZXRcbiAqL1xudmFyIGFzc2lnbjtcbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFttZXJnZT1mYWxzZV1cbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIGV4dGVuZCA9IGRlcHJlY2F0ZShmdW5jdGlvbiBleHRlbmQoZGVzdCwgc3JjLCBtZXJnZSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc3JjKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBrZXlzLmxlbmd0aCkge1xuICAgICAgICBpZiAoIW1lcmdlIHx8IChtZXJnZSAmJiBkZXN0W2tleXNbaV1dID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICBkZXN0W2tleXNbaV1dID0gc3JjW2tleXNbaV1dO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG59LCAnZXh0ZW5kJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBtZXJnZSB0aGUgdmFsdWVzIGZyb20gc3JjIGluIHRoZSBkZXN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIHRoYXQgZXhpc3QgaW4gZGVzdCB3aWxsIG5vdCBiZSBvdmVyd3JpdHRlbiBieSBzcmNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBtZXJnZSA9IGRlcHJlY2F0ZShmdW5jdGlvbiBtZXJnZShkZXN0LCBzcmMpIHtcbiAgICByZXR1cm4gZXh0ZW5kKGRlc3QsIHNyYywgdHJ1ZSk7XG59LCAnbWVyZ2UnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIHNpbXBsZSBjbGFzcyBpbmhlcml0YW5jZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGJhc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllc11cbiAqL1xuZnVuY3Rpb24gaW5oZXJpdChjaGlsZCwgYmFzZSwgcHJvcGVydGllcykge1xuICAgIHZhciBiYXNlUCA9IGJhc2UucHJvdG90eXBlLFxuICAgICAgICBjaGlsZFA7XG5cbiAgICBjaGlsZFAgPSBjaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGJhc2VQKTtcbiAgICBjaGlsZFAuY29uc3RydWN0b3IgPSBjaGlsZDtcbiAgICBjaGlsZFAuX3N1cGVyID0gYmFzZVA7XG5cbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICBhc3NpZ24oY2hpbGRQLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG59XG5cbi8qKlxuICogc2ltcGxlIGZ1bmN0aW9uIGJpbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBiaW5kRm4oZm4sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYm91bmRGbigpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBsZXQgYSBib29sZWFuIHZhbHVlIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IG11c3QgcmV0dXJuIGEgYm9vbGVhblxuICogdGhpcyBmaXJzdCBpdGVtIGluIGFyZ3Mgd2lsbCBiZSB1c2VkIGFzIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IHZhbFxuICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gYm9vbE9yRm4odmFsLCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiB2YWwgPT0gVFlQRV9GVU5DVElPTikge1xuICAgICAgICByZXR1cm4gdmFsLmFwcGx5KGFyZ3MgPyBhcmdzWzBdIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogdXNlIHRoZSB2YWwyIHdoZW4gdmFsMSBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSB7Kn0gdmFsMVxuICogQHBhcmFtIHsqfSB2YWwyXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gaWZVbmRlZmluZWQodmFsMSwgdmFsMikge1xuICAgIHJldHVybiAodmFsMSA9PT0gdW5kZWZpbmVkKSA/IHZhbDIgOiB2YWwxO1xufVxuXG4vKipcbiAqIGFkZEV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiByZW1vdmVFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIG5vZGUgaXMgaW4gdGhlIGdpdmVuIHBhcmVudFxuICogQG1ldGhvZCBoYXNQYXJlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHJldHVybiB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaGFzUGFyZW50KG5vZGUsIHBhcmVudCkge1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHNtYWxsIGluZGV4T2Ygd3JhcHBlclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBpblN0cihzdHIsIGZpbmQpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2YoZmluZCkgPiAtMTtcbn1cblxuLyoqXG4gKiBzcGxpdCBzdHJpbmcgb24gd2hpdGVzcGFjZVxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybnMge0FycmF5fSB3b3Jkc1xuICovXG5mdW5jdGlvbiBzcGxpdFN0cihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5zcGxpdCgvXFxzKy9nKTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgYXJyYXkgY29udGFpbnMgdGhlIG9iamVjdCB1c2luZyBpbmRleE9mIG9yIGEgc2ltcGxlIHBvbHlGaWxsXG4gKiBAcGFyYW0ge0FycmF5fSBzcmNcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcGFyYW0ge1N0cmluZ30gW2ZpbmRCeUtleV1cbiAqIEByZXR1cm4ge0Jvb2xlYW58TnVtYmVyfSBmYWxzZSB3aGVuIG5vdCBmb3VuZCwgb3IgdGhlIGluZGV4XG4gKi9cbmZ1bmN0aW9uIGluQXJyYXkoc3JjLCBmaW5kLCBmaW5kQnlLZXkpIHtcbiAgICBpZiAoc3JjLmluZGV4T2YgJiYgIWZpbmRCeUtleSkge1xuICAgICAgICByZXR1cm4gc3JjLmluZGV4T2YoZmluZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICgoZmluZEJ5S2V5ICYmIHNyY1tpXVtmaW5kQnlLZXldID09IGZpbmQpIHx8ICghZmluZEJ5S2V5ICYmIHNyY1tpXSA9PT0gZmluZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufVxuXG4vKipcbiAqIGNvbnZlcnQgYXJyYXktbGlrZSBvYmplY3RzIHRvIHJlYWwgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaiwgMCk7XG59XG5cbi8qKlxuICogdW5pcXVlIGFycmF5IHdpdGggb2JqZWN0cyBiYXNlZCBvbiBhIGtleSAobGlrZSAnaWQnKSBvciBqdXN0IGJ5IHRoZSBhcnJheSdzIHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBzcmMgW3tpZDoxfSx7aWQ6Mn0se2lkOjF9XVxuICogQHBhcmFtIHtTdHJpbmd9IFtrZXldXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzb3J0PUZhbHNlXVxuICogQHJldHVybnMge0FycmF5fSBbe2lkOjF9LHtpZDoyfV1cbiAqL1xuZnVuY3Rpb24gdW5pcXVlQXJyYXkoc3JjLCBrZXksIHNvcnQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IHNyYy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbCA9IGtleSA/IHNyY1tpXVtrZXldIDogc3JjW2ldO1xuICAgICAgICBpZiAoaW5BcnJheSh2YWx1ZXMsIHZhbCkgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goc3JjW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaV0gPSB2YWw7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc29ydChmdW5jdGlvbiBzb3J0VW5pcXVlQXJyYXkoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhW2tleV0gPiBiW2tleV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG4vKipcbiAqIGdldCB0aGUgcHJlZml4ZWQgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHJldHVybnMge1N0cmluZ3xVbmRlZmluZWR9IHByZWZpeGVkXG4gKi9cbmZ1bmN0aW9uIHByZWZpeGVkKG9iaiwgcHJvcGVydHkpIHtcbiAgICB2YXIgcHJlZml4LCBwcm9wO1xuICAgIHZhciBjYW1lbFByb3AgPSBwcm9wZXJ0eVswXS50b1VwcGVyQ2FzZSgpICsgcHJvcGVydHkuc2xpY2UoMSk7XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBWRU5ET1JfUFJFRklYRVMubGVuZ3RoKSB7XG4gICAgICAgIHByZWZpeCA9IFZFTkRPUl9QUkVGSVhFU1tpXTtcbiAgICAgICAgcHJvcCA9IChwcmVmaXgpID8gcHJlZml4ICsgY2FtZWxQcm9wIDogcHJvcGVydHk7XG5cbiAgICAgICAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvcDtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogZ2V0IGEgdW5pcXVlIGlkXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB1bmlxdWVJZFxuICovXG52YXIgX3VuaXF1ZUlkID0gMTtcbmZ1bmN0aW9uIHVuaXF1ZUlkKCkge1xuICAgIHJldHVybiBfdW5pcXVlSWQrKztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHdpbmRvdyBvYmplY3Qgb2YgYW4gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0RvY3VtZW50Vmlld3xXaW5kb3d9XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvd0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgIHZhciBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZWxlbWVudDtcbiAgICByZXR1cm4gKGRvYy5kZWZhdWx0VmlldyB8fCBkb2MucGFyZW50V2luZG93IHx8IHdpbmRvdyk7XG59XG5cbnZhciBNT0JJTEVfUkVHRVggPSAvbW9iaWxlfHRhYmxldHxpcChhZHxob25lfG9kKXxhbmRyb2lkL2k7XG5cbnZhciBTVVBQT1JUX1RPVUNIID0gKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyk7XG52YXIgU1VQUE9SVF9QT0lOVEVSX0VWRU5UUyA9IHByZWZpeGVkKHdpbmRvdywgJ1BvaW50ZXJFdmVudCcpICE9PSB1bmRlZmluZWQ7XG52YXIgU1VQUE9SVF9PTkxZX1RPVUNIID0gU1VQUE9SVF9UT1VDSCAmJiBNT0JJTEVfUkVHRVgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxudmFyIElOUFVUX1RZUEVfVE9VQ0ggPSAndG91Y2gnO1xudmFyIElOUFVUX1RZUEVfUEVOID0gJ3Blbic7XG52YXIgSU5QVVRfVFlQRV9NT1VTRSA9ICdtb3VzZSc7XG52YXIgSU5QVVRfVFlQRV9LSU5FQ1QgPSAna2luZWN0JztcblxudmFyIENPTVBVVEVfSU5URVJWQUwgPSAyNTtcblxudmFyIElOUFVUX1NUQVJUID0gMTtcbnZhciBJTlBVVF9NT1ZFID0gMjtcbnZhciBJTlBVVF9FTkQgPSA0O1xudmFyIElOUFVUX0NBTkNFTCA9IDg7XG5cbnZhciBESVJFQ1RJT05fTk9ORSA9IDE7XG52YXIgRElSRUNUSU9OX0xFRlQgPSAyO1xudmFyIERJUkVDVElPTl9SSUdIVCA9IDQ7XG52YXIgRElSRUNUSU9OX1VQID0gODtcbnZhciBESVJFQ1RJT05fRE9XTiA9IDE2O1xuXG52YXIgRElSRUNUSU9OX0hPUklaT05UQUwgPSBESVJFQ1RJT05fTEVGVCB8IERJUkVDVElPTl9SSUdIVDtcbnZhciBESVJFQ1RJT05fVkVSVElDQUwgPSBESVJFQ1RJT05fVVAgfCBESVJFQ1RJT05fRE9XTjtcbnZhciBESVJFQ1RJT05fQUxMID0gRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUw7XG5cbnZhciBQUk9QU19YWSA9IFsneCcsICd5J107XG52YXIgUFJPUFNfQ0xJRU5UX1hZID0gWydjbGllbnRYJywgJ2NsaWVudFknXTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0lucHV0fVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIElucHV0KG1hbmFnZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMuZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICB0aGlzLnRhcmdldCA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dFRhcmdldDtcblxuICAgIC8vIHNtYWxsZXIgd3JhcHBlciBhcm91bmQgdGhlIGhhbmRsZXIsIGZvciB0aGUgc2NvcGUgYW5kIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBtYW5hZ2VyLFxuICAgIC8vIHNvIHdoZW4gZGlzYWJsZWQgdGhlIGlucHV0IGV2ZW50cyBhcmUgY29tcGxldGVseSBieXBhc3NlZC5cbiAgICB0aGlzLmRvbUhhbmRsZXIgPSBmdW5jdGlvbihldikge1xuICAgICAgICBpZiAoYm9vbE9yRm4obWFuYWdlci5vcHRpb25zLmVuYWJsZSwgW21hbmFnZXJdKSkge1xuICAgICAgICAgICAgc2VsZi5oYW5kbGVyKGV2KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcblxufVxuXG5JbnB1dC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2hvdWxkIGhhbmRsZSB0aGUgaW5wdXRFdmVudCBkYXRhIGFuZCB0cmlnZ2VyIHRoZSBjYWxsYmFja1xuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIGFkZEV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIHRoZSBldmVudHNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5ldkVsICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMuZWxlbWVudCwgdGhpcy5ldkVsLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2VGFyZ2V0ICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMudGFyZ2V0LCB0aGlzLmV2VGFyZ2V0LCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgICAgICB0aGlzLmV2V2luICYmIHJlbW92ZUV2ZW50TGlzdGVuZXJzKGdldFdpbmRvd0ZvckVsZW1lbnQodGhpcy5lbGVtZW50KSwgdGhpcy5ldldpbiwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBjYWxsZWQgYnkgdGhlIE1hbmFnZXIgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0SW5zdGFuY2UobWFuYWdlcikge1xuICAgIHZhciBUeXBlO1xuICAgIHZhciBpbnB1dENsYXNzID0gbWFuYWdlci5vcHRpb25zLmlucHV0Q2xhc3M7XG5cbiAgICBpZiAoaW5wdXRDbGFzcykge1xuICAgICAgICBUeXBlID0gaW5wdXRDbGFzcztcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgICAgVHlwZSA9IFBvaW50ZXJFdmVudElucHV0O1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9PTkxZX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaElucHV0O1xuICAgIH0gZWxzZSBpZiAoIVNVUFBPUlRfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IE1vdXNlSW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoTW91c2VJbnB1dDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyAoVHlwZSkobWFuYWdlciwgaW5wdXRIYW5kbGVyKTtcbn1cblxuLyoqXG4gKiBoYW5kbGUgaW5wdXQgZXZlbnRzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBpbnB1dEhhbmRsZXIobWFuYWdlciwgZXZlbnRUeXBlLCBpbnB1dCkge1xuICAgIHZhciBwb2ludGVyc0xlbiA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgY2hhbmdlZFBvaW50ZXJzTGVuID0gaW5wdXQuY2hhbmdlZFBvaW50ZXJzLmxlbmd0aDtcbiAgICB2YXIgaXNGaXJzdCA9IChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcbiAgICB2YXIgaXNGaW5hbCA9IChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAocG9pbnRlcnNMZW4gLSBjaGFuZ2VkUG9pbnRlcnNMZW4gPT09IDApKTtcblxuICAgIGlucHV0LmlzRmlyc3QgPSAhIWlzRmlyc3Q7XG4gICAgaW5wdXQuaXNGaW5hbCA9ICEhaXNGaW5hbDtcblxuICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIG1hbmFnZXIuc2Vzc2lvbiA9IHt9O1xuICAgIH1cblxuICAgIC8vIHNvdXJjZSBldmVudCBpcyB0aGUgbm9ybWFsaXplZCB2YWx1ZSBvZiB0aGUgZG9tRXZlbnRzXG4gICAgLy8gbGlrZSAndG91Y2hzdGFydCwgbW91c2V1cCwgcG9pbnRlcmRvd24nXG4gICAgaW5wdXQuZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuXG4gICAgLy8gY29tcHV0ZSBzY2FsZSwgcm90YXRpb24gZXRjXG4gICAgY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCk7XG5cbiAgICAvLyBlbWl0IHNlY3JldCBldmVudFxuICAgIG1hbmFnZXIuZW1pdCgnaGFtbWVyLmlucHV0JywgaW5wdXQpO1xuXG4gICAgbWFuYWdlci5yZWNvZ25pemUoaW5wdXQpO1xuICAgIG1hbmFnZXIuc2Vzc2lvbi5wcmV2SW5wdXQgPSBpbnB1dDtcbn1cblxuLyoqXG4gKiBleHRlbmQgdGhlIGRhdGEgd2l0aCBzb21lIHVzYWJsZSBwcm9wZXJ0aWVzIGxpa2Ugc2NhbGUsIHJvdGF0ZSwgdmVsb2NpdHkgZXRjXG4gKiBAcGFyYW0ge09iamVjdH0gbWFuYWdlclxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpIHtcbiAgICB2YXIgc2Vzc2lvbiA9IG1hbmFnZXIuc2Vzc2lvbjtcbiAgICB2YXIgcG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycztcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBzdG9yZSB0aGUgZmlyc3QgaW5wdXQgdG8gY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBhbmQgZGlyZWN0aW9uXG4gICAgaWYgKCFzZXNzaW9uLmZpcnN0SW5wdXQpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdElucHV0ID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH1cblxuICAgIC8vIHRvIGNvbXB1dGUgc2NhbGUgYW5kIHJvdGF0aW9uIHdlIG5lZWQgdG8gc3RvcmUgdGhlIG11bHRpcGxlIHRvdWNoZXNcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPiAxICYmICFzZXNzaW9uLmZpcnN0TXVsdGlwbGUpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgc2Vzc2lvbi5maXJzdE11bHRpcGxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0SW5wdXQgPSBzZXNzaW9uLmZpcnN0SW5wdXQ7XG4gICAgdmFyIGZpcnN0TXVsdGlwbGUgPSBzZXNzaW9uLmZpcnN0TXVsdGlwbGU7XG4gICAgdmFyIG9mZnNldENlbnRlciA9IGZpcnN0TXVsdGlwbGUgPyBmaXJzdE11bHRpcGxlLmNlbnRlciA6IGZpcnN0SW5wdXQuY2VudGVyO1xuXG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlciA9IGdldENlbnRlcihwb2ludGVycyk7XG4gICAgaW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgaW5wdXQuZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gZmlyc3RJbnB1dC50aW1lU3RhbXA7XG5cbiAgICBpbnB1dC5hbmdsZSA9IGdldEFuZ2xlKG9mZnNldENlbnRlciwgY2VudGVyKTtcbiAgICBpbnB1dC5kaXN0YW5jZSA9IGdldERpc3RhbmNlKG9mZnNldENlbnRlciwgY2VudGVyKTtcblxuICAgIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KTtcbiAgICBpbnB1dC5vZmZzZXREaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuXG4gICAgdmFyIG92ZXJhbGxWZWxvY2l0eSA9IGdldFZlbG9jaXR5KGlucHV0LmRlbHRhVGltZSwgaW5wdXQuZGVsdGFYLCBpbnB1dC5kZWx0YVkpO1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVggPSBvdmVyYWxsVmVsb2NpdHkueDtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZID0gb3ZlcmFsbFZlbG9jaXR5Lnk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5ID0gKGFicyhvdmVyYWxsVmVsb2NpdHkueCkgPiBhYnMob3ZlcmFsbFZlbG9jaXR5LnkpKSA/IG92ZXJhbGxWZWxvY2l0eS54IDogb3ZlcmFsbFZlbG9jaXR5Lnk7XG5cbiAgICBpbnB1dC5zY2FsZSA9IGZpcnN0TXVsdGlwbGUgPyBnZXRTY2FsZShmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAxO1xuICAgIGlucHV0LnJvdGF0aW9uID0gZmlyc3RNdWx0aXBsZSA/IGdldFJvdGF0aW9uKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDA7XG5cbiAgICBpbnB1dC5tYXhQb2ludGVycyA9ICFzZXNzaW9uLnByZXZJbnB1dCA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6ICgoaW5wdXQucG9pbnRlcnMubGVuZ3RoID5cbiAgICAgICAgc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogc2Vzc2lvbi5wcmV2SW5wdXQubWF4UG9pbnRlcnMpO1xuXG4gICAgY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KTtcblxuICAgIC8vIGZpbmQgdGhlIGNvcnJlY3QgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoaGFzUGFyZW50KGlucHV0LnNyY0V2ZW50LnRhcmdldCwgdGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSBpbnB1dC5zcmNFdmVudC50YXJnZXQ7XG4gICAgfVxuICAgIGlucHV0LnRhcmdldCA9IHRhcmdldDtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyO1xuICAgIHZhciBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldklucHV0ID0gc2Vzc2lvbi5wcmV2SW5wdXQgfHwge307XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9TVEFSVCB8fCBwcmV2SW5wdXQuZXZlbnRUeXBlID09PSBJTlBVVF9FTkQpIHtcbiAgICAgICAgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBwcmV2SW5wdXQuZGVsdGFYIHx8IDAsXG4gICAgICAgICAgICB5OiBwcmV2SW5wdXQuZGVsdGFZIHx8IDBcbiAgICAgICAgfTtcblxuICAgICAgICBvZmZzZXQgPSBzZXNzaW9uLm9mZnNldERlbHRhID0ge1xuICAgICAgICAgICAgeDogY2VudGVyLngsXG4gICAgICAgICAgICB5OiBjZW50ZXIueVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlucHV0LmRlbHRhWCA9IHByZXZEZWx0YS54ICsgKGNlbnRlci54IC0gb2Zmc2V0LngpO1xuICAgIGlucHV0LmRlbHRhWSA9IHByZXZEZWx0YS55ICsgKGNlbnRlci55IC0gb2Zmc2V0LnkpO1xufVxuXG4vKipcbiAqIHZlbG9jaXR5IGlzIGNhbGN1bGF0ZWQgZXZlcnkgeCBtc1xuICogQHBhcmFtIHtPYmplY3R9IHNlc3Npb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpIHtcbiAgICB2YXIgbGFzdCA9IHNlc3Npb24ubGFzdEludGVydmFsIHx8IGlucHV0LFxuICAgICAgICBkZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBsYXN0LnRpbWVTdGFtcCxcbiAgICAgICAgdmVsb2NpdHksIHZlbG9jaXR5WCwgdmVsb2NpdHlZLCBkaXJlY3Rpb247XG5cbiAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0NBTkNFTCAmJiAoZGVsdGFUaW1lID4gQ09NUFVURV9JTlRFUlZBTCB8fCBsYXN0LnZlbG9jaXR5ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIHZhciBkZWx0YVggPSBpbnB1dC5kZWx0YVggLSBsYXN0LmRlbHRhWDtcbiAgICAgICAgdmFyIGRlbHRhWSA9IGlucHV0LmRlbHRhWSAtIGxhc3QuZGVsdGFZO1xuXG4gICAgICAgIHZhciB2ID0gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCBkZWx0YVgsIGRlbHRhWSk7XG4gICAgICAgIHZlbG9jaXR5WCA9IHYueDtcbiAgICAgICAgdmVsb2NpdHlZID0gdi55O1xuICAgICAgICB2ZWxvY2l0eSA9IChhYnModi54KSA+IGFicyh2LnkpKSA/IHYueCA6IHYueTtcbiAgICAgICAgZGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICBzZXNzaW9uLmxhc3RJbnRlcnZhbCA9IGlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHVzZSBsYXRlc3QgdmVsb2NpdHkgaW5mbyBpZiBpdCBkb2Vzbid0IG92ZXJ0YWtlIGEgbWluaW11bSBwZXJpb2RcbiAgICAgICAgdmVsb2NpdHkgPSBsYXN0LnZlbG9jaXR5O1xuICAgICAgICB2ZWxvY2l0eVggPSBsYXN0LnZlbG9jaXR5WDtcbiAgICAgICAgdmVsb2NpdHlZID0gbGFzdC52ZWxvY2l0eVk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGxhc3QuZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGlucHV0LnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgaW5wdXQudmVsb2NpdHlYID0gdmVsb2NpdHlYO1xuICAgIGlucHV0LnZlbG9jaXR5WSA9IHZlbG9jaXR5WTtcbiAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG59XG5cbi8qKlxuICogY3JlYXRlIGEgc2ltcGxlIGNsb25lIGZyb20gdGhlIGlucHV0IHVzZWQgZm9yIHN0b3JhZ2Ugb2YgZmlyc3RJbnB1dCBhbmQgZmlyc3RNdWx0aXBsZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjbG9uZWRJbnB1dERhdGFcbiAqL1xuZnVuY3Rpb24gc2ltcGxlQ2xvbmVJbnB1dERhdGEoaW5wdXQpIHtcbiAgICAvLyBtYWtlIGEgc2ltcGxlIGNvcHkgb2YgdGhlIHBvaW50ZXJzIGJlY2F1c2Ugd2Ugd2lsbCBnZXQgYSByZWZlcmVuY2UgaWYgd2UgZG9uJ3RcbiAgICAvLyB3ZSBvbmx5IG5lZWQgY2xpZW50WFkgZm9yIHRoZSBjYWxjdWxhdGlvbnNcbiAgICB2YXIgcG9pbnRlcnMgPSBbXTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBpbnB1dC5wb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgcG9pbnRlcnNbaV0gPSB7XG4gICAgICAgICAgICBjbGllbnRYOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRYKSxcbiAgICAgICAgICAgIGNsaWVudFk6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0aW1lU3RhbXA6IG5vdygpLFxuICAgICAgICBwb2ludGVyczogcG9pbnRlcnMsXG4gICAgICAgIGNlbnRlcjogZ2V0Q2VudGVyKHBvaW50ZXJzKSxcbiAgICAgICAgZGVsdGFYOiBpbnB1dC5kZWx0YVgsXG4gICAgICAgIGRlbHRhWTogaW5wdXQuZGVsdGFZXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGNlbnRlciBvZiBhbGwgdGhlIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludGVyc1xuICogQHJldHVybiB7T2JqZWN0fSBjZW50ZXIgY29udGFpbnMgYHhgIGFuZCBgeWAgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBnZXRDZW50ZXIocG9pbnRlcnMpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW5ndGggPSBwb2ludGVycy5sZW5ndGg7XG5cbiAgICAvLyBubyBuZWVkIHRvIGxvb3Agd2hlbiBvbmx5IG9uZSB0b3VjaFxuICAgIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WCksXG4gICAgICAgICAgICB5OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgcG9pbnRlcnNMZW5ndGgpIHtcbiAgICAgICAgeCArPSBwb2ludGVyc1tpXS5jbGllbnRYO1xuICAgICAgICB5ICs9IHBvaW50ZXJzW2ldLmNsaWVudFk7XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiByb3VuZCh4IC8gcG9pbnRlcnNMZW5ndGgpLFxuICAgICAgICB5OiByb3VuZCh5IC8gcG9pbnRlcnNMZW5ndGgpXG4gICAgfTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHZlbG9jaXR5IGJldHdlZW4gdHdvIHBvaW50cy4gdW5pdCBpcyBpbiBweCBwZXIgbXMuXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFUaW1lXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge09iamVjdH0gdmVsb2NpdHkgYHhgIGFuZCBgeWBcbiAqL1xuZnVuY3Rpb24gZ2V0VmVsb2NpdHkoZGVsdGFUaW1lLCB4LCB5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCAvIGRlbHRhVGltZSB8fCAwLFxuICAgICAgICB5OiB5IC8gZGVsdGFUaW1lIHx8IDBcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgZGlyZWN0aW9uIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpcmVjdGlvblxuICovXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24oeCwgeSkge1xuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgIHJldHVybiBESVJFQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICBpZiAoYWJzKHgpID49IGFicyh5KSkge1xuICAgICAgICByZXR1cm4geCA8IDAgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICB9XG4gICAgcmV0dXJuIHkgPCAwID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhYnNvbHV0ZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMSB7eCwgeX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBwMiB7eCwgeX1cbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gZGlzdGFuY2VcbiAqL1xuZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4ICogeCkgKyAoeSAqIHkpKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIGNvb3JkaW5hdGVzXG4gKiBAcGFyYW0ge09iamVjdH0gcDFcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMlxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBhbmdsZVxuICovXG5mdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMih5LCB4KSAqIDE4MCAvIE1hdGguUEk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSByb3RhdGlvbiBkZWdyZWVzIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHJvdGF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldFJvdGF0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0QW5nbGUoZW5kWzFdLCBlbmRbMF0sIFBST1BTX0NMSUVOVF9YWSkgKyBnZXRBbmdsZShzdGFydFsxXSwgc3RhcnRbMF0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBzY2FsZSBmYWN0b3IgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIG5vIHNjYWxlIGlzIDEsIGFuZCBnb2VzIGRvd24gdG8gMCB3aGVuIHBpbmNoZWQgdG9nZXRoZXIsIGFuZCBiaWdnZXIgd2hlbiBwaW5jaGVkIG91dFxuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSBzY2FsZVxuICovXG5mdW5jdGlvbiBnZXRTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdLCBQUk9QU19DTElFTlRfWFkpIC8gZ2V0RGlzdGFuY2Uoc3RhcnRbMF0sIHN0YXJ0WzFdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG52YXIgTU9VU0VfSU5QVVRfTUFQID0ge1xuICAgIG1vdXNlZG93bjogSU5QVVRfU1RBUlQsXG4gICAgbW91c2Vtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIG1vdXNldXA6IElOUFVUX0VORFxufTtcblxudmFyIE1PVVNFX0VMRU1FTlRfRVZFTlRTID0gJ21vdXNlZG93bic7XG52YXIgTU9VU0VfV0lORE9XX0VWRU5UUyA9ICdtb3VzZW1vdmUgbW91c2V1cCc7XG5cbi8qKlxuICogTW91c2UgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIE1vdXNlSW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gTU9VU0VfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IE1PVVNFX1dJTkRPV19FVkVOVFM7XG5cbiAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTsgLy8gbW91c2Vkb3duIHN0YXRlXG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1FaGFuZGxlcihldikge1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gTU9VU0VfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIG9uIHN0YXJ0IHdlIHdhbnQgdG8gaGF2ZSB0aGUgbGVmdCBtb3VzZSBidXR0b24gZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgZXYuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX01PVkUgJiYgZXYud2hpY2ggIT09IDEpIHtcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9IElOUFVUX0VORDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoIXRoaXMucHJlc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX01PVVNFLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG52YXIgUE9JTlRFUl9JTlBVVF9NQVAgPSB7XG4gICAgcG9pbnRlcmRvd246IElOUFVUX1NUQVJULFxuICAgIHBvaW50ZXJtb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHBvaW50ZXJ1cDogSU5QVVRfRU5ELFxuICAgIHBvaW50ZXJjYW5jZWw6IElOUFVUX0NBTkNFTCxcbiAgICBwb2ludGVyb3V0OiBJTlBVVF9DQU5DRUxcbn07XG5cbi8vIGluIElFMTAgdGhlIHBvaW50ZXIgdHlwZXMgaXMgZGVmaW5lZCBhcyBhbiBlbnVtXG52YXIgSUUxMF9QT0lOVEVSX1RZUEVfRU5VTSA9IHtcbiAgICAyOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgIDM6IElOUFVUX1RZUEVfUEVOLFxuICAgIDQ6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgNTogSU5QVVRfVFlQRV9LSU5FQ1QgLy8gc2VlIGh0dHBzOi8vdHdpdHRlci5jb20vamFjb2Jyb3NzaS9zdGF0dXMvNDgwNTk2NDM4NDg5ODkwODE2XG59O1xuXG52YXIgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdwb2ludGVyZG93bic7XG52YXIgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ3BvaW50ZXJtb3ZlIHBvaW50ZXJ1cCBwb2ludGVyY2FuY2VsJztcblxuLy8gSUUxMCBoYXMgcHJlZml4ZWQgc3VwcG9ydCwgYW5kIGNhc2Utc2Vuc2l0aXZlXG5pZiAod2luZG93Lk1TUG9pbnRlckV2ZW50ICYmICF3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG4gICAgUE9JTlRFUl9FTEVNRU5UX0VWRU5UUyA9ICdNU1BvaW50ZXJEb3duJztcbiAgICBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAnTVNQb2ludGVyTW92ZSBNU1BvaW50ZXJVcCBNU1BvaW50ZXJDYW5jZWwnO1xufVxuXG4vKipcbiAqIFBvaW50ZXIgZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFBvaW50ZXJFdmVudElucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IFBPSU5URVJfRUxFTUVOVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFBPSU5URVJfV0lORE9XX0VWRU5UUztcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnN0b3JlID0gKHRoaXMubWFuYWdlci5zZXNzaW9uLnBvaW50ZXJFdmVudHMgPSBbXSk7XG59XG5cbmluaGVyaXQoUG9pbnRlckV2ZW50SW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFBFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgc3RvcmUgPSB0aGlzLnN0b3JlO1xuICAgICAgICB2YXIgcmVtb3ZlUG9pbnRlciA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBldmVudFR5cGVOb3JtYWxpemVkID0gZXYudHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ21zJywgJycpO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gUE9JTlRFUl9JTlBVVF9NQVBbZXZlbnRUeXBlTm9ybWFsaXplZF07XG4gICAgICAgIHZhciBwb2ludGVyVHlwZSA9IElFMTBfUE9JTlRFUl9UWVBFX0VOVU1bZXYucG9pbnRlclR5cGVdIHx8IGV2LnBvaW50ZXJUeXBlO1xuXG4gICAgICAgIHZhciBpc1RvdWNoID0gKHBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpO1xuXG4gICAgICAgIC8vIGdldCBpbmRleCBvZiB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHZhciBzdG9yZUluZGV4ID0gaW5BcnJheShzdG9yZSwgZXYucG9pbnRlcklkLCAncG9pbnRlcklkJyk7XG5cbiAgICAgICAgLy8gc3RhcnQgYW5kIG1vdXNlIG11c3QgYmUgZG93blxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKGV2LmJ1dHRvbiA9PT0gMCB8fCBpc1RvdWNoKSkge1xuICAgICAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgc3RvcmUucHVzaChldik7XG4gICAgICAgICAgICAgICAgc3RvcmVJbmRleCA9IHN0b3JlLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIHJlbW92ZVBvaW50ZXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXQgbm90IGZvdW5kLCBzbyB0aGUgcG9pbnRlciBoYXNuJ3QgYmVlbiBkb3duIChzbyBpdCdzIHByb2JhYmx5IGEgaG92ZXIpXG4gICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgc3RvcmVbc3RvcmVJbmRleF0gPSBldjtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogc3RvcmUsXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogcG9pbnRlclR5cGUsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZVBvaW50ZXIpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIHRoZSBzdG9yZVxuICAgICAgICAgICAgc3RvcmUuc3BsaWNlKHN0b3JlSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbnZhciBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0JztcbnZhciBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogVG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFNpbmdsZVRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBTSU5HTEVfVE9VQ0hfV0lORE9XX0VWRU5UUztcbiAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU2luZ2xlVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBURWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBTSU5HTEVfVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuXG4gICAgICAgIC8vIHNob3VsZCB3ZSBoYW5kbGUgdGhlIHRvdWNoIGV2ZW50cz9cbiAgICAgICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaGVzID0gbm9ybWFsaXplU2luZ2xlVG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcblxuICAgICAgICAvLyB3aGVuIGRvbmUsIHJlc2V0IHRoZSBzdGFydGVkIHN0YXRlXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgdG91Y2hlc1swXS5sZW5ndGggLSB0b3VjaGVzWzFdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplU2luZ2xlVG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGwgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciBjaGFuZ2VkID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyk7XG5cbiAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIGFsbCA9IHVuaXF1ZUFycmF5KGFsbC5jb25jYXQoY2hhbmdlZCksICdpZGVudGlmaWVyJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFthbGwsIGNoYW5nZWRdO1xufVxuXG52YXIgVE9VQ0hfSU5QVVRfTUFQID0ge1xuICAgIHRvdWNoc3RhcnQ6IElOUFVUX1NUQVJULFxuICAgIHRvdWNobW92ZTogSU5QVVRfTU9WRSxcbiAgICB0b3VjaGVuZDogSU5QVVRfRU5ELFxuICAgIHRvdWNoY2FuY2VsOiBJTlBVVF9DQU5DRUxcbn07XG5cbnZhciBUT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBNdWx0aS11c2VyIHRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBUT1VDSF9UQVJHRVRfRVZFTlRTO1xuICAgIHRoaXMudGFyZ2V0SWRzID0ge307XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTVRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFRPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBnZXRUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuICAgICAgICBpZiAoIXRvdWNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBnZXRUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbFRvdWNoZXMgPSB0b0FycmF5KGV2LnRvdWNoZXMpO1xuICAgIHZhciB0YXJnZXRJZHMgPSB0aGlzLnRhcmdldElkcztcblxuICAgIC8vIHdoZW4gdGhlcmUgaXMgb25seSBvbmUgdG91Y2gsIHRoZSBwcm9jZXNzIGNhbiBiZSBzaW1wbGlmaWVkXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfU1RBUlQgfCBJTlBVVF9NT1ZFKSAmJiBhbGxUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0YXJnZXRJZHNbYWxsVG91Y2hlc1swXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBbYWxsVG91Y2hlcywgYWxsVG91Y2hlc107XG4gICAgfVxuXG4gICAgdmFyIGksXG4gICAgICAgIHRhcmdldFRvdWNoZXMsXG4gICAgICAgIGNoYW5nZWRUb3VjaGVzID0gdG9BcnJheShldi5jaGFuZ2VkVG91Y2hlcyksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzID0gW10sXG4gICAgICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuXG4gICAgLy8gZ2V0IHRhcmdldCB0b3VjaGVzIGZyb20gdG91Y2hlc1xuICAgIHRhcmdldFRvdWNoZXMgPSBhbGxUb3VjaGVzLmZpbHRlcihmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICByZXR1cm4gaGFzUGFyZW50KHRvdWNoLnRhcmdldCwgdGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIC8vIGNvbGxlY3QgdG91Y2hlc1xuICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0YXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGFyZ2V0SWRzW3RhcmdldFRvdWNoZXNbaV0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGNoYW5nZWQgdG91Y2hlcyB0byBvbmx5IGNvbnRhaW4gdG91Y2hlcyB0aGF0IGV4aXN0IGluIHRoZSBjb2xsZWN0ZWQgdGFyZ2V0IGlkc1xuICAgIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl0pIHtcbiAgICAgICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzLnB1c2goY2hhbmdlZFRvdWNoZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYW51cCByZW1vdmVkIHRvdWNoZXNcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgZGVsZXRlIHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICAgIC8vIG1lcmdlIHRhcmdldFRvdWNoZXMgd2l0aCBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyBzbyBpdCBjb250YWlucyBBTEwgdG91Y2hlcywgaW5jbHVkaW5nICdlbmQnIGFuZCAnY2FuY2VsJ1xuICAgICAgICB1bmlxdWVBcnJheSh0YXJnZXRUb3VjaGVzLmNvbmNhdChjaGFuZ2VkVGFyZ2V0VG91Y2hlcyksICdpZGVudGlmaWVyJywgdHJ1ZSksXG4gICAgICAgIGNoYW5nZWRUYXJnZXRUb3VjaGVzXG4gICAgXTtcbn1cblxuLyoqXG4gKiBDb21iaW5lZCB0b3VjaCBhbmQgbW91c2UgaW5wdXRcbiAqXG4gKiBUb3VjaCBoYXMgYSBoaWdoZXIgcHJpb3JpdHkgdGhlbiBtb3VzZSwgYW5kIHdoaWxlIHRvdWNoaW5nIG5vIG1vdXNlIGV2ZW50cyBhcmUgYWxsb3dlZC5cbiAqIFRoaXMgYmVjYXVzZSB0b3VjaCBkZXZpY2VzIGFsc28gZW1pdCBtb3VzZSBldmVudHMgd2hpbGUgZG9pbmcgYSB0b3VjaC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cblxudmFyIERFRFVQX1RJTUVPVVQgPSAyNTAwO1xudmFyIERFRFVQX0RJU1RBTkNFID0gMjU7XG5cbmZ1bmN0aW9uIFRvdWNoTW91c2VJbnB1dCgpIHtcbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIGhhbmRsZXIgPSBiaW5kRm4odGhpcy5oYW5kbGVyLCB0aGlzKTtcbiAgICB0aGlzLnRvdWNoID0gbmV3IFRvdWNoSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcbiAgICB0aGlzLm1vdXNlID0gbmV3IE1vdXNlSW5wdXQodGhpcy5tYW5hZ2VyLCBoYW5kbGVyKTtcblxuICAgIHRoaXMucHJpbWFyeVRvdWNoID0gbnVsbDtcbiAgICB0aGlzLmxhc3RUb3VjaGVzID0gW107XG59XG5cbmluaGVyaXQoVG91Y2hNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBhbmQgdG91Y2ggZXZlbnRzXG4gICAgICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRFdmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBUTUVoYW5kbGVyKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgaXNUb3VjaCA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCksXG4gICAgICAgICAgICBpc01vdXNlID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX01PVVNFKTtcblxuICAgICAgICBpZiAoaXNNb3VzZSAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMuZmlyZXNUb3VjaEV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2hlbiB3ZSdyZSBpbiBhIHRvdWNoIGV2ZW50LCByZWNvcmQgdG91Y2hlcyB0byAgZGUtZHVwZSBzeW50aGV0aWMgbW91c2UgZXZlbnRcbiAgICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgICAgIHJlY29yZFRvdWNoZXMuY2FsbCh0aGlzLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTW91c2UgJiYgaXNTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGlucHV0RGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRvdWNoLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5tb3VzZS5kZXN0cm95KCk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHJlY29yZFRvdWNoZXMoZXZlbnRUeXBlLCBldmVudERhdGEpIHtcbiAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdLmlkZW50aWZpZXI7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0TGFzdFRvdWNoKGV2ZW50RGF0YSkge1xuICAgIHZhciB0b3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF07XG5cbiAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5wcmltYXJ5VG91Y2gpIHtcbiAgICAgICAgdmFyIGxhc3RUb3VjaCA9IHt4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZfTtcbiAgICAgICAgdGhpcy5sYXN0VG91Y2hlcy5wdXNoKGxhc3RUb3VjaCk7XG4gICAgICAgIHZhciBsdHMgPSB0aGlzLmxhc3RUb3VjaGVzO1xuICAgICAgICB2YXIgcmVtb3ZlTGFzdFRvdWNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGx0cy5pbmRleE9mKGxhc3RUb3VjaCk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbHRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc2V0VGltZW91dChyZW1vdmVMYXN0VG91Y2gsIERFRFVQX1RJTUVPVVQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNTeW50aGV0aWNFdmVudChldmVudERhdGEpIHtcbiAgICB2YXIgeCA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRYLCB5ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhc3RUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5sYXN0VG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoeCAtIHQueCksIGR5ID0gTWF0aC5hYnMoeSAtIHQueSk7XG4gICAgICAgIGlmIChkeCA8PSBERURVUF9ESVNUQU5DRSAmJiBkeSA8PSBERURVUF9ESVNUQU5DRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgUFJFRklYRURfVE9VQ0hfQUNUSU9OID0gcHJlZml4ZWQoVEVTVF9FTEVNRU5ULnN0eWxlLCAndG91Y2hBY3Rpb24nKTtcbnZhciBOQVRJVkVfVE9VQ0hfQUNUSU9OID0gUFJFRklYRURfVE9VQ0hfQUNUSU9OICE9PSB1bmRlZmluZWQ7XG5cbi8vIG1hZ2ljYWwgdG91Y2hBY3Rpb24gdmFsdWVcbnZhciBUT1VDSF9BQ1RJT05fQ09NUFVURSA9ICdjb21wdXRlJztcbnZhciBUT1VDSF9BQ1RJT05fQVVUTyA9ICdhdXRvJztcbnZhciBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OID0gJ21hbmlwdWxhdGlvbic7IC8vIG5vdCBpbXBsZW1lbnRlZFxudmFyIFRPVUNIX0FDVElPTl9OT05FID0gJ25vbmUnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWCA9ICdwYW4teCc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9ZID0gJ3Bhbi15JztcbnZhciBUT1VDSF9BQ1RJT05fTUFQID0gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpO1xuXG4vKipcbiAqIFRvdWNoIEFjdGlvblxuICogc2V0cyB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgb3IgdXNlcyB0aGUganMgYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVG91Y2hBY3Rpb24obWFuYWdlciwgdmFsdWUpIHtcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuc2V0KHZhbHVlKTtcbn1cblxuVG91Y2hBY3Rpb24ucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWUgb24gdGhlIGVsZW1lbnQgb3IgZW5hYmxlIHRoZSBwb2x5ZmlsbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgLy8gZmluZCBvdXQgdGhlIHRvdWNoLWFjdGlvbiBieSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgaWYgKHZhbHVlID09IFRPVUNIX0FDVElPTl9DT01QVVRFKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29tcHV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5BVElWRV9UT1VDSF9BQ1RJT04gJiYgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGUgJiYgVE9VQ0hfQUNUSU9OX01BUFt2YWx1ZV0pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlW1BSRUZJWEVEX1RPVUNIX0FDVElPTl0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGlvbnMgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICoganVzdCByZS1zZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXQodGhpcy5tYW5hZ2VyLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjb21wdXRlIHRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IGJhc2VkIG9uIHRoZSByZWNvZ25pemVyJ3Mgc2V0dGluZ3NcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgIGNvbXB1dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBlYWNoKHRoaXMubWFuYWdlci5yZWNvZ25pemVycywgZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICAgICAgaWYgKGJvb2xPckZuKHJlY29nbml6ZXIub3B0aW9ucy5lbmFibGUsIFtyZWNvZ25pemVyXSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gYWN0aW9ucy5jb25jYXQocmVjb2duaXplci5nZXRUb3VjaEFjdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zLmpvaW4oJyAnKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCBvbiBlYWNoIGlucHV0IGN5Y2xlIGFuZCBwcm92aWRlcyB0aGUgcHJldmVudGluZyBvZiB0aGUgYnJvd3NlciBiZWhhdmlvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHByZXZlbnREZWZhdWx0czogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNyY0V2ZW50ID0gaW5wdXQuc3JjRXZlbnQ7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5vZmZzZXREaXJlY3Rpb247XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvdWNoIGFjdGlvbiBkaWQgcHJldmVudGVkIG9uY2UgdGhpcyBzZXNzaW9uXG4gICAgICAgIGlmICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIGhhc05vbmUgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgICAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9ZXTtcbiAgICAgICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWF07XG5cbiAgICAgICAgaWYgKGhhc05vbmUpIHtcbiAgICAgICAgICAgIC8vZG8gbm90IHByZXZlbnQgZGVmYXVsdHMgaWYgdGhpcyBpcyBhIHRhcCBnZXN0dXJlXG5cbiAgICAgICAgICAgIHZhciBpc1RhcFBvaW50ZXIgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IDE7XG4gICAgICAgICAgICB2YXIgaXNUYXBNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgMjtcbiAgICAgICAgICAgIHZhciBpc1RhcFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IDI1MDtcblxuICAgICAgICAgICAgaWYgKGlzVGFwUG9pbnRlciAmJiBpc1RhcE1vdmVtZW50ICYmIGlzVGFwVG91Y2hUaW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICAgICAgLy8gYHBhbi14IHBhbi15YCBtZWFucyBicm93c2VyIGhhbmRsZXMgYWxsIHNjcm9sbGluZy9wYW5uaW5nLCBkbyBub3QgcHJldmVudFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc05vbmUgfHxcbiAgICAgICAgICAgIChoYXNQYW5ZICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB8fFxuICAgICAgICAgICAgKGhhc1BhblggJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmVudFNyYyhzcmNFdmVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbCBwcmV2ZW50RGVmYXVsdCB0byBwcmV2ZW50IHRoZSBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvciAoc2Nyb2xsaW5nIGluIG1vc3QgY2FzZXMpXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNyY0V2ZW50XG4gICAgICovXG4gICAgcHJldmVudFNyYzogZnVuY3Rpb24oc3JjRXZlbnQpIHtcbiAgICAgICAgdGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIHdoZW4gdGhlIHRvdWNoQWN0aW9ucyBhcmUgY29sbGVjdGVkIHRoZXkgYXJlIG5vdCBhIHZhbGlkIHZhbHVlLCBzbyB3ZSBuZWVkIHRvIGNsZWFuIHRoaW5ncyB1cC4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjbGVhblRvdWNoQWN0aW9ucyhhY3Rpb25zKSB7XG4gICAgLy8gbm9uZVxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTk9ORSkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICB2YXIgaGFzUGFuWSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWSk7XG5cbiAgICAvLyBpZiBib3RoIHBhbi14IGFuZCBwYW4teSBhcmUgc2V0IChkaWZmZXJlbnQgcmVjb2duaXplcnNcbiAgICAvLyBmb3IgZGlmZmVyZW50IGRpcmVjdGlvbnMsIGUuZy4gaG9yaXpvbnRhbCBwYW4gYnV0IHZlcnRpY2FsIHN3aXBlPylcbiAgICAvLyB3ZSBuZWVkIG5vbmUgKGFzIG90aGVyd2lzZSB3aXRoIHBhbi14IHBhbi15IGNvbWJpbmVkIG5vbmUgb2YgdGhlc2VcbiAgICAvLyByZWNvZ25pemVycyB3aWxsIHdvcmssIHNpbmNlIHRoZSBicm93c2VyIHdvdWxkIGhhbmRsZSBhbGwgcGFubmluZ1xuICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9OT05FO1xuICAgIH1cblxuICAgIC8vIHBhbi14IE9SIHBhbi15XG4gICAgaWYgKGhhc1BhblggfHwgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gaGFzUGFuWCA/IFRPVUNIX0FDVElPTl9QQU5fWCA6IFRPVUNIX0FDVElPTl9QQU5fWTtcbiAgICB9XG5cbiAgICAvLyBtYW5pcHVsYXRpb25cbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTikpIHtcbiAgICAgICAgcmV0dXJuIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT047XG4gICAgfVxuXG4gICAgcmV0dXJuIFRPVUNIX0FDVElPTl9BVVRPO1xufVxuXG5mdW5jdGlvbiBnZXRUb3VjaEFjdGlvblByb3BzKCkge1xuICAgIGlmICghTkFUSVZFX1RPVUNIX0FDVElPTikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0b3VjaE1hcCA9IHt9O1xuICAgIHZhciBjc3NTdXBwb3J0cyA9IHdpbmRvdy5DU1MgJiYgd2luZG93LkNTUy5zdXBwb3J0cztcbiAgICBbJ2F1dG8nLCAnbWFuaXB1bGF0aW9uJywgJ3Bhbi15JywgJ3Bhbi14JywgJ3Bhbi14IHBhbi15JywgJ25vbmUnXS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xuXG4gICAgICAgIC8vIElmIGNzcy5zdXBwb3J0cyBpcyBub3Qgc3VwcG9ydGVkIGJ1dCB0aGVyZSBpcyBuYXRpdmUgdG91Y2gtYWN0aW9uIGFzc3VtZSBpdCBzdXBwb3J0c1xuICAgICAgICAvLyBhbGwgdmFsdWVzLiBUaGlzIGlzIHRoZSBjYXNlIGZvciBJRSAxMCBhbmQgMTEuXG4gICAgICAgIHRvdWNoTWFwW3ZhbF0gPSBjc3NTdXBwb3J0cyA/IHdpbmRvdy5DU1Muc3VwcG9ydHMoJ3RvdWNoLWFjdGlvbicsIHZhbCkgOiB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiB0b3VjaE1hcDtcbn1cblxuLyoqXG4gKiBSZWNvZ25pemVyIGZsb3cgZXhwbGFpbmVkOyAqXG4gKiBBbGwgcmVjb2duaXplcnMgaGF2ZSB0aGUgaW5pdGlhbCBzdGF0ZSBvZiBQT1NTSUJMRSB3aGVuIGEgaW5wdXQgc2Vzc2lvbiBzdGFydHMuXG4gKiBUaGUgZGVmaW5pdGlvbiBvZiBhIGlucHV0IHNlc3Npb24gaXMgZnJvbSB0aGUgZmlyc3QgaW5wdXQgdW50aWwgdGhlIGxhc3QgaW5wdXQsIHdpdGggYWxsIGl0J3MgbW92ZW1lbnQgaW4gaXQuICpcbiAqIEV4YW1wbGUgc2Vzc2lvbiBmb3IgbW91c2UtaW5wdXQ6IG1vdXNlZG93biAtPiBtb3VzZW1vdmUgLT4gbW91c2V1cFxuICpcbiAqIE9uIGVhY2ggcmVjb2duaXppbmcgY3ljbGUgKHNlZSBNYW5hZ2VyLnJlY29nbml6ZSkgdGhlIC5yZWNvZ25pemUoKSBtZXRob2QgaXMgZXhlY3V0ZWRcbiAqIHdoaWNoIGRldGVybWluZXMgd2l0aCBzdGF0ZSBpdCBzaG91bGQgYmUuXG4gKlxuICogSWYgdGhlIHJlY29nbml6ZXIgaGFzIHRoZSBzdGF0ZSBGQUlMRUQsIENBTkNFTExFRCBvciBSRUNPR05JWkVEIChlcXVhbHMgRU5ERUQpLCBpdCBpcyByZXNldCB0b1xuICogUE9TU0lCTEUgdG8gZ2l2ZSBpdCBhbm90aGVyIGNoYW5nZSBvbiB0aGUgbmV4dCBjeWNsZS5cbiAqXG4gKiAgICAgICAgICAgICAgIFBvc3NpYmxlXG4gKiAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgKy0tLS0tKy0tLS0tLS0tLS0tLS0tLStcbiAqICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgKy0tLS0tKy0tLS0tKyAgICAgICAgICAgICAgIHxcbiAqICAgICAgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgIHxcbiAqICAgRmFpbGVkICAgICAgQ2FuY2VsbGVkICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLSstLS0tLS0rXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgUmVjb2duaXplZCAgICAgICBCZWdhblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaGFuZ2VkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRW5kZWQvUmVjb2duaXplZFxuICovXG52YXIgU1RBVEVfUE9TU0lCTEUgPSAxO1xudmFyIFNUQVRFX0JFR0FOID0gMjtcbnZhciBTVEFURV9DSEFOR0VEID0gNDtcbnZhciBTVEFURV9FTkRFRCA9IDg7XG52YXIgU1RBVEVfUkVDT0dOSVpFRCA9IFNUQVRFX0VOREVEO1xudmFyIFNUQVRFX0NBTkNFTExFRCA9IDE2O1xudmFyIFNUQVRFX0ZBSUxFRCA9IDMyO1xuXG4vKipcbiAqIFJlY29nbml6ZXJcbiAqIEV2ZXJ5IHJlY29nbml6ZXIgbmVlZHMgdG8gZXh0ZW5kIGZyb20gdGhpcyBjbGFzcy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gUmVjb2duaXplcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMuaWQgPSB1bmlxdWVJZCgpO1xuXG4gICAgdGhpcy5tYW5hZ2VyID0gbnVsbDtcblxuICAgIC8vIGRlZmF1bHQgaXMgZW5hYmxlIHRydWVcbiAgICB0aGlzLm9wdGlvbnMuZW5hYmxlID0gaWZVbmRlZmluZWQodGhpcy5vcHRpb25zLmVuYWJsZSwgdHJ1ZSk7XG5cbiAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG5cbiAgICB0aGlzLnNpbXVsdGFuZW91cyA9IHt9O1xuICAgIHRoaXMucmVxdWlyZUZhaWwgPSBbXTtcbn1cblxuUmVjb2duaXplci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7fSxcblxuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtSZWNvZ25pemVyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBhbHNvIHVwZGF0ZSB0aGUgdG91Y2hBY3Rpb24sIGluIGNhc2Ugc29tZXRoaW5nIGNoYW5nZWQgYWJvdXQgdGhlIGRpcmVjdGlvbnMvZW5hYmxlZCBzdGF0ZVxuICAgICAgICB0aGlzLm1hbmFnZXIgJiYgdGhpcy5tYW5hZ2VyLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaW11bHRhbmVvdXMgPSB0aGlzLnNpbXVsdGFuZW91cztcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoIXNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdKSB7XG4gICAgICAgICAgICBzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSA9IG90aGVyUmVjb2duaXplcjtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZWNvZ25pemVXaXRoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSBzaW11bHRhbmVvdXMgbGluay4gaXQgZG9lc250IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVjb2duaXplciBjYW4gb25seSBydW4gd2hlbiBhbiBvdGhlciBpcyBmYWlsaW5nXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIHJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlcXVpcmVGYWlsID0gdGhpcy5yZXF1aXJlRmFpbDtcbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBpZiAoaW5BcnJheShyZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJlcXVpcmVGYWlsLnB1c2gob3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgICAgIG90aGVyUmVjb2duaXplci5yZXF1aXJlRmFpbHVyZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgcmVxdWlyZUZhaWx1cmUgbGluay4gaXQgZG9lcyBub3QgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAnZHJvcFJlcXVpcmVGYWlsdXJlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHRoaXMucmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcik7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVpcmVGYWlsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGhhcyByZXF1aXJlIGZhaWx1cmVzIGJvb2xlYW5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNSZXF1aXJlRmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGggPiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgcmVjb2duaXplciBjYW4gcmVjb2duaXplIHNpbXVsdGFuZW91cyB3aXRoIGFuIG90aGVyIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNhblJlY29nbml6ZVdpdGg6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICByZXR1cm4gISF0aGlzLnNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBZb3Ugc2hvdWxkIHVzZSBgdHJ5RW1pdGAgaW5zdGVhZCBvZiBgZW1pdGAgZGlyZWN0bHkgdG8gY2hlY2tcbiAgICAgKiB0aGF0IGFsbCB0aGUgbmVlZGVkIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQgYmVmb3JlIGVtaXR0aW5nLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLm1hbmFnZXIuZW1pdChldmVudCwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gJ3BhbnN0YXJ0JyBhbmQgJ3Bhbm1vdmUnXG4gICAgICAgIGlmIChzdGF0ZSA8IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCk7IC8vIHNpbXBsZSAnZXZlbnROYW1lJyBldmVudHNcblxuICAgICAgICBpZiAoaW5wdXQuYWRkaXRpb25hbEV2ZW50KSB7IC8vIGFkZGl0aW9uYWwgZXZlbnQocGFubGVmdCwgcGFucmlnaHQsIHBpbmNoaW4sIHBpbmNob3V0Li4uKVxuICAgICAgICAgICAgZW1pdChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGFuZW5kIGFuZCBwYW5jYW5jZWxcbiAgICAgICAgaWYgKHN0YXRlID49IFNUQVRFX0VOREVEKSB7XG4gICAgICAgICAgICBlbWl0KHNlbGYub3B0aW9ucy5ldmVudCArIHN0YXRlU3RyKHN0YXRlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhhdCBhbGwgdGhlIHJlcXVpcmUgZmFpbHVyZSByZWNvZ25pemVycyBoYXMgZmFpbGVkLFxuICAgICAqIGlmIHRydWUsIGl0IGVtaXRzIGEgZ2VzdHVyZSBldmVudCxcbiAgICAgKiBvdGhlcndpc2UsIHNldHVwIHRoZSBzdGF0ZSB0byBGQUlMRUQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgdHJ5RW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FuRW1pdCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpdCdzIGZhaWxpbmcgYW55d2F5XG4gICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbiB3ZSBlbWl0P1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGNhbkVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5yZXF1aXJlRmFpbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMucmVxdWlyZUZhaWxbaV0uc3RhdGUgJiAoU1RBVEVfRkFJTEVEIHwgU1RBVEVfUE9TU0lCTEUpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIC8vIG1ha2UgYSBuZXcgY29weSBvZiB0aGUgaW5wdXREYXRhXG4gICAgICAgIC8vIHNvIHdlIGNhbiBjaGFuZ2UgdGhlIGlucHV0RGF0YSB3aXRob3V0IG1lc3NpbmcgdXAgdGhlIG90aGVyIHJlY29nbml6ZXJzXG4gICAgICAgIHZhciBpbnB1dERhdGFDbG9uZSA9IGFzc2lnbih7fSwgaW5wdXREYXRhKTtcblxuICAgICAgICAvLyBpcyBpcyBlbmFibGVkIGFuZCBhbGxvdyByZWNvZ25pemluZz9cbiAgICAgICAgaWYgKCFib29sT3JGbih0aGlzLm9wdGlvbnMuZW5hYmxlLCBbdGhpcywgaW5wdXREYXRhQ2xvbmVdKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gd2UndmUgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX1JFQ09HTklaRUQgfCBTVEFURV9DQU5DRUxMRUQgfCBTVEFURV9GQUlMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUE9TU0lCTEU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5wcm9jZXNzKGlucHV0RGF0YUNsb25lKTtcblxuICAgICAgICAvLyB0aGUgcmVjb2duaXplciBoYXMgcmVjb2duaXplZCBhIGdlc3R1cmVcbiAgICAgICAgLy8gc28gdHJpZ2dlciBhbiBldmVudFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCB8IFNUQVRFX0NBTkNFTExFRCkpIHtcbiAgICAgICAgICAgIHRoaXMudHJ5RW1pdChpbnB1dERhdGFDbG9uZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBzdGF0ZSBvZiB0aGUgcmVjb2duaXplclxuICAgICAqIHRoZSBhY3R1YWwgcmVjb2duaXppbmcgaGFwcGVucyBpbiB0aGlzIG1ldGhvZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqIEByZXR1cm5zIHtDb25zdH0gU1RBVEVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dERhdGEpIHsgfSwgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHByZWZlcnJlZCB0b3VjaC1hY3Rpb25cbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7IH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsZWQgd2hlbiB0aGUgZ2VzdHVyZSBpc24ndCBhbGxvd2VkIHRvIHJlY29nbml6ZVxuICAgICAqIGxpa2Ugd2hlbiBhbm90aGVyIGlzIGJlaW5nIHJlY29nbml6ZWQgb3IgaXQgaXMgZGlzYWJsZWRcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbigpIHsgfVxufTtcblxuLyoqXG4gKiBnZXQgYSB1c2FibGUgc3RyaW5nLCB1c2VkIGFzIGV2ZW50IHBvc3RmaXhcbiAqIEBwYXJhbSB7Q29uc3R9IHN0YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdGF0ZVxuICovXG5mdW5jdGlvbiBzdGF0ZVN0cihzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSAmIFNUQVRFX0NBTkNFTExFRCkge1xuICAgICAgICByZXR1cm4gJ2NhbmNlbCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0VOREVEKSB7XG4gICAgICAgIHJldHVybiAnZW5kJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQ0hBTkdFRCkge1xuICAgICAgICByZXR1cm4gJ21vdmUnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9CRUdBTikge1xuICAgICAgICByZXR1cm4gJ3N0YXJ0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGRpcmVjdGlvbiBjb25zIHRvIHN0cmluZ1xuICogQHBhcmFtIHtDb25zdH0gZGlyZWN0aW9uXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBkaXJlY3Rpb25TdHIoZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fRE9XTikge1xuICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9VUCkge1xuICAgICAgICByZXR1cm4gJ3VwJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fTEVGVCkge1xuICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9SSUdIVCkge1xuICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIGdldCBhIHJlY29nbml6ZXIgYnkgbmFtZSBpZiBpdCBpcyBib3VuZCB0byBhIG1hbmFnZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IG90aGVyUmVjb2duaXplclxuICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gKiBAcmV0dXJucyB7UmVjb2duaXplcn1cbiAqL1xuZnVuY3Rpb24gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHJlY29nbml6ZXIpIHtcbiAgICB2YXIgbWFuYWdlciA9IHJlY29nbml6ZXIubWFuYWdlcjtcbiAgICBpZiAobWFuYWdlcikge1xuICAgICAgICByZXR1cm4gbWFuYWdlci5nZXQob3RoZXJSZWNvZ25pemVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG90aGVyUmVjb2duaXplcjtcbn1cblxuLyoqXG4gKiBUaGlzIHJlY29nbml6ZXIgaXMganVzdCB1c2VkIGFzIGEgYmFzZSBmb3IgdGhlIHNpbXBsZSBhdHRyaWJ1dGUgcmVjb2duaXplcnMuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gQXR0clJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KEF0dHJSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNoZWNrIGlmIGl0IHRoZSByZWNvZ25pemVyIHJlY2VpdmVzIHZhbGlkIGlucHV0LCBsaWtlIGlucHV0LmRpc3RhbmNlID4gMTAuXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHJlY29nbml6ZWRcbiAgICAgKi9cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvblBvaW50ZXJzID0gdGhpcy5vcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICByZXR1cm4gb3B0aW9uUG9pbnRlcnMgPT09IDAgfHwgaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25Qb2ludGVycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgaW5wdXQgYW5kIHJldHVybiB0aGUgc3RhdGUgZm9yIHRoZSByZWNvZ25pemVyXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICogQHJldHVybnMgeyp9IFN0YXRlXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IGlucHV0LmV2ZW50VHlwZTtcblxuICAgICAgICB2YXIgaXNSZWNvZ25pemVkID0gc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0aGlzLmF0dHJUZXN0KGlucHV0KTtcblxuICAgICAgICAvLyBvbiBjYW5jZWwgaW5wdXQgYW5kIHdlJ3ZlIHJlY29nbml6ZWQgYmVmb3JlLCByZXR1cm4gU1RBVEVfQ0FOQ0VMTEVEXG4gICAgICAgIGlmIChpc1JlY29nbml6ZWQgJiYgKGV2ZW50VHlwZSAmIElOUFVUX0NBTkNFTCB8fCAhaXNWYWxpZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NBTkNFTExFRDtcbiAgICAgICAgfSBlbHNlIGlmIChpc1JlY29nbml6ZWQgfHwgaXNWYWxpZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0VOREVEO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKHN0YXRlICYgU1RBVEVfQkVHQU4pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0hBTkdFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBhblxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gYW5kIG1vdmVkIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGFuUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5wWCA9IG51bGw7XG4gICAgdGhpcy5wWSA9IG51bGw7XG59XG5cbmluaGVyaXQoUGFuUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBhblJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BhbicsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9BTExcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goVE9VQ0hfQUNUSU9OX1BBTl9YKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9LFxuXG4gICAgZGlyZWN0aW9uVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciBoYXNNb3ZlZCA9IHRydWU7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGlucHV0LmRpc3RhbmNlO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgeCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdmFyIHkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgLy8gbG9jayB0byBheGlzP1xuICAgICAgICBpZiAoIShkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHggPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeCA8IDApID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB4ICE9IHRoaXMucFg7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeSA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh5IDwgMCkgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHkgIT0gdGhpcy5wWTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICByZXR1cm4gaGFzTW92ZWQgJiYgZGlzdGFuY2UgPiBvcHRpb25zLnRocmVzaG9sZCAmJiBkaXJlY3Rpb24gJiBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBBdHRyUmVjb2duaXplci5wcm90b3R5cGUuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgICh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4gfHwgKCEodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKSAmJiB0aGlzLmRpcmVjdGlvblRlc3QoaW5wdXQpKSk7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG5cbiAgICAgICAgdGhpcy5wWCA9IGlucHV0LmRlbHRhWDtcbiAgICAgICAgdGhpcy5wWSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0LmRpcmVjdGlvbik7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGluY2hcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVycyBhcmUgbW92aW5nIHRvd2FyZCAoem9vbS1pbikgb3IgYXdheSBmcm9tIGVhY2ggb3RoZXIgKHpvb20tb3V0KS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUGluY2hSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUGluY2hSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwaW5jaCcsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnNjYWxlIC0gMSkgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgdmFyIGluT3V0ID0gaW5wdXQuc2NhbGUgPCAxID8gJ2luJyA6ICdvdXQnO1xuICAgICAgICAgICAgaW5wdXQuYWRkaXRpb25hbEV2ZW50ID0gdGhpcy5vcHRpb25zLmV2ZW50ICsgaW5PdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQcmVzc1xuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvd24gZm9yIHggbXMgd2l0aG91dCBhbnkgbW92ZW1lbnQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUHJlc3NSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG59XG5cbmluaGVyaXQoUHJlc3NSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQcmVzc1JlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3ByZXNzJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRpbWU6IDI1MSwgLy8gbWluaW1hbCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIHByZXNzZWRcbiAgICAgICAgdGhyZXNob2xkOiA5IC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fQVVUT107XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUaW1lID0gaW5wdXQuZGVsdGFUaW1lID4gb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAoIXZhbGlkTW92ZW1lbnQgfHwgIXZhbGlkUG9pbnRlcnMgfHwgKGlucHV0LmV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmICF2YWxpZFRpbWUpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICB9LCBvcHRpb25zLnRpbWUsIHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkge1xuICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0ICYmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyAndXAnLCBpbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogUm90YXRlXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlciBhcmUgbW92aW5nIGluIGEgY2lyY3VsYXIgbW90aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBSb3RhdGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoUm90YXRlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFJvdGF0ZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3JvdGF0ZScsXG4gICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgcG9pbnRlcnM6IDJcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKE1hdGguYWJzKGlucHV0LnJvdGF0aW9uKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBTd2lwZVxuICogUmVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIG1vdmluZyBmYXN0ICh2ZWxvY2l0eSksIHdpdGggZW5vdWdoIGRpc3RhbmNlIGluIHRoZSBhbGxvd2VkIGRpcmVjdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gU3dpcGVSZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoU3dpcGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgU3dpcGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdzd2lwZScsXG4gICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgIHZlbG9jaXR5OiAwLjMsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFBhblJlY29nbml6ZXIucHJvdG90eXBlLmdldFRvdWNoQWN0aW9uLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHZlbG9jaXR5O1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiAoRElSRUNUSU9OX0hPUklaT05UQUwgfCBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHlZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICBkaXJlY3Rpb24gJiBpbnB1dC5vZmZzZXREaXJlY3Rpb24gJiZcbiAgICAgICAgICAgIGlucHV0LmRpc3RhbmNlID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCAmJlxuICAgICAgICAgICAgaW5wdXQubWF4UG9pbnRlcnMgPT0gdGhpcy5vcHRpb25zLnBvaW50ZXJzICYmXG4gICAgICAgICAgICBhYnModmVsb2NpdHkpID4gdGhpcy5vcHRpb25zLnZlbG9jaXR5ICYmIGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORDtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5vZmZzZXREaXJlY3Rpb24pO1xuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb24sIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEEgdGFwIGlzIGVjb2duaXplZCB3aGVuIHRoZSBwb2ludGVyIGlzIGRvaW5nIGEgc21hbGwgdGFwL2NsaWNrLiBNdWx0aXBsZSB0YXBzIGFyZSByZWNvZ25pemVkIGlmIHRoZXkgb2NjdXJcbiAqIGJldHdlZW4gdGhlIGdpdmVuIGludGVydmFsIGFuZCBwb3NpdGlvbi4gVGhlIGRlbGF5IG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZWNvZ25pemUgbXVsdGktdGFwcyB3aXRob3V0IGZpcmluZ1xuICogYSBzaW5nbGUgdGFwLlxuICpcbiAqIFRoZSBldmVudERhdGEgZnJvbSB0aGUgZW1pdHRlZCBldmVudCBjb250YWlucyB0aGUgcHJvcGVydHkgYHRhcENvdW50YCwgd2hpY2ggY29udGFpbnMgdGhlIGFtb3VudCBvZlxuICogbXVsdGktdGFwcyBiZWluZyByZWNvZ25pemVkLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFRhcFJlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gcHJldmlvdXMgdGltZSBhbmQgY2VudGVyLFxuICAgIC8vIHVzZWQgZm9yIHRhcCBjb3VudGluZ1xuICAgIHRoaXMucFRpbWUgPSBmYWxzZTtcbiAgICB0aGlzLnBDZW50ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dCA9IG51bGw7XG4gICAgdGhpcy5jb3VudCA9IDA7XG59XG5cbmluaGVyaXQoVGFwUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGluY2hSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICd0YXAnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGFwczogMSxcbiAgICAgICAgaW50ZXJ2YWw6IDMwMCwgLy8gbWF4IHRpbWUgYmV0d2VlbiB0aGUgbXVsdGktdGFwIHRhcHNcbiAgICAgICAgdGltZTogMjUwLCAvLyBtYXggdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBkb3duIChsaWtlIGZpbmdlciBvbiB0aGUgc2NyZWVuKVxuICAgICAgICB0aHJlc2hvbGQ6IDksIC8vIGEgbWluaW1hbCBtb3ZlbWVudCBpcyBvaywgYnV0IGtlZXAgaXQgbG93XG4gICAgICAgIHBvc1RocmVzaG9sZDogMTAgLy8gYSBtdWx0aS10YXAgY2FuIGJlIGEgYml0IG9mZiB0aGUgaW5pdGlhbCBwb3NpdGlvblxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTl07XG4gICAgfSxcblxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRvdWNoVGltZSA9IGlucHV0LmRlbHRhVGltZSA8IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgaWYgKChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkgJiYgKHRoaXMuY291bnQgPT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2Ugb25seSBhbGxvdyBsaXR0bGUgbW92ZW1lbnRcbiAgICAgICAgLy8gYW5kIHdlJ3ZlIHJlYWNoZWQgYW4gZW5kIGV2ZW50LCBzbyBhIHRhcCBpcyBwb3NzaWJsZVxuICAgICAgICBpZiAodmFsaWRNb3ZlbWVudCAmJiB2YWxpZFRvdWNoVGltZSAmJiB2YWxpZFBvaW50ZXJzKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuZXZlbnRUeXBlICE9IElOUFVUX0VORCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB2YWxpZEludGVydmFsID0gdGhpcy5wVGltZSA/IChpbnB1dC50aW1lU3RhbXAgLSB0aGlzLnBUaW1lIDwgb3B0aW9ucy5pbnRlcnZhbCkgOiB0cnVlO1xuICAgICAgICAgICAgdmFyIHZhbGlkTXVsdGlUYXAgPSAhdGhpcy5wQ2VudGVyIHx8IGdldERpc3RhbmNlKHRoaXMucENlbnRlciwgaW5wdXQuY2VudGVyKSA8IG9wdGlvbnMucG9zVGhyZXNob2xkO1xuXG4gICAgICAgICAgICB0aGlzLnBUaW1lID0gaW5wdXQudGltZVN0YW1wO1xuICAgICAgICAgICAgdGhpcy5wQ2VudGVyID0gaW5wdXQuY2VudGVyO1xuXG4gICAgICAgICAgICBpZiAoIXZhbGlkTXVsdGlUYXAgfHwgIXZhbGlkSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgICAgICAvLyBpZiB0YXAgY291bnQgbWF0Y2hlcyB3ZSBoYXZlIHJlY29nbml6ZWQgaXQsXG4gICAgICAgICAgICAvLyBlbHNlIGl0IGhhcyBiZWdhbiByZWNvZ25pemluZy4uLlxuICAgICAgICAgICAgdmFyIHRhcENvdW50ID0gdGhpcy5jb3VudCAlIG9wdGlvbnMudGFwcztcbiAgICAgICAgICAgIGlmICh0YXBDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG5vIGZhaWxpbmcgcmVxdWlyZW1lbnRzLCBpbW1lZGlhdGVseSB0cmlnZ2VyIHRoZSB0YXAgZXZlbnRcbiAgICAgICAgICAgICAgICAvLyBvciB3YWl0IGFzIGxvbmcgYXMgdGhlIG11bHRpdGFwIGludGVydmFsIHRvIHRyaWdnZXJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzUmVxdWlyZUZhaWx1cmVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlFbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIGZhaWxUaW1lb3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRhcENvdW50ID0gdGhpcy5jb3VudDtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCwgdGhpcy5faW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogU2ltcGxlIHdheSB0byBjcmVhdGUgYSBtYW5hZ2VyIHdpdGggYSBkZWZhdWx0IHNldCBvZiByZWNvZ25pemVycy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBIYW1tZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMucmVjb2duaXplcnMgPSBpZlVuZGVmaW5lZChvcHRpb25zLnJlY29nbml6ZXJzLCBIYW1tZXIuZGVmYXVsdHMucHJlc2V0KTtcbiAgICByZXR1cm4gbmV3IE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQGNvbnN0IHtzdHJpbmd9XG4gKi9cbkhhbW1lci5WRVJTSU9OID0gJzIuMC43JztcblxuLyoqXG4gKiBkZWZhdWx0IHNldHRpbmdzXG4gKiBAbmFtZXNwYWNlXG4gKi9cbkhhbW1lci5kZWZhdWx0cyA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgaWYgRE9NIGV2ZW50cyBhcmUgYmVpbmcgdHJpZ2dlcmVkLlxuICAgICAqIEJ1dCB0aGlzIGlzIHNsb3dlciBhbmQgdW51c2VkIGJ5IHNpbXBsZSBpbXBsZW1lbnRhdGlvbnMsIHNvIGRpc2FibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBkb21FdmVudHM6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkvZmFsbGJhY2suXG4gICAgICogV2hlbiBzZXQgdG8gYGNvbXB1dGVgIGl0IHdpbGwgbWFnaWNhbGx5IHNldCB0aGUgY29ycmVjdCB2YWx1ZSBiYXNlZCBvbiB0aGUgYWRkZWQgcmVjb2duaXplcnMuXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBjb21wdXRlXG4gICAgICovXG4gICAgdG91Y2hBY3Rpb246IFRPVUNIX0FDVElPTl9DT01QVVRFLFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGVuYWJsZTogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqIEVYUEVSSU1FTlRBTCBGRUFUVVJFIC0tIGNhbiBiZSByZW1vdmVkL2NoYW5nZWRcbiAgICAgKiBDaGFuZ2UgdGhlIHBhcmVudCBpbnB1dCB0YXJnZXQgZWxlbWVudC5cbiAgICAgKiBJZiBOdWxsLCB0aGVuIGl0IGlzIGJlaW5nIHNldCB0aGUgdG8gbWFpbiBlbGVtZW50LlxuICAgICAqIEB0eXBlIHtOdWxsfEV2ZW50VGFyZ2V0fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dFRhcmdldDogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIGZvcmNlIGFuIGlucHV0IGNsYXNzXG4gICAgICogQHR5cGUge051bGx8RnVuY3Rpb259XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0Q2xhc3M6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IHJlY29nbml6ZXIgc2V0dXAgd2hlbiBjYWxsaW5nIGBIYW1tZXIoKWBcbiAgICAgKiBXaGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIgdGhlc2Ugd2lsbCBiZSBza2lwcGVkLlxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBwcmVzZXQ6IFtcbiAgICAgICAgLy8gUmVjb2duaXplckNsYXNzLCBvcHRpb25zLCBbcmVjb2duaXplV2l0aCwgLi4uXSwgW3JlcXVpcmVGYWlsdXJlLCAuLi5dXG4gICAgICAgIFtSb3RhdGVSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX1dLFxuICAgICAgICBbUGluY2hSZWNvZ25pemVyLCB7ZW5hYmxlOiBmYWxzZX0sIFsncm90YXRlJ11dLFxuICAgICAgICBbU3dpcGVSZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH1dLFxuICAgICAgICBbUGFuUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9LCBbJ3N3aXBlJ11dLFxuICAgICAgICBbVGFwUmVjb2duaXplcl0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyLCB7ZXZlbnQ6ICdkb3VibGV0YXAnLCB0YXBzOiAyfSwgWyd0YXAnXV0sXG4gICAgICAgIFtQcmVzc1JlY29nbml6ZXJdXG4gICAgXSxcblxuICAgIC8qKlxuICAgICAqIFNvbWUgQ1NTIHByb3BlcnRpZXMgY2FuIGJlIHVzZWQgdG8gaW1wcm92ZSB0aGUgd29ya2luZyBvZiBIYW1tZXIuXG4gICAgICogQWRkIHRoZW0gdG8gdGhpcyBtZXRob2QgYW5kIHRoZXkgd2lsbCBiZSBzZXQgd2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyLlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBjc3NQcm9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGV4dCBzZWxlY3Rpb24gdG8gaW1wcm92ZSB0aGUgZHJhZ2dpbmcgZ2VzdHVyZS4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSB0aGUgV2luZG93cyBQaG9uZSBncmlwcGVycyB3aGVuIHByZXNzaW5nIGFuIGVsZW1lbnQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hTZWxlY3Q6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZXMgdGhlIGRlZmF1bHQgY2FsbG91dCBzaG93biB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldC5cbiAgICAgICAgICogT24gaU9TLCB3aGVuIHlvdSB0b3VjaCBhbmQgaG9sZCBhIHRvdWNoIHRhcmdldCBzdWNoIGFzIGEgbGluaywgU2FmYXJpIGRpc3BsYXlzXG4gICAgICAgICAqIGEgY2FsbG91dCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBsaW5rLiBUaGlzIHByb3BlcnR5IGFsbG93cyB5b3UgdG8gZGlzYWJsZSB0aGF0IGNhbGxvdXQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHpvb21pbmcgaXMgZW5hYmxlZC4gVXNlZCBieSBJRTEwPlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIGNvbnRlbnRab29taW5nOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyB0aGF0IGFuIGVudGlyZSBlbGVtZW50IHNob3VsZCBiZSBkcmFnZ2FibGUgaW5zdGVhZCBvZiBpdHMgY29udGVudHMuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyRHJhZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVycmlkZXMgdGhlIGhpZ2hsaWdodCBjb2xvciBzaG93biB3aGVuIHRoZSB1c2VyIHRhcHMgYSBsaW5rIG9yIGEgSmF2YVNjcmlwdFxuICAgICAgICAgKiBjbGlja2FibGUgZWxlbWVudCBpbiBpT1MuIFRoaXMgcHJvcGVydHkgb2JleXMgdGhlIGFscGhhIHZhbHVlLCBpZiBzcGVjaWZpZWQuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdyZ2JhKDAsMCwwLDApJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGFwSGlnaGxpZ2h0Q29sb3I6ICdyZ2JhKDAsMCwwLDApJ1xuICAgIH1cbn07XG5cbnZhciBTVE9QID0gMTtcbnZhciBGT1JDRURfU1RPUCA9IDI7XG5cbi8qKlxuICogTWFuYWdlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1hbmFnZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgSGFtbWVyLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCA9IHRoaXMub3B0aW9ucy5pbnB1dFRhcmdldCB8fCBlbGVtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgIHRoaXMucmVjb2duaXplcnMgPSBbXTtcbiAgICB0aGlzLm9sZENzc1Byb3BzID0ge307XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuaW5wdXQgPSBjcmVhdGVJbnB1dEluc3RhbmNlKHRoaXMpO1xuICAgIHRoaXMudG91Y2hBY3Rpb24gPSBuZXcgVG91Y2hBY3Rpb24odGhpcywgdGhpcy5vcHRpb25zLnRvdWNoQWN0aW9uKTtcblxuICAgIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIHRydWUpO1xuXG4gICAgZWFjaCh0aGlzLm9wdGlvbnMucmVjb2duaXplcnMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIHJlY29nbml6ZXIgPSB0aGlzLmFkZChuZXcgKGl0ZW1bMF0pKGl0ZW1bMV0pKTtcbiAgICAgICAgaXRlbVsyXSAmJiByZWNvZ25pemVyLnJlY29nbml6ZVdpdGgoaXRlbVsyXSk7XG4gICAgICAgIGl0ZW1bM10gJiYgcmVjb2duaXplci5yZXF1aXJlRmFpbHVyZShpdGVtWzNdKTtcbiAgICB9LCB0aGlzKTtcbn1cblxuTWFuYWdlci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBhc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICAvLyBPcHRpb25zIHRoYXQgbmVlZCBhIGxpdHRsZSBtb3JlIHNldHVwXG4gICAgICAgIGlmIChvcHRpb25zLnRvdWNoQWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmlucHV0VGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBleGlzdGluZyBldmVudCBsaXN0ZW5lcnMgYW5kIHJlaW5pdGlhbGl6ZVxuICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnRhcmdldCA9IG9wdGlvbnMuaW5wdXRUYXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogc3RvcCByZWNvZ25pemluZyBmb3IgdGhpcyBzZXNzaW9uLlxuICAgICAqIFRoaXMgc2Vzc2lvbiB3aWxsIGJlIGRpc2NhcmRlZCwgd2hlbiBhIG5ldyBbaW5wdXRdc3RhcnQgZXZlbnQgaXMgZmlyZWQuXG4gICAgICogV2hlbiBmb3JjZWQsIHRoZSByZWNvZ25pemVyIGN5Y2xlIGlzIHN0b3BwZWQgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VdXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oZm9yY2UpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnN0b3BwZWQgPSBmb3JjZSA/IEZPUkNFRF9TVE9QIDogU1RPUDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcnVuIHRoZSByZWNvZ25pemVycyFcbiAgICAgKiBjYWxsZWQgYnkgdGhlIGlucHV0SGFuZGxlciBmdW5jdGlvbiBvbiBldmVyeSBtb3ZlbWVudCBvZiB0aGUgcG9pbnRlcnMgKHRvdWNoZXMpXG4gICAgICogaXQgd2Fsa3MgdGhyb3VnaCBhbGwgdGhlIHJlY29nbml6ZXJzIGFuZCB0cmllcyB0byBkZXRlY3QgdGhlIGdlc3R1cmUgdGhhdCBpcyBiZWluZyBtYWRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIHJlY29nbml6ZTogZnVuY3Rpb24oaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5zZXNzaW9uO1xuICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBydW4gdGhlIHRvdWNoLWFjdGlvbiBwb2x5ZmlsbFxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnByZXZlbnREZWZhdWx0cyhpbnB1dERhdGEpO1xuXG4gICAgICAgIHZhciByZWNvZ25pemVyO1xuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuXG4gICAgICAgIC8vIHRoaXMgaG9sZHMgdGhlIHJlY29nbml6ZXIgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAvLyBzbyB0aGUgcmVjb2duaXplcidzIHN0YXRlIG5lZWRzIHRvIGJlIEJFR0FOLCBDSEFOR0VELCBFTkRFRCBvciBSRUNPR05JWkVEXG4gICAgICAgIC8vIGlmIG5vIHJlY29nbml6ZXIgaXMgZGV0ZWN0aW5nIGEgdGhpbmcsIGl0IGlzIHNldCB0byBgbnVsbGBcbiAgICAgICAgdmFyIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXI7XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB0aGUgbGFzdCByZWNvZ25pemVyIGlzIHJlY29nbml6ZWRcbiAgICAgICAgLy8gb3Igd2hlbiB3ZSdyZSBpbiBhIG5ldyBzZXNzaW9uXG4gICAgICAgIGlmICghY3VyUmVjb2duaXplciB8fCAoY3VyUmVjb2duaXplciAmJiBjdXJSZWNvZ25pemVyLnN0YXRlICYgU1RBVEVfUkVDT0dOSVpFRCkpIHtcbiAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHJlY29nbml6ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVjb2duaXplciA9IHJlY29nbml6ZXJzW2ldO1xuXG4gICAgICAgICAgICAvLyBmaW5kIG91dCBpZiB3ZSBhcmUgYWxsb3dlZCB0cnkgdG8gcmVjb2duaXplIHRoZSBpbnB1dCBmb3IgdGhpcyBvbmUuXG4gICAgICAgICAgICAvLyAxLiAgIGFsbG93IGlmIHRoZSBzZXNzaW9uIGlzIE5PVCBmb3JjZWQgc3RvcHBlZCAoc2VlIHRoZSAuc3RvcCgpIG1ldGhvZClcbiAgICAgICAgICAgIC8vIDIuICAgYWxsb3cgaWYgd2Ugc3RpbGwgaGF2ZW4ndCByZWNvZ25pemVkIGEgZ2VzdHVyZSBpbiB0aGlzIHNlc3Npb24sIG9yIHRoZSB0aGlzIHJlY29nbml6ZXIgaXMgdGhlIG9uZVxuICAgICAgICAgICAgLy8gICAgICB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgICAgICAvLyAzLiAgIGFsbG93IGlmIHRoZSByZWNvZ25pemVyIGlzIGFsbG93ZWQgdG8gcnVuIHNpbXVsdGFuZW91cyB3aXRoIHRoZSBjdXJyZW50IHJlY29nbml6ZWQgcmVjb2duaXplci5cbiAgICAgICAgICAgIC8vICAgICAgdGhpcyBjYW4gYmUgc2V0dXAgd2l0aCB0aGUgYHJlY29nbml6ZVdpdGgoKWAgbWV0aG9kIG9uIHRoZSByZWNvZ25pemVyLlxuICAgICAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCAhPT0gRk9SQ0VEX1NUT1AgJiYgKCAvLyAxXG4gICAgICAgICAgICAgICAgICAgICFjdXJSZWNvZ25pemVyIHx8IHJlY29nbml6ZXIgPT0gY3VyUmVjb2duaXplciB8fCAvLyAyXG4gICAgICAgICAgICAgICAgICAgIHJlY29nbml6ZXIuY2FuUmVjb2duaXplV2l0aChjdXJSZWNvZ25pemVyKSkpIHsgLy8gM1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVjb2duaXplKGlucHV0RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIHJlY29nbml6ZXIgaGFzIGJlZW4gcmVjb2duaXppbmcgdGhlIGlucHV0IGFzIGEgdmFsaWQgZ2VzdHVyZSwgd2Ugd2FudCB0byBzdG9yZSB0aGlzIG9uZSBhcyB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgYWN0aXZlIHJlY29nbml6ZXIuIGJ1dCBvbmx5IGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhbiBhY3RpdmUgcmVjb2duaXplclxuICAgICAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyICYmIHJlY29nbml6ZXIuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQpKSB7XG4gICAgICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IHJlY29nbml6ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGEgcmVjb2duaXplciBieSBpdHMgZXZlbnQgbmFtZS5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TnVsbH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKHJlY29nbml6ZXIgaW5zdGFuY2VvZiBSZWNvZ25pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjb2duaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChyZWNvZ25pemVyc1tpXS5vcHRpb25zLmV2ZW50ID09IHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb2duaXplcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGFkZCBhIHJlY29nbml6ZXIgdG8gdGhlIG1hbmFnZXJcbiAgICAgKiBleGlzdGluZyByZWNvZ25pemVycyB3aXRoIHRoZSBzYW1lIGV2ZW50IG5hbWUgd2lsbCBiZSByZW1vdmVkXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ8TWFuYWdlcn1cbiAgICAgKi9cbiAgICBhZGQ6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdhZGQnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgZXhpc3RpbmdcbiAgICAgICAgdmFyIGV4aXN0aW5nID0gdGhpcy5nZXQocmVjb2duaXplci5vcHRpb25zLmV2ZW50KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShleGlzdGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlY29nbml6ZXJzLnB1c2gocmVjb2duaXplcik7XG4gICAgICAgIHJlY29nbml6ZXIubWFuYWdlciA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSBhIHJlY29nbml6ZXIgYnkgbmFtZSBvciBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICByZW1vdmU6IGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKHJlY29nbml6ZXIsICdyZW1vdmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZWNvZ25pemVyID0gdGhpcy5nZXQocmVjb2duaXplcik7XG5cbiAgICAgICAgLy8gbGV0J3MgbWFrZSBzdXJlIHRoaXMgcmVjb2duaXplciBleGlzdHNcbiAgICAgICAgaWYgKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpbkFycmF5KHJlY29nbml6ZXJzLCByZWNvZ25pemVyKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlY29nbml6ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGV2ZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb246IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyc1tldmVudF0gfHwgW107XG4gICAgICAgICAgICBoYW5kbGVyc1tldmVudF0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgZXZlbnQsIGxlYXZlIGVtaXQgYmxhbmsgdG8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaGFuZGxlcl1cbiAgICAgKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSB0aGlzXG4gICAgICovXG4gICAgb2ZmOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzO1xuICAgICAgICBlYWNoKHNwbGl0U3RyKGV2ZW50cyksIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaGFuZGxlcnNbZXZlbnRdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyc1tldmVudF0gJiYgaGFuZGxlcnNbZXZlbnRdLnNwbGljZShpbkFycmF5KGhhbmRsZXJzW2V2ZW50XSwgaGFuZGxlciksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGVtaXQgZXZlbnQgdG8gdGhlIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgLy8gd2UgYWxzbyB3YW50IHRvIHRyaWdnZXIgZG9tIGV2ZW50c1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRvbUV2ZW50cykge1xuICAgICAgICAgICAgdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIGhhbmRsZXJzLCBzbyBza2lwIGl0IGFsbFxuICAgICAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzW2V2ZW50XSAmJiB0aGlzLmhhbmRsZXJzW2V2ZW50XS5zbGljZSgpO1xuICAgICAgICBpZiAoIWhhbmRsZXJzIHx8ICFoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEudHlwZSA9IGV2ZW50O1xuICAgICAgICBkYXRhLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkYXRhLnNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IGhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbaV0oZGF0YSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVzdHJveSB0aGUgbWFuYWdlciBhbmQgdW5iaW5kcyBhbGwgZXZlbnRzXG4gICAgICogaXQgZG9lc24ndCB1bmJpbmQgZG9tIGV2ZW50cywgdGhhdCBpcyB0aGUgdXNlciBvd24gcmVzcG9uc2liaWxpdHlcbiAgICAgKi9cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ICYmIHRvZ2dsZUNzc1Byb3BzKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IHt9O1xuICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIGFkZC9yZW1vdmUgdGhlIGNzcyBwcm9wZXJ0aWVzIGFzIGRlZmluZWQgaW4gbWFuYWdlci5vcHRpb25zLmNzc1Byb3BzXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYWRkXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZUNzc1Byb3BzKG1hbmFnZXIsIGFkZCkge1xuICAgIHZhciBlbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmICghZWxlbWVudC5zdHlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwcm9wO1xuICAgIGVhY2gobWFuYWdlci5vcHRpb25zLmNzc1Byb3BzLCBmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICBwcm9wID0gcHJlZml4ZWQoZWxlbWVudC5zdHlsZSwgbmFtZSk7XG4gICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gPSBlbGVtZW50LnN0eWxlW3Byb3BdO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IG1hbmFnZXIub2xkQ3NzUHJvcHNbcHJvcF0gfHwgJyc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWFkZCkge1xuICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzID0ge307XG4gICAgfVxufVxuXG4vKipcbiAqIHRyaWdnZXIgZG9tIGV2ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSkge1xuICAgIHZhciBnZXN0dXJlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBnZXN0dXJlRXZlbnQuaW5pdEV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlKTtcbiAgICBnZXN0dXJlRXZlbnQuZ2VzdHVyZSA9IGRhdGE7XG4gICAgZGF0YS50YXJnZXQuZGlzcGF0Y2hFdmVudChnZXN0dXJlRXZlbnQpO1xufVxuXG5hc3NpZ24oSGFtbWVyLCB7XG4gICAgSU5QVVRfU1RBUlQ6IElOUFVUX1NUQVJULFxuICAgIElOUFVUX01PVkU6IElOUFVUX01PVkUsXG4gICAgSU5QVVRfRU5EOiBJTlBVVF9FTkQsXG4gICAgSU5QVVRfQ0FOQ0VMOiBJTlBVVF9DQU5DRUwsXG5cbiAgICBTVEFURV9QT1NTSUJMRTogU1RBVEVfUE9TU0lCTEUsXG4gICAgU1RBVEVfQkVHQU46IFNUQVRFX0JFR0FOLFxuICAgIFNUQVRFX0NIQU5HRUQ6IFNUQVRFX0NIQU5HRUQsXG4gICAgU1RBVEVfRU5ERUQ6IFNUQVRFX0VOREVELFxuICAgIFNUQVRFX1JFQ09HTklaRUQ6IFNUQVRFX1JFQ09HTklaRUQsXG4gICAgU1RBVEVfQ0FOQ0VMTEVEOiBTVEFURV9DQU5DRUxMRUQsXG4gICAgU1RBVEVfRkFJTEVEOiBTVEFURV9GQUlMRUQsXG5cbiAgICBESVJFQ1RJT05fTk9ORTogRElSRUNUSU9OX05PTkUsXG4gICAgRElSRUNUSU9OX0xFRlQ6IERJUkVDVElPTl9MRUZULFxuICAgIERJUkVDVElPTl9SSUdIVDogRElSRUNUSU9OX1JJR0hULFxuICAgIERJUkVDVElPTl9VUDogRElSRUNUSU9OX1VQLFxuICAgIERJUkVDVElPTl9ET1dOOiBESVJFQ1RJT05fRE9XTixcbiAgICBESVJFQ1RJT05fSE9SSVpPTlRBTDogRElSRUNUSU9OX0hPUklaT05UQUwsXG4gICAgRElSRUNUSU9OX1ZFUlRJQ0FMOiBESVJFQ1RJT05fVkVSVElDQUwsXG4gICAgRElSRUNUSU9OX0FMTDogRElSRUNUSU9OX0FMTCxcblxuICAgIE1hbmFnZXI6IE1hbmFnZXIsXG4gICAgSW5wdXQ6IElucHV0LFxuICAgIFRvdWNoQWN0aW9uOiBUb3VjaEFjdGlvbixcblxuICAgIFRvdWNoSW5wdXQ6IFRvdWNoSW5wdXQsXG4gICAgTW91c2VJbnB1dDogTW91c2VJbnB1dCxcbiAgICBQb2ludGVyRXZlbnRJbnB1dDogUG9pbnRlckV2ZW50SW5wdXQsXG4gICAgVG91Y2hNb3VzZUlucHV0OiBUb3VjaE1vdXNlSW5wdXQsXG4gICAgU2luZ2xlVG91Y2hJbnB1dDogU2luZ2xlVG91Y2hJbnB1dCxcblxuICAgIFJlY29nbml6ZXI6IFJlY29nbml6ZXIsXG4gICAgQXR0clJlY29nbml6ZXI6IEF0dHJSZWNvZ25pemVyLFxuICAgIFRhcDogVGFwUmVjb2duaXplcixcbiAgICBQYW46IFBhblJlY29nbml6ZXIsXG4gICAgU3dpcGU6IFN3aXBlUmVjb2duaXplcixcbiAgICBQaW5jaDogUGluY2hSZWNvZ25pemVyLFxuICAgIFJvdGF0ZTogUm90YXRlUmVjb2duaXplcixcbiAgICBQcmVzczogUHJlc3NSZWNvZ25pemVyLFxuXG4gICAgb246IGFkZEV2ZW50TGlzdGVuZXJzLFxuICAgIG9mZjogcmVtb3ZlRXZlbnRMaXN0ZW5lcnMsXG4gICAgZWFjaDogZWFjaCxcbiAgICBtZXJnZTogbWVyZ2UsXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgaW5oZXJpdDogaW5oZXJpdCxcbiAgICBiaW5kRm46IGJpbmRGbixcbiAgICBwcmVmaXhlZDogcHJlZml4ZWRcbn0pO1xuXG4vLyB0aGlzIHByZXZlbnRzIGVycm9ycyB3aGVuIEhhbW1lciBpcyBsb2FkZWQgaW4gdGhlIHByZXNlbmNlIG9mIGFuIEFNRFxuLy8gIHN0eWxlIGxvYWRlciBidXQgYnkgc2NyaXB0IHRhZywgbm90IGJ5IHRoZSBsb2FkZXIuXG52YXIgZnJlZUdsb2JhbCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6ICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge30pKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5mcmVlR2xvYmFsLkhhbW1lciA9IEhhbW1lcjtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEhhbW1lcjtcbiAgICB9KTtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSGFtbWVyO1xufSBlbHNlIHtcbiAgICB3aW5kb3dbZXhwb3J0TmFtZV0gPSBIYW1tZXI7XG59XG5cbn0pKHdpbmRvdywgZG9jdW1lbnQsICdIYW1tZXInKTtcbiIsIi8qKlxuICogTWljcm9FdmVudCAtIHRvIG1ha2UgYW55IGpzIG9iamVjdCBhbiBldmVudCBlbWl0dGVyIChzZXJ2ZXIgb3IgYnJvd3NlcilcbiAqIFxuICogLSBwdXJlIGphdmFzY3JpcHQgLSBzZXJ2ZXIgY29tcGF0aWJsZSwgYnJvd3NlciBjb21wYXRpYmxlXG4gKiAtIGRvbnQgcmVseSBvbiB0aGUgYnJvd3NlciBkb21zXG4gKiAtIHN1cGVyIHNpbXBsZSAtIHlvdSBnZXQgaXQgaW1tZWRpYXRseSwgbm8gbWlzdGVyeSwgbm8gbWFnaWMgaW52b2x2ZWRcbiAqXG4gKiAtIGNyZWF0ZSBhIE1pY3JvRXZlbnREZWJ1ZyB3aXRoIGdvb2RpZXMgdG8gZGVidWdcbiAqICAgLSBtYWtlIGl0IHNhZmVyIHRvIHVzZVxuKi9cblxudmFyIE1pY3JvRXZlbnRcdD0gZnVuY3Rpb24oKXt9XG5NaWNyb0V2ZW50LnByb3RvdHlwZVx0PSB7XG5cdGJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0gPSB0aGlzLl9ldmVudHNbZXZlbnRdXHR8fCBbXTtcblx0XHR0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2goZmN0KTtcblx0fSxcblx0dW5iaW5kXHQ6IGZ1bmN0aW9uKGV2ZW50LCBmY3Qpe1xuXHRcdHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcblx0XHRpZiggZXZlbnQgaW4gdGhpcy5fZXZlbnRzID09PSBmYWxzZSAgKVx0cmV0dXJuO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0uc3BsaWNlKHRoaXMuX2V2ZW50c1tldmVudF0uaW5kZXhPZihmY3QpLCAxKTtcblx0fSxcblx0dHJpZ2dlclx0OiBmdW5jdGlvbihldmVudCAvKiAsIGFyZ3MuLi4gKi8pe1xuXHRcdHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcblx0XHRpZiggZXZlbnQgaW4gdGhpcy5fZXZlbnRzID09PSBmYWxzZSAgKVx0cmV0dXJuO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHNbZXZlbnRdLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudF1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogbWl4aW4gd2lsbCBkZWxlZ2F0ZSBhbGwgTWljcm9FdmVudC5qcyBmdW5jdGlvbiBpbiB0aGUgZGVzdGluYXRpb24gb2JqZWN0XG4gKlxuICogLSByZXF1aXJlKCdNaWNyb0V2ZW50JykubWl4aW4oRm9vYmFyKSB3aWxsIG1ha2UgRm9vYmFyIGFibGUgdG8gdXNlIE1pY3JvRXZlbnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdGhlIG9iamVjdCB3aGljaCB3aWxsIHN1cHBvcnQgTWljcm9FdmVudFxuKi9cbk1pY3JvRXZlbnQubWl4aW5cdD0gZnVuY3Rpb24oZGVzdE9iamVjdCl7XG5cdHZhciBwcm9wc1x0PSBbJ2JpbmQnLCAndW5iaW5kJywgJ3RyaWdnZXInXTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArKyl7XG5cdFx0ZGVzdE9iamVjdC5wcm90b3R5cGVbcHJvcHNbaV1dXHQ9IE1pY3JvRXZlbnQucHJvdG90eXBlW3Byb3BzW2ldXTtcblx0fVxufVxuXG4vLyBleHBvcnQgaW4gY29tbW9uIGpzXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAoJ2V4cG9ydHMnIGluIG1vZHVsZSkpe1xuXHRtb2R1bGUuZXhwb3J0c1x0PSBNaWNyb0V2ZW50XG59XG4iXX0=
