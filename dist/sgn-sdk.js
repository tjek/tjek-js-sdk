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
    connection = new WebSocket(SGN.config.get('eventsPulseUrl'), 'json');
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
    this.trigger('event', e.data);
  };

  Pulse.prototype.onError = function() {};

  Pulse.prototype.onClose = function() {
    if (this.destroyed === false) {
      setTimeout((function(_this) {
        return function() {
          _this.connection = _this.connect();
        };
      })(this), 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY29mZmVlc2NyaXB0L2Jyb3dzZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb25maWcuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9jb3JlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2V5X2NvZGVzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9hc3NldHMvZmlsZV91cGxvYWQuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2Fzc2V0cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvYXV0aC9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvY29yZS9yZXF1ZXN0LmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9jb3JlL3Nlc3Npb24uY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2V2ZW50cy9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvZXZlbnRzL3B1bHNlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9ldmVudHMvdHJhY2tlci5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvZ3JhcGgvaW5kZXguY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL2dyYXBoL3JlcXVlc3QuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL2NvbnRyb2xzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9jb3JlLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9ldmVudF90cmFja2luZy5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vaG90c3BvdF9waWNrZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uL2hvdHNwb3RzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9pbmRleC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vbGVnYWN5X2V2ZW50X3RyYWNraW5nLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi9wYWdlX3NwcmVhZC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vcGFnZV9zcHJlYWRzLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi90ZW1wbGF0ZXMvaG90c3BvdC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L2tpdHMvcGFnZWRfcHVibGljYXRpb24vdGVtcGxhdGVzL2hvdHNwb3RfcGlja2VyLmNvZmZlZSIsImxpYi9jb2ZmZWVzY3JpcHQva2l0cy9wYWdlZF9wdWJsaWNhdGlvbi92aWV3ZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9yZXF1ZXN0L2Jyb3dzZXIuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zZ24uY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zdG9yYWdlL2NsaWVudF9jb29raWUuY29mZmVlIiwibGliL2NvZmZlZXNjcmlwdC9zdG9yYWdlL2NsaWVudF9sb2NhbC5jb2ZmZWUiLCJsaWIvY29mZmVlc2NyaXB0L3V0aWwuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29udmVydC1oZXgvY29udmVydC1oZXguanMiLCJub2RlX21vZHVsZXMvY29udmVydC1zdHJpbmcvY29udmVydC1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvZ2F0b3IvZ2F0b3IuanMiLCJub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9taWNyb2V2ZW50L21pY3JvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvbXVzdGFjaGUvbXVzdGFjaGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3NoYTI1Ni9saWIvc2hhMjU2LmpzIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3QvbGliL2NvZmZlZXNjcmlwdC9hbmltYXRpb24uY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L2xpYi9jb2ZmZWVzY3JpcHQvcGFnZV9zcHJlYWQuY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L2xpYi9jb2ZmZWVzY3JpcHQvdmVyc28uY29mZmVlIiwibm9kZV9tb2R1bGVzL3ZlcnNvLWJyb3dzZXIvZGlzdC9ub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy9oYW1tZXJqcy9oYW1tZXIuanMiLCJub2RlX21vZHVsZXMvdmVyc28tYnJvd3Nlci9kaXN0L25vZGVfbW9kdWxlcy92ZXJzby1icm93c2VyL2Rpc3Qvbm9kZV9tb2R1bGVzL21pY3JvZXZlbnQvbWljcm9ldmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUE7O0FBQUEsSUFBMkIsT0FBTyxPQUFQLEtBQWtCLFdBQTdDO0VBQUEsT0FBQSxHQUFVO0lBQUEsT0FBQSxFQUFTLElB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Rko7SUF0Qk0sQ0FBVjtHQTlLSjs7O0FBME1KLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7Ozs7QUMzTWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdG5CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDekpBO0FDQUEsSUFBQTs7QUFBQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtFQUNOLG1CQUFDLEVBQUQ7SUFBQyxJQUFDLENBQUEsS0FBRDtJQUNWLElBQUMsQ0FBQSxHQUFELEdBQU87QUFFUDtFQUhTOztzQkFLYixPQUFBLEdBQVMsU0FBQyxPQUFELEVBQWUsUUFBZjtBQUNMLFFBQUE7O01BRE0s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Q0FBQyxLQUFYLENBQWlCLEtBQWpCOztBQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDemdCakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmxGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBNYWtlIHN1cmUgd2UgZGVmaW5lIHdlJ3JlIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC5cbnByb2Nlc3MgPSBicm93c2VyOiB0cnVlIGlmIHR5cGVvZiBwcm9jZXNzIGlzICd1bmRlZmluZWQnXG5cblNHTiA9IHJlcXVpcmUgJy4vc2duJ1xuXG4jIEV4cG9zZSBzdG9yYWdlIGJhY2tlbmRzLlxuU0dOLnN0b3JhZ2UgPVxuICAgIGxvY2FsOiByZXF1aXJlICcuL3N0b3JhZ2UvY2xpZW50X2xvY2FsJ1xuICAgIGNvb2tpZTogcmVxdWlyZSAnLi9zdG9yYWdlL2NsaWVudF9jb29raWUnXG5cbiMgRXhwb3NlIHJlcXVlc3QgaGFuZGxlci5cblNHTi5yZXF1ZXN0ID0gcmVxdWlyZSAnLi9yZXF1ZXN0L2Jyb3dzZXInXG5cbiMgRXhwb3NlIHRoZSBkaWZmZXJlbnQga2l0cy5cblNHTi5BdXRoS2l0ID0gcmVxdWlyZSAnLi9raXRzL2F1dGgnXG5TR04uQXNzZXRzS2l0ID0gcmVxdWlyZSAnLi9raXRzL2Fzc2V0cydcblNHTi5FdmVudHNLaXQgPSByZXF1aXJlICcuL2tpdHMvZXZlbnRzJ1xuU0dOLkdyYXBoS2l0ID0gcmVxdWlyZSAnLi9raXRzL2dyYXBoJ1xuU0dOLkNvcmVLaXQgPSByZXF1aXJlICcuL2tpdHMvY29yZSdcblNHTi5QYWdlZFB1YmxpY2F0aW9uS2l0ID0gcmVxdWlyZSAnLi9raXRzL3BhZ2VkX3B1YmxpY2F0aW9uJ1xuXG4jIFNldCB0aGUgY29yZSBzZXNzaW9uIGZyb20gdGhlIGNvb2tpZSBzdG9yZSBpZiBwb3NzaWJsZS5cbnNlc3Npb24gPSBTR04uc3RvcmFnZS5jb29raWUuZ2V0ICdzZXNzaW9uJ1xuXG5pZiB0eXBlb2Ygc2Vzc2lvbiBpcyAnb2JqZWN0J1xuICAgIFNHTi5jb25maWcuc2V0XG4gICAgICAgIGNvcmVTZXNzaW9uVG9rZW46IHNlc3Npb24udG9rZW5cbiAgICAgICAgY29yZVNlc3Npb25DbGllbnRJZDogc2Vzc2lvbi5jbGllbnRfaWRcblxuU0dOLmNsaWVudCA9IGRvIC0+XG4gICAgaWQgPSBTR04uc3RvcmFnZS5sb2NhbC5nZXQgJ2NsaWVudC1pZCdcbiAgICBmaXJzdE9wZW4gPSBub3QgaWQ/XG5cbiAgICBpZiBmaXJzdE9wZW5cbiAgICAgICAgaWQgPSBTR04udXRpbC51dWlkKClcbiAgICAgICAgXG4gICAgICAgIFNHTi5zdG9yYWdlLmxvY2FsLnNldCAnY2xpZW50LWlkJywgaWRcblxuICAgIGZpcnN0T3BlbjogZmlyc3RPcGVuXG4gICAgaWQ6IGlkXG5cbiMgT3B0aW9uYWwgc3RhcnQgZnVuY3Rpb24gdG8gaW52b2tlIHNlc3Npb24gdHJhY2tpbmcuXG5TR04uc3RhcnRTZXNzaW9uID0gLT5cbiAgICAjIEVtaXQgc2Vzc2lvbiBldmVudHMgaWYgYSB0cmFja2VyIGlzIGF2YWlsYWJsZS5cbiAgICBldmVudFRyYWNrZXIgPSBTR04uY29uZmlnLmdldCAnZXZlbnRUcmFja2VyJ1xuXG4gICAgaWYgZXZlbnRUcmFja2VyP1xuICAgICAgICBldmVudFRyYWNrZXIudHJhY2tFdmVudCAnZmlyc3QtY2xpZW50LXNlc3Npb24tb3BlbmVkJywge30sICcxLjAuMCcgaWYgU0dOLmNsaWVudC5maXJzdE9wZW4gaXMgdHJ1ZVxuICAgICAgICBldmVudFRyYWNrZXIudHJhY2tFdmVudCAnY2xpZW50LXNlc3Npb24tb3BlbmVkJywge30sICcxLjAuMCdcblxuICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNHTlxuIiwiYXR0cnMgPSB7fVxua2V5cyA9IFtcbiAgICAnYXBwVmVyc2lvbicsXG4gICAgJ2FwcEtleScsXG4gICAgJ2FwcFNlY3JldCcsXG4gICAgJ2F1dGhUb2tlbicsXG4gICAgJ2V2ZW50VHJhY2tlcicsXG4gICAgJ2xvY2FsZScsXG4gICAgJ2NvcmVTZXNzaW9uVG9rZW4nLFxuICAgICdjb3JlU2Vzc2lvbkNsaWVudElkJyxcbiAgICAnY29yZVVybCcsXG4gICAgJ2dyYXBoVXJsJyxcbiAgICAnZXZlbnRzVHJhY2tVcmwnLFxuICAgICdldmVudHNQdWxzZVVybCcsXG4gICAgJ2Fzc2V0c0ZpbGVVcGxvYWRVcmwnXG5dXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgICBzZXQ6IChjb25maWcgPSB7fSkgLT5cbiAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgY29uZmlnXG4gICAgICAgICAgICBhdHRyc1trZXldID0gdmFsdWUgaWYga2V5IGluIGtleXNcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldDogKG9wdGlvbikgLT5cbiAgICAgICAgYXR0cnNbb3B0aW9uXVxuIiwiY29uZmlnID0gcmVxdWlyZSAnLi9jb25maWcnXG51dGlsID0gcmVxdWlyZSAnLi91dGlsJ1xuXG4jIFNldCBkZWZhdWx0IHZhbHVlcy5cbmNvbmZpZy5zZXRcbiAgICBsb2NhbGU6ICdlbl9VUydcbiAgICBjb3JlVXJsOiAnaHR0cHM6Ly9hcGkuZXRpbGJ1ZHNhdmlzLmRrJ1xuICAgIGdyYXBoVXJsOiAnaHR0cHM6Ly9ncmFwaC5zZXJ2aWNlLnNob3BndW4uY29tJ1xuICAgIGV2ZW50c1RyYWNrVXJsOiAnaHR0cHM6Ly9ldmVudHMuc2VydmljZS5zaG9wZ3VuLmNvbS90cmFjaydcbiAgICBldmVudHNQdWxzZVVybDogJ3dzczovL2V2ZW50cy5zZXJ2aWNlLnNob3BndW4uY29tL3B1bHNlJ1xuICAgIGFzc2V0c0ZpbGVVcGxvYWRVcmw6ICdodHRwczovL2Fzc2V0cy5zZXJ2aWNlLnNob3BndW4uY29tL3VwbG9hZCdcblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIGNvbmZpZzogY29uZmlnXG5cbiAgICB1dGlsOiB1dGlsXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgRVNDOiAyN1xuICAgIEFSUk9XX1JJR0hUOiAzOVxuICAgIEFSUk9XX0xFRlQ6IDM3XG4gICAgU1BBQ0U6IDMyXG4gICAgTlVNQkVSX09ORTogNDlcbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucyA9IHt9LCBjYWxsYmFjaywgcHJvZ3Jlc3NDYWxsYmFjaykgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgaXMgbm90IGRlZmluZWQnKSBpZiBub3Qgb3B0aW9ucy5maWxlP1xuXG4gICAgdXJsID0gU0dOLmNvbmZpZy5nZXQgJ2Fzc2V0c0ZpbGVVcGxvYWRVcmwnXG4gICAgZm9ybURhdGEgPSBmaWxlOiBvcHRpb25zLmZpbGVcbiAgICB0aW1lb3V0ID0gMTAwMCAqIDYwICogNjBcblxuICAgIFNHTi5yZXF1ZXN0XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnXG4gICAgICAgIHVybDogdXJsXG4gICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YVxuICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XG4gICAgICAgIGhlYWRlcnM6XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ1JlcXVlc3QgZXJyb3InKSxcbiAgICAgICAgICAgICAgICBjb2RlOiAnUmVxdWVzdEVycm9yJ1xuICAgICAgICAgICAgKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiBkYXRhLnN0YXR1c0NvZGUgaXMgMjAwXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgbnVsbCwgSlNPTi5wYXJzZShkYXRhLmJvZHkpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdSZXF1ZXN0IGVycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6ICdSZXF1ZXN0RXJyb3InXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGRhdGEuc3RhdHVzQ29kZVxuICAgICAgICAgICAgICAgIClcblxuICAgICAgICByZXR1cm5cbiAgICAsIChsb2FkZWQsIHRvdGFsKSAtPlxuICAgICAgICBpZiB0eXBlb2YgcHJvZ3Jlc3NDYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgICBwcm9ncmVzc0NhbGxiYWNrXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IGxvYWRlZCAvIHRvdGFsXG4gICAgICAgICAgICAgICAgbG9hZGVkOiBsb2FkZWRcbiAgICAgICAgICAgICAgICB0b3RhbDogdG90YWxcblxuICAgICAgICByZXR1cm5cblxuICAgIHJldHVyblxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIGZpbGVVcGxvYWQ6IHJlcXVpcmUgJy4vZmlsZV91cGxvYWQnXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9XG4iLCJTR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5yZXF1ZXN0ID0gcmVxdWlyZSAnLi9yZXF1ZXN0J1xuc2Vzc2lvbiA9IHJlcXVpcmUgJy4vc2Vzc2lvbidcblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIHJlcXVlc3Q6IHJlcXVlc3RcblxuICAgIHNlc3Npb246IHNlc3Npb25cbiIsIlNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucyA9IHt9LCBjYWxsYmFjayA9IC0+KSAtPlxuICAgIFNHTi5Db3JlS2l0LnNlc3Npb24uZW5zdXJlIChlcnIpIC0+XG4gICAgICAgIHJldHVybiBjYWxsYmFjayBlcnIgaWYgZXJyP1xuXG4gICAgICAgIHVybCA9IG9wdGlvbnMudXJsID8gJydcbiAgICAgICAgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyA/IHt9XG4gICAgICAgIHRva2VuID0gU0dOLmNvbmZpZy5nZXQgJ2NvcmVTZXNzaW9uVG9rZW4nXG4gICAgICAgIGNsaWVudElkID0gU0dOLmNvbmZpZy5nZXQgJ2NvcmVTZXNzaW9uQ2xpZW50SWQnXG4gICAgICAgIGFwcFZlcnNpb24gPSBTR04uY29uZmlnLmdldCAnYXBwVmVyc2lvbidcbiAgICAgICAgYXBwU2VjcmV0ID0gU0dOLmNvbmZpZy5nZXQgJ2FwcFNlY3JldCdcbiAgICAgICAgbG9jYWxlID0gU0dOLmNvbmZpZy5nZXQgJ2xvY2FsZSdcbiAgICAgICAgcXMgPSBvcHRpb25zLnFzID8ge31cbiAgICAgICAgZ2VvID0gb3B0aW9ucy5nZW9sb2NhdGlvblxuXG4gICAgICAgIGhlYWRlcnNbJ1gtVG9rZW4nXSA9IHRva2VuXG4gICAgICAgIGhlYWRlcnNbJ1gtU2lnbmF0dXJlJ10gPSBTR04uQ29yZUtpdC5zZXNzaW9uLnNpZ24gYXBwU2VjcmV0LCB0b2tlbiBpZiBhcHBTZWNyZXQ/XG5cbiAgICAgICAgcXMucl9sb2NhbGUgPSBsb2NhbGUgaWYgbG9jYWxlP1xuICAgICAgICBxcy5hcGlfYXYgPSBhcHBWZXJzaW9uIGlmIGFwcFZlcnNpb24/XG4gICAgICAgIHFzLmNsaWVudF9pZCA9IGNsaWVudElkIGlmIGNsaWVudElkP1xuXG4gICAgICAgIGlmIGdlbz9cbiAgICAgICAgICAgIHFzLnJfbGF0ID0gZ2VvLmxhdGl0dWRlIGlmIGdlby5sYXRpdHVkZT8gYW5kIG5vdCBxcy5yX2xhdD9cbiAgICAgICAgICAgIHFzLnJfbG5nID0gZ2VvLmxvbmdpdHVkZSBpZiBnZW8ubG9uZ2l0dWRlPyBhbmQgbm90IHFzLnJfbG5nP1xuICAgICAgICAgICAgcXMucl9yYWRpdXMgPSBnZW8ucmFkaXVzIGlmIGdlby5yYWRpdXM/IGFuZCBub3QgcXMucl9yYWRpdXM/XG4gICAgICAgICAgICBxcy5yX3NlbnNvciA9IGdlby5zZW5zb3IgaWYgZ2VvLnNlbnNvcj8gYW5kIG5vdCBxcy5yX3NlbnNvcj9cblxuICAgICAgICBTR04ucmVxdWVzdFxuICAgICAgICAgICAgbWV0aG9kOiBvcHRpb25zLm1ldGhvZFxuICAgICAgICAgICAgdXJsOiBTR04uY29uZmlnLmdldCgnY29yZVVybCcpICsgdXJsXG4gICAgICAgICAgICBxczogcXNcbiAgICAgICAgICAgIGJvZHk6IG9wdGlvbnMuYm9keVxuICAgICAgICAgICAgZm9ybURhdGE6IG9wdGlvbnMuZm9ybURhdGFcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIGpzb246IHRydWVcbiAgICAgICAgICAgIHVzZUNvb2tpZXM6IGZhbHNlXG4gICAgICAgICwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgICAgIGlmIGVycj9cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0NvcmUgcmVxdWVzdCBlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBjb2RlOiAnQ29yZVJlcXVlc3RFcnJvcidcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBTR04uY29uZmlnLmdldCAnY29yZVNlc3Npb25Ub2tlbidcbiAgICAgICAgICAgICAgICByZXNwb25zZVRva2VuID0gZGF0YS5oZWFkZXJzWyd4LXRva2VuJ11cblxuICAgICAgICAgICAgICAgIFNHTi5Db3JlS2l0LnNlc3Npb24uc2F2ZVRva2VuIHJlc3BvbnNlVG9rZW4gaWYgdG9rZW4gaXNudCByZXNwb25zZVRva2VuXG5cbiAgICAgICAgICAgICAgICBpZiBkYXRhLnN0YXR1c0NvZGUgPj0gMjAwIGFuZCBkYXRhLnN0YXR1c0NvZGUgPCAzMDAgb3IgZGF0YS5zdGF0dXNDb2RlIGlzIDMwNFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBudWxsLCBkYXRhLmJvZHlcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignQ29yZSBBUEkgZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6ICdDb3JlQVBJRXJyb3InXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBkYXRhLnN0YXR1c0NvZGVcbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgIHJldHVyblxuIiwiU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xuc2hhMjU2ID0gcmVxdWlyZSAnc2hhMjU2J1xuY2xpZW50Q29va2llU3RvcmFnZSA9IHJlcXVpcmUgJy4uLy4uL3N0b3JhZ2UvY2xpZW50X2Nvb2tpZSdcbmNhbGxiYWNrUXVldWUgPSBbXVxuXG5zZXNzaW9uID1cbiAgICB0dGw6IDEgKiA2MCAqIDYwICogMjQgKiA2MFxuXG4gICAgc2F2ZVRva2VuOiAodG9rZW4pIC0+XG4gICAgICAgIFNHTi5jb25maWcuc2V0IGNvcmVTZXNzaW9uVG9rZW46IHRva2VuXG5cbiAgICAgICAgc2Vzc2lvbi5zYXZlQ29va2llKClcblxuICAgICAgICByZXR1cm5cblxuICAgIHNhdmVDbGllbnRJZDogKGNsaWVudElkKSAtPlxuICAgICAgICBTR04uY29uZmlnLnNldCBjb3JlU2Vzc2lvbkNsaWVudElkOiBjbGllbnRJZFxuXG4gICAgICAgIHNlc3Npb24uc2F2ZUNvb2tpZSgpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzYXZlQ29va2llOiAtPlxuICAgICAgICBjbGllbnRDb29raWVTdG9yYWdlLnNldCAnc2Vzc2lvbicsXG4gICAgICAgICAgICB0b2tlbjogU0dOLmNvbmZpZy5nZXQgJ2NvcmVTZXNzaW9uVG9rZW4nXG4gICAgICAgICAgICBjbGllbnRfaWQ6IFNHTi5jb25maWcuZ2V0ICdjb3JlU2Vzc2lvbkNsaWVudElkJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgY3JlYXRlOiAoY2FsbGJhY2spIC0+XG4gICAgICAgIFNHTi5yZXF1ZXN0XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0J1xuICAgICAgICAgICAgdXJsOiBTR04uY29uZmlnLmdldCgnY29yZVVybCcpICsgJy92Mi9zZXNzaW9ucydcbiAgICAgICAgICAgIGpzb246IHRydWVcbiAgICAgICAgICAgIHFzOlxuICAgICAgICAgICAgICAgIGFwaV9rZXk6IFNHTi5jb25maWcuZ2V0ICdhcHBLZXknXG4gICAgICAgICAgICAgICAgdG9rZW5fdHRsOiBzZXNzaW9uLnR0bFxuICAgICAgICAsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICBpZiBlcnI/XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgZXJyXG4gICAgICAgICAgICBlbHNlIGlmIGRhdGEuc3RhdHVzQ29kZSBpcyAyMDFcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNhdmVUb2tlbiBkYXRhLmJvZHkudG9rZW5cbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNhdmVDbGllbnRJZCBkYXRhLmJvZHkuY2xpZW50X2lkXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBlcnIsIGRhdGEuYm9keVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIG5ldyBFcnJvcignQ291bGQgbm90IGNyZWF0ZSBzZXNzaW9uJylcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG4gICAgXG4gICAgdXBkYXRlOiAoY2FsbGJhY2spIC0+XG4gICAgICAgIGhlYWRlcnMgPSB7fVxuICAgICAgICB0b2tlbiA9IFNHTi5jb25maWcuZ2V0ICdjb3JlU2Vzc2lvblRva2VuJ1xuICAgICAgICBhcHBTZWNyZXQgPSBTR04uY29uZmlnLmdldCAnYXBwU2VjcmV0J1xuXG4gICAgICAgIGhlYWRlcnNbJ1gtVG9rZW4nXSA9IHRva2VuXG4gICAgICAgIGhlYWRlcnNbJ1gtU2lnbmF0dXJlJ10gPSBzZXNzaW9uLnNpZ24gYXBwU2VjcmV0LCB0b2tlbiBpZiBhcHBTZWNyZXQ/XG5cbiAgICAgICAgU0dOLnJlcXVlc3RcbiAgICAgICAgICAgIHVybDogU0dOLmNvbmZpZy5nZXQoJ2NvcmVVcmwnKSArICcvdjIvc2Vzc2lvbnMnXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICBqc29uOiB0cnVlXG4gICAgICAgICwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgICAgIGlmIGVycj9cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBlcnJcbiAgICAgICAgICAgIGVsc2UgaWYgZGF0YS5zdGF0dXNDb2RlIGlzIDIwMFxuICAgICAgICAgICAgICAgIHNlc3Npb24uc2F2ZVRva2VuIGRhdGEuYm9keS50b2tlblxuICAgICAgICAgICAgICAgIHNlc3Npb24uc2F2ZUNsaWVudElkIGRhdGEuYm9keS5jbGllbnRfaWRcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyciwgZGF0YS5ib2R5XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKCdDb3VsZCBub3QgdXBkYXRlIHNlc3Npb24nKVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIHJlbmV3OiAoY2FsbGJhY2spIC0+XG4gICAgICAgIGhlYWRlcnMgPSB7fVxuICAgICAgICB0b2tlbiA9IFNHTi5jb25maWcuZ2V0ICdjb3JlU2Vzc2lvblRva2VuJ1xuICAgICAgICBhcHBTZWNyZXQgPSBTR04uY29uZmlnLmdldCAnYXBwU2VjcmV0J1xuXG4gICAgICAgIGhlYWRlcnNbJ1gtVG9rZW4nXSA9IHRva2VuXG4gICAgICAgIGhlYWRlcnNbJ1gtU2lnbmF0dXJlJ10gPSBzZXNzaW9uLnNpZ24gYXBwU2VjcmV0LCB0b2tlbiBpZiBhcHBTZWNyZXQ/XG5cbiAgICAgICAgU0dOLnJlcXVlc3RcbiAgICAgICAgICAgIG1ldGhvZDogJ3B1dCdcbiAgICAgICAgICAgIHVybDogU0dOLmNvbmZpZy5nZXQoJ2NvcmVVcmwnKSArICcvdjIvc2Vzc2lvbnMnXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgICAgICBqc29uOiB0cnVlXG4gICAgICAgICwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgICAgIGlmIGVycj9cbiAgICAgICAgICAgICAgICBjYWxsYmFjayBlcnJcbiAgICAgICAgICAgIGVsc2UgaWYgZGF0YS5zdGF0dXNDb2RlIGlzIDIwMFxuICAgICAgICAgICAgICAgIHNlc3Npb24uc2F2ZVRva2VuIGRhdGEuYm9keS50b2tlblxuICAgICAgICAgICAgICAgIHNlc3Npb24uc2F2ZUNsaWVudElkIGRhdGEuYm9keS5jbGllbnRfaWRcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIGVyciwgZGF0YS5ib2R5XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKCdDb3VsZCBub3QgcmVuZXcgc2Vzc2lvbicpXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZW5zdXJlOiAoY2FsbGJhY2spIC0+XG4gICAgICAgIHF1ZXVlQ291bnQgPSBjYWxsYmFja1F1ZXVlLmxlbmd0aFxuICAgICAgICBjb21wbGV0ZSA9IChlcnIpIC0+XG4gICAgICAgICAgICBjYWxsYmFja1F1ZXVlID0gY2FsbGJhY2tRdWV1ZS5maWx0ZXIgKGZuKSAtPlxuICAgICAgICAgICAgICAgIGZuIGVyclxuXG4gICAgICAgICAgICAgICAgZmFsc2VcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgY2FsbGJhY2tRdWV1ZS5wdXNoIGNhbGxiYWNrXG5cbiAgICAgICAgaWYgcXVldWVDb3VudCBpcyAwXG4gICAgICAgICAgICBpZiBub3QgU0dOLmNvbmZpZy5nZXQoJ2NvcmVTZXNzaW9uVG9rZW4nKT9cbiAgICAgICAgICAgICAgICBzZXNzaW9uLmNyZWF0ZSBjb21wbGV0ZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKClcblxuICAgICAgICByZXR1cm5cblxuICAgIHNpZ246IChhcHBTZWNyZXQsIHRva2VuKSAtPlxuICAgICAgICBzaGEyNTYgW2FwcFNlY3JldCwgdG9rZW5dLmpvaW4oJycpXG5cbm1vZHVsZS5leHBvcnRzID0gc2Vzc2lvblxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIFRyYWNrZXI6IHJlcXVpcmUgJy4vdHJhY2tlcidcblxuICAgIFB1bHNlOiByZXF1aXJlICcuL3B1bHNlJ1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5cbmNsYXNzIFB1bHNlXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBkZXN0cm95ZWQgPSBmYWxzZVxuICAgICAgICBAY29ubmVjdGlvbiA9IEBjb25uZWN0KClcblxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBkZXN0cm95ZWQgPSB0cnVlXG5cbiAgICAgICAgQGNvbm5lY3Rpb24uY2xvc2UoKVxuXG4gICAgICAgIEBcblxuICAgIGNvbm5lY3Q6IC0+XG4gICAgICAgIGNvbm5lY3Rpb24gPSBuZXcgV2ViU29ja2V0IFNHTi5jb25maWcuZ2V0KCdldmVudHNQdWxzZVVybCcpLCAnanNvbidcblxuICAgICAgICBjb25uZWN0aW9uLm9ub3BlbiA9IEBvbk9wZW4uYmluZCBAXG4gICAgICAgIGNvbm5lY3Rpb24ub25tZXNzYWdlID0gQG9uTWVzc2FnZS5iaW5kIEBcbiAgICAgICAgY29ubmVjdGlvbi5vbmVycm9yID0gQG9uRXJyb3IuYmluZCBAXG4gICAgICAgIGNvbm5lY3Rpb24ub25jbG9zZSA9IEBvbkNsb3NlLmJpbmQgQFxuXG4gICAgICAgIGNvbm5lY3Rpb25cblxuICAgIG9uT3BlbjogLT5cbiAgICAgICAgQHRyaWdnZXIgJ29wZW4nXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBvbk1lc3NhZ2U6IChlKSAtPlxuICAgICAgICBAdHJpZ2dlciAnZXZlbnQnLCBlLmRhdGFcblxuICAgICAgICByZXR1cm5cblxuICAgIG9uRXJyb3I6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgb25DbG9zZTogLT5cbiAgICAgICAgaWYgQGRlc3Ryb3llZCBpcyBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICAgIEBjb25uZWN0aW9uID0gQGNvbm5lY3QoKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAsIDEwMDBcblxuICAgICAgICByZXR1cm5cblxuTWljcm9FdmVudC5taXhpbiBQdWxzZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFB1bHNlXG4iLCJTR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5jbGllbnRMb2NhbFN0b3JhZ2UgPSByZXF1aXJlICcuLi8uLi9zdG9yYWdlL2NsaWVudF9sb2NhbCdcbmdldFBvb2wgPSAtPlxuICAgIGRhdGEgPSBjbGllbnRMb2NhbFN0b3JhZ2UuZ2V0ICdldmVudC10cmFja2VyLXBvb2wnXG4gICAgZGF0YSA9IFtdIGlmIEFycmF5LmlzQXJyYXkoZGF0YSkgaXMgZmFsc2VcblxuICAgIGRhdGFcbnBvb2wgPSBnZXRQb29sKClcblxuY2xpZW50TG9jYWxTdG9yYWdlLnNldCAnZXZlbnQtdHJhY2tlci1wb29sJywgW11cblxudHJ5XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3VubG9hZCcsIC0+XG4gICAgICAgIHBvb2wgPSBwb29sLmNvbmNhdCBnZXRQb29sKClcblxuICAgICAgICBjbGllbnRMb2NhbFN0b3JhZ2Uuc2V0ICdldmVudC10cmFja2VyLXBvb2wnLCBwb29sXG5cbiAgICAgICAgcmV0dXJuXG4gICAgLCBmYWxzZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFRyYWNrZXJcbiAgICBkZWZhdWx0T3B0aW9uczpcbiAgICAgICAgdHJhY2tJZDogbnVsbFxuICAgICAgICBkaXNwYXRjaEludGVydmFsOiAzMDAwXG4gICAgICAgIGRpc3BhdGNoTGltaXQ6IDEwMFxuICAgICAgICBwb29sTGltaXQ6IDEwMDBcbiAgICAgICAgZHJ5UnVuOiBmYWxzZVxuXG4gICAgY29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG4gICAgICAgIGZvciBrZXksIHZhbHVlIG9mIEBkZWZhdWx0T3B0aW9uc1xuICAgICAgICAgICAgQFtrZXldID0gb3B0aW9uc1trZXldIG9yIHZhbHVlXG5cbiAgICAgICAgQGRpc3BhdGNoaW5nID0gZmFsc2VcbiAgICAgICAgQHNlc3Npb24gPVxuICAgICAgICAgICAgaWQ6IFNHTi51dGlsLnV1aWQoKVxuICAgICAgICBAY2xpZW50ID1cbiAgICAgICAgICAgIHRyYWNrSWQ6IEB0cmFja0lkXG4gICAgICAgICAgICBpZDogU0dOLmNsaWVudC5pZFxuICAgICAgICBAdmlldyA9XG4gICAgICAgICAgICBwYXRoOiBbXVxuICAgICAgICAgICAgcHJldmlvdXNQYXRoOiBbXVxuICAgICAgICAgICAgdXJpOiBudWxsXG4gICAgICAgIEBsb2NhdGlvbiA9IHt9XG4gICAgICAgIEBhcHBsaWNhdGlvbiA9IHt9XG4gICAgICAgIEBpZGVudGl0eSA9IHt9XG5cbiAgICAgICAgIyBEaXNwYXRjaCBldmVudHMgcGVyaW9kaWNhbGx5LlxuICAgICAgICBAaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCBAZGlzcGF0Y2guYmluZChAKSwgQGRpc3BhdGNoSW50ZXJ2YWxcblxuICAgICAgICByZXR1cm5cblxuICAgIHRyYWNrRXZlbnQ6ICh0eXBlLCBwcm9wZXJ0aWVzID0ge30sIHZlcnNpb24gPSAnMS4wLjAnKSAtPlxuICAgICAgICB0aHJvdyBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ0V2ZW50IHR5cGUgaXMgcmVxdWlyZWQnKSkgaWYgdHlwZW9mIHR5cGUgaXNudCAnc3RyaW5nJ1xuICAgICAgICByZXR1cm4gaWYgbm90IEB0cmFja0lkP1xuXG4gICAgICAgIHBvb2wucHVzaFxuICAgICAgICAgICAgaWQ6IFNHTi51dGlsLnV1aWQoKVxuICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICAgICAgcmVjb3JkZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICBzZW50QXQ6IG51bGxcbiAgICAgICAgICAgIGNsaWVudDpcbiAgICAgICAgICAgICAgICBpZDogQGNsaWVudC5pZFxuICAgICAgICAgICAgICAgIHRyYWNrSWQ6IEBjbGllbnQudHJhY2tJZFxuICAgICAgICAgICAgY29udGV4dDogQGdldENvbnRleHQoKVxuICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllc1xuXG4gICAgICAgIHBvb2wuc2hpZnQoKSB3aGlsZSBAZ2V0UG9vbFNpemUoKSA+IEBwb29sTGltaXRcblxuICAgICAgICBAXG5cbiAgICBpZGVudGlmeTogKGlkKSAtPlxuICAgICAgICBAaWRlbnRpdHkuaWQgPSBpZFxuXG4gICAgICAgIEBcblxuICAgIHNldExvY2F0aW9uOiAobG9jYXRpb24gPSB7fSkgLT5cbiAgICAgICAgQGxvY2F0aW9uLmRldGVybWluZWRBdCA9IG5ldyBEYXRlKGxvY2F0aW9uLnRpbWVzdGFtcCkudG9JU09TdHJpbmcoKVxuICAgICAgICBAbG9jYXRpb24ubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZVxuICAgICAgICBAbG9jYXRpb24ubG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlXG4gICAgICAgIEBsb2NhdGlvbi5hbHRpdHVkZSA9IGxvY2F0aW9uLmFsdGl0dWRlXG4gICAgICAgIEBsb2NhdGlvbi5hY2N1cmFjeSA9XG4gICAgICAgICAgICBob3Jpem9udGFsOiBsb2NhdGlvbi5hY2N1cmFjeT8uaG9yaXpvbnRhbFxuICAgICAgICAgICAgdmVydGljYWw6IGxvY2F0aW9uLmFjY3VyYWN5Py52ZXJ0aWNhbFxuICAgICAgICBAbG9jYXRpb24uc3BlZWQgPSBsb2NhdGlvbi5zcGVlZFxuICAgICAgICBAbG9jYXRpb24uZmxvb3IgPSBsb2NhdGlvbi5mbG9vclxuXG4gICAgICAgIEBcblxuICAgIHNldEFwcGxpY2F0aW9uOiAoYXBwbGljYXRpb24gPSB7fSkgLT5cbiAgICAgICAgQGFwcGxpY2F0aW9uLm5hbWUgPSBhcHBsaWNhdGlvbi5uYW1lXG4gICAgICAgIEBhcHBsaWNhdGlvbi52ZXJzaW9uID0gYXBwbGljYXRpb24udmVyc2lvblxuICAgICAgICBAYXBwbGljYXRpb24uYnVpbGQgPSBhcHBsaWNhdGlvbi5idWlsZFxuXG4gICAgICAgIEBcblxuICAgIHNldFZpZXc6IChwYXRoKSAtPlxuICAgICAgICBAdmlldy5wcmV2aW91c1BhdGggPSBAdmlldy5wYXRoXG4gICAgICAgIEB2aWV3LnBhdGggPSBwYXRoIGlmIEFycmF5LmlzQXJyYXkocGF0aCkgaXMgdHJ1ZVxuICAgICAgICBAdmlldy51cmkgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgICAgIEBcblxuICAgIGdldFZpZXc6IC0+XG4gICAgICAgIHZpZXcgPSB7fVxuXG4gICAgICAgIHZpZXcucGF0aCA9IEB2aWV3LnBhdGggaWYgQHZpZXcucGF0aC5sZW5ndGggPiAwXG4gICAgICAgIHZpZXcucHJldmlvdXNQYXRoID0gQHZpZXcucHJldmlvdXNQYXRoIGlmIEB2aWV3LnByZXZpb3VzUGF0aC5sZW5ndGggPiAwXG4gICAgICAgIHZpZXcudXJpID0gQHZpZXcudXJpIGlmIEB2aWV3LnVyaT9cblxuICAgICAgICB2aWV3XG5cbiAgICBnZXRDb250ZXh0OiAtPlxuICAgICAgICBzY3JlZW5EaW1lbnNpb25zID0gU0dOLnV0aWwuZ2V0U2NyZWVuRGltZW5zaW9ucygpXG4gICAgICAgIG9zID0gU0dOLnV0aWwuZ2V0T1MoKVxuICAgICAgICBjb250ZXh0ID1cbiAgICAgICAgICAgIHVzZXJBZ2VudDogd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgICAgIGxvY2FsZTogbmF2aWdhdG9yLmxhbmd1YWdlXG4gICAgICAgICAgICB0aW1lWm9uZTpcbiAgICAgICAgICAgICAgICB1dGNPZmZzZXRTZWNvbmRzOiBTR04udXRpbC5nZXRVdGNPZmZzZXRTZWNvbmRzKClcbiAgICAgICAgICAgICAgICB1dGNEc3RPZmZzZXRTZWNvbmRzOiBTR04udXRpbC5nZXRVdGNEc3RPZmZzZXRTZWNvbmRzKClcbiAgICAgICAgICAgIGRldmljZTpcbiAgICAgICAgICAgICAgICBzY3JlZW46XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzY3JlZW5EaW1lbnNpb25zLnBoeXNpY2FsLndpZHRoXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc2NyZWVuRGltZW5zaW9ucy5waHlzaWNhbC5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgZGVuc2l0eTogc2NyZWVuRGltZW5zaW9ucy5kZW5zaXR5XG4gICAgICAgICAgICBzZXNzaW9uOlxuICAgICAgICAgICAgICAgIGlkOiBAc2Vzc2lvbi5pZFxuICAgICAgICAgICAgdmlldzogQGdldFZpZXcoKVxuICAgICAgICBhcHBsaWNhdGlvbiA9XG4gICAgICAgICAgICBuYW1lOiBAYXBwbGljYXRpb24ubmFtZVxuICAgICAgICAgICAgdmVyc2lvbjogQGFwcGxpY2F0aW9uLnZlcnNpb25cbiAgICAgICAgICAgIGJ1aWxkOiBAYXBwbGljYXRpb24uYnVpbGRcbiAgICAgICAgY2FtcGFpZ24gPVxuICAgICAgICAgICAgc291cmNlOiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fc291cmNlJ1xuICAgICAgICAgICAgbWVkaXVtOiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fbWVkaXVtJ1xuICAgICAgICAgICAgbmFtZTogU0dOLnV0aWwuZ2V0UXVlcnlQYXJhbSAndXRtX2NhbXBhaWduJ1xuICAgICAgICAgICAgdGVybTogU0dOLnV0aWwuZ2V0UXVlcnlQYXJhbSAndXRtX3Rlcm0nXG4gICAgICAgICAgICBjb250ZW50OiBTR04udXRpbC5nZXRRdWVyeVBhcmFtICd1dG1fY29udGVudCdcbiAgICAgICAgbG9jID1cbiAgICAgICAgICAgIGRldGVybWluZWRBdDogQGxvY2F0aW9uLmRldGVybWluZWRBdFxuICAgICAgICAgICAgbGF0aXR1ZGU6IEBsb2NhdGlvbi5sYXRpdHVkZVxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBAbG9jYXRpb24ubG9uZ2l0dWRlXG4gICAgICAgICAgICBhbHRpdHVkZTogQGxvY2F0aW9uLmFsdGl0dWRlXG4gICAgICAgICAgICBzcGVlZDogQGxvY2F0aW9uLnNwZWVkXG4gICAgICAgICAgICBmbG9vcjogQGxvY2F0aW9uLmZsb29yXG4gICAgICAgICAgICBhY2N1cmFjeTpcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsOiBAbG9jYXRpb24uYWNjdXJhY3k/Lmhvcml6b250YWxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogQGxvY2F0aW9uLmFjY3VyYWN5Py52ZXJ0aWNhbFxuXG4gICAgICAgICMgT3BlcmF0aW5nIHN5c3RlbS5cbiAgICAgICAgY29udGV4dC5vcyA9IG5hbWU6IG9zIGlmIG9zP1xuXG4gICAgICAgICMgU2Vzc2lvbiByZWZlcnJlci5cbiAgICAgICAgY29udGV4dC5zZXNzaW9uLnJlZmVycmVyID0gZG9jdW1lbnQucmVmZXJyZXIgaWYgZG9jdW1lbnQucmVmZXJyZXIubGVuZ3RoID4gMFxuXG4gICAgICAgICMgQXBwbGljYXRpb24uXG4gICAgICAgIFsnbmFtZScsICd2ZXJzaW9uJywgJ2J1aWxkJ10uZm9yRWFjaCAoa2V5KSAtPlxuICAgICAgICAgICAgZGVsZXRlIGFwcGxpY2F0aW9uW2tleV0gaWYgdHlwZW9mIGFwcGxpY2F0aW9uW2tleV0gaXNudCAnc3RyaW5nJyBvciBhcHBsaWNhdGlvbltrZXldLmxlbmd0aCBpcyAwXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgY29udGV4dC5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uIGlmIE9iamVjdC5rZXlzKGFwcGxpY2F0aW9uKS5sZW5ndGggPiAwXG5cbiAgICAgICAgIyBDYW1wYWlnbi5cbiAgICAgICAgWydzb3VyY2UnLCAnbWVkaXVtJywgJ25hbWUnLCAndGVybScsICdjb250ZW50J10uZm9yRWFjaCAoa2V5KSAtPlxuICAgICAgICAgICAgZGVsZXRlIGNhbXBhaWduW2tleV0gaWYgdHlwZW9mIGNhbXBhaWduW2tleV0gaXNudCAnc3RyaW5nJyBvciBjYW1wYWlnbltrZXldLmxlbmd0aCBpcyAwXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgY29udGV4dC5jYW1wYWlnbiA9IGNhbXBhaWduIGlmIE9iamVjdC5rZXlzKGNhbXBhaWduKS5sZW5ndGggPiAwXG5cbiAgICAgICAgIyBMb2NhdGlvbi5cbiAgICAgICAgWydsYXRpdHVkZScsICdsb25naXR1ZGUnLCAnYWx0aXR1ZGUnLCAnc3BlZWQnLCAnZmxvb3InXS5mb3JFYWNoIChrZXkpIC0+XG4gICAgICAgICAgICBkZWxldGUgbG9jW2tleV0gaWYgdHlwZW9mIGxvY1trZXldIGlzbnQgJ251bWJlcidcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBkZWxldGUgbG9jLmFjY3VyYWN5Lmhvcml6b250YWwgaWYgdHlwZW9mIGxvYy5hY2N1cmFjeS5ob3Jpem9udGFsIGlzbnQgJ251bWJlcidcbiAgICAgICAgZGVsZXRlIGxvYy5hY2N1cmFjeS52ZXJ0aWNhbCBpZiB0eXBlb2YgbG9jLmFjY3VyYWN5LnZlcnRpY2FsIGlzbnQgJ251bWJlcidcbiAgICAgICAgZGVsZXRlIGxvYy5hY2N1cmFjeSBpZiBPYmplY3Qua2V5cyhsb2MuYWNjdXJhY3kpLmxlbmd0aCBpcyAwXG4gICAgICAgIGRlbGV0ZSBsb2MuZGV0ZXJtaW5lZEF0IGlmIHR5cGVvZiBsb2MuZGV0ZXJtaW5lZEF0IGlzbnQgJ3N0cmluZycgb3IgbG9jLmRldGVybWluZWRBdC5sZW5ndGggaXMgMFxuICAgICAgICBjb250ZXh0LmxvY2F0aW9uID0gbG9jIGlmIE9iamVjdC5rZXlzKGxvYykubGVuZ3RoID4gMFxuXG4gICAgICAgICMgUGVyc29uIGlkZW50aWZpZXIuXG4gICAgICAgIGNvbnRleHQucGVyc29uSWQgPSBAaWRlbnRpdHkuaWQgaWYgQGlkZW50aXR5LmlkP1xuXG4gICAgICAgIGNvbnRleHRcblxuICAgIGdldFBvb2xTaXplOiAtPlxuICAgICAgICBwb29sLmxlbmd0aFxuXG4gICAgZGlzcGF0Y2g6IC0+XG4gICAgICAgIHJldHVybiBpZiBAZGlzcGF0Y2hpbmcgaXMgdHJ1ZSBvciBAZ2V0UG9vbFNpemUoKSBpcyAwXG4gICAgICAgIHJldHVybiBwb29sLnNwbGljZSgwLCBAZGlzcGF0Y2hMaW1pdCkgaWYgQGRyeVJ1biBpcyB0cnVlXG5cbiAgICAgICAgZXZlbnRzID0gcG9vbC5zbGljZSAwLCBAZGlzcGF0Y2hMaW1pdFxuICAgICAgICBuYWNrcyA9IDBcblxuICAgICAgICBAZGlzcGF0Y2hpbmcgPSB0cnVlXG5cbiAgICAgICAgQHNoaXAgZXZlbnRzLCAoZXJyLCByZXNwb25zZSkgPT5cbiAgICAgICAgICAgIEBkaXNwYXRjaGluZyA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIG5vdCBlcnI/XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZXZlbnRzLmZvckVhY2ggKHJlc0V2ZW50KSAtPlxuICAgICAgICAgICAgICAgICAgICBpZiByZXNFdmVudC5zdGF0dXMgaXMgJ3ZhbGlkYXRpb25fZXJyb3InIG9yIHJlc0V2ZW50LnN0YXR1cyBpcyAnYWNrJ1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHBvb2wuZmlsdGVyIChwb29sRXZlbnQpIC0+IHBvb2xFdmVudC5pZCBpc250IHJlc0V2ZW50LmlkXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgJ25hY2snXG4gICAgICAgICAgICAgICAgICAgICAgICBuYWNrcysrXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICAjIEtlZXAgZGlzcGF0Y2hpbmcgdW50aWwgdGhlIHBvb2wgc2l6ZSByZWFjaGVzIGEgc2FuZSBsZXZlbC5cbiAgICAgICAgICAgICAgICBAZGlzcGF0Y2goKSBpZiBAZ2V0UG9vbFNpemUoKSA+PSBAZGlzcGF0Y2hMaW1pdCBhbmQgbmFja3MgaXMgMFxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAXG5cbiAgICBzaGlwOiAoZXZlbnRzID0gW10sIGNhbGxiYWNrKSAtPlxuICAgICAgICBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgdXJsID0gU0dOLmNvbmZpZy5nZXQgJ2V2ZW50c1RyYWNrVXJsJ1xuICAgICAgICBwYXlsb2FkID0gZXZlbnRzOiBldmVudHMubWFwIChldmVudCkgLT5cbiAgICAgICAgICAgIGV2ZW50LnNlbnRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuXG4gICAgICAgICAgICBldmVudFxuXG4gICAgICAgIGh0dHAub3BlbiAnUE9TVCcsIHVybFxuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIgJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBodHRwLnNldFJlcXVlc3RIZWFkZXIgJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBodHRwLnRpbWVvdXQgPSAxMDAwICogMjBcbiAgICAgICAgaHR0cC5vbmxvYWQgPSAtPlxuICAgICAgICAgICAgaWYgaHR0cC5zdGF0dXMgaXMgMjAwXG4gICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGwsIEpTT04ucGFyc2UoaHR0cC5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgY2F0Y2ggZXJyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIFNHTi51dGlsLmVycm9yKG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIEpTT04nKSlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYWxsYmFjayBTR04udXRpbC5lcnJvcihuZXcgRXJyb3IoJ1NlcnZlciBkaWQgbm90IGFjY2VwdCByZXF1ZXN0JykpXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBodHRwLm9uZXJyb3IgPSAtPlxuICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdDb3VsZCBub3QgcGVyZm9ybSBuZXR3b3JrIHJlcXVlc3QnKSlcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGh0dHAuc2VuZCBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuXG4gICAgICAgIEBcbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICByZXF1ZXN0OiByZXF1aXJlICcuL3JlcXVlc3QnXG4iLCJTR04gPSByZXF1aXJlICcuLi8uLi9zZ24nXG5cbnBhcnNlQ29va2llcyA9IChjb29raWVzID0gW10pIC0+XG4gICAgcGFyc2VkQ29va2llcyA9IHt9XG5cbiAgICBjb29raWVzLm1hcCAoY29va2llKSAtPlxuICAgICAgICBwYXJ0cyA9IGNvb2tpZS5zcGxpdCAnOyAnXG4gICAgICAgIGtleVZhbHVlUGFpciA9IHBhcnRzWzBdLnNwbGl0ICc9J1xuICAgICAgICBrZXkgPSBrZXlWYWx1ZVBhaXJbMF1cbiAgICAgICAgdmFsdWUgPSBrZXlWYWx1ZVBhaXJbMV1cblxuICAgICAgICBwYXJzZWRDb29raWVzW2tleV0gPSB2YWx1ZVxuXG4gICAgICAgIHJldHVyblxuICAgIFxuICAgIHBhcnNlZENvb2tpZXNcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucyA9IHt9LCBjYWxsYmFjaykgLT5cbiAgICB1cmwgPSBTR04uY29uZmlnLmdldCAnZ3JhcGhVcmwnXG4gICAgdGltZW91dCA9IDEwMDAgKiAxMlxuICAgIGFwcEtleSA9IFNHTi5jb25maWcuZ2V0ICdhcHBLZXknXG4gICAgYXV0aFRva2VuID0gU0dOLmNvbmZpZy5nZXQgJ2F1dGhUb2tlbidcbiAgICBhdXRoVG9rZW5Db29raWVOYW1lID0gJ3Nob3BndW4tYXV0aC10b2tlbidcbiAgICBvcHRpb25zID1cbiAgICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgdGltZW91dDogdGltZW91dFxuICAgICAgICBqc29uOiB0cnVlXG4gICAgICAgIGhlYWRlcnM6IHt9XG4gICAgICAgIGJvZHk6XG4gICAgICAgICAgICBxdWVyeTogb3B0aW9ucy5xdWVyeVxuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogb3B0aW9ucy5vcGVyYXRpb25OYW1lXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG9wdGlvbnMudmFyaWFibGVzXG5cbiAgICAjIEFwcGx5IGF1dGhvcml6YXRpb24gaGVhZGVyIHdoZW4gYXBwIGtleSBpcyBwcm92aWRlZCB0byBhdm9pZCByYXRlIGxpbWl0aW5nLlxuICAgIG9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBTR04udXRpbC5idG9hKFwiYXBwLWtleToje2FwcEtleX1cIikgaWYgYXBwS2V5P1xuXG4gICAgIyBTZXQgY29va2llcyBtYW51YWxseSBpbiBub2RlLmpzLlxuICAgIGlmIFNHTi51dGlsLmlzTm9kZSgpIGFuZCBhdXRoVG9rZW4/XG4gICAgICAgIG9wdGlvbnMuY29va2llcyA9IFtcbiAgICAgICAgICAgIGtleTogYXV0aFRva2VuQ29va2llTmFtZVxuICAgICAgICAgICAgdmFsdWU6IGF1dGhUb2tlblxuICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgXVxuICAgIGVsc2UgaWYgU0dOLnV0aWwuaXNCcm93c2VyKClcbiAgICAgICAgb3B0aW9ucy51c2VDb29raWVzID0gdHJ1ZVxuXG4gICAgU0dOLnJlcXVlc3Qgb3B0aW9ucywgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgaWYgZXJyP1xuICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdHcmFwaCByZXF1ZXN0IGVycm9yJyksXG4gICAgICAgICAgICAgICAgY29kZTogJ0dyYXBoUmVxdWVzdEVycm9yJ1xuICAgICAgICAgICAgKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIFVwZGF0ZSBhdXRoIHRva2VuIGFzIGl0IG1pZ2h0IGhhdmUgY2hhbmdlZC5cbiAgICAgICAgICAgIGlmIFNHTi51dGlsLmlzTm9kZSgpXG4gICAgICAgICAgICAgICAgY29va2llcyA9IHBhcnNlQ29va2llcyBkYXRhLmhlYWRlcnM/WydzZXQtY29va2llJ11cbiAgICAgICAgICAgICAgICBhdXRoQ29va2llID0gY29va2llc1thdXRoVG9rZW5Db29raWVOYW1lXVxuXG4gICAgICAgICAgICAgICAgaWYgU0dOLmNvbmZpZy5nZXQoJ2F1dGhUb2tlbicpIGlzbnQgYXV0aENvb2tpZVxuICAgICAgICAgICAgICAgICAgICBTR04uY29uZmlnLnNldCAnYXV0aFRva2VuJywgYXV0aENvb2tpZVxuXG4gICAgICAgICAgICBpZiBkYXRhLnN0YXR1c0NvZGUgaXMgMjAwXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgbnVsbCwgZGF0YS5ib2R5XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgU0dOLnV0aWwuZXJyb3IobmV3IEVycm9yKCdHcmFwaCBBUEkgZXJyb3InKSxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogJ0dyYXBoQVBJRXJyb3InXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGRhdGEuc3RhdHVzQ29kZVxuICAgICAgICAgICAgICAgIClcblxuICAgICAgICByZXR1cm5cblxuICAgIHJldHVyblxuXG5cbiIsIk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuU0dOID0gcmVxdWlyZSAnLi4vLi4vc2duJ1xua2V5Q29kZXMgPSByZXF1aXJlICcuLi8uLi9rZXlfY29kZXMnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25Db250cm9sc1xuICAgIGNvbnN0cnVjdG9yOiAoZWwsIEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBlbHMgPVxuICAgICAgICAgICAgcm9vdDogZWxcbiAgICAgICAgICAgIHByb2dyZXNzOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19wcm9ncmVzcydcbiAgICAgICAgICAgIHByb2dyZXNzQmFyOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwLXByb2dyZXNzX19iYXInXG4gICAgICAgICAgICBwcm9ncmVzc0xhYmVsOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19wcm9ncmVzcy1sYWJlbCdcbiAgICAgICAgICAgIHByZXZDb250cm9sOiBlbC5xdWVyeVNlbGVjdG9yICcuc2duLXBwX19jb250cm9sW2RhdGEtZGlyZWN0aW9uPXByZXZdJ1xuICAgICAgICAgICAgbmV4dENvbnRyb2w6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHBfX2NvbnRyb2xbZGF0YS1kaXJlY3Rpb249bmV4dF0nXG5cbiAgICAgICAgQGtleURvd25MaXN0ZW5lciA9IFNHTi51dGlsLnRocm90dGxlIEBrZXlEb3duLCAxNTAsIEBcbiAgICAgICAgQG1vdXNlTW92ZUxpc3RlbmVyID0gU0dOLnV0aWwudGhyb3R0bGUgQG1vdXNlTW92ZSwgNTAsIEBcblxuICAgICAgICBAZWxzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lciAna2V5ZG93bicsIEBrZXlEb3duTGlzdGVuZXIsIGZhbHNlIGlmIEBvcHRpb25zLmtleWJvYXJkIGlzIHRydWVcbiAgICAgICAgQGVscy5yb290LmFkZEV2ZW50TGlzdGVuZXIgJ21vdXNlbW92ZScsIEBtb3VzZU1vdmVMaXN0ZW5lciwgZmFsc2VcbiAgICAgICAgQGVscy5wcmV2Q29udHJvbC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIEBwcmV2Q2xpY2tlZC5iaW5kKEApLCBmYWxzZSBpZiBAZWxzLnByZXZDb250cm9sP1xuICAgICAgICBAZWxzLm5leHRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgQG5leHRDbGlja2VkLmJpbmQoQCksIGZhbHNlIGlmIEBlbHMubmV4dENvbnRyb2w/XG5cbiAgICAgICAgQGJpbmQgJ2JlZm9yZU5hdmlnYXRpb24nLCBAYmVmb3JlTmF2aWdhdGlvbi5iaW5kKEApXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAZWxzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lciAna2V5ZG93bicsIEBrZXlEb3duTGlzdGVuZXJcbiAgICAgICAgQGVscy5yb290LnJlbW92ZUV2ZW50TGlzdGVuZXIgJ21vdXNlbW92ZScsIEBtb3VzZU1vdmVMaXN0ZW5lclxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYmVmb3JlTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHNob3dQcm9ncmVzcyA9IHR5cGVvZiBlLnByb2dyZXNzTGFiZWwgaXMgJ3N0cmluZycgYW5kIGUucHJvZ3Jlc3NMYWJlbC5sZW5ndGggPiAwXG4gICAgICAgIHZpc2liaWxpdHlDbGFzc05hbWUgPSAnc2duLXBwLS1oaWRkZW4nXG5cbiAgICAgICAgaWYgQGVscy5wcm9ncmVzcz8gYW5kIEBlbHMucHJvZ3Jlc3NCYXI/XG4gICAgICAgICAgICBAZWxzLnByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gXCIje2UucHJvZ3Jlc3N9JVwiXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIHNob3dQcm9ncmVzcyBpcyB0cnVlXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzcy5jbGFzc0xpc3QucmVtb3ZlIHZpc2liaWxpdHlDbGFzc05hbWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAZWxzLnByb2dyZXNzLmNsYXNzTGlzdC5hZGQgdmlzaWJpbGl0eUNsYXNzTmFtZVxuXG4gICAgICAgIGlmIEBlbHMucHJvZ3Jlc3NMYWJlbD9cbiAgICAgICAgICAgIGlmIHNob3dQcm9ncmVzcyBpcyB0cnVlXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzc0xhYmVsLnRleHRDb250ZW50ID0gZS5wcm9ncmVzc0xhYmVsXG4gICAgICAgICAgICAgICAgQGVscy5wcm9ncmVzc0xhYmVsLmNsYXNzTGlzdC5yZW1vdmUgdmlzaWJpbGl0eUNsYXNzTmFtZVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIEBlbHMucHJvZ3Jlc3NMYWJlbC5jbGFzc0xpc3QuYWRkIHZpc2liaWxpdHlDbGFzc05hbWVcblxuICAgICAgICBpZiBAZWxzLnByZXZDb250cm9sP1xuICAgICAgICAgICAgaWYgZS52ZXJzby5uZXdQb3NpdGlvbiBpcyAwXG4gICAgICAgICAgICAgICAgQGVscy5wcmV2Q29udHJvbC5jbGFzc0xpc3QuYWRkIHZpc2liaWxpdHlDbGFzc05hbWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBAZWxzLnByZXZDb250cm9sLmNsYXNzTGlzdC5yZW1vdmUgdmlzaWJpbGl0eUNsYXNzTmFtZVxuXG4gICAgICAgIGlmIEBlbHMubmV4dENvbnRyb2w/XG4gICAgICAgICAgICBpZiBlLnZlcnNvLm5ld1Bvc2l0aW9uIGlzIGUucGFnZVNwcmVhZENvdW50IC0gMVxuICAgICAgICAgICAgICAgIEBlbHMubmV4dENvbnRyb2wuY2xhc3NMaXN0LmFkZCB2aXNpYmlsaXR5Q2xhc3NOYW1lXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgQGVscy5uZXh0Q29udHJvbC5jbGFzc0xpc3QucmVtb3ZlIHZpc2liaWxpdHlDbGFzc05hbWVcblxuICAgICAgICByZXR1cm5cblxuICAgIHByZXZDbGlja2VkOiAoZSkgLT5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgQHRyaWdnZXIgJ3ByZXYnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBuZXh0Q2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIEB0cmlnZ2VyICduZXh0J1xuXG4gICAgICAgIHJldHVyblxuXG4gICAga2V5RG93bjogKGUpIC0+XG4gICAgICAgIGtleUNvZGUgPSBlLmtleUNvZGVcblxuICAgICAgICBpZiBrZXlDb2Rlcy5BUlJPV19MRUZUIGlzIGtleUNvZGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdwcmV2JywgZHVyYXRpb246IDBcbiAgICAgICAgZWxzZSBpZiBrZXlDb2Rlcy5BUlJPV19SSUdIVCBpcyBrZXlDb2RlIG9yIGtleUNvZGVzLlNQQUNFIGlzIGtleUNvZGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICduZXh0JywgZHVyYXRpb246IDBcbiAgICAgICAgZWxzZSBpZiBrZXlDb2Rlcy5OVU1CRVJfT05FIGlzIGtleUNvZGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdmaXJzdCcsIGR1cmF0aW9uOiAwXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBtb3VzZU1vdmU6IC0+XG4gICAgICAgIEBlbHMucm9vdC5kYXRhc2V0Lm1vdXNlTW92aW5nID0gdHJ1ZVxuXG4gICAgICAgIGNsZWFyVGltZW91dCBAbW91c2VNb3ZlVGltZW91dFxuXG4gICAgICAgIEBtb3VzZU1vdmVUaW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgQGVscy5yb290LmRhdGFzZXQubW91c2VNb3ZpbmcgPSBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgLCA0MDAwXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkNvbnRyb2xzXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkNvbnRyb2xzXG4iLCJNaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblBhZ2VTcHJlYWRzID0gcmVxdWlyZSAnLi9wYWdlX3NwcmVhZHMnXG5jbGllbnRMb2NhbFN0b3JhZ2UgPSByZXF1aXJlICcuLi8uLi9zdG9yYWdlL2NsaWVudF9sb2NhbCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvbkNvcmVcbiAgICBkZWZhdWx0czpcbiAgICAgICAgcGFnZXM6IFtdXG4gICAgICAgIHBhZ2VTcHJlYWRXaWR0aDogMTAwXG4gICAgICAgIHBhZ2VTcHJlYWRNYXhab29tU2NhbGU6IDRcbiAgICAgICAgaWRsZURlbGF5OiAxMDAwXG4gICAgICAgIHJlc2l6ZURlbGF5OiA0MDBcbiAgICAgICAgY29sb3I6ICcjZmZmZmZmJ1xuXG4gICAgY29uc3RydWN0b3I6IChlbCwgb3B0aW9ucyA9IHt9KSAtPlxuICAgICAgICBAb3B0aW9ucyA9IEBtYWtlT3B0aW9ucyBvcHRpb25zLCBAZGVmYXVsdHNcbiAgICAgICAgQHBhZ2VJZCA9IEBnZXRPcHRpb24gJ3BhZ2VJZCdcbiAgICAgICAgQGVscyA9XG4gICAgICAgICAgICByb290OiBlbFxuICAgICAgICAgICAgcGFnZXM6IGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ24tcHBfX3BhZ2VzJ1xuICAgICAgICAgICAgdmVyc286IGVsLnF1ZXJ5U2VsZWN0b3IgJy52ZXJzbydcbiAgICAgICAgQHBhZ2VNb2RlID0gQGdldFBhZ2VNb2RlKClcbiAgICAgICAgQHBhZ2VTcHJlYWRzID0gbmV3IFBhZ2VTcHJlYWRzXG4gICAgICAgICAgICBwYWdlczogQGdldE9wdGlvbiAncGFnZXMnXG4gICAgICAgICAgICBtYXhab29tU2NhbGU6IEBnZXRPcHRpb24gJ3BhZ2VTcHJlYWRNYXhab29tU2NhbGUnXG4gICAgICAgICAgICB3aWR0aDogQGdldE9wdGlvbiAncGFnZVNwcmVhZFdpZHRoJ1xuXG4gICAgICAgIEBwYWdlU3ByZWFkcy5iaW5kICdwYWdlTG9hZGVkJywgQHBhZ2VMb2FkZWQuYmluZChAKVxuICAgICAgICBAcGFnZVNwcmVhZHMuYmluZCAncGFnZXNMb2FkZWQnLCBAcGFnZXNMb2FkZWQuYmluZChAKVxuXG4gICAgICAgIEBzZXRDb2xvciBAZ2V0T3B0aW9uKCdjb2xvcicpXG5cbiAgICAgICAgIyBJdCdzIGltcG9ydGFudCB0byBpbnNlcnQgdGhlIHBhZ2Ugc3ByZWFkcyBiZWZvcmUgaW5zdGFudGlhdGluZyBWZXJzby5cbiAgICAgICAgQGVscy5wYWdlcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSBAcGFnZVNwcmVhZHMudXBkYXRlKEBwYWdlTW9kZSkuZ2V0RnJhZygpLCBAZWxzLnBhZ2VzXG5cbiAgICAgICAgQHZlcnNvID0gQGNyZWF0ZVZlcnNvKClcblxuICAgICAgICBAYmluZCAnc3RhcnRlZCcsIEBzdGFydC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkZXN0cm95ZWQnLCBAZGVzdHJveS5iaW5kKEApXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQGdldFZlcnNvKCkuc3RhcnQoKVxuXG4gICAgICAgIEB2aXNpYmlsaXR5Q2hhbmdlTGlzdGVuZXIgPSBAdmlzaWJpbGl0eUNoYW5nZS5iaW5kIEBcbiAgICAgICAgQHJlc2l6ZUxpc3RlbmVyID0gU0dOLnV0aWwudGhyb3R0bGUgQHJlc2l6ZSwgQGdldE9wdGlvbigncmVzaXplRGVsYXknKSwgQFxuICAgICAgICBAdW5sb2FkTGlzdGVuZXIgPSBAdW5sb2FkLmJpbmQgQFxuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ3Zpc2liaWxpdHljaGFuZ2UnLCBAdmlzaWJpbGl0eUNoYW5nZUxpc3RlbmVyLCBmYWxzZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyLCBmYWxzZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnYmVmb3JldW5sb2FkJywgQHVubG9hZExpc3RlbmVyLCBmYWxzZVxuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtc3RhcnRlZCcsICcnXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ3RhYmluZGV4JywgJy0xJ1xuICAgICAgICBAZWxzLnJvb3QuZm9jdXMoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQGdldFZlcnNvKCkuZGVzdHJveSgpXG5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciAndmlzaWJpbGl0eWNoYW5nZScsIEB2aXNpYmlsaXR5Q2hhbmdlTGlzdGVuZXIsIGZhbHNlXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXIsIGZhbHNlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBtYWtlT3B0aW9uczogKG9wdGlvbnMsIGRlZmF1bHRzKSAtPlxuICAgICAgICBvcHRzID0ge31cblxuICAgICAgICBvcHRzW2tleV0gPSBvcHRpb25zW2tleV0gPyBkZWZhdWx0c1trZXldIGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblxuICAgICAgICBvcHRzXG5cbiAgICBnZXRPcHRpb246IChrZXkpIC0+XG4gICAgICAgIEBvcHRpb25zW2tleV1cblxuICAgIHNldENvbG9yOiAoY29sb3IpIC0+XG4gICAgICAgIEBlbHMucm9vdC5kYXRhc2V0LmNvbG9yQnJpZ2h0bmVzcyA9IFNHTi51dGlsLmdldENvbG9yQnJpZ2h0bmVzcyBjb2xvclxuICAgICAgICBAZWxzLnJvb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JcblxuICAgICAgICByZXR1cm5cblxuICAgIGNyZWF0ZVZlcnNvOiAtPlxuICAgICAgICBWZXJzbyA9IHJlcXVpcmUgJ3ZlcnNvLWJyb3dzZXInXG4gICAgICAgIHZlcnNvID0gbmV3IFZlcnNvIEBlbHMudmVyc28sIHBhZ2VJZDogQHBhZ2VJZFxuXG4gICAgICAgIHZlcnNvLnBhZ2VTcHJlYWRzLmZvckVhY2ggQG92ZXJyaWRlUGFnZVNwcmVhZENvbnRlbnRSZWN0LmJpbmQoQClcblxuICAgICAgICB2ZXJzby5iaW5kICdiZWZvcmVOYXZpZ2F0aW9uJywgQGJlZm9yZU5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdhZnRlck5hdmlnYXRpb24nLCBAYWZ0ZXJOYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIEBhdHRlbXB0ZWROYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnY2xpY2tlZCcsIEBjbGlja2VkLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnZG91YmxlQ2xpY2tlZCcsIEBkb3VibGVDbGlja2VkLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAncHJlc3NlZCcsIEBwcmVzc2VkLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAncGFuU3RhcnQnLCBAcGFuU3RhcnQuYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICdwYW5FbmQnLCBAcGFuRW5kLmJpbmQoQClcbiAgICAgICAgdmVyc28uYmluZCAnem9vbWVkSW4nLCBAem9vbWVkSW4uYmluZChAKVxuICAgICAgICB2ZXJzby5iaW5kICd6b29tZWRPdXQnLCBAem9vbWVkT3V0LmJpbmQoQClcblxuICAgICAgICB2ZXJzb1xuXG4gICAgZ2V0VmVyc286IC0+XG4gICAgICAgIEB2ZXJzb1xuXG4gICAgZ2V0Q29udGVudFJlY3Q6IChwYWdlU3ByZWFkKSAtPlxuICAgICAgICByZWN0ID1cbiAgICAgICAgICAgIHRvcDogMFxuICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICAgICAgcmlnaHQ6IDBcbiAgICAgICAgICAgIGJvdHRvbTogMFxuICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICBwYWdlRWxzID0gcGFnZVNwcmVhZC5nZXRQYWdlRWxzKClcbiAgICAgICAgcGFnZUVsID0gcGFnZUVsc1swXVxuICAgICAgICBwYWdlQ291bnQgPSBwYWdlRWxzLmxlbmd0aFxuICAgICAgICBzY2FsZSA9IEBnZXRWZXJzbygpLnRyYW5zZm9ybS5zY2FsZVxuICAgICAgICBwYWdlV2lkdGggPSBwYWdlRWwub2Zmc2V0V2lkdGggKiBwYWdlQ291bnQgKiBzY2FsZVxuICAgICAgICBwYWdlSGVpZ2h0ID0gcGFnZUVsLm9mZnNldEhlaWdodCAqIHNjYWxlXG4gICAgICAgIGltYWdlUmF0aW8gPSArcGFnZUVsLmRhdGFzZXQuaGVpZ2h0IC8gKCtwYWdlRWwuZGF0YXNldC53aWR0aCAqIHBhZ2VDb3VudClcbiAgICAgICAgYWN0dWFsSGVpZ2h0ID0gcGFnZUhlaWdodFxuICAgICAgICBhY3R1YWxXaWR0aCA9IGFjdHVhbEhlaWdodCAvIGltYWdlUmF0aW9cbiAgICAgICAgYWN0dWFsV2lkdGggPSBNYXRoLm1pbiBwYWdlV2lkdGgsIGFjdHVhbFdpZHRoXG4gICAgICAgIGFjdHVhbEhlaWdodCA9IGFjdHVhbFdpZHRoICogaW1hZ2VSYXRpb1xuICAgICAgICBjbGllbnRSZWN0ID0gcGFnZUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgcmVjdC53aWR0aCA9IGFjdHVhbFdpZHRoXG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gYWN0dWFsSGVpZ2h0XG4gICAgICAgIHJlY3QudG9wID0gY2xpZW50UmVjdC50b3AgKyAocGFnZUhlaWdodCAtIGFjdHVhbEhlaWdodCkgLyAyXG4gICAgICAgIHJlY3QubGVmdCA9IGNsaWVudFJlY3QubGVmdCArIChwYWdlV2lkdGggLSBhY3R1YWxXaWR0aCkgLyAyXG4gICAgICAgIHJlY3QucmlnaHQgPSByZWN0LndpZHRoICsgcmVjdC5sZWZ0XG4gICAgICAgIHJlY3QuYm90dG9tID0gcmVjdC5oZWlnaHQgKyByZWN0LnRvcFxuXG4gICAgICAgIHJlY3RcblxuICAgIGZvcm1hdFByb2dyZXNzTGFiZWw6IChwYWdlU3ByZWFkKSAtPlxuICAgICAgICBwYWdlcyA9IHBhZ2VTcHJlYWQ/Lm9wdGlvbnMucGFnZXMgPyBbXVxuICAgICAgICBwYWdlSWRzID0gcGFnZXMubWFwIChwYWdlKSAtPiBwYWdlLmlkXG4gICAgICAgIHBhZ2VMYWJlbHMgPSBwYWdlcy5tYXAgKHBhZ2UpIC0+IHBhZ2UubGFiZWxcbiAgICAgICAgcGFnZUNvdW50ID0gQGdldE9wdGlvbigncGFnZXMnKS5sZW5ndGhcbiAgICAgICAgbGFiZWwgPSBpZiBwYWdlSWRzLmxlbmd0aCA+IDAgdGhlbiBwYWdlTGFiZWxzLmpvaW4oJy0nKSArICcgLyAnICsgcGFnZUNvdW50IGVsc2UgbnVsbFxuXG4gICAgICAgIGxhYmVsXG5cbiAgICByZW5kZXJQYWdlU3ByZWFkczogLT5cbiAgICAgICAgQGdldFZlcnNvKCkucGFnZVNwcmVhZHMuZm9yRWFjaCAocGFnZVNwcmVhZCkgPT5cbiAgICAgICAgICAgIHZpc2liaWxpdHkgPSBwYWdlU3ByZWFkLmdldFZpc2liaWxpdHkoKVxuICAgICAgICAgICAgbWF0Y2ggPSBAcGFnZVNwcmVhZHMuZ2V0IHBhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgICAgICBpZiBtYXRjaD9cbiAgICAgICAgICAgICAgICBpZiB2aXNpYmlsaXR5IGlzICd2aXNpYmxlJyBhbmQgbWF0Y2guY29udGVudHNSZW5kZXJlZCBpcyBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0IG1hdGNoLnJlbmRlckNvbnRlbnRzLmJpbmQobWF0Y2gpLCAwXG4gICAgICAgICAgICAgICAgaWYgdmlzaWJpbGl0eSBpcyAnZ29uZScgYW5kIG1hdGNoLmNvbnRlbnRzUmVuZGVyZWQgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0IG1hdGNoLmNsZWFyQ29udGVudHMuYmluZChtYXRjaCksIDBcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQFxuXG4gICAgZmluZFBhZ2U6IChwYWdlSWQpIC0+XG4gICAgICAgIEBnZXRPcHRpb24oJ3BhZ2VzJykuZmluZCAocGFnZSkgLT4gcGFnZS5pZCBpcyBwYWdlSWRcblxuICAgIHBhZ2VMb2FkZWQ6IChlKSAtPlxuICAgICAgICBAdHJpZ2dlciAncGFnZUxvYWRlZCcsIGVcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhZ2VzTG9hZGVkOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3BhZ2VzTG9hZGVkJywgZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYmVmb3JlTmF2aWdhdGlvbjogKGUpIC0+XG4gICAgICAgIHBvc2l0aW9uID0gZS5uZXdQb3NpdGlvblxuICAgICAgICB2ZXJzb1BhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIHBvc2l0aW9uXG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAcGFnZVNwcmVhZHMuZ2V0IHZlcnNvUGFnZVNwcmVhZC5nZXRJZCgpXG4gICAgICAgIHBhZ2VTcHJlYWRDb3VudCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRDb3VudCgpXG4gICAgICAgIHByb2dyZXNzID0gKHBvc2l0aW9uICsgMSkgLyBwYWdlU3ByZWFkQ291bnQgKiAxMDBcbiAgICAgICAgcHJvZ3Jlc3NMYWJlbCA9IEBmb3JtYXRQcm9ncmVzc0xhYmVsIHBhZ2VTcHJlYWRcblxuICAgICAgICBAcmVuZGVyUGFnZVNwcmVhZHMoKVxuICAgICAgICBAcmVzZXRJZGxlVGltZXIoKVxuICAgICAgICBAc3RhcnRJZGxlVGltZXIoKVxuICAgICAgICBAdHJpZ2dlciAnYmVmb3JlTmF2aWdhdGlvbicsXG4gICAgICAgICAgICB2ZXJzbzogZVxuICAgICAgICAgICAgcGFnZVNwcmVhZDogcGFnZVNwcmVhZFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzXG4gICAgICAgICAgICBwcm9ncmVzc0xhYmVsOiBwcm9ncmVzc0xhYmVsXG4gICAgICAgICAgICBwYWdlU3ByZWFkQ291bnQ6IHBhZ2VTcHJlYWRDb3VudFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYWZ0ZXJOYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgcG9zaXRpb24gPSBlLm5ld1Bvc2l0aW9uXG4gICAgICAgIHZlcnNvUGFnZVNwcmVhZCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgcGFnZVNwcmVhZCA9IEBwYWdlU3ByZWFkcy5nZXQgdmVyc29QYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBAdHJpZ2dlciAnYWZ0ZXJOYXZpZ2F0aW9uJyxcbiAgICAgICAgICAgIHZlcnNvOiBlXG4gICAgICAgICAgICBwYWdlU3ByZWFkOiBwYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhdHRlbXB0ZWROYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ2F0dGVtcHRlZE5hdmlnYXRpb24nLCB2ZXJzbzogZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgY2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGlmIGUuaXNJbnNpZGVDb250ZW50XG4gICAgICAgICAgICBwYWdlSWQgPSBlLnBhZ2VFbC5kYXRhc2V0LmlkXG4gICAgICAgICAgICBwYWdlID0gQGZpbmRQYWdlIHBhZ2VJZFxuXG4gICAgICAgICAgICBAdHJpZ2dlciAnY2xpY2tlZCcsIHZlcnNvOiBlLCBwYWdlOiBwYWdlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkb3VibGVDbGlja2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS5pc0luc2lkZUNvbnRlbnRcbiAgICAgICAgICAgIHBhZ2VJZCA9IGUucGFnZUVsLmRhdGFzZXQuaWRcbiAgICAgICAgICAgIHBhZ2UgPSBAZmluZFBhZ2UgcGFnZUlkXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdkb3VibGVDbGlja2VkJywgdmVyc286IGUsIHBhZ2U6IHBhZ2VcblxuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLmlzSW5zaWRlQ29udGVudFxuICAgICAgICAgICAgcGFnZUlkID0gZS5wYWdlRWwuZGF0YXNldC5pZFxuICAgICAgICAgICAgcGFnZSA9IEBmaW5kUGFnZSBwYWdlSWRcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ3ByZXNzZWQnLCB2ZXJzbzogZSwgcGFnZTogcGFnZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuU3RhcnQ6IC0+XG4gICAgICAgIEByZXNldElkbGVUaW1lcigpXG4gICAgICAgIEB0cmlnZ2VyICdwYW5TdGFydCcsIHNjYWxlOiBAZ2V0VmVyc28oKS50cmFuc2Zvcm0uc2NhbGVcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhbkVuZDogLT5cbiAgICAgICAgQHN0YXJ0SWRsZVRpbWVyKClcbiAgICAgICAgQHRyaWdnZXIgJ3BhbkVuZCdcblxuICAgICAgICByZXR1cm5cblxuICAgIHpvb21lZEluOiAoZSkgLT5cbiAgICAgICAgcG9zaXRpb24gPSBlLnBvc2l0aW9uXG4gICAgICAgIHZlcnNvUGFnZVNwcmVhZCA9IEBnZXRWZXJzbygpLmdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgcGFnZVNwcmVhZCA9IEBwYWdlU3ByZWFkcy5nZXQgdmVyc29QYWdlU3ByZWFkLmdldElkKClcblxuICAgICAgICBwYWdlU3ByZWFkLnpvb21JbigpIGlmIHBhZ2VTcHJlYWQ/XG5cbiAgICAgICAgQGVscy5yb290LnNldEF0dHJpYnV0ZSAnZGF0YS16b29tZWQtaW4nLCB0cnVlXG4gICAgICAgIEB0cmlnZ2VyICd6b29tZWRJbicsIHZlcnNvOiBlLCBwYWdlU3ByZWFkOiBwYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB6b29tZWRPdXQ6IChlKSAtPlxuICAgICAgICBwb3NpdGlvbiA9IGUucG9zaXRpb25cbiAgICAgICAgdmVyc29QYWdlU3ByZWFkID0gQGdldFZlcnNvKCkuZ2V0UGFnZVNwcmVhZEZyb21Qb3NpdGlvbiBwb3NpdGlvblxuICAgICAgICBwYWdlU3ByZWFkID0gQHBhZ2VTcHJlYWRzLmdldCB2ZXJzb1BhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgIHBhZ2VTcHJlYWQuem9vbU91dCgpIGlmIHBhZ2VTcHJlYWQ/XG5cbiAgICAgICAgQGVscy5yb290LnNldEF0dHJpYnV0ZSAnZGF0YS16b29tZWQtaW4nLCBmYWxzZVxuICAgICAgICBAdHJpZ2dlciAnem9vbWVkT3V0JywgdmVyc286IGUsIHBhZ2VTcHJlYWQ6IHBhZ2VTcHJlYWRcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldFBhZ2VNb2RlOiAtPlxuICAgICAgICBwYWdlTW9kZSA9IEBnZXRPcHRpb24gJ3BhZ2VNb2RlJ1xuXG4gICAgICAgIGlmIG5vdCBwYWdlTW9kZT9cbiAgICAgICAgICAgIHdpZHRoID0gQGVscy5yb290Lm9mZnNldFdpZHRoXG4gICAgICAgICAgICBoZWlnaHQgPSBAZWxzLnJvb3Qub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgICAgIHBhZ2VNb2RlID0gaWYgaGVpZ2h0ID49IHdpZHRoIHRoZW4gJ3NpbmdsZScgZWxzZSAnZG91YmxlJ1xuXG4gICAgICAgIHBhZ2VNb2RlXG5cbiAgICByZXNldElkbGVUaW1lcjogLT5cbiAgICAgICAgY2xlYXJUaW1lb3V0IEBpZGxlVGltZW91dFxuXG4gICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWRsZScsIGZhbHNlXG5cbiAgICAgICAgQFxuXG4gICAgc3RhcnRJZGxlVGltZXI6IC0+XG4gICAgICAgIEBpZGxlVGltZW91dCA9IHNldFRpbWVvdXQgPT5cbiAgICAgICAgICAgIEBlbHMucm9vdC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWRsZScsIHRydWVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICwgQGdldE9wdGlvbignaWRsZURlbGF5JylcblxuICAgICAgICBAXG5cbiAgICBzd2l0Y2hQYWdlTW9kZTogKHBhZ2VNb2RlKSAtPlxuICAgICAgICByZXR1cm4gQCBpZiBAcGFnZU1vZGUgaXMgcGFnZU1vZGVcblxuICAgICAgICB2ZXJzbyA9IEBnZXRWZXJzbygpXG4gICAgICAgIHBhZ2VJZHMgPSB2ZXJzby5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uKHZlcnNvLmdldFBvc2l0aW9uKCkpLmdldFBhZ2VJZHMoKVxuICAgICAgICBwYWdlU3ByZWFkRWxzID0gQGdldFZlcnNvKCkuZWwucXVlcnlTZWxlY3RvckFsbCAnLnNnbi1wcF9fcGFnZS1zcHJlYWQnXG5cbiAgICAgICAgQHBhZ2VNb2RlID0gcGFnZU1vZGVcblxuICAgICAgICBAcGFnZVNwcmVhZHMudXBkYXRlIEBwYWdlTW9kZVxuXG4gICAgICAgIHBhZ2VTcHJlYWRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIHBhZ2VTcHJlYWRFbCBmb3IgcGFnZVNwcmVhZEVsIGluIHBhZ2VTcHJlYWRFbHNcbiAgICAgICAgQGVscy5wYWdlcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSBAcGFnZVNwcmVhZHMuZ2V0RnJhZygpLCBAZWxzLnBhZ2VzXG5cbiAgICAgICAgdmVyc28ucmVmcmVzaCgpXG4gICAgICAgIHZlcnNvLm5hdmlnYXRlVG8gdmVyc28uZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZChwYWdlSWRzWzBdKSwgZHVyYXRpb246IDBcbiAgICAgICAgdmVyc28ucGFnZVNwcmVhZHMuZm9yRWFjaCBAb3ZlcnJpZGVQYWdlU3ByZWFkQ29udGVudFJlY3QuYmluZChAKVxuXG4gICAgICAgIEBcblxuICAgIG92ZXJyaWRlUGFnZVNwcmVhZENvbnRlbnRSZWN0OiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgaWYgcGFnZVNwcmVhZC5nZXRUeXBlKCkgaXMgJ3BhZ2UnXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmdldENvbnRlbnRSZWN0ID0gPT4gQGdldENvbnRlbnRSZWN0IHBhZ2VTcHJlYWRcblxuICAgIHZpc2liaWxpdHlDaGFuZ2U6IC0+XG4gICAgICAgIHBhZ2VTcHJlYWQgPSBAZ2V0VmVyc28oKS5nZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIEBnZXRWZXJzbygpLmdldFBvc2l0aW9uKClcbiAgICAgICAgZXZlbnROYW1lID0gaWYgZG9jdW1lbnQuaGlkZGVuIGlzIHRydWUgdGhlbiAnZGlzYXBwZWFyZWQnIGVsc2UgJ2FwcGVhcmVkJ1xuXG4gICAgICAgIEB0cmlnZ2VyIGV2ZW50TmFtZSwgcGFnZVNwcmVhZDogQHBhZ2VTcHJlYWRzLmdldChwYWdlU3ByZWFkLmlkKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplOiAtPlxuICAgICAgICBwYWdlTW9kZSA9IEBnZXRQYWdlTW9kZSgpXG5cbiAgICAgICAgaWYgbm90IEBnZXRPcHRpb24oJ3BhZ2VNb2RlJyk/IGFuZCBwYWdlTW9kZSBpc250IEBwYWdlTW9kZVxuICAgICAgICAgICAgQHN3aXRjaFBhZ2VNb2RlIHBhZ2VNb2RlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0cmlnZ2VyICdyZXNpemVkJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgdW5sb2FkOiAtPlxuICAgICAgICBAdHJpZ2dlciAnZGlzYXBwZWFyZWQnXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkNvcmVcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uQ29yZVxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25FdmVudFRyYWNraW5nXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBoaWRkZW4gPSB0cnVlXG4gICAgICAgIEBwYWdlU3ByZWFkID0gbnVsbFxuXG4gICAgICAgIEBiaW5kICdhcHBlYXJlZCcsIEBhcHBlYXJlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkaXNhcHBlYXJlZCcsIEBkaXNhcHBlYXJlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdiZWZvcmVOYXZpZ2F0aW9uJywgQGJlZm9yZU5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICBAYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgQGFmdGVyTmF2aWdhdGlvbi5iaW5kKEApXG4gICAgICAgIEBiaW5kICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgQGF0dGVtcHRlZE5hdmlnYXRpb24uYmluZChAKVxuICAgICAgICBAYmluZCAnY2xpY2tlZCcsIEBjbGlja2VkLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ2RvdWJsZUNsaWNrZWQnLCBAZG91YmxlQ2xpY2tlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdwcmVzc2VkJywgQHByZXNzZWQuYmluZChAKVxuICAgICAgICBAYmluZCAncGFuU3RhcnQnLCBAcGFuU3RhcnQuYmluZChAKVxuICAgICAgICBAYmluZCAnem9vbWVkSW4nLCBAem9vbWVkSW4uYmluZChAKVxuICAgICAgICBAYmluZCAnem9vbWVkT3V0JywgQHpvb21lZE91dC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdkZXN0cm95ZWQnLCBAZGVzdHJveS5iaW5kKEApXG5cbiAgICAgICAgQHRyYWNrT3BlbmVkKClcbiAgICAgICAgQHRyYWNrQXBwZWFyZWQoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQHBhZ2VTcHJlYWREaXNhcHBlYXJlZCgpXG4gICAgICAgIEB0cmFja0Rpc2FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIHRyYWNrRXZlbnQ6ICh0eXBlLCBwcm9wZXJ0aWVzID0ge30pIC0+XG4gICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JywgdHlwZTogdHlwZSwgcHJvcGVydGllczogcHJvcGVydGllc1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgdHJhY2tPcGVuZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tb3BlbmVkJywgcHJvcGVydGllc1xuXG4gICAgICAgIEBcblxuICAgIHRyYWNrQXBwZWFyZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tYXBwZWFyZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tEaXNhcHBlYXJlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1kaXNhcHBlYXJlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VDbGlja2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtY2xpY2tlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VEb3VibGVDbGlja2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtZG91YmxlLWNsaWNrZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlTG9uZ1ByZXNzZWQ6IChwcm9wZXJ0aWVzKSAtPlxuICAgICAgICBAdHJhY2tFdmVudCAncGFnZWQtcHVibGljYXRpb24tcGFnZS1sb25nLXByZXNzZWQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlSG90c3BvdHNDbGlja2VkOiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2UtaG90c3BvdHMtY2xpY2tlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VTcHJlYWRBcHBlYXJlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC1hcHBlYXJlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VTcHJlYWREaXNhcHBlYXJlZDogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC1kaXNhcHBlYXJlZCcsIHByb3BlcnRpZXNcblxuICAgICAgICBAXG5cbiAgICB0cmFja1BhZ2VTcHJlYWRab29tZWRJbjogKHByb3BlcnRpZXMpIC0+XG4gICAgICAgIEB0cmFja0V2ZW50ICdwYWdlZC1wdWJsaWNhdGlvbi1wYWdlLXNwcmVhZC16b29tZWQtaW4nLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgdHJhY2tQYWdlU3ByZWFkWm9vbWVkT3V0OiAocHJvcGVydGllcykgLT5cbiAgICAgICAgQHRyYWNrRXZlbnQgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLXpvb21lZC1vdXQnLCBwcm9wZXJ0aWVzXG5cbiAgICAgICAgQFxuXG4gICAgYXBwZWFyZWQ6IChlKSAtPlxuICAgICAgICBAdHJhY2tBcHBlYXJlZCgpXG4gICAgICAgIEBwYWdlU3ByZWFkQXBwZWFyZWQgZS5wYWdlU3ByZWFkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBkaXNhcHBlYXJlZDogLT5cbiAgICAgICAgQHBhZ2VTcHJlYWREaXNhcHBlYXJlZCgpXG4gICAgICAgIEB0cmFja0Rpc2FwcGVhcmVkKClcblxuICAgICAgICByZXR1cm5cblxuICAgIGJlZm9yZU5hdmlnYXRpb246IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRGlzYXBwZWFyZWQoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgYWZ0ZXJOYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRBcHBlYXJlZCBlLnBhZ2VTcHJlYWRcblxuICAgICAgICByZXR1cm5cblxuICAgIGF0dGVtcHRlZE5hdmlnYXRpb246IChlKSAtPlxuICAgICAgICBAcGFnZVNwcmVhZEFwcGVhcmVkIGUucGFnZVNwcmVhZFxuXG4gICAgICAgIHJldHVyblxuXG4gICAgY2xpY2tlZDogKGUpIC0+XG4gICAgICAgIGlmIGUucGFnZT9cbiAgICAgICAgICAgIHByb3BlcnRpZXMgPVxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXI6IGUucGFnZS5wYWdlTnVtYmVyXG4gICAgICAgICAgICAgICAgeDogZS52ZXJzby5wYWdlWFxuICAgICAgICAgICAgICAgIHk6IGUudmVyc28ucGFnZVlcblxuICAgICAgICAgICAgQHRyYWNrUGFnZUNsaWNrZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2U6IHByb3BlcnRpZXNcbiAgICAgICAgICAgIEB0cmFja1BhZ2VIb3RzcG90c0NsaWNrZWQgcGFnZWRQdWJsaWNhdGlvblBhZ2U6IHByb3BlcnRpZXMgaWYgZS52ZXJzby5vdmVybGF5RWxzLmxlbmd0aCA+IDBcblxuICAgICAgICByZXR1cm5cblxuICAgIGRvdWJsZUNsaWNrZWQ6IChlKSA9PlxuICAgICAgICBpZiBlLnBhZ2U/XG4gICAgICAgICAgICBAdHJhY2tQYWdlRG91YmxlQ2xpY2tlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZTpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyOiBlLnBhZ2UucGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHg6IGUudmVyc28ucGFnZVhcbiAgICAgICAgICAgICAgICB5OiBlLnZlcnNvLnBhZ2VZXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzc2VkOiAoZSkgLT5cbiAgICAgICAgaWYgZS5wYWdlP1xuICAgICAgICAgICAgQHRyYWNrUGFnZUxvbmdQcmVzc2VkIHBhZ2VkUHVibGljYXRpb25QYWdlOlxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXI6IGUucGFnZS5wYWdlTnVtYmVyXG4gICAgICAgICAgICAgICAgeDogZS52ZXJzby5wYWdlWFxuICAgICAgICAgICAgICAgIHk6IGUudmVyc28ucGFnZVlcblxuICAgICAgICByZXR1cm5cblxuICAgIHBhblN0YXJ0OiAoZSkgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWREaXNhcHBlYXJlZCgpIGlmIGUuc2NhbGUgaXMgMVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgem9vbWVkSW46IChlKSAtPlxuICAgICAgICBpZiBlLnBhZ2VTcHJlYWQ/XG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkWm9vbWVkSW4gcGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQ6XG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcnM6IGUucGFnZVNwcmVhZC5nZXRQYWdlcygpLm1hcCAocGFnZSkgLT4gcGFnZS5wYWdlTnVtYmVyXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB6b29tZWRPdXQ6IChlKSAtPlxuICAgICAgICBpZiBlLnBhZ2VTcHJlYWQ/XG4gICAgICAgICAgICBAdHJhY2tQYWdlU3ByZWFkWm9vbWVkT3V0IHBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkOlxuICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXJzOiBlLnBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFnZVNwcmVhZEFwcGVhcmVkOiAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgaWYgcGFnZVNwcmVhZD8gYW5kIEBoaWRkZW4gaXMgdHJ1ZVxuICAgICAgICAgICAgQHBhZ2VTcHJlYWQgPSBwYWdlU3ByZWFkXG5cbiAgICAgICAgICAgIEB0cmFja1BhZ2VTcHJlYWRBcHBlYXJlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZDpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyczogcGFnZVNwcmVhZC5nZXRQYWdlcygpLm1hcCAocGFnZSkgLT4gcGFnZS5wYWdlTnVtYmVyXG5cbiAgICAgICAgICAgIEBoaWRkZW4gPSBmYWxzZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFnZVNwcmVhZERpc2FwcGVhcmVkOiAtPlxuICAgICAgICBpZiBAcGFnZVNwcmVhZD8gYW5kIEBoaWRkZW4gaXMgZmFsc2VcbiAgICAgICAgICAgIEB0cmFja1BhZ2VTcHJlYWREaXNhcHBlYXJlZCBwYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZDpcbiAgICAgICAgICAgICAgICBwYWdlTnVtYmVyczogQHBhZ2VTcHJlYWQuZ2V0UGFnZXMoKS5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgICAgICBAaGlkZGVuID0gdHJ1ZVxuICAgICAgICAgICAgQHBhZ2VTcHJlYWQgPSBudWxsXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkV2ZW50VHJhY2tpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uRXZlbnRUcmFja2luZ1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5HYXRvciA9IHJlcXVpcmUgJ2dhdG9yJ1xuTXVzdGFjaGUgPSByZXF1aXJlICdtdXN0YWNoZSdcbnRlbXBsYXRlID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvaG90c3BvdF9waWNrZXInXG5rZXlDb2RlcyA9IHJlcXVpcmUgJy4uLy4uL2tleV9jb2RlcydcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RQaWNrZXJcbiAgICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgQHJlc2l6ZUxpc3RlbmVyID0gQHJlc2l6ZS5iaW5kIEBcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlbmRlcjogLT5cbiAgICAgICAgd2lkdGggPSBAb3B0aW9ucy53aWR0aCA/IDEwMFxuICAgICAgICBoZWFkZXIgPSBAb3B0aW9ucy5oZWFkZXJcbiAgICAgICAgdGVtcGxhdGUgPSBAb3B0aW9ucy50ZW1wbGF0ZSBpZiBAb3B0aW9ucy50ZW1wbGF0ZT9cbiAgICAgICAgdHJpZ2dlciA9IEB0cmlnZ2VyLmJpbmQgQFxuICAgICAgICB2aWV3ID1cbiAgICAgICAgICAgIGhlYWRlcjogaGVhZGVyXG4gICAgICAgICAgICBob3RzcG90czogQG9wdGlvbnMuaG90c3BvdHNcbiAgICAgICAgICAgIHRvcDogQG9wdGlvbnMueVxuICAgICAgICAgICAgbGVmdDogQG9wdGlvbnMueFxuXG4gICAgICAgIEBlbC5jbGFzc05hbWUgPSAnc2duLXBwX19ob3RzcG90LXBpY2tlcidcbiAgICAgICAgQGVsLnNldEF0dHJpYnV0ZSAndGFiaW5kZXgnLCAtMVxuICAgICAgICBAZWwuaW5uZXJIVE1MID0gTXVzdGFjaGUucmVuZGVyIHRlbXBsYXRlLCB2aWV3XG5cbiAgICAgICAgcG9wb3ZlckVsID0gQGVsLnF1ZXJ5U2VsZWN0b3IgJy5zZ25fX3BvcG92ZXInXG4gICAgICAgIHdpZHRoID0gcG9wb3ZlckVsLm9mZnNldFdpZHRoXG4gICAgICAgIGhlaWdodCA9IHBvcG92ZXJFbC5vZmZzZXRIZWlnaHRcbiAgICAgICAgcGFyZW50V2lkdGggPSBAZWwucGFyZW50Tm9kZS5vZmZzZXRXaWR0aFxuICAgICAgICBwYXJlbnRIZWlnaHQgPSBAZWwucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHRcblxuICAgICAgICBpZiB2aWV3LnRvcCArIGhlaWdodCA+IHBhcmVudEhlaWdodFxuICAgICAgICAgICAgcG9wb3ZlckVsLnN0eWxlLnRvcCA9IHBhcmVudEhlaWdodCAtIGhlaWdodCArICdweCdcblxuICAgICAgICBpZiB2aWV3LmxlZnQgKyB3aWR0aCA+IHBhcmVudFdpZHRoXG4gICAgICAgICAgICBwb3BvdmVyRWwuc3R5bGUubGVmdCA9IHBhcmVudFdpZHRoIC0gd2lkdGggKyAncHgnXG5cbiAgICAgICAgQGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2tleXVwJywgQGtleVVwLmJpbmQoQClcblxuICAgICAgICBHYXRvcihAZWwpLm9uICdjbGljaycsICdbZGF0YS1pZF0nLCAtPlxuICAgICAgICAgICAgdHJpZ2dlciAnc2VsZWN0ZWQnLCBpZDogQGdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEdhdG9yKEBlbCkub24gJ2NsaWNrJywgJ1tkYXRhLWNsb3NlXScsIEBkZXN0cm95LmJpbmQoQClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAncmVzaXplJywgQHJlc2l6ZUxpc3RlbmVyLCBmYWxzZVxuXG4gICAgICAgIEBcblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIEBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIEBlbFxuXG4gICAgICAgIEB0cmlnZ2VyICdkZXN0cm95ZWQnXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBrZXlVcDogKGUpIC0+XG4gICAgICAgIEBkZXN0cm95KCkgaWYgZS5rZXlDb2RlIGlzIGtleUNvZGVzLkVTQ1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXNpemU6IC0+XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXJcblxuICAgICAgICBAZGVzdHJveSgpXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RQaWNrZXJcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uSG90c3BvdFBpY2tlclxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5NdXN0YWNoZSA9IHJlcXVpcmUgJ211c3RhY2hlJ1xudGVtcGxhdGUgPSByZXF1aXJlICcuL3RlbXBsYXRlcy9ob3RzcG90J1xuXG5jbGFzcyBQYWdlZFB1YmxpY2F0aW9uSG90c3BvdHNcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGN1cnJlbnRQYWdlU3ByZWFkSWQgPSBudWxsXG4gICAgICAgIEBwYWdlU3ByZWFkc0xvYWRlZCA9IHt9XG4gICAgICAgIEBjYWNoZSA9IHt9XG5cbiAgICAgICAgQGJpbmQgJ2hvdHNwb3RzUmVjZWl2ZWQnLCBAaG90c3BvdHNSZWNlaXZlZC5iaW5kKEApXG4gICAgICAgIEBiaW5kICdhZnRlck5hdmlnYXRpb24nLCBAYWZ0ZXJOYXZpZ2F0aW9uLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3BhZ2VzTG9hZGVkJywgQHBhZ2VzTG9hZGVkLmJpbmQoQClcbiAgICAgICAgQGJpbmQgJ3Jlc2l6ZWQnLCBAcmVzaXplZC5iaW5kKEApXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZW5kZXJIb3RzcG90czogKGRhdGEpIC0+XG4gICAgICAgIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgICAgY29udGVudFJlY3QgPSBkYXRhLnZlcnNvUGFnZVNwcmVhZC5nZXRDb250ZW50UmVjdCgpXG4gICAgICAgIHBhZ2VTcHJlYWRFbCA9IGRhdGEucGFnZVNwcmVhZC5nZXRFbCgpXG4gICAgICAgIGhvdHNwb3RFbHMgPSBwYWdlU3ByZWFkRWwucXVlcnlTZWxlY3RvckFsbCAnLnNnbi1wcF9faG90c3BvdCdcblxuICAgICAgICBob3RzcG90RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBob3RzcG90RWwgZm9yIGhvdHNwb3RFbCBpbiBob3RzcG90RWxzXG5cbiAgICAgICAgZm9yIGlkLCBob3RzcG90IG9mIGRhdGEuaG90c3BvdHNcbiAgICAgICAgICAgIHBvc2l0aW9uID0gQGdldFBvc2l0aW9uIGRhdGEucGFnZXMsIGRhdGEucmF0aW8sIGhvdHNwb3RcbiAgICAgICAgICAgIGVsID0gQHJlbmRlckhvdHNwb3QgaG90c3BvdCwgcG9zaXRpb24sIGNvbnRlbnRSZWN0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQgZWxcblxuICAgICAgICBwYWdlU3ByZWFkRWwuYXBwZW5kQ2hpbGQgZnJhZ1xuXG4gICAgICAgIEBcblxuICAgIHJlbmRlckhvdHNwb3Q6IChob3RzcG90LCBwb3NpdGlvbiwgY29udGVudFJlY3QpIC0+XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgICB0b3AgPSBNYXRoLnJvdW5kIGNvbnRlbnRSZWN0LmhlaWdodCAvIDEwMCAqIHBvc2l0aW9uLnRvcFxuICAgICAgICBsZWZ0ID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC53aWR0aCAvIDEwMCAqIHBvc2l0aW9uLmxlZnRcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kIGNvbnRlbnRSZWN0LndpZHRoIC8gMTAwICogcG9zaXRpb24ud2lkdGhcbiAgICAgICAgaGVpZ2h0ID0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC5oZWlnaHQgLyAxMDAgKiBwb3NpdGlvbi5oZWlnaHRcblxuICAgICAgICB0b3AgKz0gTWF0aC5yb3VuZCBjb250ZW50UmVjdC50b3BcbiAgICAgICAgbGVmdCArPSBNYXRoLnJvdW5kIGNvbnRlbnRSZWN0LmxlZnRcblxuICAgICAgICBlbC5jbGFzc05hbWUgPSAnc2duLXBwX19ob3RzcG90IHZlcnNvX19vdmVybGF5J1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWQnLCBob3RzcG90LmlkIGlmIGhvdHNwb3QuaWQ/XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSAnZGF0YS10eXBlJywgaG90c3BvdC50eXBlIGlmIGhvdHNwb3QudHlwZT9cbiAgICAgICAgZWwuaW5uZXJIVE1MID0gTXVzdGFjaGUucmVuZGVyIGhvdHNwb3QudGVtcGxhdGUgPyB0ZW1wbGF0ZSwgaG90c3BvdFxuXG4gICAgICAgIGVsLnN0eWxlLnRvcCA9IFwiI3t0b3B9cHhcIlxuICAgICAgICBlbC5zdHlsZS5sZWZ0ID0gXCIje2xlZnR9cHhcIlxuICAgICAgICBlbC5zdHlsZS53aWR0aCA9IFwiI3t3aWR0aH1weFwiXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IFwiI3toZWlnaHR9cHhcIlxuXG4gICAgICAgIGVsXG5cbiAgICBnZXRQb3NpdGlvbjogKHBhZ2VzLCByYXRpbywgaG90c3BvdCkgLT5cbiAgICAgICAgbWluWCA9IG51bGxcbiAgICAgICAgbWluWSA9IG51bGxcbiAgICAgICAgbWF4WCA9IG51bGxcbiAgICAgICAgbWF4WSA9IG51bGxcbiAgICAgICAgcGFnZU51bWJlcnMgPSBwYWdlcy5tYXAgKHBhZ2UpIC0+IHBhZ2UucGFnZU51bWJlclxuXG4gICAgICAgIGZvciBwYWdlTnVtYmVyIG9mIGhvdHNwb3QubG9jYXRpb25zXG4gICAgICAgICAgICBjb250aW51ZSBpZiBwYWdlTnVtYmVycy5pbmRleE9mKCtwYWdlTnVtYmVyKSBpcyAtMVxuXG4gICAgICAgICAgICBob3RzcG90LmxvY2F0aW9uc1twYWdlTnVtYmVyXS5mb3JFYWNoIChjb29yZHMpIC0+XG4gICAgICAgICAgICAgICAgeCA9IGNvb3Jkc1swXVxuICAgICAgICAgICAgICAgIHkgPSBjb29yZHNbMV1cblxuICAgICAgICAgICAgICAgIHggKz0xIGlmIHBhZ2VzWzFdIGFuZCBwYWdlTnVtYmVyc1sxXSBpcyArcGFnZU51bWJlclxuICAgICAgICAgICAgICAgIHggLz0gcGFnZXMubGVuZ3RoXG5cbiAgICAgICAgICAgICAgICBpZiBub3QgbWluWD9cbiAgICAgICAgICAgICAgICAgICAgbWluWCA9IG1heFggPSB4XG4gICAgICAgICAgICAgICAgICAgIG1pblkgPSBtYXhZID0geVxuXG4gICAgICAgICAgICAgICAgbWluWCA9IHggaWYgeCA8IG1pblhcbiAgICAgICAgICAgICAgICBtYXhYID0geCBpZiB4ID4gbWF4WFxuICAgICAgICAgICAgICAgIG1pblkgPSB5IGlmIHkgPCBtaW5ZXG4gICAgICAgICAgICAgICAgbWF4WSA9IHkgaWYgeSA+IG1heFlcblxuICAgICAgICB3aWR0aCA9IG1heFggLSBtaW5YXG4gICAgICAgIGhlaWdodCA9IG1heFkgLSBtaW5ZXG5cbiAgICAgICAgdG9wOiBtaW5ZIC8gcmF0aW8gKiAxMDBcbiAgICAgICAgbGVmdDogbWluWCAqIDEwMFxuICAgICAgICB3aWR0aDogd2lkdGggKiAxMDBcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQgLyByYXRpbyAqIDEwMFxuXG4gICAgcmVxdWVzdEhvdHNwb3RzOiAocGFnZVNwcmVhZElkLCBwYWdlcykgLT5cbiAgICAgICAgQHRyaWdnZXIgJ2hvdHNwb3RzUmVxdWVzdGVkJyxcbiAgICAgICAgICAgIGlkOiBwYWdlU3ByZWFkSWRcbiAgICAgICAgICAgIHBhZ2VzOiBwYWdlc1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgaG90c3BvdHNSZWNlaXZlZDogKGUpIC0+XG4gICAgICAgIHBhZ2VTcHJlYWRJZCA9IGUucGFnZVNwcmVhZC5nZXRJZCgpXG5cbiAgICAgICAgQHNldENhY2hlIHBhZ2VTcHJlYWRJZCwgZVxuICAgICAgICBAcmVuZGVySG90c3BvdHMgZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0Q2FjaGU6IChwYWdlU3ByZWFkSWQpIC0+XG4gICAgICAgIEBjYWNoZVtwYWdlU3ByZWFkSWRdXG5cbiAgICBzZXRDYWNoZTogKHBhZ2VTcHJlYWRJZCwgZGF0YSkgLT5cbiAgICAgICAgQGNhY2hlW3BhZ2VTcHJlYWRJZF0gPSBkYXRhXG5cbiAgICAgICAgQFxuXG4gICAgYWZ0ZXJOYXZpZ2F0aW9uOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBlLnBhZ2VTcHJlYWQ/XG5cbiAgICAgICAgaWQgPSBlLnBhZ2VTcHJlYWQuZ2V0SWQoKVxuXG4gICAgICAgIEBjdXJyZW50UGFnZVNwcmVhZElkID0gaWRcbiAgICAgICAgQHJlcXVlc3RIb3RzcG90cyBpZCwgZS5wYWdlU3ByZWFkLmdldFBhZ2VzKCkgaWYgQHBhZ2VTcHJlYWRzTG9hZGVkW2lkXVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFnZXNMb2FkZWQ6IChlKSAtPlxuICAgICAgICBAcGFnZVNwcmVhZHNMb2FkZWRbZS5wYWdlU3ByZWFkSWRdID0gdHJ1ZVxuICAgICAgICBAcmVxdWVzdEhvdHNwb3RzIGUucGFnZVNwcmVhZElkLCBlLnBhZ2VzIGlmIEBjdXJyZW50UGFnZVNwcmVhZElkIGlzIGUucGFnZVNwcmVhZElkXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXNpemVkOiAoZSkgLT5cbiAgICAgICAgZGF0YSA9IEBnZXRDYWNoZSBAY3VycmVudFBhZ2VTcHJlYWRJZFxuXG4gICAgICAgIEByZW5kZXJIb3RzcG90cyBkYXRhIGlmIGRhdGE/XG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RzXG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZWRQdWJsaWNhdGlvbkhvdHNwb3RzXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIFZpZXdlcjogcmVxdWlyZSAnLi92aWV3ZXInXG5cbiAgICBIb3RzcG90UGlja2VyOiByZXF1aXJlICcuL2hvdHNwb3RfcGlja2VyJ1xuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5cbmNsYXNzIFBhZ2VkUHVibGljYXRpb25MZWdhY3lFdmVudFRyYWNraW5nXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBiaW5kICdldmVudFRyYWNrZWQnLCBAZXZlbnRUcmFja2VkLmJpbmQoQClcbiAgICAgICAgQHpvb21lZEluID0gZmFsc2VcbiAgICAgICAgQGFwcGVhcmVkQXQgPSBudWxsXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB0cmFja0V2ZW50OiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3RyYWNrRXZlbnQnLCBlXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBldmVudFRyYWNrZWQ6IChlKSAtPlxuICAgICAgICBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLWFwcGVhcmVkJ1xuICAgICAgICAgICAgQGFwcGVhcmVkQXQgPSBEYXRlLm5vdygpXG4gICAgICAgIGlmIGUudHlwZSBpcyAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtZGlzYXBwZWFyZWQnXG4gICAgICAgICAgICBAdHJpZ2dlciAndHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgdHlwZTogaWYgQHpvb21lZEluIHRoZW4gJ3pvb20nIGVsc2UgJ3ZpZXcnXG4gICAgICAgICAgICAgICAgbXM6IERhdGUubm93KCkgLSBAYXBwZWFyZWRBdFxuICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiBAZ2V0T3JpZW50YXRpb24oKVxuICAgICAgICAgICAgICAgIHBhZ2VzOiBlLnByb3BlcnRpZXMucGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWQucGFnZU51bWJlcnNcbiAgICAgICAgZWxzZSBpZiBlLnR5cGUgaXMgJ3BhZ2VkLXB1YmxpY2F0aW9uLXBhZ2Utc3ByZWFkLXpvb21lZC1pbidcbiAgICAgICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAndmlldydcbiAgICAgICAgICAgICAgICBtczogQGdldER1cmF0aW9uKClcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogQGdldE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgICAgICBwYWdlczogZS5wcm9wZXJ0aWVzLnBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkLnBhZ2VOdW1iZXJzXG5cbiAgICAgICAgICAgIEB6b29tZWRJbiA9IHRydWVcbiAgICAgICAgICAgIEBhcHBlYXJlZEF0ID0gRGF0ZS5ub3coKVxuICAgICAgICBlbHNlIGlmIGUudHlwZSBpcyAncGFnZWQtcHVibGljYXRpb24tcGFnZS1zcHJlYWQtem9vbWVkLW91dCdcbiAgICAgICAgICAgIEB0cmlnZ2VyICd0cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnem9vbSdcbiAgICAgICAgICAgICAgICBtczogQGdldER1cmF0aW9uKClcbiAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogQGdldE9yaWVudGF0aW9uKClcbiAgICAgICAgICAgICAgICBwYWdlczogZS5wcm9wZXJ0aWVzLnBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkLnBhZ2VOdW1iZXJzXG5cbiAgICAgICAgICAgIEB6b29tZWRJbiA9IGZhbHNlXG4gICAgICAgICAgICBAYXBwZWFyZWRBdCA9IERhdGUubm93KClcblxuICAgICAgICByZXR1cm5cblxuICAgIGdldE9yaWVudGF0aW9uOiAtPlxuICAgICAgICBpZiB3aW5kb3cuaW5uZXJXaWR0aCA+PSB3aW5kb3cuaW5uZXJIZWlnaHQgdGhlbiAnbGFuZHNjYXBlJyBlbHNlICdwb3J0cmFpdCdcblxuICAgIGdldER1cmF0aW9uOiAtPlxuICAgICAgICBEYXRlLm5vdygpIC0gQGFwcGVhcmVkQXRcblxuTWljcm9FdmVudC5taXhpbiBQYWdlZFB1YmxpY2F0aW9uTGVnYWN5RXZlbnRUcmFja2luZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25MZWdhY3lFdmVudFRyYWNraW5nXG4iLCJNaWNyb0V2ZW50ID0gcmVxdWlyZSAnbWljcm9ldmVudCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRcbiAgICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEBjb250ZW50c1JlbmRlcmVkID0gZmFsc2VcbiAgICAgICAgQGhvdHNwb3RzUmVuZGVyZWQgPSBmYWxzZVxuICAgICAgICBAZWwgPSBAcmVuZGVyRWwoKVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0SWQ6IC0+XG4gICAgICAgIEBvcHRpb25zLmlkXG5cbiAgICBnZXRFbDogLT5cbiAgICAgICAgQGVsXG5cbiAgICBnZXRQYWdlczogLT5cbiAgICAgICAgQG9wdGlvbnMucGFnZXNcblxuICAgIHJlbmRlckVsOiAtPlxuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICAgICAgcGFnZUlkcyA9IEBnZXRQYWdlcygpLm1hcCAocGFnZSkgLT4gcGFnZS5pZFxuXG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICd2ZXJzb19fcGFnZS1zcHJlYWQgc2duLXBwX19wYWdlLXNwcmVhZCdcblxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtaWQnLCBAZ2V0SWQoKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtdHlwZScsICdwYWdlJ1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtd2lkdGgnLCBAb3B0aW9ucy53aWR0aFxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtcGFnZS1pZHMnLCBwYWdlSWRzLmpvaW4oJywnKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtbWF4LXpvb20tc2NhbGUnLCBAb3B0aW9ucy5tYXhab29tU2NhbGVcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlICdkYXRhLXpvb21hYmxlJywgZmFsc2VcblxuICAgICAgICBlbFxuXG4gICAgcmVuZGVyQ29udGVudHM6IC0+XG4gICAgICAgIGlkID0gQGdldElkKClcbiAgICAgICAgZWwgPSBAZ2V0RWwoKVxuICAgICAgICBwYWdlcyA9IEBnZXRQYWdlcygpXG4gICAgICAgIHBhZ2VDb3VudCA9IHBhZ2VzLmxlbmd0aFxuICAgICAgICBpbWFnZUxvYWRzID0gMFxuXG4gICAgICAgIHBhZ2VzLmZvckVhY2ggKHBhZ2UsIGkpID0+XG4gICAgICAgICAgICBpbWFnZSA9IHBhZ2UuaW1hZ2VzLm1lZGl1bVxuICAgICAgICAgICAgcGFnZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xuICAgICAgICAgICAgbG9hZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG5cbiAgICAgICAgICAgIHBhZ2VFbC5jbGFzc05hbWUgPSAnc2duLXBwX19wYWdlIHZlcnNvX19wYWdlJ1xuICAgICAgICAgICAgcGFnZUVsLmRhdGFzZXQuaWQgPSBwYWdlLmlkIGlmIHBhZ2UuaWQ/XG5cbiAgICAgICAgICAgIGlmIHBhZ2VDb3VudCBpcyAyXG4gICAgICAgICAgICAgICAgcGFnZUVsLmNsYXNzTmFtZSArPSBpZiBpIGlzIDAgdGhlbiAnIHZlcnNvLXBhZ2UtLXZlcnNvJyBlbHNlICcgdmVyc28tcGFnZS0tcmVjdG8nXG5cbiAgICAgICAgICAgIHBhZ2VFbC5hcHBlbmRDaGlsZCBsb2FkZXJFbFxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQgcGFnZUVsXG5cbiAgICAgICAgICAgIGxvYWRlckVsLmNsYXNzTmFtZSA9ICdzZ24tcHAtcGFnZV9fbG9hZGVyJ1xuICAgICAgICAgICAgbG9hZGVyRWwuaW5uZXJIVE1MID0gXCI8c3Bhbj4je3BhZ2UubGFiZWx9PC9zcGFuPlwiXG5cbiAgICAgICAgICAgIFNHTi51dGlsLmxvYWRJbWFnZSBpbWFnZSwgKGVyciwgd2lkdGgsIGhlaWdodCkgPT5cbiAgICAgICAgICAgICAgICBpZiBub3QgZXJyP1xuICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlID0gKytpbWFnZUxvYWRzIGlzIHBhZ2VDb3VudFxuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgje2ltYWdlfSlcIlxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuZGF0YXNldC53aWR0aCA9IHdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5kYXRhc2V0LmhlaWdodCA9IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuaW5uZXJIVE1MID0gJyZuYnNwOydcblxuICAgICAgICAgICAgICAgICAgICBlbC5kYXRhc2V0Lnpvb21hYmxlID0gdHJ1ZSBpZiBpc0NvbXBsZXRlXG5cbiAgICAgICAgICAgICAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBwYWdlU3ByZWFkSWQ6IGlkLCBwYWdlOiBwYWdlXG4gICAgICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIHBhZ2VTcHJlYWRJZDogaWQsIHBhZ2VzOiBwYWdlcyBpZiBpc0NvbXBsZXRlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsb2FkZXJFbC5pbm5lckhUTUwgPSAnPHNwYW4+ITwvc3Bhbj4nXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGNvbnRlbnRzUmVuZGVyZWQgPSB0cnVlXG5cbiAgICAgICAgQFxuXG4gICAgY2xlYXJDb250ZW50czogKHBhZ2VTcHJlYWQsIHZlcnNvUGFnZVNwcmVhZCkgLT5cbiAgICAgICAgQGVsLmlubmVySFRNTCA9ICcnXG4gICAgICAgIEBjb250ZW50c1JlbmRlcmVkID0gZmFsc2VcblxuICAgICAgICBAXG5cbiAgICB6b29tSW46IC0+XG4gICAgICAgIHBhZ2VFbHMgPSBbXS5zbGljZS5jYWxsIEBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2duLXBwX19wYWdlJylcbiAgICAgICAgcGFnZXMgPSBAZ2V0UGFnZXMoKVxuXG4gICAgICAgIHBhZ2VFbHMuZm9yRWFjaCAocGFnZUVsKSA9PlxuICAgICAgICAgICAgaWQgPSBwYWdlRWwuZGF0YXNldC5pZFxuICAgICAgICAgICAgcGFnZSA9IHBhZ2VzLmZpbmQgKHBhZ2UpIC0+IHBhZ2UuaWQgaXMgaWRcbiAgICAgICAgICAgIGltYWdlID0gcGFnZS5pbWFnZXMubGFyZ2VcblxuICAgICAgICAgICAgU0dOLnV0aWwubG9hZEltYWdlIGltYWdlLCAoZXJyKSA9PlxuICAgICAgICAgICAgICAgIGlmIG5vdCBlcnI/IGFuZCBAZWwuZGF0YXNldC5hY3RpdmUgaXMgJ3RydWUnXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VFbC5kYXRhc2V0LmltYWdlID0gcGFnZUVsLnN0eWxlLmJhY2tncm91bmRJbWFnZVxuICAgICAgICAgICAgICAgICAgICBwYWdlRWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoI3tpbWFnZX0pXCJcblxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIHpvb21PdXQ6IC0+XG4gICAgICAgIHBhZ2VFbHMgPSBbXS5zbGljZS5jYWxsIEBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2duLXBwX19wYWdlW2RhdGEtaW1hZ2VdJylcblxuICAgICAgICBwYWdlRWxzLmZvckVhY2ggKHBhZ2VFbCkgLT5cbiAgICAgICAgICAgIHBhZ2VFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBwYWdlRWwuZGF0YXNldC5pbWFnZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWxldGUgcGFnZUVsLmRhdGFzZXQuaW1hZ2VcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlZFB1YmxpY2F0aW9uUGFnZVNwcmVhZFxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5QYWdlU3ByZWFkID0gcmVxdWlyZSAnLi9wYWdlX3NwcmVhZCdcblNHTiA9IHJlcXVpcmUgJy4uLy4uL3NnbidcblxuY2xhc3MgUGFnZWRQdWJsaWNhdGlvblBhZ2VTcHJlYWRzXG4gICAgY29uc3RydWN0b3I6IChAb3B0aW9ucykgLT5cbiAgICAgICAgQGNvbGxlY3Rpb24gPSBbXVxuICAgICAgICBAaWRzID0ge31cblxuICAgICAgICByZXR1cm5cblxuICAgIGdldDogKGlkKSAtPlxuICAgICAgICBAaWRzW2lkXVxuXG4gICAgZ2V0RnJhZzogLT5cbiAgICAgICAgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXG4gICAgICAgIEBjb2xsZWN0aW9uLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+IGZyYWcuYXBwZW5kQ2hpbGQgcGFnZVNwcmVhZC5lbFxuXG4gICAgICAgIGZyYWdcblxuICAgIHVwZGF0ZTogKHBhZ2VNb2RlID0gJ3NpbmdsZScpIC0+XG4gICAgICAgIHBhZ2VTcHJlYWRzID0gW11cbiAgICAgICAgaWRzID0ge31cbiAgICAgICAgcGFnZXMgPSBAb3B0aW9ucy5wYWdlcy5zbGljZSgpXG4gICAgICAgIHdpZHRoID0gQG9wdGlvbnMud2lkdGhcbiAgICAgICAgbWF4Wm9vbVNjYWxlID0gQG9wdGlvbnMubWF4Wm9vbVNjYWxlXG5cbiAgICAgICAgaWYgcGFnZU1vZGUgaXMgJ3NpbmdsZSdcbiAgICAgICAgICAgIHBhZ2VzLmZvckVhY2ggKHBhZ2UpIC0+IHBhZ2VTcHJlYWRzLnB1c2ggW3BhZ2VdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZpcnN0UGFnZSA9IHBhZ2VzLnNoaWZ0KClcbiAgICAgICAgICAgIGxhc3RQYWdlID0gaWYgcGFnZXMubGVuZ3RoICUgMiBpcyAxIHRoZW4gcGFnZXMucG9wKCkgZWxzZSBudWxsXG4gICAgICAgICAgICBtaWRzdFBhZ2VTcHJlYWRzID0gU0dOLnV0aWwuY2h1bmsgcGFnZXMsIDJcblxuICAgICAgICAgICAgcGFnZVNwcmVhZHMucHVzaCBbZmlyc3RQYWdlXSBpZiBmaXJzdFBhZ2U/XG4gICAgICAgICAgICBtaWRzdFBhZ2VTcHJlYWRzLmZvckVhY2ggKG1pZHN0UGFnZXMpIC0+IHBhZ2VTcHJlYWRzLnB1c2ggbWlkc3RQYWdlcy5tYXAgKHBhZ2UpIC0+IHBhZ2VcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRzLnB1c2ggW2xhc3RQYWdlXSBpZiBsYXN0UGFnZT9cblxuICAgICAgICBAY29sbGVjdGlvbiA9IHBhZ2VTcHJlYWRzLm1hcCAocGFnZXMsIGkpID0+XG4gICAgICAgICAgICBpZCA9IFwiI3twYWdlTW9kZX0tI3tpfVwiXG4gICAgICAgICAgICBwYWdlU3ByZWFkID0gbmV3IFBhZ2VTcHJlYWRcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGU6IG1heFpvb21TY2FsZVxuICAgICAgICAgICAgICAgIHBhZ2VzOiBwYWdlc1xuICAgICAgICAgICAgICAgIGlkOiBpZFxuXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmJpbmQgJ3BhZ2VMb2FkZWQnLCAoZSkgPT4gQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG4gICAgICAgICAgICBwYWdlU3ByZWFkLmJpbmQgJ3BhZ2VzTG9hZGVkJywgKGUpID0+IEB0cmlnZ2VyICdwYWdlc0xvYWRlZCcsIGVcblxuICAgICAgICAgICAgaWRzW2lkXSA9IHBhZ2VTcHJlYWRcblxuICAgICAgICAgICAgcGFnZVNwcmVhZFxuICAgICAgICBAaWRzID0gaWRzXG5cbiAgICAgICAgQFxuXG5NaWNyb0V2ZW50Lm1peGluIFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkc1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VkUHVibGljYXRpb25QYWdlU3ByZWFkc1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXCJcblwiXCJcIlxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXCJcbjxkaXYgY2xhc3M9XCJzZ24tcHAtaG90c3BvdC1waWNrZXJfX2JhY2tncm91bmRcIiBkYXRhLWNsb3NlPjwvZGl2PlxuPGRpdiBjbGFzcz1cInNnbl9fcG9wb3ZlclwiIHN0eWxlPVwidG9wOiB7e3RvcH19cHg7IGxlZnQ6IHt7bGVmdH19cHg7XCI+XG4gICAge3sjaGVhZGVyfX1cbiAgICAgICAgPGRpdiBjbGFzcz1cInNnbi1wb3BvdmVyX19oZWFkZXJcIj57e2hlYWRlcn19PC9kaXY+XG4gICAge3svaGVhZGVyfX1cbiAgICA8ZGl2IGNsYXNzPVwic2duLXBvcG92ZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgICAge3sjaG90c3BvdHN9fVxuICAgICAgICAgICAgICAgIDxsaSBkYXRhLWlkPVwie3tpZH19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt7dGl0bGV9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3tzdWJ0aXRsZX19PC9wPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7ey9ob3RzcG90c319XG4gICAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblwiXCJcIlxuIiwiTWljcm9FdmVudCA9IHJlcXVpcmUgJ21pY3JvZXZlbnQnXG5TR04gPSByZXF1aXJlICcuLi8uLi9jb3JlJ1xuQ29yZSA9IHJlcXVpcmUgJy4vY29yZSdcbkhvdHNwb3RzID0gcmVxdWlyZSAnLi9ob3RzcG90cydcbkNvbnRyb2xzID0gcmVxdWlyZSAnLi9jb250cm9scydcbkV2ZW50VHJhY2tpbmcgPSByZXF1aXJlICcuL2V2ZW50X3RyYWNraW5nJ1xuTGVnYWN5RXZlbnRUcmFja2luZyA9IHJlcXVpcmUgJy4vbGVnYWN5X2V2ZW50X3RyYWNraW5nJ1xuXG5jbGFzcyBWaWV3ZXJcbiAgICBjb25zdHJ1Y3RvcjogKEBlbCwgQG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgQF9jb3JlID0gbmV3IENvcmUgQGVsLFxuICAgICAgICAgICAgaWQ6IEBvcHRpb25zLmlkXG4gICAgICAgICAgICBwYWdlczogQG9wdGlvbnMucGFnZXNcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRXaWR0aDogQG9wdGlvbnMucGFnZVNwcmVhZFdpZHRoXG4gICAgICAgICAgICBwYWdlU3ByZWFkTWF4Wm9vbVNjYWxlOiBAb3B0aW9ucy5wYWdlU3ByZWFkTWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICBpZGxlRGVsYXk6IEBvcHRpb25zLmlkbGVEZWxheVxuICAgICAgICAgICAgcmVzaXplRGVsYXk6IEBvcHRpb25zLnJlc2l6ZURlbGF5XG4gICAgICAgICAgICBjb2xvcjogQG9wdGlvbnMuY29sb3JcbiAgICAgICAgQF9ob3RzcG90cyA9IG5ldyBIb3RzcG90cygpXG4gICAgICAgIEBfY29udHJvbHMgPSBuZXcgQ29udHJvbHMgQGVsLCBrZXlib2FyZDogQG9wdGlvbnMua2V5Ym9hcmRcbiAgICAgICAgQF9ldmVudFRyYWNraW5nID0gbmV3IEV2ZW50VHJhY2tpbmcoKVxuICAgICAgICBAX2xlZ2FjeUV2ZW50VHJhY2tpbmcgPSBuZXcgTGVnYWN5RXZlbnRUcmFja2luZygpXG4gICAgICAgIEB2aWV3U2Vzc2lvbiA9IFNHTi51dGlsLnV1aWQoKVxuXG4gICAgICAgIEBfc2V0dXBFdmVudExpc3RlbmVycygpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgQF9jb3JlLnRyaWdnZXIgJ3N0YXJ0ZWQnXG5cbiAgICAgICAgQFxuXG4gICAgZGVzdHJveTogLT5cbiAgICAgICAgQF9jb3JlLnRyaWdnZXIgJ2Rlc3Ryb3llZCdcbiAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdkZXN0cm95ZWQnXG4gICAgICAgIEBfY29udHJvbHMudHJpZ2dlciAnZGVzdHJveWVkJ1xuICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnZGVzdHJveWVkJ1xuXG4gICAgICAgIEBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIEBlbFxuXG4gICAgICAgIEBcblxuICAgIG5hdmlnYXRlVG86IChwb3NpdGlvbiwgb3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkubmF2aWdhdGVUbyBwb3NpdGlvbiwgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIGZpcnN0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkuZmlyc3Qgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIHByZXY6IChvcHRpb25zKSAtPlxuICAgICAgICBAX2NvcmUuZ2V0VmVyc28oKS5wcmV2IG9wdGlvbnNcblxuICAgICAgICBAXG5cbiAgICBuZXh0OiAob3B0aW9ucykgLT5cbiAgICAgICAgQF9jb3JlLmdldFZlcnNvKCkubmV4dCBvcHRpb25zXG5cbiAgICAgICAgQFxuXG4gICAgbGFzdDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBfY29yZS5nZXRWZXJzbygpLmxhc3Qgb3B0aW9uc1xuXG4gICAgICAgIEBcblxuICAgIF90cmFja0V2ZW50OiAoZSkgLT5cbiAgICAgICAgdHlwZSA9IGUudHlwZVxuICAgICAgICBpZFR5cGUgPSAnbGVnYWN5J1xuICAgICAgICBwcm9wZXJ0aWVzID0gcGFnZWRQdWJsaWNhdGlvbjpcbiAgICAgICAgICAgIGlkOiBbaWRUeXBlLCBAb3B0aW9ucy5pZF1cbiAgICAgICAgICAgIG93bmVkQnk6IFtpZFR5cGUsIEBvcHRpb25zLm93bmVkQnldXG4gICAgICAgIGV2ZW50VHJhY2tlciA9IEBvcHRpb25zLmV2ZW50VHJhY2tlclxuXG4gICAgICAgIHByb3BlcnRpZXNba2V5XSA9IHZhbHVlIGZvciBrZXksIHZhbHVlIG9mIGUucHJvcGVydGllc1xuXG4gICAgICAgIGV2ZW50VHJhY2tlci50cmFja0V2ZW50IHR5cGUsIHByb3BlcnRpZXMgaWYgZXZlbnRUcmFja2VyP1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgX3RyYWNrTGVnYWN5RXZlbnQ6IChlKSAtPlxuICAgICAgICBldmVudFRyYWNrZXIgPSBAb3B0aW9ucy5ldmVudFRyYWNrZXJcbiAgICAgICAgZ2VvbG9jYXRpb24gPSB7fVxuXG4gICAgICAgIGlmIGV2ZW50VHJhY2tlcj9cbiAgICAgICAgICAgIGdlb2xvY2F0aW9uLmxhdGl0dWRlID0gZXZlbnRUcmFja2VyLmxvY2F0aW9uLmxhdGl0dWRlXG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5sb25naXR1ZGUgPSBldmVudFRyYWNrZXIubG9jYXRpb24ubG9uZ2l0dWRlXG4gICAgICAgICAgICBnZW9sb2NhdGlvbi5zZW5zb3IgPSB0cnVlIGlmIGdlb2xvY2F0aW9uLmxhdGl0dWRlP1xuXG4gICAgICAgICAgICBTR04uQ29yZUtpdC5yZXF1ZXN0XG4gICAgICAgICAgICAgICAgZ2VvbG9jYXRpb246IGdlb2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCdcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3YyL2NhdGFsb2dzLyN7QG9wdGlvbnMuaWR9L2NvbGxlY3RcIlxuICAgICAgICAgICAgICAgIGhlYWRlcnM6XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeVxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgbXM6IGUubXNcbiAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb246IGUub3JpZW50YXRpb25cbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IGUucGFnZXMuam9pbiAnLCdcbiAgICAgICAgICAgICAgICAgICAgdmlld19zZXNzaW9uOiBAdmlld1Nlc3Npb25cbiAgICAgICAgXG4gICAgICAgIHJldHVyblxuXG4gICAgX3NldHVwRXZlbnRMaXN0ZW5lcnM6IC0+XG4gICAgICAgIEBfZXZlbnRUcmFja2luZy5iaW5kICd0cmFja0V2ZW50JywgKGUpID0+XG4gICAgICAgICAgICBAX3RyYWNrRXZlbnQgZVxuICAgICAgICAgICAgQF9sZWdhY3lFdmVudFRyYWNraW5nLnRyaWdnZXIgJ2V2ZW50VHJhY2tlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQF9sZWdhY3lFdmVudFRyYWNraW5nLmJpbmQgJ3RyYWNrRXZlbnQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfdHJhY2tMZWdhY3lFdmVudCBlXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAX2NvbnRyb2xzLmJpbmQgJ3ByZXYnLCAoZSkgPT5cbiAgICAgICAgICAgIEBwcmV2IGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29udHJvbHMuYmluZCAnbmV4dCcsIChlKSA9PlxuICAgICAgICAgICAgQG5leHQgZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb250cm9scy5iaW5kICdmaXJzdCcsIChlKSA9PlxuICAgICAgICAgICAgQGZpcnN0IGVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29udHJvbHMuYmluZCAnbGFzdCcsIChlKSA9PlxuICAgICAgICAgICAgQGxhc3QoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9ob3RzcG90cy5iaW5kICdob3RzcG90c1JlcXVlc3RlZCcsIChlKSA9PlxuICAgICAgICAgICAgQHRyaWdnZXIgJ2hvdHNwb3RzUmVxdWVzdGVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAX2NvcmUuYmluZCAnYXBwZWFyZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdhcHBlYXJlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhcHBlYXJlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdkaXNhcHBlYXJlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2Rpc2FwcGVhcmVkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2Rpc2FwcGVhcmVkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2JlZm9yZU5hdmlnYXRpb24nLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdiZWZvcmVOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQF9jb250cm9scy50cmlnZ2VyICdiZWZvcmVOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2JlZm9yZU5hdmlnYXRpb24nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYWZ0ZXJOYXZpZ2F0aW9uJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAnYXR0ZW1wdGVkTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ2NsaWNrZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdjbGlja2VkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ2NsaWNrZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnZG91YmxlQ2xpY2tlZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ldmVudFRyYWNraW5nLnRyaWdnZXIgJ2RvdWJsZUNsaWNrZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnZG91YmxlQ2xpY2tlZCcsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICdwcmVzc2VkJywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAncHJlc3NlZCcsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdwcmVzc2VkJywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3BhblN0YXJ0JywgKGUpID0+XG4gICAgICAgICAgICBAX2V2ZW50VHJhY2tpbmcudHJpZ2dlciAncGFuU3RhcnQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAncGFuU3RhcnQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnem9vbWVkSW4nLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICd6b29tZWRJbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRJbicsIGVcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBfY29yZS5iaW5kICd6b29tZWRPdXQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICd6b29tZWRPdXQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAnem9vbWVkT3V0JywgZVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQF9jb3JlLmJpbmQgJ3BhZ2VMb2FkZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfZXZlbnRUcmFja2luZy50cmlnZ2VyICdwYWdlTG9hZGVkJywgZVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3BhZ2VMb2FkZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAnYWZ0ZXJOYXZpZ2F0aW9uJywgKGUpID0+XG4gICAgICAgICAgICBAX2hvdHNwb3RzLnRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsIGVcbiAgICAgICAgICAgIEB0cmlnZ2VyICdhZnRlck5hdmlnYXRpb24nLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAncGFnZXNMb2FkZWQnLCAoZSkgPT5cbiAgICAgICAgICAgIEBfaG90c3BvdHMudHJpZ2dlciAncGFnZXNMb2FkZWQnLCBlXG4gICAgICAgICAgICBAdHJpZ2dlciAncGFnZXNMb2FkZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX2NvcmUuYmluZCAncmVzaXplZCcsIChlKSA9PlxuICAgICAgICAgICAgQF9ob3RzcG90cy50cmlnZ2VyICdyZXNpemVkJ1xuICAgICAgICAgICAgQHRyaWdnZXIgJ3Jlc2l6ZWQnLCBlXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBiaW5kICdob3RzcG90c1JlY2VpdmVkJywgKGUpID0+XG4gICAgICAgICAgICBAX2hvdHNwb3RzLnRyaWdnZXIgJ2hvdHNwb3RzUmVjZWl2ZWQnLFxuICAgICAgICAgICAgICAgIHBhZ2VTcHJlYWQ6IEBfY29yZS5wYWdlU3ByZWFkcy5nZXQgZS5pZFxuICAgICAgICAgICAgICAgIHZlcnNvUGFnZVNwcmVhZDogQF9jb3JlLmdldFZlcnNvKCkucGFnZVNwcmVhZHMuZmluZCAocGFnZVNwcmVhZCkgLT5cbiAgICAgICAgICAgICAgICAgICAgcGFnZVNwcmVhZC5nZXRJZCgpIGlzIGUuaWRcbiAgICAgICAgICAgICAgICByYXRpbzogZS5yYXRpb1xuICAgICAgICAgICAgICAgIHBhZ2VzOiBlLnBhZ2VzXG4gICAgICAgICAgICAgICAgaG90c3BvdHM6IGUuaG90c3BvdHNcblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbk1pY3JvRXZlbnQubWl4aW4gVmlld2VyXG5cbm1vZHVsZS5leHBvcnRzID0gVmlld2VyXG4iLCJTR04gPSByZXF1aXJlICcuLi9zZ24nXG5cbm1vZHVsZS5leHBvcnRzID0gKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2spIC0+XG4gICAgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgPyAnZ2V0J1xuICAgIHVybCA9IG9wdGlvbnMudXJsXG4gICAgaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyA/IHt9XG5cbiAgICBpZiBvcHRpb25zLnFzP1xuICAgICAgICBxdWVyeVBhcmFtcyA9IFNHTi51dGlsLmZvcm1hdFF1ZXJ5UGFyYW1zIG9wdGlvbnMucXNcblxuICAgICAgICBpZiB1cmwuaW5kZXhPZignPycpIGlzIC0xXG4gICAgICAgICAgICB1cmwgKz0gJz8nICsgcXVlcnlQYXJhbXNcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdXJsICs9ICcmJyArIHF1ZXJ5UGFyYW1zXG5cbiAgICBodHRwLm9wZW4gbWV0aG9kLnRvVXBwZXJDYXNlKCksIHVybFxuICAgIGh0dHAudGltZW91dCA9IG9wdGlvbnMudGltZW91dCBpZiBvcHRpb25zLnRpbWVvdXQ/XG4gICAgaHR0cC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlIGlmIG9wdGlvbnMudXNlQ29va2llcyBpcyB0cnVlXG5cbiAgICBpZiBvcHRpb25zLmpzb24gaXMgdHJ1ZVxuICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBoZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uJ1xuXG4gICAgZm9yIGhlYWRlciwgdmFsdWUgb2Ygb3B0aW9ucy5oZWFkZXJzXG4gICAgICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlciBoZWFkZXIsIHZhbHVlXG5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnLCAtPlxuICAgICAgICBoZWFkZXJzID0gaHR0cC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS5zcGxpdCAnXFxyXFxuJ1xuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5yZWR1Y2UgKGFjYywgY3VycmVudCwgaSkgLT5cbiAgICAgICAgICAgIHBhcnRzID0gY3VycmVudC5zcGxpdCAnOiAnXG5cbiAgICAgICAgICAgIGFjY1twYXJ0c1swXS50b0xvd2VyQ2FzZSgpXSA9IHBhcnRzWzFdXG5cbiAgICAgICAgICAgIGFjY1xuICAgICAgICAsIHt9XG4gICAgICAgIGJvZHkgPSBodHRwLnJlc3BvbnNlVGV4dFxuXG4gICAgICAgIGJvZHkgPSBKU09OLnBhcnNlIGJvZHkgaWYgb3B0aW9ucy5qc29uIGlzIHRydWVcblxuICAgICAgICBjYWxsYmFjayBudWxsLFxuICAgICAgICAgICAgc3RhdHVzQ29kZTogaHR0cC5zdGF0dXNcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgICAgIGJvZHk6IGJvZHlcblxuICAgICAgICByZXR1cm5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ2Vycm9yJywgLT5cbiAgICAgICAgY2FsbGJhY2sgbmV3IEVycm9yKClcblxuICAgICAgICByZXR1cm5cbiAgICBodHRwLmFkZEV2ZW50TGlzdGVuZXIgJ3RpbWVvdXQnLCAtPlxuICAgICAgICBjYWxsYmFjayBuZXcgRXJyb3IoKVxuXG4gICAgICAgIHJldHVyblxuICAgIGh0dHAuYWRkRXZlbnRMaXN0ZW5lciAncHJvZ3Jlc3MnLCAoZSkgLT5cbiAgICAgICAgaWYgZS5sZW5ndGhDb21wdXRhYmxlIGFuZCB0eXBlb2YgcHJvZ3Jlc3NDYWxsYmFjayBpcyAnZnVuY3Rpb24nXG4gICAgICAgICAgICBwcm9ncmVzc0NhbGxiYWNrIGUubG9hZGVkLCBlLnRvdGFsXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBpZiBvcHRpb25zLmZvcm1EYXRhP1xuICAgICAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG5cbiAgICAgICAgZm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9ucy5mb3JtRGF0YVxuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kIGtleSwgdmFsdWVcblxuICAgICAgICBodHRwLnNlbmQgZm9ybURhdGFcbiAgICBlbHNlIGlmIG9wdGlvbnMuYm9keT9cbiAgICAgICAgaWYgb3B0aW9ucy5qc29uIGlzIHRydWVcbiAgICAgICAgICAgIGh0dHAuc2VuZCBKU09OLnN0cmluZ2lmeShvcHRpb25zLmJvZHkpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGh0dHAuc2VuZCBvcHRpb25zLmJvZHlcbiAgICBlbHNlXG4gICAgICAgIGh0dHAuc2VuZCgpXG5cbiAgICByZXR1cm5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSAnLi9jb3JlJ1xuIiwiU0dOID0gcmVxdWlyZSAnLi4vc2duJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gICAga2V5OiAnc2duLSdcblxuICAgIGdldDogKGtleSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIFNHTi51dGlsLmlzTm9kZSgpXG5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICBuYW1lID0gXCIje0BrZXl9I3trZXl9PVwiXG4gICAgICAgICAgICBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCAnOydcblxuICAgICAgICAgICAgZm9yIGMgaW4gY2FcbiAgICAgICAgICAgICAgICBjdCA9IGMudHJpbSgpXG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGN0LnN1YnN0cmluZyhuYW1lLmxlbmd0aCwgY3QubGVuZ3RoKSBpZiBjdC5pbmRleE9mKG5hbWUpIGlzIDBcblxuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlIHZhbHVlXG4gICAgICAgIGNhdGNoIGVyclxuICAgICAgICAgICAgdmFsdWUgPSB7fVxuXG4gICAgICAgIHZhbHVlXG5cbiAgICBzZXQ6IChrZXksIHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gaWYgU0dOLnV0aWwuaXNOb2RlKClcblxuICAgICAgICB0cnlcbiAgICAgICAgICAgIGRheXMgPSAzNjVcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgICBzdHIgPSBKU09OLnN0cmluZ2lmeSB2YWx1ZVxuXG4gICAgICAgICAgICBkYXRlLnNldFRpbWUgZGF0ZS5nZXRUaW1lKCkgKyBkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMFxuXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBcIiN7QGtleX0je2tleX09I3tzdHJ9O2V4cGlyZXM9I3tkYXRlLnRvVVRDU3RyaW5nKCl9O3BhdGg9L1wiXG4gICAgICAgIGNhdGNoIGVyclxuXG4gICAgICAgIHJldHVyblxuXG5cbiIsIlNHTiA9IHJlcXVpcmUgJy4uL3NnbidcblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIGtleTogJ3Nnbi0nXG5cbiAgICBzdG9yYWdlOiBkbyAtPlxuICAgICAgICB0cnlcbiAgICAgICAgICAgIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlXG5cbiAgICAgICAgICAgIHN0b3JhZ2VbXCIje0BrZXl9dGVzdC1zdG9yYWdlXCJdID0gJ2Zvb2JhcidcbiAgICAgICAgICAgIGRlbGV0ZSBzdG9yYWdlW1wiI3tAa2V5fXRlc3Qtc3RvcmFnZVwiXVxuXG4gICAgICAgICAgICBzdG9yYWdlXG4gICAgICAgIGNhdGNoXG4gICAgICAgICAgICB7fVxuXG4gICAgZ2V0OiAoa2V5KSAtPlxuICAgICAgICB0cnlcbiAgICAgICAgICAgIEpTT04ucGFyc2UgQHN0b3JhZ2VbXCIje0BrZXl9I3trZXl9XCJdXG5cbiAgICBzZXQ6IChrZXksIHZhbHVlKSAtPlxuICAgICAgICB0cnlcbiAgICAgICAgICAgIEBzdG9yYWdlW1wiI3tAa2V5fSN7a2V5fVwiXSA9IEpTT04uc3RyaW5naWZ5IHZhbHVlXG5cbiAgICAgICAgQFxuIiwidXRpbCA9XG4gICAgaXNCcm93c2VyOiAtPlxuICAgICAgICB0eXBlb2YgcHJvY2VzcyBpc250ICd1bmRlZmluZWQnIGFuZCBwcm9jZXNzLmJyb3dzZXJcblxuICAgIGlzTm9kZTogLT5cbiAgICAgICAgbm90IHV0aWwuaXNCcm93c2VyKClcblxuICAgIGVycm9yOiAoZXJyLCBvcHRpb25zKSAtPlxuICAgICAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlIG9yIG51bGxcblxuICAgICAgICBpZiB0eXBlb2Ygb3B0aW9ucyBpcyAnc3RyaW5nJ1xuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBvcHRpb25zXG4gICAgICAgIGVsc2UgaWYgdHlwZW9mIG9wdGlvbnMgaXMgJ29iamVjdCcgYW5kIG9wdGlvbnM/XG4gICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG4gICAgICAgICAgICAgICAgZXJyW2tleV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICBlcnIubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSBpZiBvcHRpb25zLm1lc3NhZ2U/XG4gICAgICAgICAgICBlcnIuY29kZSA9IG9wdGlvbnMuY29kZSBvciBvcHRpb25zLm5hbWUgaWYgb3B0aW9ucy5jb2RlPyBvciBvcHRpb25zLm1lc3NhZ2U/XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBvcHRpb25zLnN0YWNrIGlmIG9wdGlvbnMuc3RhY2s/XG5cbiAgICAgICAgZXJyLm5hbWUgPSBvcHRpb25zIGFuZCBvcHRpb25zLm5hbWUgb3IgZXJyLm5hbWUgb3IgZXJyLmNvZGUgb3IgJ0Vycm9yJ1xuICAgICAgICBlcnIudGltZSA9IG5ldyBEYXRlKClcblxuICAgICAgICBlcnJcblxuICAgIHV1aWQ6IC0+XG4gICAgICAgICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UgL1t4eV0vZywgKGMpIC0+XG4gICAgICAgICAgICByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMFxuICAgICAgICAgICAgdiA9IGlmIGMgaXMgJ3gnIHRoZW4gciBlbHNlIChyICYgMHgzfDB4OClcblxuICAgICAgICAgICAgdi50b1N0cmluZyAxNlxuXG4gICAgZ2V0UXVlcnlQYXJhbTogKGZpZWxkLCB1cmwpIC0+XG4gICAgICAgIGhyZWYgPSBpZiB1cmwgdGhlbiB1cmwgZWxzZSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgICByZWcgPSBuZXcgUmVnRXhwICdbPyZdJyArIGZpZWxkICsgJz0oW14mI10qKScsICdpJ1xuICAgICAgICBzdHJpbmcgPSByZWcuZXhlYyBocmVmXG5cbiAgICAgICAgaWYgc3RyaW5nIHRoZW4gc3RyaW5nWzFdIGVsc2UgdW5kZWZpbmVkXG5cbiAgICBmb3JtYXRRdWVyeVBhcmFtczogKHF1ZXJ5UGFyYW1zID0ge30pIC0+XG4gICAgICAgIE9iamVjdFxuICAgICAgICAgICAgLmtleXMgcXVlcnlQYXJhbXNcbiAgICAgICAgICAgIC5tYXAgKGtleSkgLT4ga2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5UGFyYW1zW2tleV0pXG4gICAgICAgICAgICAuam9pbiAnJidcblxuICAgIGdldE9TOiAtPlxuICAgICAgICBuYW1lID0gbnVsbFxuICAgICAgICB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50XG5cbiAgICAgICAgaWYgdWEuaW5kZXhPZignV2luZG93cycpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnV2luZG93cydcbiAgICAgICAgZWxzZSBpZiB1YS5pbmRleE9mKCdNYWMnKSA+IC0xXG4gICAgICAgICAgICBuYW1lID0gJ21hY09TJ1xuICAgICAgICBlbHNlIGlmIHVhLmluZGV4T2YoJ1gxMScpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAndW5peCdcbiAgICAgICAgZWxzZSBpZiB1YS5pbmRleE9mKCdMaW51eCcpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnTGludXgnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignaU9TJykgPiAtMVxuICAgICAgICAgICAgbmFtZSA9ICdpT1MnXG4gICAgICAgIGVsc2UgaWYgdWEuaW5kZXhPZignQW5kcm9pZCcpID4gLTFcbiAgICAgICAgICAgIG5hbWUgPSAnQW5kcm9pZCdcblxuICAgICAgICBuYW1lXG5cbiAgICBidG9hOiAoc3RyKSAtPlxuICAgICAgICBpZiB1dGlsLmlzQnJvd3NlcigpXG4gICAgICAgICAgICBidG9hIHN0clxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBidWZmZXIgPSBudWxsXG5cbiAgICAgICAgICAgIGlmIHN0ciBpbnN0YW5jZW9mIEJ1ZmZlclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IHN0clxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBCdWZmZXIgc3RyLnRvU3RyaW5nKCksICdiaW5hcnknXG5cbiAgICAgICAgICAgIGJ1ZmZlci50b1N0cmluZyAnYmFzZTY0J1xuXG4gICAgZ2V0U2NyZWVuRGltZW5zaW9uczogLT5cbiAgICAgICAgZGVuc2l0eSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID8gMVxuICAgICAgICBsb2dpY2FsID1cbiAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuc2NyZWVuLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0XG4gICAgICAgIHBoeXNpY2FsID1cbiAgICAgICAgICAgIHdpZHRoOiBNYXRoLnJvdW5kIGxvZ2ljYWwud2lkdGggKiBkZW5zaXR5XG4gICAgICAgICAgICBoZWlnaHQ6IE1hdGgucm91bmQgbG9naWNhbC5oZWlnaHQgKiBkZW5zaXR5XG5cbiAgICAgICAgZGVuc2l0eTogZGVuc2l0eVxuICAgICAgICBsb2dpY2FsOiBsb2dpY2FsXG4gICAgICAgIHBoeXNpY2FsOiBwaHlzaWNhbFxuXG4gICAgZ2V0VXRjT2Zmc2V0U2Vjb25kczogLT5cbiAgICAgICAgbm93ID0gbmV3IERhdGUoKVxuICAgICAgICBqYW4xID0gbmV3IERhdGUgbm93LmdldEZ1bGxZZWFyKCksIDAsIDEsIDAsIDAsIDAsIDBcbiAgICAgICAgdG1wID0gamFuMS50b0dNVFN0cmluZygpXG4gICAgICAgIGphbjIgPSBuZXcgRGF0ZSB0bXAuc3Vic3RyaW5nKDAsIHRtcC5sYXN0SW5kZXhPZignICcpIC0gMSlcbiAgICAgICAgc3RkVGltZU9mZnNldCA9IChqYW4xIC0gamFuMikgLyAxMDAwXG5cbiAgICAgICAgc3RkVGltZU9mZnNldFxuXG4gICAgZ2V0VXRjRHN0T2Zmc2V0U2Vjb25kczogLT5cbiAgICAgICAgbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAgKiAtMVxuXG4gICAgZ2V0Q29sb3JCcmlnaHRuZXNzOiAoY29sb3IpIC0+XG4gICAgICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSAnIycsICcnXG4gICAgICAgIGhleCA9IHBhcnNlSW50IChoZXggKyAnJykucmVwbGFjZSgvW15hLWYwLTldL2dpLCAnJyksIDE2XG4gICAgICAgIHJnYiA9IFtdXG4gICAgICAgIHN1bSA9IDBcbiAgICAgICAgeCA9IDBcblxuICAgICAgICB3aGlsZSB4IDwgM1xuICAgICAgICAgICAgcyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygyICogeCwgMiksIDE2KVxuICAgICAgICAgICAgcmdiW3hdID0gc1xuXG4gICAgICAgICAgICBzdW0gKz0gcyBpZiBzID4gMFxuXG4gICAgICAgICAgICArK3hcblxuICAgICAgICBpZiBzdW0gPD0gMzgxIHRoZW4gJ2RhcmsnIGVsc2UgJ2xpZ2h0J1xuXG4gICAgY2h1bms6IChhcnIsIHNpemUpIC0+XG4gICAgICAgIHJlc3VsdHMgPSBbXVxuXG4gICAgICAgIHdoaWxlIGFyci5sZW5ndGhcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCBhcnIuc3BsaWNlKDAsIHNpemUpXG5cbiAgICAgICAgcmVzdWx0c1xuXG4gICAgdGhyb3R0bGU6IChmbiwgdGhyZXNob2xkID0gMjUwLCBzY29wZSkgLT5cbiAgICAgICAgbGFzdCA9IHVuZGVmaW5lZFxuICAgICAgICBkZWZlclRpbWVyID0gdW5kZWZpbmVkXG5cbiAgICAgICAgLT5cbiAgICAgICAgICAgIGNvbnRleHQgPSBzY29wZSBvciBAXG4gICAgICAgICAgICBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50c1xuXG4gICAgICAgICAgICBpZiBsYXN0IGFuZCBub3cgPCBsYXN0ICsgdGhyZXNob2xkXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0IGRlZmVyVGltZXJcblxuICAgICAgICAgICAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0IC0+XG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBub3dcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5IGNvbnRleHQsIGFyZ3NcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgLCB0aHJlc2hvbGRcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBsYXN0ID0gbm93XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkgY29udGV4dCwgYXJnc1xuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgIGxvYWRJbWFnZTogKHNyYywgY2FsbGJhY2spIC0+XG4gICAgICAgIGltZyA9IG5ldyBJbWFnZSgpXG5cbiAgICAgICAgaW1nLm9ubG9hZCA9IC0+IGNhbGxiYWNrIG51bGwsIGltZy53aWR0aCwgaW1nLmhlaWdodFxuICAgICAgICBpbWcub25lcnJvciA9IC0+IGNhbGxiYWNrIG5ldyBFcnJvcigpXG4gICAgICAgIGltZy5zcmMgPSBzcmNcblxuICAgICAgICBpbWdcblxuICAgIGRpc3RhbmNlOiAobGF0MSwgbG5nMSwgbGF0MiwgbG5nMikgLT5cbiAgICAgICAgcmFkbGF0MSA9IE1hdGguUEkgKiBsYXQxIC8gMTgwXG4gICAgICAgIHJhZGxhdDIgPSBNYXRoLlBJICogbGF0MiAvIDE4MFxuICAgICAgICB0aGV0YSA9IGxuZzEgLSBsbmcyXG4gICAgICAgIHJhZHRoZXRhID0gTWF0aC5QSSAqIHRoZXRhIC8gMTgwXG4gICAgICAgIGRpc3QgPSBNYXRoLnNpbihyYWRsYXQxKSAqIE1hdGguc2luKHJhZGxhdDIpICsgTWF0aC5jb3MocmFkbGF0MSkgKiBNYXRoLmNvcyhyYWRsYXQyKSAqIE1hdGguY29zKHJhZHRoZXRhKVxuICAgICAgICBkaXN0ID0gTWF0aC5hY29zKGRpc3QpXG4gICAgICAgIGRpc3QgPSBkaXN0ICogMTgwIC8gTWF0aC5QSVxuICAgICAgICBkaXN0ID0gZGlzdCAqIDYwICogMS4xNTE1XG4gICAgICAgIGRpc3QgPSBkaXN0ICogMS42MDkzNDQgKiAxMDAwXG5cbiAgICAgICAgZGlzdFxuXG4gICAgYXN5bmM6XG4gICAgICAgIHBhcmFsbGVsOiAoYXN5bmNDYWxscywgc2hhcmVkQ2FsbGJhY2spIC0+XG4gICAgICAgICAgICBjb3VudGVyID0gYXN5bmNDYWxscy5sZW5ndGhcbiAgICAgICAgICAgIGFsbFJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgayA9IDBcblxuICAgICAgICAgICAgbWFrZUNhbGxiYWNrID0gKGluZGV4KSAtPlxuICAgICAgICAgICAgICAgIC0+XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuICAgICAgICAgICAgICAgICAgICBpID0gMFxuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXItLVxuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIGkgPCBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2ggYXJndW1lbnRzW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICBpKytcblxuICAgICAgICAgICAgICAgICAgICBhbGxSZXN1bHRzW2luZGV4XSA9IHJlc3VsdHNcblxuICAgICAgICAgICAgICAgICAgICBzaGFyZWRDYWxsYmFjayBhbGxSZXN1bHRzIGlmIGNvdW50ZXIgaXMgMFxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICB3aGlsZSBrIDwgYXN5bmNDYWxscy5sZW5ndGhcbiAgICAgICAgICAgICAgICBhc3luY0NhbGxzW2tdIG1ha2VDYWxsYmFjayhrKVxuICAgICAgICAgICAgICAgIGsrK1xuXG4gICAgICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsXG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG52YXIgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDJcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAobGVuZ3RoKSB7XG4gIGlmIChsZW5ndGggPiBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIHZhciBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIGJ1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKGFyZylcbiAgfVxuICByZXR1cm4gZnJvbShhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbmlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgIHZhbHVlOiBudWxsLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSlcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbmZ1bmN0aW9uIGZyb20gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20odmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gTm90ZTogQ2hhbmdlIHByb3RvdHlwZSAqYWZ0ZXIqIEJ1ZmZlci5mcm9tIGlzIGRlZmluZWQgdG8gd29ya2Fyb3VuZCBDaHJvbWUgYnVnOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC8xNDhcbkJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbkJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2Moc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlIChzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHZhciBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgYnVmW2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICB2YXIgYnVmXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBidWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGxlbilcblxuICAgIGlmIChidWYubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnVmXG4gICAgfVxuXG4gICAgb2JqLmNvcHkoYnVmLCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIGJ1ZlxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmIChpc0FycmF5QnVmZmVyVmlldyhvYmopIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBudW1iZXJJc05hTihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBBcnJheS5pc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBLX01BWF9MRU5HVEhgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIEtfTUFYX0xFTkdUSC50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuIGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlciA9PT0gdHJ1ZVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoaXNBcnJheUJ1ZmZlclZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCAoYW5kIHRoZSBgaXMtYnVmZmVyYCBucG0gcGFja2FnZSlcbi8vIHRvIGRldGVjdCBhIEJ1ZmZlciBpbnN0YW5jZS4gSXQncyBub3QgcG9zc2libGUgdG8gdXNlIGBpbnN0YW5jZW9mIEJ1ZmZlcmBcbi8vIHJlbGlhYmx5IGluIGEgYnJvd3NlcmlmeSBjb250ZXh0IGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgZGlmZmVyZW50XG4vLyBjb3BpZXMgb2YgdGhlICdidWZmZXInIHBhY2thZ2UgaW4gdXNlLiBUaGlzIG1ldGhvZCB3b3JrcyBldmVuIGZvciBCdWZmZXJcbi8vIGluc3RhbmNlcyB0aGF0IHdlcmUgY3JlYXRlZCBmcm9tIGFub3RoZXIgY29weSBvZiB0aGUgYGJ1ZmZlcmAgcGFja2FnZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE1NFxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAobnVtYmVySXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggPj4+IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyAoYnl0ZXNbaSArIDFdICogMjU2KSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZylcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG4vLyBOb2RlIDAuMTAgc3VwcG9ydHMgYEFycmF5QnVmZmVyYCBidXQgbGFja3MgYEFycmF5QnVmZmVyLmlzVmlld2BcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3IChvYmopIHtcbiAgcmV0dXJuICh0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nKSAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxufVxuXG5mdW5jdGlvbiBudW1iZXJJc05hTiAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG9iaiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwiIWZ1bmN0aW9uKGdsb2JhbHMpIHtcbid1c2Ugc3RyaWN0J1xuXG52YXIgY29udmVydEhleCA9IHtcbiAgYnl0ZXNUb0hleDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAvKmlmICh0eXBlb2YgYnl0ZXMuYnl0ZUxlbmd0aCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIG5ld0J5dGVzID0gW11cblxuICAgICAgaWYgKHR5cGVvZiBieXRlcy5idWZmZXIgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGJ5dGVzID0gbmV3IERhdGFWaWV3KGJ5dGVzLmJ1ZmZlcilcbiAgICAgIGVsc2VcbiAgICAgICAgYnl0ZXMgPSBuZXcgRGF0YVZpZXcoYnl0ZXMpXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMuYnl0ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgIG5ld0J5dGVzLnB1c2goYnl0ZXMuZ2V0VWludDgoaSkpXG4gICAgICB9XG4gICAgICBieXRlcyA9IG5ld0J5dGVzXG4gICAgfSovXG4gICAgcmV0dXJuIGFyckJ5dGVzVG9IZXgoYnl0ZXMpXG4gIH0sXG4gIGhleFRvQnl0ZXM6IGZ1bmN0aW9uKGhleCkge1xuICAgIGlmIChoZXgubGVuZ3RoICUgMiA9PT0gMSkgdGhyb3cgbmV3IEVycm9yKFwiaGV4VG9CeXRlcyBjYW4ndCBoYXZlIGEgc3RyaW5nIHdpdGggYW4gb2RkIG51bWJlciBvZiBjaGFyYWN0ZXJzLlwiKVxuICAgIGlmIChoZXguaW5kZXhPZignMHgnKSA9PT0gMCkgaGV4ID0gaGV4LnNsaWNlKDIpXG4gICAgcmV0dXJuIGhleC5tYXRjaCgvLi4vZykubWFwKGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHBhcnNlSW50KHgsMTYpIH0pXG4gIH1cbn1cblxuXG4vLyBQUklWQVRFXG5cbmZ1bmN0aW9uIGFyckJ5dGVzVG9IZXgoYnl0ZXMpIHtcbiAgcmV0dXJuIGJ5dGVzLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiBwYWRMZWZ0KHgudG9TdHJpbmcoMTYpLDIpIH0pLmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIHBhZExlZnQob3JpZywgbGVuKSB7XG4gIGlmIChvcmlnLmxlbmd0aCA+IGxlbikgcmV0dXJuIG9yaWdcbiAgcmV0dXJuIEFycmF5KGxlbiAtIG9yaWcubGVuZ3RoICsgMSkuam9pbignMCcpICsgb3JpZ1xufVxuXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvL0NvbW1vbkpTXG4gIG1vZHVsZS5leHBvcnRzID0gY29udmVydEhleFxufSBlbHNlIHtcbiAgZ2xvYmFscy5jb252ZXJ0SGV4ID0gY29udmVydEhleFxufVxuXG59KHRoaXMpOyIsIiFmdW5jdGlvbihnbG9iYWxzKSB7XG4ndXNlIHN0cmljdCdcblxudmFyIGNvbnZlcnRTdHJpbmcgPSB7XG4gIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgcmV0dXJuIGJ5dGVzLm1hcChmdW5jdGlvbih4KXsgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoeCkgfSkuam9pbignJylcbiAgfSxcbiAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHguY2hhckNvZGVBdCgwKSB9KVxuICB9XG59XG5cbi8vaHR0cDovL2hvc3NhLmluLzIwMTIvMDcvMjAvdXRmLTgtaW4tamF2YXNjcmlwdC5odG1sXG5jb252ZXJ0U3RyaW5nLlVURjggPSB7XG4gICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGNvbnZlcnRTdHJpbmcuYnl0ZXNUb1N0cmluZyhieXRlcykpKVxuICB9LFxuICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgIHJldHVybiBjb252ZXJ0U3RyaW5nLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKVxuICB9XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgeyAvL0NvbW1vbkpTXG4gIG1vZHVsZS5leHBvcnRzID0gY29udmVydFN0cmluZ1xufSBlbHNlIHtcbiAgZ2xvYmFscy5jb252ZXJ0U3RyaW5nID0gY29udmVydFN0cmluZ1xufVxuXG59KHRoaXMpOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQgQ3JhaWcgQ2FtcGJlbGxcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBHQVRPUi5KU1xuICogU2ltcGxlIEV2ZW50IERlbGVnYXRpb25cbiAqXG4gKiBAdmVyc2lvbiAxLjIuNFxuICpcbiAqIENvbXBhdGlibGUgd2l0aCBJRSA5KywgRkYgMy42KywgU2FmYXJpIDUrLCBDaHJvbWVcbiAqXG4gKiBJbmNsdWRlIGxlZ2FjeS5qcyBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG9sZGVyIGJyb3dzZXJzXG4gKlxuICogICAgICAgICAgICAgLi0uXyAgIF8gXyBfIF8gXyBfIF8gX1xuICogIC4tJyctLl9fLi0nMDAgICctJyAnICcgJyAnICcgJyAnICctLlxuICogJy5fX18gJyAgICAuICAgLi0tXyctJyAnLScgJy0nIF8nLScgJy5fXG4gKiAgVjogViAndnYtJyAgICdfICAgJy4gICAgICAgLicgIF8uLicgJy4nLlxuICogICAgJz0uX19fXy49Xy4tLScgICA6Xy5fXy5fXzpfICAgJy4gICA6IDpcbiAqICAgICAgICAgICAgKCgoX19fXy4tJyAgICAgICAgJy0uICAvICAgOiA6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKC0nXFwgLicgL1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgX19fX18uLicgIC4nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICctLl9fX19fLi0nXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgX21hdGNoZXIsXG4gICAgICAgIF9sZXZlbCA9IDAsXG4gICAgICAgIF9pZCA9IDAsXG4gICAgICAgIF9oYW5kbGVycyA9IHt9LFxuICAgICAgICBfZ2F0b3JJbnN0YW5jZXMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIF9hZGRFdmVudChnYXRvciwgdHlwZSwgY2FsbGJhY2spIHtcblxuICAgICAgICAvLyBibHVyIGFuZCBmb2N1cyBkbyBub3QgYnViYmxlIHVwIGJ1dCBpZiB5b3UgdXNlIGV2ZW50IGNhcHR1cmluZ1xuICAgICAgICAvLyB0aGVuIHlvdSB3aWxsIGdldCB0aGVtXG4gICAgICAgIHZhciB1c2VDYXB0dXJlID0gdHlwZSA9PSAnYmx1cicgfHwgdHlwZSA9PSAnZm9jdXMnO1xuICAgICAgICBnYXRvci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jYW5jZWwoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBmdW5jdGlvbiB0byB1c2UgZm9yIGRldGVybWluaW5nIGlmIGFuIGVsZW1lbnRcbiAgICAgKiBtYXRjaGVzIGEgcXVlcnkgc2VsZWN0b3JcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfZ2V0TWF0Y2hlcihlbGVtZW50KSB7XG4gICAgICAgIGlmIChfbWF0Y2hlcikge1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcykge1xuICAgICAgICAgICAgX21hdGNoZXIgPSBlbGVtZW50Lm1hdGNoZXM7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9tYXRjaGVyID0gZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC5tc01hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICAgICAgX21hdGNoZXIgPSBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQub01hdGNoZXNTZWxlY3Rvcikge1xuICAgICAgICAgICAgX21hdGNoZXIgPSBlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgICAgICByZXR1cm4gX21hdGNoZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCBkb2Vzbid0IG1hdGNoIGEgbmF0aXZlIGJyb3dzZXIgbWV0aG9kXG4gICAgICAgIC8vIGZhbGwgYmFjayB0byB0aGUgZ2F0b3IgZnVuY3Rpb25cbiAgICAgICAgX21hdGNoZXIgPSBHYXRvci5tYXRjaGVzU2VsZWN0b3I7XG4gICAgICAgIHJldHVybiBfbWF0Y2hlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkZXRlcm1pbmVzIGlmIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBtYXRjaGVzIGEgZ2l2ZW4gc2VsZWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudCAtIHRoZSBlbGVtZW50IHRvIGNvbXBhcmUgYWdhaW5zdCB0aGUgc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge05vZGV9IGJvdW5kRWxlbWVudCAtIHRoZSBlbGVtZW50IHRoZSBsaXN0ZW5lciB3YXMgYXR0YWNoZWQgdG9cbiAgICAgKiBAcmV0dXJucyB7dm9pZHxOb2RlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9tYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IsIGJvdW5kRWxlbWVudCkge1xuXG4gICAgICAgIC8vIG5vIHNlbGVjdG9yIG1lYW5zIHRoaXMgZXZlbnQgd2FzIGJvdW5kIGRpcmVjdGx5IHRvIHRoaXMgZWxlbWVudFxuICAgICAgICBpZiAoc2VsZWN0b3IgPT0gJ19yb290Jykge1xuICAgICAgICAgICAgcmV0dXJuIGJvdW5kRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgbW92ZWQgdXAgdG8gdGhlIGVsZW1lbnQgeW91IGJvdW5kIHRoZSBldmVudCB0b1xuICAgICAgICAvLyB0aGVuIHdlIGhhdmUgY29tZSB0b28gZmFyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSBib3VuZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoaXMgaXMgYSBtYXRjaCB0aGVuIHdlIGFyZSBkb25lIVxuICAgICAgICBpZiAoX2dldE1hdGNoZXIoZWxlbWVudCkuY2FsbChlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhpcyBlbGVtZW50IGRpZCBub3QgbWF0Y2ggYnV0IGhhcyBhIHBhcmVudCB3ZSBzaG91bGQgdHJ5XG4gICAgICAgIC8vIGdvaW5nIHVwIHRoZSB0cmVlIHRvIHNlZSBpZiBhbnkgb2YgdGhlIHBhcmVudCBlbGVtZW50cyBtYXRjaFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSBpZiB5b3UgYXJlIGxvb2tpbmcgZm9yIGEgY2xpY2sgb24gYW4gPGE+IHRhZyBidXQgdGhlcmVcbiAgICAgICAgLy8gaXMgYSA8c3Bhbj4gaW5zaWRlIG9mIHRoZSBhIHRhZyB0aGF0IGl0IGlzIHRoZSB0YXJnZXQsXG4gICAgICAgIC8vIGl0IHNob3VsZCBzdGlsbCB3b3JrXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIF9sZXZlbCsrO1xuICAgICAgICAgICAgcmV0dXJuIF9tYXRjaGVzU2VsZWN0b3IoZWxlbWVudC5wYXJlbnROb2RlLCBzZWxlY3RvciwgYm91bmRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9hZGRIYW5kbGVyKGdhdG9yLCBldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXSkge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XSkge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF1bc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmVtb3ZlSGFuZGxlcihnYXRvciwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgdGllZCB0byB0aGlzIGVsZW1lbnQgYXQgYWxsXG4gICAgICAgIC8vIHRoZW4gZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgICAgaWYgKCFfaGFuZGxlcnNbZ2F0b3IuaWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBldmVudCB0eXBlIHNwZWNpZmllZCB0aGVuIHJlbW92ZSBhbGwgZXZlbnRzXG4gICAgICAgIC8vIGV4YW1wbGU6IEdhdG9yKGVsZW1lbnQpLm9mZigpXG4gICAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHR5cGUgaW4gX2hhbmRsZXJzW2dhdG9yLmlkXSkge1xuICAgICAgICAgICAgICAgIGlmIChfaGFuZGxlcnNbZ2F0b3IuaWRdLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9oYW5kbGVyc1tnYXRvci5pZF1bdHlwZV0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBubyBjYWxsYmFjayBvciBzZWxlY3RvciBpcyBzcGVjaWZpZWQgcmVtb3ZlIGFsbCBldmVudHMgb2YgdGhpcyB0eXBlXG4gICAgICAgIC8vIGV4YW1wbGU6IEdhdG9yKGVsZW1lbnQpLm9mZignY2xpY2snKVxuICAgICAgICBpZiAoIWNhbGxiYWNrICYmICFzZWxlY3Rvcikge1xuICAgICAgICAgICAgX2hhbmRsZXJzW2dhdG9yLmlkXVtldmVudF0gPSB7fTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGEgc2VsZWN0b3IgaXMgc3BlY2lmaWVkIGJ1dCBubyBjYWxsYmFjayByZW1vdmUgYWxsIGV2ZW50c1xuICAgICAgICAvLyBmb3IgdGhpcyBzZWxlY3RvclxuICAgICAgICAvLyBleGFtcGxlOiBHYXRvcihlbGVtZW50KS5vZmYoJ2NsaWNrJywgJy5zdWItZWxlbWVudCcpXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl07XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBoYXZlIHNwZWNpZmllZCBhbiBldmVudCB0eXBlLCBzZWxlY3RvciwgYW5kIGNhbGxiYWNrIHRoZW4gd2VcbiAgICAgICAgLy8gbmVlZCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIGNhbGxiYWNrcyB0aWVkIHRvIHRoaXMgc2VsZWN0b3IgdG9cbiAgICAgICAgLy8gYmVnaW4gd2l0aC4gIGlmIHRoZXJlIGFyZW4ndCB0aGVuIHdlIGNhbiBzdG9wIGhlcmVcbiAgICAgICAgaWYgKCFfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSB0aGVuIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGNhbGxiYWNrcyBhbmQgaWYgd2UgZmluZFxuICAgICAgICAvLyBvbmUgdGhhdCBtYXRjaGVzIHJlbW92ZSBpdCBmcm9tIHRoZSBhcnJheVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKF9oYW5kbGVyc1tnYXRvci5pZF1bZXZlbnRdW3NlbGVjdG9yXVtpXSA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBfaGFuZGxlcnNbZ2F0b3IuaWRdW2V2ZW50XVtzZWxlY3Rvcl0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2hhbmRsZUV2ZW50KGlkLCBlLCB0eXBlKSB7XG4gICAgICAgIGlmICghX2hhbmRsZXJzW2lkXVt0eXBlXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCxcbiAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgbWF0Y2gsXG4gICAgICAgICAgICBtYXRjaGVzID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGogPSAwO1xuXG4gICAgICAgIC8vIGZpbmQgYWxsIGV2ZW50cyB0aGF0IG1hdGNoXG4gICAgICAgIF9sZXZlbCA9IDA7XG4gICAgICAgIGZvciAoc2VsZWN0b3IgaW4gX2hhbmRsZXJzW2lkXVt0eXBlXSkge1xuICAgICAgICAgICAgaWYgKF9oYW5kbGVyc1tpZF1bdHlwZV0uaGFzT3duUHJvcGVydHkoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBfbWF0Y2hlc1NlbGVjdG9yKHRhcmdldCwgc2VsZWN0b3IsIF9nYXRvckluc3RhbmNlc1tpZF0uZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgR2F0b3IubWF0Y2hlc0V2ZW50KHR5cGUsIF9nYXRvckluc3RhbmNlc1tpZF0uZWxlbWVudCwgbWF0Y2gsIHNlbGVjdG9yID09ICdfcm9vdCcsIGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9sZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICBfaGFuZGxlcnNbaWRdW3R5cGVdW3NlbGVjdG9yXS5tYXRjaCA9IG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzW19sZXZlbF0gPSBfaGFuZGxlcnNbaWRdW3R5cGVdW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9wUHJvcGFnYXRpb24oKSBmYWlscyB0byBzZXQgY2FuY2VsQnViYmxlIHRvIHRydWUgaW4gV2Via2l0XG4gICAgICAgIC8vIEBzZWUgaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTYyMjcwXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8PSBfbGV2ZWw7IGkrKykge1xuICAgICAgICAgICAgaWYgKG1hdGNoZXNbaV0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbWF0Y2hlc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc1tpXVtqXS5jYWxsKG1hdGNoZXNbaV0ubWF0Y2gsIGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgR2F0b3IuY2FuY2VsKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuY2FuY2VsQnViYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kcyB0aGUgc3BlY2lmaWVkIGV2ZW50cyB0byB0aGUgZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gcmVtb3ZlXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBfYmluZChldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaywgcmVtb3ZlKSB7XG5cbiAgICAgICAgLy8gZmFpbCBzaWxlbnRseSBpZiB5b3UgcGFzcyBudWxsIG9yIHVuZGVmaW5lZCBhcyBhbiBhbGVtZW50XG4gICAgICAgIC8vIGluIHRoZSBHYXRvciBjb25zdHJ1Y3RvclxuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCEoZXZlbnRzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBldmVudHMgPSBbZXZlbnRzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mKHNlbGVjdG9yKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSAnX3Jvb3QnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlkID0gdGhpcy5pZCxcbiAgICAgICAgICAgIGk7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldEdsb2JhbENhbGxiYWNrKHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgX2hhbmRsZUV2ZW50KGlkLCBlLCB0eXBlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgX3JlbW92ZUhhbmRsZXIodGhpcywgZXZlbnRzW2ldLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIV9oYW5kbGVyc1tpZF0gfHwgIV9oYW5kbGVyc1tpZF1bZXZlbnRzW2ldXSkge1xuICAgICAgICAgICAgICAgIEdhdG9yLmFkZEV2ZW50KHRoaXMsIGV2ZW50c1tpXSwgX2dldEdsb2JhbENhbGxiYWNrKGV2ZW50c1tpXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfYWRkSGFuZGxlcih0aGlzLCBldmVudHNbaV0sIHNlbGVjdG9yLCBjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYXRvciBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gZWxlbWVudFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdhdG9yKGVsZW1lbnQsIGlkKSB7XG5cbiAgICAgICAgLy8gY2FsbGVkIGFzIGZ1bmN0aW9uXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBHYXRvcikpIHtcbiAgICAgICAgICAgIC8vIG9ubHkga2VlcCBvbmUgR2F0b3IgaW5zdGFuY2UgcGVyIG5vZGUgdG8gbWFrZSBzdXJlIHRoYXRcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNyZWF0ZSBhIHRvbiBvZiBuZXcgb2JqZWN0cyBpZiB5b3Ugd2FudCB0byBkZWxlZ2F0ZVxuICAgICAgICAgICAgLy8gbXVsdGlwbGUgZXZlbnRzIGZyb20gdGhlIHNhbWUgbm9kZVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGZvciBleGFtcGxlOiBHYXRvcihkb2N1bWVudCkub24oLi4uXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gX2dhdG9ySW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9nYXRvckluc3RhbmNlc1trZXldLmVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9nYXRvckluc3RhbmNlc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2lkKys7XG4gICAgICAgICAgICBfZ2F0b3JJbnN0YW5jZXNbX2lkXSA9IG5ldyBHYXRvcihlbGVtZW50LCBfaWQpO1xuXG4gICAgICAgICAgICByZXR1cm4gX2dhdG9ySW5zdGFuY2VzW19pZF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkcyBhbiBldmVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBHYXRvci5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gX2JpbmQuY2FsbCh0aGlzLCBldmVudHMsIHNlbGVjdG9yLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHJlbW92ZXMgYW4gZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5fSBldmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgR2F0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50cywgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBfYmluZC5jYWxsKHRoaXMsIGV2ZW50cywgc2VsZWN0b3IsIGNhbGxiYWNrLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgR2F0b3IubWF0Y2hlc1NlbGVjdG9yID0gZnVuY3Rpb24oKSB7fTtcbiAgICBHYXRvci5jYW5jZWwgPSBfY2FuY2VsO1xuICAgIEdhdG9yLmFkZEV2ZW50ID0gX2FkZEV2ZW50O1xuICAgIEdhdG9yLm1hdGNoZXNFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gR2F0b3I7XG4gICAgfVxuXG4gICAgd2luZG93LkdhdG9yID0gR2F0b3I7XG59KSAoKTtcbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwiLyoqXG4gKiBNaWNyb0V2ZW50IC0gdG8gbWFrZSBhbnkganMgb2JqZWN0IGFuIGV2ZW50IGVtaXR0ZXIgKHNlcnZlciBvciBicm93c2VyKVxuICogXG4gKiAtIHB1cmUgamF2YXNjcmlwdCAtIHNlcnZlciBjb21wYXRpYmxlLCBicm93c2VyIGNvbXBhdGlibGVcbiAqIC0gZG9udCByZWx5IG9uIHRoZSBicm93c2VyIGRvbXNcbiAqIC0gc3VwZXIgc2ltcGxlIC0geW91IGdldCBpdCBpbW1lZGlhdGx5LCBubyBtaXN0ZXJ5LCBubyBtYWdpYyBpbnZvbHZlZFxuICpcbiAqIC0gY3JlYXRlIGEgTWljcm9FdmVudERlYnVnIHdpdGggZ29vZGllcyB0byBkZWJ1Z1xuICogICAtIG1ha2UgaXQgc2FmZXIgdG8gdXNlXG4qL1xuXG52YXIgTWljcm9FdmVudFx0PSBmdW5jdGlvbigpe31cbk1pY3JvRXZlbnQucHJvdG90eXBlXHQ9IHtcblx0YmluZFx0OiBmdW5jdGlvbihldmVudCwgZmN0KXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF1cdHx8IFtdO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmY3QpO1xuXHR9LFxuXHR1bmJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XS5zcGxpY2UodGhpcy5fZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZjdCksIDEpO1xuXHR9LFxuXHR0cmlnZ2VyXHQ6IGZ1bmN0aW9uKGV2ZW50IC8qICwgYXJncy4uLiAqLyl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZXZlbnRzW2V2ZW50XVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBtaXhpbiB3aWxsIGRlbGVnYXRlIGFsbCBNaWNyb0V2ZW50LmpzIGZ1bmN0aW9uIGluIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAqXG4gKiAtIHJlcXVpcmUoJ01pY3JvRXZlbnQnKS5taXhpbihGb29iYXIpIHdpbGwgbWFrZSBGb29iYXIgYWJsZSB0byB1c2UgTWljcm9FdmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgc3VwcG9ydCBNaWNyb0V2ZW50XG4qL1xuTWljcm9FdmVudC5taXhpblx0PSBmdW5jdGlvbihkZXN0T2JqZWN0KXtcblx0dmFyIHByb3BzXHQ9IFsnYmluZCcsICd1bmJpbmQnLCAndHJpZ2dlciddO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICsrKXtcblx0XHRkZXN0T2JqZWN0LnByb3RvdHlwZVtwcm9wc1tpXV1cdD0gTWljcm9FdmVudC5wcm90b3R5cGVbcHJvcHNbaV1dO1xuXHR9XG59XG5cbi8vIGV4cG9ydCBpbiBjb21tb24ganNcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmICgnZXhwb3J0cycgaW4gbW9kdWxlKSl7XG5cdG1vZHVsZS5leHBvcnRzXHQ9IE1pY3JvRXZlbnRcbn1cbiIsIi8qIVxuICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XG4gKiBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzXG4gKi9cblxuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSBNdXN0YWNoZTogdHJ1ZSovXG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZSAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiB0eXBlb2YgZXhwb3J0cy5ub2RlTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMpOyAvLyBDb21tb25KU1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7IC8vIEFNRFxuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5NdXN0YWNoZSA9IHt9O1xuICAgIGZhY3RvcnkoZ2xvYmFsLk11c3RhY2hlKTsgLy8gc2NyaXB0LCB3c2gsIGFzcFxuICB9XG59KHRoaXMsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeSAobXVzdGFjaGUpIHtcblxuICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyIChvYmopIHtcbiAgICByZXR1cm4gaXNBcnJheShvYmopID8gJ2FycmF5JyA6IHR5cGVvZiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVSZWdFeHAgKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eSAob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG4gIGZ1bmN0aW9uIHRlc3RSZWdFeHAgKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRlc3RSZWdFeHAobm9uU3BhY2VSZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcvJzogJyYjeDJGOycsXG4gICAgJ2AnOiAnJiN4NjA7JyxcbiAgICAnPSc6ICcmI3gzRDsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbCAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcCAocykge1xuICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIGVxdWFsc1JlID0gL1xccyo9LztcbiAgdmFyIGN1cmx5UmUgPSAvXFxzKlxcfS87XG4gIHZhciB0YWdSZSA9IC8jfFxcXnxcXC98PnxcXHt8Jnw9fCEvO1xuXG4gIC8qKlxuICAgKiBCcmVha3MgdXAgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgc3RyaW5nIGludG8gYSB0cmVlIG9mIHRva2Vucy4gSWYgdGhlIGB0YWdzYFxuICAgKiBhcmd1bWVudCBpcyBnaXZlbiBoZXJlIGl0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d28gc3RyaW5nIHZhbHVlczogdGhlXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gbXVzdGFjaGUudGFncykuXG4gICAqXG4gICAqIEEgdG9rZW4gaXMgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCA0IGVsZW1lbnRzLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGVcbiAgICogbXVzdGFjaGUgc3ltYm9sIHRoYXQgd2FzIHVzZWQgaW5zaWRlIHRoZSB0YWcsIGUuZy4gXCIjXCIgb3IgXCImXCIuIElmIHRoZSB0YWdcbiAgICogZGlkIG5vdCBjb250YWluIGEgc3ltYm9sIChpLmUuIHt7bXlWYWx1ZX19KSB0aGlzIGVsZW1lbnQgaXMgXCJuYW1lXCIuIEZvclxuICAgKiBhbGwgdGV4dCB0aGF0IGFwcGVhcnMgb3V0c2lkZSBhIHN5bWJvbCB0aGlzIGVsZW1lbnQgaXMgXCJ0ZXh0XCIuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIHRva2VuIGlzIGl0cyBcInZhbHVlXCIuIEZvciBtdXN0YWNoZSB0YWdzIHRoaXMgaXNcbiAgICogd2hhdGV2ZXIgZWxzZSB3YXMgaW5zaWRlIHRoZSB0YWcgYmVzaWRlcyB0aGUgb3BlbmluZyBzeW1ib2wuIEZvciB0ZXh0IHRva2Vuc1xuICAgKiB0aGlzIGlzIHRoZSB0ZXh0IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIHRoaXJkIGFuZCBmb3VydGggZWxlbWVudHMgb2YgdGhlIHRva2VuIGFyZSB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzLFxuICAgKiByZXNwZWN0aXZlbHksIG9mIHRoZSB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIFRva2VucyB0aGF0IGFyZSB0aGUgcm9vdCBub2RlIG9mIGEgc3VidHJlZSBjb250YWluIHR3byBtb3JlIGVsZW1lbnRzOiAxKSBhblxuICAgKiBhcnJheSBvZiB0b2tlbnMgaW4gdGhlIHN1YnRyZWUgYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgYXRcbiAgICogd2hpY2ggdGhlIGNsb3NpbmcgdGFnIGZvciB0aGF0IHNlY3Rpb24gYmVnaW5zLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlICgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyAodGFnc1RvQ29tcGlsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0YWdzVG9Db21waWxlID09PSAnc3RyaW5nJylcbiAgICAgICAgdGFnc1RvQ29tcGlsZSA9IHRhZ3NUb0NvbXBpbGUuc3BsaXQoc3BhY2VSZSwgMik7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWdzVG9Db21waWxlKSB8fCB0YWdzVG9Db21waWxlLmxlbmd0aCAhPT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3M6ICcgKyB0YWdzVG9Db21waWxlKTtcblxuICAgICAgb3BlbmluZ1RhZ1JlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkgKyAnXFxcXHMqJyk7XG4gICAgICBjbG9zaW5nVGFnUmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICAgIGNsb3NpbmdDdXJseVJlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCgnfScgKyB0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgfVxuXG4gICAgY29tcGlsZVRhZ3ModGFncyB8fCBtdXN0YWNoZS50YWdzKTtcblxuICAgIHZhciBzY2FubmVyID0gbmV3IFNjYW5uZXIodGVtcGxhdGUpO1xuXG4gICAgdmFyIHN0YXJ0LCB0eXBlLCB2YWx1ZSwgY2hyLCB0b2tlbiwgb3BlblNlY3Rpb247XG4gICAgd2hpbGUgKCFzY2FubmVyLmVvcygpKSB7XG4gICAgICBzdGFydCA9IHNjYW5uZXIucG9zO1xuXG4gICAgICAvLyBNYXRjaCBhbnkgdGV4dCBiZXR3ZWVuIHRhZ3MuXG4gICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKG9wZW5pbmdUYWdSZSk7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGkgPCB2YWx1ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgY2hyID0gdmFsdWUuY2hhckF0KGkpO1xuXG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjaHIpKSB7XG4gICAgICAgICAgICBzcGFjZXMucHVzaCh0b2tlbnMubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsgJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDEgXSk7XG4gICAgICAgICAgc3RhcnQgKz0gMTtcblxuICAgICAgICAgIC8vIENoZWNrIGZvciB3aGl0ZXNwYWNlIG9uIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICAgICAgaWYgKGNociA9PT0gJ1xcbicpXG4gICAgICAgICAgICBzdHJpcFNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIG9wZW5pbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4ob3BlbmluZ1RhZ1JlKSlcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGhhc1RhZyA9IHRydWU7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHR5cGUuXG4gICAgICB0eXBlID0gc2Nhbm5lci5zY2FuKHRhZ1JlKSB8fCAnbmFtZSc7XG4gICAgICBzY2FubmVyLnNjYW4od2hpdGVSZSk7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHZhbHVlLlxuICAgICAgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gWyB0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zIF07XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0YWdzIGZvciB0aGUgbmV4dCB0aW1lIGFyb3VuZC5cbiAgICAgICAgY29tcGlsZVRhZ3ModmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gb3BlbiBzZWN0aW9ucyB3aGVuIHdlJ3JlIGRvbmUuXG4gICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgIGlmIChvcGVuU2VjdGlvbilcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgcmV0dXJuIG5lc3RUb2tlbnMoc3F1YXNoVG9rZW5zKHRva2VucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHRoZSB2YWx1ZXMgb2YgY29uc2VjdXRpdmUgdGV4dCB0b2tlbnMgaW4gdGhlIGdpdmVuIGB0b2tlbnNgIGFycmF5XG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxuICAgKi9cbiAgZnVuY3Rpb24gc3F1YXNoVG9rZW5zICh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2VucyAodG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lciAoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWlsID0gc3RyaW5nO1xuICAgIHRoaXMucG9zID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5lb3MgPSBmdW5jdGlvbiBlb3MgKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuIChyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbCAocmUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnRhaWwuc2VhcmNoKHJlKSwgbWF0Y2g7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbDtcbiAgICAgICAgdGhpcy50YWlsID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtYXRjaCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMucG9zICs9IG1hdGNoLmxlbmd0aDtcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHJlbmRlcmluZyBjb250ZXh0IGJ5IHdyYXBwaW5nIGEgdmlldyBvYmplY3QgYW5kXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIGZ1bmN0aW9uIENvbnRleHQgKHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7ICcuJzogdGhpcy52aWV3IH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lIGluIHRoaXMgY29udGV4dCwgdHJhdmVyc2luZ1xuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwIChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlciAoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGlzIHdyaXRlci5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5wYXJzZSh0ZW1wbGF0ZSk7XG4gICAgdmFyIGNvbnRleHQgPSAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCB1c2luZ1xuICAgKiB0aGUgZ2l2ZW4gYGNvbnRleHRgIGFuZCBgcGFydGlhbHNgLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgYG9yaWdpbmFsVGVtcGxhdGVgIGlzIG9ubHkgZXZlciB1c2VkIHRvIGV4dHJhY3QgdGhlIHBvcnRpb25cbiAgICogb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgd2FzIGNvbnRhaW5lZCBpbiBhIGhpZ2hlci1vcmRlciBzZWN0aW9uLlxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxuICAgKiBiZSBvbWl0dGVkLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnMgKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG5cbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN5bWJvbCA9IHRva2VuWzBdO1xuXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICdeJykgdmFsdWUgPSB0aGlzLnJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICc+JykgdmFsdWUgPSB0aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnbmFtZScpIHZhbHVlID0gdGhpcy5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAndGV4dCcpIHZhbHVlID0gdGhpcy5yYXdWYWx1ZSh0b2tlbik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiByZW5kZXJTZWN0aW9uICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyICh0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0LCBwYXJ0aWFscyk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGogPCB2YWx1ZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg2XG4gICAgaWYgKCF2YWx1ZSB8fCAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSlcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwgKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSAodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUgKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIG11c3RhY2hlLmVzY2FwZSh2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZSA9IGZ1bmN0aW9uIHJhd1ZhbHVlICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjMuMCc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbICd7eycsICd9fScgXTtcblxuICAvLyBBbGwgaGlnaC1sZXZlbCBtdXN0YWNoZS4qIGZ1bmN0aW9ucyB1c2UgdGhpcyB3cml0ZXIuXG4gIHZhciBkZWZhdWx0V3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUhIFRlbXBsYXRlIHNob3VsZCBiZSBhIFwic3RyaW5nXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FyZ3VtZW50IGZvciBtdXN0YWNoZSNyZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKScpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC4sXG4gIC8qZXNsaW50LWRpc2FibGUgKi8gLy8gZXNsaW50IHdhbnRzIGNhbWVsIGNhc2VkIGZ1bmN0aW9uIG5hbWVcbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uIHRvX2h0bWwgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbiAgcmV0dXJuIG11c3RhY2hlO1xufSkpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIiFmdW5jdGlvbihnbG9iYWxzKSB7XG4ndXNlIHN0cmljdCdcblxudmFyIF9pbXBvcnRzID0ge31cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7IC8vQ29tbW9uSlNcbiAgX2ltcG9ydHMuYnl0ZXNUb0hleCA9IHJlcXVpcmUoJ2NvbnZlcnQtaGV4JykuYnl0ZXNUb0hleFxuICBfaW1wb3J0cy5jb252ZXJ0U3RyaW5nID0gcmVxdWlyZSgnY29udmVydC1zdHJpbmcnKVxuICBtb2R1bGUuZXhwb3J0cyA9IHNoYTI1NlxufSBlbHNlIHtcbiAgX2ltcG9ydHMuYnl0ZXNUb0hleCA9IGdsb2JhbHMuY29udmVydEhleC5ieXRlc1RvSGV4XG4gIF9pbXBvcnRzLmNvbnZlcnRTdHJpbmcgPSBnbG9iYWxzLmNvbnZlcnRTdHJpbmdcbiAgZ2xvYmFscy5zaGEyNTYgPSBzaGEyNTZcbn1cblxuLypcbkNyeXB0b0pTIHYzLjEuMlxuY29kZS5nb29nbGUuY29tL3AvY3J5cHRvLWpzXG4oYykgMjAwOS0yMDEzIGJ5IEplZmYgTW90dC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbmNvZGUuZ29vZ2xlLmNvbS9wL2NyeXB0by1qcy93aWtpL0xpY2Vuc2VcbiovXG5cbi8vIEluaXRpYWxpemF0aW9uIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcbnZhciBLID0gW11cblxuLy8gQ29tcHV0ZSBjb25zdGFudHNcbiFmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGlzUHJpbWUobikge1xuICAgIHZhciBzcXJ0TiA9IE1hdGguc3FydChuKTtcbiAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG4gICAgICBpZiAoIShuICUgZmFjdG9yKSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcbiAgICByZXR1cm4gKChuIC0gKG4gfCAwKSkgKiAweDEwMDAwMDAwMCkgfCAwXG4gIH1cblxuICB2YXIgbiA9IDJcbiAgdmFyIG5QcmltZSA9IDBcbiAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG4gICAgaWYgKGlzUHJpbWUobikpIHtcbiAgICAgIEtbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAzKSlcbiAgICAgIG5QcmltZSsrXG4gICAgfVxuXG4gICAgbisrXG4gIH1cbn0oKVxuXG52YXIgYnl0ZXNUb1dvcmRzID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gIHZhciB3b3JkcyA9IFtdXG4gIGZvciAodmFyIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpIHtcbiAgICB3b3Jkc1tiID4+PiA1XSB8PSBieXRlc1tpXSA8PCAoMjQgLSBiICUgMzIpXG4gIH1cbiAgcmV0dXJuIHdvcmRzXG59XG5cbnZhciB3b3Jkc1RvQnl0ZXMgPSBmdW5jdGlvbiAod29yZHMpIHtcbiAgdmFyIGJ5dGVzID0gW11cbiAgZm9yICh2YXIgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KSB7XG4gICAgYnl0ZXMucHVzaCgod29yZHNbYiA+Pj4gNV0gPj4+ICgyNCAtIGIgJSAzMikpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZXNcbn1cblxuLy8gUmV1c2FibGUgb2JqZWN0XG52YXIgVyA9IFtdXG5cbnZhciBwcm9jZXNzQmxvY2sgPSBmdW5jdGlvbiAoSCwgTSwgb2Zmc2V0KSB7XG4gIC8vIFdvcmtpbmcgdmFyaWFibGVzXG4gIHZhciBhID0gSFswXSwgYiA9IEhbMV0sIGMgPSBIWzJdLCBkID0gSFszXVxuICB2YXIgZSA9IEhbNF0sIGYgPSBIWzVdLCBnID0gSFs2XSwgaCA9IEhbN11cblxuICAgIC8vIENvbXB1dGF0aW9uXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgIGlmIChpIDwgMTYpIHtcbiAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMFxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZ2FtbWEweCA9IFdbaSAtIDE1XVxuICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMHggPDwgMTQpIHwgKGdhbW1hMHggPj4+IDE4KSkgXlxuICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMylcblxuICAgICAgdmFyIGdhbW1hMXggPSBXW2kgLSAyXTtcbiAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cbiAgICAgICAgICAgICAgICAgICAgKChnYW1tYTF4IDw8IDEzKSB8IChnYW1tYTF4ID4+PiAxOSkpIF5cbiAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKVxuXG4gICAgICBXW2ldID0gZ2FtbWEwICsgV1tpIC0gN10gKyBnYW1tYTEgKyBXW2kgLSAxNl07XG4gICAgfVxuXG4gICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcbiAgICB2YXIgbWFqID0gKGEgJiBiKSBeIChhICYgYykgXiAoYiAmIGMpO1xuXG4gICAgdmFyIHNpZ21hMCA9ICgoYSA8PCAzMCkgfCAoYSA+Pj4gMikpIF4gKChhIDw8IDE5KSB8IChhID4+PiAxMykpIF4gKChhIDw8IDEwKSB8IChhID4+PiAyMikpO1xuICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuICAgIHZhciB0MSA9IGggKyBzaWdtYTEgKyBjaCArIEtbaV0gKyBXW2ldO1xuICAgIHZhciB0MiA9IHNpZ21hMCArIG1hajtcblxuICAgIGggPSBnO1xuICAgIGcgPSBmO1xuICAgIGYgPSBlO1xuICAgIGUgPSAoZCArIHQxKSB8IDA7XG4gICAgZCA9IGM7XG4gICAgYyA9IGI7XG4gICAgYiA9IGE7XG4gICAgYSA9ICh0MSArIHQyKSB8IDA7XG4gIH1cblxuICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG4gIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcbiAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG4gIEhbNF0gPSAoSFs0XSArIGUpIHwgMDtcbiAgSFs1XSA9IChIWzVdICsgZikgfCAwO1xuICBIWzZdID0gKEhbNl0gKyBnKSB8IDA7XG4gIEhbN10gPSAoSFs3XSArIGgpIHwgMDtcbn1cblxuZnVuY3Rpb24gc2hhMjU2KG1lc3NhZ2UsIG9wdGlvbnMpIHs7XG4gIGlmIChtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBTdHJpbmcpIHtcbiAgICBtZXNzYWdlID0gX2ltcG9ydHMuY29udmVydFN0cmluZy5VVEY4LnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XG4gIH1cblxuICB2YXIgSCA9WyAweDZBMDlFNjY3LCAweEJCNjdBRTg1LCAweDNDNkVGMzcyLCAweEE1NEZGNTNBLFxuICAgICAgICAgICAweDUxMEU1MjdGLCAweDlCMDU2ODhDLCAweDFGODNEOUFCLCAweDVCRTBDRDE5IF07XG5cbiAgdmFyIG0gPSBieXRlc1RvV29yZHMobWVzc2FnZSk7XG4gIHZhciBsID0gbWVzc2FnZS5sZW5ndGggKiA4O1xuXG4gIG1bbCA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGwgJSAzMik7XG4gIG1bKChsICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsO1xuXG4gIGZvciAodmFyIGk9MCA7IGk8bS5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBwcm9jZXNzQmxvY2soSCwgbSwgaSk7XG4gIH1cblxuICB2YXIgZGlnZXN0Ynl0ZXMgPSB3b3Jkc1RvQnl0ZXMoSCk7XG4gIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcbiAgICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5hc1N0cmluZyA/IF9pbXBvcnRzLmNvbnZlcnRTdHJpbmcuYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxuICAgICAgICAgX2ltcG9ydHMuYnl0ZXNUb0hleChkaWdlc3RieXRlcylcbn1cblxuc2hhMjU2LngyID0gZnVuY3Rpb24obWVzc2FnZSwgb3B0aW9ucykge1xuICByZXR1cm4gc2hhMjU2KHNoYTI1NihtZXNzYWdlLCB7IGFzQnl0ZXM6dHJ1ZSB9KSwgb3B0aW9ucylcbn1cblxufSh0aGlzKTtcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBBbmltYXRpb25cbiAgICBjb25zdHJ1Y3RvcjogKEBlbCkgLT5cbiAgICAgICAgQHJ1biA9IDBcblxuICAgICAgICByZXR1cm5cblxuICAgIGFuaW1hdGU6IChvcHRpb25zID0ge30sIGNhbGxiYWNrID0gLT4pIC0+XG4gICAgICAgIHggPSBvcHRpb25zLnggPyAwXG4gICAgICAgIHkgPSBvcHRpb25zLnkgPyAwXG4gICAgICAgIHNjYWxlID0gb3B0aW9ucy5zY2FsZSA/IDFcbiAgICAgICAgZWFzaW5nID0gb3B0aW9ucy5lYXNpbmcgPyAnZWFzZS1vdXQnXG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiA/IDBcbiAgICAgICAgcnVuID0gKytAcnVuXG4gICAgICAgIHRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoI3t4fSwgI3t5fSwgMHB4KSBzY2FsZTNkKCN7c2NhbGV9LCAje3NjYWxlfSwgMSlcIlxuXG4gICAgICAgIGlmIEBlbC5zdHlsZS50cmFuc2Zvcm0gaXMgdHJhbnNmb3JtXG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIGVsc2UgaWYgZHVyYXRpb24gPiAwXG4gICAgICAgICAgICB0cmFuc2l0aW9uRW5kID0gPT5cbiAgICAgICAgICAgICAgICByZXR1cm4gaWYgcnVuIGlzbnQgQHJ1blxuXG4gICAgICAgICAgICAgICAgQGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIgJ3RyYW5zaXRpb25lbmQnLCB0cmFuc2l0aW9uRW5kXG4gICAgICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcblxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICBAZWwuYWRkRXZlbnRMaXN0ZW5lciAndHJhbnNpdGlvbmVuZCcsIHRyYW5zaXRpb25FbmQsIGZhbHNlXG5cbiAgICAgICAgICAgIEBlbC5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gI3tlYXNpbmd9ICN7ZHVyYXRpb259bXNcIlxuICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAZWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICAgICAgQGVsLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuXG4gICAgICAgICAgICBjYWxsYmFjaygpXG5cbiAgICAgICAgQFxuIiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQYWdlU3ByZWFkXG4gICAgY29uc3RydWN0b3I6IChAZWwsIEBvcHRpb25zID0ge30pIC0+XG4gICAgICAgIEB2aXNpYmlsaXR5ID0gJ2dvbmUnXG4gICAgICAgIEBwb3NpdGlvbmVkID0gZmFsc2VcbiAgICAgICAgQGFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIEBpZCA9IEBvcHRpb25zLmlkXG4gICAgICAgIEB0eXBlID0gQG9wdGlvbnMudHlwZVxuICAgICAgICBAcGFnZUlkcyA9IEBvcHRpb25zLnBhZ2VJZHNcbiAgICAgICAgQHdpZHRoID0gQG9wdGlvbnMud2lkdGhcbiAgICAgICAgQGxlZnQgPSBAb3B0aW9ucy5sZWZ0XG4gICAgICAgIEBtYXhab29tU2NhbGUgPSBAb3B0aW9ucy5tYXhab29tU2NhbGVcblxuICAgICAgICByZXR1cm5cblxuICAgIGlzWm9vbWFibGU6IC0+XG4gICAgICAgIEBnZXRNYXhab29tU2NhbGUoKSA+IDEgYW5kIEBnZXRFbCgpLmdldEF0dHJpYnV0ZSgnZGF0YS16b29tYWJsZScpIGlzbnQgJ2ZhbHNlJ1xuXG4gICAgZ2V0RWw6IC0+XG4gICAgICAgIEBlbFxuXG4gICAgZ2V0T3ZlcmxheUVsczogLT5cbiAgICAgICAgQGdldEVsKCkucXVlcnlTZWxlY3RvckFsbCAnLnZlcnNvX19vdmVybGF5J1xuXG4gICAgZ2V0UGFnZUVsczogLT5cbiAgICAgICAgQGdldEVsKCkucXVlcnlTZWxlY3RvckFsbCAnLnZlcnNvX19wYWdlJ1xuXG4gICAgZ2V0UmVjdDogLT5cbiAgICAgICAgQGdldEVsKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGdldENvbnRlbnRSZWN0OiAtPlxuICAgICAgICByZWN0ID1cbiAgICAgICAgICAgIHRvcDogbnVsbFxuICAgICAgICAgICAgbGVmdDogbnVsbFxuICAgICAgICAgICAgcmlnaHQ6IG51bGxcbiAgICAgICAgICAgIGJvdHRvbTogbnVsbFxuICAgICAgICAgICAgd2lkdGg6IG51bGxcbiAgICAgICAgICAgIGhlaWdodDogbnVsbFxuICAgICAgICAgICAgXG4gICAgICAgIGZvciBwYWdlRWwgaW4gQGdldFBhZ2VFbHMoKVxuICAgICAgICAgICAgcGFnZVJlY3QgPSBwYWdlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICAgICAgcmVjdC50b3AgPSBwYWdlUmVjdC50b3AgaWYgcGFnZVJlY3QudG9wIDwgcmVjdC50b3Agb3Igbm90IHJlY3QudG9wP1xuICAgICAgICAgICAgcmVjdC5sZWZ0ID0gcGFnZVJlY3QubGVmdCBpZiBwYWdlUmVjdC5sZWZ0IDwgcmVjdC5sZWZ0IG9yIG5vdCByZWN0LmxlZnQ/XG4gICAgICAgICAgICByZWN0LnJpZ2h0ID0gcGFnZVJlY3QucmlnaHQgaWYgcGFnZVJlY3QucmlnaHQgPiByZWN0LnJpZ2h0IG9yIG5vdCByZWN0LnJpZ2h0P1xuICAgICAgICAgICAgcmVjdC5ib3R0b20gPSBwYWdlUmVjdC5ib3R0b20gaWYgcGFnZVJlY3QuYm90dG9tID4gcmVjdC5ib3R0b20gb3Igbm90IHJlY3QuYm90dG9tP1xuXG4gICAgICAgIHJlY3QudG9wID0gcmVjdC50b3AgPyAwXG4gICAgICAgIHJlY3QubGVmdCA9IHJlY3QubGVmdCA/IDBcbiAgICAgICAgcmVjdC5yaWdodCA9IHJlY3QucmlnaHQgPyAwXG4gICAgICAgIHJlY3QuYm90dG9tID0gcmVjdC5ib3R0b20gPyAwXG4gICAgICAgIHJlY3Qud2lkdGggPSByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0XG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcFxuXG4gICAgICAgIHJlY3RcblxuICAgIGdldElkOiAtPlxuICAgICAgICBAaWRcblxuICAgIGdldFR5cGU6IC0+XG4gICAgICAgIEB0eXBlXG5cbiAgICBnZXRQYWdlSWRzOiAtPlxuICAgICAgICBAcGFnZUlkc1xuXG4gICAgZ2V0V2lkdGg6IC0+XG4gICAgICAgIEB3aWR0aFxuXG4gICAgZ2V0TGVmdDogLT5cbiAgICAgICAgQGxlZnRcblxuICAgIGdldE1heFpvb21TY2FsZTogLT5cbiAgICAgICAgQG1heFpvb21TY2FsZVxuXG4gICAgZ2V0VmlzaWJpbGl0eTogLT5cbiAgICAgICAgQHZpc2liaWxpdHlcblxuICAgIHNldFZpc2liaWxpdHk6ICh2aXNpYmlsaXR5KSAtPlxuICAgICAgICBpZiBAdmlzaWJpbGl0eSBpc250IHZpc2liaWxpdHlcbiAgICAgICAgICAgIEBnZXRFbCgpLnN0eWxlLmRpc3BsYXkgPSBpZiB2aXNpYmlsaXR5IGlzICd2aXNpYmxlJyB0aGVuICdibG9jaycgZWxzZSAnbm9uZSdcblxuICAgICAgICAgICAgQHZpc2liaWxpdHkgPSB2aXNpYmlsaXR5XG5cbiAgICAgICAgQFxuXG4gICAgcG9zaXRpb246IC0+XG4gICAgICAgIGlmIEBwb3NpdGlvbmVkIGlzIGZhbHNlXG4gICAgICAgICAgICBAZ2V0RWwoKS5zdHlsZS5sZWZ0ID0gXCIje0BnZXRMZWZ0KCl9JVwiXG5cbiAgICAgICAgICAgIEBwb3NpdGlvbmVkID0gdHJ1ZVxuXG4gICAgICAgIEBcblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAZ2V0RWwoKS5zZXRBdHRyaWJ1dGUgJ2RhdGEtYWN0aXZlJywgQGFjdGl2ZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZGVhY3RpdmF0ZTogLT5cbiAgICAgICAgQGFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIEBnZXRFbCgpLnNldEF0dHJpYnV0ZSAnZGF0YS1hY3RpdmUnLCBAYWN0aXZlXG5cbiAgICAgICAgcmV0dXJuXG4iLCJIYW1tZXIgPSByZXF1aXJlICdoYW1tZXJqcydcbk1pY3JvRXZlbnQgPSByZXF1aXJlICdtaWNyb2V2ZW50J1xuUGFnZVNwcmVhZCA9IHJlcXVpcmUgJy4vcGFnZV9zcHJlYWQnXG5BbmltYXRpb24gPSByZXF1aXJlICcuL2FuaW1hdGlvbidcblxuY2xhc3MgVmVyc29cbiAgICBjb25zdHJ1Y3RvcjogKEBlbCwgQG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgQHN3aXBlVmVsb2NpdHkgPSBAb3B0aW9ucy5zd2lwZVZlbG9jaXR5ID8gMC4zXG4gICAgICAgIEBzd2lwZVRocmVzaG9sZCA9IEBvcHRpb25zLnN3aXBlVGhyZXNob2xkID8gMTBcbiAgICAgICAgQG5hdmlnYXRpb25EdXJhdGlvbiA9IEBvcHRpb25zLm5hdmlnYXRpb25EdXJhdGlvbiA/IDI0MFxuICAgICAgICBAbmF2aWdhdGlvblBhbkR1cmF0aW9uID0gQG9wdGlvbnMubmF2aWdhdGlvblBhbkR1cmF0aW9uID8gMjAwXG4gICAgICAgIEB6b29tRHVyYXRpb24gPSBAb3B0aW9ucy56b29tRHVyYXRpb24gPyAyMDBcblxuICAgICAgICBAcG9zaXRpb24gPSAtMVxuICAgICAgICBAcGluY2hpbmcgPSBmYWxzZVxuICAgICAgICBAcGFubmluZyA9IGZhbHNlXG4gICAgICAgIEB0cmFuc2Zvcm0gPSBsZWZ0OiAwLCB0b3A6IDAsIHNjYWxlOiAxXG4gICAgICAgIEBzdGFydFRyYW5zZm9ybSA9IGxlZnQ6IDAsIHRvcDogMCwgc2NhbGU6IDFcbiAgICAgICAgQHRhcCA9XG4gICAgICAgICAgICBjb3VudDogMFxuICAgICAgICAgICAgZGVsYXk6IDI1MFxuICAgICAgICAgICAgdGltZW91dDogbnVsbFxuXG4gICAgICAgIEBzY3JvbGxlckVsID0gQGVsLnF1ZXJ5U2VsZWN0b3IgJy52ZXJzb19fc2Nyb2xsZXInXG4gICAgICAgIEBwYWdlU3ByZWFkRWxzID0gQGVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fcGFnZS1zcHJlYWQnXG4gICAgICAgIEBwYWdlU3ByZWFkcyA9IEB0cmF2ZXJzZVBhZ2VTcHJlYWRzIEBwYWdlU3ByZWFkRWxzXG4gICAgICAgIEBwYWdlSWRzID0gQGJ1aWxkUGFnZUlkcyBAcGFnZVNwcmVhZHNcbiAgICAgICAgQGFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24gQHNjcm9sbGVyRWxcbiAgICAgICAgQGhhbW1lciA9IG5ldyBIYW1tZXIuTWFuYWdlciBAc2Nyb2xsZXJFbCxcbiAgICAgICAgICAgIHRvdWNoQWN0aW9uOiAnYXV0bydcbiAgICAgICAgICAgIGVuYWJsZTogZmFsc2VcbiAgICAgICAgICAgICMgUHJlZmVyIHRvdWNoIGlucHV0IGlmIHBvc3NpYmxlIHNpbmNlIEFuZHJvaWQgYWN0cyB3ZWlyZCB3aGVuIHVzaW5nIHBvaW50ZXIgZXZlbnRzLlxuICAgICAgICAgICAgaW5wdXRDbGFzczogaWYgJ29udG91Y2hzdGFydCcgb2Ygd2luZG93IHRoZW4gSGFtbWVyLlRvdWNoSW5wdXQgZWxzZSBudWxsXG5cbiAgICAgICAgQGhhbW1lci5hZGQgbmV3IEhhbW1lci5QYW4gZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0FMTFxuICAgICAgICBAaGFtbWVyLmFkZCBuZXcgSGFtbWVyLlRhcCBldmVudDogJ3NpbmdsZXRhcCcsIGludGVydmFsOiAwXG4gICAgICAgIEBoYW1tZXIuYWRkIG5ldyBIYW1tZXIuUGluY2goKVxuICAgICAgICBAaGFtbWVyLmFkZCBuZXcgSGFtbWVyLlByZXNzIHRpbWU6IDUwMFxuICAgICAgICBAaGFtbWVyLm9uICdwYW5zdGFydCcsIEBwYW5TdGFydC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncGFubW92ZScsIEBwYW5Nb3ZlLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwYW5lbmQnLCBAcGFuRW5kLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwYW5jYW5jZWwnLCBAcGFuRW5kLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdzaW5nbGV0YXAnLCBAc2luZ2xldGFwLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaHN0YXJ0JywgQHBpbmNoU3RhcnQuYmluZCBAXG4gICAgICAgIEBoYW1tZXIub24gJ3BpbmNobW92ZScsIEBwaW5jaE1vdmUuYmluZCBAXG4gICAgICAgIEBoYW1tZXIub24gJ3BpbmNoZW5kJywgQHBpbmNoRW5kLmJpbmQgQFxuICAgICAgICBAaGFtbWVyLm9uICdwaW5jaGNhbmNlbCcsIEBwaW5jaEVuZC5iaW5kIEBcbiAgICAgICAgQGhhbW1lci5vbiAncHJlc3MnLCBAcHJlc3MuYmluZCBAXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzdGFydDogLT5cbiAgICAgICAgcGFnZUlkID0gQGdldFBhZ2VTcHJlYWRQb3NpdGlvbkZyb21QYWdlSWQoQG9wdGlvbnMucGFnZUlkKSA/IDBcblxuICAgICAgICBAaGFtbWVyLnNldCBlbmFibGU6IHRydWVcbiAgICAgICAgQG5hdmlnYXRlVG8gcGFnZUlkLCBkdXJhdGlvbjogMFxuXG4gICAgICAgIEByZXNpemVMaXN0ZW5lciA9IEByZXNpemUuYmluZCBAXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ3Jlc2l6ZScsIEByZXNpemVMaXN0ZW5lciwgZmFsc2VcblxuICAgICAgICBAXG5cbiAgICBkZXN0cm95OiAtPlxuICAgICAgICBAaGFtbWVyLmRlc3Ryb3koKVxuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdyZXNpemUnLCBAcmVzaXplTGlzdGVuZXJcblxuICAgICAgICBAXG5cbiAgICBmaXJzdDogKG9wdGlvbnMpIC0+XG4gICAgICAgIEBuYXZpZ2F0ZVRvIDAsIG9wdGlvbnNcblxuICAgIHByZXY6IChvcHRpb25zKSAtPlxuICAgICAgICBAbmF2aWdhdGVUbyBAZ2V0UG9zaXRpb24oKSAtIDEsIG9wdGlvbnNcblxuICAgIG5leHQ6IChvcHRpb25zKSAtPlxuICAgICAgICBAbmF2aWdhdGVUbyBAZ2V0UG9zaXRpb24oKSArIDEsIG9wdGlvbnNcblxuICAgIGxhc3Q6IChvcHRpb25zKSAtPlxuICAgICAgICBAbmF2aWdhdGVUbyBAZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxLCBvcHRpb25zXG5cbiAgICBuYXZpZ2F0ZVRvOiAocG9zaXRpb24sIG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIHBvc2l0aW9uIDwgMCBvciBwb3NpdGlvbiA+IEBnZXRQYWdlU3ByZWFkQ291bnQoKSAtIDFcblxuICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBAZ2V0UG9zaXRpb24oKVxuICAgICAgICBjdXJyZW50UGFnZVNwcmVhZCA9IEBnZXRQYWdlU3ByZWFkRnJvbVBvc2l0aW9uIGN1cnJlbnRQb3NpdGlvblxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gcG9zaXRpb25cbiAgICAgICAgY2Fyb3VzZWwgPSBAZ2V0Q2Fyb3VzZWxGcm9tUGFnZVNwcmVhZCBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgIHZlbG9jaXR5ID0gb3B0aW9ucy52ZWxvY2l0eSA/IDFcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uID8gQG5hdmlnYXRpb25EdXJhdGlvblxuICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uIC8gTWF0aC5hYnModmVsb2NpdHkpXG5cbiAgICAgICAgY3VycmVudFBhZ2VTcHJlYWQuZGVhY3RpdmF0ZSgpIGlmIGN1cnJlbnRQYWdlU3ByZWFkP1xuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkLmFjdGl2YXRlKClcblxuICAgICAgICBjYXJvdXNlbC52aXNpYmxlLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+IHBhZ2VTcHJlYWQucG9zaXRpb24oKS5zZXRWaXNpYmlsaXR5ICd2aXNpYmxlJ1xuXG4gICAgICAgIEB0cmFuc2Zvcm0ubGVmdCA9IEBnZXRMZWZ0VHJhbnNmb3JtRnJvbVBhZ2VTcHJlYWQgcG9zaXRpb24sIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgQHNldFBvc2l0aW9uIHBvc2l0aW9uXG5cbiAgICAgICAgaWYgQHRyYW5zZm9ybS5zY2FsZSA+IDFcbiAgICAgICAgICAgIEB0cmFuc2Zvcm0udG9wID0gMFxuICAgICAgICAgICAgQHRyYW5zZm9ybS5zY2FsZSA9IDFcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb25cblxuICAgICAgICBAdHJpZ2dlciAnYmVmb3JlTmF2aWdhdGlvbicsXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb246IGN1cnJlbnRQb3NpdGlvblxuICAgICAgICAgICAgbmV3UG9zaXRpb246IHBvc2l0aW9uXG5cbiAgICAgICAgQGFuaW1hdGlvbi5hbmltYXRlXG4gICAgICAgICAgICB4OiBcIiN7QHRyYW5zZm9ybS5sZWZ0fSVcIlxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uXG4gICAgICAgICwgPT5cbiAgICAgICAgICAgIGNhcm91c2VsID0gQGdldENhcm91c2VsRnJvbVBhZ2VTcHJlYWQgQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuXG4gICAgICAgICAgICBjYXJvdXNlbC5nb25lLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+IHBhZ2VTcHJlYWQuc2V0VmlzaWJpbGl0eSAnZ29uZSdcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ2FmdGVyTmF2aWdhdGlvbicsXG4gICAgICAgICAgICAgICAgbmV3UG9zaXRpb246IEBnZXRQb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgcHJldmlvdXNQb3NpdGlvbjogY3VycmVudFBvc2l0aW9uXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0UG9zaXRpb246IC0+XG4gICAgICAgIEBwb3NpdGlvblxuXG4gICAgc2V0UG9zaXRpb246IChwb3NpdGlvbikgLT5cbiAgICAgICAgQHBvc2l0aW9uID0gcG9zaXRpb25cblxuICAgICAgICBAXG5cbiAgICBnZXRMZWZ0VHJhbnNmb3JtRnJvbVBhZ2VTcHJlYWQ6IChwb3NpdGlvbiwgcGFnZVNwcmVhZCkgLT5cbiAgICAgICAgbGVmdCA9IDBcblxuICAgICAgICBpZiBwb3NpdGlvbiBpcyBAZ2V0UGFnZVNwcmVhZENvdW50KCkgLSAxXG4gICAgICAgICAgICBsZWZ0ID0gKDEwMCAtIHBhZ2VTcHJlYWQuZ2V0V2lkdGgoKSkgLSBwYWdlU3ByZWFkLmdldExlZnQoKVxuICAgICAgICBlbHNlIGlmIHBvc2l0aW9uID4gMFxuICAgICAgICAgICAgbGVmdCA9ICgxMDAgLSBwYWdlU3ByZWFkLmdldFdpZHRoKCkpIC8gMiAtIHBhZ2VTcHJlYWQuZ2V0TGVmdCgpXG5cbiAgICAgICAgbGVmdFxuXG4gICAgZ2V0Q2Fyb3VzZWxGcm9tUGFnZVNwcmVhZDogKHBhZ2VTcHJlYWRTdWJqZWN0KSAtPlxuICAgICAgICBjYXJvdXNlbCA9XG4gICAgICAgICAgICB2aXNpYmxlOiBbXVxuICAgICAgICAgICAgZ29uZTogW11cblxuICAgICAgICAjIElkZW50aWZ5IHRoZSBwYWdlIHNwcmVhZHMgdGhhdCBzaG91bGQgYmUgYSBwYXJ0IG9mIHRoZSBjYXJvdXNlbC5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLmZvckVhY2ggKHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2VcblxuICAgICAgICAgICAgaWYgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgPD0gcGFnZVNwcmVhZFN1YmplY3QuZ2V0TGVmdCgpXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWUgaWYgcGFnZVNwcmVhZC5nZXRMZWZ0KCkgKyBwYWdlU3ByZWFkLmdldFdpZHRoKCkgPiBwYWdlU3ByZWFkU3ViamVjdC5nZXRMZWZ0KCkgLSAxMDBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZSBpZiBwYWdlU3ByZWFkLmdldExlZnQoKSAtIHBhZ2VTcHJlYWQuZ2V0V2lkdGgoKSA8IHBhZ2VTcHJlYWRTdWJqZWN0LmdldExlZnQoKSArIDEwMFxuXG4gICAgICAgICAgICBpZiB2aXNpYmxlIGlzIHRydWVcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC52aXNpYmxlLnB1c2ggcGFnZVNwcmVhZFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNhcm91c2VsLmdvbmUucHVzaCBwYWdlU3ByZWFkXG5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIGNhcm91c2VsXG5cbiAgICB0cmF2ZXJzZVBhZ2VTcHJlYWRzOiAoZWxzKSAtPlxuICAgICAgICBwYWdlU3ByZWFkcyA9IFtdXG4gICAgICAgIGxlZnQgPSAwXG5cbiAgICAgICAgZm9yIGVsIGluIGVsc1xuICAgICAgICAgICAgaWQgPSBlbC5nZXRBdHRyaWJ1dGUgJ2RhdGEtaWQnXG4gICAgICAgICAgICB0eXBlID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLXR5cGUnXG4gICAgICAgICAgICBwYWdlSWRzID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLXBhZ2UtaWRzJ1xuICAgICAgICAgICAgcGFnZUlkcyA9IGlmIHBhZ2VJZHM/IHRoZW4gcGFnZUlkcy5zcGxpdCgnLCcpLm1hcCAoaSkgLT4gaSBlbHNlIFtdXG4gICAgICAgICAgICBtYXhab29tU2NhbGUgPSBlbC5nZXRBdHRyaWJ1dGUgJ2RhdGEtbWF4LXpvb20tc2NhbGUnXG4gICAgICAgICAgICBtYXhab29tU2NhbGUgPSBpZiBtYXhab29tU2NhbGU/IHRoZW4gK21heFpvb21TY2FsZSBlbHNlIDFcbiAgICAgICAgICAgIHdpZHRoID0gZWwuZ2V0QXR0cmlidXRlICdkYXRhLXdpZHRoJ1xuICAgICAgICAgICAgd2lkdGggPSBpZiB3aWR0aD8gdGhlbiArd2lkdGggZWxzZSAxMDBcbiAgICAgICAgICAgIHBhZ2VTcHJlYWQgPSBuZXcgUGFnZVNwcmVhZCBlbCxcbiAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICAgICAgcGFnZUlkczogcGFnZUlkc1xuICAgICAgICAgICAgICAgIG1heFpvb21TY2FsZTogbWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICAgICAgbGVmdDogbGVmdFxuXG4gICAgICAgICAgICBsZWZ0ICs9IHdpZHRoXG5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWRzLnB1c2ggcGFnZVNwcmVhZFxuXG4gICAgICAgIHBhZ2VTcHJlYWRzXG5cbiAgICBidWlsZFBhZ2VJZHM6IChwYWdlU3ByZWFkcykgLT5cbiAgICAgICAgcGFnZUlkcyA9IHt9XG5cbiAgICAgICAgcGFnZVNwcmVhZHMuZm9yRWFjaCAocGFnZVNwcmVhZCwgaSkgLT5cbiAgICAgICAgICAgIHBhZ2VTcHJlYWQub3B0aW9ucy5wYWdlSWRzLmZvckVhY2ggKHBhZ2VJZCkgLT5cbiAgICAgICAgICAgICAgICBwYWdlSWRzW3BhZ2VJZF0gPSBwYWdlU3ByZWFkXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgcGFnZUlkc1xuXG4gICAgaXNDb29yZGluYXRlSW5zaWRlRWxlbWVudDogKHgsIHksIGVsKSAtPlxuICAgICAgICByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICB4ID49IHJlY3QubGVmdCBhbmQgeCA8PSByZWN0LnJpZ2h0IGFuZCB5ID49IHJlY3QudG9wIGFuZCB5IDw9IHJlY3QuYm90dG9tXG5cbiAgICBnZXRDb29yZGluYXRlSW5mbzogKHgsIHksIHBhZ2VTcHJlYWQpIC0+XG4gICAgICAgIGluZm8gPVxuICAgICAgICAgICAgeDogeFxuICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgY29udGVudFg6IDBcbiAgICAgICAgICAgIGNvbnRlbnRZOiAwXG4gICAgICAgICAgICBwYWdlWDogMFxuICAgICAgICAgICAgcGFnZVk6IDBcbiAgICAgICAgICAgIG92ZXJsYXlFbHM6IFtdXG4gICAgICAgICAgICBwYWdlRWw6IG51bGxcbiAgICAgICAgICAgIGlzSW5zaWRlQ29udGVudFg6IGZhbHNlXG4gICAgICAgICAgICBpc0luc2lkZUNvbnRlbnRZOiBmYWxzZVxuICAgICAgICAgICAgaXNJbnNpZGVDb250ZW50OiBmYWxzZVxuICAgICAgICBjb250ZW50UmVjdCA9IHBhZ2VTcHJlYWQuZ2V0Q29udGVudFJlY3QoKVxuICAgICAgICBvdmVybGF5RWxzID0gcGFnZVNwcmVhZC5nZXRPdmVybGF5RWxzKClcbiAgICAgICAgcGFnZUVscyA9IHBhZ2VTcHJlYWQuZ2V0UGFnZUVscygpXG5cbiAgICAgICAgZm9yIG92ZXJsYXlFbCBpbiBvdmVybGF5RWxzXG4gICAgICAgICAgICBpbmZvLm92ZXJsYXlFbHMucHVzaCBvdmVybGF5RWwgaWYgQGlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQoeCwgeSwgb3ZlcmxheUVsKVxuXG4gICAgICAgIGZvciBwYWdlRWwgaW4gcGFnZUVsc1xuICAgICAgICAgICAgaWYgQGlzQ29vcmRpbmF0ZUluc2lkZUVsZW1lbnQoeCwgeSwgcGFnZUVsKVxuICAgICAgICAgICAgICAgIGluZm8ucGFnZUVsID0gcGFnZUVsXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICBpbmZvLmNvbnRlbnRYID0gKHggLSBjb250ZW50UmVjdC5sZWZ0KSAvIGNvbnRlbnRSZWN0LndpZHRoXG4gICAgICAgIGluZm8uY29udGVudFkgPSAoeSAtIGNvbnRlbnRSZWN0LnRvcCkgLyBjb250ZW50UmVjdC5oZWlnaHRcblxuICAgICAgICBpZiBpbmZvLnBhZ2VFbD9cbiAgICAgICAgICAgIGluZm8uaXNJbnNpZGVDb250ZW50WCA9IGluZm8uY29udGVudFggPj0gMCBhbmQgaW5mby5jb250ZW50WCA8PSAxXG4gICAgICAgICAgICBpbmZvLmlzSW5zaWRlQ29udGVudFkgPSBpbmZvLmNvbnRlbnRZID49IDAgYW5kIGluZm8uY29udGVudFkgPD0gMVxuICAgICAgICAgICAgaW5mby5pc0luc2lkZUNvbnRlbnQgPSBpbmZvLmlzSW5zaWRlQ29udGVudFggYW5kIGluZm8uaXNJbnNpZGVDb250ZW50WVxuXG4gICAgICAgIGluZm9cblxuICAgIGdldFBhZ2VTcHJlYWRDb3VudDogLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzLmxlbmd0aFxuXG4gICAgZ2V0QWN0aXZlUGFnZVNwcmVhZDogLT5cbiAgICAgICAgQGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb24gQGdldFBvc2l0aW9uKClcblxuICAgIGdldFBhZ2VTcHJlYWRGcm9tUG9zaXRpb246IChwb3NpdGlvbikgLT5cbiAgICAgICAgQHBhZ2VTcHJlYWRzW3Bvc2l0aW9uXVxuXG4gICAgZ2V0UGFnZVNwcmVhZFBvc2l0aW9uRnJvbVBhZ2VJZDogKHBhZ2VJZCkgLT5cbiAgICAgICAgZm9yIHBhZ2VTcHJlYWQsIGlkeCBpbiBAcGFnZVNwcmVhZHNcbiAgICAgICAgICAgIHJldHVybiBpZHggaWYgcGFnZVNwcmVhZC5vcHRpb25zLnBhZ2VJZHMuaW5kZXhPZihwYWdlSWQpID4gLTFcblxuICAgIGdldFBhZ2VTcHJlYWRCb3VuZHM6IChwYWdlU3ByZWFkKSAtPlxuICAgICAgICBwYWdlU3ByZWFkUmVjdCA9IHBhZ2VTcHJlYWQuZ2V0UmVjdCgpXG4gICAgICAgIHBhZ2VTcHJlYWRDb250ZW50UmVjdCA9IHBhZ2VTcHJlYWQuZ2V0Q29udGVudFJlY3QoKVxuXG4gICAgICAgIGxlZnQ6IChwYWdlU3ByZWFkQ29udGVudFJlY3QubGVmdCAtIHBhZ2VTcHJlYWRSZWN0LmxlZnQpIC8gcGFnZVNwcmVhZFJlY3Qud2lkdGggKiAxMDBcbiAgICAgICAgdG9wOiAocGFnZVNwcmVhZENvbnRlbnRSZWN0LnRvcCAtIHBhZ2VTcHJlYWRSZWN0LnRvcCkgLyBwYWdlU3ByZWFkUmVjdC5oZWlnaHQgKiAxMDBcbiAgICAgICAgd2lkdGg6IHBhZ2VTcHJlYWRDb250ZW50UmVjdC53aWR0aCAvIHBhZ2VTcHJlYWRSZWN0LndpZHRoICogMTAwXG4gICAgICAgIGhlaWdodDogcGFnZVNwcmVhZENvbnRlbnRSZWN0LmhlaWdodCAvIHBhZ2VTcHJlYWRSZWN0LmhlaWdodCAqIDEwMFxuICAgICAgICBwYWdlU3ByZWFkUmVjdDogcGFnZVNwcmVhZFJlY3RcbiAgICAgICAgcGFnZVNwcmVhZENvbnRlbnRSZWN0OiBwYWdlU3ByZWFkQ29udGVudFJlY3RcblxuICAgIGNsaXBDb29yZGluYXRlOiAoY29vcmRpbmF0ZSwgc2NhbGUsIHNpemUsIG9mZnNldCkgLT5cbiAgICAgICAgaWYgc2l6ZSAqIHNjYWxlIDwgMTAwXG4gICAgICAgICAgICBjb29yZGluYXRlID0gb2Zmc2V0ICogLXNjYWxlICsgNTAgLSAoc2l6ZSAqIHNjYWxlIC8gMilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IE1hdGgubWluIGNvb3JkaW5hdGUsIG9mZnNldCAqIC1zY2FsZVxuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IE1hdGgubWF4IGNvb3JkaW5hdGUsIG9mZnNldCAqIC1zY2FsZSAtIHNpemUgKiBzY2FsZSArIDEwMFxuXG4gICAgICAgIGNvb3JkaW5hdGVcblxuICAgIHpvb21UbzogKG9wdGlvbnMgPSB7fSwgY2FsbGJhY2spIC0+XG4gICAgICAgIHNjYWxlID0gb3B0aW9ucy5zY2FsZVxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICBwYWdlU3ByZWFkQm91bmRzID0gQGdldFBhZ2VTcHJlYWRCb3VuZHMgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICBjYXJvdXNlbE9mZnNldCA9IGFjdGl2ZVBhZ2VTcHJlYWQuZ2V0TGVmdCgpXG4gICAgICAgIGNhcm91c2VsU2NhbGVkT2Zmc2V0ID0gY2Fyb3VzZWxPZmZzZXQgKiBAdHJhbnNmb3JtLnNjYWxlXG4gICAgICAgIHggPSBvcHRpb25zLnggPyAwXG4gICAgICAgIHkgPSBvcHRpb25zLnkgPyAwXG5cbiAgICAgICAgaWYgc2NhbGUgaXNudCAxXG4gICAgICAgICAgICB4IC09IHBhZ2VTcHJlYWRCb3VuZHMucGFnZVNwcmVhZFJlY3QubGVmdFxuICAgICAgICAgICAgeSAtPSBwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LnRvcFxuICAgICAgICAgICAgeCA9IHggLyAocGFnZVNwcmVhZEJvdW5kcy5wYWdlU3ByZWFkUmVjdC53aWR0aCAvIEB0cmFuc2Zvcm0uc2NhbGUpICogMTAwXG4gICAgICAgICAgICB5ID0geSAvIChwYWdlU3ByZWFkQm91bmRzLnBhZ2VTcHJlYWRSZWN0LmhlaWdodCAvIEB0cmFuc2Zvcm0uc2NhbGUpICogMTAwXG4gICAgICAgICAgICB4ID0gQHRyYW5zZm9ybS5sZWZ0ICsgY2Fyb3VzZWxTY2FsZWRPZmZzZXQgKyB4IC0gKHggKiBzY2FsZSAvIEB0cmFuc2Zvcm0uc2NhbGUpXG4gICAgICAgICAgICB5ID0gQHRyYW5zZm9ybS50b3AgKyB5IC0gKHkgKiBzY2FsZSAvIEB0cmFuc2Zvcm0uc2NhbGUpXG5cbiAgICAgICAgICAgICMgTWFrZSBzdXJlIHRoZSBhbmltYXRpb24gZG9lc24ndCBleGNlZWQgdGhlIGNvbnRlbnQgYm91bmRzLlxuICAgICAgICAgICAgaWYgb3B0aW9ucy5ib3VuZHMgaXNudCBmYWxzZSBhbmQgc2NhbGUgPiAxXG4gICAgICAgICAgICAgICAgeCA9IEBjbGlwQ29vcmRpbmF0ZSB4LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy53aWR0aCwgcGFnZVNwcmVhZEJvdW5kcy5sZWZ0XG4gICAgICAgICAgICAgICAgeSA9IEBjbGlwQ29vcmRpbmF0ZSB5LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy5oZWlnaHQsIHBhZ2VTcHJlYWRCb3VuZHMudG9wXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHggPSAwXG4gICAgICAgICAgICB5ID0gMFxuXG4gICAgICAgICMgQWNjb3VudCBmb3IgdGhlIHBhZ2Ugc3ByZWFkcyBsZWZ0IG9mIHRoZSBhY3RpdmUgb25lLlxuICAgICAgICB4IC09IGNhcm91c2VsT2Zmc2V0ICogc2NhbGVcblxuICAgICAgICBAdHJhbnNmb3JtLmxlZnQgPSB4XG4gICAgICAgIEB0cmFuc2Zvcm0udG9wID0geVxuICAgICAgICBAdHJhbnNmb3JtLnNjYWxlID0gc2NhbGVcblxuICAgICAgICBAYW5pbWF0aW9uLmFuaW1hdGVcbiAgICAgICAgICAgIHg6IFwiI3t4fSVcIlxuICAgICAgICAgICAgeTogXCIje3l9JVwiXG4gICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgIGVhc2luZzogb3B0aW9ucy5lYXNpbmdcbiAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uXG4gICAgICAgICwgY2FsbGJhY2tcblxuICAgICAgICByZXR1cm5cblxuICAgIHJlZnJlc2g6IC0+XG4gICAgICAgIEBwYWdlU3ByZWFkRWxzID0gQGVsLnF1ZXJ5U2VsZWN0b3JBbGwgJy52ZXJzb19fcGFnZS1zcHJlYWQnXG4gICAgICAgIEBwYWdlU3ByZWFkcyA9IEB0cmF2ZXJzZVBhZ2VTcHJlYWRzIEBwYWdlU3ByZWFkRWxzXG4gICAgICAgIEBwYWdlSWRzID0gQGJ1aWxkUGFnZUlkcyBAcGFnZVNwcmVhZHNcblxuICAgICAgICBAXG5cbiAgICBwYW5TdGFydDogKGUpIC0+XG4gICAgICAgIHggPSBlLmNlbnRlci54XG4gICAgICAgIGVkZ2VUaHJlc2hvbGQgPSAzMFxuICAgICAgICB3aWR0aCA9IEBzY3JvbGxlckVsLm9mZnNldFdpZHRoXG5cbiAgICAgICAgIyBQcmV2ZW50IHBhbm5pbmcgd2hlbiBlZGdlLXN3aXBpbmcgb24gaU9TLlxuICAgICAgICBpZiB4ID4gZWRnZVRocmVzaG9sZCBhbmQgeCA8IHdpZHRoIC0gZWRnZVRocmVzaG9sZFxuICAgICAgICAgICAgQHN0YXJ0VHJhbnNmb3JtLmxlZnQgPSBAdHJhbnNmb3JtLmxlZnRcbiAgICAgICAgICAgIEBzdGFydFRyYW5zZm9ybS50b3AgPSBAdHJhbnNmb3JtLnRvcFxuXG4gICAgICAgICAgICBAcGFubmluZyA9IHRydWVcblxuICAgICAgICAgICAgQHRyaWdnZXIgJ3BhblN0YXJ0J1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuTW92ZTogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGluY2hpbmcgaXMgdHJ1ZSBvciBAcGFubmluZyBpcyBmYWxzZVxuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgPiAxXG4gICAgICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICAgICAgY2Fyb3VzZWxPZmZzZXQgPSBhY3RpdmVQYWdlU3ByZWFkLmdldExlZnQoKVxuICAgICAgICAgICAgY2Fyb3VzZWxTY2FsZWRPZmZzZXQgPSBjYXJvdXNlbE9mZnNldCAqIEB0cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgICAgIHBhZ2VTcHJlYWRCb3VuZHMgPSBAZ2V0UGFnZVNwcmVhZEJvdW5kcyBhY3RpdmVQYWdlU3ByZWFkXG4gICAgICAgICAgICBzY2FsZSA9IEB0cmFuc2Zvcm0uc2NhbGVcbiAgICAgICAgICAgIHggPSBAc3RhcnRUcmFuc2Zvcm0ubGVmdCArIGNhcm91c2VsU2NhbGVkT2Zmc2V0ICsgZS5kZWx0YVggLyBAc2Nyb2xsZXJFbC5vZmZzZXRXaWR0aCAqIDEwMFxuICAgICAgICAgICAgeSA9IEBzdGFydFRyYW5zZm9ybS50b3AgKyBlLmRlbHRhWSAvIEBzY3JvbGxlckVsLm9mZnNldEhlaWdodCAqIDEwMFxuICAgICAgICAgICAgeCA9IEBjbGlwQ29vcmRpbmF0ZSB4LCBzY2FsZSwgcGFnZVNwcmVhZEJvdW5kcy53aWR0aCwgcGFnZVNwcmVhZEJvdW5kcy5sZWZ0XG4gICAgICAgICAgICB5ID0gQGNsaXBDb29yZGluYXRlIHksIHNjYWxlLCBwYWdlU3ByZWFkQm91bmRzLmhlaWdodCwgcGFnZVNwcmVhZEJvdW5kcy50b3BcbiAgICAgICAgICAgIHggLT0gY2Fyb3VzZWxTY2FsZWRPZmZzZXRcblxuICAgICAgICAgICAgQHRyYW5zZm9ybS5sZWZ0ID0geFxuICAgICAgICAgICAgQHRyYW5zZm9ybS50b3AgPSB5XG5cbiAgICAgICAgICAgIEBhbmltYXRpb24uYW5pbWF0ZVxuICAgICAgICAgICAgICAgIHg6IFwiI3t4fSVcIlxuICAgICAgICAgICAgICAgIHk6IFwiI3t5fSVcIlxuICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZVxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcidcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgeCA9IEB0cmFuc2Zvcm0ubGVmdCArIGUuZGVsdGFYIC8gQHNjcm9sbGVyRWwub2Zmc2V0V2lkdGggKiAxMDBcblxuICAgICAgICAgICAgQGFuaW1hdGlvbi5hbmltYXRlXG4gICAgICAgICAgICAgICAgeDogXCIje3h9JVwiXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJ1xuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGFuRW5kOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIEBwYW5uaW5nIGlzIGZhbHNlXG5cbiAgICAgICAgQHBhbm5pbmcgPSBmYWxzZVxuICAgICAgICBAdHJpZ2dlciAncGFuRW5kJ1xuXG4gICAgICAgIGlmIEB0cmFuc2Zvcm0uc2NhbGUgaXMgMSBhbmQgQHBpbmNoaW5nIGlzIGZhbHNlXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGUub3ZlcmFsbFZlbG9jaXR5WFxuXG4gICAgICAgICAgICBpZiBNYXRoLmFicyh2ZWxvY2l0eSkgPj0gQHN3aXBlVmVsb2NpdHlcbiAgICAgICAgICAgICAgICBpZiBNYXRoLmFicyhlLmRlbHRhWCkgPj0gQHN3aXBlVGhyZXNob2xkXG4gICAgICAgICAgICAgICAgICAgIGlmIGUub2Zmc2V0RGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fTEVGVFxuICAgICAgICAgICAgICAgICAgICAgICAgQG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogQG5hdmlnYXRpb25QYW5EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIGUub2Zmc2V0RGlyZWN0aW9uIGlzIEhhbW1lci5ESVJFQ1RJT05fUklHSFRcbiAgICAgICAgICAgICAgICAgICAgICAgIEBwcmV2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEBuYXZpZ2F0aW9uUGFuRHVyYXRpb25cblxuICAgICAgICAgICAgaWYgcG9zaXRpb24gaXMgQGdldFBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICBAYW5pbWF0aW9uLmFuaW1hdGVcbiAgICAgICAgICAgICAgICAgICAgeDogXCIje0B0cmFuc2Zvcm0ubGVmdH0lXCJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEBuYXZpZ2F0aW9uUGFuRHVyYXRpb25cblxuICAgICAgICAgICAgICAgIEB0cmlnZ2VyICdhdHRlbXB0ZWROYXZpZ2F0aW9uJywgcG9zaXRpb246IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaW5jaFN0YXJ0OiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAZ2V0QWN0aXZlUGFnZVNwcmVhZCgpLmlzWm9vbWFibGUoKVxuXG4gICAgICAgIEBwaW5jaGluZyA9IHRydWVcbiAgICAgICAgQGVsLnNldEF0dHJpYnV0ZSAnZGF0YS1waW5jaGluZycsIHRydWVcbiAgICAgICAgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlID0gQHRyYW5zZm9ybS5zY2FsZVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcGluY2hNb3ZlOiAoZSkgLT5cbiAgICAgICAgcmV0dXJuIGlmIEBwaW5jaGluZyBpcyBmYWxzZVxuXG4gICAgICAgIEB6b29tVG9cbiAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgIHk6IGUuY2VudGVyLnlcbiAgICAgICAgICAgIHNjYWxlOiBAc3RhcnRUcmFuc2Zvcm0uc2NhbGUgKiBlLnNjYWxlXG4gICAgICAgICAgICBib3VuZHM6IGZhbHNlXG4gICAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInXG5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaW5jaEVuZDogKGUpIC0+XG4gICAgICAgIHJldHVybiBpZiBAcGluY2hpbmcgaXMgZmFsc2VcblxuICAgICAgICBhY3RpdmVQYWdlU3ByZWFkID0gQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKVxuICAgICAgICBtYXhab29tU2NhbGUgPSBhY3RpdmVQYWdlU3ByZWFkLmdldE1heFpvb21TY2FsZSgpXG4gICAgICAgIHNjYWxlID0gTWF0aC5tYXggMSwgTWF0aC5taW4oQHRyYW5zZm9ybS5zY2FsZSwgbWF4Wm9vbVNjYWxlKVxuICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgaWYgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlIGlzIDEgYW5kIHNjYWxlID4gMVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZEluJywgcG9zaXRpb246IHBvc2l0aW9uXG4gICAgICAgIGVsc2UgaWYgQHN0YXJ0VHJhbnNmb3JtLnNjYWxlID4gMSBhbmQgc2NhbGUgaXMgMVxuICAgICAgICAgICAgQHRyaWdnZXIgJ3pvb21lZE91dCcsIHBvc2l0aW9uOiBwb3NpdGlvblxuXG4gICAgICAgIEB6b29tVG9cbiAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgIHk6IGUuY2VudGVyLnlcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZVxuICAgICAgICAgICAgZHVyYXRpb246IEB6b29tRHVyYXRpb25cbiAgICAgICAgLCA9PlxuICAgICAgICAgICAgQHBpbmNoaW5nID0gZmFsc2VcbiAgICAgICAgICAgIEBlbC5zZXRBdHRyaWJ1dGUgJ2RhdGEtcGluY2hpbmcnLCBmYWxzZVxuXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzOiAoZSkgLT5cbiAgICAgICAgQHRyaWdnZXIgJ3ByZXNzZWQnLCBAZ2V0Q29vcmRpbmF0ZUluZm8oZS5jZW50ZXIueCwgZS5jZW50ZXIueSwgQGdldEFjdGl2ZVBhZ2VTcHJlYWQoKSlcblxuICAgICAgICByZXR1cm5cblxuICAgIHNpbmdsZXRhcDogKGUpIC0+XG4gICAgICAgIGFjdGl2ZVBhZ2VTcHJlYWQgPSBAZ2V0QWN0aXZlUGFnZVNwcmVhZCgpXG4gICAgICAgIGNvb3JkaW5hdGVJbmZvID0gQGdldENvb3JkaW5hdGVJbmZvIGUuY2VudGVyLngsIGUuY2VudGVyLnksIGFjdGl2ZVBhZ2VTcHJlYWRcbiAgICAgICAgaXNEb3VibGVUYXAgPSBAdGFwLmNvdW50IGlzIDFcblxuICAgICAgICBjbGVhclRpbWVvdXQgQHRhcC50aW1lb3V0XG5cbiAgICAgICAgaWYgaXNEb3VibGVUYXBcbiAgICAgICAgICAgIEB0YXAuY291bnQgPSAwXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICdkb3VibGVDbGlja2VkJywgY29vcmRpbmF0ZUluZm9cblxuICAgICAgICAgICAgaWYgYWN0aXZlUGFnZVNwcmVhZC5pc1pvb21hYmxlKClcbiAgICAgICAgICAgICAgICBtYXhab29tU2NhbGUgPSBhY3RpdmVQYWdlU3ByZWFkLmdldE1heFpvb21TY2FsZSgpXG4gICAgICAgICAgICAgICAgem9vbWVkSW4gPSBAdHJhbnNmb3JtLnNjYWxlID4gMVxuICAgICAgICAgICAgICAgIHNjYWxlID0gaWYgem9vbWVkSW4gdGhlbiAxIGVsc2UgbWF4Wm9vbVNjYWxlXG4gICAgICAgICAgICAgICAgem9vbUV2ZW50ID0gaWYgem9vbWVkSW4gdGhlbiAnem9vbWVkT3V0JyBlbHNlICd6b29tZWRJbidcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IEBnZXRQb3NpdGlvbigpXG5cbiAgICAgICAgICAgICAgICBAem9vbVRvXG4gICAgICAgICAgICAgICAgICAgIHg6IGUuY2VudGVyLnhcbiAgICAgICAgICAgICAgICAgICAgeTogZS5jZW50ZXIueVxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IEB6b29tRHVyYXRpb25cbiAgICAgICAgICAgICAgICAsID0+XG4gICAgICAgICAgICAgICAgICAgIEB0cmlnZ2VyIHpvb21FdmVudCwgcG9zaXRpb246IHBvc2l0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXAuY291bnQrK1xuICAgICAgICAgICAgQHRhcC50aW1lb3V0ID0gc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICAgIEB0YXAuY291bnQgPSAwXG5cbiAgICAgICAgICAgICAgICBAdHJpZ2dlciAnY2xpY2tlZCcsIGNvb3JkaW5hdGVJbmZvXG5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICwgQHRhcC5kZWxheVxuXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzaXplOiAtPlxuICAgICAgICBpZiBAdHJhbnNmb3JtLnNjYWxlID4gMVxuICAgICAgICAgICAgcG9zaXRpb24gPSBAZ2V0UG9zaXRpb24oKVxuICAgICAgICAgICAgYWN0aXZlUGFnZVNwcmVhZCA9IEBnZXRBY3RpdmVQYWdlU3ByZWFkKClcblxuICAgICAgICAgICAgQHRyYW5zZm9ybS5sZWZ0ID0gQGdldExlZnRUcmFuc2Zvcm1Gcm9tUGFnZVNwcmVhZCBwb3NpdGlvbiwgYWN0aXZlUGFnZVNwcmVhZFxuICAgICAgICAgICAgQHRyYW5zZm9ybS50b3AgPSAwXG4gICAgICAgICAgICBAdHJhbnNmb3JtLnNjYWxlID0gMVxuXG4gICAgICAgICAgICBAem9vbVRvXG4gICAgICAgICAgICAgICAgeDogQHRyYW5zZm9ybS5sZWZ0XG4gICAgICAgICAgICAgICAgeTogQHRyYW5zZm9ybS50b3BcbiAgICAgICAgICAgICAgICBzY2FsZTogQHRyYW5zZm9ybS5zY2FsZVxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXG5cbiAgICAgICAgICAgIEB0cmlnZ2VyICd6b29tZWRPdXQnLCBwb3NpdGlvbjogcG9zaXRpb25cblxuICAgICAgICByZXR1cm5cblxuTWljcm9FdmVudC5taXhpbiBWZXJzb1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZlcnNvXG4iLCIvKiEgSGFtbWVyLkpTIC0gdjIuMC43IC0gMjAxNi0wNC0yMlxuICogaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSm9yaWsgVGFuZ2VsZGVyO1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlICovXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgZXhwb3J0TmFtZSwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxudmFyIFZFTkRPUl9QUkVGSVhFUyA9IFsnJywgJ3dlYmtpdCcsICdNb3onLCAnTVMnLCAnbXMnLCAnbyddO1xudmFyIFRFU1RfRUxFTUVOVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG52YXIgVFlQRV9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG5cbnZhciByb3VuZCA9IE1hdGgucm91bmQ7XG52YXIgYWJzID0gTWF0aC5hYnM7XG52YXIgbm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogc2V0IGEgdGltZW91dCB3aXRoIGEgZ2l2ZW4gc2NvcGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZW91dFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHNldFRpbWVvdXRDb250ZXh0KGZuLCB0aW1lb3V0LCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoYmluZEZuKGZuLCBjb250ZXh0KSwgdGltZW91dCk7XG59XG5cbi8qKlxuICogaWYgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCB3ZSB3YW50IHRvIGV4ZWN1dGUgdGhlIGZuIG9uIGVhY2ggZW50cnlcbiAqIGlmIGl0IGFpbnQgYW4gYXJyYXkgd2UgZG9uJ3Qgd2FudCB0byBkbyBhIHRoaW5nLlxuICogdGhpcyBpcyB1c2VkIGJ5IGFsbCB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIHNpbmdsZSBhbmQgYXJyYXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp8QXJyYXl9IGFyZ1xuICogQHBhcmFtIHtTdHJpbmd9IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHRdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW52b2tlQXJyYXlBcmcoYXJnLCBmbiwgY29udGV4dCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgICAgZWFjaChhcmcsIGNvbnRleHRbZm5dLCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiB3YWxrIG9iamVjdHMgYW5kIGFycmF5c1xuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKCFvYmopIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChvYmouZm9yRWFjaCkge1xuICAgICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgb2JqLmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBvYmouaGFzT3duUHJvcGVydHkoaSkgJiYgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogd3JhcCBhIG1ldGhvZCB3aXRoIGEgZGVwcmVjYXRpb24gd2FybmluZyBhbmQgc3RhY2sgdHJhY2VcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIHRoZSBzdXBwbGllZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGRlcHJlY2F0ZShtZXRob2QsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICB2YXIgZGVwcmVjYXRpb25NZXNzYWdlID0gJ0RFUFJFQ0FURUQgTUVUSE9EOiAnICsgbmFtZSArICdcXG4nICsgbWVzc2FnZSArICcgQVQgXFxuJztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEVycm9yKCdnZXQtc3RhY2stdHJhY2UnKTtcbiAgICAgICAgdmFyIHN0YWNrID0gZSAmJiBlLnN0YWNrID8gZS5zdGFjay5yZXBsYWNlKC9eW15cXChdKz9bXFxuJF0vZ20sICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMrYXRcXHMrL2dtLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eT2JqZWN0Ljxhbm9ueW1vdXM+XFxzKlxcKC9nbSwgJ3thbm9ueW1vdXN9KClAJykgOiAnVW5rbm93biBTdGFjayBUcmFjZSc7XG5cbiAgICAgICAgdmFyIGxvZyA9IHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS53YXJuIHx8IHdpbmRvdy5jb25zb2xlLmxvZyk7XG4gICAgICAgIGlmIChsb2cpIHtcbiAgICAgICAgICAgIGxvZy5jYWxsKHdpbmRvdy5jb25zb2xlLCBkZXByZWNhdGlvbk1lc3NhZ2UsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBleHRlbmQgb2JqZWN0LlxuICogbWVhbnMgdGhhdCBwcm9wZXJ0aWVzIGluIGRlc3Qgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSB0aGUgb25lcyBpbiBzcmMuXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gey4uLk9iamVjdH0gb2JqZWN0c190b19hc3NpZ25cbiAqIEByZXR1cm5zIHtPYmplY3R9IHRhcmdldFxuICovXG52YXIgYXNzaWduO1xuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG59IGVsc2Uge1xuICAgIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG59XG5cbi8qKlxuICogZXh0ZW5kIG9iamVjdC5cbiAqIG1lYW5zIHRoYXQgcHJvcGVydGllcyBpbiBkZXN0IHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgdGhlIG9uZXMgaW4gc3JjLlxuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW21lcmdlPWZhbHNlXVxuICogQHJldHVybnMge09iamVjdH0gZGVzdFxuICovXG52YXIgZXh0ZW5kID0gZGVwcmVjYXRlKGZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzcmMsIG1lcmdlKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzcmMpO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICghbWVyZ2UgfHwgKG1lcmdlICYmIGRlc3Rba2V5c1tpXV0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGRlc3Rba2V5c1tpXV0gPSBzcmNba2V5c1tpXV07XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbn0sICdleHRlbmQnLCAnVXNlIGBhc3NpZ25gLicpO1xuXG4vKipcbiAqIG1lcmdlIHRoZSB2YWx1ZXMgZnJvbSBzcmMgaW4gdGhlIGRlc3QuXG4gKiBtZWFucyB0aGF0IHByb3BlcnRpZXMgdGhhdCBleGlzdCBpbiBkZXN0IHdpbGwgbm90IGJlIG92ZXJ3cml0dGVuIGJ5IHNyY1xuICogQHBhcmFtIHtPYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzcmNcbiAqIEByZXR1cm5zIHtPYmplY3R9IGRlc3RcbiAqL1xudmFyIG1lcmdlID0gZGVwcmVjYXRlKGZ1bmN0aW9uIG1lcmdlKGRlc3QsIHNyYykge1xuICAgIHJldHVybiBleHRlbmQoZGVzdCwgc3JjLCB0cnVlKTtcbn0sICdtZXJnZScsICdVc2UgYGFzc2lnbmAuJyk7XG5cbi8qKlxuICogc2ltcGxlIGNsYXNzIGluaGVyaXRhbmNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGlsZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gYmFzZVxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzXVxuICovXG5mdW5jdGlvbiBpbmhlcml0KGNoaWxkLCBiYXNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIGJhc2VQID0gYmFzZS5wcm90b3R5cGUsXG4gICAgICAgIGNoaWxkUDtcblxuICAgIGNoaWxkUCA9IGNoaWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYmFzZVApO1xuICAgIGNoaWxkUC5jb25zdHJ1Y3RvciA9IGNoaWxkO1xuICAgIGNoaWxkUC5fc3VwZXIgPSBiYXNlUDtcblxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGFzc2lnbihjaGlsZFAsIHByb3BlcnRpZXMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBzaW1wbGUgZnVuY3Rpb24gYmluZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGJpbmRGbihmbiwgY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBib3VuZEZuKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG4vKipcbiAqIGxldCBhIGJvb2xlYW4gdmFsdWUgYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgbXVzdCByZXR1cm4gYSBib29sZWFuXG4gKiB0aGlzIGZpcnN0IGl0ZW0gaW4gYXJncyB3aWxsIGJlIHVzZWQgYXMgdGhlIGNvbnRleHRcbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gdmFsXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJnc11cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBib29sT3JGbih2YWwsIGFyZ3MpIHtcbiAgICBpZiAodHlwZW9mIHZhbCA9PSBUWVBFX0ZVTkNUSU9OKSB7XG4gICAgICAgIHJldHVybiB2YWwuYXBwbHkoYXJncyA/IGFyZ3NbMF0gfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiB1c2UgdGhlIHZhbDIgd2hlbiB2YWwxIGlzIHVuZGVmaW5lZFxuICogQHBhcmFtIHsqfSB2YWwxXG4gKiBAcGFyYW0geyp9IHZhbDJcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBpZlVuZGVmaW5lZCh2YWwxLCB2YWwyKSB7XG4gICAgcmV0dXJuICh2YWwxID09PSB1bmRlZmluZWQpID8gdmFsMiA6IHZhbDE7XG59XG5cbi8qKlxuICogYWRkRXZlbnRMaXN0ZW5lciB3aXRoIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICovXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyh0YXJnZXQsIHR5cGVzLCBoYW5kbGVyKSB7XG4gICAgZWFjaChzcGxpdFN0cih0eXBlcyksIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXIgd2l0aCBtdWx0aXBsZSBldmVudHMgYXQgb25jZVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0LCB0eXBlcywgaGFuZGxlcikge1xuICAgIGVhY2goc3BsaXRTdHIodHlwZXMpLCBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBmaW5kIGlmIGEgbm9kZSBpcyBpbiB0aGUgZ2l2ZW4gcGFyZW50XG4gKiBAbWV0aG9kIGhhc1BhcmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufSBmb3VuZFxuICovXG5mdW5jdGlvbiBoYXNQYXJlbnQobm9kZSwgcGFyZW50KSB7XG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogc21hbGwgaW5kZXhPZiB3cmFwcGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmluZFxuICogQHJldHVybnMge0Jvb2xlYW59IGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGluU3RyKHN0ciwgZmluZCkge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihmaW5kKSA+IC0xO1xufVxuXG4vKipcbiAqIHNwbGl0IHN0cmluZyBvbiB3aGl0ZXNwYWNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7QXJyYXl9IHdvcmRzXG4gKi9cbmZ1bmN0aW9uIHNwbGl0U3RyKHN0cikge1xuICAgIHJldHVybiBzdHIudHJpbSgpLnNwbGl0KC9cXHMrL2cpO1xufVxuXG4vKipcbiAqIGZpbmQgaWYgYSBhcnJheSBjb250YWlucyB0aGUgb2JqZWN0IHVzaW5nIGluZGV4T2Ygb3IgYSBzaW1wbGUgcG9seUZpbGxcbiAqIEBwYXJhbSB7QXJyYXl9IHNyY1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbZmluZEJ5S2V5XVxuICogQHJldHVybiB7Qm9vbGVhbnxOdW1iZXJ9IGZhbHNlIHdoZW4gbm90IGZvdW5kLCBvciB0aGUgaW5kZXhcbiAqL1xuZnVuY3Rpb24gaW5BcnJheShzcmMsIGZpbmQsIGZpbmRCeUtleSkge1xuICAgIGlmIChzcmMuaW5kZXhPZiAmJiAhZmluZEJ5S2V5KSB7XG4gICAgICAgIHJldHVybiBzcmMuaW5kZXhPZihmaW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKChmaW5kQnlLZXkgJiYgc3JjW2ldW2ZpbmRCeUtleV0gPT0gZmluZCkgfHwgKCFmaW5kQnlLZXkgJiYgc3JjW2ldID09PSBmaW5kKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG59XG5cbi8qKlxuICogY29udmVydCBhcnJheS1saWtlIG9iamVjdHMgdG8gcmVhbCBhcnJheXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqLCAwKTtcbn1cblxuLyoqXG4gKiB1bmlxdWUgYXJyYXkgd2l0aCBvYmplY3RzIGJhc2VkIG9uIGEga2V5IChsaWtlICdpZCcpIG9yIGp1c3QgYnkgdGhlIGFycmF5J3MgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IHNyYyBbe2lkOjF9LHtpZDoyfSx7aWQ6MX1dXG4gKiBAcGFyYW0ge1N0cmluZ30gW2tleV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NvcnQ9RmFsc2VdXG4gKiBAcmV0dXJucyB7QXJyYXl9IFt7aWQ6MX0se2lkOjJ9XVxuICovXG5mdW5jdGlvbiB1bmlxdWVBcnJheShzcmMsIGtleSwgc29ydCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhciBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgc3JjLmxlbmd0aCkge1xuICAgICAgICB2YXIgdmFsID0ga2V5ID8gc3JjW2ldW2tleV0gOiBzcmNbaV07XG4gICAgICAgIGlmIChpbkFycmF5KHZhbHVlcywgdmFsKSA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChzcmNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlc1tpXSA9IHZhbDtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmIChzb3J0KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zb3J0KGZ1bmN0aW9uIHNvcnRVbmlxdWVBcnJheShhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFba2V5XSA+IGJba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8qKlxuICogZ2V0IHRoZSBwcmVmaXhlZCBwcm9wZXJ0eVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7U3RyaW5nfFVuZGVmaW5lZH0gcHJlZml4ZWRcbiAqL1xuZnVuY3Rpb24gcHJlZml4ZWQob2JqLCBwcm9wZXJ0eSkge1xuICAgIHZhciBwcmVmaXgsIHByb3A7XG4gICAgdmFyIGNhbWVsUHJvcCA9IHByb3BlcnR5WzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IFZFTkRPUl9QUkVGSVhFUy5sZW5ndGgpIHtcbiAgICAgICAgcHJlZml4ID0gVkVORE9SX1BSRUZJWEVTW2ldO1xuICAgICAgICBwcm9wID0gKHByZWZpeCkgPyBwcmVmaXggKyBjYW1lbFByb3AgOiBwcm9wZXJ0eTtcblxuICAgICAgICBpZiAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBnZXQgYSB1bmlxdWUgaWRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHVuaXF1ZUlkXG4gKi9cbnZhciBfdW5pcXVlSWQgPSAxO1xuZnVuY3Rpb24gdW5pcXVlSWQoKSB7XG4gICAgcmV0dXJuIF91bmlxdWVJZCsrO1xufVxuXG4vKipcbiAqIGdldCB0aGUgd2luZG93IG9iamVjdCBvZiBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RG9jdW1lbnRWaWV3fFdpbmRvd31cbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93Rm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgdmFyIGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBlbGVtZW50O1xuICAgIHJldHVybiAoZG9jLmRlZmF1bHRWaWV3IHx8IGRvYy5wYXJlbnRXaW5kb3cgfHwgd2luZG93KTtcbn1cblxudmFyIE1PQklMRV9SRUdFWCA9IC9tb2JpbGV8dGFibGV0fGlwKGFkfGhvbmV8b2QpfGFuZHJvaWQvaTtcblxudmFyIFNVUFBPUlRfVE9VQ0ggPSAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KTtcbnZhciBTVVBQT1JUX1BPSU5URVJfRVZFTlRTID0gcHJlZml4ZWQod2luZG93LCAnUG9pbnRlckV2ZW50JykgIT09IHVuZGVmaW5lZDtcbnZhciBTVVBQT1JUX09OTFlfVE9VQ0ggPSBTVVBQT1JUX1RPVUNIICYmIE1PQklMRV9SRUdFWC50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG52YXIgSU5QVVRfVFlQRV9UT1VDSCA9ICd0b3VjaCc7XG52YXIgSU5QVVRfVFlQRV9QRU4gPSAncGVuJztcbnZhciBJTlBVVF9UWVBFX01PVVNFID0gJ21vdXNlJztcbnZhciBJTlBVVF9UWVBFX0tJTkVDVCA9ICdraW5lY3QnO1xuXG52YXIgQ09NUFVURV9JTlRFUlZBTCA9IDI1O1xuXG52YXIgSU5QVVRfU1RBUlQgPSAxO1xudmFyIElOUFVUX01PVkUgPSAyO1xudmFyIElOUFVUX0VORCA9IDQ7XG52YXIgSU5QVVRfQ0FOQ0VMID0gODtcblxudmFyIERJUkVDVElPTl9OT05FID0gMTtcbnZhciBESVJFQ1RJT05fTEVGVCA9IDI7XG52YXIgRElSRUNUSU9OX1JJR0hUID0gNDtcbnZhciBESVJFQ1RJT05fVVAgPSA4O1xudmFyIERJUkVDVElPTl9ET1dOID0gMTY7XG5cbnZhciBESVJFQ1RJT05fSE9SSVpPTlRBTCA9IERJUkVDVElPTl9MRUZUIHwgRElSRUNUSU9OX1JJR0hUO1xudmFyIERJUkVDVElPTl9WRVJUSUNBTCA9IERJUkVDVElPTl9VUCB8IERJUkVDVElPTl9ET1dOO1xudmFyIERJUkVDVElPTl9BTEwgPSBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTDtcblxudmFyIFBST1BTX1hZID0gWyd4JywgJ3knXTtcbnZhciBQUk9QU19DTElFTlRfWFkgPSBbJ2NsaWVudFgnLCAnY2xpZW50WSddO1xuXG4vKipcbiAqIGNyZWF0ZSBuZXcgaW5wdXQgdHlwZSBtYW5hZ2VyXG4gKiBAcGFyYW0ge01hbmFnZXJ9IG1hbmFnZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7SW5wdXR9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gSW5wdXQobWFuYWdlciwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5lbGVtZW50ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIHRoaXMudGFyZ2V0ID0gbWFuYWdlci5vcHRpb25zLmlucHV0VGFyZ2V0O1xuXG4gICAgLy8gc21hbGxlciB3cmFwcGVyIGFyb3VuZCB0aGUgaGFuZGxlciwgZm9yIHRoZSBzY29wZSBhbmQgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIG1hbmFnZXIsXG4gICAgLy8gc28gd2hlbiBkaXNhYmxlZCB0aGUgaW5wdXQgZXZlbnRzIGFyZSBjb21wbGV0ZWx5IGJ5cGFzc2VkLlxuICAgIHRoaXMuZG9tSGFuZGxlciA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGlmIChib29sT3JGbihtYW5hZ2VyLm9wdGlvbnMuZW5hYmxlLCBbbWFuYWdlcl0pKSB7XG4gICAgICAgICAgICBzZWxmLmhhbmRsZXIoZXYpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG59XG5cbklucHV0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzaG91bGQgaGFuZGxlIHRoZSBpbnB1dEV2ZW50IGRhdGEgYW5kIHRyaWdnZXIgdGhlIGNhbGxiYWNrXG4gICAgICogQHZpcnR1YWxcbiAgICAgKi9cbiAgICBoYW5kbGVyOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgYWRkRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgYWRkRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1bmJpbmQgdGhlIGV2ZW50c1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmV2RWwgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy5lbGVtZW50LCB0aGlzLmV2RWwsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZUYXJnZXQgJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGhpcy50YXJnZXQsIHRoaXMuZXZUYXJnZXQsIHRoaXMuZG9tSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZXZXaW4gJiYgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoZ2V0V2luZG93Rm9yRWxlbWVudCh0aGlzLmVsZW1lbnQpLCB0aGlzLmV2V2luLCB0aGlzLmRvbUhhbmRsZXIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogY3JlYXRlIG5ldyBpbnB1dCB0eXBlIG1hbmFnZXJcbiAqIGNhbGxlZCBieSB0aGUgTWFuYWdlciBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtIYW1tZXJ9IG1hbmFnZXJcbiAqIEByZXR1cm5zIHtJbnB1dH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRJbnN0YW5jZShtYW5hZ2VyKSB7XG4gICAgdmFyIFR5cGU7XG4gICAgdmFyIGlucHV0Q2xhc3MgPSBtYW5hZ2VyLm9wdGlvbnMuaW5wdXRDbGFzcztcblxuICAgIGlmIChpbnB1dENsYXNzKSB7XG4gICAgICAgIFR5cGUgPSBpbnB1dENsYXNzO1xuICAgIH0gZWxzZSBpZiAoU1VQUE9SVF9QT0lOVEVSX0VWRU5UUykge1xuICAgICAgICBUeXBlID0gUG9pbnRlckV2ZW50SW5wdXQ7XG4gICAgfSBlbHNlIGlmIChTVVBQT1JUX09OTFlfVE9VQ0gpIHtcbiAgICAgICAgVHlwZSA9IFRvdWNoSW5wdXQ7XG4gICAgfSBlbHNlIGlmICghU1VQUE9SVF9UT1VDSCkge1xuICAgICAgICBUeXBlID0gTW91c2VJbnB1dDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBUeXBlID0gVG91Y2hNb3VzZUlucHV0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IChUeXBlKShtYW5hZ2VyLCBpbnB1dEhhbmRsZXIpO1xufVxuXG4vKipcbiAqIGhhbmRsZSBpbnB1dCBldmVudHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGlucHV0SGFuZGxlcihtYW5hZ2VyLCBldmVudFR5cGUsIGlucHV0KSB7XG4gICAgdmFyIHBvaW50ZXJzTGVuID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBjaGFuZ2VkUG9pbnRlcnNMZW4gPSBpbnB1dC5jaGFuZ2VkUG9pbnRlcnMubGVuZ3RoO1xuICAgIHZhciBpc0ZpcnN0ID0gKGV2ZW50VHlwZSAmIElOUFVUX1NUQVJUICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuICAgIHZhciBpc0ZpbmFsID0gKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpICYmIChwb2ludGVyc0xlbiAtIGNoYW5nZWRQb2ludGVyc0xlbiA9PT0gMCkpO1xuXG4gICAgaW5wdXQuaXNGaXJzdCA9ICEhaXNGaXJzdDtcbiAgICBpbnB1dC5pc0ZpbmFsID0gISFpc0ZpbmFsO1xuXG4gICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgbWFuYWdlci5zZXNzaW9uID0ge307XG4gICAgfVxuXG4gICAgLy8gc291cmNlIGV2ZW50IGlzIHRoZSBub3JtYWxpemVkIHZhbHVlIG9mIHRoZSBkb21FdmVudHNcbiAgICAvLyBsaWtlICd0b3VjaHN0YXJ0LCBtb3VzZXVwLCBwb2ludGVyZG93bidcbiAgICBpbnB1dC5ldmVudFR5cGUgPSBldmVudFR5cGU7XG5cbiAgICAvLyBjb21wdXRlIHNjYWxlLCByb3RhdGlvbiBldGNcbiAgICBjb21wdXRlSW5wdXREYXRhKG1hbmFnZXIsIGlucHV0KTtcblxuICAgIC8vIGVtaXQgc2VjcmV0IGV2ZW50XG4gICAgbWFuYWdlci5lbWl0KCdoYW1tZXIuaW5wdXQnLCBpbnB1dCk7XG5cbiAgICBtYW5hZ2VyLnJlY29nbml6ZShpbnB1dCk7XG4gICAgbWFuYWdlci5zZXNzaW9uLnByZXZJbnB1dCA9IGlucHV0O1xufVxuXG4vKipcbiAqIGV4dGVuZCB0aGUgZGF0YSB3aXRoIHNvbWUgdXNhYmxlIHByb3BlcnRpZXMgbGlrZSBzY2FsZSwgcm90YXRlLCB2ZWxvY2l0eSBldGNcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYW5hZ2VyXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUlucHV0RGF0YShtYW5hZ2VyLCBpbnB1dCkge1xuICAgIHZhciBzZXNzaW9uID0gbWFuYWdlci5zZXNzaW9uO1xuICAgIHZhciBwb2ludGVycyA9IGlucHV0LnBvaW50ZXJzO1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIHN0b3JlIHRoZSBmaXJzdCBpbnB1dCB0byBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGFuZCBkaXJlY3Rpb25cbiAgICBpZiAoIXNlc3Npb24uZmlyc3RJbnB1dCkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0SW5wdXQgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfVxuXG4gICAgLy8gdG8gY29tcHV0ZSBzY2FsZSBhbmQgcm90YXRpb24gd2UgbmVlZCB0byBzdG9yZSB0aGUgbXVsdGlwbGUgdG91Y2hlc1xuICAgIGlmIChwb2ludGVyc0xlbmd0aCA+IDEgJiYgIXNlc3Npb24uZmlyc3RNdWx0aXBsZSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyc0xlbmd0aCA9PT0gMSkge1xuICAgICAgICBzZXNzaW9uLmZpcnN0TXVsdGlwbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3RJbnB1dCA9IHNlc3Npb24uZmlyc3RJbnB1dDtcbiAgICB2YXIgZmlyc3RNdWx0aXBsZSA9IHNlc3Npb24uZmlyc3RNdWx0aXBsZTtcbiAgICB2YXIgb2Zmc2V0Q2VudGVyID0gZmlyc3RNdWx0aXBsZSA/IGZpcnN0TXVsdGlwbGUuY2VudGVyIDogZmlyc3RJbnB1dC5jZW50ZXI7XG5cbiAgICB2YXIgY2VudGVyID0gaW5wdXQuY2VudGVyID0gZ2V0Q2VudGVyKHBvaW50ZXJzKTtcbiAgICBpbnB1dC50aW1lU3RhbXAgPSBub3coKTtcbiAgICBpbnB1dC5kZWx0YVRpbWUgPSBpbnB1dC50aW1lU3RhbXAgLSBmaXJzdElucHV0LnRpbWVTdGFtcDtcblxuICAgIGlucHV0LmFuZ2xlID0gZ2V0QW5nbGUob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuICAgIGlucHV0LmRpc3RhbmNlID0gZ2V0RGlzdGFuY2Uob2Zmc2V0Q2VudGVyLCBjZW50ZXIpO1xuXG4gICAgY29tcHV0ZURlbHRhWFkoc2Vzc2lvbiwgaW5wdXQpO1xuICAgIGlucHV0Lm9mZnNldERpcmVjdGlvbiA9IGdldERpcmVjdGlvbihpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG5cbiAgICB2YXIgb3ZlcmFsbFZlbG9jaXR5ID0gZ2V0VmVsb2NpdHkoaW5wdXQuZGVsdGFUaW1lLCBpbnB1dC5kZWx0YVgsIGlucHV0LmRlbHRhWSk7XG4gICAgaW5wdXQub3ZlcmFsbFZlbG9jaXR5WCA9IG92ZXJhbGxWZWxvY2l0eS54O1xuICAgIGlucHV0Lm92ZXJhbGxWZWxvY2l0eVkgPSBvdmVyYWxsVmVsb2NpdHkueTtcbiAgICBpbnB1dC5vdmVyYWxsVmVsb2NpdHkgPSAoYWJzKG92ZXJhbGxWZWxvY2l0eS54KSA+IGFicyhvdmVyYWxsVmVsb2NpdHkueSkpID8gb3ZlcmFsbFZlbG9jaXR5LnggOiBvdmVyYWxsVmVsb2NpdHkueTtcblxuICAgIGlucHV0LnNjYWxlID0gZmlyc3RNdWx0aXBsZSA/IGdldFNjYWxlKGZpcnN0TXVsdGlwbGUucG9pbnRlcnMsIHBvaW50ZXJzKSA6IDE7XG4gICAgaW5wdXQucm90YXRpb24gPSBmaXJzdE11bHRpcGxlID8gZ2V0Um90YXRpb24oZmlyc3RNdWx0aXBsZS5wb2ludGVycywgcG9pbnRlcnMpIDogMDtcblxuICAgIGlucHV0Lm1heFBvaW50ZXJzID0gIXNlc3Npb24ucHJldklucHV0ID8gaW5wdXQucG9pbnRlcnMubGVuZ3RoIDogKChpbnB1dC5wb2ludGVycy5sZW5ndGggPlxuICAgICAgICBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycykgPyBpbnB1dC5wb2ludGVycy5sZW5ndGggOiBzZXNzaW9uLnByZXZJbnB1dC5tYXhQb2ludGVycyk7XG5cbiAgICBjb21wdXRlSW50ZXJ2YWxJbnB1dERhdGEoc2Vzc2lvbiwgaW5wdXQpO1xuXG4gICAgLy8gZmluZCB0aGUgY29ycmVjdCB0YXJnZXRcbiAgICB2YXIgdGFyZ2V0ID0gbWFuYWdlci5lbGVtZW50O1xuICAgIGlmIChoYXNQYXJlbnQoaW5wdXQuc3JjRXZlbnQudGFyZ2V0LCB0YXJnZXQpKSB7XG4gICAgICAgIHRhcmdldCA9IGlucHV0LnNyY0V2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgaW5wdXQudGFyZ2V0ID0gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBjb21wdXRlRGVsdGFYWShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBjZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG4gICAgdmFyIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgfHwge307XG4gICAgdmFyIHByZXZEZWx0YSA9IHNlc3Npb24ucHJldkRlbHRhIHx8IHt9O1xuICAgIHZhciBwcmV2SW5wdXQgPSBzZXNzaW9uLnByZXZJbnB1dCB8fCB7fTtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX1NUQVJUIHx8IHByZXZJbnB1dC5ldmVudFR5cGUgPT09IElOUFVUX0VORCkge1xuICAgICAgICBwcmV2RGVsdGEgPSBzZXNzaW9uLnByZXZEZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IHByZXZJbnB1dC5kZWx0YVggfHwgMCxcbiAgICAgICAgICAgIHk6IHByZXZJbnB1dC5kZWx0YVkgfHwgMFxuICAgICAgICB9O1xuXG4gICAgICAgIG9mZnNldCA9IHNlc3Npb24ub2Zmc2V0RGVsdGEgPSB7XG4gICAgICAgICAgICB4OiBjZW50ZXIueCxcbiAgICAgICAgICAgIHk6IGNlbnRlci55XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaW5wdXQuZGVsdGFYID0gcHJldkRlbHRhLnggKyAoY2VudGVyLnggLSBvZmZzZXQueCk7XG4gICAgaW5wdXQuZGVsdGFZID0gcHJldkRlbHRhLnkgKyAoY2VudGVyLnkgLSBvZmZzZXQueSk7XG59XG5cbi8qKlxuICogdmVsb2NpdHkgaXMgY2FsY3VsYXRlZCBldmVyeSB4IG1zXG4gKiBAcGFyYW0ge09iamVjdH0gc2Vzc2lvblxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbnRlcnZhbElucHV0RGF0YShzZXNzaW9uLCBpbnB1dCkge1xuICAgIHZhciBsYXN0ID0gc2Vzc2lvbi5sYXN0SW50ZXJ2YWwgfHwgaW5wdXQsXG4gICAgICAgIGRlbHRhVGltZSA9IGlucHV0LnRpbWVTdGFtcCAtIGxhc3QudGltZVN0YW1wLFxuICAgICAgICB2ZWxvY2l0eSwgdmVsb2NpdHlYLCB2ZWxvY2l0eVksIGRpcmVjdGlvbjtcblxuICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfQ0FOQ0VMICYmIChkZWx0YVRpbWUgPiBDT01QVVRFX0lOVEVSVkFMIHx8IGxhc3QudmVsb2NpdHkgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgdmFyIGRlbHRhWCA9IGlucHV0LmRlbHRhWCAtIGxhc3QuZGVsdGFYO1xuICAgICAgICB2YXIgZGVsdGFZID0gaW5wdXQuZGVsdGFZIC0gbGFzdC5kZWx0YVk7XG5cbiAgICAgICAgdmFyIHYgPSBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgICAgdmVsb2NpdHlYID0gdi54O1xuICAgICAgICB2ZWxvY2l0eVkgPSB2Lnk7XG4gICAgICAgIHZlbG9jaXR5ID0gKGFicyh2LngpID4gYWJzKHYueSkpID8gdi54IDogdi55O1xuICAgICAgICBkaXJlY3Rpb24gPSBnZXREaXJlY3Rpb24oZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIHNlc3Npb24ubGFzdEludGVydmFsID0gaW5wdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXNlIGxhdGVzdCB2ZWxvY2l0eSBpbmZvIGlmIGl0IGRvZXNuJ3Qgb3ZlcnRha2UgYSBtaW5pbXVtIHBlcmlvZFxuICAgICAgICB2ZWxvY2l0eSA9IGxhc3QudmVsb2NpdHk7XG4gICAgICAgIHZlbG9jaXR5WCA9IGxhc3QudmVsb2NpdHlYO1xuICAgICAgICB2ZWxvY2l0eVkgPSBsYXN0LnZlbG9jaXR5WTtcbiAgICAgICAgZGlyZWN0aW9uID0gbGFzdC5kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgaW5wdXQudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICBpbnB1dC52ZWxvY2l0eVggPSB2ZWxvY2l0eVg7XG4gICAgaW5wdXQudmVsb2NpdHlZID0gdmVsb2NpdHlZO1xuICAgIGlucHV0LmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBzaW1wbGUgY2xvbmUgZnJvbSB0aGUgaW5wdXQgdXNlZCBmb3Igc3RvcmFnZSBvZiBmaXJzdElucHV0IGFuZCBmaXJzdE11bHRpcGxlXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9IGNsb25lZElucHV0RGF0YVxuICovXG5mdW5jdGlvbiBzaW1wbGVDbG9uZUlucHV0RGF0YShpbnB1dCkge1xuICAgIC8vIG1ha2UgYSBzaW1wbGUgY29weSBvZiB0aGUgcG9pbnRlcnMgYmVjYXVzZSB3ZSB3aWxsIGdldCBhIHJlZmVyZW5jZSBpZiB3ZSBkb24ndFxuICAgIC8vIHdlIG9ubHkgbmVlZCBjbGllbnRYWSBmb3IgdGhlIGNhbGN1bGF0aW9uc1xuICAgIHZhciBwb2ludGVycyA9IFtdO1xuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGlucHV0LnBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICBwb2ludGVyc1tpXSA9IHtcbiAgICAgICAgICAgIGNsaWVudFg6IHJvdW5kKGlucHV0LnBvaW50ZXJzW2ldLmNsaWVudFgpLFxuICAgICAgICAgICAgY2xpZW50WTogcm91bmQoaW5wdXQucG9pbnRlcnNbaV0uY2xpZW50WSlcbiAgICAgICAgfTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHRpbWVTdGFtcDogbm93KCksXG4gICAgICAgIHBvaW50ZXJzOiBwb2ludGVycyxcbiAgICAgICAgY2VudGVyOiBnZXRDZW50ZXIocG9pbnRlcnMpLFxuICAgICAgICBkZWx0YVg6IGlucHV0LmRlbHRhWCxcbiAgICAgICAgZGVsdGFZOiBpbnB1dC5kZWx0YVlcbiAgICB9O1xufVxuXG4vKipcbiAqIGdldCB0aGUgY2VudGVyIG9mIGFsbCB0aGUgcG9pbnRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtPYmplY3R9IGNlbnRlciBjb250YWlucyBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldENlbnRlcihwb2ludGVycykge1xuICAgIHZhciBwb2ludGVyc0xlbmd0aCA9IHBvaW50ZXJzLmxlbmd0aDtcblxuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB3aGVuIG9ubHkgb25lIHRvdWNoXG4gICAgaWYgKHBvaW50ZXJzTGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiByb3VuZChwb2ludGVyc1swXS5jbGllbnRYKSxcbiAgICAgICAgICAgIHk6IHJvdW5kKHBvaW50ZXJzWzBdLmNsaWVudFkpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHggPSAwLCB5ID0gMCwgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBwb2ludGVyc0xlbmd0aCkge1xuICAgICAgICB4ICs9IHBvaW50ZXJzW2ldLmNsaWVudFg7XG4gICAgICAgIHkgKz0gcG9pbnRlcnNbaV0uY2xpZW50WTtcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHJvdW5kKHggLyBwb2ludGVyc0xlbmd0aCksXG4gICAgICAgIHk6IHJvdW5kKHkgLyBwb2ludGVyc0xlbmd0aClcbiAgICB9O1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgdmVsb2NpdHkgYmV0d2VlbiB0d28gcG9pbnRzLiB1bml0IGlzIGluIHB4IHBlciBtcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVRpbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHJldHVybiB7T2JqZWN0fSB2ZWxvY2l0eSBgeGAgYW5kIGB5YFxuICovXG5mdW5jdGlvbiBnZXRWZWxvY2l0eShkZWx0YVRpbWUsIHgsIHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4IC8gZGVsdGFUaW1lIHx8IDAsXG4gICAgICAgIHk6IHkgLyBkZWx0YVRpbWUgfHwgMFxuICAgIH07XG59XG5cbi8qKlxuICogZ2V0IHRoZSBkaXJlY3Rpb24gYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm4ge051bWJlcn0gZGlyZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldERpcmVjdGlvbih4LCB5KSB7XG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgICAgcmV0dXJuIERJUkVDVElPTl9OT05FO1xuICAgIH1cblxuICAgIGlmIChhYnMoeCkgPj0gYWJzKHkpKSB7XG4gICAgICAgIHJldHVybiB4IDwgMCA/IERJUkVDVElPTl9MRUZUIDogRElSRUNUSU9OX1JJR0hUO1xuICAgIH1cbiAgICByZXR1cm4geSA8IDAgPyBESVJFQ1RJT05fVVAgOiBESVJFQ1RJT05fRE9XTjtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIGFic29sdXRlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHtPYmplY3R9IHAxIHt4LCB5fVxuICogQHBhcmFtIHtPYmplY3R9IHAyIHt4LCB5fVxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzXSBjb250YWluaW5nIHggYW5kIHkga2V5c1xuICogQHJldHVybiB7TnVtYmVyfSBkaXN0YW5jZVxuICovXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcykge1xuICAgICAgICBwcm9wcyA9IFBST1BTX1hZO1xuICAgIH1cbiAgICB2YXIgeCA9IHAyW3Byb3BzWzBdXSAtIHAxW3Byb3BzWzBdXSxcbiAgICAgICAgeSA9IHAyW3Byb3BzWzFdXSAtIHAxW3Byb3BzWzFdXTtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoKHggKiB4KSArICh5ICogeSkpO1xufVxuXG4vKipcbiAqIGNhbGN1bGF0ZSB0aGUgYW5nbGUgYmV0d2VlbiB0d28gY29vcmRpbmF0ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwMVxuICogQHBhcmFtIHtPYmplY3R9IHAyXG4gKiBAcGFyYW0ge0FycmF5fSBbcHJvcHNdIGNvbnRhaW5pbmcgeCBhbmQgeSBrZXlzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IGFuZ2xlXG4gKi9cbmZ1bmN0aW9uIGdldEFuZ2xlKHAxLCBwMiwgcHJvcHMpIHtcbiAgICBpZiAoIXByb3BzKSB7XG4gICAgICAgIHByb3BzID0gUFJPUFNfWFk7XG4gICAgfVxuICAgIHZhciB4ID0gcDJbcHJvcHNbMF1dIC0gcDFbcHJvcHNbMF1dLFxuICAgICAgICB5ID0gcDJbcHJvcHNbMV1dIC0gcDFbcHJvcHNbMV1dO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKHksIHgpICogMTgwIC8gTWF0aC5QSTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHJvdGF0aW9uIGRlZ3JlZXMgYmV0d2VlbiB0d28gcG9pbnRlcnNldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0YXJ0IGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBlbmQgYXJyYXkgb2YgcG9pbnRlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gcm90YXRpb25cbiAqL1xuZnVuY3Rpb24gZ2V0Um90YXRpb24oc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiBnZXRBbmdsZShlbmRbMV0sIGVuZFswXSwgUFJPUFNfQ0xJRU5UX1hZKSArIGdldEFuZ2xlKHN0YXJ0WzFdLCBzdGFydFswXSwgUFJPUFNfQ0xJRU5UX1hZKTtcbn1cblxuLyoqXG4gKiBjYWxjdWxhdGUgdGhlIHNjYWxlIGZhY3RvciBiZXR3ZWVuIHR3byBwb2ludGVyc2V0c1xuICogbm8gc2NhbGUgaXMgMSwgYW5kIGdvZXMgZG93biB0byAwIHdoZW4gcGluY2hlZCB0b2dldGhlciwgYW5kIGJpZ2dlciB3aGVuIHBpbmNoZWQgb3V0XG4gKiBAcGFyYW0ge0FycmF5fSBzdGFydCBhcnJheSBvZiBwb2ludGVyc1xuICogQHBhcmFtIHtBcnJheX0gZW5kIGFycmF5IG9mIHBvaW50ZXJzXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHNjYWxlXG4gKi9cbmZ1bmN0aW9uIGdldFNjYWxlKHN0YXJ0LCBlbmQpIHtcbiAgICByZXR1cm4gZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0sIFBST1BTX0NMSUVOVF9YWSkgLyBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0sIFBST1BTX0NMSUVOVF9YWSk7XG59XG5cbnZhciBNT1VTRV9JTlBVVF9NQVAgPSB7XG4gICAgbW91c2Vkb3duOiBJTlBVVF9TVEFSVCxcbiAgICBtb3VzZW1vdmU6IElOUFVUX01PVkUsXG4gICAgbW91c2V1cDogSU5QVVRfRU5EXG59O1xuXG52YXIgTU9VU0VfRUxFTUVOVF9FVkVOVFMgPSAnbW91c2Vkb3duJztcbnZhciBNT1VTRV9XSU5ET1dfRVZFTlRTID0gJ21vdXNlbW92ZSBtb3VzZXVwJztcblxuLyoqXG4gKiBNb3VzZSBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gTW91c2VJbnB1dCgpIHtcbiAgICB0aGlzLmV2RWwgPSBNT1VTRV9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gTU9VU0VfV0lORE9XX0VWRU5UUztcblxuICAgIHRoaXMucHJlc3NlZCA9IGZhbHNlOyAvLyBtb3VzZWRvd24gc3RhdGVcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoTW91c2VJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gTUVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBNT1VTRV9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gb24gc3RhcnQgd2Ugd2FudCB0byBoYXZlIHRoZSBsZWZ0IG1vdXNlIGJ1dHRvbiBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiBldi5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlc3NlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfTU9WRSAmJiBldi53aGljaCAhPT0gMSkge1xuICAgICAgICAgICAgZXZlbnRUeXBlID0gSU5QVVRfRU5EO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmICghdGhpcy5wcmVzc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiBbZXZdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfTU9VU0UsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBQT0lOVEVSX0lOUFVUX01BUCA9IHtcbiAgICBwb2ludGVyZG93bjogSU5QVVRfU1RBUlQsXG4gICAgcG9pbnRlcm1vdmU6IElOUFVUX01PVkUsXG4gICAgcG9pbnRlcnVwOiBJTlBVVF9FTkQsXG4gICAgcG9pbnRlcmNhbmNlbDogSU5QVVRfQ0FOQ0VMLFxuICAgIHBvaW50ZXJvdXQ6IElOUFVUX0NBTkNFTFxufTtcblxuLy8gaW4gSUUxMCB0aGUgcG9pbnRlciB0eXBlcyBpcyBkZWZpbmVkIGFzIGFuIGVudW1cbnZhciBJRTEwX1BPSU5URVJfVFlQRV9FTlVNID0ge1xuICAgIDI6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgMzogSU5QVVRfVFlQRV9QRU4sXG4gICAgNDogSU5QVVRfVFlQRV9NT1VTRSxcbiAgICA1OiBJTlBVVF9UWVBFX0tJTkVDVCAvLyBzZWUgaHR0cHM6Ly90d2l0dGVyLmNvbS9qYWNvYnJvc3NpL3N0YXR1cy80ODA1OTY0Mzg0ODk4OTA4MTZcbn07XG5cbnZhciBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ3BvaW50ZXJkb3duJztcbnZhciBQT0lOVEVSX1dJTkRPV19FVkVOVFMgPSAncG9pbnRlcm1vdmUgcG9pbnRlcnVwIHBvaW50ZXJjYW5jZWwnO1xuXG4vLyBJRTEwIGhhcyBwcmVmaXhlZCBzdXBwb3J0LCBhbmQgY2FzZS1zZW5zaXRpdmVcbmlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQgJiYgIXdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICBQT0lOVEVSX0VMRU1FTlRfRVZFTlRTID0gJ01TUG9pbnRlckRvd24nO1xuICAgIFBPSU5URVJfV0lORE9XX0VWRU5UUyA9ICdNU1BvaW50ZXJNb3ZlIE1TUG9pbnRlclVwIE1TUG9pbnRlckNhbmNlbCc7XG59XG5cbi8qKlxuICogUG9pbnRlciBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gUG9pbnRlckV2ZW50SW5wdXQoKSB7XG4gICAgdGhpcy5ldkVsID0gUE9JTlRFUl9FTEVNRU5UX0VWRU5UUztcbiAgICB0aGlzLmV2V2luID0gUE9JTlRFUl9XSU5ET1dfRVZFTlRTO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuc3RvcmUgPSAodGhpcy5tYW5hZ2VyLnNlc3Npb24ucG9pbnRlckV2ZW50cyA9IFtdKTtcbn1cblxuaW5oZXJpdChQb2ludGVyRXZlbnRJbnB1dCwgSW5wdXQsIHtcbiAgICAvKipcbiAgICAgKiBoYW5kbGUgbW91c2UgZXZlbnRzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2XG4gICAgICovXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gUEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciBzdG9yZSA9IHRoaXMuc3RvcmU7XG4gICAgICAgIHZhciByZW1vdmVQb2ludGVyID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGV2ZW50VHlwZU5vcm1hbGl6ZWQgPSBldi50eXBlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnbXMnLCAnJyk7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBQT0lOVEVSX0lOUFVUX01BUFtldmVudFR5cGVOb3JtYWxpemVkXTtcbiAgICAgICAgdmFyIHBvaW50ZXJUeXBlID0gSUUxMF9QT0lOVEVSX1RZUEVfRU5VTVtldi5wb2ludGVyVHlwZV0gfHwgZXYucG9pbnRlclR5cGU7XG5cbiAgICAgICAgdmFyIGlzVG91Y2ggPSAocG9pbnRlclR5cGUgPT0gSU5QVVRfVFlQRV9UT1VDSCk7XG5cbiAgICAgICAgLy8gZ2V0IGluZGV4IG9mIHRoZSBldmVudCBpbiB0aGUgc3RvcmVcbiAgICAgICAgdmFyIHN0b3JlSW5kZXggPSBpbkFycmF5KHN0b3JlLCBldi5wb2ludGVySWQsICdwb2ludGVySWQnKTtcblxuICAgICAgICAvLyBzdGFydCBhbmQgbW91c2UgbXVzdCBiZSBkb3duXG4gICAgICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCAmJiAoZXYuYnV0dG9uID09PSAwIHx8IGlzVG91Y2gpKSB7XG4gICAgICAgICAgICBpZiAoc3RvcmVJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgICBzdG9yZUluZGV4ID0gc3RvcmUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudFR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSkge1xuICAgICAgICAgICAgcmVtb3ZlUG9pbnRlciA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdCBub3QgZm91bmQsIHNvIHRoZSBwb2ludGVyIGhhc24ndCBiZWVuIGRvd24gKHNvIGl0J3MgcHJvYmFibHkgYSBob3ZlcilcbiAgICAgICAgaWYgKHN0b3JlSW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV2ZW50IGluIHRoZSBzdG9yZVxuICAgICAgICBzdG9yZVtzdG9yZUluZGV4XSA9IGV2O1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCBldmVudFR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiBzdG9yZSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogW2V2XSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBwb2ludGVyVHlwZSxcbiAgICAgICAgICAgIHNyY0V2ZW50OiBldlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVtb3ZlUG9pbnRlcikge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gdGhlIHN0b3JlXG4gICAgICAgICAgICBzdG9yZS5zcGxpY2Uoc3RvcmVJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxudmFyIFNJTkdMRV9UT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFNJTkdMRV9UT1VDSF9UQVJHRVRfRVZFTlRTID0gJ3RvdWNoc3RhcnQnO1xudmFyIFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTID0gJ3RvdWNoc3RhcnQgdG91Y2htb3ZlIHRvdWNoZW5kIHRvdWNoY2FuY2VsJztcblxuLyoqXG4gKiBUb3VjaCBldmVudHMgaW5wdXRcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuZnVuY3Rpb24gU2luZ2xlVG91Y2hJbnB1dCgpIHtcbiAgICB0aGlzLmV2VGFyZ2V0ID0gU0lOR0xFX1RPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy5ldldpbiA9IFNJTkdMRV9UT1VDSF9XSU5ET1dfRVZFTlRTO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgSW5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTaW5nbGVUb3VjaElucHV0LCBJbnB1dCwge1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRFaGFuZGxlcihldikge1xuICAgICAgICB2YXIgdHlwZSA9IFNJTkdMRV9UT1VDSF9JTlBVVF9NQVBbZXYudHlwZV07XG5cbiAgICAgICAgLy8gc2hvdWxkIHdlIGhhbmRsZSB0aGUgdG91Y2ggZXZlbnRzP1xuICAgICAgICBpZiAodHlwZSA9PT0gSU5QVVRfU1RBUlQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvdWNoZXMgPSBub3JtYWxpemVTaW5nbGVUb3VjaGVzLmNhbGwodGhpcywgZXYsIHR5cGUpO1xuXG4gICAgICAgIC8vIHdoZW4gZG9uZSwgcmVzZXQgdGhlIHN0YXJ0ZWQgc3RhdGVcbiAgICAgICAgaWYgKHR5cGUgJiAoSU5QVVRfRU5EIHwgSU5QVVRfQ0FOQ0VMKSAmJiB0b3VjaGVzWzBdLmxlbmd0aCAtIHRvdWNoZXNbMV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sodGhpcy5tYW5hZ2VyLCB0eXBlLCB7XG4gICAgICAgICAgICBwb2ludGVyczogdG91Y2hlc1swXSxcbiAgICAgICAgICAgIGNoYW5nZWRQb2ludGVyczogdG91Y2hlc1sxXSxcbiAgICAgICAgICAgIHBvaW50ZXJUeXBlOiBJTlBVVF9UWVBFX1RPVUNILFxuICAgICAgICAgICAgc3JjRXZlbnQ6IGV2XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEB0aGlzIHtUb3VjaElucHV0fVxuICogQHBhcmFtIHtPYmplY3R9IGV2XG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZSBmbGFnXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfEFycmF5fSBbYWxsLCBjaGFuZ2VkXVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVTaW5nbGVUb3VjaGVzKGV2LCB0eXBlKSB7XG4gICAgdmFyIGFsbCA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIGNoYW5nZWQgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKTtcblxuICAgIGlmICh0eXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkpIHtcbiAgICAgICAgYWxsID0gdW5pcXVlQXJyYXkoYWxsLmNvbmNhdChjaGFuZ2VkKSwgJ2lkZW50aWZpZXInLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2FsbCwgY2hhbmdlZF07XG59XG5cbnZhciBUT1VDSF9JTlBVVF9NQVAgPSB7XG4gICAgdG91Y2hzdGFydDogSU5QVVRfU1RBUlQsXG4gICAgdG91Y2htb3ZlOiBJTlBVVF9NT1ZFLFxuICAgIHRvdWNoZW5kOiBJTlBVVF9FTkQsXG4gICAgdG91Y2hjYW5jZWw6IElOUFVUX0NBTkNFTFxufTtcblxudmFyIFRPVUNIX1RBUkdFVF9FVkVOVFMgPSAndG91Y2hzdGFydCB0b3VjaG1vdmUgdG91Y2hlbmQgdG91Y2hjYW5jZWwnO1xuXG4vKipcbiAqIE11bHRpLXVzZXIgdG91Y2ggZXZlbnRzIGlucHV0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIElucHV0XG4gKi9cbmZ1bmN0aW9uIFRvdWNoSW5wdXQoKSB7XG4gICAgdGhpcy5ldlRhcmdldCA9IFRPVUNIX1RBUkdFVF9FVkVOVFM7XG4gICAgdGhpcy50YXJnZXRJZHMgPSB7fTtcblxuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoVG91Y2hJbnB1dCwgSW5wdXQsIHtcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBNVEVoYW5kbGVyKGV2KSB7XG4gICAgICAgIHZhciB0eXBlID0gVE9VQ0hfSU5QVVRfTUFQW2V2LnR5cGVdO1xuICAgICAgICB2YXIgdG91Y2hlcyA9IGdldFRvdWNoZXMuY2FsbCh0aGlzLCBldiwgdHlwZSk7XG4gICAgICAgIGlmICghdG91Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm1hbmFnZXIsIHR5cGUsIHtcbiAgICAgICAgICAgIHBvaW50ZXJzOiB0b3VjaGVzWzBdLFxuICAgICAgICAgICAgY2hhbmdlZFBvaW50ZXJzOiB0b3VjaGVzWzFdLFxuICAgICAgICAgICAgcG9pbnRlclR5cGU6IElOUFVUX1RZUEVfVE9VQ0gsXG4gICAgICAgICAgICBzcmNFdmVudDogZXZcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHRoaXMge1RvdWNoSW5wdXR9XG4gKiBAcGFyYW0ge09iamVjdH0gZXZcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIGZsYWdcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8QXJyYXl9IFthbGwsIGNoYW5nZWRdXG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXMoZXYsIHR5cGUpIHtcbiAgICB2YXIgYWxsVG91Y2hlcyA9IHRvQXJyYXkoZXYudG91Y2hlcyk7XG4gICAgdmFyIHRhcmdldElkcyA9IHRoaXMudGFyZ2V0SWRzO1xuXG4gICAgLy8gd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSB0b3VjaCwgdGhlIHByb2Nlc3MgY2FuIGJlIHNpbXBsaWZpZWRcbiAgICBpZiAodHlwZSAmIChJTlBVVF9TVEFSVCB8IElOUFVUX01PVkUpICYmIGFsbFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRhcmdldElkc1thbGxUb3VjaGVzWzBdLmlkZW50aWZpZXJdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIFthbGxUb3VjaGVzLCBhbGxUb3VjaGVzXTtcbiAgICB9XG5cbiAgICB2YXIgaSxcbiAgICAgICAgdGFyZ2V0VG91Y2hlcyxcbiAgICAgICAgY2hhbmdlZFRvdWNoZXMgPSB0b0FycmF5KGV2LmNoYW5nZWRUb3VjaGVzKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMgPSBbXSxcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG5cbiAgICAvLyBnZXQgdGFyZ2V0IHRvdWNoZXMgZnJvbSB0b3VjaGVzXG4gICAgdGFyZ2V0VG91Y2hlcyA9IGFsbFRvdWNoZXMuZmlsdGVyKGZ1bmN0aW9uKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiBoYXNQYXJlbnQodG91Y2gudGFyZ2V0LCB0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgLy8gY29sbGVjdCB0b3VjaGVzXG4gICAgaWYgKHR5cGUgPT09IElOUFVUX1NUQVJUKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRhcmdldFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXJnZXRJZHNbdGFyZ2V0VG91Y2hlc1tpXS5pZGVudGlmaWVyXSA9IHRydWU7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgY2hhbmdlZCB0b3VjaGVzIHRvIG9ubHkgY29udGFpbiB0b3VjaGVzIHRoYXQgZXhpc3QgaW4gdGhlIGNvbGxlY3RlZCB0YXJnZXQgaWRzXG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBjaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHRhcmdldElkc1tjaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyXSkge1xuICAgICAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXMucHVzaChjaGFuZ2VkVG91Y2hlc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhbnVwIHJlbW92ZWQgdG91Y2hlc1xuICAgICAgICBpZiAodHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgICAgICBkZWxldGUgdGFyZ2V0SWRzW2NoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoIWNoYW5nZWRUYXJnZXRUb3VjaGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgLy8gbWVyZ2UgdGFyZ2V0VG91Y2hlcyB3aXRoIGNoYW5nZWRUYXJnZXRUb3VjaGVzIHNvIGl0IGNvbnRhaW5zIEFMTCB0b3VjaGVzLCBpbmNsdWRpbmcgJ2VuZCcgYW5kICdjYW5jZWwnXG4gICAgICAgIHVuaXF1ZUFycmF5KHRhcmdldFRvdWNoZXMuY29uY2F0KGNoYW5nZWRUYXJnZXRUb3VjaGVzKSwgJ2lkZW50aWZpZXInLCB0cnVlKSxcbiAgICAgICAgY2hhbmdlZFRhcmdldFRvdWNoZXNcbiAgICBdO1xufVxuXG4vKipcbiAqIENvbWJpbmVkIHRvdWNoIGFuZCBtb3VzZSBpbnB1dFxuICpcbiAqIFRvdWNoIGhhcyBhIGhpZ2hlciBwcmlvcml0eSB0aGVuIG1vdXNlLCBhbmQgd2hpbGUgdG91Y2hpbmcgbm8gbW91c2UgZXZlbnRzIGFyZSBhbGxvd2VkLlxuICogVGhpcyBiZWNhdXNlIHRvdWNoIGRldmljZXMgYWxzbyBlbWl0IG1vdXNlIGV2ZW50cyB3aGlsZSBkb2luZyBhIHRvdWNoLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgSW5wdXRcbiAqL1xuXG52YXIgREVEVVBfVElNRU9VVCA9IDI1MDA7XG52YXIgREVEVVBfRElTVEFOQ0UgPSAyNTtcblxuZnVuY3Rpb24gVG91Y2hNb3VzZUlucHV0KCkge1xuICAgIElucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgaGFuZGxlciA9IGJpbmRGbih0aGlzLmhhbmRsZXIsIHRoaXMpO1xuICAgIHRoaXMudG91Y2ggPSBuZXcgVG91Y2hJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuICAgIHRoaXMubW91c2UgPSBuZXcgTW91c2VJbnB1dCh0aGlzLm1hbmFnZXIsIGhhbmRsZXIpO1xuXG4gICAgdGhpcy5wcmltYXJ5VG91Y2ggPSBudWxsO1xuICAgIHRoaXMubGFzdFRvdWNoZXMgPSBbXTtcbn1cblxuaW5oZXJpdChUb3VjaE1vdXNlSW5wdXQsIElucHV0LCB7XG4gICAgLyoqXG4gICAgICogaGFuZGxlIG1vdXNlIGFuZCB0b3VjaCBldmVudHNcbiAgICAgKiBAcGFyYW0ge0hhbW1lcn0gbWFuYWdlclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dEV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0RGF0YVxuICAgICAqL1xuICAgIGhhbmRsZXI6IGZ1bmN0aW9uIFRNRWhhbmRsZXIobWFuYWdlciwgaW5wdXRFdmVudCwgaW5wdXREYXRhKSB7XG4gICAgICAgIHZhciBpc1RvdWNoID0gKGlucHV0RGF0YS5wb2ludGVyVHlwZSA9PSBJTlBVVF9UWVBFX1RPVUNIKSxcbiAgICAgICAgICAgIGlzTW91c2UgPSAoaW5wdXREYXRhLnBvaW50ZXJUeXBlID09IElOUFVUX1RZUEVfTU9VU0UpO1xuXG4gICAgICAgIGlmIChpc01vdXNlICYmIGlucHV0RGF0YS5zb3VyY2VDYXBhYmlsaXRpZXMgJiYgaW5wdXREYXRhLnNvdXJjZUNhcGFiaWxpdGllcy5maXJlc1RvdWNoRXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIHdlJ3JlIGluIGEgdG91Y2ggZXZlbnQsIHJlY29yZCB0b3VjaGVzIHRvICBkZS1kdXBlIHN5bnRoZXRpYyBtb3VzZSBldmVudFxuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgcmVjb3JkVG91Y2hlcy5jYWxsKHRoaXMsIGlucHV0RXZlbnQsIGlucHV0RGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNNb3VzZSAmJiBpc1N5bnRoZXRpY0V2ZW50LmNhbGwodGhpcywgaW5wdXREYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayhtYW5hZ2VyLCBpbnB1dEV2ZW50LCBpbnB1dERhdGEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudG91Y2guZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm1vdXNlLmRlc3Ryb3koKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gcmVjb3JkVG91Y2hlcyhldmVudFR5cGUsIGV2ZW50RGF0YSkge1xuICAgIGlmIChldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICB0aGlzLnByaW1hcnlUb3VjaCA9IGV2ZW50RGF0YS5jaGFuZ2VkUG9pbnRlcnNbMF0uaWRlbnRpZmllcjtcbiAgICAgICAgc2V0TGFzdFRvdWNoLmNhbGwodGhpcywgZXZlbnREYXRhKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZSAmIChJTlBVVF9FTkQgfCBJTlBVVF9DQU5DRUwpKSB7XG4gICAgICAgIHNldExhc3RUb3VjaC5jYWxsKHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRMYXN0VG91Y2goZXZlbnREYXRhKSB7XG4gICAgdmFyIHRvdWNoID0gZXZlbnREYXRhLmNoYW5nZWRQb2ludGVyc1swXTtcblxuICAgIGlmICh0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnByaW1hcnlUb3VjaCkge1xuICAgICAgICB2YXIgbGFzdFRvdWNoID0ge3g6IHRvdWNoLmNsaWVudFgsIHk6IHRvdWNoLmNsaWVudFl9O1xuICAgICAgICB0aGlzLmxhc3RUb3VjaGVzLnB1c2gobGFzdFRvdWNoKTtcbiAgICAgICAgdmFyIGx0cyA9IHRoaXMubGFzdFRvdWNoZXM7XG4gICAgICAgIHZhciByZW1vdmVMYXN0VG91Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpID0gbHRzLmluZGV4T2YobGFzdFRvdWNoKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzZXRUaW1lb3V0KHJlbW92ZUxhc3RUb3VjaCwgREVEVVBfVElNRU9VVCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bnRoZXRpY0V2ZW50KGV2ZW50RGF0YSkge1xuICAgIHZhciB4ID0gZXZlbnREYXRhLnNyY0V2ZW50LmNsaWVudFgsIHkgPSBldmVudERhdGEuc3JjRXZlbnQuY2xpZW50WTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGFzdFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzLmxhc3RUb3VjaGVzW2ldO1xuICAgICAgICB2YXIgZHggPSBNYXRoLmFicyh4IC0gdC54KSwgZHkgPSBNYXRoLmFicyh5IC0gdC55KTtcbiAgICAgICAgaWYgKGR4IDw9IERFRFVQX0RJU1RBTkNFICYmIGR5IDw9IERFRFVQX0RJU1RBTkNFKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbnZhciBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gPSBwcmVmaXhlZChURVNUX0VMRU1FTlQuc3R5bGUsICd0b3VjaEFjdGlvbicpO1xudmFyIE5BVElWRV9UT1VDSF9BQ1RJT04gPSBQUkVGSVhFRF9UT1VDSF9BQ1RJT04gIT09IHVuZGVmaW5lZDtcblxuLy8gbWFnaWNhbCB0b3VjaEFjdGlvbiB2YWx1ZVxudmFyIFRPVUNIX0FDVElPTl9DT01QVVRFID0gJ2NvbXB1dGUnO1xudmFyIFRPVUNIX0FDVElPTl9BVVRPID0gJ2F1dG8nO1xudmFyIFRPVUNIX0FDVElPTl9NQU5JUFVMQVRJT04gPSAnbWFuaXB1bGF0aW9uJzsgLy8gbm90IGltcGxlbWVudGVkXG52YXIgVE9VQ0hfQUNUSU9OX05PTkUgPSAnbm9uZSc7XG52YXIgVE9VQ0hfQUNUSU9OX1BBTl9YID0gJ3Bhbi14JztcbnZhciBUT1VDSF9BQ1RJT05fUEFOX1kgPSAncGFuLXknO1xudmFyIFRPVUNIX0FDVElPTl9NQVAgPSBnZXRUb3VjaEFjdGlvblByb3BzKCk7XG5cbi8qKlxuICogVG91Y2ggQWN0aW9uXG4gKiBzZXRzIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eSBvciB1c2VzIHRoZSBqcyBhbHRlcm5hdGl2ZVxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBUb3VjaEFjdGlvbihtYW5hZ2VyLCB2YWx1ZSkge1xuICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgdGhpcy5zZXQodmFsdWUpO1xufVxuXG5Ub3VjaEFjdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogc2V0IHRoZSB0b3VjaEFjdGlvbiB2YWx1ZSBvbiB0aGUgZWxlbWVudCBvciBlbmFibGUgdGhlIHBvbHlmaWxsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBmaW5kIG91dCB0aGUgdG91Y2gtYWN0aW9uIGJ5IHRoZSBldmVudCBoYW5kbGVyc1xuICAgICAgICBpZiAodmFsdWUgPT0gVE9VQ0hfQUNUSU9OX0NPTVBVVEUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jb21wdXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTkFUSVZFX1RPVUNIX0FDVElPTiAmJiB0aGlzLm1hbmFnZXIuZWxlbWVudC5zdHlsZSAmJiBUT1VDSF9BQ1RJT05fTUFQW3ZhbHVlXSkge1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVsZW1lbnQuc3R5bGVbUFJFRklYRURfVE9VQ0hfQUNUSU9OXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IHZhbHVlLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBqdXN0IHJlLXNldCB0aGUgdG91Y2hBY3Rpb24gdmFsdWVcbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLm1hbmFnZXIub3B0aW9ucy50b3VjaEFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvbXB1dGUgdGhlIHZhbHVlIGZvciB0aGUgdG91Y2hBY3Rpb24gcHJvcGVydHkgYmFzZWQgb24gdGhlIHJlY29nbml6ZXIncyBzZXR0aW5nc1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgY29tcHV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0gW107XG4gICAgICAgIGVhY2godGhpcy5tYW5hZ2VyLnJlY29nbml6ZXJzLCBmdW5jdGlvbihyZWNvZ25pemVyKSB7XG4gICAgICAgICAgICBpZiAoYm9vbE9yRm4ocmVjb2duaXplci5vcHRpb25zLmVuYWJsZSwgW3JlY29nbml6ZXJdKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zLmNvbmNhdChyZWNvZ25pemVyLmdldFRvdWNoQWN0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMuam9pbignICcpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgaXMgY2FsbGVkIG9uIGVhY2ggaW5wdXQgY3ljbGUgYW5kIHByb3ZpZGVzIHRoZSBwcmV2ZW50aW5nIG9mIHRoZSBicm93c2VyIGJlaGF2aW9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgcHJldmVudERlZmF1bHRzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3JjRXZlbnQgPSBpbnB1dC5zcmNFdmVudDtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGlucHV0Lm9mZnNldERpcmVjdGlvbjtcblxuICAgICAgICAvLyBpZiB0aGUgdG91Y2ggYWN0aW9uIGRpZCBwcmV2ZW50ZWQgb25jZSB0aGlzIHNlc3Npb25cbiAgICAgICAgaWYgKHRoaXMubWFuYWdlci5zZXNzaW9uLnByZXZlbnRlZCkge1xuICAgICAgICAgICAgc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgaGFzTm9uZSA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fTk9ORV07XG4gICAgICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKSAmJiAhVE9VQ0hfQUNUSU9OX01BUFtUT1VDSF9BQ1RJT05fUEFOX1ldO1xuICAgICAgICB2YXIgaGFzUGFuWCA9IGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9QQU5fWCkgJiYgIVRPVUNIX0FDVElPTl9NQVBbVE9VQ0hfQUNUSU9OX1BBTl9YXTtcblxuICAgICAgICBpZiAoaGFzTm9uZSkge1xuICAgICAgICAgICAgLy9kbyBub3QgcHJldmVudCBkZWZhdWx0cyBpZiB0aGlzIGlzIGEgdGFwIGdlc3R1cmVcblxuICAgICAgICAgICAgdmFyIGlzVGFwUG9pbnRlciA9IGlucHV0LnBvaW50ZXJzLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIHZhciBpc1RhcE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCAyO1xuICAgICAgICAgICAgdmFyIGlzVGFwVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgMjUwO1xuXG4gICAgICAgICAgICBpZiAoaXNUYXBQb2ludGVyICYmIGlzVGFwTW92ZW1lbnQgJiYgaXNUYXBUb3VjaFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzUGFuWCAmJiBoYXNQYW5ZKSB7XG4gICAgICAgICAgICAvLyBgcGFuLXggcGFuLXlgIG1lYW5zIGJyb3dzZXIgaGFuZGxlcyBhbGwgc2Nyb2xsaW5nL3Bhbm5pbmcsIGRvIG5vdCBwcmV2ZW50XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzTm9uZSB8fFxuICAgICAgICAgICAgKGhhc1BhblkgJiYgZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHx8XG4gICAgICAgICAgICAoaGFzUGFuWCAmJiBkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2ZW50U3JjKHNyY0V2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxsIHByZXZlbnREZWZhdWx0IHRvIHByZXZlbnQgdGhlIGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW9yIChzY3JvbGxpbmcgaW4gbW9zdCBjYXNlcylcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc3JjRXZlbnRcbiAgICAgKi9cbiAgICBwcmV2ZW50U3JjOiBmdW5jdGlvbihzcmNFdmVudCkge1xuICAgICAgICB0aGlzLm1hbmFnZXIuc2Vzc2lvbi5wcmV2ZW50ZWQgPSB0cnVlO1xuICAgICAgICBzcmNFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogd2hlbiB0aGUgdG91Y2hBY3Rpb25zIGFyZSBjb2xsZWN0ZWQgdGhleSBhcmUgbm90IGEgdmFsaWQgdmFsdWUsIHNvIHdlIG5lZWQgdG8gY2xlYW4gdGhpbmdzIHVwLiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uc1xuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGNsZWFuVG91Y2hBY3Rpb25zKGFjdGlvbnMpIHtcbiAgICAvLyBub25lXG4gICAgaWYgKGluU3RyKGFjdGlvbnMsIFRPVUNIX0FDVElPTl9OT05FKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgdmFyIGhhc1BhblggPSBpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgIHZhciBoYXNQYW5ZID0gaW5TdHIoYWN0aW9ucywgVE9VQ0hfQUNUSU9OX1BBTl9ZKTtcblxuICAgIC8vIGlmIGJvdGggcGFuLXggYW5kIHBhbi15IGFyZSBzZXQgKGRpZmZlcmVudCByZWNvZ25pemVyc1xuICAgIC8vIGZvciBkaWZmZXJlbnQgZGlyZWN0aW9ucywgZS5nLiBob3Jpem9udGFsIHBhbiBidXQgdmVydGljYWwgc3dpcGU/KVxuICAgIC8vIHdlIG5lZWQgbm9uZSAoYXMgb3RoZXJ3aXNlIHdpdGggcGFuLXggcGFuLXkgY29tYmluZWQgbm9uZSBvZiB0aGVzZVxuICAgIC8vIHJlY29nbml6ZXJzIHdpbGwgd29yaywgc2luY2UgdGhlIGJyb3dzZXIgd291bGQgaGFuZGxlIGFsbCBwYW5uaW5nXG4gICAgaWYgKGhhc1BhblggJiYgaGFzUGFuWSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX05PTkU7XG4gICAgfVxuXG4gICAgLy8gcGFuLXggT1IgcGFuLXlcbiAgICBpZiAoaGFzUGFuWCB8fCBoYXNQYW5ZKSB7XG4gICAgICAgIHJldHVybiBoYXNQYW5YID8gVE9VQ0hfQUNUSU9OX1BBTl9YIDogVE9VQ0hfQUNUSU9OX1BBTl9ZO1xuICAgIH1cblxuICAgIC8vIG1hbmlwdWxhdGlvblxuICAgIGlmIChpblN0cihhY3Rpb25zLCBUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OKSkge1xuICAgICAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX01BTklQVUxBVElPTjtcbiAgICB9XG5cbiAgICByZXR1cm4gVE9VQ0hfQUNUSU9OX0FVVE87XG59XG5cbmZ1bmN0aW9uIGdldFRvdWNoQWN0aW9uUHJvcHMoKSB7XG4gICAgaWYgKCFOQVRJVkVfVE9VQ0hfQUNUSU9OKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRvdWNoTWFwID0ge307XG4gICAgdmFyIGNzc1N1cHBvcnRzID0gd2luZG93LkNTUyAmJiB3aW5kb3cuQ1NTLnN1cHBvcnRzO1xuICAgIFsnYXV0bycsICdtYW5pcHVsYXRpb24nLCAncGFuLXknLCAncGFuLXgnLCAncGFuLXggcGFuLXknLCAnbm9uZSddLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XG5cbiAgICAgICAgLy8gSWYgY3NzLnN1cHBvcnRzIGlzIG5vdCBzdXBwb3J0ZWQgYnV0IHRoZXJlIGlzIG5hdGl2ZSB0b3VjaC1hY3Rpb24gYXNzdW1lIGl0IHN1cHBvcnRzXG4gICAgICAgIC8vIGFsbCB2YWx1ZXMuIFRoaXMgaXMgdGhlIGNhc2UgZm9yIElFIDEwIGFuZCAxMS5cbiAgICAgICAgdG91Y2hNYXBbdmFsXSA9IGNzc1N1cHBvcnRzID8gd2luZG93LkNTUy5zdXBwb3J0cygndG91Y2gtYWN0aW9uJywgdmFsKSA6IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdWNoTWFwO1xufVxuXG4vKipcbiAqIFJlY29nbml6ZXIgZmxvdyBleHBsYWluZWQ7ICpcbiAqIEFsbCByZWNvZ25pemVycyBoYXZlIHRoZSBpbml0aWFsIHN0YXRlIG9mIFBPU1NJQkxFIHdoZW4gYSBpbnB1dCBzZXNzaW9uIHN0YXJ0cy5cbiAqIFRoZSBkZWZpbml0aW9uIG9mIGEgaW5wdXQgc2Vzc2lvbiBpcyBmcm9tIHRoZSBmaXJzdCBpbnB1dCB1bnRpbCB0aGUgbGFzdCBpbnB1dCwgd2l0aCBhbGwgaXQncyBtb3ZlbWVudCBpbiBpdC4gKlxuICogRXhhbXBsZSBzZXNzaW9uIGZvciBtb3VzZS1pbnB1dDogbW91c2Vkb3duIC0+IG1vdXNlbW92ZSAtPiBtb3VzZXVwXG4gKlxuICogT24gZWFjaCByZWNvZ25pemluZyBjeWNsZSAoc2VlIE1hbmFnZXIucmVjb2duaXplKSB0aGUgLnJlY29nbml6ZSgpIG1ldGhvZCBpcyBleGVjdXRlZFxuICogd2hpY2ggZGV0ZXJtaW5lcyB3aXRoIHN0YXRlIGl0IHNob3VsZCBiZS5cbiAqXG4gKiBJZiB0aGUgcmVjb2duaXplciBoYXMgdGhlIHN0YXRlIEZBSUxFRCwgQ0FOQ0VMTEVEIG9yIFJFQ09HTklaRUQgKGVxdWFscyBFTkRFRCksIGl0IGlzIHJlc2V0IHRvXG4gKiBQT1NTSUJMRSB0byBnaXZlIGl0IGFub3RoZXIgY2hhbmdlIG9uIHRoZSBuZXh0IGN5Y2xlLlxuICpcbiAqICAgICAgICAgICAgICAgUG9zc2libGVcbiAqICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICArLS0tLS0rLS0tLS0tLS0tLS0tLS0tK1xuICogICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICArLS0tLS0rLS0tLS0rICAgICAgICAgICAgICAgfFxuICogICAgICB8ICAgICAgICAgICB8ICAgICAgICAgICAgICAgfFxuICogICBGYWlsZWQgICAgICBDYW5jZWxsZWQgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tKy0tLS0tLStcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICBSZWNvZ25pemVkICAgICAgIEJlZ2FuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENoYW5nZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbmRlZC9SZWNvZ25pemVkXG4gKi9cbnZhciBTVEFURV9QT1NTSUJMRSA9IDE7XG52YXIgU1RBVEVfQkVHQU4gPSAyO1xudmFyIFNUQVRFX0NIQU5HRUQgPSA0O1xudmFyIFNUQVRFX0VOREVEID0gODtcbnZhciBTVEFURV9SRUNPR05JWkVEID0gU1RBVEVfRU5ERUQ7XG52YXIgU1RBVEVfQ0FOQ0VMTEVEID0gMTY7XG52YXIgU1RBVEVfRkFJTEVEID0gMzI7XG5cbi8qKlxuICogUmVjb2duaXplclxuICogRXZlcnkgcmVjb2duaXplciBuZWVkcyB0byBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBSZWNvZ25pemVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBhc3NpZ24oe30sIHRoaXMuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5pZCA9IHVuaXF1ZUlkKCk7XG5cbiAgICB0aGlzLm1hbmFnZXIgPSBudWxsO1xuXG4gICAgLy8gZGVmYXVsdCBpcyBlbmFibGUgdHJ1ZVxuICAgIHRoaXMub3B0aW9ucy5lbmFibGUgPSBpZlVuZGVmaW5lZCh0aGlzLm9wdGlvbnMuZW5hYmxlLCB0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcblxuICAgIHRoaXMuc2ltdWx0YW5lb3VzID0ge307XG4gICAgdGhpcy5yZXF1aXJlRmFpbCA9IFtdO1xufVxuXG5SZWNvZ25pemVyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBAdmlydHVhbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgZGVmYXVsdHM6IHt9LFxuXG4gICAgLyoqXG4gICAgICogc2V0IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge1JlY29nbml6ZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGFsc28gdXBkYXRlIHRoZSB0b3VjaEFjdGlvbiwgaW4gY2FzZSBzb21ldGhpbmcgY2hhbmdlZCBhYm91dCB0aGUgZGlyZWN0aW9ucy9lbmFibGVkIHN0YXRlXG4gICAgICAgIHRoaXMubWFuYWdlciAmJiB0aGlzLm1hbmFnZXIudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplci5cbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdyZWNvZ25pemVXaXRoJywgdGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNpbXVsdGFuZW91cyA9IHRoaXMuc2ltdWx0YW5lb3VzO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmICghc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF0pIHtcbiAgICAgICAgICAgIHNpbXVsdGFuZW91c1tvdGhlclJlY29nbml6ZXIuaWRdID0gb3RoZXJSZWNvZ25pemVyO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlY29nbml6ZVdpdGgodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRyb3AgdGhlIHNpbXVsdGFuZW91cyBsaW5rLiBpdCBkb2VzbnQgcmVtb3ZlIHRoZSBsaW5rIG9uIHRoZSBvdGhlciByZWNvZ25pemVyLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge1JlY29nbml6ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBkcm9wUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVjb2duaXplV2l0aCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyUmVjb2duaXplciA9IGdldFJlY29nbml6ZXJCeU5hbWVJZk1hbmFnZXIob3RoZXJSZWNvZ25pemVyLCB0aGlzKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZWNvZ25pemVyIGNhbiBvbmx5IHJ1biB3aGVuIGFuIG90aGVyIGlzIGZhaWxpbmdcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IG90aGVyUmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtSZWNvZ25pemVyfSB0aGlzXG4gICAgICovXG4gICAgcmVxdWlyZUZhaWx1cmU6IGZ1bmN0aW9uKG90aGVyUmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcob3RoZXJSZWNvZ25pemVyLCAncmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVxdWlyZUZhaWwgPSB0aGlzLnJlcXVpcmVGYWlsO1xuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIGlmIChpbkFycmF5KHJlcXVpcmVGYWlsLCBvdGhlclJlY29nbml6ZXIpID09PSAtMSkge1xuICAgICAgICAgICAgcmVxdWlyZUZhaWwucHVzaChvdGhlclJlY29nbml6ZXIpO1xuICAgICAgICAgICAgb3RoZXJSZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkcm9wIHRoZSByZXF1aXJlRmFpbHVyZSBsaW5rLiBpdCBkb2VzIG5vdCByZW1vdmUgdGhlIGxpbmsgb24gdGhlIG90aGVyIHJlY29nbml6ZXIuXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfSBvdGhlclJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcn0gdGhpc1xuICAgICAqL1xuICAgIGRyb3BSZXF1aXJlRmFpbHVyZTogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIGlmIChpbnZva2VBcnJheUFyZyhvdGhlclJlY29nbml6ZXIsICdkcm9wUmVxdWlyZUZhaWx1cmUnLCB0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvdGhlclJlY29nbml6ZXIgPSBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgdGhpcyk7XG4gICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkodGhpcy5yZXF1aXJlRmFpbCwgb3RoZXJSZWNvZ25pemVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZUZhaWwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaGFzIHJlcXVpcmUgZmFpbHVyZXMgYm9vbGVhblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc1JlcXVpcmVGYWlsdXJlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCA+IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlmIHRoZSByZWNvZ25pemVyIGNhbiByZWNvZ25pemUgc2ltdWx0YW5lb3VzIHdpdGggYW4gb3RoZXIgcmVjb2duaXplclxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcn0gb3RoZXJSZWNvZ25pemVyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuUmVjb2duaXplV2l0aDogZnVuY3Rpb24ob3RoZXJSZWNvZ25pemVyKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc2ltdWx0YW5lb3VzW290aGVyUmVjb2duaXplci5pZF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFlvdSBzaG91bGQgdXNlIGB0cnlFbWl0YCBpbnN0ZWFkIG9mIGBlbWl0YCBkaXJlY3RseSB0byBjaGVja1xuICAgICAqIHRoYXQgYWxsIHRoZSBuZWVkZWQgcmVjb2duaXplcnMgaGFzIGZhaWxlZCBiZWZvcmUgZW1pdHRpbmcuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0XG4gICAgICovXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYubWFuYWdlci5lbWl0KGV2ZW50LCBpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAncGFuc3RhcnQnIGFuZCAncGFubW92ZSdcbiAgICAgICAgaWYgKHN0YXRlIDwgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50KTsgLy8gc2ltcGxlICdldmVudE5hbWUnIGV2ZW50c1xuXG4gICAgICAgIGlmIChpbnB1dC5hZGRpdGlvbmFsRXZlbnQpIHsgLy8gYWRkaXRpb25hbCBldmVudChwYW5sZWZ0LCBwYW5yaWdodCwgcGluY2hpbiwgcGluY2hvdXQuLi4pXG4gICAgICAgICAgICBlbWl0KGlucHV0LmFkZGl0aW9uYWxFdmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYW5lbmQgYW5kIHBhbmNhbmNlbFxuICAgICAgICBpZiAoc3RhdGUgPj0gU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgICAgIGVtaXQoc2VsZi5vcHRpb25zLmV2ZW50ICsgc3RhdGVTdHIoc3RhdGUpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGF0IGFsbCB0aGUgcmVxdWlyZSBmYWlsdXJlIHJlY29nbml6ZXJzIGhhcyBmYWlsZWQsXG4gICAgICogaWYgdHJ1ZSwgaXQgZW1pdHMgYSBnZXN0dXJlIGV2ZW50LFxuICAgICAqIG90aGVyd2lzZSwgc2V0dXAgdGhlIHN0YXRlIHRvIEZBSUxFRC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKi9cbiAgICB0cnlFbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5jYW5FbWl0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGl0J3MgZmFpbGluZyBhbnl3YXlcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2FuIHdlIGVtaXQ/XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY2FuRW1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJlcXVpcmVGYWlsLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5yZXF1aXJlRmFpbFtpXS5zdGF0ZSAmIChTVEFURV9GQUlMRUQgfCBTVEFURV9QT1NTSUJMRSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgLy8gbWFrZSBhIG5ldyBjb3B5IG9mIHRoZSBpbnB1dERhdGFcbiAgICAgICAgLy8gc28gd2UgY2FuIGNoYW5nZSB0aGUgaW5wdXREYXRhIHdpdGhvdXQgbWVzc2luZyB1cCB0aGUgb3RoZXIgcmVjb2duaXplcnNcbiAgICAgICAgdmFyIGlucHV0RGF0YUNsb25lID0gYXNzaWduKHt9LCBpbnB1dERhdGEpO1xuXG4gICAgICAgIC8vIGlzIGlzIGVuYWJsZWQgYW5kIGFsbG93IHJlY29nbml6aW5nP1xuICAgICAgICBpZiAoIWJvb2xPckZuKHRoaXMub3B0aW9ucy5lbmFibGUsIFt0aGlzLCBpbnB1dERhdGFDbG9uZV0pKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfRkFJTEVEO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgd2hlbiB3ZSd2ZSByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgJiAoU1RBVEVfUkVDT0dOSVpFRCB8IFNUQVRFX0NBTkNFTExFRCB8IFNUQVRFX0ZBSUxFRCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTVEFURV9QT1NTSUJMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnByb2Nlc3MoaW5wdXREYXRhQ2xvbmUpO1xuXG4gICAgICAgIC8vIHRoZSByZWNvZ25pemVyIGhhcyByZWNvZ25pemVkIGEgZ2VzdHVyZVxuICAgICAgICAvLyBzbyB0cmlnZ2VyIGFuIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICYgKFNUQVRFX0JFR0FOIHwgU1RBVEVfQ0hBTkdFRCB8IFNUQVRFX0VOREVEIHwgU1RBVEVfQ0FOQ0VMTEVEKSkge1xuICAgICAgICAgICAgdGhpcy50cnlFbWl0KGlucHV0RGF0YUNsb25lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gdGhlIHN0YXRlIG9mIHRoZSByZWNvZ25pemVyXG4gICAgICogdGhlIGFjdHVhbCByZWNvZ25pemluZyBoYXBwZW5zIGluIHRoaXMgbWV0aG9kXG4gICAgICogQHZpcnR1YWxcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICogQHJldHVybnMge0NvbnN0fSBTVEFURVxuICAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uKGlucHV0RGF0YSkgeyB9LCAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuICAgIC8qKlxuICAgICAqIHJldHVybiB0aGUgcHJlZmVycmVkIHRvdWNoLWFjdGlvblxuICAgICAqIEB2aXJ0dWFsXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHsgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGxlZCB3aGVuIHRoZSBnZXN0dXJlIGlzbid0IGFsbG93ZWQgdG8gcmVjb2duaXplXG4gICAgICogbGlrZSB3aGVuIGFub3RoZXIgaXMgYmVpbmcgcmVjb2duaXplZCBvciBpdCBpcyBkaXNhYmxlZFxuICAgICAqIEB2aXJ0dWFsXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkgeyB9XG59O1xuXG4vKipcbiAqIGdldCBhIHVzYWJsZSBzdHJpbmcsIHVzZWQgYXMgZXZlbnQgcG9zdGZpeFxuICogQHBhcmFtIHtDb25zdH0gc3RhdGVcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0YXRlXG4gKi9cbmZ1bmN0aW9uIHN0YXRlU3RyKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlICYgU1RBVEVfQ0FOQ0VMTEVEKSB7XG4gICAgICAgIHJldHVybiAnY2FuY2VsJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlICYgU1RBVEVfRU5ERUQpIHtcbiAgICAgICAgcmV0dXJuICdlbmQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgJiBTVEFURV9DSEFOR0VEKSB7XG4gICAgICAgIHJldHVybiAnbW92ZSc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSAmIFNUQVRFX0JFR0FOKSB7XG4gICAgICAgIHJldHVybiAnc3RhcnQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZGlyZWN0aW9uIGNvbnMgdG8gc3RyaW5nXG4gKiBAcGFyYW0ge0NvbnN0fSBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRpcmVjdGlvblN0cihkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9ET1dOKSB7XG4gICAgICAgIHJldHVybiAnZG93bic7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1VQKSB7XG4gICAgICAgIHJldHVybiAndXAnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09IERJUkVDVElPTl9MRUZUKSB7XG4gICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gRElSRUNUSU9OX1JJR0hUKSB7XG4gICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogZ2V0IGEgcmVjb2duaXplciBieSBuYW1lIGlmIGl0IGlzIGJvdW5kIHRvIGEgbWFuYWdlclxuICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gb3RoZXJSZWNvZ25pemVyXG4gKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAqIEByZXR1cm5zIHtSZWNvZ25pemVyfVxuICovXG5mdW5jdGlvbiBnZXRSZWNvZ25pemVyQnlOYW1lSWZNYW5hZ2VyKG90aGVyUmVjb2duaXplciwgcmVjb2duaXplcikge1xuICAgIHZhciBtYW5hZ2VyID0gcmVjb2duaXplci5tYW5hZ2VyO1xuICAgIGlmIChtYW5hZ2VyKSB7XG4gICAgICAgIHJldHVybiBtYW5hZ2VyLmdldChvdGhlclJlY29nbml6ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gb3RoZXJSZWNvZ25pemVyO1xufVxuXG4vKipcbiAqIFRoaXMgcmVjb2duaXplciBpcyBqdXN0IHVzZWQgYXMgYSBiYXNlIGZvciB0aGUgc2ltcGxlIGF0dHJpYnV0ZSByZWNvZ25pemVycy5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBBdHRyUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoQXR0clJlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIEF0dHJSZWNvZ25pemVyXG4gICAgICovXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDFcbiAgICAgICAgICovXG4gICAgICAgIHBvaW50ZXJzOiAxXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2hlY2sgaWYgaXQgdGhlIHJlY29nbml6ZXIgcmVjZWl2ZXMgdmFsaWQgaW5wdXQsIGxpa2UgaW5wdXQuZGlzdGFuY2UgPiAxMC5cbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gcmVjb2duaXplZFxuICAgICAqL1xuICAgIGF0dHJUZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9uUG9pbnRlcnMgPSB0aGlzLm9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHJldHVybiBvcHRpb25Qb2ludGVycyA9PT0gMCB8fCBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvblBvaW50ZXJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzIHRoZSBpbnB1dCBhbmQgcmV0dXJuIHRoZSBzdGF0ZSBmb3IgdGhlIHJlY29nbml6ZXJcbiAgICAgKiBAbWVtYmVyb2YgQXR0clJlY29nbml6ZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRcbiAgICAgKiBAcmV0dXJucyB7Kn0gU3RhdGVcbiAgICAgKi9cbiAgICBwcm9jZXNzOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgZXZlbnRUeXBlID0gaW5wdXQuZXZlbnRUeXBlO1xuXG4gICAgICAgIHZhciBpc1JlY29nbml6ZWQgPSBzdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRoaXMuYXR0clRlc3QoaW5wdXQpO1xuXG4gICAgICAgIC8vIG9uIGNhbmNlbCBpbnB1dCBhbmQgd2UndmUgcmVjb2duaXplZCBiZWZvcmUsIHJldHVybiBTVEFURV9DQU5DRUxMRURcbiAgICAgICAgaWYgKGlzUmVjb2duaXplZCAmJiAoZXZlbnRUeXBlICYgSU5QVVRfQ0FOQ0VMIHx8ICFpc1ZhbGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfQ0FOQ0VMTEVEO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUmVjb2duaXplZCB8fCBpc1ZhbGlkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlIHwgU1RBVEVfRU5ERUQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEoc3RhdGUgJiBTVEFURV9CRUdBTikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfQkVHQU47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgfCBTVEFURV9DSEFOR0VEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTVEFURV9GQUlMRUQ7XG4gICAgfVxufSk7XG5cbi8qKlxuICogUGFuXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBhbmQgbW92ZWQgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQYW5SZWNvZ25pemVyKCkge1xuICAgIEF0dHJSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLnBYID0gbnVsbDtcbiAgICB0aGlzLnBZID0gbnVsbDtcbn1cblxuaW5oZXJpdChQYW5SZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUGFuUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncGFuJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgcG9pbnRlcnM6IDEsXG4gICAgICAgIGRpcmVjdGlvbjogRElSRUNUSU9OX0FMTFxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1kpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3Rpb24gJiBESVJFQ1RJT05fVkVSVElDQUwpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChUT1VDSF9BQ1RJT05fUEFOX1gpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH0sXG5cbiAgICBkaXJlY3Rpb25UZXN0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdmFyIGhhc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gaW5wdXQuZGlzdGFuY2U7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbnB1dC5kaXJlY3Rpb247XG4gICAgICAgIHZhciB4ID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB2YXIgeSA9IGlucHV0LmRlbHRhWTtcblxuICAgICAgICAvLyBsb2NrIHRvIGF4aXM/XG4gICAgICAgIGlmICghKGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aW9uICYgRElSRUNUSU9OX0hPUklaT05UQUwpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoeCA9PT0gMCkgPyBESVJFQ1RJT05fTk9ORSA6ICh4IDwgMCkgPyBESVJFQ1RJT05fTEVGVCA6IERJUkVDVElPTl9SSUdIVDtcbiAgICAgICAgICAgICAgICBoYXNNb3ZlZCA9IHggIT0gdGhpcy5wWDtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGlucHV0LmRlbHRhWCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICh5ID09PSAwKSA/IERJUkVDVElPTl9OT05FIDogKHkgPCAwKSA/IERJUkVDVElPTl9VUCA6IERJUkVDVElPTl9ET1dOO1xuICAgICAgICAgICAgICAgIGhhc01vdmVkID0geSAhPSB0aGlzLnBZO1xuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoaW5wdXQuZGVsdGFZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbnB1dC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBoYXNNb3ZlZCAmJiBkaXN0YW5jZSA+IG9wdGlvbnMudGhyZXNob2xkICYmIGRpcmVjdGlvbiAmIG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIEF0dHJSZWNvZ25pemVyLnByb3RvdHlwZS5hdHRyVGVzdC5jYWxsKHRoaXMsIGlucHV0KSAmJlxuICAgICAgICAgICAgKHRoaXMuc3RhdGUgJiBTVEFURV9CRUdBTiB8fCAoISh0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pICYmIHRoaXMuZGlyZWN0aW9uVGVzdChpbnB1dCkpKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcblxuICAgICAgICB0aGlzLnBYID0gaW5wdXQuZGVsdGFYO1xuICAgICAgICB0aGlzLnBZID0gaW5wdXQuZGVsdGFZO1xuXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25TdHIoaW5wdXQuZGlyZWN0aW9uKTtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBkaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIuZW1pdC5jYWxsKHRoaXMsIGlucHV0KTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBQaW5jaFxuICogUmVjb2duaXplZCB3aGVuIHR3byBvciBtb3JlIHBvaW50ZXJzIGFyZSBtb3ZpbmcgdG93YXJkICh6b29tLWluKSBvciBhd2F5IGZyb20gZWFjaCBvdGhlciAoem9vbS1vdXQpLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQaW5jaFJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChQaW5jaFJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3BpbmNoJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQuc2NhbGUgLSAxKSA+IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgfHwgdGhpcy5zdGF0ZSAmIFNUQVRFX0JFR0FOKTtcbiAgICB9LFxuXG4gICAgZW1pdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICB2YXIgaW5PdXQgPSBpbnB1dC5zY2FsZSA8IDEgPyAnaW4nIDogJ291dCc7XG4gICAgICAgICAgICBpbnB1dC5hZGRpdGlvbmFsRXZlbnQgPSB0aGlzLm9wdGlvbnMuZXZlbnQgKyBpbk91dDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlci5lbWl0LmNhbGwodGhpcywgaW5wdXQpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFByZXNzXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG93biBmb3IgeCBtcyB3aXRob3V0IGFueSBtb3ZlbWVudC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMgUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBQcmVzc1JlY29nbml6ZXIoKSB7XG4gICAgUmVjb2duaXplci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbn1cblxuaW5oZXJpdChQcmVzc1JlY29nbml6ZXIsIFJlY29nbml6ZXIsIHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICogQG1lbWJlcm9mIFByZXNzUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncHJlc3MnLFxuICAgICAgICBwb2ludGVyczogMSxcbiAgICAgICAgdGltZTogMjUxLCAvLyBtaW5pbWFsIHRpbWUgb2YgdGhlIHBvaW50ZXIgdG8gYmUgcHJlc3NlZFxuICAgICAgICB0aHJlc2hvbGQ6IDkgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW1RPVUNIX0FDVElPTl9BVVRPXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHZhciB2YWxpZFBvaW50ZXJzID0gaW5wdXQucG9pbnRlcnMubGVuZ3RoID09PSBvcHRpb25zLnBvaW50ZXJzO1xuICAgICAgICB2YXIgdmFsaWRNb3ZlbWVudCA9IGlucHV0LmRpc3RhbmNlIDwgb3B0aW9ucy50aHJlc2hvbGQ7XG4gICAgICAgIHZhciB2YWxpZFRpbWUgPSBpbnB1dC5kZWx0YVRpbWUgPiBvcHRpb25zLnRpbWU7XG5cbiAgICAgICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICghdmFsaWRNb3ZlbWVudCB8fCAhdmFsaWRQb2ludGVycyB8fCAoaW5wdXQuZXZlbnRUeXBlICYgKElOUFVUX0VORCB8IElOUFVUX0NBTkNFTCkgJiYgIXZhbGlkVGltZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5ldmVudFR5cGUgJiBJTlBVVF9TVEFSVCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0Q29udGV4dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU1RBVEVfRkFJTEVEO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgfSxcblxuICAgIGVtaXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9PSBTVEFURV9SRUNPR05JWkVEKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQgJiYgKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX0VORCkpIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArICd1cCcsIGlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LnRpbWVTdGFtcCA9IG5vdygpO1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBSb3RhdGVcbiAqIFJlY29nbml6ZWQgd2hlbiB0d28gb3IgbW9yZSBwb2ludGVyIGFyZSBtb3ZpbmcgaW4gYSBjaXJjdWxhciBtb3Rpb24uXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEF0dHJSZWNvZ25pemVyXG4gKi9cbmZ1bmN0aW9uIFJvdGF0ZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChSb3RhdGVSZWNvZ25pemVyLCBBdHRyUmVjb2duaXplciwge1xuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKiBAbWVtYmVyb2YgUm90YXRlUmVjb2duaXplclxuICAgICAqL1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGV2ZW50OiAncm90YXRlJyxcbiAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICBwb2ludGVyczogMlxuICAgIH0sXG5cbiAgICBnZXRUb3VjaEFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbVE9VQ0hfQUNUSU9OX05PTkVdO1xuICAgIH0sXG5cbiAgICBhdHRyVGVzdDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyLmF0dHJUZXN0LmNhbGwodGhpcywgaW5wdXQpICYmXG4gICAgICAgICAgICAoTWF0aC5hYnMoaW5wdXQucm90YXRpb24pID4gdGhpcy5vcHRpb25zLnRocmVzaG9sZCB8fCB0aGlzLnN0YXRlICYgU1RBVEVfQkVHQU4pO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIFN3aXBlXG4gKiBSZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgbW92aW5nIGZhc3QgKHZlbG9jaXR5KSwgd2l0aCBlbm91Z2ggZGlzdGFuY2UgaW4gdGhlIGFsbG93ZWQgZGlyZWN0aW9uLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyBBdHRyUmVjb2duaXplclxuICovXG5mdW5jdGlvbiBTd2lwZVJlY29nbml6ZXIoKSB7XG4gICAgQXR0clJlY29nbml6ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuaW5oZXJpdChTd2lwZVJlY29nbml6ZXIsIEF0dHJSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBTd2lwZVJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3N3aXBlJyxcbiAgICAgICAgdGhyZXNob2xkOiAxMCxcbiAgICAgICAgdmVsb2NpdHk6IDAuMyxcbiAgICAgICAgZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICAgICAgcG9pbnRlcnM6IDFcbiAgICB9LFxuXG4gICAgZ2V0VG91Y2hBY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gUGFuUmVjb2duaXplci5wcm90b3R5cGUuZ2V0VG91Y2hBY3Rpb24uY2FsbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgYXR0clRlc3Q6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgICAgICB2YXIgdmVsb2NpdHk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiAmIChESVJFQ1RJT05fSE9SSVpPTlRBTCB8IERJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gaW5wdXQub3ZlcmFsbFZlbG9jaXR5O1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiAmIERJUkVDVElPTl9IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uICYgRElSRUNUSU9OX1ZFUlRJQ0FMKSB7XG4gICAgICAgICAgICB2ZWxvY2l0eSA9IGlucHV0Lm92ZXJhbGxWZWxvY2l0eVk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fc3VwZXIuYXR0clRlc3QuY2FsbCh0aGlzLCBpbnB1dCkgJiZcbiAgICAgICAgICAgIGRpcmVjdGlvbiAmIGlucHV0Lm9mZnNldERpcmVjdGlvbiAmJlxuICAgICAgICAgICAgaW5wdXQuZGlzdGFuY2UgPiB0aGlzLm9wdGlvbnMudGhyZXNob2xkICYmXG4gICAgICAgICAgICBpbnB1dC5tYXhQb2ludGVycyA9PSB0aGlzLm9wdGlvbnMucG9pbnRlcnMgJiZcbiAgICAgICAgICAgIGFicyh2ZWxvY2l0eSkgPiB0aGlzLm9wdGlvbnMudmVsb2NpdHkgJiYgaW5wdXQuZXZlbnRUeXBlICYgSU5QVVRfRU5EO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gZGlyZWN0aW9uU3RyKGlucHV0Lm9mZnNldERpcmVjdGlvbik7XG4gICAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWFuYWdlci5lbWl0KHRoaXMub3B0aW9ucy5ldmVudCArIGRpcmVjdGlvbiwgaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCBpbnB1dCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQSB0YXAgaXMgZWNvZ25pemVkIHdoZW4gdGhlIHBvaW50ZXIgaXMgZG9pbmcgYSBzbWFsbCB0YXAvY2xpY2suIE11bHRpcGxlIHRhcHMgYXJlIHJlY29nbml6ZWQgaWYgdGhleSBvY2N1clxuICogYmV0d2VlbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwgYW5kIHBvc2l0aW9uLiBUaGUgZGVsYXkgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJlY29nbml6ZSBtdWx0aS10YXBzIHdpdGhvdXQgZmlyaW5nXG4gKiBhIHNpbmdsZSB0YXAuXG4gKlxuICogVGhlIGV2ZW50RGF0YSBmcm9tIHRoZSBlbWl0dGVkIGV2ZW50IGNvbnRhaW5zIHRoZSBwcm9wZXJ0eSBgdGFwQ291bnRgLCB3aGljaCBjb250YWlucyB0aGUgYW1vdW50IG9mXG4gKiBtdWx0aS10YXBzIGJlaW5nIHJlY29nbml6ZWQuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIFJlY29nbml6ZXJcbiAqL1xuZnVuY3Rpb24gVGFwUmVjb2duaXplcigpIHtcbiAgICBSZWNvZ25pemVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBwcmV2aW91cyB0aW1lIGFuZCBjZW50ZXIsXG4gICAgLy8gdXNlZCBmb3IgdGFwIGNvdW50aW5nXG4gICAgdGhpcy5wVGltZSA9IGZhbHNlO1xuICAgIHRoaXMucENlbnRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0ID0gbnVsbDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbn1cblxuaW5oZXJpdChUYXBSZWNvZ25pemVyLCBSZWNvZ25pemVyLCB7XG4gICAgLyoqXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqIEBtZW1iZXJvZiBQaW5jaFJlY29nbml6ZXJcbiAgICAgKi9cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBldmVudDogJ3RhcCcsXG4gICAgICAgIHBvaW50ZXJzOiAxLFxuICAgICAgICB0YXBzOiAxLFxuICAgICAgICBpbnRlcnZhbDogMzAwLCAvLyBtYXggdGltZSBiZXR3ZWVuIHRoZSBtdWx0aS10YXAgdGFwc1xuICAgICAgICB0aW1lOiAyNTAsIC8vIG1heCB0aW1lIG9mIHRoZSBwb2ludGVyIHRvIGJlIGRvd24gKGxpa2UgZmluZ2VyIG9uIHRoZSBzY3JlZW4pXG4gICAgICAgIHRocmVzaG9sZDogOSwgLy8gYSBtaW5pbWFsIG1vdmVtZW50IGlzIG9rLCBidXQga2VlcCBpdCBsb3dcbiAgICAgICAgcG9zVGhyZXNob2xkOiAxMCAvLyBhIG11bHRpLXRhcCBjYW4gYmUgYSBiaXQgb2ZmIHRoZSBpbml0aWFsIHBvc2l0aW9uXG4gICAgfSxcblxuICAgIGdldFRvdWNoQWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtUT1VDSF9BQ1RJT05fTUFOSVBVTEFUSU9OXTtcbiAgICB9LFxuXG4gICAgcHJvY2VzczogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgdmFyIHZhbGlkUG9pbnRlcnMgPSBpbnB1dC5wb2ludGVycy5sZW5ndGggPT09IG9wdGlvbnMucG9pbnRlcnM7XG4gICAgICAgIHZhciB2YWxpZE1vdmVtZW50ID0gaW5wdXQuZGlzdGFuY2UgPCBvcHRpb25zLnRocmVzaG9sZDtcbiAgICAgICAgdmFyIHZhbGlkVG91Y2hUaW1lID0gaW5wdXQuZGVsdGFUaW1lIDwgb3B0aW9ucy50aW1lO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICBpZiAoKGlucHV0LmV2ZW50VHlwZSAmIElOUFVUX1NUQVJUKSAmJiAodGhpcy5jb3VudCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWxUaW1lb3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZSBvbmx5IGFsbG93IGxpdHRsZSBtb3ZlbWVudFxuICAgICAgICAvLyBhbmQgd2UndmUgcmVhY2hlZCBhbiBlbmQgZXZlbnQsIHNvIGEgdGFwIGlzIHBvc3NpYmxlXG4gICAgICAgIGlmICh2YWxpZE1vdmVtZW50ICYmIHZhbGlkVG91Y2hUaW1lICYmIHZhbGlkUG9pbnRlcnMpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5ldmVudFR5cGUgIT0gSU5QVVRfRU5EKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFpbFRpbWVvdXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHZhbGlkSW50ZXJ2YWwgPSB0aGlzLnBUaW1lID8gKGlucHV0LnRpbWVTdGFtcCAtIHRoaXMucFRpbWUgPCBvcHRpb25zLmludGVydmFsKSA6IHRydWU7XG4gICAgICAgICAgICB2YXIgdmFsaWRNdWx0aVRhcCA9ICF0aGlzLnBDZW50ZXIgfHwgZ2V0RGlzdGFuY2UodGhpcy5wQ2VudGVyLCBpbnB1dC5jZW50ZXIpIDwgb3B0aW9ucy5wb3NUaHJlc2hvbGQ7XG5cbiAgICAgICAgICAgIHRoaXMucFRpbWUgPSBpbnB1dC50aW1lU3RhbXA7XG4gICAgICAgICAgICB0aGlzLnBDZW50ZXIgPSBpbnB1dC5jZW50ZXI7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRNdWx0aVRhcCB8fCAhdmFsaWRJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRhcCBjb3VudCBtYXRjaGVzIHdlIGhhdmUgcmVjb2duaXplZCBpdCxcbiAgICAgICAgICAgIC8vIGVsc2UgaXQgaGFzIGJlZ2FuIHJlY29nbml6aW5nLi4uXG4gICAgICAgICAgICB2YXIgdGFwQ291bnQgPSB0aGlzLmNvdW50ICUgb3B0aW9ucy50YXBzO1xuICAgICAgICAgICAgaWYgKHRhcENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gZmFpbGluZyByZXF1aXJlbWVudHMsIGltbWVkaWF0ZWx5IHRyaWdnZXIgdGhlIHRhcCBldmVudFxuICAgICAgICAgICAgICAgIC8vIG9yIHdhaXQgYXMgbG9uZyBhcyB0aGUgbXVsdGl0YXAgaW50ZXJ2YWwgdG8gdHJpZ2dlclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNSZXF1aXJlRmFpbHVyZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfUkVDT0dOSVpFRDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX1JFQ09HTklaRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9ucy5pbnRlcnZhbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9CRUdBTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgZmFpbFRpbWVvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXRDb250ZXh0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFNUQVRFX0ZBSUxFRDtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmludGVydmFsLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIFNUQVRFX0ZBSUxFRDtcbiAgICB9LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgIH0sXG5cbiAgICBlbWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU1RBVEVfUkVDT0dOSVpFRCkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQudGFwQ291bnQgPSB0aGlzLmNvdW50O1xuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmVtaXQodGhpcy5vcHRpb25zLmV2ZW50LCB0aGlzLl9pbnB1dCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBTaW1wbGUgd2F5IHRvIGNyZWF0ZSBhIG1hbmFnZXIgd2l0aCBhIGRlZmF1bHQgc2V0IG9mIHJlY29nbml6ZXJzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEhhbW1lcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5yZWNvZ25pemVycyA9IGlmVW5kZWZpbmVkKG9wdGlvbnMucmVjb2duaXplcnMsIEhhbW1lci5kZWZhdWx0cy5wcmVzZXQpO1xuICAgIHJldHVybiBuZXcgTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBAY29uc3Qge3N0cmluZ31cbiAqL1xuSGFtbWVyLlZFUlNJT04gPSAnMi4wLjcnO1xuXG4vKipcbiAqIGRlZmF1bHQgc2V0dGluZ3NcbiAqIEBuYW1lc3BhY2VcbiAqL1xuSGFtbWVyLmRlZmF1bHRzID0ge1xuICAgIC8qKlxuICAgICAqIHNldCBpZiBET00gZXZlbnRzIGFyZSBiZWluZyB0cmlnZ2VyZWQuXG4gICAgICogQnV0IHRoaXMgaXMgc2xvd2VyIGFuZCB1bnVzZWQgYnkgc2ltcGxlIGltcGxlbWVudGF0aW9ucywgc28gZGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGRvbUV2ZW50czogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgZm9yIHRoZSB0b3VjaEFjdGlvbiBwcm9wZXJ0eS9mYWxsYmFjay5cbiAgICAgKiBXaGVuIHNldCB0byBgY29tcHV0ZWAgaXQgd2lsbCBtYWdpY2FsbHkgc2V0IHRoZSBjb3JyZWN0IHZhbHVlIGJhc2VkIG9uIHRoZSBhZGRlZCByZWNvZ25pemVycy5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IGNvbXB1dGVcbiAgICAgKi9cbiAgICB0b3VjaEFjdGlvbjogVE9VQ0hfQUNUSU9OX0NPTVBVVEUsXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgZW5hYmxlOiB0cnVlLFxuXG4gICAgLyoqXG4gICAgICogRVhQRVJJTUVOVEFMIEZFQVRVUkUgLS0gY2FuIGJlIHJlbW92ZWQvY2hhbmdlZFxuICAgICAqIENoYW5nZSB0aGUgcGFyZW50IGlucHV0IHRhcmdldCBlbGVtZW50LlxuICAgICAqIElmIE51bGwsIHRoZW4gaXQgaXMgYmVpbmcgc2V0IHRoZSB0byBtYWluIGVsZW1lbnQuXG4gICAgICogQHR5cGUge051bGx8RXZlbnRUYXJnZXR9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIGlucHV0VGFyZ2V0OiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogZm9yY2UgYW4gaW5wdXQgY2xhc3NcbiAgICAgKiBAdHlwZSB7TnVsbHxGdW5jdGlvbn1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgaW5wdXRDbGFzczogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgcmVjb2duaXplciBzZXR1cCB3aGVuIGNhbGxpbmcgYEhhbW1lcigpYFxuICAgICAqIFdoZW4gY3JlYXRpbmcgYSBuZXcgTWFuYWdlciB0aGVzZSB3aWxsIGJlIHNraXBwZWQuXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHByZXNldDogW1xuICAgICAgICAvLyBSZWNvZ25pemVyQ2xhc3MsIG9wdGlvbnMsIFtyZWNvZ25pemVXaXRoLCAuLi5dLCBbcmVxdWlyZUZhaWx1cmUsIC4uLl1cbiAgICAgICAgW1JvdGF0ZVJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfV0sXG4gICAgICAgIFtQaW5jaFJlY29nbml6ZXIsIHtlbmFibGU6IGZhbHNlfSwgWydyb3RhdGUnXV0sXG4gICAgICAgIFtTd2lwZVJlY29nbml6ZXIsIHtkaXJlY3Rpb246IERJUkVDVElPTl9IT1JJWk9OVEFMfV0sXG4gICAgICAgIFtQYW5SZWNvZ25pemVyLCB7ZGlyZWN0aW9uOiBESVJFQ1RJT05fSE9SSVpPTlRBTH0sIFsnc3dpcGUnXV0sXG4gICAgICAgIFtUYXBSZWNvZ25pemVyXSxcbiAgICAgICAgW1RhcFJlY29nbml6ZXIsIHtldmVudDogJ2RvdWJsZXRhcCcsIHRhcHM6IDJ9LCBbJ3RhcCddXSxcbiAgICAgICAgW1ByZXNzUmVjb2duaXplcl1cbiAgICBdLFxuXG4gICAgLyoqXG4gICAgICogU29tZSBDU1MgcHJvcGVydGllcyBjYW4gYmUgdXNlZCB0byBpbXByb3ZlIHRoZSB3b3JraW5nIG9mIEhhbW1lci5cbiAgICAgKiBBZGQgdGhlbSB0byB0aGlzIG1ldGhvZCBhbmQgdGhleSB3aWxsIGJlIHNldCB3aGVuIGNyZWF0aW5nIGEgbmV3IE1hbmFnZXIuXG4gICAgICogQG5hbWVzcGFjZVxuICAgICAqL1xuICAgIGNzc1Byb3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0ZXh0IHNlbGVjdGlvbiB0byBpbXByb3ZlIHRoZSBkcmFnZ2luZyBnZXN0dXJlLiBNYWlubHkgZm9yIGRlc2t0b3AgYnJvd3NlcnMuXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIHRoZSBXaW5kb3dzIFBob25lIGdyaXBwZXJzIHdoZW4gcHJlc3NpbmcgYW4gZWxlbWVudC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaFNlbGVjdDogJ25vbmUnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlcyB0aGUgZGVmYXVsdCBjYWxsb3V0IHNob3duIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0LlxuICAgICAgICAgKiBPbiBpT1MsIHdoZW4geW91IHRvdWNoIGFuZCBob2xkIGEgdG91Y2ggdGFyZ2V0IHN1Y2ggYXMgYSBsaW5rLCBTYWZhcmkgZGlzcGxheXNcbiAgICAgICAgICogYSBjYWxsb3V0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxpbmsuIFRoaXMgcHJvcGVydHkgYWxsb3dzIHlvdSB0byBkaXNhYmxlIHRoYXQgY2FsbG91dC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ25vbmUnXG4gICAgICAgICAqL1xuICAgICAgICB0b3VjaENhbGxvdXQ6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHdoZXRoZXIgem9vbWluZyBpcyBlbmFibGVkLiBVc2VkIGJ5IElFMTA+XG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdub25lJ1xuICAgICAgICAgKi9cbiAgICAgICAgY29udGVudFpvb21pbmc6ICdub25lJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmaWVzIHRoYXQgYW4gZW50aXJlIGVsZW1lbnQgc2hvdWxkIGJlIGRyYWdnYWJsZSBpbnN0ZWFkIG9mIGl0cyBjb250ZW50cy4gTWFpbmx5IGZvciBkZXNrdG9wIGJyb3dzZXJzLlxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZGVmYXVsdCAnbm9uZSdcbiAgICAgICAgICovXG4gICAgICAgIHVzZXJEcmFnOiAnbm9uZScsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE92ZXJyaWRlcyB0aGUgaGlnaGxpZ2h0IGNvbG9yIHNob3duIHdoZW4gdGhlIHVzZXIgdGFwcyBhIGxpbmsgb3IgYSBKYXZhU2NyaXB0XG4gICAgICAgICAqIGNsaWNrYWJsZSBlbGVtZW50IGluIGlPUy4gVGhpcyBwcm9wZXJ0eSBvYmV5cyB0aGUgYWxwaGEgdmFsdWUsIGlmIHNwZWNpZmllZC5cbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ3JnYmEoMCwwLDAsMCknXG4gICAgICAgICAqL1xuICAgICAgICB0YXBIaWdobGlnaHRDb2xvcjogJ3JnYmEoMCwwLDAsMCknXG4gICAgfVxufTtcblxudmFyIFNUT1AgPSAxO1xudmFyIEZPUkNFRF9TVE9QID0gMjtcblxuLyoqXG4gKiBNYW5hZ2VyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTWFuYWdlcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gYXNzaWduKHt9LCBIYW1tZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0ID0gdGhpcy5vcHRpb25zLmlucHV0VGFyZ2V0IHx8IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgdGhpcy5yZWNvZ25pemVycyA9IFtdO1xuICAgIHRoaXMub2xkQ3NzUHJvcHMgPSB7fTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5pbnB1dCA9IGNyZWF0ZUlucHV0SW5zdGFuY2UodGhpcyk7XG4gICAgdGhpcy50b3VjaEFjdGlvbiA9IG5ldyBUb3VjaEFjdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMudG91Y2hBY3Rpb24pO1xuXG4gICAgdG9nZ2xlQ3NzUHJvcHModGhpcywgdHJ1ZSk7XG5cbiAgICBlYWNoKHRoaXMub3B0aW9ucy5yZWNvZ25pemVycywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgcmVjb2duaXplciA9IHRoaXMuYWRkKG5ldyAoaXRlbVswXSkoaXRlbVsxXSkpO1xuICAgICAgICBpdGVtWzJdICYmIHJlY29nbml6ZXIucmVjb2duaXplV2l0aChpdGVtWzJdKTtcbiAgICAgICAgaXRlbVszXSAmJiByZWNvZ25pemVyLnJlcXVpcmVGYWlsdXJlKGl0ZW1bM10pO1xuICAgIH0sIHRoaXMpO1xufVxuXG5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBzZXQgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybnMge01hbmFnZXJ9XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIE9wdGlvbnMgdGhhdCBuZWVkIGEgbGl0dGxlIG1vcmUgc2V0dXBcbiAgICAgICAgaWYgKG9wdGlvbnMudG91Y2hBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hBY3Rpb24udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW5wdXRUYXJnZXQpIHtcbiAgICAgICAgICAgIC8vIENsZWFuIHVwIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVycyBhbmQgcmVpbml0aWFsaXplXG4gICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQudGFyZ2V0ID0gb3B0aW9ucy5pbnB1dFRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBzdG9wIHJlY29nbml6aW5nIGZvciB0aGlzIHNlc3Npb24uXG4gICAgICogVGhpcyBzZXNzaW9uIHdpbGwgYmUgZGlzY2FyZGVkLCB3aGVuIGEgbmV3IFtpbnB1dF1zdGFydCBldmVudCBpcyBmaXJlZC5cbiAgICAgKiBXaGVuIGZvcmNlZCwgdGhlIHJlY29nbml6ZXIgY3ljbGUgaXMgc3RvcHBlZCBpbW1lZGlhdGVseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZV1cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbihmb3JjZSkge1xuICAgICAgICB0aGlzLnNlc3Npb24uc3RvcHBlZCA9IGZvcmNlID8gRk9SQ0VEX1NUT1AgOiBTVE9QO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBydW4gdGhlIHJlY29nbml6ZXJzIVxuICAgICAqIGNhbGxlZCBieSB0aGUgaW5wdXRIYW5kbGVyIGZ1bmN0aW9uIG9uIGV2ZXJ5IG1vdmVtZW50IG9mIHRoZSBwb2ludGVycyAodG91Y2hlcylcbiAgICAgKiBpdCB3YWxrcyB0aHJvdWdoIGFsbCB0aGUgcmVjb2duaXplcnMgYW5kIHRyaWVzIHRvIGRldGVjdCB0aGUgZ2VzdHVyZSB0aGF0IGlzIGJlaW5nIG1hZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhXG4gICAgICovXG4gICAgcmVjb2duaXplOiBmdW5jdGlvbihpbnB1dERhdGEpIHtcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLnNlc3Npb247XG4gICAgICAgIGlmIChzZXNzaW9uLnN0b3BwZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJ1biB0aGUgdG91Y2gtYWN0aW9uIHBvbHlmaWxsXG4gICAgICAgIHRoaXMudG91Y2hBY3Rpb24ucHJldmVudERlZmF1bHRzKGlucHV0RGF0YSk7XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXI7XG4gICAgICAgIHZhciByZWNvZ25pemVycyA9IHRoaXMucmVjb2duaXplcnM7XG5cbiAgICAgICAgLy8gdGhpcyBob2xkcyB0aGUgcmVjb2duaXplciB0aGF0IGlzIGJlaW5nIHJlY29nbml6ZWQuXG4gICAgICAgIC8vIHNvIHRoZSByZWNvZ25pemVyJ3Mgc3RhdGUgbmVlZHMgdG8gYmUgQkVHQU4sIENIQU5HRUQsIEVOREVEIG9yIFJFQ09HTklaRURcbiAgICAgICAgLy8gaWYgbm8gcmVjb2duaXplciBpcyBkZXRlY3RpbmcgYSB0aGluZywgaXQgaXMgc2V0IHRvIGBudWxsYFxuICAgICAgICB2YXIgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplcjtcblxuICAgICAgICAvLyByZXNldCB3aGVuIHRoZSBsYXN0IHJlY29nbml6ZXIgaXMgcmVjb2duaXplZFxuICAgICAgICAvLyBvciB3aGVuIHdlJ3JlIGluIGEgbmV3IHNlc3Npb25cbiAgICAgICAgaWYgKCFjdXJSZWNvZ25pemVyIHx8IChjdXJSZWNvZ25pemVyICYmIGN1clJlY29nbml6ZXIuc3RhdGUgJiBTVEFURV9SRUNPR05JWkVEKSkge1xuICAgICAgICAgICAgY3VyUmVjb2duaXplciA9IHNlc3Npb24uY3VyUmVjb2duaXplciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgcmVjb2duaXplcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZWNvZ25pemVyID0gcmVjb2duaXplcnNbaV07XG5cbiAgICAgICAgICAgIC8vIGZpbmQgb3V0IGlmIHdlIGFyZSBhbGxvd2VkIHRyeSB0byByZWNvZ25pemUgdGhlIGlucHV0IGZvciB0aGlzIG9uZS5cbiAgICAgICAgICAgIC8vIDEuICAgYWxsb3cgaWYgdGhlIHNlc3Npb24gaXMgTk9UIGZvcmNlZCBzdG9wcGVkIChzZWUgdGhlIC5zdG9wKCkgbWV0aG9kKVxuICAgICAgICAgICAgLy8gMi4gICBhbGxvdyBpZiB3ZSBzdGlsbCBoYXZlbid0IHJlY29nbml6ZWQgYSBnZXN0dXJlIGluIHRoaXMgc2Vzc2lvbiwgb3IgdGhlIHRoaXMgcmVjb2duaXplciBpcyB0aGUgb25lXG4gICAgICAgICAgICAvLyAgICAgIHRoYXQgaXMgYmVpbmcgcmVjb2duaXplZC5cbiAgICAgICAgICAgIC8vIDMuICAgYWxsb3cgaWYgdGhlIHJlY29nbml6ZXIgaXMgYWxsb3dlZCB0byBydW4gc2ltdWx0YW5lb3VzIHdpdGggdGhlIGN1cnJlbnQgcmVjb2duaXplZCByZWNvZ25pemVyLlxuICAgICAgICAgICAgLy8gICAgICB0aGlzIGNhbiBiZSBzZXR1cCB3aXRoIHRoZSBgcmVjb2duaXplV2l0aCgpYCBtZXRob2Qgb24gdGhlIHJlY29nbml6ZXIuXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5zdG9wcGVkICE9PSBGT1JDRURfU1RPUCAmJiAoIC8vIDFcbiAgICAgICAgICAgICAgICAgICAgIWN1clJlY29nbml6ZXIgfHwgcmVjb2duaXplciA9PSBjdXJSZWNvZ25pemVyIHx8IC8vIDJcbiAgICAgICAgICAgICAgICAgICAgcmVjb2duaXplci5jYW5SZWNvZ25pemVXaXRoKGN1clJlY29nbml6ZXIpKSkgeyAvLyAzXG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZWNvZ25pemUoaW5wdXREYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplci5yZXNldCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVjb2duaXplciBoYXMgYmVlbiByZWNvZ25pemluZyB0aGUgaW5wdXQgYXMgYSB2YWxpZCBnZXN0dXJlLCB3ZSB3YW50IHRvIHN0b3JlIHRoaXMgb25lIGFzIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBhY3RpdmUgcmVjb2duaXplci4gYnV0IG9ubHkgaWYgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGFuIGFjdGl2ZSByZWNvZ25pemVyXG4gICAgICAgICAgICBpZiAoIWN1clJlY29nbml6ZXIgJiYgcmVjb2duaXplci5zdGF0ZSAmIChTVEFURV9CRUdBTiB8IFNUQVRFX0NIQU5HRUQgfCBTVEFURV9FTkRFRCkpIHtcbiAgICAgICAgICAgICAgICBjdXJSZWNvZ25pemVyID0gc2Vzc2lvbi5jdXJSZWNvZ25pemVyID0gcmVjb2duaXplcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBnZXQgYSByZWNvZ25pemVyIGJ5IGl0cyBldmVudCBuYW1lLlxuICAgICAqIEBwYXJhbSB7UmVjb2duaXplcnxTdHJpbmd9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxOdWxsfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAocmVjb2duaXplciBpbnN0YW5jZW9mIFJlY29nbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWNvZ25pemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJlY29nbml6ZXJzW2ldLm9wdGlvbnMuZXZlbnQgPT0gcmVjb2duaXplcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWNvZ25pemVyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgcmVjb2duaXplciB0byB0aGUgbWFuYWdlclxuICAgICAqIGV4aXN0aW5nIHJlY29nbml6ZXJzIHdpdGggdGhlIHNhbWUgZXZlbnQgbmFtZSB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBAcGFyYW0ge1JlY29nbml6ZXJ9IHJlY29nbml6ZXJcbiAgICAgKiBAcmV0dXJucyB7UmVjb2duaXplcnxNYW5hZ2VyfVxuICAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ2FkZCcsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBleGlzdGluZ1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLmdldChyZWNvZ25pemVyLm9wdGlvbnMuZXZlbnQpO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGV4aXN0aW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjb2duaXplcnMucHVzaChyZWNvZ25pemVyKTtcbiAgICAgICAgcmVjb2duaXplci5tYW5hZ2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gcmVjb2duaXplcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlIGEgcmVjb2duaXplciBieSBuYW1lIG9yIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHtSZWNvZ25pemVyfFN0cmluZ30gcmVjb2duaXplclxuICAgICAqIEByZXR1cm5zIHtNYW5hZ2VyfVxuICAgICAqL1xuICAgIHJlbW92ZTogZnVuY3Rpb24ocmVjb2duaXplcikge1xuICAgICAgICBpZiAoaW52b2tlQXJyYXlBcmcocmVjb2duaXplciwgJ3JlbW92ZScsIHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY29nbml6ZXIgPSB0aGlzLmdldChyZWNvZ25pemVyKTtcblxuICAgICAgICAvLyBsZXQncyBtYWtlIHN1cmUgdGhpcyByZWNvZ25pemVyIGV4aXN0c1xuICAgICAgICBpZiAocmVjb2duaXplcikge1xuICAgICAgICAgICAgdmFyIHJlY29nbml6ZXJzID0gdGhpcy5yZWNvZ25pemVycztcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGluQXJyYXkocmVjb2duaXplcnMsIHJlY29nbml6ZXIpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVjb2duaXplcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoQWN0aW9uLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGJpbmQgZXZlbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSA9IGhhbmRsZXJzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHVuYmluZCBldmVudCwgbGVhdmUgZW1pdCBibGFuayB0byByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXVxuICAgICAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IHRoaXNcbiAgICAgKi9cbiAgICBvZmY6IGZ1bmN0aW9uKGV2ZW50cywgaGFuZGxlcikge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnM7XG4gICAgICAgIGVhY2goc3BsaXRTdHIoZXZlbnRzKSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tldmVudF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2V2ZW50XSAmJiBoYW5kbGVyc1tldmVudF0uc3BsaWNlKGluQXJyYXkoaGFuZGxlcnNbZXZlbnRdLCBoYW5kbGVyKSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZW1pdCBldmVudCB0byB0aGUgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBlbWl0OiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gdHJpZ2dlciBkb20gZXZlbnRzXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZG9tRXZlbnRzKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRG9tRXZlbnQoZXZlbnQsIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gaGFuZGxlcnMsIHNvIHNraXAgaXQgYWxsXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdICYmIHRoaXMuaGFuZGxlcnNbZXZlbnRdLnNsaWNlKCk7XG4gICAgICAgIGlmICghaGFuZGxlcnMgfHwgIWhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS50eXBlID0gZXZlbnQ7XG4gICAgICAgIGRhdGEucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRhdGEuc3JjRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBoYW5kbGVyc1tpXShkYXRhKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXN0cm95IHRoZSBtYW5hZ2VyIGFuZCB1bmJpbmRzIGFsbCBldmVudHNcbiAgICAgKiBpdCBkb2Vzbid0IHVuYmluZCBkb20gZXZlbnRzLCB0aGF0IGlzIHRoZSB1c2VyIG93biByZXNwb25zaWJpbGl0eVxuICAgICAqL1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgJiYgdG9nZ2xlQ3NzUHJvcHModGhpcywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0ge307XG4gICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogYWRkL3JlbW92ZSB0aGUgY3NzIHByb3BlcnRpZXMgYXMgZGVmaW5lZCBpbiBtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHNcbiAqIEBwYXJhbSB7TWFuYWdlcn0gbWFuYWdlclxuICogQHBhcmFtIHtCb29sZWFufSBhZGRcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlQ3NzUHJvcHMobWFuYWdlciwgYWRkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBtYW5hZ2VyLmVsZW1lbnQ7XG4gICAgaWYgKCFlbGVtZW50LnN0eWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3A7XG4gICAgZWFjaChtYW5hZ2VyLm9wdGlvbnMuY3NzUHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHByb3AgPSBwcmVmaXhlZChlbGVtZW50LnN0eWxlLCBuYW1lKTtcbiAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSA9IGVsZW1lbnQuc3R5bGVbcHJvcF07XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gbWFuYWdlci5vbGRDc3NQcm9wc1twcm9wXSB8fCAnJztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghYWRkKSB7XG4gICAgICAgIG1hbmFnZXIub2xkQ3NzUHJvcHMgPSB7fTtcbiAgICB9XG59XG5cbi8qKlxuICogdHJpZ2dlciBkb20gZXZlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqL1xuZnVuY3Rpb24gdHJpZ2dlckRvbUV2ZW50KGV2ZW50LCBkYXRhKSB7XG4gICAgdmFyIGdlc3R1cmVFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgIGdlc3R1cmVFdmVudC5pbml0RXZlbnQoZXZlbnQsIHRydWUsIHRydWUpO1xuICAgIGdlc3R1cmVFdmVudC5nZXN0dXJlID0gZGF0YTtcbiAgICBkYXRhLnRhcmdldC5kaXNwYXRjaEV2ZW50KGdlc3R1cmVFdmVudCk7XG59XG5cbmFzc2lnbihIYW1tZXIsIHtcbiAgICBJTlBVVF9TVEFSVDogSU5QVVRfU1RBUlQsXG4gICAgSU5QVVRfTU9WRTogSU5QVVRfTU9WRSxcbiAgICBJTlBVVF9FTkQ6IElOUFVUX0VORCxcbiAgICBJTlBVVF9DQU5DRUw6IElOUFVUX0NBTkNFTCxcblxuICAgIFNUQVRFX1BPU1NJQkxFOiBTVEFURV9QT1NTSUJMRSxcbiAgICBTVEFURV9CRUdBTjogU1RBVEVfQkVHQU4sXG4gICAgU1RBVEVfQ0hBTkdFRDogU1RBVEVfQ0hBTkdFRCxcbiAgICBTVEFURV9FTkRFRDogU1RBVEVfRU5ERUQsXG4gICAgU1RBVEVfUkVDT0dOSVpFRDogU1RBVEVfUkVDT0dOSVpFRCxcbiAgICBTVEFURV9DQU5DRUxMRUQ6IFNUQVRFX0NBTkNFTExFRCxcbiAgICBTVEFURV9GQUlMRUQ6IFNUQVRFX0ZBSUxFRCxcblxuICAgIERJUkVDVElPTl9OT05FOiBESVJFQ1RJT05fTk9ORSxcbiAgICBESVJFQ1RJT05fTEVGVDogRElSRUNUSU9OX0xFRlQsXG4gICAgRElSRUNUSU9OX1JJR0hUOiBESVJFQ1RJT05fUklHSFQsXG4gICAgRElSRUNUSU9OX1VQOiBESVJFQ1RJT05fVVAsXG4gICAgRElSRUNUSU9OX0RPV046IERJUkVDVElPTl9ET1dOLFxuICAgIERJUkVDVElPTl9IT1JJWk9OVEFMOiBESVJFQ1RJT05fSE9SSVpPTlRBTCxcbiAgICBESVJFQ1RJT05fVkVSVElDQUw6IERJUkVDVElPTl9WRVJUSUNBTCxcbiAgICBESVJFQ1RJT05fQUxMOiBESVJFQ1RJT05fQUxMLFxuXG4gICAgTWFuYWdlcjogTWFuYWdlcixcbiAgICBJbnB1dDogSW5wdXQsXG4gICAgVG91Y2hBY3Rpb246IFRvdWNoQWN0aW9uLFxuXG4gICAgVG91Y2hJbnB1dDogVG91Y2hJbnB1dCxcbiAgICBNb3VzZUlucHV0OiBNb3VzZUlucHV0LFxuICAgIFBvaW50ZXJFdmVudElucHV0OiBQb2ludGVyRXZlbnRJbnB1dCxcbiAgICBUb3VjaE1vdXNlSW5wdXQ6IFRvdWNoTW91c2VJbnB1dCxcbiAgICBTaW5nbGVUb3VjaElucHV0OiBTaW5nbGVUb3VjaElucHV0LFxuXG4gICAgUmVjb2duaXplcjogUmVjb2duaXplcixcbiAgICBBdHRyUmVjb2duaXplcjogQXR0clJlY29nbml6ZXIsXG4gICAgVGFwOiBUYXBSZWNvZ25pemVyLFxuICAgIFBhbjogUGFuUmVjb2duaXplcixcbiAgICBTd2lwZTogU3dpcGVSZWNvZ25pemVyLFxuICAgIFBpbmNoOiBQaW5jaFJlY29nbml6ZXIsXG4gICAgUm90YXRlOiBSb3RhdGVSZWNvZ25pemVyLFxuICAgIFByZXNzOiBQcmVzc1JlY29nbml6ZXIsXG5cbiAgICBvbjogYWRkRXZlbnRMaXN0ZW5lcnMsXG4gICAgb2ZmOiByZW1vdmVFdmVudExpc3RlbmVycyxcbiAgICBlYWNoOiBlYWNoLFxuICAgIG1lcmdlOiBtZXJnZSxcbiAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBpbmhlcml0OiBpbmhlcml0LFxuICAgIGJpbmRGbjogYmluZEZuLFxuICAgIHByZWZpeGVkOiBwcmVmaXhlZFxufSk7XG5cbi8vIHRoaXMgcHJldmVudHMgZXJyb3JzIHdoZW4gSGFtbWVyIGlzIGxvYWRlZCBpbiB0aGUgcHJlc2VuY2Ugb2YgYW4gQU1EXG4vLyAgc3R5bGUgbG9hZGVyIGJ1dCBieSBzY3JpcHQgdGFnLCBub3QgYnkgdGhlIGxvYWRlci5cbnZhciBmcmVlR2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB7fSkpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbmZyZWVHbG9iYWwuSGFtbWVyID0gSGFtbWVyO1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gSGFtbWVyO1xuICAgIH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBIYW1tZXI7XG59IGVsc2Uge1xuICAgIHdpbmRvd1tleHBvcnROYW1lXSA9IEhhbW1lcjtcbn1cblxufSkod2luZG93LCBkb2N1bWVudCwgJ0hhbW1lcicpO1xuIiwiLyoqXG4gKiBNaWNyb0V2ZW50IC0gdG8gbWFrZSBhbnkganMgb2JqZWN0IGFuIGV2ZW50IGVtaXR0ZXIgKHNlcnZlciBvciBicm93c2VyKVxuICogXG4gKiAtIHB1cmUgamF2YXNjcmlwdCAtIHNlcnZlciBjb21wYXRpYmxlLCBicm93c2VyIGNvbXBhdGlibGVcbiAqIC0gZG9udCByZWx5IG9uIHRoZSBicm93c2VyIGRvbXNcbiAqIC0gc3VwZXIgc2ltcGxlIC0geW91IGdldCBpdCBpbW1lZGlhdGx5LCBubyBtaXN0ZXJ5LCBubyBtYWdpYyBpbnZvbHZlZFxuICpcbiAqIC0gY3JlYXRlIGEgTWljcm9FdmVudERlYnVnIHdpdGggZ29vZGllcyB0byBkZWJ1Z1xuICogICAtIG1ha2UgaXQgc2FmZXIgdG8gdXNlXG4qL1xuXG52YXIgTWljcm9FdmVudFx0PSBmdW5jdGlvbigpe31cbk1pY3JvRXZlbnQucHJvdG90eXBlXHQ9IHtcblx0YmluZFx0OiBmdW5jdGlvbihldmVudCwgZmN0KXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF1cdHx8IFtdO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmY3QpO1xuXHR9LFxuXHR1bmJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XS5zcGxpY2UodGhpcy5fZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZjdCksIDEpO1xuXHR9LFxuXHR0cmlnZ2VyXHQ6IGZ1bmN0aW9uKGV2ZW50IC8qICwgYXJncy4uLiAqLyl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZXZlbnRzW2V2ZW50XVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBtaXhpbiB3aWxsIGRlbGVnYXRlIGFsbCBNaWNyb0V2ZW50LmpzIGZ1bmN0aW9uIGluIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAqXG4gKiAtIHJlcXVpcmUoJ01pY3JvRXZlbnQnKS5taXhpbihGb29iYXIpIHdpbGwgbWFrZSBGb29iYXIgYWJsZSB0byB1c2UgTWljcm9FdmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgc3VwcG9ydCBNaWNyb0V2ZW50XG4qL1xuTWljcm9FdmVudC5taXhpblx0PSBmdW5jdGlvbihkZXN0T2JqZWN0KXtcblx0dmFyIHByb3BzXHQ9IFsnYmluZCcsICd1bmJpbmQnLCAndHJpZ2dlciddO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICsrKXtcblx0XHRkZXN0T2JqZWN0LnByb3RvdHlwZVtwcm9wc1tpXV1cdD0gTWljcm9FdmVudC5wcm90b3R5cGVbcHJvcHNbaV1dO1xuXHR9XG59XG5cbi8vIGV4cG9ydCBpbiBjb21tb24ganNcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmICgnZXhwb3J0cycgaW4gbW9kdWxlKSl7XG5cdG1vZHVsZS5leHBvcnRzXHQ9IE1pY3JvRXZlbnRcbn1cbiJdfQ==
