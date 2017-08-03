(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SGN = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var SGN, process, session;

if (typeof process === 'undefined') {
  process = {
    browser: true
  };
}

SGN = _dereq_('./sgn');

SGN.storage = {
  local: _dereq_('./storage/client_local'),
  cookie: _dereq_('./storage/client_cookie')
};

SGN.request = _dereq_('./request/browser');

SGN.AuthKit = _dereq_('./kits/auth');

SGN.AssetsKit = _dereq_('./kits/assets');

SGN.EventsKit = _dereq_('./kits/events');

SGN.GraphKit = _dereq_('./kits/graph');

SGN.CoreKit = _dereq_('./kits/core');

SGN.PagedPublicationKit = _dereq_('./kits/paged_publication');

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


},{"./kits/assets":6,"./kits/auth":7,"./kits/core":8,"./kits/events":11,"./kits/graph":14,"./kits/paged_publication":21,"./request/browser":28,"./sgn":29,"./storage/client_cookie":30,"./storage/client_local":31}],2:[function(_dereq_,module,exports){
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


},{"./config":2,"./util":32}],4:[function(_dereq_,module,exports){
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


},{"../../sgn":29}],6:[function(_dereq_,module,exports){
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
  request: request,
  session: session
};


},{"../../sgn":29,"./request":9,"./session":10}],9:[function(_dereq_,module,exports){
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


},{"../../sgn":29}],10:[function(_dereq_,module,exports){
var SGN, callbackQueue, clientCookieStorage, session, sha256;

SGN = _dereq_('../../sgn');

sha256 = _dereq_('sha256');

clientCookieStorage = _dereq_('../../storage/client_cookie');

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


},{"../../sgn":29,"../../storage/client_cookie":30,"sha256":42}],11:[function(_dereq_,module,exports){
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


},{"microevent":39}],13:[function(_dereq_,module,exports){
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


},{"../../sgn":29,"../../storage/client_local":31}],14:[function(_dereq_,module,exports){
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


},{"../../sgn":29}],16:[function(_dereq_,module,exports){
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


},{"../../key_codes":4,"../../sgn":29,"microevent":39}],17:[function(_dereq_,module,exports){
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


},{"../../sgn":29,"../../storage/client_local":31,"./page_spreads":24,"microevent":39,"verso-browser":43}],18:[function(_dereq_,module,exports){
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


},{"microevent":39}],19:[function(_dereq_,module,exports){
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


},{"../../key_codes":4,"./templates/hotspot_picker":26,"gator":37,"microevent":39,"mustache":40}],20:[function(_dereq_,module,exports){
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


},{"./templates/hotspot":25,"microevent":39,"mustache":40}],21:[function(_dereq_,module,exports){
module.exports = {
  Viewer: _dereq_('./viewer'),
  HotspotPicker: _dereq_('./hotspot_picker')
};


},{"./hotspot_picker":19,"./viewer":27}],22:[function(_dereq_,module,exports){
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


},{"microevent":39}],23:[function(_dereq_,module,exports){
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


},{"../../sgn":29,"microevent":39}],24:[function(_dereq_,module,exports){
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


},{"../../sgn":29,"./page_spread":23,"microevent":39}],25:[function(_dereq_,module,exports){
module.exports = "";


},{}],26:[function(_dereq_,module,exports){
module.exports = "<div class=\"sgn-pp-hotspot-picker__background\" data-close></div>\n<div class=\"sgn__popover\" style=\"top: {{top}}px; left: {{left}}px;\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#hotspots}}\n                <li data-id=\"{{id}}\">\n                    <p>{{title}}</p>\n                    <p>{{subtitle}}</p>\n                </li>\n            {{/hotspots}}\n        </ul>\n    </div>\n</div>";


},{}],27:[function(_dereq_,module,exports){
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


},{"../../core":3,"./controls":16,"./core":17,"./event_tracking":18,"./hotspots":20,"./legacy_event_tracking":22,"microevent":39}],28:[function(_dereq_,module,exports){
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


},{"../sgn":29}],29:[function(_dereq_,module,exports){
module.exports = _dereq_('./core');


},{"./core":3}],30:[function(_dereq_,module,exports){
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


},{"../sgn":29}],31:[function(_dereq_,module,exports){
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


},{"../sgn":29}],32:[function(_dereq_,module,exports){
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

},{"_process":41,"buffer":34}],33:[function(_dereq_,module,exports){
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

},{}],34:[function(_dereq_,module,exports){
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

},{"base64-js":33,"ieee754":38}],35:[function(_dereq_,module,exports){
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
},{}],36:[function(_dereq_,module,exports){
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
},{}],37:[function(_dereq_,module,exports){
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

},{}],38:[function(_dereq_,module,exports){
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

},{}],39:[function(_dereq_,module,exports){
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

},{}],40:[function(_dereq_,module,exports){
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

},{}],41:[function(_dereq_,module,exports){
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

},{}],42:[function(_dereq_,module,exports){
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

},{"convert-hex":35,"convert-string":36}],43:[function(_dereq_,module,exports){
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
    var pageSpread;
    pageSpread = this.getPageSpreadFromPosition(this.getPosition());
    if (pageSpread.el.classList.contains('verso--scrollable') === false) {
      e.preventDefault();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY29mZmVlc2NyaXB0L2Jyb3dzZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb25maWcuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb3JlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2V5X2NvZGVzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9hc3NldHMvZmlsZV91cGxvYWQuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2Fzc2V0cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvYXV0aC9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9yZXF1ZXN0LmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9jb3JlL3Nlc3Npb24uY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2V2ZW50cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvZXZlbnRzL3B1bHNlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9ldmVudHMvdHJhY2tlci5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvZ3JhcGgvaW5kZXguY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2dyYXBoL3JlcXVlc3QuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL2NvbnRyb2xzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9jb3JlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9ldmVudF90cmFja2luZy5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vaG90c3BvdF9waWNrZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL2hvdHNwb3RzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vbGVnYWN5X2V2ZW50X3RyYWNraW5nLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9wYWdlX3NwcmVhZC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vcGFnZV9zcHJlYWRzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi90ZW1wbGF0ZXMvaG90c3BvdC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vdGVtcGxhdGVzL2hvdHNwb3RfcGlja2VyLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi92aWV3ZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9yZXF1ZXN0L2Jyb3dzZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zZ24uY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zdG9yYWdlL2NsaWVudF9jb29raWUuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zdG9yYWdlL2NsaWVudF9sb2NhbC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L3V0aWwuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29udmVydC1oZXgvY29udmVydC1oZXguanMiLCJub2RlX21vZHVsZXMvY29udmVydC1zdHJpbmcvY29udmVydC1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvZ2F0b3IvZ2F0b3IuanMiLCJub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9taWNyb2V2ZW50L21pY3JvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvbXVzdGFjaGUvbXVzdGFjaGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3NoYTI1Ni9saWIvc2hhMjU2LmpzIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3QvbGliL2NvZmZlZXNjcmlwdC9hbmltYXRpb24uY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L2xpYi9jb2ZmZWVzY3JpcHQvcGFnZV9zcHJlYWQuY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L2xpYi9jb2ZmZWVzY3JpcHQvdmVyc28uY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanMiLCJub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3Qvbm9kZV9tb2R1bGVzL21pY3JvZXZlbnQvbWljcm9ldmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUE7O0FBQUEsSUFBMkIsT0FBTyxPQUFQLEtBQWtCLFdBQTdDO0VBQUEsT0FBQSxHQUFVO0lBQUEsT0FBQSxFQUFTLElB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OztBQTBNSixNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7O0FDM01qQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pKQTtBQ0FBLElBQUE7O0FBQUEsTUFBTSxDQUFDLE9BQVAsR0FBdUI7RUFDTixtQkFBQyxFQUFEO0lBQUMsSUFBQyxDQUFBLEtBQUQ7SUFDVixJQUFDLENBQUEsR0FBRCxHQUFPO0FBRVA7RUFIUzs7c0JBS2IsT0FBQSxHQUFTLFNBQUMsT0FBRCxFQUFlLFFBQWY7QUFDTCxRQUFBOztNQURNLFVBQVU7OztNQUFJLFdBQVcsU0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25sRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgTWFrZSBzdXJlIHdlIGRlZmluZSB3ZSdyZSBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnQuXG5wcm9jZXNzID0gYnJvd3NlcjogdHJ1ZSBpZiB0eXBlb2YgcHJvY2VzcyBpcyAndW5kZWZpbmVkJ1xuXG5TR04gPSByZXF1aXJlICcuL3NnbidcblxuIyBFeHBvc2Ugc3RvcmFnZSBiYWNrZW5kcy5cblNHTi5zdG9yYWdlID1cbiAgICBsb2NhbDogcmVxdWlyZSAnLi9zdG9yYWdlL2NsaWVudF9sb2NhbCdcbiAgICBjb29raWU6IHJlcXVpcmUgJy4vc3RvcmFnZS9jbGllbnRfY29va2llJ1xuXG4jIEV4cG9zZSByZXF1ZXN0IGhhbmRsZXIuXG5TR04ucmVxdWVzdCA9IHJlcXVpcmUgJy4vcmVxdWVzdC9icm93c2VyJ1xuXG4jIEV4cG9zZSB0aGUgZGlmZmVyZW50IGtpdHMuXG5TR04uQXV0aEtpdCA9IHJlcXVpcmUgJy4va2l0cy9hdXRoJ1xuU0dOLkFzc2V0c0tpdCA9IHJlcXVpcmUgJy4va2l0cy9hc3NldHMnXG5TR04uRXZlbnRzS2l0ID0gcmVxdWlyZSAnLi9raXRzL2V2ZW50cydcblNHTi5HcmFwaEtpdCA9IHJlcXVpcmUgJy4va2l0cy9ncmFwaCdcblNHTi5Db3JlS2l0ID0gcmVxdWlyZSAnLi9raXRzL2NvcmUnXG5TR04uUGFnZWRQdWJsaWNhdGlvbktpdCA9IHJlcXVpcmUgJy4va2l0cy9wYWdlZF9wdWJsaWNhdGlvbidcblxuIyBTZXQgdGhlIGNvcmUgc2Vzc2lvbiBmcm9tIHRoZSBjb29raWUgc3RvcmUgaWYgcG9zc2libGUuXG5zZXNzaW9uID0gU0dOLnN0b3JhZ2UuY29va2llLmdldCAnc2Vzc2lvbidcblxuaWYgdHlwZW9mIHNlc3Npb24gaXMgJ29iamVjdCdcbiAgICBTR04uY29uZmlnLnNldFxuICAgICAgICBjb3JlU2Vzc2lvblRva2VuOiBzZXNzaW9uLnRva2VuXG4gICAgICAgIGNvcmVTZXNzaW9uQ2xpZW50SWQ6IHNlc3Npb24uY2xpZW50X2lkXG5cblNHTi5jbGllbnQgPSBkbyAtPlxuICAgIGlkID0gU0dOLnN0b3JhZ2UubG9jYWwuZ2V0ICdjbGllbnQtaWQnXG4gICAgZmlyc3RPcGVuID0gbm90IGlkP1xuXG4gICAgaWYgZmlyc3RPcGVuXG4gICAgICAgIGlkID0gU0dOLnV0aWwudXVpZCgpXG4gICAgICAgIFxuICAgICAgICBTR04uc3RvcmFnZS5sb2NhbC5zZXQgJ2NsaWVudC1pZCcsIGlkXG5cbiAgICBmaXJzdE9wZW46IGZpcnN0T3BlblxuICAgIGlkOiBpZFxuXG4jIE9wdGlvbmFsIHN0YXJ0IGZ1bmN0aW9uIHRvIGludm9rZSBzZXNzaW9uIHRyYWNraW5nLlxuU0dOLnN0YXJ0U2Vzc2lvbiA9IC0+XG4gICAgIyBFbWl0IHNlc3Npb24gZXZlbnRzIGlmIGEgdHJhY2tlciBpcyBhdmFpbGFibGUuXG4gICAgZXZlbnRUcmFja2VyID0gU0dOLmNvbmZpZy5nZXQgJ2V2ZW50VHJhY2tlcidcblxuICAgIGlmIGV2ZW50VHJhY2tlcj9cbiAgICAgICAgZXZlbnRUcmFja2VyLnRyYWNrRXZlbnQgJ2ZpcnN0LWNsaWVudC1zZXNzaW9uLW9wZW5lZCcsIHt9LCAnMS4wLjAnIGlmIFNHTi5jbGllbnQuZmlyc3RPcGVuIGlzIHRydWVcbiAgICAgICAgZXZlbnRUcmFja2VyLnRyYWNrRXZlbnQgJ2NsaWVudC1zZXNzaW9uLW9wZW5lZCcsIHt9LCAnMS4wLjAnXG5cbiAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBTR05cbiIsImF0dHJzID0ge31cbmtleXMgPSBbXG4gICAgJ2FwcFZlcnNpb24nLFxuICAgICdhcHBLZXknLFxuICAgICdhcHBTZWNyZXQnLFxuICAgICdhdXRoVG9rZW4nLFxuICAgICdldmVudFRyYWNrZXInLFxuICAgICdsb2NhbGUnLFxuICAgICdjb3JlU2Vzc2lvblRva2VuJyxcbiAgICAnY29yZVNlc3Npb25DbGllbnRJZCcsXG4gICAgJ2NvcmVVcmwnLFxuICAgICdncmFwaFVybCcsXG4gICAgJ2V2ZW50c1RyYWNrVXJsJyxcbiAgICAnZXZlbnRzUHVsc2VVcmwnLFxuICAgICdhc3NldHNGaWxlVXBsb2FkVXJsJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgc2V0OiAoY29uZmlnID0ge30pIC0+XG4gICAgICAgIGZvciBrZXksIHZhbHVlIG9mIGNvbmZpZ1xuICAgICAgICAgICAgYXR0cnNba2V5XSA9IHZhbHVlIGlmIGtleSBpbiBrZXlzXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXQ6IChvcHRpb24pIC0+XG4gICAgICAgIGF0dHJzW29wdGlvbl1cbiIsImNvbmZpZyA9IHJlcXVpcmUgJy4vY29uZmlnJ1xudXRpbCA9IHJlcXVpcmUgJy4vdXRpbCdcblxuIyBTZXQgZGVmYXVsdCB2YWx1ZXMuXG5jb25maWcuc2V0XG4gICAgbG9jYWxlOiAnZW5fVVMnXG4gICAgY29yZVVybDogJ2h0dHBzOi8vYXBpLmV0aWxidWRzYXZpcy5kaydcbiAgICBncmFwaFVybDogJ2h0dHBzOi8vZ3JhcGguc2VydmljZS5zaG9wZ3VuLmNvbSdcbiAgICBldmVudHNUcmFja1VybDogJ2h0dHBzOi8vZXZlbnRzLnNlcnZpY2Uuc2hvcGd1bi5jb20vdHJhY2snXG4gICAgZXZlbnRzUHVsc2VVcmw6ICd3c3M6Ly9ldmVudHMuc2VydmljZS5zaG9wZ3VuLmNvbS9wdWxzZSdcbiAgICBhc3NldHNGaWxlVXBsb2FkVXJsOiAnaHR0cHM6Ly9hc3NldHMuc2VydmljZS5zaG9wZ3VuLmNvbS91cGxvYWQnXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgICBjb25maWc6IGNvbmZpZ1xuXG4gICAgdXRpbDogdXRpbFxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIEVTQzogMjdcbiAgICBBUlJPV19SSUdIVDogMzlcbiAgICBBUlJPV19MRUZUOiAzN1xuICAgIFNQQUNFOiAzMlxuICAgIE5VTUJFUl9PTkU6IDQ5XG4iLCJTR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaWxlIGlzIG5vdCBkZWZpbmVkJykgaWYgbm90IG9wdGlvbnMuZmlsZT9cblxuICAgIHVybCA9IFNHTi5jb25maWcuZ2V0ICdhc3NldHNGaWxlVXBsb2FkVXJsJ1xuICAgIGZvcm1EYXRhID0gZmlsZTogb3B0aW9ucy5maWxlXG4gICAgdGltZW91dCA9IDEwMDAgKiA2MCAqIDYwXG5cbiAgICBTR04ucmVxdWVzdFxuICAgICAgICBtZXRob2Q6ICdwb3N0J1xuICAgICAgICB1cmw6IHVybFxuICAgICAgICBmb3JtRGF0YTogZm9ybURhdGFcbiAgICAgICAgdGltZW91dDogdGltZW91dFxuICAgICAgICBoZWFkZXJzOlxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdSZXF1ZXN0IGVycm9yJyksXG4gICAgICAgICAgICAgICAgY29kZTogJ1JlcXVlc3RFcnJvcidcbiAgICAgICAgICAgIClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgZGF0YS5zdGF0dXNDb2RlIGlzIDIwMFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGwsIEpTT04ucGFyc2UoZGF0YS5ib2R5KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignUmVxdWVzdCBlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBjb2RlOiAnUmVxdWVzdEVycm9yJ1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnN0YXR1c0NvZGVcbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgcmV0dXJuXG4gICAgLCAobG9hZGVkLCB0b3RhbCkgLT5cbiAgICAgICAgaWYgdHlwZW9mIHByb2dyZXNzQ2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFja1xuICAgICAgICAgICAgICAgIHByb2dyZXNzOiBsb2FkZWQgLyB0b3RhbFxuICAgICAgICAgICAgICAgIGxvYWRlZDogbG9hZGVkXG4gICAgICAgICAgICAgICAgdG90YWw6IHRvdGFsXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXR1cm5cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBmaWxlVXBsb2FkOiByZXF1aXJlICcuL2ZpbGVfdXBsb2FkJ1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fVxuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xucmVxdWVzdCA9IHJlcXVpcmUgJy4vcmVxdWVzdCdcbnNlc3Npb24gPSByZXF1aXJlICcuL3Nlc3Npb24nXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgICByZXF1ZXN0OiByZXF1ZXN0XG5cbiAgICBzZXNzaW9uOiBzZXNzaW9uXG4iLCJTR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2sgPSAtPikgLT5cbiAgICBTR04uQ29yZUtpdC5zZXNzaW9uLmVuc3VyZSAoZXJyKSAtPlxuICAgICAgICByZXR1cm4gY2FsbGJhY2sgZXJyIGlmIGVycj9cblxuICAgICAgICB1cmwgPSBvcHRpb25zLnVybCA/ICcnXG4gICAgICAgIGhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgPyB7fVxuICAgICAgICB0b2tlbiA9IFNHTi5jb25maWcuZ2V0ICdjb3JlU2Vzc2lvblRva2VuJ1xuICAgICAgICBjbGllbnRJZCA9IFNHTi5jb25maWcuZ2V0ICdjb3JlU2Vzc2lvbkNsaWVudElkJ1xuICAgICAgICBhcHBWZXJzaW9uID0gU0dOLmNvbmZpZy5nZXQgJ2FwcFZlcnNpb24nXG4gICAgICAgIGFwcFNlY3JldCA9IFNHTi5jb25maWcuZ2V0ICdhcHBTZWNyZXQnXG4gICAgICAgIGxvY2FsZSA9IFNHTi5jb25maWcuZ2V0ICdsb2NhbGUnXG4gICAgICAgIHFzID0gb3B0aW9ucy5xcyA/IHt9XG4gICAgICAgIGdlbyA9IG9wdGlvbnMuZ2VvbG9jYXRpb25cblxuICAgICAgICBoZWFkZXJzWydYLVRva2VuJ10gPSB0b2tlblxuICAgICAgICBoZWFkZXJzWydYLVNpZ25hdHVyZSddID0gU0dOLkNvcmVLaXQuc2Vzc2lvbi5zaWduIGFwcFNlY3JldCwgdG9rZW4gaWYgYXBwU2VjcmV0P1xuXG4gICAgICAgIHFzLnJfbG9jYWxlID0gbG9jYWxlIGlmIGxvY2FsZT9cbiAgICAgICAgcXMuYXBpX2F2ID0gYXBwVmVyc2lvbiBpZiBhcHBWZXJzaW9uP1xuICAgICAgICBxcy5jbGllbnRfaWQgPSBjbGllbnRJZCBpZiBjbGllbnRJZD9cblxuICAgICAgICBpZiBnZW8/XG4gICAgICAgICAgICBxcy5yX2xhdCA9IGdlby5sYXRpdHVkZSBpZiBnZW8ubGF0aXR1ZGU/IGFuZCBub3QgcXMucl9sYXQ/XG4gICAgICAgICAgICBxcy5yX2xuZyA9IGdlby5sb25naXR1ZGUgaWYgZ2VvLmxvbmdpdHVkZT8gYW5kIG5vdCBxcy5yX2xuZz9cbiAgICAgICAgICAgIHFzLnJfcmFkaXVzID0gZ2VvLnJhZGl1cyBpZiBnZW8ucmFkaXVzPyBhbmQgbm90IHFzLnJfcmFkaXVzP1xuICAgICAgICAgICAgcXMucl9zZW5zb3IgPSBnZW8uc2Vuc29yIGlmIGdlby5zZW5zb3I/IGFuZCBub3QgcXMucl9zZW5zb3I/XG5cbiAgICAgICAgU0dOLnJlcXVlc3RcbiAgICAgICAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2RcbiAgICAgICAgICAgIHVybDogU0dOLmNvbmZpZy5nZXQoJ2NvcmVVcmwnKSArIHVybFxuICAgICAgICAgICAgcXM6IHFzXG4gICAgICAgICAgICBib2R5OiBvcHRpb25zLmJvZHlcbiAgICAgICAgICAgIGZvcm1EYXRhOiBvcHRpb25zLmZvcm1EYXRhXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICBqc29uOiB0cnVlXG4gICAgICAgICAgICB1c2VDb29raWVzOiBmYWxzZVxuICAgICAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdDb3JlIHJlcXVlc3QgZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogJ0NvcmVSZXF1ZXN0RXJyb3InXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRva2VuID0gU0dOLmNvbmZpZy5nZXQgJ2NvcmVTZXNzaW9uVG9rZW4nXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUb2tlbiA9IGRhdGEuaGVhZGVyc1sneC10b2tlbiddXG5cbiAgICAgICAgICAgICAgICBTR04uQ29yZUtpdC5zZXNzaW9uLnNhdmVUb2tlbiByZXNwb25zZVRva2VuIGlmIHRva2VuIGlzbnQgcmVzcG9uc2VUb2tlblxuXG4gICAgICAgICAgICAgICAgaWYgZGF0YS5zdGF0dXNDb2RlID49IDIwMCBhbmQgZGF0YS5zdGF0dXNDb2RlIDwgMzAwIG9yIGRhdGEuc3RhdHVzQ29kZSBpcyAzMDRcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgbnVsbCwgZGF0YS5ib2R5XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0NvcmUgQVBJIGVycm9yJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiAnQ29yZUFQSUVycm9yJ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogZGF0YS5zdGF0dXNDb2RlXG4gICAgICAgICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICByZXR1cm5cbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcbnNoYTI1NiA9IHJlcXVpcmUgJ3NoYTI1NidcbmNsaWVudENvb2tpZVN0b3JhZ2UgPSByZXF1aXJlICcuLi8uLi9zdG9yYWdlL2NsaWVudF9jb29raWUnXG5jYWxsYmFja1F1ZXVlID0gW11cblxuc2Vzc2lvbiA9XG4gICAgdHRsOiAxICogNjAgKiA2MCAqIDI0ICogNjBcblxuICAgIHNhdmVUb2tlbjogKHRva2VuKSAtPlxuICAgICAgICBTR04uY29uZmlnLnNldCBjb3JlU2Vzc2lvblRva2VuOiB0b2tlblxuXG4gICAgICAgIHNlc3Npb24uc2F2ZUNvb2tpZSgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzYXZlQ2xpZW50SWQ6IChjbGllbnRJZCkgLT5cbiAgICAgICAgU0dOLmNvbmZpZy5zZXQgY29yZVNlc3Npb25DbGllbnRJZDogY2xpZW50SWRcblxuICAgICAgICBzZXNzaW9uLnNhdmVDb29raWUoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgc2F2ZUNvb2tpZTogLT5cbiAgICAgICAgY2xpZW50Q29va2llU3RvcmFnZS5zZXQgJ3Nlc3Npb24nLFxuICAgICAgICAgICAgdG9rZW46IFNHTi5jb25maWcuZ2V0ICdjb3JlU2Vzc2lvblRva2VuJ1xuICAgICAgICAgICAgY2xpZW50X2lkOiBTR04uY29uZmlnLmdldCAnY29yZVNlc3Npb25DbGllbnRJZCdcblxuICAgICAgICByZXR1cm5cblxuICAgIGNyZWF0ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgICBTR04ucmVxdWVzdFxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICAgICAgICAgIHVybDogU0dOLmNvbmZpZy5nZXQoJ2NvcmVVcmwnKSArICcvdjIvc2Vzc2lvbnMnXG4gICAgICAgICAgICBqc29uOiB0cnVlXG4gICAgICAgICAgICBxczpcbiAgICAgICAgICAgICAgICBhcGlfa2V5OiBTR04uY29uZmlnLmdldCAnYXBwS2V5J1xuICAgICAgICAgICAgICAgIHRva2VuX3R0bDogc2Vzc2lvbi50dGxcbiAgICAgICAgLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyclxuICAgICAgICAgICAgZWxzZSBpZiBkYXRhLnN0YXR1c0NvZGUgaXMgMjAxXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zYXZlVG9rZW4gZGF0YS5ib2R5LnRva2VuXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zYXZlQ2xpZW50SWQgZGF0YS5ib2R5LmNsaWVudF9pZFxuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyLCBkYXRhLmJvZHlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBjcmVhdGUgc2Vzc2lvbicpXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuICAgIFxuICAgIHVwZGF0ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgICBoZWFkZXJzID0ge31cbiAgICAgICAgdG9rZW4gPSBTR04uY29uZmlnLmdldCAnY29yZVNlc3Npb25Ub2tlbidcbiAgICAgICAgYXBwU2VjcmV0ID0gU0dOLmNvbmZpZy5nZXQgJ2FwcFNlY3JldCdcblxuICAgICAgICBoZWFkZXJzWydYLVRva2VuJ10gPSB0b2tlblxuICAgICAgICBoZWFkZXJzWydYLVNpZ25hdHVyZSddID0gc2Vzc2lvbi5zaWduIGFwcFNlY3JldCwgdG9rZW4gaWYgYXBwU2VjcmV0P1xuXG4gICAgICAgIFNHTi5yZXF1ZXN0XG4gICAgICAgICAgICB1cmw6IFNHTi5jb25maWcuZ2V0KCdjb3JlVXJsJykgKyAnL3YyL3Nlc3Npb25zJ1xuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAganNvbjogdHJ1ZVxuICAgICAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyXG4gICAgICAgICAgICBlbHNlIGlmIGRhdGEuc3RhdHVzQ29kZSBpcyAyMDBcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNhdmVUb2tlbiBkYXRhLmJvZHkudG9rZW5cbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNhdmVDbGllbnRJZCBkYXRhLmJvZHkuY2xpZW50X2lkXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBlcnIsIGRhdGEuYm9keVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG5ldyBFcnJvcignQ291bGQgbm90IHVwZGF0ZSBzZXNzaW9uJylcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZW5ldzogKGNhbGxiYWNrKSAtPlxuICAgICAgICBoZWFkZXJzID0ge31cbiAgICAgICAgdG9rZW4gPSBTR04uY29uZmlnLmdldCAnY29yZVNlc3Npb25Ub2tlbidcbiAgICAgICAgYXBwU2VjcmV0ID0gU0dOLmNvbmZpZy5nZXQgJ2FwcFNlY3JldCdcblxuICAgICAgICBoZWFkZXJzWydYLVRva2VuJ10gPSB0b2tlblxuICAgICAgICBoZWFkZXJzWydYLVNpZ25hdHVyZSddID0gc2Vzc2lvbi5zaWduIGFwcFNlY3JldCwgdG9rZW4gaWYgYXBwU2VjcmV0P1xuXG4gICAgICAgIFNHTi5yZXF1ZXN0XG4gICAgICAgICAgICBtZXRob2Q6ICdwdXQnXG4gICAgICAgICAgICB1cmw6IFNHTi5jb25maWcuZ2V0KCdjb3JlVXJsJykgKyAnL3YyL3Nlc3Npb25zJ1xuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICAgICAganNvbjogdHJ1ZVxuICAgICAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyXG4gICAgICAgICAgICBlbHNlIGlmIGRhdGEuc3RhdHVzQ29kZSBpcyAyMDBcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNhdmVUb2tlbiBkYXRhLmJvZHkudG9rZW5cbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNhdmVDbGllbnRJZCBkYXRhLmJvZHkuY2xpZW50X2lkXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBlcnIsIGRhdGEuYm9keVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG5ldyBFcnJvcignQ291bGQgbm90IHJlbmV3IHNlc3Npb24nKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIGVuc3VyZTogKGNhbGxiYWNrKSAtPlxuICAgICAgICBxdWV1ZUNvdW50ID0gY2FsbGJhY2tRdWV1ZS5sZW5ndGhcbiAgICAgICAgY29tcGxldGUgPSAoZXJyKSAtPlxuICAgICAgICAgICAgY2FsbGJhY2tRdWV1ZSA9IGNhbGxiYWNrUXVldWUuZmlsdGVyIChmbikgLT5cbiAgICAgICAgICAgICAgICBmbiBlcnJcblxuICAgICAgICAgICAgICAgIGZhbHNlXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIGNhbGxiYWNrUXVldWUucHVzaCBjYWxsYmFja1xuXG4gICAgICAgIGlmIHF1ZXVlQ291bnQgaXMgMFxuICAgICAgICAgICAgaWYgbm90IFNHTi5jb25maWcuZ2V0KCdjb3JlU2Vzc2lvblRva2VuJyk/XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5jcmVhdGUgY29tcGxldGVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzaWduOiAoYXBwU2VjcmV0LCB0b2tlbikgLT5cbiAgICAgICAgc2hhMjU2IFthcHBTZWNyZXQsIHRva2VuXS5qb2luKCcnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlc3Npb25cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBUcmFja2VyOiByZXF1aXJlICcuL3RyYWNrZXInXG5cbiAgICBQdWxzZTogcmVxdWlyZSAnLi9wdWxzZSdcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuXG5jbGFzcyBQdWxzZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAZGVzdHJveWVkID0gZmFsc2VcbiAgICAgICAgQGNvbm5lY3Rpb24gPSBAY29ubmVjdCgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAZGVzdHJveWVkID0gdHJ1ZVxuXG4gICAgICAgIEBjb25uZWN0aW9uLmNsb3NlKClcblxuICAgICAgICBAXG5cbiAgICBjb25uZWN0OiAtPlxuICAgICAgICBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldCBTR04uY29uZmlnLmdldCgnZXZlbnRzUHVsc2VVcmwnKVxuXG4gICAgICAgIGNvbm5lY3Rpb24ub25vcGVuID0gQG9uT3Blbi5iaW5kIEBcbiAgICAgICAgY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSBAb25NZXNzYWdlLmJpbmQgQFxuICAgICAgICBjb25uZWN0aW9uLm9uZXJyb3IgPSBAb25FcnJvci5iaW5kIEBcbiAgICAgICAgY29ubmVjdGlvbi5vbmNsb3NlID0gQG9uQ2xvc2UuYmluZCBAXG5cbiAgICAgICAgY29ubmVjdGlvblxuXG4gICAgb25PcGVuOiAtPlxuICAgICAgICBAdHJpZ2dlciAnb3BlbidcblxuICAgICAgICByZXR1cm5cblxuICAgIG9uTWVzc2FnZTogKGUpIC0+XG4gICAgICAgIHRyeVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2V2ZW50JywgSlNPTi5wYXJzZShlLmRhdGEpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBvbkVycm9yOiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIG9uQ2xvc2U6IC0+XG4gICAgICAgIGlmIEBkZXN0cm95ZWQgaXMgZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgICAgICAgICBAY29ubmVjdGlvbiA9IEBjb25uZWN0KClcblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgLCAyMDAwXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUHVsc2VcblxubW9kdWxlLmV4cG9ydHMgPSBQdWxzZVxuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuY2xpZW50TG9jYWxTdG9yYWdlID0gcmVxdWlyZSAnLi4vLi4vc3RvcmFnZS9jbGllbnRfbG9jYWwnXG5nZXRQb29sID0gLT5cbiAgICBkYXRhID0gY2xpZW50TG9jYWxTdG9yYWdlLmdldCAnZXZlbnQtdHJhY2tlci1wb29sJ1xuICAgIGRhdGEgPSBbXSBpZiBBcnJheS5pc0FycmF5KGRhdGEpIGlzIGZhbHNlXG5cbiAgICBkYXRhXG5wb29sID0gZ2V0UG9vbCgpXG5cbmNsaWVudExvY2FsU3RvcmFnZS5zZXQgJ2V2ZW50LXRyYWNrZXItcG9vbCcsIFtdXG5cbnRyeVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICd1bmxvYWQnLCAtPlxuICAgICAgICBwb29sID0gcG9vbC5jb25jYXQgZ2V0UG9vbCgpXG5cbiAgICAgICAgY2xpZW50TG9jYWxTdG9yYWdlLnNldCAnZXZlbnQtdHJhY2tlci1wb29sJywgcG9vbFxuXG4gICAgICAgIHJldHVyblxuICAgICwgZmFsc2VcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBUcmFja2VyXG4gICAgZGVmYXVsdE9wdGlvbnM6XG4gICAgICAgIHRyYWNrSWQ6IG51bGxcbiAgICAgICAgZGlzcGF0Y2hJbnRlcnZhbDogMzAwMFxuICAgICAgICBkaXNwYXRjaExpbWl0OiAxMDBcbiAgICAgICAgcG9vbExpbWl0OiAxMDAwXG4gICAgICAgIGRyeVJ1bjogZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBAZGVmYXVsdE9wdGlvbnNcbiAgICAgICAgICAgIEBba2V5XSA9IG9wdGlvbnNba2V5XSBvciB2YWx1ZVxuXG4gICAgICAgIEBkaXNwYXRjaGluZyA9IGZhbHNlXG4gICAgICAgIEBzZXNzaW9uID1cbiAgICAgICAgICAgIGlkOiBTR04udXRpbC51dWlkKClcbiAgICAgICAgQGNsaWVudCA9XG4gICAgICAgICAgICB0cmFja0lkOiBAdHJhY2tJZFxuICAgICAgICAgICAgaWQ6IFNHTi5jbGllbnQuaWRcbiAgICAgICAgQHZpZXcgPVxuICAgICAgICAgICAgcGF0aDogW11cbiAgICAgICAgICAgIHByZXZpb3VzUGF0aDogW11cbiAgICAgICAgICAgIHVyaTogbnVsbFxuICAgICAgICBAbG9jYXRpb24gPSB7fVxuICAgICAgICBAYXBwbGljYXRpb24gPSB7fVxuICAgICAgICBAaWRlbnRpdHkgPSB7fVxuXG4gICAgICAgICMgRGlzcGF0Y2ggZXZlbnRzIHBlcmlvZGljYWxseS5cbiAgICAgICAgQGludGVydmFsID0gc2V0SW50ZXJ2YWwgQGRpc3BhdGNoLmJpbmQoQCksIEBkaXNwYXRjaEludGVydmFsXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB0cmFja0V2ZW50OiAodHlwZSwgcHJvcGVydGllcyA9IHt9LCB2ZXJzaW9uID0gJzEuMC4wJykgLT5cbiAgICAgICAgdGhyb3cgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdFdmVudCB0eXBlIGlzIHJlcXVpcmVkJykpIGlmIHR5cGVvZiB0eXBlIGlzbnQgJ3N0cmluZydcbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAdHJhY2tJZD9cblxuICAgICAgICBwb29sLnB1c2hcbiAgICAgICAgICAgIGlkOiBTR04udXRpbC51dWlkKClcbiAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgICAgIHJlY29yZGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgc2VudEF0OiBudWxsXG4gICAgICAgICAgICBjbGllbnQ6XG4gICAgICAgICAgICAgICAgaWQ6IEBjbGllbnQuaWRcbiAgICAgICAgICAgICAgICB0cmFja0lkOiBAY2xpZW50LnRyYWNrSWRcbiAgICAgICAgICAgIGNvbnRleHQ6IEBnZXRDb250ZXh0KClcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcblxuICAgICAgICBwb29sLnNoaWZ0KCkgd2hpbGUgQGdldFBvb2xTaXplKCkgPiBAcG9vbExpbWl0XG5cbiAgICAgICAgQFxuXG4gICAgaWRlbnRpZnk6IChpZCkgLT5cbiAgICAgICAgQGlkZW50aXR5LmlkID0gaWRcblxuICAgICAgICBAXG5cbiAgICBzZXRMb2NhdGlvbjogKGxvY2F0aW9uID0ge30pIC0+XG4gICAgICAgIEBsb2NhdGlvbi5kZXRlcm1pbmVkQXQgPSBuZXcgRGF0ZShsb2NhdGlvbi50aW1lc3RhbXApLnRvSVNPU3RyaW5nKClcbiAgICAgICAgQGxvY2F0aW9uLmxhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGVcbiAgICAgICAgQGxvY2F0aW9uLmxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZVxuICAgICAgICBAbG9jYXRpb24uYWx0aXR1ZGUgPSBsb2NhdGlvbi5hbHRpdHVkZVxuICAgICAgICBAbG9jYXRpb24uYWNjdXJhY3kgPVxuICAgICAgICAgICAgaG9yaXpvbnRhbDogbG9jYXRpb24uYWNjdXJhY3k/Lmhvcml6b250YWxcbiAgICAgICAgICAgIHZlcnRpY2FsOiBsb2NhdGlvbi5hY2N1cmFjeT8udmVydGljYWxcbiAgICAgICAgQGxvY2F0aW9uLnNwZWVkID0gbG9jYXRpb24uc3BlZWRcbiAgICAgICAgQGxvY2F0aW9uLmZsb29yID0gbG9jYXRpb24uZmxvb3JcblxuICAgICAgICBAXG5cbiAgICBzZXRBcHBsaWNhdGlvbjogKGFwcGxpY2F0aW9uID0ge30pIC0+XG4gICAgICAgIEBhcHBsaWNhdGlvbi5uYW1lID0gYXBwbGljYXRpb24ubmFtZVxuICAgICAgICBAYXBwbGljYXRpb24udmVyc2lvbiA9IGFwcGxpY2F0aW9uLnZlcnNpb25cbiAgICAgICAgQGFwcGxpY2F0aW9uLmJ1aWxkID0gYXBwbGljYXRpb24uYnVpbGRcblxuICAgICAgICBAXG5cbiAgICBzZXRWaWV3OiAocGF0aCkgLT5cbiAgICAgICAgQHZpZXcucHJldmlvdXNQYXRoID0gQHZpZXcucGF0aFxuICAgICAgICBAdmlldy5wYXRoID0gcGF0aCBpZiBBcnJheS5pc0FycmF5KHBhdGgpIGlzIHRydWVcbiAgICAgICAgQHZpZXcudXJpID0gd2luZG93LmxvY2F0aW9uLmhyZWZcblxuICAgICAgICBAXG5cbiAgICBnZXRWaWV3OiAtPlxuICAgICAgICB2aWV3ID0ge31cblxuICAgICAgICB2aWV3LnBhdGggPSBAdmlldy5wYXRoIGlmIEB2aWV3LnBhdGgubGVuZ3RoID4gMFxuICAgICAgICB2aWV3LnByZXZpb3VzUGF0aCA9IEB2aWV3LnByZXZpb3VzUGF0aCBpZiBAdmlldy5wcmV2aW91c1BhdGgubGVuZ3RoID4gMFxuICAgICAgICB2aWV3LnVyaSA9IEB2aWV3LnVyaSBpZiBAdmlldy51cmk/XG5cbiAgICAgICAgdmlld1xuXG4gICAgZ2V0Q29udGV4dDogLT5cbiAgICAgICAgc2NyZWVuRGltZW5zaW9ucyA9IFNHTi51dGlsLmdldFNjcmVlbkRpbWVuc2lvbnMoKVxuICAgICAgICBvcyA9IFNHTi51dGlsLmdldE9TKClcbiAgICAgICAgY29udGV4dCA9XG4gICAgICAgICAgICB1c2VyQWdlbnQ6IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG4gICAgICAgICAgICBsb2NhbGU6IG5hdmlnYXRvci5sYW5ndWFnZVxuICAgICAgICAgICAgdGltZVpvbmU6XG4gICAgICAgICAgICAgICAgdXRjT2Zmc2V0U2Vjb25kczogU0dOLnV0aWwuZ2V0VXRjT2Zmc2V0U2Vjb25kcygpXG4gICAgICAgICAgICAgICAgdXRjRHN0T2Zmc2V0U2Vjb25kczogU0dOLnV0aWwuZ2V0VXRjRHN0T2Zmc2V0U2Vjb25kcygpXG4gICAgICAgICAgICBkZXZpY2U6XG4gICAgICAgICAgICAgICAgc2NyZWVuOlxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2NyZWVuRGltZW5zaW9ucy5waHlzaWNhbC53aWR0aFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNjcmVlbkRpbWVuc2lvbnMucGh5c2ljYWwuaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIGRlbnNpdHk6IHNjcmVlbkRpbWVuc2lvbnMuZGVuc2l0eVxuICAgICAgICAgICAgc2Vzc2lvbjpcbiAgICAgICAgICAgICAgICBpZDogQHNlc3Npb24uaWRcbiAgICAgICAgICAgIHZpZXc6IEBnZXRWaWV3KClcbiAgICAgICAgYXBwbGljYXRpb24gPVxuICAgICAgICAgICAgbmFtZTogQGFwcGxpY2F0aW9uLm5hbWVcbiAgICAgICAgICAgIHZlcnNpb246IEBhcHBsaWNhdGlvbi52ZXJzaW9uXG4gICAgICAgICAgICBidWlsZDogQGFwcGxpY2F0aW9uLmJ1aWxkXG4gICAgICAgIGNhbXBhaWduID1cbiAgICAgICAgICAgIHNvdXJjZTogU0dOLnV0aWwuZ2V0UXVlcnlQYXJhbSAndXRtX3NvdXJjZSdcbiAgICAgICAgICAgIG1lZGl1bTogU0dOLnV0aWwuZ2V0UXVlcnlQYXJhbSAndXRtX21lZGl1bSdcbiAgICAgICAgICAgIG5hbWU6IFNHTi51dGlsLmdldFF1ZXJ5UGFyYW0gJ3V0bV9jYW1wYWlnbidcbiAgICAgICAgICAgIHRlcm06IFNHTi51dGlsLmdldFF1ZXJ5UGFyYW0gJ3V0bV90ZXJtJ1xuICAgICAgICAgICAgY29udGVudDogU0dOLnV0aWwuZ2V0UXVlcnlQYXJhbSAndXRtX2NvbnRlbnQnXG4gICAgICAgIGxvYyA9XG4gICAgICAgICAgICBkZXRlcm1pbmVkQXQ6IEBsb2NhdGlvbi5kZXRlcm1pbmVkQXRcbiAgICAgICAgICAgIGxhdGl0dWRlOiBAbG9jYXRpb24ubGF0aXR1ZGVcbiAgICAgICAgICAgIGxvbmdpdHVkZTogQGxvY2F0aW9uLmxvbmdpdHVkZVxuICAgICAgICAgICAgYWx0aXR1ZGU6IEBsb2NhdGlvbi5hbHRpdHVkZVxuICAgICAgICAgICAgc3BlZWQ6IEBsb2NhdGlvbi5zcGVlZFxuICAgICAgICAgICAgZmxvb3I6IEBsb2NhdGlvbi5mbG9vclxuICAgICAgICAgICAgYWNjdXJhY3k6XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogQGxvY2F0aW9uLmFjY3VyYWN5Py5ob3Jpem9udGFsXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IEBsb2NhdGlvbi5hY2N1cmFjeT8udmVydGljYWxcblxuICAgICAgICAjIE9wZXJhdGluZyBzeXN0ZW0uXG4gICAgICAgIGNvbnRleHQub3MgPSBuYW1lOiBvcyBpZiBvcz9cblxuICAgICAgICAjIFNlc3Npb24gcmVmZXJyZXIuXG4gICAgICAgIGNvbnRleHQuc2Vzc2lvbi5yZWZlcnJlciA9IGRvY3VtZW50LnJlZmVycmVyIGlmIGRvY3VtZW50LnJlZmVycmVyLmxlbmd0aCA+IDBcblxuICAgICAgICAjIEFwcGxpY2F0aW9uLlxuICAgICAgICBbJ25hbWUnLCAndmVyc2lvbicsICdidWlsZCddLmZvckVhY2ggKGtleSkgLT5cbiAgICAgICAgICAgIGRlbGV0ZSBhcHBsaWNhdGlvbltrZXldIGlmIHR5cGVvZiBhcHBsaWNhdGlvbltrZXldIGlzbnQgJ3N0cmluZycgb3IgYXBwbGljYXRpb25ba2V5XS5sZW5ndGggaXMgMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNvbnRleHQuYXBwbGljYXRpb24gPSBhcHBsaWNhdGlvbiBpZiBPYmplY3Qua2V5cyhhcHBsaWNhdGlvbikubGVuZ3RoID4gMFxuXG4gICAgICAgICMgQ2FtcGFpZ24uXG4gICAgICAgIFsnc291cmNlJywgJ21lZGl1bScsICduYW1lJywgJ3Rlcm0nLCAnY29udGVudCddLmZvckVhY2ggKGtleSkgLT5cbiAgICAgICAgICAgIGRlbGV0ZSBjYW1wYWlnbltrZXldIGlmIHR5cGVvZiBjYW1wYWlnbltrZXldIGlzbnQgJ3N0cmluZycgb3IgY2FtcGFpZ25ba2V5XS5sZW5ndGggaXMgMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNvbnRleHQuY2FtcGFpZ24gPSBjYW1wYWlnbiBpZiBPYmplY3Qua2V5cyhjYW1wYWlnbikubGVuZ3RoID4gMFxuXG4gICAgICAgICMgTG9jYXRpb24uXG4gICAgICAgIFsnbGF0aXR1ZGUnLCAnbG9uZ2l0dWRlJywgJ2FsdGl0dWRlJywgJ3NwZWVkJywgJ2Zsb29yJ10uZm9yRWFjaCAoa2V5KSAtPlxuICAgICAgICAgICAgZGVsZXRlIGxvY1trZXldIGlmIHR5cGVvZiBsb2Nba2V5XSBpc250ICdudW1iZXInXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgZGVsZXRlIGxvYy5hY2N1cmFjeS5ob3Jpem9udGFsIGlmIHR5cGVvZiBsb2MuYWNjdXJhY3kuaG9yaXpvbnRhbCBpc250ICdudW1iZXInXG4gICAgICAgIGRlbGV0ZSBsb2MuYWNjdXJhY3kudmVydGljYWwgaWYgdHlwZW9mIGxvYy5hY2N1cmFjeS52ZXJ0aWNhbCBpc250ICdudW1iZXInXG4gICAgICAgIGRlbGV0ZSBsb2MuYWNjdXJhY3kgaWYgT2JqZWN0LmtleXMobG9jLmFjY3VyYWN5KS5sZW5ndGggaXMgMFxuICAgICAgICBkZWxldGUgbG9jLmRldGVybWluZWRBdCBpZiB0eXBlb2YgbG9jLmRldGVybWluZWRBdCBpc250ICdzdHJpbmcnIG9yIGxvYy5kZXRlcm1pbmVkQXQubGVuZ3RoIGlzIDBcbiAgICAgICAgY29udGV4dC5sb2NhdGlvbiA9IGxvYyBpZiBPYmplY3Qua2V5cyhsb2MpLmxlbmd0aCA+IDBcblxuICAgICAgICAjIFBlcnNvbiBpZGVudGlmaWVyLlxuICAgICAgICBjb250ZXh0LnBlcnNvbklkID0gQGlkZW50aXR5LmlkIGlmIEBpZGVudGl0eS5pZD9cblxuICAgICAgICBjb250ZXh0XG5cbiAgICBnZXRQb29sU2l6ZTogLT5cbiAgICAgICAgcG9vbC5sZW5ndGhcblxuICAgIGRpc3BhdGNoOiAtPlxuICAgICAgICByZXR1cm4gaWYgQGRpc3BhdGNoaW5nIGlzIHRydWUgb3IgQGdldFBvb2xTaXplKCkgaXMgMFxuICAgICAgICByZXR1cm4gcG9vbC5zcGxpY2UoMCwgQGRpc3BhdGNoTGltaXQpIGlmIEBkcnlSdW4gaXMgdHJ1ZVxuXG4gICAgICAgIGV2ZW50cyA9IHBvb2wuc2xpY2UgMCwgQGRpc3BhdGNoTGltaXRcbiAgICAgICAgbmFja3MgPSAwXG5cbiAgICAgICAgQGRpc3BhdGNoaW5nID0gdHJ1ZVxuXG4gICAgICAgIEBzaGlwIGV2ZW50cywgKGVyciwgcmVzcG9uc2UpID0+XG4gICAgICAgICAgICBAZGlzcGF0Y2hpbmcgPSBmYWxzZVxuXG4gICAgICAgICAgICBpZiBub3QgZXJyP1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmV2ZW50cy5mb3JFYWNoIChyZXNFdmVudCkgLT5cbiAgICAgICAgICAgICAgICAgICAgaWYgcmVzRXZlbnQuc3RhdHVzIGlzICd2YWxpZGF0aW9uX2Vycm9yJyBvciByZXNFdmVudC5zdGF0dXMgaXMgJ2FjaydcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvb2wgPSBwb29sLmZpbHRlciAocG9vbEV2ZW50KSAtPiBwb29sRXZlbnQuaWQgaXNudCByZXNFdmVudC5pZFxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICduYWNrJ1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFja3MrK1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICAgICAgIyBLZWVwIGRpc3BhdGNoaW5nIHVudGlsIHRoZSBwb29sIHNpemUgcmVhY2hlcyBhIHNhbmUgbGV2ZWwuXG4gICAgICAgICAgICAgICAgQGRpc3BhdGNoKCkgaWYgQGdldFBvb2xTaXplKCkgPj0gQGRpc3BhdGNoTGltaXQgYW5kIG5hY2tzIGlzIDBcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQFxuXG4gICAgc2hpcDogKGV2ZW50cyA9IFtdLCBjYWxsYmFjaykgLT5cbiAgICAgICAgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHVybCA9IFNHTi5jb25maWcuZ2V0ICdldmVudHNUcmFja1VybCdcbiAgICAgICAgcGF5bG9hZCA9IGV2ZW50czogZXZlbnRzLm1hcCAoZXZlbnQpIC0+XG4gICAgICAgICAgICBldmVudC5zZW50QXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcblxuICAgICAgICAgICAgZXZlbnRcblxuICAgICAgICBodHRwLm9wZW4gJ1BPU1QnLCB1cmxcbiAgICAgICAgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyICdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyICdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgaHR0cC50aW1lb3V0ID0gMTAwMCAqIDIwXG4gICAgICAgIGh0dHAub25sb2FkID0gLT5cbiAgICAgICAgICAgIGlmIGh0dHAuc3RhdHVzIGlzIDIwMFxuICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBudWxsLCBKU09OLnBhcnNlKGh0dHAucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgIGNhdGNoIGVyclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBKU09OJykpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdTZXJ2ZXIgZGlkIG5vdCBhY2NlcHQgcmVxdWVzdCcpKVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgaHR0cC5vbmVycm9yID0gLT5cbiAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignQ291bGQgbm90IHBlcmZvcm0gbmV0d29yayByZXF1ZXN0JykpXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBodHRwLnNlbmQgSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcblxuICAgICAgICBAXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgcmVxdWVzdDogcmVxdWlyZSAnLi9yZXF1ZXN0J1xuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuXG5wYXJzZUNvb2tpZXMgPSAoY29va2llcyA9IFtdKSAtPlxuICAgIHBhcnNlZENvb2tpZXMgPSB7fVxuXG4gICAgY29va2llcy5tYXAgKGNvb2tpZSkgLT5cbiAgICAgICAgcGFydHMgPSBjb29raWUuc3BsaXQgJzsgJ1xuICAgICAgICBrZXlWYWx1ZVBhaXIgPSBwYXJ0c1swXS5zcGxpdCAnPSdcbiAgICAgICAga2V5ID0ga2V5VmFsdWVQYWlyWzBdXG4gICAgICAgIHZhbHVlID0ga2V5VmFsdWVQYWlyWzFdXG5cbiAgICAgICAgcGFyc2VkQ29va2llc1trZXldID0gdmFsdWVcblxuICAgICAgICByZXR1cm5cbiAgICBcbiAgICBwYXJzZWRDb29raWVzXG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2spIC0+XG4gICAgdXJsID0gU0dOLmNvbmZpZy5nZXQgJ2dyYXBoVXJsJ1xuICAgIHRpbWVvdXQgPSAxMDAwICogMTJcbiAgICBhcHBLZXkgPSBTR04uY29uZmlnLmdldCAnYXBwS2V5J1xuICAgIGF1dGhUb2tlbiA9IFNHTi5jb25maWcuZ2V0ICdhdXRoVG9rZW4nXG4gICAgYXV0aFRva2VuQ29va2llTmFtZSA9ICdzaG9wZ3VuLWF1dGgtdG9rZW4nXG4gICAgb3B0aW9ucyA9XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgICAgIHVybDogdXJsXG4gICAgICAgIHRpbWVvdXQ6IHRpbWVvdXRcbiAgICAgICAganNvbjogdHJ1ZVxuICAgICAgICBoZWFkZXJzOiB7fVxuICAgICAgICBib2R5OlxuICAgICAgICAgICAgcXVlcnk6IG9wdGlvbnMucXVlcnlcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IG9wdGlvbnMub3BlcmF0aW9uTmFtZVxuICAgICAgICAgICAgdmFyaWFibGVzOiBvcHRpb25zLnZhcmlhYmxlc1xuXG4gICAgIyBBcHBseSBhdXRob3JpemF0aW9uIGhlYWRlciB3aGVuIGFwcCBrZXkgaXMgcHJvdmlkZWQgdG8gYXZvaWQgcmF0ZSBsaW1pdGluZy5cbiAgICBvcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgU0dOLnV0aWwuYnRvYShcImFwcC1rZXk6I3thcHBLZXl9XCIpIGlmIGFwcEtleT9cblxuICAgICMgU2V0IGNvb2tpZXMgbWFudWFsbHkgaW4gbm9kZS5qcy5cbiAgICBpZiBTR04udXRpbC5pc05vZGUoKSBhbmQgYXV0aFRva2VuP1xuICAgICAgICBvcHRpb25zLmNvb2tpZXMgPSBbXG4gICAgICAgICAgICBrZXk6IGF1dGhUb2tlbkNvb2tpZU5hbWVcbiAgICAgICAgICAgIHZhbHVlOiBhdXRoVG9rZW5cbiAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIF1cbiAgICBlbHNlIGlmIFNHTi51dGlsLmlzQnJvd3NlcigpXG4gICAgICAgIG9wdGlvbnMudXNlQ29va2llcyA9IHRydWVcblxuICAgIFNHTi5yZXF1ZXN0IG9wdGlvbnMsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgIGlmIGVycj9cbiAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignR3JhcGggcmVxdWVzdCBlcnJvcicpLFxuICAgICAgICAgICAgICAgIGNvZGU6ICdHcmFwaFJlcXVlc3RFcnJvcidcbiAgICAgICAgICAgIClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgIyBVcGRhdGUgYXV0aCB0b2tlbiBhcyBpdCBtaWdodCBoYXZlIGNoYW5nZWQuXG4gICAgICAgICAgICBpZiBTR04udXRpbC5pc05vZGUoKVxuICAgICAgICAgICAgICAgIGNvb2tpZXMgPSBwYXJzZUNvb2tpZXMgZGF0YS5oZWFkZXJzP1snc2V0LWNvb2tpZSddXG4gICAgICAgICAgICAgICAgYXV0aENvb2tpZSA9IGNvb2tpZXNbYXV0aFRva2VuQ29va2llTmFtZV1cblxuICAgICAgICAgICAgICAgIGlmIFNHTi5jb25maWcuZ2V0KCdhdXRoVG9rZW4nKSBpc250IGF1dGhDb29raWVcbiAgICAgICAgICAgICAgICAgICAgU0dOLmNvbmZpZy5zZXQgJ2F1dGhUb2tlbicsIGF1dGhDb29raWVcblxuICAgICAgICAgICAgaWYgZGF0YS5zdGF0dXNDb2RlIGlzIDIwMFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGwsIGRhdGEuYm9keVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignR3JhcGggQVBJIGVycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6ICdHcmFwaEFQSUVycm9yJ1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnN0YXR1c0NvZGVcbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXR1cm5cblxuXG4iLCJNaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcbmtleUNvZGVzID0gcmVxdWlyZSAnLi4vLi4va2V5X2NvZGVzJ1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uQ29udHJvbHNcbiAgICBjb25zdHJ1Y3RvcjogKGVsLCBAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAZWxzID1cbiAgICAgICAgICAgIHJvb3Q6IGVsXG4gICAgICAgICAgICBwcm9ncmVzczogZWwucXVlcnlTZWxlY3RvciAnLnNnbi1wcF9fcHJvZ3Jlc3MnXG4gICAgICAgICAgICBwcm9ncmVzc0JhcjogZWwucXVlcnlTZWxlY3RvciAnLnNnbi1wcC1wcm9ncmVzc19fYmFyJ1xuICAgICAgICAgICAgcHJvZ3Jlc3NMYWJlbDogZWwucXVlcnlTZWxlY3RvciAnLnNnbi1wcF9fcHJvZ3Jlc3MtbGFiZWwnXG4gICAgICAgICAgICBwcmV2Q29udHJvbDogZWwucXVlcnlTZWxlY3RvciAnLnNnbi1wcF9fY29udHJvbFtkYXRhLWRpcmVjdGlvbj1wcmV2XSdcbiAgICAgICAgICAgIG5leHRDb250cm9sOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19jb250cm9sW2RhdGEtZGlyZWN0aW9uPW5leHRdJ1xuXG4gICAgICAgIEBrZXlEb3duTGlzdGVuZXIgPSBTR04udXRpbC50aHJvdHRsZSBAa2V5RG93biwgMTUwLCBAXG4gICAgICAgIEBtb3VzZU1vdmVMaXN0ZW5lciA9IFNHTi51dGlsLnRocm90dGxlIEBtb3VzZU1vdmUsIDUwLCBAXG5cbiAgICAgICAgQGVscy5yb290LmFkZEV2ZW50TGlzdGVuZXIgJ2tleWRvd24nLCBAa2V5RG93bkxpc3RlbmVyLCBmYWxzZSBpZiBAb3B0aW9ucy5rZXlib2FyZCBpcyB0cnVlXG4gICAgICAgIEBlbHMucm9vdC5hZGRFdmVudExpc3RlbmVyICdtb3VzZW1vdmUnLCBAbW91c2VNb3ZlTGlzdGVuZXIsIGZhbHNlXG4gICAgICAgIEBlbHMucHJldkNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCBAcHJldkNsaWNrZWQuYmluZChAKSwgZmFsc2UgaWYgQGVscy5wcmV2Q29udHJvbD9cbiAgICAgICAgQGVscy5uZXh0Q29udHJvbC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIEBuZXh0Q2xpY2tlZC5iaW5kKEApLCBmYWxzZSBpZiBAZWxzLm5leHRDb250cm9sP1xuXG4gICAgICAgIEBiaW5kICdiZWZvcmVOYXZpZ2F0aW9uJywgQGJlZm9yZU5hdmlnYXRpb24uYmluZChAKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQGVscy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ2tleWRvd24nLCBAa2V5RG93bkxpc3RlbmVyXG4gICAgICAgIEBlbHMucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyICdtb3VzZW1vdmUnLCBAbW91c2VNb3ZlTGlzdGVuZXJcblxuICAgICAgICByZXR1cm5cblxuICAgIGJlZm9yZU5hdmlnYXRpb246IChlKSAtPlxuICAgICAgICBzaG93UHJvZ3Jlc3MgPSB0eXBlb2YgZS5wcm9ncmVzc0xhYmVsIGlzICdzdHJpbmcnIGFuZCBlLnByb2dyZXNzTGFiZWwubGVuZ3RoID4gMFxuICAgICAgICB2aXNpYmlsaXR5Q2xhc3NOYW1lID0gJ3Nnbi1wcC0taGlkZGVuJ1xuXG4gICAgICAgIGlmIEBlbHMucHJvZ3Jlc3M/IGFuZCBAZWxzLnByb2dyZXNzQmFyP1xuICAgICAgICAgICAgQGVscy5wcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IFwiI3tlLnByb2dyZXNzfSVcIlxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiBzaG93UHJvZ3Jlc3MgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgIEBlbHMucHJvZ3Jlc3MuY2xhc3NMaXN0LnJlbW92ZSB2aXNpYmlsaXR5Q2xhc3NOYW1lXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzcy5jbGFzc0xpc3QuYWRkIHZpc2liaWxpdHlDbGFzc05hbWVcblxuICAgICAgICBpZiBAZWxzLnByb2dyZXNzTGFiZWw/XG4gICAgICAgICAgICBpZiBzaG93UHJvZ3Jlc3MgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgIEBlbHMucHJvZ3Jlc3NMYWJlbC50ZXh0Q29udGVudCA9IGUucHJvZ3Jlc3NMYWJlbFxuICAgICAgICAgICAgICAgIEBlbHMucHJvZ3Jlc3NMYWJlbC5jbGFzc0xpc3QucmVtb3ZlIHZpc2liaWxpdHlDbGFzc05hbWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAZWxzLnByb2dyZXNzTGFiZWwuY2xhc3NMaXN0LmFkZCB2aXNpYmlsaXR5Q2xhc3NOYW1lXG5cbiAgICAgICAgaWYgQGVscy5wcmV2Q29udHJvbD9cbiAgICAgICAgICAgIGlmIGUudmVyc28ubmV3UG9zaXRpb24gaXMgMFxuICAgICAgICAgICAgICAgIEBlbHMucHJldkNvbnRyb2wuY2xhc3NMaXN0LmFkZCB2aXNpYmlsaXR5Q2xhc3NOYW1lXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQGVscy5wcmV2Q29udHJvbC5jbGFzc0xpc3QucmVtb3ZlIHZpc2liaWxpdHlDbGFzc05hbWVcblxuICAgICAgICBpZiBAZWxzLm5leHRDb250cm9sP1xuICAgICAgICAgICAgaWYgZS52ZXJzby5uZXdQb3NpdGlvbiBpcyBlLnBhZ2VTcHJlYWRDb3VudCAtIDFcbiAgICAgICAgICAgICAgICBAZWxzLm5leHRDb250cm9sLmNsYXNzTGlzdC5hZGQgdmlzaWJpbGl0eUNsYXNzTmFtZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEBlbHMubmV4dENvbnRyb2wuY2xhc3NMaXN0LnJlbW92ZSB2aXNpYmlsaXR5Q2xhc3NOYW1lXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmV2Q2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIEB0cmlnZ2VyICdwcmV2J1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgbmV4dENsaWNrZWQ6IChlKSAtPlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBAdHJpZ2dlciAnbmV4dCdcblxuICAgICAgICByZXR1cm5cblxuICAgIGtleURvd246IChlKSAtPlxuICAgICAgICBrZXlDb2RlID0gZS5rZXlDb2RlXG5cbiAgICAgICAgaWYga2V5Q29kZXMuQVJST1dfTEVGVCBpcyBrZXlDb2RlXG4gICAgICAgICAgICBAdHJpZ2dlciAncHJldicsIGR1cmF0aW9uOiAwXG4gICAgICAgIGVsc2UgaWYga2V5Q29kZXMuQVJST1dfUklHSFQgaXMga2V5Q29kZSBvciBrZXlDb2Rlcy5TUEFDRSBpcyBrZXlDb2RlXG4gICAgICAgICAgICBAdHJpZ2dlciAnbmV4dCcsIGR1cmF0aW9uOiAwXG4gICAgICAgIGVsc2UgaWYga2V5Q29kZXMuTlVNQkVSX09ORSBpcyBrZXlDb2RlXG4gICAgICAgICAgICBAdHJpZ2dlciAnZmlyc3QnLCBkdXJhdGlvbjogMFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgbW91c2VNb3ZlOiAtPlxuICAgICAgICBAZWxzLnJvb3QuZGF0YXNldC5tb3VzZU1vdmluZyA9IHRydWVcblxuICAgICAgICBjbGVhclRpbWVvdXQgQG1vdXNlTW92ZVRpbWVvdXRcblxuICAgICAgICBAbW91c2VNb3ZlVGltZW91dCA9IHNldFRpbWVvdXQgPT5cbiAgICAgICAgICAgIEBlbHMucm9vdC5kYXRhc2V0Lm1vdXNlTW92aW5nID0gZmFsc2VcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICwgNDAwMFxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25Db250cm9sc1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25Db250cm9sc1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5QYWdlU3ByZWFkcyA9IHJlcXVpcmUgJy4vcGFnZV9zcHJlYWRzJ1xuY2xpZW50TG9jYWxTdG9yYWdlID0gcmVxdWlyZSAnLi4vLi4vc3RvcmFnZS9jbGllbnRfbG9jYWwnXG5TR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25Db3JlXG4gICAgZGVmYXVsdHM6XG4gICAgICAgIHBhZ2VzOiBbXVxuICAgICAgICBwYWdlU3ByZWFkV2lkdGg6IDEwMFxuICAgICAgICBwYWdlU3ByZWFkTWF4Wm9vbVNjYWxlOiA0XG4gICAgICAgIGlkbGVEZWxheTogMTAwMFxuICAgICAgICByZXNpemVEZWxheTogNDAwXG4gICAgICAgIGNvbG9yOiAnI2ZmZmZmZidcblxuICAgIGNvbnN0cnVjdG9yOiAoZWwsIG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgQG9wdGlvbnMgPSBAbWFrZU9wdGlvbnMgb3B0aW9ucywgQGRlZmF1bHRzXG4gICAgICAgIEBwYWdlSWQgPSBAZ2V0T3B0aW9uICdwYWdlSWQnXG4gICAgICAgIEBlbHMgPVxuICAgICAgICAgICAgcm9vdDogZWxcbiAgICAgICAgICAgIHBhZ2VzOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19wYWdlcydcbiAgICAgICAgICAgIHZlcnNvOiBlbC5xdWVyeVNlbGVjdG9yICcudmVyc28nXG4gICAgICAgIEBwYWdlTW9kZSA9IEBnZXRQYWdlTW9kZSgpXG4gICAgICAgIEBwYWdlU3ByZWFkcyA9IG5ldyBQYWdlU3ByZWFkc1xuICAgICAgICAgICAgcGFnZXM6IEBnZXRPcHRpb24gJ3BhZ2VzJ1xuICAgICAgICAgICAgbWF4Wm9vbVNjYWxlOiBAZ2V0T3B0aW9uICdwYWdlU3ByZWFkTWF4Wm9vbVNjYWxlJ1xuICAgICAgICAgICAgd2lkdGg6IEBnZXRPcHRpb24gJ3BhZ2VTcHJlYWRXaWR0aCdcblxuICAgICAgICBAcGFnZVNwcmVhZHMuYmluZCAncGFnZUxvYWRlZCcsIEBwYWdlTG9hZGVkLmJpbmQoQClcbiAgICAgICAgQHBhZ2VTcHJlYWRzLmJpbmQgJ3BhZ2VzTG9hZGVkJywgQHBhZ2VzTG9hZGVkLmJpbmQoQClcblxuICAgICAgICBAc2V0Q29sb3IgQGdldE9wdGlvbignY29sb3InKVxuXG4gICAgICAgICMgSXQncyBpbXBvcnRhbnQgdG8gaW5zZXJ0IHRoZSBwYWdlIHNwcmVhZHMgYmVmb3JlIGluc3RhbnRpYXRpbmcgVmVyc28uXG4gICAgICAgIEBlbHMucGFnZXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUgQHBhZ2VTcHJlYWRzLnVwZGF0ZShAcGFnZU1vZGUpLmdldEZyYWcoKSwgQGVscy5wYWdlc1xuXG4gICAgICAgIEB2ZXJzbyA9IEBjcmVhdGVWZXJzbygpXG5cbiAgICAgICAgQGJpbmQgJ3N0YXJ0ZWQnLCBAc3RhcnQuYmluZChAKVxuICAgICAgICBAYmluZCAnZGVzdHJveWVkJywgQGRlc3Ryb3kuYmluZChAKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIEBnZXRWZXJzbygpLnN0YXJ0KClcblxuICAgICAgICBAdmlzaWJpbGl0eUNoYW5nZUxpc3RlbmVyID0gQHZpc2liaWxpdHlDaGFuZ2UuYmluZCBAXG4gICAgICAgIEByZXNpemVMaXN0ZW5lciA9IFNHTi51dGlsLnRocm90dGxlIEByZXNpemUsIEBnZXRPcHRpb24oJ3Jlc2l6ZURlbGF5JyksIEBcbiAgICAgICAgQHVubG9hZExpc3RlbmVyID0gQHVubG9hZC5iaW5kIEBcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICd2aXNpYmlsaXR5Y2hhbmdlJywgQHZpc2liaWxpdHlDaGFuZ2VMaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEByZXNpemVMaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ2JlZm9yZXVubG9hZCcsIEB1bmxvYWRMaXN0ZW5lciwgZmFsc2VcblxuICAgICAgICBAZWxzLnJvb3Quc2V0QXR0cmlidXRlICdkYXRhLXN0YXJ0ZWQnLCAnJ1xuICAgICAgICBAZWxzLnJvb3Quc2V0QXR0cmlidXRlICd0YWJpbmRleCcsICctMSdcbiAgICAgICAgQGVscy5yb290LmZvY3VzKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBnZXRWZXJzbygpLmRlc3Ryb3koKVxuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ3Zpc2liaWxpdHljaGFuZ2UnLCBAdmlzaWJpbGl0eUNoYW5nZUxpc3RlbmVyLCBmYWxzZVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyLCBmYWxzZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgbWFrZU9wdGlvbnM6IChvcHRpb25zLCBkZWZhdWx0cykgLT5cbiAgICAgICAgb3B0cyA9IHt9XG5cbiAgICAgICAgb3B0c1trZXldID0gb3B0aW9uc1trZXldID8gZGVmYXVsdHNba2V5XSBmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cbiAgICAgICAgb3B0c1xuXG4gICAgZ2V0T3B0aW9uOiAoa2V5KSAtPlxuICAgICAgICBAb3B0aW9uc1trZXldXG5cbiAgICBzZXRDb2xvcjogKGNvbG9yKSAtPlxuICAgICAgICBAZWxzLnJvb3QuZGF0YXNldC5jb2xvckJyaWdodG5lc3MgPSBTR04udXRpbC5nZXRDb2xvckJyaWdodG5lc3MgY29sb3JcbiAgICAgICAgQGVscy5yb290LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBjcmVhdGVWZXJzbzogLT5cbiAgICAgICAgVmVyc28gPSByZXF1aXJlICd2ZXJzby1icm93c2VyJ1xuICAgICAgICB2ZXJzbyA9IG5ldyBWZXJzbyBAZWxzLnZlcnNvLCBwYWdlSWQ6IEBwYWdlSWRcblxuICAgICAgICB2ZXJzby5wYWdlU3ByZWFkcy5mb3JFYWNoIEBvdmVycmlkZVBhZ2VTcHJlYWRDb250ZW50UmVjdC5iaW5kKEApXG5cbiAgICAgICAgdmVyc28uYmluZCAnYmVmb3JlTmF2aWdhdGlvbicsIEBiZWZvcmVOYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgQGFmdGVyTmF2aWdhdGlvbi5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ2F0dGVtcHRlZE5hdmlnYXRpb24nLCBAYXR0ZW1wdGVkTmF2aWdhdGlvbi5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ2NsaWNrZWQnLCBAY2xpY2tlZC5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ2RvdWJsZUNsaWNrZWQnLCBAZG91YmxlQ2xpY2tlZC5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ3ByZXNzZWQnLCBAcHJlc3NlZC5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ3BhblN0YXJ0JywgQHBhblN0YXJ0LmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAncGFuRW5kJywgQHBhbkVuZC5iaW5kKEApXG4gICAgICAgIHZlcnNvLmJpbmQgJ3pvb21lZEluJywgQHpvb21lZEluLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnem9vbWVkT3V0JywgQHpvb21lZE91dC5iaW5kKEApXG5cbiAgICAgICAgdmVyc29cblxuICAgIGdldFZlcnNvOiAtPlxuICAgICAgICBAdmVyc29cblxuICAgIGdldENvbnRlbnRSZWN0OiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgcmVjdCA9XG4gICAgICAgICAgICB0b3A6IDBcbiAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgIHJpZ2h0OiAwXG4gICAgICAgICAgICBib3R0b206IDBcbiAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgcGFnZUVscyA9IHBhZ2VTcHJlYWQuZ2V0UGFnZUVscygpXG4gICAgICAgIHBhZ2VFbCA9IHBhZ2VFbHNbMF1cbiAgICAgICAgcGFnZUNvdW50ID0gcGFnZUVscy5sZW5ndGhcbiAgICAgICAgc2NhbGUgPSBAZ2V0VmVyc28oKS50cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgcGFnZVdpZHRoID0gcGFnZUVsLm9mZnNldFdpZHRoICogcGFnZUNvdW50ICogc2NhbGVcbiAgICAgICAgcGFnZUhlaWdodCA9IHBhZ2VFbC5vZmZzZXRIZWlnaHQgKiBzY2FsZVxuICAgICAgICBpbWFnZVJhdGlvID0gK3BhZ2VFbC5kYXRhc2V0LmhlaWdodCAvICgrcGFnZUVsLmRhdGFzZXQud2lkdGggKiBwYWdlQ291bnQpXG4gICAgICAgIGFjdHVhbEhlaWdodCA9IHBhZ2VIZWlnaHRcbiAgICAgICAgYWN0dWFsV2lkdGggPSBhY3R1YWxIZWlnaHQgLyBpbWFnZVJhdGlvXG4gICAgICAgIGFjdHVhbFdpZHRoID0gTWF0aC5taW4gcGFnZVdpZHRoLCBhY3R1YWxXaWR0aFxuICAgICAgICBhY3R1YWxIZWlnaHQgPSBhY3R1YWxXaWR0aCAqIGltYWdlUmF0aW9cbiAgICAgICAgY2xpZW50UmVjdCA9IHBhZ2VFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICAgIHJlY3Qud2lkdGggPSBhY3R1YWxXaWR0aFxuICAgICAgICByZWN0LmhlaWdodCA9IGFjdHVhbEhlaWdodFxuICAgICAgICByZWN0LnRvcCA9IGNsaWVudFJlY3QudG9wICsgKHBhZ2VIZWlnaHQgLSBhY3R1YWxIZWlnaHQpIC8gMlxuICAgICAgICByZWN0LmxlZnQgPSBjbGllbnRSZWN0LmxlZnQgKyAocGFnZVdpZHRoIC0gYWN0dWFsV2lkdGgpIC8gMlxuICAgICAgICByZWN0LnJpZ2h0ID0gcmVjdC53aWR0aCArIHJlY3QubGVmdFxuICAgICAgICByZWN0LmJvdHRvbSA9IHJlY3QuaGVpZ2h0ICsgcmVjdC50b3BcblxuICAgICAgICByZWN0XG5cbiAgICBmb3JtYXRQcm9ncmVzc0xhYmVsOiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgcGFnZXMgPSBwYWdlU3ByZWFkPy5vcHRpb25zLnBhZ2VzID8gW11cbiAgICAgICAgcGFnZUlkcyA9IHBhZ2VzLm1hcCAocGFnZSkgLT4gcGFnZS5pZFxuICAgICAgICBwYWdlTGFiZWxzID0gcGFnZXMubWFwIChwYWdlKSAtPiBwYWdlLmxhYmVsXG4gICAgICAgIHBhZ2VDb3VudCA9IEBnZXRPcHRpb24oJ3BhZ2VzJykubGVuZ3RoXG4gICAgICAgIGxhYmVsID0gaWYgcGFnZUlkcy5sZW5ndGggPiAwIHRoZW4gcGFnZUxhYmVscy5qb2luKCctJykgKyAnIC8gJyArIHBhZ2VDb3VudCBlbHNlIG51bGxcblxuICAgICAgICBsYWJlbFxuXG4gICAgcmVuZGVyUGFnZVNwcmVhZHM6IC0+XG4gICAgICAgIEBnZXRWZXJzbygpLnBhZ2VTcHJlYWRzLmZvckVhY2ggKHBhZ2VTcHJlYWQpID0+XG4gICAgICAgICAgICB2aXNpYmlsaXR5ID0gcGFnZVNwcmVhZC5nZXRWaXNpYmlsaXR5KClcbiAgICAgICAgICAgIG1hdGNoID0gQHBhZ2VTcHJlYWRzLmdldCBwYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICAgICAgaWYgbWF0Y2g/XG4gICAgICAgICAgICAgICAgaWYgdmlzaWJpbGl0eSBpcyAndmlzaWJsZScgYW5kIG1hdGNoLmNvbnRlbnRzUmVuZGVyZWQgaXMgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCBtYXRjaC5yZW5kZXJDb250ZW50cy5iaW5kKG1hdGNoKSwgMFxuICAgICAgICAgICAgICAgIGlmIHZpc2liaWxpdHkgaXMgJ2dvbmUnIGFuZCBtYXRjaC5jb250ZW50c1JlbmRlcmVkIGlzIHRydWVcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCBtYXRjaC5jbGVhckNvbnRlbnRzLmJpbmQobWF0Y2gpLCAwXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBcblxuICAgIGZpbmRQYWdlOiAocGFnZUlkKSAtPlxuICAgICAgICBAZ2V0T3B0aW9uKCdwYWdlcycpLmZpbmQgKHBhZ2UpIC0+IHBhZ2UuaWQgaXMgcGFnZUlkXG5cbiAgICBwYWdlTG9hZGVkOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwYWdlc0xvYWRlZDogKGUpIC0+XG4gICAgICAgIEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGJlZm9yZU5hdmlnYXRpb246IChlKSAtPlxuICAgICAgICBwb3NpdGlvbiA9IGUubmV3UG9zaXRpb25cbiAgICAgICAgdmVyc29QYWdlU3ByZWFkID0gQGdldFZlcnNvKCkuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBwb3NpdGlvblxuICAgICAgICBwYWdlU3ByZWFkID0gQHBhZ2VTcHJlYWRzLmdldCB2ZXJzb1BhZ2VTcHJlYWQuZ2V0SWQoKVxuICAgICAgICBwYWdlU3ByZWFkQ291bnQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkQ291bnQoKVxuICAgICAgICBwcm9ncmVzcyA9IChwb3NpdGlvbiArIDEpIC8gcGFnZVNwcmVhZENvdW50ICogMTAwXG4gICAgICAgIHByb2dyZXNzTGFiZWwgPSBAZm9ybWF0UHJvZ3Jlc3NMYWJlbCBwYWdlU3ByZWFkXG5cbiAgICAgICAgQHJlbmRlclBhZ2VTcHJlYWRzKClcbiAgICAgICAgQHJlc2V0SWRsZVRpbWVyKClcbiAgICAgICAgQHN0YXJ0SWRsZVRpbWVyKClcbiAgICAgICAgQHRyaWdnZXIgJ2JlZm9yZU5hdmlnYXRpb24nLFxuICAgICAgICAgICAgdmVyc286IGVcbiAgICAgICAgICAgIHBhZ2VTcHJlYWQ6IHBhZ2VTcHJlYWRcbiAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzc1xuICAgICAgICAgICAgcHJvZ3Jlc3NMYWJlbDogcHJvZ3Jlc3NMYWJlbFxuICAgICAgICAgICAgcGFnZVNwcmVhZENvdW50OiBwYWdlU3ByZWFkQ291bnRcblxuICAgICAgICByZXR1cm5cblxuICAgIGFmdGVyTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHBvc2l0aW9uID0gZS5uZXdQb3NpdGlvblxuICAgICAgICB2ZXJzb1BhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIHBvc2l0aW9uXG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAcGFnZVNwcmVhZHMuZ2V0IHZlcnNvUGFnZVNwcmVhZC5nZXRJZCgpXG5cbiAgICAgICAgQHRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsXG4gICAgICAgICAgICB2ZXJzbzogZVxuICAgICAgICAgICAgcGFnZVNwcmVhZDogcGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYXR0ZW1wdGVkTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgdmVyc286IGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGNsaWNrZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLmlzSW5zaWRlQ29udGVudFxuICAgICAgICAgICAgcGFnZUlkID0gZS5wYWdlRWwuZGF0YXNldC5pZFxuICAgICAgICAgICAgcGFnZSA9IEBmaW5kUGFnZSBwYWdlSWRcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ2NsaWNrZWQnLCB2ZXJzbzogZSwgcGFnZTogcGFnZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZG91YmxlQ2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGlmIGUuaXNJbnNpZGVDb250ZW50XG4gICAgICAgICAgICBwYWdlSWQgPSBlLnBhZ2VFbC5kYXRhc2V0LmlkXG4gICAgICAgICAgICBwYWdlID0gQGZpbmRQYWdlIHBhZ2VJZFxuXG4gICAgICAgICAgICBAdHJpZ2dlciAnZG91YmxlQ2xpY2tlZCcsIHZlcnNvOiBlLCBwYWdlOiBwYWdlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzc2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS5pc0luc2lkZUNvbnRlbnRcbiAgICAgICAgICAgIHBhZ2VJZCA9IGUucGFnZUVsLmRhdGFzZXQuaWRcbiAgICAgICAgICAgIHBhZ2UgPSBAZmluZFBhZ2UgcGFnZUlkXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdwcmVzc2VkJywgdmVyc286IGUsIHBhZ2U6IHBhZ2VcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhblN0YXJ0OiAtPlxuICAgICAgICBAcmVzZXRJZGxlVGltZXIoKVxuICAgICAgICBAdHJpZ2dlciAncGFuU3RhcnQnLCBzY2FsZTogQGdldFZlcnNvKCkudHJhbnNmb3JtLnNjYWxlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwYW5FbmQ6IC0+XG4gICAgICAgIEBzdGFydElkbGVUaW1lcigpXG4gICAgICAgIEB0cmlnZ2VyICdwYW5FbmQnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB6b29tZWRJbjogKGUpIC0+XG4gICAgICAgIHBvc2l0aW9uID0gZS5wb3NpdGlvblxuICAgICAgICB2ZXJzb1BhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIHBvc2l0aW9uXG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAcGFnZVNwcmVhZHMuZ2V0IHZlcnNvUGFnZVNwcmVhZC5nZXRJZCgpXG5cbiAgICAgICAgcGFnZVNwcmVhZC56b29tSW4oKSBpZiBwYWdlU3ByZWFkP1xuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtem9vbWVkLWluJywgdHJ1ZVxuICAgICAgICBAdHJpZ2dlciAnem9vbWVkSW4nLCB2ZXJzbzogZSwgcGFnZVNwcmVhZDogcGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgem9vbWVkT3V0OiAoZSkgLT5cbiAgICAgICAgcG9zaXRpb24gPSBlLnBvc2l0aW9uXG4gICAgICAgIHZlcnNvUGFnZVNwcmVhZCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgcGFnZVNwcmVhZCA9IEBwYWdlU3ByZWFkcy5nZXQgdmVyc29QYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBwYWdlU3ByZWFkLnpvb21PdXQoKSBpZiBwYWdlU3ByZWFkP1xuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtem9vbWVkLWluJywgZmFsc2VcbiAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHZlcnNvOiBlLCBwYWdlU3ByZWFkOiBwYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRQYWdlTW9kZTogLT5cbiAgICAgICAgcGFnZU1vZGUgPSBAZ2V0T3B0aW9uICdwYWdlTW9kZSdcblxuICAgICAgICBpZiBub3QgcGFnZU1vZGU/XG4gICAgICAgICAgICB3aWR0aCA9IEBlbHMucm9vdC5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgaGVpZ2h0ID0gQGVscy5yb290Lm9mZnNldEhlaWdodFxuXG4gICAgICAgICAgICBwYWdlTW9kZSA9IGlmIGhlaWdodCA+PSB3aWR0aCB0aGVuICdzaW5nbGUnIGVsc2UgJ2RvdWJsZSdcblxuICAgICAgICBwYWdlTW9kZVxuXG4gICAgcmVzZXRJZGxlVGltZXI6IC0+XG4gICAgICAgIGNsZWFyVGltZW91dCBAaWRsZVRpbWVvdXRcblxuICAgICAgICBAZWxzLnJvb3Quc2V0QXR0cmlidXRlICdkYXRhLWlkbGUnLCBmYWxzZVxuXG4gICAgICAgIEBcblxuICAgIHN0YXJ0SWRsZVRpbWVyOiAtPlxuICAgICAgICBAaWRsZVRpbWVvdXQgPSBzZXRUaW1lb3V0ID0+XG4gICAgICAgICAgICBAZWxzLnJvb3Quc2V0QXR0cmlidXRlICdkYXRhLWlkbGUnLCB0cnVlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAsIEBnZXRPcHRpb24oJ2lkbGVEZWxheScpXG5cbiAgICAgICAgQFxuXG4gICAgc3dpdGNoUGFnZU1vZGU6IChwYWdlTW9kZSkgLT5cbiAgICAgICAgcmV0dXJuIEAgaWYgQHBhZ2VNb2RlIGlzIHBhZ2VNb2RlXG5cbiAgICAgICAgdmVyc28gPSBAZ2V0VmVyc28oKVxuICAgICAgICBwYWdlSWRzID0gdmVyc28uZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbih2ZXJzby5nZXRQb3NpdGlvbigpKS5nZXRQYWdlSWRzKClcbiAgICAgICAgcGFnZVNwcmVhZEVscyA9IEBnZXRWZXJzbygpLmVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy5zZ24tcHBfX3BhZ2Utc3ByZWFkJ1xuXG4gICAgICAgIEBwYWdlTW9kZSA9IHBhZ2VNb2RlXG5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLnVwZGF0ZSBAcGFnZU1vZGVcblxuICAgICAgICBwYWdlU3ByZWFkRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBwYWdlU3ByZWFkRWwgZm9yIHBhZ2VTcHJlYWRFbCBpbiBwYWdlU3ByZWFkRWxzXG4gICAgICAgIEBlbHMucGFnZXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUgQHBhZ2VTcHJlYWRzLmdldEZyYWcoKSwgQGVscy5wYWdlc1xuXG4gICAgICAgIHZlcnNvLnJlZnJlc2goKVxuICAgICAgICB2ZXJzby5uYXZpZ2F0ZVRvIHZlcnNvLmdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQocGFnZUlkc1swXSksIGR1cmF0aW9uOiAwXG4gICAgICAgIHZlcnNvLnBhZ2VTcHJlYWRzLmZvckVhY2ggQG92ZXJyaWRlUGFnZVNwcmVhZENvbnRlbnRSZWN0LmJpbmQoQClcblxuICAgICAgICBAXG5cbiAgICBvdmVycmlkZVBhZ2VTcHJlYWRDb250ZW50UmVjdDogKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGlmIHBhZ2VTcHJlYWQuZ2V0VHlwZSgpIGlzICdwYWdlJ1xuICAgICAgICAgICAgcGFnZVNwcmVhZC5nZXRDb250ZW50UmVjdCA9ID0+IEBnZXRDb250ZW50UmVjdCBwYWdlU3ByZWFkXG5cbiAgICB2aXNpYmlsaXR5Q2hhbmdlOiAtPlxuICAgICAgICBwYWdlU3ByZWFkID0gQGdldFZlcnNvKCkuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBAZ2V0VmVyc28oKS5nZXRQb3NpdGlvbigpXG4gICAgICAgIGV2ZW50TmFtZSA9IGlmIGRvY3VtZW50LmhpZGRlbiBpcyB0cnVlIHRoZW4gJ2Rpc2FwcGVhcmVkJyBlbHNlICdhcHBlYXJlZCdcblxuICAgICAgICBAdHJpZ2dlciBldmVudE5hbWUsIHBhZ2VTcHJlYWQ6IEBwYWdlU3ByZWFkcy5nZXQocGFnZVNwcmVhZC5pZClcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlc2l6ZTogLT5cbiAgICAgICAgcGFnZU1vZGUgPSBAZ2V0UGFnZU1vZGUoKVxuXG4gICAgICAgIGlmIG5vdCBAZ2V0T3B0aW9uKCdwYWdlTW9kZScpPyBhbmQgcGFnZU1vZGUgaXNudCBAcGFnZU1vZGVcbiAgICAgICAgICAgIEBzd2l0Y2hQYWdlTW9kZSBwYWdlTW9kZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAdHJpZ2dlciAncmVzaXplZCdcblxuICAgICAgICByZXR1cm5cblxuICAgIHVubG9hZDogLT5cbiAgICAgICAgQHRyaWdnZXIgJ2Rpc2FwcGVhcmVkJ1xuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25Db3JlXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkNvcmVcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uRXZlbnRUcmFja2luZ1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAaGlkZGVuID0gdHJ1ZVxuICAgICAgICBAcGFnZVNwcmVhZCA9IG51bGxcblxuICAgICAgICBAYmluZCAnYXBwZWFyZWQnLCBAYXBwZWFyZWQuYmluZChAKVxuICAgICAgICBAYmluZCAnZGlzYXBwZWFyZWQnLCBAZGlzYXBwZWFyZWQuYmluZChAKVxuICAgICAgICBAYmluZCAnYmVmb3JlTmF2aWdhdGlvbicsIEBiZWZvcmVOYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ2FmdGVyTmF2aWdhdGlvbicsIEBhZnRlck5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICBAYmluZCAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIEBhdHRlbXB0ZWROYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ2NsaWNrZWQnLCBAY2xpY2tlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkb3VibGVDbGlja2VkJywgQGRvdWJsZUNsaWNrZWQuYmluZChAKVxuICAgICAgICBAYmluZCAncHJlc3NlZCcsIEBwcmVzc2VkLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3BhblN0YXJ0JywgQHBhblN0YXJ0LmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3pvb21lZEluJywgQHpvb21lZEluLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3pvb21lZE91dCcsIEB6b29tZWRPdXQuYmluZChAKVxuICAgICAgICBAYmluZCAnZGVzdHJveWVkJywgQGRlc3Ryb3kuYmluZChAKVxuXG4gICAgICAgIEB0cmFja09wZW5lZCgpXG4gICAgICAgIEB0cmFja0FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKVxuICAgICAgICBAdHJhY2tEaXNhcHBlYXJlZCgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB0cmFja0V2ZW50OiAodHlwZSwgcHJvcGVydGllcyA9IHt9KSAtPlxuICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsIHR5cGU6IHR5cGUsIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcblxuICAgICAgICByZXR1cm5cblxuICAgIHRyYWNrT3BlbmVkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLW9wZW5lZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja0FwcGVhcmVkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLWFwcGVhcmVkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrRGlzYXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tZGlzYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlQ2xpY2tlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLWNsaWNrZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlRG91YmxlQ2xpY2tlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLWRvdWJsZS1jbGlja2VkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrUGFnZUxvbmdQcmVzc2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtbG9uZy1wcmVzc2VkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrUGFnZUhvdHNwb3RzQ2xpY2tlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLWhvdHNwb3RzLWNsaWNrZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkQXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkRGlzYXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtZGlzYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkWm9vbWVkSW46IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtem9vbWVkLWluJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrUGFnZVNwcmVhZFpvb21lZE91dDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC16b29tZWQtb3V0JywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIGFwcGVhcmVkOiAoZSkgLT5cbiAgICAgICAgQHRyYWNrQXBwZWFyZWQoKVxuICAgICAgICBAcGFnZVNwcmVhZEFwcGVhcmVkIGUucGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGlzYXBwZWFyZWQ6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKVxuICAgICAgICBAdHJhY2tEaXNhcHBlYXJlZCgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBiZWZvcmVOYXZpZ2F0aW9uOiAtPlxuICAgICAgICBAcGFnZVNwcmVhZERpc2FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGFmdGVyTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIEBwYWdlU3ByZWFkQXBwZWFyZWQgZS5wYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhdHRlbXB0ZWROYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRBcHBlYXJlZCBlLnBhZ2VTcHJlYWRcblxuICAgICAgICByZXR1cm5cblxuICAgIGNsaWNrZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLnBhZ2U/XG4gICAgICAgICAgICBwcm9wZXJ0aWVzID1cbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyOiBlLnBhZ2UucGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHg6IGUudmVyc28ucGFnZVhcbiAgICAgICAgICAgICAgICB5OiBlLnZlcnNvLnBhZ2VZXG5cbiAgICAgICAgICAgIEB0cmFja1BhZ2VDbGlja2VkIHBhZ2VkUHVibGljYXRpb25QYWdlOiBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBAdHJhY2tQYWdlSG90c3BvdHNDbGlja2VkIHBhZ2VkUHVibGljYXRpb25QYWdlOiBwcm9wZXJ0aWVzIGlmIGUudmVyc28ub3ZlcmxheUVscy5sZW5ndGggPiAwXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkb3VibGVDbGlja2VkOiAoZSkgPT5cbiAgICAgICAgaWYgZS5wYWdlP1xuICAgICAgICAgICAgQHRyYWNrUGFnZURvdWJsZUNsaWNrZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2U6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcjogZS5wYWdlLnBhZ2VOdW1iZXJcbiAgICAgICAgICAgICAgICB4OiBlLnZlcnNvLnBhZ2VYXG4gICAgICAgICAgICAgICAgeTogZS52ZXJzby5wYWdlWVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcHJlc3NlZDogKGUpIC0+XG4gICAgICAgIGlmIGUucGFnZT9cbiAgICAgICAgICAgIEB0cmFja1BhZ2VMb25nUHJlc3NlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZTpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyOiBlLnBhZ2UucGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHg6IGUudmVyc28ucGFnZVhcbiAgICAgICAgICAgICAgICB5OiBlLnZlcnNvLnBhZ2VZXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwYW5TdGFydDogKGUpIC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKSBpZiBlLnNjYWxlIGlzIDFcblxuICAgICAgICByZXR1cm5cblxuICAgIHpvb21lZEluOiAoZSkgLT5cbiAgICAgICAgaWYgZS5wYWdlU3ByZWFkP1xuICAgICAgICAgICAgQHRyYWNrUGFnZVNwcmVhZFpvb21lZEluIHBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkOlxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXJzOiBlLnBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgIHJldHVyblxuXG4gICAgem9vbWVkT3V0OiAoZSkgLT5cbiAgICAgICAgaWYgZS5wYWdlU3ByZWFkP1xuICAgICAgICAgICAgQHRyYWNrUGFnZVNwcmVhZFpvb21lZE91dCBwYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZDpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyczogZS5wYWdlU3ByZWFkLmdldFBhZ2VzKCkubWFwIChwYWdlKSAtPiBwYWdlLnBhZ2VOdW1iZXJcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VTcHJlYWRBcHBlYXJlZDogKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGlmIHBhZ2VTcHJlYWQ/IGFuZCBAaGlkZGVuIGlzIHRydWVcbiAgICAgICAgICAgIEBwYWdlU3ByZWFkID0gcGFnZVNwcmVhZFxuXG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkQXBwZWFyZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQ6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcnM6IHBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgICAgICBAaGlkZGVuID0gZmFsc2VcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VTcHJlYWREaXNhcHBlYXJlZDogLT5cbiAgICAgICAgaWYgQHBhZ2VTcHJlYWQ/IGFuZCBAaGlkZGVuIGlzIGZhbHNlXG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkRGlzYXBwZWFyZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQ6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcnM6IEBwYWdlU3ByZWFkLmdldFBhZ2VzKCkubWFwIChwYWdlKSAtPiBwYWdlLnBhZ2VOdW1iZXJcblxuICAgICAgICAgICAgQGhpZGRlbiA9IHRydWVcbiAgICAgICAgICAgIEBwYWdlU3ByZWFkID0gbnVsbFxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25FdmVudFRyYWNraW5nXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkV2ZW50VHJhY2tpbmdcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuR2F0b3IgPSByZXF1aXJlICdnYXRvcidcbk11c3RhY2hlID0gcmVxdWlyZSAnbXVzdGFjaGUnXG50ZW1wbGF0ZSA9IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2hvdHNwb3RfcGlja2VyJ1xua2V5Q29kZXMgPSByZXF1aXJlICcuLi8uLi9rZXlfY29kZXMnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25Ib3RzcG90UGlja2VyXG4gICAgY29uc3RydWN0b3I6IChAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgICAgIEByZXNpemVMaXN0ZW5lciA9IEByZXNpemUuYmluZCBAXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZW5kZXI6IC0+XG4gICAgICAgIHdpZHRoID0gQG9wdGlvbnMud2lkdGggPyAxMDBcbiAgICAgICAgaGVhZGVyID0gQG9wdGlvbnMuaGVhZGVyXG4gICAgICAgIHRlbXBsYXRlID0gQG9wdGlvbnMudGVtcGxhdGUgaWYgQG9wdGlvbnMudGVtcGxhdGU/XG4gICAgICAgIHRyaWdnZXIgPSBAdHJpZ2dlci5iaW5kIEBcbiAgICAgICAgdmlldyA9XG4gICAgICAgICAgICBoZWFkZXI6IGhlYWRlclxuICAgICAgICAgICAgaG90c3BvdHM6IEBvcHRpb25zLmhvdHNwb3RzXG4gICAgICAgICAgICB0b3A6IEBvcHRpb25zLnlcbiAgICAgICAgICAgIGxlZnQ6IEBvcHRpb25zLnhcblxuICAgICAgICBAZWwuY2xhc3NOYW1lID0gJ3Nnbi1wcF9faG90c3BvdC1waWNrZXInXG4gICAgICAgIEBlbC5zZXRBdHRyaWJ1dGUgJ3RhYmluZGV4JywgLTFcbiAgICAgICAgQGVsLmlubmVySFRNTCA9IE11c3RhY2hlLnJlbmRlciB0ZW1wbGF0ZSwgdmlld1xuXG4gICAgICAgIHBvcG92ZXJFbCA9IEBlbC5xdWVyeVNlbGVjdG9yICcuc2duX19wb3BvdmVyJ1xuICAgICAgICB3aWR0aCA9IHBvcG92ZXJFbC5vZmZzZXRXaWR0aFxuICAgICAgICBoZWlnaHQgPSBwb3BvdmVyRWwub2Zmc2V0SGVpZ2h0XG4gICAgICAgIHBhcmVudFdpZHRoID0gQGVsLnBhcmVudE5vZGUub2Zmc2V0V2lkdGhcbiAgICAgICAgcGFyZW50SGVpZ2h0ID0gQGVsLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgaWYgdmlldy50b3AgKyBoZWlnaHQgPiBwYXJlbnRIZWlnaHRcbiAgICAgICAgICAgIHBvcG92ZXJFbC5zdHlsZS50b3AgPSBwYXJlbnRIZWlnaHQgLSBoZWlnaHQgKyAncHgnXG5cbiAgICAgICAgaWYgdmlldy5sZWZ0ICsgd2lkdGggPiBwYXJlbnRXaWR0aFxuICAgICAgICAgICAgcG9wb3ZlckVsLnN0eWxlLmxlZnQgPSBwYXJlbnRXaWR0aCAtIHdpZHRoICsgJ3B4J1xuXG4gICAgICAgIEBlbC5hZGRFdmVudExpc3RlbmVyICdrZXl1cCcsIEBrZXlVcC5iaW5kKEApXG5cbiAgICAgICAgR2F0b3IoQGVsKS5vbiAnY2xpY2snLCAnW2RhdGEtaWRdJywgLT5cbiAgICAgICAgICAgIHRyaWdnZXIgJ3NlbGVjdGVkJywgaWQ6IEBnZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBHYXRvcihAZWwpLm9uICdjbGljaycsICdbZGF0YS1jbG9zZV0nLCBAZGVzdHJveS5iaW5kKEApXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEByZXNpemVMaXN0ZW5lciwgZmFsc2VcblxuICAgICAgICBAXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBAZWxcblxuICAgICAgICBAdHJpZ2dlciAnZGVzdHJveWVkJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAga2V5VXA6IChlKSAtPlxuICAgICAgICBAZGVzdHJveSgpIGlmIGUua2V5Q29kZSBpcyBrZXlDb2Rlcy5FU0NcbiAgICAgICAgXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplOiAtPlxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyXG5cbiAgICAgICAgQGRlc3Ryb3koKVxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25Ib3RzcG90UGlja2VyXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RQaWNrZXJcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuTXVzdGFjaGUgPSByZXF1aXJlICdtdXN0YWNoZSdcbnRlbXBsYXRlID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaG90c3BvdCdcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RzXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBjdXJyZW50UGFnZVNwcmVhZElkID0gbnVsbFxuICAgICAgICBAcGFnZVNwcmVhZHNMb2FkZWQgPSB7fVxuICAgICAgICBAY2FjaGUgPSB7fVxuXG4gICAgICAgIEBiaW5kICdob3RzcG90c1JlY2VpdmVkJywgQGhvdHNwb3RzUmVjZWl2ZWQuYmluZChAKVxuICAgICAgICBAYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgQGFmdGVyTmF2aWdhdGlvbi5iaW5kKEApXG4gICAgICAgIEBiaW5kICdwYWdlc0xvYWRlZCcsIEBwYWdlc0xvYWRlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdyZXNpemVkJywgQHJlc2l6ZWQuYmluZChAKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVuZGVySG90c3BvdHM6IChkYXRhKSAtPlxuICAgICAgICBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICAgIGNvbnRlbnRSZWN0ID0gZGF0YS52ZXJzb1BhZ2VTcHJlYWQuZ2V0Q29udGVudFJlY3QoKVxuICAgICAgICBwYWdlU3ByZWFkRWwgPSBkYXRhLnBhZ2VTcHJlYWQuZ2V0RWwoKVxuICAgICAgICBob3RzcG90RWxzID0gcGFnZVNwcmVhZEVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy5zZ24tcHBfX2hvdHNwb3QnXG5cbiAgICAgICAgaG90c3BvdEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQgaG90c3BvdEVsIGZvciBob3RzcG90RWwgaW4gaG90c3BvdEVsc1xuXG4gICAgICAgIGZvciBpZCwgaG90c3BvdCBvZiBkYXRhLmhvdHNwb3RzXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbiBkYXRhLnBhZ2VzLCBkYXRhLnJhdGlvLCBob3RzcG90XG4gICAgICAgICAgICBlbCA9IEByZW5kZXJIb3RzcG90IGhvdHNwb3QsIHBvc2l0aW9uLCBjb250ZW50UmVjdFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkIGVsXG5cbiAgICAgICAgcGFnZVNwcmVhZEVsLmFwcGVuZENoaWxkIGZyYWdcblxuICAgICAgICBAXG5cbiAgICByZW5kZXJIb3RzcG90OiAoaG90c3BvdCwgcG9zaXRpb24sIGNvbnRlbnRSZWN0KSAtPlxuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgdG9wID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC5oZWlnaHQgLyAxMDAgKiBwb3NpdGlvbi50b3BcbiAgICAgICAgbGVmdCA9IE1hdGgucm91bmQgY29udGVudFJlY3Qud2lkdGggLyAxMDAgKiBwb3NpdGlvbi5sZWZ0XG4gICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC53aWR0aCAvIDEwMCAqIHBvc2l0aW9uLndpZHRoXG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQgY29udGVudFJlY3QuaGVpZ2h0IC8gMTAwICogcG9zaXRpb24uaGVpZ2h0XG5cbiAgICAgICAgdG9wICs9IE1hdGgucm91bmQgY29udGVudFJlY3QudG9wXG4gICAgICAgIGxlZnQgKz0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC5sZWZ0XG5cbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ3Nnbi1wcF9faG90c3BvdCB2ZXJzb19fb3ZlcmxheSdcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLWlkJywgaG90c3BvdC5pZCBpZiBob3RzcG90LmlkP1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtdHlwZScsIGhvdHNwb3QudHlwZSBpZiBob3RzcG90LnR5cGU/XG4gICAgICAgIGVsLmlubmVySFRNTCA9IE11c3RhY2hlLnJlbmRlciBob3RzcG90LnRlbXBsYXRlID8gdGVtcGxhdGUsIGhvdHNwb3RcblxuICAgICAgICBlbC5zdHlsZS50b3AgPSBcIiN7dG9wfXB4XCJcbiAgICAgICAgZWwuc3R5bGUubGVmdCA9IFwiI3tsZWZ0fXB4XCJcbiAgICAgICAgZWwuc3R5bGUud2lkdGggPSBcIiN7d2lkdGh9cHhcIlxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBcIiN7aGVpZ2h0fXB4XCJcblxuICAgICAgICBlbFxuXG4gICAgZ2V0UG9zaXRpb246IChwYWdlcywgcmF0aW8sIGhvdHNwb3QpIC0+XG4gICAgICAgIG1pblggPSBudWxsXG4gICAgICAgIG1pblkgPSBudWxsXG4gICAgICAgIG1heFggPSBudWxsXG4gICAgICAgIG1heFkgPSBudWxsXG4gICAgICAgIHBhZ2VOdW1iZXJzID0gcGFnZXMubWFwIChwYWdlKSAtPiBwYWdlLnBhZ2VOdW1iZXJcblxuICAgICAgICBmb3IgcGFnZU51bWJlciBvZiBob3RzcG90LmxvY2F0aW9uc1xuICAgICAgICAgICAgY29udGludWUgaWYgcGFnZU51bWJlcnMuaW5kZXhPZigrcGFnZU51bWJlcikgaXMgLTFcblxuICAgICAgICAgICAgaG90c3BvdC5sb2NhdGlvbnNbcGFnZU51bWJlcl0uZm9yRWFjaCAoY29vcmRzKSAtPlxuICAgICAgICAgICAgICAgIHggPSBjb29yZHNbMF1cbiAgICAgICAgICAgICAgICB5ID0gY29vcmRzWzFdXG5cbiAgICAgICAgICAgICAgICB4ICs9MSBpZiBwYWdlc1sxXSBhbmQgcGFnZU51bWJlcnNbMV0gaXMgK3BhZ2VOdW1iZXJcbiAgICAgICAgICAgICAgICB4IC89IHBhZ2VzLmxlbmd0aFxuXG4gICAgICAgICAgICAgICAgaWYgbm90IG1pblg/XG4gICAgICAgICAgICAgICAgICAgIG1pblggPSBtYXhYID0geFxuICAgICAgICAgICAgICAgICAgICBtaW5ZID0gbWF4WSA9IHlcblxuICAgICAgICAgICAgICAgIG1pblggPSB4IGlmIHggPCBtaW5YXG4gICAgICAgICAgICAgICAgbWF4WCA9IHggaWYgeCA+IG1heFhcbiAgICAgICAgICAgICAgICBtaW5ZID0geSBpZiB5IDwgbWluWVxuICAgICAgICAgICAgICAgIG1heFkgPSB5IGlmIHkgPiBtYXhZXG5cbiAgICAgICAgd2lkdGggPSBtYXhYIC0gbWluWFxuICAgICAgICBoZWlnaHQgPSBtYXhZIC0gbWluWVxuXG4gICAgICAgIHRvcDogbWluWSAvIHJhdGlvICogMTAwXG4gICAgICAgIGxlZnQ6IG1pblggKiAxMDBcbiAgICAgICAgd2lkdGg6IHdpZHRoICogMTAwXG4gICAgICAgIGhlaWdodDogaGVpZ2h0IC8gcmF0aW8gKiAxMDBcblxuICAgIHJlcXVlc3RIb3RzcG90czogKHBhZ2VTcHJlYWRJZCwgcGFnZXMpIC0+XG4gICAgICAgIEB0cmlnZ2VyICdob3RzcG90c1JlcXVlc3RlZCcsXG4gICAgICAgICAgICBpZDogcGFnZVNwcmVhZElkXG4gICAgICAgICAgICBwYWdlczogcGFnZXNcblxuICAgICAgICByZXR1cm5cblxuICAgIGhvdHNwb3RzUmVjZWl2ZWQ6IChlKSAtPlxuICAgICAgICBwYWdlU3ByZWFkSWQgPSBlLnBhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgIEBzZXRDYWNoZSBwYWdlU3ByZWFkSWQsIGVcbiAgICAgICAgQHJlbmRlckhvdHNwb3RzIGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldENhY2hlOiAocGFnZVNwcmVhZElkKSAtPlxuICAgICAgICBAY2FjaGVbcGFnZVNwcmVhZElkXVxuXG4gICAgc2V0Q2FjaGU6IChwYWdlU3ByZWFkSWQsIGRhdGEpIC0+XG4gICAgICAgIEBjYWNoZVtwYWdlU3ByZWFkSWRdID0gZGF0YVxuXG4gICAgICAgIEBcblxuICAgIGFmdGVyTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBub3QgZS5wYWdlU3ByZWFkP1xuXG4gICAgICAgIGlkID0gZS5wYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBAY3VycmVudFBhZ2VTcHJlYWRJZCA9IGlkXG4gICAgICAgIEByZXF1ZXN0SG90c3BvdHMgaWQsIGUucGFnZVNwcmVhZC5nZXRQYWdlcygpIGlmIEBwYWdlU3ByZWFkc0xvYWRlZFtpZF1cblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VzTG9hZGVkOiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzTG9hZGVkW2UucGFnZVNwcmVhZElkXSA9IHRydWVcbiAgICAgICAgQHJlcXVlc3RIb3RzcG90cyBlLnBhZ2VTcHJlYWRJZCwgZS5wYWdlcyBpZiBAY3VycmVudFBhZ2VTcHJlYWRJZCBpcyBlLnBhZ2VTcHJlYWRJZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplZDogKGUpIC0+XG4gICAgICAgIGRhdGEgPSBAZ2V0Q2FjaGUgQGN1cnJlbnRQYWdlU3ByZWFkSWRcblxuICAgICAgICBAcmVuZGVySG90c3BvdHMgZGF0YSBpZiBkYXRhP1xuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25Ib3RzcG90c1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25Ib3RzcG90c1xuXG5cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBWaWV3ZXI6IHJlcXVpcmUgJy4vdmlld2VyJ1xuXG4gICAgSG90c3BvdFBpY2tlcjogcmVxdWlyZSAnLi9ob3RzcG90X3BpY2tlcidcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uTGVnYWN5RXZlbnRUcmFja2luZ1xuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAYmluZCAnZXZlbnRUcmFja2VkJywgQGV2ZW50VHJhY2tlZC5iaW5kKEApXG4gICAgICAgIEB6b29tZWRJbiA9IGZhbHNlXG4gICAgICAgIEBhcHBlYXJlZEF0ID0gbnVsbFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgdHJhY2tFdmVudDogKGUpIC0+XG4gICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JywgZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZXZlbnRUcmFja2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS50eXBlIGlzICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC1hcHBlYXJlZCdcbiAgICAgICAgICAgIEBhcHBlYXJlZEF0ID0gRGF0ZS5ub3coKVxuICAgICAgICBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLWRpc2FwcGVhcmVkJ1xuICAgICAgICAgICAgQHRyaWdnZXIgJ3RyYWNrRXZlbnQnLFxuICAgICAgICAgICAgICAgIHR5cGU6IGlmIEB6b29tZWRJbiB0aGVuICd6b29tJyBlbHNlICd2aWV3J1xuICAgICAgICAgICAgICAgIG1zOiBEYXRlLm5vdygpIC0gQGFwcGVhcmVkQXRcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogQGdldE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgICAgICBwYWdlczogZS5wcm9wZXJ0aWVzLnBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkLnBhZ2VOdW1iZXJzXG4gICAgICAgIGVsc2UgaWYgZS50eXBlIGlzICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC16b29tZWQtaW4nXG4gICAgICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3ZpZXcnXG4gICAgICAgICAgICAgICAgbXM6IEBnZXREdXJhdGlvbigpXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IEBnZXRPcmllbnRhdGlvbigpXG4gICAgICAgICAgICAgICAgcGFnZXM6IGUucHJvcGVydGllcy5wYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZC5wYWdlTnVtYmVyc1xuXG4gICAgICAgICAgICBAem9vbWVkSW4gPSB0cnVlXG4gICAgICAgICAgICBAYXBwZWFyZWRBdCA9IERhdGUubm93KClcbiAgICAgICAgZWxzZSBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLXpvb21lZC1vdXQnXG4gICAgICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3pvb20nXG4gICAgICAgICAgICAgICAgbXM6IEBnZXREdXJhdGlvbigpXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IEBnZXRPcmllbnRhdGlvbigpXG4gICAgICAgICAgICAgICAgcGFnZXM6IGUucHJvcGVydGllcy5wYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZC5wYWdlTnVtYmVyc1xuXG4gICAgICAgICAgICBAem9vbWVkSW4gPSBmYWxzZVxuICAgICAgICAgICAgQGFwcGVhcmVkQXQgPSBEYXRlLm5vdygpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRPcmllbnRhdGlvbjogLT5cbiAgICAgICAgaWYgd2luZG93LmlubmVyV2lkdGggPj0gd2luZG93LmlubmVySGVpZ2h0IHRoZW4gJ2xhbmRzY2FwZScgZWxzZSAncG9ydHJhaXQnXG5cbiAgICBnZXREdXJhdGlvbjogLT5cbiAgICAgICAgRGF0ZS5ub3coKSAtIEBhcHBlYXJlZEF0XG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkxlZ2FjeUV2ZW50VHJhY2tpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uTGVnYWN5RXZlbnRUcmFja2luZ1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5TR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkXG4gICAgY29uc3RydWN0b3I6IChAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAY29udGVudHNSZW5kZXJlZCA9IGZhbHNlXG4gICAgICAgIEBob3RzcG90c1JlbmRlcmVkID0gZmFsc2VcbiAgICAgICAgQGVsID0gQHJlbmRlckVsKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldElkOiAtPlxuICAgICAgICBAb3B0aW9ucy5pZFxuXG4gICAgZ2V0RWw6IC0+XG4gICAgICAgIEBlbFxuXG4gICAgZ2V0UGFnZXM6IC0+XG4gICAgICAgIEBvcHRpb25zLnBhZ2VzXG5cbiAgICByZW5kZXJFbDogLT5cbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgICAgIHBhZ2VJZHMgPSBAZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UuaWRcblxuICAgICAgICBlbC5jbGFzc05hbWUgPSAndmVyc29fX3BhZ2Utc3ByZWFkIHNnbi1wcF9fcGFnZS1zcHJlYWQnXG5cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLWlkJywgQGdldElkKClcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLXR5cGUnLCAncGFnZSdcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLXdpZHRoJywgQG9wdGlvbnMud2lkdGhcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLXBhZ2UtaWRzJywgcGFnZUlkcy5qb2luKCcsJylcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLW1heC16b29tLXNjYWxlJywgQG9wdGlvbnMubWF4Wm9vbVNjYWxlXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSAnZGF0YS16b29tYWJsZScsIGZhbHNlXG5cbiAgICAgICAgZWxcblxuICAgIHJlbmRlckNvbnRlbnRzOiAtPlxuICAgICAgICBpZCA9IEBnZXRJZCgpXG4gICAgICAgIGVsID0gQGdldEVsKClcbiAgICAgICAgcGFnZXMgPSBAZ2V0UGFnZXMoKVxuICAgICAgICBwYWdlQ291bnQgPSBwYWdlcy5sZW5ndGhcbiAgICAgICAgaW1hZ2VMb2FkcyA9IDBcblxuICAgICAgICBwYWdlcy5mb3JFYWNoIChwYWdlLCBpKSA9PlxuICAgICAgICAgICAgaW1hZ2UgPSBwYWdlLmltYWdlcy5tZWRpdW1cbiAgICAgICAgICAgIHBhZ2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgICAgIGxvYWRlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuXG4gICAgICAgICAgICBwYWdlRWwuY2xhc3NOYW1lID0gJ3Nnbi1wcF9fcGFnZSB2ZXJzb19fcGFnZSdcbiAgICAgICAgICAgIHBhZ2VFbC5kYXRhc2V0LmlkID0gcGFnZS5pZCBpZiBwYWdlLmlkP1xuXG4gICAgICAgICAgICBpZiBwYWdlQ291bnQgaXMgMlxuICAgICAgICAgICAgICAgIHBhZ2VFbC5jbGFzc05hbWUgKz0gaWYgaSBpcyAwIHRoZW4gJyB2ZXJzby1wYWdlLS12ZXJzbycgZWxzZSAnIHZlcnNvLXBhZ2UtLXJlY3RvJ1xuXG4gICAgICAgICAgICBwYWdlRWwuYXBwZW5kQ2hpbGQgbG9hZGVyRWxcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkIHBhZ2VFbFxuXG4gICAgICAgICAgICBsb2FkZXJFbC5jbGFzc05hbWUgPSAnc2duLXBwLXBhZ2VfX2xvYWRlcidcbiAgICAgICAgICAgIGxvYWRlckVsLmlubmVySFRNTCA9IFwiPHNwYW4+I3twYWdlLmxhYmVsfTwvc3Bhbj5cIlxuXG4gICAgICAgICAgICBTR04udXRpbC5sb2FkSW1hZ2UgaW1hZ2UsIChlcnIsIHdpZHRoLCBoZWlnaHQpID0+XG4gICAgICAgICAgICAgICAgaWYgbm90IGVycj9cbiAgICAgICAgICAgICAgICAgICAgaXNDb21wbGV0ZSA9ICsraW1hZ2VMb2FkcyBpcyBwYWdlQ291bnRcblxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoI3tpbWFnZX0pXCJcbiAgICAgICAgICAgICAgICAgICAgcGFnZUVsLmRhdGFzZXQud2lkdGggPSB3aWR0aFxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuZGF0YXNldC5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgcGFnZUVsLmlubmVySFRNTCA9ICcmbmJzcDsnXG5cbiAgICAgICAgICAgICAgICAgICAgZWwuZGF0YXNldC56b29tYWJsZSA9IHRydWUgaWYgaXNDb21wbGV0ZVxuXG4gICAgICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdwYWdlTG9hZGVkJywgcGFnZVNwcmVhZElkOiBpZCwgcGFnZTogcGFnZVxuICAgICAgICAgICAgICAgICAgICBAdHJpZ2dlciAncGFnZXNMb2FkZWQnLCBwYWdlU3ByZWFkSWQ6IGlkLCBwYWdlczogcGFnZXMgaWYgaXNDb21wbGV0ZVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyRWwuaW5uZXJIVE1MID0gJzxzcGFuPiE8L3NwYW4+J1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBjb250ZW50c1JlbmRlcmVkID0gdHJ1ZVxuXG4gICAgICAgIEBcblxuICAgIGNsZWFyQ29udGVudHM6IChwYWdlU3ByZWFkLCB2ZXJzb1BhZ2VTcHJlYWQpIC0+XG4gICAgICAgIEBlbC5pbm5lckhUTUwgPSAnJ1xuICAgICAgICBAY29udGVudHNSZW5kZXJlZCA9IGZhbHNlXG5cbiAgICAgICAgQFxuXG4gICAgem9vbUluOiAtPlxuICAgICAgICBwYWdlRWxzID0gW10uc2xpY2UuY2FsbCBAZWwucXVlcnlTZWxlY3RvckFsbCgnLnNnbi1wcF9fcGFnZScpXG4gICAgICAgIHBhZ2VzID0gQGdldFBhZ2VzKClcblxuICAgICAgICBwYWdlRWxzLmZvckVhY2ggKHBhZ2VFbCkgPT5cbiAgICAgICAgICAgIGlkID0gcGFnZUVsLmRhdGFzZXQuaWRcbiAgICAgICAgICAgIHBhZ2UgPSBwYWdlcy5maW5kIChwYWdlKSAtPiBwYWdlLmlkIGlzIGlkXG4gICAgICAgICAgICBpbWFnZSA9IHBhZ2UuaW1hZ2VzLmxhcmdlXG5cbiAgICAgICAgICAgIFNHTi51dGlsLmxvYWRJbWFnZSBpbWFnZSwgKGVycikgPT5cbiAgICAgICAgICAgICAgICBpZiBub3QgZXJyPyBhbmQgQGVsLmRhdGFzZXQuYWN0aXZlIGlzICd0cnVlJ1xuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuZGF0YXNldC5pbWFnZSA9IHBhZ2VFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgcGFnZUVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCN7aW1hZ2V9KVwiXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB6b29tT3V0OiAtPlxuICAgICAgICBwYWdlRWxzID0gW10uc2xpY2UuY2FsbCBAZWwucXVlcnlTZWxlY3RvckFsbCgnLnNnbi1wcF9fcGFnZVtkYXRhLWltYWdlXScpXG5cbiAgICAgICAgcGFnZUVscy5mb3JFYWNoIChwYWdlRWwpIC0+XG4gICAgICAgICAgICBwYWdlRWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gcGFnZUVsLmRhdGFzZXQuaW1hZ2VcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVsZXRlIHBhZ2VFbC5kYXRhc2V0LmltYWdlXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuUGFnZVNwcmVhZCA9IHJlcXVpcmUgJy4vcGFnZV9zcHJlYWQnXG5TR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkc1xuICAgIGNvbnN0cnVjdG9yOiAoQG9wdGlvbnMpIC0+XG4gICAgICAgIEBjb2xsZWN0aW9uID0gW11cbiAgICAgICAgQGlkcyA9IHt9XG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXQ6IChpZCkgLT5cbiAgICAgICAgQGlkc1tpZF1cblxuICAgIGdldEZyYWc6IC0+XG4gICAgICAgIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblxuICAgICAgICBAY29sbGVjdGlvbi5mb3JFYWNoIChwYWdlU3ByZWFkKSAtPiBmcmFnLmFwcGVuZENoaWxkIHBhZ2VTcHJlYWQuZWxcblxuICAgICAgICBmcmFnXG5cbiAgICB1cGRhdGU6IChwYWdlTW9kZSA9ICdzaW5nbGUnKSAtPlxuICAgICAgICBwYWdlU3ByZWFkcyA9IFtdXG4gICAgICAgIGlkcyA9IHt9XG4gICAgICAgIHBhZ2VzID0gQG9wdGlvbnMucGFnZXMuc2xpY2UoKVxuICAgICAgICB3aWR0aCA9IEBvcHRpb25zLndpZHRoXG4gICAgICAgIG1heFpvb21TY2FsZSA9IEBvcHRpb25zLm1heFpvb21TY2FsZVxuXG4gICAgICAgIGlmIHBhZ2VNb2RlIGlzICdzaW5nbGUnXG4gICAgICAgICAgICBwYWdlcy5mb3JFYWNoIChwYWdlKSAtPiBwYWdlU3ByZWFkcy5wdXNoIFtwYWdlXVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmaXJzdFBhZ2UgPSBwYWdlcy5zaGlmdCgpXG4gICAgICAgICAgICBsYXN0UGFnZSA9IGlmIHBhZ2VzLmxlbmd0aCAlIDIgaXMgMSB0aGVuIHBhZ2VzLnBvcCgpIGVsc2UgbnVsbFxuICAgICAgICAgICAgbWlkc3RQYWdlU3ByZWFkcyA9IFNHTi51dGlsLmNodW5rIHBhZ2VzLCAyXG5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWRzLnB1c2ggW2ZpcnN0UGFnZV0gaWYgZmlyc3RQYWdlP1xuICAgICAgICAgICAgbWlkc3RQYWdlU3ByZWFkcy5mb3JFYWNoIChtaWRzdFBhZ2VzKSAtPiBwYWdlU3ByZWFkcy5wdXNoIG1pZHN0UGFnZXMubWFwIChwYWdlKSAtPiBwYWdlXG4gICAgICAgICAgICBwYWdlU3ByZWFkcy5wdXNoIFtsYXN0UGFnZV0gaWYgbGFzdFBhZ2U/XG5cbiAgICAgICAgQGNvbGxlY3Rpb24gPSBwYWdlU3ByZWFkcy5tYXAgKHBhZ2VzLCBpKSA9PlxuICAgICAgICAgICAgaWQgPSBcIiN7cGFnZU1vZGV9LSN7aX1cIlxuICAgICAgICAgICAgcGFnZVNwcmVhZCA9IG5ldyBQYWdlU3ByZWFkXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICAgICAgbWF4Wm9vbVNjYWxlOiBtYXhab29tU2NhbGVcbiAgICAgICAgICAgICAgICBwYWdlczogcGFnZXNcbiAgICAgICAgICAgICAgICBpZDogaWRcblxuICAgICAgICAgICAgcGFnZVNwcmVhZC5iaW5kICdwYWdlTG9hZGVkJywgKGUpID0+IEB0cmlnZ2VyICdwYWdlTG9hZGVkJywgZVxuICAgICAgICAgICAgcGFnZVNwcmVhZC5iaW5kICdwYWdlc0xvYWRlZCcsIChlKSA9PiBAdHJpZ2dlciAncGFnZXNMb2FkZWQnLCBlXG5cbiAgICAgICAgICAgIGlkc1tpZF0gPSBwYWdlU3ByZWFkXG5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWRcbiAgICAgICAgQGlkcyA9IGlkc1xuXG4gICAgICAgIEBcblxuTWljcm9FdmVudC5taXhpbiBQYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZHNcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZHNcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJcIlwiXG5cIlwiXCJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJcIlwiXG48ZGl2IGNsYXNzPVwic2duLXBwLWhvdHNwb3QtcGlja2VyX19iYWNrZ3JvdW5kXCIgZGF0YS1jbG9zZT48L2Rpdj5cbjxkaXYgY2xhc3M9XCJzZ25fX3BvcG92ZXJcIiBzdHlsZT1cInRvcDoge3t0b3B9fXB4OyBsZWZ0OiB7e2xlZnR9fXB4O1wiPlxuICAgIHt7I2hlYWRlcn19XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZ24tcG9wb3Zlcl9faGVhZGVyXCI+e3toZWFkZXJ9fTwvZGl2PlxuICAgIHt7L2hlYWRlcn19XG4gICAgPGRpdiBjbGFzcz1cInNnbi1wb3BvdmVyX19jb250ZW50XCI+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICAgIHt7I2hvdHNwb3RzfX1cbiAgICAgICAgICAgICAgICA8bGkgZGF0YS1pZD1cInt7aWR9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD57e3RpdGxlfX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt7c3VidGl0bGV9fTwvcD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAge3svaG90c3BvdHN9fVxuICAgICAgICA8L3VsPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cIlwiXCJcbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuU0dOID0gcmVxdWlyZSAnLi4vLi4vY29yZSdcbkNvcmUgPSByZXF1aXJlICcuL2NvcmUnXG5Ib3RzcG90cyA9IHJlcXVpcmUgJy4vaG90c3BvdHMnXG5Db250cm9scyA9IHJlcXVpcmUgJy4vY29udHJvbHMnXG5FdmVudFRyYWNraW5nID0gcmVxdWlyZSAnLi9ldmVudF90cmFja2luZydcbkxlZ2FjeUV2ZW50VHJhY2tpbmcgPSByZXF1aXJlICcuL2xlZ2FjeV9ldmVudF90cmFja2luZydcblxuY2xhc3MgVmlld2VyXG4gICAgY29uc3RydWN0b3I6IChAZWwsIEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBfY29yZSA9IG5ldyBDb3JlIEBlbCxcbiAgICAgICAgICAgIGlkOiBAb3B0aW9ucy5pZFxuICAgICAgICAgICAgcGFnZXM6IEBvcHRpb25zLnBhZ2VzXG4gICAgICAgICAgICBwYWdlU3ByZWFkV2lkdGg6IEBvcHRpb25zLnBhZ2VTcHJlYWRXaWR0aFxuICAgICAgICAgICAgcGFnZVNwcmVhZE1heFpvb21TY2FsZTogQG9wdGlvbnMucGFnZVNwcmVhZE1heFpvb21TY2FsZVxuICAgICAgICAgICAgaWRsZURlbGF5OiBAb3B0aW9ucy5pZGxlRGVsYXlcbiAgICAgICAgICAgIHJlc2l6ZURlbGF5OiBAb3B0aW9ucy5yZXNpemVEZWxheVxuICAgICAgICAgICAgY29sb3I6IEBvcHRpb25zLmNvbG9yXG4gICAgICAgIEBfaG90c3BvdHMgPSBuZXcgSG90c3BvdHMoKVxuICAgICAgICBAX2NvbnRyb2xzID0gbmV3IENvbnRyb2xzIEBlbCwga2V5Ym9hcmQ6IEBvcHRpb25zLmtleWJvYXJkXG4gICAgICAgIEBfZXZlbnRUcmFja2luZyA9IG5ldyBFdmVudFRyYWNraW5nKClcbiAgICAgICAgQF9sZWdhY3lFdmVudFRyYWNraW5nID0gbmV3IExlZ2FjeUV2ZW50VHJhY2tpbmcoKVxuICAgICAgICBAdmlld1Nlc3Npb24gPSBTR04udXRpbC51dWlkKClcblxuICAgICAgICBAX3NldHVwRXZlbnRMaXN0ZW5lcnMoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgc3RhcnQ6IC0+XG4gICAgICAgIEBfY29yZS50cmlnZ2VyICdzdGFydGVkJ1xuXG4gICAgICAgIEBcblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBfY29yZS50cmlnZ2VyICdkZXN0cm95ZWQnXG4gICAgICAgIEBfaG90c3BvdHMudHJpZ2dlciAnZGVzdHJveWVkJ1xuICAgICAgICBAX2NvbnRyb2xzLnRyaWdnZXIgJ2Rlc3Ryb3llZCdcbiAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2Rlc3Ryb3llZCdcblxuICAgICAgICBAZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBAZWxcblxuICAgICAgICBAXG5cbiAgICBuYXZpZ2F0ZVRvOiAocG9zaXRpb24sIG9wdGlvbnMpIC0+XG4gICAgICAgIEBfY29yZS5nZXRWZXJzbygpLm5hdmlnYXRlVG8gcG9zaXRpb24sIG9wdGlvbnNcblxuICAgICAgICBAXG5cbiAgICBmaXJzdDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBfY29yZS5nZXRWZXJzbygpLmZpcnN0IG9wdGlvbnNcblxuICAgICAgICBAXG5cbiAgICBwcmV2OiAob3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkucHJldiBvcHRpb25zXG5cbiAgICAgICAgQFxuXG4gICAgbmV4dDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBfY29yZS5nZXRWZXJzbygpLm5leHQgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIGxhc3Q6IChvcHRpb25zKSAtPlxuICAgICAgICBAX2NvcmUuZ2V0VmVyc28oKS5sYXN0IG9wdGlvbnNcblxuICAgICAgICBAXG5cbiAgICBfdHJhY2tFdmVudDogKGUpIC0+XG4gICAgICAgIHR5cGUgPSBlLnR5cGVcbiAgICAgICAgaWRUeXBlID0gJ2xlZ2FjeSdcbiAgICAgICAgcHJvcGVydGllcyA9IHBhZ2VkUHVibGljYXRpb246XG4gICAgICAgICAgICBpZDogW2lkVHlwZSwgQG9wdGlvbnMuaWRdXG4gICAgICAgICAgICBvd25lZEJ5OiBbaWRUeXBlLCBAb3B0aW9ucy5vd25lZEJ5XVxuICAgICAgICBldmVudFRyYWNrZXIgPSBAb3B0aW9ucy5ldmVudFRyYWNrZXJcblxuICAgICAgICBwcm9wZXJ0aWVzW2tleV0gPSB2YWx1ZSBmb3Iga2V5LCB2YWx1ZSBvZiBlLnByb3BlcnRpZXNcblxuICAgICAgICBldmVudFRyYWNrZXIudHJhY2tFdmVudCB0eXBlLCBwcm9wZXJ0aWVzIGlmIGV2ZW50VHJhY2tlcj9cblxuICAgICAgICByZXR1cm5cblxuICAgIF90cmFja0xlZ2FjeUV2ZW50OiAoZSkgLT5cbiAgICAgICAgZXZlbnRUcmFja2VyID0gQG9wdGlvbnMuZXZlbnRUcmFja2VyXG4gICAgICAgIGdlb2xvY2F0aW9uID0ge31cblxuICAgICAgICBpZiBldmVudFRyYWNrZXI/XG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5sYXRpdHVkZSA9IGV2ZW50VHJhY2tlci5sb2NhdGlvbi5sYXRpdHVkZVxuICAgICAgICAgICAgZ2VvbG9jYXRpb24ubG9uZ2l0dWRlID0gZXZlbnRUcmFja2VyLmxvY2F0aW9uLmxvbmdpdHVkZVxuICAgICAgICAgICAgZ2VvbG9jYXRpb24uc2Vuc29yID0gdHJ1ZSBpZiBnZW9sb2NhdGlvbi5sYXRpdHVkZT9cblxuICAgICAgICAgICAgU0dOLkNvcmVLaXQucmVxdWVzdFxuICAgICAgICAgICAgICAgIGdlb2xvY2F0aW9uOiBnZW9sb2NhdGlvblxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgICAgICAgICAgICAgdXJsOiBcIi92Mi9jYXRhbG9ncy8je0BvcHRpb25zLmlkfS9jb2xsZWN0XCJcbiAgICAgICAgICAgICAgICBqc29uOiB0cnVlXG4gICAgICAgICAgICAgICAgYm9keTpcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZS50eXBlXG4gICAgICAgICAgICAgICAgICAgIG1zOiBlLm1zXG4gICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBlLm9yaWVudGF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBlLnBhZ2VzLmpvaW4gJywnXG4gICAgICAgICAgICAgICAgICAgIHZpZXdfc2Vzc2lvbjogQHZpZXdTZXNzaW9uXG4gICAgICAgIFxuICAgICAgICByZXR1cm5cblxuICAgIF9zZXR1cEV2ZW50TGlzdGVuZXJzOiAtPlxuICAgICAgICBAX2V2ZW50VHJhY2tpbmcuYmluZCAndHJhY2tFdmVudCcsIChlKSA9PlxuICAgICAgICAgICAgQF90cmFja0V2ZW50IGVcbiAgICAgICAgICAgIEBfbGVnYWN5RXZlbnRUcmFja2luZy50cmlnZ2VyICdldmVudFRyYWNrZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBfbGVnYWN5RXZlbnRUcmFja2luZy5iaW5kICd0cmFja0V2ZW50JywgKGUpID0+XG4gICAgICAgICAgICBAX3RyYWNrTGVnYWN5RXZlbnQgZVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQF9jb250cm9scy5iaW5kICdwcmV2JywgKGUpID0+XG4gICAgICAgICAgICBAcHJldiBlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvbnRyb2xzLmJpbmQgJ25leHQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBuZXh0IGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29udHJvbHMuYmluZCAnZmlyc3QnLCAoZSkgPT5cbiAgICAgICAgICAgIEBmaXJzdCBlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvbnRyb2xzLmJpbmQgJ2xhc3QnLCAoZSkgPT5cbiAgICAgICAgICAgIEBsYXN0KClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfaG90c3BvdHMuYmluZCAnaG90c3BvdHNSZXF1ZXN0ZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdob3RzcG90c1JlcXVlc3RlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2FwcGVhcmVkJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYXBwZWFyZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnYXBwZWFyZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnZGlzYXBwZWFyZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdkaXNhcHBlYXJlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdkaXNhcHBlYXJlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdiZWZvcmVOYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYmVmb3JlTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEBfY29udHJvbHMudHJpZ2dlciAnYmVmb3JlTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdiZWZvcmVOYXZpZ2F0aW9uJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2FmdGVyTmF2aWdhdGlvbicsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhZnRlck5hdmlnYXRpb24nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2F0dGVtcHRlZE5hdmlnYXRpb24nLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdjbGlja2VkJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnY2xpY2tlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdjbGlja2VkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2RvdWJsZUNsaWNrZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdkb3VibGVDbGlja2VkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2RvdWJsZUNsaWNrZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAncHJlc3NlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ3ByZXNzZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAncHJlc3NlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdwYW5TdGFydCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ3BhblN0YXJ0JywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3BhblN0YXJ0JywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3pvb21lZEluJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnem9vbWVkSW4nLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnem9vbWVkSW4nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnem9vbWVkT3V0JywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnem9vbWVkT3V0JywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdwYWdlTG9hZGVkJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAncGFnZUxvYWRlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdwYWdlTG9hZGVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2FmdGVyTmF2aWdhdGlvbicsIChlKSA9PlxuICAgICAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdhZnRlck5hdmlnYXRpb24nLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnYWZ0ZXJOYXZpZ2F0aW9uJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3BhZ2VzTG9hZGVkJywgKGUpID0+XG4gICAgICAgICAgICBAX2hvdHNwb3RzLnRyaWdnZXIgJ3BhZ2VzTG9hZGVkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3BhZ2VzTG9hZGVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3Jlc2l6ZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfaG90c3BvdHMudHJpZ2dlciAncmVzaXplZCdcbiAgICAgICAgICAgIEB0cmlnZ2VyICdyZXNpemVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAYmluZCAnaG90c3BvdHNSZWNlaXZlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdob3RzcG90c1JlY2VpdmVkJyxcbiAgICAgICAgICAgICAgICBwYWdlU3ByZWFkOiBAX2NvcmUucGFnZVNwcmVhZHMuZ2V0IGUuaWRcbiAgICAgICAgICAgICAgICB2ZXJzb1BhZ2VTcHJlYWQ6IEBfY29yZS5nZXRWZXJzbygpLnBhZ2VTcHJlYWRzLmZpbmQgKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWQuZ2V0SWQoKSBpcyBlLmlkXG4gICAgICAgICAgICAgICAgcmF0aW86IGUucmF0aW9cbiAgICAgICAgICAgICAgICBwYWdlczogZS5wYWdlc1xuICAgICAgICAgICAgICAgIGhvdHNwb3RzOiBlLmhvdHNwb3RzXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuXG5NaWNyb0V2ZW50Lm1peGluIFZpZXdlclxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdlclxuIiwiU0dOID0gcmVxdWlyZSAnLi4vc2duJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRpb25zID0ge30sIGNhbGxiYWNrLCBwcm9ncmVzc0NhbGxiYWNrKSAtPlxuICAgIGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kID8gJ2dldCdcbiAgICB1cmwgPSBvcHRpb25zLnVybFxuICAgIGhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgPyB7fVxuXG4gICAgaWYgb3B0aW9ucy5xcz9cbiAgICAgICAgcXVlcnlQYXJhbXMgPSBTR04udXRpbC5mb3JtYXRRdWVyeVBhcmFtcyBvcHRpb25zLnFzXG5cbiAgICAgICAgaWYgdXJsLmluZGV4T2YoJz8nKSBpcyAtMVxuICAgICAgICAgICAgdXJsICs9ICc/JyArIHF1ZXJ5UGFyYW1zXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHVybCArPSAnJicgKyBxdWVyeVBhcmFtc1xuXG4gICAgaHR0cC5vcGVuIG1ldGhvZC50b1VwcGVyQ2FzZSgpLCB1cmxcbiAgICBodHRwLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgaWYgb3B0aW9ucy50aW1lb3V0P1xuICAgIGh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZSBpZiBvcHRpb25zLnVzZUNvb2tpZXMgaXMgdHJ1ZVxuXG4gICAgaWYgb3B0aW9ucy5qc29uIGlzIHRydWVcbiAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vanNvbidcblxuICAgIGZvciBoZWFkZXIsIHZhbHVlIG9mIG9wdGlvbnMuaGVhZGVyc1xuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIgaGVhZGVyLCB2YWx1ZVxuXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyICdsb2FkJywgLT5cbiAgICAgICAgaGVhZGVycyA9IGh0dHAuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkuc3BsaXQgJ1xcclxcbidcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMucmVkdWNlIChhY2MsIGN1cnJlbnQsIGkpIC0+XG4gICAgICAgICAgICBwYXJ0cyA9IGN1cnJlbnQuc3BsaXQgJzogJ1xuXG4gICAgICAgICAgICBhY2NbcGFydHNbMF0udG9Mb3dlckNhc2UoKV0gPSBwYXJ0c1sxXVxuXG4gICAgICAgICAgICBhY2NcbiAgICAgICAgLCB7fVxuICAgICAgICBib2R5ID0gaHR0cC5yZXNwb25zZVRleHRcblxuICAgICAgICBib2R5ID0gSlNPTi5wYXJzZSBib2R5IGlmIG9wdGlvbnMuanNvbiBpcyB0cnVlXG5cbiAgICAgICAgY2FsbGJhY2sgbnVsbCxcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IGh0dHAuc3RhdHVzXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICBib2R5OiBib2R5XG5cbiAgICAgICAgcmV0dXJuXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyICdlcnJvcicsIC0+XG4gICAgICAgIGNhbGxiYWNrIG5ldyBFcnJvcigpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgaHR0cC5hZGRFdmVudExpc3RlbmVyICd0aW1lb3V0JywgLT5cbiAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKClcblxuICAgICAgICByZXR1cm5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ3Byb2dyZXNzJywgKGUpIC0+XG4gICAgICAgIGlmIGUubGVuZ3RoQ29tcHV0YWJsZSBhbmQgdHlwZW9mIHByb2dyZXNzQ2FsbGJhY2sgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjayBlLmxvYWRlZCwgZS50b3RhbFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgaWYgb3B0aW9ucy5mb3JtRGF0YT9cbiAgICAgICAgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuXG4gICAgICAgIGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnMuZm9ybURhdGFcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCBrZXksIHZhbHVlXG5cbiAgICAgICAgaHR0cC5zZW5kIGZvcm1EYXRhXG4gICAgZWxzZSBpZiBvcHRpb25zLmJvZHk/XG4gICAgICAgIGlmIG9wdGlvbnMuanNvbiBpcyB0cnVlXG4gICAgICAgICAgICBodHRwLnNlbmQgSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ib2R5KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBodHRwLnNlbmQgb3B0aW9ucy5ib2R5XG4gICAgZWxzZVxuICAgICAgICBodHRwLnNlbmQoKVxuXG4gICAgcmV0dXJuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUgJy4vY29yZSdcbiIsIlNHTiA9IHJlcXVpcmUgJy4uL3NnbidcblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIGtleTogJ3Nnbi0nXG5cbiAgICBnZXQ6IChrZXkpIC0+XG4gICAgICAgIHJldHVybiBpZiBTR04udXRpbC5pc05vZGUoKVxuXG4gICAgICAgIHRyeVxuICAgICAgICAgICAgbmFtZSA9IFwiI3tAa2V5fSN7a2V5fT1cIlxuICAgICAgICAgICAgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQgJzsnXG5cbiAgICAgICAgICAgIGZvciBjIGluIGNhXG4gICAgICAgICAgICAgICAgY3QgPSBjLnRyaW0oKVxuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjdC5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGN0Lmxlbmd0aCkgaWYgY3QuaW5kZXhPZihuYW1lKSBpcyAwXG5cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZSB2YWx1ZVxuICAgICAgICBjYXRjaCBlcnJcbiAgICAgICAgICAgIHZhbHVlID0ge31cblxuICAgICAgICB2YWx1ZVxuXG4gICAgc2V0OiAoa2V5LCB2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIFNHTi51dGlsLmlzTm9kZSgpXG5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBkYXlzID0gMzY1XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICAgICAgc3RyID0gSlNPTi5zdHJpbmdpZnkgdmFsdWVcblxuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lIGRhdGUuZ2V0VGltZSgpICsgZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDBcblxuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gXCIje0BrZXl9I3trZXl9PSN7c3RyfTtleHBpcmVzPSN7ZGF0ZS50b1VUQ1N0cmluZygpfTtwYXRoPS9cIlxuICAgICAgICBjYXRjaCBlcnJcblxuICAgICAgICByZXR1cm5cblxuXG4iLCJTR04gPSByZXF1aXJlICcuLi9zZ24nXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgICBrZXk6ICdzZ24tJ1xuXG4gICAgc3RvcmFnZTogZG8gLT5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZVxuXG4gICAgICAgICAgICBzdG9yYWdlW1wiI3tAa2V5fXRlc3Qtc3RvcmFnZVwiXSA9ICdmb29iYXInXG4gICAgICAgICAgICBkZWxldGUgc3RvcmFnZVtcIiN7QGtleX10ZXN0LXN0b3JhZ2VcIl1cblxuICAgICAgICAgICAgc3RvcmFnZVxuICAgICAgICBjYXRjaFxuICAgICAgICAgICAge31cblxuICAgIGdldDogKGtleSkgLT5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBKU09OLnBhcnNlIEBzdG9yYWdlW1wiI3tAa2V5fSN7a2V5fVwiXVxuXG4gICAgc2V0OiAoa2V5LCB2YWx1ZSkgLT5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBAc3RvcmFnZVtcIiN7QGtleX0je2tleX1cIl0gPSBKU09OLnN0cmluZ2lmeSB2YWx1ZVxuXG4gICAgICAgIEBcbiIsInV0aWwgPVxuICAgIGlzQnJvd3NlcjogLT5cbiAgICAgICAgdHlwZW9mIHByb2Nlc3MgaXNudCAndW5kZWZpbmVkJyBhbmQgcHJvY2Vzcy5icm93c2VyXG5cbiAgICBpc05vZGU6IC0+XG4gICAgICAgIG5vdCB1dGlsLmlzQnJvd3NlcigpXG5cbiAgICBlcnJvcjogKGVyciwgb3B0aW9ucykgLT5cbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZSBvciBudWxsXG5cbiAgICAgICAgaWYgdHlwZW9mIG9wdGlvbnMgaXMgJ3N0cmluZydcbiAgICAgICAgICAgIGVyci5tZXNzYWdlID0gb3B0aW9uc1xuICAgICAgICBlbHNlIGlmIHR5cGVvZiBvcHRpb25zIGlzICdvYmplY3QnIGFuZCBvcHRpb25zP1xuICAgICAgICAgICAgZm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuICAgICAgICAgICAgICAgIGVycltrZXldID0gdmFsdWVcblxuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UgaWYgb3B0aW9ucy5tZXNzYWdlP1xuICAgICAgICAgICAgZXJyLmNvZGUgPSBvcHRpb25zLmNvZGUgb3Igb3B0aW9ucy5uYW1lIGlmIG9wdGlvbnMuY29kZT8gb3Igb3B0aW9ucy5tZXNzYWdlP1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gb3B0aW9ucy5zdGFjayBpZiBvcHRpb25zLnN0YWNrP1xuXG4gICAgICAgIGVyci5uYW1lID0gb3B0aW9ucyBhbmQgb3B0aW9ucy5uYW1lIG9yIGVyci5uYW1lIG9yIGVyci5jb2RlIG9yICdFcnJvcidcbiAgICAgICAgZXJyLnRpbWUgPSBuZXcgRGF0ZSgpXG5cbiAgICAgICAgZXJyXG5cbiAgICB1dWlkOiAtPlxuICAgICAgICAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlIC9beHldL2csIChjKSAtPlxuICAgICAgICAgICAgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDBcbiAgICAgICAgICAgIHYgPSBpZiBjIGlzICd4JyB0aGVuIHIgZWxzZSAociAmIDB4M3wweDgpXG5cbiAgICAgICAgICAgIHYudG9TdHJpbmcgMTZcblxuICAgIGdldFF1ZXJ5UGFyYW06IChmaWVsZCwgdXJsKSAtPlxuICAgICAgICBocmVmID0gaWYgdXJsIHRoZW4gdXJsIGVsc2Ugd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgICAgcmVnID0gbmV3IFJlZ0V4cCAnWz8mXScgKyBmaWVsZCArICc9KFteJiNdKiknLCAnaSdcbiAgICAgICAgc3RyaW5nID0gcmVnLmV4ZWMgaHJlZlxuXG4gICAgICAgIGlmIHN0cmluZyB0aGVuIHN0cmluZ1sxXSBlbHNlIHVuZGVmaW5lZFxuXG4gICAgZm9ybWF0UXVlcnlQYXJhbXM6IChxdWVyeVBhcmFtcyA9IHt9KSAtPlxuICAgICAgICBPYmplY3RcbiAgICAgICAgICAgIC5rZXlzIHF1ZXJ5UGFyYW1zXG4gICAgICAgICAgICAubWFwIChrZXkpIC0+IGtleSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeVBhcmFtc1trZXldKVxuICAgICAgICAgICAgLmpvaW4gJyYnXG5cbiAgICBnZXRPUzogLT5cbiAgICAgICAgbmFtZSA9IG51bGxcbiAgICAgICAgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuXG4gICAgICAgIGlmIHVhLmluZGV4T2YoJ1dpbmRvd3MnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ1dpbmRvd3MnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignTWFjJykgPiAtMVxuICAgICAgICAgICAgbmFtZSA9ICdtYWNPUydcbiAgICAgICAgZWxzZSBpZiB1YS5pbmRleE9mKCdYMTEnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ3VuaXgnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignTGludXgnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ0xpbnV4J1xuICAgICAgICBlbHNlIGlmIHVhLmluZGV4T2YoJ2lPUycpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnaU9TJ1xuICAgICAgICBlbHNlIGlmIHVhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ0FuZHJvaWQnXG5cbiAgICAgICAgbmFtZVxuXG4gICAgYnRvYTogKHN0cikgLT5cbiAgICAgICAgaWYgdXRpbC5pc0Jyb3dzZXIoKVxuICAgICAgICAgICAgYnRvYSBzdHJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYnVmZmVyID0gbnVsbFxuXG4gICAgICAgICAgICBpZiBzdHIgaW5zdGFuY2VvZiBCdWZmZXJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBzdHJcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBuZXcgQnVmZmVyIHN0ci50b1N0cmluZygpLCAnYmluYXJ5J1xuXG4gICAgICAgICAgICBidWZmZXIudG9TdHJpbmcgJ2Jhc2U2NCdcblxuICAgIGdldFNjcmVlbkRpbWVuc2lvbnM6IC0+XG4gICAgICAgIGRlbnNpdHkgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA/IDFcbiAgICAgICAgbG9naWNhbCA9XG4gICAgICAgICAgICB3aWR0aDogd2luZG93LnNjcmVlbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuc2NyZWVuLmhlaWdodFxuICAgICAgICBwaHlzaWNhbCA9XG4gICAgICAgICAgICB3aWR0aDogTWF0aC5yb3VuZCBsb2dpY2FsLndpZHRoICogZGVuc2l0eVxuICAgICAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kIGxvZ2ljYWwuaGVpZ2h0ICogZGVuc2l0eVxuXG4gICAgICAgIGRlbnNpdHk6IGRlbnNpdHlcbiAgICAgICAgbG9naWNhbDogbG9naWNhbFxuICAgICAgICBwaHlzaWNhbDogcGh5c2ljYWxcblxuICAgIGdldFV0Y09mZnNldFNlY29uZHM6IC0+XG4gICAgICAgIG5vdyA9IG5ldyBEYXRlKClcbiAgICAgICAgamFuMSA9IG5ldyBEYXRlIG5vdy5nZXRGdWxsWWVhcigpLCAwLCAxLCAwLCAwLCAwLCAwXG4gICAgICAgIHRtcCA9IGphbjEudG9HTVRTdHJpbmcoKVxuICAgICAgICBqYW4yID0gbmV3IERhdGUgdG1wLnN1YnN0cmluZygwLCB0bXAubGFzdEluZGV4T2YoJyAnKSAtIDEpXG4gICAgICAgIHN0ZFRpbWVPZmZzZXQgPSAoamFuMSAtIGphbjIpIC8gMTAwMFxuXG4gICAgICAgIHN0ZFRpbWVPZmZzZXRcblxuICAgIGdldFV0Y0RzdE9mZnNldFNlY29uZHM6IC0+XG4gICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogLTFcblxuICAgIGdldENvbG9yQnJpZ2h0bmVzczogKGNvbG9yKSAtPlxuICAgICAgICBjb2xvciA9IGNvbG9yLnJlcGxhY2UgJyMnLCAnJ1xuICAgICAgICBoZXggPSBwYXJzZUludCAoaGV4ICsgJycpLnJlcGxhY2UoL1teYS1mMC05XS9naSwgJycpLCAxNlxuICAgICAgICByZ2IgPSBbXVxuICAgICAgICBzdW0gPSAwXG4gICAgICAgIHggPSAwXG5cbiAgICAgICAgd2hpbGUgeCA8IDNcbiAgICAgICAgICAgIHMgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMiAqIHgsIDIpLCAxNilcbiAgICAgICAgICAgIHJnYlt4XSA9IHNcblxuICAgICAgICAgICAgc3VtICs9IHMgaWYgcyA+IDBcblxuICAgICAgICAgICAgKyt4XG5cbiAgICAgICAgaWYgc3VtIDw9IDM4MSB0aGVuICdkYXJrJyBlbHNlICdsaWdodCdcblxuICAgIGNodW5rOiAoYXJyLCBzaXplKSAtPlxuICAgICAgICByZXN1bHRzID0gW11cblxuICAgICAgICB3aGlsZSBhcnIubGVuZ3RoXG4gICAgICAgICAgICByZXN1bHRzLnB1c2ggYXJyLnNwbGljZSgwLCBzaXplKVxuXG4gICAgICAgIHJlc3VsdHNcblxuICAgIHRocm90dGxlOiAoZm4sIHRocmVzaG9sZCA9IDI1MCwgc2NvcGUpIC0+XG4gICAgICAgIGxhc3QgPSB1bmRlZmluZWRcbiAgICAgICAgZGVmZXJUaW1lciA9IHVuZGVmaW5lZFxuXG4gICAgICAgIC0+XG4gICAgICAgICAgICBjb250ZXh0ID0gc2NvcGUgb3IgQFxuICAgICAgICAgICAgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcblxuICAgICAgICAgICAgaWYgbGFzdCBhbmQgbm93IDwgbGFzdCArIHRocmVzaG9sZFxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCBkZWZlclRpbWVyXG5cbiAgICAgICAgICAgICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dCAtPlxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbm93XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmbi5hcHBseSBjb250ZXh0LCBhcmdzXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICwgdGhyZXNob2xkXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbGFzdCA9IG5vd1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5IGNvbnRleHQsIGFyZ3NcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICBsb2FkSW1hZ2U6IChzcmMsIGNhbGxiYWNrKSAtPlxuICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKVxuXG4gICAgICAgIGltZy5vbmxvYWQgPSAtPiBjYWxsYmFjayBudWxsLCBpbWcud2lkdGgsIGltZy5oZWlnaHRcbiAgICAgICAgaW1nLm9uZXJyb3IgPSAtPiBjYWxsYmFjayBuZXcgRXJyb3IoKVxuICAgICAgICBpbWcuc3JjID0gc3JjXG5cbiAgICAgICAgaW1nXG5cbiAgICBkaXN0YW5jZTogKGxhdDEsIGxuZzEsIGxhdDIsIGxuZzIpIC0+XG4gICAgICAgIHJhZGxhdDEgPSBNYXRoLlBJICogbGF0MSAvIDE4MFxuICAgICAgICByYWRsYXQyID0gTWF0aC5QSSAqIGxhdDIgLyAxODBcbiAgICAgICAgdGhldGEgPSBsbmcxIC0gbG5nMlxuICAgICAgICByYWR0aGV0YSA9IE1hdGguUEkgKiB0aGV0YSAvIDE4MFxuICAgICAgICBkaXN0ID0gTWF0aC5zaW4ocmFkbGF0MSkgKiBNYXRoLnNpbihyYWRsYXQyKSArIE1hdGguY29zKHJhZGxhdDEpICogTWF0aC5jb3MocmFkbGF0MikgKiBNYXRoLmNvcyhyYWR0aGV0YSlcbiAgICAgICAgZGlzdCA9IE1hdGguYWNvcyhkaXN0KVxuICAgICAgICBkaXN0ID0gZGlzdCAqIDE4MCAvIE1hdGguUElcbiAgICAgICAgZGlzdCA9IGRpc3QgKiA2MCAqIDEuMTUxNVxuICAgICAgICBkaXN0ID0gZGlzdCAqIDEuNjA5MzQ0ICogMTAwMFxuXG4gICAgICAgIGRpc3RcblxuICAgIGFzeW5jOlxuICAgICAgICBwYXJhbGxlbDogKGFzeW5jQ2FsbHMsIHNoYXJlZENhbGxiYWNrKSAtPlxuICAgICAgICAgICAgY291bnRlciA9IGFzeW5jQ2FsbHMubGVuZ3RoXG4gICAgICAgICAgICBhbGxSZXN1bHRzID0gW11cbiAgICAgICAgICAgIGsgPSAwXG5cbiAgICAgICAgICAgIG1ha2VDYWxsYmFjayA9IChpbmRleCkgLT5cbiAgICAgICAgICAgICAgICAtPlxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgICAgICAgICAgICAgaSA9IDBcblxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyLS1cblxuICAgICAgICAgICAgICAgICAgICB3aGlsZSBpIDwgYXJndW1lbnRzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoIGFyZ3VtZW50c1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgICAgICAgICAgICAgYWxsUmVzdWx0c1tpbmRleF0gPSByZXN1bHRzXG5cbiAgICAgICAgICAgICAgICAgICAgc2hhcmVkQ2FsbGJhY2sgYWxsUmVzdWx0cyBpZiBjb3VudGVyIGlzIDBcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgd2hpbGUgayA8IGFzeW5jQ2FsbHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgYXN5bmNDYWxsc1trXSBtYWtlQ2FsbGJhY2soaylcbiAgICAgICAgICAgICAgICBrKytcblxuICAgICAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gKGI2NC5sZW5ndGggKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIoKGxlbiAqIDMgLyA0KSAtIHBsYWNlSG9sZGVycylcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gbGVuIC0gNCA6IGxlblxuXG4gIHZhciBMID0gMFxuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICsgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxudmFyIEtfTUFYX0xFTkdUSCA9IDB4N2ZmZmZmZmZcbmV4cG9ydHMua01heExlbmd0aCA9IEtfTUFYX0xFTkdUSFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBQcmludCB3YXJuaW5nIGFuZCByZWNvbW1lbmQgdXNpbmcgYGJ1ZmZlcmAgdjQueCB3aGljaCBoYXMgYW4gT2JqZWN0XG4gKiAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBXZSByZXBvcnQgdGhhdCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBpZiB0aGUgYXJlIG5vdCBzdWJjbGFzc2FibGVcbiAqIHVzaW5nIF9fcHJvdG9fXy4gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWBcbiAqIChTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOCkuIElFIDEwIGxhY2tzIHN1cHBvcnRcbiAqIGZvciBfX3Byb3RvX18gYW5kIGhhcyBhIGJ1Z2d5IHR5cGVkIGFycmF5IGltcGxlbWVudGF0aW9uLlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdUaGlzIGJyb3dzZXIgbGFja3MgdHlwZWQgYXJyYXkgKFVpbnQ4QXJyYXkpIHN1cHBvcnQgd2hpY2ggaXMgcmVxdWlyZWQgYnkgJyArXG4gICAgJ2BidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuJ1xuICApXG59XG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgLy8gQ2FuIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkP1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICBidWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYnVmXG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICB2YWx1ZTogbnVsbCxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIE5vdGU6IENoYW5nZSBwcm90b3R5cGUgKmFmdGVyKiBCdWZmZXIuZnJvbSBpcyBkZWZpbmVkIHRvIHdvcmthcm91bmQgQ2hyb21lIGJ1Zzpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvMTQ4XG5CdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG5CdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAoc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdmFyIGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IGJ1Zi53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgYnVmID0gYnVmLnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgdmFyIGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgYnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0IChvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdmFyIGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoaXNBcnJheUJ1ZmZlclZpZXcob2JqKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgbnVtYmVySXNOYU4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcigwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWVcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKGlzQXJyYXlCdWZmZXJWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAobnVtYmVySXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKG51bWJlcklzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgKGJ5dGVzW2kgKyAxXSAqIDI1NikpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDApIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiBuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teKy8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gTm9kZSAwLjEwIHN1cHBvcnRzIGBBcnJheUJ1ZmZlcmAgYnV0IGxhY2tzIGBBcnJheUJ1ZmZlci5pc1ZpZXdgXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyAob2JqKSB7XG4gIHJldHVybiAodHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJykgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KG9iailcbn1cblxuZnVuY3Rpb24gbnVtYmVySXNOYU4gKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsIiFmdW5jdGlvbihnbG9iYWxzKSB7XG4ndXNlIHN0cmljdCdcblxudmFyIGNvbnZlcnRIZXggPSB7XG4gIGJ5dGVzVG9IZXg6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgLyppZiAodHlwZW9mIGJ5dGVzLmJ5dGVMZW5ndGggIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBuZXdCeXRlcyA9IFtdXG5cbiAgICAgIGlmICh0eXBlb2YgYnl0ZXMuYnVmZmVyICE9ICd1bmRlZmluZWQnKVxuICAgICAgICBieXRlcyA9IG5ldyBEYXRhVmlldyhieXRlcy5idWZmZXIpXG4gICAgICBlbHNlXG4gICAgICAgIGJ5dGVzID0gbmV3IERhdGFWaWV3KGJ5dGVzKVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmJ5dGVMZW5ndGg7ICsraSkge1xuICAgICAgICBuZXdCeXRlcy5wdXNoKGJ5dGVzLmdldFVpbnQ4KGkpKVxuICAgICAgfVxuICAgICAgYnl0ZXMgPSBuZXdCeXRlc1xuICAgIH0qL1xuICAgIHJldHVybiBhcnJCeXRlc1RvSGV4KGJ5dGVzKVxuICB9LFxuICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICBpZiAoaGV4Lmxlbmd0aCAlIDIgPT09IDEpIHRocm93IG5ldyBFcnJvcihcImhleFRvQnl0ZXMgY2FuJ3QgaGF2ZSBhIHN0cmluZyB3aXRoIGFuIG9kZCBudW1iZXIgb2YgY2hhcmFjdGVycy5cIilcbiAgICBpZiAoaGV4LmluZGV4T2YoJzB4JykgPT09IDApIGhleCA9IGhleC5zbGljZSgyKVxuICAgIHJldHVybiBoZXgubWF0Y2goLy4uL2cpLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiBwYXJzZUludCh4LDE2KSB9KVxuICB9XG59XG5cblxuLy8gUFJJVkFURVxuXG5mdW5jdGlvbiBhcnJCeXRlc1RvSGV4KGJ5dGVzKSB7XG4gIHJldHVybiBieXRlcy5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4gcGFkTGVmdCh4LnRvU3RyaW5nKDE2KSwyKSB9KS5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBwYWRMZWZ0KG9yaWcsIGxlbikge1xuICBpZiAob3JpZy5sZW5ndGggPiBsZW4pIHJldHVybiBvcmlnXG4gIHJldHVybiBBcnJheShsZW4gLSBvcmlnLmxlbmd0aCArIDEpLmpvaW4oJzAnKSArIG9yaWdcbn1cblxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHsgLy9Db21tb25KU1xuICBtb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnRIZXhcbn0gZWxzZSB7XG4gIGdsb2JhbHMuY29udmVydEhleCA9IGNvbnZlcnRIZXhcbn1cblxufSh0aGlzKTsiLCIhZnVuY3Rpb24oZ2xvYmFscykge1xuJ3VzZSBzdHJpY3QnXG5cbnZhciBjb252ZXJ0U3RyaW5nID0ge1xuICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgIHJldHVybiBieXRlcy5tYXAoZnVuY3Rpb24oeCl7IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHgpIH0pLmpvaW4oJycpXG4gIH0sXG4gIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiB4LmNoYXJDb2RlQXQoMCkgfSlcbiAgfVxufVxuXG4vL2h0dHA6Ly9ob3NzYS5pbi8yMDEyLzA3LzIwL3V0Zi04LWluLWphdmFzY3JpcHQuaHRtbFxuY29udmVydFN0cmluZy5VVEY4ID0ge1xuICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShjb252ZXJ0U3RyaW5nLmJ5dGVzVG9TdHJpbmcoYnl0ZXMpKSlcbiAgfSxcbiAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICByZXR1cm4gY29udmVydFN0cmluZy5zdHJpbmdUb0J5dGVzKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSlcbiAgfVxufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHsgLy9Db21tb25KU1xuICBtb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnRTdHJpbmdcbn0gZWxzZSB7XG4gIGdsb2JhbHMuY29udmVydFN0cmluZyA9IGNvbnZlcnRTdHJpbmdcbn1cblxufSh0aGlzKTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0IENyYWlnIENhbXBiZWxsXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogR0FUT1IuSlNcbiAqIFNpbXBsZSBFdmVudCBEZWxlZ2F0aW9uXG4gKlxuICogQHZlcnNpb24gMS4yLjRcbiAqXG4gKiBDb21wYXRpYmxlIHdpdGggSUUgOSssIEZGIDMuNissIFNhZmFyaSA1KywgQ2hyb21lXG4gKlxuICogSW5jbHVkZSBsZWdhY3kuanMgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciBicm93c2Vyc1xuICpcbiAqICAgICAgICAgICAgIC4tLl8gICBfIF8gXyBfIF8gXyBfIF9cbiAqICAuLScnLS5fXy4tJzAwICAnLScgJyAnICcgJyAnICcgJyAnLS5cbiAqICcuX19fICcgICAgLiAgIC4tLV8nLScgJy0nICctJyBfJy0nICcuX1xuICogIFY6IFYgJ3Z2LScgICAnXyAgICcuICAgICAgIC4nICBfLi4nICcuJy5cbiAqICAgICc9Ll9fX18uPV8uLS0nICAgOl8uX18uX186XyAgICcuICAgOiA6XG4gKiAgICAgICAgICAgICgoKF9fX18uLScgICAgICAgICctLiAgLyAgIDogOlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCgtJ1xcIC4nIC9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fX19fLi4nICAuJ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAnLS5fX19fXy4tJ1xuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9tYXRjaGVyLFxuICAgICAgICBfbGV2ZWwgPSAwLFxuICAgICAgICBfaWQgPSAwLFxuICAgICAgICBfaGFuZGxlcnMgPSB7fSxcbiAgICAgICAgX2dhdG9ySW5zdGFuY2VzID0ge307XG5cbiAgICBmdW5jdGlvbiBfYWRkRXZlbnQoZ2F0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgLy8gYmx1ciBhbmQgZm9jdXMgZG8gbm90IGJ1YmJsZSB1cCBidXQgaWYgeW91IHVzZSBldmVudCBjYXB0dXJpbmdcbiAgICAgICAgLy8gdGhlbiB5b3Ugd2lsbCBnZXQgdGhlbVxuICAgICAgICB2YXIgdXNlQ2FwdHVyZSA9IHR5cGUgPT0gJ2JsdXInIHx8IHR5cGUgPT0gJ2ZvY3VzJztcbiAgICAgICAgZ2F0b3IuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfY2FuY2VsKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybnMgZnVuY3Rpb24gdG8gdXNlIGZvciBkZXRlcm1pbmluZyBpZiBhbiBlbGVtZW50XG4gICAgICogbWF0Y2hlcyBhIHF1ZXJ5IHNlbGVjdG9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dldE1hdGNoZXIoZWxlbWVudCkge1xuICAgICAgICBpZiAoX21hdGNoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfbWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm1hdGNoZXMpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5tYXRjaGVzO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICBfbWF0Y2hlciA9IGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICBfbWF0Y2hlciA9IGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICAgICAgICAgIHJldHVybiBfbWF0Y2hlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgZG9lc24ndCBtYXRjaCBhIG5hdGl2ZSBicm93c2VyIG1ldGhvZFxuICAgICAgICAvLyBmYWxsIGJhY2sgdG8gdGhlIGdhdG9yIGZ1bmN0aW9uXG4gICAgICAgIF9tYXRjaGVyID0gR2F0b3IubWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGV0ZXJtaW5lcyBpZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgbWF0Y2hlcyBhIGdpdmVuIHNlbGVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnQgLSB0aGUgZWxlbWVudCB0byBjb21wYXJlIGFnYWluc3QgdGhlIHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtOb2RlfSBib3VuZEVsZW1lbnQgLSB0aGUgZWxlbWVudCB0aGUgbGlzdGVuZXIgd2FzIGF0dGFjaGVkIHRvXG4gICAgICogQHJldHVybnMge3ZvaWR8Tm9kZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yLCBib3VuZEVsZW1lbnQpIHtcblxuICAgICAgICAvLyBubyBzZWxlY3RvciBtZWFucyB0aGlzIGV2ZW50IHdhcyBib3VuZCBkaXJlY3RseSB0byB0aGlzIGVsZW1lbnRcbiAgICAgICAgaWYgKHNlbGVjdG9yID09ICdfcm9vdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBib3VuZEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIG1vdmVkIHVwIHRvIHRoZSBlbGVtZW50IHlvdSBib3VuZCB0aGUgZXZlbnQgdG9cbiAgICAgICAgLy8gdGhlbiB3ZSBoYXZlIGNvbWUgdG9vIGZhclxuICAgICAgICBpZiAoZWxlbWVudCA9PT0gYm91bmRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGlzIGlzIGEgbWF0Y2ggdGhlbiB3ZSBhcmUgZG9uZSFcbiAgICAgICAgaWYgKF9nZXRNYXRjaGVyKGVsZW1lbnQpLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoaXMgZWxlbWVudCBkaWQgbm90IG1hdGNoIGJ1dCBoYXMgYSBwYXJlbnQgd2Ugc2hvdWxkIHRyeVxuICAgICAgICAvLyBnb2luZyB1cCB0aGUgdHJlZSB0byBzZWUgaWYgYW55IG9mIHRoZSBwYXJlbnQgZWxlbWVudHMgbWF0Y2hcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgeW91IGFyZSBsb29raW5nIGZvciBhIGNsaWNrIG9uIGFuIDxhPiB0YWcgYnV0IHRoZXJlXG4gICAgICAgIC8vIGlzIGEgPHNwYW4+IGluc2lkZSBvZiB0aGUgYSB0YWcgdGhhdCBpdCBpcyB0aGUgdGFyZ2V0LFxuICAgICAgICAvLyBpdCBzaG91bGQgc3RpbGwgd29ya1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBfbGV2ZWwrKztcbiAgICAgICAgICAgIHJldHVybiBfbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQucGFyZW50Tm9kZSwgc2VsZWN0b3IsIGJvdW5kRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfYWRkSGFuZGxlcihnYXRvciwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoIV9oYW5kbGVyc1tnYXRvci5pZF0pIHtcbiAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF0pIHtcbiAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXSkge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3JlbW92ZUhhbmRsZXIoZ2F0b3IsIGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spIHtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHRpZWQgdG8gdGhpcyBlbGVtZW50IGF0IGFsbFxuICAgICAgICAvLyB0aGVuIGRvbid0IGRvIGFueXRoaW5nXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gZXZlbnQgdHlwZSBzcGVjaWZpZWQgdGhlbiByZW1vdmUgYWxsIGV2ZW50c1xuICAgICAgICAvLyBleGFtcGxlOiBHYXRvcihlbGVtZW50KS5vZmYoKVxuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKHZhciB0eXBlIGluIF9oYW5kbGVyc1tnYXRvci5pZF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoX2hhbmRsZXJzW2dhdG9yLmlkXS5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW3R5cGVdID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm8gY2FsbGJhY2sgb3Igc2VsZWN0b3IgaXMgc3BlY2lmaWVkIHJlbW92ZSBhbGwgZXZlbnRzIG9mIHRoaXMgdHlwZVxuICAgICAgICAvLyBleGFtcGxlOiBHYXRvcihlbGVtZW50KS5vZmYoJ2NsaWNrJylcbiAgICAgICAgaWYgKCFjYWxsYmFjayAmJiAhc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdID0ge307XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBhIHNlbGVjdG9yIGlzIHNwZWNpZmllZCBidXQgbm8gY2FsbGJhY2sgcmVtb3ZlIGFsbCBldmVudHNcbiAgICAgICAgLy8gZm9yIHRoaXMgc2VsZWN0b3JcbiAgICAgICAgLy8gZXhhbXBsZTogR2F0b3IoZWxlbWVudCkub2ZmKCdjbGljaycsICcuc3ViLWVsZW1lbnQnKVxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICBkZWxldGUgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBzcGVjaWZpZWQgYW4gZXZlbnQgdHlwZSwgc2VsZWN0b3IsIGFuZCBjYWxsYmFjayB0aGVuIHdlXG4gICAgICAgIC8vIG5lZWQgdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBjYWxsYmFja3MgdGllZCB0byB0aGlzIHNlbGVjdG9yIHRvXG4gICAgICAgIC8vIGJlZ2luIHdpdGguICBpZiB0aGVyZSBhcmVuJ3QgdGhlbiB3ZSBjYW4gc3RvcCBoZXJlXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgdGhlbiBsb29wIHRocm91Z2ggYWxsIHRoZSBjYWxsYmFja3MgYW5kIGlmIHdlIGZpbmRcbiAgICAgICAgLy8gb25lIHRoYXQgbWF0Y2hlcyByZW1vdmUgaXQgZnJvbSB0aGUgYXJyYXlcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl1baV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9oYW5kbGVFdmVudChpZCwgZSwgdHlwZSkge1xuICAgICAgICBpZiAoIV9oYW5kbGVyc1tpZF1bdHlwZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsXG4gICAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgICAgbWF0Y2hlcyA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMDtcblxuICAgICAgICAvLyBmaW5kIGFsbCBldmVudHMgdGhhdCBtYXRjaFxuICAgICAgICBfbGV2ZWwgPSAwO1xuICAgICAgICBmb3IgKHNlbGVjdG9yIGluIF9oYW5kbGVyc1tpZF1bdHlwZV0pIHtcbiAgICAgICAgICAgIGlmIChfaGFuZGxlcnNbaWRdW3R5cGVdLmhhc093blByb3BlcnR5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gX21hdGNoZXNTZWxlY3Rvcih0YXJnZXQsIHNlbGVjdG9yLCBfZ2F0b3JJbnN0YW5jZXNbaWRdLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIEdhdG9yLm1hdGNoZXNFdmVudCh0eXBlLCBfZ2F0b3JJbnN0YW5jZXNbaWRdLmVsZW1lbnQsIG1hdGNoLCBzZWxlY3RvciA9PSAnX3Jvb3QnLCBlKSkge1xuICAgICAgICAgICAgICAgICAgICBfbGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgX2hhbmRsZXJzW2lkXVt0eXBlXVtzZWxlY3Rvcl0ubWF0Y2ggPSBtYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlc1tfbGV2ZWxdID0gX2hhbmRsZXJzW2lkXVt0eXBlXVtzZWxlY3Rvcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcFByb3BhZ2F0aW9uKCkgZmFpbHMgdG8gc2V0IGNhbmNlbEJ1YmJsZSB0byB0cnVlIGluIFdlYmtpdFxuICAgICAgICAvLyBAc2VlIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE2MjI3MFxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPD0gX2xldmVsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG1hdGNoZXNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNbaV1bal0uY2FsbChtYXRjaGVzW2ldLm1hdGNoLCBlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhdG9yLmNhbmNlbChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmNhbmNlbEJ1YmJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZHMgdGhlIHNwZWNpZmllZCBldmVudHMgdG8gdGhlIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IHJlbW92ZVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2JpbmQoZXZlbnRzLCBzZWxlY3RvciwgY2FsbGJhY2ssIHJlbW92ZSkge1xuXG4gICAgICAgIC8vIGZhaWwgc2lsZW50bHkgaWYgeW91IHBhc3MgbnVsbCBvciB1bmRlZmluZWQgYXMgYW4gYWxlbWVudFxuICAgICAgICAvLyBpbiB0aGUgR2F0b3IgY29uc3RydWN0b3JcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGV2ZW50cyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgZXZlbnRzID0gW2V2ZW50c107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZihzZWxlY3RvcikgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gJ19yb290JztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQsXG4gICAgICAgICAgICBpO1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRHbG9iYWxDYWxsYmFjayh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIF9oYW5kbGVFdmVudChpZCwgZSwgdHlwZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgICAgIF9yZW1vdmVIYW5kbGVyKHRoaXMsIGV2ZW50c1tpXSwgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFfaGFuZGxlcnNbaWRdIHx8ICFfaGFuZGxlcnNbaWRdW2V2ZW50c1tpXV0pIHtcbiAgICAgICAgICAgICAgICBHYXRvci5hZGRFdmVudCh0aGlzLCBldmVudHNbaV0sIF9nZXRHbG9iYWxDYWxsYmFjayhldmVudHNbaV0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2FkZEhhbmRsZXIodGhpcywgZXZlbnRzW2ldLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2F0b3Igb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGVsZW1lbnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBHYXRvcihlbGVtZW50LCBpZCkge1xuXG4gICAgICAgIC8vIGNhbGxlZCBhcyBmdW5jdGlvblxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgR2F0b3IpKSB7XG4gICAgICAgICAgICAvLyBvbmx5IGtlZXAgb25lIEdhdG9yIGluc3RhbmNlIHBlciBub2RlIHRvIG1ha2Ugc3VyZSB0aGF0XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBjcmVhdGUgYSB0b24gb2YgbmV3IG9iamVjdHMgaWYgeW91IHdhbnQgdG8gZGVsZWdhdGVcbiAgICAgICAgICAgIC8vIG11bHRpcGxlIGV2ZW50cyBmcm9tIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBmb3IgZXhhbXBsZTogR2F0b3IoZG9jdW1lbnQpLm9uKC4uLlxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIF9nYXRvckluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgIGlmIChfZ2F0b3JJbnN0YW5jZXNba2V5XS5lbGVtZW50ID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZ2F0b3JJbnN0YW5jZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9pZCsrO1xuICAgICAgICAgICAgX2dhdG9ySW5zdGFuY2VzW19pZF0gPSBuZXcgR2F0b3IoZWxlbWVudCwgX2lkKTtcblxuICAgICAgICAgICAgcmV0dXJuIF9nYXRvckluc3RhbmNlc1tfaWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZHMgYW4gZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgR2F0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnRzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIF9iaW5kLmNhbGwodGhpcywgZXZlbnRzLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVzIGFuIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheX0gZXZlbnRzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIEdhdG9yLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gX2JpbmQuY2FsbCh0aGlzLCBldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgfTtcblxuICAgIEdhdG9yLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCkge307XG4gICAgR2F0b3IuY2FuY2VsID0gX2NhbmNlbDtcbiAgICBHYXRvci5hZGRFdmVudCA9IF9hZGRFdmVudDtcbiAgICBHYXRvci5tYXRjaGVzRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IEdhdG9yO1xuICAgIH1cblxuICAgIHdpbmRvdy5HYXRvciA9IEdhdG9yO1xufSkgKCk7XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsIi8qKlxuICogTWljcm9FdmVudCAtIHRvIG1ha2UgYW55IGpzIG9iamVjdCBhbiBldmVudCBlbWl0dGVyIChzZXJ2ZXIgb3IgYnJvd3NlcilcbiAqIFxuICogLSBwdXJlIGphdmFzY3JpcHQgLSBzZXJ2ZXIgY29tcGF0aWJsZSwgYnJvd3NlciBjb21wYXRpYmxlXG4gKiAtIGRvbnQgcmVseSBvbiB0aGUgYnJvd3NlciBkb21zXG4gKiAtIHN1cGVyIHNpbXBsZSAtIHlvdSBnZXQgaXQgaW1tZWRpYXRseSwgbm8gbWlzdGVyeSwgbm8gbWFnaWMgaW52b2x2ZWRcbiAqXG4gKiAtIGNyZWF0ZSBhIE1pY3JvRXZlbnREZWJ1ZyB3aXRoIGdvb2RpZXMgdG8gZGVidWdcbiAqICAgLSBtYWtlIGl0IHNhZmVyIHRvIHVzZVxuKi9cblxudmFyIE1pY3JvRXZlbnRcdD0gZnVuY3Rpb24oKXt9XG5NaWNyb0V2ZW50LnByb3RvdHlwZVx0PSB7XG5cdGJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0gPSB0aGlzLl9ldmVudHNbZXZlbnRdXHR8fCBbXTtcblx0XHR0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2goZmN0KTtcblx0fSxcblx0dW5iaW5kXHQ6IGZ1bmN0aW9uKGV2ZW50LCBmY3Qpe1xuXHRcdHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcblx0XHRpZiggZXZlbnQgaW4gdGhpcy5fZXZlbnRzID09PSBmYWxzZSAgKVx0cmV0dXJuO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0uc3BsaWNlKHRoaXMuX2V2ZW50c1tldmVudF0uaW5kZXhPZihmY3QpLCAxKTtcblx0fSxcblx0dHJpZ2dlclx0OiBmdW5jdGlvbihldmVudCAvKiAsIGFyZ3MuLi4gKi8pe1xuXHRcdHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcblx0XHRpZiggZXZlbnQgaW4gdGhpcy5fZXZlbnRzID09PSBmYWxzZSAgKVx0cmV0dXJuO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHNbZXZlbnRdLmxlbmd0aDsgaSsrKXtcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudF1baV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSlcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogbWl4aW4gd2lsbCBkZWxlZ2F0ZSBhbGwgTWljcm9FdmVudC5qcyBmdW5jdGlvbiBpbiB0aGUgZGVzdGluYXRpb24gb2JqZWN0XG4gKlxuICogLSByZXF1aXJlKCdNaWNyb0V2ZW50JykubWl4aW4oRm9vYmFyKSB3aWxsIG1ha2UgRm9vYmFyIGFibGUgdG8gdXNlIE1pY3JvRXZlbnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdGhlIG9iamVjdCB3aGljaCB3aWxsIHN1cHBvcnQgTWljcm9FdmVudFxuKi9cbk1pY3JvRXZlbnQubWl4aW5cdD0gZnVuY3Rpb24oZGVzdE9iamVjdCl7XG5cdHZhciBwcm9wc1x0PSBbJ2JpbmQnLCAndW5iaW5kJywgJ3RyaWdnZXInXTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArKyl7XG5cdFx0ZGVzdE9iamVjdC5wcm90b3R5cGVbcHJvcHNbaV1dXHQ9IE1pY3JvRXZlbnQucHJvdG90eXBlW3Byb3BzW2ldXTtcblx0fVxufVxuXG4vLyBleHBvcnQgaW4gY29tbW9uIGpzXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAoJ2V4cG9ydHMnIGluIG1vZHVsZSkpe1xuXHRtb2R1bGUuZXhwb3J0c1x0PSBNaWNyb0V2ZW50XG59XG4iLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICovXG5cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UgTXVzdGFjaGU6IHRydWUqL1xuXG4oZnVuY3Rpb24gZGVmaW5lTXVzdGFjaGUgKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgdHlwZW9mIGV4cG9ydHMubm9kZU5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgZmFjdG9yeShleHBvcnRzKTsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpOyAvLyBBTURcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWwuTXVzdGFjaGUgPSB7fTtcbiAgICBmYWN0b3J5KGdsb2JhbC5NdXN0YWNoZSk7IC8vIHNjcmlwdCwgd3NoLCBhc3BcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiBtdXN0YWNoZUZhY3RvcnkgKG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbCAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3JlIGNvcnJlY3QgdHlwZW9mIHN0cmluZyBoYW5kbGluZyBhcnJheVxuICAgKiB3aGljaCBub3JtYWxseSByZXR1cm5zIHR5cGVvZiAnb2JqZWN0J1xuICAgKi9cbiAgZnVuY3Rpb24gdHlwZVN0ciAob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwIChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkgKG9iaiwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKHByb3BOYW1lIGluIG9iaik7XG4gIH1cblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciByZWdFeHBUZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuICBmdW5jdGlvbiB0ZXN0UmVnRXhwIChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZSAoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnLFxuICAgICdgJzogJyYjeDYwOycsXG4gICAgJz0nOiAnJiN4M0Q7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwgKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAgKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSAoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aClcbiAgICAgICAgICBkZWxldGUgdG9rZW5zW3NwYWNlcy5wb3AoKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3MgKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbICd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxIF0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdDdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGN1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgICB0eXBlID0gJyYnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFsgdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvcyBdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIENoZWNrIHNlY3Rpb24gbmVzdGluZy5cbiAgICAgICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgICAgICBpZiAoIW9wZW5TZWN0aW9uKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5vcGVuZWQgc2VjdGlvbiBcIicgKyB2YWx1ZSArICdcIiBhdCAnICsgc3RhcnQpO1xuXG4gICAgICAgIGlmIChvcGVuU2VjdGlvblsxXSAhPT0gdmFsdWUpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzdGFydCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2VucyAodG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnMgKHRva2Vucykge1xuICAgIHZhciBuZXN0ZWRUb2tlbnMgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gbmVzdGVkVG9rZW5zO1xuICAgIHZhciBzZWN0aW9ucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBzZWN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgIGNhc2UgJyMnOlxuICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgY29sbGVjdG9yID0gdG9rZW5bNF0gPSBbXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSBzZWN0aW9ucy5sZW5ndGggPiAwID8gc2VjdGlvbnNbc2VjdGlvbnMubGVuZ3RoIC0gMV1bNF0gOiBuZXN0ZWRUb2tlbnM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXN0ZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogQSBzaW1wbGUgc3RyaW5nIHNjYW5uZXIgdGhhdCBpcyB1c2VkIGJ5IHRoZSB0ZW1wbGF0ZSBwYXJzZXIgdG8gZmluZFxuICAgKiB0b2tlbnMgaW4gdGVtcGxhdGUgc3RyaW5ncy5cbiAgICovXG4gIGZ1bmN0aW9uIFNjYW5uZXIgKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zICgpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbiAocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnRhaWwubWF0Y2gocmUpO1xuXG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCAhPT0gMClcbiAgICAgIHJldHVybiAnJztcblxuICAgIHZhciBzdHJpbmcgPSBtYXRjaFswXTtcblxuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCk7XG4gICAgdGhpcy5wb3MgKz0gc3RyaW5nLmxlbmd0aDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNraXBzIGFsbCB0ZXh0IHVudGlsIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gY2FuIGJlIG1hdGNoZWQuIFJldHVybnNcbiAgICogdGhlIHNraXBwZWQgc3RyaW5nLCB3aGljaCBpcyB0aGUgZW50aXJlIHRhaWwgaWYgbm8gbWF0Y2ggY2FuIGJlIG1hZGUuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuVW50aWwgPSBmdW5jdGlvbiBzY2FuVW50aWwgKHJlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICAgIHRoaXMudGFpbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbWF0Y2ggPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxuICAgKiBtYWludGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBDb250ZXh0ICh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0geyAnLic6IHRoaXMudmlldyB9O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Q29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNvbnRleHQgdXNpbmcgdGhlIGdpdmVuIHZpZXcgd2l0aCB0aGlzIGNvbnRleHRcbiAgICogYXMgdGhlIHBhcmVudC5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoICh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBDb250ZXh0KHZpZXcsIHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcbiAgICogdXAgdGhlIGNvbnRleHQgaGllcmFyY2h5IGlmIHRoZSB2YWx1ZSBpcyBhYnNlbnQgaW4gdGhpcyBjb250ZXh0J3Mgdmlldy5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cCAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIG5hbWVzLCBpbmRleCwgbG9va3VwSGl0ID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlldztcbiAgICAgICAgICBuYW1lcyA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBVc2luZyB0aGUgZG90IG5vdGlvbiBwYXRoIGluIGBuYW1lYCwgd2UgZGVzY2VuZCB0aHJvdWdoIHRoZVxuICAgICAgICAgICAqIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVG8gYmUgY2VydGFpbiB0aGF0IHRoZSBsb29rdXAgaGFzIGJlZW4gc3VjY2Vzc2Z1bCwgd2UgaGF2ZSB0b1xuICAgICAgICAgICAqIGNoZWNrIGlmIHRoZSBsYXN0IG9iamVjdCBpbiB0aGUgcGF0aCBhY3R1YWxseSBoYXMgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICogd2UgYXJlIGxvb2tpbmcgZm9yLiBXZSBzdG9yZSB0aGUgcmVzdWx0IGluIGBsb29rdXBIaXRgLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVGhpcyBpcyBzcGVjaWFsbHkgbmVjZXNzYXJ5IGZvciB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXQgdG9cbiAgICAgICAgICAgKiBgdW5kZWZpbmVkYCBhbmQgd2Ugd2FudCB0byBhdm9pZCBsb29raW5nIHVwIHBhcmVudCBjb250ZXh0cy5cbiAgICAgICAgICAgKiovXG4gICAgICAgICAgd2hpbGUgKHZhbHVlICE9IG51bGwgJiYgaW5kZXggPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbmFtZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkodmFsdWUsIG5hbWVzW2luZGV4XSk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbbmFtZXNbaW5kZXgrK11dO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcbiAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eShjb250ZXh0LnZpZXcsIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvb2t1cEhpdClcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGNhY2hlW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKVxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKHRoaXMudmlldyk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgV3JpdGVyIGtub3dzIGhvdyB0byB0YWtlIGEgc3RyZWFtIG9mIHRva2VucyBhbmQgcmVuZGVyIHRoZW0gdG8gYVxuICAgKiBzdHJpbmcsIGdpdmVuIGEgY29udGV4dC4gSXQgYWxzbyBtYWludGFpbnMgYSBjYWNoZSBvZiB0ZW1wbGF0ZXMgdG9cbiAgICogYXZvaWQgdGhlIG5lZWQgdG8gcGFyc2UgdGhlIHNhbWUgdGVtcGxhdGUgdHdpY2UuXG4gICAqL1xuICBmdW5jdGlvbiBXcml0ZXIgKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlICgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICB2YXIgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdO1xuXG4gICAgaWYgKHRva2VucyA9PSBudWxsKVxuICAgICAgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncyk7XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdoLWxldmVsIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHdpdGhcbiAgICogdGhlIGdpdmVuIGB2aWV3YC5cbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIGBwYXJ0aWFsc2AgYXJndW1lbnQgbWF5IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuICAgKiBuYW1lcyBhbmQgdGVtcGxhdGVzIG9mIHBhcnRpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLiBJdCBtYXlcbiAgICogYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBsb2FkIHBhcnRpYWwgdGVtcGxhdGVzIG9uIHRoZSBmbHlcbiAgICogdGhhdCB0YWtlcyBhIHNpbmdsZSBhcmd1bWVudDogdGhlIG5hbWUgb2YgdGhlIHBhcnRpYWwuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UodGVtcGxhdGUpO1xuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zICh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgdmFyIHRva2VuLCBzeW1ib2wsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzeW1ib2wgPSB0b2tlblswXTtcblxuICAgICAgaWYgKHN5bWJvbCA9PT0gJyMnKSB2YWx1ZSA9IHRoaXMucmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICcmJykgdmFsdWUgPSB0aGlzLnVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ25hbWUnKSB2YWx1ZSA9IHRoaXMuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbiAodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVuZGVyIGFuIGFyYml0cmFyeSB0ZW1wbGF0ZVxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlciAodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMpO1xuICAgIH1cblxuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBqIDwgdmFsdWVMZW5ndGg7ICsraikge1xuICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVySW52ZXJ0ZWQgPSBmdW5jdGlvbiByZW5kZXJJbnZlcnRlZCAodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclBhcnRpYWwgPSBmdW5jdGlvbiByZW5kZXJQYXJ0aWFsICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUgKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gZXNjYXBlZFZhbHVlICh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSAodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4zLjAnO1xuICBtdXN0YWNoZS50YWdzID0gWyAne3snLCAnfX0nIF07XG5cbiAgLy8gQWxsIGhpZ2gtbGV2ZWwgbXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlICgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBgdGVtcGxhdGVgIHdpdGggdGhlIGdpdmVuIGB2aWV3YCBhbmQgYHBhcnRpYWxzYCB1c2luZyB0aGVcbiAgICogZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguLFxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiB0b19odG1sICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcblxuICAvLyBFeHBvcnQgdGhlc2UgbWFpbmx5IGZvciB0ZXN0aW5nLCBidXQgYWxzbyBmb3IgYWR2YW5jZWQgdXNhZ2UuXG4gIG11c3RhY2hlLlNjYW5uZXIgPSBTY2FubmVyO1xuICBtdXN0YWNoZS5Db250ZXh0ID0gQ29udGV4dDtcbiAgbXVzdGFjaGUuV3JpdGVyID0gV3JpdGVyO1xuXG4gIHJldHVybiBtdXN0YWNoZTtcbn0pKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIhZnVuY3Rpb24oZ2xvYmFscykge1xuJ3VzZSBzdHJpY3QnXG5cbnZhciBfaW1wb3J0cyA9IHt9XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvL0NvbW1vbkpTXG4gIF9pbXBvcnRzLmJ5dGVzVG9IZXggPSByZXF1aXJlKCdjb252ZXJ0LWhleCcpLmJ5dGVzVG9IZXhcbiAgX2ltcG9ydHMuY29udmVydFN0cmluZyA9IHJlcXVpcmUoJ2NvbnZlcnQtc3RyaW5nJylcbiAgbW9kdWxlLmV4cG9ydHMgPSBzaGEyNTZcbn0gZWxzZSB7XG4gIF9pbXBvcnRzLmJ5dGVzVG9IZXggPSBnbG9iYWxzLmNvbnZlcnRIZXguYnl0ZXNUb0hleFxuICBfaW1wb3J0cy5jb252ZXJ0U3RyaW5nID0gZ2xvYmFscy5jb252ZXJ0U3RyaW5nXG4gIGdsb2JhbHMuc2hhMjU2ID0gc2hhMjU2XG59XG5cbi8qXG5DcnlwdG9KUyB2My4xLjJcbmNvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qc1xuKGMpIDIwMDktMjAxMyBieSBKZWZmIE1vdHQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5jb2RlLmdvb2dsZS5jb20vcC9jcnlwdG8tanMvd2lraS9MaWNlbnNlXG4qL1xuXG4vLyBJbml0aWFsaXphdGlvbiByb3VuZCBjb25zdGFudHMgdGFibGVzXG52YXIgSyA9IFtdXG5cbi8vIENvbXB1dGUgY29uc3RhbnRzXG4hZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcbiAgICB2YXIgc3FydE4gPSBNYXRoLnNxcnQobik7XG4gICAgZm9yICh2YXIgZmFjdG9yID0gMjsgZmFjdG9yIDw9IHNxcnROOyBmYWN0b3IrKykge1xuICAgICAgaWYgKCEobiAlIGZhY3RvcikpIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRGcmFjdGlvbmFsQml0cyhuKSB7XG4gICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMFxuICB9XG5cbiAgdmFyIG4gPSAyXG4gIHZhciBuUHJpbWUgPSAwXG4gIHdoaWxlIChuUHJpbWUgPCA2NCkge1xuICAgIGlmIChpc1ByaW1lKG4pKSB7XG4gICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpXG4gICAgICBuUHJpbWUrK1xuICAgIH1cblxuICAgIG4rK1xuICB9XG59KClcblxudmFyIGJ5dGVzVG9Xb3JkcyA9IGZ1bmN0aW9uIChieXRlcykge1xuICB2YXIgd29yZHMgPSBbXVxuICBmb3IgKHZhciBpID0gMCwgYiA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKywgYiArPSA4KSB7XG4gICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKVxuICB9XG4gIHJldHVybiB3b3Jkc1xufVxuXG52YXIgd29yZHNUb0J5dGVzID0gZnVuY3Rpb24gKHdvcmRzKSB7XG4gIHZhciBieXRlcyA9IFtdXG4gIGZvciAodmFyIGIgPSAwOyBiIDwgd29yZHMubGVuZ3RoICogMzI7IGIgKz0gOCkge1xuICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbi8vIFJldXNhYmxlIG9iamVjdFxudmFyIFcgPSBbXVxuXG52YXIgcHJvY2Vzc0Jsb2NrID0gZnVuY3Rpb24gKEgsIE0sIG9mZnNldCkge1xuICAvLyBXb3JraW5nIHZhcmlhYmxlc1xuICB2YXIgYSA9IEhbMF0sIGIgPSBIWzFdLCBjID0gSFsyXSwgZCA9IEhbM11cbiAgdmFyIGUgPSBIWzRdLCBmID0gSFs1XSwgZyA9IEhbNl0sIGggPSBIWzddXG5cbiAgICAvLyBDb21wdXRhdGlvblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICBpZiAoaSA8IDE2KSB7XG4gICAgICBXW2ldID0gTVtvZmZzZXQgKyBpXSB8IDBcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV1cbiAgICAgIHZhciBnYW1tYTAgID0gKChnYW1tYTB4IDw8IDI1KSB8IChnYW1tYTB4ID4+PiA3KSkgIF5cbiAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cbiAgICAgICAgICAgICAgICAgICAgKGdhbW1hMHggPj4+IDMpXG5cbiAgICAgIHZhciBnYW1tYTF4ID0gV1tpIC0gMl07XG4gICAgICB2YXIgZ2FtbWExICA9ICgoZ2FtbWExeCA8PCAxNSkgfCAoZ2FtbWExeCA+Pj4gMTcpKSBeXG4gICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG4gICAgICAgICAgICAgICAgICAgIChnYW1tYTF4ID4+PiAxMClcblxuICAgICAgV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdO1xuICAgIH1cblxuICAgIHZhciBjaCAgPSAoZSAmIGYpIF4gKH5lICYgZyk7XG4gICAgdmFyIG1haiA9IChhICYgYikgXiAoYSAmIGMpIF4gKGIgJiBjKTtcblxuICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcbiAgICB2YXIgc2lnbWExID0gKChlIDw8IDI2KSB8IChlID4+PiA2KSkgXiAoKGUgPDwgMjEpIHwgKGUgPj4+IDExKSkgXiAoKGUgPDwgNykgIHwgKGUgPj4+IDI1KSk7XG5cbiAgICB2YXIgdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXTtcbiAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cbiAgICBoID0gZztcbiAgICBnID0gZjtcbiAgICBmID0gZTtcbiAgICBlID0gKGQgKyB0MSkgfCAwO1xuICAgIGQgPSBjO1xuICAgIGMgPSBiO1xuICAgIGIgPSBhO1xuICAgIGEgPSAodDEgKyB0MikgfCAwO1xuICB9XG5cbiAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcbiAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG4gIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcbiAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG4gIEhbNV0gPSAoSFs1XSArIGYpIHwgMDtcbiAgSFs2XSA9IChIWzZdICsgZykgfCAwO1xuICBIWzddID0gKEhbN10gKyBoKSB8IDA7XG59XG5cbmZ1bmN0aW9uIHNoYTI1NihtZXNzYWdlLCBvcHRpb25zKSB7O1xuICBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSB7XG4gICAgbWVzc2FnZSA9IF9pbXBvcnRzLmNvbnZlcnRTdHJpbmcuVVRGOC5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xuICB9XG5cbiAgdmFyIEggPVsgMHg2QTA5RTY2NywgMHhCQjY3QUU4NSwgMHgzQzZFRjM3MiwgMHhBNTRGRjUzQSxcbiAgICAgICAgICAgMHg1MTBFNTI3RiwgMHg5QjA1Njg4QywgMHgxRjgzRDlBQiwgMHg1QkUwQ0QxOSBdO1xuXG4gIHZhciBtID0gYnl0ZXNUb1dvcmRzKG1lc3NhZ2UpO1xuICB2YXIgbCA9IG1lc3NhZ2UubGVuZ3RoICogODtcblxuICBtW2wgPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsICUgMzIpO1xuICBtWygobCArIDY0ID4+IDkpIDw8IDQpICsgMTVdID0gbDtcblxuICBmb3IgKHZhciBpPTAgOyBpPG0ubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgcHJvY2Vzc0Jsb2NrKEgsIG0sIGkpO1xuICB9XG5cbiAgdmFyIGRpZ2VzdGJ5dGVzID0gd29yZHNUb0J5dGVzKEgpO1xuICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLmFzQnl0ZXMgPyBkaWdlc3RieXRlcyA6XG4gICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBfaW1wb3J0cy5jb252ZXJ0U3RyaW5nLmJ5dGVzVG9TdHJpbmcoZGlnZXN0Ynl0ZXMpIDpcbiAgICAgICAgIF9pbXBvcnRzLmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpXG59XG5cbnNoYTI1Ni54MiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHNoYTI1NihzaGEyNTYobWVzc2FnZSwgeyBhc0J5dGVzOnRydWUgfSksIG9wdGlvbnMpXG59XG5cbn0odGhpcyk7XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQW5pbWF0aW9uXG4gICAgY29uc3RydWN0b3I6IChAZWwpIC0+XG4gICAgICAgIEBydW4gPSAwXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhbmltYXRlOiAob3B0aW9ucyA9IHt9LCBjYWxsYmFjayA9IC0+KSAtPlxuICAgICAgICB4ID0gb3B0aW9ucy54ID8gMFxuICAgICAgICB5ID0gb3B0aW9ucy55ID8gMFxuICAgICAgICBzY2FsZSA9IG9wdGlvbnMuc2NhbGUgPyAxXG4gICAgICAgIGVhc2luZyA9IG9wdGlvbnMuZWFzaW5nID8gJ2Vhc2Utb3V0J1xuICAgICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gPyAwXG4gICAgICAgIHJ1biA9ICsrQHJ1blxuICAgICAgICB0cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKCN7eH0sICN7eX0sIDBweCkgc2NhbGUzZCgje3NjYWxlfSwgI3tzY2FsZX0sIDEpXCJcblxuICAgICAgICBpZiBAZWwuc3R5bGUudHJhbnNmb3JtIGlzIHRyYW5zZm9ybVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICBlbHNlIGlmIGR1cmF0aW9uID4gMFxuICAgICAgICAgICAgdHJhbnNpdGlvbkVuZCA9ID0+XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlmIHJ1biBpc250IEBydW5cblxuICAgICAgICAgICAgICAgIEBlbC5yZW1vdmVFdmVudExpc3RlbmVyICd0cmFuc2l0aW9uZW5kJywgdHJhbnNpdGlvbkVuZFxuICAgICAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgQGVsLmFkZEV2ZW50TGlzdGVuZXIgJ3RyYW5zaXRpb25lbmQnLCB0cmFuc2l0aW9uRW5kLCBmYWxzZVxuXG4gICAgICAgICAgICBAZWwuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtICN7ZWFzaW5nfSAje2R1cmF0aW9ufW1zXCJcbiAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cblxuICAgICAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgICAgIEBcbiIsIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUGFnZVNwcmVhZFxuICAgIGNvbnN0cnVjdG9yOiAoQGVsLCBAb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAdmlzaWJpbGl0eSA9ICdnb25lJ1xuICAgICAgICBAcG9zaXRpb25lZCA9IGZhbHNlXG4gICAgICAgIEBhY3RpdmUgPSBmYWxzZVxuICAgICAgICBAaWQgPSBAb3B0aW9ucy5pZFxuICAgICAgICBAdHlwZSA9IEBvcHRpb25zLnR5cGVcbiAgICAgICAgQHBhZ2VJZHMgPSBAb3B0aW9ucy5wYWdlSWRzXG4gICAgICAgIEB3aWR0aCA9IEBvcHRpb25zLndpZHRoXG4gICAgICAgIEBsZWZ0ID0gQG9wdGlvbnMubGVmdFxuICAgICAgICBAbWF4Wm9vbVNjYWxlID0gQG9wdGlvbnMubWF4Wm9vbVNjYWxlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1pvb21hYmxlOiAtPlxuICAgICAgICBAZ2V0TWF4Wm9vbVNjYWxlKCkgPiAxIGFuZCBAZ2V0RWwoKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtem9vbWFibGUnKSBpc250ICdmYWxzZSdcblxuICAgIGdldEVsOiAtPlxuICAgICAgICBAZWxcblxuICAgIGdldE92ZXJsYXlFbHM6IC0+XG4gICAgICAgIEBnZXRFbCgpLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fb3ZlcmxheSdcblxuICAgIGdldFBhZ2VFbHM6IC0+XG4gICAgICAgIEBnZXRFbCgpLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fcGFnZSdcblxuICAgIGdldFJlY3Q6IC0+XG4gICAgICAgIEBnZXRFbCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBnZXRDb250ZW50UmVjdDogLT5cbiAgICAgICAgcmVjdCA9XG4gICAgICAgICAgICB0b3A6IG51bGxcbiAgICAgICAgICAgIGxlZnQ6IG51bGxcbiAgICAgICAgICAgIHJpZ2h0OiBudWxsXG4gICAgICAgICAgICBib3R0b206IG51bGxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsXG4gICAgICAgICAgICBoZWlnaHQ6IG51bGxcbiAgICAgICAgICAgIFxuICAgICAgICBmb3IgcGFnZUVsIGluIEBnZXRQYWdlRWxzKClcbiAgICAgICAgICAgIHBhZ2VSZWN0ID0gcGFnZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgICAgIHJlY3QudG9wID0gcGFnZVJlY3QudG9wIGlmIHBhZ2VSZWN0LnRvcCA8IHJlY3QudG9wIG9yIG5vdCByZWN0LnRvcD9cbiAgICAgICAgICAgIHJlY3QubGVmdCA9IHBhZ2VSZWN0LmxlZnQgaWYgcGFnZVJlY3QubGVmdCA8IHJlY3QubGVmdCBvciBub3QgcmVjdC5sZWZ0P1xuICAgICAgICAgICAgcmVjdC5yaWdodCA9IHBhZ2VSZWN0LnJpZ2h0IGlmIHBhZ2VSZWN0LnJpZ2h0ID4gcmVjdC5yaWdodCBvciBub3QgcmVjdC5yaWdodD9cbiAgICAgICAgICAgIHJlY3QuYm90dG9tID0gcGFnZVJlY3QuYm90dG9tIGlmIHBhZ2VSZWN0LmJvdHRvbSA+IHJlY3QuYm90dG9tIG9yIG5vdCByZWN0LmJvdHRvbT9cblxuICAgICAgICByZWN0LnRvcCA9IHJlY3QudG9wID8gMFxuICAgICAgICByZWN0LmxlZnQgPSByZWN0LmxlZnQgPyAwXG4gICAgICAgIHJlY3QucmlnaHQgPSByZWN0LnJpZ2h0ID8gMFxuICAgICAgICByZWN0LmJvdHRvbSA9IHJlY3QuYm90dG9tID8gMFxuICAgICAgICByZWN0LndpZHRoID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdFxuICAgICAgICByZWN0LmhlaWdodCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcblxuICAgICAgICByZWN0XG5cbiAgICBnZXRJZDogLT5cbiAgICAgICAgQGlkXG5cbiAgICBnZXRUeXBlOiAtPlxuICAgICAgICBAdHlwZVxuXG4gICAgZ2V0UGFnZUlkczogLT5cbiAgICAgICAgQHBhZ2VJZHNcblxuICAgIGdldFdpZHRoOiAtPlxuICAgICAgICBAd2lkdGhcblxuICAgIGdldExlZnQ6IC0+XG4gICAgICAgIEBsZWZ0XG5cbiAgICBnZXRNYXhab29tU2NhbGU6IC0+XG4gICAgICAgIEBtYXhab29tU2NhbGVcblxuICAgIGdldFZpc2liaWxpdHk6IC0+XG4gICAgICAgIEB2aXNpYmlsaXR5XG5cbiAgICBzZXRWaXNpYmlsaXR5OiAodmlzaWJpbGl0eSkgLT5cbiAgICAgICAgaWYgQHZpc2liaWxpdHkgaXNudCB2aXNpYmlsaXR5XG4gICAgICAgICAgICBAZ2V0RWwoKS5zdHlsZS5kaXNwbGF5ID0gaWYgdmlzaWJpbGl0eSBpcyAndmlzaWJsZScgdGhlbiAnYmxvY2snIGVsc2UgJ25vbmUnXG5cbiAgICAgICAgICAgIEB2aXNpYmlsaXR5ID0gdmlzaWJpbGl0eVxuXG4gICAgICAgIEBcblxuICAgIHBvc2l0aW9uOiAtPlxuICAgICAgICBpZiBAcG9zaXRpb25lZCBpcyBmYWxzZVxuICAgICAgICAgICAgQGdldEVsKCkuc3R5bGUubGVmdCA9IFwiI3tAZ2V0TGVmdCgpfSVcIlxuXG4gICAgICAgICAgICBAcG9zaXRpb25lZCA9IHRydWVcblxuICAgICAgICBAXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgQGFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGdldEVsKCkuc2V0QXR0cmlidXRlICdkYXRhLWFjdGl2ZScsIEBhY3RpdmVcblxuICAgICAgICByZXR1cm5cblxuICAgIGRlYWN0aXZhdGU6IC0+XG4gICAgICAgIEBhY3RpdmUgPSBmYWxzZVxuICAgICAgICBAZ2V0RWwoKS5zZXRBdHRyaWJ1dGUgJ2RhdGEtYWN0aXZlJywgQGFjdGl2ZVxuXG4gICAgICAgIHJldHVyblxuIiwiSGFtbWVyID0gcmVxdWlyZSAnaGFtbWVyanMnXG5NaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblBhZ2VTcHJlYWQgPSByZXF1aXJlICcuL3BhZ2Vfc3ByZWFkJ1xuQW5pbWF0aW9uID0gcmVxdWlyZSAnLi9hbmltYXRpb24nXG5cbmNsYXNzIFZlcnNvXG4gICAgY29uc3RydWN0b3I6IChAZWwsIEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBzd2lwZVZlbG9jaXR5ID0gQG9wdGlvbnMuc3dpcGVWZWxvY2l0eSA/IDAuM1xuICAgICAgICBAc3dpcGVUaHJlc2hvbGQgPSBAb3B0aW9ucy5zd2lwZVRocmVzaG9sZCA/IDEwXG4gICAgICAgIEBuYXZpZ2F0aW9uRHVyYXRpb24gPSBAb3B0aW9ucy5uYXZpZ2F0aW9uRHVyYXRpb24gPyAyNDBcbiAgICAgICAgQG5hdmlnYXRpb25QYW5EdXJhdGlvbiA9IEBvcHRpb25zLm5hdmlnYXRpb25QYW5EdXJhdGlvbiA/IDIwMFxuICAgICAgICBAem9vbUR1cmF0aW9uID0gQG9wdGlvbnMuem9vbUR1cmF0aW9uID8gMjAwXG5cbiAgICAgICAgQHBvc2l0aW9uID0gLTFcbiAgICAgICAgQHBpbmNoaW5nID0gZmFsc2VcbiAgICAgICAgQHBhbm5pbmcgPSBmYWxzZVxuICAgICAgICBAdHJhbnNmb3JtID0gbGVmdDogMCwgdG9wOiAwLCBzY2FsZTogMVxuICAgICAgICBAc3RhcnRUcmFuc2Zvcm0gPSBsZWZ0OiAwLCB0b3A6IDAsIHNjYWxlOiAxXG4gICAgICAgIEB0YXAgPVxuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgICAgIGRlbGF5OiAyNTBcbiAgICAgICAgICAgIHRpbWVvdXQ6IG51bGxcblxuICAgICAgICBAc2Nyb2xsZXJFbCA9IEBlbC5xdWVyeVNlbGVjdG9yICcudmVyc29fX3Njcm9sbGVyJ1xuICAgICAgICBAcGFnZVNwcmVhZEVscyA9IEBlbC5xdWVyeVNlbGVjdG9yQWxsICcudmVyc29fX3BhZ2Utc3ByZWFkJ1xuICAgICAgICBAcGFnZVNwcmVhZHMgPSBAdHJhdmVyc2VQYWdlU3ByZWFkcyBAcGFnZVNwcmVhZEVsc1xuICAgICAgICBAcGFnZUlkcyA9IEBidWlsZFBhZ2VJZHMgQHBhZ2VTcHJlYWRzXG4gICAgICAgIEBhbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uIEBzY3JvbGxlckVsXG4gICAgICAgIEBoYW1tZXIgPSBuZXcgSGFtbWVyLk1hbmFnZXIgQHNjcm9sbGVyRWwsXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxuICAgICAgICAgICAgdG91Y2hBY3Rpb246ICdwYW4teSdcbiAgICAgICAgICAgIGVuYWJsZTogZmFsc2VcbiAgICAgICAgICAgICMgUHJlZmVyIHRvdWNoIGlucHV0IGlmIHBvc3NpYmxlIHNpbmNlIEFuZHJvaWQgYWN0cyB3ZWlyZCB3aGVuIHVzaW5nIHBvaW50ZXIgZXZlbnRzLlxuICAgICAgICAgICAgaW5wdXRDbGFzczogaWYgJ29udG91Y2hzdGFydCcgb2Ygd2luZG93IHRoZW4gSGFtbWVyLlRvdWNoSW5wdXQgZWxzZSBudWxsXG5cbiAgICAgICAgQGhhbW1lci5hZGQgbmV3IEhhbW1lci5QYW4gZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0FMTFxuICAgICAgICBAaGFtbWVyLmFkZCBuZXcgSGFtbWVyLlRhcCBldmVudDogJ3NpbmdsZXRhcCcsIGludGVydmFsOiAwXG4gICAgICAgIEBoYW1tZXIuYWRkIG5ldyBIYW1tZXIuUGluY2goKVxuICAgICAgICBAaGFtbWVyLmFkZCBuZXcgSGFtbWVyLlByZXNzIHRpbWU6IDUwMFxuICAgICAgICBAaGFtbWVyLm9uICdwYW5zdGFydCcsIEBwYW5TdGFydC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncGFubW92ZScsIEBwYW5Nb3ZlLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwYW5lbmQnLCBAcGFuRW5kLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwYW5jYW5jZWwnLCBAcGFuRW5kLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdzaW5nbGV0YXAnLCBAc2luZ2xldGFwLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaHN0YXJ0JywgQHBpbmNoU3RhcnQuYmluZCBAXG4gICAgICAgIEBoYW1tZXIub24gJ3BpbmNobW92ZScsIEBwaW5jaE1vdmUuYmluZCBAXG4gICAgICAgIEBoYW1tZXIub24gJ3BpbmNoZW5kJywgQHBpbmNoRW5kLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaGNhbmNlbCcsIEBwaW5jaEVuZC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncHJlc3MnLCBAcHJlc3MuYmluZCBAXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgcGFnZUlkID0gQGdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQoQG9wdGlvbnMucGFnZUlkKSA/IDBcblxuICAgICAgICBAaGFtbWVyLnNldCBlbmFibGU6IHRydWVcbiAgICAgICAgQG5hdmlnYXRlVG8gcGFnZUlkLCBkdXJhdGlvbjogMFxuXG4gICAgICAgIEByZXNpemVMaXN0ZW5lciA9IEByZXNpemUuYmluZCBAXG4gICAgICAgIEB0b3VjaFN0YXJ0TGlzdGVuZXIgPSBAdG91Y2hTdGFydC5iaW5kIEBcblxuICAgICAgICBAZWwuYWRkRXZlbnRMaXN0ZW5lciAndG91Y2hzdGFydCcsIEB0b3VjaFN0YXJ0TGlzdGVuZXIsIGZhbHNlXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEByZXNpemVMaXN0ZW5lciwgZmFsc2VcblxuICAgICAgICBAXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAaGFtbWVyLmRlc3Ryb3koKVxuXG4gICAgICAgIEBlbC5yZW1vdmVFdmVudExpc3RlbmVyICd0b3VjaHN0YXJ0JywgQHRvdWNoU3RhcnRMaXN0ZW5lclxuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXJcblxuICAgICAgICBAXG5cbiAgICBmaXJzdDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBuYXZpZ2F0ZVRvIDAsIG9wdGlvbnNcblxuICAgIHByZXY6IChvcHRpb25zKSAtPlxuICAgICAgICBAbmF2aWdhdGVUbyBAZ2V0UG9zaXRpb24oKSAtIDEsIG9wdGlvbnNcblxuICAgIG5leHQ6IChvcHRpb25zKSAtPlxuICAgICAgICBAbmF2aWdhdGVUbyBAZ2V0UG9zaXRpb24oKSArIDEsIG9wdGlvbnNcblxuICAgIGxhc3Q6IChvcHRpb25zKSAtPlxuICAgICAgICBAbmF2aWdhdGVUbyBAZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxLCBvcHRpb25zXG5cbiAgICBuYXZpZ2F0ZVRvOiAocG9zaXRpb24sIG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIHBvc2l0aW9uIDwgMCBvciBwb3NpdGlvbiA+IEBnZXRQYWdlU3ByZWFkQ291bnQoKSAtIDFcblxuICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBAZ2V0UG9zaXRpb24oKVxuICAgICAgICBjdXJyZW50UGFnZVNwcmVhZCA9IEBnZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIGN1cnJlbnRQb3NpdGlvblxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgY2Fyb3VzZWwgPSBAZ2V0Q2Fyb3VzZWxGcm9tUGFnZVNwcmVhZCBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgIHZlbG9jaXR5ID0gb3B0aW9ucy52ZWxvY2l0eSA/IDFcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uID8gQG5hdmlnYXRpb25EdXJhdGlvblxuICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uIC8gTWF0aC5hYnModmVsb2NpdHkpXG5cbiAgICAgICAgY3VycmVudFBhZ2VTcHJlYWQuZGVhY3RpdmF0ZSgpIGlmIGN1cnJlbnRQYWdlU3ByZWFkP1xuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkLmFjdGl2YXRlKClcblxuICAgICAgICBjYXJvdXNlbC52aXNpYmxlLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+IHBhZ2VTcHJlYWQucG9zaXRpb24oKS5zZXRWaXNpYmlsaXR5ICd2aXNpYmxlJ1xuXG4gICAgICAgIEB0cmFuc2Zvcm0ubGVmdCA9IEBnZXRMZWZ0VHJhbnNmb3JtRnJvbVBhZ2VTcHJlYWQgcG9zaXRpb24sIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgQHNldFBvc2l0aW9uIHBvc2l0aW9uXG5cbiAgICAgICAgaWYgQHRyYW5zZm9ybS5zY2FsZSA+IDFcbiAgICAgICAgICAgIEB0cmFuc2Zvcm0udG9wID0gMFxuICAgICAgICAgICAgQHRyYW5zZm9ybS5zY2FsZSA9IDFcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb25cblxuICAgICAgICBAdHJpZ2dlciAnYmVmb3JlTmF2aWdhdGlvbicsXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb246IGN1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgbmV3UG9zaXRpb246IHBvc2l0aW9uXG5cbiAgICAgICAgQGFuaW1hdGlvbi5hbmltYXRlXG4gICAgICAgICAgICB4OiBcIiN7QHRyYW5zZm9ybS5sZWZ0fSVcIlxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICwgPT5cbiAgICAgICAgICAgIGNhcm91c2VsID0gQGdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQgQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuXG4gICAgICAgICAgICBjYXJvdXNlbC5nb25lLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+IHBhZ2VTcHJlYWQuc2V0VmlzaWJpbGl0eSAnZ29uZSdcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsXG4gICAgICAgICAgICAgICAgbmV3UG9zaXRpb246IEBnZXRQb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbjogY3VycmVudFBvc2l0aW9uXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0UG9zaXRpb246IC0+XG4gICAgICAgIEBwb3NpdGlvblxuXG4gICAgc2V0UG9zaXRpb246IChwb3NpdGlvbikgLT5cbiAgICAgICAgQHBvc2l0aW9uID0gcG9zaXRpb25cblxuICAgICAgICBAXG5cbiAgICBnZXRMZWZ0VHJhbnNmb3JtRnJvbVBhZ2VTcHJlYWQ6IChwb3NpdGlvbiwgcGFnZVNwcmVhZCkgLT5cbiAgICAgICAgbGVmdCA9IDBcblxuICAgICAgICBpZiBwb3NpdGlvbiBpcyBAZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxXG4gICAgICAgICAgICBsZWZ0ID0gKDEwMCAtIHBhZ2VTcHJlYWQuZ2V0V2lkdGgoKSkgLSBwYWdlU3ByZWFkLmdldExlZnQoKVxuICAgICAgICBlbHNlIGlmIHBvc2l0aW9uID4gMFxuICAgICAgICAgICAgbGVmdCA9ICgxMDAgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkpIC8gMiAtIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpXG5cbiAgICAgICAgbGVmdFxuXG4gICAgZ2V0Q2Fyb3VzZWxGcm9tUGFnZVNwcmVhZDogKHBhZ2VTcHJlYWRTdWJqZWN0KSAtPlxuICAgICAgICBjYXJvdXNlbCA9XG4gICAgICAgICAgICB2aXNpYmxlOiBbXVxuICAgICAgICAgICAgZ29uZTogW11cblxuICAgICAgICAjIElkZW50aWZ5IHRoZSBwYWdlIHNwcmVhZHMgdGhhdCBzaG91bGQgYmUgYSBwYXJ0IG9mIHRoZSBjYXJvdXNlbC5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2VcblxuICAgICAgICAgICAgaWYgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgPD0gcGFnZVNwcmVhZFN1YmplY3QuZ2V0TGVmdCgpXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWUgaWYgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgKyBwYWdlU3ByZWFkLmdldFdpZHRoKCkgPiBwYWdlU3ByZWFkU3ViamVjdC5nZXRMZWZ0KCkgLSAxMDBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZSBpZiBwYWdlU3ByZWFkLmdldExlZnQoKSAtIHBhZ2VTcHJlYWQuZ2V0V2lkdGgoKSA8IHBhZ2VTcHJlYWRTdWJqZWN0LmdldExlZnQoKSArIDEwMFxuXG4gICAgICAgICAgICBpZiB2aXNpYmxlIGlzIHRydWVcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC52aXNpYmxlLnB1c2ggcGFnZVNwcmVhZFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhcm91c2VsLmdvbmUucHVzaCBwYWdlU3ByZWFkXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIGNhcm91c2VsXG5cbiAgICB0cmF2ZXJzZVBhZ2VTcHJlYWRzOiAoZWxzKSAtPlxuICAgICAgICBwYWdlU3ByZWFkcyA9IFtdXG4gICAgICAgIGxlZnQgPSAwXG5cbiAgICAgICAgZm9yIGVsIGluIGVsc1xuICAgICAgICAgICAgaWQgPSBlbC5nZXRBdHRyaWJ1dGUgJ2RhdGEtaWQnXG4gICAgICAgICAgICB0eXBlID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLXR5cGUnXG4gICAgICAgICAgICBwYWdlSWRzID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLXBhZ2UtaWRzJ1xuICAgICAgICAgICAgcGFnZUlkcyA9IGlmIHBhZ2VJZHM/IHRoZW4gcGFnZUlkcy5zcGxpdCgnLCcpLm1hcCAoaSkgLT4gaSBlbHNlIFtdXG4gICAgICAgICAgICBtYXhab29tU2NhbGUgPSBlbC5nZXRBdHRyaWJ1dGUgJ2RhdGEtbWF4LXpvb20tc2NhbGUnXG4gICAgICAgICAgICBtYXhab29tU2NhbGUgPSBpZiBtYXhab29tU2NhbGU/IHRoZW4gK21heFpvb21TY2FsZSBlbHNlIDFcbiAgICAgICAgICAgIHdpZHRoID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLXdpZHRoJ1xuICAgICAgICAgICAgd2lkdGggPSBpZiB3aWR0aD8gdGhlbiArd2lkdGggZWxzZSAxMDBcbiAgICAgICAgICAgIHBhZ2VTcHJlYWQgPSBuZXcgUGFnZVNwcmVhZCBlbCxcbiAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICAgICAgcGFnZUlkczogcGFnZUlkc1xuICAgICAgICAgICAgICAgIG1heFpvb21TY2FsZTogbWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdFxuXG4gICAgICAgICAgICBsZWZ0ICs9IHdpZHRoXG5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWRzLnB1c2ggcGFnZVNwcmVhZFxuXG4gICAgICAgIHBhZ2VTcHJlYWRzXG5cbiAgICBidWlsZFBhZ2VJZHM6IChwYWdlU3ByZWFkcykgLT5cbiAgICAgICAgcGFnZUlkcyA9IHt9XG5cbiAgICAgICAgcGFnZVNwcmVhZHMuZm9yRWFjaCAocGFnZVNwcmVhZCwgaSkgLT5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWQub3B0aW9ucy5wYWdlSWRzLmZvckVhY2ggKHBhZ2VJZCkgLT5cbiAgICAgICAgICAgICAgICBwYWdlSWRzW3BhZ2VJZF0gPSBwYWdlU3ByZWFkXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcGFnZUlkc1xuXG4gICAgaXNDb29yZGluYXRlSW5zaWRlRWxlbWVudDogKHgsIHksIGVsKSAtPlxuICAgICAgICByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICB4ID49IHJlY3QubGVmdCBhbmQgeCA8PSByZWN0LnJpZ2h0IGFuZCB5ID49IHJlY3QudG9wIGFuZCB5IDw9IHJlY3QuYm90dG9tXG5cbiAgICBnZXRDb29yZGluYXRlSW5mbzogKHgsIHksIHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGluZm8gPVxuICAgICAgICAgICAgeDogeFxuICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgY29udGVudFg6IDBcbiAgICAgICAgICAgIGNvbnRlbnRZOiAwXG4gICAgICAgICAgICBwYWdlWDogMFxuICAgICAgICAgICAgcGFnZVk6IDBcbiAgICAgICAgICAgIG92ZXJsYXlFbHM6IFtdXG4gICAgICAgICAgICBwYWdlRWw6IG51bGxcbiAgICAgICAgICAgIGlzSW5zaWRlQ29udGVudFg6IGZhbHNlXG4gICAgICAgICAgICBpc0luc2lkZUNvbnRlbnRZOiBmYWxzZVxuICAgICAgICAgICAgaXNJbnNpZGVDb250ZW50OiBmYWxzZVxuICAgICAgICBjb250ZW50UmVjdCA9IHBhZ2VTcHJlYWQuZ2V0Q29udGVudFJlY3QoKVxuICAgICAgICBvdmVybGF5RWxzID0gcGFnZVNwcmVhZC5nZXRPdmVybGF5RWxzKClcbiAgICAgICAgcGFnZUVscyA9IHBhZ2VTcHJlYWQuZ2V0UGFnZUVscygpXG5cbiAgICAgICAgZm9yIG92ZXJsYXlFbCBpbiBvdmVybGF5RWxzXG4gICAgICAgICAgICBpbmZvLm92ZXJsYXlFbHMucHVzaCBvdmVybGF5RWwgaWYgQGlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQoeCwgeSwgb3ZlcmxheUVsKVxuXG4gICAgICAgIGZvciBwYWdlRWwgaW4gcGFnZUVsc1xuICAgICAgICAgICAgaWYgQGlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQoeCwgeSwgcGFnZUVsKVxuICAgICAgICAgICAgICAgIGluZm8ucGFnZUVsID0gcGFnZUVsXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICBpbmZvLmNvbnRlbnRYID0gKHggLSBjb250ZW50UmVjdC5sZWZ0KSAvIGNvbnRlbnRSZWN0LndpZHRoXG4gICAgICAgIGluZm8uY29udGVudFkgPSAoeSAtIGNvbnRlbnRSZWN0LnRvcCkgLyBjb250ZW50UmVjdC5oZWlnaHRcblxuICAgICAgICBpZiBpbmZvLnBhZ2VFbD9cbiAgICAgICAgICAgIGluZm8uaXNJbnNpZGVDb250ZW50WCA9IGluZm8uY29udGVudFggPj0gMCBhbmQgaW5mby5jb250ZW50WCA8PSAxXG4gICAgICAgICAgICBpbmZvLmlzSW5zaWRlQ29udGVudFkgPSBpbmZvLmNvbnRlbnRZID49IDAgYW5kIGluZm8uY29udGVudFkgPD0gMVxuICAgICAgICAgICAgaW5mby5pc0luc2lkZUNvbnRlbnQgPSBpbmZvLmlzSW5zaWRlQ29udGVudFggYW5kIGluZm8uaXNJbnNpZGVDb250ZW50WVxuXG4gICAgICAgIGluZm9cblxuICAgIGdldFBhZ2VTcHJlYWRDb3VudDogLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLmxlbmd0aFxuXG4gICAgZ2V0QWN0aXZlUGFnZVNwcmVhZDogLT5cbiAgICAgICAgQGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gQGdldFBvc2l0aW9uKClcblxuICAgIGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb246IChwb3NpdGlvbikgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzW3Bvc2l0aW9uXVxuXG4gICAgZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZDogKHBhZ2VJZCkgLT5cbiAgICAgICAgZm9yIHBhZ2VTcHJlYWQsIGlkeCBpbiBAcGFnZVNwcmVhZHNcbiAgICAgICAgICAgIHJldHVybiBpZHggaWYgcGFnZVNwcmVhZC5vcHRpb25zLnBhZ2VJZHMuaW5kZXhPZihwYWdlSWQpID4gLTFcblxuICAgIGdldFBhZ2VTcHJlYWRCb3VuZHM6IChwYWdlU3ByZWFkKSAtPlxuICAgICAgICBwYWdlU3ByZWFkUmVjdCA9IHBhZ2VTcHJlYWQuZ2V0UmVjdCgpXG4gICAgICAgIHBhZ2VTcHJlYWRDb250ZW50UmVjdCA9IHBhZ2VTcHJlYWQuZ2V0Q29udGVudFJlY3QoKVxuXG4gICAgICAgIGxlZnQ6IChwYWdlU3ByZWFkQ29udGVudFJlY3QubGVmdCAtIHBhZ2VTcHJlYWRSZWN0LmxlZnQpIC8gcGFnZVNwcmVhZFJlY3Qud2lkdGggKiAxMDBcbiAgICAgICAgdG9wOiAocGFnZVNwcmVhZENvbnRlbnRSZWN0LnRvcCAtIHBhZ2VTcHJlYWRSZWN0LnRvcCkgLyBwYWdlU3ByZWFkUmVjdC5oZWlnaHQgKiAxMDBcbiAgICAgICAgd2lkdGg6IHBhZ2VTcHJlYWRDb250ZW50UmVjdC53aWR0aCAvIHBhZ2VTcHJlYWRSZWN0LndpZHRoICogMTAwXG4gICAgICAgIGhlaWdodDogcGFnZVNwcmVhZENvbnRlbnRSZWN0LmhlaWdodCAvIHBhZ2VTcHJlYWRSZWN0LmhlaWdodCAqIDEwMFxuICAgICAgICBwYWdlU3ByZWFkUmVjdDogcGFnZVNwcmVhZFJlY3RcbiAgICAgICAgcGFnZVNwcmVhZENvbnRlbnRSZWN0OiBwYWdlU3ByZWFkQ29udGVudFJlY3RcblxuICAgIGNsaXBDb29yZGluYXRlOiAoY29vcmRpbmF0ZSwgc2NhbGUsIHNpemUsIG9mZnNldCkgLT5cbiAgICAgICAgaWYgc2l6ZSAqIHNjYWxlIDwgMTAwXG4gICAgICAgICAgICBjb29yZGluYXRlID0gb2Zmc2V0ICogLXNjYWxlICsgNTAgLSAoc2l6ZSAqIHNjYWxlIC8gMilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IE1hdGgubWluIGNvb3JkaW5hdGUsIG9mZnNldCAqIC1zY2FsZVxuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IE1hdGgubWF4IGNvb3JkaW5hdGUsIG9mZnNldCAqIC1zY2FsZSAtIHNpemUgKiBzY2FsZSArIDEwMFxuXG4gICAgICAgIGNvb3JkaW5hdGVcblxuICAgIHpvb21UbzogKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2spIC0+XG4gICAgICAgIHNjYWxlID0gb3B0aW9ucy5zY2FsZVxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICBwYWdlU3ByZWFkQm91bmRzID0gQGdldFBhZ2VTcHJlYWRCb3VuZHMgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICBjYXJvdXNlbE9mZnNldCA9IGFjdGl2ZVBhZ2VTcHJlYWQuZ2V0TGVmdCgpXG4gICAgICAgIGNhcm91c2VsU2NhbGVkT2Zmc2V0ID0gY2Fyb3VzZWxPZmZzZXQgKiBAdHJhbnNmb3JtLnNjYWxlXG4gICAgICAgIHggPSBvcHRpb25zLnggPyAwXG4gICAgICAgIHkgPSBvcHRpb25zLnkgPyAwXG5cbiAgICAgICAgaWYgc2NhbGUgaXNudCAxXG4gICAgICAgICAgICB4IC09IHBhZ2VTcHJlYWRCb3VuZHMucGFnZVNwcmVhZFJlY3QubGVmdFxuICAgICAgICAgICAgeSAtPSBwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LnRvcFxuICAgICAgICAgICAgeCA9IHggLyAocGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC53aWR0aCAvIEB0cmFuc2Zvcm0uc2NhbGUpICogMTAwXG4gICAgICAgICAgICB5ID0geSAvIChwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LmhlaWdodCAvIEB0cmFuc2Zvcm0uc2NhbGUpICogMTAwXG4gICAgICAgICAgICB4ID0gQHRyYW5zZm9ybS5sZWZ0ICsgY2Fyb3VzZWxTY2FsZWRPZmZzZXQgKyB4IC0gKHggKiBzY2FsZSAvIEB0cmFuc2Zvcm0uc2NhbGUpXG4gICAgICAgICAgICB5ID0gQHRyYW5zZm9ybS50b3AgKyB5IC0gKHkgKiBzY2FsZSAvIEB0cmFuc2Zvcm0uc2NhbGUpXG5cbiAgICAgICAgICAgICMgTWFrZSBzdXJlIHRoZSBhbmltYXRpb24gZG9lc24ndCBleGNlZWQgdGhlIGNvbnRlbnQgYm91bmRzLlxuICAgICAgICAgICAgaWYgb3B0aW9ucy5ib3VuZHMgaXNudCBmYWxzZSBhbmQgc2NhbGUgPiAxXG4gICAgICAgICAgICAgICAgeCA9IEBjbGlwQ29vcmRpbmF0ZSB4LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy53aWR0aCwgcGFnZVNwcmVhZEJvdW5kcy5sZWZ0XG4gICAgICAgICAgICAgICAgeSA9IEBjbGlwQ29vcmRpbmF0ZSB5LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy5oZWlnaHQsIHBhZ2VTcHJlYWRCb3VuZHMudG9wXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHggPSAwXG4gICAgICAgICAgICB5ID0gMFxuXG4gICAgICAgICMgQWNjb3VudCBmb3IgdGhlIHBhZ2Ugc3ByZWFkcyBsZWZ0IG9mIHRoZSBhY3RpdmUgb25lLlxuICAgICAgICB4IC09IGNhcm91c2VsT2Zmc2V0ICogc2NhbGVcblxuICAgICAgICBAdHJhbnNmb3JtLmxlZnQgPSB4XG4gICAgICAgIEB0cmFuc2Zvcm0udG9wID0geVxuICAgICAgICBAdHJhbnNmb3JtLnNjYWxlID0gc2NhbGVcblxuICAgICAgICBAYW5pbWF0aW9uLmFuaW1hdGVcbiAgICAgICAgICAgIHg6IFwiI3t4fSVcIlxuICAgICAgICAgICAgeTogXCIje3l9JVwiXG4gICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgIGVhc2luZzogb3B0aW9ucy5lYXNpbmdcbiAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgICwgY2FsbGJhY2tcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlZnJlc2g6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRWxzID0gQGVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fcGFnZS1zcHJlYWQnXG4gICAgICAgIEBwYWdlU3ByZWFkcyA9IEB0cmF2ZXJzZVBhZ2VTcHJlYWRzIEBwYWdlU3ByZWFkRWxzXG4gICAgICAgIEBwYWdlSWRzID0gQGJ1aWxkUGFnZUlkcyBAcGFnZVNwcmVhZHNcblxuICAgICAgICBAXG5cbiAgICBwYW5TdGFydDogKGUpIC0+XG4gICAgICAgICMgT25seSBhbGxvdyBwYW5uaW5nIGlmIHpvb21lZCBpbiBvciBkb2luZyBhIGhvcml6b250YWwgcGFuIHRvIGVuc3VyZSB2ZXJ0aWNhbCBzY3JvbGxpbmcgd29ya3MgZm9yIHNjcm9sbGFibGUgcGFnZSBzcHJlYWRzLlxuICAgICAgICBpZiBAdHJhbnNmb3JtLnNjYWxlID4gMSBvciAoZS5kaXJlY3Rpb24gaXMgSGFtbWVyLkRJUkVDVElPTl9MRUZUIG9yIGUuZGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fUklHSFQpXG4gICAgICAgICAgICB4ID0gZS5jZW50ZXIueFxuICAgICAgICAgICAgZWRnZVRocmVzaG9sZCA9IDMwXG4gICAgICAgICAgICB3aWR0aCA9IEBzY3JvbGxlckVsLm9mZnNldFdpZHRoXG5cbiAgICAgICAgICAgICMgUHJldmVudCBwYW5uaW5nIHdoZW4gZWRnZS1zd2lwaW5nIG9uIGlPUy5cbiAgICAgICAgICAgIGlmIHggPiBlZGdlVGhyZXNob2xkIGFuZCB4IDwgd2lkdGggLSBlZGdlVGhyZXNob2xkXG4gICAgICAgICAgICAgICAgQHN0YXJ0VHJhbnNmb3JtLmxlZnQgPSBAdHJhbnNmb3JtLmxlZnRcbiAgICAgICAgICAgICAgICBAc3RhcnRUcmFuc2Zvcm0udG9wID0gQHRyYW5zZm9ybS50b3BcblxuICAgICAgICAgICAgICAgIEBwYW5uaW5nID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgQHRyaWdnZXIgJ3BhblN0YXJ0J1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuTW92ZTogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGluY2hpbmcgaXMgdHJ1ZSBvciBAcGFubmluZyBpcyBmYWxzZVxuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgPiAxXG4gICAgICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICAgICAgY2Fyb3VzZWxPZmZzZXQgPSBhY3RpdmVQYWdlU3ByZWFkLmdldExlZnQoKVxuICAgICAgICAgICAgY2Fyb3VzZWxTY2FsZWRPZmZzZXQgPSBjYXJvdXNlbE9mZnNldCAqIEB0cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMgPSBAZ2V0UGFnZVNwcmVhZEJvdW5kcyBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgICAgICBzY2FsZSA9IEB0cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgICAgIHggPSBAc3RhcnRUcmFuc2Zvcm0ubGVmdCArIGNhcm91c2VsU2NhbGVkT2Zmc2V0ICsgZS5kZWx0YVggLyBAc2Nyb2xsZXJFbC5vZmZzZXRXaWR0aCAqIDEwMFxuICAgICAgICAgICAgeSA9IEBzdGFydFRyYW5zZm9ybS50b3AgKyBlLmRlbHRhWSAvIEBzY3JvbGxlckVsLm9mZnNldEhlaWdodCAqIDEwMFxuICAgICAgICAgICAgeCA9IEBjbGlwQ29vcmRpbmF0ZSB4LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy53aWR0aCwgcGFnZVNwcmVhZEJvdW5kcy5sZWZ0XG4gICAgICAgICAgICB5ID0gQGNsaXBDb29yZGluYXRlIHksIHNjYWxlLCBwYWdlU3ByZWFkQm91bmRzLmhlaWdodCwgcGFnZVNwcmVhZEJvdW5kcy50b3BcbiAgICAgICAgICAgIHggLT0gY2Fyb3VzZWxTY2FsZWRPZmZzZXRcblxuICAgICAgICAgICAgQHRyYW5zZm9ybS5sZWZ0ID0geFxuICAgICAgICAgICAgQHRyYW5zZm9ybS50b3AgPSB5XG5cbiAgICAgICAgICAgIEBhbmltYXRpb24uYW5pbWF0ZVxuICAgICAgICAgICAgICAgIHg6IFwiI3t4fSVcIlxuICAgICAgICAgICAgICAgIHk6IFwiI3t5fSVcIlxuICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZVxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcidcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgeCA9IEB0cmFuc2Zvcm0ubGVmdCArIGUuZGVsdGFYIC8gQHNjcm9sbGVyRWwub2Zmc2V0V2lkdGggKiAxMDBcblxuICAgICAgICAgICAgQGFuaW1hdGlvbi5hbmltYXRlXG4gICAgICAgICAgICAgICAgeDogXCIje3h9JVwiXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuRW5kOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIEBwYW5uaW5nIGlzIGZhbHNlXG5cbiAgICAgICAgQHBhbm5pbmcgPSBmYWxzZVxuICAgICAgICBAdHJpZ2dlciAncGFuRW5kJ1xuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgaXMgMSBhbmQgQHBpbmNoaW5nIGlzIGZhbHNlXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGUub3ZlcmFsbFZlbG9jaXR5WFxuXG4gICAgICAgICAgICBpZiBNYXRoLmFicyh2ZWxvY2l0eSkgPj0gQHN3aXBlVmVsb2NpdHlcbiAgICAgICAgICAgICAgICBpZiBNYXRoLmFicyhlLmRlbHRhWCkgPj0gQHN3aXBlVGhyZXNob2xkXG4gICAgICAgICAgICAgICAgICAgIGlmIGUub2Zmc2V0RGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fTEVGVFxuICAgICAgICAgICAgICAgICAgICAgICAgQG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogQG5hdmlnYXRpb25QYW5EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIGUub2Zmc2V0RGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fUklHSFRcbiAgICAgICAgICAgICAgICAgICAgICAgIEBwcmV2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEBuYXZpZ2F0aW9uUGFuRHVyYXRpb25cblxuICAgICAgICAgICAgaWYgcG9zaXRpb24gaXMgQGdldFBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICBAYW5pbWF0aW9uLmFuaW1hdGVcbiAgICAgICAgICAgICAgICAgICAgeDogXCIje0B0cmFuc2Zvcm0ubGVmdH0lXCJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEBuYXZpZ2F0aW9uUGFuRHVyYXRpb25cblxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgcG9zaXRpb246IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaW5jaFN0YXJ0OiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAZ2V0QWN0aXZlUGFnZVNwcmVhZCgpLmlzWm9vbWFibGUoKVxuXG4gICAgICAgIEBwaW5jaGluZyA9IHRydWVcbiAgICAgICAgQGVsLnNldEF0dHJpYnV0ZSAnZGF0YS1waW5jaGluZycsIHRydWVcbiAgICAgICAgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlID0gQHRyYW5zZm9ybS5zY2FsZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGluY2hNb3ZlOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIEBwaW5jaGluZyBpcyBmYWxzZVxuXG4gICAgICAgIEB6b29tVG9cbiAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgIHk6IGUuY2VudGVyLnlcbiAgICAgICAgICAgIHNjYWxlOiBAc3RhcnRUcmFuc2Zvcm0uc2NhbGUgKiBlLnNjYWxlXG4gICAgICAgICAgICBib3VuZHM6IGZhbHNlXG4gICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaW5jaEVuZDogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGluY2hpbmcgaXMgZmFsc2VcblxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICBtYXhab29tU2NhbGUgPSBhY3RpdmVQYWdlU3ByZWFkLmdldE1heFpvb21TY2FsZSgpXG4gICAgICAgIHNjYWxlID0gTWF0aC5tYXggMSwgTWF0aC5taW4oQHRyYW5zZm9ybS5zY2FsZSwgbWF4Wm9vbVNjYWxlKVxuICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgaWYgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlIGlzIDEgYW5kIHNjYWxlID4gMVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZEluJywgcG9zaXRpb246IHBvc2l0aW9uXG4gICAgICAgIGVsc2UgaWYgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlID4gMSBhbmQgc2NhbGUgaXMgMVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHBvc2l0aW9uOiBwb3NpdGlvblxuXG4gICAgICAgIEB6b29tVG9cbiAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgIHk6IGUuY2VudGVyLnlcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZVxuICAgICAgICAgICAgZHVyYXRpb246IEB6b29tRHVyYXRpb25cbiAgICAgICAgLCA9PlxuICAgICAgICAgICAgQHBpbmNoaW5nID0gZmFsc2VcbiAgICAgICAgICAgIEBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtcGluY2hpbmcnLCBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3ByZXNzZWQnLCBAZ2V0Q29vcmRpbmF0ZUluZm8oZS5jZW50ZXIueCwgZS5jZW50ZXIueSwgQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKSlcblxuICAgICAgICByZXR1cm5cblxuICAgIHNpbmdsZXRhcDogKGUpIC0+XG4gICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWQgPSBAZ2V0QWN0aXZlUGFnZVNwcmVhZCgpXG4gICAgICAgIGNvb3JkaW5hdGVJbmZvID0gQGdldENvb3JkaW5hdGVJbmZvIGUuY2VudGVyLngsIGUuY2VudGVyLnksIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgaXNEb3VibGVUYXAgPSBAdGFwLmNvdW50IGlzIDFcblxuICAgICAgICBjbGVhclRpbWVvdXQgQHRhcC50aW1lb3V0XG5cbiAgICAgICAgaWYgaXNEb3VibGVUYXBcbiAgICAgICAgICAgIEB0YXAuY291bnQgPSAwXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdkb3VibGVDbGlja2VkJywgY29vcmRpbmF0ZUluZm9cblxuICAgICAgICAgICAgaWYgYWN0aXZlUGFnZVNwcmVhZC5pc1pvb21hYmxlKClcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGUgPSBhY3RpdmVQYWdlU3ByZWFkLmdldE1heFpvb21TY2FsZSgpXG4gICAgICAgICAgICAgICAgem9vbWVkSW4gPSBAdHJhbnNmb3JtLnNjYWxlID4gMVxuICAgICAgICAgICAgICAgIHNjYWxlID0gaWYgem9vbWVkSW4gdGhlbiAxIGVsc2UgbWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICAgICAgem9vbUV2ZW50ID0gaWYgem9vbWVkSW4gdGhlbiAnem9vbWVkT3V0JyBlbHNlICd6b29tZWRJbidcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgICAgICAgICBAem9vbVRvXG4gICAgICAgICAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgICAgICAgICAgeTogZS5jZW50ZXIueVxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEB6b29tRHVyYXRpb25cbiAgICAgICAgICAgICAgICAsID0+XG4gICAgICAgICAgICAgICAgICAgIEB0cmlnZ2VyIHpvb21FdmVudCwgcG9zaXRpb246IHBvc2l0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXAuY291bnQrK1xuICAgICAgICAgICAgQHRhcC50aW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICAgIEB0YXAuY291bnQgPSAwXG5cbiAgICAgICAgICAgICAgICBAdHJpZ2dlciAnY2xpY2tlZCcsIGNvb3JkaW5hdGVJbmZvXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICwgQHRhcC5kZWxheVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgdG91Y2hTdGFydDogKGUpIC0+XG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBAZ2V0UG9zaXRpb24oKVxuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKSBpZiBwYWdlU3ByZWFkLmVsLmNsYXNzTGlzdC5jb250YWlucygndmVyc28tLXNjcm9sbGFibGUnKSBpcyBmYWxzZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplOiAtPlxuICAgICAgICBpZiBAdHJhbnNmb3JtLnNjYWxlID4gMVxuICAgICAgICAgICAgcG9zaXRpb24gPSBAZ2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgYWN0aXZlUGFnZVNwcmVhZCA9IEBnZXRBY3RpdmVQYWdlU3ByZWFkKClcblxuICAgICAgICAgICAgQHRyYW5zZm9ybS5sZWZ0ID0gQGdldExlZnRUcmFuc2Zvcm1Gcm9tUGFnZVNwcmVhZCBwb3NpdGlvbiwgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICAgICAgQHRyYW5zZm9ybS50b3AgPSAwXG4gICAgICAgICAgICBAdHJhbnNmb3JtLnNjYWxlID0gMVxuXG4gICAgICAgICAgICBAem9vbVRvXG4gICAgICAgICAgICAgICAgeDogQHRyYW5zZm9ybS5sZWZ0XG4gICAgICAgICAgICAgICAgeTogQHRyYW5zZm9ybS50b3BcbiAgICAgICAgICAgICAgICBzY2FsZTogQHRyYW5zZm9ybS5zY2FsZVxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRPdXQnLCBwb3NpdGlvbjogcG9zaXRpb25cblxuICAgICAgICByZXR1cm5cblxuTWljcm9FdmVudC5taXhpbiBWZXJzb1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZlcnNvXG4iLCIvKiEgSGFtbWVyLkpTIC0gdjIuMC43IC0gMjAxNi0wNC0yMlxuICogaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSm9yaWsgVGFuZ2VsZGVyO1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgZXhwb3J0TmFtZSwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxudmFyIFZFTkRPUl9QUkVGSVhFUyA9IFsnJywgJ3dlYmtpdCcsICdNb3onLCAnTVMnLCAnbXMnLCAnbyddO1xudmFyIFRFU1RfRUxFTUVOVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG52YXIgVFlQRV9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG5cbnZhciByb3VuZCA9IE1hdGgucm91bmQ7XG52YXIgYWJzID0gTWF0aC5hYnM7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogc2V0IGEgdGltZW91dCB3aXRoIGEgZ2l2ZW4gc2NvcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZW91dFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHNldFRpbWVvdXRDb250ZXh0KGZuLCB0aW1lb3V0LCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoYmluZEZuKGZuLCBjb250ZXh0KSwgdGltZW91dCk7XG59XG5cbi8qKlxuICogaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCB3ZSB3YW50IHRvIGV4ZWN1dGUgdGhlIGZuIG9uIGVhY2ggZW50cnlcbiAqIGlmIGl0IGFpbnQgYW4gYXJyYXkgd2UgZG9uJ3Qgd2FudCB0byBkbyBhIHRoaW5nLlxuICogdGhpcyBpcyB1c2VkIGJ5IGFsbCB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIHNpbmdsZSBhbmQgYXJyYXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp8QXJyYXl9IGFyZ1xuICogQHBhcmFtIHtTdHJpbmd9IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHRdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW52b2tlQXJyYXlBcmcoYXJnLCBmbiwgY29udGV4dCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgZWFjaChhcmcsIGNvbnRleHRbZm5dLCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiB3YWxrIG9iamVjdHMgYW5kIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKCFvYmopIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvYmouZm9yRWFjaCkge1xuICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgb2JqLmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoaSkgJiYgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogd3JhcCBhIG1ldGhvZCB3aXRoIGEgZGVwcmVjYXRpb24gd2FybmluZyBhbmQgc3RhY2sgdHJhY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIHRoZSBzdXBwbGllZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGRlcHJlY2F0ZShtZXRob2QsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICB2YXIgZGVwcmVjYXRpb25NZXNzYWdlID0gJ0RFUFJFQ0FURUQgTUVUSE9EOiAnICsgbmFtZSArICdcXG4nICsgbWVzc2FnZSArICcgQVQgXFxuJztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEVycm9yKCdnZXQtc3RhY2stdHJhY2UnKTtcbiAgICAgICAgdmFyIHN0YWNrID0gZSAmJiBlLnN0YWNrID8gZS5zdGFjay5yZXBsYWNlKC9eW15cXChdKz9bXFxuJF0vZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMrYXRcXHMrL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eT2JqZWN0Ljxhbm9ueW1vdXM+XFxzKlxcKC9nbSwgJ3thbm9ueW1vdXN9KClAJykgOiAnVW5rbm93biBTdGFjayBUcmFjZSc7XG5cbiAgICAgICAgdmFyIGxvZyA9IHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS53YXJuIHx8IHdpbmRvdy5jb25zb2xlLmxvZyk7XG4gICAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgICAgIGxvZy5jYWxsKHdpbmRvdy5jb25zb2xlLCBkZXByZWNhdGlvbk1lc3NhZ2UsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gey4uLk9iamVjdH0gb2JqZWN0c190b19hc3NpZ25cbiAqIEByZXR1cm5zIHtPYmplY3R9IHRhcmdldFxuICovXG52YXIgYXNzaWduO1xuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG59IGVsc2Uge1xuICAgIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW21lcmdlPWZhbHNlXVxuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgZXh0ZW5kID0gZGVwcmVjYXRlKGZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzcmMsIG1lcmdlKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzcmMpO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICghbWVyZ2UgfHwgKG1lcmdlICYmIGRlc3Rba2V5c1tpXV0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGRlc3Rba2V5c1tpXV0gPSBzcmNba2V5c1tpXV07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbn0sICdleHRlbmQnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIG1lcmdlIHRoZSB2YWx1ZXMgZnJvbSBzcmMgaW4gdGhlIGRlc3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgdGhhdCBleGlzdCBpbiBkZXN0IHdpbGwgbm90IGJlIG92ZXJ3cml0dGVuIGJ5IHNyY1xuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIG1lcmdlID0gZGVwcmVjYXRlKGZ1bmN0aW9uIG1lcmdlKGRlc3QsIHNyYykge1xuICAgIHJldHVybiBleHRlbmQoZGVzdCwgc3JjLCB0cnVlKTtcbn0sICdtZXJnZScsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogc2ltcGxlIGNsYXNzIGluaGVyaXRhbmNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGlsZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gYmFzZVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzXVxuICovXG5mdW5jdGlvbiBpbmhlcml0KGNoaWxkLCBiYXNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIGJhc2VQID0gYmFzZS5wcm90b3R5cGUsXG4gICAgICAgIGNoaWxkUDtcblxuICAgIGNoaWxkUCA9IGNoaWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYmFzZVApO1xuICAgIGNoaWxkUC5jb25zdHJ1Y3RvciA9IGNoaWxkO1xuICAgIGNoaWxkUC5fc3VwZXIgPSBiYXNlUDtcblxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGFzc2lnbihjaGlsZFAsIHByb3BlcnRpZXMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBzaW1wbGUgZnVuY3Rpb24gYmluZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGJpbmRGbihmbiwgY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBib3VuZEZuKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGxldCBhIGJvb2xlYW4gdmFsdWUgYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgbXVzdCByZXR1cm4gYSBib29sZWFuXG4gKiB0aGlzIGZpcnN0IGl0ZW0gaW4gYXJncyB3aWxsIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gdmFsXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJnc11cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBib29sT3JGbih2YWwsIGFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PSBUWVBFX0ZVTkNUSU9OKSB7XG4gICAgICAgIHJldHVybiB2YWwuYXBwbHkoYXJncyA/IGFyZ3NbMF0gfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiB1c2UgdGhlIHZhbDIgd2hlbiB2YWwxIGlzIHVuZGVmaW5lZFxuICogQHBhcmFtIHsqfSB2YWwxXG4gKiBAcGFyYW0geyp9IHZhbDJcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBpZlVuZGVmaW5lZCh2YWwxLCB2YWwyKSB7XG4gICAgcmV0dXJuICh2YWwxID09PSB1bmRlZmluZWQpID8gdmFsMiA6IHZhbDE7XG59XG5cbi8qKlxuICogYWRkRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgbm9kZSBpcyBpbiB0aGUgZ2l2ZW4gcGFyZW50XG4gKiBAbWV0aG9kIGhhc1BhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBoYXNQYXJlbnQobm9kZSwgcGFyZW50KSB7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogc21hbGwgaW5kZXhPZiB3cmFwcGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHJldHVybnMge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGluU3RyKHN0ciwgZmluZCkge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihmaW5kKSA+IC0xO1xufVxuXG4vKipcbiAqIHNwbGl0IHN0cmluZyBvbiB3aGl0ZXNwYWNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7QXJyYXl9IHdvcmRzXG4gKi9cbmZ1bmN0aW9uIHNwbGl0U3RyKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KC9cXHMrL2cpO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBhcnJheSBjb250YWlucyB0aGUgb2JqZWN0IHVzaW5nIGluZGV4T2Ygb3IgYSBzaW1wbGUgcG9seUZpbGxcbiAqIEBwYXJhbSB7QXJyYXl9IHNyY1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZmluZEJ5S2V5XVxuICogQHJldHVybiB7Qm9vbGVhbnxOdW1iZXJ9IGZhbHNlIHdoZW4gbm90IGZvdW5kLCBvciB0aGUgaW5kZXhcbiAqL1xuZnVuY3Rpb24gaW5BcnJheShzcmMsIGZpbmQsIGZpbmRCeUtleSkge1xuICAgIGlmIChzcmMuaW5kZXhPZiAmJiAhZmluZEJ5S2V5KSB7XG4gICAgICAgIHJldHVybiBzcmMuaW5kZXhPZihmaW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKChmaW5kQnlLZXkgJiYgc3JjW2ldW2ZpbmRCeUtleV0gPT0gZmluZCkgfHwgKCFmaW5kQnlLZXkgJiYgc3JjW2ldID09PSBmaW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG59XG5cbi8qKlxuICogY29udmVydCBhcnJheS1saWtlIG9iamVjdHMgdG8gcmVhbCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqLCAwKTtcbn1cblxuLyoqXG4gKiB1bmlxdWUgYXJyYXkgd2l0aCBvYmplY3RzIGJhc2VkIG9uIGEga2V5IChsaWtlICdpZCcpIG9yIGp1c3QgYnkgdGhlIGFycmF5J3MgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IHNyYyBbe2lkOjF9LHtpZDoyfSx7aWQ6MX1dXG4gKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NvcnQ9RmFsc2VdXG4gKiBAcmV0dXJucyB7QXJyYXl9IFt7aWQ6MX0se2lkOjJ9XVxuICovXG5mdW5jdGlvbiB1bmlxdWVBcnJheShzcmMsIGtleSwgc29ydCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhciBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICB2YXIgdmFsID0ga2V5ID8gc3JjW2ldW2tleV0gOiBzcmNbaV07XG4gICAgICAgIGlmIChpbkFycmF5KHZhbHVlcywgdmFsKSA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChzcmNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlc1tpXSA9IHZhbDtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmIChzb3J0KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KGZ1bmN0aW9uIHNvcnRVbmlxdWVBcnJheShhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFba2V5XSA+IGJba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8qKlxuICogZ2V0IHRoZSBwcmVmaXhlZCBwcm9wZXJ0eVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7U3RyaW5nfFVuZGVmaW5lZH0gcHJlZml4ZWRcbiAqL1xuZnVuY3Rpb24gcHJlZml4ZWQob2JqLCBwcm9wZXJ0eSkge1xuICAgIHZhciBwcmVmaXgsIHByb3A7XG4gICAgdmFyIGNhbWVsUHJvcCA9IHByb3BlcnR5WzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IFZFTkRPUl9QUkVGSVhFUy5sZW5ndGgpIHtcbiAgICAgICAgcHJlZml4ID0gVkVORE9SX1BSRUZJWEVTW2ldO1xuICAgICAgICBwcm9wID0gKHByZWZpeCkgPyBwcmVmaXggKyBjYW1lbFByb3AgOiBwcm9wZXJ0eTtcblxuICAgICAgICBpZiAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBnZXQgYSB1bmlxdWUgaWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHVuaXF1ZUlkXG4gKi9cbnZhciBfdW5pcXVlSWQgPSAxO1xuZnVuY3Rpb24gdW5pcXVlSWQoKSB7XG4gICAgcmV0dXJuIF91bmlxdWVJZCsrO1xufVxuXG4vKipcbiAqIGdldCB0aGUgd2luZG93IG9iamVjdCBvZiBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RG9jdW1lbnRWaWV3fFdpbmRvd31cbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93Rm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgdmFyIGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBlbGVtZW50O1xuICAgIHJldHVybiAoZG9jLmRlZmF1bHRWaWV3IHx8IGRvYy5wYXJlbnRXaW5kb3cgfHwgd2luZG93KTtcbn1cblxudmFyIE1PQklMRV9SRUdFWCA9IC9tb2JpbGV8dGFibGV0fGlwKGFkfGhvbmV8b2QpfGFuZHJvaWQvaTtcblxudmFyIFNVUFBPUlRfVE9VQ0ggPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KTtcbnZhciBTVVBQT1JUX1BPSU5URVJfRVZFTlRTID0gcHJlZml4ZWQod2luZG93LCAnUG9pbnRlckV2ZW50JykgIT09IHVuZGVmaW5lZDtcbnZhciBTVVBQT1JUX09OTFlfVE9VQ0ggPSBTVVBQT1JUX1RPVUNIICYmIE1PQklMRV9SRUdFWC50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG52YXIgSU5QVVRfVFlQRV9UT1VDSCA9ICd0b3VjaCc7XG52YXIgSU5QVVRfVFlQRV9QRU4gPSAncGVuJztcbnZhciBJTlBVVF9UWVBFX01PVVNFID0gJ21vdXNlJztcbnZhciBJTlBVVF9UWVBFX0tJTkVDVCA9ICdraW5lY3QnO1xuXG52YXIgQ09NUFVURV9JTlRFUlZBTCA9IDI1O1xuXG52YXIgSU5QVVRfU1RBUlQgPSAxO1xudmFyIElOUFVUX01PVkUgPSAyO1xudmFyIElOUFVUX0VORCA9IDQ7XG52YXIgSU5QVVRfQ0FOQ0VMID0gODtcblxudmFyIERJUkVDVElPTl9OT05FID0gMTtcbnZhciBESVJFQ1RJT05fTEVGVCA9IDI7XG52YXIgRElSRUNUSU9OX1JJR0hUID0gNDtcbnZhciBESVJFQ1RJT05fVVAgPSA4O1xudmFyIERJUkVDVElPTl9ET1dOID0gMTY7XG5cbnZhciBESVJFQ1RJT05fSE9SSVpPTlRBTCA9IERJUkVDVElPTl9MRUZUIHwgRElSRUNUSU9OX1JJR0hUO1xudmFyIERJUkVDVElPTl9WRVJUSUNBTCA9IERJUkVDVElPTl9VUCB8IERJUkVDVElPTl9ET1dOO1xudmFyIERJUkVDVElPTl9BTEwgPSBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTDtcblxudmFyIFBST1BTX1hZID0gWyd4JywgJ3knXTtcbnZhciBQUk9QU19DTElFTlRfWFkgPSBbJ2NsaWVudFgnLCAnY2xpZW50WSddO1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSW5wdXQobWFuYWdlciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIHRoaXMudGFyZ2V0ID0gbWFuYWdlci5vcHRpb25zLmlucHV0VGFyZ2V0O1xuXG4gICAgLy8gc21hbGxlciB3cmFwcGVyIGFyb3VuZCB0aGUgaGFuZGxlciwgZm9yIHRoZSBzY29wZSBhbmQgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIG1hbmFnZXIsXG4gICAgLy8gc28gd2hlbiBkaXNhYmxlZCB0aGUgaW5wdXQgZXZlbnRzIGFyZSBjb21wbGV0ZWx5IGJ5cGFzc2VkLlxuICAgIHRoaXMuZG9tSGFuZGxlciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGlmIChib29sT3JGbihtYW5hZ2VyLm9wdGlvbnMuZW5hYmxlLCBbbWFuYWdlcl0pKSB7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZXIoZXYpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG59XG5cbklucHV0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzaG91bGQgaGFuZGxlIHRoZSBpbnB1dEV2ZW50IGRhdGEgYW5kIHRyaWdnZXIgdGhlIGNhbGxiYWNrXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgYWRkRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIGNhbGxlZCBieSB0aGUgTWFuYWdlciBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRJbnN0YW5jZShtYW5hZ2VyKSB7XG4gICAgdmFyIFR5cGU7XG4gICAgdmFyIGlucHV0Q2xhc3MgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRDbGFzcztcblxuICAgIGlmIChpbnB1dENsYXNzKSB7XG4gICAgICAgIFR5cGUgPSBpbnB1dENsYXNzO1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9QT0lOVEVSX0VWRU5UUykge1xuICAgICAgICBUeXBlID0gUG9pbnRlckV2ZW50SW5wdXQ7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX09OTFlfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoSW5wdXQ7XG4gICAgfSBlbHNlIGlmICghU1VQUE9SVF9UT1VDSCkge1xuICAgICAgICBUeXBlID0gTW91c2VJbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBUeXBlID0gVG91Y2hNb3VzZUlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IChUeXBlKShtYW5hZ2VyLCBpbnB1dEhhbmRsZXIpO1xufVxuXG4vKipcbiAqIGhhbmRsZSBpbnB1dCBldmVudHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGlucHV0SGFuZGxlcihtYW5hZ2VyLCBldmVudFR5cGUsIGlucHV0KSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBjaGFuZ2VkUG9pbnRlcnNMZW4gPSBpbnB1dC5jaGFuZ2VkUG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBpc0ZpcnN0ID0gKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuICAgIHZhciBpc0ZpbmFsID0gKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuXG4gICAgaW5wdXQuaXNGaXJzdCA9ICEhaXNGaXJzdDtcbiAgICBpbnB1dC5pc0ZpbmFsID0gISFpc0ZpbmFsO1xuXG4gICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgbWFuYWdlci5zZXNzaW9uID0ge307XG4gICAgfVxuXG4gICAgLy8gc291cmNlIGV2ZW50IGlzIHRoZSBub3JtYWxpemVkIHZhbHVlIG9mIHRoZSBkb21FdmVudHNcbiAgICAvLyBsaWtlICd0b3VjaHN0YXJ0LCBtb3VzZXVwLCBwb2ludGVyZG93bidcbiAgICBpbnB1dC5ldmVudFR5cGUgPSBldmVudFR5cGU7XG5cbiAgICAvLyBjb21wdXRlIHNjYWxlLCByb3RhdGlvbiBldGNcbiAgICBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KTtcblxuICAgIC8vIGVtaXQgc2VjcmV0IGV2ZW50XG4gICAgbWFuYWdlci5lbWl0KCdoYW1tZXIuaW5wdXQnLCBpbnB1dCk7XG5cbiAgICBtYW5hZ2VyLnJlY29nbml6ZShpbnB1dCk7XG4gICAgbWFuYWdlci5zZXNzaW9uLnByZXZJbnB1dCA9IGlucHV0O1xufVxuXG4vKipcbiAqIGV4dGVuZCB0aGUgZGF0YSB3aXRoIHNvbWUgdXNhYmxlIHByb3BlcnRpZXMgbGlrZSBzY2FsZSwgcm90YXRlLCB2ZWxvY2l0eSBldGNcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYW5hZ2VyXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCkge1xuICAgIHZhciBzZXNzaW9uID0gbWFuYWdlci5zZXNzaW9uO1xuICAgIHZhciBwb2ludGVycyA9IGlucHV0LnBvaW50ZXJzO1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIHN0b3JlIHRoZSBmaXJzdCBpbnB1dCB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGFuZCBkaXJlY3Rpb25cbiAgICBpZiAoIXNlc3Npb24uZmlyc3RJbnB1dCkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0SW5wdXQgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfVxuXG4gICAgLy8gdG8gY29tcHV0ZSBzY2FsZSBhbmQgcm90YXRpb24gd2UgbmVlZCB0byBzdG9yZSB0aGUgbXVsdGlwbGUgdG91Y2hlc1xuICAgIGlmIChwb2ludGVyc0xlbmd0aCA+IDEgJiYgIXNlc3Npb24uZmlyc3RNdWx0aXBsZSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3RJbnB1dCA9IHNlc3Npb24uZmlyc3RJbnB1dDtcbiAgICB2YXIgZmlyc3RNdWx0aXBsZSA9IHNlc3Npb24uZmlyc3RNdWx0aXBsZTtcbiAgICB2YXIgb2Zmc2V0Q2VudGVyID0gZmlyc3RNdWx0aXBsZSA/IGZpcnN0TXVsdGlwbGUuY2VudGVyIDogZmlyc3RJbnB1dC5jZW50ZXI7XG5cbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyID0gZ2V0Q2VudGVyKHBvaW50ZXJzKTtcbiAgICBpbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICBpbnB1dC5kZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBmaXJzdElucHV0LnRpbWVTdGFtcDtcblxuICAgIGlucHV0LmFuZ2xlID0gZ2V0QW5nbGUob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuICAgIGlucHV0LmRpc3RhbmNlID0gZ2V0RGlzdGFuY2Uob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuXG4gICAgY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpO1xuICAgIGlucHV0Lm9mZnNldERpcmVjdGlvbiA9IGdldERpcmVjdGlvbihpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG5cbiAgICB2YXIgb3ZlcmFsbFZlbG9jaXR5ID0gZ2V0VmVsb2NpdHkoaW5wdXQuZGVsdGFUaW1lLCBpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WCA9IG92ZXJhbGxWZWxvY2l0eS54O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVkgPSBvdmVyYWxsVmVsb2NpdHkueTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHkgPSAoYWJzKG92ZXJhbGxWZWxvY2l0eS54KSA+IGFicyhvdmVyYWxsVmVsb2NpdHkueSkpID8gb3ZlcmFsbFZlbG9jaXR5LnggOiBvdmVyYWxsVmVsb2NpdHkueTtcblxuICAgIGlucHV0LnNjYWxlID0gZmlyc3RNdWx0aXBsZSA/IGdldFNjYWxlKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDE7XG4gICAgaW5wdXQucm90YXRpb24gPSBmaXJzdE11bHRpcGxlID8gZ2V0Um90YXRpb24oZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMDtcblxuICAgIGlucHV0Lm1heFBvaW50ZXJzID0gIXNlc3Npb24ucHJldklucHV0ID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogKChpbnB1dC5wb2ludGVycy5sZW5ndGggPlxuICAgICAgICBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycykgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycyk7XG5cbiAgICBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpO1xuXG4gICAgLy8gZmluZCB0aGUgY29ycmVjdCB0YXJnZXRcbiAgICB2YXIgdGFyZ2V0ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmIChoYXNQYXJlbnQoaW5wdXQuc3JjRXZlbnQudGFyZ2V0LCB0YXJnZXQpKSB7XG4gICAgICAgIHRhcmdldCA9IGlucHV0LnNyY0V2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaW5wdXQudGFyZ2V0ID0gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG4gICAgdmFyIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2SW5wdXQgPSBzZXNzaW9uLnByZXZJbnB1dCB8fCB7fTtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX1NUQVJUIHx8IHByZXZJbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX0VORCkge1xuICAgICAgICBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IHByZXZJbnB1dC5kZWx0YVggfHwgMCxcbiAgICAgICAgICAgIHk6IHByZXZJbnB1dC5kZWx0YVkgfHwgMFxuICAgICAgICB9O1xuXG4gICAgICAgIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBjZW50ZXIueCxcbiAgICAgICAgICAgIHk6IGNlbnRlci55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaW5wdXQuZGVsdGFYID0gcHJldkRlbHRhLnggKyAoY2VudGVyLnggLSBvZmZzZXQueCk7XG4gICAgaW5wdXQuZGVsdGFZID0gcHJldkRlbHRhLnkgKyAoY2VudGVyLnkgLSBvZmZzZXQueSk7XG59XG5cbi8qKlxuICogdmVsb2NpdHkgaXMgY2FsY3VsYXRlZCBldmVyeSB4IG1zXG4gKiBAcGFyYW0ge09iamVjdH0gc2Vzc2lvblxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBsYXN0ID0gc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgfHwgaW5wdXQsXG4gICAgICAgIGRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGxhc3QudGltZVN0YW1wLFxuICAgICAgICB2ZWxvY2l0eSwgdmVsb2NpdHlYLCB2ZWxvY2l0eVksIGRpcmVjdGlvbjtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfQ0FOQ0VMICYmIChkZWx0YVRpbWUgPiBDT01QVVRFX0lOVEVSVkFMIHx8IGxhc3QudmVsb2NpdHkgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IGlucHV0LmRlbHRhWCAtIGxhc3QuZGVsdGFYO1xuICAgICAgICB2YXIgZGVsdGFZID0gaW5wdXQuZGVsdGFZIC0gbGFzdC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIHYgPSBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgICAgdmVsb2NpdHlYID0gdi54O1xuICAgICAgICB2ZWxvY2l0eVkgPSB2Lnk7XG4gICAgICAgIHZlbG9jaXR5ID0gKGFicyh2LngpID4gYWJzKHYueSkpID8gdi54IDogdi55O1xuICAgICAgICBkaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIHNlc3Npb24ubGFzdEludGVydmFsID0gaW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXNlIGxhdGVzdCB2ZWxvY2l0eSBpbmZvIGlmIGl0IGRvZXNuJ3Qgb3ZlcnRha2UgYSBtaW5pbXVtIHBlcmlvZFxuICAgICAgICB2ZWxvY2l0eSA9IGxhc3QudmVsb2NpdHk7XG4gICAgICAgIHZlbG9jaXR5WCA9IGxhc3QudmVsb2NpdHlYO1xuICAgICAgICB2ZWxvY2l0eVkgPSBsYXN0LnZlbG9jaXR5WTtcbiAgICAgICAgZGlyZWN0aW9uID0gbGFzdC5kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgaW5wdXQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBpbnB1dC52ZWxvY2l0eVggPSB2ZWxvY2l0eVg7XG4gICAgaW5wdXQudmVsb2NpdHlZID0gdmVsb2NpdHlZO1xuICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBzaW1wbGUgY2xvbmUgZnJvbSB0aGUgaW5wdXQgdXNlZCBmb3Igc3RvcmFnZSBvZiBmaXJzdElucHV0IGFuZCBmaXJzdE11bHRpcGxlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9IGNsb25lZElucHV0RGF0YVxuICovXG5mdW5jdGlvbiBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCkge1xuICAgIC8vIG1ha2UgYSBzaW1wbGUgY29weSBvZiB0aGUgcG9pbnRlcnMgYmVjYXVzZSB3ZSB3aWxsIGdldCBhIHJlZmVyZW5jZSBpZiB3ZSBkb24ndFxuICAgIC8vIHdlIG9ubHkgbmVlZCBjbGllbnRYWSBmb3IgdGhlIGNhbGN1bGF0aW9uc1xuICAgIHZhciBwb2ludGVycyA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb2ludGVyc1tpXSA9IHtcbiAgICAgICAgICAgIGNsaWVudFg6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFgpLFxuICAgICAgICAgICAgY2xpZW50WTogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHRpbWVTdGFtcDogbm93KCksXG4gICAgICAgIHBvaW50ZXJzOiBwb2ludGVycyxcbiAgICAgICAgY2VudGVyOiBnZXRDZW50ZXIocG9pbnRlcnMpLFxuICAgICAgICBkZWx0YVg6IGlucHV0LmRlbHRhWCxcbiAgICAgICAgZGVsdGFZOiBpbnB1dC5kZWx0YVlcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgY2VudGVyIG9mIGFsbCB0aGUgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtPYmplY3R9IGNlbnRlciBjb250YWlucyBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRlcihwb2ludGVycykge1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB3aGVuIG9ubHkgb25lIHRvdWNoXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRYKSxcbiAgICAgICAgICAgIHk6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHggPSAwLCB5ID0gMCwgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBwb2ludGVyc0xlbmd0aCkge1xuICAgICAgICB4ICs9IHBvaW50ZXJzW2ldLmNsaWVudFg7XG4gICAgICAgIHkgKz0gcG9pbnRlcnNbaV0uY2xpZW50WTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHJvdW5kKHggLyBwb2ludGVyc0xlbmd0aCksXG4gICAgICAgIHk6IHJvdW5kKHkgLyBwb2ludGVyc0xlbmd0aClcbiAgICB9O1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHkgYmV0d2VlbiB0d28gcG9pbnRzLiB1bml0IGlzIGluIHB4IHBlciBtcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVRpbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7T2JqZWN0fSB2ZWxvY2l0eSBgeGAgYW5kIGB5YFxuICovXG5mdW5jdGlvbiBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIHgsIHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4IC8gZGVsdGFUaW1lIHx8IDAsXG4gICAgICAgIHk6IHkgLyBkZWx0YVRpbWUgfHwgMFxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBkaXJlY3Rpb24gYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge051bWJlcn0gZGlyZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIERJUkVDVElPTl9OT05FO1xuICAgIH1cblxuICAgIGlmIChhYnMoeCkgPj0gYWJzKHkpKSB7XG4gICAgICAgIHJldHVybiB4IDwgMCA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgIH1cbiAgICByZXR1cm4geSA8IDAgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFic29sdXRlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHAxIHt4LCB5fVxuICogQHBhcmFtIHtPYmplY3R9IHAyIHt4LCB5fVxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoKHggKiB4KSArICh5ICogeSkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYW5nbGUgYmV0d2VlbiB0d28gY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMVxuICogQHBhcmFtIHtPYmplY3R9IHAyXG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGFuZ2xlXG4gKi9cbmZ1bmN0aW9uIGdldEFuZ2xlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpICogMTgwIC8gTWF0aC5QSTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHJvdGF0aW9uIGRlZ3JlZXMgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gcm90YXRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0Um90YXRpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXRBbmdsZShlbmRbMV0sIGVuZFswXSwgUFJPUFNfQ0xJRU5UX1hZKSArIGdldEFuZ2xlKHN0YXJ0WzFdLCBzdGFydFswXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHNjYWxlIGZhY3RvciBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogbm8gc2NhbGUgaXMgMSwgYW5kIGdvZXMgZG93biB0byAwIHdoZW4gcGluY2hlZCB0b2dldGhlciwgYW5kIGJpZ2dlciB3aGVuIHBpbmNoZWQgb3V0XG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHNjYWxlXG4gKi9cbmZ1bmN0aW9uIGdldFNjYWxlKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0sIFBST1BTX0NMSUVOVF9YWSkgLyBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbnZhciBNT1VTRV9JTlBVVF9NQVAgPSB7XG4gICAgbW91c2Vkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBtb3VzZW1vdmU6IElOUFVUX01PVkUsXG4gICAgbW91c2V1cDogSU5QVVRfRU5EXG59O1xuXG52YXIgTU9VU0VfRUxFTUVOVF9FVkVOVFMgPSAnbW91c2Vkb3duJztcbnZhciBNT1VTRV9XSU5ET1dfRVZFTlRTID0gJ21vdXNlbW92ZSBtb3VzZXVwJztcblxuLyoqXG4gKiBNb3VzZSBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gTW91c2VJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBNT1VTRV9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gTU9VU0VfV0lORE9XX0VWRU5UUztcblxuICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlOyAvLyBtb3VzZWRvd24gc3RhdGVcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTUVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBNT1VTRV9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gb24gc3RhcnQgd2Ugd2FudCB0byBoYXZlIHRoZSBsZWZ0IG1vdXNlIGJ1dHRvbiBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiBldi5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfTU9WRSAmJiBldi53aGljaCAhPT0gMSkge1xuICAgICAgICAgICAgZXZlbnRUeXBlID0gSU5QVVRfRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmICghdGhpcy5wcmVzc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBQT0lOVEVSX0lOUFVUX01BUCA9IHtcbiAgICBwb2ludGVyZG93bjogSU5QVVRfU1RBUlQsXG4gICAgcG9pbnRlcm1vdmU6IElOUFVUX01PVkUsXG4gICAgcG9pbnRlcnVwOiBJTlBVVF9FTkQsXG4gICAgcG9pbnRlcmNhbmNlbDogSU5QVVRfQ0FOQ0VMLFxuICAgIHBvaW50ZXJvdXQ6IElOUFVUX0NBTkNFTFxufTtcblxuLy8gaW4gSUUxMCB0aGUgcG9pbnRlciB0eXBlcyBpcyBkZWZpbmVkIGFzIGFuIGVudW1cbnZhciBJRTEwX1BPSU5URVJfVFlQRV9FTlVNID0ge1xuICAgIDI6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgMzogSU5QVVRfVFlQRV9QRU4sXG4gICAgNDogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICA1OiBJTlBVVF9UWVBFX0tJTkVDVCAvLyBzZWUgaHR0cHM6Ly90d2l0dGVyLmNvbS9qYWNvYnJvc3NpL3N0YXR1cy80ODA1OTY0Mzg0ODk4OTA4MTZcbn07XG5cbnZhciBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ3BvaW50ZXJkb3duJztcbnZhciBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAncG9pbnRlcm1vdmUgcG9pbnRlcnVwIHBvaW50ZXJjYW5jZWwnO1xuXG4vLyBJRTEwIGhhcyBwcmVmaXhlZCBzdXBwb3J0LCBhbmQgY2FzZS1zZW5zaXRpdmVcbmlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQgJiYgIXdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ01TUG9pbnRlckRvd24nO1xuICAgIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdNU1BvaW50ZXJNb3ZlIE1TUG9pbnRlclVwIE1TUG9pbnRlckNhbmNlbCc7XG59XG5cbi8qKlxuICogUG9pbnRlciBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gUG9pbnRlckV2ZW50SW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gUE9JTlRFUl9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gUE9JTlRFUl9XSU5ET1dfRVZFTlRTO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RvcmUgPSAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucG9pbnRlckV2ZW50cyA9IFtdKTtcbn1cblxuaW5oZXJpdChQb2ludGVyRXZlbnRJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gUEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHRoaXMuc3RvcmU7XG4gICAgICAgIHZhciByZW1vdmVQb2ludGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGV2ZW50VHlwZU5vcm1hbGl6ZWQgPSBldi50eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnbXMnLCAnJyk7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBQT0lOVEVSX0lOUFVUX01BUFtldmVudFR5cGVOb3JtYWxpemVkXTtcbiAgICAgICAgdmFyIHBvaW50ZXJUeXBlID0gSUUxMF9QT0lOVEVSX1RZUEVfRU5VTVtldi5wb2ludGVyVHlwZV0gfHwgZXYucG9pbnRlclR5cGU7XG5cbiAgICAgICAgdmFyIGlzVG91Y2ggPSAocG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCk7XG5cbiAgICAgICAgLy8gZ2V0IGluZGV4IG9mIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgdmFyIHN0b3JlSW5kZXggPSBpbkFycmF5KHN0b3JlLCBldi5wb2ludGVySWQsICdwb2ludGVySWQnKTtcblxuICAgICAgICAvLyBzdGFydCBhbmQgbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAoZXYuYnV0dG9uID09PSAwIHx8IGlzVG91Y2gpKSB7XG4gICAgICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgICBzdG9yZUluZGV4ID0gc3RvcmUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgcmVtb3ZlUG9pbnRlciA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdCBub3QgZm91bmQsIHNvIHRoZSBwb2ludGVyIGhhc24ndCBiZWVuIGRvd24gKHNvIGl0J3MgcHJvYmFibHkgYSBob3ZlcilcbiAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICBzdG9yZVtzdG9yZUluZGV4XSA9IGV2O1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBzdG9yZSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBwb2ludGVyVHlwZSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVtb3ZlUG9pbnRlcikge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlXG4gICAgICAgICAgICBzdG9yZS5zcGxpY2Uoc3RvcmVJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIFNJTkdMRV9UT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQnO1xudmFyIFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBUb3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gU2luZ2xlVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTaW5nbGVUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFNJTkdMRV9UT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gc2hvdWxkIHdlIGhhbmRsZSB0aGUgdG91Y2ggZXZlbnRzP1xuICAgICAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoZXMgPSBub3JtYWxpemVTaW5nbGVUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuXG4gICAgICAgIC8vIHdoZW4gZG9uZSwgcmVzZXQgdGhlIHN0YXJ0ZWQgc3RhdGVcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiB0b3VjaGVzWzBdLmxlbmd0aCAtIHRvdWNoZXNbMV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVTaW5nbGVUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbCA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIGNoYW5nZWQgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKTtcblxuICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgYWxsID0gdW5pcXVlQXJyYXkoYWxsLmNvbmNhdChjaGFuZ2VkKSwgJ2lkZW50aWZpZXInLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2FsbCwgY2hhbmdlZF07XG59XG5cbnZhciBUT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFRPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIE11bHRpLXVzZXIgdG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFRPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy50YXJnZXRJZHMgPSB7fTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuICAgICAgICB2YXIgdG91Y2hlcyA9IGdldFRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG4gICAgICAgIGlmICghdG91Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsVG91Y2hlcyA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIHRhcmdldElkcyA9IHRoaXMudGFyZ2V0SWRzO1xuXG4gICAgLy8gd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSB0b3VjaCwgdGhlIHByb2Nlc3MgY2FuIGJlIHNpbXBsaWZpZWRcbiAgICBpZiAodHlwZSAmIChJTlBVVF9TVEFSVCB8IElOUFVUX01PVkUpICYmIGFsbFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRhcmdldElkc1thbGxUb3VjaGVzWzBdLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFthbGxUb3VjaGVzLCBhbGxUb3VjaGVzXTtcbiAgICB9XG5cbiAgICB2YXIgaSxcbiAgICAgICAgdGFyZ2V0VG91Y2hlcyxcbiAgICAgICAgY2hhbmdlZFRvdWNoZXMgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMgPSBbXSxcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAvLyBnZXQgdGFyZ2V0IHRvdWNoZXMgZnJvbSB0b3VjaGVzXG4gICAgdGFyZ2V0VG91Y2hlcyA9IGFsbFRvdWNoZXMuZmlsdGVyKGZ1bmN0aW9uKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiBoYXNQYXJlbnQodG91Y2gudGFyZ2V0LCB0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29sbGVjdCB0b3VjaGVzXG4gICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRJZHNbdGFyZ2V0VG91Y2hlc1tpXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgY2hhbmdlZCB0b3VjaGVzIHRvIG9ubHkgY29udGFpbiB0b3VjaGVzIHRoYXQgZXhpc3QgaW4gdGhlIGNvbGxlY3RlZCB0YXJnZXQgaWRzXG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBjaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXSkge1xuICAgICAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMucHVzaChjaGFuZ2VkVG91Y2hlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhbnVwIHJlbW92ZWQgdG91Y2hlc1xuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICBkZWxldGUgdGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoIWNoYW5nZWRUYXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLy8gbWVyZ2UgdGFyZ2V0VG91Y2hlcyB3aXRoIGNoYW5nZWRUYXJnZXRUb3VjaGVzIHNvIGl0IGNvbnRhaW5zIEFMTCB0b3VjaGVzLCBpbmNsdWRpbmcgJ2VuZCcgYW5kICdjYW5jZWwnXG4gICAgICAgIHVuaXF1ZUFycmF5KHRhcmdldFRvdWNoZXMuY29uY2F0KGNoYW5nZWRUYXJnZXRUb3VjaGVzKSwgJ2lkZW50aWZpZXInLCB0cnVlKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXNcbiAgICBdO1xufVxuXG4vKipcbiAqIENvbWJpbmVkIHRvdWNoIGFuZCBtb3VzZSBpbnB1dFxuICpcbiAqIFRvdWNoIGhhcyBhIGhpZ2hlciBwcmlvcml0eSB0aGVuIG1vdXNlLCBhbmQgd2hpbGUgdG91Y2hpbmcgbm8gbW91c2UgZXZlbnRzIGFyZSBhbGxvd2VkLlxuICogVGhpcyBiZWNhdXNlIHRvdWNoIGRldmljZXMgYWxzbyBlbWl0IG1vdXNlIGV2ZW50cyB3aGlsZSBkb2luZyBhIHRvdWNoLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuXG52YXIgREVEVVBfVElNRU9VVCA9IDI1MDA7XG52YXIgREVEVVBfRElTVEFOQ0UgPSAyNTtcblxuZnVuY3Rpb24gVG91Y2hNb3VzZUlucHV0KCkge1xuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgaGFuZGxlciA9IGJpbmRGbih0aGlzLmhhbmRsZXIsIHRoaXMpO1xuICAgIHRoaXMudG91Y2ggPSBuZXcgVG91Y2hJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuICAgIHRoaXMubW91c2UgPSBuZXcgTW91c2VJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuXG4gICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBudWxsO1xuICAgIHRoaXMubGFzdFRvdWNoZXMgPSBbXTtcbn1cblxuaW5oZXJpdChUb3VjaE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGFuZCB0b3VjaCBldmVudHNcbiAgICAgKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dEV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRNRWhhbmRsZXIobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBpc1RvdWNoID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKSxcbiAgICAgICAgICAgIGlzTW91c2UgPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfTU9VU0UpO1xuXG4gICAgICAgIGlmIChpc01vdXNlICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcy5maXJlc1RvdWNoRXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHdlJ3JlIGluIGEgdG91Y2ggZXZlbnQsIHJlY29yZCB0b3VjaGVzIHRvICBkZS1kdXBlIHN5bnRoZXRpYyBtb3VzZSBldmVudFxuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgcmVjb3JkVG91Y2hlcy5jYWxsKHRoaXMsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNNb3VzZSAmJiBpc1N5bnRoZXRpY0V2ZW50LmNhbGwodGhpcywgaW5wdXREYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayhtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudG91Y2guZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm1vdXNlLmRlc3Ryb3koKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcmVjb3JkVG91Y2hlcyhldmVudFR5cGUsIGV2ZW50RGF0YSkge1xuICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUb3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF0uaWRlbnRpZmllcjtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRMYXN0VG91Y2goZXZlbnREYXRhKSB7XG4gICAgdmFyIHRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXTtcblxuICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnByaW1hcnlUb3VjaCkge1xuICAgICAgICB2YXIgbGFzdFRvdWNoID0ge3g6IHRvdWNoLmNsaWVudFgsIHk6IHRvdWNoLmNsaWVudFl9O1xuICAgICAgICB0aGlzLmxhc3RUb3VjaGVzLnB1c2gobGFzdFRvdWNoKTtcbiAgICAgICAgdmFyIGx0cyA9IHRoaXMubGFzdFRvdWNoZXM7XG4gICAgICAgIHZhciByZW1vdmVMYXN0VG91Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpID0gbHRzLmluZGV4T2YobGFzdFRvdWNoKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRUaW1lb3V0KHJlbW92ZUxhc3RUb3VjaCwgREVEVVBfVElNRU9VVCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bnRoZXRpY0V2ZW50KGV2ZW50RGF0YSkge1xuICAgIHZhciB4ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFgsIHkgPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGFzdFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzLmxhc3RUb3VjaGVzW2ldO1xuICAgICAgICB2YXIgZHggPSBNYXRoLmFicyh4IC0gdC54KSwgZHkgPSBNYXRoLmFicyh5IC0gdC55KTtcbiAgICAgICAgaWYgKGR4IDw9IERFRFVQX0RJU1RBTkNFICYmIGR5IDw9IERFRFVQX0RJU1RBTkNFKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gPSBwcmVmaXhlZChURVNUX0VMRU1FTlQuc3R5bGUsICd0b3VjaEFjdGlvbicpO1xudmFyIE5BVElWRV9UT1VDSF9BQ1RJT04gPSBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gIT09IHVuZGVmaW5lZDtcblxuLy8gbWFnaWNhbCB0b3VjaEFjdGlvbiB2YWx1ZVxudmFyIFRPVUNIX0FDVElPTl9DT01QVVRFID0gJ2NvbXB1dGUnO1xudmFyIFRPVUNIX0FDVElPTl9BVVRPID0gJ2F1dG8nO1xudmFyIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04gPSAnbWFuaXB1bGF0aW9uJzsgLy8gbm90IGltcGxlbWVudGVkXG52YXIgVE9VQ0hfQUNUSU9OX05PTkUgPSAnbm9uZSc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9YID0gJ3Bhbi14JztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1kgPSAncGFuLXknO1xudmFyIFRPVUNIX0FDVElPTl9NQVAgPSBnZXRUb3VjaEFjdGlvblByb3BzKCk7XG5cbi8qKlxuICogVG91Y2ggQWN0aW9uXG4gKiBzZXRzIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBvciB1c2VzIHRoZSBqcyBhbHRlcm5hdGl2ZVxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBUb3VjaEFjdGlvbihtYW5hZ2VyLCB2YWx1ZSkge1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5zZXQodmFsdWUpO1xufVxuXG5Ub3VjaEFjdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZSBvbiB0aGUgZWxlbWVudCBvciBlbmFibGUgdGhlIHBvbHlmaWxsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBmaW5kIG91dCB0aGUgdG91Y2gtYWN0aW9uIGJ5IHRoZSBldmVudCBoYW5kbGVyc1xuICAgICAgICBpZiAodmFsdWUgPT0gVE9VQ0hfQUNUSU9OX0NPTVBVVEUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jb21wdXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTkFUSVZFX1RPVUNIX0FDVElPTiAmJiB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZSAmJiBUT1VDSF9BQ1RJT05fTUFQW3ZhbHVlXSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGVbUFJFRklYRURfVE9VQ0hfQUNUSU9OXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHZhbHVlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBqdXN0IHJlLXNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWVcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLm1hbmFnZXIub3B0aW9ucy50b3VjaEFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvbXB1dGUgdGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgYmFzZWQgb24gdGhlIHJlY29nbml6ZXIncyBzZXR0aW5nc1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgY29tcHV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGVhY2godGhpcy5tYW5hZ2VyLnJlY29nbml6ZXJzLCBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICBpZiAoYm9vbE9yRm4ocmVjb2duaXplci5vcHRpb25zLmVuYWJsZSwgW3JlY29nbml6ZXJdKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChyZWNvZ25pemVyLmdldFRvdWNoQWN0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMuam9pbignICcpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgaXMgY2FsbGVkIG9uIGVhY2ggaW5wdXQgY3ljbGUgYW5kIHByb3ZpZGVzIHRoZSBwcmV2ZW50aW5nIG9mIHRoZSBicm93c2VyIGJlaGF2aW9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgcHJldmVudERlZmF1bHRzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3JjRXZlbnQgPSBpbnB1dC5zcmNFdmVudDtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0Lm9mZnNldERpcmVjdGlvbjtcblxuICAgICAgICAvLyBpZiB0aGUgdG91Y2ggYWN0aW9uIGRpZCBwcmV2ZW50ZWQgb25jZSB0aGlzIHNlc3Npb25cbiAgICAgICAgaWYgKHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCkge1xuICAgICAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgaGFzTm9uZSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1ldO1xuICAgICAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9YXTtcblxuICAgICAgICBpZiAoaGFzTm9uZSkge1xuICAgICAgICAgICAgLy9kbyBub3QgcHJldmVudCBkZWZhdWx0cyBpZiB0aGlzIGlzIGEgdGFwIGdlc3R1cmVcblxuICAgICAgICAgICAgdmFyIGlzVGFwUG9pbnRlciA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIHZhciBpc1RhcE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCAyO1xuICAgICAgICAgICAgdmFyIGlzVGFwVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgMjUwO1xuXG4gICAgICAgICAgICBpZiAoaXNUYXBQb2ludGVyICYmIGlzVGFwTW92ZW1lbnQgJiYgaXNUYXBUb3VjaFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgICAgICAvLyBgcGFuLXggcGFuLXlgIG1lYW5zIGJyb3dzZXIgaGFuZGxlcyBhbGwgc2Nyb2xsaW5nL3Bhbm5pbmcsIGRvIG5vdCBwcmV2ZW50XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzTm9uZSB8fFxuICAgICAgICAgICAgKGhhc1BhblkgJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHx8XG4gICAgICAgICAgICAoaGFzUGFuWCAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50U3JjKHNyY0V2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsIHByZXZlbnREZWZhdWx0IHRvIHByZXZlbnQgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW9yIChzY3JvbGxpbmcgaW4gbW9zdCBjYXNlcylcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3JjRXZlbnRcbiAgICAgKi9cbiAgICBwcmV2ZW50U3JjOiBmdW5jdGlvbihzcmNFdmVudCkge1xuICAgICAgICB0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogd2hlbiB0aGUgdG91Y2hBY3Rpb25zIGFyZSBjb2xsZWN0ZWQgdGhleSBhcmUgbm90IGEgdmFsaWQgdmFsdWUsIHNvIHdlIG5lZWQgdG8gY2xlYW4gdGhpbmdzIHVwLiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uc1xuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMpIHtcbiAgICAvLyBub25lXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcblxuICAgIC8vIGlmIGJvdGggcGFuLXggYW5kIHBhbi15IGFyZSBzZXQgKGRpZmZlcmVudCByZWNvZ25pemVyc1xuICAgIC8vIGZvciBkaWZmZXJlbnQgZGlyZWN0aW9ucywgZS5nLiBob3Jpem9udGFsIHBhbiBidXQgdmVydGljYWwgc3dpcGU/KVxuICAgIC8vIHdlIG5lZWQgbm9uZSAoYXMgb3RoZXJ3aXNlIHdpdGggcGFuLXggcGFuLXkgY29tYmluZWQgbm9uZSBvZiB0aGVzZVxuICAgIC8vIHJlY29nbml6ZXJzIHdpbGwgd29yaywgc2luY2UgdGhlIGJyb3dzZXIgd291bGQgaGFuZGxlIGFsbCBwYW5uaW5nXG4gICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgLy8gcGFuLXggT1IgcGFuLXlcbiAgICBpZiAoaGFzUGFuWCB8fCBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBoYXNQYW5YID8gVE9VQ0hfQUNUSU9OX1BBTl9YIDogVE9VQ0hfQUNUSU9OX1BBTl9ZO1xuICAgIH1cblxuICAgIC8vIG1hbmlwdWxhdGlvblxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTjtcbiAgICB9XG5cbiAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX0FVVE87XG59XG5cbmZ1bmN0aW9uIGdldFRvdWNoQWN0aW9uUHJvcHMoKSB7XG4gICAgaWYgKCFOQVRJVkVfVE9VQ0hfQUNUSU9OKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRvdWNoTWFwID0ge307XG4gICAgdmFyIGNzc1N1cHBvcnRzID0gd2luZG93LkNTUyAmJiB3aW5kb3cuQ1NTLnN1cHBvcnRzO1xuICAgIFsnYXV0bycsICdtYW5pcHVsYXRpb24nLCAncGFuLXknLCAncGFuLXgnLCAncGFuLXggcGFuLXknLCAnbm9uZSddLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XG5cbiAgICAgICAgLy8gSWYgY3NzLnN1cHBvcnRzIGlzIG5vdCBzdXBwb3J0ZWQgYnV0IHRoZXJlIGlzIG5hdGl2ZSB0b3VjaC1hY3Rpb24gYXNzdW1lIGl0IHN1cHBvcnRzXG4gICAgICAgIC8vIGFsbCB2YWx1ZXMuIFRoaXMgaXMgdGhlIGNhc2UgZm9yIElFIDEwIGFuZCAxMS5cbiAgICAgICAgdG91Y2hNYXBbdmFsXSA9IGNzc1N1cHBvcnRzID8gd2luZG93LkNTUy5zdXBwb3J0cygndG91Y2gtYWN0aW9uJywgdmFsKSA6IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdWNoTWFwO1xufVxuXG4vKipcbiAqIFJlY29nbml6ZXIgZmxvdyBleHBsYWluZWQ7ICpcbiAqIEFsbCByZWNvZ25pemVycyBoYXZlIHRoZSBpbml0aWFsIHN0YXRlIG9mIFBPU1NJQkxFIHdoZW4gYSBpbnB1dCBzZXNzaW9uIHN0YXJ0cy5cbiAqIFRoZSBkZWZpbml0aW9uIG9mIGEgaW5wdXQgc2Vzc2lvbiBpcyBmcm9tIHRoZSBmaXJzdCBpbnB1dCB1bnRpbCB0aGUgbGFzdCBpbnB1dCwgd2l0aCBhbGwgaXQncyBtb3ZlbWVudCBpbiBpdC4gKlxuICogRXhhbXBsZSBzZXNzaW9uIGZvciBtb3VzZS1pbnB1dDogbW91c2Vkb3duIC0+IG1vdXNlbW92ZSAtPiBtb3VzZXVwXG4gKlxuICogT24gZWFjaCByZWNvZ25pemluZyBjeWNsZSAoc2VlIE1hbmFnZXIucmVjb2duaXplKSB0aGUgLnJlY29nbml6ZSgpIG1ldGhvZCBpcyBleGVjdXRlZFxuICogd2hpY2ggZGV0ZXJtaW5lcyB3aXRoIHN0YXRlIGl0IHNob3VsZCBiZS5cbiAqXG4gKiBJZiB0aGUgcmVjb2duaXplciBoYXMgdGhlIHN0YXRlIEZBSUxFRCwgQ0FOQ0VMTEVEIG9yIFJFQ09HTklaRUQgKGVxdWFscyBFTkRFRCksIGl0IGlzIHJlc2V0IHRvXG4gKiBQT1NTSUJMRSB0byBnaXZlIGl0IGFub3RoZXIgY2hhbmdlIG9uIHRoZSBuZXh0IGN5Y2xlLlxuICpcbiAqICAgICAgICAgICAgICAgUG9zc2libGVcbiAqICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICArLS0tLS0rLS0tLS0tLS0tLS0tLS0tK1xuICogICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICArLS0tLS0rLS0tLS0rICAgICAgICAgICAgICAgfFxuICogICAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgICAgfFxuICogICBGYWlsZWQgICAgICBDYW5jZWxsZWQgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLStcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICBSZWNvZ25pemVkICAgICAgIEJlZ2FuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRlZC9SZWNvZ25pemVkXG4gKi9cbnZhciBTVEFURV9QT1NTSUJMRSA9IDE7XG52YXIgU1RBVEVfQkVHQU4gPSAyO1xudmFyIFNUQVRFX0NIQU5HRUQgPSA0O1xudmFyIFNUQVRFX0VOREVEID0gODtcbnZhciBTVEFURV9SRUNPR05JWkVEID0gU1RBVEVfRU5ERUQ7XG52YXIgU1RBVEVfQ0FOQ0VMTEVEID0gMTY7XG52YXIgU1RBVEVfRkFJTEVEID0gMzI7XG5cbi8qKlxuICogUmVjb2duaXplclxuICogRXZlcnkgcmVjb2duaXplciBuZWVkcyB0byBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBSZWNvZ25pemVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5pZCA9IHVuaXF1ZUlkKCk7XG5cbiAgICB0aGlzLm1hbmFnZXIgPSBudWxsO1xuXG4gICAgLy8gZGVmYXVsdCBpcyBlbmFibGUgdHJ1ZVxuICAgIHRoaXMub3B0aW9ucy5lbmFibGUgPSBpZlVuZGVmaW5lZCh0aGlzLm9wdGlvbnMuZW5hYmxlLCB0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcblxuICAgIHRoaXMuc2ltdWx0YW5lb3VzID0ge307XG4gICAgdGhpcy5yZXF1aXJlRmFpbCA9IFtdO1xufVxuXG5SZWNvZ25pemVyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgZGVmYXVsdHM6IHt9LFxuXG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1JlY29nbml6ZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGFsc28gdXBkYXRlIHRoZSB0b3VjaEFjdGlvbiwgaW4gY2FzZSBzb21ldGhpbmcgY2hhbmdlZCBhYm91dCB0aGUgZGlyZWN0aW9ucy9lbmFibGVkIHN0YXRlXG4gICAgICAgIHRoaXMubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNpbXVsdGFuZW91cyA9IHRoaXMuc2ltdWx0YW5lb3VzO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmICghc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0pIHtcbiAgICAgICAgICAgIHNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdID0gb3RoZXJSZWNvZ25pemVyO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlY29nbml6ZVdpdGgodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHNpbXVsdGFuZW91cyBsaW5rLiBpdCBkb2VzbnQgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemVyIGNhbiBvbmx5IHJ1biB3aGVuIGFuIG90aGVyIGlzIGZhaWxpbmdcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVxdWlyZUZhaWwgPSB0aGlzLnJlcXVpcmVGYWlsO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmIChpbkFycmF5KHJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpID09PSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZUZhaWwucHVzaChvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSByZXF1aXJlRmFpbHVyZSBsaW5rLiBpdCBkb2VzIG5vdCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkodGhpcy5yZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZUZhaWwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaGFzIHJlcXVpcmUgZmFpbHVyZXMgYm9vbGVhblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc1JlcXVpcmVGYWlsdXJlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCA+IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlmIHRoZSByZWNvZ25pemVyIGNhbiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFlvdSBzaG91bGQgdXNlIGB0cnlFbWl0YCBpbnN0ZWFkIG9mIGBlbWl0YCBkaXJlY3RseSB0byBjaGVja1xuICAgICAqIHRoYXQgYWxsIHRoZSBuZWVkZWQgcmVjb2duaXplcnMgaGFzIGZhaWxlZCBiZWZvcmUgZW1pdHRpbmcuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYubWFuYWdlci5lbWl0KGV2ZW50LCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAncGFuc3RhcnQnIGFuZCAncGFubW92ZSdcbiAgICAgICAgaWYgKHN0YXRlIDwgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50KTsgLy8gc2ltcGxlICdldmVudE5hbWUnIGV2ZW50c1xuXG4gICAgICAgIGlmIChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpIHsgLy8gYWRkaXRpb25hbCBldmVudChwYW5sZWZ0LCBwYW5yaWdodCwgcGluY2hpbiwgcGluY2hvdXQuLi4pXG4gICAgICAgICAgICBlbWl0KGlucHV0LmFkZGl0aW9uYWxFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYW5lbmQgYW5kIHBhbmNhbmNlbFxuICAgICAgICBpZiAoc3RhdGUgPj0gU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGF0IGFsbCB0aGUgcmVxdWlyZSBmYWlsdXJlIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQsXG4gICAgICogaWYgdHJ1ZSwgaXQgZW1pdHMgYSBnZXN0dXJlIGV2ZW50LFxuICAgICAqIG90aGVyd2lzZSwgc2V0dXAgdGhlIHN0YXRlIHRvIEZBSUxFRC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICB0cnlFbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5jYW5FbWl0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGl0J3MgZmFpbGluZyBhbnl3YXlcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FuIHdlIGVtaXQ/XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuRW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5yZXF1aXJlRmFpbFtpXS5zdGF0ZSAmIChTVEFURV9GQUlMRUQgfCBTVEFURV9QT1NTSUJMRSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgLy8gbWFrZSBhIG5ldyBjb3B5IG9mIHRoZSBpbnB1dERhdGFcbiAgICAgICAgLy8gc28gd2UgY2FuIGNoYW5nZSB0aGUgaW5wdXREYXRhIHdpdGhvdXQgbWVzc2luZyB1cCB0aGUgb3RoZXIgcmVjb2duaXplcnNcbiAgICAgICAgdmFyIGlucHV0RGF0YUNsb25lID0gYXNzaWduKHt9LCBpbnB1dERhdGEpO1xuXG4gICAgICAgIC8vIGlzIGlzIGVuYWJsZWQgYW5kIGFsbG93IHJlY29nbml6aW5nP1xuICAgICAgICBpZiAoIWJvb2xPckZuKHRoaXMub3B0aW9ucy5lbmFibGUsIFt0aGlzLCBpbnB1dERhdGFDbG9uZV0pKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB3ZSd2ZSByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfUkVDT0dOSVpFRCB8IFNUQVRFX0NBTkNFTExFRCB8IFNUQVRFX0ZBSUxFRCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnByb2Nlc3MoaW5wdXREYXRhQ2xvbmUpO1xuXG4gICAgICAgIC8vIHRoZSByZWNvZ25pemVyIGhhcyByZWNvZ25pemVkIGEgZ2VzdHVyZVxuICAgICAgICAvLyBzbyB0cmlnZ2VyIGFuIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEIHwgU1RBVEVfQ0FOQ0VMTEVEKSkge1xuICAgICAgICAgICAgdGhpcy50cnlFbWl0KGlucHV0RGF0YUNsb25lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHN0YXRlIG9mIHRoZSByZWNvZ25pemVyXG4gICAgICogdGhlIGFjdHVhbCByZWNvZ25pemluZyBoYXBwZW5zIGluIHRoaXMgbWV0aG9kXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICogQHJldHVybnMge0NvbnN0fSBTVEFURVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0RGF0YSkgeyB9LCAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgcHJlZmVycmVkIHRvdWNoLWFjdGlvblxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBnZXN0dXJlIGlzbid0IGFsbG93ZWQgdG8gcmVjb2duaXplXG4gICAgICogbGlrZSB3aGVuIGFub3RoZXIgaXMgYmVpbmcgcmVjb2duaXplZCBvciBpdCBpcyBkaXNhYmxlZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkgeyB9XG59O1xuXG4vKipcbiAqIGdldCBhIHVzYWJsZSBzdHJpbmcsIHVzZWQgYXMgZXZlbnQgcG9zdGZpeFxuICogQHBhcmFtIHtDb25zdH0gc3RhdGVcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHN0YXRlU3RyKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlICYgU1RBVEVfQ0FOQ0VMTEVEKSB7XG4gICAgICAgIHJldHVybiAnY2FuY2VsJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9DSEFOR0VEKSB7XG4gICAgICAgIHJldHVybiAnbW92ZSc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0JFR0FOKSB7XG4gICAgICAgIHJldHVybiAnc3RhcnQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZGlyZWN0aW9uIGNvbnMgdG8gc3RyaW5nXG4gKiBAcGFyYW0ge0NvbnN0fSBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRpcmVjdGlvblN0cihkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9ET1dOKSB7XG4gICAgICAgIHJldHVybiAnZG93bic7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1VQKSB7XG4gICAgICAgIHJldHVybiAndXAnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9MRUZUKSB7XG4gICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1JJR0hUKSB7XG4gICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZ2V0IGEgcmVjb2duaXplciBieSBuYW1lIGlmIGl0IGlzIGJvdW5kIHRvIGEgbWFuYWdlclxuICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gb3RoZXJSZWNvZ25pemVyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAqIEByZXR1cm5zIHtSZWNvZ25pemVyfVxuICovXG5mdW5jdGlvbiBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgcmVjb2duaXplcikge1xuICAgIHZhciBtYW5hZ2VyID0gcmVjb2duaXplci5tYW5hZ2VyO1xuICAgIGlmIChtYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiBtYW5hZ2VyLmdldChvdGhlclJlY29nbml6ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gb3RoZXJSZWNvZ25pemVyO1xufVxuXG4vKipcbiAqIFRoaXMgcmVjb2duaXplciBpcyBqdXN0IHVzZWQgYXMgYSBiYXNlIGZvciB0aGUgc2ltcGxlIGF0dHJpYnV0ZSByZWNvZ25pemVycy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBBdHRyUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoQXR0clJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDFcbiAgICAgICAgICovXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2hlY2sgaWYgaXQgdGhlIHJlY29nbml6ZXIgcmVjZWl2ZXMgdmFsaWQgaW5wdXQsIGxpa2UgaW5wdXQuZGlzdGFuY2UgPiAxMC5cbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gcmVjb2duaXplZFxuICAgICAqL1xuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9uUG9pbnRlcnMgPSB0aGlzLm9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHJldHVybiBvcHRpb25Qb2ludGVycyA9PT0gMCB8fCBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvblBvaW50ZXJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIHRoZSBpbnB1dCBhbmQgcmV0dXJuIHRoZSBzdGF0ZSBmb3IgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Kn0gU3RhdGVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gaW5wdXQuZXZlbnRUeXBlO1xuXG4gICAgICAgIHZhciBpc1JlY29nbml6ZWQgPSBzdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuYXR0clRlc3QoaW5wdXQpO1xuXG4gICAgICAgIC8vIG9uIGNhbmNlbCBpbnB1dCBhbmQgd2UndmUgcmVjb2duaXplZCBiZWZvcmUsIHJldHVybiBTVEFURV9DQU5DRUxMRURcbiAgICAgICAgaWYgKGlzUmVjb2duaXplZCAmJiAoZXZlbnRUeXBlICYgSU5QVVRfQ0FOQ0VMIHx8ICFpc1ZhbGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0FOQ0VMTEVEO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUmVjb2duaXplZCB8fCBpc1ZhbGlkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfRU5ERUQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEoc3RhdGUgJiBTVEFURV9CRUdBTikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DSEFOR0VEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGFuXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBhbmQgbW92ZWQgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQYW5SZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBYID0gbnVsbDtcbiAgICB0aGlzLnBZID0gbnVsbDtcbn1cblxuaW5oZXJpdChQYW5SZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGFuUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGFuJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0FMTFxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1kpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH0sXG5cbiAgICBkaXJlY3Rpb25UZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIGhhc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gaW5wdXQuZGlzdGFuY2U7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5kaXJlY3Rpb247XG4gICAgICAgIHZhciB4ID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB2YXIgeSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICAvLyBsb2NrIHRvIGF4aXM/XG4gICAgICAgIGlmICghKGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeCA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh4IDwgMCkgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHggIT0gdGhpcy5wWDtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh5ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHkgPCAwKSA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geSAhPSB0aGlzLnBZO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBoYXNNb3ZlZCAmJiBkaXN0YW5jZSA+IG9wdGlvbnMudGhyZXNob2xkICYmIGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIEF0dHJSZWNvZ25pemVyLnByb3RvdHlwZS5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTiB8fCAoISh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pICYmIHRoaXMuZGlyZWN0aW9uVGVzdChpbnB1dCkpKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcblxuICAgICAgICB0aGlzLnBYID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB0aGlzLnBZID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQuZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQaW5jaFxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXJzIGFyZSBtb3ZpbmcgdG93YXJkICh6b29tLWluKSBvciBhd2F5IGZyb20gZWFjaCBvdGhlciAoem9vbS1vdXQpLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQaW5jaFJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChQaW5jaFJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BpbmNoJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQuc2NhbGUgLSAxKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICB2YXIgaW5PdXQgPSBpbnB1dC5zY2FsZSA8IDEgPyAnaW4nIDogJ291dCc7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBpbk91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFByZXNzXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBmb3IgeCBtcyB3aXRob3V0IGFueSBtb3ZlbWVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQcmVzc1JlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbn1cblxuaW5oZXJpdChQcmVzc1JlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFByZXNzUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncHJlc3MnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGltZTogMjUxLCAvLyBtaW5pbWFsIHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgcHJlc3NlZFxuICAgICAgICB0aHJlc2hvbGQ6IDkgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9BVVRPXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPiBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICghdmFsaWRNb3ZlbWVudCB8fCAhdmFsaWRQb2ludGVycyB8fCAoaW5wdXQuZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgIXZhbGlkVGltZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQgJiYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArICd1cCcsIGlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBSb3RhdGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVyIGFyZSBtb3ZpbmcgaW4gYSBjaXJjdWxhciBtb3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFJvdGF0ZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChSb3RhdGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUm90YXRlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncm90YXRlJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQucm90YXRpb24pID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFN3aXBlXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgbW92aW5nIGZhc3QgKHZlbG9jaXR5KSwgd2l0aCBlbm91Z2ggZGlzdGFuY2UgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBTd2lwZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTd2lwZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBTd2lwZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3N3aXBlJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgdmVsb2NpdHk6IDAuMyxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUGFuUmVjb2duaXplci5wcm90b3R5cGUuZ2V0VG91Y2hBY3Rpb24uY2FsbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgdmVsb2NpdHk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIChESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIGRpcmVjdGlvbiAmIGlucHV0Lm9mZnNldERpcmVjdGlvbiAmJlxuICAgICAgICAgICAgaW5wdXQuZGlzdGFuY2UgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkICYmXG4gICAgICAgICAgICBpbnB1dC5tYXhQb2ludGVycyA9PSB0aGlzLm9wdGlvbnMucG9pbnRlcnMgJiZcbiAgICAgICAgICAgIGFicyh2ZWxvY2l0eSkgPiB0aGlzLm9wdGlvbnMudmVsb2NpdHkgJiYgaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0Lm9mZnNldERpcmVjdGlvbik7XG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbiwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQSB0YXAgaXMgZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG9pbmcgYSBzbWFsbCB0YXAvY2xpY2suIE11bHRpcGxlIHRhcHMgYXJlIHJlY29nbml6ZWQgaWYgdGhleSBvY2N1clxuICogYmV0d2VlbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwgYW5kIHBvc2l0aW9uLiBUaGUgZGVsYXkgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJlY29nbml6ZSBtdWx0aS10YXBzIHdpdGhvdXQgZmlyaW5nXG4gKiBhIHNpbmdsZSB0YXAuXG4gKlxuICogVGhlIGV2ZW50RGF0YSBmcm9tIHRoZSBlbWl0dGVkIGV2ZW50IGNvbnRhaW5zIHRoZSBwcm9wZXJ0eSBgdGFwQ291bnRgLCB3aGljaCBjb250YWlucyB0aGUgYW1vdW50IG9mXG4gKiBtdWx0aS10YXBzIGJlaW5nIHJlY29nbml6ZWQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gVGFwUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBwcmV2aW91cyB0aW1lIGFuZCBjZW50ZXIsXG4gICAgLy8gdXNlZCBmb3IgdGFwIGNvdW50aW5nXG4gICAgdGhpcy5wVGltZSA9IGZhbHNlO1xuICAgIHRoaXMucENlbnRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbn1cblxuaW5oZXJpdChUYXBSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3RhcCcsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0YXBzOiAxLFxuICAgICAgICBpbnRlcnZhbDogMzAwLCAvLyBtYXggdGltZSBiZXR3ZWVuIHRoZSBtdWx0aS10YXAgdGFwc1xuICAgICAgICB0aW1lOiAyNTAsIC8vIG1heCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIGRvd24gKGxpa2UgZmluZ2VyIG9uIHRoZSBzY3JlZW4pXG4gICAgICAgIHRocmVzaG9sZDogOSwgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICAgICAgcG9zVGhyZXNob2xkOiAxMCAvLyBhIG11bHRpLXRhcCBjYW4gYmUgYSBiaXQgb2ZmIHRoZSBpbml0aWFsIHBvc2l0aW9uXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICBpZiAoKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSAmJiAodGhpcy5jb3VudCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICh2YWxpZE1vdmVtZW50ICYmIHZhbGlkVG91Y2hUaW1lICYmIHZhbGlkUG9pbnRlcnMpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZhbGlkSW50ZXJ2YWwgPSB0aGlzLnBUaW1lID8gKGlucHV0LnRpbWVTdGFtcCAtIHRoaXMucFRpbWUgPCBvcHRpb25zLmludGVydmFsKSA6IHRydWU7XG4gICAgICAgICAgICB2YXIgdmFsaWRNdWx0aVRhcCA9ICF0aGlzLnBDZW50ZXIgfHwgZ2V0RGlzdGFuY2UodGhpcy5wQ2VudGVyLCBpbnB1dC5jZW50ZXIpIDwgb3B0aW9ucy5wb3NUaHJlc2hvbGQ7XG5cbiAgICAgICAgICAgIHRoaXMucFRpbWUgPSBpbnB1dC50aW1lU3RhbXA7XG4gICAgICAgICAgICB0aGlzLnBDZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRNdWx0aVRhcCB8fCAhdmFsaWRJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRhcCBjb3VudCBtYXRjaGVzIHdlIGhhdmUgcmVjb2duaXplZCBpdCxcbiAgICAgICAgICAgIC8vIGVsc2UgaXQgaGFzIGJlZ2FuIHJlY29nbml6aW5nLi4uXG4gICAgICAgICAgICB2YXIgdGFwQ291bnQgPSB0aGlzLmNvdW50ICUgb3B0aW9ucy50YXBzO1xuICAgICAgICAgICAgaWYgKHRhcENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gZmFpbGluZyByZXF1aXJlbWVudHMsIGltbWVkaWF0ZWx5IHRyaWdnZXIgdGhlIHRhcCBldmVudFxuICAgICAgICAgICAgICAgIC8vIG9yIHdhaXQgYXMgbG9uZyBhcyB0aGUgbXVsdGl0YXAgaW50ZXJ2YWwgdG8gdHJpZ2dlclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNSZXF1aXJlRmFpbHVyZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgZmFpbFRpbWVvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGFwQ291bnQgPSB0aGlzLmNvdW50O1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBTaW1wbGUgd2F5IHRvIGNyZWF0ZSBhIG1hbmFnZXIgd2l0aCBhIGRlZmF1bHQgc2V0IG9mIHJlY29nbml6ZXJzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhhbW1lcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5yZWNvZ25pemVycyA9IGlmVW5kZWZpbmVkKG9wdGlvbnMucmVjb2duaXplcnMsIEhhbW1lci5kZWZhdWx0cy5wcmVzZXQpO1xuICAgIHJldHVybiBuZXcgTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBAY29uc3Qge3N0cmluZ31cbiAqL1xuSGFtbWVyLlZFUlNJT04gPSAnMi4wLjcnO1xuXG4vKipcbiAqIGRlZmF1bHQgc2V0dGluZ3NcbiAqIEBuYW1lc3BhY2VcbiAqL1xuSGFtbWVyLmRlZmF1bHRzID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBpZiBET00gZXZlbnRzIGFyZSBiZWluZyB0cmlnZ2VyZWQuXG4gICAgICogQnV0IHRoaXMgaXMgc2xvd2VyIGFuZCB1bnVzZWQgYnkgc2ltcGxlIGltcGxlbWVudGF0aW9ucywgc28gZGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGRvbUV2ZW50czogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eS9mYWxsYmFjay5cbiAgICAgKiBXaGVuIHNldCB0byBgY29tcHV0ZWAgaXQgd2lsbCBtYWdpY2FsbHkgc2V0IHRoZSBjb3JyZWN0IHZhbHVlIGJhc2VkIG9uIHRoZSBhZGRlZCByZWNvZ25pemVycy5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IGNvbXB1dGVcbiAgICAgKi9cbiAgICB0b3VjaEFjdGlvbjogVE9VQ0hfQUNUSU9OX0NPTVBVVEUsXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgZW5hYmxlOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogRVhQRVJJTUVOVEFMIEZFQVRVUkUgLS0gY2FuIGJlIHJlbW92ZWQvY2hhbmdlZFxuICAgICAqIENoYW5nZSB0aGUgcGFyZW50IGlucHV0IHRhcmdldCBlbGVtZW50LlxuICAgICAqIElmIE51bGwsIHRoZW4gaXQgaXMgYmVpbmcgc2V0IHRoZSB0byBtYWluIGVsZW1lbnQuXG4gICAgICogQHR5cGUge051bGx8RXZlbnRUYXJnZXR9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0VGFyZ2V0OiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogZm9yY2UgYW4gaW5wdXQgY2xhc3NcbiAgICAgKiBAdHlwZSB7TnVsbHxGdW5jdGlvbn1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRDbGFzczogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcmVjb2duaXplciBzZXR1cCB3aGVuIGNhbGxpbmcgYEhhbW1lcigpYFxuICAgICAqIFdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlciB0aGVzZSB3aWxsIGJlIHNraXBwZWQuXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHByZXNldDogW1xuICAgICAgICAvLyBSZWNvZ25pemVyQ2xhc3MsIG9wdGlvbnMsIFtyZWNvZ25pemVXaXRoLCAuLi5dLCBbcmVxdWlyZUZhaWx1cmUsIC4uLl1cbiAgICAgICAgW1JvdGF0ZVJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfV0sXG4gICAgICAgIFtQaW5jaFJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfSwgWydyb3RhdGUnXV0sXG4gICAgICAgIFtTd2lwZVJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfV0sXG4gICAgICAgIFtQYW5SZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH0sIFsnc3dpcGUnXV0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXIsIHtldmVudDogJ2RvdWJsZXRhcCcsIHRhcHM6IDJ9LCBbJ3RhcCddXSxcbiAgICAgICAgW1ByZXNzUmVjb2duaXplcl1cbiAgICBdLFxuXG4gICAgLyoqXG4gICAgICogU29tZSBDU1MgcHJvcGVydGllcyBjYW4gYmUgdXNlZCB0byBpbXByb3ZlIHRoZSB3b3JraW5nIG9mIEhhbW1lci5cbiAgICAgKiBBZGQgdGhlbSB0byB0aGlzIG1ldGhvZCBhbmQgdGhleSB3aWxsIGJlIHNldCB3aGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIuXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqL1xuICAgIGNzc1Byb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0ZXh0IHNlbGVjdGlvbiB0byBpbXByb3ZlIHRoZSBkcmFnZ2luZyBnZXN0dXJlLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIHRoZSBXaW5kb3dzIFBob25lIGdyaXBwZXJzIHdoZW4gcHJlc3NpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaFNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0aGUgZGVmYXVsdCBjYWxsb3V0IHNob3duIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0LlxuICAgICAgICAgKiBPbiBpT1MsIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0IHN1Y2ggYXMgYSBsaW5rLCBTYWZhcmkgZGlzcGxheXNcbiAgICAgICAgICogYSBjYWxsb3V0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxpbmsuIFRoaXMgcHJvcGVydHkgYWxsb3dzIHlvdSB0byBkaXNhYmxlIHRoYXQgY2FsbG91dC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaENhbGxvdXQ6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHdoZXRoZXIgem9vbWluZyBpcyBlbmFibGVkLiBVc2VkIGJ5IElFMTA+XG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGVudFpvb21pbmc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHRoYXQgYW4gZW50aXJlIGVsZW1lbnQgc2hvdWxkIGJlIGRyYWdnYWJsZSBpbnN0ZWFkIG9mIGl0cyBjb250ZW50cy4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJEcmFnOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE92ZXJyaWRlcyB0aGUgaGlnaGxpZ2h0IGNvbG9yIHNob3duIHdoZW4gdGhlIHVzZXIgdGFwcyBhIGxpbmsgb3IgYSBKYXZhU2NyaXB0XG4gICAgICAgICAqIGNsaWNrYWJsZSBlbGVtZW50IGluIGlPUy4gVGhpcyBwcm9wZXJ0eSBvYmV5cyB0aGUgYWxwaGEgdmFsdWUsIGlmIHNwZWNpZmllZC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ3JnYmEoMCwwLDAsMCknXG4gICAgICAgICAqL1xuICAgICAgICB0YXBIaWdobGlnaHRDb2xvcjogJ3JnYmEoMCwwLDAsMCknXG4gICAgfVxufTtcblxudmFyIFNUT1AgPSAxO1xudmFyIEZPUkNFRF9TVE9QID0gMjtcblxuLyoqXG4gKiBNYW5hZ2VyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCBIYW1tZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0ID0gdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0IHx8IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgdGhpcy5yZWNvZ25pemVycyA9IFtdO1xuICAgIHRoaXMub2xkQ3NzUHJvcHMgPSB7fTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pbnB1dCA9IGNyZWF0ZUlucHV0SW5zdGFuY2UodGhpcyk7XG4gICAgdGhpcy50b3VjaEFjdGlvbiA9IG5ldyBUb3VjaEFjdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuXG4gICAgdG9nZ2xlQ3NzUHJvcHModGhpcywgdHJ1ZSk7XG5cbiAgICBlYWNoKHRoaXMub3B0aW9ucy5yZWNvZ25pemVycywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgcmVjb2duaXplciA9IHRoaXMuYWRkKG5ldyAoaXRlbVswXSkoaXRlbVsxXSkpO1xuICAgICAgICBpdGVtWzJdICYmIHJlY29nbml6ZXIucmVjb2duaXplV2l0aChpdGVtWzJdKTtcbiAgICAgICAgaXRlbVszXSAmJiByZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKGl0ZW1bM10pO1xuICAgIH0sIHRoaXMpO1xufVxuXG5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIE9wdGlvbnMgdGhhdCBuZWVkIGEgbGl0dGxlIG1vcmUgc2V0dXBcbiAgICAgICAgaWYgKG9wdGlvbnMudG91Y2hBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW5wdXRUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vIENsZWFuIHVwIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVycyBhbmQgcmVpbml0aWFsaXplXG4gICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudGFyZ2V0ID0gb3B0aW9ucy5pbnB1dFRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBzdG9wIHJlY29nbml6aW5nIGZvciB0aGlzIHNlc3Npb24uXG4gICAgICogVGhpcyBzZXNzaW9uIHdpbGwgYmUgZGlzY2FyZGVkLCB3aGVuIGEgbmV3IFtpbnB1dF1zdGFydCBldmVudCBpcyBmaXJlZC5cbiAgICAgKiBXaGVuIGZvcmNlZCwgdGhlIHJlY29nbml6ZXIgY3ljbGUgaXMgc3RvcHBlZCBpbW1lZGlhdGVseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZV1cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbihmb3JjZSkge1xuICAgICAgICB0aGlzLnNlc3Npb24uc3RvcHBlZCA9IGZvcmNlID8gRk9SQ0VEX1NUT1AgOiBTVE9QO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBydW4gdGhlIHJlY29nbml6ZXJzIVxuICAgICAqIGNhbGxlZCBieSB0aGUgaW5wdXRIYW5kbGVyIGZ1bmN0aW9uIG9uIGV2ZXJ5IG1vdmVtZW50IG9mIHRoZSBwb2ludGVycyAodG91Y2hlcylcbiAgICAgKiBpdCB3YWxrcyB0aHJvdWdoIGFsbCB0aGUgcmVjb2duaXplcnMgYW5kIHRyaWVzIHRvIGRldGVjdCB0aGUgZ2VzdHVyZSB0aGF0IGlzIGJlaW5nIG1hZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLnNlc3Npb247XG4gICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJ1biB0aGUgdG91Y2gtYWN0aW9uIHBvbHlmaWxsXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24ucHJldmVudERlZmF1bHRzKGlucHV0RGF0YSk7XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXI7XG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG5cbiAgICAgICAgLy8gdGhpcyBob2xkcyB0aGUgcmVjb2duaXplciB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgIC8vIHNvIHRoZSByZWNvZ25pemVyJ3Mgc3RhdGUgbmVlZHMgdG8gYmUgQkVHQU4sIENIQU5HRUQsIEVOREVEIG9yIFJFQ09HTklaRURcbiAgICAgICAgLy8gaWYgbm8gcmVjb2duaXplciBpcyBkZXRlY3RpbmcgYSB0aGluZywgaXQgaXMgc2V0IHRvIGBudWxsYFxuICAgICAgICB2YXIgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplcjtcblxuICAgICAgICAvLyByZXNldCB3aGVuIHRoZSBsYXN0IHJlY29nbml6ZXIgaXMgcmVjb2duaXplZFxuICAgICAgICAvLyBvciB3aGVuIHdlJ3JlIGluIGEgbmV3IHNlc3Npb25cbiAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyIHx8IChjdXJSZWNvZ25pemVyICYmIGN1clJlY29nbml6ZXIuc3RhdGUgJiBTVEFURV9SRUNPR05JWkVEKSkge1xuICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgcmVjb2duaXplcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZWNvZ25pemVyID0gcmVjb2duaXplcnNbaV07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3V0IGlmIHdlIGFyZSBhbGxvd2VkIHRyeSB0byByZWNvZ25pemUgdGhlIGlucHV0IGZvciB0aGlzIG9uZS5cbiAgICAgICAgICAgIC8vIDEuICAgYWxsb3cgaWYgdGhlIHNlc3Npb24gaXMgTk9UIGZvcmNlZCBzdG9wcGVkIChzZWUgdGhlIC5zdG9wKCkgbWV0aG9kKVxuICAgICAgICAgICAgLy8gMi4gICBhbGxvdyBpZiB3ZSBzdGlsbCBoYXZlbid0IHJlY29nbml6ZWQgYSBnZXN0dXJlIGluIHRoaXMgc2Vzc2lvbiwgb3IgdGhlIHRoaXMgcmVjb2duaXplciBpcyB0aGUgb25lXG4gICAgICAgICAgICAvLyAgICAgIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgICAgIC8vIDMuICAgYWxsb3cgaWYgdGhlIHJlY29nbml6ZXIgaXMgYWxsb3dlZCB0byBydW4gc2ltdWx0YW5lb3VzIHdpdGggdGhlIGN1cnJlbnQgcmVjb2duaXplZCByZWNvZ25pemVyLlxuICAgICAgICAgICAgLy8gICAgICB0aGlzIGNhbiBiZSBzZXR1cCB3aXRoIHRoZSBgcmVjb2duaXplV2l0aCgpYCBtZXRob2Qgb24gdGhlIHJlY29nbml6ZXIuXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkICE9PSBGT1JDRURfU1RPUCAmJiAoIC8vIDFcbiAgICAgICAgICAgICAgICAgICAgIWN1clJlY29nbml6ZXIgfHwgcmVjb2duaXplciA9PSBjdXJSZWNvZ25pemVyIHx8IC8vIDJcbiAgICAgICAgICAgICAgICAgICAgcmVjb2duaXplci5jYW5SZWNvZ25pemVXaXRoKGN1clJlY29nbml6ZXIpKSkgeyAvLyAzXG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZWNvZ25pemUoaW5wdXREYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZXNldCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVjb2duaXplciBoYXMgYmVlbiByZWNvZ25pemluZyB0aGUgaW5wdXQgYXMgYSB2YWxpZCBnZXN0dXJlLCB3ZSB3YW50IHRvIHN0b3JlIHRoaXMgb25lIGFzIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBhY3RpdmUgcmVjb2duaXplci4gYnV0IG9ubHkgaWYgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGFuIGFjdGl2ZSByZWNvZ25pemVyXG4gICAgICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgJiYgcmVjb2duaXplci5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCkpIHtcbiAgICAgICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gcmVjb2duaXplcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXQgYSByZWNvZ25pemVyIGJ5IGl0cyBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxOdWxsfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAocmVjb2duaXplciBpbnN0YW5jZW9mIFJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWNvZ25pemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlY29nbml6ZXJzW2ldLm9wdGlvbnMuZXZlbnQgPT0gcmVjb2duaXplcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgcmVjb2duaXplciB0byB0aGUgbWFuYWdlclxuICAgICAqIGV4aXN0aW5nIHJlY29nbml6ZXJzIHdpdGggdGhlIHNhbWUgZXZlbnQgbmFtZSB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxNYW5hZ2VyfVxuICAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ2FkZCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBleGlzdGluZ1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLmdldChyZWNvZ25pemVyLm9wdGlvbnMuZXZlbnQpO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGV4aXN0aW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjb2duaXplcnMucHVzaChyZWNvZ25pemVyKTtcbiAgICAgICAgcmVjb2duaXplci5tYW5hZ2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGEgcmVjb2duaXplciBieSBuYW1lIG9yIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ3JlbW92ZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29nbml6ZXIgPSB0aGlzLmdldChyZWNvZ25pemVyKTtcblxuICAgICAgICAvLyBsZXQncyBtYWtlIHN1cmUgdGhpcyByZWNvZ25pemVyIGV4aXN0c1xuICAgICAgICBpZiAocmVjb2duaXplcikge1xuICAgICAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkocmVjb2duaXplcnMsIHJlY29nbml6ZXIpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSA9IGhhbmRsZXJzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCBldmVudCwgbGVhdmUgZW1pdCBibGFuayB0byByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXVxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvZmY6IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tldmVudF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSAmJiBoYW5kbGVyc1tldmVudF0uc3BsaWNlKGluQXJyYXkoaGFuZGxlcnNbZXZlbnRdLCBoYW5kbGVyKSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZW1pdCBldmVudCB0byB0aGUgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gdHJpZ2dlciBkb20gZXZlbnRzXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG9tRXZlbnRzKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gaGFuZGxlcnMsIHNvIHNraXAgaXQgYWxsXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdICYmIHRoaXMuaGFuZGxlcnNbZXZlbnRdLnNsaWNlKCk7XG4gICAgICAgIGlmICghaGFuZGxlcnMgfHwgIWhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS50eXBlID0gZXZlbnQ7XG4gICAgICAgIGRhdGEucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRhdGEuc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXShkYXRhKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXN0cm95IHRoZSBtYW5hZ2VyIGFuZCB1bmJpbmRzIGFsbCBldmVudHNcbiAgICAgKiBpdCBkb2Vzbid0IHVuYmluZCBkb20gZXZlbnRzLCB0aGF0IGlzIHRoZSB1c2VyIG93biByZXNwb25zaWJpbGl0eVxuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgJiYgdG9nZ2xlQ3NzUHJvcHModGhpcywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogYWRkL3JlbW92ZSB0aGUgY3NzIHByb3BlcnRpZXMgYXMgZGVmaW5lZCBpbiBtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtCb29sZWFufSBhZGRcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlQ3NzUHJvcHMobWFuYWdlciwgYWRkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKCFlbGVtZW50LnN0eWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3A7XG4gICAgZWFjaChtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHByb3AgPSBwcmVmaXhlZChlbGVtZW50LnN0eWxlLCBuYW1lKTtcbiAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSA9IGVsZW1lbnQuc3R5bGVbcHJvcF07XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSB8fCAnJztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghYWRkKSB7XG4gICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHMgPSB7fTtcbiAgICB9XG59XG5cbi8qKlxuICogdHJpZ2dlciBkb20gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqL1xuZnVuY3Rpb24gdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKSB7XG4gICAgdmFyIGdlc3R1cmVFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGdlc3R1cmVFdmVudC5pbml0RXZlbnQoZXZlbnQsIHRydWUsIHRydWUpO1xuICAgIGdlc3R1cmVFdmVudC5nZXN0dXJlID0gZGF0YTtcbiAgICBkYXRhLnRhcmdldC5kaXNwYXRjaEV2ZW50KGdlc3R1cmVFdmVudCk7XG59XG5cbmFzc2lnbihIYW1tZXIsIHtcbiAgICBJTlBVVF9TVEFSVDogSU5QVVRfU1RBUlQsXG4gICAgSU5QVVRfTU9WRTogSU5QVVRfTU9WRSxcbiAgICBJTlBVVF9FTkQ6IElOUFVUX0VORCxcbiAgICBJTlBVVF9DQU5DRUw6IElOUFVUX0NBTkNFTCxcblxuICAgIFNUQVRFX1BPU1NJQkxFOiBTVEFURV9QT1NTSUJMRSxcbiAgICBTVEFURV9CRUdBTjogU1RBVEVfQkVHQU4sXG4gICAgU1RBVEVfQ0hBTkdFRDogU1RBVEVfQ0hBTkdFRCxcbiAgICBTVEFURV9FTkRFRDogU1RBVEVfRU5ERUQsXG4gICAgU1RBVEVfUkVDT0dOSVpFRDogU1RBVEVfUkVDT0dOSVpFRCxcbiAgICBTVEFURV9DQU5DRUxMRUQ6IFNUQVRFX0NBTkNFTExFRCxcbiAgICBTVEFURV9GQUlMRUQ6IFNUQVRFX0ZBSUxFRCxcblxuICAgIERJUkVDVElPTl9OT05FOiBESVJFQ1RJT05fTk9ORSxcbiAgICBESVJFQ1RJT05fTEVGVDogRElSRUNUSU9OX0xFRlQsXG4gICAgRElSRUNUSU9OX1JJR0hUOiBESVJFQ1RJT05fUklHSFQsXG4gICAgRElSRUNUSU9OX1VQOiBESVJFQ1RJT05fVVAsXG4gICAgRElSRUNUSU9OX0RPV046IERJUkVDVElPTl9ET1dOLFxuICAgIERJUkVDVElPTl9IT1JJWk9OVEFMOiBESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICBESVJFQ1RJT05fVkVSVElDQUw6IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICBESVJFQ1RJT05fQUxMOiBESVJFQ1RJT05fQUxMLFxuXG4gICAgTWFuYWdlcjogTWFuYWdlcixcbiAgICBJbnB1dDogSW5wdXQsXG4gICAgVG91Y2hBY3Rpb246IFRvdWNoQWN0aW9uLFxuXG4gICAgVG91Y2hJbnB1dDogVG91Y2hJbnB1dCxcbiAgICBNb3VzZUlucHV0OiBNb3VzZUlucHV0LFxuICAgIFBvaW50ZXJFdmVudElucHV0OiBQb2ludGVyRXZlbnRJbnB1dCxcbiAgICBUb3VjaE1vdXNlSW5wdXQ6IFRvdWNoTW91c2VJbnB1dCxcbiAgICBTaW5nbGVUb3VjaElucHV0OiBTaW5nbGVUb3VjaElucHV0LFxuXG4gICAgUmVjb2duaXplcjogUmVjb2duaXplcixcbiAgICBBdHRyUmVjb2duaXplcjogQXR0clJlY29nbml6ZXIsXG4gICAgVGFwOiBUYXBSZWNvZ25pemVyLFxuICAgIFBhbjogUGFuUmVjb2duaXplcixcbiAgICBTd2lwZTogU3dpcGVSZWNvZ25pemVyLFxuICAgIFBpbmNoOiBQaW5jaFJlY29nbml6ZXIsXG4gICAgUm90YXRlOiBSb3RhdGVSZWNvZ25pemVyLFxuICAgIFByZXNzOiBQcmVzc1JlY29nbml6ZXIsXG5cbiAgICBvbjogYWRkRXZlbnRMaXN0ZW5lcnMsXG4gICAgb2ZmOiByZW1vdmVFdmVudExpc3RlbmVycyxcbiAgICBlYWNoOiBlYWNoLFxuICAgIG1lcmdlOiBtZXJnZSxcbiAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBpbmhlcml0OiBpbmhlcml0LFxuICAgIGJpbmRGbjogYmluZEZuLFxuICAgIHByZWZpeGVkOiBwcmVmaXhlZFxufSk7XG5cbi8vIHRoaXMgcHJldmVudHMgZXJyb3JzIHdoZW4gSGFtbWVyIGlzIGxvYWRlZCBpbiB0aGUgcHJlc2VuY2Ugb2YgYW4gQU1EXG4vLyAgc3R5bGUgbG9hZGVyIGJ1dCBieSBzY3JpcHQgdGFnLCBub3QgYnkgdGhlIGxvYWRlci5cbnZhciBmcmVlR2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB7fSkpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbmZyZWVHbG9iYWwuSGFtbWVyID0gSGFtbWVyO1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gSGFtbWVyO1xuICAgIH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBIYW1tZXI7XG59IGVsc2Uge1xuICAgIHdpbmRvd1tleHBvcnROYW1lXSA9IEhhbW1lcjtcbn1cblxufSkod2luZG93LCBkb2N1bWVudCwgJ0hhbW1lcicpO1xuIiwiLyoqXG4gKiBNaWNyb0V2ZW50IC0gdG8gbWFrZSBhbnkganMgb2JqZWN0IGFuIGV2ZW50IGVtaXR0ZXIgKHNlcnZlciBvciBicm93c2VyKVxuICogXG4gKiAtIHB1cmUgamF2YXNjcmlwdCAtIHNlcnZlciBjb21wYXRpYmxlLCBicm93c2VyIGNvbXBhdGlibGVcbiAqIC0gZG9udCByZWx5IG9uIHRoZSBicm93c2VyIGRvbXNcbiAqIC0gc3VwZXIgc2ltcGxlIC0geW91IGdldCBpdCBpbW1lZGlhdGx5LCBubyBtaXN0ZXJ5LCBubyBtYWdpYyBpbnZvbHZlZFxuICpcbiAqIC0gY3JlYXRlIGEgTWljcm9FdmVudERlYnVnIHdpdGggZ29vZGllcyB0byBkZWJ1Z1xuICogICAtIG1ha2UgaXQgc2FmZXIgdG8gdXNlXG4qL1xuXG52YXIgTWljcm9FdmVudFx0PSBmdW5jdGlvbigpe31cbk1pY3JvRXZlbnQucHJvdG90eXBlXHQ9IHtcblx0YmluZFx0OiBmdW5jdGlvbihldmVudCwgZmN0KXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF1cdHx8IFtdO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmY3QpO1xuXHR9LFxuXHR1bmJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XS5zcGxpY2UodGhpcy5fZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZjdCksIDEpO1xuXHR9LFxuXHR0cmlnZ2VyXHQ6IGZ1bmN0aW9uKGV2ZW50IC8qICwgYXJncy4uLiAqLyl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZXZlbnRzW2V2ZW50XVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBtaXhpbiB3aWxsIGRlbGVnYXRlIGFsbCBNaWNyb0V2ZW50LmpzIGZ1bmN0aW9uIGluIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAqXG4gKiAtIHJlcXVpcmUoJ01pY3JvRXZlbnQnKS5taXhpbihGb29iYXIpIHdpbGwgbWFrZSBGb29iYXIgYWJsZSB0byB1c2UgTWljcm9FdmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgc3VwcG9ydCBNaWNyb0V2ZW50XG4qL1xuTWljcm9FdmVudC5taXhpblx0PSBmdW5jdGlvbihkZXN0T2JqZWN0KXtcblx0dmFyIHByb3BzXHQ9IFsnYmluZCcsICd1bmJpbmQnLCAndHJpZ2dlciddO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICsrKXtcblx0XHRkZXN0T2JqZWN0LnByb3RvdHlwZVtwcm9wc1tpXV1cdD0gTWljcm9FdmVudC5wcm90b3R5cGVbcHJvcHNbaV1dO1xuXHR9XG59XG5cbi8vIGV4cG9ydCBpbiBjb21tb24ganNcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmICgnZXhwb3J0cycgaW4gbW9kdWxlKSl7XG5cdG1vZHVsZS5leHBvcnRzXHQ9IE1pY3JvRXZlbnRcbn1cbiJdfQ==
