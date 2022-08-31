(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Verso = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var defineProperty$d = {exports: {}};

	var defineProperty$c = {exports: {}};

	var check$1 = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$P =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check$1(typeof globalThis == 'object' && globalThis) ||
	  check$1(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check$1(typeof self == 'object' && self) ||
	  check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var FunctionPrototype$6 = Function.prototype;
	var apply$5 = FunctionPrototype$6.apply;
	var bind$f = FunctionPrototype$6.bind;
	var call$l = FunctionPrototype$6.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply$1 = typeof Reflect == 'object' && Reflect.apply || (bind$f ? call$l.bind(apply$5) : function () {
	  return call$l.apply(apply$5, arguments);
	});

	var FunctionPrototype$5 = Function.prototype;
	var bind$e = FunctionPrototype$5.bind;
	var call$k = FunctionPrototype$5.call;
	var uncurryThis$K = bind$e && bind$e.bind(call$k, call$k);

	var functionUncurryThis$1 = bind$e ? function (fn) {
	  return fn && uncurryThis$K(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$k.apply(fn, arguments);
	  };
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$w = function (argument) {
	  return typeof argument == 'function';
	};

	var objectGetOwnPropertyDescriptor$1 = {};

	var fails$y = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$x = fails$y;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors$1 = !fails$x(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var call$j = Function.prototype.call;

	var functionCall$1 = call$j.bind ? call$j.bind(call$j) : function () {
	  return call$j.apply(call$j, arguments);
	};

	var objectPropertyIsEnumerable$1 = {};

	var $propertyIsEnumerable$3 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$8 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG$1 = getOwnPropertyDescriptor$8 && !$propertyIsEnumerable$3.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable$1.f = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$8(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$3;

	var createPropertyDescriptor$9 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var uncurryThis$J = functionUncurryThis$1;

	var toString$g = uncurryThis$J({}.toString);
	var stringSlice$7 = uncurryThis$J(''.slice);

	var classofRaw$3 = function (it) {
	  return stringSlice$7(toString$g(it), 8, -1);
	};

	var global$O = global$P;
	var uncurryThis$I = functionUncurryThis$1;
	var fails$w = fails$y;
	var classof$h = classofRaw$3;

	var Object$8 = global$O.Object;
	var split$1 = uncurryThis$I(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject$1 = fails$w(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$8('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$h(it) == 'String' ? split$1(it, '') : Object$8(it);
	} : Object$8;

	var global$N = global$P;

	var TypeError$f = global$N.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$c = function (it) {
	  if (it == undefined) throw TypeError$f("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$5 = indexedObject$1;
	var requireObjectCoercible$b = requireObjectCoercible$c;

	var toIndexedObject$h = function (it) {
	  return IndexedObject$5(requireObjectCoercible$b(it));
	};

	var isCallable$v = isCallable$w;

	var isObject$k = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$v(it);
	};

	var path$g = {};

	var path$f = path$g;
	var global$M = global$P;
	var isCallable$u = isCallable$w;

	var aFunction$1 = function (variable) {
	  return isCallable$u(variable) ? variable : undefined;
	};

	var getBuiltIn$c = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path$f[namespace]) || aFunction$1(global$M[namespace])
	    : path$f[namespace] && path$f[namespace][method] || global$M[namespace] && global$M[namespace][method];
	};

	var uncurryThis$H = functionUncurryThis$1;

	var objectIsPrototypeOf$1 = uncurryThis$H({}.isPrototypeOf);

	var getBuiltIn$b = getBuiltIn$c;

	var engineUserAgent$1 = getBuiltIn$b('navigator', 'userAgent') || '';

	var global$L = global$P;
	var userAgent$1 = engineUserAgent$1;

	var process$1 = global$L.process;
	var Deno$1 = global$L.Deno;
	var versions$1 = process$1 && process$1.versions || Deno$1 && Deno$1.version;
	var v8$1 = versions$1 && versions$1.v8;
	var match$1, version$1;

	if (v8$1) {
	  match$1 = v8$1.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version$1 = match$1[0] > 0 && match$1[0] < 4 ? 1 : +(match$1[0] + match$1[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version$1 && userAgent$1) {
	  match$1 = userAgent$1.match(/Edge\/(\d+)/);
	  if (!match$1 || match$1[1] >= 74) {
	    match$1 = userAgent$1.match(/Chrome\/(\d+)/);
	    if (match$1) version$1 = +match$1[1];
	  }
	}

	var engineV8Version$1 = version$1;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$3 = engineV8Version$1;
	var fails$v = fails$y;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$v(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$4 = nativeSymbol;

	var useSymbolAsUid$1 = NATIVE_SYMBOL$4
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$K = global$P;
	var getBuiltIn$a = getBuiltIn$c;
	var isCallable$t = isCallable$w;
	var isPrototypeOf$d = objectIsPrototypeOf$1;
	var USE_SYMBOL_AS_UID$3 = useSymbolAsUid$1;

	var Object$7 = global$K.Object;

	var isSymbol$7 = USE_SYMBOL_AS_UID$3 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$a('Symbol');
	  return isCallable$t($Symbol) && isPrototypeOf$d($Symbol.prototype, Object$7(it));
	};

	var global$J = global$P;

	var String$4 = global$J.String;

	var tryToString$5 = function (argument) {
	  try {
	    return String$4(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$I = global$P;
	var isCallable$s = isCallable$w;
	var tryToString$4 = tryToString$5;

	var TypeError$e = global$I.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$7 = function (argument) {
	  if (isCallable$s(argument)) return argument;
	  throw TypeError$e(tryToString$4(argument) + ' is not a function');
	};

	var aCallable$6 = aCallable$7;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$7 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$6(func);
	};

	var global$H = global$P;
	var call$i = functionCall$1;
	var isCallable$r = isCallable$w;
	var isObject$j = isObject$k;

	var TypeError$d = global$H.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$3 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$r(fn = input.toString) && !isObject$j(val = call$i(fn, input))) return val;
	  if (isCallable$r(fn = input.valueOf) && !isObject$j(val = call$i(fn, input))) return val;
	  if (pref !== 'string' && isCallable$r(fn = input.toString) && !isObject$j(val = call$i(fn, input))) return val;
	  throw TypeError$d("Can't convert object to primitive value");
	};

	var shared$9 = {exports: {}};

	var global$G = global$P;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$b = Object.defineProperty;

	var setGlobal$1 = function (key, value) {
	  try {
	    defineProperty$b(global$G, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$G[key] = value;
	  } return value;
	};

	var global$F = global$P;
	var setGlobal = setGlobal$1;

	var SHARED$1 = '__core-js_shared__';
	var store$7 = global$F[SHARED$1] || setGlobal(SHARED$1, {});

	var sharedStore$1 = store$7;

	var store$6 = sharedStore$1;

	(shared$9.exports = function (key, value) {
	  return store$6[key] || (store$6[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.20.2',
	  mode: 'pure' ,
	  copyright: '© 2022 Denis Pushkarev (zloirock.ru)'
	});

	var global$E = global$P;
	var requireObjectCoercible$a = requireObjectCoercible$c;

	var Object$6 = global$E.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$d = function (argument) {
	  return Object$6(requireObjectCoercible$a(argument));
	};

	var uncurryThis$G = functionUncurryThis$1;
	var toObject$c = toObject$d;

	var hasOwnProperty$1 = uncurryThis$G({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1$1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty$1(toObject$c(it), key);
	};

	var uncurryThis$F = functionUncurryThis$1;

	var id$1 = 0;
	var postfix$1 = Math.random();
	var toString$f = uncurryThis$F(1.0.toString);

	var uid$6 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$f(++id$1 + postfix$1, 36);
	};

	var global$D = global$P;
	var shared$8 = shared$9.exports;
	var hasOwn$i = hasOwnProperty_1$1;
	var uid$5 = uid$6;
	var NATIVE_SYMBOL$3 = nativeSymbol;
	var USE_SYMBOL_AS_UID$2 = useSymbolAsUid$1;

	var WellKnownSymbolsStore$2 = shared$8('wks');
	var Symbol$2 = global$D.Symbol;
	var symbolFor$1 = Symbol$2 && Symbol$2['for'];
	var createWellKnownSymbol$1 = USE_SYMBOL_AS_UID$2 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$5;

	var wellKnownSymbol$r = function (name) {
	  if (!hasOwn$i(WellKnownSymbolsStore$2, name) || !(NATIVE_SYMBOL$3 || typeof WellKnownSymbolsStore$2[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$3 && hasOwn$i(Symbol$2, name)) {
	      WellKnownSymbolsStore$2[name] = Symbol$2[name];
	    } else if (USE_SYMBOL_AS_UID$2 && symbolFor$1) {
	      WellKnownSymbolsStore$2[name] = symbolFor$1(description);
	    } else {
	      WellKnownSymbolsStore$2[name] = createWellKnownSymbol$1(description);
	    }
	  } return WellKnownSymbolsStore$2[name];
	};

	var global$C = global$P;
	var call$h = functionCall$1;
	var isObject$i = isObject$k;
	var isSymbol$6 = isSymbol$7;
	var getMethod$6 = getMethod$7;
	var ordinaryToPrimitive$2 = ordinaryToPrimitive$3;
	var wellKnownSymbol$q = wellKnownSymbol$r;

	var TypeError$c = global$C.TypeError;
	var TO_PRIMITIVE$2 = wellKnownSymbol$q('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$4 = function (input, pref) {
	  if (!isObject$i(input) || isSymbol$6(input)) return input;
	  var exoticToPrim = getMethod$6(input, TO_PRIMITIVE$2);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$h(exoticToPrim, input, pref);
	    if (!isObject$i(result) || isSymbol$6(result)) return result;
	    throw TypeError$c("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive$2(input, pref);
	};

	var toPrimitive$3 = toPrimitive$4;
	var isSymbol$5 = isSymbol$7;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$8 = function (argument) {
	  var key = toPrimitive$3(argument, 'string');
	  return isSymbol$5(key) ? key : key + '';
	};

	var global$B = global$P;
	var isObject$h = isObject$k;

	var document$2 = global$B.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$3 = isObject$h(document$2) && isObject$h(document$2.createElement);

	var documentCreateElement$4 = function (it) {
	  return EXISTS$3 ? document$2.createElement(it) : {};
	};

	var DESCRIPTORS$m = descriptors$1;
	var fails$u = fails$y;
	var createElement$1 = documentCreateElement$4;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine$1 = !DESCRIPTORS$m && !fails$u(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$l = descriptors$1;
	var call$g = functionCall$1;
	var propertyIsEnumerableModule$3 = objectPropertyIsEnumerable$1;
	var createPropertyDescriptor$8 = createPropertyDescriptor$9;
	var toIndexedObject$g = toIndexedObject$h;
	var toPropertyKey$7 = toPropertyKey$8;
	var hasOwn$h = hasOwnProperty_1$1;
	var IE8_DOM_DEFINE$3 = ie8DomDefine$1;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor$1.f = DESCRIPTORS$l ? $getOwnPropertyDescriptor$4 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$g(O);
	  P = toPropertyKey$7(P);
	  if (IE8_DOM_DEFINE$3) try {
	    return $getOwnPropertyDescriptor$4(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$h(O, P)) return createPropertyDescriptor$8(!call$g(propertyIsEnumerableModule$3.f, O, P), O[P]);
	};

	var fails$t = fails$y;
	var isCallable$q = isCallable$w;

	var replacement$1 = /#|\.prototype\./;

	var isForced$4 = function (feature, detection) {
	  var value = data$1[normalize$1(feature)];
	  return value == POLYFILL$1 ? true
	    : value == NATIVE$1 ? false
	    : isCallable$q(detection) ? fails$t(detection)
	    : !!detection;
	};

	var normalize$1 = isForced$4.normalize = function (string) {
	  return String(string).replace(replacement$1, '.').toLowerCase();
	};

	var data$1 = isForced$4.data = {};
	var NATIVE$1 = isForced$4.NATIVE = 'N';
	var POLYFILL$1 = isForced$4.POLYFILL = 'P';

	var isForced_1$1 = isForced$4;

	var uncurryThis$E = functionUncurryThis$1;
	var aCallable$5 = aCallable$7;

	var bind$d = uncurryThis$E(uncurryThis$E.bind);

	// optional / simple context binding
	var functionBindContext$1 = function (fn, that) {
	  aCallable$5(fn);
	  return that === undefined ? fn : bind$d ? bind$d(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty$1 = {};

	var DESCRIPTORS$k = descriptors$1;
	var fails$s = fails$y;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug$1 = DESCRIPTORS$k && fails$s(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$A = global$P;
	var isObject$g = isObject$k;

	var String$3 = global$A.String;
	var TypeError$b = global$A.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$k = function (argument) {
	  if (isObject$g(argument)) return argument;
	  throw TypeError$b(String$3(argument) + ' is not an object');
	};

	var global$z = global$P;
	var DESCRIPTORS$j = descriptors$1;
	var IE8_DOM_DEFINE$2 = ie8DomDefine$1;
	var V8_PROTOTYPE_DEFINE_BUG$3 = v8PrototypeDefineBug$1;
	var anObject$j = anObject$k;
	var toPropertyKey$6 = toPropertyKey$8;

	var TypeError$a = global$z.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$2 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE$1 = 'enumerable';
	var CONFIGURABLE$3 = 'configurable';
	var WRITABLE$1 = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty$1.f = DESCRIPTORS$j ? V8_PROTOTYPE_DEFINE_BUG$3 ? function defineProperty(O, P, Attributes) {
	  anObject$j(O);
	  P = toPropertyKey$6(P);
	  anObject$j(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE$1 in Attributes && !Attributes[WRITABLE$1]) {
	    var current = $getOwnPropertyDescriptor$3(O, P);
	    if (current && current[WRITABLE$1]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$3 in Attributes ? Attributes[CONFIGURABLE$3] : current[CONFIGURABLE$3],
	        enumerable: ENUMERABLE$1 in Attributes ? Attributes[ENUMERABLE$1] : current[ENUMERABLE$1],
	        writable: false
	      };
	    }
	  } return $defineProperty$2(O, P, Attributes);
	} : $defineProperty$2 : function defineProperty(O, P, Attributes) {
	  anObject$j(O);
	  P = toPropertyKey$6(P);
	  anObject$j(Attributes);
	  if (IE8_DOM_DEFINE$2) try {
	    return $defineProperty$2(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$a('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$i = descriptors$1;
	var definePropertyModule$8 = objectDefineProperty$1;
	var createPropertyDescriptor$7 = createPropertyDescriptor$9;

	var createNonEnumerableProperty$a = DESCRIPTORS$i ? function (object, key, value) {
	  return definePropertyModule$8.f(object, key, createPropertyDescriptor$7(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$y = global$P;
	var apply$4 = functionApply$1;
	var uncurryThis$D = functionUncurryThis$1;
	var isCallable$p = isCallable$w;
	var getOwnPropertyDescriptor$7 = objectGetOwnPropertyDescriptor$1.f;
	var isForced$3 = isForced_1$1;
	var path$e = path$g;
	var bind$c = functionBindContext$1;
	var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;
	var hasOwn$g = hasOwnProperty_1$1;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply$4(NativeConstructor, this, arguments);
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
	  options.name        - the .name of the function if it does not match the key
	*/
	var _export$1 = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$y : STATIC ? global$y[TARGET] : (global$y[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$e : path$e[TARGET] || createNonEnumerableProperty$9(path$e, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn$g(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$7(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind$c(sourceProperty, global$y);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable$p(sourceProperty)) resultProperty = uncurryThis$D(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$9(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty$9(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn$g(path$e, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty$9(path$e, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty$9(path$e[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty$9(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var $$o = _export$1;
	var DESCRIPTORS$h = descriptors$1;
	var defineProperty$a = objectDefineProperty$1.f;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	$$o({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$a, sham: !DESCRIPTORS$h }, {
	  defineProperty: defineProperty$a
	});

	var path$d = path$g;

	var Object$5 = path$d.Object;

	var defineProperty$9 = defineProperty$c.exports = function defineProperty(it, key, desc) {
	  return Object$5.defineProperty(it, key, desc);
	};

	if (Object$5.defineProperty.sham) defineProperty$9.sham = true;

	var parent$E = defineProperty$c.exports;

	var defineProperty$8 = parent$E;

	var parent$D = defineProperty$8;

	var defineProperty$7 = parent$D;

	var parent$C = defineProperty$7;

	var defineProperty$6 = parent$C;

	(function (module) {
		module.exports = defineProperty$6;
	} (defineProperty$d));

	var _Object$defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty$d.exports);

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    _Object$defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);

	  _Object$defineProperty(Constructor, "prototype", {
	    writable: false
	  });

	  return Constructor;
	}

	var splice$3 = {exports: {}};

	var ceil$1 = Math.ceil;
	var floor$2 = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$9 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor$2 : ceil$1)(number);
	};

	var toIntegerOrInfinity$8 = toIntegerOrInfinity$9;

	var max$6 = Math.max;
	var min$6 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$7 = function (index, length) {
	  var integer = toIntegerOrInfinity$8(index);
	  return integer < 0 ? max$6(integer + length, 0) : min$6(integer, length);
	};

	var toIntegerOrInfinity$7 = toIntegerOrInfinity$9;

	var min$5 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$5 = function (argument) {
	  return argument > 0 ? min$5(toIntegerOrInfinity$7(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$4 = toLength$5;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$b = function (obj) {
	  return toLength$4(obj.length);
	};

	var classof$g = classofRaw$3;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$c = Array.isArray || function isArray(argument) {
	  return classof$g(argument) == 'Array';
	};

	var wellKnownSymbol$p = wellKnownSymbol$r;

	var TO_STRING_TAG$5 = wellKnownSymbol$p('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$5] = 'z';

	var toStringTagSupport$1 = String(test$1) === '[object z]';

	var global$x = global$P;
	var TO_STRING_TAG_SUPPORT$5 = toStringTagSupport$1;
	var isCallable$o = isCallable$w;
	var classofRaw$2 = classofRaw$3;
	var wellKnownSymbol$o = wellKnownSymbol$r;

	var TO_STRING_TAG$4 = wellKnownSymbol$o('toStringTag');
	var Object$4 = global$x.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS$1 = classofRaw$2(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet$1 = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$f = TO_STRING_TAG_SUPPORT$5 ? classofRaw$2 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet$1(O = Object$4(it), TO_STRING_TAG$4)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS$1 ? classofRaw$2(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$2(O)) == 'Object' && isCallable$o(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$C = functionUncurryThis$1;
	var isCallable$n = isCallable$w;
	var store$5 = sharedStore$1;

	var functionToString$1 = uncurryThis$C(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$n(store$5.inspectSource)) {
	  store$5.inspectSource = function (it) {
	    return functionToString$1(it);
	  };
	}

	var inspectSource$5 = store$5.inspectSource;

	var uncurryThis$B = functionUncurryThis$1;
	var fails$r = fails$y;
	var isCallable$m = isCallable$w;
	var classof$e = classof$f;
	var getBuiltIn$9 = getBuiltIn$c;
	var inspectSource$4 = inspectSource$5;

	var noop$1 = function () { /* empty */ };
	var empty$1 = [];
	var construct$2 = getBuiltIn$9('Reflect', 'construct');
	var constructorRegExp$1 = /^\s*(?:class|function)\b/;
	var exec$3 = uncurryThis$B(constructorRegExp$1.exec);
	var INCORRECT_TO_STRING$1 = !constructorRegExp$1.exec(noop$1);

	var isConstructorModern$1 = function isConstructor(argument) {
	  if (!isCallable$m(argument)) return false;
	  try {
	    construct$2(noop$1, empty$1, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy$1 = function isConstructor(argument) {
	  if (!isCallable$m(argument)) return false;
	  switch (classof$e(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING$1 || !!exec$3(constructorRegExp$1, inspectSource$4(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy$1.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$6 = !construct$2 || fails$r(function () {
	  var called;
	  return isConstructorModern$1(isConstructorModern$1.call)
	    || !isConstructorModern$1(Object)
	    || !isConstructorModern$1(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy$1 : isConstructorModern$1;

	var global$w = global$P;
	var isArray$b = isArray$c;
	var isConstructor$5 = isConstructor$6;
	var isObject$f = isObject$k;
	var wellKnownSymbol$n = wellKnownSymbol$r;

	var SPECIES$5 = wellKnownSymbol$n('species');
	var Array$4 = global$w.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$3 = function (originalArray) {
	  var C;
	  if (isArray$b(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$5(C) && (C === Array$4 || isArray$b(C.prototype))) C = undefined;
	    else if (isObject$f(C)) {
	      C = C[SPECIES$5];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$4 : C;
	};

	var arraySpeciesConstructor$2 = arraySpeciesConstructor$3;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$5 = function (originalArray, length) {
	  return new (arraySpeciesConstructor$2(originalArray))(length === 0 ? 0 : length);
	};

	var toPropertyKey$5 = toPropertyKey$8;
	var definePropertyModule$7 = objectDefineProperty$1;
	var createPropertyDescriptor$6 = createPropertyDescriptor$9;

	var createProperty$8 = function (object, key, value) {
	  var propertyKey = toPropertyKey$5(key);
	  if (propertyKey in object) definePropertyModule$7.f(object, propertyKey, createPropertyDescriptor$6(0, value));
	  else object[propertyKey] = value;
	};

	var fails$q = fails$y;
	var wellKnownSymbol$m = wellKnownSymbol$r;
	var V8_VERSION$2 = engineV8Version$1;

	var SPECIES$4 = wellKnownSymbol$m('species');

	var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$2 >= 51 || !fails$q(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$4] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$n = _export$1;
	var global$v = global$P;
	var toAbsoluteIndex$6 = toAbsoluteIndex$7;
	var toIntegerOrInfinity$6 = toIntegerOrInfinity$9;
	var lengthOfArrayLike$a = lengthOfArrayLike$b;
	var toObject$b = toObject$d;
	var arraySpeciesCreate$4 = arraySpeciesCreate$5;
	var createProperty$7 = createProperty$8;
	var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('splice');

	var TypeError$9 = global$v.TypeError;
	var max$5 = Math.max;
	var min$4 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$n({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$b(this);
	    var len = lengthOfArrayLike$a(O);
	    var actualStart = toAbsoluteIndex$6(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$4(max$5(toIntegerOrInfinity$6(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError$9(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate$4(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty$7(A, k, O[from]);
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

	var path$c = path$g;

	var entryVirtual$b = function (CONSTRUCTOR) {
	  return path$c[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual$a = entryVirtual$b;

	var splice$2 = entryVirtual$a('Array').splice;

	var isPrototypeOf$c = objectIsPrototypeOf$1;
	var method$8 = splice$2;

	var ArrayPrototype$8 = Array.prototype;

	var splice$1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$8 || (isPrototypeOf$c(ArrayPrototype$8, it) && own === ArrayPrototype$8.splice) ? method$8 : own;
	};

	var parent$B = splice$1;

	var splice = parent$B;

	(function (module) {
		module.exports = splice;
	} (splice$3));

	var _spliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(splice$3.exports);

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$u =
	  // eslint-disable-next-line es-x/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$p = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$o = fails$p;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$o(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$n = fails$p;

	var functionBindNative = !fails$n(function () {
	  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$f = Function.prototype.call;

	var functionCall = NATIVE_BIND$3 ? call$f.bind(call$f) : function () {
	  return call$f.apply(call$f, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$6 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$6 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$6(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$2;

	var createPropertyDescriptor$5 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$4 = Function.prototype;
	var bind$b = FunctionPrototype$4.bind;
	var call$e = FunctionPrototype$4.call;
	var uncurryThis$A = NATIVE_BIND$2 && bind$b.bind(call$e, call$e);

	var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
	  return fn && uncurryThis$A(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$e.apply(fn, arguments);
	  };
	};

	var uncurryThis$z = functionUncurryThis;

	var toString$e = uncurryThis$z({}.toString);
	var stringSlice$6 = uncurryThis$z(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$6(toString$e(it), 8, -1);
	};

	var uncurryThis$y = functionUncurryThis;
	var fails$m = fails$p;
	var classof$d = classofRaw$1;

	var $Object$3 = Object;
	var split = uncurryThis$y(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$m(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$d(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$5 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$4 = isNullOrUndefined$5;

	var $TypeError$8 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$9 = function (it) {
	  if (isNullOrUndefined$4(it)) throw $TypeError$8("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$4 = indexedObject;
	var requireObjectCoercible$8 = requireObjectCoercible$9;

	var toIndexedObject$f = function (it) {
	  return IndexedObject$4(requireObjectCoercible$8(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$l = function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$k = isCallable$l;

	var documentAll = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var SPECIAL_DOCUMENT_ALL = typeof documentAll == 'undefined' && documentAll !== undefined;

	var isObject$e = SPECIAL_DOCUMENT_ALL ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$k(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$k(it);
	};

	var global$t = global$u;
	var isCallable$j = isCallable$l;

	var aFunction = function (argument) {
	  return isCallable$j(argument) ? argument : undefined;
	};

	var getBuiltIn$8 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$t[namespace]) : global$t[namespace] && global$t[namespace][method];
	};

	var uncurryThis$x = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$x({}.isPrototypeOf);

	var getBuiltIn$7 = getBuiltIn$8;

	var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

	var global$s = global$u;
	var userAgent = engineUserAgent;

	var process = global$s.process;
	var Deno = global$s.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es-x/no-symbol -- required for testing */

	var V8_VERSION$1 = engineV8Version;
	var fails$l = fails$p;

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$l(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
	});

	/* eslint-disable es-x/no-symbol -- required for testing */

	var NATIVE_SYMBOL$2 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$6 = getBuiltIn$8;
	var isCallable$i = isCallable$l;
	var isPrototypeOf$b = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$4 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$6('Symbol');
	  return isCallable$i($Symbol) && isPrototypeOf$b($Symbol.prototype, $Object$2(it));
	};

	var $String$3 = String;

	var tryToString$3 = function (argument) {
	  try {
	    return $String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$h = isCallable$l;
	var tryToString$2 = tryToString$3;

	var $TypeError$7 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$4 = function (argument) {
	  if (isCallable$h(argument)) return argument;
	  throw $TypeError$7(tryToString$2(argument) + ' is not a function');
	};

	var aCallable$3 = aCallable$4;
	var isNullOrUndefined$3 = isNullOrUndefined$5;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$5 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$3(func) ? undefined : aCallable$3(func);
	};

	var call$d = functionCall;
	var isCallable$g = isCallable$l;
	var isObject$d = isObject$e;

	var $TypeError$6 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$g(fn = input.toString) && !isObject$d(val = call$d(fn, input))) return val;
	  if (isCallable$g(fn = input.valueOf) && !isObject$d(val = call$d(fn, input))) return val;
	  if (pref !== 'string' && isCallable$g(fn = input.toString) && !isObject$d(val = call$d(fn, input))) return val;
	  throw $TypeError$6("Can't convert object to primitive value");
	};

	var shared$7 = {exports: {}};

	var global$r = global$u;

	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var defineProperty$5 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$5(global$r, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$r[key] = value;
	  } return value;
	};

	var global$q = global$u;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$4 = global$q[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$4;

	var store$3 = sharedStore;

	(shared$7.exports = function (key, value) {
	  return store$3[key] || (store$3[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.25.0',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.25.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var requireObjectCoercible$7 = requireObjectCoercible$9;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$a = function (argument) {
	  return $Object$1(requireObjectCoercible$7(argument));
	};

	var uncurryThis$w = functionUncurryThis;
	var toObject$9 = toObject$a;

	var hasOwnProperty = uncurryThis$w({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es-x/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$9(it), key);
	};

	var uncurryThis$v = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$d = uncurryThis$v(1.0.toString);

	var uid$4 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$d(++id + postfix, 36);
	};

	var global$p = global$u;
	var shared$6 = shared$7.exports;
	var hasOwn$f = hasOwnProperty_1;
	var uid$3 = uid$4;
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$6('wks');
	var Symbol$1 = global$p.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

	var wellKnownSymbol$l = function (name) {
	  if (!hasOwn$f(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$1 && hasOwn$f(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore$1[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var call$c = functionCall;
	var isObject$c = isObject$e;
	var isSymbol$3 = isSymbol$4;
	var getMethod$4 = getMethod$5;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$k = wellKnownSymbol$l;

	var $TypeError$5 = TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol$k('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$2 = function (input, pref) {
	  if (!isObject$c(input) || isSymbol$3(input)) return input;
	  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$c(exoticToPrim, input, pref);
	    if (!isObject$c(result) || isSymbol$3(result)) return result;
	    throw $TypeError$5("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive$1 = toPrimitive$2;
	var isSymbol$2 = isSymbol$4;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$4 = function (argument) {
	  var key = toPrimitive$1(argument, 'string');
	  return isSymbol$2(key) ? key : key + '';
	};

	var global$o = global$u;
	var isObject$b = isObject$e;

	var document$1 = global$o.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$2 = isObject$b(document$1) && isObject$b(document$1.createElement);

	var documentCreateElement$3 = function (it) {
	  return EXISTS$2 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$g = descriptors;
	var fails$k = fails$p;
	var createElement = documentCreateElement$3;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$g && !fails$k(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$f = descriptors;
	var call$b = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$4 = createPropertyDescriptor$5;
	var toIndexedObject$e = toIndexedObject$f;
	var toPropertyKey$3 = toPropertyKey$4;
	var hasOwn$e = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$f ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$e(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$e(O, P)) return createPropertyDescriptor$4(!call$b(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$e = descriptors;
	var fails$j = fails$p;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$e && fails$j(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$a = isObject$e;

	var $String$2 = String;
	var $TypeError$4 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$i = function (argument) {
	  if (isObject$a(argument)) return argument;
	  throw $TypeError$4($String$2(argument) + ' is not an object');
	};

	var DESCRIPTORS$d = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$2 = v8PrototypeDefineBug;
	var anObject$h = anObject$i;
	var toPropertyKey$2 = toPropertyKey$4;

	var $TypeError$3 = TypeError;
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$2 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$d ? V8_PROTOTYPE_DEFINE_BUG$2 ? function defineProperty(O, P, Attributes) {
	  anObject$h(O);
	  P = toPropertyKey$2(P);
	  anObject$h(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$2 in Attributes ? Attributes[CONFIGURABLE$2] : current[CONFIGURABLE$2],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$h(O);
	  P = toPropertyKey$2(P);
	  anObject$h(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$3('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$c = descriptors;
	var definePropertyModule$6 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$5;

	var createNonEnumerableProperty$8 = DESCRIPTORS$c ? function (object, key, value) {
	  return definePropertyModule$6.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$2 = {exports: {}};

	var DESCRIPTORS$b = descriptors;
	var hasOwn$d = hasOwnProperty_1;

	var FunctionPrototype$3 = Function.prototype;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getDescriptor$1 = DESCRIPTORS$b && Object.getOwnPropertyDescriptor;

	var EXISTS$1 = hasOwn$d(FunctionPrototype$3, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER$1 = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$b || (DESCRIPTORS$b && getDescriptor$1(FunctionPrototype$3, 'name').configurable));

	var functionName$1 = {
	  EXISTS: EXISTS$1,
	  PROPER: PROPER$1,
	  CONFIGURABLE: CONFIGURABLE$1
	};

	var uncurryThis$u = functionUncurryThis;
	var isCallable$f = isCallable$l;
	var store$2 = sharedStore;

	var functionToString = uncurryThis$u(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$f(store$2.inspectSource)) {
	  store$2.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$3 = store$2.inspectSource;

	var global$n = global$u;
	var isCallable$e = isCallable$l;

	var WeakMap$3 = global$n.WeakMap;

	var weakMapBasicDetection = isCallable$e(WeakMap$3) && /native code/.test(String(WeakMap$3));

	var shared$5 = shared$7.exports;
	var uid$2 = uid$4;

	var keys$5 = shared$5('keys');

	var sharedKey$7 = function (key) {
	  return keys$5[key] || (keys$5[key] = uid$2(key));
	};

	var hiddenKeys$a = {};

	var NATIVE_WEAK_MAP$1 = weakMapBasicDetection;
	var global$m = global$u;
	var uncurryThis$t = functionUncurryThis;
	var isObject$9 = isObject$e;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
	var hasOwn$c = hasOwnProperty_1;
	var shared$4 = sharedStore;
	var sharedKey$6 = sharedKey$7;
	var hiddenKeys$9 = hiddenKeys$a;

	var OBJECT_ALREADY_INITIALIZED$1 = 'Object already initialized';
	var TypeError$8 = global$m.TypeError;
	var WeakMap$2 = global$m.WeakMap;
	var set$1, get$1, has$1;

	var enforce$1 = function (it) {
	  return has$1(it) ? get$1(it) : set$1(it, {});
	};

	var getterFor$1 = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$9(it) || (state = get$1(it)).type !== TYPE) {
	      throw TypeError$8('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP$1 || shared$4.state) {
	  var store$1 = shared$4.state || (shared$4.state = new WeakMap$2());
	  var wmget$1 = uncurryThis$t(store$1.get);
	  var wmhas$1 = uncurryThis$t(store$1.has);
	  var wmset$1 = uncurryThis$t(store$1.set);
	  set$1 = function (it, metadata) {
	    if (wmhas$1(store$1, it)) throw TypeError$8(OBJECT_ALREADY_INITIALIZED$1);
	    metadata.facade = it;
	    wmset$1(store$1, it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return wmget$1(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas$1(store$1, it);
	  };
	} else {
	  var STATE$1 = sharedKey$6('state');
	  hiddenKeys$9[STATE$1] = true;
	  set$1 = function (it, metadata) {
	    if (hasOwn$c(it, STATE$1)) throw TypeError$8(OBJECT_ALREADY_INITIALIZED$1);
	    metadata.facade = it;
	    createNonEnumerableProperty$7(it, STATE$1, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return hasOwn$c(it, STATE$1) ? it[STATE$1] : {};
	  };
	  has$1 = function (it) {
	    return hasOwn$c(it, STATE$1);
	  };
	}

	var internalState$1 = {
	  set: set$1,
	  get: get$1,
	  has: has$1,
	  enforce: enforce$1,
	  getterFor: getterFor$1
	};

	var fails$i = fails$p;
	var isCallable$d = isCallable$l;
	var hasOwn$b = hasOwnProperty_1;
	var DESCRIPTORS$a = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName$1.CONFIGURABLE;
	var inspectSource$2 = inspectSource$3;
	var InternalStateModule$3 = internalState$1;

	var enforceInternalState = InternalStateModule$3.enforce;
	var getInternalState$4 = InternalStateModule$3.get;
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;

	var CONFIGURABLE_LENGTH = DESCRIPTORS$a && !fails$i(function () {
	  return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (String(name).slice(0, 7) === 'Symbol(') {
	    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$b(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$a) defineProperty$4(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$b(options, 'arity') && value.length !== options.arity) {
	    defineProperty$4(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$b(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$a) defineProperty$4(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$b(state, 'source')) {
	    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$d(this) && getInternalState$4(this).source || inspectSource$2(this);
	}, 'toString');

	var isCallable$c = isCallable$l;
	var definePropertyModule$5 = objectDefineProperty;
	var makeBuiltIn = makeBuiltIn$2.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$4 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$c(value)) makeBuiltIn(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$5.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames$1 = {};

	var ceil = Math.ceil;
	var floor$1 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es-x/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$1 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$5 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;

	var max$4 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$5 = function (index, length) {
	  var integer = toIntegerOrInfinity$4(index);
	  return integer < 0 ? max$4(integer + length, 0) : min$3(integer, length);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;

	var min$2 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$3 = function (argument) {
	  return argument > 0 ? min$2(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$2 = toLength$3;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$9 = function (obj) {
	  return toLength$2(obj.length);
	};

	var toIndexedObject$d = toIndexedObject$f;
	var toAbsoluteIndex$4 = toAbsoluteIndex$5;
	var lengthOfArrayLike$8 = lengthOfArrayLike$9;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$8 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$d($this);
	    var length = lengthOfArrayLike$8(O);
	    var index = toAbsoluteIndex$4(fromIndex, length);
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

	var uncurryThis$s = functionUncurryThis;
	var hasOwn$a = hasOwnProperty_1;
	var toIndexedObject$c = toIndexedObject$f;
	var indexOf$2 = arrayIncludes$1.indexOf;
	var hiddenKeys$8 = hiddenKeys$a;

	var push$7 = uncurryThis$s([].push);

	var objectKeysInternal$1 = function (object, names) {
	  var O = toIndexedObject$c(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$a(hiddenKeys$8, key) && hasOwn$a(O, key) && push$7(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$a(O, key = names[i++])) {
	    ~indexOf$2(result, key) || push$7(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$7 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$3 = objectKeysInternal$1;
	var enumBugKeys$6 = enumBugKeys$7;

	var hiddenKeys$7 = enumBugKeys$6.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames$1.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$3(O, hiddenKeys$7);
	};

	var objectGetOwnPropertySymbols$1 = {};

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols$1.f = Object.getOwnPropertySymbols;

	var getBuiltIn$5 = getBuiltIn$8;
	var uncurryThis$r = functionUncurryThis;
	var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames$1;
	var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols$1;
	var anObject$g = anObject$i;

	var concat$8 = uncurryThis$r([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$5 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$2.f(anObject$g(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$3.f;
	  return getOwnPropertySymbols ? concat$8(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$9 = hasOwnProperty_1;
	var ownKeys$4 = ownKeys$5;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$4 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys$4(source);
	  var defineProperty = definePropertyModule$4.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$9(target, key) && !(exceptions && hasOwn$9(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$h = fails$p;
	var isCallable$b = isCallable$l;

	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$b(detection) ? fails$h(detection)
	    : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';

	var isForced_1 = isForced$2;

	var global$l = global$u;
	var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
	var defineBuiltIn$3 = defineBuiltIn$4;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced$1 = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$l;
	  } else if (STATIC) {
	    target = global$l[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$l[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$5(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$6(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$3(target, key, sourceProperty, options);
	  }
	};

	var wellKnownSymbol$j = wellKnownSymbol$l;

	var TO_STRING_TAG$3 = wellKnownSymbol$j('toStringTag');
	var test = {};

	test[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$4 = toStringTagSupport;
	var isCallable$a = isCallable$l;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$i = wellKnownSymbol$l;

	var TO_STRING_TAG$2 = wellKnownSymbol$i('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$c = TO_STRING_TAG_SUPPORT$4 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$a(O.callee) ? 'Arguments' : result;
	};

	var classof$b = classof$c;

	var $String$1 = String;

	var toString$c = function (argument) {
	  if (classof$b(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$1(argument);
	};

	var anObject$f = anObject$i;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$f(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$g = fails$p;
	var global$k = global$u;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$k.RegExp;

	var UNSUPPORTED_Y$2 = fails$g(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y$2 || fails$g(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$g(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$2
	};

	var objectDefineProperties$1 = {};

	var internalObjectKeys$2 = objectKeysInternal$1;
	var enumBugKeys$5 = enumBugKeys$7;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es-x/no-object-keys -- safe
	var objectKeys$6 = Object.keys || function keys(O) {
	  return internalObjectKeys$2(O, enumBugKeys$5);
	};

	var DESCRIPTORS$9 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$e = anObject$i;
	var toIndexedObject$b = toIndexedObject$f;
	var objectKeys$5 = objectKeys$6;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es-x/no-object-defineproperties -- safe
	objectDefineProperties$1.f = DESCRIPTORS$9 && !V8_PROTOTYPE_DEFINE_BUG$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$e(O);
	  var props = toIndexedObject$b(Properties);
	  var keys = objectKeys$5(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$4 = getBuiltIn$8;

	var html$3 = getBuiltIn$4('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$d = anObject$i;
	var definePropertiesModule$2 = objectDefineProperties$1;
	var enumBugKeys$4 = enumBugKeys$7;
	var hiddenKeys$6 = hiddenKeys$a;
	var html$2 = html$3;
	var documentCreateElement$2 = documentCreateElement$3;
	var sharedKey$5 = sharedKey$7;

	var GT$1 = '>';
	var LT$1 = '<';
	var PROTOTYPE$2 = 'prototype';
	var SCRIPT$1 = 'script';
	var IE_PROTO$2 = sharedKey$5('IE_PROTO');

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
	  var iframe = documentCreateElement$2('iframe');
	  var JS = 'java' + SCRIPT$1 + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$2.appendChild(iframe);
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
	    activeXDocument$1 = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject$1 = typeof document != 'undefined'
	    ? document.domain && activeXDocument$1
	      ? NullProtoObjectViaActiveX$1(activeXDocument$1) // old IE
	      : NullProtoObjectViaIFrame$1()
	    : NullProtoObjectViaActiveX$1(activeXDocument$1); // WSH
	  var length = enumBugKeys$4.length;
	  while (length--) delete NullProtoObject$1[PROTOTYPE$2][enumBugKeys$4[length]];
	  return NullProtoObject$1();
	};

	hiddenKeys$6[IE_PROTO$2] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es-x/no-object-create -- safe
	var objectCreate$1 = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor$1[PROTOTYPE$2] = anObject$d(O);
	    result = new EmptyConstructor$1();
	    EmptyConstructor$1[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$2] = O;
	  } else result = NullProtoObject$1();
	  return Properties === undefined ? result : definePropertiesModule$2.f(result, Properties);
	};

	var fails$f = fails$p;
	var global$j = global$u;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$j.RegExp;

	var regexpUnsupportedDotAll = fails$f(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$e = fails$p;
	var global$i = global$u;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$i.RegExp;

	var regexpUnsupportedNcg = fails$e(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$a = functionCall;
	var uncurryThis$q = functionUncurryThis;
	var toString$b = toString$c;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$1 = regexpStickyHelpers;
	var shared$3 = shared$7.exports;
	var create$8 = objectCreate$1;
	var getInternalState$3 = internalState$1.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var nativeReplace = shared$3('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$5 = uncurryThis$q(''.charAt);
	var indexOf$1 = uncurryThis$q(''.indexOf);
	var replace$3 = uncurryThis$q(''.replace);
	var stringSlice$5 = uncurryThis$q(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$a(nativeExec, re1, 'a');
	  call$a(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$3(re);
	    var str = toString$b(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$a(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = call$a(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$3(flags, 'y', '');
	      if (indexOf$1(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$5(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$5(str, re.lastIndex - 1) !== '\n')) {
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

	    match = call$a(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$5(match.input, charsAdded);
	        match[0] = stringSlice$5(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$a(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create$8(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$3 = patchedExec;

	var $$m = _export;
	var exec$2 = regexpExec$3;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$m({ target: 'RegExp', proto: true, forced: /./.exec !== exec$2 }, {
	  exec: exec$2
	});

	var TO_STRING_TAG_SUPPORT$3 = toStringTagSupport;
	var classof$a = classof$c;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString$1 = TO_STRING_TAG_SUPPORT$3 ? {}.toString : function toString() {
	  return '[object ' + classof$a(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var defineBuiltIn$2 = defineBuiltIn$4;
	var toString$a = objectToString$1;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT$2) {
	  defineBuiltIn$2(Object.prototype, 'toString', toString$a, { unsafe: true });
	}

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

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement$1 = documentCreateElement$3;

	var classList = documentCreateElement$1('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var uncurryThis$p = functionUncurryThis;
	var aCallable$2 = aCallable$4;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$a = uncurryThis$p(uncurryThis$p.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$2(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$a(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$9 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es-x/no-array-isarray -- safe
	var isArray$a = Array.isArray || function isArray(argument) {
	  return classof$9(argument) == 'Array';
	};

	var uncurryThis$o = functionUncurryThis;
	var fails$d = fails$p;
	var isCallable$9 = isCallable$l;
	var classof$8 = classof$c;
	var getBuiltIn$3 = getBuiltIn$8;
	var inspectSource$1 = inspectSource$3;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$1 = getBuiltIn$3('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$1 = uncurryThis$o(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$9(argument)) return false;
	  try {
	    construct$1(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$9(argument)) return false;
	  switch (classof$8(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$4 = !construct$1 || fails$d(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$9 = isArray$a;
	var isConstructor$3 = isConstructor$4;
	var isObject$8 = isObject$e;
	var wellKnownSymbol$h = wellKnownSymbol$l;

	var SPECIES$3 = wellKnownSymbol$h('species');
	var $Array$1 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$9(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$3(C) && (C === $Array$1 || isArray$9(C.prototype))) C = undefined;
	    else if (isObject$8(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$1 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$3 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind$9 = functionBindContext;
	var uncurryThis$n = functionUncurryThis;
	var IndexedObject$3 = indexedObject;
	var toObject$8 = toObject$a;
	var lengthOfArrayLike$7 = lengthOfArrayLike$9;
	var arraySpeciesCreate$2 = arraySpeciesCreate$3;

	var push$6 = uncurryThis$n([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$7 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$8($this);
	    var self = IndexedObject$3(O);
	    var boundFunction = bind$9(callbackfn, that);
	    var length = lengthOfArrayLike$7(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$2;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
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
	          case 2: push$6(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$6(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration$1 = {
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
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$7(7)
	};

	var fails$c = fails$p;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$c(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach$1 = arrayIteration$1.forEach;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

	var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$h = global$u;
	var DOMIterables$1 = domIterables$1;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$5(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  if (DOMIterables$1[COLLECTION_NAME$1]) {
	    handlePrototype(global$h[COLLECTION_NAME$1] && global$h[COLLECTION_NAME$1].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	var isCallable$8 = isCallable$l;

	var $String = String;
	var $TypeError$2 = TypeError;

	var aPossiblePrototype$3 = function (argument) {
	  if (typeof argument == 'object' || isCallable$8(argument)) return argument;
	  throw $TypeError$2("Can't set " + $String(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$m = functionUncurryThis;
	var anObject$c = anObject$i;
	var aPossiblePrototype$2 = aPossiblePrototype$3;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
	var objectSetPrototypeOf$1 = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$m(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$c(O);
	    aPossiblePrototype$2(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var isCallable$7 = isCallable$l;
	var isObject$7 = isObject$e;
	var setPrototypeOf$6 = objectSetPrototypeOf$1;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$6 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$7(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$7(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$6($this, NewTargetPrototype);
	  return $this;
	};

	var uncurryThis$l = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$l(1.0.valueOf);

	// a string of all valid unicode whitespaces
	var whitespaces$4 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$k = functionUncurryThis;
	var requireObjectCoercible$6 = requireObjectCoercible$9;
	var toString$9 = toString$c;
	var whitespaces$3 = whitespaces$4;

	var replace$2 = uncurryThis$k(''.replace);
	var whitespace$1 = '[' + whitespaces$3 + ']';
	var ltrim$1 = RegExp('^' + whitespace$1 + whitespace$1 + '*');
	var rtrim$1 = RegExp(whitespace$1 + whitespace$1 + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$6 = function (TYPE) {
	  return function ($this) {
	    var string = toString$9(requireObjectCoercible$6($this));
	    if (TYPE & 1) string = replace$2(string, ltrim$1, '');
	    if (TYPE & 2) string = replace$2(string, rtrim$1, '');
	    return string;
	  };
	};

	var stringTrim$1 = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$6(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$6(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$6(3)
	};

	var DESCRIPTORS$8 = descriptors;
	var global$g = global$u;
	var uncurryThis$j = functionUncurryThis;
	var isForced = isForced_1;
	var defineBuiltIn$1 = defineBuiltIn$4;
	var hasOwn$8 = hasOwnProperty_1;
	var inheritIfRequired = inheritIfRequired$1;
	var isPrototypeOf$a = objectIsPrototypeOf;
	var isSymbol$1 = isSymbol$4;
	var toPrimitive = toPrimitive$2;
	var fails$b = fails$p;
	var getOwnPropertyNames = objectGetOwnPropertyNames$1.f;
	var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$3 = objectDefineProperty.f;
	var thisNumberValue = thisNumberValue$1;
	var trim$4 = stringTrim$1.trim;

	var NUMBER = 'Number';
	var NativeNumber = global$g[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$7 = global$g.TypeError;
	var arraySlice$5 = uncurryThis$j(''.slice);
	var charCodeAt$2 = uncurryThis$j(''.charCodeAt);

	// `ToNumeric` abstract operation
	// https://tc39.es/ecma262/#sec-tonumeric
	var toNumeric = function (value) {
	  var primValue = toPrimitive(value, 'number');
	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, 'number');
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (isSymbol$1(it)) throw TypeError$7('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$4(it);
	    first = charCodeAt$2(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt$2(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt$2(it, 1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = arraySlice$5(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt$2(digits, index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
	    var dummy = this;
	    // check on 1..constructor(foo) case
	    return isPrototypeOf$a(NumberPrototype, dummy) && fails$b(function () { thisNumberValue(dummy); })
	      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
	  };
	  for (var keys$4 = DESCRIPTORS$8 ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys$4.length > j; j++) {
	    if (hasOwn$8(NativeNumber, key = keys$4[j]) && !hasOwn$8(NumberWrapper, key)) {
	      defineProperty$3(NumberWrapper, key, getOwnPropertyDescriptor$4(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  defineBuiltIn$1(global$g, NUMBER, NumberWrapper, { constructor: true });
	}

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var apply$3 = FunctionPrototype$2.apply;
	var call$9 = FunctionPrototype$2.call;

	// eslint-disable-next-line es-x/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$9.bind(apply$3) : function () {
	  return call$9.apply(apply$3, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$i = functionUncurryThis;
	var defineBuiltIn = defineBuiltIn$4;
	var regexpExec$2 = regexpExec$3;
	var fails$a = fails$p;
	var wellKnownSymbol$g = wellKnownSymbol$l;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;

	var SPECIES$2 = wellKnownSymbol$g('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$g(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$a(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$a(function () {
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
	      re.constructor[SPECIES$2] = function () { return re; };
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
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$i(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$i(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn(String.prototype, KEY, methods[0]);
	    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$4(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var isObject$6 = isObject$e;
	var classof$7 = classofRaw$1;
	var wellKnownSymbol$f = wellKnownSymbol$l;

	var MATCH$2 = wellKnownSymbol$f('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp$1 = function (it) {
	  var isRegExp;
	  return isObject$6(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$7(it) == 'RegExp');
	};

	var isConstructor$2 = isConstructor$4;
	var tryToString$1 = tryToString$3;

	var $TypeError$1 = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor$2(argument)) return argument;
	  throw $TypeError$1(tryToString$1(argument) + ' is not a constructor');
	};

	var anObject$b = anObject$i;
	var aConstructor = aConstructor$1;
	var isNullOrUndefined$2 = isNullOrUndefined$5;
	var wellKnownSymbol$e = wellKnownSymbol$l;

	var SPECIES$1 = wellKnownSymbol$e('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$b(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined$2(S = anObject$b(C)[SPECIES$1]) ? defaultConstructor : aConstructor(S);
	};

	var uncurryThis$h = functionUncurryThis;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
	var toString$8 = toString$c;
	var requireObjectCoercible$5 = requireObjectCoercible$9;

	var charAt$4 = uncurryThis$h(''.charAt);
	var charCodeAt$1 = uncurryThis$h(''.charCodeAt);
	var stringSlice$4 = uncurryThis$h(''.slice);

	var createMethod$5 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$8(requireObjectCoercible$5($this));
	    var position = toIntegerOrInfinity$2(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$1(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$4(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$4(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
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

	var charAt$3 = stringMultibyte$1.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$2 = function (S, index, unicode) {
	  return index + (unicode ? charAt$3(S, index).length : 1);
	};

	var toPropertyKey$1 = toPropertyKey$4;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$5;

	var createProperty$6 = function (object, key, value) {
	  var propertyKey = toPropertyKey$1(key);
	  if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$2(0, value));
	  else object[propertyKey] = value;
	};

	var toAbsoluteIndex$3 = toAbsoluteIndex$5;
	var lengthOfArrayLike$6 = lengthOfArrayLike$9;
	var createProperty$5 = createProperty$6;

	var $Array = Array;
	var max$3 = Math.max;

	var arraySliceSimple$1 = function (O, start, end) {
	  var length = lengthOfArrayLike$6(O);
	  var k = toAbsoluteIndex$3(start, length);
	  var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
	  var result = $Array(max$3(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty$5(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	var call$8 = functionCall;
	var anObject$a = anObject$i;
	var isCallable$6 = isCallable$l;
	var classof$6 = classofRaw$1;
	var regexpExec$1 = regexpExec$3;

	var $TypeError = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$6(exec)) {
	    var result = call$8(exec, R, S);
	    if (result !== null) anObject$a(result);
	    return result;
	  }
	  if (classof$6(R) === 'RegExp') return call$8(regexpExec$1, R, S);
	  throw $TypeError('RegExp#exec called on incompatible receiver');
	};

	var apply$2 = functionApply;
	var call$7 = functionCall;
	var uncurryThis$g = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$9 = anObject$i;
	var isNullOrUndefined$1 = isNullOrUndefined$5;
	var isRegExp$1 = isRegexp$1;
	var requireObjectCoercible$4 = requireObjectCoercible$9;
	var speciesConstructor = speciesConstructor$1;
	var advanceStringIndex$1 = advanceStringIndex$2;
	var toLength$1 = toLength$3;
	var toString$7 = toString$c;
	var getMethod$3 = getMethod$5;
	var arraySlice$4 = arraySliceSimple$1;
	var callRegExpExec = regexpExecAbstract;
	var regexpExec = regexpExec$3;
	var stickyHelpers = regexpStickyHelpers;
	var fails$9 = fails$p;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min$1 = Math.min;
	var $push = [].push;
	var exec = uncurryThis$g(/./.exec);
	var push$5 = uncurryThis$g($push);
	var stringSlice$3 = uncurryThis$g(''.slice);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$9(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	// @@split logic
	fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    // eslint-disable-next-line regexp/no-empty-group -- required for testing
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = toString$7(requireObjectCoercible$4(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp$1(separator)) {
	        return call$7(nativeSplit, string, separator, lim);
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
	      while (match = call$7(regexpExec, separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          push$5(output, stringSlice$3(string, lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) apply$2($push, output, arraySlice$4(match, 1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !exec(separatorCopy, '')) push$5(output, '');
	      } else push$5(output, stringSlice$3(string, lastLastIndex));
	      return output.length > lim ? arraySlice$4(output, 0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : call$7(nativeSplit, this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible$4(this);
	      var splitter = isNullOrUndefined$1(separator) ? undefined : getMethod$3(separator, SPLIT);
	      return splitter
	        ? call$7(splitter, separator, O, limit)
	        : call$7(internalSplit, toString$7(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject$9(this);
	      var S = toString$7(string);
	      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

	      if (res.done) return res.value;

	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (UNSUPPORTED_Y ? 'g' : 'y');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$3(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min$1(toLength$1(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex$1(S, q, unicodeMatching);
	        } else {
	          push$5(A, stringSlice$3(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push$5(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push$5(A, stringSlice$3(S, p));
	      return A;
	    }
	  ];
	}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	var concat$7 = {exports: {}};

	var $$l = _export$1;
	var global$f = global$P;
	var fails$8 = fails$y;
	var isArray$8 = isArray$c;
	var isObject$5 = isObject$k;
	var toObject$7 = toObject$d;
	var lengthOfArrayLike$5 = lengthOfArrayLike$b;
	var createProperty$4 = createProperty$8;
	var arraySpeciesCreate$1 = arraySpeciesCreate$5;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
	var wellKnownSymbol$d = wellKnownSymbol$r;
	var V8_VERSION = engineV8Version$1;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$d('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$6 = global$f.TypeError;

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$8(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$3('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$5(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$8(O);
	};

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$l({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$7(this);
	    var A = arraySpeciesCreate$1(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$5(E);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError$6(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$4(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError$6(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty$4(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var entryVirtual$9 = entryVirtual$b;

	var concat$6 = entryVirtual$9('Array').concat;

	var isPrototypeOf$9 = objectIsPrototypeOf$1;
	var method$7 = concat$6;

	var ArrayPrototype$7 = Array.prototype;

	var concat$5 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$7 || (isPrototypeOf$9(ArrayPrototype$7, it) && own === ArrayPrototype$7.concat) ? method$7 : own;
	};

	var parent$A = concat$5;

	var concat$4 = parent$A;

	(function (module) {
		module.exports = concat$4;
	} (concat$7));

	var _concatInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(concat$7.exports);

	var Animation = /*#__PURE__*/function () {
	  function Animation(el) {
	    this.run = 0;
	    this.el = void 0;
	    this.el = el;
	  }

	  var _proto = Animation.prototype;

	  _proto.animate = function animate( // @ts-expect-error
	  _temp, callback) {
	    var _context,
	        _context2,
	        _this = this;

	    var _ref = _temp === void 0 ? {} : _temp,
	        _ref$x = _ref.x,
	        x = _ref$x === void 0 ? 0 : _ref$x,
	        _ref$y = _ref.y,
	        y = _ref$y === void 0 ? 0 : _ref$y,
	        _ref$scale = _ref.scale,
	        scale = _ref$scale === void 0 ? 1 : _ref$scale,
	        _ref$easing = _ref.easing,
	        easing = _ref$easing === void 0 ? 'ease-out' : _ref$easing,
	        _ref$duration = _ref.duration,
	        duration = _ref$duration === void 0 ? 0 : _ref$duration;

	    var run = ++this.run;

	    var transform = _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = "translateX(".concat(x, ") translateY(")).call(_context2, y, ") scale(")).call(_context, scale, ")");

	    if (this.el.style.transform === transform) {
	      callback == null ? void 0 : callback();
	    } else if (duration > 0) {
	      var _context3;

	      var transitionEnd = function transitionEnd() {
	        if (run !== _this.run) return;

	        _this.el.removeEventListener('transitionend', transitionEnd);

	        _this.el.style.transition = 'none';
	        callback == null ? void 0 : callback();
	      };

	      this.el.addEventListener('transitionend', transitionEnd, false);
	      this.el.style.transition = _concatInstanceProperty(_context3 = "transform ".concat(easing, " ")).call(_context3, duration, "ms");
	      this.el.style.transform = transform;
	    } else {
	      this.el.style.transition = 'none';
	      this.el.style.transform = transform;
	      callback == null ? void 0 : callback();
	    }

	    return this;
	  };

	  return _createClass(Animation);
	}();

	var PageSpread = /*#__PURE__*/function () {
	  // @ts-expect-error
	  function PageSpread(el, options) {
	    if (options === void 0) {
	      options = {};
	    }

	    this.visibility = 'gone';
	    this.positioned = false;
	    this.active = false;
	    this.el = void 0;
	    this.options = void 0;
	    this.id = void 0;
	    this.type = void 0;
	    this.pageIds = void 0;
	    this.width = void 0;
	    this.left = void 0;
	    this.maxZoomScale = void 0;
	    this.el = el;
	    this.options = options;
	    this.id = this.options.id;
	    this.type = this.options.type;
	    this.pageIds = this.options.pageIds;
	    this.width = this.options.width;
	    this.left = this.options.left;
	    this.maxZoomScale = this.options.maxZoomScale;
	  }

	  var _proto = PageSpread.prototype;

	  _proto.isZoomable = function isZoomable() {
	    return this.getMaxZoomScale() > 1 && this.getEl().dataset.zoomable !== 'false';
	  };

	  _proto.isScrollable = function isScrollable() {
	    return this.getEl().classList.contains('verso--scrollable');
	  };

	  _proto.getEl = function getEl() {
	    return this.el;
	  };

	  _proto.getOverlayEls = function getOverlayEls() {
	    return this.getEl().querySelectorAll('.verso__overlay');
	  };

	  _proto.getPageEls = function getPageEls() {
	    return this.getEl().querySelectorAll('.verso__page');
	  };

	  _proto.getRect = function getRect() {
	    return this.getEl().getBoundingClientRect();
	  };

	  _proto.getContentRect = function getContentRect() {
	    var _rect$top, _rect$left, _rect$right, _rect$bottom;

	    var rect = {
	      top: null,
	      left: null,
	      right: null,
	      bottom: null,
	      width: null,
	      height: null
	    };
	    var pageEls = this.getPageEls();

	    for (var idx = 0; idx < pageEls.length; idx++) {
	      var pageEl = pageEls[idx];
	      var pageRect = pageEl.getBoundingClientRect();

	      if (rect.top == null || pageRect.top < rect.top) {
	        rect.top = pageRect.top;
	      }

	      if (rect.left == null || pageRect.left < rect.left) {
	        rect.left = pageRect.left;
	      }

	      if (rect.right == null || pageRect.right > rect.right) {
	        rect.right = pageRect.right;
	      }

	      if (rect.bottom == null || pageRect.bottom > rect.bottom) {
	        rect.bottom = pageRect.bottom;
	      }
	    }

	    rect.top = (_rect$top = rect.top) != null ? _rect$top : 0;
	    rect.left = (_rect$left = rect.left) != null ? _rect$left : 0;
	    rect.right = (_rect$right = rect.right) != null ? _rect$right : 0;
	    rect.bottom = (_rect$bottom = rect.bottom) != null ? _rect$bottom : 0;
	    rect.width = rect.right - rect.left;
	    rect.height = rect.bottom - rect.top;
	    return rect;
	  };

	  _proto.getId = function getId() {
	    return this.id;
	  };

	  _proto.getType = function getType() {
	    return this.type;
	  };

	  _proto.getPageIds = function getPageIds() {
	    return this.pageIds;
	  };

	  _proto.getWidth = function getWidth() {
	    return this.width;
	  };

	  _proto.getLeft = function getLeft() {
	    return this.left;
	  };

	  _proto.getMaxZoomScale = function getMaxZoomScale() {
	    return this.maxZoomScale;
	  };

	  _proto.getVisibility = function getVisibility() {
	    return this.visibility;
	  };

	  _proto.setVisibility = function setVisibility(visibility) {
	    if (this.visibility !== visibility) {
	      this.getEl().style.display = visibility === 'visible' ? 'block' : 'none';
	      this.visibility = visibility;
	    }

	    return this;
	  };

	  _proto.position = function position() {
	    if (!this.positioned) {
	      this.getEl().style.left = "".concat(this.getLeft(), "%");
	      this.positioned = true;
	    }

	    return this;
	  };

	  _proto.activate = function activate() {
	    this.active = true; // @ts-expect-error

	    this.getEl().dataset.active = this.active;
	  };

	  _proto.deactivate = function deactivate() {
	    this.active = false; // @ts-expect-error

	    this.getEl().dataset.active = this.active;
	  };

	  return _createClass(PageSpread);
	}();

	var map$3 = {exports: {}};

	var bind$8 = functionBindContext$1;
	var uncurryThis$f = functionUncurryThis$1;
	var IndexedObject$2 = indexedObject$1;
	var toObject$6 = toObject$d;
	var lengthOfArrayLike$4 = lengthOfArrayLike$b;
	var arraySpeciesCreate = arraySpeciesCreate$5;

	var push$4 = uncurryThis$f([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$4 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$6($this);
	    var self = IndexedObject$2(O);
	    var boundFunction = bind$8(callbackfn, that);
	    var length = lengthOfArrayLike$4(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
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
	          case 2: push$4(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$4(target, value);      // filterReject
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
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$4(7)
	};

	var $$k = _export$1;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$k({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$8 = entryVirtual$b;

	var map$2 = entryVirtual$8('Array').map;

	var isPrototypeOf$8 = objectIsPrototypeOf$1;
	var method$6 = map$2;

	var ArrayPrototype$6 = Array.prototype;

	var map$1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$6 || (isPrototypeOf$8(ArrayPrototype$6, it) && own === ArrayPrototype$6.map) ? method$6 : own;
	};

	var parent$z = map$1;

	var map = parent$z;

	(function (module) {
		module.exports = map;
	} (map$3));

	var _mapInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(map$3.exports);

	var trim$3 = {exports: {}};

	var global$e = global$P;
	var classof$5 = classof$f;

	var String$2 = global$e.String;

	var toString$6 = function (argument) {
	  if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$2(argument);
	};

	// a string of all valid unicode whitespaces
	var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$e = functionUncurryThis$1;
	var requireObjectCoercible$3 = requireObjectCoercible$c;
	var toString$5 = toString$6;
	var whitespaces$1 = whitespaces$2;

	var replace$1 = uncurryThis$e(''.replace);
	var whitespace = '[' + whitespaces$1 + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = toString$5(requireObjectCoercible$3($this));
	    if (TYPE & 1) string = replace$1(string, ltrim, '');
	    if (TYPE & 2) string = replace$1(string, rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var DESCRIPTORS$7 = descriptors$1;
	var hasOwn$7 = hasOwnProperty_1$1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$7 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$7(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$7 || (DESCRIPTORS$7 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
	var fails$7 = fails$y;
	var whitespaces = whitespaces$2;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$7(function () {
	    return !!whitespaces[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME$1 && whitespaces[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$j = _export$1;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$j({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var entryVirtual$7 = entryVirtual$b;

	var trim$2 = entryVirtual$7('String').trim;

	var isPrototypeOf$7 = objectIsPrototypeOf$1;
	var method$5 = trim$2;

	var StringPrototype$1 = String.prototype;

	var trim$1 = function (it) {
	  var own = it.trim;
	  return typeof it == 'string' || it === StringPrototype$1
	    || (isPrototypeOf$7(StringPrototype$1, it) && own === StringPrototype$1.trim) ? method$5 : own;
	};

	var parent$y = trim$1;

	var trim = parent$y;

	(function (module) {
		module.exports = trim;
	} (trim$3));

	var _trimInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(trim$3.exports);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_MOUSE = 'mouse';
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
	var TOUCH_INPUT_MAP = {
	  touchstart: INPUT_START,
	  touchmove: INPUT_MOVE,
	  touchend: INPUT_END,
	  touchcancel: INPUT_CANCEL
	};
	/**
	 * @private
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */

	function getDistance(p1, p2, props) {
	  if (props === void 0) {
	    props = PROPS_XY;
	  }

	  var x = p2[props[0]] - p1[props[0]];
	  var y = p2[props[1]] - p1[props[1]];
	  return Math.sqrt(x * x + y * y);
	}
	/**
	 * @private
	 * direction cons to string
	 * @param {constant} direction
	 * @returns {String}
	 */

	function directionStr(direction) {
	  if (direction === DIRECTION_DOWN) return 'down';
	  if (direction === DIRECTION_UP) return 'up';
	  if (direction === DIRECTION_LEFT) return 'left';
	  if (direction === DIRECTION_RIGHT) return 'right';
	  return '';
	}

	function getAngle(p1, p2, props) {
	  if (props === void 0) {
	    props = PROPS_XY;
	  }

	  var x = p2[props[0]] - p1[props[0]];
	  var y = p2[props[1]] - p1[props[1]];
	  return Math.atan2(y, x) * 180 / Math.PI;
	}

	function getCenter(pointers) {
	  var x = 0;
	  var y = 0;
	  pointers.forEach(function (pointer) {
	    x += pointer.clientX;
	    y += pointer.clientY;
	  });
	  return {
	    x: Math.round(x / pointers.length),
	    y: Math.round(y / pointers.length)
	  };
	}

	var getRotation = function getRotation(start, end) {
	  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	};

	var getScale = function getScale(start, end) {
	  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	};

	var getDirection = function getDirection(x, y) {
	  return x === y ? DIRECTION_NONE : Math.abs(x) >= Math.abs(y) ? x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	};

	var getVelocity = function getVelocity(deltaTime, x, y) {
	  return {
	    x: x / deltaTime || 0,
	    y: y / deltaTime || 0
	  };
	};
	/**
	 * @private
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */


	function computeIntervalInputData(session, input) {
	  var last = session.lastInterval || input;
	  var deltaTime = input.timeStamp - last.timeStamp;
	  var velocity;
	  var velocityX;
	  var velocityY;
	  var direction;

	  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	    var deltaX = input.deltaX - last.deltaX;
	    var deltaY = input.deltaY - last.deltaY;
	    var v = getVelocity(deltaTime, deltaX, deltaY);
	    velocityX = v.x;
	    velocityY = v.y;
	    velocity = Math.abs(v.x) > Math.abs(v.y) ? v.x : v.y;
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

	function computeDeltaXY(session, input) {
	  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
	  // jscs throwing error on defalut destructured values and without defaults tests fail

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
	 * @private
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */


	function simpleCloneInputData(input) {
	  var _context;

	  // make a simple copy of the pointers because we will get a reference if we don't
	  // we only need clientXY for the calculations
	  var pointers = _mapInstanceProperty(_context = input.pointers).call(_context, function (_ref) {
	    var clientX = _ref.clientX,
	        clientY = _ref.clientY;
	    return {
	      clientX: Math.round(clientX),
	      clientY: Math.round(clientY)
	    };
	  });

	  return {
	    timeStamp: Date.now(),
	    pointers: pointers,
	    center: getCenter(pointers),
	    deltaX: input.deltaX,
	    deltaY: input.deltaY
	  };
	}
	/**
	 * @private
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

	  var firstInput = session.firstInput,
	      firstMultiple = session.firstMultiple;
	  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	  input.center = getCenter(pointers);
	  input.timeStamp = Date.now();
	  input.deltaTime = input.timeStamp - firstInput.timeStamp;
	  input.angle = getAngle(offsetCenter, input.center);
	  input.distance = getDistance(offsetCenter, input.center);
	  computeDeltaXY(session, input);
	  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	  input.overallVelocityX = overallVelocity.x;
	  input.overallVelocityY = overallVelocity.y;
	  input.overallVelocity = Math.abs(overallVelocity.x) > Math.abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
	  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
	  computeIntervalInputData(session, input); // find the correct target

	  input.target = manager.element.contains(input.srcEvent.target) ? input.srcEvent.target : manager.element;
	}
	/**
	 * @private
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
	  input.isFirst = Boolean(isFirst);
	  input.isFinal = Boolean(isFinal);
	  if (isFirst) manager.session = {}; // source event is the normalized value of the domEvents
	  // like 'touchstart, mouseup, pointerdown'

	  input.eventType = eventType; // compute scale, rotation etc

	  computeInputData(manager, input);
	  manager.recognize(input);
	  manager.session.prevInput = input;
	}

	var addEventListeners = function addEventListeners(target, types, handler) {
	  return _trimInstanceProperty(types).call(types).split(/\s+/g).forEach(function (type) {
	    target.addEventListener(type, handler, false);
	  });
	};

	var removeEventListeners = function removeEventListeners(target, types, handler) {
	  return _trimInstanceProperty(types).call(types).split(/\s+/g).forEach(function (type) {
	    target.removeEventListener(type, handler, false);
	  });
	};
	/**
	 * @private
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */


	function getWindowForElement(element) {
	  var _ref2 = element.ownerDocument || element,
	      defaultView = _ref2.defaultView,
	      parentWindow = _ref2.parentWindow;

	  return defaultView || parentWindow || typeof window !== 'undefined' && window;
	}
	/**
	 * @private
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */


	var Input = /*#__PURE__*/function () {
	  function Input(manager) {
	    var _this = this;

	    this.manager = manager;
	    this.callback = inputHandler;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.

	    this.domHandler = function (ev) {
	      if (manager.options.enable) _this.handler(ev);
	    };
	  }
	  /**
	   * @private
	   * should handle the inputEvent data and trigger the callback
	   * @virtual
	   */


	  var _proto = Input.prototype;

	  _proto.handler = function handler() {}
	  /**
	   * @private
	   * bind the events
	   */
	  ;

	  _proto.init = function init() {
	    var element = this.element,
	        evEl = this.evEl,
	        evTarget = this.evTarget,
	        evWin = this.evWin,
	        domHandler = this.domHandler,
	        target = this.target;
	    if (evEl) addEventListeners(element, evEl, domHandler);
	    if (evTarget) addEventListeners(target, evTarget, domHandler);

	    if (evWin) {
	      addEventListeners(getWindowForElement(element), evWin, domHandler);
	    }
	  }
	  /**
	   * @private
	   * unbind the events
	   */
	  ;

	  _proto.destroy = function destroy() {
	    var element = this.element,
	        evEl = this.evEl,
	        evTarget = this.evTarget,
	        evWin = this.evWin,
	        domHandler = this.domHandler,
	        target = this.target;
	    if (evEl) removeEventListeners(element, evEl, domHandler);
	    if (evTarget) removeEventListeners(target, evTarget, domHandler);

	    if (evWin) {
	      removeEventListeners(getWindowForElement(element), evWin, domHandler);
	    }
	  };

	  return _createClass(Input);
	}();

	var create$7 = {exports: {}};

	var objectDefineProperties = {};

	var toIndexedObject$a = toIndexedObject$h;
	var toAbsoluteIndex$2 = toAbsoluteIndex$7;
	var lengthOfArrayLike$3 = lengthOfArrayLike$b;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$a($this);
	    var length = lengthOfArrayLike$3(O);
	    var index = toAbsoluteIndex$2(fromIndex, length);
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

	var hiddenKeys$5 = {};

	var uncurryThis$d = functionUncurryThis$1;
	var hasOwn$6 = hasOwnProperty_1$1;
	var toIndexedObject$9 = toIndexedObject$h;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$5;

	var push$3 = uncurryThis$d([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$9(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$6(hiddenKeys$4, key) && hasOwn$6(O, key) && push$3(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$6(O, key = names[i++])) {
	    ~indexOf(result, key) || push$3(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$4 = Object.keys || function keys(O) {
	  return internalObjectKeys$1(O, enumBugKeys$2);
	};

	var DESCRIPTORS$6 = descriptors$1;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug$1;
	var definePropertyModule$1 = objectDefineProperty$1;
	var anObject$8 = anObject$k;
	var toIndexedObject$8 = toIndexedObject$h;
	var objectKeys$3 = objectKeys$4;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$6 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$8(O);
	  var props = toIndexedObject$8(Properties);
	  var keys = objectKeys$3(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$2 = getBuiltIn$c;

	var html$1 = getBuiltIn$2('document', 'documentElement');

	var shared$2 = shared$9.exports;
	var uid$1 = uid$6;

	var keys$3 = shared$2('keys');

	var sharedKey$4 = function (key) {
	  return keys$3[key] || (keys$3[key] = uid$1(key));
	};

	/* global ActiveXObject -- old IE, WSH */

	var anObject$7 = anObject$k;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$3 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement = documentCreateElement$4;
	var sharedKey$3 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$3('IE_PROTO');

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
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
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
	    EmptyConstructor[PROTOTYPE$1] = anObject$7(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var $$i = _export$1;
	var DESCRIPTORS$5 = descriptors$1;
	var create$6 = objectCreate;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	$$i({ target: 'Object', stat: true, sham: !DESCRIPTORS$5 }, {
	  create: create$6
	});

	var path$b = path$g;

	var Object$3 = path$b.Object;

	var create$5 = function create(P, D) {
	  return Object$3.create(P, D);
	};

	var parent$x = create$5;

	var create$4 = parent$x;

	var parent$w = create$4;

	var create$3 = parent$w;

	var parent$v = create$3;

	var create$2 = parent$v;

	(function (module) {
		module.exports = create$2;
	} (create$7));

	var _Object$create = /*@__PURE__*/getDefaultExportFromCjs(create$7.exports);

	var setPrototypeOf$5 = {exports: {}};

	var global$d = global$P;
	var isCallable$5 = isCallable$w;

	var String$1 = global$d.String;
	var TypeError$5 = global$d.TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$5(argument)) return argument;
	  throw TypeError$5("Can't set " + String$1(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$c = functionUncurryThis$1;
	var anObject$6 = anObject$k;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$c(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$6(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$h = _export$1;
	var setPrototypeOf$4 = objectSetPrototypeOf;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	$$h({ target: 'Object', stat: true }, {
	  setPrototypeOf: setPrototypeOf$4
	});

	var path$a = path$g;

	var setPrototypeOf$3 = path$a.Object.setPrototypeOf;

	var parent$u = setPrototypeOf$3;

	var setPrototypeOf$2 = parent$u;

	var parent$t = setPrototypeOf$2;

	var setPrototypeOf$1 = parent$t;

	var parent$s = setPrototypeOf$1;

	var setPrototypeOf = parent$s;

	(function (module) {
		module.exports = setPrototypeOf;
	} (setPrototypeOf$5));

	var _Object$setPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(setPrototypeOf$5.exports);

	var bind$7 = {exports: {}};

	var uncurryThis$b = functionUncurryThis$1;

	var arraySlice$3 = uncurryThis$b([].slice);

	var global$c = global$P;
	var uncurryThis$a = functionUncurryThis$1;
	var aCallable$1 = aCallable$7;
	var isObject$4 = isObject$k;
	var hasOwn$5 = hasOwnProperty_1$1;
	var arraySlice$2 = arraySlice$3;

	var Function$1 = global$c.Function;
	var concat$3 = uncurryThis$a([].concat);
	var join = uncurryThis$a([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwn$5(factories, argsLength)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = Function$1('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = Function$1.bind || function bind(that /* , ...args */) {
	  var F = aCallable$1(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice$2(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat$3(partArgs, arraySlice$2(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject$4(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	var $$g = _export$1;
	var bind$6 = functionBind;

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	$$g({ target: 'Function', proto: true }, {
	  bind: bind$6
	});

	var entryVirtual$6 = entryVirtual$b;

	var bind$5 = entryVirtual$6('Function').bind;

	var isPrototypeOf$6 = objectIsPrototypeOf$1;
	var method$4 = bind$5;

	var FunctionPrototype = Function.prototype;

	var bind$4 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || (isPrototypeOf$6(FunctionPrototype, it) && own === FunctionPrototype.bind) ? method$4 : own;
	};

	var parent$r = bind$4;

	var bind$3 = parent$r;

	var parent$q = bind$3;

	var bind$2 = parent$q;

	var parent$p = bind$2;

	var bind$1 = parent$p;

	(function (module) {
		module.exports = bind$1;
	} (bind$7));

	var _bindInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(bind$7.exports);

	function _setPrototypeOf(o, p) {
	  var _context;

	  _setPrototypeOf = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$setPrototypeOf).call(_context) : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });

	  _Object$defineProperty(subClass, "prototype", {
	    writable: false
	  });

	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	var from$6 = {exports: {}};

	var uncurryThis$9 = functionUncurryThis$1;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$9;
	var toString$4 = toString$6;
	var requireObjectCoercible$2 = requireObjectCoercible$c;

	var charAt$2 = uncurryThis$9(''.charAt);
	var charCodeAt = uncurryThis$9(''.charCodeAt);
	var stringSlice$2 = uncurryThis$9(''.slice);

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$4(requireObjectCoercible$2($this));
	    var position = toIntegerOrInfinity$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$2(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$2(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
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

	var global$b = global$P;
	var isCallable$4 = isCallable$w;
	var inspectSource = inspectSource$5;

	var WeakMap$1 = global$b.WeakMap;

	var nativeWeakMap = isCallable$4(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$a = global$P;
	var uncurryThis$8 = functionUncurryThis$1;
	var isObject$3 = isObject$k;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
	var hasOwn$4 = hasOwnProperty_1$1;
	var shared$1 = sharedStore$1;
	var sharedKey$2 = sharedKey$4;
	var hiddenKeys$2 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$4 = global$a.TypeError;
	var WeakMap = global$a.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$4('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  var wmget = uncurryThis$8(store.get);
	  var wmhas = uncurryThis$8(store.has);
	  var wmset = uncurryThis$8(store.set);
	  set = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$2[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$4(it, STATE)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$3(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$4(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$4(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var fails$6 = fails$y;

	var correctPrototypeGetter = !fails$6(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var global$9 = global$P;
	var hasOwn$3 = hasOwnProperty_1$1;
	var isCallable$3 = isCallable$w;
	var toObject$5 = toObject$d;
	var sharedKey$1 = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey$1('IE_PROTO');
	var Object$2 = global$9.Object;
	var ObjectPrototype$1 = Object$2.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$2.getPrototypeOf : function (O) {
	  var object = toObject$5(O);
	  if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$3(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object$2 ? ObjectPrototype$1 : null;
	};

	var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;

	var redefine$3 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$2(target, key, value);
	};

	var fails$5 = fails$y;
	var isCallable$2 = isCallable$w;
	var create$1 = objectCreate;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var redefine$2 = redefine$3;
	var wellKnownSymbol$c = wellKnownSymbol$r;

	var ITERATOR$4 = wellKnownSymbol$c('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails$5(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$1[ITERATOR$4].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};
	else IteratorPrototype$1 = create$1(IteratorPrototype$1);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$2(IteratorPrototype$1[ITERATOR$4])) {
	  redefine$2(IteratorPrototype$1, ITERATOR$4, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$1,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport$1;
	var classof$4 = classof$f;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$4(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport$1;
	var defineProperty$2 = objectDefineProperty$1.f;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;
	var hasOwn$2 = hasOwnProperty_1$1;
	var toString$3 = objectToString;
	var wellKnownSymbol$b = wellKnownSymbol$r;

	var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag');

	var setToStringTag$4 = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!hasOwn$2(target, TO_STRING_TAG$1)) {
	      defineProperty$2(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
	      createNonEnumerableProperty$1(target, 'toString', toString$3);
	    }
	  }
	};

	var iterators = {};

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var create = objectCreate;
	var createPropertyDescriptor$1 = createPropertyDescriptor$9;
	var setToStringTag$3 = setToStringTag$4;
	var Iterators$5 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor$1(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators$5[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var $$f = _export$1;
	var call$6 = functionCall$1;
	var FunctionName = functionName;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf = objectGetPrototypeOf;
	var setToStringTag$2 = setToStringTag$4;
	var redefine$1 = redefine$3;
	var wellKnownSymbol$a = wellKnownSymbol$r;
	var Iterators$4 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$3 = wellKnownSymbol$a('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
	  var nativeIterator = IterablePrototype[ITERATOR$3]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      Iterators$4[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$6(nativeIterator, this); };
	    }
	  }

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
	    } else $$f({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR$3] !== defaultIterator) {
	    redefine$1(IterablePrototype, ITERATOR$3, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$4[NAME] = defaultIterator;

	  return methods;
	};

	var charAt$1 = stringMultibyte.charAt;
	var toString$2 = toString$6;
	var InternalStateModule$2 = internalState;
	var defineIterator$1 = defineIterator$2;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState$2 = InternalStateModule$2.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator$1(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: toString$2(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt$1(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var call$5 = functionCall$1;
	var anObject$5 = anObject$k;
	var getMethod$2 = getMethod$7;

	var iteratorClose$1 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$5(iterator);
	  try {
	    innerResult = getMethod$2(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$5(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$5(innerResult);
	  return value;
	};

	var anObject$4 = anObject$k;
	var iteratorClose = iteratorClose$1;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$4(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose(iterator, 'throw', error);
	  }
	};

	var wellKnownSymbol$9 = wellKnownSymbol$r;
	var Iterators$3 = iterators;

	var ITERATOR$2 = wellKnownSymbol$9('iterator');
	var ArrayPrototype$5 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators$3.Array === it || ArrayPrototype$5[ITERATOR$2] === it);
	};

	var classof$3 = classof$f;
	var getMethod$1 = getMethod$7;
	var Iterators$2 = iterators;
	var wellKnownSymbol$8 = wellKnownSymbol$r;

	var ITERATOR$1 = wellKnownSymbol$8('iterator');

	var getIteratorMethod$7 = function (it) {
	  if (it != undefined) return getMethod$1(it, ITERATOR$1)
	    || getMethod$1(it, '@@iterator')
	    || Iterators$2[classof$3(it)];
	};

	var global$8 = global$P;
	var call$4 = functionCall$1;
	var aCallable = aCallable$7;
	var anObject$3 = anObject$k;
	var tryToString = tryToString$5;
	var getIteratorMethod$6 = getIteratorMethod$7;

	var TypeError$3 = global$8.TypeError;

	var getIterator$1 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$6(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject$3(call$4(iteratorMethod, argument));
	  throw TypeError$3(tryToString(argument) + ' is not iterable');
	};

	var global$7 = global$P;
	var bind = functionBindContext$1;
	var call$3 = functionCall$1;
	var toObject$4 = toObject$d;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var isConstructor$1 = isConstructor$6;
	var lengthOfArrayLike$2 = lengthOfArrayLike$b;
	var createProperty$3 = createProperty$8;
	var getIterator = getIterator$1;
	var getIteratorMethod$5 = getIteratorMethod$7;

	var Array$3 = global$7.Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject$4(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor$1(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod$5(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this == Array$3 && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = getIterator(O, iteratorMethod);
	    next = iterator.next;
	    result = IS_CONSTRUCTOR ? new this() : [];
	    for (;!(step = call$3(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty$3(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike$2(O);
	    result = IS_CONSTRUCTOR ? new this(length) : Array$3(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty$3(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var wellKnownSymbol$7 = wellKnownSymbol$r;

	var ITERATOR = wellKnownSymbol$7('iterator');
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
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
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

	var $$e = _export$1;
	var from$5 = arrayFrom;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$$e({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from$5
	});

	var path$9 = path$g;

	var from$4 = path$9.Array.from;

	var parent$o = from$4;

	var from$3 = parent$o;

	(function (module) {
		module.exports = from$3;
	} (from$6));

	var _Array$from$1 = /*@__PURE__*/getDefaultExportFromCjs(from$6.exports);

	var filter$3 = {exports: {}};

	var $$d = _export$1;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$d({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$5 = entryVirtual$b;

	var filter$2 = entryVirtual$5('Array').filter;

	var isPrototypeOf$5 = objectIsPrototypeOf$1;
	var method$3 = filter$2;

	var ArrayPrototype$4 = Array.prototype;

	var filter$1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$4 || (isPrototypeOf$5(ArrayPrototype$4, it) && own === ArrayPrototype$4.filter) ? method$3 : own;
	};

	var parent$n = filter$1;

	var filter = parent$n;

	(function (module) {
		module.exports = filter;
	} (filter$3));

	var _filterInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(filter$3.exports);

	var findIndex$3 = {exports: {}};

	var $$c = _export$1;
	var $findIndex = arrayIteration.findIndex;

	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-array.prototype.findindex
	$$c({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$4 = entryVirtual$b;

	var findIndex$2 = entryVirtual$4('Array').findIndex;

	var isPrototypeOf$4 = objectIsPrototypeOf$1;
	var method$2 = findIndex$2;

	var ArrayPrototype$3 = Array.prototype;

	var findIndex$1 = function (it) {
	  var own = it.findIndex;
	  return it === ArrayPrototype$3 || (isPrototypeOf$4(ArrayPrototype$3, it) && own === ArrayPrototype$3.findIndex) ? method$2 : own;
	};

	var parent$m = findIndex$1;

	var findIndex = parent$m;

	(function (module) {
		module.exports = findIndex;
	} (findIndex$3));

	var _findIndexInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(findIndex$3.exports);

	/**
	 * @private
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */

	var TouchInput = /*#__PURE__*/function (_Input) {
	  _inherits(TouchInput, _Input);

	  function TouchInput() {
	    var _this;

	    _this = _Input.apply(this, arguments) || this;
	    _this.evTarget = 'touchstart touchmove touchend touchcancel';
	    _this.targetIds = {};

	    _this.init();

	    return _this;
	  }

	  var _proto = TouchInput.prototype;

	  _proto.handler = function handler(ev) {
	    var type = TOUCH_INPUT_MAP[ev.type];
	    var touches = this.getTouches(ev, type);
	    if (!touches) return;
	    this.callback(this.manager, type, {
	      pointers: touches[0],
	      changedPointers: touches[1],
	      pointerType: INPUT_TYPE_TOUCH,
	      srcEvent: ev
	    });
	  };

	  _proto.getTouches = function getTouches(ev, type) {
	    var _this2 = this,
	        _context;

	    var allTouches = _Array$from$1(ev.touches);

	    var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	      targetIds[allTouches[0].identifier] = true;
	      return [allTouches, allTouches];
	    } // get target touches from touches


	    var targetTouches = _filterInstanceProperty(allTouches).call(allTouches, function (touch) {
	      return _this2.target.contains(touch.target);
	    }); // collect touches


	    if (type === INPUT_START) {
	      targetTouches.forEach(function (targetTouch) {
	        targetIds[targetTouch.identifier] = true;
	      });
	    } // filter changed touches to only contain touches that exist in the collected target ids


	    var changedTargetTouches = [];

	    _Array$from$1(ev.changedTouches).forEach(function (changedTouch) {
	      if (targetIds[changedTouch.identifier]) {
	        changedTargetTouches.push(changedTouch);
	      } // cleanup removed touches


	      if (type & (INPUT_END | INPUT_CANCEL)) {
	        delete targetIds[changedTouch.identifier];
	      }
	    });

	    if (!changedTargetTouches.length) return;
	    return [_filterInstanceProperty(_context = _concatInstanceProperty(targetTouches).call(targetTouches, changedTargetTouches)).call(_context, function (item, i, list) {
	      return _findIndexInstanceProperty(list).call(list, function (_ref) {
	        var identifier = _ref.identifier;
	        return identifier === item.identifier;
	      }) === i;
	    }), changedTargetTouches];
	  };

	  return _createClass(TouchInput);
	}(Input);

	var keys$2 = {exports: {}};

	var $$b = _export$1;
	var toObject$3 = toObject$d;
	var nativeKeys = objectKeys$4;
	var fails$4 = fails$y;

	var FAILS_ON_PRIMITIVES$1 = fails$4(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$b({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$3(it));
	  }
	});

	var path$8 = path$g;

	var keys$1 = path$8.Object.keys;

	var parent$l = keys$1;

	var keys = parent$l;

	(function (module) {
		module.exports = keys;
	} (keys$2));

	var _Object$keys = /*@__PURE__*/getDefaultExportFromCjs(keys$2.exports);

	var getOwnPropertySymbols$2 = {exports: {}};

	var objectGetOwnPropertyNames = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNamesExternal = {};

	var global$6 = global$P;
	var toAbsoluteIndex$1 = toAbsoluteIndex$7;
	var lengthOfArrayLike$1 = lengthOfArrayLike$b;
	var createProperty$2 = createProperty$8;

	var Array$2 = global$6.Array;
	var max$2 = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$1(O);
	  var k = toAbsoluteIndex$1(start, length);
	  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
	  var result = Array$2(max$2(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	/* eslint-disable es/no-object-getownpropertynames -- safe */

	var classof$2 = classofRaw$3;
	var toIndexedObject$7 = toIndexedObject$h;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$1 = arraySliceSimple;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$1(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$2(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$7(it));
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$6 = wellKnownSymbol$r;

	wellKnownSymbolWrapped.f = wellKnownSymbol$6;

	var path$7 = path$g;
	var hasOwn$1 = hasOwnProperty_1$1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$1 = objectDefineProperty$1.f;

	var defineWellKnownSymbol$l = function (NAME) {
	  var Symbol = path$7.Symbol || (path$7.Symbol = {});
	  if (!hasOwn$1(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var $$a = _export$1;
	var global$5 = global$P;
	var getBuiltIn$1 = getBuiltIn$c;
	var apply$1 = functionApply$1;
	var call$2 = functionCall$1;
	var uncurryThis$7 = functionUncurryThis$1;
	var DESCRIPTORS$4 = descriptors$1;
	var NATIVE_SYMBOL = nativeSymbol;
	var fails$3 = fails$y;
	var hasOwn = hasOwnProperty_1$1;
	var isArray$7 = isArray$c;
	var isCallable$1 = isCallable$w;
	var isObject$2 = isObject$k;
	var isPrototypeOf$3 = objectIsPrototypeOf$1;
	var isSymbol = isSymbol$7;
	var anObject$2 = anObject$k;
	var toObject$2 = toObject$d;
	var toIndexedObject$6 = toIndexedObject$h;
	var toPropertyKey = toPropertyKey$8;
	var $toString = toString$6;
	var createPropertyDescriptor = createPropertyDescriptor$9;
	var nativeObjectCreate = objectCreate;
	var objectKeys$2 = objectKeys$4;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor$1;
	var definePropertyModule = objectDefineProperty$1;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable$1;
	var arraySlice = arraySlice$3;
	var redefine = redefine$3;
	var shared = shared$9.exports;
	var sharedKey = sharedKey$4;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$6;
	var wellKnownSymbol$5 = wellKnownSymbol$r;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
	var setToStringTag$1 = setToStringTag$4;
	var InternalStateModule$1 = internalState;
	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$1 = InternalStateModule$1.getterFor(SYMBOL);

	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global$5.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$2 = global$5.TypeError;
	var QObject = global$5.QObject;
	var $stringify = getBuiltIn$1('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
	var push$2 = uncurryThis$7([].push);

	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$4 && fails$3(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
	  setInternalState$1(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$4) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$2(O);
	  var key = toPropertyKey(P);
	  anObject$2(Attributes);
	  if (hasOwn(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$2(O);
	  var properties = toIndexedObject$6(Properties);
	  var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS$4 || call$2($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call$2(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$6(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$6(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push$2(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$6(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
	      push$2(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf$3(SymbolPrototype, this)) throw TypeError$2('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) call$2(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (DESCRIPTORS$4 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  redefine(SymbolPrototype, 'toString', function toString() {
	    return getInternalState$1(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule$1.f = $propertyIsEnumerable$1;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$5(name), name);
	  };

	  if (DESCRIPTORS$4) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$1(this).description;
	      }
	    });
	  }
	}

	$$a({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys$2(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol$k(name);
	});

	$$a({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = $toString(key);
	    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError$2(sym + ' is not a symbol');
	    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$a({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$4 }, {
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

	$$a({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$a({ target: 'Object', stat: true, forced: fails$3(function () { getOwnPropertySymbolsModule$2.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule$2.f(toObject$2(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$3(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$a({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice(arguments);
	      var $replacer = replacer;
	      if (!isObject$2(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$7(replacer)) replacer = function (key, value) {
	        if (isCallable$1($replacer)) value = call$2($replacer, this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return apply$1($stringify, null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!SymbolPrototype[TO_PRIMITIVE]) {
	  var valueOf = SymbolPrototype.valueOf;
	  // eslint-disable-next-line no-unused-vars -- required for .length
	  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	    // TODO: improve hint logic
	    return call$2(valueOf, this);
	  });
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$1($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var path$6 = path$g;

	var getOwnPropertySymbols$1 = path$6.Object.getOwnPropertySymbols;

	var parent$k = getOwnPropertySymbols$1;

	var getOwnPropertySymbols = parent$k;

	(function (module) {
		module.exports = getOwnPropertySymbols;
	} (getOwnPropertySymbols$2));

	var _Object$getOwnPropertySymbols = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertySymbols$2.exports);

	var getOwnPropertyDescriptor$3 = {exports: {}};

	var getOwnPropertyDescriptor$2 = {exports: {}};

	var $$9 = _export$1;
	var fails$2 = fails$y;
	var toIndexedObject$5 = toIndexedObject$h;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
	var DESCRIPTORS$3 = descriptors$1;

	var FAILS_ON_PRIMITIVES = fails$2(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED = !DESCRIPTORS$3 || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	$$9({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS$3 }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject$5(it), key);
	  }
	});

	var path$5 = path$g;

	var Object$1 = path$5.Object;

	var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor$2.exports = function getOwnPropertyDescriptor(it, key) {
	  return Object$1.getOwnPropertyDescriptor(it, key);
	};

	if (Object$1.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor$1.sham = true;

	var parent$j = getOwnPropertyDescriptor$2.exports;

	var getOwnPropertyDescriptor = parent$j;

	(function (module) {
		module.exports = getOwnPropertyDescriptor;
	} (getOwnPropertyDescriptor$3));

	var _Object$getOwnPropertyDescriptor = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertyDescriptor$3.exports);

	var getOwnPropertyDescriptors$2 = {exports: {}};

	var getBuiltIn = getBuiltIn$c;
	var uncurryThis$6 = functionUncurryThis$1;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$1 = anObject$k;

	var concat$2 = uncurryThis$6([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$3 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$1(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};

	var $$8 = _export$1;
	var DESCRIPTORS$2 = descriptors$1;
	var ownKeys$2 = ownKeys$3;
	var toIndexedObject$4 = toIndexedObject$h;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor$1;
	var createProperty$1 = createProperty$8;

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	$$8({ target: 'Object', stat: true, sham: !DESCRIPTORS$2 }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject$4(object);
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	    var keys = ownKeys$2(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty$1(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var path$4 = path$g;

	var getOwnPropertyDescriptors$1 = path$4.Object.getOwnPropertyDescriptors;

	var parent$i = getOwnPropertyDescriptors$1;

	var getOwnPropertyDescriptors = parent$i;

	(function (module) {
		module.exports = getOwnPropertyDescriptors;
	} (getOwnPropertyDescriptors$2));

	var _Object$getOwnPropertyDescriptors = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertyDescriptors$2.exports);

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
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

	var assign$3 = {exports: {}};

	var DESCRIPTORS$1 = descriptors$1;
	var uncurryThis$5 = functionUncurryThis$1;
	var call$1 = functionCall$1;
	var fails$1 = fails$y;
	var objectKeys$1 = objectKeys$4;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable$1;
	var toObject$1 = toObject$d;
	var IndexedObject$1 = indexedObject$1;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty = Object.defineProperty;
	var concat$1 = uncurryThis$5([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$1(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$1 && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$1(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$1(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$1 || call$1(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$7 = _export$1;
	var assign$2 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$7({ target: 'Object', stat: true, forced: Object.assign !== assign$2 }, {
	  assign: assign$2
	});

	var path$3 = path$g;

	var assign$1 = path$3.Object.assign;

	var parent$h = assign$1;

	var assign = parent$h;

	(function (module) {
		module.exports = assign;
	} (assign$3));

	var _Object$assign = /*@__PURE__*/getDefaultExportFromCjs(assign$3.exports);

	var find$3 = {exports: {}};

	var $$6 = _export$1;
	var $find = arrayIteration.find;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$6({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$3 = entryVirtual$b;

	var find$2 = entryVirtual$3('Array').find;

	var isPrototypeOf$2 = objectIsPrototypeOf$1;
	var method$1 = find$2;

	var ArrayPrototype$2 = Array.prototype;

	var find$1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype$2 || (isPrototypeOf$2(ArrayPrototype$2, it) && own === ArrayPrototype$2.find) ? method$1 : own;
	};

	var parent$g = find$1;

	var find = parent$g;

	(function (module) {
		module.exports = find;
	} (find$3));

	var _findInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(find$3.exports);

	var slice$6 = {exports: {}};

	var $$5 = _export$1;
	var global$4 = global$P;
	var isArray$6 = isArray$c;
	var isConstructor = isConstructor$6;
	var isObject$1 = isObject$k;
	var toAbsoluteIndex = toAbsoluteIndex$7;
	var lengthOfArrayLike = lengthOfArrayLike$b;
	var toIndexedObject$3 = toIndexedObject$h;
	var createProperty = createProperty$8;
	var wellKnownSymbol$4 = wellKnownSymbol$r;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;
	var un$Slice = arraySlice$3;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

	var SPECIES = wellKnownSymbol$4('species');
	var Array$1 = global$4.Array;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$3(this);
	    var length = lengthOfArrayLike(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$6(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor(Constructor) && (Constructor === Array$1 || isArray$6(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$1(Constructor)) {
	        Constructor = Constructor[SPECIES];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array$1 || Constructor === undefined) {
	        return un$Slice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array$1 : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var entryVirtual$2 = entryVirtual$b;

	var slice$5 = entryVirtual$2('Array').slice;

	var isPrototypeOf$1 = objectIsPrototypeOf$1;
	var method = slice$5;

	var ArrayPrototype$1 = Array.prototype;

	var slice$4 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$1 || (isPrototypeOf$1(ArrayPrototype$1, it) && own === ArrayPrototype$1.slice) ? method : own;
	};

	var parent$f = slice$4;

	var slice$3 = parent$f;

	(function (module) {
		module.exports = slice$3;
	} (slice$6));

	var _sliceInstanceProperty$1 = /*@__PURE__*/getDefaultExportFromCjs(slice$6.exports);

	var entries$2 = {exports: {}};

	var DESCRIPTORS = descriptors$1;
	var uncurryThis$4 = functionUncurryThis$1;
	var objectKeys = objectKeys$4;
	var toIndexedObject$2 = toIndexedObject$h;
	var $propertyIsEnumerable = objectPropertyIsEnumerable$1.f;

	var propertyIsEnumerable = uncurryThis$4($propertyIsEnumerable);
	var push$1 = uncurryThis$4([].push);

	// `Object.{ entries, values }` methods implementation
	var createMethod = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$2(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
	        push$1(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod(false)
	};

	var $$4 = _export$1;
	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	$$4({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var path$2 = path$g;

	var entries$1 = path$2.Object.entries;

	var parent$e = entries$1;

	var entries = parent$e;

	(function (module) {
		module.exports = entries;
	} (entries$2));

	var _Object$entries = /*@__PURE__*/getDefaultExportFromCjs(entries$2.exports);

	var MOUSE_INPUT_MAP = {
	  mousedown: INPUT_START,
	  mousemove: INPUT_MOVE,
	  mouseup: INPUT_END
	};
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	/**
	 * @private
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */

	var MouseInput = /*#__PURE__*/function (_Input) {
	  _inherits(MouseInput, _Input);

	  // mousedown state
	  function MouseInput() {
	    var _this;

	    _this = _Input.apply(this, arguments) || this;
	    _this.evEl = MOUSE_ELEMENT_EVENTS;
	    _this.evWin = MOUSE_WINDOW_EVENTS;
	    _this.pressed = false;

	    _this.init();

	    return _this;
	  }
	  /**
	   * @private
	   * handle mouse events
	   * @param {Object} ev
	   */


	  var _proto = MouseInput.prototype;

	  _proto.handler = function handler(ev) {
	    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

	    if (eventType & INPUT_START && ev.button === 0) this.pressed = true;
	    if (eventType & INPUT_MOVE && ev.which !== 1) eventType = INPUT_END; // mouse must be down

	    if (!this.pressed) return;
	    if (eventType & INPUT_END) this.pressed = false;
	    this.callback(this.manager, eventType, {
	      pointers: [ev],
	      changedPointers: [ev],
	      pointerType: INPUT_TYPE_MOUSE,
	      srcEvent: ev
	    });
	  };

	  return _createClass(MouseInput);
	}(Input);

	var uncurryThis$3 = functionUncurryThis;
	var toObject = toObject$a;

	var floor = Math.floor;
	var charAt = uncurryThis$3(''.charAt);
	var replace = uncurryThis$3(''.replace);
	var stringSlice$1 = uncurryThis$3(''.slice);
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$1(str, 0, position);
	      case "'": return stringSlice$1(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var apply = functionApply;
	var call = functionCall;
	var uncurryThis$2 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var fails = fails$p;
	var anObject = anObject$i;
	var isCallable = isCallable$l;
	var isNullOrUndefined = isNullOrUndefined$5;
	var toIntegerOrInfinity = toIntegerOrInfinity$5;
	var toLength = toLength$3;
	var toString$1 = toString$c;
	var requireObjectCoercible$1 = requireObjectCoercible$9;
	var advanceStringIndex = advanceStringIndex$2;
	var getMethod = getMethod$5;
	var getSubstitution = getSubstitution$1;
	var regExpExec = regexpExecAbstract;
	var wellKnownSymbol$3 = wellKnownSymbol$l;

	var REPLACE = wellKnownSymbol$3('replace');
	var max = Math.max;
	var min = Math.min;
	var concat = uncurryThis$2([].concat);
	var push = uncurryThis$2([].push);
	var stringIndexOf$1 = uncurryThis$2(''.indexOf);
	var stringSlice = uncurryThis$2(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$1(this);
	      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
	      return replacer
	        ? call(replacer, searchValue, O, replaceValue)
	        : call(nativeReplace, toString$1(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject(this);
	      var S = toString$1(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf$1(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable(replaceValue);
	      if (!functionalReplace) replaceValue = toString$1(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec(rx, S);
	        if (result === null) break;

	        push(results, result);
	        if (!global) break;

	        var matchStr = toString$1(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$1(result[0]);
	        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat([matched], captures, position, S);
	          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
	          var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + stringSlice(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var POINTER_INPUT_MAP = {
	  pointerdown: INPUT_START,
	  pointermove: INPUT_MOVE,
	  pointerup: INPUT_END,
	  pointercancel: INPUT_CANCEL,
	  pointerout: INPUT_CANCEL
	};
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	/**
	 * @private
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */

	var PointerEventInput = /*#__PURE__*/function (_Input) {
	  _inherits(PointerEventInput, _Input);

	  function PointerEventInput() {
	    var _this;

	    _this = _Input.apply(this, arguments) || this;
	    _this.evEl = POINTER_ELEMENT_EVENTS;
	    _this.evWin = POINTER_WINDOW_EVENTS;
	    _this.store = _this.manager.session.pointerEvents = [];

	    _this.init();

	    return _this;
	  }
	  /**
	   * @private
	   * handle mouse events
	   * @param {Object} ev
	   */


	  var _proto = PointerEventInput.prototype;

	  _proto.handler = function handler(ev) {
	    var store = this.store;
	    var removePointer = false;
	    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	    var pointerType = ev.pointerType;
	    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

	    var storeIndex = _findIndexInstanceProperty(store).call(store, function (_ref) {
	      var pointerId = _ref.pointerId;
	      return pointerId === ev.pointerId;
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

	    if (removePointer) _spliceInstanceProperty(store).call(store, storeIndex, 1);
	  };

	  return _createClass(PointerEventInput);
	}(Input);

	var isArray$5 = {exports: {}};

	var $$3 = _export$1;
	var isArray$4 = isArray$c;

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	$$3({ target: 'Array', stat: true }, {
	  isArray: isArray$4
	});

	var path$1 = path$g;

	var isArray$3 = path$1.Array.isArray;

	var parent$d = isArray$3;

	var isArray$2 = parent$d;

	var parent$c = isArray$2;

	var isArray$1 = parent$c;

	var parent$b = isArray$1;

	var isArray = parent$b;

	(function (module) {
		module.exports = isArray;
	} (isArray$5));

	var _Array$isArray = /*@__PURE__*/getDefaultExportFromCjs(isArray$5.exports);

	function _arrayWithHoles(arr) {
	  if (_Array$isArray(arr)) return arr;
	}

	var symbol$4 = {exports: {}};

	var defineWellKnownSymbol$j = defineWellKnownSymbol$l;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol$j('asyncIterator');

	var defineWellKnownSymbol$i = defineWellKnownSymbol$l;

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol$i('hasInstance');

	var defineWellKnownSymbol$h = defineWellKnownSymbol$l;

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol$h('isConcatSpreadable');

	var defineWellKnownSymbol$g = defineWellKnownSymbol$l;

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$g('iterator');

	var defineWellKnownSymbol$f = defineWellKnownSymbol$l;

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol$f('match');

	var defineWellKnownSymbol$e = defineWellKnownSymbol$l;

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol$e('matchAll');

	var defineWellKnownSymbol$d = defineWellKnownSymbol$l;

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol$d('replace');

	var defineWellKnownSymbol$c = defineWellKnownSymbol$l;

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol$c('search');

	var defineWellKnownSymbol$b = defineWellKnownSymbol$l;

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol$b('species');

	var defineWellKnownSymbol$a = defineWellKnownSymbol$l;

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol$a('split');

	var defineWellKnownSymbol$9 = defineWellKnownSymbol$l;

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol$9('toPrimitive');

	var defineWellKnownSymbol$8 = defineWellKnownSymbol$l;

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol$8('toStringTag');

	var defineWellKnownSymbol$7 = defineWellKnownSymbol$l;

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol$7('unscopables');

	var global$3 = global$P;
	var setToStringTag = setToStringTag$4;

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag(global$3.JSON, 'JSON', true);

	var path = path$g;

	var symbol$3 = path.Symbol;

	var toIndexedObject$1 = toIndexedObject$h;
	var Iterators$1 = iterators;
	var InternalStateModule = internalState;
	objectDefineProperty$1.f;
	var defineIterator = defineIterator$2;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

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
	Iterators$1.Arguments = Iterators$1.Array;

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

	var DOMIterables = domIterables;
	var global$2 = global$P;
	var classof$1 = classof$f;
	var createNonEnumerableProperty = createNonEnumerableProperty$a;
	var Iterators = iterators;
	var wellKnownSymbol$2 = wellKnownSymbol$r;

	var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$2[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof$1(CollectionPrototype) !== TO_STRING_TAG) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	  }
	  Iterators[COLLECTION_NAME] = Iterators.Array;
	}

	var parent$a = symbol$3;


	var symbol$2 = parent$a;

	var parent$9 = symbol$2;

	var symbol$1 = parent$9;

	var defineWellKnownSymbol$6 = defineWellKnownSymbol$l;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$6('asyncDispose');

	var defineWellKnownSymbol$5 = defineWellKnownSymbol$l;

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$5('dispose');

	var defineWellKnownSymbol$4 = defineWellKnownSymbol$l;

	// `Symbol.matcher` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$4('matcher');

	var defineWellKnownSymbol$3 = defineWellKnownSymbol$l;

	// `Symbol.metadata` well-known symbol
	// https://github.com/tc39/proposal-decorators
	defineWellKnownSymbol$3('metadata');

	var defineWellKnownSymbol$2 = defineWellKnownSymbol$l;

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol$2('observable');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol$1 = defineWellKnownSymbol$l;

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$1('patternMatch');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol = defineWellKnownSymbol$l;

	defineWellKnownSymbol('replaceAll');

	var parent$8 = symbol$1;





	// TODO: Remove from `core-js@4`

	// TODO: Remove from `core-js@4`


	var symbol = parent$8;

	(function (module) {
		module.exports = symbol;
	} (symbol$4));

	var _Symbol = /*@__PURE__*/getDefaultExportFromCjs(symbol$4.exports);

	var getIteratorMethod$4 = {exports: {}};

	var getIteratorMethod$3 = getIteratorMethod$7;

	var getIteratorMethod_1 = getIteratorMethod$3;

	var parent$7 = getIteratorMethod_1;


	var getIteratorMethod$2 = parent$7;

	var parent$6 = getIteratorMethod$2;

	var getIteratorMethod$1 = parent$6;

	var parent$5 = getIteratorMethod$1;

	var getIteratorMethod = parent$5;

	(function (module) {
		module.exports = getIteratorMethod;
	} (getIteratorMethod$4));

	var _getIteratorMethod = /*@__PURE__*/getDefaultExportFromCjs(getIteratorMethod$4.exports);

	function _iterableToArrayLimit(arr, i) {
	  var _i = arr == null ? null : typeof _Symbol !== "undefined" && _getIteratorMethod(arr) || arr["@@iterator"];

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

	var slice$2 = {exports: {}};

	var parent$4 = slice$3;

	var slice$1 = parent$4;

	var parent$3 = slice$1;

	var slice = parent$3;

	(function (module) {
		module.exports = slice;
	} (slice$2));

	var _sliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(slice$2.exports);

	var from$2 = {exports: {}};

	var parent$2 = from$3;

	var from$1 = parent$2;

	var parent$1 = from$1;

	var from = parent$1;

	(function (module) {
		module.exports = from;
	} (from$2));

	var _Array$from = /*@__PURE__*/getDefaultExportFromCjs(from$2.exports);

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

	  var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return _Array$from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	/**
	 * @private
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

	var TouchMouseInput = /*#__PURE__*/function (_Input) {
	  _inherits(TouchMouseInput, _Input);

	  function TouchMouseInput() {
	    var _this;

	    _this = _Input.apply(this, arguments) || this;
	    _this.primaryTouch = null;
	    _this.lastTouches = [];

	    _this.handler = function (manager, inputEvent, inputData) {
	      var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
	      var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

	      if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	        return;
	      } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


	      if (isTouch) {
	        if (inputEvent & INPUT_START) {
	          _this.primaryTouch = inputData.changedPointers[0].identifier;

	          _this.setLastTouch(inputData);
	        } else if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
	          _this.setLastTouch(inputData);
	        }
	      } else if (isMouse && _this.isSyntheticEvent(inputData)) {
	        return;
	      }

	      _this.callback(manager, inputEvent, inputData);
	    };

	    _this.touch = new TouchInput(_this.manager, _this.handler);
	    _this.mouse = new MouseInput(_this.manager, _this.handler);

	    _this.init();

	    return _this;
	  }
	  /**
	   * @private
	   * handle mouse and touch events
	   * @param {Hammer} manager
	   * @param {String} inputEvent
	   * @param {Object} inputData
	   */


	  var _proto = TouchMouseInput.prototype;

	  /**
	   * @private
	   * remove the event listeners
	   */
	  _proto.destroy = function destroy() {
	    this.touch.destroy();
	    this.mouse.destroy();
	  };

	  _proto.isSyntheticEvent = function isSyntheticEvent(_ref) {
	    var _ref$srcEvent = _ref.srcEvent,
	        clientX = _ref$srcEvent.clientX,
	        clientY = _ref$srcEvent.clientY;
	    return this.lastTouches.some(function (_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y;
	      return Math.abs(clientX - x) <= DEDUP_DISTANCE && Math.abs(clientY - y) <= DEDUP_DISTANCE;
	    });
	  };

	  _proto.setLastTouch = function setLastTouch(_ref3) {
	    var _ref3$changedPointers = _slicedToArray(_ref3.changedPointers, 1),
	        _ref3$changedPointers2 = _ref3$changedPointers[0],
	        identifier = _ref3$changedPointers2.identifier,
	        clientX = _ref3$changedPointers2.clientX,
	        clientY = _ref3$changedPointers2.clientY;

	    if (identifier === this.primaryTouch) {
	      var lastTouch = {
	        x: clientX,
	        y: clientY
	      };
	      this.lastTouches.push(lastTouch);
	      var lts = this.lastTouches;
	      setTimeout(function () {
	        var i = lts.indexOf(lastTouch);
	        if (i > -1) _spliceInstanceProperty(lts).call(lts, i, 1);
	      }, DEDUP_TIMEOUT);
	    }
	  };

	  return _createClass(TouchMouseInput);
	}(Input);

	function ownKeys$1(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	function stateStr(state) {
	  if (state & STATE_CANCELLED) return 'cancel';
	  if (state & STATE_ENDED) return 'end';
	  if (state & STATE_CHANGED) return 'move';
	  if (state & STATE_BEGAN) return 'start';
	  return '';
	}
	/**
	 * @private
	 * get a unique id
	 * @returns {number} uniqueId
	 */


	var _uniqueId = 1;

	var uniqueId = function uniqueId() {
	  return _uniqueId++;
	};
	/**
	 * @private
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

	/**
	 * @private
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */


	var Recognizer = /*#__PURE__*/function () {
	  function Recognizer(options) {
	    var _this$options$enable;

	    this.id = uniqueId();
	    this.manager = null;
	    this.state = STATE_POSSIBLE;
	    this.simultaneous = {};
	    this.requireFail = [];
	    this.options = _objectSpread$1({}, this.defaults, options);
	    this.options.enable = (_this$options$enable = this.options.enable) != null ? _this$options$enable : true;
	  }
	  /**
	   * @private
	   * set options
	   * @param {Object} options
	   * @return {Recognizer}
	   */


	  var _proto = Recognizer.prototype;

	  _proto.set = function set(options) {
	    _Object$assign(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state


	    if (this.manager) this.manager.touchAction.update();
	    return this;
	  }
	  /**
	   * @private
	   * You should use `tryEmit` instead of `emit` directly to check
	   * that all the needed recognizers has failed before emitting.
	   * @param {Object} input
	   */
	  ;

	  _proto.emit = function emit(input) {
	    var manager = this.manager,
	        options = this.options,
	        state = this.state;

	    var emit = function emit(event) {
	      return manager.emit(event, input);
	    }; // 'panstart' and 'panmove'


	    if (state < STATE_ENDED) emit(options.event + stateStr(state));
	    emit(this.options.event); // simple 'eventName' events
	    // additional event(panleft, panright, pinchin, pinchout...)

	    if (input.additionalEvent) emit(input.additionalEvent); // panend and pancancel

	    if (state >= STATE_ENDED) emit(options.event + stateStr(state));
	  }
	  /**
	   * @private
	   * update the recognizer
	   * @param {Object} inputData
	   */
	  ;

	  _proto.recognize = function recognize(inputData) {
	    // make a new copy of the inputData
	    // so we can change the inputData without messing up the other recognizers
	    // is is enabled and allow recognizing?
	    if (!this.options.enable) {
	      this.reset();
	      this.state = STATE_FAILED;
	      return;
	    } // reset when we've reached the end


	    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	      this.state = STATE_POSSIBLE;
	    }

	    var inputDataClone = _objectSpread$1({}, inputData);

	    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
	    // so trigger an event

	    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	      this.emit(inputDataClone);
	    }
	  }
	  /**
	   * @private
	   * return the state of the recognizer
	   * the actual recognizing happens in this method
	   * @virtual
	   * @param {Object} inputData
	   * @returns {constant} STATE
	   */

	  /* jshint ignore:start */
	  ;

	  _proto.process = function process() {}
	  /* jshint ignore:end */

	  /**
	   * @private
	   * return the preferred touch-action
	   * @virtual
	   * @returns {Array}
	   */
	  ;

	  _proto.getTouchAction = function getTouchAction() {}
	  /**
	   * @private
	   * called when the gesture isn't allowed to recognize
	   * like when another is being recognized or it is disabled
	   * @virtual
	   */
	  ;

	  _proto.reset = function reset() {};

	  return _createClass(Recognizer);
	}();

	var includes$4 = {exports: {}};

	var $$2 = _export$1;
	var $includes = arrayIncludes.includes;

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$2({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$1 = entryVirtual$b;

	var includes$3 = entryVirtual$1('Array').includes;

	var isObject = isObject$k;
	var classof = classofRaw$3;
	var wellKnownSymbol$1 = wellKnownSymbol$r;

	var MATCH$1 = wellKnownSymbol$1('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
	};

	var global$1 = global$P;
	var isRegExp = isRegexp;

	var TypeError$1 = global$1.TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw TypeError$1("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol = wellKnownSymbol$r;

	var MATCH = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$1 = _export$1;
	var uncurryThis$1 = functionUncurryThis$1;
	var notARegExp = notARegexp;
	var requireObjectCoercible = requireObjectCoercible$c;
	var toString = toString$6;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringIndexOf = uncurryThis$1(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$$1({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString(requireObjectCoercible(this)),
	      toString(notARegExp(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var entryVirtual = entryVirtual$b;

	var includes$2 = entryVirtual('String').includes;

	var isPrototypeOf = objectIsPrototypeOf$1;
	var arrayMethod = includes$3;
	var stringMethod = includes$2;

	var ArrayPrototype = Array.prototype;
	var StringPrototype = String.prototype;

	var includes$1 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.includes)) return arrayMethod;
	  if (typeof it == 'string' || it === StringPrototype || (isPrototypeOf(StringPrototype, it) && own === StringPrototype.includes)) {
	    return stringMethod;
	  } return own;
	};

	var parent = includes$1;

	var includes = parent;

	(function (module) {
		module.exports = includes;
	} (includes$4));

	var _includesInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(includes$4.exports);

	var $ = _export;
	var uncurryThis = functionUncurryThis;
	var IndexedObject = indexedObject;
	var toIndexedObject = toIndexedObject$f;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;

	var nativeJoin = uncurryThis([].join);

	var ES3_STRINGS = IndexedObject != Object;
	var STRICT_METHOD = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	/**
	 * @private
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */

	function prefixed(obj, property) {
	  var camelProp = property[0].toUpperCase() + _sliceInstanceProperty$1(property).call(property, 1);

	  return _findInstanceProperty(VENDOR_PREFIXES).call(VENDOR_PREFIXES, function (prefix) {
	    return (prefix ? prefix + camelProp : property) in obj;
	  });
	}

	var _window$CSS;
	var PREFIXED_TOUCH_ACTION = typeof document !== 'undefined' && prefixed(document.createElement('div').style, 'touchAction'); // magical touchAction value

	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_NONE = 'none';
	var actions = ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'];
	var cssSupports = typeof window !== 'undefined' && ((_window$CSS = window.CSS) == null ? void 0 : _window$CSS.supports);
	var TOUCH_ACTION_MAP = PREFIXED_TOUCH_ACTION && actions.reduce(function (touchMap, val) {
	  // If css.supports is not supported but there is native touch-action assume it supports
	  // all values. This is the case for IE 10 and 11.
	  touchMap[val] = cssSupports ? cssSupports('touch-action', val) : true;
	  return touchMap;
	}, {});

	function cleanTouchActions(actions) {
	  // none
	  if (_includesInstanceProperty(actions).call(actions, TOUCH_ACTION_NONE)) return TOUCH_ACTION_NONE;

	  var hasPanX = _includesInstanceProperty(actions).call(actions, TOUCH_ACTION_PAN_X);

	  var hasPanY = _includesInstanceProperty(actions).call(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
	  // for different directions, e.g. horizontal pan but vertical swipe?)
	  // we need none (as otherwise with pan-x pan-y combined none of these
	  // recognizers will work, since the browser would handle all panning


	  if (hasPanX && hasPanY) return TOUCH_ACTION_NONE; // pan-x OR pan-y

	  if (hasPanX) return TOUCH_ACTION_PAN_X;
	  if (hasPanY) return TOUCH_ACTION_PAN_Y; // manipulation

	  var hasManipulation = _includesInstanceProperty(actions).call(actions, TOUCH_ACTION_MANIPULATION);

	  if (hasManipulation) return TOUCH_ACTION_MANIPULATION;
	  return TOUCH_ACTION_AUTO;
	}
	/**
	 * @private
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */


	var TouchAction = /*#__PURE__*/function () {
	  function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	  }
	  /**
	   * @private
	   * set the touchAction value on the element or enable the polyfill
	   * @param {String} value
	   */


	  var _proto = TouchAction.prototype;

	  _proto.set = function set(value) {
	    var _context;

	    // find out the touch-action by the event handlers
	    if (value === TOUCH_ACTION_COMPUTE) value = this.compute();

	    if (PREFIXED_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	    }

	    this.actions = _trimInstanceProperty(_context = value.toLowerCase()).call(_context);
	  }
	  /**
	   * @private
	   * just re-set the touchAction value
	   */
	  ;

	  _proto.update = function update() {
	    this.set(this.manager.options.touchAction);
	  }
	  /**
	   * @private
	   * compute the value for the touchAction property based on the recognizer's settings
	   * @returns {String} value
	   */
	  ;

	  _proto.compute = function compute() {
	    return cleanTouchActions(this.manager.recognizers.reduce(function (actions, recognizer) {
	      return recognizer.options.enable ? _concatInstanceProperty(actions).call(actions, recognizer.getTouchAction()) : actions;
	    }, []).join(' '));
	  }
	  /**
	   * @private
	   * this method is called on each input cycle and provides the preventing of the browser behavior
	   * @param {Object} input
	   */
	  ;

	  _proto.preventDefaults = function preventDefaults(_ref) {
	    var _context2, _context3, _context4;

	    var srcEvent = _ref.srcEvent,
	        pointers = _ref.pointers,
	        distance = _ref.distance,
	        deltaTime = _ref.deltaTime,
	        offsetDirection = _ref.offsetDirection;
	    // if the touch action did prevented once this session
	    if (this.manager.session.prevented) return srcEvent.preventDefault();
	    var hasNone = _includesInstanceProperty(_context2 = this.actions).call(_context2, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE]; // do not prevent defaults if this is a tap gesture

	    if (hasNone && pointers.length === 1 && distance < 2 && deltaTime < 250) return;
	    var hasPanY = _includesInstanceProperty(_context3 = this.actions).call(_context3, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	    var hasPanX = _includesInstanceProperty(_context4 = this.actions).call(_context4, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X]; // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent

	    if (hasPanX && hasPanY) return;

	    if (hasNone || hasPanY && offsetDirection & DIRECTION_HORIZONTAL || hasPanX && offsetDirection & DIRECTION_VERTICAL) {
	      this.manager.session.prevented = true;
	      srcEvent.preventDefault();
	    }
	  };

	  return _createClass(TouchAction);
	}();

	function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
	var SUPPORT_TOUCH = typeof window !== 'undefined' && 'ontouchstart' in window;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent);
	var SUPPORT_POINTER_EVENTS = typeof window !== 'undefined' && Boolean(prefixed(window, 'PointerEvent'));
	/**
	 * @private
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */

	function createInputInstance(manager) {
	  var inputClass = manager.options.inputClass;
	  if (inputClass) return new inputClass(manager);
	  if (SUPPORT_POINTER_EVENTS) return new PointerEventInput(manager);
	  if (SUPPORT_ONLY_TOUCH) return new TouchInput(manager);
	  if (!SUPPORT_TOUCH) return new MouseInput(manager);
	  return new TouchMouseInput(manager);
	}

	var defaults = {
	  /**
	   * @private
	   * set if DOM events are being triggered.
	   * But this is slower and unused by simple implementations, so disabled by default.
	   * @type {Boolean}
	   * @default false
	   */
	  domEvents: false,

	  /**
	   * @private
	   * The value for the touchAction property/fallback.
	   * When set to `compute` it will magically set the correct value based on the added recognizers.
	   * @type {String}
	   * @default compute
	   */
	  touchAction: TOUCH_ACTION_COMPUTE,

	  /**
	   * @private
	   * @type {Boolean}
	   * @default true
	   */
	  enable: true,

	  /**
	   * @private
	   * EXPERIMENTAL FEATURE -- can be removed/changed
	   * Change the parent input target element.
	   * If Null, then it is being set the to main element.
	   * @type {Null|EventTarget}
	   * @default null
	   */
	  inputTarget: null,

	  /**
	   * @private
	   * force an input class
	   * @type {Null|Function}
	   * @default null
	   */
	  inputClass: null,

	  /**
	   * @private
	   * Some CSS properties can be used to improve the working of Hammer.
	   * Add them to this method and they will be set when creating a new Manager.
	   * @namespace
	   */
	  cssProps: {
	    /**
	     * @private
	     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userSelect: 'none',

	    /**
	     * @private
	     * Disable the Windows Phone grippers when pressing an element.
	     * @type {String}
	     * @default 'none'
	     */
	    touchSelect: 'none',

	    /**
	     * @private
	     * Disables the default callout shown when you touch and hold a touch target.
	     * On iOS, when you touch and hold a touch target such as a link, Safari displays
	     * a callout containing information about the link. This property allows you to disable that callout.
	     * @type {String}
	     * @default 'none'
	     */
	    touchCallout: 'none',

	    /**
	     * @private
	     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	     * @type {String}
	     * @default 'none'
	     */
	    userDrag: 'none',

	    /**
	     * @private
	     * Overrides the highlight color shown when the user taps a link or a JavaScript
	     * clickable element in iOS. This property obeys the alpha value, if specified.
	     * @type {String}
	     * @default 'rgba(0,0,0,0)'
	     */
	    tapHighlightColor: 'rgba(0,0,0,0)'
	  }
	};
	/**
	 * @private
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */

	var Manager = /*#__PURE__*/function () {
	  function Manager(element, options) {
	    var _this = this;

	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};
	    this.options = _objectSpread({}, defaults, options);
	    this.options.inputTarget = this.options.inputTarget || element;
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	    this.toggleCssProps(true);
	    this.options.recognizers.forEach(function (_ref) {
	      var ctor = _ref[0],
	          opts = _ref[1];

	      _this.add(new ctor(opts));
	    }, this);
	  }
	  /**
	   * @private
	   * set options
	   * @param {Object} options
	   * @returns {Manager}
	   */


	  var _proto = Manager.prototype;

	  _proto.set = function set(options) {
	    _Object$assign(this.options, options); // Options that need a little more setup


	    if (options.touchAction) this.touchAction.update();

	    if (options.inputTarget) {
	      // Clean up existing event listeners and reinitialize
	      this.input.destroy();
	      this.input.target = options.inputTarget;
	      this.input.init();
	    }

	    return this;
	  }
	  /**
	   * @private
	   * run the recognizers!
	   * called by the inputHandler function on every movement of the pointers (touches)
	   * it walks through all the recognizers and tries to detect the gesture that is being made
	   * @param {Object} inputData
	   */
	  ;

	  _proto.recognize = function recognize(inputData) {
	    var session = this.session; // run the touch-action polyfill

	    this.touchAction.preventDefaults(inputData); // this holds the recognizer that is being recognized.
	    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	    // if no recognizer is detecting a thing, it is set to `null`

	    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
	    // or when we're in a new session

	    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	      curRecognizer = session.curRecognizer = null;
	    }

	    this.recognizers.forEach(function (recognizer) {
	      // find out if we are allowed try to recognize the input for this one.
	      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	      //      that is being recognized.
	      if (!curRecognizer || recognizer === curRecognizer) {
	        recognizer.recognize(inputData);
	      } else {
	        recognizer.reset();
	      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	      // current active recognizer. but only if we don't already have an active recognizer


	      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	        curRecognizer = session.curRecognizer = recognizer;
	      }
	    });
	  }
	  /**
	   * @private
	   * get a recognizer by its event name.
	   * @param {Recognizer|String} recognizer
	   * @returns {Recognizer|undefined}
	   */
	  ;

	  _proto.get = function get(recognizer) {
	    var _context;

	    return recognizer instanceof Recognizer ? recognizer : _findInstanceProperty(_context = this.recognizers).call(_context, function (recogger) {
	      return recogger.options.event === recognizer;
	    });
	  }
	  /**
	   * @private add a recognizer to the manager
	   * existing recognizers with the same event name will be removed
	   * @param {Recognizer} recognizer
	   * @returns {Recognizer|Manager}
	   */
	  ;

	  _proto.add = function add(recognizer) {
	    // remove existing
	    var existing = this.get(recognizer.options.event);
	    if (existing) this.remove(existing);
	    this.recognizers.push(recognizer);
	    recognizer.manager = this;
	    this.touchAction.update();
	    return recognizer;
	  }
	  /**
	   * @private
	   * remove a recognizer by name or instance
	   * @param {Recognizer|String} recognizer
	   * @returns {Manager}
	   */
	  ;

	  _proto.remove = function remove(recognizer) {
	    recognizer = this.get(recognizer); // let's make sure this recognizer exists

	    if (recognizer) {
	      var index = this.recognizers.indexOf(recognizer);

	      if (index !== -1) {
	        var _context2;

	        _spliceInstanceProperty(_context2 = this.recognizers).call(_context2, index, 1);

	        this.touchAction.update();
	      }
	    }

	    return this;
	  }
	  /**
	   * @private
	   * bind event
	   * @param {String} events
	   * @param {Function} handler
	   * @returns {EventEmitter} this
	   */
	  ;

	  _proto.on = function on(events, handler) {
	    if (events === undefined || handler === undefined) return;
	    var handlers = this.handlers;

	    _trimInstanceProperty(events).call(events).split(/\s+/g).forEach(function (event) {
	      handlers[event] = handlers[event] || [];
	      handlers[event].push(handler);
	    });

	    return this;
	  }
	  /**
	   * @private unbind event, leave emit blank to remove all handlers
	   * @param {String} events
	   * @param {Function} [handler]
	   * @returns {EventEmitter} this
	   */
	  ;

	  _proto.off = function off(events, handler) {
	    var _this2 = this;

	    if (events === undefined) return;

	    _trimInstanceProperty(events).call(events).split(/\s+/g).forEach(function (event) {
	      if (!handler) {
	        delete _this2.handlers[event];
	      } else if (_this2.handlers[event]) {
	        var _context3;

	        _spliceInstanceProperty(_context3 = _this2.handlers[event]).call(_context3, _this2.handlers[event].indexOf(handler), 1);
	      }
	    });

	    return this;
	  }
	  /**
	   * @private emit event to the listeners
	   * @param {String} event
	   * @param {Object} data
	   */
	  ;

	  _proto.emit = function emit(event, data) {
	    var _context4;

	    // we also want to trigger dom events
	    if (this.options.domEvents) triggerDomEvent(event, data); // no handlers, so skip it all

	    var handlers = this.handlers[event] && _sliceInstanceProperty$1(_context4 = this.handlers[event]).call(_context4);

	    if (!handlers || !handlers.length) return;
	    data.type = event;

	    data.preventDefault = function () {
	      data.srcEvent.preventDefault();
	    };

	    handlers.forEach(function (handler) {
	      handler(data);
	    });
	  }
	  /**
	   * @private
	   * destroy the manager and unbinds all events
	   * it doesn't unbind dom events, that is the user own responsibility
	   */
	  ;

	  _proto.destroy = function destroy() {
	    if (this.element) this.toggleCssProps(false);
	    this.handlers = {};
	    this.session = {};
	    this.input.destroy();
	    this.element = null;
	  };

	  _proto.toggleCssProps = function toggleCssProps(add) {
	    var _this3 = this;

	    var element = this.element;
	    if (!element.style) return;

	    _Object$entries(this.options.cssProps).forEach(function (_ref2) {
	      var value = _ref2[0],
	          name = _ref2[1];
	      var prop = prefixed(element.style, name);

	      if (add) {
	        _this3.oldCssProps[prop] = element.style[prop];
	        element.style[prop] = value;
	      } else {
	        element.style[prop] = _this3.oldCssProps[prop] || '';
	      }
	    });

	    if (!add) this.oldCssProps = {};
	  };

	  return _createClass(Manager);
	}();

	function triggerDomEvent(event, data) {
	  var gestureEvent = document.createEvent('Event');
	  gestureEvent.initEvent(event, true, true);
	  gestureEvent.gesture = data;
	  data.target.dispatchEvent(gestureEvent);
	}

	/**
	 * @private
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */

	var AttrRecognizer = /*#__PURE__*/function (_Recognizer) {
	  _inherits(AttrRecognizer, _Recognizer);

	  function AttrRecognizer() {
	    return _Recognizer.apply(this, arguments) || this;
	  }

	  var _proto = AttrRecognizer.prototype;

	  /**
	   * @private
	   * Used to check if it the recognizer receives valid input, like input.distance > 10.
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {Boolean} recognized
	   */
	  _proto.attrTest = function attrTest(input) {
	    var optionPointers = this.options.pointers;
	    return optionPointers === 0 || input.pointers.length === optionPointers;
	  }
	  /**
	   * @private
	   * Process the input and return the state for the recognizer
	   * @memberof AttrRecognizer
	   * @param {Object} input
	   * @returns {*} State
	   */
	  ;

	  _proto.process = function process(input) {
	    var state = this.state;
	    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

	    if (isRecognized && (input.eventType & INPUT_CANCEL || !isValid)) {
	      return state | STATE_CANCELLED;
	    }

	    if (isRecognized || isValid) {
	      if (input.eventType & INPUT_END) return state | STATE_ENDED;
	      if (!(state & STATE_BEGAN)) return STATE_BEGAN;
	      return state | STATE_CHANGED;
	    }

	    return STATE_FAILED;
	  };

	  return _createClass(AttrRecognizer);
	}(Recognizer);
	AttrRecognizer.prototype.defaults = {
	  /**
	   * @private
	   * @type {Number}
	   * @default 1
	   */
	  pointers: 1
	};

	/**
	 * @private
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */

	var PanRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
	  _inherits(PanRecognizer, _AttrRecognizer);

	  function PanRecognizer() {
	    var _context;

	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _AttrRecognizer.call.apply(_AttrRecognizer, _concatInstanceProperty(_context = [this]).call(_context, args)) || this;
	    _this.pX = null;
	    _this.pY = null;
	    return _this;
	  }

	  var _proto = PanRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    var direction = this.options.direction;
	    var actions = [];
	    if (direction & DIRECTION_HORIZONTAL) actions.push(TOUCH_ACTION_PAN_Y);
	    if (direction & DIRECTION_VERTICAL) actions.push(TOUCH_ACTION_PAN_X);
	    return actions;
	  };

	  _proto.directionTest = function directionTest(input) {
	    var options = this.options;
	    var deltaX = input.deltaX,
	        deltaY = input.deltaY;
	    var distance = input.distance; // lock to axis?

	    var hasMoved = true;

	    if (!(input.direction & options.direction)) {
	      if (options.direction & DIRECTION_HORIZONTAL) {
	        input.direction = deltaX === 0 ? DIRECTION_NONE : deltaX < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        hasMoved = deltaX !== this.pX;
	        distance = Math.abs(deltaX);
	      } else {
	        input.direction = deltaY === 0 ? DIRECTION_NONE : deltaY < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	        hasMoved = deltaY !== this.pY;
	        distance = Math.abs(deltaY);
	      }
	    }

	    return hasMoved && distance > options.threshold && input.direction & options.direction;
	  };

	  _proto.attrTest = function attrTest(input) {
	    return _AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	  };

	  _proto.emit = function emit(input) {
	    this.pX = input.deltaX;
	    this.pY = input.deltaY;
	    var direction = directionStr(input.direction);
	    if (direction) input.additionalEvent = this.options.event + direction;

	    _AttrRecognizer.prototype.emit.call(this, input);
	  };

	  return _createClass(PanRecognizer);
	}(AttrRecognizer);
	PanRecognizer.prototype.defaults = {
	  event: 'pan',
	  threshold: 10,
	  pointers: 1,
	  direction: DIRECTION_ALL
	};

	/**
	 * @private
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */

	var PinchRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
	  _inherits(PinchRecognizer, _AttrRecognizer);

	  function PinchRecognizer() {
	    return _AttrRecognizer.apply(this, arguments) || this;
	  }

	  var _proto = PinchRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return [TOUCH_ACTION_NONE];
	  };

	  _proto.attrTest = function attrTest(input) {
	    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	  };

	  _proto.emit = function emit(input) {
	    if (input.scale !== 1) {
	      var inOut = input.scale < 1 ? 'in' : 'out';
	      input.additionalEvent = this.options.event + inOut;
	    }

	    _AttrRecognizer.prototype.emit.call(this, input);
	  };

	  return _createClass(PinchRecognizer);
	}(AttrRecognizer);
	PinchRecognizer.prototype.defaults = {
	  event: 'pinch',
	  threshold: 0,
	  pointers: 2
	};

	/**
	 * @private
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */

	var PressRecognizer = /*#__PURE__*/function (_Recognizer) {
	  _inherits(PressRecognizer, _Recognizer);

	  function PressRecognizer() {
	    var _context;

	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _Recognizer.call.apply(_Recognizer, _concatInstanceProperty(_context = [this]).call(_context, args)) || this;
	    _this._timer = null;
	    _this._input = null;
	    return _this;
	  }

	  var _proto = PressRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return [TOUCH_ACTION_AUTO];
	  };

	  _proto.process = function process(input) {
	    var _this2 = this;

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
	        _this2.state = STATE_RECOGNIZED;

	        _this2.tryEmit();
	      }, options.time);
	    } else if (input.eventType & INPUT_END) {
	      return STATE_RECOGNIZED;
	    }

	    return STATE_FAILED;
	  };

	  _proto.reset = function reset() {
	    clearTimeout(this._timer);
	  };

	  _proto.emit = function emit(input) {
	    if (this.state !== STATE_RECOGNIZED) return;

	    if (input && input.eventType & INPUT_END) {
	      this.manager.emit("".concat(this.options.event, "up"), input);
	    } else {
	      this._input.timeStamp = Date.now();
	      this.manager.emit(this.options.event, this._input);
	    }
	  }
	  /**
	   * @private
	   * Check that all the require failure recognizers has failed,
	   * if true, it emits a gesture event,
	   * otherwise, setup the state to FAILED.
	   * @param {Object} input
	   */
	  ;

	  _proto.tryEmit = function tryEmit(input) {
	    if (this.canEmit()) return this.emit(input); // it's failing anyway

	    this.state = STATE_FAILED;
	  }
	  /**
	   * @private
	   * can we emit?
	   * @returns {boolean}
	   */
	  ;

	  _proto.canEmit = function canEmit() {
	    var i = 0;

	    while (i < this.requireFail.length) {
	      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) return false;
	      i++;
	    }

	    return true;
	  };

	  return _createClass(PressRecognizer);
	}(Recognizer);
	PressRecognizer.prototype.defaults = {
	  event: 'press',
	  pointers: 1,
	  time: 251,
	  // minimal time of the pointer to be pressed
	  threshold: 9 // a minimal movement is ok, but keep it low

	};

	/**
	 * @private
	 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */

	var TapRecognizer = /*#__PURE__*/function (_Recognizer) {
	  _inherits(TapRecognizer, _Recognizer);

	  function TapRecognizer() {
	    var _context;

	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _Recognizer.call.apply(_Recognizer, _concatInstanceProperty(_context = [this]).call(_context, args)) || this;
	    _this.pTime = false;
	    _this.pCenter = false;
	    _this._timer = null;
	    _this._input = null;
	    _this.count = 0;
	    return _this;
	  }

	  var _proto = TapRecognizer.prototype;

	  _proto.getTouchAction = function getTouchAction() {
	    return [TOUCH_ACTION_MANIPULATION];
	  };

	  _proto.process = function process(input) {
	    var options = this.options;
	    var validPointers = input.pointers.length === options.pointers;
	    var validMovement = input.distance < options.threshold;
	    var validTouchTime = input.deltaTime < options.time;
	    this.reset();

	    if (input.eventType & INPUT_START && this.count === 0) {
	      return this.failTimeout();
	    } // we only allow little movement
	    // and we've reached an end event, so a tap is possible


	    if (validMovement && validTouchTime && validPointers) {
	      if (input.eventType !== INPUT_END) return this.failTimeout();
	      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	      this.pTime = input.timeStamp;
	      this.pCenter = input.center;
	      this.count = !validMultiTap || !validInterval ? 1 : this.count + 1;
	      this._input = input; // if tap count matches we have recognized it,
	      // else it has began recognizing...

	      if (this.count % options.taps === 0) return STATE_RECOGNIZED;
	    }

	    return STATE_FAILED;
	  };

	  _proto.failTimeout = function failTimeout() {
	    var _this2 = this;

	    this._timer = setTimeout(function () {
	      _this2.state = STATE_FAILED;
	    }, this.options.interval);
	    return STATE_FAILED;
	  };

	  _proto.reset = function reset() {
	    clearTimeout(this._timer);
	  };

	  _proto.emit = function emit() {
	    if (this.state === STATE_RECOGNIZED) {
	      this._input.tapCount = this.count;
	      this.manager.emit(this.options.event, this._input);
	    }
	  };

	  return _createClass(TapRecognizer);
	}(Recognizer);
	TapRecognizer.prototype.defaults = {
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

	};

	var getHammerInputClass = function getHammerInputClass() {
	  return typeof window !== 'undefined' && 'ontouchstart' in window && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent) ? TouchInput : null;
	};

	var buildPageIds = function buildPageIds(pageSpreads) {
	  return pageSpreads.reduce(function (pageIds, pageSpread) {
	    pageSpread.options.pageIds.forEach(function (pageId) {
	      pageIds[pageId] = pageSpread;
	    });
	    return pageIds;
	  }, {});
	};

	var clipCoordinate = function clipCoordinate(coordinate, scale, size, offset) {
	  return size * scale < 100 ? offset * -scale + 50 - size * scale / 2 : Math.max(Math.min(coordinate, offset * -scale), offset * -scale - size * scale + 100);
	};

	function getPageSpreadBounds(pageSpread) {
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

	function isCoordinateInsideElement(x, y, el) {
	  var _el$getBoundingClient = el.getBoundingClientRect(),
	      left = _el$getBoundingClient.left,
	      right = _el$getBoundingClient.right,
	      top = _el$getBoundingClient.top,
	      bottom = _el$getBoundingClient.bottom;

	  return x >= left && x <= right && y >= top && y <= bottom;
	}

	function traversePageSpreads(els) {
	  var pageSpreads = [];
	  var left = 0;

	  for (var i = 0; i < els.length; i++) {
	    var _el$dataset$width, _el$dataset$pageIds, _el$dataset$maxZoomSc;

	    var el = els[i];
	    var width = Number((_el$dataset$width = el.dataset.width) != null ? _el$dataset$width : 100);
	    var pageSpread = new PageSpread(el, {
	      id: el.dataset.id,
	      type: el.dataset.type,
	      pageIds: ((_el$dataset$pageIds = el.dataset.pageIds) == null ? void 0 : _el$dataset$pageIds.split(',')) || [],
	      maxZoomScale: Number((_el$dataset$maxZoomSc = el.dataset.maxZoomScale) != null ? _el$dataset$maxZoomSc : 1),
	      width: width,
	      left: left
	    });
	    left += width;
	    pageSpreads.push(pageSpread);
	  }

	  return pageSpreads;
	}

	var Verso = /*#__PURE__*/function () {
	  function Verso(el, _options) {
	    var _this = this,
	        _this$options$swipeVe,
	        _this$options$swipeTh,
	        _this$options$navigat,
	        _this$options$navigat2,
	        _this$options$zoomDur,
	        _this$options$doubleT;

	    if (_options === void 0) {
	      _options = {};
	    }

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
	    this.started = false;
	    this.destroyed = false;
	    this._events = {};
	    this.el = void 0;
	    this.scrollerEl = void 0;
	    this.pageSpreadEls = void 0;
	    this.pageSpreads = void 0;
	    this.pageIds = void 0;
	    this.options = void 0;
	    this.swipeVelocity = void 0;
	    this.swipeThreshold = void 0;
	    this.navigationDuration = void 0;
	    this.navigationPanDuration = void 0;
	    this.zoomDuration = void 0;
	    this.tap = void 0;
	    this.animation = void 0;
	    this.hammer = void 0;

	    this.onPanStart = function (e) {
	      // Only allow panning if zoomed in or doing a horizontal pan.
	      // This ensures vertical scrolling works for scrollable page spreads.
	      if (_this.transform.scale > 1 || e.direction === DIRECTION_LEFT || e.direction === DIRECTION_RIGHT) {
	        var x = e.center.x;
	        var edgeThreshold = 30;
	        var width = _this.scrollerEl.offsetWidth; // Prevent panning when edge-swiping on iOS.

	        if (x > edgeThreshold && x < width - edgeThreshold) {
	          _this.startTransform.left = _this.transform.left;
	          _this.startTransform.top = _this.transform.top;
	          _this.panning = true;

	          _this.trigger('panStart');
	        }
	      }
	    };

	    this.onPanMove = function (e) {
	      if (_this.pinching || !_this.panning) return;
	      var scale = _this.transform.scale;

	      if (scale > 1) {
	        var activePageSpread = _this.getActivePageSpread();

	        var carouselOffset = activePageSpread.getLeft();
	        var carouselScaledOffset = carouselOffset * scale;

	        var _getPageSpreadBounds = getPageSpreadBounds(activePageSpread),
	            width = _getPageSpreadBounds.width,
	            height = _getPageSpreadBounds.height,
	            left = _getPageSpreadBounds.left,
	            top = _getPageSpreadBounds.top;

	        var x = _this.startTransform.left + carouselScaledOffset + e.deltaX / _this.scrollerEl.offsetWidth * 100;
	        x = clipCoordinate(x, scale, width, left) - carouselScaledOffset;
	        var y = _this.startTransform.top + e.deltaY / _this.scrollerEl.offsetHeight * 100;
	        y = clipCoordinate(y, scale, height, top);
	        _this.transform.left = x;
	        _this.transform.top = y;

	        _this.animation.animate({
	          x: x + '%',
	          y: y + '%',
	          scale: scale,
	          easing: 'linear'
	        });
	      } else {
	        _this.animation.animate({
	          x: _this.transform.left + e.deltaX / _this.scrollerEl.offsetWidth * 100 + '%',
	          easing: 'linear'
	        });
	      }
	    };

	    this.onPanEnd = function (e) {
	      if (!_this.panning) return;
	      _this.panning = false;

	      _this.trigger('panEnd');

	      if (_this.transform.scale === 1 && !_this.pinching) {
	        var position = _this.getPosition();

	        var velocity = e.overallVelocityX;

	        if (Math.abs(velocity) >= _this.swipeVelocity && Math.abs(e.deltaX) >= _this.swipeThreshold) {
	          var options = {
	            velocity: velocity,
	            duration: _this.navigationPanDuration
	          };

	          if (e.offsetDirection === DIRECTION_LEFT) {
	            _this.next(options);
	          } else if (e.offsetDirection === DIRECTION_RIGHT) {
	            _this.prev(options);
	          }
	        }

	        if (position === _this.getPosition()) {
	          _this.animation.animate({
	            x: _this.transform.left + '%',
	            duration: _this.navigationPanDuration
	          });

	          _this.trigger('attemptedNavigation', {
	            position: _this.getPosition()
	          });
	        }
	      }
	    };

	    this.onPinchStart = function () {
	      if (!_this.getActivePageSpread().isZoomable()) return;
	      _this.pinching = true; // @ts-expect-error

	      _this.el.dataset.pinching = true;
	      _this.startTransform.scale = _this.transform.scale;
	    };

	    this.onPinchMove = function (e) {
	      if (!_this.pinching) return;

	      _this.zoomTo({
	        x: e.center.x,
	        y: e.center.y,
	        scale: _this.startTransform.scale * e.scale,
	        bounds: false,
	        easing: 'linear'
	      });
	    };

	    this.onPinchEnd = function (e) {
	      if (!_this.pinching) return;

	      var activePageSpread = _this.getActivePageSpread();

	      var maxZoomScale = activePageSpread.getMaxZoomScale();
	      var scale = Math.max(1, Math.min(_this.transform.scale, maxZoomScale));

	      var position = _this.getPosition();

	      if (_this.startTransform.scale === 1 && scale > 1) {
	        _this.trigger('zoomedIn', {
	          position: position
	        });
	      } else if (_this.startTransform.scale > 1 && scale === 1) {
	        _this.trigger('zoomedOut', {
	          position: position
	        });
	      }

	      _this.zoomTo({
	        x: e.center.x,
	        y: e.center.y,
	        scale: scale,
	        duration: _this.zoomDuration
	      }, function () {
	        _this.pinching = false; // @ts-expect-error

	        _this.el.dataset.pinching = false;
	      });
	    };

	    this.onPress = function (e) {
	      _this.trigger('pressed', _this.getCoordinateInfo(e.center.x, e.center.y, _this.getActivePageSpread()));
	    };

	    this.onContextmenu = function (e) {
	      e.preventDefault();

	      _this.trigger('contextmenu', _this.getCoordinateInfo(e.clientX, e.clientY, _this.getActivePageSpread()));

	      return false;
	    };

	    this.onWheel = function (e) {
	      var activePageSpread = _this.getActivePageSpread();

	      if (!activePageSpread.isZoomable()) return; // see https://stackoverflow.com/a/23668035

	      var deltaY = e.deltaY;
	      if (e.webkitDirectionInvertedFromDevice) deltaY = -deltaY;

	      var position = _this.getPosition();

	      if (deltaY > 0 && _this.transform.scale === 1) {
	        _this.zoomTo({
	          x: e.clientX,
	          y: e.clientY,
	          scale: activePageSpread.getMaxZoomScale(),
	          duration: _this.zoomDuration
	        }, function () {
	          _this.trigger('zoomedIn', {
	            position: position
	          });
	        });
	      } else if (deltaY < 0 && _this.transform.scale > 1) {
	        _this.zoomTo({
	          x: e.clientX,
	          y: e.clientY,
	          scale: 1,
	          duration: _this.zoomDuration
	        }, function () {
	          _this.trigger('zoomedOut', {
	            position: position
	          });
	        });
	      }
	    };

	    this.onSingletap = function (e) {
	      var activePageSpread = _this.getActivePageSpread();

	      var coordinateInfo = _this.getCoordinateInfo(e.center.x, e.center.y, activePageSpread);

	      _this.trigger('pointerdown', coordinateInfo);

	      clearTimeout(_this.tap.timeout);

	      if (_this.tap.count === 1) {
	        _this.tap.count = 0;

	        _this.trigger('doubleClicked', coordinateInfo);

	        if (activePageSpread.isZoomable()) {
	          var maxZoomScale = activePageSpread.getMaxZoomScale();
	          var zoomedIn = _this.transform.scale > 1;
	          var scale = zoomedIn ? 1 : maxZoomScale;
	          var zoomEvent = zoomedIn ? 'zoomedOut' : 'zoomedIn';

	          var position = _this.getPosition();

	          _this.zoomTo({
	            x: e.center.x,
	            y: e.center.y,
	            scale: scale,
	            duration: _this.zoomDuration
	          }, function () {
	            _this.trigger(zoomEvent, {
	              position: position
	            });
	          });
	        }
	      } else {
	        _this.tap.count++;
	        _this.tap.timeout = setTimeout(function () {
	          _this.tap.count = 0;

	          _this.trigger('clicked', coordinateInfo);
	        }, _this.tap.delay);
	      }
	    };

	    this.onTouchStart = function (e) {
	      if (!_this.getActivePageSpread().isScrollable()) e.preventDefault();
	    };

	    this.onTouchEnd = function (e) {
	      if (!_this.getActivePageSpread().isScrollable()) e.preventDefault();
	    };

	    this.onResize = function () {
	      if (_this.transform.scale > 1) {
	        var position = _this.getPosition();

	        _this.transform.left = _this.getLeftTransformFromPageSpread(position, _this.getActivePageSpread());
	        _this.transform.top = 0;
	        _this.transform.scale = 1;

	        _this.zoomTo({
	          x: _this.transform.left,
	          y: _this.transform.top,
	          scale: _this.transform.scale,
	          duration: 0
	        });

	        _this.trigger('zoomedOut', {
	          position: position
	        });
	      }
	    };

	    this.el = el;
	    this.options = _options;
	    this.swipeVelocity = (_this$options$swipeVe = this.options.swipeVelocity) != null ? _this$options$swipeVe : 0.3;
	    this.swipeThreshold = (_this$options$swipeTh = this.options.swipeThreshold) != null ? _this$options$swipeTh : 10;
	    this.navigationDuration = (_this$options$navigat = this.options.navigationDuration) != null ? _this$options$navigat : 240;
	    this.navigationPanDuration = (_this$options$navigat2 = this.options.navigationPanDuration) != null ? _this$options$navigat2 : 200;
	    this.zoomDuration = (_this$options$zoomDur = this.options.zoomDuration) != null ? _this$options$zoomDur : 200;
	    this.tap = {
	      count: 0,
	      delay: (_this$options$doubleT = this.options.doubleTapDelay) != null ? _this$options$doubleT : 300,
	      timeout: undefined
	    };
	  }

	  var _proto = Verso.prototype;

	  _proto.bind = function bind(event, fn) {
	    this._events[event] = this._events[event] || [];
	    return this._events[event].push(fn);
	  };

	  _proto.unbind = function unbind(event, fn) {
	    if (this._events[event]) {
	      var _context;

	      return _spliceInstanceProperty(_context = this._events[event]).call(_context, this._events[event].indexOf(fn), 1);
	    }
	  };

	  _proto.trigger = function trigger(event) {
	    var _this$_events$event,
	        _this2 = this;

	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    (_this$_events$event = this._events[event]) == null ? void 0 : _this$_events$event.forEach(function (e) {
	      e.apply(_this2, args);
	    });
	  };

	  _proto.start = function start() {
	    var _this$getPageSpreadPo;

	    this.scrollerEl = this.el.querySelector('.verso__scroller');
	    this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
	    this.pageSpreads = traversePageSpreads(this.pageSpreadEls);
	    this.pageIds = buildPageIds(this.pageSpreads);
	    this.animation = new Animation(this.scrollerEl);
	    this.hammer = new Manager(this.scrollerEl, {
	      touchAction: 'none',
	      enable: false,
	      inputClass: getHammerInputClass(),
	      recognizers: [[PanRecognizer, {
	        threshold: 5,
	        direction: DIRECTION_ALL
	      }], [TapRecognizer, {
	        event: 'singletap',
	        interval: 0
	      }], [PinchRecognizer], [PressRecognizer, {
	        time: 500
	      }]]
	    }); //@ts-expect-error

	    this.hammer.on('panstart', this.onPanStart); //@ts-expect-error

	    this.hammer.on('panmove', this.onPanMove); //@ts-expect-error

	    this.hammer.on('panend', this.onPanEnd); //@ts-expect-error

	    this.hammer.on('pancancel', this.onPanEnd); //@ts-expect-error

	    this.hammer.on('singletap', this.onSingletap); //@ts-expect-error

	    this.hammer.on('pinchstart', this.onPinchStart); //@ts-expect-error

	    this.hammer.on('pinchmove', this.onPinchMove); //@ts-expect-error

	    this.hammer.on('pinchend', this.onPinchEnd); //@ts-expect-error

	    this.hammer.on('pinchcancel', this.onPinchEnd); //@ts-expect-error

	    this.hammer.on('press', this.onPress);
	    this.scrollerEl.addEventListener('contextmenu', this.onContextmenu, false);
	    this.scrollerEl.addEventListener('wheel', this.onWheel, false);
	    var pageId = (_this$getPageSpreadPo = this.getPageSpreadPositionFromPageId(this.options.pageId)) != null ? _this$getPageSpreadPo : 0; //@ts-expect-error

	    this.hammer.set({
	      enable: true
	    });
	    this.started = true;
	    this.destroyed = false;
	    this.navigateTo(pageId, {
	      duration: 0
	    });
	    this.el.addEventListener('touchstart', this.onTouchStart, false);
	    this.el.addEventListener('touchend', this.onTouchEnd, false);

	    if (typeof window !== 'undefined') {
	      window.addEventListener('resize', this.onResize, false);
	    }

	    return this;
	  };

	  _proto.destroy = function destroy() {
	    if (!this.started) {
	      return console.warn("You've called .destroy() on a viewer that was not started yet, this is a no-op.");
	    }

	    if (this.destroyed) {
	      return console.warn("You've called .destroy() on a viewer that has already been destroyed and not restarted, this is a no-op.");
	    }

	    this.scrollerEl.removeEventListener('contextmenu', this.onContextmenu);
	    this.scrollerEl.removeEventListener('wheel', this.onWheel); //@ts-expect-error

	    this.hammer.destroy();
	    this.el.removeEventListener('touchstart', this.onTouchStart);
	    this.el.removeEventListener('touchend', this.onTouchEnd);

	    if (typeof window !== 'undefined') {
	      window.removeEventListener('resize', this.onResize);
	    }

	    this.started = false;
	    this.destroyed = true;
	    return this;
	  };

	  _proto.first = function first(options) {
	    return this.navigateTo(0, options);
	  };

	  _proto.prev = function prev(options) {
	    return this.navigateTo(this.getPosition() - 1, options);
	  };

	  _proto.next = function next(options) {
	    return this.navigateTo(this.getPosition() + 1, options);
	  };

	  _proto.last = function last(options) {
	    return this.navigateTo(this.getPageSpreadCount() - 1, options);
	  };

	  _proto.navigateTo = function navigateTo(newPosition, options) {
	    var _options$velocity,
	        _options$duration,
	        _this3 = this;

	    if (this.destroyed) {
	      return console.warn(" \nYou've called a navigation method on a viewer that was previously destroyed, this is a no-op.\nPlease call viewer.start() again, if you want to reuse this Viewer instance.\n\nYou might have forgotten to remove an event handler that\ncalls first/prev/next/last/navigateTo on the viewer.");
	    }

	    if (!this.started) {
	      return console.warn("\nYou've called a navigation method on a viewer that hasn't been started yet, this is a no-op.\nPlease call viewer.start() first.\n\nYou might have forgotten to remove an event handler that\ncalls .first()/.prev()/.next()/.last()/.navigateTo() on the viewer.\n");
	    }

	    if (newPosition < 0 || newPosition > this.getPageSpreadCount() - 1) {
	      return;
	    }

	    var currentPosition = this.getPosition();
	    var currentPageSpread = this.getPageSpreadFromPosition(currentPosition);
	    var activePageSpread = this.getPageSpreadFromPosition(newPosition);
	    var carousel = this.getCarouselFromPageSpread(activePageSpread);
	    var velocity = (_options$velocity = options == null ? void 0 : options.velocity) != null ? _options$velocity : 1;
	    var duration = (_options$duration = options == null ? void 0 : options.duration) != null ? _options$duration : this.navigationDuration;
	    duration = duration / Math.abs(velocity);
	    var touchAction = activePageSpread.isScrollable() ? 'pan-y' : 'none';
	    currentPageSpread == null ? void 0 : currentPageSpread.deactivate();
	    activePageSpread.activate();
	    carousel.visible.forEach(function (pageSpread) {
	      pageSpread.position().setVisibility('visible');
	    }); //@ts-expect-error

	    this.hammer.set({
	      touchAction: touchAction
	    });
	    this.transform.left = this.getLeftTransformFromPageSpread(newPosition, activePageSpread);
	    this.setPosition(newPosition);

	    if (this.transform.scale > 1) {
	      this.transform.top = 0;
	      this.transform.scale = 1;
	      this.trigger('zoomedOut', {
	        position: currentPosition
	      });
	    }

	    this.trigger('beforeNavigation', {
	      currentPosition: currentPosition,
	      newPosition: newPosition
	    });
	    this.animation.animate({
	      x: this.transform.left + '%',
	      duration: duration
	    }, function () {
	      carousel = _this3.getCarouselFromPageSpread(_this3.getActivePageSpread());
	      carousel.gone.forEach(function (pageSpread) {
	        pageSpread.setVisibility('gone');
	      });

	      _this3.trigger('afterNavigation', {
	        newPosition: _this3.getPosition(),
	        previousPosition: currentPosition
	      });
	    });
	  };

	  _proto.getPosition = function getPosition() {
	    return this.position;
	  };

	  _proto.setPosition = function setPosition(position) {
	    this.position = position;
	    return this;
	  };

	  _proto.getLeftTransformFromPageSpread = function getLeftTransformFromPageSpread(position, pageSpread) {
	    if (position === this.getPageSpreadCount() - 1) {
	      return 100 - pageSpread.getWidth() - pageSpread.getLeft();
	    }

	    if (position > 0) {
	      return (100 - pageSpread.getWidth()) / 2 - pageSpread.getLeft();
	    }

	    return 0;
	  };

	  _proto.getCarouselFromPageSpread = function getCarouselFromPageSpread(pageSpreadSubject) {
	    var carousel = {
	      visible: [],
	      gone: []
	    }; // Identify the page spreads that should be a part of the carousel.

	    this.pageSpreads.forEach(function (pageSpread) {
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

	      if (visible) {
	        carousel.visible.push(pageSpread);
	      } else {
	        carousel.gone.push(pageSpread);
	      }
	    });
	    return carousel;
	  };

	  _proto.getCoordinateInfo = function getCoordinateInfo(x, y, pageSpread) {
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
	    var overlayEls = pageSpread.getOverlayEls();

	    for (var idx = 0; idx < overlayEls.length; idx++) {
	      var overlayEl = overlayEls[idx];

	      if (isCoordinateInsideElement(x, y, overlayEl)) {
	        info.overlayEls.push(overlayEl);
	      }
	    }

	    var pageEls = pageSpread.getPageEls();

	    for (var _idx = 0; _idx < pageEls.length; _idx++) {
	      var pageEl = pageEls[_idx];

	      if (isCoordinateInsideElement(x, y, pageEl)) {
	        info.pageEl = pageEl;
	        break;
	      }
	    }

	    var contentRect = pageSpread.getContentRect();
	    info.contentX = (x - contentRect.left) / Math.max(1, contentRect.width);
	    info.contentY = (y - contentRect.top) / Math.max(1, contentRect.height);

	    if (info.pageEl) {
	      info.isInsideContentX = info.contentX >= 0 && info.contentX <= 1;
	      info.isInsideContentY = info.contentY >= 0 && info.contentY <= 1;
	      info.isInsideContent = info.isInsideContentX && info.isInsideContentY;
	    }

	    return info;
	  };

	  _proto.getPageSpreadCount = function getPageSpreadCount() {
	    return this.pageSpreads.length;
	  };

	  _proto.getActivePageSpread = function getActivePageSpread() {
	    return this.getPageSpreadFromPosition(this.getPosition());
	  };

	  _proto.getPageSpreadFromPosition = function getPageSpreadFromPosition(position) {
	    return this.pageSpreads[position];
	  };

	  _proto.getPageSpreadPositionFromPageId = function getPageSpreadPositionFromPageId(pageId) {
	    for (var idx = 0; idx < this.pageSpreads.length; idx++) {
	      var pageSpread = this.pageSpreads[idx];
	      if (pageSpread.options.pageIds.indexOf(pageId) > -1) return idx;
	    }
	  };

	  _proto.zoomTo = function zoomTo( //@ts-expect-error
	  _temp, callback) {
	    var _ref = _temp === void 0 ? {} : _temp,
	        duration = _ref.duration,
	        easing = _ref.easing,
	        scale = _ref.scale,
	        _ref$x = _ref.x,
	        x = _ref$x === void 0 ? 0 : _ref$x,
	        _ref$y = _ref.y,
	        y = _ref$y === void 0 ? 0 : _ref$y,
	        bounds = _ref.bounds;

	    var curScale = this.transform.scale;
	    var activePageSpread = this.getActivePageSpread();

	    var _getPageSpreadBounds2 = getPageSpreadBounds(activePageSpread),
	        left = _getPageSpreadBounds2.left,
	        top = _getPageSpreadBounds2.top,
	        width = _getPageSpreadBounds2.width,
	        height = _getPageSpreadBounds2.height,
	        pageSpreadRect = _getPageSpreadBounds2.pageSpreadRect;

	    var carouselOffset = activePageSpread.getLeft();
	    var carouselScaledOffset = carouselOffset * curScale;

	    if (scale !== 1) {
	      x -= pageSpreadRect.left;
	      y -= pageSpreadRect.top;
	      x = x / (pageSpreadRect.width / curScale) * 100;
	      y = y / (pageSpreadRect.height / curScale) * 100;
	      x = this.transform.left + carouselScaledOffset + x - x * scale / curScale;
	      y = this.transform.top + y - y * scale / curScale; // Make sure the animation doesn't exceed the content bounds.

	      if (bounds !== false && scale > 1) {
	        x = clipCoordinate(x, scale, width, left);
	        y = clipCoordinate(y, scale, height, top);
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
	      x: x + '%',
	      y: y + '%',
	      scale: scale,
	      easing: easing,
	      duration: duration
	    }, callback);
	  };

	  _proto.refresh = function refresh() {
	    this.pageSpreadEls = this.el.querySelectorAll('.verso__page-spread');
	    this.pageSpreads = traversePageSpreads(this.pageSpreadEls);
	    this.pageIds = buildPageIds(this.pageSpreads);
	    return this;
	  } //#############

	  /* Events */
	  //#############
	  ;

	  return _createClass(Verso);
	}();

	return Verso;

}));
//# sourceMappingURL=verso.js.map
