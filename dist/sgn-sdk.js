(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SGN = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var SGN, process, session;

if (typeof process === 'undefined') {
  process = {
    browser: true
  };
}

SGN = _dereq_('./sgn');

SGN.storage = {
  local: _dereq_('./storage/client-local'),
  cookie: _dereq_('./storage/client-cookie')
};

SGN.request = _dereq_('./request/browser');

SGN.AuthKit = _dereq_('./kits/auth');

SGN.AssetsKit = _dereq_('./kits/assets');

SGN.EventsKit = _dereq_('./kits/events');

SGN.GraphKit = _dereq_('./kits/graph');

SGN.CoreKit = _dereq_('./kits/core');

SGN.PagedPublicationKit = _dereq_('./kits/paged-publication');

session = SGN.storage.cookie.get('session');

if (typeof session === 'object') {
  SGN.config.set({
    coreSessionToken: session.token,
    coreSessionClientId: session.client_id
  });
}

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


},{"./kits/assets":6,"./kits/auth":7,"./kits/core":8,"./kits/events":11,"./kits/graph":14,"./kits/paged-publication":21,"./request/browser":29,"./sgn":30,"./storage/client-cookie":31,"./storage/client-local":32}],2:[function(_dereq_,module,exports){
var attrs, keys,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

attrs = {};

keys = ['appVersion', 'appKey', 'appSecret', 'authToken', 'eventTracker', 'locale', 'coreSessionToken', 'coreSessionClientId', 'coreUrl', 'graphUrl', 'eventsTrackUrl', 'eventsPulseUrl', 'assetsFileUploadUrl'];

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

config.set({
  locale: 'en_US',
  coreUrl: 'https://api.etilbudsavis.dk',
  graphUrl: 'https://graph.service.shopgun.com',
  eventsTrackUrl: 'https://events.service.shopgun.com/track',
  eventsPulseUrl: 'wss://events.service.shopgun.com/pulse',
  assetsFileUploadUrl: 'https://assets.service.shopgun.com/upload'
});

module.exports = {
  config: config,
  util: util
};


},{"./config":2,"./util":33}],4:[function(_dereq_,module,exports){
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
  var formData, timeout, url;
  if (options == null) {
    options = {};
  }
  if (options.file == null) {
    throw new Error('File is not defined');
  }
  url = SGN.config.get('assetsFileUploadUrl');
  formData = {
    file: options.file
  };
  timeout = 1000 * 60 * 60;
  SGN.request({
    method: 'post',
    url: url,
    formData: formData,
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


},{"../../sgn":30}],6:[function(_dereq_,module,exports){
module.exports = {
  fileUpload: _dereq_('./file-upload')
};


},{"./file-upload":5}],7:[function(_dereq_,module,exports){
module.exports = {};


},{}],8:[function(_dereq_,module,exports){
var SGN, request, session;

SGN = _dereq_('../../sgn');

request = _dereq_('./request');

session = _dereq_('./session');

module.exports = {
  request: request,
  session: session
};


},{"../../sgn":30,"./request":9,"./session":10}],9:[function(_dereq_,module,exports){
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
    var appSecret, appVersion, clientId, geo, headers, locale, qs, ref, ref1, ref2, token, url;
    if (err != null) {
      return callback(err);
    }
    url = (ref = options.url) != null ? ref : '';
    headers = (ref1 = options.headers) != null ? ref1 : {};
    token = SGN.config.get('coreSessionToken');
    clientId = SGN.config.get('coreSessionClientId');
    appVersion = SGN.config.get('appVersion');
    appSecret = SGN.config.get('appSecret');
    locale = SGN.config.get('locale');
    qs = (ref2 = options.qs) != null ? ref2 : {};
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
      url: SGN.config.get('coreUrl') + url,
      qs: qs,
      body: options.body,
      formData: options.formData,
      headers: headers,
      json: true,
      useCookies: false
    }, function(err, data) {
      var responseToken;
      if (err != null) {
        callback(SGN.util.error(new Error('Core request error'), {
          code: 'CoreRequestError'
        }));
      } else {
        token = SGN.config.get('coreSessionToken');
        responseToken = data.headers['x-token'];
        if (token !== responseToken) {
          SGN.CoreKit.session.saveToken(responseToken);
        }
        if (data.statusCode >= 200 && data.statusCode < 300 || data.statusCode === 304) {
          callback(null, data.body);
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


},{"../../sgn":30}],10:[function(_dereq_,module,exports){
var SGN, callbackQueue, clientCookieStorage, session, sha256;

SGN = _dereq_('../../sgn');

sha256 = _dereq_('sha256');

clientCookieStorage = _dereq_('../../storage/client-cookie');

callbackQueue = [];

session = {
  ttl: 1 * 60 * 60 * 24 * 60,
  saveToken: function(token) {
    SGN.config.set({
      coreSessionToken: token
    });
    session.saveCookie();
  },
  saveClientId: function(clientId) {
    SGN.config.set({
      coreSessionClientId: clientId
    });
    session.saveCookie();
  },
  saveCookie: function() {
    clientCookieStorage.set('session', {
      token: SGN.config.get('coreSessionToken'),
      client_id: SGN.config.get('coreSessionClientId')
    });
  },
  create: function(callback) {
    SGN.request({
      method: 'post',
      url: SGN.config.get('coreUrl') + '/v2/sessions',
      json: true,
      qs: {
        api_key: SGN.config.get('appKey'),
        token_ttl: session.ttl
      }
    }, function(err, data) {
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
  update: function(callback) {
    var appSecret, headers, token;
    headers = {};
    token = SGN.config.get('coreSessionToken');
    appSecret = SGN.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }
    SGN.request({
      url: SGN.config.get('coreUrl') + '/v2/sessions',
      headers: headers,
      json: true
    }, function(err, data) {
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
  renew: function(callback) {
    var appSecret, headers, token;
    headers = {};
    token = SGN.config.get('coreSessionToken');
    appSecret = SGN.config.get('appSecret');
    headers['X-Token'] = token;
    if (appSecret != null) {
      headers['X-Signature'] = session.sign(appSecret, token);
    }
    SGN.request({
      method: 'put',
      url: SGN.config.get('coreUrl') + '/v2/sessions',
      headers: headers,
      json: true
    }, function(err, data) {
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
      if (SGN.config.get('coreSessionToken') == null) {
        session.create(complete);
      } else {
        complete();
      }
    }
  },
  sign: function(appSecret, token) {
    return sha256([appSecret, token].join(''));
  }
};

module.exports = session;


},{"../../sgn":30,"../../storage/client-cookie":31,"sha256":43}],11:[function(_dereq_,module,exports){
module.exports = {
  Tracker: _dereq_('./tracker'),
  Pulse: _dereq_('./pulse')
};


},{"./pulse":12,"./tracker":13}],12:[function(_dereq_,module,exports){
var MicroEvent, Pulse;

MicroEvent = _dereq_('microevent');

Pulse = (function() {
  function Pulse() {
    this.destroyed = false;
    this.connection = this.connect();
    return;
  }

  Pulse.prototype.destroy = function() {
    this.destroyed = true;
    this.connection.close();
    return this;
  };

  Pulse.prototype.connect = function() {
    var connection;
    connection = new WebSocket(SGN.config.get('eventsPulseUrl'));
    connection.onopen = this.onOpen.bind(this);
    connection.onmessage = this.onMessage.bind(this);
    connection.onerror = this.onError.bind(this);
    connection.onclose = this.onClose.bind(this);
    return connection;
  };

  Pulse.prototype.onOpen = function() {
    this.trigger('open');
  };

  Pulse.prototype.onMessage = function(e) {
    try {
      this.trigger('event', JSON.parse(e.data));
    } catch (error) {}
  };

  Pulse.prototype.onError = function() {};

  Pulse.prototype.onClose = function() {
    if (this.destroyed === false) {
      setTimeout((function(_this) {
        return function() {
          _this.connection = _this.connect();
        };
      })(this), 2000);
    }
  };

  return Pulse;

})();

MicroEvent.mixin(Pulse);

module.exports = Pulse;


},{"microevent":40}],13:[function(_dereq_,module,exports){
var SGN, Tracker, clientLocalStorage, getPool, pool;

SGN = _dereq_('../../sgn');

clientLocalStorage = _dereq_('../../storage/client-local');

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
    url = SGN.config.get('eventsTrackUrl');
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


},{"../../sgn":30,"../../storage/client-local":32}],14:[function(_dereq_,module,exports){
module.exports = {
  request: _dereq_('./request')
};


},{"./request":15}],15:[function(_dereq_,module,exports){
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
  url = SGN.config.get('graphUrl');
  timeout = 1000 * 12;
  appKey = SGN.config.get('appKey');
  authToken = SGN.config.get('authToken');
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
        callback(null, data.body);
      } else {
        callback(SGN.util.error(new Error('Graph API error'), {
          code: 'GraphAPIError',
          statusCode: data.statusCode
        }));
      }
    }
  });
};


},{"../../sgn":30}],16:[function(_dereq_,module,exports){
var MicroEvent, PagedPublicationControls, SGN, keyCodes;

MicroEvent = _dereq_('microevent');

SGN = _dereq_('../../sgn');

keyCodes = _dereq_('../../key-codes');

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


},{"../../key-codes":4,"../../sgn":30,"microevent":40}],17:[function(_dereq_,module,exports){
var MicroEvent, PageSpreads, PagedPublicationCore, SGN, clientLocalStorage;

MicroEvent = _dereq_('microevent');

PageSpreads = _dereq_('./page-spreads');

clientLocalStorage = _dereq_('../../storage/client-local');

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
    clientRect = {
      top: pageEl.offsetTop,
      left: pageEl.offsetLeft
    };
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


},{"../../sgn":30,"../../storage/client-local":32,"./page-spreads":25,"microevent":40,"verso-browser":44}],18:[function(_dereq_,module,exports){
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


},{"microevent":40}],19:[function(_dereq_,module,exports){
var Gator, MicroEvent, Mustache, PagedPublicationHotspotPicker, keyCodes, template;

MicroEvent = _dereq_('microevent');

Gator = _dereq_('gator');

Mustache = _dereq_('mustache');

template = _dereq_('./templates/hotspot-picker');

keyCodes = _dereq_('../../key-codes');

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


},{"../../key-codes":4,"./templates/hotspot-picker":26,"gator":38,"microevent":40,"mustache":41}],20:[function(_dereq_,module,exports){
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


},{"./templates/hotspot":27,"microevent":40,"mustache":41}],21:[function(_dereq_,module,exports){
module.exports = {
  Viewer: _dereq_('./viewer'),
  HotspotPicker: _dereq_('./hotspot-picker'),
  Main: _dereq_('./main')
};


},{"./hotspot-picker":19,"./main":23,"./viewer":28}],22:[function(_dereq_,module,exports){
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


},{"microevent":40}],23:[function(_dereq_,module,exports){
var MicroEvent, PagedPublicationMain, SGN;

MicroEvent = _dereq_('microevent');

SGN = _dereq_('../../core');

PagedPublicationMain = (function() {
  function PagedPublicationMain(el, options) {
    this.el = el;
    this.options = options != null ? options : {};
    this.data = {
      details: null,
      pages: null,
      hotspots: null
    };
    this.hotspots = {};
    this.hotspotQueue = [];
    return;
  }

  PagedPublicationMain.prototype.renderViewer = function() {
    this.viewer = new SGN.PagedPublicationKit.Viewer(this.el, {
      id: this.options.id,
      ownedBy: this.data.details.dealer_id,
      color: '#' + this.data.details.branding.pageflip.color,
      keyboard: true,
      eventTracker: this.options.eventTracker,
      pages: this.transformPages(this.data.pages)
    });
    this.viewer.bind('hotspotsRequested', (function(_this) {
      return function(e) {
        _this.hotspotQueue.push(e);
        _this.processHotspotQueue();
      };
    })(this));
    this.viewer.bind('beforeNavigation', (function(_this) {
      return function() {
        if (_this.hotspotPicker != null) {
          _this.hotspotPicker.destroy();
        }
      };
    })(this));
    this.viewer.bind('clicked', (function(_this) {
      return function(e) {
        var clickedHotspots, hotspots;
        clickedHotspots = e.verso.overlayEls.map(function(overlayEl) {
          return _this.data.hotspots[overlayEl.getAttribute('data-id')];
        });
        if (clickedHotspots.length === 1) {
          _this.trigger('hotspotSelected', clickedHotspots[0]);
        } else if (clickedHotspots.length > 1) {
          hotspots = clickedHotspots.filter(function(hotspot) {
            return hotspot.type === 'offer';
          }).map(function(hotspot) {
            return {
              id: hotspot.id,
              title: hotspot.offer.heading,
              subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price
            };
          });
          _this.hotspotPicker = new SGN.PagedPublicationKit.HotspotPicker({
            header: 'Which offer did you mean?',
            x: e.verso.x,
            y: e.verso.y,
            hotspots: hotspots
          });
          _this.hotspotPicker.bind('selected', function(e) {
            _this.trigger('hotspotSelected', _this.data.hotspots[e.id]);
            _this.hotspotPicker.destroy();
          });
          _this.hotspotPicker.bind('destroyed', function() {
            _this.hotspotPicker = null;
            _this.viewer.el.focus();
          });
          _this.viewer.el.appendChild(_this.hotspotPicker.el);
          _this.hotspotPicker.render().el.focus();
        }
      };
    })(this));
    return this;
  };

  PagedPublicationMain.prototype.transformPages = function(pages) {
    return pages.map(function(page, i) {
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
  };

  PagedPublicationMain.prototype.processHotspotQueue = function() {
    if (!this.viewer || !this.data.hotspots) {
      return;
    }
    this.hotspotQueue = this.hotspotQueue.filter((function(_this) {
      return function(hotspotRequest) {
        var hotspot, hotspots, id, match, ref;
        hotspots = {};
        ref = _this.data.hotspots;
        for (id in ref) {
          hotspot = ref[id];
          match = false;
          hotspotRequest.pages.forEach(function(page) {
            if (hotspot.locations[page.pageNumber] != null) {
              match = true;
            }
          });
          if (match) {
            hotspots[id] = {
              type: hotspot.type,
              id: hotspot.id,
              locations: hotspot.locations
            };
          }
        }
        _this.viewer.trigger('hotspotsReceived', {
          id: hotspotRequest.id,
          pages: hotspotRequest.pages,
          ratio: _this.data.details.dimensions.height,
          hotspots: hotspots
        });
        return false;
      };
    })(this));
  };

  PagedPublicationMain.prototype.fetch = function(callback) {
    SGN.CoreKit.request({
      url: "/v2/catalogs/" + this.options.id
    }, callback);
  };

  PagedPublicationMain.prototype.fetchPages = function(callback) {
    SGN.CoreKit.request({
      url: "/v2/catalogs/" + this.options.id + "/pages"
    }, callback);
  };

  PagedPublicationMain.prototype.fetchHotspots = function(callback) {
    SGN.CoreKit.request({
      url: "/v2/catalogs/" + this.options.id + "/hotspots"
    }, callback);
  };

  PagedPublicationMain.prototype.fetchAll = function(callback) {
    SGN.util.async.parallel([this.fetch.bind(this), this.fetchPages.bind(this)], (function(_this) {
      return function(result) {
        var details, pages;
        details = result[0][1];
        pages = result[1][1];
        if ((details != null) && (pages != null)) {
          _this.data.details = details;
          _this.data.pages = pages;
          callback();
        } else {
          callback(new Error());
        }
      };
    })(this));
    return this.fetchHotspots((function(_this) {
      return function(err, response) {
        if (err != null) {
          return;
        }
        _this.data.hotspots = {};
        response.forEach(function(hotspot) {
          _this.data.hotspots[hotspot.id] = hotspot;
        });
        _this.processHotspotQueue();
      };
    })(this));
  };

  return PagedPublicationMain;

})();

MicroEvent.mixin(PagedPublicationMain);

module.exports = PagedPublicationMain;


},{"../../core":3,"microevent":40}],24:[function(_dereq_,module,exports){
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


},{"../../sgn":30,"microevent":40}],25:[function(_dereq_,module,exports){
var MicroEvent, PageSpread, PagedPublicationPageSpreads, SGN;

MicroEvent = _dereq_('microevent');

PageSpread = _dereq_('./page-spread');

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


},{"../../sgn":30,"./page-spread":24,"microevent":40}],26:[function(_dereq_,module,exports){
module.exports = "<div class=\"sgn-pp-hotspot-picker__background\" data-close></div>\n<div class=\"sgn__popover\" style=\"top: {{top}}px; left: {{left}}px;\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#hotspots}}\n                <li data-id=\"{{id}}\">\n                    <p>{{title}}</p>\n                    <p>{{subtitle}}</p>\n                </li>\n            {{/hotspots}}\n        </ul>\n    </div>\n</div>";


},{}],27:[function(_dereq_,module,exports){
module.exports = "";


},{}],28:[function(_dereq_,module,exports){
var Controls, Core, EventTracking, Hotspots, LegacyEventTracking, MicroEvent, SGN, Viewer;

MicroEvent = _dereq_('microevent');

SGN = _dereq_('../../core');

Core = _dereq_('./core');

Hotspots = _dereq_('./hotspots');

Controls = _dereq_('./controls');

EventTracking = _dereq_('./event-tracking');

LegacyEventTracking = _dereq_('./legacy-event-tracking');

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
        json: true,
        body: {
          type: e.type,
          ms: e.ms,
          orientation: e.orientation,
          pages: e.pages.join(','),
          view_session: this.viewSession
        }
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


},{"../../core":3,"./controls":16,"./core":17,"./event-tracking":18,"./hotspots":20,"./legacy-event-tracking":22,"microevent":40}],29:[function(_dereq_,module,exports){
var SGN;

SGN = _dereq_('../sgn');

module.exports = function(options, callback, progressCallback) {
  var formData, header, headers, http, key, method, queryParams, ref, ref1, ref2, ref3, url, value;
  if (options == null) {
    options = {};
  }
  http = new XMLHttpRequest();
  method = (ref = options.method) != null ? ref : 'get';
  url = options.url;
  headers = (ref1 = options.headers) != null ? ref1 : {};
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
  if (options.json === true) {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
  }
  ref2 = options.headers;
  for (header in ref2) {
    value = ref2[header];
    http.setRequestHeader(header, value);
  }
  http.addEventListener('load', function() {
    var body;
    headers = http.getAllResponseHeaders().split('\r\n');
    headers = headers.reduce(function(acc, current, i) {
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
  if (options.formData != null) {
    formData = new FormData();
    ref3 = options.formData;
    for (key in ref3) {
      value = ref3[key];
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


},{"../sgn":30}],30:[function(_dereq_,module,exports){
module.exports = _dereq_('./core');


},{"./core":3}],31:[function(_dereq_,module,exports){
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


},{"../sgn":30}],32:[function(_dereq_,module,exports){
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


},{"../sgn":30}],33:[function(_dereq_,module,exports){
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

},{"_process":42,"buffer":35}],34:[function(_dereq_,module,exports){
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

},{}],35:[function(_dereq_,module,exports){
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

},{"base64-js":34,"ieee754":39}],36:[function(_dereq_,module,exports){
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
},{}],37:[function(_dereq_,module,exports){
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
},{}],38:[function(_dereq_,module,exports){
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

},{}],39:[function(_dereq_,module,exports){
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

},{}],40:[function(_dereq_,module,exports){
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

},{}],41:[function(_dereq_,module,exports){
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

},{}],42:[function(_dereq_,module,exports){
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

},{}],43:[function(_dereq_,module,exports){
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

},{"convert-hex":36,"convert-string":37}],44:[function(_dereq_,module,exports){
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

  PageSpread.prototype.isScrollable = function() {
    return this.getEl().classList.contains('verso--scrollable');
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
      pageRect = {
        top: pageEl.offsetTop,
        left: pageEl.offsetLeft,
        width: pageEl.offsetWidth,
        height: pageEl.offsetHeight
      };
      pageRect.right = pageRect.left + pageRect.width;
      pageRect.bottom = pageRect.top + pageRect.height;
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
      preventDefault: true,
      touchAction: 'pan-y',
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
    this.touchStartListener = this.touchStart.bind(this);
    this.el.addEventListener('touchstart', this.touchStartListener, false);
    window.addEventListener('resize', this.resizeListener, false);
    return this;
  };

  Verso.prototype.destroy = function() {
    this.hammer.destroy();
    this.el.removeEventListener('touchstart', this.touchStartListener);
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
    var activePageSpread, carousel, currentPageSpread, currentPosition, duration, ref, ref1, touchAction, velocity;
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
    touchAction = activePageSpread.isScrollable() ? 'pan-y' : 'none';
    if (currentPageSpread != null) {
      currentPageSpread.deactivate();
    }
    activePageSpread.activate();
    carousel.visible.forEach(function(pageSpread) {
      return pageSpread.position().setVisibility('visible');
    });
    this.hammer.set({
      touchAction: touchAction
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
    info.contentX = (x - contentRect.left) / Math.max(1, contentRect.width);
    info.contentY = (y - contentRect.top) / Math.max(1, contentRect.height);
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
    if (this.transform.scale > 1 || (e.direction === Hammer.DIRECTION_LEFT || e.direction === Hammer.DIRECTION_RIGHT)) {
      x = e.center.x;
      edgeThreshold = 30;
      width = this.scrollerEl.offsetWidth;
      if (x > edgeThreshold && x < width - edgeThreshold) {
        this.startTransform.left = this.transform.left;
        this.startTransform.top = this.transform.top;
        this.panning = true;
        this.trigger('panStart');
      }
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

  Verso.prototype.touchStart = function(e) {
    var isScrollable, pageSpread;
    pageSpread = this.getPageSpreadFromPosition(this.getPosition());
    isScrollable = pageSpread.isScrollable();
    return;
    if (isScrollable) {
      e.stopPropagation();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY29mZmVlc2NyaXB0L2Jyb3dzZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb25maWcuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb3JlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2V5LWNvZGVzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9hc3NldHMvZmlsZS11cGxvYWQuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2Fzc2V0cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvYXV0aC9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9yZXF1ZXN0LmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9jb3JlL3Nlc3Npb24uY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2V2ZW50cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvZXZlbnRzL3B1bHNlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9ldmVudHMvdHJhY2tlci5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvZ3JhcGgvaW5kZXguY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2dyYXBoL3JlcXVlc3QuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkLXB1YmxpY2F0aW9uL2NvbnRyb2xzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZC1wdWJsaWNhdGlvbi9jb3JlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZC1wdWJsaWNhdGlvbi9ldmVudC10cmFja2luZy5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWQtcHVibGljYXRpb24vaG90c3BvdC1waWNrZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkLXB1YmxpY2F0aW9uL2hvdHNwb3RzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZC1wdWJsaWNhdGlvbi9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWQtcHVibGljYXRpb24vbGVnYWN5LWV2ZW50LXRyYWNraW5nLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZC1wdWJsaWNhdGlvbi9tYWluLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZC1wdWJsaWNhdGlvbi9wYWdlLXNwcmVhZC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWQtcHVibGljYXRpb24vcGFnZS1zcHJlYWRzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZC1wdWJsaWNhdGlvbi90ZW1wbGF0ZXMvaG90c3BvdC1waWNrZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkLXB1YmxpY2F0aW9uL3RlbXBsYXRlcy9ob3RzcG90LmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZC1wdWJsaWNhdGlvbi92aWV3ZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9yZXF1ZXN0L2Jyb3dzZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zZ24uY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zdG9yYWdlL2NsaWVudC1jb29raWUuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zdG9yYWdlL2NsaWVudC1sb2NhbC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L3V0aWwuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29udmVydC1oZXgvY29udmVydC1oZXguanMiLCJub2RlX21vZHVsZXMvY29udmVydC1zdHJpbmcvY29udmVydC1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvZ2F0b3IvZ2F0b3IuanMiLCJub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9taWNyb2V2ZW50L21pY3JvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvbXVzdGFjaGUvbXVzdGFjaGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3NoYTI1Ni9saWIvc2hhMjU2LmpzIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3QvbGliL2NvZmZlZXNjcmlwdC9hbmltYXRpb24uY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L2xpYi9jb2ZmZWVzY3JpcHQvcGFnZV9zcHJlYWQuY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L2xpYi9jb2ZmZWVzY3JpcHQvdmVyc28uY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanMiLCJub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3Qvbm9kZV9tb2R1bGVzL21pY3JvZXZlbnQvbWljcm9ldmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUE7O0FBQUEsSUFBMkIs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pKQTtBQ0FBLElBQUE7O0FBQUEsTUFBTSxDQUFDLE9BQVAsR0FBdUI7RUFDTixtQkFBQyxFQUFEO0lBQUMsSUFBQyxDQUFBLEtBQUQ7SUFDVixJQUFDLENBQUEsR0FBRCxHQUFPO0FBRVA7RUFIUzs7c0JBS2IsT0FBQSxHQUFTLFNBQUMsT0FBRCxFQUFlLFFBQWY7QUFDTCxRQUFBOztNQURNLFVBQVU7OztNQUFJLFdBQVcsU0FBQSxHQUFBOztJQUMvQixDQUFBLHFDQUFnQjtJQUNoQixDQUFBLHVDQUFnQjtJQUNoQixLQUFBLDJDQUF3QjtJQUN4QixNQUFBLDRDQUEwQjtJQUMxQixRQUFBLDhDQUE4QjtJQUM5QixHQUFBLEdBQU0sRUFBRSxJQUFDLENBQUE7SUFDVCxTQUFBLEdBQVksY0FBQSxHQUFlLENBQWYsR0FBaUIsSUFBakIsR0FBcUIsQ0FBckIsR0FBdUIsaUJBQXZCLEdBQXdDLEtBQXhDLEdBQThDLElBQTlDLEdBQWtELEtBQWxELEdBQXdEO0lBRXBFLElBQUcsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBVixLQUF1QixTQUExQjtNQUNJLFFBQUEsQ0FBQSxFQURKO0tBQUEsTUFFSyxJQUFHLFFBQUEsR0FBVyxDQUFkO01BQ0QsYUFBQSxHQUFnQixDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7VUFDWixJQUFVLEdBQUEsS0FBUyxLQUFDLENBQUEsR0FBcEI7QUFBQSxtQkFBQTs7VUFFQSxLQUFDLENBQUEsRUFBRSxDQUFDLG1CQUFKLENBQXdCLGVBQXhCLEVBQXlDLGFBQXpDO1VBQ0EsS0FBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVixHQUF1QjtVQUV2QixRQUFBLENBQUE7UUFOWTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7TUFVaEIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxnQkFBSixDQUFxQixlQUFyQixFQUFzQyxhQUF0QyxFQUFxRCxLQUFyRDtNQUVBLElBQUMsQ0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVYsR0FBdUIsWUFBQSxHQUFhLE1BQWIsR0FBb0IsR0FBcEIsR0FBdUIsUUFBdkIsR0FBZ0M7TUFDdkQsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBVixHQUFzQixVQWRyQjtLQUFBLE1BQUE7TUFnQkQsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVixHQUF1QjtNQUN2QixJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFWLEdBQXNCO01BRXRCLFFBQUEsQ0FBQSxFQW5CQzs7V0FxQkw7RUFoQ0s7Ozs7Ozs7O0FDTmIsSUFBQTs7QUFBQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtFQUNOLG9CQUFDLEVBQUQsRUFBTSxPQUFOO0lBQUMsSUFBQyxDQUFBLEtBQUQ7SUFBSyxJQUFDLENBQUEsNEJBQUQsVUFBVztJQUMxQixJQUFDLENBQUEsVUFBRCxHQUFjO0lBQ2QsSUFBQyxDQUFBLFVBQUQsR0FBYztJQUNkLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsRUFBRCxHQUFNLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDZixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDakIsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQ3BCLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUNsQixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFDakIsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsSUFBQyxDQUFBLE9BQU8sQ0FBQztBQUV6QjtFQVhTOzt1QkFhYixVQUFBLEdBQVksU0FBQTtXQUNSLElBQUMsQ0FBQSxlQUFELENBQUEsQ0FBQSxHQUFxQixDQUFyQixJQUEyQixJQUFDLENBQUEsS0FBRCxDQUFBLENBQVEsQ0FBQyxZQUFULENBQXNCLGVBQXRCLENBQUEsS0FBNEM7RUFEL0Q7O3VCQUdaLFlBQUEsR0FBYyxTQUFBO1dBQ1YsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFRLENBQUMsU0FBUyxDQUFDLFFBQW5CLENBQTRCLG1CQUE1QjtFQURVOzt1QkFHZCxLQUFBLEdBQU8sU0FBQTtXQUNILElBQUMsQ0FBQTtFQURFOzt1QkFHUCxhQUFBLEdBQWUsU0FBQTtXQUNYLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBUSxDQUFDLGdCQUFULENBQTBCLGlCQUExQjtFQURXOzt1QkFHZixVQUFBLEdBQVksU0FBQTtXQUNSLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBUSxDQUFDLGdCQUFULENBQTBCLGNBQTFCO0VBRFE7O3VCQUdaLE9BQUEsR0FBUyxTQUFBO1dBQ0wsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFRLENBQUMscUJBQVQsQ0FBQTtFQURLOzt1QkFHVCxjQUFBLEdBQWdCLFNBQUE7QUFDWixRQUFBO0lBQUEsSUFBQSxHQUNJO01BQUEsR0FBQSxFQUFLLElBQUw7TUFDQSxJQUFBLEVBQU0sSUFETjtNQUVBLEtBQUEsRUFBTyxJQUZQO01BR0EsTUFBQSxFQUFRLElBSFI7TUFJQSxLQUFBLEVBQU8sSUFKUDtNQUtBLE1BQUEsRUFBUSxJQUxSOztBQU9KO0FBQUEsU0FBQSxxQ0FBQTs7TUFDSSxRQUFBLEdBQ0k7UUFBQSxHQUFBLEVBQUssTUFBTSxDQUFDLFNBQVo7UUFDQSxJQUFBLEVBQU0sTUFBTSxDQUFDLFVBRGI7UUFFQSxLQUFBLEVBQU8sTUFBTSxDQUFDLFdBRmQ7UUFHQSxNQUFBLEVBQVEsTUFBTSxDQUFDLFlBSGY7O01BS0osSUFBMkIsUUFBUSxDQUFDLEdBQVQsR0FBZSxJQUFJLENBQUMsR0FBcEIsSUFBK0Isa0JBQTFEO1FBQUEsSUFBSSxDQUFDLEdBQUwsR0FBVyxRQUFRLENBQUMsSUFBcEI7O01BQ0EsSUFBNkIsUUFBUSxDQUFDLElBQVQsR0FBZ0IsSUFBSSxDQUFDLElBQXJCLElBQWlDLG1CQUE5RDtRQUFBLElBQUksQ0FBQyxJQUFMLEdBQVksUUFBUSxDQUFDLEtBQXJCOztNQUNBLElBQStCLFFBQVEsQ0FBQyxLQUFULEdBQWlCLElBQUksQ0FBQyxLQUF0QixJQUFtQyxvQkFBbEU7UUFBQSxJQUFJLENBQUMsS0FBTCxHQUFhLFFBQVEsQ0FBQyxNQUF0Qjs7TUFDQSxJQUFpQyxRQUFRLENBQUMsTUFBVCxHQUFrQixJQUFJLENBQUMsTUFBdkIsSUFBcUMscUJBQXRFO1FBQUEsSUFBSSxDQUFDLE1BQUwsR0FBYyxRQUFRLENBQUMsT0FBdkI7O0FBVko7SUFZQSxJQUFJLENBQUMsR0FBTCxzQ0FBc0I7SUFDdEIsSUFBSSxDQUFDLElBQUwsdUNBQXdCO0lBQ3hCLElBQUksQ0FBQyxLQUFMLHdDQUEwQjtJQUMxQixJQUFJLENBQUMsTUFBTCx5Q0FBNEI7SUFDNUIsSUFBSSxDQUFDLEtBQUwsR0FBYSxJQUFJLENBQUMsS0FBTCxHQUFhLElBQUksQ0FBQztJQUMvQixJQUFJLENBQUMsTUFBTCxHQUFjLElBQUksQ0FBQyxNQUFMLEdBQWMsSUFBSSxDQUFDO1dBRWpDO0VBNUJZOzt1QkE4QmhCLEtBQUEsR0FBTyxTQUFBO1dBQ0gsSUFBQyxDQUFBO0VBREU7O3VCQUdQLE9BQUEsR0FBUyxTQUFBO1dBQ0wsSUFBQyxDQUFBO0VBREk7O3VCQUdULFVBQUEsR0FBWSxTQUFBO1dBQ1IsSUFBQyxDQUFBO0VBRE87O3VCQUdaLFFBQUEsR0FBVSxTQUFBO1dBQ04sSUFBQyxDQUFBO0VBREs7O3VCQUdWLE9BQUEsR0FBUyxTQUFBO1dBQ0wsSUFBQyxDQUFBO0VBREk7O3VCQUdULGVBQUEsR0FBaUIsU0FBQTtXQUNiLElBQUMsQ0FBQTtFQURZOzt1QkFHakIsYUFBQSxHQUFlLFNBQUE7V0FDWCxJQUFDLENBQUE7RUFEVTs7dUJBR2YsYUFBQSxHQUFlLFNBQUMsVUFBRDtJQUNYLElBQUcsSUFBQyxDQUFBLFVBQUQsS0FBaUIsVUFBcEI7TUFDSSxJQUFDLENBQUEsS0FBRCxDQUFBLENBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixHQUE0QixVQUFBLEtBQWMsU0FBakIsR0FBZ0MsT0FBaEMsR0FBNkM7TUFFdEUsSUFBQyxDQUFBLFVBQUQsR0FBYyxXQUhsQjs7V0FLQTtFQU5XOzt1QkFRZixRQUFBLEdBQVUsU0FBQTtJQUNOLElBQUcsSUFBQyxDQUFBLFVBQUQsS0FBZSxLQUFsQjtNQUNJLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBUSxDQUFDLEtBQUssQ0FBQyxJQUFmLEdBQXdCLENBQUMsSUFBQyxDQUFBLE9BQUQsQ0FBQSxDQUFELENBQUEsR0FBWTtNQUVwQyxJQUFDLENBQUEsVUFBRCxHQUFjLEtBSGxCOztXQUtBO0VBTk07O3VCQVFWLFFBQUEsR0FBVSxTQUFBO0lBQ04sSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBUSxDQUFDLFlBQVQsQ0FBc0IsYUFBdEIsRUFBcUMsSUFBQyxDQUFBLE1BQXRDO0VBRk07O3VCQU1WLFVBQUEsR0FBWSxTQUFBO0lBQ1IsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBUSxDQUFDLFlBQVQsQ0FBc0IsYUFBdEIsRUFBcUMsSUFBQyxDQUFBLE1BQXRDO0VBRlE7Ozs7Ozs7O0FDekdoQixJQUFBOztBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsVUFBUjs7QUFDVCxVQUFBLEdBQWEsT0FBQSxDQUFRLFlBQVI7O0FBQ2IsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSOztBQUNiLFNBQUEsR0FBWSxPQUFBLENBQVEsYUFBUjs7QUFFTjtFQUNXLGVBQUMsR0FBRCxFQUFNLFFBQU47QUFDVCxRQUFBO0lBRFUsSUFBQyxDQUFBLEtBQUQ7SUFBSyxJQUFDLENBQUEsNkJBQUQsV0FBVztJQUMxQixJQUFDLENBQUEsYUFBRCxzREFBMEM7SUFDMUMsSUFBQyxDQUFBLGNBQUQseURBQTRDO0lBQzVDLElBQUMsQ0FBQSxrQkFBRCw2REFBb0Q7SUFDcEQsSUFBQyxDQUFBLHFCQUFELGdFQUEwRDtJQUMxRCxJQUFDLENBQUEsWUFBRCx1REFBd0M7SUFFeEMsSUFBQyxDQUFBLFFBQUQsR0FBWSxDQUFDO0lBQ2IsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUNaLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFDWCxJQUFDLENBQUEsU0FBRCxHQUFhO01BQUEsSUFBQSxFQUFNLENBQU47TUFBUyxHQUFBLEVBQUssQ0FBZDtNQUFpQixLQUFBLEVBQU8sQ0FBeEI7O0lBQ2IsSUFBQyxDQUFBLGNBQUQsR0FBa0I7TUFBQSxJQUFBLEVBQU0sQ0FBTjtNQUFTLEdBQUEsRUFBSyxDQUFkO01BQWlCLEtBQUEsRUFBTyxDQUF4Qjs7SUFDbEIsSUFBQyxDQUFBLEdBQUQsR0FDSTtNQUFBLEtBQUEsRUFBTyxDQUFQO01BQ0EsS0FBQSxFQUFPLEdBRFA7TUFFQSxPQUFBLEVBQVMsSUFGVDs7SUFJSixJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxFQUFFLENBQUMsYUFBSixDQUFrQixrQkFBbEI7SUFDZCxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFDLENBQUEsRUFBRSxDQUFDLGdCQUFKLENBQXFCLHFCQUFyQjtJQUNqQixJQUFDLENBQUEsV0FBRCxHQUFlLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixJQUFDLENBQUEsYUFBdEI7SUFDZixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLFdBQWY7SUFDWCxJQUFDLENBQUEsU0FBRCxHQUFhLElBQUksU0FBSixDQUFjLElBQUMsQ0FBQSxVQUFmO0lBQ2IsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFJLE1BQU0sQ0FBQyxPQUFYLENBQW1CLElBQUMsQ0FBQSxVQUFwQixFQUNOO01BQUEsY0FBQSxFQUFnQixJQUFoQjtNQUNBLFdBQUEsRUFBYSxPQURiO01BRUEsTUFBQSxFQUFRLEtBRlI7TUFJQSxVQUFBLEVBQWUsY0FBQSxJQUFrQixNQUFyQixHQUFpQyxNQUFNLENBQUMsVUFBeEMsR0FBd0QsSUFKcEU7S0FETTtJQU9WLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUFZLElBQUksTUFBTSxDQUFDLEdBQVgsQ0FBZTtNQUFBLFNBQUEsRUFBVyxNQUFNLENBQUMsYUFBbEI7S0FBZixDQUFaO0lBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQVksSUFBSSxNQUFNLENBQUMsR0FBWCxDQUFlO01BQUEsS0FBQSxFQUFPLFdBQVA7TUFBb0IsUUFBQSxFQUFVLENBQTlCO0tBQWYsQ0FBWjtJQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUFZLElBQUksTUFBTSxDQUFDLEtBQVgsQ0FBQSxDQUFaO0lBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQVksSUFBSSxNQUFNLENBQUMsS0FBWCxDQUFpQjtNQUFBLElBQUEsRUFBTSxHQUFOO0tBQWpCLENBQVo7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxVQUFYLEVBQXVCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsQ0FBdkI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxTQUFYLEVBQXNCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQWQsQ0FBdEI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBckI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxXQUFYLEVBQXdCLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBeEI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxXQUFYLEVBQXdCLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFnQixJQUFoQixDQUF4QjtJQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsRUFBUixDQUFXLFlBQVgsRUFBeUIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLElBQWpCLENBQXpCO0lBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxFQUFSLENBQVcsV0FBWCxFQUF3QixJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBeEI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxVQUFYLEVBQXVCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsQ0FBdkI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxhQUFYLEVBQTBCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsQ0FBMUI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLElBQVosQ0FBcEI7QUFFQTtFQTVDUzs7a0JBOENiLEtBQUEsR0FBTyxTQUFBO0FBQ0gsUUFBQTtJQUFBLE1BQUEscUZBQTZEO0lBRTdELElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUFZO01BQUEsTUFBQSxFQUFRLElBQVI7S0FBWjtJQUNBLElBQUMsQ0FBQSxVQUFELENBQVksTUFBWixFQUFvQjtNQUFBLFFBQUEsRUFBVSxDQUFWO0tBQXBCO0lBRUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsSUFBYjtJQUNsQixJQUFDLENBQUEsa0JBQUQsR0FBc0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLElBQWpCO0lBRXRCLElBQUMsQ0FBQSxFQUFFLENBQUMsZ0JBQUosQ0FBcUIsWUFBckIsRUFBbUMsSUFBQyxDQUFBLGtCQUFwQyxFQUF3RCxLQUF4RDtJQUVBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxJQUFDLENBQUEsY0FBbkMsRUFBbUQsS0FBbkQ7V0FFQTtFQWJHOztrQkFlUCxPQUFBLEdBQVMsU0FBQTtJQUNMLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBUixDQUFBO0lBRUEsSUFBQyxDQUFBLEVBQUUsQ0FBQyxtQkFBSixDQUF3QixZQUF4QixFQUFzQyxJQUFDLENBQUEsa0JBQXZDO0lBRUEsTUFBTSxDQUFDLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLElBQUMsQ0FBQSxjQUF0QztXQUVBO0VBUEs7O2tCQVNULEtBQUEsR0FBTyxTQUFDLE9BQUQ7V0FDSCxJQUFDLENBQUEsVUFBRCxDQUFZLENBQVosRUFBZSxPQUFmO0VBREc7O2tCQUdQLElBQUEsR0FBTSxTQUFDLE9BQUQ7V0FDRixJQUFDLENBQUEsVUFBRCxDQUFZLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBQSxHQUFpQixDQUE3QixFQUFnQyxPQUFoQztFQURFOztrQkFHTixJQUFBLEdBQU0sU0FBQyxPQUFEO1dBQ0YsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFDLENBQUEsV0FBRCxDQUFBLENBQUEsR0FBaUIsQ0FBN0IsRUFBZ0MsT0FBaEM7RUFERTs7a0JBR04sSUFBQSxHQUFNLFNBQUMsT0FBRDtXQUNGLElBQUMsQ0FBQSxVQUFELENBQVksSUFBQyxDQUFBLGtCQUFELENBQUEsQ0FBQSxHQUF3QixDQUFwQyxFQUF1QyxPQUF2QztFQURFOztrQkFHTixVQUFBLEdBQVksU0FBQyxRQUFELEVBQVcsT0FBWDtBQUNSLFFBQUE7O01BRG1CLFVBQVU7O0lBQzdCLElBQVUsUUFBQSxHQUFXLENBQVgsSUFBZ0IsUUFBQSxHQUFXLElBQUMsQ0FBQSxrQkFBRCxDQUFBLENBQUEsR0FBd0IsQ0FBN0Q7QUFBQSxhQUFBOztJQUVBLGVBQUEsR0FBa0IsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUNsQixpQkFBQSxHQUFvQixJQUFDLENBQUEseUJBQUQsQ0FBMkIsZUFBM0I7SUFDcEIsZ0JBQUEsR0FBbUIsSUFBQyxDQUFBLHlCQUFELENBQTJCLFFBQTNCO0lBQ25CLFFBQUEsR0FBVyxJQUFDLENBQUEseUJBQUQsQ0FBMkIsZ0JBQTNCO0lBQ1gsUUFBQSw0Q0FBOEI7SUFDOUIsUUFBQSw4Q0FBOEIsSUFBQyxDQUFBO0lBQy9CLFFBQUEsR0FBVyxRQUFBLEdBQVcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxRQUFUO0lBQ3RCLFdBQUEsR0FBaUIsZ0JBQWdCLENBQUMsWUFBakIsQ0FBQSxDQUFILEdBQXdDLE9BQXhDLEdBQXFEO0lBRW5FLElBQWtDLHlCQUFsQztNQUFBLGlCQUFpQixDQUFDLFVBQWxCLENBQUEsRUFBQTs7SUFDQSxnQkFBZ0IsQ0FBQyxRQUFqQixDQUFBO0lBRUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFqQixDQUF5QixTQUFDLFVBQUQ7YUFBZ0IsVUFBVSxDQUFDLFFBQVgsQ0FBQSxDQUFxQixDQUFDLGFBQXRCLENBQW9DLFNBQXBDO0lBQWhCLENBQXpCO0lBRUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQVk7TUFBQSxXQUFBLEVBQWEsV0FBYjtLQUFaO0lBRUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLEdBQWtCLElBQUMsQ0FBQSw4QkFBRCxDQUFnQyxRQUFoQyxFQUEwQyxnQkFBMUM7SUFDbEIsSUFBQyxDQUFBLFdBQUQsQ0FBYSxRQUFiO0lBRUEsSUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FBbUIsQ0FBdEI7TUFDSSxJQUFDLENBQUEsU0FBUyxDQUFDLEdBQVgsR0FBaUI7TUFDakIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLEdBQW1CO01BRW5CLElBQUMsQ0FBQSxPQUFELENBQVMsV0FBVCxFQUFzQjtRQUFBLFFBQUEsRUFBVSxlQUFWO09BQXRCLEVBSko7O0lBTUEsSUFBQyxDQUFBLE9BQUQsQ0FBUyxrQkFBVCxFQUNJO01BQUEsZUFBQSxFQUFpQixlQUFqQjtNQUNBLFdBQUEsRUFBYSxRQURiO0tBREo7SUFJQSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FDSTtNQUFBLENBQUEsRUFBTSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVosR0FBaUIsR0FBdEI7TUFDQSxRQUFBLEVBQVUsUUFEVjtLQURKLEVBR0UsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ0UsUUFBQSxHQUFXLEtBQUMsQ0FBQSx5QkFBRCxDQUEyQixLQUFDLENBQUEsbUJBQUQsQ0FBQSxDQUEzQjtRQUVYLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBZCxDQUFzQixTQUFDLFVBQUQ7aUJBQWdCLFVBQVUsQ0FBQyxhQUFYLENBQXlCLE1BQXpCO1FBQWhCLENBQXRCO1FBRUEsS0FBQyxDQUFBLE9BQUQsQ0FBUyxpQkFBVCxFQUNJO1VBQUEsV0FBQSxFQUFhLEtBQUMsQ0FBQSxXQUFELENBQUEsQ0FBYjtVQUNBLGdCQUFBLEVBQWtCLGVBRGxCO1NBREo7TUFMRjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FIRjtFQWhDUTs7a0JBZ0RaLFdBQUEsR0FBYSxTQUFBO1dBQ1QsSUFBQyxDQUFBO0VBRFE7O2tCQUdiLFdBQUEsR0FBYSxTQUFDLFFBQUQ7SUFDVCxJQUFDLENBQUEsUUFBRCxHQUFZO1dBRVo7RUFIUzs7a0JBS2IsOEJBQUEsR0FBZ0MsU0FBQyxRQUFELEVBQVcsVUFBWDtBQUM1QixRQUFBO0lBQUEsSUFBQSxHQUFPO0lBRVAsSUFBRyxRQUFBLEtBQVksSUFBQyxDQUFBLGtCQUFELENBQUEsQ0FBQSxHQUF3QixDQUF2QztNQUNJLElBQUEsR0FBTyxDQUFDLEdBQUEsR0FBTSxVQUFVLENBQUMsUUFBWCxDQUFBLENBQVAsQ0FBQSxHQUFnQyxVQUFVLENBQUMsT0FBWCxDQUFBLEVBRDNDO0tBQUEsTUFFSyxJQUFHLFFBQUEsR0FBVyxDQUFkO01BQ0QsSUFBQSxHQUFPLENBQUMsR0FBQSxHQUFNLFVBQVUsQ0FBQyxRQUFYLENBQUEsQ0FBUCxDQUFBLEdBQWdDLENBQWhDLEdBQW9DLFVBQVUsQ0FBQyxPQUFYLENBQUEsRUFEMUM7O1dBR0w7RUFSNEI7O2tCQVVoQyx5QkFBQSxHQUEyQixTQUFDLGlCQUFEO0FBQ3ZCLFFBQUE7SUFBQSxRQUFBLEdBQ0k7TUFBQSxPQUFBLEVBQVMsRUFBVDtNQUNBLElBQUEsRUFBTSxFQUROOztJQUlKLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFxQixTQUFDLFVBQUQ7QUFDakIsVUFBQTtNQUFBLE9BQUEsR0FBVTtNQUVWLElBQUcsVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQUFBLElBQXdCLGlCQUFpQixDQUFDLE9BQWxCLENBQUEsQ0FBM0I7UUFDSSxJQUFrQixVQUFVLENBQUMsT0FBWCxDQUFBLENBQUEsR0FBdUIsVUFBVSxDQUFDLFFBQVgsQ0FBQSxDQUF2QixHQUErQyxpQkFBaUIsQ0FBQyxPQUFsQixDQUFBLENBQUEsR0FBOEIsR0FBL0Y7VUFBQSxPQUFBLEdBQVUsS0FBVjtTQURKO09BQUEsTUFBQTtRQUdJLElBQWtCLFVBQVUsQ0FBQyxPQUFYLENBQUEsQ0FBQSxHQUF1QixVQUFVLENBQUMsUUFBWCxDQUFBLENBQXZCLEdBQStDLGlCQUFpQixDQUFDLE9BQWxCLENBQUEsQ0FBQSxHQUE4QixHQUEvRjtVQUFBLE9BQUEsR0FBVSxLQUFWO1NBSEo7O01BS0EsSUFBRyxPQUFBLEtBQVcsSUFBZDtRQUNJLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBakIsQ0FBc0IsVUFBdEIsRUFESjtPQUFBLE1BQUE7UUFHSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQWQsQ0FBbUIsVUFBbkIsRUFISjs7SUFSaUIsQ0FBckI7V0FlQTtFQXJCdUI7O2tCQXVCM0IsbUJBQUEsR0FBcUIsU0FBQyxHQUFEO0FBQ2pCLFFBQUE7SUFBQSxXQUFBLEdBQWM7SUFDZCxJQUFBLEdBQU87QUFFUCxTQUFBLHFDQUFBOztNQUNJLEVBQUEsR0FBSyxFQUFFLENBQUMsWUFBSCxDQUFnQixTQUFoQjtNQUNMLElBQUEsR0FBTyxFQUFFLENBQUMsWUFBSCxDQUFnQixXQUFoQjtNQUNQLE9BQUEsR0FBVSxFQUFFLENBQUMsWUFBSCxDQUFnQixlQUFoQjtNQUNWLE9BQUEsR0FBYSxlQUFILEdBQWlCLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxDQUFrQixDQUFDLEdBQW5CLENBQXVCLFNBQUMsQ0FBRDtlQUFPO01BQVAsQ0FBdkIsQ0FBakIsR0FBc0Q7TUFDaEUsWUFBQSxHQUFlLEVBQUUsQ0FBQyxZQUFILENBQWdCLHFCQUFoQjtNQUNmLFlBQUEsR0FBa0Isb0JBQUgsR0FBc0IsQ0FBQyxZQUF2QixHQUF5QztNQUN4RCxLQUFBLEdBQVEsRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsWUFBaEI7TUFDUixLQUFBLEdBQVcsYUFBSCxHQUFlLENBQUMsS0FBaEIsR0FBMkI7TUFDbkMsVUFBQSxHQUFhLElBQUksVUFBSixDQUFlLEVBQWYsRUFDVDtRQUFBLEVBQUEsRUFBSSxFQUFKO1FBQ0EsSUFBQSxFQUFNLElBRE47UUFFQSxPQUFBLEVBQVMsT0FGVDtRQUdBLFlBQUEsRUFBYyxZQUhkO1FBSUEsS0FBQSxFQUFPLEtBSlA7UUFLQSxJQUFBLEVBQU0sSUFMTjtPQURTO01BUWIsSUFBQSxJQUFRO01BRVIsV0FBVyxDQUFDLElBQVosQ0FBaUIsVUFBakI7QUFuQko7V0FxQkE7RUF6QmlCOztrQkEyQnJCLFlBQUEsR0FBYyxTQUFDLFdBQUQ7QUFDVixRQUFBO0lBQUEsT0FBQSxHQUFVO0lBRVYsV0FBVyxDQUFDLE9BQVosQ0FBb0IsU0FBQyxVQUFELEVBQWEsQ0FBYjtNQUNoQixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUEzQixDQUFtQyxTQUFDLE1BQUQ7UUFDL0IsT0FBUSxDQUFBLE1BQUEsQ0FBUixHQUFrQjtNQURhLENBQW5DO0lBRGdCLENBQXBCO1dBUUE7RUFYVTs7a0JBYWQseUJBQUEsR0FBMkIsU0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLEVBQVA7QUFDdkIsUUFBQTtJQUFBLElBQUEsR0FBTyxFQUFFLENBQUMscUJBQUgsQ0FBQTtXQUVQLENBQUEsSUFBSyxJQUFJLENBQUMsSUFBVixJQUFtQixDQUFBLElBQUssSUFBSSxDQUFDLEtBQTdCLElBQXVDLENBQUEsSUFBSyxJQUFJLENBQUMsR0FBakQsSUFBeUQsQ0FBQSxJQUFLLElBQUksQ0FBQztFQUg1Qzs7a0JBSzNCLGlCQUFBLEdBQW1CLFNBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxVQUFQO0FBQ2YsUUFBQTtJQUFBLElBQUEsR0FDSTtNQUFBLENBQUEsRUFBRyxDQUFIO01BQ0EsQ0FBQSxFQUFHLENBREg7TUFFQSxRQUFBLEVBQVUsQ0FGVjtNQUdBLFFBQUEsRUFBVSxDQUhWO01BSUEsS0FBQSxFQUFPLENBSlA7TUFLQSxLQUFBLEVBQU8sQ0FMUDtNQU1BLFVBQUEsRUFBWSxFQU5aO01BT0EsTUFBQSxFQUFRLElBUFI7TUFRQSxnQkFBQSxFQUFrQixLQVJsQjtNQVNBLGdCQUFBLEVBQWtCLEtBVGxCO01BVUEsZUFBQSxFQUFpQixLQVZqQjs7SUFXSixXQUFBLEdBQWMsVUFBVSxDQUFDLGNBQVgsQ0FBQTtJQUNkLFVBQUEsR0FBYSxVQUFVLENBQUMsYUFBWCxDQUFBO0lBQ2IsT0FBQSxHQUFVLFVBQVUsQ0FBQyxVQUFYLENBQUE7QUFFVixTQUFBLDRDQUFBOztNQUNJLElBQWtDLElBQUMsQ0FBQSx5QkFBRCxDQUEyQixDQUEzQixFQUE4QixDQUE5QixFQUFpQyxTQUFqQyxDQUFsQztRQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBaEIsQ0FBcUIsU0FBckIsRUFBQTs7QUFESjtBQUdBLFNBQUEsMkNBQUE7O01BQ0ksSUFBRyxJQUFDLENBQUEseUJBQUQsQ0FBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsTUFBakMsQ0FBSDtRQUNJLElBQUksQ0FBQyxNQUFMLEdBQWM7QUFDZCxjQUZKOztBQURKO0lBS0EsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsQ0FBQyxDQUFBLEdBQUksV0FBVyxDQUFDLElBQWpCLENBQUEsR0FBeUIsSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULEVBQVksV0FBVyxDQUFDLEtBQXhCO0lBQ3pDLElBQUksQ0FBQyxRQUFMLEdBQWdCLENBQUMsQ0FBQSxHQUFJLFdBQVcsQ0FBQyxHQUFqQixDQUFBLEdBQXdCLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFZLFdBQVcsQ0FBQyxNQUF4QjtJQUV4QyxJQUFHLG1CQUFIO01BQ0ksSUFBSSxDQUFDLGdCQUFMLEdBQXdCLElBQUksQ0FBQyxRQUFMLElBQWlCLENBQWpCLElBQXVCLElBQUksQ0FBQyxRQUFMLElBQWlCO01BQ2hFLElBQUksQ0FBQyxnQkFBTCxHQUF3QixJQUFJLENBQUMsUUFBTCxJQUFpQixDQUFqQixJQUF1QixJQUFJLENBQUMsUUFBTCxJQUFpQjtNQUNoRSxJQUFJLENBQUMsZUFBTCxHQUF1QixJQUFJLENBQUMsZ0JBQUwsSUFBMEIsSUFBSSxDQUFDLGlCQUgxRDs7V0FLQTtFQWpDZTs7a0JBbUNuQixrQkFBQSxHQUFvQixTQUFBO1dBQ2hCLElBQUMsQ0FBQSxXQUFXLENBQUM7RUFERzs7a0JBR3BCLG1CQUFBLEdBQXFCLFNBQUE7V0FDakIsSUFBQyxDQUFBLHlCQUFELENBQTJCLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBM0I7RUFEaUI7O2tCQUdyQix5QkFBQSxHQUEyQixTQUFDLFFBQUQ7V0FDdkIsSUFBQyxDQUFBLFdBQVksQ0FBQSxRQUFBO0VBRFU7O2tCQUczQiwrQkFBQSxHQUFpQyxTQUFDLE1BQUQ7QUFDN0IsUUFBQTtBQUFBO0FBQUEsU0FBQSxpREFBQTs7TUFDSSxJQUFjLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQTNCLENBQW1DLE1BQW5DLENBQUEsR0FBNkMsQ0FBQyxDQUE1RDtBQUFBLGVBQU8sSUFBUDs7QUFESjtFQUQ2Qjs7a0JBSWpDLG1CQUFBLEdBQXFCLFNBQUMsVUFBRDtBQUNqQixRQUFBO0lBQUEsY0FBQSxHQUFpQixVQUFVLENBQUMsT0FBWCxDQUFBO0lBQ2pCLHFCQUFBLEdBQXdCLFVBQVUsQ0FBQyxjQUFYLENBQUE7V0FFeEI7TUFBQSxJQUFBLEVBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUF0QixHQUE2QixjQUFjLENBQUMsSUFBN0MsQ0FBQSxHQUFxRCxjQUFjLENBQUMsS0FBcEUsR0FBNEUsR0FBbEY7TUFDQSxHQUFBLEVBQUssQ0FBQyxxQkFBcUIsQ0FBQyxHQUF0QixHQUE0QixjQUFjLENBQUMsR0FBNUMsQ0FBQSxHQUFtRCxjQUFjLENBQUMsTUFBbEUsR0FBMkUsR0FEaEY7TUFFQSxLQUFBLEVBQU8scUJBQXFCLENBQUMsS0FBdEIsR0FBOEIsY0FBYyxDQUFDLEtBQTdDLEdBQXFELEdBRjVEO01BR0EsTUFBQSxFQUFRLHFCQUFxQixDQUFDLE1BQXRCLEdBQStCLGNBQWMsQ0FBQyxNQUE5QyxHQUF1RCxHQUgvRDtNQUlBLGNBQUEsRUFBZ0IsY0FKaEI7TUFLQSxxQkFBQSxFQUF1QixxQkFMdkI7O0VBSmlCOztrQkFXckIsY0FBQSxHQUFnQixTQUFDLFVBQUQsRUFBYSxLQUFiLEVBQW9CLElBQXBCLEVBQTBCLE1BQTFCO0lBQ1osSUFBRyxJQUFBLEdBQU8sS0FBUCxHQUFlLEdBQWxCO01BQ0ksVUFBQSxHQUFhLE1BQUEsR0FBUyxDQUFDLEtBQVYsR0FBa0IsRUFBbEIsR0FBdUIsQ0FBQyxJQUFBLEdBQU8sS0FBUCxHQUFlLENBQWhCLEVBRHhDO0tBQUEsTUFBQTtNQUdJLFVBQUEsR0FBYSxJQUFJLENBQUMsR0FBTCxDQUFTLFVBQVQsRUFBcUIsTUFBQSxHQUFTLENBQUMsS0FBL0I7TUFDYixVQUFBLEdBQWEsSUFBSSxDQUFDLEdBQUwsQ0FBUyxVQUFULEVBQXFCLE1BQUEsR0FBUyxDQUFDLEtBQVYsR0FBa0IsSUFBQSxHQUFPLEtBQXpCLEdBQWlDLEdBQXRELEVBSmpCOztXQU1BO0VBUFk7O2tCQVNoQixNQUFBLEdBQVEsU0FBQyxPQUFELEVBQWUsUUFBZjtBQUNKLFFBQUE7O01BREssVUFBVTs7SUFDZixLQUFBLEdBQVEsT0FBTyxDQUFDO0lBQ2hCLGdCQUFBLEdBQW1CLElBQUMsQ0FBQSxtQkFBRCxDQUFBO0lBQ25CLGdCQUFBLEdBQW1CLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixnQkFBckI7SUFDbkIsY0FBQSxHQUFpQixnQkFBZ0IsQ0FBQyxPQUFqQixDQUFBO0lBQ2pCLG9CQUFBLEdBQXVCLGNBQUEsR0FBaUIsSUFBQyxDQUFBLFNBQVMsQ0FBQztJQUNuRCxDQUFBLHFDQUFnQjtJQUNoQixDQUFBLHVDQUFnQjtJQUVoQixJQUFHLEtBQUEsS0FBVyxDQUFkO01BQ0ksQ0FBQSxJQUFLLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztNQUNyQyxDQUFBLElBQUssZ0JBQWdCLENBQUMsY0FBYyxDQUFDO01BQ3JDLENBQUEsR0FBSSxDQUFBLEdBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsS0FBaEMsR0FBd0MsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFwRCxDQUFKLEdBQWlFO01BQ3JFLENBQUEsR0FBSSxDQUFBLEdBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsTUFBaEMsR0FBeUMsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFyRCxDQUFKLEdBQWtFO01BQ3RFLENBQUEsR0FBSSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0Isb0JBQWxCLEdBQXlDLENBQXpDLEdBQTZDLENBQUMsQ0FBQSxHQUFJLEtBQUosR0FBWSxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQXhCO01BQ2pELENBQUEsR0FBSSxJQUFDLENBQUEsU0FBUyxDQUFDLEdBQVgsR0FBaUIsQ0FBakIsR0FBcUIsQ0FBQyxDQUFBLEdBQUksS0FBSixHQUFZLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBeEI7TUFHekIsSUFBRyxPQUFPLENBQUMsTUFBUixLQUFvQixLQUFwQixJQUE4QixLQUFBLEdBQVEsQ0FBekM7UUFDSSxDQUFBLEdBQUksSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsQ0FBaEIsRUFBbUIsS0FBbkIsRUFBMEIsZ0JBQWdCLENBQUMsS0FBM0MsRUFBa0QsZ0JBQWdCLENBQUMsSUFBbkU7UUFDSixDQUFBLEdBQUksSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsQ0FBaEIsRUFBbUIsS0FBbkIsRUFBMEIsZ0JBQWdCLENBQUMsTUFBM0MsRUFBbUQsZ0JBQWdCLENBQUMsR0FBcEUsRUFGUjtPQVRKO0tBQUEsTUFBQTtNQWFJLENBQUEsR0FBSTtNQUNKLENBQUEsR0FBSSxFQWRSOztJQWlCQSxDQUFBLElBQUssY0FBQSxHQUFpQjtJQUV0QixJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0I7SUFDbEIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLEdBQWlCO0lBQ2pCLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQjtJQUVuQixJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FDSTtNQUFBLENBQUEsRUFBTSxDQUFELEdBQUcsR0FBUjtNQUNBLENBQUEsRUFBTSxDQUFELEdBQUcsR0FEUjtNQUVBLEtBQUEsRUFBTyxLQUZQO01BR0EsTUFBQSxFQUFRLE9BQU8sQ0FBQyxNQUhoQjtNQUlBLFFBQUEsRUFBVSxPQUFPLENBQUMsUUFKbEI7S0FESixFQU1FLFFBTkY7RUFoQ0k7O2tCQTBDUixPQUFBLEdBQVMsU0FBQTtJQUNMLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQSxFQUFFLENBQUMsZ0JBQUosQ0FBcUIscUJBQXJCO0lBQ2pCLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUMsQ0FBQSxhQUF0QjtJQUNmLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsV0FBZjtXQUVYO0VBTEs7O2tCQU9ULFFBQUEsR0FBVSxTQUFDLENBQUQ7QUFHTixRQUFBO0lBQUEsSUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsR0FBbUIsQ0FBbkIsSUFBd0IsQ0FBQyxDQUFDLENBQUMsU0FBRixLQUFlLE1BQU0sQ0FBQyxjQUF0QixJQUF3QyxDQUFDLENBQUMsU0FBRixLQUFlLE1BQU0sQ0FBQyxlQUEvRCxDQUEzQjtNQUNJLENBQUEsR0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDO01BQ2IsYUFBQSxHQUFnQjtNQUNoQixLQUFBLEdBQVEsSUFBQyxDQUFBLFVBQVUsQ0FBQztNQUdwQixJQUFHLENBQUEsR0FBSSxhQUFKLElBQXNCLENBQUEsR0FBSSxLQUFBLEdBQVEsYUFBckM7UUFDSSxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLEdBQXVCLElBQUMsQ0FBQSxTQUFTLENBQUM7UUFDbEMsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixHQUFzQixJQUFDLENBQUEsU0FBUyxDQUFDO1FBRWpDLElBQUMsQ0FBQSxPQUFELEdBQVc7UUFFWCxJQUFDLENBQUEsT0FBRCxDQUFTLFVBQVQsRUFOSjtPQU5KOztFQUhNOztrQkFtQlYsT0FBQSxHQUFTLFNBQUMsQ0FBRDtBQUNMLFFBQUE7SUFBQSxJQUFVLElBQUMsQ0FBQSxRQUFELEtBQWEsSUFBYixJQUFxQixJQUFDLENBQUEsT0FBRCxLQUFZLEtBQTNDO0FBQUEsYUFBQTs7SUFFQSxJQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQixDQUF0QjtNQUNJLGdCQUFBLEdBQW1CLElBQUMsQ0FBQSxtQkFBRCxDQUFBO01BQ25CLGNBQUEsR0FBaUIsZ0JBQWdCLENBQUMsT0FBakIsQ0FBQTtNQUNqQixvQkFBQSxHQUF1QixjQUFBLEdBQWlCLElBQUMsQ0FBQSxTQUFTLENBQUM7TUFDbkQsZ0JBQUEsR0FBbUIsSUFBQyxDQUFBLG1CQUFELENBQXFCLGdCQUFyQjtNQUNuQixLQUFBLEdBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQztNQUNuQixDQUFBLEdBQUksSUFBQyxDQUFBLGNBQWMsQ0FBQyxJQUFoQixHQUF1QixvQkFBdkIsR0FBOEMsQ0FBQyxDQUFDLE1BQUYsR0FBVyxJQUFDLENBQUEsVUFBVSxDQUFDLFdBQXZCLEdBQXFDO01BQ3ZGLENBQUEsR0FBSSxJQUFDLENBQUEsY0FBYyxDQUFDLEdBQWhCLEdBQXNCLENBQUMsQ0FBQyxNQUFGLEdBQVcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxZQUF2QixHQUFzQztNQUNoRSxDQUFBLEdBQUksSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsQ0FBaEIsRUFBbUIsS0FBbkIsRUFBMEIsZ0JBQWdCLENBQUMsS0FBM0MsRUFBa0QsZ0JBQWdCLENBQUMsSUFBbkU7TUFDSixDQUFBLEdBQUksSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsQ0FBaEIsRUFBbUIsS0FBbkIsRUFBMEIsZ0JBQWdCLENBQUMsTUFBM0MsRUFBbUQsZ0JBQWdCLENBQUMsR0FBcEU7TUFDSixDQUFBLElBQUs7TUFFTCxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0I7TUFDbEIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLEdBQWlCO01BRWpCLElBQUMsQ0FBQSxTQUFTLENBQUMsT0FBWCxDQUNJO1FBQUEsQ0FBQSxFQUFNLENBQUQsR0FBRyxHQUFSO1FBQ0EsQ0FBQSxFQUFNLENBQUQsR0FBRyxHQURSO1FBRUEsS0FBQSxFQUFPLEtBRlA7UUFHQSxNQUFBLEVBQVEsUUFIUjtPQURKLEVBZko7S0FBQSxNQUFBO01BcUJJLENBQUEsR0FBSSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsR0FBa0IsQ0FBQyxDQUFDLE1BQUYsR0FBVyxJQUFDLENBQUEsVUFBVSxDQUFDLFdBQXZCLEdBQXFDO01BRTNELElBQUMsQ0FBQSxTQUFTLENBQUMsT0FBWCxDQUNJO1FBQUEsQ0FBQSxFQUFNLENBQUQsR0FBRyxHQUFSO1FBQ0EsTUFBQSxFQUFRLFFBRFI7T0FESixFQXZCSjs7RUFISzs7a0JBZ0NULE1BQUEsR0FBUSxTQUFDLENBQUQ7QUFDSixRQUFBO0lBQUEsSUFBVSxJQUFDLENBQUEsT0FBRCxLQUFZLEtBQXRCO0FBQUEsYUFBQTs7SUFFQSxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLE9BQUQsQ0FBUyxRQUFUO0lBRUEsSUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsS0FBb0IsQ0FBcEIsSUFBMEIsSUFBQyxDQUFBLFFBQUQsS0FBYSxLQUExQztNQUNJLFFBQUEsR0FBVyxJQUFDLENBQUEsV0FBRCxDQUFBO01BQ1gsUUFBQSxHQUFXLENBQUMsQ0FBQztNQUViLElBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxRQUFULENBQUEsSUFBc0IsSUFBQyxDQUFBLGFBQTFCO1FBQ0ksSUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLENBQUMsQ0FBQyxNQUFYLENBQUEsSUFBc0IsSUFBQyxDQUFBLGNBQTFCO1VBQ0ksSUFBRyxDQUFDLENBQUMsZUFBRixLQUFxQixNQUFNLENBQUMsY0FBL0I7WUFDSSxJQUFDLENBQUEsSUFBRCxDQUNJO2NBQUEsUUFBQSxFQUFVLFFBQVY7Y0FDQSxRQUFBLEVBQVUsSUFBQyxDQUFBLHFCQURYO2FBREosRUFESjtXQUFBLE1BSUssSUFBRyxDQUFDLENBQUMsZUFBRixLQUFxQixNQUFNLENBQUMsZUFBL0I7WUFDRCxJQUFDLENBQUEsSUFBRCxDQUNJO2NBQUEsUUFBQSxFQUFVLFFBQVY7Y0FDQSxRQUFBLEVBQVUsSUFBQyxDQUFBLHFCQURYO2FBREosRUFEQztXQUxUO1NBREo7O01BV0EsSUFBRyxRQUFBLEtBQVksSUFBQyxDQUFBLFdBQUQsQ0FBQSxDQUFmO1FBQ0ksSUFBQyxDQUFBLFNBQVMsQ0FBQyxPQUFYLENBQ0k7VUFBQSxDQUFBLEVBQU0sSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFaLEdBQWlCLEdBQXRCO1VBQ0EsUUFBQSxFQUFVLElBQUMsQ0FBQSxxQkFEWDtTQURKO1FBSUEsSUFBQyxDQUFBLE9BQUQsQ0FBUyxxQkFBVCxFQUFnQztVQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsV0FBRCxDQUFBLENBQVY7U0FBaEMsRUFMSjtPQWZKOztFQU5JOztrQkE4QlIsVUFBQSxHQUFZLFNBQUMsQ0FBRDtJQUNSLElBQVUsQ0FBSSxJQUFDLENBQUEsbUJBQUQsQ0FBQSxDQUFzQixDQUFDLFVBQXZCLENBQUEsQ0FBZDtBQUFBLGFBQUE7O0lBRUEsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUNaLElBQUMsQ0FBQSxFQUFFLENBQUMsWUFBSixDQUFpQixlQUFqQixFQUFrQyxJQUFsQztJQUNBLElBQUMsQ0FBQSxjQUFjLENBQUMsS0FBaEIsR0FBd0IsSUFBQyxDQUFBLFNBQVMsQ0FBQztFQUwzQjs7a0JBU1osU0FBQSxHQUFXLFNBQUMsQ0FBRDtJQUNQLElBQVUsSUFBQyxDQUFBLFFBQUQsS0FBYSxLQUF2QjtBQUFBLGFBQUE7O0lBRUEsSUFBQyxDQUFBLE1BQUQsQ0FDSTtNQUFBLENBQUEsRUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQVo7TUFDQSxDQUFBLEVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQURaO01BRUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxjQUFjLENBQUMsS0FBaEIsR0FBd0IsQ0FBQyxDQUFDLEtBRmpDO01BR0EsTUFBQSxFQUFRLEtBSFI7TUFJQSxNQUFBLEVBQVEsUUFKUjtLQURKO0VBSE87O2tCQVlYLFFBQUEsR0FBVSxTQUFDLENBQUQ7QUFDTixRQUFBO0lBQUEsSUFBVSxJQUFDLENBQUEsUUFBRCxLQUFhLEtBQXZCO0FBQUEsYUFBQTs7SUFFQSxnQkFBQSxHQUFtQixJQUFDLENBQUEsbUJBQUQsQ0FBQTtJQUNuQixZQUFBLEdBQWUsZ0JBQWdCLENBQUMsZUFBakIsQ0FBQTtJQUNmLEtBQUEsR0FBUSxJQUFJLENBQUMsR0FBTCxDQUFTLENBQVQsRUFBWSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBcEIsRUFBMkIsWUFBM0IsQ0FBWjtJQUNSLFFBQUEsR0FBVyxJQUFDLENBQUEsV0FBRCxDQUFBO0lBRVgsSUFBRyxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLEtBQXlCLENBQXpCLElBQStCLEtBQUEsR0FBUSxDQUExQztNQUNJLElBQUMsQ0FBQSxPQUFELENBQVMsVUFBVCxFQUFxQjtRQUFBLFFBQUEsRUFBVSxRQUFWO09BQXJCLEVBREo7S0FBQSxNQUVLLElBQUcsSUFBQyxDQUFBLGNBQWMsQ0FBQyxLQUFoQixHQUF3QixDQUF4QixJQUE4QixLQUFBLEtBQVMsQ0FBMUM7TUFDRCxJQUFDLENBQUEsT0FBRCxDQUFTLFdBQVQsRUFBc0I7UUFBQSxRQUFBLEVBQVUsUUFBVjtPQUF0QixFQURDOztJQUdMLElBQUMsQ0FBQSxNQUFELENBQ0k7TUFBQSxDQUFBLEVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFaO01BQ0EsQ0FBQSxFQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FEWjtNQUVBLEtBQUEsRUFBTyxLQUZQO01BR0EsUUFBQSxFQUFVLElBQUMsQ0FBQSxZQUhYO0tBREosRUFLRSxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDRSxLQUFDLENBQUEsUUFBRCxHQUFZO1FBQ1osS0FBQyxDQUFBLEVBQUUsQ0FBQyxZQUFKLENBQWlCLGVBQWpCLEVBQWtDLEtBQWxDO01BRkY7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTEY7RUFiTTs7a0JBMEJWLEtBQUEsR0FBTyxTQUFDLENBQUQ7SUFDSCxJQUFDLENBQUEsT0FBRCxDQUFTLFNBQVQsRUFBb0IsSUFBQyxDQUFBLGlCQUFELENBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBNUIsRUFBK0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUF4QyxFQUEyQyxJQUFDLENBQUEsbUJBQUQsQ0FBQSxDQUEzQyxDQUFwQjtFQURHOztrQkFLUCxTQUFBLEdBQVcsU0FBQyxDQUFEO0FBQ1AsUUFBQTtJQUFBLGdCQUFBLEdBQW1CLElBQUMsQ0FBQSxtQkFBRCxDQUFBO0lBQ25CLGNBQUEsR0FBaUIsSUFBQyxDQUFBLGlCQUFELENBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBNUIsRUFBK0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUF4QyxFQUEyQyxnQkFBM0M7SUFDakIsV0FBQSxHQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxLQUFjO0lBRTVCLFlBQUEsQ0FBYSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQWxCO0lBRUEsSUFBRyxXQUFIO01BQ0ksSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEdBQWE7TUFFYixJQUFDLENBQUEsT0FBRCxDQUFTLGVBQVQsRUFBMEIsY0FBMUI7TUFFQSxJQUFHLGdCQUFnQixDQUFDLFVBQWpCLENBQUEsQ0FBSDtRQUNJLFlBQUEsR0FBZSxnQkFBZ0IsQ0FBQyxlQUFqQixDQUFBO1FBQ2YsUUFBQSxHQUFXLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQjtRQUM5QixLQUFBLEdBQVcsUUFBSCxHQUFpQixDQUFqQixHQUF3QjtRQUNoQyxTQUFBLEdBQWUsUUFBSCxHQUFpQixXQUFqQixHQUFrQztRQUM5QyxRQUFBLEdBQVcsSUFBQyxDQUFBLFdBQUQsQ0FBQTtRQUVYLElBQUMsQ0FBQSxNQUFELENBQ0k7VUFBQSxDQUFBLEVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFaO1VBQ0EsQ0FBQSxFQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FEWjtVQUVBLEtBQUEsRUFBTyxLQUZQO1VBR0EsUUFBQSxFQUFVLElBQUMsQ0FBQSxZQUhYO1NBREosRUFLRSxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO1lBQ0UsS0FBQyxDQUFBLE9BQUQsQ0FBUyxTQUFULEVBQW9CO2NBQUEsUUFBQSxFQUFVLFFBQVY7YUFBcEI7VUFERjtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FMRixFQVBKO09BTEo7S0FBQSxNQUFBO01Bc0JJLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTDtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsT0FBTCxHQUFlLFVBQUEsQ0FBVyxDQUFBLFNBQUEsS0FBQTtlQUFBLFNBQUE7VUFDdEIsS0FBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEdBQWE7VUFFYixLQUFDLENBQUEsT0FBRCxDQUFTLFNBQVQsRUFBb0IsY0FBcEI7UUFIc0I7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVgsRUFNYixJQUFDLENBQUEsR0FBRyxDQUFDLEtBTlEsRUF2Qm5COztFQVBPOztrQkF3Q1gsVUFBQSxHQUFZLFNBQUMsQ0FBRDtBQUNSLFFBQUE7SUFBQSxVQUFBLEdBQWEsSUFBQyxDQUFBLHlCQUFELENBQTJCLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBM0I7SUFDYixZQUFBLEdBQWUsVUFBVSxDQUFDLFlBQVgsQ0FBQTtBQUVmO0lBRUEsSUFBRyxZQUFIO01BQ0ksQ0FBQyxDQUFDLGVBQUYsQ0FBQSxFQURKOztFQU5ROztrQkFXWixNQUFBLEdBQVEsU0FBQTtBQUNKLFFBQUE7SUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQixDQUF0QjtNQUNJLFFBQUEsR0FBVyxJQUFDLENBQUEsV0FBRCxDQUFBO01BQ1gsZ0JBQUEsR0FBbUIsSUFBQyxDQUFBLG1CQUFELENBQUE7TUFFbkIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLEdBQWtCLElBQUMsQ0FBQSw4QkFBRCxDQUFnQyxRQUFoQyxFQUEwQyxnQkFBMUM7TUFDbEIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLEdBQWlCO01BQ2pCLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQjtNQUVuQixJQUFDLENBQUEsTUFBRCxDQUNJO1FBQUEsQ0FBQSxFQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBZDtRQUNBLENBQUEsRUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLEdBRGQ7UUFFQSxLQUFBLEVBQU8sSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUZsQjtRQUdBLFFBQUEsRUFBVSxDQUhWO09BREo7TUFNQSxJQUFDLENBQUEsT0FBRCxDQUFTLFdBQVQsRUFBc0I7UUFBQSxRQUFBLEVBQVUsUUFBVjtPQUF0QixFQWRKOztFQURJOzs7Ozs7QUFtQlosVUFBVSxDQUFDLEtBQVgsQ0FBaUIsS0FBakI7O0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUNoaUJqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNubEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIE1ha2Ugc3VyZSB3ZSBkZWZpbmUgd2UncmUgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxucHJvY2VzcyA9IGJyb3dzZXI6IHRydWUgaWYgdHlwZW9mIHByb2Nlc3MgaXMgJ3VuZGVmaW5lZCdcblxuU0dOID0gcmVxdWlyZSAnLi9zZ24nXG5cbiMgRXhwb3NlIHN0b3JhZ2UgYmFja2VuZHMuXG5TR04uc3RvcmFnZSA9XG4gICAgbG9jYWw6IHJlcXVpcmUgJy4vc3RvcmFnZS9jbGllbnQtbG9jYWwnXG4gICAgY29va2llOiByZXF1aXJlICcuL3N0b3JhZ2UvY2xpZW50LWNvb2tpZSdcblxuIyBFeHBvc2UgcmVxdWVzdCBoYW5kbGVyLlxuU0dOLnJlcXVlc3QgPSByZXF1aXJlICcuL3JlcXVlc3QvYnJvd3NlcidcblxuIyBFeHBvc2UgdGhlIGRpZmZlcmVudCBraXRzLlxuU0dOLkF1dGhLaXQgPSByZXF1aXJlICcuL2tpdHMvYXV0aCdcblNHTi5Bc3NldHNLaXQgPSByZXF1aXJlICcuL2tpdHMvYXNzZXRzJ1xuU0dOLkV2ZW50c0tpdCA9IHJlcXVpcmUgJy4va2l0cy9ldmVudHMnXG5TR04uR3JhcGhLaXQgPSByZXF1aXJlICcuL2tpdHMvZ3JhcGgnXG5TR04uQ29yZUtpdCA9IHJlcXVpcmUgJy4va2l0cy9jb3JlJ1xuU0dOLlBhZ2VkUHVibGljYXRpb25LaXQgPSByZXF1aXJlICcuL2tpdHMvcGFnZWQtcHVibGljYXRpb24nXG5cbiMgU2V0IHRoZSBjb3JlIHNlc3Npb24gZnJvbSB0aGUgY29va2llIHN0b3JlIGlmIHBvc3NpYmxlLlxuc2Vzc2lvbiA9IFNHTi5zdG9yYWdlLmNvb2tpZS5nZXQgJ3Nlc3Npb24nXG5cbmlmIHR5cGVvZiBzZXNzaW9uIGlzICdvYmplY3QnXG4gICAgU0dOLmNvbmZpZy5zZXRcbiAgICAgICAgY29yZVNlc3Npb25Ub2tlbjogc2Vzc2lvbi50b2tlblxuICAgICAgICBjb3JlU2Vzc2lvbkNsaWVudElkOiBzZXNzaW9uLmNsaWVudF9pZFxuXG5TR04uY2xpZW50ID0gZG8gLT5cbiAgICBpZCA9IFNHTi5zdG9yYWdlLmxvY2FsLmdldCAnY2xpZW50LWlkJ1xuICAgIGZpcnN0T3BlbiA9IG5vdCBpZD9cblxuICAgIGlmIGZpcnN0T3BlblxuICAgICAgICBpZCA9IFNHTi51dGlsLnV1aWQoKVxuICAgICAgICBcbiAgICAgICAgU0dOLnN0b3JhZ2UubG9jYWwuc2V0ICdjbGllbnQtaWQnLCBpZFxuXG4gICAgZmlyc3RPcGVuOiBmaXJzdE9wZW5cbiAgICBpZDogaWRcblxuIyBPcHRpb25hbCBzdGFydCBmdW5jdGlvbiB0byBpbnZva2Ugc2Vzc2lvbiB0cmFja2luZy5cblNHTi5zdGFydFNlc3Npb24gPSAtPlxuICAgICMgRW1pdCBzZXNzaW9uIGV2ZW50cyBpZiBhIHRyYWNrZXIgaXMgYXZhaWxhYmxlLlxuICAgIGV2ZW50VHJhY2tlciA9IFNHTi5jb25maWcuZ2V0ICdldmVudFRyYWNrZXInXG5cbiAgICBpZiBldmVudFRyYWNrZXI/XG4gICAgICAgIGV2ZW50VHJhY2tlci50cmFja0V2ZW50ICdmaXJzdC1jbGllbnQtc2Vzc2lvbi1vcGVuZWQnLCB7fSwgJzEuMC4wJyBpZiBTR04uY2xpZW50LmZpcnN0T3BlbiBpcyB0cnVlXG4gICAgICAgIGV2ZW50VHJhY2tlci50cmFja0V2ZW50ICdjbGllbnQtc2Vzc2lvbi1vcGVuZWQnLCB7fSwgJzEuMC4wJ1xuXG4gICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU0dOXG4iLCJhdHRycyA9IHt9XG5rZXlzID0gW1xuICAgICdhcHBWZXJzaW9uJyxcbiAgICAnYXBwS2V5JyxcbiAgICAnYXBwU2VjcmV0JyxcbiAgICAnYXV0aFRva2VuJyxcbiAgICAnZXZlbnRUcmFja2VyJyxcbiAgICAnbG9jYWxlJyxcbiAgICAnY29yZVNlc3Npb25Ub2tlbicsXG4gICAgJ2NvcmVTZXNzaW9uQ2xpZW50SWQnLFxuICAgICdjb3JlVXJsJyxcbiAgICAnZ3JhcGhVcmwnLFxuICAgICdldmVudHNUcmFja1VybCcsXG4gICAgJ2V2ZW50c1B1bHNlVXJsJyxcbiAgICAnYXNzZXRzRmlsZVVwbG9hZFVybCdcbl1cblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIHNldDogKGNvbmZpZyA9IHt9KSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBjb25maWdcbiAgICAgICAgICAgIGF0dHJzW2tleV0gPSB2YWx1ZSBpZiBrZXkgaW4ga2V5c1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0OiAob3B0aW9uKSAtPlxuICAgICAgICBhdHRyc1tvcHRpb25dXG4iLCJjb25maWcgPSByZXF1aXJlICcuL2NvbmZpZydcbnV0aWwgPSByZXF1aXJlICcuL3V0aWwnXG5cbiMgU2V0IGRlZmF1bHQgdmFsdWVzLlxuY29uZmlnLnNldFxuICAgIGxvY2FsZTogJ2VuX1VTJ1xuICAgIGNvcmVVcmw6ICdodHRwczovL2FwaS5ldGlsYnVkc2F2aXMuZGsnXG4gICAgZ3JhcGhVcmw6ICdodHRwczovL2dyYXBoLnNlcnZpY2Uuc2hvcGd1bi5jb20nXG4gICAgZXZlbnRzVHJhY2tVcmw6ICdodHRwczovL2V2ZW50cy5zZXJ2aWNlLnNob3BndW4uY29tL3RyYWNrJ1xuICAgIGV2ZW50c1B1bHNlVXJsOiAnd3NzOi8vZXZlbnRzLnNlcnZpY2Uuc2hvcGd1bi5jb20vcHVsc2UnXG4gICAgYXNzZXRzRmlsZVVwbG9hZFVybDogJ2h0dHBzOi8vYXNzZXRzLnNlcnZpY2Uuc2hvcGd1bi5jb20vdXBsb2FkJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgY29uZmlnOiBjb25maWdcblxuICAgIHV0aWw6IHV0aWxcbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBFU0M6IDI3XG4gICAgQVJST1dfUklHSFQ6IDM5XG4gICAgQVJST1dfTEVGVDogMzdcbiAgICBTUEFDRTogMzJcbiAgICBOVU1CRVJfT05FOiA0OVxuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRpb25zID0ge30sIGNhbGxiYWNrLCBwcm9ncmVzc0NhbGxiYWNrKSAtPlxuICAgIHRocm93IG5ldyBFcnJvcignRmlsZSBpcyBub3QgZGVmaW5lZCcpIGlmIG5vdCBvcHRpb25zLmZpbGU/XG5cbiAgICB1cmwgPSBTR04uY29uZmlnLmdldCAnYXNzZXRzRmlsZVVwbG9hZFVybCdcbiAgICBmb3JtRGF0YSA9IGZpbGU6IG9wdGlvbnMuZmlsZVxuICAgIHRpbWVvdXQgPSAxMDAwICogNjAgKiA2MFxuXG4gICAgU0dOLnJlcXVlc3RcbiAgICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgZm9ybURhdGE6IGZvcm1EYXRhXG4gICAgICAgIHRpbWVvdXQ6IHRpbWVvdXRcbiAgICAgICAgaGVhZGVyczpcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgIGlmIGVycj9cbiAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignUmVxdWVzdCBlcnJvcicpLFxuICAgICAgICAgICAgICAgIGNvZGU6ICdSZXF1ZXN0RXJyb3InXG4gICAgICAgICAgICApXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmIGRhdGEuc3RhdHVzQ29kZSBpcyAyMDBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBudWxsLCBKU09OLnBhcnNlKGRhdGEuYm9keSlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ1JlcXVlc3QgZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogJ1JlcXVlc3RFcnJvcidcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5zdGF0dXNDb2RlXG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgIHJldHVyblxuICAgICwgKGxvYWRlZCwgdG90YWwpIC0+XG4gICAgICAgIGlmIHR5cGVvZiBwcm9ncmVzc0NhbGxiYWNrIGlzICdmdW5jdGlvbidcbiAgICAgICAgICAgIHByb2dyZXNzQ2FsbGJhY2tcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogbG9hZGVkIC8gdG90YWxcbiAgICAgICAgICAgICAgICBsb2FkZWQ6IGxvYWRlZFxuICAgICAgICAgICAgICAgIHRvdGFsOiB0b3RhbFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmV0dXJuXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgZmlsZVVwbG9hZDogcmVxdWlyZSAnLi9maWxlLXVwbG9hZCdcbiIsIm1vZHVsZS5leHBvcnRzID0ge31cbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcbnJlcXVlc3QgPSByZXF1aXJlICcuL3JlcXVlc3QnXG5zZXNzaW9uID0gcmVxdWlyZSAnLi9zZXNzaW9uJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgcmVxdWVzdDogcmVxdWVzdFxuXG4gICAgc2Vzc2lvbjogc2Vzc2lvblxuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRpb25zID0ge30sIGNhbGxiYWNrID0gLT4pIC0+XG4gICAgU0dOLkNvcmVLaXQuc2Vzc2lvbi5lbnN1cmUgKGVycikgLT5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrIGVyciBpZiBlcnI/XG5cbiAgICAgICAgdXJsID0gb3B0aW9ucy51cmwgPyAnJ1xuICAgICAgICBoZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzID8ge31cbiAgICAgICAgdG9rZW4gPSBTR04uY29uZmlnLmdldCAnY29yZVNlc3Npb25Ub2tlbidcbiAgICAgICAgY2xpZW50SWQgPSBTR04uY29uZmlnLmdldCAnY29yZVNlc3Npb25DbGllbnRJZCdcbiAgICAgICAgYXBwVmVyc2lvbiA9IFNHTi5jb25maWcuZ2V0ICdhcHBWZXJzaW9uJ1xuICAgICAgICBhcHBTZWNyZXQgPSBTR04uY29uZmlnLmdldCAnYXBwU2VjcmV0J1xuICAgICAgICBsb2NhbGUgPSBTR04uY29uZmlnLmdldCAnbG9jYWxlJ1xuICAgICAgICBxcyA9IG9wdGlvbnMucXMgPyB7fVxuICAgICAgICBnZW8gPSBvcHRpb25zLmdlb2xvY2F0aW9uXG5cbiAgICAgICAgaGVhZGVyc1snWC1Ub2tlbiddID0gdG9rZW5cbiAgICAgICAgaGVhZGVyc1snWC1TaWduYXR1cmUnXSA9IFNHTi5Db3JlS2l0LnNlc3Npb24uc2lnbiBhcHBTZWNyZXQsIHRva2VuIGlmIGFwcFNlY3JldD9cblxuICAgICAgICBxcy5yX2xvY2FsZSA9IGxvY2FsZSBpZiBsb2NhbGU/XG4gICAgICAgIHFzLmFwaV9hdiA9IGFwcFZlcnNpb24gaWYgYXBwVmVyc2lvbj9cbiAgICAgICAgcXMuY2xpZW50X2lkID0gY2xpZW50SWQgaWYgY2xpZW50SWQ/XG5cbiAgICAgICAgaWYgZ2VvP1xuICAgICAgICAgICAgcXMucl9sYXQgPSBnZW8ubGF0aXR1ZGUgaWYgZ2VvLmxhdGl0dWRlPyBhbmQgbm90IHFzLnJfbGF0P1xuICAgICAgICAgICAgcXMucl9sbmcgPSBnZW8ubG9uZ2l0dWRlIGlmIGdlby5sb25naXR1ZGU/IGFuZCBub3QgcXMucl9sbmc/XG4gICAgICAgICAgICBxcy5yX3JhZGl1cyA9IGdlby5yYWRpdXMgaWYgZ2VvLnJhZGl1cz8gYW5kIG5vdCBxcy5yX3JhZGl1cz9cbiAgICAgICAgICAgIHFzLnJfc2Vuc29yID0gZ2VvLnNlbnNvciBpZiBnZW8uc2Vuc29yPyBhbmQgbm90IHFzLnJfc2Vuc29yP1xuXG4gICAgICAgIFNHTi5yZXF1ZXN0XG4gICAgICAgICAgICBtZXRob2Q6IG9wdGlvbnMubWV0aG9kXG4gICAgICAgICAgICB1cmw6IFNHTi5jb25maWcuZ2V0KCdjb3JlVXJsJykgKyB1cmxcbiAgICAgICAgICAgIHFzOiBxc1xuICAgICAgICAgICAgYm9keTogb3B0aW9ucy5ib2R5XG4gICAgICAgICAgICBmb3JtRGF0YTogb3B0aW9ucy5mb3JtRGF0YVxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAganNvbjogdHJ1ZVxuICAgICAgICAgICAgdXNlQ29va2llczogZmFsc2VcbiAgICAgICAgLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignQ29yZSByZXF1ZXN0IGVycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6ICdDb3JlUmVxdWVzdEVycm9yJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0b2tlbiA9IFNHTi5jb25maWcuZ2V0ICdjb3JlU2Vzc2lvblRva2VuJ1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlVG9rZW4gPSBkYXRhLmhlYWRlcnNbJ3gtdG9rZW4nXVxuXG4gICAgICAgICAgICAgICAgU0dOLkNvcmVLaXQuc2Vzc2lvbi5zYXZlVG9rZW4gcmVzcG9uc2VUb2tlbiBpZiB0b2tlbiBpc250IHJlc3BvbnNlVG9rZW5cblxuICAgICAgICAgICAgICAgIGlmIGRhdGEuc3RhdHVzQ29kZSA+PSAyMDAgYW5kIGRhdGEuc3RhdHVzQ29kZSA8IDMwMCBvciBkYXRhLnN0YXR1c0NvZGUgaXMgMzA0XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGwsIGRhdGEuYm9keVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdDb3JlIEFQSSBlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogJ0NvcmVBUElFcnJvcidcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGRhdGEuc3RhdHVzQ29kZVxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgcmV0dXJuXG4iLCJTR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5zaGEyNTYgPSByZXF1aXJlICdzaGEyNTYnXG5jbGllbnRDb29raWVTdG9yYWdlID0gcmVxdWlyZSAnLi4vLi4vc3RvcmFnZS9jbGllbnQtY29va2llJ1xuY2FsbGJhY2tRdWV1ZSA9IFtdXG5cbnNlc3Npb24gPVxuICAgIHR0bDogMSAqIDYwICogNjAgKiAyNCAqIDYwXG5cbiAgICBzYXZlVG9rZW46ICh0b2tlbikgLT5cbiAgICAgICAgU0dOLmNvbmZpZy5zZXQgY29yZVNlc3Npb25Ub2tlbjogdG9rZW5cblxuICAgICAgICBzZXNzaW9uLnNhdmVDb29raWUoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgc2F2ZUNsaWVudElkOiAoY2xpZW50SWQpIC0+XG4gICAgICAgIFNHTi5jb25maWcuc2V0IGNvcmVTZXNzaW9uQ2xpZW50SWQ6IGNsaWVudElkXG5cbiAgICAgICAgc2Vzc2lvbi5zYXZlQ29va2llKClcblxuICAgICAgICByZXR1cm5cblxuICAgIHNhdmVDb29raWU6IC0+XG4gICAgICAgIGNsaWVudENvb2tpZVN0b3JhZ2Uuc2V0ICdzZXNzaW9uJyxcbiAgICAgICAgICAgIHRva2VuOiBTR04uY29uZmlnLmdldCAnY29yZVNlc3Npb25Ub2tlbidcbiAgICAgICAgICAgIGNsaWVudF9pZDogU0dOLmNvbmZpZy5nZXQgJ2NvcmVTZXNzaW9uQ2xpZW50SWQnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBjcmVhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgU0dOLnJlcXVlc3RcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgICAgICAgICB1cmw6IFNHTi5jb25maWcuZ2V0KCdjb3JlVXJsJykgKyAnL3YyL3Nlc3Npb25zJ1xuICAgICAgICAgICAganNvbjogdHJ1ZVxuICAgICAgICAgICAgcXM6XG4gICAgICAgICAgICAgICAgYXBpX2tleTogU0dOLmNvbmZpZy5nZXQgJ2FwcEtleSdcbiAgICAgICAgICAgICAgICB0b2tlbl90dGw6IHNlc3Npb24udHRsXG4gICAgICAgICwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgICAgIGlmIGVycj9cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBlcnJcbiAgICAgICAgICAgIGVsc2UgaWYgZGF0YS5zdGF0dXNDb2RlIGlzIDIwMVxuICAgICAgICAgICAgICAgIHNlc3Npb24uc2F2ZVRva2VuIGRhdGEuYm9keS50b2tlblxuICAgICAgICAgICAgICAgIHNlc3Npb24uc2F2ZUNsaWVudElkIGRhdGEuYm9keS5jbGllbnRfaWRcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyciwgZGF0YS5ib2R5XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKCdDb3VsZCBub3QgY3JlYXRlIHNlc3Npb24nKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cbiAgICBcbiAgICB1cGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgaGVhZGVycyA9IHt9XG4gICAgICAgIHRva2VuID0gU0dOLmNvbmZpZy5nZXQgJ2NvcmVTZXNzaW9uVG9rZW4nXG4gICAgICAgIGFwcFNlY3JldCA9IFNHTi5jb25maWcuZ2V0ICdhcHBTZWNyZXQnXG5cbiAgICAgICAgaGVhZGVyc1snWC1Ub2tlbiddID0gdG9rZW5cbiAgICAgICAgaGVhZGVyc1snWC1TaWduYXR1cmUnXSA9IHNlc3Npb24uc2lnbiBhcHBTZWNyZXQsIHRva2VuIGlmIGFwcFNlY3JldD9cblxuICAgICAgICBTR04ucmVxdWVzdFxuICAgICAgICAgICAgdXJsOiBTR04uY29uZmlnLmdldCgnY29yZVVybCcpICsgJy92Mi9zZXNzaW9ucydcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIGpzb246IHRydWVcbiAgICAgICAgLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyclxuICAgICAgICAgICAgZWxzZSBpZiBkYXRhLnN0YXR1c0NvZGUgaXMgMjAwXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zYXZlVG9rZW4gZGF0YS5ib2R5LnRva2VuXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zYXZlQ2xpZW50SWQgZGF0YS5ib2R5LmNsaWVudF9pZFxuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyLCBkYXRhLmJvZHlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBuZXcgRXJyb3IoJ0NvdWxkIG5vdCB1cGRhdGUgc2Vzc2lvbicpXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVuZXc6IChjYWxsYmFjaykgLT5cbiAgICAgICAgaGVhZGVycyA9IHt9XG4gICAgICAgIHRva2VuID0gU0dOLmNvbmZpZy5nZXQgJ2NvcmVTZXNzaW9uVG9rZW4nXG4gICAgICAgIGFwcFNlY3JldCA9IFNHTi5jb25maWcuZ2V0ICdhcHBTZWNyZXQnXG5cbiAgICAgICAgaGVhZGVyc1snWC1Ub2tlbiddID0gdG9rZW5cbiAgICAgICAgaGVhZGVyc1snWC1TaWduYXR1cmUnXSA9IHNlc3Npb24uc2lnbiBhcHBTZWNyZXQsIHRva2VuIGlmIGFwcFNlY3JldD9cblxuICAgICAgICBTR04ucmVxdWVzdFxuICAgICAgICAgICAgbWV0aG9kOiAncHV0J1xuICAgICAgICAgICAgdXJsOiBTR04uY29uZmlnLmdldCgnY29yZVVybCcpICsgJy92Mi9zZXNzaW9ucydcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIGpzb246IHRydWVcbiAgICAgICAgLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyclxuICAgICAgICAgICAgZWxzZSBpZiBkYXRhLnN0YXR1c0NvZGUgaXMgMjAwXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zYXZlVG9rZW4gZGF0YS5ib2R5LnRva2VuXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zYXZlQ2xpZW50SWQgZGF0YS5ib2R5LmNsaWVudF9pZFxuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyLCBkYXRhLmJvZHlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBuZXcgRXJyb3IoJ0NvdWxkIG5vdCByZW5ldyBzZXNzaW9uJylcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBlbnN1cmU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgcXVldWVDb3VudCA9IGNhbGxiYWNrUXVldWUubGVuZ3RoXG4gICAgICAgIGNvbXBsZXRlID0gKGVycikgLT5cbiAgICAgICAgICAgIGNhbGxiYWNrUXVldWUgPSBjYWxsYmFja1F1ZXVlLmZpbHRlciAoZm4pIC0+XG4gICAgICAgICAgICAgICAgZm4gZXJyXG5cbiAgICAgICAgICAgICAgICBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBjYWxsYmFja1F1ZXVlLnB1c2ggY2FsbGJhY2tcblxuICAgICAgICBpZiBxdWV1ZUNvdW50IGlzIDBcbiAgICAgICAgICAgIGlmIG5vdCBTR04uY29uZmlnLmdldCgnY29yZVNlc3Npb25Ub2tlbicpP1xuICAgICAgICAgICAgICAgIHNlc3Npb24uY3JlYXRlIGNvbXBsZXRlXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29tcGxldGUoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgc2lnbjogKGFwcFNlY3JldCwgdG9rZW4pIC0+XG4gICAgICAgIHNoYTI1NiBbYXBwU2VjcmV0LCB0b2tlbl0uam9pbignJylcblxubW9kdWxlLmV4cG9ydHMgPSBzZXNzaW9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgVHJhY2tlcjogcmVxdWlyZSAnLi90cmFja2VyJ1xuXG4gICAgUHVsc2U6IHJlcXVpcmUgJy4vcHVsc2UnXG4iLCJNaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblxuY2xhc3MgUHVsc2VcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGRlc3Ryb3llZCA9IGZhbHNlXG4gICAgICAgIEBjb25uZWN0aW9uID0gQGNvbm5lY3QoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQGRlc3Ryb3llZCA9IHRydWVcblxuICAgICAgICBAY29ubmVjdGlvbi5jbG9zZSgpXG5cbiAgICAgICAgQFxuXG4gICAgY29ubmVjdDogLT5cbiAgICAgICAgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQgU0dOLmNvbmZpZy5nZXQoJ2V2ZW50c1B1bHNlVXJsJylcblxuICAgICAgICBjb25uZWN0aW9uLm9ub3BlbiA9IEBvbk9wZW4uYmluZCBAXG4gICAgICAgIGNvbm5lY3Rpb24ub25tZXNzYWdlID0gQG9uTWVzc2FnZS5iaW5kIEBcbiAgICAgICAgY29ubmVjdGlvbi5vbmVycm9yID0gQG9uRXJyb3IuYmluZCBAXG4gICAgICAgIGNvbm5lY3Rpb24ub25jbG9zZSA9IEBvbkNsb3NlLmJpbmQgQFxuXG4gICAgICAgIGNvbm5lY3Rpb25cblxuICAgIG9uT3BlbjogLT5cbiAgICAgICAgQHRyaWdnZXIgJ29wZW4nXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBvbk1lc3NhZ2U6IChlKSAtPlxuICAgICAgICB0cnlcbiAgICAgICAgICAgIEB0cmlnZ2VyICdldmVudCcsIEpTT04ucGFyc2UoZS5kYXRhKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgb25FcnJvcjogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBvbkNsb3NlOiAtPlxuICAgICAgICBpZiBAZGVzdHJveWVkIGlzIGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgICAgICAgQGNvbm5lY3Rpb24gPSBAY29ubmVjdCgpXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICwgMjAwMFxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFB1bHNlXG5cbm1vZHVsZS5leHBvcnRzID0gUHVsc2VcbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcbmNsaWVudExvY2FsU3RvcmFnZSA9IHJlcXVpcmUgJy4uLy4uL3N0b3JhZ2UvY2xpZW50LWxvY2FsJ1xuZ2V0UG9vbCA9IC0+XG4gICAgZGF0YSA9IGNsaWVudExvY2FsU3RvcmFnZS5nZXQgJ2V2ZW50LXRyYWNrZXItcG9vbCdcbiAgICBkYXRhID0gW10gaWYgQXJyYXkuaXNBcnJheShkYXRhKSBpcyBmYWxzZVxuXG4gICAgZGF0YVxucG9vbCA9IGdldFBvb2woKVxuXG5jbGllbnRMb2NhbFN0b3JhZ2Uuc2V0ICdldmVudC10cmFja2VyLXBvb2wnLCBbXVxuXG50cnlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAndW5sb2FkJywgLT5cbiAgICAgICAgcG9vbCA9IHBvb2wuY29uY2F0IGdldFBvb2woKVxuXG4gICAgICAgIGNsaWVudExvY2FsU3RvcmFnZS5zZXQgJ2V2ZW50LXRyYWNrZXItcG9vbCcsIHBvb2xcblxuICAgICAgICByZXR1cm5cbiAgICAsIGZhbHNlXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgVHJhY2tlclxuICAgIGRlZmF1bHRPcHRpb25zOlxuICAgICAgICB0cmFja0lkOiBudWxsXG4gICAgICAgIGRpc3BhdGNoSW50ZXJ2YWw6IDMwMDBcbiAgICAgICAgZGlzcGF0Y2hMaW1pdDogMTAwXG4gICAgICAgIHBvb2xMaW1pdDogMTAwMFxuICAgICAgICBkcnlSdW46IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgQGRlZmF1bHRPcHRpb25zXG4gICAgICAgICAgICBAW2tleV0gPSBvcHRpb25zW2tleV0gb3IgdmFsdWVcblxuICAgICAgICBAZGlzcGF0Y2hpbmcgPSBmYWxzZVxuICAgICAgICBAc2Vzc2lvbiA9XG4gICAgICAgICAgICBpZDogU0dOLnV0aWwudXVpZCgpXG4gICAgICAgIEBjbGllbnQgPVxuICAgICAgICAgICAgdHJhY2tJZDogQHRyYWNrSWRcbiAgICAgICAgICAgIGlkOiBTR04uY2xpZW50LmlkXG4gICAgICAgIEB2aWV3ID1cbiAgICAgICAgICAgIHBhdGg6IFtdXG4gICAgICAgICAgICBwcmV2aW91c1BhdGg6IFtdXG4gICAgICAgICAgICB1cmk6IG51bGxcbiAgICAgICAgQGxvY2F0aW9uID0ge31cbiAgICAgICAgQGFwcGxpY2F0aW9uID0ge31cbiAgICAgICAgQGlkZW50aXR5ID0ge31cblxuICAgICAgICAjIERpc3BhdGNoIGV2ZW50cyBwZXJpb2RpY2FsbHkuXG4gICAgICAgIEBpbnRlcnZhbCA9IHNldEludGVydmFsIEBkaXNwYXRjaC5iaW5kKEApLCBAZGlzcGF0Y2hJbnRlcnZhbFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgdHJhY2tFdmVudDogKHR5cGUsIHByb3BlcnRpZXMgPSB7fSwgdmVyc2lvbiA9ICcxLjAuMCcpIC0+XG4gICAgICAgIHRocm93IFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignRXZlbnQgdHlwZSBpcyByZXF1aXJlZCcpKSBpZiB0eXBlb2YgdHlwZSBpc250ICdzdHJpbmcnXG4gICAgICAgIHJldHVybiBpZiBub3QgQHRyYWNrSWQ/XG5cbiAgICAgICAgcG9vbC5wdXNoXG4gICAgICAgICAgICBpZDogU0dOLnV0aWwudXVpZCgpXG4gICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uXG4gICAgICAgICAgICByZWNvcmRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICAgIHNlbnRBdDogbnVsbFxuICAgICAgICAgICAgY2xpZW50OlxuICAgICAgICAgICAgICAgIGlkOiBAY2xpZW50LmlkXG4gICAgICAgICAgICAgICAgdHJhY2tJZDogQGNsaWVudC50cmFja0lkXG4gICAgICAgICAgICBjb250ZXh0OiBAZ2V0Q29udGV4dCgpXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzXG5cbiAgICAgICAgcG9vbC5zaGlmdCgpIHdoaWxlIEBnZXRQb29sU2l6ZSgpID4gQHBvb2xMaW1pdFxuXG4gICAgICAgIEBcblxuICAgIGlkZW50aWZ5OiAoaWQpIC0+XG4gICAgICAgIEBpZGVudGl0eS5pZCA9IGlkXG5cbiAgICAgICAgQFxuXG4gICAgc2V0TG9jYXRpb246IChsb2NhdGlvbiA9IHt9KSAtPlxuICAgICAgICBAbG9jYXRpb24uZGV0ZXJtaW5lZEF0ID0gbmV3IERhdGUobG9jYXRpb24udGltZXN0YW1wKS50b0lTT1N0cmluZygpXG4gICAgICAgIEBsb2NhdGlvbi5sYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlXG4gICAgICAgIEBsb2NhdGlvbi5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGVcbiAgICAgICAgQGxvY2F0aW9uLmFsdGl0dWRlID0gbG9jYXRpb24uYWx0aXR1ZGVcbiAgICAgICAgQGxvY2F0aW9uLmFjY3VyYWN5ID1cbiAgICAgICAgICAgIGhvcml6b250YWw6IGxvY2F0aW9uLmFjY3VyYWN5Py5ob3Jpem9udGFsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogbG9jYXRpb24uYWNjdXJhY3k/LnZlcnRpY2FsXG4gICAgICAgIEBsb2NhdGlvbi5zcGVlZCA9IGxvY2F0aW9uLnNwZWVkXG4gICAgICAgIEBsb2NhdGlvbi5mbG9vciA9IGxvY2F0aW9uLmZsb29yXG5cbiAgICAgICAgQFxuXG4gICAgc2V0QXBwbGljYXRpb246IChhcHBsaWNhdGlvbiA9IHt9KSAtPlxuICAgICAgICBAYXBwbGljYXRpb24ubmFtZSA9IGFwcGxpY2F0aW9uLm5hbWVcbiAgICAgICAgQGFwcGxpY2F0aW9uLnZlcnNpb24gPSBhcHBsaWNhdGlvbi52ZXJzaW9uXG4gICAgICAgIEBhcHBsaWNhdGlvbi5idWlsZCA9IGFwcGxpY2F0aW9uLmJ1aWxkXG5cbiAgICAgICAgQFxuXG4gICAgc2V0VmlldzogKHBhdGgpIC0+XG4gICAgICAgIEB2aWV3LnByZXZpb3VzUGF0aCA9IEB2aWV3LnBhdGhcbiAgICAgICAgQHZpZXcucGF0aCA9IHBhdGggaWYgQXJyYXkuaXNBcnJheShwYXRoKSBpcyB0cnVlXG4gICAgICAgIEB2aWV3LnVyaSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgICAgICAgQFxuXG4gICAgZ2V0VmlldzogLT5cbiAgICAgICAgdmlldyA9IHt9XG5cbiAgICAgICAgdmlldy5wYXRoID0gQHZpZXcucGF0aCBpZiBAdmlldy5wYXRoLmxlbmd0aCA+IDBcbiAgICAgICAgdmlldy5wcmV2aW91c1BhdGggPSBAdmlldy5wcmV2aW91c1BhdGggaWYgQHZpZXcucHJldmlvdXNQYXRoLmxlbmd0aCA+IDBcbiAgICAgICAgdmlldy51cmkgPSBAdmlldy51cmkgaWYgQHZpZXcudXJpP1xuXG4gICAgICAgIHZpZXdcblxuICAgIGdldENvbnRleHQ6IC0+XG4gICAgICAgIHNjcmVlbkRpbWVuc2lvbnMgPSBTR04udXRpbC5nZXRTY3JlZW5EaW1lbnNpb25zKClcbiAgICAgICAgb3MgPSBTR04udXRpbC5nZXRPUygpXG4gICAgICAgIGNvbnRleHQgPVxuICAgICAgICAgICAgdXNlckFnZW50OiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICAgICAgbG9jYWxlOiBuYXZpZ2F0b3IubGFuZ3VhZ2VcbiAgICAgICAgICAgIHRpbWVab25lOlxuICAgICAgICAgICAgICAgIHV0Y09mZnNldFNlY29uZHM6IFNHTi51dGlsLmdldFV0Y09mZnNldFNlY29uZHMoKVxuICAgICAgICAgICAgICAgIHV0Y0RzdE9mZnNldFNlY29uZHM6IFNHTi51dGlsLmdldFV0Y0RzdE9mZnNldFNlY29uZHMoKVxuICAgICAgICAgICAgZGV2aWNlOlxuICAgICAgICAgICAgICAgIHNjcmVlbjpcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHNjcmVlbkRpbWVuc2lvbnMucGh5c2ljYWwud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzY3JlZW5EaW1lbnNpb25zLnBoeXNpY2FsLmhlaWdodFxuICAgICAgICAgICAgICAgICAgICBkZW5zaXR5OiBzY3JlZW5EaW1lbnNpb25zLmRlbnNpdHlcbiAgICAgICAgICAgIHNlc3Npb246XG4gICAgICAgICAgICAgICAgaWQ6IEBzZXNzaW9uLmlkXG4gICAgICAgICAgICB2aWV3OiBAZ2V0VmlldygpXG4gICAgICAgIGFwcGxpY2F0aW9uID1cbiAgICAgICAgICAgIG5hbWU6IEBhcHBsaWNhdGlvbi5uYW1lXG4gICAgICAgICAgICB2ZXJzaW9uOiBAYXBwbGljYXRpb24udmVyc2lvblxuICAgICAgICAgICAgYnVpbGQ6IEBhcHBsaWNhdGlvbi5idWlsZFxuICAgICAgICBjYW1wYWlnbiA9XG4gICAgICAgICAgICBzb3VyY2U6IFNHTi51dGlsLmdldFF1ZXJ5UGFyYW0gJ3V0bV9zb3VyY2UnXG4gICAgICAgICAgICBtZWRpdW06IFNHTi51dGlsLmdldFF1ZXJ5UGFyYW0gJ3V0bV9tZWRpdW0nXG4gICAgICAgICAgICBuYW1lOiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fY2FtcGFpZ24nXG4gICAgICAgICAgICB0ZXJtOiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fdGVybSdcbiAgICAgICAgICAgIGNvbnRlbnQ6IFNHTi51dGlsLmdldFF1ZXJ5UGFyYW0gJ3V0bV9jb250ZW50J1xuICAgICAgICBsb2MgPVxuICAgICAgICAgICAgZGV0ZXJtaW5lZEF0OiBAbG9jYXRpb24uZGV0ZXJtaW5lZEF0XG4gICAgICAgICAgICBsYXRpdHVkZTogQGxvY2F0aW9uLmxhdGl0dWRlXG4gICAgICAgICAgICBsb25naXR1ZGU6IEBsb2NhdGlvbi5sb25naXR1ZGVcbiAgICAgICAgICAgIGFsdGl0dWRlOiBAbG9jYXRpb24uYWx0aXR1ZGVcbiAgICAgICAgICAgIHNwZWVkOiBAbG9jYXRpb24uc3BlZWRcbiAgICAgICAgICAgIGZsb29yOiBAbG9jYXRpb24uZmxvb3JcbiAgICAgICAgICAgIGFjY3VyYWN5OlxuICAgICAgICAgICAgICAgIGhvcml6b250YWw6IEBsb2NhdGlvbi5hY2N1cmFjeT8uaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBAbG9jYXRpb24uYWNjdXJhY3k/LnZlcnRpY2FsXG5cbiAgICAgICAgIyBPcGVyYXRpbmcgc3lzdGVtLlxuICAgICAgICBjb250ZXh0Lm9zID0gbmFtZTogb3MgaWYgb3M/XG5cbiAgICAgICAgIyBTZXNzaW9uIHJlZmVycmVyLlxuICAgICAgICBjb250ZXh0LnNlc3Npb24ucmVmZXJyZXIgPSBkb2N1bWVudC5yZWZlcnJlciBpZiBkb2N1bWVudC5yZWZlcnJlci5sZW5ndGggPiAwXG5cbiAgICAgICAgIyBBcHBsaWNhdGlvbi5cbiAgICAgICAgWyduYW1lJywgJ3ZlcnNpb24nLCAnYnVpbGQnXS5mb3JFYWNoIChrZXkpIC0+XG4gICAgICAgICAgICBkZWxldGUgYXBwbGljYXRpb25ba2V5XSBpZiB0eXBlb2YgYXBwbGljYXRpb25ba2V5XSBpc250ICdzdHJpbmcnIG9yIGFwcGxpY2F0aW9uW2tleV0ubGVuZ3RoIGlzIDBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBjb250ZXh0LmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb24gaWYgT2JqZWN0LmtleXMoYXBwbGljYXRpb24pLmxlbmd0aCA+IDBcblxuICAgICAgICAjIENhbXBhaWduLlxuICAgICAgICBbJ3NvdXJjZScsICdtZWRpdW0nLCAnbmFtZScsICd0ZXJtJywgJ2NvbnRlbnQnXS5mb3JFYWNoIChrZXkpIC0+XG4gICAgICAgICAgICBkZWxldGUgY2FtcGFpZ25ba2V5XSBpZiB0eXBlb2YgY2FtcGFpZ25ba2V5XSBpc250ICdzdHJpbmcnIG9yIGNhbXBhaWduW2tleV0ubGVuZ3RoIGlzIDBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBjb250ZXh0LmNhbXBhaWduID0gY2FtcGFpZ24gaWYgT2JqZWN0LmtleXMoY2FtcGFpZ24pLmxlbmd0aCA+IDBcblxuICAgICAgICAjIExvY2F0aW9uLlxuICAgICAgICBbJ2xhdGl0dWRlJywgJ2xvbmdpdHVkZScsICdhbHRpdHVkZScsICdzcGVlZCcsICdmbG9vciddLmZvckVhY2ggKGtleSkgLT5cbiAgICAgICAgICAgIGRlbGV0ZSBsb2Nba2V5XSBpZiB0eXBlb2YgbG9jW2tleV0gaXNudCAnbnVtYmVyJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGRlbGV0ZSBsb2MuYWNjdXJhY3kuaG9yaXpvbnRhbCBpZiB0eXBlb2YgbG9jLmFjY3VyYWN5Lmhvcml6b250YWwgaXNudCAnbnVtYmVyJ1xuICAgICAgICBkZWxldGUgbG9jLmFjY3VyYWN5LnZlcnRpY2FsIGlmIHR5cGVvZiBsb2MuYWNjdXJhY3kudmVydGljYWwgaXNudCAnbnVtYmVyJ1xuICAgICAgICBkZWxldGUgbG9jLmFjY3VyYWN5IGlmIE9iamVjdC5rZXlzKGxvYy5hY2N1cmFjeSkubGVuZ3RoIGlzIDBcbiAgICAgICAgZGVsZXRlIGxvYy5kZXRlcm1pbmVkQXQgaWYgdHlwZW9mIGxvYy5kZXRlcm1pbmVkQXQgaXNudCAnc3RyaW5nJyBvciBsb2MuZGV0ZXJtaW5lZEF0Lmxlbmd0aCBpcyAwXG4gICAgICAgIGNvbnRleHQubG9jYXRpb24gPSBsb2MgaWYgT2JqZWN0LmtleXMobG9jKS5sZW5ndGggPiAwXG5cbiAgICAgICAgIyBQZXJzb24gaWRlbnRpZmllci5cbiAgICAgICAgY29udGV4dC5wZXJzb25JZCA9IEBpZGVudGl0eS5pZCBpZiBAaWRlbnRpdHkuaWQ/XG5cbiAgICAgICAgY29udGV4dFxuXG4gICAgZ2V0UG9vbFNpemU6IC0+XG4gICAgICAgIHBvb2wubGVuZ3RoXG5cbiAgICBkaXNwYXRjaDogLT5cbiAgICAgICAgcmV0dXJuIGlmIEBkaXNwYXRjaGluZyBpcyB0cnVlIG9yIEBnZXRQb29sU2l6ZSgpIGlzIDBcbiAgICAgICAgcmV0dXJuIHBvb2wuc3BsaWNlKDAsIEBkaXNwYXRjaExpbWl0KSBpZiBAZHJ5UnVuIGlzIHRydWVcblxuICAgICAgICBldmVudHMgPSBwb29sLnNsaWNlIDAsIEBkaXNwYXRjaExpbWl0XG4gICAgICAgIG5hY2tzID0gMFxuXG4gICAgICAgIEBkaXNwYXRjaGluZyA9IHRydWVcblxuICAgICAgICBAc2hpcCBldmVudHMsIChlcnIsIHJlc3BvbnNlKSA9PlxuICAgICAgICAgICAgQGRpc3BhdGNoaW5nID0gZmFsc2VcblxuICAgICAgICAgICAgaWYgbm90IGVycj9cbiAgICAgICAgICAgICAgICByZXNwb25zZS5ldmVudHMuZm9yRWFjaCAocmVzRXZlbnQpIC0+XG4gICAgICAgICAgICAgICAgICAgIGlmIHJlc0V2ZW50LnN0YXR1cyBpcyAndmFsaWRhdGlvbl9lcnJvcicgb3IgcmVzRXZlbnQuc3RhdHVzIGlzICdhY2snXG4gICAgICAgICAgICAgICAgICAgICAgICBwb29sID0gcG9vbC5maWx0ZXIgKHBvb2xFdmVudCkgLT4gcG9vbEV2ZW50LmlkIGlzbnQgcmVzRXZlbnQuaWRcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAnbmFjaydcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hY2tzKytcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgICAgICMgS2VlcCBkaXNwYXRjaGluZyB1bnRpbCB0aGUgcG9vbCBzaXplIHJlYWNoZXMgYSBzYW5lIGxldmVsLlxuICAgICAgICAgICAgICAgIEBkaXNwYXRjaCgpIGlmIEBnZXRQb29sU2l6ZSgpID49IEBkaXNwYXRjaExpbWl0IGFuZCBuYWNrcyBpcyAwXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBcblxuICAgIHNoaXA6IChldmVudHMgPSBbXSwgY2FsbGJhY2spIC0+XG4gICAgICAgIGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB1cmwgPSBTR04uY29uZmlnLmdldCAnZXZlbnRzVHJhY2tVcmwnXG4gICAgICAgIHBheWxvYWQgPSBldmVudHM6IGV2ZW50cy5tYXAgKGV2ZW50KSAtPlxuICAgICAgICAgICAgZXZlbnQuc2VudEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG5cbiAgICAgICAgICAgIGV2ZW50XG5cbiAgICAgICAgaHR0cC5vcGVuICdQT1NUJywgdXJsXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlciAnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlciAnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIGh0dHAudGltZW91dCA9IDEwMDAgKiAyMFxuICAgICAgICBodHRwLm9ubG9hZCA9IC0+XG4gICAgICAgICAgICBpZiBodHRwLnN0YXR1cyBpcyAyMDBcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgbnVsbCwgSlNPTi5wYXJzZShodHRwLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICBjYXRjaCBlcnJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2UgSlNPTicpKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignU2VydmVyIGRpZCBub3QgYWNjZXB0IHJlcXVlc3QnKSlcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGh0dHAub25lcnJvciA9IC0+XG4gICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwZXJmb3JtIG5ldHdvcmsgcmVxdWVzdCcpKVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgaHR0cC5zZW5kIEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXG5cbiAgICAgICAgQFxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIHJlcXVlc3Q6IHJlcXVpcmUgJy4vcmVxdWVzdCdcbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxucGFyc2VDb29raWVzID0gKGNvb2tpZXMgPSBbXSkgLT5cbiAgICBwYXJzZWRDb29raWVzID0ge31cblxuICAgIGNvb2tpZXMubWFwIChjb29raWUpIC0+XG4gICAgICAgIHBhcnRzID0gY29va2llLnNwbGl0ICc7ICdcbiAgICAgICAga2V5VmFsdWVQYWlyID0gcGFydHNbMF0uc3BsaXQgJz0nXG4gICAgICAgIGtleSA9IGtleVZhbHVlUGFpclswXVxuICAgICAgICB2YWx1ZSA9IGtleVZhbHVlUGFpclsxXVxuXG4gICAgICAgIHBhcnNlZENvb2tpZXNba2V5XSA9IHZhbHVlXG5cbiAgICAgICAgcmV0dXJuXG4gICAgXG4gICAgcGFyc2VkQ29va2llc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRpb25zID0ge30sIGNhbGxiYWNrKSAtPlxuICAgIHVybCA9IFNHTi5jb25maWcuZ2V0ICdncmFwaFVybCdcbiAgICB0aW1lb3V0ID0gMTAwMCAqIDEyXG4gICAgYXBwS2V5ID0gU0dOLmNvbmZpZy5nZXQgJ2FwcEtleSdcbiAgICBhdXRoVG9rZW4gPSBTR04uY29uZmlnLmdldCAnYXV0aFRva2VuJ1xuICAgIGF1dGhUb2tlbkNvb2tpZU5hbWUgPSAnc2hvcGd1bi1hdXRoLXRva2VuJ1xuICAgIG9wdGlvbnMgPVxuICAgICAgICBtZXRob2Q6ICdwb3N0J1xuICAgICAgICB1cmw6IHVybFxuICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgICAgIGpzb246IHRydWVcbiAgICAgICAgaGVhZGVyczoge31cbiAgICAgICAgYm9keTpcbiAgICAgICAgICAgIHF1ZXJ5OiBvcHRpb25zLnF1ZXJ5XG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBvcHRpb25zLm9wZXJhdGlvbk5hbWVcbiAgICAgICAgICAgIHZhcmlhYmxlczogb3B0aW9ucy52YXJpYWJsZXNcblxuICAgICMgQXBwbHkgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2hlbiBhcHAga2V5IGlzIHByb3ZpZGVkIHRvIGF2b2lkIHJhdGUgbGltaXRpbmcuXG4gICAgb3B0aW9ucy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIFNHTi51dGlsLmJ0b2EoXCJhcHAta2V5OiN7YXBwS2V5fVwiKSBpZiBhcHBLZXk/XG5cbiAgICAjIFNldCBjb29raWVzIG1hbnVhbGx5IGluIG5vZGUuanMuXG4gICAgaWYgU0dOLnV0aWwuaXNOb2RlKCkgYW5kIGF1dGhUb2tlbj9cbiAgICAgICAgb3B0aW9ucy5jb29raWVzID0gW1xuICAgICAgICAgICAga2V5OiBhdXRoVG9rZW5Db29raWVOYW1lXG4gICAgICAgICAgICB2YWx1ZTogYXV0aFRva2VuXG4gICAgICAgICAgICB1cmw6IHVybFxuICAgICAgICBdXG4gICAgZWxzZSBpZiBTR04udXRpbC5pc0Jyb3dzZXIoKVxuICAgICAgICBvcHRpb25zLnVzZUNvb2tpZXMgPSB0cnVlXG5cbiAgICBTR04ucmVxdWVzdCBvcHRpb25zLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0dyYXBoIHJlcXVlc3QgZXJyb3InKSxcbiAgICAgICAgICAgICAgICBjb2RlOiAnR3JhcGhSZXF1ZXN0RXJyb3InXG4gICAgICAgICAgICApXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICMgVXBkYXRlIGF1dGggdG9rZW4gYXMgaXQgbWlnaHQgaGF2ZSBjaGFuZ2VkLlxuICAgICAgICAgICAgaWYgU0dOLnV0aWwuaXNOb2RlKClcbiAgICAgICAgICAgICAgICBjb29raWVzID0gcGFyc2VDb29raWVzIGRhdGEuaGVhZGVycz9bJ3NldC1jb29raWUnXVxuICAgICAgICAgICAgICAgIGF1dGhDb29raWUgPSBjb29raWVzW2F1dGhUb2tlbkNvb2tpZU5hbWVdXG5cbiAgICAgICAgICAgICAgICBpZiBTR04uY29uZmlnLmdldCgnYXV0aFRva2VuJykgaXNudCBhdXRoQ29va2llXG4gICAgICAgICAgICAgICAgICAgIFNHTi5jb25maWcuc2V0ICdhdXRoVG9rZW4nLCBhdXRoQ29va2llXG5cbiAgICAgICAgICAgIGlmIGRhdGEuc3RhdHVzQ29kZSBpcyAyMDBcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBudWxsLCBkYXRhLmJvZHlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0dyYXBoIEFQSSBlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBjb2RlOiAnR3JhcGhBUElFcnJvcidcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5zdGF0dXNDb2RlXG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmV0dXJuXG5cblxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5TR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5rZXlDb2RlcyA9IHJlcXVpcmUgJy4uLy4uL2tleS1jb2RlcydcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvbkNvbnRyb2xzXG4gICAgY29uc3RydWN0b3I6IChlbCwgQG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgQGVscyA9XG4gICAgICAgICAgICByb290OiBlbFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHBfX3Byb2dyZXNzJ1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXI6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHAtcHJvZ3Jlc3NfX2JhcidcbiAgICAgICAgICAgIHByb2dyZXNzTGFiZWw6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHBfX3Byb2dyZXNzLWxhYmVsJ1xuICAgICAgICAgICAgcHJldkNvbnRyb2w6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHBfX2NvbnRyb2xbZGF0YS1kaXJlY3Rpb249cHJldl0nXG4gICAgICAgICAgICBuZXh0Q29udHJvbDogZWwucXVlcnlTZWxlY3RvciAnLnNnbi1wcF9fY29udHJvbFtkYXRhLWRpcmVjdGlvbj1uZXh0XSdcblxuICAgICAgICBAa2V5RG93bkxpc3RlbmVyID0gU0dOLnV0aWwudGhyb3R0bGUgQGtleURvd24sIDE1MCwgQFxuICAgICAgICBAbW91c2VNb3ZlTGlzdGVuZXIgPSBTR04udXRpbC50aHJvdHRsZSBAbW91c2VNb3ZlLCA1MCwgQFxuXG4gICAgICAgIEBlbHMucm9vdC5hZGRFdmVudExpc3RlbmVyICdrZXlkb3duJywgQGtleURvd25MaXN0ZW5lciwgZmFsc2UgaWYgQG9wdGlvbnMua2V5Ym9hcmQgaXMgdHJ1ZVxuICAgICAgICBAZWxzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lciAnbW91c2Vtb3ZlJywgQG1vdXNlTW92ZUxpc3RlbmVyLCBmYWxzZVxuICAgICAgICBAZWxzLnByZXZDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgQHByZXZDbGlja2VkLmJpbmQoQCksIGZhbHNlIGlmIEBlbHMucHJldkNvbnRyb2w/XG4gICAgICAgIEBlbHMubmV4dENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCBAbmV4dENsaWNrZWQuYmluZChAKSwgZmFsc2UgaWYgQGVscy5uZXh0Q29udHJvbD9cblxuICAgICAgICBAYmluZCAnYmVmb3JlTmF2aWdhdGlvbicsIEBiZWZvcmVOYXZpZ2F0aW9uLmJpbmQoQClcblxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBlbHMucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyICdrZXlkb3duJywgQGtleURvd25MaXN0ZW5lclxuICAgICAgICBAZWxzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lciAnbW91c2Vtb3ZlJywgQG1vdXNlTW92ZUxpc3RlbmVyXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBiZWZvcmVOYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgc2hvd1Byb2dyZXNzID0gdHlwZW9mIGUucHJvZ3Jlc3NMYWJlbCBpcyAnc3RyaW5nJyBhbmQgZS5wcm9ncmVzc0xhYmVsLmxlbmd0aCA+IDBcbiAgICAgICAgdmlzaWJpbGl0eUNsYXNzTmFtZSA9ICdzZ24tcHAtLWhpZGRlbidcblxuICAgICAgICBpZiBAZWxzLnByb2dyZXNzPyBhbmQgQGVscy5wcm9ncmVzc0Jhcj9cbiAgICAgICAgICAgIEBlbHMucHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBcIiN7ZS5wcm9ncmVzc30lXCJcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgc2hvd1Byb2dyZXNzIGlzIHRydWVcbiAgICAgICAgICAgICAgICBAZWxzLnByb2dyZXNzLmNsYXNzTGlzdC5yZW1vdmUgdmlzaWJpbGl0eUNsYXNzTmFtZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEBlbHMucHJvZ3Jlc3MuY2xhc3NMaXN0LmFkZCB2aXNpYmlsaXR5Q2xhc3NOYW1lXG5cbiAgICAgICAgaWYgQGVscy5wcm9ncmVzc0xhYmVsP1xuICAgICAgICAgICAgaWYgc2hvd1Byb2dyZXNzIGlzIHRydWVcbiAgICAgICAgICAgICAgICBAZWxzLnByb2dyZXNzTGFiZWwudGV4dENvbnRlbnQgPSBlLnByb2dyZXNzTGFiZWxcbiAgICAgICAgICAgICAgICBAZWxzLnByb2dyZXNzTGFiZWwuY2xhc3NMaXN0LnJlbW92ZSB2aXNpYmlsaXR5Q2xhc3NOYW1lXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzc0xhYmVsLmNsYXNzTGlzdC5hZGQgdmlzaWJpbGl0eUNsYXNzTmFtZVxuXG4gICAgICAgIGlmIEBlbHMucHJldkNvbnRyb2w/XG4gICAgICAgICAgICBpZiBlLnZlcnNvLm5ld1Bvc2l0aW9uIGlzIDBcbiAgICAgICAgICAgICAgICBAZWxzLnByZXZDb250cm9sLmNsYXNzTGlzdC5hZGQgdmlzaWJpbGl0eUNsYXNzTmFtZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEBlbHMucHJldkNvbnRyb2wuY2xhc3NMaXN0LnJlbW92ZSB2aXNpYmlsaXR5Q2xhc3NOYW1lXG5cbiAgICAgICAgaWYgQGVscy5uZXh0Q29udHJvbD9cbiAgICAgICAgICAgIGlmIGUudmVyc28ubmV3UG9zaXRpb24gaXMgZS5wYWdlU3ByZWFkQ291bnQgLSAxXG4gICAgICAgICAgICAgICAgQGVscy5uZXh0Q29udHJvbC5jbGFzc0xpc3QuYWRkIHZpc2liaWxpdHlDbGFzc05hbWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAZWxzLm5leHRDb250cm9sLmNsYXNzTGlzdC5yZW1vdmUgdmlzaWJpbGl0eUNsYXNzTmFtZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcHJldkNsaWNrZWQ6IChlKSAtPlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBAdHJpZ2dlciAncHJldidcblxuICAgICAgICByZXR1cm5cblxuICAgIG5leHRDbGlja2VkOiAoZSkgLT5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgQHRyaWdnZXIgJ25leHQnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBrZXlEb3duOiAoZSkgLT5cbiAgICAgICAga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAgICAgIGlmIGtleUNvZGVzLkFSUk9XX0xFRlQgaXMga2V5Q29kZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3ByZXYnLCBkdXJhdGlvbjogMFxuICAgICAgICBlbHNlIGlmIGtleUNvZGVzLkFSUk9XX1JJR0hUIGlzIGtleUNvZGUgb3Iga2V5Q29kZXMuU1BBQ0UgaXMga2V5Q29kZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ25leHQnLCBkdXJhdGlvbjogMFxuICAgICAgICBlbHNlIGlmIGtleUNvZGVzLk5VTUJFUl9PTkUgaXMga2V5Q29kZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2ZpcnN0JywgZHVyYXRpb246IDBcblxuICAgICAgICByZXR1cm5cblxuICAgIG1vdXNlTW92ZTogLT5cbiAgICAgICAgQGVscy5yb290LmRhdGFzZXQubW91c2VNb3ZpbmcgPSB0cnVlXG5cbiAgICAgICAgY2xlYXJUaW1lb3V0IEBtb3VzZU1vdmVUaW1lb3V0XG5cbiAgICAgICAgQG1vdXNlTW92ZVRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgICBAZWxzLnJvb3QuZGF0YXNldC5tb3VzZU1vdmluZyA9IGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAsIDQwMDBcblxuICAgICAgICByZXR1cm5cblxuTWljcm9FdmVudC5taXhpbiBQYWdlZFB1YmxpY2F0aW9uQ29udHJvbHNcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uQ29udHJvbHNcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuUGFnZVNwcmVhZHMgPSByZXF1aXJlICcuL3BhZ2Utc3ByZWFkcydcbmNsaWVudExvY2FsU3RvcmFnZSA9IHJlcXVpcmUgJy4uLy4uL3N0b3JhZ2UvY2xpZW50LWxvY2FsJ1xuU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uQ29yZVxuICAgIGRlZmF1bHRzOlxuICAgICAgICBwYWdlczogW11cbiAgICAgICAgcGFnZVNwcmVhZFdpZHRoOiAxMDBcbiAgICAgICAgcGFnZVNwcmVhZE1heFpvb21TY2FsZTogNFxuICAgICAgICBpZGxlRGVsYXk6IDEwMDBcbiAgICAgICAgcmVzaXplRGVsYXk6IDQwMFxuICAgICAgICBjb2xvcjogJyNmZmZmZmYnXG5cbiAgICBjb25zdHJ1Y3RvcjogKGVsLCBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBvcHRpb25zID0gQG1ha2VPcHRpb25zIG9wdGlvbnMsIEBkZWZhdWx0c1xuICAgICAgICBAcGFnZUlkID0gQGdldE9wdGlvbiAncGFnZUlkJ1xuICAgICAgICBAZWxzID1cbiAgICAgICAgICAgIHJvb3Q6IGVsXG4gICAgICAgICAgICBwYWdlczogZWwucXVlcnlTZWxlY3RvciAnLnNnbi1wcF9fcGFnZXMnXG4gICAgICAgICAgICB2ZXJzbzogZWwucXVlcnlTZWxlY3RvciAnLnZlcnNvJ1xuICAgICAgICBAcGFnZU1vZGUgPSBAZ2V0UGFnZU1vZGUoKVxuICAgICAgICBAcGFnZVNwcmVhZHMgPSBuZXcgUGFnZVNwcmVhZHNcbiAgICAgICAgICAgIHBhZ2VzOiBAZ2V0T3B0aW9uICdwYWdlcydcbiAgICAgICAgICAgIG1heFpvb21TY2FsZTogQGdldE9wdGlvbiAncGFnZVNwcmVhZE1heFpvb21TY2FsZSdcbiAgICAgICAgICAgIHdpZHRoOiBAZ2V0T3B0aW9uICdwYWdlU3ByZWFkV2lkdGgnXG5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLmJpbmQgJ3BhZ2VMb2FkZWQnLCBAcGFnZUxvYWRlZC5iaW5kKEApXG4gICAgICAgIEBwYWdlU3ByZWFkcy5iaW5kICdwYWdlc0xvYWRlZCcsIEBwYWdlc0xvYWRlZC5iaW5kKEApXG5cbiAgICAgICAgQHNldENvbG9yIEBnZXRPcHRpb24oJ2NvbG9yJylcblxuICAgICAgICAjIEl0J3MgaW1wb3J0YW50IHRvIGluc2VydCB0aGUgcGFnZSBzcHJlYWRzIGJlZm9yZSBpbnN0YW50aWF0aW5nIFZlcnNvLlxuICAgICAgICBAZWxzLnBhZ2VzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlIEBwYWdlU3ByZWFkcy51cGRhdGUoQHBhZ2VNb2RlKS5nZXRGcmFnKCksIEBlbHMucGFnZXNcblxuICAgICAgICBAdmVyc28gPSBAY3JlYXRlVmVyc28oKVxuXG4gICAgICAgIEBiaW5kICdzdGFydGVkJywgQHN0YXJ0LmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ2Rlc3Ryb3llZCcsIEBkZXN0cm95LmJpbmQoQClcblxuICAgICAgICByZXR1cm5cblxuICAgIHN0YXJ0OiAtPlxuICAgICAgICBAZ2V0VmVyc28oKS5zdGFydCgpXG5cbiAgICAgICAgQHZpc2liaWxpdHlDaGFuZ2VMaXN0ZW5lciA9IEB2aXNpYmlsaXR5Q2hhbmdlLmJpbmQgQFxuICAgICAgICBAcmVzaXplTGlzdGVuZXIgPSBTR04udXRpbC50aHJvdHRsZSBAcmVzaXplLCBAZ2V0T3B0aW9uKCdyZXNpemVEZWxheScpLCBAXG4gICAgICAgIEB1bmxvYWRMaXN0ZW5lciA9IEB1bmxvYWQuYmluZCBAXG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAndmlzaWJpbGl0eWNoYW5nZScsIEB2aXNpYmlsaXR5Q2hhbmdlTGlzdGVuZXIsIGZhbHNlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXIsIGZhbHNlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICdiZWZvcmV1bmxvYWQnLCBAdW5sb2FkTGlzdGVuZXIsIGZhbHNlXG5cbiAgICAgICAgQGVscy5yb290LnNldEF0dHJpYnV0ZSAnZGF0YS1zdGFydGVkJywgJydcbiAgICAgICAgQGVscy5yb290LnNldEF0dHJpYnV0ZSAndGFiaW5kZXgnLCAnLTEnXG4gICAgICAgIEBlbHMucm9vdC5mb2N1cygpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAZ2V0VmVyc28oKS5kZXN0cm95KClcblxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyICd2aXNpYmlsaXR5Y2hhbmdlJywgQHZpc2liaWxpdHlDaGFuZ2VMaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEByZXNpemVMaXN0ZW5lciwgZmFsc2VcblxuICAgICAgICByZXR1cm5cblxuICAgIG1ha2VPcHRpb25zOiAob3B0aW9ucywgZGVmYXVsdHMpIC0+XG4gICAgICAgIG9wdHMgPSB7fVxuXG4gICAgICAgIG9wdHNba2V5XSA9IG9wdGlvbnNba2V5XSA/IGRlZmF1bHRzW2tleV0gZm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuXG4gICAgICAgIG9wdHNcblxuICAgIGdldE9wdGlvbjogKGtleSkgLT5cbiAgICAgICAgQG9wdGlvbnNba2V5XVxuXG4gICAgc2V0Q29sb3I6IChjb2xvcikgLT5cbiAgICAgICAgQGVscy5yb290LmRhdGFzZXQuY29sb3JCcmlnaHRuZXNzID0gU0dOLnV0aWwuZ2V0Q29sb3JCcmlnaHRuZXNzIGNvbG9yXG4gICAgICAgIEBlbHMucm9vdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXG4gICAgICAgIHJldHVyblxuXG4gICAgY3JlYXRlVmVyc286IC0+XG4gICAgICAgIFZlcnNvID0gcmVxdWlyZSAndmVyc28tYnJvd3NlcidcbiAgICAgICAgdmVyc28gPSBuZXcgVmVyc28gQGVscy52ZXJzbywgcGFnZUlkOiBAcGFnZUlkXG5cbiAgICAgICAgdmVyc28ucGFnZVNwcmVhZHMuZm9yRWFjaCBAb3ZlcnJpZGVQYWdlU3ByZWFkQ29udGVudFJlY3QuYmluZChAKVxuXG4gICAgICAgIHZlcnNvLmJpbmQgJ2JlZm9yZU5hdmlnYXRpb24nLCBAYmVmb3JlTmF2aWdhdGlvbi5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ2FmdGVyTmF2aWdhdGlvbicsIEBhZnRlck5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgQGF0dGVtcHRlZE5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdjbGlja2VkJywgQGNsaWNrZWQuYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdkb3VibGVDbGlja2VkJywgQGRvdWJsZUNsaWNrZWQuYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdwcmVzc2VkJywgQHByZXNzZWQuYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdwYW5TdGFydCcsIEBwYW5TdGFydC5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ3BhbkVuZCcsIEBwYW5FbmQuYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICd6b29tZWRJbicsIEB6b29tZWRJbi5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ3pvb21lZE91dCcsIEB6b29tZWRPdXQuYmluZChAKVxuXG4gICAgICAgIHZlcnNvXG5cbiAgICBnZXRWZXJzbzogLT5cbiAgICAgICAgQHZlcnNvXG5cbiAgICBnZXRDb250ZW50UmVjdDogKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIHJlY3QgPVxuICAgICAgICAgICAgdG9wOiAwXG4gICAgICAgICAgICBsZWZ0OiAwXG4gICAgICAgICAgICByaWdodDogMFxuICAgICAgICAgICAgYm90dG9tOiAwXG4gICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIHBhZ2VFbHMgPSBwYWdlU3ByZWFkLmdldFBhZ2VFbHMoKVxuICAgICAgICBwYWdlRWwgPSBwYWdlRWxzWzBdXG4gICAgICAgIHBhZ2VDb3VudCA9IHBhZ2VFbHMubGVuZ3RoXG4gICAgICAgIHNjYWxlID0gQGdldFZlcnNvKCkudHJhbnNmb3JtLnNjYWxlXG4gICAgICAgIHBhZ2VXaWR0aCA9IHBhZ2VFbC5vZmZzZXRXaWR0aCAqIHBhZ2VDb3VudCAqIHNjYWxlXG4gICAgICAgIHBhZ2VIZWlnaHQgPSBwYWdlRWwub2Zmc2V0SGVpZ2h0ICogc2NhbGVcbiAgICAgICAgaW1hZ2VSYXRpbyA9ICtwYWdlRWwuZGF0YXNldC5oZWlnaHQgLyAoK3BhZ2VFbC5kYXRhc2V0LndpZHRoICogcGFnZUNvdW50KVxuICAgICAgICBhY3R1YWxIZWlnaHQgPSBwYWdlSGVpZ2h0XG4gICAgICAgIGFjdHVhbFdpZHRoID0gYWN0dWFsSGVpZ2h0IC8gaW1hZ2VSYXRpb1xuICAgICAgICBhY3R1YWxXaWR0aCA9IE1hdGgubWluIHBhZ2VXaWR0aCwgYWN0dWFsV2lkdGhcbiAgICAgICAgYWN0dWFsSGVpZ2h0ID0gYWN0dWFsV2lkdGggKiBpbWFnZVJhdGlvXG4gICAgICAgIGNsaWVudFJlY3QgPVxuICAgICAgICAgICAgdG9wOiBwYWdlRWwub2Zmc2V0VG9wXG4gICAgICAgICAgICBsZWZ0OiBwYWdlRWwub2Zmc2V0TGVmdFxuXG4gICAgICAgIHJlY3Qud2lkdGggPSBhY3R1YWxXaWR0aFxuICAgICAgICByZWN0LmhlaWdodCA9IGFjdHVhbEhlaWdodFxuICAgICAgICByZWN0LnRvcCA9IGNsaWVudFJlY3QudG9wICsgKHBhZ2VIZWlnaHQgLSBhY3R1YWxIZWlnaHQpIC8gMlxuICAgICAgICByZWN0LmxlZnQgPSBjbGllbnRSZWN0LmxlZnQgKyAocGFnZVdpZHRoIC0gYWN0dWFsV2lkdGgpIC8gMlxuICAgICAgICByZWN0LnJpZ2h0ID0gcmVjdC53aWR0aCArIHJlY3QubGVmdFxuICAgICAgICByZWN0LmJvdHRvbSA9IHJlY3QuaGVpZ2h0ICsgcmVjdC50b3BcblxuICAgICAgICByZWN0XG5cbiAgICBmb3JtYXRQcm9ncmVzc0xhYmVsOiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgcGFnZXMgPSBwYWdlU3ByZWFkPy5vcHRpb25zLnBhZ2VzID8gW11cbiAgICAgICAgcGFnZUlkcyA9IHBhZ2VzLm1hcCAocGFnZSkgLT4gcGFnZS5pZFxuICAgICAgICBwYWdlTGFiZWxzID0gcGFnZXMubWFwIChwYWdlKSAtPiBwYWdlLmxhYmVsXG4gICAgICAgIHBhZ2VDb3VudCA9IEBnZXRPcHRpb24oJ3BhZ2VzJykubGVuZ3RoXG4gICAgICAgIGxhYmVsID0gaWYgcGFnZUlkcy5sZW5ndGggPiAwIHRoZW4gcGFnZUxhYmVscy5qb2luKCctJykgKyAnIC8gJyArIHBhZ2VDb3VudCBlbHNlIG51bGxcblxuICAgICAgICBsYWJlbFxuXG4gICAgcmVuZGVyUGFnZVNwcmVhZHM6IC0+XG4gICAgICAgIEBnZXRWZXJzbygpLnBhZ2VTcHJlYWRzLmZvckVhY2ggKHBhZ2VTcHJlYWQpID0+XG4gICAgICAgICAgICB2aXNpYmlsaXR5ID0gcGFnZVNwcmVhZC5nZXRWaXNpYmlsaXR5KClcbiAgICAgICAgICAgIG1hdGNoID0gQHBhZ2VTcHJlYWRzLmdldCBwYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICAgICAgaWYgbWF0Y2g/XG4gICAgICAgICAgICAgICAgaWYgdmlzaWJpbGl0eSBpcyAndmlzaWJsZScgYW5kIG1hdGNoLmNvbnRlbnRzUmVuZGVyZWQgaXMgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCBtYXRjaC5yZW5kZXJDb250ZW50cy5iaW5kKG1hdGNoKSwgMFxuICAgICAgICAgICAgICAgIGlmIHZpc2liaWxpdHkgaXMgJ2dvbmUnIGFuZCBtYXRjaC5jb250ZW50c1JlbmRlcmVkIGlzIHRydWVcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCBtYXRjaC5jbGVhckNvbnRlbnRzLmJpbmQobWF0Y2gpLCAwXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBcblxuICAgIGZpbmRQYWdlOiAocGFnZUlkKSAtPlxuICAgICAgICBAZ2V0T3B0aW9uKCdwYWdlcycpLmZpbmQgKHBhZ2UpIC0+IHBhZ2UuaWQgaXMgcGFnZUlkXG5cbiAgICBwYWdlTG9hZGVkOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwYWdlc0xvYWRlZDogKGUpIC0+XG4gICAgICAgIEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGJlZm9yZU5hdmlnYXRpb246IChlKSAtPlxuICAgICAgICBwb3NpdGlvbiA9IGUubmV3UG9zaXRpb25cbiAgICAgICAgdmVyc29QYWdlU3ByZWFkID0gQGdldFZlcnNvKCkuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBwb3NpdGlvblxuICAgICAgICBwYWdlU3ByZWFkID0gQHBhZ2VTcHJlYWRzLmdldCB2ZXJzb1BhZ2VTcHJlYWQuZ2V0SWQoKVxuICAgICAgICBwYWdlU3ByZWFkQ291bnQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkQ291bnQoKVxuICAgICAgICBwcm9ncmVzcyA9IChwb3NpdGlvbiArIDEpIC8gcGFnZVNwcmVhZENvdW50ICogMTAwXG4gICAgICAgIHByb2dyZXNzTGFiZWwgPSBAZm9ybWF0UHJvZ3Jlc3NMYWJlbCBwYWdlU3ByZWFkXG5cbiAgICAgICAgQHJlbmRlclBhZ2VTcHJlYWRzKClcbiAgICAgICAgQHJlc2V0SWRsZVRpbWVyKClcbiAgICAgICAgQHN0YXJ0SWRsZVRpbWVyKClcbiAgICAgICAgQHRyaWdnZXIgJ2JlZm9yZU5hdmlnYXRpb24nLFxuICAgICAgICAgICAgdmVyc286IGVcbiAgICAgICAgICAgIHBhZ2VTcHJlYWQ6IHBhZ2VTcHJlYWRcbiAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzc1xuICAgICAgICAgICAgcHJvZ3Jlc3NMYWJlbDogcHJvZ3Jlc3NMYWJlbFxuICAgICAgICAgICAgcGFnZVNwcmVhZENvdW50OiBwYWdlU3ByZWFkQ291bnRcblxuICAgICAgICByZXR1cm5cblxuICAgIGFmdGVyTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHBvc2l0aW9uID0gZS5uZXdQb3NpdGlvblxuICAgICAgICB2ZXJzb1BhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIHBvc2l0aW9uXG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAcGFnZVNwcmVhZHMuZ2V0IHZlcnNvUGFnZVNwcmVhZC5nZXRJZCgpXG5cbiAgICAgICAgQHRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsXG4gICAgICAgICAgICB2ZXJzbzogZVxuICAgICAgICAgICAgcGFnZVNwcmVhZDogcGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYXR0ZW1wdGVkTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgdmVyc286IGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGNsaWNrZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLmlzSW5zaWRlQ29udGVudFxuICAgICAgICAgICAgcGFnZUlkID0gZS5wYWdlRWwuZGF0YXNldC5pZFxuICAgICAgICAgICAgcGFnZSA9IEBmaW5kUGFnZSBwYWdlSWRcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ2NsaWNrZWQnLCB2ZXJzbzogZSwgcGFnZTogcGFnZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZG91YmxlQ2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGlmIGUuaXNJbnNpZGVDb250ZW50XG4gICAgICAgICAgICBwYWdlSWQgPSBlLnBhZ2VFbC5kYXRhc2V0LmlkXG4gICAgICAgICAgICBwYWdlID0gQGZpbmRQYWdlIHBhZ2VJZFxuXG4gICAgICAgICAgICBAdHJpZ2dlciAnZG91YmxlQ2xpY2tlZCcsIHZlcnNvOiBlLCBwYWdlOiBwYWdlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzc2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS5pc0luc2lkZUNvbnRlbnRcbiAgICAgICAgICAgIHBhZ2VJZCA9IGUucGFnZUVsLmRhdGFzZXQuaWRcbiAgICAgICAgICAgIHBhZ2UgPSBAZmluZFBhZ2UgcGFnZUlkXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdwcmVzc2VkJywgdmVyc286IGUsIHBhZ2U6IHBhZ2VcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhblN0YXJ0OiAtPlxuICAgICAgICBAcmVzZXRJZGxlVGltZXIoKVxuICAgICAgICBAdHJpZ2dlciAncGFuU3RhcnQnLCBzY2FsZTogQGdldFZlcnNvKCkudHJhbnNmb3JtLnNjYWxlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwYW5FbmQ6IC0+XG4gICAgICAgIEBzdGFydElkbGVUaW1lcigpXG4gICAgICAgIEB0cmlnZ2VyICdwYW5FbmQnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB6b29tZWRJbjogKGUpIC0+XG4gICAgICAgIHBvc2l0aW9uID0gZS5wb3NpdGlvblxuICAgICAgICB2ZXJzb1BhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIHBvc2l0aW9uXG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAcGFnZVNwcmVhZHMuZ2V0IHZlcnNvUGFnZVNwcmVhZC5nZXRJZCgpXG5cbiAgICAgICAgcGFnZVNwcmVhZC56b29tSW4oKSBpZiBwYWdlU3ByZWFkP1xuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtem9vbWVkLWluJywgdHJ1ZVxuICAgICAgICBAdHJpZ2dlciAnem9vbWVkSW4nLCB2ZXJzbzogZSwgcGFnZVNwcmVhZDogcGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgem9vbWVkT3V0OiAoZSkgLT5cbiAgICAgICAgcG9zaXRpb24gPSBlLnBvc2l0aW9uXG4gICAgICAgIHZlcnNvUGFnZVNwcmVhZCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgcGFnZVNwcmVhZCA9IEBwYWdlU3ByZWFkcy5nZXQgdmVyc29QYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBwYWdlU3ByZWFkLnpvb21PdXQoKSBpZiBwYWdlU3ByZWFkP1xuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtem9vbWVkLWluJywgZmFsc2VcbiAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHZlcnNvOiBlLCBwYWdlU3ByZWFkOiBwYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRQYWdlTW9kZTogLT5cbiAgICAgICAgcGFnZU1vZGUgPSBAZ2V0T3B0aW9uICdwYWdlTW9kZSdcblxuICAgICAgICBpZiBub3QgcGFnZU1vZGU/XG4gICAgICAgICAgICB3aWR0aCA9IEBlbHMucm9vdC5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgaGVpZ2h0ID0gQGVscy5yb290Lm9mZnNldEhlaWdodFxuXG4gICAgICAgICAgICBwYWdlTW9kZSA9IGlmIGhlaWdodCA+PSB3aWR0aCB0aGVuICdzaW5nbGUnIGVsc2UgJ2RvdWJsZSdcblxuICAgICAgICBwYWdlTW9kZVxuXG4gICAgcmVzZXRJZGxlVGltZXI6IC0+XG4gICAgICAgIGNsZWFyVGltZW91dCBAaWRsZVRpbWVvdXRcblxuICAgICAgICBAZWxzLnJvb3Quc2V0QXR0cmlidXRlICdkYXRhLWlkbGUnLCBmYWxzZVxuXG4gICAgICAgIEBcblxuICAgIHN0YXJ0SWRsZVRpbWVyOiAtPlxuICAgICAgICBAaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgICBAZWxzLnJvb3Quc2V0QXR0cmlidXRlICdkYXRhLWlkbGUnLCB0cnVlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAsIEBnZXRPcHRpb24oJ2lkbGVEZWxheScpXG5cbiAgICAgICAgQFxuXG4gICAgc3dpdGNoUGFnZU1vZGU6IChwYWdlTW9kZSkgLT5cbiAgICAgICAgcmV0dXJuIEAgaWYgQHBhZ2VNb2RlIGlzIHBhZ2VNb2RlXG5cbiAgICAgICAgdmVyc28gPSBAZ2V0VmVyc28oKVxuICAgICAgICBwYWdlSWRzID0gdmVyc28uZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbih2ZXJzby5nZXRQb3NpdGlvbigpKS5nZXRQYWdlSWRzKClcbiAgICAgICAgcGFnZVNwcmVhZEVscyA9IEBnZXRWZXJzbygpLmVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy5zZ24tcHBfX3BhZ2Utc3ByZWFkJ1xuXG4gICAgICAgIEBwYWdlTW9kZSA9IHBhZ2VNb2RlXG5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLnVwZGF0ZSBAcGFnZU1vZGVcblxuICAgICAgICBwYWdlU3ByZWFkRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBwYWdlU3ByZWFkRWwgZm9yIHBhZ2VTcHJlYWRFbCBpbiBwYWdlU3ByZWFkRWxzXG4gICAgICAgIEBlbHMucGFnZXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUgQHBhZ2VTcHJlYWRzLmdldEZyYWcoKSwgQGVscy5wYWdlc1xuXG4gICAgICAgIHZlcnNvLnJlZnJlc2goKVxuICAgICAgICB2ZXJzby5uYXZpZ2F0ZVRvIHZlcnNvLmdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQocGFnZUlkc1swXSksIGR1cmF0aW9uOiAwXG4gICAgICAgIHZlcnNvLnBhZ2VTcHJlYWRzLmZvckVhY2ggQG92ZXJyaWRlUGFnZVNwcmVhZENvbnRlbnRSZWN0LmJpbmQoQClcblxuICAgICAgICBAXG5cbiAgICBvdmVycmlkZVBhZ2VTcHJlYWRDb250ZW50UmVjdDogKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGlmIHBhZ2VTcHJlYWQuZ2V0VHlwZSgpIGlzICdwYWdlJ1xuICAgICAgICAgICAgcGFnZVNwcmVhZC5nZXRDb250ZW50UmVjdCA9ID0+IEBnZXRDb250ZW50UmVjdCBwYWdlU3ByZWFkXG5cbiAgICB2aXNpYmlsaXR5Q2hhbmdlOiAtPlxuICAgICAgICBwYWdlU3ByZWFkID0gQGdldFZlcnNvKCkuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBAZ2V0VmVyc28oKS5nZXRQb3NpdGlvbigpXG4gICAgICAgIGV2ZW50TmFtZSA9IGlmIGRvY3VtZW50LmhpZGRlbiBpcyB0cnVlIHRoZW4gJ2Rpc2FwcGVhcmVkJyBlbHNlICdhcHBlYXJlZCdcblxuICAgICAgICBAdHJpZ2dlciBldmVudE5hbWUsIHBhZ2VTcHJlYWQ6IEBwYWdlU3ByZWFkcy5nZXQocGFnZVNwcmVhZC5pZClcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlc2l6ZTogLT5cbiAgICAgICAgcGFnZU1vZGUgPSBAZ2V0UGFnZU1vZGUoKVxuXG4gICAgICAgIGlmIG5vdCBAZ2V0T3B0aW9uKCdwYWdlTW9kZScpPyBhbmQgcGFnZU1vZGUgaXNudCBAcGFnZU1vZGVcbiAgICAgICAgICAgIEBzd2l0Y2hQYWdlTW9kZSBwYWdlTW9kZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAdHJpZ2dlciAncmVzaXplZCdcblxuICAgICAgICByZXR1cm5cblxuICAgIHVubG9hZDogLT5cbiAgICAgICAgQHRyaWdnZXIgJ2Rpc2FwcGVhcmVkJ1xuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25Db3JlXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkNvcmVcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uRXZlbnRUcmFja2luZ1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAaGlkZGVuID0gdHJ1ZVxuICAgICAgICBAcGFnZVNwcmVhZCA9IG51bGxcblxuICAgICAgICBAYmluZCAnYXBwZWFyZWQnLCBAYXBwZWFyZWQuYmluZChAKVxuICAgICAgICBAYmluZCAnZGlzYXBwZWFyZWQnLCBAZGlzYXBwZWFyZWQuYmluZChAKVxuICAgICAgICBAYmluZCAnYmVmb3JlTmF2aWdhdGlvbicsIEBiZWZvcmVOYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ2FmdGVyTmF2aWdhdGlvbicsIEBhZnRlck5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICBAYmluZCAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIEBhdHRlbXB0ZWROYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ2NsaWNrZWQnLCBAY2xpY2tlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkb3VibGVDbGlja2VkJywgQGRvdWJsZUNsaWNrZWQuYmluZChAKVxuICAgICAgICBAYmluZCAncHJlc3NlZCcsIEBwcmVzc2VkLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3BhblN0YXJ0JywgQHBhblN0YXJ0LmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3pvb21lZEluJywgQHpvb21lZEluLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3pvb21lZE91dCcsIEB6b29tZWRPdXQuYmluZChAKVxuICAgICAgICBAYmluZCAnZGVzdHJveWVkJywgQGRlc3Ryb3kuYmluZChAKVxuXG4gICAgICAgIEB0cmFja09wZW5lZCgpXG4gICAgICAgIEB0cmFja0FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKVxuICAgICAgICBAdHJhY2tEaXNhcHBlYXJlZCgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB0cmFja0V2ZW50OiAodHlwZSwgcHJvcGVydGllcyA9IHt9KSAtPlxuICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsIHR5cGU6IHR5cGUsIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcblxuICAgICAgICByZXR1cm5cblxuICAgIHRyYWNrT3BlbmVkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLW9wZW5lZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja0FwcGVhcmVkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLWFwcGVhcmVkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrRGlzYXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tZGlzYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlQ2xpY2tlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLWNsaWNrZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlRG91YmxlQ2xpY2tlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLWRvdWJsZS1jbGlja2VkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrUGFnZUxvbmdQcmVzc2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtbG9uZy1wcmVzc2VkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrUGFnZUhvdHNwb3RzQ2xpY2tlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLWhvdHNwb3RzLWNsaWNrZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkQXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkRGlzYXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtZGlzYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkWm9vbWVkSW46IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtem9vbWVkLWluJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrUGFnZVNwcmVhZFpvb21lZE91dDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC16b29tZWQtb3V0JywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIGFwcGVhcmVkOiAoZSkgLT5cbiAgICAgICAgQHRyYWNrQXBwZWFyZWQoKVxuICAgICAgICBAcGFnZVNwcmVhZEFwcGVhcmVkIGUucGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGlzYXBwZWFyZWQ6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKVxuICAgICAgICBAdHJhY2tEaXNhcHBlYXJlZCgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBiZWZvcmVOYXZpZ2F0aW9uOiAtPlxuICAgICAgICBAcGFnZVNwcmVhZERpc2FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGFmdGVyTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIEBwYWdlU3ByZWFkQXBwZWFyZWQgZS5wYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhdHRlbXB0ZWROYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRBcHBlYXJlZCBlLnBhZ2VTcHJlYWRcblxuICAgICAgICByZXR1cm5cblxuICAgIGNsaWNrZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLnBhZ2U/XG4gICAgICAgICAgICBwcm9wZXJ0aWVzID1cbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyOiBlLnBhZ2UucGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHg6IGUudmVyc28ucGFnZVhcbiAgICAgICAgICAgICAgICB5OiBlLnZlcnNvLnBhZ2VZXG5cbiAgICAgICAgICAgIEB0cmFja1BhZ2VDbGlja2VkIHBhZ2VkUHVibGljYXRpb25QYWdlOiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBAdHJhY2tQYWdlSG90c3BvdHNDbGlja2VkIHBhZ2VkUHVibGljYXRpb25QYWdlOiBwcm9wZXJ0aWVzIGlmIGUudmVyc28ub3ZlcmxheUVscy5sZW5ndGggPiAwXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkb3VibGVDbGlja2VkOiAoZSkgPT5cbiAgICAgICAgaWYgZS5wYWdlP1xuICAgICAgICAgICAgQHRyYWNrUGFnZURvdWJsZUNsaWNrZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2U6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcjogZS5wYWdlLnBhZ2VOdW1iZXJcbiAgICAgICAgICAgICAgICB4OiBlLnZlcnNvLnBhZ2VYXG4gICAgICAgICAgICAgICAgeTogZS52ZXJzby5wYWdlWVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcHJlc3NlZDogKGUpIC0+XG4gICAgICAgIGlmIGUucGFnZT9cbiAgICAgICAgICAgIEB0cmFja1BhZ2VMb25nUHJlc3NlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZTpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyOiBlLnBhZ2UucGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHg6IGUudmVyc28ucGFnZVhcbiAgICAgICAgICAgICAgICB5OiBlLnZlcnNvLnBhZ2VZXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwYW5TdGFydDogKGUpIC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKSBpZiBlLnNjYWxlIGlzIDFcblxuICAgICAgICByZXR1cm5cblxuICAgIHpvb21lZEluOiAoZSkgLT5cbiAgICAgICAgaWYgZS5wYWdlU3ByZWFkP1xuICAgICAgICAgICAgQHRyYWNrUGFnZVNwcmVhZFpvb21lZEluIHBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkOlxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXJzOiBlLnBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgIHJldHVyblxuXG4gICAgem9vbWVkT3V0OiAoZSkgLT5cbiAgICAgICAgaWYgZS5wYWdlU3ByZWFkP1xuICAgICAgICAgICAgQHRyYWNrUGFnZVNwcmVhZFpvb21lZE91dCBwYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZDpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyczogZS5wYWdlU3ByZWFkLmdldFBhZ2VzKCkubWFwIChwYWdlKSAtPiBwYWdlLnBhZ2VOdW1iZXJcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VTcHJlYWRBcHBlYXJlZDogKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGlmIHBhZ2VTcHJlYWQ/IGFuZCBAaGlkZGVuIGlzIHRydWVcbiAgICAgICAgICAgIEBwYWdlU3ByZWFkID0gcGFnZVNwcmVhZFxuXG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkQXBwZWFyZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQ6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcnM6IHBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgICAgICBAaGlkZGVuID0gZmFsc2VcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VTcHJlYWREaXNhcHBlYXJlZDogLT5cbiAgICAgICAgaWYgQHBhZ2VTcHJlYWQ/IGFuZCBAaGlkZGVuIGlzIGZhbHNlXG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkRGlzYXBwZWFyZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQ6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcnM6IEBwYWdlU3ByZWFkLmdldFBhZ2VzKCkubWFwIChwYWdlKSAtPiBwYWdlLnBhZ2VOdW1iZXJcblxuICAgICAgICAgICAgQGhpZGRlbiA9IHRydWVcbiAgICAgICAgICAgIEBwYWdlU3ByZWFkID0gbnVsbFxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25FdmVudFRyYWNraW5nXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkV2ZW50VHJhY2tpbmdcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuR2F0b3IgPSByZXF1aXJlICdnYXRvcidcbk11c3RhY2hlID0gcmVxdWlyZSAnbXVzdGFjaGUnXG50ZW1wbGF0ZSA9IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hvdHNwb3QtcGlja2VyJ1xua2V5Q29kZXMgPSByZXF1aXJlICcuLi8uLi9rZXktY29kZXMnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25Ib3RzcG90UGlja2VyXG4gICAgY29uc3RydWN0b3I6IChAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgICAgIEByZXNpemVMaXN0ZW5lciA9IEByZXNpemUuYmluZCBAXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIHdpZHRoID0gQG9wdGlvbnMud2lkdGggPyAxMDBcbiAgICAgICAgaGVhZGVyID0gQG9wdGlvbnMuaGVhZGVyXG4gICAgICAgIHRlbXBsYXRlID0gQG9wdGlvbnMudGVtcGxhdGUgaWYgQG9wdGlvbnMudGVtcGxhdGU/XG4gICAgICAgIHRyaWdnZXIgPSBAdHJpZ2dlci5iaW5kIEBcbiAgICAgICAgdmlldyA9XG4gICAgICAgICAgICBoZWFkZXI6IGhlYWRlclxuICAgICAgICAgICAgaG90c3BvdHM6IEBvcHRpb25zLmhvdHNwb3RzXG4gICAgICAgICAgICB0b3A6IEBvcHRpb25zLnlcbiAgICAgICAgICAgIGxlZnQ6IEBvcHRpb25zLnhcblxuICAgICAgICBAZWwuY2xhc3NOYW1lID0gJ3Nnbi1wcF9faG90c3BvdC1waWNrZXInXG4gICAgICAgIEBlbC5zZXRBdHRyaWJ1dGUgJ3RhYmluZGV4JywgLTFcbiAgICAgICAgQGVsLmlubmVySFRNTCA9IE11c3RhY2hlLnJlbmRlciB0ZW1wbGF0ZSwgdmlld1xuXG4gICAgICAgIHBvcG92ZXJFbCA9IEBlbC5xdWVyeVNlbGVjdG9yICcuc2duX19wb3BvdmVyJ1xuICAgICAgICB3aWR0aCA9IHBvcG92ZXJFbC5vZmZzZXRXaWR0aFxuICAgICAgICBoZWlnaHQgPSBwb3BvdmVyRWwub2Zmc2V0SGVpZ2h0XG4gICAgICAgIHBhcmVudFdpZHRoID0gQGVsLnBhcmVudE5vZGUub2Zmc2V0V2lkdGhcbiAgICAgICAgcGFyZW50SGVpZ2h0ID0gQGVsLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgaWYgdmlldy50b3AgKyBoZWlnaHQgPiBwYXJlbnRIZWlnaHRcbiAgICAgICAgICAgIHBvcG92ZXJFbC5zdHlsZS50b3AgPSBwYXJlbnRIZWlnaHQgLSBoZWlnaHQgKyAncHgnXG5cbiAgICAgICAgaWYgdmlldy5sZWZ0ICsgd2lkdGggPiBwYXJlbnRXaWR0aFxuICAgICAgICAgICAgcG9wb3ZlckVsLnN0eWxlLmxlZnQgPSBwYXJlbnRXaWR0aCAtIHdpZHRoICsgJ3B4J1xuXG4gICAgICAgIEBlbC5hZGRFdmVudExpc3RlbmVyICdrZXl1cCcsIEBrZXlVcC5iaW5kKEApXG5cbiAgICAgICAgR2F0b3IoQGVsKS5vbiAnY2xpY2snLCAnW2RhdGEtaWRdJywgLT5cbiAgICAgICAgICAgIHRyaWdnZXIgJ3NlbGVjdGVkJywgaWQ6IEBnZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBHYXRvcihAZWwpLm9uICdjbGljaycsICdbZGF0YS1jbG9zZV0nLCBAZGVzdHJveS5iaW5kKEApXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEByZXNpemVMaXN0ZW5lciwgZmFsc2VcblxuICAgICAgICBAXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBAZWxcblxuICAgICAgICBAdHJpZ2dlciAnZGVzdHJveWVkJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAga2V5VXA6IChlKSAtPlxuICAgICAgICBAZGVzdHJveSgpIGlmIGUua2V5Q29kZSBpcyBrZXlDb2Rlcy5FU0NcbiAgICAgICAgXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplOiAtPlxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyXG5cbiAgICAgICAgQGRlc3Ryb3koKVxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25Ib3RzcG90UGlja2VyXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RQaWNrZXJcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuTXVzdGFjaGUgPSByZXF1aXJlICdtdXN0YWNoZSdcbnRlbXBsYXRlID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaG90c3BvdCdcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RzXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBjdXJyZW50UGFnZVNwcmVhZElkID0gbnVsbFxuICAgICAgICBAcGFnZVNwcmVhZHNMb2FkZWQgPSB7fVxuICAgICAgICBAY2FjaGUgPSB7fVxuXG4gICAgICAgIEBiaW5kICdob3RzcG90c1JlY2VpdmVkJywgQGhvdHNwb3RzUmVjZWl2ZWQuYmluZChAKVxuICAgICAgICBAYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgQGFmdGVyTmF2aWdhdGlvbi5iaW5kKEApXG4gICAgICAgIEBiaW5kICdwYWdlc0xvYWRlZCcsIEBwYWdlc0xvYWRlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdyZXNpemVkJywgQHJlc2l6ZWQuYmluZChAKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVuZGVySG90c3BvdHM6IChkYXRhKSAtPlxuICAgICAgICBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgIGNvbnRlbnRSZWN0ID0gZGF0YS52ZXJzb1BhZ2VTcHJlYWQuZ2V0Q29udGVudFJlY3QoKVxuICAgICAgICBwYWdlU3ByZWFkRWwgPSBkYXRhLnBhZ2VTcHJlYWQuZ2V0RWwoKVxuICAgICAgICBob3RzcG90RWxzID0gcGFnZVNwcmVhZEVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy5zZ24tcHBfX2hvdHNwb3QnXG5cbiAgICAgICAgaG90c3BvdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQgaG90c3BvdEVsIGZvciBob3RzcG90RWwgaW4gaG90c3BvdEVsc1xuXG4gICAgICAgIGZvciBpZCwgaG90c3BvdCBvZiBkYXRhLmhvdHNwb3RzXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbiBkYXRhLnBhZ2VzLCBkYXRhLnJhdGlvLCBob3RzcG90XG4gICAgICAgICAgICBlbCA9IEByZW5kZXJIb3RzcG90IGhvdHNwb3QsIHBvc2l0aW9uLCBjb250ZW50UmVjdFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkIGVsXG5cbiAgICAgICAgcGFnZVNwcmVhZEVsLmFwcGVuZENoaWxkIGZyYWdcblxuICAgICAgICBAXG5cbiAgICByZW5kZXJIb3RzcG90OiAoaG90c3BvdCwgcG9zaXRpb24sIGNvbnRlbnRSZWN0KSAtPlxuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgdG9wID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC5oZWlnaHQgLyAxMDAgKiBwb3NpdGlvbi50b3BcbiAgICAgICAgbGVmdCA9IE1hdGgucm91bmQgY29udGVudFJlY3Qud2lkdGggLyAxMDAgKiBwb3NpdGlvbi5sZWZ0XG4gICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC53aWR0aCAvIDEwMCAqIHBvc2l0aW9uLndpZHRoXG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQgY29udGVudFJlY3QuaGVpZ2h0IC8gMTAwICogcG9zaXRpb24uaGVpZ2h0XG5cbiAgICAgICAgdG9wICs9IE1hdGgucm91bmQgY29udGVudFJlY3QudG9wXG4gICAgICAgIGxlZnQgKz0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC5sZWZ0XG5cbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ3Nnbi1wcF9faG90c3BvdCB2ZXJzb19fb3ZlcmxheSdcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLWlkJywgaG90c3BvdC5pZCBpZiBob3RzcG90LmlkP1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtdHlwZScsIGhvdHNwb3QudHlwZSBpZiBob3RzcG90LnR5cGU/XG4gICAgICAgIGVsLmlubmVySFRNTCA9IE11c3RhY2hlLnJlbmRlciBob3RzcG90LnRlbXBsYXRlID8gdGVtcGxhdGUsIGhvdHNwb3RcblxuICAgICAgICBlbC5zdHlsZS50b3AgPSBcIiN7dG9wfXB4XCJcbiAgICAgICAgZWwuc3R5bGUubGVmdCA9IFwiI3tsZWZ0fXB4XCJcbiAgICAgICAgZWwuc3R5bGUud2lkdGggPSBcIiN7d2lkdGh9cHhcIlxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBcIiN7aGVpZ2h0fXB4XCJcblxuICAgICAgICBlbFxuXG4gICAgZ2V0UG9zaXRpb246IChwYWdlcywgcmF0aW8sIGhvdHNwb3QpIC0+XG4gICAgICAgIG1pblggPSBudWxsXG4gICAgICAgIG1pblkgPSBudWxsXG4gICAgICAgIG1heFggPSBudWxsXG4gICAgICAgIG1heFkgPSBudWxsXG4gICAgICAgIHBhZ2VOdW1iZXJzID0gcGFnZXMubWFwIChwYWdlKSAtPiBwYWdlLnBhZ2VOdW1iZXJcblxuICAgICAgICBmb3IgcGFnZU51bWJlciBvZiBob3RzcG90LmxvY2F0aW9uc1xuICAgICAgICAgICAgY29udGludWUgaWYgcGFnZU51bWJlcnMuaW5kZXhPZigrcGFnZU51bWJlcikgaXMgLTFcblxuICAgICAgICAgICAgaG90c3BvdC5sb2NhdGlvbnNbcGFnZU51bWJlcl0uZm9yRWFjaCAoY29vcmRzKSAtPlxuICAgICAgICAgICAgICAgIHggPSBjb29yZHNbMF1cbiAgICAgICAgICAgICAgICB5ID0gY29vcmRzWzFdXG5cbiAgICAgICAgICAgICAgICB4ICs9MSBpZiBwYWdlc1sxXSBhbmQgcGFnZU51bWJlcnNbMV0gaXMgK3BhZ2VOdW1iZXJcbiAgICAgICAgICAgICAgICB4IC89IHBhZ2VzLmxlbmd0aFxuXG4gICAgICAgICAgICAgICAgaWYgbm90IG1pblg/XG4gICAgICAgICAgICAgICAgICAgIG1pblggPSBtYXhYID0geFxuICAgICAgICAgICAgICAgICAgICBtaW5ZID0gbWF4WSA9IHlcblxuICAgICAgICAgICAgICAgIG1pblggPSB4IGlmIHggPCBtaW5YXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggaWYgeCA+IG1heFhcbiAgICAgICAgICAgICAgICBtaW5ZID0geSBpZiB5IDwgbWluWVxuICAgICAgICAgICAgICAgIG1heFkgPSB5IGlmIHkgPiBtYXhZXG5cbiAgICAgICAgd2lkdGggPSBtYXhYIC0gbWluWFxuICAgICAgICBoZWlnaHQgPSBtYXhZIC0gbWluWVxuXG4gICAgICAgIHRvcDogbWluWSAvIHJhdGlvICogMTAwXG4gICAgICAgIGxlZnQ6IG1pblggKiAxMDBcbiAgICAgICAgd2lkdGg6IHdpZHRoICogMTAwXG4gICAgICAgIGhlaWdodDogaGVpZ2h0IC8gcmF0aW8gKiAxMDBcblxuICAgIHJlcXVlc3RIb3RzcG90czogKHBhZ2VTcHJlYWRJZCwgcGFnZXMpIC0+XG4gICAgICAgIEB0cmlnZ2VyICdob3RzcG90c1JlcXVlc3RlZCcsXG4gICAgICAgICAgICBpZDogcGFnZVNwcmVhZElkXG4gICAgICAgICAgICBwYWdlczogcGFnZXNcblxuICAgICAgICByZXR1cm5cblxuICAgIGhvdHNwb3RzUmVjZWl2ZWQ6IChlKSAtPlxuICAgICAgICBwYWdlU3ByZWFkSWQgPSBlLnBhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgIEBzZXRDYWNoZSBwYWdlU3ByZWFkSWQsIGVcbiAgICAgICAgQHJlbmRlckhvdHNwb3RzIGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldENhY2hlOiAocGFnZVNwcmVhZElkKSAtPlxuICAgICAgICBAY2FjaGVbcGFnZVNwcmVhZElkXVxuXG4gICAgc2V0Q2FjaGU6IChwYWdlU3ByZWFkSWQsIGRhdGEpIC0+XG4gICAgICAgIEBjYWNoZVtwYWdlU3ByZWFkSWRdID0gZGF0YVxuXG4gICAgICAgIEBcblxuICAgIGFmdGVyTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBub3QgZS5wYWdlU3ByZWFkP1xuXG4gICAgICAgIGlkID0gZS5wYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBAY3VycmVudFBhZ2VTcHJlYWRJZCA9IGlkXG4gICAgICAgIEByZXF1ZXN0SG90c3BvdHMgaWQsIGUucGFnZVNwcmVhZC5nZXRQYWdlcygpIGlmIEBwYWdlU3ByZWFkc0xvYWRlZFtpZF1cblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VzTG9hZGVkOiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzTG9hZGVkW2UucGFnZVNwcmVhZElkXSA9IHRydWVcbiAgICAgICAgQHJlcXVlc3RIb3RzcG90cyBlLnBhZ2VTcHJlYWRJZCwgZS5wYWdlcyBpZiBAY3VycmVudFBhZ2VTcHJlYWRJZCBpcyBlLnBhZ2VTcHJlYWRJZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplZDogKGUpIC0+XG4gICAgICAgIGRhdGEgPSBAZ2V0Q2FjaGUgQGN1cnJlbnRQYWdlU3ByZWFkSWRcblxuICAgICAgICBAcmVuZGVySG90c3BvdHMgZGF0YSBpZiBkYXRhP1xuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25Ib3RzcG90c1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25Ib3RzcG90c1xuXG5cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBWaWV3ZXI6IHJlcXVpcmUgJy4vdmlld2VyJ1xuXG4gICAgSG90c3BvdFBpY2tlcjogcmVxdWlyZSAnLi9ob3RzcG90LXBpY2tlcidcblxuICAgIE1haW46IHJlcXVpcmUgJy4vbWFpbidcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uTGVnYWN5RXZlbnRUcmFja2luZ1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAYmluZCAnZXZlbnRUcmFja2VkJywgQGV2ZW50VHJhY2tlZC5iaW5kKEApXG4gICAgICAgIEB6b29tZWRJbiA9IGZhbHNlXG4gICAgICAgIEBhcHBlYXJlZEF0ID0gbnVsbFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgdHJhY2tFdmVudDogKGUpIC0+XG4gICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JywgZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZXZlbnRUcmFja2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS50eXBlIGlzICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC1hcHBlYXJlZCdcbiAgICAgICAgICAgIEBhcHBlYXJlZEF0ID0gRGF0ZS5ub3coKVxuICAgICAgICBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLWRpc2FwcGVhcmVkJ1xuICAgICAgICAgICAgQHRyaWdnZXIgJ3RyYWNrRXZlbnQnLFxuICAgICAgICAgICAgICAgIHR5cGU6IGlmIEB6b29tZWRJbiB0aGVuICd6b29tJyBlbHNlICd2aWV3J1xuICAgICAgICAgICAgICAgIG1zOiBEYXRlLm5vdygpIC0gQGFwcGVhcmVkQXRcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogQGdldE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgICAgICBwYWdlczogZS5wcm9wZXJ0aWVzLnBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkLnBhZ2VOdW1iZXJzXG4gICAgICAgIGVsc2UgaWYgZS50eXBlIGlzICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC16b29tZWQtaW4nXG4gICAgICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3ZpZXcnXG4gICAgICAgICAgICAgICAgbXM6IEBnZXREdXJhdGlvbigpXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IEBnZXRPcmllbnRhdGlvbigpXG4gICAgICAgICAgICAgICAgcGFnZXM6IGUucHJvcGVydGllcy5wYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZC5wYWdlTnVtYmVyc1xuXG4gICAgICAgICAgICBAem9vbWVkSW4gPSB0cnVlXG4gICAgICAgICAgICBAYXBwZWFyZWRBdCA9IERhdGUubm93KClcbiAgICAgICAgZWxzZSBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLXpvb21lZC1vdXQnXG4gICAgICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3pvb20nXG4gICAgICAgICAgICAgICAgbXM6IEBnZXREdXJhdGlvbigpXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IEBnZXRPcmllbnRhdGlvbigpXG4gICAgICAgICAgICAgICAgcGFnZXM6IGUucHJvcGVydGllcy5wYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZC5wYWdlTnVtYmVyc1xuXG4gICAgICAgICAgICBAem9vbWVkSW4gPSBmYWxzZVxuICAgICAgICAgICAgQGFwcGVhcmVkQXQgPSBEYXRlLm5vdygpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRPcmllbnRhdGlvbjogLT5cbiAgICAgICAgaWYgd2luZG93LmlubmVyV2lkdGggPj0gd2luZG93LmlubmVySGVpZ2h0IHRoZW4gJ2xhbmRzY2FwZScgZWxzZSAncG9ydHJhaXQnXG5cbiAgICBnZXREdXJhdGlvbjogLT5cbiAgICAgICAgRGF0ZS5ub3coKSAtIEBhcHBlYXJlZEF0XG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkxlZ2FjeUV2ZW50VHJhY2tpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uTGVnYWN5RXZlbnRUcmFja2luZ1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5TR04gPSByZXF1aXJlICcuLi8uLi9jb3JlJ1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uTWFpblxuICAgIGNvbnN0cnVjdG9yOiAoQGVsLCBAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAZGF0YSA9XG4gICAgICAgICAgICBkZXRhaWxzOiBudWxsXG4gICAgICAgICAgICBwYWdlczogbnVsbFxuICAgICAgICAgICAgaG90c3BvdHM6IG51bGxcbiAgICAgICAgQGhvdHNwb3RzID0ge31cbiAgICAgICAgQGhvdHNwb3RRdWV1ZSA9IFtdXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZW5kZXJWaWV3ZXI6IC0+XG4gICAgICAgIEB2aWV3ZXIgPSBuZXcgU0dOLlBhZ2VkUHVibGljYXRpb25LaXQuVmlld2VyIEBlbCxcbiAgICAgICAgICAgIGlkOiBAb3B0aW9ucy5pZFxuICAgICAgICAgICAgb3duZWRCeTogQGRhdGEuZGV0YWlscy5kZWFsZXJfaWRcbiAgICAgICAgICAgIGNvbG9yOiAnIycgKyBAZGF0YS5kZXRhaWxzLmJyYW5kaW5nLnBhZ2VmbGlwLmNvbG9yXG4gICAgICAgICAgICBrZXlib2FyZDogdHJ1ZVxuICAgICAgICAgICAgZXZlbnRUcmFja2VyOiBAb3B0aW9ucy5ldmVudFRyYWNrZXJcbiAgICAgICAgICAgIHBhZ2VzOiBAdHJhbnNmb3JtUGFnZXMgQGRhdGEucGFnZXNcblxuICAgICAgICBAdmlld2VyLmJpbmQgJ2hvdHNwb3RzUmVxdWVzdGVkJywgKGUpID0+XG4gICAgICAgICAgICBAaG90c3BvdFF1ZXVlLnB1c2ggZVxuICAgICAgICAgICAgQHByb2Nlc3NIb3RzcG90UXVldWUoKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAdmlld2VyLmJpbmQgJ2JlZm9yZU5hdmlnYXRpb24nLCA9PlxuICAgICAgICAgICAgQGhvdHNwb3RQaWNrZXIuZGVzdHJveSgpIGlmIEBob3RzcG90UGlja2VyP1xuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAdmlld2VyLmJpbmQgJ2NsaWNrZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIGNsaWNrZWRIb3RzcG90cyA9IGUudmVyc28ub3ZlcmxheUVscy5tYXAgKG92ZXJsYXlFbCkgPT5cbiAgICAgICAgICAgICAgICBAZGF0YS5ob3RzcG90c1tvdmVybGF5RWwuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyldXG5cbiAgICAgICAgICAgIGlmIGNsaWNrZWRIb3RzcG90cy5sZW5ndGggaXMgMVxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdob3RzcG90U2VsZWN0ZWQnLCBjbGlja2VkSG90c3BvdHNbMF1cbiAgICAgICAgICAgIGVsc2UgaWYgY2xpY2tlZEhvdHNwb3RzLmxlbmd0aCA+IDFcbiAgICAgICAgICAgICAgICBob3RzcG90cyA9IGNsaWNrZWRIb3RzcG90c1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyIChob3RzcG90KSAtPiBob3RzcG90LnR5cGUgaXMgJ29mZmVyJ1xuICAgICAgICAgICAgICAgICAgICAubWFwIChob3RzcG90KSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGhvdHNwb3QuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBob3RzcG90Lm9mZmVyLmhlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnRpdGxlOiBob3RzcG90Lm9mZmVyLnByaWNpbmcuY3VycmVuY3kgKyAnJyArIGhvdHNwb3Qub2ZmZXIucHJpY2luZy5wcmljZVxuXG4gICAgICAgICAgICAgICAgQGhvdHNwb3RQaWNrZXIgPSBuZXcgU0dOLlBhZ2VkUHVibGljYXRpb25LaXQuSG90c3BvdFBpY2tlclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6ICdXaGljaCBvZmZlciBkaWQgeW91IG1lYW4/J1xuICAgICAgICAgICAgICAgICAgICB4OiBlLnZlcnNvLnhcbiAgICAgICAgICAgICAgICAgICAgeTogZS52ZXJzby55XG4gICAgICAgICAgICAgICAgICAgIGhvdHNwb3RzOiBob3RzcG90c1xuXG4gICAgICAgICAgICAgICAgQGhvdHNwb3RQaWNrZXIuYmluZCAnc2VsZWN0ZWQnLCAoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgQHRyaWdnZXIgJ2hvdHNwb3RTZWxlY3RlZCcsIEBkYXRhLmhvdHNwb3RzW2UuaWRdXG4gICAgICAgICAgICAgICAgICAgIEBob3RzcG90UGlja2VyLmRlc3Ryb3koKVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICAgICAgQGhvdHNwb3RQaWNrZXIuYmluZCAnZGVzdHJveWVkJywgPT5cbiAgICAgICAgICAgICAgICAgICAgQGhvdHNwb3RQaWNrZXIgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgIEB2aWV3ZXIuZWwuZm9jdXMoKVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICAgICAgQHZpZXdlci5lbC5hcHBlbmRDaGlsZCBAaG90c3BvdFBpY2tlci5lbFxuICAgICAgICAgICAgICAgIEBob3RzcG90UGlja2VyLnJlbmRlcigpLmVsLmZvY3VzKClcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQFxuXG4gICAgdHJhbnNmb3JtUGFnZXM6IChwYWdlcykgLT5cbiAgICAgICAgcGFnZXMubWFwIChwYWdlLCBpKSAtPlxuICAgICAgICAgICAgcGFnZU51bWJlciA9IGkgKyAxXG5cbiAgICAgICAgICAgIGlkOiAncGFnZScgKyBwYWdlTnVtYmVyXG4gICAgICAgICAgICBsYWJlbDogcGFnZU51bWJlciArICcnXG4gICAgICAgICAgICBwYWdlTnVtYmVyOiBwYWdlTnVtYmVyXG4gICAgICAgICAgICBpbWFnZXM6XG4gICAgICAgICAgICAgICAgbWVkaXVtOiBwYWdlLnZpZXdcbiAgICAgICAgICAgICAgICBsYXJnZTogcGFnZS56b29tXG5cbiAgICBwcm9jZXNzSG90c3BvdFF1ZXVlOiAtPlxuICAgICAgICByZXR1cm4gaWYgbm90IEB2aWV3ZXIgb3Igbm90IEBkYXRhLmhvdHNwb3RzXG5cbiAgICAgICAgQGhvdHNwb3RRdWV1ZSA9IEBob3RzcG90UXVldWUuZmlsdGVyIChob3RzcG90UmVxdWVzdCkgPT5cbiAgICAgICAgICAgIGhvdHNwb3RzID0ge31cblxuICAgICAgICAgICAgZm9yIGlkLCBob3RzcG90IG9mIEBkYXRhLmhvdHNwb3RzXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaG90c3BvdFJlcXVlc3QucGFnZXMuZm9yRWFjaCAocGFnZSkgLT5cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlIGlmIGhvdHNwb3QubG9jYXRpb25zW3BhZ2UucGFnZU51bWJlcl0/XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICBpZiBtYXRjaFxuICAgICAgICAgICAgICAgICAgICBob3RzcG90c1tpZF0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogaG90c3BvdC50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaG90c3BvdC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zOiBob3RzcG90LmxvY2F0aW9uc1xuXG4gICAgICAgICAgICBAdmlld2VyLnRyaWdnZXIgJ2hvdHNwb3RzUmVjZWl2ZWQnLFxuICAgICAgICAgICAgICAgIGlkOiBob3RzcG90UmVxdWVzdC5pZFxuICAgICAgICAgICAgICAgIHBhZ2VzOiBob3RzcG90UmVxdWVzdC5wYWdlc1xuICAgICAgICAgICAgICAgIHJhdGlvOiBAZGF0YS5kZXRhaWxzLmRpbWVuc2lvbnMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgaG90c3BvdHM6IGhvdHNwb3RzXG5cbiAgICAgICAgICAgIGZhbHNlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBmZXRjaDogKGNhbGxiYWNrKSAtPlxuICAgICAgICBTR04uQ29yZUtpdC5yZXF1ZXN0XG4gICAgICAgICAgICB1cmw6IFwiL3YyL2NhdGFsb2dzLyN7QG9wdGlvbnMuaWR9XCJcbiAgICAgICAgLCBjYWxsYmFja1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgZmV0Y2hQYWdlczogKGNhbGxiYWNrKSAtPlxuICAgICAgICBTR04uQ29yZUtpdC5yZXF1ZXN0XG4gICAgICAgICAgICB1cmw6IFwiL3YyL2NhdGFsb2dzLyN7QG9wdGlvbnMuaWR9L3BhZ2VzXCJcbiAgICAgICAgLCBjYWxsYmFja1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgZmV0Y2hIb3RzcG90czogKGNhbGxiYWNrKSAtPlxuICAgICAgICBTR04uQ29yZUtpdC5yZXF1ZXN0XG4gICAgICAgICAgICB1cmw6IFwiL3YyL2NhdGFsb2dzLyN7QG9wdGlvbnMuaWR9L2hvdHNwb3RzXCJcbiAgICAgICAgLCBjYWxsYmFja1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgZmV0Y2hBbGw6IChjYWxsYmFjaykgLT5cbiAgICAgICAgU0dOLnV0aWwuYXN5bmMucGFyYWxsZWwgW1xuICAgICAgICAgICAgQGZldGNoLmJpbmQoQCksXG4gICAgICAgICAgICBAZmV0Y2hQYWdlcy5iaW5kKEApXG4gICAgICAgIF0sIChyZXN1bHQpID0+XG4gICAgICAgICAgICBkZXRhaWxzID0gcmVzdWx0WzBdWzFdXG4gICAgICAgICAgICBwYWdlcyA9IHJlc3VsdFsxXVsxXVxuXG4gICAgICAgICAgICBpZiBkZXRhaWxzPyBhbmQgcGFnZXM/XG4gICAgICAgICAgICAgICAgQGRhdGEuZGV0YWlscyA9IGRldGFpbHNcbiAgICAgICAgICAgICAgICBAZGF0YS5wYWdlcyA9IHBhZ2VzXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKClcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGZldGNoSG90c3BvdHMgKGVyciwgcmVzcG9uc2UpID0+XG4gICAgICAgICAgICByZXR1cm4gaWYgZXJyP1xuXG4gICAgICAgICAgICBAZGF0YS5ob3RzcG90cyA9IHt9XG5cbiAgICAgICAgICAgIHJlc3BvbnNlLmZvckVhY2ggKGhvdHNwb3QpID0+XG4gICAgICAgICAgICAgICAgQGRhdGEuaG90c3BvdHNbaG90c3BvdC5pZF0gPSBob3RzcG90XG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgQHByb2Nlc3NIb3RzcG90UXVldWUoKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuTWljcm9FdmVudC5taXhpbiBQYWdlZFB1YmxpY2F0aW9uTWFpblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25NYWluXG4iLCJNaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRcbiAgICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBjb250ZW50c1JlbmRlcmVkID0gZmFsc2VcbiAgICAgICAgQGhvdHNwb3RzUmVuZGVyZWQgPSBmYWxzZVxuICAgICAgICBAZWwgPSBAcmVuZGVyRWwoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0SWQ6IC0+XG4gICAgICAgIEBvcHRpb25zLmlkXG5cbiAgICBnZXRFbDogLT5cbiAgICAgICAgQGVsXG5cbiAgICBnZXRQYWdlczogLT5cbiAgICAgICAgQG9wdGlvbnMucGFnZXNcblxuICAgIHJlbmRlckVsOiAtPlxuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgcGFnZUlkcyA9IEBnZXRQYWdlcygpLm1hcCAocGFnZSkgLT4gcGFnZS5pZFxuXG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICd2ZXJzb19fcGFnZS1zcHJlYWQgc2duLXBwX19wYWdlLXNwcmVhZCdcblxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWQnLCBAZ2V0SWQoKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtdHlwZScsICdwYWdlJ1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtd2lkdGgnLCBAb3B0aW9ucy53aWR0aFxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtcGFnZS1pZHMnLCBwYWdlSWRzLmpvaW4oJywnKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtbWF4LXpvb20tc2NhbGUnLCBAb3B0aW9ucy5tYXhab29tU2NhbGVcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLXpvb21hYmxlJywgZmFsc2VcblxuICAgICAgICBlbFxuXG4gICAgcmVuZGVyQ29udGVudHM6IC0+XG4gICAgICAgIGlkID0gQGdldElkKClcbiAgICAgICAgZWwgPSBAZ2V0RWwoKVxuICAgICAgICBwYWdlcyA9IEBnZXRQYWdlcygpXG4gICAgICAgIHBhZ2VDb3VudCA9IHBhZ2VzLmxlbmd0aFxuICAgICAgICBpbWFnZUxvYWRzID0gMFxuXG4gICAgICAgIHBhZ2VzLmZvckVhY2ggKHBhZ2UsIGkpID0+XG4gICAgICAgICAgICBpbWFnZSA9IHBhZ2UuaW1hZ2VzLm1lZGl1bVxuICAgICAgICAgICAgcGFnZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgICAgICAgbG9hZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG5cbiAgICAgICAgICAgIHBhZ2VFbC5jbGFzc05hbWUgPSAnc2duLXBwX19wYWdlIHZlcnNvX19wYWdlJ1xuICAgICAgICAgICAgcGFnZUVsLmRhdGFzZXQuaWQgPSBwYWdlLmlkIGlmIHBhZ2UuaWQ/XG5cbiAgICAgICAgICAgIGlmIHBhZ2VDb3VudCBpcyAyXG4gICAgICAgICAgICAgICAgcGFnZUVsLmNsYXNzTmFtZSArPSBpZiBpIGlzIDAgdGhlbiAnIHZlcnNvLXBhZ2UtLXZlcnNvJyBlbHNlICcgdmVyc28tcGFnZS0tcmVjdG8nXG5cbiAgICAgICAgICAgIHBhZ2VFbC5hcHBlbmRDaGlsZCBsb2FkZXJFbFxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQgcGFnZUVsXG5cbiAgICAgICAgICAgIGxvYWRlckVsLmNsYXNzTmFtZSA9ICdzZ24tcHAtcGFnZV9fbG9hZGVyJ1xuICAgICAgICAgICAgbG9hZGVyRWwuaW5uZXJIVE1MID0gXCI8c3Bhbj4je3BhZ2UubGFiZWx9PC9zcGFuPlwiXG5cbiAgICAgICAgICAgIFNHTi51dGlsLmxvYWRJbWFnZSBpbWFnZSwgKGVyciwgd2lkdGgsIGhlaWdodCkgPT5cbiAgICAgICAgICAgICAgICBpZiBub3QgZXJyP1xuICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlID0gKytpbWFnZUxvYWRzIGlzIHBhZ2VDb3VudFxuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgje2ltYWdlfSlcIlxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuZGF0YXNldC53aWR0aCA9IHdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5kYXRhc2V0LmhlaWdodCA9IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuaW5uZXJIVE1MID0gJyZuYnNwOydcblxuICAgICAgICAgICAgICAgICAgICBlbC5kYXRhc2V0Lnpvb21hYmxlID0gdHJ1ZSBpZiBpc0NvbXBsZXRlXG5cbiAgICAgICAgICAgICAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBwYWdlU3ByZWFkSWQ6IGlkLCBwYWdlOiBwYWdlXG4gICAgICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIHBhZ2VTcHJlYWRJZDogaWQsIHBhZ2VzOiBwYWdlcyBpZiBpc0NvbXBsZXRlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsb2FkZXJFbC5pbm5lckhUTUwgPSAnPHNwYW4+ITwvc3Bhbj4nXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGNvbnRlbnRzUmVuZGVyZWQgPSB0cnVlXG5cbiAgICAgICAgQFxuXG4gICAgY2xlYXJDb250ZW50czogKHBhZ2VTcHJlYWQsIHZlcnNvUGFnZVNwcmVhZCkgLT5cbiAgICAgICAgQGVsLmlubmVySFRNTCA9ICcnXG4gICAgICAgIEBjb250ZW50c1JlbmRlcmVkID0gZmFsc2VcblxuICAgICAgICBAXG5cbiAgICB6b29tSW46IC0+XG4gICAgICAgIHBhZ2VFbHMgPSBbXS5zbGljZS5jYWxsIEBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2duLXBwX19wYWdlJylcbiAgICAgICAgcGFnZXMgPSBAZ2V0UGFnZXMoKVxuXG4gICAgICAgIHBhZ2VFbHMuZm9yRWFjaCAocGFnZUVsKSA9PlxuICAgICAgICAgICAgaWQgPSBwYWdlRWwuZGF0YXNldC5pZFxuICAgICAgICAgICAgcGFnZSA9IHBhZ2VzLmZpbmQgKHBhZ2UpIC0+IHBhZ2UuaWQgaXMgaWRcbiAgICAgICAgICAgIGltYWdlID0gcGFnZS5pbWFnZXMubGFyZ2VcblxuICAgICAgICAgICAgU0dOLnV0aWwubG9hZEltYWdlIGltYWdlLCAoZXJyKSA9PlxuICAgICAgICAgICAgICAgIGlmIG5vdCBlcnI/IGFuZCBAZWwuZGF0YXNldC5hY3RpdmUgaXMgJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5kYXRhc2V0LmltYWdlID0gcGFnZUVsLnN0eWxlLmJhY2tncm91bmRJbWFnZVxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoI3tpbWFnZX0pXCJcblxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIHpvb21PdXQ6IC0+XG4gICAgICAgIHBhZ2VFbHMgPSBbXS5zbGljZS5jYWxsIEBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2duLXBwX19wYWdlW2RhdGEtaW1hZ2VdJylcblxuICAgICAgICBwYWdlRWxzLmZvckVhY2ggKHBhZ2VFbCkgLT5cbiAgICAgICAgICAgIHBhZ2VFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBwYWdlRWwuZGF0YXNldC5pbWFnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWxldGUgcGFnZUVsLmRhdGFzZXQuaW1hZ2VcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZFxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5QYWdlU3ByZWFkID0gcmVxdWlyZSAnLi9wYWdlLXNwcmVhZCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRzXG4gICAgY29uc3RydWN0b3I6IChAb3B0aW9ucykgLT5cbiAgICAgICAgQGNvbGxlY3Rpb24gPSBbXVxuICAgICAgICBAaWRzID0ge31cblxuICAgICAgICByZXR1cm5cblxuICAgIGdldDogKGlkKSAtPlxuICAgICAgICBAaWRzW2lkXVxuXG4gICAgZ2V0RnJhZzogLT5cbiAgICAgICAgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXG4gICAgICAgIEBjb2xsZWN0aW9uLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+IGZyYWcuYXBwZW5kQ2hpbGQgcGFnZVNwcmVhZC5lbFxuXG4gICAgICAgIGZyYWdcblxuICAgIHVwZGF0ZTogKHBhZ2VNb2RlID0gJ3NpbmdsZScpIC0+XG4gICAgICAgIHBhZ2VTcHJlYWRzID0gW11cbiAgICAgICAgaWRzID0ge31cbiAgICAgICAgcGFnZXMgPSBAb3B0aW9ucy5wYWdlcy5zbGljZSgpXG4gICAgICAgIHdpZHRoID0gQG9wdGlvbnMud2lkdGhcbiAgICAgICAgbWF4Wm9vbVNjYWxlID0gQG9wdGlvbnMubWF4Wm9vbVNjYWxlXG5cbiAgICAgICAgaWYgcGFnZU1vZGUgaXMgJ3NpbmdsZSdcbiAgICAgICAgICAgIHBhZ2VzLmZvckVhY2ggKHBhZ2UpIC0+IHBhZ2VTcHJlYWRzLnB1c2ggW3BhZ2VdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZpcnN0UGFnZSA9IHBhZ2VzLnNoaWZ0KClcbiAgICAgICAgICAgIGxhc3RQYWdlID0gaWYgcGFnZXMubGVuZ3RoICUgMiBpcyAxIHRoZW4gcGFnZXMucG9wKCkgZWxzZSBudWxsXG4gICAgICAgICAgICBtaWRzdFBhZ2VTcHJlYWRzID0gU0dOLnV0aWwuY2h1bmsgcGFnZXMsIDJcblxuICAgICAgICAgICAgcGFnZVNwcmVhZHMucHVzaCBbZmlyc3RQYWdlXSBpZiBmaXJzdFBhZ2U/XG4gICAgICAgICAgICBtaWRzdFBhZ2VTcHJlYWRzLmZvckVhY2ggKG1pZHN0UGFnZXMpIC0+IHBhZ2VTcHJlYWRzLnB1c2ggbWlkc3RQYWdlcy5tYXAgKHBhZ2UpIC0+IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRzLnB1c2ggW2xhc3RQYWdlXSBpZiBsYXN0UGFnZT9cblxuICAgICAgICBAY29sbGVjdGlvbiA9IHBhZ2VTcHJlYWRzLm1hcCAocGFnZXMsIGkpID0+XG4gICAgICAgICAgICBpZCA9IFwiI3twYWdlTW9kZX0tI3tpfVwiXG4gICAgICAgICAgICBwYWdlU3ByZWFkID0gbmV3IFBhZ2VTcHJlYWRcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGU6IG1heFpvb21TY2FsZVxuICAgICAgICAgICAgICAgIHBhZ2VzOiBwYWdlc1xuICAgICAgICAgICAgICAgIGlkOiBpZFxuXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmJpbmQgJ3BhZ2VMb2FkZWQnLCAoZSkgPT4gQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmJpbmQgJ3BhZ2VzTG9hZGVkJywgKGUpID0+IEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIGVcblxuICAgICAgICAgICAgaWRzW2lkXSA9IHBhZ2VTcHJlYWRcblxuICAgICAgICAgICAgcGFnZVNwcmVhZFxuICAgICAgICBAaWRzID0gaWRzXG5cbiAgICAgICAgQFxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkc1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkc1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXCJcbjxkaXYgY2xhc3M9XCJzZ24tcHAtaG90c3BvdC1waWNrZXJfX2JhY2tncm91bmRcIiBkYXRhLWNsb3NlPjwvZGl2PlxuPGRpdiBjbGFzcz1cInNnbl9fcG9wb3ZlclwiIHN0eWxlPVwidG9wOiB7e3RvcH19cHg7IGxlZnQ6IHt7bGVmdH19cHg7XCI+XG4gICAge3sjaGVhZGVyfX1cbiAgICAgICAgPGRpdiBjbGFzcz1cInNnbi1wb3BvdmVyX19oZWFkZXJcIj57e2hlYWRlcn19PC9kaXY+XG4gICAge3svaGVhZGVyfX1cbiAgICA8ZGl2IGNsYXNzPVwic2duLXBvcG92ZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgICAge3sjaG90c3BvdHN9fVxuICAgICAgICAgICAgICAgIDxsaSBkYXRhLWlkPVwie3tpZH19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt7dGl0bGV9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3tzdWJ0aXRsZX19PC9wPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7ey9ob3RzcG90c319XG4gICAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblwiXCJcIlxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXCJcblwiXCJcIlxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5TR04gPSByZXF1aXJlICcuLi8uLi9jb3JlJ1xuQ29yZSA9IHJlcXVpcmUgJy4vY29yZSdcbkhvdHNwb3RzID0gcmVxdWlyZSAnLi9ob3RzcG90cydcbkNvbnRyb2xzID0gcmVxdWlyZSAnLi9jb250cm9scydcbkV2ZW50VHJhY2tpbmcgPSByZXF1aXJlICcuL2V2ZW50LXRyYWNraW5nJ1xuTGVnYWN5RXZlbnRUcmFja2luZyA9IHJlcXVpcmUgJy4vbGVnYWN5LWV2ZW50LXRyYWNraW5nJ1xuXG5jbGFzcyBWaWV3ZXJcbiAgICBjb25zdHJ1Y3RvcjogKEBlbCwgQG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgQF9jb3JlID0gbmV3IENvcmUgQGVsLFxuICAgICAgICAgICAgaWQ6IEBvcHRpb25zLmlkXG4gICAgICAgICAgICBwYWdlczogQG9wdGlvbnMucGFnZXNcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRXaWR0aDogQG9wdGlvbnMucGFnZVNwcmVhZFdpZHRoXG4gICAgICAgICAgICBwYWdlU3ByZWFkTWF4Wm9vbVNjYWxlOiBAb3B0aW9ucy5wYWdlU3ByZWFkTWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICBpZGxlRGVsYXk6IEBvcHRpb25zLmlkbGVEZWxheVxuICAgICAgICAgICAgcmVzaXplRGVsYXk6IEBvcHRpb25zLnJlc2l6ZURlbGF5XG4gICAgICAgICAgICBjb2xvcjogQG9wdGlvbnMuY29sb3JcbiAgICAgICAgQF9ob3RzcG90cyA9IG5ldyBIb3RzcG90cygpXG4gICAgICAgIEBfY29udHJvbHMgPSBuZXcgQ29udHJvbHMgQGVsLCBrZXlib2FyZDogQG9wdGlvbnMua2V5Ym9hcmRcbiAgICAgICAgQF9ldmVudFRyYWNraW5nID0gbmV3IEV2ZW50VHJhY2tpbmcoKVxuICAgICAgICBAX2xlZ2FjeUV2ZW50VHJhY2tpbmcgPSBuZXcgTGVnYWN5RXZlbnRUcmFja2luZygpXG4gICAgICAgIEB2aWV3U2Vzc2lvbiA9IFNHTi51dGlsLnV1aWQoKVxuXG4gICAgICAgIEBfc2V0dXBFdmVudExpc3RlbmVycygpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQF9jb3JlLnRyaWdnZXIgJ3N0YXJ0ZWQnXG5cbiAgICAgICAgQFxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQF9jb3JlLnRyaWdnZXIgJ2Rlc3Ryb3llZCdcbiAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdkZXN0cm95ZWQnXG4gICAgICAgIEBfY29udHJvbHMudHJpZ2dlciAnZGVzdHJveWVkJ1xuICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnZGVzdHJveWVkJ1xuXG4gICAgICAgIEBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIEBlbFxuXG4gICAgICAgIEBcblxuICAgIG5hdmlnYXRlVG86IChwb3NpdGlvbiwgb3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkubmF2aWdhdGVUbyBwb3NpdGlvbiwgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIGZpcnN0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkuZmlyc3Qgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIHByZXY6IChvcHRpb25zKSAtPlxuICAgICAgICBAX2NvcmUuZ2V0VmVyc28oKS5wcmV2IG9wdGlvbnNcblxuICAgICAgICBAXG5cbiAgICBuZXh0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkubmV4dCBvcHRpb25zXG5cbiAgICAgICAgQFxuXG4gICAgbGFzdDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBfY29yZS5nZXRWZXJzbygpLmxhc3Qgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIF90cmFja0V2ZW50OiAoZSkgLT5cbiAgICAgICAgdHlwZSA9IGUudHlwZVxuICAgICAgICBpZFR5cGUgPSAnbGVnYWN5J1xuICAgICAgICBwcm9wZXJ0aWVzID0gcGFnZWRQdWJsaWNhdGlvbjpcbiAgICAgICAgICAgIGlkOiBbaWRUeXBlLCBAb3B0aW9ucy5pZF1cbiAgICAgICAgICAgIG93bmVkQnk6IFtpZFR5cGUsIEBvcHRpb25zLm93bmVkQnldXG4gICAgICAgIGV2ZW50VHJhY2tlciA9IEBvcHRpb25zLmV2ZW50VHJhY2tlclxuXG4gICAgICAgIHByb3BlcnRpZXNba2V5XSA9IHZhbHVlIGZvciBrZXksIHZhbHVlIG9mIGUucHJvcGVydGllc1xuXG4gICAgICAgIGV2ZW50VHJhY2tlci50cmFja0V2ZW50IHR5cGUsIHByb3BlcnRpZXMgaWYgZXZlbnRUcmFja2VyP1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgX3RyYWNrTGVnYWN5RXZlbnQ6IChlKSAtPlxuICAgICAgICBldmVudFRyYWNrZXIgPSBAb3B0aW9ucy5ldmVudFRyYWNrZXJcbiAgICAgICAgZ2VvbG9jYXRpb24gPSB7fVxuXG4gICAgICAgIGlmIGV2ZW50VHJhY2tlcj9cbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmxhdGl0dWRlID0gZXZlbnRUcmFja2VyLmxvY2F0aW9uLmxhdGl0dWRlXG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5sb25naXR1ZGUgPSBldmVudFRyYWNrZXIubG9jYXRpb24ubG9uZ2l0dWRlXG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5zZW5zb3IgPSB0cnVlIGlmIGdlb2xvY2F0aW9uLmxhdGl0dWRlP1xuXG4gICAgICAgICAgICBTR04uQ29yZUtpdC5yZXF1ZXN0XG4gICAgICAgICAgICAgICAgZ2VvbG9jYXRpb246IGdlb2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3YyL2NhdGFsb2dzLyN7QG9wdGlvbnMuaWR9L2NvbGxlY3RcIlxuICAgICAgICAgICAgICAgIGpzb246IHRydWVcbiAgICAgICAgICAgICAgICBib2R5OlxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgbXM6IGUubXNcbiAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb246IGUub3JpZW50YXRpb25cbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IGUucGFnZXMuam9pbiAnLCdcbiAgICAgICAgICAgICAgICAgICAgdmlld19zZXNzaW9uOiBAdmlld1Nlc3Npb25cbiAgICAgICAgXG4gICAgICAgIHJldHVyblxuXG4gICAgX3NldHVwRXZlbnRMaXN0ZW5lcnM6IC0+XG4gICAgICAgIEBfZXZlbnRUcmFja2luZy5iaW5kICd0cmFja0V2ZW50JywgKGUpID0+XG4gICAgICAgICAgICBAX3RyYWNrRXZlbnQgZVxuICAgICAgICAgICAgQF9sZWdhY3lFdmVudFRyYWNraW5nLnRyaWdnZXIgJ2V2ZW50VHJhY2tlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQF9sZWdhY3lFdmVudFRyYWNraW5nLmJpbmQgJ3RyYWNrRXZlbnQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfdHJhY2tMZWdhY3lFdmVudCBlXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAX2NvbnRyb2xzLmJpbmQgJ3ByZXYnLCAoZSkgPT5cbiAgICAgICAgICAgIEBwcmV2IGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29udHJvbHMuYmluZCAnbmV4dCcsIChlKSA9PlxuICAgICAgICAgICAgQG5leHQgZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb250cm9scy5iaW5kICdmaXJzdCcsIChlKSA9PlxuICAgICAgICAgICAgQGZpcnN0IGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29udHJvbHMuYmluZCAnbGFzdCcsIChlKSA9PlxuICAgICAgICAgICAgQGxhc3QoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9ob3RzcG90cy5iaW5kICdob3RzcG90c1JlcXVlc3RlZCcsIChlKSA9PlxuICAgICAgICAgICAgQHRyaWdnZXIgJ2hvdHNwb3RzUmVxdWVzdGVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAX2NvcmUuYmluZCAnYXBwZWFyZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdhcHBlYXJlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhcHBlYXJlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdkaXNhcHBlYXJlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2Rpc2FwcGVhcmVkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2Rpc2FwcGVhcmVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2JlZm9yZU5hdmlnYXRpb24nLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdiZWZvcmVOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQF9jb250cm9scy50cmlnZ2VyICdiZWZvcmVOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2JlZm9yZU5hdmlnYXRpb24nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYWZ0ZXJOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2NsaWNrZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdjbGlja2VkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2NsaWNrZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnZG91YmxlQ2xpY2tlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2RvdWJsZUNsaWNrZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnZG91YmxlQ2xpY2tlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdwcmVzc2VkJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAncHJlc3NlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdwcmVzc2VkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3BhblN0YXJ0JywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAncGFuU3RhcnQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAncGFuU3RhcnQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnem9vbWVkSW4nLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICd6b29tZWRJbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRJbicsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICd6b29tZWRPdXQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICd6b29tZWRPdXQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnem9vbWVkT3V0JywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3BhZ2VMb2FkZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdwYWdlTG9hZGVkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2hvdHNwb3RzLnRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhZnRlck5hdmlnYXRpb24nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAncGFnZXNMb2FkZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfaG90c3BvdHMudHJpZ2dlciAncGFnZXNMb2FkZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAncGFnZXNMb2FkZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAncmVzaXplZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdyZXNpemVkJ1xuICAgICAgICAgICAgQHRyaWdnZXIgJ3Jlc2l6ZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBiaW5kICdob3RzcG90c1JlY2VpdmVkJywgKGUpID0+XG4gICAgICAgICAgICBAX2hvdHNwb3RzLnRyaWdnZXIgJ2hvdHNwb3RzUmVjZWl2ZWQnLFxuICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWQ6IEBfY29yZS5wYWdlU3ByZWFkcy5nZXQgZS5pZFxuICAgICAgICAgICAgICAgIHZlcnNvUGFnZVNwcmVhZDogQF9jb3JlLmdldFZlcnNvKCkucGFnZVNwcmVhZHMuZmluZCAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZC5nZXRJZCgpIGlzIGUuaWRcbiAgICAgICAgICAgICAgICByYXRpbzogZS5yYXRpb1xuICAgICAgICAgICAgICAgIHBhZ2VzOiBlLnBhZ2VzXG4gICAgICAgICAgICAgICAgaG90c3BvdHM6IGUuaG90c3BvdHNcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gVmlld2VyXG5cbm1vZHVsZS5leHBvcnRzID0gVmlld2VyXG4iLCJTR04gPSByZXF1aXJlICcuLi9zZ24nXG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spIC0+XG4gICAgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgPyAnZ2V0J1xuICAgIHVybCA9IG9wdGlvbnMudXJsXG4gICAgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyA/IHt9XG5cbiAgICBpZiBvcHRpb25zLnFzP1xuICAgICAgICBxdWVyeVBhcmFtcyA9IFNHTi51dGlsLmZvcm1hdFF1ZXJ5UGFyYW1zIG9wdGlvbnMucXNcblxuICAgICAgICBpZiB1cmwuaW5kZXhPZignPycpIGlzIC0xXG4gICAgICAgICAgICB1cmwgKz0gJz8nICsgcXVlcnlQYXJhbXNcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdXJsICs9ICcmJyArIHF1ZXJ5UGFyYW1zXG5cbiAgICBodHRwLm9wZW4gbWV0aG9kLnRvVXBwZXJDYXNlKCksIHVybFxuICAgIGh0dHAudGltZW91dCA9IG9wdGlvbnMudGltZW91dCBpZiBvcHRpb25zLnRpbWVvdXQ/XG4gICAgaHR0cC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlIGlmIG9wdGlvbnMudXNlQ29va2llcyBpcyB0cnVlXG5cbiAgICBpZiBvcHRpb25zLmpzb24gaXMgdHJ1ZVxuICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBoZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xuXG4gICAgZm9yIGhlYWRlciwgdmFsdWUgb2Ygb3B0aW9ucy5oZWFkZXJzXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlciBoZWFkZXIsIHZhbHVlXG5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnLCAtPlxuICAgICAgICBoZWFkZXJzID0gaHR0cC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS5zcGxpdCAnXFxyXFxuJ1xuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5yZWR1Y2UgKGFjYywgY3VycmVudCwgaSkgLT5cbiAgICAgICAgICAgIHBhcnRzID0gY3VycmVudC5zcGxpdCAnOiAnXG5cbiAgICAgICAgICAgIGFjY1twYXJ0c1swXS50b0xvd2VyQ2FzZSgpXSA9IHBhcnRzWzFdXG5cbiAgICAgICAgICAgIGFjY1xuICAgICAgICAsIHt9XG4gICAgICAgIGJvZHkgPSBodHRwLnJlc3BvbnNlVGV4dFxuXG4gICAgICAgIGJvZHkgPSBKU09OLnBhcnNlIGJvZHkgaWYgb3B0aW9ucy5qc29uIGlzIHRydWVcblxuICAgICAgICBjYWxsYmFjayBudWxsLFxuICAgICAgICAgICAgc3RhdHVzQ29kZTogaHR0cC5zdGF0dXNcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIGJvZHk6IGJvZHlcblxuICAgICAgICByZXR1cm5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ2Vycm9yJywgLT5cbiAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKClcblxuICAgICAgICByZXR1cm5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ3RpbWVvdXQnLCAtPlxuICAgICAgICBjYWxsYmFjayBuZXcgRXJyb3IoKVxuXG4gICAgICAgIHJldHVyblxuICAgIGh0dHAuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgaWYgZS5sZW5ndGhDb21wdXRhYmxlIGFuZCB0eXBlb2YgcHJvZ3Jlc3NDYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgICBwcm9ncmVzc0NhbGxiYWNrIGUubG9hZGVkLCBlLnRvdGFsXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBpZiBvcHRpb25zLmZvcm1EYXRhP1xuICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG5cbiAgICAgICAgZm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9ucy5mb3JtRGF0YVxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kIGtleSwgdmFsdWVcblxuICAgICAgICBodHRwLnNlbmQgZm9ybURhdGFcbiAgICBlbHNlIGlmIG9wdGlvbnMuYm9keT9cbiAgICAgICAgaWYgb3B0aW9ucy5qc29uIGlzIHRydWVcbiAgICAgICAgICAgIGh0dHAuc2VuZCBKU09OLnN0cmluZ2lmeShvcHRpb25zLmJvZHkpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGh0dHAuc2VuZCBvcHRpb25zLmJvZHlcbiAgICBlbHNlXG4gICAgICAgIGh0dHAuc2VuZCgpXG5cbiAgICByZXR1cm5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSAnLi9jb3JlJ1xuIiwiU0dOID0gcmVxdWlyZSAnLi4vc2duJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAga2V5OiAnc2duLSdcblxuICAgIGdldDogKGtleSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIFNHTi51dGlsLmlzTm9kZSgpXG5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBuYW1lID0gXCIje0BrZXl9I3trZXl9PVwiXG4gICAgICAgICAgICBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCAnOydcblxuICAgICAgICAgICAgZm9yIGMgaW4gY2FcbiAgICAgICAgICAgICAgICBjdCA9IGMudHJpbSgpXG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGN0LnN1YnN0cmluZyhuYW1lLmxlbmd0aCwgY3QubGVuZ3RoKSBpZiBjdC5pbmRleE9mKG5hbWUpIGlzIDBcblxuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlIHZhbHVlXG4gICAgICAgIGNhdGNoIGVyclxuICAgICAgICAgICAgdmFsdWUgPSB7fVxuXG4gICAgICAgIHZhbHVlXG5cbiAgICBzZXQ6IChrZXksIHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gaWYgU0dOLnV0aWwuaXNOb2RlKClcblxuICAgICAgICB0cnlcbiAgICAgICAgICAgIGRheXMgPSAzNjVcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICBzdHIgPSBKU09OLnN0cmluZ2lmeSB2YWx1ZVxuXG4gICAgICAgICAgICBkYXRlLnNldFRpbWUgZGF0ZS5nZXRUaW1lKCkgKyBkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMFxuXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBcIiN7QGtleX0je2tleX09I3tzdHJ9O2V4cGlyZXM9I3tkYXRlLnRvVVRDU3RyaW5nKCl9O3BhdGg9L1wiXG4gICAgICAgIGNhdGNoIGVyclxuXG4gICAgICAgIHJldHVyblxuXG5cbiIsIlNHTiA9IHJlcXVpcmUgJy4uL3NnbidcblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIGtleTogJ3Nnbi0nXG5cbiAgICBzdG9yYWdlOiBkbyAtPlxuICAgICAgICB0cnlcbiAgICAgICAgICAgIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlXG5cbiAgICAgICAgICAgIHN0b3JhZ2VbXCIje0BrZXl9dGVzdC1zdG9yYWdlXCJdID0gJ2Zvb2JhcidcbiAgICAgICAgICAgIGRlbGV0ZSBzdG9yYWdlW1wiI3tAa2V5fXRlc3Qtc3RvcmFnZVwiXVxuXG4gICAgICAgICAgICBzdG9yYWdlXG4gICAgICAgIGNhdGNoXG4gICAgICAgICAgICB7fVxuXG4gICAgZ2V0OiAoa2V5KSAtPlxuICAgICAgICB0cnlcbiAgICAgICAgICAgIEpTT04ucGFyc2UgQHN0b3JhZ2VbXCIje0BrZXl9I3trZXl9XCJdXG5cbiAgICBzZXQ6IChrZXksIHZhbHVlKSAtPlxuICAgICAgICB0cnlcbiAgICAgICAgICAgIEBzdG9yYWdlW1wiI3tAa2V5fSN7a2V5fVwiXSA9IEpTT04uc3RyaW5naWZ5IHZhbHVlXG5cbiAgICAgICAgQFxuIiwidXRpbCA9XG4gICAgaXNCcm93c2VyOiAtPlxuICAgICAgICB0eXBlb2YgcHJvY2VzcyBpc250ICd1bmRlZmluZWQnIGFuZCBwcm9jZXNzLmJyb3dzZXJcblxuICAgIGlzTm9kZTogLT5cbiAgICAgICAgbm90IHV0aWwuaXNCcm93c2VyKClcblxuICAgIGVycm9yOiAoZXJyLCBvcHRpb25zKSAtPlxuICAgICAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlIG9yIG51bGxcblxuICAgICAgICBpZiB0eXBlb2Ygb3B0aW9ucyBpcyAnc3RyaW5nJ1xuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBvcHRpb25zXG4gICAgICAgIGVsc2UgaWYgdHlwZW9mIG9wdGlvbnMgaXMgJ29iamVjdCcgYW5kIG9wdGlvbnM/XG4gICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG4gICAgICAgICAgICAgICAgZXJyW2tleV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICBlcnIubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSBpZiBvcHRpb25zLm1lc3NhZ2U/XG4gICAgICAgICAgICBlcnIuY29kZSA9IG9wdGlvbnMuY29kZSBvciBvcHRpb25zLm5hbWUgaWYgb3B0aW9ucy5jb2RlPyBvciBvcHRpb25zLm1lc3NhZ2U/XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBvcHRpb25zLnN0YWNrIGlmIG9wdGlvbnMuc3RhY2s/XG5cbiAgICAgICAgZXJyLm5hbWUgPSBvcHRpb25zIGFuZCBvcHRpb25zLm5hbWUgb3IgZXJyLm5hbWUgb3IgZXJyLmNvZGUgb3IgJ0Vycm9yJ1xuICAgICAgICBlcnIudGltZSA9IG5ldyBEYXRlKClcblxuICAgICAgICBlcnJcblxuICAgIHV1aWQ6IC0+XG4gICAgICAgICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UgL1t4eV0vZywgKGMpIC0+XG4gICAgICAgICAgICByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMFxuICAgICAgICAgICAgdiA9IGlmIGMgaXMgJ3gnIHRoZW4gciBlbHNlIChyICYgMHgzfDB4OClcblxuICAgICAgICAgICAgdi50b1N0cmluZyAxNlxuXG4gICAgZ2V0UXVlcnlQYXJhbTogKGZpZWxkLCB1cmwpIC0+XG4gICAgICAgIGhyZWYgPSBpZiB1cmwgdGhlbiB1cmwgZWxzZSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgICByZWcgPSBuZXcgUmVnRXhwICdbPyZdJyArIGZpZWxkICsgJz0oW14mI10qKScsICdpJ1xuICAgICAgICBzdHJpbmcgPSByZWcuZXhlYyBocmVmXG5cbiAgICAgICAgaWYgc3RyaW5nIHRoZW4gc3RyaW5nWzFdIGVsc2UgdW5kZWZpbmVkXG5cbiAgICBmb3JtYXRRdWVyeVBhcmFtczogKHF1ZXJ5UGFyYW1zID0ge30pIC0+XG4gICAgICAgIE9iamVjdFxuICAgICAgICAgICAgLmtleXMgcXVlcnlQYXJhbXNcbiAgICAgICAgICAgIC5tYXAgKGtleSkgLT4ga2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5UGFyYW1zW2tleV0pXG4gICAgICAgICAgICAuam9pbiAnJidcblxuICAgIGdldE9TOiAtPlxuICAgICAgICBuYW1lID0gbnVsbFxuICAgICAgICB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG5cbiAgICAgICAgaWYgdWEuaW5kZXhPZignV2luZG93cycpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnV2luZG93cydcbiAgICAgICAgZWxzZSBpZiB1YS5pbmRleE9mKCdNYWMnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ21hY09TJ1xuICAgICAgICBlbHNlIGlmIHVhLmluZGV4T2YoJ1gxMScpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAndW5peCdcbiAgICAgICAgZWxzZSBpZiB1YS5pbmRleE9mKCdMaW51eCcpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnTGludXgnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignaU9TJykgPiAtMVxuICAgICAgICAgICAgbmFtZSA9ICdpT1MnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignQW5kcm9pZCcpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnQW5kcm9pZCdcblxuICAgICAgICBuYW1lXG5cbiAgICBidG9hOiAoc3RyKSAtPlxuICAgICAgICBpZiB1dGlsLmlzQnJvd3NlcigpXG4gICAgICAgICAgICBidG9hIHN0clxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBidWZmZXIgPSBudWxsXG5cbiAgICAgICAgICAgIGlmIHN0ciBpbnN0YW5jZW9mIEJ1ZmZlclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IHN0clxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBCdWZmZXIgc3RyLnRvU3RyaW5nKCksICdiaW5hcnknXG5cbiAgICAgICAgICAgIGJ1ZmZlci50b1N0cmluZyAnYmFzZTY0J1xuXG4gICAgZ2V0U2NyZWVuRGltZW5zaW9uczogLT5cbiAgICAgICAgZGVuc2l0eSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID8gMVxuICAgICAgICBsb2dpY2FsID1cbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuc2NyZWVuLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0XG4gICAgICAgIHBoeXNpY2FsID1cbiAgICAgICAgICAgIHdpZHRoOiBNYXRoLnJvdW5kIGxvZ2ljYWwud2lkdGggKiBkZW5zaXR5XG4gICAgICAgICAgICBoZWlnaHQ6IE1hdGgucm91bmQgbG9naWNhbC5oZWlnaHQgKiBkZW5zaXR5XG5cbiAgICAgICAgZGVuc2l0eTogZGVuc2l0eVxuICAgICAgICBsb2dpY2FsOiBsb2dpY2FsXG4gICAgICAgIHBoeXNpY2FsOiBwaHlzaWNhbFxuXG4gICAgZ2V0VXRjT2Zmc2V0U2Vjb25kczogLT5cbiAgICAgICAgbm93ID0gbmV3IERhdGUoKVxuICAgICAgICBqYW4xID0gbmV3IERhdGUgbm93LmdldEZ1bGxZZWFyKCksIDAsIDEsIDAsIDAsIDAsIDBcbiAgICAgICAgdG1wID0gamFuMS50b0dNVFN0cmluZygpXG4gICAgICAgIGphbjIgPSBuZXcgRGF0ZSB0bXAuc3Vic3RyaW5nKDAsIHRtcC5sYXN0SW5kZXhPZignICcpIC0gMSlcbiAgICAgICAgc3RkVGltZU9mZnNldCA9IChqYW4xIC0gamFuMikgLyAxMDAwXG5cbiAgICAgICAgc3RkVGltZU9mZnNldFxuXG4gICAgZ2V0VXRjRHN0T2Zmc2V0U2Vjb25kczogLT5cbiAgICAgICAgbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAgKiAtMVxuXG4gICAgZ2V0Q29sb3JCcmlnaHRuZXNzOiAoY29sb3IpIC0+XG4gICAgICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSAnIycsICcnXG4gICAgICAgIGhleCA9IHBhcnNlSW50IChoZXggKyAnJykucmVwbGFjZSgvW15hLWYwLTldL2dpLCAnJyksIDE2XG4gICAgICAgIHJnYiA9IFtdXG4gICAgICAgIHN1bSA9IDBcbiAgICAgICAgeCA9IDBcblxuICAgICAgICB3aGlsZSB4IDwgM1xuICAgICAgICAgICAgcyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygyICogeCwgMiksIDE2KVxuICAgICAgICAgICAgcmdiW3hdID0gc1xuXG4gICAgICAgICAgICBzdW0gKz0gcyBpZiBzID4gMFxuXG4gICAgICAgICAgICArK3hcblxuICAgICAgICBpZiBzdW0gPD0gMzgxIHRoZW4gJ2RhcmsnIGVsc2UgJ2xpZ2h0J1xuXG4gICAgY2h1bms6IChhcnIsIHNpemUpIC0+XG4gICAgICAgIHJlc3VsdHMgPSBbXVxuXG4gICAgICAgIHdoaWxlIGFyci5sZW5ndGhcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCBhcnIuc3BsaWNlKDAsIHNpemUpXG5cbiAgICAgICAgcmVzdWx0c1xuXG4gICAgdGhyb3R0bGU6IChmbiwgdGhyZXNob2xkID0gMjUwLCBzY29wZSkgLT5cbiAgICAgICAgbGFzdCA9IHVuZGVmaW5lZFxuICAgICAgICBkZWZlclRpbWVyID0gdW5kZWZpbmVkXG5cbiAgICAgICAgLT5cbiAgICAgICAgICAgIGNvbnRleHQgPSBzY29wZSBvciBAXG4gICAgICAgICAgICBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50c1xuXG4gICAgICAgICAgICBpZiBsYXN0IGFuZCBub3cgPCBsYXN0ICsgdGhyZXNob2xkXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0IGRlZmVyVGltZXJcblxuICAgICAgICAgICAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBub3dcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5IGNvbnRleHQsIGFyZ3NcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgLCB0aHJlc2hvbGRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBsYXN0ID0gbm93XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkgY29udGV4dCwgYXJnc1xuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgIGxvYWRJbWFnZTogKHNyYywgY2FsbGJhY2spIC0+XG4gICAgICAgIGltZyA9IG5ldyBJbWFnZSgpXG5cbiAgICAgICAgaW1nLm9ubG9hZCA9IC0+IGNhbGxiYWNrIG51bGwsIGltZy53aWR0aCwgaW1nLmhlaWdodFxuICAgICAgICBpbWcub25lcnJvciA9IC0+IGNhbGxiYWNrIG5ldyBFcnJvcigpXG4gICAgICAgIGltZy5zcmMgPSBzcmNcblxuICAgICAgICBpbWdcblxuICAgIGRpc3RhbmNlOiAobGF0MSwgbG5nMSwgbGF0MiwgbG5nMikgLT5cbiAgICAgICAgcmFkbGF0MSA9IE1hdGguUEkgKiBsYXQxIC8gMTgwXG4gICAgICAgIHJhZGxhdDIgPSBNYXRoLlBJICogbGF0MiAvIDE4MFxuICAgICAgICB0aGV0YSA9IGxuZzEgLSBsbmcyXG4gICAgICAgIHJhZHRoZXRhID0gTWF0aC5QSSAqIHRoZXRhIC8gMTgwXG4gICAgICAgIGRpc3QgPSBNYXRoLnNpbihyYWRsYXQxKSAqIE1hdGguc2luKHJhZGxhdDIpICsgTWF0aC5jb3MocmFkbGF0MSkgKiBNYXRoLmNvcyhyYWRsYXQyKSAqIE1hdGguY29zKHJhZHRoZXRhKVxuICAgICAgICBkaXN0ID0gTWF0aC5hY29zKGRpc3QpXG4gICAgICAgIGRpc3QgPSBkaXN0ICogMTgwIC8gTWF0aC5QSVxuICAgICAgICBkaXN0ID0gZGlzdCAqIDYwICogMS4xNTE1XG4gICAgICAgIGRpc3QgPSBkaXN0ICogMS42MDkzNDQgKiAxMDAwXG5cbiAgICAgICAgZGlzdFxuXG4gICAgYXN5bmM6XG4gICAgICAgIHBhcmFsbGVsOiAoYXN5bmNDYWxscywgc2hhcmVkQ2FsbGJhY2spIC0+XG4gICAgICAgICAgICBjb3VudGVyID0gYXN5bmNDYWxscy5sZW5ndGhcbiAgICAgICAgICAgIGFsbFJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgayA9IDBcblxuICAgICAgICAgICAgbWFrZUNhbGxiYWNrID0gKGluZGV4KSAtPlxuICAgICAgICAgICAgICAgIC0+XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgICAgICAgICBpID0gMFxuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXItLVxuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIGkgPCBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggYXJndW1lbnRzW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICBpKytcblxuICAgICAgICAgICAgICAgICAgICBhbGxSZXN1bHRzW2luZGV4XSA9IHJlc3VsdHNcblxuICAgICAgICAgICAgICAgICAgICBzaGFyZWRDYWxsYmFjayBhbGxSZXN1bHRzIGlmIGNvdW50ZXIgaXMgMFxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICB3aGlsZSBrIDwgYXN5bmNDYWxscy5sZW5ndGhcbiAgICAgICAgICAgICAgICBhc3luY0NhbGxzW2tdIG1ha2VDYWxsYmFjayhrKVxuICAgICAgICAgICAgICAgIGsrK1xuXG4gICAgICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsXG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG52YXIgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDJcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAobGVuZ3RoKSB7XG4gIGlmIChsZW5ndGggPiBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIHZhciBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIGJ1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKGFyZylcbiAgfVxuICByZXR1cm4gZnJvbShhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbmlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgIHZhbHVlOiBudWxsLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSlcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbmZ1bmN0aW9uIGZyb20gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20odmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gTm90ZTogQ2hhbmdlIHByb3RvdHlwZSAqYWZ0ZXIqIEJ1ZmZlci5mcm9tIGlzIGRlZmluZWQgdG8gd29ya2Fyb3VuZCBDaHJvbWUgYnVnOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC8xNDhcbkJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbkJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2Moc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlIChzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHZhciBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgYnVmW2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICB2YXIgYnVmXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBidWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbilcblxuICAgIGlmIChidWYubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnVmXG4gICAgfVxuXG4gICAgb2JqLmNvcHkoYnVmLCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIGJ1ZlxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmIChpc0FycmF5QnVmZmVyVmlldyhvYmopIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBudW1iZXJJc05hTihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBBcnJheS5pc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBLX01BWF9MRU5HVEhgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIEtfTUFYX0xFTkdUSC50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuIGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlciA9PT0gdHJ1ZVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoaXNBcnJheUJ1ZmZlclZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCAoYW5kIHRoZSBgaXMtYnVmZmVyYCBucG0gcGFja2FnZSlcbi8vIHRvIGRldGVjdCBhIEJ1ZmZlciBpbnN0YW5jZS4gSXQncyBub3QgcG9zc2libGUgdG8gdXNlIGBpbnN0YW5jZW9mIEJ1ZmZlcmBcbi8vIHJlbGlhYmx5IGluIGEgYnJvd3NlcmlmeSBjb250ZXh0IGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgZGlmZmVyZW50XG4vLyBjb3BpZXMgb2YgdGhlICdidWZmZXInIHBhY2thZ2UgaW4gdXNlLiBUaGlzIG1ldGhvZCB3b3JrcyBldmVuIGZvciBCdWZmZXJcbi8vIGluc3RhbmNlcyB0aGF0IHdlcmUgY3JlYXRlZCBmcm9tIGFub3RoZXIgY29weSBvZiB0aGUgYGJ1ZmZlcmAgcGFja2FnZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE1NFxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAobnVtYmVySXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggPj4+IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyAoYnl0ZXNbaSArIDFdICogMjU2KSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZylcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG4vLyBOb2RlIDAuMTAgc3VwcG9ydHMgYEFycmF5QnVmZmVyYCBidXQgbGFja3MgYEFycmF5QnVmZmVyLmlzVmlld2BcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3IChvYmopIHtcbiAgcmV0dXJuICh0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nKSAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxufVxuXG5mdW5jdGlvbiBudW1iZXJJc05hTiAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG9iaiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwiIWZ1bmN0aW9uKGdsb2JhbHMpIHtcbid1c2Ugc3RyaWN0J1xuXG52YXIgY29udmVydEhleCA9IHtcbiAgYnl0ZXNUb0hleDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAvKmlmICh0eXBlb2YgYnl0ZXMuYnl0ZUxlbmd0aCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIG5ld0J5dGVzID0gW11cblxuICAgICAgaWYgKHR5cGVvZiBieXRlcy5idWZmZXIgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGJ5dGVzID0gbmV3IERhdGFWaWV3KGJ5dGVzLmJ1ZmZlcilcbiAgICAgIGVsc2VcbiAgICAgICAgYnl0ZXMgPSBuZXcgRGF0YVZpZXcoYnl0ZXMpXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMuYnl0ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgIG5ld0J5dGVzLnB1c2goYnl0ZXMuZ2V0VWludDgoaSkpXG4gICAgICB9XG4gICAgICBieXRlcyA9IG5ld0J5dGVzXG4gICAgfSovXG4gICAgcmV0dXJuIGFyckJ5dGVzVG9IZXgoYnl0ZXMpXG4gIH0sXG4gIGhleFRvQnl0ZXM6IGZ1bmN0aW9uKGhleCkge1xuICAgIGlmIChoZXgubGVuZ3RoICUgMiA9PT0gMSkgdGhyb3cgbmV3IEVycm9yKFwiaGV4VG9CeXRlcyBjYW4ndCBoYXZlIGEgc3RyaW5nIHdpdGggYW4gb2RkIG51bWJlciBvZiBjaGFyYWN0ZXJzLlwiKVxuICAgIGlmIChoZXguaW5kZXhPZignMHgnKSA9PT0gMCkgaGV4ID0gaGV4LnNsaWNlKDIpXG4gICAgcmV0dXJuIGhleC5tYXRjaCgvLi4vZykubWFwKGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHBhcnNlSW50KHgsMTYpIH0pXG4gIH1cbn1cblxuXG4vLyBQUklWQVRFXG5cbmZ1bmN0aW9uIGFyckJ5dGVzVG9IZXgoYnl0ZXMpIHtcbiAgcmV0dXJuIGJ5dGVzLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiBwYWRMZWZ0KHgudG9TdHJpbmcoMTYpLDIpIH0pLmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIHBhZExlZnQob3JpZywgbGVuKSB7XG4gIGlmIChvcmlnLmxlbmd0aCA+IGxlbikgcmV0dXJuIG9yaWdcbiAgcmV0dXJuIEFycmF5KGxlbiAtIG9yaWcubGVuZ3RoICsgMSkuam9pbignMCcpICsgb3JpZ1xufVxuXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvL0NvbW1vbkpTXG4gIG1vZHVsZS5leHBvcnRzID0gY29udmVydEhleFxufSBlbHNlIHtcbiAgZ2xvYmFscy5jb252ZXJ0SGV4ID0gY29udmVydEhleFxufVxuXG59KHRoaXMpOyIsIiFmdW5jdGlvbihnbG9iYWxzKSB7XG4ndXNlIHN0cmljdCdcblxudmFyIGNvbnZlcnRTdHJpbmcgPSB7XG4gIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgcmV0dXJuIGJ5dGVzLm1hcChmdW5jdGlvbih4KXsgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoeCkgfSkuam9pbignJylcbiAgfSxcbiAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHguY2hhckNvZGVBdCgwKSB9KVxuICB9XG59XG5cbi8vaHR0cDovL2hvc3NhLmluLzIwMTIvMDcvMjAvdXRmLTgtaW4tamF2YXNjcmlwdC5odG1sXG5jb252ZXJ0U3RyaW5nLlVURjggPSB7XG4gICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGNvbnZlcnRTdHJpbmcuYnl0ZXNUb1N0cmluZyhieXRlcykpKVxuICB9LFxuICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgIHJldHVybiBjb252ZXJ0U3RyaW5nLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKVxuICB9XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvL0NvbW1vbkpTXG4gIG1vZHVsZS5leHBvcnRzID0gY29udmVydFN0cmluZ1xufSBlbHNlIHtcbiAgZ2xvYmFscy5jb252ZXJ0U3RyaW5nID0gY29udmVydFN0cmluZ1xufVxuXG59KHRoaXMpOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQgQ3JhaWcgQ2FtcGJlbGxcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBHQVRPUi5KU1xuICogU2ltcGxlIEV2ZW50IERlbGVnYXRpb25cbiAqXG4gKiBAdmVyc2lvbiAxLjIuNFxuICpcbiAqIENvbXBhdGlibGUgd2l0aCBJRSA5KywgRkYgMy42KywgU2FmYXJpIDUrLCBDaHJvbWVcbiAqXG4gKiBJbmNsdWRlIGxlZ2FjeS5qcyBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG9sZGVyIGJyb3dzZXJzXG4gKlxuICogICAgICAgICAgICAgLi0uXyAgIF8gXyBfIF8gXyBfIF8gX1xuICogIC4tJyctLl9fLi0nMDAgICctJyAnICcgJyAnICcgJyAnICctLlxuICogJy5fX18gJyAgICAuICAgLi0tXyctJyAnLScgJy0nIF8nLScgJy5fXG4gKiAgVjogViAndnYtJyAgICdfICAgJy4gICAgICAgLicgIF8uLicgJy4nLlxuICogICAgJz0uX19fXy49Xy4tLScgICA6Xy5fXy5fXzpfICAgJy4gICA6IDpcbiAqICAgICAgICAgICAgKCgoX19fXy4tJyAgICAgICAgJy0uICAvICAgOiA6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKC0nXFwgLicgL1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgX19fX18uLicgIC4nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICctLl9fX19fLi0nXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgX21hdGNoZXIsXG4gICAgICAgIF9sZXZlbCA9IDAsXG4gICAgICAgIF9pZCA9IDAsXG4gICAgICAgIF9oYW5kbGVycyA9IHt9LFxuICAgICAgICBfZ2F0b3JJbnN0YW5jZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIF9hZGRFdmVudChnYXRvciwgdHlwZSwgY2FsbGJhY2spIHtcblxuICAgICAgICAvLyBibHVyIGFuZCBmb2N1cyBkbyBub3QgYnViYmxlIHVwIGJ1dCBpZiB5b3UgdXNlIGV2ZW50IGNhcHR1cmluZ1xuICAgICAgICAvLyB0aGVuIHlvdSB3aWxsIGdldCB0aGVtXG4gICAgICAgIHZhciB1c2VDYXB0dXJlID0gdHlwZSA9PSAnYmx1cicgfHwgdHlwZSA9PSAnZm9jdXMnO1xuICAgICAgICBnYXRvci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jYW5jZWwoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBmdW5jdGlvbiB0byB1c2UgZm9yIGRldGVybWluaW5nIGlmIGFuIGVsZW1lbnRcbiAgICAgKiBtYXRjaGVzIGEgcXVlcnkgc2VsZWN0b3JcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0TWF0Y2hlcihlbGVtZW50KSB7XG4gICAgICAgIGlmIChfbWF0Y2hlcikge1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcykge1xuICAgICAgICAgICAgX21hdGNoZXIgPSBlbGVtZW50Lm1hdGNoZXM7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC5tc01hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICAgICAgX21hdGNoZXIgPSBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQub01hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICAgICAgX21hdGNoZXIgPSBlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBkb2Vzbid0IG1hdGNoIGEgbmF0aXZlIGJyb3dzZXIgbWV0aG9kXG4gICAgICAgIC8vIGZhbGwgYmFjayB0byB0aGUgZ2F0b3IgZnVuY3Rpb25cbiAgICAgICAgX21hdGNoZXIgPSBHYXRvci5tYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgIHJldHVybiBfbWF0Y2hlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBtYXRjaGVzIGEgZ2l2ZW4gc2VsZWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge05vZGV9IGJvdW5kRWxlbWVudCAtIHRoZSBlbGVtZW50IHRoZSBsaXN0ZW5lciB3YXMgYXR0YWNoZWQgdG9cbiAgICAgKiBAcmV0dXJucyB7dm9pZHxOb2RlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IsIGJvdW5kRWxlbWVudCkge1xuXG4gICAgICAgIC8vIG5vIHNlbGVjdG9yIG1lYW5zIHRoaXMgZXZlbnQgd2FzIGJvdW5kIGRpcmVjdGx5IHRvIHRoaXMgZWxlbWVudFxuICAgICAgICBpZiAoc2VsZWN0b3IgPT0gJ19yb290Jykge1xuICAgICAgICAgICAgcmV0dXJuIGJvdW5kRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgbW92ZWQgdXAgdG8gdGhlIGVsZW1lbnQgeW91IGJvdW5kIHRoZSBldmVudCB0b1xuICAgICAgICAvLyB0aGVuIHdlIGhhdmUgY29tZSB0b28gZmFyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSBib3VuZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoaXMgaXMgYSBtYXRjaCB0aGVuIHdlIGFyZSBkb25lIVxuICAgICAgICBpZiAoX2dldE1hdGNoZXIoZWxlbWVudCkuY2FsbChlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhpcyBlbGVtZW50IGRpZCBub3QgbWF0Y2ggYnV0IGhhcyBhIHBhcmVudCB3ZSBzaG91bGQgdHJ5XG4gICAgICAgIC8vIGdvaW5nIHVwIHRoZSB0cmVlIHRvIHNlZSBpZiBhbnkgb2YgdGhlIHBhcmVudCBlbGVtZW50cyBtYXRjaFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSBpZiB5b3UgYXJlIGxvb2tpbmcgZm9yIGEgY2xpY2sgb24gYW4gPGE+IHRhZyBidXQgdGhlcmVcbiAgICAgICAgLy8gaXMgYSA8c3Bhbj4gaW5zaWRlIG9mIHRoZSBhIHRhZyB0aGF0IGl0IGlzIHRoZSB0YXJnZXQsXG4gICAgICAgIC8vIGl0IHNob3VsZCBzdGlsbCB3b3JrXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIF9sZXZlbCsrO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVzU2VsZWN0b3IoZWxlbWVudC5wYXJlbnROb2RlLCBzZWxlY3RvciwgYm91bmRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hZGRIYW5kbGVyKGdhdG9yLCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXSkge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XSkge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmVtb3ZlSGFuZGxlcihnYXRvciwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgdGllZCB0byB0aGlzIGVsZW1lbnQgYXQgYWxsXG4gICAgICAgIC8vIHRoZW4gZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgICAgaWYgKCFfaGFuZGxlcnNbZ2F0b3IuaWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBldmVudCB0eXBlIHNwZWNpZmllZCB0aGVuIHJlbW92ZSBhbGwgZXZlbnRzXG4gICAgICAgIC8vIGV4YW1wbGU6IEdhdG9yKGVsZW1lbnQpLm9mZigpXG4gICAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHR5cGUgaW4gX2hhbmRsZXJzW2dhdG9yLmlkXSkge1xuICAgICAgICAgICAgICAgIGlmIChfaGFuZGxlcnNbZ2F0b3IuaWRdLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bdHlwZV0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBubyBjYWxsYmFjayBvciBzZWxlY3RvciBpcyBzcGVjaWZpZWQgcmVtb3ZlIGFsbCBldmVudHMgb2YgdGhpcyB0eXBlXG4gICAgICAgIC8vIGV4YW1wbGU6IEdhdG9yKGVsZW1lbnQpLm9mZignY2xpY2snKVxuICAgICAgICBpZiAoIWNhbGxiYWNrICYmICFzZWxlY3Rvcikge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF0gPSB7fTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGEgc2VsZWN0b3IgaXMgc3BlY2lmaWVkIGJ1dCBubyBjYWxsYmFjayByZW1vdmUgYWxsIGV2ZW50c1xuICAgICAgICAvLyBmb3IgdGhpcyBzZWxlY3RvclxuICAgICAgICAvLyBleGFtcGxlOiBHYXRvcihlbGVtZW50KS5vZmYoJ2NsaWNrJywgJy5zdWItZWxlbWVudCcpXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIHNwZWNpZmllZCBhbiBldmVudCB0eXBlLCBzZWxlY3RvciwgYW5kIGNhbGxiYWNrIHRoZW4gd2VcbiAgICAgICAgLy8gbmVlZCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIGNhbGxiYWNrcyB0aWVkIHRvIHRoaXMgc2VsZWN0b3IgdG9cbiAgICAgICAgLy8gYmVnaW4gd2l0aC4gIGlmIHRoZXJlIGFyZW4ndCB0aGVuIHdlIGNhbiBzdG9wIGhlcmVcbiAgICAgICAgaWYgKCFfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSB0aGVuIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGNhbGxiYWNrcyBhbmQgaWYgd2UgZmluZFxuICAgICAgICAvLyBvbmUgdGhhdCBtYXRjaGVzIHJlbW92ZSBpdCBmcm9tIHRoZSBhcnJheVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXVtpXSA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2hhbmRsZUV2ZW50KGlkLCBlLCB0eXBlKSB7XG4gICAgICAgIGlmICghX2hhbmRsZXJzW2lkXVt0eXBlXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCxcbiAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgbWF0Y2gsXG4gICAgICAgICAgICBtYXRjaGVzID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGogPSAwO1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIGV2ZW50cyB0aGF0IG1hdGNoXG4gICAgICAgIF9sZXZlbCA9IDA7XG4gICAgICAgIGZvciAoc2VsZWN0b3IgaW4gX2hhbmRsZXJzW2lkXVt0eXBlXSkge1xuICAgICAgICAgICAgaWYgKF9oYW5kbGVyc1tpZF1bdHlwZV0uaGFzT3duUHJvcGVydHkoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBfbWF0Y2hlc1NlbGVjdG9yKHRhcmdldCwgc2VsZWN0b3IsIF9nYXRvckluc3RhbmNlc1tpZF0uZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgR2F0b3IubWF0Y2hlc0V2ZW50KHR5cGUsIF9nYXRvckluc3RhbmNlc1tpZF0uZWxlbWVudCwgbWF0Y2gsIHNlbGVjdG9yID09ICdfcm9vdCcsIGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9sZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICBfaGFuZGxlcnNbaWRdW3R5cGVdW3NlbGVjdG9yXS5tYXRjaCA9IG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzW19sZXZlbF0gPSBfaGFuZGxlcnNbaWRdW3R5cGVdW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9wUHJvcGFnYXRpb24oKSBmYWlscyB0byBzZXQgY2FuY2VsQnViYmxlIHRvIHRydWUgaW4gV2Via2l0XG4gICAgICAgIC8vIEBzZWUgaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTYyMjcwXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8PSBfbGV2ZWw7IGkrKykge1xuICAgICAgICAgICAgaWYgKG1hdGNoZXNbaV0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbWF0Y2hlc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc1tpXVtqXS5jYWxsKG1hdGNoZXNbaV0ubWF0Y2gsIGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgR2F0b3IuY2FuY2VsKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY2FuY2VsQnViYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kcyB0aGUgc3BlY2lmaWVkIGV2ZW50cyB0byB0aGUgZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gcmVtb3ZlXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfYmluZChldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaywgcmVtb3ZlKSB7XG5cbiAgICAgICAgLy8gZmFpbCBzaWxlbnRseSBpZiB5b3UgcGFzcyBudWxsIG9yIHVuZGVmaW5lZCBhcyBhbiBhbGVtZW50XG4gICAgICAgIC8vIGluIHRoZSBHYXRvciBjb25zdHJ1Y3RvclxuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoZXZlbnRzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBldmVudHMgPSBbZXZlbnRzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mKHNlbGVjdG9yKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSAnX3Jvb3QnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlkID0gdGhpcy5pZCxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldEdsb2JhbENhbGxiYWNrKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgX2hhbmRsZUV2ZW50KGlkLCBlLCB0eXBlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgX3JlbW92ZUhhbmRsZXIodGhpcywgZXZlbnRzW2ldLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIV9oYW5kbGVyc1tpZF0gfHwgIV9oYW5kbGVyc1tpZF1bZXZlbnRzW2ldXSkge1xuICAgICAgICAgICAgICAgIEdhdG9yLmFkZEV2ZW50KHRoaXMsIGV2ZW50c1tpXSwgX2dldEdsb2JhbENhbGxiYWNrKGV2ZW50c1tpXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfYWRkSGFuZGxlcih0aGlzLCBldmVudHNbaV0sIHNlbGVjdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYXRvciBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdhdG9yKGVsZW1lbnQsIGlkKSB7XG5cbiAgICAgICAgLy8gY2FsbGVkIGFzIGZ1bmN0aW9uXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBHYXRvcikpIHtcbiAgICAgICAgICAgIC8vIG9ubHkga2VlcCBvbmUgR2F0b3IgaW5zdGFuY2UgcGVyIG5vZGUgdG8gbWFrZSBzdXJlIHRoYXRcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNyZWF0ZSBhIHRvbiBvZiBuZXcgb2JqZWN0cyBpZiB5b3Ugd2FudCB0byBkZWxlZ2F0ZVxuICAgICAgICAgICAgLy8gbXVsdGlwbGUgZXZlbnRzIGZyb20gdGhlIHNhbWUgbm9kZVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGZvciBleGFtcGxlOiBHYXRvcihkb2N1bWVudCkub24oLi4uXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gX2dhdG9ySW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9nYXRvckluc3RhbmNlc1trZXldLmVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9nYXRvckluc3RhbmNlc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2lkKys7XG4gICAgICAgICAgICBfZ2F0b3JJbnN0YW5jZXNbX2lkXSA9IG5ldyBHYXRvcihlbGVtZW50LCBfaWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gX2dhdG9ySW5zdGFuY2VzW19pZF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkcyBhbiBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBHYXRvci5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gX2JpbmQuY2FsbCh0aGlzLCBldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZXMgYW4gZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgR2F0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50cywgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBfYmluZC5jYWxsKHRoaXMsIGV2ZW50cywgc2VsZWN0b3IsIGNhbGxiYWNrLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgR2F0b3IubWF0Y2hlc1NlbGVjdG9yID0gZnVuY3Rpb24oKSB7fTtcbiAgICBHYXRvci5jYW5jZWwgPSBfY2FuY2VsO1xuICAgIEdhdG9yLmFkZEV2ZW50ID0gX2FkZEV2ZW50O1xuICAgIEdhdG9yLm1hdGNoZXNFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gR2F0b3I7XG4gICAgfVxuXG4gICAgd2luZG93LkdhdG9yID0gR2F0b3I7XG59KSAoKTtcbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwiLyoqXG4gKiBNaWNyb0V2ZW50IC0gdG8gbWFrZSBhbnkganMgb2JqZWN0IGFuIGV2ZW50IGVtaXR0ZXIgKHNlcnZlciBvciBicm93c2VyKVxuICogXG4gKiAtIHB1cmUgamF2YXNjcmlwdCAtIHNlcnZlciBjb21wYXRpYmxlLCBicm93c2VyIGNvbXBhdGlibGVcbiAqIC0gZG9udCByZWx5IG9uIHRoZSBicm93c2VyIGRvbXNcbiAqIC0gc3VwZXIgc2ltcGxlIC0geW91IGdldCBpdCBpbW1lZGlhdGx5LCBubyBtaXN0ZXJ5LCBubyBtYWdpYyBpbnZvbHZlZFxuICpcbiAqIC0gY3JlYXRlIGEgTWljcm9FdmVudERlYnVnIHdpdGggZ29vZGllcyB0byBkZWJ1Z1xuICogICAtIG1ha2UgaXQgc2FmZXIgdG8gdXNlXG4qL1xuXG52YXIgTWljcm9FdmVudFx0PSBmdW5jdGlvbigpe31cbk1pY3JvRXZlbnQucHJvdG90eXBlXHQ9IHtcblx0YmluZFx0OiBmdW5jdGlvbihldmVudCwgZmN0KXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF1cdHx8IFtdO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmY3QpO1xuXHR9LFxuXHR1bmJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XS5zcGxpY2UodGhpcy5fZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZjdCksIDEpO1xuXHR9LFxuXHR0cmlnZ2VyXHQ6IGZ1bmN0aW9uKGV2ZW50IC8qICwgYXJncy4uLiAqLyl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZXZlbnRzW2V2ZW50XVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBtaXhpbiB3aWxsIGRlbGVnYXRlIGFsbCBNaWNyb0V2ZW50LmpzIGZ1bmN0aW9uIGluIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAqXG4gKiAtIHJlcXVpcmUoJ01pY3JvRXZlbnQnKS5taXhpbihGb29iYXIpIHdpbGwgbWFrZSBGb29iYXIgYWJsZSB0byB1c2UgTWljcm9FdmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgc3VwcG9ydCBNaWNyb0V2ZW50XG4qL1xuTWljcm9FdmVudC5taXhpblx0PSBmdW5jdGlvbihkZXN0T2JqZWN0KXtcblx0dmFyIHByb3BzXHQ9IFsnYmluZCcsICd1bmJpbmQnLCAndHJpZ2dlciddO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICsrKXtcblx0XHRkZXN0T2JqZWN0LnByb3RvdHlwZVtwcm9wc1tpXV1cdD0gTWljcm9FdmVudC5wcm90b3R5cGVbcHJvcHNbaV1dO1xuXHR9XG59XG5cbi8vIGV4cG9ydCBpbiBjb21tb24ganNcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmICgnZXhwb3J0cycgaW4gbW9kdWxlKSl7XG5cdG1vZHVsZS5leHBvcnRzXHQ9IE1pY3JvRXZlbnRcbn1cbiIsIi8qIVxuICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XG4gKiBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzXG4gKi9cblxuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSBNdXN0YWNoZTogdHJ1ZSovXG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZSAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiB0eXBlb2YgZXhwb3J0cy5ub2RlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMpOyAvLyBDb21tb25KU1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7IC8vIEFNRFxuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5NdXN0YWNoZSA9IHt9O1xuICAgIGZhY3RvcnkoZ2xvYmFsLk11c3RhY2hlKTsgLy8gc2NyaXB0LCB3c2gsIGFzcFxuICB9XG59KHRoaXMsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeSAobXVzdGFjaGUpIHtcblxuICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyIChvYmopIHtcbiAgICByZXR1cm4gaXNBcnJheShvYmopID8gJ2FycmF5JyA6IHR5cGVvZiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVSZWdFeHAgKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eSAob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG4gIGZ1bmN0aW9uIHRlc3RSZWdFeHAgKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRlc3RSZWdFeHAobm9uU3BhY2VSZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcvJzogJyYjeDJGOycsXG4gICAgJ2AnOiAnJiN4NjA7JyxcbiAgICAnPSc6ICcmI3gzRDsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbCAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcCAocykge1xuICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIGVxdWFsc1JlID0gL1xccyo9LztcbiAgdmFyIGN1cmx5UmUgPSAvXFxzKlxcfS87XG4gIHZhciB0YWdSZSA9IC8jfFxcXnxcXC98PnxcXHt8Jnw9fCEvO1xuXG4gIC8qKlxuICAgKiBCcmVha3MgdXAgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgc3RyaW5nIGludG8gYSB0cmVlIG9mIHRva2Vucy4gSWYgdGhlIGB0YWdzYFxuICAgKiBhcmd1bWVudCBpcyBnaXZlbiBoZXJlIGl0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d28gc3RyaW5nIHZhbHVlczogdGhlXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gbXVzdGFjaGUudGFncykuXG4gICAqXG4gICAqIEEgdG9rZW4gaXMgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCA0IGVsZW1lbnRzLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGVcbiAgICogbXVzdGFjaGUgc3ltYm9sIHRoYXQgd2FzIHVzZWQgaW5zaWRlIHRoZSB0YWcsIGUuZy4gXCIjXCIgb3IgXCImXCIuIElmIHRoZSB0YWdcbiAgICogZGlkIG5vdCBjb250YWluIGEgc3ltYm9sIChpLmUuIHt7bXlWYWx1ZX19KSB0aGlzIGVsZW1lbnQgaXMgXCJuYW1lXCIuIEZvclxuICAgKiBhbGwgdGV4dCB0aGF0IGFwcGVhcnMgb3V0c2lkZSBhIHN5bWJvbCB0aGlzIGVsZW1lbnQgaXMgXCJ0ZXh0XCIuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIHRva2VuIGlzIGl0cyBcInZhbHVlXCIuIEZvciBtdXN0YWNoZSB0YWdzIHRoaXMgaXNcbiAgICogd2hhdGV2ZXIgZWxzZSB3YXMgaW5zaWRlIHRoZSB0YWcgYmVzaWRlcyB0aGUgb3BlbmluZyBzeW1ib2wuIEZvciB0ZXh0IHRva2Vuc1xuICAgKiB0aGlzIGlzIHRoZSB0ZXh0IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIHRoaXJkIGFuZCBmb3VydGggZWxlbWVudHMgb2YgdGhlIHRva2VuIGFyZSB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzLFxuICAgKiByZXNwZWN0aXZlbHksIG9mIHRoZSB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIFRva2VucyB0aGF0IGFyZSB0aGUgcm9vdCBub2RlIG9mIGEgc3VidHJlZSBjb250YWluIHR3byBtb3JlIGVsZW1lbnRzOiAxKSBhblxuICAgKiBhcnJheSBvZiB0b2tlbnMgaW4gdGhlIHN1YnRyZWUgYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgYXRcbiAgICogd2hpY2ggdGhlIGNsb3NpbmcgdGFnIGZvciB0aGF0IHNlY3Rpb24gYmVnaW5zLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlICgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyAodGFnc1RvQ29tcGlsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0YWdzVG9Db21waWxlID09PSAnc3RyaW5nJylcbiAgICAgICAgdGFnc1RvQ29tcGlsZSA9IHRhZ3NUb0NvbXBpbGUuc3BsaXQoc3BhY2VSZSwgMik7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWdzVG9Db21waWxlKSB8fCB0YWdzVG9Db21waWxlLmxlbmd0aCAhPT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3M6ICcgKyB0YWdzVG9Db21waWxlKTtcblxuICAgICAgb3BlbmluZ1RhZ1JlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkgKyAnXFxcXHMqJyk7XG4gICAgICBjbG9zaW5nVGFnUmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICAgIGNsb3NpbmdDdXJseVJlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCgnfScgKyB0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgfVxuXG4gICAgY29tcGlsZVRhZ3ModGFncyB8fCBtdXN0YWNoZS50YWdzKTtcblxuICAgIHZhciBzY2FubmVyID0gbmV3IFNjYW5uZXIodGVtcGxhdGUpO1xuXG4gICAgdmFyIHN0YXJ0LCB0eXBlLCB2YWx1ZSwgY2hyLCB0b2tlbiwgb3BlblNlY3Rpb247XG4gICAgd2hpbGUgKCFzY2FubmVyLmVvcygpKSB7XG4gICAgICBzdGFydCA9IHNjYW5uZXIucG9zO1xuXG4gICAgICAvLyBNYXRjaCBhbnkgdGV4dCBiZXR3ZWVuIHRhZ3MuXG4gICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKG9wZW5pbmdUYWdSZSk7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGkgPCB2YWx1ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgY2hyID0gdmFsdWUuY2hhckF0KGkpO1xuXG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjaHIpKSB7XG4gICAgICAgICAgICBzcGFjZXMucHVzaCh0b2tlbnMubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsgJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDEgXSk7XG4gICAgICAgICAgc3RhcnQgKz0gMTtcblxuICAgICAgICAgIC8vIENoZWNrIGZvciB3aGl0ZXNwYWNlIG9uIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICAgICAgaWYgKGNociA9PT0gJ1xcbicpXG4gICAgICAgICAgICBzdHJpcFNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIG9wZW5pbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4ob3BlbmluZ1RhZ1JlKSlcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGhhc1RhZyA9IHRydWU7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHR5cGUuXG4gICAgICB0eXBlID0gc2Nhbm5lci5zY2FuKHRhZ1JlKSB8fCAnbmFtZSc7XG4gICAgICBzY2FubmVyLnNjYW4od2hpdGVSZSk7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHZhbHVlLlxuICAgICAgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gWyB0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zIF07XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0YWdzIGZvciB0aGUgbmV4dCB0aW1lIGFyb3VuZC5cbiAgICAgICAgY29tcGlsZVRhZ3ModmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gb3BlbiBzZWN0aW9ucyB3aGVuIHdlJ3JlIGRvbmUuXG4gICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgIGlmIChvcGVuU2VjdGlvbilcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgcmV0dXJuIG5lc3RUb2tlbnMoc3F1YXNoVG9rZW5zKHRva2VucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHRoZSB2YWx1ZXMgb2YgY29uc2VjdXRpdmUgdGV4dCB0b2tlbnMgaW4gdGhlIGdpdmVuIGB0b2tlbnNgIGFycmF5XG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxuICAgKi9cbiAgZnVuY3Rpb24gc3F1YXNoVG9rZW5zICh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2VucyAodG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lciAoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWlsID0gc3RyaW5nO1xuICAgIHRoaXMucG9zID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5lb3MgPSBmdW5jdGlvbiBlb3MgKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuIChyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbCAocmUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnRhaWwuc2VhcmNoKHJlKSwgbWF0Y2g7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbDtcbiAgICAgICAgdGhpcy50YWlsID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtYXRjaCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMucG9zICs9IG1hdGNoLmxlbmd0aDtcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHJlbmRlcmluZyBjb250ZXh0IGJ5IHdyYXBwaW5nIGEgdmlldyBvYmplY3QgYW5kXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIGZ1bmN0aW9uIENvbnRleHQgKHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7ICcuJzogdGhpcy52aWV3IH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lIGluIHRoaXMgY29udGV4dCwgdHJhdmVyc2luZ1xuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwIChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlciAoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGlzIHdyaXRlci5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5wYXJzZSh0ZW1wbGF0ZSk7XG4gICAgdmFyIGNvbnRleHQgPSAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCB1c2luZ1xuICAgKiB0aGUgZ2l2ZW4gYGNvbnRleHRgIGFuZCBgcGFydGlhbHNgLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgYG9yaWdpbmFsVGVtcGxhdGVgIGlzIG9ubHkgZXZlciB1c2VkIHRvIGV4dHJhY3QgdGhlIHBvcnRpb25cbiAgICogb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgd2FzIGNvbnRhaW5lZCBpbiBhIGhpZ2hlci1vcmRlciBzZWN0aW9uLlxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxuICAgKiBiZSBvbWl0dGVkLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnMgKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG5cbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN5bWJvbCA9IHRva2VuWzBdO1xuXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICdeJykgdmFsdWUgPSB0aGlzLnJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICc+JykgdmFsdWUgPSB0aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnbmFtZScpIHZhbHVlID0gdGhpcy5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAndGV4dCcpIHZhbHVlID0gdGhpcy5yYXdWYWx1ZSh0b2tlbik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiByZW5kZXJTZWN0aW9uICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyICh0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0LCBwYXJ0aWFscyk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGogPCB2YWx1ZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg2XG4gICAgaWYgKCF2YWx1ZSB8fCAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSlcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwgKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSAodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUgKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIG11c3RhY2hlLmVzY2FwZSh2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZSA9IGZ1bmN0aW9uIHJhd1ZhbHVlICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjMuMCc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbICd7eycsICd9fScgXTtcblxuICAvLyBBbGwgaGlnaC1sZXZlbCBtdXN0YWNoZS4qIGZ1bmN0aW9ucyB1c2UgdGhpcyB3cml0ZXIuXG4gIHZhciBkZWZhdWx0V3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUhIFRlbXBsYXRlIHNob3VsZCBiZSBhIFwic3RyaW5nXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FyZ3VtZW50IGZvciBtdXN0YWNoZSNyZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKScpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC4sXG4gIC8qZXNsaW50LWRpc2FibGUgKi8gLy8gZXNsaW50IHdhbnRzIGNhbWVsIGNhc2VkIGZ1bmN0aW9uIG5hbWVcbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uIHRvX2h0bWwgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbiAgcmV0dXJuIG11c3RhY2hlO1xufSkpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIiFmdW5jdGlvbihnbG9iYWxzKSB7XG4ndXNlIHN0cmljdCdcblxudmFyIF9pbXBvcnRzID0ge31cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7IC8vQ29tbW9uSlNcbiAgX2ltcG9ydHMuYnl0ZXNUb0hleCA9IHJlcXVpcmUoJ2NvbnZlcnQtaGV4JykuYnl0ZXNUb0hleFxuICBfaW1wb3J0cy5jb252ZXJ0U3RyaW5nID0gcmVxdWlyZSgnY29udmVydC1zdHJpbmcnKVxuICBtb2R1bGUuZXhwb3J0cyA9IHNoYTI1NlxufSBlbHNlIHtcbiAgX2ltcG9ydHMuYnl0ZXNUb0hleCA9IGdsb2JhbHMuY29udmVydEhleC5ieXRlc1RvSGV4XG4gIF9pbXBvcnRzLmNvbnZlcnRTdHJpbmcgPSBnbG9iYWxzLmNvbnZlcnRTdHJpbmdcbiAgZ2xvYmFscy5zaGEyNTYgPSBzaGEyNTZcbn1cblxuLypcbkNyeXB0b0pTIHYzLjEuMlxuY29kZS5nb29nbGUuY29tL3AvY3J5cHRvLWpzXG4oYykgMjAwOS0yMDEzIGJ5IEplZmYgTW90dC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbmNvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qcy93aWtpL0xpY2Vuc2VcbiovXG5cbi8vIEluaXRpYWxpemF0aW9uIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcbnZhciBLID0gW11cblxuLy8gQ29tcHV0ZSBjb25zdGFudHNcbiFmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGlzUHJpbWUobikge1xuICAgIHZhciBzcXJ0TiA9IE1hdGguc3FydChuKTtcbiAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG4gICAgICBpZiAoIShuICUgZmFjdG9yKSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcbiAgICByZXR1cm4gKChuIC0gKG4gfCAwKSkgKiAweDEwMDAwMDAwMCkgfCAwXG4gIH1cblxuICB2YXIgbiA9IDJcbiAgdmFyIG5QcmltZSA9IDBcbiAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG4gICAgaWYgKGlzUHJpbWUobikpIHtcbiAgICAgIEtbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAzKSlcbiAgICAgIG5QcmltZSsrXG4gICAgfVxuXG4gICAgbisrXG4gIH1cbn0oKVxuXG52YXIgYnl0ZXNUb1dvcmRzID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gIHZhciB3b3JkcyA9IFtdXG4gIGZvciAodmFyIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpIHtcbiAgICB3b3Jkc1tiID4+PiA1XSB8PSBieXRlc1tpXSA8PCAoMjQgLSBiICUgMzIpXG4gIH1cbiAgcmV0dXJuIHdvcmRzXG59XG5cbnZhciB3b3Jkc1RvQnl0ZXMgPSBmdW5jdGlvbiAod29yZHMpIHtcbiAgdmFyIGJ5dGVzID0gW11cbiAgZm9yICh2YXIgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KSB7XG4gICAgYnl0ZXMucHVzaCgod29yZHNbYiA+Pj4gNV0gPj4+ICgyNCAtIGIgJSAzMikpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZXNcbn1cblxuLy8gUmV1c2FibGUgb2JqZWN0XG52YXIgVyA9IFtdXG5cbnZhciBwcm9jZXNzQmxvY2sgPSBmdW5jdGlvbiAoSCwgTSwgb2Zmc2V0KSB7XG4gIC8vIFdvcmtpbmcgdmFyaWFibGVzXG4gIHZhciBhID0gSFswXSwgYiA9IEhbMV0sIGMgPSBIWzJdLCBkID0gSFszXVxuICB2YXIgZSA9IEhbNF0sIGYgPSBIWzVdLCBnID0gSFs2XSwgaCA9IEhbN11cblxuICAgIC8vIENvbXB1dGF0aW9uXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgIGlmIChpIDwgMTYpIHtcbiAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMFxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZ2FtbWEweCA9IFdbaSAtIDE1XVxuICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMHggPDwgMTQpIHwgKGdhbW1hMHggPj4+IDE4KSkgXlxuICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMylcblxuICAgICAgdmFyIGdhbW1hMXggPSBXW2kgLSAyXTtcbiAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cbiAgICAgICAgICAgICAgICAgICAgKChnYW1tYTF4IDw8IDEzKSB8IChnYW1tYTF4ID4+PiAxOSkpIF5cbiAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKVxuXG4gICAgICBXW2ldID0gZ2FtbWEwICsgV1tpIC0gN10gKyBnYW1tYTEgKyBXW2kgLSAxNl07XG4gICAgfVxuXG4gICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcbiAgICB2YXIgbWFqID0gKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpO1xuXG4gICAgdmFyIHNpZ21hMCA9ICgoYSA8PCAzMCkgfCAoYSA+Pj4gMikpIF4gKChhIDw8IDE5KSB8IChhID4+PiAxMykpIF4gKChhIDw8IDEwKSB8IChhID4+PiAyMikpO1xuICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuICAgIHZhciB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldO1xuICAgIHZhciB0MiA9IHNpZ21hMCArIG1hajtcblxuICAgIGggPSBnO1xuICAgIGcgPSBmO1xuICAgIGYgPSBlO1xuICAgIGUgPSAoZCArIHQxKSB8IDA7XG4gICAgZCA9IGM7XG4gICAgYyA9IGI7XG4gICAgYiA9IGE7XG4gICAgYSA9ICh0MSArIHQyKSB8IDA7XG4gIH1cblxuICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG4gIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcbiAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG4gIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcbiAgSFs1XSA9IChIWzVdICsgZikgfCAwO1xuICBIWzZdID0gKEhbNl0gKyBnKSB8IDA7XG4gIEhbN10gPSAoSFs3XSArIGgpIHwgMDtcbn1cblxuZnVuY3Rpb24gc2hhMjU2KG1lc3NhZ2UsIG9wdGlvbnMpIHs7XG4gIGlmIChtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBTdHJpbmcpIHtcbiAgICBtZXNzYWdlID0gX2ltcG9ydHMuY29udmVydFN0cmluZy5VVEY4LnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XG4gIH1cblxuICB2YXIgSCA9WyAweDZBMDlFNjY3LCAweEJCNjdBRTg1LCAweDNDNkVGMzcyLCAweEE1NEZGNTNBLFxuICAgICAgICAgICAweDUxMEU1MjdGLCAweDlCMDU2ODhDLCAweDFGODNEOUFCLCAweDVCRTBDRDE5IF07XG5cbiAgdmFyIG0gPSBieXRlc1RvV29yZHMobWVzc2FnZSk7XG4gIHZhciBsID0gbWVzc2FnZS5sZW5ndGggKiA4O1xuXG4gIG1bbCA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGwgJSAzMik7XG4gIG1bKChsICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsO1xuXG4gIGZvciAodmFyIGk9MCA7IGk8bS5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBwcm9jZXNzQmxvY2soSCwgbSwgaSk7XG4gIH1cblxuICB2YXIgZGlnZXN0Ynl0ZXMgPSB3b3Jkc1RvQnl0ZXMoSCk7XG4gIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcbiAgICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5hc1N0cmluZyA/IF9pbXBvcnRzLmNvbnZlcnRTdHJpbmcuYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxuICAgICAgICAgX2ltcG9ydHMuYnl0ZXNUb0hleChkaWdlc3RieXRlcylcbn1cblxuc2hhMjU2LngyID0gZnVuY3Rpb24obWVzc2FnZSwgb3B0aW9ucykge1xuICByZXR1cm4gc2hhMjU2KHNoYTI1NihtZXNzYWdlLCB7IGFzQnl0ZXM6dHJ1ZSB9KSwgb3B0aW9ucylcbn1cblxufSh0aGlzKTtcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBBbmltYXRpb25cbiAgICBjb25zdHJ1Y3RvcjogKEBlbCkgLT5cbiAgICAgICAgQHJ1biA9IDBcblxuICAgICAgICByZXR1cm5cblxuICAgIGFuaW1hdGU6IChvcHRpb25zID0ge30sIGNhbGxiYWNrID0gLT4pIC0+XG4gICAgICAgIHggPSBvcHRpb25zLnggPyAwXG4gICAgICAgIHkgPSBvcHRpb25zLnkgPyAwXG4gICAgICAgIHNjYWxlID0gb3B0aW9ucy5zY2FsZSA/IDFcbiAgICAgICAgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmcgPyAnZWFzZS1vdXQnXG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiA/IDBcbiAgICAgICAgcnVuID0gKytAcnVuXG4gICAgICAgIHRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoI3t4fSwgI3t5fSwgMHB4KSBzY2FsZTNkKCN7c2NhbGV9LCAje3NjYWxlfSwgMSlcIlxuXG4gICAgICAgIGlmIEBlbC5zdHlsZS50cmFuc2Zvcm0gaXMgdHJhbnNmb3JtXG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIGVsc2UgaWYgZHVyYXRpb24gPiAwXG4gICAgICAgICAgICB0cmFuc2l0aW9uRW5kID0gPT5cbiAgICAgICAgICAgICAgICByZXR1cm4gaWYgcnVuIGlzbnQgQHJ1blxuXG4gICAgICAgICAgICAgICAgQGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIgJ3RyYW5zaXRpb25lbmQnLCB0cmFuc2l0aW9uRW5kXG4gICAgICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcblxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICBAZWwuYWRkRXZlbnRMaXN0ZW5lciAndHJhbnNpdGlvbmVuZCcsIHRyYW5zaXRpb25FbmQsIGZhbHNlXG5cbiAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gI3tlYXNpbmd9ICN7ZHVyYXRpb259bXNcIlxuICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAZWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuXG4gICAgICAgICAgICBjYWxsYmFjaygpXG5cbiAgICAgICAgQFxuIiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQYWdlU3ByZWFkXG4gICAgY29uc3RydWN0b3I6IChAZWwsIEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEB2aXNpYmlsaXR5ID0gJ2dvbmUnXG4gICAgICAgIEBwb3NpdGlvbmVkID0gZmFsc2VcbiAgICAgICAgQGFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIEBpZCA9IEBvcHRpb25zLmlkXG4gICAgICAgIEB0eXBlID0gQG9wdGlvbnMudHlwZVxuICAgICAgICBAcGFnZUlkcyA9IEBvcHRpb25zLnBhZ2VJZHNcbiAgICAgICAgQHdpZHRoID0gQG9wdGlvbnMud2lkdGhcbiAgICAgICAgQGxlZnQgPSBAb3B0aW9ucy5sZWZ0XG4gICAgICAgIEBtYXhab29tU2NhbGUgPSBAb3B0aW9ucy5tYXhab29tU2NhbGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGlzWm9vbWFibGU6IC0+XG4gICAgICAgIEBnZXRNYXhab29tU2NhbGUoKSA+IDEgYW5kIEBnZXRFbCgpLmdldEF0dHJpYnV0ZSgnZGF0YS16b29tYWJsZScpIGlzbnQgJ2ZhbHNlJ1xuXG4gICAgaXNTY3JvbGxhYmxlOiAtPlxuICAgICAgICBAZ2V0RWwoKS5jbGFzc0xpc3QuY29udGFpbnMgJ3ZlcnNvLS1zY3JvbGxhYmxlJ1xuXG4gICAgZ2V0RWw6IC0+XG4gICAgICAgIEBlbFxuXG4gICAgZ2V0T3ZlcmxheUVsczogLT5cbiAgICAgICAgQGdldEVsKCkucXVlcnlTZWxlY3RvckFsbCAnLnZlcnNvX19vdmVybGF5J1xuXG4gICAgZ2V0UGFnZUVsczogLT5cbiAgICAgICAgQGdldEVsKCkucXVlcnlTZWxlY3RvckFsbCAnLnZlcnNvX19wYWdlJ1xuXG4gICAgZ2V0UmVjdDogLT5cbiAgICAgICAgQGdldEVsKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGdldENvbnRlbnRSZWN0OiAtPlxuICAgICAgICByZWN0ID1cbiAgICAgICAgICAgIHRvcDogbnVsbFxuICAgICAgICAgICAgbGVmdDogbnVsbFxuICAgICAgICAgICAgcmlnaHQ6IG51bGxcbiAgICAgICAgICAgIGJvdHRvbTogbnVsbFxuICAgICAgICAgICAgd2lkdGg6IG51bGxcbiAgICAgICAgICAgIGhlaWdodDogbnVsbFxuICAgICAgICAgICAgXG4gICAgICAgIGZvciBwYWdlRWwgaW4gQGdldFBhZ2VFbHMoKVxuICAgICAgICAgICAgcGFnZVJlY3QgPVxuICAgICAgICAgICAgICAgIHRvcDogcGFnZUVsLm9mZnNldFRvcFxuICAgICAgICAgICAgICAgIGxlZnQ6IHBhZ2VFbC5vZmZzZXRMZWZ0XG4gICAgICAgICAgICAgICAgd2lkdGg6IHBhZ2VFbC5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgICAgIGhlaWdodDogcGFnZUVsLm9mZnNldEhlaWdodFxuXG4gICAgICAgICAgICByZWN0LnRvcCA9IHBhZ2VSZWN0LnRvcCBpZiBwYWdlUmVjdC50b3AgPCByZWN0LnRvcCBvciBub3QgcmVjdC50b3A/XG4gICAgICAgICAgICByZWN0LmxlZnQgPSBwYWdlUmVjdC5sZWZ0IGlmIHBhZ2VSZWN0LmxlZnQgPCByZWN0LmxlZnQgb3Igbm90IHJlY3QubGVmdD9cbiAgICAgICAgICAgIHJlY3QucmlnaHQgPSBwYWdlUmVjdC5yaWdodCBpZiBwYWdlUmVjdC5yaWdodCA+IHJlY3QucmlnaHQgb3Igbm90IHJlY3QucmlnaHQ/XG4gICAgICAgICAgICByZWN0LmJvdHRvbSA9IHBhZ2VSZWN0LmJvdHRvbSBpZiBwYWdlUmVjdC5ib3R0b20gPiByZWN0LmJvdHRvbSBvciBub3QgcmVjdC5ib3R0b20/XG5cbiAgICAgICAgcmVjdC50b3AgPSByZWN0LnRvcCA/IDBcbiAgICAgICAgcmVjdC5sZWZ0ID0gcmVjdC5sZWZ0ID8gMFxuICAgICAgICByZWN0LnJpZ2h0ID0gcmVjdC5yaWdodCA/IDBcbiAgICAgICAgcmVjdC5ib3R0b20gPSByZWN0LmJvdHRvbSA/IDBcbiAgICAgICAgcmVjdC53aWR0aCA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnRcbiAgICAgICAgcmVjdC5oZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wXG5cbiAgICAgICAgcmVjdFxuXG4gICAgZ2V0SWQ6IC0+XG4gICAgICAgIEBpZFxuXG4gICAgZ2V0VHlwZTogLT5cbiAgICAgICAgQHR5cGVcblxuICAgIGdldFBhZ2VJZHM6IC0+XG4gICAgICAgIEBwYWdlSWRzXG5cbiAgICBnZXRXaWR0aDogLT5cbiAgICAgICAgQHdpZHRoXG5cbiAgICBnZXRMZWZ0OiAtPlxuICAgICAgICBAbGVmdFxuXG4gICAgZ2V0TWF4Wm9vbVNjYWxlOiAtPlxuICAgICAgICBAbWF4Wm9vbVNjYWxlXG5cbiAgICBnZXRWaXNpYmlsaXR5OiAtPlxuICAgICAgICBAdmlzaWJpbGl0eVxuXG4gICAgc2V0VmlzaWJpbGl0eTogKHZpc2liaWxpdHkpIC0+XG4gICAgICAgIGlmIEB2aXNpYmlsaXR5IGlzbnQgdmlzaWJpbGl0eVxuICAgICAgICAgICAgQGdldEVsKCkuc3R5bGUuZGlzcGxheSA9IGlmIHZpc2liaWxpdHkgaXMgJ3Zpc2libGUnIHRoZW4gJ2Jsb2NrJyBlbHNlICdub25lJ1xuXG4gICAgICAgICAgICBAdmlzaWJpbGl0eSA9IHZpc2liaWxpdHlcblxuICAgICAgICBAXG5cbiAgICBwb3NpdGlvbjogLT5cbiAgICAgICAgaWYgQHBvc2l0aW9uZWQgaXMgZmFsc2VcbiAgICAgICAgICAgIEBnZXRFbCgpLnN0eWxlLmxlZnQgPSBcIiN7QGdldExlZnQoKX0lXCJcblxuICAgICAgICAgICAgQHBvc2l0aW9uZWQgPSB0cnVlXG5cbiAgICAgICAgQFxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEBhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBnZXRFbCgpLnNldEF0dHJpYnV0ZSAnZGF0YS1hY3RpdmUnLCBAYWN0aXZlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkZWFjdGl2YXRlOiAtPlxuICAgICAgICBAYWN0aXZlID0gZmFsc2VcbiAgICAgICAgQGdldEVsKCkuc2V0QXR0cmlidXRlICdkYXRhLWFjdGl2ZScsIEBhY3RpdmVcblxuICAgICAgICByZXR1cm5cbiIsIkhhbW1lciA9IHJlcXVpcmUgJ2hhbW1lcmpzJ1xuTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5QYWdlU3ByZWFkID0gcmVxdWlyZSAnLi9wYWdlX3NwcmVhZCdcbkFuaW1hdGlvbiA9IHJlcXVpcmUgJy4vYW5pbWF0aW9uJ1xuXG5jbGFzcyBWZXJzb1xuICAgIGNvbnN0cnVjdG9yOiAoQGVsLCBAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAc3dpcGVWZWxvY2l0eSA9IEBvcHRpb25zLnN3aXBlVmVsb2NpdHkgPyAwLjNcbiAgICAgICAgQHN3aXBlVGhyZXNob2xkID0gQG9wdGlvbnMuc3dpcGVUaHJlc2hvbGQgPyAxMFxuICAgICAgICBAbmF2aWdhdGlvbkR1cmF0aW9uID0gQG9wdGlvbnMubmF2aWdhdGlvbkR1cmF0aW9uID8gMjQwXG4gICAgICAgIEBuYXZpZ2F0aW9uUGFuRHVyYXRpb24gPSBAb3B0aW9ucy5uYXZpZ2F0aW9uUGFuRHVyYXRpb24gPyAyMDBcbiAgICAgICAgQHpvb21EdXJhdGlvbiA9IEBvcHRpb25zLnpvb21EdXJhdGlvbiA/IDIwMFxuXG4gICAgICAgIEBwb3NpdGlvbiA9IC0xXG4gICAgICAgIEBwaW5jaGluZyA9IGZhbHNlXG4gICAgICAgIEBwYW5uaW5nID0gZmFsc2VcbiAgICAgICAgQHRyYW5zZm9ybSA9IGxlZnQ6IDAsIHRvcDogMCwgc2NhbGU6IDFcbiAgICAgICAgQHN0YXJ0VHJhbnNmb3JtID0gbGVmdDogMCwgdG9wOiAwLCBzY2FsZTogMVxuICAgICAgICBAdGFwID1cbiAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgICAgICBkZWxheTogMjUwXG4gICAgICAgICAgICB0aW1lb3V0OiBudWxsXG5cbiAgICAgICAgQHNjcm9sbGVyRWwgPSBAZWwucXVlcnlTZWxlY3RvciAnLnZlcnNvX19zY3JvbGxlcidcbiAgICAgICAgQHBhZ2VTcHJlYWRFbHMgPSBAZWwucXVlcnlTZWxlY3RvckFsbCAnLnZlcnNvX19wYWdlLXNwcmVhZCdcbiAgICAgICAgQHBhZ2VTcHJlYWRzID0gQHRyYXZlcnNlUGFnZVNwcmVhZHMgQHBhZ2VTcHJlYWRFbHNcbiAgICAgICAgQHBhZ2VJZHMgPSBAYnVpbGRQYWdlSWRzIEBwYWdlU3ByZWFkc1xuICAgICAgICBAYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbiBAc2Nyb2xsZXJFbFxuICAgICAgICBAaGFtbWVyID0gbmV3IEhhbW1lci5NYW5hZ2VyIEBzY3JvbGxlckVsLFxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IHRydWVcbiAgICAgICAgICAgIHRvdWNoQWN0aW9uOiAncGFuLXknXG4gICAgICAgICAgICBlbmFibGU6IGZhbHNlXG4gICAgICAgICAgICAjIFByZWZlciB0b3VjaCBpbnB1dCBpZiBwb3NzaWJsZSBzaW5jZSBBbmRyb2lkIGFjdHMgd2VpcmQgd2hlbiB1c2luZyBwb2ludGVyIGV2ZW50cy5cbiAgICAgICAgICAgIGlucHV0Q2xhc3M6IGlmICdvbnRvdWNoc3RhcnQnIG9mIHdpbmRvdyB0aGVuIEhhbW1lci5Ub3VjaElucHV0IGVsc2UgbnVsbFxuXG4gICAgICAgIEBoYW1tZXIuYWRkIG5ldyBIYW1tZXIuUGFuKGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEwpXG4gICAgICAgIEBoYW1tZXIuYWRkIG5ldyBIYW1tZXIuVGFwKGV2ZW50OiAnc2luZ2xldGFwJywgaW50ZXJ2YWw6IDApXG4gICAgICAgIEBoYW1tZXIuYWRkIG5ldyBIYW1tZXIuUGluY2goKVxuICAgICAgICBAaGFtbWVyLmFkZCBuZXcgSGFtbWVyLlByZXNzKHRpbWU6IDUwMClcbiAgICAgICAgQGhhbW1lci5vbiAncGFuc3RhcnQnLCBAcGFuU3RhcnQuYmluZChAKVxuICAgICAgICBAaGFtbWVyLm9uICdwYW5tb3ZlJywgQHBhbk1vdmUuYmluZChAKVxuICAgICAgICBAaGFtbWVyLm9uICdwYW5lbmQnLCBAcGFuRW5kLmJpbmQoQClcbiAgICAgICAgQGhhbW1lci5vbiAncGFuY2FuY2VsJywgQHBhbkVuZC5iaW5kKEApXG4gICAgICAgIEBoYW1tZXIub24gJ3NpbmdsZXRhcCcsIEBzaW5nbGV0YXAuYmluZChAKVxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaHN0YXJ0JywgQHBpbmNoU3RhcnQuYmluZChAKVxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaG1vdmUnLCBAcGluY2hNb3ZlLmJpbmQoQClcbiAgICAgICAgQGhhbW1lci5vbiAncGluY2hlbmQnLCBAcGluY2hFbmQuYmluZChAKVxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaGNhbmNlbCcsIEBwaW5jaEVuZC5iaW5kKEApXG4gICAgICAgIEBoYW1tZXIub24gJ3ByZXNzJywgQHByZXNzLmJpbmQoQClcblxuICAgICAgICByZXR1cm5cblxuICAgIHN0YXJ0OiAtPlxuICAgICAgICBwYWdlSWQgPSBAZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZChAb3B0aW9ucy5wYWdlSWQpID8gMFxuXG4gICAgICAgIEBoYW1tZXIuc2V0IGVuYWJsZTogdHJ1ZVxuICAgICAgICBAbmF2aWdhdGVUbyBwYWdlSWQsIGR1cmF0aW9uOiAwXG5cbiAgICAgICAgQHJlc2l6ZUxpc3RlbmVyID0gQHJlc2l6ZS5iaW5kIEBcbiAgICAgICAgQHRvdWNoU3RhcnRMaXN0ZW5lciA9IEB0b3VjaFN0YXJ0LmJpbmQgQFxuXG4gICAgICAgIEBlbC5hZGRFdmVudExpc3RlbmVyICd0b3VjaHN0YXJ0JywgQHRvdWNoU3RhcnRMaXN0ZW5lciwgZmFsc2VcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyLCBmYWxzZVxuXG4gICAgICAgIEBcblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBoYW1tZXIuZGVzdHJveSgpXG5cbiAgICAgICAgQGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIgJ3RvdWNoc3RhcnQnLCBAdG91Y2hTdGFydExpc3RlbmVyXG5cbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEByZXNpemVMaXN0ZW5lclxuXG4gICAgICAgIEBcblxuICAgIGZpcnN0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQG5hdmlnYXRlVG8gMCwgb3B0aW9uc1xuXG4gICAgcHJldjogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBuYXZpZ2F0ZVRvIEBnZXRQb3NpdGlvbigpIC0gMSwgb3B0aW9uc1xuXG4gICAgbmV4dDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBuYXZpZ2F0ZVRvIEBnZXRQb3NpdGlvbigpICsgMSwgb3B0aW9uc1xuXG4gICAgbGFzdDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBuYXZpZ2F0ZVRvIEBnZXRQYWdlU3ByZWFkQ291bnQoKSAtIDEsIG9wdGlvbnNcblxuICAgIG5hdmlnYXRlVG86IChwb3NpdGlvbiwgb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICByZXR1cm4gaWYgcG9zaXRpb24gPCAwIG9yIHBvc2l0aW9uID4gQGdldFBhZ2VTcHJlYWRDb3VudCgpIC0gMVxuXG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG4gICAgICAgIGN1cnJlbnRQYWdlU3ByZWFkID0gQGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gY3VycmVudFBvc2l0aW9uXG4gICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWQgPSBAZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBwb3NpdGlvblxuICAgICAgICBjYXJvdXNlbCA9IEBnZXRDYXJvdXNlbEZyb21QYWdlU3ByZWFkIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgdmVsb2NpdHkgPSBvcHRpb25zLnZlbG9jaXR5ID8gMVxuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gPyBAbmF2aWdhdGlvbkR1cmF0aW9uXG4gICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gLyBNYXRoLmFicyh2ZWxvY2l0eSlcbiAgICAgICAgdG91Y2hBY3Rpb24gPSBpZiBhY3RpdmVQYWdlU3ByZWFkLmlzU2Nyb2xsYWJsZSgpIHRoZW4gJ3Bhbi15JyBlbHNlICdub25lJ1xuXG4gICAgICAgIGN1cnJlbnRQYWdlU3ByZWFkLmRlYWN0aXZhdGUoKSBpZiBjdXJyZW50UGFnZVNwcmVhZD9cbiAgICAgICAgYWN0aXZlUGFnZVNwcmVhZC5hY3RpdmF0ZSgpXG5cbiAgICAgICAgY2Fyb3VzZWwudmlzaWJsZS5mb3JFYWNoIChwYWdlU3ByZWFkKSAtPiBwYWdlU3ByZWFkLnBvc2l0aW9uKCkuc2V0VmlzaWJpbGl0eSAndmlzaWJsZSdcblxuICAgICAgICBAaGFtbWVyLnNldCB0b3VjaEFjdGlvbjogdG91Y2hBY3Rpb25cblxuICAgICAgICBAdHJhbnNmb3JtLmxlZnQgPSBAZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkIHBvc2l0aW9uLCBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgIEBzZXRQb3NpdGlvbiBwb3NpdGlvblxuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgPiAxXG4gICAgICAgICAgICBAdHJhbnNmb3JtLnRvcCA9IDBcbiAgICAgICAgICAgIEB0cmFuc2Zvcm0uc2NhbGUgPSAxXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRPdXQnLCBwb3NpdGlvbjogY3VycmVudFBvc2l0aW9uXG5cbiAgICAgICAgQHRyaWdnZXIgJ2JlZm9yZU5hdmlnYXRpb24nLFxuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uOiBwb3NpdGlvblxuXG4gICAgICAgIEBhbmltYXRpb24uYW5pbWF0ZVxuICAgICAgICAgICAgeDogXCIje0B0cmFuc2Zvcm0ubGVmdH0lXCJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAsID0+XG4gICAgICAgICAgICBjYXJvdXNlbCA9IEBnZXRDYXJvdXNlbEZyb21QYWdlU3ByZWFkIEBnZXRBY3RpdmVQYWdlU3ByZWFkKClcblxuICAgICAgICAgICAgY2Fyb3VzZWwuZ29uZS5mb3JFYWNoIChwYWdlU3ByZWFkKSAtPiBwYWdlU3ByZWFkLnNldFZpc2liaWxpdHkgJ2dvbmUnXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdhZnRlck5hdmlnYXRpb24nLFxuICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uOiBAZ2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgICAgIHByZXZpb3VzUG9zaXRpb246IGN1cnJlbnRQb3NpdGlvblxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIGdldFBvc2l0aW9uOiAtPlxuICAgICAgICBAcG9zaXRpb25cblxuICAgIHNldFBvc2l0aW9uOiAocG9zaXRpb24pIC0+XG4gICAgICAgIEBwb3NpdGlvbiA9IHBvc2l0aW9uXG5cbiAgICAgICAgQFxuXG4gICAgZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkOiAocG9zaXRpb24sIHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGxlZnQgPSAwXG5cbiAgICAgICAgaWYgcG9zaXRpb24gaXMgQGdldFBhZ2VTcHJlYWRDb3VudCgpIC0gMVxuICAgICAgICAgICAgbGVmdCA9ICgxMDAgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkpIC0gcGFnZVNwcmVhZC5nZXRMZWZ0KClcbiAgICAgICAgZWxzZSBpZiBwb3NpdGlvbiA+IDBcbiAgICAgICAgICAgIGxlZnQgPSAoMTAwIC0gcGFnZVNwcmVhZC5nZXRXaWR0aCgpKSAvIDIgLSBwYWdlU3ByZWFkLmdldExlZnQoKVxuXG4gICAgICAgIGxlZnRcblxuICAgIGdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQ6IChwYWdlU3ByZWFkU3ViamVjdCkgLT5cbiAgICAgICAgY2Fyb3VzZWwgPVxuICAgICAgICAgICAgdmlzaWJsZTogW11cbiAgICAgICAgICAgIGdvbmU6IFtdXG5cbiAgICAgICAgIyBJZGVudGlmeSB0aGUgcGFnZSBzcHJlYWRzIHRoYXQgc2hvdWxkIGJlIGEgcGFydCBvZiB0aGUgY2Fyb3VzZWwuXG4gICAgICAgIEBwYWdlU3ByZWFkcy5mb3JFYWNoIChwYWdlU3ByZWFkKSAtPlxuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpIDw9IHBhZ2VTcHJlYWRTdWJqZWN0LmdldExlZnQoKVxuICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlIGlmIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpICsgcGFnZVNwcmVhZC5nZXRXaWR0aCgpID4gcGFnZVNwcmVhZFN1YmplY3QuZ2V0TGVmdCgpIC0gMTAwXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWUgaWYgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkgPCBwYWdlU3ByZWFkU3ViamVjdC5nZXRMZWZ0KCkgKyAxMDBcblxuICAgICAgICAgICAgaWYgdmlzaWJsZSBpcyB0cnVlXG4gICAgICAgICAgICAgICAgY2Fyb3VzZWwudmlzaWJsZS5wdXNoIHBhZ2VTcHJlYWRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5nb25lLnB1c2ggcGFnZVNwcmVhZFxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBjYXJvdXNlbFxuXG4gICAgdHJhdmVyc2VQYWdlU3ByZWFkczogKGVscykgLT5cbiAgICAgICAgcGFnZVNwcmVhZHMgPSBbXVxuICAgICAgICBsZWZ0ID0gMFxuXG4gICAgICAgIGZvciBlbCBpbiBlbHNcbiAgICAgICAgICAgIGlkID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLWlkJ1xuICAgICAgICAgICAgdHlwZSA9IGVsLmdldEF0dHJpYnV0ZSAnZGF0YS10eXBlJ1xuICAgICAgICAgICAgcGFnZUlkcyA9IGVsLmdldEF0dHJpYnV0ZSAnZGF0YS1wYWdlLWlkcydcbiAgICAgICAgICAgIHBhZ2VJZHMgPSBpZiBwYWdlSWRzPyB0aGVuIHBhZ2VJZHMuc3BsaXQoJywnKS5tYXAgKGkpIC0+IGkgZWxzZSBbXVxuICAgICAgICAgICAgbWF4Wm9vbVNjYWxlID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLW1heC16b29tLXNjYWxlJ1xuICAgICAgICAgICAgbWF4Wm9vbVNjYWxlID0gaWYgbWF4Wm9vbVNjYWxlPyB0aGVuICttYXhab29tU2NhbGUgZWxzZSAxXG4gICAgICAgICAgICB3aWR0aCA9IGVsLmdldEF0dHJpYnV0ZSAnZGF0YS13aWR0aCdcbiAgICAgICAgICAgIHdpZHRoID0gaWYgd2lkdGg/IHRoZW4gK3dpZHRoIGVsc2UgMTAwXG4gICAgICAgICAgICBwYWdlU3ByZWFkID0gbmV3IFBhZ2VTcHJlYWQgZWwsXG4gICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgICAgICAgIHBhZ2VJZHM6IHBhZ2VJZHNcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGU6IG1heFpvb21TY2FsZVxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnRcblxuICAgICAgICAgICAgbGVmdCArPSB3aWR0aFxuXG4gICAgICAgICAgICBwYWdlU3ByZWFkcy5wdXNoIHBhZ2VTcHJlYWRcblxuICAgICAgICBwYWdlU3ByZWFkc1xuXG4gICAgYnVpbGRQYWdlSWRzOiAocGFnZVNwcmVhZHMpIC0+XG4gICAgICAgIHBhZ2VJZHMgPSB7fVxuXG4gICAgICAgIHBhZ2VTcHJlYWRzLmZvckVhY2ggKHBhZ2VTcHJlYWQsIGkpIC0+XG4gICAgICAgICAgICBwYWdlU3ByZWFkLm9wdGlvbnMucGFnZUlkcy5mb3JFYWNoIChwYWdlSWQpIC0+XG4gICAgICAgICAgICAgICAgcGFnZUlkc1twYWdlSWRdID0gcGFnZVNwcmVhZFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHBhZ2VJZHNcblxuICAgIGlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQ6ICh4LCB5LCBlbCkgLT5cbiAgICAgICAgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgeCA+PSByZWN0LmxlZnQgYW5kIHggPD0gcmVjdC5yaWdodCBhbmQgeSA+PSByZWN0LnRvcCBhbmQgeSA8PSByZWN0LmJvdHRvbVxuXG4gICAgZ2V0Q29vcmRpbmF0ZUluZm86ICh4LCB5LCBwYWdlU3ByZWFkKSAtPlxuICAgICAgICBpbmZvID1cbiAgICAgICAgICAgIHg6IHhcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIGNvbnRlbnRYOiAwXG4gICAgICAgICAgICBjb250ZW50WTogMFxuICAgICAgICAgICAgcGFnZVg6IDBcbiAgICAgICAgICAgIHBhZ2VZOiAwXG4gICAgICAgICAgICBvdmVybGF5RWxzOiBbXVxuICAgICAgICAgICAgcGFnZUVsOiBudWxsXG4gICAgICAgICAgICBpc0luc2lkZUNvbnRlbnRYOiBmYWxzZVxuICAgICAgICAgICAgaXNJbnNpZGVDb250ZW50WTogZmFsc2VcbiAgICAgICAgICAgIGlzSW5zaWRlQ29udGVudDogZmFsc2VcbiAgICAgICAgY29udGVudFJlY3QgPSBwYWdlU3ByZWFkLmdldENvbnRlbnRSZWN0KClcbiAgICAgICAgb3ZlcmxheUVscyA9IHBhZ2VTcHJlYWQuZ2V0T3ZlcmxheUVscygpXG4gICAgICAgIHBhZ2VFbHMgPSBwYWdlU3ByZWFkLmdldFBhZ2VFbHMoKVxuXG4gICAgICAgIGZvciBvdmVybGF5RWwgaW4gb3ZlcmxheUVsc1xuICAgICAgICAgICAgaW5mby5vdmVybGF5RWxzLnB1c2ggb3ZlcmxheUVsIGlmIEBpc0Nvb3JkaW5hdGVJbnNpZGVFbGVtZW50KHgsIHksIG92ZXJsYXlFbClcblxuICAgICAgICBmb3IgcGFnZUVsIGluIHBhZ2VFbHNcbiAgICAgICAgICAgIGlmIEBpc0Nvb3JkaW5hdGVJbnNpZGVFbGVtZW50KHgsIHksIHBhZ2VFbClcbiAgICAgICAgICAgICAgICBpbmZvLnBhZ2VFbCA9IHBhZ2VFbFxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgaW5mby5jb250ZW50WCA9ICh4IC0gY29udGVudFJlY3QubGVmdCkgLyBNYXRoLm1heCgxLCBjb250ZW50UmVjdC53aWR0aClcbiAgICAgICAgaW5mby5jb250ZW50WSA9ICh5IC0gY29udGVudFJlY3QudG9wKSAvIE1hdGgubWF4KDEsIGNvbnRlbnRSZWN0LmhlaWdodClcblxuICAgICAgICBpZiBpbmZvLnBhZ2VFbD9cbiAgICAgICAgICAgIGluZm8uaXNJbnNpZGVDb250ZW50WCA9IGluZm8uY29udGVudFggPj0gMCBhbmQgaW5mby5jb250ZW50WCA8PSAxXG4gICAgICAgICAgICBpbmZvLmlzSW5zaWRlQ29udGVudFkgPSBpbmZvLmNvbnRlbnRZID49IDAgYW5kIGluZm8uY29udGVudFkgPD0gMVxuICAgICAgICAgICAgaW5mby5pc0luc2lkZUNvbnRlbnQgPSBpbmZvLmlzSW5zaWRlQ29udGVudFggYW5kIGluZm8uaXNJbnNpZGVDb250ZW50WVxuXG4gICAgICAgIGluZm9cblxuICAgIGdldFBhZ2VTcHJlYWRDb3VudDogLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLmxlbmd0aFxuXG4gICAgZ2V0QWN0aXZlUGFnZVNwcmVhZDogLT5cbiAgICAgICAgQGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gQGdldFBvc2l0aW9uKClcblxuICAgIGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb246IChwb3NpdGlvbikgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzW3Bvc2l0aW9uXVxuXG4gICAgZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZDogKHBhZ2VJZCkgLT5cbiAgICAgICAgZm9yIHBhZ2VTcHJlYWQsIGlkeCBpbiBAcGFnZVNwcmVhZHNcbiAgICAgICAgICAgIHJldHVybiBpZHggaWYgcGFnZVNwcmVhZC5vcHRpb25zLnBhZ2VJZHMuaW5kZXhPZihwYWdlSWQpID4gLTFcblxuICAgIGdldFBhZ2VTcHJlYWRCb3VuZHM6IChwYWdlU3ByZWFkKSAtPlxuICAgICAgICBwYWdlU3ByZWFkUmVjdCA9IHBhZ2VTcHJlYWQuZ2V0UmVjdCgpXG4gICAgICAgIHBhZ2VTcHJlYWRDb250ZW50UmVjdCA9IHBhZ2VTcHJlYWQuZ2V0Q29udGVudFJlY3QoKVxuXG4gICAgICAgIGxlZnQ6IChwYWdlU3ByZWFkQ29udGVudFJlY3QubGVmdCAtIHBhZ2VTcHJlYWRSZWN0LmxlZnQpIC8gcGFnZVNwcmVhZFJlY3Qud2lkdGggKiAxMDBcbiAgICAgICAgdG9wOiAocGFnZVNwcmVhZENvbnRlbnRSZWN0LnRvcCAtIHBhZ2VTcHJlYWRSZWN0LnRvcCkgLyBwYWdlU3ByZWFkUmVjdC5oZWlnaHQgKiAxMDBcbiAgICAgICAgd2lkdGg6IHBhZ2VTcHJlYWRDb250ZW50UmVjdC53aWR0aCAvIHBhZ2VTcHJlYWRSZWN0LndpZHRoICogMTAwXG4gICAgICAgIGhlaWdodDogcGFnZVNwcmVhZENvbnRlbnRSZWN0LmhlaWdodCAvIHBhZ2VTcHJlYWRSZWN0LmhlaWdodCAqIDEwMFxuICAgICAgICBwYWdlU3ByZWFkUmVjdDogcGFnZVNwcmVhZFJlY3RcbiAgICAgICAgcGFnZVNwcmVhZENvbnRlbnRSZWN0OiBwYWdlU3ByZWFkQ29udGVudFJlY3RcblxuICAgIGNsaXBDb29yZGluYXRlOiAoY29vcmRpbmF0ZSwgc2NhbGUsIHNpemUsIG9mZnNldCkgLT5cbiAgICAgICAgaWYgc2l6ZSAqIHNjYWxlIDwgMTAwXG4gICAgICAgICAgICBjb29yZGluYXRlID0gb2Zmc2V0ICogLXNjYWxlICsgNTAgLSAoc2l6ZSAqIHNjYWxlIC8gMilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IE1hdGgubWluIGNvb3JkaW5hdGUsIG9mZnNldCAqIC1zY2FsZVxuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IE1hdGgubWF4IGNvb3JkaW5hdGUsIG9mZnNldCAqIC1zY2FsZSAtIHNpemUgKiBzY2FsZSArIDEwMFxuXG4gICAgICAgIGNvb3JkaW5hdGVcblxuICAgIHpvb21UbzogKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2spIC0+XG4gICAgICAgIHNjYWxlID0gb3B0aW9ucy5zY2FsZVxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICBwYWdlU3ByZWFkQm91bmRzID0gQGdldFBhZ2VTcHJlYWRCb3VuZHMgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICBjYXJvdXNlbE9mZnNldCA9IGFjdGl2ZVBhZ2VTcHJlYWQuZ2V0TGVmdCgpXG4gICAgICAgIGNhcm91c2VsU2NhbGVkT2Zmc2V0ID0gY2Fyb3VzZWxPZmZzZXQgKiBAdHJhbnNmb3JtLnNjYWxlXG4gICAgICAgIHggPSBvcHRpb25zLnggPyAwXG4gICAgICAgIHkgPSBvcHRpb25zLnkgPyAwXG5cbiAgICAgICAgaWYgc2NhbGUgaXNudCAxXG4gICAgICAgICAgICB4IC09IHBhZ2VTcHJlYWRCb3VuZHMucGFnZVNwcmVhZFJlY3QubGVmdFxuICAgICAgICAgICAgeSAtPSBwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LnRvcFxuICAgICAgICAgICAgeCA9IHggLyAocGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC53aWR0aCAvIEB0cmFuc2Zvcm0uc2NhbGUpICogMTAwXG4gICAgICAgICAgICB5ID0geSAvIChwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LmhlaWdodCAvIEB0cmFuc2Zvcm0uc2NhbGUpICogMTAwXG4gICAgICAgICAgICB4ID0gQHRyYW5zZm9ybS5sZWZ0ICsgY2Fyb3VzZWxTY2FsZWRPZmZzZXQgKyB4IC0gKHggKiBzY2FsZSAvIEB0cmFuc2Zvcm0uc2NhbGUpXG4gICAgICAgICAgICB5ID0gQHRyYW5zZm9ybS50b3AgKyB5IC0gKHkgKiBzY2FsZSAvIEB0cmFuc2Zvcm0uc2NhbGUpXG5cbiAgICAgICAgICAgICMgTWFrZSBzdXJlIHRoZSBhbmltYXRpb24gZG9lc24ndCBleGNlZWQgdGhlIGNvbnRlbnQgYm91bmRzLlxuICAgICAgICAgICAgaWYgb3B0aW9ucy5ib3VuZHMgaXNudCBmYWxzZSBhbmQgc2NhbGUgPiAxXG4gICAgICAgICAgICAgICAgeCA9IEBjbGlwQ29vcmRpbmF0ZSB4LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy53aWR0aCwgcGFnZVNwcmVhZEJvdW5kcy5sZWZ0XG4gICAgICAgICAgICAgICAgeSA9IEBjbGlwQ29vcmRpbmF0ZSB5LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy5oZWlnaHQsIHBhZ2VTcHJlYWRCb3VuZHMudG9wXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHggPSAwXG4gICAgICAgICAgICB5ID0gMFxuXG4gICAgICAgICMgQWNjb3VudCBmb3IgdGhlIHBhZ2Ugc3ByZWFkcyBsZWZ0IG9mIHRoZSBhY3RpdmUgb25lLlxuICAgICAgICB4IC09IGNhcm91c2VsT2Zmc2V0ICogc2NhbGVcblxuICAgICAgICBAdHJhbnNmb3JtLmxlZnQgPSB4XG4gICAgICAgIEB0cmFuc2Zvcm0udG9wID0geVxuICAgICAgICBAdHJhbnNmb3JtLnNjYWxlID0gc2NhbGVcblxuICAgICAgICBAYW5pbWF0aW9uLmFuaW1hdGVcbiAgICAgICAgICAgIHg6IFwiI3t4fSVcIlxuICAgICAgICAgICAgeTogXCIje3l9JVwiXG4gICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgIGVhc2luZzogb3B0aW9ucy5lYXNpbmdcbiAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgICwgY2FsbGJhY2tcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlZnJlc2g6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRWxzID0gQGVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fcGFnZS1zcHJlYWQnXG4gICAgICAgIEBwYWdlU3ByZWFkcyA9IEB0cmF2ZXJzZVBhZ2VTcHJlYWRzIEBwYWdlU3ByZWFkRWxzXG4gICAgICAgIEBwYWdlSWRzID0gQGJ1aWxkUGFnZUlkcyBAcGFnZVNwcmVhZHNcblxuICAgICAgICBAXG5cbiAgICBwYW5TdGFydDogKGUpIC0+XG4gICAgICAgICMgT25seSBhbGxvdyBwYW5uaW5nIGlmIHpvb21lZCBpbiBvciBkb2luZyBhIGhvcml6b250YWwgcGFuLlxuICAgICAgICAjIFRoaXMgZW5zdXJlcyB2ZXJ0aWNhbCBzY3JvbGxpbmcgd29ya3MgZm9yIHNjcm9sbGFibGUgcGFnZSBzcHJlYWRzLlxuICAgICAgICBpZiBAdHJhbnNmb3JtLnNjYWxlID4gMSBvciAoZS5kaXJlY3Rpb24gaXMgSGFtbWVyLkRJUkVDVElPTl9MRUZUIG9yIGUuZGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fUklHSFQpXG4gICAgICAgICAgICB4ID0gZS5jZW50ZXIueFxuICAgICAgICAgICAgZWRnZVRocmVzaG9sZCA9IDMwXG4gICAgICAgICAgICB3aWR0aCA9IEBzY3JvbGxlckVsLm9mZnNldFdpZHRoXG5cbiAgICAgICAgICAgICMgUHJldmVudCBwYW5uaW5nIHdoZW4gZWRnZS1zd2lwaW5nIG9uIGlPUy5cbiAgICAgICAgICAgIGlmIHggPiBlZGdlVGhyZXNob2xkIGFuZCB4IDwgd2lkdGggLSBlZGdlVGhyZXNob2xkXG4gICAgICAgICAgICAgICAgQHN0YXJ0VHJhbnNmb3JtLmxlZnQgPSBAdHJhbnNmb3JtLmxlZnRcbiAgICAgICAgICAgICAgICBAc3RhcnRUcmFuc2Zvcm0udG9wID0gQHRyYW5zZm9ybS50b3BcblxuICAgICAgICAgICAgICAgIEBwYW5uaW5nID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgJ3BhblN0YXJ0J1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuTW92ZTogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGluY2hpbmcgaXMgdHJ1ZSBvciBAcGFubmluZyBpcyBmYWxzZVxuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgPiAxXG4gICAgICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICAgICAgY2Fyb3VzZWxPZmZzZXQgPSBhY3RpdmVQYWdlU3ByZWFkLmdldExlZnQoKVxuICAgICAgICAgICAgY2Fyb3VzZWxTY2FsZWRPZmZzZXQgPSBjYXJvdXNlbE9mZnNldCAqIEB0cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMgPSBAZ2V0UGFnZVNwcmVhZEJvdW5kcyBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgICAgICBzY2FsZSA9IEB0cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgICAgIHggPSBAc3RhcnRUcmFuc2Zvcm0ubGVmdCArIGNhcm91c2VsU2NhbGVkT2Zmc2V0ICsgZS5kZWx0YVggLyBAc2Nyb2xsZXJFbC5vZmZzZXRXaWR0aCAqIDEwMFxuICAgICAgICAgICAgeSA9IEBzdGFydFRyYW5zZm9ybS50b3AgKyBlLmRlbHRhWSAvIEBzY3JvbGxlckVsLm9mZnNldEhlaWdodCAqIDEwMFxuICAgICAgICAgICAgeCA9IEBjbGlwQ29vcmRpbmF0ZSB4LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy53aWR0aCwgcGFnZVNwcmVhZEJvdW5kcy5sZWZ0XG4gICAgICAgICAgICB5ID0gQGNsaXBDb29yZGluYXRlIHksIHNjYWxlLCBwYWdlU3ByZWFkQm91bmRzLmhlaWdodCwgcGFnZVNwcmVhZEJvdW5kcy50b3BcbiAgICAgICAgICAgIHggLT0gY2Fyb3VzZWxTY2FsZWRPZmZzZXRcblxuICAgICAgICAgICAgQHRyYW5zZm9ybS5sZWZ0ID0geFxuICAgICAgICAgICAgQHRyYW5zZm9ybS50b3AgPSB5XG5cbiAgICAgICAgICAgIEBhbmltYXRpb24uYW5pbWF0ZVxuICAgICAgICAgICAgICAgIHg6IFwiI3t4fSVcIlxuICAgICAgICAgICAgICAgIHk6IFwiI3t5fSVcIlxuICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZVxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcidcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgeCA9IEB0cmFuc2Zvcm0ubGVmdCArIGUuZGVsdGFYIC8gQHNjcm9sbGVyRWwub2Zmc2V0V2lkdGggKiAxMDBcblxuICAgICAgICAgICAgQGFuaW1hdGlvbi5hbmltYXRlXG4gICAgICAgICAgICAgICAgeDogXCIje3h9JVwiXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuRW5kOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIEBwYW5uaW5nIGlzIGZhbHNlXG5cbiAgICAgICAgQHBhbm5pbmcgPSBmYWxzZVxuICAgICAgICBAdHJpZ2dlciAncGFuRW5kJ1xuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgaXMgMSBhbmQgQHBpbmNoaW5nIGlzIGZhbHNlXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGUub3ZlcmFsbFZlbG9jaXR5WFxuXG4gICAgICAgICAgICBpZiBNYXRoLmFicyh2ZWxvY2l0eSkgPj0gQHN3aXBlVmVsb2NpdHlcbiAgICAgICAgICAgICAgICBpZiBNYXRoLmFicyhlLmRlbHRhWCkgPj0gQHN3aXBlVGhyZXNob2xkXG4gICAgICAgICAgICAgICAgICAgIGlmIGUub2Zmc2V0RGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fTEVGVFxuICAgICAgICAgICAgICAgICAgICAgICAgQG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogQG5hdmlnYXRpb25QYW5EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIGUub2Zmc2V0RGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fUklHSFRcbiAgICAgICAgICAgICAgICAgICAgICAgIEBwcmV2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEBuYXZpZ2F0aW9uUGFuRHVyYXRpb25cblxuICAgICAgICAgICAgaWYgcG9zaXRpb24gaXMgQGdldFBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICBAYW5pbWF0aW9uLmFuaW1hdGVcbiAgICAgICAgICAgICAgICAgICAgeDogXCIje0B0cmFuc2Zvcm0ubGVmdH0lXCJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEBuYXZpZ2F0aW9uUGFuRHVyYXRpb25cblxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgcG9zaXRpb246IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaW5jaFN0YXJ0OiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAZ2V0QWN0aXZlUGFnZVNwcmVhZCgpLmlzWm9vbWFibGUoKVxuXG4gICAgICAgIEBwaW5jaGluZyA9IHRydWVcbiAgICAgICAgQGVsLnNldEF0dHJpYnV0ZSAnZGF0YS1waW5jaGluZycsIHRydWVcbiAgICAgICAgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlID0gQHRyYW5zZm9ybS5zY2FsZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGluY2hNb3ZlOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIEBwaW5jaGluZyBpcyBmYWxzZVxuXG4gICAgICAgIEB6b29tVG9cbiAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgIHk6IGUuY2VudGVyLnlcbiAgICAgICAgICAgIHNjYWxlOiBAc3RhcnRUcmFuc2Zvcm0uc2NhbGUgKiBlLnNjYWxlXG4gICAgICAgICAgICBib3VuZHM6IGZhbHNlXG4gICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaW5jaEVuZDogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGluY2hpbmcgaXMgZmFsc2VcblxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICBtYXhab29tU2NhbGUgPSBhY3RpdmVQYWdlU3ByZWFkLmdldE1heFpvb21TY2FsZSgpXG4gICAgICAgIHNjYWxlID0gTWF0aC5tYXggMSwgTWF0aC5taW4oQHRyYW5zZm9ybS5zY2FsZSwgbWF4Wm9vbVNjYWxlKVxuICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgaWYgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlIGlzIDEgYW5kIHNjYWxlID4gMVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZEluJywgcG9zaXRpb246IHBvc2l0aW9uXG4gICAgICAgIGVsc2UgaWYgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlID4gMSBhbmQgc2NhbGUgaXMgMVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHBvc2l0aW9uOiBwb3NpdGlvblxuXG4gICAgICAgIEB6b29tVG9cbiAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgIHk6IGUuY2VudGVyLnlcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZVxuICAgICAgICAgICAgZHVyYXRpb246IEB6b29tRHVyYXRpb25cbiAgICAgICAgLCA9PlxuICAgICAgICAgICAgQHBpbmNoaW5nID0gZmFsc2VcbiAgICAgICAgICAgIEBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtcGluY2hpbmcnLCBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3ByZXNzZWQnLCBAZ2V0Q29vcmRpbmF0ZUluZm8oZS5jZW50ZXIueCwgZS5jZW50ZXIueSwgQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKSlcblxuICAgICAgICByZXR1cm5cblxuICAgIHNpbmdsZXRhcDogKGUpIC0+XG4gICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWQgPSBAZ2V0QWN0aXZlUGFnZVNwcmVhZCgpXG4gICAgICAgIGNvb3JkaW5hdGVJbmZvID0gQGdldENvb3JkaW5hdGVJbmZvIGUuY2VudGVyLngsIGUuY2VudGVyLnksIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgaXNEb3VibGVUYXAgPSBAdGFwLmNvdW50IGlzIDFcblxuICAgICAgICBjbGVhclRpbWVvdXQgQHRhcC50aW1lb3V0XG5cbiAgICAgICAgaWYgaXNEb3VibGVUYXBcbiAgICAgICAgICAgIEB0YXAuY291bnQgPSAwXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdkb3VibGVDbGlja2VkJywgY29vcmRpbmF0ZUluZm9cblxuICAgICAgICAgICAgaWYgYWN0aXZlUGFnZVNwcmVhZC5pc1pvb21hYmxlKClcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGUgPSBhY3RpdmVQYWdlU3ByZWFkLmdldE1heFpvb21TY2FsZSgpXG4gICAgICAgICAgICAgICAgem9vbWVkSW4gPSBAdHJhbnNmb3JtLnNjYWxlID4gMVxuICAgICAgICAgICAgICAgIHNjYWxlID0gaWYgem9vbWVkSW4gdGhlbiAxIGVsc2UgbWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICAgICAgem9vbUV2ZW50ID0gaWYgem9vbWVkSW4gdGhlbiAnem9vbWVkT3V0JyBlbHNlICd6b29tZWRJbidcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgICAgICAgICBAem9vbVRvXG4gICAgICAgICAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgICAgICAgICAgeTogZS5jZW50ZXIueVxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEB6b29tRHVyYXRpb25cbiAgICAgICAgICAgICAgICAsID0+XG4gICAgICAgICAgICAgICAgICAgIEB0cmlnZ2VyIHpvb21FdmVudCwgcG9zaXRpb246IHBvc2l0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXAuY291bnQrK1xuICAgICAgICAgICAgQHRhcC50aW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICAgIEB0YXAuY291bnQgPSAwXG5cbiAgICAgICAgICAgICAgICBAdHJpZ2dlciAnY2xpY2tlZCcsIGNvb3JkaW5hdGVJbmZvXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICwgQHRhcC5kZWxheVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgdG91Y2hTdGFydDogKGUpIC0+XG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBAZ2V0UG9zaXRpb24oKVxuICAgICAgICBpc1Njcm9sbGFibGUgPSBwYWdlU3ByZWFkLmlzU2Nyb2xsYWJsZSgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgaWYgaXNTY3JvbGxhYmxlXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXNpemU6IC0+XG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgPiAxXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG4gICAgICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuXG4gICAgICAgICAgICBAdHJhbnNmb3JtLmxlZnQgPSBAZ2V0TGVmdFRyYW5zZm9ybUZyb21QYWdlU3ByZWFkIHBvc2l0aW9uLCBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgICAgICBAdHJhbnNmb3JtLnRvcCA9IDBcbiAgICAgICAgICAgIEB0cmFuc2Zvcm0uc2NhbGUgPSAxXG5cbiAgICAgICAgICAgIEB6b29tVG9cbiAgICAgICAgICAgICAgICB4OiBAdHJhbnNmb3JtLmxlZnRcbiAgICAgICAgICAgICAgICB5OiBAdHJhbnNmb3JtLnRvcFxuICAgICAgICAgICAgICAgIHNjYWxlOiBAdHJhbnNmb3JtLnNjYWxlXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDBcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHBvc2l0aW9uOiBwb3NpdGlvblxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFZlcnNvXG5cbm1vZHVsZS5leHBvcnRzID0gVmVyc29cbiIsIi8qISBIYW1tZXIuSlMgLSB2Mi4wLjcgLSAyMDE2LTA0LTIyXG4gKiBodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNiBKb3JpayBUYW5nZWxkZXI7XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgKi9cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCBleHBvcnROYW1lLCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG52YXIgVkVORE9SX1BSRUZJWEVTID0gWycnLCAnd2Via2l0JywgJ01veicsICdNUycsICdtcycsICdvJ107XG52YXIgVEVTVF9FTEVNRU5UID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbnZhciBUWVBFX0ZVTkNUSU9OID0gJ2Z1bmN0aW9uJztcblxudmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbnZhciBhYnMgPSBNYXRoLmFicztcbnZhciBub3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBzZXQgYSB0aW1lb3V0IHdpdGggYSBnaXZlbiBzY29wZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gc2V0VGltZW91dENvbnRleHQoZm4sIHRpbWVvdXQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChiaW5kRm4oZm4sIGNvbnRleHQpLCB0aW1lb3V0KTtcbn1cblxuLyoqXG4gKiBpZiB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXksIHdlIHdhbnQgdG8gZXhlY3V0ZSB0aGUgZm4gb24gZWFjaCBlbnRyeVxuICogaWYgaXQgYWludCBhbiBhcnJheSB3ZSBkb24ndCB3YW50IHRvIGRvIGEgdGhpbmcuXG4gKiB0aGlzIGlzIHVzZWQgYnkgYWxsIHRoZSBtZXRob2RzIHRoYXQgYWNjZXB0IGEgc2luZ2xlIGFuZCBhcnJheSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7KnxBcnJheX0gYXJnXG4gKiBAcGFyYW0ge1N0cmluZ30gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dF1cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpbnZva2VBcnJheUFyZyhhcmcsIGZuLCBjb250ZXh0KSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuICAgICAgICBlYWNoKGFyZywgY29udGV4dFtmbl0sIGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIHdhbGsgb2JqZWN0cyBhbmQgYXJyYXlzXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRvclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoIW9iaikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG9iai5mb3JFYWNoKSB7XG4gICAgICAgIG9iai5mb3JFYWNoKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBvYmoubGVuZ3RoKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSBpbiBvYmopIHtcbiAgICAgICAgICAgIG9iai5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiB3cmFwIGEgbWV0aG9kIHdpdGggYSBkZXByZWNhdGlvbiB3YXJuaW5nIGFuZCBzdGFjayB0cmFjZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgdGhlIHN1cHBsaWVkIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gZGVwcmVjYXRlKG1ldGhvZCwgbmFtZSwgbWVzc2FnZSkge1xuICAgIHZhciBkZXByZWNhdGlvbk1lc3NhZ2UgPSAnREVQUkVDQVRFRCBNRVRIT0Q6ICcgKyBuYW1lICsgJ1xcbicgKyBtZXNzYWdlICsgJyBBVCBcXG4nO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoJ2dldC1zdGFjay10cmFjZScpO1xuICAgICAgICB2YXIgc3RhY2sgPSBlICYmIGUuc3RhY2sgPyBlLnN0YWNrLnJlcGxhY2UoL15bXlxcKF0rP1tcXG4kXS9nbSwgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxccythdFxccysvZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15PYmplY3QuPGFub255bW91cz5cXHMqXFwoL2dtLCAne2Fub255bW91c30oKUAnKSA6ICdVbmtub3duIFN0YWNrIFRyYWNlJztcblxuICAgICAgICB2YXIgbG9nID0gd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLndhcm4gfHwgd2luZG93LmNvbnNvbGUubG9nKTtcbiAgICAgICAgaWYgKGxvZykge1xuICAgICAgICAgICAgbG9nLmNhbGwod2luZG93LmNvbnNvbGUsIGRlcHJlY2F0aW9uTWVzc2FnZSwgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGV4dGVuZCBvYmplY3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgaW4gZGVzdCB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHRoZSBvbmVzIGluIHNyYy5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBvYmplY3RzX3RvX2Fzc2lnblxuICogQHJldHVybnMge09iamVjdH0gdGFyZ2V0XG4gKi9cbnZhciBhc3NpZ247XG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgICBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHBhcmFtIHtCb29sZWFufSBbbWVyZ2U9ZmFsc2VdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkZXN0XG4gKi9cbnZhciBleHRlbmQgPSBkZXByZWNhdGUoZnVuY3Rpb24gZXh0ZW5kKGRlc3QsIHNyYywgbWVyZ2UpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNyYyk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFtZXJnZSB8fCAobWVyZ2UgJiYgZGVzdFtrZXlzW2ldXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgZGVzdFtrZXlzW2ldXSA9IHNyY1trZXlzW2ldXTtcbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xufSwgJ2V4dGVuZCcsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogbWVyZ2UgdGhlIHZhbHVlcyBmcm9tIHNyYyBpbiB0aGUgZGVzdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyB0aGF0IGV4aXN0IGluIGRlc3Qgd2lsbCBub3QgYmUgb3ZlcndyaXR0ZW4gYnkgc3JjXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgbWVyZ2UgPSBkZXByZWNhdGUoZnVuY3Rpb24gbWVyZ2UoZGVzdCwgc3JjKSB7XG4gICAgcmV0dXJuIGV4dGVuZChkZXN0LCBzcmMsIHRydWUpO1xufSwgJ21lcmdlJywgJ1VzZSBgYXNzaWduYC4nKTtcblxuLyoqXG4gKiBzaW1wbGUgY2xhc3MgaW5oZXJpdGFuY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoaWxkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBiYXNlXG4gKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXNdXG4gKi9cbmZ1bmN0aW9uIGluaGVyaXQoY2hpbGQsIGJhc2UsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgYmFzZVAgPSBiYXNlLnByb3RvdHlwZSxcbiAgICAgICAgY2hpbGRQO1xuXG4gICAgY2hpbGRQID0gY2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlUCk7XG4gICAgY2hpbGRQLmNvbnN0cnVjdG9yID0gY2hpbGQ7XG4gICAgY2hpbGRQLl9zdXBlciA9IGJhc2VQO1xuXG4gICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXNzaWduKGNoaWxkUCwgcHJvcGVydGllcyk7XG4gICAgfVxufVxuXG4vKipcbiAqIHNpbXBsZSBmdW5jdGlvbiBiaW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gYmluZEZuKGZuLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5kRm4oKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogbGV0IGEgYm9vbGVhbiB2YWx1ZSBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBtdXN0IHJldHVybiBhIGJvb2xlYW5cbiAqIHRoaXMgZmlyc3QgaXRlbSBpbiBhcmdzIHdpbGwgYmUgdXNlZCBhcyB0aGUgY29udGV4dFxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSB2YWxcbiAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXVxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGJvb2xPckZuKHZhbCwgYXJncykge1xuICAgIGlmICh0eXBlb2YgdmFsID09IFRZUEVfRlVOQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIHZhbC5hcHBseShhcmdzID8gYXJnc1swXSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xufVxuXG4vKipcbiAqIHVzZSB0aGUgdmFsMiB3aGVuIHZhbDEgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0geyp9IHZhbDFcbiAqIEBwYXJhbSB7Kn0gdmFsMlxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGlmVW5kZWZpbmVkKHZhbDEsIHZhbDIpIHtcbiAgICByZXR1cm4gKHZhbDEgPT09IHVuZGVmaW5lZCkgPyB2YWwyIDogdmFsMTtcbn1cblxuLyoqXG4gKiBhZGRFdmVudExpc3RlbmVyIHdpdGggbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2VcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKHRhcmdldCwgdHlwZXMsIGhhbmRsZXIpIHtcbiAgICBlYWNoKHNwbGl0U3RyKHR5cGVzKSwgZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogcmVtb3ZlRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBub2RlIGlzIGluIHRoZSBnaXZlbiBwYXJlbnRcbiAqIEBtZXRob2QgaGFzUGFyZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGhhc1BhcmVudChub2RlLCBwYXJlbnQpIHtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBzbWFsbCBpbmRleE9mIHdyYXBwZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaW5kXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gZm91bmRcbiAqL1xuZnVuY3Rpb24gaW5TdHIoc3RyLCBmaW5kKSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKGZpbmQpID4gLTE7XG59XG5cbi8qKlxuICogc3BsaXQgc3RyaW5nIG9uIHdoaXRlc3BhY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtBcnJheX0gd29yZHNcbiAqL1xuZnVuY3Rpb24gc3BsaXRTdHIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci50cmltKCkuc3BsaXQoL1xccysvZyk7XG59XG5cbi8qKlxuICogZmluZCBpZiBhIGFycmF5IGNvbnRhaW5zIHRoZSBvYmplY3QgdXNpbmcgaW5kZXhPZiBvciBhIHNpbXBsZSBwb2x5RmlsbFxuICogQHBhcmFtIHtBcnJheX0gc3JjXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHBhcmFtIHtTdHJpbmd9IFtmaW5kQnlLZXldXG4gKiBAcmV0dXJuIHtCb29sZWFufE51bWJlcn0gZmFsc2Ugd2hlbiBub3QgZm91bmQsIG9yIHRoZSBpbmRleFxuICovXG5mdW5jdGlvbiBpbkFycmF5KHNyYywgZmluZCwgZmluZEJ5S2V5KSB7XG4gICAgaWYgKHNyYy5pbmRleE9mICYmICFmaW5kQnlLZXkpIHtcbiAgICAgICAgcmV0dXJuIHNyYy5pbmRleE9mKGZpbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoKGZpbmRCeUtleSAmJiBzcmNbaV1bZmluZEJ5S2V5XSA9PSBmaW5kKSB8fCAoIWZpbmRCeUtleSAmJiBzcmNbaV0gPT09IGZpbmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbn1cblxuLyoqXG4gKiBjb252ZXJ0IGFycmF5LWxpa2Ugb2JqZWN0cyB0byByZWFsIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvYmosIDApO1xufVxuXG4vKipcbiAqIHVuaXF1ZSBhcnJheSB3aXRoIG9iamVjdHMgYmFzZWQgb24gYSBrZXkgKGxpa2UgJ2lkJykgb3IganVzdCBieSB0aGUgYXJyYXkncyB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gc3JjIFt7aWQ6MX0se2lkOjJ9LHtpZDoxfV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBba2V5XVxuICogQHBhcmFtIHtCb29sZWFufSBbc29ydD1GYWxzZV1cbiAqIEByZXR1cm5zIHtBcnJheX0gW3tpZDoxfSx7aWQ6Mn1dXG4gKi9cbmZ1bmN0aW9uIHVuaXF1ZUFycmF5KHNyYywga2V5LCBzb3J0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFyIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBzcmMubGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWwgPSBrZXkgPyBzcmNbaV1ba2V5XSA6IHNyY1tpXTtcbiAgICAgICAgaWYgKGluQXJyYXkodmFsdWVzLCB2YWwpIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNyY1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVzW2ldID0gdmFsO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNvcnQoZnVuY3Rpb24gc29ydFVuaXF1ZUFycmF5KGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYVtrZXldID4gYltrZXldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cblxuLyoqXG4gKiBnZXQgdGhlIHByZWZpeGVkIHByb3BlcnR5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBwcmVmaXhlZFxuICovXG5mdW5jdGlvbiBwcmVmaXhlZChvYmosIHByb3BlcnR5KSB7XG4gICAgdmFyIHByZWZpeCwgcHJvcDtcbiAgICB2YXIgY2FtZWxQcm9wID0gcHJvcGVydHlbMF0udG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgVkVORE9SX1BSRUZJWEVTLmxlbmd0aCkge1xuICAgICAgICBwcmVmaXggPSBWRU5ET1JfUFJFRklYRVNbaV07XG4gICAgICAgIHByb3AgPSAocHJlZml4KSA/IHByZWZpeCArIGNhbWVsUHJvcCA6IHByb3BlcnR5O1xuXG4gICAgICAgIGlmIChwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIHByb3A7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIGdldCBhIHVuaXF1ZSBpZFxuICogQHJldHVybnMge251bWJlcn0gdW5pcXVlSWRcbiAqL1xudmFyIF91bmlxdWVJZCA9IDE7XG5mdW5jdGlvbiB1bmlxdWVJZCgpIHtcbiAgICByZXR1cm4gX3VuaXF1ZUlkKys7XG59XG5cbi8qKlxuICogZ2V0IHRoZSB3aW5kb3cgb2JqZWN0IG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtEb2N1bWVudFZpZXd8V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3dGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB2YXIgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGVsZW1lbnQ7XG4gICAgcmV0dXJuIChkb2MuZGVmYXVsdFZpZXcgfHwgZG9jLnBhcmVudFdpbmRvdyB8fCB3aW5kb3cpO1xufVxuXG52YXIgTU9CSUxFX1JFR0VYID0gL21vYmlsZXx0YWJsZXR8aXAoYWR8aG9uZXxvZCl8YW5kcm9pZC9pO1xuXG52YXIgU1VQUE9SVF9UT1VDSCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xudmFyIFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMgPSBwcmVmaXhlZCh3aW5kb3csICdQb2ludGVyRXZlbnQnKSAhPT0gdW5kZWZpbmVkO1xudmFyIFNVUFBPUlRfT05MWV9UT1VDSCA9IFNVUFBPUlRfVE9VQ0ggJiYgTU9CSUxFX1JFR0VYLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbnZhciBJTlBVVF9UWVBFX1RPVUNIID0gJ3RvdWNoJztcbnZhciBJTlBVVF9UWVBFX1BFTiA9ICdwZW4nO1xudmFyIElOUFVUX1RZUEVfTU9VU0UgPSAnbW91c2UnO1xudmFyIElOUFVUX1RZUEVfS0lORUNUID0gJ2tpbmVjdCc7XG5cbnZhciBDT01QVVRFX0lOVEVSVkFMID0gMjU7XG5cbnZhciBJTlBVVF9TVEFSVCA9IDE7XG52YXIgSU5QVVRfTU9WRSA9IDI7XG52YXIgSU5QVVRfRU5EID0gNDtcbnZhciBJTlBVVF9DQU5DRUwgPSA4O1xuXG52YXIgRElSRUNUSU9OX05PTkUgPSAxO1xudmFyIERJUkVDVElPTl9MRUZUID0gMjtcbnZhciBESVJFQ1RJT05fUklHSFQgPSA0O1xudmFyIERJUkVDVElPTl9VUCA9IDg7XG52YXIgRElSRUNUSU9OX0RPV04gPSAxNjtcblxudmFyIERJUkVDVElPTl9IT1JJWk9OVEFMID0gRElSRUNUSU9OX0xFRlQgfCBESVJFQ1RJT05fUklHSFQ7XG52YXIgRElSRUNUSU9OX1ZFUlRJQ0FMID0gRElSRUNUSU9OX1VQIHwgRElSRUNUSU9OX0RPV047XG52YXIgRElSRUNUSU9OX0FMTCA9IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMO1xuXG52YXIgUFJPUFNfWFkgPSBbJ3gnLCAneSddO1xudmFyIFBST1BTX0NMSUVOVF9YWSA9IFsnY2xpZW50WCcsICdjbGllbnRZJ107XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBJbnB1dChtYW5hZ2VyLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLmVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgdGhpcy50YXJnZXQgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRUYXJnZXQ7XG5cbiAgICAvLyBzbWFsbGVyIHdyYXBwZXIgYXJvdW5kIHRoZSBoYW5kbGVyLCBmb3IgdGhlIHNjb3BlIGFuZCB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgbWFuYWdlcixcbiAgICAvLyBzbyB3aGVuIGRpc2FibGVkIHRoZSBpbnB1dCBldmVudHMgYXJlIGNvbXBsZXRlbHkgYnlwYXNzZWQuXG4gICAgdGhpcy5kb21IYW5kbGVyID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaWYgKGJvb2xPckZuKG1hbmFnZXIub3B0aW9ucy5lbmFibGUsIFttYW5hZ2VyXSkpIHtcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlcihldik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbn1cblxuSW5wdXQucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNob3VsZCBoYW5kbGUgdGhlIGlucHV0RXZlbnQgZGF0YSBhbmQgdHJpZ2dlciB0aGUgY2FsbGJhY2tcbiAgICAgKiBAdmlydHVhbFxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiBhZGRFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiBhZGRFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCB0aGUgZXZlbnRzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZXZFbCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLmVsZW1lbnQsIHRoaXMuZXZFbCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldlRhcmdldCAmJiByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLnRhcmdldCwgdGhpcy5ldlRhcmdldCwgdGhpcy5kb21IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldldpbiAmJiByZW1vdmVFdmVudExpc3RlbmVycyhnZXRXaW5kb3dGb3JFbGVtZW50KHRoaXMuZWxlbWVudCksIHRoaXMuZXZXaW4sIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBjcmVhdGUgbmV3IGlucHV0IHR5cGUgbWFuYWdlclxuICogY2FsbGVkIGJ5IHRoZSBNYW5hZ2VyIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICogQHJldHVybnMge0lucHV0fVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dEluc3RhbmNlKG1hbmFnZXIpIHtcbiAgICB2YXIgVHlwZTtcbiAgICB2YXIgaW5wdXRDbGFzcyA9IG1hbmFnZXIub3B0aW9ucy5pbnB1dENsYXNzO1xuXG4gICAgaWYgKGlucHV0Q2xhc3MpIHtcbiAgICAgICAgVHlwZSA9IGlucHV0Q2xhc3M7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICAgIFR5cGUgPSBQb2ludGVyRXZlbnRJbnB1dDtcbiAgICB9IGVsc2UgaWYgKFNVUFBPUlRfT05MWV9UT1VDSCkge1xuICAgICAgICBUeXBlID0gVG91Y2hJbnB1dDtcbiAgICB9IGVsc2UgaWYgKCFTVVBQT1JUX1RPVUNIKSB7XG4gICAgICAgIFR5cGUgPSBNb3VzZUlucHV0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFR5cGUgPSBUb3VjaE1vdXNlSW5wdXQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgKFR5cGUpKG1hbmFnZXIsIGlucHV0SGFuZGxlcik7XG59XG5cbi8qKlxuICogaGFuZGxlIGlucHV0IGV2ZW50c1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gaW5wdXRIYW5kbGVyKG1hbmFnZXIsIGV2ZW50VHlwZSwgaW5wdXQpIHtcbiAgICB2YXIgcG9pbnRlcnNMZW4gPSBpbnB1dC5wb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGNoYW5nZWRQb2ludGVyc0xlbiA9IGlucHV0LmNoYW5nZWRQb2ludGVycy5sZW5ndGg7XG4gICAgdmFyIGlzRmlyc3QgPSAoZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG4gICAgdmFyIGlzRmluYWwgPSAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgKHBvaW50ZXJzTGVuIC0gY2hhbmdlZFBvaW50ZXJzTGVuID09PSAwKSk7XG5cbiAgICBpbnB1dC5pc0ZpcnN0ID0gISFpc0ZpcnN0O1xuICAgIGlucHV0LmlzRmluYWwgPSAhIWlzRmluYWw7XG5cbiAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICBtYW5hZ2VyLnNlc3Npb24gPSB7fTtcbiAgICB9XG5cbiAgICAvLyBzb3VyY2UgZXZlbnQgaXMgdGhlIG5vcm1hbGl6ZWQgdmFsdWUgb2YgdGhlIGRvbUV2ZW50c1xuICAgIC8vIGxpa2UgJ3RvdWNoc3RhcnQsIG1vdXNldXAsIHBvaW50ZXJkb3duJ1xuICAgIGlucHV0LmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcblxuICAgIC8vIGNvbXB1dGUgc2NhbGUsIHJvdGF0aW9uIGV0Y1xuICAgIGNvbXB1dGVJbnB1dERhdGEobWFuYWdlciwgaW5wdXQpO1xuXG4gICAgLy8gZW1pdCBzZWNyZXQgZXZlbnRcbiAgICBtYW5hZ2VyLmVtaXQoJ2hhbW1lci5pbnB1dCcsIGlucHV0KTtcblxuICAgIG1hbmFnZXIucmVjb2duaXplKGlucHV0KTtcbiAgICBtYW5hZ2VyLnNlc3Npb24ucHJldklucHV0ID0gaW5wdXQ7XG59XG5cbi8qKlxuICogZXh0ZW5kIHRoZSBkYXRhIHdpdGggc29tZSB1c2FibGUgcHJvcGVydGllcyBsaWtlIHNjYWxlLCByb3RhdGUsIHZlbG9jaXR5IGV0Y1xuICogQHBhcmFtIHtPYmplY3R9IG1hbmFnZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICovXG5mdW5jdGlvbiBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KSB7XG4gICAgdmFyIHNlc3Npb24gPSBtYW5hZ2VyLnNlc3Npb247XG4gICAgdmFyIHBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnM7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gc3RvcmUgdGhlIGZpcnN0IGlucHV0IHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgYW5kIGRpcmVjdGlvblxuICAgIGlmICghc2Vzc2lvbi5maXJzdElucHV0KSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RJbnB1dCA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9XG5cbiAgICAvLyB0byBjb21wdXRlIHNjYWxlIGFuZCByb3RhdGlvbiB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBtdWx0aXBsZSB0b3VjaGVzXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID4gMSAmJiAhc2Vzc2lvbi5maXJzdE11bHRpcGxlKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHNlc3Npb24uZmlyc3RNdWx0aXBsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaXJzdElucHV0ID0gc2Vzc2lvbi5maXJzdElucHV0O1xuICAgIHZhciBmaXJzdE11bHRpcGxlID0gc2Vzc2lvbi5maXJzdE11bHRpcGxlO1xuICAgIHZhciBvZmZzZXRDZW50ZXIgPSBmaXJzdE11bHRpcGxlID8gZmlyc3RNdWx0aXBsZS5jZW50ZXIgOiBmaXJzdElucHV0LmNlbnRlcjtcblxuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXIgPSBnZXRDZW50ZXIocG9pbnRlcnMpO1xuICAgIGlucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgIGlucHV0LmRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGZpcnN0SW5wdXQudGltZVN0YW1wO1xuXG4gICAgaW5wdXQuYW5nbGUgPSBnZXRBbmdsZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG4gICAgaW5wdXQuZGlzdGFuY2UgPSBnZXREaXN0YW5jZShvZmZzZXRDZW50ZXIsIGNlbnRlcik7XG5cbiAgICBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCk7XG4gICAgaW5wdXQub2Zmc2V0RGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcblxuICAgIHZhciBvdmVyYWxsVmVsb2NpdHkgPSBnZXRWZWxvY2l0eShpbnB1dC5kZWx0YVRpbWUsIGlucHV0LmRlbHRhWCwgaW5wdXQuZGVsdGFZKTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHlYID0gb3ZlcmFsbFZlbG9jaXR5Lng7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WSA9IG92ZXJhbGxWZWxvY2l0eS55O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eSA9IChhYnMob3ZlcmFsbFZlbG9jaXR5LngpID4gYWJzKG92ZXJhbGxWZWxvY2l0eS55KSkgPyBvdmVyYWxsVmVsb2NpdHkueCA6IG92ZXJhbGxWZWxvY2l0eS55O1xuXG4gICAgaW5wdXQuc2NhbGUgPSBmaXJzdE11bHRpcGxlID8gZ2V0U2NhbGUoZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMTtcbiAgICBpbnB1dC5yb3RhdGlvbiA9IGZpcnN0TXVsdGlwbGUgPyBnZXRSb3RhdGlvbihmaXJzdE11bHRpcGxlLnBvaW50ZXJzLCBwb2ludGVycykgOiAwO1xuXG4gICAgaW5wdXQubWF4UG9pbnRlcnMgPSAhc2Vzc2lvbi5wcmV2SW5wdXQgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiAoKGlucHV0LnBvaW50ZXJzLmxlbmd0aCA+XG4gICAgICAgIHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKSA/IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA6IHNlc3Npb24ucHJldklucHV0Lm1heFBvaW50ZXJzKTtcblxuICAgIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCk7XG5cbiAgICAvLyBmaW5kIHRoZSBjb3JyZWN0IHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKGhhc1BhcmVudChpbnB1dC5zcmNFdmVudC50YXJnZXQsIHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0gaW5wdXQuc3JjRXZlbnQudGFyZ2V0O1xuICAgIH1cbiAgICBpbnB1dC50YXJnZXQgPSB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVEZWx0YVhZKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGNlbnRlciA9IGlucHV0LmNlbnRlcjtcbiAgICB2YXIgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSB8fCB7fTtcbiAgICB2YXIgcHJldkRlbHRhID0gc2Vzc2lvbi5wcmV2RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZJbnB1dCA9IHNlc3Npb24ucHJldklucHV0IHx8IHt9O1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfU1RBUlQgfHwgcHJldklucHV0LmV2ZW50VHlwZSA9PT0gSU5QVVRfRU5EKSB7XG4gICAgICAgIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhID0ge1xuICAgICAgICAgICAgeDogcHJldklucHV0LmRlbHRhWCB8fCAwLFxuICAgICAgICAgICAgeTogcHJldklucHV0LmRlbHRhWSB8fCAwXG4gICAgICAgIH07XG5cbiAgICAgICAgb2Zmc2V0ID0gc2Vzc2lvbi5vZmZzZXREZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IGNlbnRlci54LFxuICAgICAgICAgICAgeTogY2VudGVyLnlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpbnB1dC5kZWx0YVggPSBwcmV2RGVsdGEueCArIChjZW50ZXIueCAtIG9mZnNldC54KTtcbiAgICBpbnB1dC5kZWx0YVkgPSBwcmV2RGVsdGEueSArIChjZW50ZXIueSAtIG9mZnNldC55KTtcbn1cblxuLyoqXG4gKiB2ZWxvY2l0eSBpcyBjYWxjdWxhdGVkIGV2ZXJ5IHggbXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXNzaW9uXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUludGVydmFsSW5wdXREYXRhKHNlc3Npb24sIGlucHV0KSB7XG4gICAgdmFyIGxhc3QgPSBzZXNzaW9uLmxhc3RJbnRlcnZhbCB8fCBpbnB1dCxcbiAgICAgICAgZGVsdGFUaW1lID0gaW5wdXQudGltZVN0YW1wIC0gbGFzdC50aW1lU3RhbXAsXG4gICAgICAgIHZlbG9jaXR5LCB2ZWxvY2l0eVgsIHZlbG9jaXR5WSwgZGlyZWN0aW9uO1xuXG4gICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9DQU5DRUwgJiYgKGRlbHRhVGltZSA+IENPTVBVVEVfSU5URVJWQUwgfHwgbGFzdC52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICB2YXIgZGVsdGFYID0gaW5wdXQuZGVsdGFYIC0gbGFzdC5kZWx0YVg7XG4gICAgICAgIHZhciBkZWx0YVkgPSBpbnB1dC5kZWx0YVkgLSBsYXN0LmRlbHRhWTtcblxuICAgICAgICB2YXIgdiA9IGdldFZlbG9jaXR5KGRlbHRhVGltZSwgZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgICB2ZWxvY2l0eVggPSB2Lng7XG4gICAgICAgIHZlbG9jaXR5WSA9IHYueTtcbiAgICAgICAgdmVsb2NpdHkgPSAoYWJzKHYueCkgPiBhYnModi55KSkgPyB2LnggOiB2Lnk7XG4gICAgICAgIGRpcmVjdGlvbiA9IGdldERpcmVjdGlvbihkZWx0YVgsIGRlbHRhWSk7XG5cbiAgICAgICAgc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgPSBpbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1c2UgbGF0ZXN0IHZlbG9jaXR5IGluZm8gaWYgaXQgZG9lc24ndCBvdmVydGFrZSBhIG1pbmltdW0gcGVyaW9kXG4gICAgICAgIHZlbG9jaXR5ID0gbGFzdC52ZWxvY2l0eTtcbiAgICAgICAgdmVsb2NpdHlYID0gbGFzdC52ZWxvY2l0eVg7XG4gICAgICAgIHZlbG9jaXR5WSA9IGxhc3QudmVsb2NpdHlZO1xuICAgICAgICBkaXJlY3Rpb24gPSBsYXN0LmRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBpbnB1dC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIGlucHV0LnZlbG9jaXR5WCA9IHZlbG9jaXR5WDtcbiAgICBpbnB1dC52ZWxvY2l0eVkgPSB2ZWxvY2l0eVk7XG4gICAgaW5wdXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBhIHNpbXBsZSBjbG9uZSBmcm9tIHRoZSBpbnB1dCB1c2VkIGZvciBzdG9yYWdlIG9mIGZpcnN0SW5wdXQgYW5kIGZpcnN0TXVsdGlwbGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICogQHJldHVybnMge09iamVjdH0gY2xvbmVkSW5wdXREYXRhXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUNsb25lSW5wdXREYXRhKGlucHV0KSB7XG4gICAgLy8gbWFrZSBhIHNpbXBsZSBjb3B5IG9mIHRoZSBwb2ludGVycyBiZWNhdXNlIHdlIHdpbGwgZ2V0IGEgcmVmZXJlbmNlIGlmIHdlIGRvbid0XG4gICAgLy8gd2Ugb25seSBuZWVkIGNsaWVudFhZIGZvciB0aGUgY2FsY3VsYXRpb25zXG4gICAgdmFyIHBvaW50ZXJzID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgaW5wdXQucG9pbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBvaW50ZXJzW2ldID0ge1xuICAgICAgICAgICAgY2xpZW50WDogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WCksXG4gICAgICAgICAgICBjbGllbnRZOiByb3VuZChpbnB1dC5wb2ludGVyc1tpXS5jbGllbnRZKVxuICAgICAgICB9O1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGltZVN0YW1wOiBub3coKSxcbiAgICAgICAgcG9pbnRlcnM6IHBvaW50ZXJzLFxuICAgICAgICBjZW50ZXI6IGdldENlbnRlcihwb2ludGVycyksXG4gICAgICAgIGRlbHRhWDogaW5wdXQuZGVsdGFYLFxuICAgICAgICBkZWx0YVk6IGlucHV0LmRlbHRhWVxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBjZW50ZXIgb2YgYWxsIHRoZSBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gcG9pbnRlcnNcbiAqIEByZXR1cm4ge09iamVjdH0gY2VudGVyIGNvbnRhaW5zIGB4YCBhbmQgYHlgIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKHBvaW50ZXJzKSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuZ3RoID0gcG9pbnRlcnMubGVuZ3RoO1xuXG4gICAgLy8gbm8gbmVlZCB0byBsb29wIHdoZW4gb25seSBvbmUgdG91Y2hcbiAgICBpZiAocG9pbnRlcnNMZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFgpLFxuICAgICAgICAgICAgeTogcm91bmQocG9pbnRlcnNbMF0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgeCA9IDAsIHkgPSAwLCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHBvaW50ZXJzTGVuZ3RoKSB7XG4gICAgICAgIHggKz0gcG9pbnRlcnNbaV0uY2xpZW50WDtcbiAgICAgICAgeSArPSBwb2ludGVyc1tpXS5jbGllbnRZO1xuICAgICAgICBpKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogcm91bmQoeCAvIHBvaW50ZXJzTGVuZ3RoKSxcbiAgICAgICAgeTogcm91bmQoeSAvIHBvaW50ZXJzTGVuZ3RoKVxuICAgIH07XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSB2ZWxvY2l0eSBiZXR3ZWVuIHR3byBwb2ludHMuIHVuaXQgaXMgaW4gcHggcGVyIG1zLlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhVGltZVxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcmV0dXJuIHtPYmplY3R9IHZlbG9jaXR5IGB4YCBhbmQgYHlgXG4gKi9cbmZ1bmN0aW9uIGdldFZlbG9jaXR5KGRlbHRhVGltZSwgeCwgeSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHggLyBkZWx0YVRpbWUgfHwgMCxcbiAgICAgICAgeTogeSAvIGRlbHRhVGltZSB8fCAwXG4gICAgfTtcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGRpcmVjdGlvbiBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7TnVtYmVyfSBkaXJlY3Rpb25cbiAqL1xuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKHgsIHkpIHtcbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgICByZXR1cm4gRElSRUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgaWYgKGFicyh4KSA+PSBhYnMoeSkpIHtcbiAgICAgICAgcmV0dXJuIHggPCAwID8gRElSRUNUSU9OX0xFRlQgOiBESVJFQ1RJT05fUklHSFQ7XG4gICAgfVxuICAgIHJldHVybiB5IDwgMCA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYWJzb2x1dGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge09iamVjdH0gcDEge3gsIHl9XG4gKiBAcGFyYW0ge09iamVjdH0gcDIge3gsIHl9XG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGRpc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuXG4gICAgcmV0dXJuIE1hdGguc3FydCgoeCAqIHgpICsgKHkgKiB5KSk7XG59XG5cbi8qKlxuICogY2FsY3VsYXRlIHRoZSBhbmdsZSBiZXR3ZWVuIHR3byBjb29yZGluYXRlc1xuICogQHBhcmFtIHtPYmplY3R9IHAxXG4gKiBAcGFyYW0ge09iamVjdH0gcDJcbiAqIEBwYXJhbSB7QXJyYXl9IFtwcm9wc10gY29udGFpbmluZyB4IGFuZCB5IGtleXNcbiAqIEByZXR1cm4ge051bWJlcn0gYW5nbGVcbiAqL1xuZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyLCBwcm9wcykge1xuICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgcHJvcHMgPSBQUk9QU19YWTtcbiAgICB9XG4gICAgdmFyIHggPSBwMltwcm9wc1swXV0gLSBwMVtwcm9wc1swXV0sXG4gICAgICAgIHkgPSBwMltwcm9wc1sxXV0gLSBwMVtwcm9wc1sxXV07XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCkgKiAxODAgLyBNYXRoLlBJO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgcm90YXRpb24gZGVncmVlcyBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogQHBhcmFtIHtBcnJheX0gc3RhcnQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGVuZCBhcnJheSBvZiBwb2ludGVyc1xuICogQHJldHVybiB7TnVtYmVyfSByb3RhdGlvblxuICovXG5mdW5jdGlvbiBnZXRSb3RhdGlvbihzdGFydCwgZW5kKSB7XG4gICAgcmV0dXJuIGdldEFuZ2xlKGVuZFsxXSwgZW5kWzBdLCBQUk9QU19DTElFTlRfWFkpICsgZ2V0QW5nbGUoc3RhcnRbMV0sIHN0YXJ0WzBdLCBQUk9QU19DTElFTlRfWFkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgc2NhbGUgZmFjdG9yIGJldHdlZW4gdHdvIHBvaW50ZXJzZXRzXG4gKiBubyBzY2FsZSBpcyAxLCBhbmQgZ29lcyBkb3duIHRvIDAgd2hlbiBwaW5jaGVkIHRvZ2V0aGVyLCBhbmQgYmlnZ2VyIHdoZW4gcGluY2hlZCBvdXRcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gc2NhbGVcbiAqL1xuZnVuY3Rpb24gZ2V0U2NhbGUoc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXREaXN0YW5jZShlbmRbMF0sIGVuZFsxXSwgUFJPUFNfQ0xJRU5UX1hZKSAvIGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxudmFyIE1PVVNFX0lOUFVUX01BUCA9IHtcbiAgICBtb3VzZWRvd246IElOUFVUX1NUQVJULFxuICAgIG1vdXNlbW92ZTogSU5QVVRfTU9WRSxcbiAgICBtb3VzZXVwOiBJTlBVVF9FTkRcbn07XG5cbnZhciBNT1VTRV9FTEVNRU5UX0VWRU5UUyA9ICdtb3VzZWRvd24nO1xudmFyIE1PVVNFX1dJTkRPV19FVkVOVFMgPSAnbW91c2Vtb3ZlIG1vdXNldXAnO1xuXG4vKipcbiAqIE1vdXNlIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBNb3VzZUlucHV0KCkge1xuICAgIHRoaXMuZXZFbCA9IE1PVVNFX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBNT1VTRV9XSU5ET1dfRVZFTlRTO1xuXG4gICAgdGhpcy5wcmVzc2VkID0gZmFsc2U7IC8vIG1vdXNlZG93biBzdGF0ZVxuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChNb3VzZUlucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IE1PVVNFX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBvbiBzdGFydCB3ZSB3YW50IHRvIGhhdmUgdGhlIGxlZnQgbW91c2UgYnV0dG9uIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIGV2LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9NT1ZFICYmIGV2LndoaWNoICE9PSAxKSB7XG4gICAgICAgICAgICBldmVudFR5cGUgPSBJTlBVVF9FTkQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKCF0aGlzLnByZXNzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IFtldl0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxudmFyIFBPSU5URVJfSU5QVVRfTUFQID0ge1xuICAgIHBvaW50ZXJkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBwb2ludGVybW92ZTogSU5QVVRfTU9WRSxcbiAgICBwb2ludGVydXA6IElOUFVUX0VORCxcbiAgICBwb2ludGVyY2FuY2VsOiBJTlBVVF9DQU5DRUwsXG4gICAgcG9pbnRlcm91dDogSU5QVVRfQ0FOQ0VMXG59O1xuXG4vLyBpbiBJRTEwIHRoZSBwb2ludGVyIHR5cGVzIGlzIGRlZmluZWQgYXMgYW4gZW51bVxudmFyIElFMTBfUE9JTlRFUl9UWVBFX0VOVU0gPSB7XG4gICAgMjogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAzOiBJTlBVVF9UWVBFX1BFTixcbiAgICA0OiBJTlBVVF9UWVBFX01PVVNFLFxuICAgIDU6IElOUFVUX1RZUEVfS0lORUNUIC8vIHNlZSBodHRwczovL3R3aXR0ZXIuY29tL2phY29icm9zc2kvc3RhdHVzLzQ4MDU5NjQzODQ4OTg5MDgxNlxufTtcblxudmFyIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAncG9pbnRlcmRvd24nO1xudmFyIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdwb2ludGVybW92ZSBwb2ludGVydXAgcG9pbnRlcmNhbmNlbCc7XG5cbi8vIElFMTAgaGFzIHByZWZpeGVkIHN1cHBvcnQsIGFuZCBjYXNlLXNlbnNpdGl2ZVxuaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCAmJiAhd2luZG93LlBvaW50ZXJFdmVudCkge1xuICAgIFBPSU5URVJfRUxFTUVOVF9FVkVOVFMgPSAnTVNQb2ludGVyRG93bic7XG4gICAgUE9JTlRFUl9XSU5ET1dfRVZFTlRTID0gJ01TUG9pbnRlck1vdmUgTVNQb2ludGVyVXAgTVNQb2ludGVyQ2FuY2VsJztcbn1cblxuLyoqXG4gKiBQb2ludGVyIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBQb2ludGVyRXZlbnRJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTO1xuICAgIHRoaXMuZXZXaW4gPSBQT0lOVEVSX1dJTkRPV19FVkVOVFM7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5zdG9yZSA9ICh0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wb2ludGVyRXZlbnRzID0gW10pO1xufVxuXG5pbmhlcml0KFBvaW50ZXJFdmVudElucHV0LCBJbnB1dCwge1xuICAgIC8qKlxuICAgICAqIGhhbmRsZSBtb3VzZSBldmVudHNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBQRWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHN0b3JlID0gdGhpcy5zdG9yZTtcbiAgICAgICAgdmFyIHJlbW92ZVBvaW50ZXIgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZXZlbnRUeXBlTm9ybWFsaXplZCA9IGV2LnR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdtcycsICcnKTtcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IFBPSU5URVJfSU5QVVRfTUFQW2V2ZW50VHlwZU5vcm1hbGl6ZWRdO1xuICAgICAgICB2YXIgcG9pbnRlclR5cGUgPSBJRTEwX1BPSU5URVJfVFlQRV9FTlVNW2V2LnBvaW50ZXJUeXBlXSB8fCBldi5wb2ludGVyVHlwZTtcblxuICAgICAgICB2YXIgaXNUb3VjaCA9IChwb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKTtcblxuICAgICAgICAvLyBnZXQgaW5kZXggb2YgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICB2YXIgc3RvcmVJbmRleCA9IGluQXJyYXkoc3RvcmUsIGV2LnBvaW50ZXJJZCwgJ3BvaW50ZXJJZCcpO1xuXG4gICAgICAgIC8vIHN0YXJ0IGFuZCBtb3VzZSBtdXN0IGJlIGRvd25cbiAgICAgICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChldi5idXR0b24gPT09IDAgfHwgaXNUb3VjaCkpIHtcbiAgICAgICAgICAgIGlmIChzdG9yZUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnB1c2goZXYpO1xuICAgICAgICAgICAgICAgIHN0b3JlSW5kZXggPSBzdG9yZS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICByZW1vdmVQb2ludGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0IG5vdCBmb3VuZCwgc28gdGhlIHBvaW50ZXIgaGFzbid0IGJlZW4gZG93biAoc28gaXQncyBwcm9iYWJseSBhIGhvdmVyKVxuICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZXZlbnQgaW4gdGhlIHN0b3JlXG4gICAgICAgIHN0b3JlW3N0b3JlSW5kZXhdID0gZXY7XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHN0b3JlLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IHBvaW50ZXJUeXBlLFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZW1vdmVQb2ludGVyKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgZnJvbSB0aGUgc3RvcmVcbiAgICAgICAgICAgIHN0b3JlLnNwbGljZShzdG9yZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG52YXIgU0lOR0xFX1RPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCc7XG52YXIgU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIFRvdWNoIGV2ZW50cyBpbnB1dFxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5mdW5jdGlvbiBTaW5nbGVUb3VjaElucHV0KCkge1xuICAgIHRoaXMuZXZUYXJnZXQgPSBTSU5HTEVfVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gU0lOR0xFX1RPVUNIX1dJTkRPV19FVkVOVFM7XG4gICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICBJbnB1dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFNpbmdsZVRvdWNoSW5wdXQsIElucHV0LCB7XG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gU0lOR0xFX1RPVUNIX0lOUFVUX01BUFtldi50eXBlXTtcblxuICAgICAgICAvLyBzaG91bGQgd2UgaGFuZGxlIHRoZSB0b3VjaCBldmVudHM/XG4gICAgICAgIGlmICh0eXBlID09PSBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hlcyA9IG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG5cbiAgICAgICAgLy8gd2hlbiBkb25lLCByZXNldCB0aGUgc3RhcnRlZCBzdGF0ZVxuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIHRvdWNoZXNbMF0ubGVuZ3RoIC0gdG91Y2hlc1sxXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNpbmdsZVRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgY2hhbmdlZCA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpO1xuXG4gICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICBhbGwgPSB1bmlxdWVBcnJheShhbGwuY29uY2F0KGNoYW5nZWQpLCAnaWRlbnRpZmllcicsIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiBbYWxsLCBjaGFuZ2VkXTtcbn1cblxudmFyIFRPVUNIX0lOUFVUX01BUCA9IHtcbiAgICB0b3VjaHN0YXJ0OiBJTlBVVF9TVEFSVCxcbiAgICB0b3VjaG1vdmU6IElOUFVUX01PVkUsXG4gICAgdG91Y2hlbmQ6IElOUFVUX0VORCxcbiAgICB0b3VjaGNhbmNlbDogSU5QVVRfQ0FOQ0VMXG59O1xuXG52YXIgVE9VQ0hfVEFSR0VUX0VWRU5UUyA9ICd0b3VjaHN0YXJ0IHRvdWNobW92ZSB0b3VjaGVuZCB0b3VjaGNhbmNlbCc7XG5cbi8qKlxuICogTXVsdGktdXNlciB0b3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gVE9VQ0hfVEFSR0VUX0VWRU5UUztcbiAgICB0aGlzLnRhcmdldElkcyA9IHt9O1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIE1URWhhbmRsZXIoZXYpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBUT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG4gICAgICAgIHZhciB0b3VjaGVzID0gZ2V0VG91Y2hlcy5jYWxsKHRoaXMsIGV2LCB0eXBlKTtcbiAgICAgICAgaWYgKCF0b3VjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHRoaXMubWFuYWdlciwgdHlwZSwge1xuICAgICAgICAgICAgcG9pbnRlcnM6IHRvdWNoZXNbMF0sXG4gICAgICAgICAgICBjaGFuZ2VkUG9pbnRlcnM6IHRvdWNoZXNbMV0sXG4gICAgICAgICAgICBwb2ludGVyVHlwZTogSU5QVVRfVFlQRV9UT1VDSCxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAdGhpcyB7VG91Y2hJbnB1dH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBldlxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGUgZmxhZ1xuICogQHJldHVybnMge3VuZGVmaW5lZHxBcnJheX0gW2FsbCwgY2hhbmdlZF1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyhldiwgdHlwZSkge1xuICAgIHZhciBhbGxUb3VjaGVzID0gdG9BcnJheShldi50b3VjaGVzKTtcbiAgICB2YXIgdGFyZ2V0SWRzID0gdGhpcy50YXJnZXRJZHM7XG5cbiAgICAvLyB3aGVuIHRoZXJlIGlzIG9ubHkgb25lIHRvdWNoLCB0aGUgcHJvY2VzcyBjYW4gYmUgc2ltcGxpZmllZFxuICAgIGlmICh0eXBlICYgKElOUFVUX1NUQVJUIHwgSU5QVVRfTU9WRSkgJiYgYWxsVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGFyZ2V0SWRzW2FsbFRvdWNoZXNbMF0uaWRlbnRpZmllcl0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gW2FsbFRvdWNoZXMsIGFsbFRvdWNoZXNdO1xuICAgIH1cblxuICAgIHZhciBpLFxuICAgICAgICB0YXJnZXRUb3VjaGVzLFxuICAgICAgICBjaGFuZ2VkVG91Y2hlcyA9IHRvQXJyYXkoZXYuY2hhbmdlZFRvdWNoZXMpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcyA9IFtdLFxuICAgICAgICB0YXJnZXQgPSB0aGlzLnRhcmdldDtcblxuICAgIC8vIGdldCB0YXJnZXQgdG91Y2hlcyBmcm9tIHRvdWNoZXNcbiAgICB0YXJnZXRUb3VjaGVzID0gYWxsVG91Y2hlcy5maWx0ZXIoZnVuY3Rpb24odG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhcmVudCh0b3VjaC50YXJnZXQsIHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyBjb2xsZWN0IHRvdWNoZXNcbiAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRhcmdldElkc1t0YXJnZXRUb3VjaGVzW2ldLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBjaGFuZ2VkIHRvdWNoZXMgdG8gb25seSBjb250YWluIHRvdWNoZXMgdGhhdCBleGlzdCBpbiB0aGUgY29sbGVjdGVkIHRhcmdldCBpZHNcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAodGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdKSB7XG4gICAgICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlcy5wdXNoKGNoYW5nZWRUb3VjaGVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFudXAgcmVtb3ZlZCB0b3VjaGVzXG4gICAgICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRJZHNbY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmICghY2hhbmdlZFRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gW1xuICAgICAgICAvLyBtZXJnZSB0YXJnZXRUb3VjaGVzIHdpdGggY2hhbmdlZFRhcmdldFRvdWNoZXMgc28gaXQgY29udGFpbnMgQUxMIHRvdWNoZXMsIGluY2x1ZGluZyAnZW5kJyBhbmQgJ2NhbmNlbCdcbiAgICAgICAgdW5pcXVlQXJyYXkodGFyZ2V0VG91Y2hlcy5jb25jYXQoY2hhbmdlZFRhcmdldFRvdWNoZXMpLCAnaWRlbnRpZmllcicsIHRydWUpLFxuICAgICAgICBjaGFuZ2VkVGFyZ2V0VG91Y2hlc1xuICAgIF07XG59XG5cbi8qKlxuICogQ29tYmluZWQgdG91Y2ggYW5kIG1vdXNlIGlucHV0XG4gKlxuICogVG91Y2ggaGFzIGEgaGlnaGVyIHByaW9yaXR5IHRoZW4gbW91c2UsIGFuZCB3aGlsZSB0b3VjaGluZyBubyBtb3VzZSBldmVudHMgYXJlIGFsbG93ZWQuXG4gKiBUaGlzIGJlY2F1c2UgdG91Y2ggZGV2aWNlcyBhbHNvIGVtaXQgbW91c2UgZXZlbnRzIHdoaWxlIGRvaW5nIGEgdG91Y2guXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBJbnB1dFxuICovXG5cbnZhciBERURVUF9USU1FT1VUID0gMjUwMDtcbnZhciBERURVUF9ESVNUQU5DRSA9IDI1O1xuXG5mdW5jdGlvbiBUb3VjaE1vdXNlSW5wdXQoKSB7XG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBoYW5kbGVyID0gYmluZEZuKHRoaXMuaGFuZGxlciwgdGhpcyk7XG4gICAgdGhpcy50b3VjaCA9IG5ldyBUb3VjaElucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG4gICAgdGhpcy5tb3VzZSA9IG5ldyBNb3VzZUlucHV0KHRoaXMubWFuYWdlciwgaGFuZGxlcik7XG5cbiAgICB0aGlzLnByaW1hcnlUb3VjaCA9IG51bGw7XG4gICAgdGhpcy5sYXN0VG91Y2hlcyA9IFtdO1xufVxuXG5pbmhlcml0KFRvdWNoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgYW5kIHRvdWNoIGV2ZW50c1xuICAgICAqIEBwYXJhbSB7SGFtbWVyfSBtYW5hZ2VyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0RXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gVE1FaGFuZGxlcihtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIGlzVG91Y2ggPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfVE9VQ0gpLFxuICAgICAgICAgICAgaXNNb3VzZSA9IChpbnB1dERhdGEucG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9NT1VTRSk7XG5cbiAgICAgICAgaWYgKGlzTW91c2UgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcyAmJiBpbnB1dERhdGEuc291cmNlQ2FwYWJpbGl0aWVzLmZpcmVzVG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gd2UncmUgaW4gYSB0b3VjaCBldmVudCwgcmVjb3JkIHRvdWNoZXMgdG8gIGRlLWR1cGUgc3ludGhldGljIG1vdXNlIGV2ZW50XG4gICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICByZWNvcmRUb3VjaGVzLmNhbGwodGhpcywgaW5wdXRFdmVudCwgaW5wdXREYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc01vdXNlICYmIGlzU3ludGhldGljRXZlbnQuY2FsbCh0aGlzLCBpbnB1dERhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKG1hbmFnZXIsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50b3VjaC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMubW91c2UuZGVzdHJveSgpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiByZWNvcmRUb3VjaGVzKGV2ZW50VHlwZSwgZXZlbnREYXRhKSB7XG4gICAgaWYgKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgIHRoaXMucHJpbWFyeVRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXS5pZGVudGlmaWVyO1xuICAgICAgICBzZXRMYXN0VG91Y2guY2FsbCh0aGlzLCBldmVudERhdGEpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldExhc3RUb3VjaChldmVudERhdGEpIHtcbiAgICB2YXIgdG91Y2ggPSBldmVudERhdGEuY2hhbmdlZFBvaW50ZXJzWzBdO1xuXG4gICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMucHJpbWFyeVRvdWNoKSB7XG4gICAgICAgIHZhciBsYXN0VG91Y2ggPSB7eDogdG91Y2guY2xpZW50WCwgeTogdG91Y2guY2xpZW50WX07XG4gICAgICAgIHRoaXMubGFzdFRvdWNoZXMucHVzaChsYXN0VG91Y2gpO1xuICAgICAgICB2YXIgbHRzID0gdGhpcy5sYXN0VG91Y2hlcztcbiAgICAgICAgdmFyIHJlbW92ZUxhc3RUb3VjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBsdHMuaW5kZXhPZihsYXN0VG91Y2gpO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGx0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHNldFRpbWVvdXQocmVtb3ZlTGFzdFRvdWNoLCBERURVUF9USU1FT1VUKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzU3ludGhldGljRXZlbnQoZXZlbnREYXRhKSB7XG4gICAgdmFyIHggPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WCwgeSA9IGV2ZW50RGF0YS5zcmNFdmVudC5jbGllbnRZO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYXN0VG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdCA9IHRoaXMubGFzdFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHggLSB0LngpLCBkeSA9IE1hdGguYWJzKHkgLSB0LnkpO1xuICAgICAgICBpZiAoZHggPD0gREVEVVBfRElTVEFOQ0UgJiYgZHkgPD0gREVEVVBfRElTVEFOQ0UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIFBSRUZJWEVEX1RPVUNIX0FDVElPTiA9IHByZWZpeGVkKFRFU1RfRUxFTUVOVC5zdHlsZSwgJ3RvdWNoQWN0aW9uJyk7XG52YXIgTkFUSVZFX1RPVUNIX0FDVElPTiA9IFBSRUZJWEVEX1RPVUNIX0FDVElPTiAhPT0gdW5kZWZpbmVkO1xuXG4vLyBtYWdpY2FsIHRvdWNoQWN0aW9uIHZhbHVlXG52YXIgVE9VQ0hfQUNUSU9OX0NPTVBVVEUgPSAnY29tcHV0ZSc7XG52YXIgVE9VQ0hfQUNUSU9OX0FVVE8gPSAnYXV0byc7XG52YXIgVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTiA9ICdtYW5pcHVsYXRpb24nOyAvLyBub3QgaW1wbGVtZW50ZWRcbnZhciBUT1VDSF9BQ1RJT05fTk9ORSA9ICdub25lJztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1ggPSAncGFuLXgnO1xudmFyIFRPVUNIX0FDVElPTl9QQU5fWSA9ICdwYW4teSc7XG52YXIgVE9VQ0hfQUNUSU9OX01BUCA9IGdldFRvdWNoQWN0aW9uUHJvcHMoKTtcblxuLyoqXG4gKiBUb3VjaCBBY3Rpb25cbiAqIHNldHMgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5IG9yIHVzZXMgdGhlIGpzIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFRvdWNoQWN0aW9uKG1hbmFnZXIsIHZhbHVlKSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLnNldCh2YWx1ZSk7XG59XG5cblRvdWNoQWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHRvdWNoQWN0aW9uIHZhbHVlIG9uIHRoZSBlbGVtZW50IG9yIGVuYWJsZSB0aGUgcG9seWZpbGxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIC8vIGZpbmQgb3V0IHRoZSB0b3VjaC1hY3Rpb24gYnkgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgIGlmICh2YWx1ZSA9PSBUT1VDSF9BQ1RJT05fQ09NUFVURSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvbXB1dGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOQVRJVkVfVE9VQ0hfQUNUSU9OICYmIHRoaXMubWFuYWdlci5lbGVtZW50LnN0eWxlICYmIFRPVUNIX0FDVElPTl9NQVBbdmFsdWVdKSB7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZVtQUkVGSVhFRF9UT1VDSF9BQ1RJT05dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3Rpb25zID0gdmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGp1c3QgcmUtc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMubWFuYWdlci5vcHRpb25zLnRvdWNoQWN0aW9uKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY29tcHV0ZSB0aGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgcmVjb2duaXplcidzIHNldHRpbmdzXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBjb21wdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBbXTtcbiAgICAgICAgZWFjaCh0aGlzLm1hbmFnZXIucmVjb2duaXplcnMsIGZ1bmN0aW9uKHJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIGlmIChib29sT3JGbihyZWNvZ25pemVyLm9wdGlvbnMuZW5hYmxlLCBbcmVjb2duaXplcl0pKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IGFjdGlvbnMuY29uY2F0KHJlY29nbml6ZXIuZ2V0VG91Y2hBY3Rpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucy5qb2luKCcgJykpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQgb24gZWFjaCBpbnB1dCBjeWNsZSBhbmQgcHJvdmlkZXMgdGhlIHByZXZlbnRpbmcgb2YgdGhlIGJyb3dzZXIgYmVoYXZpb3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBwcmV2ZW50RGVmYXVsdHM6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzcmNFdmVudCA9IGlucHV0LnNyY0V2ZW50O1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5wdXQub2Zmc2V0RGlyZWN0aW9uO1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b3VjaCBhY3Rpb24gZGlkIHByZXZlbnRlZCBvbmNlIHRoaXMgc2Vzc2lvblxuICAgICAgICBpZiAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucHJldmVudGVkKSB7XG4gICAgICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIHZhciBoYXNOb25lID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9OT05FXTtcbiAgICAgICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpICYmICFUT1VDSF9BQ1RJT05fTUFQW1RPVUNIX0FDVElPTl9QQU5fWV07XG4gICAgICAgIHZhciBoYXNQYW5YID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9YKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1hdO1xuXG4gICAgICAgIGlmIChoYXNOb25lKSB7XG4gICAgICAgICAgICAvL2RvIG5vdCBwcmV2ZW50IGRlZmF1bHRzIGlmIHRoaXMgaXMgYSB0YXAgZ2VzdHVyZVxuXG4gICAgICAgICAgICB2YXIgaXNUYXBQb2ludGVyID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSAxO1xuICAgICAgICAgICAgdmFyIGlzVGFwTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IDI7XG4gICAgICAgICAgICB2YXIgaXNUYXBUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCAyNTA7XG5cbiAgICAgICAgICAgIGlmIChpc1RhcFBvaW50ZXIgJiYgaXNUYXBNb3ZlbWVudCAmJiBpc1RhcFRvdWNoVGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNQYW5YICYmIGhhc1BhblkpIHtcbiAgICAgICAgICAgIC8vIGBwYW4teCBwYW4teWAgbWVhbnMgYnJvd3NlciBoYW5kbGVzIGFsbCBzY3JvbGxpbmcvcGFubmluZywgZG8gbm90IHByZXZlbnRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNOb25lIHx8XG4gICAgICAgICAgICAoaGFzUGFuWSAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkgfHxcbiAgICAgICAgICAgIChoYXNQYW5YICYmIGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZlbnRTcmMoc3JjRXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGwgcHJldmVudERlZmF1bHQgdG8gcHJldmVudCB0aGUgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3IgKHNjcm9sbGluZyBpbiBtb3N0IGNhc2VzKVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcmNFdmVudFxuICAgICAqL1xuICAgIHByZXZlbnRTcmM6IGZ1bmN0aW9uKHNyY0V2ZW50KSB7XG4gICAgICAgIHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIHNyY0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiB3aGVuIHRoZSB0b3VjaEFjdGlvbnMgYXJlIGNvbGxlY3RlZCB0aGV5IGFyZSBub3QgYSB2YWxpZCB2YWx1ZSwgc28gd2UgbmVlZCB0byBjbGVhbiB0aGluZ3MgdXAuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gY2xlYW5Ub3VjaEFjdGlvbnMoYWN0aW9ucykge1xuICAgIC8vIG5vbmVcbiAgICBpZiAoaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX05PTkUpKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgdmFyIGhhc1BhblkgPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1kpO1xuXG4gICAgLy8gaWYgYm90aCBwYW4teCBhbmQgcGFuLXkgYXJlIHNldCAoZGlmZmVyZW50IHJlY29nbml6ZXJzXG4gICAgLy8gZm9yIGRpZmZlcmVudCBkaXJlY3Rpb25zLCBlLmcuIGhvcml6b250YWwgcGFuIGJ1dCB2ZXJ0aWNhbCBzd2lwZT8pXG4gICAgLy8gd2UgbmVlZCBub25lIChhcyBvdGhlcndpc2Ugd2l0aCBwYW4teCBwYW4teSBjb21iaW5lZCBub25lIG9mIHRoZXNlXG4gICAgLy8gcmVjb2duaXplcnMgd2lsbCB3b3JrLCBzaW5jZSB0aGUgYnJvd3NlciB3b3VsZCBoYW5kbGUgYWxsIHBhbm5pbmdcbiAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTk9ORTtcbiAgICB9XG5cbiAgICAvLyBwYW4teCBPUiBwYW4teVxuICAgIGlmIChoYXNQYW5YIHx8IGhhc1BhblkpIHtcbiAgICAgICAgcmV0dXJuIGhhc1BhblggPyBUT1VDSF9BQ1RJT05fUEFOX1ggOiBUT1VDSF9BQ1RJT05fUEFOX1k7XG4gICAgfVxuXG4gICAgLy8gbWFuaXB1bGF0aW9uXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04pKSB7XG4gICAgICAgIHJldHVybiBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OO1xuICAgIH1cblxuICAgIHJldHVybiBUT1VDSF9BQ1RJT05fQVVUTztcbn1cblxuZnVuY3Rpb24gZ2V0VG91Y2hBY3Rpb25Qcm9wcygpIHtcbiAgICBpZiAoIU5BVElWRV9UT1VDSF9BQ1RJT04pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdG91Y2hNYXAgPSB7fTtcbiAgICB2YXIgY3NzU3VwcG9ydHMgPSB3aW5kb3cuQ1NTICYmIHdpbmRvdy5DU1Muc3VwcG9ydHM7XG4gICAgWydhdXRvJywgJ21hbmlwdWxhdGlvbicsICdwYW4teScsICdwYW4teCcsICdwYW4teCBwYW4teScsICdub25lJ10uZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcblxuICAgICAgICAvLyBJZiBjc3Muc3VwcG9ydHMgaXMgbm90IHN1cHBvcnRlZCBidXQgdGhlcmUgaXMgbmF0aXZlIHRvdWNoLWFjdGlvbiBhc3N1bWUgaXQgc3VwcG9ydHNcbiAgICAgICAgLy8gYWxsIHZhbHVlcy4gVGhpcyBpcyB0aGUgY2FzZSBmb3IgSUUgMTAgYW5kIDExLlxuICAgICAgICB0b3VjaE1hcFt2YWxdID0gY3NzU3VwcG9ydHMgPyB3aW5kb3cuQ1NTLnN1cHBvcnRzKCd0b3VjaC1hY3Rpb24nLCB2YWwpIDogdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG91Y2hNYXA7XG59XG5cbi8qKlxuICogUmVjb2duaXplciBmbG93IGV4cGxhaW5lZDsgKlxuICogQWxsIHJlY29nbml6ZXJzIGhhdmUgdGhlIGluaXRpYWwgc3RhdGUgb2YgUE9TU0lCTEUgd2hlbiBhIGlucHV0IHNlc3Npb24gc3RhcnRzLlxuICogVGhlIGRlZmluaXRpb24gb2YgYSBpbnB1dCBzZXNzaW9uIGlzIGZyb20gdGhlIGZpcnN0IGlucHV0IHVudGlsIHRoZSBsYXN0IGlucHV0LCB3aXRoIGFsbCBpdCdzIG1vdmVtZW50IGluIGl0LiAqXG4gKiBFeGFtcGxlIHNlc3Npb24gZm9yIG1vdXNlLWlucHV0OiBtb3VzZWRvd24gLT4gbW91c2Vtb3ZlIC0+IG1vdXNldXBcbiAqXG4gKiBPbiBlYWNoIHJlY29nbml6aW5nIGN5Y2xlIChzZWUgTWFuYWdlci5yZWNvZ25pemUpIHRoZSAucmVjb2duaXplKCkgbWV0aG9kIGlzIGV4ZWN1dGVkXG4gKiB3aGljaCBkZXRlcm1pbmVzIHdpdGggc3RhdGUgaXQgc2hvdWxkIGJlLlxuICpcbiAqIElmIHRoZSByZWNvZ25pemVyIGhhcyB0aGUgc3RhdGUgRkFJTEVELCBDQU5DRUxMRUQgb3IgUkVDT0dOSVpFRCAoZXF1YWxzIEVOREVEKSwgaXQgaXMgcmVzZXQgdG9cbiAqIFBPU1NJQkxFIHRvIGdpdmUgaXQgYW5vdGhlciBjaGFuZ2Ugb24gdGhlIG5leHQgY3ljbGUuXG4gKlxuICogICAgICAgICAgICAgICBQb3NzaWJsZVxuICogICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICstLS0tLSstLS0tLS0tLS0tLS0tLS0rXG4gKiAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICstLS0tLSstLS0tLSsgICAgICAgICAgICAgICB8XG4gKiAgICAgIHwgICAgICAgICAgIHwgICAgICAgICAgICAgICB8XG4gKiAgIEZhaWxlZCAgICAgIENhbmNlbGxlZCAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0rLS0tLS0tK1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgIFJlY29nbml6ZWQgICAgICAgQmVnYW5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVuZGVkL1JlY29nbml6ZWRcbiAqL1xudmFyIFNUQVRFX1BPU1NJQkxFID0gMTtcbnZhciBTVEFURV9CRUdBTiA9IDI7XG52YXIgU1RBVEVfQ0hBTkdFRCA9IDQ7XG52YXIgU1RBVEVfRU5ERUQgPSA4O1xudmFyIFNUQVRFX1JFQ09HTklaRUQgPSBTVEFURV9FTkRFRDtcbnZhciBTVEFURV9DQU5DRUxMRUQgPSAxNjtcbnZhciBTVEFURV9GQUlMRUQgPSAzMjtcblxuLyoqXG4gKiBSZWNvZ25pemVyXG4gKiBFdmVyeSByZWNvZ25pemVyIG5lZWRzIHRvIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIFJlY29nbml6ZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IGFzc2lnbih7fSwgdGhpcy5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLmlkID0gdW5pcXVlSWQoKTtcblxuICAgIHRoaXMubWFuYWdlciA9IG51bGw7XG5cbiAgICAvLyBkZWZhdWx0IGlzIGVuYWJsZSB0cnVlXG4gICAgdGhpcy5vcHRpb25zLmVuYWJsZSA9IGlmVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5lbmFibGUsIHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuXG4gICAgdGhpcy5zaW11bHRhbmVvdXMgPSB7fTtcbiAgICB0aGlzLnJlcXVpcmVGYWlsID0gW107XG59XG5cblJlY29nbml6ZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBkZWZhdWx0czoge30sXG5cbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7UmVjb2duaXplcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gYWxzbyB1cGRhdGUgdGhlIHRvdWNoQWN0aW9uLCBpbiBjYXNlIHNvbWV0aGluZyBjaGFuZ2VkIGFib3V0IHRoZSBkaXJlY3Rpb25zL2VuYWJsZWQgc3RhdGVcbiAgICAgICAgdGhpcy5tYW5hZ2VyICYmIHRoaXMubWFuYWdlci50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ3JlY29nbml6ZVdpdGgnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2ltdWx0YW5lb3VzID0gdGhpcy5zaW11bHRhbmVvdXM7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKCFzaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXSkge1xuICAgICAgICAgICAgc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0gPSBvdGhlclJlY29nbml6ZXI7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVjb2duaXplV2l0aCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZHJvcCB0aGUgc2ltdWx0YW5lb3VzIGxpbmsuIGl0IGRvZXNudCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgb3RoZXJSZWNvZ25pemVyID0gZ2V0UmVjb2duaXplckJ5TmFtZUlmTWFuYWdlcihvdGhlclJlY29nbml6ZXIsIHRoaXMpO1xuICAgICAgICBkZWxldGUgdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJlY29nbml6ZXIgY2FuIG9ubHkgcnVuIHdoZW4gYW4gb3RoZXIgaXMgZmFpbGluZ1xuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICByZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXF1aXJlRmFpbCA9IHRoaXMucmVxdWlyZUZhaWw7XG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgaWYgKGluQXJyYXkocmVxdWlyZUZhaWwsIG90aGVyUmVjb2duaXplcikgPT09IC0xKSB7XG4gICAgICAgICAgICByZXF1aXJlRmFpbC5wdXNoKG90aGVyUmVjb2duaXplcik7XG4gICAgICAgICAgICBvdGhlclJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHJlcXVpcmVGYWlsdXJlIGxpbmsuIGl0IGRvZXMgbm90IHJlbW92ZSB0aGUgbGluayBvbiB0aGUgb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgZHJvcFJlcXVpcmVGYWlsdXJlOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgaWYgKGludm9rZUFycmF5QXJnKG90aGVyUmVjb2duaXplciwgJ2Ryb3BSZXF1aXJlRmFpbHVyZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheSh0aGlzLnJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1aXJlRmFpbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBoYXMgcmVxdWlyZSBmYWlsdXJlcyBib29sZWFuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzUmVxdWlyZUZhaWx1cmVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoID4gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaWYgdGhlIHJlY29nbml6ZXIgY2FuIHJlY29nbml6ZSBzaW11bHRhbmVvdXMgd2l0aCBhbiBvdGhlciByZWNvZ25pemVyXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5SZWNvZ25pemVXaXRoOiBmdW5jdGlvbihvdGhlclJlY29nbml6ZXIpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zaW11bHRhbmVvdXNbb3RoZXJSZWNvZ25pemVyLmlkXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogWW91IHNob3VsZCB1c2UgYHRyeUVtaXRgIGluc3RlYWQgb2YgYGVtaXRgIGRpcmVjdGx5IHRvIGNoZWNrXG4gICAgICogdGhhdCBhbGwgdGhlIG5lZWRlZCByZWNvZ25pemVycyBoYXMgZmFpbGVkIGJlZm9yZSBlbWl0dGluZy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5tYW5hZ2VyLmVtaXQoZXZlbnQsIGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICdwYW5zdGFydCcgYW5kICdwYW5tb3ZlJ1xuICAgICAgICBpZiAoc3RhdGUgPCBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQpOyAvLyBzaW1wbGUgJ2V2ZW50TmFtZScgZXZlbnRzXG5cbiAgICAgICAgaWYgKGlucHV0LmFkZGl0aW9uYWxFdmVudCkgeyAvLyBhZGRpdGlvbmFsIGV2ZW50KHBhbmxlZnQsIHBhbnJpZ2h0LCBwaW5jaGluLCBwaW5jaG91dC4uLilcbiAgICAgICAgICAgIGVtaXQoaW5wdXQuYWRkaXRpb25hbEV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBhbmVuZCBhbmQgcGFuY2FuY2VsXG4gICAgICAgIGlmIChzdGF0ZSA+PSBTVEFURV9FTkRFRCkge1xuICAgICAgICAgICAgZW1pdChzZWxmLm9wdGlvbnMuZXZlbnQgKyBzdGF0ZVN0cihzdGF0ZSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoYXQgYWxsIHRoZSByZXF1aXJlIGZhaWx1cmUgcmVjb2duaXplcnMgaGFzIGZhaWxlZCxcbiAgICAgKiBpZiB0cnVlLCBpdCBlbWl0cyBhIGdlc3R1cmUgZXZlbnQsXG4gICAgICogb3RoZXJ3aXNlLCBzZXR1cCB0aGUgc3RhdGUgdG8gRkFJTEVELlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqL1xuICAgIHRyeUVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLmNhbkVtaXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaXQncyBmYWlsaW5nIGFueXdheVxuICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYW4gd2UgZW1pdD9cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBjYW5FbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmVxdWlyZUZhaWwubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLnJlcXVpcmVGYWlsW2ldLnN0YXRlICYgKFNUQVRFX0ZBSUxFRCB8IFNUQVRFX1BPU1NJQkxFKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSB0aGUgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICAvLyBtYWtlIGEgbmV3IGNvcHkgb2YgdGhlIGlucHV0RGF0YVxuICAgICAgICAvLyBzbyB3ZSBjYW4gY2hhbmdlIHRoZSBpbnB1dERhdGEgd2l0aG91dCBtZXNzaW5nIHVwIHRoZSBvdGhlciByZWNvZ25pemVyc1xuICAgICAgICB2YXIgaW5wdXREYXRhQ2xvbmUgPSBhc3NpZ24oe30sIGlucHV0RGF0YSk7XG5cbiAgICAgICAgLy8gaXMgaXMgZW5hYmxlZCBhbmQgYWxsb3cgcmVjb2duaXppbmc/XG4gICAgICAgIGlmICghYm9vbE9yRm4odGhpcy5vcHRpb25zLmVuYWJsZSwgW3RoaXMsIGlucHV0RGF0YUNsb25lXSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9GQUlMRUQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCB3aGVuIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZFxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmIChTVEFURV9SRUNPR05JWkVEIHwgU1RBVEVfQ0FOQ0VMTEVEIHwgU1RBVEVfRkFJTEVEKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1BPU1NJQkxFO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMucHJvY2VzcyhpbnB1dERhdGFDbG9uZSk7XG5cbiAgICAgICAgLy8gdGhlIHJlY29nbml6ZXIgaGFzIHJlY29nbml6ZWQgYSBnZXN0dXJlXG4gICAgICAgIC8vIHNvIHRyaWdnZXIgYW4gZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfQkVHQU4gfCBTVEFURV9DSEFOR0VEIHwgU1RBVEVfRU5ERUQgfCBTVEFURV9DQU5DRUxMRUQpKSB7XG4gICAgICAgICAgICB0aGlzLnRyeUVtaXQoaW5wdXREYXRhQ2xvbmUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgc3RhdGUgb2YgdGhlIHJlY29nbml6ZXJcbiAgICAgKiB0aGUgYWN0dWFsIHJlY29nbml6aW5nIGhhcHBlbnMgaW4gdGhpcyBtZXRob2RcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKiBAcmV0dXJucyB7Q29uc3R9IFNUQVRFXG4gICAgICovXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXREYXRhKSB7IH0sIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJuIHRoZSBwcmVmZXJyZWQgdG91Y2gtYWN0aW9uXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkgeyB9LFxuXG4gICAgLyoqXG4gICAgICogY2FsbGVkIHdoZW4gdGhlIGdlc3R1cmUgaXNuJ3QgYWxsb3dlZCB0byByZWNvZ25pemVcbiAgICAgKiBsaWtlIHdoZW4gYW5vdGhlciBpcyBiZWluZyByZWNvZ25pemVkIG9yIGl0IGlzIGRpc2FibGVkXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICByZXNldDogZnVuY3Rpb24oKSB7IH1cbn07XG5cbi8qKlxuICogZ2V0IGEgdXNhYmxlIHN0cmluZywgdXNlZCBhcyBldmVudCBwb3N0Zml4XG4gKiBAcGFyYW0ge0NvbnN0fSBzdGF0ZVxuICogQHJldHVybnMge1N0cmluZ30gc3RhdGVcbiAqL1xuZnVuY3Rpb24gc3RhdGVTdHIoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUgJiBTVEFURV9DQU5DRUxMRUQpIHtcbiAgICAgICAgcmV0dXJuICdjYW5jZWwnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9FTkRFRCkge1xuICAgICAgICByZXR1cm4gJ2VuZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0NIQU5HRUQpIHtcbiAgICAgICAgcmV0dXJuICdtb3ZlJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfQkVHQU4pIHtcbiAgICAgICAgcmV0dXJuICdzdGFydCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBkaXJlY3Rpb24gY29ucyB0byBzdHJpbmdcbiAqIEBwYXJhbSB7Q29uc3R9IGRpcmVjdGlvblxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGlyZWN0aW9uU3RyKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0RPV04pIHtcbiAgICAgICAgcmV0dXJuICdkb3duJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fVVApIHtcbiAgICAgICAgcmV0dXJuICd1cCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX0xFRlQpIHtcbiAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PSBESVJFQ1RJT05fUklHSFQpIHtcbiAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBnZXQgYSByZWNvZ25pemVyIGJ5IG5hbWUgaWYgaXQgaXMgYm91bmQgdG8gYSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSBvdGhlclJlY29nbml6ZXJcbiAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICogQHJldHVybnMge1JlY29nbml6ZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCByZWNvZ25pemVyKSB7XG4gICAgdmFyIG1hbmFnZXIgPSByZWNvZ25pemVyLm1hbmFnZXI7XG4gICAgaWYgKG1hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXIuZ2V0KG90aGVyUmVjb2duaXplcik7XG4gICAgfVxuICAgIHJldHVybiBvdGhlclJlY29nbml6ZXI7XG59XG5cbi8qKlxuICogVGhpcyByZWNvZ25pemVyIGlzIGp1c3QgdXNlZCBhcyBhIGJhc2UgZm9yIHRoZSBzaW1wbGUgYXR0cmlidXRlIHJlY29nbml6ZXJzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIEF0dHJSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChBdHRyUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjaGVjayBpZiBpdCB0aGUgcmVjb2duaXplciByZWNlaXZlcyB2YWxpZCBpbnB1dCwgbGlrZSBpbnB1dC5kaXN0YW5jZSA+IDEwLlxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSByZWNvZ25pemVkXG4gICAgICovXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25Qb2ludGVycyA9IHRoaXMub3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgcmV0dXJuIG9wdGlvblBvaW50ZXJzID09PSAwIHx8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9uUG9pbnRlcnM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIGlucHV0IGFuZCByZXR1cm4gdGhlIHN0YXRlIGZvciB0aGUgcmVjb2duaXplclxuICAgICAqIEBtZW1iZXJvZiBBdHRyUmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dFxuICAgICAqIEByZXR1cm5zIHsqfSBTdGF0ZVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBpbnB1dC5ldmVudFR5cGU7XG5cbiAgICAgICAgdmFyIGlzUmVjb2duaXplZCA9IHN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gdGhpcy5hdHRyVGVzdChpbnB1dCk7XG5cbiAgICAgICAgLy8gb24gY2FuY2VsIGlucHV0IGFuZCB3ZSd2ZSByZWNvZ25pemVkIGJlZm9yZSwgcmV0dXJuIFNUQVRFX0NBTkNFTExFRFxuICAgICAgICBpZiAoaXNSZWNvZ25pemVkICYmIChldmVudFR5cGUgJiBJTlBVVF9DQU5DRUwgfHwgIWlzVmFsaWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DQU5DRUxMRUQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNSZWNvZ25pemVkIHx8IGlzVmFsaWQpIHtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9FTkRFRDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShzdGF0ZSAmIFNUQVRFX0JFR0FOKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSB8IFNUQVRFX0NIQU5HRUQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQYW5cbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGFuZCBtb3ZlZCBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBhblJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMucFggPSBudWxsO1xuICAgIHRoaXMucFkgPSBudWxsO1xufVxuXG5pbmhlcml0KFBhblJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQYW5SZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwYW4nLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fQUxMXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9WRVJUSUNBTCkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFRPVUNIX0FDVElPTl9QQU5fWCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSxcblxuICAgIGRpcmVjdGlvblRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB2YXIgaGFzTW92ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSBpbnB1dC5kaXN0YW5jZTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0LmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIHggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHZhciB5ID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIC8vIGxvY2sgdG8gYXhpcz9cbiAgICAgICAgaWYgKCEoZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gJiBESVJFQ1RJT05fSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh4ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHggPCAwKSA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geCAhPSB0aGlzLnBYO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFYKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKHkgPT09IDApID8gRElSRUNUSU9OX05PTkUgOiAoeSA8IDApID8gRElSRUNUSU9OX1VQIDogRElSRUNUSU9OX0RPV047XG4gICAgICAgICAgICAgICAgaGFzTW92ZWQgPSB5ICE9IHRoaXMucFk7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhpbnB1dC5kZWx0YVkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGhhc01vdmVkICYmIGRpc3RhbmNlID4gb3B0aW9ucy50aHJlc2hvbGQgJiYgZGlyZWN0aW9uICYgb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gQXR0clJlY29nbml6ZXIucHJvdG90eXBlLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAodGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOIHx8ICghKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTikgJiYgdGhpcy5kaXJlY3Rpb25UZXN0KGlucHV0KSkpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuXG4gICAgICAgIHRoaXMucFggPSBpbnB1dC5kZWx0YVg7XG4gICAgICAgIHRoaXMucFkgPSBpbnB1dC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRpcmVjdGlvblN0cihpbnB1dC5kaXJlY3Rpb24pO1xuXG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFBpbmNoXG4gKiBSZWNvZ25pemVkIHdoZW4gdHdvIG9yIG1vcmUgcG9pbnRlcnMgYXJlIG1vdmluZyB0b3dhcmQgKHpvb20taW4pIG9yIGF3YXkgZnJvbSBlYWNoIG90aGVyICh6b29tLW91dCkuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFBpbmNoUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFBpbmNoUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGluY2gnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5zY2FsZSAtIDEpID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQuc2NhbGUgIT09IDEpIHtcbiAgICAgICAgICAgIHZhciBpbk91dCA9IGlucHV0LnNjYWxlIDwgMSA/ICdpbicgOiAnb3V0JztcbiAgICAgICAgICAgIGlucHV0LmFkZGl0aW9uYWxFdmVudCA9IHRoaXMub3B0aW9ucy5ldmVudCArIGluT3V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyLmVtaXQuY2FsbCh0aGlzLCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUHJlc3NcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb3duIGZvciB4IG1zIHdpdGhvdXQgYW55IG1vdmVtZW50LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFByZXNzUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xufVxuXG5pbmhlcml0KFByZXNzUmVjb2duaXplciwgUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUHJlc3NSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdwcmVzcycsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0aW1lOiAyNTEsIC8vIG1pbmltYWwgdGltZSBvZiB0aGUgcG9pbnRlciB0byBiZSBwcmVzc2VkXG4gICAgICAgIHRocmVzaG9sZDogOSAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX0FVVE9dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVGltZSA9IGlucHV0LmRlbHRhVGltZSA+IG9wdGlvbnMudGltZTtcblxuICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKCF2YWxpZE1vdmVtZW50IHx8ICF2YWxpZFBvaW50ZXJzIHx8IChpbnB1dC5ldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiAhdmFsaWRUaW1lKSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgfSwgb3B0aW9ucy50aW1lLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfSxcblxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT09IFNUQVRFX1JFQ09HTklaRUQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dCAmJiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgJ3VwJywgaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGltZVN0YW1wID0gbm93KCk7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFJvdGF0ZVxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXIgYXJlIG1vdmluZyBpbiBhIGNpcmN1bGFyIG1vdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgQXR0clJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gUm90YXRlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFJvdGF0ZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBSb3RhdGVSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZXZlbnQ6ICdyb3RhdGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDAsXG4gICAgICAgIHBvaW50ZXJzOiAyXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgfSxcblxuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIChNYXRoLmFicyhpbnB1dC5yb3RhdGlvbikgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkIHx8IHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTik7XG4gICAgfVxufSk7XG5cbi8qKlxuICogU3dpcGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBtb3ZpbmcgZmFzdCAodmVsb2NpdHkpLCB3aXRoIGVub3VnaCBkaXN0YW5jZSBpbiB0aGUgYWxsb3dlZCBkaXJlY3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFN3aXBlUmVjb2duaXplcigpIHtcbiAgICBBdHRyUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5pbmhlcml0KFN3aXBlUmVjb2duaXplciwgQXR0clJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFN3aXBlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAnc3dpcGUnLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICB2ZWxvY2l0eTogMC4zLFxuICAgICAgICBkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgICAgICBwb2ludGVyczogMVxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBQYW5SZWNvZ25pemVyLnByb3RvdHlwZS5nZXRUb3VjaEFjdGlvbi5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgICAgIHZhciB2ZWxvY2l0eTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uICYgKERJUkVDVElPTl9IT1JJWk9OVEFMIHwgRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgICAgICAgdmVsb2NpdHkgPSBpbnB1dC5vdmVyYWxsVmVsb2NpdHk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBlci5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgZGlyZWN0aW9uICYgaW5wdXQub2Zmc2V0RGlyZWN0aW9uICYmXG4gICAgICAgICAgICBpbnB1dC5kaXN0YW5jZSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgJiZcbiAgICAgICAgICAgIGlucHV0Lm1heFBvaW50ZXJzID09IHRoaXMub3B0aW9ucy5wb2ludGVycyAmJlxuICAgICAgICAgICAgYWJzKHZlbG9jaXR5KSA+IHRoaXMub3B0aW9ucy52ZWxvY2l0eSAmJiBpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9FTkQ7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQub2Zmc2V0RGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50ICsgZGlyZWN0aW9uLCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBBIHRhcCBpcyBlY29nbml6ZWQgd2hlbiB0aGUgcG9pbnRlciBpcyBkb2luZyBhIHNtYWxsIHRhcC9jbGljay4gTXVsdGlwbGUgdGFwcyBhcmUgcmVjb2duaXplZCBpZiB0aGV5IG9jY3VyXG4gKiBiZXR3ZWVuIHRoZSBnaXZlbiBpbnRlcnZhbCBhbmQgcG9zaXRpb24uIFRoZSBkZWxheSBvcHRpb24gY2FuIGJlIHVzZWQgdG8gcmVjb2duaXplIG11bHRpLXRhcHMgd2l0aG91dCBmaXJpbmdcbiAqIGEgc2luZ2xlIHRhcC5cbiAqXG4gKiBUaGUgZXZlbnREYXRhIGZyb20gdGhlIGVtaXR0ZWQgZXZlbnQgY29udGFpbnMgdGhlIHByb3BlcnR5IGB0YXBDb3VudGAsIHdoaWNoIGNvbnRhaW5zIHRoZSBhbW91bnQgb2ZcbiAqIG11bHRpLXRhcHMgYmVpbmcgcmVjb2duaXplZC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBUYXBSZWNvZ25pemVyKCkge1xuICAgIFJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIHByZXZpb3VzIHRpbWUgYW5kIGNlbnRlcixcbiAgICAvLyB1c2VkIGZvciB0YXAgY291bnRpbmdcbiAgICB0aGlzLnBUaW1lID0gZmFsc2U7XG4gICAgdGhpcy5wQ2VudGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQgPSBudWxsO1xuICAgIHRoaXMuY291bnQgPSAwO1xufVxuXG5pbmhlcml0KFRhcFJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFBpbmNoUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAndGFwJyxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIHRhcHM6IDEsXG4gICAgICAgIGludGVydmFsOiAzMDAsIC8vIG1heCB0aW1lIGJldHdlZW4gdGhlIG11bHRpLXRhcCB0YXBzXG4gICAgICAgIHRpbWU6IDI1MCwgLy8gbWF4IHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgZG93biAobGlrZSBmaW5nZXIgb24gdGhlIHNjcmVlbilcbiAgICAgICAgdGhyZXNob2xkOiA5LCAvLyBhIG1pbmltYWwgbW92ZW1lbnQgaXMgb2ssIGJ1dCBrZWVwIGl0IGxvd1xuICAgICAgICBwb3NUaHJlc2hvbGQ6IDEwIC8vIGEgbXVsdGktdGFwIGNhbiBiZSBhIGJpdCBvZmYgdGhlIGluaXRpYWwgcG9zaXRpb25cbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9NQU5JUFVMQVRJT05dO1xuICAgIH0sXG5cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgICB2YXIgdmFsaWRQb2ludGVycyA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gb3B0aW9ucy5wb2ludGVycztcbiAgICAgICAgdmFyIHZhbGlkTW92ZW1lbnQgPSBpbnB1dC5kaXN0YW5jZSA8IG9wdGlvbnMudGhyZXNob2xkO1xuICAgICAgICB2YXIgdmFsaWRUb3VjaFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPCBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgIGlmICgoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfU1RBUlQpICYmICh0aGlzLmNvdW50ID09PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIG9ubHkgYWxsb3cgbGl0dGxlIG1vdmVtZW50XG4gICAgICAgIC8vIGFuZCB3ZSd2ZSByZWFjaGVkIGFuIGVuZCBldmVudCwgc28gYSB0YXAgaXMgcG9zc2libGVcbiAgICAgICAgaWYgKHZhbGlkTW92ZW1lbnQgJiYgdmFsaWRUb3VjaFRpbWUgJiYgdmFsaWRQb2ludGVycykge1xuICAgICAgICAgICAgaWYgKGlucHV0LmV2ZW50VHlwZSAhPSBJTlBVVF9FTkQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWlsVGltZW91dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsaWRJbnRlcnZhbCA9IHRoaXMucFRpbWUgPyAoaW5wdXQudGltZVN0YW1wIC0gdGhpcy5wVGltZSA8IG9wdGlvbnMuaW50ZXJ2YWwpIDogdHJ1ZTtcbiAgICAgICAgICAgIHZhciB2YWxpZE11bHRpVGFwID0gIXRoaXMucENlbnRlciB8fCBnZXREaXN0YW5jZSh0aGlzLnBDZW50ZXIsIGlucHV0LmNlbnRlcikgPCBvcHRpb25zLnBvc1RocmVzaG9sZDtcblxuICAgICAgICAgICAgdGhpcy5wVGltZSA9IGlucHV0LnRpbWVTdGFtcDtcbiAgICAgICAgICAgIHRoaXMucENlbnRlciA9IGlucHV0LmNlbnRlcjtcblxuICAgICAgICAgICAgaWYgKCF2YWxpZE11bHRpVGFwIHx8ICF2YWxpZEludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAgICAgLy8gaWYgdGFwIGNvdW50IG1hdGNoZXMgd2UgaGF2ZSByZWNvZ25pemVkIGl0LFxuICAgICAgICAgICAgLy8gZWxzZSBpdCBoYXMgYmVnYW4gcmVjb2duaXppbmcuLi5cbiAgICAgICAgICAgIHZhciB0YXBDb3VudCA9IHRoaXMuY291bnQgJSBvcHRpb25zLnRhcHM7XG4gICAgICAgICAgICBpZiAodGFwQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBubyBmYWlsaW5nIHJlcXVpcmVtZW50cywgaW1tZWRpYXRlbHkgdHJpZ2dlciB0aGUgdGFwIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gb3Igd2FpdCBhcyBsb25nIGFzIHRoZSBtdWx0aXRhcCBpbnRlcnZhbCB0byB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1JlcXVpcmVGYWlsdXJlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9SRUNPR05JWkVEO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5RW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX0JFR0FOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICBmYWlsVGltZW91dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dENvbnRleHQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwsIHRoaXMpO1xuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dC50YXBDb3VudCA9IHRoaXMuY291bnQ7XG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIuZW1pdCh0aGlzLm9wdGlvbnMuZXZlbnQsIHRoaXMuX2lucHV0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIFNpbXBsZSB3YXkgdG8gY3JlYXRlIGEgbWFuYWdlciB3aXRoIGEgZGVmYXVsdCBzZXQgb2YgcmVjb2duaXplcnMuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSGFtbWVyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnJlY29nbml6ZXJzID0gaWZVbmRlZmluZWQob3B0aW9ucy5yZWNvZ25pemVycywgSGFtbWVyLmRlZmF1bHRzLnByZXNldCk7XG4gICAgcmV0dXJuIG5ldyBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEBjb25zdCB7c3RyaW5nfVxuICovXG5IYW1tZXIuVkVSU0lPTiA9ICcyLjAuNyc7XG5cbi8qKlxuICogZGVmYXVsdCBzZXR0aW5nc1xuICogQG5hbWVzcGFjZVxuICovXG5IYW1tZXIuZGVmYXVsdHMgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IGlmIERPTSBldmVudHMgYXJlIGJlaW5nIHRyaWdnZXJlZC5cbiAgICAgKiBCdXQgdGhpcyBpcyBzbG93ZXIgYW5kIHVudXNlZCBieSBzaW1wbGUgaW1wbGVtZW50YXRpb25zLCBzbyBkaXNhYmxlZCBieSBkZWZhdWx0LlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZG9tRXZlbnRzOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBmb3IgdGhlIHRvdWNoQWN0aW9uIHByb3BlcnR5L2ZhbGxiYWNrLlxuICAgICAqIFdoZW4gc2V0IHRvIGBjb21wdXRlYCBpdCB3aWxsIG1hZ2ljYWxseSBzZXQgdGhlIGNvcnJlY3QgdmFsdWUgYmFzZWQgb24gdGhlIGFkZGVkIHJlY29nbml6ZXJzLlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGRlZmF1bHQgY29tcHV0ZVxuICAgICAqL1xuICAgIHRvdWNoQWN0aW9uOiBUT1VDSF9BQ1RJT05fQ09NUFVURSxcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBlbmFibGU6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBFWFBFUklNRU5UQUwgRkVBVFVSRSAtLSBjYW4gYmUgcmVtb3ZlZC9jaGFuZ2VkXG4gICAgICogQ2hhbmdlIHRoZSBwYXJlbnQgaW5wdXQgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICogSWYgTnVsbCwgdGhlbiBpdCBpcyBiZWluZyBzZXQgdGhlIHRvIG1haW4gZWxlbWVudC5cbiAgICAgKiBAdHlwZSB7TnVsbHxFdmVudFRhcmdldH1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRUYXJnZXQ6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBmb3JjZSBhbiBpbnB1dCBjbGFzc1xuICAgICAqIEB0eXBlIHtOdWxsfEZ1bmN0aW9ufVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBpbnB1dENsYXNzOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCByZWNvZ25pemVyIHNldHVwIHdoZW4gY2FsbGluZyBgSGFtbWVyKClgXG4gICAgICogV2hlbiBjcmVhdGluZyBhIG5ldyBNYW5hZ2VyIHRoZXNlIHdpbGwgYmUgc2tpcHBlZC5cbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgcHJlc2V0OiBbXG4gICAgICAgIC8vIFJlY29nbml6ZXJDbGFzcywgb3B0aW9ucywgW3JlY29nbml6ZVdpdGgsIC4uLl0sIFtyZXF1aXJlRmFpbHVyZSwgLi4uXVxuICAgICAgICBbUm90YXRlUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9XSxcbiAgICAgICAgW1BpbmNoUmVjb2duaXplciwge2VuYWJsZTogZmFsc2V9LCBbJ3JvdGF0ZSddXSxcbiAgICAgICAgW1N3aXBlUmVjb2duaXplciwge2RpcmVjdGlvbjogRElSRUNUSU9OX0hPUklaT05UQUx9XSxcbiAgICAgICAgW1BhblJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfSwgWydzd2lwZSddXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXJdLFxuICAgICAgICBbVGFwUmVjb2duaXplciwge2V2ZW50OiAnZG91YmxldGFwJywgdGFwczogMn0sIFsndGFwJ11dLFxuICAgICAgICBbUHJlc3NSZWNvZ25pemVyXVxuICAgIF0sXG5cbiAgICAvKipcbiAgICAgKiBTb21lIENTUyBwcm9wZXJ0aWVzIGNhbiBiZSB1c2VkIHRvIGltcHJvdmUgdGhlIHdvcmtpbmcgb2YgSGFtbWVyLlxuICAgICAqIEFkZCB0aGVtIHRvIHRoaXMgbWV0aG9kIGFuZCB0aGV5IHdpbGwgYmUgc2V0IHdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlci5cbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgY3NzUHJvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRleHQgc2VsZWN0aW9uIHRvIGltcHJvdmUgdGhlIGRyYWdnaW5nIGdlc3R1cmUuIE1haW5seSBmb3IgZGVza3RvcCBicm93c2Vycy5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgdGhlIFdpbmRvd3MgUGhvbmUgZ3JpcHBlcnMgd2hlbiBwcmVzc2luZyBhbiBlbGVtZW50LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoU2VsZWN0OiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGVzIHRoZSBkZWZhdWx0IGNhbGxvdXQgc2hvd24gd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQuXG4gICAgICAgICAqIE9uIGlPUywgd2hlbiB5b3UgdG91Y2ggYW5kIGhvbGQgYSB0b3VjaCB0YXJnZXQgc3VjaCBhcyBhIGxpbmssIFNhZmFyaSBkaXNwbGF5c1xuICAgICAgICAgKiBhIGNhbGxvdXQgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbGluay4gVGhpcyBwcm9wZXJ0eSBhbGxvd3MgeW91IHRvIGRpc2FibGUgdGhhdCBjYWxsb3V0LlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHRvdWNoQ2FsbG91dDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB6b29taW5nIGlzIGVuYWJsZWQuIFVzZWQgYnkgSUUxMD5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICBjb250ZW50Wm9vbWluZzogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZpZXMgdGhhdCBhbiBlbnRpcmUgZWxlbWVudCBzaG91bGQgYmUgZHJhZ2dhYmxlIGluc3RlYWQgb2YgaXRzIGNvbnRlbnRzLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlckRyYWc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3ZlcnJpZGVzIHRoZSBoaWdobGlnaHQgY29sb3Igc2hvd24gd2hlbiB0aGUgdXNlciB0YXBzIGEgbGluayBvciBhIEphdmFTY3JpcHRcbiAgICAgICAgICogY2xpY2thYmxlIGVsZW1lbnQgaW4gaU9TLiBUaGlzIHByb3BlcnR5IG9iZXlzIHRoZSBhbHBoYSB2YWx1ZSwgaWYgc3BlY2lmaWVkLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAncmdiYSgwLDAsMCwwKSdcbiAgICAgICAgICovXG4gICAgICAgIHRhcEhpZ2hsaWdodENvbG9yOiAncmdiYSgwLDAsMCwwKSdcbiAgICB9XG59O1xuXG52YXIgU1RPUCA9IDE7XG52YXIgRk9SQ0VEX1NUT1AgPSAyO1xuXG4vKipcbiAqIE1hbmFnZXJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNYW5hZ2VyKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIEhhbW1lci5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cbiAgICB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgPSB0aGlzLm9wdGlvbnMuaW5wdXRUYXJnZXQgfHwgZWxlbWVudDtcblxuICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICB0aGlzLnJlY29nbml6ZXJzID0gW107XG4gICAgdGhpcy5vbGRDc3NQcm9wcyA9IHt9O1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmlucHV0ID0gY3JlYXRlSW5wdXRJbnN0YW5jZSh0aGlzKTtcbiAgICB0aGlzLnRvdWNoQWN0aW9uID0gbmV3IFRvdWNoQWN0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy50b3VjaEFjdGlvbik7XG5cbiAgICB0b2dnbGVDc3NQcm9wcyh0aGlzLCB0cnVlKTtcblxuICAgIGVhY2godGhpcy5vcHRpb25zLnJlY29nbml6ZXJzLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciByZWNvZ25pemVyID0gdGhpcy5hZGQobmV3IChpdGVtWzBdKShpdGVtWzFdKSk7XG4gICAgICAgIGl0ZW1bMl0gJiYgcmVjb2duaXplci5yZWNvZ25pemVXaXRoKGl0ZW1bMl0pO1xuICAgICAgICBpdGVtWzNdICYmIHJlY29nbml6ZXIucmVxdWlyZUZhaWx1cmUoaXRlbVszXSk7XG4gICAgfSwgdGhpcyk7XG59XG5cbk1hbmFnZXIucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7TWFuYWdlcn1cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gT3B0aW9ucyB0aGF0IG5lZWQgYSBsaXR0bGUgbW9yZSBzZXR1cFxuICAgICAgICBpZiAob3B0aW9ucy50b3VjaEFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy50b3VjaEFjdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnB1dFRhcmdldCkge1xuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXJzIGFuZCByZWluaXRpYWxpemVcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC50YXJnZXQgPSBvcHRpb25zLmlucHV0VGFyZ2V0O1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHN0b3AgcmVjb2duaXppbmcgZm9yIHRoaXMgc2Vzc2lvbi5cbiAgICAgKiBUaGlzIHNlc3Npb24gd2lsbCBiZSBkaXNjYXJkZWQsIHdoZW4gYSBuZXcgW2lucHV0XXN0YXJ0IGV2ZW50IGlzIGZpcmVkLlxuICAgICAqIFdoZW4gZm9yY2VkLCB0aGUgcmVjb2duaXplciBjeWNsZSBpcyBzdG9wcGVkIGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlXVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uKGZvcmNlKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zdG9wcGVkID0gZm9yY2UgPyBGT1JDRURfU1RPUCA6IFNUT1A7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHJ1biB0aGUgcmVjb2duaXplcnMhXG4gICAgICogY2FsbGVkIGJ5IHRoZSBpbnB1dEhhbmRsZXIgZnVuY3Rpb24gb24gZXZlcnkgbW92ZW1lbnQgb2YgdGhlIHBvaW50ZXJzICh0b3VjaGVzKVxuICAgICAqIGl0IHdhbGtzIHRocm91Z2ggYWxsIHRoZSByZWNvZ25pemVycyBhbmQgdHJpZXMgdG8gZGV0ZWN0IHRoZSBnZXN0dXJlIHRoYXQgaXMgYmVpbmcgbWFkZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dERhdGFcbiAgICAgKi9cbiAgICByZWNvZ25pemU6IGZ1bmN0aW9uKGlucHV0RGF0YSkge1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbjtcbiAgICAgICAgaWYgKHNlc3Npb24uc3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcnVuIHRoZSB0b3VjaC1hY3Rpb24gcG9seWZpbGxcbiAgICAgICAgdGhpcy50b3VjaEFjdGlvbi5wcmV2ZW50RGVmYXVsdHMoaW5wdXREYXRhKTtcblxuICAgICAgICB2YXIgcmVjb2duaXplcjtcbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcblxuICAgICAgICAvLyB0aGlzIGhvbGRzIHRoZSByZWNvZ25pemVyIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgLy8gc28gdGhlIHJlY29nbml6ZXIncyBzdGF0ZSBuZWVkcyB0byBiZSBCRUdBTiwgQ0hBTkdFRCwgRU5ERUQgb3IgUkVDT0dOSVpFRFxuICAgICAgICAvLyBpZiBubyByZWNvZ25pemVyIGlzIGRldGVjdGluZyBhIHRoaW5nLCBpdCBpcyBzZXQgdG8gYG51bGxgXG4gICAgICAgIHZhciBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyO1xuXG4gICAgICAgIC8vIHJlc2V0IHdoZW4gdGhlIGxhc3QgcmVjb2duaXplciBpcyByZWNvZ25pemVkXG4gICAgICAgIC8vIG9yIHdoZW4gd2UncmUgaW4gYSBuZXcgc2Vzc2lvblxuICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgfHwgKGN1clJlY29nbml6ZXIgJiYgY3VyUmVjb2duaXplci5zdGF0ZSAmIFNUQVRFX1JFQ09HTklaRUQpKSB7XG4gICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCByZWNvZ25pemVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlY29nbml6ZXIgPSByZWNvZ25pemVyc1tpXTtcblxuICAgICAgICAgICAgLy8gZmluZCBvdXQgaWYgd2UgYXJlIGFsbG93ZWQgdHJ5IHRvIHJlY29nbml6ZSB0aGUgaW5wdXQgZm9yIHRoaXMgb25lLlxuICAgICAgICAgICAgLy8gMS4gICBhbGxvdyBpZiB0aGUgc2Vzc2lvbiBpcyBOT1QgZm9yY2VkIHN0b3BwZWQgKHNlZSB0aGUgLnN0b3AoKSBtZXRob2QpXG4gICAgICAgICAgICAvLyAyLiAgIGFsbG93IGlmIHdlIHN0aWxsIGhhdmVuJ3QgcmVjb2duaXplZCBhIGdlc3R1cmUgaW4gdGhpcyBzZXNzaW9uLCBvciB0aGUgdGhpcyByZWNvZ25pemVyIGlzIHRoZSBvbmVcbiAgICAgICAgICAgIC8vICAgICAgdGhhdCBpcyBiZWluZyByZWNvZ25pemVkLlxuICAgICAgICAgICAgLy8gMy4gICBhbGxvdyBpZiB0aGUgcmVjb2duaXplciBpcyBhbGxvd2VkIHRvIHJ1biBzaW11bHRhbmVvdXMgd2l0aCB0aGUgY3VycmVudCByZWNvZ25pemVkIHJlY29nbml6ZXIuXG4gICAgICAgICAgICAvLyAgICAgIHRoaXMgY2FuIGJlIHNldHVwIHdpdGggdGhlIGByZWNvZ25pemVXaXRoKClgIG1ldGhvZCBvbiB0aGUgcmVjb2duaXplci5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQgIT09IEZPUkNFRF9TVE9QICYmICggLy8gMVxuICAgICAgICAgICAgICAgICAgICAhY3VyUmVjb2duaXplciB8fCByZWNvZ25pemVyID09IGN1clJlY29nbml6ZXIgfHwgLy8gMlxuICAgICAgICAgICAgICAgICAgICByZWNvZ25pemVyLmNhblJlY29nbml6ZVdpdGgoY3VyUmVjb2duaXplcikpKSB7IC8vIDNcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlY29nbml6ZShpbnB1dERhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVyLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSByZWNvZ25pemVyIGhhcyBiZWVuIHJlY29nbml6aW5nIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGdlc3R1cmUsIHdlIHdhbnQgdG8gc3RvcmUgdGhpcyBvbmUgYXMgdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IGFjdGl2ZSByZWNvZ25pemVyLiBidXQgb25seSBpZiB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgYW4gYWN0aXZlIHJlY29nbml6ZXJcbiAgICAgICAgICAgIGlmICghY3VyUmVjb2duaXplciAmJiByZWNvZ25pemVyLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEKSkge1xuICAgICAgICAgICAgICAgIGN1clJlY29nbml6ZXIgPSBzZXNzaW9uLmN1clJlY29nbml6ZXIgPSByZWNvZ25pemVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldCBhIHJlY29nbml6ZXIgYnkgaXRzIGV2ZW50IG5hbWUuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE51bGx9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChyZWNvZ25pemVyIGluc3RhbmNlb2YgUmVjb2duaXplcikge1xuICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY29nbml6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVjb2duaXplcnNbaV0ub3B0aW9ucy5ldmVudCA9PSByZWNvZ25pemVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29nbml6ZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBhZGQgYSByZWNvZ25pemVyIHRvIHRoZSBtYW5hZ2VyXG4gICAgICogZXhpc3RpbmcgcmVjb2duaXplcnMgd2l0aCB0aGUgc2FtZSBldmVudCBuYW1lIHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfE1hbmFnZXJ9XG4gICAgICovXG4gICAgYWRkOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAnYWRkJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIGV4aXN0aW5nXG4gICAgICAgIHZhciBleGlzdGluZyA9IHRoaXMuZ2V0KHJlY29nbml6ZXIub3B0aW9ucy5ldmVudCk7XG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoZXhpc3RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvZ25pemVycy5wdXNoKHJlY29nbml6ZXIpO1xuICAgICAgICByZWNvZ25pemVyLm1hbmFnZXIgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgYSByZWNvZ25pemVyIGJ5IG5hbWUgb3IgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ8U3RyaW5nfSByZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhyZWNvZ25pemVyLCAncmVtb3ZlJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjb2duaXplciA9IHRoaXMuZ2V0KHJlY29nbml6ZXIpO1xuXG4gICAgICAgIC8vIGxldCdzIG1ha2Ugc3VyZSB0aGlzIHJlY29nbml6ZXIgZXhpc3RzXG4gICAgICAgIGlmIChyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICB2YXIgcmVjb2duaXplcnMgPSB0aGlzLnJlY29nbml6ZXJzO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gaW5BcnJheShyZWNvZ25pemVycywgcmVjb2duaXplcik7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZWNvZ25pemVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYmluZCBldmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbihldmVudHMsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdID0gaGFuZGxlcnNbZXZlbnRdIHx8IFtdO1xuICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdLnB1c2goaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdW5iaW5kIGV2ZW50LCBsZWF2ZSBlbWl0IGJsYW5rIHRvIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2hhbmRsZXJdXG4gICAgICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gdGhpc1xuICAgICAqL1xuICAgIG9mZjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVycztcbiAgICAgICAgZWFjaChzcGxpdFN0cihldmVudHMpLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbZXZlbnRdICYmIGhhbmRsZXJzW2V2ZW50XS5zcGxpY2UoaW5BcnJheShoYW5kbGVyc1tldmVudF0sIGhhbmRsZXIpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBlbWl0IGV2ZW50IHRvIHRoZSBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIGVtaXQ6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIC8vIHdlIGFsc28gd2FudCB0byB0cmlnZ2VyIGRvbSBldmVudHNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kb21FdmVudHMpIHtcbiAgICAgICAgICAgIHRyaWdnZXJEb21FdmVudChldmVudCwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBoYW5kbGVycywgc28gc2tpcCBpdCBhbGxcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc1tldmVudF0gJiYgdGhpcy5oYW5kbGVyc1tldmVudF0uc2xpY2UoKTtcbiAgICAgICAgaWYgKCFoYW5kbGVycyB8fCAhaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLnR5cGUgPSBldmVudDtcbiAgICAgICAgZGF0YS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF0YS5zcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBoYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2ldKGRhdGEpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlc3Ryb3kgdGhlIG1hbmFnZXIgYW5kIHVuYmluZHMgYWxsIGV2ZW50c1xuICAgICAqIGl0IGRvZXNuJ3QgdW5iaW5kIGRvbSBldmVudHMsIHRoYXQgaXMgdGhlIHVzZXIgb3duIHJlc3BvbnNpYmlsaXR5XG4gICAgICovXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCAmJiB0b2dnbGVDc3NQcm9wcyh0aGlzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgICAgICB0aGlzLnNlc3Npb24gPSB7fTtcbiAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBhZGQvcmVtb3ZlIHRoZSBjc3MgcHJvcGVydGllcyBhcyBkZWZpbmVkIGluIG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wc1xuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGFkZFxuICovXG5mdW5jdGlvbiB0b2dnbGVDc3NQcm9wcyhtYW5hZ2VyLCBhZGQpIHtcbiAgICB2YXIgZWxlbWVudCA9IG1hbmFnZXIuZWxlbWVudDtcbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJvcDtcbiAgICBlYWNoKG1hbmFnZXIub3B0aW9ucy5jc3NQcm9wcywgZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgcHJvcCA9IHByZWZpeGVkKGVsZW1lbnQuc3R5bGUsIG5hbWUpO1xuICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdID0gZWxlbWVudC5zdHlsZVtwcm9wXTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBtYW5hZ2VyLm9sZENzc1Byb3BzW3Byb3BdIHx8ICcnO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFhZGQpIHtcbiAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wcyA9IHt9O1xuICAgIH1cbn1cblxuLyoqXG4gKiB0cmlnZ2VyIGRvbSBldmVudFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICovXG5mdW5jdGlvbiB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpIHtcbiAgICB2YXIgZ2VzdHVyZUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZ2VzdHVyZUV2ZW50LmluaXRFdmVudChldmVudCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgZ2VzdHVyZUV2ZW50Lmdlc3R1cmUgPSBkYXRhO1xuICAgIGRhdGEudGFyZ2V0LmRpc3BhdGNoRXZlbnQoZ2VzdHVyZUV2ZW50KTtcbn1cblxuYXNzaWduKEhhbW1lciwge1xuICAgIElOUFVUX1NUQVJUOiBJTlBVVF9TVEFSVCxcbiAgICBJTlBVVF9NT1ZFOiBJTlBVVF9NT1ZFLFxuICAgIElOUFVUX0VORDogSU5QVVRfRU5ELFxuICAgIElOUFVUX0NBTkNFTDogSU5QVVRfQ0FOQ0VMLFxuXG4gICAgU1RBVEVfUE9TU0lCTEU6IFNUQVRFX1BPU1NJQkxFLFxuICAgIFNUQVRFX0JFR0FOOiBTVEFURV9CRUdBTixcbiAgICBTVEFURV9DSEFOR0VEOiBTVEFURV9DSEFOR0VELFxuICAgIFNUQVRFX0VOREVEOiBTVEFURV9FTkRFRCxcbiAgICBTVEFURV9SRUNPR05JWkVEOiBTVEFURV9SRUNPR05JWkVELFxuICAgIFNUQVRFX0NBTkNFTExFRDogU1RBVEVfQ0FOQ0VMTEVELFxuICAgIFNUQVRFX0ZBSUxFRDogU1RBVEVfRkFJTEVELFxuXG4gICAgRElSRUNUSU9OX05PTkU6IERJUkVDVElPTl9OT05FLFxuICAgIERJUkVDVElPTl9MRUZUOiBESVJFQ1RJT05fTEVGVCxcbiAgICBESVJFQ1RJT05fUklHSFQ6IERJUkVDVElPTl9SSUdIVCxcbiAgICBESVJFQ1RJT05fVVA6IERJUkVDVElPTl9VUCxcbiAgICBESVJFQ1RJT05fRE9XTjogRElSRUNUSU9OX0RPV04sXG4gICAgRElSRUNUSU9OX0hPUklaT05UQUw6IERJUkVDVElPTl9IT1JJWk9OVEFMLFxuICAgIERJUkVDVElPTl9WRVJUSUNBTDogRElSRUNUSU9OX1ZFUlRJQ0FMLFxuICAgIERJUkVDVElPTl9BTEw6IERJUkVDVElPTl9BTEwsXG5cbiAgICBNYW5hZ2VyOiBNYW5hZ2VyLFxuICAgIElucHV0OiBJbnB1dCxcbiAgICBUb3VjaEFjdGlvbjogVG91Y2hBY3Rpb24sXG5cbiAgICBUb3VjaElucHV0OiBUb3VjaElucHV0LFxuICAgIE1vdXNlSW5wdXQ6IE1vdXNlSW5wdXQsXG4gICAgUG9pbnRlckV2ZW50SW5wdXQ6IFBvaW50ZXJFdmVudElucHV0LFxuICAgIFRvdWNoTW91c2VJbnB1dDogVG91Y2hNb3VzZUlucHV0LFxuICAgIFNpbmdsZVRvdWNoSW5wdXQ6IFNpbmdsZVRvdWNoSW5wdXQsXG5cbiAgICBSZWNvZ25pemVyOiBSZWNvZ25pemVyLFxuICAgIEF0dHJSZWNvZ25pemVyOiBBdHRyUmVjb2duaXplcixcbiAgICBUYXA6IFRhcFJlY29nbml6ZXIsXG4gICAgUGFuOiBQYW5SZWNvZ25pemVyLFxuICAgIFN3aXBlOiBTd2lwZVJlY29nbml6ZXIsXG4gICAgUGluY2g6IFBpbmNoUmVjb2duaXplcixcbiAgICBSb3RhdGU6IFJvdGF0ZVJlY29nbml6ZXIsXG4gICAgUHJlc3M6IFByZXNzUmVjb2duaXplcixcblxuICAgIG9uOiBhZGRFdmVudExpc3RlbmVycyxcbiAgICBvZmY6IHJlbW92ZUV2ZW50TGlzdGVuZXJzLFxuICAgIGVhY2g6IGVhY2gsXG4gICAgbWVyZ2U6IG1lcmdlLFxuICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGluaGVyaXQ6IGluaGVyaXQsXG4gICAgYmluZEZuOiBiaW5kRm4sXG4gICAgcHJlZml4ZWQ6IHByZWZpeGVkXG59KTtcblxuLy8gdGhpcyBwcmV2ZW50cyBlcnJvcnMgd2hlbiBIYW1tZXIgaXMgbG9hZGVkIGluIHRoZSBwcmVzZW5jZSBvZiBhbiBBTURcbi8vICBzdHlsZSBsb2FkZXIgYnV0IGJ5IHNjcmlwdCB0YWcsIG5vdCBieSB0aGUgbG9hZGVyLlxudmFyIGZyZWVHbG9iYWwgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHt9KSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuZnJlZUdsb2JhbC5IYW1tZXIgPSBIYW1tZXI7XG5cbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBIYW1tZXI7XG4gICAgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEhhbW1lcjtcbn0gZWxzZSB7XG4gICAgd2luZG93W2V4cG9ydE5hbWVdID0gSGFtbWVyO1xufVxuXG59KSh3aW5kb3csIGRvY3VtZW50LCAnSGFtbWVyJyk7XG4iLCIvKipcbiAqIE1pY3JvRXZlbnQgLSB0byBtYWtlIGFueSBqcyBvYmplY3QgYW4gZXZlbnQgZW1pdHRlciAoc2VydmVyIG9yIGJyb3dzZXIpXG4gKiBcbiAqIC0gcHVyZSBqYXZhc2NyaXB0IC0gc2VydmVyIGNvbXBhdGlibGUsIGJyb3dzZXIgY29tcGF0aWJsZVxuICogLSBkb250IHJlbHkgb24gdGhlIGJyb3dzZXIgZG9tc1xuICogLSBzdXBlciBzaW1wbGUgLSB5b3UgZ2V0IGl0IGltbWVkaWF0bHksIG5vIG1pc3RlcnksIG5vIG1hZ2ljIGludm9sdmVkXG4gKlxuICogLSBjcmVhdGUgYSBNaWNyb0V2ZW50RGVidWcgd2l0aCBnb29kaWVzIHRvIGRlYnVnXG4gKiAgIC0gbWFrZSBpdCBzYWZlciB0byB1c2VcbiovXG5cbnZhciBNaWNyb0V2ZW50XHQ9IGZ1bmN0aW9uKCl7fVxuTWljcm9FdmVudC5wcm90b3R5cGVcdD0ge1xuXHRiaW5kXHQ6IGZ1bmN0aW9uKGV2ZW50LCBmY3Qpe1xuXHRcdHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcblx0XHR0aGlzLl9ldmVudHNbZXZlbnRdID0gdGhpcy5fZXZlbnRzW2V2ZW50XVx0fHwgW107XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKGZjdCk7XG5cdH0sXG5cdHVuYmluZFx0OiBmdW5jdGlvbihldmVudCwgZmN0KXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0aWYoIGV2ZW50IGluIHRoaXMuX2V2ZW50cyA9PT0gZmFsc2UgIClcdHJldHVybjtcblx0XHR0aGlzLl9ldmVudHNbZXZlbnRdLnNwbGljZSh0aGlzLl9ldmVudHNbZXZlbnRdLmluZGV4T2YoZmN0KSwgMSk7XG5cdH0sXG5cdHRyaWdnZXJcdDogZnVuY3Rpb24oZXZlbnQgLyogLCBhcmdzLi4uICovKXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0aWYoIGV2ZW50IGluIHRoaXMuX2V2ZW50cyA9PT0gZmFsc2UgIClcdHJldHVybjtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5fZXZlbnRzW2V2ZW50XS5sZW5ndGg7IGkrKyl7XG5cdFx0XHR0aGlzLl9ldmVudHNbZXZlbnRdW2ldLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpXG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIG1peGluIHdpbGwgZGVsZWdhdGUgYWxsIE1pY3JvRXZlbnQuanMgZnVuY3Rpb24gaW4gdGhlIGRlc3RpbmF0aW9uIG9iamVjdFxuICpcbiAqIC0gcmVxdWlyZSgnTWljcm9FdmVudCcpLm1peGluKEZvb2Jhcikgd2lsbCBtYWtlIEZvb2JhciBhYmxlIHRvIHVzZSBNaWNyb0V2ZW50XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRoZSBvYmplY3Qgd2hpY2ggd2lsbCBzdXBwb3J0IE1pY3JvRXZlbnRcbiovXG5NaWNyb0V2ZW50Lm1peGluXHQ9IGZ1bmN0aW9uKGRlc3RPYmplY3Qpe1xuXHR2YXIgcHJvcHNcdD0gWydiaW5kJywgJ3VuYmluZCcsICd0cmlnZ2VyJ107XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKyspe1xuXHRcdGRlc3RPYmplY3QucHJvdG90eXBlW3Byb3BzW2ldXVx0PSBNaWNyb0V2ZW50LnByb3RvdHlwZVtwcm9wc1tpXV07XG5cdH1cbn1cblxuLy8gZXhwb3J0IGluIGNvbW1vbiBqc1xuaWYoIHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgKCdleHBvcnRzJyBpbiBtb2R1bGUpKXtcblx0bW9kdWxlLmV4cG9ydHNcdD0gTWljcm9FdmVudFxufVxuIl19
