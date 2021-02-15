(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Incito = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getDefaultExportFromNamespaceIfPresent (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
	}

	function getDefaultExportFromNamespaceIfNotNamed (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	function commonjsRequire (target) {
		throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  (function () { return this; })() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	'use strict';
	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global$1, key, value);
	  } catch (error) {
	    global$1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global$1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global$1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var isPure = false;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.8.3',
	  mode: isPure ? 'pure' : 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global$1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) {
	      createNonEnumerableProperty(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }
	  if (O === global$1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global$1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace])
	    : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$1;
	  } else if (STATIC) {
	    target = global$1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	'use strict';


	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	'use strict';





	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var es_array_join = {

	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$1 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$1(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$1(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$1(3)
	};

	'use strict';










	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty = objectDefineProperty.f;
	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global$1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;

	// Opera ~12 has broken Object#toString
	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = it.slice(2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper
	      // check on 1..constructor(foo) case
	      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
	        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };
	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys$1.length > j; j++) {
	    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
	      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global$1, NUMBER, NumberWrapper);
	}

	var es_number_constructor = {

	};

	var check$1 = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$2 =
	  // eslint-disable-next-line no-undef
	  check$1(typeof globalThis == 'object' && globalThis) ||
	  check$1(typeof window == 'object' && window) ||
	  check$1(typeof self == 'object' && self) ||
	  check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  (function () { return this; })() || Function('return this')();

	var fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors$1 = !fails$1(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	'use strict';
	var nativePropertyIsEnumerable$1 = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG$1 = getOwnPropertyDescriptor$3 && !nativePropertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$5 = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$3(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable$1;

	var objectPropertyIsEnumerable$1 = {
		f: f$5
	};

	var createPropertyDescriptor$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString$1 = {}.toString;

	var classofRaw$1 = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var split$1 = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject$1 = fails$1(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw$1(it) == 'String' ? split$1.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$1 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject$1 = function (it) {
	  return indexedObject$1(requireObjectCoercible$1(it));
	};

	var isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive$1 = function (input, PREFERRED_STRING) {
	  if (!isObject$1(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$1(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;

	var has$2 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var document$2 = global$2.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$1(document$2) && isObject$1(document$2.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$2.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine$1 = !descriptors$1 && !fails$1(function () {
	  return Object.defineProperty(documentCreateElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$6 = descriptors$1 ? nativeGetOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$1(O);
	  P = toPrimitive$1(P, true);
	  if (ie8DomDefine$1) try {
	    return nativeGetOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (has$2(O, P)) return createPropertyDescriptor$1(!objectPropertyIsEnumerable$1.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor$1 = {
		f: f$6
	};

	var replacement$1 = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data$1[normalize$1(feature)];
	  return value == POLYFILL$1 ? true
	    : value == NATIVE$1 ? false
	    : typeof detection == 'function' ? fails$1(detection)
	    : !!detection;
	};

	var normalize$1 = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement$1, '.').toLowerCase();
	};

	var data$1 = isForced$1.data = {};
	var NATIVE$1 = isForced$1.NATIVE = 'N';
	var POLYFILL$1 = isForced$1.POLYFILL = 'P';

	var isForced_1$1 = isForced$1;

	var path$1 = {};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
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

	var anObject$1 = function (it) {
	  if (!isObject$1(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty$1 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$7 = descriptors$1 ? nativeDefineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$1(O);
	  P = toPrimitive$1(P, true);
	  anObject$1(Attributes);
	  if (ie8DomDefine$1) try {
	    return nativeDefineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty$1 = {
		f: f$7
	};

	var createNonEnumerableProperty$1 = descriptors$1 ? function (object, key, value) {
	  return objectDefineProperty$1.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	'use strict';

	var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor$1.f;






	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return NativeConstructor.apply(this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export$1 = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$2 : STATIC ? global$2[TARGET] : (global$2[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$1 : path$1[TARGET] || (path$1[TARGET] = {});
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced_1$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && has$2(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$4(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$2);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$1(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!has$2(path$1, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty$1(path$1, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      path$1[VIRTUAL_PROTOTYPE][key] = sourceProperty;
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty$1(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw$1(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible$1(argument));
	};

	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger$1 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil$1)(argument);
	};

	var min$2 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min$2(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	'use strict';




	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive$1(key);
	  if (propertyKey in object) objectDefineProperty$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	var isPure$1 = true;

	var setGlobal$1 = function (key, value) {
	  try {
	    createNonEnumerableProperty$1(global$2, key, value);
	  } catch (error) {
	    global$2[key] = value;
	  } return value;
	};

	var SHARED$1 = '__core-js_shared__';
	var store$2 = global$2[SHARED$1] || setGlobal$1(SHARED$1, {});

	var sharedStore$1 = store$2;

	var shared$1 = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore$1[key] || (sharedStore$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.8.3',
	  mode: isPure$1 ? 'pure' : 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var postfix$1 = Math.random();

	var uid$1 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$1(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared$1('wks');
	var Symbol$1 = global$2.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol = function (name) {
	  if (!has$2(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has$2(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var aFunction$2 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$1 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$2(path$1[namespace]) || aFunction$2(global$2[namespace])
	    : path$1[namespace] && path$1[namespace][method] || global$2[namespace] && global$2[namespace][method];
	};

	var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

	var process = global$2.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails$1(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	'use strict';












	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails$1(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$1(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export$1({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength$1(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var es_array_concat = {

	};

	var entryVirtual = function (CONSTRUCTOR) {
	  return path$1[CONSTRUCTOR + 'Prototype'];
	};

	var concat = entryVirtual('Array').concat;

	var ArrayPrototype = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat : own;
	};

	var concat$1 = concat_1;

	var concat$2 = concat$1;

	var addToUnscopables = function () { /* empty */ };

	var iterators = {};

	var functionToString$1 = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore$1.inspectSource != 'function') {
	  sharedStore$1.inspectSource = function (it) {
	    return functionToString$1.call(it);
	  };
	}

	var inspectSource$1 = sharedStore$1.inspectSource;

	var WeakMap$2 = global$2.WeakMap;

	var nativeWeakMap$1 = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource$1(WeakMap$2));

	var keys$2 = shared$1('keys');

	var sharedKey$1 = function (key) {
	  return keys$2[key] || (keys$2[key] = uid$1(key));
	};

	var hiddenKeys$2 = {};

	var WeakMap$3 = global$2.WeakMap;
	var set$1, get$1, has$3;

	var enforce$1 = function (it) {
	  return has$3(it) ? get$1(it) : set$1(it, {});
	};

	var getterFor$1 = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$1(it) || (state = get$1(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap$1) {
	  var store$3 = sharedStore$1.state || (sharedStore$1.state = new WeakMap$3());
	  var wmget$1 = store$3.get;
	  var wmhas$1 = store$3.has;
	  var wmset$1 = store$3.set;
	  set$1 = function (it, metadata) {
	    metadata.facade = it;
	    wmset$1.call(store$3, it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return wmget$1.call(store$3, it) || {};
	  };
	  has$3 = function (it) {
	    return wmhas$1.call(store$3, it);
	  };
	} else {
	  var STATE$1 = sharedKey$1('state');
	  hiddenKeys$2[STATE$1] = true;
	  set$1 = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE$1, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return has$2(it, STATE$1) ? it[STATE$1] : {};
	  };
	  has$3 = function (it) {
	    return has$2(it, STATE$1);
	  };
	}

	var internalState$1 = {
	  set: set$1,
	  get: get$1,
	  has: has$3,
	  enforce: enforce$1,
	  getterFor: getterFor$1
	};

	var correctPrototypeGetter = !fails$1(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey$1('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has$2(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	'use strict';







	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails$1(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype[ITERATOR].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ((!isPure$1 || NEW_ITERATOR_PROTOTYPE) && !has$2(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty$1(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var max$1 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger$1(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$3(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$1($this);
	    var length = toLength$1(O.length);
	    var index = toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes$1 = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var indexOf$1 = arrayIncludes$1.indexOf;


	var objectKeysInternal$1 = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$2(hiddenKeys$2, key) && has$2(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$2(O, key = names[i++])) {
	    ~indexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$1 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	var objectKeys$1 = Object.keys || function keys(O) {
	  return objectKeysInternal$1(O, enumBugKeys$1);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	var objectDefineProperties$1 = descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$1(O);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty$1.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html$1 = getBuiltIn$1('document', 'documentElement');

	var GT$1 = '>';
	var LT$1 = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT$1 = 'script';
	var IE_PROTO$2 = sharedKey$1('IE_PROTO');

	var EmptyConstructor$1 = function () { /* empty */ };

	var scriptTag$1 = function (content) {
	  return LT$1 + SCRIPT$1 + GT$1 + content + LT$1 + '/' + SCRIPT$1 + GT$1;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX$1 = function (activeXDocument) {
	  activeXDocument.write(scriptTag$1(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame$1 = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT$1 + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$1.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag$1('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument$1;
	var NullProtoObject$1 = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument$1 = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject$1 = activeXDocument$1 ? NullProtoObjectViaActiveX$1(activeXDocument$1) : NullProtoObjectViaIFrame$1();
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject$1[PROTOTYPE$1][enumBugKeys$1[length]];
	  return NullProtoObject$1();
	};

	hiddenKeys$2[IE_PROTO$2] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate$1 = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor$1[PROTOTYPE$1] = anObject$1(O);
	    result = new EmptyConstructor$1();
	    EmptyConstructor$1[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$2] = O;
	  } else result = NullProtoObject$1();
	  return Properties === undefined ? result : objectDefineProperties$1(result, Properties);
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw$1 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw$1(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	'use strict';



	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var defineProperty$1 = objectDefineProperty$1.f;





	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has$2(target, TO_STRING_TAG$2)) {
	      defineProperty$1(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !toStringTagSupport) {
	      createNonEnumerableProperty$1(target, 'toString', objectToString);
	    }
	  }
	};

	'use strict';
	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate$1(IteratorPrototype$1, { next: createPropertyDescriptor$1(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype$1 = function (it) {
	  if (!isObject$1(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf$1 = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$1(O);
	    aPossiblePrototype$1(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var redefine$1 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$1(target, key, value);
	};

	'use strict';












	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (!isPure$1 && objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf$1) {
	          objectSetPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty$1(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (isPure$1) iterators[TO_STRING_TAG] = returnThis$2;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((!isPure$1 || FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty$1(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$1(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	'use strict';






	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState$1.set;
	var getInternalState = internalState$1.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$1(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global$2[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
	    createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	  }
	  iterators[COLLECTION_NAME] = iterators.Array;
	}

	var web_domCollections_iterator = {

	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
	var createMethod$3 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject$1(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength$1(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push.call(target, value); // filterOut
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$3(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$3(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$3(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$3(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$3(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$3(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$3(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$3(7)
	};

	'use strict';


	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$1(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty$2 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has$2(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has$2(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has$2(options, 0) ? options[0] : thrower;
	  var argument1 = has$2(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails$1(function () {
	    if (ACCESSORS && !descriptors$1) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty$2(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	'use strict';
	var $forEach = arrayIteration.forEach;



	var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD$1 || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	'use strict';



	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	_export$1({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var es_array_forEach = {

	};

	var forEach = entryVirtual('Array').forEach;

	var forEach$1 = forEach;

	var ArrayPrototype$1 = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.forEach)
	    // eslint-disable-next-line no-prototype-builtins
	    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
	};

	var forEach$2 = forEach_1;

	'use strict';

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_array_filter = {

	};

	var filter = entryVirtual('Array').filter;

	var ArrayPrototype$2 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.filter) ? filter : own;
	};

	var filter$1 = filter_1;

	var filter$2 = filter$1;

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	_export$1({ target: 'Array', stat: true }, {
	  isArray: isArray
	});

	var es_array_isArray = {

	};

	var isArray$1 = path$1.Array.isArray;

	var isArray$2 = isArray$1;

	var isArray$3 = isArray$2;

	'use strict';











	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES$2 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$2 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$1(this);
	    var length = toLength$1(O.length);
	    var k = toAbsoluteIndex$1(start, length);
	    var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$1(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var es_array_slice = {

	};

	var slice = entryVirtual('Array').slice;

	var ArrayPrototype$3 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.slice) ? slice : own;
	};

	var slice$1 = slice_1;

	var slice$2 = slice$1;

	'use strict';

	var $map = arrayIteration.map;



	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');
	// FF49- issue
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$3 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_array_map = {

	};

	var map = entryVirtual('Array').map;

	var ArrayPrototype$4 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.map) ? map : own;
	};

	var map$1 = map_1;

	var map$2 = map$1;

	'use strict';

	var $indexOf = arrayIncludes$1.indexOf;



	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict$1('indexOf');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	_export$1({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$4 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_array_indexOf = {

	};

	var indexOf$2 = entryVirtual('Array').indexOf;

	var ArrayPrototype$5 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.indexOf) ? indexOf$2 : own;
	};

	var indexOf$3 = indexOf_1;

	var indexOf$4 = indexOf$3;

	'use strict';










	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

	var max$3 = Math.max;
	var min$4 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$5 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength$1(O.length);
	    var actualStart = toAbsoluteIndex$1(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$4(max$3(toInteger$1(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var es_array_splice = {

	};

	var splice = entryVirtual('Array').splice;

	var ArrayPrototype$6 = Array.prototype;

	var splice_1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.splice) ? splice : own;
	};

	var splice$1 = splice_1;

	var splice$2 = splice$1;

	'use strict';



	var slice$3 = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction$1(this);
	  var partArgs = slice$3.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice$3.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };
	  if (isObject$1(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	_export$1({ target: 'Function', proto: true }, {
	  bind: functionBind
	});

	var es_function_bind = {

	};

	var bind = entryVirtual('Function').bind;

	var FunctionPrototype = Function.prototype;

	var bind_1 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind : own;
	};

	var bind$1 = bind_1;

	var bind$2 = bind$1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	_export$1({ target: 'Object', stat: true, forced: !descriptors$1, sham: !descriptors$1 }, {
	  defineProperty: objectDefineProperty$1.f
	});

	var es_object_defineProperty = {

	};

	var defineProperty_1 = createCommonjsModule(function (module) {
	var Object = path$1.Object;

	var defineProperty = module.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$3 = defineProperty_1;

	var defineProperty$4 = defineProperty$3;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$4(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	// `Date.now` method
	// https://tc39.es/ecma262/#sec-date.now
	_export$1({ target: 'Date', stat: true }, {
	  now: function now() {
	    return new Date().getTime();
	  }
	});

	var es_date_now = {

	};

	var now = path$1.Date.now;

	var now$1 = now;

	var now$2 = now$1;

	var slice$4 = [].slice;
	var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout /* , ...arguments */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice$4.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	};

	// ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	_export$1({ global: true, bind: true, forced: MSIE }, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global$2.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global$2.setInterval)
	});

	var web_timers = {

	};

	var setTimeout = path$1.setTimeout;

	var setTimeout$1 = setTimeout;

	'use strict';


	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	'use strict';



	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	'use strict';



	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	'use strict';



	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var es_regexp_exec = {

	};

	var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid$1 = nativeSymbol$1
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore$1 = shared('wks');
	var Symbol$2 = global$1.Symbol;
	var createWellKnownSymbol$1 = useSymbolAsUid$1 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid;

	var wellKnownSymbol$1 = function (name) {
	  if (!has(WellKnownSymbolsStore$1, name)) {
	    if (nativeSymbol$1 && has(Symbol$2, name)) WellKnownSymbolsStore$1[name] = Symbol$2[name];
	    else WellKnownSymbolsStore$1[name] = createWellKnownSymbol$1('Symbol.' + name);
	  } return WellKnownSymbolsStore$1[name];
	};

	'use strict';
	// TODO: Remove from `core-js@4` since it's moved to entry points







	var SPECIES$3 = wellKnownSymbol$1('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
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

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	var REPLACE = wellKnownSymbol$1('replace');
	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol$1(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(
	      REPLACE_SUPPORTS_NAMED_GROUPS &&
	      REPLACE_KEEPS_$0 &&
	      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    )) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$4(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$4(true)
	};

	'use strict';
	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$1 = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var floor$2 = Math.floor;
	var replace = ''.replace;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$1(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace.call(replacement, symbols, function (match, ch) {
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
	          var f = floor$2(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	'use strict';









	var max$4 = Math.max;
	var min$5 = Math.min;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return replacer !== undefined
	        ? replacer.call(searchValue, O, replaceValue)
	        : nativeReplace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      if (
	        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
	        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
	      ) {
	        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	        if (res.done) return res.value;
	      }

	      var rx = anObject(regexp);
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
	        var result = regexpExecAbstract(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$4(min$5(toInteger(result.index), S.length), 0);
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
	});

	var es_string_replace = {

	};

	var formatUnit = function formatUnit(unit) {
	  if (unit == null) {
	    return 0;
	  } else if (typeof unit === 'number') {
	    return "".concat(unit, "px");
	  } else if (typeof unit === 'string') {
	    return unit.replace('dp', 'px');
	  } else {
	    return 0;
	  }
	};
	var isDefinedStr = function isDefinedStr(value) {
	  return typeof value === 'string' && value.length > 0;
	};
	var escapeHTML = function escapeHTML() {
	  var unsafe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
	};
	var throttle = function throttle(fn, delay) {
	  if (delay === 0) {
	    return fn;
	  }

	  var timer = false;
	  return function () {
	    if (timer) {
	      return;
	    }

	    timer = true;
	    return setTimeout$1(function () {
	      timer = false;
	      fn.apply(void 0, arguments);
	    }, delay);
	  };
	};

	var nativeConstruct = getBuiltIn$1('Reflect', 'construct');

	// `Reflect.construct` method
	// https://tc39.es/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails$1(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails$1(function () {
	  nativeConstruct(function () { /* empty */ });
	});
	var FORCED$1 = NEW_TARGET_BUG || ARGS_BUG;

	_export$1({ target: 'Reflect', stat: true, forced: FORCED$1, sham: FORCED$1 }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction$1(Target);
	    anObject$1(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction$1(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (functionBind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = objectCreate$1(isObject$1(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject$1(result) ? result : instance;
	  }
	});

	var es_reflect_construct = {

	};

	var construct$1 = path$1.Reflect.construct;

	var construct$2 = construct$1;

	var construct$3 = construct$2;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	_export$1({ target: 'Object', stat: true, sham: !descriptors$1 }, {
	  create: objectCreate$1
	});

	var es_object_create = {

	};

	var Object$1 = path$1.Object;

	var create = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$1 = create;

	var create$2 = create$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	_export$1({ target: 'Object', stat: true }, {
	  setPrototypeOf: objectSetPrototypeOf$1
	});

	var es_object_setPrototypeOf = {

	};

	var setPrototypeOf = path$1.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf;

	var setPrototypeOf$2 = setPrototypeOf$1;

	var setPrototypeOf$3 = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = setPrototypeOf$2 || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create$2(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf$3(subClass, superClass);
	}

	var inherits = _inherits;

	var f$8 = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f$8
	};

	var defineProperty$5 = objectDefineProperty$1.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path$1.Symbol || (path$1.Symbol = {});
	  if (!has$2(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var es_symbol_iterator = {

	};

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$5 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible$1($this));
	    var position = toInteger$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte$1 = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$5(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$5(true)
	};

	'use strict';
	var charAt$1 = stringMultibyte$1.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$1 = internalState$1.set;
	var getInternalState$1 = internalState$1.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$1(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt$1(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var es_string_iterator = {

	};

	var iterator = wellKnownSymbolWrapped.f('iterator');

	var iterator$1 = iterator;

	var iterator$2 = iterator$1;

	// empty

	var es_object_toString = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var hiddenKeys$3 = enumBugKeys$1.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$9 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal$1(O, hiddenKeys$3);
	};

	var objectGetOwnPropertyNames$1 = {
		f: f$9
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames$1.f;

	var toString$2 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$a = function getOwnPropertyNames(it) {
	  return windowNames && toString$2.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject$1(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$a
	};

	var f$b = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols$1 = {
		f: f$b
	};

	'use strict';



































	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$2 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$2 = internalState$1.set;
	var getInternalState$2 = internalState$1.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE$2];
	var $Symbol = global$2.Symbol;
	var $stringify = getBuiltIn$1('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor$1.f;
	var nativeDefineProperty$2 = objectDefineProperty$1.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$2 = objectPropertyIsEnumerable$1.f;
	var AllSymbols = shared$1('symbols');
	var ObjectPrototypeSymbols = shared$1('op-symbols');
	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
	var WellKnownSymbolsStore$2 = shared$1('wks');
	var QObject = global$2.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors$1 && fails$1(function () {
	  return objectCreate$1(nativeDefineProperty$2({}, 'a', {
	    get: function () { return nativeDefineProperty$2(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty$2(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty$2(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$2;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate$1($Symbol[PROTOTYPE$2]);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors$1) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$1(O);
	  var key = toPrimitive$1(P, true);
	  anObject$1(Attributes);
	  if (has$2(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$2(O, HIDDEN)) nativeDefineProperty$2(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$2(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate$1(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$2(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$1(O);
	  var properties = toIndexedObject$1(Properties);
	  var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!descriptors$1 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate$1(O) : $defineProperties(objectCreate$1(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive$1(V, true);
	  var enumerable = nativePropertyIsEnumerable$2.call(this, P);
	  if (this === ObjectPrototype$1 && has$2(AllSymbols, P) && !has$2(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$2(this, P) || !has$2(AllSymbols, P) || has$2(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$1(O);
	  var key = toPrimitive$1(P, true);
	  if (it === ObjectPrototype$1 && has$2(AllSymbols, key) && !has$2(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
	  if (descriptor && has$2(AllSymbols, key) && !(has$2(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has$2(AllSymbols, key) && !has$2(hiddenKeys$2, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has$2(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$2(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid$1(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has$2(this, HIDDEN) && has$2(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (descriptors$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap$1(tag, description);
	  };

	  redefine$1($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  redefine$1($Symbol, 'withoutSetter', function (description) {
	    return wrap$1(uid$1(description), description);
	  });

	  objectPropertyIsEnumerable$1.f = $propertyIsEnumerable;
	  objectDefineProperty$1.f = $defineProperty;
	  objectGetOwnPropertyDescriptor$1.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames$1.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols$1.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap$1(wellKnownSymbol(name), name);
	  };

	  if (descriptors$1) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$2($Symbol[PROTOTYPE$2], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	    if (!isPure$1) {
	      redefine$1(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export$1({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys$1(WellKnownSymbolsStore$2), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export$1({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has$2(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export$1({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors$1 }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export$1({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export$1({ target: 'Object', stat: true, forced: fails$1(function () { objectGetOwnPropertySymbols$1.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols$1.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails$1(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export$1({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$2][TO_PRIMITIVE]) {
	  createNonEnumerableProperty$1($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys$2[HIDDEN] = true;

	var es_symbol = {

	};

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	var es_symbol_asyncIterator = {

	};

	// empty

	var es_symbol_description = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol('hasInstance');

	var es_symbol_hasInstance = {

	};

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol('isConcatSpreadable');

	var es_symbol_isConcatSpreadable = {

	};

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol('match');

	var es_symbol_match = {

	};

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol('matchAll');

	var es_symbol_matchAll = {

	};

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol('replace');

	var es_symbol_replace = {

	};

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol('search');

	var es_symbol_search = {

	};

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol('species');

	var es_symbol_species = {

	};

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol('split');

	var es_symbol_split = {

	};

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol('toPrimitive');

	var es_symbol_toPrimitive = {

	};

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol('toStringTag');

	var es_symbol_toStringTag = {

	};

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol('unscopables');

	var es_symbol_unscopables = {

	};

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag(global$2.JSON, 'JSON', true);

	var es_json_toStringTag = {

	};

	// empty

	var es_math_toStringTag = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	// empty

	var es_reflect_toStringTag = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var es_object_toString$1 = /*@__PURE__*/getAugmentedNamespace(es_object_toString);

	var es_symbol_description$1 = /*@__PURE__*/getAugmentedNamespace(es_symbol_description);

	var es_math_toStringTag$1 = /*@__PURE__*/getAugmentedNamespace(es_math_toStringTag);

	var es_reflect_toStringTag$1 = /*@__PURE__*/getAugmentedNamespace(es_reflect_toStringTag);

	var symbol = path$1.Symbol;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('asyncDispose');

	var esnext_symbol_asyncDispose = {

	};

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('dispose');

	var esnext_symbol_dispose = {

	};

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol('observable');

	var esnext_symbol_observable = {

	};

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('patternMatch');

	var esnext_symbol_patternMatch = {

	};

	// TODO: remove from `core-js@4`


	defineWellKnownSymbol('replaceAll');

	var esnext_symbol_replaceAll = {

	};

	// TODO: Remove from `core-js@4`


	var symbol$1 = symbol;

	var symbol$2 = symbol$1;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof symbol$2 === "function" && typeof iterator$2 === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof symbol$2 === "function" && obj.constructor === symbol$2 && obj !== symbol$2.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var FAILS_ON_PRIMITIVES = fails$1(function () { objectGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	_export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var es_object_getPrototypeOf = {

	};

	var getPrototypeOf = path$1.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf;

	var getPrototypeOf$2 = getPrototypeOf$1;

	var getPrototypeOf$3 = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = setPrototypeOf$2 ? getPrototypeOf$2 : function _getPrototypeOf(o) {
	    return o.__proto__ || getPrototypeOf$2(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	var quot = /"/g;

	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	// https://tc39.es/ecma262/#sec-createhtml
	var createHtml = function (string, tag, attribute, value) {
	  var S = String(requireObjectCoercible(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	// check the existence of a method, lowercase
	// of a tag and escaping quotes in arguments
	var stringHtmlForced = function (METHOD_NAME) {
	  return fails(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	'use strict';




	// `String.prototype.link` method
	// https://tc39.es/ecma262/#sec-string.prototype.link
	_export({ target: 'String', proto: true, forced: stringHtmlForced('link') }, {
	  link: function link(url) {
	    return createHtml(this, 'a', 'href', url);
	  }
	});

	var es_string_link = {

	};

	var View = /*#__PURE__*/function () {
	  function View() {
	    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    classCallCheck(this, View);

	    this.attrs = attrs;
	    this.el = this.createElement();
	    this.setAttributes();
	  }

	  createClass(View, [{
	    key: "render",
	    value: function render() {
	      return this;
	    }
	  }, {
	    key: "createElement",
	    value: function createElement() {
	      var _this$className;

	      var el = document.createElement(this.tagName);
	      var className = (_this$className = this.className) !== null && _this$className !== void 0 ? _this$className : '';
	      el.className = 'incito__view ' + className;
	      return el;
	    }
	  }, {
	    key: "setAttributes",
	    value: function setAttributes() {
	      var _this = this,
	          _context2;

	      // Identifier.
	      if (isDefinedStr(this.attrs.id)) {
	        this.el.setAttribute('data-id', this.attrs.id);
	      } // Role.


	      if (isDefinedStr(this.attrs.role)) {
	        this.el.setAttribute('data-role', this.attrs.role);
	      } // Accessibility label.


	      if (isDefinedStr(this.attrs.accessibility_label)) {
	        this.el.setAttribute('aria-label', this.attrs.accessibility_label);
	      } // Accessibility visibility.


	      if (this.attrs.accessibility_hidden === true) {
	        this.el.setAttribute('aria-hidden', true);
	      } // Feature labels.


	      if (isArray$3(this.attrs.feature_labels)) {
	        var _context;

	        var featureLabels = filter$2(_context = this.attrs.feature_labels).call(_context, function (featureLabel) {
	          return /^[a-z_-]{1,14}$/.test(featureLabel);
	        });

	        if (featureLabels.length) {
	          this.el.setAttribute('data-feature-labels', featureLabels.join(','));
	        }
	      } // Title.


	      if (isDefinedStr(this.attrs.title)) {
	        this.el.setAttribute('title', this.attrs.title);
	      } // Gravity.


	      if (isDefinedStr(this.attrs.gravity)) {
	        this.el.setAttribute('data-gravity', this.attrs.gravity);
	      } // Link.


	      if (isDefinedStr(this.attrs.link)) {
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
	        this.el.style.width = formatUnit(this.attrs.layout_width);
	      } // Height.


	      if (this.attrs.layout_height === 'match_parent') {
	        this.el.style.height = '100%';
	      } else if (this.attrs.layout_height === 'wrap_content') {
	        this.el.style.height = 'auto';
	      } else if (this.attrs.layout_height != null) {
	        this.el.style.height = formatUnit(this.attrs.layout_height);
	      } // Min width.


	      if (this.attrs.min_width != null) {
	        this.el.style.minWidth = formatUnit(this.attrs.min_width);
	      } // Max width.


	      if (this.attrs.max_width != null) {
	        this.el.style.maxWidth = formatUnit(this.attrs.max_width);
	      } // Min height.


	      if (this.attrs.min_height != null) {
	        this.el.style.minHeight = formatUnit(this.attrs.min_height);
	      } // Max height.


	      if (this.attrs.max_height != null) {
	        this.el.style.maxHeight = formatUnit(this.attrs.max_height);
	      } // Position in relation to parent.


	      if (this.attrs.layout_top != null) {
	        this.el.style.top = formatUnit(this.attrs.layout_top);
	      }

	      if (this.attrs.layout_left != null) {
	        this.el.style.left = formatUnit(this.attrs.layout_left);
	      }

	      if (this.attrs.layout_right != null) {
	        this.el.style.right = formatUnit(this.attrs.layout_right);
	      }

	      if (this.attrs.layout_bottom != null) {
	        this.el.style.bottom = formatUnit(this.attrs.layout_bottom);
	      } // Background.


	      if (isDefinedStr(this.attrs.background_color)) {
	        this.el.style.backgroundColor = this.attrs.background_color;
	      }

	      if (isDefinedStr(this.attrs.background_image)) {
	        this.el.setAttribute('data-src', this.attrs.background_image);
	        this.lazyload = true;
	      }

	      if (indexOf$4(_context2 = ['repeat_x', 'repeat_y', 'repeat']).call(_context2, this.attrs.background_tile_mode) !== -1) {
	        this.el.style.backgroundRepeat = this.attrs.background_tile_mode.replace('_', '-');
	      }

	      if (isDefinedStr(this.attrs.background_image_position)) {
	        this.el.style.backgroundPosition = this.attrs.background_image_position.replace('_', ' ');
	      }

	      if (this.attrs.background_image_scale_type === 'center_crop') {
	        this.el.style.backgroundSize = 'cover';
	      } else if (this.attrs.background_image_scale_type === 'center_inside') {
	        this.el.style.backgroundSize = 'contain';
	      } // Margin.


	      if (this.attrs.layout_margin != null) {
	        this.el.style.margin = formatUnit(this.attrs.layout_margin);
	      }

	      if (this.attrs.layout_margin_top != null) {
	        this.el.style.marginTop = formatUnit(this.attrs.layout_margin_top);
	      }

	      if (this.attrs.layout_margin_left != null) {
	        this.el.style.marginLeft = formatUnit(this.attrs.layout_margin_left);
	      }

	      if (this.attrs.layout_margin_right != null) {
	        this.el.style.marginRight = formatUnit(this.attrs.layout_margin_right);
	      }

	      if (this.attrs.layout_margin_bottom != null) {
	        this.el.style.marginBottom = formatUnit(this.attrs.layout_margin_bottom);
	      } // Padding.


	      if (this.attrs.padding != null) {
	        this.el.style.padding = formatUnit(this.attrs.padding);
	      }

	      if (this.attrs.padding_top != null) {
	        this.el.style.paddingTop = formatUnit(this.attrs.padding_top);
	      }

	      if (this.attrs.padding_left != null) {
	        this.el.style.paddingLeft = formatUnit(this.attrs.padding_left);
	      }

	      if (this.attrs.padding_right != null) {
	        this.el.style.paddingRight = formatUnit(this.attrs.padding_right);
	      }

	      if (this.attrs.padding_bottom != null) {
	        this.el.style.paddingBottom = formatUnit(this.attrs.padding_bottom);
	      } // Corner radius.


	      if (this.attrs.corner_radius != null) {
	        this.el.style.borderRadius = formatUnit(this.attrs.corner_radius);
	      }

	      if (this.attrs.corner_top_left_radius != null) {
	        this.el.style.borderTopLeftRadius = formatUnit(this.attrs.corner_top_left_radius);
	      }

	      if (this.attrs.corner_top_right_radius != null) {
	        this.el.style.borderTopRightRadius = formatUnit(this.attrs.corner_top_right_radius);
	      }

	      if (this.attrs.corner_bottom_left_radius != null) {
	        this.el.style.borderBottomLeftRadius = formatUnit(this.attrs.corner_bottom_left_radius);
	      }

	      if (this.attrs.corner_bottom_right_radius != null) {
	        this.el.style.borderBottomRightRadius = formatUnit(this.attrs.corner_bottom_right_radius);
	      } // Clip children.


	      if (this.attrs.clip_children === false) {
	        this.el.style.overflow = 'visible';
	      } // Shadow.


	      var shadow = this.getShadow();

	      if (shadow != null) {
	        var _context3, _context4, _context5;

	        this.el.style.boxShadow = concat$2(_context3 = concat$2(_context4 = concat$2(_context5 = "".concat(shadow.dx, "px ")).call(_context5, shadow.dy, "px ")).call(_context4, shadow.radius, "px ")).call(_context3, shadow.color);
	      } // Stroke.


	      var strokeStyles = ['solid', 'dotted', 'dashed'];

	      if (this.attrs.stroke_width != null) {
	        this.el.style.borderWidth = formatUnit(this.attrs.stroke_width);
	      }

	      if (this.attrs.stroke_color != null) {
	        this.el.style.borderColor = this.attrs.stroke_color;
	      }

	      if (indexOf$4(strokeStyles).call(strokeStyles, this.attrs.stroke_style) !== -1) {
	        this.el.style.borderStyle = this.attrs.stroke_style;
	      }

	      if (this.attrs.stroke_top_width != null) {
	        this.el.style.borderTopWidth = formatUnit(this.attrs.stroke_top_width);
	      }

	      if (this.attrs.stroke_top_color != null) {
	        this.el.style.borderTopColor = this.attrs.stroke_top_color;
	      }

	      if (this.attrs.stroke_left_width != null) {
	        this.el.style.borderLeftWidth = formatUnit(this.attrs.stroke_left_width);
	      }

	      if (this.attrs.stroke_left_color != null) {
	        this.el.style.borderLeftColor = this.attrs.stroke_left_color;
	      }

	      if (this.attrs.stroke_right_width != null) {
	        this.el.style.borderRightWidth = formatUnit(this.attrs.stroke_right_width);
	      }

	      if (this.attrs.stroke_right_color != null) {
	        this.el.style.borderRightColor = this.attrs.stroke_right_color;
	      }

	      if (this.attrs.stroke_bottom_width != null) {
	        this.el.style.borderBottomWidth = formatUnit(this.attrs.stroke_bottom_width);
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
	        this.el.style.flexBasis = formatUnit(this.attrs.layout_flex_basis);
	        this.el.style.msFlexBasis = formatUnit(this.attrs.layout_flex_basis);
	      } // Transforms.


	      var transforms = this.getTransforms();

	      if (transforms.length > 0) {
	        this.el.style.transform = transforms.join(' ');
	      } // Transform origin.


	      if (isArray$3(this.attrs.transform_origin) && this.attrs.transform_origin.length === 2) {
	        this.el.style.transformOrigin = [formatUnit(this.attrs.transform_origin[0]), formatUnit(this.attrs.transform_origin[1])].join(' ');
	      }
	    }
	  }, {
	    key: "getTransforms",
	    value: function getTransforms() {
	      var transforms = [];
	      var translateX = formatUnit(this.attrs.transform_translate_x);
	      var translateY = formatUnit(this.attrs.transform_translate_y);

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
	      if (isDefinedStr(this.attrs.shadow_color)) {
	        var dx = typeof this.attrs.shadow_dx === 'number' ? this.attrs.shadow_dx : 0;
	        var dy = typeof this.attrs.shadow_dy === 'number' ? this.attrs.shadow_dy : 0;
	        var radius = typeof this.attrs.shadow_radius === 'number' ? this.attrs.shadow_radius : 0;
	        var color = this.attrs.shadow_color;
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

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }

	var AbsoluteLayout = /*#__PURE__*/function (_View) {
	  inherits(AbsoluteLayout, _View);

	  var _super = _createSuper(AbsoluteLayout);

	  function AbsoluteLayout() {
	    classCallCheck(this, AbsoluteLayout);

	    return _super.apply(this, arguments);
	  }

	  return AbsoluteLayout;
	}(View);

	AbsoluteLayout.prototype.className = 'incito__absolute-layout-view';

	function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	var alignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
	var flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
	var flexDirectionModes = ['row', 'column'];

	var FlexLayout = /*#__PURE__*/function (_View) {
	  inherits(FlexLayout, _View);

	  var _super = _createSuper$1(FlexLayout);

	  function FlexLayout() {
	    classCallCheck(this, FlexLayout);

	    return _super.apply(this, arguments);
	  }

	  createClass(FlexLayout, [{
	    key: "render",
	    value: function render() {
	      if (indexOf$4(alignItemModes).call(alignItemModes, this.attrs.layout_flex_align_items) !== -1) {
	        this.el.style.alignItems = this.attrs.layout_flex_align_items;
	        this.el.style.msAlignItems = this.attrs.layout_flex_align_items;
	      }

	      if (indexOf$4(flexJustifyModes).call(flexJustifyModes, this.attrs.layout_flex_justify_content) !== -1) {
	        this.el.style.justifyContent = this.attrs.layout_flex_justify_content;
	        this.el.style.msFlexPack = this.attrs.layout_flex_justify_content;
	      }

	      if (indexOf$4(flexDirectionModes).call(flexDirectionModes, this.attrs.layout_flex_direction) !== -1) {
	        this.el.style.flexDirection = this.attrs.layout_flex_direction;
	        this.el.style.msFlexDirection = this.attrs.layout_flex_direction;
	      }

	      return this;
	    }
	  }]);

	  return FlexLayout;
	}(View);

	FlexLayout.prototype.className = 'incito__flex-layout-view';

	function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }

	var Image = /*#__PURE__*/function (_View) {
	  inherits(Image, _View);

	  var _super = _createSuper$2(Image);

	  function Image() {
	    classCallCheck(this, Image);

	    return _super.apply(this, arguments);
	  }

	  createClass(Image, [{
	    key: "render",
	    value: function render() {
	      if (isDefinedStr(this.attrs.src)) {
	        this.el.setAttribute('data-src', this.attrs.src);
	      }

	      if (isDefinedStr(this.attrs.label)) {
	        this.el.setAttribute('alt', this.attrs.label);
	      } else {
	        this.el.setAttribute('alt', '');
	      }

	      return this;
	    }
	  }]);

	  return Image;
	}(View);

	Image.prototype.tagName = 'img';
	Image.prototype.className = 'incito__image-view';
	Image.prototype.lazyload = true;

	var defineProperty$6 = objectDefineProperty.f;

	var FunctionPrototype$1 = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype$1.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype$1)) {
	  defineProperty$6(FunctionPrototype$1, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var es_function_name = {

	};

	var MATCH = wellKnownSymbol$1('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var aFunction$3 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var SPECIES$4 = wellKnownSymbol$1('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$3(S);
	};

	'use strict';











	var arrayPush = [].push;
	var min$6 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

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
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$6(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
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
	}, !SUPPORTS_Y);

	var es_string_split = {

	};

	function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }

	var TextView = /*#__PURE__*/function (_View) {
	  inherits(TextView, _View);

	  var _super = _createSuper$3(TextView);

	  function TextView() {
	    classCallCheck(this, TextView);

	    return _super.apply(this, arguments);
	  }

	  createClass(TextView, [{
	    key: "render",
	    value: function render() {
	      if (!isDefinedStr(this.attrs.text)) {
	        return this;
	      }

	      var textStyles = (this.attrs.text_style || '').split('|');
	      var text = this.attrs.text;

	      if (isArray$3(this.attrs.spans) && this.attrs.spans.length > 0) {
	        var parsedText = this.parseSpans(text, this.attrs.spans);
	        text = map$2(parsedText).call(parsedText, function (item) {
	          var _item$span, _item$span2;

	          var escapedText = escapeHTML(item.text || '');

	          if (((_item$span = item.span) === null || _item$span === void 0 ? void 0 : _item$span.name) === 'link' && item.span.url != null) {
	            var _context;

	            return concat$2(_context = "<a href=\"".concat(encodeURI(item.span.url), "\" rel=\"external\" target=\"_blank\">")).call(_context, escapedText, "</a>");
	          }

	          if (((_item$span2 = item.span) === null || _item$span2 === void 0 ? void 0 : _item$span2.name) != null) {
	            var _context2;

	            var spanName = item.span.name;
	            return concat$2(_context2 = "<span data-name=\"".concat(spanName, "\">")).call(_context2, escapedText, "</span>");
	          }

	          return escapedText;
	        });
	        text = text.join('');
	      } else {
	        text = escapeHTML(text);
	      }

	      if (this.attrs.text_prevent_widow) {
	        text = text.replace(/&nbsp;([^\s]+)$/, ' $1').replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
	      }

	      this.el.innerHTML = text.replace(/\n/g, '<br>'); // Font family.

	      if (isArray$3(this.attrs.font_family) && this.attrs.font_family.length > 0) {
	        this.el.style.fontFamily = "".concat(this.attrs.font_family.join(', '), " !important");
	      } else {
	        this.el.style.fontFamily = 'inherit !important';
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


	      if (indexOf$4(textStyles).call(textStyles, 'bold') !== -1) {
	        this.el.style.fontWeight = 'bold';
	      }

	      if (indexOf$4(textStyles).call(textStyles, 'italic') !== -1) {
	        this.el.style.fontStyle = 'italic';
	      }

	      if (isArray$3(this.attrs.text_decoration_line)) {
	        this.el.style.textDecorationLine = this.attrs.text_decoration_line.join(' ');
	      } // Text shadow.


	      var textShadow = this.getTextShadow();

	      if (isDefinedStr(this.attrs.text_shadow)) {
	        this.el.style.textShadow = this.attrs.text_shadow;
	      } else if (textShadow != null) {
	        var _context3, _context4, _context5;

	        this.el.style.textShadow = concat$2(_context3 = concat$2(_context4 = concat$2(_context5 = "".concat(textShadow.dx, "px ")).call(_context5, textShadow.dy, "px ")).call(_context4, textShadow.radius, "px ")).call(_context3, textShadow.color);
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
	      var result = [];

	      if (spans.length === 0) {
	        result.push({
	          text: text
	        });
	      } else if (spans[0].start > 0) {
	        result.push({
	          text: slice$2(text).call(text, 0, spans[0].start)
	        });
	      }

	      forEach$2(spans).call(spans, function (span, i) {
	        var startIndex = span.start;
	        var endIndex = span.end;
	        result.push({
	          text: slice$2(text).call(text, startIndex, endIndex),
	          span: span
	        });

	        if (i === spans.length - 1) {
	          if (endIndex < text.length) {
	            result.push({
	              text: slice$2(text).call(text, endIndex, text.length)
	            });
	          }
	        } else if (endIndex < spans[i + 1].start) {
	          result.push({
	            text: slice$2(text).call(text, endIndex, spans[i + 1].start)
	          });
	        }
	      });

	      return result;
	    }
	  }, {
	    key: "getTextShadow",
	    value: function getTextShadow() {
	      if (isDefinedStr(this.attrs.text_shadow_color)) {
	        var dx = typeof this.attrs.text_shadow_dx === 'number' ? this.attrs.text_shadow_dx : 0;
	        var dy = typeof this.attrs.text_shadow_dy === 'number' ? this.attrs.text_shadow_dy : 0;
	        var radius = typeof this.attrs.text_shadow_radius === 'number' ? this.attrs.text_shadow_radius : 0;
	        var color = this.attrs.text_shadow_color;
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
	}(View);

	TextView.prototype.tagName = 'p';
	TextView.prototype.className = 'incito__text-view';

	function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }

	var Video = /*#__PURE__*/function (_View) {
	  inherits(Video, _View);

	  var _super = _createSuper$4(Video);

	  function Video() {
	    classCallCheck(this, Video);

	    return _super.apply(this, arguments);
	  }

	  createClass(Video, [{
	    key: "render",
	    value: function render() {
	      if (!isDefinedStr(this.attrs.src)) {
	        return this;
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
	}(View);

	Video.prototype.className = 'incito__video-view';
	Video.prototype.tagName = 'video';
	Video.prototype.lazyload = true;

	'use strict';

	var $find = arrayIteration.find;



	var FIND = 'find';
	var SKIPS_HOLES = true;

	var USES_TO_LENGTH$6 = arrayMethodUsesToLength(FIND);

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	_export$1({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$6 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var es_array_find = {

	};

	var find = entryVirtual('Array').find;

	var ArrayPrototype$7 = Array.prototype;

	var find_1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.find) ? find : own;
	};

	var find$1 = find_1;

	var find$2 = find$1;

	function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$3(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
	var allowedHostnames = ['.youtube.com', '.vimeo.com', '.twentythree.net'];

	var FlexLayout$1 = /*#__PURE__*/function (_View) {
	  inherits(FlexLayout, _View);

	  var _super = _createSuper$5(FlexLayout);

	  function FlexLayout() {
	    classCallCheck(this, FlexLayout);

	    return _super.apply(this, arguments);
	  }

	  createClass(FlexLayout, [{
	    key: "render",
	    value: function render() {
	      if (!isDefinedStr(this.attrs.src)) {
	        return this;
	      }

	      var src = this.attrs.src;
	      var linkEl = document.createElement('a');
	      linkEl.setAttribute('href', src);

	      var isSupported = find$2(allowedHostnames).call(allowedHostnames, function (hostname) {
	        var _context;

	        return slice$2(_context = linkEl.hostname).call(_context, -hostname.length) === hostname;
	      });

	      if (isSupported) {
	        this.el.setAttribute('data-src', src);
	        this.lazyload = true;
	      }

	      return this;
	    }
	  }]);

	  return FlexLayout;
	}(View);

	FlexLayout$1.prototype.className = 'incito__video-embed-view';
	FlexLayout$1.prototype.lazyload = false;

	var views = /*#__PURE__*/Object.freeze({
		__proto__: null,
		AbsoluteLayout: AbsoluteLayout,
		FlexLayout: FlexLayout,
		ImageView: Image,
		TextView: TextView,
		VideoView: Video,
		VideoEmbedView: FlexLayout$1,
		View: View
	});

	var requestIdleCallback;

	if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
	  var _window = window;
	  requestIdleCallback = _window.requestIdleCallback;
	} else {
	  requestIdleCallback = function requestIdleCallback(cb) {
	    return setTimeout$1(function () {
	      var start = now$2();

	      return cb({
	        didTimeout: false,
	        timeRemaining: function timeRemaining() {
	          return Math.max(0, 50 - (now$2() - start));
	        }
	      });
	    }, 1);
	  };
	} // like requestIdleCallback but effectively synchronous
	// as we give infinite time to run


	var syncIdleCallback = function syncIdleCallback(cb) {
	  cb({
	    timeRemaining: function timeRemaining() {
	      return Number.MAX_VALUE;
	    },
	    didTimeout: false
	  });
	};

	var Incito = /*#__PURE__*/function () {
	  function Incito(containerEl, _ref) {
	    var _context;

	    var _ref$incito = _ref.incito,
	        incito = _ref$incito === void 0 ? {} : _ref$incito,
	        _ref$renderLaziness = _ref.renderLaziness,
	        renderLaziness = _ref$renderLaziness === void 0 ? 1 : _ref$renderLaziness;

	    classCallCheck(this, Incito);

	    this.containerEl = containerEl;
	    this.incito = incito;
	    this.renderLaziness = renderLaziness;
	    this.el = document.createElement('div');
	    this.ids = {};
	    this.views = flattenViews([], this.incito.root_view);
	    this.viewsLength = this.views.length;
	    this.viewIndex = 0;
	    this.lazyloadables = [];
	    this.lazyloader = throttle(bind$2(_context = this.lazyload).call(_context, this), 150);
	    this.renderedOutsideOfViewport = false;
	    this._events = {};
	  }

	  createClass(Incito, [{
	    key: "bind",
	    value: function bind(event, fn) {
	      this._events[event] = this._events[event] || [];
	      return this._events[event].push(fn);
	    }
	  }, {
	    key: "unbind",
	    value: function unbind(event, fn) {
	      if (this._events[event]) {
	        var _context2, _context3;

	        return splice$2(_context2 = this._events[event]).call(_context2, indexOf$4(_context3 = this._events[event]).call(_context3, fn), 1);
	      }
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(event) {
	      if (this._events[event]) {
	        var _context4;

	        return map$2(_context4 = this._events[event]).call(_context4, function (e) {
	          return e.apply(this, slice$2(Array.prototype).call(arguments, 1));
	        });
	      }
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var _this = this;

	      var triggeredVisibleRendered = false;

	      var render = function render(IdleDeadline) {
	        _this.render(IdleDeadline);

	        if (_this.viewIndex <= _this.viewsLength - 1) {
	          _this.renderCallbackHandle = requestIdleCallback(render);
	        } else {
	          // make sure visibleRendered gets triggered even
	          // if renderedOutsideOfViewport wasn't
	          _this.renderedOutsideOfViewport = true;

	          _this.trigger('allRendered');
	        }

	        if (_this.renderedOutsideOfViewport && !triggeredVisibleRendered) {
	          _this.trigger('visibleRendered');

	          triggeredVisibleRendered = true;
	        }

	        if (_this.renderedOutsideOfViewport) {
	          _this.lazyload(0);
	        }
	      };

	      this.el.className = 'incito';

	      if (this.incito.locale != null) {
	        this.el.setAttribute('lang', this.incito.locale);
	      }

	      loadFonts(this.incito.font_assets);
	      this.applyTheme(this.incito.theme);
	      this.containerEl.appendChild(this.el); // do first render synchronously unless we're very lazy

	      if (this.renderLaziness === 2) {
	        this.renderCallbackHandle = requestIdleCallback(render);
	      } else {
	        syncIdleCallback(render);
	      }

	      document.addEventListener('scroll', this.lazyloader, true);
	      window.addEventListener('resize', this.lazyloader, false);
	      return this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      cancelIdleCallback(this.renderCallbackHandle);
	      this.containerEl.removeChild(this.el);
	      document.removeEventListener('scroll', this.lazyloader, true);
	      window.removeEventListener('resize', this.lazyloader, false);
	      this.trigger('destroyed');
	    }
	  }, {
	    key: "render",
	    value: function render(IdleDeadline) {
	      while (IdleDeadline.timeRemaining() > 0 && this.viewIndex <= this.viewsLength - 1) {
	        var _views$attrs$view_nam, _item$parent;

	        var item = this.views[this.viewIndex];
	        var attrs = item.attrs;
	        var match = (_views$attrs$view_nam = views[attrs.view_name]) !== null && _views$attrs$view_nam !== void 0 ? _views$attrs$view_nam : View;
	        var view = new match(attrs).render();

	        if (attrs.id != null && typeof attrs.meta === 'object') {
	          this.ids[attrs.id] = attrs.meta;
	        }

	        if (view.lazyload === true) {
	          this.lazyloadables.push(view.el);
	        }

	        item.view = view;

	        if (((_item$parent = item.parent) === null || _item$parent === void 0 ? void 0 : _item$parent.view) != null) {
	          item.parent.view.el.appendChild(view.el);
	        } else {
	          this.el.appendChild(view.el);
	        }

	        this.viewIndex++; // check if we rendered something out of the viewport for the first time and yield.
	        // the check is expensive so it's faster to only check every few iterations, the downside is that
	        // we might overrender a tiny bit but it comes out to faster than checking every iteration.

	        if (this.renderLaziness && !(this.viewIndex % 20) && !this.renderedOutsideOfViewport && !isInsideViewport(view.el)) {
	          this.renderedOutsideOfViewport = true;
	          break;
	        }
	      }
	    }
	  }, {
	    key: "applyTheme",
	    value: function applyTheme() {
	      var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (isArray$3(theme.font_family)) {
	        this.el.style.fontFamily = theme.font_family.join(', ');
	      }

	      if (isDefinedStr(theme.background_color)) {
	        this.el.style.backgroundColor = theme.background_color;
	      }

	      if (isDefinedStr(theme.text_color)) {
	        this.el.style.color = theme.text_color;
	      }

	      if (typeof theme.line_spacing_multiplier === 'number') {
	        this.el.style.lineHeight = theme.line_spacing_multiplier;
	      }
	    }
	  }, {
	    key: "lazyload",
	    value: function lazyload(threshold) {
	      var _context5;

	      this.lazyloadables = filter$2(_context5 = this.lazyloadables).call(_context5, function (el) {
	        if (isInsideViewport(el, threshold)) {
	          revealElement(el);
	          return false;
	        } else {
	          return true;
	        }
	      });
	    }
	  }]);

	  return Incito;
	}();

	var flattenViews = function flattenViews(views, attrs, parent) {
	  var item = {
	    attrs: attrs,
	    view: null,
	    parent: parent
	  };
	  views.push(item);

	  if (isArray$3(attrs.child_views)) {
	    var _context6;

	    forEach$2(_context6 = attrs.child_views).call(_context6, function (childAttrs) {
	      return flattenViews(views, childAttrs, item);
	    });
	  }

	  return views;
	};

	var loadFonts = function loadFonts() {
	  var fontAssets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var key, urls, value;

	  if ('FontFace' in window) {
	    for (key in fontAssets) {
	      var _context7, _value$style, _value$weight;

	      value = fontAssets[key];
	      urls = map$2(_context7 = value.src).call(_context7, function (src) {
	        return "url(".concat(src[1], ")");
	      }).join(', ');
	      var font = new FontFace(key, urls, {
	        style: (_value$style = value.style) !== null && _value$style !== void 0 ? _value$style : 'normal',
	        weight: (_value$weight = value.weight) !== null && _value$weight !== void 0 ? _value$weight : 'normal',
	        display: 'swap'
	      });
	      document.fonts.add(font);
	      font.load();
	    }
	  } else {
	    var styleEl = document.createElement('style');

	    for (key in fontAssets) {
	      var _context8, _context10;

	      value = fontAssets[key];
	      urls = map$2(_context8 = value.src).call(_context8, function (src) {
	        var _context9;

	        return concat$2(_context9 = "url('".concat(src[1], "') format('")).call(_context9, src[0], "')");
	      }).join(', ');

	      var text = concat$2(_context10 = "@font-face {\n    font-family: '".concat(key, "';\n    font-display: swap;\n    src: ")).call(_context10, urls, ";\n}");

	      styleEl.appendChild(document.createTextNode(text));
	    }

	    document.head.appendChild(styleEl);
	  }
	};

	var isInsideViewport = function isInsideViewport(el, threshold) {
	  var _threshold;

	  var windowHeight = window.innerHeight;
	  threshold = (_threshold = threshold) !== null && _threshold !== void 0 ? _threshold : windowHeight;
	  var rect = el.getBoundingClientRect();
	  return rect.top <= windowHeight + threshold && rect.top + rect.height >= -threshold;
	};

	var revealElement = function revealElement(el) {
	  var src = el.getAttribute('data-src');

	  if (el.tagName.toLowerCase() === 'img') {
	    el.addEventListener('load', function () {
	      el.className += ' incito--loaded';
	    });
	    el.setAttribute('src', src);
	  } else if (el.tagName.toLowerCase() === 'video') {
	    var sourceEl = document.createElement('source');
	    sourceEl.setAttribute('src', src);
	    sourceEl.setAttribute('type', el.getAttribute('data-mime'));
	    el.appendChild(sourceEl);
	  } else if (/incito__video-embed-view/gi.test(el.className)) {
	    var iframeEl = document.createElement('iframe');
	    iframeEl.setAttribute('allow', 'fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
	    iframeEl.setAttribute('src', src);
	    el.appendChild(iframeEl);
	  } else {
	    el.style.backgroundImage = "url(".concat(src, ")");
	  }
	};

	return Incito;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jaXRvLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmpvaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3doaXRlc3BhY2VzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy10cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5udW1iZXIuY29uc3RydWN0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2hhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2EtZnVuY3Rpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zaGFyZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy91aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9jb25jYXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9jb25jYXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9jb25jYXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2h0bWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RvbS1pdGVyYWJsZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9maWx0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2FycmF5L2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9zbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2Uvc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkubWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL21hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2luZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2luZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuc3BsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL3NwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2Uvc3BsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2Uvc3BsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2Uvc3BsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5mdW5jdGlvbi5iaW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9mdW5jdGlvbi92aXJ0dWFsL2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9iaW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuZGF0ZS5ub3cuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2RhdGUvbm93LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvZGF0ZS9ub3cuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9kYXRlL25vdy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy93ZWIudGltZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvc2V0LXRpbWVvdXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9zZXQtdGltZW91dC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZmxhZ3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LXN1YnN0aXR1dGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnJlcGxhY2UuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMucmVmbGVjdC5jb25zdHJ1Y3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL3JlZmxlY3QvY29uc3RydWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvcmVmbGVjdC9jb25zdHJ1Y3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9yZWZsZWN0L2NvbnN0cnVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3QvY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvaW5oZXJpdHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9zeW1ib2wvaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL3N5bWJvbC9pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLWV4dGVybmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5kZXNjcmlwdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaGFzLWluc3RhbmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5pcy1jb25jYXQtc3ByZWFkYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wubWF0Y2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLWFsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wucmVwbGFjZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuc2VhcmNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5zcGVjaWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5zcGxpdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wudG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC50by1zdHJpbmctdGFnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC51bnNjb3BhYmxlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5qc29uLnRvLXN0cmluZy10YWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMubWF0aC50by1zdHJpbmctdGFnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnJlZmxlY3QudG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvc3ltYm9sL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuYXN5bmMtZGlzcG9zZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLmRpc3Bvc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wucGF0dGVybi1tYXRjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLnJlcGxhY2UtYWxsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9zeW1ib2wvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL3N5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvdHlwZW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2dldFByb3RvdHlwZU9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1odG1sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1odG1sLWZvcmNlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLmxpbmsuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvdmlld3Mvdmlldy5qcyIsIi4uLy4uL2xpYi9pbmNpdG8tYnJvd3Nlci92aWV3cy9hYnNvbHV0ZS1sYXlvdXQuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvdmlld3MvZmxleC1sYXlvdXQuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvdmlld3MvaW1hZ2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmZ1bmN0aW9uLm5hbWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcmVnZXhwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtZnVuY3Rpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnNwbGl0LmpzIiwiLi4vLi4vbGliL2luY2l0by1icm93c2VyL3ZpZXdzL3RleHQuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvdmlld3MvdmlkZW8uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuZmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9maW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9pbnN0YW5jZS9maW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2ZpbmQuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvdmlld3MvdmlkZW8tZW1iZWQuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvaW5jaXRvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIHJldHVybiAhT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdC5jYWxsKGl0LCAnJykgOiBPYmplY3QoaXQpO1xufSA6IE9iamVjdDtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlRGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShnbG9iYWwsIGtleSwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgc2V0R2xvYmFsKFNIQVJFRCwge30pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuOC4zJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDIxIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIFN0cmluZyhrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyAoKytpZCArIHBvc3RmaXgpLnRvU3RyaW5nKDM2KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIG9iamVjdEhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQKSB7XG4gIHZhciBzdG9yZSA9IHNoYXJlZC5zdGF0ZSB8fCAoc2hhcmVkLnN0YXRlID0gbmV3IFdlYWtNYXAoKSk7XG4gIHZhciB3bWdldCA9IHN0b3JlLmdldDtcbiAgdmFyIHdtaGFzID0gc3RvcmUuaGFzO1xuICB2YXIgd21zZXQgPSBzdG9yZS5zZXQ7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICB3bXNldC5jYWxsKHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0LmNhbGwoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzLmNhbGwoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICB2YXIgc3RhdGU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIH1cbiAgICBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgICBpZiAoIXN0YXRlLnNvdXJjZSkge1xuICAgICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICAgIH1cbiAgfVxuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBzZXRHbG9iYWwoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKCF1bnNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICB9IGVsc2UgaWYgKCFub1RhcmdldEdldCAmJiBPW2tleV0pIHtcbiAgICBzaW1wbGUgPSB0cnVlO1xuICB9XG4gIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwsbm8tdGhyb3ctbGl0ZXJhbFxuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUpvaW4gPSBbXS5qb2luO1xuXG52YXIgRVMzX1NUUklOR1MgPSBJbmRleGVkT2JqZWN0ICE9IE9iamVjdDtcbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnam9pbicsICcsJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuam9pbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5qb2luXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBFUzNfU1RSSU5HUyB8fCAhU1RSSUNUX01FVEhPRCB9LCB7XG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUpvaW4uY2FsbCh0b0luZGV4ZWRPYmplY3QodGhpcyksIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkID8gJywnIDogc2VwYXJhdG9yKTtcbiAgfVxufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpICYmIGl0ICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKGl0KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG5cbi8vIG1ha2VzIHN1YmNsYXNzaW5nIHdvcmsgY29ycmVjdCBmb3Igd3JhcHBlZCBidWlsdC1pbnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCR0aGlzLCBkdW1teSwgV3JhcHBlcikge1xuICB2YXIgTmV3VGFyZ2V0LCBOZXdUYXJnZXRQcm90b3R5cGU7XG4gIGlmIChcbiAgICAvLyBpdCBjYW4gd29yayBvbmx5IHdpdGggbmF0aXZlIGBzZXRQcm90b3R5cGVPZmBcbiAgICBzZXRQcm90b3R5cGVPZiAmJlxuICAgIC8vIHdlIGhhdmVuJ3QgY29tcGxldGVseSBjb3JyZWN0IHByZS1FUzYgd2F5IGZvciBnZXR0aW5nIGBuZXcudGFyZ2V0YCwgc28gdXNlIHRoaXNcbiAgICB0eXBlb2YgKE5ld1RhcmdldCA9IGR1bW15LmNvbnN0cnVjdG9yKSA9PSAnZnVuY3Rpb24nICYmXG4gICAgTmV3VGFyZ2V0ICE9PSBXcmFwcGVyICYmXG4gICAgaXNPYmplY3QoTmV3VGFyZ2V0UHJvdG90eXBlID0gTmV3VGFyZ2V0LnByb3RvdHlwZSkgJiZcbiAgICBOZXdUYXJnZXRQcm90b3R5cGUgIT09IFdyYXBwZXIucHJvdG90eXBlXG4gICkgc2V0UHJvdG90eXBlT2YoJHRoaXMsIE5ld1RhcmdldFByb3RvdHlwZSk7XG4gIHJldHVybiAkdGhpcztcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAqL1xuICAgIGFjdGl2ZVhEb2N1bWVudCA9IGRvY3VtZW50LmRvbWFpbiAmJiBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogaWdub3JlICovIH1cbiAgTnVsbFByb3RvT2JqZWN0ID0gYWN0aXZlWERvY3VtZW50ID8gTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIDogTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lKCk7XG4gIHZhciBsZW5ndGggPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIE51bGxQcm90b09iamVjdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2xlbmd0aF1dO1xuICByZXR1cm4gTnVsbFByb3RvT2JqZWN0KCk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5Q29uc3RydWN0b3IoKTtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IE51bGxQcm90b09iamVjdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsIi8vIGEgc3RyaW5nIG9mIGFsbCB2YWxpZCB1bmljb2RlIHdoaXRlc3BhY2VzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRic7XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgd2hpdGVzcGFjZSA9ICdbJyArIHdoaXRlc3BhY2VzICsgJ10nO1xudmFyIGx0cmltID0gUmVnRXhwKCdeJyArIHdoaXRlc3BhY2UgKyB3aGl0ZXNwYWNlICsgJyonKTtcbnZhciBydHJpbSA9IFJlZ0V4cCh3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW0sIHRyaW1TdGFydCwgdHJpbUVuZCwgdHJpbUxlZnQsIHRyaW1SaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcykge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIGlmIChUWVBFICYgMSkgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UobHRyaW0sICcnKTtcbiAgICBpZiAoVFlQRSAmIDIpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJ0cmltLCAnJyk7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1MZWZ0LCB0cmltU3RhcnQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbXN0YXJ0XG4gIHN0YXJ0OiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbVJpZ2h0LCB0cmltRW5kIH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1lbmRcbiAgZW5kOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuICB0cmltOiBjcmVhdGVNZXRob2QoMylcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpLmY7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xuXG52YXIgTlVNQkVSID0gJ051bWJlcic7XG52YXIgTmF0aXZlTnVtYmVyID0gZ2xvYmFsW05VTUJFUl07XG52YXIgTnVtYmVyUHJvdG90eXBlID0gTmF0aXZlTnVtYmVyLnByb3RvdHlwZTtcblxuLy8gT3BlcmEgfjEyIGhhcyBicm9rZW4gT2JqZWN0I3RvU3RyaW5nXG52YXIgQlJPS0VOX0NMQVNTT0YgPSBjbGFzc29mKGNyZWF0ZShOdW1iZXJQcm90b3R5cGUpKSA9PSBOVU1CRVI7XG5cbi8vIGBUb051bWJlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbnVtYmVyXG52YXIgdG9OdW1iZXIgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGl0ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsIGZhbHNlKTtcbiAgdmFyIGZpcnN0LCB0aGlyZCwgcmFkaXgsIG1heENvZGUsIGRpZ2l0cywgbGVuZ3RoLCBpbmRleCwgY29kZTtcbiAgaWYgKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBpdC5sZW5ndGggPiAyKSB7XG4gICAgaXQgPSB0cmltKGl0KTtcbiAgICBmaXJzdCA9IGl0LmNoYXJDb2RlQXQoMCk7XG4gICAgaWYgKGZpcnN0ID09PSA0MyB8fCBmaXJzdCA9PT0gNDUpIHtcbiAgICAgIHRoaXJkID0gaXQuY2hhckNvZGVBdCgyKTtcbiAgICAgIGlmICh0aGlyZCA9PT0gODggfHwgdGhpcmQgPT09IDEyMCkgcmV0dXJuIE5hTjsgLy8gTnVtYmVyKCcrMHgxJykgc2hvdWxkIGJlIE5hTiwgb2xkIFY4IGZpeFxuICAgIH0gZWxzZSBpZiAoZmlyc3QgPT09IDQ4KSB7XG4gICAgICBzd2l0Y2ggKGl0LmNoYXJDb2RlQXQoMSkpIHtcbiAgICAgICAgY2FzZSA2NjogY2FzZSA5ODogcmFkaXggPSAyOyBtYXhDb2RlID0gNDk7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMGJbMDFdKyQvaVxuICAgICAgICBjYXNlIDc5OiBjYXNlIDExMTogcmFkaXggPSA4OyBtYXhDb2RlID0gNTU7IGJyZWFrOyAvLyBmYXN0IGVxdWFsIG9mIC9eMG9bMC03XSskL2lcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuICtpdDtcbiAgICAgIH1cbiAgICAgIGRpZ2l0cyA9IGl0LnNsaWNlKDIpO1xuICAgICAgbGVuZ3RoID0gZGlnaXRzLmxlbmd0aDtcbiAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb2RlID0gZGlnaXRzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAvLyBwYXJzZUludCBwYXJzZXMgYSBzdHJpbmcgdG8gYSBmaXJzdCB1bmF2YWlsYWJsZSBzeW1ib2xcbiAgICAgICAgLy8gYnV0IFRvTnVtYmVyIHNob3VsZCByZXR1cm4gTmFOIGlmIGEgc3RyaW5nIGNvbnRhaW5zIHVuYXZhaWxhYmxlIHN5bWJvbHNcbiAgICAgICAgaWYgKGNvZGUgPCA0OCB8fCBjb2RlID4gbWF4Q29kZSkgcmV0dXJuIE5hTjtcbiAgICAgIH0gcmV0dXJuIHBhcnNlSW50KGRpZ2l0cywgcmFkaXgpO1xuICAgIH1cbiAgfSByZXR1cm4gK2l0O1xufTtcblxuLy8gYE51bWJlcmAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbnVtYmVyLWNvbnN0cnVjdG9yXG5pZiAoaXNGb3JjZWQoTlVNQkVSLCAhTmF0aXZlTnVtYmVyKCcgMG8xJykgfHwgIU5hdGl2ZU51bWJlcignMGIxJykgfHwgTmF0aXZlTnVtYmVyKCcrMHgxJykpKSB7XG4gIHZhciBOdW1iZXJXcmFwcGVyID0gZnVuY3Rpb24gTnVtYmVyKHZhbHVlKSB7XG4gICAgdmFyIGl0ID0gYXJndW1lbnRzLmxlbmd0aCA8IDEgPyAwIDogdmFsdWU7XG4gICAgdmFyIGR1bW15ID0gdGhpcztcbiAgICByZXR1cm4gZHVtbXkgaW5zdGFuY2VvZiBOdW1iZXJXcmFwcGVyXG4gICAgICAvLyBjaGVjayBvbiAxLi5jb25zdHJ1Y3Rvcihmb28pIGNhc2VcbiAgICAgICYmIChCUk9LRU5fQ0xBU1NPRiA/IGZhaWxzKGZ1bmN0aW9uICgpIHsgTnVtYmVyUHJvdG90eXBlLnZhbHVlT2YuY2FsbChkdW1teSk7IH0pIDogY2xhc3NvZihkdW1teSkgIT0gTlVNQkVSKVxuICAgICAgICA/IGluaGVyaXRJZlJlcXVpcmVkKG5ldyBOYXRpdmVOdW1iZXIodG9OdW1iZXIoaXQpKSwgZHVtbXksIE51bWJlcldyYXBwZXIpIDogdG9OdW1iZXIoaXQpO1xuICB9O1xuICBmb3IgKHZhciBrZXlzID0gREVTQ1JJUFRPUlMgPyBnZXRPd25Qcm9wZXJ0eU5hbWVzKE5hdGl2ZU51bWJlcikgOiAoXG4gICAgLy8gRVMzOlxuICAgICdNQVhfVkFMVUUsTUlOX1ZBTFVFLE5hTixORUdBVElWRV9JTkZJTklUWSxQT1NJVElWRV9JTkZJTklUWSwnICtcbiAgICAvLyBFUzIwMTUgKGluIGNhc2UsIGlmIG1vZHVsZXMgd2l0aCBFUzIwMTUgTnVtYmVyIHN0YXRpY3MgcmVxdWlyZWQgYmVmb3JlKTpcbiAgICAnRVBTSUxPTixpc0Zpbml0ZSxpc0ludGVnZXIsaXNOYU4saXNTYWZlSW50ZWdlcixNQVhfU0FGRV9JTlRFR0VSLCcgK1xuICAgICdNSU5fU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQscGFyc2VJbnQsaXNJbnRlZ2VyLCcgK1xuICAgIC8vIEVTTmV4dFxuICAgICdmcm9tU3RyaW5nLHJhbmdlJ1xuICApLnNwbGl0KCcsJyksIGogPSAwLCBrZXk7IGtleXMubGVuZ3RoID4gajsgaisrKSB7XG4gICAgaWYgKGhhcyhOYXRpdmVOdW1iZXIsIGtleSA9IGtleXNbal0pICYmICFoYXMoTnVtYmVyV3JhcHBlciwga2V5KSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkoTnVtYmVyV3JhcHBlciwga2V5LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTmF0aXZlTnVtYmVyLCBrZXkpKTtcbiAgICB9XG4gIH1cbiAgTnVtYmVyV3JhcHBlci5wcm90b3R5cGUgPSBOdW1iZXJQcm90b3R5cGU7XG4gIE51bWJlclByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE51bWJlcldyYXBwZXI7XG4gIHJlZGVmaW5lKGdsb2JhbCwgTlVNQkVSLCBOdW1iZXJXcmFwcGVyKTtcbn1cbiIsInZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIHJldHVybiAhT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdC5jYWxsKGl0LCAnJykgOiBPYmplY3QoaXQpO1xufSA6IE9iamVjdDtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IHR5cGVvZiBkZXRlY3Rpb24gPT0gJ2Z1bmN0aW9uJyA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0KTtcbiAgICB9O1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlRGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG5cbnZhciB3cmFwQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoTmF0aXZlQ29uc3RydWN0b3IpIHtcbiAgdmFyIFdyYXBwZXIgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTmF0aXZlQ29uc3RydWN0b3IpIHtcbiAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoKTtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IE5hdGl2ZUNvbnN0cnVjdG9yKGEpO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSwgYik7XG4gICAgICB9IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSwgYiwgYyk7XG4gICAgfSByZXR1cm4gTmF0aXZlQ29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbiAgV3JhcHBlci5wcm90b3R5cGUgPSBOYXRpdmVDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHJldHVybiBXcmFwcGVyO1xufTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBQUk9UTyA9IG9wdGlvbnMucHJvdG87XG5cbiAgdmFyIG5hdGl2ZVNvdXJjZSA9IEdMT0JBTCA/IGdsb2JhbCA6IFNUQVRJQyA/IGdsb2JhbFtUQVJHRVRdIDogKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG5cbiAgdmFyIHRhcmdldCA9IEdMT0JBTCA/IHBhdGggOiBwYXRoW1RBUkdFVF0gfHwgKHBhdGhbVEFSR0VUXSA9IHt9KTtcbiAgdmFyIHRhcmdldFByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG5cbiAgdmFyIEZPUkNFRCwgVVNFX05BVElWRSwgVklSVFVBTF9QUk9UT1RZUEU7XG4gIHZhciBrZXksIHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSwgbmF0aXZlUHJvcGVydHksIHJlc3VsdFByb3BlcnR5LCBkZXNjcmlwdG9yO1xuXG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgVVNFX05BVElWRSA9ICFGT1JDRUQgJiYgbmF0aXZlU291cmNlICYmIGhhcyhuYXRpdmVTb3VyY2UsIGtleSk7XG5cbiAgICB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuXG4gICAgaWYgKFVTRV9OQVRJVkUpIGlmIChvcHRpb25zLm5vVGFyZ2V0R2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5hdGl2ZVNvdXJjZSwga2V5KTtcbiAgICAgIG5hdGl2ZVByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSBuYXRpdmVQcm9wZXJ0eSA9IG5hdGl2ZVNvdXJjZVtrZXldO1xuXG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBpbXBsZW1lbnRhdGlvblxuICAgIHNvdXJjZVByb3BlcnR5ID0gKFVTRV9OQVRJVkUgJiYgbmF0aXZlUHJvcGVydHkpID8gbmF0aXZlUHJvcGVydHkgOiBzb3VyY2Vba2V5XTtcblxuICAgIGlmIChVU0VfTkFUSVZFICYmIHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSA9PT0gdHlwZW9mIHNvdXJjZVByb3BlcnR5KSBjb250aW51ZTtcblxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgaWYgKG9wdGlvbnMuYmluZCAmJiBVU0VfTkFUSVZFKSByZXN1bHRQcm9wZXJ0eSA9IGJpbmQoc291cmNlUHJvcGVydHksIGdsb2JhbCk7XG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5ncyBpbiB0aGlzIHZlcnNpb25cbiAgICBlbHNlIGlmIChvcHRpb25zLndyYXAgJiYgVVNFX05BVElWRSkgcmVzdWx0UHJvcGVydHkgPSB3cmFwQ29uc3RydWN0b3Ioc291cmNlUHJvcGVydHkpO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIGVsc2UgaWYgKFBST1RPICYmIHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PSAnZnVuY3Rpb24nKSByZXN1bHRQcm9wZXJ0eSA9IGJpbmQoRnVuY3Rpb24uY2FsbCwgc291cmNlUHJvcGVydHkpO1xuICAgIC8vIGRlZmF1bHQgY2FzZVxuICAgIGVsc2UgcmVzdWx0UHJvcGVydHkgPSBzb3VyY2VQcm9wZXJ0eTtcblxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8IChzb3VyY2VQcm9wZXJ0eSAmJiBzb3VyY2VQcm9wZXJ0eS5zaGFtKSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShyZXN1bHRQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG5cbiAgICB0YXJnZXRba2V5XSA9IHJlc3VsdFByb3BlcnR5O1xuXG4gICAgaWYgKFBST1RPKSB7XG4gICAgICBWSVJUVUFMX1BST1RPVFlQRSA9IFRBUkdFVCArICdQcm90b3R5cGUnO1xuICAgICAgaWYgKCFoYXMocGF0aCwgVklSVFVBTF9QUk9UT1RZUEUpKSB7XG4gICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShwYXRoLCBWSVJUVUFMX1BST1RPVFlQRSwge30pO1xuICAgICAgfVxuICAgICAgLy8gZXhwb3J0IHZpcnR1YWwgcHJvdG90eXBlIG1ldGhvZHNcbiAgICAgIHBhdGhbVklSVFVBTF9QUk9UT1RZUEVdW2tleV0gPSBzb3VyY2VQcm9wZXJ0eTtcbiAgICAgIC8vIGV4cG9ydCByZWFsIHByb3RvdHlwZSBtZXRob2RzXG4gICAgICBpZiAob3B0aW9ucy5yZWFsICYmIHRhcmdldFByb3RvdHlwZSAmJiAhdGFyZ2V0UHJvdG90eXBlW2tleV0pIHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRhcmdldFByb3RvdHlwZSwga2V5LCBzb3VyY2VQcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2FycmF5XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpIHtcbiAgcmV0dXJuIGNsYXNzb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIHByb3BlcnR5S2V5ID0gdG9QcmltaXRpdmUoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjguMycsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICByZXR1cm4gIVN0cmluZyhTeW1ib2woKSk7XG59KTtcbiIsInZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiAhU3ltYm9sLnNoYW1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkpIHtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXMoU3ltYm9sLCBuYW1lKSkgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIGVsc2UgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5c3BlY2llc2NyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWxBcnJheSwgbGVuZ3RoKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbEFycmF5KSkge1xuICAgIEMgPSBvcmlnaW5hbEFycmF5LmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBlbHNlIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIG5ldyAoQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDKShsZW5ndGggPT09IDAgPyAwIDogbGVuZ3RoKTtcbn07XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gKyBtYXRjaFsxXTtcbn0gZWxzZSBpZiAodXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uICYmICt2ZXJzaW9uO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29uY2F0XG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAaXNDb25jYXRTcHJlYWRhYmxlIGFuZCBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KGFyZykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCAwKTtcbiAgICB2YXIgbiA9IDA7XG4gICAgdmFyIGksIGssIGxlbmd0aCwgbGVuLCBFO1xuICAgIGZvciAoaSA9IC0xLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIEUgPSBpID09PSAtMSA/IE8gOiBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoaXNDb25jYXRTcHJlYWRhYmxlKEUpKSB7XG4gICAgICAgIGxlbiA9IHRvTGVuZ3RoKEUubGVuZ3RoKTtcbiAgICAgICAgaWYgKG4gKyBsZW4gPiBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IGxlbjsgaysrLCBuKyspIGlmIChrIGluIEUpIGNyZWF0ZVByb3BlcnR5KEEsIG4sIEVba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG4gPj0gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KEEsIG4rKywgRSk7XG4gICAgICB9XG4gICAgfVxuICAgIEEubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTlNUUlVDVE9SKSB7XG4gIHJldHVybiBwYXRoW0NPTlNUUlVDVE9SICsgJ1Byb3RvdHlwZSddO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0Jyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuY29uY2F0O1xuIiwidmFyIGNvbmNhdCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvY29uY2F0Jyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmNvbmNhdDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmNvbmNhdCkgPyBjb25jYXQgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2NvbmNhdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvY29uY2F0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi50b1N0cmluZztcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGAzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICh0eXBlb2Ygc3RvcmUuaW5zcGVjdFNvdXJjZSAhPSAnZnVuY3Rpb24nKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZy5jYWxsKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KGluc3BlY3RTb3VyY2UoV2Vha01hcCkpO1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2Zcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlYCBvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1vYmplY3RcbnZhciBJdGVyYXRvclByb3RvdHlwZSwgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlLCBhcnJheUl0ZXJhdG9yO1xuXG5pZiAoW10ua2V5cykge1xuICBhcnJheUl0ZXJhdG9yID0gW10ua2V5cygpO1xuICAvLyBTYWZhcmkgOCBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgaWYgKCEoJ25leHQnIGluIGFycmF5SXRlcmF0b3IpKSBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gdHJ1ZTtcbiAgZWxzZSB7XG4gICAgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoZ2V0UHJvdG90eXBlT2YoYXJyYXlJdGVyYXRvcikpO1xuICAgIGlmIChQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIEl0ZXJhdG9yUHJvdG90eXBlID0gUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG59XG5cbnZhciBORVdfSVRFUkFUT1JfUFJPVE9UWVBFID0gSXRlcmF0b3JQcm90b3R5cGUgPT0gdW5kZWZpbmVkIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgLy8gRkY0NC0gbGVnYWN5IGl0ZXJhdG9ycyBjYXNlXG4gIHJldHVybiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0uY2FsbCh0ZXN0KSAhPT0gdGVzdDtcbn0pO1xuXG5pZiAoTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbmlmICgoIUlTX1BVUkUgfHwgTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxuICBCVUdHWV9TQUZBUklfSVRFUkFUT1JTOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXMoaGlkZGVuS2V5cywga2V5KSAmJiBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xuXG52YXIgR1QgPSAnPic7XG52YXIgTFQgPSAnPCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgU0NSSVBUID0gJ3NjcmlwdCc7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBFbXB0eUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG52YXIgc2NyaXB0VGFnID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgcmV0dXJuIExUICsgU0NSSVBUICsgR1QgKyBjb250ZW50ICsgTFQgKyAnLycgKyBTQ1JJUFQgKyBHVDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBBY3RpdmVYIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCA9IGZ1bmN0aW9uIChhY3RpdmVYRG9jdW1lbnQpIHtcbiAgYWN0aXZlWERvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnJykpO1xuICBhY3RpdmVYRG9jdW1lbnQuY2xvc2UoKTtcbiAgdmFyIHRlbXAgPSBhY3RpdmVYRG9jdW1lbnQucGFyZW50V2luZG93Lk9iamVjdDtcbiAgYWN0aXZlWERvY3VtZW50ID0gbnVsbDsgLy8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgcmV0dXJuIHRlbXA7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIEpTID0gJ2phdmEnICsgU0NSSVBUICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy80NzVcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhKUyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCdkb2N1bWVudC5GPU9iamVjdCcpKTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgcmV0dXJuIGlmcmFtZURvY3VtZW50LkY7XG59O1xuXG4vLyBDaGVjayBmb3IgZG9jdW1lbnQuZG9tYWluIGFuZCBhY3RpdmUgeCBzdXBwb3J0XG4vLyBObyBuZWVkIHRvIHVzZSBhY3RpdmUgeCBhcHByb2FjaCB3aGVuIGRvY3VtZW50LmRvbWFpbiBpcyBub3Qgc2V0XG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltL2lzc3Vlcy8xNTBcbi8vIHZhcmlhdGlvbiBvZiBodHRwczovL2dpdGh1Yi5jb20va2l0Y2FtYnJpZGdlL2VzNS1zaGltL2NvbW1pdC80ZjczOGFjMDY2MzQ2XG4vLyBhdm9pZCBJRSBHQyBidWdcbnZhciBhY3RpdmVYRG9jdW1lbnQ7XG52YXIgTnVsbFByb3RvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8qIGdsb2JhbCBBY3RpdmVYT2JqZWN0ICovXG4gICAgYWN0aXZlWERvY3VtZW50ID0gZG9jdW1lbnQuZG9tYWluICYmIG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSBhY3RpdmVYRG9jdW1lbnQgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8ge30udG9TdHJpbmcgOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xufTtcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgVEFHLCBTVEFUSUMsIFNFVF9NRVRIT0QpIHtcbiAgaWYgKGl0KSB7XG4gICAgdmFyIHRhcmdldCA9IFNUQVRJQyA/IGl0IDogaXQucHJvdG90eXBlO1xuICAgIGlmICghaGFzKHRhcmdldCwgVE9fU1RSSU5HX1RBRykpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwgVE9fU1RSSU5HX1RBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBUQUcgfSk7XG4gICAgfVxuICAgIGlmIChTRVRfTUVUSE9EICYmICFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXQsICd0b1N0cmluZycsIHRvU3RyaW5nKTtcbiAgICB9XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpIHtcbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIEl0ZXJhdG9yQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JDb25zdHJ1Y3RvciwgVE9fU1RSSU5HX1RBRywgZmFsc2UsIHRydWUpO1xuICBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICByZXR1cm4gSXRlcmF0b3JDb25zdHJ1Y3Rvcjtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpICYmIGl0ICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKGl0KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwidmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW51bWVyYWJsZSkgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodGFyZ2V0LCBrZXksIHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJdGVyYXRvcnNDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJyk7XG5cbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EIGluIEl0ZXJhYmxlUHJvdG90eXBlKSByZXR1cm4gSXRlcmFibGVQcm90b3R5cGVbS0lORF07XG4gICAgc3dpdGNoIChLSU5EKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBFTlRSSUVTOiByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMpOyB9O1xuICB9O1xuXG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gZmFsc2U7XG4gIHZhciBJdGVyYWJsZVByb3RvdHlwZSA9IEl0ZXJhYmxlLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUl0ZXJhdG9yID0gSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgfHwgSXRlcmFibGVQcm90b3R5cGVbJ0BAaXRlcmF0b3InXVxuICAgIHx8IERFRkFVTFQgJiYgSXRlcmFibGVQcm90b3R5cGVbREVGQVVMVF07XG4gIHZhciBkZWZhdWx0SXRlcmF0b3IgPSAhQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBuYXRpdmVJdGVyYXRvciB8fCBnZXRJdGVyYXRpb25NZXRob2QoREVGQVVMVCk7XG4gIHZhciBhbnlOYXRpdmVJdGVyYXRvciA9IE5BTUUgPT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgaWYgKCFJU19QVVJFICYmIGdldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSkgIT09IEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgIHNldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZBVUxUID09IFZBTFVFUyAmJiBuYXRpdmVJdGVyYXRvciAmJiBuYXRpdmVJdGVyYXRvci5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSB0cnVlO1xuICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5hdGl2ZUl0ZXJhdG9yLmNhbGwodGhpcyk7IH07XG4gIH1cblxuICAvLyBkZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghSVNfUFVSRSB8fCBGT1JDRUQpICYmIEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gZGVmYXVsdEl0ZXJhdG9yKSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhYmxlUHJvdG90eXBlLCBJVEVSQVRPUiwgZGVmYXVsdEl0ZXJhdG9yKTtcbiAgfVxuICBJdGVyYXRvcnNbTkFNRV0gPSBkZWZhdWx0SXRlcmF0b3I7XG5cbiAgLy8gZXhwb3J0IGFkZGl0aW9uYWwgbWV0aG9kc1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gZGVmYXVsdEl0ZXJhdG9yIDogZ2V0SXRlcmF0aW9uTWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogZ2V0SXRlcmF0aW9uTWV0aG9kKEVOVFJJRVMpXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKEtFWSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfHwgIShLRVkgaW4gSXRlcmFibGVQcm90b3R5cGUpKSB7XG4gICAgICAgIHJlZGVmaW5lKEl0ZXJhYmxlUHJvdG90eXBlLCBLRVksIG1ldGhvZHNbS0VZXSk7XG4gICAgICB9XG4gICAgfSBlbHNlICQoeyB0YXJnZXQ6IE5BTUUsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIH0sIG1ldGhvZHMpO1xuICB9XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIEFSUkFZX0lURVJBVE9SID0gJ0FycmF5IEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKEFSUkFZX0lURVJBVE9SKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmVudHJpZXNcbi8vIGBBcnJheS5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS52YWx1ZXNcbi8vIGBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEBpdGVyYXRvclxuLy8gYENyZWF0ZUFycmF5SXRlcmF0b3JgIGludGVybmFsIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lYXJyYXlpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0O1xuICB2YXIga2luZCA9IHN0YXRlLmtpbmQ7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4Kys7XG4gIGlmICghdGFyZ2V0IHx8IGluZGV4ID49IHRhcmdldC5sZW5ndGgpIHtcbiAgICBzdGF0ZS50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG4gIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHsgdmFsdWU6IGluZGV4LCBkb25lOiBmYWxzZSB9O1xuICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHsgdmFsdWU6IHRhcmdldFtpbmRleF0sIGRvbmU6IGZhbHNlIH07XG4gIHJldHVybiB7IHZhbHVlOiBbaW5kZXgsIHRhcmdldFtpbmRleF1dLCBkb25lOiBmYWxzZSB9O1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyVcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRldW5tYXBwZWRhcmd1bWVudHNvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsIi8vIGl0ZXJhYmxlIERPTSBjb2xsZWN0aW9uc1xuLy8gZmxhZyAtIGBpdGVyYWJsZWAgaW50ZXJmYWNlIC0gJ2VudHJpZXMnLCAna2V5cycsICd2YWx1ZXMnLCAnZm9yRWFjaCcgbWV0aG9kc1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIENTU1J1bGVMaXN0OiAwLFxuICBDU1NTdHlsZURlY2xhcmF0aW9uOiAwLFxuICBDU1NWYWx1ZUxpc3Q6IDAsXG4gIENsaWVudFJlY3RMaXN0OiAwLFxuICBET01SZWN0TGlzdDogMCxcbiAgRE9NU3RyaW5nTGlzdDogMCxcbiAgRE9NVG9rZW5MaXN0OiAxLFxuICBEYXRhVHJhbnNmZXJJdGVtTGlzdDogMCxcbiAgRmlsZUxpc3Q6IDAsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiAwLFxuICBIVE1MQ29sbGVjdGlvbjogMCxcbiAgSFRNTEZvcm1FbGVtZW50OiAwLFxuICBIVE1MU2VsZWN0RWxlbWVudDogMCxcbiAgTWVkaWFMaXN0OiAwLFxuICBNaW1lVHlwZUFycmF5OiAwLFxuICBOYW1lZE5vZGVNYXA6IDAsXG4gIE5vZGVMaXN0OiAxLFxuICBQYWludFJlcXVlc3RMaXN0OiAwLFxuICBQbHVnaW46IDAsXG4gIFBsdWdpbkFycmF5OiAwLFxuICBTVkdMZW5ndGhMaXN0OiAwLFxuICBTVkdOdW1iZXJMaXN0OiAwLFxuICBTVkdQYXRoU2VnTGlzdDogMCxcbiAgU1ZHUG9pbnRMaXN0OiAwLFxuICBTVkdTdHJpbmdMaXN0OiAwLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiAwLFxuICBTb3VyY2VCdWZmZXJMaXN0OiAwLFxuICBTdHlsZVNoZWV0TGlzdDogMCxcbiAgVGV4dFRyYWNrQ3VlTGlzdDogMCxcbiAgVGV4dFRyYWNrTGlzdDogMCxcbiAgVG91Y2hMaXN0OiAwXG59O1xuIiwicmVxdWlyZSgnLi9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIERPTUl0ZXJhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb20taXRlcmFibGVzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IgKHZhciBDT0xMRUNUSU9OX05BTUUgaW4gRE9NSXRlcmFibGVzKSB7XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW0NPTExFQ1RJT05fTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uUHJvdG90eXBlID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYgKENvbGxlY3Rpb25Qcm90b3R5cGUgJiYgY2xhc3NvZihDb2xsZWN0aW9uUHJvdG90eXBlKSAhPT0gVE9fU1RSSU5HX1RBRykge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDb2xsZWN0aW9uUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCBDT0xMRUNUSU9OX05BTUUpO1xuICB9XG4gIEl0ZXJhdG9yc1tDT0xMRUNUSU9OX05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuIiwidmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xuXG52YXIgcHVzaCA9IFtdLnB1c2g7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBmb3JFYWNoLCBtYXAsIGZpbHRlciwgc29tZSwgZXZlcnksIGZpbmQsIGZpbmRJbmRleCwgZmlsdGVyT3V0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIElTX0ZJTFRFUl9PVVQgPSBUWVBFID09IDc7XG4gIHZhciBOT19IT0xFUyA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0LCBzcGVjaWZpY0NyZWF0ZSkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSW5kZXhlZE9iamVjdChPKTtcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2tmbiwgdGhhdCwgMyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBjcmVhdGUgPSBzcGVjaWZpY0NyZWF0ZSB8fCBhcnJheVNwZWNpZXNDcmVhdGU7XG4gICAgdmFyIHRhcmdldCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiB8fCBJU19GSUxURVJfT1VUID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgNDogcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAvLyBldmVyeVxuICAgICAgICAgIGNhc2UgNzogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJPdXRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogdGFyZ2V0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZvcmVhY2hcbiAgZm9yRWFjaDogY3JlYXRlTWV0aG9kKDApLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWx0ZXJcbiAgZmlsdGVyOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuc29tZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNvbWVcbiAgc29tZTogY3JlYXRlTWV0aG9kKDMpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmV2ZXJ5YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuICBmaW5kOiBjcmVhdGVNZXRob2QoNSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZEluZGV4XG4gIGZpbmRJbmRleDogY3JlYXRlTWV0aG9kKDYpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlck91dGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFycmF5LWZpbHRlcmluZ1xuICBmaWx0ZXJPdXQ6IGNyZWF0ZU1ldGhvZCg3KVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgYXJndW1lbnQpIHtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsLG5vLXRocm93LWxpdGVyYWxcbiAgICBtZXRob2QuY2FsbChudWxsLCBhcmd1bWVudCB8fCBmdW5jdGlvbiAoKSB7IHRocm93IDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGNhY2hlID0ge307XG5cbnZhciB0aHJvd2VyID0gZnVuY3Rpb24gKGl0KSB7IHRocm93IGl0OyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgb3B0aW9ucykge1xuICBpZiAoaGFzKGNhY2hlLCBNRVRIT0RfTkFNRSkpIHJldHVybiBjYWNoZVtNRVRIT0RfTkFNRV07XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICB2YXIgQUNDRVNTT1JTID0gaGFzKG9wdGlvbnMsICdBQ0NFU1NPUlMnKSA/IG9wdGlvbnMuQUNDRVNTT1JTIDogZmFsc2U7XG4gIHZhciBhcmd1bWVudDAgPSBoYXMob3B0aW9ucywgMCkgPyBvcHRpb25zWzBdIDogdGhyb3dlcjtcbiAgdmFyIGFyZ3VtZW50MSA9IGhhcyhvcHRpb25zLCAxKSA/IG9wdGlvbnNbMV0gOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIGNhY2hlW01FVEhPRF9OQU1FXSA9ICEhbWV0aG9kICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEFDQ0VTU09SUyAmJiAhREVTQ1JJUFRPUlMpIHJldHVybiB0cnVlO1xuICAgIHZhciBPID0geyBsZW5ndGg6IC0xIH07XG5cbiAgICBpZiAoQUNDRVNTT1JTKSBkZWZpbmVQcm9wZXJ0eShPLCAxLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogdGhyb3dlciB9KTtcbiAgICBlbHNlIE9bMV0gPSAxO1xuXG4gICAgbWV0aG9kLmNhbGwoTywgYXJndW1lbnQwLCBhcmd1bWVudDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdmb3JFYWNoJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnZm9yRWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSAoIVNUUklDVF9NRVRIT0QgfHwgIVVTRVNfVE9fTEVOR1RIKSA/IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0gOiBbXS5mb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogW10uZm9yRWFjaCAhPSBmb3JFYWNoIH0sIHtcbiAgZm9yRWFjaDogZm9yRWFjaFxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuZm9yRWFjaDtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi8uLi9lcy9hcnJheS92aXJ0dWFsL2Zvci1lYWNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yJyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2gnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgRE9NVG9rZW5MaXN0OiB0cnVlLFxuICBOb2RlTGlzdDogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZvckVhY2g7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5mb3JFYWNoKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBET01JdGVyYWJsZXMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihpdCkpID8gZm9yRWFjaCA6IG93bjtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoXCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaWx0ZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmlsdGVyO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdmaWx0ZXInKTtcbi8vIEVkZ2UgMTQtIGlzc3VlXG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnZmlsdGVyJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZmlsdGVyJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuZmlsdGVyO1xuIiwidmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZmlsdGVyJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZpbHRlcjtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmZpbHRlcikgPyBmaWx0ZXIgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2ZpbHRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZmlsdGVyXCIpOyIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcblxuLy8gYEFycmF5LmlzQXJyYXlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5pc2FycmF5XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBzdGF0OiB0cnVlIH0sIHtcbiAgaXNBcnJheTogaXNBcnJheVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmlzLWFycmF5Jyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5BcnJheS5pc0FycmF5O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2FycmF5L2lzLWFycmF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS9pcy1hcnJheVwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NsaWNlJyk7XG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCgnc2xpY2UnLCB7IEFDQ0VTU09SUzogdHJ1ZSwgMDogMCwgMTogMiB9KTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBuYXRpdmVTbGljZSA9IFtdLnNsaWNlO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNsaWNlXG4vLyBmYWxsYmFjayBmb3Igbm90IGFycmF5LWxpa2UgRVMzIHN0cmluZ3MgYW5kIERPTSBvYmplY3RzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGsgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICAvLyBpbmxpbmUgYEFycmF5U3BlY2llc0NyZWF0ZWAgZm9yIHVzYWdlIG5hdGl2ZSBgQXJyYXkjc2xpY2VgIHdoZXJlIGl0J3MgcG9zc2libGVcbiAgICB2YXIgQ29uc3RydWN0b3IsIHJlc3VsdCwgbjtcbiAgICBpZiAoaXNBcnJheShPKSkge1xuICAgICAgQ29uc3RydWN0b3IgPSBPLmNvbnN0cnVjdG9yO1xuICAgICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICAgIGlmICh0eXBlb2YgQ29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IGlzQXJyYXkoQ29uc3RydWN0b3IucHJvdG90eXBlKSkpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KENvbnN0cnVjdG9yKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yW1NQRUNJRVNdO1xuICAgICAgICBpZiAoQ29uc3RydWN0b3IgPT09IG51bGwpIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTbGljZS5jYWxsKE8sIGssIGZpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IG5ldyAoQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQ29uc3RydWN0b3IpKG1heChmaW4gLSBrLCAwKSk7XG4gICAgZm9yIChuID0gMDsgayA8IGZpbjsgaysrLCBuKyspIGlmIChrIGluIE8pIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgbiwgT1trXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LnNsaWNlJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5Jykuc2xpY2U7XG4iLCJ2YXIgc2xpY2UgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL3NsaWNlJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LnNsaWNlO1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEFycmF5ICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuc2xpY2UpID8gc2xpY2UgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3NsaWNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zbGljZVwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkbWFwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLm1hcDtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnbWFwJyk7XG4vLyBGRjQ5LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB8fCAhVVNFU19UT19MRU5HVEggfSwge1xuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5Lm1hcCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLm1hcDtcbiIsInZhciBtYXAgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL21hcCcpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5tYXA7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5tYXApID8gbWFwIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9tYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL21hcFwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG52YXIgYXJyYXlNZXRob2RVc2VzVG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLXVzZXMtdG8tbGVuZ3RoJyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcbnZhciBVU0VTX1RPX0xFTkdUSCA9IGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoKCdpbmRleE9mJywgeyBBQ0NFU1NPUlM6IHRydWUsIDE6IDAgfSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBORUdBVElWRV9aRVJPIHx8ICFTVFJJQ1RfTUVUSE9EIHx8ICFVU0VTX1RPX0xFTkdUSCB9LCB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gTkVHQVRJVkVfWkVST1xuICAgICAgLy8gY29udmVydCAtMCB0byArMFxuICAgICAgPyBuYXRpdmVJbmRleE9mLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMFxuICAgICAgOiAkaW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZicpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmluZGV4T2Y7XG4iLCJ2YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvaW5kZXgtb2YnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuaW5kZXhPZjtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmluZGV4T2YpID8gaW5kZXhPZiA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2UvaW5kZXgtb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2luZGV4LW9mXCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xudmFyIGFycmF5TWV0aG9kVXNlc1RvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC11c2VzLXRvLWxlbmd0aCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NwbGljZScpO1xudmFyIFVTRVNfVE9fTEVOR1RIID0gYXJyYXlNZXRob2RVc2VzVG9MZW5ndGgoJ3NwbGljZScsIHsgQUNDRVNTT1JTOiB0cnVlLCAwOiAwLCAxOiAyIH0pO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgbGVuZ3RoIGV4Y2VlZGVkJztcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zcGxpY2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc3BsaWNlXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgc3BsaWNlOiBmdW5jdGlvbiBzcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50IC8qICwgLi4uaXRlbXMgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGFjdHVhbFN0YXJ0ID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICAgIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBpbnNlcnRDb3VudCwgYWN0dWFsRGVsZXRlQ291bnQsIEEsIGssIGZyb20sIHRvO1xuICAgIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDApIHtcbiAgICAgIGluc2VydENvdW50ID0gYWN0dWFsRGVsZXRlQ291bnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAxKSB7XG4gICAgICBpbnNlcnRDb3VudCA9IDA7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IGxlbiAtIGFjdHVhbFN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRDb3VudCA9IGFyZ3VtZW50c0xlbmd0aCAtIDI7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IG1pbihtYXgodG9JbnRlZ2VyKGRlbGV0ZUNvdW50KSwgMCksIGxlbiAtIGFjdHVhbFN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGxlbiArIGluc2VydENvdW50IC0gYWN0dWFsRGVsZXRlQ291bnQgPiBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCk7XG4gICAgfVxuICAgIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgYWN0dWFsRGVsZXRlQ291bnQpO1xuICAgIGZvciAoayA9IDA7IGsgPCBhY3R1YWxEZWxldGVDb3VudDsgaysrKSB7XG4gICAgICBmcm9tID0gYWN0dWFsU3RhcnQgKyBrO1xuICAgICAgaWYgKGZyb20gaW4gTykgY3JlYXRlUHJvcGVydHkoQSwgaywgT1tmcm9tXSk7XG4gICAgfVxuICAgIEEubGVuZ3RoID0gYWN0dWFsRGVsZXRlQ291bnQ7XG4gICAgaWYgKGluc2VydENvdW50IDwgYWN0dWFsRGVsZXRlQ291bnQpIHtcbiAgICAgIGZvciAoayA9IGFjdHVhbFN0YXJ0OyBrIDwgbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsrKykge1xuICAgICAgICBmcm9tID0gayArIGFjdHVhbERlbGV0ZUNvdW50O1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudDtcbiAgICAgICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIH1cbiAgICAgIGZvciAoayA9IGxlbjsgayA+IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7IGstLSkgZGVsZXRlIE9bayAtIDFdO1xuICAgIH0gZWxzZSBpZiAoaW5zZXJ0Q291bnQgPiBhY3R1YWxEZWxldGVDb3VudCkge1xuICAgICAgZm9yIChrID0gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsgPiBhY3R1YWxTdGFydDsgay0tKSB7XG4gICAgICAgIGZyb20gPSBrICsgYWN0dWFsRGVsZXRlQ291bnQgLSAxO1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudCAtIDE7XG4gICAgICAgIGlmIChmcm9tIGluIE8pIE9bdG9dID0gT1tmcm9tXTtcbiAgICAgICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoayA9IDA7IGsgPCBpbnNlcnRDb3VudDsgaysrKSB7XG4gICAgICBPW2sgKyBhY3R1YWxTdGFydF0gPSBhcmd1bWVudHNbayArIDJdO1xuICAgIH1cbiAgICBPLmxlbmd0aCA9IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zcGxpY2UnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5zcGxpY2U7XG4iLCJ2YXIgc3BsaWNlID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9zcGxpY2UnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuc3BsaWNlO1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEFycmF5ICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuc3BsaWNlKSA/IHNwbGljZSA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2Uvc3BsaWNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zcGxpY2VcIik7IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIGZhY3RvcmllcyA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24gKEMsIGFyZ3NMZW5ndGgsIGFyZ3MpIHtcbiAgaWYgKCEoYXJnc0xlbmd0aCBpbiBmYWN0b3JpZXMpKSB7XG4gICAgZm9yICh2YXIgbGlzdCA9IFtdLCBpID0gMDsgaSA8IGFyZ3NMZW5ndGg7IGkrKykgbGlzdFtpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgIGZhY3Rvcmllc1thcmdzTGVuZ3RoXSA9IEZ1bmN0aW9uKCdDLGEnLCAncmV0dXJuIG5ldyBDKCcgKyBsaXN0LmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1thcmdzTGVuZ3RoXShDLCBhcmdzKTtcbn07XG5cbi8vIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qICwgLi4uYXJncyAqLykge1xuICB2YXIgZm4gPSBhRnVuY3Rpb24odGhpcyk7XG4gIHZhciBwYXJ0QXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kRnVuY3Rpb24gPSBmdW5jdGlvbiBib3VuZCgvKiBhcmdzLi4uICovKSB7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGJvdW5kRnVuY3Rpb24gPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9O1xuICBpZiAoaXNPYmplY3QoZm4ucHJvdG90eXBlKSkgYm91bmRGdW5jdGlvbi5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZEZ1bmN0aW9uO1xufTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZCcpO1xuXG4vLyBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1mdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuJCh7IHRhcmdldDogJ0Z1bmN0aW9uJywgcHJvdG86IHRydWUgfSwge1xuICBiaW5kOiBiaW5kXG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuZnVuY3Rpb24uYmluZCcpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdGdW5jdGlvbicpLmJpbmQ7XG4iLCJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL3ZpcnR1YWwvYmluZCcpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5iaW5kO1xuICByZXR1cm4gaXQgPT09IEZ1bmN0aW9uUHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIG93biA9PT0gRnVuY3Rpb25Qcm90b3R5cGUuYmluZCkgPyBiaW5kIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9iaW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9iaW5kXCIpOyIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzQ2FsbENoZWNrOyIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0RGVmaW5lUHJvcGVydHlNb2RpbGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhREVTQ1JJUFRPUlMsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIGRlZmluZVByb3BlcnR5OiBvYmplY3REZWZpbmVQcm9wZXJ0eU1vZGlsZS5mXG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG52YXIgT2JqZWN0ID0gcGF0aC5PYmplY3Q7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eS5zaGFtKSBkZWZpbmVQcm9wZXJ0eS5zaGFtID0gdHJ1ZTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7IiwidmFyIF9PYmplY3QkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXG4gICAgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG5cbi8vIGBEYXRlLm5vd2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWRhdGUubm93XG4kKHsgdGFyZ2V0OiAnRGF0ZScsIHN0YXQ6IHRydWUgfSwge1xuICBub3c6IGZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5kYXRlLm5vdycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguRGF0ZS5ub3c7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvZGF0ZS9ub3cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2RhdGUvbm93XCIpOyIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgTVNJRSA9IC9NU0lFIC5cXC4vLnRlc3QodXNlckFnZW50KTsgLy8gPC0gZGlydHkgaWU5LSBjaGVja1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChoYW5kbGVyLCB0aW1lb3V0IC8qICwgLi4uYXJndW1lbnRzICovKSB7XG4gICAgdmFyIGJvdW5kQXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICAgIHZhciBhcmdzID0gYm91bmRBcmdzID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBzY2hlZHVsZXIoYm91bmRBcmdzID8gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAodHlwZW9mIGhhbmRsZXIgPT0gJ2Z1bmN0aW9uJyA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKSkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSA6IGhhbmRsZXIsIHRpbWVvdXQpO1xuICB9O1xufTtcblxuLy8gaWU5LSBzZXRUaW1lb3V0ICYgc2V0SW50ZXJ2YWwgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCN0aW1lcnNcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGZvcmNlZDogTVNJRSB9LCB7XG4gIC8vIGBzZXRUaW1lb3V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCNkb20tc2V0dGltZW91dFxuICBzZXRUaW1lb3V0OiB3cmFwKGdsb2JhbC5zZXRUaW1lb3V0KSxcbiAgLy8gYHNldEludGVydmFsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCNkb20tc2V0aW50ZXJ2YWxcbiAgc2V0SW50ZXJ2YWw6IHdyYXAoZ2xvYmFsLnNldEludGVydmFsKVxufSk7XG4iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi50aW1lcnMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLnNldFRpbWVvdXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL3NldC10aW1lb3V0XCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvcixcbi8vIHNvIHdlIHVzZSBhbiBpbnRlcm1lZGlhdGUgZnVuY3Rpb24uXG5mdW5jdGlvbiBSRShzLCBmKSB7XG4gIHJldHVybiBSZWdFeHAocywgZik7XG59XG5cbmV4cG9ydHMuVU5TVVBQT1JURURfWSA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUkUoJ2EnLCAneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnYWJjZCcpICE9IG51bGw7XG59KTtcblxuZXhwb3J0cy5CUk9LRU5fQ0FSRVQgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTc3MzY4N1xuICB2YXIgcmUgPSBSRSgnXnInLCAnZ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ3N0cicpICE9IG51bGw7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWdleHBGbGFncyA9IHJlcXVpcmUoJy4vcmVnZXhwLWZsYWdzJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4vcmVnZXhwLXN0aWNreS1oZWxwZXJzJyk7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xuLy8gVGhpcyBhbHdheXMgcmVmZXJzIHRvIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIGJlY2F1c2UgdGhlXG4vLyBTdHJpbmcjcmVwbGFjZSBwb2x5ZmlsbCB1c2VzIC4vZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyxcbi8vIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBiZWZvcmUgcGF0Y2hpbmcgdGhlIG1ldGhvZC5cbnZhciBuYXRpdmVSZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xuXG52YXIgcGF0Y2hlZEV4ZWMgPSBuYXRpdmVFeGVjO1xuXG52YXIgVVBEQVRFU19MQVNUX0lOREVYX1dST05HID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlMSA9IC9hLztcbiAgdmFyIHJlMiA9IC9iKi9nO1xuICBuYXRpdmVFeGVjLmNhbGwocmUxLCAnYScpO1xuICBuYXRpdmVFeGVjLmNhbGwocmUyLCAnYScpO1xuICByZXR1cm4gcmUxLmxhc3RJbmRleCAhPT0gMCB8fCByZTIubGFzdEluZGV4ICE9PSAwO1xufSkoKTtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBzdGlja3lIZWxwZXJzLlVOU1VQUE9SVEVEX1kgfHwgc3RpY2t5SGVscGVycy5CUk9LRU5fQ0FSRVQ7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEIHx8IFVOU1VQUE9SVEVEX1k7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4LCByZUNvcHksIG1hdGNoLCBpO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSByZWdleHBGbGFncy5jYWxsKHJlKTtcbiAgICB2YXIgc291cmNlID0gcmUuc291cmNlO1xuICAgIHZhciBjaGFyc0FkZGVkID0gMDtcbiAgICB2YXIgc3RyQ29weSA9IHN0cjtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgneScsICcnKTtcbiAgICAgIGlmIChmbGFncy5pbmRleE9mKCdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IFN0cmluZyhzdHIpLnNsaWNlKHJlLmxhc3RJbmRleCk7XG4gICAgICAvLyBTdXBwb3J0IGFuY2hvcmVkIHN0aWNreSBiZWhhdmlvci5cbiAgICAgIGlmIChyZS5sYXN0SW5kZXggPiAwICYmICghcmUubXVsdGlsaW5lIHx8IHJlLm11bHRpbGluZSAmJiBzdHJbcmUubGFzdEluZGV4IC0gMV0gIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBtYXRjaC5pbnB1dC5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5leGVjYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS5leGVjXG4kKHsgdGFyZ2V0OiAnUmVnRXhwJywgcHJvdG86IHRydWUsIGZvcmNlZDogLy4vLmV4ZWMgIT09IGV4ZWMgfSwge1xuICBleGVjOiBleGVjXG59KTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgIVN5bWJvbC5zaGFtXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzKFN5bWJvbCwgbmFtZSkpIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICBlbHNlIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3MgbW92ZWQgdG8gZW50cnkgcG9pbnRzXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnJlZ2V4cC5leGVjJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbnZhciBSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vICNyZXBsYWNlIG5lZWRzIGJ1aWx0LWluIHN1cHBvcnQgZm9yIG5hbWVkIGdyb3Vwcy5cbiAgLy8gI21hdGNoIHdvcmtzIGZpbmUgYmVjYXVzZSBpdCBqdXN0IHJldHVybiB0aGUgZXhlYyByZXN1bHRzLCBldmVuIGlmIGl0IGhhc1xuICAvLyBhIFwiZ3JvcHNcIiBwcm9wZXJ0eS5cbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbi8vIElFIDw9IDExIHJlcGxhY2VzICQwIHdpdGggdGhlIHdob2xlIG1hdGNoLCBhcyBpZiBpdCB3YXMgJCZcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYwMjQ2NjYvZ2V0dGluZy1pZS10by1yZXBsYWNlLWEtcmVnZXgtd2l0aC10aGUtbGl0ZXJhbC1zdHJpbmctMFxudmFyIFJFUExBQ0VfS0VFUFNfJDAgPSAoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ2EnLnJlcGxhY2UoLy4vLCAnJDAnKSA9PT0gJyQwJztcbn0pKCk7XG5cbnZhciBSRVBMQUNFID0gd2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG4vLyBTYWZhcmkgPD0gMTMuMC4zKD8pIHN1YnN0aXR1dGVzIG50aCBjYXB0dXJlIHdoZXJlIG4+bSB3aXRoIGFuIGVtcHR5IHN0cmluZ1xudmFyIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID0gKGZ1bmN0aW9uICgpIHtcbiAgaWYgKC8uL1tSRVBMQUNFXSkge1xuICAgIHJldHVybiAvLi9bUkVQTEFDRV0oJ2EnLCAnJDAnKSA9PT0gJyc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxuLy8gQ2hyb21lIDUxIGhhcyBhIGJ1Z2d5IFwic3BsaXRcIiBpbXBsZW1lbnRhdGlvbiB3aGVuIFJlZ0V4cCNleGVjICE9PSBuYXRpdmVFeGVjXG4vLyBXZWV4IEpTIGhhcyBmcm96ZW4gYnVpbHQtaW4gcHJvdG90eXBlcywgc28gdXNlIHRyeSAvIGNhdGNoIHdyYXBwZXJcbnZhciBTUExJVF9XT1JLU19XSVRIX09WRVJXUklUVEVOX0VYRUMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAvKD86KS87XG4gIHZhciBvcmlnaW5hbEV4ZWMgPSByZS5leGVjO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gb3JpZ2luYWxFeGVjLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gIHZhciByZXN1bHQgPSAnYWInLnNwbGl0KHJlKTtcbiAgcmV0dXJuIHJlc3VsdC5sZW5ndGggIT09IDIgfHwgcmVzdWx0WzBdICE9PSAnYScgfHwgcmVzdWx0WzFdICE9PSAnYic7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBsZW5ndGgsIGV4ZWMsIHNoYW0pIHtcbiAgdmFyIFNZTUJPTCA9IHdlbGxLbm93blN5bWJvbChLRVkpO1xuXG4gIHZhciBERUxFR0FURVNfVE9fU1lNQk9MID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTdHJpbmcgbWV0aG9kcyBjYWxsIHN5bWJvbC1uYW1lZCBSZWdFcCBtZXRob2RzXG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9IDc7XG4gIH0pO1xuXG4gIHZhciBERUxFR0FURVNfVE9fRVhFQyA9IERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuXG4gICAgaWYgKEtFWSA9PT0gJ3NwbGl0Jykge1xuICAgICAgLy8gV2UgY2FuJ3QgdXNlIHJlYWwgcmVnZXggaGVyZSBzaW5jZSBpdCBjYXVzZXMgZGVvcHRpbWl6YXRpb25cbiAgICAgIC8vIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uIGluIFY4XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzA2XG4gICAgICByZSA9IHt9O1xuICAgICAgLy8gUmVnRXhwW0BAc3BsaXRdIGRvZXNuJ3QgY2FsbCB0aGUgcmVnZXgncyBleGVjIG1ldGhvZCwgYnV0IGZpcnN0IGNyZWF0ZXNcbiAgICAgIC8vIGEgbmV3IG9uZS4gV2UgbmVlZCB0byByZXR1cm4gdGhlIHBhdGNoZWQgcmVnZXggd2hlbiBjcmVhdGluZyB0aGUgbmV3IG9uZS5cbiAgICAgIHJlLmNvbnN0cnVjdG9yID0ge307XG4gICAgICByZS5jb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlOyB9O1xuICAgICAgcmUuZmxhZ3MgPSAnJztcbiAgICAgIHJlW1NZTUJPTF0gPSAvLi9bU1lNQk9MXTtcbiAgICB9XG5cbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkgeyBleGVjQ2FsbGVkID0gdHJ1ZTsgcmV0dXJuIG51bGw7IH07XG5cbiAgICByZVtTWU1CT0xdKCcnKTtcbiAgICByZXR1cm4gIWV4ZWNDYWxsZWQ7XG4gIH0pO1xuXG4gIGlmIChcbiAgICAhREVMRUdBVEVTX1RPX1NZTUJPTCB8fFxuICAgICFERUxFR0FURVNfVE9fRVhFQyB8fFxuICAgIChLRVkgPT09ICdyZXBsYWNlJyAmJiAhKFxuICAgICAgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgJiZcbiAgICAgIFJFUExBQ0VfS0VFUFNfJDAgJiZcbiAgICAgICFSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRVxuICAgICkpIHx8XG4gICAgKEtFWSA9PT0gJ3NwbGl0JyAmJiAhU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDKVxuICApIHtcbiAgICB2YXIgbmF0aXZlUmVnRXhwTWV0aG9kID0gLy4vW1NZTUJPTF07XG4gICAgdmFyIG1ldGhvZHMgPSBleGVjKFNZTUJPTCwgJydbS0VZXSwgZnVuY3Rpb24gKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICBpZiAocmVnZXhwLmV4ZWMgPT09IHJlZ2V4cEV4ZWMpIHtcbiAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZVJlZ0V4cE1ldGhvZC5jYWxsKHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVNZXRob2QuY2FsbChzdHIsIHJlZ2V4cCwgYXJnMikgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlIH07XG4gICAgfSwge1xuICAgICAgUkVQTEFDRV9LRUVQU18kMDogUkVQTEFDRV9LRUVQU18kMCxcbiAgICAgIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFOiBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRVxuICAgIH0pO1xuICAgIHZhciBzdHJpbmdNZXRob2QgPSBtZXRob2RzWzBdO1xuICAgIHZhciByZWdleE1ldGhvZCA9IG1ldGhvZHNbMV07XG5cbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmluZ01ldGhvZCk7XG4gICAgcmVkZWZpbmUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJlZ2V4TWV0aG9kLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cblxuICBpZiAoc2hhbSkgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFJlZ0V4cC5wcm90b3R5cGVbU1lNQk9MXSwgJ3NoYW0nLCB0cnVlKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IGNvZGVQb2ludEF0LCBhdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HID8gUy5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyAyKSA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuY29kZXBvaW50YXRcbiAgY29kZUF0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5hdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbiAgY2hhckF0OiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gY2hhckF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciByZXBsYWNlID0gJycucmVwbGFjZTtcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MUyA9IC9cXCQoWyQmJ2BdfFxcZFxcZD98PFtePl0qPikvZztcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRCA9IC9cXCQoWyQmJ2BdfFxcZFxcZD8pL2c7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0c3Vic3RpdHV0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRjaGVkLCBzdHIsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgdmFyIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRDtcbiAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFM7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2UuY2FsbChyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgIHZhciBjYXB0dXJlO1xuICAgIHN3aXRjaCAoY2guY2hhckF0KDApKSB7XG4gICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgIGNhc2UgJyYnOiByZXR1cm4gbWF0Y2hlZDtcbiAgICAgIGNhc2UgJ2AnOiByZXR1cm4gc3RyLnNsaWNlKDAsIHBvc2l0aW9uKTtcbiAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHIuc2xpY2UodGFpbFBvcyk7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FwdHVyZSA9IG5hbWVkQ2FwdHVyZXNbY2guc2xpY2UoMSwgLTEpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBcXGRcXGQ/XG4gICAgICAgIHZhciBuID0gK2NoO1xuICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICB2YXIgZiA9IGZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICBpZiAoZiA8PSBtKSByZXR1cm4gY2FwdHVyZXNbZiAtIDFdID09PSB1bmRlZmluZWQgPyBjaC5jaGFyQXQoMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaC5jaGFyQXQoMSk7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tuIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gIH0pO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9jbGFzc29mLXJhdycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKHR5cGVvZiBleGVjID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHJlc3VsdCA9IGV4ZWMuY2FsbChSLCBTKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignUmVnRXhwIGV4ZWMgbWV0aG9kIHJldHVybmVkIHNvbWV0aGluZyBvdGhlciB0aGFuIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoY2xhc3NvZihSKSAhPT0gJ1JlZ0V4cCcpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbiAgfVxuXG4gIHJldHVybiByZWdleHBFeGVjLmNhbGwoUiwgUyk7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciBnZXRTdWJzdGl0dXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LXN1YnN0aXR1dGlvbicpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ3JlcGxhY2UnLCAyLCBmdW5jdGlvbiAoUkVQTEFDRSwgbmF0aXZlUmVwbGFjZSwgbWF5YmVDYWxsTmF0aXZlLCByZWFzb24pIHtcbiAgdmFyIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID0gcmVhc29uLlJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFO1xuICB2YXIgUkVQTEFDRV9LRUVQU18kMCA9IHJlYXNvbi5SRVBMQUNFX0tFRVBTXyQwO1xuICB2YXIgVU5TQUZFX1NVQlNUSVRVVEUgPSBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA/ICckJyA6ICckMCc7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucmVwbGFjZVxuICAgIGZ1bmN0aW9uIHJlcGxhY2Uoc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgICAgdmFyIHJlcGxhY2VyID0gc2VhcmNoVmFsdWUgPT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogc2VhcmNoVmFsdWVbUkVQTEFDRV07XG4gICAgICByZXR1cm4gcmVwbGFjZXIgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHJlcGxhY2VyLmNhbGwoc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgICAgOiBuYXRpdmVSZXBsYWNlLmNhbGwoU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAocmVnZXhwLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKCFSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSAmJiBSRVBMQUNFX0tFRVBTXyQwKSB8fFxuICAgICAgICAodHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVwbGFjZVZhbHVlLmluZGV4T2YoVU5TQUZFX1NVQlNUSVRVVEUpID09PSAtMSlcbiAgICAgICkge1xuICAgICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZVJlcGxhY2UsIHJlZ2V4cCwgdGhpcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG5cbiAgICAgIHZhciBmdW5jdGlvbmFsUmVwbGFjZSA9IHR5cGVvZiByZXBsYWNlVmFsdWUgPT09ICdmdW5jdGlvbic7XG4gICAgICBpZiAoIWZ1bmN0aW9uYWxSZXBsYWNlKSByZXBsYWNlVmFsdWUgPSBTdHJpbmcocmVwbGFjZVZhbHVlKTtcblxuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgdmFyIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xuICAgICAgICBpZiAoIWdsb2JhbCkgYnJlYWs7XG5cbiAgICAgICAgdmFyIG1hdGNoU3RyID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgICB2YXIgbWF0Y2hlZCA9IFN0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBtYXgobWluKHRvSW50ZWdlcihyZXN1bHQuaW5kZXgpLCBTLmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgY2FwdHVyZXMgPSBbXTtcbiAgICAgICAgLy8gTk9URTogVGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgY2FwdHVyZXMgPSByZXN1bHQuc2xpY2UoMSkubWFwKG1heWJlVG9TdHJpbmcpXG4gICAgICAgIC8vIGJ1dCBmb3Igc29tZSByZWFzb24gYG5hdGl2ZVNsaWNlLmNhbGwocmVzdWx0LCAxLCByZXN1bHQubGVuZ3RoKWAgKGNhbGxlZCBpblxuICAgICAgICAvLyB0aGUgc2xpY2UgcG9seWZpbGwgd2hlbiBzbGljaW5nIG5hdGl2ZSBhcnJheXMpIFwiZG9lc24ndCB3b3JrXCIgaW4gc2FmYXJpIDkgYW5kXG4gICAgICAgIC8vIGNhdXNlcyBhIGNyYXNoIChodHRwczovL3Bhc3RlYmluLmNvbS9OMjFRemVRQSkgd2hlbiB0cnlpbmcgdG8gZGVidWcgaXQuXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSBjYXB0dXJlcy5wdXNoKG1heWJlVG9TdHJpbmcocmVzdWx0W2pdKSk7XG4gICAgICAgIHZhciBuYW1lZENhcHR1cmVzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgaWYgKGZ1bmN0aW9uYWxSZXBsYWNlKSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VyQXJncyA9IFttYXRjaGVkXS5jb25jYXQoY2FwdHVyZXMsIHBvc2l0aW9uLCBTKTtcbiAgICAgICAgICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSByZXBsYWNlckFyZ3MucHVzaChuYW1lZENhcHR1cmVzKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBTdHJpbmcocmVwbGFjZVZhbHVlLmFwcGx5KHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgbmV4dFNvdXJjZVBvc2l0aW9uID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3VtdWxhdGVkUmVzdWx0ICsgUy5zbGljZShuZXh0U291cmNlUG9zaXRpb24pO1xuICAgIH1cbiAgXTtcbn0pO1xuIiwiZXhwb3J0IGNvbnN0IGZvcm1hdFVuaXQgPSAodW5pdCkgPT4ge1xuICAgIGlmICh1bml0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdW5pdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIGAke3VuaXR9cHhgO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHVuaXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1bml0LnJlcGxhY2UoJ2RwJywgJ3B4Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlzRGVmaW5lZFN0ciA9ICh2YWx1ZSkgPT5cbiAgICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmxlbmd0aCA+IDA7XG5cbmV4cG9ydCBjb25zdCBlc2NhcGVIVE1MID0gKHVuc2FmZSA9ICcnKSA9PlxuICAgIHVuc2FmZVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMwMzk7Jyk7XG5cbmV4cG9ydCBjb25zdCB0aHJvdHRsZSA9IChmbiwgZGVsYXkpID0+IHtcbiAgICBpZiAoZGVsYXkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZuO1xuICAgIH1cblxuICAgIGxldCB0aW1lciA9IGZhbHNlO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZXIgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm4oLi4uYXJndW1lbnRzKTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH07XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIG5hdGl2ZUNvbnN0cnVjdCA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnY29uc3RydWN0Jyk7XG5cbi8vIGBSZWZsZWN0LmNvbnN0cnVjdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZmxlY3QuY29uc3RydWN0XG4vLyBNUyBFZGdlIHN1cHBvcnRzIG9ubHkgMiBhcmd1bWVudHMgYW5kIGFyZ3VtZW50c0xpc3QgYXJndW1lbnQgaXMgb3B0aW9uYWxcbi8vIEZGIE5pZ2h0bHkgc2V0cyB0aGlyZCBhcmd1bWVudCBhcyBgbmV3LnRhcmdldGAsIGJ1dCBkb2VzIG5vdCBjcmVhdGUgYHRoaXNgIGZyb20gaXRcbnZhciBORVdfVEFSR0VUX0JVRyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gIShuYXRpdmVDb25zdHJ1Y3QoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCBbXSwgRikgaW5zdGFuY2VvZiBGKTtcbn0pO1xudmFyIEFSR1NfQlVHID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgbmF0aXZlQ29uc3RydWN0KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSk7XG59KTtcbnZhciBGT1JDRUQgPSBORVdfVEFSR0VUX0JVRyB8fCBBUkdTX0JVRztcblxuJCh7IHRhcmdldDogJ1JlZmxlY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCwgc2hhbTogRk9SQ0VEIH0sIHtcbiAgY29uc3RydWN0OiBmdW5jdGlvbiBjb25zdHJ1Y3QoVGFyZ2V0LCBhcmdzIC8qICwgbmV3VGFyZ2V0ICovKSB7XG4gICAgYUZ1bmN0aW9uKFRhcmdldCk7XG4gICAgYW5PYmplY3QoYXJncyk7XG4gICAgdmFyIG5ld1RhcmdldCA9IGFyZ3VtZW50cy5sZW5ndGggPCAzID8gVGFyZ2V0IDogYUZ1bmN0aW9uKGFyZ3VtZW50c1syXSk7XG4gICAgaWYgKEFSR1NfQlVHICYmICFORVdfVEFSR0VUX0JVRykgcmV0dXJuIG5hdGl2ZUNvbnN0cnVjdChUYXJnZXQsIGFyZ3MsIG5ld1RhcmdldCk7XG4gICAgaWYgKFRhcmdldCA9PSBuZXdUYXJnZXQpIHtcbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgb3B0aW1pemF0aW9uIGZvciAwLTQgYXJndW1lbnRzXG4gICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBUYXJnZXQoKTtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdKTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgY2FzZSAzOiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgY2FzZSA0OiByZXR1cm4gbmV3IFRhcmdldChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgICAgIH1cbiAgICAgIC8vIHcvbyBhbHRlcmVkIG5ld1RhcmdldCwgbG90IG9mIGFyZ3VtZW50cyBjYXNlXG4gICAgICB2YXIgJGFyZ3MgPSBbbnVsbF07XG4gICAgICAkYXJncy5wdXNoLmFwcGx5KCRhcmdzLCBhcmdzKTtcbiAgICAgIHJldHVybiBuZXcgKGJpbmQuYXBwbHkoVGFyZ2V0LCAkYXJncykpKCk7XG4gICAgfVxuICAgIC8vIHdpdGggYWx0ZXJlZCBuZXdUYXJnZXQsIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGNvbnN0cnVjdG9yc1xuICAgIHZhciBwcm90byA9IG5ld1RhcmdldC5wcm90b3R5cGU7XG4gICAgdmFyIGluc3RhbmNlID0gY3JlYXRlKGlzT2JqZWN0KHByb3RvKSA/IHByb3RvIDogT2JqZWN0LnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IEZ1bmN0aW9uLmFwcGx5LmNhbGwoVGFyZ2V0LCBpbnN0YW5jZSwgYXJncyk7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiBpbnN0YW5jZTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnJlZmxlY3QuY29uc3RydWN0Jyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5SZWZsZWN0LmNvbnN0cnVjdDtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9yZWZsZWN0L2NvbnN0cnVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvcmVmbGVjdC9jb25zdHJ1Y3RcIik7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBjcmVhdGU6IGNyZWF0ZVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5jcmVhdGUnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxudmFyIE9iamVjdCA9IHBhdGguT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKSB7XG4gIHJldHVybiBPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9jcmVhdGVcIik7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUgfSwge1xuICBzZXRQcm90b3R5cGVPZjogc2V0UHJvdG90eXBlT2Zcbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpOyIsInZhciBfT2JqZWN0JHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBfT2JqZWN0JHNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NldFByb3RvdHlwZU9mOyIsInZhciBfT2JqZWN0JGNyZWF0ZSA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gX09iamVjdCRjcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuZXhwb3J0cy5mID0gd2VsbEtub3duU3ltYm9sO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSkge1xuICB2YXIgU3ltYm9sID0gcGF0aC5TeW1ib2wgfHwgKHBhdGguU3ltYm9sID0ge30pO1xuICBpZiAoIWhhcyhTeW1ib2wsIE5BTUUpKSBkZWZpbmVQcm9wZXJ0eShTeW1ib2wsIE5BTUUsIHtcbiAgICB2YWx1ZTogd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mKE5BTUUpXG4gIH0pO1xufTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuaXRlcmF0b3JgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5pdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIFNUUklOR19JVEVSQVRPUiA9ICdTdHJpbmcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1RSSU5HX0lURVJBVE9SKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiBTdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS1jb2xsZWN0aW9ucy5pdGVyYXRvcicpO1xudmFyIFdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUgPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZignaXRlcmF0b3InKTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9zeW1ib2wvaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvc3ltYm9sL2l0ZXJhdG9yXCIpOyIsIi8vIGVtcHR5XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xuXG52YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uIChpdCkge1xuICB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpIHtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nXG4gICAgPyBnZXRXaW5kb3dOYW1lcyhpdClcbiAgICA6IG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXModG9JbmRleGVkT2JqZWN0KGl0KSk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgbmF0aXZlT2JqZWN0Q3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNFeHRlcm5hbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy1leHRlcm5hbCcpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wtd3JhcHBlZCcpO1xudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciAkZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5mb3JFYWNoO1xuXG52YXIgSElEREVOID0gc2hhcmVkS2V5KCdoaWRkZW4nKTtcbnZhciBTWU1CT0wgPSAnU3ltYm9sJztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTWU1CT0wpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdFtQUk9UT1RZUEVdO1xudmFyICRTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyICRzdHJpbmdpZnkgPSBnZXRCdWlsdEluKCdKU09OJywgJ3N0cmluZ2lmeScpO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzID0gZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsLmY7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xudmFyIEFsbFN5bWJvbHMgPSBzaGFyZWQoJ3N5bWJvbHMnKTtcbnZhciBPYmplY3RQcm90b3R5cGVTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgU3RyaW5nVG9TeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3RyaW5nLXRvLXN5bWJvbC1yZWdpc3RyeScpO1xudmFyIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC10by1zdHJpbmctcmVnaXN0cnknKTtcbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFFPYmplY3QgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIFVTRV9TRVRURVIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjcmlwdG9yID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0Q3JlYXRlKG5hdGl2ZURlZmluZVByb3BlcnR5KHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIHZhciBPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdFByb3RvdHlwZSwgUCk7XG4gIGlmIChPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yKSBkZWxldGUgT2JqZWN0UHJvdG90eXBlW1BdO1xuICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgJiYgTyAhPT0gT2JqZWN0UHJvdG90eXBlKSB7XG4gICAgbmF0aXZlRGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG90eXBlLCBQLCBPYmplY3RQcm90b3R5cGVEZXNjcmlwdG9yKTtcbiAgfVxufSA6IG5hdGl2ZURlZmluZVByb3BlcnR5O1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcsIGRlc2NyaXB0aW9uKSB7XG4gIHZhciBzeW1ib2wgPSBBbGxTeW1ib2xzW3RhZ10gPSBuYXRpdmVPYmplY3RDcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc2V0SW50ZXJuYWxTdGF0ZShzeW1ib2wsIHtcbiAgICB0eXBlOiBTWU1CT0wsXG4gICAgdGFnOiB0YWcsXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uXG4gIH0pO1xuICBpZiAoIURFU0NSSVBUT1JTKSBzeW1ib2wuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgcmV0dXJuIHN5bWJvbDtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoaXQpIGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGlmIChPID09PSBPYmplY3RQcm90b3R5cGUpICRkZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBQLCBBdHRyaWJ1dGVzKTtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSkge1xuICAgIGlmICghQXR0cmlidXRlcy5lbnVtZXJhYmxlKSB7XG4gICAgICBpZiAoIWhhcyhPLCBISURERU4pKSBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBISURERU4sIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB7fSkpO1xuICAgICAgT1tISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKE8sIEhJRERFTikgJiYgT1tISURERU5dW2tleV0pIE9bSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBBdHRyaWJ1dGVzID0gbmF0aXZlT2JqZWN0Q3JlYXRlKEF0dHJpYnV0ZXMsIHsgZW51bWVyYWJsZTogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIGZhbHNlKSB9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjcmlwdG9yKE8sIGtleSwgQXR0cmlidXRlcyk7XG4gIH0gcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIGtleSwgQXR0cmlidXRlcyk7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBwcm9wZXJ0aWVzID0gdG9JbmRleGVkT2JqZWN0KFByb3BlcnRpZXMpO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMocHJvcGVydGllcykuY29uY2F0KCRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMocHJvcGVydGllcykpO1xuICAkZm9yRWFjaChrZXlzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKCFERVNDUklQVE9SUyB8fCAkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChwcm9wZXJ0aWVzLCBrZXkpKSAkZGVmaW5lUHJvcGVydHkoTywga2V5LCBwcm9wZXJ0aWVzW2tleV0pO1xuICB9KTtcbiAgcmV0dXJuIE87XG59O1xuXG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyBuYXRpdmVPYmplY3RDcmVhdGUoTykgOiAkZGVmaW5lUHJvcGVydGllcyhuYXRpdmVPYmplY3RDcmVhdGUoTyksIFByb3BlcnRpZXMpO1xufTtcblxudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIFAgPSB0b1ByaW1pdGl2ZShWLCB0cnVlKTtcbiAgdmFyIGVudW1lcmFibGUgPSBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRoaXMsIFApO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG90eXBlICYmIGhhcyhBbGxTeW1ib2xzLCBQKSAmJiAhaGFzKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFApKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBlbnVtZXJhYmxlIHx8ICFoYXModGhpcywgUCkgfHwgIWhhcyhBbGxTeW1ib2xzLCBQKSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1bUF0gPyBlbnVtZXJhYmxlIDogdHJ1ZTtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgdmFyIGl0ID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChpdCA9PT0gT2JqZWN0UHJvdG90eXBlICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT2JqZWN0UHJvdG90eXBlU3ltYm9scywga2V5KSkgcmV0dXJuO1xuICB2YXIgZGVzY3JpcHRvciA9IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KTtcbiAgaWYgKGRlc2NyaXB0b3IgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkge1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgdmFyIG5hbWVzID0gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyh0b0luZGV4ZWRPYmplY3QoTykpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gICRmb3JFYWNoKG5hbWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKCFoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKGhpZGRlbktleXMsIGtleSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTykge1xuICB2YXIgSVNfT0JKRUNUX1BST1RPVFlQRSA9IE8gPT09IE9iamVjdFByb3RvdHlwZTtcbiAgdmFyIG5hbWVzID0gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyhJU19PQkpFQ1RfUFJPVE9UWVBFID8gT2JqZWN0UHJvdG90eXBlU3ltYm9scyA6IHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgKCFJU19PQkpFQ1RfUFJPVE9UWVBFIHx8IGhhcyhPYmplY3RQcm90b3R5cGUsIGtleSkpKSB7XG4gICAgICByZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyBgU3ltYm9sYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wtY29uc3RydWN0b3JcbmlmICghTkFUSVZFX1NZTUJPTCkge1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCkgdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAhYXJndW1lbnRzLmxlbmd0aCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFN0cmluZyhhcmd1bWVudHNbMF0pO1xuICAgIHZhciB0YWcgPSB1aWQoZGVzY3JpcHRpb24pO1xuICAgIHZhciBzZXR0ZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUpIHNldHRlci5jYWxsKE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmIChoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKSB0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzY3JpcHRvcih0aGlzLCB0YWcsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYgKERFU0NSSVBUT1JTICYmIFVTRV9TRVRURVIpIHNldFN5bWJvbERlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6IHNldHRlciB9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcsIGRlc2NyaXB0aW9uKTtcbiAgfTtcblxuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnRhZztcbiAgfSk7XG5cbiAgcmVkZWZpbmUoJFN5bWJvbCwgJ3dpdGhvdXRTZXR0ZXInLCBmdW5jdGlvbiAoZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gd3JhcCh1aWQoZGVzY3JpcHRpb24pLCBkZXNjcmlwdGlvbik7XG4gIH0pO1xuXG4gIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIGRlZmluZVByb3BlcnR5TW9kdWxlLmYgPSAkZGVmaW5lUHJvcGVydHk7XG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mID0gZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsLmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIHdyYXBwZWRXZWxsS25vd25TeW1ib2xNb2R1bGUuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2VsbEtub3duU3ltYm9sKG5hbWUpLCBuYW1lKTtcbiAgfTtcblxuICBpZiAoREVTQ1JJUFRPUlMpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1TeW1ib2wtZGVzY3JpcHRpb25cbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sICdkZXNjcmlwdGlvbicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLmRlc2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghSVNfUFVSRSkge1xuICAgICAgcmVkZWZpbmUoT2JqZWN0UHJvdG90eXBlLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHsgdW5zYWZlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxufVxuXG4kKHsgZ2xvYmFsOiB0cnVlLCB3cmFwOiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MLCBzaGFtOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIFN5bWJvbDogJFN5bWJvbFxufSk7XG5cbiRmb3JFYWNoKG9iamVjdEtleXMoV2VsbEtub3duU3ltYm9sc1N0b3JlKSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVmaW5lV2VsbEtub3duU3ltYm9sKG5hbWUpO1xufSk7XG5cbiQoeyB0YXJnZXQ6IFNZTUJPTCwgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBTeW1ib2wuZm9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuZm9yXG4gICdmb3InOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhrZXkpO1xuICAgIGlmIChoYXMoU3RyaW5nVG9TeW1ib2xSZWdpc3RyeSwgc3RyaW5nKSkgcmV0dXJuIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnlbc3RyaW5nXTtcbiAgICB2YXIgc3ltYm9sID0gJFN5bWJvbChzdHJpbmcpO1xuICAgIFN0cmluZ1RvU3ltYm9sUmVnaXN0cnlbc3RyaW5nXSA9IHN5bWJvbDtcbiAgICBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5W3N5bWJvbF0gPSBzdHJpbmc7XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfSxcbiAgLy8gYFN5bWJvbC5rZXlGb3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5rZXlmb3JcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2wnKTtcbiAgICBpZiAoaGFzKFN5bWJvbFRvU3RyaW5nUmVnaXN0cnksIHN5bSkpIHJldHVybiBTeW1ib2xUb1N0cmluZ1JlZ2lzdHJ5W3N5bV07XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24gKCkgeyBVU0VfU0VUVEVSID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IFVTRV9TRVRURVIgPSBmYWxzZTsgfVxufSk7XG5cbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICAvLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvcnNcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wgfSwge1xuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyBgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5c3ltYm9sc1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyBDaHJvbWUgMzggYW5kIDM5IGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBmYWlscyBvbiBwcmltaXRpdmVzXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zNDQzXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBmYWlscyhmdW5jdGlvbiAoKSB7IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mKDEpOyB9KSB9LCB7XG4gIGdldE93blByb3BlcnR5U3ltYm9sczogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSB7XG4gICAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mKHRvT2JqZWN0KGl0KSk7XG4gIH1cbn0pO1xuXG4vLyBgSlNPTi5zdHJpbmdpZnlgIG1ldGhvZCBiZWhhdmlvciB3aXRoIHN5bWJvbHNcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtanNvbi5zdHJpbmdpZnlcbmlmICgkc3RyaW5naWZ5KSB7XG4gIHZhciBGT1JDRURfSlNPTl9TVFJJTkdJRlkgPSAhTkFUSVZFX1NZTUJPTCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN5bWJvbCA9ICRTeW1ib2woKTtcbiAgICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAgIHJldHVybiAkc3RyaW5naWZ5KFtzeW1ib2xdKSAhPSAnW251bGxdJ1xuICAgICAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gICAgICB8fCAkc3RyaW5naWZ5KHsgYTogc3ltYm9sIH0pICE9ICd7fSdcbiAgICAgIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gICAgICB8fCAkc3RyaW5naWZ5KE9iamVjdChzeW1ib2wpKSAhPSAne30nO1xuICB9KTtcblxuICAkKHsgdGFyZ2V0OiAnSlNPTicsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEX0pTT05fU1RSSU5HSUZZIH0sIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCwgcmVwbGFjZXIsIHNwYWNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtpdF07XG4gICAgICB2YXIgaW5kZXggPSAxO1xuICAgICAgdmFyICRyZXBsYWNlcjtcbiAgICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaW5kZXgpIGFyZ3MucHVzaChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgICAgJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgICBpZiAoIWlzT2JqZWN0KHJlcGxhY2VyKSAmJiBpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSkgcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgJHJlcGxhY2VyID09ICdmdW5jdGlvbicpIHZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmICghaXNTeW1ib2wodmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgICAgcmV0dXJuICRzdHJpbmdpZnkuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wucHJvdG90eXBlLUBAdG9wcmltaXRpdmVcbmlmICghJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0pIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG59XG4vLyBgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXWAgcHJvcGVydHlcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvc3RyaW5ndGFnXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCBTWU1CT0wpO1xuXG5oaWRkZW5LZXlzW0hJRERFTl0gPSB0cnVlO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5hc3luY0l0ZXJhdG9yYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuYXN5bmNpdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdhc3luY0l0ZXJhdG9yJyk7XG4iLCIvLyBlbXB0eVxuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5oYXNJbnN0YW5jZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmhhc2luc3RhbmNlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2hhc0luc3RhbmNlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmlzY29uY2F0c3ByZWFkYWJsZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpc0NvbmNhdFNwcmVhZGFibGUnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wubWF0Y2hgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5tYXRjaFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5tYXRjaEFsbGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLm1hdGNoYWxsXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ21hdGNoQWxsJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnJlcGxhY2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5yZXBsYWNlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3JlcGxhY2UnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuc2VhcmNoYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuc2VhcmNoXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3NlYXJjaCcpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5zcGVjaWVzYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuc3BlY2llc1xuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnNwbGl0YCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wuc3BsaXRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnc3BsaXQnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wudG9QcmltaXRpdmVgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC50b3ByaW1pdGl2ZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC50b1N0cmluZ1RhZ2Agd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnRvc3RyaW5ndGFnXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnVuc2NvcGFibGVzYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wudW5zY29wYWJsZXNcbmRlZmluZVdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcblxuLy8gSlNPTltAQHRvU3RyaW5nVGFnXSBwcm9wZXJ0eVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1qc29uLUBAdG9zdHJpbmd0YWdcbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuIiwiLy8gZW1wdHlcbiIsIi8vIGVtcHR5XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmlzLWNvbmNhdC1zcHJlYWRhYmxlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wubWF0Y2gnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLWFsbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wucmVwbGFjZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuc2VhcmNoJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGVjaWVzJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGxpdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wudG8tcHJpbWl0aXZlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC51bnNjb3BhYmxlcycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5qc29uLnRvLXN0cmluZy10YWcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMubWF0aC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnJlZmxlY3QudG8tc3RyaW5nLXRhZycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguU3ltYm9sO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5hc3luY0Rpc3Bvc2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC11c2luZy1zdGF0ZW1lbnRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnYXN5bmNEaXNwb3NlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmRpc3Bvc2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC11c2luZy1zdGF0ZW1lbnRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnZGlzcG9zZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5vYnNlcnZhYmxlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnBhdHRlcm5NYXRjaGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXBhdHRlcm4tbWF0Y2hpbmdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgncGF0dGVybk1hdGNoJyk7XG4iLCIvLyBUT0RPOiByZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdyZXBsYWNlQWxsJyk7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuYXN5bmMtZGlzcG9zZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLmRpc3Bvc2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wucGF0dGVybi1tYXRjaCcpO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGBcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5yZXBsYWNlLWFsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9zeW1ib2xcIik7IiwidmFyIF9TeW1ib2wkaXRlcmF0b3IgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9TeW1ib2wgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL3N5bWJvbFwiKTtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfU3ltYm9sJGl0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIF9TeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9TeW1ib2wgJiYgb2JqICE9PSBfU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkOyIsInZhciBfdHlwZW9mID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIEZBSUxTX09OX1BSSU1JVElWRVMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IG5hdGl2ZUdldFByb3RvdHlwZU9mKDEpOyB9KTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogRkFJTFNfT05fUFJJTUlUSVZFUywgc2hhbTogIUNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiB9LCB7XG4gIGdldFByb3RvdHlwZU9mOiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiBuYXRpdmVHZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpOyIsInZhciBfT2JqZWN0JGdldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9PYmplY3Qkc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IF9PYmplY3Qkc2V0UHJvdG90eXBlT2YgPyBfT2JqZWN0JGdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgX09iamVjdCRnZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciBxdW90ID0gL1wiL2c7XG5cbi8vIEIuMi4zLjIuMSBDcmVhdGVIVE1MKHN0cmluZywgdGFnLCBhdHRyaWJ1dGUsIHZhbHVlKVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVodG1sXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHJpbmcsIHRhZywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHN0cmluZykpO1xuICB2YXIgcDEgPSAnPCcgKyB0YWc7XG4gIGlmIChhdHRyaWJ1dGUgIT09ICcnKSBwMSArPSAnICcgKyBhdHRyaWJ1dGUgKyAnPVwiJyArIFN0cmluZyh2YWx1ZSkucmVwbGFjZShxdW90LCAnJnF1b3Q7JykgKyAnXCInO1xuICByZXR1cm4gcDEgKyAnPicgKyBTICsgJzwvJyArIHRhZyArICc+Jztcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gY2hlY2sgdGhlIGV4aXN0ZW5jZSBvZiBhIG1ldGhvZCwgbG93ZXJjYXNlXG4vLyBvZiBhIHRhZyBhbmQgZXNjYXBpbmcgcXVvdGVzIGluIGFyZ3VtZW50c1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUpIHtcbiAgcmV0dXJuIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGVzdCA9ICcnW01FVEhPRF9OQU1FXSgnXCInKTtcbiAgICByZXR1cm4gdGVzdCAhPT0gdGVzdC50b0xvd2VyQ2FzZSgpIHx8IHRlc3Quc3BsaXQoJ1wiJykubGVuZ3RoID4gMztcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSFRNTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaHRtbCcpO1xudmFyIGZvcmNlZFN0cmluZ0hUTUxNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLWh0bWwtZm9yY2VkJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLmxpbmtgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmxpbmtcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBmb3JjZWRTdHJpbmdIVE1MTWV0aG9kKCdsaW5rJykgfSwge1xuICBsaW5rOiBmdW5jdGlvbiBsaW5rKHVybCkge1xuICAgIHJldHVybiBjcmVhdGVIVE1MKHRoaXMsICdhJywgJ2hyZWYnLCB1cmwpO1xuICB9XG59KTtcbiIsImltcG9ydCB7Zm9ybWF0VW5pdCwgaXNEZWZpbmVkU3RyfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgJy4vdmlldy5zdHlsJztcblxuY2xhc3MgVmlldyB7XG4gICAgY29uc3RydWN0b3IoYXR0cnMgPSB7fSkge1xuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuZWwgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoKTtcblxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZ05hbWUpO1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZSA/PyAnJztcblxuICAgICAgICBlbC5jbGFzc05hbWUgPSAnaW5jaXRvX192aWV3ICcgKyBjbGFzc05hbWU7XG5cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIHNldEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIC8vIElkZW50aWZpZXIuXG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodGhpcy5hdHRycy5pZCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGhpcy5hdHRycy5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSb2xlLlxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHRoaXMuYXR0cnMucm9sZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLXJvbGUnLCB0aGlzLmF0dHJzLnJvbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWNjZXNzaWJpbGl0eSBsYWJlbC5cbiAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih0aGlzLmF0dHJzLmFjY2Vzc2liaWxpdHlfbGFiZWwpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRoaXMuYXR0cnMuYWNjZXNzaWJpbGl0eV9sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBY2Nlc3NpYmlsaXR5IHZpc2liaWxpdHkuXG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmFjY2Vzc2liaWxpdHlfaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZlYXR1cmUgbGFiZWxzLlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmF0dHJzLmZlYXR1cmVfbGFiZWxzKSkge1xuICAgICAgICAgICAgY29uc3QgZmVhdHVyZUxhYmVscyA9IHRoaXMuYXR0cnMuZmVhdHVyZV9sYWJlbHMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChmZWF0dXJlTGFiZWwpID0+IC9eW2Etel8tXXsxLDE0fSQvLnRlc3QoZmVhdHVyZUxhYmVsKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGZlYXR1cmVMYWJlbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICAgICdkYXRhLWZlYXR1cmUtbGFiZWxzJyxcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZUxhYmVscy5qb2luKCcsJylcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGl0bGUuXG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodGhpcy5hdHRycy50aXRsZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRoaXMuYXR0cnMudGl0bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR3Jhdml0eS5cbiAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih0aGlzLmF0dHJzLmdyYXZpdHkpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGF0YS1ncmF2aXR5JywgdGhpcy5hdHRycy5ncmF2aXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExpbmsuXG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodGhpcy5hdHRycy5saW5rKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGluaycsICcnKTtcbiAgICAgICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odGhpcy5hdHRycy5saW5rLCAnX2JsYW5rJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdpZHRoLlxuICAgICAgICBpZiAodGhpcy5hdHRycy5sYXlvdXRfd2lkdGggPT09ICdtYXRjaF9wYXJlbnQnKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXR0cnMubGF5b3V0X3dpZHRoID09PSAnd3JhcF9jb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRycy5sYXlvdXRfd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5sYXlvdXRfd2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGVpZ2h0LlxuICAgICAgICBpZiAodGhpcy5hdHRycy5sYXlvdXRfaGVpZ2h0ID09PSAnbWF0Y2hfcGFyZW50Jykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRycy5sYXlvdXRfaGVpZ2h0ID09PSAnd3JhcF9jb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRycy5sYXlvdXRfaGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuaGVpZ2h0ID0gZm9ybWF0VW5pdCh0aGlzLmF0dHJzLmxheW91dF9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWluIHdpZHRoLlxuICAgICAgICBpZiAodGhpcy5hdHRycy5taW5fd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5taW5XaWR0aCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5taW5fd2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWF4IHdpZHRoLlxuICAgICAgICBpZiAodGhpcy5hdHRycy5tYXhfd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXhXaWR0aCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5tYXhfd2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWluIGhlaWdodC5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubWluX2hlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLm1pbkhlaWdodCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5taW5faGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1heCBoZWlnaHQuXG4gICAgICAgIGlmICh0aGlzLmF0dHJzLm1heF9oZWlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXhIZWlnaHQgPSBmb3JtYXRVbml0KHRoaXMuYXR0cnMubWF4X2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3NpdGlvbiBpbiByZWxhdGlvbiB0byBwYXJlbnQuXG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmxheW91dF90b3AgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSBmb3JtYXRVbml0KHRoaXMuYXR0cnMubGF5b3V0X3RvcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubGF5b3V0X2xlZnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gZm9ybWF0VW5pdCh0aGlzLmF0dHJzLmxheW91dF9sZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5sYXlvdXRfcmlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5yaWdodCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5sYXlvdXRfcmlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmxheW91dF9ib3R0b20gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3R0b20gPSBmb3JtYXRVbml0KHRoaXMuYXR0cnMubGF5b3V0X2JvdHRvbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCYWNrZ3JvdW5kLlxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHRoaXMuYXR0cnMuYmFja2dyb3VuZF9jb2xvcikpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gdGhpcy5hdHRycy5iYWNrZ3JvdW5kX2NvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodGhpcy5hdHRycy5iYWNrZ3JvdW5kX2ltYWdlKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgdGhpcy5hdHRycy5iYWNrZ3JvdW5kX2ltYWdlKTtcbiAgICAgICAgICAgIHRoaXMubGF6eWxvYWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIFsncmVwZWF0X3gnLCAncmVwZWF0X3knLCAncmVwZWF0J10uaW5kZXhPZihcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLmJhY2tncm91bmRfdGlsZV9tb2RlXG4gICAgICAgICAgICApICE9PSAtMVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9IHRoaXMuYXR0cnMuYmFja2dyb3VuZF90aWxlX21vZGUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAnXycsXG4gICAgICAgICAgICAgICAgJy0nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodGhpcy5hdHRycy5iYWNrZ3JvdW5kX2ltYWdlX3Bvc2l0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLmF0dHJzLmJhY2tncm91bmRfaW1hZ2VfcG9zaXRpb24ucmVwbGFjZShcbiAgICAgICAgICAgICAgICAnXycsXG4gICAgICAgICAgICAgICAgJyAnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmJhY2tncm91bmRfaW1hZ2Vfc2NhbGVfdHlwZSA9PT0gJ2NlbnRlcl9jcm9wJykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb3Zlcic7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRycy5iYWNrZ3JvdW5kX2ltYWdlX3NjYWxlX3R5cGUgPT09ICdjZW50ZXJfaW5zaWRlJykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb250YWluJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1hcmdpbi5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubGF5b3V0X21hcmdpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLm1hcmdpbiA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5sYXlvdXRfbWFyZ2luKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5sYXlvdXRfbWFyZ2luX3RvcCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLm1hcmdpblRvcCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5sYXlvdXRfbWFyZ2luX3RvcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubGF5b3V0X21hcmdpbl9sZWZ0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubWFyZ2luTGVmdCA9IGZvcm1hdFVuaXQoXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRycy5sYXlvdXRfbWFyZ2luX2xlZnRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubGF5b3V0X21hcmdpbl9yaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLm1hcmdpblJpZ2h0ID0gZm9ybWF0VW5pdChcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLmxheW91dF9tYXJnaW5fcmlnaHRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubGF5b3V0X21hcmdpbl9ib3R0b20gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBmb3JtYXRVbml0KFxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMubGF5b3V0X21hcmdpbl9ib3R0b21cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYWRkaW5nLlxuICAgICAgICBpZiAodGhpcy5hdHRycy5wYWRkaW5nICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUucGFkZGluZyA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5wYWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5wYWRkaW5nX3RvcCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBhZGRpbmdUb3AgPSBmb3JtYXRVbml0KHRoaXMuYXR0cnMucGFkZGluZ190b3ApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLnBhZGRpbmdfbGVmdCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBhZGRpbmdMZWZ0ID0gZm9ybWF0VW5pdCh0aGlzLmF0dHJzLnBhZGRpbmdfbGVmdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMucGFkZGluZ19yaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBhZGRpbmdSaWdodCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5wYWRkaW5nX3JpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5wYWRkaW5nX2JvdHRvbSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBmb3JtYXRVbml0KHRoaXMuYXR0cnMucGFkZGluZ19ib3R0b20pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29ybmVyIHJhZGl1cy5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMuY29ybmVyX3JhZGl1cyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5jb3JuZXJfcmFkaXVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5jb3JuZXJfdG9wX2xlZnRfcmFkaXVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYm9yZGVyVG9wTGVmdFJhZGl1cyA9IGZvcm1hdFVuaXQoXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRycy5jb3JuZXJfdG9wX2xlZnRfcmFkaXVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmNvcm5lcl90b3BfcmlnaHRfcmFkaXVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYm9yZGVyVG9wUmlnaHRSYWRpdXMgPSBmb3JtYXRVbml0KFxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMuY29ybmVyX3RvcF9yaWdodF9yYWRpdXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMuY29ybmVyX2JvdHRvbV9sZWZ0X3JhZGl1cyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJvcmRlckJvdHRvbUxlZnRSYWRpdXMgPSBmb3JtYXRVbml0KFxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMuY29ybmVyX2JvdHRvbV9sZWZ0X3JhZGl1c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5jb3JuZXJfYm90dG9tX3JpZ2h0X3JhZGl1cyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzID0gZm9ybWF0VW5pdChcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLmNvcm5lcl9ib3R0b21fcmlnaHRfcmFkaXVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2xpcCBjaGlsZHJlbi5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMuY2xpcF9jaGlsZHJlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUub3ZlcmZsb3cgPSAndmlzaWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaGFkb3cuXG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuZ2V0U2hhZG93KCk7XG5cbiAgICAgICAgaWYgKHNoYWRvdyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJveFNoYWRvdyA9IGAke3NoYWRvdy5keH1weCAke3NoYWRvdy5keX1weCAke3NoYWRvdy5yYWRpdXN9cHggJHtzaGFkb3cuY29sb3J9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0cm9rZS5cbiAgICAgICAgY29uc3Qgc3Ryb2tlU3R5bGVzID0gWydzb2xpZCcsICdkb3R0ZWQnLCAnZGFzaGVkJ107XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMuc3Ryb2tlX3dpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYm9yZGVyV2lkdGggPSBmb3JtYXRVbml0KHRoaXMuYXR0cnMuc3Ryb2tlX3dpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfY29sb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3JkZXJDb2xvciA9IHRoaXMuYXR0cnMuc3Ryb2tlX2NvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJva2VTdHlsZXMuaW5kZXhPZih0aGlzLmF0dHJzLnN0cm9rZV9zdHlsZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJvcmRlclN0eWxlID0gdGhpcy5hdHRycy5zdHJva2Vfc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfdG9wX3dpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYm9yZGVyVG9wV2lkdGggPSBmb3JtYXRVbml0KFxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMuc3Ryb2tlX3RvcF93aWR0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfdG9wX2NvbG9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYm9yZGVyVG9wQ29sb3IgPSB0aGlzLmF0dHJzLnN0cm9rZV90b3BfY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfbGVmdF93aWR0aCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJvcmRlckxlZnRXaWR0aCA9IGZvcm1hdFVuaXQoXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRycy5zdHJva2VfbGVmdF93aWR0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfbGVmdF9jb2xvciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IHRoaXMuYXR0cnMuc3Ryb2tlX2xlZnRfY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfcmlnaHRfd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3JkZXJSaWdodFdpZHRoID0gZm9ybWF0VW5pdChcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLnN0cm9rZV9yaWdodF93aWR0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfcmlnaHRfY29sb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5ib3JkZXJSaWdodENvbG9yID0gdGhpcy5hdHRycy5zdHJva2VfcmlnaHRfY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfYm90dG9tX3dpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYm9yZGVyQm90dG9tV2lkdGggPSBmb3JtYXRVbml0KFxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnMuc3Ryb2tlX2JvdHRvbV93aWR0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5zdHJva2VfYm90dG9tX2NvbG9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuYm9yZGVyQm90dG9tQ29sb3IgPSB0aGlzLmF0dHJzLnN0cm9rZV9ib3R0b21fY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGbGV4LlxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXR0cnMubGF5b3V0X2ZsZXhfc2hyaW5rID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5mbGV4U2hyaW5rID0gdGhpcy5hdHRycy5sYXlvdXRfZmxleF9zaHJpbms7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLm1zRmxleFNocmluayA9IHRoaXMuYXR0cnMubGF5b3V0X2ZsZXhfc2hyaW5rO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5hdHRycy5sYXlvdXRfZmxleF9ncm93ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5mbGV4R3JvdyA9IHRoaXMuYXR0cnMubGF5b3V0X2ZsZXhfZ3JvdztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubXNGbGV4R3JvdyA9IHRoaXMuYXR0cnMubGF5b3V0X2ZsZXhfZ3JvdztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRycy5sYXlvdXRfZmxleF9iYXNpcyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmZsZXhCYXNpcyA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy5sYXlvdXRfZmxleF9iYXNpcyk7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLm1zRmxleEJhc2lzID0gZm9ybWF0VW5pdChcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzLmxheW91dF9mbGV4X2Jhc2lzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJhbnNmb3Jtcy5cbiAgICAgICAgY29uc3QgdHJhbnNmb3JtcyA9IHRoaXMuZ2V0VHJhbnNmb3JtcygpO1xuXG4gICAgICAgIGlmICh0cmFuc2Zvcm1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3Jtcy5qb2luKCcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmFuc2Zvcm0gb3JpZ2luLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuYXR0cnMudHJhbnNmb3JtX29yaWdpbikgJiZcbiAgICAgICAgICAgIHRoaXMuYXR0cnMudHJhbnNmb3JtX29yaWdpbi5sZW5ndGggPT09IDJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IFtcbiAgICAgICAgICAgICAgICBmb3JtYXRVbml0KHRoaXMuYXR0cnMudHJhbnNmb3JtX29yaWdpblswXSksXG4gICAgICAgICAgICAgICAgZm9ybWF0VW5pdCh0aGlzLmF0dHJzLnRyYW5zZm9ybV9vcmlnaW5bMV0pXG4gICAgICAgICAgICBdLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRyYW5zZm9ybXMoKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBbXTtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlWCA9IGZvcm1hdFVuaXQodGhpcy5hdHRycy50cmFuc2Zvcm1fdHJhbnNsYXRlX3gpO1xuICAgICAgICBjb25zdCB0cmFuc2xhdGVZID0gZm9ybWF0VW5pdCh0aGlzLmF0dHJzLnRyYW5zZm9ybV90cmFuc2xhdGVfeSk7XG5cbiAgICAgICAgaWYgKHRyYW5zbGF0ZVggIT09IDApIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybXMucHVzaChgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZVh9KWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zbGF0ZVkgIT09IDApIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybXMucHVzaChgdHJhbnNsYXRlWSgke3RyYW5zbGF0ZVl9KWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuYXR0cnMudHJhbnNmb3JtX3JvdGF0ZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHRoaXMuYXR0cnMudHJhbnNmb3JtX3JvdGF0ZSAhPT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybXMucHVzaChgcm90YXRlKCR7dGhpcy5hdHRycy50cmFuc2Zvcm1fcm90YXRlfWRlZylgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmF0dHJzLnRyYW5zZm9ybV9zY2FsZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHRoaXMuYXR0cnMudHJhbnNmb3JtX3NjYWxlICE9PSAxXG4gICAgICAgICkge1xuICAgICAgICAgICAgdHJhbnNmb3Jtcy5wdXNoKGBzY2FsZSgke3RoaXMuYXR0cnMudHJhbnNmb3JtX3NjYWxlfSlgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1zO1xuICAgIH1cblxuICAgIGdldFNoYWRvdygpIHtcbiAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih0aGlzLmF0dHJzLnNoYWRvd19jb2xvcikpIHtcbiAgICAgICAgICAgIGNvbnN0IGR4ID1cbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcy5hdHRycy5zaGFkb3dfZHggPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5hdHRycy5zaGFkb3dfZHhcbiAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgY29uc3QgZHkgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLmF0dHJzLnNoYWRvd19keSA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmF0dHJzLnNoYWRvd19keVxuICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLmF0dHJzLnNoYWRvd19yYWRpdXMgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5hdHRycy5zaGFkb3dfcmFkaXVzXG4gICAgICAgICAgICAgICAgICAgIDogMDtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5hdHRycy5zaGFkb3dfY29sb3I7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZHgsXG4gICAgICAgICAgICAgICAgZHksXG4gICAgICAgICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgICAgICAgIGNvbG9yXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuVmlldy5wcm90b3R5cGUudGFnTmFtZSA9ICdkaXYnO1xuVmlldy5wcm90b3R5cGUuY2xhc3NOYW1lID0gbnVsbDtcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG4iLCJpbXBvcnQgJy4vYWJzb2x1dGUtbGF5b3V0LnN0eWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY2xhc3MgQWJzb2x1dGVMYXlvdXQgZXh0ZW5kcyBWaWV3IHt9XG5BYnNvbHV0ZUxheW91dC5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ2luY2l0b19fYWJzb2x1dGUtbGF5b3V0LXZpZXcnO1xuZXhwb3J0IGRlZmF1bHQgQWJzb2x1dGVMYXlvdXQ7XG4iLCJpbXBvcnQgJy4vZmxleC1sYXlvdXQuc3R5bCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBhbGlnbkl0ZW1Nb2RlcyA9IFtcbiAgICAnc3RyZXRjaCcsXG4gICAgJ2NlbnRlcicsXG4gICAgJ2ZsZXgtc3RhcnQnLFxuICAgICdmbGV4LWVuZCcsXG4gICAgJ2Jhc2VsaW5lJ1xuXTtcbmNvbnN0IGZsZXhKdXN0aWZ5TW9kZXMgPSBbXG4gICAgJ2ZsZXgtc3RhcnQnLFxuICAgICdmbGV4LWVuZCcsXG4gICAgJ2NlbnRlcicsXG4gICAgJ3NwYWNlLWJldHdlZW4nLFxuICAgICdzcGFjZS1hcm91bmQnXG5dO1xuY29uc3QgZmxleERpcmVjdGlvbk1vZGVzID0gWydyb3cnLCAnY29sdW1uJ107XG5cbmNsYXNzIEZsZXhMYXlvdXQgZXh0ZW5kcyBWaWV3IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmIChhbGlnbkl0ZW1Nb2Rlcy5pbmRleE9mKHRoaXMuYXR0cnMubGF5b3V0X2ZsZXhfYWxpZ25faXRlbXMpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5hbGlnbkl0ZW1zID0gdGhpcy5hdHRycy5sYXlvdXRfZmxleF9hbGlnbl9pdGVtcztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubXNBbGlnbkl0ZW1zID0gdGhpcy5hdHRycy5sYXlvdXRfZmxleF9hbGlnbl9pdGVtcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGZsZXhKdXN0aWZ5TW9kZXMuaW5kZXhPZih0aGlzLmF0dHJzLmxheW91dF9mbGV4X2p1c3RpZnlfY29udGVudCkgIT09XG4gICAgICAgICAgICAtMVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSB0aGlzLmF0dHJzLmxheW91dF9mbGV4X2p1c3RpZnlfY29udGVudDtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUubXNGbGV4UGFjayA9IHRoaXMuYXR0cnMubGF5b3V0X2ZsZXhfanVzdGlmeV9jb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbk1vZGVzLmluZGV4T2YodGhpcy5hdHRycy5sYXlvdXRfZmxleF9kaXJlY3Rpb24pICE9PSAtMVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuZmxleERpcmVjdGlvbiA9IHRoaXMuYXR0cnMubGF5b3V0X2ZsZXhfZGlyZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5tc0ZsZXhEaXJlY3Rpb24gPSB0aGlzLmF0dHJzLmxheW91dF9mbGV4X2RpcmVjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbkZsZXhMYXlvdXQucHJvdG90eXBlLmNsYXNzTmFtZSA9ICdpbmNpdG9fX2ZsZXgtbGF5b3V0LXZpZXcnO1xuZXhwb3J0IGRlZmF1bHQgRmxleExheW91dDtcbiIsImltcG9ydCB7aXNEZWZpbmVkU3RyfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgJy4vaW1hZ2Uuc3R5bCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jbGFzcyBJbWFnZSBleHRlbmRzIFZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih0aGlzLmF0dHJzLnNyYykpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIHRoaXMuYXR0cnMuc3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodGhpcy5hdHRycy5sYWJlbCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdhbHQnLCB0aGlzLmF0dHJzLmxhYmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdhbHQnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5JbWFnZS5wcm90b3R5cGUudGFnTmFtZSA9ICdpbWcnO1xuSW1hZ2UucHJvdG90eXBlLmNsYXNzTmFtZSA9ICdpbmNpdG9fX2ltYWdlLXZpZXcnO1xuSW1hZ2UucHJvdG90eXBlLmxhenlsb2FkID0gdHJ1ZTtcbmV4cG9ydCBkZWZhdWx0IEltYWdlO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nID0gRnVuY3Rpb25Qcm90b3R5cGUudG9TdHJpbmc7XG52YXIgbmFtZVJFID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvO1xudmFyIE5BTUUgPSAnbmFtZSc7XG5cbi8vIEZ1bmN0aW9uIGluc3RhbmNlcyBgLm5hbWVgIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLWluc3RhbmNlcy1uYW1lXG5pZiAoREVTQ1JJUFRPUlMgJiYgIShOQU1FIGluIEZ1bmN0aW9uUHJvdG90eXBlKSkge1xuICBkZWZpbmVQcm9wZXJ0eShGdW5jdGlvblByb3RvdHlwZSwgTkFNRSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nLmNhbGwodGhpcykubWF0Y2gobmFtZVJFKVsxXTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc3JlZ2V4cFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY2xhc3NvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYFNwZWNpZXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNwZWNpZXNjb25zdHJ1Y3RvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgZGVmYXVsdENvbnN0cnVjdG9yKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IGRlZmF1bHRDb25zdHJ1Y3RvciA6IGFGdW5jdGlvbihTKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjYWxsUmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgYXJyYXlQdXNoID0gW10ucHVzaDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBNQVhfVUlOVDMyID0gMHhGRkZGRkZGRjtcblxuLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCd4JywgJ3knKSAtPiAveC95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciBTVVBQT1JUU19ZID0gIWZhaWxzKGZ1bmN0aW9uICgpIHsgcmV0dXJuICFSZWdFeHAoTUFYX1VJTlQzMiwgJ3knKTsgfSk7XG5cbi8vIEBAc3BsaXQgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdzcGxpdCcsIDIsIGZ1bmN0aW9uIChTUExJVCwgbmF0aXZlU3BsaXQsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgaW50ZXJuYWxTcGxpdDtcbiAgaWYgKFxuICAgICdhYmJjJy5zcGxpdCgvKGIpKi8pWzFdID09ICdjJyB8fFxuICAgICd0ZXN0Jy5zcGxpdCgvKD86KS8sIC0xKS5sZW5ndGggIT0gNCB8fFxuICAgICdhYicuc3BsaXQoLyg/OmFiKSovKS5sZW5ndGggIT0gMiB8fFxuICAgICcuJy5zcGxpdCgvKC4/KSguPykvKS5sZW5ndGggIT0gNCB8fFxuICAgICcuJy5zcGxpdCgvKCkoKS8pLmxlbmd0aCA+IDEgfHxcbiAgICAnJy5zcGxpdCgvLj8vKS5sZW5ndGhcbiAgKSB7XG4gICAgLy8gYmFzZWQgb24gZXM1LXNoaW0gaW1wbGVtZW50YXRpb24sIG5lZWQgdG8gcmV3b3JrIGl0XG4gICAgaW50ZXJuYWxTcGxpdCA9IGZ1bmN0aW9uIChzZXBhcmF0b3IsIGxpbWl0KSB7XG4gICAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoc2VwYXJhdG9yID09PSB1bmRlZmluZWQpIHJldHVybiBbc3RyaW5nXTtcbiAgICAgIC8vIElmIGBzZXBhcmF0b3JgIGlzIG5vdCBhIHJlZ2V4LCB1c2UgbmF0aXZlIHNwbGl0XG4gICAgICBpZiAoIWlzUmVnRXhwKHNlcGFyYXRvcikpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVNwbGl0LmNhbGwoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbSk7XG4gICAgICB9XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB2YXIgZmxhZ3MgPSAoc2VwYXJhdG9yLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNlcGFyYXRvci51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3Iuc3RpY2t5ID8gJ3knIDogJycpO1xuICAgICAgdmFyIGxhc3RMYXN0SW5kZXggPSAwO1xuICAgICAgLy8gTWFrZSBgZ2xvYmFsYCBhbmQgYXZvaWQgYGxhc3RJbmRleGAgaXNzdWVzIGJ5IHdvcmtpbmcgd2l0aCBhIGNvcHlcbiAgICAgIHZhciBzZXBhcmF0b3JDb3B5ID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArICdnJyk7XG4gICAgICB2YXIgbWF0Y2gsIGxhc3RJbmRleCwgbGFzdExlbmd0aDtcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJlZ2V4cEV4ZWMuY2FsbChzZXBhcmF0b3JDb3B5LCBzdHJpbmcpKSB7XG4gICAgICAgIGxhc3RJbmRleCA9IHNlcGFyYXRvckNvcHkubGFzdEluZGV4O1xuICAgICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyaW5nLmxlbmd0aCkgYXJyYXlQdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgbGFzdExhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgICBpZiAob3V0cHV0Lmxlbmd0aCA+PSBsaW0pIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCA9PT0gbWF0Y2guaW5kZXgpIHNlcGFyYXRvckNvcHkubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0TGFzdEluZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3JDb3B5LnRlc3QoJycpKSBvdXRwdXQucHVzaCgnJyk7XG4gICAgICB9IGVsc2Ugb3V0cHV0LnB1c2goc3RyaW5nLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICAgIHJldHVybiBvdXRwdXQubGVuZ3RoID4gbGltID8gb3V0cHV0LnNsaWNlKDAsIGxpbSkgOiBvdXRwdXQ7XG4gICAgfTtcbiAgLy8gQ2hha3JhLCBWOFxuICB9IGVsc2UgaWYgKCcwJy5zcGxpdCh1bmRlZmluZWQsIDApLmxlbmd0aCkge1xuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkICYmIGxpbWl0ID09PSAwID8gW10gOiBuYXRpdmVTcGxpdC5jYWxsKHRoaXMsIHNlcGFyYXRvciwgbGltaXQpO1xuICAgIH07XG4gIH0gZWxzZSBpbnRlcm5hbFNwbGl0ID0gbmF0aXZlU3BsaXQ7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnNwbGl0XG4gICAgZnVuY3Rpb24gc3BsaXQoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgICAgdmFyIHNwbGl0dGVyID0gc2VwYXJhdG9yID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlcGFyYXRvcltTUExJVF07XG4gICAgICByZXR1cm4gc3BsaXR0ZXIgIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHNwbGl0dGVyLmNhbGwoc2VwYXJhdG9yLCBPLCBsaW1pdClcbiAgICAgICAgOiBpbnRlcm5hbFNwbGl0LmNhbGwoU3RyaW5nKE8pLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEBzcGxpdFxuICAgIC8vXG4gICAgLy8gTk9URTogVGhpcyBjYW5ub3QgYmUgcHJvcGVybHkgcG9seWZpbGxlZCBpbiBlbmdpbmVzIHRoYXQgZG9uJ3Qgc3VwcG9ydFxuICAgIC8vIHRoZSAneScgZmxhZy5cbiAgICBmdW5jdGlvbiAocmVnZXhwLCBsaW1pdCkge1xuICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShpbnRlcm5hbFNwbGl0LCByZWdleHAsIHRoaXMsIGxpbWl0LCBpbnRlcm5hbFNwbGl0ICE9PSBuYXRpdmVTcGxpdCk7XG4gICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcbiAgICAgIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKHJ4LCBSZWdFeHApO1xuXG4gICAgICB2YXIgdW5pY29kZU1hdGNoaW5nID0gcngudW5pY29kZTtcbiAgICAgIHZhciBmbGFncyA9IChyeC5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyeC5tdWx0aWxpbmUgPyAnbScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJ4LnVuaWNvZGUgPyAndScgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKFNVUFBPUlRTX1kgPyAneScgOiAnZycpO1xuXG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgUyBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgdmFyIHNwbGl0dGVyID0gbmV3IEMoU1VQUE9SVFNfWSA/IHJ4IDogJ14oPzonICsgcnguc291cmNlICsgJyknLCBmbGFncyk7XG4gICAgICB2YXIgbGltID0gbGltaXQgPT09IHVuZGVmaW5lZCA/IE1BWF9VSU5UMzIgOiBsaW1pdCA+Pj4gMDtcbiAgICAgIGlmIChsaW0gPT09IDApIHJldHVybiBbXTtcbiAgICAgIGlmIChTLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGNhbGxSZWdFeHBFeGVjKHNwbGl0dGVyLCBTKSA9PT0gbnVsbCA/IFtTXSA6IFtdO1xuICAgICAgdmFyIHAgPSAwO1xuICAgICAgdmFyIHEgPSAwO1xuICAgICAgdmFyIEEgPSBbXTtcbiAgICAgIHdoaWxlIChxIDwgUy5sZW5ndGgpIHtcbiAgICAgICAgc3BsaXR0ZXIubGFzdEluZGV4ID0gU1VQUE9SVFNfWSA/IHEgOiAwO1xuICAgICAgICB2YXIgeiA9IGNhbGxSZWdFeHBFeGVjKHNwbGl0dGVyLCBTVVBQT1JUU19ZID8gUyA6IFMuc2xpY2UocSkpO1xuICAgICAgICB2YXIgZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHogPT09IG51bGwgfHxcbiAgICAgICAgICAoZSA9IG1pbih0b0xlbmd0aChzcGxpdHRlci5sYXN0SW5kZXggKyAoU1VQUE9SVFNfWSA/IDAgOiBxKSksIFMubGVuZ3RoKSkgPT09IHBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcSA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCBxLCB1bmljb2RlTWF0Y2hpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEEucHVzaChTLnNsaWNlKHAsIHEpKTtcbiAgICAgICAgICBpZiAoQS5sZW5ndGggPT09IGxpbSkgcmV0dXJuIEE7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gei5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIEEucHVzaCh6W2ldKTtcbiAgICAgICAgICAgIGlmIChBLmxlbmd0aCA9PT0gbGltKSByZXR1cm4gQTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcSA9IHAgPSBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBBLnB1c2goUy5zbGljZShwKSk7XG4gICAgICByZXR1cm4gQTtcbiAgICB9XG4gIF07XG59LCAhU1VQUE9SVFNfWSk7XG4iLCJpbXBvcnQge2VzY2FwZUhUTUwsIGlzRGVmaW5lZFN0cn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0ICcuL3RleHQuc3R5bCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jbGFzcyBUZXh0VmlldyBleHRlbmRzIFZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCFpc0RlZmluZWRTdHIodGhpcy5hdHRycy50ZXh0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZXh0U3R5bGVzID0gKHRoaXMuYXR0cnMudGV4dF9zdHlsZSB8fCAnJykuc3BsaXQoJ3wnKTtcbiAgICAgICAgbGV0IHt0ZXh0fSA9IHRoaXMuYXR0cnM7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5hdHRycy5zcGFucykgJiYgdGhpcy5hdHRycy5zcGFucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRUZXh0ID0gdGhpcy5wYXJzZVNwYW5zKHRleHQsIHRoaXMuYXR0cnMuc3BhbnMpO1xuICAgICAgICAgICAgdGV4dCA9IHBhcnNlZFRleHQubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXNjYXBlZFRleHQgPSBlc2NhcGVIVE1MKGl0ZW0udGV4dCB8fCAnJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zcGFuPy5uYW1lID09PSAnbGluaycgJiYgaXRlbS5zcGFuLnVybCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGEgaHJlZj1cIiR7ZW5jb2RlVVJJKFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zcGFuLnVybFxuICAgICAgICAgICAgICAgICAgICApfVwiIHJlbD1cImV4dGVybmFsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtlc2NhcGVkVGV4dH08L2E+YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3Bhbj8ubmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5OYW1lID0gaXRlbS5zcGFuLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8c3BhbiBkYXRhLW5hbWU9XCIke3NwYW5OYW1lfVwiPiR7ZXNjYXBlZFRleHR9PC9zcGFuPmA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBlc2NhcGVkVGV4dDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGV4dCA9IHRleHQuam9pbignJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0ID0gZXNjYXBlSFRNTCh0ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJzLnRleHRfcHJldmVudF93aWRvdykge1xuICAgICAgICAgICAgdGV4dCA9IHRleHRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJm5ic3A7KFteXFxzXSspJC8sICcgJDEnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMoW15cXHNdKylcXHMqJC8sICcmbmJzcDskMScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xuXG4gICAgICAgIC8vIEZvbnQgZmFtaWx5LlxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuYXR0cnMuZm9udF9mYW1pbHkpICYmXG4gICAgICAgICAgICB0aGlzLmF0dHJzLmZvbnRfZmFtaWx5Lmxlbmd0aCA+IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmZvbnRGYW1pbHkgPSBgJHt0aGlzLmF0dHJzLmZvbnRfZmFtaWx5LmpvaW4oXG4gICAgICAgICAgICAgICAgJywgJ1xuICAgICAgICAgICAgKX0gIWltcG9ydGFudGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmZvbnRGYW1pbHkgPSAnaW5oZXJpdCAhaW1wb3J0YW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRleHQgc2l6ZS5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMudGV4dF9zaXplICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuZm9udFNpemUgPSBgJHt0aGlzLmF0dHJzLnRleHRfc2l6ZX1weGA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMaW5lIGhlaWdodC5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubGluZV9zcGFjaW5nX211bHRpcGxpZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5saW5lSGVpZ2h0ID0gdGhpcy5hdHRycy5saW5lX3NwYWNpbmdfbXVsdGlwbGllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRleHQgY29sb3IuXG4gICAgICAgIGlmICh0aGlzLmF0dHJzLnRleHRfY29sb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5jb2xvciA9IHRoaXMuYXR0cnMudGV4dF9jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRleHQgc3R5bGVzLlxuICAgICAgICBpZiAodGV4dFN0eWxlcy5pbmRleE9mKCdib2xkJykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHRTdHlsZXMuaW5kZXhPZignaXRhbGljJykgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmZvbnRTdHlsZSA9ICdpdGFsaWMnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5hdHRycy50ZXh0X2RlY29yYXRpb25fbGluZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudGV4dERlY29yYXRpb25MaW5lID0gdGhpcy5hdHRycy50ZXh0X2RlY29yYXRpb25fbGluZS5qb2luKFxuICAgICAgICAgICAgICAgICcgJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRleHQgc2hhZG93LlxuICAgICAgICBjb25zdCB0ZXh0U2hhZG93ID0gdGhpcy5nZXRUZXh0U2hhZG93KCk7XG5cbiAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih0aGlzLmF0dHJzLnRleHRfc2hhZG93KSkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50ZXh0U2hhZG93ID0gdGhpcy5hdHRycy50ZXh0X3NoYWRvdztcbiAgICAgICAgfSBlbHNlIGlmICh0ZXh0U2hhZG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudGV4dFNoYWRvdyA9IGAke3RleHRTaGFkb3cuZHh9cHggJHt0ZXh0U2hhZG93LmR5fXB4ICR7dGV4dFNoYWRvdy5yYWRpdXN9cHggJHt0ZXh0U2hhZG93LmNvbG9yfWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXh0IGFsaWdubWVudC5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMudGV4dF9hbGlnbm1lbnQgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRycy50ZXh0X2FsaWdubWVudCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRycy50ZXh0X2FsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS50ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWF4IGxpbmVzLlxuICAgICAgICBpZiAodGhpcy5hdHRycy5zaW5nbGVfbGluZSA9PT0gdHJ1ZSB8fCB0aGlzLmF0dHJzLm1heF9saW5lcyA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2luZ2xlLWxpbmUnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5hdHRycy5tYXhfbGluZXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgPSAnLXdlYmtpdC1ib3gnO1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS53ZWJraXRMaW5lQ2xhbXAgPSB0aGlzLmF0dHJzLm1heF9saW5lcztcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUud2Via2l0Qm94T3JpZW50ID0gJ3ZlcnRpY2FsJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsbCBjYXBzLlxuICAgICAgICBpZiAodGhpcy5hdHRycy50ZXh0X2FsbF9jYXBzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSAndXBwZXJjYXNlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHBhcnNlU3BhbnModGV4dCwgc3BhbnMgPSBbXSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgICAgICBpZiAoc3BhbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3BhbnNbMF0uc3RhcnQgPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dC5zbGljZSgwLCBzcGFuc1swXS5zdGFydClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3BhbnMuZm9yRWFjaCgoc3BhbiwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHNwYW4uc3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBlbmRJbmRleCA9IHNwYW4uZW5kO1xuXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dC5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCksXG4gICAgICAgICAgICAgICAgc3BhblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChpID09PSBzcGFucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVuZEluZGV4IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dC5zbGljZShlbmRJbmRleCwgdGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kSW5kZXggPCBzcGFuc1tpICsgMV0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQuc2xpY2UoZW5kSW5kZXgsIHNwYW5zW2kgKyAxXS5zdGFydClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXRUZXh0U2hhZG93KCkge1xuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHRoaXMuYXR0cnMudGV4dF9zaGFkb3dfY29sb3IpKSB7XG4gICAgICAgICAgICBjb25zdCBkeCA9XG4gICAgICAgICAgICAgICAgdHlwZW9mIHRoaXMuYXR0cnMudGV4dF9zaGFkb3dfZHggPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5hdHRycy50ZXh0X3NoYWRvd19keFxuICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgICAgICAgICBjb25zdCBkeSA9XG4gICAgICAgICAgICAgICAgdHlwZW9mIHRoaXMuYXR0cnMudGV4dF9zaGFkb3dfZHkgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5hdHRycy50ZXh0X3NoYWRvd19keVxuICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgICAgICAgICBjb25zdCByYWRpdXMgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLmF0dHJzLnRleHRfc2hhZG93X3JhZGl1cyA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmF0dHJzLnRleHRfc2hhZG93X3JhZGl1c1xuICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuYXR0cnMudGV4dF9zaGFkb3dfY29sb3I7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZHgsXG4gICAgICAgICAgICAgICAgZHksXG4gICAgICAgICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgICAgICAgIGNvbG9yXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuVGV4dFZpZXcucHJvdG90eXBlLnRhZ05hbWUgPSAncCc7XG5UZXh0Vmlldy5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ2luY2l0b19fdGV4dC12aWV3JztcbmV4cG9ydCBkZWZhdWx0IFRleHRWaWV3O1xuIiwiaW1wb3J0IHtpc0RlZmluZWRTdHJ9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNsYXNzIFZpZGVvIGV4dGVuZHMgVmlldyB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAoIWlzRGVmaW5lZFN0cih0aGlzLmF0dHJzLnNyYykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbC5tdXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZWwucHJlbG9hZCA9ICdtZXRhZGF0YSc7XG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIHRoaXMuYXR0cnMuc3JjKTtcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbWltZScsIHRoaXMuYXR0cnMubWltZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMuYXV0b3BsYXkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuYXV0b3BsYXkgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cnMubG9vcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5lbC5sb29wID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmNvbnRyb2xzID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmVsLmNvbnRyb2xzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblZpZGVvLnByb3RvdHlwZS5jbGFzc05hbWUgPSAnaW5jaXRvX192aWRlby12aWV3JztcblZpZGVvLnByb3RvdHlwZS50YWdOYW1lID0gJ3ZpZGVvJztcblZpZGVvLnByb3RvdHlwZS5sYXp5bG9hZCA9IHRydWU7XG5leHBvcnQgZGVmYXVsdCBWaWRlbztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZpbmQ7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtdXNlcy10by1sZW5ndGgnKTtcblxudmFyIEZJTkQgPSAnZmluZCc7XG52YXIgU0tJUFNfSE9MRVMgPSB0cnVlO1xuXG52YXIgVVNFU19UT19MRU5HVEggPSBhcnJheU1ldGhvZFVzZXNUb0xlbmd0aChGSU5EKTtcblxuLy8gU2hvdWxkbid0IHNraXAgaG9sZXNcbmlmIChGSU5EIGluIFtdKSBBcnJheSgxKVtGSU5EXShmdW5jdGlvbiAoKSB7IFNLSVBTX0hPTEVTID0gZmFsc2U7IH0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmluZFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogU0tJUFNfSE9MRVMgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgZmluZDogZnVuY3Rpb24gZmluZChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgIHJldHVybiAkZmluZCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKEZJTkQpO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5maW5kJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuZmluZDtcbiIsInZhciBmaW5kID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9maW5kJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZpbmQ7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5maW5kKSA/IGZpbmQgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2ZpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbmRcIik7IiwiaW1wb3J0IHtpc0RlZmluZWRTdHJ9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCAnLi92aWRlby1lbWJlZC5zdHlsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGFsbG93ZWRIb3N0bmFtZXMgPSBbJy55b3V0dWJlLmNvbScsICcudmltZW8uY29tJywgJy50d2VudHl0aHJlZS5uZXQnXTtcblxuY2xhc3MgRmxleExheW91dCBleHRlbmRzIFZpZXcge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCFpc0RlZmluZWRTdHIodGhpcy5hdHRycy5zcmMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtzcmN9ID0gdGhpcy5hdHRycztcbiAgICAgICAgY29uc3QgbGlua0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgIGxpbmtFbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBzcmMpO1xuXG4gICAgICAgIGNvbnN0IGlzU3VwcG9ydGVkID0gYWxsb3dlZEhvc3RuYW1lcy5maW5kKFxuICAgICAgICAgICAgKGhvc3RuYW1lKSA9PiBsaW5rRWwuaG9zdG5hbWUuc2xpY2UoLWhvc3RuYW1lLmxlbmd0aCkgPT09IGhvc3RuYW1lXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBzcmMpO1xuICAgICAgICAgICAgdGhpcy5sYXp5bG9hZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5GbGV4TGF5b3V0LnByb3RvdHlwZS5jbGFzc05hbWUgPSAnaW5jaXRvX192aWRlby1lbWJlZC12aWV3JztcbkZsZXhMYXlvdXQucHJvdG90eXBlLmxhenlsb2FkID0gZmFsc2U7XG5leHBvcnQgZGVmYXVsdCBGbGV4TGF5b3V0O1xuIiwiaW1wb3J0ICcuL2luY2l0by5zdHlsJztcbmltcG9ydCB7aXNEZWZpbmVkU3RyLCB0aHJvdHRsZX0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgKiBhcyB2aWV3cyBmcm9tICcuL3ZpZXdzJztcblxubGV0IHJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5pZiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2Ygd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2sgPT09ICdmdW5jdGlvbidcbikge1xuICAgICh7cmVxdWVzdElkbGVDYWxsYmFja30gPSB3aW5kb3cpO1xufSBlbHNlIHtcbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrID0gKGNiKSA9PlxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHJldHVybiBjYih7XG4gICAgICAgICAgICAgICAgZGlkVGltZW91dDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZVJlbWFpbmluZygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIDUwIC0gKERhdGUubm93KCkgLSBzdGFydCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxKTtcbn1cblxuLy8gbGlrZSByZXF1ZXN0SWRsZUNhbGxiYWNrIGJ1dCBlZmZlY3RpdmVseSBzeW5jaHJvbm91c1xuLy8gYXMgd2UgZ2l2ZSBpbmZpbml0ZSB0aW1lIHRvIHJ1blxuY29uc3Qgc3luY0lkbGVDYWxsYmFjayA9IGZ1bmN0aW9uIChjYikge1xuICAgIGNiKHtcbiAgICAgICAgdGltZVJlbWFpbmluZygpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB9LFxuICAgICAgICBkaWRUaW1lb3V0OiBmYWxzZVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5jaXRvIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29udGFpbmVyRWwsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluY2l0byA9IHt9LFxuICAgICAgICAgICAgcmVuZGVyTGF6aW5lc3MgPSAxIC8vIDA6IEFsbCBzeW5jaHJvbm91cy4gMTogVmlzaWJsZSBzeW5jaHJvbm91cywgcmVzdCBsYXp5LiAyOiBBbGwgbGF6eS5cbiAgICAgICAgfVxuICAgICkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsID0gY29udGFpbmVyRWw7XG4gICAgICAgIHRoaXMuaW5jaXRvID0gaW5jaXRvO1xuICAgICAgICB0aGlzLnJlbmRlckxhemluZXNzID0gcmVuZGVyTGF6aW5lc3M7XG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy52aWV3cyA9IGZsYXR0ZW5WaWV3cyhbXSwgdGhpcy5pbmNpdG8ucm9vdF92aWV3KTtcbiAgICAgICAgdGhpcy52aWV3c0xlbmd0aCA9IHRoaXMudmlld3MubGVuZ3RoO1xuICAgICAgICB0aGlzLnZpZXdJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubGF6eWxvYWRhYmxlcyA9IFtdO1xuICAgICAgICB0aGlzLmxhenlsb2FkZXIgPSB0aHJvdHRsZSh0aGlzLmxhenlsb2FkLmJpbmQodGhpcyksIDE1MCk7XG4gICAgICAgIHRoaXMucmVuZGVyZWRPdXRzaWRlT2ZWaWV3cG9ydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB9XG5cbiAgICBiaW5kKGV2ZW50LCBmbikge1xuICAgICAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gdGhpcy5fZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmbik7XG4gICAgfVxuXG4gICAgdW5iaW5kKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodGhpcy5fZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tldmVudF0uc3BsaWNlKFxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0uaW5kZXhPZihmbiksXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyaWdnZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50c1tldmVudF0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldmVudHNbZXZlbnRdLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgbGV0IHRyaWdnZXJlZFZpc2libGVSZW5kZXJlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgcmVuZGVyID0gKElkbGVEZWFkbGluZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoSWRsZURlYWRsaW5lKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlld0luZGV4IDw9IHRoaXMudmlld3NMZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDYWxsYmFja0hhbmRsZSA9IHJlcXVlc3RJZGxlQ2FsbGJhY2socmVuZGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHZpc2libGVSZW5kZXJlZCBnZXRzIHRyaWdnZXJlZCBldmVuXG4gICAgICAgICAgICAgICAgLy8gaWYgcmVuZGVyZWRPdXRzaWRlT2ZWaWV3cG9ydCB3YXNuJ3RcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVkT3V0c2lkZU9mVmlld3BvcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignYWxsUmVuZGVyZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRPdXRzaWRlT2ZWaWV3cG9ydCAmJiAhdHJpZ2dlcmVkVmlzaWJsZVJlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd2aXNpYmxlUmVuZGVyZWQnKTtcblxuICAgICAgICAgICAgICAgIHRyaWdnZXJlZFZpc2libGVSZW5kZXJlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlbmRlcmVkT3V0c2lkZU9mVmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhenlsb2FkKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gJ2luY2l0byc7XG4gICAgICAgIGlmICh0aGlzLmluY2l0by5sb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2xhbmcnLCB0aGlzLmluY2l0by5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZEZvbnRzKHRoaXMuaW5jaXRvLmZvbnRfYXNzZXRzKTtcbiAgICAgICAgdGhpcy5hcHBseVRoZW1lKHRoaXMuaW5jaXRvLnRoZW1lKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuXG4gICAgICAgIC8vIGRvIGZpcnN0IHJlbmRlciBzeW5jaHJvbm91c2x5IHVubGVzcyB3ZSdyZSB2ZXJ5IGxhenlcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyTGF6aW5lc3MgPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FsbGJhY2tIYW5kbGUgPSByZXF1ZXN0SWRsZUNhbGxiYWNrKHJlbmRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzeW5jSWRsZUNhbGxiYWNrKHJlbmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmxhenlsb2FkZXIsIHRydWUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5sYXp5bG9hZGVyLCBmYWxzZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgY2FuY2VsSWRsZUNhbGxiYWNrKHRoaXMucmVuZGVyQ2FsbGJhY2tIYW5kbGUpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLnJlbW92ZUNoaWxkKHRoaXMuZWwpO1xuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubGF6eWxvYWRlciwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmxhenlsb2FkZXIsIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2Rlc3Ryb3llZCcpO1xuICAgIH1cblxuICAgIHJlbmRlcihJZGxlRGVhZGxpbmUpIHtcbiAgICAgICAgd2hpbGUgKFxuICAgICAgICAgICAgSWRsZURlYWRsaW5lLnRpbWVSZW1haW5pbmcoKSA+IDAgJiZcbiAgICAgICAgICAgIHRoaXMudmlld0luZGV4IDw9IHRoaXMudmlld3NMZW5ndGggLSAxXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMudmlld3NbdGhpcy52aWV3SW5kZXhdO1xuICAgICAgICAgICAgY29uc3Qge2F0dHJzfSA9IGl0ZW07XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IHZpZXdzW2F0dHJzLnZpZXdfbmFtZV0gPz8gdmlld3MuVmlldztcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgbWF0Y2goYXR0cnMpLnJlbmRlcigpO1xuXG4gICAgICAgICAgICBpZiAoYXR0cnMuaWQgIT0gbnVsbCAmJiB0eXBlb2YgYXR0cnMubWV0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlkc1thdHRycy5pZF0gPSBhdHRycy5tZXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmlldy5sYXp5bG9hZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGF6eWxvYWRhYmxlcy5wdXNoKHZpZXcuZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLnZpZXcgPSB2aWV3O1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnQ/LnZpZXcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50LnZpZXcuZWwuYXBwZW5kQ2hpbGQodmlldy5lbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQodmlldy5lbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmlld0luZGV4Kys7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIHJlbmRlcmVkIHNvbWV0aGluZyBvdXQgb2YgdGhlIHZpZXdwb3J0IGZvciB0aGUgZmlyc3QgdGltZSBhbmQgeWllbGQuXG4gICAgICAgICAgICAvLyB0aGUgY2hlY2sgaXMgZXhwZW5zaXZlIHNvIGl0J3MgZmFzdGVyIHRvIG9ubHkgY2hlY2sgZXZlcnkgZmV3IGl0ZXJhdGlvbnMsIHRoZSBkb3duc2lkZSBpcyB0aGF0XG4gICAgICAgICAgICAvLyB3ZSBtaWdodCBvdmVycmVuZGVyIGEgdGlueSBiaXQgYnV0IGl0IGNvbWVzIG91dCB0byBmYXN0ZXIgdGhhbiBjaGVja2luZyBldmVyeSBpdGVyYXRpb24uXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMYXppbmVzcyAmJlxuICAgICAgICAgICAgICAgICEodGhpcy52aWV3SW5kZXggJSAyMCkgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5yZW5kZXJlZE91dHNpZGVPZlZpZXdwb3J0ICYmXG4gICAgICAgICAgICAgICAgIWlzSW5zaWRlVmlld3BvcnQodmlldy5lbClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZWRPdXRzaWRlT2ZWaWV3cG9ydCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5VGhlbWUodGhlbWUgPSB7fSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGVtZS5mb250X2ZhbWlseSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc3R5bGUuZm9udEZhbWlseSA9IHRoZW1lLmZvbnRfZmFtaWx5LmpvaW4oJywgJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHRoZW1lLmJhY2tncm91bmRfY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoZW1lLmJhY2tncm91bmRfY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHRoZW1lLnRleHRfY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmNvbG9yID0gdGhlbWUudGV4dF9jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhlbWUubGluZV9zcGFjaW5nX211bHRpcGxpZXIgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxpbmVIZWlnaHQgPSB0aGVtZS5saW5lX3NwYWNpbmdfbXVsdGlwbGllcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxhenlsb2FkKHRocmVzaG9sZCkge1xuICAgICAgICB0aGlzLmxhenlsb2FkYWJsZXMgPSB0aGlzLmxhenlsb2FkYWJsZXMuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKGlzSW5zaWRlVmlld3BvcnQoZWwsIHRocmVzaG9sZCkpIHtcbiAgICAgICAgICAgICAgICByZXZlYWxFbGVtZW50KGVsKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxudmFyIGZsYXR0ZW5WaWV3cyA9IGZ1bmN0aW9uICh2aWV3cywgYXR0cnMsIHBhcmVudCkge1xuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICAgIGF0dHJzLFxuICAgICAgICB2aWV3OiBudWxsLFxuICAgICAgICBwYXJlbnRcbiAgICB9O1xuXG4gICAgdmlld3MucHVzaChpdGVtKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGF0dHJzLmNoaWxkX3ZpZXdzKSkge1xuICAgICAgICBhdHRycy5jaGlsZF92aWV3cy5mb3JFYWNoKChjaGlsZEF0dHJzKSA9PlxuICAgICAgICAgICAgZmxhdHRlblZpZXdzKHZpZXdzLCBjaGlsZEF0dHJzLCBpdGVtKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3cztcbn07XG5cbnZhciBsb2FkRm9udHMgPSBmdW5jdGlvbiAoZm9udEFzc2V0cyA9IHt9KSB7XG4gICAgbGV0IGtleSwgdXJscywgdmFsdWU7XG4gICAgaWYgKCdGb250RmFjZScgaW4gd2luZG93KSB7XG4gICAgICAgIGZvciAoa2V5IGluIGZvbnRBc3NldHMpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZm9udEFzc2V0c1trZXldO1xuICAgICAgICAgICAgdXJscyA9IHZhbHVlLnNyYy5tYXAoKHNyYykgPT4gYHVybCgke3NyY1sxXX0pYCkuam9pbignLCAnKTtcbiAgICAgICAgICAgIGNvbnN0IGZvbnQgPSBuZXcgRm9udEZhY2Uoa2V5LCB1cmxzLCB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IHZhbHVlLnN0eWxlID8/ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIHdlaWdodDogdmFsdWUud2VpZ2h0ID8/ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdzd2FwJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmZvbnRzLmFkZChmb250KTtcblxuICAgICAgICAgICAgZm9udC5sb2FkKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICBmb3IgKGtleSBpbiBmb250QXNzZXRzKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGZvbnRBc3NldHNba2V5XTtcbiAgICAgICAgICAgIHVybHMgPSB2YWx1ZS5zcmNcbiAgICAgICAgICAgICAgICAubWFwKChzcmMpID0+IGB1cmwoJyR7c3JjWzFdfScpIGZvcm1hdCgnJHtzcmNbMF19JylgKVxuICAgICAgICAgICAgICAgIC5qb2luKCcsICcpO1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGBcXFxuQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICcke2tleX0nO1xuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgICBzcmM6ICR7dXJsc307XG59XFxcbmA7XG5cbiAgICAgICAgICAgIHN0eWxlRWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgICB9XG59O1xuXG52YXIgaXNJbnNpZGVWaWV3cG9ydCA9IGZ1bmN0aW9uIChlbCwgdGhyZXNob2xkKSB7XG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCA/PyB3aW5kb3dIZWlnaHQ7XG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgcmVjdC50b3AgPD0gd2luZG93SGVpZ2h0ICsgdGhyZXNob2xkICYmXG4gICAgICAgIHJlY3QudG9wICsgcmVjdC5oZWlnaHQgPj0gLXRocmVzaG9sZFxuICAgICk7XG59O1xuXG52YXIgcmV2ZWFsRWxlbWVudCA9IGZ1bmN0aW9uIChlbCkge1xuICAgIGNvbnN0IHNyYyA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcblxuICAgIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbWcnKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbC5jbGFzc05hbWUgKz0gJyBpbmNpdG8tLWxvYWRlZCc7XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gICAgfSBlbHNlIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd2aWRlbycpIHtcbiAgICAgICAgY29uc3Qgc291cmNlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcblxuICAgICAgICBzb3VyY2VFbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gICAgICAgIHNvdXJjZUVsLnNldEF0dHJpYnV0ZSgndHlwZScsIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1taW1lJykpO1xuXG4gICAgICAgIGVsLmFwcGVuZENoaWxkKHNvdXJjZUVsKTtcbiAgICB9IGVsc2UgaWYgKC9pbmNpdG9fX3ZpZGVvLWVtYmVkLXZpZXcvZ2kudGVzdChlbC5jbGFzc05hbWUpKSB7XG4gICAgICAgIGNvbnN0IGlmcmFtZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cbiAgICAgICAgaWZyYW1lRWwuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2FsbG93JyxcbiAgICAgICAgICAgICdmdWxsc2NyZWVuOyBhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZSdcbiAgICAgICAgKTtcbiAgICAgICAgaWZyYW1lRWwuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuXG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGlmcmFtZUVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7c3JjfSlgO1xuICAgIH1cbn07XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiY2xhc3NvZiIsIkluZGV4ZWRPYmplY3QiLCJkb2N1bWVudCIsIkRFU0NSSVBUT1JTIiwiY3JlYXRlRWxlbWVudCIsIklFOF9ET01fREVGSU5FIiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsInN0b3JlIiwiSVNfUFVSRSIsIldlYWtNYXAiLCJoYXMiLCJOQVRJVkVfV0VBS19NQVAiLCJzaGFyZWQiLCJvYmplY3RIYXMiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwibWluIiwicmVxdWlyZSQkMCIsImhpZGRlbktleXMiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaXNGb3JjZWQiLCIkIiwic2V0UHJvdG90eXBlT2YiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiY3JlYXRlTWV0aG9kIiwicmVxdWlyZSQkMSIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwiY3JlYXRlIiwia2V5cyIsImNoZWNrIiwiZmFpbHMiLCJuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSIsIk5BU0hPUk5fQlVHIiwidG9TdHJpbmciLCJzcGxpdCIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJpc09iamVjdCIsImhhc093blByb3BlcnR5IiwiRVhJU1RTIiwibmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidG9JbmRleGVkT2JqZWN0IiwidG9QcmltaXRpdmUiLCJjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IiLCJyZXBsYWNlbWVudCIsImRhdGEiLCJub3JtYWxpemUiLCJQT0xZRklMTCIsIk5BVElWRSIsImFGdW5jdGlvbiIsIm5hdGl2ZURlZmluZVByb3BlcnR5IiwiYW5PYmplY3QiLCJwYXRoIiwiYmluZCIsImNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSIsImNlaWwiLCJmbG9vciIsInRvSW50ZWdlciIsIlNIQVJFRCIsInNldEdsb2JhbCIsImlkIiwicG9zdGZpeCIsIk5BVElWRV9TWU1CT0wiLCJTeW1ib2wiLCJVU0VfU1lNQk9MX0FTX1VJRCIsInVpZCIsImdldEJ1aWx0SW4iLCJ1c2VyQWdlbnQiLCJTUEVDSUVTIiwiVjhfVkVSU0lPTiIsInRvTGVuZ3RoIiwicGFyZW50IiwiZnVuY3Rpb25Ub1N0cmluZyIsImluc3BlY3RTb3VyY2UiLCJzZXQiLCJnZXQiLCJlbmZvcmNlIiwiZ2V0dGVyRm9yIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwiU1RBVEUiLCJzaGFyZWRLZXkiLCJJRV9QUk9UTyIsIkNPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiIsImdldFByb3RvdHlwZU9mIiwibWF4IiwidG9BYnNvbHV0ZUluZGV4IiwiaW5kZXhPZiIsImVudW1CdWdLZXlzIiwib2JqZWN0S2V5cyIsIkdUIiwiTFQiLCJQUk9UT1RZUEUiLCJTQ1JJUFQiLCJFbXB0eUNvbnN0cnVjdG9yIiwic2NyaXB0VGFnIiwiTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCIsIk51bGxQcm90b09iamVjdFZpYUlGcmFtZSIsImRvY3VtZW50Q3JlYXRlRWxlbWVudCIsImh0bWwiLCJhY3RpdmVYRG9jdW1lbnQiLCJOdWxsUHJvdG9PYmplY3QiLCJUT19TVFJJTkdfVEFHIiwiY2xhc3NvZlJhdyIsIlRPX1NUUklOR19UQUdfU1VQUE9SVCIsImRlZmluZVByb3BlcnR5IiwiSXRlcmF0b3JQcm90b3R5cGUiLCJyZXR1cm5UaGlzIiwiSXRlcmF0b3JzIiwiYVBvc3NpYmxlUHJvdG90eXBlIiwiSXRlcmF0b3JzQ29yZSIsIkJVR0dZX1NBRkFSSV9JVEVSQVRPUlMiLCJJVEVSQVRPUiIsInJlZGVmaW5lIiwiRE9NSXRlcmFibGVzIiwiU1RSSUNUX01FVEhPRCIsImFycmF5TWV0aG9kSXNTdHJpY3QiLCJmb3JFYWNoIiwiQXJyYXlQcm90b3R5cGUiLCJVU0VTX1RPX0xFTkdUSCIsIkhBU19TUEVDSUVTX1NVUFBPUlQiLCJNQVhfU0FGRV9JTlRFR0VSIiwic2xpY2UiLCJvYmplY3REZWZpbmVQcm9wZXJ0eU1vZGlsZSIsIl9PYmplY3QkZGVmaW5lUHJvcGVydHkiLCJVTlNVUFBPUlRFRF9ZIiwic3RpY2t5SGVscGVycyIsImV4ZWMiLCJXZWxsS25vd25TeW1ib2xzU3RvcmUiLCJjcmVhdGVXZWxsS25vd25TeW1ib2wiLCJ3ZWxsS25vd25TeW1ib2wiLCJ0b09iamVjdCIsImZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljIiwicmVnRXhwRXhlYyIsImZvcm1hdFVuaXQiLCJ1bml0IiwicmVwbGFjZSIsImlzRGVmaW5lZFN0ciIsInZhbHVlIiwibGVuZ3RoIiwiZXNjYXBlSFRNTCIsInVuc2FmZSIsInRocm90dGxlIiwiZm4iLCJkZWxheSIsInRpbWVyIiwiX3NldFRpbWVvdXQiLCJhcmd1bWVudHMiLCJGT1JDRUQiLCJPYmplY3QiLCJfT2JqZWN0JHNldFByb3RvdHlwZU9mIiwiX09iamVjdCRjcmVhdGUiLCJ3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlIiwiY2hhckF0Iiwic2V0SW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlIiwiJGZvckVhY2giLCJPYmplY3RQcm90b3R5cGUiLCJuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsIiwibmF0aXZlT2JqZWN0Q3JlYXRlIiwid3JhcCIsIl9TeW1ib2wiLCJfU3ltYm9sJGl0ZXJhdG9yIiwiX3R5cGVvZiIsIm5hdGl2ZUdldFByb3RvdHlwZU9mIiwiX09iamVjdCRnZXRQcm90b3R5cGVPZiIsImZvcmNlZFN0cmluZ0hUTUxNZXRob2QiLCJjcmVhdGVIVE1MIiwiVmlldyIsImF0dHJzIiwiZWwiLCJzZXRBdHRyaWJ1dGVzIiwidGFnTmFtZSIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsInJvbGUiLCJhY2Nlc3NpYmlsaXR5X2xhYmVsIiwiYWNjZXNzaWJpbGl0eV9oaWRkZW4iLCJfQXJyYXkkaXNBcnJheSIsImZlYXR1cmVfbGFiZWxzIiwiZmVhdHVyZUxhYmVscyIsIl9maWx0ZXJJbnN0YW5jZVByb3BlcnR5IiwiZmVhdHVyZUxhYmVsIiwidGVzdCIsImpvaW4iLCJ0aXRsZSIsImdyYXZpdHkiLCJsaW5rIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsIm9wZW4iLCJsYXlvdXRfd2lkdGgiLCJzdHlsZSIsIndpZHRoIiwiZGlzcGxheSIsImxheW91dF9oZWlnaHQiLCJoZWlnaHQiLCJtaW5fd2lkdGgiLCJtaW5XaWR0aCIsIm1heF93aWR0aCIsIm1heFdpZHRoIiwibWluX2hlaWdodCIsIm1pbkhlaWdodCIsIm1heF9oZWlnaHQiLCJtYXhIZWlnaHQiLCJsYXlvdXRfdG9wIiwidG9wIiwibGF5b3V0X2xlZnQiLCJsZWZ0IiwibGF5b3V0X3JpZ2h0IiwicmlnaHQiLCJsYXlvdXRfYm90dG9tIiwiYm90dG9tIiwiYmFja2dyb3VuZF9jb2xvciIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRfaW1hZ2UiLCJsYXp5bG9hZCIsIl9pbmRleE9mSW5zdGFuY2VQcm9wZXJ0eSIsImJhY2tncm91bmRfdGlsZV9tb2RlIiwiYmFja2dyb3VuZFJlcGVhdCIsImJhY2tncm91bmRfaW1hZ2VfcG9zaXRpb24iLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJiYWNrZ3JvdW5kX2ltYWdlX3NjYWxlX3R5cGUiLCJiYWNrZ3JvdW5kU2l6ZSIsImxheW91dF9tYXJnaW4iLCJtYXJnaW4iLCJsYXlvdXRfbWFyZ2luX3RvcCIsIm1hcmdpblRvcCIsImxheW91dF9tYXJnaW5fbGVmdCIsIm1hcmdpbkxlZnQiLCJsYXlvdXRfbWFyZ2luX3JpZ2h0IiwibWFyZ2luUmlnaHQiLCJsYXlvdXRfbWFyZ2luX2JvdHRvbSIsIm1hcmdpbkJvdHRvbSIsInBhZGRpbmciLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nX2xlZnQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdCb3R0b20iLCJjb3JuZXJfcmFkaXVzIiwiYm9yZGVyUmFkaXVzIiwiY29ybmVyX3RvcF9sZWZ0X3JhZGl1cyIsImJvcmRlclRvcExlZnRSYWRpdXMiLCJjb3JuZXJfdG9wX3JpZ2h0X3JhZGl1cyIsImJvcmRlclRvcFJpZ2h0UmFkaXVzIiwiY29ybmVyX2JvdHRvbV9sZWZ0X3JhZGl1cyIsImJvcmRlckJvdHRvbUxlZnRSYWRpdXMiLCJjb3JuZXJfYm90dG9tX3JpZ2h0X3JhZGl1cyIsImJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzIiwiY2xpcF9jaGlsZHJlbiIsIm92ZXJmbG93Iiwic2hhZG93IiwiZ2V0U2hhZG93IiwiYm94U2hhZG93IiwiZHgiLCJkeSIsInJhZGl1cyIsImNvbG9yIiwic3Ryb2tlU3R5bGVzIiwic3Ryb2tlX3dpZHRoIiwiYm9yZGVyV2lkdGgiLCJzdHJva2VfY29sb3IiLCJib3JkZXJDb2xvciIsInN0cm9rZV9zdHlsZSIsImJvcmRlclN0eWxlIiwic3Ryb2tlX3RvcF93aWR0aCIsImJvcmRlclRvcFdpZHRoIiwic3Ryb2tlX3RvcF9jb2xvciIsImJvcmRlclRvcENvbG9yIiwic3Ryb2tlX2xlZnRfd2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJzdHJva2VfbGVmdF9jb2xvciIsImJvcmRlckxlZnRDb2xvciIsInN0cm9rZV9yaWdodF93aWR0aCIsImJvcmRlclJpZ2h0V2lkdGgiLCJzdHJva2VfcmlnaHRfY29sb3IiLCJib3JkZXJSaWdodENvbG9yIiwic3Ryb2tlX2JvdHRvbV93aWR0aCIsImJvcmRlckJvdHRvbVdpZHRoIiwic3Ryb2tlX2JvdHRvbV9jb2xvciIsImJvcmRlckJvdHRvbUNvbG9yIiwibGF5b3V0X2ZsZXhfc2hyaW5rIiwiZmxleFNocmluayIsIm1zRmxleFNocmluayIsImxheW91dF9mbGV4X2dyb3ciLCJmbGV4R3JvdyIsIm1zRmxleEdyb3ciLCJsYXlvdXRfZmxleF9iYXNpcyIsImZsZXhCYXNpcyIsIm1zRmxleEJhc2lzIiwidHJhbnNmb3JtcyIsImdldFRyYW5zZm9ybXMiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2Zvcm1fb3JpZ2luIiwidHJhbnNmb3JtT3JpZ2luIiwidHJhbnNsYXRlWCIsInRyYW5zZm9ybV90cmFuc2xhdGVfeCIsInRyYW5zbGF0ZVkiLCJ0cmFuc2Zvcm1fdHJhbnNsYXRlX3kiLCJwdXNoIiwidHJhbnNmb3JtX3JvdGF0ZSIsInRyYW5zZm9ybV9zY2FsZSIsInNoYWRvd19jb2xvciIsInNoYWRvd19keCIsInNoYWRvd19keSIsInNoYWRvd19yYWRpdXMiLCJwcm90b3R5cGUiLCJBYnNvbHV0ZUxheW91dCIsImFsaWduSXRlbU1vZGVzIiwiZmxleEp1c3RpZnlNb2RlcyIsImZsZXhEaXJlY3Rpb25Nb2RlcyIsIkZsZXhMYXlvdXQiLCJsYXlvdXRfZmxleF9hbGlnbl9pdGVtcyIsImFsaWduSXRlbXMiLCJtc0FsaWduSXRlbXMiLCJsYXlvdXRfZmxleF9qdXN0aWZ5X2NvbnRlbnQiLCJqdXN0aWZ5Q29udGVudCIsIm1zRmxleFBhY2siLCJsYXlvdXRfZmxleF9kaXJlY3Rpb24iLCJmbGV4RGlyZWN0aW9uIiwibXNGbGV4RGlyZWN0aW9uIiwiSW1hZ2UiLCJzcmMiLCJsYWJlbCIsIkZ1bmN0aW9uUHJvdG90eXBlIiwiaXNSZWdFeHAiLCJjYWxsUmVnRXhwRXhlYyIsIlRleHRWaWV3IiwidGV4dCIsInRleHRTdHlsZXMiLCJ0ZXh0X3N0eWxlIiwic3BhbnMiLCJwYXJzZWRUZXh0IiwicGFyc2VTcGFucyIsIl9tYXBJbnN0YW5jZVByb3BlcnR5IiwiaXRlbSIsImVzY2FwZWRUZXh0Iiwic3BhbiIsIm5hbWUiLCJ1cmwiLCJlbmNvZGVVUkkiLCJzcGFuTmFtZSIsInRleHRfcHJldmVudF93aWRvdyIsImlubmVySFRNTCIsImZvbnRfZmFtaWx5IiwiZm9udEZhbWlseSIsInRleHRfc2l6ZSIsImZvbnRTaXplIiwibGluZV9zcGFjaW5nX211bHRpcGxpZXIiLCJsaW5lSGVpZ2h0IiwidGV4dF9jb2xvciIsImZvbnRXZWlnaHQiLCJmb250U3R5bGUiLCJ0ZXh0X2RlY29yYXRpb25fbGluZSIsInRleHREZWNvcmF0aW9uTGluZSIsInRleHRTaGFkb3ciLCJnZXRUZXh0U2hhZG93IiwidGV4dF9zaGFkb3ciLCJ0ZXh0X2FsaWdubWVudCIsInRleHRBbGlnbiIsInNpbmdsZV9saW5lIiwibWF4X2xpbmVzIiwid2Via2l0TGluZUNsYW1wIiwid2Via2l0Qm94T3JpZW50IiwidGV4dF9hbGxfY2FwcyIsInRleHRUcmFuc2Zvcm0iLCJyZXN1bHQiLCJzdGFydCIsIl9zbGljZUluc3RhbmNlUHJvcGVydHkiLCJpIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiZW5kIiwidGV4dF9zaGFkb3dfY29sb3IiLCJ0ZXh0X3NoYWRvd19keCIsInRleHRfc2hhZG93X2R5IiwidGV4dF9zaGFkb3dfcmFkaXVzIiwiVmlkZW8iLCJtdXRlZCIsInByZWxvYWQiLCJtaW1lIiwiYXV0b3BsYXkiLCJsb29wIiwiY29udHJvbHMiLCJhbGxvd2VkSG9zdG5hbWVzIiwibGlua0VsIiwiaXNTdXBwb3J0ZWQiLCJfZmluZEluc3RhbmNlUHJvcGVydHkiLCJob3N0bmFtZSIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJjYiIsIl9EYXRlJG5vdyIsImRpZFRpbWVvdXQiLCJ0aW1lUmVtYWluaW5nIiwiTWF0aCIsInN5bmNJZGxlQ2FsbGJhY2siLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJJbmNpdG8iLCJjb250YWluZXJFbCIsImluY2l0byIsInJlbmRlckxhemluZXNzIiwiaWRzIiwidmlld3MiLCJmbGF0dGVuVmlld3MiLCJyb290X3ZpZXciLCJ2aWV3c0xlbmd0aCIsInZpZXdJbmRleCIsImxhenlsb2FkYWJsZXMiLCJsYXp5bG9hZGVyIiwiX2JpbmRJbnN0YW5jZVByb3BlcnR5IiwicmVuZGVyZWRPdXRzaWRlT2ZWaWV3cG9ydCIsIl9ldmVudHMiLCJldmVudCIsIl9zcGxpY2VJbnN0YW5jZVByb3BlcnR5IiwiZSIsImFwcGx5IiwiQXJyYXkiLCJjYWxsIiwidHJpZ2dlcmVkVmlzaWJsZVJlbmRlcmVkIiwicmVuZGVyIiwiSWRsZURlYWRsaW5lIiwicmVuZGVyQ2FsbGJhY2tIYW5kbGUiLCJ0cmlnZ2VyIiwibG9jYWxlIiwibG9hZEZvbnRzIiwiZm9udF9hc3NldHMiLCJhcHBseVRoZW1lIiwidGhlbWUiLCJhcHBlbmRDaGlsZCIsImNhbmNlbElkbGVDYWxsYmFjayIsInJlbW92ZUNoaWxkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm1hdGNoIiwidmlld19uYW1lIiwidmlldyIsIm1ldGEiLCJpc0luc2lkZVZpZXdwb3J0IiwidGhyZXNob2xkIiwicmV2ZWFsRWxlbWVudCIsImNoaWxkX3ZpZXdzIiwiY2hpbGRBdHRycyIsImZvbnRBc3NldHMiLCJrZXkiLCJ1cmxzIiwiZm9udCIsIkZvbnRGYWNlIiwid2VpZ2h0IiwiZm9udHMiLCJhZGQiLCJsb2FkIiwic3R5bGVFbCIsImNyZWF0ZVRleHROb2RlIiwiaGVhZCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImdldEF0dHJpYnV0ZSIsInRvTG93ZXJDYXNlIiwic291cmNlRWwiLCJpZnJhbWVFbCIsImJhY2tncm91bmRJbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FBQSxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUUsRUFBRTtDQUMxQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztDQUNyQyxDQUFDLENBQUM7QUFDRjtDQUNBO0NBQ0EsWUFBYztDQUNkO0NBQ0EsRUFBRSxLQUFLLENBQUMsT0FBTyxVQUFVLElBQUksUUFBUSxJQUFJLFVBQVUsQ0FBQztDQUNwRCxFQUFFLEtBQUssQ0FBQyxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDO0NBQzVDLEVBQUUsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUM7Q0FDeEMsRUFBRSxLQUFLLENBQUMsT0FBT0EsY0FBTSxJQUFJLFFBQVEsSUFBSUEsY0FBTSxDQUFDO0NBQzVDO0NBQ0EsRUFBRSxDQUFDLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7O0NDWi9ELFNBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtDQUNqQyxFQUFFLElBQUk7Q0FDTixJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0NBQ3BCLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRTtDQUNsQixJQUFJLE9BQU8sSUFBSSxDQUFDO0NBQ2hCLEdBQUc7Q0FDSCxDQUFDOztDQ0pEO0NBQ0EsZUFBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVk7Q0FDcEMsRUFBRSxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcs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SyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDN0IsSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtDQUN0QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQy9CLE1BQU0sSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUUsT0FBTyxHQUFHLENBQUM7Q0FDcEQsS0FBSyxNQUFNLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtDQUM3QixNQUFNLFFBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Q0FDOUIsUUFBUSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtDQUN6RCxRQUFRLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0NBQzFELFFBQVEsU0FBUyxPQUFPLENBQUMsRUFBRSxDQUFDO0NBQzVCLE9BQU87Q0FDUCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDN0IsTUFBTSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtDQUMvQyxRQUFRLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3hDO0NBQ0E7Q0FDQSxRQUFRLElBQUksSUFBSSxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0NBQ3BELE9BQU8sQ0FBQyxPQUFPLFFBQVEsQ0FBQyxNQUFN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
