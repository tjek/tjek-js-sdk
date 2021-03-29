(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SGN = factory());
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
	var getOwnPropertyDescriptor$8 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG$1 = getOwnPropertyDescriptor$8 && !nativePropertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$d = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$8(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable$2;

	var objectPropertyIsEnumerable$1 = {
		f: f$d
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

	var document$6 = global$2.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$1(document$6) && isObject$1(document$6.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$6.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine$1 = !descriptors$1 && !fails$1(function () {
	  return Object.defineProperty(documentCreateElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$c = descriptors$1 ? nativeGetOwnPropertyDescriptor$3 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$1(O);
	  P = toPrimitive$1(P, true);
	  if (ie8DomDefine$1) try {
	    return nativeGetOwnPropertyDescriptor$3(O, P);
	  } catch (error) { /* empty */ }
	  if (has$3(O, P)) return createPropertyDescriptor$1(!objectPropertyIsEnumerable$1.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor$1 = {
		f: f$c
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
	var functionBindContext$1 = function (fn, that, length) {
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
	var f$b = descriptors$1 ? nativeDefineProperty$2 : function defineProperty(O, P, Attributes) {
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
		f: f$b
	};

	var createNonEnumerableProperty$1 = descriptors$1 ? function (object, key, value) {
	  return objectDefineProperty$1.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	'use strict';

	var getOwnPropertyDescriptor$7 = objectGetOwnPropertyDescriptor$1.f;






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
	      descriptor = getOwnPropertyDescriptor$7(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = functionBindContext$1(sourceProperty, global$2);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext$1(Function.call, sourceProperty);
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

	'use strict';



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

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	_export$1({ target: 'Function', proto: true }, {
	  bind: functionBind
	});

	var es_function_bind = {

	};

	var entryVirtual = function (CONSTRUCTOR) {
	  return path$1[CONSTRUCTOR + 'Prototype'];
	};

	var bind$4 = entryVirtual('Function').bind;

	var FunctionPrototype$1 = Function.prototype;

	var bind_1 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype$1 || (it instanceof Function && own === FunctionPrototype$1.bind) ? bind$4 : own;
	};

	var bind$3 = bind_1;

	var bind$2 = bind$3;

	var aFunction$2 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$1 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$2(path$1[namespace]) || aFunction$2(global$2[namespace])
	    : path$1[namespace] && path$1[namespace][method] || global$2[namespace] && global$2[namespace][method];
	};

	var ceil$1 = Math.ceil;
	var floor$4 = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger$1 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$4 : ceil$1)(argument);
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
	var createMethod$8 = function (IS_INCLUDES) {
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
	  includes: createMethod$8(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$8(false)
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

	var keys$9 = shared$1('keys');

	var sharedKey$1 = function (key) {
	  return keys$9[key] || (keys$9[key] = uid$1(key));
	};

	var GT$1 = '>';
	var LT$1 = '<';
	var PROTOTYPE$2 = 'prototype';
	var SCRIPT$1 = 'script';
	var IE_PROTO$3 = sharedKey$1('IE_PROTO');

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
	    /* global ActiveXObject -- old IE */
	    activeXDocument$1 = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject$1 = activeXDocument$1 ? NullProtoObjectViaActiveX$1(activeXDocument$1) : NullProtoObjectViaIFrame$1();
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject$1[PROTOTYPE$2][enumBugKeys$1[length]];
	  return NullProtoObject$1();
	};

	hiddenKeys$3[IE_PROTO$3] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate$1 = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor$1[PROTOTYPE$2] = anObject$1(O);
	    result = new EmptyConstructor$1();
	    EmptyConstructor$1[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$3] = O;
	  } else result = NullProtoObject$1();
	  return Properties === undefined ? result : objectDefineProperties$1(result, Properties);
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
	var FORCED$9 = NEW_TARGET_BUG || ARGS_BUG;

	_export$1({ target: 'Reflect', stat: true, forced: FORCED$9, sham: FORCED$9 }, {
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
	    var instance = objectCreate$1(isObject$1(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject$1(result) ? result : instance;
	  }
	});

	var es_reflect_construct = {

	};

	var construct$2 = path$1.Reflect.construct;

	var construct$1 = construct$2;

	var construct = construct$1;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$1 = function (argument) {
	  return Object(requireObjectCoercible$1(argument));
	};

	var FAILS_ON_PRIMITIVES$2 = fails$1(function () { objectKeys$1(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	_export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
	  keys: function keys(it) {
	    return objectKeys$1(toObject$1(it));
	  }
	});

	var es_object_keys = {

	};

	var keys$8 = path$1.Object.keys;

	var keys$7 = keys$8;

	var keys$6 = keys$7;

	var engineIsNode$1 = classofRaw$1(global$2.process) == 'process';

	var engineUserAgent$1 = getBuiltIn$1('navigator', 'userAgent') || '';

	var process$8 = global$2.process;
	var versions$1 = process$8 && process$8.versions;
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

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	var isArray$5 = Array.isArray || function isArray(arg) {
	  return classofRaw$1(arg) == 'Array';
	};

	var hiddenKeys$2 = enumBugKeys$1.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$a = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertyNames$1 = {
		f: f$a
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
	var f$9 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames$1(toIndexedObject$1(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$9
	};

	var f$8 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols$1 = {
		f: f$8
	};

	var redefine$1 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$1(target, key, value);
	};

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

	var f$7 = wellKnownSymbol$1;

	var wellKnownSymbolWrapped = {
		f: f$7
	};

	var defineProperty$a = objectDefineProperty$1.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path$1.Symbol || (path$1.Symbol = {});
	  if (!has$3(Symbol, NAME)) defineProperty$a(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var TO_STRING_TAG$7 = wellKnownSymbol$1('toStringTag');
	var test$2 = {};

	test$2[TO_STRING_TAG$7] = 'z';

	var toStringTagSupport$1 = String(test$2) === '[object z]';

	var TO_STRING_TAG$6 = wellKnownSymbol$1('toStringTag');
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
	    : typeof (tag = tryGet$1(O = Object(it), TO_STRING_TAG$6)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS$1 ? classofRaw$1(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	'use strict';



	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString$1 = toStringTagSupport$1 ? {}.toString : function toString() {
	  return '[object ' + classof$1(this) + ']';
	};

	var defineProperty$9 = objectDefineProperty$1.f;





	var TO_STRING_TAG$5 = wellKnownSymbol$1('toStringTag');

	var setToStringTag$1 = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has$3(target, TO_STRING_TAG$5)) {
	      defineProperty$9(target, TO_STRING_TAG$5, { configurable: true, value: TAG });
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
	var set$4, get$2, has$2;

	var enforce$1 = function (it) {
	  return has$2(it) ? get$2(it) : set$4(it, {});
	};

	var getterFor$1 = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$1(it) || (state = get$2(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap$1) {
	  var store$2 = sharedStore$1.state || (sharedStore$1.state = new WeakMap$2());
	  var wmget$1 = store$2.get;
	  var wmhas$1 = store$2.has;
	  var wmset$1 = store$2.set;
	  set$4 = function (it, metadata) {
	    metadata.facade = it;
	    wmset$1.call(store$2, it, metadata);
	    return metadata;
	  };
	  get$2 = function (it) {
	    return wmget$1.call(store$2, it) || {};
	  };
	  has$2 = function (it) {
	    return wmhas$1.call(store$2, it);
	  };
	} else {
	  var STATE$1 = sharedKey$1('state');
	  hiddenKeys$3[STATE$1] = true;
	  set$4 = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE$1, metadata);
	    return metadata;
	  };
	  get$2 = function (it) {
	    return has$3(it, STATE$1) ? it[STATE$1] : {};
	  };
	  has$2 = function (it) {
	    return has$3(it, STATE$1);
	  };
	}

	var internalState$1 = {
	  set: set$4,
	  get: get$2,
	  has: has$2,
	  enforce: enforce$1,
	  getterFor: getterFor$1
	};

	var SPECIES$9 = wellKnownSymbol$1('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray$5(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES$9];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
	var createMethod$7 = function (TYPE) {
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
	    var boundFunction = functionBindContext$1(callbackfn, that, 3);
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
	  forEach: createMethod$7(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$7(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$7(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$7(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$7(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$7(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$7(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$7(7)
	};

	'use strict';



































	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$1('toPrimitive');
	var setInternalState$9 = internalState$1.set;
	var getInternalState$6 = internalState$1.getterFor(SYMBOL);
	var ObjectPrototype$2 = Object[PROTOTYPE$1];
	var $Symbol = global$2.Symbol;
	var $stringify$1 = getBuiltIn$1('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor$1.f;
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
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors$1 && fails$1(function () {
	  return objectCreate$1(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$2, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$2[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$2) {
	    nativeDefineProperty$1(ObjectPrototype$2, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate$1($Symbol[PROTOTYPE$1]);
	  setInternalState$9(symbol, {
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
	  if (O === ObjectPrototype$2) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$1(O);
	  var key = toPrimitive$1(P, true);
	  anObject$1(Attributes);
	  if (has$3(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$3(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate$1(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
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
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$2 && has$3(AllSymbols, P) && !has$3(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$3(this, P) || !has$3(AllSymbols, P) || has$3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$1(O);
	  var key = toPrimitive$1(P, true);
	  if (it === ObjectPrototype$2 && has$3(AllSymbols, key) && !has$3(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
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
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$2;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has$3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$3(ObjectPrototype$2, key))) {
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
	      if (this === ObjectPrototype$2) setter.call(ObjectPrototypeSymbols, value);
	      if (has$3(this, HIDDEN) && has$3(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (descriptors$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$2, tag, { configurable: true, set: setter });
	    return wrap$1(tag, description);
	  };

	  redefine$1($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState$6(this).tag;
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
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$6(this).description;
	      }
	    });
	    if (!isPure$1) {
	      redefine$1(ObjectPrototype$2, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export$1({ global: true, wrap: true, forced: !nativeSymbol$1, sham: !nativeSymbol$1 }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys$1(WellKnownSymbolsStore$1), function (name) {
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
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
	  createNonEnumerableProperty$1($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$1($Symbol, SYMBOL);

	hiddenKeys$3[HIDDEN] = true;

	var es_symbol = {

	};

	var getOwnPropertySymbols$2 = path$1.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols$2;

	var getOwnPropertySymbols = getOwnPropertySymbols$1;

	var SPECIES$8 = wellKnownSymbol$1('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version$1 >= 51 || !fails$1(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$8] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	'use strict';

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_array_filter = {

	};

	var filter$2 = entryVirtual('Array').filter;

	var ArrayPrototype$g = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$g || (it instanceof Array && own === ArrayPrototype$g.filter) ? filter$2 : own;
	};

	var filter$1 = filter_1;

	var filter = filter$1;

	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor$1.f;


	var FAILS_ON_PRIMITIVES$1 = fails$1(function () { nativeGetOwnPropertyDescriptor$1(1); });
	var FORCED$8 = !descriptors$1 || FAILS_ON_PRIMITIVES$1;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	_export$1({ target: 'Object', stat: true, forced: FORCED$8, sham: !descriptors$1 }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$1(toIndexedObject$1(it), key);
	  }
	});

	var es_object_getOwnPropertyDescriptor = {

	};

	var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
	var Object = path$1.Object;

	var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
	  return Object.getOwnPropertyDescriptor(it, key);
	};

	if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
	});

	var getOwnPropertyDescriptor$6 = getOwnPropertyDescriptor_1;

	var getOwnPropertyDescriptor$5 = getOwnPropertyDescriptor$6;

	var addToUnscopables$1 = function () { /* empty */ };

	var iterators$1 = {};

	var correctPrototypeGetter$1 = !fails$1(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$2 = sharedKey$1('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf$1 = correctPrototypeGetter$1 ? Object.getPrototypeOf : function (O) {
	  O = toObject$1(O);
	  if (has$3(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	'use strict';







	var ITERATOR$d = wellKnownSymbol$1('iterator');
	var BUGGY_SAFARI_ITERATORS$3 = false;

	var returnThis$5 = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$5, PrototypeOfArrayIteratorPrototype$1, arrayIterator$1;

	if ([].keys) {
	  arrayIterator$1 = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator$1)) BUGGY_SAFARI_ITERATORS$3 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype$1 = objectGetPrototypeOf$1(objectGetPrototypeOf$1(arrayIterator$1));
	    if (PrototypeOfArrayIteratorPrototype$1 !== Object.prototype) IteratorPrototype$5 = PrototypeOfArrayIteratorPrototype$1;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE$1 = IteratorPrototype$5 == undefined || fails$1(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$5[ITERATOR$d].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE$1) IteratorPrototype$5 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ((!isPure$1 || NEW_ITERATOR_PROTOTYPE$1) && !has$3(IteratorPrototype$5, ITERATOR$d)) {
	  createNonEnumerableProperty$1(IteratorPrototype$5, ITERATOR$d, returnThis$5);
	}

	var iteratorsCore$1 = {
	  IteratorPrototype: IteratorPrototype$5,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$3
	};

	'use strict';
	var IteratorPrototype$4 = iteratorsCore$1.IteratorPrototype;





	var returnThis$4 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate$1(IteratorPrototype$4, { next: createPropertyDescriptor$1(1, next) });
	  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators$1[TO_STRING_TAG] = returnThis$4;
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

	'use strict';












	var IteratorPrototype$3 = iteratorsCore$1.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$2 = iteratorsCore$1.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$c = wellKnownSymbol$1('iterator');
	var KEYS$1 = 'keys';
	var VALUES$1 = 'values';
	var ENTRIES$1 = 'entries';

	var returnThis$3 = function () { return this; };

	var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$1(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$2 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS$1: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES$1: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES$1: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$c]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$2 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf$1(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$3 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (!isPure$1 && objectGetPrototypeOf$1(CurrentIteratorPrototype) !== IteratorPrototype$3) {
	        if (objectSetPrototypeOf$1) {
	          objectSetPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype$3);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$c] != 'function') {
	          createNonEnumerableProperty$1(CurrentIteratorPrototype, ITERATOR$c, returnThis$3);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (isPure$1) iterators$1[TO_STRING_TAG] = returnThis$3;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES$1 && nativeIterator && nativeIterator.name !== VALUES$1) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((!isPure$1 || FORCED) && IterablePrototype[ITERATOR$c] !== defaultIterator) {
	    createNonEnumerableProperty$1(IterablePrototype, ITERATOR$c, defaultIterator);
	  }
	  iterators$1[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES$1),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS$1),
	      entries: getIterationMethod(ENTRIES$1)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$2 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$1(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$2 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	'use strict';






	var ARRAY_ITERATOR$1 = 'Array Iterator';
	var setInternalState$8 = internalState$1.set;
	var getInternalState$5 = internalState$1.getterFor(ARRAY_ITERATOR$1);

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
	var es_array_iterator$1 = defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$8(this, {
	    type: ARRAY_ITERATOR$1,
	    target: toIndexedObject$1(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$5(this);
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
	iterators$1.Arguments = iterators$1.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1('keys');
	addToUnscopables$1('values');
	addToUnscopables$1('entries');

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables$1 = {
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

	var TO_STRING_TAG$4 = wellKnownSymbol$1('toStringTag');

	for (var COLLECTION_NAME$1 in domIterables$1) {
	  var Collection$1 = global$2[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  if (CollectionPrototype$1 && classof$1(CollectionPrototype$1) !== TO_STRING_TAG$4) {
	    createNonEnumerableProperty$1(CollectionPrototype$1, TO_STRING_TAG$4, COLLECTION_NAME$1);
	  }
	  iterators$1[COLLECTION_NAME$1] = iterators$1.Array;
	}

	var web_domCollections_iterator$1 = {

	};

	'use strict';


	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$1(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	'use strict';
	var $forEach = arrayIteration.forEach;


	var STRICT_METHOD$5 = arrayMethodIsStrict$1('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$5 ? function forEach(callbackfn /* , thisArg */) {
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

	var ArrayPrototype$f = Array.prototype;

	var DOMIterables$1 = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$f || (it instanceof Array && own === ArrayPrototype$f.forEach)
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || DOMIterables$1.hasOwnProperty(classof$1(it)) ? forEach$1 : own;
	};

	var forEach = forEach_1;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$4 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames$1.f(anObject$1(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	'use strict';




	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive$1(key);
	  if (propertyKey in object) objectDefineProperty$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	_export$1({ target: 'Object', stat: true, sham: !descriptors$1 }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject$1(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
	    var keys = ownKeys$4(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var es_object_getOwnPropertyDescriptors = {

	};

	var getOwnPropertyDescriptors$2 = path$1.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors$2;

	var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	_export$1({ target: 'Object', stat: true, forced: !descriptors$1, sham: !descriptors$1 }, {
	  defineProperties: objectDefineProperties$1
	});

	var es_object_defineProperties = {

	};

	var defineProperties_1 = createCommonjsModule(function (module) {
	var Object = path$1.Object;

	var defineProperties = module.exports = function defineProperties(T, D) {
	  return Object.defineProperties(T, D);
	};

	if (Object.defineProperties.sham) defineProperties.sham = true;
	});

	var defineProperties$1 = defineProperties_1;

	var defineProperties = defineProperties$1;

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

	var defineProperty$8 = defineProperty_1;

	var defineProperty$7 = defineProperty$8;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var defineProperty$6 = defineProperty_1;

	var defineProperty$5 = defineProperty$6;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$5(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	_export$1({ target: 'Object', stat: true, sham: !descriptors$1 }, {
	  create: objectCreate$1
	});

	var es_object_create = {

	};

	var Object$1 = path$1.Object;

	var create$4 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$3 = create$4;

	var create$2 = create$3;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	_export$1({ target: 'Object', stat: true }, {
	  setPrototypeOf: objectSetPrototypeOf$1
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

	  subClass.prototype = create$2(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	'use strict';












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

	var FORCED$7 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export$1({ target: 'Array', proto: true, forced: FORCED$7 }, {
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

	var es_array_concat = {

	};

	// empty

	var es_object_toString$2 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

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
	setToStringTag$1(global$2.JSON, 'JSON', true);

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

	var es_object_toString$1 = /*@__PURE__*/getAugmentedNamespace(es_object_toString$2);

	var es_symbol_description = /*@__PURE__*/getAugmentedNamespace(es_symbol_description$1);

	var es_math_toStringTag = /*@__PURE__*/getAugmentedNamespace(es_math_toStringTag$1);

	var es_reflect_toStringTag = /*@__PURE__*/getAugmentedNamespace(es_reflect_toStringTag$1);

	var symbol$4 = path$1.Symbol;

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


	var symbol$3 = symbol$4;

	var symbol$2 = symbol$3;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$6 = function (CONVERT_TO_STRING) {
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
	  codeAt: createMethod$6(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$6(true)
	};

	'use strict';
	var charAt$2 = stringMultibyte$1.charAt;



	var STRING_ITERATOR$1 = 'String Iterator';
	var setInternalState$7 = internalState$1.set;
	var getInternalState$4 = internalState$1.getterFor(STRING_ITERATOR$1);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator$1(String, 'String', function (iterated) {
	  setInternalState$7(this, {
	    type: STRING_ITERATOR$1,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$4(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt$2(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var es_string_iterator$1 = {

	};

	var iterator$2 = wellKnownSymbolWrapped.f('iterator');

	var iterator$1 = iterator$2;

	var iterator = iterator$1;

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof symbol$2 === "function" && typeof iterator === "symbol") {
	    _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof symbol$2 === "function" && obj.constructor === symbol$2 && obj !== symbol$2.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	var FAILS_ON_PRIMITIVES = fails$1(function () { objectGetPrototypeOf$1(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	_export$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !correctPrototypeGetter$1 }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf$1(toObject$1(it));
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

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$5(obj, key, {
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

	var isPure = false;

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

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var document$5 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$5) && isObject(document$5.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$5.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
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

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$6 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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
		f: f$6
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
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

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.9.1',
	  mode: isPure ? 'pure' : 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var hasOwnProperty = {}.hasOwnProperty;

	var has$1 = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var engineIsNode = classofRaw(global$1.process) == 'process';

	var path = global$1;

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global$1[namespace])
	    : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process$7 = global$1.process;
	var versions = process$7 && process$7.versions;
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

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

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

	var keys$5 = shared('keys');

	var sharedKey = function (key) {
	  return keys$5[key] || (keys$5[key] = uid(key));
	};

	var hiddenKeys$1 = {};

	var WeakMap = global$1.WeakMap;
	var set$3, get$1, has;

	var enforce = function (it) {
	  return has(it) ? get$1(it) : set$3(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get$1(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = sharedStore.state || (sharedStore.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set$3 = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$1[STATE] = true;
	  set$3 = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return has$1(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return has$1(it, STATE);
	  };
	}

	var internalState = {
	  set: set$3,
	  get: get$1,
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

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
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
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	'use strict';



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

	var es_object_toString = {

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

	var ceil = Math.ceil;
	var floor$3 = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$3 : ceil)(argument);
	};

	var min$5 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$5(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max$3 = Math.max;
	var min$4 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max$3(integer + length, 0) : min$4(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$5 = function (IS_INCLUDES) {
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
	  includes: createMethod$5(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$5(false)
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
	var IE_PROTO$1 = sharedKey('IE_PROTO');

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
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$e = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$e[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype$e, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype$e[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	'use strict';
	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$4 && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$5 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$4(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f$5
	};

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

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$2 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$2
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys$3 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys$3(source);
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

	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;






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
	      descriptor = getOwnPropertyDescriptor$3(target, key);
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

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has$1(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	'use strict';







	var ITERATOR$b = wellKnownSymbol('iterator');
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

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$b].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ((!isPure || NEW_ITERATOR_PROTOTYPE) && !has$1(IteratorPrototype$2, ITERATOR$b)) {
	  createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$b, returnThis$2);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$4 = objectDefineProperty.f;



	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
	    defineProperty$4(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
	  }
	};

	'use strict';
	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

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

	'use strict';












	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$a = wellKnownSymbol('iterator');
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
	  var nativeIterator = IterablePrototype[ITERATOR$a]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (!isPure && objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$a] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$a, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (isPure) iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((!isPure || FORCED) && IterablePrototype[ITERATOR$a] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$a, defaultIterator);
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
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	'use strict';






	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$6 = internalState.set;
	var getInternalState$3 = internalState.getterFor(ARRAY_ITERATOR);

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
	  setInternalState$6(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$3(this);
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

	var ITERATOR$9 = wellKnownSymbol('iterator');
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$9] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$9, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$9] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var web_domCollections_iterator = {

	};

	var concat$2 = entryVirtual('Array').concat;

	var ArrayPrototype$d = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$d || (it instanceof Array && own === ArrayPrototype$d.concat) ? concat$2 : own;
	};

	var concat$1 = concat_1;

	var concat = concat$1;

	'use strict';

	var $includes = arrayIncludes$1.includes;


	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	_export$1({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1('includes');

	var es_array_includes = {

	};

	var includes$4 = entryVirtual('Array').includes;

	var MATCH$3 = wellKnownSymbol$1('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp$1 = function (it) {
	  var isRegExp;
	  return isObject$1(it) && ((isRegExp = it[MATCH$3]) !== undefined ? !!isRegExp : classofRaw$1(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp$1(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$2 = wellKnownSymbol$1('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH$2] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	'use strict';





	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	_export$1({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible$1(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_string_includes = {

	};

	var includes$3 = entryVirtual('String').includes;

	var ArrayPrototype$c = Array.prototype;
	var StringPrototype$1 = String.prototype;

	var includes$2 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype$c || (it instanceof Array && own === ArrayPrototype$c.includes)) return includes$4;
	  if (typeof it === 'string' || it === StringPrototype$1 || (it instanceof String && own === StringPrototype$1.includes)) {
	    return includes$3;
	  } return own;
	};

	var includes$1 = includes$2;

	var includes = includes$1;

	var keys$4 = entryVirtual('Array').keys;

	var keys$3 = keys$4;

	var ArrayPrototype$b = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var keys_1 = function (it) {
	  var own = it.keys;
	  return it === ArrayPrototype$b || (it instanceof Array && own === ArrayPrototype$b.keys)
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || DOMIterables.hasOwnProperty(classof$1(it)) ? keys$3 : own;
	};

	var keys$2 = keys_1;

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

	var coreUrl = 'https://squid-api.tjek.com';
	var eventsTrackUrl = 'https://wolf-api.tjek.com/sync';

	var configDefaults = /*#__PURE__*/Object.freeze({
		__proto__: null,
		coreUrl: coreUrl,
		eventsTrackUrl: eventsTrackUrl
	});

	function ownKeys$2(object, enumerableOnly) { var keys = keys$6(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$5(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context3; forEach(_context3 = ownKeys$2(Object(source), true)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { defineProperties(target, getOwnPropertyDescriptors(source)); } else { var _context4; forEach(_context4 = ownKeys$2(Object(source))).call(_context4, function (key) { defineProperty$7(target, key, getOwnPropertyDescriptor$5(source, key)); }); } } return target; }

	function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var Config = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Config, _MicroEvent);

	  var _super = _createSuper$b(Config);

	  function Config() {
	    var _context;

	    var _this;

	    _classCallCheck(this, Config);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _super.call.apply(_super, concat(_context = [this]).call(_context, args));

	    _defineProperty(_assertThisInitialized(_this), "attrs", _objectSpread$2({}, configDefaults));

	    return _this;
	  }

	  _createClass(Config, [{
	    key: "set",
	    value: function set() {
	      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var changedAttributes = {};

	      for (var key in config) {
	        var _context2;

	        var value = config[key];

	        if (includes(_context2 = keys$2(this)).call(_context2, key)) {
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
	}(microevent);

	Config.prototype.keys = ['appVersion', 'appKey', 'authToken', 'eventTracker', 'coreUrl', 'eventsTrackUrl'];

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

	'use strict';



	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	var es_regexp_exec = {

	};

	'use strict';
	// TODO: Remove from `core-js@4` since it's moved to entry points







	var SPECIES$7 = wellKnownSymbol('species');

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
	      re.constructor[SPECIES$7] = function () { return re; };
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

	// `SameValue` abstract operation
	// https://tc39.es/ecma262/#sec-samevalue
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
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






	// @@search logic
	fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.es/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible(this);
	      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
	      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative(nativeSearch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regexpExecAbstract(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	var es_string_search = {

	};

	'use strict';





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

	var es_regexp_toString = {

	};

	var ITERATOR$8 = wellKnownSymbol$1('iterator');

	var nativeUrl = !fails$1(function () {
	  var url = new URL('b?a=1&b=2&c=3', 'http://a');
	  var searchParams = url.searchParams;
	  var result = '';
	  url.pathname = 'c%20d';
	  searchParams.forEach(function (value, key) {
	    searchParams['delete']('b');
	    result += key + value;
	  });
	  return (isPure$1 && !url.toJSON)
	    || !searchParams.sort
	    || url.href !== 'http://a/c%20d?a=1&c=3'
	    || searchParams.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !searchParams[ITERATOR$8]
	    // throws in Edge
	    || new URL('https://a@b').username !== 'a'
	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	    // not punycoded in Edge
	    || new URL('http://тест').host !== 'xn--e1aybc'
	    // not escaped in Chrome 62-
	    || new URL('http://a#б').hash !== '#%D0%B1'
	    // fails in Chrome 66-
	    || result !== 'a1c3'
	    // throws in Safari
	    || new URL('http://x', undefined).host !== 'x';
	});

	var anInstance$1 = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	'use strict';








	var nativeAssign = Object.assign;
	var defineProperty$3 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails$1(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors$1 && nativeAssign({ b: 1 }, nativeAssign(defineProperty$3({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$3(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  /* global Symbol -- required for testing */
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys$1(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$1(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols$1.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable$1.f;
	  while (argumentsLength > index) {
	    var S = indexedObject$1(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys$1(S).concat(getOwnPropertySymbols(S)) : objectKeys$1(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors$1 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	var iteratorClose$1 = function (iterator) {
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
	    iteratorClose$1(iterator);
	    throw error;
	  }
	};

	var ITERATOR$7 = wellKnownSymbol$1('iterator');
	var ArrayPrototype$a = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (iterators$1.Array === it || ArrayPrototype$a[ITERATOR$7] === it);
	};

	var ITERATOR$6 = wellKnownSymbol$1('iterator');

	var getIteratorMethod$2 = function (it) {
	  if (it != undefined) return it[ITERATOR$6]
	    || it['@@iterator']
	    || iterators$1[classof$1(it)];
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
	  var iteratorMethod = getIteratorMethod$2(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod$1(iteratorMethod))) {
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

	'use strict';
	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'
	var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
	var baseMinusTMin = base - tMin;
	var floor$2 = Math.floor;
	var stringFromCharCode = String.fromCharCode;

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 */
	var ucs2decode = function (string) {
	  var output = [];
	  var counter = 0;
	  var length = string.length;
	  while (counter < length) {
	    var value = string.charCodeAt(counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      var extra = string.charCodeAt(counter++);
	      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
	        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        output.push(value);
	        counter--;
	      }
	    } else {
	      output.push(value);
	    }
	  }
	  return output;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 */
	var digitToBasic = function (digit) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 */
	var adapt = function (delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor$2(delta / damp) : delta >> 1;
	  delta += floor$2(delta / numPoints);
	  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
	    delta = floor$2(delta / baseMinusTMin);
	  }
	  return floor$2(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 */
	// eslint-disable-next-line max-statements -- TODO
	var encode = function (input) {
	  var output = [];

	  // Convert the input in UCS-2 to an array of Unicode code points.
	  input = ucs2decode(input);

	  // Cache the length.
	  var inputLength = input.length;

	  // Initialize the state.
	  var n = initialN;
	  var delta = 0;
	  var bias = initialBias;
	  var i, currentValue;

	  // Handle the basic code points.
	  for (i = 0; i < input.length; i++) {
	    currentValue = input[i];
	    if (currentValue < 0x80) {
	      output.push(stringFromCharCode(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    output.push(delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {
	    // All non-basic code points < n have been handled already. Find the next larger one:
	    var m = maxInt;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
	    var handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor$2((maxInt - delta) / handledCPCountPlusOne)) {
	      throw RangeError(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw RangeError(OVERFLOW_ERROR);
	      }
	      if (currentValue == n) {
	        // Represent delta as a generalized variable-length integer.
	        var q = delta;
	        for (var k = base; /* no condition */; k += base) {
	          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$2(qMinusT / baseMinusT);
	        }

	        output.push(stringFromCharCode(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	        delta = 0;
	        ++handledCPCount;
	      }
	    }

	    ++delta;
	    ++n;
	  }
	  return output.join('');
	};

	var stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
	  }
	  return encoded.join('.');
	};

	var redefineAll$1 = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else redefine$1(target, key, src[key], options);
	  } return target;
	};

	var getIterator$1 = function (it) {
	  var iteratorMethod = getIteratorMethod$2(it);
	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  } return anObject$1(iteratorMethod.call(it));
	};

	'use strict';
	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`





















	var $fetch$2 = getBuiltIn$1('fetch');
	var Headers = getBuiltIn$1('Headers');
	var ITERATOR$5 = wellKnownSymbol$1('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$5 = internalState$1.set;
	var getInternalParamsState = internalState$1.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = internalState$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);

	var plus = /\+/g;
	var sequences = Array(4);

	var percentSequence = function (bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};

	var percentDecode = function (sequence) {
	  try {
	    return decodeURIComponent(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};

	var deserialize = function (it) {
	  var result = it.replace(plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent(result);
	  } catch (error) {
	    while (bytes) {
	      result = result.replace(percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};

	var find$3 = /[!'()~]|%20/g;

	var replace$1 = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};

	var replacer = function (match) {
	  return replace$1[match];
	};

	var serialize = function (it) {
	  return encodeURIComponent(it).replace(find$3, replacer);
	};

	var parseSearchParams = function (result, query) {
	  if (query) {
	    var attributes = query.split('&');
	    var index = 0;
	    var attribute, entry;
	    while (index < attributes.length) {
	      attribute = attributes[index++];
	      if (attribute.length) {
	        entry = attribute.split('=');
	        result.push({
	          key: deserialize(entry.shift()),
	          value: deserialize(entry.join('='))
	        });
	      }
	    }
	  }
	};

	var updateSearchParams = function (query) {
	  this.entries.length = 0;
	  parseSearchParams(this.entries, query);
	};

	var validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw TypeError('Not enough arguments');
	};

	var URLSearchParamsIterator = createIteratorConstructor$1(function Iterator(params, kind) {
	  setInternalState$5(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    iterator: getIterator$1(getInternalParamsState(params).entries),
	    kind: kind
	  });
	}, 'Iterator', function next() {
	  var state = getInternalIteratorState(this);
	  var kind = state.kind;
	  var step = state.iterator.next();
	  var entry = step.value;
	  if (!step.done) {
	    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
	  } return step;
	});

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
	  anInstance$1(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var that = this;
	  var entries = [];
	  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

	  setInternalState$5(that, {
	    type: URL_SEARCH_PARAMS,
	    entries: entries,
	    updateURL: function () { /* empty */ },
	    updateSearchParams: updateSearchParams
	  });

	  if (init !== undefined) {
	    if (isObject$1(init)) {
	      iteratorMethod = getIteratorMethod$2(init);
	      if (typeof iteratorMethod === 'function') {
	        iterator = iteratorMethod.call(init);
	        next = iterator.next;
	        while (!(step = next.call(iterator)).done) {
	          entryIterator = getIterator$1(anObject$1(step.value));
	          entryNext = entryIterator.next;
	          if (
	            (first = entryNext.call(entryIterator)).done ||
	            (second = entryNext.call(entryIterator)).done ||
	            !entryNext.call(entryIterator).done
	          ) throw TypeError('Expected sequence with length 2');
	          entries.push({ key: first.value + '', value: second.value + '' });
	        }
	      } else for (key in init) if (has$3(init, key)) entries.push({ key: key, value: init[key] + '' });
	    } else {
	      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
	    }
	  }
	};

	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

	redefineAll$1(URLSearchParamsPrototype, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    validateArgumentsLength(arguments.length, 2);
	    var state = getInternalParamsState(this);
	    state.entries.push({ key: name + '', value: value + '' });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name) {
	    validateArgumentsLength(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var key = name + '';
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index].key === key) entries.splice(index, 1);
	      else index++;
	    }
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  // `URLSearchParams.prototype.getAll` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
	  getAll: function getAll(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) result.push(entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = name + '';
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index++].key === key) return true;
	    }
	    return false;
	  },
	  // `URLSearchParams.prototype.set` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
	  set: function set(name, value) {
	    validateArgumentsLength(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var found = false;
	    var key = name + '';
	    var val = value + '';
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) entries.splice(index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) entries.push({ key: key, value: val });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    // Array#sort is not stable in some engines
	    var slice = entries.slice();
	    var entry, entriesIndex, sliceIndex;
	    entries.length = 0;
	    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
	      entry = slice[sliceIndex];
	      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
	        if (entries[entriesIndex].key > entry.key) {
	          entries.splice(entriesIndex, 0, entry);
	          break;
	        }
	      }
	      if (entriesIndex === sliceIndex) entries.push(entry);
	    }
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = functionBindContext$1(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  // `URLSearchParams.prototype.keys` method
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  // `URLSearchParams.prototype.values` method
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  // `URLSearchParams.prototype.entries` method
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, { enumerable: true });

	// `URLSearchParams.prototype[@@iterator]` method
	redefine$1(URLSearchParamsPrototype, ITERATOR$5, URLSearchParamsPrototype.entries);

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	redefine$1(URLSearchParamsPrototype, 'toString', function toString() {
	  var entries = getInternalParamsState(this).entries;
	  var result = [];
	  var index = 0;
	  var entry;
	  while (index < entries.length) {
	    entry = entries[index++];
	    result.push(serialize(entry.key) + '=' + serialize(entry.value));
	  } return result.join('&');
	}, { enumerable: true });

	setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	_export$1({ global: true, forced: !nativeUrl }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
	// https://github.com/zloirock/core-js/issues/674
	if (!nativeUrl && typeof $fetch$2 == 'function' && typeof Headers == 'function') {
	  _export$1({ global: true, enumerable: true, forced: true }, {
	    fetch: function fetch(input /* , init */) {
	      var args = [input];
	      var init, body, headers;
	      if (arguments.length > 1) {
	        init = arguments[1];
	        if (isObject$1(init)) {
	          body = init.body;
	          if (classof$1(body) === URL_SEARCH_PARAMS) {
	            headers = init.headers ? new Headers(init.headers) : new Headers();
	            if (!headers.has('content-type')) {
	              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	            }
	            init = objectCreate$1(init, {
	              body: createPropertyDescriptor$1(0, String(body)),
	              headers: createPropertyDescriptor$1(0, headers)
	            });
	          }
	        }
	        args.push(init);
	      } return $fetch$2.apply(this, args);
	    }
	  });
	}

	var web_urlSearchParams = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	'use strict';
	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`











	var codeAt = stringMultibyte$1.codeAt;





	var NativeURL = global$2.URL;
	var URLSearchParams$1 = web_urlSearchParams.URLSearchParams;
	var getInternalSearchParamsState = web_urlSearchParams.getState;
	var setInternalState$4 = internalState$1.set;
	var getInternalURLState = internalState$1.getterFor('URL');
	var floor$1 = Math.floor;
	var pow = Math.pow;

	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';

	var ALPHA = /[A-Za-z]/;
	var ALPHANUMERIC = /[\d+-.A-Za-z]/;
	var DIGIT = /\d/;
	var HEX_START = /^(0x|0X)/;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\dA-Fa-f]+$/;
	/* eslint-disable no-control-regex -- safe */
	var FORBIDDEN_HOST_CODE_POINT = /[\u0000\t\u000A\u000D #%/:?@[\\]]/;
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\t\u000A\u000D #/:?@[\\]]/;
	var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
	var TAB_AND_NEW_LINE = /[\t\u000A\u000D]/g;
	/* eslint-enable no-control-regex -- safe */
	var EOF;

	var parseHost = function (url, input) {
	  var result, codePoints, index;
	  if (input.charAt(0) == '[') {
	    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
	    result = parseIPv6(input.slice(1, -1));
	    if (!result) return INVALID_HOST;
	    url.host = result;
	  // opaque host
	  } else if (!isSpecial(url)) {
	    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
	    result = '';
	    codePoints = arrayFrom(input);
	    for (index = 0; index < codePoints.length; index++) {
	      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	    }
	    url.host = result;
	  } else {
	    input = stringPunycodeToAscii(input);
	    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
	    result = parseIPv4(input);
	    if (result === null) return INVALID_HOST;
	    url.host = result;
	  }
	};

	var parseIPv4 = function (input) {
	  var parts = input.split('.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] == '') {
	    parts.pop();
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return input;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part == '') return input;
	    radix = 10;
	    if (part.length > 1 && part.charAt(0) == '0') {
	      radix = HEX_START.test(part) ? 16 : 8;
	      part = part.slice(radix == 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
	      number = parseInt(part, radix);
	    }
	    numbers.push(number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index == partsLength - 1) {
	      if (number >= pow(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = numbers.pop();
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow(256, 3 - index);
	  }
	  return ipv4;
	};

	// eslint-disable-next-line max-statements -- TODO
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

	  var char = function () {
	    return input.charAt(pointer);
	  };

	  if (char() == ':') {
	    if (input.charAt(1) != ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (char()) {
	    if (pieceIndex == 8) return;
	    if (char() == ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && HEX.test(char())) {
	      value = value * 16 + parseInt(char(), 16);
	      pointer++;
	      length++;
	    }
	    if (char() == '.') {
	      if (length == 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (char()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (char() == '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!DIGIT.test(char())) return;
	        while (DIGIT.test(char())) {
	          number = parseInt(char(), 10);
	          if (ipv4Piece === null) ipv4Piece = number;
	          else if (ipv4Piece == 0) return;
	          else ipv4Piece = ipv4Piece * 10 + number;
	          if (ipv4Piece > 255) return;
	          pointer++;
	        }
	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
	        numbersSeen++;
	        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
	      }
	      if (numbersSeen != 4) return;
	      break;
	    } else if (char() == ':') {
	      pointer++;
	      if (!char()) return;
	    } else if (char()) return;
	    address[pieceIndex++] = value;
	  }
	  if (compress !== null) {
	    swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex != 0 && swaps > 0) {
	      swap = address[pieceIndex];
	      address[pieceIndex--] = address[compress + swaps - 1];
	      address[compress + --swaps] = swap;
	    }
	  } else if (pieceIndex != 8) return;
	  return address;
	};

	var findLongestZeroSequence = function (ipv6) {
	  var maxIndex = null;
	  var maxLength = 1;
	  var currStart = null;
	  var currLength = 0;
	  var index = 0;
	  for (; index < 8; index++) {
	    if (ipv6[index] !== 0) {
	      if (currLength > maxLength) {
	        maxIndex = currStart;
	        maxLength = currLength;
	      }
	      currStart = null;
	      currLength = 0;
	    } else {
	      if (currStart === null) currStart = index;
	      ++currLength;
	    }
	  }
	  if (currLength > maxLength) {
	    maxIndex = currStart;
	    maxLength = currLength;
	  }
	  return maxIndex;
	};

	var serializeHost = function (host) {
	  var result, index, compress, ignore0;
	  // ipv4
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      result.unshift(host % 256);
	      host = floor$1(host / 256);
	    } return result.join('.');
	  // ipv6
	  } else if (typeof host == 'object') {
	    result = '';
	    compress = findLongestZeroSequence(host);
	    for (index = 0; index < 8; index++) {
	      if (ignore0 && host[index] === 0) continue;
	      if (ignore0) ignore0 = false;
	      if (compress === index) {
	        result += index ? ':' : '::';
	        ignore0 = true;
	      } else {
	        result += host[index].toString(16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  } return host;
	};

	var C0ControlPercentEncodeSet = {};
	var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1
	});
	var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});

	var percentEncode = function (char, set) {
	  var code = codeAt(char, 0);
	  return code > 0x20 && code < 0x7F && !has$3(set, char) ? char : encodeURIComponent(char);
	};

	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	var isSpecial = function (url) {
	  return has$3(specialSchemes, url.scheme);
	};

	var includesCredentials = function (url) {
	  return url.username != '' || url.password != '';
	};

	var cannotHaveUsernamePasswordPort = function (url) {
	  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
	};

	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length == 2 && ALPHA.test(string.charAt(0))
	    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
	};

	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
	    string.length == 2 ||
	    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};

	var shortenURLsPath = function (url) {
	  var path = url.path;
	  var pathSize = path.length;
	  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
	    path.pop();
	  }
	};

	var isSingleDot = function (segment) {
	  return segment === '.' || segment.toLowerCase() === '%2e';
	};

	var isDoubleDot = function (segment) {
	  segment = segment.toLowerCase();
	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
	};

	// States:
	var SCHEME_START = {};
	var SCHEME = {};
	var NO_SCHEME = {};
	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
	var PATH_OR_AUTHORITY = {};
	var RELATIVE = {};
	var RELATIVE_SLASH = {};
	var SPECIAL_AUTHORITY_SLASHES = {};
	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
	var AUTHORITY = {};
	var HOST = {};
	var HOSTNAME = {};
	var PORT = {};
	var FILE = {};
	var FILE_SLASH = {};
	var FILE_HOST = {};
	var PATH_START = {};
	var PATH = {};
	var CANNOT_BE_A_BASE_URL_PATH = {};
	var QUERY = {};
	var FRAGMENT = {};

	// eslint-disable-next-line max-statements -- TODO
	var parseURL = function (url, input, stateOverride, base) {
	  var state = stateOverride || SCHEME_START;
	  var pointer = 0;
	  var buffer = '';
	  var seenAt = false;
	  var seenBracket = false;
	  var seenPasswordToken = false;
	  var codePoints, char, bufferCodePoints, failure;

	  if (!stateOverride) {
	    url.scheme = '';
	    url.username = '';
	    url.password = '';
	    url.host = null;
	    url.port = null;
	    url.path = [];
	    url.query = null;
	    url.fragment = null;
	    url.cannotBeABaseURL = false;
	    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
	  }

	  input = input.replace(TAB_AND_NEW_LINE, '');

	  codePoints = arrayFrom(input);

	  while (pointer <= codePoints.length) {
	    char = codePoints[pointer];
	    switch (state) {
	      case SCHEME_START:
	        if (char && ALPHA.test(char)) {
	          buffer += char.toLowerCase();
	          state = SCHEME;
	        } else if (!stateOverride) {
	          state = NO_SCHEME;
	          continue;
	        } else return INVALID_SCHEME;
	        break;

	      case SCHEME:
	        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
	          buffer += char.toLowerCase();
	        } else if (char == ':') {
	          if (stateOverride && (
	            (isSpecial(url) != has$3(specialSchemes, buffer)) ||
	            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
	            (url.scheme == 'file' && !url.host)
	          )) return;
	          url.scheme = buffer;
	          if (stateOverride) {
	            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
	            return;
	          }
	          buffer = '';
	          if (url.scheme == 'file') {
	            state = FILE;
	          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
	            state = SPECIAL_RELATIVE_OR_AUTHORITY;
	          } else if (isSpecial(url)) {
	            state = SPECIAL_AUTHORITY_SLASHES;
	          } else if (codePoints[pointer + 1] == '/') {
	            state = PATH_OR_AUTHORITY;
	            pointer++;
	          } else {
	            url.cannotBeABaseURL = true;
	            url.path.push('');
	            state = CANNOT_BE_A_BASE_URL_PATH;
	          }
	        } else if (!stateOverride) {
	          buffer = '';
	          state = NO_SCHEME;
	          pointer = 0;
	          continue;
	        } else return INVALID_SCHEME;
	        break;

	      case NO_SCHEME:
	        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
	        if (base.cannotBeABaseURL && char == '#') {
	          url.scheme = base.scheme;
	          url.path = base.path.slice();
	          url.query = base.query;
	          url.fragment = '';
	          url.cannotBeABaseURL = true;
	          state = FRAGMENT;
	          break;
	        }
	        state = base.scheme == 'file' ? FILE : RELATIVE;
	        continue;

	      case SPECIAL_RELATIVE_OR_AUTHORITY:
	        if (char == '/' && codePoints[pointer + 1] == '/') {
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          pointer++;
	        } else {
	          state = RELATIVE;
	          continue;
	        } break;

	      case PATH_OR_AUTHORITY:
	        if (char == '/') {
	          state = AUTHORITY;
	          break;
	        } else {
	          state = PATH;
	          continue;
	        }

	      case RELATIVE:
	        url.scheme = base.scheme;
	        if (char == EOF) {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = base.query;
	        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
	          state = RELATIVE_SLASH;
	        } else if (char == '?') {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = '';
	          state = QUERY;
	        } else if (char == '#') {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.query = base.query;
	          url.fragment = '';
	          state = FRAGMENT;
	        } else {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          url.path = base.path.slice();
	          url.path.pop();
	          state = PATH;
	          continue;
	        } break;

	      case RELATIVE_SLASH:
	        if (isSpecial(url) && (char == '/' || char == '\\')) {
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	        } else if (char == '/') {
	          state = AUTHORITY;
	        } else {
	          url.username = base.username;
	          url.password = base.password;
	          url.host = base.host;
	          url.port = base.port;
	          state = PATH;
	          continue;
	        } break;

	      case SPECIAL_AUTHORITY_SLASHES:
	        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
	        pointer++;
	        break;

	      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	        if (char != '/' && char != '\\') {
	          state = AUTHORITY;
	          continue;
	        } break;

	      case AUTHORITY:
	        if (char == '@') {
	          if (seenAt) buffer = '%40' + buffer;
	          seenAt = true;
	          bufferCodePoints = arrayFrom(buffer);
	          for (var i = 0; i < bufferCodePoints.length; i++) {
	            var codePoint = bufferCodePoints[i];
	            if (codePoint == ':' && !seenPasswordToken) {
	              seenPasswordToken = true;
	              continue;
	            }
	            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
	            if (seenPasswordToken) url.password += encodedCodePoints;
	            else url.username += encodedCodePoints;
	          }
	          buffer = '';
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url))
	        ) {
	          if (seenAt && buffer == '') return INVALID_AUTHORITY;
	          pointer -= arrayFrom(buffer).length + 1;
	          buffer = '';
	          state = HOST;
	        } else buffer += char;
	        break;

	      case HOST:
	      case HOSTNAME:
	        if (stateOverride && url.scheme == 'file') {
	          state = FILE_HOST;
	          continue;
	        } else if (char == ':' && !seenBracket) {
	          if (buffer == '') return INVALID_HOST;
	          failure = parseHost(url, buffer);
	          if (failure) return failure;
	          buffer = '';
	          state = PORT;
	          if (stateOverride == HOSTNAME) return;
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url))
	        ) {
	          if (isSpecial(url) && buffer == '') return INVALID_HOST;
	          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
	          failure = parseHost(url, buffer);
	          if (failure) return failure;
	          buffer = '';
	          state = PATH_START;
	          if (stateOverride) return;
	          continue;
	        } else {
	          if (char == '[') seenBracket = true;
	          else if (char == ']') seenBracket = false;
	          buffer += char;
	        } break;

	      case PORT:
	        if (DIGIT.test(char)) {
	          buffer += char;
	        } else if (
	          char == EOF || char == '/' || char == '?' || char == '#' ||
	          (char == '\\' && isSpecial(url)) ||
	          stateOverride
	        ) {
	          if (buffer != '') {
	            var port = parseInt(buffer, 10);
	            if (port > 0xFFFF) return INVALID_PORT;
	            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
	            buffer = '';
	          }
	          if (stateOverride) return;
	          state = PATH_START;
	          continue;
	        } else return INVALID_PORT;
	        break;

	      case FILE:
	        url.scheme = 'file';
	        if (char == '/' || char == '\\') state = FILE_SLASH;
	        else if (base && base.scheme == 'file') {
	          if (char == EOF) {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = base.query;
	          } else if (char == '?') {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = '';
	            state = QUERY;
	          } else if (char == '#') {
	            url.host = base.host;
	            url.path = base.path.slice();
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
	              url.host = base.host;
	              url.path = base.path.slice();
	              shortenURLsPath(url);
	            }
	            state = PATH;
	            continue;
	          }
	        } else {
	          state = PATH;
	          continue;
	        } break;

	      case FILE_SLASH:
	        if (char == '/' || char == '\\') {
	          state = FILE_HOST;
	          break;
	        }
	        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
	          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
	          else url.host = base.host;
	        }
	        state = PATH;
	        continue;

	      case FILE_HOST:
	        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
	          if (!stateOverride && isWindowsDriveLetter(buffer)) {
	            state = PATH;
	          } else if (buffer == '') {
	            url.host = '';
	            if (stateOverride) return;
	            state = PATH_START;
	          } else {
	            failure = parseHost(url, buffer);
	            if (failure) return failure;
	            if (url.host == 'localhost') url.host = '';
	            if (stateOverride) return;
	            buffer = '';
	            state = PATH_START;
	          } continue;
	        } else buffer += char;
	        break;

	      case PATH_START:
	        if (isSpecial(url)) {
	          state = PATH;
	          if (char != '/' && char != '\\') continue;
	        } else if (!stateOverride && char == '?') {
	          url.query = '';
	          state = QUERY;
	        } else if (!stateOverride && char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          state = PATH;
	          if (char != '/') continue;
	        } break;

	      case PATH:
	        if (
	          char == EOF || char == '/' ||
	          (char == '\\' && isSpecial(url)) ||
	          (!stateOverride && (char == '?' || char == '#'))
	        ) {
	          if (isDoubleDot(buffer)) {
	            shortenURLsPath(url);
	            if (char != '/' && !(char == '\\' && isSpecial(url))) {
	              url.path.push('');
	            }
	          } else if (isSingleDot(buffer)) {
	            if (char != '/' && !(char == '\\' && isSpecial(url))) {
	              url.path.push('');
	            }
	          } else {
	            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	              if (url.host) url.host = '';
	              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
	            }
	            url.path.push(buffer);
	          }
	          buffer = '';
	          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
	            while (url.path.length > 1 && url.path[0] === '') {
	              url.path.shift();
	            }
	          }
	          if (char == '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (char == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          }
	        } else {
	          buffer += percentEncode(char, pathPercentEncodeSet);
	        } break;

	      case CANNOT_BE_A_BASE_URL_PATH:
	        if (char == '?') {
	          url.query = '';
	          state = QUERY;
	        } else if (char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
	        } break;

	      case QUERY:
	        if (!stateOverride && char == '#') {
	          url.fragment = '';
	          state = FRAGMENT;
	        } else if (char != EOF) {
	          if (char == "'" && isSpecial(url)) url.query += '%27';
	          else if (char == '#') url.query += '%23';
	          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
	        } break;

	      case FRAGMENT:
	        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
	        break;
	    }

	    pointer++;
	  }
	};

	// `URL` constructor
	// https://url.spec.whatwg.org/#url-class
	var URLConstructor = function URL(url /* , base */) {
	  var that = anInstance$1(this, URLConstructor, 'URL');
	  var base = arguments.length > 1 ? arguments[1] : undefined;
	  var urlString = String(url);
	  var state = setInternalState$4(that, { type: 'URL' });
	  var baseState, failure;
	  if (base !== undefined) {
	    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
	    else {
	      failure = parseURL(baseState = {}, String(base));
	      if (failure) throw TypeError(failure);
	    }
	  }
	  failure = parseURL(state, urlString, null, baseState);
	  if (failure) throw TypeError(failure);
	  var searchParams = state.searchParams = new URLSearchParams$1();
	  var searchParamsState = getInternalSearchParamsState(searchParams);
	  searchParamsState.updateSearchParams(state.query);
	  searchParamsState.updateURL = function () {
	    state.query = String(searchParams) || null;
	  };
	  if (!descriptors$1) {
	    that.href = serializeURL.call(that);
	    that.origin = getOrigin.call(that);
	    that.protocol = getProtocol.call(that);
	    that.username = getUsername.call(that);
	    that.password = getPassword.call(that);
	    that.host = getHost.call(that);
	    that.hostname = getHostname.call(that);
	    that.port = getPort.call(that);
	    that.pathname = getPathname.call(that);
	    that.search = getSearch.call(that);
	    that.searchParams = getSearchParams.call(that);
	    that.hash = getHash.call(that);
	  }
	};

	var URLPrototype = URLConstructor.prototype;

	var serializeURL = function () {
	  var url = getInternalURLState(this);
	  var scheme = url.scheme;
	  var username = url.username;
	  var password = url.password;
	  var host = url.host;
	  var port = url.port;
	  var path = url.path;
	  var query = url.query;
	  var fragment = url.fragment;
	  var output = scheme + ':';
	  if (host !== null) {
	    output += '//';
	    if (includesCredentials(url)) {
	      output += username + (password ? ':' + password : '') + '@';
	    }
	    output += serializeHost(host);
	    if (port !== null) output += ':' + port;
	  } else if (scheme == 'file') output += '//';
	  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
	  if (query !== null) output += '?' + query;
	  if (fragment !== null) output += '#' + fragment;
	  return output;
	};

	var getOrigin = function () {
	  var url = getInternalURLState(this);
	  var scheme = url.scheme;
	  var port = url.port;
	  if (scheme == 'blob') try {
	    return new URL(scheme.path[0]).origin;
	  } catch (error) {
	    return 'null';
	  }
	  if (scheme == 'file' || !isSpecial(url)) return 'null';
	  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
	};

	var getProtocol = function () {
	  return getInternalURLState(this).scheme + ':';
	};

	var getUsername = function () {
	  return getInternalURLState(this).username;
	};

	var getPassword = function () {
	  return getInternalURLState(this).password;
	};

	var getHost = function () {
	  var url = getInternalURLState(this);
	  var host = url.host;
	  var port = url.port;
	  return host === null ? ''
	    : port === null ? serializeHost(host)
	    : serializeHost(host) + ':' + port;
	};

	var getHostname = function () {
	  var host = getInternalURLState(this).host;
	  return host === null ? '' : serializeHost(host);
	};

	var getPort = function () {
	  var port = getInternalURLState(this).port;
	  return port === null ? '' : String(port);
	};

	var getPathname = function () {
	  var url = getInternalURLState(this);
	  var path = url.path;
	  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
	};

	var getSearch = function () {
	  var query = getInternalURLState(this).query;
	  return query ? '?' + query : '';
	};

	var getSearchParams = function () {
	  return getInternalURLState(this).searchParams;
	};

	var getHash = function () {
	  var fragment = getInternalURLState(this).fragment;
	  return fragment ? '#' + fragment : '';
	};

	var accessorDescriptor = function (getter, setter) {
	  return { get: getter, set: setter, configurable: true, enumerable: true };
	};

	if (descriptors$1) {
	  objectDefineProperties$1(URLPrototype, {
	    // `URL.prototype.href` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-href
	    href: accessorDescriptor(serializeURL, function (href) {
	      var url = getInternalURLState(this);
	      var urlString = String(href);
	      var failure = parseURL(url, urlString);
	      if (failure) throw TypeError(failure);
	      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
	    }),
	    // `URL.prototype.origin` getter
	    // https://url.spec.whatwg.org/#dom-url-origin
	    origin: accessorDescriptor(getOrigin),
	    // `URL.prototype.protocol` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-protocol
	    protocol: accessorDescriptor(getProtocol, function (protocol) {
	      var url = getInternalURLState(this);
	      parseURL(url, String(protocol) + ':', SCHEME_START);
	    }),
	    // `URL.prototype.username` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-username
	    username: accessorDescriptor(getUsername, function (username) {
	      var url = getInternalURLState(this);
	      var codePoints = arrayFrom(String(username));
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      url.username = '';
	      for (var i = 0; i < codePoints.length; i++) {
	        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	      }
	    }),
	    // `URL.prototype.password` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-password
	    password: accessorDescriptor(getPassword, function (password) {
	      var url = getInternalURLState(this);
	      var codePoints = arrayFrom(String(password));
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      url.password = '';
	      for (var i = 0; i < codePoints.length; i++) {
	        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	      }
	    }),
	    // `URL.prototype.host` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-host
	    host: accessorDescriptor(getHost, function (host) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      parseURL(url, String(host), HOST);
	    }),
	    // `URL.prototype.hostname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hostname
	    hostname: accessorDescriptor(getHostname, function (hostname) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      parseURL(url, String(hostname), HOSTNAME);
	    }),
	    // `URL.prototype.port` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-port
	    port: accessorDescriptor(getPort, function (port) {
	      var url = getInternalURLState(this);
	      if (cannotHaveUsernamePasswordPort(url)) return;
	      port = String(port);
	      if (port == '') url.port = null;
	      else parseURL(url, port, PORT);
	    }),
	    // `URL.prototype.pathname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-pathname
	    pathname: accessorDescriptor(getPathname, function (pathname) {
	      var url = getInternalURLState(this);
	      if (url.cannotBeABaseURL) return;
	      url.path = [];
	      parseURL(url, pathname + '', PATH_START);
	    }),
	    // `URL.prototype.search` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-search
	    search: accessorDescriptor(getSearch, function (search) {
	      var url = getInternalURLState(this);
	      search = String(search);
	      if (search == '') {
	        url.query = null;
	      } else {
	        if ('?' == search.charAt(0)) search = search.slice(1);
	        url.query = '';
	        parseURL(url, search, QUERY);
	      }
	      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
	    }),
	    // `URL.prototype.searchParams` getter
	    // https://url.spec.whatwg.org/#dom-url-searchparams
	    searchParams: accessorDescriptor(getSearchParams),
	    // `URL.prototype.hash` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hash
	    hash: accessorDescriptor(getHash, function (hash) {
	      var url = getInternalURLState(this);
	      hash = String(hash);
	      if (hash == '') {
	        url.fragment = null;
	        return;
	      }
	      if ('#' == hash.charAt(0)) hash = hash.slice(1);
	      url.fragment = '';
	      parseURL(url, hash, FRAGMENT);
	    })
	  });
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	redefine$1(URLPrototype, 'toJSON', function toJSON() {
	  return serializeURL.call(this);
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	redefine$1(URLPrototype, 'toString', function toString() {
	  return serializeURL.call(this);
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  if (nativeCreateObjectURL) redefine$1(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
	    return nativeCreateObjectURL.apply(NativeURL, arguments);
	  });
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  if (nativeRevokeObjectURL) redefine$1(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
	    return nativeRevokeObjectURL.apply(NativeURL, arguments);
	  });
	}

	setToStringTag$1(URLConstructor, 'URL');

	_export$1({ global: true, forced: !nativeUrl, sham: !descriptors$1 }, {
	  URL: URLConstructor
	});

	var web_url = {

	};

	// empty

	var web_url_toJson$1 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var web_url_toJson = /*@__PURE__*/getAugmentedNamespace(web_url_toJson$1);

	var url$2 = path$1.URL;

	var url$1 = url$2;

	var url = url$1;

	var urlSearchParams$2 = path$1.URLSearchParams;

	var urlSearchParams$1 = urlSearchParams$2;

	var urlSearchParams = urlSearchParams$1;

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

	'use strict';

	var $indexOf = arrayIncludes$1.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$4 = arrayMethodIsStrict$1('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	_export$1({ target: 'Array', proto: true, forced: NEGATIVE_ZERO$1 || !STRICT_METHOD$4 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO$1
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_array_indexOf = {

	};

	var indexOf$2 = entryVirtual('Array').indexOf;

	var ArrayPrototype$9 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$9 || (it instanceof Array && own === ArrayPrototype$9.indexOf) ? indexOf$2 : own;
	};

	var indexOf$1 = indexOf_1;

	var indexOf = indexOf$1;

	'use strict';





	var min$3 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD$3 = arrayMethodIsStrict$1('lastIndexOf');
	var FORCED$6 = NEGATIVE_ZERO || !STRICT_METHOD$3;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED$6 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject$1(this);
	  var length = toLength$1(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$3(index, toInteger$1(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : nativeLastIndexOf;

	// `Array.prototype.lastIndexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	_export$1({ target: 'Array', proto: true, forced: arrayLastIndexOf !== [].lastIndexOf }, {
	  lastIndexOf: arrayLastIndexOf
	});

	var es_array_lastIndexOf = {

	};

	var lastIndexOf$2 = entryVirtual('Array').lastIndexOf;

	var ArrayPrototype$8 = Array.prototype;

	var lastIndexOf_1 = function (it) {
	  var own = it.lastIndexOf;
	  return it === ArrayPrototype$8 || (it instanceof Array && own === ArrayPrototype$8.lastIndexOf) ? lastIndexOf$2 : own;
	};

	var lastIndexOf$1 = lastIndexOf_1;

	var lastIndexOf = lastIndexOf$1;

	// a string of all valid unicode whitespaces
	var whitespaces$1 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace$1 = '[' + whitespaces$1 + ']';
	var ltrim$1 = RegExp('^' + whitespace$1 + whitespace$1 + '*');
	var rtrim$1 = RegExp(whitespace$1 + whitespace$1 + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$4 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible$1($this));
	    if (TYPE & 1) string = string.replace(ltrim$1, '');
	    if (TYPE & 2) string = string.replace(rtrim$1, '');
	    return string;
	  };
	};

	var stringTrim$1 = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$4(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$4(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$4(3)
	};

	var trim$4 = stringTrim$1.trim;


	var $parseInt = global$2.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$5 = $parseInt(whitespaces$1 + '08') !== 8 || $parseInt(whitespaces$1 + '0x16') !== 22;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$5 ? function parseInt(string, radix) {
	  var S = trim$4(String(string));
	  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	_export$1({ global: true, forced: parseInt != numberParseInt }, {
	  parseInt: numberParseInt
	});

	var es_parseInt = {

	};

	var _parseInt$2 = path$1.parseInt;

	var _parseInt$1 = _parseInt$2;

	var _parseInt = _parseInt$1;

	'use strict';









	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('splice');

	var max$2 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
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
	      actualDeleteCount = min$2(max$2(toInteger$1(deleteCount), 0), len - actualStart);
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

	var es_array_splice = {

	};

	var splice$2 = entryVirtual('Array').splice;

	var ArrayPrototype$7 = Array.prototype;

	var splice_1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.splice) ? splice$2 : own;
	};

	var splice$1 = splice_1;

	var splice = splice$1;

	var slice$5 = [].slice;
	var MSIE = /MSIE .\./.test(engineUserAgent$1); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout /* , ...arguments */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice$5.call(arguments, 2) : undefined;
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

	var web_timers = {

	};

	var setTimeout$2 = path$1.setTimeout;

	var setTimeout$1 = setTimeout$2;

	var Result$1 = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate$1 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext$1(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose$1(iterator);
	    return new Result$1(true, condition);
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
	    iterFn = getIteratorMethod$2(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod$1(iterFn)) {
	      for (index = 0, length = toLength$1(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result$1) return result;
	      } return new Result$1(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose$1(iterator);
	      throw error;
	    }
	    if (typeof result == 'object' && result && result instanceof Result$1) return result;
	  } return new Result$1(false);
	};

	'use strict';








	var $AggregateError = function AggregateError(errors, message) {
	  var that = this;
	  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
	  if (objectSetPrototypeOf$1) {
	    // eslint-disable-next-line unicorn/error-message -- expected
	    that = objectSetPrototypeOf$1(new Error(undefined), objectGetPrototypeOf$1(that));
	  }
	  if (message !== undefined) createNonEnumerableProperty$1(that, 'message', String(message));
	  var errorsArray = [];
	  iterate$1(errors, errorsArray.push, { that: errorsArray });
	  createNonEnumerableProperty$1(that, 'errors', errorsArray);
	  return that;
	};

	$AggregateError.prototype = objectCreate$1(Error.prototype, {
	  constructor: createPropertyDescriptor$1(5, $AggregateError),
	  message: createPropertyDescriptor$1(5, ''),
	  name: createPropertyDescriptor$1(5, 'AggregateError')
	});

	// `AggregateError` constructor
	// https://tc39.es/ecma262/#sec-aggregate-error-constructor
	_export$1({ global: true }, {
	  AggregateError: $AggregateError
	});

	var es_aggregateError = {

	};

	var nativePromiseConstructor$1 = global$2.Promise;

	'use strict';





	var SPECIES$6 = wellKnownSymbol$1('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty$1.f;

	  if (descriptors$1 && Constructor && !Constructor[SPECIES$6]) {
	    defineProperty(Constructor, SPECIES$6, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var ITERATOR$4 = wellKnownSymbol$1('iterator');
	var SAFE_CLOSING$1 = false;

	try {
	  var called$1 = 0;
	  var iteratorWithReturn$1 = {
	    next: function () {
	      return { done: !!called$1++ };
	    },
	    'return': function () {
	      SAFE_CLOSING$1 = true;
	    }
	  };
	  iteratorWithReturn$1[ITERATOR$4] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn$1, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING$1) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$4] = function () {
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

	var SPECIES$5 = wellKnownSymbol$1('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$1(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$1(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$3(S);
	};

	var engineIsIos$1 = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent$1);

	var location$1 = global$2.location;
	var set$2 = global$2.setImmediate;
	var clear$1 = global$2.clearImmediate;
	var process$6 = global$2.process;
	var MessageChannel$1 = global$2.MessageChannel;
	var Dispatch$1 = global$2.Dispatch;
	var counter$1 = 0;
	var queue$1 = {};
	var ONREADYSTATECHANGE$1 = 'onreadystatechange';
	var defer$1, channel$1, port$1;

	var run$1 = function (id) {
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  if (queue$1.hasOwnProperty(id)) {
	    var fn = queue$1[id];
	    delete queue$1[id];
	    fn();
	  }
	};

	var runner$1 = function (id) {
	  return function () {
	    run$1(id);
	  };
	};

	var listener$1 = function (event) {
	  run$1(event.data);
	};

	var post$1 = function (id) {
	  // old engines have not location.origin
	  global$2.postMessage(id + '', location$1.protocol + '//' + location$1.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$2 || !clear$1) {
	  set$2 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue$1[++counter$1] = function () {
	      // eslint-disable-next-line no-new-func -- spec requirement
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer$1(counter$1);
	    return counter$1;
	  };
	  clear$1 = function clearImmediate(id) {
	    delete queue$1[id];
	  };
	  // Node.js 0.8-
	  if (engineIsNode$1) {
	    defer$1 = function (id) {
	      process$6.nextTick(runner$1(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch$1 && Dispatch$1.now) {
	    defer$1 = function (id) {
	      Dispatch$1.now(runner$1(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel$1 && !engineIsIos$1) {
	    channel$1 = new MessageChannel$1();
	    port$1 = channel$1.port2;
	    channel$1.port1.onmessage = listener$1;
	    defer$1 = functionBindContext$1(port$1.postMessage, port$1, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$2.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global$2.importScripts &&
	    location$1 && location$1.protocol !== 'file:' &&
	    !fails$1(post$1)
	  ) {
	    defer$1 = post$1;
	    global$2.addEventListener('message', listener$1, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE$1 in documentCreateElement$1('script')) {
	    defer$1 = function (id) {
	      html$1.appendChild(documentCreateElement$1('script'))[ONREADYSTATECHANGE$1] = function () {
	        html$1.removeChild(this);
	        run$1(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer$1 = function (id) {
	      setTimeout(runner$1(id), 0);
	    };
	  }
	}

	var task$3 = {
	  set: set$2,
	  clear: clear$1
	};

	var engineIsWebosWebkit$1 = /web0s(?!.*chrome)/i.test(engineUserAgent$1);

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor$1.f;
	var macrotask$1 = task$3.set;




	var MutationObserver$1 = global$2.MutationObserver || global$2.WebKitMutationObserver;
	var document$4 = global$2.document;
	var process$5 = global$2.process;
	var Promise$2 = global$2.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor$1 = getOwnPropertyDescriptor$2(global$2, 'queueMicrotask');
	var queueMicrotask$1 = queueMicrotaskDescriptor$1 && queueMicrotaskDescriptor$1.value;

	var flush$1, head$1, last$1, notify$3, toggle$1, node$1, promise$6, then$1;

	// modern engines have queueMicrotask method
	if (!queueMicrotask$1) {
	  flush$1 = function () {
	    var parent, fn;
	    if (engineIsNode$1 && (parent = process$5.domain)) parent.exit();
	    while (head$1) {
	      fn = head$1.fn;
	      head$1 = head$1.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head$1) notify$3();
	        else last$1 = undefined;
	        throw error;
	      }
	    } last$1 = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!engineIsIos$1 && !engineIsNode$1 && !engineIsWebosWebkit$1 && MutationObserver$1 && document$4) {
	    toggle$1 = true;
	    node$1 = document$4.createTextNode('');
	    new MutationObserver$1(flush$1).observe(node$1, { characterData: true });
	    notify$3 = function () {
	      node$1.data = toggle$1 = !toggle$1;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$2 && Promise$2.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise$6 = Promise$2.resolve(undefined);
	    then$1 = promise$6.then;
	    notify$3 = function () {
	      then$1.call(promise$6, flush$1);
	    };
	  // Node.js without promises
	  } else if (engineIsNode$1) {
	    notify$3 = function () {
	      process$5.nextTick(flush$1);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify$3 = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask$1.call(global$2, flush$1);
	    };
	  }
	}

	var microtask$1 = queueMicrotask$1 || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last$1) last$1.next = task;
	  if (!head$1) {
	    head$1 = task;
	    notify$3();
	  } last$1 = task;
	};

	'use strict';


	var PromiseCapability$1 = function (C) {
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
	var f$1 = function (C) {
	  return new PromiseCapability$1(C);
	};

	var newPromiseCapability$3 = {
		f: f$1
	};

	var promiseResolve$1 = function (C, x) {
	  anObject$1(C);
	  if (isObject$1(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$3.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors$1 = function (a, b) {
	  var console = global$2.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform$1 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	'use strict';
















	var task$2 = task$3.set;











	var SPECIES$4 = wellKnownSymbol$1('species');
	var PROMISE$1 = 'Promise';
	var getInternalState$2 = internalState$1.get;
	var setInternalState$3 = internalState$1.set;
	var getInternalPromiseState$1 = internalState$1.getterFor(PROMISE$1);
	var PromiseConstructor$1 = nativePromiseConstructor$1;
	var TypeError$2 = global$2.TypeError;
	var document$3 = global$2.document;
	var process$4 = global$2.process;
	var $fetch$1 = getBuiltIn$1('fetch');
	var newPromiseCapability$2 = newPromiseCapability$3.f;
	var newGenericPromiseCapability$1 = newPromiseCapability$2;
	var DISPATCH_EVENT$1 = !!(document$3 && document$3.createEvent && global$2.dispatchEvent);
	var NATIVE_REJECTION_EVENT$1 = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION$1 = 'unhandledrejection';
	var REJECTION_HANDLED$1 = 'rejectionhandled';
	var PENDING$1 = 0;
	var FULFILLED$1 = 1;
	var REJECTED$1 = 2;
	var HANDLED$1 = 1;
	var UNHANDLED$1 = 2;
	var Internal$1, OwnPromiseCapability$1, PromiseWrapper$1, nativeThen$1;

	var FORCED$4 = isForced_1$1(PROMISE$1, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource$1(PromiseConstructor$1) !== String(PromiseConstructor$1);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version$1 === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!engineIsNode$1 && !NATIVE_REJECTION_EVENT$1) return true;
	  }
	  // We need Promise#finally in the pure version for preventing prototype pollution
	  if (isPure$1 && !PromiseConstructor$1.prototype['finally']) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version$1 >= 51 && /native code/.test(PromiseConstructor$1)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor$1.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$4] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION$2 = FORCED$4 || !checkCorrectnessOfIteration$1(function (iterable) {
	  PromiseConstructor$1.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable$1 = function (it) {
	  var then;
	  return isObject$1(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$2 = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask$1(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED$1;
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
	            if (state.rejection === UNHANDLED$1) onHandleUnhandled$1(state);
	            state.rejection = HANDLED$1;
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
	            reject(TypeError$2('Promise-chain cycle'));
	          } else if (then = isThenable$1(result)) {
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
	    if (isReject && !state.rejection) onUnhandled$1(state);
	  });
	};

	var dispatchEvent$1 = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT$1) {
	    event = document$3.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$2.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT$1 && (handler = global$2['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION$1) hostReportErrors$1('Unhandled promise rejection', reason);
	};

	var onUnhandled$1 = function (state) {
	  task$2.call(global$2, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled$1(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform$1(function () {
	        if (engineIsNode$1) {
	          process$4.emit('unhandledRejection', value, promise);
	        } else dispatchEvent$1(UNHANDLED_REJECTION$1, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = engineIsNode$1 || isUnhandled$1(state) ? UNHANDLED$1 : HANDLED$1;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled$1 = function (state) {
	  return state.rejection !== HANDLED$1 && !state.parent;
	};

	var onHandleUnhandled$1 = function (state) {
	  task$2.call(global$2, function () {
	    var promise = state.facade;
	    if (engineIsNode$1) {
	      process$4.emit('rejectionHandled', promise);
	    } else dispatchEvent$1(REJECTION_HANDLED$1, promise, state.value);
	  });
	};

	var bind$1 = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject$1 = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED$1;
	  notify$2(state, true);
	};

	var internalResolve$1 = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$2("Promise can't be resolved itself");
	    var then = isThenable$1(value);
	    if (then) {
	      microtask$1(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind$1(internalResolve$1, wrapper, state),
	            bind$1(internalReject$1, wrapper, state)
	          );
	        } catch (error) {
	          internalReject$1(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED$1;
	      notify$2(state, false);
	    }
	  } catch (error) {
	    internalReject$1({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$4) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor$1 = function Promise(executor) {
	    anInstance$1(this, PromiseConstructor$1, PROMISE$1);
	    aFunction$3(executor);
	    Internal$1.call(this);
	    var state = getInternalState$2(this);
	    try {
	      executor(bind$1(internalResolve$1, state), bind$1(internalReject$1, state));
	    } catch (error) {
	      internalReject$1(state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal$1 = function Promise(executor) {
	    setInternalState$3(this, {
	      type: PROMISE$1,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING$1,
	      value: undefined
	    });
	  };
	  Internal$1.prototype = redefineAll$1(PromiseConstructor$1.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState$1(this);
	      var reaction = newPromiseCapability$2(speciesConstructor$1(this, PromiseConstructor$1));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = engineIsNode$1 ? process$4.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING$1) notify$2(state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability$1 = function () {
	    var promise = new Internal$1();
	    var state = getInternalState$2(promise);
	    this.promise = promise;
	    this.resolve = bind$1(internalResolve$1, state);
	    this.reject = bind$1(internalReject$1, state);
	  };
	  newPromiseCapability$3.f = newPromiseCapability$2 = function (C) {
	    return C === PromiseConstructor$1 || C === PromiseWrapper$1
	      ? new OwnPromiseCapability$1(C)
	      : newGenericPromiseCapability$1(C);
	  };

	  if (!isPure$1 && typeof nativePromiseConstructor$1 == 'function') {
	    nativeThen$1 = nativePromiseConstructor$1.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine$1(nativePromiseConstructor$1.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor$1(function (resolve, reject) {
	        nativeThen$1.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch$1 == 'function') _export$1({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars -- required for `.length`
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve$1(PromiseConstructor$1, $fetch$1.apply(global$2, arguments));
	      }
	    });
	  }
	}

	_export$1({ global: true, wrap: true, forced: FORCED$4 }, {
	  Promise: PromiseConstructor$1
	});

	setToStringTag$1(PromiseConstructor$1, PROMISE$1, false, true);
	setSpecies$1(PROMISE$1);

	PromiseWrapper$1 = getBuiltIn$1(PROMISE$1);

	// statics
	_export$1({ target: PROMISE$1, stat: true, forced: FORCED$4 }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$2(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export$1({ target: PROMISE$1, stat: true, forced: isPure$1 || FORCED$4 }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve$1(isPure$1 && this === PromiseWrapper$1 ? PromiseConstructor$1 : this, x);
	  }
	});

	_export$1({ target: PROMISE$1, stat: true, forced: INCORRECT_ITERATION$2 }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$2(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var $promiseResolve = aFunction$3(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$1(iterable, function (promise) {
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
	    var capability = newPromiseCapability$2(C);
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var $promiseResolve = aFunction$3(C.resolve);
	      iterate$1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var es_promise$1 = {

	};

	'use strict';






	// `Promise.allSettled` method
	// https://tc39.es/ecma262/#sec-promise.allsettled
	_export$1({ target: 'Promise', stat: true }, {
	  allSettled: function allSettled(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$3.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var promiseResolve = aFunction$3(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$1(iterable, function (promise) {
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

	var es_promise_allSettled = {

	};

	'use strict';







	var PROMISE_ANY_ERROR = 'No one promise resolved';

	// `Promise.any` method
	// https://tc39.es/ecma262/#sec-promise.any
	_export$1({ target: 'Promise', stat: true }, {
	  any: function any(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$3.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var promiseResolve = aFunction$3(C.resolve);
	      var errors = [];
	      var counter = 0;
	      var remaining = 1;
	      var alreadyResolved = false;
	      iterate$1(iterable, function (promise) {
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

	var es_promise_any = {

	};

	'use strict';









	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!nativePromiseConstructor$1 && fails$1(function () {
	  nativePromiseConstructor$1.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	_export$1({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor$1(this, getBuiltIn$1('Promise'));
	    var isFunction = typeof onFinally == 'function';
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve$1(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve$1(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	// patch native Promise.prototype for native async functions
	if (!isPure$1 && typeof nativePromiseConstructor$1 == 'function' && !nativePromiseConstructor$1.prototype['finally']) {
	  redefine$1(nativePromiseConstructor$1.prototype, 'finally', getBuiltIn$1('Promise').prototype['finally']);
	}

	var es_promise_finally = {

	};

	var promise$5 = path$1.Promise;

	var promise$4 = promise$5;

	var promise$3 = promise$4;

	var defineProperty$2 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$2(FunctionPrototype, NAME, {
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

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$3 = function (CONVERT_TO_STRING) {
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
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	'use strict';
	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
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









	var max$1 = Math.max;
	var min$1 = Math.min;

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
	        var position = max$1(min$1(toInteger(result.index), S.length), 0);
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

	var MATCH$1 = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	'use strict';





	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty$1 = objectDefineProperty.f;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;





	var setInternalState$2 = internalState.set;



	var MATCH = wellKnownSymbol('match');
	var NativeRegExp = global$1.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var UNSUPPORTED_Y = regexpStickyHelpers.UNSUPPORTED_Y;

	var FORCED$3 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
	  re2[MATCH] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})));

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (FORCED$3) {
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

	    if (UNSUPPORTED_Y && sticky) setInternalState$2(result, { sticky: sticky });

	    return result;
	  };
	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
	      configurable: true,
	      get: function () { return NativeRegExp[key]; },
	      set: function (it) { NativeRegExp[key] = it; }
	    });
	  };
	  var keys$1 = getOwnPropertyNames$1(NativeRegExp);
	  var index = 0;
	  while (keys$1.length > index) proxy(keys$1[index++]);
	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  redefine(global$1, 'RegExp', RegExpWrapper);
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	var es_regexp_constructor = {

	};

	function isBrowser() {
	  return typeof window === 'object' && typeof document === 'object';
	}
	function isNode() {
	  return typeof process === 'object';
	}
	function error(err, options) {
	  err.message = err.message || null;

	  if (typeof options === 'string') {
	    err.message = options;
	  } else if (typeof options === 'object' && options != null) {
	    for (var key in options) {
	      var value = options[key];
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

	  err.name = (options === null || options === void 0 ? void 0 : options.name) || err.name || err.code || 'Error';
	  err.time = new Date();
	  return err;
	}
	function uuid() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0;
	    var v = c === 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	}
	function getQueryParam(field, url) {
	  var href = url || window.location.href;
	  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
	  var string = reg.exec(href);

	  if (string) {
	    return string[1];
	  }

	  return undefined;
	}
	function getRandomNumberBetween(from, to) {
	  return Math.floor(Math.random() * to) + from;
	}
	function getOS() {
	  var name = null;
	  var ua = window.navigator.userAgent;

	  if (indexOf(ua).call(ua, 'Windows') > -1) {
	    name = 'Windows';
	  } else if (indexOf(ua).call(ua, 'Mac') > -1) {
	    name = 'macOS';
	  } else if (indexOf(ua).call(ua, 'X11') > -1) {
	    name = 'unix';
	  } else if (indexOf(ua).call(ua, 'Linux') > -1) {
	    name = 'Linux';
	  } else if (indexOf(ua).call(ua, 'iOS') > -1) {
	    name = 'iOS';
	  } else if (indexOf(ua).call(ua, 'Android') > -1) {
	    name = 'Android';
	  }

	  return name;
	}
	function getDeviceCategory() {
	  var deviceCategory = 'desktop';

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
	}
	function getPointer() {
	  var pointer = 'fine';

	  if (matchMedia('(pointer:coarse)').matches) {
	    pointer = 'coarse';
	  }

	  return pointer;
	}
	function getOrientation(width, height) {
	  if (width === height) {
	    return 'quadratic';
	  } else if (width > height) {
	    return 'horizontal';
	  } else {
	    return 'vertical';
	  }
	}
	function getScreenDimensions() {
	  var _window$devicePixelRa;

	  var density = (_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1;
	  var logical = {
	    width: window.screen.width,
	    height: window.screen.height
	  };
	  var physical = {
	    width: Math.round(logical.width * density),
	    height: Math.round(logical.height * density)
	  };
	  return {
	    density: density,
	    logical: logical,
	    physical: physical
	  };
	}
	function getUtcOffsetSeconds() {
	  var now = new Date();
	  var jan1 = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
	  var tmp = jan1.toGMTString();
	  var jan2 = new Date(tmp.substring(0, lastIndexOf(tmp).call(tmp, ' ') - 1));
	  var stdTimeOffset = (jan1 - jan2) / 1000;
	  return stdTimeOffset;
	}
	function getUtcDstOffsetSeconds() {
	  return new Date().getTimezoneOffset() * 60 * -1;
	}
	function getColorBrightness(color) {
	  color = color.replace('#', '');

	  var hex = _parseInt((hex + '').replace(/[^a-f0-9]/gi, ''), 16);

	  var rgb = [];
	  var sum = 0;
	  var x = 0;

	  while (x < 3) {
	    var s = _parseInt(color.substring(2 * x, 2), 16);

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
	}
	function btoa(str) {
	  if (isBrowser()) {
	    return window.btoa(str);
	  } else {
	    var buffer = null;

	    if (str instanceof Buffer) {
	      buffer = str;
	    } else {
	      buffer = Buffer.from(str.toString(), 'binary');
	    }

	    return buffer.toString('base64');
	  }
	}
	function chunk(arr, size) {
	  var results = [];

	  while (arr.length) {
	    results.push(splice(arr).call(arr, 0, size));
	  }

	  return results;
	}
	function throttle(fn) {
	  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
	  var scope = arguments.length > 2 ? arguments[2] : undefined;
	  var last = undefined;
	  var deferTimer = undefined;
	  return function () {
	    var context = scope || this;
	    var now = new Date().getTime();
	    var args = arguments;

	    if (last && now < last + threshold) {
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout$1(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}
	function loadImage(src, callback) {
	  var img = new Image();

	  img.onload = function () {
	    return callback(null, img.width, img.height);
	  };

	  img.onerror = function () {
	    return callback(new Error());
	  };

	  img.src = src;
	  return img;
	}
	function distance(lat1, lng1, lat2, lng2) {
	  var radlat1 = Math.PI * lat1 / 180;
	  var radlat2 = Math.PI * lat2 / 180;
	  var theta = lng1 - lng2;
	  var radtheta = Math.PI * theta / 180;
	  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	  dist = Math.acos(dist);
	  dist = dist * 180 / Math.PI;
	  dist = dist * 60 * 1.1515;
	  dist = dist * 1.609344 * 1000;
	  return dist;
	} // Method for wrapping a function that takes a callback in any position
	// to return promises if no callback is given in a call.
	// The second argument, cbParameterIndex, is the position of the callback in the original functions parameter list.
	// CoffeeScript optional parameters messes with this function arity detection,
	// not sure what to do about that, other than always setting cbParameterIndex at callsites.

	function promiseCallbackInterop(fun) {
	  var _this = this;

	  var cbParameterIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fun.length - 1;

	  // This is the function that actually wraps and calls a method to return a promise.
	  var makePromise = function makePromise(fun, cbParameterIndex, parameters) {
	    return new promise$3(function (resolve, reject) {
	      var neoCallback = function neoCallback(error, result) {
	        if (error) {
	          return reject(error);
	        }

	        return resolve(result);
	      };

	      var callParameters = [];

	      for (var i = 0, end = Math.max(parameters.length, cbParameterIndex) + 1, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
	        callParameters.push(i === cbParameterIndex ? neoCallback : parameters[i]);
	      }

	      return fun.apply(_this, callParameters);
	    });
	  }; // Wrapper function that decides what to do per-call.


	  return function () {
	    for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
	      parameters[_key] = arguments[_key];
	    }

	    if (typeof parameters[cbParameterIndex] === 'function') {
	      // Callback given, do a regular old call.
	      return fun.apply(null, parameters);
	    } else if (typeof promise$3 === 'function') {
	      // No callback given, and we have promise support, use makePromise to wrap the call.
	      return makePromise(fun, cbParameterIndex, parameters);
	    } else {
	      // Ain't got callback, ain't got promise support; we gotta tell the developer.
	      throw new Error("To be able to use this asynchronous method you should:\nSupply a callback function as argument #".concat(1 + cbParameterIndex, ".\nThis callback function will be called with the method call response.\nAlternatively, when supported, it can return a Promise if no callback function is given."));
	    }
	  };
	}

	var util = /*#__PURE__*/Object.freeze({
		__proto__: null,
		isBrowser: isBrowser,
		isNode: isNode,
		error: error,
		uuid: uuid,
		getQueryParam: getQueryParam,
		getRandomNumberBetween: getRandomNumberBetween,
		getOS: getOS,
		getDeviceCategory: getDeviceCategory,
		getPointer: getPointer,
		getOrientation: getOrientation,
		getScreenDimensions: getScreenDimensions,
		getUtcOffsetSeconds: getUtcOffsetSeconds,
		getUtcDstOffsetSeconds: getUtcDstOffsetSeconds,
		getColorBrightness: getColorBrightness,
		btoa: btoa,
		chunk: chunk,
		throttle: throttle,
		loadImage: loadImage,
		distance: distance,
		promiseCallbackInterop: promiseCallbackInterop
	});

	function request() {
	  var _options$url, _options$headers;

	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var callback = arguments.length > 1 ? arguments[1] : undefined;
	  var url$1 = SGN.config.get('coreUrl') + ((_options$url = options.url) !== null && _options$url !== void 0 ? _options$url : '');
	  var method = options.method || 'get';
	  var headers = (_options$headers = options.headers) !== null && _options$headers !== void 0 ? _options$headers : {};
	  var appKey = SGN.config.get('appKey');
	  var clientVersion = SGN.config.get('clientVersion');
	  var body = options.body;
	  headers['X-Api-Key'] = appKey;

	  if (!headers['Accept']) {
	    headers['Accept'] = 'application/json';
	  }

	  if (clientVersion != null) {
	    headers['X-Client-Version'] = clientVersion;
	  }

	  if (options.qs) {
	    var url2 = new url(url$1);
	    var searchParams = new urlSearchParams(url2.search);

	    for (var key in options.qs) {
	      searchParams.append(key, options.qs[key]);
	    }

	    url$1 = url2.origin + url2.pathname + '?' + searchParams.toString();
	  }

	  browserPonyfill(url$1, {
	    method: method,
	    body: body,
	    headers: headers,
	    credentials: 'same-origin'
	  }).then(function (response) {
	    if (response.status >= 200 && response.status < 300 || response.status === 304) {
	      response.json().then(function (json) {
	        callback(null, json);
	      }).catch(callback);
	    } else {
	      callback(error(new Error('Core API error'), {
	        code: 'CoreAPIError',
	        statusCode: response.status
	      }), response.text());
	    }
	  }).catch(callback);
	}

	var request$1 = promiseCallbackInterop(request, 1);

	var CoreKit = /*#__PURE__*/Object.freeze({
		__proto__: null,
		request: request$1
	});

	'use strict';







	// @@match logic
	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : regexp[MATCH];
	      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative(nativeMatch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      if (!rx.global) return regexpExecAbstract(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var es_string_match = {

	};

	var gator = createCommonjsModule(function (module) {
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
	        var _context;

	        splice(_context = _handlers[gator.id][event][selector]).call(_context, i, 1);

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

	var OfferDetails = /*#__PURE__*/function () {
	  function OfferDetails(_ref) {
	    var _context;

	    var _ref$minWidth = _ref.minWidth,
	        minWidth = _ref$minWidth === void 0 ? 300 : _ref$minWidth,
	        _ref$maxWidth = _ref.maxWidth,
	        maxWidth = _ref$maxWidth === void 0 ? '100vw' : _ref$maxWidth,
	        anchorEl = _ref.anchorEl,
	        contentEl = _ref.contentEl;

	    _classCallCheck(this, OfferDetails);

	    this.resize = bind$2(_context = this.resize).call(_context, this);
	    this.minWidth = minWidth;
	    this.maxWidth = maxWidth;
	    this.anchorEl = anchorEl;
	    this.contentEl = contentEl;
	    this.elInner = document.createElement('div');
	    this.elInner.className = 'sgn-offer-details-inner';
	    this.el = document.createElement('div');
	    this.el.className = 'sgn-offer-details';
	    this.el.setAttribute('tabindex', -1);
	    this.el.appendChild(this.elInner);
	    this.el.appendChild(this.contentEl);
	    this.position();
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
	      window.addEventListener('resize', this.resize, false);
	      return this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      window.removeEventListener('resize', this.resize, false);
	      this.el.parentNode.removeChild(this.el);
	    }
	  }, {
	    key: "position",
	    value: function position() {
	      var rect = this.anchorEl.getBoundingClientRect();
	      var top = window.pageYOffset + rect.top + this.anchorEl.offsetHeight;
	      var left = window.pageXOffset + rect.left;
	      var width = this.anchorEl.offsetWidth;
	      this.el.style.top = top + 'px';
	      var rightAligned = rect.left >= window.outerWidth / 2;
	      left = window.pageXOffset + rect.left;
	      var right = window.pageXOffset + (window.outerWidth - rect.right);

	      if (rightAligned) {
	        this.el.style.left = 'auto';
	        this.el.style.right = right + 'px';
	        this.elInner.style.left = 'auto';
	        this.elInner.style.right = 0;
	      } else {
	        this.el.style.left = left + 'px';
	        this.el.style.right = 'auto';
	        this.elInner.style.left = 0;
	        this.elInner.style.right = 'auto';
	      }

	      this.el.style.minWidth = typeof this.minWidth === 'number' ? Math.max(width, this.minWidth) + 'px' : this.minWidth;
	      this.el.style.maxWidth = this.maxWidth;
	      this.elInner.style.width = width - 8 + 'px';
	    }
	  }, {
	    key: "resize",
	    value: function resize() {
	      this.position();
	    }
	  }]);

	  return OfferDetails;
	}();

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

	var ArrayPrototype$6 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.map) ? map$2 : own;
	};

	var map$1 = map_1;

	var map = map$1;

	var mustache = createCommonjsModule(function (module, exports) {
	// This file has been generated from mustache.mjs
	(function (global, factory) {
	  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
	  typeof undefined === 'function' && undefined.amd ? undefined(factory) :
	  (global = global || self, global.Mustache = factory());
	}(commonjsGlobal, (function () { 'use strict';

	  /*!
	   * mustache.js - Logic-less {{mustache}} templates with JavaScript
	   * http://github.com/janl/mustache.js
	   */

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
	   *
	   * Tokens for partials also contain two more elements: 1) a string value of
	   * indendation prior to that tag and 2) the index of that tag on that line -
	   * eg a value of 2 indicates the partial is the third tag on this line.
	   */
	  function parseTemplate (template, tags) {
	    if (!template)
	      return [];
	    var lineHasNonSpace = false;
	    var sections = [];     // Stack to hold section tokens
	    var tokens = [];       // Buffer to hold the tokens
	    var spaces = [];       // Indices of whitespace tokens on the current line
	    var hasTag = false;    // Is there a {{tag}} on the current line?
	    var nonSpace = false;  // Is there a non-space char on the current line?
	    var indentation = '';  // Tracks indentation for tags that use it
	    var tagIndex = 0;      // Stores a count of number of tags encountered on a line

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
	            indentation += chr;
	          } else {
	            nonSpace = true;
	            lineHasNonSpace = true;
	            indentation += ' ';
	          }

	          tokens.push([ 'text', chr, start, start + 1 ]);
	          start += 1;

	          // Check for whitespace on the current line.
	          if (chr === '\n') {
	            stripSpace();
	            indentation = '';
	            tagIndex = 0;
	            lineHasNonSpace = false;
	          }
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

	      if (type == '>') {
	        token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
	      } else {
	        token = [ type, value, start, scanner.pos ];
	      }
	      tagIndex++;
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

	    stripSpace();

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
	    this.templateCache = {
	      _cache: {},
	      set: function set (key, value) {
	        this._cache[key] = value;
	      },
	      get: function get (key) {
	        return this._cache[key];
	      },
	      clear: function clear () {
	        this._cache = {};
	      }
	    };
	  }

	  /**
	   * Clears all cached templates in this writer.
	   */
	  Writer.prototype.clearCache = function clearCache () {
	    if (typeof this.templateCache !== 'undefined') {
	      this.templateCache.clear();
	    }
	  };

	  /**
	   * Parses and caches the given `template` according to the given `tags` or
	   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
	   * that is generated from the parse.
	   */
	  Writer.prototype.parse = function parse (template, tags) {
	    var cache = this.templateCache;
	    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
	    var isCacheEnabled = typeof cache !== 'undefined';
	    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

	    if (tokens == undefined) {
	      tokens = parseTemplate(template, tags);
	      isCacheEnabled && cache.set(cacheKey, tokens);
	    }
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
	   * If the optional `config` argument is given here, then it should be an
	   * object with a `tags` attribute or an `escape` attribute or both.
	   * If an array is passed, then it will be interpreted the same way as
	   * a `tags` attribute on a `config` object.
	   *
	   * The `tags` attribute of a `config` object must be an array with two
	   * string values: the opening and closing tags used in the template (e.g.
	   * [ "<%", "%>" ]). The default is to mustache.tags.
	   *
	   * The `escape` attribute of a `config` object must be a function which
	   * accepts a string as input and outputs a safely escaped string.
	   * If an `escape` function is not provided, then an HTML-safe string
	   * escaping function is used as the default.
	   */
	  Writer.prototype.render = function render (template, view, partials, config) {
	    var tags = this.getConfigTags(config);
	    var tokens = this.parse(template, tags);
	    var context = (view instanceof Context) ? view : new Context(view, undefined);
	    return this.renderTokens(tokens, context, partials, template, config);
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
	  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
	    var buffer = '';

	    var token, symbol, value;
	    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
	      value = undefined;
	      token = tokens[i];
	      symbol = token[0];

	      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
	      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
	      else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
	      else if (symbol === '&') value = this.unescapedValue(token, context);
	      else if (symbol === 'name') value = this.escapedValue(token, context, config);
	      else if (symbol === 'text') value = this.rawValue(token);

	      if (value !== undefined)
	        buffer += value;
	    }

	    return buffer;
	  };

	  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
	    var self = this;
	    var buffer = '';
	    var value = context.lookup(token[1]);

	    // This function is used to render an arbitrary template
	    // in the current context by higher-order sections.
	    function subRender (template) {
	      return self.render(template, context, partials, config);
	    }

	    if (!value) return;

	    if (isArray(value)) {
	      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
	        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
	      }
	    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
	      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
	    } else if (isFunction(value)) {
	      if (typeof originalTemplate !== 'string')
	        throw new Error('Cannot use higher-order sections without the original template');

	      // Extract the portion of the original template that the section contains.
	      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

	      if (value != null)
	        buffer += value;
	    } else {
	      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
	    }
	    return buffer;
	  };

	  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
	    var value = context.lookup(token[1]);

	    // Use JavaScript's definition of falsy. Include empty arrays.
	    // See https://github.com/janl/mustache.js/issues/186
	    if (!value || (isArray(value) && value.length === 0))
	      return this.renderTokens(token[4], context, partials, originalTemplate, config);
	  };

	  Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
	    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
	    var partialByNl = partial.split('\n');
	    for (var i = 0; i < partialByNl.length; i++) {
	      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
	        partialByNl[i] = filteredIndentation + partialByNl[i];
	      }
	    }
	    return partialByNl.join('\n');
	  };

	  Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
	    if (!partials) return;
	    var tags = this.getConfigTags(config);

	    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
	    if (value != null) {
	      var lineHasNonSpace = token[6];
	      var tagIndex = token[5];
	      var indentation = token[4];
	      var indentedValue = value;
	      if (tagIndex == 0 && indentation) {
	        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
	      }
	      var tokens = this.parse(indentedValue, tags);
	      return this.renderTokens(tokens, context, partials, indentedValue, config);
	    }
	  };

	  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return value;
	  };

	  Writer.prototype.escapedValue = function escapedValue (token, context, config) {
	    var escape = this.getConfigEscape(config) || mustache.escape;
	    var value = context.lookup(token[1]);
	    if (value != null)
	      return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
	  };

	  Writer.prototype.rawValue = function rawValue (token) {
	    return token[1];
	  };

	  Writer.prototype.getConfigTags = function getConfigTags (config) {
	    if (isArray(config)) {
	      return config;
	    }
	    else if (config && typeof config === 'object') {
	      return config.tags;
	    }
	    else {
	      return undefined;
	    }
	  };

	  Writer.prototype.getConfigEscape = function getConfigEscape (config) {
	    if (config && typeof config === 'object' && !isArray(config)) {
	      return config.escape;
	    }
	    else {
	      return undefined;
	    }
	  };

	  var mustache = {
	    name: 'mustache.js',
	    version: '4.1.0',
	    tags: [ '{{', '}}' ],
	    clearCache: undefined,
	    escape: undefined,
	    parse: undefined,
	    render: undefined,
	    Scanner: undefined,
	    Context: undefined,
	    Writer: undefined,
	    /**
	     * Allows a user to override the default caching strategy, by providing an
	     * object with set, get and clear methods. This can also be used to disable
	     * the cache by setting it to the literal `undefined`.
	     */
	    set templateCache (cache) {
	      defaultWriter.templateCache = cache;
	    },
	    /**
	     * Gets the default or overridden caching object from the default writer.
	     */
	    get templateCache () {
	      return defaultWriter.templateCache;
	    }
	  };

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
	   * Renders the `template` with the given `view`, `partials`, and `config`
	   * using the default writer.
	   */
	  mustache.render = function render (template, view, partials, config) {
	    if (typeof template !== 'string') {
	      throw new TypeError('Invalid template! Template should be a "string" ' +
	                          'but "' + typeStr(template) + '" was given as the first ' +
	                          'argument for mustache#render(template, view, partials)');
	    }

	    return defaultWriter.render(template, view, partials, config);
	  };

	  // Export the escaping function so that the user may override it.
	  // See https://github.com/janl/mustache.js/issues/244
	  mustache.escape = escapeHtml;

	  // Export these mainly for testing, but also for advanced usage.
	  mustache.Scanner = Scanner;
	  mustache.Context = Context;
	  mustache.Writer = Writer;

	  return mustache;

	})));
	});

	var ESC = 27;
	var ARROW_RIGHT = 39;
	var ARROW_LEFT = 37;
	var SPACE = 32;
	var NUMBER_ONE = 49;

	function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var defaultTemplate = "<div class=\"sgn-popover__background\" data-close></div>\n<div class=\"sgn-popover__menu\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#singleChoiceItems}}\n                <li data-index=\"{{index}}\">\n                    <p class=\"sgn-popover-item__title\">{{item.title}}</p>\n                    {{#item.subtitle}}\n                        <p class=\"sgn-popover-item__subtitle\">{{item.subtitle}}</p>\n                    {{/item.subtitle}}\n                </li>\n            {{/singleChoiceItems}}\n        </ul>\n    </div>\n</div>";

	var Popover = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Popover, _MicroEvent);

	  var _super = _createSuper$a(Popover);

	  function Popover() {
	    var _context, _context2, _context3;

	    var _this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Popover);

	    _this = _super.call(this);
	    _this.keyUp = bind$2(_context = _this.keyUp).call(_context, _assertThisInitialized(_this));
	    _this.resize = bind$2(_context2 = _this.resize).call(_context2, _assertThisInitialized(_this));
	    _this.scroll = bind$2(_context3 = _this.scroll).call(_context3, _assertThisInitialized(_this));
	    _this.options = options;
	    _this.el = document.createElement('div');
	    _this.backgroundEl = document.createElement('div');
	    return _this;
	  }

	  _createClass(Popover, [{
	    key: "render",
	    value: function render() {
	      var _this$options = this.options,
	          header = _this$options.header,
	          singleChoiceItems = _this$options.singleChoiceItems,
	          _this$options$templat = _this$options.template,
	          template = _this$options$templat === void 0 ? defaultTemplate : _this$options$templat;
	      var view = {
	        header: header,
	        singleChoiceItems: singleChoiceItems === null || singleChoiceItems === void 0 ? void 0 : map(singleChoiceItems).call(singleChoiceItems, function (item, index) {
	          return {
	            item: item,
	            index: index
	          };
	        })
	      };
	      this.el.className = 'sgn-popover';
	      this.el.setAttribute('tabindex', -1);
	      this.el.innerHTML = mustache.render(template, view);
	      this.position();
	      this.addEventListeners();
	      return this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      gator(this.el).off();
	      window.removeEventListener('resize', this.resize, false);
	      window.removeEventListener('scroll', this.scroll, false);

	      if (this.el.parentNode) {
	        this.el.parentNode.removeChild(this.el);
	        this.trigger('destroyed');
	      }
	    }
	  }, {
	    key: "position",
	    value: function position() {
	      var top = this.options.y;
	      var left = this.options.x;
	      var menuEl = this.el.querySelector('.sgn-popover__menu');
	      var width = menuEl.offsetWidth;
	      var height = menuEl.offsetHeight;
	      var parentWidth = this.el.parentNode.offsetWidth;
	      var parentHeight = this.el.parentNode.offsetHeight;
	      var boundingRect = this.el.parentNode.getBoundingClientRect();
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
	      var _context4,
	          _this2 = this;

	      var trigger = bind$2(_context4 = this.trigger).call(_context4, this);

	      this.el.addEventListener('keyup', this.keyUp);
	      gator(this.el).on('click', '[data-index]', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        trigger('selected', {
	          index: +this.getAttribute('data-index')
	        });
	      });
	      gator(this.el).on('click', '[data-close]', function (e) {
	        e.preventDefault();
	        e.stopPropagation();

	        _this2.destroy();
	      });
	      gator(this.el).on('click', '.sgn-popover__menu', function (e) {
	        e.stopPropagation();
	      });
	      window.addEventListener('resize', this.resize, false);
	      window.addEventListener('scroll', this.scroll, false);
	    }
	  }, {
	    key: "keyUp",
	    value: function keyUp(e) {
	      if (e.keyCode === ESC) {
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
	}(microevent);

	function singleChoicePopover(ctx, callback) {
	  var items = ctx.items;
	  var popover = null;

	  if (items.length === 1) {
	    callback(items[0]);
	  } else if (items.length > 1) {
	    popover = new Popover({
	      header: ctx.header,
	      x: ctx.x,
	      y: ctx.y,
	      singleChoiceItems: items
	    });

	    bind$2(popover).call(popover, 'selected', function (e) {
	      callback(items[e.index]);
	      popover.destroy();
	    });

	    bind$2(popover).call(popover, 'destroyed', function () {
	      ctx.el.focus();
	    });

	    ctx.el.appendChild(popover.el);
	    popover.render().el.focus();
	  }

	  return {
	    destroy: function destroy() {
	      var _popover;

	      (_popover = popover) === null || _popover === void 0 ? void 0 : _popover.destroy();
	    }
	  };
	}

	var on = function on(el, events, selector, callback) {
	  return gator(el).on(events, selector, callback);
	};
	var off = function off(el, events, selector, callback) {
	  return gator(el).off(events, selector, callback);
	};

	var CoreUIKit = /*#__PURE__*/Object.freeze({
		__proto__: null,
		on: on,
		off: off,
		OfferDetails: OfferDetails,
		Popover: Popover,
		singleChoicePopover: singleChoicePopover
	});

	'use strict';


	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	'use strict';





	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var es_array_join = {

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

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	_export$1({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var es_object_assign = {

	};

	var assign$2 = path$1.Object.assign;

	var assign$1 = assign$2;

	var assign = assign$1;

	'use strict';










	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

	var SPECIES$2 = wellKnownSymbol$1('species');
	var nativeSlice = [].slice;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
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
	    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var es_array_slice = {

	};

	var slice$4 = entryVirtual('Array').slice;

	var ArrayPrototype$5 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.slice) ? slice$4 : own;
	};

	var slice$3 = slice_1;

	var slice$2 = slice$3;

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

	var FORCED$2 = fails$1(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  // https://github.com/tc39/proposal-well-formed-stringify
	  _export$1({ target: 'JSON', stat: true, forced: FORCED$2 }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var result = $stringify.apply(null, arguments);
	      return typeof result == 'string' ? result.replace(re, fix) : result;
	    }
	  });
	}

	var es_json_stringify = {

	};

	if (!path$1.JSON) path$1.JSON = { stringify: JSON.stringify };

	// eslint-disable-next-line no-unused-vars -- required for `.length`
	var stringify$2 = function stringify(it, replacer, space) {
	  return path$1.JSON.stringify.apply(null, arguments);
	};

	var stringify$1 = stringify$2;

	var stringify = stringify$1;

	var setInterval$1 = path$1.setInterval;

	var setInterval = setInterval$1;

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
	    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
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

	var prefixKey = 'sgn-';

	var storage = function () {
	  try {
	    var _storage = window.localStorage;
	    _storage["".concat(prefixKey, "test-storage")] = 'foobar';
	    delete _storage["".concat(prefixKey, "test-storage")];
	    return _storage;
	  } catch (error) {
	    return {};
	  }
	}();

	function get(key) {
	  try {
	    return JSON.parse(storage["".concat(prefixKey).concat(key)]);
	  } catch (error) {}
	}
	function set$1(key, value) {
	  try {
	    storage["".concat(prefixKey).concat(key)] = stringify(value);
	  } catch (error) {}
	}

	var clientLocal = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get: get,
		set: set$1
	});

	var createTrackerClient = function createTrackerClient() {
	  var _id;

	  var id = get('client-id');

	  if ((_id = id) !== null && _id !== void 0 && _id.data) {
	    id = id.data;
	  }

	  if (id == null) {
	    id = uuid();
	    set$1('client-id', id);
	  }

	  return {
	    id: id
	  };
	};

	function getPool() {
	  var data = get('event-tracker-pool');

	  if (isArray$2(data) === false) {
	    data = [];
	  }

	  data = filter(data).call(data, function (evt) {
	    return typeof evt._i === 'string';
	  });
	  return data;
	}

	var pool = getPool();

	var Tracker = /*#__PURE__*/function () {
	  function Tracker() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Tracker);

	    for (var key in this.defaultOptions) {
	      var value = this.defaultOptions[key];
	      this[key] = options[key] || value;
	    }

	    this.client = (options === null || options === void 0 ? void 0 : options.client) || createTrackerClient();
	    this.eventsTrackUrl = (options === null || options === void 0 ? void 0 : options.eventsTrackUrl) || eventsTrackUrl;
	    this.location = {
	      geohash: null,
	      time: null,
	      country: null
	    };
	    this.dispatching = false;
	    this.hasMadeInitialDispatch = false;

	    if (this.eventsTrackUrl) {
	      dispatch(this.eventsTrackUrl);
	      this.hasMadeInitialDispatch = true;
	    }
	  }

	  _createClass(Tracker, [{
	    key: "setEventsTrackUrl",
	    value: function setEventsTrackUrl(eventsTrackUrl) {
	      this.eventsTrackUrl = eventsTrackUrl;

	      if (!this.hasMadeInitialDispatch) {
	        dispatch(this.eventsTrackUrl);
	        this.hasMadeInitialDispatch = true;
	      }
	    }
	  }, {
	    key: "trackEvent",
	    value: function trackEvent(type) {
	      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

	      if (typeof type !== 'number') {
	        throw error(new Error('Event type is required'));
	      }

	      if (this.trackId == null) {
	        return;
	      }

	      var evt = assign({}, properties, {
	        _e: type,
	        _v: version,
	        _i: uuid(),
	        _t: Math.round(new Date().getTime() / 1000),
	        _a: this.trackId
	      });

	      if (this.location.geohash) {
	        evt['l.h'] = this.location.geohash;
	      }

	      if (this.location.time) {
	        evt['l.ht'] = this.location.time;
	      }

	      if (this.location.country) {
	        evt['l.c'] = this.location.country;
	      }

	      pool.push(evt);

	      while (pool.length > this.poolLimit) {
	        pool.shift();
	      }

	      dispatch(this.eventsTrackUrl);
	      return this;
	    }
	  }, {
	    key: "setLocation",
	    value: function setLocation() {
	      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      for (var key in location) {
	        var value = location[key];

	        if (Object.prototype.hasOwnProperty.call(this.location, key)) {
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
	    key: "trackSearched",
	    value: function trackSearched(properties, version) {
	      return this.trackEvent(5, properties, version);
	    }
	  }, {
	    key: "trackIncitoPublicationOpened",
	    value: function trackIncitoPublicationOpened(properties, version) {
	      return this.trackEvent(11, properties, version);
	    }
	  }, {
	    key: "createViewToken",
	    value: function createViewToken() {
	      var _context, _context2;

	      for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
	        parts[_key] = arguments[_key];
	      }

	      var str = concat(_context = [this.client.id]).call(_context, parts).join('');

	      var viewToken = btoa(String.fromCharCode.apply(null, slice$2(_context2 = md5(str, {
	        asBytes: true
	      })).call(_context2, 0, 8)));
	      return viewToken;
	    }
	  }]);

	  return Tracker;
	}();

	Tracker.prototype.defaultOptions = {
	  trackId: null,
	  poolLimit: 1000
	};
	var dispatching = false;
	var dispatchLimit = 100;

	function ship() {
	  var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var eventsTrackUrl = arguments.length > 1 ? arguments[1] : undefined;
	  return browserPonyfill(eventsTrackUrl, {
	    method: 'post',
	    timeout: 1000 * 20,
	    headers: {
	      'Content-Type': 'application/json; charset=utf-8'
	    },
	    body: stringify({
	      events: events
	    })
	  }).then(function (response) {
	    return response.json();
	  });
	}

	var dispatchRetryInterval = null;

	function _dispatch(eventsTrackUrl) {
	  if (dispatching === true || pool.length === 0) {
	    return;
	  }

	  var events = slice$2(pool).call(pool, 0, dispatchLimit);

	  var nacks = 0;
	  dispatching = true;
	  ship(events, eventsTrackUrl).then(function (response) {
	    var _context3;

	    dispatching = false;

	    if (dispatchRetryInterval) {
	      clearInterval(dispatchRetryInterval);
	      dispatchRetryInterval = null;
	    }

	    forEach(_context3 = response.events).call(_context3, function (resEvent) {
	      if (resEvent.status === 'validation_error' || resEvent.status === 'ack') {
	        pool = filter(pool).call(pool, function (poolEvent) {
	          return poolEvent._i !== resEvent.id;
	        });
	      } else {
	        nacks++;
	      }
	    }); // Keep dispatching until the pool size reaches a sane level.


	    if (pool.length >= dispatchLimit && nacks === 0) {
	      dispatch(eventsTrackUrl);
	    }
	  }).catch(function (err) {
	    dispatching = false; // Try dispatching again in 20 seconds, if we aren't already trying

	    if (!dispatchRetryInterval) {
	      console.warn("We're gonna keep trying, but there was an error while dispatching events:", err);
	      dispatchRetryInterval = setInterval(function () {
	        return dispatch(eventsTrackUrl);
	      }, 20000);
	    }
	  });
	}

	var dispatch = throttle(_dispatch, 4000);
	set$1('event-tracker-pool', []);

	try {
	  window.addEventListener('beforeunload', function () {
	    pool = concat(pool).call(pool, getPool());
	    set$1('event-tracker-pool', pool);
	  }, false);
	} catch (error) {}

	var EventsKit = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Tracker: Tracker
	});

	var isArray$1 = isArray$4;

	var isArray = isArray$1;

	function _arrayWithHoles(arr) {
	  if (isArray(arr)) return arr;
	}

	var ITERATOR$3 = wellKnownSymbol$1('iterator');

	var isIterable$1 = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$3] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || iterators$1.hasOwnProperty(classof$1(O));
	};

	var isIterable_1 = isIterable$1;

	var isIterable = isIterable_1;

	var getIterator_1 = getIterator$1;

	var getIterator = getIterator_1;

	function _iterableToArrayLimit(arr, i) {
	  if (typeof symbol$2 === "undefined" || !isIterable(Object(arr))) return;
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

	var slice$1 = slice_1;

	var slice = slice$1;

	var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration$1(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	_export$1({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
	  from: arrayFrom
	});

	var es_array_from = {

	};

	var from$4 = path$1.Array.from;

	var from$3 = from$4;

	var from$2 = from$3;

	function _arrayLikeToArray$2(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _unsupportedIterableToArray$2(o, minLen) {
	  var _context;

	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);

	  var n = slice(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return from$2(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
	}

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var SPECIES$1 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction(S);
	};

	'use strict';











	var arrayPush = [].push;
	var min = Math.min;
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
	          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
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

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$1(function () {
	    return !!whitespaces$1[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces$1[METHOD_NAME].name !== METHOD_NAME;
	  });
	};

	'use strict';

	var $trim = stringTrim$1.trim;


	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	_export$1({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var es_string_trim = {

	};

	var trim$3 = entryVirtual('String').trim;

	var StringPrototype = String.prototype;

	var trim_1 = function (it) {
	  var own = it.trim;
	  return typeof it === 'string' || it === StringPrototype
	    || (it instanceof String && own === StringPrototype.trim) ? trim$3 : own;
	};

	var trim$2 = trim_1;

	var trim$1 = trim$2;

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
	      text: slice$2(text).call(text, 0, spans[0].start)
	    });
	  }

	  forEach(spans).call(spans, function (span, i) {
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

	function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var Incito = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Incito, _MicroEvent);

	  var _super = _createSuper$9(Incito);

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

	      if (isArray$2(theme.font_family)) {
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

	        if (isArray$2(view.spans) && view.spans.length > 0) {
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

	        if (isArray$2(view.font_family) && view.font_family.length > 0) {
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

	        if (isArray$2(view.text_decoration_line)) {
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

	          forEach(_context10 = trim$1(_context11 = view.style).call(_context11).split(';')).call(_context10, function (style) {
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

	      if (isArray$2(view.feature_labels)) {
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


	      if (isArray$2(view.transform_origin) && view.transform_origin.length === 2) {
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

	          if (isArray$2(view.child_views)) {
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

	function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var IncitoPublicationEventTracking = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(IncitoPublicationEventTracking, _MicroEvent);

	  var _super = _createSuper$8(IncitoPublicationEventTracking);

	  function IncitoPublicationEventTracking(eventTracker, details) {
	    var _this;

	    _classCallCheck(this, IncitoPublicationEventTracking);

	    _this = _super.call(this);
	    _this.eventTracker = eventTracker;
	    _this.details = details;
	    return _this;
	  }

	  _createClass(IncitoPublicationEventTracking, [{
	    key: "trackOpened",
	    value: function trackOpened() {
	      var _context;

	      if (this.eventTracker == null || this.details == null) {
	        return this;
	      }

	      this.eventTracker.trackIncitoPublicationOpened({
	        'ip.paged': indexOf(_context = this.details.types).call(_context, 'paged') > -1,
	        'ip.id': this.details.id,
	        vt: this.eventTracker.createViewToken(this.details.id)
	      });
	      return this;
	    }
	  }]);

	  return IncitoPublicationEventTracking;
	}(microevent);

	function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var Viewer$1 = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Viewer, _MicroEvent);

	  var _super = _createSuper$7(Viewer);

	  function Viewer(el) {
	    var _this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Viewer);

	    _this = _super.call(this);
	    _this.el = el;
	    _this.options = options;
	    _this.incito = new Incito(_this.el, {
	      incito: _this.options.incito
	    });
	    _this._eventTracking = new IncitoPublicationEventTracking(_this.options.eventTracker, _this.options.details);
	    return _this;
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
	}(microevent);

	_defineProperty(Viewer$1, "Incito", Incito);

	var from$1 = from$4;

	var from = from$1;

	var symbol$1 = symbol$4;

	var symbol = symbol$1;

	var getIteratorMethod_1 = getIteratorMethod$2;

	var getIteratorMethod$1 = getIteratorMethod_1;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$3(callbackfn);
	    var O = toObject$1(that);
	    var self = indexedObject$1(O);
	    var length = toLength$1(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	'use strict';

	var $reduce = arrayReduce.left;




	var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce');
	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !engineIsNode$1 && engineV8Version$1 > 79 && engineV8Version$1 < 83;

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	_export$1({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || CHROME_BUG }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var es_array_reduce = {

	};

	var reduce$2 = entryVirtual('Array').reduce;

	var ArrayPrototype$4 = Array.prototype;

	var reduce_1 = function (it) {
	  var own = it.reduce;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.reduce) ? reduce$2 : own;
	};

	var reduce$1 = reduce_1;

	var reduce = reduce$1;

	var propertyIsEnumerable = objectPropertyIsEnumerable$1.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$1 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$1(it);
	    var keys = objectKeys$1(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors$1 || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod$1(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod$1(false)
	};

	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	_export$1({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var es_object_values = {

	};

	var values$2 = path$1.Object.values;

	var values$1 = values$2;

	var values = values$1;

	var Controls = /*#__PURE__*/function () {
	  function Controls(viewer) {
	    var _context;

	    _classCallCheck(this, Controls);

	    this.scroll = bind$2(_context = this.scroll).call(_context, this);
	    this.viewer = viewer;
	    this.progressEl = this.viewer.el.querySelector('.sgn-incito__progress');

	    if (this.progressEl) {
	      this.progressEl.textContent = '0 %';
	      window.addEventListener('scroll', this.scroll, false);
	    }
	  }

	  _createClass(Controls, [{
	    key: "destroy",
	    value: function destroy() {
	      window.removeEventListener('scroll', this.scroll, false);
	    }
	  }, {
	    key: "scroll",
	    value: function scroll() {
	      var winHeight = window.innerHeight;
	      var rect = this.viewer.el.getBoundingClientRect();
	      var progress = Math.min(100, Math.round(Math.abs(rect.top - winHeight) / rect.height * 100));
	      this.progressEl.textContent = "".concat(progress, " %");
	      this.viewer.trigger('progress', {
	        progress: progress
	      });
	    }
	  }]);

	  return Controls;
	}();

	function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof symbol === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$2(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$1(o, minLen) { var _context6; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = slice$2(_context6 = Object.prototype.toString.call(o)).call(_context6, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

	function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	var Bootstrapper$1 = /*#__PURE__*/function () {
	  function Bootstrapper() {
	    var _context;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Bootstrapper);

	    this.fetchDetails = bind$2(_context = this.fetchDetails).call(_context, this);
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
	  }

	  _createClass(Bootstrapper, [{
	    key: "getDeviceCategory",
	    value: function getDeviceCategory$1() {
	      return getDeviceCategory();
	    }
	  }, {
	    key: "getPixelRatio",
	    value: function getPixelRatio() {
	      return window.devicePixelRatio || 1;
	    }
	  }, {
	    key: "getPointer",
	    value: function getPointer$1() {
	      return getPointer();
	    }
	  }, {
	    key: "getOrientation",
	    value: function getOrientation$1() {
	      var orientation = getOrientation(screen.width, screen.height);

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
	      var localeChain = [];
	      var locale = null;

	      if (isArray$2(navigator.languages) && navigator.languages.length > 0) {
	        localeChain = concat(localeChain).call(localeChain, navigator.languages);
	      } else if (typeof navigator.language === 'string' && navigator.language.length > 0) {
	        localeChain.push(navigator.language);
	      } else if (typeof navigator.browserLanguage === 'string' && navigator.browserLanguage.length > 0) {
	        localeChain.push(navigator.browserLanguage);
	      }

	      localeChain.push('en_US');

	      var _iterator = _createForOfIteratorHelper$1(localeChain),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var prefLocale = _step.value;

	          if (prefLocale == null) {
	            continue;
	          }

	          prefLocale = prefLocale.replace('-', '_');

	          if (/[a-z][a-z]_[A-Z][A-Z]/g.test(prefLocale)) {
	            locale = prefLocale;
	            break;
	          }
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
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
	      var featureLabels = get('incito-feature-labels');

	      if (isArray$2(featureLabels) === false) {
	        featureLabels = [];
	      }

	      return featureLabels;
	    }
	  }, {
	    key: "anonymizeFeatureLabels",
	    value: function anonymizeFeatureLabels() {
	      var _context2, _context3;

	      var count = this.featureLabels.length;

	      var vector = reduce(_context2 = this.featureLabels).call(_context2, function (acc, cur) {
	        if (!acc[cur]) {
	          acc[cur] = {
	            key: cur,
	            value: 0
	          };
	        }

	        acc[cur].value++;
	        return acc;
	      }, {});

	      return map(_context3 = values(vector)).call(_context3, function (featureLabel) {
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

	      this.fetchDetails(this.options.id, function (err, details) {
	        if (err != null) {
	          return callback(err);
	        }

	        _this.fetchIncito(details.incito_publication_id, function (err1, incito) {
	          if (err1 != null) {
	            return callback(err1);
	          }

	          callback(null, {
	            details: details,
	            incito: incito
	          });
	        });
	      });
	    }
	  }, {
	    key: "fetchDetails",
	    value: function fetchDetails(id, callback) {
	      request$1({
	        url: "/v2/catalogs/".concat(id)
	      }, callback);
	    }
	  }, {
	    key: "fetchIncito",
	    value: function fetchIncito(id, callback) {
	      request$1({
	        url: '/v4/rpc/generate_incito_from_publication',
	        method: 'post',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: stringify({
	          id: id,
	          device_category: this.deviceCategory,
	          pointer: this.pointer,
	          orientation: this.orientation,
	          pixel_ratio: this.pixelRatio,
	          max_width: this.maxWidth,
	          versions_supported: this.versionsSupported,
	          locale_code: this.locale,
	          time: this.time,
	          feature_labels: this.anonymizeFeatureLabels(this.featureLabels)
	        })
	      }, callback);
	    }
	  }, {
	    key: "createViewer",
	    value: function createViewer(data) {
	      var _context4;

	      var self = this;

	      if (data.incito == null) {
	        throw error(new Error(), 'You need to supply valid Incito to create a viewer');
	      }

	      var viewer = new Viewer$1(this.options.el, {
	        id: this.options.id,
	        details: data.details,
	        incito: data.incito,
	        eventTracker: this.options.eventTracker
	      });
	      var controls = new Controls(viewer);

	      bind$2(_context4 = viewer.incito).call(_context4, 'destroy', function () {
	        controls.destroy();
	      }); // Persist clicks on feature labels for later anonymization.


	      gator(viewer.el).on('click', '.incito__view[data-feature-labels]', function () {
	        var _context5;

	        var featureLabels = this.getAttribute('data-feature-labels').split(',');
	        self.featureLabels = concat(_context5 = self.featureLabels).call(_context5, featureLabels);

	        while (self.featureLabels.length > 1000) {
	          self.featureLabels.shift();
	        }

	        set$1('incito-feature-labels', self.featureLabels);
	      });
	      return viewer;
	    }
	  }]);

	  return Bootstrapper;
	}();

	var IncitoPublicationKit = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Viewer: Viewer$1,
		Bootstrapper: Bootstrapper$1
	});

	'use strict';

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	_export$1({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1(FIND);

	var es_array_find = {

	};

	var find$2 = entryVirtual('Array').find;

	var ArrayPrototype$3 = Array.prototype;

	var find_1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.find) ? find$2 : own;
	};

	var find$1 = find_1;

	var find = find$1;

	var pairs = {
	  'paged_publication.hotspot_picker.header': 'Which offer did you mean?',
	  'incito_publication.product_picker.header': 'Which product?'
	};
	function t(key, view) {
	  var _pairs$key;

	  var template = (_pairs$key = pairs[key]) !== null && _pairs$key !== void 0 ? _pairs$key : '';
	  return mustache.render(template, view);
	}
	function update(translations) {
	  for (var key in translations) {
	    var value = translations[key];
	    pairs[key] = value;
	  }
	}

	var translations = /*#__PURE__*/Object.freeze({
		__proto__: null,
		t: t,
		update: update
	});

	function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var PagedPublicationControls = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationControls, _MicroEvent);

	  var _super = _createSuper$6(PagedPublicationControls);

	  function PagedPublicationControls(el) {
	    var _context, _context2, _context3, _context4, _context5, _context6, _this$els$prevControl, _this$els$nextControl, _this$els$close;

	    var _this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, PagedPublicationControls);

	    _this = _super.call(this);
	    _this.destroy = bind$2(_context = _this.destroy).call(_context, _assertThisInitialized(_this));
	    _this.beforeNavigation = bind$2(_context2 = _this.beforeNavigation).call(_context2, _assertThisInitialized(_this));
	    _this.prevClicked = bind$2(_context3 = _this.prevClicked).call(_context3, _assertThisInitialized(_this));
	    _this.nextClicked = bind$2(_context4 = _this.nextClicked).call(_context4, _assertThisInitialized(_this));
	    _this.closeClicked = bind$2(_context5 = _this.closeClicked).call(_context5, _assertThisInitialized(_this));
	    _this.keyDown = bind$2(_context6 = _this.keyDown).call(_context6, _assertThisInitialized(_this));
	    _this.options = options;
	    _this.els = {
	      root: el,
	      progress: el.querySelector('.sgn-pp__progress'),
	      progressBar: el.querySelector('.sgn-pp-progress__bar'),
	      progressLabel: el.querySelector('.sgn-pp__progress-label'),
	      prevControl: el.querySelector('.sgn-pp__control[data-direction=prev]'),
	      nextControl: el.querySelector('.sgn-pp__control[data-direction=next]'),
	      close: el.querySelector('.sgn-pp--close')
	    };
	    _this.keyDownHandler = throttle(_this.keyDown, 150, _assertThisInitialized(_this));

	    if (_this.options.keyboard === true) {
	      _this.els.root.addEventListener('keydown', _this.keyDownHandler, false);
	    }

	    (_this$els$prevControl = _this.els.prevControl) === null || _this$els$prevControl === void 0 ? void 0 : _this$els$prevControl.addEventListener('mousedown', _this.prevClicked, false);
	    (_this$els$nextControl = _this.els.nextControl) === null || _this$els$nextControl === void 0 ? void 0 : _this$els$nextControl.addEventListener('mousedown', _this.nextClicked, false);
	    (_this$els$close = _this.els.close) === null || _this$els$close === void 0 ? void 0 : _this$els$close.addEventListener('mousedown', _this.closeClicked, false);

	    bind$2(_this).call(_this, 'beforeNavigation', _this.beforeNavigation);

	    bind$2(_this).call(_this, 'destroyed', _this.destroy);

	    return _this;
	  }

	  _createClass(PagedPublicationControls, [{
	    key: "destroy",
	    value: function destroy() {
	      var _this$els$prevControl2, _this$els$nextControl2, _this$els$close2;

	      if (this.options.keyboard === true) {
	        this.els.root.removeEventListener('keydown', this.keyDownHandler, false);
	      }

	      (_this$els$prevControl2 = this.els.prevControl) === null || _this$els$prevControl2 === void 0 ? void 0 : _this$els$prevControl2.removeEventListener('mousedown', this.prevClicked, false);
	      (_this$els$nextControl2 = this.els.nextControl) === null || _this$els$nextControl2 === void 0 ? void 0 : _this$els$nextControl2.removeEventListener('mousedown', this.nextClicked, false);
	      (_this$els$close2 = this.els.close) === null || _this$els$close2 === void 0 ? void 0 : _this$els$close2.removeEventListener('mousedown', this.closeClicked, false);
	    }
	  }, {
	    key: "beforeNavigation",
	    value: function beforeNavigation(e) {
	      var showProgress = typeof e.progressLabel === 'string' && e.progressLabel.length > 0;
	      var visibilityClassName = 'sgn-pp--hidden';

	      if (this.els.progress && this.els.progressBar) {
	        this.els.progressBar.style.width = "".concat(e.progress, "%");

	        if (showProgress === true) {
	          this.els.progress.classList.remove(visibilityClassName);
	        } else {
	          this.els.progress.classList.add(visibilityClassName);
	        }
	      }

	      if (this.els.progressLabel) {
	        if (showProgress === true) {
	          this.els.progressLabel.textContent = e.progressLabel;
	          this.els.progressLabel.classList.remove(visibilityClassName);
	        } else {
	          this.els.progressLabel.classList.add(visibilityClassName);
	        }
	      }

	      if (this.els.prevControl) {
	        if (e.verso.newPosition === 0) {
	          this.els.prevControl.classList.add(visibilityClassName);
	        } else {
	          this.els.prevControl.classList.remove(visibilityClassName);
	        }
	      }

	      if (this.els.nextControl) {
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
	      var keyCode = e.keyCode;

	      if (ARROW_LEFT === keyCode) {
	        this.trigger('prev', {
	          duration: 0
	        });
	      } else if (ARROW_RIGHT === keyCode || SPACE === keyCode) {
	        this.trigger('next', {
	          duration: 0
	        });
	      } else if (NUMBER_ONE === keyCode) {
	        this.trigger('first', {
	          duration: 0
	        });
	      }
	    }
	  }]);

	  return PagedPublicationControls;
	}(microevent);

	// a string of all valid unicode whitespaces
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod = function (TYPE) {
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
	  start: createMethod(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod(3)
	};

	'use strict';










	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
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
	  for (var keys = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (has$1(NativeNumber, key = keys[j]) && !has$1(NumberWrapper, key)) {
	      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor$1(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global$1, NUMBER, NumberWrapper);
	}

	var es_number_constructor = {

	};

	var Animation = /*#__PURE__*/function () {
	  function Animation(el) {
	    _classCallCheck(this, Animation);

	    _defineProperty(this, "run", 0);

	    this.el = el;
	  }

	  _createClass(Animation, [{
	    key: "animate",
	    value: function animate() {
	      var _options$x,
	          _options$y,
	          _options$scale,
	          _options$easing,
	          _options$duration,
	          _context,
	          _context2,
	          _this = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	      var x = (_options$x = options.x) !== null && _options$x !== void 0 ? _options$x : 0;
	      var y = (_options$y = options.y) !== null && _options$y !== void 0 ? _options$y : 0;
	      var scale = (_options$scale = options.scale) !== null && _options$scale !== void 0 ? _options$scale : 1;
	      var easing = (_options$easing = options.easing) !== null && _options$easing !== void 0 ? _options$easing : 'ease-out';
	      var duration = (_options$duration = options.duration) !== null && _options$duration !== void 0 ? _options$duration : 0;
	      var run = ++this.run;

	      var transform = concat(_context = concat(_context2 = "translateX(".concat(x, ") translateY(")).call(_context2, y, ") scale(")).call(_context, scale, ")");

	      if (this.el.style.transform === transform) {
	        callback();
	      } else if (duration > 0) {
	        var _context3;

	        var transitionEnd = function transitionEnd() {
	          if (run !== _this.run) {
	            return;
	          }

	          _this.el.removeEventListener('transitionend', transitionEnd);

	          _this.el.style.transition = 'none';
	          callback();
	        };

	        this.el.addEventListener('transitionend', transitionEnd, false);
	        this.el.style.transition = concat(_context3 = "transform ".concat(easing, " ")).call(_context3, duration, "ms");
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

	var PageSpread = /*#__PURE__*/function () {
	  function PageSpread(el) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, PageSpread);

	    _defineProperty(this, "visibility", 'gone');

	    _defineProperty(this, "positioned", false);

	    _defineProperty(this, "active", false);

	    this.el = el;
	    this.options = options;
	    this.id = this.options.id;
	    this.type = this.options.type;
	    this.pageIds = this.options.pageIds;
	    this.width = this.options.width;
	    this.left = this.options.left;
	    this.maxZoomScale = this.options.maxZoomScale;
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
	      var _rect$top, _rect$left, _rect$right, _rect$bottom;

	      var rect = {
	        top: null,
	        left: null,
	        right: null,
	        bottom: null,
	        width: null,
	        height: null
	      };

	      for (var _i = 0, _Array$from = from(this.getPageEls()); _i < _Array$from.length; _i++) {
	        var pageEl = _Array$from[_i];
	        var pageRect = pageEl.getBoundingClientRect();

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

	      rect.top = (_rect$top = rect.top) !== null && _rect$top !== void 0 ? _rect$top : 0;
	      rect.left = (_rect$left = rect.left) !== null && _rect$left !== void 0 ? _rect$left : 0;
	      rect.right = (_rect$right = rect.right) !== null && _rect$right !== void 0 ? _rect$right : 0;
	      rect.bottom = (_rect$bottom = rect.bottom) !== null && _rect$bottom !== void 0 ? _rect$bottom : 0;
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

	// `Date.now` method
	// https://tc39.es/ecma262/#sec-date.now
	_export$1({ target: 'Date', stat: true }, {
	  now: function now() {
	    return new Date().getTime();
	  }
	});

	var es_date_now = {

	};

	var now$3 = path$1.Date.now;

	var now$2 = now$3;

	var now$1 = now$2;

	var create$1 = create$4;

	var create = create$1;

	'use strict';






	var test = [];
	var nativeSort = test.sort;

	// IE8-
	var FAILS_ON_UNDEFINED = fails$1(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$1(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD = arrayMethodIsStrict$1('sort');

	var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	_export$1({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? nativeSort.call(toObject$1(this))
	      : nativeSort.call(toObject$1(this), aFunction$3(comparefn));
	  }
	});

	var es_array_sort = {

	};

	var sort$2 = entryVirtual('Array').sort;

	var ArrayPrototype$2 = Array.prototype;

	var sort_1 = function (it) {
	  var own = it.sort;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.sort) ? sort$2 : own;
	};

	var sort$1 = sort_1;

	var sort = sort$1;

	'use strict';

	var $findIndex = arrayIteration.findIndex;


	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-array.prototype.findindex
	_export$1({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1(FIND_INDEX);

	var es_array_findIndex = {

	};

	var findIndex$2 = entryVirtual('Array').findIndex;

	var ArrayPrototype$1 = Array.prototype;

	var findIndex_1 = function (it) {
	  var own = it.findIndex;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.findIndex) ? findIndex$2 : own;
	};

	var findIndex$1 = findIndex_1;

	var findIndex = findIndex$1;

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	_export$1({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var es_object_entries = {

	};

	var entries$2 = path$1.Object.entries;

	var entries$1 = entries$2;

	var entries = entries$1;

	/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	//(function(window, document, exportName, undefined) {
	'use strict';

	function ownKeys$1(object, enumerableOnly) { var keys = keys$6(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$5(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context20; forEach(_context20 = ownKeys$1(Object(source), true)).call(_context20, function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { defineProperties(target, getOwnPropertyDescriptors(source)); } else { var _context21; forEach(_context21 = ownKeys$1(Object(source))).call(_context21, function (key) { defineProperty$7(target, key, getOwnPropertyDescriptor$5(source, key)); }); } } return target; }
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];

	var TEST_ELEMENT = function TEST_ELEMENT() {
	  return typeof document != 'undefined' && document.createElement('div');
	};

	var TYPE_FUNCTION = 'function';
	var round = Math.round;
	var abs = Math.abs;
	var now = now$1;
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
	  if (isArray$2(arg)) {
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

	  if (forEach(obj)) {
	    forEach(obj).call(obj, iterator, context);
	  } else if (obj.length !== undefined) {
	    i = 0;

	    while (i < obj.length) {
	      iterator.call(context, obj[i], i, obj);
	      i++;
	    }
	  } else {
	    for (i in obj) {
	      if (Object.hasOwnProperty.call(obj, i)) {
	        iterator.call(context, obj[i], i, obj);
	      }
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
	  childP = child.prototype = create(baseP);
	  childP.constructor = child;
	  childP._super = baseP;
	  if (properties) assign(childP, properties);
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
	  var _context;

	  forEach(_context = splitStr(types)).call(_context, function (type) {
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
	  var _context2;

	  forEach(_context2 = splitStr(types)).call(_context2, function (type) {
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
	  return indexOf(str).call(str, find) > -1;
	}
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */


	function splitStr(str) {
	  return trim$1(str).call(str).split(/\s+/g);
	}
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */


	var toArray = function toArray(obj) {
	  return slice$2(Array.prototype).call(obj, 0);
	};
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */


	function uniqueArray(array, key, sort$1) {
	  var results = [];
	  var values = [];

	  forEach(array).call(array, function (item, i) {
	    var val = key ? item[key] : item;
	    if (indexOf(values).call(values, val) < 0) results.push(item);
	    values[i] = val;
	  });

	  if (sort$1) sort(results).call(results, !key ? undefined : function (a, b) {
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
	  var camelProp = property[0].toUpperCase() + slice$2(property).call(property, 1);

	  return find(VENDOR_PREFIXES).call(VENDOR_PREFIXES, function (prefix) {
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
	  return doc.defaultView || doc.parentWindow || typeof window !== 'undefined' && window;
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = function SUPPORT_TOUCH() {
	  return typeof window !== 'undefined' && 'ontouchstart' in window;
	};

	var SUPPORT_POINTER_EVENTS = function SUPPORT_POINTER_EVENTS() {
	  return typeof window !== 'undefined' && prefixed(window, 'PointerEvent') !== undefined;
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
	  var _context3;

	  // make a simple copy of the pointers because we will get a reference if we don't
	  // we only need clientXY for the calculations
	  var pointers = map(_context3 = input.pointers).call(_context3, function (pointer) {
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

	  forEach(pointers).call(pointers, function (_ref) {
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

	    var storeIndex = findIndex(store).call(store, function (item) {
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

	    if (removePointer) splice(store).call(store, storeIndex, 1);
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
	    all = uniqueArray(concat(all).call(all, changed), 'identifier', true);
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

	  targetTouches = filter(allTouches).call(allTouches, function (touch) {
	    return hasParent(touch.target, target);
	  }); // collect touches

	  if (type === INPUT_START) {
	    forEach(targetTouches).call(targetTouches, function (targetTouch) {
	      targetIds[targetTouch.identifier] = true;
	    });
	  } // filter changed touches to only contain touches that exist in the collected target ids


	  forEach(changedTouches).call(changedTouches, function (changedTouch) {
	    if (targetIds[changedTouch.identifier]) changedTargetTouches.push(changedTouch); // cleanup removed touches

	    if (type & (INPUT_END | INPUT_CANCEL)) delete targetIds[changedTouch.identifier];
	  });

	  if (!changedTargetTouches.length) return;
	  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	  uniqueArray(concat(targetTouches).call(targetTouches, changedTargetTouches), 'identifier', true), changedTargetTouches];
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
	  var _context4;

	  Input.apply(this, arguments);

	  var handler = bind$2(_context4 = this.handler).call(_context4, this);

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
	      var i = indexOf(lts).call(lts, lastTouch);

	      if (i > -1) {
	        splice(lts).call(lts, i, 1);
	      }
	    };

	    setTimeout$1(removeLastTouch, DEDUP_TIMEOUT);
	  }
	}

	function isSyntheticEvent(_ref6) {
	  var _context5;

	  var _ref6$srcEvent = _ref6.srcEvent,
	      clientX = _ref6$srcEvent.clientX,
	      clientY = _ref6$srcEvent.clientY;
	  return !!find(_context5 = this.lastTouches).call(_context5, function (lastTouch) {
	    return Math.abs(clientX - lastTouch.x) <= DEDUP_DISTANCE && Math.abs(clientY - lastTouch.y) <= DEDUP_DISTANCE;
	  });
	}

	var PREFIXED_TOUCH_ACTION = function PREFIXED_TOUCH_ACTION() {
	  var te = TEST_ELEMENT();
	  if (te) return prefixed(te.style, 'touchAction');
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
	    var _context6;

	    // find out the touch-action by the event handlers
	    if (value == TOUCH_ACTION_COMPUTE) {
	      value = this.compute();
	    }

	    var TOUCH_ACTION_MAP = getTouchActionProps();

	    if (NATIVE_TOUCH_ACTION() && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	      this.manager.element.style[PREFIXED_TOUCH_ACTION()] = value;
	    }

	    this.actions = trim$1(_context6 = value.toLowerCase()).call(_context6);
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
	    var _context7;

	    var actions = [];

	    forEach(_context7 = this.manager.recognizers).call(_context7, function (recognizer) {
	      if (boolOrFn(recognizer.options.enable, [recognizer])) {
	        actions = concat(actions).call(actions, recognizer.getTouchAction());
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

	var touchVals = ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'];

	function getTouchActionProps() {
	  if (!NATIVE_TOUCH_ACTION()) return false;
	  var cssSupports = typeof window !== 'undefined' && window.CSS && window.CSS.supports;
	  return reduce(touchVals).call(touchVals, function (touchMap, val) {
	    // If css.supports is not supported but there is native touch-action assume it supports
	    // all values. This is the case for IE 10 and 11.
	    touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    return touchMap;
	  }, {});
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
	  this.options = _objectSpread$1(_objectSpread$1({}, this.defaults), options);
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
	    assign(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state


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

	    if (indexOf(requireFail).call(requireFail, otherRecognizer) === -1) {
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
	    var _context8, _context9;

	    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) return this;
	    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

	    var index = indexOf(_context8 = this.requireFail).call(_context8, otherRecognizer);

	    if (index > -1) splice(_context9 = this.requireFail).call(_context9, index, 1);
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
	    var inputDataClone = _objectSpread$1({}, inputData); // is is enabled and allow recognizing?


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
	  process: function process() {},
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
	      this._timer = setTimeout$1(function () {
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
	          this._timer = setTimeout$1(function () {
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

	    this._timer = setTimeout$1(function () {
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

	  this.options = _objectSpread$1(_objectSpread$1({}, Hammer.defaults), options);
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
	    var _context10;

	    forEach(_context10 = this.options.recognizers).call(_context10, function (item) {
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
	    assign(this.options, options); // Options that need a little more setup


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

	    forEach(recognizers).call(recognizers, function (recognizer) {
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
	    var _context11;

	    if (recognizer instanceof Recognizer) return recognizer;
	    return find(_context11 = this.recognizers).call(_context11, function (_ref8) {
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
	      var _context12;

	      var index = indexOf(_context12 = this.recognizers).call(_context12, recognizer);

	      if (index !== -1) {
	        var _context13;

	        splice(_context13 = this.recognizers).call(_context13, index, 1);

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
	    var _context14;

	    if (events === undefined || handler === undefined) return;
	    var handlers = this.handlers;

	    forEach(_context14 = splitStr(events)).call(_context14, function (event) {
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
	    var _context15;

	    if (events === undefined) return;
	    var handlers = this.handlers;

	    forEach(_context15 = splitStr(events)).call(_context15, function (event) {
	      if (!handler) {
	        delete handlers[event];
	      } else if (handlers[event]) {
	        var _context16, _context17;

	        splice(_context16 = handlers[event]).call(_context16, indexOf(_context17 = handlers[event]).call(_context17, handler), 1);
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
	    var _context18;

	    // we also want to trigger dom events
	    if (this.options.domEvents) triggerDomEvent(event, data);

	    var handlers = this.handlers[event] && slice$2(_context18 = this.handlers[event]).call(_context18); // no handlers, so skip it all


	    if (!handlers || !handlers.length) return;
	    data.type = event;

	    data.preventDefault = function () {
	      data.srcEvent.preventDefault();
	    };

	    forEach(handlers).call(handlers, function (handler) {
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
	  var _context19;

	  var element = manager.element;
	  if (!element.style) return;
	  var prop;

	  forEach(_context19 = entries(manager.options.cssProps)).call(_context19, function (_ref9) {
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
	  inherit: inherit,
	  prefixed: prefixed
	});

	var hammer = Hammer;

	var Verso = /*#__PURE__*/function () {
	  function Verso(el) {
	    var _this$options$swipeVe, _this$options$swipeTh, _this$options$navigat, _this$options$navigat2, _this$options$zoomDur, _this$options$doubleT;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Verso);

	    this.el = el;
	    this.options = options;
	    this.swipeVelocity = (_this$options$swipeVe = this.options.swipeVelocity) !== null && _this$options$swipeVe !== void 0 ? _this$options$swipeVe : 0.3;
	    this.swipeThreshold = (_this$options$swipeTh = this.options.swipeThreshold) !== null && _this$options$swipeTh !== void 0 ? _this$options$swipeTh : 10;
	    this.navigationDuration = (_this$options$navigat = this.options.navigationDuration) !== null && _this$options$navigat !== void 0 ? _this$options$navigat : 240;
	    this.navigationPanDuration = (_this$options$navigat2 = this.options.navigationPanDuration) !== null && _this$options$navigat2 !== void 0 ? _this$options$navigat2 : 200;
	    this.zoomDuration = (_this$options$zoomDur = this.options.zoomDuration) !== null && _this$options$zoomDur !== void 0 ? _this$options$zoomDur : 200;
	    this.doubleTapDelay = (_this$options$doubleT = this.options.doubleTapDelay) !== null && _this$options$doubleT !== void 0 ? _this$options$doubleT : 300;
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
	    this.started = false;
	    this.destroyed = false;
	    this._events = {};
	  }

	  _createClass(Verso, [{
	    key: "bind",
	    value: function bind(event, fn) {
	      this._events[event] = this._events[event] || [];
	      return this._events[event].push(fn);
	    }
	  }, {
	    key: "unbind",
	    value: function unbind(event, fn) {
	      if (this._events[event]) {
	        var _context, _context2;

	        return splice(_context = this._events[event]).call(_context, indexOf(_context2 = this._events[event]).call(_context2, fn), 1);
	      }
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(event) {
	      var _this$_events$event,
	          _this = this;

	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      (_this$_events$event = this._events[event]) === null || _this$_events$event === void 0 ? void 0 : forEach(_this$_events$event).call(_this$_events$event, function (e) {
	        return e.apply(_this, args);
	      });
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _this$getPageSpreadPo, _context15, _context16, _context17;

	      this.scrollerEl = this.el.querySelector('.verso__scroller');
	      this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
	      this.pageSpreads = this.traversePageSpreads(this.pageSpreadEls);
	      this.pageIds = this.buildPageIds(this.pageSpreads);
	      this.animation = new Animation(this.scrollerEl);
	      this.hammer = new hammer.Manager(this.scrollerEl, {
	        touchAction: 'none',
	        enable: false,
	        inputClass: this.getHammerInputClass()
	      });
	      this.hammer.add(new hammer.Pan({
	        threshold: 5,
	        direction: hammer.DIRECTION_ALL
	      }));
	      this.hammer.add(new hammer.Tap({
	        event: 'singletap',
	        interval: 0
	      }));
	      this.hammer.add(new hammer.Pinch());
	      this.hammer.add(new hammer.Press({
	        time: 500
	      }));
	      this.hammer.on('panstart', bind$2(_context3 = this.onPanStart).call(_context3, this));
	      this.hammer.on('panmove', bind$2(_context4 = this.onPanMove).call(_context4, this));
	      this.hammer.on('panend', bind$2(_context5 = this.onPanEnd).call(_context5, this));
	      this.hammer.on('pancancel', bind$2(_context6 = this.onPanEnd).call(_context6, this));
	      this.hammer.on('singletap', bind$2(_context7 = this.onSingletap).call(_context7, this));
	      this.hammer.on('pinchstart', bind$2(_context8 = this.onPinchStart).call(_context8, this));
	      this.hammer.on('pinchmove', bind$2(_context9 = this.onPinchMove).call(_context9, this));
	      this.hammer.on('pinchend', bind$2(_context10 = this.onPinchEnd).call(_context10, this));
	      this.hammer.on('pinchcancel', bind$2(_context11 = this.onPinchEnd).call(_context11, this));
	      this.hammer.on('press', bind$2(_context12 = this.onPress).call(_context12, this));
	      this.scrollerEl.addEventListener('contextmenu', bind$2(_context13 = this.onContextmenu).call(_context13, this), false);
	      this.scrollerEl.addEventListener('wheel', bind$2(_context14 = this.onWheel).call(_context14, this), false);
	      var pageId = (_this$getPageSpreadPo = this.getPageSpreadPositionFromPageId(this.options.pageId)) !== null && _this$getPageSpreadPo !== void 0 ? _this$getPageSpreadPo : 0;
	      this.hammer.set({
	        enable: true
	      });
	      this.started = true;
	      this.destroyed = false;
	      this.navigateTo(pageId, {
	        duration: 0
	      });
	      this.resizeListener = bind$2(_context15 = this.onResize).call(_context15, this);
	      this.touchStartListener = bind$2(_context16 = this.onTouchStart).call(_context16, this);
	      this.touchEndListener = bind$2(_context17 = this.onTouchEnd).call(_context17, this);
	      this.el.addEventListener('touchstart', this.touchStartListener, false);
	      this.el.addEventListener('touchend', this.touchEndListener, false);

	      if (typeof window !== 'undefined' && window !== null) {
	        window.addEventListener('resize', this.resizeListener, false);
	      }

	      return this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var _context18, _context19;

	      if (!this.started) {
	        return console.warn("You've called .destroy() on a viewer that was not started yet, this is a no-op.");
	      }

	      if (this.destroyed) {
	        return console.warn("You've called .destroy() on a viewer that has already been destroyed and not restarted, this is a no-op.");
	      }

	      this.scrollerEl.removeEventListener('contextmenu', bind$2(_context18 = this.onContextmenu).call(_context18, this));
	      this.scrollerEl.removeEventListener('wheel', bind$2(_context19 = this.onWheel).call(_context19, this));
	      this.hammer.destroy();
	      this.el.removeEventListener('touchstart', this.touchStartListener);
	      this.el.removeEventListener('touchend', this.touchEndListener);
	      window.removeEventListener('resize', this.resizeListener);
	      this.started = false;
	      this.destroyed = true;
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
	      var _options$velocity,
	          _options$duration,
	          _context20,
	          _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      if (this.destroyed) {
	        return console.warn("You've called a navigation method on a viewer that was previously destroyed, this is a no-op.\nPlease call viewer.start() again, if you want to reuse this Viewer instance.\n\nYou might have forgotten to remove an event handler that\ncalls first/prev/next/last/navigateTo on the viewer.");
	      }

	      if (!this.started) {
	        return console.warn("\nYou've called a navigation method on a viewer that hasn't been started yet, this is a no-op.\nPlease call viewer.start() first.\n\nYou might have forgotten to remove an event handler that\ncalls .first()/.prev()/.next()/.last()/.navigateTo() on the viewer.\n");
	      }

	      if (position < 0 || position > this.getPageSpreadCount() - 1) {
	        return;
	      }

	      var currentPosition = this.getPosition();
	      var currentPageSpread = this.getPageSpreadFromPosition(currentPosition);
	      var activePageSpread = this.getPageSpreadFromPosition(position);
	      var carousel = this.getCarouselFromPageSpread(activePageSpread);
	      var velocity = (_options$velocity = options.velocity) !== null && _options$velocity !== void 0 ? _options$velocity : 1;
	      var duration = (_options$duration = options.duration) !== null && _options$duration !== void 0 ? _options$duration : this.navigationDuration;
	      duration = duration / Math.abs(velocity);
	      var touchAction = activePageSpread.isScrollable() ? 'pan-y' : 'none';
	      currentPageSpread === null || currentPageSpread === void 0 ? void 0 : currentPageSpread.deactivate();
	      activePageSpread.activate();

	      forEach(_context20 = carousel.visible).call(_context20, function (pageSpread) {
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
	        var _context21;

	        carousel = _this2.getCarouselFromPageSpread(_this2.getActivePageSpread());

	        forEach(_context21 = carousel.gone).call(_context21, function (pageSpread) {
	          return pageSpread.setVisibility('gone');
	        });

	        _this2.trigger('afterNavigation', {
	          newPosition: _this2.getPosition(),
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
	      var left = 0;

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
	      var _context22;

	      var carousel = {
	        visible: [],
	        gone: []
	      }; // Identify the page spreads that should be a part of the carousel.

	      forEach(_context22 = this.pageSpreads).call(_context22, function (pageSpread) {
	        var visible = false;

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
	      var pageSpreads = [];
	      var left = 0;

	      for (var _i = 0, _Array$from = from(els); _i < _Array$from.length; _i++) {
	        var _el$getAttribute, _el$getAttribute2, _el$getAttribute3;

	        var el = _Array$from[_i];
	        var id = el.getAttribute('data-id');
	        var type = el.getAttribute('data-type');
	        var pageIds = ((_el$getAttribute = el.getAttribute('data-page-ids')) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.split(',')) || [];
	        var maxZoomScale = Number((_el$getAttribute2 = el.getAttribute('data-max-zoom-scale')) !== null && _el$getAttribute2 !== void 0 ? _el$getAttribute2 : 1);
	        var width = Number((_el$getAttribute3 = el.getAttribute('data-width')) !== null && _el$getAttribute3 !== void 0 ? _el$getAttribute3 : 100);
	        var pageSpread = new PageSpread(el, {
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
	      var pageIds = {};

	      forEach(pageSpreads).call(pageSpreads, function (pageSpread) {
	        var _context23;

	        forEach(_context23 = pageSpread.options.pageIds).call(_context23, function (pageId) {
	          pageIds[pageId] = pageSpread;
	        });
	      });

	      return pageIds;
	    }
	  }, {
	    key: "isCoordinateInsideElement",
	    value: function isCoordinateInsideElement(x, y, el) {
	      var rect = el.getBoundingClientRect();
	      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
	    }
	  }, {
	    key: "getCoordinateInfo",
	    value: function getCoordinateInfo(x, y, pageSpread) {
	      var pageEl;
	      x -= this.el.offsetLeft;
	      y -= this.el.offsetTop;
	      var info = {
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
	      var contentRect = pageSpread.getContentRect();
	      var overlayEls = pageSpread.getOverlayEls();
	      var pageEls = pageSpread.getPageEls();

	      for (var _i2 = 0, _Array$from3 = from(overlayEls); _i2 < _Array$from3.length; _i2++) {
	        var overlayEl = _Array$from3[_i2];

	        if (this.isCoordinateInsideElement(x, y, overlayEl)) {
	          info.overlayEls.push(overlayEl);
	        }
	      }

	      for (var _i3 = 0, _Array$from4 = from(pageEls); _i3 < _Array$from4.length; _i3++) {
	        pageEl = _Array$from4[_i3];

	        if (this.isCoordinateInsideElement(x, y, pageEl)) {
	          info.pageEl = pageEl;
	          break;
	        }
	      }

	      info.contentX = (x - contentRect.left) / Math.max(1, contentRect.width);
	      info.contentY = (y - contentRect.top) / Math.max(1, contentRect.height);

	      if (info.pageEl) {
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
	      for (var idx = 0; idx < this.pageSpreads.length; idx++) {
	        var _context24;

	        var pageSpread = this.pageSpreads[idx];

	        if (indexOf(_context24 = pageSpread.options.pageIds).call(_context24, pageId) > -1) {
	          return idx;
	        }
	      }
	    }
	  }, {
	    key: "getPageSpreadBounds",
	    value: function getPageSpreadBounds(pageSpread) {
	      var pageSpreadRect = pageSpread.getRect();
	      var pageSpreadContentRect = pageSpread.getContentRect();
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
	      var _options$x, _options$y;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var callback = arguments.length > 1 ? arguments[1] : undefined;
	      var scale = options.scale;
	      var curScale = this.transform.scale;
	      var activePageSpread = this.getActivePageSpread();
	      var pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
	      var carouselOffset = activePageSpread.getLeft();
	      var carouselScaledOffset = carouselOffset * curScale;
	      var x = (_options$x = options.x) !== null && _options$x !== void 0 ? _options$x : 0;
	      var y = (_options$y = options.y) !== null && _options$y !== void 0 ? _options$y : 0;

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
	      var mobileRegex = /mobile|tablet|ip(ad|hone|od)|android/i;
	      var supportTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

	      if (supportTouch && mobileRegex.test(navigator.userAgent)) {
	        return hammer.TouchInput;
	      } else {
	        return null;
	      }
	    } //#############

	    /* Events */
	    //#############

	  }, {
	    key: "onPanStart",
	    value: function onPanStart(e) {
	      // Only allow panning if zoomed in or doing a horizontal pan.
	      // This ensures vertical scrolling works for scrollable page spreads.
	      if (this.transform.scale > 1 || e.direction === hammer.DIRECTION_LEFT || e.direction === hammer.DIRECTION_RIGHT) {
	        var x = e.center.x;
	        var edgeThreshold = 30;
	        var width = this.scrollerEl.offsetWidth; // Prevent panning when edge-swiping on iOS.

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
	      var x;

	      if (this.pinching === true || this.panning === false) {
	        return;
	      }

	      if (this.transform.scale > 1) {
	        var activePageSpread = this.getActivePageSpread();
	        var carouselOffset = activePageSpread.getLeft();
	        var carouselScaledOffset = carouselOffset * this.transform.scale;
	        var pageSpreadBounds = this.getPageSpreadBounds(activePageSpread);
	        var scale = this.transform.scale;
	        x = this.startTransform.left + carouselScaledOffset + e.deltaX / this.scrollerEl.offsetWidth * 100;
	        var y = this.startTransform.top + e.deltaY / this.scrollerEl.offsetHeight * 100;
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
	      if (this.panning === false) {
	        return;
	      }

	      this.panning = false;
	      this.trigger('panEnd');

	      if (this.transform.scale === 1 && this.pinching === false) {
	        var position = this.getPosition();
	        var velocity = e.overallVelocityX;

	        if (Math.abs(velocity) >= this.swipeVelocity) {
	          if (Math.abs(e.deltaX) >= this.swipeThreshold) {
	            if (e.offsetDirection === hammer.DIRECTION_LEFT) {
	              this.next({
	                velocity: velocity,
	                duration: this.navigationPanDuration
	              });
	            } else if (e.offsetDirection === hammer.DIRECTION_RIGHT) {
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
	    value: function onPinchStart() {
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
	      var _this3 = this;

	      if (this.pinching === false) {
	        return;
	      }

	      var activePageSpread = this.getActivePageSpread();
	      var maxZoomScale = activePageSpread.getMaxZoomScale();
	      var scale = Math.max(1, Math.min(this.transform.scale, maxZoomScale));
	      var position = this.getPosition();

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
	        _this3.pinching = false;

	        _this3.el.setAttribute('data-pinching', false);
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
	      var _this4 = this;

	      var position, scale;
	      var activePageSpread = this.getActivePageSpread();

	      if (activePageSpread.isZoomable() === false) {
	        return;
	      } // see https://stackoverflow.com/a/23668035


	      var deltaY = e.deltaY;

	      if (event.webkitDirectionInvertedFromDevice) {
	        deltaY = -deltaY;
	      }

	      if (deltaY > 0 && this.transform.scale === 1) {
	        scale = activePageSpread.getMaxZoomScale();
	        position = this.getPosition();
	        this.zoomTo({
	          x: e.clientX,
	          y: e.clientY,
	          scale: scale,
	          duration: this.zoomDuration
	        }, function () {
	          _this4.trigger('zoomedIn', {
	            position: position
	          });
	        });
	      } else if (deltaY < 0 && this.transform.scale > 1) {
	        position = this.getPosition();
	        this.zoomTo({
	          x: e.clientX,
	          y: e.clientY,
	          scale: 1,
	          duration: this.zoomDuration
	        }, function () {
	          _this4.trigger('zoomedOut', {
	            position: position
	          });
	        });
	      }
	    }
	  }, {
	    key: "onSingletap",
	    value: function onSingletap(e) {
	      var _this5 = this;

	      var activePageSpread = this.getActivePageSpread();
	      var coordinateInfo = this.getCoordinateInfo(e.center.x, e.center.y, activePageSpread);
	      clearTimeout(this.tap.timeout);

	      if (this.tap.count === 1) {
	        this.tap.count = 0;
	        this.trigger('doubleClicked', coordinateInfo);

	        if (activePageSpread.isZoomable()) {
	          var maxZoomScale = activePageSpread.getMaxZoomScale();
	          var zoomedIn = this.transform.scale > 1;
	          var scale = zoomedIn ? 1 : maxZoomScale;
	          var zoomEvent = zoomedIn ? 'zoomedOut' : 'zoomedIn';
	          var position = this.getPosition();
	          this.zoomTo({
	            x: e.center.x,
	            y: e.center.y,
	            scale: scale,
	            duration: this.zoomDuration
	          }, function () {
	            _this5.trigger(zoomEvent, {
	              position: position
	            });
	          });
	        }
	      } else {
	        this.tap.count++;
	        this.tap.timeout = setTimeout$1(function () {
	          _this5.tap.count = 0;

	          _this5.trigger('clicked', coordinateInfo);
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
	      if (this.transform.scale > 1) {
	        var position = this.getPosition();
	        var activePageSpread = this.getActivePageSpread();
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

	function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var PagedPublicationPageSpread = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationPageSpread, _MicroEvent);

	  var _super = _createSuper$5(PagedPublicationPageSpread);

	  function PagedPublicationPageSpread() {
	    var _this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, PagedPublicationPageSpread);

	    _this = _super.call(this);
	    _this.options = options;
	    _this.contentsRendered = false;
	    _this.hotspotsRendered = false;
	    _this.el = _this.renderEl();
	    return _this;
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
	      var _context;

	      var el = document.createElement('div');

	      var pageIds = map(_context = this.getPages()).call(_context, function (page) {
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
	      var _this2 = this;

	      var id = this.getId();
	      var el = this.getEl();
	      var pages = this.getPages();
	      var pageCount = pages.length;
	      var imageLoads = 0;
	      var maxPageWidth = el.clientWidth * (window.devicePixelRatio || 1);

	      if (this.options.pageMode === 'double') {
	        maxPageWidth = maxPageWidth / 2;
	      }

	      var useLargeImage = maxPageWidth > 700;

	      forEach(pages).call(pages, function (page, i) {
	        var image = page.images.medium;

	        if (useLargeImage) {
	          image = page.images.large;
	        }

	        var pageEl = document.createElement('div');
	        var loaderEl = document.createElement('div');
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
	        loadImage(image, function (err, width, height) {
	          if (err == null) {
	            var isComplete = ++imageLoads === pageCount;
	            pageEl.style.backgroundImage = "url(".concat(image, ")");
	            pageEl.setAttribute('data-width', width);
	            pageEl.setAttribute('data-height', height);
	            pageEl.innerHTML = '&nbsp;';

	            if (isComplete) {
	              el.setAttribute('data-zoomable', true);
	            }

	            _this2.trigger('pageLoaded', {
	              pageSpreadId: id,
	              page: page
	            });

	            if (isComplete) {
	              _this2.trigger('pagesLoaded', {
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
	    value: function clearContents() {
	      this.el.innerHTML = '';
	      this.contentsRendered = false;
	      return this;
	    }
	  }, {
	    key: "zoomIn",
	    value: function zoomIn() {
	      var _this3 = this;

	      var pageEls = slice$2([]).call(this.el.querySelectorAll('.sgn-pp__page'));

	      var pages = this.getPages();

	      forEach(pageEls).call(pageEls, function (pageEl) {
	        var id = pageEl.getAttribute('data-id');

	        var page = find(pages).call(pages, function (page) {
	          return page.id === id;
	        });

	        var image = page.images.large;
	        loadImage(image, function (err) {
	          if (err == null && _this3.el.getAttribute('data-active') === 'true') {
	            pageEl.setAttribute('data-image', pageEl.style.backgroundImage);
	            pageEl.style.backgroundImage = "url(".concat(image, ")");
	          }
	        });
	      });
	    }
	  }, {
	    key: "zoomOut",
	    value: function zoomOut() {
	      var pageEls = from(this.el.querySelectorAll('.sgn-pp__page[data-image]'));

	      forEach(pageEls).call(pageEls, function (pageEl) {
	        pageEl.style.backgroundImage = pageEl.getAttribute('data-image');
	        pageEl.removeAttribute('data-image');
	      });
	    }
	  }]);

	  return PagedPublicationPageSpread;
	}(microevent);

	function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var PagedPublicationPageSpreads = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationPageSpreads, _MicroEvent);

	  var _super = _createSuper$4(PagedPublicationPageSpreads);

	  function PagedPublicationPageSpreads(options) {
	    var _this;

	    _classCallCheck(this, PagedPublicationPageSpreads);

	    _this = _super.call(this);
	    _this.options = options;
	    _this.collection = [];
	    _this.ids = {};
	    return _this;
	  }

	  _createClass(PagedPublicationPageSpreads, [{
	    key: "get",
	    value: function get(id) {
	      return this.ids[id];
	    }
	  }, {
	    key: "getFrag",
	    value: function getFrag() {
	      var _context;

	      var frag = document.createDocumentFragment();

	      forEach(_context = this.collection).call(_context, function (pageSpread) {
	        return frag.appendChild(pageSpread.el);
	      });

	      return frag;
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      var _context2,
	          _this2 = this;

	      var pageMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'single';
	      var pageSpreads = [];
	      var ids = {};

	      var pages = slice$2(_context2 = this.options.pages).call(_context2);

	      var _this$options = this.options,
	          width = _this$options.width,
	          maxZoomScale = _this$options.maxZoomScale;

	      if (pageMode === 'single') {
	        forEach(pages).call(pages, function (page) {
	          return pageSpreads.push([page]);
	        });
	      } else {
	        var firstPage = pages.shift();
	        var lastPage = pages.length % 2 === 1 ? pages.pop() : null;
	        var midstPageSpreads = chunk(pages, 2);

	        if (firstPage) {
	          pageSpreads.push([firstPage]);
	        }

	        forEach(midstPageSpreads).call(midstPageSpreads, function (midstPages) {
	          return pageSpreads.push(map(midstPages).call(midstPages, function (page) {
	            return page;
	          }));
	        });

	        if (lastPage) {
	          pageSpreads.push([lastPage]);
	        }
	      }

	      this.collection = map(pageSpreads).call(pageSpreads, function (pages, i) {
	        var _context3;

	        var id = concat(_context3 = "".concat(pageMode, "-")).call(_context3, i);

	        var pageSpread = new PagedPublicationPageSpread({
	          width: width,
	          pageMode: pageMode,
	          maxZoomScale: maxZoomScale,
	          pages: pages,
	          id: id
	        });

	        bind$2(pageSpread).call(pageSpread, 'pageLoaded', function (e) {
	          return _this2.trigger('pageLoaded', e);
	        });

	        bind$2(pageSpread).call(pageSpread, 'pagesLoaded', function (e) {
	          return _this2.trigger('pagesLoaded', e);
	        });

	        ids[id] = pageSpread;
	        return pageSpread;
	      });
	      this.ids = ids;
	      return this;
	    }
	  }]);

	  return PagedPublicationPageSpreads;
	}(microevent);

	function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var PagedPublicationCore = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationCore, _MicroEvent);

	  var _super = _createSuper$3(PagedPublicationCore);

	  function PagedPublicationCore(el) {
	    var _context, _context2, _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _context15, _context16, _context17, _context18, _context19;

	    var _this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, PagedPublicationCore);

	    _this = _super.call(this);
	    _this.beforeNavigation = bind$2(_context = _this.beforeNavigation).call(_context, _assertThisInitialized(_this));
	    _this.afterNavigation = bind$2(_context2 = _this.afterNavigation).call(_context2, _assertThisInitialized(_this));
	    _this.attemptedNavigation = bind$2(_context3 = _this.attemptedNavigation).call(_context3, _assertThisInitialized(_this));
	    _this.clicked = bind$2(_context4 = _this.clicked).call(_context4, _assertThisInitialized(_this));
	    _this.doubleClicked = bind$2(_context5 = _this.doubleClicked).call(_context5, _assertThisInitialized(_this));
	    _this.pressed = bind$2(_context6 = _this.pressed).call(_context6, _assertThisInitialized(_this));
	    _this.contextmenu = bind$2(_context7 = _this.contextmenu).call(_context7, _assertThisInitialized(_this));
	    _this.panStart = bind$2(_context8 = _this.panStart).call(_context8, _assertThisInitialized(_this));
	    _this.panEnd = bind$2(_context9 = _this.panEnd).call(_context9, _assertThisInitialized(_this));
	    _this.zoomedIn = bind$2(_context10 = _this.zoomedIn).call(_context10, _assertThisInitialized(_this));
	    _this.zoomedOut = bind$2(_context11 = _this.zoomedOut).call(_context11, _assertThisInitialized(_this));
	    _this.resize = bind$2(_context12 = _this.resize).call(_context12, _assertThisInitialized(_this));
	    _this.unload = bind$2(_context13 = _this.unload).call(_context13, _assertThisInitialized(_this));
	    _this.options = _this.makeOptions(options, _this.defaults);
	    _this.pageId = _this.getOption('pageId');
	    _this.els = {
	      root: el,
	      pages: el.querySelector('.sgn-pp__pages'),
	      verso: el.querySelector('.verso')
	    };
	    _this.pageMode = _this.getPageMode();
	    _this.pageSpreads = new PagedPublicationPageSpreads({
	      pages: _this.getOption('pages'),
	      maxZoomScale: _this.getOption('pageSpreadMaxZoomScale'),
	      width: _this.getOption('pageSpreadWidth')
	    });

	    bind$2(_context14 = _this.pageSpreads).call(_context14, 'pageLoaded', bind$2(_context15 = _this.pageLoaded).call(_context15, _assertThisInitialized(_this)));

	    bind$2(_context16 = _this.pageSpreads).call(_context16, 'pagesLoaded', bind$2(_context17 = _this.pagesLoaded).call(_context17, _assertThisInitialized(_this)));

	    _this.setColor(_this.getOption('color')); // It's important to insert the page spreads before instantiating Verso.


	    _this.els.pages.parentNode.insertBefore(_this.pageSpreads.update(_this.pageMode).getFrag(), _this.els.pages);

	    _this.verso = _this.createVerso();

	    bind$2(_this).call(_this, 'started', bind$2(_context18 = _this.start).call(_context18, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'destroyed', bind$2(_context19 = _this.destroy).call(_context19, _assertThisInitialized(_this)));

	    return _this;
	  }

	  _createClass(PagedPublicationCore, [{
	    key: "start",
	    value: function start() {
	      var _context20, _context21;

	      var verso = this.getVerso();
	      verso.start();

	      forEach(_context20 = verso.pageSpreads).call(_context20, bind$2(_context21 = this.overridePageSpreadContentRect).call(_context21, this));

	      this.resizeListener = throttle(this.resize, this.getOption('resizeDelay'));
	      window.addEventListener('resize', this.resizeListener, false);
	      window.addEventListener('beforeunload', this.unload, false);
	      this.els.root.setAttribute('data-started', '');
	      this.els.root.setAttribute('tabindex', '-1');
	      this.els.root.focus();
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var _context22;

	      var verso = this.getVerso();
	      var pageSpreadEls = verso.el.querySelectorAll('.sgn-pp__page-spread');
	      this.els.root.removeAttribute('data-started');
	      this.els.root.removeAttribute('data-idle');
	      this.els.root.removeAttribute('data-navigating');
	      this.els.root.removeAttribute('data-color-brightness');
	      this.els.root.removeAttribute('data-zoomed-in');
	      this.els.root.style.backgroundColor = '#ffffff';

	      forEach(_context22 = from(pageSpreadEls)).call(_context22, function (pageSpreadEl) {
	        pageSpreadEl.parentNode.removeChild(pageSpreadEl);
	      });

	      verso.destroy();
	      window.removeEventListener('resize', this.resizeListener, false);
	      window.removeEventListener('beforeunload', this.unload, false);
	    }
	  }, {
	    key: "makeOptions",
	    value: function makeOptions(options, defaults) {
	      var opts = {};

	      for (var key in options) {
	        var _options$key;

	        opts[key] = (_options$key = options[key]) !== null && _options$key !== void 0 ? _options$key : defaults[key];
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
	      this.els.root.setAttribute('data-color-brightness', getColorBrightness(color));
	      this.els.root.style.backgroundColor = color;
	    }
	  }, {
	    key: "createVerso",
	    value: function createVerso() {
	      var verso = new Verso(this.els.verso, {
	        pageId: this.pageId
	      });

	      bind$2(verso).call(verso, 'beforeNavigation', this.beforeNavigation);

	      bind$2(verso).call(verso, 'afterNavigation', this.afterNavigation);

	      bind$2(verso).call(verso, 'attemptedNavigation', this.attemptedNavigation);

	      bind$2(verso).call(verso, 'clicked', this.clicked);

	      bind$2(verso).call(verso, 'doubleClicked', this.doubleClicked);

	      bind$2(verso).call(verso, 'pressed', this.pressed);

	      bind$2(verso).call(verso, 'contextmenu', this.contextmenu);

	      bind$2(verso).call(verso, 'panStart', this.panStart);

	      bind$2(verso).call(verso, 'panEnd', this.panEnd);

	      bind$2(verso).call(verso, 'zoomedIn', this.zoomedIn);

	      bind$2(verso).call(verso, 'zoomedOut', this.zoomedOut);

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
	      var rect = {
	        top: 0,
	        left: 0,
	        right: 0,
	        bottom: 0,
	        width: 0,
	        height: 0
	      };
	      var pageEls = pageSpread.getPageEls();
	      var pageEl = pageEls[0];
	      var pageCount = pageEls.length;

	      if (!pageCount) {
	        return rect;
	      }

	      var scale = this.getVerso().transform.scale;
	      var pageWidth = pageEl.offsetWidth * pageCount * scale;
	      var pageHeight = pageEl.offsetHeight * scale;
	      var imageRatio = +pageEl.getAttribute('data-height') / (+pageEl.getAttribute('data-width') * pageCount);
	      var actualHeight = pageHeight;
	      var actualWidth = actualHeight / imageRatio;
	      actualWidth = Math.min(pageWidth, actualWidth);
	      actualHeight = actualWidth * imageRatio;
	      var clientRect = pageEl.getBoundingClientRect();
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
	      var _pageSpread$options$p;

	      var pages = (_pageSpread$options$p = pageSpread === null || pageSpread === void 0 ? void 0 : pageSpread.options.pages) !== null && _pageSpread$options$p !== void 0 ? _pageSpread$options$p : [];

	      var pageIds = map(pages).call(pages, function (page) {
	        return page.id;
	      });

	      var pageLabels = map(pages).call(pages, function (page) {
	        return page.label;
	      });

	      var pageCount = this.getOption('pages').length;
	      var label = pageIds.length > 0 ? pageLabels.join('-') + ' / ' + pageCount : null;
	      return label;
	    }
	  }, {
	    key: "renderPageSpreads",
	    value: function renderPageSpreads() {
	      var _context23,
	          _this2 = this;

	      forEach(_context23 = this.getVerso().pageSpreads).call(_context23, function (pageSpread) {
	        var visibility = pageSpread.getVisibility();

	        var match = _this2.pageSpreads.get(pageSpread.getId());

	        if (match) {
	          if (visibility === 'visible' && match.contentsRendered === false) {
	            var _context24;

	            setTimeout$1(bind$2(_context24 = match.renderContents).call(_context24, match), 0);
	          }

	          if (visibility === 'gone' && match.contentsRendered === true) {
	            var _context25;

	            setTimeout$1(bind$2(_context25 = match.clearContents).call(_context25, match), 0);
	          }
	        }
	      });

	      return this;
	    }
	  }, {
	    key: "findPage",
	    value: function findPage(pageId) {
	      var _context26;

	      return find(_context26 = this.getOption('pages')).call(_context26, function (page) {
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
	      var position = e.newPosition;
	      var theVerso = this.getVerso();
	      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);
	      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
	      var pageSpreadCount = theVerso.getPageSpreadCount();
	      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
	      var progress = position / (pageSpreadCount - 1) * 100;
	      var progressLabel = this.formatProgressLabel(pageSpread);
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
	      var position = e.newPosition;
	      var theVerso = this.getVerso();
	      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);
	      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
	      var pageSpreadCount = theVerso.getPageSpreadCount();
	      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
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
	      if (e.isInsideContent) {
	        var pageId = e.pageEl.getAttribute('data-id');
	        var page = this.findPage(pageId);
	        this.trigger('clicked', {
	          verso: e,
	          page: page
	        });
	      }
	    }
	  }, {
	    key: "doubleClicked",
	    value: function doubleClicked(e) {
	      if (e.isInsideContent) {
	        var pageId = e.pageEl.getAttribute('data-id');
	        var page = this.findPage(pageId);
	        this.trigger('doubleClicked', {
	          verso: e,
	          page: page
	        });
	      }
	    }
	  }, {
	    key: "pressed",
	    value: function pressed(e) {
	      if (e.isInsideContent) {
	        var pageId = e.pageEl.getAttribute('data-id');
	        var page = this.findPage(pageId);
	        this.trigger('pressed', {
	          verso: e,
	          page: page
	        });
	      }
	    }
	  }, {
	    key: "contextmenu",
	    value: function contextmenu(e) {
	      if (e.isInsideContent) {
	        var pageId = e.pageEl.getAttribute('data-id');
	        var page = this.findPage(pageId);
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
	      var position = e.position;
	      var versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
	      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
	      pageSpread === null || pageSpread === void 0 ? void 0 : pageSpread.zoomIn();
	      this.els.root.setAttribute('data-zoomed-in', true);
	      this.trigger('zoomedIn', {
	        verso: e,
	        pageSpread: pageSpread
	      });
	    }
	  }, {
	    key: "zoomedOut",
	    value: function zoomedOut(e) {
	      var position = e.position;
	      var versoPageSpread = this.getVerso().getPageSpreadFromPosition(position);
	      var pageSpread = this.pageSpreads.get(versoPageSpread.getId());
	      pageSpread === null || pageSpread === void 0 ? void 0 : pageSpread.zoomOut();
	      this.els.root.setAttribute('data-zoomed-in', false);
	      this.trigger('zoomedOut', {
	        verso: e,
	        pageSpread: pageSpread
	      });
	    }
	  }, {
	    key: "getPageMode",
	    value: function getPageMode() {
	      var pageMode = this.getOption('pageMode');

	      if (pageMode == null) {
	        var width = this.els.root.offsetWidth;
	        var height = this.els.root.offsetHeight;
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
	      var _this3 = this;

	      this.idleTimeout = setTimeout$1(function () {
	        _this3.els.root.setAttribute('data-idle', true);
	      }, this.getOption('idleDelay'));
	      return this;
	    }
	  }, {
	    key: "switchPageMode",
	    value: function switchPageMode(pageMode) {
	      var _context27, _context28, _context29;

	      if (this.pageMode === pageMode) {
	        return this;
	      }

	      var verso = this.getVerso();
	      var pageIds = verso.getPageSpreadFromPosition(verso.getPosition()).getPageIds();
	      var pageSpreadEls = this.getVerso().el.querySelectorAll('.sgn-pp__page-spread');
	      this.pageMode = pageMode;
	      this.pageSpreads.update(this.pageMode);

	      forEach(_context27 = from(pageSpreadEls)).call(_context27, function (pageSpreadEl) {
	        pageSpreadEl.parentNode.removeChild(pageSpreadEl);
	      });

	      this.els.pages.parentNode.insertBefore(this.pageSpreads.getFrag(), this.els.pages);
	      verso.refresh();
	      verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0]), {
	        duration: 0
	      });

	      forEach(_context28 = verso.pageSpreads).call(_context28, bind$2(_context29 = this.overridePageSpreadContentRect).call(_context29, this));

	      return this;
	    }
	  }, {
	    key: "overridePageSpreadContentRect",
	    value: function overridePageSpreadContentRect(pageSpread) {
	      var _this4 = this;

	      if (pageSpread.getType() === 'page') {
	        return pageSpread.getContentRect = function () {
	          return _this4.getContentRect(pageSpread);
	        };
	      }
	    }
	  }, {
	    key: "resize",
	    value: function resize() {
	      var pageMode = this.getPageMode();

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
	}(microevent);

	PagedPublicationCore.prototype.defaults = {
	  pages: [],
	  pageSpreadWidth: 100,
	  pageSpreadMaxZoomScale: 2.3,
	  idleDelay: 1000,
	  resizeDelay: 400,
	  color: '#ffffff'
	};

	function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var PagedPublicationEventTracking = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationEventTracking, _MicroEvent);

	  var _super = _createSuper$2(PagedPublicationEventTracking);

	  function PagedPublicationEventTracking(eventTracker, id) {
	    var _context, _context2, _context3, _context4, _context5, _context6, _context7;

	    var _this;

	    _classCallCheck(this, PagedPublicationEventTracking);

	    _this = _super.call(this);
	    _this.eventTracker = eventTracker;
	    _this.id = id;
	    _this.hidden = true;
	    _this.pageSpread = null;

	    bind$2(_this).call(_this, 'appeared', bind$2(_context = _this.appeared).call(_context, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'disappeared', bind$2(_context2 = _this.disappeared).call(_context2, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'beforeNavigation', bind$2(_context3 = _this.beforeNavigation).call(_context3, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'afterNavigation', bind$2(_context4 = _this.afterNavigation).call(_context4, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'attemptedNavigation', bind$2(_context5 = _this.attemptedNavigation).call(_context5, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'panStart', bind$2(_context6 = _this.panStart).call(_context6, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'destroyed', bind$2(_context7 = _this.destroy).call(_context7, _assertThisInitialized(_this)));

	    return _this;
	  }

	  _createClass(PagedPublicationEventTracking, [{
	    key: "destroy",
	    value: function destroy() {
	      this.pageSpreadDisappeared();
	    }
	  }, {
	    key: "trackOpened",
	    value: function trackOpened() {
	      if (this.eventTracker == null) {
	        return this;
	      }

	      this.eventTracker.trackPagedPublicationOpened({
	        'pp.id': this.id,
	        vt: this.eventTracker.createViewToken(this.id)
	      });
	      return this;
	    }
	  }, {
	    key: "trackPageSpreadDisappeared",
	    value: function trackPageSpreadDisappeared(pageNumbers) {
	      var _this2 = this;

	      if (this.eventTracker == null) {
	        return this;
	      }

	      forEach(pageNumbers).call(pageNumbers, function (pageNumber) {
	        _this2.eventTracker.trackPagedPublicationPageDisappeared({
	          'pp.id': _this2.id,
	          'ppp.n': pageNumber,
	          vt: _this2.eventTracker.createViewToken(_this2.id, pageNumber)
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
	      if (pageSpread && this.hidden === true) {
	        this.pageSpread = pageSpread;
	        this.hidden = false;
	      }
	    }
	  }, {
	    key: "pageSpreadDisappeared",
	    value: function pageSpreadDisappeared() {
	      if (this.pageSpread && this.hidden === false) {
	        var _context8;

	        this.trackPageSpreadDisappeared(map(_context8 = this.pageSpread.getPages()).call(_context8, function (page) {
	          return page.pageNumber;
	        }));
	        this.hidden = true;
	        this.pageSpread = null;
	      }
	    }
	  }]);

	  return PagedPublicationEventTracking;
	}(microevent);

	function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var PagedPublicationHotspots = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationHotspots, _MicroEvent);

	  var _super = _createSuper$1(PagedPublicationHotspots);

	  function PagedPublicationHotspots() {
	    var _context, _context2, _context3, _context4;

	    var _this;

	    _classCallCheck(this, PagedPublicationHotspots);

	    _this = _super.call(this);
	    _this.currentPageSpreadId = null;
	    _this.pageSpreadsLoaded = {};
	    _this.cache = {};

	    bind$2(_this).call(_this, 'hotspotsReceived', bind$2(_context = _this.hotspotsReceived).call(_context, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'afterNavigation', bind$2(_context2 = _this.afterNavigation).call(_context2, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'pagesLoaded', bind$2(_context3 = _this.pagesLoaded).call(_context3, _assertThisInitialized(_this)));

	    bind$2(_this).call(_this, 'resized', bind$2(_context4 = _this.resized).call(_context4, _assertThisInitialized(_this)));

	    return _this;
	  }

	  _createClass(PagedPublicationHotspots, [{
	    key: "renderHotspots",
	    value: function renderHotspots(data) {
	      var _context5;

	      var frag = document.createDocumentFragment();
	      var contentRect = data.versoPageSpread.getContentRect();
	      var pageSpreadEl = data.pageSpread.getEl();
	      var hotspotEls = pageSpreadEl.querySelectorAll('.sgn-pp__hotspot');
	      var boundingRect = pageSpreadEl.getBoundingClientRect();

	      forEach(_context5 = from(hotspotEls)).call(_context5, function (hotspotEl) {
	        hotspotEl.parentNode.removeChild(hotspotEl);
	      });

	      for (var id in data.hotspots) {
	        var hotspot = data.hotspots[id];
	        var position = this.getPosition(data.pages, data.ratio, hotspot);
	        var el = this.renderHotspot(hotspot, position, contentRect, boundingRect);
	        frag.appendChild(el);
	      }

	      pageSpreadEl.appendChild(frag);
	      return this;
	    }
	  }, {
	    key: "renderHotspot",
	    value: function renderHotspot(hotspot, position, contentRect, boundingRect) {
	      var el = document.createElement('div');
	      var top = Math.round(contentRect.height / 100 * position.top);
	      var left = Math.round(contentRect.width / 100 * position.left);
	      var width = Math.round(contentRect.width / 100 * position.width);
	      var height = Math.round(contentRect.height / 100 * position.height);
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

	      el.innerHTML = mustache.render('', hotspot);
	      el.style.top = "".concat(top, "px");
	      el.style.left = "".concat(left, "px");
	      el.style.width = "".concat(width, "px");
	      el.style.height = "".concat(height, "px");
	      return el;
	    }
	  }, {
	    key: "getPosition",
	    value: function getPosition(pages, ratio, hotspot) {
	      var minX = null;
	      var minY = null;
	      var maxX = null;
	      var maxY = null;

	      var pageNumbers = map(pages).call(pages, function (page) {
	        return page.pageNumber;
	      });

	      for (var pageNumber in hotspot.locations) {
	        var _context6;

	        if (indexOf(pageNumbers).call(pageNumbers, +pageNumber) === -1) {
	          continue;
	        }

	        forEach(_context6 = hotspot.locations[pageNumber]).call(_context6, function (coords) {
	          var _coords = _slicedToArray(coords, 2),
	              x = _coords[0],
	              y = _coords[1];

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

	      var width = maxX - minX;
	      var height = maxY - minY;
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
	      var pageSpreadId = e.pageSpread.getId();
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
	      if (e.pageSpread == null) {
	        return;
	      }

	      var id = e.pageSpread.getId();
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
	    value: function resized() {
	      var data = this.getCache(this.currentPageSpreadId);

	      if (data) {
	        this.renderHotspots(data);
	      }
	    }
	  }]);

	  return PagedPublicationHotspots;
	}(microevent);

	function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof symbol === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$2(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray(o, minLen) { var _context36; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = slice$2(_context36 = Object.prototype.toString.call(o)).call(_context36, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	function defaultPickHotspot(hotspots, e, el, callback) {
	  var _context;

	  var popover = singleChoicePopover({
	    el: el,
	    header: t('paged_publication.hotspot_picker.header'),
	    x: e.verso.x,
	    y: e.verso.y,
	    items: map(_context = filter(hotspots).call(hotspots, function (hotspot) {
	      return hotspot.type === 'offer';
	    })).call(_context, function (hotspot) {
	      return {
	        id: hotspot.id,
	        title: hotspot.offer.heading,
	        subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price
	      };
	    })
	  }, function (picked) {
	    return callback(find(hotspots).call(hotspots, function (hotspot) {
	      return hotspot.id === picked.id;
	    }));
	  });
	  return popover.destroy;
	}

	var Viewer = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Viewer, _MicroEvent);

	  var _super = _createSuper(Viewer);

	  function Viewer(el) {
	    var _this;

	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Viewer);

	    _this = _super.call(this);
	    _this.el = el;
	    _this.options = options;
	    _this._core = new PagedPublicationCore(_this.el, {
	      id: _this.options.id,
	      pages: _this.options.pages,
	      pageSpreadWidth: _this.options.pageSpreadWidth,
	      pageSpreadMaxZoomScale: _this.options.pageSpreadMaxZoomScale,
	      pageId: _this.options.pageId,
	      idleDelay: _this.options.idleDelay,
	      resizeDelay: _this.options.resizeDelay,
	      color: _this.options.color
	    });
	    _this._hotspots = new PagedPublicationHotspots();
	    _this._controls = new PagedPublicationControls(_this.el, {
	      keyboard: _this.options.keyboard
	    });
	    _this._eventTracking = new PagedPublicationEventTracking(_this.options.eventTracker, _this.options.id);
	    _this.hotspots = null;
	    _this.hotspotQueue = [];
	    _this.popover = null;

	    _this._setupEventListeners();

	    return _this;
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
	      var position = this._core.getVerso().getPageSpreadPositionFromPageId(pageId);

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
	      var _context2,
	          _this2 = this,
	          _context3,
	          _context4,
	          _context5,
	          _context6,
	          _context7,
	          _context8,
	          _context9,
	          _context10,
	          _context11,
	          _context12,
	          _context13,
	          _context14,
	          _context15,
	          _context16,
	          _context17,
	          _context18,
	          _context19,
	          _context20,
	          _context21,
	          _context22,
	          _context23,
	          _context24,
	          _context25,
	          _context26,
	          _context27,
	          _context28,
	          _context29,
	          _context30,
	          _context31,
	          _context32;

	      bind$2(_context2 = this._controls).call(_context2, 'prev', function (e) {
	        _this2.prev(e);
	      });

	      bind$2(_context3 = this._controls).call(_context3, 'next', function (e) {
	        _this2.next(e);
	      });

	      bind$2(_context4 = this._controls).call(_context4, 'first', function (e) {
	        _this2.first(e);
	      });

	      bind$2(_context5 = this._controls).call(_context5, 'last', function (e) {
	        _this2.last(e);
	      });

	      bind$2(_context6 = this._controls).call(_context6, 'close', function (e) {
	        _this2.destroy(e);
	      });

	      bind$2(_context7 = this._hotspots).call(_context7, 'hotspotsRequested', function (e) {
	        _this2.trigger('hotspotsRequested', e);
	      });

	      bind$2(_context8 = this._core).call(_context8, 'appeared', function (e) {
	        _this2._eventTracking.trigger('appeared', e);

	        _this2.trigger('appeared', e);
	      });

	      bind$2(_context9 = this._core).call(_context9, 'disappeared', function (e) {
	        _this2._eventTracking.trigger('disappeared', e);

	        _this2.trigger('disappeared', e);
	      });

	      bind$2(_context10 = this._core).call(_context10, 'beforeNavigation', function (e) {
	        _this2._eventTracking.trigger('beforeNavigation', e);

	        _this2._controls.trigger('beforeNavigation', e);

	        _this2.trigger('beforeNavigation', e);
	      });

	      bind$2(_context11 = this._core).call(_context11, 'afterNavigation', function (e) {
	        _this2._eventTracking.trigger('afterNavigation', e);

	        _this2._hotspots.trigger('afterNavigation', e);

	        _this2.trigger('afterNavigation', e);
	      });

	      bind$2(_context12 = this._core).call(_context12, 'attemptedNavigation', function (e) {
	        _this2._eventTracking.trigger('attemptedNavigation', e);

	        _this2.trigger('attemptedNavigation', e);
	      });

	      bind$2(_context13 = this._core).call(_context13, 'clicked', function (e) {
	        _this2._eventTracking.trigger('clicked', e);

	        _this2.trigger('clicked', e);
	      });

	      bind$2(_context14 = this._core).call(_context14, 'doubleClicked', function (e) {
	        _this2._eventTracking.trigger('doubleClicked', e);

	        _this2.trigger('doubleClicked', e);
	      });

	      bind$2(_context15 = this._core).call(_context15, 'contextmenu', function (e) {
	        _this2.trigger('contextmenu', e);
	      });

	      bind$2(_context16 = this._core).call(_context16, 'pressed', function (e) {
	        _this2._eventTracking.trigger('pressed', e);

	        _this2.trigger('pressed', e);
	      });

	      bind$2(_context17 = this._core).call(_context17, 'panStart', function (e) {
	        _this2._eventTracking.trigger('panStart', e);

	        _this2.trigger('panStart', e);
	      });

	      bind$2(_context18 = this._core).call(_context18, 'zoomedIn', function (e) {
	        _this2._eventTracking.trigger('zoomedIn', e);

	        _this2.trigger('zoomedIn', e);
	      });

	      bind$2(_context19 = this._core).call(_context19, 'zoomedOut', function (e) {
	        _this2._eventTracking.trigger('zoomedOut', e);

	        _this2.trigger('zoomedOut', e);
	      });

	      bind$2(_context20 = this._core).call(_context20, 'pageLoaded', function (e) {
	        _this2._eventTracking.trigger('pageLoaded', e);

	        _this2.trigger('pageLoaded', e);
	      });

	      bind$2(_context21 = this._core).call(_context21, 'pagesLoaded', function (e) {
	        _this2._hotspots.trigger('pagesLoaded', e);

	        _this2.trigger('pagesLoaded', e);
	      });

	      bind$2(_context22 = this._core).call(_context22, 'resized', function (e) {
	        _this2._hotspots.trigger('resized');

	        _this2.trigger('resized', e);
	      });

	      bind$2(_context23 = this).call(_context23, 'hotspotsRequested', bind$2(_context24 = this.hotspotsRequested).call(_context24, this));

	      bind$2(_context25 = this).call(_context25, 'beforeNavigation', bind$2(_context26 = this.beforeNavigation).call(_context26, this));

	      bind$2(_context27 = this).call(_context27, 'clicked', bind$2(_context28 = this.clicked).call(_context28, this));

	      bind$2(_context29 = this).call(_context29, 'contextmenu', bind$2(_context30 = this.contextmenu).call(_context30, this));

	      bind$2(_context31 = this).call(_context31, 'pressed', bind$2(_context32 = this.pressed).call(_context32, this));
	    }
	  }, {
	    key: "pickHotspot",
	    value: function pickHotspot(e, callback) {
	      var _context33,
	          _this3 = this;

	      if (this.hotspots == null) {
	        return;
	      }

	      if (this.popover != null) {
	        var _this$popover$destroy, _this$popover;

	        (_this$popover$destroy = (_this$popover = this.popover).destroy) === null || _this$popover$destroy === void 0 ? void 0 : _this$popover$destroy.call(_this$popover);
	        this.popover = null;
	      }

	      var hotspots = map(_context33 = e.verso.overlayEls).call(_context33, function (overlayEl) {
	        return _this3.hotspots[overlayEl.getAttribute('data-id')];
	      });

	      if (hotspots.length === 1) {
	        callback(hotspots[0]);
	      } else if (hotspots.length > 1) {
	        this.popover = {
	          destroy: (this.options.pickHotspot || defaultPickHotspot)(hotspots, e, this.el, callback)
	        };
	      }
	    }
	  }, {
	    key: "processHotspotQueue",
	    value: function processHotspotQueue() {
	      var _context34,
	          _this4 = this;

	      if (this.hotspots == null) {
	        return;
	      }

	      this.hotspotQueue = filter(_context34 = this.hotspotQueue).call(_context34, function (hotspotRequest) {
	        var _context35;

	        var id;
	        var hotspots = {};

	        var versoPageSpread = find(_context35 = _this4._core.getVerso().pageSpreads).call(_context35, function (pageSpread) {
	          return pageSpread.getId() === hotspotRequest.id;
	        });

	        for (id in _this4.hotspots) {
	          var hotspot = _this4.hotspots[id];

	          if (hotspots[id]) {
	            continue;
	          }

	          var _iterator = _createForOfIteratorHelper(hotspotRequest.pages),
	              _step;

	          try {
	            for (_iterator.s(); !(_step = _iterator.n()).done;) {
	              var page = _step.value;

	              if (hotspot.locations[page.pageNumber]) {
	                hotspots[id] = {
	                  type: hotspot.type,
	                  id: hotspot.id,
	                  locations: hotspot.locations
	                };
	                break;
	              }
	            }
	          } catch (err) {
	            _iterator.e(err);
	          } finally {
	            _iterator.f();
	          }
	        }

	        _this4._hotspots.trigger('hotspotsReceived', {
	          pageSpread: _this4._core.pageSpreads.get(hotspotRequest.id),
	          versoPageSpread: versoPageSpread,
	          ratio: _this4.options.hotspotRatio,
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
	      var _this$popover2, _this$popover2$destro;

	      (_this$popover2 = this.popover) === null || _this$popover2 === void 0 ? void 0 : (_this$popover2$destro = _this$popover2.destroy) === null || _this$popover2$destro === void 0 ? void 0 : _this$popover2$destro.call(_this$popover2);
	    }
	  }, {
	    key: "clicked",
	    value: function clicked(e) {
	      var _this5 = this;

	      this.pickHotspot(e, function (hotspot) {
	        _this5.trigger('hotspotClicked', hotspot);
	      });
	    }
	  }, {
	    key: "contextmenu",
	    value: function contextmenu(e) {
	      var _this6 = this;

	      this.pickHotspot(e, function (hotspot) {
	        _this6.trigger('hotspotContextmenu', hotspot);
	      });
	    }
	  }, {
	    key: "pressed",
	    value: function pressed(e) {
	      var _this7 = this;

	      this.pickHotspot(e, function (hotspot) {
	        _this7.trigger('hotspotPressed', hotspot);
	      });
	    }
	  }]);

	  return Viewer;
	}(microevent);

	// TODO: Remove from `core-js@4`

	var esnext_aggregateError = {

	};

	// TODO: Remove from `core-js@4`

	var esnext_promise_allSettled = {

	};

	'use strict';




	// `Promise.try` method
	// https://github.com/tc39/proposal-promise-try
	_export$1({ target: 'Promise', stat: true }, {
	  'try': function (callbackfn) {
	    var promiseCapability = newPromiseCapability$3.f(this);
	    var result = perform$1(callbackfn);
	    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
	    return promiseCapability.promise;
	  }
	});

	var esnext_promise_try = {

	};

	// TODO: Remove from `core-js@4`

	var esnext_promise_any = {

	};

	// TODO: Remove from `core-js@4`




	var promise$2 = promise$5;

	var promise$1 = promise$2;

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
	    promise$1.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new promise$1(function (resolve, reject) {
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

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime_1 = createCommonjsModule(function (module) {
	var runtime = (function (exports) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  'object' === "object" ? module.exports : {}
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	var nativePromiseConstructor = global$1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction(fn);
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

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	var iteratorClose = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject(returnMethod.call(iterator)).value;
	  }
	};

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
	      anObject(value);
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
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
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

	var ITERATOR = wellKnownSymbol('iterator');
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

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global$1.location;
	var set = global$1.setImmediate;
	var clear = global$1.clearImmediate;
	var process$3 = global$1.process;
	var MessageChannel = global$1.MessageChannel;
	var Dispatch = global$1.Dispatch;
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
	  global$1.postMessage(id + '', location.protocol + '//' + location.host);
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
	  if (engineIsNode) {
	    defer = function (id) {
	      process$3.nextTick(runner(id));
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
	    global$1.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global$1.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails(post)
	  ) {
	    defer = post;
	    global$1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
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

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;




	var MutationObserver = global$1.MutationObserver || global$1.WebKitMutationObserver;
	var document$2 = global$1.document;
	var process$2 = global$1.process;
	var Promise$1 = global$1.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (engineIsNode && (parent = process$2.domain)) parent.exit();
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
	  if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
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
	  } else if (engineIsNode) {
	    notify$1 = function () {
	      process$2.nextTick(flush);
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
	      macrotask.call(global$1, flush);
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

	'use strict';


	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability$1 = {
		f: f
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global$1.console;
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

	'use strict';
















	var task = task$1.set;











	var SPECIES = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$1 = internalState.get;
	var setInternalState$1 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global$1.TypeError;
	var document$1 = global$1.document;
	var process$1 = global$1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability = newPromiseCapability$1.f;
	var newGenericPromiseCapability = newPromiseCapability;
	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$1.dispatchEvent);
	var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
	  }
	  // We need Promise#finally in the pure version for preventing prototype pollution
	  if (isPure && !PromiseConstructor.prototype['finally']) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
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
	    global$1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  task.call(global$1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (engineIsNode) {
	          process$1.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  task.call(global$1, function () {
	    var promise = state.facade;
	    if (engineIsNode) {
	      process$1.emit('rejectionHandled', promise);
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
	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction(executor);
	    Internal.call(this);
	    var state = getInternalState$1(this);
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
	      reaction.domain = engineIsNode ? process$1.domain : undefined;
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
	    var state = getInternalState$1(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };
	  newPromiseCapability$1.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (!isPure && typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars -- required for `.length`
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global$1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false, true);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced: isPure || FORCED }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(isPure && this === PromiseWrapper ? PromiseConstructor : this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction(C.resolve);
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
	      var $promiseResolve = aFunction(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var es_promise = {

	};

	'use strict';
	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(STRING_ITERATOR);

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
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var es_string_iterator = {

	};

	function ownKeys(object, enumerableOnly) { var keys = keys$6(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$5(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; forEach(_context2 = ownKeys(Object(source), true)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { defineProperties(target, getOwnPropertyDescriptors(source)); } else { var _context3; forEach(_context3 = ownKeys(Object(source))).call(_context3, function (key) { defineProperty$7(target, key, getOwnPropertyDescriptor$5(source, key)); }); } } return target; }

	var Bootstrapper = /*#__PURE__*/function () {
	  function Bootstrapper() {
	    var _this = this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Bootstrapper);

	    _defineProperty(this, "fetchDetails", function (callback) {
	      return request$1({
	        url: "/v2/catalogs/".concat(_this.options.id)
	      }, callback);
	    });

	    _defineProperty(this, "fetchPages", function (callback) {
	      return request$1({
	        url: "/v2/catalogs/".concat(_this.options.id, "/pages")
	      }, callback);
	    });

	    _defineProperty(this, "fetchHotspots", function (callback) {
	      return request$1({
	        url: "/v2/catalogs/".concat(_this.options.id, "/hotspots")
	      }, callback);
	    });

	    this.options = options;
	  }

	  _createClass(Bootstrapper, [{
	    key: "createViewer",
	    value: function createViewer(data, viewerOptions) {
	      return new Viewer(this.options.el, _objectSpread({
	        id: this.options.id,
	        ownedBy: data.details.dealer_id,
	        color: '#' + data.details.branding.pageflip.color,
	        hotspotRatio: data.details.dimensions.height,
	        keyboard: true,
	        pageId: this.options.pageId,
	        eventTracker: this.options.eventTracker,
	        pages: this.transformPages(data.pages)
	      }, viewerOptions));
	    }
	  }, {
	    key: "transformPages",
	    value: function transformPages(pages) {
	      return map(pages).call(pages, function (page, i) {
	        var pageNumber = i + 1;
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
	      var obj = {};

	      forEach(hotspots).call(hotspots, function (hotspot) {
	        return obj[hotspot.id] = hotspot;
	      });

	      viewer.applyHotspots(obj);
	    }
	  }, {
	    key: "fetch",
	    value: function () {
	      var _fetch = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(callback) {
	        var _yield$Promise$all, _yield$Promise$all2, details, pages;

	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.prev = 0;
	                _context.next = 3;
	                return promise$3.all([this.fetchDetails(), this.fetchPages()]);

	              case 3:
	                _yield$Promise$all = _context.sent;
	                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
	                details = _yield$Promise$all2[0];
	                pages = _yield$Promise$all2[1];

	                if (!(details && pages)) {
	                  _context.next = 11;
	                  break;
	                }

	                callback(null, {
	                  details: details,
	                  pages: pages
	                });
	                _context.next = 12;
	                break;

	              case 11:
	                throw new Error();

	              case 12:
	                _context.next = 17;
	                break;

	              case 14:
	                _context.prev = 14;
	                _context.t0 = _context["catch"](0);
	                callback(_context.t0);

	              case 17:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[0, 14]]);
	      }));

	      function fetch(_x) {
	        return _fetch.apply(this, arguments);
	      }

	      return fetch;
	    }()
	  }]);

	  return Bootstrapper;
	}();

	var PagedPublicationKit = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Viewer: Viewer,
		Bootstrapper: Bootstrapper
	});

	var _context;
	var config = new Config();
	var SGN = {
	  config: config,
	  util: util,
	  translations: translations
	}; // Expose storage backends.

	SGN.storage = {
	  local: clientLocal
	}; // Expose the different kits.

	SGN.EventsKit = EventsKit;
	SGN.CoreKit = CoreKit;
	SGN.PagedPublicationKit = PagedPublicationKit;
	SGN.IncitoPublicationKit = IncitoPublicationKit;
	SGN.CoreUIKit = CoreUIKit;

	bind$2(_context = SGN.config).call(_context, 'change', function (changedAttributes) {
	  var _ref;

	  var newEventTracker = changedAttributes.eventTracker;
	  var newAppKey = changedAttributes.appKey;

	  if ((newAppKey || newEventTracker) && ((_ref = newEventTracker || SGN.config.get('eventTracker')) === null || _ref === void 0 ? void 0 : _ref.trackId) === (newAppKey || SGN.config.get('appKey'))) {
	    throw error(new Error('Track identifier must not be identical to app key. Go to https://etilbudsavis.dk/developers/apps to get a track identifier for your app'));
	  }

	  if (newEventTracker != null) {
	    // default eventsTrackUrl
	    if (!newEventTracker.eventsTrackUrl) {
	      newEventTracker.setEventsTrackUrl(SGN.config.get('eventsTrackUrl'));
	    }
	  }

	  var newEventsTrackUrl = changedAttributes.eventsTrackUrl;

	  if (newEventsTrackUrl && SGN.config.get('eventTracker')) {
	    SGN.config.get('eventTracker').setEventsTrackUrl(newEventsTrackUrl);
	  }
	});

	if (isBrowser()) {
	  // Autoconfigure the SDK.
	  var scriptEl = document.getElementById('sgn-sdk');

	  if (scriptEl) {
	    var appKey = scriptEl.getAttribute('data-app-key');
	    var trackId = scriptEl.getAttribute('data-track-id');
	    var _config = {};

	    if (appKey) {
	      _config.appKey = appKey;
	    }

	    if (trackId) {
	      _config.eventTracker = new SGN.EventsKit.Tracker({
	        trackId: trackId
	      });
	    }

	    SGN.config.set(_config);
	  }
	}

	return SGN;

})));
//# sourceMappingURL=sgn-sdk.js.map
