(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(factory) :
	(global = global || self, global.SGN = factory());
}(this, function () { 'use strict';

	var _library = false;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n.default || n;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterators = {};

	// check on default Array iterator

	var ITERATOR = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var ITERATOR$1 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	var process$1 = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};
	var _task_1 = _task.set;
	var _task_2 = _task.clear;

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$2 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$2) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	'use strict';
	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$1 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$1
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator$1 = _global.navigator;

	var _userAgent = navigator$1 && navigator$1.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var def = _objectDp.f;

	var TAG$1 = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
	};

	'use strict';



	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$2 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$2]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$2]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$2] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	'use strict';










	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$3 = _global.process;
	var versions = process$3 && process$3.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$3) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$3.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var es6_promise = {

	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$3 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$3
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};
	var _setProto_1 = _setProto.set;
	var _setProto_2 = _setProto.check;

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var dP$1 = _objectDp.f;
	var gOPN = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base = $RegExp;
	var proto = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$1($RegExp, key, {
	      configurable: true,
	      get: function () { return Base[key]; },
	      set: function (it) { Base[key] = it; }
	    });
	  };
	  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var es6_regexp_constructor = {

	};

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var es6_regexp_flags = {

	};

	'use strict';




	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	var es6_regexp_toString = {

	};

	'use strict';
	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	var es6_object_toString = {

	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	'use strict';
	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	'use strict';


	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	'use strict';



	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	'use strict';

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var es6_regexp_exec = {

	};

	'use strict';








	var SPECIES$2 = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$2] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	'use strict';







	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	var es6_regexp_replace = {

	};

	var dP$2 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var es6_function_name = {

	};

	var util;
	util = {
	  isBrowser: function isBrowser() {
	    return typeof window === 'object' && typeof document === 'object';
	  },
	  isNode: function isNode() {
	    return typeof process === 'object';
	  },
	  error: function error(err, options) {
	    var key, value;
	    err.message = err.message || null;

	    if (typeof options === 'string') {
	      err.message = options;
	    } else if (typeof options === 'object' && options != null) {
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
	  },
	  // Method for wrapping a function that takes a callback in any position
	  // to return promises if no callback is given in a call.
	  // The second argument, cbParameterIndex, is the position of the callback in the original functions parameter list.
	  // CoffeeScript optional parameters messes with this function arity detection,
	  // not sure what to do about that, other than always setting cbParameterIndex at callsites.
	  promiseCallbackInterop: function promiseCallbackInterop(fun) {
	    var cbParameterIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fun.length - 1;
	    var makePromise; // This is the function that actually wraps and calls a method to return a promise.

	    makePromise = function makePromise(fun, cbParameterIndex, parameters) {
	      return new Promise(function (resolve, reject) {
	        var callParameters, i, j, neoCallback, ref;

	        neoCallback = function neoCallback(error, result) {
	          if (error) {
	            return reject(error);
	          } else {
	            return resolve(result);
	          }
	        };

	        callParameters = [];

	        for (i = j = 0, ref = Math.max(parameters.length, cbParameterIndex) + 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	          callParameters.push(i === cbParameterIndex ? neoCallback : parameters[i]);
	        }

	        return fun.apply(this, callParameters);
	      });
	    }; // Wrapper function that decides what to do per-call.


	    return function () {
	      for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
	        parameters[_key] = arguments[_key];
	      }

	      if (typeof parameters[cbParameterIndex] === 'function') {
	        // Callback given, do a regular old call.
	        return fun.apply(null, parameters);
	      } else if (typeof Promise === 'function') {
	        // No callback given, and we have promise support, use makePromise to wrap the call.
	        return makePromise(fun, cbParameterIndex, parameters);
	      } else {
	        // Ain't got callback, ain't got promise support; we gotta tell the developer.
	        throw new Error("To be able to use this asynchronous method you should:\nSupply a callback function as argument #".concat(1 + cbParameterIndex, ".\nThis callback function will be called with the method call response.\nAlternatively, when supported, it can return a Promise if no callback function is given."));
	      }
	    };
	  }
	};
	var util_1 = util;

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	'use strict';



	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	'use strict';








	var ITERATOR$3 = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
	    _hide(proto, ITERATOR$3, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	'use strict';





	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
	  var NAME$1 = collections[i$1];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto$1 = Collection && Collection.prototype;
	  var key;
	  if (proto$1) {
	    if (!proto$1[ITERATOR$4]) _hide(proto$1, ITERATOR$4, ArrayValues);
	    if (!proto$1[TO_STRING_TAG]) _hide(proto$1, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto$1[key]) _redefine(proto$1, key, es6_array_iterator[key], true);
	  }
	}

	var web_dom_iterable = {

	};

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

	var REACT_ELEMENT_TYPE;

	function _jsx(type, props, key, children) {
	  if (!REACT_ELEMENT_TYPE) {
	    REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
	  }

	  var defaultProps = type && type.defaultProps;
	  var childrenLength = arguments.length - 3;

	  if (!props && childrenLength !== 0) {
	    props = {
	      children: void 0
	    };
	  }

	  if (props && defaultProps) {
	    for (var propName in defaultProps) {
	      if (props[propName] === void 0) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  } else if (!props) {
	    props = defaultProps || {};
	  }

	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = new Array(childrenLength);

	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 3];
	    }

	    props.children = childArray;
	  }

	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key === undefined ? null : '' + key,
	    ref: null,
	    props: props,
	    _owner: null
	  };
	}

	function _asyncIterator(iterable) {
	  var method;

	  if (typeof Symbol === "function") {
	    if (Symbol.asyncIterator) {
	      method = iterable[Symbol.asyncIterator];
	      if (method != null) return method.call(iterable);
	    }

	    if (Symbol.iterator) {
	      method = iterable[Symbol.iterator];
	      if (method != null) return method.call(iterable);
	    }
	  }

	  throw new TypeError("Object is not async iterable");
	}

	function _AwaitValue(value) {
	  this.wrapped = value;
	}

	function _AsyncGenerator(gen) {
	  var front, back;

	  function send(key, arg) {
	    return new Promise(function (resolve, reject) {
	      var request = {
	        key: key,
	        arg: arg,
	        resolve: resolve,
	        reject: reject,
	        next: null
	      };

	      if (back) {
	        back = back.next = request;
	      } else {
	        front = back = request;
	        resume(key, arg);
	      }
	    });
	  }

	  function resume(key, arg) {
	    try {
	      var result = gen[key](arg);
	      var value = result.value;
	      var wrappedAwait = value instanceof _AwaitValue;
	      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
	        if (wrappedAwait) {
	          resume("next", arg);
	          return;
	        }

	        settle(result.done ? "return" : "normal", arg);
	      }, function (err) {
	        resume("throw", err);
	      });
	    } catch (err) {
	      settle("throw", err);
	    }
	  }

	  function settle(type, value) {
	    switch (type) {
	      case "return":
	        front.resolve({
	          value: value,
	          done: true
	        });
	        break;

	      case "throw":
	        front.reject(value);
	        break;

	      default:
	        front.resolve({
	          value: value,
	          done: false
	        });
	        break;
	    }

	    front = front.next;

	    if (front) {
	      resume(front.key, front.arg);
	    } else {
	      back = null;
	    }
	  }

	  this._invoke = send;

	  if (typeof gen.return !== "function") {
	    this.return = undefined;
	  }
	}

	if (typeof Symbol === "function" && Symbol.asyncIterator) {
	  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	    return this;
	  };
	}

	_AsyncGenerator.prototype.next = function (arg) {
	  return this._invoke("next", arg);
	};

	_AsyncGenerator.prototype.throw = function (arg) {
	  return this._invoke("throw", arg);
	};

	_AsyncGenerator.prototype.return = function (arg) {
	  return this._invoke("return", arg);
	};

	function _wrapAsyncGenerator(fn) {
	  return function () {
	    return new _AsyncGenerator(fn.apply(this, arguments));
	  };
	}

	function _awaitAsyncGenerator(value) {
	  return new _AwaitValue(value);
	}

	function _asyncGeneratorDelegate(inner, awaitWrap) {
	  var iter = {},
	      waiting = false;

	  function pump(key, value) {
	    waiting = true;
	    value = new Promise(function (resolve) {
	      resolve(inner[key](value));
	    });
	    return {
	      done: false,
	      value: awaitWrap(value)
	    };
	  }

	  ;

	  if (typeof Symbol === "function" && Symbol.iterator) {
	    iter[Symbol.iterator] = function () {
	      return this;
	    };
	  }

	  iter.next = function (value) {
	    if (waiting) {
	      waiting = false;
	      return value;
	    }

	    return pump("next", value);
	  };

	  if (typeof inner.throw === "function") {
	    iter.throw = function (value) {
	      if (waiting) {
	        waiting = false;
	        throw value;
	      }

	      return pump("throw", value);
	    };
	  }

	  if (typeof inner.return === "function") {
	    iter.return = function (value) {
	      return pump("return", value);
	    };
	  }

	  return iter;
	}

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
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

	function _defineEnumerableProperties(obj, descs) {
	  for (var key in descs) {
	    var desc = descs[key];
	    desc.configurable = desc.enumerable = true;
	    if ("value" in desc) desc.writable = true;
	    Object.defineProperty(obj, key, desc);
	  }

	  if (Object.getOwnPropertySymbols) {
	    var objectSymbols = Object.getOwnPropertySymbols(descs);

	    for (var i = 0; i < objectSymbols.length; i++) {
	      var sym = objectSymbols[i];
	      var desc = descs[sym];
	      desc.configurable = desc.enumerable = true;
	      if ("value" in desc) desc.writable = true;
	      Object.defineProperty(obj, sym, desc);
	    }
	  }

	  return obj;
	}

	function _defaults(obj, defaults) {
	  var keys = Object.getOwnPropertyNames(defaults);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var value = Object.getOwnPropertyDescriptor(defaults, key);

	    if (value && value.configurable && obj[key] === undefined) {
	      Object.defineProperty(obj, key, value);
	    }
	  }

	  return obj;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    _construct = Reflect.construct;
	  } else {
	    _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) _setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !_isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return _setPrototypeOf(Wrapper, Class);
	  };

	  return _wrapNativeSuper(Class);
	}

	function _instanceof(left, right) {
	  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	    return right[Symbol.hasInstance](left);
	  } else {
	    return left instanceof right;
	  }
	}

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	}

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) {
	          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

	          if (desc.get || desc.set) {
	            Object.defineProperty(newObj, key, desc);
	          } else {
	            newObj[key] = obj[key];
	          }
	        }
	      }
	    }

	    newObj.default = obj;
	    return newObj;
	  }
	}

	function _newArrowCheck(innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	}

	function _objectDestructuringEmpty(obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	function set(target, property, value, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.set) {
	    set = Reflect.set;
	  } else {
	    set = function set(target, property, value, receiver) {
	      var base = _superPropBase(target, property);

	      var desc;

	      if (base) {
	        desc = Object.getOwnPropertyDescriptor(base, property);

	        if (desc.set) {
	          desc.set.call(receiver, value);
	          return true;
	        } else if (!desc.writable) {
	          return false;
	        }
	      }

	      desc = Object.getOwnPropertyDescriptor(receiver, property);

	      if (desc) {
	        if (!desc.writable) {
	          return false;
	        }

	        desc.value = value;
	        Object.defineProperty(receiver, property, desc);
	      } else {
	        _defineProperty(receiver, property, value);
	      }

	      return true;
	    };
	  }

	  return set(target, property, value, receiver);
	}

	function _set(target, property, value, receiver, isStrict) {
	  var s = set(target, property, value, receiver || target);

	  if (!s && isStrict) {
	    throw new Error('failed to set property');
	  }

	  return value;
	}

	function _taggedTemplateLiteral(strings, raw) {
	  if (!raw) {
	    raw = strings.slice(0);
	  }

	  return Object.freeze(Object.defineProperties(strings, {
	    raw: {
	      value: Object.freeze(raw)
	    }
	  }));
	}

	function _taggedTemplateLiteralLoose(strings, raw) {
	  if (!raw) {
	    raw = strings.slice(0);
	  }

	  strings.raw = raw;
	  return strings;
	}

	function _temporalRef(val, name) {
	  if (val === _temporalUndefined) {
	    throw new ReferenceError(name + " is not defined - temporal dead zone");
	  } else {
	    return val;
	  }
	}

	function _readOnlyError(name) {
	  throw new Error("\"" + name + "\" is read-only");
	}

	function _classNameTDZError(name) {
	  throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
	}

	var _temporalUndefined = {};

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _slicedToArrayLoose(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
	}

	function _toArray(arr) {
	  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _iterableToArrayLimitLoose(arr, i) {
	  var _arr = [];

	  for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
	    _arr.push(_step.value);

	    if (i && _arr.length === i) break;
	  }

	  return _arr;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	function _skipFirstGeneratorNext(fn) {
	  return function () {
	    var it = fn.apply(this, arguments);
	    it.next();
	    return it;
	  };
	}

	function _toPrimitive$1(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];

	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }

	  return (hint === "string" ? String : Number)(input);
	}

	function _toPropertyKey(arg) {
	  var key = _toPrimitive$1(arg, "string");

	  return typeof key === "symbol" ? key : String(key);
	}

	function _initializerWarningHelper(descriptor, context) {
	  throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.');
	}

	function _initializerDefineProperty(target, property, descriptor, context) {
	  if (!descriptor) return;
	  Object.defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object.keys(descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object.defineProperty(target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	var id$1 = 0;

	function _classPrivateFieldLooseKey(name) {
	  return "__private_" + id$1++ + "_" + name;
	}

	function _classPrivateFieldLooseBase(receiver, privateKey) {
	  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
	    throw new TypeError("attempted to use private field on non-instance");
	  }

	  return receiver;
	}

	function _classPrivateFieldGet(receiver, privateMap) {
	  if (!privateMap.has(receiver)) {
	    throw new TypeError("attempted to get private field on non-instance");
	  }

	  var descriptor = privateMap.get(receiver);

	  if (descriptor.get) {
	    return descriptor.get.call(receiver);
	  }

	  return descriptor.value;
	}

	function _classPrivateFieldSet(receiver, privateMap, value) {
	  if (!privateMap.has(receiver)) {
	    throw new TypeError("attempted to set private field on non-instance");
	  }

	  var descriptor = privateMap.get(receiver);

	  if (descriptor.set) {
	    descriptor.set.call(receiver, value);
	  } else {
	    if (!descriptor.writable) {
	      throw new TypeError("attempted to set read only private field");
	    }

	    descriptor.value = value;
	  }

	  return value;
	}

	function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
	  if (receiver !== classConstructor) {
	    throw new TypeError("Private static access of wrong provenance");
	  }

	  return descriptor.value;
	}

	function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
	  if (receiver !== classConstructor) {
	    throw new TypeError("Private static access of wrong provenance");
	  }

	  if (!descriptor.writable) {
	    throw new TypeError("attempted to set read only private field");
	  }

	  descriptor.value = value;
	  return value;
	}

	function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
	  if (receiver !== classConstructor) {
	    throw new TypeError("Private static access of wrong provenance");
	  }

	  return method;
	}

	function _classStaticPrivateMethodSet() {
	  throw new TypeError("attempted to set read only static private field");
	}

	function _decorate(decorators, factory, superClass, mixins) {
	  var api = _getDecoratorsApi();

	  if (mixins) {
	    for (var i = 0; i < mixins.length; i++) {
	      api = mixins[i](api);
	    }
	  }

	  var r = factory(function initialize(O) {
	    api.initializeInstanceElements(O, decorated.elements);
	  }, superClass);
	  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
	  api.initializeClassElements(r.F, decorated.elements);
	  return api.runClassFinishers(r.F, decorated.finishers);
	}

	function _getDecoratorsApi() {
	  _getDecoratorsApi = function () {
	    return api;
	  };

	  var api = {
	    elementsDefinitionOrder: [["method"], ["field"]],
	    initializeInstanceElements: function (O, elements) {
	      ["method", "field"].forEach(function (kind) {
	        elements.forEach(function (element) {
	          if (element.kind === kind && element.placement === "own") {
	            this.defineClassElement(O, element);
	          }
	        }, this);
	      }, this);
	    },
	    initializeClassElements: function (F, elements) {
	      var proto = F.prototype;
	      ["method", "field"].forEach(function (kind) {
	        elements.forEach(function (element) {
	          var placement = element.placement;

	          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
	            var receiver = placement === "static" ? F : proto;
	            this.defineClassElement(receiver, element);
	          }
	        }, this);
	      }, this);
	    },
	    defineClassElement: function (receiver, element) {
	      var descriptor = element.descriptor;

	      if (element.kind === "field") {
	        var initializer = element.initializer;
	        descriptor = {
	          enumerable: descriptor.enumerable,
	          writable: descriptor.writable,
	          configurable: descriptor.configurable,
	          value: initializer === void 0 ? void 0 : initializer.call(receiver)
	        };
	      }

	      Object.defineProperty(receiver, element.key, descriptor);
	    },
	    decorateClass: function (elements, decorators) {
	      var newElements = [];
	      var finishers = [];
	      var placements = {
	        static: [],
	        prototype: [],
	        own: []
	      };
	      elements.forEach(function (element) {
	        this.addElementPlacement(element, placements);
	      }, this);
	      elements.forEach(function (element) {
	        if (!_hasDecorators(element)) return newElements.push(element);
	        var elementFinishersExtras = this.decorateElement(element, placements);
	        newElements.push(elementFinishersExtras.element);
	        newElements.push.apply(newElements, elementFinishersExtras.extras);
	        finishers.push.apply(finishers, elementFinishersExtras.finishers);
	      }, this);

	      if (!decorators) {
	        return {
	          elements: newElements,
	          finishers: finishers
	        };
	      }

	      var result = this.decorateConstructor(newElements, decorators);
	      finishers.push.apply(finishers, result.finishers);
	      result.finishers = finishers;
	      return result;
	    },
	    addElementPlacement: function (element, placements, silent) {
	      var keys = placements[element.placement];

	      if (!silent && keys.indexOf(element.key) !== -1) {
	        throw new TypeError("Duplicated element (" + element.key + ")");
	      }

	      keys.push(element.key);
	    },
	    decorateElement: function (element, placements) {
	      var extras = [];
	      var finishers = [];

	      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
	        var keys = placements[element.placement];
	        keys.splice(keys.indexOf(element.key), 1);
	        var elementObject = this.fromElementDescriptor(element);
	        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
	        element = elementFinisherExtras.element;
	        this.addElementPlacement(element, placements);

	        if (elementFinisherExtras.finisher) {
	          finishers.push(elementFinisherExtras.finisher);
	        }

	        var newExtras = elementFinisherExtras.extras;

	        if (newExtras) {
	          for (var j = 0; j < newExtras.length; j++) {
	            this.addElementPlacement(newExtras[j], placements);
	          }

	          extras.push.apply(extras, newExtras);
	        }
	      }

	      return {
	        element: element,
	        finishers: finishers,
	        extras: extras
	      };
	    },
	    decorateConstructor: function (elements, decorators) {
	      var finishers = [];

	      for (var i = decorators.length - 1; i >= 0; i--) {
	        var obj = this.fromClassDescriptor(elements);
	        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

	        if (elementsAndFinisher.finisher !== undefined) {
	          finishers.push(elementsAndFinisher.finisher);
	        }

	        if (elementsAndFinisher.elements !== undefined) {
	          elements = elementsAndFinisher.elements;

	          for (var j = 0; j < elements.length - 1; j++) {
	            for (var k = j + 1; k < elements.length; k++) {
	              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
	                throw new TypeError("Duplicated element (" + elements[j].key + ")");
	              }
	            }
	          }
	        }
	      }

	      return {
	        elements: elements,
	        finishers: finishers
	      };
	    },
	    fromElementDescriptor: function (element) {
	      var obj = {
	        kind: element.kind,
	        key: element.key,
	        placement: element.placement,
	        descriptor: element.descriptor
	      };
	      var desc = {
	        value: "Descriptor",
	        configurable: true
	      };
	      Object.defineProperty(obj, Symbol.toStringTag, desc);
	      if (element.kind === "field") obj.initializer = element.initializer;
	      return obj;
	    },
	    toElementDescriptors: function (elementObjects) {
	      if (elementObjects === undefined) return;
	      return _toArray(elementObjects).map(function (elementObject) {
	        var element = this.toElementDescriptor(elementObject);
	        this.disallowProperty(elementObject, "finisher", "An element descriptor");
	        this.disallowProperty(elementObject, "extras", "An element descriptor");
	        return element;
	      }, this);
	    },
	    toElementDescriptor: function (elementObject) {
	      var kind = String(elementObject.kind);

	      if (kind !== "method" && kind !== "field") {
	        throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
	      }

	      var key = _toPropertyKey(elementObject.key);

	      var placement = String(elementObject.placement);

	      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
	        throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
	      }

	      var descriptor = elementObject.descriptor;
	      this.disallowProperty(elementObject, "elements", "An element descriptor");
	      var element = {
	        kind: kind,
	        key: key,
	        placement: placement,
	        descriptor: Object.assign({}, descriptor)
	      };

	      if (kind !== "field") {
	        this.disallowProperty(elementObject, "initializer", "A method descriptor");
	      } else {
	        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
	        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
	        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
	        element.initializer = elementObject.initializer;
	      }

	      return element;
	    },
	    toElementFinisherExtras: function (elementObject) {
	      var element = this.toElementDescriptor(elementObject);

	      var finisher = _optionalCallableProperty(elementObject, "finisher");

	      var extras = this.toElementDescriptors(elementObject.extras);
	      return {
	        element: element,
	        finisher: finisher,
	        extras: extras
	      };
	    },
	    fromClassDescriptor: function (elements) {
	      var obj = {
	        kind: "class",
	        elements: elements.map(this.fromElementDescriptor, this)
	      };
	      var desc = {
	        value: "Descriptor",
	        configurable: true
	      };
	      Object.defineProperty(obj, Symbol.toStringTag, desc);
	      return obj;
	    },
	    toClassDescriptor: function (obj) {
	      var kind = String(obj.kind);

	      if (kind !== "class") {
	        throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
	      }

	      this.disallowProperty(obj, "key", "A class descriptor");
	      this.disallowProperty(obj, "placement", "A class descriptor");
	      this.disallowProperty(obj, "descriptor", "A class descriptor");
	      this.disallowProperty(obj, "initializer", "A class descriptor");
	      this.disallowProperty(obj, "extras", "A class descriptor");

	      var finisher = _optionalCallableProperty(obj, "finisher");

	      var elements = this.toElementDescriptors(obj.elements);
	      return {
	        elements: elements,
	        finisher: finisher
	      };
	    },
	    runClassFinishers: function (constructor, finishers) {
	      for (var i = 0; i < finishers.length; i++) {
	        var newConstructor = (0, finishers[i])(constructor);

	        if (newConstructor !== undefined) {
	          if (typeof newConstructor !== "function") {
	            throw new TypeError("Finishers must return a constructor.");
	          }

	          constructor = newConstructor;
	        }
	      }

	      return constructor;
	    },
	    disallowProperty: function (obj, name, objectType) {
	      if (obj[name] !== undefined) {
	        throw new TypeError(objectType + " can't have a ." + name + " property.");
	      }
	    }
	  };
	  return api;
	}

	function _createElementDescriptor(def) {
	  var key = _toPropertyKey(def.key);

	  var descriptor;

	  if (def.kind === "method") {
	    descriptor = {
	      value: def.value,
	      writable: true,
	      configurable: true,
	      enumerable: false
	    };
	  } else if (def.kind === "get") {
	    descriptor = {
	      get: def.value,
	      configurable: true,
	      enumerable: false
	    };
	  } else if (def.kind === "set") {
	    descriptor = {
	      set: def.value,
	      configurable: true,
	      enumerable: false
	    };
	  } else if (def.kind === "field") {
	    descriptor = {
	      configurable: true,
	      writable: true,
	      enumerable: true
	    };
	  }

	  var element = {
	    kind: def.kind === "field" ? "field" : "method",
	    key: key,
	    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
	    descriptor: descriptor
	  };
	  if (def.decorators) element.decorators = def.decorators;
	  if (def.kind === "field") element.initializer = def.value;
	  return element;
	}

	function _coalesceGetterSetter(element, other) {
	  if (element.descriptor.get !== undefined) {
	    other.descriptor.get = element.descriptor.get;
	  } else {
	    other.descriptor.set = element.descriptor.set;
	  }
	}

	function _coalesceClassElements(elements) {
	  var newElements = [];

	  var isSameElement = function (other) {
	    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
	  };

	  for (var i = 0; i < elements.length; i++) {
	    var element = elements[i];
	    var other;

	    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
	      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
	        if (_hasDecorators(element) || _hasDecorators(other)) {
	          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
	        }

	        other.descriptor = element.descriptor;
	      } else {
	        if (_hasDecorators(element)) {
	          if (_hasDecorators(other)) {
	            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
	          }

	          other.decorators = element.decorators;
	        }

	        _coalesceGetterSetter(element, other);
	      }
	    } else {
	      newElements.push(element);
	    }
	  }

	  return newElements;
	}

	function _hasDecorators(element) {
	  return element.decorators && element.decorators.length;
	}

	function _isDataDescriptor(desc) {
	  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
	}

	function _optionalCallableProperty(obj, name) {
	  var value = obj[name];

	  if (value !== undefined && typeof value !== "function") {
	    throw new TypeError("Expected '" + name + "' to be a function");
	  }

	  return value;
	}

	function _classPrivateMethodGet(receiver, privateSet, fn) {
	  if (!privateSet.has(receiver)) {
	    throw new TypeError("attempted to get private field on non-instance");
	  }

	  return fn;
	}

	function _classPrivateMethodSet() {
	  throw new TypeError("attempted to reassign private method");
	}

	function _wrapRegExp(re, groups) {
	  _wrapRegExp = function (re, groups) {
	    return new BabelRegExp(re, groups);
	  };

	  var _RegExp = _wrapNativeSuper(RegExp);

	  var _super = RegExp.prototype;

	  var _groups = new WeakMap();

	  function BabelRegExp(re, groups) {
	    var _this = _RegExp.call(this, re);

	    _groups.set(_this, groups);

	    return _this;
	  }

	  _inherits(BabelRegExp, _RegExp);

	  BabelRegExp.prototype.exec = function (str) {
	    var result = _super.exec.call(this, str);

	    if (result) result.groups = buildGroups(result, this);
	    return result;
	  };

	  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
	    if (typeof substitution === "string") {
	      var groups = _groups.get(this);

	      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
	        return "$" + groups[name];
	      }));
	    } else if (typeof substitution === "function") {
	      var _this = this;

	      return _super[Symbol.replace].call(this, str, function () {
	        var args = [];
	        args.push.apply(args, arguments);

	        if (typeof args[args.length - 1] !== "object") {
	          args.push(buildGroups(args, _this));
	        }

	        return substitution.apply(this, args);
	      });
	    } else {
	      return _super[Symbol.replace].call(this, str, substitution);
	    }
	  };

	  function buildGroups(result, re) {
	    var g = _groups.get(re);

	    return Object.keys(g).reduce(function (groups, name) {
	      groups[name] = result[g[name]];
	      return groups;
	    }, Object.create(null));
	  }

	  return _wrapRegExp.apply(this, arguments);
	}

	var microevent = createCommonjsModule(function (module) {
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

	var MicroEvent	= function(){};
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
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
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
	};

	// export in common js
	if( 'object' !== "undefined" && ('exports' in module)){
		module.exports	= MicroEvent;
	}
	});

	var Config,
	    MicroEvent,
	    indexOf = [].indexOf;
	MicroEvent = microevent;

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

	  ;
	  Config.prototype.keys = ['appVersion', 'appKey', 'appSecret', 'authToken', 'eventTracker', 'locale', 'coreSessionToken', 'coreSessionClientId', 'coreUrl', 'graphUrl', 'eventsTrackUrl', 'eventsPulseUrl', 'assetsFileUploadUrl'];
	  return Config;
	}.call(commonjsGlobal);

	MicroEvent.mixin(Config);
	var config = Config;

	var mustache = createCommonjsModule(function (module, exports) {
	/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	/*global define: false Mustache: true*/

	(function defineMustache (global, factory) {
	  if ('object' === 'object' && exports && typeof exports.nodeName !== 'string') {
	    factory(exports); // CommonJS
	  } else if (typeof undefined === 'function' && undefined.amd) {
	    undefined(['exports'], factory); // AMD
	  } else {
	    global.Mustache = {};
	    factory(global.Mustache); // script, wsh, asp
	  }
	}(commonjsGlobal, function mustacheFactory (mustache) {

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

	  /**
	   * Safe way of detecting whether or not the given thing is a primitive and
	   * whether it has the given property
	   */
	  function primitiveHasOwnProperty (primitive, propName) {  
	    return (
	      primitive != null
	      && typeof primitive !== 'object'
	      && primitive.hasOwnProperty
	      && primitive.hasOwnProperty(propName)
	    );
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
	      var context = this, intermediateValue, names, index, lookupHit = false;

	      while (context) {
	        if (name.indexOf('.') > 0) {
	          intermediateValue = context.view;
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
	           *
	           * In the case where dot notation is used, we consider the lookup
	           * to be successful even if the last "object" in the path is
	           * not actually an object but a primitive (e.g., a string, or an
	           * integer), because it is sometimes useful to access a property
	           * of an autoboxed primitive, such as the length of a string.
	           **/
	          while (intermediateValue != null && index < names.length) {
	            if (index === names.length - 1)
	              lookupHit = (
	                hasProperty(intermediateValue, names[index]) 
	                || primitiveHasOwnProperty(intermediateValue, names[index])
	              );

	            intermediateValue = intermediateValue[names[index++]];
	          }
	        } else {
	          intermediateValue = context.view[name];

	          /**
	           * Only checking against `hasProperty`, which always returns `false` if
	           * `context.view` is not an object. Deliberately omitting the check
	           * against `primitiveHasOwnProperty` if dot notation is not used.
	           *
	           * Consider this example:
	           * ```
	           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
	           * ```
	           *
	           * If we were to check also against `primitiveHasOwnProperty`, as we do
	           * in the dot notation case, then render call would return:
	           *
	           * "The length of a football field is 9."
	           *
	           * rather than the expected:
	           *
	           * "The length of a football field is 100 yards."
	           **/
	          lookupHit = hasProperty(context.view, name);
	        }

	        if (lookupHit) {
	          value = intermediateValue;
	          break;
	        }

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
	   * Parses and caches the given `template` according to the given `tags` or
	   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse (template, tags) {
	    var cache = this.cache;
	    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
	    var tokens = cache[cacheKey];

	    if (tokens == null)
	      tokens = cache[cacheKey] = parseTemplate(template, tags);

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
	   *
	   * If the optional `tags` argument is given here it must be an array with two
	   * string values: the opening and closing tags used in the template (e.g.
	   * [ "<%", "%>" ]). The default is to mustache.tags.
	   */
	  Writer.prototype.render = function render (template, view, partials, tags) {
	    var tokens = this.parse(template, tags);
	    var context = (view instanceof Context) ? view : new Context(view);
	    return this.renderTokens(tokens, context, partials, template, tags);
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
	  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, tags) {
	    var buffer = '';

	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];

	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
	      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
	      else if (symbol === '>') value = this.renderPartial(token, context, partials, tags);
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

	  Writer.prototype.renderPartial = function renderPartial (token, context, partials, tags) {
	    if (!partials) return;

	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null)
	      return this.renderTokens(this.parse(value, tags), context, partials, value);
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
	  mustache.version = '3.0.1';
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
	   * default writer. If the optional `tags` argument is given here it must be an
	   * array with two string values: the opening and closing tags used in the
	   * template (e.g. [ "<%", "%>" ]). The default is to mustache.tags.
	   */
	  mustache.render = function render (template, view, partials, tags) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' +
	                          'but "' + typeStr(template) + '" was given as the first ' +
	                          'argument for mustache#render(template, view, partials)');
	    }

	    return defaultWriter.render(template, view, partials, tags);
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
	});

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
	var translations_1 = translations.t;
	var translations_2 = translations.update;

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
	var core_1 = core.config;
	var core_2 = core.translations;
	var core_3 = core.util;

	var sgn = core;

	var SGN$1, prefixKey;
	SGN$1 = sgn;
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
	var clientLocal_1 = clientLocal.key;
	var clientLocal_2 = clientLocal.storage;
	var clientLocal_3 = clientLocal.get;
	var clientLocal_4 = clientLocal.set;

	var SGN$2, prefixKey$1;
	SGN$2 = sgn;
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
	var clientSession_1 = clientSession.key;
	var clientSession_2 = clientSession.storage;
	var clientSession_3 = clientSession.get;
	var clientSession_4 = clientSession.set;

	'use strict';









	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails(function () { RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var es6_regexp_split = {

	};

	var SGN$3, prefixKey$2;
	SGN$3 = sgn;
	prefixKey$2 = 'sgn-';
	var clientCookie = {
	  get: function get(key) {
	    var c, ca, ct, err, i, len, name, value;

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
	      err = error;
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
	      document.cookie = "".concat(prefixKey$2).concat(key, "=").concat(str, ";expires=").concat(date.toUTCString(), ";path=/");
	    } catch (error) {
	      err = error;
	    }
	  }
	};
	var clientCookie_1 = clientCookie.get;
	var clientCookie_2 = clientCookie.set;

	var SGN$4;
	SGN$4 = sgn;

	var fileUpload = function fileUpload() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var callback = arguments.length > 1 ? arguments[1] : undefined;
	  var progressCallback = arguments.length > 2 ? arguments[2] : undefined;
	  var formData, http, timeout, url;

	  if (options.file == null) {
	    throw new Error('File is not defined');
	  }

	  url = SGN$4.config.get('assetsFileUploadUrl');
	  timeout = 1000 * 60 * 60;
	  formData = new FormData();
	  http = new XMLHttpRequest();
	  formData.append('file', options.file);

	  http.onload = function () {
	    if (http.status === 200) {
	      callback(null, JSON.parse(http.response));
	    } else {
	      callback(SGN$4.util.error(new Error('Request error'), {
	        code: 'RequestError',
	        statusCode: data.statusCode
	      }));
	    }
	  };

	  http.upload.onprogress = function (e) {
	    if (typeof progressCallback === 'function' && e.lengthComputable) {
	      progressCallback({
	        progress: e.loaded / e.total,
	        loaded: e.loaded,
	        total: e.total
	      });
	    }
	  };

	  http.open('post', url);
	  http.timeout = timeout;
	  http.setRequestHeader('Accept', 'application/json');
	  http.send(formData);
	};

	var assets = {
	  fileUpload: fileUpload
	};
	var assets_1 = assets.fileUpload;

	var f$5 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$5
	};

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var es6_object_assign = {

	};

	var browserPonyfill = createCommonjsModule(function (module, exports) {
	var __self__ = (function (root) {
	function F() { this.fetch = false; }
	F.prototype = root;
	return new F();
	})(typeof self !== 'undefined' ? self : commonjsGlobal);
	(function(self) {

	var irrelevant = (function (exports) {
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob:
	      'FileReader' in self &&
	      'Blob' in self &&
	      (function() {
	        try {
	          new Blob();
	          return true
	        } catch (e) {
	          return false
	        }
	      })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function isDataView(obj) {
	    return obj && DataView.prototype.isPrototypeOf(obj)
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ];

	    var isArrayBufferView =
	      ArrayBuffer.isView ||
	      function(obj) {
	        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	      };
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift();
	        return {done: value === undefined, value: value}
	      }
	    };

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      };
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function(header) {
	        this.append(header[0], header[1]);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var oldValue = this.map[name];
	    this.map[name] = oldValue ? oldValue + ', ' + value : value;
	  };

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name);
	    return this.has(name) ? this.map[name] : null
	  };

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  };

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value);
	  };

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this);
	      }
	    }
	  };

	  Headers.prototype.keys = function() {
	    var items = [];
	    this.forEach(function(value, name) {
	      items.push(name);
	    });
	    return iteratorFor(items)
	  };

	  Headers.prototype.values = function() {
	    var items = [];
	    this.forEach(function(value) {
	      items.push(value);
	    });
	    return iteratorFor(items)
	  };

	  Headers.prototype.entries = function() {
	    var items = [];
	    this.forEach(function(value, name) {
	      items.push([name, value]);
	    });
	    return iteratorFor(items)
	  };

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result);
	      };
	      reader.onerror = function() {
	        reject(reader.error);
	      };
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsArrayBuffer(blob);
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsText(blob);
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf);
	    var chars = new Array(view.length);

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i]);
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength);
	      view.set(new Uint8Array(buf));
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function(body) {
	      this._bodyInit = body;
	      if (!body) {
	        this._bodyText = '';
	      } else if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString();
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer);
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer]);
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body);
	      } else {
	        this._bodyText = body = Object.prototype.toString.call(body);
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      };

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      };
	    }

	    this.text = function() {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    };

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      };
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    };

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;

	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      this.signal = input.signal;
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = String(input);
	    }

	    this.credentials = options.credentials || this.credentials || 'same-origin';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.signal = options.signal || this.signal;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, {body: this._bodyInit})
	  };

	  function decode(body) {
	    var form = new FormData();
	    body
	      .trim()
	      .split('&')
	      .forEach(function(bytes) {
	        if (bytes) {
	          var split = bytes.split('=');
	          var name = split.shift().replace(/\+/g, ' ');
	          var value = split.join('=').replace(/\+/g, ' ');
	          form.append(decodeURIComponent(name), decodeURIComponent(value));
	        }
	      });
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers();
	    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	    // https://tools.ietf.org/html/rfc7230#section-3.2
	    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
	    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        headers.append(key, value);
	      }
	    });
	    return headers
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status === undefined ? 200 : options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = 'statusText' in options ? options.statusText : 'OK';
	    this.headers = new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  };

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''});
	    response.type = 'error';
	    return response
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  };

	  exports.DOMException = self.DOMException;
	  try {
	    new exports.DOMException();
	  } catch (err) {
	    exports.DOMException = function(message, name) {
	      this.message = message;
	      this.name = name;
	      var error = Error(message);
	      this.stack = error.stack;
	    };
	    exports.DOMException.prototype = Object.create(Error.prototype);
	    exports.DOMException.prototype.constructor = exports.DOMException;
	  }

	  function fetch(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init);

	      if (request.signal && request.signal.aborted) {
	        return reject(new exports.DOMException('Aborted', 'AbortError'))
	      }

	      var xhr = new XMLHttpRequest();

	      function abortXhr() {
	        xhr.abort();
	      }

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        };
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.onabort = function() {
	        reject(new exports.DOMException('Aborted', 'AbortError'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      } else if (request.credentials === 'omit') {
	        xhr.withCredentials = false;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      if (request.signal) {
	        request.signal.addEventListener('abort', abortXhr);

	        xhr.onreadystatechange = function() {
	          // DONE (success or failure)
	          if (xhr.readyState === 4) {
	            request.signal.removeEventListener('abort', abortXhr);
	          }
	        };
	      }

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    })
	  }

	  fetch.polyfill = true;

	  if (!self.fetch) {
	    self.fetch = fetch;
	    self.Headers = Headers;
	    self.Request = Request;
	    self.Response = Response;
	  }

	  exports.Headers = Headers;
	  exports.Request = Request;
	  exports.Response = Response;
	  exports.fetch = fetch;

	  return exports;

	}({}));
	})(__self__);
	delete __self__.fetch.polyfill;
	exports = __self__.fetch; // To enable: import fetch from 'cross-fetch'
	exports.default = __self__.fetch; // For TypeScript consumers without esModuleInterop.
	exports.fetch = __self__.fetch; // To enable: import {fetch} from 'cross-fetch'
	exports.Headers = __self__.Headers;
	exports.Request = __self__.Request;
	exports.Response = __self__.Response;
	module.exports = exports;
	});
	var browserPonyfill_1 = browserPonyfill.fetch;
	var browserPonyfill_2 = browserPonyfill.Headers;
	var browserPonyfill_3 = browserPonyfill.Request;
	var browserPonyfill_4 = browserPonyfill.Response;

	var crypt = createCommonjsModule(function (module) {
	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },

	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();
	});

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	var charenc_1 = charenc;

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	var isBuffer_1 = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	};

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}

	var md5 = createCommonjsModule(function (module) {
	(function(){
	  var crypt$1 = crypt,
	      utf8 = charenc_1.utf8,
	      isBuffer = isBuffer_1,
	      bin = charenc_1.bin,

	  // The core
	  md5 = function (message, options) {
	    // Convert to byte array
	    if (message.constructor == String)
	      if (options && options.encoding === 'binary')
	        message = bin.stringToBytes(message);
	      else
	        message = utf8.stringToBytes(message);
	    else if (isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	    // else, assume byte array already

	    var m = crypt$1.bytesToWords(message),
	        l = message.length * 8,
	        a =  1732584193,
	        b = -271733879,
	        c = -1732584194,
	        d =  271733878;

	    // Swap endian
	    for (var i = 0; i < m.length; i++) {
	      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
	             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
	    }

	    // Padding
	    m[l >>> 5] |= 0x80 << (l % 32);
	    m[(((l + 64) >>> 9) << 4) + 14] = l;

	    // Method shortcuts
	    var FF = md5._ff,
	        GG = md5._gg,
	        HH = md5._hh,
	        II = md5._ii;

	    for (var i = 0; i < m.length; i += 16) {

	      var aa = a,
	          bb = b,
	          cc = c,
	          dd = d;

	      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
	      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
	      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
	      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
	      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
	      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
	      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
	      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
	      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
	      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
	      c = FF(c, d, a, b, m[i+10], 17, -42063);
	      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
	      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
	      d = FF(d, a, b, c, m[i+13], 12, -40341101);
	      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
	      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

	      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
	      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
	      c = GG(c, d, a, b, m[i+11], 14,  643717713);
	      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
	      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
	      d = GG(d, a, b, c, m[i+10],  9,  38016083);
	      c = GG(c, d, a, b, m[i+15], 14, -660478335);
	      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
	      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
	      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
	      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
	      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
	      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
	      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
	      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
	      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

	      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
	      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
	      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
	      b = HH(b, c, d, a, m[i+14], 23, -35309556);
	      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
	      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
	      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
	      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
	      a = HH(a, b, c, d, m[i+13],  4,  681279174);
	      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
	      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
	      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
	      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
	      d = HH(d, a, b, c, m[i+12], 11, -421815835);
	      c = HH(c, d, a, b, m[i+15], 16,  530742520);
	      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

	      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
	      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
	      c = II(c, d, a, b, m[i+14], 15, -1416354905);
	      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
	      a = II(a, b, c, d, m[i+12],  6,  1700485571);
	      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
	      c = II(c, d, a, b, m[i+10], 15, -1051523);
	      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
	      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
	      d = II(d, a, b, c, m[i+15], 10, -30611744);
	      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
	      b = II(b, c, d, a, m[i+13], 21,  1309151649);
	      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
	      d = II(d, a, b, c, m[i+11], 10, -1120210379);
	      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
	      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

	      a = (a + aa) >>> 0;
	      b = (b + bb) >>> 0;
	      c = (c + cc) >>> 0;
	      d = (d + dd) >>> 0;
	    }

	    return crypt$1.endian([a, b, c, d]);
	  };

	  // Auxiliary functions
	  md5._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };

	  // Package private blocksize
	  md5._blocksize = 16;
	  md5._digestsize = 16;

	  module.exports = function (message, options) {
	    if (message === undefined || message === null)
	      throw new Error('Illegal argument ' + message);

	    var digestbytes = crypt$1.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt$1.bytesToHex(digestbytes);
	  };

	})();
	});

	var SGN$5, Tracker, _dispatch, clientLocalStorage, dispatch, dispatchLimit, dispatching, fetch, getPool, md5$1, pool, ship;

	fetch = browserPonyfill;
	md5$1 = md5;
	SGN$5 = sgn;
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
	      dispatch();
	      return;
	    }

	    _createClass(Tracker, [{
	      key: "trackEvent",
	      value: function trackEvent(type) {
	        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
	        var evt, now;

	        if (typeof type !== 'number') {
	          throw SGN$5.util.error(new Error('Event type is required'));
	        }

	        if (this.trackId == null) {
	          return;
	        }

	        if (SGN$5.config.get('appKey') === this.trackId) {
	          // coffeelint: disable=max_line_length
	          throw SGN$5.util.error(new Error('Track identifier must not be identical to app key. Go to https://shopgun.com/developers/apps to get a track identifier for your app'));
	        }

	        now = new Date().getTime();
	        evt = Object.assign({}, properties, {
	          '_e': type,
	          '_v': version,
	          '_i': SGN$5.util.uuid(),
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

	        while (pool.length > this.poolLimit) {
	          pool.shift();
	        }

	        dispatch();
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
	      key: "trackIncitoPublicationOpened",
	      value: function trackIncitoPublicationOpened(properties, version) {
	        return this.trackEvent(8, properties, version);
	      }
	    }, {
	      key: "createViewToken",
	      value: function createViewToken() {
	        var str, viewToken;

	        for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
	          parts[_key] = arguments[_key];
	        }

	        str = [SGN$5.client.id].concat(parts).join('');
	        viewToken = SGN$5.util.btoa(String.fromCharCode.apply(null, md5$1(str, {
	          asBytes: true
	        }).slice(0, 8)));
	        return viewToken;
	      }
	    }]);

	    return Tracker;
	  }();

	  ;
	  Tracker.prototype.defaultOptions = {
	    trackId: null,
	    poolLimit: 1000
	  };
	  return Tracker;
	}.call(commonjsGlobal);

	dispatching = false;
	dispatchLimit = 100;

	ship = function ship() {
	  var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var req;
	  req = fetch(SGN$5.config.get('eventsTrackUrl'), {
	    method: 'post',
	    timeout: 1000 * 20,
	    headers: {
	      'Content-Type': 'application/json; charset=utf-8'
	    },
	    body: JSON.stringify({
	      events: events
	    })
	  });
	  return req.then(function (response) {
	    return response.json();
	  });
	};

	_dispatch = function _dispatch() {
	  var events, nacks;

	  if (dispatching === true || pool.length === 0) {
	    return;
	  }

	  events = pool.slice(0, dispatchLimit);
	  nacks = 0;
	  dispatching = true;
	  ship(events).then(function (response) {
	    dispatching = false;
	    response.events.forEach(function (resEvent) {
	      if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
	        pool = pool.filter(function (poolEvent) {
	          return poolEvent._i !== resEvent.id;
	        });
	      } else if ('nack') {
	        nacks++;
	      }
	    });

	    if (pool.length >= dispatchLimit && nacks === 0) {
	      // Keep dispatching until the pool size reaches a sane level.
	      dispatch();
	    }
	  }).catch(function (err) {
	    dispatching = false;
	    throw err;
	  });
	};

	dispatch = SGN$5.util.throttle(_dispatch, 4000);
	clientLocalStorage.set('event-tracker-pool', []);

	try {
	  window.addEventListener('beforeunload', function (e) {
	    pool = pool.concat(getPool());
	    clientLocalStorage.set('event-tracker-pool', pool);
	  }, false);
	} catch (error) {}

	var MicroEvent$1, Pulse;
	MicroEvent$1 = microevent;

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
	var events_1 = events.Tracker;
	var events_2 = events.Pulse;

	var SGN$6, fetch$1, parseCookies, promiseCallbackInterop, request;
	fetch$1 = browserPonyfill;
	SGN$6 = sgn;
	promiseCallbackInterop = util_1.promiseCallbackInterop;

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

	request = function request() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var callback = arguments.length > 1 ? arguments[1] : undefined;
	  var appKey, authToken, authTokenCookieName, timeout, url;
	  url = SGN$6.config.get('graphUrl');
	  timeout = 1000 * 12;
	  appKey = SGN$6.config.get('appKey');
	  authToken = SGN$6.config.get('authToken');
	  authTokenCookieName = 'shopgun-auth-token';
	  options = {
	    method: 'post',
	    timeout: timeout,
	    headers: {
	      'Content-Type': 'application/json; charset=utf-8'
	    },
	    body: JSON.stringify({
	      query: options.query,
	      operationName: options.operationName,
	      variables: options.variables
	    })
	  }; // Set cookies manually in node.js.

	  if (SGN$6.util.isNode() && authToken != null) {
	    options.cookies = [{
	      key: authTokenCookieName,
	      value: authToken,
	      url: url
	    }];
	  } else if (SGN$6.util.isBrowser()) {
	    options.credentials = 'include';
	  }

	  fetch$1(url, options).then(function (response) {
	    return response.json().then(function (json) {
	      var authCookie, cookies, ref; // Update auth token as it might have changed.

	      if (SGN$6.util.isNode()) {
	        cookies = parseCookies((ref = response.headers) != null ? ref['set-cookie'] : void 0);
	        authCookie = cookies[authTokenCookieName];

	        if (SGN$6.config.get('authToken') !== authCookie) {
	          SGN$6.config.set('authToken', authCookie);
	        }
	      }

	      if (response.status !== 200) {
	        return callback(SGN$6.util.error(new Error('Graph API error'), {
	          code: 'GraphAPIError',
	          statusCode: data.statusCode
	        }));
	      } else {
	        return callback(null, json);
	      }
	    });
	  }).catch(callback);
	};

	var request_1 = promiseCallbackInterop(request, 1);

	var graph = {
	  request: request_1
	};
	var graph_1 = graph.request;

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var es6_object_keys = {

	};

	var SGN$7, fetch$2, promiseCallbackInterop$1, _request;

	fetch$2 = browserPonyfill;
	SGN$7 = sgn;
	promiseCallbackInterop$1 = util_1.promiseCallbackInterop;

	_request = function request() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var callback = arguments.length > 1 ? arguments[1] : undefined;
	  var secondTime = arguments.length > 2 ? arguments[2] : undefined;
	  SGN$7.CoreKit.session.ensure(function (err) {
	    var appSecret, appVersion, body, geo, headers, json, locale, qs, ref, ref1, ref2, req, token, url;

	    if (err != null) {
	      return callback(err);
	    }

	    url = SGN$7.config.get('coreUrl') + ((ref = options.url) != null ? ref : '');
	    headers = (ref1 = options.headers) != null ? ref1 : {};
	    json = typeof options.json === 'boolean' ? options.json : true;
	    token = SGN$7.config.get('coreSessionToken');
	    appVersion = SGN$7.config.get('appVersion');
	    appSecret = SGN$7.config.get('appSecret');
	    locale = SGN$7.config.get('locale');
	    qs = (ref2 = options.qs) != null ? ref2 : {};
	    geo = options.geolocation;
	    body = options.body;
	    headers['X-Token'] = token;

	    if (appSecret != null) {
	      headers['X-Signature'] = SGN$7.CoreKit.session.sign(appSecret, token);
	    }

	    if (json) {
	      headers['Content-Type'] = 'application/json';
	      headers['Accept'] = 'application/json';

	      if (body) {
	        body = JSON.stringify(body);
	      }
	    }

	    if (locale != null) {
	      qs.r_locale = locale;
	    }

	    if (appVersion != null) {
	      qs.api_av = appVersion;
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

	    if (Object.keys(qs).length) {
	      url += '?' + Object.keys(qs).map(function (k) {
	        if (Array.isArray(k)) {
	          return qs[k].map(function (val) {
	            return "".concat(encodeURIComponent(k), "[]=").concat(encodeURIComponent(val));
	          }).join('&');
	        }

	        return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(qs[k]));
	      }).join('&');
	    }

	    req = fetch$2(url, {
	      method: options.method,
	      body: body,
	      headers: headers
	    });
	    return req.then(function (response) {
	      return response.json().then(function (json) {
	        var ref3, responseToken;
	        token = SGN$7.config.get('coreSessionToken');
	        responseToken = response.headers.get('x-token');

	        if (responseToken && token !== responseToken) {
	          SGN$7.CoreKit.session.saveToken(responseToken);
	        }

	        if (response.status >= 200 && response.status < 300 || response.status === 304) {
	          callback(null, json);
	        } else {
	          if (secondTime !== true && ((ref3 = json != null ? json.code : void 0) === 1101 || ref3 === 1107 || ref3 === 1108)) {
	            SGN$7.config.set({
	              coreSessionToken: void 0
	            });

	            _request(options, callback, true);
	          } else {
	            callback(SGN$7.util.error(new Error('Core API error'), {
	              code: 'CoreAPIError',
	              statusCode: response.status
	            }), json);
	          }
	        }
	      });
	    }).catch(callback);
	  });
	};

	var request_1$1 = promiseCallbackInterop$1(_request, 1);

	var convertHex = createCommonjsModule(function (module) {
	!function(globals) {
	'use strict';

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
	    if (hex.indexOf('0x') === 0) hex = hex.slice(2);
	    return hex.match(/../g).map(function(x) { return parseInt(x,16) })
	  }
	};


	// PRIVATE

	function arrBytesToHex(bytes) {
	  return bytes.map(function(x) { return padLeft(x.toString(16),2) }).join('')
	}

	function padLeft(orig, len) {
	  if (orig.length > len) return orig
	  return Array(len - orig.length + 1).join('0') + orig
	}


	if ('object' !== 'undefined' && module.exports) { //CommonJS
	  module.exports = convertHex;
	} else {
	  globals.convertHex = convertHex;
	}

	}(commonjsGlobal);
	});

	var convertString = createCommonjsModule(function (module) {
	!function(globals) {
	'use strict';

	var convertString = {
	  bytesToString: function(bytes) {
	    return bytes.map(function(x){ return String.fromCharCode(x) }).join('')
	  },
	  stringToBytes: function(str) {
	    return str.split('').map(function(x) { return x.charCodeAt(0) })
	  }
	};

	//http://hossa.in/2012/07/20/utf-8-in-javascript.html
	convertString.UTF8 = {
	   bytesToString: function(bytes) {
	    return decodeURIComponent(escape(convertString.bytesToString(bytes)))
	  },
	  stringToBytes: function(str) {
	   return convertString.stringToBytes(unescape(encodeURIComponent(str)))
	  }
	};

	if ('object' !== 'undefined' && module.exports) { //CommonJS
	  module.exports = convertString;
	} else {
	  globals.convertString = convertString;
	}

	}(commonjsGlobal);
	});

	var sha256 = createCommonjsModule(function (module) {
	!function(globals) {
	'use strict';

	var _imports = {};

	if ('object' !== 'undefined' && module.exports) { //CommonJS
	  _imports.bytesToHex = convertHex.bytesToHex;
	  _imports.convertString = convertString;
	  module.exports = sha256;
	} else {
	  _imports.bytesToHex = globals.convertHex.bytesToHex;
	  _imports.convertString = globals.convertString;
	  globals.sha256 = sha256;
	}

	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/

	// Initialization round constants tables
	var K = [];

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

	  var n = 2;
	  var nPrime = 0;
	  while (nPrime < 64) {
	    if (isPrime(n)) {
	      K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
	      nPrime++;
	    }

	    n++;
	  }
	}();

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes
	};

	// Reusable object
	var W = [];

	var processBlock = function (H, M, offset) {
	  // Working variables
	  var a = H[0], b = H[1], c = H[2], d = H[3];
	  var e = H[4], f = H[5], g = H[6], h = H[7];

	    // Computation
	  for (var i = 0; i < 64; i++) {
	    if (i < 16) {
	      W[i] = M[offset + i] | 0;
	    } else {
	      var gamma0x = W[i - 15];
	      var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                    ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                    (gamma0x >>> 3);

	      var gamma1x = W[i - 2];
	      var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                    ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                    (gamma1x >>> 10);

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
	};

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
	};

	}(commonjsGlobal);
	});

	var SGN$8, callbackQueue, clientCookieStorage, fetch$3, renewed, session, sha256$1;
	fetch$3 = browserPonyfill;
	sha256$1 = sha256;
	SGN$8 = sgn;
	clientCookieStorage = clientCookie;
	callbackQueue = [];
	renewed = false;
	session = {
	  ttl: 1 * 60 * 60 * 24 * 60,
	  saveToken: function saveToken(token) {
	    if (!token) {
	      throw new Error('No token provided for saving');
	    }

	    SGN$8.config.set({
	      coreSessionToken: token
	    });
	    session.saveCookie();
	  },
	  saveClientId: function saveClientId(clientId) {
	    SGN$8.config.set({
	      coreSessionClientId: clientId
	    });
	    session.saveCookie();
	  },
	  saveCookie: function saveCookie() {
	    clientCookieStorage.set('session', {
	      token: SGN$8.config.get('coreSessionToken'),
	      client_id: SGN$8.config.get('coreSessionClientId')
	    });
	  },
	  create: function create(callback) {
	    var key, req, ttl;
	    key = SGN$8.config.get('appKey');
	    ttl = session.ttl;
	    req = fetch$3(SGN$8.config.get('coreUrl') + "/v2/sessions?api_key=".concat(key, "&token_ttl=").concat(ttl), {
	      method: 'post'
	    });
	    req.then(function (response) {
	      return response.json().then(function (json) {
	        if (response.status === 201) {
	          session.saveToken(json.token);
	          session.saveClientId(json.client_id);
	          callback(null, json);
	        } else {
	          callback(new Error('Could not create session'));
	        }
	      });
	    }).catch(function (err) {
	      callback(err);
	    });
	  },
	  update: function update(callback) {
	    var appSecret, headers, req, token;
	    headers = {};
	    token = SGN$8.config.get('coreSessionToken');
	    appSecret = SGN$8.config.get('appSecret');
	    headers['X-Token'] = token;

	    if (appSecret != null) {
	      headers['X-Signature'] = session.sign(appSecret, token);
	    }

	    req = fetch$3(SGN$8.config.get('coreUrl') + '/v2/sessions', {
	      method: 'put',
	      headers: headers
	    });
	    req.then(function (response) {
	      return response.json().then(function (json) {
	        if (response.status === 200) {
	          session.saveToken(json.token);
	          session.saveClientId(json.client_id);
	          callback(null, json);
	        } else {
	          callback(new Error('Could not update session'));
	        }
	      });
	    }).catch(function (err) {
	      callback(err);
	    });
	  },
	  renew: function renew(callback) {
	    var appSecret, headers, req, token;
	    headers = {};
	    token = SGN$8.config.get('coreSessionToken');
	    appSecret = SGN$8.config.get('appSecret');
	    headers['X-Token'] = token;

	    if (appSecret) {
	      headers['X-Signature'] = session.sign(appSecret, token);
	    }

	    req = fetch$3(SGN$8.config.get('coreUrl') + '/v2/sessions', {
	      method: 'put',
	      headers: headers
	    });
	    req.then(function (response) {
	      return response.json().then(function (json) {
	        if (response.status === 200) {
	          session.saveToken(json.token);
	          session.saveClientId(json.client_id);
	          callback(null, json);
	        } else {
	          callback(new Error('Could not renew session'));
	        }
	      });
	    }).catch(function (err) {
	      callback(err);
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
	      if (SGN$8.config.get('coreSessionToken') == null) {
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

	var SGN$9, request$1, session$1;
	SGN$9 = sgn;
	request$1 = request_1$1;
	session$1 = session_1;
	var core$1 = {
	  request: request$1,
	  session: session$1
	};
	var core_1$1 = core$1.request;
	var core_2$1 = core$1.session;

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var SPECIES$3 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var es6_array_find = {

	};

	var verso = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
	  typeof undefined === 'function' && undefined.amd ? undefined(factory) :
	  (global = global || self, global.Verso = factory());
	}(commonjsGlobal, function () { 'use strict';

	  var _isObject = function (it) {
	    return typeof it === 'object' ? it !== null : typeof it === 'function';
	  };

	  var toString = {}.toString;

	  var _cof = function (it) {
	    return toString.call(it).slice(8, -1);
	  };

	  function createCommonjsModule(fn, module) {
	  	return module = { exports: {} }, fn(module, module.exports), module.exports;
	  }

	  var _core = createCommonjsModule(function (module) {
	  var core = module.exports = { version: '2.6.5' };
	  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	  });
	  var _core_1 = _core.version;

	  var _global = createCommonjsModule(function (module) {
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math
	    ? window : typeof self != 'undefined' && self.Math == Math ? self
	    // eslint-disable-next-line no-new-func
	    : Function('return this')();
	  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	  });

	  var _shared = createCommonjsModule(function (module) {
	  var SHARED = '__core-js_shared__';
	  var store = _global[SHARED] || (_global[SHARED] = {});

	  (module.exports = function (key, value) {
	    return store[key] || (store[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: _core.version,
	    mode: 'global',
	    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	  });
	  });

	  var id = 0;
	  var px = Math.random();
	  var _uid = function (key) {
	    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	  };

	  var _wks = createCommonjsModule(function (module) {
	  var store = _shared('wks');

	  var Symbol = _global.Symbol;
	  var USE_SYMBOL = typeof Symbol == 'function';

	  var $exports = module.exports = function (name) {
	    return store[name] || (store[name] =
	      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	  };

	  $exports.store = store;
	  });

	  // 7.2.8 IsRegExp(argument)


	  var MATCH = _wks('match');
	  var _isRegexp = function (it) {
	    var isRegExp;
	    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	  };

	  var _anObject = function (it) {
	    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	    return it;
	  };

	  var _aFunction = function (it) {
	    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	    return it;
	  };

	  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


	  var SPECIES = _wks('species');
	  var _speciesConstructor = function (O, D) {
	    var C = _anObject(O).constructor;
	    var S;
	    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
	  };

	  // 7.1.4 ToInteger
	  var ceil = Math.ceil;
	  var floor = Math.floor;
	  var _toInteger = function (it) {
	    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	  };

	  // 7.2.1 RequireObjectCoercible(argument)
	  var _defined = function (it) {
	    if (it == undefined) throw TypeError("Can't call method on  " + it);
	    return it;
	  };

	  // true  -> String#at
	  // false -> String#codePointAt
	  var _stringAt = function (TO_STRING) {
	    return function (that, pos) {
	      var s = String(_defined(that));
	      var i = _toInteger(pos);
	      var l = s.length;
	      var a, b;
	      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	      a = s.charCodeAt(i);
	      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	    };
	  };

	  var at = _stringAt(true);

	   // `AdvanceStringIndex` abstract operation
	  // https://tc39.github.io/ecma262/#sec-advancestringindex
	  var _advanceStringIndex = function (S, index, unicode) {
	    return index + (unicode ? at(S, index).length : 1);
	  };

	  // 7.1.15 ToLength

	  var min = Math.min;
	  var _toLength = function (it) {
	    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  };

	  // getting tag from 19.1.3.6 Object.prototype.toString()

	  var TAG = _wks('toStringTag');
	  // ES3 wrong here
	  var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	  // fallback for IE11 Script Access Denied error
	  var tryGet = function (it, key) {
	    try {
	      return it[key];
	    } catch (e) { /* empty */ }
	  };

	  var _classof = function (it) {
	    var O, T, B;
	    return it === undefined ? 'Undefined' : it === null ? 'Null'
	      // @@toStringTag case
	      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	      // builtinTag case
	      : ARG ? _cof(O)
	      // ES3 arguments fallback
	      : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	  };

	  var builtinExec = RegExp.prototype.exec;

	   // `RegExpExec` abstract operation
	  // https://tc39.github.io/ecma262/#sec-regexpexec
	  var _regexpExecAbstract = function (R, S) {
	    var exec = R.exec;
	    if (typeof exec === 'function') {
	      var result = exec.call(R, S);
	      if (typeof result !== 'object') {
	        throw new TypeError('RegExp exec method returned something other than an Object or null');
	      }
	      return result;
	    }
	    if (_classof(R) !== 'RegExp') {
	      throw new TypeError('RegExp#exec called on incompatible receiver');
	    }
	    return builtinExec.call(R, S);
	  };

	  // 21.2.5.3 get RegExp.prototype.flags

	  var _flags = function () {
	    var that = _anObject(this);
	    var result = '';
	    if (that.global) result += 'g';
	    if (that.ignoreCase) result += 'i';
	    if (that.multiline) result += 'm';
	    if (that.unicode) result += 'u';
	    if (that.sticky) result += 'y';
	    return result;
	  };

	  var nativeExec = RegExp.prototype.exec;
	  // This always refers to the native implementation, because the
	  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	  // which loads this file before patching the method.
	  var nativeReplace = String.prototype.replace;

	  var patchedExec = nativeExec;

	  var LAST_INDEX = 'lastIndex';

	  var UPDATES_LAST_INDEX_WRONG = (function () {
	    var re1 = /a/,
	        re2 = /b*/g;
	    nativeExec.call(re1, 'a');
	    nativeExec.call(re2, 'a');
	    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	  })();

	  // nonparticipating capturing group, copied from es5-shim's String#split patch.
	  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	  if (PATCH) {
	    patchedExec = function exec(str) {
	      var re = this;
	      var lastIndex, reCopy, match, i;

	      if (NPCG_INCLUDED) {
	        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	      }
	      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	      match = nativeExec.call(re, str);

	      if (UPDATES_LAST_INDEX_WRONG && match) {
	        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	      }
	      if (NPCG_INCLUDED && match && match.length > 1) {
	        // Fix browsers whose `exec` methods don't consistently return `undefined`
	        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	        // eslint-disable-next-line no-loop-func
	        nativeReplace.call(match[0], reCopy, function () {
	          for (i = 1; i < arguments.length - 2; i++) {
	            if (arguments[i] === undefined) match[i] = undefined;
	          }
	        });
	      }

	      return match;
	    };
	  }

	  var _regexpExec = patchedExec;

	  var _fails = function (exec) {
	    try {
	      return !!exec();
	    } catch (e) {
	      return true;
	    }
	  };

	  // Thank's IE8 for his funny defineProperty
	  var _descriptors = !_fails(function () {
	    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	  });

	  var document$1 = _global.document;
	  // typeof document.createElement is 'object' in old IE
	  var is = _isObject(document$1) && _isObject(document$1.createElement);
	  var _domCreate = function (it) {
	    return is ? document$1.createElement(it) : {};
	  };

	  var _ie8DomDefine = !_descriptors && !_fails(function () {
	    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	  });

	  // 7.1.1 ToPrimitive(input [, PreferredType])

	  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
	  // and the second argument - flag - preferred type is a string
	  var _toPrimitive = function (it, S) {
	    if (!_isObject(it)) return it;
	    var fn, val;
	    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	    throw TypeError("Can't convert object to primitive value");
	  };

	  var dP = Object.defineProperty;

	  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	    _anObject(O);
	    P = _toPrimitive(P, true);
	    _anObject(Attributes);
	    if (_ie8DomDefine) try {
	      return dP(O, P, Attributes);
	    } catch (e) { /* empty */ }
	    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	    if ('value' in Attributes) O[P] = Attributes.value;
	    return O;
	  };

	  var _objectDp = {
	  	f: f
	  };

	  var _propertyDesc = function (bitmap, value) {
	    return {
	      enumerable: !(bitmap & 1),
	      configurable: !(bitmap & 2),
	      writable: !(bitmap & 4),
	      value: value
	    };
	  };

	  var _hide = _descriptors ? function (object, key, value) {
	    return _objectDp.f(object, key, _propertyDesc(1, value));
	  } : function (object, key, value) {
	    object[key] = value;
	    return object;
	  };

	  var hasOwnProperty = {}.hasOwnProperty;
	  var _has = function (it, key) {
	    return hasOwnProperty.call(it, key);
	  };

	  var _functionToString = _shared('native-function-to-string', Function.toString);

	  var _redefine = createCommonjsModule(function (module) {
	  var SRC = _uid('src');

	  var TO_STRING = 'toString';
	  var TPL = ('' + _functionToString).split(TO_STRING);

	  _core.inspectSource = function (it) {
	    return _functionToString.call(it);
	  };

	  (module.exports = function (O, key, val, safe) {
	    var isFunction = typeof val == 'function';
	    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	    if (O[key] === val) return;
	    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    if (O === _global) {
	      O[key] = val;
	    } else if (!safe) {
	      delete O[key];
	      _hide(O, key, val);
	    } else if (O[key]) {
	      O[key] = val;
	    } else {
	      _hide(O, key, val);
	    }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, TO_STRING, function toString() {
	    return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	  });
	  });

	  // optional / simple context binding

	  var _ctx = function (fn, that, length) {
	    _aFunction(fn);
	    if (that === undefined) return fn;
	    switch (length) {
	      case 1: return function (a) {
	        return fn.call(that, a);
	      };
	      case 2: return function (a, b) {
	        return fn.call(that, a, b);
	      };
	      case 3: return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	    }
	    return function (/* ...args */) {
	      return fn.apply(that, arguments);
	    };
	  };

	  var PROTOTYPE = 'prototype';

	  var $export = function (type, name, source) {
	    var IS_FORCED = type & $export.F;
	    var IS_GLOBAL = type & $export.G;
	    var IS_STATIC = type & $export.S;
	    var IS_PROTO = type & $export.P;
	    var IS_BIND = type & $export.B;
	    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	    var key, own, out, exp;
	    if (IS_GLOBAL) source = name;
	    for (key in source) {
	      // contains in native
	      own = !IS_FORCED && target && target[key] !== undefined;
	      // export native or passed
	      out = (own ? target : source)[key];
	      // bind timers to global for call from export context
	      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	      // extend global
	      if (target) _redefine(target, key, out, type & $export.U);
	      // export
	      if (exports[key] != out) _hide(exports, key, exp);
	      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	    }
	  };
	  _global.core = _core;
	  // type bitmap
	  $export.F = 1;   // forced
	  $export.G = 2;   // global
	  $export.S = 4;   // static
	  $export.P = 8;   // proto
	  $export.B = 16;  // bind
	  $export.W = 32;  // wrap
	  $export.U = 64;  // safe
	  $export.R = 128; // real proto method for `library`
	  var _export = $export;

	  _export({
	    target: 'RegExp',
	    proto: true,
	    forced: _regexpExec !== /./.exec
	  }, {
	    exec: _regexpExec
	  });

	  var SPECIES$1 = _wks('species');

	  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	    // #replace needs built-in support for named groups.
	    // #match works fine because it just return the exec results, even if it has
	    // a "grops" property.
	    var re = /./;
	    re.exec = function () {
	      var result = [];
	      result.groups = { a: '7' };
	      return result;
	    };
	    return ''.replace(re, '$<a>') !== '7';
	  });

	  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	    var re = /(?:)/;
	    var originalExec = re.exec;
	    re.exec = function () { return originalExec.apply(this, arguments); };
	    var result = 'ab'.split(re);
	    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	  })();

	  var _fixReWks = function (KEY, length, exec) {
	    var SYMBOL = _wks(KEY);

	    var DELEGATES_TO_SYMBOL = !_fails(function () {
	      // String methods call symbol-named RegEp methods
	      var O = {};
	      O[SYMBOL] = function () { return 7; };
	      return ''[KEY](O) != 7;
	    });

	    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	      // Symbol-named RegExp methods call .exec
	      var execCalled = false;
	      var re = /a/;
	      re.exec = function () { execCalled = true; return null; };
	      if (KEY === 'split') {
	        // RegExp[@@split] doesn't call the regex's exec method, but first creates
	        // a new one. We need to return the patched regex when creating the new one.
	        re.constructor = {};
	        re.constructor[SPECIES$1] = function () { return re; };
	      }
	      re[SYMBOL]('');
	      return !execCalled;
	    }) : undefined;

	    if (
	      !DELEGATES_TO_SYMBOL ||
	      !DELEGATES_TO_EXEC ||
	      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	    ) {
	      var nativeRegExpMethod = /./[SYMBOL];
	      var fns = exec(
	        _defined,
	        SYMBOL,
	        ''[KEY],
	        function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	          if (regexp.exec === _regexpExec) {
	            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	              // The native String method already delegates to @@method (this
	              // polyfilled function), leasing to infinite recursion.
	              // We avoid it by directly calling the native @@method method.
	              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	            }
	            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	          }
	          return { done: false };
	        }
	      );
	      var strfn = fns[0];
	      var rxfn = fns[1];

	      _redefine(String.prototype, KEY, strfn);
	      _hide(RegExp.prototype, SYMBOL, length == 2
	        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	        ? function (string, arg) { return rxfn.call(string, this, arg); }
	        // 21.2.5.6 RegExp.prototype[@@match](string)
	        // 21.2.5.9 RegExp.prototype[@@search](string)
	        : function (string) { return rxfn.call(string, this); }
	      );
	    }
	  };

	  var $min = Math.min;
	  var $push = [].push;
	  var $SPLIT = 'split';
	  var LENGTH = 'length';
	  var LAST_INDEX$1 = 'lastIndex';
	  var MAX_UINT32 = 0xffffffff;

	  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	  var SUPPORTS_Y = !_fails(function () { });

	  // @@split logic
	  _fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	    var internalSplit;
	    if (
	      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	      'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	      'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	      '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	      '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	      ''[$SPLIT](/.?/)[LENGTH]
	    ) {
	      // based on es5-shim implementation, need to rework it
	      internalSplit = function (separator, limit) {
	        var string = String(this);
	        if (separator === undefined && limit === 0) return [];
	        // If `separator` is not a regex, use native split
	        if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	        var output = [];
	        var flags = (separator.ignoreCase ? 'i' : '') +
	                    (separator.multiline ? 'm' : '') +
	                    (separator.unicode ? 'u' : '') +
	                    (separator.sticky ? 'y' : '');
	        var lastLastIndex = 0;
	        var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	        // Make `global` and avoid `lastIndex` issues by working with a copy
	        var separatorCopy = new RegExp(separator.source, flags + 'g');
	        var match, lastIndex, lastLength;
	        while (match = _regexpExec.call(separatorCopy, string)) {
	          lastIndex = separatorCopy[LAST_INDEX$1];
	          if (lastIndex > lastLastIndex) {
	            output.push(string.slice(lastLastIndex, match.index));
	            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	            lastLength = match[0][LENGTH];
	            lastLastIndex = lastIndex;
	            if (output[LENGTH] >= splitLimit) break;
	          }
	          if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	        }
	        if (lastLastIndex === string[LENGTH]) {
	          if (lastLength || !separatorCopy.test('')) output.push('');
	        } else output.push(string.slice(lastLastIndex));
	        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	      };
	    // Chakra, V8
	    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	      internalSplit = function (separator, limit) {
	        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	      };
	    } else {
	      internalSplit = $split;
	    }

	    return [
	      // `String.prototype.split` method
	      // https://tc39.github.io/ecma262/#sec-string.prototype.split
	      function split(separator, limit) {
	        var O = defined(this);
	        var splitter = separator == undefined ? undefined : separator[SPLIT];
	        return splitter !== undefined
	          ? splitter.call(separator, O, limit)
	          : internalSplit.call(String(O), separator, limit);
	      },
	      // `RegExp.prototype[@@split]` method
	      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	      //
	      // NOTE: This cannot be properly polyfilled in engines that don't support
	      // the 'y' flag.
	      function (regexp, limit) {
	        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	        if (res.done) return res.value;

	        var rx = _anObject(regexp);
	        var S = String(this);
	        var C = _speciesConstructor(rx, RegExp);

	        var unicodeMatching = rx.unicode;
	        var flags = (rx.ignoreCase ? 'i' : '') +
	                    (rx.multiline ? 'm' : '') +
	                    (rx.unicode ? 'u' : '') +
	                    (SUPPORTS_Y ? 'y' : 'g');

	        // ^(? + rx + ) is needed, in combination with some S slicing, to
	        // simulate the 'y' flag.
	        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	        if (lim === 0) return [];
	        if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	        var p = 0;
	        var q = 0;
	        var A = [];
	        while (q < S.length) {
	          splitter.lastIndex = SUPPORTS_Y ? q : 0;
	          var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	          var e;
	          if (
	            z === null ||
	            (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	          ) {
	            q = _advanceStringIndex(S, q, unicodeMatching);
	          } else {
	            A.push(S.slice(p, q));
	            if (A.length === lim) return A;
	            for (var i = 1; i <= z.length - 1; i++) {
	              A.push(z[i]);
	              if (A.length === lim) return A;
	            }
	            q = p = e;
	          }
	        }
	        A.push(S.slice(p));
	        return A;
	      }
	    ];
	  });

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

	  function _slicedToArray(arr, i) {
	    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	  }

	  function _arrayWithHoles(arr) {
	    if (Array.isArray(arr)) return arr;
	  }

	  function _iterableToArrayLimit(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"] != null) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  function _nonIterableRest() {
	    throw new TypeError("Invalid attempt to destructure non-iterable instance");
	  }

	  // 22.1.3.31 Array.prototype[@@unscopables]
	  var UNSCOPABLES = _wks('unscopables');
	  var ArrayProto = Array.prototype;
	  if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	  var _addToUnscopables = function (key) {
	    ArrayProto[UNSCOPABLES][key] = true;
	  };

	  var _iterStep = function (done, value) {
	    return { value: value, done: !!done };
	  };

	  var _iterators = {};

	  // fallback for non-array-like ES3 and non-enumerable old V8 strings

	  // eslint-disable-next-line no-prototype-builtins
	  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	    return _cof(it) == 'String' ? it.split('') : Object(it);
	  };

	  // to indexed object, toObject with fallback for non-array-like ES3 strings


	  var _toIobject = function (it) {
	    return _iobject(_defined(it));
	  };

	  var max = Math.max;
	  var min$1 = Math.min;
	  var _toAbsoluteIndex = function (index, length) {
	    index = _toInteger(index);
	    return index < 0 ? max(index + length, 0) : min$1(index, length);
	  };

	  // false -> Array#indexOf
	  // true  -> Array#includes



	  var _arrayIncludes = function (IS_INCLUDES) {
	    return function ($this, el, fromIndex) {
	      var O = _toIobject($this);
	      var length = _toLength(O.length);
	      var index = _toAbsoluteIndex(fromIndex, length);
	      var value;
	      // Array#includes uses SameValueZero equality algorithm
	      // eslint-disable-next-line no-self-compare
	      if (IS_INCLUDES && el != el) while (length > index) {
	        value = O[index++];
	        // eslint-disable-next-line no-self-compare
	        if (value != value) return true;
	      // Array#indexOf ignores holes, Array#includes - not
	      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      } return !IS_INCLUDES && -1;
	    };
	  };

	  var shared = _shared('keys');

	  var _sharedKey = function (key) {
	    return shared[key] || (shared[key] = _uid(key));
	  };

	  var arrayIndexOf = _arrayIncludes(false);
	  var IE_PROTO = _sharedKey('IE_PROTO');

	  var _objectKeysInternal = function (object, names) {
	    var O = _toIobject(object);
	    var i = 0;
	    var result = [];
	    var key;
	    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while (names.length > i) if (_has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	    return result;
	  };

	  // IE 8- don't enum bug keys
	  var _enumBugKeys = (
	    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	  ).split(',');

	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



	  var _objectKeys = Object.keys || function keys(O) {
	    return _objectKeysInternal(O, _enumBugKeys);
	  };

	  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	    _anObject(O);
	    var keys = _objectKeys(Properties);
	    var length = keys.length;
	    var i = 0;
	    var P;
	    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	    return O;
	  };

	  var document$2 = _global.document;
	  var _html = document$2 && document$2.documentElement;

	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	  var IE_PROTO$1 = _sharedKey('IE_PROTO');
	  var Empty = function () { /* empty */ };
	  var PROTOTYPE$1 = 'prototype';

	  // Create object with fake `null` prototype: use iframe Object with cleared prototype
	  var createDict = function () {
	    // Thrash, waste and sodomy: IE GC bug
	    var iframe = _domCreate('iframe');
	    var i = _enumBugKeys.length;
	    var lt = '<';
	    var gt = '>';
	    var iframeDocument;
	    iframe.style.display = 'none';
	    _html.appendChild(iframe);
	    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	    // createDict = iframe.contentWindow.Object;
	    // html.removeChild(iframe);
	    iframeDocument = iframe.contentWindow.document;
	    iframeDocument.open();
	    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	    iframeDocument.close();
	    createDict = iframeDocument.F;
	    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	    return createDict();
	  };

	  var _objectCreate = Object.create || function create(O, Properties) {
	    var result;
	    if (O !== null) {
	      Empty[PROTOTYPE$1] = _anObject(O);
	      result = new Empty();
	      Empty[PROTOTYPE$1] = null;
	      // add "__proto__" for Object.getPrototypeOf polyfill
	      result[IE_PROTO$1] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : _objectDps(result, Properties);
	  };

	  var def = _objectDp.f;

	  var TAG$1 = _wks('toStringTag');

	  var _setToStringTag = function (it, tag, stat) {
	    if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
	  };

	  var IteratorPrototype = {};

	  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	  _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	  var _iterCreate = function (Constructor, NAME, next) {
	    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	    _setToStringTag(Constructor, NAME + ' Iterator');
	  };

	  // 7.1.13 ToObject(argument)

	  var _toObject = function (it) {
	    return Object(_defined(it));
	  };

	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	  var IE_PROTO$2 = _sharedKey('IE_PROTO');
	  var ObjectProto = Object.prototype;

	  var _objectGpo = Object.getPrototypeOf || function (O) {
	    O = _toObject(O);
	    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  };

	  var ITERATOR = _wks('iterator');
	  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	  var FF_ITERATOR = '@@iterator';
	  var KEYS = 'keys';
	  var VALUES = 'values';

	  var returnThis = function () { return this; };

	  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	    _iterCreate(Constructor, NAME, next);
	    var getMethod = function (kind) {
	      if (!BUGGY && kind in proto) return proto[kind];
	      switch (kind) {
	        case KEYS: return function keys() { return new Constructor(this, kind); };
	        case VALUES: return function values() { return new Constructor(this, kind); };
	      } return function entries() { return new Constructor(this, kind); };
	    };
	    var TAG = NAME + ' Iterator';
	    var DEF_VALUES = DEFAULT == VALUES;
	    var VALUES_BUG = false;
	    var proto = Base.prototype;
	    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	    var $default = $native || getMethod(DEFAULT);
	    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	    var methods, key, IteratorPrototype;
	    // Fix native
	    if ($anyNative) {
	      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	        // Set @@toStringTag to native iterators
	        _setToStringTag(IteratorPrototype, TAG, true);
	        // fix for some old engines
	        if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	      }
	    }
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if (DEF_VALUES && $native && $native.name !== VALUES) {
	      VALUES_BUG = true;
	      $default = function values() { return $native.call(this); };
	    }
	    // Define iterator
	    if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
	      _hide(proto, ITERATOR, $default);
	    }
	    // Plug for library
	    _iterators[NAME] = $default;
	    _iterators[TAG] = returnThis;
	    if (DEFAULT) {
	      methods = {
	        values: DEF_VALUES ? $default : getMethod(VALUES),
	        keys: IS_SET ? $default : getMethod(KEYS),
	        entries: $entries
	      };
	      if (FORCED) for (key in methods) {
	        if (!(key in proto)) _redefine(proto, key, methods[key]);
	      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	    }
	    return methods;
	  };

	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	    this._t = _toIobject(iterated); // target
	    this._i = 0;                   // next index
	    this._k = kind;                // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function () {
	    var O = this._t;
	    var kind = this._k;
	    var index = this._i++;
	    if (!O || index >= O.length) {
	      this._t = undefined;
	      return _iterStep(1);
	    }
	    if (kind == 'keys') return _iterStep(0, index);
	    if (kind == 'values') return _iterStep(0, O[index]);
	    return _iterStep(0, [index, O[index]]);
	  }, 'values');

	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  _iterators.Arguments = _iterators.Array;

	  _addToUnscopables('keys');
	  _addToUnscopables('values');
	  _addToUnscopables('entries');

	  var ITERATOR$1 = _wks('iterator');
	  var TO_STRING_TAG = _wks('toStringTag');
	  var ArrayValues = _iterators.Array;

	  var DOMIterables = {
	    CSSRuleList: true, // TODO: Not spec compliant, should be false.
	    CSSStyleDeclaration: false,
	    CSSValueList: false,
	    ClientRectList: false,
	    DOMRectList: false,
	    DOMStringList: false,
	    DOMTokenList: true,
	    DataTransferItemList: false,
	    FileList: false,
	    HTMLAllCollection: false,
	    HTMLCollection: false,
	    HTMLFormElement: false,
	    HTMLSelectElement: false,
	    MediaList: true, // TODO: Not spec compliant, should be false.
	    MimeTypeArray: false,
	    NamedNodeMap: false,
	    NodeList: true,
	    PaintRequestList: false,
	    Plugin: false,
	    PluginArray: false,
	    SVGLengthList: false,
	    SVGNumberList: false,
	    SVGPathSegList: false,
	    SVGPointList: false,
	    SVGStringList: false,
	    SVGTransformList: false,
	    SourceBufferList: false,
	    StyleSheetList: true, // TODO: Not spec compliant, should be false.
	    TextTrackCueList: false,
	    TextTrackList: false,
	    TouchList: false
	  };

	  for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	    var NAME = collections[i];
	    var explicit = DOMIterables[NAME];
	    var Collection = _global[NAME];
	    var proto = Collection && Collection.prototype;
	    var key;
	    if (proto) {
	      if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	      if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	      _iterators[NAME] = ArrayValues;
	      if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	    }
	  }

	  // 19.1.3.6 Object.prototype.toString()

	  var test = {};
	  test[_wks('toStringTag')] = 'z';
	  if (test + '' != '[object z]') {
	    _redefine(Object.prototype, 'toString', function toString() {
	      return '[object ' + _classof(this) + ']';
	    }, true);
	  }

	  var f$1 = {}.propertyIsEnumerable;

	  var _objectPie = {
	  	f: f$1
	  };

	  var isEnum = _objectPie.f;
	  var _objectToArray = function (isEntries) {
	    return function (it) {
	      var O = _toIobject(it);
	      var keys = _objectKeys(O);
	      var length = keys.length;
	      var i = 0;
	      var result = [];
	      var key;
	      while (length > i) if (isEnum.call(O, key = keys[i++])) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      } return result;
	    };
	  };

	  // https://github.com/tc39/proposal-object-values-entries

	  var $entries = _objectToArray(true);

	  _export(_export.S, 'Object', {
	    entries: function entries(it) {
	      return $entries(it);
	    }
	  });

	  // 7.2.2 IsArray(argument)

	  var _isArray = Array.isArray || function isArray(arg) {
	    return _cof(arg) == 'Array';
	  };

	  var SPECIES$2 = _wks('species');

	  var _arraySpeciesConstructor = function (original) {
	    var C;
	    if (_isArray(original)) {
	      C = original.constructor;
	      // cross-realm fallback
	      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	      if (_isObject(C)) {
	        C = C[SPECIES$2];
	        if (C === null) C = undefined;
	      }
	    } return C === undefined ? Array : C;
	  };

	  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	  var _arraySpeciesCreate = function (original, length) {
	    return new (_arraySpeciesConstructor(original))(length);
	  };

	  // 0 -> Array#forEach
	  // 1 -> Array#map
	  // 2 -> Array#filter
	  // 3 -> Array#some
	  // 4 -> Array#every
	  // 5 -> Array#find
	  // 6 -> Array#findIndex





	  var _arrayMethods = function (TYPE, $create) {
	    var IS_MAP = TYPE == 1;
	    var IS_FILTER = TYPE == 2;
	    var IS_SOME = TYPE == 3;
	    var IS_EVERY = TYPE == 4;
	    var IS_FIND_INDEX = TYPE == 6;
	    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	    var create = $create || _arraySpeciesCreate;
	    return function ($this, callbackfn, that) {
	      var O = _toObject($this);
	      var self = _iobject(O);
	      var f = _ctx(callbackfn, that, 3);
	      var length = _toLength(self.length);
	      var index = 0;
	      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	      var val, res;
	      for (;length > index; index++) if (NO_HOLES || index in self) {
	        val = self[index];
	        res = f(val, index, O);
	        if (TYPE) {
	          if (IS_MAP) result[index] = res;   // map
	          else if (res) switch (TYPE) {
	            case 3: return true;             // some
	            case 5: return val;              // find
	            case 6: return index;            // findIndex
	            case 2: result.push(val);        // filter
	          } else if (IS_EVERY) return false; // every
	        }
	      }
	      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	    };
	  };

	  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	  var $find = _arrayMethods(6);
	  var KEY = 'findIndex';
	  var forced = true;
	  // Shouldn't skip holes
	  if (KEY in []) Array(1)[KEY](function () { forced = false; });
	  _export(_export.P + _export.F * forced, 'Array', {
	    findIndex: function findIndex(callbackfn /* , that = undefined */) {
	      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	  _addToUnscopables(KEY);

	  var max$1 = Math.max;
	  var min$2 = Math.min;
	  var floor$1 = Math.floor;
	  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	  var maybeToString = function (it) {
	    return it === undefined ? it : String(it);
	  };

	  // @@replace logic
	  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	    return [
	      // `String.prototype.replace` method
	      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	      function replace(searchValue, replaceValue) {
	        var O = defined(this);
	        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	        return fn !== undefined
	          ? fn.call(searchValue, O, replaceValue)
	          : $replace.call(String(O), searchValue, replaceValue);
	      },
	      // `RegExp.prototype[@@replace]` method
	      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	      function (regexp, replaceValue) {
	        var res = maybeCallNative($replace, regexp, this, replaceValue);
	        if (res.done) return res.value;

	        var rx = _anObject(regexp);
	        var S = String(this);
	        var functionalReplace = typeof replaceValue === 'function';
	        if (!functionalReplace) replaceValue = String(replaceValue);
	        var global = rx.global;
	        if (global) {
	          var fullUnicode = rx.unicode;
	          rx.lastIndex = 0;
	        }
	        var results = [];
	        while (true) {
	          var result = _regexpExecAbstract(rx, S);
	          if (result === null) break;
	          results.push(result);
	          if (!global) break;
	          var matchStr = String(result[0]);
	          if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        }
	        var accumulatedResult = '';
	        var nextSourcePosition = 0;
	        for (var i = 0; i < results.length; i++) {
	          result = results[i];
	          var matched = String(result[0]);
	          var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	          var captures = [];
	          // NOTE: This is equivalent to
	          //   captures = result.slice(1).map(maybeToString)
	          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	          var namedCaptures = result.groups;
	          if (functionalReplace) {
	            var replacerArgs = [matched].concat(captures, position, S);
	            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	            var replacement = String(replaceValue.apply(undefined, replacerArgs));
	          } else {
	            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	          }
	          if (position >= nextSourcePosition) {
	            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	            nextSourcePosition = position + matched.length;
	          }
	        }
	        return accumulatedResult + S.slice(nextSourcePosition);
	      }
	    ];

	      // https://tc39.github.io/ecma262/#sec-getsubstitution
	    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	      var tailPos = position + matched.length;
	      var m = captures.length;
	      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	      if (namedCaptures !== undefined) {
	        namedCaptures = _toObject(namedCaptures);
	        symbols = SUBSTITUTION_SYMBOLS;
	      }
	      return $replace.call(replacement, symbols, function (match, ch) {
	        var capture;
	        switch (ch.charAt(0)) {
	          case '$': return '$';
	          case '&': return matched;
	          case '`': return str.slice(0, position);
	          case "'": return str.slice(tailPos);
	          case '<':
	            capture = namedCaptures[ch.slice(1, -1)];
	            break;
	          default: // \d\d?
	            var n = +ch;
	            if (n === 0) return match;
	            if (n > m) {
	              var f = floor$1(n / 10);
	              if (f === 0) return match;
	              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	              return match;
	            }
	            capture = captures[n - 1];
	        }
	        return capture === undefined ? '' : capture;
	      });
	    }
	  });

	  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	  var $find$1 = _arrayMethods(5);
	  var KEY$1 = 'find';
	  var forced$1 = true;
	  // Shouldn't skip holes
	  if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	  _export(_export.P + _export.F * forced$1, 'Array', {
	    find: function find(callbackfn /* , that = undefined */) {
	      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    }
	  });
	  _addToUnscopables(KEY$1);

	  var _strictMethod = function (method, arg) {
	    return !!method && _fails(function () {
	      // eslint-disable-next-line no-useless-call
	      arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	    });
	  };

	  var $sort = [].sort;
	  var test$1 = [1, 2, 3];

	  _export(_export.P + _export.F * (_fails(function () {
	    // IE8-
	    test$1.sort(undefined);
	  }) || !_fails(function () {
	    // V8 bug
	    test$1.sort(null);
	    // Old WebKit
	  }) || !_strictMethod($sort)), 'Array', {
	    // 22.1.3.25 Array.prototype.sort(comparefn)
	    sort: function sort(comparefn) {
	      return comparefn === undefined
	        ? $sort.call(_toObject(this))
	        : $sort.call(_toObject(this), _aFunction(comparefn));
	    }
	  });

	  var f$2 = Object.getOwnPropertySymbols;

	  var _objectGops = {
	  	f: f$2
	  };

	  // 19.1.2.1 Object.assign(target, source, ...)





	  var $assign = Object.assign;

	  // should work with symbols and should have deterministic property order (V8 bug)
	  var _objectAssign = !$assign || _fails(function () {
	    var A = {};
	    var B = {};
	    // eslint-disable-next-line no-undef
	    var S = Symbol();
	    var K = 'abcdefghijklmnopqrst';
	    A[S] = 7;
	    K.split('').forEach(function (k) { B[k] = k; });
	    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	    var T = _toObject(target);
	    var aLen = arguments.length;
	    var index = 1;
	    var getSymbols = _objectGops.f;
	    var isEnum = _objectPie.f;
	    while (aLen > index) {
	      var S = _iobject(arguments[index++]);
	      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	      var length = keys.length;
	      var j = 0;
	      var key;
	      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    } return T;
	  } : $assign;

	  // 19.1.3.1 Object.assign(target, source)


	  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	  /*! Hammer.JS - v2.0.7 - 2016-04-22
	   * http://hammerjs.github.io/
	   *
	   * Copyright (c) 2016 Jorik Tangelder;
	   * Licensed under the MIT license */
	  var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];

	  var TEST_ELEMENT = function TEST_ELEMENT() {
	    return document.createElement('div');
	  };

	  var TYPE_FUNCTION = 'function';
	  var round = Math.round;
	  var abs = Math.abs;
	  var now = Date.now;
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
	    if (!obj) return;

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
	    if (properties) Object.assign(childP, properties);
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
	    return val1 === undefined ? val2 : val1;
	  }
	  /**
	   * addEventListener with multiple events at once
	   * @param {EventTarget} target
	   * @param {String} types
	   * @param {Function} handler
	   */


	  function addEventListeners(target, types, handler) {
	    splitStr(types).forEach(function (type) {
	      return target.addEventListener(type, handler, false);
	    });
	  }
	  /**
	   * removeEventListener with multiple events at once
	   * @param {EventTarget} target
	   * @param {String} types
	   * @param {Function} handler
	   */


	  function removeEventListeners(target, types, handler) {
	    splitStr(types).forEach(function (type) {
	      return target.removeEventListener(type, handler, false);
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
	      if (node == parent) return true;
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
	   * convert array-like objects to real arrays
	   * @param {Object} obj
	   * @returns {Array}
	   */


	  var toArray = function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	  };
	  /**
	   * unique array with objects based on a key (like 'id') or just by the array's value
	   * @param {Array} src [{id:1},{id:2},{id:1}]
	   * @param {String} [key]
	   * @param {Boolean} [sort=False]
	   * @returns {Array} [{id:1},{id:2}]
	   */


	  function uniqueArray(array, key, sort) {
	    var results = [];
	    var values = [];
	    array.forEach(function (item, i) {
	      var val = key ? item[key] : item;
	      if (values.indexOf(val) < 0) results.push(item);
	      values[i] = val;
	    });
	    if (sort) results.sort(!key ? undefined : function (a, b) {
	      return a[key] > b[key];
	    });
	    return results;
	  }
	  /**
	   * get the prefixed property
	   * @param {Object} obj
	   * @param {String} property
	   * @returns {String|Undefined} prefixed
	   */


	  function prefixed(obj, property) {
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	    return VENDOR_PREFIXES.find(function (prefix) {
	      return (prefix ? prefix + camelProp : property) in obj;
	    });
	  }
	  /**
	   * get a unique id
	   * @returns {number} uniqueId
	   */


	  var _uniqueId = 1;

	  var uniqueId = function uniqueId() {
	    return _uniqueId++;
	  };
	  /**
	   * get the window object of an element
	   * @param {HTMLElement} element
	   * @returns {DocumentView|Window}
	   */


	  function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return doc.defaultView || doc.parentWindow || window;
	  }

	  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	  var SUPPORT_TOUCH = function SUPPORT_TOUCH() {
	    return 'ontouchstart' in window;
	  };

	  var SUPPORT_POINTER_EVENTS = function SUPPORT_POINTER_EVENTS() {
	    return prefixed(window, 'PointerEvent') !== undefined;
	  };

	  var SUPPORT_ONLY_TOUCH = function SUPPORT_ONLY_TOUCH() {
	    return SUPPORT_TOUCH() && MOBILE_REGEX.test(navigator.userAgent);
	  };

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
	    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.

	    this.domHandler = function (ev) {
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
	    handler: function handler() {},

	    /**
	     * bind the events
	     */
	    init: function init() {
	      this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	      this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	      this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },

	    /**
	     * unbind the events
	     */
	    destroy: function destroy() {
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
	    var inputClass = manager.options.inputClass;
	    var Type;

	    if (inputClass) {
	      Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS()) {
	      Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH()) {
	      Type = TouchInput;
	    } else if (!SUPPORT_TOUCH()) {
	      Type = MouseInput;
	    } else {
	      Type = TouchMouseInput;
	    }

	    return new Type(manager, inputHandler);
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
	    var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
	    var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	    if (isFirst) manager.session = {}; // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'

	    input.eventType = eventType; // compute scale, rotation etc

	    computeInputData(manager, input); // emit secret event

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
	    var pointersLength = pointers.length; // store the first input to calculate the distance and direction

	    if (!session.firstInput) session.firstInput = simpleCloneInputData(input); // to compute scale and rotation we need to store the multiple touches

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
	    input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	    input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
	    computeIntervalInputData(session, input); // find the correct target

	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) target = input.srcEvent.target;
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
	        velocity,
	        velocityX,
	        velocityY,
	        direction;

	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	      var deltaX = input.deltaX - last.deltaX;
	      var deltaY = input.deltaY - last.deltaY;
	      var v = getVelocity(deltaTime, deltaX, deltaY);
	      velocityX = v.x;
	      velocityY = v.y;
	      velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
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
	    var pointers = input.pointers.map(function (pointer) {
	      return {
	        clientX: round(pointer.clientX),
	        clientY: round(pointer.clientY)
	      };
	    });
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
	    var pointersLength = pointers.length; // no need to loop when only one touch

	    if (pointersLength === 1) {
	      return {
	        x: round(pointers[0].clientX),
	        y: round(pointers[0].clientY)
	      };
	    }

	    var x = 0;
	    var y = 0;
	    pointers.forEach(function (_ref) {
	      var clientX = _ref.clientX,
	          clientY = _ref.clientY;
	      x += clientX;
	      y += clientY;
	    });
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


	  var getVelocity = function getVelocity(deltaTime, x, y) {
	    return {
	      x: x / deltaTime || 0,
	      y: y / deltaTime || 0
	    };
	  };
	  /**
	   * get the direction between two points
	   * @param {Number} x
	   * @param {Number} y
	   * @return {Number} direction
	   */


	  function getDirection(x, y) {
	    if (x === y) return DIRECTION_NONE;
	    if (abs(x) >= abs(y)) return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	  }
	  /**
	   * calculate the absolute distance between two points
	   * @param {Object} p1 {x, y}
	   * @param {Object} p2 {x, y}
	   * @param {Array} [props] containing x and y keys
	   * @return {Number} distance
	   */


	  var getDistance = function getDistance(p1, p2) {
	    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PROPS_XY,
	        _ref3 = _slicedToArray(_ref2, 2),
	        xKey = _ref3[0],
	        yKey = _ref3[1];

	    return Math.sqrt(Math.pow(p2[xKey] - p1[xKey], 2) + Math.pow(p2[yKey] - p1[yKey], 2));
	  };
	  /**
	   * calculate the angle between two coordinates
	   * @param {Object} p1
	   * @param {Object} p2
	   * @param {Array} [props] containing x and y keys
	   * @return {Number} angle
	   */


	  var getAngle = function getAngle(p1, p2) {
	    var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PROPS_XY,
	        _ref5 = _slicedToArray(_ref4, 2),
	        xKey = _ref5[0],
	        yKey = _ref5[1];

	    return Math.atan2(p2[yKey] - p1[yKey], p2[xKey] - p1[xKey]) * 180 / Math.PI;
	  };
	  /**
	   * calculate the rotation degrees between two pointersets
	   * @param {Array} start array of pointers
	   * @param {Array} end array of pointers
	   * @return {Number} rotation
	   */


	  var getRotation = function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	  };
	  /**
	   * calculate the scale factor between two pointersets
	   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	   * @param {Array} start array of pointers
	   * @param {Array} end array of pointers
	   * @return {Number} scale
	   */


	  var getScale = function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	  };

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
	    handler: function handler(ev) {
	      var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

	      if (eventType & INPUT_START && ev.button === 0) {
	        this.pressed = true;
	      }

	      if (eventType & INPUT_MOVE && ev.which !== 1) {
	        eventType = INPUT_END;
	      } // mouse must be down


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
	  }; // in IE10 the pointer types is defined as an enum

	  var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

	  };
	  var POINTER_ELEMENT_EVENTS = 'pointerdown';
	  var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

	  if (typeof window !== 'undefined' && window.MSPointerEvent && !window.PointerEvent) {
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
	    this.store = this.manager.session.pointerEvents = [];
	  }

	  inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function handler(ev) {
	      var store = this.store;
	      var removePointer = false;
	      var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	      var isTouch = pointerType == INPUT_TYPE_TOUCH; // get index of the event in the store

	      var storeIndex = store.findIndex(function (item) {
	        return item.pointerId == ev.pointerId;
	      }); // start and mouse must be down

	      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	        if (storeIndex < 0) {
	          store.push(ev);
	          storeIndex = store.length - 1;
	        }
	      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        removePointer = true;
	      } // it not found, so the pointer hasn't been down (so it's probably a hover)


	      if (storeIndex < 0) return; // update the event in the store

	      store[storeIndex] = ev;
	      this.callback(this.manager, eventType, {
	        pointers: store,
	        changedPointers: [ev],
	        pointerType: pointerType,
	        srcEvent: ev
	      }); // remove from the store

	      if (removePointer) store.splice(storeIndex, 1);
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
	    handler: function handler(srcEvent) {
	      var type = SINGLE_TOUCH_INPUT_MAP[srcEvent.type]; // should we handle the touch events?

	      if (type === INPUT_START) this.started = true;
	      if (!this.started) return;

	      var _normalizeSingleTouch = normalizeSingleTouches(srcEvent, type),
	          _normalizeSingleTouch2 = _slicedToArray(_normalizeSingleTouch, 2),
	          pointers = _normalizeSingleTouch2[0],
	          changedPointers = _normalizeSingleTouch2[1]; // when done, reset the started state


	      if (type & (INPUT_END | INPUT_CANCEL) && pointers.length - changedPointers.length === 0) {
	        this.started = false;
	      }

	      this.callback(this.manager, type, {
	        pointers: pointers,
	        changedPointers: changedPointers,
	        pointerType: INPUT_TYPE_TOUCH,
	        srcEvent: srcEvent
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
	    handler: function handler(ev) {
	      var type = TOUCH_INPUT_MAP[ev.type];
	      var touches = getTouches.call(this, ev, type);
	      if (!touches) return;
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
	    var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	      targetIds[allTouches[0].identifier] = true;
	      return [allTouches, allTouches];
	    }

	    var targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target; // get target touches from touches

	    targetTouches = allTouches.filter(function (touch) {
	      return hasParent(touch.target, target);
	    }); // collect touches

	    if (type === INPUT_START) {
	      targetTouches.forEach(function (targetTouch) {
	        targetIds[targetTouch.identifier] = true;
	      });
	    } // filter changed touches to only contain touches that exist in the collected target ids


	    changedTouches.forEach(function (changedTouch, i) {
	      if (targetIds[changedTouch.identifier]) changedTargetTouches.push(changedTouch); // cleanup removed touches

	      if (type & (INPUT_END | INPUT_CANCEL)) delete targetIds[changedTouch.identifier];
	    });
	    if (!changedTargetTouches.length) return;
	    return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
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
	    var handler = this.handler.bind(this);
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
	    handler: function handler(manager, inputEvent, inputData) {
	      var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
	          isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

	      if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	        return;
	      } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


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
	      var lastTouch = {
	        x: touch.clientX,
	        y: touch.clientY
	      };
	      this.lastTouches.push(lastTouch);
	      var lts = this.lastTouches;

	      var removeLastTouch = function removeLastTouch() {
	        var i = lts.indexOf(lastTouch);

	        if (i > -1) {
	          lts.splice(i, 1);
	        }
	      };

	      setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	  }

	  function isSyntheticEvent(_ref6) {
	    var _ref6$srcEvent = _ref6.srcEvent,
	        clientX = _ref6$srcEvent.clientX,
	        clientY = _ref6$srcEvent.clientY;
	    return !!this.lastTouches.find(function (lastTouch) {
	      return Math.abs(clientX - lastTouch.x) <= DEDUP_DISTANCE && Math.abs(clientY - lastTouch.y) <= DEDUP_DISTANCE;
	    });
	  }

	  var PREFIXED_TOUCH_ACTION = function PREFIXED_TOUCH_ACTION() {
	    return prefixed(TEST_ELEMENT().style, 'touchAction');
	  };

	  var NATIVE_TOUCH_ACTION = function NATIVE_TOUCH_ACTION() {
	    return PREFIXED_TOUCH_ACTION() !== undefined;
	  }; // magical touchAction value


	  var TOUCH_ACTION_COMPUTE = 'compute';
	  var TOUCH_ACTION_AUTO = 'auto';
	  var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

	  var TOUCH_ACTION_NONE = 'none';
	  var TOUCH_ACTION_PAN_X = 'pan-x';
	  var TOUCH_ACTION_PAN_Y = 'pan-y';
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
	    set: function set(value) {
	      // find out the touch-action by the event handlers
	      if (value == TOUCH_ACTION_COMPUTE) {
	        value = this.compute();
	      }

	      var TOUCH_ACTION_MAP = getTouchActionProps();

	      if (NATIVE_TOUCH_ACTION() && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	        this.manager.element.style[PREFIXED_TOUCH_ACTION()] = value;
	      }

	      this.actions = value.toLowerCase().trim();
	    },

	    /**
	     * just re-set the touchAction value
	     */
	    update: function update() {
	      this.set(this.manager.options.touchAction);
	    },

	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function compute() {
	      var actions = [];
	      this.manager.recognizers.forEach(function (recognizer) {
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
	    preventDefaults: function preventDefaults(input) {
	      var srcEvent = input.srcEvent;
	      var direction = input.offsetDirection; // if the touch action did prevented once this session

	      if (this.manager.session.prevented) {
	        srcEvent.preventDefault();
	        return;
	      }

	      var actions = this.actions;
	      var TOUCH_ACTION_MAP = getTouchActionProps();
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

	      if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
	        return this.preventSrc(srcEvent);
	      }
	    },

	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function preventSrc(srcEvent) {
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
	    if (inStr(actions, TOUCH_ACTION_NONE)) return TOUCH_ACTION_NONE;
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning

	    if (hasPanX && hasPanY) return TOUCH_ACTION_NONE; // pan-x OR pan-y

	    if (hasPanX || hasPanY) return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y; // manipulation

	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) return TOUCH_ACTION_MANIPULATION;
	    return TOUCH_ACTION_AUTO;
	  }

	  function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION()) return false;
	    var touchMap = {};

	    var cssSupports = function cssSupports() {
	      return window.CSS && window.CSS.supports;
	    };

	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
	      // If css.supports is not supported but there is native touch-action assume it supports
	      // all values. This is the case for IE 10 and 11.
	      touchMap[val] = cssSupports() ? window.CSS.supports('touch-action', val) : true;
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
	    this.options = Object.assign({}, this.defaults, options || {});
	    this.id = uniqueId();
	    this.manager = null; // default is enable true

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
	    set: function set(options) {
	      Object.assign(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

	      this.manager && this.manager.touchAction.update();
	      return this;
	    },

	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function recognizeWith(otherRecognizer) {
	      if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) return this;
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
	    dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
	      if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) return this;
	      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	      delete this.simultaneous[otherRecognizer.id];
	      return this;
	    },

	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function requireFailure(otherRecognizer) {
	      if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) return this;
	      var requireFail = this.requireFail;
	      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

	      if (requireFail.indexOf(otherRecognizer) === -1) {
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
	    dropRequireFailure: function dropRequireFailure(otherRecognizer) {
	      if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) return this;
	      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	      var index = this.requireFail.indexOf(otherRecognizer);
	      if (index > -1) this.requireFail.splice(index, 1);
	      return this;
	    },

	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function hasRequireFailures() {
	      return this.requireFail.length > 0;
	    },

	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function canRecognizeWith(otherRecognizer) {
	      return !!this.simultaneous[otherRecognizer.id];
	    },

	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function emit(input) {
	      var self = this;
	      var state = this.state;

	      function emit(event) {
	        self.manager.emit(event, input);
	      } // 'panstart' and 'panmove'


	      if (state < STATE_ENDED) {
	        emit(self.options.event + stateStr(state));
	      }

	      emit(self.options.event); // simple 'eventName' events

	      if (input.additionalEvent) {
	        // additional event(panleft, panright, pinchin, pinchout...)
	        emit(input.additionalEvent);
	      } // panend and pancancel


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
	    tryEmit: function tryEmit(input) {
	      if (this.canEmit()) return this.emit(input); // it's failing anyway

	      this.state = STATE_FAILED;
	    },

	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function canEmit() {
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
	    recognize: function recognize(inputData) {
	      // make a new copy of the inputData
	      // so we can change the inputData without messing up the other recognizers
	      var inputDataClone = Object.assign({}, inputData); // is is enabled and allow recognizing?

	      if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	        this.reset();
	        this.state = STATE_FAILED;
	        return;
	      } // reset when we've reached the end


	      if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	        this.state = STATE_POSSIBLE;
	      }

	      this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
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
	    process: function process(inputData) {},
	    // jshint ignore:line

	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function getTouchAction() {},

	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function reset() {}
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


	  var getRecognizerByNameIfManager = function getRecognizerByNameIfManager(otherRecognizer, _ref7) {
	    var manager = _ref7.manager;
	    return manager ? manager.get(otherRecognizer) : otherRecognizer;
	  };
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
	    attrTest: function attrTest(input) {
	      var optionPointers = this.options.pointers;
	      return optionPointers === 0 || input.pointers.length === optionPointers;
	    },

	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function process(input) {
	      var state = this.state;
	      var eventType = input.eventType;
	      var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	      var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

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
	    getTouchAction: function getTouchAction() {
	      var direction = this.options.direction;
	      var actions = [];
	      if (direction & DIRECTION_HORIZONTAL) actions.push(TOUCH_ACTION_PAN_Y);
	      if (direction & DIRECTION_VERTICAL) actions.push(TOUCH_ACTION_PAN_X);
	      return actions;
	    },
	    directionTest: function directionTest(input) {
	      var options = this.options;
	      var hasMoved = true;
	      var distance = input.distance;
	      var direction = input.direction;
	      var x = input.deltaX;
	      var y = input.deltaY; // lock to axis?

	      if (!(direction & options.direction)) {
	        if (options.direction & DIRECTION_HORIZONTAL) {
	          direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	          hasMoved = x != this.pX;
	          distance = Math.abs(input.deltaX);
	        } else {
	          direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	          hasMoved = y != this.pY;
	          distance = Math.abs(input.deltaY);
	        }
	      }

	      input.direction = direction;
	      return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	    attrTest: function attrTest(input) {
	      return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	    },
	    emit: function emit(input) {
	      this.pX = input.deltaX;
	      this.pY = input.deltaY;
	      var direction = directionStr(input.direction);
	      if (direction) input.additionalEvent = this.options.event + direction;

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
	    getTouchAction: function getTouchAction() {
	      return [TOUCH_ACTION_NONE];
	    },
	    attrTest: function attrTest(input) {
	      return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	    emit: function emit(input) {
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
	      time: 251,
	      // minimal time of the pointer to be pressed
	      threshold: 9 // a minimal movement is ok, but keep it low

	    },
	    getTouchAction: function getTouchAction() {
	      return [TOUCH_ACTION_AUTO];
	    },
	    process: function process(input) {
	      var _this = this;

	      var options = this.options;
	      var validPointers = input.pointers.length === options.pointers;
	      var validMovement = input.distance < options.threshold;
	      var validTime = input.deltaTime > options.time;
	      this._input = input; // we only allow little movement
	      // and we've reached an end event, so a tap is possible

	      if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
	        this.reset();
	      } else if (input.eventType & INPUT_START) {
	        this.reset();
	        this._timer = setTimeout(function () {
	          _this.state = STATE_RECOGNIZED;

	          _this.tryEmit();
	        }, options.time);
	      } else if (input.eventType & INPUT_END) {
	        return STATE_RECOGNIZED;
	      }

	      return STATE_FAILED;
	    },
	    reset: function reset() {
	      clearTimeout(this._timer);
	    },
	    emit: function emit(input) {
	      if (this.state !== STATE_RECOGNIZED) {
	        return;
	      }

	      if (input && input.eventType & INPUT_END) {
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
	    getTouchAction: function getTouchAction() {
	      return [TOUCH_ACTION_NONE];
	    },
	    attrTest: function attrTest(input) {
	      return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
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
	    getTouchAction: function getTouchAction() {
	      return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	    attrTest: function attrTest(input) {
	      var direction = this.options.direction;
	      var velocity;

	      if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	        velocity = input.overallVelocity;
	      } else if (direction & DIRECTION_HORIZONTAL) {
	        velocity = input.overallVelocityX;
	      } else if (direction & DIRECTION_VERTICAL) {
	        velocity = input.overallVelocityY;
	      }

	      return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	    emit: function emit(input) {
	      var direction = directionStr(input.offsetDirection);
	      if (direction) this.manager.emit(this.options.event + direction, input);
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
	    Recognizer.apply(this, arguments); // previous time and center,
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
	      interval: 300,
	      // max time between the multi-tap taps
	      time: 250,
	      // max time of the pointer to be down (like finger on the screen)
	      threshold: 9,
	      // a minimal movement is ok, but keep it low
	      posThreshold: 10 // a multi-tap can be a bit off the initial position

	    },
	    getTouchAction: function getTouchAction() {
	      return [TOUCH_ACTION_MANIPULATION];
	    },
	    process: function process(input) {
	      var _this2 = this;

	      var options = this.options;
	      var validPointers = input.pointers.length === options.pointers;
	      var validMovement = input.distance < options.threshold;
	      var validTouchTime = input.deltaTime < options.time;
	      this.reset();
	      if (input.eventType & INPUT_START && this.count === 0) return this.failTimeout(); // we only allow little movement
	      // and we've reached an end event, so a tap is possible

	      if (validMovement && validTouchTime && validPointers) {
	        if (input.eventType != INPUT_END) return this.failTimeout();
	        var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	        var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	        this.pTime = input.timeStamp;
	        this.pCenter = input.center;

	        if (!validMultiTap || !validInterval) {
	          this.count = 1;
	        } else {
	          this.count += 1;
	        }

	        this._input = input; // if tap count matches we have recognized it,
	        // else it has began recognizing...

	        var tapCount = this.count % options.taps;

	        if (tapCount === 0) {
	          // no failing requirements, immediately trigger the tap event
	          // or wait as long as the multitap interval to trigger
	          if (!this.hasRequireFailures()) {
	            return STATE_RECOGNIZED;
	          } else {
	            this._timer = setTimeout(function () {
	              _this2.state = STATE_RECOGNIZED;

	              _this2.tryEmit();
	            }, options.interval);
	            return STATE_BEGAN;
	          }
	        }
	      }

	      return STATE_FAILED;
	    },
	    failTimeout: function failTimeout() {
	      var _this3 = this;

	      this._timer = setTimeout(function () {
	        _this3.state = STATE_FAILED;
	      }, this.options.interval);
	      return STATE_FAILED;
	    },
	    reset: function reset() {
	      clearTimeout(this._timer);
	    },
	    emit: function emit() {
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
	    preset: [// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	    [RotateRecognizer, {
	      enable: false
	    }], [PinchRecognizer, {
	      enable: false
	    }, ['rotate']], [SwipeRecognizer, {
	      direction: DIRECTION_HORIZONTAL
	    }], [PanRecognizer, {
	      direction: DIRECTION_HORIZONTAL
	    }, ['swipe']], [TapRecognizer], [TapRecognizer, {
	      event: 'doubletap',
	      taps: 2
	    }, ['tap']], [PressRecognizer]],

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
	    var _this4 = this;

	    this.options = Object.assign({}, Hammer.defaults, options || {});
	    this.options.inputTarget = this.options.inputTarget || element;
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	    toggleCssProps(this, true);

	    if (this.options.recognizers) {
	      this.options.recognizers.forEach(function (item) {
	        var recognizer = _this4.add(new item[0](item[1]));

	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	      });
	    }
	  }

	  Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function set(options) {
	      Object.assign(this.options, options); // Options that need a little more setup

	      if (options.touchAction) this.touchAction.update();

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
	    stop: function stop(force) {
	      this.session.stopped = force ? FORCED_STOP : STOP;
	    },

	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function recognize(inputData) {
	      var session = this.session;
	      if (session.stopped) return; // run the touch-action polyfill

	      this.touchAction.preventDefaults(inputData);
	      var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
	      // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	      // if no recognizer is detecting a thing, it is set to `null`

	      var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
	      // or when we're in a new session

	      if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	        curRecognizer = session.curRecognizer = null;
	      }

	      recognizers.forEach(function (recognizer) {
	        // find out if we are allowed try to recognize the input for this one.
	        // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	        // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	        //      that is being recognized.
	        // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	        //      this can be setup with the `recognizeWith()` method on the recognizer.
	        if (session.stopped !== FORCED_STOP && ( // 1
	        !curRecognizer || recognizer == curRecognizer || // 2
	        recognizer.canRecognizeWith(curRecognizer))) {
	          // 3
	          recognizer.recognize(inputData);
	        } else {
	          recognizer.reset();
	        } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	        // current active recognizer. but only if we don't already have an active recognizer


	        if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	          curRecognizer = session.curRecognizer = recognizer;
	        }
	      });
	    },

	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function get(recognizer) {
	      if (recognizer instanceof Recognizer) return recognizer;
	      return this.recognizers.find(function (_ref8) {
	        var options = _ref8.options;
	        return options.event == recognizer;
	      }) || null;
	    },

	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function add(recognizer) {
	      if (invokeArrayArg(recognizer, 'add', this)) return this; // remove existing

	      var existing = this.get(recognizer.options.event);
	      if (existing) this.remove(existing);
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
	    remove: function remove(recognizer) {
	      if (invokeArrayArg(recognizer, 'remove', this)) return this;
	      recognizer = this.get(recognizer); // let's make sure this recognizer exists

	      if (recognizer) {
	        var index = this.recognizers.indexOf(recognizer);

	        if (index !== -1) {
	          this.recognizers.splice(index, 1);
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
	    on: function on(events, handler) {
	      if (events === undefined || handler === undefined) return;
	      var handlers = this.handlers;
	      splitStr(events).forEach(function (event) {
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
	    off: function off(events, handler) {
	      if (events === undefined) return;
	      var handlers = this.handlers;
	      splitStr(events).forEach(function (event) {
	        if (!handler) {
	          delete handlers[event];
	        } else if (handlers[event]) {
	          handlers[event].splice(handlers[event].indexOf(handler), 1);
	        }
	      });
	      return this;
	    },

	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function emit(event, data) {
	      // we also want to trigger dom events
	      if (this.options.domEvents) triggerDomEvent(event, data);
	      var handlers = this.handlers[event] && this.handlers[event].slice(); // no handlers, so skip it all

	      if (!handlers || !handlers.length) return;
	      data.type = event;

	      data.preventDefault = function () {
	        data.srcEvent.preventDefault();
	      };

	      handlers.forEach(function (handler) {
	        return handler(data);
	      });
	    },

	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function destroy() {
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
	    if (!element.style) return;
	    var prop;
	    Object.entries(manager.options.cssProps).forEach(function (_ref9) {
	      var _ref10 = _slicedToArray(_ref9, 2),
	          value = _ref10[0],
	          name = _ref10[1];

	      prop = prefixed(element.style, name);

	      if (add) {
	        manager.oldCssProps[prop] = element.style[prop];
	        element.style[prop] = value;
	      } else {
	        element.style[prop] = manager.oldCssProps[prop] || '';
	      }
	    });
	    if (!add) manager.oldCssProps = {};
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

	  Object.assign(Hammer, {
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
	    inherit: inherit,
	    prefixed: prefixed
	  });
	  var hammer = Hammer;

	  var microevent = createCommonjsModule(function (module) {
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

	  var MicroEvent	= function(){};
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
	  			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
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
	  };

	  // export in common js
	  if( 'exports' in module){
	  	module.exports	= MicroEvent;
	  }
	  });

	  var PageSpread;

	  var page_spread = PageSpread =
	  /*#__PURE__*/
	  function () {
	    function PageSpread(el) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      _classCallCheck(this, PageSpread);

	      this.el = el;
	      this.options = options;
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

	    _createClass(PageSpread, [{
	      key: "isZoomable",
	      value: function isZoomable() {
	        return this.getMaxZoomScale() > 1 && this.getEl().getAttribute('data-zoomable') !== 'false';
	      }
	    }, {
	      key: "isScrollable",
	      value: function isScrollable() {
	        return this.getEl().classList.contains('verso--scrollable');
	      }
	    }, {
	      key: "getEl",
	      value: function getEl() {
	        return this.el;
	      }
	    }, {
	      key: "getOverlayEls",
	      value: function getOverlayEls() {
	        return this.getEl().querySelectorAll('.verso__overlay');
	      }
	    }, {
	      key: "getPageEls",
	      value: function getPageEls() {
	        return this.getEl().querySelectorAll('.verso__page');
	      }
	    }, {
	      key: "getRect",
	      value: function getRect() {
	        return this.getEl().getBoundingClientRect();
	      }
	    }, {
	      key: "getContentRect",
	      value: function getContentRect() {
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

	          if (pageRect.top < rect.top || rect.top == null) {
	            rect.top = pageRect.top;
	          }

	          if (pageRect.left < rect.left || rect.left == null) {
	            rect.left = pageRect.left;
	          }

	          if (pageRect.right > rect.right || rect.right == null) {
	            rect.right = pageRect.right;
	          }

	          if (pageRect.bottom > rect.bottom || rect.bottom == null) {
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
	      }
	    }, {
	      key: "getId",
	      value: function getId() {
	        return this.id;
	      }
	    }, {
	      key: "getType",
	      value: function getType() {
	        return this.type;
	      }
	    }, {
	      key: "getPageIds",
	      value: function getPageIds() {
	        return this.pageIds;
	      }
	    }, {
	      key: "getWidth",
	      value: function getWidth() {
	        return this.width;
	      }
	    }, {
	      key: "getLeft",
	      value: function getLeft() {
	        return this.left;
	      }
	    }, {
	      key: "getMaxZoomScale",
	      value: function getMaxZoomScale() {
	        return this.maxZoomScale;
	      }
	    }, {
	      key: "getVisibility",
	      value: function getVisibility() {
	        return this.visibility;
	      }
	    }, {
	      key: "setVisibility",
	      value: function setVisibility(visibility) {
	        if (this.visibility !== visibility) {
	          this.getEl().style.display = visibility === 'visible' ? 'block' : 'none';
	          this.visibility = visibility;
	        }

	        return this;
	      }
	    }, {
	      key: "position",
	      value: function position() {
	        if (this.positioned === false) {
	          this.getEl().style.left = "".concat(this.getLeft(), "%");
	          this.positioned = true;
	        }

	        return this;
	      }
	    }, {
	      key: "activate",
	      value: function activate() {
	        this.active = true;
	        this.getEl().setAttribute('data-active', this.active);
	      }
	    }, {
	      key: "deactivate",
	      value: function deactivate() {
	        this.active = false;
	        this.getEl().setAttribute('data-active', this.active);
	      }
	    }]);

	    return PageSpread;
	  }();

	  var Animation;

	  var animation = Animation =
	  /*#__PURE__*/
	  function () {
	    function Animation(el) {
	      _classCallCheck(this, Animation);

	      this.el = el;
	      this.run = 0;
	      return;
	    }

	    _createClass(Animation, [{
	      key: "animate",
	      value: function animate() {
	        var _this = this;

	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	        var duration, easing, ref, ref1, ref2, ref3, ref4, run, scale, transform, _transitionEnd, x, y;

	        x = (ref = options.x) != null ? ref : 0;
	        y = (ref1 = options.y) != null ? ref1 : 0;
	        scale = (ref2 = options.scale) != null ? ref2 : 1;
	        easing = (ref3 = options.easing) != null ? ref3 : 'ease-out';
	        duration = (ref4 = options.duration) != null ? ref4 : 0;
	        run = ++this.run;
	        transform = "translateX(".concat(x, ") translateY(").concat(y, ") scale(").concat(scale, ")");

	        if (this.el.style.transform === transform) {
	          callback();
	        } else if (duration > 0) {
	          _transitionEnd = function transitionEnd() {
	            if (run !== _this.run) {
	              return;
	            }

	            _this.el.removeEventListener('transitionend', _transitionEnd);

	            _this.el.style.transition = 'none';
	            callback();
	          };

	          this.el.addEventListener('transitionend', _transitionEnd, false);
	          this.el.style.transition = "transform ".concat(easing, " ").concat(duration, "ms");
	          this.el.style.transform = transform;
	        } else {
	          this.el.style.transition = 'none';
	          this.el.style.transform = transform;
	          callback();
	        }

	        return this;
	      }
	    }]);

	    return Animation;
	  }();

	  var Animation$1, Hammer$1, MicroEvent, PageSpread$1, Verso;
	  Hammer$1 = hammer;
	  MicroEvent = microevent;
	  PageSpread$1 = page_spread;
	  Animation$1 = animation;

	  Verso =
	  /*#__PURE__*/
	  function () {
	    function Verso(el1) {
	      var options1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      _classCallCheck(this, Verso);

	      var ref, ref1, ref2, ref3, ref4, ref5;
	      this.el = el1;
	      this.options = options1;
	      this.swipeVelocity = (ref = this.options.swipeVelocity) != null ? ref : 0.3;
	      this.swipeThreshold = (ref1 = this.options.swipeThreshold) != null ? ref1 : 10;
	      this.navigationDuration = (ref2 = this.options.navigationDuration) != null ? ref2 : 240;
	      this.navigationPanDuration = (ref3 = this.options.navigationPanDuration) != null ? ref3 : 200;
	      this.zoomDuration = (ref4 = this.options.zoomDuration) != null ? ref4 : 200;
	      this.doubleTapDelay = (ref5 = this.options.doubleTapDelay) != null ? ref5 : 300;
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
	        delay: this.doubleTapDelay
	      };
	      this.scrollerEl = this.el.querySelector('.verso__scroller');
	      this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
	      this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
	      this.pageIds = this.buildPageIds(this.pageSpreads);
	      this.animation = new Animation$1(this.scrollerEl);
	      this.hammer = new Hammer$1.Manager(this.scrollerEl, {
	        touchAction: 'none',
	        enable: false,
	        inputClass: this.getHammerInputClass()
	      });
	      this.hammer.add(new Hammer$1.Pan({
	        threshold: 5,
	        direction: Hammer$1.DIRECTION_ALL
	      }));
	      this.hammer.add(new Hammer$1.Tap({
	        event: 'singletap',
	        interval: 0
	      }));
	      this.hammer.add(new Hammer$1.Pinch());
	      this.hammer.add(new Hammer$1.Press({
	        time: 500
	      }));
	      this.hammer.on('panstart', this.onPanStart.bind(this));
	      this.hammer.on('panmove', this.onPanMove.bind(this));
	      this.hammer.on('panend', this.onPanEnd.bind(this));
	      this.hammer.on('pancancel', this.onPanEnd.bind(this));
	      this.hammer.on('singletap', this.onSingletap.bind(this));
	      this.hammer.on('pinchstart', this.onPinchStart.bind(this));
	      this.hammer.on('pinchmove', this.onPinchMove.bind(this));
	      this.hammer.on('pinchend', this.onPinchEnd.bind(this));
	      this.hammer.on('pinchcancel', this.onPinchEnd.bind(this));
	      this.hammer.on('press', this.onPress.bind(this));
	      this.scrollerEl.addEventListener('contextmenu', this.onContextmenu.bind(this), false);
	      this.scrollerEl.addEventListener('wheel', this.onWheel.bind(this), false);
	      return;
	    }

	    _createClass(Verso, [{
	      key: "start",
	      value: function start() {
	        var pageId, ref;
	        pageId = (ref = this.getPageSpreadPositionFromPageId(this.options.pageId)) != null ? ref : 0;
	        this.hammer.set({
	          enable: true
	        });
	        this.navigateTo(pageId, {
	          duration: 0
	        });
	        this.resizeListener = this.onResize.bind(this);
	        this.touchStartListener = this.onTouchStart.bind(this);
	        this.touchEndListener = this.onTouchEnd.bind(this);
	        this.el.addEventListener('touchstart', this.touchStartListener, false);
	        this.el.addEventListener('touchend', this.touchEndListener, false);
	        window.addEventListener('resize', this.resizeListener, false);
	        return this;
	      }
	    }, {
	      key: "destroy",
	      value: function destroy() {
	        this.hammer.destroy();
	        this.el.removeEventListener('touchstart', this.touchStartListener);
	        this.el.removeEventListener('touchend', this.touchEndListener);
	        window.removeEventListener('resize', this.resizeListener);
	        return this;
	      }
	    }, {
	      key: "first",
	      value: function first(options) {
	        return this.navigateTo(0, options);
	      }
	    }, {
	      key: "prev",
	      value: function prev(options) {
	        return this.navigateTo(this.getPosition() - 1, options);
	      }
	    }, {
	      key: "next",
	      value: function next(options) {
	        return this.navigateTo(this.getPosition() + 1, options);
	      }
	    }, {
	      key: "last",
	      value: function last(options) {
	        return this.navigateTo(this.getPageSpreadCount() - 1, options);
	      }
	    }, {
	      key: "navigateTo",
	      value: function navigateTo(position) {
	        var _this = this;

	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        var activePageSpread, carousel, currentPageSpread, currentPosition, duration, ref, ref1, touchAction, velocity;

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
	        carousel.visible.forEach(function (pageSpread) {
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
	          x: "".concat(this.transform.left, "%"),
	          duration: duration
	        }, function () {
	          carousel = _this.getCarouselFromPageSpread(_this.getActivePageSpread());
	          carousel.gone.forEach(function (pageSpread) {
	            return pageSpread.setVisibility('gone');
	          });

	          _this.trigger('afterNavigation', {
	            newPosition: _this.getPosition(),
	            previousPosition: currentPosition
	          });
	        });
	      }
	    }, {
	      key: "getPosition",
	      value: function getPosition() {
	        return this.position;
	      }
	    }, {
	      key: "setPosition",
	      value: function setPosition(position) {
	        this.position = position;
	        return this;
	      }
	    }, {
	      key: "getLeftTransformFromPageSpread",
	      value: function getLeftTransformFromPageSpread(position, pageSpread) {
	        var left;
	        left = 0;

	        if (position === this.getPageSpreadCount() - 1) {
	          left = 100 - pageSpread.getWidth() - pageSpread.getLeft();
	        } else if (position > 0) {
	          left = (100 - pageSpread.getWidth()) / 2 - pageSpread.getLeft();
	        }

	        return left;
	      }
	    }, {
	      key: "getCarouselFromPageSpread",
	      value: function getCarouselFromPageSpread(pageSpreadSubject) {
	        var carousel;
	        carousel = {
	          visible: [],
	          gone: []
	        }; // Identify the page spreads that should be a part of the carousel.

	        this.pageSpreads.forEach(function (pageSpread) {
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
	      }
	    }, {
	      key: "traversePageSpreads",
	      value: function traversePageSpreads(els) {
	        var el, id, j, left, len, maxZoomScale, pageIds, pageSpread, pageSpreads, type, width;
	        pageSpreads = [];
	        left = 0;

	        for (j = 0, len = els.length; j < len; j++) {
	          el = els[j];
	          id = el.getAttribute('data-id');
	          type = el.getAttribute('data-type');
	          pageIds = el.getAttribute('data-page-ids');
	          pageIds = pageIds != null ? pageIds.split(',').map(function (i) {
	            return i;
	          }) : [];
	          maxZoomScale = el.getAttribute('data-max-zoom-scale');
	          maxZoomScale = maxZoomScale != null ? +maxZoomScale : 1;
	          width = el.getAttribute('data-width');
	          width = width != null ? +width : 100;
	          pageSpread = new PageSpread$1(el, {
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
	      }
	    }, {
	      key: "buildPageIds",
	      value: function buildPageIds(pageSpreads) {
	        var pageIds;
	        pageIds = {};
	        pageSpreads.forEach(function (pageSpread, i) {
	          pageSpread.options.pageIds.forEach(function (pageId) {
	            pageIds[pageId] = pageSpread;
	          });
	        });
	        return pageIds;
	      }
	    }, {
	      key: "isCoordinateInsideElement",
	      value: function isCoordinateInsideElement(x, y, el) {
	        var rect;
	        rect = el.getBoundingClientRect();
	        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
	      }
	    }, {
	      key: "getCoordinateInfo",
	      value: function getCoordinateInfo(x, y, pageSpread) {
	        var contentRect, info, j, k, len, len1, overlayEl, overlayEls, pageEl, pageEls;
	        x -= this.el.offsetLeft;
	        y -= this.el.offsetTop;
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
	      }
	    }, {
	      key: "getPageSpreadCount",
	      value: function getPageSpreadCount() {
	        return this.pageSpreads.length;
	      }
	    }, {
	      key: "getActivePageSpread",
	      value: function getActivePageSpread() {
	        return this.getPageSpreadFromPosition(this.getPosition());
	      }
	    }, {
	      key: "getPageSpreadFromPosition",
	      value: function getPageSpreadFromPosition(position) {
	        return this.pageSpreads[position];
	      }
	    }, {
	      key: "getPageSpreadPositionFromPageId",
	      value: function getPageSpreadPositionFromPageId(pageId) {
	        var idx, j, len, pageSpread, ref;
	        ref = this.pageSpreads;

	        for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
	          pageSpread = ref[idx];

	          if (pageSpread.options.pageIds.indexOf(pageId) > -1) {
	            return idx;
	          }
	        }
	      }
	    }, {
	      key: "getPageSpreadBounds",
	      value: function getPageSpreadBounds(pageSpread) {
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
	      }
	    }, {
	      key: "clipCoordinate",
	      value: function clipCoordinate(coordinate, scale, size, offset) {
	        if (size * scale < 100) {
	          coordinate = offset * -scale + 50 - size * scale / 2;
	        } else {
	          coordinate = Math.min(coordinate, offset * -scale);
	          coordinate = Math.max(coordinate, offset * -scale - size * scale + 100);
	        }

	        return coordinate;
	      }
	    }, {
	      key: "zoomTo",
	      value: function zoomTo() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        var callback = arguments.length > 1 ? arguments[1] : undefined;
	        var activePageSpread, carouselOffset, carouselScaledOffset, curScale, pageSpreadBounds, ref, ref1, scale, x, y;
	        scale = options.scale;
	        curScale = this.transform.scale;
	        activePageSpread = this.getActivePageSpread();
	        pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
	        carouselOffset = activePageSpread.getLeft();
	        carouselScaledOffset = carouselOffset * curScale;
	        x = (ref = options.x) != null ? ref : 0;
	        y = (ref1 = options.y) != null ? ref1 : 0;

	        if (scale !== 1) {
	          x -= pageSpreadBounds.pageSpreadRect.left;
	          y -= pageSpreadBounds.pageSpreadRect.top;
	          x = x / (pageSpreadBounds.pageSpreadRect.width / curScale) * 100;
	          y = y / (pageSpreadBounds.pageSpreadRect.height / curScale) * 100;
	          x = this.transform.left + carouselScaledOffset + x - x * scale / curScale;
	          y = this.transform.top + y - y * scale / curScale; // Make sure the animation doesn't exceed the content bounds.

	          if (options.bounds !== false && scale > 1) {
	            x = this.clipCoordinate(x, scale, pageSpreadBounds.width, pageSpreadBounds.left);
	            y = this.clipCoordinate(y, scale, pageSpreadBounds.height, pageSpreadBounds.top);
	          }
	        } else {
	          x = 0;
	          y = 0;
	        } // Account for the page spreads left of the active one.


	        x -= carouselOffset * scale;
	        this.transform.left = x;
	        this.transform.top = y;
	        this.transform.scale = scale;
	        this.animation.animate({
	          x: "".concat(x, "%"),
	          y: "".concat(y, "%"),
	          scale: scale,
	          easing: options.easing,
	          duration: options.duration
	        }, callback);
	      }
	    }, {
	      key: "refresh",
	      value: function refresh() {
	        this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
	        this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
	        this.pageIds = this.buildPageIds(this.pageSpreads);
	        return this;
	      }
	    }, {
	      key: "getHammerInputClass",
	      value: function getHammerInputClass() {
	        var mobileRegex, supportTouch;
	        mobileRegex = /mobile|tablet|ip(ad|hone|od)|android/i;
	        supportTouch = 'ontouchstart' in window;

	        if (supportTouch && mobileRegex.test(navigator.userAgent)) {
	          return Hammer$1.TouchInput;
	        } else {
	          return null;
	        }
	      } //#############

	      /* Events */
	      //#############

	    }, {
	      key: "onPanStart",
	      value: function onPanStart(e) {
	        var edgeThreshold, width, x; // Only allow panning if zoomed in or doing a horizontal pan.
	        // This ensures vertical scrolling works for scrollable page spreads.

	        if (this.transform.scale > 1 || e.direction === Hammer$1.DIRECTION_LEFT || e.direction === Hammer$1.DIRECTION_RIGHT) {
	          x = e.center.x;
	          edgeThreshold = 30;
	          width = this.scrollerEl.offsetWidth; // Prevent panning when edge-swiping on iOS.

	          if (x > edgeThreshold && x < width - edgeThreshold) {
	            this.startTransform.left = this.transform.left;
	            this.startTransform.top = this.transform.top;
	            this.panning = true;
	            this.trigger('panStart');
	          }
	        }
	      }
	    }, {
	      key: "onPanMove",
	      value: function onPanMove(e) {
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
	            x: "".concat(x, "%"),
	            y: "".concat(y, "%"),
	            scale: scale,
	            easing: 'linear'
	          });
	        } else {
	          x = this.transform.left + e.deltaX / this.scrollerEl.offsetWidth * 100;
	          this.animation.animate({
	            x: "".concat(x, "%"),
	            easing: 'linear'
	          });
	        }
	      }
	    }, {
	      key: "onPanEnd",
	      value: function onPanEnd(e) {
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
	              if (e.offsetDirection === Hammer$1.DIRECTION_LEFT) {
	                this.next({
	                  velocity: velocity,
	                  duration: this.navigationPanDuration
	                });
	              } else if (e.offsetDirection === Hammer$1.DIRECTION_RIGHT) {
	                this.prev({
	                  velocity: velocity,
	                  duration: this.navigationPanDuration
	                });
	              }
	            }
	          }

	          if (position === this.getPosition()) {
	            this.animation.animate({
	              x: "".concat(this.transform.left, "%"),
	              duration: this.navigationPanDuration
	            });
	            this.trigger('attemptedNavigation', {
	              position: this.getPosition()
	            });
	          }
	        }
	      }
	    }, {
	      key: "onPinchStart",
	      value: function onPinchStart(e) {
	        if (!this.getActivePageSpread().isZoomable()) {
	          return;
	        }

	        this.pinching = true;
	        this.el.setAttribute('data-pinching', true);
	        this.startTransform.scale = this.transform.scale;
	      }
	    }, {
	      key: "onPinchMove",
	      value: function onPinchMove(e) {
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
	      }
	    }, {
	      key: "onPinchEnd",
	      value: function onPinchEnd(e) {
	        var _this2 = this;

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
	        }, function () {
	          _this2.pinching = false;

	          _this2.el.setAttribute('data-pinching', false);
	        });
	      }
	    }, {
	      key: "onPress",
	      value: function onPress(e) {
	        this.trigger('pressed', this.getCoordinateInfo(e.center.x, e.center.y, this.getActivePageSpread()));
	      }
	    }, {
	      key: "onContextmenu",
	      value: function onContextmenu(e) {
	        e.preventDefault();
	        this.trigger('contextmenu', this.getCoordinateInfo(e.clientX, e.clientY, this.getActivePageSpread()));
	        return false;
	      }
	    }, {
	      key: "onWheel",
	      value: function onWheel(e) {
	        var _this3 = this;

	        var activePageSpread, position, scale;
	        activePageSpread = this.getActivePageSpread();

	        if (activePageSpread.isZoomable() === false) {
	          return;
	        }

	        if (e.deltaY > 0 && this.transform.scale === 1) {
	          scale = activePageSpread.getMaxZoomScale();
	          position = this.getPosition();
	          this.zoomTo({
	            x: e.clientX,
	            y: e.clientY,
	            scale: scale,
	            duration: this.zoomDuration
	          }, function () {
	            _this3.trigger('zoomedIn', {
	              position: position
	            });
	          });
	        } else if (e.deltaY < 0 && this.transform.scale > 1) {
	          position = this.getPosition();
	          this.zoomTo({
	            x: e.clientX,
	            y: e.clientY,
	            scale: 1,
	            duration: this.zoomDuration
	          }, function () {
	            _this3.trigger('zoomedOut', {
	              position: position
	            });
	          });
	        }
	      }
	    }, {
	      key: "onSingletap",
	      value: function onSingletap(e) {
	        var _this4 = this;

	        var activePageSpread, coordinateInfo, maxZoomScale, position, scale, zoomEvent, zoomedIn;
	        activePageSpread = this.getActivePageSpread();
	        coordinateInfo = this.getCoordinateInfo(e.center.x, e.center.y, activePageSpread);
	        clearTimeout(this.tap.timeout);

	        if (this.tap.count === 1) {
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
	            }, function () {
	              _this4.trigger(zoomEvent, {
	                position: position
	              });
	            });
	          }
	        } else {
	          this.tap.count++;
	          this.tap.timeout = setTimeout(function () {
	            _this4.tap.count = 0;

	            _this4.trigger('clicked', coordinateInfo);
	          }, this.tap.delay);
	        }
	      }
	    }, {
	      key: "onTouchStart",
	      value: function onTouchStart(e) {
	        if (!this.getActivePageSpread().isScrollable()) {
	          e.preventDefault();
	        }
	      }
	    }, {
	      key: "onTouchEnd",
	      value: function onTouchEnd(e) {
	        if (!this.getActivePageSpread().isScrollable()) {
	          e.preventDefault();
	        }
	      }
	    }, {
	      key: "onResize",
	      value: function onResize() {
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
	      }
	    }]);

	    return Verso;
	  }();

	  MicroEvent.mixin(Verso);
	  var verso = Verso;

	  return verso;

	}));

	});

	var MicroEvent$2, PagedPublicationPageSpread, SGN$a;
	MicroEvent$2 = microevent;
	SGN$a = sgn;

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
	        SGN$a.util.loadImage(image, function (err, width, height) {
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
	        SGN$a.util.loadImage(image, function (err) {
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

	var MicroEvent$3, PageSpread, PagedPublicationPageSpreads, SGN$b;
	MicroEvent$3 = microevent;
	PageSpread = pageSpread;
	SGN$b = sgn;

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
	      this.collection.forEach(function (pageSpread) {
	        return frag.appendChild(pageSpread.el);
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
	        midstPageSpreads = SGN$b.util.chunk(pages, 2);

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
	        var id, pageSpread;
	        id = "".concat(pageMode, "-").concat(i);
	        pageSpread = new PageSpread({
	          width: width,
	          maxZoomScale: maxZoomScale,
	          pages: pages,
	          id: id
	        });
	        pageSpread.bind('pageLoaded', function (e) {
	          return _this.trigger('pageLoaded', e);
	        });
	        pageSpread.bind('pagesLoaded', function (e) {
	          return _this.trigger('pagesLoaded', e);
	        });
	        ids[id] = pageSpread;
	        return pageSpread;
	      });
	      this.ids = ids;
	      return this;
	    }
	  }]);

	  return PagedPublicationPageSpreads;
	}();

	MicroEvent$3.mixin(PagedPublicationPageSpreads);
	var pageSpreads = PagedPublicationPageSpreads;

	var MicroEvent$4, PageSpreads, PagedPublicationCore, SGN$c, Verso, clientLocalStorage$1;
	MicroEvent$4 = microevent;
	Verso = verso;
	PageSpreads = pageSpreads;
	clientLocalStorage$1 = clientLocal;
	SGN$c = sgn;

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
	        this.resizeListener = SGN$c.util.throttle(this.resize, this.getOption('resizeDelay'), this);
	        this.unloadListener = this.unload.bind(this);
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
	        this.els.root.setAttribute('data-color-brightness', SGN$c.util.getColorBrightness(color));
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

	  ;
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
	MicroEvent$5 = microevent;
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
	      var el, height, left, top, width;
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

	      el.innerHTML = Mustache$1.render('', hotspot);
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
	var keyCodes_1 = keyCodes.ESC;
	var keyCodes_2 = keyCodes.ARROW_RIGHT;
	var keyCodes_3 = keyCodes.ARROW_LEFT;
	var keyCodes_4 = keyCodes.SPACE;
	var keyCodes_5 = keyCodes.NUMBER_ONE;

	var MicroEvent$6, PagedPublicationControls, SGN$d, keyCodes$1;
	MicroEvent$6 = microevent;
	SGN$d = sgn;
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
	    this.keyDownListener = SGN$d.util.throttle(this.keyDown, 150, this);

	    if (this.options.keyboard === true) {
	      this.els.root.addEventListener('keydown', this.keyDownListener, false);
	    }

	    if (this.els.prevControl != null) {
	      this.els.prevControl.addEventListener('mousedown', this.prevClicked.bind(this), false);
	    }

	    if (this.els.nextControl != null) {
	      this.els.nextControl.addEventListener('mousedown', this.nextClicked.bind(this), false);
	    }

	    if (this.els.close != null) {
	      this.els.close.addEventListener('mousedown', this.closeClicked.bind(this), false);
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
	MicroEvent$7 = microevent;

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
	      if (this.eventTracker == null) {
	        return this;
	      }

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

	      if (this.eventTracker == null) {
	        return this;
	      }

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

	var Controls, Core, EventTracking, Hotspots, MicroEvent$8, SGN$e, Viewer;
	MicroEvent$8 = microevent;
	SGN$e = sgn;
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
	    this.viewSession = SGN$e.util.uuid();
	    this.hotspots = null;
	    this.hotspotQueue = [];
	    this.popover = null;

	    this._setupEventListeners();

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

	      var hotspots;

	      if (this.hotspots == null) {
	        return;
	      }

	      if (this.popover != null) {
	        this.popover.destroy();
	        this.popover = null;
	      }

	      hotspots = e.verso.overlayEls.map(function (overlayEl) {
	        return _this2.hotspots[overlayEl.getAttribute('data-id')];
	      });

	      if (hotspots.length === 1) {
	        callback(hotspots[0]);
	      } else if (hotspots.length > 1) {
	        this.popover = SGN$e.CoreUIKit.singleChoicePopover({
	          el: this.el,
	          header: SGN$e.translations.t('paged_publication.hotspot_picker.header'),
	          x: e.verso.x,
	          y: e.verso.y,
	          items: hotspots.filter(function (hotspot) {
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
	        var hotspot, hotspots, i, id, len, page, ref, ref1, versoPageSpread;
	        hotspots = {};
	        versoPageSpread = _this3._core.getVerso().pageSpreads.find(function (pageSpread) {
	          return pageSpread.getId() === hotspotRequest.id;
	        });
	        ref = _this3.hotspots;

	        for (id in ref) {
	          hotspot = ref[id];

	          if (hotspots[id] != null) {
	            continue;
	          }

	          ref1 = hotspotRequest.pages;

	          for (i = 0, len = ref1.length; i < len; i++) {
	            page = ref1[i];

	            if (hotspot.locations[page.pageNumber] != null) {
	              hotspots[id] = {
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
	          hotspots: hotspots
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
	      var hotspots = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      this.hotspots = hotspots;
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

	var Bootstrapper, MicroEvent$9, SGN$f;
	MicroEvent$9 = microevent;
	SGN$f = core;

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
	      return new SGN$f.PagedPublicationKit.Viewer(this.options.el, {
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
	      callback = callback.bind(this);
	      SGN$f.util.async.parallel([this.fetchDetails.bind(this), this.fetchPages.bind(this)], function (result) {
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
	      SGN$f.CoreKit.request({
	        url: "/v2/catalogs/".concat(this.options.id)
	      }, callback);
	    }
	  }, {
	    key: "fetchPages",
	    value: function fetchPages(callback) {
	      SGN$f.CoreKit.request({
	        url: "/v2/catalogs/".concat(this.options.id, "/pages")
	      }, callback);
	    }
	  }, {
	    key: "fetchHotspots",
	    value: function fetchHotspots(callback) {
	      SGN$f.CoreKit.request({
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
	var pagedPublication_1 = pagedPublication.Viewer;
	var pagedPublication_2 = pagedPublication.Bootstrapper;

	var incito = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
	  typeof undefined === 'function' && undefined.amd ? undefined(factory) :
	  (global = global || self, global.Incito = factory());
	}(commonjsGlobal, function () { 'use strict';

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

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) _setPrototypeOf(subClass, superClass);
	  }

	  function _getPrototypeOf(o) {
	    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	      return o.__proto__ || Object.getPrototypeOf(o);
	    };
	    return _getPrototypeOf(o);
	  }

	  function _setPrototypeOf(o, p) {
	    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    return _setPrototypeOf(o, p);
	  }

	  function _assertThisInitialized(self) {
	    if (self === void 0) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return self;
	  }

	  function _possibleConstructorReturn(self, call) {
	    if (call && (typeof call === "object" || typeof call === "function")) {
	      return call;
	    }

	    return _assertThisInitialized(self);
	  }

	  var commonjsGlobal$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

	  function createCommonjsModule(fn, module) {
	  	return module = { exports: {} }, fn(module, module.exports), module.exports;
	  }

	  var microevent = createCommonjsModule(function (module) {
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

	  var MicroEvent	= function(){};
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
	  			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
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
	  };

	  // export in common js
	  if( 'exports' in module){
	  	module.exports	= MicroEvent;
	  }
	  });

	  var _isObject = function (it) {
	    return typeof it === 'object' ? it !== null : typeof it === 'function';
	  };

	  var _anObject = function (it) {
	    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	    return it;
	  };

	  // 7.2.1 RequireObjectCoercible(argument)
	  var _defined = function (it) {
	    if (it == undefined) throw TypeError("Can't call method on  " + it);
	    return it;
	  };

	  // 7.1.13 ToObject(argument)

	  var _toObject = function (it) {
	    return Object(_defined(it));
	  };

	  // 7.1.4 ToInteger
	  var ceil = Math.ceil;
	  var floor = Math.floor;
	  var _toInteger = function (it) {
	    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	  };

	  // 7.1.15 ToLength

	  var min = Math.min;
	  var _toLength = function (it) {
	    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  };

	  // true  -> String#at
	  // false -> String#codePointAt
	  var _stringAt = function (TO_STRING) {
	    return function (that, pos) {
	      var s = String(_defined(that));
	      var i = _toInteger(pos);
	      var l = s.length;
	      var a, b;
	      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	      a = s.charCodeAt(i);
	      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	    };
	  };

	  var at = _stringAt(true);

	   // `AdvanceStringIndex` abstract operation
	  // https://tc39.github.io/ecma262/#sec-advancestringindex
	  var _advanceStringIndex = function (S, index, unicode) {
	    return index + (unicode ? at(S, index).length : 1);
	  };

	  var toString = {}.toString;

	  var _cof = function (it) {
	    return toString.call(it).slice(8, -1);
	  };

	  var _core = createCommonjsModule(function (module) {
	  var core = module.exports = { version: '2.6.5' };
	  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	  });
	  var _core_1 = _core.version;

	  var _global = createCommonjsModule(function (module) {
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math
	    ? window : typeof self != 'undefined' && self.Math == Math ? self
	    // eslint-disable-next-line no-new-func
	    : Function('return this')();
	  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	  });

	  var _library = false;

	  var _shared = createCommonjsModule(function (module) {
	  var SHARED = '__core-js_shared__';
	  var store = _global[SHARED] || (_global[SHARED] = {});

	  (module.exports = function (key, value) {
	    return store[key] || (store[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: _core.version,
	    mode: _library ? 'pure' : 'global',
	    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	  });
	  });

	  var id = 0;
	  var px = Math.random();
	  var _uid = function (key) {
	    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	  };

	  var _wks = createCommonjsModule(function (module) {
	  var store = _shared('wks');

	  var Symbol = _global.Symbol;
	  var USE_SYMBOL = typeof Symbol == 'function';

	  var $exports = module.exports = function (name) {
	    return store[name] || (store[name] =
	      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	  };

	  $exports.store = store;
	  });

	  // getting tag from 19.1.3.6 Object.prototype.toString()

	  var TAG = _wks('toStringTag');
	  // ES3 wrong here
	  var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	  // fallback for IE11 Script Access Denied error
	  var tryGet = function (it, key) {
	    try {
	      return it[key];
	    } catch (e) { /* empty */ }
	  };

	  var _classof = function (it) {
	    var O, T, B;
	    return it === undefined ? 'Undefined' : it === null ? 'Null'
	      // @@toStringTag case
	      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	      // builtinTag case
	      : ARG ? _cof(O)
	      // ES3 arguments fallback
	      : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	  };

	  var builtinExec = RegExp.prototype.exec;

	   // `RegExpExec` abstract operation
	  // https://tc39.github.io/ecma262/#sec-regexpexec
	  var _regexpExecAbstract = function (R, S) {
	    var exec = R.exec;
	    if (typeof exec === 'function') {
	      var result = exec.call(R, S);
	      if (typeof result !== 'object') {
	        throw new TypeError('RegExp exec method returned something other than an Object or null');
	      }
	      return result;
	    }
	    if (_classof(R) !== 'RegExp') {
	      throw new TypeError('RegExp#exec called on incompatible receiver');
	    }
	    return builtinExec.call(R, S);
	  };

	  // 21.2.5.3 get RegExp.prototype.flags

	  var _flags = function () {
	    var that = _anObject(this);
	    var result = '';
	    if (that.global) result += 'g';
	    if (that.ignoreCase) result += 'i';
	    if (that.multiline) result += 'm';
	    if (that.unicode) result += 'u';
	    if (that.sticky) result += 'y';
	    return result;
	  };

	  var nativeExec = RegExp.prototype.exec;
	  // This always refers to the native implementation, because the
	  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	  // which loads this file before patching the method.
	  var nativeReplace = String.prototype.replace;

	  var patchedExec = nativeExec;

	  var LAST_INDEX = 'lastIndex';

	  var UPDATES_LAST_INDEX_WRONG = (function () {
	    var re1 = /a/,
	        re2 = /b*/g;
	    nativeExec.call(re1, 'a');
	    nativeExec.call(re2, 'a');
	    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	  })();

	  // nonparticipating capturing group, copied from es5-shim's String#split patch.
	  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	  if (PATCH) {
	    patchedExec = function exec(str) {
	      var re = this;
	      var lastIndex, reCopy, match, i;

	      if (NPCG_INCLUDED) {
	        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	      }
	      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	      match = nativeExec.call(re, str);

	      if (UPDATES_LAST_INDEX_WRONG && match) {
	        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	      }
	      if (NPCG_INCLUDED && match && match.length > 1) {
	        // Fix browsers whose `exec` methods don't consistently return `undefined`
	        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	        // eslint-disable-next-line no-loop-func
	        nativeReplace.call(match[0], reCopy, function () {
	          for (i = 1; i < arguments.length - 2; i++) {
	            if (arguments[i] === undefined) match[i] = undefined;
	          }
	        });
	      }

	      return match;
	    };
	  }

	  var _regexpExec = patchedExec;

	  var _fails = function (exec) {
	    try {
	      return !!exec();
	    } catch (e) {
	      return true;
	    }
	  };

	  // Thank's IE8 for his funny defineProperty
	  var _descriptors = !_fails(function () {
	    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	  });

	  var document$1 = _global.document;
	  // typeof document.createElement is 'object' in old IE
	  var is = _isObject(document$1) && _isObject(document$1.createElement);
	  var _domCreate = function (it) {
	    return is ? document$1.createElement(it) : {};
	  };

	  var _ie8DomDefine = !_descriptors && !_fails(function () {
	    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	  });

	  // 7.1.1 ToPrimitive(input [, PreferredType])

	  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
	  // and the second argument - flag - preferred type is a string
	  var _toPrimitive = function (it, S) {
	    if (!_isObject(it)) return it;
	    var fn, val;
	    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	    throw TypeError("Can't convert object to primitive value");
	  };

	  var dP = Object.defineProperty;

	  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	    _anObject(O);
	    P = _toPrimitive(P, true);
	    _anObject(Attributes);
	    if (_ie8DomDefine) try {
	      return dP(O, P, Attributes);
	    } catch (e) { /* empty */ }
	    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	    if ('value' in Attributes) O[P] = Attributes.value;
	    return O;
	  };

	  var _objectDp = {
	  	f: f
	  };

	  var _propertyDesc = function (bitmap, value) {
	    return {
	      enumerable: !(bitmap & 1),
	      configurable: !(bitmap & 2),
	      writable: !(bitmap & 4),
	      value: value
	    };
	  };

	  var _hide = _descriptors ? function (object, key, value) {
	    return _objectDp.f(object, key, _propertyDesc(1, value));
	  } : function (object, key, value) {
	    object[key] = value;
	    return object;
	  };

	  var hasOwnProperty = {}.hasOwnProperty;
	  var _has = function (it, key) {
	    return hasOwnProperty.call(it, key);
	  };

	  var _functionToString = _shared('native-function-to-string', Function.toString);

	  var _redefine = createCommonjsModule(function (module) {
	  var SRC = _uid('src');

	  var TO_STRING = 'toString';
	  var TPL = ('' + _functionToString).split(TO_STRING);

	  _core.inspectSource = function (it) {
	    return _functionToString.call(it);
	  };

	  (module.exports = function (O, key, val, safe) {
	    var isFunction = typeof val == 'function';
	    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	    if (O[key] === val) return;
	    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    if (O === _global) {
	      O[key] = val;
	    } else if (!safe) {
	      delete O[key];
	      _hide(O, key, val);
	    } else if (O[key]) {
	      O[key] = val;
	    } else {
	      _hide(O, key, val);
	    }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, TO_STRING, function toString() {
	    return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	  });
	  });

	  var _aFunction = function (it) {
	    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	    return it;
	  };

	  // optional / simple context binding

	  var _ctx = function (fn, that, length) {
	    _aFunction(fn);
	    if (that === undefined) return fn;
	    switch (length) {
	      case 1: return function (a) {
	        return fn.call(that, a);
	      };
	      case 2: return function (a, b) {
	        return fn.call(that, a, b);
	      };
	      case 3: return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	    }
	    return function (/* ...args */) {
	      return fn.apply(that, arguments);
	    };
	  };

	  var PROTOTYPE = 'prototype';

	  var $export = function (type, name, source) {
	    var IS_FORCED = type & $export.F;
	    var IS_GLOBAL = type & $export.G;
	    var IS_STATIC = type & $export.S;
	    var IS_PROTO = type & $export.P;
	    var IS_BIND = type & $export.B;
	    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	    var key, own, out, exp;
	    if (IS_GLOBAL) source = name;
	    for (key in source) {
	      // contains in native
	      own = !IS_FORCED && target && target[key] !== undefined;
	      // export native or passed
	      out = (own ? target : source)[key];
	      // bind timers to global for call from export context
	      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	      // extend global
	      if (target) _redefine(target, key, out, type & $export.U);
	      // export
	      if (exports[key] != out) _hide(exports, key, exp);
	      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	    }
	  };
	  _global.core = _core;
	  // type bitmap
	  $export.F = 1;   // forced
	  $export.G = 2;   // global
	  $export.S = 4;   // static
	  $export.P = 8;   // proto
	  $export.B = 16;  // bind
	  $export.W = 32;  // wrap
	  $export.U = 64;  // safe
	  $export.R = 128; // real proto method for `library`
	  var _export = $export;

	  _export({
	    target: 'RegExp',
	    proto: true,
	    forced: _regexpExec !== /./.exec
	  }, {
	    exec: _regexpExec
	  });

	  var SPECIES = _wks('species');

	  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	    // #replace needs built-in support for named groups.
	    // #match works fine because it just return the exec results, even if it has
	    // a "grops" property.
	    var re = /./;
	    re.exec = function () {
	      var result = [];
	      result.groups = { a: '7' };
	      return result;
	    };
	    return ''.replace(re, '$<a>') !== '7';
	  });

	  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	    var re = /(?:)/;
	    var originalExec = re.exec;
	    re.exec = function () { return originalExec.apply(this, arguments); };
	    var result = 'ab'.split(re);
	    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	  })();

	  var _fixReWks = function (KEY, length, exec) {
	    var SYMBOL = _wks(KEY);

	    var DELEGATES_TO_SYMBOL = !_fails(function () {
	      // String methods call symbol-named RegEp methods
	      var O = {};
	      O[SYMBOL] = function () { return 7; };
	      return ''[KEY](O) != 7;
	    });

	    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	      // Symbol-named RegExp methods call .exec
	      var execCalled = false;
	      var re = /a/;
	      re.exec = function () { execCalled = true; return null; };
	      if (KEY === 'split') {
	        // RegExp[@@split] doesn't call the regex's exec method, but first creates
	        // a new one. We need to return the patched regex when creating the new one.
	        re.constructor = {};
	        re.constructor[SPECIES] = function () { return re; };
	      }
	      re[SYMBOL]('');
	      return !execCalled;
	    }) : undefined;

	    if (
	      !DELEGATES_TO_SYMBOL ||
	      !DELEGATES_TO_EXEC ||
	      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	    ) {
	      var nativeRegExpMethod = /./[SYMBOL];
	      var fns = exec(
	        _defined,
	        SYMBOL,
	        ''[KEY],
	        function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	          if (regexp.exec === _regexpExec) {
	            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	              // The native String method already delegates to @@method (this
	              // polyfilled function), leasing to infinite recursion.
	              // We avoid it by directly calling the native @@method method.
	              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	            }
	            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	          }
	          return { done: false };
	        }
	      );
	      var strfn = fns[0];
	      var rxfn = fns[1];

	      _redefine(String.prototype, KEY, strfn);
	      _hide(RegExp.prototype, SYMBOL, length == 2
	        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	        ? function (string, arg) { return rxfn.call(string, this, arg); }
	        // 21.2.5.6 RegExp.prototype[@@match](string)
	        // 21.2.5.9 RegExp.prototype[@@search](string)
	        : function (string) { return rxfn.call(string, this); }
	      );
	    }
	  };

	  var max = Math.max;
	  var min$1 = Math.min;
	  var floor$1 = Math.floor;
	  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	  var maybeToString = function (it) {
	    return it === undefined ? it : String(it);
	  };

	  // @@replace logic
	  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	    return [
	      // `String.prototype.replace` method
	      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	      function replace(searchValue, replaceValue) {
	        var O = defined(this);
	        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	        return fn !== undefined
	          ? fn.call(searchValue, O, replaceValue)
	          : $replace.call(String(O), searchValue, replaceValue);
	      },
	      // `RegExp.prototype[@@replace]` method
	      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	      function (regexp, replaceValue) {
	        var res = maybeCallNative($replace, regexp, this, replaceValue);
	        if (res.done) return res.value;

	        var rx = _anObject(regexp);
	        var S = String(this);
	        var functionalReplace = typeof replaceValue === 'function';
	        if (!functionalReplace) replaceValue = String(replaceValue);
	        var global = rx.global;
	        if (global) {
	          var fullUnicode = rx.unicode;
	          rx.lastIndex = 0;
	        }
	        var results = [];
	        while (true) {
	          var result = _regexpExecAbstract(rx, S);
	          if (result === null) break;
	          results.push(result);
	          if (!global) break;
	          var matchStr = String(result[0]);
	          if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        }
	        var accumulatedResult = '';
	        var nextSourcePosition = 0;
	        for (var i = 0; i < results.length; i++) {
	          result = results[i];
	          var matched = String(result[0]);
	          var position = max(min$1(_toInteger(result.index), S.length), 0);
	          var captures = [];
	          // NOTE: This is equivalent to
	          //   captures = result.slice(1).map(maybeToString)
	          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	          var namedCaptures = result.groups;
	          if (functionalReplace) {
	            var replacerArgs = [matched].concat(captures, position, S);
	            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	            var replacement = String(replaceValue.apply(undefined, replacerArgs));
	          } else {
	            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	          }
	          if (position >= nextSourcePosition) {
	            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	            nextSourcePosition = position + matched.length;
	          }
	        }
	        return accumulatedResult + S.slice(nextSourcePosition);
	      }
	    ];

	      // https://tc39.github.io/ecma262/#sec-getsubstitution
	    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	      var tailPos = position + matched.length;
	      var m = captures.length;
	      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	      if (namedCaptures !== undefined) {
	        namedCaptures = _toObject(namedCaptures);
	        symbols = SUBSTITUTION_SYMBOLS;
	      }
	      return $replace.call(replacement, symbols, function (match, ch) {
	        var capture;
	        switch (ch.charAt(0)) {
	          case '$': return '$';
	          case '&': return matched;
	          case '`': return str.slice(0, position);
	          case "'": return str.slice(tailPos);
	          case '<':
	            capture = namedCaptures[ch.slice(1, -1)];
	            break;
	          default: // \d\d?
	            var n = +ch;
	            if (n === 0) return match;
	            if (n > m) {
	              var f = floor$1(n / 10);
	              if (f === 0) return match;
	              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	              return match;
	            }
	            capture = captures[n - 1];
	        }
	        return capture === undefined ? '' : capture;
	      });
	    }
	  });

	  var utils;
	  utils = {
	    formatUnit: function formatUnit(unit) {
	      if (unit == null) {
	        return 0;
	      } else if (typeof unit === 'number') {
	        return "".concat(unit, "px");
	      } else if (typeof unit === 'string') {
	        return unit.replace('dp', 'px');
	      } else {
	        return 0;
	      }
	    },
	    isDefinedStr: function isDefinedStr(value) {
	      return typeof value === 'string' && value.length > 0;
	    },
	    escapeHTML: function escapeHTML() {
	      var unsafe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
	    },
	    throttle: function throttle(fn, delay) {
	      var timer;

	      if (delay === 0) {
	        return fn;
	      }

	      timer = false;
	      return function () {
	        if (timer) {
	          return;
	        }

	        timer = true;
	        return setTimeout(function () {
	          timer = false;
	          fn.apply(void 0, arguments);
	        }, delay);
	      };
	    }
	  };
	  var utils_1 = utils;

	  var quot = /"/g;
	  // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	  var createHTML = function (string, tag, attribute, value) {
	    var S = String(_defined(string));
	    var p1 = '<' + tag;
	    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	    return p1 + '>' + S + '</' + tag + '>';
	  };
	  var _stringHtml = function (NAME, exec) {
	    var O = {};
	    O[NAME] = exec(createHTML);
	    _export(_export.P + _export.F * _fails(function () {
	      var test = ''[NAME]('"');
	      return test !== test.toLowerCase() || test.split('"').length > 3;
	    }), 'String', O);
	  };

	  // B.2.3.10 String.prototype.link(url)
	  _stringHtml('link', function (createHTML) {
	    return function link(url) {
	      return createHTML(this, 'a', 'href', url);
	    };
	  });

	  var View,
	      utils$1,
	      indexOf = [].indexOf;
	  utils$1 = utils_1;

	  var view = View = function () {
	    var View =
	    /*#__PURE__*/
	    function () {
	      function View() {
	        var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, View);

	        this.attrs = attrs;
	        this.el = this.createElement();
	        this.setAttributes();
	        return;
	      }

	      _createClass(View, [{
	        key: "render",
	        value: function render() {
	          return this;
	        }
	      }, {
	        key: "createElement",
	        value: function createElement() {
	          var className, el, ref;
	          el = document.createElement(this.tagName);
	          className = (ref = this.className) != null ? ref : '';
	          el.className = 'incito__view ' + className;
	          return el;
	        }
	      }, {
	        key: "setAttributes",
	        value: function setAttributes() {
	          var _this = this;

	          var featureLabels, ref, ref1, shadow, strokeStyles, transforms; // Identifier.

	          if (utils$1.isDefinedStr(this.attrs.id)) {
	            this.el.setAttribute('data-id', this.attrs.id);
	          } // Role.


	          if (utils$1.isDefinedStr(this.attrs.role)) {
	            this.el.setAttribute('data-role', this.attrs.role);
	          } // Accessibility label.


	          if (utils$1.isDefinedStr(this.attrs.accessibility_label)) {
	            this.el.setAttribute('aria-label', this.attrs.accessibility_label);
	          } // Accessibility visibility.


	          if (this.attrs.accessibility_hidden === true) {
	            this.el.setAttribute('aria-hidden', true);
	          } // Feature labels.


	          if (Array.isArray(this.attrs.feature_labels)) {
	            featureLabels = this.attrs.feature_labels.filter(function (featureLabel) {
	              return /^[a-z_-]{1,14}$/.test(featureLabel);
	            });

	            if (featureLabels.length) {
	              this.el.setAttribute('data-feature-labels', featureLabels.join(','));
	            }
	          } // Title.


	          if (utils$1.isDefinedStr(this.attrs.title)) {
	            this.el.setAttribute('title', this.attrs.title);
	          } // Gravity.


	          if (utils$1.isDefinedStr(this.attrs.gravity)) {
	            this.el.setAttribute('data-gravity', this.attrs.gravity);
	          } // Link.


	          if (utils$1.isDefinedStr(this.attrs.link)) {
	            this.el.setAttribute('data-link', '');
	            this.el.addEventListener('click', function () {
	              window.open(_this.attrs.link, '_blank');
	            }, false);
	          } // Width.


	          if (this.attrs.layout_width === 'match_parent') {
	            this.el.style.width = '100%';
	          } else if (this.attrs.layout_width === 'wrap_content') {
	            this.el.style.display = 'inline-block';
	          } else if (this.attrs.layout_width != null) {
	            this.el.style.width = utils$1.formatUnit(this.attrs.layout_width);
	          } // Height.


	          if (this.attrs.layout_height === 'match_parent') {
	            this.el.style.height = '100%';
	          } else if (this.attrs.layout_height === 'wrap_content') {
	            this.el.style.height = 'auto';
	          } else if (this.attrs.layout_height != null) {
	            this.el.style.height = utils$1.formatUnit(this.attrs.layout_height);
	          } // Min width.


	          if (this.attrs.min_width != null) {
	            this.el.style.minWidth = utils$1.formatUnit(this.attrs.min_width);
	          } // Max width.


	          if (this.attrs.max_width != null) {
	            this.el.style.maxWidth = utils$1.formatUnit(this.attrs.max_width);
	          } // Min height.


	          if (this.attrs.min_height != null) {
	            this.el.style.minHeight = utils$1.formatUnit(this.attrs.min_height);
	          } // Max height.


	          if (this.attrs.max_height != null) {
	            this.el.style.maxHeight = utils$1.formatUnit(this.attrs.max_height);
	          } // Position in relation to parent.


	          if (this.attrs.layout_top != null) {
	            this.el.style.top = utils$1.formatUnit(this.attrs.layout_top);
	          }

	          if (this.attrs.layout_left != null) {
	            this.el.style.left = utils$1.formatUnit(this.attrs.layout_left);
	          }

	          if (this.attrs.layout_right != null) {
	            this.el.style.right = utils$1.formatUnit(this.attrs.layout_right);
	          }

	          if (this.attrs.layout_bottom != null) {
	            this.el.style.bottom = utils$1.formatUnit(this.attrs.layout_bottom);
	          } // Background.


	          if (utils$1.isDefinedStr(this.attrs.background_color)) {
	            this.el.style.backgroundColor = this.attrs.background_color;
	          }

	          if (utils$1.isDefinedStr(this.attrs.background_image)) {
	            this.el.setAttribute('data-src', this.attrs.background_image);
	            this.lazyload = true;
	          }

	          if ((ref = this.attrs.background_tile_mode) === 'repeat_x' || ref === 'repeat_y' || ref === 'repeat') {
	            this.el.style.backgroundRepeat = this.attrs.background_tile_mode.replace('_', '-');
	          }

	          if (utils$1.isDefinedStr(this.attrs.background_image_position)) {
	            this.el.style.backgroundPosition = this.attrs.background_image_position.replace('_', ' ');
	          }

	          if (this.attrs.background_image_scale_type === 'center_crop') {
	            this.el.style.backgroundSize = 'cover';
	          } else if (this.attrs.background_image_scale_type === 'center_inside') {
	            this.el.style.backgroundSize = 'contain';
	          } // Margin.


	          if (this.attrs.layout_margin != null) {
	            this.el.style.margin = utils$1.formatUnit(this.attrs.layout_margin);
	          }

	          if (this.attrs.layout_margin_top != null) {
	            this.el.style.marginTop = utils$1.formatUnit(this.attrs.layout_margin_top);
	          }

	          if (this.attrs.layout_margin_left != null) {
	            this.el.style.marginLeft = utils$1.formatUnit(this.attrs.layout_margin_left);
	          }

	          if (this.attrs.layout_margin_right != null) {
	            this.el.style.marginRight = utils$1.formatUnit(this.attrs.layout_margin_right);
	          }

	          if (this.attrs.layout_margin_bottom != null) {
	            this.el.style.marginBottom = utils$1.formatUnit(this.attrs.layout_margin_bottom);
	          } // Padding.


	          if (this.attrs.padding != null) {
	            this.el.style.padding = utils$1.formatUnit(this.attrs.padding);
	          }

	          if (this.attrs.padding_top != null) {
	            this.el.style.paddingTop = utils$1.formatUnit(this.attrs.padding_top);
	          }

	          if (this.attrs.padding_left != null) {
	            this.el.style.paddingLeft = utils$1.formatUnit(this.attrs.padding_left);
	          }

	          if (this.attrs.padding_right != null) {
	            this.el.style.paddingRight = utils$1.formatUnit(this.attrs.padding_right);
	          }

	          if (this.attrs.padding_bottom != null) {
	            this.el.style.paddingBottom = utils$1.formatUnit(this.attrs.padding_bottom);
	          } // Corner radius.


	          if (this.attrs.corner_radius != null) {
	            this.el.style.borderRadius = utils$1.formatUnit(this.attrs.corner_radius);
	          }

	          if (this.attrs.corner_top_left_radius != null) {
	            this.el.style.borderTopLeftRadius = utils$1.formatUnit(this.attrs.corner_top_left_radius);
	          }

	          if (this.attrs.corner_top_right_radius != null) {
	            this.el.style.borderTopRightRadius = utils$1.formatUnit(this.attrs.corner_top_right_radius);
	          }

	          if (this.attrs.corner_bottom_left_radius != null) {
	            this.el.style.borderBottomLeftRadius = utils$1.formatUnit(this.attrs.corner_bottom_left_radius);
	          }

	          if (this.attrs.corner_bottom_right_radius != null) {
	            this.el.style.borderBottomRightRadius = utils$1.formatUnit(this.attrs.corner_bottom_right_radius);
	          } // Clip children.


	          if (this.attrs.clip_children === false) {
	            this.el.style.overflow = 'visible';
	          } // Shadow.


	          shadow = this.getShadow();

	          if (shadow != null) {
	            this.el.style.boxShadow = "".concat(shadow.dx, "px ").concat(shadow.dy, "px ").concat(shadow.radius, "px ").concat(shadow.color);
	          } // Stroke.


	          strokeStyles = ['solid', 'dotted', 'dashed'];

	          if (this.attrs.stroke_width != null) {
	            this.el.style.borderWidth = utils$1.formatUnit(this.attrs.stroke_width);
	          }

	          if (this.attrs.stroke_color != null) {
	            this.el.style.borderColor = this.attrs.stroke_color;
	          }

	          if (ref1 = this.attrs.stroke_style, indexOf.call(strokeStyles, ref1) >= 0) {
	            this.el.style.borderStyle = this.attrs.stroke_style;
	          }

	          if (this.attrs.stroke_top_width != null) {
	            this.el.style.borderTopWidth = utils$1.formatUnit(this.attrs.stroke_top_width);
	          }

	          if (this.attrs.stroke_top_color != null) {
	            this.el.style.borderTopColor = this.attrs.stroke_top_color;
	          }

	          if (this.attrs.stroke_left_width != null) {
	            this.el.style.borderLeftWidth = utils$1.formatUnit(this.attrs.stroke_left_width);
	          }

	          if (this.attrs.stroke_left_color != null) {
	            this.el.style.borderLeftColor = this.attrs.stroke_left_color;
	          }

	          if (this.attrs.stroke_right_width != null) {
	            this.el.style.borderRightWidth = utils$1.formatUnit(this.attrs.stroke_right_width);
	          }

	          if (this.attrs.stroke_right_color != null) {
	            this.el.style.borderRightColor = this.attrs.stroke_right_color;
	          }

	          if (this.attrs.stroke_bottom_width != null) {
	            this.el.style.borderBottomWidth = utils$1.formatUnit(this.attrs.stroke_bottom_width);
	          }

	          if (this.attrs.stroke_bottom_color != null) {
	            this.el.style.borderBottomColor = this.attrs.stroke_bottom_color;
	          } // Flex.


	          if (typeof this.attrs.layout_flex_shrink === 'number') {
	            this.el.style.flexShrink = this.attrs.layout_flex_shrink;
	            this.el.style.msFlexShrink = this.attrs.layout_flex_shrink;
	          }

	          if (typeof this.attrs.layout_flex_grow === 'number') {
	            this.el.style.flexGrow = this.attrs.layout_flex_grow;
	            this.el.style.msFlexGrow = this.attrs.layout_flex_grow;
	          }

	          if (this.attrs.layout_flex_basis != null) {
	            this.el.style.flexBasis = utils$1.formatUnit(this.attrs.layout_flex_basis);
	            this.el.style.msFlexBasis = utils$1.formatUnit(this.attrs.layout_flex_basis);
	          } // Transforms.


	          transforms = this.getTransforms();

	          if (transforms.length > 0) {
	            this.el.style.transform = transforms.join(' ');
	          } // Transform origin.


	          if (Array.isArray(this.attrs.transform_origin) && this.attrs.transform_origin.length === 2) {
	            this.el.style.transformOrigin = [utils$1.formatUnit(this.attrs.transform_origin[0]), utils$1.formatUnit(this.attrs.transform_origin[1])].join(' ');
	          }
	        }
	      }, {
	        key: "getTransforms",
	        value: function getTransforms() {
	          var transforms, translateX, translateY;
	          transforms = [];
	          translateX = utils$1.formatUnit(this.attrs.transform_translate_x);
	          translateY = utils$1.formatUnit(this.attrs.transform_translate_y);

	          if (translateX !== 0) {
	            transforms.push("translateX(".concat(translateX, ")"));
	          }

	          if (translateY !== 0) {
	            transforms.push("translateY(".concat(translateY, ")"));
	          }

	          if (typeof this.attrs.transform_rotate === 'number' && this.attrs.transform_rotate !== 0) {
	            transforms.push("rotate(".concat(this.attrs.transform_rotate, "deg)"));
	          }

	          if (typeof this.attrs.transform_scale === 'number' && this.attrs.transform_scale !== 1) {
	            transforms.push("scale(".concat(this.attrs.transform_scale, ")"));
	          }

	          return transforms;
	        }
	      }, {
	        key: "getShadow",
	        value: function getShadow() {
	          var color, dx, dy, radius;

	          if (utils$1.isDefinedStr(this.attrs.shadow_color)) {
	            dx = typeof this.attrs.shadow_dx === 'number' ? this.attrs.shadow_dx : 0;
	            dy = typeof this.attrs.shadow_dy === 'number' ? this.attrs.shadow_dy : 0;
	            radius = typeof this.attrs.shadow_radius === 'number' ? this.attrs.shadow_radius : 0;
	            color = this.attrs.shadow_color;
	            return {
	              dx: dx,
	              dy: dy,
	              radius: radius,
	              color: color
	            };
	          }
	        }
	      }]);

	      return View;
	    }();
	    View.prototype.tagName = 'div';
	    View.prototype.className = null;
	    return View;
	  }.call(commonjsGlobal$1);

	  var Image, View$1, utils$2;
	  View$1 = view;
	  utils$2 = utils_1;

	  var image = Image = function () {
	    var Image =
	    /*#__PURE__*/
	    function (_View) {
	      _inherits(Image, _View);

	      function Image() {
	        _classCallCheck(this, Image);

	        return _possibleConstructorReturn(this, _getPrototypeOf(Image).apply(this, arguments));
	      }

	      _createClass(Image, [{
	        key: "render",
	        value: function render() {
	          if (utils$2.isDefinedStr(this.attrs.src)) {
	            this.el.setAttribute('data-src', this.attrs.src);
	          }

	          if (utils$2.isDefinedStr(this.attrs.label)) {
	            this.el.setAttribute('alt', this.attrs.label);
	          } else {
	            this.el.setAttribute('alt', '');
	          }

	          return this;
	        }
	      }]);

	      return Image;
	    }(View$1);
	    Image.prototype.tagName = 'img';
	    Image.prototype.className = 'incito__image-view';
	    Image.prototype.lazyload = true;
	    return Image;
	  }.call(commonjsGlobal$1);

	  var dP$1 = _objectDp.f;
	  var FProto = Function.prototype;
	  var nameRE = /^\s*function ([^ (]*)/;
	  var NAME = 'name';

	  // 19.2.4.2 name
	  NAME in FProto || _descriptors && dP$1(FProto, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return ('' + this).match(nameRE)[1];
	      } catch (e) {
	        return '';
	      }
	    }
	  });

	  // 7.2.8 IsRegExp(argument)


	  var MATCH = _wks('match');
	  var _isRegexp = function (it) {
	    var isRegExp;
	    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	  };

	  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


	  var SPECIES$1 = _wks('species');
	  var _speciesConstructor = function (O, D) {
	    var C = _anObject(O).constructor;
	    var S;
	    return C === undefined || (S = _anObject(C)[SPECIES$1]) == undefined ? D : _aFunction(S);
	  };

	  var $min = Math.min;
	  var $push = [].push;
	  var $SPLIT = 'split';
	  var LENGTH = 'length';
	  var LAST_INDEX$1 = 'lastIndex';
	  var MAX_UINT32 = 0xffffffff;

	  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	  var SUPPORTS_Y = !_fails(function () { });

	  // @@split logic
	  _fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	    var internalSplit;
	    if (
	      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	      'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	      'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	      '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	      '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	      ''[$SPLIT](/.?/)[LENGTH]
	    ) {
	      // based on es5-shim implementation, need to rework it
	      internalSplit = function (separator, limit) {
	        var string = String(this);
	        if (separator === undefined && limit === 0) return [];
	        // If `separator` is not a regex, use native split
	        if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	        var output = [];
	        var flags = (separator.ignoreCase ? 'i' : '') +
	                    (separator.multiline ? 'm' : '') +
	                    (separator.unicode ? 'u' : '') +
	                    (separator.sticky ? 'y' : '');
	        var lastLastIndex = 0;
	        var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	        // Make `global` and avoid `lastIndex` issues by working with a copy
	        var separatorCopy = new RegExp(separator.source, flags + 'g');
	        var match, lastIndex, lastLength;
	        while (match = _regexpExec.call(separatorCopy, string)) {
	          lastIndex = separatorCopy[LAST_INDEX$1];
	          if (lastIndex > lastLastIndex) {
	            output.push(string.slice(lastLastIndex, match.index));
	            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	            lastLength = match[0][LENGTH];
	            lastLastIndex = lastIndex;
	            if (output[LENGTH] >= splitLimit) break;
	          }
	          if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	        }
	        if (lastLastIndex === string[LENGTH]) {
	          if (lastLength || !separatorCopy.test('')) output.push('');
	        } else output.push(string.slice(lastLastIndex));
	        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	      };
	    // Chakra, V8
	    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	      internalSplit = function (separator, limit) {
	        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	      };
	    } else {
	      internalSplit = $split;
	    }

	    return [
	      // `String.prototype.split` method
	      // https://tc39.github.io/ecma262/#sec-string.prototype.split
	      function split(separator, limit) {
	        var O = defined(this);
	        var splitter = separator == undefined ? undefined : separator[SPLIT];
	        return splitter !== undefined
	          ? splitter.call(separator, O, limit)
	          : internalSplit.call(String(O), separator, limit);
	      },
	      // `RegExp.prototype[@@split]` method
	      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	      //
	      // NOTE: This cannot be properly polyfilled in engines that don't support
	      // the 'y' flag.
	      function (regexp, limit) {
	        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	        if (res.done) return res.value;

	        var rx = _anObject(regexp);
	        var S = String(this);
	        var C = _speciesConstructor(rx, RegExp);

	        var unicodeMatching = rx.unicode;
	        var flags = (rx.ignoreCase ? 'i' : '') +
	                    (rx.multiline ? 'm' : '') +
	                    (rx.unicode ? 'u' : '') +
	                    (SUPPORTS_Y ? 'y' : 'g');

	        // ^(? + rx + ) is needed, in combination with some S slicing, to
	        // simulate the 'y' flag.
	        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	        if (lim === 0) return [];
	        if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	        var p = 0;
	        var q = 0;
	        var A = [];
	        while (q < S.length) {
	          splitter.lastIndex = SUPPORTS_Y ? q : 0;
	          var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	          var e;
	          if (
	            z === null ||
	            (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	          ) {
	            q = _advanceStringIndex(S, q, unicodeMatching);
	          } else {
	            A.push(S.slice(p, q));
	            if (A.length === lim) return A;
	            for (var i = 1; i <= z.length - 1; i++) {
	              A.push(z[i]);
	              if (A.length === lim) return A;
	            }
	            q = p = e;
	          }
	        }
	        A.push(S.slice(p));
	        return A;
	      }
	    ];
	  });

	  var TextView,
	      View$2,
	      utils$3,
	      indexOf$1 = [].indexOf;
	  View$2 = view;
	  utils$3 = utils_1;

	  var text = TextView = function () {
	    var TextView =
	    /*#__PURE__*/
	    function (_View) {
	      _inherits(TextView, _View);

	      function TextView() {
	        _classCallCheck(this, TextView);

	        return _possibleConstructorReturn(this, _getPrototypeOf(TextView).apply(this, arguments));
	      }

	      _createClass(TextView, [{
	        key: "render",
	        value: function render() {
	          var parsedText, text, textShadow, textStyles;

	          if (typeof this.attrs.text !== 'string') {
	            return this;
	          }

	          textStyles = (this.attrs.text_style || '').split('|');
	          text = this.attrs.text;

	          if (Array.isArray(this.attrs.spans) && this.attrs.spans.length > 0) {
	            parsedText = this.parseSpans(text, this.attrs.spans);
	            text = parsedText.map(function (item) {
	              var escapedText, spanName;
	              escapedText = utils$3.escapeHTML(item.text || '');

	              if (item.span != null && item.span.name === 'link' && item.span.url != null) {
	                return '<a href="' + encodeURI(item.span.url) + '" rel="external" target="_blank">' + escapedText + '</a>';
	              } else if (item.span != null && item.span.name != null) {
	                spanName = item.span.name;
	                return '<span data-name="' + spanName + '">' + escapedText + '</span>';
	              } else {
	                return escapedText;
	              }
	            });
	            text = text.join('');
	          } else {
	            text = utils$3.escapeHTML(text);
	          }

	          if (this.attrs.text_prevent_widow) {
	            this.el.innerHTML = text.replace(/\&nbsp;([^\s]+)$/, ' $1').replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
	          } else {
	            this.el.innerHTML = text;
	          } // Font family.


	          if (Array.isArray(this.attrs.font_family) && this.attrs.font_family.length > 0) {
	            this.el.style.fontFamily = this.attrs.font_family.join(', ');
	          } else {
	            this.el.style.fontFamily = 'inherit';
	          } // Text size.


	          if (this.attrs.text_size != null) {
	            this.el.style.fontSize = "".concat(this.attrs.text_size, "px");
	          } // Line height.


	          if (this.attrs.line_spacing_multiplier != null) {
	            this.el.style.lineHeight = this.attrs.line_spacing_multiplier;
	          } // Text color.


	          if (this.attrs.text_color != null) {
	            this.el.style.color = this.attrs.text_color;
	          } // Text styles.


	          if (indexOf$1.call(textStyles, 'bold') >= 0) {
	            this.el.style.fontWeight = 'bold';
	          }

	          if (indexOf$1.call(textStyles, 'italic') >= 0) {
	            this.el.style.fontStyle = 'italic';
	          } // Text shadow.


	          textShadow = this.getTextShadow();

	          if (textShadow != null) {
	            this.el.style.textShadow = "".concat(textShadow.dx, "px ").concat(textShadow.dy, "px ").concat(textShadow.radius, "px ").concat(textShadow.color);
	          } // Text alignment.


	          if (this.attrs.text_alignment === 'left') {
	            this.el.style.textAlign = 'left';
	          } else if (this.attrs.text_alignment === 'center') {
	            this.el.style.textAlign = 'center';
	          } else if (this.attrs.text_alignment === 'right') {
	            this.el.style.textAlign = 'right';
	          } // Max lines.


	          if (this.attrs.single_line === true || this.attrs.max_lines === 1) {
	            this.el.setAttribute('data-single-line', true);
	          } else if (typeof this.attrs.max_lines === 'number') {
	            this.el.style.display = '-webkit-box';
	            this.el.style.webkitLineClamp = this.attrs.max_lines;
	            this.el.style.webkitBoxOrient = 'vertical';
	          } // All caps.


	          if (this.attrs.text_all_caps === true) {
	            this.el.style.textTransform = 'uppercase';
	          }

	          return this;
	        }
	      }, {
	        key: "parseSpans",
	        value: function parseSpans(text) {
	          var spans = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	          var result;
	          result = [];

	          if (spans.length === 0) {
	            result.push({
	              text: text
	            });
	          } else if (spans[0].start > 0) {
	            result.push({
	              text: text.slice(0, spans[0].start)
	            });
	          }

	          spans.forEach(function (span, i) {
	            var endIndex, startIndex;
	            startIndex = span.start;
	            endIndex = span.end;
	            result.push({
	              text: text.slice(startIndex, endIndex),
	              span: span
	            });

	            if (i === spans.length - 1) {
	              if (endIndex < text.length) {
	                result.push({
	                  text: text.slice(endIndex, text.length)
	                });
	              }
	            } else if (endIndex < spans[i + 1].start) {
	              result.push({
	                text: text.slice(endIndex, spans[i + 1].start)
	              });
	            }
	          });
	          return result;
	        }
	      }, {
	        key: "getTextShadow",
	        value: function getTextShadow() {
	          var color, dx, dy, radius;

	          if (utils$3.isDefinedStr(this.attrs.text_shadow_color)) {
	            dx = typeof this.attrs.text_shadow_dx === 'number' ? this.attrs.text_shadow_dx : 0;
	            dy = typeof this.attrs.text_shadow_dy === 'number' ? this.attrs.text_shadow_dy : 0;
	            radius = typeof this.attrs.text_shadow_radius === 'number' ? this.attrs.text_shadow_radius : 0;
	            color = this.attrs.text_shadow_color;
	            return {
	              dx: dx,
	              dy: dy,
	              radius: radius,
	              color: color
	            };
	          }
	        }
	      }]);

	      return TextView;
	    }(View$2);
	    TextView.prototype.tagName = 'p';
	    TextView.prototype.className = 'incito__text-view';
	    return TextView;
	  }.call(commonjsGlobal$1);

	  var FlexLayout,
	      View$3,
	      allowedHostnames,
	      utils$4,
	      indexOf$2 = [].indexOf;
	  View$3 = view;
	  utils$4 = utils_1;
	  allowedHostnames = ['www.youtube.com', 'www.vimeo.com', 'video.twentythree.net'];

	  var videoEmbed = FlexLayout = function () {
	    var FlexLayout =
	    /*#__PURE__*/
	    function (_View) {
	      _inherits(FlexLayout, _View);

	      function FlexLayout() {
	        _classCallCheck(this, FlexLayout);

	        return _possibleConstructorReturn(this, _getPrototypeOf(FlexLayout).apply(this, arguments));
	      }

	      _createClass(FlexLayout, [{
	        key: "render",
	        value: function render() {
	          var linkEl, ref, src;

	          if (utils$4.isDefinedStr(this.attrs.src)) {
	            src = this.attrs.src;
	            linkEl = document.createElement('a');
	            linkEl.setAttribute('href', src);

	            if (ref = linkEl.hostname, indexOf$2.call(allowedHostnames, ref) >= 0) {
	              this.el.setAttribute('data-src', src);
	              this.lazyload = true;
	            }
	          }

	          return this;
	        }
	      }]);

	      return FlexLayout;
	    }(View$3);
	    FlexLayout.prototype.className = 'incito__video-embed-view';
	    FlexLayout.prototype.lazyload = false;
	    return FlexLayout;
	  }.call(commonjsGlobal$1);

	  var Video, View$4, utils$5;
	  View$4 = view;
	  utils$5 = utils_1;

	  var video = Video = function () {
	    var Video =
	    /*#__PURE__*/
	    function (_View) {
	      _inherits(Video, _View);

	      function Video() {
	        _classCallCheck(this, Video);

	        return _possibleConstructorReturn(this, _getPrototypeOf(Video).apply(this, arguments));
	      }

	      _createClass(Video, [{
	        key: "render",
	        value: function render() {
	          if (!utils$5.isDefinedStr(this.attrs.src)) {
	            return;
	          }

	          this.el.muted = true;
	          this.el.preload = 'metadata';
	          this.el.setAttribute('muted', '');
	          this.el.setAttribute('playsinline', 'true');
	          this.el.setAttribute('webkit-playsinline', 'true');
	          this.el.setAttribute('data-src', this.attrs.src);
	          this.el.setAttribute('data-mime', this.attrs.mime);

	          if (this.attrs.autoplay === true) {
	            this.el.autoplay = true;
	          }

	          if (this.attrs.loop === true) {
	            this.el.loop = true;
	          }

	          if (this.attrs.controls === true) {
	            this.el.controls = true;
	          }

	          return this;
	        }
	      }]);

	      return Video;
	    }(View$4);
	    Video.prototype.className = 'incito__video-view';
	    Video.prototype.tagName = 'video';
	    Video.prototype.lazyload = true;
	    return Video;
	  }.call(commonjsGlobal$1);

	  var AbsoluteLayout, View$5;
	  View$5 = view;

	  var absoluteLayout = AbsoluteLayout = function () {
	    var AbsoluteLayout =
	    /*#__PURE__*/
	    function (_View) {
	      _inherits(AbsoluteLayout, _View);

	      function AbsoluteLayout() {
	        _classCallCheck(this, AbsoluteLayout);

	        return _possibleConstructorReturn(this, _getPrototypeOf(AbsoluteLayout).apply(this, arguments));
	      }

	      _createClass(AbsoluteLayout, [{
	        key: "render",
	        value: function render() {
	          return this;
	        }
	      }]);

	      return AbsoluteLayout;
	    }(View$5);
	    AbsoluteLayout.prototype.className = 'incito__absolute-layout-view';
	    return AbsoluteLayout;
	  }.call(commonjsGlobal$1);

	  var FlexLayout$1,
	      View$6,
	      alignItemModes,
	      flexDirectionModes,
	      flexJustifyModes,
	      indexOf$3 = [].indexOf;
	  View$6 = view;
	  alignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
	  flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
	  flexDirectionModes = ['row', 'column'];

	  var flexLayout = FlexLayout$1 = function () {
	    var FlexLayout =
	    /*#__PURE__*/
	    function (_View) {
	      _inherits(FlexLayout, _View);

	      function FlexLayout() {
	        _classCallCheck(this, FlexLayout);

	        return _possibleConstructorReturn(this, _getPrototypeOf(FlexLayout).apply(this, arguments));
	      }

	      _createClass(FlexLayout, [{
	        key: "render",
	        value: function render() {
	          var ref, ref1, ref2;

	          if (ref = this.attrs.layout_flex_align_items, indexOf$3.call(alignItemModes, ref) >= 0) {
	            this.el.style.alignItems = this.attrs.layout_flex_align_items;
	            this.el.style.msAlignItems = this.attrs.layout_flex_align_items;
	          }

	          if (ref1 = this.attrs.layout_flex_justify_content, indexOf$3.call(flexJustifyModes, ref1) >= 0) {
	            this.el.style.justifyContent = this.attrs.layout_flex_justify_content;
	            this.el.style.msFlexPack = this.attrs.layout_flex_justify_content;
	          }

	          if (ref2 = this.attrs.layout_flex_direction, indexOf$3.call(flexDirectionModes, ref2) >= 0) {
	            this.el.style.flexDirection = this.attrs.layout_flex_direction;
	            this.el.style.msFlexDirection = this.attrs.layout_flex_direction;
	          }

	          return this;
	        }
	      }]);

	      return FlexLayout;
	    }(View$6);
	    FlexLayout.prototype.className = 'incito__flex-layout-view';
	    return FlexLayout;
	  }.call(commonjsGlobal$1);

	  var AbsoluteLayout$1, FlexLayout$2, ImageView, Incito, MicroEvent, TextView$1, VideoEmbedView, VideoView, View$7, utils$6, views;
	  MicroEvent = microevent;
	  utils$6 = utils_1;
	  View$7 = view;
	  ImageView = image;
	  TextView$1 = text;
	  VideoEmbedView = videoEmbed;
	  VideoView = video;
	  AbsoluteLayout$1 = absoluteLayout;
	  FlexLayout$2 = flexLayout;
	  views = {
	    View: View$7,
	    ImageView: ImageView,
	    TextView: TextView$1,
	    VideoEmbedView: VideoEmbedView,
	    VideoView: VideoView,
	    AbsoluteLayout: AbsoluteLayout$1,
	    FlexLayout: FlexLayout$2
	  };

	  Incito =
	  /*#__PURE__*/
	  function () {
	    function Incito(containerEl) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      _classCallCheck(this, Incito);

	      this.containerEl = containerEl;
	      this.options = options;
	      this.el = document.createElement('div');
	      this.ids = {};
	      this.incito = this.options.incito || {};
	      this.views = this.flattenViews([], this.incito.root_view);
	      this.viewIndex = 0;
	      this.lazyloadables = [];
	      this.lazyloader = utils$6.throttle(this.lazyload.bind(this), 150);
	      return;
	    }

	    _createClass(Incito, [{
	      key: "start",
	      value: function start() {
	        var _this = this;

	        var _render, renders, requestAnimFrame, requestAnimFrameFallback;

	        requestAnimFrameFallback = function requestAnimFrameFallback(fn) {
	          return window.setTimeout(fn, 1000 / 60);
	        };

	        requestAnimFrame = 'requestAnimationFrame' in window ? window.requestAnimationFrame : requestAnimFrameFallback;
	        renders = 0;

	        _render = function render() {
	          _this.render();

	          if (renders === 0) {
	            _this.lazyload(100);
	          }

	          renders++;

	          if (_this.viewIndex < _this.views.length - 1) {
	            requestAnimFrame(_render);
	          }
	        };

	        this.el.className = 'incito';

	        if (this.incito.locale != null) {
	          this.el.setAttribute('lang', this.incito.locale);
	        }

	        this.loadFonts(this.incito.font_assets);
	        this.applyTheme(this.incito.theme);
	        this.containerEl.appendChild(this.el);
	        requestAnimFrame(_render);
	        window.addEventListener('scroll', this.lazyloader, false);
	        window.addEventListener('resize', this.lazyloader, false);
	        return this;
	      }
	    }, {
	      key: "destroy",
	      value: function destroy() {
	        this.containerEl.removeChild(this.el);
	        window.removeEventListener('scroll', this.lazyloader, false);
	        window.removeEventListener('resize', this.lazyloader, false);
	        this.trigger('destroyed');
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var attrs, i, item, match, ref, view;
	        i = this.viewIndex;

	        while (i < this.viewIndex + 100 && i < this.views.length - 1) {
	          item = this.views[i];
	          attrs = item.attrs;
	          match = (ref = views[attrs.view_name]) != null ? ref : View$7;
	          view = new match(attrs).render();

	          if (attrs.id != null && typeof attrs.meta === 'object') {
	            this.ids[attrs.id] = attrs.meta;
	          }

	          if (view.lazyload === true) {
	            this.lazyloadables.push(view.el);
	          }

	          item.view = view;

	          if (item.parent != null && item.parent.view != null) {
	            item.parent.view.el.appendChild(view.el);
	          } else {
	            this.el.appendChild(view.el);
	          }

	          i++;
	        }

	        this.viewIndex = i;
	      }
	    }, {
	      key: "applyTheme",
	      value: function applyTheme() {
	        var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        if (Array.isArray(theme.font_family)) {
	          this.el.style.fontFamily = theme.font_family.join(', ');
	        }

	        if (utils$6.isDefinedStr(theme.background_color)) {
	          this.el.style.backgroundColor = theme.background_color;
	        }

	        if (utils$6.isDefinedStr(theme.text_color)) {
	          this.el.style.color = theme.text_color;
	        }

	        if (typeof theme.line_spacing_multiplier === 'number') {
	          this.el.style.lineHeight = theme.line_spacing_multiplier;
	        }
	      }
	    }, {
	      key: "flattenViews",
	      value: function flattenViews(views, attrs, parent) {
	        var _this2 = this;

	        var item;
	        item = {
	          attrs: attrs,
	          view: null,
	          parent: parent
	        };
	        views.push(item);

	        if (Array.isArray(attrs.child_views)) {
	          attrs.child_views.forEach(function (childAttrs) {
	            return _this2.flattenViews(views, childAttrs, item);
	          });
	        }

	        return views;
	      }
	    }, {
	      key: "loadFonts",
	      value: function loadFonts() {
	        var fontAssets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        var font, key, ref, ref1, styleEl, text, urls, value;

	        if ('FontFace' in window) {
	          for (key in fontAssets) {
	            value = fontAssets[key];
	            urls = value.src.map(function (src) {
	              return "url(".concat(src[1], ")");
	            }).join(', ');
	            font = new FontFace(key, urls, {
	              style: (ref = value.style) != null ? ref : 'normal',
	              weight: (ref1 = value.weight) != null ? ref1 : 'normal',
	              display: 'swap'
	            });
	            document.fonts.add(font);
	            font.load();
	          }
	        } else {
	          styleEl = document.createElement('style');

	          for (key in fontAssets) {
	            value = fontAssets[key];
	            urls = value.src.map(function (src) {
	              return "url('".concat(src[1], "') format('").concat(src[0], "')");
	            }).join(', ');
	            text = "@font-face {\n    font-family: '".concat(key, "';\n    font-display: swap;\n    src: ").concat(urls, ";\n}");
	            styleEl.appendChild(document.createTextNode(text));
	          }

	          document.head.appendChild(styleEl);
	        }
	      }
	    }, {
	      key: "isInsideViewport",
	      value: function isInsideViewport(el, threshold) {
	        var rect, ref, windowHeight;
	        windowHeight = (ref = window.innerHeight) != null ? ref : document.documentElement.clientHeight;
	        threshold = threshold != null ? threshold : windowHeight;
	        rect = el.getBoundingClientRect();
	        return rect.top <= windowHeight + threshold && rect.top + rect.height >= -threshold;
	      }
	    }, {
	      key: "lazyload",
	      value: function lazyload(threshold) {
	        var _this3 = this;

	        this.lazyloadables = this.lazyloadables.filter(function (el) {
	          if (_this3.isInsideViewport(el, threshold)) {
	            _this3.revealElement(el);

	            return false;
	          } else {
	            return true;
	          }
	        });
	      }
	    }, {
	      key: "revealElement",
	      value: function revealElement(el) {
	        var iframeEl, sourceEl, src;
	        src = el.getAttribute('data-src');

	        if (el.tagName.toLowerCase() === 'img') {
	          el.addEventListener('load', function () {
	            el.className += ' incito--loaded';
	          });
	          el.setAttribute('src', src);
	        } else if (el.tagName.toLowerCase() === 'video') {
	          sourceEl = document.createElement('source');
	          sourceEl.setAttribute('src', src);
	          sourceEl.setAttribute('type', el.getAttribute('data-mime'));
	          el.appendChild(sourceEl);
	        } else if (/incito__video-embed-view/gi.test(el.className)) {
	          iframeEl = document.createElement('iframe');
	          iframeEl.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
	          iframeEl.setAttribute('src', src);
	          el.appendChild(iframeEl);
	        } else {
	          el.style.backgroundImage = "url(".concat(src, ")");
	        }
	      }
	    }]);

	    return Incito;
	  }();

	  MicroEvent.mixin(Incito);
	  var incito = Incito;

	  return incito;

	}));

	});

	var IncitoPublicationEventTracking, MicroEvent$a;
	MicroEvent$a = microevent;

	IncitoPublicationEventTracking =
	/*#__PURE__*/
	function () {
	  function IncitoPublicationEventTracking(eventTracker, id, _ref) {
	    var pagedPublicationId = _ref.pagedPublicationId;

	    _classCallCheck(this, IncitoPublicationEventTracking);

	    this.eventTracker = eventTracker;
	    this.id = id;
	    this.pagedPublicationId = pagedPublicationId;
	    return;
	  }

	  _createClass(IncitoPublicationEventTracking, [{
	    key: "trackOpened",
	    value: function trackOpened(properties) {
	      if (this.eventTracker == null) {
	        return this;
	      }

	      this.eventTracker.trackIncitoPublicationOpened({
	        'ip.id': this.id,
	        'pp.vt': this.pagedPublicationId ? this.eventTracker.createViewToken(this.pagedPublicationId) : void 0,
	        'vt': this.eventTracker.createViewToken(this.id)
	      });
	      return this;
	    }
	  }]);

	  return IncitoPublicationEventTracking;
	}();

	MicroEvent$a.mixin(IncitoPublicationEventTracking);
	var eventTracking$1 = IncitoPublicationEventTracking;

	var EventTracking$1, Incito, MicroEvent$b, Viewer$1;
	Incito = incito;
	MicroEvent$b = microevent;
	EventTracking$1 = eventTracking$1;

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
	    this._eventTracking = new EventTracking$1(this.options.eventTracker, this.options.id, {
	      pagedPublicationId: this.options.pagedPublicationId
	    });
	    return;
	  }

	  _createClass(Viewer, [{
	    key: "start",
	    value: function start() {
	      this.incito.start();
	      this.el.classList.add('sgn-incito--started');

	      this._eventTracking.trackOpened();

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

	MicroEvent$b.mixin(Viewer$1);
	var viewer$1 = Viewer$1;

	var isEnum = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var es7_object_values = {

	};

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
	    this.isScrolling = false;

	    if (this.progressEl != null) {
	      this.progressEl.textContent = "0 %";
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
	      var _this2 = this;

	      var progress, rect, winHeight;
	      winHeight = window.innerHeight;
	      rect = this.viewer.el.getBoundingClientRect();
	      progress = Math.min(100, Math.round(Math.abs(rect.top - winHeight) / rect.height * 100));
	      clearTimeout(this.scrollTimeout);
	      this.scrollTimeout = setTimeout(function () {
	        _this2.isScrolling = false;

	        _this2.viewer.el.classList.remove('sgn-incito--scrolling');
	      }, 1000);

	      if (this.isScrolling === false) {
	        this.viewer.el.classList.add('sgn-incito--scrolling');
	        this.isScrolling = true;
	      }

	      this.progressEl.textContent = "".concat(progress, " %");
	      this.viewer.trigger('progress', {
	        progress: progress
	      });
	    }
	  }]);

	  return Controls;
	}();

	var incito$1 = "query GetIncitoPublication($id: ID!, $deviceCategory: DeviceCategory!, $orientation: Orientation!, $pixelRatio: Float!, $pointer: Pointer!, $maxWidth: Int!, $versionsSupported: [String!]!, $locale: LocaleCode, $time: DateTime, $featureLabels: [IncitoFeatureLabelInput!]) {\n  node(id: $id) {\n    ... on IncitoPublication {\n      id\n      incito(deviceCategory: $deviceCategory, orientation: $orientation, pixelRatio: $pixelRatio, pointer: $pointer, maxWidth: $maxWidth, versionsSupported: $versionsSupported, locale: $locale, time: $time, featureLabels: $featureLabels)\n    }\n  }\n}";

	var incito$2 = /*#__PURE__*/Object.freeze({
		default: incito$1
	});

	var require$$4 = getCjsExportFromNamespace(incito$2);

	var Bootstrapper$1, Controls$2, SGN$g, clientLocalStorage$2, schema, util$2;
	util$2 = util_1;
	SGN$g = core;
	Controls$2 = controls$1;
	clientLocalStorage$2 = clientLocal;
	schema = require$$4;

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
	    this.time = this.getTime();
	    this.locale = this.getLocale();
	    this.maxWidth = this.getMaxWidth();
	    this.featureLabels = this.getFeatureLabels();
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
	    key: "getTime",
	    value: function getTime() {
	      return new Date().toISOString();
	    }
	  }, {
	    key: "getLocale",
	    value: function getLocale() {
	      var i, len, locale, localeChain, prefLocale;
	      localeChain = [];
	      locale = null;

	      if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
	        localeChain = localeChain.concat(navigator.languages);
	      } else if (typeof navigator.language === 'string' && navigator.language.length > 0) {
	        localeChain.push(navigator.language);
	      } else if (typeof navigator.browserLanguage === 'string' && navigator.browserLanguage.length > 0) {
	        localeChain.push(navigator.browserLanguage);
	      }

	      localeChain.push('en_US');

	      for (i = 0, len = localeChain.length; i < len; i++) {
	        prefLocale = localeChain[i];

	        if (prefLocale == null) {
	          continue;
	        }

	        prefLocale = prefLocale.replace('-', '_');

	        if (/[a-z][a-z]_[A-Z][A-Z]/g.test(prefLocale)) {
	          locale = prefLocale;
	          break;
	        }
	      }

	      return locale;
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
	    key: "getFeatureLabels",
	    value: function getFeatureLabels() {
	      var featureLabels;
	      featureLabels = clientLocalStorage$2.get('incito-feature-labels');

	      if (Array.isArray(featureLabels) === false) {
	        featureLabels = [];
	      }

	      return featureLabels;
	    }
	  }, {
	    key: "anonymizeFeatureLabels",
	    value: function anonymizeFeatureLabels() {
	      var count, vector;
	      count = this.featureLabels.length;
	      vector = this.featureLabels.reduce(function (acc, cur) {
	        if (!acc[cur]) {
	          acc[cur] = {
	            key: cur,
	            value: 0
	          };
	        }

	        acc[cur].value++;
	        return acc;
	      }, {});
	      return Object.values(vector).map(function (featureLabel) {
	        return {
	          key: featureLabel.key,
	          value: Math.round(featureLabel.value / count * 100) / 100
	        };
	      });
	    }
	  }, {
	    key: "fetch",
	    value: function fetch(callback) {
	      var _this = this;

	      var data;
	      callback = callback.bind(this);
	      data = SGN$g.storage.session.get(this.storageKey);

	      if (data != null && data.response != null && data.width === this.maxWidth) {
	        return callback(null, data.response);
	      }

	      SGN$g.GraphKit.request({
	        query: schema,
	        operationName: 'GetIncitoPublication',
	        variables: {
	          id: this.options.id,
	          deviceCategory: 'DEVICE_CATEGORY_' + this.deviceCategory.toUpperCase(),
	          pixelRatio: this.pixelRatio,
	          pointer: 'POINTER_' + this.pointer.toUpperCase(),
	          orientation: 'ORIENTATION_' + this.orientation.toUpperCase(),
	          time: this.time,
	          locale: this.locale,
	          maxWidth: this.maxWidth,
	          versionsSupported: this.versionsSupported,
	          featureLabels: this.anonymizeFeatureLabels(this.featureLabels)
	        }
	      }, function (err, res) {
	        if (err != null) {
	          callback(err);
	        } else if (res.errors && res.errors.length > 0) {
	          callback(util$2.error(new Error(), 'graph request contained errors'));
	        } else {
	          callback(null, res);
	          SGN$g.storage.session.set(_this.storageKey, {
	            width: _this.maxWidth,
	            response: res
	          });
	        }
	      });
	    }
	  }, {
	    key: "createViewer",
	    value: function createViewer(data) {
	      var controls, self, viewer;

	      if (data.incito == null) {
	        throw util$2.error(new Error(), 'you need to supply valid Incito to create a viewer');
	      }

	      viewer = new SGN$g.IncitoPublicationKit.Viewer(this.options.el, {
	        id: this.options.id,
	        pagedPublicationId: this.options.pagedPublicationId,
	        incito: data.incito,
	        eventTracker: this.options.eventTracker
	      });
	      controls = new Controls$2(viewer);
	      self = this; // Persist clicks on feature labels for later anonymization.

	      SGN$g.CoreUIKit.on(viewer.el, 'click', '.incito__view[data-feature-labels]', function () {
	        var featureLabels;
	        featureLabels = this.getAttribute('data-feature-labels').split(',');
	        self.featureLabels = self.featureLabels.concat(featureLabels);

	        while (self.featureLabels.length > 1000) {
	          self.featureLabels.shift();
	        }

	        clientLocalStorage$2.set('incito-feature-labels', self.featureLabels);
	      });
	      return viewer;
	    }
	  }]);

	  return Bootstrapper;
	}();

	var incitoPublication = {
	  Viewer: viewer$1,
	  Bootstrapper: bootstrapper$1
	};
	var incitoPublication_1 = incitoPublication.Viewer;
	var incitoPublication_2 = incitoPublication.Bootstrapper;

	'use strict';






	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      if (!rx.global) return _regexpExecAbstract(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var es6_regexp_match = {

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

	  if ('object' !== "undefined" && module.exports) {
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

	var Gator, MicroEvent$c, Mustache$2, Popover, keyCodes$2, template;
	MicroEvent$c = microevent;
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

	MicroEvent$c.mixin(Popover);
	var popover = Popover;

	var Popover$1;
	Popover$1 = popover;

	var singleChoicePopover = function singleChoicePopover(ctx, callback) {
	  var items, popover;
	  items = ctx.items;
	  popover = null;

	  if (items.length === 1) {
	    callback(items[0]);
	  } else if (items.length > 1) {
	    popover = new Popover$1({
	      header: ctx.header,
	      x: ctx.x,
	      y: ctx.y,
	      singleChoiceItems: items
	    });
	    popover.bind('selected', function (e) {
	      callback(items[e.index]);
	      popover.destroy();
	    });
	    popover.bind('destroyed', function () {
	      ctx.el.focus();
	    });
	    ctx.el.appendChild(popover.el);
	    popover.render().el.focus();
	  }

	  return {
	    destroy: function destroy() {
	      if (popover != null) {
	        popover.destroy();
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
	var coreUi_1 = coreUi.OfferDetails;
	var coreUi_2 = coreUi.Popover;
	var coreUi_3 = coreUi.singleChoicePopover;
	var coreUi_4 = coreUi.on;
	var coreUi_5 = coreUi.off;

	var SGN$h, appKey, config$2, isBrowser, scriptEl, session$2, trackId;
	isBrowser = util_1.isBrowser;
	SGN$h = core; // Expose storage backends.

	SGN$h.storage = {
	  local: clientLocal,
	  session: clientSession,
	  cookie: clientCookie
	}; // Expose the different kits.

	SGN$h.AssetsKit = assets;
	SGN$h.EventsKit = events;
	SGN$h.GraphKit = graph;
	SGN$h.CoreKit = core$1;
	SGN$h.PagedPublicationKit = pagedPublication;
	SGN$h.IncitoPublicationKit = incitoPublication;
	SGN$h.CoreUIKit = coreUi; // Set the core session from the cookie store if possible.

	session$2 = SGN$h.storage.cookie.get('session');

	if (typeof session$2 === 'object') {
	  SGN$h.config.set({
	    coreSessionToken: session$2.token,
	    coreSessionClientId: session$2.client_id
	  });
	}

	SGN$h.client = function () {
	  var id;
	  id = SGN$h.storage.local.get('client-id');

	  if (id != null ? id.data : void 0) {
	    id = id.data;
	  }

	  if (id == null) {
	    id = SGN$h.util.uuid();
	    SGN$h.storage.local.set('client-id', id);
	  }

	  return {
	    id: id
	  };
	}(); // Listen for changes in the config.


	SGN$h.config.bind('change', function (changedAttributes) {
	  var eventTracker;
	  eventTracker = changedAttributes.eventTracker;

	  if (eventTracker != null) {
	    eventTracker.trackClientSessionOpened();
	  }
	});

	if (isBrowser()) {
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
	      config$2.eventTracker = new SGN$h.EventsKit.Tracker({
	        trackId: trackId
	      });
	    }

	    SGN$h.config.set(config$2);
	  }
	}

	var coffeescript = SGN$h;

	return coffeescript;

}));
//# sourceMappingURL=sgn-sdk.js.map
