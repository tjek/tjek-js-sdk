(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Incito = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var check$1 = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$2 =
	  /* global globalThis -- safe */
	  check$1(typeof globalThis == 'object' && globalThis) ||
	  check$1(typeof window == 'object' && window) ||
	  check$1(typeof self == 'object' && self) ||
	  check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
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

	var nativePropertyIsEnumerable$2 = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG$1 = getOwnPropertyDescriptor$4 && !nativePropertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$c = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$4(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable$2;

	var objectPropertyIsEnumerable$1 = {
		f: f$c
	};

	var createPropertyDescriptor$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString$2 = {}.toString;

	var classofRaw$1 = function (it) {
	  return toString$2.call(it).slice(8, -1);
	};

	var split$1 = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject$1 = fails$1(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
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

	var has$3 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var document$4 = global$2.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$1(document$4) && isObject$1(document$4.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$4.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine$1 = !descriptors$1 && !fails$1(function () {
	  return Object.defineProperty(documentCreateElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$b = descriptors$1 ? nativeGetOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$1(O);
	  P = toPrimitive$1(P, true);
	  if (ie8DomDefine$1) try {
	    return nativeGetOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (has$3(O, P)) return createPropertyDescriptor$1(!objectPropertyIsEnumerable$1.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor$1 = {
		f: f$b
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

	var aFunction$3 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$3(fn);
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

	var nativeDefineProperty$2 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$a = descriptors$1 ? nativeDefineProperty$2 : function defineProperty(O, P, Attributes) {
	  anObject$1(O);
	  P = toPrimitive$1(P, true);
	  anObject$1(Attributes);
	  if (ie8DomDefine$1) try {
	    return nativeDefineProperty$2(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty$1 = {
		f: f$a
	};

	var createNonEnumerableProperty$1 = descriptors$1 ? function (object, key, value) {
	  return objectDefineProperty$1.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor$1.f;






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
	    USE_NATIVE = !FORCED && nativeSource && has$3(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$3(nativeSource, key);
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
	      if (!has$3(path$1, VIRTUAL_PROTOTYPE)) {
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

	var aFunction$2 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$1 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$2(path$1[namespace]) || aFunction$2(global$2[namespace])
	    : path$1[namespace] && path$1[namespace][method] || global$2[namespace] && global$2[namespace][method];
	};

	var ceil$1 = Math.ceil;
	var floor$2 = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger$1 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$2 : ceil$1)(argument);
	};

	var min$7 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min$7(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max$4 = Math.max;
	var min$6 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger$1(index);
	  return integer < 0 ? max$4(integer + length, 0) : min$6(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$5 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$1($this);
	    var length = toLength$1(O.length);
	    var index = toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
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
	  includes: createMethod$5(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$5(false)
	};

	var hiddenKeys$3 = {};

	var indexOf$4 = arrayIncludes$1.indexOf;


	var objectKeysInternal$1 = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$3(hiddenKeys$3, key) && has$3(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$3(O, key = names[i++])) {
	    ~indexOf$4(result, key) || result.push(key);
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
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal$1(O, enumBugKeys$1);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$1(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty$1.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn$1('document', 'documentElement');

	var isPure = true;

	var setGlobal$1 = function (key, value) {
	  try {
	    createNonEnumerableProperty$1(global$2, key, value);
	  } catch (error) {
	    global$2[key] = value;
	  } return value;
	};

	var SHARED$1 = '__core-js_shared__';
	var store$3 = global$2[SHARED$1] || setGlobal$1(SHARED$1, {});

	var sharedStore$1 = store$3;

	var shared$1 = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore$1[key] || (sharedStore$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.9.1',
	  mode: 'pure' ,
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var postfix$1 = Math.random();

	var uid$1 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
	};

	var keys$2 = shared$1('keys');

	var sharedKey$1 = function (key) {
	  return keys$2[key] || (keys$2[key] = uid$1(key));
	};

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$1('IE_PROTO');

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
	  var iframe = documentCreateElement$1('iframe');
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
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
	  return NullProtoObject();
	};

	hiddenKeys$3[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$1(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var slice$6 = [].slice;
	var factories = {};

	var construct$3 = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction$3(this);
	  var partArgs = slice$6.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice$6.call(arguments));
	    return this instanceof boundFunction ? construct$3(fn, args.length, args) : fn.apply(that, args);
	  };
	  if (isObject$1(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
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
	var FORCED$6 = NEW_TARGET_BUG || ARGS_BUG;

	_export$1({ target: 'Reflect', stat: true, forced: FORCED$6, sham: FORCED$6 }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction$3(Target);
	    anObject$1(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction$3(arguments[2]);
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
	    var instance = objectCreate(isObject$1(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject$1(result) ? result : instance;
	  }
	});

	var construct$2 = path$1.Reflect.construct;

	var construct$1 = construct$2;

	var construct = construct$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	var isArray$5 = Array.isArray || function isArray(arg) {
	  return classofRaw$1(arg) == 'Array';
	};

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	_export$1({ target: 'Array', stat: true }, {
	  isArray: isArray$5
	});

	var isArray$4 = path$1.Array.isArray;

	var isArray$3 = isArray$4;

	var isArray$2 = isArray$3;

	function _arrayWithHoles(arr) {
	  if (isArray$2(arr)) return arr;
	}

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$1 = function (argument) {
	  return Object(requireObjectCoercible$1(argument));
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive$1(key);
	  if (propertyKey in object) objectDefineProperty$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	var engineIsNode$1 = classofRaw$1(global$2.process) == 'process';

	var engineUserAgent$1 = getBuiltIn$1('navigator', 'userAgent') || '';

	var process$4 = global$2.process;
	var versions$1 = process$4 && process$4.versions;
	var v8$1 = versions$1 && versions$1.v8;
	var match$1, version$1;

	if (v8$1) {
	  match$1 = v8$1.split('.');
	  version$1 = match$1[0] + match$1[1];
	} else if (engineUserAgent$1) {
	  match$1 = engineUserAgent$1.match(/Edge\/(\d+)/);
	  if (!match$1 || match$1[1] >= 74) {
	    match$1 = engineUserAgent$1.match(/Chrome\/(\d+)/);
	    if (match$1) version$1 = match$1[1];
	  }
	}

	var engineV8Version$1 = version$1 && +version$1;

	var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$1(function () {
	  /* global Symbol -- required for testing */
	  return !Symbol.sham &&
	    // Chrome 38 Symbol has incorrect toString conversion
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    (engineIsNode$1 ? engineV8Version$1 === 38 : engineV8Version$1 > 37 && engineV8Version$1 < 41);
	});

	var useSymbolAsUid$1 = nativeSymbol$1
	  /* global Symbol -- safe */
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore$2 = shared$1('wks');
	var Symbol$2 = global$2.Symbol;
	var createWellKnownSymbol$1 = useSymbolAsUid$1 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

	var wellKnownSymbol$1 = function (name) {
	  if (!has$3(WellKnownSymbolsStore$2, name) || !(nativeSymbol$1 || typeof WellKnownSymbolsStore$2[name] == 'string')) {
	    if (nativeSymbol$1 && has$3(Symbol$2, name)) {
	      WellKnownSymbolsStore$2[name] = Symbol$2[name];
	    } else {
	      WellKnownSymbolsStore$2[name] = createWellKnownSymbol$1('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore$2[name];
	};

	var SPECIES$8 = wellKnownSymbol$1('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray$5(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES$8];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var SPECIES$7 = wellKnownSymbol$1('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version$1 >= 51 || !fails$1(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$7] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$1('isConcatSpreadable');
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version$1 >= 51 || !fails$1(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$1(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$5(O);
	};

	var FORCED$5 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export$1({ target: 'Array', proto: true, forced: FORCED$5 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$1(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength$1(E.length);
	        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var hiddenKeys$2 = enumBugKeys$1.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$9 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertyNames$1 = {
		f: f$9
	};

	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNames$1.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames$1(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$8 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames$1(toIndexedObject$1(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$8
	};

	var f$7 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols$1 = {
		f: f$7
	};

	var redefine$1 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$1(target, key, value);
	};

	var f$6 = wellKnownSymbol$1;

	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty$5 = objectDefineProperty$1.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path$1.Symbol || (path$1.Symbol = {});
	  if (!has$3(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var TO_STRING_TAG$5 = wellKnownSymbol$1('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$5] = 'z';

	var toStringTagSupport$1 = String(test$1) === '[object z]';

	var TO_STRING_TAG$4 = wellKnownSymbol$1('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS$1 = classofRaw$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet$1 = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$1 = toStringTagSupport$1 ? classofRaw$1 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet$1(O = Object(it), TO_STRING_TAG$4)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS$1 ? classofRaw$1(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString$1 = toStringTagSupport$1 ? {}.toString : function toString() {
	  return '[object ' + classof$1(this) + ']';
	};

	var defineProperty$4 = objectDefineProperty$1.f;





	var TO_STRING_TAG$3 = wellKnownSymbol$1('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has$3(target, TO_STRING_TAG$3)) {
	      defineProperty$4(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !toStringTagSupport$1) {
	      createNonEnumerableProperty$1(target, 'toString', objectToString$1);
	    }
	  }
	};

	var functionToString$1 = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore$1.inspectSource != 'function') {
	  sharedStore$1.inspectSource = function (it) {
	    return functionToString$1.call(it);
	  };
	}

	var inspectSource$1 = sharedStore$1.inspectSource;

	var WeakMap$3 = global$2.WeakMap;

	var nativeWeakMap$1 = typeof WeakMap$3 === 'function' && /native code/.test(inspectSource$1(WeakMap$3));

	var WeakMap$2 = global$2.WeakMap;
	var set$2, get$1, has$2;

	var enforce$1 = function (it) {
	  return has$2(it) ? get$1(it) : set$2(it, {});
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
	  var store$2 = sharedStore$1.state || (sharedStore$1.state = new WeakMap$2());
	  var wmget$1 = store$2.get;
	  var wmhas$1 = store$2.has;
	  var wmset$1 = store$2.set;
	  set$2 = function (it, metadata) {
	    metadata.facade = it;
	    wmset$1.call(store$2, it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return wmget$1.call(store$2, it) || {};
	  };
	  has$2 = function (it) {
	    return wmhas$1.call(store$2, it);
	  };
	} else {
	  var STATE$1 = sharedKey$1('state');
	  hiddenKeys$3[STATE$1] = true;
	  set$2 = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE$1, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return has$3(it, STATE$1) ? it[STATE$1] : {};
	  };
	  has$2 = function (it) {
	    return has$3(it, STATE$1);
	  };
	}

	var internalState$1 = {
	  set: set$2,
	  get: get$1,
	  has: has$2,
	  enforce: enforce$1,
	  getterFor: getterFor$1
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
	var createMethod$4 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$1($this);
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
	  forEach: createMethod$4(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$4(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$4(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$4(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$4(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$4(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$4(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$4(7)
	};

	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$1('toPrimitive');
	var setInternalState$4 = internalState$1.set;
	var getInternalState$3 = internalState$1.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$2.Symbol;
	var $stringify$1 = getBuiltIn$1('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor$1.f;
	var nativeDefineProperty$1 = objectDefineProperty$1.f;
	var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable$1.f;
	var AllSymbols = shared$1('symbols');
	var ObjectPrototypeSymbols = shared$1('op-symbols');
	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared$1('wks');
	var QObject = global$2.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors$1 && fails$1(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
	  setInternalState$4(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors$1) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$1(O);
	  var key = toPrimitive$1(P, true);
	  anObject$1(Attributes);
	  if (has$3(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$3(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$1(O);
	  var properties = toIndexedObject$1(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!descriptors$1 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive$1(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$1 && has$3(AllSymbols, P) && !has$3(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$3(this, P) || !has$3(AllSymbols, P) || has$3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$1(O);
	  var key = toPrimitive$1(P, true);
	  if (it === ObjectPrototype$1 && has$3(AllSymbols, key) && !has$3(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has$3(AllSymbols, key) && !(has$3(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has$3(AllSymbols, key) && !has$3(hiddenKeys$3, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has$3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$3(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!nativeSymbol$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid$1(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has$3(this, HIDDEN) && has$3(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (descriptors$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap$1(tag, description);
	  };

	  redefine$1($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState$3(this).tag;
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
	    return wrap$1(wellKnownSymbol$1(name), name);
	  };

	  if (descriptors$1) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$3(this).description;
	      }
	    });
	  }
	}

	_export$1({ global: true, wrap: true, forced: !nativeSymbol$1, sham: !nativeSymbol$1 }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export$1({ target: SYMBOL, stat: true, forced: !nativeSymbol$1 }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export$1({ target: 'Object', stat: true, forced: !nativeSymbol$1, sham: !descriptors$1 }, {
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

	_export$1({ target: 'Object', stat: true, forced: !nativeSymbol$1 }, {
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
	    return objectGetOwnPropertySymbols$1.f(toObject$1(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify$1) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol$1 || fails$1(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify$1([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify$1({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify$1(Object(symbol)) != '{}';
	  });

	  _export$1({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$5(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify$1.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
	  createNonEnumerableProperty$1($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys$3[HIDDEN] = true;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol('hasInstance');

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol('isConcatSpreadable');

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol('match');

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol('matchAll');

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol('replace');

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol('search');

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol('species');

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol('split');

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol('toPrimitive');

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol('toStringTag');

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol('unscopables');

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag(global$2.JSON, 'JSON', true);

	var symbol$2 = path$1.Symbol;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('asyncDispose');

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('dispose');

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol('observable');

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('patternMatch');

	// TODO: remove from `core-js@4`


	defineWellKnownSymbol('replaceAll');

	// TODO: Remove from `core-js@4`


	var symbol$1 = symbol$2;

	var symbol = symbol$1;

	var iterators = {};

	var correctPrototypeGetter = !fails$1(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey$1('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject$1(O);
	  if (has$3(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR$5 = wellKnownSymbol$1('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	var returnThis$2 = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$1(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ((NEW_ITERATOR_PROTOTYPE) && !has$3(IteratorPrototype$2, ITERATOR$5)) {
	  createNonEnumerableProperty$1(IteratorPrototype$2, ITERATOR$5, returnThis$2);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor$1(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype$1 = function (it) {
	  if (!isObject$1(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	/* eslint-disable no-proto -- safe */

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
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

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol$1('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty$1(IterablePrototype, ITERATOR$4, defaultIterator);
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
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$1(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$3 = internalState$1.set;
	var getInternalState$2 = internalState$1.getterFor(ARRAY_ITERATOR);

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
	defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$3(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$1(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$2(this);
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

	var TO_STRING_TAG$2 = wellKnownSymbol$1('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global$2[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof$1(CollectionPrototype) !== TO_STRING_TAG$2) {
	    createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG$2, COLLECTION_NAME);
	  }
	  iterators[COLLECTION_NAME] = iterators.Array;
	}

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$3 = function (CONVERT_TO_STRING) {
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
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt$1 = stringMultibyte$1.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState$1.set;
	var getInternalState$1 = internalState$1.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
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

	var ITERATOR$3 = wellKnownSymbol$1('iterator');

	var isIterable$1 = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$3] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || iterators.hasOwnProperty(classof$1(O));
	};

	var isIterable_1 = isIterable$1;

	var isIterable = isIterable_1;

	var ITERATOR$2 = wellKnownSymbol$1('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || iterators[classof$1(it)];
	};

	var getIterator$1 = function (it) {
	  var iteratorMethod = getIteratorMethod(it);
	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  } return anObject$1(iteratorMethod.call(it));
	};

	var getIterator_1 = getIterator$1;

	var getIterator = getIterator_1;

	function _iterableToArrayLimit(arr, i) {
	  if (typeof symbol === "undefined" || !isIterable(Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('slice');

	var SPECIES$6 = wellKnownSymbol$1('species');
	var nativeSlice = [].slice;
	var max$3 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$1(this);
	    var length = toLength$1(O.length);
	    var k = toAbsoluteIndex$1(start, length);
	    var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$5(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray$5(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$1(Constructor)) {
	        Constructor = Constructor[SPECIES$6];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$3(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path$1[CONSTRUCTOR + 'Prototype'];
	};

	var slice$5 = entryVirtual('Array').slice;

	var ArrayPrototype$6 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.slice) ? slice$5 : own;
	};

	var slice$4 = slice_1;

	var slice$3 = slice$4;

	var iteratorClose = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject$1(returnMethod.call(iterator)).value;
	  }
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    iteratorClose(iterator);
	    throw error;
	  }
	};

	var ITERATOR$1 = wellKnownSymbol$1('iterator');
	var ArrayPrototype$5 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$5[ITERATOR$1] === it);
	};

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject$1(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength$1(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var ITERATOR = wellKnownSymbol$1('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	_export$1({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
	  from: arrayFrom
	});

	var from$2 = path$1.Array.from;

	var from$1 = from$2;

	var from = from$1;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  var _context;

	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);

	  var n = slice$3(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	_export$1({ target: 'Object', stat: true, forced: !descriptors$1, sham: !descriptors$1 }, {
	  defineProperty: objectDefineProperty$1.f
	});

	var defineProperty_1 = createCommonjsModule(function (module) {
	var Object = path$1.Object;

	var defineProperty = module.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$3 = defineProperty_1;

	var defineProperty$2 = defineProperty$3;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$2(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	_export$1({ target: 'Object', stat: true, sham: !descriptors$1 }, {
	  create: objectCreate
	});

	var Object$1 = path$1.Object;

	var create$2 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$1 = create$2;

	var create = create$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	_export$1({ target: 'Object', stat: true }, {
	  setPrototypeOf: objectSetPrototypeOf$1
	});

	var setPrototypeOf$2 = path$1.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf$2;

	var setPrototypeOf = setPrototypeOf$1;

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	var iterator$2 = wellKnownSymbolWrapped.f('iterator');

	var iterator$1 = iterator$2;

	var iterator = iterator$1;

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof symbol === "function" && typeof iterator === "symbol") {
	    _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof symbol === "function" && obj.constructor === symbol && obj !== symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	var FAILS_ON_PRIMITIVES = fails$1(function () { objectGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	_export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject$1(it));
	  }
	});

	var getPrototypeOf$2 = path$1.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf$2;

	var getPrototypeOf = getPrototypeOf$1;

	function _getPrototypeOf(o) {
	  _getPrototypeOf = setPrototypeOf ? getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$1 =
	  /* global globalThis -- safe */
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
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

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$5 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f$5
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
	  // eslint-disable-next-line no-prototype-builtins -- safe
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

	var has$1 = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$3 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$3) && isObject(document$3.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$3.createElement(it) : {};
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
	var f$4 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$4
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$3 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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
		f: f$3
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
	var store$1 = global$1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store$1;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap$1 = global$1.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.9.1',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys$1 = shared('keys');

	var sharedKey = function (key) {
	  return keys$1[key] || (keys$1[key] = uid(key));
	};

	var hiddenKeys$1 = {};

	var WeakMap = global$1.WeakMap;
	var set$1, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set$1(it, {});
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
	  var store = sharedStore.state || (sharedStore.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set$1 = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$1[STATE] = true;
	  set$1 = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has$1(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return has$1(it, STATE);
	  };
	}

	var internalState = {
	  set: set$1,
	  get: get,
	  has: has,
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
	    if (typeof key == 'string' && !has$1(value, 'name')) {
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

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global$1[namespace])
	    : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
	};

	var min$5 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$5(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max$2 = Math.max;
	var min$4 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max$2(integer + length, 0) : min$4(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
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
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var indexOf$3 = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$1(O, key = names[i++])) {
	    ~indexOf$3(result, key) || result.push(key);
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

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$2 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys);
	};

	var objectGetOwnPropertyNames = {
		f: f$2
	};

	var f$1 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$1
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
	    if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
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

	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$3 = arrayMethodIsStrict$1('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$3 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
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

	// `String.prototype.link` method
	// https://tc39.es/ecma262/#sec-string.prototype.link
	_export({ target: 'String', proto: true, forced: stringHtmlForced('link') }, {
	  link: function link(url) {
	    return createHtml(this, 'a', 'href', url);
	  }
	});

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

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y$2 = fails(function () {
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
		UNSUPPORTED_Y: UNSUPPORTED_Y$2,
		BROKEN_CARET: BROKEN_CARET
	};

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
	// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
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

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var engineIsNode = classofRaw(global$1.process) == 'process';

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process$3 = global$1.process;
	var versions = process$3 && process$3.versions;
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

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  /* global Symbol -- required for testing */
	  return !Symbol.sham &&
	    // Chrome 38 Symbol has incorrect toString conversion
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
	});

	var useSymbolAsUid = nativeSymbol
	  /* global Symbol -- safe */
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global$1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has$1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
	    if (nativeSymbol && has$1(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	// TODO: Remove from `core-js@4` since it's moved to entry points







	var SPECIES$5 = wellKnownSymbol('species');

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

	var REPLACE = wellKnownSymbol('replace');
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
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

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
	      re.constructor[SPECIES$5] = function () { return re; };
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

	var MATCH$1 = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var SPECIES$4 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction(S);
	};

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$1 = function (CONVERT_TO_STRING) {
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
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
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

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    // eslint-disable-next-line regexp/no-empty-group -- required for testing
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
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
	      var C = speciesConstructor$1(rx, RegExp);

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
	          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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

	var defineProperty$1 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$1(FunctionPrototype, NAME, {
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

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var floor = Math.floor;
	var replace = ''.replace;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject(namedCaptures);
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
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var max$1 = Math.max;
	var min$2 = Math.min;

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
	        var position = max$1(min$2(toInteger(result.index), S.length), 0);
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

	var isArray$1 = isArray$4;

	var isArray = isArray$1;

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var filter$2 = entryVirtual('Array').filter;

	var ArrayPrototype$4 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.filter) ? filter$2 : own;
	};

	var filter$1 = filter_1;

	var filter = filter$1;

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$1(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $indexOf = arrayIncludes$1.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	_export$1({ target: 'Array', proto: true, forced: NEGATIVE_ZERO$1 || !STRICT_METHOD$2 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO$1
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var indexOf$2 = entryVirtual('Array').indexOf;

	var ArrayPrototype$3 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.indexOf) ? indexOf$2 : own;
	};

	var indexOf$1 = indexOf_1;

	var indexOf = indexOf$1;

	var $forEach = arrayIteration.forEach;


	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	_export$1({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var forEach$2 = entryVirtual('Array').forEach;

	var forEach$1 = forEach$2;

	var ArrayPrototype$2 = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.forEach)
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || DOMIterables.hasOwnProperty(classof$1(it)) ? forEach$1 : own;
	};

	var forEach = forEach_1;

	var $map = arrayIteration.map;


	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var map$2 = entryVirtual('Array').map;

	var ArrayPrototype$1 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.map) ? map$2 : own;
	};

	var map$1 = map_1;

	var map = map$1;

	var concat$2 = entryVirtual('Array').concat;

	var ArrayPrototype = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat$2 : own;
	};

	var concat$1 = concat_1;

	var concat = concat$1;

	// a string of all valid unicode whitespaces
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible$1($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod(3)
	};

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$1(function () {
	    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	_export$1({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var trim$3 = entryVirtual('String').trim;

	var StringPrototype = String.prototype;

	var trim_1 = function (it) {
	  var own = it.trim;
	  return typeof it === 'string' || it === StringPrototype
	    || (it instanceof String && own === StringPrototype.trim) ? trim$3 : own;
	};

	var trim$2 = trim_1;

	var trim$1 = trim$2;

	var $stringify = getBuiltIn$1('JSON', 'stringify');
	var re = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var fix = function (match, offset, string) {
	  var prev = string.charAt(offset - 1);
	  var next = string.charAt(offset + 1);
	  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
	    return '\\u' + match.charCodeAt(0).toString(16);
	  } return match;
	};

	var FORCED$4 = fails$1(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  // https://github.com/tc39/proposal-well-formed-stringify
	  _export$1({ target: 'JSON', stat: true, forced: FORCED$4 }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var result = $stringify.apply(null, arguments);
	      return typeof result == 'string' ? result.replace(re, fix) : result;
	    }
	  });
	}

	if (!path$1.JSON) path$1.JSON = { stringify: JSON.stringify };

	// eslint-disable-next-line no-unused-vars -- required for `.length`
	var stringify$2 = function stringify(it, replacer, space) {
	  return path$1.JSON.stringify.apply(null, arguments);
	};

	var stringify$1 = stringify$2;

	var stringify = stringify$1;

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

	var microevent = createCommonjsModule(function (module) {
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
	if( ('exports' in module)){
		module.exports	= MicroEvent;
	}
	});

	var browserPonyfill = createCommonjsModule(function (module, exports) {
	var __self__ = (function (root) {
	function F() {
	this.fetch = false;
	this.DOMException = root.DOMException;
	}
	F.prototype = root;
	return new F();
	})(typeof self !== 'undefined' ? self : commonjsGlobal);
	(function(self) {

	((function (exports) {

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

	})({}));
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

	var slice$2 = slice_1;

	var slice$1 = slice$2;

	var formatUnit = function formatUnit(unit) {
	  if (unit == null) {
	    return 0;
	  } else if (typeof unit === 'number') {
	    return unit + 'px';
	  } else if (typeof unit === 'string') {
	    return unit.replace('dp', 'px');
	  } else {
	    return 0;
	  }
	};
	var escapeAttrValue = function escapeAttrValue(value) {
	  if (typeof value === 'string') {
	    return value.replace(/"/g, '&quot;');
	  }

	  return value;
	};
	var isDefinedStr = function isDefinedStr(value) {
	  return typeof value === 'string' && value.length > 0;
	};
	var escapeHTML = function escapeHTML() {
	  var unsafe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
	};
	var getShadow = function getShadow(view) {
	  if (isDefinedStr(view.shadow_color)) {
	    var dx = typeof view.shadow_dx === 'number' ? view.shadow_dx : 0;
	    var dy = typeof view.shadow_dy === 'number' ? view.shadow_dy : 0;
	    var radius = typeof view.shadow_radius === 'number' ? view.shadow_radius : 0;
	    var color = view.shadow_color;
	    return {
	      dx: dx,
	      dy: dy,
	      radius: radius,
	      color: color
	    };
	  }
	};
	var getTransforms = function getTransforms(view) {
	  var transforms = [];
	  var translateX = formatUnit(view.transform_translate_x);
	  var translateY = formatUnit(view.transform_translate_y);

	  if (translateX !== 0) {
	    transforms.push("translateX(".concat(translateX, ")"));
	  }

	  if (translateY !== 0) {
	    transforms.push("translateY(".concat(translateY, ")"));
	  }

	  if (typeof view.transform_rotate === 'number' && view.transform_rotate !== 0) {
	    transforms.push("rotate(".concat(view.transform_rotate, "deg)"));
	  }

	  if (typeof view.transform_scale === 'number' && view.transform_scale !== 1) {
	    transforms.push("scale(".concat(view.transform_scale, ")"));
	  }

	  return transforms;
	};
	var parseSpans = function parseSpans(text) {
	  var spans = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var result = [];

	  if (spans.length === 0) {
	    result.push({
	      text: text
	    });
	  } else if (spans[0].start > 0) {
	    result.push({
	      text: slice$1(text).call(text, 0, spans[0].start)
	    });
	  }

	  forEach(spans).call(spans, function (span, i) {
	    var startIndex = span.start;
	    var endIndex = span.end;
	    result.push({
	      text: slice$1(text).call(text, startIndex, endIndex),
	      span: span
	    });

	    if (i === spans.length - 1) {
	      if (endIndex < text.length) {
	        result.push({
	          text: slice$1(text).call(text, endIndex, text.length)
	        });
	      }
	    } else if (endIndex < spans[i + 1].start) {
	      result.push({
	        text: slice$1(text).call(text, endIndex, spans[i + 1].start)
	      });
	    }
	  });

	  return result;
	};
	var getTextShadow = function getTextShadow(view) {
	  if (isDefinedStr(view.text_shadow_color)) {
	    var dx = typeof view.text_shadow_dx === 'number' ? view.text_shadow_dx : 0;
	    var dy = typeof view.text_shadow_dy === 'number' ? view.text_shadow_dy : 0;
	    var radius = typeof view.text_shadow_radius === 'number' ? view.text_shadow_radius : 0;
	    var color = view.text_shadow_color;
	    return {
	      dx: dx,
	      dy: dy,
	      radius: radius,
	      color: color
	    };
	  }
	};
	var loadFonts = function loadFonts() {
	  var fontAssets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var styleEl = document.createElement('style');

	  for (var key in fontAssets) {
	    var _context, _context2;

	    var value = fontAssets[key];

	    var urls = map(_context = value.src).call(_context, function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2),
	          url = _ref2[1];

	      return "url('".concat(url, "')");
	    }).join(', ');

	    styleEl.appendChild(document.createTextNode(concat(_context2 = "@font-face { font-family: '".concat(key, "'; font-display: swap; src: ")).call(_context2, urls, "; }")));
	  }

	  document.head.appendChild(styleEl);
	};

	var min$1 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
	var FORCED$3 = NEGATIVE_ZERO || !STRICT_METHOD;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED$3 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject$1(this);
	  var length = toLength$1(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$1(index, toInteger$1(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : nativeLastIndexOf;

	// `Array.prototype.lastIndexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	_export$1({ target: 'Array', proto: true, forced: arrayLastIndexOf !== [].lastIndexOf }, {
	  lastIndexOf: arrayLastIndexOf
	});

	entryVirtual('Array').lastIndexOf;

	var trim = stringTrim.trim;


	var $parseInt = global$2.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$2 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$2 ? function parseInt(string, radix) {
	  var S = trim(String(string));
	  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	_export$1({ global: true, forced: parseInt != numberParseInt }, {
	  parseInt: numberParseInt
	});

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

	var max = Math.max;
	var min = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$1(this);
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
	      actualDeleteCount = min(max(toInteger$1(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
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

	entryVirtual('Array').splice;

	var slice = [].slice;
	var MSIE = /MSIE .\./.test(engineUserAgent$1); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout /* , ...arguments */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func -- spec requirement
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

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$1(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength$1(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator);
	      throw error;
	    }
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	var $AggregateError = function AggregateError(errors, message) {
	  var that = this;
	  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
	  if (objectSetPrototypeOf$1) {
	    // eslint-disable-next-line unicorn/error-message -- expected
	    that = objectSetPrototypeOf$1(new Error(undefined), objectGetPrototypeOf(that));
	  }
	  if (message !== undefined) createNonEnumerableProperty$1(that, 'message', String(message));
	  var errorsArray = [];
	  iterate(errors, errorsArray.push, { that: errorsArray });
	  createNonEnumerableProperty$1(that, 'errors', errorsArray);
	  return that;
	};

	$AggregateError.prototype = objectCreate(Error.prototype, {
	  constructor: createPropertyDescriptor$1(5, $AggregateError),
	  message: createPropertyDescriptor$1(5, ''),
	  name: createPropertyDescriptor$1(5, 'AggregateError')
	});

	// `AggregateError` constructor
	// https://tc39.es/ecma262/#sec-aggregate-error-constructor
	_export$1({ global: true }, {
	  AggregateError: $AggregateError
	});

	var nativePromiseConstructor = global$2.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else redefine$1(target, key, src[key], options);
	  } return target;
	};

	var SPECIES$3 = wellKnownSymbol$1('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty$1.f;

	  if (descriptors$1 && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var SPECIES$2 = wellKnownSymbol$1('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject$1(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$1(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$3(S);
	};

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent$1);

	var location = global$2.location;
	var set = global$2.setImmediate;
	var clear = global$2.clearImmediate;
	var process$2 = global$2.process;
	var MessageChannel = global$2.MessageChannel;
	var Dispatch = global$2.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global$2.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func -- spec requirement
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (engineIsNode$1) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$2.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global$2.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails$1(post)
	  ) {
	    defer = post;
	    global$2.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement$1('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement$1('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent$1);

	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
	var macrotask = task$1.set;




	var MutationObserver = global$2.MutationObserver || global$2.WebKitMutationObserver;
	var document$2 = global$2.document;
	var process$1 = global$2.process;
	var Promise$1 = global$2.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$2, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (engineIsNode$1 && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify$1();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!engineIsIos && !engineIsNode$1 && !engineIsWebosWebkit && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify$1 = function () {
	      then.call(promise, flush);
	    };
	  // Node.js without promises
	  } else if (engineIsNode$1) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify$1 = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$2, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify$1();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$3(resolve);
	  this.reject = aFunction$3(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability$1 = {
		f: f
	};

	var promiseResolve = function (C, x) {
	  anObject$1(C);
	  if (isObject$1(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global$2.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task = task$1.set;











	var SPECIES$1 = wellKnownSymbol$1('species');
	var PROMISE = 'Promise';
	var getInternalState = internalState$1.get;
	var setInternalState$1 = internalState$1.set;
	var getInternalPromiseState = internalState$1.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global$2.TypeError;
	var document$1 = global$2.document;
	var process = global$2.process;
	getBuiltIn$1('fetch');
	var newPromiseCapability = newPromiseCapability$1.f;
	var newGenericPromiseCapability = newPromiseCapability;
	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$2.dispatchEvent);
	var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper;

	var FORCED$1 = isForced_1$1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource$1(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version$1 === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!engineIsNode$1 && !NATIVE_REJECTION_EVENT) return true;
	  }
	  // We need Promise#finally in the pure version for preventing prototype pollution
	  if (!PromiseConstructor.prototype['finally']) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version$1 >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$1] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$1(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
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
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$2.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global$2['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  task.call(global$2, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (engineIsNode$1) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = engineIsNode$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  task.call(global$2, function () {
	    var promise = state.facade;
	    if (engineIsNode$1) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$1) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$3(executor);
	    Internal.call(this);
	    var state = getInternalState(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState$1(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = engineIsNode$1 ? process.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify(state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };
	  newPromiseCapability$1.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export$1({ global: true, wrap: true, forced: FORCED$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false, true);
	setSpecies$1(PROMISE);

	PromiseWrapper = getBuiltIn$1(PROMISE);

	// statics
	_export$1({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export$1({ target: PROMISE, stat: true, forced: isPure  }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this === PromiseWrapper ? PromiseConstructor : this, x);
	  }
	});

	_export$1({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$3(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$3(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// `Promise.allSettled` method
	// https://tc39.es/ecma262/#sec-promise.allsettled
	_export$1({ target: 'Promise', stat: true }, {
	  allSettled: function allSettled(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$3(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'fulfilled', value: value };
	          --remaining || resolve(values);
	        }, function (error) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'rejected', reason: error };
	          --remaining || resolve(values);
	        });
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var PROMISE_ANY_ERROR = 'No one promise resolved';

	// `Promise.any` method
	// https://tc39.es/ecma262/#sec-promise.any
	_export$1({ target: 'Promise', stat: true }, {
	  any: function any(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$3(C.resolve);
	      var errors = [];
	      var counter = 0;
	      var remaining = 1;
	      var alreadyResolved = false;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyRejected = false;
	        errors.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyResolved = true;
	          resolve(value);
	        }, function (error) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyRejected = true;
	          errors[index] = error;
	          --remaining || reject(new (getBuiltIn$1('AggregateError'))(errors, PROMISE_ANY_ERROR));
	        });
	      });
	      --remaining || reject(new (getBuiltIn$1('AggregateError'))(errors, PROMISE_ANY_ERROR));
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!nativePromiseConstructor && fails$1(function () {
	  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	_export$1({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn$1('Promise'));
	    var isFunction = typeof onFinally == 'function';
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	var TO_STRING = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var nativeToString = RegExpPrototype$1[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	/* eslint-disable no-proto -- safe */

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
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

	var SPECIES = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty = objectDefineProperty.f;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;





	var setInternalState = internalState.set;



	var MATCH = wellKnownSymbol('match');
	var NativeRegExp = global$1.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y;

	var FORCED = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
	  re2[MATCH] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})));

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (FORCED) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var sticky;

	    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
	      return pattern;
	    }

	    if (CORRECT_NEW) {
	      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
	    } else if (pattern instanceof RegExpWrapper) {
	      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
	      pattern = pattern.source;
	    }

	    if (UNSUPPORTED_Y) {
	      sticky = !!flags && flags.indexOf('y') > -1;
	      if (sticky) flags = flags.replace(/y/g, '');
	    }

	    var result = inheritIfRequired(
	      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
	      thisIsRegExp ? this : RegExpPrototype,
	      RegExpWrapper
	    );

	    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

	    return result;
	  };
	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };
	  var keys = getOwnPropertyNames(NativeRegExp);
	  var index = 0;
	  while (keys.length > index) proxy(keys[index++]);
	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  redefine(global$1, 'RegExp', RegExpWrapper);
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	function closest(el, s) {
	  var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

	  do {
	    if (matches.call(el, s)) return el;
	    el = el.parentElement || el.parentNode;
	  } while (el !== null && el.nodeType === 1);

	  return null;
	}

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var Incito = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Incito, _MicroEvent);

	  var _super = _createSuper(Incito);

	  function Incito(containerEl, _ref) {
	    var _this;

	    var _ref$incito = _ref.incito,
	        incito = _ref$incito === void 0 ? {} : _ref$incito;

	    _classCallCheck(this, Incito);

	    _this = _super.call(this);
	    _this.containerEl = containerEl;
	    _this.incito = incito;
	    _this.el = document.createElement('div');
	    _this.ids = {};
	    _this.sections = [];
	    _this.canLazyload = 'IntersectionObserver' in window;

	    _this.render();

	    return _this;
	  }

	  _createClass(Incito, [{
	    key: "render",
	    value: function render() {
	      var theme = this.incito.theme || {};
	      loadFonts(this.incito.font_assets);
	      this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
	      this.el.className = 'incito';

	      if (isArray(theme.font_family)) {
	        var _context;

	        this.el.style.fontFamily = filter(_context = theme.font_family).call(_context, function (v, i, a) {
	          return indexOf(a).call(a, v) === i;
	        }).join(', ');
	      }

	      if (isDefinedStr(theme.background_color)) {
	        this.el.style.backgroundColor = theme.background_color;
	      }

	      if (isDefinedStr(theme.text_color)) {
	        this.el.style.color = theme.text_color;
	      }

	      if (isDefinedStr(theme.style)) {
	        this.styleEl = document.createElement('style');
	        this.styleEl.innerText = theme.style;
	        document.head.appendChild(this.styleEl);
	      }

	      if (typeof theme.line_spacing_multiplier === 'number') {
	        this.el.style.lineHeight = theme.line_spacing_multiplier;
	      } // By setting the language we help the browser with stuff like hyphenation.


	      if (this.incito.locale != null) {
	        this.el.setAttribute('lang', this.incito.locale);
	      }

	      this.el.innerHTML = this.renderHtml(this.incito.root_view);
	      this.containerEl.appendChild(this.el);

	      if (this.canLazyload) {
	        this.enableLazyloading();
	      }
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.el.addEventListener('click', function (e) {
	        var el = closest(e.target, '.incito__view [data-link]');
	        var link = el ? el.dataset.link : null;

	        if (isDefinedStr(link)) {
	          window.open(link, '_blank');
	        }
	      });

	      if (this.canLazyload) {
	        this.observeElements(this.el);
	      }

	      this.trigger('started');
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      if (this.lazyObserver) {
	        this.lazyObserver.disconnect();
	      }

	      if (this.videoObserver) {
	        this.videoObserver.disconnect();
	      }

	      this.containerEl.removeChild(this.el);

	      if (this.styleEl) {
	        this.styleEl.parentNode.removeChild(this.styleEl);
	      }

	      this.trigger('destroyed');
	    }
	  }, {
	    key: "observeElements",
	    value: function observeElements(el) {
	      var _context2,
	          _this2 = this,
	          _context3;

	      forEach(_context2 = el.querySelectorAll('.incito--lazy')).call(_context2, function (el) {
	        _this2.lazyObserver.observe(el);
	      });

	      forEach(_context3 = el.querySelectorAll('.incito__video-view[data-autoplay=true]')).call(_context3, function (el) {
	        _this2.videoObserver.observe(el);
	      });
	    }
	  }, {
	    key: "loadEl",
	    value: function loadEl(el) {
	      var _this3 = this;

	      if (el.tagName.toLowerCase() === 'video' && !el.dataset.isLazyloaded) {
	        var sourceEl = document.createElement('source');
	        sourceEl.setAttribute('src', el.dataset.src);
	        sourceEl.setAttribute('type', el.dataset.mime);
	        el.appendChild(sourceEl);
	        el.load();
	        el.dataset.isLazyloaded = true;
	      } else if (el.classList.contains('incito__incito-embed-view')) {
	        var url = el.dataset.src;
	        var method = el.dataset.method;
	        var body = el.dataset.body;
	        browserPonyfill(url, {
	          method: method || 'get',
	          body: body ? JSON.parse(unescape(body)) : null
	        }).then(function (res) {
	          if (res.status === 200) {
	            return res.json();
	          }
	        }).then(function (res) {
	          el.innerHTML = _this3.renderHtml(res);

	          _this3.observeElements(el);
	        });
	      } else if (el.dataset.bg) {
	        el.style.backgroundImage = "url(".concat(el.dataset.bg, ")");
	      } else if (el.dataset.src) {
	        el.src = el.dataset.src;
	      }
	    }
	  }, {
	    key: "enableLazyloading",
	    value: function enableLazyloading() {
	      var _this4 = this;

	      this.lazyObserver = new IntersectionObserver(function (entries) {
	        forEach(entries).call(entries, function (entry) {
	          if (entry.isIntersecting) {
	            _this4.loadEl(entry.target);

	            _this4.lazyObserver.unobserve(entry.target);
	          }
	        });
	      }, {
	        rootMargin: '500px 0px'
	      });
	      this.videoObserver = new IntersectionObserver(function (entries) {
	        forEach(entries).call(entries, function (entry) {
	          if (entry.isIntersecting) {
	            var autoplayState = entry.target.dataset.autoplayState;

	            _this4.loadEl(entry.target);

	            _this4.lazyObserver.unobserve(entry.target);

	            if (!autoplayState || autoplayState === 'paused') {
	              entry.target.dataset.autoplayState = 'playing';
	              entry.target.play();
	            }
	          } else if (!entry.target.paused) {
	            entry.target.dataset.autoplayState = 'paused';
	            entry.target.pause();
	          }
	        });
	      }, {
	        threshold: 0.25
	      });
	    }
	  }, {
	    key: "renderView",
	    value: function renderView(view) {
	      var _context12;

	      var tagName = 'div';
	      var contents;
	      var classNames = ['incito__view'];
	      var styles = {};
	      var attrs = {};

	      if (view.view_name === 'TextView') {
	        tagName = 'p';
	        classNames.push('incito__text-view');
	        var textStyles = (view.text_style || '').split('|');
	        var text = view.text;

	        if (isArray(view.spans) && view.spans.length > 0) {
	          var parsedText = parseSpans(text, view.spans);
	          text = map(parsedText).call(parsedText, function (item) {
	            var _item$span, _item$span2;

	            var escapedText = escapeHTML(item.text || '');

	            if (((_item$span = item.span) === null || _item$span === void 0 ? void 0 : _item$span.name) === 'link' && item.span.url != null) {
	              var _context4;

	              return concat(_context4 = "<a href=\"".concat(encodeURI(item.span.url), "\" rel=\"external\" target=\"_blank\">")).call(_context4, escapedText, "</a>");
	            }

	            if (((_item$span2 = item.span) === null || _item$span2 === void 0 ? void 0 : _item$span2.name) != null) {
	              var _context5;

	              var spanName = item.span.name;
	              return concat(_context5 = "<span data-name=\"".concat(spanName, "\">")).call(_context5, escapedText, "</span>");
	            }

	            return escapedText;
	          });
	          text = text.join('');
	        } else {
	          text = escapeHTML(text);
	        }

	        if (view.text_prevent_widow) {
	          text = text.replace(/&nbsp;([^\s]+)$/, ' $1').replace(/\s([^\s]+)\s*$/, '&nbsp;$1');
	        }

	        contents = text.replace(/\n/g, '<br>');

	        if (isArray(view.font_family) && view.font_family.length > 0) {
	          styles['font-family'] = view.font_family.join(', ');
	        }

	        if (view.text_size != null) {
	          styles['font-size'] = "".concat(view.text_size, "px");
	        }

	        if (view.line_spacing_multiplier != null) {
	          styles['line-height'] = view.line_spacing_multiplier;
	        }

	        if (view.text_color != null) {
	          styles.color = view.text_color;
	        }

	        if (indexOf(textStyles).call(textStyles, 'bold') !== -1) {
	          styles['font-weight'] = 'bold';
	        }

	        if (indexOf(textStyles).call(textStyles, 'italic') !== -1) {
	          styles['font-style'] = 'italic';
	        }

	        if (isArray(view.text_decoration_line)) {
	          styles['text-decoration-line'] = view.text_decoration_line.join(' ');
	        }

	        var textShadow = getTextShadow(view);

	        if (isDefinedStr(view.text_shadow)) {
	          styles['text-shadow'] = view.text_shadow;
	        } else if (textShadow != null) {
	          var _context6, _context7, _context8;

	          styles['text-shadow'] = concat(_context6 = concat(_context7 = concat(_context8 = "".concat(textShadow.dx, "px ")).call(_context8, textShadow.dy, "px ")).call(_context7, textShadow.radius, "px ")).call(_context6, textShadow.color);
	        }

	        if (view.text_alignment === 'left') {
	          styles['text-align'] = 'left';
	        } else if (view.text_alignment === 'center') {
	          styles['text-align'] = 'center';
	        } else if (view.text_alignment === 'right') {
	          styles['text-align'] = 'right';
	        }

	        if (view.single_line === true || view.max_lines === 1) {
	          attrs['data-single-line'] = true;
	        } else if (typeof view.max_lines === 'number') {
	          styles.display = '-webkit-box';
	          styles['-webkit-line-clamp'] = view.max_lines;
	          styles['-webkit-box-orient'] = 'vertical';
	        }

	        if (view.text_all_caps === true) {
	          styles['text-transform'] = 'uppercase';
	        }
	      } else if (view.view_name === 'ImageView') {
	        tagName = 'img';
	        classNames.push('incito__image-view');
	        attrs.onerror = "this.style.display='none'";

	        if (isDefinedStr(view.src)) {
	          if (this.canLazyload) {
	            classNames.push('incito--lazy');
	            attrs['data-src'] = view.src;
	          } else {
	            attrs.src = view.src;
	          }
	        }

	        if (isDefinedStr(view.label)) {
	          attrs['alt'] = view.label;
	        }
	      } else if (view.view_name === 'VideoView') {
	        tagName = 'video';
	        classNames.push('incito__video-view');
	        attrs.muted = '';
	        attrs.playsinline = '';
	        attrs.preload = 'none';
	        attrs.poster = 'noposter';

	        if (this.canLazyload) {
	          attrs['data-src'] = view.src;
	          attrs['data-mime'] = view.mime;

	          if (view.autoplay === true) {
	            attrs['data-autoplay'] = true;
	          }

	          if (view.controls === true) {
	            attrs['controls'] = '';
	          }

	          if (view.loop === true) {
	            attrs['loop'] = '';
	          }
	        } else {
	          attrs.src = view.src;
	          attrs.controls = '';
	        }

	        if (this.canLazyload) {
	          classNames.push('incito--lazy');
	        }
	      } else if (view.view_name === 'HTMLView') {
	        if (isDefinedStr(view.style)) {
	          var _context9, _context10;

	          forEach(_context9 = trim$1(_context10 = view.style).call(_context10).split(';')).call(_context9, function (style) {
	            var _style$trim$split = trim$1(style).call(style).split(':'),
	                _style$trim$split2 = _slicedToArray(_style$trim$split, 2),
	                key = _style$trim$split2[0],
	                value = _style$trim$split2[1];

	            styles[key] = value;
	          });
	        }
	      } else if (view.view_name === 'VideoEmbedView' || view.view_name === 'HTMLEmbedView') {
	        tagName = 'iframe';
	        classNames.push('incito__html-embed-view');
	        attrs.sandbox = 'allow-scripts allow-same-origin';
	        attrs.allowfullscreen = '';

	        if (this.canLazyload) {
	          classNames.push('incito--lazy');
	          attrs['data-src'] = view.src;
	        } else {
	          attrs.src = view.src;
	        }
	      } else if (view.view_name === 'IncitoEmbedView') {
	        classNames.push('incito__incito-embed-view');

	        if (this.canLazyload) {
	          classNames.push('incito--lazy');
	          attrs['data-src'] = view.src;

	          if (view.method === 'get' || view.method === 'post') {
	            attrs['data-method'] = view.method;
	          }

	          if (view.body) {
	            attrs['data-body'] = escape(stringify(view.body));
	          }
	        }
	      } else if (view.view_name === 'AbsoluteLayout') {
	        classNames.push('incito__absolute-layout-view');
	      } else if (view.view_name === 'FlexLayout') {
	        var flexAlignItemModes = ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'];
	        var flexJustifyModes = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
	        var flexDirectionModes = ['row', 'column'];
	        classNames.push('incito__flex-layout-view');
	        styles.display = 'flex';

	        if (indexOf(flexAlignItemModes).call(flexAlignItemModes, view.layout_flex_align_items) !== -1) {
	          styles['align-items'] = view.layout_flex_align_items;
	          styles['ms-align-items'] = view.layout_flex_align_items;
	        }

	        if (indexOf(flexJustifyModes).call(flexJustifyModes, view.layout_flex_justify_content) !== -1) {
	          styles['justify-content'] = view.layout_flex_justify_content;
	          styles['ms-flex-pack'] = view.layout_flex_justify_content;
	        }

	        if (indexOf(flexDirectionModes).call(flexDirectionModes, view.layout_flex_direction) !== -1) {
	          styles['flex-direction'] = view.layout_flex_direction;
	          styles['ms-flex-direction'] = view.layout_flex_direction;
	        }
	      }

	      if (isDefinedStr(view.id)) {
	        attrs['data-id'] = escapeAttrValue(view.id);
	      }

	      if (isDefinedStr(view.role)) {
	        attrs['data-role'] = escapeAttrValue(view.role);
	      }

	      if (isDefinedStr(view.accessibility_label)) {
	        attrs['aria-label'] = escapeAttrValue(view.accessibility_label);
	      }

	      if (view.accessibility_hidden === true) {
	        attrs['aria-hidden'] = true;
	      }

	      if (isArray(view.feature_labels)) {
	        var _context11;

	        var featureLabels = filter(_context11 = view.feature_labels).call(_context11, function (featureLabel) {
	          return /^[a-z_-]{1,14}$/.test(featureLabel);
	        });

	        if (featureLabels.length) {
	          attrs['data-feature-labels'] = featureLabels.join(',');
	        }
	      }

	      if (isDefinedStr(view.title)) {
	        attrs['title'] = escapeAttrValue(view.title);
	      }

	      if (view.gravity) {
	        attrs['data-gravity'] = view.gravity;
	      }

	      if (isDefinedStr(view.link)) {
	        attrs['data-link'] = view.link;
	      }

	      if (view.layout_width === 'match_parent') {
	        styles.width = '100%';
	      } else if (view.layout_width === 'wrap_content') {
	        styles.display = 'inline-block';
	      } else if (view.layout_width != null) {
	        styles.width = formatUnit(view.layout_width);
	      }

	      if (view.layout_height === 'match_parent') {
	        styles.height = '100%';
	      } else if (view.layout_height === 'wrap_content') {
	        styles.height = 'auto';
	      } else if (view.layout_height != null) {
	        styles.height = formatUnit(view.layout_height);
	      }

	      if (view.min_width != null) {
	        styles['min-width'] = formatUnit(view.min_width);
	      }

	      if (view.max_width != null) {
	        styles['max-width'] = formatUnit(view.max_width);
	      }

	      if (view.min_height != null) {
	        styles['min-height'] = formatUnit(view.min_height);
	      }

	      if (view.max_height != null) {
	        styles['max-height'] = formatUnit(view.max_height);
	      }

	      if (view.layout_top != null) {
	        styles.top = formatUnit(view.layout_top);
	      }

	      if (view.layout_left != null) {
	        styles.left = formatUnit(view.layout_left);
	      }

	      if (view.layout_right != null) {
	        styles.right = formatUnit(view.layout_right);
	      }

	      if (view.layout_bottom != null) {
	        styles.bottom = formatUnit(view.layout_bottom);
	      }

	      if (view.background_color) {
	        styles['background-color'] = view.background_color;
	      }

	      if (isDefinedStr(view.background_image)) {
	        if (this.canLazyload) {
	          classNames.push('incito--lazy');
	          attrs['data-bg'] = view.background_image;
	        } else {
	          styles['background-image'] = "url(".concat(view.background_image, ")");
	        }
	      }

	      if (indexOf(_context12 = ['repeat_x', 'repeat_y', 'repeat']).call(_context12, view.background_tile_mode) !== -1) {
	        styles['background-repeat'] = view.background_tile_mode.replace('_', '-');
	      }

	      if (isDefinedStr(view.background_image_position)) {
	        styles['background-position'] = view.background_image_position.replace('_', ' ');
	      }

	      if (view.background_image_scale_type === 'center_crop') {
	        styles['background-size'] = 'cover';
	      } else if (view.background_image_scale_type === 'center_inside') {
	        styles['background-size'] = 'contain';
	      }

	      if (view.layout_margin != null) {
	        styles.margin = formatUnit(view.layout_margin);
	      }

	      if (view.layout_margin_top != null) {
	        styles['margin-top'] = formatUnit(view.layout_margin_top);
	      }

	      if (view.layout_margin_left != null) {
	        styles['margin-left'] = formatUnit(view.layout_margin_left);
	      }

	      if (view.layout_margin_right != null) {
	        styles['margin-right'] = formatUnit(view.layout_margin_right);
	      }

	      if (view.layout_margin_bottom != null) {
	        styles['margin-bottom'] = formatUnit(view.layout_margin_bottom);
	      }

	      if (view.padding != null) {
	        styles.padding = formatUnit(view.padding);
	      }

	      if (view.padding_top != null) {
	        styles['padding-top'] = formatUnit(view.padding_top);
	      }

	      if (view.padding_left != null) {
	        styles['padding-left'] = formatUnit(view.padding_left);
	      }

	      if (view.padding_right != null) {
	        styles['padding-right'] = formatUnit(view.padding_right);
	      }

	      if (view.padding_bottom != null) {
	        styles['padding-bottom'] = formatUnit(view.padding_bottom);
	      }

	      if (view.corner_radius != null) {
	        styles['border-radius'] = formatUnit(view.corner_radius);
	      }

	      if (view.corner_top_left_radius != null) {
	        styles['border-top-left-radius'] = formatUnit(view.corner_top_left_radius);
	      }

	      if (view.corner_top_right_radius != null) {
	        styles['border-top-right-radius'] = formatUnit(view.corner_top_right_radius);
	      }

	      if (view.corner_bottom_left_radius != null) {
	        styles['border-bottom-left-radius'] = formatUnit(view.corner_bottom_left_radius);
	      }

	      if (view.corner_bottom_right_radius != null) {
	        styles['border-bottom-right-radius'] = formatUnit(view.corner_bottom_right_radius);
	      } // Clip children.


	      if (view.clip_children === false) {
	        styles['overflow'] = 'visible';
	      }

	      var shadow = getShadow(view);

	      if (shadow != null) {
	        var _context13, _context14, _context15;

	        styles['box-shadow'] = concat(_context13 = concat(_context14 = concat(_context15 = "".concat(shadow.dx, "px ")).call(_context15, shadow.dy, "px ")).call(_context14, shadow.radius, "px ")).call(_context13, shadow.color);
	      }

	      var strokeStyles = ['solid', 'dotted', 'dashed'];

	      if (view.stroke_width != null) {
	        styles['border-width'] = formatUnit(view.stroke_width);
	      }

	      if (view.stroke_color != null) {
	        styles['border-color'] = view.stroke_color;
	      }

	      if (indexOf(strokeStyles).call(strokeStyles, view.stroke_style) !== -1) {
	        styles['border-style'] = view.stroke_style;
	      }

	      if (view.stroke_top_width != null) {
	        styles['border-top-width'] = formatUnit(view.stroke_top_width);
	      }

	      if (view.stroke_top_color != null) {
	        styles['border-top-color'] = view.stroke_top_color;
	      }

	      if (view.stroke_left_width != null) {
	        styles['border-left-width'] = formatUnit(view.stroke_left_width);
	      }

	      if (view.stroke_left_color != null) {
	        styles['border-left-color'] = view.stroke_left_color;
	      }

	      if (view.stroke_right_width != null) {
	        styles['border-right-width'] = formatUnit(view.stroke_right_width);
	      }

	      if (view.stroke_right_color != null) {
	        styles['border-right-color'] = view.stroke_right_color;
	      }

	      if (view.stroke_bottom_width != null) {
	        styles['border-bottom-width'] = formatUnit(view.stroke_bottom_width);
	      }

	      if (view.stroke_bottom_color != null) {
	        styles['border-bottom-color'] = view.stroke_bottom_color;
	      }

	      if (typeof view.layout_flex_shrink === 'number') {
	        styles['flex-shrink'] = view.layout_flex_shrink;
	        styles['ms-flex-shrink'] = view.layout_flex_shrink;
	      }

	      if (typeof view.layout_flex_grow === 'number') {
	        styles['flex-grow'] = view.layout_flex_grow;
	        styles['ms-flex-grow'] = view.layout_flex_grow;
	      }

	      if (view.layout_flex_basis != null) {
	        styles['flex-basis'] = formatUnit(view.layout_flex_basis);
	        styles['ms-flex-basis'] = formatUnit(view.layout_flex_basis);
	      }

	      var transforms = getTransforms(view);

	      if (transforms.length > 0) {
	        styles.transform = transforms.join(' ');
	      } // Transform origin.


	      if (isArray(view.transform_origin) && view.transform_origin.length === 2) {
	        styles['transform-origin'] = [formatUnit(view.transform_origin[0]), formatUnit(view.transform_origin[1])].join(' ');
	      }

	      return {
	        tagName: tagName,
	        contents: contents,
	        classNames: classNames,
	        styles: styles,
	        attrs: attrs
	      };
	    }
	  }, {
	    key: "renderHtml",
	    value: function renderHtml(rootView) {
	      var _this5 = this;

	      var html = '';

	      var iter = function iter(view) {
	        try {
	          var _this5$renderView = _this5.renderView(view),
	              tagName = _this5$renderView.tagName,
	              contents = _this5$renderView.contents,
	              classNames = _this5$renderView.classNames,
	              styles = _this5$renderView.styles,
	              attrs = _this5$renderView.attrs;

	          if (view.id != null && typeof view.meta === 'object') {
	            _this5.ids[view.id] = view.meta;
	          }

	          if (view.role === 'section') {
	            _this5.sections.push({
	              id: view.id,
	              meta: view.meta
	            });
	          }

	          html += "<".concat(tagName);
	          html += " class=\"".concat(classNames.join(' '), "\"");

	          for (var key in attrs) {
	            var _context16;

	            var value = attrs[key];
	            html += concat(_context16 = " ".concat(key, "=\"")).call(_context16, value, "\"");
	          }

	          html += ' style="';

	          for (var _key in styles) {
	            var _context17;

	            var _value = styles[_key];
	            html += concat(_context17 = "".concat(_key, ":")).call(_context17, _value, "; ");
	          }

	          html += '"';

	          for (var _key2 in attrs) {
	            var _context18;

	            var _value2 = attrs[_key2];
	            html += concat(_context18 = " ".concat(_key2, "=\"")).call(_context18, _value2, "\"");
	          }

	          html += '>';

	          if (isArray(view.child_views)) {
	            var _context19;

	            forEach(_context19 = view.child_views).call(_context19, function (childView) {
	              iter(childView);
	            });
	          }

	          if (contents) {
	            html += contents;
	          }

	          html += "</".concat(tagName, ">");
	        } catch (error) {}
	      };

	      iter(rootView);
	      return html;
	    }
	  }]);

	  return Incito;
	}(microevent);

	return Incito;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jaXRvLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2hhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcGF0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2EtZnVuY3Rpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZXhwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaHRtbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnJlZmxlY3QuY29uc3RydWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9yZWZsZWN0L2NvbnN0cnVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL3JlZmxlY3QvY29uc3RydWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvcmVmbGVjdC9jb25zdHJ1Y3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5hcnJheS5pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvaXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2FycmF5L2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9hcnJheS9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMtZXh0ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5hc3luYy1pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaGFzLWluc3RhbmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5pcy1jb25jYXQtc3ByZWFkYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN5bWJvbC5tYXRjaC1hbGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnJlcGxhY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnNlYXJjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuc3BlY2llcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wuc3BsaXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuc3ltYm9sLnRvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wudG8tc3RyaW5nLXRhZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zeW1ib2wudW5zY29wYWJsZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuanNvbi50by1zdHJpbmctdGFnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9zeW1ib2wvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5hc3luYy1kaXNwb3NlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuZGlzcG9zZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lc25leHQuc3ltYm9sLm9ic2VydmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5wYXR0ZXJuLW1hdGNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzbmV4dC5zeW1ib2wucmVwbGFjZS1hbGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL3N5bWJvbC9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvc3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9kb20taXRlcmFibGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2lzLWl0ZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9pcy1pdGVyYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9nZXQtaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LnNsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW50cnktdmlydHVhbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9zbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2Uvc2xpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2luc3RhbmNlL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9pbnN0YW5jZS9zbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2FsbC13aXRoLXNhZmUtaXRlcmF0aW9uLWNsb3NpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZmVhdHVyZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLm9iamVjdC5jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9oZWxwZXJzL2VzbS9zZXRQcm90b3R5cGVPZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvZXNtL2luaGVyaXRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9zeW1ib2wvaXRlcmF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL3N5bWJvbC9pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vdHlwZW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy9lc20vcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2hlbHBlcnMvZXNtL2dldFByb3RvdHlwZU9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuam9pbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtaHRtbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctaHRtbC1mb3JjZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5saW5rLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1mbGFncy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnJlZ2V4cC5leGVjLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1mdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5zcGxpdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuZnVuY3Rpb24ubmFtZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LXN1YnN0aXR1dGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnJlcGxhY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL3N0YWJsZS9hcnJheS9pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2FycmF5L2lzLWFycmF5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9maWx0ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMtc3RhYmxlL2luc3RhbmNlL2ZpbHRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2luc3RhbmNlL2luZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS9pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FycmF5LWZvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2Zvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvYXJyYXkvdmlydHVhbC9mb3ItZWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2Zvci1lYWNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYXJyYXkubWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL21hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvbWFwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9hcnJheS92aXJ0dWFsL2NvbmNhdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2UvY29uY2F0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zdHJpbmctdHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL3N0cmluZy10cmltLWZvcmNlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5zdHJpbmcudHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvc3RyaW5nL3ZpcnR1YWwvdHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvaW5zdGFuY2UvdHJpbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3RyaW0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzLXN0YWJsZS9pbnN0YW5jZS90cmltLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmpzb24uc3RyaW5naWZ5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9lcy9qc29uL3N0cmluZ2lmeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2pzb24vc3RyaW5naWZ5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvanNvbi9zdHJpbmdpZnkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbWljcm9ldmVudC9taWNyb2V2ZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nyb3NzLWZldGNoL2Rpc3QvYnJvd3Nlci1wb255ZmlsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL3NsaWNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy1zdGFibGUvaW5zdGFuY2Uvc2xpY2UuanMiLCIuLi8uLi9saWIvaW5jaXRvLWJyb3dzZXIvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9hcnJheS1sYXN0LWluZGV4LW9mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5Lmxhc3QtaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2VzL2FycmF5L3ZpcnR1YWwvbGFzdC1pbmRleC1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL251bWJlci1wYXJzZS1pbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMucGFyc2UtaW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLmFycmF5LnNwbGljZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvZXMvYXJyYXkvdmlydHVhbC9zcGxpY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvd2ViLnRpbWVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2l0ZXJhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMuYWdncmVnYXRlLWVycm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvbmF0aXZlLXByb21pc2UtY29uc3RydWN0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9yZWRlZmluZS1hbGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9zZXQtc3BlY2llcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2FuLWluc3RhbmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy90YXNrLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9pbnRlcm5hbHMvZW5naW5lLWlzLXdlYm9zLXdlYmtpdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL21pY3JvdGFzay5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9ob3N0LXJlcG9ydC1lcnJvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL2ludGVybmFscy9wZXJmb3JtLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMtcHVyZS9tb2R1bGVzL2VzLnByb21pc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy1wdXJlL21vZHVsZXMvZXMucHJvbWlzZS5hbGwtc2V0dGxlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5wcm9taXNlLmFueS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvbW9kdWxlcy9lcy5wcm9taXNlLmZpbmFsbHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnRvLXN0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLnRvLXN0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1zcGVjaWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuY29uc3RydWN0b3IuanMiLCIuLi8uLi9saWIvdXRpbC5qcyIsIi4uLy4uL2xpYi9pbmNpdG8tYnJvd3Nlci9pbmNpdG8uanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvKiBnbG9iYWwgZ2xvYmFsVGhpcyAtLSBzYWZlICovXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogdHlwZW9mIGRldGVjdGlvbiA9PSAnZnVuY3Rpb24nID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQpO1xuICAgIH07XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcblxudmFyIHdyYXBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChOYXRpdmVDb25zdHJ1Y3Rvcikge1xuICB2YXIgV3JhcHBlciA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOYXRpdmVDb25zdHJ1Y3Rvcikge1xuICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcigpO1xuICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgTmF0aXZlQ29uc3RydWN0b3IoYSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiKTtcbiAgICAgIH0gcmV0dXJuIG5ldyBOYXRpdmVDb25zdHJ1Y3RvcihhLCBiLCBjKTtcbiAgICB9IHJldHVybiBOYXRpdmVDb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuICBXcmFwcGVyLnByb3RvdHlwZSA9IE5hdGl2ZUNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgcmV0dXJuIFdyYXBwZXI7XG59O1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIFBST1RPID0gb3B0aW9ucy5wcm90bztcblxuICB2YXIgbmF0aXZlU291cmNlID0gR0xPQkFMID8gZ2xvYmFsIDogU1RBVElDID8gZ2xvYmFsW1RBUkdFVF0gOiAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcblxuICB2YXIgdGFyZ2V0ID0gR0xPQkFMID8gcGF0aCA6IHBhdGhbVEFSR0VUXSB8fCAocGF0aFtUQVJHRVRdID0ge30pO1xuICB2YXIgdGFyZ2V0UHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcblxuICB2YXIgRk9SQ0VELCBVU0VfTkFUSVZFLCBWSVJUVUFMX1BST1RPVFlQRTtcbiAgdmFyIGtleSwgc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5LCBuYXRpdmVQcm9wZXJ0eSwgcmVzdWx0UHJvcGVydHksIGRlc2NyaXB0b3I7XG5cbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBVU0VfTkFUSVZFID0gIUZPUkNFRCAmJiBuYXRpdmVTb3VyY2UgJiYgaGFzKG5hdGl2ZVNvdXJjZSwga2V5KTtcblxuICAgIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG5cbiAgICBpZiAoVVNFX05BVElWRSkgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmF0aXZlU291cmNlLCBrZXkpO1xuICAgICAgbmF0aXZlUHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIG5hdGl2ZVByb3BlcnR5ID0gbmF0aXZlU291cmNlW2tleV07XG5cbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIGltcGxlbWVudGF0aW9uXG4gICAgc291cmNlUHJvcGVydHkgPSAoVVNFX05BVElWRSAmJiBuYXRpdmVQcm9wZXJ0eSkgPyBuYXRpdmVQcm9wZXJ0eSA6IHNvdXJjZVtrZXldO1xuXG4gICAgaWYgKFVTRV9OQVRJVkUgJiYgdHlwZW9mIHRhcmdldFByb3BlcnR5ID09PSB0eXBlb2Ygc291cmNlUHJvcGVydHkpIGNvbnRpbnVlO1xuXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBpZiAob3B0aW9ucy5iaW5kICYmIFVTRV9OQVRJVkUpIHJlc3VsdFByb3BlcnR5ID0gYmluZChzb3VyY2VQcm9wZXJ0eSwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdzIGluIHRoaXMgdmVyc2lvblxuICAgIGVsc2UgaWYgKG9wdGlvbnMud3JhcCAmJiBVU0VfTkFUSVZFKSByZXN1bHRQcm9wZXJ0eSA9IHdyYXBDb25zdHJ1Y3Rvcihzb3VyY2VQcm9wZXJ0eSk7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgZWxzZSBpZiAoUFJPVE8gJiYgdHlwZW9mIHNvdXJjZVByb3BlcnR5ID09ICdmdW5jdGlvbicpIHJlc3VsdFByb3BlcnR5ID0gYmluZChGdW5jdGlvbi5jYWxsLCBzb3VyY2VQcm9wZXJ0eSk7XG4gICAgLy8gZGVmYXVsdCBjYXNlXG4gICAgZWxzZSByZXN1bHRQcm9wZXJ0eSA9IHNvdXJjZVByb3BlcnR5O1xuXG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHNvdXJjZVByb3BlcnR5ICYmIHNvdXJjZVByb3BlcnR5LnNoYW0pIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHJlc3VsdFByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cblxuICAgIHRhcmdldFtrZXldID0gcmVzdWx0UHJvcGVydHk7XG5cbiAgICBpZiAoUFJPVE8pIHtcbiAgICAgIFZJUlRVQUxfUFJPVE9UWVBFID0gVEFSR0VUICsgJ1Byb3RvdHlwZSc7XG4gICAgICBpZiAoIWhhcyhwYXRoLCBWSVJUVUFMX1BST1RPVFlQRSkpIHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHBhdGgsIFZJUlRVQUxfUFJPVE9UWVBFLCB7fSk7XG4gICAgICB9XG4gICAgICAvLyBleHBvcnQgdmlydHVhbCBwcm90b3R5cGUgbWV0aG9kc1xuICAgICAgcGF0aFtWSVJUVUFMX1BST1RPVFlQRV1ba2V5XSA9IHNvdXJjZVByb3BlcnR5O1xuICAgICAgLy8gZXhwb3J0IHJlYWwgcHJvdG90eXBlIG1ldGhvZHNcbiAgICAgIGlmIChvcHRpb25zLnJlYWwgJiYgdGFyZ2V0UHJvdG90eXBlICYmICF0YXJnZXRQcm90b3R5cGVba2V5XSkge1xuICAgICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodGFyZ2V0UHJvdG90eXBlLCBrZXksIHNvdXJjZVByb3BlcnR5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2VyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNOYU4oYXJndW1lbnQgPSArYXJndW1lbnQpID8gMCA6IChhcmd1bWVudCA+IDAgPyBmbG9vciA6IGNlaWwpKGFyZ3VtZW50KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXIoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5ID0ga2V5c1tpbmRleCsrXSwgUHJvcGVydGllc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShnbG9iYWwsIGtleSwgdmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgc2V0R2xvYmFsKFNIQVJFRCwge30pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuOS4xJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDIxIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIFN0cmluZyhrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyAoKytpZCArIHBvc3RmaXgpLnRvU3RyaW5nKDM2KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgLS0gb2xkIElFICovXG4gICAgYWN0aXZlWERvY3VtZW50ID0gZG9jdW1lbnQuZG9tYWluICYmIG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSBhY3RpdmVYRG9jdW1lbnQgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKTtcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIGZhY3RvcmllcyA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24gKEMsIGFyZ3NMZW5ndGgsIGFyZ3MpIHtcbiAgaWYgKCEoYXJnc0xlbmd0aCBpbiBmYWN0b3JpZXMpKSB7XG4gICAgZm9yICh2YXIgbGlzdCA9IFtdLCBpID0gMDsgaSA8IGFyZ3NMZW5ndGg7IGkrKykgbGlzdFtpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSB3ZSBoYXZlIG5vIHByb3BlciBhbHRlcm5hdGl2ZXMsIElFOC0gb25seVxuICAgIGZhY3Rvcmllc1thcmdzTGVuZ3RoXSA9IEZ1bmN0aW9uKCdDLGEnLCAncmV0dXJuIG5ldyBDKCcgKyBsaXN0LmpvaW4oJywnKSArICcpJyk7XG4gIH0gcmV0dXJuIGZhY3Rvcmllc1thcmdzTGVuZ3RoXShDLCBhcmdzKTtcbn07XG5cbi8vIGBGdW5jdGlvbi5wcm90b3R5cGUuYmluZGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qICwgLi4uYXJncyAqLykge1xuICB2YXIgZm4gPSBhRnVuY3Rpb24odGhpcyk7XG4gIHZhciBwYXJ0QXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgdmFyIGJvdW5kRnVuY3Rpb24gPSBmdW5jdGlvbiBib3VuZCgvKiBhcmdzLi4uICovKSB7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGJvdW5kRnVuY3Rpb24gPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9O1xuICBpZiAoaXNPYmplY3QoZm4ucHJvdG90eXBlKSkgYm91bmRGdW5jdGlvbi5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZEZ1bmN0aW9uO1xufTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciBuYXRpdmVDb25zdHJ1Y3QgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ2NvbnN0cnVjdCcpO1xuXG4vLyBgUmVmbGVjdC5jb25zdHJ1Y3RgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWZsZWN0LmNvbnN0cnVjdFxuLy8gTVMgRWRnZSBzdXBwb3J0cyBvbmx5IDIgYXJndW1lbnRzIGFuZCBhcmd1bWVudHNMaXN0IGFyZ3VtZW50IGlzIG9wdGlvbmFsXG4vLyBGRiBOaWdodGx5IHNldHMgdGhpcmQgYXJndW1lbnQgYXMgYG5ldy50YXJnZXRgLCBidXQgZG9lcyBub3QgY3JlYXRlIGB0aGlzYCBmcm9tIGl0XG52YXIgTkVXX1RBUkdFVF9CVUcgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuICEobmF0aXZlQ29uc3RydWN0KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgW10sIEYpIGluc3RhbmNlb2YgRik7XG59KTtcbnZhciBBUkdTX0JVRyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIG5hdGl2ZUNvbnN0cnVjdChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSk7XG52YXIgRk9SQ0VEID0gTkVXX1RBUkdFVF9CVUcgfHwgQVJHU19CVUc7XG5cbiQoeyB0YXJnZXQ6ICdSZWZsZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQsIHNoYW06IEZPUkNFRCB9LCB7XG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gY29uc3RydWN0KFRhcmdldCwgYXJncyAvKiAsIG5ld1RhcmdldCAqLykge1xuICAgIGFGdW5jdGlvbihUYXJnZXQpO1xuICAgIGFuT2JqZWN0KGFyZ3MpO1xuICAgIHZhciBuZXdUYXJnZXQgPSBhcmd1bWVudHMubGVuZ3RoIDwgMyA/IFRhcmdldCA6IGFGdW5jdGlvbihhcmd1bWVudHNbMl0pO1xuICAgIGlmIChBUkdTX0JVRyAmJiAhTkVXX1RBUkdFVF9CVUcpIHJldHVybiBuYXRpdmVDb25zdHJ1Y3QoVGFyZ2V0LCBhcmdzLCBuZXdUYXJnZXQpO1xuICAgIGlmIChUYXJnZXQgPT0gbmV3VGFyZ2V0KSB7XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIG9wdGltaXphdGlvbiBmb3IgMC00IGFyZ3VtZW50c1xuICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgVGFyZ2V0KCk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgIGNhc2UgMzogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgIGNhc2UgNDogcmV0dXJuIG5ldyBUYXJnZXQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgICB9XG4gICAgICAvLyB3L28gYWx0ZXJlZCBuZXdUYXJnZXQsIGxvdCBvZiBhcmd1bWVudHMgY2FzZVxuICAgICAgdmFyICRhcmdzID0gW251bGxdO1xuICAgICAgJGFyZ3MucHVzaC5hcHBseSgkYXJncywgYXJncyk7XG4gICAgICByZXR1cm4gbmV3IChiaW5kLmFwcGx5KFRhcmdldCwgJGFyZ3MpKSgpO1xuICAgIH1cbiAgICAvLyB3aXRoIGFsdGVyZWQgbmV3VGFyZ2V0LCBub3Qgc3VwcG9ydCBidWlsdC1pbiBjb25zdHJ1Y3RvcnNcbiAgICB2YXIgcHJvdG8gPSBuZXdUYXJnZXQucHJvdG90eXBlO1xuICAgIHZhciBpbnN0YW5jZSA9IGNyZWF0ZShpc09iamVjdChwcm90bykgPyBwcm90byA6IE9iamVjdC5wcm90b3R5cGUpO1xuICAgIHZhciByZXN1bHQgPSBGdW5jdGlvbi5hcHBseS5jYWxsKFRhcmdldCwgaW5zdGFuY2UsIGFyZ3MpO1xuICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogaW5zdGFuY2U7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5yZWZsZWN0LmNvbnN0cnVjdCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguUmVmbGVjdC5jb25zdHJ1Y3Q7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvcmVmbGVjdC9jb25zdHJ1Y3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL3JlZmxlY3QvY29uc3RydWN0XCIpOyIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbi8vIGBJc0FycmF5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG5cbi8vIGBBcnJheS5pc0FycmF5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkuaXNhcnJheVxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIGlzQXJyYXk6IGlzQXJyYXlcbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pcy1hcnJheScpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguQXJyYXkuaXNBcnJheTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9hcnJheS9pcy1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9hcnJheS9pcy1hcnJheVwiKTsiLCJpbXBvcnQgX0FycmF5JGlzQXJyYXkgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9hcnJheS9pcy1hcnJheVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoX0FycmF5JGlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgcHJvcGVydHlLZXkgPSB0b1ByaW1pdGl2ZShrZXkpO1xuICBpZiAocHJvcGVydHlLZXkgaW4gb2JqZWN0KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwgcHJvcGVydHlLZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtwcm9wZXJ0eUtleV0gPSB2YWx1ZTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzc29mKGdsb2JhbC5wcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSArIG1hdGNoWzFdO1xufSBlbHNlIGlmICh1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb24gJiYgK3ZlcnNpb247XG4iLCJ2YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvKiBnbG9iYWwgU3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG4gIHJldHVybiAhU3ltYm9sLnNoYW0gJiZcbiAgICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgKElTX05PREUgPyBWOF9WRVJTSU9OID09PSAzOCA6IFY4X1ZFUlNJT04gPiAzNyAmJiBWOF9WRVJTSU9OIDwgNDEpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAvKiBnbG9iYWwgU3ltYm9sIC0tIHNhZmUgKi9cbiAgJiYgIVN5bWJvbC5zaGFtXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkgfHwgIShOQVRJVkVfU1lNQk9MIHx8IHR5cGVvZiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPT0gJ3N0cmluZycpKSB7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzKFN5bWJvbCwgbmFtZSkpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICAgIH1cbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGBBcnJheVNwZWNpZXNDcmVhdGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWxBcnJheSkpIHtcbiAgICBDID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBuZXcgKEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQykobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xuXG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEUgPSB3ZWxsS25vd25TeW1ib2woJ2lzQ29uY2F0U3ByZWFkYWJsZScpO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCA9ICdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnO1xuXG4vLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbi8vIGRlb3B0aW1pemF0aW9uIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjc5XG52YXIgSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCA9IFY4X1ZFUlNJT04gPj0gNTEgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGFycmF5W0lTX0NPTkNBVF9TUFJFQURBQkxFXSA9IGZhbHNlO1xuICByZXR1cm4gYXJyYXkuY29uY2F0KClbMF0gIT09IGFycmF5O1xufSk7XG5cbnZhciBTUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdjb25jYXQnKTtcblxudmFyIGlzQ29uY2F0U3ByZWFkYWJsZSA9IGZ1bmN0aW9uIChPKSB7XG4gIGlmICghaXNPYmplY3QoTykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNwcmVhZGFibGUgPSBPW0lTX0NPTkNBVF9TUFJFQURBQkxFXTtcbiAgcmV0dXJuIHNwcmVhZGFibGUgIT09IHVuZGVmaW5lZCA/ICEhc3ByZWFkYWJsZSA6IGlzQXJyYXkoTyk7XG59O1xuXG52YXIgRk9SQ0VEID0gIUlTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQgfHwgIVNQRUNJRVNfU1VQUE9SVDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb25jYXRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29uY2F0XG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAaXNDb25jYXRTcHJlYWRhYmxlIGFuZCBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KGFyZykge1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgdmFyIG4gPSAwO1xuICAgIHZhciBpLCBrLCBsZW5ndGgsIGxlbiwgRTtcbiAgICBmb3IgKGkgPSAtMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBFID0gaSA9PT0gLTEgPyBPIDogYXJndW1lbnRzW2ldO1xuICAgICAgaWYgKGlzQ29uY2F0U3ByZWFkYWJsZShFKSkge1xuICAgICAgICBsZW4gPSB0b0xlbmd0aChFLmxlbmd0aCk7XG4gICAgICAgIGlmIChuICsgbGVuID4gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGZvciAoayA9IDA7IGsgPCBsZW47IGsrKywgbisrKSBpZiAoayBpbiBFKSBjcmVhdGVQcm9wZXJ0eShBLCBuLCBFW2tdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChuID49IE1BWF9TQUZFX0lOVEVHRVIpIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfSU5ERVhfRVhDRUVERUQpO1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShBLCBuKyssIEUpO1xuICAgICAgfVxuICAgIH1cbiAgICBBLmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcblxudmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlOYW1lcyhpdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJ1xuICAgID8gZ2V0V2luZG93TmFtZXMoaXQpXG4gICAgOiBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChpdCkpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbnVtZXJhYmxlKSB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICBlbHNlIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgdmFsdWUpO1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuZXhwb3J0cy5mID0gd2VsbEtub3duU3ltYm9sO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSkge1xuICB2YXIgU3ltYm9sID0gcGF0aC5TeW1ib2wgfHwgKHBhdGguU3ltYm9sID0ge30pO1xuICBpZiAoIWhhcyhTeW1ib2wsIE5BTUUpKSBkZWZpbmVQcm9wZXJ0eShTeW1ib2wsIE5BTUUsIHtcbiAgICB2YWx1ZTogd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mKE5BTUUpXG4gIH0pO1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IHt9LnRvU3RyaW5nIDogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbn07XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXRvLXN0cmluZycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDLCBTRVRfTUVUSE9EKSB7XG4gIGlmIChpdCkge1xuICAgIHZhciB0YXJnZXQgPSBTVEFUSUMgPyBpdCA6IGl0LnByb3RvdHlwZTtcbiAgICBpZiAoIWhhcyh0YXJnZXQsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICAgIH1cbiAgICBpZiAoU0VUX01FVEhPRCAmJiAhVE9fU1RSSU5HX1RBR19TVVBQT1JUKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodGFyZ2V0LCAndG9TdHJpbmcnLCB0b1N0cmluZyk7XG4gICAgfVxuICB9XG59O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVApIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gc3RvcmUuZ2V0O1xuICB2YXIgd21oYXMgPSBzdG9yZS5oYXM7XG4gIHZhciB3bXNldCA9IHN0b3JlLnNldDtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHdtc2V0LmNhbGwoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQuY2FsbChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMuY2FsbChzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIG9iamVjdEhhcyhpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gW10ucHVzaDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4LCBmaWx0ZXJPdXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgSVNfRklMVEVSX09VVCA9IFRZUEUgPT0gNztcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSIHx8IElTX0ZJTFRFUl9PVVQgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkO1xuICAgIHZhciB2YWx1ZSwgcmVzdWx0O1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsdWUgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlc3VsdCA9IGJvdW5kRnVuY3Rpb24odmFsdWUsIGluZGV4LCBPKTtcbiAgICAgIGlmIChUWVBFKSB7XG4gICAgICAgIGlmIChJU19NQVApIHRhcmdldFtpbmRleF0gPSByZXN1bHQ7IC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXN1bHQpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsdWU7ICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlclxuICAgICAgICB9IGVsc2Ugc3dpdGNoIChUWVBFKSB7XG4gICAgICAgICAgY2FzZSA0OiByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICAgICAgY2FzZSA3OiBwdXNoLmNhbGwodGFyZ2V0LCB2YWx1ZSk7IC8vIGZpbHRlck91dFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiB0YXJnZXQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4gIG1hcDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbHRlclxuICBmaWx0ZXI6IGNyZWF0ZU1ldGhvZCgyKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5ldmVyeVxuICBldmVyeTogY3JlYXRlTWV0aG9kKDQpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4gIGZpbmQ6IGNyZWF0ZU1ldGhvZCg1KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNiksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyT3V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtYXJyYXktZmlsdGVyaW5nXG4gIGZpbHRlck91dDogY3JlYXRlTWV0aG9kKDcpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBuYXRpdmVPYmplY3RDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc0V4dGVybmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLWV4dGVybmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC13cmFwcGVkJyk7XG52YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG5cbnZhciBISURERU4gPSBzaGFyZWRLZXkoJ2hpZGRlbicpO1xudmFyIFNZTUJPTCA9ICdTeW1ib2wnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNZTUJPTCk7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gT2JqZWN0W1BST1RPVFlQRV07XG52YXIgJFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgJHN0cmluZ2lmeSA9IGdldEJ1aWx0SW4oJ0pTT04nLCAnc3RyaW5naWZ5Jyk7XG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xudmFyIG5hdGl2ZUdldE93blByb3BlcnR5TmFtZXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZjtcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG52YXIgQWxsU3ltYm9scyA9IHNoYXJlZCgnc3ltYm9scycpO1xudmFyIE9iamVjdFByb3RvdHlwZVN5bWJvbHMgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKTtcbnZhciBTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzdHJpbmctdG8tc3ltYm9sLXJlZ2lzdHJ5Jyk7XG52YXIgU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXRvLXN0cmluZy1yZWdpc3RyeScpO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgVVNFX1NFVFRFUiA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RDcmVhdGUobmF0aXZlRGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkodGhpcywgJ2EnLCB7IHZhbHVlOiA3IH0pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24gKE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgdmFyIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0UHJvdG90eXBlLCBQKTtcbiAgaWYgKE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpIGRlbGV0ZSBPYmplY3RQcm90b3R5cGVbUF07XG4gIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICBpZiAoT2JqZWN0UHJvdG90eXBlRGVzY3JpcHRvciAmJiBPICE9PSBPYmplY3RQcm90b3R5cGUpIHtcbiAgICBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90b3R5cGUsIFAsIE9iamVjdFByb3RvdHlwZURlc2NyaXB0b3IpO1xuICB9XG59IDogbmF0aXZlRGVmaW5lUHJvcGVydHk7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24gKHRhZywgZGVzY3JpcHRpb24pIHtcbiAgdmFyIHN5bWJvbCA9IEFsbFN5bWJvbHNbdGFnXSA9IG5hdGl2ZU9iamVjdENyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzZXRJbnRlcm5hbFN0YXRlKHN5bWJvbCwge1xuICAgIHR5cGU6IFNZTUJPTCxcbiAgICB0YWc6IHRhZyxcbiAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb25cbiAgfSk7XG4gIGlmICghREVTQ1JJUFRPUlMpIHN5bWJvbC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICByZXR1cm4gc3ltYm9sO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChpdCkgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgaWYgKE8gPT09IE9iamVjdFByb3RvdHlwZSkgJGRlZmluZVByb3BlcnR5KE9iamVjdFByb3RvdHlwZVN5bWJvbHMsIFAsIEF0dHJpYnV0ZXMpO1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFBdHRyaWJ1dGVzLmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKE8sIEhJRERFTikpIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIEhJRERFTiwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHt9KSk7XG4gICAgICBPW0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChoYXMoTywgSElEREVOKSAmJiBPW0hJRERFTl1ba2V5XSkgT1tISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSBuYXRpdmVPYmplY3RDcmVhdGUoQXR0cmlidXRlcywgeyBlbnVtZXJhYmxlOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2NyaXB0b3IoTywga2V5LCBBdHRyaWJ1dGVzKTtcbiAgfSByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywga2V5LCBBdHRyaWJ1dGVzKTtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIHByb3BlcnRpZXMgPSB0b0luZGV4ZWRPYmplY3QoUHJvcGVydGllcyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhwcm9wZXJ0aWVzKS5jb25jYXQoJGdldE93blByb3BlcnR5U3ltYm9scyhwcm9wZXJ0aWVzKSk7XG4gICRmb3JFYWNoKGtleXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIURFU0NSSVBUT1JTIHx8ICRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHByb3BlcnRpZXMsIGtleSkpICRkZWZpbmVQcm9wZXJ0eShPLCBrZXksIHByb3BlcnRpZXNba2V5XSk7XG4gIH0pO1xuICByZXR1cm4gTztcbn07XG5cbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IG5hdGl2ZU9iamVjdENyZWF0ZShPKSA6ICRkZWZpbmVQcm9wZXJ0aWVzKG5hdGl2ZU9iamVjdENyZWF0ZShPKSwgUHJvcGVydGllcyk7XG59O1xuXG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgUCA9IHRvUHJpbWl0aXZlKFYsIHRydWUpO1xuICB2YXIgZW51bWVyYWJsZSA9IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGhpcywgUCk7XG4gIGlmICh0aGlzID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIFApICYmICFoYXMoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgUCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGVudW1lcmFibGUgfHwgIWhhcyh0aGlzLCBQKSB8fCAhaGFzKEFsbFN5bWJvbHMsIFApIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtQXSA/IGVudW1lcmFibGUgOiB0cnVlO1xufTtcblxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICB2YXIgaXQgPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90b3R5cGUgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPYmplY3RQcm90b3R5cGVTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBkZXNjcmlwdG9yID0gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpO1xuICBpZiAoZGVzY3JpcHRvciAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKSB7XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG5cbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKHRvSW5kZXhlZE9iamVjdChPKSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgJGZvckVhY2gobmFtZXMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoaGlkZGVuS2V5cywga2V5KSkgcmVzdWx0LnB1c2goa2V5KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhPKSB7XG4gIHZhciBJU19PQkpFQ1RfUFJPVE9UWVBFID0gTyA9PT0gT2JqZWN0UHJvdG90eXBlO1xuICB2YXIgbmFtZXMgPSBuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzKElTX09CSkVDVF9QUk9UT1RZUEUgPyBPYmplY3RQcm90b3R5cGVTeW1ib2xzIDogdG9JbmRleGVkT2JqZWN0KE8pKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICAkZm9yRWFjaChuYW1lcywgZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5KSAmJiAoIUlTX09CSkVDVF9QUk9UT1RZUEUgfHwgaGFzKE9iamVjdFByb3RvdHlwZSwga2V5KSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIGBTeW1ib2xgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC1jb25zdHJ1Y3RvclxuaWYgKCFOQVRJVkVfU1lNQk9MKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHZhciBkZXNjcmlwdGlvbiA9ICFhcmd1bWVudHMubGVuZ3RoIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogU3RyaW5nKGFyZ3VtZW50c1swXSk7XG4gICAgdmFyIHRhZyA9IHVpZChkZXNjcmlwdGlvbik7XG4gICAgdmFyIHNldHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvdHlwZSkgc2V0dGVyLmNhbGwoT2JqZWN0UHJvdG90eXBlU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYgKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpIHRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjcmlwdG9yKHRoaXMsIHRhZywgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgVVNFX1NFVFRFUikgc2V0U3ltYm9sRGVzY3JpcHRvcihPYmplY3RQcm90b3R5cGUsIHRhZywgeyBjb25maWd1cmFibGU6IHRydWUsIHNldDogc2V0dGVyIH0pO1xuICAgIHJldHVybiB3cmFwKHRhZywgZGVzY3JpcHRpb24pO1xuICB9O1xuXG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykudGFnO1xuICB9KTtcblxuICByZWRlZmluZSgkU3ltYm9sLCAnd2l0aG91dFNldHRlcicsIGZ1bmN0aW9uIChkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiB3cmFwKHVpZChkZXNjcmlwdGlvbiksIGRlc2NyaXB0aW9uKTtcbiAgfSk7XG5cbiAgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgZGVmaW5lUHJvcGVydHlNb2R1bGUuZiA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgd3JhcHBlZFdlbGxLbm93blN5bWJvbE1vZHVsZS5mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd3JhcCh3ZWxsS25vd25TeW1ib2wobmFtZSksIG5hbWUpO1xuICB9O1xuXG4gIGlmIChERVNDUklQVE9SUykge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLVN5bWJvbC1kZXNjcmlwdGlvblxuICAgIG5hdGl2ZURlZmluZVByb3BlcnR5KCRTeW1ib2xbUFJPVE9UWVBFXSwgJ2Rlc2NyaXB0aW9uJywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBkZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGdldEludGVybmFsU3RhdGUodGhpcykuZGVzY3JpcHRpb247XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFJU19QVVJFKSB7XG4gICAgICByZWRlZmluZShPYmplY3RQcm90b3R5cGUsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgeyB1bnNhZmU6IHRydWUgfSk7XG4gICAgfVxuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgU3ltYm9sOiAkU3ltYm9sXG59KTtcblxuJGZvckVhY2gob2JqZWN0S2V5cyhXZWxsS25vd25TeW1ib2xzU3RvcmUpLCBmdW5jdGlvbiAobmFtZSkge1xuICBkZWZpbmVXZWxsS25vd25TeW1ib2wobmFtZSk7XG59KTtcblxuJCh7IHRhcmdldDogU1lNQk9MLCBzdGF0OiB0cnVlLCBmb3JjZWQ6ICFOQVRJVkVfU1lNQk9MIH0sIHtcbiAgLy8gYFN5bWJvbC5mb3JgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5mb3JcbiAgJ2Zvcic6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKGtleSk7XG4gICAgaWYgKGhhcyhTdHJpbmdUb1N5bWJvbFJlZ2lzdHJ5LCBzdHJpbmcpKSByZXR1cm4gU3RyaW5nVG9TeW1ib2xSZWdpc3RyeVtzdHJpbmddO1xuICAgIHZhciBzeW1ib2wgPSAkU3ltYm9sKHN0cmluZyk7XG4gICAgU3RyaW5nVG9TeW1ib2xSZWdpc3RyeVtzdHJpbmddID0gc3ltYm9sO1xuICAgIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltYm9sXSA9IHN0cmluZztcbiAgICByZXR1cm4gc3ltYm9sO1xuICB9LFxuICAvLyBgU3ltYm9sLmtleUZvcmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmtleWZvclxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihzeW0pIHtcbiAgICBpZiAoIWlzU3ltYm9sKHN5bSkpIHRocm93IFR5cGVFcnJvcihzeW0gKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuICAgIGlmIChoYXMoU3ltYm9sVG9TdHJpbmdSZWdpc3RyeSwgc3ltKSkgcmV0dXJuIFN5bWJvbFRvU3RyaW5nUmVnaXN0cnlbc3ltXTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbiAoKSB7IFVTRV9TRVRURVIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uICgpIHsgVVNFX1NFVFRFUiA9IGZhbHNlOyB9XG59KTtcblxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIU5BVElWRV9TWU1CT0wsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIC8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yc1xuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Jcbn0pO1xuXG4kKHsgdGFyZ2V0OiAnT2JqZWN0Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiAhTkFUSVZFX1NZTUJPTCB9LCB7XG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlzeW1ib2xzXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIENocm9tZSAzOCBhbmQgMzkgYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIGZhaWxzIG9uIHByaW1pdGl2ZXNcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM0NDNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IGZhaWxzKGZ1bmN0aW9uICgpIHsgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYoMSk7IH0pIH0sIHtcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmYodG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG5cbi8vIGBKU09OLnN0cmluZ2lmeWAgbWV0aG9kIGJlaGF2aW9yIHdpdGggc3ltYm9sc1xuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1qc29uLnN0cmluZ2lmeVxuaWYgKCRzdHJpbmdpZnkpIHtcbiAgdmFyIEZPUkNFRF9KU09OX1NUUklOR0lGWSA9ICFOQVRJVkVfU1lNQk9MIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3ltYm9sID0gJFN5bWJvbCgpO1xuICAgIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gICAgcmV0dXJuICRzdHJpbmdpZnkoW3N5bWJvbF0pICE9ICdbbnVsbF0nXG4gICAgICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgICAgIHx8ICRzdHJpbmdpZnkoeyBhOiBzeW1ib2wgfSkgIT0gJ3t9J1xuICAgICAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgICAgIHx8ICRzdHJpbmdpZnkoT2JqZWN0KHN5bWJvbCkpICE9ICd7fSc7XG4gIH0pO1xuXG4gICQoeyB0YXJnZXQ6ICdKU09OJywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRURfSlNPTl9TVFJJTkdJRlkgfSwge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gICAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgICAgdmFyIGluZGV4ID0gMTtcbiAgICAgIHZhciAkcmVwbGFjZXI7XG4gICAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGluZGV4KSBhcmdzLnB1c2goYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICAgICRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgICAgaWYgKCFpc09iamVjdChyZXBsYWNlcikgJiYgaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpIHJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgICAgaWYgKCFpc0FycmF5KHJlcGxhY2VyKSkgcmVwbGFjZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgICBpZiAoIWlzU3ltYm9sKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICAgIHJldHVybiAkc3RyaW5naWZ5LmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIGBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnByb3RvdHlwZS1AQHRvcHJpbWl0aXZlXG5pZiAoISRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xufVxuLy8gYFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11gIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5wcm90b3R5cGUtQEB0b3N0cmluZ3RhZ1xuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgU1lNQk9MKTtcblxuaGlkZGVuS2V5c1tISURERU5dID0gdHJ1ZTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuYXN5bmNJdGVyYXRvcmAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmFzeW5jaXRlcmF0b3JcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnYXN5bmNJdGVyYXRvcicpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5oYXNJbnN0YW5jZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmhhc2luc3RhbmNlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ2hhc0luc3RhbmNlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLmlzY29uY2F0c3ByZWFkYWJsZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpc0NvbmNhdFNwcmVhZGFibGUnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuaXRlcmF0b3JgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5pdGVyYXRvclxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5tYXRjaGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLm1hdGNoXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLm1hdGNoQWxsYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wubWF0Y2hhbGxcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnbWF0Y2hBbGwnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wucmVwbGFjZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnJlcGxhY2VcbmRlZmluZVdlbGxLbm93blN5bWJvbCgncmVwbGFjZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5zZWFyY2hgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5zZWFyY2hcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnc2VhcmNoJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnNwZWNpZXNgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5zcGVjaWVzXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wuc3BsaXRgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC5zcGxpdFxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdzcGxpdCcpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC50b1ByaW1pdGl2ZWAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3ltYm9sLnRvcHJpbWl0aXZlXG5kZWZpbmVXZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zeW1ib2wudG9zdHJpbmd0YWdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbiIsInZhciBkZWZpbmVXZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLXdlbGwta25vd24tc3ltYm9sJyk7XG5cbi8vIGBTeW1ib2wudW5zY29wYWJsZXNgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN5bWJvbC51bnNjb3BhYmxlc1xuZGVmaW5lV2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xuXG4vLyBKU09OW0BAdG9TdHJpbmdUYWddIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWpzb24tQEB0b3N0cmluZ3RhZ1xuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmRlc2NyaXB0aW9uJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5oYXMtaW5zdGFuY2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLmlzLWNvbmNhdC1zcHJlYWRhYmxlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wubWF0Y2gnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3ltYm9sLm1hdGNoLWFsbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wucmVwbGFjZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuc2VhcmNoJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGVjaWVzJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC5zcGxpdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wudG8tcHJpbWl0aXZlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN5bWJvbC51bnNjb3BhYmxlcycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5qc29uLnRvLXN0cmluZy10YWcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMubWF0aC50by1zdHJpbmctdGFnJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnJlZmxlY3QudG8tc3RyaW5nLXRhZycpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguU3ltYm9sO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5hc3luY0Rpc3Bvc2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC11c2luZy1zdGF0ZW1lbnRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnYXN5bmNEaXNwb3NlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLmRpc3Bvc2VgIHdlbGwta25vd24gc3ltYm9sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC11c2luZy1zdGF0ZW1lbnRcbmRlZmluZVdlbGxLbm93blN5bWJvbCgnZGlzcG9zZScpO1xuIiwidmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuLy8gYFN5bWJvbC5vYnNlcnZhYmxlYCB3ZWxsLWtub3duIHN5bWJvbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG4iLCJ2YXIgZGVmaW5lV2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS13ZWxsLWtub3duLXN5bWJvbCcpO1xuXG4vLyBgU3ltYm9sLnBhdHRlcm5NYXRjaGAgd2VsbC1rbm93biBzeW1ib2xcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXBhdHRlcm4tbWF0Y2hpbmdcbmRlZmluZVdlbGxLbm93blN5bWJvbCgncGF0dGVybk1hdGNoJyk7XG4iLCIvLyBUT0RPOiByZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxudmFyIGRlZmluZVdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtd2VsbC1rbm93bi1zeW1ib2wnKTtcblxuZGVmaW5lV2VsbEtub3duU3ltYm9sKCdyZXBsYWNlQWxsJyk7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wuYXN5bmMtZGlzcG9zZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuc3ltYm9sLmRpc3Bvc2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5zeW1ib2wucGF0dGVybi1tYXRjaCcpO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGBcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LnN5bWJvbC5yZXBsYWNlLWFsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9zeW1ib2xcIik7IiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2Zcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlYCBvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1vYmplY3RcbnZhciBJdGVyYXRvclByb3RvdHlwZSwgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlLCBhcnJheUl0ZXJhdG9yO1xuXG5pZiAoW10ua2V5cykge1xuICBhcnJheUl0ZXJhdG9yID0gW10ua2V5cygpO1xuICAvLyBTYWZhcmkgOCBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgaWYgKCEoJ25leHQnIGluIGFycmF5SXRlcmF0b3IpKSBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gdHJ1ZTtcbiAgZWxzZSB7XG4gICAgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoZ2V0UHJvdG90eXBlT2YoYXJyYXlJdGVyYXRvcikpO1xuICAgIGlmIChQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIEl0ZXJhdG9yUHJvdG90eXBlID0gUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG59XG5cbnZhciBORVdfSVRFUkFUT1JfUFJPVE9UWVBFID0gSXRlcmF0b3JQcm90b3R5cGUgPT0gdW5kZWZpbmVkIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgLy8gRkY0NC0gbGVnYWN5IGl0ZXJhdG9ycyBjYXNlXG4gIHJldHVybiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0uY2FsbCh0ZXN0KSAhPT0gdGVzdDtcbn0pO1xuXG5pZiAoTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbmlmICgoIUlTX1BVUkUgfHwgTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKSB7XG4gIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxuICBCVUdHWV9TQUZBUklfSVRFUkFUT1JTOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJykuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICBJdGVyYXRvckNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yQ29uc3RydWN0b3IsIFRPX1NUUklOR19UQUcsIGZhbHNlLCB0cnVlKTtcbiAgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgcmV0dXJuIEl0ZXJhdG9yQ29uc3RydWN0b3I7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvIC0tIHNhZmUgKi9cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSXRlcmF0b3JzQ29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpO1xuXG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBJdGVyYXRvcnNDb3JlLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBJdGVyYXRvcnNDb3JlLkJVR0dZX1NBRkFSSV9JVEVSQVRPUlM7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcbnZhciBFTlRSSUVTID0gJ2VudHJpZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhYmxlLCBOQU1FLCBJdGVyYXRvckNvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuXG4gIHZhciBnZXRJdGVyYXRpb25NZXRob2QgPSBmdW5jdGlvbiAoS0lORCkge1xuICAgIGlmIChLSU5EID09PSBERUZBVUxUICYmIGRlZmF1bHRJdGVyYXRvcikgcmV0dXJuIGRlZmF1bHRJdGVyYXRvcjtcbiAgICBpZiAoIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgS0lORCBpbiBJdGVyYWJsZVByb3RvdHlwZSkgcmV0dXJuIEl0ZXJhYmxlUHJvdG90eXBlW0tJTkRdO1xuICAgIHN3aXRjaCAoS0lORCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgRU5UUklFUzogcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzKTsgfTtcbiAgfTtcblxuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IGZhbHNlO1xuICB2YXIgSXRlcmFibGVQcm90b3R5cGUgPSBJdGVyYWJsZS5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVJdGVyYXRvciA9IEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXVxuICAgIHx8IEl0ZXJhYmxlUHJvdG90eXBlWydAQGl0ZXJhdG9yJ11cbiAgICB8fCBERUZBVUxUICYmIEl0ZXJhYmxlUHJvdG90eXBlW0RFRkFVTFRdO1xuICB2YXIgZGVmYXVsdEl0ZXJhdG9yID0gIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgbmF0aXZlSXRlcmF0b3IgfHwgZ2V0SXRlcmF0aW9uTWV0aG9kKERFRkFVTFQpO1xuICB2YXIgYW55TmF0aXZlSXRlcmF0b3IgPSBOQU1FID09ICdBcnJheScgPyBJdGVyYWJsZVByb3RvdHlwZS5lbnRyaWVzIHx8IG5hdGl2ZUl0ZXJhdG9yIDogbmF0aXZlSXRlcmF0b3I7XG4gIHZhciBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIG1ldGhvZHMsIEtFWTtcblxuICAvLyBmaXggbmF0aXZlXG4gIGlmIChhbnlOYXRpdmVJdGVyYXRvcikge1xuICAgIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGFueU5hdGl2ZUl0ZXJhdG9yLmNhbGwobmV3IEl0ZXJhYmxlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIGlmICghSVNfUFVSRSAmJiBnZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUpICE9PSBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICBzZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGQVVMVCA9PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICBkZWZhdWx0SXRlcmF0b3IgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuYXRpdmVJdGVyYXRvci5jYWxsKHRoaXMpOyB9O1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYWJsZVByb3RvdHlwZSwgSVRFUkFUT1IsIGRlZmF1bHRJdGVyYXRvcik7XG4gIH1cbiAgSXRlcmF0b3JzW05BTUVdID0gZGVmYXVsdEl0ZXJhdG9yO1xuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICByZWRlZmluZShJdGVyYWJsZVByb3RvdHlwZSwgS0VZLCBtZXRob2RzW0tFWV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSAkKHsgdGFyZ2V0OiBOQU1FLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB9LCBtZXRob2RzKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5lbnRyaWVzXG4vLyBgQXJyYXkucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAaXRlcmF0b3Jcbi8vIGBDcmVhdGVBcnJheUl0ZXJhdG9yYCBpbnRlcm5hbCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZXVubWFwcGVkYXJndW1lbnRzb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsInJlcXVpcmUoJy4vZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxuZm9yICh2YXIgQ09MTEVDVElPTl9OQU1FIGluIERPTUl0ZXJhYmxlcykge1xuICB2YXIgQ29sbGVjdGlvbiA9IGdsb2JhbFtDT0xMRUNUSU9OX05BTUVdO1xuICB2YXIgQ29sbGVjdGlvblByb3RvdHlwZSA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlICYmIGNsYXNzb2YoQ29sbGVjdGlvblByb3RvdHlwZSkgIT09IFRPX1NUUklOR19UQUcpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgQ09MTEVDVElPTl9OQU1FKTtcbiAgfVxuICBJdGVyYXRvcnNbQ09MTEVDVElPTl9OQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnsgY29kZVBvaW50QXQsIGF0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgcG9zKSB7XG4gICAgdmFyIFMgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBzaXplID0gUy5sZW5ndGg7XG4gICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBzaXplKSByZXR1cm4gQ09OVkVSVF9UT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBmaXJzdCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpKSA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkZcbiAgICAgICAgPyBDT05WRVJUX1RPX1NUUklORyA/IFMuY2hhckF0KHBvc2l0aW9uKSA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkcgPyBTLnNsaWNlKHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpIDogKGZpcnN0IC0gMHhEODAwIDw8IDEwKSArIChzZWNvbmQgLSAweERDMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBTVFJJTkdfSVRFUkFUT1IgPSAnU3RyaW5nIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNUUklOR19JVEVSQVRPUik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS1AQGl0ZXJhdG9yXG5kZWZpbmVJdGVyYXRvcihTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogU1RSSU5HX0lURVJBVE9SLFxuICAgIHN0cmluZzogU3RyaW5nKGl0ZXJhdGVkKSxcbiAgICBpbmRleDogMFxuICB9KTtcbi8vIGAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lc3RyaW5naXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciBzdHJpbmcgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4O1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBzdHJpbmcubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICBzdGF0ZS5pbmRleCArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xudmFyIGlzSXRlcmFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtaXRlcmFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2lzLWl0ZXJhYmxlXCIpOyIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvck1ldGhvZCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBpdGVyYWJsZScpO1xuICB9IHJldHVybiBhbk9iamVjdChpdGVyYXRvck1ldGhvZC5jYWxsKGl0KSk7XG59O1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xudmFyIGdldEl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEl0ZXJhdG9yO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL2dldC1pdGVyYXRvclwiKTsiLCJpbXBvcnQgX1N5bWJvbCBmcm9tIFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL3N5bWJvbFwiO1xuaW1wb3J0IF9pc0l0ZXJhYmxlIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvaXMtaXRlcmFibGVcIjtcbmltcG9ydCBfZ2V0SXRlcmF0b3IgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9nZXQtaXRlcmF0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgaWYgKHR5cGVvZiBfU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICFfaXNJdGVyYWJsZShPYmplY3QoYXJyKSkpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gX2dldEl0ZXJhdG9yKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn0iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NsaWNlJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgbmF0aXZlU2xpY2UgPSBbXS5zbGljZTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zbGljZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zbGljZVxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGsgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICAvLyBpbmxpbmUgYEFycmF5U3BlY2llc0NyZWF0ZWAgZm9yIHVzYWdlIG5hdGl2ZSBgQXJyYXkjc2xpY2VgIHdoZXJlIGl0J3MgcG9zc2libGVcbiAgICB2YXIgQ29uc3RydWN0b3IsIHJlc3VsdCwgbjtcbiAgICBpZiAoaXNBcnJheShPKSkge1xuICAgICAgQ29uc3RydWN0b3IgPSBPLmNvbnN0cnVjdG9yO1xuICAgICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICAgIGlmICh0eXBlb2YgQ29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IGlzQXJyYXkoQ29uc3RydWN0b3IucHJvdG90eXBlKSkpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KENvbnN0cnVjdG9yKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yW1NQRUNJRVNdO1xuICAgICAgICBpZiAoQ29uc3RydWN0b3IgPT09IG51bGwpIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTbGljZS5jYWxsKE8sIGssIGZpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IG5ldyAoQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQ29uc3RydWN0b3IpKG1heChmaW4gLSBrLCAwKSk7XG4gICAgZm9yIChuID0gMDsgayA8IGZpbjsgaysrLCBuKyspIGlmIChrIGluIE8pIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgbiwgT1trXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTlNUUlVDVE9SKSB7XG4gIHJldHVybiBwYXRoW0NPTlNUUlVDVE9SICsgJ1Byb3RvdHlwZSddO1xufTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuc2xpY2UnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5zbGljZTtcbiIsInZhciBzbGljZSA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvc2xpY2UnKTtcblxudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgb3duID0gaXQuc2xpY2U7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5zbGljZSkgPyBzbGljZSA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2Uvc2xpY2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvaW5zdGFuY2Uvc2xpY2VcIik7IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvcikge1xuICB2YXIgcmV0dXJuTWV0aG9kID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICBpZiAocmV0dXJuTWV0aG9kICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYW5PYmplY3QocmV0dXJuTWV0aG9kLmNhbGwoaXRlcmF0b3IpKS52YWx1ZTtcbiAgfVxufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpdGVyYXRvckNsb3NlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlJyk7XG5cbi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIEVOVFJJRVMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gRU5UUklFUyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvdHlwZVtJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5mcm9tXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICB2YXIgQyA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgbWFwZm4gPSBhcmd1bWVudHNMZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKE8pO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yLCBuZXh0LCB2YWx1ZTtcbiAgaWYgKG1hcHBpbmcpIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzTGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gIC8vIGlmIHRoZSB0YXJnZXQgaXMgbm90IGl0ZXJhYmxlIG9yIGl0J3MgYW4gYXJyYXkgd2l0aCB0aGUgZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBhIHNpbXBsZSBjYXNlXG4gIGlmIChpdGVyYXRvck1ldGhvZCAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyYXRvck1ldGhvZCkpKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKE8pO1xuICAgIG5leHQgPSBpdGVyYXRvci5uZXh0O1xuICAgIHJlc3VsdCA9IG5ldyBDKCk7XG4gICAgZm9yICg7IShzdGVwID0gbmV4dC5jYWxsKGl0ZXJhdG9yKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgdmFsdWUgPSBtYXBwaW5nID8gY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyhpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgY2FsbGVkID0gMDtcbiAgdmFyIGl0ZXJhdG9yV2l0aFJldHVybiA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBkb25lOiAhIWNhbGxlZCsrIH07XG4gICAgfSxcbiAgICAncmV0dXJuJzogZnVuY3Rpb24gKCkge1xuICAgICAgU0FGRV9DTE9TSU5HID0gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIGl0ZXJhdG9yV2l0aFJldHVybltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIEFycmF5LmZyb20oaXRlcmF0b3JXaXRoUmV0dXJuLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBTS0lQX0NMT1NJTkcpIHtcbiAgaWYgKCFTS0lQX0NMT1NJTkcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgSVRFUkFUSU9OX1NVUFBPUlQgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgb2JqZWN0W0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4geyBkb25lOiBJVEVSQVRJT05fU1VQUE9SVCA9IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIGV4ZWMob2JqZWN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gSVRFUkFUSU9OX1NVUFBPUlQ7XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZnJvbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mcm9tJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xuXG52YXIgSU5DT1JSRUNUX0lURVJBVElPTiA9ICFjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24oZnVuY3Rpb24gKGl0ZXJhYmxlKSB7XG4gIEFycmF5LmZyb20oaXRlcmFibGUpO1xufSk7XG5cbi8vIGBBcnJheS5mcm9tYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJTkNPUlJFQ1RfSVRFUkFUSU9OIH0sIHtcbiAgZnJvbTogZnJvbVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5mcm9tJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4uLy4uL2ludGVybmFscy9wYXRoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aC5BcnJheS5mcm9tO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2FycmF5L2Zyb20nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvZnJvbVwiKTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiaW1wb3J0IF9zbGljZUluc3RhbmNlUHJvcGVydHkgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9pbnN0YW5jZS9zbGljZVwiO1xuaW1wb3J0IF9BcnJheSRmcm9tIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvYXJyYXkvZnJvbVwiO1xuaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICB2YXIgX2NvbnRleHQ7XG5cbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcblxuICB2YXIgbiA9IF9zbGljZUluc3RhbmNlUHJvcGVydHkoX2NvbnRleHQgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykpLmNhbGwoX2NvbnRleHQsIDgsIC0xKTtcblxuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gX0FycmF5JGZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIG9iamVjdERlZmluZVByb3BlcnR5TW9kaWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUsIGZvcmNlZDogIURFU0NSSVBUT1JTLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBkZWZpbmVQcm9wZXJ0eTogb2JqZWN0RGVmaW5lUHJvcGVydHlNb2RpbGUuZlxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxudmFyIE9iamVjdCA9IHBhdGguT2JqZWN0O1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cbmlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkuc2hhbSkgZGVmaW5lUHJvcGVydHkuc2hhbSA9IHRydWU7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpOyIsImltcG9ydCBfT2JqZWN0JGRlZmluZVByb3BlcnR5IGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblxuICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBjcmVhdGU6IGNyZWF0ZVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC5jcmVhdGUnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxudmFyIE9iamVjdCA9IHBhdGguT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKSB7XG4gIHJldHVybiBPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9jcmVhdGVcIik7IiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUgfSwge1xuICBzZXRQcm90b3R5cGVPZjogc2V0UHJvdG90eXBlT2Zcbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpOyIsImltcG9ydCBfT2JqZWN0JHNldFByb3RvdHlwZU9mIGZyb20gXCJAYmFiZWwvcnVudGltZS1jb3JlanMzL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIF9zZXRQcm90b3R5cGVPZiA9IF9PYmplY3Qkc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn0iLCJpbXBvcnQgX09iamVjdCRjcmVhdGUgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9vYmplY3QvY3JlYXRlXCI7XG5pbXBvcnQgc2V0UHJvdG90eXBlT2YgZnJvbSBcIi4vc2V0UHJvdG90eXBlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gX09iamVjdCRjcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5zeW1ib2wuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnZhciBXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLXdyYXBwZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlLmYoJ2l0ZXJhdG9yJyk7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvc3ltYm9sL2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL2ZlYXR1cmVzL3N5bWJvbC9pdGVyYXRvclwiKTsiLCJpbXBvcnQgX1N5bWJvbCBmcm9tIFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL3N5bWJvbFwiO1xuaW1wb3J0IF9TeW1ib2wkaXRlcmF0b3IgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIF9TeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX1N5bWJvbCRpdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIF9TeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9TeW1ib2wgJiYgb2JqICE9PSBfU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIkBiYWJlbC9ydW50aW1lLWNvcmVqczMvaGVscGVycy90eXBlb2ZcIjtcbmltcG9ydCBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgZnJvbSBcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufSIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgbmF0aXZlR2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBuYXRpdmVHZXRQcm90b3R5cGVPZigxKTsgfSk7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2ZcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IEZBSUxTX09OX1BSSU1JVElWRVMsIHNoYW06ICFDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgfSwge1xuICBnZXRQcm90b3R5cGVPZjogZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpIHtcbiAgICByZXR1cm4gbmF0aXZlR2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfVxufSk7XG5cbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKTsiLCJpbXBvcnQgX09iamVjdCRzZXRQcm90b3R5cGVPZiBmcm9tIFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCI7XG5pbXBvcnQgX09iamVjdCRnZXRQcm90b3R5cGVPZiBmcm9tIFwiQGJhYmVsL3J1bnRpbWUtY29yZWpzMy9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBfZ2V0UHJvdG90eXBlT2YgPSBfT2JqZWN0JHNldFByb3RvdHlwZU9mID8gX09iamVjdCRnZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IF9PYmplY3QkZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59IiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvKiBnbG9iYWwgZ2xvYmFsVGhpcyAtLSBzYWZlICovXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6IG5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyIHNwbGl0ID0gJycuc3BsaXQ7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwiLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIFBSRUZFUlJFRF9TVFJJTkcpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGlucHV0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFQUkVGRVJSRURfU1RSSU5HICYmIHR5cGVvZiAoZm4gPSBpbnB1dC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxudmFyIG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlRGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGdsb2JhbCwga2V5LCB2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24udG9TdHJpbmc7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAodHlwZW9mIHN0b3JlLmluc3BlY3RTb3VyY2UgIT0gJ2Z1bmN0aW9uJykge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcuY2FsbChpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjkuMScsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAyMSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBvYmplY3RIYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciB1bnNhZmUgPSBvcHRpb25zID8gISFvcHRpb25zLnVuc2FmZSA6IGZhbHNlO1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5lbnVtZXJhYmxlIDogZmFsc2U7XG4gIHZhciBub1RhcmdldEdldCA9IG9wdGlvbnMgPyAhIW9wdGlvbnMubm9UYXJnZXRHZXQgOiBmYWxzZTtcbiAgdmFyIHN0YXRlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICB9XG4gICAgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gICAgaWYgKCFzdGF0ZS5zb3VyY2UpIHtcbiAgICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/IGtleSA6ICcnKTtcbiAgICB9XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5ub1RhcmdldEdldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgc2V0R2xvYmFsKFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMubm9UYXJnZXRHZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE1FVEhPRF9OQU1FLCBhcmd1bWVudCkge1xuICB2YXIgbWV0aG9kID0gW11bTUVUSE9EX05BTUVdO1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGwsbm8tdGhyb3ctbGl0ZXJhbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgMTsgfSwgMSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUpvaW4gPSBbXS5qb2luO1xuXG52YXIgRVMzX1NUUklOR1MgPSBJbmRleGVkT2JqZWN0ICE9IE9iamVjdDtcbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnam9pbicsICcsJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuam9pbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5qb2luXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBFUzNfU1RSSU5HUyB8fCAhU1RSSUNUX01FVEhPRCB9LCB7XG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUpvaW4uY2FsbCh0b0luZGV4ZWRPYmplY3QodGhpcyksIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkID8gJywnIDogc2VwYXJhdG9yKTtcbiAgfVxufSk7XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyIHF1b3QgPSAvXCIvZztcblxuLy8gQi4yLjMuMi4xIENyZWF0ZUhUTUwoc3RyaW5nLCB0YWcsIGF0dHJpYnV0ZSwgdmFsdWUpXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZWh0bWxcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cmluZywgdGFnLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoc3RyaW5nKSk7XG4gIHZhciBwMSA9ICc8JyArIHRhZztcbiAgaWYgKGF0dHJpYnV0ZSAhPT0gJycpIHAxICs9ICcgJyArIGF0dHJpYnV0ZSArICc9XCInICsgU3RyaW5nKHZhbHVlKS5yZXBsYWNlKHF1b3QsICcmcXVvdDsnKSArICdcIic7XG4gIHJldHVybiBwMSArICc+JyArIFMgKyAnPC8nICsgdGFnICsgJz4nO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBjaGVjayB0aGUgZXhpc3RlbmNlIG9mIGEgbWV0aG9kLCBsb3dlcmNhc2Vcbi8vIG9mIGEgdGFnIGFuZCBlc2NhcGluZyBxdW90ZXMgaW4gYXJndW1lbnRzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICByZXR1cm4gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ZXN0ID0gJydbTUVUSE9EX05BTUVdKCdcIicpO1xuICAgIHJldHVybiB0ZXN0ICE9PSB0ZXN0LnRvTG93ZXJDYXNlKCkgfHwgdGVzdC5zcGxpdCgnXCInKS5sZW5ndGggPiAzO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjcmVhdGVIVE1MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1odG1sJyk7XG52YXIgZm9yY2VkU3RyaW5nSFRNTE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctaHRtbC1mb3JjZWQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUubGlua2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUubGlua1xuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IGZvcmNlZFN0cmluZ0hUTUxNZXRob2QoJ2xpbmsnKSB9LCB7XG4gIGxpbms6IGZ1bmN0aW9uIGxpbmsodXJsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUhUTUwodGhpcywgJ2EnLCAnaHJlZicsIHVybCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL2ZhaWxzJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSB0cmFuc3BpbGVzIFJlZ0V4cCgnYScsICd5JykgLT4gL2EveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yLFxuLy8gc28gd2UgdXNlIGFuIGludGVybWVkaWF0ZSBmdW5jdGlvbi5cbmZ1bmN0aW9uIFJFKHMsIGYpIHtcbiAgcmV0dXJuIFJlZ0V4cChzLCBmKTtcbn1cblxuZXhwb3J0cy5VTlNVUFBPUlRFRF9ZID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxuICB2YXIgcmUgPSBSRSgnYScsICd5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdhYmNkJykgIT0gbnVsbDtcbn0pO1xuXG5leHBvcnRzLkJST0tFTl9DQVJFVCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzczNjg3XG4gIHZhciByZSA9IFJFKCdecicsICdneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnc3RyJykgIT0gbnVsbDtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZ2V4cEZsYWdzID0gcmVxdWlyZSgnLi9yZWdleHAtZmxhZ3MnKTtcbnZhciBzdGlja3lIZWxwZXJzID0gcmVxdWlyZSgnLi9yZWdleHAtc3RpY2t5LWhlbHBlcnMnKTtcblxudmFyIG5hdGl2ZUV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG4vLyBUaGlzIGFsd2F5cyByZWZlcnMgdG8gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgYmVjYXVzZSB0aGVcbi8vIFN0cmluZyNyZXBsYWNlIHBvbHlmaWxsIHVzZXMgLi9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzLFxuLy8gd2hpY2ggbG9hZHMgdGhpcyBmaWxlIGJlZm9yZSBwYXRjaGluZyB0aGUgbWV0aG9kLlxudmFyIG5hdGl2ZVJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG5cbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvO1xuICB2YXIgcmUyID0gL2IqL2c7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTEsICdhJyk7XG4gIG5hdGl2ZUV4ZWMuY2FsbChyZTIsICdhJyk7XG4gIHJldHVybiByZTEubGFzdEluZGV4ICE9PSAwIHx8IHJlMi5sYXN0SW5kZXggIT09IDA7XG59KSgpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWSB8fCBzdGlja3lIZWxwZXJzLkJST0tFTl9DQVJFVDtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1hc3NlcnRpb24tY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEIHx8IFVOU1VQUE9SVEVEX1k7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4LCByZUNvcHksIG1hdGNoLCBpO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSByZWdleHBGbGFncy5jYWxsKHJlKTtcbiAgICB2YXIgc291cmNlID0gcmUuc291cmNlO1xuICAgIHZhciBjaGFyc0FkZGVkID0gMDtcbiAgICB2YXIgc3RyQ29weSA9IHN0cjtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgneScsICcnKTtcbiAgICAgIGlmIChmbGFncy5pbmRleE9mKCdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IFN0cmluZyhzdHIpLnNsaWNlKHJlLmxhc3RJbmRleCk7XG4gICAgICAvLyBTdXBwb3J0IGFuY2hvcmVkIHN0aWNreSBiZWhhdmlvci5cbiAgICAgIGlmIChyZS5sYXN0SW5kZXggPiAwICYmICghcmUubXVsdGlsaW5lIHx8IHJlLm11bHRpbGluZSAmJiBzdHJbcmUubGFzdEluZGV4IC0gMV0gIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBtYXRjaC5pbnB1dC5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5leGVjYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS5leGVjXG4kKHsgdGFyZ2V0OiAnUmVnRXhwJywgcHJvdG86IHRydWUsIGZvcmNlZDogLy4vLmV4ZWMgIT09IGV4ZWMgfSwge1xuICBleGVjOiBleGVjXG59KTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzb2YoZ2xvYmFsLnByb2Nlc3MpID09ICdwcm9jZXNzJztcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnM7XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgdmVyc2lvbiA9IG1hdGNoWzBdICsgbWF0Y2hbMV07XG59IGVsc2UgaWYgKHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9IG1hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbiAmJiArdmVyc2lvbjtcbiIsInZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbiAgcmV0dXJuICFTeW1ib2wuc2hhbSAmJlxuICAgIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAoSVNfTk9ERSA/IFY4X1ZFUlNJT04gPT09IDM4IDogVjhfVkVSU0lPTiA+IDM3ICYmIFY4X1ZFUlNJT04gPCA0MSk7XG59KTtcbiIsInZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gIC8qIGdsb2JhbCBTeW1ib2wgLS0gc2FmZSAqL1xuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSB8fCAhKE5BVElWRV9TWU1CT0wgfHwgdHlwZW9mIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9PSAnc3RyaW5nJykpIHtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXMoU3ltYm9sLCBuYW1lKSkge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gICAgfVxuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBtb3ZlZCB0byBlbnRyeSBwb2ludHNcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxudmFyIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gI3JlcGxhY2UgbmVlZHMgYnVpbHQtaW4gc3VwcG9ydCBmb3IgbmFtZWQgZ3JvdXBzLlxuICAvLyAjbWF0Y2ggd29ya3MgZmluZSBiZWNhdXNlIGl0IGp1c3QgcmV0dXJuIHRoZSBleGVjIHJlc3VsdHMsIGV2ZW4gaWYgaXQgaGFzXG4gIC8vIGEgXCJncm9wc1wiIHByb3BlcnR5LlxuICB2YXIgcmUgPSAvLi87XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHJlc3VsdC5ncm91cHMgPSB7IGE6ICc3JyB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHJldHVybiAnJy5yZXBsYWNlKHJlLCAnJDxhPicpICE9PSAnNyc7XG59KTtcblxuLy8gSUUgPD0gMTEgcmVwbGFjZXMgJDAgd2l0aCB0aGUgd2hvbGUgbWF0Y2gsIGFzIGlmIGl0IHdhcyAkJlxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjAyNDY2Ni9nZXR0aW5nLWllLXRvLXJlcGxhY2UtYS1yZWdleC13aXRoLXRoZS1saXRlcmFsLXN0cmluZy0wXG52YXIgUkVQTEFDRV9LRUVQU18kMCA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnYScucmVwbGFjZSgvLi8sICckMCcpID09PSAnJDAnO1xufSkoKTtcblxudmFyIFJFUExBQ0UgPSB3ZWxsS25vd25TeW1ib2woJ3JlcGxhY2UnKTtcbi8vIFNhZmFyaSA8PSAxMy4wLjMoPykgc3Vic3RpdHV0ZXMgbnRoIGNhcHR1cmUgd2hlcmUgbj5tIHdpdGggYW4gZW1wdHkgc3RyaW5nXG52YXIgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPSAoZnVuY3Rpb24gKCkge1xuICBpZiAoLy4vW1JFUExBQ0VdKSB7XG4gICAgcmV0dXJuIC8uL1tSRVBMQUNFXSgnYScsICckMCcpID09PSAnJztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG4vLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbi8vIFdlZXggSlMgaGFzIGZyb3plbiBidWlsdC1pbiBwcm90b3R5cGVzLCBzbyB1c2UgdHJ5IC8gY2F0Y2ggd3JhcHBlclxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgdmFyIHJlID0gLyg/OikvO1xuICB2YXIgb3JpZ2luYWxFeGVjID0gcmUuZXhlYztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9yaWdpbmFsRXhlYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICB2YXIgcmVzdWx0ID0gJ2FiJy5zcGxpdChyZSk7XG4gIHJldHVybiByZXN1bHQubGVuZ3RoICE9PSAyIHx8IHJlc3VsdFswXSAhPT0gJ2EnIHx8IHJlc3VsdFsxXSAhPT0gJ2InO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjLCBzaGFtKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcblxuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFdlIGNhbid0IHVzZSByZWFsIHJlZ2V4IGhlcmUgc2luY2UgaXQgY2F1c2VzIGRlb3B0aW1pemF0aW9uXG4gICAgICAvLyBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbiBpbiBWOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMwNlxuICAgICAgcmUgPSB7fTtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICAgIHJlLmZsYWdzID0gJyc7XG4gICAgICByZVtTWU1CT0xdID0gLy4vW1NZTUJPTF07XG4gICAgfVxuXG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHsgZXhlY0NhbGxlZCA9IHRydWU7IHJldHVybiBudWxsOyB9O1xuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICAoS0VZID09PSAncmVwbGFjZScgJiYgIShcbiAgICAgIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTICYmXG4gICAgICBSRVBMQUNFX0tFRVBTXyQwICYmXG4gICAgICAhUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICApKSB8fFxuICAgIChLRVkgPT09ICdzcGxpdCcgJiYgIVNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQylcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgaWYgKHJlZ2V4cC5leGVjID09PSByZWdleHBFeGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVSZWdFeHBNZXRob2QuY2FsbChyZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogbmF0aXZlTWV0aG9kLmNhbGwoc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0sIHtcbiAgICAgIFJFUExBQ0VfS0VFUFNfJDA6IFJFUExBQ0VfS0VFUFNfJDAsXG4gICAgICBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRTogUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkVcbiAgICB9KTtcbiAgICB2YXIgc3RyaW5nTWV0aG9kID0gbWV0aG9kc1swXTtcbiAgICB2YXIgcmVnZXhNZXRob2QgPSBtZXRob2RzWzFdO1xuXG4gICAgcmVkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBzdHJpbmdNZXRob2QpO1xuICAgIHJlZGVmaW5lKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uIChzdHJpbmcsIGFyZykgeyByZXR1cm4gcmVnZXhNZXRob2QuY2FsbChzdHJpbmcsIHRoaXMsIGFyZyk7IH1cbiAgICAgIC8vIDIxLjIuNS42IFJlZ0V4cC5wcm90b3R5cGVbQEBtYXRjaF0oc3RyaW5nKVxuICAgICAgLy8gMjEuMi41LjkgUmVnRXhwLnByb3RvdHlwZVtAQHNlYXJjaF0oc3RyaW5nKVxuICAgICAgOiBmdW5jdGlvbiAoc3RyaW5nKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG5cbiAgaWYgKHNoYW0pIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShSZWdFeHAucHJvdG90eXBlW1NZTUJPTF0sICdzaGFtJywgdHJ1ZSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc3JlZ2V4cFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY2xhc3NvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYFNwZWNpZXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNwZWNpZXNjb25zdHJ1Y3RvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgZGVmYXVsdENvbnN0cnVjdG9yKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IGRlZmF1bHRDb25zdHJ1Y3RvciA6IGFGdW5jdGlvbihTKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IGNvZGVQb2ludEF0LCBhdCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HID8gUy5zbGljZShwb3NpdGlvbiwgcG9zaXRpb24gKyAyKSA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuY29kZXBvaW50YXRcbiAgY29kZUF0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5hdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbiAgY2hhckF0OiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gY2hhckF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vY2xhc3NvZi1yYXcnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwRXhlY2AgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmICh0eXBlb2YgZXhlYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciByZXN1bHQgPSBleGVjLmNhbGwoUiwgUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZ0V4cCBleGVjIG1ldGhvZCByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKGNsYXNzb2YoUikgIT09ICdSZWdFeHAnKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG4gIH1cblxuICByZXR1cm4gcmVnZXhwRXhlYy5jYWxsKFIsIFMpO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgY2FsbFJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIGFycmF5UHVzaCA9IFtdLnB1c2g7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgTUFYX1VJTlQzMiA9IDB4RkZGRkZGRkY7XG5cbi8vIGJhYmVsLW1pbmlmeSB0cmFuc3BpbGVzIFJlZ0V4cCgneCcsICd5JykgLT4gL3gveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgU1VQUE9SVFNfWSA9ICFmYWlscyhmdW5jdGlvbiAoKSB7IHJldHVybiAhUmVnRXhwKE1BWF9VSU5UMzIsICd5Jyk7IH0pO1xuXG4vLyBAQHNwbGl0IGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygnc3BsaXQnLCAyLCBmdW5jdGlvbiAoU1BMSVQsIG5hdGl2ZVNwbGl0LCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgdmFyIGludGVybmFsU3BsaXQ7XG4gIGlmIChcbiAgICAnYWJiYycuc3BsaXQoLyhiKSovKVsxXSA9PSAnYycgfHxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLWVtcHR5LWdyb3VwIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgJ3Rlc3QnLnNwbGl0KC8oPzopLywgLTEpLmxlbmd0aCAhPSA0IHx8XG4gICAgJ2FiJy5zcGxpdCgvKD86YWIpKi8pLmxlbmd0aCAhPSAyIHx8XG4gICAgJy4nLnNwbGl0KC8oLj8pKC4/KS8pLmxlbmd0aCAhPSA0IHx8XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1hc3NlcnRpb24tY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgICAnLicuc3BsaXQoLygpKCkvKS5sZW5ndGggPiAxIHx8XG4gICAgJycuc3BsaXQoLy4/LykubGVuZ3RoXG4gICkge1xuICAgIC8vIGJhc2VkIG9uIGVzNS1zaGltIGltcGxlbWVudGF0aW9uLCBuZWVkIHRvIHJld29yayBpdFxuICAgIGludGVybmFsU3BsaXQgPSBmdW5jdGlvbiAoc2VwYXJhdG9yLCBsaW1pdCkge1xuICAgICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcbiAgICAgIHZhciBsaW0gPSBsaW1pdCA9PT0gdW5kZWZpbmVkID8gTUFYX1VJTlQzMiA6IGxpbWl0ID4+PiAwO1xuICAgICAgaWYgKGxpbSA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgaWYgKHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW3N0cmluZ107XG4gICAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIG5hdGl2ZSBzcGxpdFxuICAgICAgaWYgKCFpc1JlZ0V4cChzZXBhcmF0b3IpKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTcGxpdC5jYWxsKHN0cmluZywgc2VwYXJhdG9yLCBsaW0pO1xuICAgICAgfVxuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgdmFyIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChzZXBhcmF0b3IudW5pY29kZSA/ICd1JyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAoc2VwYXJhdG9yLnN0aWNreSA/ICd5JyA6ICcnKTtcbiAgICAgIHZhciBsYXN0TGFzdEluZGV4ID0gMDtcbiAgICAgIC8vIE1ha2UgYGdsb2JhbGAgYW5kIGF2b2lkIGBsYXN0SW5kZXhgIGlzc3VlcyBieSB3b3JraW5nIHdpdGggYSBjb3B5XG4gICAgICB2YXIgc2VwYXJhdG9yQ29weSA9IG5ldyBSZWdFeHAoc2VwYXJhdG9yLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuICAgICAgdmFyIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgICB3aGlsZSAobWF0Y2ggPSByZWdleHBFeGVjLmNhbGwoc2VwYXJhdG9yQ29weSwgc3RyaW5nKSkge1xuICAgICAgICBsYXN0SW5kZXggPSBzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleDtcbiAgICAgICAgaWYgKGxhc3RJbmRleCA+IGxhc3RMYXN0SW5kZXgpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJpbmcuc2xpY2UobGFzdExhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaC5pbmRleCA8IHN0cmluZy5sZW5ndGgpIGFycmF5UHVzaC5hcHBseShvdXRwdXQsIG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgICBsYXN0TGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgaWYgKG91dHB1dC5sZW5ndGggPj0gbGltKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VwYXJhdG9yQ29weS5sYXN0SW5kZXggPT09IG1hdGNoLmluZGV4KSBzZXBhcmF0b3JDb3B5Lmxhc3RJbmRleCsrOyAvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wXG4gICAgICB9XG4gICAgICBpZiAobGFzdExhc3RJbmRleCA9PT0gc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICBpZiAobGFzdExlbmd0aCB8fCAhc2VwYXJhdG9yQ29weS50ZXN0KCcnKSkgb3V0cHV0LnB1c2goJycpO1xuICAgICAgfSBlbHNlIG91dHB1dC5wdXNoKHN0cmluZy5zbGljZShsYXN0TGFzdEluZGV4KSk7XG4gICAgICByZXR1cm4gb3V0cHV0Lmxlbmd0aCA+IGxpbSA/IG91dHB1dC5zbGljZSgwLCBsaW0pIDogb3V0cHV0O1xuICAgIH07XG4gIC8vIENoYWtyYSwgVjhcbiAgfSBlbHNlIGlmICgnMCcuc3BsaXQodW5kZWZpbmVkLCAwKS5sZW5ndGgpIHtcbiAgICBpbnRlcm5hbFNwbGl0ID0gZnVuY3Rpb24gKHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHJldHVybiBzZXBhcmF0b3IgPT09IHVuZGVmaW5lZCAmJiBsaW1pdCA9PT0gMCA/IFtdIDogbmF0aXZlU3BsaXQuY2FsbCh0aGlzLCBzZXBhcmF0b3IsIGxpbWl0KTtcbiAgICB9O1xuICB9IGVsc2UgaW50ZXJuYWxTcGxpdCA9IG5hdGl2ZVNwbGl0O1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUuc3BsaXRgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5zcGxpdFxuICAgIGZ1bmN0aW9uIHNwbGl0KHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciBzcGxpdHRlciA9IHNlcGFyYXRvciA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZXBhcmF0b3JbU1BMSVRdO1xuICAgICAgcmV0dXJuIHNwbGl0dGVyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBzcGxpdHRlci5jYWxsKHNlcGFyYXRvciwgTywgbGltaXQpXG4gICAgICAgIDogaW50ZXJuYWxTcGxpdC5jYWxsKFN0cmluZyhPKSwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHNwbGl0XWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAc3BsaXRcbiAgICAvL1xuICAgIC8vIE5PVEU6IFRoaXMgY2Fubm90IGJlIHByb3Blcmx5IHBvbHlmaWxsZWQgaW4gZW5naW5lcyB0aGF0IGRvbid0IHN1cHBvcnRcbiAgICAvLyB0aGUgJ3knIGZsYWcuXG4gICAgZnVuY3Rpb24gKHJlZ2V4cCwgbGltaXQpIHtcbiAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUoaW50ZXJuYWxTcGxpdCwgcmVnZXhwLCB0aGlzLCBsaW1pdCwgaW50ZXJuYWxTcGxpdCAhPT0gbmF0aXZlU3BsaXQpO1xuICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuXG4gICAgICB2YXIgcnggPSBhbk9iamVjdChyZWdleHApO1xuICAgICAgdmFyIFMgPSBTdHJpbmcodGhpcyk7XG4gICAgICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3RvcihyeCwgUmVnRXhwKTtcblxuICAgICAgdmFyIHVuaWNvZGVNYXRjaGluZyA9IHJ4LnVuaWNvZGU7XG4gICAgICB2YXIgZmxhZ3MgPSAocnguaWdub3JlQ2FzZSA/ICdpJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocngubXVsdGlsaW5lID8gJ20nIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyeC51bmljb2RlID8gJ3UnIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChTVVBQT1JUU19ZID8gJ3knIDogJ2cnKTtcblxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIFMgc2xpY2luZywgdG9cbiAgICAgIC8vIHNpbXVsYXRlIHRoZSAneScgZmxhZy5cbiAgICAgIHZhciBzcGxpdHRlciA9IG5ldyBDKFNVUFBPUlRTX1kgPyByeCA6ICdeKD86JyArIHJ4LnNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgICAgdmFyIGxpbSA9IGxpbWl0ID09PSB1bmRlZmluZWQgPyBNQVhfVUlOVDMyIDogbGltaXQgPj4+IDA7XG4gICAgICBpZiAobGltID09PSAwKSByZXR1cm4gW107XG4gICAgICBpZiAoUy5sZW5ndGggPT09IDApIHJldHVybiBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgUykgPT09IG51bGwgPyBbU10gOiBbXTtcbiAgICAgIHZhciBwID0gMDtcbiAgICAgIHZhciBxID0gMDtcbiAgICAgIHZhciBBID0gW107XG4gICAgICB3aGlsZSAocSA8IFMubGVuZ3RoKSB7XG4gICAgICAgIHNwbGl0dGVyLmxhc3RJbmRleCA9IFNVUFBPUlRTX1kgPyBxIDogMDtcbiAgICAgICAgdmFyIHogPSBjYWxsUmVnRXhwRXhlYyhzcGxpdHRlciwgU1VQUE9SVFNfWSA/IFMgOiBTLnNsaWNlKHEpKTtcbiAgICAgICAgdmFyIGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB6ID09PSBudWxsIHx8XG4gICAgICAgICAgKGUgPSBtaW4odG9MZW5ndGgoc3BsaXR0ZXIubGFzdEluZGV4ICsgKFNVUFBPUlRTX1kgPyAwIDogcSkpLCBTLmxlbmd0aCkpID09PSBwXG4gICAgICAgICkge1xuICAgICAgICAgIHEgPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgcSwgdW5pY29kZU1hdGNoaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBLnB1c2goUy5zbGljZShwLCBxKSk7XG4gICAgICAgICAgaWYgKEEubGVuZ3RoID09PSBsaW0pIHJldHVybiBBO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHoubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBBLnB1c2goeltpXSk7XG4gICAgICAgICAgICBpZiAoQS5sZW5ndGggPT09IGxpbSkgcmV0dXJuIEE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHEgPSBwID0gZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgQS5wdXNoKFMuc2xpY2UocCkpO1xuICAgICAgcmV0dXJuIEE7XG4gICAgfVxuICBdO1xufSwgIVNVUFBPUlRTX1kpO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nID0gRnVuY3Rpb25Qcm90b3R5cGUudG9TdHJpbmc7XG52YXIgbmFtZVJFID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvO1xudmFyIE5BTUUgPSAnbmFtZSc7XG5cbi8vIEZ1bmN0aW9uIGluc3RhbmNlcyBgLm5hbWVgIHByb3BlcnR5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWZ1bmN0aW9uLWluc3RhbmNlcy1uYW1lXG5pZiAoREVTQ1JJUFRPUlMgJiYgIShOQU1FIGluIEZ1bmN0aW9uUHJvdG90eXBlKSkge1xuICBkZWZpbmVQcm9wZXJ0eShGdW5jdGlvblByb3RvdHlwZSwgTkFNRSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBGdW5jdGlvblByb3RvdHlwZVRvU3RyaW5nLmNhbGwodGhpcykubWF0Y2gobmFtZVJFKVsxXTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgcmVwbGFjZSA9ICcnLnJlcGxhY2U7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFMgPSAvXFwkKFskJidgXXxcXGR7MSwyfXw8W14+XSo+KS9nO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEID0gL1xcJChbJCYnYF18XFxkezEsMn0pL2c7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0c3Vic3RpdHV0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRjaGVkLCBzdHIsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgdmFyIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRDtcbiAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFM7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2UuY2FsbChyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgIHZhciBjYXB0dXJlO1xuICAgIHN3aXRjaCAoY2guY2hhckF0KDApKSB7XG4gICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgIGNhc2UgJyYnOiByZXR1cm4gbWF0Y2hlZDtcbiAgICAgIGNhc2UgJ2AnOiByZXR1cm4gc3RyLnNsaWNlKDAsIHBvc2l0aW9uKTtcbiAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHIuc2xpY2UodGFpbFBvcyk7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FwdHVyZSA9IG5hbWVkQ2FwdHVyZXNbY2guc2xpY2UoMSwgLTEpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBcXGRcXGQ/XG4gICAgICAgIHZhciBuID0gK2NoO1xuICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICB2YXIgZiA9IGZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICBpZiAoZiA8PSBtKSByZXR1cm4gY2FwdHVyZXNbZiAtIDFdID09PSB1bmRlZmluZWQgPyBjaC5jaGFyQXQoMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaC5jaGFyQXQoMSk7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tuIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIGdldFN1YnN0aXR1dGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uJyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbnZhciBtYXliZVRvU3RyaW5nID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gaXQgOiBTdHJpbmcoaXQpO1xufTtcblxuLy8gQEByZXBsYWNlIGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygncmVwbGFjZScsIDIsIGZ1bmN0aW9uIChSRVBMQUNFLCBuYXRpdmVSZXBsYWNlLCBtYXliZUNhbGxOYXRpdmUsIHJlYXNvbikge1xuICB2YXIgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPSByZWFzb24uUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkU7XG4gIHZhciBSRVBMQUNFX0tFRVBTXyQwID0gcmVhc29uLlJFUExBQ0VfS0VFUFNfJDA7XG4gIHZhciBVTlNBRkVfU1VCU1RJVFVURSA9IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID8gJyQnIDogJyQwJztcblxuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBzZWFyY2hWYWx1ZSA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBzZWFyY2hWYWx1ZVtSRVBMQUNFXTtcbiAgICAgIHJldHVybiByZXBsYWNlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gcmVwbGFjZXIuY2FsbChzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgICA6IG5hdGl2ZVJlcGxhY2UuY2FsbChTdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAcmVwbGFjZVxuICAgIGZ1bmN0aW9uIChyZWdleHAsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgaWYgKFxuICAgICAgICAoIVJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFICYmIFJFUExBQ0VfS0VFUFNfJDApIHx8XG4gICAgICAgICh0eXBlb2YgcmVwbGFjZVZhbHVlID09PSAnc3RyaW5nJyAmJiByZXBsYWNlVmFsdWUuaW5kZXhPZihVTlNBRkVfU1VCU1RJVFVURSkgPT09IC0xKVxuICAgICAgKSB7XG4gICAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlUmVwbGFjZSwgcmVnZXhwLCB0aGlzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcblxuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gdHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IFN0cmluZyhyZXBsYWNlVmFsdWUpO1xuXG4gICAgICB2YXIgZ2xvYmFsID0gcnguZ2xvYmFsO1xuICAgICAgaWYgKGdsb2JhbCkge1xuICAgICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgICByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgYnJlYWs7XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIGlmICghZ2xvYmFsKSBicmVhaztcblxuICAgICAgICB2YXIgbWF0Y2hTdHIgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjY3VtdWxhdGVkUmVzdWx0ID0gJyc7XG4gICAgICB2YXIgbmV4dFNvdXJjZVBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG1heChtaW4odG9JbnRlZ2VyKHJlc3VsdC5pbmRleCksIFMubGVuZ3RoKSwgMCk7XG4gICAgICAgIHZhciBjYXB0dXJlcyA9IFtdO1xuICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGVxdWl2YWxlbnQgdG9cbiAgICAgICAgLy8gICBjYXB0dXJlcyA9IHJlc3VsdC5zbGljZSgxKS5tYXAobWF5YmVUb1N0cmluZylcbiAgICAgICAgLy8gYnV0IGZvciBzb21lIHJlYXNvbiBgbmF0aXZlU2xpY2UuY2FsbChyZXN1bHQsIDEsIHJlc3VsdC5sZW5ndGgpYCAoY2FsbGVkIGluXG4gICAgICAgIC8vIHRoZSBzbGljZSBwb2x5ZmlsbCB3aGVuIHNsaWNpbmcgbmF0aXZlIGFycmF5cykgXCJkb2Vzbid0IHdvcmtcIiBpbiBzYWZhcmkgOSBhbmRcbiAgICAgICAgLy8gY2F1c2VzIGEgY3Jhc2ggKGh0dHBzOi8vcGFzdGViaW4uY29tL04yMVF6ZVFBKSB3aGVuIHRyeWluZyB0byBkZWJ1ZyBpdC5cbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIGNhcHR1cmVzLnB1c2gobWF5YmVUb1N0cmluZyhyZXN1bHRbal0pKTtcbiAgICAgICAgdmFyIG5hbWVkQ2FwdHVyZXMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICBpZiAoZnVuY3Rpb25hbFJlcGxhY2UpIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZXJBcmdzID0gW21hdGNoZWRdLmNvbmNhdChjYXB0dXJlcywgcG9zaXRpb24sIFMpO1xuICAgICAgICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHJlcGxhY2VyQXJncy5wdXNoKG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IFN0cmluZyhyZXBsYWNlVmFsdWUuYXBwbHkodW5kZWZpbmVkLCByZXBsYWNlckFyZ3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IGdldFN1YnN0aXR1dGlvbihtYXRjaGVkLCBTLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IG5leHRTb3VyY2VQb3NpdGlvbikge1xuICAgICAgICAgIGFjY3VtdWxhdGVkUmVzdWx0ICs9IFMuc2xpY2UobmV4dFNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbikgKyByZXBsYWNlbWVudDtcbiAgICAgICAgICBuZXh0U291cmNlUG9zaXRpb24gPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjdW11bGF0ZWRSZXN1bHQgKyBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbik7XG4gICAgfVxuICBdO1xufSk7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvYXJyYXkvaXMtYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2FycmF5L2lzLWFycmF5XCIpOyIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRmaWx0ZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmlsdGVyO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdmaWx0ZXInKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfSwge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcihjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkZmlsdGVyKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZpbHRlcicpO1xudmFyIGVudHJ5VmlydHVhbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2ludGVybmFscy9lbnRyeS12aXJ0dWFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZW50cnlWaXJ0dWFsKCdBcnJheScpLmZpbHRlcjtcbiIsInZhciBmaWx0ZXIgPSByZXF1aXJlKCcuLi9hcnJheS92aXJ0dWFsL2ZpbHRlcicpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5maWx0ZXI7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5maWx0ZXIpID8gZmlsdGVyIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9maWx0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzLXB1cmUvc3RhYmxlL2luc3RhbmNlL2ZpbHRlclwiKTsiLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCxuby10aHJvdy1saXRlcmFsIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gICAgbWV0aG9kLmNhbGwobnVsbCwgYXJndW1lbnQgfHwgZnVuY3Rpb24gKCkgeyB0aHJvdyAxOyB9LCAxKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgbmF0aXZlSW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbnZhciBORUdBVElWRV9aRVJPID0gISFuYXRpdmVJbmRleE9mICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xudmFyIFNUUklDVF9NRVRIT0QgPSBhcnJheU1ldGhvZElzU3RyaWN0KCdpbmRleE9mJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBORUdBVElWRV9aRVJPIHx8ICFTVFJJQ1RfTUVUSE9EIH0sIHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiBORUdBVElWRV9aRVJPXG4gICAgICAvLyBjb252ZXJ0IC0wIHRvICswXG4gICAgICA/IG5hdGl2ZUluZGV4T2YuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuaW5kZXhPZjtcbiIsInZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vYXJyYXkvdmlydHVhbC9pbmRleC1vZicpO1xuXG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC5pbmRleE9mO1xuICByZXR1cm4gaXQgPT09IEFycmF5UHJvdG90eXBlIHx8IChpdCBpbnN0YW5jZW9mIEFycmF5ICYmIG93biA9PT0gQXJyYXlQcm90b3R5cGUuaW5kZXhPZikgPyBpbmRleE9mIDogb3duO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9pbnN0YW5jZS9pbmRleC1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvaW5kZXgtb2ZcIik7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRmb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmZvckVhY2g7XG52YXIgYXJyYXlNZXRob2RJc1N0cmljdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0Jyk7XG5cbnZhciBTVFJJQ1RfTUVUSE9EID0gYXJyYXlNZXRob2RJc1N0cmljdCgnZm9yRWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSAhU1RSSUNUX01FVEhPRCA/IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgcmV0dXJuICRmb3JFYWNoKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbn0gOiBbXS5mb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mb3ItZWFjaCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogW10uZm9yRWFjaCAhPSBmb3JFYWNoIH0sIHtcbiAgZm9yRWFjaDogZm9yRWFjaFxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZvci1lYWNoJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuZm9yRWFjaDtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi8uLi9lcy9hcnJheS92aXJ0dWFsL2Zvci1lYWNoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLWNvbGxlY3Rpb25zLml0ZXJhdG9yJyk7XG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvZm9yLWVhY2gnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxudmFyIERPTUl0ZXJhYmxlcyA9IHtcbiAgRE9NVG9rZW5MaXN0OiB0cnVlLFxuICBOb2RlTGlzdDogdHJ1ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmZvckVhY2g7XG4gIHJldHVybiBpdCA9PT0gQXJyYXlQcm90b3R5cGUgfHwgKGl0IGluc3RhbmNlb2YgQXJyYXkgJiYgb3duID09PSBBcnJheVByb3RvdHlwZS5mb3JFYWNoKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICAgIHx8IERPTUl0ZXJhYmxlcy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKGl0KSkgPyBmb3JFYWNoIDogb3duO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvZm9yLWVhY2hcIik7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1tZXRob2QtaGFzLXNwZWNpZXMtc3VwcG9ydCcpO1xuXG52YXIgSEFTX1NQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ21hcCcpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5tYXBcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhSEFTX1NQRUNJRVNfU1VQUE9SVCB9LCB7XG4gIG1hcDogZnVuY3Rpb24gbWFwKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRtYXAodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkubWFwJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykubWFwO1xuIiwidmFyIG1hcCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvbWFwJyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0Lm1hcDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLm1hcCkgPyBtYXAgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL21hcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvbWFwXCIpOyIsInJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuY29uY2F0Jyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykuY29uY2F0O1xuIiwidmFyIGNvbmNhdCA9IHJlcXVpcmUoJy4uL2FycmF5L3ZpcnR1YWwvY29uY2F0Jyk7XG5cbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIG93biA9IGl0LmNvbmNhdDtcbiAgcmV0dXJuIGl0ID09PSBBcnJheVByb3RvdHlwZSB8fCAoaXQgaW5zdGFuY2VvZiBBcnJheSAmJiBvd24gPT09IEFycmF5UHJvdG90eXBlLmNvbmNhdCkgPyBjb25jYXQgOiBvd247XG59O1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL2NvbmNhdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvY29uY2F0XCIpOyIsIi8vIGEgc3RyaW5nIG9mIGFsbCB2YWxpZCB1bmljb2RlIHdoaXRlc3BhY2VzXG5tb2R1bGUuZXhwb3J0cyA9ICdcXHUwMDA5XFx1MDAwQVxcdTAwMEJcXHUwMDBDXFx1MDAwRFxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTIwMDBcXHUyMDAxXFx1MjAwMicgK1xuICAnXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkYnO1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIHdoaXRlc3BhY2UgPSAnWycgKyB3aGl0ZXNwYWNlcyArICddJztcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXicgKyB3aGl0ZXNwYWNlICsgd2hpdGVzcGFjZSArICcqJyk7XG52YXIgcnRyaW0gPSBSZWdFeHAod2hpdGVzcGFjZSArIHdoaXRlc3BhY2UgKyAnKiQnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltLCB0cmltU3RhcnQsIHRyaW1FbmQsIHRyaW1MZWZ0LCB0cmltUmlnaHQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICBpZiAoVFlQRSAmIDEpIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGx0cmltLCAnJyk7XG4gICAgaWYgKFRZUEUgJiAyKSBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShydHJpbSwgJycpO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUueyB0cmltTGVmdCwgdHJpbVN0YXJ0IH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1zdGFydFxuICBzdGFydDogY3JlYXRlTWV0aG9kKDEpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1SaWdodCwgdHJpbUVuZCB9YCBtZXRob2RzXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS50cmltZW5kXG4gIGVuZDogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS50cmltYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgdHJpbTogY3JlYXRlTWV0aG9kKDMpXG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIG5vbiA9ICdcXHUyMDBCXFx1MDA4NVxcdTE4MEUnO1xuXG4vLyBjaGVjayB0aGF0IGEgbWV0aG9kIHdvcmtzIHdpdGggdGhlIGNvcnJlY3QgbGlzdFxuLy8gb2Ygd2hpdGVzcGFjZXMgYW5kIGhhcyBhIGNvcnJlY3QgbmFtZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUpIHtcbiAgcmV0dXJuIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gISF3aGl0ZXNwYWNlc1tNRVRIT0RfTkFNRV0oKSB8fCBub25bTUVUSE9EX05BTUVdKCkgIT0gbm9uIHx8IHdoaXRlc3BhY2VzW01FVEhPRF9OQU1FXS5uYW1lICE9PSBNRVRIT0RfTkFNRTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIGZvcmNlZFN0cmluZ1RyaW1NZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0tZm9yY2VkJyk7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1cbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBmb3JjZWRTdHJpbmdUcmltTWV0aG9kKCd0cmltJykgfSwge1xuICB0cmltOiBmdW5jdGlvbiB0cmltKCkge1xuICAgIHJldHVybiAkdHJpbSh0aGlzKTtcbiAgfVxufSk7XG4iLCJyZXF1aXJlKCcuLi8uLi8uLi9tb2R1bGVzL2VzLnN0cmluZy50cmltJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ1N0cmluZycpLnRyaW07XG4iLCJ2YXIgdHJpbSA9IHJlcXVpcmUoJy4uL3N0cmluZy92aXJ0dWFsL3RyaW0nKTtcblxudmFyIFN0cmluZ1Byb3RvdHlwZSA9IFN0cmluZy5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBvd24gPSBpdC50cmltO1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnc3RyaW5nJyB8fCBpdCA9PT0gU3RyaW5nUHJvdG90eXBlXG4gICAgfHwgKGl0IGluc3RhbmNlb2YgU3RyaW5nICYmIG93biA9PT0gU3RyaW5nUHJvdG90eXBlLnRyaW0pID8gdHJpbSA6IG93bjtcbn07XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvaW5zdGFuY2UvdHJpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvaW5zdGFuY2UvdHJpbVwiKTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbnZhciAkc3RyaW5naWZ5ID0gZ2V0QnVpbHRJbignSlNPTicsICdzdHJpbmdpZnknKTtcbnZhciByZSA9IC9bXFx1RDgwMC1cXHVERkZGXS9nO1xudmFyIGxvdyA9IC9eW1xcdUQ4MDAtXFx1REJGRl0kLztcbnZhciBoaSA9IC9eW1xcdURDMDAtXFx1REZGRl0kLztcblxudmFyIGZpeCA9IGZ1bmN0aW9uIChtYXRjaCwgb2Zmc2V0LCBzdHJpbmcpIHtcbiAgdmFyIHByZXYgPSBzdHJpbmcuY2hhckF0KG9mZnNldCAtIDEpO1xuICB2YXIgbmV4dCA9IHN0cmluZy5jaGFyQXQob2Zmc2V0ICsgMSk7XG4gIGlmICgobG93LnRlc3QobWF0Y2gpICYmICFoaS50ZXN0KG5leHQpKSB8fCAoaGkudGVzdChtYXRjaCkgJiYgIWxvdy50ZXN0KHByZXYpKSkge1xuICAgIHJldHVybiAnXFxcXHUnICsgbWF0Y2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNik7XG4gIH0gcmV0dXJuIG1hdGNoO1xufTtcblxudmFyIEZPUkNFRCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICRzdHJpbmdpZnkoJ1xcdURGMDZcXHVEODM0JykgIT09ICdcIlxcXFx1ZGYwNlxcXFx1ZDgzNFwiJ1xuICAgIHx8ICRzdHJpbmdpZnkoJ1xcdURFQUQnKSAhPT0gJ1wiXFxcXHVkZWFkXCInO1xufSk7XG5cbmlmICgkc3RyaW5naWZ5KSB7XG4gIC8vIGBKU09OLnN0cmluZ2lmeWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtanNvbi5zdHJpbmdpZnlcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtd2VsbC1mb3JtZWQtc3RyaW5naWZ5XG4gICQoeyB0YXJnZXQ6ICdKU09OJywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gICAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQsIHJlcGxhY2VyLCBzcGFjZSkge1xuICAgICAgdmFyIHJlc3VsdCA9ICRzdHJpbmdpZnkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0eXBlb2YgcmVzdWx0ID09ICdzdHJpbmcnID8gcmVzdWx0LnJlcGxhY2UocmUsIGZpeCkgOiByZXN1bHQ7XG4gICAgfVxuICB9KTtcbn1cbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuanNvbi5zdHJpbmdpZnknKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxuaWYgKCFjb3JlLkpTT04pIGNvcmUuSlNPTiA9IHsgc3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeSB9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIGAubGVuZ3RoYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHJpbmdpZnkoaXQsIHJlcGxhY2VyLCBzcGFjZSkge1xuICByZXR1cm4gY29yZS5KU09OLnN0cmluZ2lmeS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9qc29uL3N0cmluZ2lmeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMtcHVyZS9zdGFibGUvanNvbi9zdHJpbmdpZnlcIik7IiwiLyoqXG4gKiBNaWNyb0V2ZW50IC0gdG8gbWFrZSBhbnkganMgb2JqZWN0IGFuIGV2ZW50IGVtaXR0ZXIgKHNlcnZlciBvciBicm93c2VyKVxuICogXG4gKiAtIHB1cmUgamF2YXNjcmlwdCAtIHNlcnZlciBjb21wYXRpYmxlLCBicm93c2VyIGNvbXBhdGlibGVcbiAqIC0gZG9udCByZWx5IG9uIHRoZSBicm93c2VyIGRvbXNcbiAqIC0gc3VwZXIgc2ltcGxlIC0geW91IGdldCBpdCBpbW1lZGlhdGx5LCBubyBtaXN0ZXJ5LCBubyBtYWdpYyBpbnZvbHZlZFxuICpcbiAqIC0gY3JlYXRlIGEgTWljcm9FdmVudERlYnVnIHdpdGggZ29vZGllcyB0byBkZWJ1Z1xuICogICAtIG1ha2UgaXQgc2FmZXIgdG8gdXNlXG4qL1xuXG52YXIgTWljcm9FdmVudFx0PSBmdW5jdGlvbigpe31cbk1pY3JvRXZlbnQucHJvdG90eXBlXHQ9IHtcblx0YmluZFx0OiBmdW5jdGlvbihldmVudCwgZmN0KXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF1cdHx8IFtdO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmY3QpO1xuXHR9LFxuXHR1bmJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XS5zcGxpY2UodGhpcy5fZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZjdCksIDEpO1xuXHR9LFxuXHR0cmlnZ2VyXHQ6IGZ1bmN0aW9uKGV2ZW50IC8qICwgYXJncy4uLiAqLyl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZXZlbnRzW2V2ZW50XVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBtaXhpbiB3aWxsIGRlbGVnYXRlIGFsbCBNaWNyb0V2ZW50LmpzIGZ1bmN0aW9uIGluIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAqXG4gKiAtIHJlcXVpcmUoJ01pY3JvRXZlbnQnKS5taXhpbihGb29iYXIpIHdpbGwgbWFrZSBGb29iYXIgYWJsZSB0byB1c2UgTWljcm9FdmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgc3VwcG9ydCBNaWNyb0V2ZW50XG4qL1xuTWljcm9FdmVudC5taXhpblx0PSBmdW5jdGlvbihkZXN0T2JqZWN0KXtcblx0dmFyIHByb3BzXHQ9IFsnYmluZCcsICd1bmJpbmQnLCAndHJpZ2dlciddO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICsrKXtcblx0XHRkZXN0T2JqZWN0LnByb3RvdHlwZVtwcm9wc1tpXV1cdD0gTWljcm9FdmVudC5wcm90b3R5cGVbcHJvcHNbaV1dO1xuXHR9XG59XG5cbi8vIGV4cG9ydCBpbiBjb21tb24ganNcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmICgnZXhwb3J0cycgaW4gbW9kdWxlKSl7XG5cdG1vZHVsZS5leHBvcnRzXHQ9IE1pY3JvRXZlbnRcbn1cbiIsInZhciBfX3NlbGZfXyA9IChmdW5jdGlvbiAocm9vdCkge1xuZnVuY3Rpb24gRigpIHtcbnRoaXMuZmV0Y2ggPSBmYWxzZTtcbnRoaXMuRE9NRXhjZXB0aW9uID0gcm9vdC5ET01FeGNlcHRpb25cbn1cbkYucHJvdG90eXBlID0gcm9vdDtcbnJldHVybiBuZXcgRigpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuKGZ1bmN0aW9uKHNlbGYpIHtcblxudmFyIGlycmVsZXZhbnQgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjpcbiAgICAgICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmXG4gICAgICAnQmxvYicgaW4gc2VsZiAmJlxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5ldyBCbG9iKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF07XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge307XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdO1xuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV07XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChuYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKTtcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keTtcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKTtcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ107XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybDtcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFscztcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2Q7XG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlO1xuICAgICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWw7XG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdDtcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nO1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpO1xuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbDtcbiAgICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsO1xuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KTtcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG4gIH07XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGJvZHlcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdCgnJicpXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpO1xuICAgICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpO1xuICAgIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKTtcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXM7XG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSyc7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnO1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KTtcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH07XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJztcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfTtcblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF07XG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfTtcblxuICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IHNlbGYuRE9NRXhjZXB0aW9uO1xuICB0cnkge1xuICAgIG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSk7XG4gICAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgfTtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZXhwb3J0cy5ET01FeGNlcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgZnVuY3Rpb24gYWJvcnRYaHIoKSB7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpO1xuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ29taXQnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbCkge1xuICAgICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKTtcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KTtcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2gucG9seWZpbGwgPSB0cnVlO1xuXG4gIGlmICghc2VsZi5mZXRjaCkge1xuICAgIHNlbGYuZmV0Y2ggPSBmZXRjaDtcbiAgICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzO1xuICAgIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICB9XG5cbiAgZXhwb3J0cy5IZWFkZXJzID0gSGVhZGVycztcbiAgZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICBleHBvcnRzLmZldGNoID0gZmV0Y2g7XG5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oe30pKTtcbn0pKF9fc2VsZl9fKTtcbmRlbGV0ZSBfX3NlbGZfXy5mZXRjaC5wb2x5ZmlsbFxuZXhwb3J0cyA9IF9fc2VsZl9fLmZldGNoIC8vIFRvIGVuYWJsZTogaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJ1xuZXhwb3J0cy5kZWZhdWx0ID0gX19zZWxmX18uZmV0Y2ggLy8gRm9yIFR5cGVTY3JpcHQgY29uc3VtZXJzIHdpdGhvdXQgZXNNb2R1bGVJbnRlcm9wLlxuZXhwb3J0cy5mZXRjaCA9IF9fc2VsZl9fLmZldGNoIC8vIFRvIGVuYWJsZTogaW1wb3J0IHtmZXRjaH0gZnJvbSAnY3Jvc3MtZmV0Y2gnXG5leHBvcnRzLkhlYWRlcnMgPSBfX3NlbGZfXy5IZWFkZXJzXG5leHBvcnRzLlJlcXVlc3QgPSBfX3NlbGZfXy5SZXF1ZXN0XG5leHBvcnRzLlJlc3BvbnNlID0gX19zZWxmX18uUmVzcG9uc2Vcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1xuIiwidmFyIHBhcmVudCA9IHJlcXVpcmUoJy4uLy4uL2VzL2luc3RhbmNlL3NsaWNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyZW50O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy1wdXJlL3N0YWJsZS9pbnN0YW5jZS9zbGljZVwiKTsiLCJleHBvcnQgY29uc3QgZm9ybWF0VW5pdCA9ICh1bml0KSA9PiB7XG4gICAgaWYgKHVuaXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB1bml0ID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gdW5pdCArICdweCc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdW5pdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHVuaXQucmVwbGFjZSgnZHAnLCAncHgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXNjYXBlQXR0clZhbHVlID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgY29uc3QgaXNEZWZpbmVkU3RyID0gKHZhbHVlKSA9PlxuICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID4gMDtcblxuZXhwb3J0IGNvbnN0IGVzY2FwZUhUTUwgPSAodW5zYWZlID0gJycpID0+XG4gICAgdW5zYWZlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzAzOTsnKTtcblxuZXhwb3J0IGNvbnN0IGdldFNoYWRvdyA9ICh2aWV3KSA9PiB7XG4gICAgaWYgKGlzRGVmaW5lZFN0cih2aWV3LnNoYWRvd19jb2xvcikpIHtcbiAgICAgICAgY29uc3QgZHggPSB0eXBlb2Ygdmlldy5zaGFkb3dfZHggPT09ICdudW1iZXInID8gdmlldy5zaGFkb3dfZHggOiAwO1xuICAgICAgICBjb25zdCBkeSA9IHR5cGVvZiB2aWV3LnNoYWRvd19keSA9PT0gJ251bWJlcicgPyB2aWV3LnNoYWRvd19keSA6IDA7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9XG4gICAgICAgICAgICB0eXBlb2Ygdmlldy5zaGFkb3dfcmFkaXVzID09PSAnbnVtYmVyJyA/IHZpZXcuc2hhZG93X3JhZGl1cyA6IDA7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gdmlldy5zaGFkb3dfY29sb3I7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGR4LFxuICAgICAgICAgICAgZHksXG4gICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICBjb2xvclxuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRUcmFuc2Zvcm1zID0gKHZpZXcpID0+IHtcbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gW107XG4gICAgY29uc3QgdHJhbnNsYXRlWCA9IGZvcm1hdFVuaXQodmlldy50cmFuc2Zvcm1fdHJhbnNsYXRlX3gpO1xuICAgIGNvbnN0IHRyYW5zbGF0ZVkgPSBmb3JtYXRVbml0KHZpZXcudHJhbnNmb3JtX3RyYW5zbGF0ZV95KTtcblxuICAgIGlmICh0cmFuc2xhdGVYICE9PSAwKSB7XG4gICAgICAgIHRyYW5zZm9ybXMucHVzaChgdHJhbnNsYXRlWCgke3RyYW5zbGF0ZVh9KWApO1xuICAgIH1cblxuICAgIGlmICh0cmFuc2xhdGVZICE9PSAwKSB7XG4gICAgICAgIHRyYW5zZm9ybXMucHVzaChgdHJhbnNsYXRlWSgke3RyYW5zbGF0ZVl9KWApO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHZpZXcudHJhbnNmb3JtX3JvdGF0ZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgdmlldy50cmFuc2Zvcm1fcm90YXRlICE9PSAwXG4gICAgKSB7XG4gICAgICAgIHRyYW5zZm9ybXMucHVzaChgcm90YXRlKCR7dmlldy50cmFuc2Zvcm1fcm90YXRlfWRlZylgKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAgIHR5cGVvZiB2aWV3LnRyYW5zZm9ybV9zY2FsZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgdmlldy50cmFuc2Zvcm1fc2NhbGUgIT09IDFcbiAgICApIHtcbiAgICAgICAgdHJhbnNmb3Jtcy5wdXNoKGBzY2FsZSgke3ZpZXcudHJhbnNmb3JtX3NjYWxlfSlgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3Jtcztcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZVNwYW5zID0gKHRleHQsIHNwYW5zID0gW10pID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGlmIChzcGFucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgdGV4dFxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHNwYW5zWzBdLnN0YXJ0ID4gMCkge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LnNsaWNlKDAsIHNwYW5zWzBdLnN0YXJ0KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzcGFucy5mb3JFYWNoKChzcGFuLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBzcGFuLnN0YXJ0O1xuICAgICAgICBjb25zdCBlbmRJbmRleCA9IHNwYW4uZW5kO1xuXG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpLFxuICAgICAgICAgICAgc3BhblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaSA9PT0gc3BhbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgaWYgKGVuZEluZGV4IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQuc2xpY2UoZW5kSW5kZXgsIHRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVuZEluZGV4IDwgc3BhbnNbaSArIDFdLnN0YXJ0KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dC5zbGljZShlbmRJbmRleCwgc3BhbnNbaSArIDFdLnN0YXJ0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGV4dFNoYWRvdyA9ICh2aWV3KSA9PiB7XG4gICAgaWYgKGlzRGVmaW5lZFN0cih2aWV3LnRleHRfc2hhZG93X2NvbG9yKSkge1xuICAgICAgICBjb25zdCBkeCA9XG4gICAgICAgICAgICB0eXBlb2Ygdmlldy50ZXh0X3NoYWRvd19keCA9PT0gJ251bWJlcicgPyB2aWV3LnRleHRfc2hhZG93X2R4IDogMDtcbiAgICAgICAgY29uc3QgZHkgPVxuICAgICAgICAgICAgdHlwZW9mIHZpZXcudGV4dF9zaGFkb3dfZHkgPT09ICdudW1iZXInID8gdmlldy50ZXh0X3NoYWRvd19keSA6IDA7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9XG4gICAgICAgICAgICB0eXBlb2Ygdmlldy50ZXh0X3NoYWRvd19yYWRpdXMgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgPyB2aWV3LnRleHRfc2hhZG93X3JhZGl1c1xuICAgICAgICAgICAgICAgIDogMDtcbiAgICAgICAgY29uc3QgY29sb3IgPSB2aWV3LnRleHRfc2hhZG93X2NvbG9yO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkeCxcbiAgICAgICAgICAgIGR5LFxuICAgICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgICAgY29sb3JcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgbG9hZEZvbnRzID0gKGZvbnRBc3NldHMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZm9udEFzc2V0cykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGZvbnRBc3NldHNba2V5XTtcbiAgICAgICAgY29uc3QgdXJscyA9IHZhbHVlLnNyY1xuICAgICAgICAgICAgLm1hcCgoWywgdXJsXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgdXJsKCcke3VybH0nKWA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJywgJyk7XG5cbiAgICAgICAgc3R5bGVFbC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFxuICAgICAgICAgICAgICAgIGBAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6ICcke2tleX0nOyBmb250LWRpc3BsYXk6IHN3YXA7IHNyYzogJHt1cmxzfTsgfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFycmF5TWV0aG9kSXNTdHJpY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdCcpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG52YXIgbmF0aXZlTGFzdEluZGV4T2YgPSBbXS5sYXN0SW5kZXhPZjtcbnZhciBORUdBVElWRV9aRVJPID0gISFuYXRpdmVMYXN0SW5kZXhPZiAmJiAxIC8gWzFdLmxhc3RJbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU1RSSUNUX01FVEhPRCA9IGFycmF5TWV0aG9kSXNTdHJpY3QoJ2xhc3RJbmRleE9mJyk7XG52YXIgRk9SQ0VEID0gTkVHQVRJVkVfWkVSTyB8fCAhU1RSSUNUX01FVEhPRDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZmAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5sYXN0aW5kZXhvZlxubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBsYXN0SW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gQFsqLTFdICovKSB7XG4gIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgaWYgKE5FR0FUSVZFX1pFUk8pIHJldHVybiBuYXRpdmVMYXN0SW5kZXhPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDA7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KHRoaXMpO1xuICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICB2YXIgaW5kZXggPSBsZW5ndGggLSAxO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIGluZGV4ID0gbWluKGluZGV4LCB0b0ludGVnZXIoYXJndW1lbnRzWzFdKSk7XG4gIGlmIChpbmRleCA8IDApIGluZGV4ID0gbGVuZ3RoICsgaW5kZXg7XG4gIGZvciAoO2luZGV4ID49IDA7IGluZGV4LS0pIGlmIChpbmRleCBpbiBPICYmIE9baW5kZXhdID09PSBzZWFyY2hFbGVtZW50KSByZXR1cm4gaW5kZXggfHwgMDtcbiAgcmV0dXJuIC0xO1xufSA6IG5hdGl2ZUxhc3RJbmRleE9mO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgbGFzdEluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbGFzdC1pbmRleC1vZicpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmxhc3RpbmRleG9mXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBsYXN0SW5kZXhPZiAhPT0gW10ubGFzdEluZGV4T2YgfSwge1xuICBsYXN0SW5kZXhPZjogbGFzdEluZGV4T2Zcbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5sYXN0LWluZGV4LW9mJyk7XG52YXIgZW50cnlWaXJ0dWFsID0gcmVxdWlyZSgnLi4vLi4vLi4vaW50ZXJuYWxzL2VudHJ5LXZpcnR1YWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbnRyeVZpcnR1YWwoJ0FycmF5JykubGFzdEluZGV4T2Y7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXRyaW0nKS50cmltO1xudmFyIHdoaXRlc3BhY2VzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3doaXRlc3BhY2VzJyk7XG5cbnZhciAkcGFyc2VJbnQgPSBnbG9iYWwucGFyc2VJbnQ7XG52YXIgaGV4ID0gL15bKy1dPzBbWHhdLztcbnZhciBGT1JDRUQgPSAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMDgnKSAhPT0gOCB8fCAkcGFyc2VJbnQod2hpdGVzcGFjZXMgKyAnMHgxNicpICE9PSAyMjtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcGFyc2VpbnQtc3RyaW5nLXJhZGl4XG5tb2R1bGUuZXhwb3J0cyA9IEZPUkNFRCA/IGZ1bmN0aW9uIHBhcnNlSW50KHN0cmluZywgcmFkaXgpIHtcbiAgdmFyIFMgPSB0cmltKFN0cmluZyhzdHJpbmcpKTtcbiAgcmV0dXJuICRwYXJzZUludChTLCAocmFkaXggPj4+IDApIHx8IChoZXgudGVzdChTKSA/IDE2IDogMTApKTtcbn0gOiAkcGFyc2VJbnQ7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBwYXJzZUludEltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL251bWJlci1wYXJzZS1pbnQnKTtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcGFyc2VpbnQtc3RyaW5nLXJhZGl4XG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHBhcnNlSW50ICE9IHBhcnNlSW50SW1wbGVtZW50YXRpb24gfSwge1xuICBwYXJzZUludDogcGFyc2VJbnRJbXBsZW1lbnRhdGlvblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIEhBU19TUEVDSUVTX1NVUFBPUlQgPSBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0KCdzcGxpY2UnKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9MRU5HVEhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGxlbmd0aCBleGNlZWRlZCc7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuc3BsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnNwbGljZVxuLy8gd2l0aCBhZGRpbmcgc3VwcG9ydCBvZiBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6ICFIQVNfU1BFQ0lFU19TVVBQT1JUIH0sIHtcbiAgc3BsaWNlOiBmdW5jdGlvbiBzcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50IC8qICwgLi4uaXRlbXMgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGFjdHVhbFN0YXJ0ID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICAgIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBpbnNlcnRDb3VudCwgYWN0dWFsRGVsZXRlQ291bnQsIEEsIGssIGZyb20sIHRvO1xuICAgIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDApIHtcbiAgICAgIGluc2VydENvdW50ID0gYWN0dWFsRGVsZXRlQ291bnQgPSAwO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAxKSB7XG4gICAgICBpbnNlcnRDb3VudCA9IDA7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IGxlbiAtIGFjdHVhbFN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRDb3VudCA9IGFyZ3VtZW50c0xlbmd0aCAtIDI7XG4gICAgICBhY3R1YWxEZWxldGVDb3VudCA9IG1pbihtYXgodG9JbnRlZ2VyKGRlbGV0ZUNvdW50KSwgMCksIGxlbiAtIGFjdHVhbFN0YXJ0KTtcbiAgICB9XG4gICAgaWYgKGxlbiArIGluc2VydENvdW50IC0gYWN0dWFsRGVsZXRlQ291bnQgPiBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCk7XG4gICAgfVxuICAgIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgYWN0dWFsRGVsZXRlQ291bnQpO1xuICAgIGZvciAoayA9IDA7IGsgPCBhY3R1YWxEZWxldGVDb3VudDsgaysrKSB7XG4gICAgICBmcm9tID0gYWN0dWFsU3RhcnQgKyBrO1xuICAgICAgaWYgKGZyb20gaW4gTykgY3JlYXRlUHJvcGVydHkoQSwgaywgT1tmcm9tXSk7XG4gICAgfVxuICAgIEEubGVuZ3RoID0gYWN0dWFsRGVsZXRlQ291bnQ7XG4gICAgaWYgKGluc2VydENvdW50IDwgYWN0dWFsRGVsZXRlQ291bnQpIHtcbiAgICAgIGZvciAoayA9IGFjdHVhbFN0YXJ0OyBrIDwgbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsrKykge1xuICAgICAgICBmcm9tID0gayArIGFjdHVhbERlbGV0ZUNvdW50O1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudDtcbiAgICAgICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIH1cbiAgICAgIGZvciAoayA9IGxlbjsgayA+IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7IGstLSkgZGVsZXRlIE9bayAtIDFdO1xuICAgIH0gZWxzZSBpZiAoaW5zZXJ0Q291bnQgPiBhY3R1YWxEZWxldGVDb3VudCkge1xuICAgICAgZm9yIChrID0gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQ7IGsgPiBhY3R1YWxTdGFydDsgay0tKSB7XG4gICAgICAgIGZyb20gPSBrICsgYWN0dWFsRGVsZXRlQ291bnQgLSAxO1xuICAgICAgICB0byA9IGsgKyBpbnNlcnRDb3VudCAtIDE7XG4gICAgICAgIGlmIChmcm9tIGluIE8pIE9bdG9dID0gT1tmcm9tXTtcbiAgICAgICAgZWxzZSBkZWxldGUgT1t0b107XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoayA9IDA7IGsgPCBpbnNlcnRDb3VudDsgaysrKSB7XG4gICAgICBPW2sgKyBhY3R1YWxTdGFydF0gPSBhcmd1bWVudHNbayArIDJdO1xuICAgIH1cbiAgICBPLmxlbmd0aCA9IGxlbiAtIGFjdHVhbERlbGV0ZUNvdW50ICsgaW5zZXJ0Q291bnQ7XG4gICAgcmV0dXJuIEE7XG4gIH1cbn0pO1xuIiwicmVxdWlyZSgnLi4vLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zcGxpY2UnKTtcbnZhciBlbnRyeVZpcnR1YWwgPSByZXF1aXJlKCcuLi8uLi8uLi9pbnRlcm5hbHMvZW50cnktdmlydHVhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVudHJ5VmlydHVhbCgnQXJyYXknKS5zcGxpY2U7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIE1TSUUgPSAvTVNJRSAuXFwuLy50ZXN0KHVzZXJBZ2VudCk7IC8vIDwtIGRpcnR5IGllOS0gY2hlY2tcblxudmFyIHdyYXAgPSBmdW5jdGlvbiAoc2NoZWR1bGVyKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaGFuZGxlciwgdGltZW91dCAvKiAsIC4uLmFyZ3VtZW50cyAqLykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgICB2YXIgYXJncyA9IGJvdW5kQXJncyA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc2NoZWR1bGVyKGJvdW5kQXJncyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBzcGVjIHJlcXVpcmVtZW50XG4gICAgICAodHlwZW9mIGhhbmRsZXIgPT0gJ2Z1bmN0aW9uJyA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKSkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSA6IGhhbmRsZXIsIHRpbWVvdXQpO1xuICB9O1xufTtcblxuLy8gaWU5LSBzZXRUaW1lb3V0ICYgc2V0SW50ZXJ2YWwgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCN0aW1lcnNcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGZvcmNlZDogTVNJRSB9LCB7XG4gIC8vIGBzZXRUaW1lb3V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCNkb20tc2V0dGltZW91dFxuICBzZXRUaW1lb3V0OiB3cmFwKGdsb2JhbC5zZXRUaW1lb3V0KSxcbiAgLy8gYHNldEludGVydmFsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCNkb20tc2V0aW50ZXJ2YWxcbiAgc2V0SW50ZXJ2YWw6IHdyYXAoZ2xvYmFsLnNldEludGVydmFsKVxufSk7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxudmFyIFJlc3VsdCA9IGZ1bmN0aW9uIChzdG9wcGVkLCByZXN1bHQpIHtcbiAgdGhpcy5zdG9wcGVkID0gc3RvcHBlZDtcbiAgdGhpcy5yZXN1bHQgPSByZXN1bHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgdW5ib3VuZEZ1bmN0aW9uLCBvcHRpb25zKSB7XG4gIHZhciB0aGF0ID0gb3B0aW9ucyAmJiBvcHRpb25zLnRoYXQ7XG4gIHZhciBBU19FTlRSSUVTID0gISEob3B0aW9ucyAmJiBvcHRpb25zLkFTX0VOVFJJRVMpO1xuICB2YXIgSVNfSVRFUkFUT1IgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSVNfSVRFUkFUT1IpO1xuICB2YXIgSU5URVJSVVBURUQgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuSU5URVJSVVBURUQpO1xuICB2YXIgZm4gPSBiaW5kKHVuYm91bmRGdW5jdGlvbiwgdGhhdCwgMSArIEFTX0VOVFJJRVMgKyBJTlRFUlJVUFRFRCk7XG4gIHZhciBpdGVyYXRvciwgaXRlckZuLCBpbmRleCwgbGVuZ3RoLCByZXN1bHQsIG5leHQsIHN0ZXA7XG5cbiAgdmFyIHN0b3AgPSBmdW5jdGlvbiAoY29uZGl0aW9uKSB7XG4gICAgaWYgKGl0ZXJhdG9yKSBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICByZXR1cm4gbmV3IFJlc3VsdCh0cnVlLCBjb25kaXRpb24pO1xuICB9O1xuXG4gIHZhciBjYWxsRm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoQVNfRU5UUklFUykge1xuICAgICAgYW5PYmplY3QodmFsdWUpO1xuICAgICAgcmV0dXJuIElOVEVSUlVQVEVEID8gZm4odmFsdWVbMF0sIHZhbHVlWzFdLCBzdG9wKSA6IGZuKHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG4gICAgfSByZXR1cm4gSU5URVJSVVBURUQgPyBmbih2YWx1ZSwgc3RvcCkgOiBmbih2YWx1ZSk7XG4gIH07XG5cbiAgaWYgKElTX0lURVJBVE9SKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYWJsZTtcbiAgfSBlbHNlIHtcbiAgICBpdGVyRm4gPSBnZXRJdGVyYXRvck1ldGhvZChpdGVyYWJsZSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKCdUYXJnZXQgaXMgbm90IGl0ZXJhYmxlJyk7XG4gICAgLy8gb3B0aW1pc2F0aW9uIGZvciBhcnJheSBpdGVyYXRvcnNcbiAgICBpZiAoaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJGbikpIHtcbiAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgICByZXN1bHQgPSBjYWxsRm4oaXRlcmFibGVbaW5kZXhdKTtcbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQgaW5zdGFuY2VvZiBSZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbiAgICB9XG4gICAgaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7XG4gIH1cblxuICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgd2hpbGUgKCEoc3RlcCA9IG5leHQuY2FsbChpdGVyYXRvcikpLmRvbmUpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gY2FsbEZuKHN0ZXAudmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAnb2JqZWN0JyAmJiByZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9IHJldHVybiBuZXcgUmVzdWx0KGZhbHNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG5cbnZhciAkQWdncmVnYXRlRXJyb3IgPSBmdW5jdGlvbiBBZ2dyZWdhdGVFcnJvcihlcnJvcnMsIG1lc3NhZ2UpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoISh0aGF0IGluc3RhbmNlb2YgJEFnZ3JlZ2F0ZUVycm9yKSkgcmV0dXJuIG5ldyAkQWdncmVnYXRlRXJyb3IoZXJyb3JzLCBtZXNzYWdlKTtcbiAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vZXJyb3ItbWVzc2FnZSAtLSBleHBlY3RlZFxuICAgIHRoYXQgPSBzZXRQcm90b3R5cGVPZihuZXcgRXJyb3IodW5kZWZpbmVkKSwgZ2V0UHJvdG90eXBlT2YodGhhdCkpO1xuICB9XG4gIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0aGF0LCAnbWVzc2FnZScsIFN0cmluZyhtZXNzYWdlKSk7XG4gIHZhciBlcnJvcnNBcnJheSA9IFtdO1xuICBpdGVyYXRlKGVycm9ycywgZXJyb3JzQXJyYXkucHVzaCwgeyB0aGF0OiBlcnJvcnNBcnJheSB9KTtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHRoYXQsICdlcnJvcnMnLCBlcnJvcnNBcnJheSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuJEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZSA9IGNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcig1LCAkQWdncmVnYXRlRXJyb3IpLFxuICBtZXNzYWdlOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoNSwgJycpLFxuICBuYW1lOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoNSwgJ0FnZ3JlZ2F0ZUVycm9yJylcbn0pO1xuXG4vLyBgQWdncmVnYXRlRXJyb3JgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFnZ3JlZ2F0ZS1lcnJvci1jb25zdHJ1Y3RvclxuJCh7IGdsb2JhbDogdHJ1ZSB9LCB7XG4gIEFnZ3JlZ2F0ZUVycm9yOiAkQWdncmVnYXRlRXJyb3Jcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuUHJvbWlzZTtcbiIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgb3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy51bnNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSByZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIG9wdGlvbnMpO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTlNUUlVDVE9SX05BTUUpIHtcbiAgdmFyIENvbnN0cnVjdG9yID0gZ2V0QnVpbHRJbihDT05TVFJVQ1RPUl9OQU1FKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgQ29uc3RydWN0b3IgJiYgIUNvbnN0cnVjdG9yW1NQRUNJRVNdKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFNQRUNJRVMsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICAgIH0pO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvcnJlY3QgJyArIChuYW1lID8gbmFtZSArICcgJyA6ICcnKSArICdpbnZvY2F0aW9uJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgU3BlY2llc0NvbnN0cnVjdG9yYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3BlY2llc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBkZWZhdWx0Q29uc3RydWN0b3IpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gZGVmYXVsdENvbnN0cnVjdG9yIDogYUZ1bmN0aW9uKFMpO1xufTtcbiIsInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvKGlwaG9uZXxpcG9kfGlwYWQpLiphcHBsZXdlYmtpdC9pLnRlc3QodXNlckFnZW50KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBJU19JT1MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcycpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIGxvY2F0aW9uID0gZ2xvYmFsLmxvY2F0aW9uO1xudmFyIHNldCA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXIgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5cbnZhciBydW4gPSBmdW5jdGlvbiAoaWQpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIHNwZWMgcmVxdWlyZW1lbnRcbiAgICAgICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pKS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKElTX05PREUpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgLy8gZXhjZXB0IGlPUyAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82MjRcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCAmJiAhSVNfSU9TKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBiaW5kKHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJlxuICAgIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmXG4gICAgIWdsb2JhbC5pbXBvcnRTY3JpcHRzICYmXG4gICAgbG9jYXRpb24gJiYgbG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgJiZcbiAgICAhZmFpbHMocG9zdClcbiAgKSB7XG4gICAgZGVmZXIgPSBwb3N0O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4oaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KHJ1bm5lcihpZCksIDApO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCJ2YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gL3dlYjBzKD8hLipjaHJvbWUpL2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MnKTtcbnZhciBJU19XRUJPU19XRUJLSVQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLXdlYm9zLXdlYmtpdCcpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xuLy8gTm9kZS5qcyAxMSBzaG93cyBFeHBlcmltZW50YWxXYXJuaW5nIG9uIGdldHRpbmcgYHF1ZXVlTWljcm90YXNrYFxudmFyIHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihnbG9iYWwsICdxdWV1ZU1pY3JvdGFzaycpO1xudmFyIHF1ZXVlTWljcm90YXNrID0gcXVldWVNaWNyb3Rhc2tEZXNjcmlwdG9yICYmIHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvci52YWx1ZTtcblxudmFyIGZsdXNoLCBoZWFkLCBsYXN0LCBub3RpZnksIHRvZ2dsZSwgbm9kZSwgcHJvbWlzZSwgdGhlbjtcblxuLy8gbW9kZXJuIGVuZ2luZXMgaGF2ZSBxdWV1ZU1pY3JvdGFzayBtZXRob2RcbmlmICghcXVldWVNaWNyb3Rhc2spIHtcbiAgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKElTX05PREUgJiYgKHBhcmVudCA9IHByb2Nlc3MuZG9tYWluKSkgcGFyZW50LmV4aXQoKTtcbiAgICB3aGlsZSAoaGVhZCkge1xuICAgICAgZm4gPSBoZWFkLmZuO1xuICAgICAgaGVhZCA9IGhlYWQubmV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgLy8gYWxzbyBleGNlcHQgV2ViT1MgV2Via2l0IGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84OThcbiAgaWYgKCFJU19JT1MgJiYgIUlTX05PREUgJiYgIUlTX1dFQk9TX1dFQktJVCAmJiBNdXRhdGlvbk9ic2VydmVyICYmIGRvY3VtZW50KSB7XG4gICAgdG9nZ2xlID0gdHJ1ZTtcbiAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLmRhdGEgPSB0b2dnbGUgPSAhdG9nZ2xlO1xuICAgIH07XG4gIC8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG4gIH0gZWxzZSBpZiAoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpIHtcbiAgICAvLyBQcm9taXNlLnJlc29sdmUgd2l0aG91dCBhbiBhcmd1bWVudCB0aHJvd3MgYW4gZXJyb3IgaW4gTEcgV2ViT1MgMlxuICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICB0aGVuID0gcHJvbWlzZS50aGVuO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoZW4uY2FsbChwcm9taXNlLCBmbHVzaCk7XG4gICAgfTtcbiAgLy8gTm9kZS5qcyB3aXRob3V0IHByb21pc2VzXG4gIH0gZWxzZSBpZiAoSVNfTk9ERSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcXVldWVNaWNyb3Rhc2sgfHwgZnVuY3Rpb24gKGZuKSB7XG4gIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgaWYgKCFoZWFkKSB7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbnZhciBQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59O1xuXG4vLyAyNS40LjEuNSBOZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgdmFyIGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZTtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcikge1xuICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBjb25zb2xlLmVycm9yKGEpIDogY29uc29sZS5lcnJvcihhLCBiKTtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4geyBlcnJvcjogZmFsc2UsIHZhbHVlOiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBlcnJvcjogdHJ1ZSwgdmFsdWU6IGVycm9yIH07XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBOYXRpdmVQcm9taXNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZS1hbGwnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG52YXIgY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NoZWNrLWNvcnJlY3RuZXNzLW9mLWl0ZXJhdGlvbicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9taWNyb3Rhc2snKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUnKTtcbnZhciBob3N0UmVwb3J0RXJyb3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hvc3QtcmVwb3J0LWVycm9ycycpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxQcm9taXNlU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihQUk9NSVNFKTtcbnZhciBQcm9taXNlQ29uc3RydWN0b3IgPSBOYXRpdmVQcm9taXNlO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyICRmZXRjaCA9IGdldEJ1aWx0SW4oJ2ZldGNoJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xudmFyIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5O1xudmFyIERJU1BBVENIX0VWRU5UID0gISEoZG9jdW1lbnQgJiYgZG9jdW1lbnQuY3JlYXRlRXZlbnQgJiYgZ2xvYmFsLmRpc3BhdGNoRXZlbnQpO1xudmFyIE5BVElWRV9SRUpFQ1RJT05fRVZFTlQgPSB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID09ICdmdW5jdGlvbic7XG52YXIgVU5IQU5ETEVEX1JFSkVDVElPTiA9ICd1bmhhbmRsZWRyZWplY3Rpb24nO1xudmFyIFJFSkVDVElPTl9IQU5ETEVEID0gJ3JlamVjdGlvbmhhbmRsZWQnO1xudmFyIFBFTkRJTkcgPSAwO1xudmFyIEZVTEZJTExFRCA9IDE7XG52YXIgUkVKRUNURUQgPSAyO1xudmFyIEhBTkRMRUQgPSAxO1xudmFyIFVOSEFORExFRCA9IDI7XG52YXIgSW50ZXJuYWwsIE93blByb21pc2VDYXBhYmlsaXR5LCBQcm9taXNlV3JhcHBlciwgbmF0aXZlVGhlbjtcblxudmFyIEZPUkNFRCA9IGlzRm9yY2VkKFBST01JU0UsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIEdMT0JBTF9DT1JFX0pTX1BST01JU0UgPSBpbnNwZWN0U291cmNlKFByb21pc2VDb25zdHJ1Y3RvcikgIT09IFN0cmluZyhQcm9taXNlQ29uc3RydWN0b3IpO1xuICBpZiAoIUdMT0JBTF9DT1JFX0pTX1BST01JU0UpIHtcbiAgICAvLyBWOCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgLy8gV2UgY2FuJ3QgZGV0ZWN0IGl0IHN5bmNocm9ub3VzbHksIHNvIGp1c3QgY2hlY2sgdmVyc2lvbnNcbiAgICBpZiAoVjhfVkVSU0lPTiA9PT0gNjYpIHJldHVybiB0cnVlO1xuICAgIC8vIFVuaGFuZGxlZCByZWplY3Rpb25zIHRyYWNraW5nIHN1cHBvcnQsIE5vZGVKUyBQcm9taXNlIHdpdGhvdXQgaXQgZmFpbHMgQEBzcGVjaWVzIHRlc3RcbiAgICBpZiAoIUlTX05PREUgJiYgIU5BVElWRV9SRUpFQ1RJT05fRVZFTlQpIHJldHVybiB0cnVlO1xuICB9XG4gIC8vIFdlIG5lZWQgUHJvbWlzZSNmaW5hbGx5IGluIHRoZSBwdXJlIHZlcnNpb24gZm9yIHByZXZlbnRpbmcgcHJvdG90eXBlIHBvbGx1dGlvblxuICBpZiAoSVNfUFVSRSAmJiAhUHJvbWlzZUNvbnN0cnVjdG9yLnByb3RvdHlwZVsnZmluYWxseSddKSByZXR1cm4gdHJ1ZTtcbiAgLy8gV2UgY2FuJ3QgdXNlIEBAc3BlY2llcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzlcbiAgaWYgKFY4X1ZFUlNJT04gPj0gNTEgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KFByb21pc2VDb25zdHJ1Y3RvcikpIHJldHVybiBmYWxzZTtcbiAgLy8gRGV0ZWN0IGNvcnJlY3RuZXNzIG9mIHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlQ29uc3RydWN0b3IucmVzb2x2ZSgxKTtcbiAgdmFyIEZha2VQcm9taXNlID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICBleGVjKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbiAgfTtcbiAgdmFyIGNvbnN0cnVjdG9yID0gcHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9O1xuICBjb25zdHJ1Y3RvcltTUEVDSUVTXSA9IEZha2VQcm9taXNlO1xuICByZXR1cm4gIShwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlKTtcbn0pO1xuXG52YXIgSU5DT1JSRUNUX0lURVJBVElPTiA9IEZPUkNFRCB8fCAhY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uKGZ1bmN0aW9uIChpdGVyYWJsZSkge1xuICBQcm9taXNlQ29uc3RydWN0b3IuYWxsKGl0ZXJhYmxlKVsnY2F0Y2gnXShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xuXG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHN0YXRlLCBpc1JlamVjdCkge1xuICBpZiAoc3RhdGUubm90aWZpZWQpIHJldHVybjtcbiAgc3RhdGUubm90aWZpZWQgPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBzdGF0ZS5yZWFjdGlvbnM7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gc3RhdGUudmFsdWU7XG4gICAgdmFyIG9rID0gc3RhdGUuc3RhdGUgPT0gRlVMRklMTEVEO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IGNoYWluW2luZGV4KytdO1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUucmVqZWN0aW9uID09PSBVTkhBTkRMRUQpIG9uSGFuZGxlVW5oYW5kbGVkKHN0YXRlKTtcbiAgICAgICAgICAgIHN0YXRlLnJlamVjdGlvbiA9IEhBTkRMRUQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIGNhbiB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhdGUucmVhY3Rpb25zID0gW107XG4gICAgc3RhdGUubm90aWZpZWQgPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXN0YXRlLnJlamVjdGlvbikgb25VbmhhbmRsZWQoc3RhdGUpO1xuICB9KTtcbn07XG5cbnZhciBkaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKG5hbWUsIHByb21pc2UsIHJlYXNvbikge1xuICB2YXIgZXZlbnQsIGhhbmRsZXI7XG4gIGlmIChESVNQQVRDSF9FVkVOVCkge1xuICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZlbnQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgZXZlbnQucmVhc29uID0gcmVhc29uO1xuICAgIGV2ZW50LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XG4gICAgZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9IGVsc2UgZXZlbnQgPSB7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcmVhc29uIH07XG4gIGlmICghTkFUSVZFX1JFSkVDVElPTl9FVkVOVCAmJiAoaGFuZGxlciA9IGdsb2JhbFsnb24nICsgbmFtZV0pKSBoYW5kbGVyKGV2ZW50KTtcbiAgZWxzZSBpZiAobmFtZSA9PT0gVU5IQU5ETEVEX1JFSkVDVElPTikgaG9zdFJlcG9ydEVycm9ycygnVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgcmVhc29uKTtcbn07XG5cbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb21pc2UgPSBzdGF0ZS5mYWNhZGU7XG4gICAgdmFyIHZhbHVlID0gc3RhdGUudmFsdWU7XG4gICAgdmFyIElTX1VOSEFORExFRCA9IGlzVW5oYW5kbGVkKHN0YXRlKTtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmIChJU19VTkhBTkRMRUQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoSVNfTk9ERSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgZGlzcGF0Y2hFdmVudChVTkhBTkRMRURfUkVKRUNUSU9OLCBwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBzdGF0ZS5yZWplY3Rpb24gPSBJU19OT0RFIHx8IGlzVW5oYW5kbGVkKHN0YXRlKSA/IFVOSEFORExFRCA6IEhBTkRMRUQ7XG4gICAgICBpZiAocmVzdWx0LmVycm9yKSB0aHJvdyByZXN1bHQudmFsdWU7XG4gICAgfVxuICB9KTtcbn07XG5cbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICByZXR1cm4gc3RhdGUucmVqZWN0aW9uICE9PSBIQU5ETEVEICYmICFzdGF0ZS5wYXJlbnQ7XG59O1xuXG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gc3RhdGUuZmFjYWRlO1xuICAgIGlmIChJU19OT0RFKSB7XG4gICAgICBwcm9jZXNzLmVtaXQoJ3JlamVjdGlvbkhhbmRsZWQnLCBwcm9taXNlKTtcbiAgICB9IGVsc2UgZGlzcGF0Y2hFdmVudChSRUpFQ1RJT05fSEFORExFRCwgcHJvbWlzZSwgc3RhdGUudmFsdWUpO1xuICB9KTtcbn07XG5cbnZhciBiaW5kID0gZnVuY3Rpb24gKGZuLCBzdGF0ZSwgdW53cmFwKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBmbihzdGF0ZSwgdmFsdWUsIHVud3JhcCk7XG4gIH07XG59O1xuXG52YXIgaW50ZXJuYWxSZWplY3QgPSBmdW5jdGlvbiAoc3RhdGUsIHZhbHVlLCB1bndyYXApIHtcbiAgaWYgKHN0YXRlLmRvbmUpIHJldHVybjtcbiAgc3RhdGUuZG9uZSA9IHRydWU7XG4gIGlmICh1bndyYXApIHN0YXRlID0gdW53cmFwO1xuICBzdGF0ZS52YWx1ZSA9IHZhbHVlO1xuICBzdGF0ZS5zdGF0ZSA9IFJFSkVDVEVEO1xuICBub3RpZnkoc3RhdGUsIHRydWUpO1xufTtcblxudmFyIGludGVybmFsUmVzb2x2ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgdmFsdWUsIHVud3JhcCkge1xuICBpZiAoc3RhdGUuZG9uZSkgcmV0dXJuO1xuICBzdGF0ZS5kb25lID0gdHJ1ZTtcbiAgaWYgKHVud3JhcCkgc3RhdGUgPSB1bndyYXA7XG4gIHRyeSB7XG4gICAgaWYgKHN0YXRlLmZhY2FkZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIHZhciB0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSk7XG4gICAgaWYgKHRoZW4pIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBkb25lOiBmYWxzZSB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSxcbiAgICAgICAgICAgIGJpbmQoaW50ZXJuYWxSZXNvbHZlLCB3cmFwcGVyLCBzdGF0ZSksXG4gICAgICAgICAgICBiaW5kKGludGVybmFsUmVqZWN0LCB3cmFwcGVyLCBzdGF0ZSlcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGludGVybmFsUmVqZWN0KHdyYXBwZXIsIGVycm9yLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgc3RhdGUuc3RhdGUgPSBGVUxGSUxMRUQ7XG4gICAgICBub3RpZnkoc3RhdGUsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaW50ZXJuYWxSZWplY3QoeyBkb25lOiBmYWxzZSB9LCBlcnJvciwgc3RhdGUpO1xuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKEZPUkNFRCkge1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICBQcm9taXNlQ29uc3RydWN0b3IgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCBQcm9taXNlQ29uc3RydWN0b3IsIFBST01JU0UpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihiaW5kKGludGVybmFsUmVzb2x2ZSwgc3RhdGUpLCBiaW5kKGludGVybmFsUmVqZWN0LCBzdGF0ZSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpbnRlcm5hbFJlamVjdChzdGF0ZSwgZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgICB0eXBlOiBQUk9NSVNFLFxuICAgICAgZG9uZTogZmFsc2UsXG4gICAgICBub3RpZmllZDogZmFsc2UsXG4gICAgICBwYXJlbnQ6IGZhbHNlLFxuICAgICAgcmVhY3Rpb25zOiBbXSxcbiAgICAgIHJlamVjdGlvbjogZmFsc2UsXG4gICAgICBzdGF0ZTogUEVORElORyxcbiAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVkZWZpbmVBbGwoUHJvbWlzZUNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS50aGVuYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLnRoZW5cbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFByb21pc2VTdGF0ZSh0aGlzKTtcbiAgICAgIHZhciByZWFjdGlvbiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBQcm9taXNlQ29uc3RydWN0b3IpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gSVNfTk9ERSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgc3RhdGUucGFyZW50ID0gdHJ1ZTtcbiAgICAgIHN0YXRlLnJlYWN0aW9ucy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmIChzdGF0ZS5zdGF0ZSAhPSBQRU5ESU5HKSBub3RpZnkoc3RhdGUsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gYFByb21pc2UucHJvdG90eXBlLmNhdGNoYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLmNhdGNoXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUocHJvbWlzZSk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBiaW5kKGludGVybmFsUmVzb2x2ZSwgc3RhdGUpO1xuICAgIHRoaXMucmVqZWN0ID0gYmluZChpbnRlcm5hbFJlamVjdCwgc3RhdGUpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSBQcm9taXNlQ29uc3RydWN0b3IgfHwgQyA9PT0gUHJvbWlzZVdyYXBwZXJcbiAgICAgID8gbmV3IE93blByb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICA6IG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgfTtcblxuICBpZiAoIUlTX1BVUkUgJiYgdHlwZW9mIE5hdGl2ZVByb21pc2UgPT0gJ2Z1bmN0aW9uJykge1xuICAgIG5hdGl2ZVRoZW4gPSBOYXRpdmVQcm9taXNlLnByb3RvdHlwZS50aGVuO1xuXG4gICAgLy8gd3JhcCBuYXRpdmUgUHJvbWlzZSN0aGVuIGZvciBuYXRpdmUgYXN5bmMgZnVuY3Rpb25zXG4gICAgcmVkZWZpbmUoTmF0aXZlUHJvbWlzZS5wcm90b3R5cGUsICd0aGVuJywgZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlQ29uc3RydWN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBuYXRpdmVUaGVuLmNhbGwodGhhdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NDBcbiAgICB9LCB7IHVuc2FmZTogdHJ1ZSB9KTtcblxuICAgIC8vIHdyYXAgZmV0Y2ggcmVzdWx0XG4gICAgaWYgKHR5cGVvZiAkZmV0Y2ggPT0gJ2Z1bmN0aW9uJykgJCh7IGdsb2JhbDogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgZm9yY2VkOiB0cnVlIH0sIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gICAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goaW5wdXQgLyogLCBpbml0ICovKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShQcm9taXNlQ29uc3RydWN0b3IsICRmZXRjaC5hcHBseShnbG9iYWwsIGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgUHJvbWlzZTogUHJvbWlzZUNvbnN0cnVjdG9yXG59KTtcblxuc2V0VG9TdHJpbmdUYWcoUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFLCBmYWxzZSwgdHJ1ZSk7XG5zZXRTcGVjaWVzKFBST01JU0UpO1xuXG5Qcm9taXNlV3JhcHBlciA9IGdldEJ1aWx0SW4oUFJPTUlTRSk7XG5cbi8vIHN0YXRpY3NcbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVqZWN0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJlamVjdFxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICBjYXBhYmlsaXR5LnJlamVjdC5jYWxsKHVuZGVmaW5lZCwgcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogSVNfUFVSRSB8fCBGT1JDRUQgfSwge1xuICAvLyBgUHJvbWlzZS5yZXNvbHZlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJlc29sdmVcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKElTX1BVUkUgJiYgdGhpcyA9PT0gUHJvbWlzZVdyYXBwZXIgPyBQcm9taXNlQ29uc3RydWN0b3IgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG5cbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogSU5DT1JSRUNUX0lURVJBVElPTiB9LCB7XG4gIC8vIGBQcm9taXNlLmFsbGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5hbGxcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIGBQcm9taXNlLnJhY2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucmFjZVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkcHJvbWlzZVJlc29sdmUgPSBhRnVuY3Rpb24oQy5yZXNvbHZlKTtcbiAgICAgIGl0ZXJhdGUoaXRlcmFibGUsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICRwcm9taXNlUmVzb2x2ZS5jYWxsKEMsIHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikgcmVqZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcblxuLy8gYFByb21pc2UuYWxsU2V0dGxlZGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UuYWxsc2V0dGxlZFxuJCh7IHRhcmdldDogJ1Byb21pc2UnLCBzdGF0OiB0cnVlIH0sIHtcbiAgYWxsU2V0dGxlZDogZnVuY3Rpb24gYWxsU2V0dGxlZChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBwcm9taXNlUmVzb2x2ZS5jYWxsKEMsIHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0geyBzdGF0dXM6ICdmdWxmaWxsZWQnLCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHsgc3RhdHVzOiAncmVqZWN0ZWQnLCByZWFzb246IGVycm9yIH07XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3BlcmZvcm0nKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcblxudmFyIFBST01JU0VfQU5ZX0VSUk9SID0gJ05vIG9uZSBwcm9taXNlIHJlc29sdmVkJztcblxuLy8gYFByb21pc2UuYW55YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcHJvbWlzZS5hbnlcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgc3RhdDogdHJ1ZSB9LCB7XG4gIGFueTogZnVuY3Rpb24gYW55KGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZihDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIHZhciBhbHJlYWR5UmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgIGl0ZXJhdGUoaXRlcmFibGUsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGNvdW50ZXIrKztcbiAgICAgICAgdmFyIGFscmVhZHlSZWplY3RlZCA9IGZhbHNlO1xuICAgICAgICBlcnJvcnMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5UmVqZWN0ZWQgfHwgYWxyZWFkeVJlc29sdmVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeVJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlSZWplY3RlZCB8fCBhbHJlYWR5UmVzb2x2ZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5UmVqZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIGVycm9yc1tpbmRleF0gPSBlcnJvcjtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZWplY3QobmV3IChnZXRCdWlsdEluKCdBZ2dyZWdhdGVFcnJvcicpKShlcnJvcnMsIFBST01JU0VfQU5ZX0VSUk9SKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZWplY3QobmV3IChnZXRCdWlsdEluKCdBZ2dyZWdhdGVFcnJvcicpKShlcnJvcnMsIFBST01JU0VfQU5ZX0VSUk9SKSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lcnJvcikgcmVqZWN0KHJlc3VsdC52YWx1ZSk7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBOYXRpdmVQcm9taXNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxuLy8gU2FmYXJpIGJ1ZyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjAwODI5XG52YXIgTk9OX0dFTkVSSUMgPSAhIU5hdGl2ZVByb21pc2UgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICBOYXRpdmVQcm9taXNlLnByb3RvdHlwZVsnZmluYWxseSddLmNhbGwoeyB0aGVuOiBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0gfSwgZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbn0pO1xuXG4vLyBgUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLmZpbmFsbHlcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgcHJvdG86IHRydWUsIHJlYWw6IHRydWUsIGZvcmNlZDogTk9OX0dFTkVSSUMgfSwge1xuICAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBnZXRCdWlsdEluKCdQcm9taXNlJykpO1xuICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICAgIHJldHVybiB0aGlzLnRoZW4oXG4gICAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgICAgfSA6IG9uRmluYWxseSxcbiAgICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICAgIH0gOiBvbkZpbmFsbHlcbiAgICApO1xuICB9XG59KTtcblxuLy8gcGF0Y2ggbmF0aXZlIFByb21pc2UucHJvdG90eXBlIGZvciBuYXRpdmUgYXN5bmMgZnVuY3Rpb25zXG5pZiAoIUlTX1BVUkUgJiYgdHlwZW9mIE5hdGl2ZVByb21pc2UgPT0gJ2Z1bmN0aW9uJyAmJiAhTmF0aXZlUHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSkge1xuICByZWRlZmluZShOYXRpdmVQcm9taXNlLnByb3RvdHlwZSwgJ2ZpbmFsbHknLCBnZXRCdWlsdEluKCdQcm9taXNlJykucHJvdG90eXBlWydmaW5hbGx5J10pO1xufVxuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8ge30udG9TdHJpbmcgOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xufTtcbiIsInZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBmbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcblxudmFyIFRPX1NUUklORyA9ICd0b1N0cmluZyc7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcbnZhciBuYXRpdmVUb1N0cmluZyA9IFJlZ0V4cFByb3RvdHlwZVtUT19TVFJJTkddO1xuXG52YXIgTk9UX0dFTkVSSUMgPSBmYWlscyhmdW5jdGlvbiAoKSB7IHJldHVybiBuYXRpdmVUb1N0cmluZy5jYWxsKHsgc291cmNlOiAnYScsIGZsYWdzOiAnYicgfSkgIT0gJy9hL2InOyB9KTtcbi8vIEZGNDQtIFJlZ0V4cCN0b1N0cmluZyBoYXMgYSB3cm9uZyBuYW1lXG52YXIgSU5DT1JSRUNUX05BTUUgPSBuYXRpdmVUb1N0cmluZy5uYW1lICE9IFRPX1NUUklORztcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG5pZiAoTk9UX0dFTkVSSUMgfHwgSU5DT1JSRUNUX05BTUUpIHtcbiAgcmVkZWZpbmUoUmVnRXhwLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICB2YXIgUiA9IGFuT2JqZWN0KHRoaXMpO1xuICAgIHZhciBwID0gU3RyaW5nKFIuc291cmNlKTtcbiAgICB2YXIgcmYgPSBSLmZsYWdzO1xuICAgIHZhciBmID0gU3RyaW5nKHJmID09PSB1bmRlZmluZWQgJiYgUiBpbnN0YW5jZW9mIFJlZ0V4cCAmJiAhKCdmbGFncycgaW4gUmVnRXhwUHJvdG90eXBlKSA/IGZsYWdzLmNhbGwoUikgOiByZik7XG4gICAgcmV0dXJuICcvJyArIHAgKyAnLycgKyBmO1xuICB9LCB7IHVuc2FmZTogdHJ1ZSB9KTtcbn1cbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgJiYgaXQgIT09IG51bGwpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyBTdHJpbmcoaXQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAtLSBzYWZlICovXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICBzZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQ7XG4gICAgc2V0dGVyLmNhbGwodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIGFuT2JqZWN0KE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIuY2FsbChPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBtYWtlcyBzdWJjbGFzc2luZyB3b3JrIGNvcnJlY3QgZm9yIHdyYXBwZWQgYnVpbHQtaW5zXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkdGhpcywgZHVtbXksIFdyYXBwZXIpIHtcbiAgdmFyIE5ld1RhcmdldCwgTmV3VGFyZ2V0UHJvdG90eXBlO1xuICBpZiAoXG4gICAgLy8gaXQgY2FuIHdvcmsgb25seSB3aXRoIG5hdGl2ZSBgc2V0UHJvdG90eXBlT2ZgXG4gICAgc2V0UHJvdG90eXBlT2YgJiZcbiAgICAvLyB3ZSBoYXZlbid0IGNvbXBsZXRlbHkgY29ycmVjdCBwcmUtRVM2IHdheSBmb3IgZ2V0dGluZyBgbmV3LnRhcmdldGAsIHNvIHVzZSB0aGlzXG4gICAgdHlwZW9mIChOZXdUYXJnZXQgPSBkdW1teS5jb25zdHJ1Y3RvcikgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIE5ld1RhcmdldCAhPT0gV3JhcHBlciAmJlxuICAgIGlzT2JqZWN0KE5ld1RhcmdldFByb3RvdHlwZSA9IE5ld1RhcmdldC5wcm90b3R5cGUpICYmXG4gICAgTmV3VGFyZ2V0UHJvdG90eXBlICE9PSBXcmFwcGVyLnByb3RvdHlwZVxuICApIHNldFByb3RvdHlwZU9mKCR0aGlzLCBOZXdUYXJnZXRQcm90b3R5cGUpO1xuICByZXR1cm4gJHRoaXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTlNUUlVDVE9SX05BTUUpIHtcbiAgdmFyIENvbnN0cnVjdG9yID0gZ2V0QnVpbHRJbihDT05TVFJVQ1RPUl9OQU1FKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgQ29uc3RydWN0b3IgJiYgIUNvbnN0cnVjdG9yW1NQRUNJRVNdKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFNQRUNJRVMsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICAgIH0pO1xuICB9XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcbnZhciBnZXRGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcbnZhciBzdGlja3lIZWxwZXJzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJykuc2V0O1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xudmFyIE5hdGl2ZVJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gTmF0aXZlUmVnRXhwLnByb3RvdHlwZTtcbnZhciByZTEgPSAvYS9nO1xudmFyIHJlMiA9IC9hL2c7XG5cbi8vIFwibmV3XCIgc2hvdWxkIGNyZWF0ZSBhIG5ldyBvYmplY3QsIG9sZCB3ZWJraXQgYnVnXG52YXIgQ09SUkVDVF9ORVcgPSBuZXcgTmF0aXZlUmVnRXhwKHJlMSkgIT09IHJlMTtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBzdGlja3lIZWxwZXJzLlVOU1VQUE9SVEVEX1k7XG5cbnZhciBGT1JDRUQgPSBERVNDUklQVE9SUyAmJiBpc0ZvcmNlZCgnUmVnRXhwJywgKCFDT1JSRUNUX05FVyB8fCBVTlNVUFBPUlRFRF9ZIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmUyW01BVENIXSA9IGZhbHNlO1xuICAvLyBSZWdFeHAgY29uc3RydWN0b3IgY2FuIGFsdGVyIGZsYWdzIGFuZCBJc1JlZ0V4cCB3b3JrcyBjb3JyZWN0IHdpdGggQEBtYXRjaFxuICByZXR1cm4gTmF0aXZlUmVnRXhwKHJlMSkgIT0gcmUxIHx8IE5hdGl2ZVJlZ0V4cChyZTIpID09IHJlMiB8fCBOYXRpdmVSZWdFeHAocmUxLCAnaScpICE9ICcvYS9pJztcbn0pKSk7XG5cbi8vIGBSZWdFeHBgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC1jb25zdHJ1Y3RvclxuaWYgKEZPUkNFRCkge1xuICB2YXIgUmVnRXhwV3JhcHBlciA9IGZ1bmN0aW9uIFJlZ0V4cChwYXR0ZXJuLCBmbGFncykge1xuICAgIHZhciB0aGlzSXNSZWdFeHAgPSB0aGlzIGluc3RhbmNlb2YgUmVnRXhwV3JhcHBlcjtcbiAgICB2YXIgcGF0dGVybklzUmVnRXhwID0gaXNSZWdFeHAocGF0dGVybik7XG4gICAgdmFyIGZsYWdzQXJlVW5kZWZpbmVkID0gZmxhZ3MgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgc3RpY2t5O1xuXG4gICAgaWYgKCF0aGlzSXNSZWdFeHAgJiYgcGF0dGVybklzUmVnRXhwICYmIHBhdHRlcm4uY29uc3RydWN0b3IgPT09IFJlZ0V4cFdyYXBwZXIgJiYgZmxhZ3NBcmVVbmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH1cblxuICAgIGlmIChDT1JSRUNUX05FVykge1xuICAgICAgaWYgKHBhdHRlcm5Jc1JlZ0V4cCAmJiAhZmxhZ3NBcmVVbmRlZmluZWQpIHBhdHRlcm4gPSBwYXR0ZXJuLnNvdXJjZTtcbiAgICB9IGVsc2UgaWYgKHBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHBXcmFwcGVyKSB7XG4gICAgICBpZiAoZmxhZ3NBcmVVbmRlZmluZWQpIGZsYWdzID0gZ2V0RmxhZ3MuY2FsbChwYXR0ZXJuKTtcbiAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNvdXJjZTtcbiAgICB9XG5cbiAgICBpZiAoVU5TVVBQT1JURURfWSkge1xuICAgICAgc3RpY2t5ID0gISFmbGFncyAmJiBmbGFncy5pbmRleE9mKCd5JykgPiAtMTtcbiAgICAgIGlmIChzdGlja3kpIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgveS9nLCAnJyk7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IGluaGVyaXRJZlJlcXVpcmVkKFxuICAgICAgQ09SUkVDVF9ORVcgPyBuZXcgTmF0aXZlUmVnRXhwKHBhdHRlcm4sIGZsYWdzKSA6IE5hdGl2ZVJlZ0V4cChwYXR0ZXJuLCBmbGFncyksXG4gICAgICB0aGlzSXNSZWdFeHAgPyB0aGlzIDogUmVnRXhwUHJvdG90eXBlLFxuICAgICAgUmVnRXhwV3JhcHBlclxuICAgICk7XG5cbiAgICBpZiAoVU5TVVBQT1JURURfWSAmJiBzdGlja3kpIHNldEludGVybmFsU3RhdGUocmVzdWx0LCB7IHN0aWNreTogc3RpY2t5IH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgdmFyIHByb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGtleSBpbiBSZWdFeHBXcmFwcGVyIHx8IGRlZmluZVByb3BlcnR5KFJlZ0V4cFdyYXBwZXIsIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBOYXRpdmVSZWdFeHBba2V5XTsgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKGl0KSB7IE5hdGl2ZVJlZ0V4cFtrZXldID0gaXQ7IH1cbiAgICB9KTtcbiAgfTtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKE5hdGl2ZVJlZ0V4cCk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHdoaWxlIChrZXlzLmxlbmd0aCA+IGluZGV4KSBwcm94eShrZXlzW2luZGV4KytdKTtcbiAgUmVnRXhwUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnRXhwV3JhcHBlcjtcbiAgUmVnRXhwV3JhcHBlci5wcm90b3R5cGUgPSBSZWdFeHBQcm90b3R5cGU7XG4gIHJlZGVmaW5lKGdsb2JhbCwgJ1JlZ0V4cCcsIFJlZ0V4cFdyYXBwZXIpO1xufVxuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAtQEBzcGVjaWVzXG5zZXRTcGVjaWVzKCdSZWdFeHAnKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBpc0Jyb3dzZXIoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vZGUoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKGVyciwgb3B0aW9ucykge1xuICAgIGVyci5tZXNzYWdlID0gZXJyLm1lc3NhZ2UgfHwgbnVsbDtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBvcHRpb25zO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIG9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW2tleV07XG4gICAgICAgICAgICBlcnJba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMubWVzc2FnZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlcnIubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5jb2RlICE9IG51bGwgfHwgb3B0aW9ucy5tZXNzYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGVyci5jb2RlID0gb3B0aW9ucy5jb2RlIHx8IG9wdGlvbnMubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5zdGFjayAhPSBudWxsKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBvcHRpb25zLnN0YWNrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXJyLm5hbWUgPSBvcHRpb25zPy5uYW1lIHx8IGVyci5uYW1lIHx8IGVyci5jb2RlIHx8ICdFcnJvcic7XG4gICAgZXJyLnRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgcmV0dXJuIGVycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcbiAgICAgICAgY29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMDtcbiAgICAgICAgY29uc3QgdiA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XG5cbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbShmaWVsZCwgdXJsKSB7XG4gICAgY29uc3QgaHJlZiA9IHVybCB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKCdbPyZdJyArIGZpZWxkICsgJz0oW14mI10qKScsICdpJyk7XG4gICAgY29uc3Qgc3RyaW5nID0gcmVnLmV4ZWMoaHJlZik7XG5cbiAgICBpZiAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdbMV07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21OdW1iZXJCZXR3ZWVuKGZyb20sIHRvKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRvKSArIGZyb207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRPUygpIHtcbiAgICBsZXQgbmFtZSA9IG51bGw7XG4gICAgY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICAgIGlmICh1YS5pbmRleE9mKCdXaW5kb3dzJykgPiAtMSkge1xuICAgICAgICBuYW1lID0gJ1dpbmRvd3MnO1xuICAgIH0gZWxzZSBpZiAodWEuaW5kZXhPZignTWFjJykgPiAtMSkge1xuICAgICAgICBuYW1lID0gJ21hY09TJztcbiAgICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ1gxMScpID4gLTEpIHtcbiAgICAgICAgbmFtZSA9ICd1bml4JztcbiAgICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ0xpbnV4JykgPiAtMSkge1xuICAgICAgICBuYW1lID0gJ0xpbnV4JztcbiAgICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ2lPUycpID4gLTEpIHtcbiAgICAgICAgbmFtZSA9ICdpT1MnO1xuICAgIH0gZWxzZSBpZiAodWEuaW5kZXhPZignQW5kcm9pZCcpID4gLTEpIHtcbiAgICAgICAgbmFtZSA9ICdBbmRyb2lkJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERldmljZUNhdGVnb3J5KCkge1xuICAgIGxldCBkZXZpY2VDYXRlZ29yeSA9ICdkZXNrdG9wJztcblxuICAgIGlmIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09ICdpUG9kJyB8fCBuYXZpZ2F0b3IucGxhdGZvcm0gPT09ICdpUGhvbmUnKSB7XG4gICAgICAgIGRldmljZUNhdGVnb3J5ID0gJ21vYmlsZSc7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09ICdpUGFkJykge1xuICAgICAgICBkZXZpY2VDYXRlZ29yeSA9ICd0YWJsZXQnO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ0FuZHJvaWQnIHx8XG4gICAgICAgIC9hbmRyb2lkL2dpLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgaWYgKC90YWJsZXQvZ2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgZGV2aWNlQ2F0ZWdvcnkgPSAndGFibGV0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRldmljZUNhdGVnb3J5ID0gJ21vYmlsZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGV2aWNlQ2F0ZWdvcnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb2ludGVyKCkge1xuICAgIGxldCBwb2ludGVyID0gJ2ZpbmUnO1xuXG4gICAgaWYgKG1hdGNoTWVkaWEoJyhwb2ludGVyOmNvYXJzZSknKS5tYXRjaGVzKSB7XG4gICAgICAgIHBvaW50ZXIgPSAnY29hcnNlJztcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWVudGF0aW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBpZiAod2lkdGggPT09IGhlaWdodCkge1xuICAgICAgICByZXR1cm4gJ3F1YWRyYXRpYyc7XG4gICAgfSBlbHNlIGlmICh3aWR0aCA+IGhlaWdodCkge1xuICAgICAgICByZXR1cm4gJ2hvcml6b250YWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAndmVydGljYWwnO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcmVlbkRpbWVuc2lvbnMoKSB7XG4gICAgY29uc3QgZGVuc2l0eSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID8/IDE7XG4gICAgY29uc3QgbG9naWNhbCA9IHtcbiAgICAgICAgd2lkdGg6IHdpbmRvdy5zY3JlZW4ud2lkdGgsXG4gICAgICAgIGhlaWdodDogd2luZG93LnNjcmVlbi5oZWlnaHRcbiAgICB9O1xuICAgIGNvbnN0IHBoeXNpY2FsID0ge1xuICAgICAgICB3aWR0aDogTWF0aC5yb3VuZChsb2dpY2FsLndpZHRoICogZGVuc2l0eSksXG4gICAgICAgIGhlaWdodDogTWF0aC5yb3VuZChsb2dpY2FsLmhlaWdodCAqIGRlbnNpdHkpXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlbnNpdHksXG4gICAgICAgIGxvZ2ljYWwsXG4gICAgICAgIHBoeXNpY2FsXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFV0Y09mZnNldFNlY29uZHMoKSB7XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBqYW4xID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCksIDAsIDEsIDAsIDAsIDAsIDApO1xuICAgIGNvbnN0IHRtcCA9IGphbjEudG9HTVRTdHJpbmcoKTtcbiAgICBjb25zdCBqYW4yID0gbmV3IERhdGUodG1wLnN1YnN0cmluZygwLCB0bXAubGFzdEluZGV4T2YoJyAnKSAtIDEpKTtcbiAgICBjb25zdCBzdGRUaW1lT2Zmc2V0ID0gKGphbjEgLSBqYW4yKSAvIDEwMDA7XG5cbiAgICByZXR1cm4gc3RkVGltZU9mZnNldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFV0Y0RzdE9mZnNldFNlY29uZHMoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2xvckJyaWdodG5lc3MoY29sb3IpIHtcbiAgICBjb2xvciA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgdmFyIGhleCA9IHBhcnNlSW50KChoZXggKyAnJykucmVwbGFjZSgvW15hLWYwLTldL2dpLCAnJyksIDE2KTtcbiAgICBjb25zdCByZ2IgPSBbXTtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBsZXQgeCA9IDA7XG5cbiAgICB3aGlsZSAoeCA8IDMpIHtcbiAgICAgICAgY29uc3QgcyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygyICogeCwgMiksIDE2KTtcbiAgICAgICAgcmdiW3hdID0gcztcblxuICAgICAgICBpZiAocyA+IDApIHtcbiAgICAgICAgICAgIHN1bSArPSBzO1xuICAgICAgICB9XG5cbiAgICAgICAgKyt4O1xuICAgIH1cblxuICAgIGlmIChzdW0gPD0gMzgxKSB7XG4gICAgICAgIHJldHVybiAnZGFyayc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdsaWdodCc7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYnRvYShzdHIpIHtcbiAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5idG9hKHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG51bGw7XG5cbiAgICAgICAgaWYgKHN0ciBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgICAgICAgICAgYnVmZmVyID0gc3RyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnVmZmVyID0gQnVmZmVyLmZyb20oc3RyLnRvU3RyaW5nKCksICdiaW5hcnknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBidWZmZXIudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNodW5rKGFyciwgc2l6ZSkge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgIHdoaWxlIChhcnIubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChhcnIuc3BsaWNlKDAsIHNpemUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZuLCB0aHJlc2hvbGQgPSAyNTAsIHNjb3BlKSB7XG4gICAgbGV0IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGRlZmVyVGltZXIgPSB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gc2NvcGUgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xuXG4gICAgICAgICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGFzdCA9IG5vdztcblxuICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfSwgdGhyZXNob2xkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW1hZ2Uoc3JjLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IGNhbGxiYWNrKG51bGwsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiBjYWxsYmFjayhuZXcgRXJyb3IoKSk7XG4gICAgaW1nLnNyYyA9IHNyYztcblxuICAgIHJldHVybiBpbWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShsYXQxLCBsbmcxLCBsYXQyLCBsbmcyKSB7XG4gICAgY29uc3QgcmFkbGF0MSA9IChNYXRoLlBJICogbGF0MSkgLyAxODA7XG4gICAgY29uc3QgcmFkbGF0MiA9IChNYXRoLlBJICogbGF0MikgLyAxODA7XG4gICAgY29uc3QgdGhldGEgPSBsbmcxIC0gbG5nMjtcbiAgICBjb25zdCByYWR0aGV0YSA9IChNYXRoLlBJICogdGhldGEpIC8gMTgwO1xuICAgIGxldCBkaXN0ID1cbiAgICAgICAgTWF0aC5zaW4ocmFkbGF0MSkgKiBNYXRoLnNpbihyYWRsYXQyKSArXG4gICAgICAgIE1hdGguY29zKHJhZGxhdDEpICogTWF0aC5jb3MocmFkbGF0MikgKiBNYXRoLmNvcyhyYWR0aGV0YSk7XG4gICAgZGlzdCA9IE1hdGguYWNvcyhkaXN0KTtcbiAgICBkaXN0ID0gKGRpc3QgKiAxODApIC8gTWF0aC5QSTtcbiAgICBkaXN0ID0gZGlzdCAqIDYwICogMS4xNTE1O1xuICAgIGRpc3QgPSBkaXN0ICogMS42MDkzNDQgKiAxMDAwO1xuXG4gICAgcmV0dXJuIGRpc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsLCBzKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHxcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuXG4gICAgZG8ge1xuICAgICAgICBpZiAobWF0Y2hlcy5jYWxsKGVsLCBzKSkgcmV0dXJuIGVsO1xuXG4gICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcblxuICAgIHJldHVybiBudWxsO1xufTtcblxuLy8gTWV0aG9kIGZvciB3cmFwcGluZyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBjYWxsYmFjayBpbiBhbnkgcG9zaXRpb25cbi8vIHRvIHJldHVybiBwcm9taXNlcyBpZiBubyBjYWxsYmFjayBpcyBnaXZlbiBpbiBhIGNhbGwuXG4vLyBUaGUgc2Vjb25kIGFyZ3VtZW50LCBjYlBhcmFtZXRlckluZGV4LCBpcyB0aGUgcG9zaXRpb24gb2YgdGhlIGNhbGxiYWNrIGluIHRoZSBvcmlnaW5hbCBmdW5jdGlvbnMgcGFyYW1ldGVyIGxpc3QuXG4vLyBDb2ZmZWVTY3JpcHQgb3B0aW9uYWwgcGFyYW1ldGVycyBtZXNzZXMgd2l0aCB0aGlzIGZ1bmN0aW9uIGFyaXR5IGRldGVjdGlvbixcbi8vIG5vdCBzdXJlIHdoYXQgdG8gZG8gYWJvdXQgdGhhdCwgb3RoZXIgdGhhbiBhbHdheXMgc2V0dGluZyBjYlBhcmFtZXRlckluZGV4IGF0IGNhbGxzaXRlcy5cbmV4cG9ydCBmdW5jdGlvbiBwcm9taXNlQ2FsbGJhY2tJbnRlcm9wKGZ1biwgY2JQYXJhbWV0ZXJJbmRleCA9IGZ1bi5sZW5ndGggLSAxKSB7XG4gICAgLy8gVGhpcyBpcyB0aGUgZnVuY3Rpb24gdGhhdCBhY3R1YWxseSB3cmFwcyBhbmQgY2FsbHMgYSBtZXRob2QgdG8gcmV0dXJuIGEgcHJvbWlzZS5cbiAgICBjb25zdCBtYWtlUHJvbWlzZSA9IChmdW4sIGNiUGFyYW1ldGVySW5kZXgsIHBhcmFtZXRlcnMpID0+XG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5lb0NhbGxiYWNrID0gKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBjYWxsUGFyYW1ldGVycyA9IFtdO1xuICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgICBsZXQgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IE1hdGgubWF4KHBhcmFtZXRlcnMubGVuZ3RoLCBjYlBhcmFtZXRlckluZGV4KSArIDEsXG4gICAgICAgICAgICAgICAgICAgIGFzYyA9IDAgPD0gZW5kO1xuICAgICAgICAgICAgICAgIGFzYyA/IGkgPCBlbmQgOiBpID4gZW5kO1xuICAgICAgICAgICAgICAgIGFzYyA/IGkrKyA6IGktLVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY2FsbFBhcmFtZXRlcnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgaSA9PT0gY2JQYXJhbWV0ZXJJbmRleCA/IG5lb0NhbGxiYWNrIDogcGFyYW1ldGVyc1tpXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmdW4uYXBwbHkodGhpcywgY2FsbFBhcmFtZXRlcnMpO1xuICAgICAgICB9KTtcbiAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRoYXQgZGVjaWRlcyB3aGF0IHRvIGRvIHBlci1jYWxsLlxuICAgIHJldHVybiAoLi4ucGFyYW1ldGVycykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHBhcmFtZXRlcnNbY2JQYXJhbWV0ZXJJbmRleF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIENhbGxiYWNrIGdpdmVuLCBkbyBhIHJlZ3VsYXIgb2xkIGNhbGwuXG4gICAgICAgICAgICByZXR1cm4gZnVuLmFwcGx5KG51bGwsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBQcm9taXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBObyBjYWxsYmFjayBnaXZlbiwgYW5kIHdlIGhhdmUgcHJvbWlzZSBzdXBwb3J0LCB1c2UgbWFrZVByb21pc2UgdG8gd3JhcCB0aGUgY2FsbC5cbiAgICAgICAgICAgIHJldHVybiBtYWtlUHJvbWlzZShmdW4sIGNiUGFyYW1ldGVySW5kZXgsIHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQWluJ3QgZ290IGNhbGxiYWNrLCBhaW4ndCBnb3QgcHJvbWlzZSBzdXBwb3J0OyB3ZSBnb3R0YSB0ZWxsIHRoZSBkZXZlbG9wZXIuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRvIGJlIGFibGUgdG8gdXNlIHRoaXMgYXN5bmNocm9ub3VzIG1ldGhvZCB5b3Ugc2hvdWxkOlxuU3VwcGx5IGEgY2FsbGJhY2sgZnVuY3Rpb24gYXMgYXJndW1lbnQgIyR7MSArIGNiUGFyYW1ldGVySW5kZXh9LlxuVGhpcyBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBtZXRob2QgY2FsbCByZXNwb25zZS5cbkFsdGVybmF0aXZlbHksIHdoZW4gc3VwcG9ydGVkLCBpdCBjYW4gcmV0dXJuIGEgUHJvbWlzZSBpZiBubyBjYWxsYmFjayBmdW5jdGlvbiBpcyBnaXZlbi5cXFxuYCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IE1pY3JvRXZlbnQgZnJvbSAnbWljcm9ldmVudCc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnY3Jvc3MtZmV0Y2gnO1xuaW1wb3J0ICcuL2luY2l0by5zdHlsJztcbmltcG9ydCB7XG4gICAgaXNEZWZpbmVkU3RyLFxuICAgIGZvcm1hdFVuaXQsXG4gICAgZXNjYXBlSFRNTCxcbiAgICBlc2NhcGVBdHRyVmFsdWUsXG4gICAgZ2V0U2hhZG93LFxuICAgIGdldFRyYW5zZm9ybXMsXG4gICAgcGFyc2VTcGFucyxcbiAgICBnZXRUZXh0U2hhZG93LFxuICAgIGxvYWRGb250c1xufSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7Y2xvc2VzdH0gZnJvbSAnLi4vdXRpbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluY2l0byBleHRlbmRzIE1pY3JvRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lckVsLCB7aW5jaXRvID0ge319KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXJFbCA9IGNvbnRhaW5lckVsO1xuICAgICAgICB0aGlzLmluY2l0byA9IGluY2l0bztcbiAgICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLnNlY3Rpb25zID0gW107XG4gICAgICAgIHRoaXMuY2FuTGF6eWxvYWQgPSAnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdztcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHRoZW1lID0gdGhpcy5pbmNpdG8udGhlbWUgfHwge307XG5cbiAgICAgICAgbG9hZEZvbnRzKHRoaXMuaW5jaXRvLmZvbnRfYXNzZXRzKTtcblxuICAgICAgICB0aGlzLmVsLmRhdGFzZXQucmVhZG1lID0gJ0luY2l0byBieSBUamVrIChodHRwczovL2luY2l0by5pbyknO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTmFtZSA9ICdpbmNpdG8nO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoZW1lLmZvbnRfZmFtaWx5KSkge1xuICAgICAgICAgICAgdGhpcy5lbC5zdHlsZS5mb250RmFtaWx5ID0gdGhlbWUuZm9udF9mYW1pbHlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCh2LCBpLCBhKSA9PiBhLmluZGV4T2YodikgPT09IGkpXG4gICAgICAgICAgICAgICAgLmpvaW4oJywgJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHRoZW1lLmJhY2tncm91bmRfY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoZW1lLmJhY2tncm91bmRfY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHRoZW1lLnRleHRfY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmNvbG9yID0gdGhlbWUudGV4dF9jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodGhlbWUuc3R5bGUpKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICAgICAgICB0aGlzLnN0eWxlRWwuaW5uZXJUZXh0ID0gdGhlbWUuc3R5bGU7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZUVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhlbWUubGluZV9zcGFjaW5nX211bHRpcGxpZXIgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLmVsLnN0eWxlLmxpbmVIZWlnaHQgPSB0aGVtZS5saW5lX3NwYWNpbmdfbXVsdGlwbGllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ5IHNldHRpbmcgdGhlIGxhbmd1YWdlIHdlIGhlbHAgdGhlIGJyb3dzZXIgd2l0aCBzdHVmZiBsaWtlIGh5cGhlbmF0aW9uLlxuICAgICAgICBpZiAodGhpcy5pbmNpdG8ubG9jYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdsYW5nJywgdGhpcy5pbmNpdG8ubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXJIdG1sKHRoaXMuaW5jaXRvLnJvb3Rfdmlldyk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcblxuICAgICAgICBpZiAodGhpcy5jYW5MYXp5bG9hZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVMYXp5bG9hZGluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBjbG9zZXN0KGUudGFyZ2V0LCAnLmluY2l0b19fdmlldyBbZGF0YS1saW5rXScpO1xuICAgICAgICAgICAgY29uc3QgbGluayA9IGVsID8gZWwuZGF0YXNldC5saW5rIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKGlzRGVmaW5lZFN0cihsaW5rKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGxpbmssICdfYmxhbmsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FuTGF6eWxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUVsZW1lbnRzKHRoaXMuZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdzdGFydGVkJyk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF6eU9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxhenlPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52aWRlb09ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250YWluZXJFbC5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcblxuICAgICAgICBpZiAodGhpcy5zdHlsZUVsKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnN0eWxlRWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdkZXN0cm95ZWQnKTtcbiAgICB9XG5cbiAgICBvYnNlcnZlRWxlbWVudHMoZWwpIHtcbiAgICAgICAgZWwucXVlcnlTZWxlY3RvckFsbCgnLmluY2l0by0tbGF6eScpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhenlPYnNlcnZlci5vYnNlcnZlKGVsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLmluY2l0b19fdmlkZW8tdmlld1tkYXRhLWF1dG9wbGF5PXRydWVdJylcbiAgICAgICAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9PYnNlcnZlci5vYnNlcnZlKGVsKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRFbChlbCkge1xuICAgICAgICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndmlkZW8nICYmICFlbC5kYXRhc2V0LmlzTGF6eWxvYWRlZCkge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcblxuICAgICAgICAgICAgc291cmNlRWwuc2V0QXR0cmlidXRlKCdzcmMnLCBlbC5kYXRhc2V0LnNyYyk7XG4gICAgICAgICAgICBzb3VyY2VFbC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBlbC5kYXRhc2V0Lm1pbWUpO1xuXG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChzb3VyY2VFbCk7XG4gICAgICAgICAgICBlbC5sb2FkKCk7XG4gICAgICAgICAgICBlbC5kYXRhc2V0LmlzTGF6eWxvYWRlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbmNpdG9fX2luY2l0by1lbWJlZC12aWV3JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGVsLmRhdGFzZXQuc3JjO1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gZWwuZGF0YXNldC5tZXRob2Q7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gZWwuZGF0YXNldC5ib2R5O1xuXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCB8fCAnZ2V0JyxcbiAgICAgICAgICAgICAgICBib2R5OiBib2R5ID8gSlNPTi5wYXJzZSh1bmVzY2FwZShib2R5KSkgOiBudWxsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXJIdG1sKHJlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlRWxlbWVudHMoZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGVsLmRhdGFzZXQuYmcpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtlbC5kYXRhc2V0LmJnfSlgO1xuICAgICAgICB9IGVsc2UgaWYgKGVsLmRhdGFzZXQuc3JjKSB7XG4gICAgICAgICAgICBlbC5zcmMgPSBlbC5kYXRhc2V0LnNyYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuYWJsZUxhenlsb2FkaW5nKCkge1xuICAgICAgICB0aGlzLmxhenlPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcbiAgICAgICAgICAgIChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEVsKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhenlPYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByb290TWFyZ2luOiAnNTAwcHggMHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnZpZGVvT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAgICAgICAoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdXRvcGxheVN0YXRlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuZGF0YXNldC5hdXRvcGxheVN0YXRlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRFbChlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXp5T2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXV0b3BsYXlTdGF0ZSB8fCBhdXRvcGxheVN0YXRlID09PSAncGF1c2VkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LnRhcmdldC5kYXRhc2V0LmF1dG9wbGF5U3RhdGUgPSAncGxheWluZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZW50cnkudGFyZ2V0LnBhdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LmRhdGFzZXQuYXV0b3BsYXlTdGF0ZSA9ICdwYXVzZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkudGFyZ2V0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVmlldyh2aWV3KSB7XG4gICAgICAgIGxldCB0YWdOYW1lID0gJ2Rpdic7XG4gICAgICAgIGxldCBjb250ZW50cztcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IFsnaW5jaXRvX192aWV3J107XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHt9O1xuICAgICAgICBjb25zdCBhdHRycyA9IHt9O1xuXG4gICAgICAgIGlmICh2aWV3LnZpZXdfbmFtZSA9PT0gJ1RleHRWaWV3Jykge1xuICAgICAgICAgICAgdGFnTmFtZSA9ICdwJztcbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnaW5jaXRvX190ZXh0LXZpZXcnKTtcblxuICAgICAgICAgICAgY29uc3QgdGV4dFN0eWxlcyA9ICh2aWV3LnRleHRfc3R5bGUgfHwgJycpLnNwbGl0KCd8Jyk7XG4gICAgICAgICAgICBsZXQge3RleHR9ID0gdmlldztcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmlldy5zcGFucykgJiYgdmlldy5zcGFucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkVGV4dCA9IHBhcnNlU3BhbnModGV4dCwgdmlldy5zcGFucyk7XG5cbiAgICAgICAgICAgICAgICB0ZXh0ID0gcGFyc2VkVGV4dC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXNjYXBlZFRleHQgPSBlc2NhcGVIVE1MKGl0ZW0udGV4dCB8fCAnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3Bhbj8ubmFtZSA9PT0gJ2xpbmsnICYmIGl0ZW0uc3Bhbi51cmwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8YSBocmVmPVwiJHtlbmNvZGVVUkkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zcGFuLnVybFxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cIiByZWw9XCJleHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPiR7ZXNjYXBlZFRleHR9PC9hPmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3Bhbj8ubmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGFuTmFtZSA9IGl0ZW0uc3Bhbi5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxzcGFuIGRhdGEtbmFtZT1cIiR7c3Bhbk5hbWV9XCI+JHtlc2NhcGVkVGV4dH08L3NwYW4+YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXNjYXBlZFRleHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQuam9pbignJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRleHQgPSBlc2NhcGVIVE1MKHRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmlldy50ZXh0X3ByZXZlbnRfd2lkb3cpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dFxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJm5ic3A7KFteXFxzXSspJC8sICcgJDEnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKFteXFxzXSspXFxzKiQvLCAnJm5ic3A7JDEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGVudHMgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheSh2aWV3LmZvbnRfZmFtaWx5KSAmJlxuICAgICAgICAgICAgICAgIHZpZXcuZm9udF9mYW1pbHkubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzWydmb250LWZhbWlseSddID0gdmlldy5mb250X2ZhbWlseS5qb2luKCcsICcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmlldy50ZXh0X3NpemUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN0eWxlc1snZm9udC1zaXplJ10gPSBgJHt2aWV3LnRleHRfc2l6ZX1weGA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2aWV3LmxpbmVfc3BhY2luZ19tdWx0aXBsaWVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNbJ2xpbmUtaGVpZ2h0J10gPSB2aWV3LmxpbmVfc3BhY2luZ19tdWx0aXBsaWVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmlldy50ZXh0X2NvbG9yICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXMuY29sb3IgPSB2aWV3LnRleHRfY29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0ZXh0U3R5bGVzLmluZGV4T2YoJ2JvbGQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNbJ2ZvbnQtd2VpZ2h0J10gPSAnYm9sZCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0ZXh0U3R5bGVzLmluZGV4T2YoJ2l0YWxpYycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN0eWxlc1snZm9udC1zdHlsZSddID0gJ2l0YWxpYyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZpZXcudGV4dF9kZWNvcmF0aW9uX2xpbmUpKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzWyd0ZXh0LWRlY29yYXRpb24tbGluZSddID0gdmlldy50ZXh0X2RlY29yYXRpb25fbGluZS5qb2luKFxuICAgICAgICAgICAgICAgICAgICAnICdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0ZXh0U2hhZG93ID0gZ2V0VGV4dFNoYWRvdyh2aWV3KTtcblxuICAgICAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih2aWV3LnRleHRfc2hhZG93KSkge1xuICAgICAgICAgICAgICAgIHN0eWxlc1sndGV4dC1zaGFkb3cnXSA9IHZpZXcudGV4dF9zaGFkb3c7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRleHRTaGFkb3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN0eWxlc1tcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQtc2hhZG93J1xuICAgICAgICAgICAgICAgIF0gPSBgJHt0ZXh0U2hhZG93LmR4fXB4ICR7dGV4dFNoYWRvdy5keX1weCAke3RleHRTaGFkb3cucmFkaXVzfXB4ICR7dGV4dFNoYWRvdy5jb2xvcn1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmlldy50ZXh0X2FsaWdubWVudCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzWyd0ZXh0LWFsaWduJ10gPSAnbGVmdCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXcudGV4dF9hbGlnbm1lbnQgPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzWyd0ZXh0LWFsaWduJ10gPSAnY2VudGVyJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmlldy50ZXh0X2FsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHN0eWxlc1sndGV4dC1hbGlnbiddID0gJ3JpZ2h0JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZpZXcuc2luZ2xlX2xpbmUgPT09IHRydWUgfHwgdmlldy5tYXhfbGluZXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBhdHRyc1snZGF0YS1zaW5nbGUtbGluZSddID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZpZXcubWF4X2xpbmVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHN0eWxlcy5kaXNwbGF5ID0gJy13ZWJraXQtYm94JztcbiAgICAgICAgICAgICAgICBzdHlsZXNbJy13ZWJraXQtbGluZS1jbGFtcCddID0gdmlldy5tYXhfbGluZXM7XG4gICAgICAgICAgICAgICAgc3R5bGVzWyctd2Via2l0LWJveC1vcmllbnQnXSA9ICd2ZXJ0aWNhbCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2aWV3LnRleHRfYWxsX2NhcHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNbJ3RleHQtdHJhbnNmb3JtJ10gPSAndXBwZXJjYXNlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2aWV3LnZpZXdfbmFtZSA9PT0gJ0ltYWdlVmlldycpIHtcbiAgICAgICAgICAgIHRhZ05hbWUgPSAnaW1nJztcbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnaW5jaXRvX19pbWFnZS12aWV3Jyk7XG5cbiAgICAgICAgICAgIGF0dHJzLm9uZXJyb3IgPSBgdGhpcy5zdHlsZS5kaXNwbGF5PSdub25lJ2A7XG5cbiAgICAgICAgICAgIGlmIChpc0RlZmluZWRTdHIodmlldy5zcmMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuTGF6eWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdpbmNpdG8tLWxhenknKTtcblxuICAgICAgICAgICAgICAgICAgICBhdHRyc1snZGF0YS1zcmMnXSA9IHZpZXcuc3JjO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzLnNyYyA9IHZpZXcuc3JjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih2aWV3LmxhYmVsKSkge1xuICAgICAgICAgICAgICAgIGF0dHJzWydhbHQnXSA9IHZpZXcubGFiZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmlldy52aWV3X25hbWUgPT09ICdWaWRlb1ZpZXcnKSB7XG4gICAgICAgICAgICB0YWdOYW1lID0gJ3ZpZGVvJztcbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnaW5jaXRvX192aWRlby12aWV3Jyk7XG5cbiAgICAgICAgICAgIGF0dHJzLm11dGVkID0gJyc7XG4gICAgICAgICAgICBhdHRycy5wbGF5c2lubGluZSA9ICcnO1xuICAgICAgICAgICAgYXR0cnMucHJlbG9hZCA9ICdub25lJztcbiAgICAgICAgICAgIGF0dHJzLnBvc3RlciA9ICdub3Bvc3Rlcic7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkxhenlsb2FkKSB7XG4gICAgICAgICAgICAgICAgYXR0cnNbJ2RhdGEtc3JjJ10gPSB2aWV3LnNyYztcbiAgICAgICAgICAgICAgICBhdHRyc1snZGF0YS1taW1lJ10gPSB2aWV3Lm1pbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodmlldy5hdXRvcGxheSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyc1snZGF0YS1hdXRvcGxheSddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodmlldy5jb250cm9scyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRyc1snY29udHJvbHMnXSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh2aWV3Lmxvb3AgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnNbJ2xvb3AnXSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0cnMuc3JjID0gdmlldy5zcmM7XG4gICAgICAgICAgICAgICAgYXR0cnMuY29udHJvbHMgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuTGF6eWxvYWQpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2luY2l0by0tbGF6eScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZpZXcudmlld19uYW1lID09PSAnSFRNTFZpZXcnKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHZpZXcuc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgdmlldy5zdHlsZVxuICAgICAgICAgICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnOycpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKChzdHlsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gc3R5bGUudHJpbSgpLnNwbGl0KCc6Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgdmlldy52aWV3X25hbWUgPT09ICdWaWRlb0VtYmVkVmlldycgfHxcbiAgICAgICAgICAgIHZpZXcudmlld19uYW1lID09PSAnSFRNTEVtYmVkVmlldydcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0YWdOYW1lID0gJ2lmcmFtZSc7XG4gICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2luY2l0b19faHRtbC1lbWJlZC12aWV3Jyk7XG5cbiAgICAgICAgICAgIGF0dHJzLnNhbmRib3ggPSAnYWxsb3ctc2NyaXB0cyBhbGxvdy1zYW1lLW9yaWdpbic7XG4gICAgICAgICAgICBhdHRycy5hbGxvd2Z1bGxzY3JlZW4gPSAnJztcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuTGF6eWxvYWQpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnB1c2goJ2luY2l0by0tbGF6eScpO1xuICAgICAgICAgICAgICAgIGF0dHJzWydkYXRhLXNyYyddID0gdmlldy5zcmM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dHJzLnNyYyA9IHZpZXcuc3JjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZpZXcudmlld19uYW1lID09PSAnSW5jaXRvRW1iZWRWaWV3Jykge1xuICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdpbmNpdG9fX2luY2l0by1lbWJlZC12aWV3Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkxhenlsb2FkKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdpbmNpdG8tLWxhenknKTtcblxuICAgICAgICAgICAgICAgIGF0dHJzWydkYXRhLXNyYyddID0gdmlldy5zcmM7XG5cbiAgICAgICAgICAgICAgICBpZiAodmlldy5tZXRob2QgPT09ICdnZXQnIHx8IHZpZXcubWV0aG9kID09PSAncG9zdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnNbJ2RhdGEtbWV0aG9kJ10gPSB2aWV3Lm1ldGhvZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodmlldy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzWydkYXRhLWJvZHknXSA9IGVzY2FwZShKU09OLnN0cmluZ2lmeSh2aWV3LmJvZHkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmlldy52aWV3X25hbWUgPT09ICdBYnNvbHV0ZUxheW91dCcpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnaW5jaXRvX19hYnNvbHV0ZS1sYXlvdXQtdmlldycpO1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXcudmlld19uYW1lID09PSAnRmxleExheW91dCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGZsZXhBbGlnbkl0ZW1Nb2RlcyA9IFtcbiAgICAgICAgICAgICAgICAnc3RyZXRjaCcsXG4gICAgICAgICAgICAgICAgJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAgICAgICAgICdmbGV4LWVuZCcsXG4gICAgICAgICAgICAgICAgJ2Jhc2VsaW5lJ1xuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGNvbnN0IGZsZXhKdXN0aWZ5TW9kZXMgPSBbXG4gICAgICAgICAgICAgICAgJ2ZsZXgtc3RhcnQnLFxuICAgICAgICAgICAgICAgICdmbGV4LWVuZCcsXG4gICAgICAgICAgICAgICAgJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgICAgICdzcGFjZS1hcm91bmQnXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc3QgZmxleERpcmVjdGlvbk1vZGVzID0gWydyb3cnLCAnY29sdW1uJ107XG5cbiAgICAgICAgICAgIGNsYXNzTmFtZXMucHVzaCgnaW5jaXRvX19mbGV4LWxheW91dC12aWV3Jyk7XG5cbiAgICAgICAgICAgIHN0eWxlcy5kaXNwbGF5ID0gJ2ZsZXgnO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZmxleEFsaWduSXRlbU1vZGVzLmluZGV4T2Yodmlldy5sYXlvdXRfZmxleF9hbGlnbl9pdGVtcykgIT09IC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNbJ2FsaWduLWl0ZW1zJ10gPSB2aWV3LmxheW91dF9mbGV4X2FsaWduX2l0ZW1zO1xuICAgICAgICAgICAgICAgIHN0eWxlc1snbXMtYWxpZ24taXRlbXMnXSA9IHZpZXcubGF5b3V0X2ZsZXhfYWxpZ25faXRlbXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBmbGV4SnVzdGlmeU1vZGVzLmluZGV4T2Yodmlldy5sYXlvdXRfZmxleF9qdXN0aWZ5X2NvbnRlbnQpICE9PVxuICAgICAgICAgICAgICAgIC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNbJ2p1c3RpZnktY29udGVudCddID0gdmlldy5sYXlvdXRfZmxleF9qdXN0aWZ5X2NvbnRlbnQ7XG4gICAgICAgICAgICAgICAgc3R5bGVzWydtcy1mbGV4LXBhY2snXSA9IHZpZXcubGF5b3V0X2ZsZXhfanVzdGlmeV9jb250ZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxleERpcmVjdGlvbk1vZGVzLmluZGV4T2Yodmlldy5sYXlvdXRfZmxleF9kaXJlY3Rpb24pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN0eWxlc1snZmxleC1kaXJlY3Rpb24nXSA9IHZpZXcubGF5b3V0X2ZsZXhfZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIHN0eWxlc1snbXMtZmxleC1kaXJlY3Rpb24nXSA9IHZpZXcubGF5b3V0X2ZsZXhfZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih2aWV3LmlkKSkge1xuICAgICAgICAgICAgYXR0cnNbJ2RhdGEtaWQnXSA9IGVzY2FwZUF0dHJWYWx1ZSh2aWV3LmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodmlldy5yb2xlKSkge1xuICAgICAgICAgICAgYXR0cnNbJ2RhdGEtcm9sZSddID0gZXNjYXBlQXR0clZhbHVlKHZpZXcucm9sZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHZpZXcuYWNjZXNzaWJpbGl0eV9sYWJlbCkpIHtcbiAgICAgICAgICAgIGF0dHJzWydhcmlhLWxhYmVsJ10gPSBlc2NhcGVBdHRyVmFsdWUodmlldy5hY2Nlc3NpYmlsaXR5X2xhYmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LmFjY2Vzc2liaWxpdHlfaGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgICBhdHRyc1snYXJpYS1oaWRkZW4nXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2aWV3LmZlYXR1cmVfbGFiZWxzKSkge1xuICAgICAgICAgICAgY29uc3QgZmVhdHVyZUxhYmVscyA9IHZpZXcuZmVhdHVyZV9sYWJlbHMuZmlsdGVyKChmZWF0dXJlTGFiZWwpID0+XG4gICAgICAgICAgICAgICAgL15bYS16Xy1dezEsMTR9JC8udGVzdChmZWF0dXJlTGFiZWwpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoZmVhdHVyZUxhYmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhdHRyc1snZGF0YS1mZWF0dXJlLWxhYmVscyddID0gZmVhdHVyZUxhYmVscy5qb2luKCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHZpZXcudGl0bGUpKSB7XG4gICAgICAgICAgICBhdHRyc1sndGl0bGUnXSA9IGVzY2FwZUF0dHJWYWx1ZSh2aWV3LnRpdGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LmdyYXZpdHkpIHtcbiAgICAgICAgICAgIGF0dHJzWydkYXRhLWdyYXZpdHknXSA9IHZpZXcuZ3Jhdml0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlZmluZWRTdHIodmlldy5saW5rKSkge1xuICAgICAgICAgICAgYXR0cnNbJ2RhdGEtbGluayddID0gdmlldy5saW5rO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcubGF5b3V0X3dpZHRoID09PSAnbWF0Y2hfcGFyZW50Jykge1xuICAgICAgICAgICAgc3R5bGVzLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXcubGF5b3V0X3dpZHRoID09PSAnd3JhcF9jb250ZW50Jykge1xuICAgICAgICAgICAgc3R5bGVzLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3LmxheW91dF93aWR0aCAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXMud2lkdGggPSBmb3JtYXRVbml0KHZpZXcubGF5b3V0X3dpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LmxheW91dF9oZWlnaHQgPT09ICdtYXRjaF9wYXJlbnQnKSB7XG4gICAgICAgICAgICBzdHlsZXMuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXcubGF5b3V0X2hlaWdodCA9PT0gJ3dyYXBfY29udGVudCcpIHtcbiAgICAgICAgICAgIHN0eWxlcy5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgIH0gZWxzZSBpZiAodmlldy5sYXlvdXRfaGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlcy5oZWlnaHQgPSBmb3JtYXRVbml0KHZpZXcubGF5b3V0X2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlldy5taW5fd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydtaW4td2lkdGgnXSA9IGZvcm1hdFVuaXQodmlldy5taW5fd2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcubWF4X3dpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snbWF4LXdpZHRoJ10gPSBmb3JtYXRVbml0KHZpZXcubWF4X3dpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3Lm1pbl9oZWlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydtaW4taGVpZ2h0J10gPSBmb3JtYXRVbml0KHZpZXcubWluX2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlldy5tYXhfaGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snbWF4LWhlaWdodCddID0gZm9ybWF0VW5pdCh2aWV3Lm1heF9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcubGF5b3V0X3RvcCAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXMudG9wID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF90b3ApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LmxheW91dF9sZWZ0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlcy5sZWZ0ID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9sZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5sYXlvdXRfcmlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzLnJpZ2h0ID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9yaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcubGF5b3V0X2JvdHRvbSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXMuYm90dG9tID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9ib3R0b20pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcuYmFja2dyb3VuZF9jb2xvcikge1xuICAgICAgICAgICAgc3R5bGVzWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2aWV3LmJhY2tncm91bmRfY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWZpbmVkU3RyKHZpZXcuYmFja2dyb3VuZF9pbWFnZSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkxhenlsb2FkKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5wdXNoKCdpbmNpdG8tLWxhenknKTtcblxuICAgICAgICAgICAgICAgIGF0dHJzWydkYXRhLWJnJ10gPSB2aWV3LmJhY2tncm91bmRfaW1hZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlc1snYmFja2dyb3VuZC1pbWFnZSddID0gYHVybCgke3ZpZXcuYmFja2dyb3VuZF9pbWFnZX0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIFsncmVwZWF0X3gnLCAncmVwZWF0X3knLCAncmVwZWF0J10uaW5kZXhPZihcbiAgICAgICAgICAgICAgICB2aWV3LmJhY2tncm91bmRfdGlsZV9tb2RlXG4gICAgICAgICAgICApICE9PSAtMVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHN0eWxlc1snYmFja2dyb3VuZC1yZXBlYXQnXSA9IHZpZXcuYmFja2dyb3VuZF90aWxlX21vZGUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAnXycsXG4gICAgICAgICAgICAgICAgJy0nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmaW5lZFN0cih2aWV3LmJhY2tncm91bmRfaW1hZ2VfcG9zaXRpb24pKSB7XG4gICAgICAgICAgICBzdHlsZXNbXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nXG4gICAgICAgICAgICBdID0gdmlldy5iYWNrZ3JvdW5kX2ltYWdlX3Bvc2l0aW9uLnJlcGxhY2UoJ18nLCAnICcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcuYmFja2dyb3VuZF9pbWFnZV9zY2FsZV90eXBlID09PSAnY2VudGVyX2Nyb3AnKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2JhY2tncm91bmQtc2l6ZSddID0gJ2NvdmVyJztcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3LmJhY2tncm91bmRfaW1hZ2Vfc2NhbGVfdHlwZSA9PT0gJ2NlbnRlcl9pbnNpZGUnKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2JhY2tncm91bmQtc2l6ZSddID0gJ2NvbnRhaW4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcubGF5b3V0X21hcmdpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXMubWFyZ2luID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9tYXJnaW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LmxheW91dF9tYXJnaW5fdG9wICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snbWFyZ2luLXRvcCddID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9tYXJnaW5fdG9wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5sYXlvdXRfbWFyZ2luX2xlZnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydtYXJnaW4tbGVmdCddID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9tYXJnaW5fbGVmdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcubGF5b3V0X21hcmdpbl9yaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ21hcmdpbi1yaWdodCddID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9tYXJnaW5fcmlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LmxheW91dF9tYXJnaW5fYm90dG9tICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snbWFyZ2luLWJvdHRvbSddID0gZm9ybWF0VW5pdCh2aWV3LmxheW91dF9tYXJnaW5fYm90dG9tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LnBhZGRpbmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzLnBhZGRpbmcgPSBmb3JtYXRVbml0KHZpZXcucGFkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcucGFkZGluZ190b3AgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydwYWRkaW5nLXRvcCddID0gZm9ybWF0VW5pdCh2aWV3LnBhZGRpbmdfdG9wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5wYWRkaW5nX2xlZnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydwYWRkaW5nLWxlZnQnXSA9IGZvcm1hdFVuaXQodmlldy5wYWRkaW5nX2xlZnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LnBhZGRpbmdfcmlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydwYWRkaW5nLXJpZ2h0J10gPSBmb3JtYXRVbml0KHZpZXcucGFkZGluZ19yaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcucGFkZGluZ19ib3R0b20gIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydwYWRkaW5nLWJvdHRvbSddID0gZm9ybWF0VW5pdCh2aWV3LnBhZGRpbmdfYm90dG9tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LmNvcm5lcl9yYWRpdXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydib3JkZXItcmFkaXVzJ10gPSBmb3JtYXRVbml0KHZpZXcuY29ybmVyX3JhZGl1cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuY29ybmVyX3RvcF9sZWZ0X3JhZGl1cyAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnXSA9IGZvcm1hdFVuaXQoXG4gICAgICAgICAgICAgICAgdmlldy5jb3JuZXJfdG9wX2xlZnRfcmFkaXVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LmNvcm5lcl90b3BfcmlnaHRfcmFkaXVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMnXSA9IGZvcm1hdFVuaXQoXG4gICAgICAgICAgICAgICAgdmlldy5jb3JuZXJfdG9wX3JpZ2h0X3JhZGl1c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5jb3JuZXJfYm90dG9tX2xlZnRfcmFkaXVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1cyddID0gZm9ybWF0VW5pdChcbiAgICAgICAgICAgICAgICB2aWV3LmNvcm5lcl9ib3R0b21fbGVmdF9yYWRpdXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuY29ybmVyX2JvdHRvbV9yaWdodF9yYWRpdXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1cyddID0gZm9ybWF0VW5pdChcbiAgICAgICAgICAgICAgICB2aWV3LmNvcm5lcl9ib3R0b21fcmlnaHRfcmFkaXVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2xpcCBjaGlsZHJlbi5cbiAgICAgICAgaWYgKHZpZXcuY2xpcF9jaGlsZHJlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHN0eWxlc1snb3ZlcmZsb3cnXSA9ICd2aXNpYmxlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IGdldFNoYWRvdyh2aWV3KTtcblxuICAgICAgICBpZiAoc2hhZG93ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1tcbiAgICAgICAgICAgICAgICAnYm94LXNoYWRvdydcbiAgICAgICAgICAgIF0gPSBgJHtzaGFkb3cuZHh9cHggJHtzaGFkb3cuZHl9cHggJHtzaGFkb3cucmFkaXVzfXB4ICR7c2hhZG93LmNvbG9yfWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdHJva2VTdHlsZXMgPSBbJ3NvbGlkJywgJ2RvdHRlZCcsICdkYXNoZWQnXTtcblxuICAgICAgICBpZiAodmlldy5zdHJva2Vfd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydib3JkZXItd2lkdGgnXSA9IGZvcm1hdFVuaXQodmlldy5zdHJva2Vfd2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LnN0cm9rZV9jb2xvciAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2JvcmRlci1jb2xvciddID0gdmlldy5zdHJva2VfY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cm9rZVN0eWxlcy5pbmRleE9mKHZpZXcuc3Ryb2tlX3N0eWxlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN0eWxlc1snYm9yZGVyLXN0eWxlJ10gPSB2aWV3LnN0cm9rZV9zdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LnN0cm9rZV90b3Bfd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydib3JkZXItdG9wLXdpZHRoJ10gPSBmb3JtYXRVbml0KHZpZXcuc3Ryb2tlX3RvcF93aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuc3Ryb2tlX3RvcF9jb2xvciAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2JvcmRlci10b3AtY29sb3InXSA9IHZpZXcuc3Ryb2tlX3RvcF9jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LnN0cm9rZV9sZWZ0X3dpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snYm9yZGVyLWxlZnQtd2lkdGgnXSA9IGZvcm1hdFVuaXQodmlldy5zdHJva2VfbGVmdF93aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuc3Ryb2tlX2xlZnRfY29sb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydib3JkZXItbGVmdC1jb2xvciddID0gdmlldy5zdHJva2VfbGVmdF9jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LnN0cm9rZV9yaWdodF93aWR0aCAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2JvcmRlci1yaWdodC13aWR0aCddID0gZm9ybWF0VW5pdCh2aWV3LnN0cm9rZV9yaWdodF93aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuc3Ryb2tlX3JpZ2h0X2NvbG9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snYm9yZGVyLXJpZ2h0LWNvbG9yJ10gPSB2aWV3LnN0cm9rZV9yaWdodF9jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3LnN0cm9rZV9ib3R0b21fd2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgc3R5bGVzWydib3JkZXItYm90dG9tLXdpZHRoJ10gPSBmb3JtYXRVbml0KFxuICAgICAgICAgICAgICAgIHZpZXcuc3Ryb2tlX2JvdHRvbV93aWR0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5zdHJva2VfYm90dG9tX2NvbG9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlc1snYm9yZGVyLWJvdHRvbS1jb2xvciddID0gdmlldy5zdHJva2VfYm90dG9tX2NvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2aWV3LmxheW91dF9mbGV4X3NocmluayA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHN0eWxlc1snZmxleC1zaHJpbmsnXSA9IHZpZXcubGF5b3V0X2ZsZXhfc2hyaW5rO1xuICAgICAgICAgICAgc3R5bGVzWydtcy1mbGV4LXNocmluayddID0gdmlldy5sYXlvdXRfZmxleF9zaHJpbms7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2aWV3LmxheW91dF9mbGV4X2dyb3cgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2ZsZXgtZ3JvdyddID0gdmlldy5sYXlvdXRfZmxleF9ncm93O1xuICAgICAgICAgICAgc3R5bGVzWydtcy1mbGV4LWdyb3cnXSA9IHZpZXcubGF5b3V0X2ZsZXhfZ3JvdztcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5sYXlvdXRfZmxleF9iYXNpcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ2ZsZXgtYmFzaXMnXSA9IGZvcm1hdFVuaXQodmlldy5sYXlvdXRfZmxleF9iYXNpcyk7XG4gICAgICAgICAgICBzdHlsZXNbJ21zLWZsZXgtYmFzaXMnXSA9IGZvcm1hdFVuaXQodmlldy5sYXlvdXRfZmxleF9iYXNpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3Jtcyh2aWV3KTtcblxuICAgICAgICBpZiAodHJhbnNmb3Jtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdHlsZXMudHJhbnNmb3JtID0gdHJhbnNmb3Jtcy5qb2luKCcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmFuc2Zvcm0gb3JpZ2luLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHZpZXcudHJhbnNmb3JtX29yaWdpbikgJiZcbiAgICAgICAgICAgIHZpZXcudHJhbnNmb3JtX29yaWdpbi5sZW5ndGggPT09IDJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBzdHlsZXNbJ3RyYW5zZm9ybS1vcmlnaW4nXSA9IFtcbiAgICAgICAgICAgICAgICBmb3JtYXRVbml0KHZpZXcudHJhbnNmb3JtX29yaWdpblswXSksXG4gICAgICAgICAgICAgICAgZm9ybWF0VW5pdCh2aWV3LnRyYW5zZm9ybV9vcmlnaW5bMV0pXG4gICAgICAgICAgICBdLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0YWdOYW1lLFxuICAgICAgICAgICAgY29udGVudHMsXG4gICAgICAgICAgICBjbGFzc05hbWVzLFxuICAgICAgICAgICAgc3R5bGVzLFxuICAgICAgICAgICAgYXR0cnNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJIdG1sKHJvb3RWaWV3KSB7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGNvbnN0IGl0ZXIgPSAodmlldykgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZXMsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzXG4gICAgICAgICAgICAgICAgfSA9IHRoaXMucmVuZGVyVmlldyh2aWV3KTtcblxuICAgICAgICAgICAgICAgIGlmICh2aWV3LmlkICE9IG51bGwgJiYgdHlwZW9mIHZpZXcubWV0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZHNbdmlldy5pZF0gPSB2aWV3Lm1ldGE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHZpZXcucm9sZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VjdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdmlldy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGE6IHZpZXcubWV0YVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9IGA8JHt0YWdOYW1lfWA7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBgIGNsYXNzPVwiJHtjbGFzc05hbWVzLmpvaW4oJyAnKX1cImA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRycykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJzW2tleV07XG5cbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSBgICR7a2V5fT1cIiR7dmFsdWV9XCJgO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJyBzdHlsZT1cIic7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzdHlsZXNba2V5XTtcblxuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGAke2tleX06JHt2YWx1ZX07IGA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnXCInO1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyc1trZXldO1xuXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYCAke2tleX09XCIke3ZhbHVlfVwiYDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9ICc+JztcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZpZXcuY2hpbGRfdmlld3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuY2hpbGRfdmlld3MuZm9yRWFjaCgoY2hpbGRWaWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVyKGNoaWxkVmlldyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50cykge1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGNvbnRlbnRzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYDwvJHt0YWdOYW1lfT5gO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlcihyb290Vmlldyk7XG5cbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImNoZWNrIiwiZ2xvYmFsIiwiZmFpbHMiLCJuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIk5BU0hPUk5fQlVHIiwidG9TdHJpbmciLCJzcGxpdCIsImNsYXNzb2YiLCJJbmRleGVkT2JqZWN0IiwicmVxdWlyZU9iamVjdENvZXJjaWJsZSIsImlzT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJkb2N1bWVudCIsIkVYSVNUUyIsIkRFU0NSSVBUT1JTIiwiY3JlYXRlRWxlbWVudCIsIm5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInRvSW5kZXhlZE9iamVjdCIsInRvUHJpbWl0aXZlIiwiSUU4X0RPTV9ERUZJTkUiLCJoYXMiLCJjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSIsInJlcGxhY2VtZW50IiwiaXNGb3JjZWQiLCJkYXRhIiwibm9ybWFsaXplIiwiUE9MWUZJTEwiLCJOQVRJVkUiLCJhRnVuY3Rpb24iLCJuYXRpdmVEZWZpbmVQcm9wZXJ0eSIsImFuT2JqZWN0IiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJyZXF1aXJlJCQwIiwicGF0aCIsImJpbmQiLCJjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkiLCJjZWlsIiwiZmxvb3IiLCJtaW4iLCJ0b0ludGVnZXIiLCJtYXgiLCJjcmVhdGVNZXRob2QiLCJ0b0xlbmd0aCIsInRvQWJzb2x1dGVJbmRleCIsImluZGV4T2YiLCJoaWRkZW5LZXlzIiwiaW50ZXJuYWxPYmplY3RLZXlzIiwiZW51bUJ1Z0tleXMiLCJnZXRCdWlsdEluIiwiU0hBUkVEIiwic3RvcmUiLCJzZXRHbG9iYWwiLCJpZCIsInBvc3RmaXgiLCJrZXlzIiwic2hhcmVkIiwidWlkIiwiUFJPVE9UWVBFIiwiSUVfUFJPVE8iLCJzaGFyZWRLZXkiLCJkb2N1bWVudENyZWF0ZUVsZW1lbnQiLCJkZWZpbmVQcm9wZXJ0aWVzIiwic2xpY2UiLCJjb25zdHJ1Y3QiLCJGT1JDRUQiLCIkIiwiY3JlYXRlIiwicGFyZW50IiwiaXNBcnJheSIsIl9BcnJheSRpc0FycmF5IiwicHJvY2VzcyIsInZlcnNpb25zIiwidjgiLCJtYXRjaCIsInZlcnNpb24iLCJ1c2VyQWdlbnQiLCJJU19OT0RFIiwiVjhfVkVSU0lPTiIsIk5BVElWRV9TWU1CT0wiLCJXZWxsS25vd25TeW1ib2xzU3RvcmUiLCJTeW1ib2wiLCJjcmVhdGVXZWxsS25vd25TeW1ib2wiLCJVU0VfU1lNQk9MX0FTX1VJRCIsIlNQRUNJRVMiLCJ3ZWxsS25vd25TeW1ib2wiLCJNQVhfU0FGRV9JTlRFR0VSIiwidG9PYmplY3QiLCJuYXRpdmVHZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZGVmaW5lUHJvcGVydHkiLCJ3cmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlIiwiVE9fU1RSSU5HX1RBRyIsInRlc3QiLCJDT1JSRUNUX0FSR1VNRU5UUyIsImNsYXNzb2ZSYXciLCJ0cnlHZXQiLCJUT19TVFJJTkdfVEFHX1NVUFBPUlQiLCJmdW5jdGlvblRvU3RyaW5nIiwiV2Vha01hcCIsImluc3BlY3RTb3VyY2UiLCJzZXQiLCJnZXQiLCJlbmZvcmNlIiwiZ2V0dGVyRm9yIiwiTkFUSVZFX1dFQUtfTUFQIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwiU1RBVEUiLCJvYmplY3RIYXMiLCIkZm9yRWFjaCIsInNldEludGVybmFsU3RhdGUiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwiZ2V0SW50ZXJuYWxTdGF0ZSIsIk9iamVjdFByb3RvdHlwZSIsIiRzdHJpbmdpZnkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzRXh0ZXJuYWwiLCJuYXRpdmVPYmplY3RDcmVhdGUiLCJ3cmFwIiwicmVkZWZpbmUiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSIiwiSVRFUkFUT1IiLCJCVUdHWV9TQUZBUklfSVRFUkFUT1JTIiwicmV0dXJuVGhpcyIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJJdGVyYXRvcnMiLCJhUG9zc2libGVQcm90b3R5cGUiLCJJdGVyYXRvcnNDb3JlIiwiRE9NSXRlcmFibGVzIiwiY2hhckF0IiwiaXNJdGVyYWJsZSIsImdldEl0ZXJhdG9yIiwiX1N5bWJvbCIsIl9pc0l0ZXJhYmxlIiwiX2dldEl0ZXJhdG9yIiwiSEFTX1NQRUNJRVNfU1VQUE9SVCIsIkFycmF5UHJvdG90eXBlIiwiSU5DT1JSRUNUX0lURVJBVElPTiIsImZyb20iLCJhcnJheUxpa2VUb0FycmF5IiwiX3NsaWNlSW5zdGFuY2VQcm9wZXJ0eSIsIl9BcnJheSRmcm9tIiwiYXJyYXlXaXRoSG9sZXMiLCJpdGVyYWJsZVRvQXJyYXlMaW1pdCIsInVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5Iiwibm9uSXRlcmFibGVSZXN0Iiwib2JqZWN0RGVmaW5lUHJvcGVydHlNb2RpbGUiLCJfT2JqZWN0JGRlZmluZVByb3BlcnR5IiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfT2JqZWN0JHNldFByb3RvdHlwZU9mIiwiX09iamVjdCRjcmVhdGUiLCJXcmFwcGVkV2VsbEtub3duU3ltYm9sTW9kdWxlIiwiX1N5bWJvbCRpdGVyYXRvciIsImFzc2VydFRoaXNJbml0aWFsaXplZCIsIm5hdGl2ZUdldFByb3RvdHlwZU9mIiwiX09iamVjdCRnZXRQcm90b3R5cGVPZiIsIlNUUklDVF9NRVRIT0QiLCJhcnJheU1ldGhvZElzU3RyaWN0IiwiZm9yY2VkU3RyaW5nSFRNTE1ldGhvZCIsImNyZWF0ZUhUTUwiLCJVTlNVUFBPUlRFRF9ZIiwic3RpY2t5SGVscGVycyIsImV4ZWMiLCJNQVRDSCIsImZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljIiwiaXNSZWdFeHAiLCJzcGVjaWVzQ29uc3RydWN0b3IiLCJjYWxsUmVnRXhwRXhlYyIsInJlZ0V4cEV4ZWMiLCJmaWx0ZXIiLCJORUdBVElWRV9aRVJPIiwiZm9yRWFjaCIsIm1hcCIsImNvbmNhdCIsImZvcmNlZFN0cmluZ1RyaW1NZXRob2QiLCJ0cmltIiwiY29yZSIsInRoaXMiLCJmb3JtYXRVbml0IiwidW5pdCIsInJlcGxhY2UiLCJlc2NhcGVBdHRyVmFsdWUiLCJ2YWx1ZSIsImlzRGVmaW5lZFN0ciIsImxlbmd0aCIsImVzY2FwZUhUTUwiLCJ1bnNhZmUiLCJnZXRTaGFkb3ciLCJ2aWV3Iiwic2hhZG93X2NvbG9yIiwiZHgiLCJzaGFkb3dfZHgiLCJkeSIsInNoYWRvd19keSIsInJhZGl1cyIsInNoYWRvd19yYWRpdXMiLCJjb2xvciIsImdldFRyYW5zZm9ybXMiLCJ0cmFuc2Zvcm1zIiwidHJhbnNsYXRlWCIsInRyYW5zZm9ybV90cmFuc2xhdGVfeCIsInRyYW5zbGF0ZVkiLCJ0cmFuc2Zvcm1fdHJhbnNsYXRlX3kiLCJwdXNoIiwidHJhbnNmb3JtX3JvdGF0ZSIsInRyYW5zZm9ybV9zY2FsZSIsInBhcnNlU3BhbnMiLCJ0ZXh0Iiwic3BhbnMiLCJyZXN1bHQiLCJzdGFydCIsInNwYW4iLCJpIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiZW5kIiwiZ2V0VGV4dFNoYWRvdyIsInRleHRfc2hhZG93X2NvbG9yIiwidGV4dF9zaGFkb3dfZHgiLCJ0ZXh0X3NoYWRvd19keSIsInRleHRfc2hhZG93X3JhZGl1cyIsImxvYWRGb250cyIsImZvbnRBc3NldHMiLCJzdHlsZUVsIiwia2V5IiwidXJscyIsIl9tYXBJbnN0YW5jZVByb3BlcnR5Iiwic3JjIiwidXJsIiwiam9pbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJoZWFkIiwibGFzdEluZGV4T2YiLCJwYXJzZUludEltcGxlbWVudGF0aW9uIiwiSVNfSU9TIiwicmVxdWlyZSQkMSIsIlByb21pc2UiLCJub3RpZnkiLCJJU19XRUJPU19XRUJLSVQiLCJuZXdQcm9taXNlQ2FwYWJpbGl0eSIsIk5hdGl2ZVByb21pc2UiLCJUeXBlRXJyb3IiLCJuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZSIsInNldFNwZWNpZXMiLCJJU19QVVJFIiwiUmVnRXhwUHJvdG90eXBlIiwiZmxhZ3MiLCJyZXF1aXJlJCQyIiwiZ2V0RmxhZ3MiLCJjbG9zZXN0IiwiZWwiLCJzIiwibWF0Y2hlcyIsIkVsZW1lbnQiLCJwcm90b3R5cGUiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsImNhbGwiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwiSW5jaXRvIiwiY29udGFpbmVyRWwiLCJpbmNpdG8iLCJpZHMiLCJzZWN0aW9ucyIsImNhbkxhenlsb2FkIiwid2luZG93IiwicmVuZGVyIiwidGhlbWUiLCJmb250X2Fzc2V0cyIsImRhdGFzZXQiLCJyZWFkbWUiLCJjbGFzc05hbWUiLCJmb250X2ZhbWlseSIsInN0eWxlIiwiZm9udEZhbWlseSIsIl9maWx0ZXJJbnN0YW5jZVByb3BlcnR5IiwidiIsImEiLCJfaW5kZXhPZkluc3RhbmNlUHJvcGVydHkiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwidGV4dF9jb2xvciIsImlubmVyVGV4dCIsImxpbmVfc3BhY2luZ19tdWx0aXBsaWVyIiwibGluZUhlaWdodCIsImxvY2FsZSIsInNldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbmRlckh0bWwiLCJyb290X3ZpZXciLCJlbmFibGVMYXp5bG9hZGluZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwibGluayIsIm9wZW4iLCJvYnNlcnZlRWxlbWVudHMiLCJ0cmlnZ2VyIiwibGF6eU9ic2VydmVyIiwiZGlzY29ubmVjdCIsInZpZGVvT2JzZXJ2ZXIiLCJyZW1vdmVDaGlsZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvYnNlcnZlIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiaXNMYXp5bG9hZGVkIiwic291cmNlRWwiLCJtaW1lIiwibG9hZCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwibWV0aG9kIiwiYm9keSIsImZldGNoIiwiSlNPTiIsInBhcnNlIiwidW5lc2NhcGUiLCJ0aGVuIiwicmVzIiwic3RhdHVzIiwianNvbiIsImJnIiwiYmFja2dyb3VuZEltYWdlIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiZW50cnkiLCJpc0ludGVyc2VjdGluZyIsImxvYWRFbCIsInVub2JzZXJ2ZSIsInJvb3RNYXJnaW4iLCJhdXRvcGxheVN0YXRlIiwicGxheSIsInBhdXNlZCIsInBhdXNlIiwidGhyZXNob2xkIiwiY29udGVudHMiLCJjbGFzc05hbWVzIiwic3R5bGVzIiwiYXR0cnMiLCJ2aWV3X25hbWUiLCJ0ZXh0U3R5bGVzIiwidGV4dF9zdHlsZSIsInBhcnNlZFRleHQiLCJpdGVtIiwiZXNjYXBlZFRleHQiLCJuYW1lIiwiZW5jb2RlVVJJIiwic3Bhbk5hbWUiLCJ0ZXh0X3ByZXZlbnRfd2lkb3ciLCJ0ZXh0X3NpemUiLCJ0ZXh0X2RlY29yYXRpb25fbGluZSIsInRleHRTaGFkb3ciLCJ0ZXh0X3NoYWRvdyIsInRleHRfYWxpZ25tZW50Iiwic2luZ2xlX2xpbmUiLCJtYXhfbGluZXMiLCJkaXNwbGF5IiwidGV4dF9hbGxfY2FwcyIsIm9uZXJyb3IiLCJsYWJlbCIsIm11dGVkIiwicGxheXNpbmxpbmUiLCJwcmVsb2FkIiwicG9zdGVyIiwiYXV0b3BsYXkiLCJjb250cm9scyIsImxvb3AiLCJfdHJpbUluc3RhbmNlUHJvcGVydHkiLCJzYW5kYm94IiwiYWxsb3dmdWxsc2NyZWVuIiwiZXNjYXBlIiwiX0pTT04kc3RyaW5naWZ5IiwiZmxleEFsaWduSXRlbU1vZGVzIiwiZmxleEp1c3RpZnlNb2RlcyIsImZsZXhEaXJlY3Rpb25Nb2RlcyIsImxheW91dF9mbGV4X2FsaWduX2l0ZW1zIiwibGF5b3V0X2ZsZXhfanVzdGlmeV9jb250ZW50IiwibGF5b3V0X2ZsZXhfZGlyZWN0aW9uIiwicm9sZSIsImFjY2Vzc2liaWxpdHlfbGFiZWwiLCJhY2Nlc3NpYmlsaXR5X2hpZGRlbiIsImZlYXR1cmVfbGFiZWxzIiwiZmVhdHVyZUxhYmVscyIsImZlYXR1cmVMYWJlbCIsInRpdGxlIiwiZ3Jhdml0eSIsImxheW91dF93aWR0aCIsIndpZHRoIiwibGF5b3V0X2hlaWdodCIsImhlaWdodCIsIm1pbl93aWR0aCIsIm1heF93aWR0aCIsIm1pbl9oZWlnaHQiLCJtYXhfaGVpZ2h0IiwibGF5b3V0X3RvcCIsInRvcCIsImxheW91dF9sZWZ0IiwibGVmdCIsImxheW91dF9yaWdodCIsInJpZ2h0IiwibGF5b3V0X2JvdHRvbSIsImJvdHRvbSIsImJhY2tncm91bmRfaW1hZ2UiLCJiYWNrZ3JvdW5kX3RpbGVfbW9kZSIsImJhY2tncm91bmRfaW1hZ2VfcG9zaXRpb24iLCJiYWNrZ3JvdW5kX2ltYWdlX3NjYWxlX3R5cGUiLCJsYXlvdXRfbWFyZ2luIiwibWFyZ2luIiwibGF5b3V0X21hcmdpbl90b3AiLCJsYXlvdXRfbWFyZ2luX2xlZnQiLCJsYXlvdXRfbWFyZ2luX3JpZ2h0IiwibGF5b3V0X21hcmdpbl9ib3R0b20iLCJwYWRkaW5nIiwicGFkZGluZ190b3AiLCJwYWRkaW5nX2xlZnQiLCJwYWRkaW5nX3JpZ2h0IiwicGFkZGluZ19ib3R0b20iLCJjb3JuZXJfcmFkaXVzIiwiY29ybmVyX3RvcF9sZWZ0X3JhZGl1cyIsImNvcm5lcl90b3BfcmlnaHRfcmFkaXVzIiwiY29ybmVyX2JvdHRvbV9sZWZ0X3JhZGl1cyIsImNvcm5lcl9ib3R0b21fcmlnaHRfcmFkaXVzIiwiY2xpcF9jaGlsZHJlbiIsInNoYWRvdyIsInN0cm9rZVN0eWxlcyIsInN0cm9rZV93aWR0aCIsInN0cm9rZV9jb2xvciIsInN0cm9rZV9zdHlsZSIsInN0cm9rZV90b3Bfd2lkdGgiLCJzdHJva2VfdG9wX2NvbG9yIiwic3Ryb2tlX2xlZnRfd2lkdGgiLCJzdHJva2VfbGVmdF9jb2xvciIsInN0cm9rZV9yaWdodF93aWR0aCIsInN0cm9rZV9yaWdodF9jb2xvciIsInN0cm9rZV9ib3R0b21fd2lkdGgiLCJzdHJva2VfYm90dG9tX2NvbG9yIiwibGF5b3V0X2ZsZXhfc2hyaW5rIiwibGF5b3V0X2ZsZXhfZ3JvdyIsImxheW91dF9mbGV4X2Jhc2lzIiwidHJhbnNmb3JtIiwidHJhbnNmb3JtX29yaWdpbiIsInJvb3RWaWV3IiwiaHRtbCIsIml0ZXIiLCJyZW5kZXJWaWV3IiwibWV0YSIsImNoaWxkX3ZpZXdzIiwiY2hpbGRWaWV3IiwiZXJyb3IiLCJNaWNyb0V2ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0NBQUEsSUFBSUEsT0FBSyxHQUFHLFVBQVUsRUFBRSxFQUFFO0NBQzFCLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0NBQ3JDLENB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
