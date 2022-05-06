(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof rollupNeedsAnOptionToDisableAMDInUMD === 'function' && rollupNeedsAnOptionToDisableAMDInUMD.amd ? rollupNeedsAnOptionToDisableAMDInUMD(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tjek = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var promise$7 = {exports: {}};

	var check$1 = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$1y =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check$1(typeof globalThis == 'object' && globalThis) ||
	  check$1(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check$1(typeof self == 'object' && self) ||
	  check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var FunctionPrototype$6 = Function.prototype;
	var apply$9 = FunctionPrototype$6.apply;
	var bind$i = FunctionPrototype$6.bind;
	var call$A = FunctionPrototype$6.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply$1 = typeof Reflect == 'object' && Reflect.apply || (bind$i ? call$A.bind(apply$9) : function () {
	  return call$A.apply(apply$9, arguments);
	});

	var FunctionPrototype$5 = Function.prototype;
	var bind$h = FunctionPrototype$5.bind;
	var call$z = FunctionPrototype$5.call;
	var uncurryThis$R = bind$h && bind$h.bind(call$z, call$z);

	var functionUncurryThis$1 = bind$h ? function (fn) {
	  return fn && uncurryThis$R(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$z.apply(fn, arguments);
	  };
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$H = function (argument) {
	  return typeof argument == 'function';
	};

	var objectGetOwnPropertyDescriptor$1 = {};

	var fails$I = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$H = fails$I;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors$1 = !fails$H(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var call$y = Function.prototype.call;

	var functionCall$1 = call$y.bind ? call$y.bind(call$y) : function () {
	  return call$y.apply(call$y, arguments);
	};

	var objectPropertyIsEnumerable$1 = {};

	var $propertyIsEnumerable$3 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$a = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG$1 = getOwnPropertyDescriptor$a && !$propertyIsEnumerable$3.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable$1.f = NASHORN_BUG$1 ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$a(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$3;

	var createPropertyDescriptor$d = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var uncurryThis$Q = functionUncurryThis$1;

	var toString$k = uncurryThis$Q({}.toString);
	var stringSlice$a = uncurryThis$Q(''.slice);

	var classofRaw$3 = function (it) {
	  return stringSlice$a(toString$k(it), 8, -1);
	};

	var global$1x = global$1y;
	var uncurryThis$P = functionUncurryThis$1;
	var fails$G = fails$I;
	var classof$l = classofRaw$3;

	var Object$d = global$1x.Object;
	var split$4 = uncurryThis$P(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject$1 = fails$G(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$d('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$l(it) == 'String' ? split$4(it, '') : Object$d(it);
	} : Object$d;

	var global$1w = global$1y;

	var TypeError$z = global$1w.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$d = function (it) {
	  if (it == undefined) throw TypeError$z("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$5 = indexedObject$1;
	var requireObjectCoercible$c = requireObjectCoercible$d;

	var toIndexedObject$i = function (it) {
	  return IndexedObject$5(requireObjectCoercible$c(it));
	};

	var isCallable$G = isCallable$H;

	var isObject$p = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$G(it);
	};

	var path$j = {};

	var path$i = path$j;
	var global$1v = global$1y;
	var isCallable$F = isCallable$H;

	var aFunction$1 = function (variable) {
	  return isCallable$F(variable) ? variable : undefined;
	};

	var getBuiltIn$l = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path$i[namespace]) || aFunction$1(global$1v[namespace])
	    : path$i[namespace] && path$i[namespace][method] || global$1v[namespace] && global$1v[namespace][method];
	};

	var uncurryThis$O = functionUncurryThis$1;

	var objectIsPrototypeOf$1 = uncurryThis$O({}.isPrototypeOf);

	var getBuiltIn$k = getBuiltIn$l;

	var engineUserAgent$1 = getBuiltIn$k('navigator', 'userAgent') || '';

	var global$1u = global$1y;
	var userAgent$7 = engineUserAgent$1;

	var process$7 = global$1u.process;
	var Deno$2 = global$1u.Deno;
	var versions$1 = process$7 && process$7.versions || Deno$2 && Deno$2.version;
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
	if (!version$1 && userAgent$7) {
	  match$1 = userAgent$7.match(/Edge\/(\d+)/);
	  if (!match$1 || match$1[1] >= 74) {
	    match$1 = userAgent$7.match(/Chrome\/(\d+)/);
	    if (match$1) version$1 = +match$1[1];
	  }
	}

	var engineV8Version$1 = version$1;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$5 = engineV8Version$1;
	var fails$F = fails$I;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol$1 = !!Object.getOwnPropertySymbols && !fails$F(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$5 && V8_VERSION$5 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$4 = nativeSymbol$1;

	var useSymbolAsUid$1 = NATIVE_SYMBOL$4
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$1t = global$1y;
	var getBuiltIn$j = getBuiltIn$l;
	var isCallable$E = isCallable$H;
	var isPrototypeOf$j = objectIsPrototypeOf$1;
	var USE_SYMBOL_AS_UID$3 = useSymbolAsUid$1;

	var Object$c = global$1t.Object;

	var isSymbol$7 = USE_SYMBOL_AS_UID$3 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$j('Symbol');
	  return isCallable$E($Symbol) && isPrototypeOf$j($Symbol.prototype, Object$c(it));
	};

	var global$1s = global$1y;

	var String$a = global$1s.String;

	var tryToString$9 = function (argument) {
	  try {
	    return String$a(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$1r = global$1y;
	var isCallable$D = isCallable$H;
	var tryToString$8 = tryToString$9;

	var TypeError$y = global$1r.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$f = function (argument) {
	  if (isCallable$D(argument)) return argument;
	  throw TypeError$y(tryToString$8(argument) + ' is not a function');
	};

	var aCallable$e = aCallable$f;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$a = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$e(func);
	};

	var global$1q = global$1y;
	var call$x = functionCall$1;
	var isCallable$C = isCallable$H;
	var isObject$o = isObject$p;

	var TypeError$x = global$1q.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$3 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$C(fn = input.toString) && !isObject$o(val = call$x(fn, input))) return val;
	  if (isCallable$C(fn = input.valueOf) && !isObject$o(val = call$x(fn, input))) return val;
	  if (pref !== 'string' && isCallable$C(fn = input.toString) && !isObject$o(val = call$x(fn, input))) return val;
	  throw TypeError$x("Can't convert object to primitive value");
	};

	var shared$9 = {exports: {}};

	var isPure = true;

	var global$1p = global$1y;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$h = Object.defineProperty;

	var setGlobal$5 = function (key, value) {
	  try {
	    defineProperty$h(global$1p, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$1p[key] = value;
	  } return value;
	};

	var global$1o = global$1y;
	var setGlobal$4 = setGlobal$5;

	var SHARED$1 = '__core-js_shared__';
	var store$7 = global$1o[SHARED$1] || setGlobal$4(SHARED$1, {});

	var sharedStore$1 = store$7;

	var store$6 = sharedStore$1;

	(shared$9.exports = function (key, value) {
	  return store$6[key] || (store$6[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.20.2',
	  mode: 'pure' ,
	  copyright: '© 2022 Denis Pushkarev (zloirock.ru)'
	});

	var global$1n = global$1y;
	var requireObjectCoercible$b = requireObjectCoercible$d;

	var Object$b = global$1n.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$e = function (argument) {
	  return Object$b(requireObjectCoercible$b(argument));
	};

	var uncurryThis$N = functionUncurryThis$1;
	var toObject$d = toObject$e;

	var hasOwnProperty$1 = uncurryThis$N({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1$1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty$1(toObject$d(it), key);
	};

	var uncurryThis$M = functionUncurryThis$1;

	var id$1 = 0;
	var postfix$1 = Math.random();
	var toString$j = uncurryThis$M(1.0.toString);

	var uid$6 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$j(++id$1 + postfix$1, 36);
	};

	var global$1m = global$1y;
	var shared$8 = shared$9.exports;
	var hasOwn$q = hasOwnProperty_1$1;
	var uid$5 = uid$6;
	var NATIVE_SYMBOL$3 = nativeSymbol$1;
	var USE_SYMBOL_AS_UID$2 = useSymbolAsUid$1;

	var WellKnownSymbolsStore$2 = shared$8('wks');
	var Symbol$2 = global$1m.Symbol;
	var symbolFor$1 = Symbol$2 && Symbol$2['for'];
	var createWellKnownSymbol$1 = USE_SYMBOL_AS_UID$2 ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$5;

	var wellKnownSymbol$I = function (name) {
	  if (!hasOwn$q(WellKnownSymbolsStore$2, name) || !(NATIVE_SYMBOL$3 || typeof WellKnownSymbolsStore$2[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$3 && hasOwn$q(Symbol$2, name)) {
	      WellKnownSymbolsStore$2[name] = Symbol$2[name];
	    } else if (USE_SYMBOL_AS_UID$2 && symbolFor$1) {
	      WellKnownSymbolsStore$2[name] = symbolFor$1(description);
	    } else {
	      WellKnownSymbolsStore$2[name] = createWellKnownSymbol$1(description);
	    }
	  } return WellKnownSymbolsStore$2[name];
	};

	var global$1l = global$1y;
	var call$w = functionCall$1;
	var isObject$n = isObject$p;
	var isSymbol$6 = isSymbol$7;
	var getMethod$9 = getMethod$a;
	var ordinaryToPrimitive$2 = ordinaryToPrimitive$3;
	var wellKnownSymbol$H = wellKnownSymbol$I;

	var TypeError$w = global$1l.TypeError;
	var TO_PRIMITIVE$2 = wellKnownSymbol$H('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$4 = function (input, pref) {
	  if (!isObject$n(input) || isSymbol$6(input)) return input;
	  var exoticToPrim = getMethod$9(input, TO_PRIMITIVE$2);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$w(exoticToPrim, input, pref);
	    if (!isObject$n(result) || isSymbol$6(result)) return result;
	    throw TypeError$w("Can't convert object to primitive value");
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

	var global$1k = global$1y;
	var isObject$m = isObject$p;

	var document$6 = global$1k.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$3 = isObject$m(document$6) && isObject$m(document$6.createElement);

	var documentCreateElement$4 = function (it) {
	  return EXISTS$3 ? document$6.createElement(it) : {};
	};

	var DESCRIPTORS$r = descriptors$1;
	var fails$E = fails$I;
	var createElement$3 = documentCreateElement$4;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine$1 = !DESCRIPTORS$r && !fails$E(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$3('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$q = descriptors$1;
	var call$v = functionCall$1;
	var propertyIsEnumerableModule$3 = objectPropertyIsEnumerable$1;
	var createPropertyDescriptor$c = createPropertyDescriptor$d;
	var toIndexedObject$h = toIndexedObject$i;
	var toPropertyKey$7 = toPropertyKey$8;
	var hasOwn$p = hasOwnProperty_1$1;
	var IE8_DOM_DEFINE$3 = ie8DomDefine$1;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor$1.f = DESCRIPTORS$q ? $getOwnPropertyDescriptor$4 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$h(O);
	  P = toPropertyKey$7(P);
	  if (IE8_DOM_DEFINE$3) try {
	    return $getOwnPropertyDescriptor$4(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$p(O, P)) return createPropertyDescriptor$c(!call$v(propertyIsEnumerableModule$3.f, O, P), O[P]);
	};

	var fails$D = fails$I;
	var isCallable$B = isCallable$H;

	var replacement$1 = /#|\.prototype\./;

	var isForced$7 = function (feature, detection) {
	  var value = data$1[normalize$1(feature)];
	  return value == POLYFILL$1 ? true
	    : value == NATIVE$1 ? false
	    : isCallable$B(detection) ? fails$D(detection)
	    : !!detection;
	};

	var normalize$1 = isForced$7.normalize = function (string) {
	  return String(string).replace(replacement$1, '.').toLowerCase();
	};

	var data$1 = isForced$7.data = {};
	var NATIVE$1 = isForced$7.NATIVE = 'N';
	var POLYFILL$1 = isForced$7.POLYFILL = 'P';

	var isForced_1$1 = isForced$7;

	var uncurryThis$L = functionUncurryThis$1;
	var aCallable$d = aCallable$f;

	var bind$g = uncurryThis$L(uncurryThis$L.bind);

	// optional / simple context binding
	var functionBindContext$1 = function (fn, that) {
	  aCallable$d(fn);
	  return that === undefined ? fn : bind$g ? bind$g(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty$1 = {};

	var DESCRIPTORS$p = descriptors$1;
	var fails$C = fails$I;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug$1 = DESCRIPTORS$p && fails$C(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$1j = global$1y;
	var isObject$l = isObject$p;

	var String$9 = global$1j.String;
	var TypeError$v = global$1j.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$u = function (argument) {
	  if (isObject$l(argument)) return argument;
	  throw TypeError$v(String$9(argument) + ' is not an object');
	};

	var global$1i = global$1y;
	var DESCRIPTORS$o = descriptors$1;
	var IE8_DOM_DEFINE$2 = ie8DomDefine$1;
	var V8_PROTOTYPE_DEFINE_BUG$3 = v8PrototypeDefineBug$1;
	var anObject$t = anObject$u;
	var toPropertyKey$6 = toPropertyKey$8;

	var TypeError$u = global$1i.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$2 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE$1 = 'enumerable';
	var CONFIGURABLE$3 = 'configurable';
	var WRITABLE$1 = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty$1.f = DESCRIPTORS$o ? V8_PROTOTYPE_DEFINE_BUG$3 ? function defineProperty(O, P, Attributes) {
	  anObject$t(O);
	  P = toPropertyKey$6(P);
	  anObject$t(Attributes);
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
	  anObject$t(O);
	  P = toPropertyKey$6(P);
	  anObject$t(Attributes);
	  if (IE8_DOM_DEFINE$2) try {
	    return $defineProperty$2(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$u('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$n = descriptors$1;
	var definePropertyModule$b = objectDefineProperty$1;
	var createPropertyDescriptor$b = createPropertyDescriptor$d;

	var createNonEnumerableProperty$g = DESCRIPTORS$n ? function (object, key, value) {
	  return definePropertyModule$b.f(object, key, createPropertyDescriptor$b(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$1h = global$1y;
	var apply$8 = functionApply$1;
	var uncurryThis$K = functionUncurryThis$1;
	var isCallable$A = isCallable$H;
	var getOwnPropertyDescriptor$9 = objectGetOwnPropertyDescriptor$1.f;
	var isForced$6 = isForced_1$1;
	var path$h = path$j;
	var bind$f = functionBindContext$1;
	var createNonEnumerableProperty$f = createNonEnumerableProperty$g;
	var hasOwn$o = hasOwnProperty_1$1;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply$8(NativeConstructor, this, arguments);
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

	  var nativeSource = GLOBAL ? global$1h : STATIC ? global$1h[TARGET] : (global$1h[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$h : path$h[TARGET] || createNonEnumerableProperty$f(path$h, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced$6(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn$o(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$9(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind$f(sourceProperty, global$1h);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable$A(sourceProperty)) resultProperty = uncurryThis$K(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$f(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty$f(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn$o(path$h, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty$f(path$h, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty$f(path$h[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty$f(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var shared$7 = shared$9.exports;
	var uid$4 = uid$6;

	var keys$6 = shared$7('keys');

	var sharedKey$8 = function (key) {
	  return keys$6[key] || (keys$6[key] = uid$4(key));
	};

	var fails$B = fails$I;

	var correctPrototypeGetter$1 = !fails$B(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var global$1g = global$1y;
	var hasOwn$n = hasOwnProperty_1$1;
	var isCallable$z = isCallable$H;
	var toObject$c = toObject$e;
	var sharedKey$7 = sharedKey$8;
	var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter$1;

	var IE_PROTO$3 = sharedKey$7('IE_PROTO');
	var Object$a = global$1g.Object;
	var ObjectPrototype$2 = Object$a.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER$1 ? Object$a.getPrototypeOf : function (O) {
	  var object = toObject$c(O);
	  if (hasOwn$n(object, IE_PROTO$3)) return object[IE_PROTO$3];
	  var constructor = object.constructor;
	  if (isCallable$z(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object$a ? ObjectPrototype$2 : null;
	};

	var global$1f = global$1y;
	var isCallable$y = isCallable$H;

	var String$8 = global$1f.String;
	var TypeError$t = global$1f.TypeError;

	var aPossiblePrototype$3 = function (argument) {
	  if (typeof argument == 'object' || isCallable$y(argument)) return argument;
	  throw TypeError$t("Can't set " + String$8(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$J = functionUncurryThis$1;
	var anObject$s = anObject$u;
	var aPossiblePrototype$2 = aPossiblePrototype$3;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf$1 = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$J(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$s(O);
	    aPossiblePrototype$2(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var objectGetOwnPropertyNames$1 = {};

	var ceil$1 = Math.ceil;
	var floor$5 = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$9 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor$5 : ceil$1)(number);
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
	var toLength$6 = function (argument) {
	  return argument > 0 ? min$5(toIntegerOrInfinity$7(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$5 = toLength$6;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$d = function (obj) {
	  return toLength$5(obj.length);
	};

	var toIndexedObject$g = toIndexedObject$i;
	var toAbsoluteIndex$6 = toAbsoluteIndex$7;
	var lengthOfArrayLike$c = lengthOfArrayLike$d;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$8 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$g($this);
	    var length = lengthOfArrayLike$c(O);
	    var index = toAbsoluteIndex$6(fromIndex, length);
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

	var hiddenKeys$a = {};

	var uncurryThis$I = functionUncurryThis$1;
	var hasOwn$m = hasOwnProperty_1$1;
	var toIndexedObject$f = toIndexedObject$i;
	var indexOf$2 = arrayIncludes$1.indexOf;
	var hiddenKeys$9 = hiddenKeys$a;

	var push$b = uncurryThis$I([].push);

	var objectKeysInternal$1 = function (object, names) {
	  var O = toIndexedObject$f(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$m(hiddenKeys$9, key) && hasOwn$m(O, key) && push$b(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$m(O, key = names[i++])) {
	    ~indexOf$2(result, key) || push$b(result, key);
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

	var hiddenKeys$8 = enumBugKeys$6.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames$1.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$3(O, hiddenKeys$8);
	};

	var objectGetOwnPropertySymbols$1 = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols$1.f = Object.getOwnPropertySymbols;

	var getBuiltIn$i = getBuiltIn$l;
	var uncurryThis$H = functionUncurryThis$1;
	var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames$1;
	var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols$1;
	var anObject$r = anObject$u;

	var concat$7 = uncurryThis$H([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$8 = getBuiltIn$i('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$2.f(anObject$r(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$3.f;
	  return getOwnPropertySymbols ? concat$7(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$l = hasOwnProperty_1$1;
	var ownKeys$7 = ownKeys$8;
	var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor$1;
	var definePropertyModule$a = objectDefineProperty$1;

	var copyConstructorProperties$3 = function (target, source, exceptions) {
	  var keys = ownKeys$7(source);
	  var defineProperty = definePropertyModule$a.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$3.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$l(target, key) && !(exceptions && hasOwn$l(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var objectDefineProperties$1 = {};

	var internalObjectKeys$2 = objectKeysInternal$1;
	var enumBugKeys$5 = enumBugKeys$7;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$6 = Object.keys || function keys(O) {
	  return internalObjectKeys$2(O, enumBugKeys$5);
	};

	var DESCRIPTORS$m = descriptors$1;
	var V8_PROTOTYPE_DEFINE_BUG$2 = v8PrototypeDefineBug$1;
	var definePropertyModule$9 = objectDefineProperty$1;
	var anObject$q = anObject$u;
	var toIndexedObject$e = toIndexedObject$i;
	var objectKeys$5 = objectKeys$6;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties$1.f = DESCRIPTORS$m && !V8_PROTOTYPE_DEFINE_BUG$2 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$q(O);
	  var props = toIndexedObject$e(Properties);
	  var keys = objectKeys$5(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$9.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$h = getBuiltIn$l;

	var html$5 = getBuiltIn$h('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$p = anObject$u;
	var definePropertiesModule$2 = objectDefineProperties$1;
	var enumBugKeys$4 = enumBugKeys$7;
	var hiddenKeys$7 = hiddenKeys$a;
	var html$4 = html$5;
	var documentCreateElement$3 = documentCreateElement$4;
	var sharedKey$6 = sharedKey$8;

	var GT$1 = '>';
	var LT$1 = '<';
	var PROTOTYPE$2 = 'prototype';
	var SCRIPT$1 = 'script';
	var IE_PROTO$2 = sharedKey$6('IE_PROTO');

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
	  var iframe = documentCreateElement$3('iframe');
	  var JS = 'java' + SCRIPT$1 + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html$4.appendChild(iframe);
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

	hiddenKeys$7[IE_PROTO$2] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate$1 = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor$1[PROTOTYPE$2] = anObject$p(O);
	    result = new EmptyConstructor$1();
	    EmptyConstructor$1[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$2] = O;
	  } else result = NullProtoObject$1();
	  return Properties === undefined ? result : definePropertiesModule$2.f(result, Properties);
	};

	var uncurryThis$G = functionUncurryThis$1;

	var replace$9 = uncurryThis$G(''.replace);

	var TEST = (function (arg) { return String(Error(arg).stack); })('zxcasd');
	var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
	var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

	var clearErrorStack$1 = function (stack, dropEntries) {
	  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string') {
	    while (dropEntries--) stack = replace$9(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
	  } return stack;
	};

	var isObject$k = isObject$p;
	var createNonEnumerableProperty$e = createNonEnumerableProperty$g;

	// `InstallErrorCause` abstract operation
	// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
	var installErrorCause$1 = function (O, options) {
	  if (isObject$k(options) && 'cause' in options) {
	    createNonEnumerableProperty$e(O, 'cause', options.cause);
	  }
	};

	var iterators$1 = {};

	var wellKnownSymbol$G = wellKnownSymbol$I;
	var Iterators$a = iterators$1;

	var ITERATOR$c = wellKnownSymbol$G('iterator');
	var ArrayPrototype$a = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$4 = function (it) {
	  return it !== undefined && (Iterators$a.Array === it || ArrayPrototype$a[ITERATOR$c] === it);
	};

	var wellKnownSymbol$F = wellKnownSymbol$I;

	var TO_STRING_TAG$8 = wellKnownSymbol$F('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$8] = 'z';

	var toStringTagSupport$1 = String(test$1) === '[object z]';

	var global$1e = global$1y;
	var TO_STRING_TAG_SUPPORT$5 = toStringTagSupport$1;
	var isCallable$x = isCallable$H;
	var classofRaw$2 = classofRaw$3;
	var wellKnownSymbol$E = wellKnownSymbol$I;

	var TO_STRING_TAG$7 = wellKnownSymbol$E('toStringTag');
	var Object$9 = global$1e.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS$1 = classofRaw$2(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet$1 = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$k = TO_STRING_TAG_SUPPORT$5 ? classofRaw$2 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet$1(O = Object$9(it), TO_STRING_TAG$7)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS$1 ? classofRaw$2(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$2(O)) == 'Object' && isCallable$x(O.callee) ? 'Arguments' : result;
	};

	var classof$j = classof$k;
	var getMethod$8 = getMethod$a;
	var Iterators$9 = iterators$1;
	var wellKnownSymbol$D = wellKnownSymbol$I;

	var ITERATOR$b = wellKnownSymbol$D('iterator');

	var getIteratorMethod$c = function (it) {
	  if (it != undefined) return getMethod$8(it, ITERATOR$b)
	    || getMethod$8(it, '@@iterator')
	    || Iterators$9[classof$j(it)];
	};

	var global$1d = global$1y;
	var call$u = functionCall$1;
	var aCallable$c = aCallable$f;
	var anObject$o = anObject$u;
	var tryToString$7 = tryToString$9;
	var getIteratorMethod$b = getIteratorMethod$c;

	var TypeError$s = global$1d.TypeError;

	var getIterator$5 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$b(argument) : usingIterator;
	  if (aCallable$c(iteratorMethod)) return anObject$o(call$u(iteratorMethod, argument));
	  throw TypeError$s(tryToString$7(argument) + ' is not iterable');
	};

	var call$t = functionCall$1;
	var anObject$n = anObject$u;
	var getMethod$7 = getMethod$a;

	var iteratorClose$4 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$n(iterator);
	  try {
	    innerResult = getMethod$7(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$t(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$n(innerResult);
	  return value;
	};

	var global$1c = global$1y;
	var bind$e = functionBindContext$1;
	var call$s = functionCall$1;
	var anObject$m = anObject$u;
	var tryToString$6 = tryToString$9;
	var isArrayIteratorMethod$3 = isArrayIteratorMethod$4;
	var lengthOfArrayLike$b = lengthOfArrayLike$d;
	var isPrototypeOf$i = objectIsPrototypeOf$1;
	var getIterator$4 = getIterator$5;
	var getIteratorMethod$a = getIteratorMethod$c;
	var iteratorClose$3 = iteratorClose$4;

	var TypeError$r = global$1c.TypeError;

	var Result$1 = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype$1 = Result$1.prototype;

	var iterate$7 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$e(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose$3(iterator, 'normal', condition);
	    return new Result$1(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$m(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod$a(iterable);
	    if (!iterFn) throw TypeError$r(tryToString$6(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod$3(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$b(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$i(ResultPrototype$1, result)) return result;
	      } return new Result$1(false);
	    }
	    iterator = getIterator$4(iterable, iterFn);
	  }

	  next = iterator.next;
	  while (!(step = call$s(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose$3(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf$i(ResultPrototype$1, result)) return result;
	  } return new Result$1(false);
	};

	var global$1b = global$1y;
	var classof$i = classof$k;

	var String$7 = global$1b.String;

	var toString$i = function (argument) {
	  if (classof$i(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$7(argument);
	};

	var toString$h = toString$i;

	var normalizeStringArgument$1 = function (argument, $default) {
	  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$h(argument);
	};

	var fails$A = fails$I;
	var createPropertyDescriptor$a = createPropertyDescriptor$d;

	var errorStackInstallable = !fails$A(function () {
	  var error = Error('a');
	  if (!('stack' in error)) return true;
	  // eslint-disable-next-line es/no-object-defineproperty -- safe
	  Object.defineProperty(error, 'stack', createPropertyDescriptor$a(1, 7));
	  return error.stack !== 7;
	});

	var $$D = _export$1;
	var global$1a = global$1y;
	var isPrototypeOf$h = objectIsPrototypeOf$1;
	var getPrototypeOf$4 = objectGetPrototypeOf$1;
	var setPrototypeOf$9 = objectSetPrototypeOf$1;
	var copyConstructorProperties$2 = copyConstructorProperties$3;
	var create$c = objectCreate$1;
	var createNonEnumerableProperty$d = createNonEnumerableProperty$g;
	var createPropertyDescriptor$9 = createPropertyDescriptor$d;
	var clearErrorStack = clearErrorStack$1;
	var installErrorCause = installErrorCause$1;
	var iterate$6 = iterate$7;
	var normalizeStringArgument = normalizeStringArgument$1;
	var wellKnownSymbol$C = wellKnownSymbol$I;
	var ERROR_STACK_INSTALLABLE = errorStackInstallable;

	var TO_STRING_TAG$6 = wellKnownSymbol$C('toStringTag');
	var Error$1 = global$1a.Error;
	var push$a = [].push;

	var $AggregateError = function AggregateError(errors, message /* , options */) {
	  var options = arguments.length > 2 ? arguments[2] : undefined;
	  var isInstance = isPrototypeOf$h(AggregateErrorPrototype, this);
	  var that;
	  if (setPrototypeOf$9) {
	    that = setPrototypeOf$9(new Error$1(), isInstance ? getPrototypeOf$4(this) : AggregateErrorPrototype);
	  } else {
	    that = isInstance ? this : create$c(AggregateErrorPrototype);
	    createNonEnumerableProperty$d(that, TO_STRING_TAG$6, 'Error');
	  }
	  if (message !== undefined) createNonEnumerableProperty$d(that, 'message', normalizeStringArgument(message));
	  if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty$d(that, 'stack', clearErrorStack(that.stack, 1));
	  installErrorCause(that, options);
	  var errorsArray = [];
	  iterate$6(errors, push$a, { that: errorsArray });
	  createNonEnumerableProperty$d(that, 'errors', errorsArray);
	  return that;
	};

	if (setPrototypeOf$9) setPrototypeOf$9($AggregateError, Error$1);
	else copyConstructorProperties$2($AggregateError, Error$1, { name: true });

	var AggregateErrorPrototype = $AggregateError.prototype = create$c(Error$1.prototype, {
	  constructor: createPropertyDescriptor$9(1, $AggregateError),
	  message: createPropertyDescriptor$9(1, ''),
	  name: createPropertyDescriptor$9(1, 'AggregateError')
	});

	// `AggregateError` constructor
	// https://tc39.es/ecma262/#sec-aggregate-error-constructor
	$$D({ global: true }, {
	  AggregateError: $AggregateError
	});

	var uncurryThis$F = functionUncurryThis$1;
	var isCallable$w = isCallable$H;
	var store$5 = sharedStore$1;

	var functionToString$2 = uncurryThis$F(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$w(store$5.inspectSource)) {
	  store$5.inspectSource = function (it) {
	    return functionToString$2(it);
	  };
	}

	var inspectSource$8 = store$5.inspectSource;

	var global$19 = global$1y;
	var isCallable$v = isCallable$H;
	var inspectSource$7 = inspectSource$8;

	var WeakMap$3 = global$19.WeakMap;

	var nativeWeakMap$1 = isCallable$v(WeakMap$3) && /native code/.test(inspectSource$7(WeakMap$3));

	var NATIVE_WEAK_MAP$1 = nativeWeakMap$1;
	var global$18 = global$1y;
	var uncurryThis$E = functionUncurryThis$1;
	var isObject$j = isObject$p;
	var createNonEnumerableProperty$c = createNonEnumerableProperty$g;
	var hasOwn$k = hasOwnProperty_1$1;
	var shared$6 = sharedStore$1;
	var sharedKey$5 = sharedKey$8;
	var hiddenKeys$6 = hiddenKeys$a;

	var OBJECT_ALREADY_INITIALIZED$1 = 'Object already initialized';
	var TypeError$q = global$18.TypeError;
	var WeakMap$2 = global$18.WeakMap;
	var set$4, get$2, has$1;

	var enforce$1 = function (it) {
	  return has$1(it) ? get$2(it) : set$4(it, {});
	};

	var getterFor$1 = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$j(it) || (state = get$2(it)).type !== TYPE) {
	      throw TypeError$q('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP$1 || shared$6.state) {
	  var store$4 = shared$6.state || (shared$6.state = new WeakMap$2());
	  var wmget$1 = uncurryThis$E(store$4.get);
	  var wmhas$1 = uncurryThis$E(store$4.has);
	  var wmset$1 = uncurryThis$E(store$4.set);
	  set$4 = function (it, metadata) {
	    if (wmhas$1(store$4, it)) throw new TypeError$q(OBJECT_ALREADY_INITIALIZED$1);
	    metadata.facade = it;
	    wmset$1(store$4, it, metadata);
	    return metadata;
	  };
	  get$2 = function (it) {
	    return wmget$1(store$4, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas$1(store$4, it);
	  };
	} else {
	  var STATE$1 = sharedKey$5('state');
	  hiddenKeys$6[STATE$1] = true;
	  set$4 = function (it, metadata) {
	    if (hasOwn$k(it, STATE$1)) throw new TypeError$q(OBJECT_ALREADY_INITIALIZED$1);
	    metadata.facade = it;
	    createNonEnumerableProperty$c(it, STATE$1, metadata);
	    return metadata;
	  };
	  get$2 = function (it) {
	    return hasOwn$k(it, STATE$1) ? it[STATE$1] : {};
	  };
	  has$1 = function (it) {
	    return hasOwn$k(it, STATE$1);
	  };
	}

	var internalState$1 = {
	  set: set$4,
	  get: get$2,
	  has: has$1,
	  enforce: enforce$1,
	  getterFor: getterFor$1
	};

	var DESCRIPTORS$l = descriptors$1;
	var hasOwn$j = hasOwnProperty_1$1;

	var FunctionPrototype$4 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor$1 = DESCRIPTORS$l && Object.getOwnPropertyDescriptor;

	var EXISTS$2 = hasOwn$j(FunctionPrototype$4, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER$1 = EXISTS$2 && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE$2 = EXISTS$2 && (!DESCRIPTORS$l || (DESCRIPTORS$l && getDescriptor$1(FunctionPrototype$4, 'name').configurable));

	var functionName$1 = {
	  EXISTS: EXISTS$2,
	  PROPER: PROPER$1,
	  CONFIGURABLE: CONFIGURABLE$2
	};

	var createNonEnumerableProperty$b = createNonEnumerableProperty$g;

	var redefine$6 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$b(target, key, value);
	};

	var fails$z = fails$I;
	var isCallable$u = isCallable$H;
	var create$b = objectCreate$1;
	var getPrototypeOf$3 = objectGetPrototypeOf$1;
	var redefine$5 = redefine$6;
	var wellKnownSymbol$B = wellKnownSymbol$I;

	var ITERATOR$a = wellKnownSymbol$B('iterator');
	var BUGGY_SAFARI_ITERATORS$3 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype$1, arrayIterator$1;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator$1 = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator$1)) BUGGY_SAFARI_ITERATORS$3 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype$1 = getPrototypeOf$3(getPrototypeOf$3(arrayIterator$1));
	    if (PrototypeOfArrayIteratorPrototype$1 !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype$1;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE$1 = IteratorPrototype$4 == undefined || fails$z(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$4[ITERATOR$a].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE$1) IteratorPrototype$4 = {};
	else IteratorPrototype$4 = create$b(IteratorPrototype$4);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$u(IteratorPrototype$4[ITERATOR$a])) {
	  redefine$5(IteratorPrototype$4, ITERATOR$a, function () {
	    return this;
	  });
	}

	var iteratorsCore$1 = {
	  IteratorPrototype: IteratorPrototype$4,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$3
	};

	var TO_STRING_TAG_SUPPORT$4 = toStringTagSupport$1;
	var classof$h = classof$k;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString$2 = TO_STRING_TAG_SUPPORT$4 ? {}.toString : function toString() {
	  return '[object ' + classof$h(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT$3 = toStringTagSupport$1;
	var defineProperty$g = objectDefineProperty$1.f;
	var createNonEnumerableProperty$a = createNonEnumerableProperty$g;
	var hasOwn$i = hasOwnProperty_1$1;
	var toString$g = objectToString$2;
	var wellKnownSymbol$A = wellKnownSymbol$I;

	var TO_STRING_TAG$5 = wellKnownSymbol$A('toStringTag');

	var setToStringTag$b = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!hasOwn$i(target, TO_STRING_TAG$5)) {
	      defineProperty$g(target, TO_STRING_TAG$5, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT$3) {
	      createNonEnumerableProperty$a(target, 'toString', toString$g);
	    }
	  }
	};

	var IteratorPrototype$3 = iteratorsCore$1.IteratorPrototype;
	var create$a = objectCreate$1;
	var createPropertyDescriptor$8 = createPropertyDescriptor$d;
	var setToStringTag$a = setToStringTag$b;
	var Iterators$8 = iterators$1;

	var returnThis$3 = function () { return this; };

	var createIteratorConstructor$4 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$a(IteratorPrototype$3, { next: createPropertyDescriptor$8(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$a(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators$8[TO_STRING_TAG] = returnThis$3;
	  return IteratorConstructor;
	};

	var $$C = _export$1;
	var call$r = functionCall$1;
	var FunctionName$1 = functionName$1;
	var createIteratorConstructor$3 = createIteratorConstructor$4;
	var getPrototypeOf$2 = objectGetPrototypeOf$1;
	var setToStringTag$9 = setToStringTag$b;
	var redefine$4 = redefine$6;
	var wellKnownSymbol$z = wellKnownSymbol$I;
	var Iterators$7 = iterators$1;
	var IteratorsCore$1 = iteratorsCore$1;

	var PROPER_FUNCTION_NAME$3 = FunctionName$1.PROPER;
	var BUGGY_SAFARI_ITERATORS$2 = IteratorsCore$1.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$9 = wellKnownSymbol$z('iterator');
	var KEYS$1 = 'keys';
	var VALUES$1 = 'values';
	var ENTRIES$1 = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator$5 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$3(IteratorConstructor, NAME, next);

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
	  var nativeIterator = IterablePrototype[ITERATOR$9]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$2 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag$9(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      Iterators$7[TO_STRING_TAG] = returnThis$2;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME$3 && DEFAULT == VALUES$1 && nativeIterator && nativeIterator.name !== VALUES$1) {
	    {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$r(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES$1),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS$1),
	      entries: getIterationMethod(ENTRIES$1)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$2 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$4(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$C({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$2 || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR$9] !== defaultIterator) {
	    redefine$4(IterablePrototype, ITERATOR$9, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$7[NAME] = defaultIterator;

	  return methods;
	};

	var toIndexedObject$d = toIndexedObject$i;
	var Iterators$6 = iterators$1;
	var InternalStateModule$9 = internalState$1;
	objectDefineProperty$1.f;
	var defineIterator$4 = defineIterator$5;

	var ARRAY_ITERATOR$1 = 'Array Iterator';
	var setInternalState$8 = InternalStateModule$9.set;
	var getInternalState$7 = InternalStateModule$9.getterFor(ARRAY_ITERATOR$1);

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
	defineIterator$4(Array, 'Array', function (iterated, kind) {
	  setInternalState$8(this, {
	    type: ARRAY_ITERATOR$1,
	    target: toIndexedObject$d(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$7(this);
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
	Iterators$6.Arguments = Iterators$6.Array;

	var global$17 = global$1y;

	var nativePromiseConstructor = global$17.Promise;

	var redefine$3 = redefine$6;

	var redefineAll$2 = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else redefine$3(target, key, src[key], options);
	  } return target;
	};

	var getBuiltIn$g = getBuiltIn$l;
	var definePropertyModule$8 = objectDefineProperty$1;
	var wellKnownSymbol$y = wellKnownSymbol$I;
	var DESCRIPTORS$k = descriptors$1;

	var SPECIES$a = wellKnownSymbol$y('species');

	var setSpecies$4 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$g(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule$8.f;

	  if (DESCRIPTORS$k && Constructor && !Constructor[SPECIES$a]) {
	    defineProperty(Constructor, SPECIES$a, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var global$16 = global$1y;
	var isPrototypeOf$g = objectIsPrototypeOf$1;

	var TypeError$p = global$16.TypeError;

	var anInstance$5 = function (it, Prototype) {
	  if (isPrototypeOf$g(Prototype, it)) return it;
	  throw TypeError$p('Incorrect invocation');
	};

	var wellKnownSymbol$x = wellKnownSymbol$I;

	var ITERATOR$8 = wellKnownSymbol$x('iterator');
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
	  iteratorWithReturn$1[ITERATOR$8] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn$1, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING$1) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$8] = function () {
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

	var uncurryThis$D = functionUncurryThis$1;
	var fails$y = fails$I;
	var isCallable$t = isCallable$H;
	var classof$g = classof$k;
	var getBuiltIn$f = getBuiltIn$l;
	var inspectSource$6 = inspectSource$8;

	var noop$1 = function () { /* empty */ };
	var empty$1 = [];
	var construct$1 = getBuiltIn$f('Reflect', 'construct');
	var constructorRegExp$1 = /^\s*(?:class|function)\b/;
	var exec$7 = uncurryThis$D(constructorRegExp$1.exec);
	var INCORRECT_TO_STRING$1 = !constructorRegExp$1.exec(noop$1);

	var isConstructorModern$1 = function isConstructor(argument) {
	  if (!isCallable$t(argument)) return false;
	  try {
	    construct$1(noop$1, empty$1, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy$1 = function isConstructor(argument) {
	  if (!isCallable$t(argument)) return false;
	  switch (classof$g(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING$1 || !!exec$7(constructorRegExp$1, inspectSource$6(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy$1.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$7 = !construct$1 || fails$y(function () {
	  var called;
	  return isConstructorModern$1(isConstructorModern$1.call)
	    || !isConstructorModern$1(Object)
	    || !isConstructorModern$1(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy$1 : isConstructorModern$1;

	var global$15 = global$1y;
	var isConstructor$6 = isConstructor$7;
	var tryToString$5 = tryToString$9;

	var TypeError$o = global$15.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$3 = function (argument) {
	  if (isConstructor$6(argument)) return argument;
	  throw TypeError$o(tryToString$5(argument) + ' is not a constructor');
	};

	var anObject$l = anObject$u;
	var aConstructor$2 = aConstructor$3;
	var wellKnownSymbol$w = wellKnownSymbol$I;

	var SPECIES$9 = wellKnownSymbol$w('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$5 = function (O, defaultConstructor) {
	  var C = anObject$l(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$l(C)[SPECIES$9]) == undefined ? defaultConstructor : aConstructor$2(S);
	};

	var uncurryThis$C = functionUncurryThis$1;

	var arraySlice$9 = uncurryThis$C([].slice);

	var userAgent$6 = engineUserAgent$1;

	var engineIsIos$1 = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$6);

	var classof$f = classofRaw$3;
	var global$14 = global$1y;

	var engineIsNode$1 = classof$f(global$14.process) == 'process';

	var global$13 = global$1y;
	var apply$7 = functionApply$1;
	var bind$d = functionBindContext$1;
	var isCallable$s = isCallable$H;
	var hasOwn$h = hasOwnProperty_1$1;
	var fails$x = fails$I;
	var html$3 = html$5;
	var arraySlice$8 = arraySlice$9;
	var createElement$2 = documentCreateElement$4;
	var IS_IOS$3 = engineIsIos$1;
	var IS_NODE$5 = engineIsNode$1;

	var set$3 = global$13.setImmediate;
	var clear$1 = global$13.clearImmediate;
	var process$6 = global$13.process;
	var Dispatch$1 = global$13.Dispatch;
	var Function$2 = global$13.Function;
	var MessageChannel$1 = global$13.MessageChannel;
	var String$6 = global$13.String;
	var counter$1 = 0;
	var queue$3 = {};
	var ONREADYSTATECHANGE$1 = 'onreadystatechange';
	var location$1, defer$1, channel$1, port$1;

	try {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  location$1 = global$13.location;
	} catch (error) { /* empty */ }

	var run$1 = function (id) {
	  if (hasOwn$h(queue$3, id)) {
	    var fn = queue$3[id];
	    delete queue$3[id];
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
	  global$13.postMessage(String$6(id), location$1.protocol + '//' + location$1.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$3 || !clear$1) {
	  set$3 = function setImmediate(fn) {
	    var args = arraySlice$8(arguments, 1);
	    queue$3[++counter$1] = function () {
	      apply$7(isCallable$s(fn) ? fn : Function$2(fn), undefined, args);
	    };
	    defer$1(counter$1);
	    return counter$1;
	  };
	  clear$1 = function clearImmediate(id) {
	    delete queue$3[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$5) {
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
	  } else if (MessageChannel$1 && !IS_IOS$3) {
	    channel$1 = new MessageChannel$1();
	    port$1 = channel$1.port2;
	    channel$1.port1.onmessage = listener$1;
	    defer$1 = bind$d(port$1.postMessage, port$1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$13.addEventListener &&
	    isCallable$s(global$13.postMessage) &&
	    !global$13.importScripts &&
	    location$1 && location$1.protocol !== 'file:' &&
	    !fails$x(post$1)
	  ) {
	    defer$1 = post$1;
	    global$13.addEventListener('message', listener$1, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE$1 in createElement$2('script')) {
	    defer$1 = function (id) {
	      html$3.appendChild(createElement$2('script'))[ONREADYSTATECHANGE$1] = function () {
	        html$3.removeChild(this);
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
	  set: set$3,
	  clear: clear$1
	};

	var userAgent$5 = engineUserAgent$1;
	var global$12 = global$1y;

	var engineIsIosPebble$1 = /ipad|iphone|ipod/i.test(userAgent$5) && global$12.Pebble !== undefined;

	var userAgent$4 = engineUserAgent$1;

	var engineIsWebosWebkit$1 = /web0s(?!.*chrome)/i.test(userAgent$4);

	var global$11 = global$1y;
	var bind$c = functionBindContext$1;
	var getOwnPropertyDescriptor$8 = objectGetOwnPropertyDescriptor$1.f;
	var macrotask$1 = task$3.set;
	var IS_IOS$2 = engineIsIos$1;
	var IS_IOS_PEBBLE$1 = engineIsIosPebble$1;
	var IS_WEBOS_WEBKIT$1 = engineIsWebosWebkit$1;
	var IS_NODE$4 = engineIsNode$1;

	var MutationObserver$1 = global$11.MutationObserver || global$11.WebKitMutationObserver;
	var document$5 = global$11.document;
	var process$5 = global$11.process;
	var Promise$2 = global$11.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor$1 = getOwnPropertyDescriptor$8(global$11, 'queueMicrotask');
	var queueMicrotask$1 = queueMicrotaskDescriptor$1 && queueMicrotaskDescriptor$1.value;

	var flush$1, head$1, last$1, notify$3, toggle$1, node$1, promise$6, then$1;

	// modern engines have queueMicrotask method
	if (!queueMicrotask$1) {
	  flush$1 = function () {
	    var parent, fn;
	    if (IS_NODE$4 && (parent = process$5.domain)) parent.exit();
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
	  if (!IS_IOS$2 && !IS_NODE$4 && !IS_WEBOS_WEBKIT$1 && MutationObserver$1 && document$5) {
	    toggle$1 = true;
	    node$1 = document$5.createTextNode('');
	    new MutationObserver$1(flush$1).observe(node$1, { characterData: true });
	    notify$3 = function () {
	      node$1.data = toggle$1 = !toggle$1;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE$1 && Promise$2 && Promise$2.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise$6 = Promise$2.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise$6.constructor = Promise$2;
	    then$1 = bind$c(promise$6.then, promise$6);
	    notify$3 = function () {
	      then$1(flush$1);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$4) {
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
	    // strange IE + webpack dev server bug - use .bind(global)
	    macrotask$1 = bind$c(macrotask$1, global$11);
	    notify$3 = function () {
	      macrotask$1(flush$1);
	    };
	  }
	}

	var microtask$3 = queueMicrotask$1 || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last$1) last$1.next = task;
	  if (!head$1) {
	    head$1 = task;
	    notify$3();
	  } last$1 = task;
	};

	var newPromiseCapability$5 = {};

	var aCallable$b = aCallable$f;

	var PromiseCapability$1 = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$b(resolve);
	  this.reject = aCallable$b(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$5.f = function (C) {
	  return new PromiseCapability$1(C);
	};

	var anObject$k = anObject$u;
	var isObject$i = isObject$p;
	var newPromiseCapability$4 = newPromiseCapability$5;

	var promiseResolve$4 = function (C, x) {
	  anObject$k(C);
	  if (isObject$i(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$4.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var global$10 = global$1y;

	var hostReportErrors$3 = function (a, b) {
	  var console = global$10.console;
	  if (console && console.error) {
	    arguments.length == 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform$8 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var Queue$3 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$3.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    if (this.head) this.tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = entry.next;
	      if (this.tail === entry) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue$2 = Queue$3;

	var engineIsBrowser$1 = typeof window == 'object';

	var $$B = _export$1;
	var IS_PURE$1 = isPure;
	var global$$ = global$1y;
	var getBuiltIn$e = getBuiltIn$l;
	var call$q = functionCall$1;
	var NativePromise$1 = nativePromiseConstructor;
	var redefineAll$1 = redefineAll$2;
	var setToStringTag$8 = setToStringTag$b;
	var setSpecies$3 = setSpecies$4;
	var aCallable$a = aCallable$f;
	var isCallable$r = isCallable$H;
	var isObject$h = isObject$p;
	var anInstance$4 = anInstance$5;
	var inspectSource$5 = inspectSource$8;
	var iterate$5 = iterate$7;
	var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;
	var speciesConstructor$4 = speciesConstructor$5;
	var task$2 = task$3.set;
	var microtask$2 = microtask$3;
	var promiseResolve$3 = promiseResolve$4;
	var hostReportErrors$2 = hostReportErrors$3;
	var newPromiseCapabilityModule$7 = newPromiseCapability$5;
	var perform$7 = perform$8;
	var Queue$2 = queue$2;
	var InternalStateModule$8 = internalState$1;
	var isForced$5 = isForced_1$1;
	var wellKnownSymbol$v = wellKnownSymbol$I;
	var IS_BROWSER$1 = engineIsBrowser$1;
	var IS_NODE$3 = engineIsNode$1;
	var V8_VERSION$4 = engineV8Version$1;

	var SPECIES$8 = wellKnownSymbol$v('species');
	var PROMISE$1 = 'Promise';

	var getInternalState$6 = InternalStateModule$8.getterFor(PROMISE$1);
	var setInternalState$7 = InternalStateModule$8.set;
	var getInternalPromiseState$1 = InternalStateModule$8.getterFor(PROMISE$1);
	var NativePromisePrototype$2 = NativePromise$1 && NativePromise$1.prototype;
	var PromiseConstructor$1 = NativePromise$1;
	var PromisePrototype$1 = NativePromisePrototype$2;
	var TypeError$n = global$$.TypeError;
	var document$4 = global$$.document;
	var process$4 = global$$.process;
	var newPromiseCapability$3 = newPromiseCapabilityModule$7.f;
	var newGenericPromiseCapability$1 = newPromiseCapability$3;

	var DISPATCH_EVENT$1 = !!(document$4 && document$4.createEvent && global$$.dispatchEvent);
	var NATIVE_REJECTION_EVENT = isCallable$r(global$$.PromiseRejectionEvent);
	var UNHANDLED_REJECTION$1 = 'unhandledrejection';
	var REJECTION_HANDLED$1 = 'rejectionhandled';
	var PENDING$1 = 0;
	var FULFILLED$1 = 1;
	var REJECTED$1 = 2;
	var HANDLED$1 = 1;
	var UNHANDLED$1 = 2;
	var SUBCLASSING$1 = false;

	var Internal$1, OwnPromiseCapability$1, PromiseWrapper$1;

	var FORCED$3 = isForced$5(PROMISE$1, function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource$5(PromiseConstructor$1);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor$1);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$4 === 66) return true;
	  // We need Promise#finally in the pure version for preventing prototype pollution
	  if (!PromisePrototype$1['finally']) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (V8_VERSION$4 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = new PromiseConstructor$1(function (resolve) { resolve(1); });
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$8] = FakePromise;
	  SUBCLASSING$1 = promise.then(function () { /* empty */ }) instanceof FakePromise;
	  if (!SUBCLASSING$1) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER$1 && !NATIVE_REJECTION_EVENT;
	});

	var INCORRECT_ITERATION$1 = FORCED$3 || !checkCorrectnessOfIteration$3(function (iterable) {
	  PromiseConstructor$1.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable$1 = function (it) {
	  var then;
	  return isObject$h(it) && isCallable$r(then = it.then) ? then : false;
	};

	var callReaction$1 = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state == FULFILLED$1;
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
	        reject(TypeError$n('Promise-chain cycle'));
	      } else if (then = isThenable$1(result)) {
	        call$q(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify$2 = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask$2(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction$1(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled$1(state);
	  });
	};

	var dispatchEvent$1 = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT$1) {
	    event = document$4.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$$.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global$$['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION$1) hostReportErrors$2('Unhandled promise rejection', reason);
	};

	var onUnhandled$1 = function (state) {
	  call$q(task$2, global$$, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled$1(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform$7(function () {
	        if (IS_NODE$3) {
	          process$4.emit('unhandledRejection', value, promise);
	        } else dispatchEvent$1(UNHANDLED_REJECTION$1, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$3 || isUnhandled$1(state) ? UNHANDLED$1 : HANDLED$1;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled$1 = function (state) {
	  return state.rejection !== HANDLED$1 && !state.parent;
	};

	var onHandleUnhandled$1 = function (state) {
	  call$q(task$2, global$$, function () {
	    var promise = state.facade;
	    if (IS_NODE$3) {
	      process$4.emit('rejectionHandled', promise);
	    } else dispatchEvent$1(REJECTION_HANDLED$1, promise, state.value);
	  });
	};

	var bind$b = function (fn, state, unwrap) {
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
	    if (state.facade === value) throw TypeError$n("Promise can't be resolved itself");
	    var then = isThenable$1(value);
	    if (then) {
	      microtask$2(function () {
	        var wrapper = { done: false };
	        try {
	          call$q(then, value,
	            bind$b(internalResolve$1, wrapper, state),
	            bind$b(internalReject$1, wrapper, state)
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
	if (FORCED$3) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor$1 = function Promise(executor) {
	    anInstance$4(this, PromisePrototype$1);
	    aCallable$a(executor);
	    call$q(Internal$1, this);
	    var state = getInternalState$6(this);
	    try {
	      executor(bind$b(internalResolve$1, state), bind$b(internalReject$1, state));
	    } catch (error) {
	      internalReject$1(state, error);
	    }
	  };
	  PromisePrototype$1 = PromiseConstructor$1.prototype;
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal$1 = function Promise(executor) {
	    setInternalState$7(this, {
	      type: PROMISE$1,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue$2(),
	      rejection: false,
	      state: PENDING$1,
	      value: undefined
	    });
	  };
	  Internal$1.prototype = redefineAll$1(PromisePrototype$1, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    // eslint-disable-next-line unicorn/no-thenable -- safe
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState$1(this);
	      var reaction = newPromiseCapability$3(speciesConstructor$4(this, PromiseConstructor$1));
	      state.parent = true;
	      reaction.ok = isCallable$r(onFulfilled) ? onFulfilled : true;
	      reaction.fail = isCallable$r(onRejected) && onRejected;
	      reaction.domain = IS_NODE$3 ? process$4.domain : undefined;
	      if (state.state == PENDING$1) state.reactions.add(reaction);
	      else microtask$2(function () {
	        callReaction$1(reaction, state);
	      });
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
	    var state = getInternalState$6(promise);
	    this.promise = promise;
	    this.resolve = bind$b(internalResolve$1, state);
	    this.reject = bind$b(internalReject$1, state);
	  };
	  newPromiseCapabilityModule$7.f = newPromiseCapability$3 = function (C) {
	    return C === PromiseConstructor$1 || C === PromiseWrapper$1
	      ? new OwnPromiseCapability$1(C)
	      : newGenericPromiseCapability$1(C);
	  };
	}

	$$B({ global: true, wrap: true, forced: FORCED$3 }, {
	  Promise: PromiseConstructor$1
	});

	setToStringTag$8(PromiseConstructor$1, PROMISE$1, false, true);
	setSpecies$3(PROMISE$1);

	PromiseWrapper$1 = getBuiltIn$e(PROMISE$1);

	// statics
	$$B({ target: PROMISE$1, stat: true, forced: FORCED$3 }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$3(this);
	    call$q(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	$$B({ target: PROMISE$1, stat: true, forced: IS_PURE$1  }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve$3(this === PromiseWrapper$1 ? PromiseConstructor$1 : this, x);
	  }
	});

	$$B({ target: PROMISE$1, stat: true, forced: INCORRECT_ITERATION$1 }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$3(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$7(function () {
	      var $promiseResolve = aCallable$a(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$5(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$q($promiseResolve, C, promise).then(function (value) {
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
	    var capability = newPromiseCapability$3(C);
	    var reject = capability.reject;
	    var result = perform$7(function () {
	      var $promiseResolve = aCallable$a(C.resolve);
	      iterate$5(iterable, function (promise) {
	        call$q($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$A = _export$1;
	var call$p = functionCall$1;
	var aCallable$9 = aCallable$f;
	var newPromiseCapabilityModule$6 = newPromiseCapability$5;
	var perform$6 = perform$8;
	var iterate$4 = iterate$7;

	// `Promise.allSettled` method
	// https://tc39.es/ecma262/#sec-promise.allsettled
	$$A({ target: 'Promise', stat: true }, {
	  allSettled: function allSettled(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$6.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$6(function () {
	      var promiseResolve = aCallable$9(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$4(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$p(promiseResolve, C, promise).then(function (value) {
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

	var $$z = _export$1;
	var aCallable$8 = aCallable$f;
	var getBuiltIn$d = getBuiltIn$l;
	var call$o = functionCall$1;
	var newPromiseCapabilityModule$5 = newPromiseCapability$5;
	var perform$5 = perform$8;
	var iterate$3 = iterate$7;

	var PROMISE_ANY_ERROR = 'No one promise resolved';

	// `Promise.any` method
	// https://tc39.es/ecma262/#sec-promise.any
	$$z({ target: 'Promise', stat: true }, {
	  any: function any(iterable) {
	    var C = this;
	    var AggregateError = getBuiltIn$d('AggregateError');
	    var capability = newPromiseCapabilityModule$5.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$5(function () {
	      var promiseResolve = aCallable$8(C.resolve);
	      var errors = [];
	      var counter = 0;
	      var remaining = 1;
	      var alreadyResolved = false;
	      iterate$3(iterable, function (promise) {
	        var index = counter++;
	        var alreadyRejected = false;
	        remaining++;
	        call$o(promiseResolve, C, promise).then(function (value) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyResolved = true;
	          resolve(value);
	        }, function (error) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyRejected = true;
	          errors[index] = error;
	          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
	        });
	      });
	      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$y = _export$1;
	var NativePromise = nativePromiseConstructor;
	var fails$w = fails$I;
	var getBuiltIn$c = getBuiltIn$l;
	var isCallable$q = isCallable$H;
	var speciesConstructor$3 = speciesConstructor$5;
	var promiseResolve$2 = promiseResolve$4;

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!NativePromise && fails$w(function () {
	  // eslint-disable-next-line unicorn/no-thenable -- required for testing
	  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	$$y({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor$3(this, getBuiltIn$c('Promise'));
	    var isFunction = isCallable$q(onFinally);
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve$2(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve$2(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	var uncurryThis$B = functionUncurryThis$1;
	var toIntegerOrInfinity$6 = toIntegerOrInfinity$9;
	var toString$f = toString$i;
	var requireObjectCoercible$a = requireObjectCoercible$d;

	var charAt$a = uncurryThis$B(''.charAt);
	var charCodeAt$4 = uncurryThis$B(''.charCodeAt);
	var stringSlice$9 = uncurryThis$B(''.slice);

	var createMethod$7 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$f(requireObjectCoercible$a($this));
	    var position = toIntegerOrInfinity$6(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$4(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$4(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$a(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$9(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte$1 = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$7(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$7(true)
	};

	var charAt$9 = stringMultibyte$1.charAt;
	var toString$e = toString$i;
	var InternalStateModule$7 = internalState$1;
	var defineIterator$3 = defineIterator$5;

	var STRING_ITERATOR$1 = 'String Iterator';
	var setInternalState$6 = InternalStateModule$7.set;
	var getInternalState$5 = InternalStateModule$7.getterFor(STRING_ITERATOR$1);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator$3(String, 'String', function (iterated) {
	  setInternalState$6(this, {
	    type: STRING_ITERATOR$1,
	    string: toString$e(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$5(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt$9(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var path$g = path$j;

	var promise$5 = path$g.Promise;

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

	var DOMIterables$2 = domIterables$1;
	var global$_ = global$1y;
	var classof$e = classof$k;
	var createNonEnumerableProperty$9 = createNonEnumerableProperty$g;
	var Iterators$5 = iterators$1;
	var wellKnownSymbol$u = wellKnownSymbol$I;

	var TO_STRING_TAG$4 = wellKnownSymbol$u('toStringTag');

	for (var COLLECTION_NAME$2 in DOMIterables$2) {
	  var Collection = global$_[COLLECTION_NAME$2];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof$e(CollectionPrototype) !== TO_STRING_TAG$4) {
	    createNonEnumerableProperty$9(CollectionPrototype, TO_STRING_TAG$4, COLLECTION_NAME$2);
	  }
	  Iterators$5[COLLECTION_NAME$2] = Iterators$5.Array;
	}

	var parent$G = promise$5;


	var promise$4 = parent$G;

	var parent$F = promise$4;

	var promise$3 = parent$F;

	var $$x = _export$1;
	var newPromiseCapabilityModule$4 = newPromiseCapability$5;
	var perform$4 = perform$8;

	// `Promise.try` method
	// https://github.com/tc39/proposal-promise-try
	$$x({ target: 'Promise', stat: true }, {
	  'try': function (callbackfn) {
	    var promiseCapability = newPromiseCapabilityModule$4.f(this);
	    var result = perform$4(callbackfn);
	    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
	    return promiseCapability.promise;
	  }
	});

	var parent$E = promise$3;

	// TODO: Remove from `core-js@4`




	var promise$2 = parent$E;

	(function (module) {
		module.exports = promise$2;
	} (promise$7));

	var _Promise$1 = /*@__PURE__*/getDefaultExportFromCjs(promise$7.exports);

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
	    _Promise$1.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new _Promise$1(function (resolve, reject) {
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

	var defineProperty$f = {exports: {}};

	var defineProperty$e = {exports: {}};

	var $$w = _export$1;
	var DESCRIPTORS$j = descriptors$1;
	var defineProperty$d = objectDefineProperty$1.f;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	$$w({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$d, sham: !DESCRIPTORS$j }, {
	  defineProperty: defineProperty$d
	});

	var path$f = path$j;

	var Object$8 = path$f.Object;

	var defineProperty$c = defineProperty$e.exports = function defineProperty(it, key, desc) {
	  return Object$8.defineProperty(it, key, desc);
	};

	if (Object$8.defineProperty.sham) defineProperty$c.sham = true;

	var parent$D = defineProperty$e.exports;

	var defineProperty$b = parent$D;

	var parent$C = defineProperty$b;

	var defineProperty$a = parent$C;

	var parent$B = defineProperty$a;

	var defineProperty$9 = parent$B;

	(function (module) {
		module.exports = defineProperty$9;
	} (defineProperty$f));

	var _Object$defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty$f.exports);

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

	var regenerator = {exports: {}};

	var runtime = {exports: {}};

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function (module) {
		var runtime = (function (exports) {

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
		  module.exports 
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
	} (runtime));

	(function (module) {
		module.exports = runtime.exports;
	} (regenerator));

	var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regenerator.exports);

	var filter$3 = {exports: {}};

	var classof$d = classofRaw$3;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$d = Array.isArray || function isArray(argument) {
	  return classof$d(argument) == 'Array';
	};

	var global$Z = global$1y;
	var isArray$c = isArray$d;
	var isConstructor$5 = isConstructor$7;
	var isObject$g = isObject$p;
	var wellKnownSymbol$t = wellKnownSymbol$I;

	var SPECIES$7 = wellKnownSymbol$t('species');
	var Array$7 = global$Z.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$3 = function (originalArray) {
	  var C;
	  if (isArray$c(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$5(C) && (C === Array$7 || isArray$c(C.prototype))) C = undefined;
	    else if (isObject$g(C)) {
	      C = C[SPECIES$7];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$7 : C;
	};

	var arraySpeciesConstructor$2 = arraySpeciesConstructor$3;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$5 = function (originalArray, length) {
	  return new (arraySpeciesConstructor$2(originalArray))(length === 0 ? 0 : length);
	};

	var bind$a = functionBindContext$1;
	var uncurryThis$A = functionUncurryThis$1;
	var IndexedObject$4 = indexedObject$1;
	var toObject$b = toObject$e;
	var lengthOfArrayLike$a = lengthOfArrayLike$d;
	var arraySpeciesCreate$4 = arraySpeciesCreate$5;

	var push$9 = uncurryThis$A([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$6 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$b($this);
	    var self = IndexedObject$4(O);
	    var boundFunction = bind$a(callbackfn, that);
	    var length = lengthOfArrayLike$a(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$4;
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
	          case 2: push$9(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$9(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration$1 = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$6(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$6(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$6(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$6(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$6(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$6(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$6(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$6(7)
	};

	var fails$v = fails$I;
	var wellKnownSymbol$s = wellKnownSymbol$I;
	var V8_VERSION$3 = engineV8Version$1;

	var SPECIES$6 = wellKnownSymbol$s('species');

	var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$3 >= 51 || !fails$v(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$6] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$v = _export$1;
	var $filter = arrayIteration$1.filter;
	var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$v({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var path$e = path$j;

	var entryVirtual$a = function (CONSTRUCTOR) {
	  return path$e[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual$9 = entryVirtual$a;

	var filter$2 = entryVirtual$9('Array').filter;

	var isPrototypeOf$f = objectIsPrototypeOf$1;
	var method$8 = filter$2;

	var ArrayPrototype$9 = Array.prototype;

	var filter$1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$9 || (isPrototypeOf$f(ArrayPrototype$9, it) && own === ArrayPrototype$9.filter) ? method$8 : own;
	};

	var parent$A = filter$1;

	var filter = parent$A;

	(function (module) {
		module.exports = filter;
	} (filter$3));

	var _filterInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(filter$3.exports);

	var concat$6 = {exports: {}};

	var toPropertyKey$5 = toPropertyKey$8;
	var definePropertyModule$7 = objectDefineProperty$1;
	var createPropertyDescriptor$7 = createPropertyDescriptor$d;

	var createProperty$8 = function (object, key, value) {
	  var propertyKey = toPropertyKey$5(key);
	  if (propertyKey in object) definePropertyModule$7.f(object, propertyKey, createPropertyDescriptor$7(0, value));
	  else object[propertyKey] = value;
	};

	var $$u = _export$1;
	var global$Y = global$1y;
	var fails$u = fails$I;
	var isArray$b = isArray$d;
	var isObject$f = isObject$p;
	var toObject$a = toObject$e;
	var lengthOfArrayLike$9 = lengthOfArrayLike$d;
	var createProperty$7 = createProperty$8;
	var arraySpeciesCreate$3 = arraySpeciesCreate$5;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
	var wellKnownSymbol$r = wellKnownSymbol$I;
	var V8_VERSION$2 = engineV8Version$1;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$r('isConcatSpreadable');
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$m = global$Y.TypeError;

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$2 >= 51 || !fails$u(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$3('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$f(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$b(O);
	};

	var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$u({ target: 'Array', proto: true, forced: FORCED$2 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$a(this);
	    var A = arraySpeciesCreate$3(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$9(E);
	        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError$m(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$7(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER$1) throw TypeError$m(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty$7(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var entryVirtual$8 = entryVirtual$a;

	var concat$5 = entryVirtual$8('Array').concat;

	var isPrototypeOf$e = objectIsPrototypeOf$1;
	var method$7 = concat$5;

	var ArrayPrototype$8 = Array.prototype;

	var concat$4 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$8 || (isPrototypeOf$e(ArrayPrototype$8, it) && own === ArrayPrototype$8.concat) ? method$7 : own;
	};

	var parent$z = concat$4;

	var concat$3 = parent$z;

	(function (module) {
		module.exports = concat$3;
	} (concat$6));

	var _concatInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(concat$6.exports);

	var assign$4 = {exports: {}};

	var DESCRIPTORS$i = descriptors$1;
	var uncurryThis$z = functionUncurryThis$1;
	var call$n = functionCall$1;
	var fails$t = fails$I;
	var objectKeys$4 = objectKeys$6;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols$1;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable$1;
	var toObject$9 = toObject$e;
	var IndexedObject$3 = indexedObject$1;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$8 = Object.defineProperty;
	var concat$2 = uncurryThis$z([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$t(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$i && $assign({ b: 1 }, $assign(defineProperty$8({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$8(this, 'b', {
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
	  return $assign({}, A)[symbol] != 7 || objectKeys$4($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$9(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule$2.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$3(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$2(objectKeys$4(S), getOwnPropertySymbols(S)) : objectKeys$4(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$i || call$n(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$t = _export$1;
	var assign$3 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$t({ target: 'Object', stat: true, forced: Object.assign !== assign$3 }, {
	  assign: assign$3
	});

	var path$d = path$j;

	var assign$2 = path$d.Object.assign;

	var parent$y = assign$2;

	var assign$1 = parent$y;

	(function (module) {
		module.exports = assign$1;
	} (assign$4));

	var _Object$assign = /*@__PURE__*/getDefaultExportFromCjs(assign$4.exports);

	var slice$6 = {exports: {}};

	var $$s = _export$1;
	var global$X = global$1y;
	var isArray$a = isArray$d;
	var isConstructor$4 = isConstructor$7;
	var isObject$e = isObject$p;
	var toAbsoluteIndex$5 = toAbsoluteIndex$7;
	var lengthOfArrayLike$8 = lengthOfArrayLike$d;
	var toIndexedObject$c = toIndexedObject$i;
	var createProperty$6 = createProperty$8;
	var wellKnownSymbol$q = wellKnownSymbol$I;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
	var un$Slice = arraySlice$9;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('slice');

	var SPECIES$5 = wellKnownSymbol$q('species');
	var Array$6 = global$X.Array;
	var max$5 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$s({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$c(this);
	    var length = lengthOfArrayLike$8(O);
	    var k = toAbsoluteIndex$5(start, length);
	    var fin = toAbsoluteIndex$5(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$a(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$4(Constructor) && (Constructor === Array$6 || isArray$a(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$e(Constructor)) {
	        Constructor = Constructor[SPECIES$5];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array$6 || Constructor === undefined) {
	        return un$Slice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array$6 : Constructor)(max$5(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$6(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var entryVirtual$7 = entryVirtual$a;

	var slice$5 = entryVirtual$7('Array').slice;

	var isPrototypeOf$d = objectIsPrototypeOf$1;
	var method$6 = slice$5;

	var ArrayPrototype$7 = Array.prototype;

	var slice$4 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$7 || (isPrototypeOf$d(ArrayPrototype$7, it) && own === ArrayPrototype$7.slice) ? method$6 : own;
	};

	var parent$x = slice$4;

	var slice$3 = parent$x;

	(function (module) {
		module.exports = slice$3;
	} (slice$6));

	var _sliceInstanceProperty$1 = /*@__PURE__*/getDefaultExportFromCjs(slice$6.exports);

	var stringify$2 = {exports: {}};

	var $$r = _export$1;
	var global$W = global$1y;
	var getBuiltIn$b = getBuiltIn$l;
	var apply$6 = functionApply$1;
	var uncurryThis$y = functionUncurryThis$1;
	var fails$s = fails$I;

	var Array$5 = global$W.Array;
	var $stringify$1 = getBuiltIn$b('JSON', 'stringify');
	var exec$6 = uncurryThis$y(/./.exec);
	var charAt$8 = uncurryThis$y(''.charAt);
	var charCodeAt$3 = uncurryThis$y(''.charCodeAt);
	var replace$8 = uncurryThis$y(''.replace);
	var numberToString$1 = uncurryThis$y(1.0.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var fix = function (match, offset, string) {
	  var prev = charAt$8(string, offset - 1);
	  var next = charAt$8(string, offset + 1);
	  if ((exec$6(low, match) && !exec$6(hi, next)) || (exec$6(hi, match) && !exec$6(low, prev))) {
	    return '\\u' + numberToString$1(charCodeAt$3(match, 0), 16);
	  } return match;
	};

	var FORCED$1 = fails$s(function () {
	  return $stringify$1('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify$1('\uDEAD') !== '"\\udead"';
	});

	if ($stringify$1) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  // https://github.com/tc39/proposal-well-formed-stringify
	  $$r({ target: 'JSON', stat: true, forced: FORCED$1 }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      for (var i = 0, l = arguments.length, args = Array$5(l); i < l; i++) args[i] = arguments[i];
	      var result = apply$6($stringify$1, null, args);
	      return typeof result == 'string' ? replace$8(result, tester, fix) : result;
	    }
	  });
	}

	var path$c = path$j;
	var apply$5 = functionApply$1;

	// eslint-disable-next-line es/no-json -- safe
	if (!path$c.JSON) path$c.JSON = { stringify: JSON.stringify };

	// eslint-disable-next-line no-unused-vars -- required for `.length`
	var stringify$1 = function stringify(it, replacer, space) {
	  return apply$5(path$c.JSON.stringify, null, arguments);
	};

	var parent$w = stringify$1;

	var stringify = parent$w;

	(function (module) {
		module.exports = stringify;
	} (stringify$2));

	var _JSON$stringify = /*@__PURE__*/getDefaultExportFromCjs(stringify$2.exports);

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$V =
	  // eslint-disable-next-line es-x/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$r = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$q = fails$r;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$q(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$p = fails$r;

	var functionBindNative = !fails$p(function () {
	  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$m = Function.prototype.call;

	var functionCall = NATIVE_BIND$3 ? call$m.bind(call$m) : function () {
	  return call$m.apply(call$m, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$7 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$7 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$7(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$2;

	var createPropertyDescriptor$6 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var bind$9 = FunctionPrototype$3.bind;
	var call$l = FunctionPrototype$3.call;
	var uncurryThis$x = NATIVE_BIND$2 && bind$9.bind(call$l, call$l);

	var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
	  return fn && uncurryThis$x(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$l.apply(fn, arguments);
	  };
	};

	var uncurryThis$w = functionUncurryThis;

	var toString$d = uncurryThis$w({}.toString);
	var stringSlice$8 = uncurryThis$w(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$8(toString$d(it), 8, -1);
	};

	var global$U = global$V;
	var uncurryThis$v = functionUncurryThis;
	var fails$o = fails$r;
	var classof$c = classofRaw$1;

	var Object$7 = global$U.Object;
	var split$3 = uncurryThis$v(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$o(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$7('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$c(it) == 'String' ? split$3(it, '') : Object$7(it);
	} : Object$7;

	var global$T = global$V;

	var TypeError$l = global$T.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$9 = function (it) {
	  if (it == undefined) throw TypeError$l("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$8 = requireObjectCoercible$9;

	var toIndexedObject$b = function (it) {
	  return IndexedObject$2(requireObjectCoercible$8(it));
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$p = function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$o = isCallable$p;

	var isObject$d = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$o(it);
	};

	var global$S = global$V;
	var isCallable$n = isCallable$p;

	var aFunction = function (argument) {
	  return isCallable$n(argument) ? argument : undefined;
	};

	var getBuiltIn$a = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$S[namespace]) : global$S[namespace] && global$S[namespace][method];
	};

	var uncurryThis$u = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$u({}.isPrototypeOf);

	var getBuiltIn$9 = getBuiltIn$a;

	var engineUserAgent = getBuiltIn$9('navigator', 'userAgent') || '';

	var global$R = global$V;
	var userAgent$3 = engineUserAgent;

	var process$3 = global$R.process;
	var Deno$1 = global$R.Deno;
	var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
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
	if (!version && userAgent$3) {
	  match = userAgent$3.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$3.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es-x/no-symbol -- required for testing */

	var V8_VERSION$1 = engineV8Version;
	var fails$n = fails$r;

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$n(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
	});

	/* eslint-disable es-x/no-symbol -- required for testing */

	var NATIVE_SYMBOL$2 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$Q = global$V;
	var getBuiltIn$8 = getBuiltIn$a;
	var isCallable$m = isCallable$p;
	var isPrototypeOf$c = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Object$6 = global$Q.Object;

	var isSymbol$4 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$8('Symbol');
	  return isCallable$m($Symbol) && isPrototypeOf$c($Symbol.prototype, Object$6(it));
	};

	var global$P = global$V;

	var String$5 = global$P.String;

	var tryToString$4 = function (argument) {
	  try {
	    return String$5(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$O = global$V;
	var isCallable$l = isCallable$p;
	var tryToString$3 = tryToString$4;

	var TypeError$k = global$O.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$7 = function (argument) {
	  if (isCallable$l(argument)) return argument;
	  throw TypeError$k(tryToString$3(argument) + ' is not a function');
	};

	var aCallable$6 = aCallable$7;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$6 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$6(func);
	};

	var global$N = global$V;
	var call$k = functionCall;
	var isCallable$k = isCallable$p;
	var isObject$c = isObject$d;

	var TypeError$j = global$N.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$k(fn = input.toString) && !isObject$c(val = call$k(fn, input))) return val;
	  if (isCallable$k(fn = input.valueOf) && !isObject$c(val = call$k(fn, input))) return val;
	  if (pref !== 'string' && isCallable$k(fn = input.toString) && !isObject$c(val = call$k(fn, input))) return val;
	  throw TypeError$j("Can't convert object to primitive value");
	};

	var shared$5 = {exports: {}};

	var global$M = global$V;

	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var defineProperty$7 = Object.defineProperty;

	var setGlobal$3 = function (key, value) {
	  try {
	    defineProperty$7(global$M, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$M[key] = value;
	  } return value;
	};

	var global$L = global$V;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$L[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$5.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.22.4',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.22.4/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var global$K = global$V;
	var requireObjectCoercible$7 = requireObjectCoercible$9;

	var Object$5 = global$K.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$8 = function (argument) {
	  return Object$5(requireObjectCoercible$7(argument));
	};

	var uncurryThis$t = functionUncurryThis;
	var toObject$7 = toObject$8;

	var hasOwnProperty = uncurryThis$t({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es-x/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$7(it), key);
	};

	var uncurryThis$s = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$c = uncurryThis$s(1.0.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$c(++id + postfix, 36);
	};

	var global$J = global$V;
	var shared$4 = shared$5.exports;
	var hasOwn$g = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$4('wks');
	var Symbol$1 = global$J.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

	var wellKnownSymbol$p = function (name) {
	  if (!hasOwn$g(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$1 && hasOwn$g(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore$1[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var global$I = global$V;
	var call$j = functionCall;
	var isObject$b = isObject$d;
	var isSymbol$3 = isSymbol$4;
	var getMethod$5 = getMethod$6;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$o = wellKnownSymbol$p;

	var TypeError$i = global$I.TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol$o('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$2 = function (input, pref) {
	  if (!isObject$b(input) || isSymbol$3(input)) return input;
	  var exoticToPrim = getMethod$5(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$j(exoticToPrim, input, pref);
	    if (!isObject$b(result) || isSymbol$3(result)) return result;
	    throw TypeError$i("Can't convert object to primitive value");
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

	var global$H = global$V;
	var isObject$a = isObject$d;

	var document$3 = global$H.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$a(document$3) && isObject$a(document$3.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$h = descriptors;
	var fails$m = fails$r;
	var createElement$1 = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$h && !fails$m(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$g = descriptors;
	var call$i = functionCall;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$5 = createPropertyDescriptor$6;
	var toIndexedObject$a = toIndexedObject$b;
	var toPropertyKey$3 = toPropertyKey$4;
	var hasOwn$f = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$g ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$a(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$f(O, P)) return createPropertyDescriptor$5(!call$i(propertyIsEnumerableModule$1.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$f = descriptors;
	var fails$l = fails$r;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$f && fails$l(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$G = global$V;
	var isObject$9 = isObject$d;

	var String$4 = global$G.String;
	var TypeError$h = global$G.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$j = function (argument) {
	  if (isObject$9(argument)) return argument;
	  throw TypeError$h(String$4(argument) + ' is not an object');
	};

	var global$F = global$V;
	var DESCRIPTORS$e = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$i = anObject$j;
	var toPropertyKey$2 = toPropertyKey$4;

	var TypeError$g = global$F.TypeError;
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$e ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$i(O);
	  P = toPropertyKey$2(P);
	  anObject$i(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$i(O);
	  P = toPropertyKey$2(P);
	  anObject$i(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$g('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$d = descriptors;
	var definePropertyModule$6 = objectDefineProperty;
	var createPropertyDescriptor$4 = createPropertyDescriptor$6;

	var createNonEnumerableProperty$8 = DESCRIPTORS$d ? function (object, key, value) {
	  return definePropertyModule$6.f(object, key, createPropertyDescriptor$4(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$2 = {exports: {}};

	var DESCRIPTORS$c = descriptors;
	var hasOwn$e = hasOwnProperty_1;

	var FunctionPrototype$2 = Function.prototype;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$c && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$e(FunctionPrototype$2, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$c || (DESCRIPTORS$c && getDescriptor(FunctionPrototype$2, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$r = functionUncurryThis;
	var isCallable$j = isCallable$p;
	var store$1 = sharedStore;

	var functionToString$1 = uncurryThis$r(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$j(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString$1(it);
	  };
	}

	var inspectSource$4 = store$1.inspectSource;

	var global$E = global$V;
	var isCallable$i = isCallable$p;
	var inspectSource$3 = inspectSource$4;

	var WeakMap$1 = global$E.WeakMap;

	var nativeWeakMap = isCallable$i(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

	var shared$3 = shared$5.exports;
	var uid$1 = uid$3;

	var keys$5 = shared$3('keys');

	var sharedKey$4 = function (key) {
	  return keys$5[key] || (keys$5[key] = uid$1(key));
	};

	var hiddenKeys$5 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$D = global$V;
	var uncurryThis$q = functionUncurryThis;
	var isObject$8 = isObject$d;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$8;
	var hasOwn$d = hasOwnProperty_1;
	var shared$2 = sharedStore;
	var sharedKey$3 = sharedKey$4;
	var hiddenKeys$4 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$f = global$D.TypeError;
	var WeakMap = global$D.WeakMap;
	var set$2, get$1, has;

	var enforce = function (it) {
	  return has(it) ? get$1(it) : set$2(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$8(it) || (state = get$1(it)).type !== TYPE) {
	      throw TypeError$f('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$2.state) {
	  var store = shared$2.state || (shared$2.state = new WeakMap());
	  var wmget = uncurryThis$q(store.get);
	  var wmhas = uncurryThis$q(store.has);
	  var wmset = uncurryThis$q(store.set);
	  set$2 = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$f(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$3('state');
	  hiddenKeys$4[STATE] = true;
	  set$2 = function (it, metadata) {
	    if (hasOwn$d(it, STATE)) throw new TypeError$f(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$7(it, STATE, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return hasOwn$d(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$d(it, STATE);
	  };
	}

	var internalState = {
	  set: set$2,
	  get: get$1,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var fails$k = fails$r;
	var isCallable$h = isCallable$p;
	var hasOwn$c = hasOwnProperty_1;
	var defineProperty$6 = objectDefineProperty.f;
	var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
	var inspectSource$2 = inspectSource$4;
	var InternalStateModule$6 = internalState;

	var enforceInternalState$1 = InternalStateModule$6.enforce;
	var getInternalState$4 = InternalStateModule$6.get;

	var CONFIGURABLE_LENGTH = !fails$k(function () {
	  return defineProperty$6(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (String(name).slice(0, 7) === 'Symbol(') {
	    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$c(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
	    defineProperty$6(value, 'name', { value: name, configurable: true });
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$c(options, 'arity') && value.length !== options.arity) {
	    defineProperty$6(value, 'length', { value: options.arity });
	  }
	  var state = enforceInternalState$1(value);
	  if (!hasOwn$c(state, 'source')) {
	    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$h(this) && getInternalState$4(this).source || inspectSource$2(this);
	}, 'toString');

	var global$C = global$V;
	var isCallable$g = isCallable$p;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$8;
	var makeBuiltIn = makeBuiltIn$2.exports;
	var setGlobal$1 = setGlobal$3;

	var defineBuiltIn$a = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var name = options && options.name !== undefined ? options.name : key;
	  if (isCallable$g(value)) makeBuiltIn(value, name, options);
	  if (O === global$C) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return O;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$6(O, key, value);
	  return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$4 = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$5 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor$4 : ceil)(number);
	};

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;

	var max$4 = Math.max;
	var min$4 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$4 = function (index, length) {
	  var integer = toIntegerOrInfinity$4(index);
	  return integer < 0 ? max$4(integer + length, 0) : min$4(integer, length);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;

	var min$3 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$4 = function (argument) {
	  return argument > 0 ? min$3(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$3 = toLength$4;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$7 = function (obj) {
	  return toLength$3(obj.length);
	};

	var toIndexedObject$9 = toIndexedObject$b;
	var toAbsoluteIndex$3 = toAbsoluteIndex$4;
	var lengthOfArrayLike$6 = lengthOfArrayLike$7;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$5 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$9($this);
	    var length = lengthOfArrayLike$6(O);
	    var index = toAbsoluteIndex$3(fromIndex, length);
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

	var uncurryThis$p = functionUncurryThis;
	var hasOwn$b = hasOwnProperty_1;
	var toIndexedObject$8 = toIndexedObject$b;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$5;

	var push$8 = uncurryThis$p([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$8(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$b(hiddenKeys$3, key) && hasOwn$b(O, key) && push$8(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$b(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$8(result, key);
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

	var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$7 = getBuiltIn$a;
	var uncurryThis$o = functionUncurryThis;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$h = anObject$j;

	var concat$1 = uncurryThis$o([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$6 = getBuiltIn$7('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$1.f(anObject$h(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$a = hasOwnProperty_1;
	var ownKeys$5 = ownKeys$6;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$5 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys$5(source);
	  var defineProperty = definePropertyModule$5.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$a(target, key) && !(exceptions && hasOwn$a(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$j = fails$r;
	var isCallable$f = isCallable$p;

	var replacement = /#|\.prototype\./;

	var isForced$4 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$f(detection) ? fails$j(detection)
	    : !!detection;
	};

	var normalize = isForced$4.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$4.data = {};
	var NATIVE = isForced$4.NATIVE = 'N';
	var POLYFILL = isForced$4.POLYFILL = 'P';

	var isForced_1 = isForced$4;

	var global$B = global$V;
	var getOwnPropertyDescriptor$6 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$8;
	var defineBuiltIn$9 = defineBuiltIn$a;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced$3 = isForced_1;

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
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$B;
	  } else if (STATIC) {
	    target = global$B[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$B[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$6(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$5(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$9(target, key, sourceProperty, options);
	  }
	};

	var wellKnownSymbol$n = wellKnownSymbol$p;

	var TO_STRING_TAG$3 = wellKnownSymbol$n('toStringTag');
	var test = {};

	test[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var global$A = global$V;
	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$e = isCallable$p;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$m = wellKnownSymbol$p;

	var TO_STRING_TAG$2 = wellKnownSymbol$m('toStringTag');
	var Object$4 = global$A.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$b = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$4(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$e(O.callee) ? 'Arguments' : result;
	};

	var global$z = global$V;
	var classof$a = classof$b;

	var String$3 = global$z.String;

	var toString$b = function (argument) {
	  if (classof$a(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$3(argument);
	};

	var anObject$g = anObject$j;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$g(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$i = fails$r;
	var global$y = global$V;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$y.RegExp;

	var UNSUPPORTED_Y$3 = fails$i(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$1 = UNSUPPORTED_Y$3 || fails$i(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$i(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$1,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$3
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es-x/no-object-keys -- safe
	var objectKeys$3 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$b = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$4 = objectDefineProperty;
	var anObject$f = anObject$j;
	var toIndexedObject$7 = toIndexedObject$b;
	var objectKeys$2 = objectKeys$3;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es-x/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$b && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$f(O);
	  var props = toIndexedObject$7(Properties);
	  var keys = objectKeys$2(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$4.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$6 = getBuiltIn$a;

	var html$2 = getBuiltIn$6('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$e = anObject$j;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$1 = hiddenKeys$5;
	var html$1 = html$2;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$2 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$2('IE_PROTO');

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
	  html$1.appendChild(iframe);
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
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es-x/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$e(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var fails$h = fails$r;
	var global$x = global$V;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$x.RegExp;

	var regexpUnsupportedDotAll = fails$h(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$g = fails$r;
	var global$w = global$V;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$w.RegExp;

	var regexpUnsupportedNcg = fails$g(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$h = functionCall;
	var uncurryThis$n = functionUncurryThis;
	var toString$a = toString$b;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$2 = regexpStickyHelpers;
	var shared$1 = shared$5.exports;
	var create$9 = objectCreate;
	var getInternalState$3 = internalState.get;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared$1('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$7 = uncurryThis$n(''.charAt);
	var indexOf = uncurryThis$n(''.indexOf);
	var replace$7 = uncurryThis$n(''.replace);
	var stringSlice$7 = uncurryThis$n(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$h(nativeExec, re1, 'a');
	  call$h(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$3(re);
	    var str = toString$a(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$h(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = call$h(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$7(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$7(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$7(str, re.lastIndex - 1) !== '\n')) {
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

	    match = call$h(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$7(match.input, charsAdded);
	        match[0] = stringSlice$7(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      call$h(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create$9(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$3 = patchedExec;

	var $$q = _export;
	var exec$5 = regexpExec$3;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$q({ target: 'RegExp', proto: true, forced: /./.exec !== exec$5 }, {
	  exec: exec$5
	});

	var NATIVE_BIND$1 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var apply$4 = FunctionPrototype$1.apply;
	var call$g = FunctionPrototype$1.call;

	// eslint-disable-next-line es-x/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$g.bind(apply$4) : function () {
	  return call$g.apply(apply$4, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$m = functionUncurryThis;
	var defineBuiltIn$8 = defineBuiltIn$a;
	var regexpExec$2 = regexpExec$3;
	var fails$f = fails$r;
	var wellKnownSymbol$l = wellKnownSymbol$p;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$8;

	var SPECIES$4 = wellKnownSymbol$l('species');
	var RegExpPrototype$3 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$l(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$f(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$f(function () {
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
	      re.constructor[SPECIES$4] = function () { return re; };
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
	    var uncurriedNativeRegExpMethod = uncurryThis$m(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$m(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$2 || $exec === RegExpPrototype$3.exec) {
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

	    defineBuiltIn$8(String.prototype, KEY, methods[0]);
	    defineBuiltIn$8(RegExpPrototype$3, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$4(RegExpPrototype$3[SYMBOL], 'sham', true);
	};

	var uncurryThis$l = functionUncurryThis;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
	var toString$9 = toString$b;
	var requireObjectCoercible$6 = requireObjectCoercible$9;

	var charAt$6 = uncurryThis$l(''.charAt);
	var charCodeAt$2 = uncurryThis$l(''.charCodeAt);
	var stringSlice$6 = uncurryThis$l(''.slice);

	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$9(requireObjectCoercible$6($this));
	    var position = toIntegerOrInfinity$2(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$2(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$2(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$6(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$6(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
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

	var charAt$5 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$3 = function (S, index, unicode) {
	  return index + (unicode ? charAt$5(S, index).length : 1);
	};

	var uncurryThis$k = functionUncurryThis;
	var toObject$6 = toObject$8;

	var floor$3 = Math.floor;
	var charAt$4 = uncurryThis$k(''.charAt);
	var replace$6 = uncurryThis$k(''.replace);
	var stringSlice$5 = uncurryThis$k(''.slice);
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$6(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$6(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$4(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$5(str, 0, position);
	      case "'": return stringSlice$5(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$5(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor$3(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$4(ch, 1) : captures[f - 1] + charAt$4(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var global$v = global$V;
	var call$f = functionCall;
	var anObject$d = anObject$j;
	var isCallable$d = isCallable$p;
	var classof$9 = classofRaw$1;
	var regexpExec$1 = regexpExec$3;

	var TypeError$e = global$v.TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$d(exec)) {
	    var result = call$f(exec, R, S);
	    if (result !== null) anObject$d(result);
	    return result;
	  }
	  if (classof$9(R) === 'RegExp') return call$f(regexpExec$1, R, S);
	  throw TypeError$e('RegExp#exec called on incompatible receiver');
	};

	var apply$3 = functionApply;
	var call$e = functionCall;
	var uncurryThis$j = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
	var fails$e = fails$r;
	var anObject$c = anObject$j;
	var isCallable$c = isCallable$p;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$5;
	var toLength$2 = toLength$4;
	var toString$8 = toString$b;
	var requireObjectCoercible$5 = requireObjectCoercible$9;
	var advanceStringIndex$2 = advanceStringIndex$3;
	var getMethod$4 = getMethod$6;
	var getSubstitution = getSubstitution$1;
	var regExpExec$2 = regexpExecAbstract;
	var wellKnownSymbol$k = wellKnownSymbol$p;

	var REPLACE = wellKnownSymbol$k('replace');
	var max$3 = Math.max;
	var min$2 = Math.min;
	var concat = uncurryThis$j([].concat);
	var push$7 = uncurryThis$j([].push);
	var stringIndexOf$2 = uncurryThis$j(''.indexOf);
	var stringSlice$4 = uncurryThis$j(''.slice);

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

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$e(function () {
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
	fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$5(this);
	      var replacer = searchValue == undefined ? undefined : getMethod$4(searchValue, REPLACE);
	      return replacer
	        ? call$e(replacer, searchValue, O, replaceValue)
	        : call$e(nativeReplace, toString$8(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$c(this);
	      var S = toString$8(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf$2(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable$c(replaceValue);
	      if (!functionalReplace) replaceValue = toString$8(replaceValue);

	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = regExpExec$2(rx, S);
	        if (result === null) break;

	        push$7(results, result);
	        if (!global) break;

	        var matchStr = toString$8(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$2(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$8(result[0]);
	        var position = max$3(min$2(toIntegerOrInfinity$1(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$7(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$7(replacerArgs, namedCaptures);
	          var replacement = toString$8(apply$3(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$4(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + stringSlice$4(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$8 = classof$b;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString$1 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$8(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$7 = defineBuiltIn$a;
	var toString$7 = objectToString$1;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$7(Object.prototype, 'toString', toString$7, { unsafe: true });
	}

	var call$d = functionCall;
	var hasOwn$9 = hasOwnProperty_1;
	var isPrototypeOf$b = objectIsPrototypeOf;
	var regExpFlags = regexpFlags$1;

	var RegExpPrototype$2 = RegExp.prototype;

	var regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwn$9(R, 'flags') && isPrototypeOf$b(RegExpPrototype$2, R)
	    ? call$d(regExpFlags, R) : flags;
	};

	var PROPER_FUNCTION_NAME$2 = functionName.PROPER;
	var defineBuiltIn$6 = defineBuiltIn$a;
	var anObject$b = anObject$j;
	var $toString$3 = toString$b;
	var fails$d = fails$r;
	var getRegExpFlags$1 = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var n$ToString = RegExpPrototype$1[TO_STRING];

	var NOT_GENERIC = fails$d(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME$2 && n$ToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn$6(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject$b(this);
	    var pattern = $toString$3(R.source);
	    var flags = $toString$3(getRegExpFlags$1(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	var fails$c = fails$r;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$c(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $$p = _export;
	var uncurryThis$i = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toIndexedObject$6 = toIndexedObject$b;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

	var un$Join = uncurryThis$i([].join);

	var ES3_STRINGS = IndexedObject$1 != Object;
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$p({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
	  join: function join(separator) {
	    return un$Join(toIndexedObject$6(this), separator === undefined ? ',' : separator);
	  }
	});

	var browserPonyfill = {exports: {}};

	(function (module, exports) {
		var global = typeof self !== 'undefined' ? self : commonjsGlobal;
		var __self__ = (function () {
		function F() {
		this.fetch = false;
		this.DOMException = global.DOMException;
		}
		F.prototype = global;
		return new F();
		})();
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

		  Object.defineProperty(exports, '__esModule', { value: true });

		  return exports;

		}))({});
		})(__self__);
		__self__.fetch.ponyfill = true;
		// Remove "polyfill" property added by whatwg-fetch
		delete __self__.fetch.polyfill;
		// Choose between native implementation (global) or custom implementation (__self__)
		// var ctx = global.fetch ? global : __self__;
		var ctx = __self__; // this line disable service worker support temporarily
		exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
		exports.default = ctx.fetch; // For TypeScript consumers without esModuleInterop.
		exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
		exports.Headers = ctx.Headers;
		exports.Request = ctx.Request;
		exports.Response = ctx.Response;
		module.exports = exports;
	} (browserPonyfill, browserPonyfill.exports));

	var fetch = /*@__PURE__*/getDefaultExportFromCjs(browserPonyfill.exports);

	var md5 = {exports: {}};

	var crypt = {exports: {}};

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt$1 = {
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
	        return crypt$1.rotl(n, 8) & 0x00FF00FF | crypt$1.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt$1.endian(n[i]);
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

	  crypt.exports = crypt$1;
	})();

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

	(function(){
	  var crypt$1 = crypt.exports,
	      utf8 = charenc_1.utf8,
	      isBuffer = isBuffer_1,
	      bin = charenc_1.bin,

	  // The core
	  md5$1 = function (message, options) {
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
	    var FF = md5$1._ff,
	        GG = md5$1._gg,
	        HH = md5$1._hh,
	        II = md5$1._ii;

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
	  md5$1._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5$1._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5$1._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5$1._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };

	  // Package private blocksize
	  md5$1._blocksize = 16;
	  md5$1._digestsize = 16;

	  md5.exports = function (message, options) {
	    if (message === undefined || message === null)
	      throw new Error('Illegal argument ' + message);

	    var digestbytes = crypt$1.wordsToBytes(md5$1(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt$1.bytesToHex(digestbytes);
	  };

	})();

	var eventsTrackUrl = 'https://wolf-api.tjek.com/sync';

	var prefixKey = 'sgn-';
	var storage;

	function ensureStorage() {
	  if (storage) return;

	  try {
	    storage = window.localStorage;
	    storage[prefixKey + 'test-storage'] = 'foobar';
	    delete storage[prefixKey + 'test-storage'];
	  } catch (error) {
	    storage = {};
	  }
	}

	function get(key) {
	  ensureStorage();

	  try {
	    return JSON.parse(storage[prefixKey + key]);
	  } catch (error) {}
	}
	function set$1(key, value) {
	  ensureStorage();

	  try {
	    storage[prefixKey + key] = _JSON$stringify(value);
	  } catch (error) {}
	}

	var DESCRIPTORS$a = descriptors;
	var FUNCTION_NAME_EXISTS = functionName.EXISTS;
	var uncurryThis$h = functionUncurryThis;
	var defineProperty$5 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var functionToString = uncurryThis$h(FunctionPrototype.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec$1 = uncurryThis$h(nameRE.exec);
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (DESCRIPTORS$a && !FUNCTION_NAME_EXISTS) {
	  defineProperty$5(FunctionPrototype, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return regExpExec$1(nameRE, functionToString(this))[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var global$u = global$V;
	var isCallable$b = isCallable$p;

	var String$2 = global$u.String;
	var TypeError$d = global$u.TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$b(argument)) return argument;
	  throw TypeError$d("Can't set " + String$2(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$g = functionUncurryThis;
	var anObject$a = anObject$j;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$g(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$a(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var isCallable$a = isCallable$p;
	var isObject$7 = isObject$d;
	var setPrototypeOf$8 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$8 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$a(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$7(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$8($this, NewTargetPrototype);
	  return $this;
	};

	var isObject$6 = isObject$d;
	var classof$7 = classofRaw$1;
	var wellKnownSymbol$j = wellKnownSymbol$p;

	var MATCH$3 = wellKnownSymbol$j('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp$1 = function (it) {
	  var isRegExp;
	  return isObject$6(it) && ((isRegExp = it[MATCH$3]) !== undefined ? !!isRegExp : classof$7(it) == 'RegExp');
	};

	var defineProperty$4 = objectDefineProperty.f;

	var proxyAccessor$1 = function (Target, Source, key) {
	  key in Target || defineProperty$4(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};

	var getBuiltIn$5 = getBuiltIn$a;
	var definePropertyModule$3 = objectDefineProperty;
	var wellKnownSymbol$i = wellKnownSymbol$p;
	var DESCRIPTORS$9 = descriptors;

	var SPECIES$3 = wellKnownSymbol$i('species');

	var setSpecies$2 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$5(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule$3.f;

	  if (DESCRIPTORS$9 && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var DESCRIPTORS$8 = descriptors;
	var global$t = global$V;
	var uncurryThis$f = functionUncurryThis;
	var isForced$2 = isForced_1;
	var inheritIfRequired$1 = inheritIfRequired$2;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$8;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var isPrototypeOf$a = objectIsPrototypeOf;
	var isRegExp$2 = isRegexp$1;
	var toString$6 = toString$b;
	var getRegExpFlags = regexpGetFlags;
	var stickyHelpers$1 = regexpStickyHelpers;
	var proxyAccessor = proxyAccessor$1;
	var defineBuiltIn$5 = defineBuiltIn$a;
	var fails$b = fails$r;
	var hasOwn$8 = hasOwnProperty_1;
	var enforceInternalState = internalState.enforce;
	var setSpecies$1 = setSpecies$2;
	var wellKnownSymbol$h = wellKnownSymbol$p;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH$2 = wellKnownSymbol$h('match');
	var NativeRegExp = global$t.RegExp;
	var RegExpPrototype = NativeRegExp.prototype;
	var SyntaxError = global$t.SyntaxError;
	var exec$4 = uncurryThis$f(RegExpPrototype.exec);
	var charAt$3 = uncurryThis$f(''.charAt);
	var replace$5 = uncurryThis$f(''.replace);
	var stringIndexOf$1 = uncurryThis$f(''.indexOf);
	var stringSlice$3 = uncurryThis$f(''.slice);
	// TODO: Use only propper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY = stickyHelpers$1.MISSED_STICKY;
	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS$8 &&
	  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$b(function () {
	    re2[MATCH$2] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt$3(string, index);
	    if (chr === '\\') {
	      result += chr + charAt$3(string, ++index);
	      continue;
	    }
	    if (!brackets && chr === '.') {
	      result += '[\\s\\S]';
	    } else {
	      if (chr === '[') {
	        brackets = true;
	      } else if (chr === ']') {
	        brackets = false;
	      } result += chr;
	    }
	  } return result;
	};

	var handleNCG = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var named = [];
	  var names = {};
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt$3(string, index);
	    if (chr === '\\') {
	      chr = chr + charAt$3(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        if (exec$4(IS_NCG, stringSlice$3(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        result += chr;
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn$8(names, groupname)) {
	          throw new SyntaxError('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
	        ncg = false;
	        groupname = '';
	        continue;
	    }
	    if (ncg) groupname += chr;
	    else result += chr;
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced$2('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf$a(RegExpPrototype, this);
	    var patternIsRegExp = isRegExp$2(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf$a(RegExpPrototype, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString$6(pattern);
	    flags = flags === undefined ? '' : toString$6(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf$1(flags, 's') > -1;
	      if (dotAll) flags = replace$5(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf$1(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y$1) flags = replace$5(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired$1(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty$3(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys$4 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$4.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys$4[index++]);
	  }

	  RegExpPrototype.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype;
	  defineBuiltIn$5(global$t, 'RegExp', RegExpWrapper);
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies$1('RegExp');

	var keys$3 = {exports: {}};

	var $$o = _export$1;
	var toObject$5 = toObject$e;
	var nativeKeys = objectKeys$6;
	var fails$a = fails$I;

	var FAILS_ON_PRIMITIVES$1 = fails$a(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$o({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$5(it));
	  }
	});

	var path$b = path$j;

	var keys$2 = path$b.Object.keys;

	var parent$v = keys$2;

	var keys$1 = parent$v;

	(function (module) {
		module.exports = keys$1;
	} (keys$3));

	var _Object$keys = /*@__PURE__*/getDefaultExportFromCjs(keys$3.exports);

	var splice$4 = {exports: {}};

	var $$n = _export$1;
	var global$s = global$1y;
	var toAbsoluteIndex$2 = toAbsoluteIndex$7;
	var toIntegerOrInfinity = toIntegerOrInfinity$9;
	var lengthOfArrayLike$5 = lengthOfArrayLike$d;
	var toObject$4 = toObject$e;
	var arraySpeciesCreate$2 = arraySpeciesCreate$5;
	var createProperty$5 = createProperty$8;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('splice');

	var TypeError$c = global$s.TypeError;
	var max$2 = Math.max;
	var min$1 = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$n({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$4(this);
	    var len = lengthOfArrayLike$5(O);
	    var actualStart = toAbsoluteIndex$2(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$1(max$2(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
	      throw TypeError$c(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate$2(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty$5(A, k, O[from]);
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

	var entryVirtual$6 = entryVirtual$a;

	var splice$3 = entryVirtual$6('Array').splice;

	var isPrototypeOf$9 = objectIsPrototypeOf$1;
	var method$5 = splice$3;

	var ArrayPrototype$6 = Array.prototype;

	var splice$2 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$6 || (isPrototypeOf$9(ArrayPrototype$6, it) && own === ArrayPrototype$6.splice) ? method$5 : own;
	};

	var parent$u = splice$2;

	var splice$1 = parent$u;

	(function (module) {
		module.exports = splice$1;
	} (splice$4));

	var _spliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(splice$4.exports);

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

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

	var uncurryThis$e = functionUncurryThis;
	var aCallable$5 = aCallable$7;
	var NATIVE_BIND = functionBindNative;

	var bind$8 = uncurryThis$e(uncurryThis$e.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$5(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$8(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$6 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es-x/no-array-isarray -- safe
	var isArray$9 = Array.isArray || function isArray(argument) {
	  return classof$6(argument) == 'Array';
	};

	var uncurryThis$d = functionUncurryThis;
	var fails$9 = fails$r;
	var isCallable$9 = isCallable$p;
	var classof$5 = classof$b;
	var getBuiltIn$4 = getBuiltIn$a;
	var inspectSource$1 = inspectSource$4;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct = getBuiltIn$4('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$3 = uncurryThis$d(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$9(argument)) return false;
	  try {
	    construct(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$9(argument)) return false;
	  switch (classof$5(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$3(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$3 = !construct || fails$9(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var global$r = global$V;
	var isArray$8 = isArray$9;
	var isConstructor$2 = isConstructor$3;
	var isObject$5 = isObject$d;
	var wellKnownSymbol$g = wellKnownSymbol$p;

	var SPECIES$2 = wellKnownSymbol$g('species');
	var Array$4 = global$r.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$8(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$2(C) && (C === Array$4 || isArray$8(C.prototype))) C = undefined;
	    else if (isObject$5(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$4 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$1 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var bind$7 = functionBindContext;
	var uncurryThis$c = functionUncurryThis;
	var IndexedObject = indexedObject;
	var toObject$3 = toObject$8;
	var lengthOfArrayLike$4 = lengthOfArrayLike$7;
	var arraySpeciesCreate = arraySpeciesCreate$1;

	var push$6 = uncurryThis$c([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$3 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$3($this);
	    var self = IndexedObject(O);
	    var boundFunction = bind$7(callbackfn, that);
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
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$3(7)
	};

	var $forEach$1 = arrayIteration.forEach;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;

	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$q = global$V;
	var DOMIterables$1 = domIterables;
	var DOMTokenListPrototype$1 = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$8;

	var handlePrototype$1 = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$2(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  if (DOMIterables$1[COLLECTION_NAME$1]) {
	    handlePrototype$1(global$q[COLLECTION_NAME$1] && global$q[COLLECTION_NAME$1].prototype);
	  }
	}

	handlePrototype$1(DOMTokenListPrototype$1);

	var call$c = functionCall;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$9 = anObject$j;
	var toLength$1 = toLength$4;
	var toString$5 = toString$b;
	var requireObjectCoercible$4 = requireObjectCoercible$9;
	var getMethod$3 = getMethod$6;
	var advanceStringIndex$1 = advanceStringIndex$3;
	var regExpExec = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic$1('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible$4(this);
	      var matcher = regexp == undefined ? undefined : getMethod$3(regexp, MATCH);
	      return matcher ? call$c(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$5(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject$9(this);
	      var S = toString$5(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regExpExec(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec(rx, S)) !== null) {
	        var matchStr = toString$5(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var _getMatcher = function _getMatcher(element) {
	  return element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || Function.prototype;
	};

	var _level = 0;

	function _matchesSelector(element, selector, boundElement) {
	  if (element === boundElement) return;
	  if (_getMatcher(element).call(element, selector)) return element;

	  if (element.parentElement) {
	    _level++;
	    return _matchesSelector(element.parentElement, selector, boundElement);
	  }
	}

	var handlersBySelectorByTypeByInstance = {};

	function _bind(events, selector, callback, remove) {
	  var _this = this;

	  if (!(events instanceof Array)) events = [events];
	  var id = this.id;
	  var handlersBySelectorByType = handlersBySelectorByTypeByInstance[this.id];

	  var _loop = function _loop(k) {
	    var type = events[k];

	    if (remove) {
	      // if there are no events tied to this element at all
	      // then don't do anything
	      if (!handlersBySelectorByType) return {
	        v: void 0
	      }; // if there is no event type specified then remove all events
	      // example: Gator(element).off()

	      if (!type) {
	        _Object$keys(handlersBySelectorByType).forEach(function (handleType) {
	          handlersBySelectorByType[handleType] = {};
	        });

	        return {
	          v: void 0
	        };
	      } // if no callback or selector is specified remove all events of this type
	      // example: Gator(element).off('click')


	      if (!callback && !selector) {
	        handlersBySelectorByType[type] = {};
	        return {
	          v: void 0
	        };
	      } // if a selector is specified but no callback remove all events
	      // for this selector
	      // example: Gator(element).off('click', '.sub-element')


	      if (!callback) {
	        delete handlersBySelectorByType[type][selector];
	        return {
	          v: void 0
	        };
	      } // if we have specified an event type, selector, and callback then we
	      // need to make sure there are callbacks tied to this selector to
	      // begin with.  if there aren't then we can stop here


	      if (!handlersBySelectorByType[type][selector]) return {
	        v: void 0
	      }; // if there are then loop through all the callbacks and if we find
	      // one that matches remove it from the array

	      for (var i = 0; i < handlersBySelectorByType[type][selector].length; i++) {
	        var handlers = handlersBySelectorByType[type][selector];

	        if (handlers[i] === callback) {
	          _spliceInstanceProperty(handlers).call(handlers, i, 1);

	          break;
	        }
	      }

	      return "continue";
	    }

	    if (!handlersBySelectorByType || !handlersBySelectorByType[type]) _this.element.addEventListener(type, function (e) {
	      var handlersBySelector = handlersBySelectorByType[type];
	      if (!handlersBySelector) return;
	      var target = e.target;
	      var matches = {}; // find all events that match

	      _level = 0;

	      _Object$keys(handlersBySelector).forEach(function (handlerSelector) {
	        if (target instanceof HTMLElement) {
	          var match = _matchesSelector(target, handlerSelector, instances[id].element);

	          if (match) {
	            _level++;
	            handlersBySelector[handlerSelector].match = match;
	            matches[_level] = handlersBySelector[handlerSelector];
	          }
	        }
	      }); // stopPropagation() fails to set cancelBubble to true in Webkit
	      // @see http://code.google.com/p/chromium/issues/detail?id=162270


	      e.stopPropagation = function () {
	        e.cancelBubble = true;
	      };

	      for (var _i = 0; _i <= _level; _i++) {
	        if (matches[_i]) {
	          for (var j = 0; j < matches[_i].length; j++) {
	            if (matches[_i][j].call(matches[_i].match, e) === false) {
	              e.preventDefault();
	              e.stopPropagation();
	              return;
	            }

	            if (e.cancelBubble) return;
	          }
	        }
	      }
	    }, type == 'blur' || type == 'focus');

	    if (!handlersBySelectorByType) {
	      handlersBySelectorByTypeByInstance[id] = {};
	      handlersBySelectorByType = handlersBySelectorByTypeByInstance[id];
	    }

	    if (!handlersBySelectorByType[type]) {
	      handlersBySelectorByType[type] = {};
	    }

	    if (!handlersBySelectorByType[type][selector]) handlersBySelectorByType[type][selector] = [];
	    handlersBySelectorByType[type][selector].push(callback);
	  };

	  for (var k = 0; k < events.length; k++) {
	    var _ret = _loop(k);

	    if (_ret === "continue") continue;
	    if (typeof _ret === "object") return _ret.v;
	  }
	}

	var _id = 0;
	var instances = {};

	function Gator(element, id) {
	  // called as function
	  if (!(this instanceof Gator)) {
	    // only keep one Gator instance per node to make sure that
	    // we don't create a ton of new objects if you want to delegate
	    // multiple events from the same node
	    //
	    // for example: Gator(document).on(...
	    for (var key in instances) {
	      if (instances[key].element === element) return instances[key];
	    }

	    _id++;
	    return instances[_id] = new Gator(element, _id);
	  }

	  this.element = element;
	  this.id = id;
	}

	Gator.prototype.on = function (events, selector, callback) {
	  _bind.call(this, events, selector, callback);
	};

	Gator.prototype.off = function (events, selector, callback) {
	  _bind.call(this, events, selector, callback, true);
	};

	var isBrowser = function isBrowser() {
	  return typeof window === 'object' && typeof document === 'object';
	};
	function error(err, options) {
	  err.message = err.message || null;

	  if (typeof options === 'string') {
	    err.message = options;
	  } else if (typeof options === 'object' && options) {
	    for (var key in options) {
	      err[key] = options[key];
	    }

	    if (options.message) err.message = options.message;

	    if (options.code || options.message) {
	      err.code = options.code || options.name;
	    }

	    if (options.stack) err.stack = options.stack;
	  }

	  err.name = (options == null ? void 0 : options.name) || err.name || err.code || 'Error';
	  err.time = new Date();
	  return err;
	}
	function throttle(fn, threshold, scope) {
	  if (threshold === void 0) {
	    threshold = 250;
	  }

	  var last;
	  var deferTimer;
	  return function () {
	    var context = scope || this;
	    var now = new Date().getTime();
	    var args = arguments;

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
	}
	var on = function on(el, events, selector, callback) {
	  return Gator(el).on(events, selector, callback);
	};
	var off = function off(el, events, selector, callback) {
	  return Gator(el).off(events, selector, callback);
	};

	var uuid = function uuid() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0;
	    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
	  });
	};

	var btoa = function btoa(str) {
	  return isBrowser() ? window.btoa(str) : Buffer.from(str.toString(), 'binary').toString('base64');
	};

	var createTrackerClient = function createTrackerClient() {
	  var _id;

	  var id = get('client-id');
	  if ((_id = id) != null && _id.data) id = id.data;
	  if (!id) id = uuid();
	  set$1('client-id', id);
	  return {
	    id: id
	  };
	};

	function getPool() {
	  var data = get('event-tracker-pool');
	  return Array.isArray(data) ? _filterInstanceProperty(data).call(data, function (_ref) {
	    var _i = _ref._i;
	    return typeof _i === 'string';
	  }) : [];
	}

	var unloadHandler = function unloadHandler() {
	  set$1('event-tracker-pool', _concatInstanceProperty(pool).call(pool, getPool()));
	};

	var pool;

	var Tracker = /*#__PURE__*/function () {
	  function Tracker(options) {
	    this.hasMadeInitialDispatch = false;
	    this.location = {
	      geohash: null,
	      time: null,
	      country: null
	    };

	    if (!pool) {
	      pool = getPool();
	      set$1('event-tracker-pool', []);

	      if (typeof window !== 'undefined') {
	        window.addEventListener('beforeunload', unloadHandler, false);
	      }
	    }

	    for (var key in this.defaultOptions) {
	      this[key] = (options == null ? void 0 : options[key]) || this.defaultOptions[key];
	    }

	    this.client = (options == null ? void 0 : options.client) || createTrackerClient();
	    this.eventsTrackUrl = (options == null ? void 0 : options.eventsTrackUrl) || eventsTrackUrl;

	    if (this.eventsTrackUrl) {
	      dispatch(this.eventsTrackUrl);
	      this.hasMadeInitialDispatch = true;
	    }
	  }

	  var _proto = Tracker.prototype;

	  _proto.setEventsTrackUrl = function setEventsTrackUrl(eventsTrackUrl) {
	    this.eventsTrackUrl = eventsTrackUrl;

	    if (!this.hasMadeInitialDispatch) {
	      dispatch(this.eventsTrackUrl);
	      this.hasMadeInitialDispatch = true;
	    }
	  };

	  _proto.trackEvent = function trackEvent(type, properties, version) {
	    if (version === void 0) {
	      version = 2;
	    }

	    if (typeof type !== 'number') throw error(new Error('Event type is required'));
	    if (!this.trackId) return;

	    var evt = _Object$assign({}, properties, {
	      _e: type,
	      _v: version,
	      _i: uuid(),
	      _t: Math.round(new Date().getTime() / 1000),
	      _a: this.trackId
	    });

	    if (this.location.geohash) evt['l.h'] = this.location.geohash;
	    if (this.location.time) evt['l.ht'] = this.location.time;
	    if (this.location.country) evt['l.c'] = this.location.country;
	    pool.push(evt);

	    while (pool.length > this.poolLimit) {
	      pool.shift();
	    }

	    dispatch(this.eventsTrackUrl);
	    return this;
	  };

	  _proto.setLocation = function setLocation(location) {
	    for (var key in location) {
	      this.location[key] = location[key];
	    }

	    return this;
	  };

	  _proto.trackPagedPublicationOpened = function trackPagedPublicationOpened(properties, version) {
	    return this.trackEvent(1, properties, version);
	  };

	  _proto.trackPagedPublicationPageDisappeared = function trackPagedPublicationPageDisappeared(properties, version) {
	    return this.trackEvent(2, properties, version);
	  };

	  _proto.trackOfferOpened = function trackOfferOpened(properties, version) {
	    return this.trackEvent(3, properties, version);
	  };

	  _proto.trackSearched = function trackSearched(properties, version) {
	    return this.trackEvent(5, properties, version);
	  };

	  _proto.trackIncitoPublicationOpened = function trackIncitoPublicationOpened(properties, version) {
	    return this.trackEvent(11, properties, version);
	  };

	  _proto.createViewToken = function createViewToken() {
	    var _context, _context2;

	    for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
	      parts[_key] = arguments[_key];
	    }

	    return btoa(String.fromCharCode.apply(null, _sliceInstanceProperty$1(_context = md5.exports(_concatInstanceProperty(_context2 = [this.client.id]).call(_context2, parts).join(''), {
	      asBytes: true
	    })).call(_context, 0, 8)));
	  };

	  return _createClass(Tracker);
	}();

	Tracker.prototype.defaultOptions = {
	  trackId: null,
	  poolLimit: 1000
	};
	var dispatching = false;
	var dispatchLimit = 100;
	var dispatchRetryInterval = null;
	var dispatch = throttle( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(eventsTrackUrl) {
	  var _pool;

	  var events, nacks, response, json, _loop, i;

	  return _regeneratorRuntime.wrap(function _callee$(_context3) {
	    while (1) {
	      switch (_context3.prev = _context3.next) {
	        case 0:
	          if (pool) {
	            _context3.next = 3;
	            break;
	          }

	          console.warn('Tracker: dispatch called with no active event pool.');
	          return _context3.abrupt("return");

	        case 3:
	          if (!(dispatching || !((_pool = pool) != null && _pool.length))) {
	            _context3.next = 5;
	            break;
	          }

	          return _context3.abrupt("return");

	        case 5:
	          events = _sliceInstanceProperty$1(pool).call(pool, 0, dispatchLimit);
	          nacks = 0;
	          dispatching = true;
	          _context3.prev = 8;
	          _context3.next = 11;
	          return fetch(eventsTrackUrl, {
	            method: 'post',
	            timeout: 1000 * 20,
	            headers: {
	              'Content-Type': 'application/json; charset=utf-8'
	            },
	            body: _JSON$stringify({
	              events: events
	            })
	          });

	        case 11:
	          response = _context3.sent;
	          _context3.next = 14;
	          return response.json();

	        case 14:
	          json = _context3.sent;

	          if (dispatchRetryInterval) {
	            dispatchRetryInterval = clearInterval(dispatchRetryInterval);
	          }

	          _loop = function _loop(i) {
	            var _json$events$i = json.events[i],
	                status = _json$events$i.status,
	                id = _json$events$i.id;

	            if (status === 'validation_error' || status === 'ack') {
	              pool = _filterInstanceProperty(pool).call(pool, function (_ref3) {
	                var _i = _ref3._i;
	                return _i !== id;
	              });
	            } else {
	              nacks++;
	            }
	          };

	          for (i = 0; i < json.events.length; i++) {
	            _loop(i);
	          } // Keep dispatching until the pool size reaches a sane level.


	          if (pool.length >= dispatchLimit && !nacks) dispatch(eventsTrackUrl);
	          _context3.next = 24;
	          break;

	        case 21:
	          _context3.prev = 21;
	          _context3.t0 = _context3["catch"](8);

	          // Try dispatching again in 20 seconds, if we aren't already trying
	          if (!dispatchRetryInterval) {
	            console.warn("We're gonna keep trying, but there was an error while dispatching events:", _context3.t0);
	            dispatchRetryInterval = setInterval(function () {
	              dispatch(eventsTrackUrl);
	            }, 20000);
	          }

	        case 24:
	          _context3.prev = 24;
	          dispatching = false;
	          return _context3.finish(24);

	        case 27:
	        case "end":
	          return _context3.stop();
	      }
	    }
	  }, _callee, null, [[8, 21, 24, 27]]);
	})), 4000);

	var getOwnPropertySymbols$2 = {exports: {}};

	var objectGetOwnPropertyNamesExternal = {};

	var global$p = global$1y;
	var toAbsoluteIndex$1 = toAbsoluteIndex$7;
	var lengthOfArrayLike$3 = lengthOfArrayLike$d;
	var createProperty$4 = createProperty$8;

	var Array$3 = global$p.Array;
	var max$1 = Math.max;

	var arraySliceSimple$1 = function (O, start, end) {
	  var length = lengthOfArrayLike$3(O);
	  var k = toAbsoluteIndex$1(start, length);
	  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
	  var result = Array$3(max$1(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty$4(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	/* eslint-disable es/no-object-getownpropertynames -- safe */

	var classof$4 = classofRaw$3;
	var toIndexedObject$5 = toIndexedObject$i;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames$1.f;
	var arraySlice$7 = arraySliceSimple$1;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$7(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$4(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$5(it));
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$f = wellKnownSymbol$I;

	wellKnownSymbolWrapped.f = wellKnownSymbol$f;

	var path$a = path$j;
	var hasOwn$7 = hasOwnProperty_1$1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$3 = objectDefineProperty$1.f;

	var defineWellKnownSymbol$l = function (NAME) {
	  var Symbol = path$a.Symbol || (path$a.Symbol = {});
	  if (!hasOwn$7(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var $$m = _export$1;
	var global$o = global$1y;
	var getBuiltIn$3 = getBuiltIn$l;
	var apply$2 = functionApply$1;
	var call$b = functionCall$1;
	var uncurryThis$b = functionUncurryThis$1;
	var DESCRIPTORS$7 = descriptors$1;
	var NATIVE_SYMBOL = nativeSymbol$1;
	var fails$8 = fails$I;
	var hasOwn$6 = hasOwnProperty_1$1;
	var isArray$7 = isArray$d;
	var isCallable$8 = isCallable$H;
	var isObject$4 = isObject$p;
	var isPrototypeOf$8 = objectIsPrototypeOf$1;
	var isSymbol$1 = isSymbol$7;
	var anObject$8 = anObject$u;
	var toObject$2 = toObject$e;
	var toIndexedObject$4 = toIndexedObject$i;
	var toPropertyKey$1 = toPropertyKey$8;
	var $toString$2 = toString$i;
	var createPropertyDescriptor$3 = createPropertyDescriptor$d;
	var nativeObjectCreate = objectCreate$1;
	var objectKeys$1 = objectKeys$6;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames$1;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols$1;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor$1;
	var definePropertyModule$2 = objectDefineProperty$1;
	var definePropertiesModule = objectDefineProperties$1;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable$1;
	var arraySlice$6 = arraySlice$9;
	var redefine$2 = redefine$6;
	var shared = shared$9.exports;
	var sharedKey$1 = sharedKey$8;
	var hiddenKeys = hiddenKeys$a;
	var uid = uid$6;
	var wellKnownSymbol$e = wellKnownSymbol$I;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
	var setToStringTag$7 = setToStringTag$b;
	var InternalStateModule$5 = internalState$1;
	var $forEach = arrayIteration$1.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$e('toPrimitive');

	var setInternalState$5 = InternalStateModule$5.set;
	var getInternalState$2 = InternalStateModule$5.getterFor(SYMBOL);

	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$o.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$b = global$o.TypeError;
	var QObject = global$o.QObject;
	var $stringify = getBuiltIn$3('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
	var nativeDefineProperty = definePropertyModule$2.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var push$5 = uncurryThis$b([].push);

	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$7 && fails$8(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
	  setInternalState$5(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$7) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$8(O);
	  var key = toPropertyKey$1(P);
	  anObject$8(Attributes);
	  if (hasOwn$6(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn$6(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$3(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn$6(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$3(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$8(O);
	  var properties = toIndexedObject$4(Properties);
	  var keys = objectKeys$1(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS$7 || call$b($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
	  var P = toPropertyKey$1(V);
	  var enumerable = call$b(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype$1 && hasOwn$6(AllSymbols, P) && !hasOwn$6(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn$6(this, P) || !hasOwn$6(AllSymbols, P) || hasOwn$6(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$4(O);
	  var key = toPropertyKey$1(P);
	  if (it === ObjectPrototype$1 && hasOwn$6(AllSymbols, key) && !hasOwn$6(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && hasOwn$6(AllSymbols, key) && !(hasOwn$6(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$4(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!hasOwn$6(AllSymbols, key) && !hasOwn$6(hiddenKeys, key)) push$5(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$4(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (hasOwn$6(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$6(ObjectPrototype$1, key))) {
	      push$5(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf$8(SymbolPrototype, this)) throw TypeError$b('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString$2(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) call$b(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn$6(this, HIDDEN) && hasOwn$6(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$3(1, value));
	    };
	    if (DESCRIPTORS$7 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  redefine$2(SymbolPrototype, 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  redefine$2($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable$1;
	  definePropertyModule$2.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$e(name), name);
	  };

	  if (DESCRIPTORS$7) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	  }
	}

	$$m({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys$1(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol$k(name);
	});

	$$m({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = $toString$2(key);
	    if (hasOwn$6(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol$1(sym)) throw TypeError$b(sym + ' is not a symbol');
	    if (hasOwn$6(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$m({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$7 }, {
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

	$$m({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$m({ target: 'Object', stat: true, forced: fails$8(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject$2(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$8(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$m({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice$6(arguments);
	      var $replacer = replacer;
	      if (!isObject$4(replacer) && it === undefined || isSymbol$1(it)) return; // IE8 returns string on undefined
	      if (!isArray$7(replacer)) replacer = function (key, value) {
	        if (isCallable$8($replacer)) value = call$b($replacer, this, key, value);
	        if (!isSymbol$1(value)) return value;
	      };
	      args[1] = replacer;
	      return apply$2($stringify, null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!SymbolPrototype[TO_PRIMITIVE]) {
	  var valueOf = SymbolPrototype.valueOf;
	  // eslint-disable-next-line no-unused-vars -- required for .length
	  redefine$2(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	    // TODO: improve hint logic
	    return call$b(valueOf, this);
	  });
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$7($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var path$9 = path$j;

	var getOwnPropertySymbols$1 = path$9.Object.getOwnPropertySymbols;

	var parent$t = getOwnPropertySymbols$1;

	var getOwnPropertySymbols = parent$t;

	(function (module) {
		module.exports = getOwnPropertySymbols;
	} (getOwnPropertySymbols$2));

	var _Object$getOwnPropertySymbols = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertySymbols$2.exports);

	var getOwnPropertyDescriptor$5 = {exports: {}};

	var getOwnPropertyDescriptor$4 = {exports: {}};

	var $$l = _export$1;
	var fails$7 = fails$I;
	var toIndexedObject$3 = toIndexedObject$i;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor$1.f;
	var DESCRIPTORS$6 = descriptors$1;

	var FAILS_ON_PRIMITIVES = fails$7(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED = !DESCRIPTORS$6 || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	$$l({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS$6 }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject$3(it), key);
	  }
	});

	var path$8 = path$j;

	var Object$3 = path$8.Object;

	var getOwnPropertyDescriptor$3 = getOwnPropertyDescriptor$4.exports = function getOwnPropertyDescriptor(it, key) {
	  return Object$3.getOwnPropertyDescriptor(it, key);
	};

	if (Object$3.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor$3.sham = true;

	var parent$s = getOwnPropertyDescriptor$4.exports;

	var getOwnPropertyDescriptor$2 = parent$s;

	(function (module) {
		module.exports = getOwnPropertyDescriptor$2;
	} (getOwnPropertyDescriptor$5));

	var _Object$getOwnPropertyDescriptor = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertyDescriptor$5.exports);

	var getOwnPropertyDescriptors$2 = {exports: {}};

	var $$k = _export$1;
	var DESCRIPTORS$5 = descriptors$1;
	var ownKeys$4 = ownKeys$8;
	var toIndexedObject$2 = toIndexedObject$i;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor$1;
	var createProperty$3 = createProperty$8;

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	$$k({ target: 'Object', stat: true, sham: !DESCRIPTORS$5 }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject$2(object);
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	    var keys = ownKeys$4(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty$3(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var path$7 = path$j;

	var getOwnPropertyDescriptors$1 = path$7.Object.getOwnPropertyDescriptors;

	var parent$r = getOwnPropertyDescriptors$1;

	var getOwnPropertyDescriptors = parent$r;

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

	var wellKnownSymbol$d = wellKnownSymbol$p;
	var create$8 = objectCreate;
	var definePropertyModule$1 = objectDefineProperty;

	var UNSCOPABLES = wellKnownSymbol$d('unscopables');
	var ArrayPrototype$5 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$5[UNSCOPABLES] == undefined) {
	  definePropertyModule$1.f(ArrayPrototype$5, UNSCOPABLES, {
	    configurable: true,
	    value: create$8(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype$5[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var fails$6 = fails$r;

	var correctPrototypeGetter = !fails$6(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var global$n = global$V;
	var hasOwn$5 = hasOwnProperty_1;
	var isCallable$7 = isCallable$p;
	var toObject$1 = toObject$8;
	var sharedKey = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var Object$2 = global$n.Object;
	var ObjectPrototype = Object$2.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$2.getPrototypeOf : function (O) {
	  var object = toObject$1(O);
	  if (hasOwn$5(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$7(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object$2 ? ObjectPrototype : null;
	};

	var fails$5 = fails$r;
	var isCallable$6 = isCallable$p;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var defineBuiltIn$4 = defineBuiltIn$a;
	var wellKnownSymbol$c = wellKnownSymbol$p;

	var ITERATOR$7 = wellKnownSymbol$c('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es-x/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$5(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$6(IteratorPrototype$2[ITERATOR$7])) {
	  defineBuiltIn$4(IteratorPrototype$2, ITERATOR$7, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$2 = objectDefineProperty.f;
	var hasOwn$4 = hasOwnProperty_1;
	var wellKnownSymbol$b = wellKnownSymbol$p;

	var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag');

	var setToStringTag$6 = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$4(target, TO_STRING_TAG$1)) {
	    defineProperty$2(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$7 = objectCreate;
	var createPropertyDescriptor$2 = createPropertyDescriptor$6;
	var setToStringTag$5 = setToStringTag$6;
	var Iterators$4 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$2 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$7(IteratorPrototype$1, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$5(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var $$j = _export;
	var call$a = functionCall;
	var FunctionName = functionName;
	var isCallable$5 = isCallable$p;
	var createIteratorConstructor$1 = createIteratorConstructor$2;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf$7 = objectSetPrototypeOf;
	var setToStringTag$4 = setToStringTag$6;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$8;
	var defineBuiltIn$3 = defineBuiltIn$a;
	var wellKnownSymbol$a = wellKnownSymbol$p;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$6 = wellKnownSymbol$a('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$1(IteratorConstructor, NAME, next);

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
	  var nativeIterator = IterablePrototype[ITERATOR$6]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$7) {
	          setPrototypeOf$7(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable$5(CurrentIteratorPrototype[ITERATOR$6])) {
	          defineBuiltIn$3(CurrentIteratorPrototype, ITERATOR$6, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$4(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$a(nativeIterator, this); };
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
	        defineBuiltIn$3(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$j({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
	    defineBuiltIn$3(IterablePrototype, ITERATOR$6, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$3[NAME] = defaultIterator;

	  return methods;
	};

	var toIndexedObject$1 = toIndexedObject$b;
	var addToUnscopables = addToUnscopables$1;
	var Iterators$2 = iterators;
	var InternalStateModule$4 = internalState;
	var defineProperty$1 = objectDefineProperty.f;
	var defineIterator$1 = defineIterator$2;
	var DESCRIPTORS$4 = descriptors;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$4 = InternalStateModule$4.set;
	var getInternalState$1 = InternalStateModule$4.getterFor(ARRAY_ITERATOR);

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
	var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$4(this, {
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
	var values = Iterators$2.Arguments = Iterators$2.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$4 && values.name !== 'values') try {
	  defineProperty$1(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }

	var classof$3 = classofRaw$1;
	var global$m = global$V;

	var engineIsNode = classof$3(global$m.process) == 'process';

	var global$l = global$V;
	var isPrototypeOf$7 = objectIsPrototypeOf;

	var TypeError$a = global$l.TypeError;

	var anInstance$3 = function (it, Prototype) {
	  if (isPrototypeOf$7(Prototype, it)) return it;
	  throw TypeError$a('Incorrect invocation');
	};

	var global$k = global$V;
	var isConstructor$1 = isConstructor$3;
	var tryToString$2 = tryToString$4;

	var TypeError$9 = global$k.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor$1(argument)) return argument;
	  throw TypeError$9(tryToString$2(argument) + ' is not a constructor');
	};

	var anObject$7 = anObject$j;
	var aConstructor = aConstructor$1;
	var wellKnownSymbol$9 = wellKnownSymbol$p;

	var SPECIES$1 = wellKnownSymbol$9('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$2 = function (O, defaultConstructor) {
	  var C = anObject$7(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$7(C)[SPECIES$1]) == undefined ? defaultConstructor : aConstructor(S);
	};

	var uncurryThis$a = functionUncurryThis;

	var arraySlice$5 = uncurryThis$a([].slice);

	var global$j = global$V;

	var TypeError$8 = global$j.TypeError;

	var validateArgumentsLength$2 = function (passed, required) {
	  if (passed < required) throw TypeError$8('Not enough arguments');
	  return passed;
	};

	var userAgent$2 = engineUserAgent;

	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

	var global$i = global$V;
	var apply$1 = functionApply;
	var bind$6 = functionBindContext;
	var isCallable$4 = isCallable$p;
	var hasOwn$3 = hasOwnProperty_1;
	var fails$4 = fails$r;
	var html = html$2;
	var arraySlice$4 = arraySlice$5;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength$1 = validateArgumentsLength$2;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$2 = engineIsNode;

	var set = global$i.setImmediate;
	var clear = global$i.clearImmediate;
	var process$2 = global$i.process;
	var Dispatch = global$i.Dispatch;
	var Function$1 = global$i.Function;
	var MessageChannel = global$i.MessageChannel;
	var String$1 = global$i.String;
	var counter = 0;
	var queue$1 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var location, defer, channel, port;

	try {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  location = global$i.location;
	} catch (error) { /* empty */ }

	var run = function (id) {
	  if (hasOwn$3(queue$1, id)) {
	    var fn = queue$1[id];
	    delete queue$1[id];
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
	  global$i.postMessage(String$1(id), location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(handler) {
	    validateArgumentsLength$1(arguments.length, 1);
	    var fn = isCallable$4(handler) ? handler : Function$1(handler);
	    var args = arraySlice$4(arguments, 1);
	    queue$1[++counter] = function () {
	      apply$1(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$1[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$2) {
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
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bind$6(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$i.addEventListener &&
	    isCallable$4(global$i.postMessage) &&
	    !global$i.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails$4(post)
	  ) {
	    defer = post;
	    global$i.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
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

	var userAgent$1 = engineUserAgent;
	var global$h = global$V;

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$h.Pebble !== undefined;

	var userAgent = engineUserAgent;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

	var global$g = global$V;
	var bind$5 = functionBindContext;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var IS_IOS = engineIsIos;
	var IS_IOS_PEBBLE = engineIsIosPebble;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$1 = engineIsNode;

	var MutationObserver = global$g.MutationObserver || global$g.WebKitMutationObserver;
	var document$2 = global$g.document;
	var process$1 = global$g.process;
	var Promise$1 = global$g.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$1(global$g, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node, promise$1, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
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
	  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise$1 = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise$1.constructor = Promise$1;
	    then = bind$5(promise$1.then, promise$1);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$1) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // strange IE + webpack dev server bug - use .bind(global)
	    macrotask = bind$5(macrotask, global$g);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }
	}

	var microtask$1 = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify$1();
	  } last = task;
	};

	var global$f = global$V;

	var hostReportErrors$1 = function (a, b) {
	  var console = global$f.console;
	  if (console && console.error) {
	    arguments.length == 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform$3 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var Queue$1 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$1.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    if (this.head) this.tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = entry.next;
	      if (this.tail === entry) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue = Queue$1;

	var global$e = global$V;

	var promiseNativeConstructor = global$e.Promise;

	var engineIsBrowser = typeof window == 'object' && typeof Deno != 'object';

	var global$d = global$V;
	var NativePromiseConstructor$3 = promiseNativeConstructor;
	var isCallable$3 = isCallable$p;
	var isForced$1 = isForced_1;
	var inspectSource = inspectSource$4;
	var wellKnownSymbol$8 = wellKnownSymbol$p;
	var IS_BROWSER = engineIsBrowser;
	var V8_VERSION = engineV8Version;

	NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
	var SPECIES = wellKnownSymbol$8('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$3(global$d.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES] = FakePromise;
	  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	  if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT$1;
	});

	var promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
	  SUBCLASSING: SUBCLASSING
	};

	var newPromiseCapability$2 = {};

	var aCallable$4 = aCallable$7;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$4(resolve);
	  this.reject = aCallable$4(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var $$i = _export;
	var IS_NODE = engineIsNode;
	var global$c = global$V;
	var call$9 = functionCall;
	var defineBuiltIn$2 = defineBuiltIn$a;
	var setPrototypeOf$6 = objectSetPrototypeOf;
	var setToStringTag$3 = setToStringTag$6;
	var setSpecies = setSpecies$2;
	var aCallable$3 = aCallable$7;
	var isCallable$2 = isCallable$p;
	var isObject$3 = isObject$d;
	var anInstance$2 = anInstance$3;
	var speciesConstructor$1 = speciesConstructor$2;
	var task = task$1.set;
	var microtask = microtask$1;
	var hostReportErrors = hostReportErrors$1;
	var perform$2 = perform$3;
	var Queue = queue;
	var InternalStateModule$3 = internalState;
	var NativePromiseConstructor$2 = promiseNativeConstructor;
	var PromiseConstructorDetection = promiseConstructorDetection;
	var newPromiseCapabilityModule$3 = newPromiseCapability$2;

	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = InternalStateModule$3.getterFor(PROMISE);
	var setInternalState$3 = InternalStateModule$3.set;
	var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
	var PromiseConstructor = NativePromiseConstructor$2;
	var PromisePrototype = NativePromisePrototype$1;
	var TypeError$7 = global$c.TypeError;
	var document$1 = global$c.document;
	var process = global$c.process;
	var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
	var newGenericPromiseCapability = newPromiseCapability$1;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$c.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$3(it) && isCallable$2(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state == FULFILLED;
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
	        reject(TypeError$7('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call$9(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
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
	    global$c.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$c['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call$9(task, global$c, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform$2(function () {
	        if (IS_NODE) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  call$9(task, global$c, function () {
	    var promise = state.facade;
	    if (IS_NODE) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$4 = function (fn, state, unwrap) {
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
	    if (state.facade === value) throw TypeError$7("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          call$9(then, value,
	            bind$4(internalResolve, wrapper, state),
	            bind$4(internalReject, wrapper, state)
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
	if (FORCED_PROMISE_CONSTRUCTOR$4) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance$2(this, PromisePrototype);
	    aCallable$3(executor);
	    call$9(Internal, this);
	    var state = getInternalPromiseState(this);
	    try {
	      executor(bind$4(internalResolve, state), bind$4(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromisePrototype = PromiseConstructor.prototype;

	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState$3(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };

	  // `Promise.prototype.then` method
	  // https://tc39.es/ecma262/#sec-promise.prototype.then
	  Internal.prototype = defineBuiltIn$2(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
	    var state = getInternalPromiseState(this);
	    var reaction = newPromiseCapability$1(speciesConstructor$1(this, PromiseConstructor));
	    state.parent = true;
	    reaction.ok = isCallable$2(onFulfilled) ? onFulfilled : true;
	    reaction.fail = isCallable$2(onRejected) && onRejected;
	    reaction.domain = IS_NODE ? process.domain : undefined;
	    if (state.state == PENDING) state.reactions.add(reaction);
	    else microtask(function () {
	      callReaction(reaction, state);
	    });
	    return reaction.promise;
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalPromiseState(promise);
	    this.promise = promise;
	    this.resolve = bind$4(internalResolve, state);
	    this.reject = bind$4(internalReject, state);
	  };

	  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable$2(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
	    nativeThen = NativePromisePrototype$1.then;

	    if (!NATIVE_PROMISE_SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      defineBuiltIn$2(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call$9(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype$1.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf$6) {
	      setPrototypeOf$6(NativePromisePrototype$1, PromisePrototype);
	    }
	  }
	}

	$$i({ global: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag$3(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	var wellKnownSymbol$7 = wellKnownSymbol$p;
	var Iterators$1 = iterators;

	var ITERATOR$5 = wellKnownSymbol$7('iterator');
	var ArrayPrototype$4 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$2 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype$4[ITERATOR$5] === it);
	};

	var classof$2 = classof$b;
	var getMethod$2 = getMethod$6;
	var Iterators = iterators;
	var wellKnownSymbol$6 = wellKnownSymbol$p;

	var ITERATOR$4 = wellKnownSymbol$6('iterator');

	var getIteratorMethod$9 = function (it) {
	  if (it != undefined) return getMethod$2(it, ITERATOR$4)
	    || getMethod$2(it, '@@iterator')
	    || Iterators[classof$2(it)];
	};

	var global$b = global$V;
	var call$8 = functionCall;
	var aCallable$2 = aCallable$7;
	var anObject$6 = anObject$j;
	var tryToString$1 = tryToString$4;
	var getIteratorMethod$8 = getIteratorMethod$9;

	var TypeError$6 = global$b.TypeError;

	var getIterator$3 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$8(argument) : usingIterator;
	  if (aCallable$2(iteratorMethod)) return anObject$6(call$8(iteratorMethod, argument));
	  throw TypeError$6(tryToString$1(argument) + ' is not iterable');
	};

	var call$7 = functionCall;
	var anObject$5 = anObject$j;
	var getMethod$1 = getMethod$6;

	var iteratorClose$2 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$5(iterator);
	  try {
	    innerResult = getMethod$1(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$7(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$5(innerResult);
	  return value;
	};

	var global$a = global$V;
	var bind$3 = functionBindContext;
	var call$6 = functionCall;
	var anObject$4 = anObject$j;
	var tryToString = tryToString$4;
	var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
	var lengthOfArrayLike$2 = lengthOfArrayLike$7;
	var isPrototypeOf$6 = objectIsPrototypeOf;
	var getIterator$2 = getIterator$3;
	var getIteratorMethod$7 = getIteratorMethod$9;
	var iteratorClose$1 = iteratorClose$2;

	var TypeError$5 = global$a.TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$2 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$3(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose$1(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$4(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod$7(iterable);
	    if (!iterFn) throw TypeError$5(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod$1(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$2(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$6(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator$2(iterable, iterFn);
	  }

	  next = iterator.next;
	  while (!(step = call$6(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose$1(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf$6(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var wellKnownSymbol$5 = wellKnownSymbol$p;

	var ITERATOR$3 = wellKnownSymbol$5('iterator');
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
	  iteratorWithReturn[ITERATOR$3] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$3] = function () {
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

	var NativePromiseConstructor$1 = promiseNativeConstructor;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
	var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

	var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function (iterable) {
	  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
	});

	var $$h = _export;
	var call$5 = functionCall;
	var aCallable$1 = aCallable$7;
	var newPromiseCapabilityModule$2 = newPromiseCapability$2;
	var perform$1 = perform$3;
	var iterate$1 = iterate$2;
	var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	$$h({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$2.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var $promiseResolve = aCallable$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$5($promiseResolve, C, promise).then(function (value) {
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
	  }
	});

	var $$g = _export;
	var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
	var NativePromiseConstructor = promiseNativeConstructor;
	var getBuiltIn$2 = getBuiltIn$a;
	var isCallable$1 = isCallable$p;
	var defineBuiltIn$1 = defineBuiltIn$a;

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	$$g({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if (isCallable$1(NativePromiseConstructor)) {
	  var method$4 = getBuiltIn$2('Promise').prototype['catch'];
	  if (NativePromisePrototype['catch'] !== method$4) {
	    defineBuiltIn$1(NativePromisePrototype, 'catch', method$4, { unsafe: true });
	  }
	}

	var $$f = _export;
	var call$4 = functionCall;
	var aCallable = aCallable$7;
	var newPromiseCapabilityModule$1 = newPromiseCapability$2;
	var perform = perform$3;
	var iterate = iterate$2;
	var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	$$f({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$1.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      iterate(iterable, function (promise) {
	        call$4($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$e = _export;
	var call$3 = functionCall;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	$$e({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapabilityModule.f(this);
	    call$3(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	var anObject$3 = anObject$j;
	var isObject$2 = isObject$d;
	var newPromiseCapability = newPromiseCapability$2;

	var promiseResolve$1 = function (C, x) {
	  anObject$3(C);
	  if (isObject$2(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var $$d = _export;
	var getBuiltIn$1 = getBuiltIn$a;
	var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
	var promiseResolve = promiseResolve$1;

	getBuiltIn$1('Promise');

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	$$d({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	var charAt$2 = stringMultibyte.charAt;
	var toString$4 = toString$b;
	var InternalStateModule$2 = internalState;
	var defineIterator = defineIterator$2;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState = InternalStateModule$2.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: toString$4(iterated),
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
	  point = charAt$2(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var global$9 = global$V;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty = createNonEnumerableProperty$8;
	var wellKnownSymbol$4 = wellKnownSymbol$p;

	var ITERATOR$2 = wellKnownSymbol$4('iterator');
	var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  handlePrototype(global$9[COLLECTION_NAME] && global$9[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}

	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	var map$3 = {exports: {}};

	var $$c = _export$1;
	var $map = arrayIteration$1.map;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$c({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$5 = entryVirtual$a;

	var map$2 = entryVirtual$5('Array').map;

	var isPrototypeOf$5 = objectIsPrototypeOf$1;
	var method$3 = map$2;

	var ArrayPrototype$3 = Array.prototype;

	var map$1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$3 || (isPrototypeOf$5(ArrayPrototype$3, it) && own === ArrayPrototype$3.map) ? method$3 : own;
	};

	var parent$q = map$1;

	var map = parent$q;

	(function (module) {
		module.exports = map;
	} (map$3));

	var _mapInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(map$3.exports);

	var promise = {exports: {}};

	(function (module) {
		module.exports = promise$4;
	} (promise));

	var _Promise = /*@__PURE__*/getDefaultExportFromCjs(promise.exports);

	var url$2 = {exports: {}};

	var fails$3 = fails$I;
	var wellKnownSymbol$3 = wellKnownSymbol$I;
	var IS_PURE = isPure;

	var ITERATOR$1 = wellKnownSymbol$3('iterator');

	var nativeUrl = !fails$3(function () {
	  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
	  var url = new URL('b?a=1&b=2&c=3', 'http://a');
	  var searchParams = url.searchParams;
	  var result = '';
	  url.pathname = 'c%20d';
	  searchParams.forEach(function (value, key) {
	    searchParams['delete']('b');
	    result += key + value;
	  });
	  return (IS_PURE && !url.toJSON)
	    || !searchParams.sort
	    || url.href !== 'http://a/c%20d?a=1&c=3'
	    || searchParams.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !searchParams[ITERATOR$1]
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

	var anObject$2 = anObject$u;
	var iteratorClose = iteratorClose$4;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$2(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose(iterator, 'throw', error);
	  }
	};

	var global$8 = global$1y;
	var bind$2 = functionBindContext$1;
	var call$2 = functionCall$1;
	var toObject = toObject$e;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
	var isArrayIteratorMethod = isArrayIteratorMethod$4;
	var isConstructor = isConstructor$7;
	var lengthOfArrayLike$1 = lengthOfArrayLike$d;
	var createProperty$2 = createProperty$8;
	var getIterator$1 = getIterator$5;
	var getIteratorMethod$6 = getIteratorMethod$c;

	var Array$2 = global$8.Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind$2(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod$6(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this == Array$2 && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = getIterator$1(O, iteratorMethod);
	    next = iterator.next;
	    result = IS_CONSTRUCTOR ? new this() : [];
	    for (;!(step = call$2(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty$2(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike$1(O);
	    result = IS_CONSTRUCTOR ? new this(length) : Array$2(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty$2(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var global$7 = global$1y;
	var uncurryThis$9 = functionUncurryThis$1;

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

	var RangeError$1 = global$7.RangeError;
	var exec$2 = uncurryThis$9(regexSeparators.exec);
	var floor$2 = Math.floor;
	var fromCharCode = String.fromCharCode;
	var charCodeAt$1 = uncurryThis$9(''.charCodeAt);
	var join$2 = uncurryThis$9([].join);
	var push$4 = uncurryThis$9([].push);
	var replace$4 = uncurryThis$9(''.replace);
	var split$2 = uncurryThis$9(''.split);
	var toLowerCase$1 = uncurryThis$9(''.toLowerCase);

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
	    var value = charCodeAt$1(string, counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      var extra = charCodeAt$1(string, counter++);
	      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
	        push$4(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        push$4(output, value);
	        counter--;
	      }
	    } else {
	      push$4(output, value);
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
	  while (delta > baseMinusTMin * tMax >> 1) {
	    delta = floor$2(delta / baseMinusTMin);
	    k += base;
	  }
	  return floor$2(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 */
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
	      push$4(output, fromCharCode(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    push$4(output, delimiter);
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
	      throw RangeError$1(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw RangeError$1(OVERFLOW_ERROR);
	      }
	      if (currentValue == n) {
	        // Represent delta as a generalized variable-length integer.
	        var q = delta;
	        var k = base;
	        while (true) {
	          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          push$4(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$2(qMinusT / baseMinusT);
	          k += base;
	        }

	        push$4(output, fromCharCode(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	        delta = 0;
	        handledCPCount++;
	      }
	    }

	    delta++;
	    n++;
	  }
	  return join$2(output, '');
	};

	var stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = split$2(replace$4(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    push$4(encoded, exec$2(regexNonASCII, label) ? 'xn--' + encode(label) : label);
	  }
	  return join$2(encoded, '.');
	};

	var arraySlice$3 = arraySliceSimple$1;

	var floor$1 = Math.floor;

	var mergeSort = function (array, comparefn) {
	  var length = array.length;
	  var middle = floor$1(length / 2);
	  return length < 8 ? insertionSort(array, comparefn) : merge(
	    array,
	    mergeSort(arraySlice$3(array, 0, middle), comparefn),
	    mergeSort(arraySlice$3(array, middle), comparefn),
	    comparefn
	  );
	};

	var insertionSort = function (array, comparefn) {
	  var length = array.length;
	  var i = 1;
	  var element, j;

	  while (i < length) {
	    j = i;
	    element = array[i];
	    while (j && comparefn(array[j - 1], element) > 0) {
	      array[j] = array[--j];
	    }
	    if (j !== i++) array[j] = element;
	  } return array;
	};

	var merge = function (array, left, right, comparefn) {
	  var llength = left.length;
	  var rlength = right.length;
	  var lindex = 0;
	  var rindex = 0;

	  while (lindex < llength || rindex < rlength) {
	    array[lindex + rindex] = (lindex < llength && rindex < rlength)
	      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	      : lindex < llength ? left[lindex++] : right[rindex++];
	  } return array;
	};

	var arraySort$1 = mergeSort;

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$b = _export$1;
	var global$6 = global$1y;
	var getBuiltIn = getBuiltIn$l;
	var call$1 = functionCall$1;
	var uncurryThis$8 = functionUncurryThis$1;
	var USE_NATIVE_URL$1 = nativeUrl;
	var redefine$1 = redefine$6;
	var redefineAll = redefineAll$2;
	var setToStringTag$2 = setToStringTag$b;
	var createIteratorConstructor = createIteratorConstructor$4;
	var InternalStateModule$1 = internalState$1;
	var anInstance$1 = anInstance$5;
	var isCallable = isCallable$H;
	var hasOwn$2 = hasOwnProperty_1$1;
	var bind$1 = functionBindContext$1;
	var classof$1 = classof$k;
	var anObject$1 = anObject$u;
	var isObject$1 = isObject$p;
	var $toString$1 = toString$i;
	var create$6 = objectCreate$1;
	var createPropertyDescriptor$1 = createPropertyDescriptor$d;
	var getIterator = getIterator$5;
	var getIteratorMethod$5 = getIteratorMethod$c;
	var wellKnownSymbol$2 = wellKnownSymbol$I;
	var arraySort = arraySort$1;

	var ITERATOR = wellKnownSymbol$2('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);

	var n$Fetch = getBuiltIn('fetch');
	var N$Request = getBuiltIn('Request');
	var Headers = getBuiltIn('Headers');
	var RequestPrototype = N$Request && N$Request.prototype;
	var HeadersPrototype = Headers && Headers.prototype;
	var RegExp$1 = global$6.RegExp;
	var TypeError$4 = global$6.TypeError;
	var decodeURIComponent$1 = global$6.decodeURIComponent;
	var encodeURIComponent$1 = global$6.encodeURIComponent;
	var charAt$1 = uncurryThis$8(''.charAt);
	var join$1 = uncurryThis$8([].join);
	var push$3 = uncurryThis$8([].push);
	var replace$3 = uncurryThis$8(''.replace);
	var shift$1 = uncurryThis$8([].shift);
	var splice = uncurryThis$8([].splice);
	var split$1 = uncurryThis$8(''.split);
	var stringSlice$2 = uncurryThis$8(''.slice);

	var plus = /\+/g;
	var sequences = Array(4);

	var percentSequence = function (bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};

	var percentDecode = function (sequence) {
	  try {
	    return decodeURIComponent$1(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};

	var deserialize = function (it) {
	  var result = replace$3(it, plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent$1(result);
	  } catch (error) {
	    while (bytes) {
	      result = replace$3(result, percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};

	var find$4 = /[!'()~]|%20/g;

	var replacements = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};

	var replacer = function (match) {
	  return replacements[match];
	};

	var serialize = function (it) {
	  return replace$3(encodeURIComponent$1(it), find$4, replacer);
	};

	var validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw TypeError$4('Not enough arguments');
	};

	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState$1(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    iterator: getIterator(getInternalParamsState(params).entries),
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
	}, true);

	var URLSearchParamsState = function (init) {
	  this.entries = [];
	  this.url = null;

	  if (init !== undefined) {
	    if (isObject$1(init)) this.parseObject(init);
	    else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$2(init, 1) : init : $toString$1(init));
	  }
	};

	URLSearchParamsState.prototype = {
	  type: URL_SEARCH_PARAMS,
	  bindURL: function (url) {
	    this.url = url;
	    this.update();
	  },
	  parseObject: function (object) {
	    var iteratorMethod = getIteratorMethod$5(object);
	    var iterator, next, step, entryIterator, entryNext, first, second;

	    if (iteratorMethod) {
	      iterator = getIterator(object, iteratorMethod);
	      next = iterator.next;
	      while (!(step = call$1(next, iterator)).done) {
	        entryIterator = getIterator(anObject$1(step.value));
	        entryNext = entryIterator.next;
	        if (
	          (first = call$1(entryNext, entryIterator)).done ||
	          (second = call$1(entryNext, entryIterator)).done ||
	          !call$1(entryNext, entryIterator).done
	        ) throw TypeError$4('Expected sequence with length 2');
	        push$3(this.entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
	      }
	    } else for (var key in object) if (hasOwn$2(object, key)) {
	      push$3(this.entries, { key: key, value: $toString$1(object[key]) });
	    }
	  },
	  parseQuery: function (query) {
	    if (query) {
	      var attributes = split$1(query, '&');
	      var index = 0;
	      var attribute, entry;
	      while (index < attributes.length) {
	        attribute = attributes[index++];
	        if (attribute.length) {
	          entry = split$1(attribute, '=');
	          push$3(this.entries, {
	            key: deserialize(shift$1(entry)),
	            value: deserialize(join$1(entry, '='))
	          });
	        }
	      }
	    }
	  },
	  serialize: function () {
	    var entries = this.entries;
	    var result = [];
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      push$3(result, serialize(entry.key) + '=' + serialize(entry.value));
	    } return join$1(result, '&');
	  },
	  update: function () {
	    this.entries.length = 0;
	    this.parseQuery(this.url.query);
	  },
	  updateURL: function () {
	    if (this.url) this.url.update();
	  }
	};

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
	  anInstance$1(this, URLSearchParamsPrototype);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  setInternalState$1(this, new URLSearchParamsState(init));
	};

	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

	redefineAll(URLSearchParamsPrototype, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    validateArgumentsLength(arguments.length, 2);
	    var state = getInternalParamsState(this);
	    push$3(state.entries, { key: $toString$1(name), value: $toString$1(value) });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name) {
	    validateArgumentsLength(arguments.length, 1);
	    var state = getInternalParamsState(this);
	    var entries = state.entries;
	    var key = $toString$1(name);
	    var index = 0;
	    while (index < entries.length) {
	      if (entries[index].key === key) splice(entries, index, 1);
	      else index++;
	    }
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = $toString$1(name);
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
	    var key = $toString$1(name);
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) push$3(result, entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name) {
	    validateArgumentsLength(arguments.length, 1);
	    var entries = getInternalParamsState(this).entries;
	    var key = $toString$1(name);
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
	    var key = $toString$1(name);
	    var val = $toString$1(value);
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) splice(entries, index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) push$3(entries, { key: key, value: val });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    arraySort(state.entries, function (a, b) {
	      return a.key > b.key ? 1 : -1;
	    });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = bind$1(callback, arguments.length > 1 ? arguments[1] : undefined);
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
	redefine$1(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	redefine$1(URLSearchParamsPrototype, 'toString', function toString() {
	  return getInternalParamsState(this).serialize();
	}, { enumerable: true });

	setToStringTag$2(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	$$b({ global: true, forced: !USE_NATIVE_URL$1 }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
	if (!USE_NATIVE_URL$1 && isCallable(Headers)) {
	  var headersHas = uncurryThis$8(HeadersPrototype.has);
	  var headersSet = uncurryThis$8(HeadersPrototype.set);

	  var wrapRequestOptions = function (init) {
	    if (isObject$1(init)) {
	      var body = init.body;
	      var headers;
	      if (classof$1(body) === URL_SEARCH_PARAMS) {
	        headers = init.headers ? new Headers(init.headers) : new Headers();
	        if (!headersHas(headers, 'content-type')) {
	          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	        return create$6(init, {
	          body: createPropertyDescriptor$1(0, $toString$1(body)),
	          headers: createPropertyDescriptor$1(0, headers)
	        });
	      }
	    } return init;
	  };

	  if (isCallable(n$Fetch)) {
	    $$b({ global: true, enumerable: true, forced: true }, {
	      fetch: function fetch(input /* , init */) {
	        return n$Fetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	      }
	    });
	  }

	  if (isCallable(N$Request)) {
	    var RequestConstructor = function Request(input /* , init */) {
	      anInstance$1(this, RequestPrototype);
	      return new N$Request(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	    };

	    RequestPrototype.constructor = RequestConstructor;
	    RequestConstructor.prototype = RequestPrototype;

	    $$b({ global: true, forced: true }, {
	      Request: RequestConstructor
	    });
	  }
	}

	var web_urlSearchParams = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$a = _export$1;
	var DESCRIPTORS$3 = descriptors$1;
	var USE_NATIVE_URL = nativeUrl;
	var global$5 = global$1y;
	var bind = functionBindContext$1;
	var uncurryThis$7 = functionUncurryThis$1;
	var defineProperties = objectDefineProperties$1.f;
	var redefine = redefine$6;
	var anInstance = anInstance$5;
	var hasOwn$1 = hasOwnProperty_1$1;
	var assign = objectAssign;
	var arrayFrom = arrayFrom$1;
	var arraySlice$2 = arraySliceSimple$1;
	var codeAt = stringMultibyte$1.codeAt;
	var toASCII = stringPunycodeToAscii;
	var $toString = toString$i;
	var setToStringTag$1 = setToStringTag$b;
	var URLSearchParamsModule = web_urlSearchParams;
	var InternalStateModule = internalState$1;

	var setInternalState = InternalStateModule.set;
	var getInternalURLState = InternalStateModule.getterFor('URL');
	var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
	var getInternalSearchParamsState = URLSearchParamsModule.getState;

	var NativeURL = global$5.URL;
	var TypeError$3 = global$5.TypeError;
	var parseInt$1 = global$5.parseInt;
	var floor = Math.floor;
	var pow = Math.pow;
	var charAt = uncurryThis$7(''.charAt);
	var exec$1 = uncurryThis$7(/./.exec);
	var join = uncurryThis$7([].join);
	var numberToString = uncurryThis$7(1.0.toString);
	var pop = uncurryThis$7([].pop);
	var push$2 = uncurryThis$7([].push);
	var replace$2 = uncurryThis$7(''.replace);
	var shift = uncurryThis$7([].shift);
	var split = uncurryThis$7(''.split);
	var stringSlice$1 = uncurryThis$7(''.slice);
	var toLowerCase = uncurryThis$7(''.toLowerCase);
	var unshift = uncurryThis$7([].unshift);

	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';

	var ALPHA = /[a-z]/i;
	// eslint-disable-next-line regexp/no-obscure-range -- safe
	var ALPHANUMERIC = /[\d+-.a-z]/i;
	var DIGIT = /\d/;
	var HEX_START = /^0x/i;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\da-f]+$/i;
	/* eslint-disable regexp/no-control-character -- safe */
	var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
	var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
	var TAB_AND_NEW_LINE = /[\t\n\r]/g;
	/* eslint-enable regexp/no-control-character -- safe */
	var EOF;

	// https://url.spec.whatwg.org/#ipv4-number-parser
	var parseIPv4 = function (input) {
	  var parts = split(input, '.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] == '') {
	    parts.length--;
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return input;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part == '') return input;
	    radix = 10;
	    if (part.length > 1 && charAt(part, 0) == '0') {
	      radix = exec$1(HEX_START, part) ? 16 : 8;
	      part = stringSlice$1(part, radix == 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!exec$1(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
	      number = parseInt$1(part, radix);
	    }
	    push$2(numbers, number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index == partsLength - 1) {
	      if (number >= pow(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = pop(numbers);
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow(256, 3 - index);
	  }
	  return ipv4;
	};

	// https://url.spec.whatwg.org/#concept-ipv6-parser
	// eslint-disable-next-line max-statements -- TODO
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

	  var chr = function () {
	    return charAt(input, pointer);
	  };

	  if (chr() == ':') {
	    if (charAt(input, 1) != ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (chr()) {
	    if (pieceIndex == 8) return;
	    if (chr() == ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && exec$1(HEX, chr())) {
	      value = value * 16 + parseInt$1(chr(), 16);
	      pointer++;
	      length++;
	    }
	    if (chr() == '.') {
	      if (length == 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (chr()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (chr() == '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!exec$1(DIGIT, chr())) return;
	        while (exec$1(DIGIT, chr())) {
	          number = parseInt$1(chr(), 10);
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
	    } else if (chr() == ':') {
	      pointer++;
	      if (!chr()) return;
	    } else if (chr()) return;
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

	// https://url.spec.whatwg.org/#host-serializing
	var serializeHost = function (host) {
	  var result, index, compress, ignore0;
	  // ipv4
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      unshift(result, host % 256);
	      host = floor(host / 256);
	    } return join(result, '.');
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
	        result += numberToString(host[index], 16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  } return host;
	};

	var C0ControlPercentEncodeSet = {};
	var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1
	});
	var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});

	var percentEncode = function (chr, set) {
	  var code = codeAt(chr, 0);
	  return code > 0x20 && code < 0x7F && !hasOwn$1(set, chr) ? chr : encodeURIComponent(chr);
	};

	// https://url.spec.whatwg.org/#special-scheme
	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	// https://url.spec.whatwg.org/#windows-drive-letter
	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length == 2 && exec$1(ALPHA, charAt(string, 0))
	    && ((second = charAt(string, 1)) == ':' || (!normalized && second == '|'));
	};

	// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(stringSlice$1(string, 0, 2)) && (
	    string.length == 2 ||
	    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};

	// https://url.spec.whatwg.org/#single-dot-path-segment
	var isSingleDot = function (segment) {
	  return segment === '.' || toLowerCase(segment) === '%2e';
	};

	// https://url.spec.whatwg.org/#double-dot-path-segment
	var isDoubleDot = function (segment) {
	  segment = toLowerCase(segment);
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

	var URLState = function (url, isBase, base) {
	  var urlString = $toString(url);
	  var baseState, failure, searchParams;
	  if (isBase) {
	    failure = this.parse(urlString);
	    if (failure) throw TypeError$3(failure);
	    this.searchParams = null;
	  } else {
	    if (base !== undefined) baseState = new URLState(base, true);
	    failure = this.parse(urlString, null, baseState);
	    if (failure) throw TypeError$3(failure);
	    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
	    searchParams.bindURL(this);
	    this.searchParams = searchParams;
	  }
	};

	URLState.prototype = {
	  type: 'URL',
	  // https://url.spec.whatwg.org/#url-parsing
	  // eslint-disable-next-line max-statements -- TODO
	  parse: function (input, stateOverride, base) {
	    var url = this;
	    var state = stateOverride || SCHEME_START;
	    var pointer = 0;
	    var buffer = '';
	    var seenAt = false;
	    var seenBracket = false;
	    var seenPasswordToken = false;
	    var codePoints, chr, bufferCodePoints, failure;

	    input = $toString(input);

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
	      input = replace$2(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
	    }

	    input = replace$2(input, TAB_AND_NEW_LINE, '');

	    codePoints = arrayFrom(input);

	    while (pointer <= codePoints.length) {
	      chr = codePoints[pointer];
	      switch (state) {
	        case SCHEME_START:
	          if (chr && exec$1(ALPHA, chr)) {
	            buffer += toLowerCase(chr);
	            state = SCHEME;
	          } else if (!stateOverride) {
	            state = NO_SCHEME;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case SCHEME:
	          if (chr && (exec$1(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
	            buffer += toLowerCase(chr);
	          } else if (chr == ':') {
	            if (stateOverride && (
	              (url.isSpecial() != hasOwn$1(specialSchemes, buffer)) ||
	              (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
	              (url.scheme == 'file' && !url.host)
	            )) return;
	            url.scheme = buffer;
	            if (stateOverride) {
	              if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
	              return;
	            }
	            buffer = '';
	            if (url.scheme == 'file') {
	              state = FILE;
	            } else if (url.isSpecial() && base && base.scheme == url.scheme) {
	              state = SPECIAL_RELATIVE_OR_AUTHORITY;
	            } else if (url.isSpecial()) {
	              state = SPECIAL_AUTHORITY_SLASHES;
	            } else if (codePoints[pointer + 1] == '/') {
	              state = PATH_OR_AUTHORITY;
	              pointer++;
	            } else {
	              url.cannotBeABaseURL = true;
	              push$2(url.path, '');
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
	          if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
	          if (base.cannotBeABaseURL && chr == '#') {
	            url.scheme = base.scheme;
	            url.path = arraySlice$2(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            url.cannotBeABaseURL = true;
	            state = FRAGMENT;
	            break;
	          }
	          state = base.scheme == 'file' ? FILE : RELATIVE;
	          continue;

	        case SPECIAL_RELATIVE_OR_AUTHORITY:
	          if (chr == '/' && codePoints[pointer + 1] == '/') {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	            pointer++;
	          } else {
	            state = RELATIVE;
	            continue;
	          } break;

	        case PATH_OR_AUTHORITY:
	          if (chr == '/') {
	            state = AUTHORITY;
	            break;
	          } else {
	            state = PATH;
	            continue;
	          }

	        case RELATIVE:
	          url.scheme = base.scheme;
	          if (chr == EOF) {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.query = base.query;
	          } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
	            state = RELATIVE_SLASH;
	          } else if (chr == '?') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.query = '';
	            state = QUERY;
	          } else if (chr == '#') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.path.length--;
	            state = PATH;
	            continue;
	          } break;

	        case RELATIVE_SLASH:
	          if (url.isSpecial() && (chr == '/' || chr == '\\')) {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          } else if (chr == '/') {
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
	          if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
	          pointer++;
	          break;

	        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	          if (chr != '/' && chr != '\\') {
	            state = AUTHORITY;
	            continue;
	          } break;

	        case AUTHORITY:
	          if (chr == '@') {
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
	            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
	            (chr == '\\' && url.isSpecial())
	          ) {
	            if (seenAt && buffer == '') return INVALID_AUTHORITY;
	            pointer -= arrayFrom(buffer).length + 1;
	            buffer = '';
	            state = HOST;
	          } else buffer += chr;
	          break;

	        case HOST:
	        case HOSTNAME:
	          if (stateOverride && url.scheme == 'file') {
	            state = FILE_HOST;
	            continue;
	          } else if (chr == ':' && !seenBracket) {
	            if (buffer == '') return INVALID_HOST;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PORT;
	            if (stateOverride == HOSTNAME) return;
	          } else if (
	            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
	            (chr == '\\' && url.isSpecial())
	          ) {
	            if (url.isSpecial() && buffer == '') return INVALID_HOST;
	            if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PATH_START;
	            if (stateOverride) return;
	            continue;
	          } else {
	            if (chr == '[') seenBracket = true;
	            else if (chr == ']') seenBracket = false;
	            buffer += chr;
	          } break;

	        case PORT:
	          if (exec$1(DIGIT, chr)) {
	            buffer += chr;
	          } else if (
	            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
	            (chr == '\\' && url.isSpecial()) ||
	            stateOverride
	          ) {
	            if (buffer != '') {
	              var port = parseInt$1(buffer, 10);
	              if (port > 0xFFFF) return INVALID_PORT;
	              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
	              buffer = '';
	            }
	            if (stateOverride) return;
	            state = PATH_START;
	            continue;
	          } else return INVALID_PORT;
	          break;

	        case FILE:
	          url.scheme = 'file';
	          if (chr == '/' || chr == '\\') state = FILE_SLASH;
	          else if (base && base.scheme == 'file') {
	            if (chr == EOF) {
	              url.host = base.host;
	              url.path = arraySlice$2(base.path);
	              url.query = base.query;
	            } else if (chr == '?') {
	              url.host = base.host;
	              url.path = arraySlice$2(base.path);
	              url.query = '';
	              state = QUERY;
	            } else if (chr == '#') {
	              url.host = base.host;
	              url.path = arraySlice$2(base.path);
	              url.query = base.query;
	              url.fragment = '';
	              state = FRAGMENT;
	            } else {
	              if (!startsWithWindowsDriveLetter(join(arraySlice$2(codePoints, pointer), ''))) {
	                url.host = base.host;
	                url.path = arraySlice$2(base.path);
	                url.shortenPath();
	              }
	              state = PATH;
	              continue;
	            }
	          } else {
	            state = PATH;
	            continue;
	          } break;

	        case FILE_SLASH:
	          if (chr == '/' || chr == '\\') {
	            state = FILE_HOST;
	            break;
	          }
	          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice$2(codePoints, pointer), ''))) {
	            if (isWindowsDriveLetter(base.path[0], true)) push$2(url.path, base.path[0]);
	            else url.host = base.host;
	          }
	          state = PATH;
	          continue;

	        case FILE_HOST:
	          if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
	            if (!stateOverride && isWindowsDriveLetter(buffer)) {
	              state = PATH;
	            } else if (buffer == '') {
	              url.host = '';
	              if (stateOverride) return;
	              state = PATH_START;
	            } else {
	              failure = url.parseHost(buffer);
	              if (failure) return failure;
	              if (url.host == 'localhost') url.host = '';
	              if (stateOverride) return;
	              buffer = '';
	              state = PATH_START;
	            } continue;
	          } else buffer += chr;
	          break;

	        case PATH_START:
	          if (url.isSpecial()) {
	            state = PATH;
	            if (chr != '/' && chr != '\\') continue;
	          } else if (!stateOverride && chr == '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (!stateOverride && chr == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr != EOF) {
	            state = PATH;
	            if (chr != '/') continue;
	          } break;

	        case PATH:
	          if (
	            chr == EOF || chr == '/' ||
	            (chr == '\\' && url.isSpecial()) ||
	            (!stateOverride && (chr == '?' || chr == '#'))
	          ) {
	            if (isDoubleDot(buffer)) {
	              url.shortenPath();
	              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
	                push$2(url.path, '');
	              }
	            } else if (isSingleDot(buffer)) {
	              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
	                push$2(url.path, '');
	              }
	            } else {
	              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	                if (url.host) url.host = '';
	                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
	              }
	              push$2(url.path, buffer);
	            }
	            buffer = '';
	            if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
	              while (url.path.length > 1 && url.path[0] === '') {
	                shift(url.path);
	              }
	            }
	            if (chr == '?') {
	              url.query = '';
	              state = QUERY;
	            } else if (chr == '#') {
	              url.fragment = '';
	              state = FRAGMENT;
	            }
	          } else {
	            buffer += percentEncode(chr, pathPercentEncodeSet);
	          } break;

	        case CANNOT_BE_A_BASE_URL_PATH:
	          if (chr == '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (chr == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr != EOF) {
	            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case QUERY:
	          if (!stateOverride && chr == '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr != EOF) {
	            if (chr == "'" && url.isSpecial()) url.query += '%27';
	            else if (chr == '#') url.query += '%23';
	            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case FRAGMENT:
	          if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
	          break;
	      }

	      pointer++;
	    }
	  },
	  // https://url.spec.whatwg.org/#host-parsing
	  parseHost: function (input) {
	    var result, codePoints, index;
	    if (charAt(input, 0) == '[') {
	      if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
	      result = parseIPv6(stringSlice$1(input, 1, -1));
	      if (!result) return INVALID_HOST;
	      this.host = result;
	    // opaque host
	    } else if (!this.isSpecial()) {
	      if (exec$1(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
	      result = '';
	      codePoints = arrayFrom(input);
	      for (index = 0; index < codePoints.length; index++) {
	        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	      }
	      this.host = result;
	    } else {
	      input = toASCII(input);
	      if (exec$1(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
	      result = parseIPv4(input);
	      if (result === null) return INVALID_HOST;
	      this.host = result;
	    }
	  },
	  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
	  cannotHaveUsernamePasswordPort: function () {
	    return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
	  },
	  // https://url.spec.whatwg.org/#include-credentials
	  includesCredentials: function () {
	    return this.username != '' || this.password != '';
	  },
	  // https://url.spec.whatwg.org/#is-special
	  isSpecial: function () {
	    return hasOwn$1(specialSchemes, this.scheme);
	  },
	  // https://url.spec.whatwg.org/#shorten-a-urls-path
	  shortenPath: function () {
	    var path = this.path;
	    var pathSize = path.length;
	    if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
	      path.length--;
	    }
	  },
	  // https://url.spec.whatwg.org/#concept-url-serializer
	  serialize: function () {
	    var url = this;
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
	      if (url.includesCredentials()) {
	        output += username + (password ? ':' + password : '') + '@';
	      }
	      output += serializeHost(host);
	      if (port !== null) output += ':' + port;
	    } else if (scheme == 'file') output += '//';
	    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
	    if (query !== null) output += '?' + query;
	    if (fragment !== null) output += '#' + fragment;
	    return output;
	  },
	  // https://url.spec.whatwg.org/#dom-url-href
	  setHref: function (href) {
	    var failure = this.parse(href);
	    if (failure) throw TypeError$3(failure);
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-origin
	  getOrigin: function () {
	    var scheme = this.scheme;
	    var port = this.port;
	    if (scheme == 'blob') try {
	      return new URLConstructor(scheme.path[0]).origin;
	    } catch (error) {
	      return 'null';
	    }
	    if (scheme == 'file' || !this.isSpecial()) return 'null';
	    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
	  },
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  getProtocol: function () {
	    return this.scheme + ':';
	  },
	  setProtocol: function (protocol) {
	    this.parse($toString(protocol) + ':', SCHEME_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-username
	  getUsername: function () {
	    return this.username;
	  },
	  setUsername: function (username) {
	    var codePoints = arrayFrom($toString(username));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.username = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-password
	  getPassword: function () {
	    return this.password;
	  },
	  setPassword: function (password) {
	    var codePoints = arrayFrom($toString(password));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.password = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-host
	  getHost: function () {
	    var host = this.host;
	    var port = this.port;
	    return host === null ? ''
	      : port === null ? serializeHost(host)
	      : serializeHost(host) + ':' + port;
	  },
	  setHost: function (host) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(host, HOST);
	  },
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  getHostname: function () {
	    var host = this.host;
	    return host === null ? '' : serializeHost(host);
	  },
	  setHostname: function (hostname) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(hostname, HOSTNAME);
	  },
	  // https://url.spec.whatwg.org/#dom-url-port
	  getPort: function () {
	    var port = this.port;
	    return port === null ? '' : $toString(port);
	  },
	  setPort: function (port) {
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    port = $toString(port);
	    if (port == '') this.port = null;
	    else this.parse(port, PORT);
	  },
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  getPathname: function () {
	    var path = this.path;
	    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
	  },
	  setPathname: function (pathname) {
	    if (this.cannotBeABaseURL) return;
	    this.path = [];
	    this.parse(pathname, PATH_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-search
	  getSearch: function () {
	    var query = this.query;
	    return query ? '?' + query : '';
	  },
	  setSearch: function (search) {
	    search = $toString(search);
	    if (search == '') {
	      this.query = null;
	    } else {
	      if ('?' == charAt(search, 0)) search = stringSlice$1(search, 1);
	      this.query = '';
	      this.parse(search, QUERY);
	    }
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  getSearchParams: function () {
	    return this.searchParams.facade;
	  },
	  // https://url.spec.whatwg.org/#dom-url-hash
	  getHash: function () {
	    var fragment = this.fragment;
	    return fragment ? '#' + fragment : '';
	  },
	  setHash: function (hash) {
	    hash = $toString(hash);
	    if (hash == '') {
	      this.fragment = null;
	      return;
	    }
	    if ('#' == charAt(hash, 0)) hash = stringSlice$1(hash, 1);
	    this.fragment = '';
	    this.parse(hash, FRAGMENT);
	  },
	  update: function () {
	    this.query = this.searchParams.serialize() || null;
	  }
	};

	// `URL` constructor
	// https://url.spec.whatwg.org/#url-class
	var URLConstructor = function URL(url /* , base */) {
	  var that = anInstance(this, URLPrototype);
	  var base = arguments.length > 1 ? arguments[1] : undefined;
	  var state = setInternalState(that, new URLState(url, false, base));
	  if (!DESCRIPTORS$3) {
	    that.href = state.serialize();
	    that.origin = state.getOrigin();
	    that.protocol = state.getProtocol();
	    that.username = state.getUsername();
	    that.password = state.getPassword();
	    that.host = state.getHost();
	    that.hostname = state.getHostname();
	    that.port = state.getPort();
	    that.pathname = state.getPathname();
	    that.search = state.getSearch();
	    that.searchParams = state.getSearchParams();
	    that.hash = state.getHash();
	  }
	};

	var URLPrototype = URLConstructor.prototype;

	var accessorDescriptor = function (getter, setter) {
	  return {
	    get: function () {
	      return getInternalURLState(this)[getter]();
	    },
	    set: setter && function (value) {
	      return getInternalURLState(this)[setter](value);
	    },
	    configurable: true,
	    enumerable: true
	  };
	};

	if (DESCRIPTORS$3) {
	  defineProperties(URLPrototype, {
	    // `URL.prototype.href` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-href
	    href: accessorDescriptor('serialize', 'setHref'),
	    // `URL.prototype.origin` getter
	    // https://url.spec.whatwg.org/#dom-url-origin
	    origin: accessorDescriptor('getOrigin'),
	    // `URL.prototype.protocol` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-protocol
	    protocol: accessorDescriptor('getProtocol', 'setProtocol'),
	    // `URL.prototype.username` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-username
	    username: accessorDescriptor('getUsername', 'setUsername'),
	    // `URL.prototype.password` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-password
	    password: accessorDescriptor('getPassword', 'setPassword'),
	    // `URL.prototype.host` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-host
	    host: accessorDescriptor('getHost', 'setHost'),
	    // `URL.prototype.hostname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hostname
	    hostname: accessorDescriptor('getHostname', 'setHostname'),
	    // `URL.prototype.port` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-port
	    port: accessorDescriptor('getPort', 'setPort'),
	    // `URL.prototype.pathname` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-pathname
	    pathname: accessorDescriptor('getPathname', 'setPathname'),
	    // `URL.prototype.search` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-search
	    search: accessorDescriptor('getSearch', 'setSearch'),
	    // `URL.prototype.searchParams` getter
	    // https://url.spec.whatwg.org/#dom-url-searchparams
	    searchParams: accessorDescriptor('getSearchParams'),
	    // `URL.prototype.hash` accessors pair
	    // https://url.spec.whatwg.org/#dom-url-hash
	    hash: accessorDescriptor('getHash', 'setHash')
	  });
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	redefine(URLPrototype, 'toJSON', function toJSON() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	redefine(URLPrototype, 'toString', function toString() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
	}

	setToStringTag$1(URLConstructor, 'URL');

	$$a({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$3 }, {
	  URL: URLConstructor
	});

	var path$6 = path$j;

	var url$1 = path$6.URL;

	var parent$p = url$1;

	var url = parent$p;

	(function (module) {
		module.exports = url;
	} (url$2));

	var _URL = /*@__PURE__*/getDefaultExportFromCjs(url$2.exports);

	function ownKeys$3(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

	function request(_x, _x2) {
	  return _request.apply(this, arguments);
	}

	function _request() {
	  _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, callback) {
	    var coreUrl, _ref$url, rawUrl, apiKey, qs, _ref$method, method, headers, body, url, key, response, json;

	    return _regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            coreUrl = _ref.coreUrl, _ref$url = _ref.url, rawUrl = _ref$url === void 0 ? '' : _ref$url, apiKey = _ref.apiKey, qs = _ref.qs, _ref$method = _ref.method, method = _ref$method === void 0 ? 'get' : _ref$method, headers = _ref.headers, body = _ref.body;
	            _context.prev = 1;
	            url = new _URL(rawUrl, coreUrl);

	            if (apiKey) {
	              _context.next = 5;
	              break;
	            }

	            throw new Error('`apiKey` needs to be configured, please see README');

	          case 5:
	            for (key in qs) {
	              url.searchParams.append(key, qs[key]);
	            }

	            _context.next = 8;
	            return fetch(String(url), {
	              method: method,
	              body: body,
	              headers: _objectSpread$3({
	                Accept: 'application/json'
	              }, headers, {
	                'X-Api-Key': apiKey
	              }),
	              credentials: 'same-origin'
	            });

	          case 8:
	            response = _context.sent;

	            if (!(response.status >= 200 && response.status < 300 || response.status === 304)) {
	              _context.next = 15;
	              break;
	            }

	            _context.next = 12;
	            return response.json();

	          case 12:
	            json = _context.sent;
	            if (typeof callback === 'function') callback(null, json);
	            return _context.abrupt("return", json);

	          case 15:
	            throw error(new Error('Core API error'), {
	              code: 'CoreAPIError',
	              statusCode: response.status
	            });

	          case 18:
	            _context.prev = 18;
	            _context.t0 = _context["catch"](1);

	            if (!(typeof callback === 'function')) {
	              _context.next = 22;
	              break;
	            }

	            return _context.abrupt("return", callback(_context.t0));

	          case 22:
	            throw _context.t0;

	          case 23:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, null, [[1, 18]]);
	  }));
	  return _request.apply(this, arguments);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var create$5 = {exports: {}};

	var $$9 = _export$1;
	var DESCRIPTORS$2 = descriptors$1;
	var create$4 = objectCreate$1;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	$$9({ target: 'Object', stat: true, sham: !DESCRIPTORS$2 }, {
	  create: create$4
	});

	var path$5 = path$j;

	var Object$1 = path$5.Object;

	var create$3 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var parent$o = create$3;

	var create$2 = parent$o;

	var parent$n = create$2;

	var create$1 = parent$n;

	var parent$m = create$1;

	var create = parent$m;

	(function (module) {
		module.exports = create;
	} (create$5));

	var _Object$create = /*@__PURE__*/getDefaultExportFromCjs(create$5.exports);

	var setPrototypeOf$5 = {exports: {}};

	var $$8 = _export$1;
	var setPrototypeOf$4 = objectSetPrototypeOf$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	$$8({ target: 'Object', stat: true }, {
	  setPrototypeOf: setPrototypeOf$4
	});

	var path$4 = path$j;

	var setPrototypeOf$3 = path$4.Object.setPrototypeOf;

	var parent$l = setPrototypeOf$3;

	var setPrototypeOf$2 = parent$l;

	var parent$k = setPrototypeOf$2;

	var setPrototypeOf$1 = parent$k;

	var parent$j = setPrototypeOf$1;

	var setPrototypeOf = parent$j;

	(function (module) {
		module.exports = setPrototypeOf;
	} (setPrototypeOf$5));

	var _Object$setPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(setPrototypeOf$5.exports);

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
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

	var find$3 = {exports: {}};

	var $$7 = _export$1;
	var $find = arrayIteration$1.find;

	var FIND = 'find';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$7({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$4 = entryVirtual$a;

	var find$2 = entryVirtual$4('Array').find;

	var isPrototypeOf$4 = objectIsPrototypeOf$1;
	var method$2 = find$2;

	var ArrayPrototype$2 = Array.prototype;

	var find$1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype$2 || (isPrototypeOf$4(ArrayPrototype$2, it) && own === ArrayPrototype$2.find) ? method$2 : own;
	};

	var parent$i = find$1;

	var find = parent$i;

	(function (module) {
		module.exports = find;
	} (find$3));

	var _findInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(find$3.exports);

	var microevent = {exports: {}};

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

	(function (module) {
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
	} (microevent));

	var MicroEvent = microevent.exports;

	/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */

	var objectToString = Object.prototype.toString;
	var isArray$6 = Array.isArray || function isArrayPolyfill (object) {
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
	  return isArray$6(obj) ? 'array' : typeof obj;
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

	    if (!isArray$6(tagsToCompile) || tagsToCompile.length !== 2)
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

	  if (isArray$6(value)) {
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
	  if (!value || (isArray$6(value) && value.length === 0))
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
	  if (isArray$6(config)) {
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
	  if (config && typeof config === 'object' && !isArray$6(config)) {
	    return config.escape;
	  }
	  else {
	    return undefined;
	  }
	};

	var mustache = {
	  name: 'mustache.js',
	  version: '4.2.0',
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

	var pairs = {
	  'paged_publication.hotspot_picker.header': 'Which offer did you mean?',
	  'incito_publication.product_picker.header': 'Which product?'
	};
	function t(key, view) {
	  var _pairs$key;

	  var template = (_pairs$key = pairs[key]) != null ? _pairs$key : '';
	  return mustache.render(template, view);
	}

	var ESC = 27;
	var ARROW_RIGHT = 39;
	var ARROW_LEFT = 37;
	var SPACE = 32;
	var NUMBER_ONE = 49;

	var defaultTemplate = "<div class=\"sgn-popover__background\" data-close></div>\n<div class=\"sgn-popover__menu\">\n    {{#header}}\n        <div class=\"sgn-popover__header\">{{header}}</div>\n    {{/header}}\n    <div class=\"sgn-popover__content\">\n        <ul>\n            {{#singleChoiceItems}}\n                <li data-index=\"{{index}}\">\n                    <p class=\"sgn-popover-item__title\">{{item.title}}</p>\n                    {{#item.subtitle}}\n                        <p class=\"sgn-popover-item__subtitle\">{{item.subtitle}}</p>\n                    {{/item.subtitle}}\n                </li>\n            {{/singleChoiceItems}}\n        </ul>\n    </div>\n</div>";

	var Popover = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Popover, _MicroEvent);

	  function Popover(options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _MicroEvent.call(this) || this;
	    _this.el = document.createElement('div');
	    _this.backgroundEl = document.createElement('div');

	    _this.keyUp = function (e) {
	      if (e.keyCode === ESC) _this.destroy();
	    };

	    _this.resize = function () {
	      _this.destroy();
	    };

	    _this.scroll = function () {
	      _this.destroy();
	    };

	    _this.options = options;
	    return _this;
	  }

	  var _proto = Popover.prototype;

	  _proto.render = function render() {
	    var _this$options = this.options,
	        header = _this$options.header,
	        singleChoiceItems = _this$options.singleChoiceItems,
	        template = _this$options.template;
	    this.el.className = 'sgn-popover';
	    this.el.setAttribute('tabindex', -1);
	    this.el.innerHTML = mustache.render(template || defaultTemplate, {
	      header: header,
	      singleChoiceItems: singleChoiceItems == null ? void 0 : _mapInstanceProperty(singleChoiceItems).call(singleChoiceItems, function (item, index) {
	        return {
	          item: item,
	          index: index
	        };
	      })
	    });
	    this.position();
	    this.addEventListeners();
	    return this;
	  };

	  _proto.destroy = function destroy() {
	    off(this.el);
	    window.removeEventListener('resize', this.resize, false);
	    window.removeEventListener('scroll', this.scroll, false);

	    if (this.el.parentNode) {
	      this.el.parentNode.removeChild(this.el);
	      this.trigger('destroyed');
	    }
	  };

	  _proto.position = function position() {
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
	    menuEl.style.top = top + height > parentHeight ? parentHeight - height + 'px' : top + 'px';
	    menuEl.style.left = left + width > parentWidth ? parentWidth - width + 'px' : left + 'px';
	  };

	  _proto.addEventListeners = function addEventListeners() {
	    var _this2 = this;

	    var trigger = this.trigger.bind(this);
	    this.el.addEventListener('keyup', this.keyUp);
	    on(this.el, 'click', '[data-index]', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      trigger('selected', {
	        index: this.dataset.index
	      });
	    });
	    on(this.el, 'click', '[data-close]', function (e) {
	      e.preventDefault();
	      e.stopPropagation();

	      _this2.destroy();
	    });
	    on(this.el, 'click', '.sgn-popover__menu', function (e) {
	      e.stopPropagation();
	    });
	    window.addEventListener('resize', this.resize, false);
	    window.addEventListener('scroll', this.scroll, false);
	  };

	  return _createClass(Popover);
	}(MicroEvent);

	function singleChoicePopover(_ref, callback) {
	  var items = _ref.items,
	      el = _ref.el,
	      header = _ref.header,
	      x = _ref.x,
	      y = _ref.y;
	  var popover = null;

	  if (items.length === 1) {
	    callback(items[0]);
	  } else if (items.length > 1) {
	    popover = new Popover({
	      header: header,
	      x: x,
	      y: y,
	      singleChoiceItems: items
	    });
	    popover.bind('selected', function (e) {
	      callback(items[e.index]);
	      popover.destroy();
	    });
	    popover.bind('destroyed', function () {
	      el.focus();
	    });
	    el.appendChild(popover.el);
	    popover.render().el.focus();
	  }

	  return {
	    destroy: function destroy() {
	      var _popover;

	      (_popover = popover) == null ? void 0 : _popover.destroy();
	    }
	  };
	}

	var visibilityClassName = 'sgn-pp--hidden';

	var PagedPublicationControls = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationControls, _MicroEvent);

	  function PagedPublicationControls(el, options) {
	    var _this$prevControl2, _this$nextControl2, _this$close2;

	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _MicroEvent.call(this) || this;

	    _this.destroy = function () {
	      var _this$prevControl, _this$nextControl, _this$close;

	      if (_this.options.keyboard === true) {
	        _this.root.removeEventListener('keydown', _this.keyDownHandler, false);
	      }

	      (_this$prevControl = _this.prevControl) == null ? void 0 : _this$prevControl.removeEventListener('mousedown', _this.prevClicked, false);
	      (_this$nextControl = _this.nextControl) == null ? void 0 : _this$nextControl.removeEventListener('mousedown', _this.nextClicked, false);
	      (_this$close = _this.close) == null ? void 0 : _this$close.removeEventListener('mousedown', _this.closeClicked, false);
	    };

	    _this.beforeNavigation = function (e) {
	      var showProgress = typeof e.progressLabel === 'string' && e.progressLabel.length > 0;

	      if (_this.progress && _this.progressBar) {
	        _this.progressBar.style.width = "".concat(e.progress, "%");

	        if (showProgress) {
	          _this.progress.classList.remove(visibilityClassName);
	        } else {
	          _this.progress.classList.add(visibilityClassName);
	        }
	      }

	      if (_this.progressLabel) {
	        if (showProgress) {
	          _this.progressLabel.textContent = e.progressLabel;

	          _this.progressLabel.classList.remove(visibilityClassName);
	        } else {
	          _this.progressLabel.classList.add(visibilityClassName);
	        }
	      }

	      if (_this.prevControl) {
	        if (e.verso.newPosition === 0) {
	          _this.prevControl.classList.add(visibilityClassName);
	        } else {
	          _this.prevControl.classList.remove(visibilityClassName);
	        }
	      }

	      if (_this.nextControl) {
	        if (e.verso.newPosition === e.pageSpreadCount - 1) {
	          _this.nextControl.classList.add(visibilityClassName);
	        } else {
	          _this.nextControl.classList.remove(visibilityClassName);
	        }
	      }
	    };

	    _this.prevClicked = function (e) {
	      e.preventDefault();

	      _this.trigger('prev');
	    };

	    _this.nextClicked = function (e) {
	      e.preventDefault();

	      _this.trigger('next');
	    };

	    _this.closeClicked = function (e) {
	      e.preventDefault();

	      _this.trigger('close');
	    };

	    _this.keyDown = function (e) {
	      var keyCode = e.keyCode;

	      if (ARROW_LEFT === keyCode) {
	        _this.trigger('prev', {
	          duration: 0
	        });
	      } else if (ARROW_RIGHT === keyCode || SPACE === keyCode) {
	        _this.trigger('next', {
	          duration: 0
	        });
	      } else if (NUMBER_ONE === keyCode) {
	        _this.trigger('first', {
	          duration: 0
	        });
	      }
	    };

	    _this.options = options;
	    _this.root = el;
	    _this.progress = el.querySelector('.sgn-pp__progress');
	    _this.progressBar = el.querySelector('.sgn-pp-progress__bar');
	    _this.progressLabel = el.querySelector('.sgn-pp__progress-label');
	    _this.prevControl = el.querySelector('.sgn-pp__control[data-direction=prev]');
	    _this.nextControl = el.querySelector('.sgn-pp__control[data-direction=next]');
	    _this.close = el.querySelector('.sgn-pp--close');
	    _this.keyDownHandler = throttle(_this.keyDown, 150, _assertThisInitialized(_this));

	    if (_this.options.keyboard === true) {
	      _this.root.addEventListener('keydown', _this.keyDownHandler, false);
	    }

	    (_this$prevControl2 = _this.prevControl) == null ? void 0 : _this$prevControl2.addEventListener('mousedown', _this.prevClicked, false);
	    (_this$nextControl2 = _this.nextControl) == null ? void 0 : _this$nextControl2.addEventListener('mousedown', _this.nextClicked, false);
	    (_this$close2 = _this.close) == null ? void 0 : _this$close2.addEventListener('mousedown', _this.closeClicked, false);

	    _this.bind('beforeNavigation', _this.beforeNavigation);

	    _this.bind('destroyed', _this.destroy);

	    return _this;
	  }

	  return _createClass(PagedPublicationControls);
	}(MicroEvent);

	var uncurryThis$6 = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$6(1.0.valueOf);

	// a string of all valid unicode whitespaces
	var whitespaces$4 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$5 = functionUncurryThis;
	var requireObjectCoercible$3 = requireObjectCoercible$9;
	var toString$3 = toString$b;
	var whitespaces$3 = whitespaces$4;

	var replace$1 = uncurryThis$5(''.replace);
	var whitespace$1 = '[' + whitespaces$3 + ']';
	var ltrim$1 = RegExp('^' + whitespace$1 + whitespace$1 + '*');
	var rtrim$1 = RegExp(whitespace$1 + whitespace$1 + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = toString$3(requireObjectCoercible$3($this));
	    if (TYPE & 1) string = replace$1(string, ltrim$1, '');
	    if (TYPE & 2) string = replace$1(string, rtrim$1, '');
	    return string;
	  };
	};

	var stringTrim$1 = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var DESCRIPTORS$1 = descriptors;
	var global$4 = global$V;
	var uncurryThis$4 = functionUncurryThis;
	var isForced = isForced_1;
	var defineBuiltIn = defineBuiltIn$a;
	var hasOwn = hasOwnProperty_1;
	var inheritIfRequired = inheritIfRequired$2;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var isSymbol = isSymbol$4;
	var toPrimitive = toPrimitive$2;
	var fails$2 = fails$r;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var defineProperty = objectDefineProperty.f;
	var thisNumberValue = thisNumberValue$1;
	var trim$4 = stringTrim$1.trim;

	var NUMBER = 'Number';
	var NativeNumber = global$4[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$2 = global$4.TypeError;
	var arraySlice$1 = uncurryThis$4(''.slice);
	var charCodeAt = uncurryThis$4(''.charCodeAt);

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
	  if (isSymbol(it)) throw TypeError$2('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$4(it);
	    first = charCodeAt(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt(it, 1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = arraySlice$1(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt(digits, index);
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
	    return isPrototypeOf$3(NumberPrototype, dummy) && fails$2(function () { thisNumberValue(dummy); })
	      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
	  };
	  for (var keys = DESCRIPTORS$1 ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
	      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  defineBuiltIn(global$4, NUMBER, NumberWrapper);
	}

	var toPropertyKey = toPropertyKey$4;
	var definePropertyModule = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$6;

	var createProperty$1 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var global$3 = global$V;
	var toAbsoluteIndex = toAbsoluteIndex$4;
	var lengthOfArrayLike = lengthOfArrayLike$7;
	var createProperty = createProperty$1;

	var Array$1 = global$3.Array;
	var max = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike(O);
	  var k = toAbsoluteIndex(start, length);
	  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	  var result = Array$1(max(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	var apply = functionApply;
	var call = functionCall;
	var uncurryThis$3 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var isRegExp$1 = isRegexp$1;
	var anObject = anObject$j;
	var requireObjectCoercible$2 = requireObjectCoercible$9;
	var speciesConstructor = speciesConstructor$2;
	var advanceStringIndex = advanceStringIndex$3;
	var toLength = toLength$4;
	var toString$2 = toString$b;
	var getMethod = getMethod$6;
	var arraySlice = arraySliceSimple;
	var callRegExpExec = regexpExecAbstract;
	var regexpExec = regexpExec$3;
	var stickyHelpers = regexpStickyHelpers;
	var fails$1 = fails$r;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min = Math.min;
	var $push = [].push;
	var exec = uncurryThis$3(/./.exec);
	var push$1 = uncurryThis$3($push);
	var stringSlice = uncurryThis$3(''.slice);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$1(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	// @@split logic
	fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
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
	      var string = toString$2(requireObjectCoercible$2(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp$1(separator)) {
	        return call(nativeSplit, string, separator, lim);
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
	      while (match = call(regexpExec, separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          push$1(output, stringSlice(string, lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !exec(separatorCopy, '')) push$1(output, '');
	      } else push$1(output, stringSlice(string, lastLastIndex));
	      return output.length > lim ? arraySlice(output, 0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible$2(this);
	      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
	      return splitter
	        ? call(splitter, separator, O, limit)
	        : call(internalSplit, toString$2(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject(this);
	      var S = toString$2(string);
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
	        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          push$1(A, stringSlice(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push$1(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push$1(A, stringSlice(S, p));
	      return A;
	    }
	  ];
	}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	var Animation = /*#__PURE__*/function () {
	  function Animation(el) {
	    this.run = 0;
	    this.el = el;
	  }

	  var _proto = Animation.prototype;

	  _proto.animate = function animate(_temp, callback) {
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
	  function PageSpread(el, options) {
	    if (options === void 0) {
	      options = {};
	    }

	    this.visibility = 'gone';
	    this.positioned = false;
	    this.active = false;
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
	    this.active = true;
	    this.getEl().dataset.active = this.active;
	  };

	  _proto.deactivate = function deactivate() {
	    this.active = false;
	    this.getEl().dataset.active = this.active;
	  };

	  return _createClass(PageSpread);
	}();

	var trim$3 = {exports: {}};

	// a string of all valid unicode whitespaces
	var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$2 = functionUncurryThis$1;
	var requireObjectCoercible$1 = requireObjectCoercible$d;
	var toString$1 = toString$i;
	var whitespaces$1 = whitespaces$2;

	var replace = uncurryThis$2(''.replace);
	var whitespace = '[' + whitespaces$1 + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$1 = function (TYPE) {
	  return function ($this) {
	    var string = toString$1(requireObjectCoercible$1($this));
	    if (TYPE & 1) string = replace(string, ltrim, '');
	    if (TYPE & 2) string = replace(string, rtrim, '');
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

	var PROPER_FUNCTION_NAME = functionName$1.PROPER;
	var fails = fails$I;
	var whitespaces = whitespaces$2;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails(function () {
	    return !!whitespaces[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$6 = _export$1;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$6({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var entryVirtual$3 = entryVirtual$a;

	var trim$2 = entryVirtual$3('String').trim;

	var isPrototypeOf$2 = objectIsPrototypeOf$1;
	var method$1 = trim$2;

	var StringPrototype$1 = String.prototype;

	var trim$1 = function (it) {
	  var own = it.trim;
	  return typeof it == 'string' || it === StringPrototype$1
	    || (isPrototypeOf$2(StringPrototype$1, it) && own === StringPrototype$1.trim) ? method$1 : own;
	};

	var parent$h = trim$1;

	var trim = parent$h;

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

	var from$6 = {exports: {}};

	var $$5 = _export$1;
	var from$5 = arrayFrom$1;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$$5({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from$5
	});

	var path$3 = path$j;

	var from$4 = path$3.Array.from;

	var parent$g = from$4;

	var from$3 = parent$g;

	(function (module) {
		module.exports = from$3;
	} (from$6));

	var _Array$from$1 = /*@__PURE__*/getDefaultExportFromCjs(from$6.exports);

	var findIndex$3 = {exports: {}};

	var $$4 = _export$1;
	var $findIndex = arrayIteration$1.findIndex;

	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-array.prototype.findindex
	$$4({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$2 = entryVirtual$a;

	var findIndex$2 = entryVirtual$2('Array').findIndex;

	var isPrototypeOf$1 = objectIsPrototypeOf$1;
	var method = findIndex$2;

	var ArrayPrototype$1 = Array.prototype;

	var findIndex$1 = function (it) {
	  var own = it.findIndex;
	  return it === ArrayPrototype$1 || (isPrototypeOf$1(ArrayPrototype$1, it) && own === ArrayPrototype$1.findIndex) ? method : own;
	};

	var parent$f = findIndex$1;

	var findIndex = parent$f;

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

	var entries$2 = {exports: {}};

	var DESCRIPTORS = descriptors$1;
	var uncurryThis$1 = functionUncurryThis$1;
	var objectKeys = objectKeys$6;
	var toIndexedObject = toIndexedObject$i;
	var $propertyIsEnumerable = objectPropertyIsEnumerable$1.f;

	var propertyIsEnumerable = uncurryThis$1($propertyIsEnumerable);
	var push = uncurryThis$1([].push);

	// `Object.{ entries, values }` methods implementation
	var createMethod = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
	        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
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

	var $$3 = _export$1;
	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	$$3({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var path$2 = path$j;

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

	var $$2 = _export$1;
	var isArray$4 = isArray$d;

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	$$2({ target: 'Array', stat: true }, {
	  isArray: isArray$4
	});

	var path$1 = path$j;

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

	var global$2 = global$1y;
	var setToStringTag = setToStringTag$b;

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag(global$2.JSON, 'JSON', true);

	var path = path$j;

	var symbol$3 = path.Symbol;

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

	var getIteratorMethod$3 = getIteratorMethod$c;

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

	function ownKeys$2(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

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
	    this.options = _objectSpread$2({}, this.defaults, options);
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

	    var inputDataClone = _objectSpread$2({}, inputData);

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

	var $$1 = _export$1;
	var $includes = arrayIncludes$1.includes;

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$1({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$1 = entryVirtual$a;

	var includes$3 = entryVirtual$1('Array').includes;

	var isObject = isObject$p;
	var classof = classofRaw$3;
	var wellKnownSymbol$1 = wellKnownSymbol$I;

	var MATCH$1 = wellKnownSymbol$1('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
	};

	var global$1 = global$1y;
	var isRegExp = isRegexp;

	var TypeError$1 = global$1.TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw TypeError$1("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol = wellKnownSymbol$I;

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

	var $ = _export$1;
	var uncurryThis = functionUncurryThis$1;
	var notARegExp = notARegexp;
	var requireObjectCoercible = requireObjectCoercible$d;
	var toString = toString$i;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringIndexOf = uncurryThis(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString(requireObjectCoercible(this)),
	      toString(notARegExp(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var entryVirtual = entryVirtual$a;

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

	function ownKeys$1(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
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
	    this.options = _objectSpread$1({}, defaults, options);
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
	      _this.pinching = true;
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
	        _this.pinching = false;
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
	      if (event.webkitDirectionInvertedFromDevice) deltaY = -deltaY;

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
	      delay: (_this$options$doubleT = this.options.doubleTapDelay) != null ? _this$options$doubleT : 300
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
	    });
	    this.hammer.on('panstart', this.onPanStart);
	    this.hammer.on('panmove', this.onPanMove);
	    this.hammer.on('panend', this.onPanEnd);
	    this.hammer.on('pancancel', this.onPanEnd);
	    this.hammer.on('singletap', this.onSingletap);
	    this.hammer.on('pinchstart', this.onPinchStart);
	    this.hammer.on('pinchmove', this.onPinchMove);
	    this.hammer.on('pinchend', this.onPinchEnd);
	    this.hammer.on('pinchcancel', this.onPinchEnd);
	    this.hammer.on('press', this.onPress);
	    this.scrollerEl.addEventListener('contextmenu', this.onContextmenu, false);
	    this.scrollerEl.addEventListener('wheel', this.onWheel, false);
	    var pageId = (_this$getPageSpreadPo = this.getPageSpreadPositionFromPageId(this.options.pageId)) != null ? _this$getPageSpreadPo : 0;
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
	    this.scrollerEl.removeEventListener('wheel', this.onWheel);
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
	      return console.warn("You've called a navigation method on a viewer that was previously destroyed, this is a no-op.\nPlease call viewer.start() again, if you want to reuse this Viewer instance.\n\nYou might have forgotten to remove an event handler that\ncalls first/prev/next/last/navigateTo on the viewer.");
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
	    });
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

	  _proto.zoomTo = function zoomTo(_temp, callback) {
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

	var loadImage = function loadImage(src, callback) {
	  return _Object$assign(new Image(), {
	    onload: function onload(_ref) {
	      var target = _ref.target;
	      callback(null, target);
	    },
	    onerror: function onerror() {
	      callback(new Error());
	    },
	    src: src
	  });
	};

	var PagedPublicationPageSpread = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationPageSpread, _MicroEvent);

	  function PagedPublicationPageSpread(options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _MicroEvent.call(this) || this;
	    _this.contentsRendered = false;
	    _this.hotspotsRendered = false;
	    _this.options = options;
	    _this.el = _this.renderEl();
	    return _this;
	  }

	  var _proto = PagedPublicationPageSpread.prototype;

	  _proto.getId = function getId() {
	    return this.options.id;
	  };

	  _proto.getEl = function getEl() {
	    return this.el;
	  };

	  _proto.getPages = function getPages() {
	    return this.options.pages;
	  };

	  _proto.renderEl = function renderEl() {
	    var _context;

	    var el = document.createElement('div');

	    var pageIds = _mapInstanceProperty(_context = this.getPages()).call(_context, function (page) {
	      return page.id;
	    });

	    el.className = 'verso__page-spread sgn-pp__page-spread';
	    el.dataset.id = this.getId();
	    el.dataset.type = 'page';
	    el.dataset.width = this.options.width;
	    el.dataset.pageIds = pageIds.join(',');
	    el.dataset.maxZoomScale = this.options.maxZoomScale;
	    el.dataset.zoomable = false;
	    return el;
	  };

	  _proto.renderContents = function renderContents() {
	    var _this2 = this;

	    var pageSpreadId = this.getId();
	    var el = this.getEl();
	    var pages = this.getPages();
	    var pageCount = pages.length;
	    var imageLoads = 0;
	    var maxPageWidth = el.clientWidth * (window.devicePixelRatio || 1);
	    if (this.options.pageMode === 'double') maxPageWidth = maxPageWidth / 2;
	    var useLargeImage = maxPageWidth > 700;
	    pages.forEach(function (page, i) {
	      var image = useLargeImage ? page.images.large : page.images.medium;
	      var pageEl = document.createElement('div');
	      var loaderEl = document.createElement('div');
	      pageEl.className = 'sgn-pp__page verso__page';
	      if (page.id) pageEl.dataset.id = page.id;

	      if (pageCount === 2) {
	        pageEl.className += i === 0 ? ' verso-page--verso' : ' verso-page--recto';
	      }

	      pageEl.appendChild(loaderEl);
	      el.appendChild(pageEl);
	      loaderEl.className = 'sgn-pp-page__loader';
	      loaderEl.innerHTML = "<span>".concat(page.label, "</span>");
	      loadImage(image, function (err, img) {
	        if (err) {
	          loaderEl.innerHTML = '<span>!</span>';
	          return console.error(err);
	        }

	        var isComplete = ++imageLoads === pageCount;
	        pageEl.style.backgroundImage = "url(".concat(image, ")");
	        pageEl.dataset.width = img.width;
	        pageEl.dataset.height = img.height;
	        pageEl.innerHTML = '&nbsp;';
	        if (isComplete) el.dataset.zoomable = true;

	        _this2.trigger('pageLoaded', {
	          pageSpreadId: pageSpreadId,
	          page: page
	        });

	        if (isComplete) {
	          _this2.trigger('pagesLoaded', {
	            pageSpreadId: pageSpreadId,
	            pages: pages
	          });
	        }
	      });
	    });
	    this.contentsRendered = true;
	    return this;
	  };

	  _proto.clearContents = function clearContents() {
	    this.el.innerHTML = '';
	    this.contentsRendered = false;
	    return this;
	  };

	  _proto.zoomIn = function zoomIn() {
	    var _this3 = this;

	    var pages = this.getPages();
	    this.el.querySelectorAll('.sgn-pp__page').forEach(function (pageEl) {
	      var id = pageEl.dataset.id;

	      var image = _findInstanceProperty(pages).call(pages, function (page) {
	        return page.id === id;
	      }).images.large;

	      loadImage(image, function (err) {
	        if (err) return console.error(err);

	        if (_this3.el.dataset.active === 'true') {
	          pageEl.dataset.image = pageEl.style.backgroundImage;
	          pageEl.style.backgroundImage = "url(".concat(image, ")");
	        }
	      });
	    });
	  };

	  _proto.zoomOut = function zoomOut() {
	    this.el.querySelectorAll('.sgn-pp__page[data-image]').forEach(function (pageEl) {
	      pageEl.style.backgroundImage = pageEl.dataset.image;
	      delete pageEl.dataset.image;
	    });
	  };

	  return _createClass(PagedPublicationPageSpread);
	}(MicroEvent);

	function chunk(arr, size) {
	  var results = [];

	  while (arr.length) {
	    results.push(_spliceInstanceProperty(arr).call(arr, 0, size));
	  }

	  return results;
	}

	var PagedPublicationPageSpreads = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationPageSpreads, _MicroEvent);

	  function PagedPublicationPageSpreads(options) {
	    var _this;

	    _this = _MicroEvent.call(this) || this;
	    _this.collection = [];
	    _this.ids = {};
	    _this.options = options;
	    return _this;
	  }

	  var _proto = PagedPublicationPageSpreads.prototype;

	  _proto.get = function get(id) {
	    return this.ids[id];
	  };

	  _proto.getFrag = function getFrag() {
	    var frag = document.createDocumentFragment();
	    this.collection.forEach(function (pageSpread) {
	      frag.appendChild(pageSpread.el);
	    });
	    return frag;
	  };

	  _proto.update = function update(pageMode) {
	    var _context,
	        _this2 = this;

	    if (pageMode === void 0) {
	      pageMode = 'single';
	    }

	    var pageSpreads = [];
	    var ids = {};

	    var pages = _sliceInstanceProperty$1(_context = this.options.pages).call(_context);

	    var _this$options = this.options,
	        width = _this$options.width,
	        maxZoomScale = _this$options.maxZoomScale;

	    if (pageMode === 'single') {
	      pages.forEach(function (page) {
	        pageSpreads.push([page]);
	      });
	    } else {
	      var firstPage = pages.shift();
	      var lastPage = pages.length % 2 === 1 ? pages.pop() : null;
	      var midstPageSpreads = chunk(pages, 2);
	      if (firstPage) pageSpreads.push([firstPage]);
	      midstPageSpreads.forEach(function (midstPages) {
	        pageSpreads.push(midstPages);
	      });
	      if (lastPage) pageSpreads.push([lastPage]);
	    }

	    this.collection = _mapInstanceProperty(pageSpreads).call(pageSpreads, function (pages, i) {
	      var _context2;

	      var id = _concatInstanceProperty(_context2 = "".concat(pageMode, "-")).call(_context2, i);

	      var pageSpread = new PagedPublicationPageSpread({
	        width: width,
	        pageMode: pageMode,
	        maxZoomScale: maxZoomScale,
	        pages: pages,
	        id: id
	      });
	      pageSpread.bind('pageLoaded', function (e) {
	        _this2.trigger('pageLoaded', e);
	      });
	      pageSpread.bind('pagesLoaded', function (e) {
	        _this2.trigger('pagesLoaded', e);
	      });
	      ids[id] = pageSpread;
	      return pageSpread;
	    });
	    this.ids = ids;
	    return this;
	  };

	  return _createClass(PagedPublicationPageSpreads);
	}(MicroEvent);

	function getColorBrightness(color) {
	  color = color.replace('#', '');
	  var sum = 0;
	  var x = 0;

	  while (x < 3) {
	    sum += parseInt(color.substring(2 * x, 2), 16) || 0;
	    ++x;
	  }

	  return sum <= 381 ? 'dark' : 'light';
	}

	var PagedPublicationCore = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationCore, _MicroEvent);

	  function PagedPublicationCore(el, options) {
	    var _this;

	    if (options === void 0) {
	      options = {};
	    }

	    _this = _MicroEvent.call(this) || this;

	    _this.start = function () {
	      var verso = _this.getVerso();

	      verso.start();
	      verso.pageSpreads.forEach(_this.overridePageSpreadContentRect);
	      _this.resizeListener = throttle(_this.resize, _this.getOption('resizeDelay'));
	      window.addEventListener('resize', _this.resizeListener, false);
	      window.addEventListener('beforeunload', _this.unload, false);
	      _this.rootEl.dataset.started = '';

	      _this.rootEl.setAttribute('tabindex', '-1');

	      _this.rootEl.focus();
	    };

	    _this.destroy = function () {
	      var verso = _this.getVerso();

	      delete _this.rootEl.dataset.started;
	      delete _this.rootEl.dataset.idle;
	      delete _this.rootEl.dataset.navigating;
	      delete _this.rootEl.dataset.colorBrightness;
	      delete _this.rootEl.dataset.zoomedIn;
	      _this.rootEl.style.backgroundColor = '#ffffff';
	      verso.el.querySelectorAll('.sgn-pp__page-spread').forEach(function (pageSpreadEl) {
	        pageSpreadEl.parentNode.removeChild(pageSpreadEl);
	      });
	      verso.destroy();
	      window.removeEventListener('resize', _this.resizeListener, false);
	      window.removeEventListener('beforeunload', _this.unload, false);
	    };

	    _this.pageLoaded = function (e) {
	      _this.trigger('pageLoaded', e);
	    };

	    _this.pagesLoaded = function (e) {
	      _this.trigger('pagesLoaded', e);
	    };

	    _this.beforeNavigation = function (e) {
	      var position = e.newPosition;

	      var theVerso = _this.getVerso();

	      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);

	      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

	      var pageSpreadCount = theVerso.getPageSpreadCount();
	      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
	      var progress = position / (pageSpreadCount - 1) * 100;

	      var progressLabel = _this.formatProgressLabel(pageSpread);

	      _this.rootEl.dataset.navigating = true;

	      _this.renderPageSpreads();

	      _this.resetIdleTimer();

	      _this.startIdleTimer();

	      _this.trigger('beforeNavigation', {
	        verso: e,
	        pageSpread: pageSpread,
	        newSpreadEl: newSpreadEl,
	        progress: progress,
	        progressLabel: progressLabel,
	        pageSpreadCount: pageSpreadCount,
	        newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
	      });
	    };

	    _this.afterNavigation = function (e) {
	      var position = e.newPosition;

	      var theVerso = _this.getVerso();

	      var versoPageSpread = theVerso.getPageSpreadFromPosition(position);

	      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

	      var pageSpreadCount = theVerso.getPageSpreadCount();
	      var newSpreadEl = theVerso.pageSpreadEls[e.newPosition];
	      _this.rootEl.dataset.navigating = false;

	      _this.trigger('afterNavigation', {
	        verso: e,
	        pageSpread: pageSpread,
	        pageSpreadCount: pageSpreadCount,
	        newSpreadEl: newSpreadEl,
	        newPositionIsEnd: e.newPosition + 1 === pageSpreadCount
	      });
	    };

	    _this.attemptedNavigation = function (e) {
	      _this.trigger('attemptedNavigation', {
	        verso: e
	      });
	    };

	    _this.clicked = function (e) {
	      if (e.isInsideContent) {
	        var page = _this.findPage(e.pageEl.dataset.id);

	        _this.trigger('clicked', {
	          verso: e,
	          page: page
	        });
	      }
	    };

	    _this.doubleClicked = function (e) {
	      if (e.isInsideContent) {
	        var page = _this.findPage(e.pageEl.dataset.id);

	        _this.trigger('doubleClicked', {
	          verso: e,
	          page: page
	        });
	      }
	    };

	    _this.pressed = function (e) {
	      if (e.isInsideContent) {
	        var page = _this.findPage(e.pageEl.dataset.id);

	        _this.trigger('pressed', {
	          verso: e,
	          page: page
	        });
	      }
	    };

	    _this.contextmenu = function (e) {
	      if (e.isInsideContent) {
	        var page = _this.findPage(e.pageEl.dataset.id);

	        _this.trigger('contextmenu', {
	          verso: e,
	          page: page
	        });
	      }
	    };

	    _this.panStart = function () {
	      _this.resetIdleTimer();

	      _this.trigger('panStart', {
	        scale: _this.getVerso().transform.scale
	      });
	    };

	    _this.panEnd = function () {
	      _this.startIdleTimer();

	      _this.trigger('panEnd');
	    };

	    _this.zoomedIn = function (e) {
	      var position = e.position;

	      var versoPageSpread = _this.getVerso().getPageSpreadFromPosition(position);

	      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

	      pageSpread == null ? void 0 : pageSpread.zoomIn();
	      _this.rootEl.dataset.zoomedIn = true;

	      _this.trigger('zoomedIn', {
	        verso: e,
	        pageSpread: pageSpread
	      });
	    };

	    _this.zoomedOut = function (e) {
	      var position = e.position;

	      var versoPageSpread = _this.getVerso().getPageSpreadFromPosition(position);

	      var pageSpread = _this.pageSpreads.get(versoPageSpread.getId());

	      pageSpread == null ? void 0 : pageSpread.zoomOut();
	      _this.rootEl.dataset.zoomedIn = false;

	      _this.trigger('zoomedOut', {
	        verso: e,
	        pageSpread: pageSpread
	      });
	    };

	    _this.overridePageSpreadContentRect = function (pageSpread) {
	      if (pageSpread.getType() === 'page') {
	        return pageSpread.getContentRect = function () {
	          return _this.getContentRect(pageSpread);
	        };
	      }
	    };

	    _this.resize = function () {
	      var pageMode = _this.getPageMode();

	      if (!_this.getOption('pageMode') && pageMode !== _this.pageMode) {
	        _this.switchPageMode(pageMode);
	      } else {
	        _this.trigger('resized');
	      }
	    };

	    _this.unload = function () {
	      _this.trigger('disappeared');
	    };

	    _this.options = _this.makeOptions(options, _this.defaults);
	    _this.pageId = _this.getOption('pageId');
	    _this.rootEl = el;
	    _this.pagesEl = el.querySelector('.sgn-pp__pages');
	    _this.pageMode = _this.getPageMode();
	    _this.pageSpreads = new PagedPublicationPageSpreads({
	      pages: _this.getOption('pages'),
	      maxZoomScale: _this.getOption('pageSpreadMaxZoomScale'),
	      width: _this.getOption('pageSpreadWidth')
	    });

	    _this.pageSpreads.bind('pageLoaded', _this.pageLoaded);

	    _this.pageSpreads.bind('pagesLoaded', _this.pagesLoaded);

	    _this.setColor(_this.getOption('color')); // It's important to insert the page spreads before instantiating Verso.


	    _this.pagesEl.parentNode.insertBefore(_this.pageSpreads.update(_this.pageMode).getFrag(), _this.pagesEl);

	    _this.verso = _this.createVerso();

	    _this.bind('started', _this.start);

	    _this.bind('destroyed', _this.destroy);

	    return _this;
	  }

	  var _proto = PagedPublicationCore.prototype;

	  _proto.makeOptions = function makeOptions(options, defaults) {
	    var opts = {};

	    for (var key in options) {
	      var _options$key;

	      opts[key] = (_options$key = options[key]) != null ? _options$key : defaults[key];
	    }

	    return opts;
	  };

	  _proto.getOption = function getOption(key) {
	    return this.options[key];
	  };

	  _proto.setColor = function setColor(color) {
	    this.rootEl.dataset.colorBrightness = getColorBrightness(color);
	    this.rootEl.style.backgroundColor = color;
	  };

	  _proto.createVerso = function createVerso() {
	    var verso = new Verso(this.rootEl.querySelector('.verso'), {
	      pageId: this.pageId
	    });
	    verso.bind('beforeNavigation', this.beforeNavigation);
	    verso.bind('afterNavigation', this.afterNavigation);
	    verso.bind('attemptedNavigation', this.attemptedNavigation);
	    verso.bind('clicked', this.clicked);
	    verso.bind('doubleClicked', this.doubleClicked);
	    verso.bind('pressed', this.pressed);
	    verso.bind('contextmenu', this.contextmenu);
	    verso.bind('panStart', this.panStart);
	    verso.bind('panEnd', this.panEnd);
	    verso.bind('zoomedIn', this.zoomedIn);
	    verso.bind('zoomedOut', this.zoomedOut);
	    return verso;
	  };

	  _proto.getVerso = function getVerso() {
	    return this.verso;
	  };

	  _proto.getContentRect = function getContentRect(pageSpread) {
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
	    if (!pageCount) return rect;
	    var scale = this.getVerso().transform.scale;
	    var pageWidth = pageEl.offsetWidth * pageCount * scale;
	    var pageHeight = pageEl.offsetHeight * scale;
	    var imageRatio = Number(pageEl.dataset.height) / (Number(pageEl.dataset.width) * pageCount);
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
	  };

	  _proto.formatProgressLabel = function formatProgressLabel(pageSpread) {
	    var pages = (pageSpread == null ? void 0 : pageSpread.options.pages) || [];

	    var pageLabels = _mapInstanceProperty(pages).call(pages, function (_ref) {
	      var label = _ref.label;
	      return label;
	    });

	    return pages.length > 0 ? pageLabels.join('-') + ' / ' + this.getOption('pages').length : null;
	  };

	  _proto.renderPageSpreads = function renderPageSpreads() {
	    var _this2 = this;

	    this.getVerso().pageSpreads.forEach(function (pageSpread) {
	      var visibility = pageSpread.getVisibility();

	      var match = _this2.pageSpreads.get(pageSpread.getId());

	      if (visibility === 'visible' && (match == null ? void 0 : match.contentsRendered) === false) {
	        setTimeout(match.renderContents.bind(match), 0);
	      }

	      if (visibility === 'gone' && (match == null ? void 0 : match.contentsRendered) === true) {
	        setTimeout(match.clearContents.bind(match), 0);
	      }
	    });
	    return this;
	  };

	  _proto.findPage = function findPage(pageId) {
	    var _context;

	    return _findInstanceProperty(_context = this.getOption('pages')).call(_context, function (page) {
	      return page.id === pageId;
	    });
	  };

	  _proto.getPageMode = function getPageMode() {
	    return this.getOption('pageMode') || (this.rootEl.offsetHeight / this.rootEl.offsetWidth < 0.8 ? 'double' : 'single');
	  };

	  _proto.resetIdleTimer = function resetIdleTimer() {
	    clearTimeout(this.idleTimeout);
	    this.rootEl.dataset.idle = false;
	    return this;
	  };

	  _proto.startIdleTimer = function startIdleTimer() {
	    var _this3 = this;

	    this.idleTimeout = setTimeout(function () {
	      _this3.rootEl.dataset.idle = true;
	    }, this.getOption('idleDelay'));
	    return this;
	  };

	  _proto.switchPageMode = function switchPageMode(pageMode) {
	    if (this.pageMode === pageMode) return this;
	    var verso = this.getVerso();
	    var pageIds = verso.getPageSpreadFromPosition(verso.getPosition()).getPageIds();
	    this.pageMode = pageMode;
	    this.pageSpreads.update(this.pageMode);
	    this.getVerso().el.querySelectorAll('.sgn-pp__page-spread').forEach(function (pageSpreadEl) {
	      pageSpreadEl.parentNode.removeChild(pageSpreadEl);
	    });
	    this.pagesEl.parentNode.insertBefore(this.pageSpreads.getFrag(), this.pagesEl);
	    verso.refresh();
	    verso.navigateTo(verso.getPageSpreadPositionFromPageId(pageIds[0]), {
	      duration: 0
	    });
	    verso.pageSpreads.forEach(this.overridePageSpreadContentRect);
	    return this;
	  };

	  return _createClass(PagedPublicationCore);
	}(MicroEvent);

	PagedPublicationCore.prototype.defaults = {
	  pages: [],
	  pageSpreadWidth: 100,
	  pageSpreadMaxZoomScale: 2.3,
	  idleDelay: 1000,
	  resizeDelay: 400,
	  color: '#ffffff'
	};

	var PagedPublicationEventTracking = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationEventTracking, _MicroEvent);

	  function PagedPublicationEventTracking(eventTracker, id) {
	    var _this;

	    _this = _MicroEvent.call(this) || this;
	    _this.hidden = true;
	    _this.pageSpread = null;

	    _this.destroy = function () {
	      _this.pageSpreadDisappeared();
	    };

	    _this.appeared = function (e) {
	      _this.pageSpreadAppeared(e.pageSpread);
	    };

	    _this.disappeared = function () {
	      _this.pageSpreadDisappeared();
	    };

	    _this.beforeNavigation = function () {
	      _this.pageSpreadDisappeared();
	    };

	    _this.afterNavigation = function (e) {
	      _this.pageSpreadAppeared(e.pageSpread);
	    };

	    _this.attemptedNavigation = function (e) {
	      _this.pageSpreadAppeared(e.pageSpread);
	    };

	    _this.panStart = function (e) {
	      if (e.scale === 1) _this.pageSpreadDisappeared();
	    };

	    _this.eventTracker = eventTracker;
	    _this.id = id;

	    _this.bind('appeared', _this.appeared);

	    _this.bind('disappeared', _this.disappeared);

	    _this.bind('beforeNavigation', _this.beforeNavigation);

	    _this.bind('afterNavigation', _this.afterNavigation);

	    _this.bind('attemptedNavigation', _this.attemptedNavigation);

	    _this.bind('panStart', _this.panStart);

	    _this.bind('destroyed', _this.destroy);

	    return _this;
	  }

	  var _proto = PagedPublicationEventTracking.prototype;

	  _proto.trackOpened = function trackOpened() {
	    if (!this.eventTracker) return this;
	    this.eventTracker.trackPagedPublicationOpened({
	      'pp.id': this.id,
	      vt: this.eventTracker.createViewToken(this.id)
	    });
	    return this;
	  };

	  _proto.trackPageSpreadDisappeared = function trackPageSpreadDisappeared(pageNumbers) {
	    var _this2 = this;

	    if (!this.eventTracker) return this;
	    pageNumbers.forEach(function (pageNumber) {
	      _this2.eventTracker.trackPagedPublicationPageDisappeared({
	        'pp.id': _this2.id,
	        'ppp.n': pageNumber,
	        vt: _this2.eventTracker.createViewToken(_this2.id, pageNumber)
	      });
	    });
	    return this;
	  };

	  _proto.pageSpreadAppeared = function pageSpreadAppeared(pageSpread) {
	    if (pageSpread && this.hidden) {
	      this.pageSpread = pageSpread;
	      this.hidden = false;
	    }
	  };

	  _proto.pageSpreadDisappeared = function pageSpreadDisappeared() {
	    if (this.pageSpread && !this.hidden) {
	      var _context;

	      this.trackPageSpreadDisappeared(_mapInstanceProperty(_context = this.pageSpread.getPages()).call(_context, function (page) {
	        return page.pageNumber;
	      }));
	      this.hidden = true;
	      this.pageSpread = null;
	    }
	  };

	  return _createClass(PagedPublicationEventTracking);
	}(MicroEvent);

	function getPosition(pages, ratio, hotspot) {
	  var minX = null;
	  var minY = null;
	  var maxX = null;
	  var maxY = null;

	  var pageNumbers = _mapInstanceProperty(pages).call(pages, function (page) {
	    return page.pageNumber;
	  });

	  var _loop = function _loop(pageNumber) {
	    if (pageNumbers.indexOf(Number(pageNumber)) === -1) return "continue";
	    hotspot.locations[pageNumber].forEach(function (_ref) {
	      var x = _ref[0],
	          y = _ref[1];
	      if (pages[1] && pageNumbers[1] === Number(pageNumber)) x += 1;
	      x /= pages.length;

	      if (minX == null) {
	        minX = maxX = x;
	        minY = maxY = y;
	      }

	      if (x < minX) minX = x;
	      if (x > maxX) maxX = x;
	      if (y < minY) minY = y;
	      if (y > maxY) maxY = y;
	    });
	  };

	  for (var pageNumber in hotspot.locations) {
	    var _ret = _loop(pageNumber);

	    if (_ret === "continue") continue;
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

	function renderHotspot(hotspot, position, contentRect, boundingRect) {
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
	  if (hotspot.id) el.dataset.id = hotspot.id;
	  if (hotspot.type) el.dataset.type = hotspot.type;
	  el.innerHTML = mustache.render('', hotspot);
	  el.style.top = "".concat(top, "px");
	  el.style.left = "".concat(left, "px");
	  el.style.width = "".concat(width, "px");
	  el.style.height = "".concat(height, "px");
	  return el;
	}

	var PagedPublicationHotspots = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(PagedPublicationHotspots, _MicroEvent);

	  function PagedPublicationHotspots() {
	    var _this;

	    _this = _MicroEvent.call(this) || this;
	    _this.currentPageSpreadId = null;
	    _this.pageSpreadsLoaded = {};
	    _this.cache = {};

	    _this.hotspotsReceived = function (e) {
	      _this.setCache(e.pageSpread.getId(), e);

	      _this.renderHotspots(e);
	    };

	    _this.afterNavigation = function (e) {
	      if (!e.pageSpread) return;
	      var id = e.pageSpread.getId();
	      _this.currentPageSpreadId = id;

	      if (_this.pageSpreadsLoaded[id]) {
	        _this.requestHotspots(id, e.pageSpread.getPages());
	      }
	    };

	    _this.pagesLoaded = function (e) {
	      _this.pageSpreadsLoaded[e.pageSpreadId] = true;

	      if (_this.currentPageSpreadId === e.pageSpreadId) {
	        _this.requestHotspots(e.pageSpreadId, e.pages);
	      }
	    };

	    _this.resized = function () {
	      var data = _this.getCache(_this.currentPageSpreadId);

	      if (data) _this.renderHotspots(data);
	    };

	    _this.bind('hotspotsReceived', _this.hotspotsReceived);

	    _this.bind('afterNavigation', _this.afterNavigation);

	    _this.bind('pagesLoaded', _this.pagesLoaded);

	    _this.bind('resized', _this.resized);

	    return _this;
	  }

	  var _proto = PagedPublicationHotspots.prototype;

	  _proto.renderHotspots = function renderHotspots(_ref2) {
	    var versoPageSpread = _ref2.versoPageSpread,
	        pageSpread = _ref2.pageSpread,
	        hotspots = _ref2.hotspots,
	        pages = _ref2.pages,
	        ratio = _ref2.ratio;
	    var contentRect = versoPageSpread.getContentRect();
	    var pageSpreadEl = pageSpread.getEl();
	    var boundingRect = pageSpreadEl.getBoundingClientRect();
	    pageSpreadEl.querySelectorAll('.sgn-pp__hotspot').forEach(function (hotspotEl) {
	      hotspotEl.parentNode.removeChild(hotspotEl);
	    });
	    var frag = document.createDocumentFragment();

	    for (var id in hotspots) {
	      var hotspot = hotspots[id];
	      var position = getPosition(pages, ratio, hotspot);
	      var el = renderHotspot(hotspot, position, contentRect, boundingRect);
	      frag.appendChild(el);
	    }

	    pageSpreadEl.appendChild(frag);
	    return this;
	  };

	  _proto.requestHotspots = function requestHotspots(id, pages) {
	    this.trigger('hotspotsRequested', {
	      id: id,
	      pages: pages
	    });
	  };

	  _proto.getCache = function getCache(pageSpreadId) {
	    return this.cache[pageSpreadId];
	  };

	  _proto.setCache = function setCache(pageSpreadId, data) {
	    this.cache[pageSpreadId] = data;
	    return this;
	  };

	  return _createClass(PagedPublicationHotspots);
	}(MicroEvent);

	function defaultPickHotspot(hotspots, e, el, callback) {
	  var _context;

	  var popover = singleChoicePopover({
	    el: el,
	    header: t('paged_publication.hotspot_picker.header'),
	    x: e.verso.x,
	    y: e.verso.y,
	    items: _mapInstanceProperty(_context = _filterInstanceProperty(hotspots).call(hotspots, function (hotspot) {
	      return hotspot.type === 'offer';
	    })).call(_context, function (hotspot) {
	      return {
	        id: hotspot.id,
	        title: hotspot.offer.heading,
	        subtitle: hotspot.offer.pricing.currency + '' + hotspot.offer.pricing.price
	      };
	    })
	  }, function (picked) {
	    callback(_findInstanceProperty(hotspots).call(hotspots, function (hotspot) {
	      return hotspot.id === picked.id;
	    }));
	  });
	  return popover.destroy;
	}

	var Viewer = /*#__PURE__*/function (_MicroEvent) {
	  _inherits(Viewer, _MicroEvent);

	  function Viewer(el, _options) {
	    var _this;

	    if (_options === void 0) {
	      _options = {};
	    }

	    _this = _MicroEvent.call(this) || this;
	    _this._hotspots = new PagedPublicationHotspots();
	    _this.hotspots = null;
	    _this.hotspotQueue = [];
	    _this.popover = null;

	    _this.destroy = function () {
	      _this._core.trigger('destroyed');

	      _this._hotspots.trigger('destroyed');

	      _this._controls.trigger('destroyed');

	      _this._eventTracking.trigger('destroyed');

	      _this.trigger('destroyed');

	      return _assertThisInitialized(_this);
	    };

	    _this.first = function (options) {
	      _this._core.getVerso().first(options);

	      return _assertThisInitialized(_this);
	    };

	    _this.prev = function (options) {
	      _this._core.getVerso().prev(options);

	      return _assertThisInitialized(_this);
	    };

	    _this.next = function (options) {
	      _this._core.getVerso().next(options);

	      return _assertThisInitialized(_this);
	    };

	    _this.last = function (options) {
	      _this._core.getVerso().last(options);

	      return _assertThisInitialized(_this);
	    };

	    _this.hotspotsRequested = function (e) {
	      _this.hotspotQueue.push(e);

	      _this.processHotspotQueue();
	    };

	    _this.beforeNavigation = function () {
	      var _this$popover;

	      (_this$popover = _this.popover) == null ? void 0 : _this$popover.destroy == null ? void 0 : _this$popover.destroy();
	    };

	    _this.clicked = function (e) {
	      _this.pickHotspot(e, function (hotspot) {
	        _this.trigger('hotspotClicked', hotspot);
	      });
	    };

	    _this.contextmenu = function (e) {
	      _this.pickHotspot(e, function (hotspot) {
	        _this.trigger('hotspotContextmenu', hotspot);
	      });
	    };

	    _this.pressed = function (e) {
	      _this.pickHotspot(e, function (hotspot) {
	        _this.trigger('hotspotPressed', hotspot);
	      });
	    };

	    _this.el = el;
	    _this.options = _options;
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
	    _this._controls = new PagedPublicationControls(_this.el, {
	      keyboard: _this.options.keyboard
	    });
	    _this._eventTracking = new PagedPublicationEventTracking(_this.options.eventTracker, _this.options.id);

	    _this._controls.bind('prev', _this.prev);

	    _this._controls.bind('next', _this.next);

	    _this._controls.bind('first', _this.first);

	    _this._controls.bind('last', _this.last);

	    _this._controls.bind('close', _this.destroy);

	    _this._hotspots.bind('hotspotsRequested', function (e) {
	      _this.trigger('hotspotsRequested', e);
	    });

	    _this._core.bind('appeared', function (e) {
	      _this._eventTracking.trigger('appeared', e);

	      _this.trigger('appeared', e);
	    });

	    _this._core.bind('disappeared', function (e) {
	      _this._eventTracking.trigger('disappeared', e);

	      _this.trigger('disappeared', e);
	    });

	    _this._core.bind('beforeNavigation', function (e) {
	      _this._eventTracking.trigger('beforeNavigation', e);

	      _this._controls.trigger('beforeNavigation', e);

	      _this.trigger('beforeNavigation', e);
	    });

	    _this._core.bind('afterNavigation', function (e) {
	      _this._eventTracking.trigger('afterNavigation', e);

	      _this._hotspots.trigger('afterNavigation', e);

	      _this.trigger('afterNavigation', e);
	    });

	    _this._core.bind('attemptedNavigation', function (e) {
	      _this._eventTracking.trigger('attemptedNavigation', e);

	      _this.trigger('attemptedNavigation', e);
	    });

	    _this._core.bind('clicked', function (e) {
	      _this._eventTracking.trigger('clicked', e);

	      _this.trigger('clicked', e);
	    });

	    _this._core.bind('doubleClicked', function (e) {
	      _this._eventTracking.trigger('doubleClicked', e);

	      _this.trigger('doubleClicked', e);
	    });

	    _this._core.bind('contextmenu', function (e) {
	      _this.trigger('contextmenu', e);
	    });

	    _this._core.bind('pressed', function (e) {
	      _this._eventTracking.trigger('pressed', e);

	      _this.trigger('pressed', e);
	    });

	    _this._core.bind('panStart', function (e) {
	      _this._eventTracking.trigger('panStart', e);

	      _this.trigger('panStart', e);
	    });

	    _this._core.bind('zoomedIn', function (e) {
	      _this._eventTracking.trigger('zoomedIn', e);

	      _this.trigger('zoomedIn', e);
	    });

	    _this._core.bind('zoomedOut', function (e) {
	      _this._eventTracking.trigger('zoomedOut', e);

	      _this.trigger('zoomedOut', e);
	    });

	    _this._core.bind('pageLoaded', function (e) {
	      _this._eventTracking.trigger('pageLoaded', e);

	      _this.trigger('pageLoaded', e);
	    });

	    _this._core.bind('pagesLoaded', function (e) {
	      _this._hotspots.trigger('pagesLoaded', e);

	      _this.trigger('pagesLoaded', e);
	    });

	    _this._core.bind('resized', function (e) {
	      _this._hotspots.trigger('resized');

	      _this.trigger('resized', e);
	    });

	    _this.bind('hotspotsRequested', _this.hotspotsRequested);

	    _this.bind('beforeNavigation', _this.beforeNavigation);

	    _this.bind('clicked', _this.clicked);

	    _this.bind('contextmenu', _this.contextmenu);

	    _this.bind('pressed', _this.pressed);

	    return _this;
	  }

	  var _proto = Viewer.prototype;

	  _proto.start = function start() {
	    this._eventTracking.trackOpened();

	    this._core.trigger('started');

	    return this;
	  };

	  _proto.navigateTo = function navigateTo(position, options) {
	    return this.navigateToIndex(position, options);
	  };

	  _proto.navigateToIndex = function navigateToIndex(position, options) {
	    this._core.getVerso().navigateTo(position, options);

	    return this;
	  };

	  _proto.navigateToPageId = function navigateToPageId(pageId, options) {
	    var verso = this._core.getVerso();

	    var newPosition = verso.getPageSpreadPositionFromPageId(pageId);
	    verso.navigateTo(newPosition, options);
	    return this;
	  };

	  _proto.pickHotspot = function pickHotspot(e, callback) {
	    var _context2,
	        _this2 = this;

	    if (!this.hotspots) return;

	    if (this.popover) {
	      var _this$popover$destroy, _this$popover2;

	      (_this$popover$destroy = (_this$popover2 = this.popover).destroy) == null ? void 0 : _this$popover$destroy.call(_this$popover2);
	      this.popover = null;
	    }

	    var hotspots = _mapInstanceProperty(_context2 = e.verso.overlayEls).call(_context2, function (overlayEl) {
	      return _this2.hotspots[overlayEl.dataset.id];
	    });

	    if (hotspots.length === 1) {
	      callback(hotspots[0]);
	    } else if (hotspots.length > 1) {
	      this.popover = {
	        destroy: (this.options.pickHotspot || defaultPickHotspot)(hotspots, e, this.el, callback)
	      };
	    }
	  };

	  _proto.processHotspotQueue = function processHotspotQueue() {
	    var _context3,
	        _this3 = this;

	    if (!this.hotspots) return;
	    this.hotspotQueue = _filterInstanceProperty(_context3 = this.hotspotQueue).call(_context3, function (hotspotRequest) {
	      var _context4;

	      var hotspots = {};

	      for (var hotspotId in _this3.hotspots) {
	        if (hotspots[hotspotId]) continue;
	        var _this3$hotspots$hotsp = _this3.hotspots[hotspotId],
	            id = _this3$hotspots$hotsp.id,
	            type = _this3$hotspots$hotsp.type,
	            locations = _this3$hotspots$hotsp.locations;

	        for (var idx = 0; idx < hotspotRequest.pages.length; idx++) {
	          var pageNumber = hotspotRequest.pages[idx].pageNumber;

	          if (locations[pageNumber]) {
	            hotspots[hotspotId] = {
	              type: type,
	              id: id,
	              locations: locations
	            };
	            break;
	          }
	        }
	      }

	      var versoPageSpread = _findInstanceProperty(_context4 = _this3._core.getVerso().pageSpreads).call(_context4, function (pageSpread) {
	        return pageSpread.getId() === hotspotRequest.id;
	      });

	      _this3._hotspots.trigger('hotspotsReceived', {
	        pageSpread: _this3._core.pageSpreads.get(hotspotRequest.id),
	        versoPageSpread: versoPageSpread,
	        ratio: _this3.options.hotspotRatio,
	        pages: hotspotRequest.pages,
	        hotspots: hotspots
	      });

	      return false;
	    });
	  };

	  _proto.applyHotspots = function applyHotspots(hotspots) {
	    this.hotspots = hotspots;
	    this.processHotspotQueue();
	  };

	  return _createClass(Viewer);
	}(MicroEvent);

	function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

	var Bootstrapper = /*#__PURE__*/function () {
	  function Bootstrapper(options) {
	    var _this = this;

	    if (options === void 0) {
	      options = {};
	    }

	    this.fetchDetails = function (callback) {
	      return request({
	        apiKey: _this.options.apiKey,
	        coreUrl: _this.options.coreUrl,
	        url: "/v2/catalogs/".concat(_this.options.id)
	      }, callback);
	    };

	    this.fetchPages = function (callback) {
	      return request({
	        apiKey: _this.options.apiKey,
	        coreUrl: _this.options.coreUrl,
	        url: "/v2/catalogs/".concat(_this.options.id, "/pages")
	      }, callback);
	    };

	    this.fetchHotspots = function (callback) {
	      return request({
	        apiKey: _this.options.apiKey,
	        coreUrl: _this.options.coreUrl,
	        url: "/v2/catalogs/".concat(_this.options.id, "/hotspots")
	      }, callback);
	    };

	    this.options = options;
	  }

	  var _proto = Bootstrapper.prototype;

	  _proto.createViewer = function createViewer(data, viewerOptions) {
	    var _context;

	    return new Viewer(this.options.el, _objectSpread({
	      id: this.options.id,
	      ownedBy: data.details.dealer_id,
	      color: '#' + data.details.branding.pageflip.color,
	      hotspotRatio: data.details.dimensions.height,
	      keyboard: true,
	      pageId: this.options.pageId,
	      eventTracker: this.options.eventTracker,
	      pages: _mapInstanceProperty(_context = data.pages).call(_context, function (_ref, i) {
	        var view = _ref.view,
	            zoom = _ref.zoom;
	        var pageNumber = i + 1;
	        return {
	          id: 'page' + pageNumber,
	          label: String(pageNumber),
	          pageNumber: pageNumber,
	          images: {
	            medium: view,
	            large: zoom
	          }
	        };
	      })
	    }, viewerOptions));
	  };

	  _proto.applyHotspots = function applyHotspots(viewer, hotspots) {
	    viewer.applyHotspots(hotspots.reduce(function (obj, hotspot) {
	      obj[hotspot.id] = hotspot;
	      return obj;
	    }, {}));
	  };

	  _proto.fetch = /*#__PURE__*/function () {
	    var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(callback) {
	      var _yield$Promise$all, details, pages, data;

	      return _regeneratorRuntime.wrap(function _callee$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              _context2.prev = 0;
	              _context2.next = 3;
	              return _Promise.all([this.fetchDetails(), this.fetchPages()]);

	            case 3:
	              _yield$Promise$all = _context2.sent;
	              details = _yield$Promise$all[0];
	              pages = _yield$Promise$all[1];

	              if (!(!details || !pages)) {
	                _context2.next = 8;
	                break;
	              }

	              throw new Error();

	            case 8:
	              data = {
	                details: details,
	                pages: pages
	              };
	              if (typeof callback === 'function') callback(null, data);
	              return _context2.abrupt("return", data);

	            case 13:
	              _context2.prev = 13;
	              _context2.t0 = _context2["catch"](0);

	              if (!(typeof callback === 'function')) {
	                _context2.next = 19;
	                break;
	              }

	              callback(_context2.t0);
	              _context2.next = 20;
	              break;

	            case 19:
	              throw _context2.t0;

	            case 20:
	            case "end":
	              return _context2.stop();
	          }
	        }
	      }, _callee, this, [[0, 13]]);
	    }));

	    function fetch(_x) {
	      return _fetch.apply(this, arguments);
	    }

	    return fetch;
	  }();

	  return _createClass(Bootstrapper);
	}();

	exports.EventTracker = Tracker;
	exports.PagedPublicationBootstrapper = Bootstrapper;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
