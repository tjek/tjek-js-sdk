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

	'use strict';
	var nativePropertyIsEnumerable$2 = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG$1 = getOwnPropertyDescriptor$3 && !nativePropertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$b = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$3(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable$2;

	var objectPropertyIsEnumerable$1 = {
		f: f$b
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

	var nativeGetOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$a = descriptors$1 ? nativeGetOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$1(O);
	  P = toPrimitive$1(P, true);
	  if (ie8DomDefine$1) try {
	    return nativeGetOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (has$3(O, P)) return createPropertyDescriptor$1(!objectPropertyIsEnumerable$1.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor$1 = {
		f: f$a
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
	var f$9 = descriptors$1 ? nativeDefineProperty$2 : function defineProperty(O, P, Attributes) {
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
		f: f$9
	};

	var createNonEnumerableProperty$1 = descriptors$1 ? function (object, key, value) {
	  return objectDefineProperty$1.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	'use strict';

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor$1.f;






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
	      descriptor = getOwnPropertyDescriptor$2(nativeSource, key);
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

	var min$5 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min$5(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max$3 = Math.max;
	var min$4 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger$1(index);
	  return integer < 0 ? max$3(integer + length, 0) : min$4(integer, length);
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

	var isPure$1 = true;

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
	  mode: isPure$1 ? 'pure' : 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var postfix$1 = Math.random();

	var uid$1 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix$1).toString(36);
	};

	var keys$1 = shared$1('keys');

	var sharedKey$1 = function (key) {
	  return keys$1[key] || (keys$1[key] = uid$1(key));
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

	'use strict';



	var slice$5 = [].slice;
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
	  var partArgs = slice$5.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice$5.call(arguments));
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
	var FORCED$1 = NEW_TARGET_BUG || ARGS_BUG;

	_export$1({ target: 'Reflect', stat: true, forced: FORCED$1, sham: FORCED$1 }, {
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

	var es_reflect_construct = {

	};

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

	var es_array_isArray = {

	};

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

	'use strict';




	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive$1(key);
	  if (propertyKey in object) objectDefineProperty$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	var engineIsNode$1 = classofRaw$1(global$2.process) == 'process';

	var engineUserAgent$1 = getBuiltIn$1('navigator', 'userAgent') || '';

	var process$1 = global$2.process;
	var versions$1 = process$1 && process$1.versions;
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

	var SPECIES$4 = wellKnownSymbol$1('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray$5(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES$4];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var SPECIES$3 = wellKnownSymbol$1('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version$1 >= 51 || !fails$1(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$3] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	'use strict';












	var IS_CONCAT_SPREADABLE = wellKnownSymbol$1('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
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

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export$1({ target: 'Array', proto: true, forced: FORCED }, {
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

	// empty

	var es_object_toString$1 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var hiddenKeys$2 = enumBugKeys$1.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$8 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertyNames$1 = {
		f: f$8
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
	var f$7 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames$1(toIndexedObject$1(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$7
	};

	var f$6 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols$1 = {
		f: f$6
	};

	var redefine$1 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$1(target, key, value);
	};

	var f$5 = wellKnownSymbol$1;

	var wellKnownSymbolWrapped = {
		f: f$5
	};

	var defineProperty$4 = objectDefineProperty$1.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path$1.Symbol || (path$1.Symbol = {});
	  if (!has$3(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var TO_STRING_TAG$3 = wellKnownSymbol$1('toStringTag');
	var test = {};

	test[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol$1('toStringTag');
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
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
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

	var defineProperty$3 = objectDefineProperty$1.f;





	var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has$3(target, TO_STRING_TAG$1)) {
	      defineProperty$3(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !toStringTagSupport) {
	      createNonEnumerableProperty$1(target, 'toString', objectToString);
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
	var set$1, get$1, has$2;

	var enforce$1 = function (it) {
	  return has$2(it) ? get$1(it) : set$1(it, {});
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
	  set$1 = function (it, metadata) {
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
	  set$1 = function (it, metadata) {
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
	  set: set$1,
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

	'use strict';



































	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$1('toPrimitive');
	var setInternalState$2 = internalState$1.set;
	var getInternalState$2 = internalState$1.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$2.Symbol;
	var $stringify = getBuiltIn$1('JSON', 'stringify');
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

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
	  setInternalState$2(symbol, {
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
	    return wrap(tag, description);
	  };

	  redefine$1($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  redefine$1($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid$1(description), description);
	  });

	  objectPropertyIsEnumerable$1.f = $propertyIsEnumerable;
	  objectDefineProperty$1.f = $defineProperty;
	  objectGetOwnPropertyDescriptor$1.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames$1.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols$1.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol$1(name), name);
	  };

	  if (descriptors$1) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE], 'description', {
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
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol$1 || fails$1(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
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
	      return $stringify.apply(null, args);
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

	var es_symbol = {

	};

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	var es_symbol_asyncIterator = {

	};

	// empty

	var es_symbol_description$1 = /*#__PURE__*/Object.freeze({
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

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var es_symbol_iterator = {

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

	var es_math_toStringTag$1 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	// empty

	var es_reflect_toStringTag$1 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var es_object_toString = /*@__PURE__*/getAugmentedNamespace(es_object_toString$1);

	var es_symbol_description = /*@__PURE__*/getAugmentedNamespace(es_symbol_description$1);

	var es_math_toStringTag = /*@__PURE__*/getAugmentedNamespace(es_math_toStringTag$1);

	var es_reflect_toStringTag = /*@__PURE__*/getAugmentedNamespace(es_reflect_toStringTag$1);

	var symbol$2 = path$1.Symbol;

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


	var symbol$1 = symbol$2;

	var symbol = symbol$1;

	var addToUnscopables = function () { /* empty */ };

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

	'use strict';







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
	if ((!isPure$1 || NEW_ITERATOR_PROTOTYPE) && !has$3(IteratorPrototype$2, ITERATOR$5)) {
	  createNonEnumerableProperty$1(IteratorPrototype$2, ITERATOR$5, returnThis$2);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	'use strict';
	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor$1(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject$1(it) && it !== null) {
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
	    anObject$1(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	'use strict';












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
	      if (!isPure$1 && objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty$1(CurrentIteratorPrototype, ITERATOR$4, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (isPure$1) iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((!isPure$1 || FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
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

	'use strict';






	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState$1.set;
	var getInternalState$1 = internalState$1.getterFor(ARRAY_ITERATOR);

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
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$1(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
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

	var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global$2[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
	    createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	  }
	  iterators[COLLECTION_NAME] = iterators.Array;
	}

	var web_domCollections_iterator = {

	};

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

	'use strict';
	var charAt$1 = stringMultibyte$1.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = internalState$1.set;
	var getInternalState = internalState$1.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
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

	var ITERATOR$3 = wellKnownSymbol$1('iterator');

	var isIterable$1 = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$3] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || iterators.hasOwnProperty(classof(O));
	};

	var isIterable_1 = isIterable$1;

	var isIterable = isIterable_1;

	var ITERATOR$2 = wellKnownSymbol$1('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || iterators[classof(it)];
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

	'use strict';










	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');

	var SPECIES$2 = wellKnownSymbol$1('species');
	var nativeSlice = [].slice;
	var max$2 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
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

	var entryVirtual = function (CONSTRUCTOR) {
	  return path$1[CONSTRUCTOR + 'Prototype'];
	};

	var slice$4 = entryVirtual('Array').slice;

	var ArrayPrototype$6 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.slice) ? slice$4 : own;
	};

	var slice$3 = slice_1;

	var slice$2 = slice$3;

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

	'use strict';








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

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	_export$1({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: arrayFrom
	});

	var es_array_from = {

	};

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

	  var n = slice$2(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

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

	var es_object_defineProperty = {

	};

	var defineProperty_1 = createCommonjsModule(function (module) {
	var Object = path$1.Object;

	var defineProperty = module.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$2 = defineProperty_1;

	var defineProperty$1 = defineProperty$2;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$1(target, descriptor.key, descriptor);
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

	var es_object_create = {

	};

	var Object$1 = path$1.Object;

	var create$2 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$1 = create$2;

	var create = create$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	_export$1({ target: 'Object', stat: true }, {
	  setPrototypeOf: objectSetPrototypeOf
	});

	var es_object_setPrototypeOf = {

	};

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

	var es_object_getPrototypeOf = {

	};

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

	'use strict';
	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$4 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f$4
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
	var f$3 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$3
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

	var isPure = false;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.9.1',
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

	var hiddenKeys$1 = {};

	var WeakMap = global$1.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
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
	  set = function (it, metadata) {
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
	  set = function (it, metadata) {
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
	  set: set,
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

	var min$3 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$3(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max$1 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
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
	var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys);
	};

	var objectGetOwnPropertyNames = {
		f: f$1
	};

	var f = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f
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

	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






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
	      descriptor = getOwnPropertyDescriptor(target, key);
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


	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	'use strict';





	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$2 = arrayMethodIsStrict$1('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var es_array_join = {

	};

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

	var UNSUPPORTED_Y$1 = fails(function () {
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
		UNSUPPORTED_Y: UNSUPPORTED_Y$1,
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

	var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y && re.sticky;
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

	var engineIsNode = classofRaw(global$1.process) == 'process';

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global$1.process;
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

	'use strict';
	// TODO: Remove from `core-js@4` since it's moved to entry points







	var SPECIES$1 = wellKnownSymbol('species');

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
	      re.constructor[SPECIES$1] = function () { return re; };
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

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var SPECIES = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
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

	'use strict';
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

	'use strict';











	var arrayPush = [].push;
	var min$1 = Math.min;
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
	          (e = min$1(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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

	var defineProperty = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty(FunctionPrototype, NAME, {
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

	'use strict';









	var max = Math.max;
	var min = Math.min;

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
	        var position = max(min(toInteger(result.index), S.length), 0);
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

	var isArray$1 = isArray$4;

	var isArray = isArray$1;

	'use strict';


	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$1(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	'use strict';
	var $forEach = arrayIteration.forEach;


	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
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

	var forEach$2 = entryVirtual('Array').forEach;

	var forEach$1 = forEach$2;

	var ArrayPrototype$4 = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.forEach)
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
	};

	var forEach = forEach_1;

	'use strict';

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

	var es_array_map = {

	};

	var map$2 = entryVirtual('Array').map;

	var ArrayPrototype$3 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.map) ? map$2 : own;
	};

	var map$1 = map_1;

	var map = map$1;

	var concat$2 = entryVirtual('Array').concat;

	var ArrayPrototype$2 = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.concat) ? concat$2 : own;
	};

	var concat$1 = concat_1;

	var concat = concat$1;

	'use strict';

	var $indexOf = arrayIncludes$1.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	_export$1({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
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

	var ArrayPrototype$1 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.indexOf) ? indexOf$2 : own;
	};

	var indexOf$1 = indexOf_1;

	var indexOf = indexOf$1;

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

	'use strict';

	var $trim = stringTrim.trim;


	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	_export$1({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var es_string_trim = {

	};

	var trim$2 = entryVirtual('String').trim;

	var StringPrototype = String.prototype;

	var trim_1 = function (it) {
	  var own = it.trim;
	  return typeof it === 'string' || it === StringPrototype
	    || (it instanceof String && own === StringPrototype.trim) ? trim$2 : own;
	};

	var trim$1 = trim_1;

	var trim = trim$1;

	'use strict';

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_array_filter = {

	};

	var filter$2 = entryVirtual('Array').filter;

	var ArrayPrototype = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.filter) ? filter$2 : own;
	};

	var filter$1 = filter_1;

	var filter = filter$1;

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
	if( 'object' !== "undefined" && ('exports' in module)){
		module.exports	= MicroEvent;
	}
	});

	var slice$1 = slice_1;

	var slice = slice$1;

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
	      text: slice(text).call(text, 0, spans[0].start)
	    });
	  }

	  forEach(spans).call(spans, function (span, i) {
	    var startIndex = span.start;
	    var endIndex = span.end;
	    result.push({
	      text: slice(text).call(text, startIndex, endIndex),
	      span: span
	    });

	    if (i === spans.length - 1) {
	      if (endIndex < text.length) {
	        result.push({
	          text: slice(text).call(text, endIndex, text.length)
	        });
	      }
	    } else if (endIndex < spans[i + 1].start) {
	      result.push({
	        text: slice(text).call(text, endIndex, spans[i + 1].start)
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
	    _this.imageCount = 0;
	    _this.preloadImageCount = 20;
	    _this.ids = {};
	    _this.sections = [];
	    _this.shouldLazyload = 'IntersectionObserver' in window;
	    return _this;
	  }

	  _createClass(Incito, [{
	    key: "start",
	    value: function start() {
	      var _this2 = this;

	      loadFonts(this.incito.font_assets);
	      var html = this.renderHtml();
	      var theme = this.incito.theme || {};
	      this.el.dataset.readme = 'Incito by Tjek (https://incito.io)';
	      this.el.className = 'incito';

	      if (isArray(theme.font_family)) {
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
	      } // By setting the language we help the browser with stuff like hyphenation.


	      if (this.incito.locale != null) {
	        this.el.setAttribute('lang', this.incito.locale);
	      }

	      this.el.innerHTML = html;
	      this.el.addEventListener('click', function (e) {
	        var link = e.target.getAttribute('data-link');

	        if (isDefinedStr(link)) {
	          window.open(link, '_blank');
	        }
	      });
	      this.containerEl.appendChild(this.el);

	      if (this.shouldLazyload) {
	        var _context;

	        this.lazyloader = new IntersectionObserver(function (entries) {
	          forEach(entries).call(entries, function (entry) {
	            if (entry.isIntersecting) {
	              _this2.loadEl(entry.target);

	              _this2.lazyloader.unobserve(entry.target);
	            }
	          });
	        }, {
	          rootMargin: '500px'
	        });

	        forEach(_context = this.el.querySelectorAll('.incito--lazy')).call(_context, function (lazyEl) {
	          _this2.lazyloader.observe(lazyEl);
	        });
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      if (this.lazyloader) {
	        this.lazyloader.disconnect();
	      }

	      this.containerEl.removeChild(this.el);
	      this.trigger('destroyed');
	    }
	  }, {
	    key: "loadEl",
	    value: function loadEl(el) {
	      if (el.dataset.bg) {
	        el.style.backgroundImage = "url(".concat(el.dataset.bg, ")");
	      } else if (el.dataset.src) {
	        el.src = el.dataset.src;
	      }

	      if (el.tagName.toLowerCase() === 'video') {
	        var _context2;

	        if (el.getAttribute('data-controls')) {
	          el.setAttribute('controls', 'true');
	        }

	        forEach(_context2 = el.querySelectorAll('[data-src]')).call(_context2, function (sourceEl) {
	          sourceEl.setAttribute('src', sourceEl.dataset.src);
	        });

	        el.load();
	      }
	    }
	  }, {
	    key: "renderView",
	    value: function renderView(view) {
	      var _context13;

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
	              var _context3;

	              return concat(_context3 = "<a href=\"".concat(encodeURI(item.span.url), "\" rel=\"external\" target=\"_blank\">")).call(_context3, escapedText, "</a>");
	            }

	            if (((_item$span2 = item.span) === null || _item$span2 === void 0 ? void 0 : _item$span2.name) != null) {
	              var _context4;

	              var spanName = item.span.name;
	              return concat(_context4 = "<span data-name=\"".concat(spanName, "\">")).call(_context4, escapedText, "</span>");
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
	          var _context5, _context6, _context7;

	          styles['text-shadow'] = concat(_context5 = concat(_context6 = concat(_context7 = "".concat(textShadow.dx, "px ")).call(_context7, textShadow.dy, "px ")).call(_context6, textShadow.radius, "px ")).call(_context5, textShadow.color);
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
	          styles['webkit-line-clamp'] = view.max_lines;
	          styles['webkit-box-orient'] = 'vertical';
	        }

	        if (view.text_all_caps === true) {
	          styles['text-transform'] = 'uppercase';
	        }
	      } else if (view.view_name === 'ImageView') {
	        tagName = 'img';
	        classNames.push('incito__image-view');
	        attrs.onerror = "this.style.display='none'";

	        if (isDefinedStr(view.src)) {
	          if (this.imageCount >= this.preloadImageCount && this.shouldLazyload) {
	            classNames.push('incito--lazy');
	            attrs['data-src'] = view.src;
	          } else {
	            attrs.src = view.src;
	          }

	          this.imageCount++;
	        }

	        if (isDefinedStr(view.label)) {
	          attrs['alt'] = view.label;
	        }
	      } else if (view.view_name === 'VideoView') {
	        tagName = 'video';
	        classNames.push('incito__video-view');
	        attrs['muted'] = true;
	        attrs.preload = 'metadata';
	        attrs.playsinline = true;
	        attrs['webkit-playsinline'] = true;

	        if (view.autoplay === true) {
	          attrs['autoplay'] = true;
	        }

	        if (view.loop === true) {
	          attrs['loop'] = true;
	        }

	        if (view.controls === true) {
	          attrs['data-controls'] = true;
	        }

	        if (this.shouldLazyload) {
	          var _context8;

	          classNames.push('incito--lazy');
	          contents = concat(_context8 = "<source type=\"".concat(view.mime, "\" data-src=\"")).call(_context8, view.src, "\"/>");
	        } else {
	          var _context9;

	          contents = concat(_context9 = "<source type=\"".concat(view.mime, "\" src=\"")).call(_context9, view.src, "\"/>");
	        }
	      } else if (view.view_name === 'HTMLView') {
	        if (isDefinedStr(view.style)) {
	          var _context10, _context11;

	          forEach(_context10 = trim(_context11 = view.style).call(_context11).split(';')).call(_context10, function (style) {
	            var _style$trim$split = trim(style).call(style).split(':'),
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

	        if (this.shouldLazyload) {
	          classNames.push('incito--lazy');
	          attrs['data-src'] = view.src;
	        } else {
	          attrs.src = view.src;
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
	        var _context12;

	        var featureLabels = filter(_context12 = view.feature_labels).call(_context12, function (featureLabel) {
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
	        if (this.imageCount >= this.preloadImageCount && this.shouldLazyload) {
	          classNames.push('incito--lazy');
	          attrs['data-bg'] = view.background_image;
	        } else {
	          styles['background-image'] = "url(".concat(view.background_image, ")");
	        }

	        this.imageCount++;
	      }

	      if (indexOf(_context13 = ['repeat_x', 'repeat_y', 'repeat']).call(_context13, view.background_tile_mode) !== -1) {
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
	        var _context14, _context15, _context16;

	        styles['box-shadow'] = concat(_context14 = concat(_context15 = concat(_context16 = "".concat(shadow.dx, "px ")).call(_context16, shadow.dy, "px ")).call(_context15, shadow.radius, "px ")).call(_context14, shadow.color);
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
	    value: function renderHtml() {
	      var _this3 = this;

	      var html = '';

	      var iter = function iter(view) {
	        try {
	          var _this3$renderView = _this3.renderView(view),
	              tagName = _this3$renderView.tagName,
	              contents = _this3$renderView.contents,
	              classNames = _this3$renderView.classNames,
	              styles = _this3$renderView.styles,
	              attrs = _this3$renderView.attrs;

	          if (view.id != null && typeof view.meta === 'object') {
	            _this3.ids[view.id] = view.meta;
	          }

	          if (view.role === 'section') {
	            _this3.sections.push({
	              id: view.id,
	              meta: view.meta
	            });
	          }

	          html += "<".concat(tagName);
	          html += " class=\"".concat(classNames.join(' '), "\"");

	          for (var key in attrs) {
	            var _context17;

	            var value = attrs[key];
	            html += concat(_context17 = " ".concat(key, "=\"")).call(_context17, value, "\"");
	          }

	          html += ' style="';

	          for (var _key in styles) {
	            var _context18;

	            var _value = styles[_key];
	            html += concat(_context18 = "".concat(_key, ":")).call(_context18, _value, "; ");
	          }

	          html += '"';

	          for (var _key2 in attrs) {
	            var _context19;

	            var _value2 = attrs[_key2];
	            html += concat(_context19 = " ".concat(_key2, "=\"")).call(_context19, _value2, "\"");
	          }

	          html += '>';

	          if (isArray(view.child_views)) {
	            var _context20;

	            forEach(_context20 = view.child_views).call(_context20, function (childView) {
	              iter(childView);
	            });
	          }

	          if (contents) {
	            html += contents;
	          }

	          html += "</".concat(tagName, ">");
	        } catch (error) {}
	      };

	      iter(this.incito.root_view);
	      return html;
	    }
	  }]);

	  return Incito;
	}(microevent);

	return Incito;

})));
//# sourceMappingURL=incito.js.map
